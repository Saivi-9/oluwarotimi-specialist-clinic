import { validateAppointment } from './appointment-validation.ts';

export type MailConfig = { enabled?: string; apiKey?: string; from?: string };
type MailDependencies = { fetch: typeof fetch; allowAttempt: (client: string) => boolean };
const recipient = 'folorunsooluwarotimi@gmail.com';
const maxBodyBytes = 8192;

export function emailIsAvailable(config: MailConfig): boolean {
  return config.enabled === 'true' && Boolean(config.apiKey?.trim() && config.from?.trim());
}

function json(data: Record<string, unknown>, status = 200) {
  return Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
}

// A bounded, best-effort per-worker guard. Also configure an edge rate limit before enabling delivery.
export function createAttemptLimiter(now = () => Date.now()) {
  const attempts = new Map<string, { count: number; expires: number }>();
  return (client: string) => {
    const time = now();
    for (const [key, entry] of attempts) if (entry.expires <= time) attempts.delete(key);
    let entry = attempts.get(client);
    if (!entry) {
      if (attempts.size >= 10000) return false;
      entry = { count: 0, expires: time + 15 * 60 * 1000 };
      attempts.set(client, entry);
    }
    entry.count += 1;
    return entry.count <= 5;
  };
}

async function readBoundedJson(request: Request): Promise<unknown> {
  if (!request.body) throw new Error('missing-body');
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const result = await reader.read();
    if (result.done) break;
    size += result.value.length;
    if (size > maxBodyBytes) { await reader.cancel(); throw new Error('body-too-large'); }
    chunks.push(result.value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export async function handleAppointment(request: Request, config: MailConfig, dependencies: MailDependencies): Promise<Response> {
  if (request.method === 'GET') return json({ emailAvailable: emailIsAvailable(config) });
  if (request.method !== 'POST') return json({ sent: false }, 405);
  if (!emailIsAvailable(config)) return json({ sent: false, error: 'Email is not available. Please call or use WhatsApp.' }, 503);
  const origin = request.headers.get('Origin');
  if (!origin || origin !== new URL(request.url).origin) return json({ sent: false }, 403);
  if (request.headers.get('Content-Type')?.split(';')[0].trim() !== 'application/json') return json({ sent: false }, 415);
  if (Number(request.headers.get('Content-Length')) > maxBodyBytes) return json({ sent: false }, 413);
  const idempotencyKey = request.headers.get('Idempotency-Key');
  if (!idempotencyKey || !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(idempotencyKey)) return json({ sent: false, error: 'Refresh the page and try again.' }, 400);
  if (!dependencies.allowAttempt(request.headers.get('CF-Connecting-IP') || 'local')) return json({ sent: false, error: 'Please call or use WhatsApp for help with your request.' }, 429);

  let input: unknown;
  try { input = await readBoundedJson(request); }
  catch (error) { return json({ sent: false }, error instanceof Error && error.message === 'body-too-large' ? 413 : 400); }
  if (input && typeof input === 'object' && 'company' in input && input.company) return json({ sent: false }, 400);
  const validation = validateAppointment(input);
  if (!validation.ok) return json({ sent: false, error: validation.error }, 400);
  const details = validation.details;
  const text = [
    'Routine website visit request — not a confirmed appointment.',
    'Please contact the visitor to confirm a suitable time.',
    '',
    `Name: ${details.name}`,
    `Phone: ${details.phone}`,
    `Email: ${details.email || 'Not provided'}`,
    `Preferred day/time (Akure, WAT): ${details.preferredTime}`,
    '',
    'Reason for visiting (provided by visitor):',
    details.reason,
  ].join('\n');
  try {
    const response = await dependencies.fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${config.apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': `clinic-visit-${idempotencyKey}` },
      body: JSON.stringify({ from: config.from, to: [recipient], subject: 'Routine clinic visit request', text, ...(details.email ? { reply_to: details.email } : {}) }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return json({ sent: false }, 502);
    const result = await response.json() as { id?: unknown };
    if (typeof result.id !== 'string' || !result.id) return json({ sent: false }, 502);
    return json({ sent: true });
  } catch {
    // Never log patient details, credentials, or raw provider errors.
    return json({ sent: false }, 502);
  }
}

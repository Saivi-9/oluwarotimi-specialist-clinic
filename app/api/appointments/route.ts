import { env } from 'cloudflare:workers';
import { createAttemptLimiter, handleAppointment, type MailConfig } from '@/lib/appointment-mail';

const allowAttempt = createAttemptLimiter();

function configuration(): MailConfig {
  const bindings = env as Record<string, unknown>;
  const value = (key: string) => typeof bindings[key] === 'string' ? bindings[key] as string : undefined;
  return { enabled: value('APPOINTMENTS_ENABLED'), apiKey: value('RESEND_API_KEY'), from: value('APPOINTMENT_FROM') };
}

export function GET(request: Request) {
  return handleAppointment(request, configuration(), { fetch, allowAttempt });
}

export function POST(request: Request) {
  return handleAppointment(request, configuration(), { fetch, allowAttempt });
}

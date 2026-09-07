import test from 'node:test';
import assert from 'node:assert/strict';
import { createAttemptLimiter, emailIsAvailable, handleAppointment } from '../lib/appointment-mail.ts';
import { validateAppointment } from '../lib/appointment-validation.ts';

const details = { name: 'Preview Test', phone: '+234 800 000 0000', email: 'preview@example.com', reason: 'Routine review', preferredTime: 'Next Monday at 10 AM', company: '' };
const config = { enabled: 'true', apiKey: 'test-key-not-a-real-credential', from: 'Clinic <requests@example.com>' };
function request(body = details, headers = {}) {
  return new Request('https://clinic.example/api/appointments', { method: 'POST', headers: { Origin: 'https://clinic.example', 'Content-Type': 'application/json', 'Idempotency-Key': '12345678-1234-4234-8234-123456789012', ...headers }, body: JSON.stringify(body) });
}
const noSend = { fetch: async () => { assert.fail('No provider call should occur'); }, allowAttempt: () => true };

test('email remains disabled until explicitly enabled with both secrets', () => {
  assert.equal(emailIsAvailable({}), false);
  assert.equal(emailIsAvailable({ ...config, enabled: 'false' }), false);
  assert.equal(emailIsAvailable({ ...config, from: '' }), false);
  assert.equal(emailIsAvailable(config), true);
});

test('configuration exposes only availability and never credentials', async () => {
  const response = await handleAppointment(new Request('https://clinic.example/api/appointments'), config, noSend);
  assert.deepEqual(await response.json(), { emailAvailable: true });
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
});

test('unconfigured delivery fails closed without contacting the provider', async () => {
  const response = await handleAppointment(request(), {}, noSend);
  assert.equal(response.status, 503);
  assert.equal((await response.json()).sent, false);
});

test('validates and trims the same required fields for email and WhatsApp', () => {
  assert.equal(validateAppointment({ ...details, name: '  Preview Test  ' }).details.name, 'Preview Test');
  for (const bad of [{ name: ' ' }, { phone: 'letters' }, { phone: '123456' }, { phone: '1'.repeat(16) }, { email: 'bad@' }, { reason: ' ' }, { reason: 'a'.repeat(501) }, { preferredTime: '' }, { name: 'A\nB' }]) {
    assert.equal(validateAppointment({ ...details, ...bad }).ok, false, JSON.stringify(bad));
  }
  assert.equal(validateAppointment({ ...details, email: '' }).ok, true);
  assert.equal(validateAppointment(null).ok, false);
});

test('rejects malformed, cross-origin, oversized and honeypot requests without sending', async () => {
  const cases = [
    [request(details, { Origin: 'https://unrelated.example' }), 403],
    [request(details, { Origin: '' }), 403],
    [request(details, { 'Content-Type': 'text/plain' }), 415],
    [request(details, { 'Idempotency-Key': 'bad' }), 400],
    [request({ ...details, company: 'spam' }), 400],
    [request({ ...details, phone: 'wrong' }), 400],
    [request({ ...details, reason: 'a'.repeat(9000) }), 413],
    [new Request('https://clinic.example/api/appointments', { method: 'POST', headers: { Origin: 'https://clinic.example', 'Content-Type': 'application/json', 'Idempotency-Key': '12345678-1234-4234-8234-123456789012' }, body: '{broken' }), 400],
  ];
  for (const [input, status] of cases) assert.equal((await handleAppointment(input, config, noSend)).status, status);
});

test('uses a fixed clinic recipient, plain text, timeout and idempotency key', async () => {
  let calls = 0;
  const response = await handleAppointment(request({ ...details, to: 'attacker@example.com' }), config, {
    allowAttempt: () => true,
    fetch: async (url, init) => {
      calls++;
      assert.equal(url, 'https://api.resend.com/emails');
      const body = JSON.parse(init.body);
      assert.deepEqual(body.to, ['folorunsooluwarotimi@gmail.com']);
      assert.equal(body.subject, 'Routine clinic visit request');
      assert.equal(body.reply_to, details.email);
      assert.match(body.text, /not a confirmed appointment/);
      assert.match(body.text, /Next Monday at 10 AM/);
      assert.equal(body.html, undefined);
      assert.equal(init.headers['Idempotency-Key'], 'clinic-visit-12345678-1234-4234-8234-123456789012');
      assert.ok(init.signal);
      return Response.json({ id: 'mock-provider-id' });
    },
  });
  assert.equal(calls, 1);
  assert.deepEqual(await response.json(), { sent: true });
});

test('provider errors and ambiguous responses are never reported as sent', async () => {
  const failures = [
    async () => new Response('Provider details must not reach the client', { status: 429 }),
    async () => Response.json({ unexpected: true }),
    async () => new Response('not JSON'),
    async () => { throw new Error('private provider failure'); },
  ];
  for (const fakeFetch of failures) {
    const response = await handleAppointment(request(), config, { allowAttempt: () => true, fetch: fakeFetch });
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), { sent: false });
  }
});

test('rate limit blocks excess attempts and expires after fifteen minutes', async () => {
  let time = 1000;
  const allow = createAttemptLimiter(() => time);
  for (let i = 0; i < 5; i++) assert.equal(allow('test-client'), true);
  assert.equal(allow('test-client'), false);
  assert.equal(allow('different-client'), true);
  time += 15 * 60 * 1000;
  assert.equal(allow('test-client'), true);
  const blocked = await handleAppointment(request(), config, { ...noSend, allowAttempt: () => false });
  assert.equal(blocked.status, 429);
});

export type AppointmentDetails = {
  name: string;
  phone: string;
  email: string;
  reason: string;
  preferredTime: string;
};

const SINGLE_LINE_CONTROL_CHARS = /[\x00-\x1F\x7F]/;
const MULTILINE_DISALLOWED_CONTROL_CHARS = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/;

export function validateAppointment(input: unknown): { ok: true; details: AppointmentDetails } | { ok: false; error: string } {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { ok: false, error: 'Please check your visit details.' };
  const values = input as Record<string, unknown>;
  const text = (key: string) => typeof values[key] === 'string' ? values[key].trim().replace(/[ \t]+/g, ' ') : '';
  const multilineText = (key: string) => typeof values[key] === 'string'
    ? values[key].replace(/\r\n?/g, '\n').trim().replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n')
    : '';
  const details = {
    name: text('name'),
    phone: text('phone'),
    email: text('email').toLowerCase(),
    reason: multilineText('reason'),
    preferredTime: text('preferredTime'),
  };
  if (details.name.length < 2 || details.name.length > 100 || SINGLE_LINE_CONTROL_CHARS.test(details.name)) return { ok: false, error: 'Enter your name (2–100 characters).' };
  const digits = details.phone.replace(/\D/g, '');
  const plusCount = (details.phone.match(/\+/g) || []).length;
  const validPlusPlacement = plusCount === 0 || (plusCount === 1 && details.phone.startsWith('+'));
  let parenDepth = 0;
  let balancedParens = !details.phone.includes('()');
  for (const ch of details.phone) {
    if (ch === '(') {
      parenDepth++;
      if (parenDepth > 1) {
        balancedParens = false;
        break;
      }
    } else if (ch === ')') {
      parenDepth--;
      if (parenDepth < 0) {
        balancedParens = false;
        break;
      }
    }
  }
  if (parenDepth !== 0) balancedParens = false;
  if (!/^[+\d() .-]+$/.test(details.phone) || !validPlusPlacement || !balancedParens || digits.length < 7 || digits.length > 15 || details.phone.length > 30) return { ok: false, error: 'Enter a valid contact number with 7–15 digits.' };
  const emailDomain = details.email.split('@')[1] ?? '';
  const hasInvalidDomainLabel = details.email
    ? emailDomain.split('.').some((label) => !label || label.startsWith('-') || label.endsWith('-'))
    : false;
  if (details.email && (details.email.length > 254 || details.email.includes('..') || details.email.endsWith('.') || hasInvalidDomainLabel || SINGLE_LINE_CONTROL_CHARS.test(details.email) || !/^[^\s@.][^\s@]*@[^\s@.][^\s@]*\.[^\s@.]+$/.test(details.email))) return { ok: false, error: 'Check your email address, or leave it blank.' };
  if (details.reason.length < 3 || details.reason.length > 500 || MULTILINE_DISALLOWED_CONTROL_CHARS.test(details.reason)) return { ok: false, error: 'Add a brief reason for your visit (3–500 characters).' };
  if (details.preferredTime.length < 3 || details.preferredTime.length > 120 || SINGLE_LINE_CONTROL_CHARS.test(details.preferredTime)) return { ok: false, error: 'Add your preferred day and time (3–120 characters).' };
  return { ok: true, details };
}

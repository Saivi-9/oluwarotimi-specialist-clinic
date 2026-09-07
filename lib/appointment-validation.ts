export type AppointmentDetails = {
  name: string;
  phone: string;
  email: string;
  reason: string;
  preferredTime: string;
};

export function validateAppointment(input: unknown): { ok: true; details: AppointmentDetails } | { ok: false; error: string } {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { ok: false, error: 'Please check your visit details.' };
  const values = input as Record<string, unknown>;
  const text = (key: string) => typeof values[key] === 'string' ? values[key].trim() : '';
  const details = { name: text('name'), phone: text('phone'), email: text('email'), reason: text('reason'), preferredTime: text('preferredTime') };
  if (details.name.length < 2 || details.name.length > 100 || /[\r\n]/.test(details.name)) return { ok: false, error: 'Enter your name (2–100 characters).' };
  const digits = details.phone.replace(/\D/g, '');
  if (!/^[+\d() .-]+$/.test(details.phone) || digits.length < 7 || digits.length > 15 || details.phone.length > 30) return { ok: false, error: 'Enter a valid contact number with 7–15 digits.' };
  if (details.email && (details.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email))) return { ok: false, error: 'Check your email address, or leave it blank.' };
  if (details.reason.length < 3 || details.reason.length > 500) return { ok: false, error: 'Add a brief reason for your visit (3–500 characters).' };
  if (details.preferredTime.length < 3 || details.preferredTime.length > 120 || /[\r\n]/.test(details.preferredTime)) return { ok: false, error: 'Add your preferred day and time (3–120 characters).' };
  return { ok: true, details };
}

'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, Mail, MessageCircle } from 'lucide-react';
import { clinic } from '@/lib/clinic';
import { validateAppointment } from '@/lib/appointment-validation';

type Status = 'idle' | 'sending' | 'sent' | 'draft' | 'error' | 'invalid';
const emptyForm = { name: '', phone: '', email: '', reason: '', preferredTime: '', company: '' };

export default function AppointmentForm() {
  const [fields, setFields] = useState(emptyForm);
  const [emailAvailable, setEmailAvailable] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);
  const requestId = useRef<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/appointments', { signal: controller.signal, cache: 'no-store' })
      .then((response) => response.ok ? response.json() as Promise<{ emailAvailable?: boolean }> : null)
      .then((data) => setEmailAvailable(data?.emailAvailable === true))
      .catch(() => { /* WhatsApp stays available if the email service cannot be checked. */ });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (status === 'draft' || status === 'error' || status === 'sent' || status === 'invalid') resultRef.current?.focus();
  }, [status]);

  const whatsappMessage = [
    'Hello, I would like to request a routine clinic visit.',
    `Name: ${fields.name.trim()}`,
    `Phone: ${fields.phone.trim()}`,
    fields.email.trim() ? `Email: ${fields.email.trim()}` : '',
    `Reason: ${fields.reason.trim()}`,
    `Preferred day/time (Akure): ${fields.preferredTime.trim()}`,
    'Please contact me to confirm availability.',
  ].filter(Boolean).join('\n');
  const whatsappUrl = clinic.whatsapp + '?text=' + encodeURIComponent(whatsappMessage);

  function update(field: keyof typeof emptyForm, value: string) {
    setFields((previous) => ({ ...previous, [field]: value }));
    requestId.current = null;
    setStatus('idle');
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;
    const validation = validateAppointment(fields);
    if (!validation.ok) {
      setError(validation.error);
      setStatus('invalid');
      return;
    }
    if (!emailAvailable) {
      setStatus('draft');
      return;
    }
    setStatus('sending');
    setError('');
    requestId.current ??= crypto.randomUUID();
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': requestId.current },
        body: JSON.stringify(fields),
        signal: AbortSignal.timeout(15000),
      });
      const data = await response.json() as { sent?: boolean };
      if (!response.ok || data?.sent !== true) {
        throw new Error(response.status === 400 ? 'Please check the details and try again.' : 'We could not confirm email delivery. Please call or use WhatsApp instead.');
      }
      setStatus('sent');
    } catch (cause) {
      setError(cause instanceof Error && cause.name !== 'TimeoutError' && cause.name !== 'TypeError'
        ? cause.message : 'We could not confirm email delivery. Please call or use WhatsApp instead.');
      setStatus('error');
    }
  }

  return (
    <form className="appointment-form" onSubmit={submit} data-testid="form-visit-request">
      <div className="form-heading">
        {emailAvailable ? <Mail aria-hidden="true" /> : <MessageCircle aria-hidden="true" />}
        <div><h3>Request a routine visit</h3><p>{emailAvailable ? 'Send your request to the clinic by email.' : 'Prepare a message to send to the clinic on WhatsApp.'}</p></div>
      </div>
      <fieldset disabled={status === 'sending' || status === 'sent'}>
        <legend className="sr-only">Your contact details and preferred visit</legend>
        <label htmlFor="request-name">Your name</label>
        <input id="request-name" name="name" autoComplete="name" required minLength={2} maxLength={100} value={fields.name} onChange={(event) => update('name', event.target.value)} data-testid="input-request-name" />
        <label htmlFor="request-phone">Phone number</label>
        <input id="request-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required minLength={7} maxLength={30} value={fields.phone} onChange={(event) => update('phone', event.target.value)} data-testid="input-request-phone" />
        <label htmlFor="request-email">Email address <span>(optional)</span></label>
        <input id="request-email" name="email" type="email" autoComplete="email" maxLength={254} value={fields.email} onChange={(event) => update('email', event.target.value)} />
        <label htmlFor="request-reason">Reason for your visit</label>
        <textarea id="request-reason" name="reason" rows={3} required minLength={3} maxLength={500} aria-describedby="request-privacy" placeholder="For example, a blood pressure review" value={fields.reason} onChange={(event) => update('reason', event.target.value)} data-testid="textarea-request-reason" />
        <label htmlFor="request-preferred">Preferred day and time <span>(Akure time)</span></label>
        <input id="request-preferred" name="preferredTime" required minLength={3} maxLength={120} placeholder="For example, next Monday at 10 AM" aria-describedby="request-time-hint" value={fields.preferredTime} onChange={(event) => update('preferredTime', event.target.value)} data-testid="input-request-preferred" />
        <p id="request-time-hint" className="field-hint">Monday–Saturday, from 8 AM. The clinic will confirm availability.</p>
        <div className="form-honeypot" aria-hidden="true"><label htmlFor="request-company">Company</label><input id="request-company" name="company" tabIndex={-1} autoComplete="off" value={fields.company} onChange={(event) => update('company', event.target.value)} /></div>
        <p id="request-privacy" className="form-privacy">Share only a brief reason, not medical records or sensitive details. {emailAvailable ? 'Submitting sends these details to the clinic through its email provider.' : 'Your details stay in this form until you choose “Open WhatsApp”. You will then need to send the message in WhatsApp.'}</p>
        <button type="submit" className="action action--primary form-submit" disabled={status === 'sending' || status === 'sent'} data-testid="button-submit-request">
          {status === 'sending' ? 'Sending request…' : status === 'sent' ? 'Request sent' : emailAvailable ? 'Send visit request' : 'Prepare WhatsApp request'}<ArrowRight aria-hidden="true" />
        </button>
        {emailAvailable && <p className="form-alternative">Prefer messaging? <a href={clinic.whatsapp} target="_blank" rel="noreferrer">Contact the clinic on WhatsApp</a>.</p>}
      </fieldset>
      {status === 'invalid' && <div className="form-result form-result--error" role="alert" ref={resultRef} tabIndex={-1}><h4>Please check your details</h4><p>{error}</p></div>}
      {(status === 'draft' || status === 'error' || status === 'sent') && <div className={'form-result form-result--' + status} ref={resultRef} tabIndex={-1} role="status" data-testid="request-result">
        {status === 'sent' ? <><CheckCircle2 aria-hidden="true" /><h4>Your request has been sent.</h4><p>The clinic will contact you to confirm a suitable time. This is not yet a confirmed appointment.</p></> : <><h4>{status === 'error' ? 'Please use another contact option' : 'Your WhatsApp draft is ready'}</h4><p>{status === 'error' ? error : 'Nothing has been sent yet. Open WhatsApp, review your message and press Send there.'}</p><a href={whatsappUrl} target="_blank" rel="noreferrer" className="action action--outline" data-testid="link-whatsapp-draft">Open WhatsApp <MessageCircle aria-hidden="true" /></a><p className="small-copy">No WhatsApp? <a href={clinic.telephone}>Call {clinic.localPhone}</a>.</p></>}
      </div>}
    </form>
  );
}

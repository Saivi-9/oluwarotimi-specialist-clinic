# Appointment email: prepared, not activated

The website currently prepares a WhatsApp message. Visitors must open WhatsApp and press **Send**; the website does not claim it has sent that message. No patient account or database is involved.

Direct email delivery is implemented through Resend, but remains off unless all three server-side settings below are present. No API key, sender domain or paid account has been created by this change, and no real appointment email was sent during development.

## What the clinic needs to provide

1. A Resend account and a domain the clinic controls. Verify the sender domain following [Resend's domain guide](https://resend.com/docs/dashboard/domains/introduction). The existing Gmail inbox can receive requests but is not a verified sending domain.
2. A sending API key, supplied as a server secret, never in source control or a `NEXT_PUBLIC_`/`VITE_` variable.
3. A verified sender address, for example `Oluwarotimi Clinic <appointments@your-clinic-domain.example>`. This is an example, not a registered address.
4. Confirmation that the existing clinic inbox, `folorunsooluwarotimi@gmail.com`, is the intended recipient and that staff will monitor it. The recipient is fixed in server code and cannot be changed by a visitor.

## Server settings

| Setting | Purpose |
| --- | --- |
| `APPOINTMENTS_ENABLED` | Set to `true` only after preparation and delivery checks. Defaults to off. |
| `RESEND_API_KEY` | Secret sending API key. |
| `APPOINTMENT_FROM` | Verified sender address, optionally with the clinic display name. |

Locally, copy `.dev.vars.example` to ignored `.dev.vars`, enter the values securely and restart the development server. The Cloudflare runtime reads these as bindings. For hosting, add the same values using the platform's server environment/secrets settings. Do not commit `.dev.vars` or share a preview with live sending credentials unless that is intentional.

`GET /api/appointments` returns only whether email is available. The form switches to “Send visit request” when configuration is active; WhatsApp remains an alternative. Removing or disabling configuration restores the WhatsApp flow. A provider failure leaves the entered details in place and offers phone/WhatsApp instead of a false success message.

## Before enabling public email delivery

- Arrange an authorized end-to-end test using synthetic details. Verify receipt in the actual inbox, reply behaviour, spam-folder handling and the failure fallback. Automated tests use a fake transport and do not prove inbox delivery.
- Configure an edge rate-limit rule for `POST /api/appointments` on the hosting platform. The included per-worker limit is best-effort only; it is not a distributed anti-abuse service. Consider a bot challenge if abuse occurs.
- Have the clinic approve the short data-use notice, staff access and retention practices for its email and WhatsApp accounts. The form requests only a short reason and explicitly discourages medical records or sensitive details. It is not a secure patient portal.
- Confirm the clinic's response process. A sent request is not a confirmed appointment, and email-provider acceptance does not guarantee inbox delivery.

## Implementation safeguards

The endpoint accepts same-origin JSON requests only, limits payload size, validates contact and visit fields, rejects a honeypot, and keeps the destination address server-controlled. It sends plain text, applies a provider timeout, and uses an [idempotency key](https://resend.com/docs/dashboard/emails/idempotency-keys) for retries. It does not log patient information or raw provider errors. Requests are not saved in a website database or browser storage.

The Resend request follows the official [send email API](https://resend.com/docs/api-reference/emails/send-email). A success response is shown only after the provider accepts the request with a message ID. If delivery is uncertain, the visitor is directed to call or use WhatsApp.

## Verification commands

```powershell
node --experimental-strip-types --test tests/*.test.mjs
node node_modules/typescript/bin/tsc --noEmit --incremental false
node node_modules/vinext/dist/cli.js build
```

No tests above send real emails. To test actual delivery later, get the clinic's approval first.

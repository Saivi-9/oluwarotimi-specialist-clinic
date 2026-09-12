# Oluwarotimi Specialist Clinic & Diagnostic Centre

Website source for **Oluwarotimi Specialist Clinic**, a cardiology-focused clinic in Akure, Ondo State, Nigeria.

## What is included

- Responsive, patient-friendly clinic website
- Cardiology services and consultant profile
- Directions, opening hours, and contact information
- WhatsApp visit-request form with contact details and preferred visit time
- Optional server-side appointment email integration (off until configured)
- Readable heart-health guidance, emergency guidance and click-to-load map
- Approved recreation of the original clinic crest with a compact, bold wordmark
- The supplied consultant, equipment and reception photographs

The restored crest is displayed through an SVG mask so its white proof background
does not appear in the header or footer. The source PNG is not a transparent or
vector master. The original photograph remains at `public/olumaro-clinic-logo.jpg`
as a backup; existing social-preview metadata is unchanged.

See [appointment email setup](docs/appointment-email-setup.md) for configuration,
privacy and delivery checks before activating email. The website does not save
requests in a database or browser storage; submitted messages go through the
visitor's chosen contact channel.

## Run locally

```bash
pnpm install
pnpm dev
```

Then open the local address shown in the terminal.

## Cloudflare hosting

The independent Cloudflare deployment is prepared separately from the existing
host. See [Cloudflare migration](docs/cloudflare-migration.md) for build, account,
domain and rollback steps. No DNS changes happen when building or testing.

## Published site metadata

The Cloudflare build sets `NEXT_PUBLIC_SITE_URL` to
`https://oluwarotimiclinic.com` unless a build-time override is provided.
The layout uses this value for absolute social-preview URLs. The existing
hosting build continues to use its own environment setting.

## Check changes

```bash
pnpm test
pnpm exec tsc --noEmit --incremental false
pnpm build
```

Tests use a fake email transport and do not send real patient messages.

## Important

This website provides general clinic information only; it should not be used for medical emergencies or as a replacement for professional medical advice.

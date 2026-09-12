# Independent Cloudflare hosting

This is a staged migration, not a completed domain connection. The existing
website stays online until the independent deployment and custom domain are
verified. The clinic design, content, photographs and motion are unchanged.

## Build and test

Use the existing pnpm lockfile and supported Node.js version (22.13 or newer).

```sh
pnpm install --frozen-lockfile
pnpm test
pnpm typecheck
pnpm build:cloudflare
pnpm check:cloudflare
pnpm preview:cloudflare
```

With the preview running at `http://127.0.0.1:8787`, run
`pnpm test:cloudflare-preview` in a second terminal. This local-only smoke check
verifies the homepage, linked assets, social metadata and disabled email route.

The Cloudflare configuration does not import the Sites plugin or hosting
manifest. It outputs `dist-cloudflare/client` and `dist-cloudflare/server`,
leaving the old `dist` build untouched. The old Vite configuration and its
development dependency are retained only for rollback during migration.

The build defaults `NEXT_PUBLIC_SITE_URL` to `https://oluwarotimiclinic.com`.
Override this **at build time**, not only in runtime settings, if the public
origin changes. No secret may use a `NEXT_PUBLIC_` or `VITE_` prefix.

## Deploy under the clinic's Cloudflare account

1. Sign into the intended Cloudflare account. A browser login does not also
   authenticate Wrangler. Use the official Wrangler login flow for local
   deployment, or connect GitHub through Cloudflare Workers Builds.
2. Check the account identity before deploying. Do not use shared API tokens
   pasted into chat or source files.
3. After the successful build and dry run, deploy with `pnpm deploy:cloudflare`.
   This uses the generated Worker configuration, not uncompiled source.
4. Test the actual returned `workers.dev` address. Do not invent its account
   suffix. This is a temporary test address; the public clinic address remains
   `oluwarotimiclinic.com` once connected.

For Workers Builds, select the repository `Saivi-9/oluwarotimi-specialist-clinic`
and the approved branch containing these migration files. Use:

| Setting | Value |
| --- | --- |
| Worker name | `oluwarotimi-specialist-clinic` |
| Root directory | Repository root |
| Build command | `pnpm build:cloudflare` |
| Deploy command | `pnpm deploy:cloudflare` |

Disable non-production branch builds initially. No GitHub token or Cloudflare
account ID is committed. Review plan limits before publishing; this setup
does not purchase a plan or enable paid services.

## Connect the domain only after preview verification

1. Add `oluwarotimiclinic.com` as a Cloudflare zone, keeping the registration
   and renewal at Namecheap.
2. Inventory and preserve the current DNS records, especially email MX and
   SPF/DKIM/DMARC TXT records. Namecheap's email-forwarding service needs a
   separate compatibility check before changing nameservers; do not assume
   its locked settings will continue working on third-party DNS.
3. Review the imported records before changing nameservers. Use only the
   exact nameservers assigned to this domain by Cloudflare. Do not guess them
   or mix the earlier Sites verification records into the new instructions.
4. After the zone becomes active, add the apex and `www` under the Worker's
   **Settings > Domains & Routes > Add > Custom Domain**. Resolve only known
   conflicting website records. Preserve unrelated email records.
5. Verify HTTPS, images, scripts, mobile navigation, form fallback and the
   appointment API on both hostnames. Set one canonical hostname and a
   permanent redirect from the other only after both work.
6. Record the verified domain routes in the deployment configuration to keep
   future releases consistent. Disable the temporary `workers.dev` route if
   desired after the custom domain works.
7. Only then retire the old hosted copy and its obsolete verification records.

No domain routes are preconfigured: a deploy must not prematurely change DNS.

## Appointment safety

`APPOINTMENTS_ENABLED` is explicitly `false`. Email delivery stays off and the
existing WhatsApp fallback remains available. No database is provisioned.
Worker observability is off initially to avoid introducing application logs.

Do not treat moving hosts as making a patient-data workflow compliant. See
[appointment email setup](appointment-email-setup.md) for the separate privacy,
anti-abuse, staff process and delivery requirements before enabling email.
Do not use real patient data for testing.

## Rollback

Keep the current hosted version available until cutover is verified. If the
new deployment fails, leave DNS untouched and correct the build. If a DNS
cutover has problems, restore only the recorded prior website configuration;
do not replace all DNS records. The unchanged original `pnpm dev` / `pnpm build`
flow remains available during this migration.

## References

- [Cloudflare framework support](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)
- [Workers Builds settings](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)
- [Worker custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)

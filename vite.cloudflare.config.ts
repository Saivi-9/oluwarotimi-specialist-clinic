import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { defineConfig } from 'vite';

// Independent Cloudflare build. The existing Vite config remains available
// until the new host and domain have been verified.
export default defineConfig(async () => {
  process.env.WRANGLER_WRITE_LOGS ??= 'false';
  process.env.WRANGLER_LOG_PATH ??= '.wrangler/logs';
  process.env.MINIFLARE_REGISTRY_PATH ??= '.wrangler/registry';
  process.env.NEXT_PUBLIC_SITE_URL ??= 'https://oluwarotimiclinic.com';

  const { cloudflare } = await import('@cloudflare/vite-plugin');

  return {
    css: { postcss: { plugins: [tailwindcss()] } },
    define: {
      'process.env.NEXT_PUBLIC_SITE_URL': JSON.stringify(process.env.NEXT_PUBLIC_SITE_URL),
    },
    build: { outDir: 'dist-cloudflare' },
    environments: {
      client: { build: { outDir: 'dist-cloudflare/client' } },
      rsc: { build: { outDir: 'dist-cloudflare/server' } },
      ssr: { build: { outDir: 'dist-cloudflare/server/ssr' } },
    },
    plugins: [
      vinext({
        rscOutDir: 'dist-cloudflare/server',
        ssrOutDir: 'dist-cloudflare/server/ssr',
        clientOutDir: 'dist-cloudflare/client',
      }),
      cloudflare({
        configPath: 'wrangler.cloudflare.jsonc',
        viteEnvironment: { name: 'rsc', childEnvironments: ['ssr'] },
        inspectorPort: false,
      }),
    ],
  };
});

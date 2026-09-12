import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Use the locked Wrangler version, with non-secret tool state kept local.
// Authentication remains Wrangler-managed; this script never reads tokens.
const child = spawn(process.execPath, [
  fileURLToPath(new URL('../node_modules/wrangler/bin/wrangler.js', import.meta.url)),
  ...process.argv.slice(2),
], {
  cwd: fileURLToPath(new URL('../', import.meta.url)),
  env: {
    ...process.env,
    WRANGLER_WRITE_LOGS: 'false',
    WRANGLER_LOG_PATH: '.wrangler/logs',
    MINIFLARE_REGISTRY_PATH: '.wrangler/registry',
    WRANGLER_SEND_METRICS: 'false',
  },
  stdio: 'inherit',
});

child.on('error', (error) => {
  console.error(`Unable to start Cloudflare tooling: ${error.message}`);
  process.exitCode = 1;
});
child.on('exit', (code) => { process.exitCode = code ?? 1; });

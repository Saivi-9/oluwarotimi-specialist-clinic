import assert from 'node:assert/strict';

// Intentionally local-only: never send test requests to a real clinic inbox.
const base = 'http://127.0.0.1:8787';
const home = await fetch(base);
assert.equal(home.status, 200, 'Homepage must load');
const html = await home.text();
assert.match(html, /Oluwarotimi Specialist Clinic/);
assert.match(html, /https:\/\/oluwarotimiclinic\.com\/olumaro-clinic-logo\.jpg/,
  'Social metadata must use the clinic domain');
assert.doesNotMatch(html, /\.chatgpt\.site/i, 'No old hosting URL in rendered HTML');

const assets = [...new Set([...html.matchAll(/(?:src|href)="(\/[^"\s]+\.(?:css|js|png|jpg|jpeg|webp|svg)(?:\?[^"\s]*)?)"/g)]
  .map((match) => match[1]))];
assert.ok(assets.length >= 5, 'Expected clinic images and application assets');
await Promise.all(assets.map(async (path) => {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 200, `Asset must load: ${path}`);
  assert.doesNotMatch(response.headers.get('content-type') ?? '', /text\/html/,
    `Asset must not return an HTML fallback: ${path}`);
  assert.ok((await response.arrayBuffer()).byteLength > 0, `Empty asset: ${path}`);
}));

const availability = await fetch(`${base}/api/appointments`);
assert.equal(availability.status, 200);
assert.match(availability.headers.get('cache-control') ?? '', /no-store/);
assert.deepEqual(await availability.json(), { emailAvailable: false },
  'Stop before POST if email is enabled');
const disabledPost = await fetch(`${base}/api/appointments`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Origin: base },
  body: '{}',
});
assert.equal(disabledPost.status, 503, 'Disabled delivery must fail closed');
assert.match(disabledPost.headers.get('cache-control') ?? '', /no-store/);
console.log(`Passed: homepage, clinic-domain metadata, ${assets.length} assets, and disabled appointment API. No email sent.`);

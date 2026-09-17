// Verify the public homepage, not just a successful FTP transfer.
// No credentials, form submissions or writes to the web server.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { setTimeout as delay } from 'node:timers/promises';

const expected = await readFile(new URL('../hostland-export/index.html', import.meta.url), 'utf8');
const digest = value => createHash('sha256').update(value).digest('hex');
const expectedHash = digest(expected);
const version = process.env.GITHUB_SHA || expectedHash.slice(0, 12);
for (const path of ['/', '/index.html']) {
  let failure;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const url = new URL(path, 'https://plancod.ru');
      url.searchParams.set('release', version);
      url.searchParams.set('check', String(attempt));
      const response = await fetch(url, {
        headers: { 'Cache-Control': 'no-cache', 'User-Agent': 'Plancod-Deployment-Check' },
        signal: AbortSignal.timeout(20000),
      });
      assert(response.ok, `HTTP ${response.status}`);
      assert.equal(new URL(response.url).origin, 'https://plancod.ru', 'Unexpected redirect origin');
      const html = await response.text();
      const heading = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      console.log(JSON.stringify({ path, status: response.status, heading, lastModified: response.headers.get('last-modified'), cacheControl: response.headers.get('cache-control'), age: response.headers.get('age'), sha256: digest(html) }));
      assert.equal(digest(html), expectedHash, 'Published homepage differs from this build');
      console.log(`PASS published homepage ${path}`);
      failure = null;
      break;
    } catch (error) {
      failure = error;
      console.error(`Attempt ${attempt}: ${path}: ${error.message}${error.cause?.code ? ' (' + error.cause.code + ')' : ''}`);
      if (attempt < 3) await delay(5000);
    }
  }
  if (failure) throw failure;
}

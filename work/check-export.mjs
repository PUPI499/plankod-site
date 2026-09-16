// Run after export-hostland.mjs; no network or delivery of test enquiries.
import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("../hostland-export/", import.meta.url)));
async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (entry.name.endsWith(".html")) files.push(path);
  }
  return files;
}
const files = await walk(root);
let references = 0;
for (const file of files) {
  const html = await readFile(file, "utf8");
  const pageUrl = new URL(file.slice(root.length), "https://plancod.ru/");
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1].replaceAll("&amp;", "&");
    const url = new URL(value, pageUrl);
    if (url.origin !== pageUrl.origin) continue;
    let path = resolve(root, `.${decodeURIComponent(url.pathname)}`);
    assert(path === root || path.startsWith(`${root}/`), `Path escapes export: ${value}`);
    let info;
    try { info = await stat(path); } catch { assert.fail(`Missing ${value} in ${file}`); }
    if (info.isDirectory()) path = join(path, "index.html");
    assert((await stat(path)).isFile(), `Missing page: ${value}`);
    if (url.hash && path.endsWith(".html")) {
      const target = await readFile(path, "utf8");
      assert(target.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `Missing anchor ${value} in ${file}`);
    }
    references++;
  }
  if (file.endsWith("calc.html")) continue;
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `Expected one h1: ${file}`);
  assert(html.includes('<html lang="ru">'), `Missing language: ${file}`);
  assert(html.split('</head>')[0].includes('<meta name="yandex-verification" content="054b7e6184e46585">'), `Missing Yandex verification in head: ${file}`);
  assert(html.split('</head>')[0].includes('<meta name="google-site-verification" content="unc-g3f3DDC7SPzOABLBE0PGNM4EcopoxhE1zEXYXXg">'), `Missing Google verification in head: ${file}`);
  assert(html.includes('<link rel="canonical"'), `Missing canonical: ${file}`);
  assert(html.includes('<meta property="og:url"'), `Missing share URL: ${file}`);
  if (!file.endsWith("privacy.html")) {
    const form = html.match(/<form\b[^>]*class="contact-form"[^>]*>/)?.[0] || "";
    assert(form.includes('action="/contact.php"') && form.includes('method="post"'), `Missing form: ${file}`);
    assert(html.includes('name="consent"'), `Missing consent: ${file}`);
  }
  if (/projects\/.+\/index\.html$/.test(file)) {
    assert(!html.includes('property="og:image" content="https://plancod.ru/og.png"'), `Generic project preview: ${file}`);
    assert(html.includes('class="case-gallery-item'), `Missing project drawings: ${file}`);
  }
}
console.log(`Static QA passed: ${files.length} pages, ${references} local links and assets.`);

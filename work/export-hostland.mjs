// Static export for classic shared hosting (e.g. Hostland file manager).
// Renders every app/*/page.tsx route to plain, self-contained HTML with
// inlined CSS, standard filenames (index.html + friends), OG/meta tags,
// and copies public assets. No Node server, no Cloudflare Worker needed.
import { build } from "esbuild";
import { readFile, writeFile, mkdir, copyFile, rm } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";

const OUT_DIR = new URL("../hostland-export/", import.meta.url);

const routes = [
  {
    entry: "../app/page.tsx",
    bundle: "./tmp-home.mjs",
    output: "index.html",
    title: "ПЛАНКОД — проектирование, инженерные системы и умный дом",
    description: "Проектирование отопления, вентиляции и кондиционирования, монтаж, умный дом и поставка оборудования.",
    ogImage: "https://plancod.ru/og.png",
    clientScript: "catalog.js",
  },
  {
    entry: "../app/smart-home/page.tsx",
    bundle: "./tmp-smart.mjs",
    output: "smart-home.html",
    title: "Умный дом под ключ — ПЛАНКОД",
    description: "Интеграция отопления, вентиляции, кондиционирования и безопасности в умный дом.",
    ogImage: "https://plancod.ru/og.png",
    clientScript: "catalog.js",
  },
  {
    entry: "../app/projects/page.tsx",
    bundle: "./tmp-projects.mjs",
    output: "projects.html",
    title: "Проектирование и объекты — ПЛАНКОД",
    description: "Проектирование инженерных систем частных домов и коммерческих помещений.",
    ogImage: "https://plancod.ru/og.png",
    clientScript: "catalog.js",
  },
  {
    entry: "../app/products/page.tsx",
    bundle: "./tmp-products.mjs",
    output: "products.html",
    title: "Продукция для умного дома — ПЛАНКОД",
    description: "Оборудование для умного дома и кондиционирования с подбором, доставкой и монтажом.",
    ogImage: "https://plancod.ru/og.png",
    clientScript: "catalog.js",
  },
  {
    entry: "../app/about/page.tsx",
    bundle: "./tmp-about.mjs",
    output: "about.html",
    title: "О компании — ПЛАНКОД",
    description: "ПЛАНКОД — проектирование, поставка, монтаж и сервис инженерных систем и умного дома с 2022 года.",
    ogImage: "https://plancod.ru/og.png",
    clientScript: "catalog.js",
  },
];

const LINK_MAP = {
  'href="/#contact"': 'href="index.html#contact"',
  'href="/smart-home"': 'href="smart-home.html"',
  'href="/projects"': 'href="projects.html"',
  'href="/products"': 'href="products.html"',
  'href="/about"': 'href="about.html"',
  'href="/"': 'href="index.html"',
};

function localizeLinks(markup) {
  let out = markup;
  for (const [from, to] of Object.entries(LINK_MAP)) out = out.replaceAll(from, to);
  return out;
}

await rm(OUT_DIR, { recursive: true, force: true });
await mkdir(OUT_DIR, { recursive: true });

const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

try {
  await copyFile(new URL("../public/og.png", import.meta.url), new URL("./og.png", OUT_DIR));
  console.log("copied og.png");
} catch (err) {
  console.warn("WARN: could not copy public/og.png —", err.message);
}

try {
  await copyFile(new URL("../public/favicon.svg", import.meta.url), new URL("./favicon.svg", OUT_DIR));
  console.log("copied favicon.svg");
} catch (err) {
  console.warn("WARN: could not copy public/favicon.svg —", err.message);
}

try {
  const { readdir, cp } = await import("node:fs/promises");
  const imagesDir = new URL("../public/images/", import.meta.url);
  await readdir(imagesDir); // throws if missing
  await cp(imagesDir, new URL("./images/", OUT_DIR), { recursive: true });
  console.log("copied public/images/");
} catch (err) {
  if (err.code !== "ENOENT") console.warn("WARN: could not copy public/images/ —", err.message);
}

await copyFile(new URL("./hostland-catalog.js", import.meta.url), new URL("./catalog.js", OUT_DIR));
console.log("copied catalog.js");

await copyFile(new URL("./contact.php", import.meta.url), new URL("./contact.php", OUT_DIR));
console.log("copied contact.php");

await copyFile(new URL("./calc.html", import.meta.url), new URL("./calc.html", OUT_DIR));
console.log("copied calc.html");

const SITE_URL = "https://plancod.ru";
const lastmod = new Date().toISOString().slice(0, 10);

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
await writeFile(new URL("./robots.txt", OUT_DIR), robotsTxt);
console.log("wrote robots.txt");

const sitemapUrls = [
  { path: "/", priority: "1.0" },
  { path: "/smart-home.html", priority: "0.8" },
  { path: "/projects.html", priority: "0.8" },
  { path: "/products.html", priority: "0.8" },
  { path: "/about.html", priority: "0.6" },
];
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
await writeFile(new URL("./sitemap.xml", OUT_DIR), sitemapXml);
console.log("wrote sitemap.xml");

for (const route of routes) {
  const bundledPage = new URL(route.bundle, import.meta.url);
  await build({
    entryPoints: [new URL(route.entry, import.meta.url).pathname],
    outfile: bundledPage.pathname,
    bundle: true,
    platform: "node",
    format: "esm",
    jsx: "automatic",
    external: ["react", "react/jsx-runtime", "react-dom", "react-dom/server"],
  });
  const { default: Page } = await import(`${pathToFileURL(bundledPage.pathname).href}?v=${Date.now()}`);
  const body = localizeLinks(renderToStaticMarkup(Page()));
  const scriptTag = route.clientScript ? `\n  <script defer src="${route.clientScript}"></script>` : "";
  const html = `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <title>${route.title}</title>
  <meta name="description" content="${route.description}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="ru_RU">
  <meta property="og:title" content="${route.title}">
  <meta property="og:description" content="${route.description}">
  <meta property="og:image" content="${route.ogImage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${route.title}">
  <meta name="twitter:description" content="${route.description}">
  <meta name="twitter:image" content="${route.ogImage}">
  <style>${css}</style>${scriptTag}
</head>
<body>${body}</body>
</html>`;
  await writeFile(new URL(route.output, OUT_DIR), html);
  await rm(bundledPage, { force: true });
  console.log("wrote", route.output);
}

console.log("\nDone. Static export in:", OUT_DIR.pathname);

import { build } from "esbuild";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";

const routes = [
  {
    entry: "../app/page.tsx",
    bundle: "./page-static-home.mjs",
    output: "../../../outputs/plankod-preview.html",
    title: "ПЛАНКОД — проектирование, инженерные системы и умный дом",
    description: "Проектирование отопления, вентиляции и кондиционирования, монтаж, умный дом и поставка оборудования.",
  },
  {
    entry: "../app/smart-home/page.tsx",
    bundle: "./page-static-smart.mjs",
    output: "../../../outputs/plankod-smart-home.html",
    title: "Умный дом под ключ — ПЛАНКОД",
    description: "Интеграция отопления, вентиляции, кондиционирования и безопасности в умный дом.",
  },
  {
    entry: "../app/projects/page.tsx",
    bundle: "./page-static-projects.mjs",
    output: "../../../outputs/plankod-projects.html",
    title: "Проектирование и объекты — ПЛАНКОД",
    description: "Проектирование инженерных систем частных домов и коммерческих помещений.",
  },
  {
    entry: "../app/products/page.tsx",
    bundle: "./page-static-products.mjs",
    output: "../../../outputs/plankod-products.html",
    title: "Продукция для умного дома — ПЛАНКОД",
    description: "Оборудование для умного дома и кондиционирования с подбором, доставкой и монтажом.",
  },
  {
    entry: "../app/about/page.tsx",
    bundle: "./page-static-about.mjs",
    output: "../../../outputs/plankod-about.html",
    title: "О компании — ПЛАНКОД",
    description: "ПЛАНКОД — проектирование, поставка, монтаж и сервис инженерных систем и умного дома с 2022 года.",
  },
];

const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
await mkdir(new URL("../../../outputs/", import.meta.url), { recursive: true });

function localizeLinks(markup) {
  return markup
    .replaceAll('href="/#contact"', 'href="plankod-preview.html#contact"')
    .replaceAll('href="/smart-home"', 'href="plankod-smart-home.html"')
    .replaceAll('href="/projects"', 'href="plankod-projects.html"')
    .replaceAll('href="/products"', 'href="plankod-products.html"')
    .replaceAll('href="/about"', 'href="plankod-about.html"')
    .replaceAll('href="/"', 'href="plankod-preview.html"');
}

for (const route of routes) {
  const bundledPage = new URL(route.bundle, import.meta.url);
  const outputFile = new URL(route.output, import.meta.url);
  await build({
    entryPoints: [new URL(route.entry, import.meta.url).pathname],
    outfile: bundledPage.pathname,
    bundle: true,
    platform: "node",
    format: "esm",
    jsx: "automatic",
    external: ["react", "react/jsx-runtime"],
  });
  const { default: Page } = await import(`${pathToFileURL(bundledPage.pathname).href}?v=${Date.now()}`);
  const body = localizeLinks(renderToStaticMarkup(Page()));
  const html = `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${route.title}</title>
  <meta name="description" content="${route.description}">
  <style>${css}</style>
</head>
<body>${body}</body>
</html>`;
  await writeFile(outputFile, html);
  console.log(outputFile.pathname);
}

// Post-build step: generates dist/<lang>/index.html for every language (localized <head>, canonical, hreflang,
// Open Graph, JSON-LD), plus sitemap.xml and robots.txt. When Playwright and the API are reachable, the rendered
// page content is also injected in #root so crawlers and link previews see real content. Otherwise a head-only
// shell is emitted (the SPA still renders on load).
import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const SITE = process.env.SITE_URL ?? "https://alexicourieux.com";
const DIST = resolve("dist");
const LANGS = ["en", "fr"];
const DEFAULT_LANG = "en";
const LOCALES = { en: "en_GB", fr: "fr_FR" };

const escapeHtml = (s) => s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const urlOf = (lang) => `${SITE}/${lang}/`;

const translations = Object.fromEntries(
  await Promise.all(LANGS.map(async (l) => [l, JSON.parse(await readFile(`src/assets/locales/${l}/translation.json`, "utf8"))])),
);

const template = await readFile(join(DIST, "index.html"), "utf8");

function buildHead(lang) {
  const { title, description } = translations[lang].resume.seo;
  const alternates = LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${urlOf(l)}" />`).join("\n    ");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Alexi Courieux",
    url: urlOf(lang),
    jobTitle: translations[lang].hero.title.replace(/\.$/, ""),
    description,
    email: "contact@alexicourieux.com",
    sameAs: ["https://www.github.com/alexi-courieux", "https://www.linkedin.com/in/alexi-courieux"],
  };
  return [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${urlOf(lang)}" />`,
    alternates,
    `<link rel="alternate" hreflang="x-default" href="${urlOf(DEFAULT_LANG)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Alexi Courieux" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${urlOf(lang)}" />`,
    `<meta property="og:locale" content="${LOCALES[lang]}" />`,
    ...LANGS.filter((l) => l !== lang).map((l) => `<meta property="og:locale:alternate" content="${LOCALES[l]}" />`),
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`,
  ].join("\n    ");
}

function buildShell(lang) {
  return template
    .replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)
    .replace(/<meta name="description"[^>]*>\s*/, "")
    .replace(/<title>.*?<\/title>/s, buildHead(lang));
}

// 1. head-only shells
const shells = {};
for (const lang of LANGS) {
  shells[lang] = buildShell(lang);
  await mkdir(join(DIST, lang), { recursive: true });
  await writeFile(join(DIST, lang, "index.html"), shells[lang]);
}

// 2. optional content snapshot
async function snapshot() {
  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    console.warn("[prerender] playwright not installed, skipping content snapshot");
    return;
  }
  const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".json": "application/json", ".woff2": "font/woff2", ".woff": "font/woff", ".ico": "image/x-icon" };
  const server = createServer(async (req, res) => {
    const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
    let file = join(DIST, path);
    if (!extname(file)) file = join(file, "index.html");
    if (!file.startsWith(DIST) || !existsSync(file)) file = join(DIST, "index.html");
    res.setHeader("content-type", types[extname(file)] ?? "application/octet-stream");
    res.end(await readFile(file));
  }).listen(0);
  const port = server.address().port;
  let browser;
  try {
    browser = await chromium.launch();
    // API responses are cached once they succeed and replayed for every later page load: both colour schemes get the
    // same data, and the API (rate limited: it answers 429 to bursts, without Retry-After) is hit as little as possible.
    const apiCache = new Map();
    // Renders the page in one colour scheme and returns its #root markup and the emotion CSS behind it.
    const captureOnce = async (lang, colorScheme) => {
      const page = await browser.newPage({ locale: lang, colorScheme, viewport: { width: 1280, height: 900 } });
      try {
        await page.route((url) => url.pathname.startsWith("/api/"), async (route) => {
          const key = route.request().url();
          if (!apiCache.has(key)) {
            const response = await route.fetch();
            if (!response.ok()) return route.fulfill({ response });
            apiCache.set(key, { status: response.status(), headers: response.headers(), body: await response.body() });
          }
          await route.fulfill(apiCache.get(key));
        });
        await page.goto(`http://localhost:${port}/${lang}/`, { waitUntil: "networkidle", timeout: 60_000 });
        // Content is considered ready once experiences, projects and skills are loaded (no spinner or error left).
        await page.waitForFunction(
          () => document.querySelector("#experience") && document.querySelector("#skills")
            && !document.querySelector('[role="progressbar"], [role="alert"], .MuiSkeleton-root'),
          undefined,
          { timeout: 60_000 },
        );
        // A failed API call renders ErrorMessage (no role="alert"): never bake an error into the static page.
        if (await page.$('#root [data-testid="ErrorIcon"]')) throw new Error(`the page rendered an API error (${colorScheme})`);
        return await page.evaluate(() => ({
          html: document.getElementById("root").innerHTML,
          // MUI/emotion injects its rules through CSSOM (insertRule) in production, so they are not in the markup:
          // they must be copied, otherwise the snapshot paints unstyled (e.g. full-size SVG icons) until JS boots.
          css: [...document.querySelectorAll("style[data-emotion]")]
            .flatMap((style) => [...(style.sheet?.cssRules ?? [])].map((rule) => rule.cssText))
            .join("\n"),
        }));
      } finally {
        await page.unrouteAll({ behavior: "ignoreErrors" });
        await page.close();
      }
    };
    // Retries a failed capture after a growing pause; each attempt only re-requests the API calls not cached yet.
    const RETRY_DELAYS_MS = [10_000, 30_000, 60_000];
    const capture = async (lang, colorScheme) => {
      for (let attempt = 0; ; attempt++) {
        try {
          return await captureOnce(lang, colorScheme);
        } catch (error) {
          if (attempt >= RETRY_DELAYS_MS.length) throw error;
          console.warn(`[prerender] ${lang} ${colorScheme}: ${error.message.split("\n")[0]}, retrying in ${RETRY_DELAYS_MS[attempt] / 1000}s`);
          await new Promise((done) => setTimeout(done, RETRY_DELAYS_MS[attempt]));
        }
      }
    };
    const styleTag = (scheme, css) =>
      `<style data-prerender="${scheme}">@media (prefers-color-scheme: ${scheme}) {\n${css.replaceAll("</style", "<\\/style")}\n}</style>`;

    for (const lang of LANGS) {
      try {
        const light = await capture(lang, "light");
        const dark = await capture(lang, "dark");
        // The app picks its theme from prefers-color-scheme, and light and dark render different class names and
        // logos. The light markup stays in #root (what crawlers read); the dark one waits in a <template> and is
        // swapped in synchronously, before first paint, when the visitor's system is dark. Each CSS set only applies
        // in its own scheme, so global rules (body background...) do not collide.
        const swap = `<template id="prerender-dark">${dark.html}</template>
    <script>
      if (matchMedia("(prefers-color-scheme: dark)").matches) document.getElementById("root").innerHTML = document.getElementById("prerender-dark").innerHTML;
      document.getElementById("prerender-dark").remove();
    </script>`;
        shells[lang] = shells[lang]
          .replace("</head>", () => `  ${styleTag("light", light.css)}\n    ${styleTag("dark", dark.css)}\n  </head>`)
          .replace('<div id="root"></div>', () => `<div id="root">${light.html}</div>\n    ${swap}`);
        await writeFile(join(DIST, lang, "index.html"), shells[lang]);
        console.log(`[prerender] ${lang}: light and dark content snapshots injected`);
      } catch (error) {
        console.warn(`[prerender] ${lang}: snapshot failed (${error.message.split("\n")[0]}), keeping head-only shell`);
      }
    }
  } catch (error) {
    console.warn(`[prerender] snapshot skipped: ${error.message.split("\n")[0]}`);
  } finally {
    await browser?.close();
    server.close();
  }
}
if (process.env.PRERENDER_SNAPSHOT !== "false") await snapshot();

// 3. root page: English head (x-default); the SPA redirects to /<lang>/ based on the browser language
await writeFile(join(DIST, "index.html"), shells[DEFAULT_LANG].replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${SITE}/" />`));

// 4. sitemap + robots
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LANGS.map((l) => `  <url>
    <loc>${urlOf(l)}</loc>
    <lastmod>${today}</lastmod>
${LANGS.map((a) => `    <xhtml:link rel="alternate" hreflang="${a}" href="${urlOf(a)}" />`).join("\n")}
    <xhtml:link rel="alternate" hreflang="x-default" href="${urlOf(DEFAULT_LANG)}" />
  </url>`).join("\n")}
</urlset>
`;
await writeFile(join(DIST, "sitemap.xml"), sitemap);
await writeFile(join(DIST, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log("[prerender] done");

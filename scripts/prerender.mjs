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
    for (const lang of LANGS) {
      const page = await browser.newPage({ locale: lang, viewport: { width: 1280, height: 900 } });
      try {
        await page.goto(`http://localhost:${port}/${lang}/`, { waitUntil: "networkidle", timeout: 60_000 });
        // Content is considered ready once experiences, projects and skills are loaded (no spinner or error left).
        await page.waitForFunction(
          () => document.querySelector("#experience") && document.querySelector("#skills")
            && !document.querySelector('[role="progressbar"], [role="alert"]'),
          undefined,
          { timeout: 30_000 },
        );
        const html = await page.evaluate(() => document.getElementById("root").innerHTML);
        shells[lang] = shells[lang].replace('<div id="root"></div>', () => `<div id="root">${html}</div>`);
        await writeFile(join(DIST, lang, "index.html"), shells[lang]);
        console.log(`[prerender] ${lang}: content snapshot injected`);
      } catch (error) {
        console.warn(`[prerender] ${lang}: snapshot failed (${error.message.split("\n")[0]}), keeping head-only shell`);
      } finally {
        await page.close();
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

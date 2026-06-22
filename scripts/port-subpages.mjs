#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SOURCE = "/Users/admin/Desktop/noorlink";

const PAGES = [
  { file: "about.html", slug: "about", component: "AboutPage" },
  { file: "support.html", slug: "support", component: "SupportPage" },
  { file: "terms.html", slug: "terms", component: "TermsPage" },
  { file: "privacy.html", slug: "privacy", component: "PrivacyPage" },
];

function transformRoutes(text) {
  const pathMap = [
    ["index.html", "/"],
    ["about.html", "/about"],
    ["destinations.html", "/destinations"],
    ["plants.html", "/plans"],
    ["plans.html", "/plans"],
    ["checkout.html", "/checkout"],
    ["dashboard.html", "/dashboard"],
    ["support.html", "/support"],
    ["success.html", "/success"],
    ["privacy.html", "/privacy"],
    ["terms.html", "/terms"],
    ["refund.html", "/refund"],
    ["newsletter.html", "/newsletter"],
    ["kyc.html", "/kyc"],
    ["faq.html", "/faq"],
  ];

  let out = text;
  for (const [from, to] of pathMap) {
    out = out.split(`href="${from}`).join(`href="${to}`);
    out = out.split(`href='${from}`).join(`href='${to}`);
  }
  return out;
}

function stripBackNavigation(html) {
  return html
    .replace(
      /<!-- TECH STYLE BACK BUTTON -->\s*<a[^>]*class="back-link-hero"[^>]*>[\s\S]*?<\/a>\s*/gi,
      "",
    )
    .replace(
      /<!-- TECH BACK BUTTON -->\s*<a[^>]*class="back-link-hero"[^>]*>[\s\S]*?<\/a>\s*/gi,
      "",
    )
    .replace(/<a[^>]*class="back-link-hero"[^>]*>[\s\S]*?<\/a>\s*/gi, "")
    .replace(/<a[^>]*class="back-link"[^>]*>[\s\S]*?<\/a>\s*/gi, "");
}

function fixAssetPaths(text) {
  return text
    .replace(/url\(['"]?images\//g, "url('/images/")
    .replace(/src="images\//g, 'src="/images/')
    .replace(/src='images\//g, "src='/images/");
}

function extractStyle(html) {
  const match = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  return match ? fixAssetPaths(match[1].trim()) : "";
}

function extractBody(html) {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!match) return "";
  return match[1].replace(/<script[\s\S]*?<\/script>/gi, "").trim();
}

function extractScripts(html) {
  const scripts = [];
  const re = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const code = m[1].trim();
    if (code && !code.includes("cookieyes")) {
      scripts.push(code);
    }
  }
  return scripts;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeLegacyPage({ slug, component, bodyHtml, scripts }) {
  const libDir = path.join(ROOT, "lib", "legacy", "pages");
  ensureDir(libDir);

  const escapedBody = JSON.stringify(bodyHtml);
  const escapedScripts = JSON.stringify(scripts);

  fs.writeFileSync(
    path.join(libDir, `${slug}.ts`),
    `// Auto-generated from ${slug}.html — do not edit manually\nexport const bodyHtml = ${escapedBody};\nexport const scripts = ${escapedScripts};\nexport const extraScripts: string[] = [];\n`,
  );

  const compDir = path.join(ROOT, "components", "legacy");
  ensureDir(compDir);

  fs.writeFileSync(
    path.join(compDir, `${component}.tsx`),
    `import { LegacyHtmlPage } from "@/components/legacy/LegacyHtmlPage";\nimport { bodyHtml, scripts, extraScripts } from "@/lib/legacy/pages/${slug}";\n\nexport function ${component}() {\n  return (\n    <LegacyHtmlPage\n      bodyHtml={bodyHtml}\n      scripts={scripts}\n      extraScripts={extraScripts}\n    />\n  );\n}\n`,
  );

  const routeDir = path.join(ROOT, "app", "(site)", slug);
  ensureDir(routeDir);

  fs.writeFileSync(
    path.join(routeDir, "page.tsx"),
    `import "@/styles/${slug}.css";\nimport { ${component} } from "@/components/legacy/${component}";\n\nexport default function Page() {\n  return <${component} />;\n}\n`,
  );
}

for (const page of PAGES) {
  const htmlPath = path.join(SOURCE, page.file);
  const html = fs.readFileSync(htmlPath, "utf8");

  const css = extractStyle(html);
  ensureDir(path.join(ROOT, "styles"));
  fs.writeFileSync(path.join(ROOT, "styles", `${page.slug}.css`), css);

  let bodyHtml = extractBody(html);
  bodyHtml = transformRoutes(bodyHtml);
  bodyHtml = stripBackNavigation(bodyHtml);
  bodyHtml = fixAssetPaths(bodyHtml);

  const scripts = extractScripts(html).map((s) => transformRoutes(s));

  writeLegacyPage({
    slug: page.slug,
    component: page.component,
    bodyHtml,
    scripts,
  });

  console.log(`Ported ${page.file} -> /${page.slug}`);
}

console.log("Done.");

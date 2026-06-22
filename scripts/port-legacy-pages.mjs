#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SOURCE = "/Users/admin/Desktop/noorlink";

/** Pages ported from static HTML. FAQ is maintained manually — not listed here. */
const PAGES = [
  { file: "about.html", slug: "about", component: "AboutPage", layout: "site" },
  { file: "support.html", slug: "support", component: "SupportPage", layout: "site" },
  { file: "terms.html", slug: "terms", component: "TermsPage", layout: "site" },
  { file: "privacy.html", slug: "privacy", component: "PrivacyPage", layout: "site" },
  { file: "kyc.html", slug: "kyc", component: "KycPage", layout: "site" },
  { file: "refund.html", slug: "refund", component: "RefundPage", layout: "site" },
  { file: "newsletter.html", slug: "newsletter", component: "NewsletterPage", layout: "site" },
  { file: "destinations.html", slug: "destinations", component: "DestinationsPage", layout: "site", extraScripts: ["/esim-database.js"] },
  { file: "plants.html", slug: "plans", component: "PlansPage", layout: "site" },
  { file: "dashboard.html", slug: "dashboard", component: "DashboardPage", layout: "site" },
  { file: "checkout.html", slug: "checkout", component: "CheckoutPage", layout: "minimal" },
  { file: "success.html", slug: "success", component: "SuccessPage", layout: "minimal" },
];

const PATH_MAP = [
  ["checkout.html?", "/checkout?"],
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
  ["ramadan.html", "/ramadan"],
];

function transformRoutes(text) {
  let out = text;
  for (const [from, to] of PATH_MAP) {
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

function writeLegacyPage({ slug, component, bodyHtml, scripts, layout, extraScripts }) {
  const libDir = path.join(ROOT, "lib", "legacy", "pages");
  ensureDir(libDir);

  const escapedBody = JSON.stringify(bodyHtml);
  const escapedScripts = JSON.stringify(scripts);
  const escapedExtra = JSON.stringify(extraScripts);

  fs.writeFileSync(
    path.join(libDir, `${slug}.ts`),
    `// Auto-generated from ${slug}.html — do not edit manually\nexport const bodyHtml = ${escapedBody};\nexport const scripts = ${escapedScripts};\nexport const extraScripts: string[] = ${escapedExtra};\n`,
  );

  const compDir = path.join(ROOT, "components", "legacy");
  ensureDir(compDir);

  fs.writeFileSync(
    path.join(compDir, `${component}.tsx`),
    `import { LegacyHtmlPage } from "@/components/legacy/LegacyHtmlPage";\nimport { bodyHtml, scripts, extraScripts } from "@/lib/legacy/pages/${slug}";\n\nexport function ${component}() {\n  return (\n    <LegacyHtmlPage\n      bodyHtml={bodyHtml}\n      scripts={scripts}\n      extraScripts={extraScripts}\n    />\n  );\n}\n`,
  );

  const routeDir = path.join(ROOT, "app", `(${layout})`, slug);
  ensureDir(routeDir);

  fs.writeFileSync(
    path.join(routeDir, "page.tsx"),
    `import "@/styles/${slug}.css";\nimport { ${component} } from "@/components/legacy/${component}";\n\nexport default function Page() {\n  return <${component} />;\n}\n`,
  );
}

ensureDir(path.join(ROOT, "app", "(minimal)"));
if (!fs.existsSync(path.join(ROOT, "app", "(minimal)", "layout.tsx"))) {
  fs.writeFileSync(
    path.join(ROOT, "app", "(minimal)", "layout.tsx"),
    `export default function MinimalLayout({\n  children,\n}: {\n  children: React.ReactNode;\n}) {\n  return children;\n}\n`,
  );
}

for (const page of PAGES) {
  const htmlPath = path.join(SOURCE, page.file);
  if (!fs.existsSync(htmlPath)) {
    console.warn(`Skip missing source: ${page.file}`);
    continue;
  }

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
    layout: page.layout ?? "site",
    extraScripts: page.extraScripts ?? [],
  });

  console.log(`Ported ${page.file} -> /${page.slug} (${page.layout ?? "site"})`);
}

console.log("Done.");

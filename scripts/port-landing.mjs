#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SOURCE = path.join("/Users/admin/Desktop/noorlink", "index.html");

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
  ["eligibility.html", "/"],
  ["ramadan.html", "/ramadan"],
];

function transformRoutes(text) {
  let out = text;
  for (const [from, to] of PATH_MAP) {
    out = out.split(from).join(to);
  }
  return out;
}

function fixAssetPaths(text) {
  return text
    .replace(/url\(['"]?images\//g, "url('/images/")
    .replace(/src="images\//g, 'src="/images/')
    .replace(/src='images\//g, "src='/images/");
}

function cleanLandingCss(css) {
  return css.replace(
    /\s*\/\* TEMPORARY PLACEHOLDERS[\s\S]*?\.bg-mea \{ background: url\('https:\/\/images\.unsplash\.com[^}]+\}\s*/g,
    "",
  );
}

function extractStyle(html) {
  const match = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  return match ? cleanLandingCss(fixAssetPaths(match[1].trim())) : "";
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

const html = fs.readFileSync(SOURCE, "utf8");
const css = extractStyle(html);
fs.mkdirSync(path.join(ROOT, "styles"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "styles", "landing.css"), css);

let bodyHtml = extractBody(html);
bodyHtml = transformRoutes(bodyHtml);
bodyHtml = fixAssetPaths(bodyHtml);

const scripts = extractScripts(html).map((s) => transformRoutes(s));

const libDir = path.join(ROOT, "lib", "legacy", "pages");
fs.mkdirSync(libDir, { recursive: true });
fs.writeFileSync(
  path.join(libDir, "landing.ts"),
  `// Auto-generated from index.html — do not edit manually\nexport const bodyHtml = ${JSON.stringify(bodyHtml)};\nexport const scripts = ${JSON.stringify(scripts)};\nexport const extraScripts: string[] = [];\n`,
);

const compDir = path.join(ROOT, "components", "legacy");
fs.mkdirSync(compDir, { recursive: true });
fs.writeFileSync(
  path.join(compDir, "LandingPage.tsx"),
  `import { LegacyHtmlPage } from "@/components/legacy/LegacyHtmlPage";\nimport { bodyHtml, scripts, extraScripts } from "@/lib/legacy/pages/landing";\n\nexport function LandingPage() {\n  return (\n    <LegacyHtmlPage\n      bodyHtml={bodyHtml}\n      scripts={scripts}\n      extraScripts={extraScripts}\n    />\n  );\n}\n`,
);

console.log("Ported index.html -> / (landing)");

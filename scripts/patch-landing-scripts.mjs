#!/usr/bin/env node
import fs from "fs";

const path = "/Users/admin/Documents/noorlink-next/lib/legacy/pages/landing.ts";
let content = fs.readFileSync(path, "utf8");

const match = content.match(/export const scripts = (\[[\s\S]*?\]);/);
if (!match) {
  console.error("scripts export not found");
  process.exit(1);
}

let scriptCode = JSON.parse(match[1])[0];

scriptCode = scriptCode.replace(
  /\n        \/\/ Updated search function - goes to destinations page\n        function searchFromHome\(\) \{[\s\S]*?\}\n/,
  "\n",
);

scriptCode = scriptCode.replace(
  /\n        \/\/ Add Enter key support for search\n        document\.getElementById\('homeSearch'\)\.addEventListener\('keypress', function\(e\) \{[\s\S]*?\}\);/,
  "",
);

const escaped = JSON.stringify(scriptCode);
content = content.replace(
  /export const scripts = \[[\s\S]*?\];/,
  `export const scripts = [${escaped}];`,
);

fs.writeFileSync(path, content);
console.log("Removed legacy search scripts from landing.ts");

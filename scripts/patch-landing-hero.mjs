#!/usr/bin/env node
import fs from "fs";

const path = "/Users/admin/Documents/noorlink-next/lib/legacy/pages/landing.ts";
let content = fs.readFileSync(path, "utf8");

const oldBlock =
  '<div class=\\"hero-search\\">\\n                <input type=\\"text\\" id=\\"homeSearch\\" placeholder=\\"Where are you traveling? (e.g. Turkey)\\">\\n                <button onclick=\\"searchFromHome()\\">Search</button>\\n            </div>\\n\\n            <!-- QUICK PICKS -->\\n            <div style=\\"display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 30px;\\">\\n                <span style=\\"color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-top: 5px;\\">Popular:</span>\\n                <a href=\\"/destinations?country=saudi-arabia\\" style=\\"background: rgba(255,255,255,0.15); backdrop-filter: blur(5px); padding: 5px 15px; border-radius: 20px; font-size: 0.9rem; border: 1px solid rgba(255,255,255,0.2); text-decoration: none; color: white; transition: 0.3s;\\">🇸🇦 Umrah</a>\\n                <a href=\\"/destinations?country=turkey\\" style=\\"background: rgba(255,255,255,0.15); backdrop-filter: blur(5px); padding: 5px 15px; border-radius: 20px; font-size: 0.9rem; border: 1px solid rgba(255,255,255,0.2); text-decoration: none; color: white; transition: 0.3s;\\">🇹🇷 Turkey</a>\\n                <a href=\\"/destinations?region=Europe\\" style=\\"background: rgba(255,255,255,0.15); backdrop-filter: blur(5px); padding: 5px 15px; border-radius: 20px; font-size: 0.9rem; border: 1px solid rgba(255,255,255,0.2); text-decoration: none; color: white; transition: 0.3s;\\">🇪🇺 Europe</a>\\n            </div>';

const newBlock = '<div id=\\"hero-search-mount\\"></div>';

if (!content.includes(oldBlock)) {
  console.error("Hero block not found");
  process.exit(1);
}

content = content.replace(oldBlock, newBlock);

content = content.replace(
  /\n        \/\/ Updated search function - goes to destinations page\n        function searchFromHome\(\) \{[\s\S]*?\}\n\n/,
  "\n",
);

content = content.replace(
  /\n        \/\/ Add Enter key support for search\n        document\.getElementById\('homeSearch'\)\.addEventListener\('keypress', function\(e\) \{[\s\S]*?\}\);/,
  "",
);

fs.writeFileSync(path, content);
console.log("Patched landing.ts");

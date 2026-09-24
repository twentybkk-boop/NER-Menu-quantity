import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const sourcePath = path.resolve('qa/calculator-visual-contract.mjs');
const runtimePath = path.resolve('qa/.calculator-visual-v2-runtime.mjs');
let source = fs.readFileSync(sourcePath, 'utf8');

const replacements = [
  [
    "assert.match(contract.decor[0].bg, /ner-character-top-left\\.png/, `${browserName}: top-left master changed`);",
    "assert.match(contract.decor[0].bg, /overlay-top-left\\.webp/, `${browserName}: approved top-left composition changed`);",
  ],
  [
    "assert.match(contract.decor[1].bg, /ner-character-bottom-left\\.png/, `${browserName}: bottom-left master changed`);",
    "assert.match(contract.decor[1].bg, /overlay-bottom-left\\.webp/, `${browserName}: approved bottom-left composition changed`);",
  ],
  [
    "assert.match(contract.decor[2].bg, /ner-character-right\\.png/, `${browserName}: right master changed`);",
    "assert.match(contract.decor[2].bg, /overlay-right\\.webp/, `${browserName}: approved right composition changed`);",
  ],
  [
    "assert.match(contract.decor[1].afterBg, /accessory-gray-fullface-helmet\\.svg/, `${browserName}: helmet missing in calculator state`);",
    "assert.equal(contract.decor[1].afterBg, 'none', `${browserName}: approved bottom-left composition received a duplicate synthetic accessory`);",
  ],
  [
    "assert.match(contract.decor[2].afterBg, /accessory-white-backpack\\.svg/, `${browserName}: backpack missing in calculator state`);",
    "assert.equal(contract.decor[2].afterBg, 'none', `${browserName}: approved right composition received a duplicate synthetic accessory`);",
  ],
];

for (const [from, to] of replacements) {
  if (!source.includes(from)) throw new Error(`calculator V2 compatibility target missing: ${from}`);
  source = source.replace(from, to);
}

fs.writeFileSync(runtimePath, source);
try {
  await import(`${pathToFileURL(runtimePath).href}?v=${Date.now()}`);
} finally {
  fs.rmSync(runtimePath, { force: true });
}

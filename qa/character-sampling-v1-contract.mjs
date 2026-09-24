import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium, webkit } from 'playwright';

const BASE = process.env.SHARPNESS_BASE || 'http://127.0.0.1:8000/index.html';
const recipeBody = fs.readFileSync('recipe_master.json', 'utf8');
const shotDir = path.resolve('qa-artifacts');
fs.mkdirSync(shotDir, { recursive: true });

const SOURCES = {
  '.decor-a': { file: 'overlay-top-left.webp', w: 130, h: 121 },
  '.decor-b': { file: 'overlay-bottom-left.webp', w: 150, h: 114 },
  '.decor-c': { file: 'overlay-right.webp', w: 110, h: 171 },
};

const CASES = [
  ['phone-portrait', 390, 844, 3],
  ['phone-landscape', 844, 390, 3],
  ['ipad-portrait', 768, 1024, 2],
  ['ipad-landscape', 1024, 768, 2],
];

async function run(browserType, browserName) {
  const browser = await browserType.launch();
  try {
    for (const [label, width, height, dpr] of CASES) {
      const context = await browser.newContext({
        viewport: { width, height },
        deviceScaleFactor: dpr,
        isMobile: width < 900,
        hasTouch: true,
      });
      const page = await context.newPage();
      if (BASE.startsWith('http://127.0.0.1')) {
        await page.route('**/recipe_master.json*', route => route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: recipeBody,
        }));
      }
      await page.goto(BASE, { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.querySelectorAll('.menu-card').length === 45);

      const sample = await page.evaluate(() => {
        const result = {};
        for (const selector of ['.decor-a','.decor-b','.decor-c']) {
          const el = document.querySelector(selector);
          const s = getComputedStyle(el);
          const r = el.getBoundingClientRect();
          result[selector] = {
            width: r.width,
            height: r.height,
            filter: s.filter,
            backgroundImage: s.backgroundImage,
            pointerEvents: s.pointerEvents,
          };
        }
        return result;
      });

      for (const [selector, source] of Object.entries(SOURCES)) {
        const item = sample[selector];
        assert.equal(item.filter, 'none', `${browserName}/${label}: ${selector} still uses raster filter ${item.filter}`);
        assert.equal(item.pointerEvents, 'none', `${browserName}/${label}: ${selector} must stay non-interactive`);
        assert.ok(item.backgroundImage.includes(source.file), `${browserName}/${label}: ${selector} source changed unexpectedly: ${item.backgroundImage}`);

        const fitScale = Math.min(item.width / source.w, item.height / source.h);
        assert.ok(fitScale <= 1.005,
          `${browserName}/${label}: ${selector} CSS-upscales ${source.file} by ${fitScale.toFixed(3)}x before DPR sampling`);
      }

      if (browserName === 'chromium') {
        await page.screenshot({
          path: path.join(shotDir, `30-${label}-sampling-v1@${dpr}x.png`),
          fullPage: false,
        });
      }
      await context.close();
    }
  } finally {
    await browser.close();
  }
  console.log(`PASS ${browserName} character sampling safety`);
}

await run(chromium, 'chromium');
await run(webkit, 'webkit');
console.log('CHARACTER SAMPLING V1 CONTRACT PASS');

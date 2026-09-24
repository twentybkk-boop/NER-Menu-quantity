import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium, webkit } from 'playwright';

const BASE = process.env.SHARPNESS_BASE || 'http://127.0.0.1:8000/index.html';
const recipeBody = fs.readFileSync('recipe_master.json', 'utf8');
const shotDir = path.resolve('qa-artifacts');
fs.mkdirSync(shotDir, { recursive: true });
const isLive = !BASE.startsWith('http://127.0.0.1');

/* The approved asset paths are stable; their raster contents are now the
   high-resolution derivatives from the user's approved story-complete reference. */
const SOURCES = {
  '.decor-a': { file: 'overlay-top-left.webp', w: 518, h: 500 },
  '.decor-b': { file: 'overlay-bottom-left.webp', w: 655, h: 524 },
  '.decor-c': { file: 'overlay-right.webp', w: 556, h: 851 },
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
      if (!isLive) {
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
        assert.ok(item.backgroundImage.includes(source.file), `${browserName}/${label}: ${selector} must use upgraded approved source: ${item.backgroundImage}`);

        const sourcePxPerCssPx = Math.min(source.w / item.width, source.h / item.height);
        assert.ok(sourcePxPerCssPx >= 2,
          `${browserName}/${label}: ${selector} has only ${sourcePxPerCssPx.toFixed(2)} source px/CSS px from ${source.file}`);
      }

      if (browserName === 'chromium') {
        await page.screenshot({
          path: path.join(shotDir, `${isLive ? 'live-' : ''}31-${label}-sharpness-v2@${dpr}x.png`),
          fullPage: false,
        });
      }
      await context.close();
    }
  } finally {
    await browser.close();
  }
  console.log(`PASS ${browserName} character high-res sharpness contract (${isLive ? 'live' : 'local'})`);
}

await run(chromium, 'chromium');
await run(webkit, 'webkit');
console.log('CHARACTER HIGH-RES SHARPNESS CONTRACT PASS');

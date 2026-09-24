import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium, webkit } from 'playwright';

const BASE = process.env.SHARPNESS_BASE || 'http://127.0.0.1:8000/index.html';
const recipeBody = fs.readFileSync('recipe_master.json', 'utf8');
const shotDir = path.resolve('qa-artifacts');
fs.mkdirSync(shotDir, { recursive: true });
const isLive = !BASE.startsWith('http://127.0.0.1');

const SOURCES = {
  '.decor-a': { file: 'overlay-top-left-hires.webp', minW: 518, minH: 500 },
  '.decor-b': { file: 'overlay-bottom-left-hires.webp', minW: 655, minH: 524 },
  '.decor-c': { file: 'overlay-right-hires.webp', minW: 556, minH: 851 },
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

      const sample = await page.evaluate(async () => {
        const result = {};
        for (const selector of ['.decor-a','.decor-b','.decor-c']) {
          const el = document.querySelector(selector);
          const s = getComputedStyle(el);
          const r = el.getBoundingClientRect();
          const match = s.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
          const assetUrl = match?.[1] || '';
          const natural = await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve({ naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight });
            img.onerror = () => reject(new Error(`failed to load ${assetUrl}`));
            img.src = assetUrl;
          });
          result[selector] = {
            width: r.width,
            height: r.height,
            filter: s.filter,
            backgroundImage: s.backgroundImage,
            pointerEvents: s.pointerEvents,
            assetUrl,
            naturalWidth: natural.naturalWidth,
            naturalHeight: natural.naturalHeight,
          };
        }
        return result;
      });

      for (const [selector, source] of Object.entries(SOURCES)) {
        const item = sample[selector];
        assert.equal(item.filter, 'none', `${browserName}/${label}: ${selector} still uses raster filter ${item.filter}`);
        assert.equal(item.pointerEvents, 'none', `${browserName}/${label}: ${selector} must stay non-interactive`);
        assert.ok(item.backgroundImage.includes(source.file), `${browserName}/${label}: ${selector} must use high-res approved source: ${item.backgroundImage}`);
        assert.ok(item.naturalWidth >= source.minW && item.naturalHeight >= source.minH,
          `${browserName}/${label}: ${selector} loaded ${item.naturalWidth}x${item.naturalHeight}, expected at least ${source.minW}x${source.minH}`);

        const sourcePxPerCssPx = Math.min(item.naturalWidth / item.width, item.naturalHeight / item.height);
        assert.ok(sourcePxPerCssPx >= 2,
          `${browserName}/${label}: ${selector} has only ${sourcePxPerCssPx.toFixed(2)} source px/CSS px from ${item.assetUrl}`);
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

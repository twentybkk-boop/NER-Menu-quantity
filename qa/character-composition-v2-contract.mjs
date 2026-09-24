import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium, webkit } from 'playwright';

const BASE = 'http://127.0.0.1:8000/index.html';
const recipeBody = fs.readFileSync('recipe_master.json', 'utf8');
const shotDir = path.resolve('qa-artifacts');
fs.mkdirSync(shotDir, { recursive: true });

const EXPECTED = [
  ['.decor-a', 'overlay-top-left.webp'],
  ['.decor-b', 'overlay-bottom-left.webp'],
  ['.decor-c', 'overlay-right.webp'],
];

function assertDecor(items, browserName, state) {
  assert.equal(items.length, 3, `${browserName}/${state}: expected three character compositions`);
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const [selector, asset] = EXPECTED[i];
    assert.equal(item.selector, selector, `${browserName}/${state}: character order drifted`);
    assert.match(item.bg, new RegExp(asset.replace('.', '\\.')), `${browserName}/${state}: ${selector} is not using ${asset}`);
    assert.equal(item.pointer, 'none', `${browserName}/${state}: ${selector} intercepts pointer events`);
    assert.equal(item.bgSize, 'contain', `${browserName}/${state}: ${selector} no longer preserves the complete composition`);
    assert.ok(item.width >= 78 && item.height >= 76, `${browserName}/${state}: ${selector} became too small to preserve story detail`);
    assert.ok(item.visibleFraction >= .96, `${browserName}/${state}: ${selector} is clipped to ${(item.visibleFraction * 100).toFixed(1)}% of its box`);
    assert.equal(item.beforeBg, 'none', `${browserName}/${state}: ${selector} has a synthetic accessory layer before the approved artwork`);
    assert.equal(item.afterBg, 'none', `${browserName}/${state}: ${selector} has a synthetic accessory layer after the approved artwork`);
  }
}

async function readDecor(page) {
  return page.evaluate(() => ['.decor-a','.decor-b','.decor-c'].map(selector => {
    const el = document.querySelector(selector);
    const s = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const left = Math.max(0, r.left);
    const top = Math.max(0, r.top);
    const right = Math.min(innerWidth, r.right);
    const bottom = Math.min(innerHeight, r.bottom);
    const visibleArea = Math.max(0, right - left) * Math.max(0, bottom - top);
    const totalArea = Math.max(1, r.width * r.height);
    return {
      selector,
      bg: s.backgroundImage,
      bgSize: s.backgroundSize,
      pointer: s.pointerEvents,
      width: r.width,
      height: r.height,
      left: r.left,
      right: r.right,
      top: r.top,
      bottom: r.bottom,
      visibleFraction: visibleArea / totalArea,
      beforeBg: getComputedStyle(el, '::before').backgroundImage,
      afterBg: getComputedStyle(el, '::after').backgroundImage,
    };
  }));
}

async function inspect(browserType, browserName) {
  const browser = await browserType.launch();
  try {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();
    await page.route('**/recipe_master.json*', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: recipeBody,
    }));
    await page.goto(BASE, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => document.querySelectorAll('.menu-card').length === 45);

    const top = await readDecor(page);
    assertDecor(top, browserName, 'top');

    if (browserName === 'chromium') {
      await page.screenshot({ path: path.join(shotDir, '15-character-composition-v2-iphone@3x.png'), fullPage: false });
    }

    await page.evaluate(() => scrollTo(0, 900));
    await page.waitForTimeout(80);
    const scrolled = await readDecor(page);
    assertDecor(scrolled, browserName, 'scroll');

    if (browserName === 'chromium') {
      await page.screenshot({ path: path.join(shotDir, '16-character-composition-v2-scroll@3x.png'), fullPage: false });
    }

    await page.locator('.menu-card[data-menu="ชุดจุ่มหมูทะเล"]').click();
    await page.waitForSelector('#calculatorModal:not(.is-hidden)');
    const modal = await readDecor(page);
    assertDecor(modal, browserName, 'calculator');

    if (browserName === 'chromium') {
      await page.screenshot({ path: path.join(shotDir, '17-character-composition-v2-calculator@3x.png'), fullPage: false });
    }

    await context.close();
    console.log(`PASS ${browserName} P0-A complete character composition`);
  } finally {
    await browser.close();
  }
}

await inspect(chromium, 'chromium');
await inspect(webkit, 'webkit');
console.log('P0-A CHARACTER COMPOSITION CONTRACT PASS');

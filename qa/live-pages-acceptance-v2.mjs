import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium, webkit } from 'playwright';

const BASE = 'https://twentybkk-boop.github.io/NER-Menu-quantity/';
const shotDir = path.resolve('qa-artifacts');
fs.mkdirSync(shotDir, { recursive: true });
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const EXPECTED = [
  ['.decor-a', 'overlay-top-left.webp'],
  ['.decor-b', 'overlay-bottom-left.webp'],
  ['.decor-c', 'overlay-right.webp'],
];

async function waitForCurrentDeployment(page) {
  const deadline = Date.now() + 180_000;
  let last = '';
  while (Date.now() < deadline) {
    try {
      const response = await page.request.get(`${BASE}assets/visual-polish.css?acceptance=${Date.now()}`, {
        headers: { 'cache-control': 'no-cache' },
      });
      if (response.ok()) {
        last = await response.text();
        if (
          last.includes('visual-thumbnail-infographic.css') &&
          last.includes('visual-character-composition-v2.css')
        ) return;
      }
    } catch (error) {
      last = String(error);
    }
    await sleep(8_000);
  }
  throw new Error(`GitHub Pages did not expose P0-A composition V2 before timeout. Last probe: ${last.slice(0, 240)}`);
}

async function readContract(page) {
  return page.evaluate(() => {
    const decor = ['.decor-a','.decor-b','.decor-c'].map(selector => {
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
        visibleFraction: visibleArea / totalArea,
        beforeBg: getComputedStyle(el, '::before').backgroundImage,
        afterBg: getComputedStyle(el, '::after').backgroundImage,
      };
    });

    const normal = [...document.querySelectorAll('.menu-card')]
      .find(card => !['ชุดจุ่มหมูทะเล','ชุดจุ่มเนื้อ','ชุดจุ่มหมู','ชุดจุ่มเดี่ยวหมู'].includes(card.dataset.menu));
    const signature = document.querySelector('.menu-card[data-menu="ชุดจุ่มหมูทะเล"]');
    const normalThumb = getComputedStyle(normal, '::before');
    const signatureThumb = getComputedStyle(signature, '::before');
    const menus = document.querySelector('#app-menus').getBoundingClientRect();

    return {
      viewport: { width: innerWidth, height: innerHeight },
      menuCount: document.querySelectorAll('.menu-card').length,
      menus: { left: menus.left, right: menus.right, width: menus.width },
      decor,
      normalThumb: { bg: normalThumb.backgroundImage, content: normalThumb.content },
      signatureThumb: { bg: signatureThumb.backgroundImage, content: signatureThumb.content },
    };
  });
}

function assertContract(contract, browserName, state) {
  assert.equal(contract.menuCount, 45, `${browserName}/${state}: live menu count changed`);
  assert.ok(contract.menus.width <= 327, `${browserName}/${state}: protected center lane widened unexpectedly`);
  assert.doesNotMatch(contract.normalThumb.bg, /semantic-atlas-v1\.webp/, `${browserName}/${state}: rejected food-photo atlas returned`);
  assert.doesNotMatch(contract.signatureThumb.bg, /semantic-atlas-v1\.webp/, `${browserName}/${state}: signature food-photo atlas returned`);
  assert.notEqual(contract.normalThumb.content, '""', `${browserName}/${state}: live infographic pictogram missing`);
  assert.notEqual(contract.signatureThumb.content, '""', `${browserName}/${state}: live signature pictogram missing`);

  assert.equal(contract.decor.length, 3, `${browserName}/${state}: live page lost a character composition`);
  for (let i = 0; i < contract.decor.length; i++) {
    const item = contract.decor[i];
    const [selector, asset] = EXPECTED[i];
    assert.equal(item.selector, selector, `${browserName}/${state}: character role order changed`);
    assert.match(item.bg, new RegExp(asset.replace('.', '\\.')), `${browserName}/${state}: ${asset} is not active on deployed page`);
    assert.equal(item.bgSize, 'contain', `${browserName}/${state}: complete composition geometry changed`);
    assert.equal(item.pointer, 'none', `${browserName}/${state}: ${selector} intercepts touch`);
    assert.ok(item.width >= 78 && item.height >= 76, `${browserName}/${state}: ${selector} too small for identity detail`);
    assert.ok(item.visibleFraction >= .96, `${browserName}/${state}: ${selector} is clipped to ${(item.visibleFraction * 100).toFixed(1)}%`);
    assert.equal(item.beforeBg, 'none', `${browserName}/${state}: synthetic before accessory returned`);
    assert.equal(item.afterBg, 'none', `${browserName}/${state}: synthetic after accessory returned`);
  }
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
    await waitForCurrentDeployment(page);
    await page.goto(`${BASE}?acceptance=${Date.now()}`, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    await page.waitForFunction(() => document.querySelectorAll('.menu-card').length === 45, null, { timeout: 60_000 });

    const top = await readContract(page);
    assertContract(top, browserName, 'top');
    if (browserName === 'chromium') {
      await page.screenshot({ path: path.join(shotDir, '18-live-pages-character-v2@3x.png'), fullPage: false });
    }

    await page.locator('.menu-card[data-menu="ชุดจุ่มหมูทะเล"]').click();
    await page.waitForSelector('#calculatorModal:not(.is-hidden)');
    const modal = await readContract(page);
    assertContract(modal, browserName, 'calculator');
    if (browserName === 'chromium') {
      await page.screenshot({ path: path.join(shotDir, '19-live-pages-character-v2-calculator@3x.png'), fullPage: false });
    }

    await context.close();
    console.log(`PASS ${browserName} live P0-A character composition V2`);
  } finally {
    await browser.close();
  }
}

await inspect(chromium, 'chromium');
await inspect(webkit, 'webkit');
console.log('LIVE P0-A CHARACTER COMPOSITION V2 PASS');

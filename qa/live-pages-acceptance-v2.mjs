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
          last.includes('visual-character-composition-v2.css') &&
          last.includes('visual-center-frame-v2.css')
        ) return;
      }
    } catch (error) {
      last = String(error);
    }
    await sleep(8_000);
  }
  throw new Error(`GitHub Pages did not expose P0-A/P0-B V2 before timeout. Last probe: ${last.slice(0, 240)}`);
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
        left:r.left,
        right:r.right,
        top:r.top,
        bottom:r.bottom,
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
    const hero = document.querySelector('.hero').getBoundingClientRect();
    const shelf = getComputedStyle(document.body, '::after');
    const decorZ = Number(getComputedStyle(document.querySelector('#decor-layer')).zIndex);

    return {
      viewport: { width: innerWidth, height: innerHeight },
      menuCount: document.querySelectorAll('.menu-card').length,
      menus: { left: menus.left, right: menus.right, width: menus.width },
      hero: { width: hero.width },
      shelf: {
        display:shelf.display,
        position:shelf.position,
        height:parseFloat(shelf.height),
        z:Number(shelf.zIndex),
        pointer:shelf.pointerEvents,
        background:shelf.backgroundImage,
      },
      decorZ,
      decor,
      normalThumb: { bg: normalThumb.backgroundImage, content: normalThumb.content },
      signatureThumb: { bg: signatureThumb.backgroundImage, content: signatureThumb.content },
    };
  });
}

function assertContract(contract, browserName, state) {
  assert.equal(contract.menuCount, 45, `${browserName}/${state}: live menu count changed`);
  assert.ok(contract.menus.width >= 285 && contract.menus.width <= 302,
    `${browserName}/${state}: protected center lane is ${contract.menus.width}px`);
  assert.ok(contract.menus.left >= 38 && contract.viewport.width - contract.menus.right >= 38,
    `${browserName}/${state}: deployed illustration rails are not visually reserved`);
  assert.ok(contract.hero.width <= 302, `${browserName}/${state}: deployed hero escaped the center frame`);
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

  if (state !== 'calculator') {
    assert.equal(contract.shelf.position, 'fixed', `${browserName}/${state}: deployed illustration shelf is not fixed`);
    assert.ok(contract.shelf.height >= 118, `${browserName}/${state}: deployed illustration shelf collapsed`);
    assert.equal(contract.shelf.pointer, 'none', `${browserName}/${state}: illustration shelf intercepts touch`);
    assert.match(contract.shelf.background, /linear-gradient/, `${browserName}/${state}: deployed illustration shelf mask missing`);
    assert.ok(contract.shelf.z > 36 && contract.decorZ > contract.shelf.z,
      `${browserName}/${state}: deployed menu/shelf/character z-order is invalid`);
    for (const item of contract.decor.slice(1)) {
      assert.ok(item.top >= contract.viewport.height - contract.shelf.height - 8,
        `${browserName}/${state}: ${item.selector} is not contained by illustration shelf`);
    }
  } else {
    assert.equal(contract.shelf.display, 'none', `${browserName}/${state}: list illustration shelf remained over calculator`);
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

    let contract = await readContract(page);
    assertContract(contract, browserName, 'top');
    if (browserName === 'chromium') {
      await page.screenshot({ path: path.join(shotDir, '18-live-pages-character-v2@3x.png'), fullPage: false });
    }

    await page.evaluate(() => scrollTo(0, 1100));
    await page.waitForTimeout(80);
    contract = await readContract(page);
    assertContract(contract, browserName, 'scroll');
    if (browserName === 'chromium') {
      await page.screenshot({ path: path.join(shotDir, '22-live-pages-center-frame-v2-scroll@3x.png'), fullPage: false });
    }

    await page.locator('.menu-card[data-menu="ชุดจุ่มหมูทะเล"]').click();
    await page.waitForSelector('#calculatorModal:not(.is-hidden)');
    const modal = await readContract(page);
    assertContract(modal, browserName, 'calculator');
    if (browserName === 'chromium') {
      await page.screenshot({ path: path.join(shotDir, '19-live-pages-character-v2-calculator@3x.png'), fullPage: false });
    }

    await context.close();
    console.log(`PASS ${browserName} live P0-A/P0-B V2`);
  } finally {
    await browser.close();
  }
}

await inspect(chromium, 'chromium');
await inspect(webkit, 'webkit');
console.log('LIVE P0-A/P0-B V2 PASS');

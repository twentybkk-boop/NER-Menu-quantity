import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium, webkit } from 'playwright';

const BASE = 'https://twentybkk-boop.github.io/NER-Menu-quantity/';
const shotDir = path.resolve('qa-artifacts');
fs.mkdirSync(shotDir, { recursive: true });

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function waitForCurrentDeployment(page) {
  const deadline = Date.now() + 150_000;
  let last = '';
  while (Date.now() < deadline) {
    try {
      const response = await page.request.get(`${BASE}assets/visual-polish.css?acceptance=${Date.now()}`, {
        headers: { 'cache-control': 'no-cache' },
      });
      if (response.ok()) {
        last = await response.text();
        if (
          last.includes('visual-character-frame.css') &&
          last.includes('visual-calculator-hierarchy.css') &&
          last.includes('visual-menu-rhythm.css')
        ) return;
      }
    } catch (error) {
      last = String(error);
    }
    await sleep(8_000);
  }
  throw new Error(`GitHub Pages did not expose the verified fidelity layers before timeout. Last probe: ${last.slice(0, 240)}`);
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

    const live = await page.evaluate(() => {
      const menus = document.querySelector('#app-menus');
      const menuRect = menus.getBoundingClientRect();
      const normal = [...document.querySelectorAll('.menu-card')]
        .find(card => !['ชุดจุ่มหมูทะเล','ชุดจุ่มเนื้อ','ชุดจุ่มหมู','ชุดจุ่มเดี่ยวหมู'].includes(card.dataset.menu));
      const signature = document.querySelector('.menu-card[data-menu="ชุดจุ่มหมูทะเล"]');
      const normalThumb = getComputedStyle(normal, '::before');
      const signatureThumb = getComputedStyle(signature, '::before');
      const decor = ['.decor-a','.decor-b','.decor-c'].map(selector => {
        const el = document.querySelector(selector);
        const rect = el.getBoundingClientRect();
        return {
          selector,
          bg: getComputedStyle(el).backgroundImage,
          pointer: getComputedStyle(el).pointerEvents,
          visible: rect.right > 0 && rect.left < innerWidth && rect.bottom > 0 && rect.top < innerHeight,
          beforeBg: getComputedStyle(el, '::before').backgroundImage,
          afterBg: getComputedStyle(el, '::after').backgroundImage,
        };
      });
      return {
        viewport: { width: innerWidth, height: innerHeight },
        menus: { left: menuRect.left, right: menuRect.right, width: menuRect.width },
        normalThumb: {
          width: parseFloat(normalThumb.width),
          height: parseFloat(normalThumb.height),
          bg: normalThumb.backgroundImage,
          bgSize: normalThumb.backgroundSize,
        },
        signatureThumb: {
          width: parseFloat(signatureThumb.width),
          height: parseFloat(signatureThumb.height),
        },
        decor,
        heroTitleDisplay: getComputedStyle(document.querySelector('.brand-title')).display,
        categoryTokens: [...document.querySelectorAll('.category-icon')].map(el => getComputedStyle(el, '::before').content),
      };
    });

    // Feedback 1 — cards remain inside the protected center frame.
    assert.ok(live.menus.width <= 327, `${browserName}: live center lane too wide: ${live.menus.width}`);
    assert.ok(live.menus.left >= 27 && live.viewport.width - live.menus.right >= 27,
      `${browserName}: live center lane lost one or both character rails`);

    // Feedback 2 — atlas crops stay within verified Retina-safe CSS bounds and preserve 3:2 geometry.
    assert.ok(live.normalThumb.width <= 67 && live.normalThumb.height <= 45,
      `${browserName}: live normal thumbnail enlarged to ${live.normalThumb.width}x${live.normalThumb.height}`);
    assert.ok(live.signatureThumb.width <= 73 && live.signatureThumb.height <= 49,
      `${browserName}: live signature thumbnail enlarged to ${live.signatureThumb.width}x${live.signatureThumb.height}`);
    assert.ok(Math.abs(live.normalThumb.width / live.normalThumb.height - 1.5) < 0.04,
      `${browserName}: live thumbnail aspect ratio drifted`);
    assert.match(live.normalThumb.bg, /semantic-atlas-v1\.webp/, `${browserName}: live semantic atlas missing`);
    assert.equal(live.normalThumb.bgSize, '600% 500%', `${browserName}: live atlas crop geometry drifted`);

    // Feedback 3 — high-detail three-person composition and identity details remain active.
    assert.equal(live.decor.length, 3, `${browserName}: live page does not expose all three character roles`);
    for (const item of live.decor) {
      assert.equal(item.pointer, 'none', `${browserName}: ${item.selector} intercepts touch on live page`);
      assert.ok(item.visible, `${browserName}: ${item.selector} is not visible on live page`);
    }
    assert.match(live.decor[0].bg, /ner-character-top-left\.png/, `${browserName}: live top-left high-detail master missing`);
    assert.match(live.decor[1].bg, /ner-character-bottom-left\.png/, `${browserName}: live bottom-left high-detail master missing`);
    assert.match(live.decor[2].bg, /ner-character-right\.png/, `${browserName}: live right high-detail master missing`);
    assert.match(live.decor[1].afterBg, /accessory-gray-fullface-helmet\.svg/, `${browserName}: live helmet detail missing`);
    assert.match(live.decor[2].afterBg, /accessory-white-backpack\.svg/, `${browserName}: live white backpack detail missing`);
    assert.doesNotMatch(live.decor[1].beforeBg + live.decor[1].afterBg, /accessory-glasses\.svg/,
      `${browserName}: bottom-left character must remain no-glasses on live page`);

    // Feedback 4 — verified generated-direction hierarchy must be active on the deployed page.
    assert.equal(live.heroTitleDisplay, 'none', `${browserName}: duplicate phone hero title returned on live page`);
    assert.equal(new Set(live.categoryTokens).size, 7, `${browserName}: live semantic category hierarchy is not active`);

    if (browserName === 'chromium') {
      await page.screenshot({ path: path.join(shotDir, '13-live-pages-iphone@3x.png'), fullPage: false });
      await page.locator('.menu-card[data-menu="ชุดจุ่มหมูทะเล"]').click();
      await page.waitForSelector('#calculatorModal:not(.is-hidden)');
      await page.screenshot({ path: path.join(shotDir, '14-live-pages-calculator@3x.png'), fullPage: false });
    }

    await context.close();
    console.log(`PASS ${browserName} live GitHub Pages acceptance`);
  } finally {
    await browser.close();
  }
}

await inspect(chromium, 'chromium');
await inspect(webkit, 'webkit');
console.log('LIVE GITHUB PAGES ACCEPTANCE PASS');

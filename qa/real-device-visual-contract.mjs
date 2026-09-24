import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium, webkit } from 'playwright';

const BASE = 'http://127.0.0.1:8000/index.html';
const recipeBody = fs.readFileSync('recipe_master.json', 'utf8');
const shotDir = path.resolve('qa-artifacts');
fs.mkdirSync(shotDir, { recursive: true });

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

    const contract = await page.evaluate(() => {
      const menus = document.querySelector('#app-menus');
      const menuRect = menus.getBoundingClientRect();
      const cards = [...document.querySelectorAll('.menu-card')];
      const first = cards[0];
      const firstThumb = getComputedStyle(first, '::before');
      const firstRect = first.getBoundingClientRect();
      const sig = document.querySelector('.menu-card[data-menu="ชุดจุ่มหมูทะเล"]');
      const sigThumb = getComputedStyle(sig, '::before');

      const decor = ['.decor-a','.decor-b','.decor-c'].map(selector => {
        const el = document.querySelector(selector);
        const s = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return {
          selector,
          bg: s.backgroundImage,
          pointer: s.pointerEvents,
          visible: r.right > 0 && r.left < innerWidth && r.bottom > 0 && r.top < innerHeight,
          width: r.width,
          height: r.height,
          beforeBg: getComputedStyle(el, '::before').backgroundImage,
          afterBg: getComputedStyle(el, '::after').backgroundImage,
        };
      });

      const thumbSize = s => ({
        width: parseFloat(s.width),
        height: parseFloat(s.height),
        bg: s.backgroundImage,
        bgSize: s.backgroundSize,
      });

      return {
        viewport: { width: innerWidth, height: innerHeight },
        menus: { left: menuRect.left, right: menuRect.right, width: menuRect.width },
        firstCard: { left: firstRect.left, right: firstRect.right, width: firstRect.width },
        thumb: thumbSize(firstThumb),
        signatureThumb: thumbSize(sigThumb),
        decor,
        manager: {
          bg: getComputedStyle(document.querySelector('#managerButton')).backgroundColor,
          color: getComputedStyle(document.querySelector('#managerButton')).color,
        },
      };
    });

    assert.ok(contract.menus.width <= 327, `${browserName}: central menu lane too wide: ${contract.menus.width}`);
    assert.ok(contract.menus.left >= 27 && contract.viewport.width - contract.menus.right >= 27,
      `${browserName}: menu lane does not reserve both character rails`);
    assert.ok(contract.firstCard.left >= contract.menus.left - 1 && contract.firstCard.right <= contract.menus.right + 1,
      `${browserName}: card escapes protected menu lane`);

    assert.ok(contract.thumb.width <= 67 && contract.thumb.height <= 45,
      `${browserName}: normal atlas crop is rendered too large for its 120x80 source cell`);
    assert.ok(contract.signatureThumb.width <= 73 && contract.signatureThumb.height <= 49,
      `${browserName}: signature atlas crop is rendered too large for its 120x80 source cell`);
    assert.ok(Math.abs(contract.thumb.width / contract.thumb.height - 1.5) < 0.04,
      `${browserName}: normal thumbnail distorts source aspect ratio`);
    assert.ok(Math.abs(contract.signatureThumb.width / contract.signatureThumb.height - 1.5) < 0.04,
      `${browserName}: signature thumbnail distorts source aspect ratio`);
    assert.match(contract.thumb.bg, /semantic-atlas-v1\.webp/, `${browserName}: semantic atlas not active`);
    assert.equal(contract.thumb.bgSize, '600% 500%', `${browserName}: semantic atlas crop geometry changed`);

    assert.equal(contract.decor.length, 3, `${browserName}: expected all three characters`);
    for (const item of contract.decor) {
      assert.equal(item.pointer, 'none', `${browserName}: ${item.selector} intercepts touch`);
      assert.ok(item.visible && item.width > 60 && item.height > 60, `${browserName}: ${item.selector} is not visibly present`);
    }
    assert.match(contract.decor[0].bg, /ner-character-top-left\.png/, `${browserName}: top-left high-detail master not active`);
    assert.match(contract.decor[1].bg, /ner-character-bottom-left\.png/, `${browserName}: bottom-left high-detail master not active`);
    assert.match(contract.decor[2].bg, /ner-character-right\.png/, `${browserName}: right high-detail master not active`);
    assert.match(contract.decor[1].afterBg, /accessory-gray-fullface-helmet\.svg/, `${browserName}: gray full-face helmet detail missing`);
    assert.match(contract.decor[2].afterBg, /accessory-white-backpack\.svg/, `${browserName}: white backpack detail missing`);
    assert.doesNotMatch(contract.decor[1].beforeBg + contract.decor[1].afterBg, /accessory-glasses\.svg/,
      `${browserName}: bottom-left must remain no-glasses`);

    if (browserName === 'chromium') {
      await page.screenshot({ path: path.join(shotDir, '10-real-device-fidelity-iphone@3x.png'), fullPage: false });
      await page.evaluate(() => scrollTo(0, 650));
      await page.screenshot({ path: path.join(shotDir, '11-real-device-fidelity-menu@3x.png'), fullPage: false });
    }

    await context.close();
    console.log(`PASS ${browserName} real-device visual contract`);
  } finally {
    await browser.close();
  }
}

await inspect(chromium, 'chromium');
await inspect(webkit, 'webkit');
console.log('REAL DEVICE VISUAL CONTRACT PASS');

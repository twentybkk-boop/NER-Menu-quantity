import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium, webkit } from 'playwright';

const BASE = 'http://127.0.0.1:8000/index.html';
const recipeBody = fs.readFileSync('recipe_master.json', 'utf8');
const shotDir = path.resolve('qa-artifacts');
fs.mkdirSync(shotDir, { recursive: true });
const SIGNATURE_MENUS = ['ชุดจุ่มหมูทะเล','ชุดจุ่มเนื้อ','ชุดจุ่มหมู','ชุดจุ่มเดี่ยวหมู'];
const EXPECTED_CATEGORY_ICONS = ['🍲','🥩','🥬','🍜','🥚','🍟','🍨'];

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

    const contract = await page.evaluate(signatureMenus => {
      const menus = document.querySelector('#app-menus');
      const menuRect = menus.getBoundingClientRect();
      const cards = [...document.querySelectorAll('.menu-card')];
      const normal = cards.find(card => !signatureMenus.includes(card.dataset.menu));
      if (!normal) throw new Error('normal non-signature menu card not found');
      const normalThumb = getComputedStyle(normal, '::before');
      const normalRect = normal.getBoundingClientRect();
      const normalStyle = getComputedStyle(normal);
      const sig = document.querySelector('.menu-card[data-menu="ชุดจุ่มหมูทะเล"]');
      const sigThumb = getComputedStyle(sig, '::before');
      const sigRect = sig.getBoundingClientRect();
      const hero = document.querySelector('.hero');
      const heroRect = hero.getBoundingClientRect();
      const brandTitle = document.querySelector('.brand-title');
      const managerButton = document.querySelector('#managerButton');
      const managerRect = managerButton.getBoundingClientRect();
      const firstGrid = document.querySelector('.menu-grid');
      const firstGridStyle = getComputedStyle(firstGrid);
      const bodyBefore = getComputedStyle(document.body, '::before');

      const categories = [...document.querySelectorAll('.category-title')].map(title => {
        const icon = title.querySelector('.category-icon');
        const rect = title.getBoundingClientRect();
        return {
          height: rect.height,
          fontSize: parseFloat(getComputedStyle(title).fontSize),
          iconContent: getComputedStyle(icon, '::before').content,
          iconBaseFontSize: parseFloat(getComputedStyle(icon).fontSize),
        };
      });

      const decor = ['.decor-a','.decor-b','.decor-c'].map(selector => {
        const el = document.querySelector(selector);
        const s = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return {
          selector,
          bg: s.backgroundImage,
          pointer: s.pointerEvents,
          visible: r.right > 0 && r.left < innerWidth && r.bottom > 0 && r.top < innerHeight,
          left: r.left,
          right: r.right,
          width: r.width,
          height: r.height,
          opacity: parseFloat(s.opacity),
          beforeBg: getComputedStyle(el, '::before').backgroundImage,
          afterBg: getComputedStyle(el, '::after').backgroundImage,
        };
      });

      const thumbInfo = s => ({
        width: parseFloat(s.width),
        height: parseFloat(s.height),
        bg: s.backgroundImage,
        bgSize: s.backgroundSize,
        content: s.content,
        display: s.display,
      });

      return {
        viewport: { width: innerWidth, height: innerHeight },
        menus: { left: menuRect.left, right: menuRect.right, width: menuRect.width },
        normalCard: { left: normalRect.left, right: normalRect.right, width: normalRect.width, menu: normal.dataset.menu },
        thumb: thumbInfo(normalThumb),
        signatureThumb: thumbInfo(sigThumb),
        decor,
        background: {
          image: bodyBefore.backgroundImage,
          size: bodyBefore.backgroundSize,
        },
        hero: {
          width: heroRect.width,
          height: heroRect.height,
          titleDisplay: getComputedStyle(brandTitle).display,
        },
        manager: {
          bg: getComputedStyle(managerButton).backgroundColor,
          color: getComputedStyle(managerButton).color,
          width: managerRect.width,
          height: managerRect.height,
        },
        categories,
        cardRhythm: {
          rowGap: parseFloat(firstGridStyle.rowGap),
          normalHeight: normalRect.height,
          signatureHeight: sigRect.height,
          normalRadius: parseFloat(normalStyle.borderTopLeftRadius),
          normalTitleFont: parseFloat(getComputedStyle(normal.querySelector('.menu-card-title')).fontSize),
          signatureTitleFont: parseFloat(getComputedStyle(sig.querySelector('.menu-card-title')).fontSize),
        },
      };
    }, SIGNATURE_MENUS);

    assert.ok(contract.menus.width <= 327, `${browserName}: central menu lane too wide: ${contract.menus.width}`);
    assert.ok(contract.menus.left >= 27 && contract.viewport.width - contract.menus.right >= 27,
      `${browserName}: menu lane does not reserve both character rails`);
    assert.ok(contract.normalCard.left >= contract.menus.left - 1 && contract.normalCard.right <= contract.menus.right + 1,
      `${browserName}: card escapes protected menu lane`);

    // Updated user acceptance: live cards must use simple infographic tiles, not noisy food-photo atlas crops.
    assert.ok(contract.thumb.width <= 67 && contract.thumb.height <= 45,
      `${browserName}: normal infographic tile (${contract.normalCard.menu}) is oversized at ${contract.thumb.width}x${contract.thumb.height}`);
    assert.ok(contract.signatureThumb.width <= 73 && contract.signatureThumb.height <= 49,
      `${browserName}: signature infographic tile is oversized at ${contract.signatureThumb.width}x${contract.signatureThumb.height}`);
    assert.ok(Math.abs(contract.thumb.width / contract.thumb.height - 1.5) < 0.04,
      `${browserName}: normal infographic tile geometry drifted (${contract.thumb.width}x${contract.thumb.height})`);
    assert.ok(Math.abs(contract.signatureThumb.width / contract.signatureThumb.height - 1.5) < 0.04,
      `${browserName}: signature infographic tile geometry drifted (${contract.signatureThumb.width}x${contract.signatureThumb.height})`);
    assert.doesNotMatch(contract.thumb.bg, /semantic-atlas-v1\.webp/, `${browserName}: rejected photo atlas is still painted in normal cards`);
    assert.doesNotMatch(contract.signatureThumb.bg, /semantic-atlas-v1\.webp/, `${browserName}: rejected photo atlas is still painted in signature cards`);
    assert.match(contract.thumb.bg, /gradient/, `${browserName}: normal infographic tile lost its simple graphic treatment`);
    assert.match(contract.signatureThumb.bg, /gradient/, `${browserName}: signature infographic tile lost its simple graphic treatment`);
    assert.notEqual(contract.thumb.content, '""', `${browserName}: normal infographic pictogram is empty`);
    assert.notEqual(contract.signatureThumb.content, '""', `${browserName}: signature infographic pictogram is empty`);
    assert.equal(contract.thumb.display, 'grid', `${browserName}: infographic pictogram is not centered as a simple tile`);

    assert.equal(contract.decor.length, 3, `${browserName}: expected all three characters`);
    for (const item of contract.decor) {
      assert.equal(item.pointer, 'none', `${browserName}: ${item.selector} intercepts touch`);
      assert.ok(item.visible && item.width > 60 && item.height > 60, `${browserName}: ${item.selector} is not visibly present`);
      assert.ok(item.opacity >= .95, `${browserName}: ${item.selector} was faded too far to preserve identity detail`);
    }
    assert.match(contract.decor[0].bg, /ner-character-top-left\.png/, `${browserName}: top-left high-detail master not active`);
    assert.match(contract.decor[1].bg, /ner-character-bottom-left\.png/, `${browserName}: bottom-left high-detail master not active`);
    assert.match(contract.decor[2].bg, /ner-character-right\.png/, `${browserName}: right high-detail master not active`);
    assert.match(contract.decor[1].afterBg, /accessory-gray-fullface-helmet\.svg/, `${browserName}: gray full-face helmet detail missing`);
    assert.match(contract.decor[2].afterBg, /accessory-white-backpack\.svg/, `${browserName}: white backpack detail missing`);
    assert.doesNotMatch(contract.decor[1].beforeBg + contract.decor[1].afterBg, /accessory-glasses\.svg/,
      `${browserName}: bottom-left must remain no-glasses`);

    const topLeftIntrusion = Math.max(0, contract.decor[0].right - contract.menus.left);
    const bottomLeftIntrusion = Math.max(0, contract.decor[1].right - contract.menus.left);
    const rightIntrusion = Math.max(0, contract.menus.right - contract.decor[2].left);
    assert.ok(topLeftIntrusion <= 36, `${browserName}: top-left character competes with menu lane by ${topLeftIntrusion}px`);
    assert.ok(bottomLeftIntrusion <= 48, `${browserName}: bottom-left character competes with menu lane by ${bottomLeftIntrusion}px`);
    assert.ok(rightIntrusion <= 30, `${browserName}: right character competes with menu lane by ${rightIntrusion}px`);
    assert.ok(contract.decor[0].width <= 120 && contract.decor[1].width <= 138 && contract.decor[2].width <= 106,
      `${browserName}: phone character framing scale drifted larger than bounded rails`);
    assert.match(contract.background.image, /background-master\.webp/, `${browserName}: background master is no longer active`);
    assert.match(contract.background.image, /linear-gradient/, `${browserName}: mobile background softening veil missing`);
    assert.match(contract.background.size, /165% 225px/, `${browserName}: mobile background softness geometry changed: ${contract.background.size}`);

    assert.equal(contract.hero.titleDisplay, 'none', `${browserName}: duplicate phone hero brand title is visible`);
    assert.ok(contract.hero.height <= 88, `${browserName}: phone hero remains too tall at ${contract.hero.height}px`);
    assert.ok(Math.abs(contract.hero.width - contract.menus.width) <= 2,
      `${browserName}: phone hero and protected menu lane no longer align`);
    assert.ok(contract.manager.height <= 40, `${browserName}: Matrix action is still too visually dominant at ${contract.manager.height}px tall`);
    assert.ok(contract.manager.width < contract.hero.width - 24,
      `${browserName}: Matrix action still reads as a full-width primary CTA`);

    assert.equal(contract.categories.length, 7, `${browserName}: expected seven visual category sections`);
    const visibleCategoryIcons = contract.categories.map(item => item.iconContent);
    assert.equal(new Set(visibleCategoryIcons).size, 7,
      `${browserName}: category tokens are not semantically distinct: ${visibleCategoryIcons.join(', ')}`);
    for (const expected of EXPECTED_CATEGORY_ICONS) {
      assert.ok(visibleCategoryIcons.some(value => value.includes(expected)),
        `${browserName}: missing semantic category token ${expected}`);
    }
    for (const category of contract.categories) {
      assert.equal(category.iconBaseFontSize, 0, `${browserName}: legacy bowl emoji is still visually active`);
      assert.ok(category.height <= 36, `${browserName}: category header is too tall at ${category.height}px`);
      assert.ok(category.fontSize <= 16.6, `${browserName}: category heading is visually oversized at ${category.fontSize}px`);
    }

    assert.ok(contract.cardRhythm.rowGap >= 5 && contract.cardRhythm.rowGap <= 7,
      `${browserName}: phone menu row gap is outside compact rhythm: ${contract.cardRhythm.rowGap}px`);
    assert.ok(contract.cardRhythm.normalHeight >= 60 && contract.cardRhythm.normalHeight <= 66,
      `${browserName}: normal card rhythm drifted to ${contract.cardRhythm.normalHeight}px`);
    assert.ok(contract.cardRhythm.signatureHeight >= 72 && contract.cardRhythm.signatureHeight <= 78,
      `${browserName}: signature card rhythm drifted to ${contract.cardRhythm.signatureHeight}px`);
    assert.ok(contract.cardRhythm.signatureHeight - contract.cardRhythm.normalHeight >= 8,
      `${browserName}: signature cards no longer have a deliberate visual beat`);
    assert.ok(contract.cardRhythm.normalRadius >= 13 && contract.cardRhythm.normalRadius <= 15,
      `${browserName}: phone card radius drifted to ${contract.cardRhythm.normalRadius}px`);
    assert.ok(contract.cardRhythm.normalTitleFont <= 12.7 && contract.cardRhythm.signatureTitleFont >= 13,
      `${browserName}: title scale no longer distinguishes signature and normal cards`);

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

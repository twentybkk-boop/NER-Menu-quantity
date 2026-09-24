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
    await page.locator('.menu-card[data-menu="ชุดผักรวม"]').click();
    await page.waitForFunction(() => !document.querySelector('#calculatorModal').classList.contains('is-hidden'));
    await page.waitForFunction(() => document.querySelectorAll('#netResultList .net-card').length > 0);

    const contract = await page.evaluate(() => {
      const modal = document.querySelector('#calculatorModal');
      const card = modal.querySelector('.modal-card');
      const header = modal.querySelector('.modal-header');
      const title = modal.querySelector('.modal-title');
      const subtitle = modal.querySelector('.modal-subtitle');
      const left = modal.querySelector('#leftPanel');
      const right = modal.querySelector('#rightPanel');
      const rejectTitle = modal.querySelector('.panel-title.reject');
      const resultTitle = modal.querySelector('.panel-title.result');
      const exclude = modal.querySelector('.exclude-btn');
      const netCard = modal.querySelector('.net-card');
      const netName = netCard.querySelector('.net-name');
      const netQty = netCard.querySelector('.net-qty');
      const body = modal.querySelector('.calculator-body');

      const decor = ['.decor-a','.decor-b','.decor-c'].map(selector => {
        const el = document.querySelector(selector);
        const rect = el.getBoundingClientRect();
        const style = getComputedStyle(el);
        return {
          selector,
          visible: rect.right > 0 && rect.left < innerWidth && rect.bottom > 0 && rect.top < innerHeight,
          pointer: style.pointerEvents,
          width: rect.width,
          height: rect.height,
          bg: style.backgroundImage,
          beforeBg: getComputedStyle(el, '::before').backgroundImage,
          afterBg: getComputedStyle(el, '::after').backgroundImage,
        };
      });

      const rect = element => element.getBoundingClientRect();
      const style = element => getComputedStyle(element);

      return {
        modalVisible: style(modal).display !== 'none',
        card: {
          radius: parseFloat(style(card).borderTopLeftRadius),
          background: style(card).backgroundColor,
        },
        header: {
          height: rect(header).height,
          paddingTop: parseFloat(style(header).paddingTop),
          paddingBottom: parseFloat(style(header).paddingBottom),
        },
        title: {
          fontSize: parseFloat(style(title).fontSize),
          lineHeight: parseFloat(style(title).lineHeight),
        },
        subtitle: {
          fontSize: parseFloat(style(subtitle).fontSize),
          lineHeight: parseFloat(style(subtitle).lineHeight),
        },
        bodyOverflowY: style(body).overflowY,
        zones: {
          leftBackground: style(left).backgroundImage || style(left).backgroundColor,
          rightBackground: style(right).backgroundImage || style(right).backgroundColor,
          leftBorderBottom: style(left).borderBottomWidth,
        },
        panelTitles: {
          rejectHeight: rect(rejectTitle).height,
          resultHeight: rect(resultTitle).height,
          rejectRadius: parseFloat(style(rejectTitle).borderTopLeftRadius),
          resultRadius: parseFloat(style(resultTitle).borderTopLeftRadius),
          rejectBackground: style(rejectTitle).backgroundColor,
          resultBackground: style(resultTitle).backgroundColor,
        },
        exclude: {
          height: rect(exclude).height,
          radius: parseFloat(style(exclude).borderTopLeftRadius),
          fontSize: parseFloat(style(exclude).fontSize),
        },
        result: {
          height: rect(netCard).height,
          radius: parseFloat(style(netCard).borderTopLeftRadius),
          nameFont: parseFloat(style(netName).fontSize),
          qtyFont: parseFloat(style(netQty).fontSize),
        },
        decor,
      };
    });

    assert.equal(contract.modalVisible, true, `${browserName}: calculator modal did not open`);
    assert.ok(contract.card.radius >= 17 && contract.card.radius <= 19,
      `${browserName}: calculator card radius drifted to ${contract.card.radius}px`);
    assert.ok(contract.header.height <= 60,
      `${browserName}: calculator header remains too tall at ${contract.header.height}px`);
    assert.ok(contract.header.paddingTop <= 11 && contract.header.paddingBottom <= 10,
      `${browserName}: calculator header padding is not compact`);
    assert.ok(contract.title.fontSize <= 18 && contract.subtitle.fontSize <= 10,
      `${browserName}: calculator header type hierarchy is oversized`);
    assert.equal(contract.bodyOverflowY, 'auto', `${browserName}: calculator body scroll behavior changed`);

    assert.notEqual(contract.zones.leftBackground, contract.zones.rightBackground,
      `${browserName}: action/result zones are not visually separated`);
    assert.notEqual(contract.panelTitles.rejectBackground, contract.panelTitles.resultBackground,
      `${browserName}: action/result labels do not have distinct semantic treatments`);
    assert.ok(contract.panelTitles.rejectHeight <= 28 && contract.panelTitles.resultHeight <= 28,
      `${browserName}: calculator section labels are too tall`);
    assert.ok(contract.panelTitles.rejectRadius >= 12 && contract.panelTitles.resultRadius >= 12,
      `${browserName}: calculator section labels lost pill hierarchy`);

    assert.ok(contract.exclude.height >= 40 && contract.exclude.height <= 45,
      `${browserName}: exclusion row rhythm drifted to ${contract.exclude.height}px`);
    assert.ok(contract.exclude.radius >= 11 && contract.exclude.radius <= 13,
      `${browserName}: exclusion row radius drifted`);
    assert.ok(contract.result.height >= 46 && contract.result.height <= 52,
      `${browserName}: result row rhythm drifted to ${contract.result.height}px`);
    assert.ok(contract.result.qtyFont >= 18 && contract.result.qtyFont >= contract.result.nameFont + 6,
      `${browserName}: net quantity is not visually dominant over ingredient name`);

    assert.equal(contract.decor.length, 3, `${browserName}: expected all three calculator-frame characters`);
    for (const item of contract.decor) {
      assert.equal(item.pointer, 'none', `${browserName}: ${item.selector} intercepts calculator input`);
      assert.ok(item.visible && item.width > 60 && item.height > 60,
        `${browserName}: ${item.selector} disappeared in calculator state`);
    }
    assert.match(contract.decor[0].bg, /ner-character-top-left\.png/, `${browserName}: top-left master changed`);
    assert.match(contract.decor[1].bg, /ner-character-bottom-left\.png/, `${browserName}: bottom-left master changed`);
    assert.match(contract.decor[2].bg, /ner-character-right\.png/, `${browserName}: right master changed`);
    assert.match(contract.decor[1].afterBg, /accessory-gray-fullface-helmet\.svg/, `${browserName}: helmet missing in calculator state`);
    assert.match(contract.decor[2].afterBg, /accessory-white-backpack\.svg/, `${browserName}: backpack missing in calculator state`);
    assert.doesNotMatch(contract.decor[1].beforeBg + contract.decor[1].afterBg, /accessory-glasses\.svg/,
      `${browserName}: bottom-left must remain no-glasses`);

    if (browserName === 'chromium') {
      await page.screenshot({
        path: path.join(shotDir, '12-calculator-hierarchy-iphone@3x.png'),
        fullPage: false,
      });
    }

    await context.close();
    console.log(`PASS ${browserName} calculator visual hierarchy contract`);
  } finally {
    await browser.close();
  }
}

await inspect(chromium, 'chromium');
await inspect(webkit, 'webkit');
console.log('CALCULATOR VISUAL HIERARCHY CONTRACT PASS');

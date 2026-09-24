import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium, webkit } from 'playwright';

const BASE = 'http://127.0.0.1:8000/index.html';
const recipeBody = fs.readFileSync('recipe_master.json', 'utf8');
const shotDir = path.resolve('qa-artifacts');
fs.mkdirSync(shotDir, { recursive: true });

const devices = [
  { name: 'iphone', width: 390, height: 844 },
  { name: 'ipad-portrait', width: 820, height: 1180 },
  { name: 'ipad-landscape', width: 1180, height: 820 },
];

async function assertBaseContract(page, deviceName) {
  await page.waitForSelector('.menu-card');
  await page.waitForFunction(() => document.querySelectorAll('.menu-card').length === 45);

  const overflow = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth }));
  assert.ok(overflow.sw <= overflow.iw + 1, `${deviceName}: horizontal overflow ${overflow.sw} > ${overflow.iw}`);

  const background = await page.evaluate(() => getComputedStyle(document.body, '::before').backgroundImage);
  assert.match(background, /background-master\.webp/, `${deviceName}: background master not active`);
  assert.match(background, /radial-gradient/, `${deviceName}: central readability veil not active`);

  const decor = await page.locator('.decor-person').evaluateAll(els => els.map(el => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return {
      w:r.width, h:r.height, top:r.top, right:r.right, bottom:r.bottom, left:r.left,
      display:s.display, visibility:s.visibility, opacity:Number(s.opacity), pointer:s.pointerEvents
    };
  }));
  assert.equal(decor.length, 3, `${deviceName}: expected 3 foreground characters`);
  decor.forEach((d, i) => {
    const intersectsViewport = d.right > 0 && d.left < innerWidth && d.bottom > 0 && d.top < innerHeight;
    assert.ok(d.w > 60 && d.h > 60 && d.display !== 'none' && d.visibility !== 'hidden' && d.opacity > .5, `${deviceName}: character ${i+1} not visibly present`);
    assert.ok(intersectsViewport, `${deviceName}: character ${i+1} is outside viewport`);
    assert.equal(d.pointer, 'none', `${deviceName}: character ${i+1} intercepts pointer events`);
  });

  const thumbs = await page.locator('.menu-card').evaluateAll(cards => cards.map(card => {
    const s = getComputedStyle(card, '::before');
    return { img:s.backgroundImage, size:s.backgroundSize, pos:s.backgroundPosition };
  }));
  assert.equal(thumbs.length, 45, `${deviceName}: thumbnail count mismatch`);
  assert.ok(thumbs.every(t => /semantic-atlas-v1\.webp/.test(t.img)), `${deviceName}: unresolved thumbnail`);
  assert.ok(thumbs.every(t => t.size === '600% 500%'), `${deviceName}: atlas crop geometry mismatch`);

  const signatures = await page.evaluate(() => ['ชุดจุ่มหมูทะเล','ชุดจุ่มเนื้อ','ชุดจุ่มหมู','ชุดจุ่มเดี่ยวหมู'].map(name => {
    const el = document.querySelector(`.menu-card[data-menu="${name}"]`);
    return getComputedStyle(el, '::before').backgroundPosition;
  }));
  assert.equal(new Set(signatures).size, 4, `${deviceName}: signature sets are not visually distinct regions`);
}

async function assertCalculator(page, deviceName) {
  await page.evaluate(() => scrollTo(0, Math.min(650, document.documentElement.scrollHeight / 3)));
  const visibleMenu = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('.menu-card')]
      .filter(el => Object.keys(originalMenu[el.dataset.menu] || {}).length > 1);
    let card = cards.find(el => {
      const r = el.getBoundingClientRect();
      return r.top >= 80 && r.bottom <= innerHeight - 20;
    });
    card ||= cards.find(el => {
      const r = el.getBoundingClientRect();
      return r.bottom > 100 && r.top < innerHeight - 60;
    });
    if (!card) throw new Error('no visible multi-ingredient menu card at test scroll position');
    card.scrollIntoView({ block:'center', inline:'nearest' });
    return card.dataset.menu;
  });
  await page.waitForTimeout(50);
  const before = await page.evaluate(() => scrollY);
  await page.locator(`.menu-card[data-menu="${visibleMenu}"]`).click();
  await page.waitForSelector('#calculatorModal:not(.is-hidden)');
  assert.ok(await page.locator('#calculatorModal').isVisible(), `${deviceName}: calculator did not open`);

  const firstExclude = page.locator('#excludeOptions .exclude-btn').first();
  if (await firstExclude.count()) {
    await firstExclude.click();
    assert.ok(await firstExclude.evaluate(el => el.classList.contains('is-excluded')), `${deviceName}: exclusion state not visible`);

    const trigger = page.locator('.replacement-trigger').first();
    if (await trigger.count()) {
      await trigger.click();
      const options = page.locator('.replacement-option');
      if (await options.count()) {
        const disabled = page.locator('.replacement-option.disabled');
        for (let i=0;i<await disabled.count();i++) {
          assert.equal(await disabled.nth(i).isDisabled(), true, `${deviceName}: disabled replacement looks selectable`);
        }
      }
    }
  }

  await page.evaluate(() => {
    const body = document.querySelector('.calculator-body');
    if (body) body.scrollTop = body.scrollHeight;
    const right = document.querySelector('#rightPanel');
    if (right) right.scrollTop = right.scrollHeight;
  });
  const last = page.locator('#netResultList .net-card').last();
  assert.ok(await last.count(), `${deviceName}: missing final result row`);

  await page.locator('#closeCalculatorButton').click();
  await page.waitForFunction(() => document.querySelector('#calculatorModal')?.classList.contains('is-hidden'));
  const after = await page.evaluate(() => scrollY);
  assert.ok(Math.abs(after - before) < 10, `${deviceName}: scroll position changed after modal close (${before} -> ${after})`);
}

async function assertMatrix(page, deviceName) {
  await page.locator('#managerButton').click();
  await page.waitForSelector('#pinModal:not(.is-hidden)');
  await page.locator('#pinInput').fill('206738');
  await page.locator('#verifyPinButton').click();
  await page.waitForSelector('#matrixModal:not(.is-hidden)');
  assert.ok(await page.locator('.matrix-table').isVisible(), `${deviceName}: Matrix did not open`);

  const scroll = await page.locator('#tableContainer').evaluate(el => ({ sw:el.scrollWidth, cw:el.clientWidth }));
  assert.ok(scroll.sw >= scroll.cw, `${deviceName}: invalid Matrix scroll geometry`);
  await page.locator('#tableContainer').evaluate(el => { el.scrollLeft = el.scrollWidth; });

  const downloadPromise = page.waitForEvent('download');
  await page.locator('#downloadJsonButton').click();
  const download = await downloadPromise;
  assert.ok((await download.suggestedFilename()).endsWith('.json'), `${deviceName}: JSON download regression`);

  await page.locator('#closeMatrixButton').click();
  await page.waitForFunction(() => document.querySelector('#matrixModal')?.classList.contains('is-hidden'));
}

async function screenshots(page, name) {
  if (name === 'iphone') {
    await page.evaluate(() => scrollTo(0,0));
    await page.screenshot({ path:path.join(shotDir,'01-iphone-top.png'), fullPage:false });
    await page.evaluate(() => scrollTo(0,700));
    await page.screenshot({ path:path.join(shotDir,'02-iphone-mid.png'), fullPage:false });
    await page.evaluate(() => scrollTo(0,1500));
    await page.screenshot({ path:path.join(shotDir,'03-iphone-lower.png'), fullPage:false });
    const visibleMenu = await page.evaluate(() => {
      const cards = [...document.querySelectorAll('.menu-card')]
        .filter(el => Object.keys(originalMenu[el.dataset.menu] || {}).length > 1);
      const card = cards.find(el => {
        const r = el.getBoundingClientRect();
        return r.bottom > 80 && r.top < innerHeight - 80;
      }) || cards[0];
      return card.dataset.menu;
    });
    await page.locator(`.menu-card[data-menu="${visibleMenu}"]`).click();
    await page.waitForSelector('#calculatorModal:not(.is-hidden)');
    await page.screenshot({ path:path.join(shotDir,'04-iphone-calculator.png'), fullPage:false });
    await page.locator('#closeCalculatorButton').click();
    await page.waitForFunction(() => document.querySelector('#calculatorModal')?.classList.contains('is-hidden'));
  } else if (name === 'ipad-portrait') {
    await page.evaluate(() => scrollTo(0,0));
    await page.screenshot({ path:path.join(shotDir,'05-ipad-portrait-top.png'), fullPage:false });
    await page.evaluate(() => scrollTo(0,750));
    await page.screenshot({ path:path.join(shotDir,'06-ipad-portrait-mid.png'), fullPage:false });
  } else if (name === 'ipad-landscape') {
    await page.evaluate(() => scrollTo(0,0));
    await page.screenshot({ path:path.join(shotDir,'07-ipad-landscape-top.png'), fullPage:false });
    await page.evaluate(() => scrollTo(0,620));
    await page.screenshot({ path:path.join(shotDir,'08-ipad-landscape-mid.png'), fullPage:false });
  }
}

for (const [browserName, browserType] of [['chromium',chromium],['webkit',webkit]]) {
  const browser = await browserType.launch();
  try {
    for (const device of devices) {
      const context = await browser.newContext({ viewport:{width:device.width,height:device.height} });
      const page = await context.newPage();
      await page.route('**/recipe_master.json*', route => route.fulfill({ status:200, contentType:'application/json', body:recipeBody }));
      await page.goto(BASE, { waitUntil:'domcontentloaded' });
      await assertBaseContract(page, `${browserName}/${device.name}`);
      await assertCalculator(page, `${browserName}/${device.name}`);
      await assertMatrix(page, `${browserName}/${device.name}`);

      if (browserName === 'chromium') await screenshots(page, device.name);

      if (device.name === 'ipad-portrait') {
        const beforeCols = await page.locator('.menu-grid').first().evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length);
        await page.setViewportSize({ width:1180, height:820 });
        await page.waitForTimeout(150);
        const afterCols = await page.locator('.menu-grid').first().evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length);
        assert.ok(afterCols >= beforeCols && afterCols >= 3, `${browserName}: orientation did not reflow`);
      }
      await context.close();
      console.log(`PASS ${browserName} ${device.name}`);
    }
  } finally {
    await browser.close();
  }
}

console.log('UI QA PASS: Chromium + WebKit / 390x844, 820x1180, 1180x820');

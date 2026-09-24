import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium, webkit } from 'playwright';

const BASE = 'http://127.0.0.1:8000/index.html';
const recipeBody = fs.readFileSync('recipe_master.json', 'utf8');
const shotDir = path.resolve('qa-artifacts');
fs.mkdirSync(shotDir, { recursive: true });

async function readContract(page) {
  return page.evaluate(() => {
    const menus = document.querySelector('#app-menus').getBoundingClientRect();
    const hero = document.querySelector('.hero').getBoundingClientRect();
    const shelf = getComputedStyle(document.body, '::after');
    const decorLayer = getComputedStyle(document.querySelector('#decor-layer'));
    const chars = ['.decor-a','.decor-b','.decor-c'].map(selector => {
      const el = document.querySelector(selector);
      const rect = el.getBoundingClientRect();
      return {
        selector,
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
        bg: getComputedStyle(el).backgroundImage,
        pointer: getComputedStyle(el).pointerEvents,
      };
    });
    return {
      viewport: { width: innerWidth, height: innerHeight },
      menus: { left: menus.left, right: menus.right, width: menus.width },
      hero: { left: hero.left, right: hero.right, width: hero.width },
      shelf: {
        display: shelf.display,
        position: shelf.position,
        height: parseFloat(shelf.height),
        z: Number(shelf.zIndex),
        pointer: shelf.pointerEvents,
        background: shelf.backgroundImage,
      },
      decorZ: Number(decorLayer.zIndex),
      chars,
    };
  });
}

function assertListState(c, browserName, state) {
  const leftRail = c.menus.left;
  const rightRail = c.viewport.width - c.menus.right;
  assert.ok(c.menus.width >= 285 && c.menus.width <= 302,
    `${browserName}/${state}: center frame width ${c.menus.width}px is outside the deliberate phone lane`);
  assert.ok(leftRail >= 38 && rightRail >= 38,
    `${browserName}/${state}: illustration rails too narrow (${leftRail}px / ${rightRail}px)`);
  assert.ok(c.hero.width <= 302,
    `${browserName}/${state}: hero escaped the protected center frame (${c.hero.width}px)`);

  assert.equal(c.shelf.position, 'fixed', `${browserName}/${state}: illustration shelf is not fixed`);
  assert.ok(c.shelf.height >= 118, `${browserName}/${state}: illustration shelf collapsed to ${c.shelf.height}px`);
  assert.equal(c.shelf.pointer, 'none', `${browserName}/${state}: illustration shelf intercepts touch`);
  assert.match(c.shelf.background, /linear-gradient/, `${browserName}/${state}: illustration shelf mask missing`);
  assert.ok(c.shelf.z > 36 && c.decorZ > c.shelf.z,
    `${browserName}/${state}: required z-order menu < shelf < characters is not active`);

  assert.equal(c.chars.length, 3, `${browserName}/${state}: expected all three story compositions`);
  assert.match(c.chars[0].bg, /overlay-top-left\.webp/, `${browserName}/${state}: top-left approved asset missing`);
  assert.match(c.chars[1].bg, /overlay-bottom-left\.webp/, `${browserName}/${state}: bottom-left approved asset missing`);
  assert.match(c.chars[2].bg, /overlay-right\.webp/, `${browserName}/${state}: right approved asset missing`);
  for (const item of c.chars) assert.equal(item.pointer, 'none', `${browserName}/${state}: ${item.selector} intercepts touch`);

  // Lower-left and right must be entirely inside the reserved shelf/viewport,
  // not clipped fragments behind the list surface.
  for (const item of c.chars.slice(1)) {
    assert.ok(item.left >= 0 && item.right <= c.viewport.width + .5,
      `${browserName}/${state}: ${item.selector} is horizontally clipped`);
    assert.ok(item.bottom <= c.viewport.height + .5,
      `${browserName}/${state}: ${item.selector} falls below viewport`);
    assert.ok(item.top >= c.viewport.height - c.shelf.height - 8,
      `${browserName}/${state}: ${item.selector} escaped its reserved illustration shelf`);
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
    await page.route('**/recipe_master.json*', route => route.fulfill({ status:200, contentType:'application/json', body:recipeBody }));
    await page.goto(BASE, { waitUntil:'domcontentloaded' });
    await page.waitForFunction(() => document.querySelectorAll('.menu-card').length === 45);

    let contract = await readContract(page);
    assertListState(contract, browserName, 'top');
    if (browserName === 'chromium') {
      await page.screenshot({ path:path.join(shotDir,'20-center-frame-v2-top@3x.png'), fullPage:false });
    }

    await page.evaluate(() => scrollTo(0, 1100));
    await page.waitForTimeout(80);
    contract = await readContract(page);
    assertListState(contract, browserName, 'scroll');
    if (browserName === 'chromium') {
      await page.screenshot({ path:path.join(shotDir,'21-center-frame-v2-scroll@3x.png'), fullPage:false });
    }

    // The normal-list shelf must disappear when calculator takes over the viewport.
    await page.locator('.menu-card[data-menu="ชุดจุ่มหมูทะเล"]').click();
    await page.waitForSelector('#calculatorModal:not(.is-hidden)');
    const modalShelf = await page.evaluate(() => getComputedStyle(document.body, '::after').display);
    assert.equal(modalShelf, 'none', `${browserName}: list illustration shelf remained over calculator`);

    await context.close();
    console.log(`PASS ${browserName} P0-B protected center frame V2`);
  } finally {
    await browser.close();
  }
}

await inspect(chromium, 'chromium');
await inspect(webkit, 'webkit');
console.log('P0-B PROTECTED CENTER FRAME V2 PASS');

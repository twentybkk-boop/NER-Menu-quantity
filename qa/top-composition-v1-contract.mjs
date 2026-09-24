import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium, webkit } from 'playwright';

const BASE = process.env.TOP_COMPOSITION_BASE || 'http://127.0.0.1:8000/index.html';
const LIVE = /^https:\/\//.test(BASE);
const recipeBody = LIVE ? null : fs.readFileSync('recipe_master.json', 'utf8');
const shotDir = path.resolve('qa-artifacts');
fs.mkdirSync(shotDir, { recursive: true });
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function siteRoot() {
  const url = new URL(BASE);
  const parts = url.pathname.split('/').filter(Boolean);
  if (parts.at(-1)?.includes('.')) parts.pop();
  url.pathname = `/${parts.join('/')}${parts.length ? '/' : ''}`;
  url.search = '';
  url.hash = '';
  return url.toString();
}

async function waitForDeployment(page) {
  if (!LIVE) return;
  const root = siteRoot();
  const deadline = Date.now() + 180_000;
  let last = '';
  while (Date.now() < deadline) {
    try {
      const polish = await page.request.get(`${root}assets/visual-polish.css?topv1=${Date.now()}`, {
        headers: { 'cache-control': 'no-cache' },
      });
      const layer = await page.request.get(`${root}assets/visual-top-composition-v1.css?topv1=${Date.now()}`, {
        headers: { 'cache-control': 'no-cache' },
      });
      const orientation = await page.request.get(`${root}assets/visual-layering-orientation-v1.css?topv1=${Date.now()}`, {
        headers: { 'cache-control': 'no-cache' },
      });
      if (polish.ok() && layer.ok() && orientation.ok()) {
        const polishText = await polish.text();
        const layerText = await layer.text();
        const orientationText = await orientation.text();
        last = `${polishText.slice(-260)}\n${layerText.slice(0, 180)}\n${orientationText.slice(0, 180)}`;
        if (
          polishText.includes('visual-top-composition-v1.css') &&
          polishText.includes('visual-layering-orientation-v1.css') &&
          layerText.includes('P0-D TOP COMPOSITION V1') &&
          orientationText.includes('layering/orientation/background V1')
        ) return;
      }
    } catch (error) {
      last = String(error);
    }
    await sleep(8_000);
  }
  throw new Error(`GitHub Pages did not expose P0-D top composition + backmost environment before timeout. Last probe: ${last.slice(0, 420)}`);
}

async function readContract(page) {
  return page.evaluate(() => {
    const rect = selector => document.querySelector(selector).getBoundingClientRect();
    const style = (selector, pseudo = null) => getComputedStyle(document.querySelector(selector), pseudo);
    const masthead = rect('.brand-masthead');
    const brandMark = rect('.brand-mark');
    const hero = rect('.hero');
    const manager = rect('.manager-btn');
    const menus = rect('#app-menus');
    const firstBlockEl = document.querySelector('.category-block:has(.menu-card[data-menu="ชุดจุ่มหมูทะเล"])');
    const firstBlock = firstBlockEl.getBoundingClientRect();
    const firstTitle = firstBlockEl.querySelector('.category-title').getBoundingClientRect();
    const firstCardEl = firstBlockEl.querySelector('.menu-card');
    const firstCard = firstCardEl.getBoundingClientRect();
    const decorEl = document.querySelector('.decor-a');
    const decor = decorEl.getBoundingClientRect();
    const visibleLeft = Math.max(0, decor.left);
    const visibleTop = Math.max(0, decor.top);
    const visibleRight = Math.min(innerWidth, decor.right);
    const visibleBottom = Math.min(innerHeight, decor.bottom);
    const visibleArea = Math.max(0, visibleRight - visibleLeft) * Math.max(0, visibleBottom - visibleTop);
    const totalArea = Math.max(1, decor.width * decor.height);
    const visibleFirstCards = [...firstBlockEl.querySelectorAll('.menu-card')]
      .map(el => el.getBoundingClientRect())
      .filter(r => r.bottom > 0 && r.top < innerHeight).length;

    return {
      viewport: { width: innerWidth, height: innerHeight },
      menuCount: document.querySelectorAll('.menu-card').length,
      bodyBg: getComputedStyle(document.body, '::before').backgroundImage,
      masthead: {
        left: masthead.left, right: masthead.right, top: masthead.top, bottom: masthead.bottom,
        width: masthead.width, height: masthead.height,
        bg: style('.brand-masthead').backgroundImage,
        radius: parseFloat(style('.brand-masthead').borderTopLeftRadius),
        shadow: style('.brand-masthead').boxShadow,
        align: style('.brand-masthead').textAlign,
        beforeBg: style('.brand-masthead', '::before').backgroundImage,
        afterBg: style('.brand-masthead', '::after').backgroundImage,
      },
      brandMark: {
        left: brandMark.left, right: brandMark.right,
        font: parseFloat(style('.brand-mark').fontSize),
      },
      hero: {
        width: hero.width, height: hero.height, left: hero.left, right: hero.right,
        bg: style('.hero').backgroundImage,
        radius: parseFloat(style('.hero').borderTopLeftRadius),
      },
      manager: {
        width: manager.width, height: manager.height,
        font: parseFloat(style('.manager-btn').fontSize),
        bg: style('.manager-btn').backgroundColor,
      },
      menus: { left: menus.left, right: menus.right, width: menus.width, top: menus.top },
      firstBlock: {
        left: firstBlock.left, right: firstBlock.right, top: firstBlock.top,
        bg: getComputedStyle(firstBlockEl).backgroundImage,
        radius: parseFloat(getComputedStyle(firstBlockEl).borderTopLeftRadius),
      },
      firstTitle: {
        top: firstTitle.top,
        bg: getComputedStyle(firstBlockEl.querySelector('.category-title')).backgroundColor,
      },
      firstCard: {
        left: firstCard.left, right: firstCard.right,
        bg: getComputedStyle(firstCardEl).backgroundImage,
        radius: parseFloat(getComputedStyle(firstCardEl).borderTopLeftRadius),
      },
      visibleFirstCards,
      decor: {
        left: decor.left, right: decor.right, top: decor.top, bottom: decor.bottom,
        width: decor.width, height: decor.height,
        bg: style('.decor-a').backgroundImage,
        pointer: style('.decor-a').pointerEvents,
        visibleFraction: visibleArea / totalArea,
      },
    };
  });
}

function assertContract(c, browserName) {
  const scope = `${browserName}/${LIVE ? 'live' : 'local'}`;
  assert.equal(c.menuCount, 45, `${scope}: menu count changed`);
  assert.ok(c.menus.width >= 285 && c.menus.width <= 302, `${scope}: protected center frame drifted to ${c.menus.width}px`);
  assert.ok(c.masthead.width >= 285 && c.masthead.width <= 302, `${scope}: brand panel escaped center frame`);
  assert.ok(c.hero.width >= 285 && c.hero.width <= 302, `${scope}: utility ribbon escaped center frame`);
  assert.ok(c.masthead.height >= 145 && c.masthead.height <= 165, `${scope}: brand moment height is ${c.masthead.height}px`);
  assert.equal(c.masthead.align, 'left', `${scope}: masthead lost editorial left alignment`);

  /* New real-device feedback moved round ambient bubbles out of the component
     layers. The illustrated environment must now live on the backmost body layer. */
  assert.match(c.bodyBg, /background-master\.webp/, `${scope}: backmost illustrated environment missing`);
  assert.match(c.bodyBg, /radial-gradient/, `${scope}: backmost ambient bubbles missing`);
  assert.doesNotMatch(c.masthead.bg, /radial-gradient/, `${scope}: round ambient bubble leaked back into masthead layer`);
  assert.match(c.masthead.bg, /linear-gradient/, `${scope}: masthead paper wash missing`);
  assert.ok(c.masthead.radius >= 20, `${scope}: masthead no longer reads as soft editorial panel`);
  assert.notEqual(c.masthead.shadow, 'none', `${scope}: masthead depth cue missing`);
  assert.match(c.masthead.beforeBg, /radial-gradient/, `${scope}: masthead soft illustrated accent missing`);
  assert.match(c.masthead.afterBg, /linear-gradient/, `${scope}: masthead hand-drawn accent line missing`);

  assert.ok(c.brandMark.font >= 56, `${scope}: brand wordmark lost first-screen dominance`);
  assert.match(c.decor.bg, /overlay-top-left\.webp/, `${scope}: approved upper-left story source changed`);
  assert.equal(c.decor.pointer, 'none', `${scope}: upper-left art intercepts controls`);
  assert.ok(c.decor.width >= 100 && c.decor.height >= 108, `${scope}: upper-left story detail became too small`);
  assert.ok(c.decor.visibleFraction >= .96, `${scope}: upper-left story composition is clipped`);
  assert.ok(c.decor.right <= c.brandMark.left + 8, `${scope}: character overlaps the NER wordmark instead of framing it`);

  assert.ok(c.hero.height <= 58, `${scope}: utility ribbon became a competing hero (${c.hero.height}px)`);
  assert.ok(c.hero.radius >= 15, `${scope}: utility ribbon lost soft editorial treatment`);
  assert.ok(c.manager.height <= 38 && c.manager.width <= 150, `${scope}: Matrix action is visually dominant again`);
  assert.ok(c.manager.font <= 9.5, `${scope}: Matrix action typography is too loud`);

  assert.ok(c.firstBlock.top < 300, `${scope}: first category fell out of the first-screen composition`);
  assert.doesNotMatch(c.firstBlock.bg, /radial-gradient/, `${scope}: round ambient bubble leaked into first category layer`);
  assert.match(c.firstBlock.bg, /linear-gradient/, `${scope}: first category paper wash missing`);
  assert.ok(c.firstBlock.radius >= 20, `${scope}: first category editorial grouping collapsed`);
  assert.notEqual(c.firstTitle.bg, 'rgba(0, 0, 0, 0)', `${scope}: first category label lost its editorial plate`);
  assert.match(c.firstCard.bg, /linear-gradient/, `${scope}: first signature card lost editorial paper treatment`);
  assert.ok(c.firstCard.left >= c.menus.left && c.firstCard.right <= c.menus.right, `${scope}: first card escaped protected center frame`);
  assert.ok(c.visibleFirstCards >= 4, `${scope}: first screen no longer shows enough of the signature category (${c.visibleFirstCards})`);
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
    await waitForDeployment(page);
    if (!LIVE) {
      await page.route('**/recipe_master.json*', route => route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: recipeBody,
      }));
    }
    const sep = BASE.includes('?') ? '&' : '?';
    await page.goto(`${BASE}${sep}topv1=${Date.now()}`, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    await page.waitForFunction(() => document.querySelectorAll('.menu-card').length === 45, null, { timeout: 60_000 });
    const contract = await readContract(page);
    assertContract(contract, browserName);

    if (browserName === 'chromium') {
      const name = LIVE ? '24-live-top-composition-v1@3x.png' : '23-top-composition-v1-iphone@3x.png';
      await page.screenshot({ path: path.join(shotDir, name), fullPage: false });
    }

    await context.close();
    console.log(`PASS ${browserName} P0-D top composition V1 ${LIVE ? 'live' : 'local'}`);
  } finally {
    await browser.close();
  }
}

await inspect(chromium, 'chromium');
await inspect(webkit, 'webkit');
console.log(`P0-D TOP COMPOSITION V1 ${LIVE ? 'LIVE' : 'LOCAL'} PASS`);

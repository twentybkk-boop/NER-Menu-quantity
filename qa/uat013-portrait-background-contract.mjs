// UAT-013 — approved portrait-native background acceptance.
// UAT-014 keeps this contract orientation-aware after replacing landscape art.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium, webkit } from 'playwright';

const BASE = process.env.UAT013_BASE || 'http://127.0.0.1:8000/index.html';
const LIVE = /^https:\/\//.test(BASE);
const recipeBody = LIVE ? null : fs.readFileSync('recipe_master.json', 'utf8');
const shotDir = path.resolve('qa-artifacts');
fs.mkdirSync(shotDir, { recursive: true });
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function rootUrl() {
  const u = new URL(BASE);
  const parts = u.pathname.split('/').filter(Boolean);
  if (parts.at(-1)?.includes('.')) parts.pop();
  u.pathname = `/${parts.join('/')}${parts.length ? '/' : ''}`;
  u.search = '';
  u.hash = '';
  return u.toString();
}

async function waitForDeployment(page) {
  if (!LIVE) return;
  const root = rootUrl();
  const deadline = Date.now() + 180_000;
  while (Date.now() < deadline) {
    const css = await page.request.get(`${root}assets/visual-uat-v4-chunk1.css?uat013=${Date.now()}`, {headers:{'cache-control':'no-cache'}});
    const portraitArt = await page.request.get(`${root}assets/background-portrait-garden-v1.webp?uat013=${Date.now()}`, {headers:{'cache-control':'no-cache'}});
    const landscapeArt = await page.request.get(`${root}assets/background-landscape-garden-v1.webp?uat013=${Date.now()}`, {headers:{'cache-control':'no-cache'}});
    if (css.ok() && portraitArt.ok() && landscapeArt.ok()) {
      const text = await css.text();
      if (
        text.includes('background-portrait-garden-v1.webp') &&
        text.includes('background-landscape-garden-v1.webp') &&
        text.includes('UAT-013') &&
        text.includes('UAT-014')
      ) return;
    }
    await sleep(8_000);
  }
  throw new Error('GitHub Pages did not expose the current UAT-013 portrait + UAT-014 landscape backgrounds before timeout');
}

const CASES = [
  {name:'phone-portrait', width:390, height:844, portrait:true},
  {name:'phone-landscape', width:844, height:390, portrait:false},
  {name:'ipad-portrait', width:768, height:1024, portrait:true},
  {name:'ipad-landscape', width:1024, height:768, portrait:false},
];

async function inspect(browserType, browserName, c) {
  const browser = await browserType.launch();
  try {
    const context = await browser.newContext({viewport:{width:c.width,height:c.height},deviceScaleFactor:2,isMobile:c.name.startsWith('phone'),hasTouch:true});
    const page = await context.newPage();
    await waitForDeployment(page);
    if (!LIVE) {
      await page.route('**/recipe_master.json*', route => route.fulfill({status:200,contentType:'application/json',body:recipeBody}));
    }
    const sep = BASE.includes('?') ? '&' : '?';
    await page.goto(`${BASE}${sep}uat013=${Date.now()}`, {waitUntil:'domcontentloaded',timeout:60_000});
    await page.waitForFunction(() => document.querySelectorAll('.menu-card').length === 45, null, {timeout:60_000});

    const state = await page.evaluate(() => {
      const before = getComputedStyle(document.body, '::before');
      const shell = getComputedStyle(document.querySelector('#app-shell'));
      const decor = getComputedStyle(document.querySelector('#decor-layer'));
      return {
        bg: before.backgroundImage,
        size: before.backgroundSize,
        position: before.backgroundPosition,
        pointer: before.pointerEvents,
        z: parseInt(before.zIndex) || 0,
        shellZ: parseInt(shell.zIndex) || 0,
        decorZ: parseInt(decor.zIndex) || 0,
      };
    });

    const scope = `${browserName}/${c.name}/${LIVE?'live':'local'}`;
    assert.equal(state.pointer, 'none', `${scope}: portrait background intercepts controls`);
    assert.ok(state.z < state.shellZ && state.z < state.decorZ, `${scope}: environment is not backmost`);
    assert.match(state.bg, /radial-gradient/, `${scope}: ambient depth disappeared`);

    if (c.portrait) {
      assert.match(state.bg, /background-portrait-garden-v1\.webp/, `${scope}: approved portrait-native art missing`);
      assert.doesNotMatch(state.bg, /background-master\.webp/, `${scope}: legacy landscape master still participates in portrait`);
      const imageLayerSize = state.size.split(',').at(-1)?.trim() || '';
      assert.equal(imageLayerSize, 'cover', `${scope}: portrait-native art must use cover, got ${state.size}`);
    } else {
      assert.match(state.bg, /background-landscape-garden-v1\.webp/, `${scope}: approved UAT-014 landscape-native art missing`);
      assert.doesNotMatch(state.bg, /background-portrait-garden-v1\.webp/, `${scope}: portrait art leaked into landscape`);
      assert.doesNotMatch(state.bg, /background-master\.webp/, `${scope}: legacy landscape master still participates in landscape`);
    }

    if (browserName === 'chromium' && c.name === 'phone-portrait') {
      const prefix = LIVE ? 'live-' : '';
      await page.screenshot({path:path.join(shotDir,`${prefix}35-phone-portrait-uat013.png`),fullPage:false});
    }
    await context.close();
    console.log(`PASS ${scope}`);
  } finally {
    await browser.close();
  }
}

for (const c of CASES) {
  await inspect(chromium, 'chromium', c);
  await inspect(webkit, 'webkit', c);
}
console.log(`UAT-013 PORTRAIT BACKGROUND ${LIVE?'LIVE':'LOCAL'} PASS`);

// V3 Session 1 final gate + V4 UAT Chunk 1/UAT-013/UAT-014 regression checks:
// layering/orientation/background depth across phone + iPad states.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium, webkit } from 'playwright';

const BASE = process.env.LAYERING_BASE || 'http://127.0.0.1:8000/index.html';
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
    const polish = await page.request.get(`${root}assets/visual-polish.css?layer=${Date.now()}`, { headers: {'cache-control':'no-cache'} });
    const layer = await page.request.get(`${root}assets/visual-layering-orientation-v1.css?layer=${Date.now()}`, { headers: {'cache-control':'no-cache'} });
    const v4 = await page.request.get(`${root}assets/visual-uat-v4-chunk1.css?layer=${Date.now()}`, { headers: {'cache-control':'no-cache'} });
    const portrait = await page.request.get(`${root}assets/background-portrait-garden-v1.webp?layer=${Date.now()}`, { headers: {'cache-control':'no-cache'} });
    const landscape = await page.request.get(`${root}assets/background-landscape-garden-v1.webp?layer=${Date.now()}`, { headers: {'cache-control':'no-cache'} });
    if (polish.ok() && layer.ok() && v4.ok() && portrait.ok() && landscape.ok()) {
      const [p,l,v] = await Promise.all([polish.text(), layer.text(), v4.text()]);
      if (
        p.includes('visual-layering-orientation-v1.css') &&
        p.includes('visual-uat-v4-chunk1.css') &&
        l.includes('layering/orientation/background V1') &&
        v.includes('background-portrait-garden-v1.webp') &&
        v.includes('background-landscape-garden-v1.webp')
      ) return;
    }
    await sleep(8_000);
  }
  throw new Error('GitHub Pages did not expose UAT-013/UAT-014 layering assets before timeout');
}

const CASES = [
  {name:'phone-portrait', width:390, height:844, maxMenu:302},
  {name:'phone-landscape', width:844, height:390, minMenu:600, maxMenu:625, gridCols:2},
  {name:'ipad-portrait', width:768, height:1024, minMenu:500, maxMenu:525},
  {name:'ipad-landscape', width:1024, height:768, minMenu:660, maxMenu:685, gridCols:2},
  {name:'ipad-wide-landscape', width:1180, height:820, minMenu:660, maxMenu:685, gridCols:3},
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
    await page.goto(`${BASE}${sep}layer=${Date.now()}`, {waitUntil:'domcontentloaded',timeout:60_000});
    await page.waitForFunction(() => document.querySelectorAll('.menu-card').length === 45, null, {timeout:60_000});

    const r = await page.evaluate(() => {
      const menus = document.querySelector('#app-menus').getBoundingClientRect();
      const gridStyle = getComputedStyle(document.querySelector('.menu-grid'));
      const decorLayer = document.querySelector('#decor-layer');
      const decorBefore = getComputedStyle(decorLayer, '::before');
      const decorAfter = getComputedStyle(decorLayer, '::after');
      const bodyBefore = getComputedStyle(document.body,'::before');
      const decor = [...document.querySelectorAll('.decor-person')].map(el => {
        const rect = el.getBoundingClientRect();
        return {left:rect.left,right:rect.right,top:rect.top,bottom:rect.bottom,width:rect.width,height:rect.height,pointer:getComputedStyle(el).pointerEvents,bg:getComputedStyle(el).backgroundImage};
      });
      const first = document.querySelector('.category-block:has(.menu-card[data-menu="ชุดจุ่มหมูทะเล"])');
      const later = [...document.querySelectorAll('.category-block')].find(el => !el.matches(':has(.menu-card[data-menu="ชุดจุ่มหมูทะเล"])'));
      return {
        menus:{left:menus.left,right:menus.right,width:menus.width},
        gridCols:gridStyle.gridTemplateColumns.split(' ').length,
        shell:{z:parseInt(getComputedStyle(document.querySelector('#app-shell')).zIndex)||0},
        decorZ:parseInt(getComputedStyle(decorLayer).zIndex)||0,
        decor,
        decorPseudo:[
          {display:decorBefore.display,content:decorBefore.content,bg:decorBefore.backgroundImage,pointer:decorBefore.pointerEvents},
          {display:decorAfter.display,content:decorAfter.content,bg:decorAfter.backgroundImage,pointer:decorAfter.pointerEvents},
        ],
        bodyBg:bodyBefore.backgroundImage,
        bodyBgSize:bodyBefore.backgroundSize,
        bodyBgZ:parseInt(bodyBefore.zIndex)||0,
        bodyBgPointer:bodyBefore.pointerEvents,
        mastheadBg:getComputedStyle(document.querySelector('.brand-masthead')).backgroundImage,
        firstBg:getComputedStyle(first).backgroundImage,
        laterBg:getComputedStyle(later).backgroundImage,
        shelfDisplay:getComputedStyle(document.body,'::after').display,
      };
    });

    const scope = `${browserName}/${c.name}/${LIVE?'live':'local'}`;
    assert.equal(r.decor.length, 3, `${scope}: expected three character compositions`);
    assert.ok(r.decorZ > r.shell.z, `${scope}: characters are not above content (${r.decorZ} <= ${r.shell.z})`);
    assert.ok(r.bodyBgZ < r.shell.z && r.bodyBgZ < r.decorZ, `${scope}: environmental background is not backmost`);
    assert.equal(r.bodyBgPointer, 'none', `${scope}: backmost environment intercepts controls`);
    assert.match(r.bodyBg, /radial-gradient/, `${scope}: backmost ambient circles missing`);

    if (c.name.endsWith('portrait')) {
      assert.match(r.bodyBg, /background-portrait-garden-v1\.webp/, `${scope}: approved portrait-native environment missing`);
      assert.doesNotMatch(r.bodyBg, /background-landscape-garden-v1\.webp/, `${scope}: landscape art leaked into portrait`);
      assert.doesNotMatch(r.bodyBg, /background-master\.webp/, `${scope}: legacy master leaked into portrait`);
      const imageLayerSize = r.bodyBgSize.split(',').at(-1)?.trim() || '';
      assert.equal(imageLayerSize, 'cover', `${scope}: portrait-native environment must use cover (${r.bodyBgSize})`);
    } else {
      assert.match(r.bodyBg, /background-landscape-garden-v1\.webp/, `${scope}: approved landscape-native environment missing`);
      assert.doesNotMatch(r.bodyBg, /background-portrait-garden-v1\.webp/, `${scope}: portrait-only art leaked into landscape`);
      assert.doesNotMatch(r.bodyBg, /background-master\.webp/, `${scope}: legacy master still active in landscape`);
      const imageLayerSize = r.bodyBgSize.split(',').at(-1)?.trim() || '';
      assert.equal(imageLayerSize, 'cover', `${scope}: landscape-native environment must use cover (${r.bodyBgSize})`);
    }

    /* V4 UAT-001: no round ambient shape may remain inside the foreground
       character stacking context. */
    for (const [i,p] of r.decorPseudo.entries()) {
      assert.equal(p.pointer, 'none', `${scope}: decor pseudo ${i} intercepts controls`);
      assert.equal(p.display, 'none', `${scope}: decor pseudo ${i} still paints above the UI`);
      assert.equal(p.bg, 'none', `${scope}: decor pseudo ${i} still owns ambient artwork`);
    }

    for (const d of r.decor) {
      assert.equal(d.pointer, 'none', `${scope}: character intercepts controls`);
      assert.match(d.bg, /overlay-(top-left|bottom-left|right)-hires\.webp/, `${scope}: approved character source changed`);
    }
    if (c.minMenu) assert.ok(r.menus.width >= c.minMenu, `${scope}: menu lane too narrow ${r.menus.width}`);
    if (c.maxMenu) assert.ok(r.menus.width <= c.maxMenu, `${scope}: menu lane too wide ${r.menus.width}`);
    if (c.gridCols) assert.equal(r.gridCols, c.gridCols, `${scope}: expected ${c.gridCols} menu columns, got ${r.gridCols}`);

    if (c.name !== 'phone-portrait') {
      const maxRailIntrusion = 40;
      const leftIntrusion = Math.max(0, Math.max(r.decor[0].right, r.decor[1].right) - r.menus.left);
      const rightIntrusion = Math.max(0, r.menus.right - r.decor[2].left);
      assert.ok(leftIntrusion <= maxRailIntrusion, `${scope}: left character rail intrudes ${leftIntrusion}px into cards`);
      assert.ok(rightIntrusion <= maxRailIntrusion, `${scope}: right character rail intrudes ${rightIntrusion}px into cards`);
    }

    if (c.name === 'phone-portrait') {
      assert.doesNotMatch(r.mastheadBg, /radial-gradient/, `${scope}: top-right round ambient shape still lives in masthead layer`);
      assert.doesNotMatch(r.firstBg, /radial-gradient/, `${scope}: round ambient shape still lives in first category layer`);
      assert.doesNotMatch(r.laterBg, /radial-gradient/, `${scope}: round ambient shape still lives in long-list category layer`);
    }
    if (c.name.includes('landscape')) {
      assert.match(r.mastheadBg, /linear-gradient/, `${scope}: NER masthead has no protected landscape background plate`);
    }
    if (c.name === 'phone-landscape') assert.equal(r.shelfDisplay, 'none', `${scope}: portrait shelf still paints over landscape content`);

    if (browserName === 'chromium') {
      const prefix = LIVE ? 'live-' : '';
      await page.screenshot({path:path.join(shotDir,`${prefix}29-${c.name}-layering-v1@2x.png`),fullPage:false});
    }
    await context.close();
    console.log(`PASS ${scope}`);
  } finally {
    await browser.close();
  }
}

for (const c of CASES) {
  await inspect(chromium,'chromium',c);
  await inspect(webkit,'webkit',c);
}
console.log(`LAYERING ORIENTATION V1/V4/UAT-013/UAT-014 ${LIVE?'LIVE':'LOCAL'} PASS`);

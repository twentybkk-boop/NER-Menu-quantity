// V4 UAT Chunk 3 — item-level thumbnail semantics + compact infographic footprint.
// Presentation-only contract. Business/recipe behavior is intentionally out of scope.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium, webkit } from 'playwright';

const BASE = process.env.THUMBNAIL_V4_BASE || 'http://127.0.0.1:8000/index.html';
const LIVE = /^https:\/\//.test(BASE);
const shotDir = path.resolve('qa-artifacts');
fs.mkdirSync(shotDir, { recursive: true });
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const viewports = [
  {name:'phone-portrait', width:390, height:844, maxW:60.5, maxH:42.5, sigW:68.5, sigH:44.5, focus:'เนื้อริบอายสไลซ์'},
  {name:'phone-landscape', width:844, height:390, maxW:62.5, maxH:42.5, sigW:70.5, sigH:44.5, focus:'โหระพา'},
  {name:'ipad-portrait', width:820, height:1180, maxW:68.5, maxH:48.5, sigW:76.5, sigH:50.5, focus:'เต้าหู้ชีส'},
  {name:'ipad-landscape', width:1180, height:820, maxW:68.5, maxH:48.5, sigW:76.5, sigH:50.5, focus:'แฮชบราวน์ เทเทอร์ ทอตส์'},
];

const representativeCues = new Map([
  ['หมูล้วน (ไม่มีเครื่องใน)','หมูล้วน'],
  ['หมูหมัก NER','หมูหมัก'],
  ['สามชั้นหมูสไลซ์','สามชั้น'],
  ['ตับหมู','ตับ'],
  ['เซ่งจี๊หมู','เซ่งจี๊'],
  ['เนื้อใบพายสไลซ์','ใบพาย'],
  ['เนื้อริบอายสไลซ์','ริบอาย'],
  ['เนื้อเสือร้องไห้สไลซ์','เสือร้อง'],
  ['เนื้อรวม','เนื้อรวม'],
  ['ผักบุ้ง','ผักบุ้ง'],
  ['ผักชีฝรั่ง','ชีฝรั่ง'],
  ['โหระพา','โหระพา'],
  ['ใบชะพลู','ชะพลู'],
  ['วุ้นเส้น','วุ้นเส้น'],
  ['มาม่า','มาม่า'],
  ['หมี่หยก(สด)','หมี่หยก'],
  ['เส้นอุด้ง','อุด้ง'],
  ['เต้าหู้ปลา','ปลา'],
  ['เต้าหู้ไข่','ไข่'],
  ['เต้าหู้ชีส','ชีส'],
  ['ฟองเต้าหู้แท่ง','แท่ง'],
  ['ฟองเต้าหู้ทอด','ทอด'],
  ['ไก่ป๊อป','ไก่ป๊อป'],
  ['แฮชบราวน์ เทเทอร์ ทอตส์','เทเทอร์'],
  ['ข้าวเกรียบปลา','ข้าวเกรียบ'],
  ['คาลามารี','คาลามารี'],
  ['สละลอยแก้ว','สละ'],
  ['ลูกตาลลอยแก้ว','ลูกตาล'],
  ['อิ่มเดี่ยว ต้มพร้อมทาน','พร้อมทาน'],
  ['อิ่มเดี่ยว หมูจุกจุก','หมูจุก'],
]);

const distinctGroups = [
  ['เนื้อใบพายสไลซ์','เนื้อริบอายสไลซ์','เนื้อเสือร้องไห้สไลซ์','เนื้อรวม'],
  ['ชุดผักรวม','กะหล่ำปลี','ผักบุ้ง','ผักชีฝรั่ง','โหระพา','ใบชะพลู'],
  ['วุ้นเส้น','มาม่า','หมี่หยก(สด)','เส้นอุด้ง'],
  ['เต้าหู้ปลา','เต้าหู้ไข่','เต้าหู้ชีส','ฟองเต้าหู้แท่ง','ฟองเต้าหู้ทอด'],
  ['ไก่ป๊อป','แฮชบราวน์ เทเทอร์ ทอตส์','ข้าวเกรียบปลา','คาลามารี'],
  ['สละลอยแก้ว','ลูกตาลลอยแก้ว','โมจิไอศครีม','ซาโมซ่ากล้วย'],
  ['อิ่มเดี่ยว ต้มพร้อมทาน','อิ่มเดี่ยว หมูจุกจุก'],
];

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
    const polish = await page.request.get(`${root}assets/visual-polish.css?v4thumb=${Date.now()}`, {headers:{'cache-control':'no-cache'}});
    const chunk3 = await page.request.get(`${root}assets/visual-uat-v4-chunk3.css?v4thumb=${Date.now()}`, {headers:{'cache-control':'no-cache'}});
    if (polish.ok() && chunk3.ok()) {
      const [p,c] = await Promise.all([polish.text(),chunk3.text()]);
      if (p.includes('visual-uat-v4-chunk3.css') && c.includes('V4 HANDS-ON UAT — Chunk 3')) return;
    }
    await sleep(8_000);
  }
  throw new Error('GitHub Pages did not expose V4 Chunk 3 thumbnail assets before timeout');
}

function cleanContent(value) {
  return String(value || '').replace(/^['"]|['"]$/g,'').replace(/\\a\s?/gi,' ').replace(/\s+/g,' ').trim();
}

async function verifyViewport(page, browserName, vp) {
  await page.setViewportSize({width:vp.width,height:vp.height});
  const sep = BASE.includes('?') ? '&' : '?';
  await page.goto(`${BASE}${sep}v4thumb=${Date.now()}`, {waitUntil:'domcontentloaded',timeout:60_000});
  await page.waitForFunction(() => document.querySelectorAll('.menu-card').length === 45, null, {timeout:60_000});
  const scope = `${browserName}/${vp.name}/${LIVE?'live':'local'}`;

  const inventory = await page.locator('.menu-card').evaluateAll(cards => cards.map(card => {
    const before = getComputedStyle(card,'::before');
    const title = card.querySelector('.menu-card-title');
    return {
      menu:card.getAttribute('data-menu'),
      cue:before.content,
      width:Number.parseFloat(before.width),
      height:Number.parseFloat(before.height),
      cardWidth:card.clientWidth,
      cardScrollWidth:card.scrollWidth,
      titleWidth:title?.getBoundingClientRect().width || 0,
    };
  }));

  assert.equal(inventory.length,45,`${scope}: menu inventory drifted`);
  const byMenu = new Map(inventory.map(x => [x.menu,x]));
  for (const item of inventory) {
    assert.ok(item.cardScrollWidth <= item.cardWidth + 1, `${scope}: horizontal card overflow for ${item.menu}: ${item.cardScrollWidth} > ${item.cardWidth}`);
    assert.ok(cleanContent(item.cue).length >= 2, `${scope}: semantic cue missing for ${item.menu}: ${item.cue}`);
  }

  for (const [menu,needle] of representativeCues) {
    const item = byMenu.get(menu);
    assert.ok(item,`${scope}: representative menu missing: ${menu}`);
    assert.ok(cleanContent(item.cue).includes(needle),`${scope}: cue for ${menu} is not specific enough: ${cleanContent(item.cue)}`);
  }

  for (const group of distinctGroups) {
    const cues = group.map(name => cleanContent(byMenu.get(name)?.cue));
    assert.equal(new Set(cues).size,group.length,`${scope}: similar menus still share generic cue: ${JSON.stringify(group.map((n,i)=>[n,cues[i]]))}`);
  }

  const signature = new Set(['ชุดจุ่มหมูทะเล','ชุดจุ่มเนื้อ','ชุดจุ่มหมู','ชุดจุ่มเดี่ยวหมู']);
  for (const item of inventory) {
    const maxW = signature.has(item.menu) ? vp.sigW : vp.maxW;
    const maxH = signature.has(item.menu) ? vp.sigH : vp.maxH;
    assert.ok(item.width <= maxW,`${scope}: thumbnail too wide for ${item.menu}: ${item.width}px > ${maxW}px`);
    assert.ok(item.height <= maxH,`${scope}: thumbnail too tall for ${item.menu}: ${item.height}px > ${maxH}px`);
  }

  const pageOverflow = await page.evaluate(() => ({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
  assert.ok(pageOverflow.scroll <= pageOverflow.client + 1,`${scope}: page horizontal overflow ${pageOverflow.scroll} > ${pageOverflow.client}`);

  if (browserName === 'chromium') {
    const focus = page.locator(`.menu-card[data-menu="${vp.focus}"]`);
    assert.equal(await focus.count(),1,`${scope}: screenshot focus menu missing: ${vp.focus}`);
    await focus.scrollIntoViewIfNeeded();
    await page.waitForTimeout(80);
    const prefix = LIVE ? 'live-' : '';
    await page.screenshot({path:path.join(shotDir,`${prefix}33-thumbnail-v4-${vp.name}.png`),fullPage:false});
  }

  console.log(`PASS ${scope} cues=${new Set(inventory.map(x=>cleanContent(x.cue))).size}/45`);
}

for (const [browserName,browserType] of [['chromium',chromium],['webkit',webkit]]) {
  const browser = await browserType.launch();
  try {
    const context = await browser.newContext({deviceScaleFactor:2});
    const page = await context.newPage();
    await waitForDeployment(page);
    for (const vp of viewports) await verifyViewport(page,browserName,vp);
    await context.close();
  } finally {
    await browser.close();
  }
}

console.log(`V4 THUMBNAIL SEMANTIC + DENSITY ${LIVE?'LIVE':'LOCAL'} PASS`);

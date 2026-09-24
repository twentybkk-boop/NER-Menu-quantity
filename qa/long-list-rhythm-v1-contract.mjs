import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium, webkit } from 'playwright';

const BASE = process.env.LONG_LIST_BASE || 'http://127.0.0.1:8000/index.html';
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
      const polish = await page.request.get(`${root}assets/visual-polish.css?longv1=${Date.now()}`, {
        headers: { 'cache-control': 'no-cache' },
      });
      const layer = await page.request.get(`${root}assets/visual-long-list-rhythm-v1.css?longv1=${Date.now()}`, {
        headers: { 'cache-control': 'no-cache' },
      });
      if (polish.ok() && layer.ok()) {
        const polishText = await polish.text();
        const layerText = await layer.text();
        last = `${polishText.slice(-240)}\n${layerText.slice(0, 240)}`;
        if (
          polishText.includes('visual-long-list-rhythm-v1.css') &&
          layerText.includes('P0-D LONG-LIST RHYTHM V1')
        ) return;
      }
    } catch (error) {
      last = String(error);
    }
    await sleep(8_000);
  }
  throw new Error(`GitHub Pages did not expose P0-D long-list rhythm V1 before timeout. Last probe: ${last.slice(0, 420)}`);
}

async function readContract(page) {
  return page.evaluate(() => {
    const first = document.querySelector('.category-block:has(.menu-card[data-menu="ชุดจุ่มหมูทะเล"])');
    const later = [...document.querySelectorAll('.category-block')].filter(block => block !== first);
    const menusRect = document.querySelector('#app-menus').getBoundingClientRect();
    const decorB = document.querySelector('.decor-b');
    const decorC = document.querySelector('.decor-c');

    const sections = later.map(block => {
      const rect = block.getBoundingClientRect();
      const style = getComputedStyle(block);
      const before = getComputedStyle(block, '::before');
      const titleEl = block.querySelector('.category-title');
      const titleStyle = getComputedStyle(titleEl);
      const gridStyle = getComputedStyle(block.querySelector('.menu-grid'));
      const cards = [...block.querySelectorAll('.menu-card')];
      const firstCard = cards[0];
      const cardRect = firstCard.getBoundingClientRect();
      const cardStyle = getComputedStyle(firstCard);
      return {
        top: rect.top,
        bottom: rect.bottom,
        marginBottom: parseFloat(style.marginBottom),
        radius: parseFloat(style.borderTopLeftRadius),
        bg: style.backgroundImage,
        beforeBg: before.backgroundImage,
        titleBg: titleStyle.backgroundColor,
        titleRadius: parseFloat(titleStyle.borderTopLeftRadius),
        rowGap: parseFloat(gridStyle.rowGap),
        cardCount: cards.length,
        firstMenu: firstCard.dataset.menu,
        firstCard: {
          left: cardRect.left,
          right: cardRect.right,
          height: cardRect.height,
          bg: cardStyle.backgroundImage,
          shadow: cardStyle.boxShadow,
        },
      };
    });

    const firstStyle = getComputedStyle(first);
    const firstCardStyle = getComputedStyle(first.querySelector('.menu-card'));
    return {
      viewport: { width: innerWidth, height: innerHeight },
      menuCount: document.querySelectorAll('.menu-card').length,
      menus: { left: menusRect.left, right: menusRect.right, width: menusRect.width },
      sectionCount: document.querySelectorAll('.category-block').length,
      first: {
        bg: firstStyle.backgroundImage,
        cardBg: firstCardStyle.backgroundImage,
      },
      sections,
      decor: {
        b: { bg: getComputedStyle(decorB).backgroundImage, pointer: getComputedStyle(decorB).pointerEvents },
        c: { bg: getComputedStyle(decorC).backgroundImage, pointer: getComputedStyle(decorC).pointerEvents },
      },
    };
  });
}

function assertContract(c, browserName) {
  const scope = `${browserName}/${LIVE ? 'live' : 'local'}`;
  assert.equal(c.menuCount, 45, `${scope}: menu count changed`);
  assert.equal(c.sectionCount, 7, `${scope}: category count changed`);
  assert.equal(c.sections.length, 6, `${scope}: expected six later category chapters`);
  assert.ok(c.menus.width >= 285 && c.menus.width <= 302, `${scope}: protected center frame drifted to ${c.menus.width}px`);
  assert.match(c.first.bg, /radial-gradient/, `${scope}: verified first-screen category treatment regressed`);
  assert.match(c.first.cardBg, /linear-gradient/, `${scope}: verified first-screen signature card treatment regressed`);

  const expectedFirstMenus = [
    'หมูล้วน (ไม่มีเครื่องใน)', 'ชุดผักรวม', 'วุ้นเส้น', 'ไข่ไก่สด', 'ไก่ป๊อป', 'ซาโมซ่ากล้วย'
  ];
  assert.deepEqual(c.sections.map(s => s.firstMenu), expectedFirstMenus, `${scope}: category ordering/identity changed`);

  for (const section of c.sections) {
    assert.match(section.bg, /radial-gradient/, `${scope}/${section.firstMenu}: environmental glow missing`);
    assert.match(section.bg, /linear-gradient/, `${scope}/${section.firstMenu}: editorial paper wash missing`);
    assert.match(section.beforeBg, /linear-gradient/, `${scope}/${section.firstMenu}: category rest separator missing`);
    assert.ok(section.radius >= 18, `${scope}/${section.firstMenu}: chapter radius collapsed`);
    assert.ok(section.marginBottom >= 26, `${scope}/${section.firstMenu}: insufficient category rest interval (${section.marginBottom}px)`);
    assert.notEqual(section.titleBg, 'rgba(0, 0, 0, 0)', `${scope}/${section.firstMenu}: title editorial plate missing`);
    assert.ok(section.titleRadius >= 10, `${scope}/${section.firstMenu}: title plate lost soft treatment`);
    assert.ok(section.rowGap >= 5 && section.rowGap <= 7, `${scope}/${section.firstMenu}: repeated-row rhythm drifted (${section.rowGap}px)`);
    assert.ok(section.firstCard.left >= c.menus.left - 1 && section.firstCard.right <= c.menus.right + 1,
      `${scope}/${section.firstMenu}: row escaped protected center frame`);
    assert.match(section.firstCard.bg, /linear-gradient/, `${scope}/${section.firstMenu}: calm category accent stripe missing`);
    assert.ok(section.firstCard.height >= 58 && section.firstCard.height <= 78,
      `${scope}/${section.firstMenu}: row height became visually heavy (${section.firstCard.height}px)`);
  }

  assert.match(c.decor.b.bg, /overlay-bottom-left\.webp/, `${scope}: approved lower-left character source changed`);
  assert.match(c.decor.c.bg, /overlay-right\.webp/, `${scope}: approved right character source changed`);
  assert.equal(c.decor.b.pointer, 'none', `${scope}: lower-left art intercepts controls`);
  assert.equal(c.decor.c.pointer, 'none', `${scope}: right art intercepts controls`);
}

async function screenshotEvidence(page, browserName) {
  if (browserName !== 'chromium') return;
  const prefix = LIVE ? 'live-' : '';
  const meat = page.locator('.category-block:has(.menu-card[data-menu="หมูล้วน (ไม่มีเครื่องใน)"])');
  const dessert = page.locator('.category-block:has(.menu-card[data-menu="ซาโมซ่ากล้วย"])');

  await meat.scrollIntoViewIfNeeded();
  await page.evaluate(() => scrollBy(0, -72));
  await page.waitForTimeout(120);
  await page.screenshot({ path: path.join(shotDir, `${LIVE ? '27' : '25'}-${prefix}long-list-mid-v1@3x.png`), fullPage: false });

  await dessert.scrollIntoViewIfNeeded();
  await page.evaluate(() => scrollBy(0, -82));
  await page.waitForTimeout(120);
  await page.screenshot({ path: path.join(shotDir, `${LIVE ? '28' : '26'}-${prefix}long-list-lower-v1@3x.png`), fullPage: false });
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
    await page.goto(`${BASE}${sep}longv1=${Date.now()}`, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    await page.waitForFunction(() => document.querySelectorAll('.menu-card').length === 45, null, { timeout: 60_000 });
    const contract = await readContract(page);
    assertContract(contract, browserName);
    await screenshotEvidence(page, browserName);
    await context.close();
    console.log(`PASS ${browserName} P0-D long-list rhythm V1 ${LIVE ? 'live' : 'local'}`);
  } finally {
    await browser.close();
  }
}

await inspect(chromium, 'chromium');
await inspect(webkit, 'webkit');
console.log(`P0-D LONG-LIST RHYTHM V1 ${LIVE ? 'LIVE' : 'LOCAL'} PASS`);

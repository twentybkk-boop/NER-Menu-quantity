// V4 UAT Chunk 2 — real phone-landscape calculator interaction contract.
// Reproduces UAT-004 / UAT-005 / UAT-010 with actual controls, scroll geometry and rotation.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium, webkit } from 'playwright';

const BASE = process.env.LANDSCAPE_BASE || 'http://127.0.0.1:8000/index.html';
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
    const polish = await page.request.get(`${root}assets/visual-polish.css?v4land=${Date.now()}`, { headers:{'cache-control':'no-cache'} });
    const chunk2 = await page.request.get(`${root}assets/visual-uat-v4-chunk2.css?v4land=${Date.now()}`, { headers:{'cache-control':'no-cache'} });
    if (polish.ok() && chunk2.ok()) {
      const [p,c] = await Promise.all([polish.text(), chunk2.text()]);
      if (p.includes('visual-uat-v4-chunk2.css') && c.includes('V4 HANDS-ON UAT — Chunk 2')) return;
    }
    await sleep(8_000);
  }
  throw new Error('GitHub Pages did not expose V4 Chunk 2 landscape assets before timeout');
}

async function geometry(page, scope) {
  const g = await page.evaluate(() => {
    const modal = document.querySelector('#calculatorModal');
    const card = modal.querySelector('.modal-card');
    const body = modal.querySelector('.calculator-body');
    const left = modal.querySelector('#leftPanel');
    const right = modal.querySelector('#rightPanel');
    const bg = getComputedStyle(document.body, '::before');
    const decorLayer = document.querySelector('#decor-layer');
    const rect = el => {
      const r = el.getBoundingClientRect();
      return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height};
    };
    const decor = [...document.querySelectorAll('.decor-person')].map(el => ({
      cls:el.className,
      ...rect(el),
      pointer:getComputedStyle(el).pointerEvents,
    }));
    const bodyStyle = getComputedStyle(body);
    return {
      viewport:{width:innerWidth,height:innerHeight},
      modal:rect(modal),
      card:rect(card),
      body:rect(body),
      left:rect(left),
      right:rect(right),
      bodyDisplay:bodyStyle.display,
      bodyColumns:bodyStyle.gridTemplateColumns,
      bodyOverflowX:bodyStyle.overflowX,
      leftOverflowY:getComputedStyle(left).overflowY,
      rightOverflowY:getComputedStyle(right).overflowY,
      modalScrollWidth:modal.scrollWidth,
      modalClientWidth:modal.clientWidth,
      decorZ:Number.parseInt(getComputedStyle(decorLayer).zIndex,10) || 0,
      modalZ:Number.parseInt(getComputedStyle(modal).zIndex,10) || 0,
      decor,
      backgroundPointer:bg.pointerEvents,
    };
  });

  assert.equal(g.viewport.width, 844, `${scope}: landscape width drifted`);
  assert.equal(g.viewport.height, 390, `${scope}: landscape height drifted`);
  assert.ok(g.card.height >= 300, `${scope}: calculator card compressed to ${g.card.height}px`);
  assert.ok(g.card.top >= -1 && g.card.bottom <= g.viewport.height + 1, `${scope}: calculator card escapes viewport ${JSON.stringify(g.card)}`);
  assert.ok(g.body.height >= 235, `${scope}: calculator body too short for interaction (${g.body.height}px)`);
  assert.equal(g.bodyDisplay, 'grid', `${scope}: landscape calculator must be two-panel grid, got ${g.bodyDisplay}`);
  assert.equal(g.bodyColumns.split(' ').length, 2, `${scope}: expected two visible calculator columns, got ${g.bodyColumns}`);
  assert.ok(g.left.width >= 230 && g.right.width >= 260, `${scope}: panels too narrow ${g.left.width}/${g.right.width}`);
  assert.equal(g.bodyOverflowX, 'hidden', `${scope}: calculator body leaks horizontally`);
  assert.equal(g.leftOverflowY, 'auto', `${scope}: exclusion panel is not independently scrollable`);
  assert.equal(g.rightOverflowY, 'auto', `${scope}: quantity panel is not independently scrollable`);
  assert.ok(g.modalScrollWidth <= g.modalClientWidth + 1, `${scope}: modal horizontal overflow ${g.modalScrollWidth} > ${g.modalClientWidth}`);
  assert.equal(g.backgroundPointer, 'none', `${scope}: background intercepts controls`);
  assert.equal(g.decor.length, 3, `${scope}: expected all three character decorations`);
  g.decor.forEach((d,i) => assert.equal(d.pointer, 'none', `${scope}: decor ${i+1} intercepts controls`));

  // UAT-010: foreground art may remain visible, but it must live in side rails
  // rather than overlap the interactive calculator card.
  const leftDecor = g.decor.filter(d => d.cls.includes('decor-a') || d.cls.includes('decor-b'));
  const rightDecor = g.decor.find(d => d.cls.includes('decor-c'));
  const maxOverlap = 6;
  for (const d of leftDecor) {
    const overlap = Math.max(0, d.right - g.card.left);
    assert.ok(overlap <= maxOverlap, `${scope}: left decor crowds calculator by ${overlap}px`);
  }
  assert.ok(rightDecor, `${scope}: missing right decor`);
  const rightOverlap = Math.max(0, g.card.right - rightDecor.left);
  assert.ok(rightOverlap <= maxOverlap, `${scope}: right decor crowds calculator by ${rightOverlap}px`);
  return g;
}

async function chooseCandidate(page) {
  return page.evaluate(() => {
    const candidates = replaceUseRules
      .filter(r => originalMenu[r.menu] && r.exclude && r.replace && Object.entries(r.replace).some(([name,qty]) => name !== r.exclude && Number(qty) > 0 && Object.prototype.hasOwnProperty.call(originalMenu[r.menu], name)))
      .map(r => ({
        menu:r.menu,
        exclude:r.exclude,
        replacement:Object.entries(r.replace).find(([name,qty]) => name !== r.exclude && Number(qty) > 0 && Object.prototype.hasOwnProperty.call(originalMenu[r.menu], name))?.[0],
        ingredientCount:Object.keys(originalMenu[r.menu] || {}).length,
      }))
      .filter(x => x.replacement)
      .sort((a,b) => b.ingredientCount - a.ingredientCount);
    if (!candidates.length) throw new Error('no menu has a selectable replacement candidate');
    return candidates[0];
  });
}

async function openCandidate(page, candidate) {
  const card = page.locator(`.menu-card[data-menu="${candidate.menu}"]`);
  await card.scrollIntoViewIfNeeded();
  await card.click();
  await page.waitForSelector('#calculatorModal:not(.is-hidden)');
}

async function tapFlow(page, scope, candidate) {
  const exclude = page.locator('#excludeOptions .exclude-btn').filter({hasText:candidate.exclude}).first();
  assert.equal(await exclude.count(), 1, `${scope}: target exclusion button missing: ${candidate.exclude}`);

  const hit = await exclude.evaluate(el => {
    const r = el.getBoundingClientRect();
    const x = r.left + r.width/2;
    const y = r.top + r.height/2;
    const top = document.elementFromPoint(x,y);
    return {ok:top === el || el.contains(top), tag:top?.tagName, cls:top?.className};
  });
  assert.ok(hit.ok, `${scope}: exclusion tap target is covered by ${hit.tag}.${hit.cls}`);

  const beforeResult = await page.locator('#netResultList').innerText();
  await exclude.click();
  assert.ok(await exclude.evaluate(el => el.classList.contains('is-excluded')), `${scope}: exclusion click did not change state`);
  const afterExcludeResult = await page.locator('#netResultList').innerText();
  assert.notEqual(afterExcludeResult, beforeResult, `${scope}: net quantity did not react to exclusion`);

  const trigger = page.locator('.replacement-trigger').filter({hasText:candidate.replacement}).first();
  assert.equal(await trigger.count(), 1, `${scope}: replacement trigger missing for ${candidate.replacement}`);
  const option = page.locator('.replacement-option.selectable').filter({hasText:candidate.replacement}).first();
  // toggleExclude intentionally opens the replacement picker. Do not click the
  // trigger again when it is already expanded, because that would close the
  // very menu this interaction gate is trying to exercise.
  if (await option.count() === 0 && (await trigger.getAttribute('aria-expanded')) !== 'true') {
    await trigger.click();
  }
  assert.equal(await option.count(), 1, `${scope}: selectable replacement option missing: ${candidate.replacement}`);
  await option.click();
  assert.match(await page.locator('.replacement-trigger').first().innerText(), new RegExp(candidate.replacement), `${scope}: selected replacement is not reflected in trigger`);

  const quantities = page.locator('#netResultList .net-card');
  assert.ok(await quantities.count() > 0, `${scope}: net quantity list is empty`);
  const quantityHit = await quantities.first().evaluate(el => {
    const r = el.getBoundingClientRect();
    const x = r.left + r.width/2;
    const y = Math.max(r.top + 2, Math.min(r.bottom - 2, innerHeight - 2));
    const top = document.elementFromPoint(x,y);
    return {ok:top === el || el.contains(top), tag:top?.tagName, cls:top?.className};
  });
  assert.ok(quantityHit.ok, `${scope}: quantity region is covered by ${quantityHit.tag}.${quantityHit.cls}`);
}

async function realScroll(page, selector, scope) {
  const loc = page.locator(selector);
  const before = await loc.evaluate(el => ({top:el.scrollTop,max:el.scrollHeight-el.clientHeight}));
  if (before.max <= 2) return {scrollable:false,max:before.max};
  const box = await loc.boundingBox();
  assert.ok(box, `${scope}: ${selector} has no visible box`);
  await page.mouse.move(box.x + box.width/2, box.y + Math.min(box.height/2, box.height - 4));
  await page.mouse.wheel(0, Math.min(420, before.max));
  await page.waitForTimeout(80);
  const after = await loc.evaluate(el => ({top:el.scrollTop,max:el.scrollHeight-el.clientHeight}));
  assert.ok(after.top > before.top, `${scope}: real wheel scroll did not move ${selector} (${before.top} -> ${after.top}, max ${after.max})`);
  return {scrollable:true,max:after.max};
}

async function run(browserType, browserName) {
  const browser = await browserType.launch();
  try {
    const context = await browser.newContext({viewport:{width:844,height:390},deviceScaleFactor:2,isMobile:true,hasTouch:true});
    const page = await context.newPage();
    await waitForDeployment(page);
    if (!LIVE) await page.route('**/recipe_master.json*', route => route.fulfill({status:200,contentType:'application/json',body:recipeBody}));
    const sep = BASE.includes('?') ? '&' : '?';
    await page.goto(`${BASE}${sep}v4land=${Date.now()}`, {waitUntil:'domcontentloaded',timeout:60_000});
    await page.waitForFunction(() => document.querySelectorAll('.menu-card').length === 45, null, {timeout:60_000});

    const candidate = await chooseCandidate(page);
    await openCandidate(page, candidate);
    const scope = `${browserName}/phone-landscape/${LIVE?'live':'local'}`;
    await geometry(page, scope);
    await tapFlow(page, scope, candidate);
    const leftScroll = await realScroll(page, '#leftPanel', scope);
    const rightScroll = await realScroll(page, '#rightPanel', scope);
    assert.ok(leftScroll.scrollable || rightScroll.scrollable, `${scope}: neither calculator panel can scroll`);

    const prefix = LIVE ? 'live-' : '';
    if (browserName === 'chromium') await page.screenshot({path:path.join(shotDir,`${prefix}32-phone-landscape-calculator-v4.png`),fullPage:false});

    await page.locator('#closeCalculatorButton').click();
    await page.waitForFunction(() => document.querySelector('#calculatorModal')?.classList.contains('is-hidden'));

    // Reopen in portrait, then rotate while the modal is open. This reproduces
    // the user's orientation transition rather than testing only a fresh load.
    await page.setViewportSize({width:390,height:844});
    await openCandidate(page, candidate);
    await page.setViewportSize({width:844,height:390});
    await page.waitForTimeout(120);
    await geometry(page, `${scope}/rotated`);
    const rotatedExclude = page.locator('#excludeOptions .exclude-btn').filter({hasText:candidate.exclude}).first();
    await rotatedExclude.click();
    assert.ok(await rotatedExclude.evaluate(el => el.classList.contains('is-excluded')), `${scope}: exclusion is blocked after portrait→landscape rotation`);
    await page.locator('#closeCalculatorButton').click();
    await context.close();
    console.log(`PASS ${scope} candidate=${JSON.stringify(candidate)}`);
  } finally {
    await browser.close();
  }
}

for (const [name,type] of [['chromium',chromium],['webkit',webkit]]) await run(type,name);
console.log(`V4 LANDSCAPE CALCULATOR ${LIVE?'LIVE':'LOCAL'} PASS`);

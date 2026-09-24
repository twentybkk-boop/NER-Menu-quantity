// V4 UAT Chunk 4 — character scale + detail density + final interaction-safety contract.
// Presentation-only gates for UAT-008 / UAT-009 / UAT-010 across four orientations.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { chromium, webkit } from 'playwright';

const BASE = process.env.CHUNK4_BASE || 'http://127.0.0.1:8000/index.html';
const LIVE = /^https:\/\//.test(BASE);
const recipeBody = LIVE ? null : fs.readFileSync('recipe_master.json', 'utf8');
const shotDir = path.resolve('qa-artifacts');
fs.mkdirSync(shotDir, { recursive: true });
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const CASES = [
  {
    key:'phone-portrait', viewport:{width:390,height:844}, dpr:3, mobile:true,
    // P0-B limits the lower-right composition to the 122px shelf. The verified
    // pre-Chunk-4 baseline was 78x121; require a real increase without escaping it.
    normal:[[115,126],[141,104],[81,126]], modal:[null,[114,84],[85,138]], actionMax:94, modalTopLeftSafe:true,
  },
  {
    key:'phone-landscape', viewport:{width:844,height:390}, dpr:2, mobile:true,
    normal:[[119,129],[133,97],[99,154]], modal:[[79,86],[79,74],[79,123]], actionMax:82,
  },
  {
    key:'ipad-portrait', viewport:{width:820,height:1180}, dpr:2, mobile:true,
    normal:[[151,166],[161,118],[125,197]], modal:[null,[159,114],[115,179]], actionMax:105, modalTopLeftSafe:true,
  },
  {
    key:'ipad-landscape', viewport:{width:1180,height:820}, dpr:2, mobile:true,
    normal:[[191,209],[197,145],[159,247]], modal:[null,[173,123],[123,191]], actionMax:105, modalTopLeftSafe:true,
  },
];

const EXPECTED_ASSETS = [
  'overlay-top-left-hires.webp',
  'overlay-bottom-left-hires.webp',
  'overlay-right-hires.webp',
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
    const polish = await page.request.get(`${root}assets/visual-polish.css?chunk4=${Date.now()}`, {headers:{'cache-control':'no-cache'}});
    const chunk4 = await page.request.get(`${root}assets/visual-uat-v4-chunk4.css?chunk4=${Date.now()}`, {headers:{'cache-control':'no-cache'}});
    if (polish.ok() && chunk4.ok()) {
      const [p,c] = await Promise.all([polish.text(), chunk4.text()]);
      if (p.includes('visual-uat-v4-chunk4.css') && c.includes('V4 HANDS-ON UAT — Chunk 4')) return;
    }
    await sleep(8_000);
  }
  throw new Error('GitHub Pages did not expose V4 Chunk 4 assets before timeout');
}

async function readDecor(page) {
  return page.evaluate(() => ['.decor-a','.decor-b','.decor-c'].map(selector => {
    const el = document.querySelector(selector);
    const s = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      selector,
      bg:s.backgroundImage,
      pointer:s.pointerEvents,
      bgSize:s.backgroundSize,
      width:r.width,
      height:r.height,
      left:r.left,
      right:r.right,
      top:r.top,
      bottom:r.bottom,
    };
  }));
}

function assertDecor(items, minimums, scope) {
  assert.equal(items.length, 3, `${scope}: expected all three character compositions`);
  items.forEach((item,i) => {
    assert.match(item.bg, new RegExp(EXPECTED_ASSETS[i].replace('.', '\\.')), `${scope}: ${item.selector} lost approved high-res source`);
    assert.equal(item.pointer, 'none', `${scope}: ${item.selector} intercepts pointer events`);
    assert.equal(item.bgSize, 'contain', `${scope}: ${item.selector} no longer preserves full composition`);
    const minimum = minimums[i];
    if (minimum) {
      assert.ok(item.width >= minimum[0] && item.height >= minimum[1], `${scope}: ${item.selector} did not receive moderate scale increase (${item.width}x${item.height})`);
    }
  });
}

async function assertModalTopLeftSafe(page, scope) {
  const g = await page.evaluate(() => {
    const rect = el => {
      const r = el.getBoundingClientRect();
      return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height};
    };
    return {
      decor:rect(document.querySelector('.decor-a')),
      title:rect(document.querySelector('#calculatorModal .modal-title')),
      subtitle:rect(document.querySelector('#calculatorModal .modal-subtitle')),
      viewport:{left:0,top:0,right:innerWidth,bottom:innerHeight},
    };
  });

  const separated = (a,b,gap=2) => (
    a.right + gap <= b.left ||
    a.left >= b.right + gap ||
    a.bottom + gap <= b.top ||
    a.top >= b.bottom + gap
  );

  assert.ok(g.decor.left >= g.viewport.left && g.decor.top >= g.viewport.top && g.decor.right <= g.viewport.right && g.decor.bottom <= g.viewport.bottom,
    `${scope}: top-left composition is clipped by the viewport ${JSON.stringify(g.decor)}`);
  assert.ok(separated(g.decor,g.title), `${scope}: top-left composition overlaps modal title ${JSON.stringify({decor:g.decor,title:g.title})}`);
  assert.ok(separated(g.decor,g.subtitle), `${scope}: top-left composition overlaps modal subtitle ${JSON.stringify({decor:g.decor,subtitle:g.subtitle})}`);
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
    if (!candidates.length) throw new Error('no replacement-capable menu candidate');
    return candidates[0];
  });
}

async function hitCheck(locator, scope) {
  await locator.scrollIntoViewIfNeeded();
  const hit = await locator.evaluate(el => {
    const r = el.getBoundingClientRect();
    const x = Math.max(1, Math.min(innerWidth - 2, r.left + r.width/2));
    const y = Math.max(1, Math.min(innerHeight - 2, r.top + r.height/2));
    const top = document.elementFromPoint(x,y);
    return {ok:top === el || el.contains(top), tag:top?.tagName, cls:top?.className, x, y};
  });
  assert.ok(hit.ok, `${scope}: tap target covered by ${hit.tag}.${hit.cls} at ${hit.x},${hit.y}`);
}

async function density(page, cfg, scope) {
  const g = await page.evaluate(() => {
    const modal = document.querySelector('#calculatorModal');
    const card = modal.querySelector('.modal-card');
    const header = modal.querySelector('.modal-header');
    const first = modal.querySelector('#excludeOptions .exclude-btn');
    const close = modal.querySelector('#closeCalculatorButton');
    const rect = el => {
      const r = el.getBoundingClientRect();
      return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height};
    };
    return {
      card:rect(card),
      header:rect(header),
      first:rect(first),
      close:rect(close),
      actionOffset:rect(first).top - rect(card).top,
      modalScrollWidth:modal.scrollWidth,
      modalClientWidth:modal.clientWidth,
    };
  });
  assert.ok(g.actionOffset <= cfg.actionMax, `${scope}: first actionable exclusion starts ${g.actionOffset.toFixed(1)}px after card top; max ${cfg.actionMax}`);
  assert.ok(g.first.top >= g.card.top && g.first.top < g.card.bottom, `${scope}: first exclusion not visible inside modal card`);
  assert.ok(g.modalScrollWidth <= g.modalClientWidth + 1, `${scope}: modal horizontal overflow ${g.modalScrollWidth} > ${g.modalClientWidth}`);
  await hitCheck(page.locator('#closeCalculatorButton'), `${scope}/close`);
  await hitCheck(page.locator('#excludeOptions .exclude-btn').first(), `${scope}/first-exclusion`);
  return g;
}

async function interactionSafety(page, candidate, scope) {
  const target = page.locator('#excludeOptions .exclude-btn').filter({hasText:candidate.exclude}).first();
  assert.equal(await target.count(), 1, `${scope}: target exclusion missing (${candidate.exclude})`);
  await hitCheck(target, `${scope}/target-exclusion`);
  await target.click();
  assert.ok(await target.evaluate(el => el.classList.contains('is-excluded')), `${scope}: exclusion click failed`);

  const trigger = page.locator('.replacement-trigger').filter({hasText:candidate.replacement}).first();
  assert.equal(await trigger.count(), 1, `${scope}: replacement trigger missing (${candidate.replacement})`);
  await hitCheck(trigger, `${scope}/replacement-trigger`);

  const visibleControls = await page.evaluate(() => {
    const selectors = ['#closeCalculatorButton','#excludeOptions .exclude-btn','.replacement-trigger'];
    const controls = selectors.flatMap(sel => [...document.querySelectorAll(sel)]);
    const decor = [...document.querySelectorAll('.decor-person')];

    const intersect = (a,b) => ({
      left:Math.max(a.left,b.left),
      right:Math.min(a.right,b.right),
      top:Math.max(a.top,b.top),
      bottom:Math.min(a.bottom,b.bottom),
    });
    const viewport = {left:0,right:innerWidth,top:0,bottom:innerHeight};

    const centerChecks = controls.map(el => {
      const r = el.getBoundingClientRect();
      const center = {x:r.left + r.width/2,y:r.top + r.height/2};
      let clip = {...viewport};
      let ancestor = el.parentElement;
      const clippingAncestors = [];
      while (ancestor) {
        const s = getComputedStyle(ancestor);
        const clipsX = ['hidden','clip','auto','scroll'].includes(s.overflowX);
        const clipsY = ['hidden','clip','auto','scroll'].includes(s.overflowY);
        if (clipsX || clipsY) {
          const ar = ancestor.getBoundingClientRect();
          clip = intersect(clip, {
            left:clipsX ? ar.left : clip.left,
            right:clipsX ? ar.right : clip.right,
            top:clipsY ? ar.top : clip.top,
            bottom:clipsY ? ar.bottom : clip.bottom,
          });
          clippingAncestors.push({tag:ancestor.tagName,cls:ancestor.className,overflowX:s.overflowX,overflowY:s.overflowY});
        }
        ancestor = ancestor.parentElement;
      }
      // DOMRect right/bottom are exclusive rendering boundaries. Treat the
      // clipping region as half-open so a center exactly on the clipped edge is
      // not misclassified as visible/tappable.
      const centerVisible = center.x >= clip.left && center.x < clip.right && center.y >= clip.top && center.y < clip.bottom;
      if (!centerVisible) {
        return {
          eligible:false,
          ok:true,
          tag:el.tagName,
          cls:el.className,
          rect:{left:r.left,right:r.right,top:r.top,bottom:r.bottom},
          center,
          clip,
          clippingAncestors,
        };
      }
      const x = Math.max(1,Math.min(innerWidth - 2,center.x));
      const y = Math.max(1,Math.min(innerHeight - 2,center.y));
      const top = document.elementFromPoint(x,y);
      return {
        eligible:true,
        ok:top === el || el.contains(top),
        tag:top?.tagName,
        cls:top?.className,
        controlTag:el.tagName,
        controlCls:el.className,
        rect:{left:r.left,right:r.right,top:r.top,bottom:r.bottom},
        center:{x,y},
        clip,
        clippingAncestors,
      };
    });

    return {
      centerChecks,
      eligibleCount:centerChecks.filter(x => x.eligible).length,
      decorPointers:decor.map(el => getComputedStyle(el).pointerEvents),
      decorCount:decor.length,
      backgroundPointer:getComputedStyle(document.body,'::before').pointerEvents,
    };
  });
  assert.equal(visibleControls.decorCount, 3, `${scope}: not all characters present during interaction`);
  assert.ok(visibleControls.decorPointers.every(v => v === 'none'), `${scope}: a character intercepts pointer events`);
  assert.equal(visibleControls.backgroundPointer, 'none', `${scope}: environmental background intercepts input`);
  assert.ok(visibleControls.eligibleCount >= 3, `${scope}: too few visible control centers were available for safety sweep (${visibleControls.eligibleCount})`);
  const blocked = visibleControls.centerChecks.filter(x => x.eligible && !x.ok);
  assert.equal(blocked.length, 0, `${scope}: unclipped visible control center is visually/tap covered ${JSON.stringify(blocked)}`);
}

async function runCase(browserType, browserName, cfg) {
  const browser = await browserType.launch();
  try {
    const context = await browser.newContext({
      viewport:cfg.viewport,
      deviceScaleFactor:cfg.dpr,
      isMobile:cfg.mobile,
      hasTouch:true,
    });
    const page = await context.newPage();
    await waitForDeployment(page);
    if (!LIVE) {
      await page.route('**/recipe_master.json*', route => route.fulfill({status:200,contentType:'application/json',body:recipeBody}));
    }
    const sep = BASE.includes('?') ? '&' : '?';
    await page.goto(`${BASE}${sep}chunk4=${Date.now()}`, {waitUntil:'domcontentloaded',timeout:60_000});
    await page.waitForFunction(() => document.querySelectorAll('.menu-card').length === 45, null, {timeout:60_000});

    const scope = `${browserName}/${cfg.key}/${LIVE?'live':'local'}`;
    assertDecor(await readDecor(page), cfg.normal, `${scope}/page`);

    const prefix = LIVE ? 'live-' : '';
    if (browserName === 'chromium') {
      await page.screenshot({path:path.join(shotDir,`${prefix}34-chunk4-${cfg.key}-page.png`),fullPage:false});
    }

    const candidate = await chooseCandidate(page);
    const card = page.locator(`.menu-card[data-menu="${candidate.menu}"]`);
    await card.scrollIntoViewIfNeeded();
    await card.click();
    await page.waitForSelector('#calculatorModal:not(.is-hidden)');

    assertDecor(await readDecor(page), cfg.modal, `${scope}/modal`);
    if (cfg.modalTopLeftSafe) await assertModalTopLeftSafe(page, `${scope}/modal-safe-zone`);
    await density(page, cfg, `${scope}/density`);

    if (browserName === 'chromium') {
      await page.screenshot({path:path.join(shotDir,`${prefix}34-chunk4-${cfg.key}-modal.png`),fullPage:false});
    }

    await interactionSafety(page, candidate, `${scope}/safety`);
    await context.close();
    console.log(`PASS ${scope} candidate=${JSON.stringify(candidate)}`);
  } finally {
    await browser.close();
  }
}

for (const [browserName,browserType] of [['chromium',chromium],['webkit',webkit]]) {
  for (const cfg of CASES) await runCase(browserType,browserName,cfg);
}
console.log(`V4 CHUNK 4 POLISH ${LIVE?'LIVE':'LOCAL'} PASS`);

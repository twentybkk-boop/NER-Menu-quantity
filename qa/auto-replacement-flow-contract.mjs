import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium, webkit } from 'playwright';

const BASE = process.env.AUTO_REPLACE_BASE || 'http://127.0.0.1:8000/index.html';
const LIVE = /^https:\/\//.test(BASE);
const recipeBody = LIVE ? null : fs.readFileSync('recipe_master.json', 'utf8');

async function waitForApp(page) {
  if (!LIVE) {
    await page.route('**/recipe_master.json*', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: recipeBody,
    }));
  }
  const sep = BASE.includes('?') ? '&' : '?';
  await page.goto(`${BASE}${sep}autoReplace=${Date.now()}`, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await page.waitForFunction(() => document.querySelectorAll('.menu-card').length > 0, null, { timeout: 60_000 });
}

async function installSyntheticSet(page) {
  return page.evaluate(() => {
    const menu = '__AUTO_REPLACEMENT_TEST__';
    const meats = ['หมูหมัก', 'หมูสามชั้น', 'หมูนุ่ม', 'หมูเด้ง', 'ตับหมู'];
    const vegs = ['กะหล่ำปลี', 'ผักบุ้ง'];
    const outside = 'ของนอกชุด';
    const inSet = [...meats, ...vegs];

    if (meats.some(name => veggieGroups.includes(name))) throw new Error('synthetic meat fixture drifted into veggieGroups');
    if (vegs.some(name => !veggieGroups.includes(name))) throw new Error('synthetic veg fixture missing from veggieGroups');

    originalMenu = {
      [menu]: Object.fromEntries(inSet.map((name, index) => [name, 100 + index])),
    };
    replaceUseRules = inSet.map(exclude => ({
      menu,
      exclude,
      replace: Object.fromEntries(
        [...inSet.filter(name => name !== exclude), outside]
          .map((name, index) => [name, 10 + index])
      ),
    }));
    currentActiveMenu = null;
    excludedItemsMap = {};
    openReplacementPicker = null;
    openCalculator(menu);
    return { menu, meats, vegs, outside };
  });
}

function exclusionButton(page, item) {
  return page.locator('#excludeOptions .exclude-btn').filter({ hasText: item }).first();
}

function replacementTriggerFor(page, item) {
  return exclusionButton(page, item).locator('..').locator('.replacement-trigger');
}

async function assertPickerClosed(page, scope) {
  assert.equal(await page.locator('.replacement-menu').count(), 0, `${scope}: exclusion must not auto-open replacement dropdown`);
}

async function readReplacementState(page) {
  return page.evaluate(() => ({
    excluded: { ...excludedItemsMap },
    open: openReplacementPicker,
  }));
}

async function run(browserType, browserName) {
  const browser = await browserType.launch();
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const page = await context.newPage();
    await waitForApp(page);
    const fixture = await installSyntheticSet(page);
    const scope = `${browserName}/${LIVE ? 'live' : 'local'}`;

    // One exclusion must auto-assign silently, without interrupting the operator.
    await exclusionButton(page, fixture.meats[0]).click();
    await assertPickerClosed(page, `${scope}/first-exclusion`);
    let state = await readReplacementState(page);
    assert.equal(state.open, null, `${scope}: openReplacementPicker must remain null after auto assignment`);
    assert.ok(fixture.meats.slice(1).includes(state.excluded[fixture.meats[0]]), `${scope}: first auto replacement must stay in meat category while meat remains`);
    assert.notEqual(state.excluded[fixture.meats[0]], fixture.outside, `${scope}: auto replacement escaped the current set`);

    // Manual picker still exists, but opens only on an explicit trigger tap.
    const firstTrigger = replacementTriggerFor(page, fixture.meats[0]);
    assert.equal(await firstTrigger.getAttribute('aria-expanded'), 'false', `${scope}: replacement trigger unexpectedly expanded`);
    await firstTrigger.click();
    assert.ok(await page.locator('.replacement-menu').count() > 0, `${scope}: manual replacement picker no longer opens explicitly`);
    await firstTrigger.click();
    await assertPickerClosed(page, `${scope}/manual-close`);

    // Reset and reproduce the real kitchen flow: reject 4 of 5 meats in sequence.
    await page.evaluate(menu => openCalculator(menu), fixture.menu);
    for (const meat of fixture.meats.slice(0, 4)) {
      await exclusionButton(page, meat).click();
      await assertPickerClosed(page, `${scope}/multi-exclude/${meat}`);
    }
    state = await readReplacementState(page);
    const survivor = fixture.meats[4];
    for (const excluded of fixture.meats.slice(0, 4)) {
      assert.equal(state.excluded[excluded], survivor, `${scope}: ${excluded} must converge to the only remaining same-category item ${survivor}`);
    }
    assert.ok(!Object.values(state.excluded).includes(fixture.outside), `${scope}: auto replacement selected an out-of-set item`);
    assert.ok(!Object.values(state.excluded).some(name => fixture.vegs.includes(name)), `${scope}: auto replacement crossed category before meat category was exhausted`);

    // Once every meat in the set is rejected, cross-category fallback becomes legal.
    await exclusionButton(page, survivor).click();
    await assertPickerClosed(page, `${scope}/category-exhausted`);
    state = await readReplacementState(page);
    for (const meat of fixture.meats) {
      assert.ok(fixture.vegs.includes(state.excluded[meat]), `${scope}: ${meat} must cross category only after all meats are excluded; got ${state.excluded[meat]}`);
    }
    assert.ok(!Object.values(state.excluded).includes(fixture.outside), `${scope}: category exhaustion must still never leave the current set`);

    // If a same-category item becomes available again, automatic mappings must return to that category.
    await exclusionButton(page, survivor).click();
    await assertPickerClosed(page, `${scope}/same-category-restored`);
    state = await readReplacementState(page);
    for (const excluded of fixture.meats.slice(0, 4)) {
      assert.equal(state.excluded[excluded], survivor, `${scope}: auto mapping did not return to same category after ${survivor} became available again`);
    }

    await context.close();
    console.log(`PASS ${scope}`);
  } finally {
    await browser.close();
  }
}

for (const [name, type] of [['chromium', chromium], ['webkit', webkit]]) {
  await run(type, name);
}
console.log(`AUTO REPLACEMENT FLOW ${LIVE ? 'LIVE' : 'LOCAL'} PASS`);

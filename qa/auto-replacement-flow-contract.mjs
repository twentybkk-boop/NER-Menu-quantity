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
    assert.equal(state.excluded[fixture.meats[0]], fixture.meats[1], `${scope}: first auto replacement must choose the first still-eligible same-category meat in menu order`);
    assert.notEqual(state.excluded[fixture.meats[0]], fixture.outside, `${scope}: auto replacement escaped the current set`);

    // Manual picker still exists, but opens only on an explicit trigger tap.
    const firstTrigger = replacementTriggerFor(page, fixture.meats[0]);
    assert.equal(await firstTrigger.getAttribute('aria-expanded'), 'false', `${scope}: replacement trigger unexpectedly expanded`);
    await firstTrigger.click();
    assert.ok(await page.locator('.replacement-menu').count() > 0, `${scope}: manual replacement picker no longer opens explicitly`);
    await firstTrigger.click();
    await assertPickerClosed(page, `${scope}/manual-close`);

    // First-eligible policy: position of the excluded item does not bias selection.
    // A middle exclusion must choose the first still-included same-category item in menu order.
    await page.evaluate(menu => {
      currentActiveMenu = null;
      excludedItemsMap = {};
      openReplacementPicker = null;
      manualReplacementOverrides = new Set();
      openCalculator(menu);
    }, fixture.menu);
    await exclusionButton(page, fixture.meats[2]).click();
    await assertPickerClosed(page, `${scope}/first-eligible-middle`);
    state = await readReplacementState(page);
    assert.equal(state.excluded[fixture.meats[2]], fixture.meats[0], `${scope}: middle exclusion must choose the first still-eligible same-category meat`);

    // Once that first candidate is also excluded, automatic mappings must advance to
    // the next earliest same-category candidate that is still included.
    await exclusionButton(page, fixture.meats[0]).click();
    await assertPickerClosed(page, `${scope}/first-eligible-after-first-excluded`);
    state = await readReplacementState(page);
    assert.equal(state.excluded[fixture.meats[2]], fixture.meats[1], `${scope}: mapping must advance to the earliest same-category meat that is still included`);
    assert.equal(state.excluded[fixture.meats[0]], fixture.meats[1], `${scope}: newly excluded first meat must map to the earliest remaining same-category meat`);

    await page.evaluate(menu => {
      currentActiveMenu = null;
      excludedItemsMap = {};
      openReplacementPicker = null;
      manualReplacementOverrides = new Set();
      openCalculator(menu);
    }, fixture.menu);
    await exclusionButton(page, fixture.meats[4]).click();
    await assertPickerClosed(page, `${scope}/first-eligible-last`);
    state = await readReplacementState(page);
    assert.equal(state.excluded[fixture.meats[4]], fixture.meats[0], `${scope}: last meat exclusion must still choose the first eligible same-category meat`);

    // Reset and reproduce the real kitchen flow: reject 4 of 5 meats in sequence.
    await page.evaluate(menu => {
      currentActiveMenu = null;
      excludedItemsMap = {};
      openReplacementPicker = null;
      manualReplacementOverrides = new Set();
      openCalculator(menu);
    }, fixture.menu);
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

    // Quantity aggregation: when four exclusions converge to the only surviving meat,
    // every replacement quantity must be added exactly once to the survivor's base quantity.
    const quantityCheck = await page.evaluate(({ menu, survivor, excluded }) => {
      const expectedRaw = (Number(originalMenu[menu]?.[survivor]) || 0) + excluded.reduce((sum, ex) => {
        const rule = replaceUseRules.find(r => String(r.menu).trim() === String(menu).trim() && String(r.exclude).trim() === String(ex).trim());
        return sum + (Number(rule?.replace?.[survivor]) || 0);
      }, 0);
      const actual = calculateNetRecipe(menu).find(row => row.name === survivor)?.qty ?? null;
      return { expected: Math.round(expectedRaw), actual };
    }, { menu: fixture.menu, survivor, excluded: fixture.meats.slice(0, 4) });
    assert.equal(quantityCheck.actual, quantityCheck.expected, `${scope}: replacement quantities did not aggregate correctly into the sole survivor`);

    // Closing and reopening the same menu must preserve exclusions, automatic mappings,
    // manual-override bookkeeping, and the resulting quantities without opening the picker.
    const beforeReopen = await page.evaluate(() => ({
      excluded: { ...excludedItemsMap },
      open: openReplacementPicker,
      overrides: [...manualReplacementOverrides].sort(),
      result: calculateNetRecipe(currentActiveMenu).map(({ name, qty, unit }) => ({ name, qty, unit })),
    }));
    await page.evaluate(() => closeCalculator());
    await page.evaluate(menu => openCalculator(menu), fixture.menu);
    await assertPickerClosed(page, `${scope}/reopen`);
    const afterReopen = await page.evaluate(() => ({
      excluded: { ...excludedItemsMap },
      open: openReplacementPicker,
      overrides: [...manualReplacementOverrides].sort(),
      result: calculateNetRecipe(currentActiveMenu).map(({ name, qty, unit }) => ({ name, qty, unit })),
    }));
    assert.deepEqual(afterReopen.excluded, beforeReopen.excluded, `${scope}: exclusion/auto-replacement state changed after close/reopen`);
    assert.deepEqual(afterReopen.overrides, beforeReopen.overrides, `${scope}: manual replacement override bookkeeping changed after close/reopen`);
    assert.deepEqual(afterReopen.result, beforeReopen.result, `${scope}: resulting quantities changed after close/reopen`);
    assert.equal(afterReopen.open, null, `${scope}: replacement picker reopened without explicit user action`);

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

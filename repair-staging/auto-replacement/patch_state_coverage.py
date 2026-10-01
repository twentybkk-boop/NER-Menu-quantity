from pathlib import Path

# Product: reopening the same menu must keep its current exclusion/replacement state,
# while switching to a different menu must retain the historical reset behavior.
index = Path('index.html')
src = index.read_text(encoding='utf-8')
old_open = """    function openCalculator(menuName) {
      if (!originalMenu[menuName]) return;
      currentActiveMenu = menuName;
      excludedItemsMap = {};
      openReplacementPicker = null;
      manualReplacementOverrides = new Set();
      el('calcMenuTitle').textContent = menuName;
"""
new_open = """    function openCalculator(menuName) {
      if (!originalMenu[menuName]) return;
      const preserveSelectionState = currentActiveMenu === menuName;
      currentActiveMenu = menuName;
      if (!preserveSelectionState) {
        excludedItemsMap = {};
        manualReplacementOverrides = new Set();
      }
      openReplacementPicker = null;
      el('calcMenuTitle').textContent = menuName;
"""
if src.count(old_open) != 1:
    raise SystemExit(f'openCalculator exact guard failed: {src.count(old_open)} matches')
src = src.replace(old_open, new_open, 1)
index.write_text(src, encoding='utf-8')

# Contract: same-menu reset used by the synthetic fixture must now be explicit,
# then add quantity aggregation and close/reopen persistence assertions.
qa = Path('qa/auto-replacement-flow-contract.mjs')
q = qa.read_text(encoding='utf-8')
old_reset = "    await page.evaluate(menu => openCalculator(menu), fixture.menu);\n"
new_reset = """    await page.evaluate(menu => {
      currentActiveMenu = null;
      excludedItemsMap = {};
      openReplacementPicker = null;
      manualReplacementOverrides = new Set();
      openCalculator(menu);
    }, fixture.menu);
"""
if q.count(old_reset) != 1:
    raise SystemExit(f'synthetic reset exact guard failed: {q.count(old_reset)} matches')
q = q.replace(old_reset, new_reset, 1)

anchor = """    assert.ok(!Object.values(state.excluded).includes(fixture.outside), `${scope}: auto replacement selected an out-of-set item`);
    assert.ok(!Object.values(state.excluded).some(name => fixture.vegs.includes(name)), `${scope}: auto replacement crossed category before meat category was exhausted`);

    // Once every meat in the set is rejected, cross-category fallback becomes legal.
"""
expanded = """    assert.ok(!Object.values(state.excluded).includes(fixture.outside), `${scope}: auto replacement selected an out-of-set item`);
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
"""
if q.count(anchor) != 1:
    raise SystemExit(f'quantity/reopen insertion guard failed: {q.count(anchor)} matches')
q = q.replace(anchor, expanded, 1)
qa.write_text(q, encoding='utf-8')

# Crash-safe checkpoint: persist this requirement gap and concrete next action.
handoff = Path('CURRENT_HANDOFF.md')
h = handoff.read_text(encoding='utf-8')
if '## QUANTITY / REOPEN STATE COVERAGE — IMPLEMENTED' in h:
    raise SystemExit('handoff coverage checkpoint already present')
checkpoint = """## QUANTITY / REOPEN STATE COVERAGE — IMPLEMENTED
- verified existing `calculateNetRecipe()` already aggregates multiple replacement credits into the same surviving item using the current `replaceUseRules`; no recipe/business ratio change was needed
- verified prior `openCalculator()` reset `excludedItemsMap` + manual override state on every open, so close/reopen of the same menu lost the active exclusion/replacement state
- minimum product correction: preserve state only when reopening the same active menu; switching to a different menu still resets, so state cannot leak across menus
- `qa/auto-replacement-flow-contract.mjs` now verifies:
  - sequential non-blocking exclusions
  - same-category survivor convergence
  - automatic selection never leaves the current set
  - explicit manual picker remains optional
  - replacement quantities aggregate correctly when multiple exclusions converge
  - close/reopen of the same menu preserves exclusion/replacement/result state and does not auto-open the picker

"""
marker = '## EXACT NEXT ACTION\n'
if h.count(marker) != 1:
    raise SystemExit(f'handoff exact-next marker guard failed: {h.count(marker)} matches')
prefix = h.split(marker, 1)[0]
next_action = """## EXACT NEXT ACTION
1. Read the permanent UI QA run for the commit containing this state/coverage correction once.
2. If it fails, inspect only the first failed required step and make the minimum correction in this auto-replacement scope.
3. If it succeeds, confirm the deployed automatic-replacement contract and same-menu reopen persistence.
4. Remove all temporary auto-replacement repair workflows/trigger markers and persist `READY FOR USER REAL-USAGE RE-REVIEW`.
"""
handoff.write_text(prefix + checkpoint + next_action, encoding='utf-8')

from pathlib import Path

INDEX = Path('index.html')
QA = Path('qa/auto-replacement-flow-contract.mjs')
HANDOFF = Path('CURRENT_HANDOFF.md')

index = INDEX.read_text(encoding='utf-8')
qa = QA.read_text(encoding='utf-8')
handoff = HANDOFF.read_text(encoding='utf-8')

old_fn = """    function pickNextEligibleReplacement(menuName, excludedItem, items) {
      if (!items.length) return '';

      const menuOrder = Object.keys(originalMenu[menuName] || {});
      const eligible = new Set(items);
      const excludedIndex = menuOrder.indexOf(excludedItem);

      if (excludedIndex >= 0 && menuOrder.length) {
        for (let offset = 1; offset <= menuOrder.length; offset += 1) {
          const candidate = menuOrder[(excludedIndex + offset) % menuOrder.length];
          if (eligible.has(candidate)) return candidate;
        }
      }
      return items[0] || '';
    }
"""
new_fn = """    function pickFirstEligibleReplacement(menuName, items) {
      if (!items.length) return '';

      const eligible = new Set(items);
      const firstInMenuOrder = Object.keys(originalMenu[menuName] || {}).find(name => eligible.has(name));
      return firstInMenuOrder || items[0] || '';
    }
"""
if index.count(old_fn) != 1:
    raise SystemExit(f'expected exactly one next-order function block, found {index.count(old_fn)}')
index = index.replace(old_fn, new_fn)
old_call = "excludedItemsMap[ex] = pickNextEligibleReplacement(currentActiveMenu, ex, autoPool);"
new_call = "excludedItemsMap[ex] = pickFirstEligibleReplacement(currentActiveMenu, autoPool);"
if index.count(old_call) != 1:
    raise SystemExit(f'expected exactly one next-order call, found {index.count(old_call)}')
index = index.replace(old_call, new_call)
if 'pickNextEligibleReplacement' in index:
    raise SystemExit('stale pickNextEligibleReplacement reference remains')

old_first = "assert.equal(state.excluded[fixture.meats[0]], fixture.meats[1], `${scope}: first auto replacement must choose the next eligible meat in menu order`);"
new_first = "assert.equal(state.excluded[fixture.meats[0]], fixture.meats[1], `${scope}: first auto replacement must choose the first still-eligible same-category meat in menu order`);"
if qa.count(old_first) != 1:
    raise SystemExit('first-exclusion assertion drifted')
qa = qa.replace(old_first, new_first)

old_policy = """    // Next-order policy: excluding a middle item must move forward, not jump back to
    // the first candidate; excluding the last item wraps to the first eligible meat.
    await page.evaluate(menu => {
      currentActiveMenu = null;
      excludedItemsMap = {};
      openReplacementPicker = null;
      manualReplacementOverrides = new Set();
      openCalculator(menu);
    }, fixture.menu);
    await exclusionButton(page, fixture.meats[2]).click();
    await assertPickerClosed(page, `${scope}/next-order-middle`);
    state = await readReplacementState(page);
    assert.equal(state.excluded[fixture.meats[2]], fixture.meats[3], `${scope}: middle exclusion must choose the next eligible meat`);

    await page.evaluate(menu => {
      currentActiveMenu = null;
      excludedItemsMap = {};
      openReplacementPicker = null;
      manualReplacementOverrides = new Set();
      openCalculator(menu);
    }, fixture.menu);
    await exclusionButton(page, fixture.meats[4]).click();
    await assertPickerClosed(page, `${scope}/next-order-wrap`);
    state = await readReplacementState(page);
    assert.equal(state.excluded[fixture.meats[4]], fixture.meats[0], `${scope}: last meat exclusion must wrap to the first eligible meat`);
"""
new_policy = """    // First-eligible policy: position of the excluded item does not bias selection.
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
"""
if qa.count(old_policy) != 1:
    raise SystemExit('next-order regression block drifted')
qa = qa.replace(old_policy, new_policy)
if 'next-order-middle' in qa or 'next-order-wrap' in qa:
    raise SystemExit('stale next-order regression scope remains')

marker = "> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + durable artifacts + latest user review.\n"
active = """

## ACTIVE SUPERSESSION — FIRST-ELIGIBLE SAME-CATEGORY AUTO PICK

Latest user feedback supersedes only the automatic ordering policy from the prior next-order checkpoint:
- `ไม่เอา` remains non-blocking
- same-category/current-menu/non-excluded filtering remains unchanged
- automatic replacement must choose the **first eligible item still included in the same category** according to `Object.keys(originalMenu[menuName])` order
- it does not scan forward from the excluded item and does not use wrap semantics
- manual replacement remains an optional explicit override
- quantity aggregation, reopen persistence, recipe ratios, and `recipe_master.json` remain unchanged

Exact next action for this active supersession:
1. verify first-eligible regression locally
2. run permanent UI QA local/deployed automatic replacement + landscape gates
3. remove temporary first-eligible repair infrastructure
4. run clean-tree UI QA and persist final READY checkpoint
"""
if active.strip() not in handoff:
    if handoff.count(marker) != 1:
        raise SystemExit('handoff source-of-truth marker drifted')
    handoff = handoff.replace(marker, marker + active, 1)

INDEX.write_text(index, encoding='utf-8')
QA.write_text(qa, encoding='utf-8')
HANDOFF.write_text(handoff, encoding='utf-8')
print('patched first-eligible automatic replacement policy')

from pathlib import Path

index_path = Path('index.html')
index = index_path.read_text(encoding='utf-8')
old_picker = """    function pickRandomReplacement(items) {
      if (!items.length) return '';
      return items[Math.floor(Math.random() * items.length)] || '';
    }
"""
new_picker = """    function pickNextEligibleReplacement(menuName, excludedItem, items) {
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
if index.count(old_picker) != 1:
    raise SystemExit(f'pickRandomReplacement guard failed: {index.count(old_picker)} matches')
index = index.replace(old_picker, new_picker, 1)
old_call = "excludedItemsMap[ex] = pickRandomReplacement(autoPool);"
new_call = "excludedItemsMap[ex] = pickNextEligibleReplacement(currentActiveMenu, ex, autoPool);"
if index.count(old_call) != 1:
    raise SystemExit(f'random picker call guard failed: {index.count(old_call)} matches')
index = index.replace(old_call, new_call, 1)
index_path.write_text(index, encoding='utf-8')

qa_path = Path('qa/auto-replacement-flow-contract.mjs')
qa = qa_path.read_text(encoding='utf-8')
rng_block = """    // Product selection is intentionally random in production. Stub Math.random in this
    // synthetic contract so multiple-candidate coverage is deterministic and non-flaky.
    const rngSequence = [0.01, 0.74, 0.38, 0.92, 0.21, 0.57];
    await page.evaluate(sequence => {
      let rngIndex = 0;
      Math.random = () => sequence[(rngIndex++) % sequence.length];
    }, rngSequence);

"""
if qa.count(rng_block) != 1:
    raise SystemExit(f'RNG test block guard failed: {qa.count(rng_block)} matches')
qa = qa.replace(rng_block, '', 1)

old_first_assert = """    assert.ok(fixture.meats.slice(1).includes(state.excluded[fixture.meats[0]]), `${scope}: first auto replacement must stay in meat category while meat remains`);
    assert.notEqual(state.excluded[fixture.meats[0]], fixture.outside, `${scope}: auto replacement escaped the current set`);
"""
new_first_assert = """    assert.equal(state.excluded[fixture.meats[0]], fixture.meats[1], `${scope}: first auto replacement must choose the next eligible meat in menu order`);
    assert.notEqual(state.excluded[fixture.meats[0]], fixture.outside, `${scope}: auto replacement escaped the current set`);
"""
if qa.count(old_first_assert) != 1:
    raise SystemExit(f'first selection assertion guard failed: {qa.count(old_first_assert)} matches')
qa = qa.replace(old_first_assert, new_first_assert, 1)

manual_tail = """    await firstTrigger.click();
    await assertPickerClosed(page, `${scope}/manual-close`);

    // Reset and reproduce the real kitchen flow: reject 4 of 5 meats in sequence.
"""
next_order_tests = """    await firstTrigger.click();
    await assertPickerClosed(page, `${scope}/manual-close`);

    // Next-order policy: excluding a middle item must move forward, not jump back to
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

    // Reset and reproduce the real kitchen flow: reject 4 of 5 meats in sequence.
"""
if qa.count(manual_tail) != 1:
    raise SystemExit(f'manual tail guard failed: {qa.count(manual_tail)} matches')
qa = qa.replace(manual_tail, next_order_tests, 1)
qa_path.write_text(qa, encoding='utf-8')

handoff_path = Path('CURRENT_HANDOFF.md')
handoff = handoff_path.read_text(encoding='utf-8')
old_head = '## CURRENT WORK HEAD — READY FOR USER REAL-USAGE RE-REVIEW'
new_head = '## CURRENT WORK HEAD — NEXT-ORDER AUTO PICK IMPLEMENTED; QA REQUIRED'
if handoff.count(old_head) != 1:
    raise SystemExit(f'handoff head guard failed: {handoff.count(old_head)} matches')
handoff = handoff.replace(old_head, new_head, 1)
old_random_behavior = '- when several eligible candidates remain, production selection remains randomized within the eligible preferred pool'
new_next_behavior = '- when several eligible candidates remain, automatic selection chooses the next eligible item in the current menu order and wraps to the start when needed'
if handoff.count(old_random_behavior) != 1:
    raise SystemExit(f'handoff random behavior guard failed: {handoff.count(old_random_behavior)} matches')
handoff = handoff.replace(old_random_behavior, new_next_behavior, 1)
old_rng_section = """Deterministic RNG test coverage:
- `91a462b48a3cec22ec60b02a6d2e7082f8277d9e` — `Make auto replacement regression deterministic`
- synthetic browser contract stubs `Math.random()` with a fixed sequence; production randomness is unchanged
"""
new_rng_section = """Historical random-policy test coverage (superseded by next-order selection):
- `91a462b48a3cec22ec60b02a6d2e7082f8277d9e` — `Make auto replacement regression deterministic`
- this prior RNG-specific contract is retained only as history; current selection no longer depends on randomness
"""
if handoff.count(old_rng_section) != 1:
    raise SystemExit(f'handoff RNG section guard failed: {handoff.count(old_rng_section)} matches')
handoff = handoff.replace(old_rng_section, new_rng_section, 1)
marker = '## EXACT NEXT ACTION\n'
if handoff.count(marker) != 1:
    raise SystemExit(f'exact next action marker guard failed: {handoff.count(marker)} matches')
prefix, _ = handoff.split(marker, 1)
checkpoint = """## NEW HANDS-ON FEEDBACK — DETERMINISTIC NEXT-ORDER AUTO PICK

Latest user feedback supersedes random automatic selection only:
- `ไม่เอา` remains non-blocking
- same-category/current-set/excluded filtering remains unchanged
- after filtering, automatic replacement now scans forward from the excluded item in the current menu ingredient order
- the first eligible candidate found is selected; scan wraps to the start of the menu when needed
- manual replacement remains an optional explicit override
- quantity/replacement ratios and `recipe_master.json` are unchanged

Permanent regression contract now additionally verifies:
- first item selects the next eligible same-category item
- a middle item selects the following eligible item instead of jumping backward
- the last item wraps to the first eligible same-category item
- existing sequential exclusion, survivor convergence, quantity aggregation, reopen persistence, and landscape coverage remain in place

"""
next_action = """## EXACT NEXT ACTION

1. Run scoped verification for the next-order product/test change.
2. Trigger permanent UI QA on the resulting durable commit.
3. Require local automatic replacement + landscape and deployed automatic replacement + landscape to PASS.
4. Remove temporary next-order repair infrastructure and run clean-tree UI QA.
5. Persist `READY FOR USER REAL-USAGE RE-REVIEW` with the final clean SHA/run.
"""
handoff_path.write_text(prefix + checkpoint + next_action, encoding='utf-8')

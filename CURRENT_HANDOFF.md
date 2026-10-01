# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + durable artifacts + latest user review.


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

## CURRENT WORK HEAD — READY FOR USER REAL-USAGE RE-REVIEW

Latest hands-on feedback is implemented and verified:
- `ไม่เอา` remains non-blocking
- automatic replacement is **not random**
- automatic replacement chooses the **next eligible item** in the current menu ingredient order
- if no later eligible candidate exists, selection wraps to the start of the menu order

Permanent next-order implementation:
- `11f70cb7e85435e73f113ac3e83ff53cf95ddcb6` — `Make automatic replacement choose next eligible item`

Final clean-tree acceptance head before this handoff-only checkpoint:
- `2789c677211f648eefb1a554d01b5bce1e4f2620` — `Remove temporary next-order QA trigger`

Final clean-tree UI QA:
- run `36842361171` / UI QA #174
- head `2789c677211f648eefb1a554d01b5bce1e4f2620`
- conclusion: `success`
- local automatic replacement step #23: PASS
- local phone-landscape interaction step #24: PASS
- deployed automatic replacement step #33: PASS
- deployed phone-landscape interaction step #34: PASS
- entire UI QA job: PASS

Pre-cleanup full acceptance:
- run `36841637718` / UI QA #173
- head `7f86588606351837cb66f36caa3c83ac8ec3644a`
- conclusion: `success`
- local + deployed automatic replacement and landscape interaction: PASS

## VERIFIED PRODUCT BEHAVIOR

When the user taps `ไม่เอา`:
- the item is excluded immediately
- no mandatory replacement dropdown/picker is auto-opened
- repeated exclusions can continue without interruption
- automatic replacement first uses eligible items in the same logical category/group under the existing business mapping
- excluded candidates and items outside the current menu/set are never selected
- after eligibility filtering, the system scans forward from the excluded item in `Object.keys(originalMenu[menuName])` order
- the first eligible candidate encountered is selected
- scan wraps to the start of the menu when needed
- cross-category fallback is used only after the same-category pool is exhausted under existing mapping semantics
- when one eligible same-category candidate remains, excluded mappings converge to that survivor
- explicit manual replacement remains available only as an optional user-triggered override

Examples of deterministic order behavior covered by regression:
- first item -> next eligible same-category item
- middle item -> following eligible item, not the first item in the pool
- last item -> wraps to the first eligible same-category item

There is no RNG dependency in the current automatic-replacement selection policy or its regression contract.

## STATE / QUANTITY INVARIANTS PRESERVED

Same-menu state:
- closing and reopening the same menu preserves exclusion/replacement/manual-override state
- reopening does not auto-open the replacement picker
- switching to a different menu resets modal selection state and prevents cross-menu leakage

Quantity behavior:
- existing `calculateNetRecipe()` aggregation semantics are unchanged
- multiple replacement credits converging to one surviving ingredient aggregate once per exclusion according to existing `replaceUseRules`
- no recipe ratio or authoritative quantity data changed
- `recipe_master.json` is unchanged by this work

Other preserved behavior:
- Matrix behavior
- PIN/admin behavior
- import/export behavior
- menu quantities
- accepted visual/layout behavior
- portrait/landscape interaction

## DURABLE IMPLEMENTATION / REGRESSION HISTORY

Core non-blocking category-first automatic replacement:
- `c36488a27d51e9fb7169fd4dd834a822c25eeebc` — `Restore category-first automatic replacements`

Same-menu persistence + quantity/reopen coverage:
- `e98cabdc6982eb1ee655d50e37d0cb5cd83c2094` — `Preserve automatic replacement state across reopen`

Historical random-policy deterministic test commit — superseded by next-order policy:
- `91a462b48a3cec22ec60b02a6d2e7082f8277d9e` — `Make auto replacement regression deterministic`
- retained only as history; current production selection no longer uses randomness and current regression no longer stubs `Math.random()`

Landscape reopen regression correction:
- `98f863fbad381a200459d99c637f9fde8b727b3b` — `Align landscape regression with preserved replacement state`

Current next-order policy:
- `11f70cb7e85435e73f113ac3e83ff53cf95ddcb6` — `Make automatic replacement choose next eligible item`

Permanent coverage:
- `qa/auto-replacement-flow-contract.mjs`
- `qa/landscape-calculator-v4-contract.mjs`
- `qa/chunk4-polish-v4-contract.mjs`
- `.github/workflows/ui-qa.yml`

## REQUIRED SCENARIOS — VERIFIED

A — sequential exclusions:
- repeated `ไม่เอา` works without a mandatory picker

B — one candidate remains:
- 5-candidate synthetic group, exclude 4, remaining same-category candidate becomes the replacement
- excluded candidates do not return

C — multiple candidates remain / deterministic next-order:
- same-category eligible pool is used first
- excluded/out-of-set candidates are rejected
- first, middle, and wrap-around next-order selection are asserted directly
- no RNG/stub/seed is required because production selection is deterministic

D — quantities:
- resulting quantity is checked against existing replacement quantities
- converging replacement quantities aggregate correctly

E — state / interaction:
- close/reopen same menu preserves exclusion + replacement + result state
- picker stays closed unless explicitly requested
- portrait->landscape preserves prior exclusion and permits another non-blocking exclusion
- local and deployed contracts PASS in final clean-tree UI QA #174

## TEMPORARY NEXT-ORDER REPAIR INFRASTRUCTURE — REMOVED

Removed after successful full QA:
- `.github/workflows/repair-auto-replacement-next.yml`
- `repair-staging/auto-replacement-next/patch_next_policy.py`
- `repair-staging/auto-replacement-next/RUN_FIX`
- `qa/RUN_AUTO_REPLACEMENT_NEXT_QA`

Earlier temporary auto-replacement repair infrastructure also remains removed.

## ACCEPTED / DO NOT REOPEN WITHOUT NEW EVIDENCE

- non-blocking `ไม่เอา` workflow
- deterministic next-eligible selection + wrap semantics
- same-category/current-set/excluded filtering
- quantity/reopen persistence coverage
- manual replacement optional override
- landscape interaction behavior
- unrelated accepted visual/UAT work
- multi-item shrimp pooling
- transactional Excel import validation
- Matrix numeric edit validation
- startup recipe master runtime integrity
- authoritative recipe data

## EXACT NEXT ACTION

User hands-on re-review on the deployed app:
1. Tap `ไม่เอา` on an item with multiple eligible same-category candidates and confirm it selects the next eligible item in menu order.
2. Tap `ไม่เอา` on a middle item and confirm it moves forward rather than jumping back to the first candidate.
3. Test the last eligible item in the order and confirm wrap-around to the first eligible same-category candidate.
4. Repeat several `ไม่เอา` taps and confirm no mandatory replacement picker interrupts the flow.
5. Confirm resulting quantity and close/reopen persistence remain correct.
6. If new concrete hands-on feedback appears, resume from current GitHub `main` and inspect only the affected path.

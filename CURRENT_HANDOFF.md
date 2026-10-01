# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + durable artifacts + latest user review.

## CURRENT WORK HEAD — READY FOR USER REAL-USAGE RE-REVIEW

Latest hands-on feedback is implemented and verified:
- tapping `ไม่เอา` remains non-blocking
- automatic replacement is deterministic; it does not use randomness
- automatic replacement first restricts candidates to eligible items in the same logical category/group and current menu/set
- after that filtering, it chooses the **first eligible item still included in that category according to `Object.keys(originalMenu[menuName])` order**
- it does **not** scan forward from the excluded item and does **not** use wrap semantics
- excluded candidates and items outside the current menu/set cannot be selected
- cross-category fallback remains allowed only after the same-category pool is exhausted under existing mapping semantics
- manual replacement remains an optional explicit override only

Permanent first-eligible implementation:
- `32944e8a7f3582c27215b16a34ddcdfd1420b057` — `Choose first eligible automatic replacement`

Final clean-tree acceptance head before this handoff-only checkpoint:
- `cdbd7055a18b787aa14ee8a9db08e20bd4fe7894` — `Remove temporary first-eligible QA trigger`

Final clean-tree UI QA:
- run `36848476342` / UI QA #176
- head `cdbd7055a18b787aa14ee8a9db08e20bd4fe7894`
- conclusion: `success`
- local automatic replacement step #23: PASS
- local phone-landscape interaction step #24: PASS
- deployed automatic replacement step #33: PASS
- deployed phone-landscape interaction step #34: PASS
- entire UI QA job: PASS

Pre-cleanup full acceptance:
- run `36847895817` / UI QA #175
- head `672e140ac555df2f0b524d2d875c83864c7962f0`
- conclusion: `success`
- local + deployed automatic replacement and landscape interaction: PASS

## VERIFIED PRODUCT BEHAVIOR

When the user taps `ไม่เอา`:
- the item is excluded immediately
- no mandatory replacement picker is auto-opened
- repeated exclusions can continue without interruption
- same-category/current-menu/non-excluded filtering is preserved
- the selected automatic replacement is the earliest still-eligible item in current menu ingredient order

Examples covered by permanent regression:
- group order `A, B, C, D, E`; exclude `C` while all others remain -> automatic replacement is `A`
- then exclude `A` too -> mappings that need an automatic replacement move to `B`
- exclude the last item while `A` is still available -> replacement is still `A`; excluded-item position does not bias selection
- exclude four of five same-category items -> all automatic mappings converge to the sole remaining candidate

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

Historical random-policy test commit — superseded:
- `91a462b48a3cec22ec60b02a6d2e7082f8277d9e` — `Make auto replacement regression deterministic`

Landscape reopen regression correction:
- `98f863fbad381a200459d99c637f9fde8b727b3b` — `Align landscape regression with preserved replacement state`

Historical next-order policy — superseded by latest user feedback:
- `11f70cb7e85435e73f113ac3e83ff53cf95ddcb6` — `Make automatic replacement choose next eligible item`
- do not restore next-order/wrap semantics unless new explicit user feedback requires it

Current authoritative first-eligible policy:
- `32944e8a7f3582c27215b16a34ddcdfd1420b057` — `Choose first eligible automatic replacement`

Permanent coverage:
- `qa/auto-replacement-flow-contract.mjs`
- `qa/landscape-calculator-v4-contract.mjs`
- `qa/chunk4-polish-v4-contract.mjs`
- `.github/workflows/ui-qa.yml`

## REQUIRED SCENARIOS — VERIFIED

A — sequential exclusions:
- repeated `ไม่เอา` works without a mandatory picker

B — one candidate remains:
- exclude four of five same-category candidates; the sole remaining candidate becomes the automatic replacement
- excluded candidates do not return

C — multiple candidates remain / deterministic first-eligible:
- same-category eligible pool is used first
- excluded/out-of-set candidates are rejected
- middle-item exclusion chooses the earliest still-included same-category candidate in menu order
- when that earliest candidate is then excluded, mappings advance to the next earliest remaining candidate
- excluded-item position has no effect on automatic ordering

D — quantities:
- resulting quantity is checked against existing replacement quantities
- converging replacement quantities aggregate correctly

E — state / interaction:
- close/reopen same menu preserves exclusion + replacement + result state
- picker stays closed unless explicitly requested
- portrait->landscape preserves prior exclusion and permits another non-blocking exclusion
- local and deployed contracts PASS in final clean-tree UI QA #176

## TEMPORARY FIRST-ELIGIBLE REPAIR INFRASTRUCTURE — REMOVED

Removed after successful full QA:
- `.github/workflows/repair-auto-replacement-first.yml`
- `repair-staging/auto-replacement-first/patch_first_policy.py`
- `repair-staging/auto-replacement-first/RUN_FIX`
- `qa/RUN_AUTO_REPLACEMENT_FIRST_QA`

Earlier temporary auto-replacement and next-order repair infrastructure also remains removed.

## ACCEPTED / DO NOT REOPEN WITHOUT NEW EVIDENCE

- non-blocking `ไม่เอา` workflow
- deterministic first-eligible same-category/current-menu selection semantics
- excluded/out-of-set filtering
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

User real-usage re-review on the deployed app:
1. Use a category with several items still included.
2. Tap `ไม่เอา` on a middle or later item and confirm the automatic replacement is the first still-included item in the same category, not the next item after the excluded one.
3. Exclude that first candidate too and confirm the mapping advances to the next earliest still-included same-category item.
4. Repeat several exclusions and confirm no mandatory picker interrupts the flow.
5. Confirm resulting quantities and close/reopen persistence remain correct.
6. If a new concrete mismatch appears, resume from current GitHub `main` and inspect only the affected path; do not reopen the superseded random or next-order investigations without new evidence.

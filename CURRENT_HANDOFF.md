# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + durable artifacts + latest user review.

## CURRENT WORK HEAD — READY FOR USER REAL-USAGE RE-REVIEW

New hands-on feedback about `ไม่เอา / replacement` is implemented, regression-covered, deployed, and verified on a clean repository tree.

Latest clean-tree acceptance head before this handoff-only checkpoint:
- `27bd3cf5b487ccbc19213cc83b661d7a5818f592`
- cleanup commit: `Remove temporary auto replacement QA trigger`

Final clean-tree UI QA:
- run `36840381648` / UI QA #172
- head `27bd3cf5b487ccbc19213cc83b661d7a5818f592`
- conclusion: `success`
- local automatic replacement step #23: PASS
- local phone-landscape interaction step #24: PASS
- deployed automatic replacement step #33: PASS
- deployed phone-landscape interaction step #34: PASS
- entire UI QA job: PASS

Pre-cleanup full acceptance run:
- run `36839655974` / UI QA #171
- head `472c933de7ff21064d05566a890f472b510303ed`
- conclusion: `success`
- local + deployed automatic replacement and landscape interaction all PASS

## VERIFIED PRODUCT BEHAVIOR

When the user taps `ไม่เอา`:
- the item is excluded immediately
- no mandatory replacement dropdown/picker is auto-opened
- repeated exclusions can continue without interruption
- automatic replacement stays in the same logical category while an eligible same-category candidate remains in the current menu/set
- excluded candidates and items outside the current set are never selected
- cross-category fallback is used only after the excluded item's category is exhausted under the existing mapping semantics
- when one eligible same-category candidate remains, excluded mappings converge to that survivor automatically
- when several eligible candidates remain, production selection remains randomized within the eligible preferred pool
- explicit manual replacement remains available as an optional override and opens only on explicit user action

Same-menu modal state:
- closing and reopening the same menu preserves exclusion/replacement/manual-override state
- reopening does not auto-open the replacement picker
- switching to a different menu resets this modal selection state, preventing cross-menu leakage

Quantity behavior:
- existing `calculateNetRecipe()` aggregation semantics were preserved
- multiple replacement credits converging to one surviving ingredient aggregate into that ingredient exactly once per exclusion according to existing `replaceUseRules`
- no recipe ratio or authoritative quantity data was changed
- `recipe_master.json` remains unchanged by this fix

## DURABLE IMPLEMENTATION / REGRESSION COMMITS

Core automatic replacement behavior:
- `c36488a27d51e9fb7169fd4dd834a822c25eeebc` — `Restore category-first automatic replacements`

Same-menu state persistence + quantity/reopen regression:
- `e98cabdc6982eb1ee655d50e37d0cb5cd83c2094` — `Preserve automatic replacement state across reopen`

Deterministic RNG test coverage:
- `91a462b48a3cec22ec60b02a6d2e7082f8277d9e` — `Make auto replacement regression deterministic`
- synthetic browser contract stubs `Math.random()` with a fixed sequence; production randomness is unchanged

Landscape reopen regression correction:
- `98f863fbad381a200459d99c637f9fde8b727b3b` — `Align landscape regression with preserved replacement state`
- verifies persisted exclusion across close/reopen + portrait→landscape rotation, then excludes a different still-eligible item without opening the picker

Permanent coverage remains in:
- `qa/auto-replacement-flow-contract.mjs`
- `qa/landscape-calculator-v4-contract.mjs`
- `qa/chunk4-polish-v4-contract.mjs`
- `.github/workflows/ui-qa.yml`

## REQUIRED SCENARIOS — VERIFIED

A — sequential exclusions:
- repeated `ไม่เอา` works without a mandatory picker

B — one candidate remains:
- 5-candidate synthetic group, exclude 4, remaining candidate becomes the automatic replacement
- excluded candidates do not return

C — multiple candidates remain:
- automatic selection uses same-category eligible candidates
- excluded/out-of-set candidates are rejected
- test RNG is deterministic and non-flaky

D — quantities:
- resulting quantity is checked against existing business-rule replacement quantities
- converging replacement quantities aggregate correctly

E — state / interaction:
- close/reopen same menu preserves exclusion + replacement + result state
- picker remains closed unless explicitly requested
- portrait→landscape interaction preserves prior exclusion and permits a new non-blocking exclusion
- local and deployed contracts PASS in the final clean-tree UI QA

## TEMPORARY REPAIR INFRASTRUCTURE — REMOVED

Removed after successful full QA:
- `.github/workflows/repair-auto-replacement-flow.yml`
- `repair-staging/auto-replacement/RUN_FIX`
- `.github/workflows/repair-auto-replacement-qa-contract.yml`
- `repair-staging/auto-replacement/RUN_QA_FIX`
- `.github/workflows/repair-auto-replacement-qa-contract-v2.yml`
- `repair-staging/auto-replacement/RUN_QA_FIX_V2`
- `repair-staging/auto-replacement/patch_state_coverage.py`
- `qa/RUN_AUTO_REPLACEMENT_FINAL_QA`

## ACCEPTED / DO NOT REOPEN WITHOUT NEW EVIDENCE

- automatic replacement implementation and same-category semantics above
- quantity/reopen regression coverage above
- manual replacement optional override behavior
- existing V4 visual/UAT work unrelated to this hands-on feedback
- multi-item shrimp pooling
- transactional Excel import validation
- Matrix numeric edit validation
- startup recipe master runtime integrity
- authoritative recipe data

## EXACT NEXT ACTION

User real-usage re-review on the deployed app:
1. Open a menu/set with several ingredients in the same logical category.
2. Tap `ไม่เอา` on several items consecutively; verify no replacement picker interrupts the sequence.
3. Exclude all but one item in that category; verify automatic mappings converge to the sole remaining eligible item and displayed quantities remain correct.
4. Close and reopen the same menu; verify exclusion/replacement/result state is unchanged and no picker auto-opens.
5. Optionally rotate portrait ↔ landscape and repeat one additional exclusion; verify interaction remains non-blocking.
6. Report only new concrete hands-on behavior if anything differs from the verified contract; do not restart the closed repair/recovery work without such evidence.

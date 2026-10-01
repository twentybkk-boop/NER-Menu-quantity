# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + durable artifacts + latest user review.

## CURRENT WORK HEAD — AUTO REPLACEMENT FIX DURABLE; FINAL FULL QA RUNNING

User real-usage requirement:
- repeated `ไม่เอา` taps must not be interrupted by an auto-open replacement dropdown
- automatic replacement stays in the same category while any eligible same-category item remains in the current set
- cross-category fallback is allowed only after the excluded item's category is exhausted
- automatic replacement never leaves the current menu/set
- explicit manual replacement remains available

## VERIFIED PRODUCT FIX — DURABLE
- repair run `36837106598` — completed/success
- product commit `c36488a27d51e9fb7169fd4dd834a822c25eeebc` — `Restore category-first automatic replacements`
- product diff changed exactly `index.html`
- `recipe_master.json` unchanged

Implemented behavior:
- automatic/manual mapping state separated via `manualReplacementOverrides`
- existing `menuBaseIngredients.includes(repItem)` preserves no-outside-set invariant
- same-category automatic pool preferred first
- cross-category valid in-set fallback only when same-category pool is empty
- automatic choice randomized within preferred pool
- auto mappings return to same category if one becomes available again
- `toggleExclude()` no longer opens picker automatically
- explicit manual picker/selection remains available

## PERMANENT REGRESSION COVERAGE — DURABLE
- `qa/auto-replacement-flow-contract.mjs`
  - commit `ce0908c8b3a47ca55b60d06a979b556a61bd8291`
  - covers silent repeated exclusions, 4-of-5 convergence, category exhaustion, return to same category, explicit manual picker, no-outside-set
- `qa/landscape-calculator-v4-contract.mjs`
  - commit `d9906fa652137640947d4635df36882342101d02`
  - updated for silent auto replacement while preserving landscape tap/scroll/rotation gates
- `.github/workflows/ui-qa.yml`
  - commit `d1a47e02c064c51ed60c09028e7c8611f7c2d54e`
  - wires automatic replacement contract LOCAL + DEPLOYED

## FIRST FULL QA FALSE-FAIL — CLOSED
UI QA run `36837389765` failed only because `qa/chunk4-polish-v4-contract.mjs` located the replacement trigger by a fixed replacement label, which is no longer deterministic because accepted auto replacement is randomized within the same-category pool.

QA-only correction:
- bot commit `e720043666ca4831fac0e749cdbbac1373de0500` — `Align Chunk 4 safety with silent auto replacement`
- changed exactly `qa/chunk4-polish-v4-contract.mjs`
- trigger is now located from the actual excluded row
- contract asserts picker is initially closed after exclusion
- contract explicitly opens picker before the existing interaction-safety sweep, preserving old safety intent

## FINAL FULL QA TRIGGER
- marker `qa/RUN_AUTO_REPLACEMENT_FINAL_QA`
- commit `6edaf35080e3ff617c1035e8a50e6843d6aca036`
- UI QA run `36838266125`
  - run number 168
  - bounded-read status: `in_progress`
  - conclusion: none yet
- Pages run `36838264227`
  - bounded-read status from same trigger head was `pending`
- no tight polling performed after this checkpoint

## TEMPORARY REPAIR INFRASTRUCTURE — REMOVE ONLY AFTER FULL QA SUCCESS
- `.github/workflows/repair-auto-replacement-flow.yml`
- `repair-staging/auto-replacement/RUN_FIX`
- `.github/workflows/repair-auto-replacement-qa-contract.yml` (first invalid repair workflow; no target changes)
- `repair-staging/auto-replacement/RUN_QA_FIX`
- `.github/workflows/repair-auto-replacement-qa-contract-v2.yml`
- `repair-staging/auto-replacement/RUN_QA_FIX_V2`
- `qa/RUN_AUTO_REPLACEMENT_FINAL_QA`

## ACCEPTED / DO NOT REOPEN
- product auto replacement implementation above unless new concrete evidence contradicts it
- V4 UAT-001–UAT-014 visual work
- multi-item shrimp pooling
- bundled import integrity
- transactional Excel import validation
- Matrix numeric edit validation
- startup recipe master runtime integrity
- authoritative recipe data

## DO NOT REPEAT
- do not rerun product repair
- do not change `recipe_master.json`
- do not reopen visual/background work
- do not perform repo-wide investigation
- do not poll UI QA `36838266125` in a tight loop

## QUANTITY / REOPEN STATE COVERAGE — IMPLEMENTED
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

## DETERMINISTIC RNG COVERAGE — IMPLEMENTED
- production automatic replacement remains randomized within the eligible preferred pool
- the synthetic auto-replacement contract now stubs browser `Math.random()` with a fixed repeating sequence
- Scenario C therefore exercises multiple-candidate automatic selection deterministically while still asserting same-category membership and exclusion/out-of-set safety
- no production selection semantics were changed for test determinism

## LANDSCAPE REOPEN CONTRACT CORRECTION — IMPLEMENTED
- UI QA run `36838859184` proved the expanded auto-replacement contract PASS in Chromium + WebKit before failing the phone-landscape interaction contract
- root cause was a stale test assumption, not a product click defect: the landscape test excluded an item in `tapFlow()`, closed/reopened the same menu, then clicked that already-excluded item again and expected it to remain excluded
- same-menu reopen now intentionally preserves exclusion/replacement state, so that second click correctly un-excluded the item
- landscape regression now first asserts the prior exclusion persists after close/reopen and portrait→landscape rotation, then excludes a different still-eligible item and asserts the picker remains closed and the prior exclusion remains intact
- no production behavior or recipe data changed in this correction

## EXACT NEXT ACTION
1. Read the permanent UI QA run for the commit containing this state/coverage correction once.
2. If it fails, inspect only the first failed required step and make the minimum correction in this auto-replacement scope.
3. If it succeeds, confirm the deployed automatic-replacement contract and same-menu reopen persistence.
4. Remove all temporary auto-replacement repair workflows/trigger markers and persist `READY FOR USER REAL-USAGE RE-REVIEW`.

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

## EXACT NEXT ACTION
1. Read UI QA run `36838266125` once.
2. If still running: checkpoint status only and stop polling.
3. If failure: inspect only first failed required step/log, persist root cause, make minimum correction.
4. If success: verify Pages/live deployment, then delete only the temporary repair/trigger files listed above.
5. Verify cleanup scope and, if marker deletion triggers UI QA, perform one bounded final status read.
6. Persist `READY FOR USER REAL-USAGE RE-REVIEW` and send the live URL with focused checks: rapid multiple exclusions, 4-of-5 same-category convergence, no premature cross-category, cross-category only after exhaustion, never outside set, manual override still works.

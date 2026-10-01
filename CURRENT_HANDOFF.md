# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + durable artifacts + latest user review.

## CURRENT WORK HEAD — REAL-USAGE AUTO REPLACEMENT FIX IMPLEMENTED; FULL QA RUNNING

User reported a real-usage workflow defect: tapping several `ไม่เอา` choices was interrupted by an auto-open replacement dropdown. Expected workflow is silent automatic replacement, same-category first, cross-category only after same-category exhaustion, and never outside the current set.

## VERIFIED PRODUCT FIX — DURABLE
Guarded repair run:
- workflow run `36837106598`
- final status `completed/success`

Production commit:
- `c36488a27d51e9fb7169fd4dd834a822c25eeebc` — `Restore category-first automatic replacements`
- changed exactly one product path: `index.html`

Implemented behavior:
- automatic replacement and explicit manual override state are separated via `manualReplacementOverrides`
- automatic candidates are filtered by existing in-set rule (`menuBaseIngredients.includes(repItem)`)
- auto pool prefers the excluded item's existing category (`veggieGroups` membership vs complementary category)
- if same-category candidates exist, auto replacement cannot cross category
- if same-category candidates are exhausted, cross-category valid in-set fallback becomes allowed
- auto choice is randomized within the currently preferred pool
- when exclusion state changes and a same-category option becomes available again, automatic mappings return to same category
- `toggleExclude()` no longer opens the replacement picker automatically
- explicit picker remains available via the replacement trigger
- explicit manual replacement is preserved while still valid
- operator copy now states that replacement is automatic; trigger hint is `แตะเพื่อเปลี่ยนเอง`
- `recipe_master.json` unchanged

## PERMANENT REGRESSION COVERAGE — DURABLE
New contract:
- `qa/auto-replacement-flow-contract.mjs`
- commit `ce0908c8b3a47ca55b60d06a979b556a61bd8291`
- synthetic in-app set verifies:
  - first/multiple exclusions do not auto-open dropdown
  - manual picker still opens explicitly
  - 4-of-5 same-category exclusions converge to the only remaining same-category item
  - no cross-category automatic replacement before same-category exhaustion
  - cross-category fallback after all same-category items are excluded
  - automatic mappings return to same category if one becomes available again
  - out-of-set item is never auto-selected

Existing interaction contract updated:
- `qa/landscape-calculator-v4-contract.mjs`
- commit `d9906fa652137640947d4635df36882342101d02`
- now asserts silent auto replacement and explicit-only picker opening while preserving landscape tap/scroll/rotation gates

Permanent UI QA wiring:
- `.github/workflows/ui-qa.yml`
- commit `d1a47e02c064c51ed60c09028e7c8611f7c2d54e`
- adds automatic replacement contract LOCAL + DEPLOYED

## CURRENT CI STATE
- UI QA run `36837389765`
  - head `d1a47e02c064c51ed60c09028e7c8611f7c2d54e`
  - bounded-read status: `in_progress`
  - no repeated polling performed at this checkpoint

## ACCEPTED / DO NOT REOPEN
All previous accepted scopes remain closed unless directly contradicted by new evidence:
- V4 UAT-001–UAT-014 visual work
- multi-item shrimp pooling
- bundled import integrity
- transactional Excel import validation
- Matrix numeric edit validation
- startup recipe master runtime integrity
- authoritative recipe data

## TEMPORARY REPAIR INFRASTRUCTURE
Temporary and removable after full QA succeeds:
- `.github/workflows/repair-auto-replacement-flow.yml`
- `repair-staging/auto-replacement/RUN_FIX`

## DO NOT REPEAT
- do not perform repo-wide investigation
- do not change `recipe_master.json`
- do not weaken no-outside-set behavior
- do not reopen visual/background work
- do not remove manual replacement capability
- do not rerun the guarded product repair; production commit is already durable
- do not poll UI QA `36837389765` in a tight loop

## EXACT NEXT ACTION
1. Read UI QA run `36837389765` once.
2. If failure: inspect only the first failed required step/log, persist root cause, and apply minimum correction.
3. If success: confirm Pages/live deployment, then remove the temporary repair workflow + trigger marker only.
4. Run/confirm final permanent UI QA after cleanup if cleanup itself triggers QA.
5. Persist READY FOR USER REAL-USAGE RE-REVIEW and send the live URL with the exact real-usage checks.

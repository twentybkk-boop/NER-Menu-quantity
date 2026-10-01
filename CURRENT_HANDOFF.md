# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + durable artifacts + latest user review.

## CURRENT WORK HEAD — AUTO REPLACEMENT PRODUCT FIX DURABLE; FIRST FULL QA FALSE-FAIL ISOLATED

User's real-usage requirement remains:
- tapping multiple `ไม่เอา` choices must not be interrupted by an auto-open replacement dropdown
- automatic replacement stays in the same category while an eligible same-category item remains in the current set
- cross-category fallback is allowed only after the same category is exhausted
- automatic replacement never leaves the current menu/set
- explicit manual replacement remains available

## VERIFIED PRODUCT FIX — DURABLE
- guarded repair run `36837106598` — completed/success
- production commit `c36488a27d51e9fb7169fd4dd834a822c25eeebc` — `Restore category-first automatic replacements`
- product diff changed exactly `index.html`
- `recipe_master.json` unchanged

Implemented behavior:
- `manualReplacementOverrides` separates automatic mappings from explicit manual choices
- existing `menuBaseIngredients.includes(repItem)` continues to enforce no-outside-set
- same-category automatic pool is preferred first
- cross-category in-set pool is used only when same-category pool is empty
- automatic selection is randomized within the currently preferred pool
- automatic mappings return to same category when a same-category option becomes available again
- `toggleExclude()` no longer auto-opens the picker
- manual replacement trigger/picker remains explicit and available

## PERMANENT REGRESSION WORK — DURABLE
- `qa/auto-replacement-flow-contract.mjs`
  - commit `ce0908c8b3a47ca55b60d06a979b556a61bd8291`
- `qa/landscape-calculator-v4-contract.mjs` updated for silent auto replacement
  - commit `d9906fa652137640947d4635df36882342101d02`
- `.github/workflows/ui-qa.yml` wires auto-replacement contract LOCAL + DEPLOYED
  - commit `d1a47e02c064c51ed60c09028e7c8611f7c2d54e`
- durable pre-CI checkpoint `1d5978c0321c8a43a1ba16f0f4f363f1792eaf2`

## FIRST FULL UI QA RESULT — VERIFIED FAILURE
UI QA run `36837389765`:
- head `d1a47e02c064c51ed60c09028e7c8611f7c2d54e`
- final `completed/failure`
- base Chromium/WebKit UI QA PASS
- P0-A PASS
- P0-B PASS
- P0-D top PASS
- P0-D long-list PASS
- V4 thumbnail semantics/density PASS
- first failed required step: `Verify V4 Chunk 4 character scale, detail density and safety locally`

### EXACT ROOT CAUSE
Failure:
`chromium/phone-portrait/local/safety: replacement trigger missing (สามชั้นหมูสไลซ์)`

This is a stale QA assumption, not evidence of a product regression:
- `qa/chunk4-polish-v4-contract.mjs::interactionSafety()` locates `.replacement-trigger` by `candidate.replacement`, a fixed first replacement name selected from `replaceUseRules`.
- the new accepted product behavior randomizes automatic selection within the preferred same-category pool.
- therefore the row's replacement trigger still exists, but its displayed selected name can legitimately differ from `candidate.replacement`.
- Chunk 4 contract must identify the trigger belonging to the excluded row, not identify it by a now-nondeterministic auto-selected label.

Artifact from failed run (not yet needed for this false-fail):
- `ui-qa-screenshots` artifact ID `11149333323`
- digest `sha256:584590b306e3734dbdfe97b378d05ebc9bdf397317dfb63d646e4bb002da47f7`

## ACCEPTED / DO NOT REOPEN
- V4 visual acceptance remains closed; this failure is a stale test locator
- product auto replacement implementation above remains accepted pending permanent contract pass
- multi-item shrimp pooling
- bundled import integrity
- transactional Excel import validation
- Matrix numeric edit validation
- startup recipe runtime integrity
- authoritative recipe data

## TEMPORARY REPAIR INFRASTRUCTURE
Remove only after full permanent QA succeeds:
- `.github/workflows/repair-auto-replacement-flow.yml`
- `repair-staging/auto-replacement/RUN_FIX`

## DO NOT REPEAT
- do not rerun the product repair
- do not change `recipe_master.json`
- do not change product replacement behavior in response to this stale test locator
- do not reopen visual/background work
- do not perform repo-wide investigation

## EXACT NEXT ACTION
1. Update only `qa/chunk4-polish-v4-contract.mjs::interactionSafety()` so it finds the replacement trigger in the same exclusion row as `candidate.exclude`, independent of the randomized selected label.
2. Preserve the old safety intent by asserting the picker is initially closed, explicitly opening it, and then performing the interaction/coverage safety sweep with the picker open.
3. Commit the QA-only correction.
4. Read the newly triggered full UI QA once; if it fails, inspect only the first failed required step.
5. If full QA succeeds, clean the temporary repair workflow + trigger marker and persist READY FOR USER REAL-USAGE RE-REVIEW.

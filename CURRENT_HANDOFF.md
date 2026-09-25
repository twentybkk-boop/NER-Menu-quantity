# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + durable artifacts.

## SHORT-CHUNK EXECUTION POLICY
- Re-read current `main` + this handoff at each milestone.
- Do not reopen DONE / ACCEPTED work.
- Persist a checkpoint at each meaningful milestone.
- User explicitly requested this session to continue through real-screen review, so continue across milestones while checkpointing.

## LOCKED / ACCEPTED
- Phase 1 visual/UAT V4 UAT-001–UAT-014 ACCEPTED / FROZEN.
- Multi-item shrimp pooling calculation ACCEPTED / VERIFIED.
  - production fix `e3ef7945de8a4d6e708e215a65e144a2fb8aa863`
  - UI QA run `36124443879` / run 155 success
- raw-current shrimp credits remain BLOCKED; do not infer or reopen source search without new evidence.
- bundled import-integrity audit CLEAN / CLOSED.
  - durable diagnostic `qa/import-data-integrity-audit.mjs`
  - run `36125886778`: `mismatchedMenus=0`, `invalidExcludes=0`, `duplicateRules=0`, `noOptions=0`

## CURRENT WORK HEAD — TRANSACTIONAL EXCEL IMPORT VALIDATION IMPLEMENTED / FRESH UI QA RUNNING

### Reproduced gap
Repro run `36128207165` failed exactly at:
`transactional import validation gate is missing before live-state replacement`

Regression contract:
- `qa/transactional-import-validation-contract.mjs`
- commit `9c8665c3217254803fc312d3d5e79add3179e76e`

### Production implementation — COMPLETE
Initial one-shot workflow setup `ac316e8a23f4acfb9a58b3a6673bc4a5283ca002` had YAML serialization failure run `36128886426` with no jobs; production was untouched.

Workflow serialization fix:
- `ae34b12dd92bef9033b7a79848aeebc8704aab48`
- retrigger `eed4cc5f49ee836ab29c2f6f58579cca540b6f62`
- repair run `36129008124`
- job `108051678818`: completed/success
- patch step success
- transactional contract success
- one-file diff gate success
- bot commit success

Production commit:
- `e0de978f7a71f2b12dfb07c60ba4988a7e8d6dc6` — `Add transactional Excel import validation`
- changed exactly one file: `index.html`

Implementation behavior:
- browser-side `validateImportedRecipeData(baseMenu, replaceRules)` uses the same four integrity semantics as the durable audit
- candidate workbook is validated before any live-state assignment
- invalid import returns without replacing `originalMenu`, `menuCategories`, `replaceUseRules`, or `allIngredientsList`
- Matrix UI shows `#importStatus` live-region banner with concise Thai error summary
- valid import commits candidate state only after validation and preserves existing success alert
- `recipe_master.json` unchanged

### Browser acceptance + permanent QA
Browser acceptance:
- `qa/transactional-import-ui-contract.mjs`
- commit `8d510d34b9ed55f59c7afb985eb0268dc1143ac5`
- performs actual generated XLSX imports through the real file input
- invalid workbook asserts error banner + exact live-state preservation
- valid workbook asserts success banner + live-state commit + existing success alert
- captures desktop and phone error/success screenshots

Permanent UI QA integration:
- `.github/workflows/ui-qa.yml`
- commit `41a975495c759ff3e9f41fa6439e654df1b772e2`
- new required steps:
  - `Verify transactional Excel import structure`
  - `Verify transactional Excel import UI locally`
  - `Verify deployed transactional Excel import UI`

Fresh acceptance run:
- UI QA run ID `36129243341`
- run number 159
- head `41a975495c759ff3e9f41fa6439e654df1b772e2`
- latest observed status: in_progress
- latest observed step: Install Playwright
- no failure evidence yet

Expected screenshot artifact names if steps pass:
- `33-local-desktop-import-validation-error.png`
- `34-local-desktop-import-validation-success.png`
- `33-local-phone-import-validation-error.png`
- `34-local-phone-import-validation-success.png`
- equivalent `live` screenshots from deployed Pages

## ACCEPTANCE CONTRACT
Invalid workbook must be rejected before live-state replacement for:
- mismatched menu
- invalid exclude
- duplicate `(menu, exclude)`
- no replacement options for a multi-ingredient exclusion

On rejection:
- preserve prior live state
- no partial commit
- show actionable error summary instead of success

Real-screen closeout requires:
- fresh run 159 green
- local/deployed screenshots produced
- phone + desktop Matrix error banner readable
- Matrix header/actions/table remain usable
- valid success state readable

## DO NOT REPEAT
- do not reopen Phase 1 visual work
- do not revisit blocked raw shrimp credits
- do not recreate old repro run
- do not modify bundled recipe data for this item
- do not create duplicate UI QA while run `36129243341` exists

## EXACT NEXT ACTION
1. Continue only UI QA run `36129243341`.
2. Verify new local structure/UI steps and deployed transactional UI step.
3. If failure: inspect first failed required step and fix only that issue.
4. If success: download `ui-qa-screenshots`, inspect transactional import screenshots, persist `READY FOR USER REVIEW`, and present real-screen evidence to the user.

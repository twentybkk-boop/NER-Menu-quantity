# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + durable artifacts + latest user review.

## CURRENT WORK HEAD — TRANSACTIONAL EXCEL IMPORT VALIDATION READY FOR USER REVIEW

## LOCKED / ACCEPTED
- Phase 1 visual/UAT V4 UAT-001–UAT-014 ACCEPTED / FROZEN.
- Multi-item shrimp pooling calculation ACCEPTED / VERIFIED.
  - production fix `e3ef7945de8a4d6e708e215a65e144a2fb8aa863`
  - UI QA run `36124443879` / run 155 success
- raw-current shrimp credits remain BLOCKED; do not infer or reopen source search without new evidence.
- bundled import-integrity audit CLEAN / CLOSED.
  - `qa/import-data-integrity-audit.mjs`
  - run `36125886778`: all four counts zero

## TRANSACTIONAL EXCEL IMPORT VALIDATION — IMPLEMENTED / VERIFIED

### Reproduced gap
Repro run `36128207165` failed exactly at:
`transactional import validation gate is missing before live-state replacement`

Regression contract:
- `qa/transactional-import-validation-contract.mjs`
- commit `9c8665c3217254803fc312d3d5e79add3179e76e`

### Production implementation
Production commit:
- `e0de978f7a71f2b12dfb07c60ba4988a7e8d6dc6` — `Add transactional Excel import validation`
- changed exactly one file: `index.html`

Behavior:
- `validateImportedRecipeData(baseMenu, replaceRules)` uses the same four integrity semantics as the durable audit
- candidate workbook is validated before any assignment to live state
- invalid import preserves prior `originalMenu`, `menuCategories`, `replaceUseRules`, and `allIngredientsList`
- invalid import shows a Thai `#importStatus` error live-region banner with actionable finding summary
- valid import commits state only after validation and preserves the existing success alert
- `recipe_master.json` unchanged

Guarded repair evidence:
- first repair run `36128886426` failed before jobs because workflow YAML serialization was invalid; production untouched
- workflow serialization fix `ae34b12dd92bef9033b7a79848aeebc8704aab48`
- retrigger `eed4cc5f49ee836ab29c2f6f58579cca540b6f62`
- repair run `36129008124` / job `108051678818`: completed/success
- patch, regression contract, one-file diff gate, and bot commit all succeeded

### Browser acceptance
- `qa/transactional-import-ui-contract.mjs`
- commit `8d510d34b9ed55f59c7afb985eb0268dc1143ac5`
- generates actual `.xlsx` workbooks in Chromium and submits them through the real file input
- invalid workbook asserts visible error banner + exact live-state preservation + no success alert
- valid workbook asserts success banner + committed candidate state + existing success alert
- captures desktop + phone error/success evidence

Permanent UI QA integration:
- commit `41a975495c759ff3e9f41fa6439e654df1b772e2`

Fresh acceptance:
- UI QA run `36129243341`
- run number 159
- head `41a975495c759ff3e9f41fa6439e654df1b772e2`
- status completed
- conclusion success
- `Verify transactional Excel import structure`: success
- `Verify transactional Excel import UI locally`: success
- `Verify deployed transactional Excel import UI`: success
- all previously accepted local/deployed UI gates: success
- screenshot upload: success

Artifact:
- `ui-qa-screenshots`
- artifact ID `10861246503`
- size 101,734,891 bytes
- digest `sha256:d579a7ad21051fcdfc77403a97f975020f0d661e3a3cb90642f63f23fe6d4ef6`

## REAL-SCREEN EVIDENCE / MANUAL REVIEW
Local and deployed/live transactional screenshots are byte-identical:

Error — desktop:
- dimensions 1280x900
- SHA256 `03e699d20fc2576eeb6eed87684b508ead4fe100d1df1d59de95ad40e9733f32`

Error — phone:
- dimensions 390x844
- SHA256 `a659a33ed4a3ede3c4694412f6d085dc8f0b94c7f4b32d63073917b7183db3ac`

Success — desktop:
- dimensions 1280x900
- SHA256 `e8809082aca407b5497e89be2121490c257d9f6323e53beac5e4b099e41b5057`

Success — phone:
- dimensions 390x844
- SHA256 `e3fbfbb272494a3a91f17be2657622eb08eeeb3c8c3a8aa4d303d896b0e8b2c8`

Manual visual findings:
- phone error banner is readable and fits without horizontal overflow
- Matrix upload/download/close controls remain visible and usable above the banner
- error state keeps the previous Matrix visible below it, making preservation explicit
- desktop banner is compact and leaves the Matrix table usable
- success banner is concise and readable on both phone and desktop
- synthetic valid import displays the committed two-row Matrix correctly
- no accepted Phase 1 visual regression observed by run 159

## TEMPORARY ARTIFACTS — CLEANUP AFTER USER ACCEPTANCE
Do not delete before user review unless required:
- `.github/workflows/audit-transactional-import-validation.yml`
- `.github/workflows/repair-transactional-import-validation.yml`
- `repair-staging/import-transaction/RUN_REPRO`
- `repair-staging/import-transaction/RUN_FIX`

Keep permanently:
- `qa/transactional-import-validation-contract.mjs`
- `qa/transactional-import-ui-contract.mjs`
- permanent steps in `.github/workflows/ui-qa.yml`

## DO NOT REPEAT
- do not reopen Phase 1 visual work
- do not revisit blocked raw shrimp credits
- do not rerun old repro or repair runs merely to reconfirm
- do not modify `recipe_master.json` for this item

## EXACT NEXT ACTION
User reviews deployed/live phone + desktop error/success screenshots from run 159. If accepted, mark transactional Excel import validation ACCEPTED, clean up the four temporary workflow/trigger artifacts, keep permanent regression coverage, then discover the next independent backlog item. If user requests a visual correction, change only the Matrix import-status presentation without reopening the validated transaction semantics.

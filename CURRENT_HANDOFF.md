# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + durable artifacts.

## SHORT-CHUNK EXECUTION POLICY
- ONE chunk = ONE milestone only by default.
- Re-read current `main` + this handoff at the start of every chunk.
- Do not reopen DONE / ACCEPTED work.
- Persist a checkpoint at each meaningful milestone.
- The user explicitly requested this session to continue through real-screen review; therefore continue across milestones in the same session while checkpointing each milestone.

## LOCKED / ACCEPTED
- Phase 1 visual/UAT V4 UAT-001–UAT-014 is ACCEPTED / FROZEN.
- Multi-item shrimp pooling calculation is ACCEPTED / VERIFIED.
  - production fix `e3ef7945de8a4d6e708e215a65e144a2fb8aa863`
  - permanent regression contract `qa/replacement-pooling-contract.mjs`
  - UI QA run `36124443879` / run 155: completed/success
- raw-current shrimp credits remain BLOCKED because no authoritative current raw source exists.
- DO NOT infer missing decimal credits, migrate the old decimal matrix wholesale, or reopen Drive/Gmail/source searches without new evidence.

## IMPORT DATA INTEGRITY AUDIT — CLEAN / CLOSED / CLEANUP COMPLETE
- durable diagnostic: `qa/import-data-integrity-audit.mjs`
- run `36125886778` / job `108041781453`: success
- exact counts: `mismatchedMenus=0`, `invalidExcludes=0`, `duplicateRules=0`, `noOptions=0`
- no production patch justified
- one-shot workflow removed at `e9f78028fee57dd11d2a26a075939995c2ec0e51`
- trigger removed at `040c3c3ed02fe103a3316056ade56ffbcce56699`

## CURRENT WORK HEAD — TRANSACTIONAL EXCEL IMPORT VALIDATION IMPLEMENTATION SETUP READY

### Reproduced production gap
Repro run `36128207165` / job `108049130583` completed/failure exactly at:
- `Run transactional import validation contract`
- assertion: `transactional import validation gate is missing before live-state replacement`

Regression contract:
- `qa/transactional-import-validation-contract.mjs`
- commit `9c8665c3217254803fc312d3d5e79add3179e76e`

### Accepted implementation interface
Browser production will use these functions:
- `validateImportedRecipeData(baseMenu, replaceRules)` — same four integrity semantics as durable audit
- `hasImportValidationErrors(result)`
- `formatImportValidationSummary(result)`
- `setImportStatus(kind, message)`

Required transactional order:
1. parse workbook into candidate objects
2. call exactly `validateImportedRecipeData(newOriginalMenu, newReplaceRules)`
3. if findings exist: render actionable Matrix error status and return without assigning live state
4. only on clean validation assign `originalMenu`, `menuCategories`, `replaceUseRules`, `allIngredientsList`
5. render success status + preserve existing success alert

Error status must summarize the four existing finding classes only:
- mismatched menu
- invalid exclude
- duplicate `(menu, exclude)`
- no replacement option overlap

The Matrix UI gains a non-blocking `#importStatus` live-region banner between header and matrix table. It is hidden by default, error-styled on rejection, and success-styled on accepted import.

### Guarded production patch setup
One-shot write workflow:
- `.github/workflows/repair-transactional-import-validation.yml`
- setup commit `ac316e8a23f4acfb9a58b3a6673bc4a5283ca002`
- trigger path: `repair-staging/import-transaction/RUN_FIX`
- permissions: contents write

Workflow safeguards:
- exact markers for CSS, Matrix status element, import handler, and assignment block
- refuses duplicate validator/status implementation
- runs `qa/transactional-import-validation-contract.mjs` before commit
- requires production diff to be exactly `index.html`
- runs `git diff --check`
- commits only `index.html`

At this checkpoint production `index.html` has NOT yet been modified by the fix workflow.

## ACCEPTANCE CONTRACT
A valid workbook must preserve current successful import behavior.
An invalid workbook must be rejected BEFORE live-state replacement when any finding exists.
On rejection:
- preserve prior `originalMenu`, `menuCategories`, `replaceUseRules`, `allIngredientsList`
- no partial commit
- show concise actionable error summary instead of success
- do not modify `recipe_master.json`

Real-screen acceptance required before closing this item:
- Matrix screen visibly shows the invalid-import error banner from an actual generated Excel import
- banner is readable on phone and desktop/tablet viewport
- existing Matrix controls/table remain usable
- valid import path remains accepted by automated contract
- fresh UI QA remains green

## DO NOT REPEAT
- do not reopen Phase 1 visual work
- do not revisit blocked raw shrimp credit provenance without new authoritative evidence
- do not recreate/rerun the closed bundled-data import audit
- do not rerun the old failing repro merely to reconfirm the gap
- do not modify bundled production data for this runtime import-safety item

## EXACT NEXT ACTION
1. Create `repair-staging/import-transaction/RUN_FIX` to trigger the guarded production patch.
2. Verify the resulting workflow run and bot production commit.
3. Add targeted browser QA that performs an actual invalid Excel import and captures Matrix error-state screenshots.
4. Add the transactional contract + browser acceptance to permanent UI QA.
5. Run fresh UI QA, download screenshots, inspect real phone + desktop/tablet evidence, and present them to the user for review.

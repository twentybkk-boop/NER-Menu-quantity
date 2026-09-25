# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + durable artifacts.

## SHORT-CHUNK EXECUTION POLICY
- ONE chunk = ONE milestone only.
- Re-read current `main` + this handoff at the start of every chunk.
- Do not reopen DONE / ACCEPTED work.
- Persist a checkpoint at the end of each chunk.
- STOP after checkpoint; do not chain the next major milestone in the same session.

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

## CURRENT WORK HEAD — TRANSACTIONAL EXCEL IMPORT VALIDATION REPRODUCED

### Backlog scope
Protect runtime Excel import from integrity/linkage errors before parsed workbook data replaces the currently loaded live state.

### Existing behavior already present
Current `index.html` canonicalizes known aliases during Excel import:
- `ปลากหมึก` -> `ปลาหมึก`
- `เนื้อเสื้อร้องให้สไลซ์` -> `เนื้อเสือร้องไห้สไลซ์`

### Verified production gap
Current import flow parses candidate data into:
- `newOriginalMenu`
- `newMenuCategories`
- `newReplaceRules`
- `repIngredientsList`

Then it directly assigns those candidates into live state:
- `originalMenu = newOriginalMenu`
- `menuCategories = newMenuCategories`
- `replaceUseRules = newReplaceRules`
- `allIngredientsList = repIngredientsList`

There is no integrity-validation gate before the first live-state assignment.

### Regression contract
- `qa/transactional-import-validation-contract.mjs`
- commit `9c8665c3217254803fc312d3d5e79add3179e76e`

The contract verifies reusable audit behavior for:
- valid parsed data -> clean
- mismatched menu -> detected
- invalid exclude -> detected
- duplicate `(menu, exclude)` -> detected
- no base-overlap replacement options -> detected

Structural transaction requirement:
- intended integration point: `validateImportedRecipeData(newOriginalMenu, newReplaceRules)`
- validation must occur before the first live-state assignment

### Reproduction run — COMPLETE / EXPECTED FAILURE
One-shot setup:
- workflow `.github/workflows/audit-transactional-import-validation.yml`
- workflow commit `36cb05b99fe150d52ddea518010e84246195a898`
- trigger `repair-staging/import-transaction/RUN_REPRO`
- trigger commit `3f518522fb5cdad0eaa648f6b0ce2cd45e52cca7`
- permissions read-only

Run:
- run ID `36128207165`
- job ID `108049130583`
- workflow `Audit transactional import validation`
- head `3f518522fb5cdad0eaa648f6b0ce2cd45e52cca7`
- status `completed`
- conclusion `failure`

Failed required step:
- `Run transactional import validation contract`

Exact assertion from job log:
- `AssertionError [ERR_ASSERTION]: transactional import validation gate is missing before live-state replacement`
- contract location: `qa/transactional-import-validation-contract.mjs:61:8`
- exit code `1`

This is the intended reproduction and confirms the harness is reaching the structural transaction assertion. Checkout/setup passed; failure is not a workflow/setup error.

Production behavior/data has NOT been modified by this reproduction work.

## ACCEPTANCE CONTRACT FOR IMPLEMENTATION
A valid workbook must preserve current successful import behavior.
An invalid workbook must be rejected BEFORE live-state replacement when any of these are found:
- mismatched menu
- invalid exclude
- duplicate rule
- no replacement options for a multi-ingredient exclusion

On rejection:
- preserve prior `originalMenu`, `menuCategories`, `replaceUseRules`, `allIngredientsList`
- do not partially commit parsed import state
- show a concise actionable error summary instead of success
- reuse the existing integrity semantics from `qa/import-data-integrity-audit.mjs`
- do not modify `recipe_master.json`

## DO NOT REPEAT
- do not reopen Phase 1 visual work
- do not revisit blocked raw shrimp credit provenance without new authoritative evidence
- do not recreate shrimp repair workflow/staging
- do not recreate/rerun the closed bundled-data import audit
- do not create another transactional repro run merely to reconfirm this failure
- do not modify bundled production data for this runtime import-safety item
- do not add the new transactional contract to permanent UI QA until implementation makes it pass

## EXACT NEXT ACTION — NEXT SHORT CHUNK ONLY
Do one implementation-design chunk for **Transactional Excel Import Validation**:
1. Re-read current `main` + this handoff.
2. Inspect only `importExcelData()` and `qa/import-data-integrity-audit.mjs`.
3. Define the minimal production interface that can reuse the existing audit semantics inside browser runtime without duplicating/inventing rules.
4. Preserve transactional behavior: validate candidates first, assign live state only after a clean result.
5. Define the concise error-summary format for the four finding classes.
6. Persist the exact patch plan/interface and STOP before editing production.

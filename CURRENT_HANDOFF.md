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

## CURRENT WORK HEAD — TRANSACTIONAL EXCEL IMPORT VALIDATION REPRO SETUP COMPLETE

### Backlog scope
Protect runtime Excel import from integrity/linkage errors before parsed workbook data replaces the currently loaded live state.

### Existing behavior
Current `index.html` already canonicalizes known aliases during Excel import:
- `ปลากหมึก` -> `ปลาหมึก`
- `เนื้อเสื้อร้องให้สไลซ์` -> `เนื้อเสือร้องไห้สไลซ์`

Current import flow parses `newOriginalMenu`, `newMenuCategories`, `newReplaceRules`, and `repIngredientsList`, then directly assigns them to live state and shows success. No integrity validation call exists between parse and the first live-state assignment.

### Regression contract added
- file: `qa/transactional-import-validation-contract.mjs`
- commit: `9c8665c3217254803fc312d3d5e79add3179e76e`

Contract verifies reusable integrity logic on:
- valid parsed data -> clean
- mismatched menu -> detected
- invalid exclude -> detected
- duplicate `(menu, exclude)` -> detected
- no base-overlap replacement options -> detected

Structural transaction requirement:
- planned integration point: `validateImportedRecipeData(newOriginalMenu, newReplaceRules)`
- validation must occur before the first of these live-state assignments:
  - `originalMenu = newOriginalMenu`
  - `menuCategories = newMenuCategories`
  - `replaceUseRules = newReplaceRules`
  - `allIngredientsList = repIngredientsList`

The contract is intentionally NOT wired into permanent UI QA yet because production does not implement the validation gate. Expected current result is a targeted failure: `transactional import validation gate is missing before live-state replacement`.

### One-shot repro workflow added
- `.github/workflows/audit-transactional-import-validation.yml`
- commit `36cb05b99fe150d52ddea518010e84246195a898`
- read-only permissions
- trigger path: `repair-staging/import-transaction/RUN_REPRO`
- runs only `node qa/transactional-import-validation-contract.mjs`

Production behavior/data has NOT been modified in this chunk.

## ACCEPTANCE CONTRACT FOR FUTURE IMPLEMENTATION
A valid workbook must preserve current successful import behavior.
An invalid workbook must be rejected BEFORE live-state replacement when any of these are found:
- mismatched menu
- invalid exclude
- duplicate rule
- no replacement options for a multi-ingredient exclusion

On rejection:
- preserve prior `originalMenu`, `menuCategories`, `replaceUseRules`, `allIngredientsList`
- no partial commit
- show concise actionable error summary instead of success
- reuse `qa/import-data-integrity-audit.mjs` rules rather than inventing new integrity semantics
- do not modify `recipe_master.json`

## DO NOT REPEAT
- do not reopen Phase 1 visual work
- do not revisit blocked raw shrimp credit provenance without new authoritative evidence
- do not recreate shrimp repair workflow/staging
- do not recreate/rerun the closed bundled-data import audit
- do not modify bundled production data for this runtime import-safety item
- do not add the new transactional contract to permanent UI QA until production implementation makes it pass

## EXACT NEXT ACTION — THIS REPRO CHUNK ONLY
1. Create `repair-staging/import-transaction/RUN_REPRO` as the final trigger write.
2. Identify the resulting `Audit transactional import validation` run.
3. Read the result once.
4. Expected current failure: audit helper cases pass, then structural assertion fails because validation gate is absent before live-state assignment.
5. Persist exact run/job/error as root-gap evidence.
6. STOP before production implementation.

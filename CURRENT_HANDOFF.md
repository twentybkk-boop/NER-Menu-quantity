# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + durable artifacts + latest user review.

## SHORT-CHUNK EXECUTION POLICY
- ONE chunk = ONE milestone by default.
- Re-read current `main` + this handoff at the start of every chunk.
- Do not reopen DONE / ACCEPTED work.
- Persist a checkpoint at each meaningful milestone.
- STOP after checkpoint unless the user explicitly asks to continue through multiple milestones.

## LOCKED / ACCEPTED
- Phase 1 visual/UAT V4 UAT-001–UAT-014 ACCEPTED / FROZEN.
- Multi-item shrimp pooling ACCEPTED / VERIFIED.
- Bundled import-data integrity audit CLEAN / CLOSED / CLEANUP COMPLETE.
- Transactional Excel import validation ACCEPTED / CLEANUP COMPLETE.
- Matrix Numeric Edit Validation VERIFIED / CLEANUP COMPLETE.
  - production `a08aeffa80f5de25fd71b222af4997a4b7c38d53`
  - permanent `qa/matrix-edit-validation-contract.mjs`
  - UI QA run `36131840880` / run 161 completed/success
- raw-current shrimp credits remain BLOCKED because no authoritative current raw source exists; do not infer or restart source searches without new evidence.

## CURRENT WORK HEAD — STARTUP RECIPE MASTER RUNTIME INTEGRITY GATE

### Discovery evidence
Startup `loadData()` fetches `recipe_master.json`, checks only HTTP/JSON and truthiness of `baseMenu` / `replaceRules`, then immediately assigns candidate data to:
- `originalMenu`
- `menuCategories`
- `replaceUseRules`
- `allIngredientsList`

It then calls `initMenus()` and `renderMatrixTable()`.

Browser production already contains `validateImportedRecipeData(baseMenu, replaceRules)` with the established four integrity classes:
- mismatched menu
- invalid exclude
- duplicate `(menu, exclude)` rule
- multi-ingredient exclusion with no usable replacement option

That validator is currently used for Excel import but not startup `loadData()`.

## STARTUP RUNTIME REPRODUCTION — ROOT GAP VERIFIED

### Permanent targeted contract
Added:
- `qa/startup-runtime-integrity-contract.mjs`
- commit `5860149c0b4cdd3a60a311299558e3c946d4abde`

The contract extracts the actual production `loadData()` and `validateImportedRecipeData()` functions from `index.html` into a Node VM harness. It mocks `fetch()` only; it does not modify `recipe_master.json` or production runtime behavior.

Pinned cases:
- one integrity-clean valid startup payload
- mismatchedMenus
- invalidExcludes
- duplicateRules
- noOptions

Expected transactional startup contract:
- valid payload commits normally and calls menu/Matrix initialization once
- invalid payload preserves the previous live state and does not call normal successful initialization/rendering

### One-shot reproduction infrastructure
Temporary read-only workflow:
- `.github/workflows/audit-startup-runtime-integrity.yml`
- commit `e6bd2e47e9a3661eddf71a5a12bf1a36af873868`

Temporary trigger:
- `repair-staging/startup-runtime-integrity/RUN_REPRO`
- trigger commit `380e7e8c8452275238b1f75bc22f683698448a0b`

Reproduction execution:
- workflow run `36135348486`
- job `108071973557`
- completed/failure as expected
- failed step: `Run startup recipe runtime integrity contract`

### Exact observed behavior
Valid case passed before the failing invalid assertion:
- `STARTUP_RUNTIME_VALID_CASE={"initCalls":1,"matrixCalls":1}`

First invalid fixture (`mismatchedMenus`) was independently confirmed by the existing validator:
- findingCount = 1

But current `loadData()` still committed the invalid candidate and initialized it:
- committed menu names = `["เมนูทดสอบ"]`
- `initCalls = 1`
- `matrixCalls = 1`

Exact failing assertion:
`mismatchedMenus: invalid startup payload must preserve previous originalMenu`

Actual state after invalid load:
- `{ "เมนูทดสอบ": { "กุ้ง": 2, "หมูหมัก": 3 } }`

Expected preserved pre-load state:
- `{ "ข้อมูลเดิม": { "กุ้ง": 9 } }`

Conclusion: current startup runtime is not fail-closed. Integrity-invalid startup data is assigned into live application state before any established integrity validation.

The remaining invalid fixtures are already pinned in the same contract but execution stops at the first intentional failure; after production repair, the same contract must pass all four invalid classes plus the valid case.

## SCOPE BOUNDARY
This item is specifically **startup `recipe_master.json` runtime validation before live-state commit**.

It is NOT:
- a Phase 1 visual change
- a shrimp pooling change
- raw shrimp-credit provenance recovery
- an Excel import behavior change
- a Matrix numeric edit change
- a request to modify recipe/base quantities
- a request to modify `recipe_master.json`
- a new set of business integrity rules

Reuse the existing validator and existing four integrity classes. Do not invent new recipe rules.

## DO NOT REPEAT
- do not reopen accepted Phase 1 / shrimp pooling / transactional Excel / Matrix edit items
- do not rerun the old bundled data audit merely to reconfirm zero counts
- do not rerun reproduction run `36135348486` merely to reconfirm the same failure
- do not weaken `qa/startup-runtime-integrity-contract.mjs`
- do not modify `recipe_master.json` for this item
- do not invent new integrity semantics beyond the established four classes
- do not delete the temporary startup repro workflow/trigger until the production fix has passed permanent verification

## EXACT NEXT ACTION — NEXT SHORT CHUNK ONLY
Do the **Startup Recipe Master Runtime Integrity implementation chunk**:
1. Re-read current `main` + this handoff.
2. Inspect only `loadData()`, the existing browser validator/helpers, and `qa/startup-runtime-integrity-contract.mjs`.
3. Patch `loadData()` so candidate startup data is validated with the existing four-class validator BEFORE assigning any live-state variable.
4. On integrity findings, throw/reject into the existing startup error path before `initMenus()` / `renderMatrixTable()`; do not partially commit candidate state.
5. Preserve the current valid startup path exactly.
6. Do not modify `recipe_master.json`.
7. Run `qa/startup-runtime-integrity-contract.mjs`; it must pass the valid case plus all four invalid fixtures.
8. If targeted contract passes, integrate it as a permanent required UI QA step and run a fresh full UI QA.
9. Persist production commit + QA run evidence, then STOP before unrelated backlog discovery.

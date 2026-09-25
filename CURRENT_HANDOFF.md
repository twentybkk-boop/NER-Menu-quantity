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
Startup data is loaded by `loadData()` from:
- `https://raw.githubusercontent.com/twentybkk-boop/NER-Menu-quantity/main/recipe_master.json`

Current startup flow only checks:
- HTTP success
- JSON parse success
- truthiness of `data.baseMenu` and `data.replaceRules`

It then immediately commits candidate data into live state:
- `originalMenu = data.baseMenu`
- `menuCategories = data.categories || {}`
- `replaceUseRules = data.replaceRules`
- `allIngredientsList = data.ingredients || []`
- followed by `initMenus()` and `renderMatrixTable()`

There is no runtime integrity gate before those assignments.

### Existing validation logic is already available
Browser production code already has `validateImportedRecipeData(baseMenu, replaceRules)` and `hasImportValidationErrors(...)` for Excel import.
The validator covers the same established four linkage classes:
- mismatched menu
- invalid exclude
- duplicate `(menu, exclude)` rule
- multi-ingredient exclusion with no usable replacement option

`qa/import-data-integrity-audit.mjs` contains the durable equivalent contract for bundled data.

### Verified gap
`validateImportedRecipeData(...)` is called for Excel-import candidate data only; `loadData()` does not call it.
Permanent UI QA currently has no startup/bootstrap invalid-payload acceptance step.
There are no open GitHub issues providing a competing higher-priority durable item.

### Why this is independent from the closed bundled audit
The closed bundled audit proved the current committed `recipe_master.json` is clean at one checkpoint.
This new item is runtime fail-closed protection for future startup payloads. It does NOT reopen or dispute the clean audit result.

A future malformed/internally inconsistent startup payload can currently be assigned to live application state even though the exact integrity rules already exist elsewhere.

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

Reuse the existing four integrity classes; do not invent additional recipe rules in this item.

## INITIAL ACCEPTANCE CONTRACT
Valid startup payload:
- must continue to load normally
- must populate the same live state and render menus/Matrix as today

Invalid startup payload containing any established integrity finding:
- must be rejected BEFORE assigning candidate data to `originalMenu`, `menuCategories`, `replaceUseRules`, or `allIngredientsList`
- must not partially commit candidate data
- must not call normal successful menu/Matrix initialization for the invalid candidate
- must surface an honest startup data error state rather than treating internally invalid data as valid

At minimum reproduce one invalid linkage case first; preferred targeted coverage pins all four existing finding classes plus one valid case.

## DO NOT REPEAT
- do not reopen accepted Phase 1 / shrimp pooling / transactional Excel / Matrix edit items
- do not rerun the old bundled data audit merely to reconfirm zero counts
- do not revisit blocked raw shrimp credits without new authoritative evidence
- do not modify `recipe_master.json` for this item
- do not invent new data-integrity semantics beyond the existing four classes

## EXACT NEXT ACTION — NEXT SHORT CHUNK ONLY
Do a targeted **Startup Recipe Master Runtime Integrity reproduction/QA chunk**:
1. Re-read current `main` + this handoff.
2. Inspect only `loadData()`, the existing browser validator, and the smallest relevant QA harness.
3. Add a targeted failing reproduction that injects/mocks an invalid startup `recipe_master.json` payload and proves current `loadData()` accepts/commits it without the integrity gate.
4. Include one valid startup payload to prove the normal path contract.
5. Prefer browser request interception or a faithful extracted-function harness; do not alter production if reproduction can be added independently.
6. Persist exact failing assertion/root gap and STOP before production implementation.

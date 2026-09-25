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

## STARTUP RECIPE MASTER RUNTIME INTEGRITY — VERIFIED

### Root gap reproduction
Permanent targeted contract:
- `qa/startup-runtime-integrity-contract.mjs`
- original repro commit `5860149c0b4cdd3a60a311299558e3c946d4abde`
- harness/helper integration commit `971847b5ca4ade0d5c32dcb3920ca44285993bb0`

Pre-fix repro:
- run `36135348486`
- job `108071973557`
- completed/failure as expected
- proved integrity-invalid startup payload was committed into live state before validation
- exact first assertion: `mismatchedMenus: invalid startup payload must preserve previous originalMenu`

### Production fix
Production commit:
- `1b2248a493dfd80bd89b866ee6b13c5ce0946dd2` — `Validate startup recipe data before commit`
- changed only `index.html`

Verified behavior:
- startup candidate is validated with existing `validateImportedRecipeData(...)` before any live-state assignment
- existing `hasImportValidationErrors(...)` is used; no new business integrity classes invented
- invalid candidate throws `RECIPE_INTEGRITY` before `originalMenu`, `menuCategories`, `replaceUseRules`, or `allIngredientsList` are replaced
- invalid candidate does not call successful `initMenus()` / `renderMatrixTable()`
- invalid candidate surfaces `ข้อมูลกลางไม่สอดคล้อง (recipe_master.json)`
- normal network/basic-load error message remains unchanged
- valid startup payload preserves the previous assignment/init/render behavior
- `recipe_master.json` unchanged

Guarded repair verification:
- run `36136114418`
- patch success
- targeted startup runtime contract success
- one-file diff gate success
- bot commit/push success

Targeted contract after fix passes all pinned cases:
- valid startup payload
- mismatchedMenus
- invalidExcludes
- duplicateRules
- noOptions

### Permanent QA protection
Permanent UI QA integration:
- commit `ee5778a8cf0dffce4a12c9e170e4e7f409d3ee38` — `Add startup runtime integrity to permanent UI QA`
- required step: `Verify startup recipe runtime integrity`
- command: `node qa/startup-runtime-integrity-contract.mjs`

Fresh full verification:
- UI QA run `36136229617`
- run number 164
- head `ee5778a8cf0dffce4a12c9e170e4e7f409d3ee38`
- completed/success
- `Verify startup recipe runtime integrity` success
- all existing local gates success
- all existing deployed/live gates success
- contact-sheet evidence rendering success
- screenshot/evidence upload success

Conclusion: Startup Recipe Master Runtime Integrity is VERIFIED and permanently protected.

### Temporary infrastructure — CLEANUP PENDING
Repro temporary artifacts still present:
- `.github/workflows/audit-startup-runtime-integrity.yml`
- `repair-staging/startup-runtime-integrity/RUN_REPRO`

Repair temporary artifacts still present:
- `.github/workflows/repair-startup-runtime-integrity.yml`
- `repair-staging/startup-runtime-integrity/RUN_FIX`

Permanent protection that MUST remain:
- `qa/startup-runtime-integrity-contract.mjs`
- `Verify startup recipe runtime integrity` in `.github/workflows/ui-qa.yml`
- production startup validation in `index.html`

## SCOPE BOUNDARY / DO NOT REOPEN
Do not reopen without new defect evidence:
- Phase 1 visual work
- shrimp pooling behavior
- bundled import-data integrity
- transactional Excel import validation
- Matrix numeric edit validation
- startup recipe runtime integrity behavior

Do not revisit blocked raw shrimp-credit provenance without new authoritative evidence.
Do not modify `recipe_master.json` for startup integrity work.
Do not invent new integrity classes beyond the established four.
Do not rerun old repro/repair runs merely to reconfirm accepted evidence.
Do not weaken permanent startup integrity regression coverage.

## EXACT NEXT ACTION — NEXT SHORT CHUNK ONLY
Do startup temporary-artifact cleanup only:
1. Re-read current `main` + this handoff.
2. Delete workflow first, then trigger, for repro artifacts:
   - `.github/workflows/audit-startup-runtime-integrity.yml`
   - `repair-staging/startup-runtime-integrity/RUN_REPRO`
3. Delete workflow first, then trigger, for repair artifacts:
   - `.github/workflows/repair-startup-runtime-integrity.yml`
   - `repair-staging/startup-runtime-integrity/RUN_FIX`
4. Verify `qa/startup-runtime-integrity-contract.mjs` remains.
5. Verify permanent UI QA step `Verify startup recipe runtime integrity` remains.
6. Persist `VERIFIED / CLEANUP COMPLETE` checkpoint and STOP before unrelated backlog discovery.

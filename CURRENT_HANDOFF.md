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

## STARTUP RECIPE MASTER RUNTIME INTEGRITY — IMPLEMENTED / FULL QA IN PROGRESS

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

Implementation behavior:
- after HTTP/JSON/basic presence checks, startup candidate is passed to existing `validateImportedRecipeData(data.baseMenu, data.replaceRules)`
- `hasImportValidationErrors(...)` is evaluated before any live-state assignment
- integrity-invalid candidate throws `RECIPE_INTEGRITY` before assignments / `initMenus()` / `renderMatrixTable()`
- integrity error surfaces an honest Thai startup state: `ข้อมูลกลางไม่สอดคล้อง (recipe_master.json)`
- network/basic-load errors preserve the previous existing startup error message
- valid startup path keeps the original assignment/init/render order after the new gate
- `recipe_master.json` unchanged

Guarded repair verification:
- repair run `36136114418`
- patch step success
- `qa/startup-runtime-integrity-contract.mjs` success
- one-file diff gate success
- bot commit/push success

Targeted contract after fix passes:
- valid payload commits and initializes exactly once
- invalid `mismatchedMenus` preserves previous state and does not initialize/render
- invalid `invalidExcludes` preserves previous state and does not initialize/render
- invalid `duplicateRules` preserves previous state and does not initialize/render
- invalid `noOptions` preserves previous state and does not initialize/render
- invalid cases surface the honest integrity error state

### Permanent QA integration
Permanent UI QA commit:
- `ee5778a8cf0dffce4a12c9e170e4e7f409d3ee38` — `Add startup runtime integrity to permanent UI QA`
- required step: `Verify startup recipe runtime integrity`
- command: `node qa/startup-runtime-integrity-contract.mjs`

Fresh full UI QA:
- run `36136229617`
- run number 164
- head `ee5778a8cf0dffce4a12c9e170e4e7f409d3ee38`
- currently in progress at latest checkpoint
- new startup gate is step 21

### Temporary infrastructure — DO NOT CLEAN YET
Repro temporary artifacts still present:
- `.github/workflows/audit-startup-runtime-integrity.yml`
- `repair-staging/startup-runtime-integrity/RUN_REPRO`

Repair temporary artifacts still present:
- `.github/workflows/repair-startup-runtime-integrity.yml`
- `repair-staging/startup-runtime-integrity/RUN_FIX`

Do not remove these until fresh full UI QA run 164 is completed/success and VERIFIED checkpoint is persisted.

## SCOPE BOUNDARY / DO NOT REOPEN
Do not reopen without new defect evidence:
- Phase 1 visual work
- shrimp pooling behavior
- bundled import-data integrity
- transactional Excel import validation
- Matrix numeric edit validation

Do not revisit blocked raw shrimp-credit provenance without new authoritative evidence.
Do not modify `recipe_master.json` for startup integrity work.
Do not invent new integrity classes; startup uses the already-established four classes only.
Do not rerun old repro run `36135348486` merely to reconfirm the same failure.
Do not weaken `qa/startup-runtime-integrity-contract.mjs`.

## EXACT NEXT ACTION
Continue the current verification milestone only:
1. Follow existing UI QA run `36136229617`; do not create a duplicate run.
2. Confirm required step `Verify startup recipe runtime integrity` succeeds.
3. Require final run conclusion `completed/success`, including existing local/deployed gates and evidence upload.
4. If success, persist `STARTUP RECIPE MASTER RUNTIME INTEGRITY = VERIFIED` with run/commit evidence.
5. STOP before unrelated backlog discovery.
6. Cleanup of the four temporary startup repro/repair artifacts is a separate next chunk after verification; keep permanent contract + permanent UI QA step.

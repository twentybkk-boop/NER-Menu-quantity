# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + durable artifacts + latest user review.

## CURRENT PROJECT STATUS — DONE FOR CURRENT BUGFIX SCOPE
User confirmed on 2026-09-25 that real usage appears okay and the goal is simply to have the known bugs fixed.

Therefore:
- current implementation is considered DONE for the present bugfix / production-hardening scope
- STOP proactive backlog discovery
- do not search for speculative defects merely to create more work
- resume only when there is concrete new bug evidence from real usage, a failed permanent QA gate, an authoritative data source for the blocked raw-credit item, or an explicit new feature/requirement from the user
- all accepted/verified items below remain closed unless new defect evidence directly contradicts them

## SHORT-CHUNK EXECUTION POLICY
- ONE chunk = ONE milestone by default.
- Re-read current `main` + this handoff at the start of every future work chunk.
- Do not reopen DONE / ACCEPTED work without concrete new defect evidence.
- Persist a checkpoint at each meaningful milestone.
- STOP after checkpoint unless the user explicitly asks to continue through multiple milestones.

## LOCKED / ACCEPTED / VERIFIED
### Phase 1 visual / UAT
- V4 UAT-001–UAT-014 ACCEPTED / FROZEN.

### Multi-item shrimp pooling
- ACCEPTED / VERIFIED.
- production `e3ef7945de8a4d6e708e215a65e144a2fb8aa863`
- permanent `qa/replacement-pooling-contract.mjs`
- UI QA run `36124443879` / run 155 success.
- raw-current shrimp credits remain BLOCKED because no authoritative current raw source exists; do not infer values or restart source searches without new evidence.

### Bundled import-data integrity audit
- CLEAN / CLOSED / CLEANUP COMPLETE.
- permanent diagnostic `qa/import-data-integrity-audit.mjs`
- run `36125886778` clean: all four finding counts zero.

### Transactional Excel import validation
- ACCEPTED / CLEANUP COMPLETE.
- production `e0de978f7a71f2b12dfb07c60ba4988a7e8d6dc6`
- permanent contracts:
  - `qa/transactional-import-validation-contract.mjs`
  - `qa/transactional-import-ui-contract.mjs`
- permanent local/deployed UI QA coverage remains.
- UI QA run `36129243341` / run 159 success.
- user accepted deployed/live phone + desktop evidence on 2026-09-25.

### Matrix Numeric Edit Validation
- VERIFIED / CLEANUP COMPLETE.
- production `a08aeffa80f5de25fd71b222af4997a4b7c38d53`
- permanent `qa/matrix-edit-validation-contract.mjs`
- permanent step `Verify Matrix numeric edit validation`
- UI QA run `36131840880` / run 161 success.

## STARTUP RECIPE MASTER RUNTIME INTEGRITY — VERIFIED / CLEANUP COMPLETE

### Root gap reproduced
Permanent targeted contract:
- `qa/startup-runtime-integrity-contract.mjs`
- original repro commit `5860149c0b4cdd3a60a311299558e3c946d4abde`
- harness/helper integration `971847b5ca4ade0d5c32dcb3920ca44285993bb0`

Pre-fix repro:
- run `36135348486`
- job `108071973557`
- completed/failure as expected
- proved integrity-invalid startup payload was committed before validation
- first assertion: `mismatchedMenus: invalid startup payload must preserve previous originalMenu`

### Production fix
- commit `1b2248a493dfd80bd89b866ee6b13c5ce0946dd2` — `Validate startup recipe data before commit`
- changed only `index.html`
- startup candidate now uses existing `validateImportedRecipeData(...)` + `hasImportValidationErrors(...)` BEFORE any live-state assignment
- no new business integrity classes were invented
- invalid candidate throws `RECIPE_INTEGRITY` before replacing:
  - `originalMenu`
  - `menuCategories`
  - `replaceUseRules`
  - `allIngredientsList`
- invalid candidate does not run successful `initMenus()` / `renderMatrixTable()`
- invalid candidate surfaces `ข้อมูลกลางไม่สอดคล้อง (recipe_master.json)`
- valid startup payload preserves previous behavior
- `recipe_master.json` unchanged

Guarded repair run:
- `36136114418`
- targeted contract success
- one-file diff gate success
- bot commit/push success

### Permanent verification
Permanent UI QA integration:
- `ee5778a8cf0dffce4a12c9e170e4e7f409d3ee38`
- step: `Verify startup recipe runtime integrity`
- command: `node qa/startup-runtime-integrity-contract.mjs`

Fresh full verification:
- UI QA run `36136229617` / run 164
- completed/success
- startup integrity step success
- all existing local gates success
- all existing deployed/live gates success
- contact-sheet evidence success
- evidence upload success

### Cleanup completed
Removed temporary repro/repair infrastructure:
- repro workflow removed `dfe52d0dcedbde2014c512d390b30ce08250b586`
- repair workflow removed `d420ace34e6c4d5832ee2fe2f6b3e8a151fc92f5`
- `RUN_REPRO` removed `6110167e8c7566ab38fade97cd621904299b3bb0`
- `RUN_FIX` removed `b97b56b68f34fdfe0d24ca8144700d189c8c3930`

Verified permanent protection remains after cleanup:
- `qa/startup-runtime-integrity-contract.mjs`
- `Verify startup recipe runtime integrity` in `.github/workflows/ui-qa.yml`
- production startup validation in `index.html`

Conclusion: Startup Recipe Master Runtime Integrity is VERIFIED / CLEANUP COMPLETE.

## DO NOT REPEAT
- do not reopen Phase 1 visual work
- do not reopen shrimp pooling
- do not rerun bundled integrity audit just to reconfirm zero counts
- do not recreate transactional temporary workflows/triggers
- do not reopen Matrix numeric edit validation without new defect evidence
- do not recreate startup repro/repair workflows/triggers
- do not weaken permanent regression coverage
- do not modify `recipe_master.json` without authoritative business evidence
- do not revisit blocked raw shrimp-credit provenance without new authoritative evidence
- do not perform proactive independent backlog discovery while current real usage remains okay

## EXACT NEXT ACTION
No active engineering action.

Wait for one of these concrete triggers before reopening work:
1. user reports a reproducible bug from real usage
2. permanent QA fails
3. authoritative raw shrimp-credit source becomes available
4. user requests a new feature, behavior change, or release milestone

Otherwise keep the current implementation unchanged and treat the current bugfix scope as complete.

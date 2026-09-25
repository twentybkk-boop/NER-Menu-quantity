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
- Multi-item shrimp pooling ACCEPTED / VERIFIED; raw-current shrimp credits remain BLOCKED without authoritative data.
- Bundled import-data integrity audit CLEAN / CLOSED.
- Transactional Excel import validation ACCEPTED / CLEANUP COMPLETE.

## CURRENT WORK HEAD — MATRIX NUMERIC EDIT VALIDATION IMPLEMENTED / UI QA RUN 161 IN PROGRESS

### Reproduced defect
Targeted contract:
- `qa/matrix-edit-validation-contract.mjs`
- commit `b09c13e58aa29b48713a5ca145e6dafbad229b4c`

Repro workflow/run:
- `.github/workflows/audit-matrix-edit-validation.yml`
- trigger commit `0ec7b81e6be55ec6a1b9a97f56e357ca143de36b`
- run `36131405557` / job `108059265181`
- completed/failure as expected

Observed pre-fix behavior:
- `3` -> `3`, render 1
- `0.75` -> `0.75`, render 1
- `1abc` -> `1`, render 1 DEFECT
- `-5` -> `-5`, render 1 DEFECT
- `Infinity` accepted, render 1 DEFECT
- whitespace preserved prior value, render 0

### Production fix — IMPLEMENTED
Guarded repair workflow:
- `.github/workflows/repair-matrix-edit-validation.yml`
- setup commit `86d6890cf086c9fe8435abebcdbfa34b24b94dd4`
- trigger `repair-staging/matrix-edit/RUN_FIX`
- trigger commit `292db2f0d3ed91895654f2963266814add365b60`
- run `36131740293`: completed/success

Production commit:
- `a08aeffa80f5de25fd71b222af4997a4b7c38d53` — `Validate Matrix numeric edits strictly`
- exact production diff changed only `index.html`

Implementation semantics:
- cancel => no mutation
- trim prompt text
- require full-string unsigned decimal syntax
- convert with `Number(...)`
- require `Number.isFinite(...)`
- require value >= 0
- preserve raw decimal value; do not round during edit
- invalid input leaves previous value unchanged and does not re-render

Targeted contract passed inside guarded repair run before commit.

### Permanent QA integration
- `.github/workflows/ui-qa.yml` commit `7cf1dd76d002225d09f3a4674428efc8a8de93f9`
- required step added: `Verify Matrix numeric edit validation`

Fresh UI QA:
- run ID `36131840880`
- run number 161
- head `7cf1dd76d002225d09f3a4674428efc8a8de93f9`
- latest observed status: in_progress
- latest observed step: Install Playwright
- no failure evidence at this checkpoint

## SCOPE BOUNDARY
Do not broaden this item into PIN, Excel import, JSON export, recipe/base quantities, replacement business rules, Phase 1 visual work, raw shrimp-credit recovery, or `recipe_master.json` changes.

## EXACT NEXT ACTION
1. Continue only UI QA run `36131840880`; do not create a duplicate run.
2. Verify `Verify Matrix numeric edit validation` passes and all existing local/deployed gates remain green.
3. If run 161 succeeds, persist Matrix numeric edit validation as VERIFIED and STOP before unrelated backlog discovery.
4. If run 161 fails, inspect only the first failed required step before editing anything.

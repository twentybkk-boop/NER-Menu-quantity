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

## MATRIX NUMERIC EDIT VALIDATION — VERIFIED

### Reproduced pre-fix defect
Permanent regression contract:
- `qa/matrix-edit-validation-contract.mjs`
- commit `b09c13e58aa29b48713a5ca145e6dafbad229b4c`

Pre-fix repro:
- workflow `.github/workflows/audit-matrix-edit-validation.yml`
- trigger `repair-staging/matrix-edit-validation/RUN_REPRO`
- trigger commit `0ec7b81e6be55ec6a1b9a97f56e357ca143de36b`
- run `36131405557` / job `108059265181`
- completed/failure as expected

Observed pre-fix behavior:
- valid `3` -> `3`, render 1
- valid `0.75` -> `0.75`, render 1
- `1abc` -> `1`, render 1 DEFECT
- `-5` -> `-5`, render 1 DEFECT
- `Infinity` accepted, render 1 DEFECT
- whitespace preserved previous value, render 0

### Production fix
Guarded repair workflow:
- `.github/workflows/repair-matrix-edit-validation.yml`
- setup commit `86d6890cf086c9fe8435abebcdbfa34b24b94dd4`
- trigger `repair-staging/matrix-edit/RUN_FIX`
- trigger commit `292db2f0d3ed91895654f2963266814add365b60`
- run `36131740293`: completed/success

Production commit:
- `a08aeffa80f5de25fd71b222af4997a4b7c38d53` — `Validate Matrix numeric edits strictly`
- exact production diff changed only `index.html`

Implemented behavior:
- cancel => no mutation
- trim prompt value
- require complete unsigned integer/decimal syntax
- strict `Number(...)` conversion
- require `Number.isFinite(...)`
- require value >= 0
- valid decimal remains stored raw without rounding
- invalid input preserves previous value and does not re-render

### Permanent QA protection
UI QA integration:
- `.github/workflows/ui-qa.yml`
- commit `7cf1dd76d002225d09f3a4674428efc8a8de93f9`
- required step: `Verify Matrix numeric edit validation`

Fresh verification:
- UI QA run `36131840880`
- run number 161
- head `7cf1dd76d002225d09f3a4674428efc8a8de93f9`
- completed/success
- Matrix numeric edit validation step: success
- all existing local and deployed/live gates: success
- screenshot/evidence upload: success

Conclusion: Matrix numeric edit validation is VERIFIED and protected by permanent regression QA.

## SCOPE BOUNDARY / DO NOT REOPEN
Do not broaden this item into PIN, Excel import, JSON export, recipe/base quantities, replacement business rules, Phase 1 visual work, raw shrimp-credit recovery, or `recipe_master.json` changes without separate evidence.

## TEMPORARY ARTIFACTS STILL PRESENT
Cleanup is intentionally deferred to the next short chunk:
- `.github/workflows/audit-matrix-edit-validation.yml`
- `.github/workflows/repair-matrix-edit-validation.yml`
- `repair-staging/matrix-edit-validation/RUN_REPRO`
- `repair-staging/matrix-edit/RUN_FIX`

Keep permanently:
- `qa/matrix-edit-validation-contract.mjs`
- `Verify Matrix numeric edit validation` step in `.github/workflows/ui-qa.yml`

## EXACT NEXT ACTION — NEXT SHORT CHUNK ONLY
Cleanup Matrix numeric edit temporary artifacts only:
1. Re-read current `main` + this handoff.
2. Delete the four temporary workflow/trigger files listed above.
3. Verify permanent contract and permanent UI QA step remain present.
4. Persist cleanup-complete checkpoint and STOP before unrelated backlog discovery.

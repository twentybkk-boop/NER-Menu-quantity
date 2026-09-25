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
- raw-current shrimp credits remain BLOCKED because no authoritative current raw source exists; do not infer or restart source searches without new evidence.
- Bundled import-data integrity audit CLEAN / CLOSED / CLEANUP COMPLETE.
- Transactional Excel import validation ACCEPTED / CLEANUP COMPLETE.

## MATRIX NUMERIC EDIT VALIDATION — VERIFIED / CLEANUP COMPLETE

### Reproduced defect
Permanent regression contract:
- `qa/matrix-edit-validation-contract.mjs`
- commit `b09c13e58aa29b48713a5ca145e6dafbad229b4c`

Pre-fix repro:
- run `36131405557` / job `108059265181`
- completed/failure as expected
- proved current `parseFloat()` behavior accepted invalid Matrix quantity edits such as `1abc`, `-5`, and `Infinity`

### Production fix
Production commit:
- `a08aeffa80f5de25fd71b222af4997a4b7c38d53` — `Validate Matrix numeric edits strictly`
- changed only `index.html`

Verified behavior:
- cancel => no mutation
- whitespace => reject
- partial numeric text such as `1abc` => reject
- negative => reject
- non-finite such as `Infinity` => reject
- valid integer => accepted exactly
- valid decimal => accepted with raw decimal precision preserved
- rejected edit does not re-render
- no rounding during direct Matrix editing

### Permanent QA protection
UI QA integration:
- commit `7cf1dd76d002225d09f3a4674428efc8a8de93f9`
- permanent required step: `Verify Matrix numeric edit validation`

Fresh verification:
- UI QA run `36131840880`
- run number 161
- completed/success
- Matrix numeric edit validation step success
- all existing local and deployed/live gates success
- evidence upload success

### Cleanup complete
Temporary one-shot artifacts removed after verification:
- `.github/workflows/audit-matrix-edit-validation.yml`
  - removed at `e96579def89cbdbc34c0ae93e0c9fae4f0bf4ca8`
- `.github/workflows/repair-matrix-edit-validation.yml`
  - removed at `70c8ac37a8a673fa64f8f27c303275ed95edc119`
- `repair-staging/matrix-edit-validation/RUN_REPRO`
  - removed at `f3ec10e59bdeae21572e0c353fbee602710442bd`
- `repair-staging/matrix-edit/RUN_FIX`
  - removed at `1a65d4c2df3e90b895279524bdd51946aa78e614`

Permanent regression protection remains:
- `qa/matrix-edit-validation-contract.mjs`
- `Verify Matrix numeric edit validation` step in `.github/workflows/ui-qa.yml`

Conclusion: Matrix Numeric Edit Validation is VERIFIED, permanently protected, and temporary repair/repro infrastructure is cleaned up.

## SCOPE BOUNDARY / DO NOT REOPEN
Do not reopen without new defect evidence:
- Phase 1 visual work
- shrimp pooling behavior
- bundled import-data integrity
- transactional Excel import validation
- Matrix numeric edit validation

Do not revisit blocked raw shrimp-credit provenance without new authoritative evidence.
Do not recreate deleted one-shot Matrix workflows/triggers merely to reconfirm the accepted fix.
Do not modify `recipe_master.json` without explicit new source evidence.

## EXACT NEXT ACTION — NEXT SHORT CHUNK ONLY
Do independent backlog discovery only:
1. Re-read current `main` + this handoff.
2. Inspect durable repo/project context for the next product/runtime item with concrete evidence.
3. Exclude all accepted/closed items listed above and the blocked raw shrimp-credit provenance task.
4. Select exactly one independent backlog item.
5. Do NOT modify production in the discovery chunk.
6. Persist evidence, scope boundary, and exact next action.
7. STOP before implementation.

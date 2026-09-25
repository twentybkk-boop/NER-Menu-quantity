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
  - production `e0de978f7a71f2b12dfb07c60ba4988a7e8d6dc6`
  - UI QA run `36129243341` / run 159 success
  - permanent transactional regression/browser coverage remains in repo

## CURRENT WORK HEAD — MATRIX NUMERIC EDIT VALIDATION REPRO SETUP COMPLETE / TRIGGER PENDING

### Verified production gap candidate
Current `editMatrixCell(rowIndex, ingredient, currentValue)` uses permissive `parseFloat(newVal)` as its only numeric gate, then writes the parsed result directly into `row.replace[ingredient]`.

Potential invalid behaviors pinned for reproduction:
- `1abc` can be accepted as `1`
- `-5` can be stored as a negative replacement quantity
- `Infinity` can be stored as a non-finite replacement quantity
- whitespace-only input is expected to remain rejected

Valid behavior that must remain supported:
- integer input
- decimal input with raw decimal precision preserved
- no rounding during Matrix editing

### Targeted reproduction contract — DURABLE
File:
- `qa/matrix-edit-validation-contract.mjs`

Commit:
- `b09c13e58aa29b48713a5ca145e6dafbad229b4c`

Contract design:
- reads production `index.html`
- extracts the actual current `editMatrixCell()` function body
- executes that exact function in a Node `vm` with controlled `prompt()`, `replaceUseRules`, and `renderMatrixTable()` globals
- verifies valid integer `3` stores `3`
- verifies valid decimal `0.75` stores raw `0.75`
- requires invalid `1abc`, `-5`, `Infinity`, and whitespace to leave prior value `2.5` unchanged and not re-render
- logs all observed results before assertions so a failing run preserves exact behavior evidence

### One-shot read-only repro workflow — DURABLE
File:
- `.github/workflows/audit-matrix-edit-validation.yml`

Commit:
- `cd5ba6b60cf15c51a6f2c6aaa2a5da04ad1d2c28`

Trigger path:
- `repair-staging/matrix-edit-validation/RUN_REPRO`

Workflow is read-only and only runs:
- `node qa/matrix-edit-validation-contract.mjs`

Production `index.html` and `recipe_master.json` have NOT been modified in this reproduction chunk.

## SCOPE BOUNDARY
This item is only direct Matrix cell numeric edit validation.
Do not broaden into:
- PIN behavior
- Excel import behavior
- JSON export behavior
- recipe/base quantity changes
- replacement business-rule changes
- Phase 1 visual work
- raw shrimp-credit recovery

## DO NOT REPEAT
- do not reopen accepted Phase 1 / shrimp pooling / transactional import work
- do not modify `recipe_master.json`
- do not implement the Matrix fix before exact repro evidence is persisted

## EXACT NEXT ACTION — THIS SHORT CHUNK
1. Create `repair-staging/matrix-edit-validation/RUN_REPRO` as the final setup write.
2. Identify the resulting `Audit Matrix numeric edit validation` run.
3. Read the run once; if failed, inspect only the failed contract job/log.
4. Persist exact observed mutation(s) and failing assertion/root gap.
5. STOP before production implementation.

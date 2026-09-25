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

## CURRENT WORK HEAD — MATRIX NUMERIC EDIT VALIDATION ROOT GAP REPRODUCED

### Production code under test
Current `editMatrixCell(rowIndex, ingredient, currentValue)` uses `parseFloat(newVal)` as its numeric gate and then stores the parsed value directly into `row.replace[ingredient]`.

No production behavior was changed in the reproduction chunk.

### Targeted reproduction contract
File:
- `qa/matrix-edit-validation-contract.mjs`

Commit:
- `b09c13e58aa29b48713a5ca145e6dafbad229b4c`

The contract reads `index.html`, extracts the actual production `editMatrixCell()` function, and executes that exact function inside Node `vm` with controlled `prompt()`, `replaceUseRules`, and `renderMatrixTable()` globals.

### One-shot repro workflow
File:
- `.github/workflows/audit-matrix-edit-validation.yml`

Setup commit:
- `cd5ba6b60cf15c51a6f2c6aaa2a5da04ad1d2c28`

Trigger:
- `repair-staging/matrix-edit-validation/RUN_REPRO`
- trigger commit `0ec7b81e6be55ec6a1b9a97f56e357ca143de36b`

Run:
- workflow `Audit Matrix numeric edit validation`
- run ID `36131405557`
- run number 1
- status completed
- conclusion failure
- job ID `108059265181`
- failed step: `Run Matrix numeric edit validation contract`

### Exact runtime observations from the failing run
The contract logged all cases before asserting:
- valid integer `3` -> stored value `3`, `renders=1`
- valid decimal `0.75` -> stored value `0.75`, `renders=1`
- mixed text `1abc` -> stored value `1`, `renders=1` **DEFECT**
- negative `-5` -> stored value `-5`, `renders=1` **DEFECT**
- `Infinity` -> accepted and `renders=1` **DEFECT**
  - the observation log serializes that non-finite value as `null` because `JSON.stringify(Infinity)` is `null`; the render count confirms the production edit path accepted the input
- whitespace-only input -> prior value `2.5` preserved, `renders=0` (already rejected correctly)

Exact first failing assertion:
- `mixedText: invalid Matrix numeric edit must leave the previous value unchanged`
- actual `1`
- expected `2.5`

Conclusion: this is a reproduced production validation defect, not a test-harness/setup failure.

## IMPLEMENTATION CONTRACT FOR NEXT CHUNK
Fix only direct Matrix numeric edit parsing/validation.

Required behavior:
- valid integer remains accepted and stored exactly
- valid decimal remains accepted and raw decimal precision is preserved
- invalid input leaves previous value unchanged
- rejected input does not call `renderMatrixTable()`
- reject partial numeric strings such as `1abc`
- reject negative values
- reject non-finite values such as `Infinity`
- whitespace-only input remains rejected
- do not round during editing

Preferred minimal validation semantics:
1. trim prompt string
2. require a complete numeric representation, not a numeric prefix
3. convert with strict numeric conversion
4. require `Number.isFinite(value)`
5. require `value >= 0`
6. only then write to `row.replace[ingredient]` and re-render

Preserve cancel behavior (`prompt()` returns `null` => no mutation).

## SCOPE BOUNDARY
Do not broaden this item into:
- PIN behavior
- Excel import behavior
- JSON export behavior
- recipe/base quantity changes
- replacement business-rule changes
- Phase 1 visual work
- raw shrimp-credit recovery
- `recipe_master.json` modification

## DO NOT REPEAT
- do not rerun run `36131405557` merely to reconfirm the defect
- do not recreate the reproduction setup
- do not reopen accepted Phase 1 / shrimp pooling / transactional import work
- do not modify bundled production data

## EXACT NEXT ACTION — NEXT SHORT CHUNK ONLY
Implement the minimal Matrix numeric edit validation fix:
1. Re-read current `main` + this handoff.
2. Patch only the Matrix numeric edit parsing/validation path in `index.html`.
3. Make `qa/matrix-edit-validation-contract.mjs` pass without weakening its invalid-input assertions.
4. Add the contract to permanent UI QA if the production fix passes targeted verification.
5. Run fresh QA as a separate milestone if needed; do not broaden scope.
6. Persist implementation result/checkpoint and STOP before unrelated backlog discovery.

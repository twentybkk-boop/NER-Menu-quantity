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
### Phase 1 visual / UAT
- V4 UAT-001–UAT-014 ACCEPTED / FROZEN.
- do not reopen visual/background/character/layout work absent new concrete regression evidence.

### Multi-item shrimp pooling
- ACCEPTED / VERIFIED.
- production fix `e3ef7945de8a4d6e708e215a65e144a2fb8aa863`
- permanent contract `qa/replacement-pooling-contract.mjs`
- UI QA run `36124443879` / run 155 success.
- raw-current shrimp credits remain BLOCKED because no authoritative current raw source exists; do not infer values or restart source searches without new evidence.

### Bundled import-data integrity audit
- CLEAN / CLOSED / CLEANUP COMPLETE.
- durable diagnostic `qa/import-data-integrity-audit.mjs`
- run `36125886778`: `mismatchedMenus=0`, `invalidExcludes=0`, `duplicateRules=0`, `noOptions=0`.

### Transactional Excel import validation
- ACCEPTED / CLEANUP COMPLETE.
- production commit `e0de978f7a71f2b12dfb07c60ba4988a7e8d6dc6`
- permanent contracts:
  - `qa/transactional-import-validation-contract.mjs`
  - `qa/transactional-import-ui-contract.mjs`
- permanent local/deployed steps remain in `.github/workflows/ui-qa.yml`
- UI QA run `36129243341` / run 159 completed/success
- user accepted deployed/live phone + desktop error/success evidence on 2026-09-25

## CURRENT WORK HEAD — NEXT BACKLOG IDENTIFIED: MATRIX NUMERIC EDIT VALIDATION

### Discovery evidence
Current production `editMatrixCell(rowIndex, ingredient, currentValue)` uses:
- `prompt(...)`
- then only checks `!Number.isNaN(parseFloat(newVal))`
- then stores `parseFloat(newVal)` directly into `row.replace[ingredient]`

This means the Matrix editor can accept malformed or invalid quantity input that should not become recipe data, including examples such as:
- `1abc` -> silently becomes `1`
- `-5` -> negative replacement quantity is stored
- `Infinity` -> non-finite quantity is stored because `parseFloat('Infinity')` is not `NaN`

This is concrete bug evidence in current business runtime and therefore qualifies for work without changing accepted Matrix semantics by guesswork.

### Existing QA gap
Permanent `qa/ui-qa.mjs` currently verifies the manager/PIN/Matrix path only at the level of:
- open PIN
- authenticate
- Matrix visible
- horizontal scroll geometry
- JSON download
- close Matrix

It does NOT exercise Matrix cell editing or reject invalid numeric prompt input.
No open GitHub issue currently provides a competing higher-priority durable item.

### Scope boundary
This item is specifically **validation of direct Matrix numeric cell edits**.
It is NOT:
- a Phase 1 visual change
- a raw shrimp-credit recovery task
- an Excel import change
- a change to recipe/base quantities
- a change to accepted replacement semantics
- a change to PIN or JSON export behavior
- a modification of bundled `recipe_master.json`

### Initial acceptance contract for reproduction/implementation
Valid Matrix edit input should continue to update the selected replacement quantity exactly as intended.
Invalid input must leave the previous cell value unchanged.
At minimum reject:
- empty/whitespace-only numeric text if it does not represent an intentional numeric edit
- mixed numeric/text strings such as `1abc`
- negative values
- non-finite values such as `Infinity`
- other values that are not a complete finite number

Preserve decimal support because raw replacement credits may legitimately be decimal values.
Do not round during editing; store the validated numeric value as raw numeric data exactly as current Matrix semantics require.

### Preferred validation shape to prove next
Use strict full-string numeric parsing rather than permissive `parseFloat()` prefix parsing, then require:
- finite number
- value >= 0

The next chunk must reproduce current bad acceptance before production change and pin the exact valid/invalid examples in a regression contract.

## DO NOT REPEAT
- do not reopen Phase 1 visual work
- do not revisit blocked raw shrimp credits without new authoritative evidence
- do not rerun old transactional repro/repair runs
- do not recreate deleted transactional temporary workflows/triggers
- do not modify `recipe_master.json` for this item
- do not remove permanent accepted regression/browser tests
- do not broaden this Matrix edit item into other Matrix/PIN/import/export changes without separate bug evidence

## EXACT NEXT ACTION — NEXT SHORT CHUNK ONLY
Do a targeted **Matrix Numeric Edit Validation reproduction/QA chunk**:
1. Re-read current `main` + this handoff.
2. Inspect only `editMatrixCell()` and the existing Matrix QA path.
3. Add a targeted regression/reproduction contract that demonstrates current bad behavior for at least `1abc`, `-5`, and `Infinity`, while preserving valid integers and decimals.
4. Prefer browser-level prompt interaction if practical; otherwise add a structural/pure validation contract first.
5. Do NOT change production behavior in the reproduction chunk if the failing contract can be added independently.
6. Persist the exact failing assertion/root gap and STOP before implementation.

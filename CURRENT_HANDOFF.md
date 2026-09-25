# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + durable artifacts.

## SHORT-CHUNK EXECUTION POLICY
- ONE chunk = ONE milestone only.
- Re-read current `main` + this handoff at the start of every chunk.
- Do not reopen DONE / ACCEPTED work.
- Persist a checkpoint at the end of each chunk.
- STOP after checkpoint; do not chain the next major milestone in the same session.

## LOCKED / ACCEPTED
- Phase 1 visual/UAT V4 UAT-001–UAT-014 is ACCEPTED / FROZEN.
- Multi-item shrimp pooling calculation is ACCEPTED / VERIFIED.
  - production fix `e3ef7945de8a4d6e708e215a65e144a2fb8aa863`
  - permanent regression contract `qa/replacement-pooling-contract.mjs`
  - UI QA run `36124443879` / run 155: completed/success
- raw-current shrimp credits remain BLOCKED because no authoritative current raw source exists.
- DO NOT infer missing decimal credits, migrate the old decimal matrix wholesale, or reopen Drive/Gmail/source searches without new evidence.

## IMPORT DATA INTEGRITY AUDIT — CLEAN / CLOSED / CLEANUP COMPLETE
- durable diagnostic: `qa/import-data-integrity-audit.mjs`
- run `36125886778` / job `108041781453`: success
- exact counts: `mismatchedMenus=0`, `invalidExcludes=0`, `duplicateRules=0`, `noOptions=0`
- no production patch justified
- one-shot workflow removed at `e9f78028fee57dd11d2a26a075939995c2ec0e51`
- trigger removed at `040c3c3ed02fe103a3316056ade56ffbcce56699`

## NEXT INDEPENDENT BACKLOG ITEM — TRANSACTIONAL EXCEL IMPORT VALIDATION
Recovered prior agreed requirement: protect runtime Excel import from ingredient/menu linkage errors before imported data replaces the currently loaded live state.

### Existing behavior already present
Current `index.html` already canonicalizes known ingredient aliases during Excel import:
- `ปลากหมึก` -> `ปลาหมึก`
- `เนื้อเสื้อร้องให้สไลซ์` -> `เนื้อเสือร้องไห้สไลซ์`

Both `Original menu` headers and `Replace Use` ingredient/exclude names pass through `canonicalIngredientName()`.

### Verified remaining gap
The Excel import path currently:
1. parses `Original menu` into `newOriginalMenu` / `newMenuCategories`
2. parses `Replace Use` into `newReplaceRules`
3. immediately assigns:
   - `originalMenu = newOriginalMenu`
   - `menuCategories = newMenuCategories`
   - `replaceUseRules = newReplaceRules`
   - `allIngredientsList = repIngredientsList`
4. re-renders and shows `อัปโหลดและแปลงข้อมูลสำเร็จ!`

There is no validation gate between parse and state replacement for:
- replacement rule menu missing from parsed base menu
- exclude item missing from that menu's parsed base recipe
- duplicate `(menu, exclude)` replacement rows
- exclusion ending with no replacement option overlapping the parsed base ingredients

The closed import-data audit proved bundled current `recipe_master.json` is clean, but it does NOT protect future user-supplied Excel imports.

### Scope boundary
This backlog item is specifically runtime import safety. It is NOT:
- a Phase 1 visual change
- a raw shrimp-credit data recovery task
- a request to change recipe/base quantities
- a request to alter accepted Matrix/PIN/export semantics
- a re-run of the already-clean bundled-data audit

Do not modify `recipe_master.json` for this item.

### Acceptance contract for implementation chunk
A valid workbook must preserve the current successful import behavior.
An invalid workbook must be rejected BEFORE replacing live state when any of these are found:
- mismatched menu
- invalid exclude
- duplicate rule
- no replacement options for a multi-ingredient exclusion

On rejection:
- keep the previously loaded `originalMenu`, `menuCategories`, `replaceUseRules`, and `allIngredientsList` unchanged
- show a concise actionable error summary instead of success
- do not partially commit imported data

Reuse the logic/contract from `qa/import-data-integrity-audit.mjs` rather than inventing new integrity rules.

## DO NOT REPEAT
- do not reopen Phase 1 visual work
- do not revisit blocked raw shrimp credit provenance without new authoritative evidence
- do not recreate shrimp repair workflow/staging
- do not recreate/rerun the closed import-integrity one-shot audit merely to reconfirm zero counts
- do not recreate deleted one-shot import audit workflow/trigger
- do not modify bundled production data for this runtime import-safety item

## EXACT NEXT ACTION — NEXT SHORT CHUNK ONLY
Do one implementation-planning/reproduction chunk for **Transactional Excel Import Validation**:
1. Re-read current `main` + this handoff.
2. Inspect only the Excel import handler and `qa/import-data-integrity-audit.mjs`.
3. Create targeted regression coverage that proves invalid parsed data is detected before live-state assignment and valid parsed data remains accepted.
4. Do NOT change production behavior yet if the regression harness can be added independently; persist the exact failing contract/root gap and STOP.
5. If a minimal production change is required to make the logic testable, checkpoint the planned interface first and keep the production edit for the following chunk.

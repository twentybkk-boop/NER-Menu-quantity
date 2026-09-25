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

## TRANSACTIONAL EXCEL IMPORT VALIDATION — ACCEPTED / CLEANUP COMPLETE
User reviewed the deployed/live desktop + phone error/success screenshots from run 159 and accepted the feature (`โอเค ทำต่อ`) on 2026-09-25.

### Production implementation
- commit `e0de978f7a71f2b12dfb07c60ba4988a7e8d6dc6` — `Add transactional Excel import validation`
- production diff changed exactly `index.html`
- `recipe_master.json` unchanged

Behavior now protected:
- parsed workbook candidates are validated before any live-state assignment
- invalid workbook is rejected before replacing `originalMenu`, `menuCategories`, `replaceUseRules`, or `allIngredientsList`
- invalid import shows an actionable Thai Matrix status banner
- previous live Matrix remains intact after rejection
- valid workbook commits only after validation and preserves the existing success alert
- known ingredient alias normalization remains unchanged

### Permanent regression / browser acceptance
Keep permanently:
- `qa/transactional-import-validation-contract.mjs`
- `qa/transactional-import-ui-contract.mjs`
- permanent local/deployed transactional steps in `.github/workflows/ui-qa.yml`

Fresh accepted QA:
- UI QA run `36129243341` / run 159
- head `41a975495c759ff3e9f41fa6439e654df1b772e2`
- completed/success
- transactional structure step: success
- transactional local actual-XLSX browser step: success
- transactional deployed/live actual-XLSX browser step: success
- all previously accepted local/deployed gates: success
- artifact `ui-qa-screenshots` ID `10861246503`

### Accepted real-screen evidence
Local/live pairs were byte-identical.
- error desktop: 1280x900, SHA256 `03e699d20fc2576eeb6eed87684b508ead4fe100d1df1d59de95ad40e9733f32`
- error phone: 390x844, SHA256 `a659a33ed4a3ede3c4694412f6d085dc8f0b94c7f4b32d63073917b7183db3ac`
- success desktop: 1280x900, SHA256 `e8809082aca407b5497e89be2121490c257d9f6323e53beac5e4b099e41b5057`
- success phone: 390x844, SHA256 `e3fbfbb272494a3a91f17be2657622eb08eeeb3c8c3a8aa4d303d896b0e8b2c8`

### Temporary repro/repair cleanup — COMPLETE
Removed after user acceptance:
- `.github/workflows/audit-transactional-import-validation.yml` — cleanup commit `9711fa5f0db519c066f874911df5cbe0eec1997b`
- `.github/workflows/repair-transactional-import-validation.yml` — cleanup commit `39cde1ea25f94fec160b5a67b8b4125bd03114b7`
- `repair-staging/import-transaction/RUN_REPRO` — cleanup commit `f822f9a2b47f42d8aba01f5dcbf770759a0f7b2d`
- `repair-staging/import-transaction/RUN_FIX` — cleanup commit `56bc8037fc2b07068eeccc17e48b6c38c0e7b413`

Do not recreate those temporary workflows/triggers unless a future independent reproduction explicitly requires a new one.

## DO NOT REPEAT
- do not reopen Phase 1 visual work
- do not revisit blocked raw shrimp credits without new authoritative evidence
- do not rerun old transactional repro/repair runs merely to reconfirm accepted behavior
- do not modify `recipe_master.json` for the accepted transactional import item
- do not remove permanent transactional regression/browser tests

## EXACT NEXT ACTION — NEXT SHORT CHUNK ONLY
Discover the next independent durable backlog/product item from current repo source of truth.
1. Re-read current `main` + this handoff.
2. Inspect only durable repo context: recent commits, README/docs, permanent QA inventory, business/runtime markers, and open issues if any.
3. Exclude all locked/accepted/blocked work listed above.
4. Identify one concrete item with durable evidence; do not invent scope.
5. Do NOT modify production in the discovery chunk.
6. Persist scope + evidence + exact next action, then STOP.

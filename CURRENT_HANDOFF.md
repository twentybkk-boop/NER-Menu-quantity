# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — SHRIMP POOLING CALCULATION FIX IMPLEMENTED / UI QA RUN 155 IN PROGRESS

Phase 1 visual/UAT work remains ACCEPTED / COMPLETE and frozen.

## PRODUCT REQUIREMENT / ACCEPTANCE CONTRACT
For several excluded items replaced by shrimp, aggregate RAW decimal shrimp credits first and floor once at the end.
- `0.4 + 0.7 = 1.1` => add `1` shrimp
- `0.8 + 0.8 = 1.6` => add `1` shrimp, not `2`
- do not round source rows before pooling
- do not invent replacement quantities
- existing bundled integer replacement behavior must stay unchanged

## VERIFIED ROOT CAUSE
Old `calculateNetRecipe()` added shrimp replacement credit into base shrimp first, then `Math.round()`ed the combined total. Example base `3` + pooled credit `1.6` became `5`; contract requires `3 + floor(1.6) = 4`.

## IMPLEMENTATION — COMPLETE
Production commit:
- `e3ef7945de8a4d6e708e215a65e144a2fb8aa863` — `Fix multi-item shrimp pooling calculation`
- changed exactly one file: `index.html`

Implementation:
- new pure helper `floorPooledShrimpCredit(rawTotal)`
- separate `pooledShrimpCredit` accumulator
- selected shrimp replacement amounts remain raw during aggregation
- `Math.floor()` applied exactly once to pooled shrimp contribution
- floored contribution then added to base shrimp
- non-shrimp replacement accumulation path unchanged
- current bundled integer shrimp credits keep identical results (`floor(1)=1`, etc.)

One-shot verification:
- first workflow attempt run `36124185308` failed before jobs because embedded multiline JS broke YAML indentation; production untouched
- workflow serialization fix commit `fbabcab16853900c22b01d35b9b00dd7537fd626`
- successful retrigger `c141cd2af9a038f73b649e4c8e91fdc69223fdb5`
- run `36124335016` completed/success
- patch step success
- regression contract success
- one-file production diff gate success
- commit step success

Regression contract:
- `qa/replacement-pooling-contract.mjs`
- added at `486540b159195612a708f37dc1adbc7f0d75c022`
- checks `0.4+0.7 -> 1`, `0.8+0.8 -> 1`, invalid/negative inputs, separate shrimp pool, and unchanged non-shrimp accumulation path

Permanent QA integration:
- UI QA workflow commit `182af74d424c98ab2bc356a5aeb0b6cb88f3d2c4` — `Add shrimp pooling contract to UI QA`
- new required step: `Verify multi-item shrimp pooling calculation`

Fresh UI QA:
- run ID `36124443879`
- run number 155
- head `182af74d424c98ab2bc356a5aeb0b6cb88f3d2c4`
- latest observed status: in_progress
- latest observed step: Install Playwright
- no failure evidence at this checkpoint

## DATA-PRECISION BLOCKER — DO NOT GUESS
Calculation support is fixed, but current bundled `recipe_master.json` has many shrimp replacement cells already stored as integer `0`/`1`, so missing raw decimals cannot be recovered by runtime calculation.

Evidence:
- Excel import uses `parseFloat()` and can preserve raw decimals.
- historical decimal snapshot `f9dad2255a32514d3e19a8cd482756cbdfbd8d45` is a materially different matrix; do NOT migrate it wholesale.
- current-style integer matrix was uploaded wholesale at `24771d0e28577ed0f4fb386f055bde437d422b18` with no workbook/CSV/generator in that tree.
- Project/Library spreadsheet search found no authoritative raw-current workbook.

Do NOT populate missing raw shrimp credits without authoritative source data.

## PHASE 1 ACCEPTED / DO NOT REOPEN
- V4 UAT-001–UAT-010 / Chunk 1–4
- UAT-011 / UAT-012 checkpoint `c8da0558949193de8b8915ef1d106c2269b68154`
- UAT-013 / UAT-014 accepted visual work
- prior accepted UI QA run `36113051938` / run 153 success

## LOCKED BUSINESS INVARIANTS
- do not change recipe/base quantities
- do not invent replacement Matrix values
- qty=0 remains disabled / `แทนไม่ได้`
- do not alter unrelated Matrix/PIN/import-export semantics

## EXACT NEXT ACTION
1. Continue only UI QA run `36124443879`; do not create a duplicate run.
2. Verify required step `Verify multi-item shrimp pooling calculation` passes and all existing local/deployed gates remain green.
3. If run 155 succeeds, persist calculation-fix acceptance checkpoint.
4. Then continue source/provenance recovery for missing raw shrimp credits; do not modify `recipe_master.json` until an authoritative current-matrix raw source is found.

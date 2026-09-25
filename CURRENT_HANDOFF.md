# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — SHRIMP POOLING CALCULATION ACCEPTED / RAW-CREDIT SOURCE RECOVERY NEXT

Phase 1 visual/UAT work remains ACCEPTED / COMPLETE and frozen.

## PRODUCT REQUIREMENT / ACCEPTANCE CONTRACT
For several excluded items replaced by shrimp, aggregate RAW decimal shrimp credits first and floor exactly once at the end.
- `0.4 + 0.7 = 1.1` => add `1` shrimp
- `0.8 + 0.8 = 1.6` => add `1` shrimp, not `2`
- do not round source rows before pooling
- do not invent replacement quantities
- existing bundled integer replacement behavior must stay unchanged

## CALCULATION FIX — ACCEPTED / VERIFIED
Production commit:
- `e3ef7945de8a4d6e708e215a65e144a2fb8aa863` — `Fix multi-item shrimp pooling calculation`
- changed exactly one file: `index.html`

Implementation:
- `floorPooledShrimpCredit(rawTotal)`
- separate `pooledShrimpCredit` accumulator
- raw shrimp contributions aggregate before floor
- `Math.floor()` applied once to pooled shrimp contribution
- floored contribution added to base shrimp afterward
- non-shrimp accumulation unchanged
- current bundled integer shrimp credits retain identical results

Regression contract:
- `qa/replacement-pooling-contract.mjs`
- commit `486540b159195612a708f37dc1adbc7f0d75c022`
- covers `0.4+0.7 -> 1`, `0.8+0.8 -> 1`, invalid/negative handling, separate shrimp pool, unchanged non-shrimp accumulation

One-shot verification:
- failed setup run `36124185308` had no jobs because workflow YAML serialization was invalid; production remained untouched
- workflow fix `fbabcab16853900c22b01d35b9b00dd7537fd626`
- successful retrigger `c141cd2af9a038f73b649e4c8e91fdc69223fdb5`
- run `36124335016`: completed/success
- patch, regression contract, one-file diff gate, and commit steps all succeeded

Permanent UI QA integration:
- commit `182af74d424c98ab2bc356a5aeb0b6cb88f3d2c4` — `Add shrimp pooling contract to UI QA`
- required step `Verify multi-item shrimp pooling calculation`

Fresh acceptance QA:
- run ID `36124443879`
- run number 155
- head `182af74d424c98ab2bc356a5aeb0b6cb88f3d2c4`
- job `ui-qa`: completed/success
- pooling contract step: success
- all existing local and deployed/live gates: success
- evidence rendering/upload: success

Conclusion: calculation-layer pooling behavior is accepted and protected by permanent regression QA.

## REMAINING DATA-PRECISION BLOCKER — DO NOT GUESS
The calculation engine can now consume raw decimal shrimp credits correctly, but current bundled `recipe_master.json` stores many shrimp replacement cells as integer `0`/`1`, so missing raw decimals cannot be recovered by calculation alone.

Verified provenance findings:
- Excel/Matrix import uses `parseFloat()` and can preserve raw decimals.
- historical decimal `recipe_master.json` at `f9dad2255a32514d3e19a8cd482756cbdfbd8d45` proves decimals existed, but its business matrix differs materially from current and MUST NOT be migrated wholesale.
- current-style integer matrix was uploaded as a whole file at `24771d0e28577ed0f4fb386f055bde437d422b18` after the old recipe file was deleted.
- that commit tree contains only README/data/index/recipe JSON; no workbook/CSV/generator.
- Project/Library spreadsheet search found no authoritative raw-current workbook.

Do NOT populate missing raw shrimp credits without an authoritative source.

## PHASE 1 ACCEPTED / DO NOT REOPEN
- V4 UAT-001–UAT-010 / Chunk 1–4
- UAT-011 / UAT-012 checkpoint `c8da0558949193de8b8915ef1d106c2269b68154`
- UAT-013 / UAT-014 accepted visual work
- UI QA run 153 accepted before this business work
- run 155 confirms no visual/interaction regression from pooling calculation fix

## LOCKED BUSINESS INVARIANTS
- do not change recipe/base quantities
- do not invent replacement Matrix values
- qty=0 remains disabled / `แทนไม่ได้`
- do not alter unrelated Matrix/PIN/import-export semantics

## EXACT NEXT ACTION
Recover an authoritative source for the current matrix RAW shrimp replacement credits (connected source, original workbook, or other durable provenance). Compare only relevant current-style rows before writing any data. If authoritative raw credits are found, add them with explicit provenance and run end-to-end pooling acceptance. If no authoritative source exists, persist the blocker rather than fabricating values.

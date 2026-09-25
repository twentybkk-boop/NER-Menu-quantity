# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — SHRIMP POOLING CALCULATION FIX SETUP COMPLETE / TRIGGER PENDING

Phase 1 visual/UAT work remains ACCEPTED / COMPLETE and frozen.

## PRODUCT REQUIREMENT / ACCEPTANCE CONTRACT
When several excluded items are replaced by shrimp, preserve RAW decimal shrimp credits, aggregate first, then floor the pooled shrimp credit exactly once.

Acceptance examples:
- `0.4 + 0.7 = 1.1` => add `1` shrimp
- `0.8 + 0.8 = 1.6` => add `1` shrimp, not `2`
- do not round each source row first
- current single-item `qty = 0` UX remains `แทนไม่ได้` / disabled
- do not invent replacement quantities

## VERIFIED CALCULATION DEFECT
Current production `calculateNetRecipe()` adds replacement amount directly into the base quantity and then `Math.round()`s the combined total.

Example:
- base shrimp = `3`
- pooled raw shrimp credit = `1.6`
- current behavior: `round(4.6) = 5`
- required behavior: `3 + floor(1.6) = 4`

This defect is independent from missing raw-credit data.

## DATA-PRECISION BLOCKER — DO NOT GUESS
- Excel import uses `parseFloat()` and can preserve raw decimals.
- Matrix presentation rounds separately.
- bundled current `recipe_master.json` has many shrimp cells already reduced to integer `0`/`1`.
- old decimal snapshot `f9dad2255a32514d3e19a8cd482756cbdfbd8d45` is a materially different matrix; do NOT migrate it wholesale.
- current-style integer matrix was uploaded wholesale at `24771d0e28577ed0f4fb386f055bde437d422b18` after the old recipe file was deleted; its tree has no workbook/CSV/generator.
- Project/Library spreadsheet search found no authoritative raw-current workbook.

Do not populate missing raw shrimp credits without an authoritative source.

## SAFE FIX SETUP — COMPLETE
Regression contract:
- `qa/replacement-pooling-contract.mjs`
- commit `486540b159195612a708f37dc1adbc7f0d75c022`
- verifies `0.4+0.7 -> 1`, `0.8+0.8 -> 1`, invalid/negative handling, separate shrimp pool, and preservation of non-shrimp accumulation path.

One-shot workflow:
- `.github/workflows/repair-shrimp-pooling-calculation.yml`
- commit `8e28d134f27d40d8b376fed389ff39a14a662630`
- trigger path: `repair-staging/shrimp-pooling/RUN_CALC_FIX`
- exact old `calculateNetRecipe()` block must match exactly once
- patch adds `floorPooledShrimpCredit()` and a separate `pooledShrimpCredit`
- shrimp replacement contribution is floored once before adding to base shrimp
- non-shrimp replacement accumulation remains the existing behavior
- runs regression contract before commit
- requires production diff to be exactly `index.html`
- commits only `index.html`

Production `index.html` has NOT yet been modified at this checkpoint.

## PHASE 1 ACCEPTED / DO NOT REOPEN
- V4 UAT-001–UAT-010 / Chunk 1–4
- UAT-011 / UAT-012 checkpoint `c8da0558949193de8b8915ef1d106c2269b68154`
- UAT-013 portrait background
- UAT-014 landscape background
- UI QA run `36113051938` / run 153 success
- accepted visual assets/layout/characters/P0-A/B/C/D/layering/sharpness/tap-safety

## LOCKED BUSINESS INVARIANTS
- do not change recipe/base quantities
- do not invent replacement Matrix values
- qty=0 remains disabled / `แทนไม่ได้`
- do not alter unrelated Matrix/PIN/import-export semantics

## EXACT NEXT ACTION
1. Create `repair-staging/shrimp-pooling/RUN_CALC_FIX` as the trigger. This must be the final setup write.
2. Identify the resulting `Repair shrimp pooling calculation` run and read its status.
3. If failure: inspect first failed required step, persist blocker before editing.
4. If success: verify bot production commit changes only `index.html`, inspect exact diff, run/trigger fresh UI QA, and persist calculation-fix success.
5. Do NOT edit `recipe_master.json` raw shrimp values without authoritative source data.

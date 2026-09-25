# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — MULTI-ITEM SHRIMP POOLING / CALCULATION CONTRACT

Phase 1 visual/UAT work is ACCEPTED / COMPLETE and remains frozen. The user accepted UAT-014 run-153 evidence (`โอเค`) on 2026-09-25. Do not reopen visual assets/layout/characters absent concrete regression evidence or explicit new feedback.

### New business workstream
Recovered prior product requirement: when several excluded items are replaced by the same shrimp target, preserve their RAW decimal shrimp credits, aggregate them first, then floor the pooled shrimp credit exactly once.

Acceptance examples:
- `0.4 + 0.7 = 1.1` => pooled shrimp addition `1`
- a pooled raw credit such as `0.8 + 0.8 = 1.6` must add `1`, not `2`
- do not round each source row before aggregation
- current single-item `qty = 0` UX remains `แทนไม่ได้` / disabled
- do not invent replacement quantities

## VERIFIED CURRENT ROOT CAUSE
Current `index.html` behavior:
- `calculateNetRecipe()` starts from base recipe quantities.
- selected replacement raw values are added directly into the same `netRecipeMap` entries as the base quantities.
- the final combined total is passed through `applySmartRounding()` (`Math.round`).

Therefore shrimp base quantity and pooled replacement credit are rounded together. Example: base shrimp `3` + pooled credit `1.6` => current code rounds `4.6` to `5`, but the pooled-credit contract requires base `3` + `floor(1.6)` = `4`.

This is a reproduced calculation defect independent of the data-provenance issue.

## DATA-PRECISION FINDING / BLOCKER
- Excel/Matrix import path uses `parseFloat()` and preserves raw decimals in `replaceUseRules`.
- Matrix display rounds for presentation only.
- current bundled `recipe_master.json` stores many shrimp replacement rows as integer `0`/`1`, so some raw precision has already been lost in the bundled snapshot.
- historical decimal `recipe_master.json` at `f9dad2255a32514d3e19a8cd482756cbdfbd8d45` proves decimals existed, but that historical matrix differs materially from the current business matrix and MUST NOT be migrated wholesale.
- current-style integer matrix was re-uploaded as a whole file at `24771d0e28577ed0f4fb386f055bde437d422b18`; its tree contains only README/data/index/recipe JSON and no source workbook/CSV/generator.
- Project/Library spreadsheet search found no authoritative workbook.

Do not fabricate raw shrimp credits. Calculation support can be fixed now; bundled data activation remains blocked until authoritative raw credits are available.

## PHASE 1 ACCEPTED / DO NOT REOPEN
- V4 UAT-001–UAT-010 / Chunk 1–4
- UAT-011 / UAT-012 acceptance checkpoint `c8da0558949193de8b8915ef1d106c2269b68154`
- UAT-013 portrait-native background
- UAT-014 landscape-native background
- UAT-014 repair commit `3d6e50aba15dd862101996e1dc9afaefa6109c3e`
- UI QA run `36113051938` / run 153 completed/success
- artifact `ui-qa-screenshots` ID `10854126924`
- P0-A / P0-B / P0-C / P0-D, orientation/layering/sharpness/tap-safety, calculator landscape, thumbnail semantics/density

## LOCKED BUSINESS INVARIANTS
- do not change recipe/base quantities
- do not invent replacement Matrix values
- do not alter exclusion/replacement selection semantics except where a separately reproduced pooling defect requires calculation handling
- qty=0 remains disabled / `แทนไม่ได้`
- Matrix/PIN/import-export behavior remains unchanged unless directly required by this defect

## EXACT NEXT ACTION
1. Implement the calculation fix only: keep base quantities separate from replacement contributions; for shrimp replacement contribution, aggregate raw values first and `Math.floor()` exactly once before adding to base shrimp.
2. Preserve existing rounding behavior for non-shrimp targets and existing integer bundled data behavior.
3. Add a regression contract covering `0.4+0.7 -> 1` and `0.8+0.8 -> 1`, plus no-change behavior for non-shrimp replacement totals.
4. Run/trigger targeted QA and persist the result.
5. Do NOT populate missing raw shrimp credits in `recipe_master.json` without an authoritative source.

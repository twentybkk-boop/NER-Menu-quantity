# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — SHRIMP POOLING CALCULATION FIX / WORKFLOW PARSE ROOT CAUSE

Phase 1 visual/UAT work remains ACCEPTED / COMPLETE and frozen.

## PRODUCT REQUIREMENT / ACCEPTANCE CONTRACT
When several excluded items are replaced by shrimp, preserve RAW decimal shrimp credits, aggregate first, then floor the pooled shrimp credit exactly once.
- `0.4 + 0.7 = 1.1` => add `1` shrimp
- `0.8 + 0.8 = 1.6` => add `1` shrimp, not `2`
- do not round each source row first
- current single-item `qty = 0` UX remains `แทนไม่ได้` / disabled
- do not invent replacement quantities

## VERIFIED CALCULATION DEFECT
Current production `calculateNetRecipe()` adds replacement amount into the base quantity and then `Math.round()`s the combined total.
Example: base shrimp `3` + pooled raw credit `1.6` currently becomes `round(4.6)=5`; required is `3 + floor(1.6)=4`.

## DATA-PRECISION BLOCKER — DO NOT GUESS
- Excel import uses `parseFloat()` and preserves raw decimals.
- bundled `recipe_master.json` has many shrimp cells already reduced to integer `0`/`1`.
- old decimal snapshot `f9dad2255a32514d3e19a8cd482756cbdfbd8d45` is a materially different matrix; do NOT migrate it wholesale.
- current-style integer matrix was uploaded wholesale at `24771d0e28577ed0f4fb386f055bde437d422b18`; no workbook/CSV/generator exists in that tree.
- Project/Library spreadsheet search found no authoritative raw-current workbook.

Do not populate missing raw shrimp credits without an authoritative source.

## REGRESSION CONTRACT — DURABLE
- file: `qa/replacement-pooling-contract.mjs`
- commit: `486540b159195612a708f37dc1adbc7f0d75c022`
- covers `0.4+0.7 -> 1`, `0.8+0.8 -> 1`, invalid/negative handling, separate shrimp pool, and preservation of the non-shrimp accumulation path.

## FIRST ONE-SHOT WORKFLOW ATTEMPT — FAILED BEFORE JOB START
Workflow setup commit:
- `8e28d134f27d40d8b376fed389ff39a14a662630`
Trigger:
- `cf9c1c262bbd52c01526e7e773260a8b49de8431`
Run:
- ID `36124185308`
- status completed
- conclusion failure
- jobs: none

Exact root cause:
- `.github/workflows/repair-shrimp-pooling-calculation.yml` embedded the old/new JavaScript blocks inside Python triple-quoted strings.
- the embedded JS lines did not retain YAML block-scalar indentation, making the workflow invalid before any job could start.
- therefore `index.html` was NOT modified and the regression contract did NOT run.

## SAFE WORKFLOW FIX
Replace only the workflow patch script:
- locate exactly one `function calculateNetRecipe(menuName)` start and the following `function getSortedReplacementOptions` boundary
- verify expected existing accumulation fragments before patching
- construct replacement block from a Python list of quoted lines so every YAML line remains correctly indented
- keep regression-contract gate, one-file diff gate, `git diff --check`, and index-only commit safeguards unchanged

## PHASE 1 ACCEPTED / DO NOT REOPEN
- V4 UAT-001–UAT-010 / Chunk 1–4
- UAT-011 / UAT-012 checkpoint `c8da0558949193de8b8915ef1d106c2269b68154`
- UAT-013 / UAT-014 accepted visual work
- UI QA run `36113051938` / run 153 success

## LOCKED BUSINESS INVARIANTS
- do not change recipe/base quantities
- do not invent replacement Matrix values
- qty=0 remains disabled / `แทนไม่ได้`
- do not alter unrelated Matrix/PIN/import-export semantics

## EXACT NEXT ACTION
1. Fix only `.github/workflows/repair-shrimp-pooling-calculation.yml` serialization/indentation as described above.
2. Update existing `repair-staging/shrimp-pooling/RUN_CALC_FIX` as the final retrigger write.
3. Inspect the new run.
4. If success: verify bot commit changes only `index.html`, inspect exact diff, then trigger fresh UI QA.
5. Do NOT edit raw shrimp values in `recipe_master.json` without authoritative source data.

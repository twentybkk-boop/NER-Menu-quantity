# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — SHRIMP POOLING CALCULATION ACCEPTED / RAW-CREDIT SOURCE BLOCKED / CLEANUP COMPLETE

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

Verification:
- successful repair run `36124335016`: completed/success
- production patch, regression contract, one-file diff gate, and commit steps all succeeded
- permanent UI QA integration commit `182af74d424c98ab2bc356a5aeb0b6cb88f3d2c4`
- fresh UI QA run `36124443879` / run 155: completed/success
- pooling contract and every existing local/deployed visual/interaction gate passed

## TEMPORARY REPAIR CLEANUP — COMPLETE
Permanent production fix and permanent regression QA are retained.
Temporary repair-only artifacts removed after verification:
- `.github/workflows/repair-shrimp-pooling-calculation.yml` removed at `6ed60495eff8f6367b2435c4d2822ab682e88856`
- `repair-staging/shrimp-pooling/RUN_CALC_FIX` removed at `af28ead10b6e460e0333498cf6fbcecb95ff7aac`

The workflow was deleted before the trigger so deleting the trigger could not launch an unnecessary repair run.

## RAW-CREDIT PROVENANCE — BLOCKED, DO NOT GUESS
The calculation engine can consume raw decimal shrimp credits correctly, but current bundled `recipe_master.json` stores many shrimp replacement cells as integer `0`/`1`.

Authoritative current raw source was not found after checking:
- Git history
- Project/Library files
- connected Google Drive
- Gmail
- prior project/chat context

Important provenance findings:
- historical decimal snapshot `f9dad2255a32514d3e19a8cd482756cbdfbd8d45` is a materially different business matrix; do NOT migrate it wholesale.
- current-style integer matrix was uploaded as a whole file at `24771d0e28577ed0f4fb386f055bde437d422b18`; no workbook/CSV/generator was committed with it.
- Drive candidates `NER pre order.xlsx`, `NER pre order`, and `Copy of NER pre order` are menu/category/price lists, not replacement matrices.

Status: **RAW-CURRENT SHRIMP CREDIT SOURCE UNAVAILABLE**.

Hard rule: do NOT populate or infer missing raw shrimp credits from rounded `0`/`1`, from the old matrix, or from guessed cost formulas. Data activation waits for an authoritative original/current Matrix source.

## PHASE 1 ACCEPTED / DO NOT REOPEN
- V4 UAT-001–UAT-010 / Chunk 1–4
- UAT-011 / UAT-012 checkpoint `c8da0558949193de8b8915ef1d106c2269b68154`
- UAT-013 / UAT-014 accepted visual work
- run 155 confirms no visual/interaction regression from pooling calculation fix

## LOCKED BUSINESS INVARIANTS
- do not change recipe/base quantities
- do not invent replacement Matrix values
- qty=0 remains disabled / `แทนไม่ได้`
- do not alter unrelated Matrix/PIN/import-export semantics

## EXACT NEXT ACTION
Raw-credit activation is blocked pending an authoritative current Matrix source. Preserve the accepted calculation fix and permanent regression contract. Resume the next explicit independent NER Menu Quantity backlog/product item from durable project context; do not reopen Phase 1 and do not invent shrimp data.

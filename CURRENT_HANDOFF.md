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

## IMPORT DATA INTEGRITY AUDIT — CLEAN / CLOSED
Independent backlog item identified in S1:
**Import Data Integrity / replacement linkage audit** for current `recipe_master.json`, including the product failure mode where an exclusion can end with no replacement options.

Durable audit scaffolding already on `main`:
- `8aec6e0b6e43382d744cecd3b33f6da6be7194bf` — `qa/import-data-integrity-audit.mjs`
- `b114dfc6957dfb169b04058b6281d3b947e5a42f` — one-shot audit workflow
- `a3ce6f6fba2f20e099eea2c0443070e86eb4aa23` — audit trigger

Audit execution:
- run ID `36125886778`
- job ID `108041781453`
- head `a3ce6f6fba2f20e099eea2c0443070e86eb4aa23`
- run conclusion: success
- audit step conclusion: success

Exact output from the existing job log:
`IMPORT_DATA_AUDIT_COUNTS={"mismatchedMenus":0,"invalidExcludes":0,"duplicateRules":0,"noOptions":0}`

Therefore:
- `mismatchedMenus = 0`
- `invalidExcludes = 0`
- `duplicateRules = 0`
- `noOptions = 0`

Conclusion:
- no production data/linkage defect was found by this contract
- no implementation patch is justified from this item
- do NOT modify `recipe_master.json` or `index.html` for this audit item
- do NOT retrigger run `36125886778`

## DO NOT REPEAT
- do not reopen Phase 1 visual work
- do not revisit blocked raw shrimp credit provenance without new authoritative evidence
- do not recreate shrimp repair workflow/staging
- do not recreate or rerun the import integrity audit just to reconfirm zero counts
- do not modify production for the now-clean import-integrity item

## EXACT NEXT ACTION — NEXT SHORT CHUNK ONLY
1. Re-read current `main` + this handoff.
2. Clean up ONLY the temporary one-shot import audit artifacts if still present:
   - `.github/workflows/audit-import-data-integrity.yml`
   - `repair-staging/import-validation/RUN_AUDIT`
3. Do not remove `qa/import-data-integrity-audit.mjs`; keep it as durable diagnostic/regression tooling unless a new source-of-truth decision says otherwise.
4. Persist cleanup checkpoint and STOP.
5. After that, start a separate backlog-discovery chunk for the next independent product item.

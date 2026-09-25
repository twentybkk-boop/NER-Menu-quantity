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
Audit contract:
- durable diagnostic: `qa/import-data-integrity-audit.mjs`
- script remains present on `main` and MUST be kept unless a new source-of-truth decision says otherwise.

Audit execution:
- run ID `36125886778`
- job ID `108041781453`
- head `a3ce6f6fba2f20e099eea2c0443070e86eb4aa23`
- conclusion: success

Exact counts:
- `mismatchedMenus = 0`
- `invalidExcludes = 0`
- `duplicateRules = 0`
- `noOptions = 0`

Conclusion:
- no production data/linkage defect found by this contract
- no `recipe_master.json` / `index.html` patch justified
- do not rerun merely to reconfirm clean state

Temporary audit artifacts cleaned up:
- `.github/workflows/audit-import-data-integrity.yml` removed at `e9f78028fee57dd11d2a26a075939995c2ec0e51`
- `repair-staging/import-validation/RUN_AUDIT` removed at `040c3c3ed02fe103a3316056ade56ffbcce56699`
- `qa/import-data-integrity-audit.mjs` verified still present after cleanup

## DO NOT REPEAT
- do not reopen Phase 1 visual work
- do not revisit blocked raw shrimp credit provenance without new authoritative evidence
- do not recreate shrimp repair workflow/staging
- do not recreate or rerun the import integrity audit just to reconfirm zero counts
- do not recreate the deleted one-shot import audit workflow/trigger
- do not modify production for the clean import-integrity item

## EXACT NEXT ACTION — NEXT SHORT CHUNK ONLY
Start a NEW backlog-discovery chunk only:
1. Re-read current `main` + this handoff.
2. Search durable repo/project context for the next independent product/backlog item that is NOT Phase 1 visual work, NOT shrimp raw-credit provenance, and NOT import-integrity audit.
3. Do not modify production in that discovery chunk.
4. Persist the identified item, evidence, scope boundary, and exact next action.
5. STOP.

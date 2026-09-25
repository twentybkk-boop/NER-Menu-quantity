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

## CHUNK S1 — COMPLETE
### Next independent durable backlog item
**Import Data Integrity / replacement linkage audit** for the current `recipe_master.json`, including the product failure mode where an exclusion can end up with no replacement options.

This item is independent from:
- accepted Phase 1 visual work
- blocked raw-current shrimp credit provenance

### Durable evidence already on current `main`
The repo advanced beyond the prior handoff before this recovery read. Current source of truth already contains non-production audit scaffolding:

1. `8aec6e0b6e43382d744cecd3b33f6da6be7194bf` — `Add import data integrity audit`
   - adds `qa/import-data-integrity-audit.mjs`
   - audit classes:
     - `mismatchedMenus`: replacement rule references a menu missing from `baseMenu`
     - `invalidExcludes`: rule exclude is not an ingredient in that menu's base recipe
     - `duplicateRules`: duplicate `(menu, exclude)` replacement rows
     - `noOptions`: a multi-ingredient base item has either no rule or no replacement option overlapping its base ingredients
   - audit is read-only; no production behavior/data is modified.

2. `b114dfc6957dfb169b04058b6281d3b947e5a42f` — `Add one-shot import data integrity audit workflow`
   - adds `.github/workflows/audit-import-data-integrity.yml`
   - read-only permissions
   - runs `node qa/import-data-integrity-audit.mjs`

3. `a3ce6f6fba2f20e099eea2c0443070e86eb4aa23` — `Trigger import data integrity audit`
   - adds only `repair-staging/import-validation/RUN_AUDIT`
   - no production code/data modification

4. Audit run:
   - run ID `36125886778`
   - workflow `Audit import data integrity`
   - head `a3ce6f6fba2f20e099eea2c0443070e86eb4aa23`
   - completed/success
   - job `audit-import-data-integrity` completed/success
   - audit step completed/success

### Scope boundary
CHUNK S1 does NOT interpret the audit output and does NOT modify production. Do not create a second audit or trigger.

## DO NOT REPEAT
- do not reopen Phase 1 visual work
- do not revisit blocked raw shrimp credit provenance without new authoritative evidence
- do not recreate shrimp repair workflow/staging
- do not recreate `qa/import-data-integrity-audit.mjs`
- do not recreate `.github/workflows/audit-import-data-integrity.yml`
- do not retrigger run `36125886778` merely to reconfirm it
- do not modify `recipe_master.json` or `index.html` until the audit output has been read and classified

## EXACT NEXT ACTION — CHUNK S2A ONLY
1. Re-read current `main` + this handoff.
2. Read the logs/output of existing audit job `108041781453` from run `36125886778` exactly once.
3. Record exact counts for `mismatchedMenus`, `invalidExcludes`, `duplicateRules`, and `noOptions`.
4. If all counts are zero: mark this audit item clean, clean up the one-shot audit workflow/trigger in a later separate chunk, and return to independent backlog discovery.
5. If any count is nonzero: persist the exact affected rows/reasons as the next implementation scope; DO NOT edit production in the same chunk.
6. Persist checkpoint and STOP.

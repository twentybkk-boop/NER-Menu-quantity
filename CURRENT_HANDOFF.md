# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + durable artifacts.

## SHORT-CHUNK EXECUTION POLICY
From this checkpoint onward, use short recoverable sessions:
- ONE chunk = ONE milestone only.
- Re-read current `main` + this handoff at the start of every chunk.
- Do not reopen DONE / ACCEPTED work.
- Persist a checkpoint at the end of each chunk.
- STOP after checkpoint; do not chain the next major milestone in the same session.
- If CI is still running, record run ID/status and STOP instead of waiting through multiple stages.

## RECOVERED VERIFIED STATE
Current `main` before this recovery checkpoint:
- `eb809c690352ab65a98f2888e5bf15bb36cafc96` — `Checkpoint shrimp pooling cleanup complete`

### Phase 1 visual/UAT — ACCEPTED / FROZEN
- V4 UAT-001–UAT-014 accepted.
- UAT-013 portrait and UAT-014 landscape are accepted.
- All accepted character/layout/orientation/calculator/thumbnail behavior remains frozen.
- UI QA run 153 was accepted before later business work.

### Multi-item shrimp pooling calculation — ACCEPTED / VERIFIED
Requirement:
- aggregate RAW shrimp replacement credits first
- floor pooled shrimp credit exactly once at the end
- examples: `0.4 + 0.7 -> 1`, `0.8 + 0.8 -> 1`

Production fix:
- `e3ef7945de8a4d6e708e215a65e144a2fb8aa863` — `Fix multi-item shrimp pooling calculation`
- changed only `index.html`
- shrimp replacement contribution is accumulated separately from base shrimp
- pooled contribution uses `Math.floor()` once before adding to base shrimp
- non-shrimp replacement accumulation remains unchanged

Permanent regression protection:
- `qa/replacement-pooling-contract.mjs`
- added at `486540b159195612a708f37dc1adbc7f0d75c022`
- permanently wired into UI QA at `182af74d424c98ab2bc356a5aeb0b6cb88f3d2c4`

Verification:
- repair verification run `36124335016`: success
- UI QA run `36124443879` / run 155: completed/success
- pooling contract passed
- every existing local/deployed visual + interaction gate passed

Temporary repair artifacts were cleaned up:
- workflow removed at `6ed60495eff8f6367b2435c4d2822ab682e88856`
- repair trigger removed at `af28ead10b6e460e0333498cf6fbcecb95ff7aac`

### Raw-current shrimp credits — BLOCKED / DO NOT GUESS
The calculation engine is ready for decimal raw credits, but current bundled `recipe_master.json` contains many shrimp replacement values already stored as rounded integer `0`/`1`.

Authoritative current raw source was NOT found after checking:
- Git history
- Project / Library files
- connected Google Drive
- Gmail
- prior project/chat context

Important evidence:
- old decimal snapshot `f9dad2255a32514d3e19a8cd482756cbdfbd8d45` is a materially different business matrix; DO NOT migrate it wholesale.
- current-style integer matrix was uploaded wholesale at `24771d0e28577ed0f4fb386f055bde437d422b18` with no committed workbook/CSV/generator.
- Drive candidates `NER pre order.xlsx`, `NER pre order`, `Copy of NER pre order` are price/menu lists, NOT replacement matrices.

Status: **RAW-CURRENT SHRIMP CREDIT SOURCE UNAVAILABLE**.

Hard rule:
- DO NOT infer missing decimal credits from rounded `0`/`1`.
- DO NOT derive them from the old matrix.
- DO NOT invent cost formulas.
- DO NOT reopen Drive/Gmail/source searches unless new source evidence appears.

## LOCKED / DO NOT REPEAT
- do not reopen Phase 1/UAT visual work
- do not regenerate accepted portrait/landscape/character assets
- do not rerun old repair workflows/runs merely to reconfirm accepted work
- do not recreate deleted shrimp repair staging/workflow
- do not modify recipe/base quantities without explicit new source evidence
- qty=0 remains disabled / `แทนไม่ได้`
- do not change unrelated Matrix/PIN/import-export semantics

## SHORT RECOVERY CHUNKS
### CHUNK S1 — NEXT BACKLOG DISCOVERY ONLY
1. Re-read current `main` + this handoff.
2. Search only durable repo/project context for the next independent NER Menu Quantity backlog/product item that is NOT the blocked raw-credit task and NOT Phase 1 visual work.
3. Do not modify production in this chunk.
4. Persist the identified next item, evidence, scope boundary, and exact next action.
5. STOP.

### CHUNK S2 — IMPLEMENT ONE VERIFIED ITEM ONLY
Start only after S1 identifies a concrete backlog item.
1. Re-read current `main` + handoff.
2. Inspect only code/data directly relevant to that item.
3. Implement the smallest complete milestone.
4. Run targeted regression/QA.
5. Persist checkpoint.
6. STOP.

### CHUNK S3 — CI / ACCEPTANCE ONLY
1. Re-read current `main` + handoff.
2. Inspect only the resulting CI/run/artifact evidence.
3. If failed: persist first failed required step and STOP before editing.
4. If success: persist acceptance checkpoint.
5. STOP.

## EXACT NEXT ACTION
Do **CHUNK S1 ONLY** next: identify the next independent durable backlog/product item from current repo/project context, record it, and STOP. Do not resume the blocked raw-credit search without new authoritative evidence.

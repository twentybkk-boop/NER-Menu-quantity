# CURRENT HANDOFF — NER Menu Quantity

> EMERGENCY CRASH-SAFE RECOVERY CHECKPOINT — SAVE FIRST, ANALYZE SECOND.
> Source of truth: current GitHub `main` + actual code + `recipe_master.json`; current `main` wins if stale.

## CURRENT OBJECTIVE
Finish V3 Session 2B.2: restore the three exact browser-decodable approved high-resolution character overlays without changing verified layout/business logic; then run existing sharpness/UI QA and inspect `31-*sharpness-v2` screenshots.

## VERIFIED BASELINE — DO NOT REDO
- V2 P0-A/B/C/D VERIFIED; V3 Session 1 VERIFIED; Session 2A DONE; Session 2B.1 VERIFIED.
- Exact top Git object VERIFIED present: `990c6b3523f79a483f41f17032f03f880f97f461`.
- Exact bottom Git object VERIFIED present: `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`.
- Exact right local candidate: 51,376 bytes, SHA256 `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed`, final target Git blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
- Production asset paths remain untouched.

## RIGHT STAGING — VERIFIED
Repair branch: `repair/v3-2b2-exact-blobs-20260924`.
- offsets `0–29,999` exact via `right-00/01/02`.
- desired `right-03` range `[30000:48000]`: 18,000 chars; target text blob `654a08614380f215c9b3c785bf6945add55b897f`.
- direct `right-03` blobs `86f52cd5...` and `a41faed8...` are REJECTED.
- exact subchunks durable:
  - `right-03a.b64` → `e864f9da6f68159a5964ecb8b9d8f941a9503627`
  - `right-03b.b64` → `8e59014cc5dd7da95de93d6c5a972f48f936aac9`
  - `right-03c.b64` → `978227ee0823f8724aea71fdbd310079d90dfaf8`

## TEMPORARY RIGHT-03 ASSEMBLER
- workflow: `.github/workflows/repair-right-03.yml`
- workflow creation commit: `d9f9c37d6956cd362fda686289c302bdad76eb3f`
- workflow concatenates exact `03a+03b+03c`, requires length 18,000 and `git hash-object` exactly `654a08614380f215c9b3c785bf6945add55b897f`, then commits only corrected `right-03.b64` on success.

## TRIGGER STATE — DURABLE
- trigger file `repair-staging/right/RUN_RIGHT03` was created on the repair branch with deterministic marker `run-right03-v1`.
- trigger commit: `7b0a7e74decdcdbb38d92c0a3922fe66753a7dd5`.
- This is the only write made in the trigger chunk.
- Workflow run has NOT yet been inspected at this checkpoint; run ID/status/conclusion are unresolved, not inferred.
- Production paths remain untouched.

## VERIFIED FINDINGS
- Top/bottom exact objects are durable in Git.
- Right exact local bytes are verified; remaining right work is transport only.
- Right prefix and all `03a/03b/03c` subchunks are exact.
- Assembler and trigger are durable on the repair branch.

## DO NOT REPEAT / REJECTED
- No repo-wide/source/Library audits or prior completed V2/Session1/2A/2B.1/layout/orientation/calculator/P0 work.
- Do not rewrite verified right chunks/subchunks or create another trigger.
- Do not reuse rejected right blobs `86f52cd5...`, `a41faed8...`, or failed final blob `06e26ae2...`.
- Do not stage chars `48,000+`, assemble full right payload, or touch production paths before `right-03.b64` itself is exact and checkpointed.

## OPEN BLOCKERS
1. Inspect only the workflow run caused by trigger commit `7b0a7e74...`.
2. If successful, verify repair-branch `right-03.b64` blob exactly `654a08614380f215c9b3c785bf6945add55b897f`; immediately checkpoint.
3. If failed, persist run/job/log evidence before any fix.
4. Then stage right chars `48,000–68,503`, assemble/decode full payload, verify final right target `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
5. Only after all three exact asset targets exist: production mapping → repair-artifact cleanup → QA/manual acceptance.

## EXACT NEXT RECOVERY ACTION
Confirm this checkpoint is durable. Then inspect ONLY GitHub Actions runs associated with repair branch/trigger commit `7b0a7e74decdcdbb38d92c0a3922fe66753a7dd5`. Record run ID/status/conclusion and whether it produced an assembler commit. Immediately persist that evidence before any additional action.

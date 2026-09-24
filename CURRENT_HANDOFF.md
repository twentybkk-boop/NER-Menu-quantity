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

## RIGHT STAGING — VERIFIED INPUTS
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
- creation commit: `d9f9c37d6956cd362fda686289c302bdad76eb3f`
- trigger file: `repair-staging/right/RUN_RIGHT03`
- trigger commit: `7b0a7e74decdcdbb38d92c0a3922fe66753a7dd5`
- assembler gates: concatenate `03a+03b+03c`, require length 18,000, require `git hash-object` exactly `654a08614380f215c9b3c785bf6945add55b897f`, then commit corrected `right-03.b64` only on success.

## WORKFLOW RUN — VERIFIED SUCCESS
- workflow run ID: `36030835252`
- workflow name: `Repair right-03 exact staging`
- event: `push`
- head branch: `repair/v3-2b2-exact-blobs-20260924`
- head SHA: `7b0a7e74decdcdbb38d92c0a3922fe66753a7dd5`
- status: `completed`
- conclusion: `success`
- run attempt: `1`
- created/start: `2026-09-24T16:56:30Z`
- updated/completed: `2026-09-24T16:56:38Z`
- Assembler commit/tree output has NOT yet been independently inspected at this checkpoint; success is durable run evidence, not yet promotion of `right-03.b64` blob to VERIFIED.
- Production paths remain untouched.

## DO NOT REPEAT / REJECTED
- No repo-wide/source/Library audits or prior completed V2/Session1/2A/2B.1/layout/orientation/calculator/P0 work.
- Do not rewrite verified right chunks/subchunks or create another trigger/re-run the successful workflow.
- Do not reuse rejected right blobs `86f52cd5...`, `a41faed8...`, or failed final blob `06e26ae2...`.
- Do not stage chars `48,000+`, assemble full right payload, or touch production paths before assembled `right-03.b64` tree blob is independently verified and checkpointed.

## OPEN BLOCKERS
1. Inspect repair-branch head/assembler commit produced after run `36030835252`.
2. Require `repair-staging/right/right-03.b64` blob exactly `654a08614380f215c9b3c785bf6945add55b897f`; checkpoint immediately.
3. Then stage right chars `48,000–68,503`, assemble/decode full payload, verify final right target `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
4. Only after all three exact asset targets exist: production mapping → repair-artifact cleanup → QA/manual acceptance.

## EXACT NEXT RECOVERY ACTION
Confirm this checkpoint is durable. Then inspect ONLY the repair branch head/commit created after workflow run `36030835252`; verify the changed file is only `repair-staging/right/right-03.b64` and its Git blob SHA exactly `654a08614380f215c9b3c785bf6945add55b897f`. Immediately persist that verification before any further staging.

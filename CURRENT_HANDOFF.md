# CURRENT HANDOFF — NER Menu Quantity

> EMERGENCY CRASH-SAFE RECOVERY CHECKPOINT — SAVE FIRST, ANALYZE SECOND.
> Source of truth: current GitHub `main` + actual code + `recipe_master.json`; current `main` wins if any status below becomes stale.

## CURRENT OBJECTIVE
Finish V3 Session 2B.2: restore the three exact browser-decodable approved high-resolution character overlays without changing verified layout/business logic; then run existing sharpness/UI QA and inspect `31-*sharpness-v2` screenshots.

## VERIFIED BASELINE — DO NOT REDO
- V2 P0-A/B/C/D VERIFIED; V3 Session 1 VERIFIED; Session 2A DONE; Session 2B.1 VERIFIED.
- Exact top Git object VERIFIED present: `990c6b3523f79a483f41f17032f03f880f97f461`.
- Exact bottom Git object VERIFIED present: `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`.
- Exact right local candidate `right-q70-a60.webp`: 51,376 bytes, SHA256 `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed`, final target Git blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
- Production asset paths remain untouched.

## RIGHT STAGING — VERIFIED
Repair branch: `repair/v3-2b2-exact-blobs-20260924`.
- Exact prefix files: `right-00` blob `4cfbab61...`, `right-01` blob `c4a33fd7...`, `right-02` blob `010d7aed...`; offsets `0–29,999` VERIFIED exact.
- Desired `right-03` range `[30000:48000]`: 18,000 chars; target text blob `654a08614380f215c9b3c785bf6945add55b897f`.
- Direct `right-03` blobs `86f52cd5...` and `a41faed8...` are REJECTED.
- Exact subchunks are durable:
  - `right-03a.b64` `[30000:36000]` → `e864f9da6f68159a5964ecb8b9d8f941a9503627`, commit `cd0671a622a6d6abda5c47f9c4829f1277962790`.
  - `right-03b.b64` `[36000:42000]` → `8e59014cc5dd7da95de93d6c5a972f48f936aac9`, commit `50d32c293060797d9641d8721681ff728bb8442e`.
  - `right-03c.b64` `[42000:48000]` → `978227ee0823f8724aea71fdbd310079d90dfaf8`, commit `2dc8f3865d8f7d8822acd975473c3583bfb97a72`.

## TEMPORARY RIGHT-03 ASSEMBLER — CREATED, NOT TRIGGERED
A repair-only workflow now exists on `repair/v3-2b2-exact-blobs-20260924`:
- path: `.github/workflows/repair-right-03.yml`
- creation commit: `d9f9c37d6956cd362fda686289c302bdad76eb3f`
- trigger: push only on `repair-staging/right/RUN_RIGHT03` on the repair branch.
- permissions: `contents: write`.
- behavior:
  1. concatenate `right-03a.b64 + right-03b.b64 + right-03c.b64` without inserted newline;
  2. require byte length `18000`;
  3. require `git hash-object /tmp/right-03.b64` exactly `654a08614380f215c9b3c785bf6945add55b897f`;
  4. copy to `repair-staging/right/right-03.b64` only after both gates pass;
  5. require target hash again on written file;
  6. commit/push only corrected `right-03.b64`; fail without commit on mismatch.
- Workflow has NOT been triggered at this checkpoint.
- No production path was changed.

## VERIFIED FINDINGS
- Top/bottom exact objects are durable in Git.
- Right exact local bytes are verified; remaining right work is transport only.
- Right prefix `0–29,999` and all three `03a/03b/03c` subchunks are exact.
- Temporary assembler is durably present but untriggered.

## DO NOT REPEAT / REJECTED
- No repo-wide/source/Library audits; no prior V2/Session1/2A/2B.1, layout/orientation/calculator/P0 work; no redraw/reconstruction.
- Do not rewrite verified right chunks/subchunks.
- Do not reuse rejected right blobs `86f52cd5...`, `a41faed8...`, or failed final blob `06e26ae2...`.
- Do not stage chars `48,000+`, assemble full right payload, or touch production paths before `right-03.b64` itself is exact and checkpointed.

## OPEN BLOCKERS
1. Trigger temporary assembler once by creating `repair-staging/right/RUN_RIGHT03` on repair branch.
2. Observe workflow result; require repair-branch `right-03.b64` blob exactly `654a08614380f215c9b3c785bf6945add55b897f`; checkpoint immediately.
3. Then stage right chars `48,000–68,503`, assemble/decode full payload, verify final right target `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
4. Only after all three asset target blobs exist: production mapping → repair-artifact cleanup → QA/manual acceptance.

## EXACT NEXT RECOVERY ACTION
Confirm this checkpoint is durable. Then create ONLY the repair-branch trigger file `repair-staging/right/RUN_RIGHT03` with a tiny deterministic marker. Do not make any other write in that chunk. Verify the trigger commit is durable, immediately persist its commit/run state in this handoff, and only then inspect the resulting workflow run.

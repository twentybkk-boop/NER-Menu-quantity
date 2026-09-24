# CURRENT HANDOFF — NER Menu Quantity

> EMERGENCY CRASH-SAFE RECOVERY — SAVE FIRST, ANALYZE SECOND.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json`. Current GitHub state wins if stale.

## CURRENT OBJECTIVE
Finish V3 Session 2B.2: restore the three exact browser-decodable approved high-resolution character overlays without changing verified layout/business logic; then run existing sharpness/UI QA and inspect `31-*sharpness-v2` screenshots.

## VERIFIED BASELINE — DO NOT REDO
- V2 P0-A/B/C/D VERIFIED; V3 Session 1 VERIFIED; Session 2A DONE; Session 2B.1 VERIFIED.
- Exact top Git object VERIFIED present: `990c6b3523f79a483f41f17032f03f880f97f461`.
- Exact bottom Git object VERIFIED present: `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`.
- Exact right local candidate: 51,376 bytes, RIFF/WEBP, SHA256 `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed`, base64 length 68,504 chars, final Git blob target `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
- Production asset paths remain untouched.

## RIGHT STAGING — FULL BASE64 VERIFIED EXACT
Repair branch: `repair/v3-2b2-exact-blobs-20260924`.
- Exact staged ranges cover all base64 chars `0–68,503` via `right-00`, `right-01`, `right-02`, assembled `right-03`, and `right-04a/b/c/d`.
- Final tail `right-04d.b64` `[66000:68504]` is 2,504 chars, blob `87d79ed174e11938becb04788693164198f5e632`, commit `dc52a6560415d974cffe9161978e42bee0af3283`, VERIFIED.
- No more chunk/source recovery is needed.

## FINAL-RIGHT ASSEMBLER — CREATED, NOT TRIGGERED
Temporary repair-only workflow:
- path `.github/workflows/repair-right-final.yml`
- creation commit `b882cab89a6b2bcf87ada276b51a7f21ce108a30`
- trigger path: `repair-staging/right/RUN_RIGHT_FINAL` on repair branch only
- permissions: `contents: write`
- workflow gates before any proof commit:
  1. concatenate exact staging files in order: `right-00 + right-01 + right-02 + right-03 + right-04a + right-04b + right-04c + right-04d`
  2. require assembled base64 length `68504`
  3. decode to WebP and require size `51376`
  4. require SHA256 exactly `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed`
  5. require `git hash-object` exactly `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`
  6. only then copy/commit repair-only binary proof `repair-staging/right/right-q70-a60.webp`
- Workflow has NOT been triggered at this checkpoint.

## REJECTED / DO NOT USE
- top non-target `812e704774c25a1c2387e03e48a3d1eb27b9e672`
- bottom non-target `65c0568c8b4895ead37932fa6c7f2814ec4c90a1`
- failed/truncated top `b728455af0996ff48b21e49e1fd2b3c05e5fb4ea`
- failed right one-shot `06e26ae2448ecc5383a452760f6f21f58daea62e`
- rejected direct right-03 blobs `86f52cd5...` and `a41faed8...`
- invalid orphan blobs `35c12cd9...`, `42c06cd2...`, `9af0dd1f...`

## DO NOT REPEAT
- No repo-wide/source/Library audits or completed V2/Session1/2A/2B.1/layout/orientation/calculator/P0 work; no redraw/reconstruction.
- Do not rewrite any staged right chunk; all 68,504 base64 chars are exact.
- Do not rerun old right-03 assembler workflow `36030835252`.
- Do not create more right source chunks.
- Do not touch production paths before final right binary target `a4d051c5...` is VERIFIED durable.

## OPEN BLOCKERS
1. Trigger final-right assembler exactly once and persist trigger state before inspecting run.
2. Require successful run and independently verify repair proof file blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`; checkpoint immediately.
3. Then map exact top/bottom/right blobs to production paths in one clean production commit.
4. Cleanup repair-only artifacts/workflows/triggers.
5. Run post-repair QA and manual `31-*sharpness-v2` screenshot acceptance.

## EXACT NEXT RECOVERY ACTION
After confirming this checkpoint is durable, create ONLY `repair-staging/right/RUN_RIGHT_FINAL` on the repair branch with a tiny deterministic marker. Verify trigger commit is durable and immediately checkpoint trigger state before inspecting any Actions run. Do not make any other write in that work unit.

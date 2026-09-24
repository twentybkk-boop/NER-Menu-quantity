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
- Full exact right base64 chars `0–68,503` are durably staged on `repair/v3-2b2-exact-blobs-20260924`.
- Production asset paths remain untouched.

## FINAL-RIGHT ASSEMBLER
- workflow `.github/workflows/repair-right-final.yml`
- creation commit `b882cab89a6b2bcf87ada276b51a7f21ce108a30`
- trigger `repair-staging/right/RUN_RIGHT_FINAL`
- trigger commit `0f70807c3c33e30335874c7337e4121572a036ad`
- gates: base64 length `68504`; decoded size `51376`; SHA256 `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed`; Git blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`; commit repair-only binary proof only after all gates pass.

## FINAL-RIGHT RUN — FAILURE EVIDENCE DURABLE
- run ID `36032106873`
- workflow name `Repair exact right binary`
- event `push`
- head branch `repair/v3-2b2-exact-blobs-20260924`
- head SHA `0f70807c3c33e30335874c7337e4121572a036ad`
- status `completed`
- conclusion `failure`
- run attempt `1`
- created/started `2026-09-24T17:07:30Z`
- completed `2026-09-24T17:07:39Z`
- Job/step/log cause has NOT yet been inspected at this checkpoint.
- No proof file is promoted to VERIFIED from this failed run.
- Production paths remain untouched.

## REJECTED / DO NOT USE
- top non-target `812e704774c25a1c2387e03e48a3d1eb27b9e672`
- bottom non-target `65c0568c8b4895ead37932fa6c7f2814ec4c90a1`
- failed/truncated top `b728455af0996ff48b21e49e1fd2b3c05e5fb4ea`
- failed right one-shot `06e26ae2448ecc5383a452760f6f21f58daea62e`
- rejected direct right-03 blobs `86f52cd5...` and `a41faed8...`
- invalid orphan blobs `35c12cd9...`, `42c06cd2...`, `9af0dd1f...`

## DO NOT REPEAT
- No repo-wide/source/Library audits or completed V2/Session1/2A/2B.1/layout/orientation/calculator/P0 work; no redraw/reconstruction.
- Do not rewrite exact right staging chunks.
- Do not create another final trigger or rerun the failed workflow before its exact failure step is known and checkpointed.
- Do not touch production paths before final right binary target `a4d051c5...` is VERIFIED durable.

## OPEN BLOCKERS
1. Inspect ONLY run `36032106873` jobs/steps/logs to identify the first failing gate/command; persist evidence before any workflow change/retry.
2. Make the minimum repair-only workflow fix, checkpoint it, then trigger/retry in a new controlled work unit.
3. Independently verify resulting proof file blob exactly `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`; checkpoint immediately.
4. Then map exact top/bottom/right blobs to production paths in one clean production commit.
5. Cleanup repair-only artifacts/workflows/triggers; run post-repair QA/manual screenshot acceptance.

## EXACT NEXT RECOVERY ACTION
After confirming this checkpoint is durable, inspect ONLY jobs/steps/logs for Actions run `36032106873`. Record the exact failing step and the earliest gate value/output that explains the failure. Immediately persist that evidence before editing the workflow or rerunning anything.

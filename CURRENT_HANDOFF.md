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
- No more chunk/source recovery is needed.

## FINAL-RIGHT ASSEMBLER
- workflow `.github/workflows/repair-right-final.yml`
- creation commit `b882cab89a6b2bcf87ada276b51a7f21ce108a30`
- gates: assembled base64 length `68504`; decoded WebP size `51376`; SHA256 `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed`; Git blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`; only then commit repair-only proof `repair-staging/right/right-q70-a60.webp`.

## FINAL-RIGHT TRIGGER — DURABLE, RUN NOT YET INSPECTED
- trigger file `repair-staging/right/RUN_RIGHT_FINAL` created on repair branch with deterministic marker `run-right-final-v1`.
- trigger commit `0f70807c3c33e30335874c7337e4121572a036ad`.
- This was the only write in the trigger work unit.
- Actions run ID/status/conclusion have NOT yet been inspected at this checkpoint and must not be inferred.
- Production asset paths remain untouched.

## REJECTED / DO NOT USE
- top non-target `812e704774c25a1c2387e03e48a3d1eb27b9e672`
- bottom non-target `65c0568c8b4895ead37932fa6c7f2814ec4c90a1`
- failed/truncated top `b728455af0996ff48b21e49e1fd2b3c05e5fb4ea`
- failed right one-shot `06e26ae2448ecc5383a452760f6f21f58daea62e`
- rejected direct right-03 blobs `86f52cd5...` and `a41faed8...`
- invalid orphan blobs `35c12cd9...`, `42c06cd2...`, `9af0dd1f...`

## DO NOT REPEAT
- No repo-wide/source/Library audits or completed V2/Session1/2A/2B.1/layout/orientation/calculator/P0 work; no redraw/reconstruction.
- Do not rewrite staged right chunks or create another final trigger.
- Do not rerun old right-03 assembler workflow `36030835252`.
- Do not touch production paths before final right binary target `a4d051c5...` is VERIFIED durable.

## OPEN BLOCKERS
1. Inspect ONLY Actions run caused by trigger commit `0f70807c3c33e30335874c7337e4121572a036ad`; persist run ID/status/conclusion before inspecting proof output.
2. If successful, independently verify repair proof file blob exactly `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`; checkpoint immediately.
3. Then map exact top/bottom/right blobs to production paths in one clean production commit.
4. Cleanup repair-only artifacts/workflows/triggers.
5. Run post-repair QA and manual `31-*sharpness-v2` screenshot acceptance.

## EXACT NEXT RECOVERY ACTION
After confirming this checkpoint is durable, inspect ONLY GitHub Actions runs associated with repair trigger commit `0f70807c3c33e30335874c7337e4121572a036ad`. Record run ID/status/conclusion and immediately checkpoint that evidence before inspecting any assembler output commit/file.

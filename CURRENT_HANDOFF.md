# CURRENT HANDOFF — NER Menu Quantity

> EMERGENCY CRASH-SAFE RECOVERY — SAVE FIRST, ANALYZE SECOND.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json`. Current GitHub state wins if stale.

## CURRENT OBJECTIVE
Finish V3 Session 2B.2: restore the three exact browser-decodable approved high-resolution character overlays without changing verified layout/business logic; then run existing sharpness/UI QA and inspect `31-*sharpness-v2` screenshots.

## VERIFIED BASELINE — DO NOT REDO
- V2 P0-A/B/C/D VERIFIED; V3 Session 1 VERIFIED; Session 2A DONE; Session 2B.1 VERIFIED.
- Exact top Git object VERIFIED present: `990c6b3523f79a483f41f17032f03f880f97f461`.
- Exact bottom Git object VERIFIED present: `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`.
- Canonical right local candidate `right-q70-a60.webp`: 51,376 bytes, RIFF/WEBP, expected SHA256 `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed`, base64 length 68,504 chars, final Git blob target `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
- Right staging files on `repair/v3-2b2-exact-blobs-20260924` were individually checkpointed previously; production asset paths remain untouched.

## FINAL-RIGHT ASSEMBLER
- workflow `.github/workflows/repair-right-final.yml`
- creation commit `b882cab89a6b2bcf87ada276b51a7f21ce108a30`
- trigger `repair-staging/right/RUN_RIGHT_FINAL`
- trigger commit `0f70807c3c33e30335874c7337e4121572a036ad`
- intended gates: base64 length `68504`; decoded size `51376`; SHA256 `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed`; Git blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`; only then commit repair-only binary proof.

## FINAL-RIGHT RUN — EXACT FAILURE EVIDENCE VERIFIED
Actions run:
- run ID `36032106873`
- job ID `107743133786`
- workflow `Repair exact right binary`
- head SHA `0f70807c3c33e30335874c7337e4121572a036ad`
- status `completed`
- conclusion `failure`
- failing step: `Assemble and verify exact right binary`

Decoded job logs now prove:
1. Checkout succeeded.
2. The concatenated base64 length gate `68504` PASSED; execution continued past that test.
3. `base64 --decode` succeeded.
4. The decoded-size gate PASSED with exactly `51376` bytes.
5. The first failing content gate was SHA256:
   - actual decoded SHA256: `f2f715dc111e302ea6dd612df1e8a475a14ff33706bfc5c48f0fa3143583182c`
   - expected canonical SHA256: `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed`
6. Process exited with code 1 at the SHA256 equality test.
7. The final `git hash-object` gate for expected right target `a4d051c52a4b0f5191ad2770c3eee416fa01aba4` was NOT reached.
8. No right binary proof commit/file is promoted to VERIFIED from this failed run.
9. This is a DATA CONTENT mismatch, not a base64-length, decode-command, decoded-size, or runner-platform failure.
10. Production paths remain untouched.

## IMPLICATION — NOT YET LOCALIZED
At least one staged right base64 range differs from the current canonical local right payload, despite prior per-chunk checks. Do NOT infer which chunk without a fresh same-source comparison. Prior per-chunk expected hashes may have been computed from a different/transient payload state or otherwise do not jointly reproduce the canonical whole-file SHA256.

## REJECTED / DO NOT USE
- top non-target `812e704774c25a1c2387e03e48a3d1eb27b9e672`
- bottom non-target `65c0568c8b4895ead37932fa6c7f2814ec4c90a1`
- failed/truncated top `b728455af0996ff48b21e49e1fd2b3c05e5fb4ea`
- failed right one-shot `06e26ae2448ecc5383a452760f6f21f58daea62e`
- rejected direct right-03 blobs `86f52cd5...` and `a41faed8...`
- failed final assembled payload represented by SHA256 `f2f715dc111e302ea6dd612df1e8a475a14ff33706bfc5c48f0fa3143583182c`
- invalid orphan blobs `35c12cd9...`, `42c06cd2...`, `9af0dd1f...`

## DO NOT REPEAT
- No repo-wide/source/Library audits or completed V2/Session1/2A/2B.1/layout/orientation/calculator/P0 work; no redraw/reconstruction.
- Do not create another final trigger or rerun run `36032106873` before chunk discrepancy localization is complete and checkpointed.
- Do not touch production paths before final right binary target `a4d051c5...` is VERIFIED durable.
- Do not assume previously checkpointed per-chunk expected hashes still prove membership in the current canonical full payload; recompute all eight range hashes from ONE current canonical local-file read.

## OPEN BLOCKERS
1. Freshly recompute, in ONE local pass from canonical `/mnt/data/ner-menu-repair/right-q70-a60.webp`, full byte SHA256, full base64 length, and deterministic Git text-blob SHA for each exact staged range:
   - `right-00` `[0:6000]`
   - `right-01` `[6000:18000]`
   - `right-02` `[18000:30000]`
   - `right-03` `[30000:48000]`
   - `right-04a` `[48000:54000]`
   - `right-04b` `[54000:60000]`
   - `right-04c` `[60000:66000]`
   - `right-04d` `[66000:68504]`
2. Compare those fresh expected range SHAs against current repair-branch file blob SHAs. Persist mismatch evidence BEFORE changing any staged file.
3. Repair ONLY mismatching range(s), checkpoint each repair, and verify that the staged set reproduces canonical whole-file SHA256 before any rerun.
4. Then rerun/fresh-trigger final binary assembler; independently verify final Git blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`; checkpoint immediately.
5. Only then: production mapping → cleanup → QA/manual acceptance.

## EXACT NEXT RECOVERY ACTION
After confirming this checkpoint is durable, perform ONE minimal local consistency pass from the current canonical file only: read `/mnt/data/ner-menu-repair/right-q70-a60.webp` once, compute its byte SHA256 and base64 length, compute deterministic Git text-blob SHA for all eight listed ranges, and locally decode/re-hash the concatenated ranges as a self-consistency check. Immediately persist those fresh expected SHAs before fetching/comparing repair-branch range blobs or changing anything.

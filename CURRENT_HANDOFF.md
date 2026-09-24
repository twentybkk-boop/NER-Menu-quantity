# CURRENT HANDOFF — NER Menu Quantity

> EMERGENCY CRASH-SAFE RECOVERY — SAVE FIRST, ANALYZE SECOND.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json`. Current GitHub state wins if stale.

## CURRENT OBJECTIVE
Finish V3 Session 2B.2: restore the three exact browser-decodable approved high-resolution character overlays without changing verified layout/business logic; then run existing sharpness/UI QA and inspect `31-*sharpness-v2` screenshots.

## VERIFIED BASELINE — DO NOT REDO
- V2 P0-A/B/C/D VERIFIED; V3 Session 1 VERIFIED; Session 2A DONE; Session 2B.1 VERIFIED.
- Exact top Git object VERIFIED present: `990c6b3523f79a483f41f17032f03f880f97f461`.
- Exact bottom Git object VERIFIED present: `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`.
- Production asset paths remain untouched.

## FINAL-RIGHT RUN FAILURE — VERIFIED
Run `36032106873`, job `107743133786`, failed in step `Assemble and verify exact right binary`.
- concatenated base64 length gate `68504`: PASSED
- base64 decode: PASSED
- decoded size gate `51376`: PASSED
- actual decoded SHA256: `f2f715dc111e302ea6dd612df1e8a475a14ff33706bfc5c48f0fa3143583182c`
- expected canonical SHA256: `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed`
- failure occurred at SHA256 equality test; final binary Git-blob gate was NOT reached; no proof commit/file is VERIFIED.

## FRESH CANONICAL LOCAL CONSISTENCY PASS — DURABLE EXPECTED VALUES
Performed in ONE pass from the current canonical local file only: `/mnt/data/ner-menu-repair/right-q70-a60.webp`.

Canonical whole-file facts from this pass:
- byte length: `51376`
- SHA256: `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed`
- base64 length: `68504`
- final binary Git blob SHA: `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`

Fresh deterministic Git text-blob SHA for each exact base64 range, all computed from the SAME canonical byte read:
- `right-00.b64` `[0:6000]`, len 6000 → `4cfbab61acc0c0e6489b51da0bb423c2da1d5e50`
- `right-01.b64` `[6000:18000]`, len 12000 → `d7ea4dac7f9d38b0e0d80a1dd306f3d6b9549df9`
- `right-02.b64` `[18000:30000]`, len 12000 → `010d7aedd8d7681240b1e6d555819065fab9ac33`
- `right-03.b64` `[30000:48000]`, len 18000 → `654a08614380f215c9b3c785bf6945add55b897f`
- `right-04a.b64` `[48000:54000]`, len 6000 → `0699b88e134d2ae675e7dee3a46d829eff79208e`
- `right-04b.b64` `[54000:60000]`, len 6000 → `1de2d4138e0ac4ba68f11a26329f15f8dcf6533a`
- `right-04c.b64` `[60000:66000]`, len 6000 → `41bd3338b623908f19399f4d4dac59dcf832903f`
- `right-04d.b64` `[66000:68504]`, len 2504 → `87d79ed174e11938becb04788693164198f5e632`

Local self-consistency gates all PASSED:
- concatenating those exact eight local ranges gives exactly `68504` chars
- strict base64 decode gives exactly `51376` bytes
- decoded bytes exactly equal the canonical source bytes
- decoded SHA256 exactly `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed`
- deterministic binary Git blob exactly `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`

IMPORTANT: These fresh values supersede any older per-range expected SHA that conflicts with them. No repair-branch range comparison has been performed in this work unit yet; do not infer current mismatch set until current branch blobs are fetched and compared.

## REJECTED / DO NOT USE
- top non-target `812e704774c25a1c2387e03e48a3d1eb27b9e672`
- bottom non-target `65c0568c8b4895ead37932fa6c7f2814ec4c90a1`
- failed/truncated top `b728455af0996ff48b21e49e1fd2b3c05e5fb4ea`
- failed right one-shot `06e26ae2448ecc5383a452760f6f21f58daea62e`
- rejected direct right-03 blobs `86f52cd5...` and `a41faed8...`
- failed assembled payload SHA256 `f2f715dc111e302ea6dd612df1e8a475a14ff33706bfc5c48f0fa3143583182c`
- invalid orphan blobs `35c12cd9...`, `42c06cd2...`, `9af0dd1f...`

## DO NOT REPEAT
- No repo-wide/source/Library audits or completed V2/Session1/2A/2B.1/layout/orientation/calculator/P0 work; no redraw/reconstruction.
- Do not rerun final-right workflow yet.
- Do not alter any staged range before the current repair-branch blob set is compared against the fresh canonical expected SHA list above and that mismatch evidence is checkpointed.
- Do not touch production paths before final right binary target `a4d051c5...` is VERIFIED durable.

## OPEN BLOCKERS
1. Fetch current repair-branch blob SHAs for the eight exact staging files and compare them to the fresh canonical expected list above.
2. Persist the exact mismatch set before changing any file.
3. Repair ONLY mismatching range(s), checkpoint each repair, and prove the complete staged set reproduces canonical SHA256 before any final assembler rerun.
4. Verify final binary Git blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`; checkpoint.
5. Only then: production mapping → cleanup → QA/manual acceptance.

## EXACT NEXT RECOVERY ACTION
After confirming this checkpoint is durable, fetch ONLY the current repair-branch tree/blob metadata needed for these eight paths: `right-00.b64`, `right-01.b64`, `right-02.b64`, `right-03.b64`, `right-04a.b64`, `right-04b.b64`, `right-04c.b64`, `right-04d.b64`. Compare their current blob SHAs with the fresh expected list above. Persist the exact mismatch set immediately before editing or rerunning anything.

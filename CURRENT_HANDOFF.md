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
- base64 length `68504`: PASSED
- decode: PASSED
- decoded size `51376`: PASSED
- actual decoded SHA256: `f2f715dc111e302ea6dd612df1e8a475a14ff33706bfc5c48f0fa3143583182c`
- canonical SHA256: `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed`
- failure occurred at SHA256 equality; final binary Git-blob gate was not reached; no proof output is VERIFIED.

## FRESH CANONICAL LOCAL PASS — VERIFIED
ONE pass from `/mnt/data/ner-menu-repair/right-q70-a60.webp`:
- bytes `51376`
- SHA256 `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed`
- base64 length `68504`
- final binary Git blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`
- local reassembly/decode exactly equals source bytes.

Fresh canonical range text-blob SHAs:
- `right-00.b64` `[0:6000]` → `4cfbab61acc0c0e6489b51da0bb423c2da1d5e50`
- `right-01.b64` `[6000:18000]` → `d7ea4dac7f9d38b0e0d80a1dd306f3d6b9549df9`
- `right-02.b64` `[18000:30000]` → `010d7aedd8d7681240b1e6d555819065fab9ac33`
- `right-03.b64` `[30000:48000]` → `654a08614380f215c9b3c785bf6945add55b897f`
- `right-04a.b64` `[48000:54000]` → `0699b88e134d2ae675e7dee3a46d829eff79208e`
- `right-04b.b64` `[54000:60000]` → `1de2d4138e0ac4ba68f11a26329f15f8dcf6533a`
- `right-04c.b64` `[60000:66000]` → `41bd3338b623908f19399f4d4dac59dcf832903f`
- `right-04d.b64` `[66000:68504]` → `87d79ed174e11938becb04788693164198f5e632`

## REPAIR-BRANCH COMPARISON — EXACT MISMATCH SET VERIFIED
Current repair branch head inspected: `0f70807c3c33e30335874c7337e4121572a036ad`, tree `0028ce1f94df74934e6d2204e93bfcd8f7925106`.

Current blobs versus fresh canonical expected:
- `right-00.b64`: current `4cfbab61acc0c0e6489b51da0bb423c2da1d5e50` = expected — MATCH
- `right-01.b64`: current `c4a33fd7e0ebf46121c8a2c7a7db397364b0be26` != expected `d7ea4dac7f9d38b0e0d80a1dd306f3d6b9549df9` — **ONLY MISMATCH**
- `right-02.b64`: current `010d7aedd8d7681240b1e6d555819065fab9ac33` = expected — MATCH
- `right-03.b64`: current `654a08614380f215c9b3c785bf6945add55b897f` = expected — MATCH
- `right-04a.b64`: current `0699b88e134d2ae675e7dee3a46d829eff79208e` = expected — MATCH
- `right-04b.b64`: current `1de2d4138e0ac4ba68f11a26329f15f8dcf6533a` = expected — MATCH
- `right-04c.b64`: current `41bd3338b623908f19399f4d4dac59dcf832903f` = expected — MATCH
- `right-04d.b64`: current `87d79ed174e11938becb04788693164198f5e632` = expected — MATCH

Therefore the failed assembled payload is localized to **exactly one staging file: `repair-staging/right/right-01.b64`**. No other staged range needs repair.

## REJECTED / DO NOT USE
- stale/mismatched `right-01.b64` blob `c4a33fd7e0ebf46121c8a2c7a7db397364b0be26`
- top non-target `812e704774c25a1c2387e03e48a3d1eb27b9e672`
- bottom non-target `65c0568c8b4895ead37932fa6c7f2814ec4c90a1`
- failed/truncated top `b728455af0996ff48b21e49e1fd2b3c05e5fb4ea`
- failed right one-shot `06e26ae2448ecc5383a452760f6f21f58daea62e`
- rejected direct right-03 blobs `86f52cd5...` and `a41faed8...`
- failed assembled payload SHA256 `f2f715dc111e302ea6dd612df1e8a475a14ff33706bfc5c48f0fa3143583182c`
- invalid orphan blobs `35c12cd9...`, `42c06cd2...`, `9af0dd1f...`

## DO NOT REPEAT
- No repo-wide/source/Library audits or completed V2/Session1/2A/2B.1/layout/orientation/calculator/P0 work; no redraw/reconstruction.
- Do not alter the seven matching right staging files.
- Do not rerun final-right workflow until `right-01.b64` is repaired to fresh canonical blob `d7ea4dac...` and that repair is checkpointed.
- Do not touch production paths before final right binary target `a4d051c5...` is VERIFIED durable.

## OPEN BLOCKERS
1. Repair ONLY `repair-staging/right/right-01.b64` to canonical local range `[6000:18000]`, target text-blob `d7ea4dac7f9d38b0e0d80a1dd306f3d6b9549df9`.
2. Checkpoint exact repaired file before any assembler rerun.
3. Re-verify all eight staged blob SHAs match the fresh canonical list; then trigger final assembler once with a new deterministic trigger change.
4. Independently verify final binary Git blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`; checkpoint.
5. Only then: production mapping → cleanup → QA/manual acceptance.

## EXACT NEXT RECOVERY ACTION
After confirming this checkpoint is durable, repair RIGHT ONLY and ONLY `right-01.b64`. To avoid another large-string mutation, regenerate canonical `[6000:18000]` once and split it into two new 6,000-char repair-only files `right-01a-fresh.b64` `[6000:12000]` and `right-01b-fresh.b64` `[12000:18000]`. Create/verify `right-01a-fresh.b64` first and immediately checkpoint it before creating `right-01b-fresh.b64`. Do not edit current `right-01.b64` yet.

# CURRENT HANDOFF — NER Menu Quantity

> EMERGENCY CRASH-SAFE RECOVERY CHECKPOINT — SAVE FIRST, ANALYZE SECOND.
> Source of truth: current GitHub `main` + actual code + `recipe_master.json`; current `main` wins if any status below becomes stale.

## CURRENT OBJECTIVE
Finish V3 Session 2B.2 by restoring the three exact browser-decodable approved high-resolution character overlays without changing verified layout/business logic; then run existing sharpness/UI QA and manually inspect `31-*sharpness-v2` screenshots.

## LATEST VERIFIED CHECKPOINT
- V2 P0-A/B/C/D VERIFIED; V3 Session 1 VERIFIED; Session 2A DONE; Session 2B.1 VERIFIED — do not redo.
- Recovered approved source `image-gen-2(7).png` VERIFIED.
- UI QA run `36012464625`, job `107676382757`: layout/geometry/character presence/center frame/top composition/rhythm/orientation/layering PASSED; V3 high-res sharpness failed on browser image load/decode (`img.onerror`) for top-left WebP.
- Exact top Git object VERIFIED present: `990c6b3523f79a483f41f17032f03f880f97f461`.
- Exact bottom Git object VERIFIED present: `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`.
- Exact right local candidate `right-q70-a60.webp` VERIFIED locally: 51,376 bytes, RIFF/WEBP, SHA256 `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed`, deterministic Git blob SHA exactly `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
- Prior lookup of right target `a4d051c52a4b0f5191ad2770c3eee416fa01aba4` returned 404, so right exact object is not yet VERIFIED present.
- No production asset path has been changed by the exact-target recovery flow.

## RIGHT STAGING — VERIFIED RECOVERABLE PREFIX
Repair branch: `repair/v3-2b2-exact-blobs-20260924`.

Verified exact files:
- `repair-staging/right/right-00.b64` — 6,000 chars — blob `4cfbab61acc0c0e6489b51da0bb423c2da1d5e50`.
- `repair-staging/right/right-01.b64` — 12,000 chars — blob `c4a33fd7e0ebf46121c8a2c7a7db397364b0be26`.
- `repair-staging/right/right-02.b64` — 12,000 chars — commit `3d437d72c62484c9a991c3938ed7c1a4711455ff`, blob `010d7aedd8d7681240b1e6d555819065fab9ac33`; matches exact local offsets `18,000–29,999`.

Verified staged exact prefix is therefore base64 chars `0–29,999` = 30,000 chars total.

## RIGHT CHUNK 03 — MISMATCH CHECKPOINT
- A create attempt for `repair-staging/right/right-03.b64` received GitHub 422 (`sha` not supplied), proving the path had been created concurrently before that write could be accepted. The failed create call made no additional write.
- Repair branch head after that concurrent creation is commit `80c1b79dbb0cbacd39104d7a5f5e30a21dc9f60e` (`Stage exact right chunk 03`).
- Tree inspection shows `repair-staging/right/right-03.b64` is 18,000 chars with Git blob SHA `86f52cd5f36c0b84fde7009287937064d41ee4b7`.
- Exact local right base64 segment for offsets `30,000–47,999` is also 18,000 chars, but its deterministic Git blob SHA is `654a08614380f215c9b3c785bf6945add55b897f`.
- Therefore current `right-03.b64` DOES NOT match the exact local payload and is NOT VERIFIED / MUST NOT be used for assembly.
- `right-00`/`01`/`02` remain verified exact and MUST NOT be rewritten.

## VERIFIED FINDINGS
1. Known blocker remains binary browser decode/load, not layout/geometry/business logic.
2. Intended dimensions remain top 518×500, bottom 655×524, right 556×851.
3. Story acceptance remains top glasses/drink/gesture/bubble; bottom NO GLASSES/helmet/cat-table/bubble; right white backpack/clipboard-pen/food-chalkboard/bubble.
4. Top and bottom exact objects are durable in Git object storage.
5. Right exact local bytes are verified; remaining right work is transport only.
6. Right staging offsets `0–29,999` are durably VERIFIED exact.
7. Current `right-03.b64` is a verified mismatch and must be corrected before any further right staging/assembly.

## WORK OBSERVED BUT NOT YET DURABLY VERIFIED
- Exact right target object `a4d051c52a4b0f5191ad2770c3eee416fa01aba4` is not yet VERIFIED present in Git.
- Right exact payload after offset 30,000 is not yet durably exact in staging because current `right-03.b64` mismatches.
- No clean production tree/commit mapping exactly the three target blobs to `assets/overlay-*-hires.webp` is VERIFIED yet.
- Temporary repair staging artifacts still need cleanup after exact-object recovery.
- Post-repair QA/sharpness PASS and manual screenshot acceptance remain open.

## REJECTED / DO NOT USE
- Top non-target `812e704774c25a1c2387e03e48a3d1eb27b9e672`.
- Bottom q30/non-target `65c0568c8b4895ead37932fa6c7f2814ec4c90a1`.
- Failed/truncated top `b728455af0996ff48b21e49e1fd2b3c05e5fb4ea`.
- Failed right one-shot transport `06e26ae2448ecc5383a452760f6f21f58daea62e`.
- Current mismatched staging file `repair-staging/right/right-03.b64` blob `86f52cd5f36c0b84fde7009287937064d41ee4b7`.
- Invalid orphan blobs `35c12cd9...`, `42c06cd2...`, `9af0dd1f...` and prior blank replacements.

## DO NOT REPEAT
- Repo-wide/source/Library audits or prior completed V2/Session1/2A/2B.1 investigations.
- Layout/orientation/calculator/P0 investigations.
- Character redraw/reconstruction.
- Re-verify/retransport top or bottom unless Git object state unexpectedly changes.
- Re-investigate right image content; exact right bytes already hash to target.
- Re-stage or rewrite `right-00.b64`, `right-01.b64`, or `right-02.b64`.
- Stage any later right chunk or assemble the payload while `right-03.b64` remains mismatched.
- Modify production paths before right target object is VERIFIED present.

## OPEN BLOCKERS
1. Correct ONLY `repair-staging/right/right-03.b64` to exact local base64 offsets `30,000–47,999`, 18,000 chars, expected Git blob `654a08614380f215c9b3c785bf6945add55b897f`.
2. Persist verification of corrected `right-03` before staging anything later.
3. Stage remaining exact right payload chars `48,000–68,503` in small recoverable chunks.
4. Assemble/decode full exact right payload and verify Git object target `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
5. Map all three exact blobs to production paths only after step 4 is durable.
6. Clean temporary repair staging artifacts; then run post-repair QA/manual screenshot acceptance.

## EXACT NEXT RECOVERY ACTION
RIGHT ONLY. After confirming this checkpoint is durable, replace ONLY `repair-staging/right/right-03.b64` on `repair/v3-2b2-exact-blobs-20260924` using its current blob SHA `86f52cd5f36c0b84fde7009287937064d41ee4b7` and the exact local base64 chars `30,000–47,999`. Verify resulting size = 18,000 and Git blob SHA = `654a08614380f215c9b3c785bf6945add55b897f`, then immediately persist a new checkpoint before touching chars `48,000+` or production paths.

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

Durable right staging currently verified from repair-branch tree:
- `repair-staging/right/right-00.b64` — 6,000 chars — blob `4cfbab61acc0c0e6489b51da0bb423c2da1d5e50`.
- `repair-staging/right/right-01.b64` — 12,000 chars — blob `c4a33fd7e0ebf46121c8a2c7a7db397364b0be26`.
- `repair-staging/right/right-02.b64` — 12,000 chars — commit `3d437d72c62484c9a991c3938ed7c1a4711455ff`, blob `010d7aedd8d7681240b1e6d555819065fab9ac33`.

Verification performed for the latest completed small chunk:
- Local exact right base64 payload length remains 68,504 chars.
- Local expected segment for offsets `18,000–29,999` is 12,000 chars.
- Deterministic Git blob SHA for that exact local segment is `010d7aedd8d7681240b1e6d555819065fab9ac33`.
- Repair-branch `right-02.b64` is size 12,000 and has exactly the same blob SHA `010d7aedd8d7681240b1e6d555819065fab9ac33`.
- Therefore `right-02.b64` is VERIFIED exact and MUST NOT be rewritten.
- Verified staged prefix is now exactly base64 chars `0–29,999` = 30,000 chars total.
- Remaining exact right payload is chars `30,000–68,503` = 38,504 chars.

## VERIFIED FINDINGS
1. Known blocker remains binary browser decode/load, not layout/geometry/business logic.
2. Intended dimensions remain top 518×500, bottom 655×524, right 556×851.
3. Story acceptance remains:
   - top: glasses + drink + gesture + speech bubble
   - bottom: NO GLASSES + helmet + cat/table + speech bubble
   - right: white backpack + clipboard/pen + food/chalkboard + speech bubble
4. Top and bottom exact objects are already durable in Git object storage.
5. Right exact local bytes are already verified; remaining right work is transport only.
6. Right staging prefix through offset 30,000 is now durably VERIFIED exact.

## WORK OBSERVED BUT NOT YET DURABLY VERIFIED
- Exact right target object `a4d051c52a4b0f5191ad2770c3eee416fa01aba4` is not yet VERIFIED present in Git.
- Right payload after base64 offset 30,000 is not yet verified/staged at this checkpoint.
- No clean production tree/commit mapping exactly the three target blobs to `assets/overlay-*-hires.webp` is VERIFIED yet.
- Temporary repair staging artifacts still need cleanup after exact-object recovery.
- Post-repair QA/sharpness PASS and manual screenshot acceptance remain open.

## REJECTED / DO NOT USE
- Top non-target `812e704774c25a1c2387e03e48a3d1eb27b9e672`.
- Bottom q30/non-target `65c0568c8b4895ead37932fa6c7f2814ec4c90a1`.
- Failed/truncated top `b728455af0996ff48b21e49e1fd2b3c05e5fb4ea`.
- Failed right one-shot transport `06e26ae2448ecc5383a452760f6f21f58daea62e`.
- Invalid orphan blobs `35c12cd9...`, `42c06cd2...`, `9af0dd1f...` and prior blank replacements.

## DO NOT REPEAT
- Repo-wide/source/Library audits or prior completed V2/Session1/2A/2B.1 investigations.
- Layout/orientation/calculator/P0 investigations.
- Character redraw/reconstruction.
- Re-verify/retransport top or bottom unless Git object state unexpectedly changes.
- Re-investigate right image content; exact right bytes already hash to target.
- Re-stage or rewrite `right-00.b64`, `right-01.b64`, or `right-02.b64`; offsets `0–29,999` are already durable and exact.
- Modify production paths before right target object is VERIFIED present.

## OPEN BLOCKERS
1. Stage remaining exact right payload chars `30,000–68,503` in small recoverable chunks, verifying each chunk before moving on.
2. Assemble/decode full exact right payload and verify Git object target `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
3. Map all three exact blobs to production paths only after step 2 is durably verified.
4. Clean temporary repair staging artifacts.
5. Run post-repair QA and manual screenshot acceptance.

## EXACT NEXT RECOVERY ACTION
RIGHT ONLY. Start from exact base64 offset `30,000` on `repair/v3-2b2-exact-blobs-20260924`. Stage ONE small next chunk without rewriting `right-00`/`01`/`02`; verify its size and Git blob SHA against the exact local segment; then immediately persist a new `CURRENT_HANDOFF.md` checkpoint before staging any further chunk. Do not touch production paths or perform unrelated investigation.

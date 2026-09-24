# CURRENT HANDOFF — NER Menu Quantity

> EMERGENCY CRASH-SAFE RECOVERY CHECKPOINT — SAVE FIRST, ANALYZE SECOND.
> Source of truth: current GitHub `main` + actual code + `recipe_master.json`; current `main` wins if any status below becomes stale.

## CURRENT OBJECTIVE
Finish V3 Session 2B.2: restore the three exact browser-decodable approved high-resolution character overlays without changing verified layout/business logic; then run existing sharpness/UI QA and manually inspect `31-*sharpness-v2` screenshots.

## LATEST VERIFIED CHECKPOINT
- V2 P0-A/B/C/D: VERIFIED — do not redo.
- V3 Session 1 layering/orientation/background: VERIFIED — do not redo.
- V3 Session 2A root-cause audit: DONE — do not redo.
- V3 Session 2B.1 sampling/compositing safety: VERIFIED — do not redo.
- Recovered approved source `image-gen-2(7).png`: VERIFIED as intended story-complete source.
- UI QA run `36012464625`, job `107676382757`: layout/geometry/character presence/center frame/top composition/rhythm/orientation/layering passed; V3 high-res sharpness failed on browser image load/decode (`img.onerror`) for top-left WebP.
- Temporary repair branch `repair/v3-2b2-exact-blobs-20260924` exists.
- Exact top Git object is VERIFIED present: `990c6b3523f79a483f41f17032f03f880f97f461`; not yet wired to production.
- Exact bottom Git object is VERIFIED present: `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`; not yet wired to production.
- Exact right local candidate `right-q70-a60.webp` is VERIFIED: 51,376 bytes, RIFF/WEBP, SHA256 `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed`, deterministic Git blob SHA `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
- Git object lookup for exact right target still returns 404.
- No production asset path has been changed in this exact-target flow.

## RIGHT TRANSPORT — FAILED EXACT-HASH GATE
- One-shot `create_blob(base64)` returned `06e26ae2448ecc5383a452760f6f21f58daea62e`, NOT exact target `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
- `06e26ae...` is REJECTED and MUST NOT be wired.
- Failed attempt changed no production path.

## RIGHT TRANSPORT — RECOVERABLE CHUNK STAGING
- Exact right base64 payload is 68,504 characters, derived directly from the verified local 51,376-byte candidate.
- Staging is on `repair/v3-2b2-exact-blobs-20260924`; production paths remain untouched.
- Durably staged:
  - `repair-staging/right/right-00.b64` — first 6,000 chars — commit `9f24a61cc3145279f3005235048938948c344b0e`
  - `repair-staging/right/right-01.b64` — next 12,000 chars — commit `f6993bad59ca903bfc814e9f3c2bd995b7de81ac`
- Staged prefix length is exactly 18,000 characters. Remaining exact payload length is 50,504 characters.
- Right exact target object is still absent (404) after these staging commits.

## VERIFIED FINDINGS
1. Known blocker is binary browser decode/load, not layout/geometry/business logic.
2. Intended dimensions remain top 518×500, bottom 655×524, right 556×851.
3. Story acceptance remains top glasses/drink/gesture/bubble; bottom NO GLASSES/helmet/cat-table/bubble; right white backpack/clipboard-pen/food-chalkboard/bubble.
4. Exact top and bottom Git objects are VERIFIED present.
5. Exact right local bytes are VERIFIED; remaining right work is transport only.
6. Repair scope remains binary asset bytes only unless concrete post-repair QA proves otherwise.

## WORK OBSERVED BUT NOT YET DURABLY VERIFIED
- Exact right target object `a4d051c5...` is still not verified present in Git.
- Right payload after character 18,000 is not staged at this checkpoint.
- No clean production tree/commit mapping the three exact target blobs to `assets/overlay-*-hires.webp` exists yet.
- Temporary repair staging artifacts remain repair-only and are not production.
- Post-repair QA/sharpness PASS and manual local/live screenshot acceptance remain open.

## REJECTED / DO NOT USE
- Top non-target `812e704774c25a1c2387e03e48a3d1eb27b9e672`.
- Bottom q30/non-target `65c0568c8b4895ead37932fa6c7f2814ec4c90a1`.
- Failed/truncated top `b728455af0996ff48b21e49e1fd2b3c05e5fb4ea`.
- Failed right transport `06e26ae2448ecc5383a452760f6f21f58daea62e`.
- Invalid orphan blobs `35c12cd9...`, `42c06cd2...`, `9af0dd1f...` and prior blank replacements.

## DO NOT REPEAT
- Repo-wide/source/Library audits or completed V2/Session1/2A/2B.1 investigations.
- Layout/orientation/calculator/P0 investigations.
- Character redraw/reconstruction.
- Re-verify/retransport top or bottom unless Git object state unexpectedly changes.
- Re-investigate right image content; exact right bytes already hash to target.
- Re-stage right payload characters 0–17,999 (`right-00`, `right-01`); already durable.
- Wire production paths before right target object is verified present.
- Wire/reuse failed right blob `06e26ae...`.

## OPEN BLOCKERS
1. Stage remaining exact right payload chars 18,000–68,503 without mutation, deterministically assemble/decode, and verify Git SHA exactly `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
2. Production mapping of all three exact targets not yet done.
3. Temporary repair staging artifacts need cleanup after exact-object recovery.
4. QA/manual screenshot acceptance remain open.

## EXACT NEXT RECOVERY ACTION
Right ONLY. Resume staging from exact base64 character offset 18,000 on `repair/v3-2b2-exact-blobs-20260924`; do not rewrite `right-00` or `right-01`. After the full 68,504-character payload is durably staged, assemble/decode deterministically, verify local SHA256 and Git blob SHA, require Git target exactly `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`, then immediately checkpoint success before any production mapping or cleanup.

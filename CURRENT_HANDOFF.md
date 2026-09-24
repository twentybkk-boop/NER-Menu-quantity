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
- Exact right local candidate `right-q70-a60.webp` is now minimally VERIFIED: 51,376 bytes, RIFF/WEBP, deterministic Git blob SHA exactly `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
- Git object lookup for exact right target `a4d051c52a4b0f5191ad2770c3eee416fa01aba4` returned 404 at this checkpoint; exact right object is not yet present in Git object storage.
- No production asset path has been changed in this exact-target flow.

## EVIDENCE CHECKED
- Current GitHub handoff only as needed for crash-safe continuation.
- Local right exact candidate byte length/header/deterministic Git SHA.
- Right exact target Git object lookup returned 404.
- Deterministic targets:
  - top `990c6b3523f79a483f41f17032f03f880f97f461`
  - bottom `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`
  - right `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`

## VERIFIED FINDINGS
1. Known blocker is binary browser decode/load, not layout/geometry/business logic.
2. Intended dimensions remain top 518×500, bottom 655×524, right 556×851.
3. Story acceptance remains top glasses/drink/gesture/bubble; bottom NO GLASSES/helmet/cat-table/bubble; right white backpack/clipboard-pen/food-chalkboard/bubble.
4. Exact top and bottom Git objects are VERIFIED present.
5. Exact right local bytes are VERIFIED to hash to target `a4d051c5...`; remaining right work is transport only.
6. Repair scope remains binary asset bytes only unless concrete post-repair QA proves otherwise.

## WORK OBSERVED BUT NOT YET DURABLY VERIFIED
- Exact right target object is absent (404) and still needs binary-safe transport.
- No clean production tree/commit mapping exactly the three target blobs to the three `assets/overlay-*-hires.webp` paths exists yet.
- Temporary bottom staging chunks `bottom-00` through `bottom-02` remain repair-only artifacts and are not production.
- Post-repair QA/sharpness PASS and manual local/live screenshot acceptance remain open.

## REJECTED / DO NOT USE
- Top non-target `812e704774c25a1c2387e03e48a3d1eb27b9e672`.
- Bottom q30/non-target `65c0568c8b4895ead37932fa6c7f2814ec4c90a1`.
- Failed/truncated top `b728455af0996ff48b21e49e1fd2b3c05e5fb4ea`.
- Invalid orphan blobs `35c12cd9...`, `42c06cd2...`, `9af0dd1f...` and prior blank replacements.

## DO NOT REPEAT
- Repo-wide/source/Library audits or prior completed V2/Session1/2A/2B.1 investigations.
- Layout/orientation/calculator/P0 investigations.
- Character redraw/reconstruction.
- Re-verify/retransport top or bottom unless Git object state unexpectedly changes.
- Re-investigate right image content; exact right bytes already hash to target.
- Wire production paths before right target object is verified present.

## OPEN BLOCKERS
1. Transport exact 51,376-byte right payload and verify exact target object in Git.
2. Production mapping of all three exact targets not yet done.
3. Temporary repair staging artifacts need cleanup after exact-object recovery is complete.
4. QA/manual screenshot acceptance remain open.

## EXACT NEXT RECOVERY ACTION
Small chunk only: transport the already-verified 51,376-byte exact right payload with binary-safe non-truncating `create_blob(base64)`; verify returned SHA equals `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`; immediately persist success before any production path mapping or staging cleanup.

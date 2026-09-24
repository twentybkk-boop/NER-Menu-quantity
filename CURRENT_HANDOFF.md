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
- Exact top-left Git object is VERIFIED present: `990c6b3523f79a483f41f17032f03f880f97f461`; not yet wired to production.
- Exact bottom-left local candidate `bottom-q70-a60.webp` has now been minimally re-verified: 39,712 bytes, RIFF/WEBP, deterministic Git blob SHA exactly `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`.
- Git object lookup for exact bottom target `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45` returned 404 before transport; exact bottom object is not yet present at this checkpoint.

## EVIDENCE CHECKED
- Current GitHub handoff only as needed for crash-safe continuation.
- Local bottom exact candidate byte length/header/deterministic Git SHA.
- Bottom target Git object lookup returned 404.
- Deterministic targets remain:
  - top `990c6b3523f79a483f41f17032f03f880f97f461`
  - bottom `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`
  - right `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`

## VERIFIED FINDINGS
1. Known blocker is binary browser decode/load, not layout/geometry/business logic.
2. Intended dimensions remain top 518×500, bottom 655×524, right 556×851.
3. Story acceptance remains top glasses/drink/gesture/bubble; bottom NO GLASSES/helmet/cat-table/bubble; right white backpack/clipboard-pen/food-chalkboard/bubble.
4. Exact top Git object is present and verified.
5. Exact bottom local bytes are verified to hash to `cf1f98ef...`; remaining bottom work is transport only.

## WORK OBSERVED BUT NOT YET DURABLY VERIFIED
- Exact bottom target Git object is absent (404) and still needs binary-safe transport.
- Exact right target `a4d051c52a4b0f5191ad2770c3eee416fa01aba4` is not yet verified present.
- No production path mapping has been made in the exact-target flow.
- Post-repair QA and manual screenshot acceptance remain open.

## REJECTED / DO NOT USE
- Top non-target `812e7047...`.
- Bottom q30/non-target `65c0568c...`.
- Failed/truncated top `b728455a...`.
- Invalid orphan blobs `35c12cd9...`, `42c06cd2...`, `9af0dd1f...` and prior blank replacements.

## DO NOT REPEAT
- Repo-wide/source/Library audits or prior completed V2/Session1/2A/2B.1 investigations.
- Layout/orientation/calculator/P0 investigations.
- Character redraw/reconstruction.
- Re-verify/retransport top unless Git state unexpectedly changes.
- Re-investigate bottom image content; exact bottom bytes already hash to target.
- Wire production paths before bottom and right targets are verified.

## OPEN BLOCKERS
1. Exact bottom target object not yet present in Git.
2. Exact right target object not yet verified in Git.
3. Production mapping of all three exact targets not yet done.
4. QA/manual screenshot acceptance remain open.

## EXACT NEXT RECOVERY ACTION
Small chunk only: transport the already-verified 39,712-byte exact bottom payload with the binary-safe non-truncating/chunk-assembled `create_blob` method; verify returned SHA equals `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`; immediately persist success before touching right or production paths.

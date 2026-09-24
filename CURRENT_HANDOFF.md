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
- Exact bottom-left local candidate `bottom-q70-a60.webp` is VERIFIED: 39,712 bytes, RIFF/WEBP, SHA256 `9d27c16f9185a4cac32a16f3415b4d60c392fcede32f877a863cad515b4baae8`, deterministic Git blob SHA exactly `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`.
- Git object lookup for exact bottom target returned 404 before transport.

## BOTTOM TRANSPORT — CRASH-SAFE STAGING PROGRESS
- Binary-safe chunk staging is in progress on `repair/v3-2b2-exact-blobs-20260924`.
- Exact bottom base64 payload length: 52,952 characters, split deterministically into 9 chunks: 8×6000 + final 4,952.
- Durably staged and committed:
  - `repair-staging/bottom/bottom-00.b64` — commit `895f39cd26c35b29cc9bbebb6246734ce0b472d7`
  - `repair-staging/bottom/bottom-01.b64` — commit `d1aac1c524f5277d86fbe27fbb7248d5742624ee`
  - `repair-staging/bottom/bottom-02.b64` — commit `b66d3e794bba4057de41b4cd78f378403f5cd349`
- No production asset path has been changed.

## VERIFIED FINDINGS
1. Known blocker is binary browser decode/load, not layout/geometry/business logic.
2. Intended dimensions remain top 518×500, bottom 655×524, right 556×851.
3. Story acceptance remains top glasses/drink/gesture/bubble; bottom NO GLASSES/helmet/cat-table/bubble; right white backpack/clipboard-pen/food-chalkboard/bubble.
4. Exact top Git object is present and verified.
5. Exact bottom local bytes are verified; remaining bottom work is transport only.

## WORK OBSERVED BUT NOT YET DURABLY VERIFIED
- Exact bottom target Git object is still not yet verified present.
- Bottom chunks `03–08` are not yet staged at this checkpoint.
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
- Re-stage bottom chunks `00–02`; they are already durable on the repair branch.
- Wire production paths before bottom and right targets are verified.

## OPEN BLOCKERS
1. Complete bottom chunk staging `03–08`, assemble/transport exact bottom payload, verify exact Git SHA.
2. Exact right target object not yet verified in Git.
3. Production mapping of all three exact targets not yet done.
4. QA/manual screenshot acceptance remain open.

## EXACT NEXT RECOVERY ACTION
Small chunk only: continue exact bottom transport from `repair-staging/bottom/bottom-03.b64` through `bottom-08.b64` on `repair/v3-2b2-exact-blobs-20260924`; assemble the exact 52,952-character base64 payload without mutation; create the binary Git object and verify the returned/resolved SHA equals `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`; immediately persist success before touching right or production paths.

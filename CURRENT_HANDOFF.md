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
- Exact bottom-left local candidate `bottom-q70-a60.webp` is VERIFIED: 39,712 bytes, RIFF/WEBP, SHA256 `9d27c16f9185a4cac32a16f3415b4d60c392fcede32f877a863cad515b4baae8`, deterministic Git blob SHA `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`.
- Exact bottom payload was successfully transported with binary-safe `create_blob(base64)`; returned Git blob SHA is exactly `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`. Bottom exact object is VERIFIED present in Git object storage and is not yet wired to production.

## BOTTOM TRANSPORT — RECONCILED
- Concurrent staging had already durably created `repair-staging/bottom/bottom-00.b64` through `bottom-02.b64` on the repair branch.
- Those staging chunks are now unnecessary for completing bottom transport because direct non-truncating `create_blob` succeeded with the full exact payload and returned target SHA `cf1f98ef...`.
- Do NOT continue staging `bottom-03` through `bottom-08` unless exact bottom Git object state is later proven missing.
- Existing staged `bottom-00` through `bottom-02` are temporary repair artifacts only; do not map them into production.
- No production asset path has been changed.

## VERIFIED FINDINGS
1. Known blocker is binary browser decode/load, not layout/geometry/business logic.
2. Intended dimensions remain top 518×500, bottom 655×524, right 556×851.
3. Story acceptance remains:
   - top: glasses + drink + gesture + speech bubble
   - bottom: NO GLASSES + helmet + cat/table + speech bubble
   - right: white backpack + clipboard/pen + food/chalkboard + speech bubble
4. Exact top Git object is VERIFIED present: `990c6b3523f79a483f41f17032f03f880f97f461`.
5. Exact bottom Git object is VERIFIED present: `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`.
6. Repair scope remains binary asset bytes only unless concrete post-repair QA proves otherwise.

## WORK OBSERVED BUT NOT YET DURABLY VERIFIED
- Exact right target `a4d051c52a4b0f5191ad2770c3eee416fa01aba4` is not yet VERIFIED present in Git through this exact-target flow.
- No production path mapping has been made in the exact-target flow.
- No clean production commit mapping exactly the three target blobs to the three `assets/overlay-*-hires.webp` paths is yet VERIFIED.
- Post-repair QA/sharpness PASS and manual local/live screenshot acceptance remain open.

## REJECTED / DO NOT USE
- Top non-target `812e704774c25a1c2387e03e48a3d1eb27b9e672`.
- Bottom q30/non-target `65c0568c8b4895ead37932fa6c7f2814ec4c90a1`.
- Failed/truncated top `b728455af0996ff48b21e49e1fd2b3c05e5fb4ea`.
- Invalid orphan blobs `35c12cd9...`, `42c06cd2...`, `9af0dd1f...` and prior blank replacements.

## POSSIBLE LOST ANALYSIS
- Any transient transport details not visible in Git/tool results are not promoted to VERIFIED.
- Redo only minimum missing chunks; do not restart completed investigations.

## DO NOT REPEAT
- Repo-wide/source/Library audits or prior completed V2/Session1/2A/2B.1 investigations.
- Layout/orientation/calculator/P0 investigations.
- Character redraw/reconstruction.
- Re-verify/retransport top or bottom unless Git object state unexpectedly changes.
- Continue bottom staging `03–08`; exact bottom object is already verified present.
- Wire production paths before right exact target is also verified.

## OPEN BLOCKERS
1. Exact right target object not yet verified in Git.
2. Production mapping of all three exact targets not yet done.
3. Temporary repair staging artifacts need cleanup after exact-object recovery is complete.
4. QA/manual screenshot acceptance remain open.

## EXACT NEXT RECOVERY ACTION
Small chunk only: minimally verify the already-known local right exact candidate bytes against deterministic target `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`; if the exact object is absent, transport ONLY that exact right payload with binary-safe non-truncating `create_blob`, verify returned SHA matches exactly, and immediately persist success before any production path mapping or staging cleanup.

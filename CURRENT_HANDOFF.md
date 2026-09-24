# CURRENT HANDOFF — NER Menu Quantity

> EMERGENCY CRASH-SAFE RECOVERY CHECKPOINT — SAVE FIRST, ANALYZE SECOND.
> Source of truth: current GitHub `main` + actual code + `recipe_master.json`; current `main` wins if any status below becomes stale.

## LATEST KNOWN STATE
- Current objective remains V3 Session 2B.2: restore browser-decodable high-resolution approved character overlays without changing verified layout/business logic, then run existing sharpness/UI QA and manually inspect `31-*sharpness-v2` screenshots.
- V2 P0-A/B/C/D: VERIFIED — do not redo.
- V3 Session 1 layering/orientation/background: VERIFIED — do not redo.
- V3 Session 2A root-cause audit: DONE — do not redo.
- V3 Session 2B.1 sampling/compositing safety: VERIFIED — do not redo.
- Recovered approved source `image-gen-2(7).png`: VERIFIED as intended story-complete source.
- `d32ff236c227d804c60e807749b2f41b3c05bb94` applied recovered high-res assets + cache bust.
- UI QA run `36012464625`, job `107676382757`: layout/geometry/character presence/center frame/top composition/rhythm/orientation/layering passed; V3 high-res sharpness failed on browser image load/decode (`img.onerror`) for `overlay-top-left-hires.webp`.
- Temporary repair branch `repair/v3-2b2-exact-blobs-20260924` was successfully created from checkpoint `e42fd4de658a3658f817d5d6e4d26d027194122a`.
- Top-left exact local candidate `top-q70-a8.webp` was re-verified from local bytes: 31,174 bytes, RIFF/WEBP, SHA256 `6d70ae5b226ff6b7f92b04853c702401da71e7d03ef9fbf94a8fd46bb01574ca`, deterministic Git blob SHA exactly `990c6b3523f79a483f41f17032f03f880f97f461`.
- Git object lookup for exact top target `990c6b3523f79a483f41f17032f03f880f97f461` returned 404 before transport, confirming that exact object was not yet present then.

## DONE / VERIFIED
1. Layout/geometry/business logic are not the known blocker.
2. Repair scope remains binary high-res character assets only unless post-repair QA proves a new concrete failure.
3. Intended asset dimensions remain:
   - top-left 518×500
   - bottom-left 655×524
   - right 556×851
4. Story acceptance requirements remain:
   - upper-left: glasses + drink + gesture + speech bubble
   - lower-left: NO GLASSES + helmet + cat/table + speech bubble
   - right: white backpack + clipboard/pen + food/chalkboard + speech bubble
5. Verified deterministic Git SHA targets:
   - top candidate target blob `990c6b3523f79a483f41f17032f03f880f97f461`
   - bottom candidate target blob `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`
   - right candidate target blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`
6. Repair branch creation is VERIFIED: `repair/v3-2b2-exact-blobs-20260924`.
7. Exact top local candidate bytes are VERIFIED to hash to target `990c6b3523f79a483f41f17032f03f880f97f461`; source/image investigation for top is complete.

## EMERGENCY RECOVERY CHUNK — TOP TRANSPORT ATTEMPT
- A binary-safe `create_blob(base64)` transport attempt was made with the verified top payload.
- Returned Git blob SHA was `b728455af0996ff48b21e49e1fd2b3c05e5fb4ea`, NOT target `990c6b3523f79a483f41f17032f03f880f97f461`.
- Root cause at the transport boundary: the very large base64 tool argument was truncated by the tool-call path before GitHub received the full payload.
- `b728455a...` is REJECTED and MUST NOT be wired into any tree/path.
- No production asset path was modified by this failed transport.

## WORK OBSERVED BUT NOT YET DURABLY VERIFIED
- Git blob `812e704774c25a1c2387e03e48a3d1eb27b9e672` does NOT equal the verified top target; do NOT wire it.
- Bottom q30/recompressed blob `65c0568c8b4895ead37932fa6c7f2814ec4c90a1` does NOT equal verified bottom target `cf1f98ef...`; it is NOT an accepted production candidate.
- Failed/truncated transport blob `b728455af0996ff48b21e49e1fd2b3c05e5fb4ea` does NOT equal top target; do NOT wire it.
- Exact top target blob `990c6b35...` still needs a transport path that preserves all bytes without large-argument truncation.
- Bottom/right exact target blobs have not yet been recovered through this exact-target flow.
- No clean production commit changing exactly the three high-res WebP paths is yet durably VERIFIED.
- Post-repair UI QA/sharpness PASS is not yet verified.
- Manual local/live `31-*sharpness-v2` screenshot acceptance is not yet verified.

## DO NOT REPEAT
- Repo-wide audit.
- Source recovery / Library search for `image-gen-2(7).png`.
- V2 / Session 1 / Session 2A / Session 2B.1 investigations.
- P0-A/P0-B/P0-D/orientation/calculator investigations.
- Character redraw/reconstruction or synthetic composition from separate parts.
- Invalid orphan blobs `35c12cd9...`, `42c06cd2...`, `9af0dd1f...`.
- Previously rejected blank/transparent high-res replacements.
- Re-audit of already-cleaned staging/tmp incidents.
- Wiring non-target blobs `812e7047...`, `65c0568c...`, or `b728455a...` into production.
- Retry the failed encoded branch-lookup URL pattern.
- Recreate the temporary repair branch unless its ref is proven missing.
- Re-investigate or recompress the top image; exact local top bytes are already verified.
- Retry one giant base64 `create_blob` tool argument; that path has proven truncation-prone in this session.

## EXACT NEXT RECOVERY ACTION
Top-left ONLY. Use a recoverable transport method that avoids a single oversized tool argument (for example, chunked text staging on the temporary repair branch plus deterministic reconstruction in a one-shot GitHub Action/workflow, or another available file-aware binary upload path). Verify the resulting Git object SHA exactly equals `990c6b3523f79a483f41f17032f03f880f97f461`, then immediately persist that success before touching bottom/right. Do not modify production asset paths until this exact target exists and is verified.

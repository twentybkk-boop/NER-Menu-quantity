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
- Temporary repair branch `repair/v3-2b2-exact-blobs-20260924` exists from checkpoint `e42fd4de658a3658f817d5d6e4d26d027194122a`.
- Exact top-left local candidate `top-q70-a8.webp`: 31,174 bytes, RIFF/WEBP, SHA256 `6d70ae5b226ff6b7f92b04853c702401da71e7d03ef9fbf94a8fd46bb01574ca`, deterministic Git blob SHA `990c6b3523f79a483f41f17032f03f880f97f461`.
- A prior oversized transport attempt produced wrong blob `b728455af0996ff48b21e49e1fd2b3c05e5fb4ea`; that blob remains REJECTED.
- A later chunk-assembled binary-safe `create_blob(base64)` call successfully returned exact target SHA `990c6b3523f79a483f41f17032f03f880f97f461`.
- Follow-up `fetch_blob(990c6b35...)` no longer returns 404; connector reached the binary object and failed only because it attempted UTF-8 decoding (`UnicodeDecodeError` at WebP byte 4). Together with exact `create_blob` return SHA, the top target object is VERIFIED present in Git object storage.
- No production asset path has been changed by this exact-target recovery flow yet.

## EVIDENCE CHECKED
- Current GitHub handoff only as needed for crash-safe reconciliation.
- Local exact top candidate bytes and deterministic SHA.
- Exact `create_blob` return: `990c6b3523f79a483f41f17032f03f880f97f461`.
- Binary fetch behavior for the same exact SHA: object resolves but connector cannot UTF-8 decode it.
- Deterministic targets:
  - top `990c6b3523f79a483f41f17032f03f880f97f461`
  - bottom `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`
  - right `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`

## VERIFIED FINDINGS
1. Known blocker is binary browser decode/load, not layout/geometry/business logic.
2. Intended dimensions remain top 518×500, bottom 655×524, right 556×851.
3. Story acceptance remains:
   - top: glasses + drink + gesture + speech bubble
   - bottom: NO GLASSES + helmet + cat/table + speech bubble
   - right: white backpack + clipboard/pen + food/chalkboard + speech bubble
4. Exact top-left Git object is now VERIFIED present: `990c6b3523f79a483f41f17032f03f880f97f461`.
5. Repair scope remains binary asset bytes only unless concrete post-repair QA proves otherwise.

## WORK OBSERVED BUT NOT YET DURABLY VERIFIED
- Exact bottom target `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45` is not yet VERIFIED present in Git through this exact-target flow.
- Exact right target `a4d051c52a4b0f5191ad2770c3eee416fa01aba4` is not yet VERIFIED present in Git through this exact-target flow.
- No clean production tree/commit mapping exactly the three target blobs to the three `assets/overlay-*-hires.webp` paths exists yet.
- Post-repair UI QA/sharpness PASS and manual local/live screenshot acceptance remain open.

## REJECTED / DO NOT USE
- Top non-target blob `812e704774c25a1c2387e03e48a3d1eb27b9e672`.
- Bottom q30/recompressed non-target blob `65c0568c8b4895ead37932fa6c7f2814ec4c90a1`.
- Failed/truncated top blob `b728455af0996ff48b21e49e1fd2b3c05e5fb4ea`.
- Invalid orphan blobs `35c12cd9...`, `42c06cd2...`, `9af0dd1f...`.
- Previously rejected blank/transparent replacements.

## POSSIBLE LOST ANALYSIS
- Any transient transport details not visible in Git/tool results are not promoted to VERIFIED.
- Redo only minimum missing chunks; do not restart completed investigations.

## DO NOT REPEAT
- Repo-wide audit, source recovery, Library search, prior V2/Session1/2A/2B.1 investigations.
- Layout/orientation/calculator/P0 investigations.
- Character redraw/reconstruction or synthetic composition.
- Re-audit cleaned staging/tmp incidents.
- Recreate/retransport top exact blob unless Git object state unexpectedly changes.
- Wire any production asset path before bottom and right exact target blobs are also verified.

## OPEN BLOCKERS
1. Exact bottom target object not yet verified in Git.
2. Exact right target object not yet verified in Git.
3. Three targets not yet mapped to production asset paths.
4. Post-repair QA/manual screenshot acceptance remain open.

## EXACT NEXT RECOVERY ACTION
Small chunk only: verify local bottom exact candidate bytes against deterministic target `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`; transport ONLY that exact payload with a non-truncating/chunk-assembled binary-safe `create_blob`, verify returned SHA matches exactly, and immediately persist the result here. Do not attempt right or production path mapping before that checkpoint.

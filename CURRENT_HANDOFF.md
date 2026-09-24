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
- Exact right local candidate `right-q70-a60.webp` VERIFIED locally: 51,376 bytes, RIFF/WEBP, deterministic Git blob SHA exactly `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
- Prior lookup of right target `a4d051c52a4b0f5191ad2770c3eee416fa01aba4` returned 404, so right exact object was not yet VERIFIED present at that checkpoint.
- No production asset path has been changed by the exact-target recovery flow.

## EVIDENCE CHECKED
- Current handoff only as needed for crash-safe continuation.
- Exact deterministic targets:
  - top `990c6b3523f79a483f41f17032f03f880f97f461`
  - bottom `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`
  - right `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`
- Temporary repair branch exists: `repair/v3-2b2-exact-blobs-20260924`.
- During right transport recovery, an attempted `create_file` for `repair-staging/right/right-00.b64` returned GitHub `422 Invalid request: sha wasn't supplied`, which indicates that exact staging path already exists on the repair branch. No new write from that failed call was accepted.

## VERIFIED FINDINGS
1. Known blocker remains binary browser decode/load, not layout/geometry/business logic.
2. Intended dimensions remain top 518×500, bottom 655×524, right 556×851.
3. Story acceptance remains:
   - top: glasses + drink + gesture + speech bubble
   - bottom: NO GLASSES + helmet + cat/table + speech bubble
   - right: white backpack + clipboard/pen + food/chalkboard + speech bubble
4. Top and bottom exact objects are already durable in Git object storage.
5. Right exact local bytes are already verified; remaining right work is transport/reconciliation only.
6. The `right-00.b64` staging-path collision is a repository-state observation, not evidence that the right exact object is already present.

## WORK OBSERVED BUT NOT YET DURABLY VERIFIED
- Exact right target object is not yet VERIFIED present in Git.
- Existing `repair-staging/right/right-00.b64` content/size/role has not yet been checked in this recovery chunk.
- No clean production tree/commit mapping exactly the three target blobs to `assets/overlay-*-hires.webp` is VERIFIED yet.
- Temporary repair staging artifacts still need cleanup after exact-object recovery.
- Post-repair QA/sharpness PASS and manual screenshot acceptance remain open.

## POSSIBLE LOST ANALYSIS
- Some interrupted right-transport staging details may have existed only in transient tool/chat state.
- Do not reconstruct them wholesale. Re-check only the existing `right-00.b64` path and any directly adjacent right-staging state required to continue.

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
- Retry creating `repair-staging/right/right-00.b64` blindly.
- Modify production paths before right target object is VERIFIED present.

## OPEN BLOCKERS
1. Reconcile existing right staging path(s) on repair branch with the exact local right payload.
2. Transport/verify exact right Git object `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
3. Map all three exact blobs to production paths only after step 2 is durably verified.
4. Clean temporary repair staging artifacts.
5. Run post-repair QA and manual screenshot acceptance.

## EXACT NEXT RECOVERY ACTION
Small chunk only: fetch `repair-staging/right/right-00.b64` from branch `repair/v3-2b2-exact-blobs-20260924` and inspect only its metadata/content length against the first exact right base64 segment. If it matches, discover only directly adjacent `repair-staging/right/right-*.b64` files needed to determine how much exact payload is already durably staged; then persist that finding before any further right transport. If it does not match, persist the mismatch and replace only that path with the exact segment. Do not inspect unrelated repo state and do not touch production paths.

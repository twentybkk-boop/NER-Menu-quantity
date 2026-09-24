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
- Interrupted `tmp-binary-repair/*` staging was audited and removed; accidental staging/tmp files must not be restored.
- Current `main` head was explicitly re-verified during this recovery chunk as `e51eef046497158b9a1b31e81b2c162ad0f75ac3` (tree `5c946d7047910780185e214f8620a5de54360931`).
- A branch lookup attempt using an encoded slash URL returned connector `400 INVALID_ARGUMENT`; do not retry that lookup pattern. No repository state was changed by this failed read.

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
6. Exact current `main` head for the next repair-branch operation is VERIFIED as `e51eef046497158b9a1b31e81b2c162ad0f75ac3`.

## WORK OBSERVED BUT NOT YET DURABLY VERIFIED
- Git blob `812e704774c25a1c2387e03e48a3d1eb27b9e672` does NOT equal the verified top target; do NOT wire it into production.
- Bottom q30/recompressed blob `65c0568c8b4895ead37932fa6c7f2814ec4c90a1` does NOT equal verified bottom target `cf1f98ef...`; it is NOT an accepted production candidate.
- Local recovered candidate files visible in this conversation include `top-q70-a8.webp`, `bottom-q70-a60.webp`, and `right-q70-a60.webp`; re-verify only as needed for exact-byte transport.
- No temporary repair branch for this exact-target recovery chunk has yet been durably confirmed.
- No clean production commit changing exactly the three high-res WebP paths is yet durably VERIFIED.
- Post-repair UI QA/sharpness PASS is not yet verified.
- Manual local/live `31-*sharpness-v2` screenshot acceptance is not yet verified.

## POSSIBLE LOST ANALYSIS
- Some interrupted binary-transport implementation details may have existed only in transient chat/tool state.
- No hidden-only conclusion is promoted to VERIFIED.
- If a detail cannot be recovered from visible state or GitHub, redo only that minimal missing verification chunk; do not restart prior completed investigations.

## DO NOT REPEAT
- Repo-wide audit.
- Source recovery / Library search for `image-gen-2(7).png`.
- V2 / Session 1 / Session 2A / Session 2B.1 investigations.
- P0-A/P0-B/P0-D/orientation/calculator investigations.
- Character redraw/reconstruction or synthetic composition from separate parts.
- Invalid orphan blobs `35c12cd9...`, `42c06cd2...`, `9af0dd1f...`.
- Previously rejected blank/transparent high-res replacements.
- Re-audit of already-cleaned staging/tmp incidents.
- Wiring non-target blobs `812e7047...` or `65c0568c...` into production.
- Retry the failed encoded branch-lookup URL pattern.

## EXACT NEXT RECOVERY ACTION
Small chunk only: create the temporary repair branch directly from verified `main` SHA `e51eef046497158b9a1b31e81b2c162ad0f75ac3` (no encoded-URL lookup retry). Immediately persist the branch name/ref result before transporting any asset. After that checkpoint, transport ONLY the top-left exact candidate and verify its resulting Git blob SHA equals `990c6b3523f79a483f41f17032f03f880f97f461`, then checkpoint again before bottom/right.

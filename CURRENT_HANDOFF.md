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
- Prior durable checkpoints include `d21e0f04...` and `4cade999...`.

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
5. Current visible handoff records verified local candidates and deterministic Git SHA targets:
   - top candidate target blob `990c6b3523f79a483f41f17032f03f880f97f461`
   - bottom candidate target blob `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`
   - right candidate target blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`

## WORK OBSERVED BUT NOT YET DURABLY VERIFIED
- A Git blob `812e704774c25a1c2387e03e48a3d1eb27b9e672` was created during the latest interrupted attempt, but the current handoff explicitly says it does NOT equal the verified top candidate deterministic Git SHA; do NOT wire it into production.
- Local recovered candidate files visible in this conversation include `top-q70-a8.webp`, `bottom-q70-a60.webp`, and `right-q70-a60.webp`; they must be re-verified only as needed before production wiring.
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
- Wiring unverified blobs such as `812e7047...` into production.

## EXACT NEXT RECOVERY ACTION
Recover in one small chunk only: verify the exact current `main` head and create/use a temporary repair branch from that head; then transport only ONE candidate asset first (top-left) and verify its resulting Git blob SHA exactly equals `990c6b3523f79a483f41f17032f03f880f97f461`. Immediately persist that result in `CURRENT_HANDOFF.md` before attempting bottom-left or right. Do not modify production `main` asset paths until all three exact blob SHAs are durably verified.

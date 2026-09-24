# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE EMERGENCY RECOVERY CHECKPOINT — SAVE FIRST, ANALYZE SECOND.
> Source of truth: current GitHub `main` + actual code + `recipe_master.json`; current `main` wins if any status below becomes stale.

## CURRENT OBJECTIVE
Finish V3 Session 2B.2 by restoring browser-decodable high-resolution approved character overlays, preserving all verified production geometry/logic, then re-run only the existing sharpness/UI QA path and manually inspect the generated `31-*sharpness-v2` screenshots before closing the session.

## LATEST KNOWN STATE
- Emergency checkpoint commit: `bb864091d874c66b0d8935eed95dffa57f34817c`.
- Last durable milestone before emergency save: `4cade999fffce3bdfe1ea56a1ccca10c8398530c`, which recorded that interrupted staging had been audited and cleaned.
- `tmp-binary-repair/*` temporary files were removed from `main`; cleanup ended at `3244e2d74476273def00af0b695b9cbbced9491a` before the handoff checkpoint commit.
- Direct binary-safe Git object creation was confirmed usable via `create_blob`.
- A browser-safe/recompressed top-left candidate was created as Git blob `812e704774c25a1c2387e03e48a3d1eb27b9e672` but is NOT yet wired into production `main`.
- Bottom-left candidate has been minimally revalidated locally as a decodable WebP at 655×524 RGBA; right candidate has been minimally revalidated locally as a decodable WebP at 556×851 RGBA.
- Visual spot-check of q30 recovery candidates confirmed story content remains present: lower-left woman has NO GLASSES + helmet + cat/table + speech bubble; right woman has white backpack + clipboard/pen + food/chalkboard + speech bubble.
- An accidental temporary `tmp.txt` was created during recovery at commit `bd46866d...` due to wrong action selection, then immediately deleted at `35ec4e1f56d9946c56aabd604feb8d70a87ffad1`. It is not production state and must not be restored.

## DONE / VERIFIED
- V2 P0-A/B/C/D: VERIFIED — do not redo.
- V3 Session 1 layering/orientation/background: VERIFIED — do not redo.
- V3 Session 2A root-cause audit: DONE — do not redo.
- V3 Session 2B.1 sampling/compositing safety: VERIFIED — do not redo.
- Recovered approved source `image-gen-2(7).png`: VERIFIED as the intended story-complete source set.
- Commit `d32ff236c227d804c60e807749b2f41b3c05bb94` applied recovered high-res assets + cache-bust to `main`.
- UI QA run `36012464625` against `d32ff236...`: all checks through layering/orientation PASS; only `Verify V3 character high-res sharpness locally` FAILED.
- Concrete failure was browser load/decode failure on `overlay-top-left-hires.webp` via `img.onerror`; geometry/layout was not the failing area.
- Interrupted staging commits were audited and contained only `tmp-binary-repair/*`; those files were deleted from `main`.
- Production geometry, z-index, center frame, environment background, recipe/business logic, Matrix, PIN, import/export remain outside the intended repair scope.
- Accidental `tmp.txt` recovery file has been cleaned from `main`.

## WORK OBSERVED BUT NOT YET DURABLY VERIFIED
- Top-left repaired candidate exists as Git blob `812e704774c25a1c2387e03e48a3d1eb27b9e672`; not yet connected to `assets/overlay-top-left-hires.webp` on `main`.
- Bottom-left and right candidates are validated locally, but final Git blob SHAs have not yet been created/recorded in this handoff.
- No final three-asset repair commit has been created yet.
- No post-repair UI QA run has been verified yet.
- No local/live `31-*sharpness-v2` manual visual acceptance has been completed yet.

## EVIDENCE CHECKED
- Current `CURRENT_HANDOFF.md` as of emergency recovery.
- Previously visible UI QA evidence: run `36012464625`, job `107676382757`, failure at `qa/character-sampling-v1-contract.mjs` on browser image load.
- Previously visible staging audit and cleanup evidence.
- Visible tool result confirming successful creation of top-left Git blob `812e704774c25a1c2387e03e48a3d1eb27b9e672`.
- Local PIL decode checks for bottom-left and right candidate dimensions/mode.
- Visual previews for q30 bottom-left/right candidates.
- Accidental `tmp.txt` creation/deletion commits during this recovery chunk.

## VERIFIED FINDINGS
1. The blocker is not layout/geometry/character presence/center frame/top composition/rhythm/layering; those checks passed in run `36012464625`.
2. The blocker is browser decode/load failure of the high-res WebP payload path.
3. Intended repaired dimensions remain:
   - top-left 518×500
   - bottom-left 655×524
   - right 556×851
4. Approved story requirements remain:
   - upper-left: glasses + drink + gesture + speech bubble
   - lower-left: NO GLASSES + helmet + cat/table + speech bubble
   - right: white backpack + clipboard/pen + food/chalkboard + speech bubble
5. Repair scope is binary asset bytes only unless a concrete post-repair QA failure proves otherwise.

## POSSIBLE LOST ANALYSIS
- Any hidden reasoning about exact recompression parameters, intermediate byte validation, or intended tree/commit assembly that was not explicitly surfaced in tool results is NOT considered durable or verified.
- Do not attempt to reconstruct hidden reasoning wholesale. Re-do only the minimum checks needed for the next binary asset chunk.

## HYPOTHESES REJECTED
- Do NOT treat this as a geometry/layout regression.
- Do NOT redo V2 / Session 1 / Session 2A / Session 2B.1.
- Do NOT restore invalid orphan blobs `35c12cd9...`, `42c06cd2...`, `9af0dd1f...`.
- Do NOT use prior large blank/transparent replacement WebPs.
- Do NOT synthesize production characters from `ner-character-*.png` + accessory SVGs.

## DECISIONS / ASSUMPTIONS
- Preserve production CSS geometry and logic.
- Repair only the three high-res WebP payloads using recovered approved 1:1 crops.
- Use direct binary-safe Git object creation (`create_blob`) rather than text staging.
- Persist after each small recoverable chunk before continuing.

## DO NOT REPEAT
- Repo-wide audit.
- Source recovery / Library search for `image-gen-2(7).png`.
- P0-A/P0-B/P0-D/orientation/calculator investigations.
- Character redraw/reconstruction.
- Re-audit of already-cleaned `tmp-binary-repair/*` staging commits/files.
- Recreate `tmp.txt`.
- Long recovery analysis before the next checkpoint.

## OPEN BLOCKERS
1. Bottom-left and right repaired candidate blobs are not yet durably created/recorded.
2. The three repaired blobs are not yet wired into production asset paths on `main`.
3. Post-repair sharpness/UI QA has not yet passed.
4. Manual local/live `31-*sharpness-v2` screenshot acceptance remains open.

## EXACT NEXT RECOVERY ACTION
Small chunk only: create a Git blob for the already-validated bottom-left candidate using the binary-safe blob API and immediately persist that SHA here. Then repeat as a separate checkpointed chunk for the right candidate. Do not modify production asset paths until all three blob SHAs are durably recorded.

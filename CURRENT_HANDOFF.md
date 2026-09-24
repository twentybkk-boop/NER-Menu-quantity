# CURRENT HANDOFF — NER Menu Quantity

> Crash-safe continuation checkpoint — DO NOT RESTART.
> Source of truth: current GitHub `main` + actual code + `recipe_master.json`; current `main` wins if any status below becomes stale.

## CURRENT OBJECTIVE
Finish V3 Session 2B.2 by restoring browser-decodable high-resolution approved character overlays, preserving all verified production geometry/logic, then re-run only the existing sharpness/UI QA path and manually inspect the generated `31-*sharpness-v2` screenshots before closing the session.

## LATEST VERIFIED CHECKPOINT
- V2 P0-A/B/C/D: VERIFIED — do not redo.
- V3 Session 1 layering/orientation/background: VERIFIED — do not redo.
- V3 Session 2A root-cause audit: DONE — do not redo.
- V3 Session 2B.1 sampling/compositing safety: VERIFIED — do not redo.
- Recovered approved source `image-gen-2(7).png`: VERIFIED as the intended story-complete source set.
- Commit `d32ff236c227d804c60e807749b2f41b3c05bb94` applied recovered high-res assets + cache-bust to `main`.
- UI QA run `36012464625` against `d32ff236...`: all checks through layering/orientation PASS; only `Verify V3 character high-res sharpness locally` FAILED.
- Interrupted binary staging was audited and cleaned. The five staging commits touched only `tmp-binary-repair/*`; all five temporary files were removed from `main` by cleanup ending at `3244e2d74476273def00af0b695b9cbbced9491a`.

## EVIDENCE CHECKED
- `CURRENT_HANDOFF.md` prior checkpoint.
- Commit `d32ff236c227d804c60e807749b2f41b3c05bb94` diff: only 3 WebP assets + cache-bust CSS changed; production geometry/logic untouched.
- UI QA job `107676382757` / run `36012464625` logs.
- Failure line: `page.evaluate: Error: failed to load http://127.0.0.1:8000/assets/overlay-top-left-hires.webp?v=20260924-v3-recovered1` from `qa/character-sampling-v1-contract.mjs`.
- Same run verified PASS for Chromium+WebKit base UI QA, P0-A complete composition, P0-B protected center frame, P0-D top composition, long-list rhythm, and orientation/layering.
- `qa/character-sampling-v1-contract.mjs` verifies image decode/natural dimensions/source-pixel ratio and emits `31-*sharpness-v2` screenshots.
- Audited staging commits:
  - `8209f2c...` → `tmp-binary-repair/README.md`
  - `5d4fc4b...` → `tmp-binary-repair/top-00.b64`
  - `fce4db0...` → `tmp-binary-repair/top-01.b64`
  - `7ed06cf...` → `tmp-binary-repair/.keep`
  - `9d6b4b9...` → `tmp-binary-repair/BRANCH_MARKER.txt`
- `tmp-binary-repair/` contained exactly those five files at audit time; all were deleted without touching production paths.

## VERIFIED FINDINGS
1. The current blocker is not layout, geometry, character presence, center frame, top composition, rhythm, or layering; those checks passed in run `36012464625`.
2. The concrete blocker is browser decode/load failure of the recovered high-res WebP path, first observed on `overlay-top-left-hires.webp` via `img.onerror`.
3. The intended repair scope is binary asset bytes only; no recipe/business logic, Matrix, PIN, import/export, geometry, z-index, center frame, or environment background changes are required.
4. Recovered intended dimensions remain:
   - top-left 518×500
   - bottom-left 655×524
   - right 556×851
5. Approved story requirements remain:
   - upper-left: glasses + drink + gesture + speech bubble
   - lower-left: NO GLASSES + helmet + cat/table + speech bubble
   - right: white backpack + clipboard/pen + food/chalkboard + speech bubble
6. The interrupted staging sequence itself was not a production repair; it only added temporary text/base64 files and has now been cleaned.

## HYPOTHESES REJECTED
- Do NOT treat this as a geometry/layout regression; evidence contradicts that.
- Do NOT redo V2 / Session 1 / Session 2A / Session 2B.1.
- Do NOT restore invalid orphan blobs `35c12cd9...`, `42c06cd2...`, `9af0dd1f...`.
- Do NOT use prior large blank/transparent replacement WebPs that passed dimension-only checks but were visually empty.
- Do NOT synthesize production characters from `ner-character-*.png` + accessory SVGs.

## DECISIONS / ASSUMPTIONS
- Preserve existing production CSS geometry and logic.
- Repair only the three high-res WebP payloads, using recovered approved crops at 1:1 dimensions; recompression is acceptable only if browser-decodable and visually faithful.
- Do not reintroduce `tmp-binary-repair/*` staging into final production history unless absolutely required; prefer direct binary-safe Git object/file replacement.
- Current GitHub `main` remains source of truth; if head changed after this checkpoint, re-read only the delta from this checkpoint, not the whole repo.

## DO NOT REPEAT
- Repo-wide audit.
- Source recovery / Library search for `image-gen-2(7).png`.
- P0-A/P0-B/P0-D/orientation/calculator investigations.
- Character redraw/reconstruction.
- Investigation of already-rejected invalid/blank WebPs.
- Re-audit of the five removed staging files unless Git history unexpectedly changes.

## OPEN BLOCKERS
1. Browser-decodable final bytes for all three high-res WebPs are not yet VERIFIED on `main`.
2. Sharpness contract has not yet passed after repair.
3. Local/live `31-*sharpness-v2` screenshots have not yet been manually accepted.

## STATE THAT WAS NOT DURABLE BEFORE THIS CHECKPOINT
- Some details of the interrupted binary-staging method existed only in chat/tool execution context. They are not treated as verified requirements and are no longer needed after staging cleanup.
- No hidden-reasoning-only conclusion is promoted to VERIFIED here. Only visible tool/file evidence above is authoritative.

## EXACT NEXT ACTION
Replace only `assets/overlay-top-left-hires.webp`, `assets/overlay-bottom-left-hires.webp`, and `assets/overlay-right-hires.webp` with browser-decodable recovered 1:1 WebP bytes at 518×500, 655×524, and 556×851 respectively, without changing production geometry/logic. Then run the existing UI QA. Inspect only concrete failures; if automated checks pass, manually inspect local/live `31-*sharpness-v2` phone portrait/landscape @3x and iPad portrait/landscape @2x screenshots before marking Session 2B.2 VERIFIED.

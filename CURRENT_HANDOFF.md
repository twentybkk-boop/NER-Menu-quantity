# CURRENT HANDOFF — NER Menu Quantity

> **Crash-safe continuation checkpoint — DO NOT RESTART.**
> Source of truth: current GitHub `main` + actual code + `recipe_master.json`. If any SHA/run below becomes stale, current `main` wins.

## Repository
- Repo: `twentybkk-boop/NER-Menu-quantity`
- Branch: `main`
- Latest V3 Session 2B.2 implementation HEAD before this handoff-only commit: `d4f7c10647329ce79aa9634e48751467edd3e748`
- V3 Session 2B.1 verified baseline commit: `b967cd132a0d6623b435b888693c15a7e4fdf17d`
- V3 Session 2B.1 QA: **35992246985 — SUCCESS**
- V3 Session 2B.1 artifact: **10805171648**
- Latest V3 Session 2B.2 UI QA: **36001850009 — SUCCESS**
- Latest V3 Session 2B.2 artifact: **10809180201**
- Pages for `d4f7c106…`: **36001849633 — SUCCESS**

## Current status
- V2 P0-A/B/C/D: VERIFIED — do not redo.
- V3 Session 1 layering/orientation/background: VERIFIED — do not redo.
- V3 Session 2A root-cause audit: DONE — do not redo.
- V3 Session 2B.1 sampling/compositing safety: VERIFIED — do not redo.
- **V3 Session 2B.2 high-res source wiring: BLOCKED ON SOURCE ASSET / MANUAL VISUAL ACCEPTANCE FAILED.**

## What is implemented
Production CSS is wired to:
- `assets/overlay-top-left-hires.webp`
- `assets/overlay-bottom-left-hires.webp`
- `assets/overlay-right-hires.webp`

Locked sampling/compositing behavior remains:
- `filter:none`;
- `will-change:auto`;
- normal image rendering;
- Session 1 geometry/z-index/background unchanged.

Recent implementation / compatibility commits:
- `051f644d659258eaeaa2f5b673c70c42d2bb8a6d` — replace invalid/non-WebP `*-hires.webp` bytes with valid WebP bytes from the current authoritative overlay paths.
- `d4f7c10647329ce79aa9634e48751467edd3e748` — align calculator QA with `*-hires.webp` paths only; no production layout/business change.
- Earlier P0-A/P0-B/P0-D/orientation compatibility commits remain valid and must not be repeated.

Business logic changed: **NO**.
Recipe quantities / exclusions / replacements changed: **NO**.
Production geometry / positions / z-index / layer model changed by the latest fixes: **NO**.

## Automated verification — PASS but NOT sufficient for closure
### UI QA `36001850009`
Completed **SUCCESS** for `d4f7c106…`:
- base Chromium + WebKit UI QA: PASS;
- P0-A complete character composition: PASS;
- P0-B protected center frame: PASS;
- P0-D top composition local: PASS;
- P0-D long-list rhythm local: PASS;
- orientation/layering/backmost environment local: PASS;
- V3 character high-res sharpness local: PASS;
- calculator hierarchy: PASS;
- deployed Pages P0-A/P0-B: PASS;
- deployed P0-D top: PASS;
- deployed P0-D long-list: PASS;
- deployed orientation/layering: PASS;
- deployed V3 high-res sharpness: PASS;
- artifact: **10809180201**.

### Pages `36001849633`
- **SUCCESS** for `d4f7c106…`.

## Manual visual acceptance — FAIL
Manual inspection of artifact **10809180201** found that automated PASS is a false positive for the actual design acceptance:
- all expected `31-*sharpness-v2` local/live evidence files exist for phone portrait/landscape and iPad portrait/landscape at @3x/@2x;
- however the actual three story characters are not visibly rendered as required;
- `10-character-asset-contact-sheet.png` shows the current live `overlay-*.webp` entries visually blank/transparent while the separate character masters are visible;
- therefore **DO NOT declare Session 2B.2 DONE** and do not treat the source-pixel ratio gate as proof of visible character sharpness.

Required character acceptance remains locked:
- upper-left: glasses + drink + gesture + speech bubble;
- lower-left: **NO GLASSES**, helmet + cat/table + speech bubble;
- right: white backpack + clipboard/pen + food/chalkboard + speech bubble;
- all three must be visibly present together on required states.

## Last known-good visible baseline
Verified run **35992246985** at commit `b967cd132a0d6623b435b888693c15a7e4fdf17d`, artifact **10805171648**, visibly contains all three approved story-complete characters.

Exact baseline overlay blobs:
- `assets/overlay-top-left.webp` → `e6fa41a1e54a2b00f93234d9d9cc3a8c06b41042`, natural size ≈ **130×121**;
- `assets/overlay-bottom-left.webp` → `b738c2a87f0a2dfb2cea1e4c0edd14ae0bdc969f`, natural size ≈ **150×114**;
- `assets/overlay-right.webp` → `5747b69bf6d5291f92b585c368238a378778baef`, natural size ≈ **110×171**.

These baseline assets are visually correct but too small to satisfy the intended 2B.2 high-resolution acceptance without upscaling/interpolation; do not falsely relabel them as true high-resolution sources.

## Exact regression boundary
Commit **`33fac0d7af70714d55ffcb7a2b28af274a7eda20`** (`Upgrade authoritative character overlays in place`) modified only the three authoritative overlay binaries and replaced the visible baseline blobs with:
- top-left → `8c37d546cf54711cca5a6efe72b3be775a0a4a01`;
- bottom-left → `d35889fd05d654429ca5c391e9852e520c3fdf05`;
- right → `d5be11edfca0771679fd884fc5adc3a9c31bc71d`.

Those replacement WebPs have larger canvases (≈518×500 / 655×524 / 556×851) but are visually blank/transparent in the QA contact sheet/screenshots. Commit `051f644…` later copied these valid-but-visually-blank WebP blobs into the `*-hires.webp` paths so the loader/dimension checks pass, but that does **not** satisfy manual character acceptance.

Earlier orphan/high-res blobs `35c12cd9…`, `42c06cd2…`, `9af0dd1f…` are not valid WebP bytes and must not be restored/reset to.

## Source inventory finding
A recursive tree inspection of the verified 2B.1 commit found no additional hidden flattened high-resolution story-complete character source. The relevant character assets there are:
- three visible low-resolution story-complete `overlay-*.webp` files above;
- separate `ner-character-*.png` masters;
- separate accessory SVGs;
- `ner-team-bg.webp`.

Constraint remains: **do not revert to `ner-character-*.png + synthetic accessory overlays` as production composition.**

Therefore the current blocker is a missing/invalid **approved flattened high-resolution story-complete source**, not CSS geometry, z-index, Pages deployment, browser compatibility, or recipe/business logic.

## Do not repeat
- V2 work;
- Session 1 layering/orientation/background investigation;
- Session 2A root-cause audit;
- Session 2B.1 sampling/compositing work;
- P0-A/P0-B/P0-D/orientation/calculator filename compatibility fixes;
- Pages/deployment debugging for `d4f7c106…` (Pages passed);
- source-pixel ratio QA as a substitute for visual acceptance;
- restoring orphan blobs `35c12cd9…`, `42c06cd2…`, `9af0dd1f…`;
- treating current large blank WebP canvases as approved visible high-res characters.

## Short-session rule
Every short session must update this file before stopping.

## EXACT NEXT ACTION
**Recover one valid approved flattened high-resolution story-complete source set for all three characters before any further production CSS/layout change.**
- First search only prior generated/uploaded project assets or durable external/source records for the original visible high-resolution character compositions corresponding to the locked three stories.
- Validate candidate bytes as actual decodable image files and visually inspect all three before wiring them into `main`.
- If no valid approved high-resolution source can be recovered, keep 2B.2 BLOCKED; do not manufacture a substitute from separate PNG masters/accessory SVGs or declare the current automated QA PASS sufficient.

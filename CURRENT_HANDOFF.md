# CURRENT HANDOFF — NER Menu Quantity

> **Crash-safe continuation checkpoint — DO NOT RESTART.**
> Source of truth: current GitHub `main` + actual code + `recipe_master.json`. If any SHA/run below becomes stale, current `main` wins.

## Repository
- Repo: `twentybkk-boop/NER-Menu-quantity`
- Branch: `main`
- V3 Session 2B.1 QA: **35992246985 — SUCCESS**
- V3 Session 2B.1 artifact: **10805171648**
- Latest V3 Session 2B.2 implementation HEAD before this handoff-only commit: `8300a28d4a40028cfbbc81d51d4d4330edc6b808`
- Current V3 Session 2B.2 UI QA run: **35999270049 — IN PROGRESS at checkpoint time**
- Current Pages run for implementation HEAD: **35999269734 — IN PROGRESS at checkpoint time**

## Current status
- V2 P0-A/B/C/D: VERIFIED — do not redo.
- V3 Session 1 layering/orientation/background: VERIFIED — do not redo.
- V3 Session 2A root-cause audit: DONE — do not redo.
- V3 Session 2B.1 sampling/compositing safety: VERIFIED — do not redo.
- **V3 Session 2B.2 high-res source wiring: IMPLEMENTED, QA PENDING.**

## V3 Session 2B.2 implementation
High-resolution approved story-complete assets are now durably on `main`:
- `assets/overlay-top-left-hires.webp` ≈ 518×500
- `assets/overlay-bottom-left-hires.webp` ≈ 655×524
- `assets/overlay-right-hires.webp` ≈ 556×851

Asset commit:
- `56c178daeebc684f1e92adad93cea9b0a77115b9` — add high-resolution approved character assets.

Production wiring:
- `assets/visual-character-sampling-v1.css` now paints the `*-hires.webp` sources for `.decor-a/.decor-b/.decor-c`;
- `filter:none`, `will-change:auto`, normal image rendering remain locked;
- Session 1 geometry/z-index/background intentionally unchanged.

QA compatibility updates:
- `qa/character-sampling-v1-contract.mjs` requires the `*-hires.webp` paths, minimum natural dimensions, and >= 2 source px/CSS px in every covered viewport;
- `qa/character-composition-v2-contract.mjs` accepts the same high-res approved paths while preserving story-detail/size/pointer/accessory assertions;
- `qa/live-pages-acceptance-v2.mjs` requires the high-res paths on deployed Pages;
- `qa/center-frame-v2-contract.mjs` now accepts the same high-res approved paths while preserving the existing ~300px phone center-frame, shelf, clipping, pointer and z-order assertions.

Relevant implementation commits:
- `6eca23dd26b6a4eb59ca7e639e8b5df274f0d397` — wire high-resolution character sources;
- `a85349a1654ff5fc50d1b1c435e9bee79e031adc` — require high-resolution assets in sharpness QA;
- `aa7c8a9e38d27d7e0f80edcf0add53873e5b9263` — align P0-A contract with high-res paths;
- `a50cb51d58a511702e9d881569a5b14f37c57499` — align deployed P0-A/P0-B acceptance with high-res paths;
- `8300a28d4a40028cfbbc81d51d4d4330edc6b808` — align local P0-B center-frame contract with high-res paths.

Business logic changed: **NO**.

## Latest verification / failure evidence
UI QA run **35998894151** for implementation HEAD `a50cb51d…` completed **FAILURE**:
- base Chromium + WebKit UI QA: **PASS**;
- P0-A complete character composition: **PASS**;
- P0-B protected center frame: **FAIL before downstream gates**;
- artifact: **10807805707**.

Root cause:
- `qa/center-frame-v2-contract.mjs` still matched the old `overlay-*.webp` filenames;
- actual production background was already `overlay-*-hires.webp`;
- this was QA compatibility drift, not evidence of a geometry/z-index/production regression.

Fix:
- commit `8300a28d4a40028cfbbc81d51d4d4330edc6b808` changes only the three P0-B asset filename expectations to `*-hires.webp`.
- No production CSS, geometry, z-index, recipe/business logic, Matrix, PIN or import/export behavior changed.

## Locked constraints
Do not change approved story details, lower-left no-glasses, Session 1 geometry/z-index/background, ~300px phone center frame, infographic thumbnails, recipe/calculation quantities, exclusion/replacement semantics, Matrix, PIN, or unrelated import/export behavior.

## Do not repeat
- source-resolution/root-cause investigation;
- high-res image derivation;
- binary asset upload/reconciliation;
- V3 Session 2B.1 sampling/compositing work;
- P0-A high-res path compatibility fix;
- P0-B center-frame high-res path compatibility fix unless the new run proves a different concrete failure.

## Short-session rule
Every short session must update this file before stopping.

## EXACT NEXT ACTION
**Next short session: check UI QA run `35999270049` for implementation HEAD `8300a28d…`.**
- If it fails, inspect that exact failing gate and fix only the demonstrated high-res compatibility regression; do not redesign or change production geometry.
- If it passes, fetch its artifact and manually inspect the `31-*sharpness-v2` local/live evidence for phone portrait/landscape and iPad portrait/landscape, then persist the manual finding here.

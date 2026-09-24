# CURRENT HANDOFF — NER Menu Quantity

> **Crash-safe continuation checkpoint — DO NOT RESTART.**
> Source of truth: current GitHub `main` + actual code + `recipe_master.json`. If any SHA/run below becomes stale, current `main` wins.

## Repository
- Repo: `twentybkk-boop/NER-Menu-quantity`
- Branch: `main`
- V3 Session 2B.1 QA: **35992246985 — SUCCESS**
- V3 Session 2B.1 artifact: **10805171648**
- Latest V3 Session 2B.2 implementation HEAD before this handoff-only commit: `f20f6a5de4c3183b990c4f4841d2ba5964da0b8a`
- Current V3 Session 2B.2 UI QA run: **35999721779 — IN PROGRESS at checkpoint time**
- Current Pages run for implementation HEAD: **35999721387 — IN PROGRESS at checkpoint time**

## Current status
- V2 P0-A/B/C/D: VERIFIED — do not redo.
- V3 Session 1 layering/orientation/background: VERIFIED — do not redo.
- V3 Session 2A root-cause audit: DONE — do not redo.
- V3 Session 2B.1 sampling/compositing safety: VERIFIED — do not redo.
- **V3 Session 2B.2 high-res source wiring: IMPLEMENTED, QA PENDING.**

## V3 Session 2B.2 implementation
High-resolution approved story-complete assets are durably on `main`:
- `assets/overlay-top-left-hires.webp` ≈ 518×500
- `assets/overlay-bottom-left-hires.webp` ≈ 655×524
- `assets/overlay-right-hires.webp` ≈ 556×851

Asset commit:
- `56c178daeebc684f1e92adad93cea9b0a77115b9` — add high-resolution approved character assets.

Production wiring:
- `assets/visual-character-sampling-v1.css` paints the `*-hires.webp` sources for `.decor-a/.decor-b/.decor-c`;
- `filter:none`, `will-change:auto`, normal image rendering remain locked;
- Session 1 geometry/z-index/background intentionally unchanged.

QA compatibility updates:
- `qa/character-sampling-v1-contract.mjs` requires the `*-hires.webp` paths, minimum natural dimensions, and >= 2 source px/CSS px in every covered viewport;
- `qa/character-composition-v2-contract.mjs` accepts the high-res approved paths while preserving story-detail/size/pointer/accessory assertions;
- `qa/live-pages-acceptance-v2.mjs` requires the high-res paths on deployed Pages;
- `qa/center-frame-v2-contract.mjs` accepts the high-res approved paths while preserving the existing ~300px phone center-frame, shelf, clipping, pointer and z-order assertions;
- `qa/top-composition-v1-contract.mjs` now accepts `overlay-top-left-hires.webp` while preserving every existing P0-D composition/geometry/background assertion.

Relevant implementation commits:
- `6eca23dd26b6a4eb59ca7e639e8b5df274f0d397` — wire high-resolution character sources;
- `a85349a1654ff5fc50d1b1c435e9bee79e031adc` — require high-resolution assets in sharpness QA;
- `aa7c8a9e38d27d7e0f80edcf0add53873e5b9263` — align P0-A contract with high-res paths;
- `a50cb51d58a511702e9d881569a5b14f37c57499` — align deployed P0-A/P0-B acceptance with high-res paths;
- `8300a28d4a40028cfbbc81d51d4d4330edc6b808` — align local P0-B center-frame contract with high-res paths;
- `f20f6a5de4c3183b990c4f4841d2ba5964da0b8a` — align local/live P0-D top-composition upper-left asset assertion with the approved high-res path.

Business logic changed: **NO**.
Production CSS changed by the latest compatibility fixes: **NO**.

## Latest verification / failure evidence
### Run `35998894151`
Completed **FAILURE** for implementation HEAD `a50cb51d…`:
- base Chromium + WebKit UI QA: **PASS**;
- P0-A complete character composition: **PASS**;
- P0-B protected center frame: **FAIL before downstream gates**;
- artifact: **10807805707**.

Root cause was stale old asset filenames in `qa/center-frame-v2-contract.mjs`; production already used `*-hires.webp`. Fixed by `8300a28d…` without changing production geometry/z-index.

### Run `35999270049`
Completed **FAILURE** for implementation HEAD `8300a28d…`:
- base Chromium + WebKit UI QA: **PASS**;
- P0-A complete character composition: **PASS**;
- P0-B protected center frame: **PASS**;
- P0-D top composition local: **FAIL before downstream gates**;
- artifact: **10807671855**.

Exact P0-D failure:
- actual upper-left source: `assets/overlay-top-left-hires.webp`;
- stale expected regex: `overlay-top-left.webp`;
- assertion: `approved upper-left story source changed`.

Root cause:
- `qa/top-composition-v1-contract.mjs` still matched the old upper-left filename;
- this was another QA compatibility drift caused by the intentional high-res source migration, not evidence of production geometry/layering/top-composition regression.

Fix:
- commit `f20f6a5de4c3183b990c4f4841d2ba5964da0b8a` changes only that P0-D filename expectation to `overlay-top-left-hires.webp`;
- all existing center-frame, masthead, wordmark, background, visible-fraction and first-category assertions remain unchanged;
- no production CSS, geometry, z-index, recipe/business logic, Matrix, PIN or import/export behavior changed.

New verification run:
- UI QA **35999721779 — IN PROGRESS** at checkpoint time; setup/thumbnail/static-server steps completed and base Chromium+WebKit UI QA was still running at last check.
- Pages **35999721387 — IN PROGRESS** at checkpoint time.

## Locked constraints
Do not change approved story details, lower-left no-glasses, Session 1 geometry/z-index/background, ~300px phone center frame, infographic thumbnails, recipe/calculation quantities, exclusion/replacement semantics, Matrix, PIN, or unrelated import/export behavior.

## Do not repeat
- source-resolution/root-cause investigation;
- high-res image derivation;
- binary asset upload/reconciliation;
- V3 Session 2B.1 sampling/compositing work;
- P0-A high-res path compatibility fix;
- P0-B center-frame high-res path compatibility fix;
- P0-D top-composition high-res path compatibility fix unless a later run proves a different concrete failure.

## Short-session rule
Every short session must update this file before stopping.

## EXACT NEXT ACTION
**Next short session: check UI QA run `35999721779` for implementation HEAD `f20f6a5…`.**
- If it fails, inspect that exact failing gate and fix only the demonstrated high-res compatibility regression; do not redesign or change production geometry.
- If it passes, fetch its artifact and manually inspect the `31-*sharpness-v2` local/live evidence for phone portrait/landscape and iPad portrait/landscape, confirm deployed Pages gates passed, then persist the manual finding here.

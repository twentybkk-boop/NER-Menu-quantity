# CURRENT HANDOFF — NER Menu Quantity

> **Crash-safe continuation checkpoint — DO NOT RESTART.**
> Source of truth: current GitHub `main` + actual code + `recipe_master.json`. If any SHA/run below becomes stale, current `main` wins.

## Repository
- Repo: `twentybkk-boop/NER-Menu-quantity`
- Branch: `main`
- V3 Session 2B.1 QA: **35992246985 — SUCCESS**
- V3 Session 2B.1 artifact: **10805171648**
- Latest V3 Session 2B.2 implementation HEAD before this handoff-only commit: `a50cb51d58a511702e9d881569a5b14f37c57499`
- Current V3 Session 2B.2 UI QA run: **35998894151 — QUEUED at checkpoint time**

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
- `qa/character-sampling-v1-contract.mjs` now requires the `*-hires.webp` paths, minimum natural dimensions, and >= 2 source px/CSS px in every covered viewport;
- `qa/character-composition-v2-contract.mjs` now accepts the same high-res approved paths while preserving all existing story-detail/size/pointer/accessory assertions;
- `qa/live-pages-acceptance-v2.mjs` now requires the high-res paths on deployed Pages.

Relevant implementation commits:
- `6eca23dd26b6a4eb59ca7e639e8b5df274f0d397` — wire high-resolution character sources;
- `a85349a1654ff5fc50d1b1c435e9bee79e031adc` — require high-resolution assets in sharpness QA;
- `aa7c8a9e38d27d7e0f80edcf0add53873e5b9263` — align P0-A contract with high-res paths;
- `a50cb51d58a511702e9d881569a5b14f37c57499` — align deployed P0-A/P0-B acceptance with high-res paths.

Business logic changed: **NO**.

## Locked constraints
Do not change approved story details, lower-left no-glasses, Session 1 geometry/z-index/background, ~300px phone center frame, infographic thumbnails, recipe/calculation quantities, exclusion/replacement semantics, Matrix, PIN, or unrelated import/export behavior.

## Do not repeat
- source-resolution/root-cause investigation;
- high-res image derivation;
- binary asset upload/reconciliation;
- V3 Session 2B.1 sampling/compositing work.

## Short-session rule
Every short session must update this file before stopping.

## EXACT NEXT ACTION
**Next short session: verification only.**
1. Check UI QA run **35998894151** for implementation HEAD `a50cb51d…`.
2. If it fails, fix only the failing high-res/compatibility gate; do not redesign.
3. If it passes, fetch artifact and manually inspect `31-*sharpness-v2` local/live evidence at phone portrait/landscape and iPad portrait/landscape.
4. Confirm characters are materially sharper while P0-A story details, center frame, layering, background and calculator remain intact.
5. Update this handoff with final run/artifact/manual finding, then report whether V3 sharpness defect is ready for real-device user acceptance.

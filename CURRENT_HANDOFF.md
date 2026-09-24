# CURRENT HANDOFF — NER Menu Quantity

> **Crash-safe continuation checkpoint — DO NOT RESTART.**
> Source of truth: current GitHub `main` + actual code + `recipe_master.json`. If any SHA/run below becomes stale, current `main` wins.

## Repository
- Repo: `twentybkk-boop/NER-Menu-quantity`
- Branch: `main`
- V3 Session 2B.1 QA: **35992246985 — SUCCESS**
- V3 Session 2B.1 artifact: **10805171648**
- Latest V3 Session 2B.2 implementation HEAD before this handoff-only commit: `b159244ca2ad916331dd8bd060aaa0a8f9e9b02d`
- Current V3 Session 2B.2 UI QA run: **36000545498 — IN PROGRESS at checkpoint time**
- Current Pages run for implementation HEAD: **36000545897 — QUEUED/DEPLOYING at checkpoint time**

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

Production wiring:
- `assets/visual-character-sampling-v1.css` paints the `*-hires.webp` sources for `.decor-a/.decor-b/.decor-c`;
- `filter:none`, `will-change:auto`, normal image rendering remain locked;
- Session 1 geometry/z-index/background intentionally unchanged.

Relevant implementation / compatibility commits:
- `56c178daeebc684f1e92adad93cea9b0a77115b9` — add approved high-res character assets.
- `6eca23dd26b6a4eb59ca7e639e8b5df274f0d397` — wire high-resolution character sources.
- `a85349a1654ff5fc50d1b1c435e9bee79e031adc` — require high-resolution assets in sharpness QA.
- `aa7c8a9e38d27d7e0f80edcf0add53873e5b9263` — align P0-A contract with high-res paths.
- `a50cb51d58a511702e9d881569a5b14f37c57499` — align deployed P0-A/P0-B acceptance with high-res paths.
- `8300a28d4a40028cfbbc81d51d4d4330edc6b808` — align local P0-B center-frame contract.
- `f20f6a5de4c3183b990c4f4841d2ba5964da0b8a` — align P0-D top-composition contract.
- `83ba5b87c3f4ef194f3a3fb3cb973a159f185628` — align P0-D long-list contract.
- `b159244ca2ad916331dd8bd060aaa0a8f9e9b02d` — align orientation/layering contract with approved high-res paths.

Business logic changed: **NO**.
Production CSS changed by these compatibility fixes: **NO**.
Geometry / position / z-index / layer model changed: **NO**.

## Latest verification / failure evidence
### Run `35999721779`
- base Chromium + WebKit UI QA: PASS
- P0-A: PASS
- P0-B: PASS
- P0-D top composition local: PASS
- P0-D long-list local: FAIL because `qa/long-list-rhythm-v1-contract.mjs` still expected old `overlay-bottom-left.webp` / `overlay-right.webp` names.
- Root cause: QA filename compatibility drift only; production already used approved high-res assets.
- Fixed by `83ba5b87c3f4ef194f3a3fb3cb973a159f185628`.

### Run `36000147146`
Completed **FAILURE** for implementation HEAD `83ba5b87…`:
- base Chromium + WebKit UI QA: **PASS**;
- P0-A complete character composition: **PASS**;
- P0-B protected center frame: **PASS**;
- P0-D top composition local: **PASS**;
- P0-D long-list rhythm local: **PASS**;
- orientation/layering/backmost environment local: **FAIL before sharpness gate**;
- artifact: **10807279961**.

Exact orientation failure:
- scope: `chromium/phone-portrait/local`;
- actual source: `assets/overlay-top-left-hires.webp`;
- stale expected regex: `/overlay-(top-left|bottom-left|right)\.webp/`;
- assertion: `approved character source changed`.

Root cause:
- `qa/layering-orientation-v1-contract.mjs` still matched pre-migration character filenames;
- this is QA compatibility drift caused by the intentional high-res source migration, not evidence of a layering/orientation/z-index regression.

Fix:
- commit `b159244ca2ad916331dd8bd060aaa0a8f9e9b02d` changes only the approved-character filename regex to require `overlay-(top-left|bottom-left|right)-hires.webp`;
- all existing three-character, z-order, backmost-background, menu-lane, grid-column, rail-intrusion, phone-landscape shelf and ambient-layer assertions remain unchanged.

New verification:
- UI QA **36000545498 — IN PROGRESS** at checkpoint time; it was still in Playwright install at last check.
- Pages **36000545897 — QUEUED/DEPLOYING** at checkpoint time.

## Locked constraints
Do not change approved three-character story details, lower-left no-glasses, Session 1 geometry/z-index/background, phone-landscape resilience, iPad rails, ~300px phone center frame, infographic thumbnails, approved top composition, long-list rhythm, recipe/calculation quantities, exclusion/replacement semantics, Matrix, PIN, or unrelated import/export behavior.

## Do not repeat
- source-resolution/root-cause investigation;
- high-res image derivation;
- binary asset upload/reconciliation;
- V3 Session 2B.1 sampling/compositing work;
- P0-A high-res path compatibility fix;
- P0-B center-frame high-res path compatibility fix;
- P0-D top-composition high-res path compatibility fix;
- P0-D long-list high-res path compatibility fix;
- orientation/layering high-res path compatibility fix unless run `36000545498` proves a different concrete failure.

## Short-session rule
Every short session must update this file before stopping.

## EXACT NEXT ACTION
**Check UI QA run `36000545498` for implementation HEAD `b159244…`.**
- If it fails, inspect that exact failing gate and fix only the demonstrated Session 2B.2 regression/compatibility issue.
- If it passes through local sharpness and deployed Pages gates, fetch its artifact and manually inspect `31-*sharpness-v2` local/live evidence at phone portrait/landscape and iPad portrait/landscape before declaring the sharpness defect closed.

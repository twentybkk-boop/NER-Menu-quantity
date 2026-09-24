# CURRENT HANDOFF — NER Menu Quantity

> **Crash-safe continuation checkpoint — DO NOT RESTART.**
> Source of truth: current GitHub `main` + actual code + `recipe_master.json`. If any SHA/run below becomes stale, current `main` wins.

## Repository

- Repo: `twentybkk-boop/NER-Menu-quantity`
- Branch: `main`
- V2 feedback: `docs/UI_REAL_DEVICE_FEEDBACK_2026-09-24_V2.md`
- V3 feedback: `docs/UI_REAL_DEVICE_FEEDBACK_2026-09-24_V3.md`
- Sharpness audit: `docs/UI_CHARACTER_SHARPNESS_AUDIT_2026-09-24.md`
- Last fully verified V3 Session 1 QA: **35984955105 — SUCCESS**, artifact **10801314383**
- V3 Session 2A sharpness audit: DONE
- Latest verified V3 Session 2B.1 implementation SHA: `b967cd132a0d6623b435b888693c15a7e4fdf17d`
- Sampling-safe QA run: **35992246985 — SUCCESS**
- Sampling evidence artifact: **10805171648**, digest `sha256:7e04898d8369be898f12200fdfa2d8c69d9b8e64cb4d920ba7e613e6319ed1ce`

---

# CURRENT STATUS — V3 ACCEPTANCE OPEN

Locked completed work — **DO NOT REDO**:

- V2 P0-A approved 3-character story composition — DONE + local/live verified.
- V2 P0-B ~300px protected phone center frame — DONE + local/live verified.
- V2 P0-C infographic thumbnails — DONE + local/live verified.
- V2 P0-D illustrated top + long-list rhythm — DONE + local/live verified.
- V3 Session 1 layering/orientation/backmost background — DONE + local/live verified.
- V3 Session 2A sharpness root-cause audit — DONE.
- **V3 Session 2B.1 sampling/compositing safety — DONE + QA VERIFIED.**

Still open:

- **V3 Session 2B.2 — wire true high-resolution character sources and verify live sharpness (HIGH PRIORITY).**

Do not claim final visual acceptance until high-resolution character sources are committed, wired and visually rechecked.

---

# V3 SESSION 2A — ROOT CAUSE — LOCKED

Approved story-complete overlay sources are too small for Retina/iPad:

- `overlay-top-left.webp` = 130×121 px
- `overlay-bottom-left.webp` = 150×114 px
- `overlay-right.webp` = 110×171 px

This causes heavy undersampling on DPR 2–3 displays. Secondary blur was also contributed by the raster filter chain previously applied to `.decor-person`.

Do not repeat this investigation.

---

# V3 SESSION 2B.1 — SAMPLING / COMPOSITING SAFETY — VERIFIED

Implementation:

- `assets/visual-character-sampling-v1.css`
- imported last from `assets/visual-polish.css`
- `.decor-person` now uses `filter:none`, `will-change:auto`, normal image rendering and no extra raster-filter compositing;
- tablet normal-page character boxes are capped to current native overlay dimensions so Safari/WebKit no longer CSS-upscales the already-small sources before DPR sampling;
- phone portrait/landscape geometry remains unchanged;
- Session 1 z-index / rail positions / backmost environment remain locked;
- calculator geometry unchanged;
- business logic changed: **NO**.

Relevant commits:

- `ecc4181f950d8f1166072be02af3b839b15abf3f` — prevent secondary raster blur
- `b0b2bdea366fd01a70cc6ad60b16b8f3f6ac22dc` — activate sampling layer
- `2aed957442f7370f5cb140dccbc2e4db17ae6551` — add sampling safety contract
- `b967cd132a0d6623b435b888693c15a7e4fdf17d` — gate sampling contract in UI QA
- `383cb9320fda13d7750e2bfe8effe6d5b59e3939` — remove temporary placeholder

Durable QA:

- `qa/character-sampling-v1-contract.mjs`
- Chromium + WebKit:
  - phone portrait 390×844 @3x
  - phone landscape 844×390 @3x
  - iPad portrait 768×1024 @2x
  - iPad landscape 1024×768 @2x
- verifies approved overlay paths, `pointer-events:none`, `filter:none`, and no CSS upscale beyond current natural source size.

Final run **35992246985 — SUCCESS**. All steps passed, including:

- base Chromium + WebKit UI QA;
- P0-A composition;
- P0-B center frame;
- P0-D top + long-list;
- V3 Session 1 orientation/layering;
- **V3 character sampling safety**;
- calculator contract;
- deployed Pages regression gates;
- evidence rendering/upload.

Artifact: **10805171648**, digest `sha256:7e04898d8369be898f12200fdfa2d8c69d9b8e64cb4d920ba7e613e6319ed1ce`.

---

# HIGH-RES SOURCE PREPARATION FINDING

A high-resolution derivative set has been prepared locally from the user's approved reference, **not by upscaling the tiny production overlays**:

- top-left ~516×463
- bottom-left ~653×494
- right ~556×849

These preserve the same approved story roles/details and are large enough to materially improve Retina/iPad sampling. They are **not yet wired into `main` at this checkpoint**. Do not substitute incomplete `ner-character-*.png` + generic accessories.

---

# LOCKED CONSTRAINTS

Do not intentionally change:

- approved three story roles/details;
- lower-left no-glasses requirement;
- V3 Session 1 z-index/orientation/background geometry;
- ~300px phone center frame;
- infographic thumbnails;
- recipe calculations/quantities;
- exclusion/replacement semantics;
- Matrix data logic;
- PIN behavior;
- unrelated import/export behavior.

---

# SHORT-SESSION RULE

Every continuation session must:

1. minimally read current `main` + this handoff;
2. complete one bounded task;
3. persist code/evidence/checkpoint;
4. report exact **NEXT ACTION** and stop.

---

# EXACT NEXT ACTION

**V3 Session 2B.2 — HIGH-RES CHARACTER WIRING ONLY.**

1. Commit the prepared high-resolution derivatives of the **same approved three story-complete compositions** into `assets/`.
2. Wire them into `.decor-a/.decor-b/.decor-c` without changing V3 Session 1 geometry/z-index.
3. Remove the temporary tablet native-size caps that were only needed for low-res overlays, while preserving sampling-safe `filter:none`.
4. Update sharpness QA to require high-res source paths and at least ~2 source px/CSS px for iPad states (3× desirable for phone where practical).
5. Run Chromium + WebKit + deployed Pages QA and manually inspect @2x/@3x screenshots.
6. Persist checkpoint, stop, and report whether final real-device acceptance is ready.

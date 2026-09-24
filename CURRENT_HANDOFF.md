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
- V3 Session 2A audit: DONE
- Latest V3 Session 2B.1 implementation before this handoff-only update: `383cb9320fda13d7750e2bfe8effe6d5b59e3939`
- Current QA run for sampling-safe sub-pass: **35992246985 — IN PROGRESS at checkpoint time**

---

# CURRENT STATUS — V3 ACCEPTANCE OPEN

Locked completed work — **DO NOT REDO**:

- V2 P0-A approved 3-character story composition — DONE + local/live verified.
- V2 P0-B ~300px protected phone center frame — DONE + local/live verified.
- V2 P0-C infographic thumbnails — DONE + local/live verified.
- V2 P0-D illustrated top + long-list rhythm — DONE + local/live verified.
- V3 Session 1 layering/orientation/backmost background — DONE + local/live verified.
- V3 Session 2A sharpness root-cause audit — DONE.

Still open:

- **V3 Session 2B — character sharpness fix (HIGH PRIORITY).**

Do not claim final visual acceptance until high-resolution character sources are wired and visually rechecked.

---

# V3 SESSION 2A — ROOT CAUSE — LOCKED

Approved story-complete overlay sources are too small for Retina/iPad:

- `overlay-top-left.webp` = 130×121 px
- `overlay-bottom-left.webp` = 150×114 px
- `overlay-right.webp` = 110×171 px

This causes heavy undersampling on DPR 2–3 displays; iPad landscape also previously CSS-upscaled some overlays before Retina sampling.

Secondary blur contributor was the raster filter chain in `visual-character-composition-v2.css`:

`filter: drop-shadow(...) saturate(...) contrast(...)`

Do not repeat this investigation.

---

# V3 SESSION 2B.1 — SAMPLING / COMPOSITING SAFETY

**IMPLEMENTED — QA RUN PENDING at checkpoint time.**

Implementation:

- new `assets/visual-character-sampling-v1.css`
- imported last from `assets/visual-polish.css`
- `.decor-person` now forces `filter:none`, `will-change:auto`, normal image rendering and no extra raster-filter compositing;
- tablet normal-page character boxes are capped to current native overlay dimensions so Safari/WebKit is no longer asked to CSS-upscale the already-small raster sources before DPR sampling;
- phone portrait/landscape geometry is left unchanged because those boxes were already below native CSS dimensions;
- Session 1 z-index / rail positions / backmost background are not intentionally changed;
- calculator geometry is not intentionally changed;
- business logic changed: **NO**.

Relevant commits:

- `ecc4181f950d8f1166072be02af3b839b15abf3f` — prevent secondary raster blur
- `b0b2bdea366fd01a70cc6ad60b16b8f3f6ac22dc` — activate sampling layer
- `2aed957442f7370f5cb140dccbc2e4db17ae6551` — add sampling safety contract
- `b967cd132a0d6623b435b888693c15a7e4fdf17d` — gate sampling contract in UI QA
- `383cb9320fda13d7750e2bfe8effe6d5b59e3939` — remove temporary checkpoint placeholder

Durable QA:

- `qa/character-sampling-v1-contract.mjs`
- covers Chromium + WebKit at:
  - phone portrait 390×844 @3x
  - phone landscape 844×390 @3x
  - iPad portrait 768×1024 @2x
  - iPad landscape 1024×768 @2x
- verifies approved overlay source paths stay active, art remains `pointer-events:none`, raster `filter` is `none`, and CSS fit scale does not exceed 1× current natural source size.
- evidence screenshots are `30-*-sampling-v1@*x.png` when the run reaches the contract.

Current run: **35992246985**. At this checkpoint GitHub Actions was still installing Playwright; no failure had been reported yet.

---

# HIGH-RES SOURCE PREPARATION FINDING

A high-resolution derivative set has been prepared locally from the user's approved reference rather than from upscaling the tiny production overlays. The clean source compositions are approximately:

- top-left ~516×463
- bottom-left ~653×494
- right ~556×849

These preserve the same approved story roles/details and are large enough to materially improve iPad/Retina sampling. They are **not yet wired into `main` at this checkpoint**. Do not substitute the incomplete `ner-character-*.png` + generic accessories as a shortcut.

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

**Next short session: finish V3 Session 2B in two bounded checks.**

1. First check UI QA run **35992246985**. If the new sampling contract fails, fix only that contract/CSS regression and rerun; do not start new visual work until it passes.
2. Then wire the prepared **high-resolution derivatives of the same approved three story-complete compositions** into `.decor-a/.decor-b/.decor-c` without changing Session 1 geometry/z-index.
3. Update the sharpness contract to require the high-res source paths and at least ~2 source px/CSS px for iPad states (3× desirable for phone where practical).
4. Run Chromium + WebKit + deployed Pages QA, manually inspect @2x/@3x screenshots, persist checkpoint, then stop and report whether final real-device acceptance is ready.

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
- V3 Session 2B.1 sampling/compositing safety: **DONE + QA VERIFIED**
- V3 Session 2B.1 QA run: **35992246985 — SUCCESS**
- V3 Session 2B.1 artifact: **10805171648**, digest `sha256:7e04898d8369be898f12200fdfa2d8c69d9b8e64cb4d920ba7e613e6319ed1ce`

---

# CURRENT STATUS — V3 ACCEPTANCE OPEN

Locked completed work — **DO NOT REDO**:

- V2 P0-A approved 3-character story composition — DONE + local/live verified.
- V2 P0-B ~300px protected phone center frame — DONE + local/live verified.
- V2 P0-C infographic thumbnails — DONE + local/live verified.
- V2 P0-D illustrated top + long-list rhythm — DONE + local/live verified.
- V3 Session 1 layering/orientation/backmost background — DONE + local/live verified.
- V3 Session 2A sharpness root-cause audit — DONE.
- V3 Session 2B.1 sampling/compositing safety — DONE + Chromium/WebKit/live regression QA verified.

Still open:

- **V3 Session 2B.2 — wire high-resolution approved character assets into production and verify sharpness (HIGH PRIORITY).**

Do not claim final visual acceptance until 2B.2 high-resolution source wiring is complete and visually rechecked.

---

# V3 SESSION 2A — ROOT CAUSE — LOCKED

Approved story-complete overlay sources were too small for Retina/iPad:

- `overlay-top-left.webp` = 130×121 px
- `overlay-bottom-left.webp` = 150×114 px
- `overlay-right.webp` = 110×171 px

This caused heavy undersampling on DPR 2–3 displays. A secondary blur contributor was the raster filter chain in `visual-character-composition-v2.css`.

Do not repeat this investigation.

---

# V3 SESSION 2B.1 — SAMPLING / COMPOSITING SAFETY — VERIFIED

Implementation:

- `assets/visual-character-sampling-v1.css`
- imported last from `assets/visual-polish.css`
- `.decor-person` uses `filter:none`, `will-change:auto`, normal image rendering;
- tablet character boxes are capped so the old low-res sources are not CSS-upscaled beyond native dimensions before DPR sampling;
- Session 1 geometry/z-index/backmost background intentionally unchanged;
- business logic changed: **NO**.

Relevant commits:

- `ecc4181f950d8f1166072be02af3b839b15abf3f` — prevent secondary raster blur
- `b0b2bdea366fd01a70cc6ad60b16b8f3f6ac22dc` — activate sampling layer
- `2aed957442f7370f5cb140dccbc2e4db17ae6551` — add sampling safety contract
- `b967cd132a0d6623b435b888693c15a7e4fdf17d` — gate sampling contract in UI QA
- `8b7e5e66162c0fbf746d6e500bb8641ada04ebd1` — verified sampling-safety checkpoint

QA run **35992246985 — SUCCESS**. All base regression, P0-A/B/D, orientation/layering, sampling-safety, calculator, deployed Pages regression gates, and evidence upload passed.

---

# V3 SESSION 2B.2 — HIGH-RES SOURCE WIRING — IN PROGRESS

Prepared high-resolution derivatives preserve the same approved story-complete compositions and were generated from the approved reference, not by upscaling the tiny production overlays.

Prepared dimensions:

- top-left ≈ **518×500**
- bottom-left ≈ **655×524**
- right ≈ **556×851**

Target repo paths:

- `assets/overlay-top-left-hires.webp`
- `assets/overlay-bottom-left-hires.webp`
- `assets/overlay-right-hires.webp`

Durable binary Git blob SHAs already created:

- top-left: `35c12cd9b92594a1d80fbaeed6863ab42d0996fe`
- bottom-left: `42c06cd201d1e34083d49b05620fe543f2822fc8`
- right: `9af0dd1f9743d39c9c5701733814e7b4aece9b35`

Important: two asset-only commits were created on a stale parent while reconciling (`599b8057…`, `9115f9fd…`) and are **not authoritative branch state**. Do not reset or force-push to them. Current `main` wins. Reuse the durable blob SHAs above and create a fresh tree on the current `main` tree.

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
4. **update `CURRENT_HANDOFF.md` at the end of every short session**;
5. report exact **NEXT ACTION** and stop.

---

# EXACT NEXT ACTION

**V3 Session 2B.2 continuation — reconcile high-res blobs onto current `main`, then wire CSS.**

1. Fetch current `main` commit/tree first; do not reuse stale tree SHA.
2. Create a new tree from that current tree and add the three existing high-res blob SHAs under the target asset paths.
3. Commit that tree with the current `main` commit as parent, fast-forward `main`, then verify the three asset paths exist on `main`.
4. Update `assets/visual-character-sampling-v1.css` so `.decor-a/.decor-b/.decor-c` use those high-res paths while preserving all Session 1 geometry/z-index and keeping `filter:none`.
5. Update sharpness QA to require the high-res source paths and effective source density >= ~2 source px/CSS px for iPad states (phone 3× desirable where practical).
6. Run Chromium + WebKit + deployed Pages QA and manually inspect @2x/@3x evidence.
7. Update this handoff with implementation SHA / run / artifact / visual finding, then stop and report whether final real-device acceptance is ready.

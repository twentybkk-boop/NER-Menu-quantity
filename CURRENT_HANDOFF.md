# CURRENT HANDOFF — NER Menu Quantity

> **Crash-safe continuation checkpoint — DO NOT RESTART.**
>
> Source of truth: current GitHub `main` + actual code + `recipe_master.json`. If any SHA/run below becomes stale, current `main` wins.

## Repository

- Repo: `twentybkk-boop/NER-Menu-quantity`
- Branch: `main`
- V2 feedback: `docs/UI_REAL_DEVICE_FEEDBACK_2026-09-24_V2.md`
- V3 feedback: `docs/UI_REAL_DEVICE_FEEDBACK_2026-09-24_V3.md`
- Character source finding: `docs/UI_CHARACTER_SOURCE_FINDING_2026-09-24.md`
- **Sharpness audit:** `docs/UI_CHARACTER_SHARPNESS_AUDIT_2026-09-24.md`
- Latest verified full UI QA run: **35984955105 — SUCCESS**
- Latest verified screenshot artifact: **10801314383**
- Latest verified Session 1 implementation SHA: `2be09886e8cfacd3aab299e322c42cc855c83400`
- Latest Session 1 handoff checkpoint: `65afa861d40addaab0f3e04edc975ace4814ca0f`
- Latest Session 2A audit commit before this handoff-only update: `d40f60fad16324e73bf2b34e5fbd1e2565d26780`

---

# CURRENT STATUS — V3 ACCEPTANCE OPEN

Locked completed work — **DO NOT REDO**:

- V2 P0-A approved three-character composition: DONE + local/live verified.
- V2 P0-B ~300px protected phone center frame: DONE + local/live verified.
- V2 P0-C infographic thumbnails: DONE + local/live verified.
- V2 P0-D illustrated top + long-list rhythm: DONE + local/live verified.
- **V3 Session 1 layering/orientation/backmost background: DONE + local/live verified.**
- **V3 Session 2A sharpness root-cause audit: DONE.**

Still open:

- **V3 Session 2B — implement character sharpness fix (HIGH PRIORITY).**

Do not claim final visual acceptance until Session 2B is implemented and visually rechecked.

---

# V3 SESSION 1 — LOCKED VERIFIED

Implementation: `assets/visual-layering-orientation-v1.css`.

Verified outcomes:

- phone landscape no longer breaks into the old rotated composition;
- iPad portrait/landscape characters stay above cards rather than behind them;
- green/round ambient shapes are on the backmost environment plane;
- `background-master.webp` is reinforced behind UI;
- phone landscape uses stable 2-column resilience layout;
- iPad portrait/landscape reserve illustration rails;
- 1180×820 wide iPad keeps 3-column regression behavior;
- character art stays `pointer-events:none`;
- business logic changed: **NO**.

Full QA run **35984955105 — SUCCESS**, artifact **10801314383**.

---

# V3 SESSION 2A — SHARPNESS AUDIT — DONE

Durable evidence: `docs/UI_CHARACTER_SHARPNESS_AUDIT_2026-09-24.md`.

## Verified primary root cause

The approved story-complete overlays are too small for Retina foreground rendering:

- `overlay-top-left.webp` = **130×121 px**, 5,978 B
- `overlay-bottom-left.webp` = **150×114 px**, 5,858 B
- `overlay-right.webp` = **110×171 px**, 5,594 B

Existing repo candidates:

- `ner-character-top-left.png` = **168×176 px**, 54,747 B
- `ner-character-bottom-left.png` = **188×175 px**, 57,621 B
- `ner-character-right.png` = **160×305 px**, 86,630 B
- `ner-team-bg.webp` = **540×360 px**, 12,806 B

The PNG masters are somewhat larger but are **not acceptable direct replacements** because they do not preserve all approved story details by themselves. Do not regress to generic accessory reconstruction.

## Effective current sampling

With `background-size:contain`:

- phone portrait approved overlays provide only ~**1.15–1.20 source px / CSS px**; at DPR 3 that is ~**0.38–0.40 source px / device px**;
- phone landscape remains materially undersampled;
- iPad portrait top/right are already slightly enlarged beyond native source resolution;
- iPad landscape is worst: approved overlays are CSS-upscaled ~**1.19–1.37×** before DPR 2, leaving only ~**0.36–0.42 source px / device px**.

Therefore the user's observed blur across phone/iPad is expected from source resolution alone.

## Secondary softness contributor

`assets/visual-character-composition-v2.css` applies a raster filter chain:

`filter: drop-shadow(...) saturate(...) contrast(...)`.

This forces additional filtered raster compositing/resampling, especially in Safari/WebKit. Removing it may help, but **cannot recover detail missing from the low-resolution sources**.

---

# LOCKED CONSTRAINTS

Do **not** intentionally change:

- approved three story roles/details;
- lower-left no-glasses requirement;
- Session 1 z-index/orientation/background geometry;
- ~300px phone center frame;
- infographic thumbnails;
- recipe calculations/quantities;
- exclusion/replacement semantics;
- Matrix data logic;
- PIN behavior;
- unrelated import/export behavior.

---

# DO NOT REPEAT

Do not redo:

- repo-wide investigation;
- 45-menu inventory;
- atlas architecture;
- infographic conversion;
- character identity/source-composition investigation;
- P0-A/B/C/D work;
- V3 Session 1 layering/orientation/background;
- **V3 Session 2A source-resolution audit**;
- Matrix/PIN/modal investigations.

---

# SHORT-SESSION RULE

Every continuation session must:

1. minimally read current `main` + this handoff;
2. complete one bounded task;
3. persist code/evidence/checkpoint;
4. report exact **NEXT ACTION** and stop.

---

# EXACT NEXT ACTION

**V3 Session 2B — HIGH-RES CHARACTER IMPLEMENTATION ONLY.**

1. Produce/use higher-resolution equivalents of the **same approved three story-complete compositions**; do not switch back to incomplete PNG + synthetic accessories.
2. Target at least **2 source pixels per CSS pixel** for iPad/Retina states; 3× for phone is desirable where practical.
3. Wire the high-resolution assets into the existing `.decor-a/.decor-b/.decor-c` roles **without changing Session 1 geometry/z-index**.
4. Remove the raster `filter` chain where safe; if shadow is still needed, use a strategy that does not soften the source art.
5. Add a durable sharpness/source-resolution contract covering phone portrait, phone landscape, iPad portrait and iPad landscape at Retina-like scale.
6. Run Chromium + WebKit + deployed GitHub Pages QA.
7. Manually inspect @2x/@3x screenshots, persist checkpoint, stop and report next action.

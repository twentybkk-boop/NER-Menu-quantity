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

# CURRENT STATUS — V3 ACCEPTANCE OPEN

V3 Session 2B.2 remains the only active visual defect workstream: wire high-resolution approved character assets into production and verify sharpness. Do not claim final visual acceptance until this is complete.

# LOCKED COMPLETED WORK — DO NOT REDO

- V2 P0-A approved 3-character story composition — DONE + local/live verified.
- V2 P0-B ~300px protected phone center frame — DONE + local/live verified.
- V2 P0-C infographic thumbnails — DONE + local/live verified.
- V2 P0-D illustrated top + long-list rhythm — DONE + local/live verified.
- V3 Session 1 layering/orientation/backmost background — DONE + local/live verified.
- V3 Session 2A sharpness root-cause audit — DONE.
- V3 Session 2B.1 sampling/compositing safety — DONE + local/live regression verified.

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

Stale asset-only commits (`599b8057…`, `9115f9fd…`) are not authoritative branch state. Never reset/force-push to them. Reuse only the blob SHAs above on current `main`.

Latest checkpoint before this handoff update: `800da20baf60b72dc17db8acaa697f152bccafb9`.

# LOCKED CONSTRAINTS

Do not intentionally change approved story details, lower-left no-glasses, Session 1 z-index/orientation/background geometry, ~300px phone center frame, infographic thumbnails, recipe/calculation quantities, exclusion/replacement semantics, Matrix data logic, PIN behavior, or unrelated import/export behavior.

# SHORT-SESSION RULE

Every continuation session must minimally read current `main` + this handoff, complete one bounded task, persist code/evidence/checkpoint, **update this file at the end of every short session**, report exact NEXT ACTION, then stop.

# EXACT NEXT ACTION

1. Fetch current `main` commit and tree **first**.
2. Create a fresh tree from that exact current tree and add the three existing high-res blob SHAs at the target asset paths.
3. Commit with that current `main` commit as parent, fast-forward `main`, verify asset paths exist.
4. Wire `assets/visual-character-sampling-v1.css` to the high-res paths without changing geometry/z-index and while keeping `filter:none`.
5. Update sharpness QA for high-res path + source-density requirements, run Chromium/WebKit/deployed Pages, inspect @2x/@3x evidence.
6. Update this handoff with implementation SHA/run/artifact/manual finding and stop.

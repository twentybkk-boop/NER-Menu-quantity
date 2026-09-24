# CURRENT HANDOFF — NER Menu Quantity

> **Crash-safe continuation checkpoint — DO NOT RESTART.**
>
> Source of truth: current GitHub `main` + actual code + `recipe_master.json`. If any SHA/run below is stale, current `main` wins.

## Repository

- Repo: `twentybkk-boop/NER-Menu-quantity`
- Branch: `main`
- Authoritative feedback: `docs/UI_REAL_DEVICE_FEEDBACK_2026-09-24_V2.md`
- Character source finding: `docs/UI_CHARACTER_SOURCE_FINDING_2026-09-24.md`
- Latest verified implementation/QA HEAD before this handoff-only commit: `c08112dde5bfd9e178fedf3be626c98871d30ada`
- Latest Pages deployment run: **35977648545 — SUCCESS**
- Latest UI QA run: **35977648662 — SUCCESS**
- Latest screenshot artifact: **10799435098** (`ui-qa-screenshots`)
- Artifact digest: `sha256:8c5d12c3b417e45dd1c48ad1c876e7805468a4b927bbc4e64e4b214d993e5005`

---

# ACCEPTANCE STATUS — OPEN

The earlier `READY FOR USER ACCEPTANCE` conclusion remains superseded by the user's later iPhone recording + reference images.

Current P0 status:

- **P0-A — correct approved 3-character source/composition: IMPLEMENTED + LOCAL/LIVE QA VERIFIED**
- **P0-B — protected center-frame fidelity: IMPLEMENTED + LOCAL/LIVE QA VERIFIED**
- **P0-C — simple infographic thumbnails: IMPLEMENTED + LOCAL/LIVE QA VERIFIED**
- **P0-D — match approved illustrated/branded UI direction: OPEN**

Do not claim the full visual workstream is complete until P0-D is implemented and visually re-accepted.

---

# PHASE 1 DATA / MAPPING

**COMPLETE — DO NOT REDO unless `recipe_master.json` changes.**

- 45 menus; semantic mapping 45/45.
- Existing atlas remains provenance/mapping evidence only.
- Live cards no longer use food-photo atlas crops.

---

# P0-C — INFOGRAPHIC THUMBNAILS

**DONE + VERIFIED — DO NOT REDO**

- `assets/visual-thumbnail-infographic.css`
- live menu cards use simple semantic pictogram/infographic tiles;
- old food-photo atlas is not painted in live cards;
- signature sets remain distinct;
- recipe/business behavior unchanged.

---

# P0-A — APPROVED CHARACTER COMPOSITION

**DONE + VERIFIED ON LOCAL + DEPLOYED GITHUB PAGES**

Authoritative source family:

- `assets/overlay-top-left.webp`
- `assets/overlay-bottom-left.webp`
- `assets/overlay-right.webp`
- `assets/ner-team-bg.webp` remains durable source/reference context.

Implementation:

- `assets/visual-character-composition-v2.css`
- synthetic `ner-character-*.png + accessory SVG` reconstruction is no longer the accepted normal-page painting strategy;
- pseudo accessory reconstruction is suppressed for the approved composition;
- lower-left remains **no-glasses**;
- all artwork remains `pointer-events:none`.

Durable QA:

- `qa/character-composition-v2-contract.mjs`
- `qa/live-pages-acceptance-v2.mjs`

The local character contract and live Pages gate now use the same minimum identity-detail threshold for all three compositions (>=78×76 CSS px), preventing local QA from accepting a top-left composition too small to preserve the drink/glasses/gesture cues.

Latest relevant commits:

- `609dd0b19dcef75af6ac3cd19dd1d3892ab773aa` — `Preserve top-left character identity detail in center frame`
- `c08112dde5bfd9e178fedf3be626c98871d30ada` — `Align local character detail gate with live acceptance`

Manual inspection of final artifact `10799435098` confirms the approved story-complete source family is visible on the deployed page:

- upper-left: glasses / drink / gesture / bubble composition;
- lower-left: helmet / cat-table / bubble, no glasses;
- right: backpack / clipboard / food-chalkboard / bubble composition.

---

# P0-B — PROTECTED CENTER FRAME

**DONE + VERIFIED ON LOCAL + DEPLOYED GITHUB PAGES**

Implementation:

- `assets/visual-center-frame-v2.css`
- phone `#app-menus` uses viewport-relative `width:min(300px,calc(100vw - 80px))`;
- at 390px viewport this resolves to a deliberate ~300px reading frame with ~45px illustration rails;
- hero is aligned to the same center-frame width;
- a non-interactive fixed lower illustration shelf separates the lower character scenes from the scrolling menu stack;
- calculator/PIN/Matrix states suppress the normal-list shelf where appropriate.

Important corrected root cause:

- the first V2 rule used `calc(100% - 140px)` inside the already-inset `#app-shell`, producing a **232px** lane instead of the intended broad center frame;
- commit `22cf24509db87917cbdea0ee36049a744200b2c0` changed the geometry to viewport-relative width and local P0-B then passed Chromium + WebKit.

A first live-gate attempt for that commit failed while its Pages deployment was still in progress and observed the previous 68×74 top-left character size. The deployment later completed successfully. After the explicit P0-A size correction and threshold alignment, final Pages + UI QA both pass.

Final evidence:

- Pages deployment run **35977648545** — SUCCESS
- UI QA run **35977648662** — SUCCESS
- `Verify P0-A complete character composition` — PASS
- `Verify P0-B protected center frame` — PASS
- `Verify deployed GitHub Pages P0-A/P0-B acceptance` — PASS
- Chromium + WebKit functional QA — PASS
- calculator hierarchy — PASS
- screenshot artifact **10799435098**

Manually inspected:

- `18-live-pages-character-v2@3x.png`
- `20-center-frame-v2-top@3x.png`
- `21-center-frame-v2-scroll@3x.png`
- `22-live-pages-center-frame-v2-scroll@3x.png`

Observed: center frame is materially broader than the rejected 232px state, infographic rows remain readable, and lower character compositions are visually separated onto the illustration shelf.

---

# P0-D — APPROVED ILLUSTRATED / BRANDED UI DIRECTION

**OPEN — THIS IS THE ONLY REMAINING P0 VISUAL WORKSTREAM ITEM**

The user reference image #3 remains the target. P0-A/B/C correct the source/composition, frame, and thumbnail strategy, but the page still needs a bounded art-direction fidelity pass so the whole screen reads closer to the approved illustrated NER interface rather than a utility list.

Key target traits from the authoritative feedback:

- stronger branded / illustrated environment;
- composition and visual hierarchy closer to reference #3;
- soft editorial card treatment;
- character storytelling feels intentional, not merely attached to viewport edges;
- preserve the now-verified center frame and infographic scanability;
- no business behavior changes.

---

# LOCKED BUSINESS CONSTRAINTS

Do **not** intentionally change:

- recipe calculations or quantities;
- canonical recipe meaning;
- exclusion / replacement semantics;
- Matrix data logic;
- PIN behavior;
- unrelated import / export behavior.

Do not regress:

- approved three-character overlay sources;
- lower-left no-glasses;
- 300px-class protected phone center frame;
- infographic thumbnails;
- calculator behavior;
- `pointer-events:none` foreground art.

---

# DO NOT REPEAT

Do not redo:

- repo-wide investigation;
- 45-menu inventory;
- atlas architecture / semantic mapping;
- infographic-thumbnail conversion;
- character asset inventory investigation;
- P0-A source/composition implementation;
- P0-B center-frame geometry investigation/fix;
- Matrix/PIN functional investigation;
- modal scroll restoration investigation.

---

# SHORT-SESSION RULE

Every continuation session must:

1. minimally read current `main` + this handoff;
2. complete **one bounded task**;
3. persist code/evidence/checkpoint;
4. report exact **NEXT ACTION** and stop.

---

# EXACT NEXT ACTION

**Next short session: P0-D only — first bounded art-direction fidelity pass against reference image #3.**

Start with the **top/first-screen composition only** (masthead + hero + first category, including how the approved upper-left character participates in that composition). Do not redesign the long list yet.

Goals for that one pass:

1. make the top screen read materially closer to the approved illustrated/branded reference #3;
2. preserve the verified ~300px phone center frame;
3. preserve approved story-complete character sources and P0-C infographic tiles;
4. keep Matrix behavior unchanged and visually secondary;
5. add a bounded top-composition fidelity contract/screenshot evidence;
6. run Chromium + WebKit + deployed Pages QA, inspect screenshots, checkpoint, then stop.

Expected following NEXT ACTION after the top composition pass: continue P0-D with the long-list/environmental rhythm only if the top pass is accepted by evidence.

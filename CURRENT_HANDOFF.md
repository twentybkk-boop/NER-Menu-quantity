# CURRENT HANDOFF — NER Menu Quantity

> **Crash-safe continuation checkpoint — DO NOT RESTART.**
>
> Source of truth: current GitHub `main` + actual code + `recipe_master.json`. If any SHA/run below becomes stale, current `main` wins.

## Repository

- Repo: `twentybkk-boop/NER-Menu-quantity`
- Branch: `main`
- V2 acceptance source: `docs/UI_REAL_DEVICE_FEEDBACK_2026-09-24_V2.md`
- **Latest V3 real-device feedback:** `docs/UI_REAL_DEVICE_FEEDBACK_2026-09-24_V3.md`
- Latest verified implementation/QA HEAD before this handoff-only commit: `2be09886e8cfacd3aab299e322c42cc855c83400`
- Latest UI QA run: **35984955105 — SUCCESS**
- Latest screenshot artifact: **10801314383** (`ui-qa-screenshots`)
- Artifact digest: `sha256:0fa4c8070390451067448756f51bcacf672544ac38ff4fa03279c013848e0e81`

---

# ACCEPTANCE STATUS — OPEN (V3)

V2 P0-A/B/C/D work remains verified and must not be redone. The user's newer 34-second iPhone Safari recording + new mockup reopened acceptance with orientation/layer/background defects and a high-priority character-sharpness defect.

Current V3 status:

- **V3 Session 1 — layering / orientation / backmost background: DONE + LOCAL/LIVE QA VERIFIED**
- **V3 Session 2 — character sharpness across phone/iPad portrait+landscape: OPEN — HIGH PRIORITY**

Do **not** claim final visual acceptance until Session 2 sharpness is implemented and visually rechecked.

---

# LOCKED VERIFIED V2 WORK — DO NOT REDO

## P0-A — approved three-character composition

- approved sources:
  - `assets/overlay-top-left.webp`
  - `assets/overlay-bottom-left.webp`
  - `assets/overlay-right.webp`
- upper-left: glasses + drink + gesture + bubble;
- lower-left: **no glasses**, helmet + cat/table + bubble;
- right: white backpack + clipboard/pen + food scene + bubble;
- art remains `pointer-events:none`.

## P0-B — protected center frame

- phone portrait center reading frame remains ~300px at 390px viewport;
- verified implementation: `assets/visual-center-frame-v2.css`;
- do not return to the rejected ~232px lane.

## P0-C — infographic thumbnails

- `assets/visual-thumbnail-infographic.css`;
- live cards use pictogram/infographic tiles;
- food-photo atlas remains provenance/mapping evidence only and is not painted in live menu cards.

## P0-D — illustrated/branded direction

Verified layers:

- `assets/visual-top-composition-v1.css`
- `assets/visual-long-list-rhythm-v1.css`

Do not redo top or long-list art direction unless new evidence identifies a specific defect.

---

# V3 USER FEEDBACK

Authoritative new defects from latest real-device recording/mockup:

1. phone rotation to landscape breaks composition (landscape is resilience, not primary phone UI);
2. top-right round/green ambient bubbles appeared on the same visual plane as the three characters and must be pushed behind;
3. reinforce a true backmost environmental background so mood is closer to the mockup;
4. **character artwork is visibly blurry/soft on phone portrait, phone landscape, iPad portrait and iPad landscape — HIGH PRIORITY**;
5. characters fall behind cards in phone landscape and iPad portrait/landscape.

The agreed crash-safe split is:

- Session 1 = layering/orientation/background only;
- Session 2 = sharpness only.

---

# V3 SESSION 1 — LAYERING / ORIENTATION / BACKGROUND

**DONE + VERIFIED — DO NOT REDO unless new device evidence shows a regression.**

## Implementation

Production layer:

- `assets/visual-layering-orientation-v1.css`
- imported last from `assets/visual-polish.css`.

Layer model now intentionally separates:

1. `body::before` / environmental master + ambient circles = **backmost** plane;
2. normal page/content composition;
3. approved character illustration plane = above application/card plane, still non-interactive;
4. critical foreground text/controls where required;
5. modals remain above normal page composition.

Key corrections:

- character z-order no longer falls back below cards on iPad/landscape;
- green/round ambient shapes were removed from masthead/category foreground treatments and now live in the backmost environment;
- backmost `background-master.webp` mood is reinforced behind content;
- phone landscape gets a stable two-column resilience layout with side illustration rails and hides the portrait-only lower shelf;
- iPad portrait reserves a narrower center reading lane with side illustration rails;
- iPad landscape keeps characters in side rails;
- wide iPad landscape (1180×820 regression target) preserves the existing 3-column reflow contract.

Business behavior changed: **NO**.

## Durable QA

- `qa/layering-orientation-v1-contract.mjs`
- workflow gates local **and deployed GitHub Pages**.

The V3 contract covers Chromium + WebKit at:

- phone portrait: 390×844;
- phone landscape: 844×390;
- iPad portrait: 768×1024;
- iPad landscape: 1024×768;
- wide iPad landscape: 1180×820.

It verifies:

- all 3 approved overlay sources remain active;
- character art remains `pointer-events:none`;
- character plane stays above normal application/card plane;
- background master + ambient circles remain on the backmost plane;
- landscape/iPad characters do not materially intrude into the center card lane;
- phone-landscape portrait shelf is suppressed;
- responsive menu-column expectations remain compatible with the base regression suite.

Phone portrait is intentionally not judged by the new side-rail intrusion threshold because its approved character overlap is separately locked by P0-A/P0-B/P0-D contracts. The new rail test targets the newly reported landscape/iPad defect only.

## Final verification

UI QA run **35984955105 — SUCCESS**:

- base Chromium + WebKit UI QA — PASS;
- P0-A composition — PASS;
- P0-B center frame — PASS;
- P0-D top composition — PASS;
- P0-D long-list rhythm — PASS;
- **V3 orientation/layering local — PASS**;
- calculator visual hierarchy — PASS;
- deployed Pages P0-A/P0-B — PASS;
- deployed Pages P0-D top/long-list — PASS;
- **deployed Pages V3 orientation/layering — PASS**;
- evidence upload — PASS.

Latest artifact: **10801314383**, digest `sha256:0fa4c8070390451067448756f51bcacf672544ac38ff4fa03279c013848e0e81`.

Manually inspected evidence includes:

- `29-phone-portrait-layering-v1@2x.png`
- `29-phone-landscape-layering-v1@2x.png`
- `29-ipad-portrait-layering-v1@2x.png`
- `29-ipad-landscape-layering-v1@2x.png`
- `29-ipad-wide-landscape-layering-v1@2x.png`
- corresponding `live-29-*` deployed Pages screenshots.

Observed:

- phone landscape no longer exhibits the broken rotated composition from the user's recording;
- iPad portrait/landscape characters remain on the intended illustration plane rather than behind cards;
- ambient circles/environment now read behind the foreground composition;
- local and deployed Pages are equivalent for the checked states;
- **character softness/blurriness is still visibly present and is intentionally NOT counted as fixed in Session 1.**

Relevant V3 Session 1 commits include:

- `7a86e84d1c798e0453343e16add0552f32e84f04` — record V3 feedback;
- `66bca4084b05201e0c9d01b2ee4b3d01d687acf6` — reserve wider iPad portrait rails;
- `58136f12cf6e3ec799a6dfdf771a6096e121dd12` — keep tablet characters out of center lane;
- `87962ac9ae493d74872cf457814d887c64672d08` — restore wide-iPad landscape reflow;
- `22b31263fc4b61945296474d70079719587f65c2` — align V3 orientation gate with wide-iPad reflow;
- `f5ef5e8fdf8cff36be09f612348e57c6196e2c45` — align top-composition gate with backmost environment;
- `aefde33778ed570051b470f43d6d3ea5974ea100` — align long-list gate with backmost environment;
- `2be09886e8cfacd3aab299e322c42cc855c83400` — scope rail gate to the actual landscape/iPad defects and final verified implementation SHA.

---

# LOCKED BUSINESS CONSTRAINTS

Do **not** intentionally change:

- recipe calculations or quantities;
- canonical recipe meaning;
- exclusion/replacement semantics;
- Matrix data logic;
- PIN behavior;
- unrelated import/export behavior.

---

# DO NOT REPEAT

Do not redo without new evidence:

- repo-wide investigation;
- 45-menu inventory;
- semantic mapping / old atlas architecture;
- infographic conversion;
- character identity/source-composition investigation;
- P0-A/B/C/D work;
- V3 Session 1 layering/orientation/background work;
- Matrix/PIN functional investigation;
- modal scroll-restoration investigation.

---

# SHORT-SESSION RULE

Every continuation session must:

1. minimally read current `main` + this handoff;
2. complete one bounded task;
3. persist code/evidence/checkpoint;
4. report exact **NEXT ACTION** and stop.

---

# EXACT NEXT ACTION

**V3 Session 2 — CHARACTER SHARPNESS ONLY (HIGH PRIORITY).**

Do not change the verified layering/orientation/background geometry from Session 1 unless sharpness evidence proves it is necessary.

Bounded steps:

1. audit actual natural pixel dimensions / encoding / file sizes of the approved character sources:
   - `overlay-top-left.webp`
   - `overlay-bottom-left.webp`
   - `overlay-right.webp`
   - compare against higher-resolution source candidates already in repo such as `ner-team-bg.webp` and `ner-character-*.png` without changing approved story composition;
2. calculate effective source-pixels-per-CSS-pixel for phone portrait/landscape and iPad portrait/landscape;
3. identify CSS/browser scaling/filtering/compositing that contributes to softness;
4. if approved overlays lack enough source pixels, derive or switch to higher-resolution equivalents that preserve the exact approved three story compositions — do not reconstruct identity details from generic accessories;
5. remove/avoid scaling/filter rules that soften raster art where safe;
6. add a sharpness/source-resolution QA contract with phone portrait, phone landscape, iPad portrait and iPad landscape screenshots at Retina-like scale;
7. run Chromium + WebKit + deployed Pages QA;
8. manually inspect character detail at @2x/@3x, persist checkpoint, stop and report next action.

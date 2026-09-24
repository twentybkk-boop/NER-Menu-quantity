# CURRENT HANDOFF — NER Menu Quantity

> **Crash-safe continuation checkpoint — DO NOT RESTART.**
>
> Highest source of truth: current GitHub `main` + actual code + `recipe_master.json`. If any SHA/run below becomes stale, current `main` wins.

## Repository / branch

- Repository: `twentybkk-boop/NER-Menu-quantity`
- Branch: `main`
- Original real-device feedback: `docs/UI_REAL_DEVICE_FEEDBACK_2026-09-24.md`
- Final live acceptance evidence: `docs/UI_LIVE_ACCEPTANCE_2026-09-24.md`
- Latest verified live UI / QA code SHA: `1f3e6eb2a3cb6be20986bc67ee117c585b3d8c72`
- Final Pages deployment run for that SHA: **35968350715** — SUCCESS
- Final UI QA + live deployed-page acceptance run: **35968351126** — SUCCESS
- Final screenshot artifact: **10794069988** (`ui-qa-screenshots`)
- Artifact digest: `sha256:66f34250429a835481cc4cd20a5631914cde9ea9aafb7091aa26d50b849f9823`

---

# WORKSTREAM STATUS

## Phase 1 — menu inventory / semantic thumbnail mapping

**COMPLETE. DO NOT REDO unless `recipe_master.json` changes.**

- 45 menus, mapping 45/45.
- Atlas 6×5, 27 illustrated semantic regions, 3 unused.
- Four signature sets remain distinct.
- Semantic guards remain active.
- Production atlas: `assets/menu-thumbnails/semantic-atlas-v1.webp`.
- Integrity gate locks 59,500 bytes and SHA-256 `1976697397b1581091dc3936412ac9789256b6bd0210ef8afdeac6ac375cd9b4`.

## Real-device feedback corrections

### F1 — central card containment

**LIVE ACCEPTED**

- cards stay inside protected center lane;
- both character rails remain reserved;
- character artwork no longer owns card space.

### F2 — thumbnail sharpness

**LIVE ACCEPTED WITH @3x AUTOMATED EVIDENCE; PHYSICAL SAFARI SUBJECTIVE CHECK REMAINS USEFUL**

- normal thumbnails <= 67×45 CSS px;
- signature thumbnails <= 73×49 CSS px;
- 3:2 source ratio preserved;
- production semantic atlas active on deployed page.

### F3 — character identity details

**LIVE ACCEPTED AT DEPLOYED ASSET / CSS CONTRACT LEVEL**

- all 3 characters present;
- high-detail character masters active;
- gray full-face helmet asset active;
- white backpack asset active;
- bottom-left remains no-glasses;
- decoration remains non-interactive.

### F4 — live UI fidelity to approved generated direction

**ALL BOUNDED REPOSITORY PASSES COMPLETE + LIVE ACCEPTED**

Completed presentation passes:

1. phone masthead / hero / Matrix hierarchy;
2. semantic category headers + menu-card rhythm;
3. character edge framing + background softness;
4. calculator visual hierarchy.

No recipe/business behavior was changed by these passes.

---

# FINAL LIVE / DEPLOY ACCEPTANCE

A durable deployed-page gate now exists:

- script: `qa/live-pages-acceptance.mjs`
- workflow step: `Verify deployed GitHub Pages acceptance`
- target: `https://twentybkk-boop.github.io/NER-Menu-quantity/`
- browsers: Chromium + WebKit
- phone viewport: 390×844 @3x

The gate polls deployed `assets/visual-polish.css` until the current fidelity layers are visible, then verifies the actual GitHub Pages DOM/computed styles against the four original feedback items.

Final verified evidence:

- Pages run **35968350715** deployed SHA `1f3e6eb2a3cb6be20986bc67ee117c585b3d8c72` successfully.
- UI QA run **35968351126** passed every step, including `Verify deployed GitHub Pages acceptance`.
- `13-live-pages-iphone@3x.png` is a screenshot from the real deployed GitHub Pages URL.
- `14-live-pages-calculator@3x.png` is the real deployed calculator state.

Manual inspection of those live screenshots found no new repository visual defect requiring another CSS pass.

**Visual correction workstream: READY FOR USER ACCEPTANCE.**

---

# DURABLE QA NOW RUNS

`.github/workflows/ui-qa.yml` includes:

- thumbnail / atlas integrity validation;
- Chromium + WebKit functional UI QA;
- `qa/real-device-visual-contract.mjs`;
- `qa/calculator-visual-contract.mjs`;
- `qa/live-pages-acceptance.mjs` against the deployed GitHub Pages URL;
- contact-sheet evidence;
- screenshot artifact upload.

---

# LOCKED CONSTRAINTS

Do **not** intentionally change without new bug evidence:

- recipe calculations or quantities;
- canonical recipe meaning;
- exclusion / replacement semantics;
- Matrix data logic;
- PIN behavior;
- unrelated import / export behavior.

Character requirements remain locked:

- all 3 characters together in relevant states;
- bottom-left no-glasses;
- helmet / white-backpack identity details remain available;
- foreground `pointer-events:none` and never blocks controls.

---

# DO NOT REPEAT

Do not redo:

- repo-wide investigation;
- 45-menu inventory;
- semantic atlas architecture;
- F1 center-lane correction;
- F2 thumbnail sizing correction;
- F3 high-detail character/accessory restoration;
- F4 masthead/hero/Matrix hierarchy;
- F4 category/card rhythm;
- F4 character framing/background softness;
- F4 calculator hierarchy;
- Matrix/PIN validation;
- modal scroll-restoration investigation;
- QA harness scope repair;
- final live/deploy acceptance unless a new deploy or new real-device defect requires it.

---

# SHORT-SESSION RULE

Each future session:

1. minimally recover current `main`;
2. address one concrete issue only;
3. persist code/evidence/checkpoint;
4. report exact **NEXT ACTION** and stop.

---

# EXACT NEXT ACTION

**No pending repository implementation task in this visual correction workstream.**

Next action is **user acceptance on physical iPhone/Safari**. If the user supplies a new screenshot or concrete defect, reproduce only that exact state and fix the owning presentation layer; do not begin another general redesign pass. If no new defect evidence is supplied, leave the verified repository implementation unchanged.

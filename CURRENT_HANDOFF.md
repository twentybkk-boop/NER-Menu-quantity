# CURRENT HANDOFF — NER Menu Quantity

> **Crash-safe continuation checkpoint — DO NOT RESTART.**
>
> Highest source of truth: current GitHub `main` + actual code + `recipe_master.json`. If any SHA/run below becomes stale, current `main` wins.

## Repository / branch

- Repository: `twentybkk-boop/NER-Menu-quantity`
- Branch: `main`
- Real-device feedback source: `docs/UI_REAL_DEVICE_FEEDBACK_2026-09-24.md`
- Feedback commit: `3125910ec11fffbacb357c718647ada983836ae0`
- Latest verified implementation / QA HEAD before this handoff-only update: `e7112a526988f9da67598d167a664dbc31de55b5`
- Latest verified UI QA run: **35967748900** — SUCCESS
- Latest screenshot artifact: **10794772946** (`ui-qa-screenshots`)
- Artifact digest: `sha256:8dcd9d61ab484802b52b1f526b7d937fad088274f927006b401f68de8ca17d1c`

---

# CURRENT STATUS

## Phase 1 data / mapping — COMPLETE

Do not redo unless `recipe_master.json` changes:

- **45 menus**, mapping **45/45**.
- Atlas **6×5**, **27 illustrated regions**, **3 unused**.
- Four signature sets remain distinct.
- Semantic guards remain active.
- Production atlas: `assets/menu-thumbnails/semantic-atlas-v1.webp`.
- Integrity gate: **59,500 bytes**, SHA-256 `1976697397b1581091dc3936412ac9789256b6bd0210ef8afdeac6ac375cd9b4`.

---

# REAL-DEVICE FEEDBACK STATUS

## P0-F1 — central card containment / character-safe rails

**IMPLEMENTED + QA VERIFIED**

- phone menu content stays inside the protected center lane;
- cards do not use character rails as content space;
- all three character roles remain present.

## P0-F2 — thumbnail sharpness

**IMPLEMENTED + QA VERIFIED AT @3x; PHYSICAL SAFARI RECHECK STILL USEFUL**

- normal thumbnails: **66×44 CSS px**;
- four signature thumbnails: **72×48 CSS px**;
- source atlas 3:2 ratio preserved;
- semantic mapping unchanged.

## P0-F3 — character identity details

**IMPLEMENTED + QA VERIFIED**

High-detail masters remain active:

- `assets/ner-character-top-left.png`
- `assets/ner-character-bottom-left.png`
- `assets/ner-character-right.png`

Identity assets remain active:

- `assets/accessory-gray-fullface-helmet.svg`
- `assets/accessory-white-backpack.svg`

Locked requirements remain:

- all **3 characters** present together in relevant states;
- bottom-left **does not wear glasses**;
- helmet visible;
- white backpack visible;
- foreground `pointer-events:none`.

---

# P0-F4 — LIVE UI FIDELITY

**ALL BOUNDED REPOSITORY PASSES COMPLETE + QA VERIFIED**

## Pass A — phone top-of-page hierarchy — COMPLETE

- duplicate phone hero brand title removed presentation-only;
- masthead is the single brand anchor;
- hero compacted and aligned to protected lane;
- Matrix action visually secondary; behavior unchanged.

Commits:

- `00b2c26cc9e2fb5d87f7e0fbcc14ec2eb53c7608`
- `b36aee192eea2ffdb0f9d4f5cab1205a40c6cf70`

## Pass B — category headers + menu-card rhythm — COMPLETE

Presentation layer: `assets/visual-menu-rhythm.css`

- semantic category tokens: `🍲 / 🥩 / 🥬 / 🍜 / 🥚 / 🍟 / 🍨`;
- normal card rhythm ~**62px**;
- signature card rhythm ~**74px**;
- central lane and thumbnail dimensions preserved.

Commits:

- `5c2fd4d20ae7b01bad02c4fb68937538c447d34f`
- `043d3252832f1695e7a7616463eee9ebc6a2bb25`
- `1fff42614b8c9c5b9f248a284d1cbd502d563d59`

## Pass C — character framing + background softness — COMPLETE

Presentation layer: `assets/visual-character-frame.css`

- high-detail character masters retained;
- characters pushed farther into edge rails / reduced in scale so content owns the center;
- mobile background-master veil softened edge decoration without removing illustrated direction;
- helmet / backpack / no-glasses constraints preserved.

Commits:

- `0164cf5588f1d3a7df353bdcada08dd890b55aca`
- `a02b68af5ccdef715b8676859112aaf9c2859125`
- `5a88fa2ba389773b4797fd30ab97fdca4ff56e88`

## Pass D — calculator visual hierarchy — COMPLETE

Presentation layer: `assets/visual-calculator-hierarchy.css`

Commits:

- `1f5619d14b682ccfedabbf2b0fd3b8c65132c13d` — refine phone calculator visual hierarchy
- `c3626cd1debbe68d4969ccead230b6a2e295730c` — activate calculator hierarchy layer
- `c1840963a68ca36622ee3263d2cde204b0a9e19b` — add calculator visual contract
- `e7112a526988f9da67598d167a664dbc31de55b5` — gate calculator visual contract in UI QA

Verified presentation behavior:

- modal header is compact with reduced title/subtitle/close-button footprint;
- exclusion/action zone uses warm/rose-neutral treatment and lower visual weight;
- net-result zone uses sage/ivory treatment and stronger numeric hierarchy;
- exclusion rows are compact (~42px bounded contract);
- result rows remain clearly readable (~48px bounded contract);
- net quantity type is materially larger than ingredient-name type;
- left/right zones are semantically distinct without changing data or behavior;
- `.calculator-body` remains `overflow-y:auto` on phone;
- all three modal-frame characters remain present and non-interactive;
- helmet / backpack remain present; bottom-left remains no-glasses.

New durable QA:

- `qa/calculator-visual-contract.mjs`
- runs in **Chromium + WebKit** at phone viewport / @3x;
- verifies compact header, zone separation, section-label treatment, exclusion/result row rhythm, numeric emphasis, scrolling behavior, and three-character identity constraints;
- produces `12-calculator-hierarchy-iphone@3x.png`.

Latest manual screenshot inspection from artifact **10794772946**:

- `04-iphone-calculator.png`: compact phone-scale view shows clearer action/result separation and significantly less visual noise.
- `12-calculator-hierarchy-iphone@3x.png`: action-zone pill, result-zone pill, compact exclusion rows and emphasized quantities are clearly visible; controls remain unobstructed.

Business / recipe / exclusion / replacement logic changed by Pass D: **NO**.

---

# DURABLE QA

`.github/workflows/ui-qa.yml` now runs:

- atlas integrity validator;
- Chromium + WebKit functional UI QA;
- `qa/real-device-visual-contract.mjs`;
- `qa/calculator-visual-contract.mjs`;
- contact-sheet evidence;
- screenshot artifact upload.

Latest run **35967748900** passed every step, including:

- `Validate thumbnail contract and atlas integrity` — PASS
- `Run Chromium + WebKit UI QA` — PASS
- `Verify real-device visual fidelity contract` — PASS
- `Verify calculator visual hierarchy contract` — PASS
- `Render thumbnail contact sheet evidence` — PASS
- `Upload screenshots` — PASS

---

# LOCKED BUSINESS CONSTRAINTS

Do **not** intentionally change:

- recipe calculations or quantities;
- canonical recipe meaning;
- exclusion / replacement semantics;
- Matrix data logic;
- PIN behavior;
- unrelated import / export behavior.

---

# DO NOT REPEAT

Do not redo:

- repo-wide investigation;
- 45-menu inventory;
- semantic atlas architecture;
- F1 central-lane work;
- F2 thumbnail sizing work;
- F3 character-master/accessory restoration;
- F4 phone masthead/hero/Matrix hierarchy;
- F4 phone category/card rhythm;
- F4 phone character framing/background softness;
- F4 phone calculator hierarchy;
- prior Matrix/PIN validation;
- modal scroll-restoration investigation;
- QA harness scope repair.

---

# SHORT-SESSION WORKING RULE

Each session:

1. minimally recover current `main`;
2. complete one bounded task;
3. persist code + QA evidence + checkpoint;
4. report exact **NEXT ACTION** and stop.

---

# EXACT NEXT ACTION

**Next short session:** perform a **final live/deploy acceptance check against the four original real-device feedback items**, using current GitHub `main` and the deployed GitHub Pages state once it reflects the verified implementation. Re-check only: (1) cards stay inside the protected center frame, (2) thumbnails are acceptably sharp on real Safari/Retina evidence, (3) all three character identity details remain visible including helmet/white backpack and bottom-left no-glasses, and (4) live UI fidelity matches the approved generated direction materially better. Do not add more CSS without concrete live/real-device defect evidence. If no new defect evidence exists, mark this visual correction workstream ready for user acceptance rather than starting another redesign pass.

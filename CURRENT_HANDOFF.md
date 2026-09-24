# CURRENT HANDOFF — NER Menu Quantity

> **Crash-safe continuation checkpoint — DO NOT RESTART.**
>
> Highest source of truth: current GitHub `main` + actual code + `recipe_master.json`. If any SHA/run below becomes stale, current `main` wins.

## Repository / branch

- Repository: `twentybkk-boop/NER-Menu-quantity`
- Branch: `main`
- Real-device feedback source: `docs/UI_REAL_DEVICE_FEEDBACK_2026-09-24.md`
- Feedback commit: `3125910ec11fffbacb357c718647ada983836ae0`
- Latest verified implementation / QA HEAD before this handoff-only update: `5a88fa2ba389773b4797fd30ab97fdca4ff56e88`
- Latest verified UI QA run: **35966666854** — SUCCESS
- Latest screenshot artifact: **10794522584** (`ui-qa-screenshots`)
- Artifact digest: `sha256:b80dce6c0bf317518eb29edf983ddb04845f4f94f88fdb05820493e2127b0ae3`

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

- phone menu content is constrained to the protected center lane;
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

High-detail masters:

- `assets/ner-character-top-left.png`
- `assets/ner-character-bottom-left.png`
- `assets/ner-character-right.png`

Identity assets:

- `assets/accessory-gray-fullface-helmet.svg`
- `assets/accessory-white-backpack.svg`

Locked requirements:

- all **3 characters** present together in relevant states;
- bottom-left **does not wear glasses**;
- helmet visible;
- white backpack visible;
- foreground `pointer-events:none`.

---

# P0-F4 — LIVE UI FIDELITY

**IN PROGRESS — THREE BOUNDED PHONE PASSES COMPLETE**

## Pass A — top-of-page hierarchy — COMPLETE

Commits:

- `00b2c26cc9e2fb5d87f7e0fbcc14ec2eb53c7608` — Tighten mobile top-page visual hierarchy
- `b36aee192eea2ffdb0f9d4f5cab1205a40c6cf70` — Gate compact mobile hero hierarchy

Verified:

- masthead is the single phone brand anchor;
- duplicate hero title hidden presentation-only;
- compact hero aligned to protected lane;
- Matrix action visually secondary, behavior unchanged.

## Pass B — category headers + menu-card rhythm — COMPLETE

Commits:

- `5c2fd4d20ae7b01bad02c4fb68937538c447d34f` — Refine phone category scan hierarchy and card rhythm
- `043d3252832f1695e7a7616463eee9ebc6a2bb25` — Activate phone menu rhythm fidelity layer
- `1fff42614b8c9c5b9f248a284d1cbd502d563d59` — Gate phone category hierarchy and card rhythm

Presentation layer:

- `assets/visual-menu-rhythm.css`

Verified:

- category tokens distinct: `🍲 / 🥩 / 🥬 / 🍜 / 🥚 / 🍟 / 🍨`;
- legacy repeated bowl visually suppressed;
- normal card rhythm ~**62px**;
- signature set rhythm ~**74px**;
- title scale/gap/radius bounded by QA;
- F1/F2/F3 remain intact.

## Pass C — character framing + background softness — COMPLETE

Commits:

- `0164cf5588f1d3a7df353bdcada08dd890b55aca` — Tune phone character framing and background softness
- `a02b68af5ccdef715b8676859112aaf9c2859125` — Activate phone character framing fidelity layer
- `5a88fa2ba389773b4797fd30ab97fdca4ff56e88` — Gate phone character framing and background softness

Presentation layer:

- `assets/visual-character-frame.css`

Phone framing now uses the same high-detail character masters but smaller / further outside the viewport rails:

- top-left bounded at **118×123px**, `left:-52px`;
- bottom-left bounded at **136×126px**, `left:-58px`;
- right bounded at **104×198px**, `right:-46px`;
- character opacity stays **0.97** so identity detail is not lost;
- shadows reduced so characters read as framing rather than floating foreground cards.

Background:

- `background-master.webp` remains the source;
- phone-only warm veil was strengthened;
- center reading lane remains near-opaque ivory;
- edge artwork / top decorative circles are softer without removing the illustrated direction.

New durable contract verifies in Chromium + WebKit:

- character high-detail masters remain active;
- helmet / backpack remain active;
- bottom-left still no-glasses;
- all three are visible and non-interactive;
- character scale is bounded;
- horizontal intrusion into the protected lane is bounded;
- `background-master.webp` remains active;
- mobile softness veil and geometry remain active;
- all prior lane / thumbnail / compact-hero / category / card-rhythm contracts remain active.

Latest manual screenshot inspection from artifact **10794522584**:

- `01-iphone-top.png`: top-left now behaves as an edge frame instead of competing with masthead/cards; lower left/right are less intrusive.
- `02-iphone-mid.png`: center list is visually dominant; three-person frame remains visible at edges.
- `03-iphone-lower.png`: vegetable/noodle hierarchy stays clear with softer edge decoration.
- `10-real-device-fidelity-iphone@3x.png`: protected reading lane is cleaner; high-resolution food thumbnails remain sharp.
- `04-iphone-calculator.png`: all three characters still present around modal; helmet/backpack identity details remain available and controls remain unobstructed.

### P0-F4 remaining bounded section

- **calculator visual hierarchy**.

Do not solve fidelity by changing recipe/business behavior.

---

# DURABLE QA

`.github/workflows/ui-qa.yml` runs:

- atlas integrity validator;
- Chromium + WebKit UI QA;
- `qa/real-device-visual-contract.mjs`;
- contact-sheet evidence;
- screenshot artifact upload.

Latest run **35966666854** passed:

- `Validate thumbnail contract and atlas integrity` — PASS
- `Run Chromium + WebKit UI QA` — PASS
- `Verify real-device visual fidelity contract` — PASS
- `Render thumbnail contact sheet evidence` — PASS
- `Upload screenshots` — PASS

Business / recipe logic changed by F1–F4 presentation work: **NO**.

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
- prior Matrix/PIN validation;
- modal scroll-restoration investigation;
- QA harness scope repair.

---

# SHORT-SESSION WORKING RULE

Each session:

1. minimally recover current `main`;
2. complete one bounded presentation task;
3. persist code + QA evidence + checkpoint;
4. report exact **NEXT ACTION** and stop.

---

# EXACT NEXT ACTION

**Next short session:** continue only **P0-F4 calculator visual hierarchy on phone**. Use `04-iphone-calculator.png` from artifact `10794522584` as the starting evidence. Improve separation between exclusion choices and net-result output, tighten modal header/body rhythm, and reduce visual competition while preserving all calculator behavior, exclusion/replacement semantics, scrolling/restoration, and the three-character modal composition. Do not change recipe quantities or calculation logic. Add a bounded calculator visual contract if useful, run UI QA, manually inspect the calculator screenshot, persist the checkpoint, then stop and report the next action.

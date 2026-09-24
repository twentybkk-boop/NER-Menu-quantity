# CURRENT HANDOFF — NER Menu Quantity

> **Crash-safe continuation checkpoint — DO NOT RESTART.**
>
> Highest source of truth: current GitHub `main` + actual code + `recipe_master.json`. If any SHA/run below becomes stale, current `main` wins.

## Repository / branch

- Repository: `twentybkk-boop/NER-Menu-quantity`
- Branch: `main`
- Real-device feedback source: `docs/UI_REAL_DEVICE_FEEDBACK_2026-09-24.md`
- Feedback commit: `3125910ec11fffbacb357c718647ada983836ae0`
- Latest verified implementation / QA HEAD before this handoff-only update: `1fff42614b8c9c5b9f248a284d1cbd502d563d59`
- Latest verified UI QA run: **35965884635** — SUCCESS
- Latest screenshot artifact: **10793544803** (`ui-qa-screenshots`)
- Artifact digest: `sha256:37e21674f0caf2c4482621c9607bde2d7f4ff05f848fa5b168b73f45d107b21d`

---

# CURRENT STATUS

## Phase 1 data / mapping — COMPLETE

Still valid and must not be redone:

- `recipe_master.json`: **45 menus**.
- Thumbnail mapping: **45/45** in `assets/menu-thumbnail-map.css`.
- Atlas contract: **6×5**, **27 illustrated semantic regions**, **3 unused**.
- Four signature sets remain distinct.
- Semantic mapping guards remain in place.
- Production atlas: `assets/menu-thumbnails/semantic-atlas-v1.webp`.
- Atlas integrity gate still locks size **59,500 bytes** and SHA-256 `1976697397b1581091dc3936412ac9789256b6bd0210ef8afdeac6ac375cd9b4`.

Do not redo inventory / semantic mapping / atlas architecture unless `recipe_master.json` changes.

---

# REAL-DEVICE FEEDBACK IMPLEMENTATION STATUS

The real iPhone/Safari feedback superseded the older screenshot-only visual acceptance. Presentation corrections are implemented in dedicated visual layers and guarded by `qa/real-device-visual-contract.mjs`.

## P0-F1 — central card containment / character-safe rails

**IMPLEMENTED + QA VERIFIED**

- phone `#app-menus` is constrained to a deliberate central lane;
- menu cards paint above the edge character rails;
- all three character positions remain present.

## P0-F2 — thumbnail sharpness

**IMPLEMENTED + QA VERIFIED AT @3x SCREENSHOT SCALE; PHYSICAL SAFARI RECHECK STILL USEFUL**

- atlas semantic mapping is unchanged;
- phone thumbnails preserve the atlas cell **3:2** aspect ratio;
- normal thumbnails render at **66×44 CSS px**;
- signature thumbnails render at **72×48 CSS px**;
- the previous near-cell-size upscaling is no longer used.

## P0-F3 — character identity details

**IMPLEMENTED + QA VERIFIED**

Normal composition uses the higher-detail repo masters:

- `assets/ner-character-top-left.png`
- `assets/ner-character-bottom-left.png`
- `assets/ner-character-right.png`

Identity details restored through existing repo assets:

- `assets/accessory-gray-fullface-helmet.svg`
- `assets/accessory-white-backpack.svg`

Verified requirements remain:

- all 3 characters present;
- bottom-left **no-glasses**;
- helmet visible;
- white backpack visible;
- foreground remains non-interactive.

## P0-F4 — live UI fidelity to approved generated direction

**IN PROGRESS — TWO BOUNDED PHONE PASSES COMPLETE**

### Pass A — top-of-page hierarchy — COMPLETE

Commits:

- `00b2c26cc9e2fb5d87f7e0fbcc14ec2eb53c7608` — `Tighten mobile top-page visual hierarchy`
- `b36aee192eea2ffdb0f9d4f5cab1205a40c6cf70` — `Gate compact mobile hero hierarchy`

Verified result:

- masthead is the single visible brand anchor on phone;
- duplicate `.brand-title` inside phone hero is hidden presentation-only;
- hero is a compact utility strip aligned to the protected menu lane;
- Matrix behavior is unchanged but the action is a smaller secondary pill;
- menu content begins sooner without disturbing F1–F3.

### Pass B — category-header + menu-card rhythm — COMPLETE

Commits:

- `5c2fd4d20ae7b01bad02c4fb68937538c447d34f` — `Refine phone category scan hierarchy and card rhythm`
- `043d3252832f1695e7a7616463eee9ebc6a2bb25` — `Activate phone menu rhythm fidelity layer`
- `1fff42614b8c9c5b9f248a284d1cbd502d563d59` — `Gate phone category hierarchy and card rhythm`

Implementation:

- new presentation-only layer: `assets/visual-menu-rhythm.css`;
- category headers are compact section markers instead of card-like blocks;
- visible category tokens are semantic while the actual category/data grouping remains untouched:
  - food sets `🍲`
  - extra meats `🥩`
  - extra vegetables `🥬`
  - extra noodles `🍜`
  - additional menu `🥚`
  - snacks `🍟`
  - desserts `🍨`;
- normal cards use a compact **62px** bounded rhythm;
- four signature set cards retain a deliberate larger **74px** beat;
- normal/signature title scale remains differentiated;
- existing locked thumbnail dimensions are not changed.

Durable visual contract now verifies on Chromium + WebKit:

- seven visual category sections;
- seven distinct semantic tokens;
- legacy repeated bowl token is visually suppressed;
- bounded compact category-header height/type scale;
- menu row gap;
- normal-card height;
- signature-card height and deliberate height difference;
- card radius/title scale;
- all earlier lane / thumbnail / three-character / helmet / backpack / no-glasses / compact-hero contracts.

Latest screenshot evidence from artifact **10793544803** was manually inspected:

- `01-iphone-top.png` — signature set hierarchy + transition to extra meats;
- `02-iphone-mid.png` — dense extra-meat list remains readable and consistently spaced;
- `03-iphone-lower.png` — semantic vegetable/noodle headers are visibly distinct;
- `11-real-device-fidelity-menu@3x.png` — @3x list rendering remains crisp with the new rhythm.

Observed: scan hierarchy is materially clearer, cards remain inside the protected lane, and the phone list is more deliberate/compact without returning to the oversized rejected real-device state.

### P0-F4 remaining fidelity sections

Still open for bounded passes:

- character framing / background softness where needed;
- calculator visual hierarchy.

Do not solve visual fidelity by changing recipe/business behavior.

---

# DURABLE QA

`.github/workflows/ui-qa.yml` runs:

- atlas integrity validator;
- Chromium + WebKit UI QA;
- dedicated `qa/real-device-visual-contract.mjs` check;
- contact-sheet evidence;
- screenshot artifact upload.

Latest run **35965884635** passed every step:

- `Validate thumbnail contract and atlas integrity` — PASS
- `Run Chromium + WebKit UI QA` — PASS
- `Verify real-device visual fidelity contract` — PASS
- `Render thumbnail contact sheet evidence` — PASS
- `Upload screenshots` — PASS

Relevant real-device / fidelity commits:

- `aa58a02c9f051618649c327704b9652d81e49268` — Apply real-device visual fidelity corrections
- `6e2d6093a1bf55f6a356162d5b2ff779083be507` — Activate real-device visual correction layer
- `8221948d0c23122786426da5ea8ae6d44c83c36e` — Add real-device visual fidelity contract
- `e4b8d58da91c5788ea611cf0d730423d4db660bf` — Gate real-device visual fidelity in UI QA
- `2b180603ce63217040054b05c798ba797026ee87` — Fix normal thumbnail selector in real-device visual contract
- `00b2c26cc9e2fb5d87f7e0fbcc14ec2eb53c7608` — Tighten mobile top-page visual hierarchy
- `b36aee192eea2ffdb0f9d4f5cab1205a40c6cf70` — Gate compact mobile hero hierarchy
- `5c2fd4d20ae7b01bad02c4fb68937538c447d34f` — Refine phone category scan hierarchy and card rhythm
- `043d3252832f1695e7a7616463eee9ebc6a2bb25` — Activate phone menu rhythm fidelity layer
- `1fff42614b8c9c5b9f248a284d1cbd502d563d59` — Gate phone category hierarchy and card rhythm

Business logic changed by these correction/fidelity passes: **NO**.

---

# LOCKED BUSINESS / CHARACTER CONSTRAINTS

Do **not** intentionally change:

- recipe calculations or quantities;
- canonical recipe meaning;
- exclusion/replacement semantics;
- Matrix data logic;
- PIN behavior;
- unrelated import/export behavior.

For foreground composition:

- all **3 characters** remain present together in relevant states;
- top-left / bottom-left / right-side roles remain distinct;
- bottom-left does **not** wear glasses;
- helmet / white-backpack details remain visible where applicable;
- foreground remains `pointer-events:none` and must not block controls.

---

# DO NOT REPEAT

Do not restart or redo:

- repo-wide investigation;
- 45-menu inventory;
- semantic mapping architecture;
- atlas contract design;
- F1 central-lane fix;
- F2 thumbnail sizing/aspect-ratio correction;
- F3 character-master / helmet / backpack restoration;
- F4 phone masthead/hero/Matrix hierarchy pass;
- F4 phone category-header / menu-card rhythm pass;
- prior Matrix/PIN behavior validation;
- prior modal scroll-restoration investigation;
- prior QA harness scope repair.

---

# SHORT-SESSION WORKING RULE

Continue in short crash-safe sessions. Each session should:

1. recover current `main` minimally;
2. complete one bounded presentation task;
3. persist code/evidence/checkpoint;
4. report the exact **NEXT ACTION** before stopping.

---

# EXACT NEXT ACTION

**Next short session:** continue only **P0-F4** with **phone character framing + background softness**. Use the latest phone screenshots as evidence; tune only edge crop/scale/opacity/background contrast so all three people remain clearly present but behave as framing rather than competing with the protected menu lane. Preserve the high-detail character masters, bottom-left no-glasses, helmet/white-backpack details, central lane/card rhythm, thumbnail sizes, and all business behavior. Add/adjust a bounded visual contract if useful, run UI QA, inspect the phone screenshots, persist the checkpoint, then stop and report the next action.

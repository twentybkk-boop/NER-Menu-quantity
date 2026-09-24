# CURRENT HANDOFF — NER Menu Quantity

> **Crash-safe continuation checkpoint — DO NOT RESTART.**
>
> Highest source of truth: current GitHub `main` + actual code + `recipe_master.json`. If any SHA/run below becomes stale, current `main` wins.

## Repository / branch

- Repository: `twentybkk-boop/NER-Menu-quantity`
- Branch: `main`
- Real-device feedback source: `docs/UI_REAL_DEVICE_FEEDBACK_2026-09-24.md`
- Feedback commit: `3125910ec11fffbacb357c718647ada983836ae0`
- Latest verified implementation / QA HEAD before this handoff-only update: `b36aee192eea2ffdb0f9d4f5cab1205a40c6cf70`
- Latest verified UI QA run: **35965006176** — SUCCESS
- Latest screenshot artifact: **10793955895** (`ui-qa-screenshots`)
- Artifact digest: `sha256:83f588350d053bcadee51a83e0f4dd7d7f7a8e368069c1fa67f734cdc71b7e1a`

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

The real iPhone/Safari feedback superseded the older screenshot-only visual acceptance. Presentation corrections are implemented in `assets/visual-real-device.css` and guarded by `qa/real-device-visual-contract.mjs`.

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

**IN PROGRESS — TOP-OF-PAGE PHONE PASS COMPLETE**

Bounded fidelity pass completed in:

- `00b2c26cc9e2fb5d87f7e0fbcc14ec2eb53c7608` — `Tighten mobile top-page visual hierarchy`
- `b36aee192eea2ffdb0f9d4f5cab1205a40c6cf70` — `Gate compact mobile hero hierarchy`

Phone changes:

- masthead is now the single visible brand anchor;
- duplicate `.brand-title` inside the phone hero is hidden presentation-only;
- hero is a compact utility strip aligned to the protected menu lane;
- Matrix remains behaviorally unchanged but is rendered as a smaller secondary pill rather than a full-width primary CTA;
- menu content begins sooner without disturbing F1–F3 fixes.

Durable visual contract now verifies on both Chromium + WebKit:

- duplicate phone hero title is not displayed;
- compact hero height stays within the bounded acceptance limit;
- hero aligns with the protected menu lane;
- Matrix action stays below the bounded height and does not fill the hero width;
- existing lane / thumbnail / three-character / helmet / backpack / no-glasses contracts remain intact.

Latest screenshot evidence from artifact **10793955895** was manually inspected:

- `01-iphone-top.png`
- `10-real-device-fidelity-iphone@3x.png`

Observed: duplicate brand hierarchy is removed, Matrix visual dominance is materially reduced, and the phone top-to-menu transition is more compact while preserving the approved warm visual direction.

### P0-F4 remaining fidelity sections

Still open for bounded passes:

- category header treatment / semantic scan hierarchy;
- card proportions / spacing refinement;
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

Latest run **35965006176** passed every step:

- `Validate thumbnail contract and atlas integrity` — PASS
- `Run Chromium + WebKit UI QA` — PASS
- `Verify real-device visual fidelity contract` — PASS
- `Render thumbnail contact sheet evidence` — PASS
- `Upload screenshots` — PASS

Relevant real-device correction commits:

- `aa58a02c9f051618649c327704b9652d81e49268` — Apply real-device visual fidelity corrections
- `6e2d6093a1bf55f6a356162d5b2ff779083be507` — Activate real-device visual correction layer
- `8221948d0c23122786426da5ea8ae6d44c83c36e` — Add real-device visual fidelity contract
- `e4b8d58da91c5788ea611cf0d730423d4db660bf` — Gate real-device visual fidelity in UI QA
- `2b180603ce63217040054b05c798ba797026ee87` — Fix normal thumbnail selector in real-device visual contract
- `00b2c26cc9e2fb5d87f7e0fbcc14ec2eb53c7608` — Tighten mobile top-page visual hierarchy
- `b36aee192eea2ffdb0f9d4f5cab1205a40c6cf70` — Gate compact mobile hero hierarchy

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

**Next short session:** continue only **P0-F4** with the **phone category-header + menu-card visual rhythm**. Inspect how category headers/icons and card spacing compare to the approved generated direction; improve semantic scan hierarchy and spacing/proportions using presentation-only changes, while preserving the central lane, thumbnail dimensions/sharpness, all three character requirements, and all business behavior. Add/adjust a bounded visual contract if useful, run UI QA, inspect the resulting phone screenshot, persist the checkpoint, then stop and report the next action.

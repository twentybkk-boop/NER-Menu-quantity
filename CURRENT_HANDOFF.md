# CURRENT HANDOFF — NER Menu Quantity

> **Crash-safe continuation checkpoint — DO NOT RESTART.**
>
> Highest source of truth: current GitHub `main` + actual code + `recipe_master.json`. If any SHA/run below becomes stale, current `main` wins.

## Repository / branch

- Repository: `twentybkk-boop/NER-Menu-quantity`
- Branch: `main`
- Real-device feedback source: `docs/UI_REAL_DEVICE_FEEDBACK_2026-09-24.md`
- Feedback commit: `3125910ec11fffbacb357c718647ada983836ae0`
- Latest verified implementation / QA HEAD before this handoff-only update: `2b180603ce63217040054b05c798ba797026ee87`
- Latest verified UI QA run: **35963300224** — SUCCESS
- Latest screenshot artifact: **10793570124** (`ui-qa-screenshots`)
- Artifact digest: `sha256:6061011009820e156c39e577b2eba5ec8304d67fa4eda20273f7afc313bc3e98`

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

The real iPhone/Safari feedback superseded the older screenshot-only visual acceptance. A new presentation-only correction layer was implemented and is now covered by a dedicated visual contract.

## P0-F1 — central card containment / character-safe rails

**IMPLEMENTED + QA VERIFIED**

Implementation:

- `assets/visual-real-device.css`
- phone `#app-menus` is constrained to a deliberate central lane;
- menu cards paint above the edge character rails;
- all three character positions remain present.

Evidence from artifact `10793570124`:

- `10-real-device-fidelity-iphone@3x.png`
- `11-real-device-fidelity-menu@3x.png`

Observed: card stack remains inside the central reading lane and no longer uses the character rails as card background space.

## P0-F2 — thumbnail sharpness

**IMPLEMENTED + QA VERIFIED AT @3x SCREENSHOT SCALE; PHYSICAL SAFARI RECHECK STILL USEFUL**

Implementation:

- atlas semantic mapping is unchanged;
- phone thumbnails now preserve the atlas cell **3:2** aspect ratio;
- normal thumbnails render at **66×44 CSS px**;
- signature thumbnails render at **72×48 CSS px**;
- the previous near-cell-size upscaling is no longer used.

The dedicated real-device visual contract now checks thumbnail dimensions, aspect ratio, atlas activation, and crop geometry in Chromium + WebKit.

Latest @3x screenshots are visibly sharper than the real-device evidence that triggered the correction.

## P0-F3 — character identity details

**IMPLEMENTED + QA VERIFIED**

Normal composition now uses the higher-detail repo masters:

- `assets/ner-character-top-left.png`
- `assets/ner-character-bottom-left.png`
- `assets/ner-character-right.png`

Identity details restored through existing repo assets:

- `assets/accessory-gray-fullface-helmet.svg`
- `assets/accessory-white-backpack.svg`

Verified in `04-iphone-calculator.png` from artifact `10793570124`:

- all 3 characters remain present;
- bottom-left remains **no-glasses**;
- helmet is visible;
- white backpack is visible;
- character layer remains non-interactive / does not block calculator controls.

## P0-F4 — live UI fidelity to approved generated direction

**STILL OPEN — THIS IS THE NEXT PRESENTATION TASK**

Functional correctness is not enough. Continue comparing the live implementation against the approved generated visual direction by section:

- masthead / hero proportions;
- duplicate brand hierarchy;
- Matrix action visual weight;
- category header treatment;
- card proportions / spacing;
- character framing;
- background softness;
- calculator visual hierarchy.

Do not solve visual fidelity by changing recipe/business behavior.

---

# DURABLE QA

`.github/workflows/ui-qa.yml` now runs:

- atlas integrity validator;
- Chromium + WebKit UI QA;
- dedicated `qa/real-device-visual-contract.mjs` check;
- contact-sheet evidence;
- screenshot artifact upload.

Latest run **35963300224** passed every step, including:

- `Validate thumbnail contract and atlas integrity` — PASS
- `Run Chromium + WebKit UI QA` — PASS
- `Verify real-device visual fidelity contract` — PASS
- `Render thumbnail contact sheet evidence` — PASS
- `Upload screenshots` — PASS

Relevant commits in the real-device correction chain:

- `aa58a02c9f051618649c327704b9652d81e49268` — `Apply real-device visual fidelity corrections`
- `6e2d6093a1bf55f6a356162d5b2ff779083be507` — `Activate real-device visual correction layer`
- `8221948d0c23122786426da5ea8ae6d44c83c36e` — `Add real-device visual fidelity contract`
- `e4b8d58da91c5788ea611cf0d730423d4db660bf` — `Gate real-device visual fidelity in UI QA`
- `2b180603ce63217040054b05c798ba797026ee87` — `Fix normal thumbnail selector in real-device visual contract`

Business logic changed by this correction chain: **NO**.

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

**Next short session:** work only on **P0-F4 visual fidelity**, starting with the **top-of-page hierarchy on phone**: reduce duplicate masthead/hero meaning and reduce Matrix admin action visual dominance while preserving all behavior and existing character/card fixes. Compare the resulting phone screenshot against the approved generated visual direction, run the relevant UI QA, persist evidence, then stop and report the next bounded fidelity task.

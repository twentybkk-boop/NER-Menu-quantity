# CURRENT HANDOFF — NER Menu Quantity

> **Crash-safe continuation checkpoint — DO NOT RESTART.**
>
> Highest source of truth: current GitHub `main` + actual code + `recipe_master.json`. If any SHA/run below becomes stale, current `main` wins.

## Repository / branch

- Repository: `twentybkk-boop/NER-Menu-quantity`
- Branch: `main`
- Last fully verified automated/screenshot implementation HEAD before new real-device feedback: `7fbe6a3395052959351fd9b435b9b4d0bf1f7558`
- Previous final acceptance run: **35959886530** — SUCCESS
- Previous screenshot artifact: **10792165909** (`ui-qa-screenshots`)
- New real-device feedback commit: **`3125910ec11fffbacb357c718647ada983836ae0`** — `Record real-device UI feedback and visual fidelity acceptance`
- Durable feedback document: `docs/UI_REAL_DEVICE_FEEDBACK_2026-09-24.md`

---

# CURRENT STATUS

## Phase 1 — DATA / MAPPING COMPLETE, VISUAL SHARPNESS REOPENED

Completed and still valid:

- `recipe_master.json` inventory: **45 menus**.
- Thumbnail mapping: **45/45** in `assets/menu-thumbnail-map.css`.
- Atlas contract: **6×5**, **27 illustrated semantic regions**, **3 unused**.
- Four signature sets remain mapped to distinct regions.
- Semantic guards/corrections remain in place.
- Production atlas: `assets/menu-thumbnails/semantic-atlas-v1.webp`.
- Atlas integrity gate still locks size **59,500 bytes** and SHA-256 `1976697397b1581091dc3936412ac9789256b6bd0210ef8afdeac6ac375cd9b4`.

**Important:** real iPhone/Safari evidence shows the rendered food/menu images are visibly blurry. Therefore the earlier visual statement that the atlas was acceptable at rendered size is superseded. Do **not** redo menu inventory/mapping; investigate rendering/source resolution only.

## Phase 2 — FUNCTIONAL QA PASSED, VISUAL ACCEPTANCE REOPENED

Previous automated QA remains useful for regression coverage, but real-device visual evidence now reveals P0 presentation defects that were not proven by Playwright screenshots.

### Locked business constraints

Do **not** intentionally change:

- recipe calculations or quantities;
- canonical recipe meaning;
- exclusion/replacement semantics;
- Matrix data logic;
- PIN behavior;
- unrelated import/export behavior.

Presentation/assets/layout/responsive/typography/visual hierarchy may change.

### Locked character requirement

For every relevant state/page using foreground character composition:

- all **3 characters** must remain present together;
- top-left, bottom-left, and right-side positions remain conceptually distinct;
- bottom-left character must **not** wear glasses;
- helmet / white-backpack identity details must remain visible where applicable;
- foreground art remains `pointer-events:none` and must not block controls.

---

# NEW REAL-DEVICE P0 FEEDBACK — MUST FIX

Source: `docs/UI_REAL_DEVICE_FEEDBACK_2026-09-24.md`.

1. **Central card containment**
   - Menu cards must stay inside a deliberate central content frame.
   - Characters must frame the UI from edge rails rather than visually sitting underneath/inside the card reading area.

2. **Thumbnail sharpness**
   - Food/menu imagery is visibly blurry on real iPhone Safari.
   - Signature set images must be crisp at actual card size.
   - Do not accept low-resolution atlas upscaling if source detail is insufficient.

3. **Character detail fidelity**
   - Important identity details are missing in deployed composition.
   - Repo contains higher-detail character PNGs (`assets/ner-character-*.png`) plus accessory assets including `assets/accessory-gray-fullface-helmet.svg` and `assets/accessory-white-backpack.svg`.
   - Current foreground CSS uses very small `overlay-*.webp` assets; investigate/replace presentation source without changing business logic.

4. **Live UI fidelity to approved generated direction**
   - Functional correctness alone is insufficient.
   - Bring masthead/hero, content frame, category header, cards, character framing, background softness, and calculator presentation materially closer to the approved generated target.

Secondary review feedback (only after/supporting P0): reduce duplicated header meaning, reduce Matrix visual dominance, reduce repeated `ปรับวัตถุดิบ` noise, improve category scan hierarchy, reduce character/background competition, improve calculator hierarchy.

---

# DURABLE QA BASELINE

`.github/workflows/ui-qa.yml` remains the regression workflow:

- read-only permissions;
- atlas integrity validator;
- Chromium + WebKit UI QA;
- contact-sheet evidence;
- screenshot artifact upload.

Previous acceptance evidence:

- run **35959886530** — SUCCESS;
- artifact **10792165909**;
- 8 UI screenshots + `09-thumbnail-contact-sheet.png`.

This evidence is still valid for functional/regression coverage but **does not override new real-device visual defects**.

---

# DO NOT REPEAT

Do not restart or redo:

- repo-wide investigation;
- 45-menu inventory;
- semantic mapping architecture;
- atlas contract design;
- prior Matrix/PIN behavior validation;
- prior modal scroll-restoration investigation;
- prior QA harness scope repair.

Relevant prior commits:

- `d03c84c70720f9b6b6171f8e3401a8a372329201` — production atlas promotion
- `f79f3fa49344968a5d1e0b64482e4e1f6d349b43` — modal scroll restoration
- `efd03fc0f387c66d7c03c6a6a9800ff1f5c80d46` — durable QA viewport-scope fix
- `577feea897359ce256320baf54cc54bd64c2f521` — background content shielding
- `7aa6bb6f33f1a0bb44f2c4c74981108a9f65f388` — three-character calculator composition
- `0cb82b64be576891e374fc753cc322824cacf3a0` — atlas integrity gate
- `6801a9ff494a6756c7de823ef4b44737ecd93f49` — read-only durable UI QA
- `7fbe6a3395052959351fd9b435b9b4d0bf1f7558` — contact-sheet evidence
- `89d11bcf5093bdf28596f669fe2ff3cd6e2fdd0f` — previous final checkpoint
- `3125910ec11fffbacb357c718647ada983836ae0` — new real-device feedback record

Business logic changed by the feedback-recording session: **NO**.

---

# SHORT-SESSION WORKING RULE

Continue in short crash-safe sessions. Each session should:

1. recover current `main` minimally;
2. complete one bounded presentation task;
3. persist code/evidence/checkpoint;
4. report the exact **NEXT ACTION** before stopping.

---

# EXACT NEXT ACTION

**Next short session:** fix **P0-F1 central card containment / character-safe rails** on phone first, using presentation CSS only. Keep all three characters present, keep bottom-left no-glasses, and do not touch recipe/business logic. After the bounded CSS change, run/inspect the relevant UI QA evidence before moving to thumbnail sharpness.

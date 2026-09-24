# CURRENT HANDOFF — NER Menu Quantity

> **Crash-safe continuation checkpoint — DO NOT RESTART.**
>
> Source of truth: current GitHub `main` + actual code + `recipe_master.json`. If any SHA/run below is stale, current `main` wins.

## Repository

- Repo: `twentybkk-boop/NER-Menu-quantity`
- Branch: `main`
- Authoritative feedback: `docs/UI_REAL_DEVICE_FEEDBACK_2026-09-24_V2.md`
- Character source finding: `docs/UI_CHARACTER_SOURCE_FINDING_2026-09-24.md`

---

# ACCEPTANCE STATUS — OPEN

The earlier `READY FOR USER ACCEPTANCE` conclusion is superseded by the user's later iPhone recording + reference images.

Current P0 status:

- **P0-A — correct approved 3-character source/composition: ROOT CAUSE VERIFIED, IMPLEMENTATION NEXT**
- **P0-B — protected center-frame fidelity: OPEN**
- **P0-C — simple infographic thumbnails: IMPLEMENTED + QA VERIFIED**
- **P0-D — match approved illustrated/branded UI direction: OPEN**

Do not claim the visual workstream is complete until P0-A/B/D are implemented and re-accepted.

---

# PHASE 1 DATA / MAPPING

**COMPLETE — DO NOT REDO unless `recipe_master.json` changes.**

- 45 menus; semantic mapping 45/45.
- Existing atlas remains provenance/mapping evidence only.
- Live cards no longer use food-photo atlas crops.

---

# P0-C — INFOGRAPHIC THUMBNAILS

**DONE + VERIFIED**

- `assets/visual-thumbnail-infographic.css`
- live menu cards use simple semantic pictogram/infographic tiles;
- old food-photo atlas is not painted in live cards;
- signature sets remain distinct;
- recipe/business behavior unchanged.

Latest verified infographic QA before the character-inventory-only checkpoint:

- UI QA run `35970824863` — SUCCESS
- artifact `10795248940`

Do not redo P0-C.

---

# P0-A — CHARACTER SOURCE ROOT CAUSE

## Durable evidence

Character asset inventory was rendered by UI QA:

- run `35973449831` — SUCCESS
- artifact `10797496052`
- evidence image: `10-character-asset-contact-sheet.png`

The inventory compares the actual repository assets and proves the current production source choice is the problem.

## Current live source — NOT ACCEPTED

The normal-page composition currently paints:

- `assets/ner-character-top-left.png`
- `assets/ner-character-bottom-left.png`
- `assets/ner-character-right.png`

and then synthesizes missing identity details using:

- `assets/accessory-gray-fullface-helmet.svg`
- `assets/accessory-white-backpack.svg`

This technically creates three character nodes but does **not** preserve the complete approved story composition.

## Approved-composition source already in repo

The repo already contains the closer authoritative family:

- `assets/ner-team-bg.webp` — complete 3-person illustrated scene family;
- `assets/overlay-top-left.webp` — upper-left with drink + gesture + speech bubble;
- `assets/overlay-bottom-left.webp` — lower-left with helmet + cat/table + speech bubble + **no glasses**;
- `assets/overlay-right.webp` — right with backpack + clipboard + food/chalkboard + speech bubble.

This matches the user's reference intent materially better than the current `ner-character-*.png` + synthetic accessory approach.

Root-cause checkpoint commit:

- `58325237144a99188e483eadb2fa5d8d2bbcd1db` — `Record verified P0-A character source root cause`

## Acceptance for P0-A

Do not accept merely because three DOM nodes exist. Screenshot evidence must visibly preserve:

- upper-left: glasses + drink + gesture + speech bubble;
- lower-left: no-glasses + helmet + cat/table + speech bubble;
- right: white backpack + clipboard/pen + food/chalkboard + speech bubble.

All foreground art remains `pointer-events:none` and must not obstruct controls.

---

# LOCKED BUSINESS CONSTRAINTS

Do **not** intentionally change:

- recipe calculations or quantities;
- canonical recipe meaning;
- exclusion / replacement semantics;
- Matrix data logic;
- PIN behavior;
- unrelated import/export behavior.

Keep the newly accepted infographic thumbnails unchanged while doing P0-A.

---

# DO NOT REPEAT

Do not redo:

- repo-wide investigation;
- 45-menu inventory;
- atlas architecture / semantic mapping;
- infographic-thumbnail conversion;
- character asset inventory investigation;
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

**Next short session: implement P0-A only.**

1. Add a bounded presentation override that replaces the normal-page `ner-character-*.png` + synthetic accessory composition with the approved-composition `overlay-*.webp` family, or a higher-resolution derivative of the user's approved reference if needed for sharpness.
2. Preserve all three roles together and the story details listed above.
3. Keep P0-C infographic thumbnails and all business behavior unchanged.
4. Add/adjust a character-composition acceptance contract so QA checks the approved source family/story details rather than only three visible nodes.
5. Run Chromium + WebKit + live GitHub Pages QA, manually inspect screenshots, persist checkpoint, then stop.

Expected following NEXT ACTION after P0-A: **P0-B protected center-frame fidelity** unless new evidence changes priority.

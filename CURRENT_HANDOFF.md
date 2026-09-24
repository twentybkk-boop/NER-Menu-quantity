# CURRENT HANDOFF — NER Menu Quantity

> **Crash-safe continuation checkpoint — DO NOT RESTART.**
>
> Source of truth: current GitHub `main` + actual code + `recipe_master.json`. If any SHA/run below becomes stale, current `main` wins.

## Repository

- Repo: `twentybkk-boop/NER-Menu-quantity`
- Branch: `main`
- Authoritative feedback: `docs/UI_REAL_DEVICE_FEEDBACK_2026-09-24_V2.md`
- Character source finding: `docs/UI_CHARACTER_SOURCE_FINDING_2026-09-24.md`
- Latest verified implementation/QA HEAD before this handoff-only commit: `40f9992fdca1f66c9ca3ea0af29609d536182d68`
- Latest UI QA run: **35981031355 — SUCCESS**
- Latest screenshot artifact: **10800810003** (`ui-qa-screenshots`)
- Artifact digest: `sha256:abc239ab22130ef17b03435e2b0612d775ebd26481846ca10bbe995ddb0784e9`

---

# ACCEPTANCE STATUS — READY FOR FINAL USER ACCEPTANCE

The user's V2 feedback is now implemented and verified in repository/local QA + deployed GitHub Pages QA.

Current P0 status:

- **P0-A — approved 3-character source/composition: DONE + LOCAL/LIVE VERIFIED**
- **P0-B — protected center-frame fidelity: DONE + LOCAL/LIVE VERIFIED**
- **P0-C — simple infographic thumbnails: DONE + LOCAL/LIVE VERIFIED**
- **P0-D — approved illustrated/branded UI direction: DONE + LOCAL/LIVE VERIFIED**
  - top/first-screen composition V1: DONE
  - long-list/environmental rhythm V1: DONE

Do not add more presentation layers unless the user provides new real-device defect evidence.

---

# LOCKED VERIFIED VISUALS

## P0-A — approved character composition

Do not redo.

- `assets/overlay-top-left.webp`
- `assets/overlay-bottom-left.webp`
- `assets/overlay-right.webp`
- lower-left remains **no-glasses**.
- upper-left keeps glasses + drink + gesture + bubble.
- lower-left keeps helmet + cat/table + bubble.
- right keeps white backpack + clipboard/pen + food scene + bubble.
- all foreground art remains `pointer-events:none`.

Implementation / gates:

- `assets/visual-character-composition-v2.css`
- `qa/character-composition-v2-contract.mjs`
- `qa/live-pages-acceptance-v2.mjs`

## P0-B — protected center frame

Do not redo.

- `assets/visual-center-frame-v2.css`
- phone center frame: `width:min(300px,calc(100vw - 80px))`.
- ~300px reading lane at 390px viewport, leaving illustration rails.
- hero shares the same axis.
- lower illustration shelf protects lower-left/right story compositions from the scrolling list.

## P0-C — infographic thumbnails

Do not redo.

- `assets/visual-thumbnail-infographic.css`
- live menu cards do not paint food-photo atlas crops.
- pictogram/infographic tiles remain the accepted scan language.
- old atlas remains mapping/provenance evidence only.

---

# P0-D — APPROVED ILLUSTRATED / BRANDED DIRECTION

## Top / first-screen composition V1 — DONE

Implementation:

- `assets/visual-top-composition-v1.css`
- masthead is a soft illustrated/editorial panel.
- approved upper-left character participates in the brand moment without covering the NER wordmark.
- Matrix remains functional but visually secondary.
- first category has a bounded editorial/environmental treatment.
- verified ~300px center frame and infographic tiles are preserved.

Contract:

- `qa/top-composition-v1-contract.mjs`
- Chromium + WebKit local + deployed Pages.

## Long-list / environmental rhythm V1 — DONE

Implementation:

- `assets/visual-long-list-rhythm-v1.css`
- imported last from `assets/visual-polish.css`.
- applies only to categories after the verified first signature-set block.
- later categories use lightweight editorial chapter treatment rather than heavy outer cards:
  - subtle paper wash;
  - category-specific environmental glow/accent;
  - clearer rest interval between category chapters;
  - soft category-title plate;
  - calm 3px category accent on repeated rows;
  - infographic tiles remain dominant for fast scanning.
- cards remain inside the verified center frame.
- approved character sources and lower illustration shelf remain unchanged.

Relevant commits:

- `91fe2607df4e0d44bb89d93fecac5aca17889483` — `Extend P0-D editorial rhythm through long list`
- `56a21466e78869a8f6c09dd88f88c97350b38519` — `Activate P0-D long-list environmental rhythm`
- `b0e5000b1edc61634a53a64bdb53cf80c81e9723` — `Add P0-D long-list rhythm acceptance contract`
- `40f9992fdca1f66c9ca3ea0af29609d536182d68` — `Gate P0-D long-list rhythm in UI QA`

Durable QA:

- `qa/long-list-rhythm-v1-contract.mjs`
- verifies all 6 later category chapters, expected ordering, section wash/separator/title treatment, compact repeated-row rhythm, card containment in the protected center frame, and approved lower character sources.
- runs Chromium + WebKit locally and against deployed GitHub Pages.

Latest verification run **35981031355** — SUCCESS:

- base Chromium + WebKit UI QA — PASS
- P0-A complete character composition — PASS
- P0-B protected center frame — PASS
- P0-D top composition local — PASS
- **P0-D long-list rhythm local — PASS**
- calculator visual hierarchy — PASS
- deployed Pages P0-A/P0-B — PASS
- deployed Pages P0-D top composition — PASS
- **deployed Pages P0-D long-list rhythm — PASS**
- evidence uploads — PASS

Manual inspection from artifact **10800810003**:

- `25-long-list-mid-v1@3x.png`
- `26-long-list-lower-v1@3x.png`
- `27-live-long-list-mid-v1@3x.png`
- `28-live-long-list-lower-v1@3x.png`

Observed:

- local/live presentation matches;
- later categories read as chapters in the same illustrated NER environment rather than abruptly reverting to a generic utility list;
- category changes create visible rest points without becoming card soup;
- pictograms remain simple and scan-friendly;
- long rows remain calm and within the protected frame;
- lower-left/right approved character compositions remain on the illustration shelf.

---

# LOCKED BUSINESS CONSTRAINTS

Do **not** intentionally change:

- recipe calculations or quantities;
- canonical recipe meaning;
- exclusion/replacement semantics;
- Matrix data logic;
- PIN behavior;
- unrelated import/export behavior.

Business behavior changed by P0-A/B/C/D visual correction work: **NO**.

---

# DO NOT REPEAT

Do not redo without new evidence:

- repo-wide investigation;
- 45-menu inventory;
- semantic mapping / atlas architecture;
- infographic conversion;
- character asset inventory;
- P0-A character source/composition;
- P0-B center-frame geometry;
- P0-D top composition V1;
- P0-D long-list rhythm V1;
- Matrix/PIN functional investigation;
- modal scroll-restoration investigation.

---

# SHORT-SESSION RULE

Every continuation session must:

1. minimally read current `main` + this handoff;
2. complete one bounded task only when new evidence requires it;
3. persist code/evidence/checkpoint;
4. always report exact **NEXT ACTION** and stop.

---

# EXACT NEXT ACTION

**Final user acceptance / real-device spot check only.**

1. Open the deployed GitHub Pages site on the user's real iPhone/Safari.
2. Compare against the latest approved references, especially:
   - complete three-character story details;
   - ~300px protected center frame;
   - simple infographic thumbnails;
   - illustrated first-screen composition;
   - category rest rhythm through the long list.
3. If the user supplies a new screenshot/video defect, reproduce and fix **only that exact presentation defect**.
4. If no new defect is reported, there is **no pending repository implementation task** in this visual-correction workstream.

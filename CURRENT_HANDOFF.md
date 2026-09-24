# CURRENT HANDOFF — NER Menu Quantity

> **Crash-safe continuation checkpoint — DO NOT RESTART.**
>
> Highest source of truth: current GitHub `main` + actual code + `recipe_master.json`. If any SHA/run below becomes stale, current `main` wins.

## Repository / branch

- Repository: `twentybkk-boop/NER-Menu-quantity`
- Branch: `main`
- Latest authoritative real-device feedback: `docs/UI_REAL_DEVICE_FEEDBACK_2026-09-24_V2.md`
- V2 feedback commit: `52ed0e0d71e68cd9ad3e946aceae6d44a390b32c`
- Latest verified implementation / QA HEAD before this handoff-only update: `08fb5933110e9d03982c1ee4d4cb4de6861edbc6`
- Latest UI QA run: **35970824863 — SUCCESS**
- Latest screenshot artifact: **10795248940** (`ui-qa-screenshots`)
- Artifact digest: `sha256:c3fc2835bc567fd6dd36e507f8e34dc19043e669e5d8777ea49d076ff7f9218f`

---

# ACCEPTANCE STATUS — REOPENED

The previous `READY FOR USER ACCEPTANCE` conclusion is **superseded** by the user's later iPhone screen recording + three reference images reviewed on 2026-09-24.

Do not claim the visual workstream is complete until the new P0 items below are implemented and re-accepted.

Reference intent preserved in `docs/UI_REAL_DEVICE_FEEDBACK_2026-09-24_V2.md`:

1. use the **correct approved three-character composition with full identity/story details** rather than clipped/incomplete substitutes;
2. cards must visually stay inside the protected center frame indicated by the user's red-box reference, not merely satisfy a loose numeric lane assertion;
3. imagery must not look blurred/weak on real device;
4. live UI should materially resemble the approved illustrated/branded reference direction;
5. live menu thumbnails should use **simple infographic/pictogram visuals**, not visually noisy food-photo crops.

---

# PHASE 1 DATA / SEMANTIC MAPPING

**COMPLETE — DO NOT REDO unless `recipe_master.json` changes.**

- 45 menus; semantic mapping 45/45.
- Existing atlas: `assets/menu-thumbnails/semantic-atlas-v1.webp`.
- Atlas remains durable semantic/provenance evidence: 6×5, 27 illustrated semantic regions, 3 unused.
- Integrity gate remains 59,500 bytes / SHA-256 `1976697397b1581091dc3936412ac9789256b6bd0210ef8afdeac6ac375cd9b4`.
- **Important:** the atlas is no longer the approved live-card painting strategy. It remains provenance/mapping data only.

---

# NEW P0 ACCEPTANCE WORKSTREAM

## P0-A — correct approved 3-character source/composition

**OPEN**

The current repo still paints these assets:

- `assets/ner-character-top-left.png`
- `assets/ner-character-bottom-left.png`
- `assets/ner-character-right.png`
- accessory overlays for gray full-face helmet / white backpack.

Earlier QA proved that three DOM roles and accessory assets exist, but the user's latest reference shows that this is **not sufficient**. On the real device the characters read as clipped fragments and do not preserve the complete approved composition/story.

Acceptance target from reference image 1:

- upper-left: glasses + drink + pose/gesture + speech-bubble/story detail;
- lower-left: **no glasses** + helmet + cat/table scene + speech-bubble/story detail;
- right: white backpack + clipboard/pen + pot/scene + speech-bubble/story detail.

Do not fake acceptance by merely increasing crop size or checking three DOM nodes.

## P0-B — protected center-frame fidelity

**OPEN**

Existing numeric center-lane protection remains useful but is no longer final acceptance. The user's red-box reference requires a visibly deliberate central reading frame while scrolling, with left/right illustration rails clearly separate from card content.

Do not mark complete until screenshot comparison against that visual intent is satisfactory.

## P0-C — simple infographic thumbnails

**IMPLEMENTED + LOCAL QA + LIVE GITHUB PAGES QA VERIFIED**

Implementation:

- `assets/visual-thumbnail-infographic.css`
- activated through `assets/visual-polish.css`

Behavior:

- live menu cards no longer paint `semantic-atlas-v1.webp` food-photo crops;
- cards use soft semantic infographic/pictogram tiles instead;
- signature sets remain distinct;
- pork / beef / seafood / vegetables / noodles / tofu / egg / rice / snacks / desserts use simple semantic visual language;
- old atlas mapping stays in repo only for provenance/semantic mapping.

Relevant commits:

- `3ffd1a94d348ee491ecbae9b45a205de4bf4b4c2` — replace noisy food thumbnails with simple infographic tiles
- `a8aa98bb7b330bcb893124bc041ab578a311db93` — activate infographic layer
- `28e0307b8543212cba25ae73b2d582b55dd829c1` — update real-device visual contract
- `d8312401af056cb007ff5f599ccdcf34f873a86d` — update live Pages acceptance
- `9b31ae31018800e9762dded159a600457a20925b` — compatibility runner for legacy functional QA without rewriting the PIN-bearing harness
- `ce436dd9e9ea9d33d1d057dc6392dd4e84050e47` — route workflow through compatibility runner
- `08fb5933110e9d03982c1ee4d4cb4de6861edbc6` — ensure exact signature pictograms win over generic fallbacks

Durable QA now explicitly rejects reintroducing the photo atlas into live cards.

Latest run **35970824863** passed all steps:

- atlas/provenance integrity validator — PASS
- Chromium + WebKit functional UI QA — PASS
- real-device visual contract — PASS
- calculator hierarchy contract — PASS
- deployed GitHub Pages acceptance — PASS
- contact sheet evidence — PASS
- screenshot upload — PASS

Manual inspection of artifact **10795248940**:

- `01-iphone-top.png`: signature sets now use calm simple pictograms rather than food photos;
- `02-iphone-mid.png`: long meat list is materially less visually noisy;
- `03-iphone-lower.png`: seafood/vegetable/noodle sections use clear semantic tile families;
- `13-live-pages-iphone@3x.png`: deployed GitHub Pages is actually serving the infographic treatment.

Business / recipe behavior changed by P0-C: **NO**.

## P0-D — match approved illustrated/branded UI direction

**OPEN**

The current live page remains structurally more utility/list-like than the approved reference image 3. Do not declare this complete based only on compact hierarchy/card rhythm checks. Future passes must use the approved art direction as the comparison target while preserving business behavior.

---

# QA / SAFETY NOTES

`.github/workflows/ui-qa.yml` currently runs:

- atlas/provenance integrity validation;
- `qa/ui-qa-runner.mjs`, which applies only an ephemeral thumbnail-assertion compatibility patch to the legacy functional harness;
- `qa/real-device-visual-contract.mjs`;
- `qa/calculator-visual-contract.mjs`;
- `qa/live-pages-acceptance.mjs`;
- contact-sheet evidence;
- screenshot artifact upload.

`qa/ui-qa.mjs` still contains the legacy manager/PIN regression path. Do not wholesale rewrite/transmit that file merely to change presentation assertions; use narrow, intentional compatibility changes unless a real functional bug requires otherwise.

---

# LOCKED BUSINESS CONSTRAINTS

Do **not** intentionally change:

- recipe calculations or quantities;
- canonical recipe meaning;
- exclusion / replacement semantics;
- Matrix data logic;
- PIN behavior;
- unrelated import / export behavior.

Character constraints remain:

- all three roles together in relevant states;
- lower-left remains **no-glasses**;
- foreground remains non-interactive / `pointer-events:none`;
- presentation must not obstruct controls.

---

# DO NOT REPEAT

Do not redo:

- repo-wide investigation;
- 45-menu inventory;
- semantic mapping architecture;
- atlas generation/integrity work;
- P0-C infographic-thumbnail conversion;
- previous calculator/Matrix/PIN behavior validation;
- modal scroll-restoration investigation.

Earlier claims that F1/F3/F4 were fully accepted are stale where they conflict with V2 real-device/reference evidence.

---

# SHORT-SESSION RULE

Each session:

1. minimally recover current `main`;
2. complete one bounded task;
3. persist code + QA evidence + checkpoint;
4. report exact **NEXT ACTION** and stop.

---

# EXACT NEXT ACTION

**Next short session: P0-A only — correct approved 3-character source/composition.**

1. Inspect the actual repo character/background asset inventory and compare what is currently painted to the user's approved reference image 1.
2. Determine whether the complete approved character/story artwork already exists in the repository; reuse it if present.
3. If current assets are only incomplete crops/substitutes, do not pretend they are correct. Replace/recompose the presentation using the closest authoritative existing artwork available, preserving upper-left glasses/drink/gesture, lower-left no-glasses + helmet + cat/table scene, and right white-backpack + clipboard/food-scene details.
4. Keep the newly verified infographic thumbnails unchanged.
5. Add a bounded character-composition acceptance check, run Chromium + WebKit + live Pages QA, manually inspect screenshots, persist checkpoint, then stop and report the following NEXT ACTION (expected P0-B center-frame fidelity unless new evidence changes priority).

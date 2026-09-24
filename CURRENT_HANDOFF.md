# CURRENT HANDOFF — NER Menu Quantity

> **Crash-safe continuation checkpoint — DO NOT RESTART.**
>
> Highest source of truth: current GitHub `main` + actual code + `recipe_master.json`. If any SHA/run below becomes stale, current `main` wins.

## Repository / branch

- Repository: `twentybkk-boop/NER-Menu-quantity`
- Branch: `main`
- Latest verified implementation / QA HEAD before this handoff-only commit: `7fbe6a3395052959351fd9b435b9b4d0bf1f7558`
- Commit: `Persist contact sheet visual evidence in UI QA`
- Final acceptance run: **35959886530** — SUCCESS
- Final screenshot artifact: **10792165909** (`ui-qa-screenshots`)
- Artifact includes 8 required UI screenshots + `09-thumbnail-contact-sheet.png`.

This handoff update is documentation-only and is intentionally outside the UI QA path filter. Current `main` after this commit is the continuation source of truth.

---

# FINAL VERIFIED STATUS

## Phase 1 — COMPLETE

- Real menu inventory from `recipe_master.json`: **45 menus**.
- Exact current-menu thumbnail mapping: **45/45 = 100%**.
- Central mapping: `assets/menu-thumbnail-map.css`.
- Contact sheet: `docs/UI_THUMBNAIL_CONTACT_SHEET.html`.
- Validator: `scripts/validate_thumbnail_assets.py`.
- Atlas contract: **6×5**, **27 illustrated semantic regions**, **3 unused cells**.
- Four signature sets use distinct regions:
  - `ชุดจุ่มหมูทะเล`
  - `ชุดจุ่มเนื้อ`
  - `ชุดจุ่มหมู`
  - `ชุดจุ่มเดี่ยวหมู`
- Semantic guards/corrections remain in place for cabbage, ready-to-eat hotpot, tofu-skin vs tofu, calamari, banana samosa, `ลอยแก้ว`, and mochi.
- No unsafe universal `unknown -> generic pot` fallback.
- Production atlas: `assets/menu-thumbnails/semantic-atlas-v1.webp`.
- Verified production atlas size: **59,500 bytes**.
- Verified production atlas SHA-256: **`1976697397b1581091dc3936412ac9789256b6bd0210ef8afdeac6ac375cd9b4`**.
- Integrity is now a durable validator gate: wrong size or SHA fails CI.
- Temporary `tmp/ui-atlas/part-*.b64` staging is gone.
- Production atlas promotion originally landed at `d03c84c70720f9b6b6171f8e3401a8a372329201` (`Install verified generated thumbnail atlas [skip ci]`).
- Phase 1 acceptance was hardened with durable integrity gating at `0cb82b64be576891e374fc753cc322824cacf3a0`.

### Contact-sheet visual acceptance

`09-thumbnail-contact-sheet.png` from final artifact **10792165909** was inspected manually after promotion.

Observed:

- 27/27 illustrated regions render.
- Style/crop/color treatment is cohesive.
- Four signature set images remain distinguishable.
- Pork / beef / organ / shrimp / squid / fish / seafood regions are recognizable.
- Leafy vegetable / cabbage / noodles / tofu / tofu-skin / egg / rice regions are semantically distinct.
- Fried-bites / calamari / banana-samosa / loy-kaew / mochi / ready-to-eat regions are recognizable and not obviously mismatched.
- No atlas regeneration is justified by current evidence.

---

## Phase 2 — VERIFIED AUTOMATED + SCREENSHOT ACCEPTANCE

Presentation-only work is integrated; recipe/business semantics were not intentionally changed.

### Layer / background / brand

- `assets/background-master.webp` remains the real background artwork.
- `assets/visual-background.css` now shields the primary content zone strongly enough that the embedded background brand/text no longer creates a duplicate blurry NER logo behind UI content.
- Illustrated background remains visible toward the edges, especially on iPad landscape.
- Hero hierarchy is readable on phone, iPad portrait, and iPad landscape.

### Foreground characters — locked requirement

All three independent character layers remain present:

- `assets/overlay-top-left.webp`
- `assets/overlay-bottom-left.webp`
- `assets/overlay-right.webp`

Verified from final screenshots:

- all 3 characters are simultaneously visible at top/mid/lower page states;
- calculator modal now reserves illustration rails so all 3 remain visible while the modal is open;
- characters do not cover calculator controls in the final phone modal screenshot;
- bottom-left character is the **no-glasses** version;
- foreground remains non-interactive (`pointer-events:none`) through the existing layer contract.

### Responsive / UI behavior

Final automated QA covers:

- Chromium + WebKit;
- `390×844` iPhone portrait;
- `820×1180` iPad portrait;
- `1180×820` iPad landscape;
- no horizontal overflow;
- background / foreground asset activation;
- exactly three foreground character blocks in the normal page state;
- semantic thumbnails resolve;
- 4 signature regions are distinct;
- menu open;
- calculator open / close;
- exclusion state;
- replacement affordance / disabled replacement behavior when fixture provides it;
- final result row reachability;
- page scroll restoration after modal close;
- Matrix / PIN path;
- Matrix horizontal scroll;
- JSON download;
- orientation reflow.

### Final screenshot visual inspection

Artifact **10792165909** contains and the session inspected:

1. `01-iphone-top.png`
2. `02-iphone-mid.png`
3. `03-iphone-lower.png`
4. `04-iphone-calculator.png`
5. `05-ipad-portrait-top.png`
6. `06-ipad-portrait-mid.png`
7. `07-ipad-landscape-top.png`
8. `08-ipad-landscape-mid.png`
9. `09-thumbnail-contact-sheet.png`

Visual result at the verified checkpoint:

- duplicate/blurry central background branding removed from the readable content zone;
- cards and thumbnails are legible at actual rendered size;
- set cards retain stronger visual prominence;
- all three foreground people remain visible in the required captured states;
- bottom-left has no glasses;
- calculator modal composition keeps controls readable and leaves the three characters visible around the modal;
- iPad portrait hero no longer collapses into an over-wrapped title;
- iPad landscape uses the wider illustrated composition without stretching the phone layout;
- no obvious semantic thumbnail mismatch was found in the final contact sheet.

---

# DURABLE QA / CLEANUP STATE

`.github/workflows/ui-qa.yml` is now a normal durable **UI QA** workflow, not a temporary asset-persistence workflow.

- permissions: `contents: read`;
- no runtime source repair step remains;
- no workflow commit/push step remains;
- no atlas hydration / Base64 promotion step remains;
- it runs the durable atlas integrity validator;
- it runs Chromium + WebKit UI QA;
- it renders contact-sheet evidence;
- it uploads screenshot evidence.

The earlier QA harness scope bug (`innerWidth` / `innerHeight` referenced in Node scope) was fixed durably in `qa/ui-qa.mjs` at:

- `efd03fc0f387c66d7c03c6a6a9800ff1f5c80d46`
- `Fix viewport scope in durable UI QA [skip ci]`

No temporary atlas staging remains on `main`.

---

# FINAL ACCEPTANCE EVIDENCE

Final run on verified implementation HEAD:

- Run: **35959886530**
- Conclusion: **SUCCESS**
- Thumbnail + atlas integrity gate: PASS
- Chromium + WebKit UI QA: PASS
- Contact sheet render / 27-region count: PASS
- Screenshot upload: PASS
- Artifact: **10792165909**
- Artifact digest: `sha256:a7631097d3bc1984a8234373bb3de38a800ed802e2a67f33d2420ff236acc4b2`

Previous clean acceptance run before contact-sheet evidence was added:

- Run: **35959395652** — SUCCESS
- Artifact: **10790854083**

---

# CONTINUATION SESSION COMMITS

The session first observed atlas-promotion-era `main` at `d03c84c70720f9b6b6171f8e3401a8a372329201`; `main` then advanced concurrently to `1a5c25d81e735080579d12c6603f99cb08bc4245` before the first write in this continuation. Current GitHub always wins.

Commits created by this continuation after recovering current state:

- `e3385020522c1136df2efda9a8401f4a0a8985cc` — Repair durable UI QA harness without exposing test PIN
- `efd03fc0f387c66d7c03c6a6a9800ff1f5c80d46` — Fix viewport scope in durable UI QA [skip ci]
- `577feea897359ce256320baf54cc54bd64c2f521` — Shield primary content from embedded background branding
- `7aa6bb6f33f1a0bb44f2c4c74981108a9f65f388` — Keep all three characters visible around calculator modal
- `0cb82b64be576891e374fc753cc322824cacf3a0` — Lock verified production atlas integrity gate
- `6801a9ff494a6756c7de823ef4b44737ecd93f49` — Finalize durable read-only UI QA workflow
- `7fbe6a3395052959351fd9b435b9b4d0bf1f7558` — Persist contact sheet visual evidence in UI QA

Business logic changed by this continuation: **NO**.

Files intentionally changed in this continuation:

- `qa/ui-qa.mjs`
- `assets/visual-background.css`
- `assets/visual-responsive.css`
- `scripts/validate_thumbnail_assets.py`
- `.github/workflows/ui-qa.yml`
- `CURRENT_HANDOFF.md` (this final checkpoint)

---

# REMAINING HUMAN / REAL-DEVICE CHECK

No known repository blocker remains from the requested Phase 1 / Phase 2 stream.

The only useful remaining validation is a physical-device spot check on real Safari/iPhone/iPad hardware for browser chrome / Dynamic Island / bottom-toolbar appearance and touch feel. This cannot be proven by GitHub-hosted Playwright screenshots alone.

If a real-device discrepancy is found, capture the exact viewport/state and fix only that evidenced presentation defect; rerun `UI QA` and reinspect the generated screenshots.

---

# EXACT NEXT ACTION IF THIS PROJECT IS RESUMED

1. Read current `main` and this file; do not restart or redo the completed inventory/atlas/architecture work.
2. If there is **new real-device defect evidence**, reproduce only that exact state and fix the owning presentation layer.
3. If `recipe_master.json` changes, rerun the inventory/mapping validator and update only affected mappings/assets.
4. Otherwise, there is no pending repository implementation task in this workstream.

Do not change recipe calculations, quantities, canonical recipe semantics, exclusion/replacement semantics, Matrix data logic, PIN behavior, or unrelated import/export behavior without new bug evidence.

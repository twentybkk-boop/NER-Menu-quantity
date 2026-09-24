# CURRENT HANDOFF — NER Menu Quantity

> Crash-safe continuation checkpoint. **DO NOT RESTART THE PROJECT.**
> GitHub current `main` + actual code + `recipe_master.json` are the highest source of truth. If any SHA/status in this file becomes stale, current `main` wins.

## Repository / branch

- Repository: `twentybkk-boop/NER-Menu-quantity`
- Expected branch: `main`
- Checkpoint base HEAD before this handoff file: `445ad3026d43108f234d10450535606e7c2f78f0`
- Checkpoint commit message: `Hydrate and verify generated thumbnail atlas in UI QA`
- Original Phase 1 work started from the repo state documented in `docs/UI_THUMBNAIL_ASSET_MAP.md` (`a9b26e4768972de59fd6a1ac9e1aa0fccf0077ea`).

## Non-negotiable constraints

Do **not** change recipe/business semantics unless there is new bug evidence:

- recipe calculations / quantities
- canonical recipe meaning
- exclusion semantics
- replacement semantics
- Matrix data logic
- PIN behavior
- import/export behavior unrelated to UI

Presentation/assets/layout/responsive/typography/visual hierarchy may be changed.

## Locked visual requirement from real-device review

Every UI state/page that uses the foreground character composition must show **all 3 people together**:

1. top-left character
2. bottom-left character
3. right-side character

The **bottom-left character must NOT wear glasses**.

Foreground art must remain `pointer-events:none`, must never block tap/click, and must not cover menu names, thumbnails, subtitles, arrows, buttons, or form controls.

---

# Completed durable work

## Phase 1 — inventory / semantic thumbnail system

Completed and persisted on `main`:

- Real menu inventory derived from `recipe_master.json`: **45 menus**.
- Exact mapping coverage: **45/45 = 100%**.
- Centralized semantic mapping: `assets/menu-thumbnail-map.css`.
- Durable mapping report: `docs/UI_THUMBNAIL_ASSET_MAP.md`.
- Durable browser contact sheet: `docs/UI_THUMBNAIL_CONTACT_SHEET.html`.
- Validation script: `scripts/validate_thumbnail_assets.py`.
- Four signature sets are mapped to distinct regions/artwork:
  - `ชุดจุ่มหมูทะเล`
  - `ชุดจุ่มเนื้อ`
  - `ชุดจุ่มหมู`
  - `ชุดจุ่มเดี่ยวหมู`
- Semantic mismatch guards were added for the reviewed problem cases, including cabbage, ready-to-eat hotpot, tofu-skin vs tofu, calamari vs generic fried food, banana samosa, `ลอยแก้ว`, and mochi.
- Universal generic-pot fallback is intentionally not used for all unknown items; semantic keyword fallback is used where safe.

The currently committed mapping contract uses a **6×5 atlas / 27 illustrated semantic regions** with 3 unused cells.

## Phase 2 — presentation/UI work already integrated

The following presentation-layer work is already in the repository and should **not be restarted**:

- Background master integrated as real visual identity artwork.
- Foreground team art split into three independent assets/layers:
  - `assets/overlay-top-left.webp`
  - `assets/overlay-bottom-left.webp`
  - `assets/overlay-right.webp`
- Additional character source assets are present under `assets/ner-character-*.png`.
- Intentional layer architecture is implemented in `assets/visual-core.css`.
- Responsive tuning is implemented in `assets/visual-responsive.css` for phone, iPad portrait, and iPad landscape/wide layouts.
- Modal/UI refinements are implemented in `assets/visual-modal.css`.
- `assets/visual-polish.css` imports the thumbnail map + visual layers.
- Safe-area handling is present for `env(safe-area-inset-top)` / `env(safe-area-inset-bottom)`.
- Menu cards use the semantic thumbnail atlas and larger thumbnail regions.
- Calculator/Matrix responsive work is present.
- Modal page-scroll preservation regression was fixed and persisted by commit:
  - `f79f3fa49344968a5d1e0b64482e4e1f6d349b43`
  - message: `Preserve page scroll across modal lifecycle [skip ci]`

## Last fully passing automated UI QA checkpoint

GitHub Actions run:

- Run ID: **35951516719**
- Result: **PASS**
- Chromium + WebKit
- Viewports:
  - `390x844`
  - `820x1180`
  - `1180x820`
- Thumbnail validator passed at that checkpoint: `45/45 (100%)`, four signature regions unique, semantic correction gates pass, semantic mismatch guards pass.
- Screenshot artifact ID: **10788862475** (`ui-qa-screenshots`)
- The run tested the scroll-lock patch before persisting it, then pushed commit `f79f3fa...`.

This passing run is a regression baseline. Do not throw it away or redo the whole investigation.

---

# Current in-progress checkpoint — generated food atlas replacement

A newer generated/cohesive food atlas was being transferred into GitHub in crash-safe base64 chunks because direct binary transfer was timing out.

Temporary staging directory on `main`:

`tmp/ui-atlas/`

Staged parts are `part-00.b64` through `part-08.b64` (all nine parts are now present). They reconstruct a WebP with:

- decoded size: **59,500 bytes**
- actual SHA-256 from GitHub Actions reconstruction: **`1976697397b1581091dc3936412ac9789256b6bd0210ef8afdeac6ac375cd9b4`**

Commit `445ad302...` modified `.github/workflows/ui-qa.yml` to hydrate those chunks into:

`assets/menu-thumbnails/semantic-atlas-v1.webp`

and, after successful QA, persist the verified WebP and delete `tmp/ui-atlas/part-*.b64`.

## Current blocker (small and precisely known)

Latest run:

- Run ID: **35957057305**
- Result: **FAILURE**
- Failure step: `Hydrate generated thumbnail atlas`

The reconstructed bytes are correct and produced this actual hash:

`1976697397b1581091dc3936412ac9789256b6bd0210ef8afdeac6ac375cd9b4`

But the workflow currently asserts the stale/wrong expected hash:

`f54f62191d6da7e9f49130db644506e3dd32e9abf78731010a2fb866c7886cd9`

Therefore the workflow exits before Playwright/validator/UI QA. **Do not regenerate the atlas just because this run failed.** The immediate issue is the expected SHA value in the temporary QA workflow.

---

# EXACT NEXT ACTION

Continue from current `main`; do not redo inventory, taxonomy, architecture audit, or earlier visual investigation.

1. Re-check current `main` HEAD. If newer than this handoff, current GitHub wins.
2. Open `.github/workflows/ui-qa.yml`.
3. In `Hydrate generated thumbnail atlas`, replace the stale expected SHA
   `f54f62191d6da7e9f49130db644506e3dd32e9abf78731010a2fb866c7886cd9`
   with the verified actual SHA
   `1976697397b1581091dc3936412ac9789256b6bd0210ef8afdeac6ac375cd9b4`.
4. Keep the decoded-size gate at **59,500 bytes**.
5. Trigger/re-run QA.
6. Require all of these before accepting the generated atlas:
   - hydrate hash/size pass
   - `python scripts/validate_thumbnail_assets.py` pass
   - Chromium pass at 390×844, 820×1180, 1180×820
   - WebKit pass at the same three viewports
   - menu open / calculator open-close / scroll preservation pass
   - Matrix/PIN/admin regression pass
   - screenshots uploaded
7. If QA passes, confirm the workflow-created commit `Install verified generated thumbnail atlas [skip ci]` (or equivalent) is actually on `main` and that `tmp/ui-atlas/part-*.b64` has been removed.
8. Inspect the new screenshots visually. Automated pass alone is not final visual acceptance.
9. Continue Phase 2 visual iteration from those screenshots, especially the locked 3-character composition and bottom-left-without-glasses requirement.
10. Before final project acceptance, remove temporary QA/staging clutter that is no longer needed, while keeping useful durable validation/tests.

---

# Required visual QA still to finish

Final acceptance still requires actual inspection of at least:

1. iPhone top
2. iPhone mid-scroll
3. iPhone lower-scroll
4. iPhone calculator modal
5. iPad portrait top
6. iPad portrait mid-scroll
7. iPad landscape top
8. iPad landscape mid-scroll

Check brand hierarchy, thumbnail recognizability, all-three-character presence, bottom-left no glasses, foreground overlap, safe areas, modal proportions, lower-list scroll states, and visual cohesion.

Real-device human checks on iPhone/iPad are still required after browser automation.

---

# Files that matter most for continuation

- `index.html`
- `recipe_master.json` — business source of truth; do not change semantics casually
- `assets/menu-thumbnail-map.css`
- `assets/menu-thumbnails/semantic-atlas-v1.webp`
- `assets/background-master.webp`
- `assets/overlay-top-left.webp`
- `assets/overlay-bottom-left.webp`
- `assets/overlay-right.webp`
- `assets/visual-core.css`
- `assets/visual-modal.css`
- `assets/visual-responsive.css`
- `assets/visual-polish.css`
- `docs/UI_THUMBNAIL_ASSET_MAP.md`
- `docs/UI_THUMBNAIL_CONTACT_SHEET.html`
- `scripts/validate_thumbnail_assets.py`
- `qa/ui-qa.mjs`
- `.github/workflows/ui-qa.yml` (temporary QA workflow; currently contains the stale SHA gate described above)
- `tmp/ui-atlas/part-*.b64` (temporary staging only; remove after verified install)

## Recovery-only branches

The following temporary branches were created during timeout recovery and are **not** source of truth:

- `tmp-ui-fix-upload`
- `tmp-ui-fix-upload2`
- `tmp-atlas-checkpoint`

Use `main` only unless there is a specific recovery reason.

---

# What NOT to redo

- Do not perform a repo-wide architecture audit again.
- Do not rebuild the 45-menu inventory from scratch unless `recipe_master.json` changed.
- Do not redesign the semantic taxonomy from scratch without new data evidence.
- Do not replace business logic while fixing visual QA.
- Do not treat the failed run `35957057305` as an atlas-generation failure; it is currently a **hash-expectation mismatch in the temporary workflow**.
- Do not drop the proven scroll-preservation fix.

## Business logic changed by this UI/asset stream

**NO intentional recipe/business-logic change.** Work in this stream is presentation/assets/responsive/QA plus the modal scroll-lifecycle regression fix.

# CURRENT HANDOFF — NER Menu Quantity

> **Crash-safe continuation checkpoint — DO NOT RESTART.**
>
> Highest source of truth: current GitHub `main` + actual code + `recipe_master.json`. If any SHA/run below becomes stale, current `main` wins.

## Repository / branch

- Repository: `twentybkk-boop/NER-Menu-quantity`
- Branch: `main`
- Latest known code/workflow commit before this handoff update: `f5950085f37101f10a10eb4b3294b92b76306291`
- Message: `Restore temporary QA edits before verified atlas rebase`
- Original Phase 1 work began from the repo state documented in `docs/UI_THUMBNAIL_ASSET_MAP.md` (`a9b26e4768972de59fd6a1ac9e1aa0fccf0077ea`).

---

# NON-NEGOTIABLE CONSTRAINTS

Do **not** change recipe/business semantics without new bug evidence:

- recipe calculations / quantities
- canonical recipe meaning
- exclusion semantics
- replacement semantics
- Matrix data logic
- PIN behavior
- unrelated import/export behavior

Presentation/assets/layout/responsive/typography/visual hierarchy may be changed.

## Locked visual requirement from real-device review

Every state/page using the foreground character composition must show **all 3 people together**:

1. top-left character
2. bottom-left character
3. right-side character

The **bottom-left character must NOT wear glasses**.

Foreground art must remain `pointer-events:none`, must never block tap/click, and must not cover menu names, thumbnails, subtitles, arrows, buttons, or form controls.

---

# COMPLETED DURABLE WORK

## Phase 1 — inventory / semantic thumbnail contract

Completed and persisted; **do not rebuild from scratch** unless `recipe_master.json` changes:

- Real menu inventory from `recipe_master.json`: **45 menus**.
- Exact current-menu mapping coverage: **45/45 = 100%**.
- Centralized mapping: `assets/menu-thumbnail-map.css`.
- Durable map/report: `docs/UI_THUMBNAIL_ASSET_MAP.md`.
- Browser contact sheet: `docs/UI_THUMBNAIL_CONTACT_SHEET.html`.
- Validator: `scripts/validate_thumbnail_assets.py`.
- Atlas contract: **6×5 / 27 illustrated semantic regions / 3 unused cells**.
- Four signature sets have distinct regions:
  - `ชุดจุ่มหมูทะเล`
  - `ชุดจุ่มเนื้อ`
  - `ชุดจุ่มหมู`
  - `ชุดจุ่มเดี่ยวหมู`
- Semantic mismatch guards/corrections exist for cabbage, ready-to-eat hotpot, tofu-skin vs tofu, calamari, banana samosa, `ลอยแก้ว`, and mochi.
- No universal `unknown -> generic pot` fallback; only semantic-safe keyword fallback where appropriate.

## Phase 2 — UI/presentation work already integrated

Already in repo; **do not restart**:

- Background master integrated.
- Three independent foreground assets:
  - `assets/overlay-top-left.webp`
  - `assets/overlay-bottom-left.webp`
  - `assets/overlay-right.webp`
- Character source assets under `assets/ner-character-*.png`.
- Layer architecture: `assets/visual-core.css`.
- Modal styling: `assets/visual-modal.css`.
- Responsive phone/iPad portrait/iPad landscape: `assets/visual-responsive.css`.
- `assets/visual-polish.css` imports the presentation layers + thumbnail map.
- Safe-area support for `env(safe-area-inset-top)` / `env(safe-area-inset-bottom)`.
- Menu cards use semantic thumbnail artwork and larger thumbnail regions.
- Calculator and Matrix responsive work exists.
- Modal page-scroll restoration regression was fixed and persisted:
  - `f79f3fa49344968a5d1e0b64482e4e1f6d349b43`
  - `Preserve page scroll across modal lifecycle [skip ci]`

## Stable automated regression baseline

Run **35951516719** passed:

- Chromium + WebKit
- `390×844`, `820×1180`, `1180×820`
- thumbnail coverage `45/45 (100%)`
- four signature regions unique
- semantic correction/mismatch guards pass
- screenshot artifact **10788862475**

---

# GENERATED FOOD ATLAS — VERIFIED BY QA, FINAL PERSIST STILL IN PROGRESS

The newer cohesive generated food atlas is transported in crash-safe Base64 chunks because direct binary writes repeatedly timed out.

Temporary source on `main` until install succeeds:

`tmp/ui-atlas/part-00.b64` … `part-08.b64`

All 9 parts reconstruct:

- target: `assets/menu-thumbnails/semantic-atlas-v1.webp`
- decoded size: **59,500 bytes**
- verified SHA-256: **`1976697397b1581091dc3936412ac9789256b6bd0210ef8afdeac6ac375cd9b4`**

The stale hash gate was corrected by:

- `1bf8c4b503e7e92739d500ba28b1543e981c9f91`
- `Correct generated atlas integrity gate`

**Do not regenerate this atlas because of workflow persist failures. The bytes and UI behavior have already passed repeated QA.**

---

# QA EVIDENCE FOR THE GENERATED ATLAS

## Run 35957227382

All functional/visual automation passed before persistence:

- hydrate/hash/size: PASS
- thumbnail validator: PASS
  - `45/45 (100%)`
  - atlas `6×5`
  - signature regions `4/4 unique`
  - semantic gates pass
- Chromium iPhone / iPad portrait / iPad landscape: PASS
- WebKit iPhone / iPad portrait / iPad landscape: PASS
- overall target sizes: `390×844`, `820×1180`, `1180×820`: PASS
- screenshot artifact: **10791275506**

Only failure: verified asset commit could not push because remote `main` advanced during the long run (non-fast-forward race).

## Run 35957450034

This rerun again proved the generated atlas itself is good:

- hydrate SHA `197669...`: **PASS**
- 59,500-byte gate: **PASS**
- thumbnail coverage `45/45`: **PASS**
- signature `4/4 unique`: **PASS**
- semantic guards: **PASS**
- Chromium all 3 viewports: **PASS**
- WebKit all 3 viewports: **PASS**
- screenshots uploaded: **PASS**
- screenshot artifact: **10790951388**

The persist step created local commit prefix `48c7817` (`Install verified generated thumbnail atlas [skip ci]`) and correctly removed all 9 staging chunks locally, but rebase failed with:

`error: cannot rebase: You have unstaged changes.`

Root cause: the QA step temporarily rewrites tracked `qa/ui-qa.mjs` at runtime, so the worktree was intentionally dirty when the persist step tried to rebase onto a newer `main`. This is **not an atlas, UI, validator, or business-logic failure**.

## Latest workflow fix

Commit:

- `f5950085f37101f10a10eb4b3294b92b76306291`
- `Restore temporary QA edits before verified atlas rebase`

adds this before the verified asset commit/rebase:

`git restore --worktree qa/ui-qa.mjs`

The persist flow is now intended to be:

1. QA passes.
2. Restore temporary tracked harness edits.
3. Stage verified atlas + remove `tmp/ui-atlas/part-*.b64`.
4. Commit `Install verified generated thumbnail atlas [skip ci]`.
5. `git fetch origin main`.
6. `git rebase origin/main`.
7. Push normally; **no force push**.

Commit `f5950085...` changes the workflow file and therefore triggers a fresh `Temporary UI QA` run.

---

# EXACT NEXT ACTION

**Do not redo inventory, taxonomy, atlas generation, architecture audit, or previous visual/root-cause investigation.**

1. Re-check current `main` HEAD; current GitHub wins.
2. Find the newest `Temporary UI QA` run for `f5950085...` or any newer `main` commit.
3. Verify again:
   - hydrate SHA/size pass
   - validator 45/45 pass
   - Chromium all 3 viewports pass
   - WebKit all 3 viewports pass
   - menu/calculator/modal-scroll pass
   - Matrix/PIN/admin regression pass
4. Confirm the persist step pushes `Install verified generated thumbnail atlas [skip ci]` (or equivalent) onto **current `main`**.
5. Confirm on `main` after the push:
   - `assets/menu-thumbnails/semantic-atlas-v1.webp` is the verified generated 59,500-byte atlas
   - SHA-256 = `1976697397b1581091dc3936412ac9789256b6bd0210ef8afdeac6ac375cd9b4`
   - `tmp/ui-atlas/part-*.b64` are gone
6. Inspect the newest 8 screenshots manually; automated PASS is not final visual acceptance.
7. Continue Phase 2 only from actual screenshot defects, especially:
   - all 3 characters present together
   - bottom-left character **without glasses**
   - no important content hidden by foreground
   - thumbnail crop/recognizability
   - brand hierarchy
   - iPhone/iPad safe areas
   - mid/lower scroll composition
   - calculator modal proportions and final-row reachability
8. After visual acceptance, remove temporary staging/QA clutter that is no longer useful while keeping durable tests/validator/docs.

---

# REQUIRED VISUAL QA BEFORE FINAL ACCEPTANCE

Inspect actual screenshots for at least:

1. iPhone top
2. iPhone mid-scroll
3. iPhone lower-scroll
4. iPhone calculator modal
5. iPad portrait top
6. iPad portrait mid-scroll
7. iPad landscape top
8. iPad landscape mid-scroll

Then perform final human real-device checks on iPhone/iPad.

---

# KEY CONTINUATION FILES

- `CURRENT_HANDOFF.md`
- `index.html`
- `recipe_master.json` — business source of truth
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
- `.github/workflows/ui-qa.yml` — temporary QA/install workflow
- `tmp/ui-atlas/part-*.b64` — temporary transport staging; delete only after verified atlas is safely on `main`

## Recovery-only branches — NOT source of truth

- `tmp-ui-fix-upload`
- `tmp-ui-fix-upload2`
- `tmp-atlas-checkpoint`

Use `main` unless there is a specific recovery reason.

---

# WHAT NOT TO REDO

- No repo-wide architecture audit.
- No rebuilding 45-menu inventory unless `recipe_master.json` changed.
- No taxonomy redesign without new data evidence.
- No atlas regeneration because a final Git push/rebase step fails.
- No business-logic changes while fixing presentation/QA.
- Do not drop the proven modal scroll-position fix.
- Do not force-push `main` to solve workflow races.

## Business logic changed by this UI/asset stream

**NO intentional recipe/business-logic change.**

Work in this stream is presentation/assets/responsive/QA plus the modal page-scroll lifecycle regression fix.

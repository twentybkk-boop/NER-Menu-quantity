# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + `CURRENT_HANDOFF.md` + GitHub Actions + persisted screenshot artifact.

## CURRENT WORK HEAD
- Latest durable manual-evidence checkpoint before this write: `ecc061adf0ed9545718a91f3145c3626a16dd9e7`.
- Latest relevant product/test code remains `3802e2d2bfcb425b2533acf9a6b960cbf2b992a4`.
- No product code has changed since `3802e2d2…` during recovery/manual investigation.

## RECOVERY — VERIFIED COMPLETE
- emergency checkpoint: `cda4189dd99776bf64d78c0e771c64062f8eb12c`.
- final automation-result checkpoint: `9bcd7f91c3411beef19947e804e0d40dc45d7ac0`.
- local/live evidence-equivalence checkpoint: `6252b538bc918723d1b6c72eb7e3a1c136b94728`.
- UI QA `36054794980` and Pages `36054790742` for `3802e2d2…` both completed/success.
- artifact `10832610030`, digest `sha256:6fe188ce4781c0f377048ad907cd3586f179e3c82a3d7bab9205a50e9c463364`.
- all 8 final Chunk 4 local page/modal screenshots are byte-identical to deployed equivalents.

## FINAL MANUAL VISUAL REVIEW — DURABLE FAIL
Page state across all four orientations: PASS.
- all three characters present and identities/details intact;
- moderate enlargement reads correctly;
- no menu-card intrusion;
- iPad portrait old left-rail issue visually resolved.

UAT-009 modal density: PASS.
- actionable exclusion list begins promptly after compact header/section chrome.

Remaining real defect: modal top-left character visually covers header content.
- phone portrait: title/subtitle visibly obscured.
- iPad portrait: title/subtitle visibly obscured.
- iPad landscape: smaller but visible intrusion into title/header start.
- phone landscape: PASS.
- bottom-left/right modal characters: PASS.
- automated tap safety: PASS; this is a visual-content safe-zone failure.

Current UAT verdict:
- UAT-008: PARTIAL / NOT COMPLETE because modal-state top-left presentation is unsafe.
- UAT-009: PASS.
- UAT-010: interaction/tap automation PASS, visual safe-zone FAIL.
- V4 Chunk 4: NOT VERIFIED COMPLETE.

## NEW VERIFIED ROOT CAUSE — MODAL SCALE GATE CONFLICTS WITH VISUAL SAFE ZONE
Current CSS modal `.decor-a` rules in `assets/visual-uat-v4-chunk4.css`:
- phone portrait: `92x101`, `left:2`, `top:+2`.
- phone landscape: `80x87`, `left:0`, `top:max(5px, safe-area)` — visually PASS; do not change.
- iPad portrait: `128x141`, `left:8`, `top:+4`.
- iPad/wide landscape: `142x156`, `left:10`, `top:+3`.

Current `qa/chunk4-polish-v4-contract.mjs` modal minimums for top-left `.decor-a`:
- phone portrait: `>=91x100`.
- phone landscape: `>=79x86`.
- iPad portrait: `>=127x140`.
- iPad landscape: `>=141x155`.

Manual screenshots show the modal card/header begins only about 55 / 72 / 75 CSS px from viewport top in phone portrait / iPad portrait / iPad landscape. Therefore the current modal top-left minimum heights (100 / 140 / 155px) cannot fit above the title/header safe zone while also preserving:
1. top-left placement;
2. the full uncropped composition (including speech bubble/head);
3. no title/subtitle overlap.

This explains why automation is green while manual visual acceptance fails: the automated contract requires a modal scale that is geometrically incompatible with the newly verified visual safe-zone requirement.

Rejected workarounds:
- do not move top-left character to the right/top-right; that breaks the intended top-left composition.
- do not translate it far above the viewport; that clips bubble/head and violates complete-composition identity.
- do not hide it behind the modal header; that also clips the approved composition.
- do not move the modal card downward; that works against UAT-009 density and usable viewport space.

## CONTRACT DECISION FOR NEXT FIX
The UAT-008 “moderately larger” requirement remains strict for **page state** and for modal bottom-left/right characters. For the modal top-left character, newly verified human safe-zone evidence takes priority: it may be smaller than the pre-Chunk-4 modal scale if necessary to keep the complete composition visible and clear the modal title/subtitle.

This is not a relaxation of interaction/safety regressions. The stale modal top-left minimum-size assertion must be replaced by a more relevant safe-zone assertion while preserving:
- high-res approved asset source;
- `background-size: contain` full composition;
- `pointer-events:none`;
- all page-state scale minimums;
- modal bottom-left/right scale minimums;
- UAT-009 action-offset limits;
- all P0/Chunk 1/2/3/layering/tap-safety regressions.

## LOCKED INVARIANTS
- no recipe/business/quantity/exclusion/replacement/Matrix/PIN/import-export changes.
- no character binary/source remapping.
- page-state geometry that manually passed must remain unchanged.
- phone-landscape modal `.decor-a` PASS state must remain unchanged.
- bottom-left/right modal characters remain unchanged.
- UAT-009 density remains unchanged.
- no regression-test tolerance relaxation outside the obsolete modal top-left size criterion described above.

## DO NOT REPEAT
- do not restart repo-wide/Chunk 4 investigation.
- do not re-poll completed runs.
- do not re-inspect live screenshots; local/live are byte-identical.
- do not re-derive old iPad rail failure.
- do not revisit page-state character sizing.
- do not attempt horizontal relocation/cropping workarounds for `.decor-a`.

## EXACT NEXT ACTION
One small safe-zone-first code/test chunk only:
1. In `assets/visual-uat-v4-chunk4.css`, change **only modal-state `.decor-a`** for phone portrait, iPad portrait, and wide/iPad landscape to a smaller complete-composition size positioned at the existing top-left edge so it clears modal title/subtitle. Leave phone landscape unchanged.
2. In `qa/chunk4-polish-v4-contract.mjs`, preserve every existing page-state/modal bottom-right/interaction/density requirement, but replace only the stale modal top-left minimum-size requirement for those three orientations with a direct assertion that `.decor-a` does not intersect `.modal-title` or `.modal-subtitle`, while still verifying approved asset, `contain`, and `pointer-events:none`.
3. Do not change any other CSS/test file.
4. Verify the diff is limited to those two scoped changes and immediately persist a code-change checkpoint **before** triggering/waiting on Actions.
5. Then allow exactly one normal UI QA/Pages run for that checkpoint; do not poll in a long loop.

---

## VERIFIED BASELINE — DO NOT REDO
- V2 P0-A/B/C/D VERIFIED; V3 Session 1 VERIFIED; V3 Session 2B.2 visual acceptance PASS.
- V4 Chunk 1 checkpoint `3eb47a81fa1bd84d2ebf8942e694deeaea333ef5`.
- V4 Chunk 2 checkpoint `8eefd4142a4d2d27dca7dcf8e8ce175238b335e8`.
- V4 Chunk 3 head `98a8febd21fe796111488e5607922fdf4569d0f8`; artifact `10830321129`; manual PASS.
- exact production overlays: top `990c6b3523f79a483f41f17032f03f880f97f461`, bottom `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`, right `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.

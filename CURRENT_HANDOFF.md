# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + `CURRENT_HANDOFF.md` + GitHub Actions + persisted screenshot artifacts.

## CURRENT WORK HEAD
- Modal safe-zone root-cause checkpoint: `b519655358488e8d555d710ca718578c8d96fcae`.
- CSS fix commit: `5bb9cb4d99e5753f41e07324bc91f977a0caa23e`.
- QA contract fix commit: `42a6bedf675eebcb5d2ca9a05ad0001604948a3b`.
- Pre-Actions checkpoint: `46d53d9c870fa978b7e7237cd293127c84dfab81`.
- Fresh remote check before this status write confirmed `main == 46d53d9c870fa978b7e7237cd293127c84dfab81`.

## RECOVERY — VERIFIED COMPLETE
- emergency checkpoint `cda4189dd99776bf64d78c0e771c64062f8eb12c`.
- recovered automation checkpoint `9bcd7f91c3411beef19947e804e0d40dc45d7ac0`.
- local/live evidence-equivalence checkpoint `6252b538bc918723d1b6c72eb7e3a1c136b94728`.
- manual visual obstruction checkpoint `ecc061adf0ed9545718a91f3145c3626a16dd9e7`.
- contract-conflict checkpoint `b519655358488e8d555d710ca718578c8d96fcae`.

## PRE-FIX FINAL EVIDENCE — VERIFIED DURABLE
For old product state `3802e2d2bfcb425b2533acf9a6b960cbf2b992a4`:
- Pages `36054790742` — completed/success.
- UI QA `36054794980` — completed/success.
- artifact `10832610030`, digest `sha256:6fe188ce4781c0f377048ad907cd3586f179e3c82a3d7bab9205a50e9c463364`.
- all 8 Chunk 4 LOCAL page/modal screenshots were byte-identical to DEPLOYED copies.
- page state manual PASS in all 4 orientations.
- UAT-009 modal density manual PASS.
- remaining manual defect: modal top-left character covered title/subtitle in phone portrait, iPad portrait, and iPad landscape; phone landscape modal PASS.

## VERIFIED ROOT CAUSE
The old automated modal `.decor-a` minimum heights (100 / 140 / 155px) were geometrically incompatible with the manually verified modal-header safe zone while preserving top-left placement and the complete uncropped composition. Automation was false-green because it required scale but did not directly gate title/subtitle intersection.

## SCOPED FIX — VERIFIED DURABLE CODE
### CSS — `5bb9cb4d…`
Only modal-state `.decor-a` changed in the 3 failing orientations:
- phone portrait: `92x101 -> 56x61`; same `left:2`, same `top:+2`.
- iPad portrait: `128x141 -> 70x77`; same `left:8`, same `top:+4`.
- iPad/wide landscape: `142x156 -> 72x79`; same `left:10`, same `top:+3`.

Unchanged:
- phone-landscape modal `.decor-a = 80x87`.
- all page-state character geometry.
- modal `.decor-b` / `.decor-c`.
- UAT-009 modal density/chrome.
- recipe/business/interaction logic.

### QA contract — `42a6bedf…`
Only the stale modal top-left minimum-size criterion changed for those 3 orientations:
- approved high-res asset, `background-size:contain`, and `pointer-events:none` checks remain.
- all page-state scale minimums remain.
- phone-landscape modal scale minimum remains.
- modal bottom-left/right scale minimums remain.
- UAT-009 action-offset limits remain.
- interaction/tap safety remains.
- new safe-zone assertion requires `.decor-a` fully inside viewport and non-intersecting with `.modal-title` and `.modal-subtitle` with 2px separation.

### Diff scope
`b5196553… -> 42a6bedf…` is ahead by 2 commits and changes exactly 2 files:
1. `assets/visual-uat-v4-chunk4.css`
2. `qa/chunk4-polish-v4-contract.mjs`
No unrelated file changed.

## ACTIONS STATUS — ONE-SHOT CHECKPOINT, DO NOT POLL THIS TURN
A single Actions listing was fetched for exact head `46d53d9c870fa978b7e7237cd293127c84dfab81`.

Observed:
- Pages build/deployment run `36058323553`
  - head SHA: `46d53d9c870fa978b7e7237cd293127c84dfab81`
  - status: **in_progress**
  - conclusion: `null`
  - run number: `409`
- UI QA run for this exact head was **not yet present in that one-shot listing**.
  - status: **UNKNOWN / NOT YET OBSERVED**
  - do not infer failure or success.

Per crash-safe rule, no further Actions polling was performed after this observation.

## VERIFIED DURABLE
- recovery state is preserved in GitHub.
- scoped CSS + QA changes are committed.
- diff scope is verified.
- latest one-shot external-workflow state is now persisted here.

## VERIFIED BUT NOT YET PERSISTED
- none known at this checkpoint.

## UNKNOWN / WAITING EXTERNAL
- final result of Pages `36058323553`.
- UI QA run ID/status for the current safe-zone-fix state.
- final post-fix screenshot artifact ID/digest.
- post-fix manual visual verdict for the 3 previously failing modal orientations.

## LOCKED INVARIANTS
- no recipe/business/quantity/exclusion/replacement/Matrix/PIN/import-export changes.
- no character binary/source remapping.
- preserve page-state geometry that manually passed.
- preserve phone-landscape modal PASS state.
- preserve bottom-left/right modal characters.
- preserve UAT-009 density.
- preserve Chunk 1/2/3 and P0/layering/sharpness/tap-safety gates.

## DO NOT REPEAT
- do not restart repo-wide/Chunk 4 investigation.
- do not re-analyze old pre-fix Actions or artifact unless new evidence requires comparison.
- do not re-derive the modal scale-vs-safe-zone root cause.
- do not change any CSS/test file before current external verification returns concrete evidence.
- do not enter a polling loop.

## EXACT NEXT ACTION
On the next continuation only:
1. Fresh-read current `main` and this handoff; GitHub current wins.
2. Perform **one bounded Actions status read** for the current safe-zone-fix verification state.
3. If required UI QA/Pages are still running or UI QA is still not yet visible, update this handoff with the observed run IDs/status and STOP again.
4. If complete/success, recover final job + artifact metadata once, persist checkpoint immediately, then in a separate small chunk inspect only the new `34-chunk4-*` modal screenshots for phone portrait, iPad portrait, and iPad landscape (local is enough if local/live hashes are identical again).
5. If failed, read only the failed required step/log, persist the exact failure before any code edit, then STOP.

## FINAL COMPLETION CONDITION
V4 Chunk 4 becomes VERIFIED COMPLETE only after:
- post-fix full automated gates pass;
- local/deployed evidence consistency is verified;
- manual modal review confirms no title/subtitle obstruction in the 3 previously failing orientations;
- UAT-008 / UAT-009 / UAT-010 final statuses are persisted in this handoff.

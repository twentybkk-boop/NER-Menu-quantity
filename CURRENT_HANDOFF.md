# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + `CURRENT_HANDOFF.md` + GitHub Actions + persisted screenshot artifact.

## CURRENT WORK HEAD
- Pre-fix contract-conflict checkpoint: `b519655358488e8d555d710ca718578c8d96fcae`.
- CSS fix commit: `5bb9cb4d99e5753f41e07324bc91f977a0caa23e`.
- QA contract fix commit: `42a6bedf675eebcb5d2ca9a05ad0001604948a3b`.
- `compare b5196553… -> 42a6bedf…`: exactly 2 files changed, ahead by 2 commits, no unrelated files.
  - `assets/visual-uat-v4-chunk4.css`: 9 changed lines.
  - `qa/chunk4-polish-v4-contract.mjs`: 39 changed lines.

## RECOVERY — VERIFIED COMPLETE
- emergency checkpoint `cda4189dd99776bf64d78c0e771c64062f8eb12c`.
- automation recovery checkpoint `9bcd7f91c3411beef19947e804e0d40dc45d7ac0`.
- local/live evidence-equivalence checkpoint `6252b538bc918723d1b6c72eb7e3a1c136b94728`.
- manual visual obstruction checkpoint `ecc061adf0ed9545718a91f3145c3626a16dd9e7`.
- contract-conflict checkpoint `b519655358488e8d555d710ca718578c8d96fcae`.

## PRE-FIX FINAL EVIDENCE — VERIFIED
For product head `3802e2d2bfcb425b2533acf9a6b960cbf2b992a4`:
- Pages `36054790742` — completed/success.
- UI QA `36054794980` — completed/success.
- artifact `10832610030`, digest `sha256:6fe188ce4781c0f377048ad907cd3586f179e3c82a3d7bab9205a50e9c463364`.
- all 8 Chunk 4 local page/modal screenshots were byte-identical to deployed copies.
- page state manual PASS in all 4 orientations.
- UAT-009 modal density manual PASS.
- remaining defect was modal top-left character obscuring title/subtitle in phone portrait, iPad portrait, and iPad landscape; phone landscape modal PASS.

## ROOT CAUSE — VERIFIED DURABLE
The previous automated modal `.decor-a` minimum heights (100 / 140 / 155px) were geometrically incompatible with the manually verified header safe zone while preserving top-left placement and uncropped composition. This produced a false-green automation result.

## SCOPED FIX — VERIFIED DURABLE CODE CHANGE
### CSS (`5bb9cb4d…`)
Only modal-state `.decor-a` changed in the 3 failing orientations:
- phone portrait: `92x101 -> 56x61`; same `left:2`, same `top:+2`.
- iPad portrait: `128x141 -> 70x77`; same `left:8`, same `top:+4`.
- iPad/wide landscape: `142x156 -> 72x79`; same `left:10`, same `top:+3`.

Unchanged:
- phone-landscape modal `.decor-a` remains `80x87` because it already passed manual review.
- every page-state character rule.
- modal `.decor-b` / `.decor-c`.
- UAT-009 modal density/chrome.
- business/recipe/interaction logic.

### QA contract (`42a6bedf…`)
Only the obsolete modal top-left scale criterion changed for the 3 failing orientations:
- approved high-res asset / `background-size:contain` / `pointer-events:none` checks remain.
- page-state character scale minimums remain.
- phone-landscape modal scale minimum remains.
- modal bottom-left/right scale minimums remain.
- UAT-009 action-offset limits remain.
- interaction/tap safety remains.
- new direct safe-zone gate requires top-left modal character box to stay fully in viewport and not intersect `.modal-title` or `.modal-subtitle` with a 2px separation.

## VERIFIED DIFF SCOPE
`b5196553… -> 42a6bedf…` changes only:
1. `assets/visual-uat-v4-chunk4.css`
2. `qa/chunk4-polish-v4-contract.mjs`

No other file changed. No test tolerance outside the obsolete modal top-left scale criterion changed.

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
- do not re-poll completed pre-fix runs.
- do not re-inspect old artifact `10832610030` except as historical comparison.
- do not alter any additional CSS/test file before new evidence.

## EXACT NEXT ACTION
After confirming this checkpoint is on remote `main`:
1. Fetch the Actions runs associated with latest `main` once.
2. If UI QA/Pages are still running, persist their run IDs/status and STOP; do not poll in a loop.
3. If complete/success, recover final job/artifact evidence once and checkpoint immediately.
4. If failed, read only the failed required step/log, checkpoint the concrete failure, then make no further change until that checkpoint is durable.
5. If automation passes, inspect only the new `34-chunk4-*` modal screenshots for the three previously failing orientations (local copies are enough if local/live hashes match again), then persist final manual PASS/FAIL.

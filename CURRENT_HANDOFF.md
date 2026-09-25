# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — EXACT UAT-011 REPAIR WORKFLOW READY; NOT YET TRIGGERED

## UAT-012 — FIX REMAINS DURABLE AND ACCEPTED BY ITS GATE
- product fix `6fdebb8da6fc87710be6f93141c26579d57d0056`
- portrait master sizing `auto 100dvh -> 160% auto`
- portrait ivory wash reduced `.42/.16/.34 -> .18/.06/.16`
- landscape unchanged
- regression gate `f28893b255f41ff70643c4e406d4de003909eddb`
- UI QA run `36093279114` confirmed orientation/layering/backmost environment PASS in Chromium + WebKit for all targeted orientations before a later unrelated failure.

## UAT-011 — VERIFIED ROOT CAUSE OF QA FAILURE
- intended alpha cleanup is valid
- current bad production blobs are truncated/wrong:
  - top `e457bc39bfa490b467b7b061afd388c924203dec`, 14,997 bytes
  - bottom `d028a38f30098759217c1f2808a29f2327de441d`, 14,999 bytes
- exact cleaned targets remain:
  - top 518x500 RGBA, 180,814 bytes, SHA256 `f0ffd24fdde830d06b0d715c7c6ba8c2e81402c9e93731524a3dfa724915d393`
  - bottom 655x524 RGBA, 233,136 bytes, SHA256 `bd645b4744270e221fe0eae8fe08eabf2771269391ddfc4650492e6da831ad31`
- UI QA `36093279114` first failed at V3 sharpness direct decode; P0-A/P0-B/P0-D/Chunk3/Chunk4/layering had passed before it.

## DETERMINISTIC EXACT RECONSTRUCTION — VERIFIED
Original authoritative blobs:
- top `990c6b3523f79a483f41f17032f03f880f97f461`, 31,174 bytes, SHA256 `6d70ae5b226ff6b7f92b04853c702401da71e7d03ef9fbf94a8fd46bb01574ca`
- bottom `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`, 39,712 bytes, SHA256 `9d27c16f9185a4cac32a16f3415b4d60c392fcede32f877a863cad515b4baae8`

Only alpha is cleared at the exact row-run masks already persisted in checkpoint `48a7d2d3570dc6fad5997ede05eef7efd9d59a12`:
- top: 552 pixels, rows 486..499
- bottom: 3,176 pixels, rows 0..32
- visible retained RGB unchanged

Encoder proof:
- Pillow `12.3.0`
- `WEBP`, `lossless=True`, `quality=80`, `method=6`, `exact=False`
- regenerates byte-for-byte exact cleaned target sizes/SHA256 above.

## REPAIR WORKFLOW — VERIFIED READY
Workflow:
- `.github/workflows/repair-uat011-exact-overlays.yml`

Deterministic implementation commit:
- `1c06f9de5a3234a19353ef3099c48a94704e0b80` — `Use deterministic exact overlay reconstruction`
- verified commit scope: workflow file only

Workflow safety properties:
- trigger only on `main` path `repair-staging/uat011/RUN_EXACT_REPAIR`
- checkout `fetch-depth: 0`
- install exact `Pillow==12.3.0`
- materialize verified old blobs with `git cat-file blob`
- verify old byte sizes + old SHA256 before reconstruction
- apply only persisted exact alpha masks
- require changed-pixel counts top=552 / bottom=3176
- require output sizes top=180814 / bottom=233136
- require exact target SHA256 for both outputs
- stage exactly:
  - `assets/overlay-top-left-hires.webp`
  - `assets/overlay-bottom-left-hires.webp`
- refuse commit if staged path set differs
- commit/push from GitHub Actions only after all checks pass.

Status:
- workflow has NOT been triggered yet.
- no base64 staging files are required.
- two earlier orphan Git blobs from abandoned chunk transport are unreferenced and need no cleanup.

## VERIFIED ACTIONS STATE
- Pages `36093278458` — completed/success
- UI QA `36093279114` — completed/failure at sharpness step only
- failure artifact `10845589504`, digest `sha256:dcad54fa1a5757ba9706cb751aeaf16f3de394e76ceff8de2c346eef091e578e`

## VERIFIED BASELINE — DO NOT REOPEN
- V4 Chunk 1–4 pre-delta acceptance remains baseline.
- UAT-012 presentation fix remains accepted by its dedicated layering gate.
- preserve P0-A/P0-B/P0-D/layering/sharpness/tap-safety and phone-landscape interaction/modal behavior.
- no business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export changes.

## DO NOT REPEAT
- do not redo UAT-011 contamination discovery, alpha-mask derivation, or encoder proof.
- do not continue abandoned base64 chunk staging.
- do not change UAT-012 portrait background rules.
- do not rerun `36093279114` unchanged.

## EXACT NEXT ACTION
1. Fresh-confirm this workflow-ready checkpoint is durable on `main`.
2. Create `repair-staging/uat011/RUN_EXACT_REPAIR` as the one trigger marker.
3. Fetch the resulting `Repair exact UAT-011 overlays` run once.
   - if still running: persist run ID/status and stop polling;
   - if completed: inspect only repair job result/log and verify bot commit.
4. Verify resulting Git tree production blob sizes/diff scope; checkpoint corrected mapping immediately.
5. Let the exact asset bot commit trigger one combined UI QA + Pages verification for UAT-011/UAT-012.
6. If automation passes, inspect only targeted phone-portrait environment + character-cutout evidence, persist `READY FOR USER RE-REVIEW`, and hand back `https://twentybkk-boop.github.io/NER-Menu-quantity/`.

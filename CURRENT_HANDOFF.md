# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-013 QA HARNESS FIX DURABLE; UI QA RUNNING

Only remaining user-reported defect was portrait background art looking composited/cut-and-paste. User explicitly approved the newly generated portrait-native garden/hot-pot background.

## APPROVED UAT-013 ASSET — VERIFIED MAPPED
- 941x1672 RGB
- 125,912 bytes
- SHA256 `050777632f5fcd1c9217777e4925041633699f52ad37636aeb100a08226ad823`
- production path `assets/background-portrait-garden-v1.webp`
- repair run `36101535008` — completed/success
- bot mapping commit `1d7a134e8cfc595f5633bc3a7cb7614cdb1bf4a4`
- bot commit changed exactly one path: `assets/background-portrait-garden-v1.webp`
- production blob `30437127857f50d217f12451f9ecff8ec61a9ef9`, size 125,912 bytes

## UAT-013 PRODUCT INTEGRATION — DURABLE
- `assets/visual-uat-v4-chunk1.css` commit `7abe32e8a4147ab2b7b5763a98e31a8bb93dbd19`
  - portrait only uses `background-portrait-garden-v1.webp`
  - portrait image layer uses `cover`, centered top
  - portrait ivory veil/ambient opacity reduced so the approved art reads as one coherent scene
  - landscape branch remains on accepted `background-master.webp` with existing geometry/masthead protection
- dedicated contract `qa/uat013-portrait-background-contract.mjs` commit `d7879675cc58f111bb5390b5d10c606d6b98581a`
- orientation regression contract updated commit `6d3a25434e97588af7bc6e1509e0280978b5b339`
- `.github/workflows/ui-qa.yml` commit `33c9f26cb49dc1ce27dfadccd2151956d2acc26f` wires UAT-013 local + deployed gates

## FIRST CI FAILURE — ROOT CAUSE VERIFIED
- UI QA run `36101969064`, job `107966196621`
- first failed required step: `Run Chromium + WebKit UI QA`
- exact assertion: `chromium/iphone: background master not active`
- actual portrait background correctly contained `assets/background-portrait-garden-v1.webp`
- root cause was stale generic/base QA assumption, not a product CSS regression.

## QA HARNESS FIX — VERIFIED DURABLE
Commit:
- `9a6fd3cfa52b28c997fc4eba81fd080480b4fc2a` — `Update base UI QA for UAT-013 portrait background`

Scope verification:
- changed exactly one path: `qa/ui-qa-runner.mjs`
- no product CSS/assets/business/runtime code changed.

Behavior:
- `iphone` and `ipad-portrait` require `background-portrait-garden-v1.webp` and reject `background-master.webp`.
- `ipad-landscape` continues to require `background-master.webp` and rejects the portrait-only asset.
- central readability gradient assertion remains intact.
- all legacy calculator/manager/PIN/Matrix/thumbnail/overflow/character/orientation invariants remain unchanged.
- fail-closed source-block guards remain intact.

## NEW CI — DURABLE EXTERNAL STATE
- UI QA run `36102366681`
- head SHA `9a6fd3cfa52b28c997fc4eba81fd080480b4fc2a`
- run number 148
- bounded-read status: `in_progress`
- conclusion: not final yet
- no further polling performed in this session.

Checkpoint after QA fix:
- `8a0a60ddb60fcd88b4fedc9fb3b1fb00a9d85063` — `Checkpoint UAT-013 base QA harness fix`

## ACCEPTED / DO NOT REOPEN
- UAT-011 character cutout cleanup
- V4 Chunk 1–4 acceptance
- landscape background/layout/interaction
- P0-A/P0-B/P0-D/layering/sharpness/tap-safety/phone-landscape calculator behavior
- business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export semantics

## DO NOT REPEAT
- do not regenerate UAT-013 art
- do not rebuild/remap the verified UAT-013 binary
- do not rewrite exact repair staging chunks
- do not alter landscape behavior unless a concrete regression appears
- do not touch accepted character binaries
- do not rerun old failed UI QA `36101969064`
- do not poll UI QA `36102366681` repeatedly

## EXACT NEXT ACTION
NEXT SHORT SESSION ONLY:
1. Read UI QA run `36102366681` once.
2. If still running, persist status and STOP; no polling loop.
3. If completed/failure, inspect only first failed required step/log and checkpoint exact blocker before editing.
4. If completed/success, persist automation-success checkpoint before artifact review.
5. Then check latest Pages once and download only `ui-qa-screenshots` artifact.
6. Inspect targeted local/live `35-phone-portrait-uat013.png` plus phone portrait layering evidence; verify local/live equivalence and manual visual integration.
7. After verified visual acceptance, remove only temporary UAT-013 repair staging/trigger artifacts, verify cleanup scope, then persist READY FOR USER FINAL REVIEW.

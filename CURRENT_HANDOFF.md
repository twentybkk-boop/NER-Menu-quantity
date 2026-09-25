# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-013 CODE INTEGRATED; FIRST CI RUN FAILED

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
  - checks portrait uses new asset and `cover`
  - checks landscape does not use portrait asset and retains old master
  - checks backmost/pointer-events safety
  - renders `35-phone-portrait-uat013.png` / `live-35-phone-portrait-uat013.png`
- orientation regression contract updated commit `6d3a25434e97588af7bc6e1509e0280978b5b339` for portrait-vs-landscape asset split without weakening layering/rail gates
- `.github/workflows/ui-qa.yml` commit `33c9f26cb49dc1ce27dfadccd2151956d2acc26f` wires UAT-013 local + deployed gates into the existing suite
- code checkpoint commit `21e994f8a670f527a269693f6b448e21ceebe473` (`Checkpoint UAT-013 code before CI`)

## FIRST CI READ — VERIFIED DURABLE EXTERNAL STATE
- UI QA run `36101969064`
  - code head `33c9f26cb49dc1ce27dfadccd2151956d2acc26f`
  - final status `completed`
  - conclusion `failure`
  - failed step/log not yet inspected at this checkpoint
- Pages run `36102019453`
  - checkpoint head `21e994f8a670f527a269693f6b448e21ceebe473`
  - bounded-read status `in_progress`
  - no further Pages polling performed in this checkpoint

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
- do not rerun UI QA `36101969064` before the first failed step is understood
- do not poll Pages `36102019453` repeatedly

## EXACT NEXT ACTION
NEXT SHORT SESSION ONLY:
1. Fetch jobs for failed UI QA run `36101969064`.
2. Inspect only the first failed required step/log and identify exact failure.
3. Persist exact failure/root cause before editing.
4. Make only the minimum QA/product correction supported by that evidence.
5. Persist fix checkpoint before waiting for new Actions.

If the next UI QA succeeds, download only `ui-qa-screenshots` and inspect targeted `35-phone-portrait-uat013.png` / live counterpart plus phone portrait layering evidence. After verified visual acceptance, remove temporary UAT-013 repair staging/trigger artifacts and persist READY FOR USER FINAL REVIEW.

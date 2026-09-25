# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-013 VISUAL EVIDENCE ACCEPTED; TEMPORARY REPAIR CLEANUP NEXT

Only remaining user-reported defect was portrait background art looking composited/cut-and-paste. User explicitly approved the newly generated portrait-native garden/hot-pot background.

## APPROVED UAT-013 ASSET — VERIFIED MAPPED
- 941x1672 RGB
- 125,912 bytes
- SHA256 `050777632f5fcd1c9217777e4925041633699f52ad37636aeb100a08226ad823`
- production path `assets/background-portrait-garden-v1.webp`
- repair run `36101535008` — completed/success
- bot mapping commit `1d7a134e8cfc595f5633bc3a7cb7614cdb1bf4a4`
- production blob `30437127857f50d217f12451f9ecff8ec61a9ef9`, size 125,912 bytes

## UAT-013 PRODUCT INTEGRATION — DURABLE
- `assets/visual-uat-v4-chunk1.css` commit `7abe32e8a4147ab2b7b5763a98e31a8bb93dbd19`
  - portrait uses `background-portrait-garden-v1.webp`
  - portrait image layer uses `cover`, centered top
  - landscape remains on accepted `background-master.webp`
- dedicated contract `qa/uat013-portrait-background-contract.mjs` commit `d7879675cc58f111bb5390b5d10c606d6b98581a`
- orientation regression contract updated commit `6d3a25434e97588af7bc6e1509e0280978b5b339`
- `.github/workflows/ui-qa.yml` commit `33c9f26cb49dc1ce27dfadccd2151956d2acc26f` wires UAT-013 local + deployed gates

## CI FAILURE CHAIN — VERIFIED QA-ONLY ROOT CAUSES
### Run `36101969064`
- failed `Run Chromium + WebKit UI QA`
- stale `qa/ui-qa-runner.mjs` portrait assumption required `background-master.webp`
- fixed by `9a6fd3cfa52b28c997fc4eba81fd080480b4fc2a`
- changed exactly `qa/ui-qa-runner.mjs`

### Run `36102366681`
- base QA passed after prior fix
- failed `Verify P0-D top composition locally`
- stale `qa/top-composition-v1-contract.mjs` portrait assumption required `background-master.webp`
- fixed by `c6395cf074077816ab23ac7d92c4787cfc598f37`
- changed exactly `qa/top-composition-v1-contract.mjs`

### Run `36102894216`
- base QA, P0-A, P0-B and P0-D top-composition all passed
- first failure: `Verify P0-D long-list rhythm locally`
- exact log assertion: `chromium/local: backmost illustrated environment missing`
- actual `body::before` contained `background-portrait-garden-v1.webp`; stale contract expected `background-master.webp`
- root cause confirmed in fixed 390x844 portrait `qa/long-list-rhythm-v1-contract.mjs`
- product CSS/assets/runtime were not implicated

## LONG-LIST QA FIX — VERIFIED DURABLE
Commit:
- `f9a647098024b9f048cbe97f9b35924cbe401eb5` — `Update long-list QA for UAT-013 portrait background`

Scope verification:
- changed exactly one path: `qa/long-list-rhythm-v1-contract.mjs`
- no product CSS/assets/business/runtime code changed

Behavior:
- fixed 390x844 phone portrait contract requires `background-portrait-garden-v1.webp`
- rejects stale `background-master.webp` in portrait
- all remaining long-list assertions unchanged

Root-cause checkpoint before edit:
- `a811bd8abef9d2386d8c8431f615aa837d1dbfc6` — `Checkpoint UAT-013 long-list stale QA root cause`

## RESULTING UI QA — AUTOMATION SUCCESS VERIFIED
- UI QA run `36103333988`
- head SHA `f9a647098024b9f048cbe97f9b35924cbe401eb5`
- run number 150
- event `push`
- status `completed`
- conclusion `success`
- completed at `2026-09-25T06:37:03Z`
- verifies all required local/deployed gates wired in the workflow passed for the long-list-fix head

## VISUAL ARTIFACT REVIEW — VERIFIED ACCEPTED
Artifact:
- run `36103333988`
- `ui-qa-screenshots`
- artifact ID `10850046829`
- artifact digest `sha256:d8a3c8ed4ce2e823ae8a122c9c807e678a2bf03525a15afa0fecb5e4daf44e2b`

Targeted evidence inspected:
- `35-phone-portrait-uat013.png`
- `live-35-phone-portrait-uat013.png`
- `29-phone-portrait-layering-v1@2x.png`
- `live-29-phone-portrait-layering-v1@2x.png`

Equivalence verification:
- all four target images: 780x1688
- all four target image SHA256: `8f2f0aac56eb5cebc4b7852571590a233cb891fb3f4b77d2f3c23079c4bf4461`
- local/live UAT-013 pair: byte-identical and pixel-identical
- local/live portrait-layering pair: byte-identical and pixel-identical
- portrait UAT-013 target and portrait-layering target are also identical screenshots for this state

Manual visual integration verification:
- portrait-native garden/hot-pot environment reads as one continuous background scene rather than a composited patch
- protected center content remains readable and unobstructed
- all three approved character placements are present together in the portrait evidence: upper-left, lower-left, lower-right
- accepted top character remains without glasses
- no portrait-only asset appears as a landscape regression in the reviewed portrait evidence
- no concrete visual regression found; product CSS/assets remain accepted

Pages/deployment note:
- direct Pages/deployment endpoint was not exposed by the connector in this session, and direct web-open of the Pages URL was unavailable to the web tool
- however run 150 itself completed `success` including its wired deployed gates, and the run artifact contains the live Pages screenshots above; those live screenshots are byte/pixel identical to local evidence

## ACCEPTED / DO NOT REOPEN
- UAT-011 character cutout cleanup
- V4 Chunk 1–4 acceptance
- UAT-013 portrait-native background integration and visual evidence
- landscape background/layout/interaction
- P0-A/P0-B/P0-D/layering/sharpness/tap-safety/phone-landscape calculator behavior
- business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export semantics

## DO NOT REPEAT
- do not regenerate UAT-013 art
- do not rebuild/remap verified UAT-013 binary
- do not rewrite repair staging chunks
- do not alter landscape behavior without concrete regression evidence
- do not touch accepted character binaries
- do not rerun failed runs `36101969064`, `36102366681`, or `36102894216`
- do not reopen `qa/ui-qa-runner.mjs`, `qa/top-composition-v1-contract.mjs`, or `qa/long-list-rhythm-v1-contract.mjs` without new evidence
- do not rerun successful run `36103333988`
- do not repeat UAT-013 artifact visual review unless new regression evidence appears

## EXACT NEXT ACTION
1. Identify only temporary UAT-013 repair staging/trigger artifacts still present on current `main`.
2. Delete only artifacts that are demonstrably temporary and no longer referenced by production/QA workflow.
3. Verify cleanup diff contains no production asset/CSS/runtime/business behavior changes.
4. Persist final cleanup checkpoint as `READY FOR USER FINAL REVIEW`.

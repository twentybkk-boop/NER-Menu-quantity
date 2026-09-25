# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-013 FIRST CI ROOT CAUSE CONFIRMED; QA HARNESS FIX NEXT

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
- code checkpoint commit `21e994f8a670f527a269693f6b448e21ceebe473`

## FIRST CI FAILURE — ROOT CAUSE VERIFIED
UI QA:
- run `36101969064`
- job `107966196621`
- code head `33c9f26cb49dc1ce27dfadccd2151956d2acc26f`
- final `completed/failure`
- first failed required step: `Run Chromium + WebKit UI QA`
- command: `node qa/ui-qa-runner.mjs`
- exact assertion: `chromium/iphone: background master not active`
- expected regex: `/background-master\.webp/`
- actual computed `body::before` background correctly contains `assets/background-portrait-garden-v1.webp`

Root cause:
- product UAT-013 portrait CSS is applying correctly.
- the generic/base UI QA harness still hardcodes the pre-UAT-013 assumption that the iPhone portrait background must be `background-master.webp`.
- this is a stale QA-harness compatibility assertion, not evidence of a product visual regression.
- later gates were skipped because the base runner failed first.

Pages:
- run `36102019453` on checkpoint head `21e994f8a670f527a269693f6b448e21ceebe473` was `in_progress` at the prior bounded read; do not poll it repeatedly while fixing the known QA blocker.

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
- do not change product CSS to satisfy this stale base assertion

## EXACT NEXT ACTION
NEXT SHORT CHUNK ONLY:
1. Inspect `qa/ui-qa-runner.mjs` only around the base background assertion and orientation/viewport case definitions.
2. Update the base contract minimally so portrait cases require `background-portrait-garden-v1.webp` and reject `background-master.webp`, while landscape cases continue to require `background-master.webp` and reject the portrait asset.
3. Preserve every other base UI invariant unchanged.
4. Verify diff scope is QA harness only.
5. Persist QA-harness-fix checkpoint before reading new Actions.

After that, read the new UI QA + Pages once. If successful, download only the screenshots artifact and inspect targeted local/live UAT-013 portrait evidence before cleanup and READY FOR USER FINAL REVIEW.

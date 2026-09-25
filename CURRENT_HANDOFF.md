# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-013 LONG-LIST STALE QA ROOT CAUSE CHECKPOINTED

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

## SECOND CI FAILURE — ROOT CAUSE VERIFIED AND FIXED
- UI QA run `36102366681`, job `107967406448`
- base Chromium+WebKit UI QA passed after the first fix.
- first failed required step: `Verify P0-D top composition locally`.
- stale assumption was in `qa/top-composition-v1-contract.mjs`: portrait still required `background-master.webp`.
- evidence pointed to stale QA only, not product CSS.

P0-D QA fix commit:
- `c6395cf074077816ab23ac7d92c4787cfc598f37` — `Update P0-D QA for UAT-013 portrait background`
- changed exactly one path: `qa/top-composition-v1-contract.mjs`
- portrait requires `background-portrait-garden-v1.webp` and rejects stale master.
- landscape invariant remains on `background-master.webp` and rejects portrait-only art.
- all other P0-D assertions unchanged.

## THIRD CI FAILURE — EXACT ROOT CAUSE CHECKPOINTED BEFORE EDIT
- UI QA run `36102894216`
- head SHA `c6395cf074077816ab23ac7d92c4787cfc598f37`
- run number 149
- status `completed`
- conclusion `failure`
- job `107969031135`
- `Run Chromium + WebKit UI QA` passed.
- `Verify P0-A complete character composition` passed.
- `Verify P0-B protected center frame` passed.
- `Verify P0-D top composition locally` passed, proving the prior P0-D fix is effective.
- first failed required step: `Verify P0-D long-list rhythm locally`.
- exact assertion from logs: `chromium/local: backmost illustrated environment missing` at `qa/long-list-rhythm-v1-contract.mjs:129`.
- actual `body::before` background includes `assets/background-portrait-garden-v1.webp` plus the accepted gradients.
- expected value in stale contract is `/background-master\.webp/`.
- `qa/long-list-rhythm-v1-contract.mjs` uses a fixed phone portrait viewport `390x844`, so its unconditional master-background assertion conflicts with accepted UAT-013 portrait behavior.
- root cause is stale long-list QA contract, not product CSS/assets/runtime.
- root cause persisted before any code edit, per crash-safe continuation policy.

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
- do not poll final failed UI QA `36102366681`
- do not poll final failed UI QA `36102894216`
- do not reopen `qa/ui-qa-runner.mjs` unless new evidence points back to it
- do not edit `qa/top-composition-v1-contract.mjs` again unless new evidence points back to it

## EXACT NEXT ACTION
NEXT SHORT SESSION ONLY:
1. Edit only `qa/long-list-rhythm-v1-contract.mjs`.
2. For its fixed 390x844 portrait viewport, require `background-portrait-garden-v1.webp` and reject stale `background-master.webp` while preserving every other long-list assertion unchanged.
3. Do not touch accepted product CSS/assets or landscape behavior.
4. Commit the minimum QA-only fix.
5. Update `CURRENT_HANDOFF.md` with the fix commit and launch state.
6. Read the resulting GitHub Actions run once only.
7. If completed/failure, inspect only the first failed required step and checkpoint before any further edit; if success, persist success before artifact review.

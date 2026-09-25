# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — READY FOR USER FINAL REVIEW

UAT-013 portrait background defect has been repaired, automation-verified, visually verified against local/live evidence, and its temporary repair staging has been removed with deletion-only scope verification.

No further code/product/QA edits are warranted unless user final hands-on review provides a concrete regression.

## APPROVED UAT-013 ASSET — VERIFIED MAPPED
- production path: `assets/background-portrait-garden-v1.webp`
- dimensions: 941x1672 RGB
- size: 125,912 bytes
- SHA256: `050777632f5fcd1c9217777e4925041633699f52ad37636aeb100a08226ad823`
- repair run `36101535008` — completed/success
- mapping commit `1d7a134e8cfc595f5633bc3a7cb7614cdb1bf4a4`
- production blob `30437127857f50d217f12451f9ecff8ec61a9ef9`

## UAT-013 PRODUCT INTEGRATION — VERIFIED DURABLE
- `assets/visual-uat-v4-chunk1.css` commit `7abe32e8a4147ab2b7b5763a98e31a8bb93dbd19`
  - portrait uses `background-portrait-garden-v1.webp`
  - portrait image layer uses `cover`, centered top
  - landscape remains on accepted `background-master.webp`
- dedicated contract `qa/uat013-portrait-background-contract.mjs` commit `d7879675cc58f111bb5390b5d10c606d6b98581a`
- orientation regression contract commit `6d3a25434e97588af7bc6e1509e0280978b5b339`
- workflow wiring commit `33c9f26cb49dc1ce27dfadccd2151956d2acc26f`

## QA-HARNESS REGRESSION CHAIN — RESOLVED
### Run `36101969064`
- first failure: base Chromium + WebKit UI QA
- stale portrait assumption required `background-master.webp`
- fixed QA-only by `9a6fd3cfa52b28c997fc4eba81fd080480b4fc2a`
- changed exactly `qa/ui-qa-runner.mjs`

### Run `36102366681`
- base QA passed after prior fix
- first failure: `Verify P0-D top composition locally`
- stale portrait master assertion in `qa/top-composition-v1-contract.mjs`
- fixed QA-only by `c6395cf074077816ab23ac7d92c4787cfc598f37`

### Run `36102894216`
- base QA, P0-A, P0-B, and P0-D top composition passed
- first failure: `Verify P0-D long-list rhythm locally`
- stale fixed 390x844 portrait assertion expected `background-master.webp`
- exact root cause checkpointed before edit in `a811bd8abef9d2386d8c8431f615aa837d1dbfc6`
- fixed QA-only by `f9a647098024b9f048cbe97f9b35924cbe401eb5`
- changed exactly `qa/long-list-rhythm-v1-contract.mjs`
- portrait now requires `background-portrait-garden-v1.webp` and rejects stale master; all other long-list invariants remain unchanged

## FINAL UAT-013 UI QA — SUCCESS
- UI QA run `36103333988`
- run number 150
- head SHA `f9a647098024b9f048cbe97f9b35924cbe401eb5`
- status `completed`
- conclusion `success`
- completed at `2026-09-25T06:37:03Z`
- all required local/deployed gates wired in `.github/workflows/ui-qa.yml` passed for the UAT-013 fix head

Automation-success checkpoint:
- `beb6915b7a2dacf865b45668b83681df0c4d2ec5` — `Checkpoint UAT-013 UI QA run 150 success`

## VISUAL ARTIFACT REVIEW — VERIFIED ACCEPTED
Artifact:
- run `36103333988`
- artifact `ui-qa-screenshots`
- artifact ID `10850046829`
- artifact digest `sha256:d8a3c8ed4ce2e823ae8a122c9c807e678a2bf03525a15afa0fecb5e4daf44e2b`

Targeted evidence inspected:
- `35-phone-portrait-uat013.png`
- `live-35-phone-portrait-uat013.png`
- `29-phone-portrait-layering-v1@2x.png`
- `live-29-phone-portrait-layering-v1@2x.png`

Equivalence verification:
- all four target images are 780x1688
- all four SHA256: `8f2f0aac56eb5cebc4b7852571590a233cb891fb3f4b77d2f3c23079c4bf4461`
- local/live UAT-013 pair: byte-identical and pixel-identical
- local/live portrait-layering pair: byte-identical and pixel-identical
- targeted UAT-013 and portrait-layering screenshots are identical for this accepted state

Manual visual verification:
- portrait-native garden/hot-pot background reads as one continuous scene rather than a composited patch
- protected center content remains readable and unobstructed
- all three approved characters are present together: upper-left, lower-left, lower-right
- approved upper-left character remains without glasses
- no concrete visual regression found

Visual-acceptance checkpoint:
- `9e9e13675f100726bf708aeb3fc207ec8ac9d56b` — `Checkpoint UAT-013 visual evidence accepted`

## UAT-013 TEMPORARY REPAIR CLEANUP — VERIFIED COMPLETE
Cleanup commit:
- `775b628b32810b83b1ccee785eddf5153abd2bfd` — `Remove temporary UAT-013 repair staging`
- parent: `9e9e13675f100726bf708aeb3fc207ec8ac9d56b`
- tree: `cbbafaaa5b163b803216b58f20f082b6cf6dffdb`
- fast-forwarded to `main` with `force=false`

Pre-merge compare verification:
- exactly 1 commit ahead
- exactly 16 removed paths
- zero added paths
- zero modified paths outside deletion set
- no production asset/CSS/runtime/business/QA contract changed

Removed exactly:
- `.github/workflows/repair-uat013-portrait-background.yml`
- `repair-staging/uat013/RUN_EXACT_REPAIR`
- `repair-staging/uat013/portrait-00.b64`
- `repair-staging/uat013/portrait-01.b64`
- `repair-staging/uat013/portrait-02.b64`
- `repair-staging/uat013/portrait-03.b64`
- `repair-staging/uat013/portrait-04.b64`
- `repair-staging/uat013/portrait-05.b64`
- `repair-staging/uat013/portrait-06.b64`
- `repair-staging/uat013/portrait-07.b64`
- `repair-staging/uat013/portrait-08a.b64`
- `repair-staging/uat013/portrait-08b.b64`
- `repair-staging/uat013/portrait-08c.b64`
- `repair-staging/uat013/portrait-08d.b64`
- `repair-staging/uat013/portrait-09.b64`
- `repair-staging/uat013/portrait-10.b64`

Post-cleanup tree verification:
- `repair-staging/uat013` is gone
- `repair-staging/` contains only the separate accepted UAT-011 staging
- `.github/workflows/repair-uat013-portrait-background.yml` is gone
- `.github/workflows/` retains the separate UAT-011 repair workflow and durable `ui-qa.yml`
- UAT-011 staging/workflow were not touched

## LATEST PAGES / ACTIONS BOUNDED STATUS AFTER CLEANUP
Bounded Actions read after cleanup found:
- Pages build/deployment run `36104277804`
- run number 503
- head SHA `775b628b32810b83b1ccee785eddf5153abd2bfd`
- status at bounded read: `queued`
- conclusion at bounded read: not final
- no polling loop was performed
- no cleanup-head UI QA run was visible in the same top-10 bounded Actions listing at that moment; do not invent one

The cleanup commit is deletion-only and does not modify production behavior. The previously accepted UAT-013 UI QA run 150 and local/live pixel-identical visual evidence remain the acceptance evidence for product behavior.

## ACCEPTED / DO NOT REOPEN
- UAT-011 character cutout cleanup
- V4 Chunk 1–4 acceptance
- UAT-013 portrait-native background integration and visual evidence
- landscape background/layout/interaction
- P0-A/P0-B/P0-D/layering/sharpness/tap-safety/phone-landscape calculator behavior
- business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export semantics

## DO NOT REPEAT
- do not regenerate UAT-013 art
- do not rebuild/remap the verified UAT-013 binary
- do not recreate removed UAT-013 repair staging/chunks/workflow
- do not alter landscape behavior without concrete regression evidence
- do not touch accepted character binaries
- do not rerun failed runs `36101969064`, `36102366681`, or `36102894216`
- do not reopen `qa/ui-qa-runner.mjs`, `qa/top-composition-v1-contract.mjs`, or `qa/long-list-rhythm-v1-contract.mjs` without new regression evidence
- do not rerun successful UAT-013 UI QA run `36103333988`
- do not repeat UAT-013 artifact review unless new regression evidence appears
- do not touch UAT-011 staging/workflow as part of UAT-013 work

## EXACT NEXT ACTION
USER FINAL HANDS-ON REVIEW ONLY:
1. User reviews the current deployed UI on the actual target device(s), especially phone portrait UAT-013 composition.
2. If no concrete defect is observed, UAT-013 is complete and no further repository modification is required.
3. If a concrete defect is observed, capture exact device/orientation/screenshot/behavior evidence first, persist the new blocker in `CURRENT_HANDOFF.md`, then change only the implicated scope.

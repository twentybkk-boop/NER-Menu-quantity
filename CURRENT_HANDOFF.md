# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-014 LANDSCAPE BACKGROUND REPLACEMENT APPROVED; INTEGRATION NEXT

UAT-013 portrait background remains accepted and must not be reopened.

Latest user final hands-on review found one new concrete defect only: **landscape background still does not look right**. User approved a new cleaner landscape-native sunset terrace / hot-pot background generated in the current session and asked to use that exact approved image as the landscape background.

No business/runtime/recipe/quantity/character behavior change is requested.

## UAT-014 USER-APPROVED LANDSCAPE ASSET — READY TO MAP
Approved source image from current session:
- generated image selected by user before integration request
- dimensions: 1672x941 RGB
- source PNG SHA256: `51977e153672715fca9b82b8844c0a442756ec0cc7fc8b4b46267f4fdf80bc58`

Prepared production WebP candidate:
- target path: `assets/background-landscape-garden-v1.webp`
- dimensions: 1672x941 RGB
- size: 185,146 bytes
- SHA256: `d61b6f6ea01b8c673b903c3098391742c852d3c8191c4d3e98f65efa4564c39d`

Evidence / root cause:
- current `assets/visual-uat-v4-chunk1.css` landscape media query still maps `body::before` to legacy `background-master.webp`
- portrait media query correctly maps accepted `background-portrait-garden-v1.webp`
- therefore the new defect is isolated to the landscape art source, not portrait, character binaries, layout, business logic, or calculator semantics

Minimum intended change:
1. add the approved binary as `assets/background-landscape-garden-v1.webp`
2. map only landscape `body::before` image layer to that new asset using `cover`
3. keep portrait mapping unchanged
4. update only orientation/layering QA assumptions that explicitly require `background-master.webp` for landscape
5. preserve all previously accepted landscape layout, masthead protection, character placement, calculator behavior, and interaction behavior

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
- no concrete portrait regression found

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

Post-cleanup tree verification:
- `repair-staging/uat013` is gone
- `repair-staging/` contains only the separate accepted UAT-011 staging
- `.github/workflows/repair-uat013-portrait-background.yml` is gone
- `.github/workflows/` retains the separate UAT-011 repair workflow and durable `ui-qa.yml`
- UAT-011 staging/workflow were not touched

Final UAT-013 handoff checkpoint before new landscape feedback:
- `4def958bc18f6950c085a78d8111dfb5a0b64831` — `Checkpoint UAT-013 ready for user final review`

## ACCEPTED / DO NOT REOPEN
- UAT-011 character cutout cleanup
- V4 Chunk 1–4 acceptance except landscape art source now explicitly reopened by user feedback
- UAT-013 portrait-native background integration and visual evidence
- landscape layout/interaction/masthead protection/character placement/calculator behavior (art source only is reopened)
- P0-A/P0-B/P0-D/layering/sharpness/tap-safety/phone-landscape calculator behavior
- business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export semantics

## DO NOT REPEAT
- do not regenerate UAT-013 portrait art
- do not rebuild/remap the verified UAT-013 portrait binary
- do not recreate removed UAT-013 repair staging/chunks/workflow
- do not alter landscape layout/interaction beyond the user-reported background art source without concrete regression evidence
- do not touch accepted character binaries
- do not rerun failed runs `36101969064`, `36102366681`, or `36102894216`
- do not reopen portrait QA fixes without new portrait regression evidence
- do not rerun successful UAT-013 UI QA run `36103333988`
- do not repeat UAT-013 portrait artifact review unless new portrait regression evidence appears
- do not touch UAT-011 staging/workflow as part of UAT-014 work

## EXACT NEXT ACTION
1. Add the user-approved prepared WebP binary at `assets/background-landscape-garden-v1.webp` and verify exact size/hash after repository mapping.
2. Change only the landscape background image source in `assets/visual-uat-v4-chunk1.css` to `background-landscape-garden-v1.webp`; keep portrait mapping unchanged.
3. Update only QA assertions/deployment readiness checks that explicitly require the legacy `background-master.webp` for landscape.
4. Trigger resulting UI QA naturally via the commit; inspect the first resulting run once, no polling loop.
5. If automation passes, inspect targeted phone/iPad landscape local/live screenshots before declaring UAT-014 ready for user review.

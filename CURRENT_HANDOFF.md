# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-014 LANDSCAPE INTEGRATION CI-PASS; VISUAL ARTIFACT REVIEW NEXT

UAT-013 portrait background remains accepted and must not be reopened.

## UAT-014 APPROVED LANDSCAPE ASSET — DURABLE
- production path: `assets/background-landscape-garden-v1.webp`
- production derivative: 960x540 RGB, 41,838 bytes
- SHA256: `b6e84af07f0d51c0f9a68a7dc0471c8bdd121f0ec0cc78cb1b0abbff86f10819`
- production blob: `990785f01074764ad80c7a03cc18fe363d19b7a7`
- integration commit: `19e526d618373839a571d7cd0872ce8d18831757`
- landscape maps this asset with `cover`, center/center
- portrait remains mapped to `background-portrait-garden-v1.webp`

## RUN 151 FAILURE — RESOLVED
- run `36106680864` / 151 failed only because `qa/uat013-portrait-background-contract.mjs` still expected legacy `background-master.webp` for landscape.
- all earlier gates, including UAT-014 orientation/layering cases, passed.
- root-cause checkpoint: `1cea51f437caec346626c769c2c59da09cde07a4`

## STALE UAT-013 QA FIX — DURABLE
- fix commit: `249a0c53bcd6c49751ebef394f535945c66196a7`
- changed exactly one file: `qa/uat013-portrait-background-contract.mjs`
- portrait assertions preserved
- landscape now requires `background-landscape-garden-v1.webp`, rejects portrait asset and legacy `background-master.webp`
- live readiness waits for current portrait + landscape assets
- no product CSS/assets/runtime/business logic changed

## RESULTING UI QA RUN 152 — COMPLETED / SUCCESS
- run ID: `36107928193`
- run number: 152
- head SHA: `249a0c53bcd6c49751ebef394f535945c66196a7`
- display title: `Update UAT-013 QA for approved UAT-014 landscape background`
- event: `push`
- status: `completed`
- conclusion: `success`
- updated/completed at: `2026-09-25T07:34:21Z`

## UAT-013 PORTRAIT — VERIFIED DURABLE / DO NOT REOPEN
- production path: `assets/background-portrait-garden-v1.webp`
- SHA256: `050777632f5fcd1c9217777e4925041633699f52ad37636aeb100a08226ad823`
- final UAT-013 UI QA run `36103333988` / run 150: completed/success
- targeted portrait local/live evidence was byte-identical and pixel-identical
- all three approved characters present together; approved upper-left character remains without glasses

## ACCEPTED / DO NOT REOPEN
- UAT-011 character cutout cleanup
- UAT-013 portrait background integration + evidence
- V4 Chunk 1–4 behavior except landscape art source replaced by UAT-014
- landscape layout/interaction/masthead protection/character placement/calculator behavior
- P0-A/P0-B/P0-D/layering/sharpness/tap-safety
- business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export semantics

## DO NOT REPEAT
- do not regenerate/remap accepted portrait art
- do not alter landscape product CSS/layout/interaction without new product regression evidence
- do not touch accepted character binaries
- do not reopen `qa/uat013-portrait-background-contract.mjs` without new evidence
- do not rerun runs 150/151/152

## EXACT NEXT ACTION
1. Fetch run 152 `ui-qa-screenshots` artifact only.
2. Download that artifact.
3. Inspect local/live landscape evidence: `29-phone-landscape-layering-v1@2x.png`, `29-ipad-landscape-layering-v1@2x.png`, `29-ipad-wide-landscape-layering-v1@2x.png` and their `live-` counterparts; inspect landscape calculator screenshot only if useful.
4. Verify local/live equivalence and manually confirm the user-approved landscape scene integrates cleanly with characters/UI.
5. If clean, persist `UAT-014 READY FOR USER REVIEW`.

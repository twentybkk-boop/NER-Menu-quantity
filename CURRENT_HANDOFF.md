# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-014 INTEGRATED; STALE UAT-013 QA FIX DURABLE; UI QA RUN 152 STILL IN PROGRESS

UAT-013 portrait background remains accepted and must not be reopened.

## UAT-014 USER-APPROVED LANDSCAPE ASSET — VERIFIED MAPPED
- approved source: 1672x941 RGB
- source PNG SHA256: `51977e153672715fca9b82b8844c0a442756ec0cc7fc8b4b46267f4fdf80bc58`
- production path: `assets/background-landscape-garden-v1.webp`
- production derivative: 960x540 RGB, 41,838 bytes
- production SHA256: `b6e84af07f0d51c0f9a68a7dc0471c8bdd121f0ec0cc78cb1b0abbff86f10819`
- production blob: `990785f01074764ad80c7a03cc18fe363d19b7a7`

## UAT-014 PRODUCT / QA INTEGRATION — VERIFIED ON MAIN
Integration commit:
- `19e526d618373839a571d7cd0872ce8d18831757` — `Integrate approved UAT-014 landscape background`

Integration diff was verified to contain exactly four paths:
1. `assets/background-landscape-garden-v1.webp`
2. `assets/visual-uat-v4-chunk1.css`
3. `qa/ui-qa-runner.mjs`
4. `qa/layering-orientation-v1-contract.mjs`

Current behavior:
- portrait maps `background-portrait-garden-v1.webp` with `cover`
- landscape maps `background-landscape-garden-v1.webp` with `cover`, centered
- accepted masthead protection / character rails / center-frame geometry remain intact
- business/runtime/recipe/quantity/Matrix/PIN/calculator semantics were not changed

## RUN 151 FAILURE — ROOT CAUSE RESOLVED
Run:
- ID `36106680864`, run 151
- head `19e526d618373839a571d7cd0872ce8d18831757`
- completed/failure

All gates before the first failure passed, including base Chromium/WebKit QA, P0-A, P0-B, P0-D top/long-list, thumbnail semantics, Chunk 4 polish, and orientation/layering including UAT-014 landscape cases.

First failed required step:
- `Verify UAT-013 portrait-native background locally`
- stale assertion in `qa/uat013-portrait-background-contract.mjs` expected legacy `background-master.webp` for landscape
- actual correct landscape asset was `background-landscape-garden-v1.webp`
- root cause was stale QA only, not product CSS/asset/runtime regression

Root-cause checkpoint before edit:
- `1cea51f437caec346626c769c2c59da09cde07a4`

## STALE UAT-013 QA FIX — DURABLE
Fix commit:
- `249a0c53bcd6c49751ebef394f535945c66196a7` — `Update UAT-013 QA for approved UAT-014 landscape background`
- changed exactly one file: `qa/uat013-portrait-background-contract.mjs`

Fix scope:
- existing portrait assertions preserved
- landscape requires `background-landscape-garden-v1.webp`
- landscape rejects portrait asset and legacy `background-master.webp`
- live readiness waits for current portrait + landscape assets / UAT-013 + UAT-014 CSS markers
- no product CSS/assets/runtime/business logic changed

## RESULTING UI QA RUN 152 — STILL IN PROGRESS
- run ID: `36107928193`
- run number: 152
- head SHA: `249a0c53bcd6c49751ebef394f535945c66196a7`
- display title: `Update UAT-013 QA for approved UAT-014 landscape background`
- event: `push`
- status at the single bounded read in this continuation session: `in_progress`
- conclusion: not final
- created/started reported by GitHub: `2026-09-25T07:29:52Z`
- updated_at reported by GitHub at bounded read: `2026-09-25T07:29:55Z`
- do not poll run 152 again in this same session

## UAT-013 PORTRAIT — VERIFIED DURABLE / DO NOT REOPEN
- production path: `assets/background-portrait-garden-v1.webp`
- SHA256: `050777632f5fcd1c9217777e4925041633699f52ad37636aeb100a08226ad823`
- final UAT-013 UI QA run `36103333988` / run 150: completed/success
- targeted portrait local/live evidence was byte-identical and pixel-identical
- all three approved characters present together; approved upper-left character remains without glasses
- temporary UAT-013 repair staging cleanup commit: `775b628b32810b83b1ccee785eddf5153abd2bfd`

## ACCEPTED / DO NOT REOPEN
- UAT-011 character cutout cleanup
- UAT-013 portrait background integration + evidence
- V4 Chunk 1–4 behavior except the landscape art source replaced by UAT-014
- landscape layout/interaction/masthead protection/character placement/calculator behavior
- P0-A/P0-B/P0-D/layering/sharpness/tap-safety
- business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export semantics

## DO NOT REPEAT
- do not regenerate/remap accepted portrait art
- do not recreate removed UAT-013 repair staging/chunks/workflow
- do not alter landscape product CSS/layout/interaction without new product regression evidence
- do not touch accepted character binaries
- do not reopen `qa/uat013-portrait-background-contract.mjs` without new evidence from run 152 or later
- do not rerun successful UAT-013 run `36103333988`
- do not rerun failed run 151 `36106680864`
- do not poll run 152 `36107928193` again in this same session

## EXACT NEXT ACTION
1. In the next continuation session, re-read current `main` + this handoff first.
2. Read UI QA run `36107928193` exactly once.
3. If still `queued` / `in_progress`: persist current status and STOP; no polling loop.
4. If `failure`: inspect only the first failed required step/log and persist exact blocker before any edit.
5. If `success`: persist automation-success checkpoint, then download only `ui-qa-screenshots` for run 152.
6. Inspect targeted local/live landscape evidence: `29-phone-landscape-layering-v1@2x.png`, `29-ipad-landscape-layering-v1@2x.png`, `29-ipad-wide-landscape-layering-v1@2x.png` and their `live-` counterparts; inspect landscape calculator screenshot if useful.
7. Verify local/live equivalence plus manual visual integration of the user-approved landscape scene. If clean, persist `UAT-014 READY FOR USER REVIEW`.

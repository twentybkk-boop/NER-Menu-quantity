# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-014 LANDSCAPE BACKGROUND INTEGRATED; UI QA RUN 151 IN PROGRESS

UAT-013 portrait background remains accepted and must not be reopened.

Latest user final hands-on review found one new concrete defect only: **landscape background still did not look right**. User approved a cleaner landscape-native sunset terrace / hot-pot background generated in the current session and asked to use that exact approved image as the landscape background.

## UAT-014 USER-APPROVED LANDSCAPE ASSET — VERIFIED MAPPED
Approved source image:
- dimensions: 1672x941 RGB
- source PNG SHA256: `51977e153672715fca9b82b8844c0a442756ec0cc7fc8b4b46267f4fdf80bc58`

Production derivative actually integrated:
- path: `assets/background-landscape-garden-v1.webp`
- dimensions: 960x540 RGB
- size: 41,838 bytes
- SHA256: `b6e84af07f0d51c0f9a68a7dc0471c8bdd121f0ec0cc78cb1b0abbff86f10819`
- production blob: `990785f01074764ad80c7a03cc18fe363d19b7a7`
- integration commit: `3376af34f12adf33b41c6e91297321e1e6bc49b7`

Note: an earlier 1672x941 q88 WebP candidate was prepared during investigation but was **not** integrated. The 960x540 derivative above is the actual production source of truth.

## UAT-014 PRODUCT / QA INTEGRATION — SCOPE VERIFIED
Integration commit:
- `3376af34f12adf33b41c6e91297321e1e6bc49b7` — `Integrate approved UAT-014 landscape background`
- fast-forwarded to `main` with `force=false`

Pre-merge compare verified exactly four changed paths:
1. `assets/background-landscape-garden-v1.webp` — added
2. `assets/visual-uat-v4-chunk1.css` — landscape art source only + lighter landscape veil / center positioning
3. `qa/ui-qa-runner.mjs` — orientation-aware background assertions updated
4. `qa/layering-orientation-v1-contract.mjs` — landscape asset/deployment readiness assertions updated

Product behavior:
- portrait continues to require `background-portrait-garden-v1.webp`
- landscape now requires `background-landscape-garden-v1.webp`
- legacy `background-master.webp` is rejected in both orientation-specific QA branches
- landscape remains `cover`
- accepted masthead protection, rails, character geometry, menu/business/runtime/calculator semantics remain unchanged

## UAT-014 RESULTING UI QA — RUNNING
- UI QA run `36110104415`
- run number 151
- head SHA `3376af34f12adf33b41c6e91297321e1e6bc49b7`
- display title: `Integrate approved UAT-014 landscape background`
- event: `push`
- status at bounded read: `in_progress`
- conclusion at bounded read: not final
- created at `2026-09-25T07:13:04Z`
- updated at bounded read `2026-09-25T07:13:08Z`
- read once in this session; do not poll again in the same session

Pages build/deployment for the same integration head was also present as run `36110104256`, status `in_progress` at the same bounded Actions read. No polling loop performed.

## APPROVED UAT-013 ASSET — VERIFIED MAPPED
- production path: `assets/background-portrait-garden-v1.webp`
- dimensions: 941x1672 RGB
- size: 125,912 bytes
- SHA256: `050777632f5fcd1c9217777e4925041633699f52ad37636aeb100a08226ad823`
- repair run `36101535008` — completed/success
- mapping commit `1d7a134e8cfc595f5633bc3a7cb7614cdb1bf4a4`
- production blob `30437127857f50d217f12451f9ecff8ec61a9ef9`

## UAT-013 PRODUCT INTEGRATION — VERIFIED DURABLE
- portrait uses `background-portrait-garden-v1.webp`
- portrait image layer uses `cover`, centered top
- dedicated portrait contract and all prior portrait QA remain accepted
- final UAT-013 UI QA run `36103333988` / run 150 completed `success`

## UAT-013 VISUAL ARTIFACT REVIEW — VERIFIED ACCEPTED
- artifact `ui-qa-screenshots`, ID `10850046829`
- targeted local/live portrait screenshots were byte-identical and pixel-identical
- all four targeted portrait image SHA256: `8f2f0aac56eb5cebc4b7852571590a233cb891fb3f4b77d2f3c23079c4bf4461`
- all three approved characters present together
- approved upper-left character remains without glasses

## UAT-013 TEMPORARY REPAIR CLEANUP — VERIFIED COMPLETE
- cleanup commit `775b628b32810b83b1ccee785eddf5153abd2bfd`
- exactly 16 temporary UAT-013 repair paths removed
- UAT-011 staging/workflow untouched
- prior final portrait checkpoint: `4def958bc18f6950c085a78d8111dfb5a0b64831`

## ACCEPTED / DO NOT REOPEN
- UAT-011 character cutout cleanup
- V4 Chunk 1–4 acceptance except the landscape art source explicitly reopened and replaced by UAT-014
- UAT-013 portrait-native background integration and visual evidence
- landscape layout/interaction/masthead protection/character placement/calculator behavior (only art source changed)
- P0-A/P0-B/P0-D/layering/sharpness/tap-safety/phone-landscape calculator behavior
- business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export semantics

## DO NOT REPEAT
- do not regenerate UAT-013 portrait art
- do not rebuild/remap the verified UAT-013 portrait binary
- do not recreate removed UAT-013 repair staging/chunks/workflow
- do not alter landscape layout/interaction beyond the UAT-014 art source without concrete regression evidence
- do not touch accepted character binaries
- do not rerun failed UAT-013 runs `36101969064`, `36102366681`, or `36102894216`
- do not reopen portrait QA fixes without new portrait regression evidence
- do not rerun successful UAT-013 UI QA run `36103333988`
- do not touch UAT-011 staging/workflow as part of UAT-014 work
- do not poll UAT-014 UI QA run `36110104415` again in this same session

## EXACT NEXT ACTION
1. In the next continuation session, re-read current `main` + this handoff first.
2. Read UI QA run `36110104415` exactly once.
3. If still running: persist status and STOP; no polling loop.
4. If failure: inspect only the first failed required step/log and checkpoint exact blocker before any further edit.
5. If success: persist automation-success checkpoint, then download only `ui-qa-screenshots`.
6. Inspect targeted local/live landscape screenshots: phone landscape, iPad landscape, iPad wide landscape, plus landscape calculator evidence if useful.
7. Verify local/live equivalence and manual integration of the user-approved landscape scene; if clean, persist `UAT-014 READY FOR USER REVIEW`.

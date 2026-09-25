# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-014 LANDSCAPE BACKGROUND INTEGRATED; UI QA RUN 151 IN PROGRESS

UAT-013 portrait background remains accepted and must not be reopened.

Latest user hands-on feedback reopened exactly one area: the **landscape background art source**. User approved a cleaner landscape-native sunset terrace / hot-pot image generated in the current session and explicitly asked to use that approved image as the landscape background.

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

An earlier 1672x941 q88 WebP candidate was prepared during investigation but was **not** integrated. The 960x540 derivative above is the actual production asset source of truth.

## UAT-014 PRODUCT / QA INTEGRATION — VERIFIED ON MAIN
Actual integration commit on `main`:
- `19e526d618373839a571d7cd0872ce8d18831757` — `Integrate approved UAT-014 landscape background`
- parent: `c5d2f9e28389385a22bf13c2b57a6956b8ccbe23`
- tree: `4dc24662f96f530a29854849ba6a4db123e88443`
- fast-forwarded to `main` with `force=false`

Historical sequencing note:
- detached staging commit `3376af34f12adf33b41c6e91297321e1e6bc49b7` contained the same four intended integration paths but was never the production branch head.
- a checkpoint sequencing mistake was detected by re-reading current `main`; history was not rewritten. The same verified four blobs were committed on top of the real checkpoint as `19e526d6...`.

Verified integration diff contains exactly four paths:
1. `assets/background-landscape-garden-v1.webp` — added
2. `assets/visual-uat-v4-chunk1.css` — landscape art source + lighter landscape veil / center positioning
3. `qa/ui-qa-runner.mjs` — orientation-aware background assertions updated
4. `qa/layering-orientation-v1-contract.mjs` — landscape asset/deployment readiness assertions updated

Current CSS behavior on `main`:
- portrait still maps `background-portrait-garden-v1.webp`
- portrait remains `cover`
- landscape maps `background-landscape-garden-v1.webp`
- landscape uses `cover`, positioned center/center
- accepted masthead protection remains present

QA intent:
- portrait rejects landscape asset and legacy master
- landscape requires `background-landscape-garden-v1.webp` and rejects portrait asset + legacy `background-master.webp`
- orientation/layering live readiness verifies both portrait and landscape assets are deployed
- accepted character rails, center-frame geometry, business/runtime/recipe/quantity/Matrix/PIN/calculator semantics were not changed

## UAT-014 RESULTING UI QA — BOUNDED READ
Actual resulting UI QA:
- run ID: `36106680864`
- run number: 151
- head SHA: `19e526d618373839a571d7cd0872ce8d18831757`
- display title: `Integrate approved UAT-014 landscape background`
- event: `push`
- status at the single bounded read in this continuation session: `in_progress`
- conclusion: not final
- created/started: `2026-09-25T07:14:56Z`
- updated at bounded read: `2026-09-25T07:15:36Z`
- do not poll this run again in the same session

Incorrect provisional run IDs `36110104415` / `36110104256` are invalid for UAT-014 production state and must not be reused.

## UAT-013 PORTRAIT — VERIFIED DURABLE / DO NOT REOPEN
- production path: `assets/background-portrait-garden-v1.webp`
- dimensions: 941x1672 RGB
- size: 125,912 bytes
- SHA256: `050777632f5fcd1c9217777e4925041633699f52ad37636aeb100a08226ad823`
- production blob: `30437127857f50d217f12451f9ecff8ec61a9ef9`
- final UAT-013 UI QA run `36103333988` / run 150: completed/success
- artifact `ui-qa-screenshots`, ID `10850046829`
- targeted portrait local/live evidence was byte-identical and pixel-identical
- all three approved characters present together; approved upper-left character remains without glasses
- temporary UAT-013 repair staging cleanup commit: `775b628b32810b83b1ccee785eddf5153abd2bfd`
- prior portrait final checkpoint: `4def958bc18f6950c085a78d8111dfb5a0b64831`

## ACCEPTED / DO NOT REOPEN
- UAT-011 character cutout cleanup
- UAT-013 portrait-native background integration and visual evidence
- V4 Chunk 1–4 behavior except landscape art source, now replaced by UAT-014
- landscape layout/interaction/masthead protection/character placement/calculator behavior; only landscape art source was reopened
- P0-A/P0-B/P0-D/layering/sharpness/tap-safety/phone-landscape calculator behavior
- business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export semantics

## DO NOT REPEAT
- do not regenerate or remap accepted portrait art
- do not recreate removed UAT-013 repair staging/chunks/workflow
- do not alter landscape layout/interaction beyond UAT-014 without concrete regression evidence
- do not touch accepted character binaries
- do not reopen portrait QA fixes without new portrait regression evidence
- do not rerun successful UAT-013 UI QA run `36103333988`
- do not touch UAT-011 staging/workflow as part of UAT-014
- do not use detached staging SHA `3376af34...` as production source of truth
- do not use provisional/invalid UAT-014 run IDs `36110104415` or `36110104256`
- do not poll actual UAT-014 UI QA run `36106680864` again in this same session

## EXACT NEXT ACTION
1. In the next continuation session, re-read current `main` + this handoff first.
2. Read actual UAT-014 UI QA run `36106680864` exactly once.
3. If still `queued` / `in_progress`: persist current status and STOP; no polling loop.
4. If `failure`: inspect only the first failed required step/log and persist exact blocker before any further edit.
5. If `success`: persist automation-success checkpoint, then download only `ui-qa-screenshots`.
6. Inspect targeted local/live landscape evidence: `29-phone-landscape-layering-v1@2x.png`, `29-ipad-landscape-layering-v1@2x.png`, `29-ipad-wide-landscape-layering-v1@2x.png` and their `live-` counterparts; inspect landscape calculator screenshot if useful.
7. Verify local/live equivalence plus manual visual integration of the user-approved landscape scene. If clean, persist `UAT-014 READY FOR USER REVIEW`.

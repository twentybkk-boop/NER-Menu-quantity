# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-014 LANDSCAPE BACKGROUND INTEGRATED; STALE UAT-013 QA FIX DURABLE; UI QA RUN 152 IN PROGRESS

UAT-013 portrait background remains accepted and must not be reopened.

Latest user hands-on feedback reopened exactly one area: the **landscape background art source**. User approved a cleaner landscape-native sunset terrace / hot-pot image and explicitly asked to use that approved image as the landscape background.

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

## UAT-014 UI QA RUN 151 — FAILURE ROOT CAUSE RESOLVED
Run:
- run ID: `36106680864`
- run number: 151
- head SHA: `19e526d618373839a571d7cd0872ce8d18831757`
- status: `completed`
- conclusion: `failure`
- completed/updated at: `2026-09-25T07:17:54Z`

All required steps before the failure passed, including:
- base Chromium + WebKit UI QA
- P0-A complete character composition
- P0-B protected center frame
- P0-D top composition local
- P0-D long-list rhythm local
- V4 thumbnail semantics/density local
- V4 Chunk 4 polish local
- orientation layering/backmost environment local, including UAT-014 landscape cases

First failed required step:
- `Verify UAT-013 portrait-native background locally`
- command: `node qa/uat013-portrait-background-contract.mjs`
- failure at `qa/uat013-portrait-background-contract.mjs:86`
- assertion: `chromium/phone-landscape/local: accepted landscape master missing`
- stale expected value: `/background-master\.webp/`
- actual correct landscape background: `background-landscape-garden-v1.webp`

Exact root cause:
- `qa/uat013-portrait-background-contract.mjs` correctly protected UAT-013 portrait art but still contained the pre-UAT-014 landscape assertion requiring legacy `background-master.webp`.
- this was a stale QA contract caused by the approved UAT-014 landscape art replacement, not a product regression.

Root-cause checkpoint before edit:
- `1cea51f437caec346626c769c2c59da09cde07a4` — `Checkpoint UAT-014 run 151 stale UAT-013 QA root cause`

## UAT-014 STALE UAT-013 QA FIX — DURABLE
QA-only fix commit:
- `249a0c53bcd6c49751ebef394f535945c66196a7` — `Update UAT-013 QA for approved UAT-014 landscape background`
- changed exactly one file: `qa/uat013-portrait-background-contract.mjs`

Fix scope:
- every existing UAT-013 portrait assertion remains unchanged
- landscape branch now requires `background-landscape-garden-v1.webp`
- landscape branch rejects `background-portrait-garden-v1.webp`
- landscape branch rejects legacy `background-master.webp`
- live deployment readiness now waits for both current portrait and landscape assets and UAT-013/UAT-014 CSS markers
- no product CSS/assets/runtime/business logic changed

## RESULTING UI QA RUN 152 — IN PROGRESS
- run ID: `36107928193`
- run number: 152
- head SHA: `249a0c53bcd6c49751ebef394f535945c66196a7`
- display title: `Update UAT-013 QA for approved UAT-014 landscape background`
- event: `push`
- status at the single bounded read in this continuation session: `in_progress`
- conclusion: not final
- created/started: `2026-09-25T07:29:52Z`
- updated at bounded read: `2026-09-25T07:29:55Z`
- do not poll this run again in the same session

Run 151 artifact uploaded despite failure:
- `ui-qa-screenshots`
- artifact ID `10852050473`
- artifact ZIP SHA256 reported by Actions: `3ab9cf1e467a52b027c7b7258e7ccfddd0f1f442677032ae9e6c9bb53566db3f`

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
- do not alter landscape product CSS/layout/interaction without new product regression evidence
- do not touch accepted character binaries
- do not reopen `qa/uat013-portrait-background-contract.mjs` again without new evidence from run 152 or later
- do not rerun successful UAT-013 UI QA run `36103333988`
- do not touch UAT-011 staging/workflow as part of UAT-014
- do not use detached staging SHA `3376af34...` as production source of truth
- do not use provisional/invalid UAT-014 run IDs `36110104415` or `36110104256`
- do not rerun failed run `36106680864`
- do not poll run `36107928193` again in the same session

## EXACT NEXT ACTION
1. In the next continuation session, re-read current `main` + this handoff first.
2. Read UI QA run `36107928193` exactly once.
3. If still `queued` / `in_progress`: persist current status and STOP; no polling loop.
4. If `failure`: inspect only the first failed required step/log and persist exact blocker before any further edit.
5. If `success`: persist automation-success checkpoint, then download only `ui-qa-screenshots` for run 152.
6. Inspect targeted local/live landscape evidence: `29-phone-landscape-layering-v1@2x.png`, `29-ipad-landscape-layering-v1@2x.png`, `29-ipad-wide-landscape-layering-v1@2x.png` and their `live-` counterparts; inspect landscape calculator screenshot if useful.
7. Verify local/live equivalence plus manual visual integration of the user-approved landscape scene. If clean, persist `UAT-014 READY FOR USER REVIEW`.

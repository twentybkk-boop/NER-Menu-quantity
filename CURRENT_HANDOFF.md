# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-014 CI-PASS BUT VISUAL REVIEW FOUND WRONG LANDSCAPE BINARY

UAT-013 portrait background remains accepted and must not be reopened.

## UAT-014 INTENDED / USER-APPROVED LANDSCAPE ASSET
Approved source image:
- source PNG: 1672x941 RGB
- SHA256: `51977e153672715fca9b82b8844c0a442756ec0cc7fc8b4b46267f4fdf80bc58`

Approved production derivative prepared locally:
- local filename: `bg_960_q50.webp`
- intended repo path: `assets/background-landscape-garden-v1.webp`
- 960x540 RGB
- size: 41,838 bytes
- SHA256: `b6e84af07f0d51c0f9a68a7dc0471c8bdd121f0ec0cc78cb1b0abbff86f10819`
- exact Git blob SHA calculated from these bytes: `6183aecb8d4469b137edaa3ffb95d8cf7e8ec2bc`

## CURRENT GITHUB LANDSCAPE BINARY — VERIFIED WRONG
Current `main` path `assets/background-landscape-garden-v1.webp` is NOT the approved derivative above.
GitHub reports:
- size: 15,009 bytes
- actual repo blob SHA: `990785f01074764ad80c7a03cc18fe363d19b7a7`
- therefore it cannot be the 41,838-byte approved derivative

This corrects an earlier handoff inconsistency that incorrectly paired approved derivative metadata (41,838 bytes / SHA256 `b6e84af0...`) with repo blob `990785f0...`.

## UAT-014 CSS / QA MAPPING — STILL VALID
Integration commit:
- `19e526d618373839a571d7cd0872ce8d18831757`

Current CSS correctly maps landscape to `background-landscape-garden-v1.webp` and portrait to `background-portrait-garden-v1.webp`.
The issue is the bytes behind the landscape path, not the selector/orientation mapping.

Stale UAT-013 QA fix:
- `249a0c53bcd6c49751ebef394f535945c66196a7`
- changed only `qa/uat013-portrait-background-contract.mjs`

## UI QA RUN 152 — COMPLETED / SUCCESS
- run ID: `36107928193`
- run number: 152
- head SHA: `249a0c53bcd6c49751ebef394f535945c66196a7`
- status: `completed`
- conclusion: `success`
- artifact: `ui-qa-screenshots`, ID `10851394527`

Automation success proves structural/orientation contracts, but manual visual review found the binary defect below.

## RUN 152 VISUAL REVIEW — FAILED UAT-014 VISUAL GOAL
Targeted local/live screenshot pairs were byte-identical and pixel-identical:
- phone landscape: SHA256 `44aa330fdd21bbaa727410cfb159573e6a05ab993bfef6ba904f0f0244f549b9`
- iPad landscape: SHA256 `7a906a81ab6001460d9657b032ad1e3d1e087170a4163c58bb936222abe4837d`
- iPad wide landscape: SHA256 `f239847aa19ea2511d4877866b986ca47f13cde47f9494dbd3f1933fed46ea9e`

Manual review:
- local/live deployment equivalence is good
- all three characters remain present and layout remains stable
- BUT the approved sunset terrace / hot-pot scene is not visibly present; the page reads as cream background with ambient circles

Exact root cause:
- wrong binary bytes are stored at `assets/background-landscape-garden-v1.webp`
- CSS/QA correctly reference the path, so automation can pass while the intended artwork is absent

## UAT-013 PORTRAIT — VERIFIED DURABLE / DO NOT REOPEN
- `assets/background-portrait-garden-v1.webp`
- SHA256 `050777632f5fcd1c9217777e4925041633699f52ad37636aeb100a08226ad823`
- run 150 `36103333988`: completed/success
- portrait local/live visual evidence accepted

## ACCEPTED / DO NOT REOPEN
- UAT-011 character cleanup
- UAT-013 portrait background + evidence
- landscape layout/interaction/masthead/character placement/calculator behavior
- P0-A/P0-B/P0-D/layering/sharpness/tap-safety
- business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export semantics

## DO NOT REPEAT
- do not regenerate the approved landscape source image
- do not change landscape layout/interaction to solve this binary defect
- do not alter portrait mapping/assets
- do not touch accepted character binaries
- do not reopen the stale UAT-013 QA fix without new QA evidence

## EXACT NEXT ACTION
1. Replace only `assets/background-landscape-garden-v1.webp` with exact approved derivative `bg_960_q50.webp` bytes.
2. Verify repository path is exactly 41,838 bytes, SHA256 `b6e84af07f0d51c0f9a68a7dc0471c8bdd121f0ec0cc78cb1b0abbff86f10819`, Git blob SHA `6183aecb8d4469b137edaa3ffb95d8cf7e8ec2bc`.
3. Do not modify CSS/layout/portrait/characters unless new evidence requires it.
4. Read resulting UI QA run once.
5. On success, download the new `ui-qa-screenshots` artifact and re-review phone/iPad/iPad-wide landscape local/live.
6. If the approved sunset terrace scene is visibly integrated and local/live match, persist `UAT-014 READY FOR USER REVIEW`.

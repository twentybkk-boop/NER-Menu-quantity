# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-014 R1 COMPLETE; READY FOR FRESH UI QA / VISUAL REVIEW

UAT-013 portrait remains accepted. Do not reopen it.

## R1 — APPROVED LANDSCAPE BINARY REPAIR COMPLETE
Approved production asset:
- path: `assets/background-landscape-garden-v1.webp`
- dimensions: 960x540 RGB
- exact size: 41,838 bytes
- SHA256: `b6e84af07f0d51c0f9a68a7dc0471c8bdd121f0ec0cc78cb1b0abbff86f10819`
- Git blob SHA: `6183aecb8d4469b137edaa3ffb95d8cf7e8ec2bc`

Repair workflow fix:
- `f96a657159a8e6dcf56422bde808b89bd9f56418` — `Fix UAT-014 repair chunk 04 reconstruction`

Final retrigger:
- `efaf059593d0a2477408a8c4d3867f1e04b75c8b` — `Retrigger exact UAT-014 landscape binary repair`

Successful repair run:
- workflow: `Repair UAT-014 landscape binary`
- run ID: `36112565127`
- status: completed
- conclusion: success

Production repair commit created by GitHub Actions:
- `3d6e50aba15dd862101996e1dc9afaefa6109c3e` — `Repair UAT-014 approved landscape binary`

Current repo metadata verifies the production landscape asset is exactly 41,838 bytes with blob `6183aecb8d4469b137edaa3ffb95d8cf7e8ec2bc`.
GitHub Pages deployment for repair head `3d6e50ab...` completed/success.

## WHY FRESH UI QA IS STILL NEEDED
`.github/workflows/ui-qa.yml` triggers on `assets/**` and supports `workflow_dispatch`, but the production repair commit was pushed by `github-actions[bot]`; no UI QA run was created for that bot push. Only Pages deployment ran.

To obtain fresh review evidence without touching product behavior, use a QA-only trigger file under `qa/**`. This creates a normal user-authored push that triggers `UI QA` while preserving the exact repaired production binary.

## ACCEPTED / DO NOT REOPEN
- UAT-011 character cleanup
- UAT-013 portrait background + evidence
- landscape CSS/orientation mapping
- landscape layout / interaction / masthead / character placement / calculator behavior
- P0-A / P0-B / P0-D / layering / sharpness / tap-safety
- business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export semantics

## DO NOT REPEAT
- do not regenerate approved landscape art
- do not modify CSS/layout/portrait/characters unless fresh regression evidence requires it
- do not use invalid old staging files (`landscape-01.b64`, old `landscape-04.b64`, old `landscape-04b.b64`, dangling blob `fa4eaf09...`)
- do not re-run failed repair run `36111407206`

## EXACT NEXT ACTION
1. Create/update QA-only trigger `qa/uat014-review-trigger.txt` with the repaired product head/blob identity; do not modify product assets/code.
2. Identify the resulting `UI QA` run for that trigger head.
3. Read/run to completion; on failure inspect only first failed required step and persist blocker before edits.
4. On success, download only `ui-qa-screenshots`.
5. Inspect local/live landscape evidence for phone landscape, iPad landscape, and iPad-wide landscape; verify local/live equivalence and manual visual goal: approved warm sunset terrace/hot-pot scene is visibly present, content remains readable, masthead protected, all three approved characters remain present together in accepted placement.
6. If clean, persist `UAT-014 READY FOR USER REVIEW` with run/artifact/hash evidence and stop with review-ready images/evidence.

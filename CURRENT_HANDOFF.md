# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-014 READY FOR USER REVIEW

UAT-013 portrait remains accepted. Do not reopen it absent concrete regression evidence.

## R1 — APPROVED LANDSCAPE BINARY REPAIR COMPLETE
Approved production asset:
- path: `assets/background-landscape-garden-v1.webp`
- exact size: 41,838 bytes
- SHA256: `b6e84af07f0d51c0f9a68a7dc0471c8bdd121f0ec0cc78cb1b0abbff86f10819`
- Git blob SHA: `6183aecb8d4469b137edaa3ffb95d8cf7e8ec2bc`

Repair evidence:
- workflow fix `f96a657159a8e6dcf56422bde808b89bd9f56418`
- final retrigger `efaf059593d0a2477408a8c4d3867f1e04b75c8b`
- repair run `36112565127`: completed/success
- production repair commit `3d6e50aba15dd862101996e1dc9afaefa6109c3e` — `Repair UAT-014 approved landscape binary`
- GitHub Pages deployment for repair head completed/success

## R2 — FRESH UI QA COMPLETE / SUCCESS
QA-only trigger:
- `qa/uat014-review-trigger.txt`
- trigger commit `6b02afdf4987c1d08094de717d31109972a1cff5`
- no product code/assets modified by this trigger

Fresh UI QA:
- run ID: `36113051938`
- run number: 153
- head SHA: `6b02afdf4987c1d08094de717d31109972a1cff5`
- status: completed
- conclusion: success
- all required local and deployed/live gates passed

Artifact:
- name: `ui-qa-screenshots`
- artifact ID: `10854126924`
- size: 100,920,519 bytes
- digest: `sha256:f11625dd227a6707f22c9f7b08ca89710293126698b1626cad06bf68f526e940`

## R3 — VISUAL EVIDENCE REVIEW COMPLETE
Targeted local/live pairs were byte-identical and pixel-identical:

1. Phone landscape
- file: `29-phone-landscape-layering-v1@2x.png`
- dimensions: 1688x780
- SHA256 local/live: `96fd74ca453e0093dc119ab8deb6b25279c8a5c427cac72390e8e36924896c87`

2. iPad landscape
- file: `29-ipad-landscape-layering-v1@2x.png`
- dimensions: 2048x1536
- SHA256 local/live: `772548ab5a965f30127d8ca30132555a6d9b1a20a881717f83354d6a0b02f1a9`

3. iPad wide landscape
- file: `29-ipad-wide-landscape-layering-v1@2x.png`
- dimensions: 2360x1640
- SHA256 local/live: `92548868183924ae2a5968c5447597c6e994e915bc688bf981c1efae4343f101`

4. Phone landscape calculator
- file: `32-phone-landscape-calculator-v4.png`
- dimensions: 1688x780
- SHA256 local/live: `fb6ec287d0931291bc62b0c1b0c5c797c8bc6467d5f774e14b9d406f0a3a5974`

Manual visual review findings:
- approved warm sunset terrace/hot-pot scene is visibly active in landscape; no longer hidden by the old wrong binary
- content/cards remain readable
- masthead protection remains effective
- all three recurring characters are visible together in the accepted composition
- accepted character story remains present: upper-left glasses + drink, lower-left no glasses, right-side white backpack/clipboard
- calculator landscape remains readable and preserves the three-character rails
- portrait was not modified/reopened

## ACCEPTED / DO NOT REOPEN
- UAT-011 character cleanup
- UAT-013 portrait background + evidence
- landscape CSS/orientation mapping
- landscape layout / interaction / masthead / character placement / calculator behavior
- P0-A / P0-B / P0-D / layering / sharpness / tap-safety
- business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export semantics

## DO NOT REPEAT
- do not regenerate approved landscape art
- do not alter portrait/CSS/layout/characters absent new user review feedback or concrete regression evidence
- do not re-run failed repair run `36111407206`
- do not use invalid old staging files (`landscape-01.b64`, old `landscape-04.b64`, old `landscape-04b.b64`, dangling blob `fa4eaf09...`)

## EXACT NEXT ACTION
User review of the fresh run-153 landscape screenshots. If user accepts, mark UAT-014 ACCEPTED and move to the next Phase 1/UAT item from the current GitHub source of truth. If user provides visual corrections, apply only those corrections without reopening accepted unrelated behavior.

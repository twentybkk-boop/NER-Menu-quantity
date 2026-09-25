# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-014 R1A SETUP COMPLETE; EXACT REPAIR TRIGGER IS THE FINAL SETUP COMMIT

UAT-013 portrait remains accepted. Do not reopen it.

## VERIFIED DEFECT
The landscape selector/path is correct, but `assets/background-landscape-garden-v1.webp` currently contains the wrong binary.

Approved production derivative:
- local filename: `bg_960_q50.webp`
- dimensions: 960x540 RGB
- exact size: 41,838 bytes
- SHA256: `b6e84af07f0d51c0f9a68a7dc0471c8bdd121f0ec0cc78cb1b0abbff86f10819`
- expected Git blob SHA: `6183aecb8d4469b137edaa3ffb95d8cf7e8ec2bc`

Wrong production binary before repair:
- path: `assets/background-landscape-garden-v1.webp`
- size: 15,009 bytes
- blob SHA: `990785f01074764ad80c7a03cc18fe363d19b7a7`

Do not change CSS/layout/portrait/characters for this defect.

## R1A STAGING — VERIFIED COMPLETE
The approved binary was base64-staged. One early file `repair-staging/uat014/landscape-01.b64` was truncated to 6,016 chars and MUST NOT be used.

The repair workflow uses ONLY these verified files in this exact order:
1. `landscape-00.b64` — 6,976 chars
2. `landscape-01a.b64` — 3,488 chars
3. `landscape-01b.b64` — 3,488 chars
4. `landscape-02.b64` — 6,976 chars
5. `landscape-03.b64` — 6,976 chars
6. `landscape-04.b64` — 6,976 chars
7. `landscape-05.b64` — 6,976 chars
8. `landscape-06a.b64` — 3,488 chars
9. `landscape-06b.b64` — 3,488 chars
10. `landscape-07a.b64` — 3,476 chars
11. `landscape-07b.b64` — 3,476 chars

Verified total reconstructed base64 length is 55,784 chars.

A dangling blob `fa4eaf09fabd172860ef6133943f98327d3003f5` from an abandoned direct-upload experiment contains only chunk 00, is not referenced by any tree/branch, and MUST NOT be used.

## ONE-SHOT REPAIR WORKFLOW — VERIFIED DURABLE
Workflow:
- `.github/workflows/repair-uat014-landscape-binary.yml`
- setup commit: `970b85045fbbf9551237a48fb41232bdc9efe6db`
- triggers ONLY when `repair-staging/uat014/RUN_EXACT_REPAIR` is pushed
- reconstructs the 11 verified staging files above in explicit order
- ignores corrupt `landscape-01.b64`
- before touching production, verifies exact size 41,838, SHA256 `b6e84af07f0d51c0f9a68a7dc0471c8bdd121f0ec0cc78cb1b0abbff86f10819`, and Git blob `6183aecb8d4469b137edaa3ffb95d8cf7e8ec2bc`
- copies only to `assets/background-landscape-garden-v1.webp`
- repeats all three verifications after copy
- verifies the only working-tree change is the production landscape asset
- commits/pushes only that asset as `Repair UAT-014 approved landscape binary`

## VERIFIED PRIOR RESULTS
- UAT-014 integration: `19e526d618373839a571d7cd0872ce8d18831757`
- stale UAT-013 QA fix: `249a0c53bcd6c49751ebef394f535945c66196a7`
- UI QA run 152 `36107928193`: completed/success
- run 152 artifact `ui-qa-screenshots` ID `10851394527`
- run 152 local/live landscape screenshots matched, but manual visual goal failed because the wrong binary was deployed

## ACCEPTED / DO NOT REOPEN
- UAT-011 character cleanup
- UAT-013 portrait background + evidence
- landscape layout / interaction / masthead / character placement / calculator behavior
- P0-A / P0-B / P0-D / layering / sharpness / tap-safety
- business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export semantics

## SHORT-CHUNK RECOVERY RULE
This handoff is intentionally written immediately BEFORE the final trigger commit to avoid racing the repair workflow with another handoff push.

If `repair-staging/uat014/RUN_EXACT_REPAIR` already exists when resuming, DO NOT recreate it. That means R1A is complete and the next chunk is R1B.

## EXACT NEXT ACTION
1. If `repair-staging/uat014/RUN_EXACT_REPAIR` does not yet exist, create it as the FINAL R1A setup commit and STOP without polling.
2. If it already exists, start **R1B only**: re-read current `main`, identify the one-shot repair workflow run triggered by that file, and read its status exactly once.
3. If repair run is queued/in_progress: persist status and STOP.
4. If repair run fails: inspect only first failed step, persist blocker, STOP before edit.
5. If repair run succeeds: verify `assets/background-landscape-garden-v1.webp` metadata is exactly 41,838 bytes and blob SHA `6183aecb8d4469b137edaa3ffb95d8cf7e8ec2bc`, checkpoint R1 complete, then STOP before UI QA/visual review.

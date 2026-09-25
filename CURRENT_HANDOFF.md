# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-014 WRONG LANDSCAPE BINARY; R1A PARTIAL STAGING DURABLE

UAT-013 portrait remains accepted. Do not reopen it.

## VERIFIED DEFECT
Approved landscape production derivative must replace only `assets/background-landscape-garden-v1.webp`.

Approved derivative:
- local filename: `bg_960_q50.webp`
- dimensions: 960x540 RGB
- exact size: 41,838 bytes
- SHA256: `b6e84af07f0d51c0f9a68a7dc0471c8bdd121f0ec0cc78cb1b0abbff86f10819`
- expected Git blob SHA: `6183aecb8d4469b137edaa3ffb95d8cf7e8ec2bc`

Current wrong production binary:
- path: `assets/background-landscape-garden-v1.webp`
- size: 15,009 bytes
- blob SHA: `990785f01074764ad80c7a03cc18fe363d19b7a7`

CSS/orientation mapping is already correct. Do not change CSS/layout/portrait/characters for this defect.

## R1A PARTIAL STAGING — DURABLE
Short-chunk recovery checkpoint before staging:
- `4a58c819bdf664430d968b0d7c3662c73354f050` — `Checkpoint UAT-014 short-chunk recovery plan`

Approved local bytes were re-verified in the current runtime before staging:
- size: 41,838 bytes
- SHA256: `b6e84af07f0d51c0f9a68a7dc0471c8bdd121f0ec0cc78cb1b0abbff86f10819`
- computed Git blob SHA: `6183aecb8d4469b137edaa3ffb95d8cf7e8ec2bc`

Staging strategy:
- base64 total length: 55,784 chars
- split into 8 ordered chunks: `landscape-00.b64` … `landscape-07.b64`
- first 7 chunks are 6,976 chars each; final chunk is 6,952 chars
- trigger must NOT be created until all chunks and repair workflow exist

Durable staging completed so far:
- `repair-staging/uat014/landscape-00.b64`
- commit `d820495eb0b983ebccdec95d3feda4a2da7caa41` — `Stage UAT-014 landscape repair chunk 00`

A direct-upload experiment created dangling blob `fa4eaf09fabd172860ef6133943f98327d3003f5` from chunk 00 only. It is NOT referenced by any tree/branch and must NOT be used.

No repair trigger exists yet. No workflow has run. Production landscape binary is still unchanged.

## VERIFIED PRIOR RESULTS
- UAT-014 integration: `19e526d618373839a571d7cd0872ce8d18831757`
- stale UAT-013 QA fix: `249a0c53bcd6c49751ebef394f535945c66196a7`
- UI QA run 152 `36107928193`: completed/success
- run 152 artifact `ui-qa-screenshots` ID `10851394527`
- run 152 local/live landscape screenshots matched, but manual visual goal failed because wrong binary was deployed

## ACCEPTED / DO NOT REOPEN
- UAT-011 character cleanup
- UAT-013 portrait background + evidence
- landscape layout / interaction / masthead / character placement / calculator behavior
- P0-A / P0-B / P0-D / layering / sharpness / tap-safety
- business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export semantics

## EXACT NEXT ACTION
Continue **R1A only**:
1. Re-read current `main` + this handoff.
2. Create `repair-staging/uat014/landscape-01.b64` through `landscape-07.b64` from the already prepared local chunks.
3. Create one-shot `.github/workflows/repair-uat014-landscape-binary.yml` that triggers ONLY on `repair-staging/uat014/RUN_EXACT_REPAIR` and reconstructs all eight chunks in lexical order.
4. Workflow must verify exactly: size 41,838; SHA256 `b6e84af07f0d51c0f9a68a7dc0471c8bdd121f0ec0cc78cb1b0abbff86f10819`; `git hash-object` SHA `6183aecb8d4469b137edaa3ffb95d8cf7e8ec2bc` BEFORE copying/committing the production asset.
5. Only after all chunks + workflow are durable, create `repair-staging/uat014/RUN_EXACT_REPAIR` as the final trigger commit.
6. Checkpoint and STOP. Do not perform UI QA/visual review in the same short chunk.

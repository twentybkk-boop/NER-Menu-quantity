# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-014 WRONG LANDSCAPE BINARY; SHORT-CHUNK RECOVERY MODE

Current durable branch checkpoint before this handoff update:
- `7f7a34a7877a7a5538c8a48188a1b2a21f486c2f` — `Checkpoint UAT-014 wrong landscape binary root cause`

UAT-013 portrait remains accepted. Do not reopen it.

## VERIFIED CURRENT DEFECT
User-approved landscape source exists and must NOT be regenerated.

Approved production derivative:
- local filename: `bg_960_q50.webp`
- intended repo path: `assets/background-landscape-garden-v1.webp`
- dimensions: 960x540 RGB
- exact size: 41,838 bytes
- SHA256: `b6e84af07f0d51c0f9a68a7dc0471c8bdd121f0ec0cc78cb1b0abbff86f10819`
- expected Git blob SHA: `6183aecb8d4469b137edaa3ffb95d8cf7e8ec2bc`

Current wrong repo binary at the same path:
- size: 15,009 bytes
- Git blob SHA: `990785f01074764ad80c7a03cc18fe363d19b7a7`

Root cause is therefore **wrong binary bytes at the correct landscape path**.
CSS/orientation mapping is already correct and must not be changed for this defect.

## VERIFIED PRIOR RESULTS
- UAT-014 integration commit: `19e526d618373839a571d7cd0872ce8d18831757`
- stale UAT-013 QA fix commit: `249a0c53bcd6c49751ebef394f535945c66196a7`
- UI QA run 152 `36107928193`: completed/success
- run 152 artifact `ui-qa-screenshots` ID `10851394527`
- local/live landscape screenshots were byte-identical and pixel-identical
- manual visual review FAILED the UAT-014 visual goal because the approved sunset terrace scene was not visibly present
- all three characters / layout / calculator behavior remained stable

## ACCEPTED / DO NOT REOPEN
- UAT-011 character cleanup
- UAT-013 portrait background + evidence
- landscape layout / interaction / masthead / character placement / calculator behavior
- P0-A / P0-B / P0-D / layering / sharpness / tap-safety
- business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export semantics

## DO NOT REPEAT
- do not regenerate the approved landscape image
- do not alter landscape layout/interaction for this binary defect
- do not alter portrait mapping/assets
- do not touch accepted character binaries
- do not reopen `qa/uat013-portrait-background-contract.mjs` without new QA evidence

## SHORT-CHUNK EXECUTION PLAN
### CHUNK R1 — BINARY REPLACEMENT ONLY
1. Re-read current `main` + this handoff.
2. Create/upload exact approved 41,838-byte WebP blob.
3. Verify returned blob SHA is exactly `6183aecb8d4469b137edaa3ffb95d8cf7e8ec2bc`.
4. Replace ONLY `assets/background-landscape-garden-v1.webp` on top of current `main`.
5. Verify branch/path metadata and persist a checkpoint.
6. STOP. Do not wait for CI in the same chunk.

### CHUNK R2 — CI ONLY
1. Re-read current `main` + handoff.
2. Identify resulting UI QA run for the binary-replacement head.
3. Read status exactly once.
4. If queued/in_progress: persist status and STOP.
5. If failure: inspect only first failed required step, persist blocker, STOP before edit.
6. If success: persist CI-success checkpoint and STOP.

### CHUNK R3 — VISUAL EVIDENCE ONLY
1. Re-read current `main` + handoff.
2. Download only resulting `ui-qa-screenshots`.
3. Inspect phone landscape + iPad landscape + iPad-wide landscape local/live.
4. Verify local/live equivalence and that the approved sunset terrace scene is visibly present.
5. If clean, persist `UAT-014 READY FOR USER REVIEW`.
6. STOP.

## EXACT NEXT ACTION
Start **CHUNK R1 only**: replace `assets/background-landscape-garden-v1.webp` with exact approved 41,838-byte derivative, verify blob/path, checkpoint, and stop before CI waiting.
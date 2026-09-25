# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-014 R1A COMPLETE; EXACT REPAIR TRIGGER CREATED; REPAIR RUN NOT YET READ

Current durable production branch checkpoint before this handoff update:
- `d02edcd69d22629f4e6c7713a190bfb7381bacf4` — `Trigger exact UAT-014 landscape binary repair`

UAT-013 portrait remains accepted. Do not reopen it.

## VERIFIED DEFECT
The landscape selector/path is correct, but `assets/background-landscape-garden-v1.webp` contains the wrong binary.

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

SAFE reconstruction order, explicit only — DO NOT glob/lexically concatenate:
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

Verified reconstructed base64 total: 55,784 chars.

Unused objects:
- `repair-staging/uat014/landscape-01.b64` — incomplete 6,016-char file; DO NOT use.
- dangling blob `fa4eaf09fabd172860ef6133943f98327d3003f5` — abandoned partial direct-upload experiment; not referenced by any tree/branch; DO NOT use.

## ONE-SHOT REPAIR WORKFLOW — DURABLE
Workflow:
- `.github/workflows/repair-uat014-landscape-binary.yml`
- setup commit: `970b85045fbbf9551237a48fb41232bdc9efe6db`
- reconstructs only the explicit 11-file safe order above
- ignores incomplete `landscape-01.b64`
- verifies BEFORE production write:
  - size exactly 41,838 bytes
  - SHA256 exactly `b6e84af07f0d51c0f9a68a7dc0471c8bdd121f0ec0cc78cb1b0abbff86f10819`
  - `git hash-object` exactly `6183aecb8d4469b137edaa3ffb95d8cf7e8ec2bc`
- copies only to `assets/background-landscape-garden-v1.webp`
- repeats all three verifications after copy
- verifies the only working-tree change is the production landscape asset
- commits/pushes only that asset as `Repair UAT-014 approved landscape binary`

## R1A FINAL TRIGGER — CREATED
Trigger file:
- `repair-staging/uat014/RUN_EXACT_REPAIR`
- trigger commit: `d02edcd69d22629f4e6c7713a190bfb7381bacf4`
- commit message: `Trigger exact UAT-014 landscape binary repair`

R1A is COMPLETE. DO NOT recreate trigger or restage chunks.

This recovery session intentionally did NOT read/poll the resulting workflow run. No repair-run conclusion is recorded here yet.

## VERIFIED PRIOR RESULTS
- UAT-014 integration: `19e526d618373839a571d7cd0872ce8d18831757`
- stale UAT-013 QA fix: `249a0c53bcd6c49751ebef394f535945c66196a7`
- UI QA run 152 `36107928193`: completed/success
- run 152 artifact `ui-qa-screenshots` ID `10851394527`
- run 152 local/live landscape screenshots matched, but manual visual goal failed because the wrong binary was deployed
- all three characters/layout/calculator behavior remained stable

## ACCEPTED / DO NOT REOPEN
- UAT-011 character cleanup
- UAT-013 portrait background + evidence
- landscape layout / interaction / masthead / character placement / calculator behavior
- P0-A / P0-B / P0-D / layering / sharpness / tap-safety
- business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export semantics

## SHORT-CHUNK CONTINUATION
### NEXT CHUNK R1B — REPAIR RUN STATUS ONLY
1. Re-read current `main` + this handoff.
2. Identify the one-shot repair workflow run caused by trigger commit `d02edcd69d22629f4e6c7713a190bfb7381bacf4`.
3. Read that run status exactly once.
4. If queued/in_progress: persist status and STOP.
5. If failure: inspect only first failed required step, persist blocker, STOP before edit.
6. If success: verify `assets/background-landscape-garden-v1.webp` is exactly 41,838 bytes and blob SHA `6183aecb8d4469b137edaa3ffb95d8cf7e8ec2bc`; persist `R1 COMPLETE` checkpoint and STOP before UI QA/visual review.

### FOLLOWING CHUNK R2 — UI QA ONLY
Read the resulting UI QA run once, persist outcome, STOP.

### FOLLOWING CHUNK R3 — VISUAL EVIDENCE ONLY
Download only resulting `ui-qa-screenshots`; inspect phone/iPad/iPad-wide landscape local/live. If approved sunset terrace is visibly integrated and local/live match, persist `UAT-014 READY FOR USER REVIEW`, STOP.

## EXACT NEXT ACTION
Start **R1B only**: identify the repair workflow run from trigger commit `d02edcd69d22629f4e6c7713a190bfb7381bacf4`, read its status exactly once, checkpoint, and STOP.
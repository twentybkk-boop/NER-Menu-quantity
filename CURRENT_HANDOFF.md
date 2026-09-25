# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-014 R1C WORKFLOW FIXED; FINAL RETRIGGER PENDING

UAT-013 portrait remains accepted. Do not reopen it.

## INTENDED LANDSCAPE BINARY
Production path:
- `assets/background-landscape-garden-v1.webp`

Approved derivative:
- 960x540 RGB
- exact size: 41,838 bytes
- SHA256: `b6e84af07f0d51c0f9a68a7dc0471c8bdd121f0ec0cc78cb1b0abbff86f10819`
- expected Git blob SHA: `6183aecb8d4469b137edaa3ffb95d8cf7e8ec2bc`

Production asset is still the wrong pre-repair binary. No successful repair has written production yet.

## PRIOR REPAIR FAILURE — VERIFIED
One-shot repair run:
- run ID: `36111407206`
- trigger head: `d02edcd69d22629f4e6c7713a190bfb7381bacf4`
- status: completed
- conclusion: failure
- first failed step: `Reconstruct and verify approved landscape binary`
- production write/commit steps were skipped

Exact root cause:
- original `repair-staging/uat014/landscape-04.b64` has wrong content despite correct length
- wrong blob: `c6c764b52d82843430e70549559a75c917725ea8`
- intended whole-chunk blob: `4a8b80a9cb5fd9430a90d938c4502b7291c20363`

## VERIFIED SAFE CHUNK-04 REPLACEMENT STAGING
Use ONLY these files, in this exact order, for logical chunk 04:
1. `repair-staging/uat014/landscape-04a.b64`
   - 3,488 chars
   - blob `6661181eaaed8cef3b6b6511255467fa5efcd54f`
2. `repair-staging/uat014/landscape-04b1.b64`
   - 1,744 chars
   - blob `502fe4d25655cb0adeda97de0efba94ecc8ac5f7`
3. `repair-staging/uat014/landscape-04b2.b64`
   - 1,744 chars
   - blob `1a8c0ee3c6ba562122910f5c1c336d882007e3f5`

Their concatenated logical length is exactly 6,976 chars and they come from the approved local `bg_960_q50.webp` staging source.

DO NOT use:
- `repair-staging/uat014/landscape-04.b64` — wrong content
- `repair-staging/uat014/landscape-04b.b64` — wrong content
- `repair-staging/uat014/landscape-01.b64` — earlier incomplete 6,016-char file
- dangling blob `fa4eaf09fabd172860ef6133943f98327d3003f5`

## ONE-SHOT WORKFLOW — MINIMAL FIX VERIFIED
Workflow:
- `.github/workflows/repair-uat014-landscape-binary.yml`

Minimal workflow fix commit:
- `f96a657159a8e6dcf56422bde808b89bd9f56418` — `Fix UAT-014 repair chunk 04 reconstruction`

Verified diff scope:
- exactly one file changed: the repair workflow
- only reconstruction input changed
- old `landscape-04.b64` replaced by explicit `landscape-04a.b64`, `landscape-04b1.b64`, `landscape-04b2.b64`
- all size/SHA256/Git-blob verification gates are unchanged
- all production-write safeguards are unchanged

Required verification gates remain:
- reconstructed size exactly 41,838 bytes
- SHA256 exactly `b6e84af07f0d51c0f9a68a7dc0471c8bdd121f0ec0cc78cb1b0abbff86f10819`
- `git hash-object` exactly `6183aecb8d4469b137edaa3ffb95d8cf7e8ec2bc`
- only production path changed before commit

## ACCEPTED / DO NOT REOPEN
- UAT-011 character cleanup
- UAT-013 portrait background + evidence
- landscape CSS/orientation mapping
- landscape layout / interaction / masthead / character placement / calculator behavior
- P0-A / P0-B / P0-D / layering / sharpness / tap-safety
- business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export semantics

## DO NOT REPEAT
- do not regenerate approved landscape art
- do not modify CSS/layout/portrait/characters for this staging defect
- do not use invalid staging files listed above
- do not re-run failed run `36111407206`
- do not alter verification gates or production-write safeguards

## EXACT NEXT ACTION — FINAL WRITE OF THIS SHORT CHUNK
1. Update ONLY existing `repair-staging/uat014/RUN_EXACT_REPAIR` contents to retrigger the fixed workflow.
2. This trigger update must be the final write of the current chunk.
3. STOP without reading/polling the new repair run.
4. Following short chunk: re-read current `main` + this handoff, identify the new repair run caused by the trigger update, read status exactly once.
5. If success: verify production asset is exactly 41,838 bytes and blob `6183aecb8d4469b137edaa3ffb95d8cf7e8ec2bc`, persist R1 complete, STOP before UI QA/visual review.

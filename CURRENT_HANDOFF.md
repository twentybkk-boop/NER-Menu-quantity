# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-014 R1C SAFE CHUNK-04 STAGING COMPLETE; WORKFLOW NOT YET RETRIGGERED

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

## R1C WRITE-SAFETY FINDING
Attempting to replace the whole 6,976-char chunk through one large connector payload did NOT change the blob; commit `1363505448975dd996f0f141a975164b55169fab` still returned blob `c6c764b5...`.

Therefore do NOT attempt another whole-file 6,976-char write. Use verified smaller staging files instead.

A 3,488-char `landscape-04b.b64` staging attempt also did not match the intended local half and MUST NOT be used:
- repo blob: `ec5918d5a9b58d8f593ac3f9c33cffba65c0be91`
- intended local half blob would have been `f25987432082584ac8d146e9fa195fe153db43df`

## VERIFIED SAFE CHUNK-04 REPLACEMENT STAGING
The exact approved local chunk 04 is now represented by these verified files, in this exact order:
1. `repair-staging/uat014/landscape-04a.b64`
   - 3,488 chars
   - blob `6661181eaaed8cef3b6b6511255467fa5efcd54f`
   - commit `921e5c873bb300d9b416ab54de7d8191e29f7122`
2. `repair-staging/uat014/landscape-04b1.b64`
   - 1,744 chars
   - blob `502fe4d25655cb0adeda97de0efba94ecc8ac5f7`
   - commit `8b17cebfe373ecaea0fc99a47c3b17d4dbe82a05`
3. `repair-staging/uat014/landscape-04b2.b64`
   - 1,744 chars
   - blob `1a8c0ee3c6ba562122910f5c1c336d882007e3f5`
   - commit `08554baa9981bedcd686e9a672a6f2051da942cd`

Their concatenated logical length is exactly 6,976 chars and they come from the approved local `bg_960_q50.webp` staging source.

Do not use:
- `repair-staging/uat014/landscape-04.b64` — wrong content
- `repair-staging/uat014/landscape-04b.b64` — wrong content
- `repair-staging/uat014/landscape-01.b64` — earlier incomplete 6,016-char file
- dangling blob `fa4eaf09fabd172860ef6133943f98327d3003f5`

## EXISTING ONE-SHOT WORKFLOW
Workflow:
- `.github/workflows/repair-uat014-landscape-binary.yml`
- original setup commit: `970b85045fbbf9551237a48fb41232bdc9efe6db`

It currently still references the old wrong `landscape-04.b64` and MUST be minimally updated before retrigger.

All existing verification gates must remain unchanged:
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

## EXACT NEXT ACTION — NEXT SHORT CHUNK ONLY
1. Re-read current `main` + this handoff.
2. Fetch `.github/workflows/repair-uat014-landscape-binary.yml`.
3. Change ONLY reconstruction input for logical chunk 04: replace `landscape-04.b64` with explicit ordered files `landscape-04a.b64`, `landscape-04b1.b64`, `landscape-04b2.b64`.
4. Preserve all size/SHA256/Git-blob verification gates and production-write safeguards unchanged.
5. Verify workflow diff is minimal.
6. Update ONLY existing `repair-staging/uat014/RUN_EXACT_REPAIR` contents to retrigger the workflow as the final write of that chunk.
7. Persist new trigger commit identity and STOP without polling the new run.
8. Following short chunk: read the new repair run once; on success verify production asset is exactly 41,838 bytes and blob `6183aecb8d4469b137edaa3ffb95d8cf7e8ec2bc`, then checkpoint R1 complete and STOP before UI QA/visual review.

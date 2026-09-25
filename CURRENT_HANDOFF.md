# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-014 R1B FAILED; EXACT STAGING ROOT CAUSE IDENTIFIED

UAT-013 portrait remains accepted. Do not reopen it.

## INTENDED LANDSCAPE BINARY
Production path:
- `assets/background-landscape-garden-v1.webp`

Approved derivative:
- 960x540 RGB
- exact size: 41,838 bytes
- SHA256: `b6e84af07f0d51c0f9a68a7dc0471c8bdd121f0ec0cc78cb1b0abbff86f10819`
- expected Git blob SHA: `6183aecb8d4469b137edaa3ffb95d8cf7e8ec2bc`

Current production asset is still the wrong pre-repair binary because the one-shot repair failed before production write.

## R1A — COMPLETE
Safe staging/workflow setup is durable.

One-shot workflow:
- `.github/workflows/repair-uat014-landscape-binary.yml`
- setup commit: `970b85045fbbf9551237a48fb41232bdc9efe6db`

Trigger:
- `repair-staging/uat014/RUN_EXACT_REPAIR`
- trigger commit: `d02edcd69d22629f4e6c7713a190bfb7381bacf4`

Do not recreate staging/workflow/trigger from scratch.

## R1B RUN — COMPLETED / FAILURE
Repair workflow run:
- run ID: `36111407206`
- workflow: `Repair UAT-014 landscape binary`
- head SHA: `d02edcd69d22629f4e6c7713a190bfb7381bacf4`
- status: `completed`
- conclusion: `failure`

First failed required step:
- `Reconstruct and verify approved landscape binary`

Later production-write/commit steps were skipped, so the production asset was NOT modified by this failed run.

## EXACT ROOT CAUSE — VERIFIED
The repair workflow reconstruction order is conceptually correct, but one staged chunk contains wrong bytes.

Safe files that match the intended local base64 chunk blobs:
- `landscape-00.b64` -> `cdd6ca8ac9ca72e22f76b937d818f1b4bd1c800e`
- `landscape-01a.b64` -> `42de83a903ab13773dde2072f4b9630f69a0f471`
- `landscape-01b.b64` -> `70e960b2e6dad5f9d7a0a90f8efc7233297fd826`
- `landscape-02.b64` -> `4a4328795331552184544defd085d7ab2f22bd19`
- `landscape-03.b64` -> `7ed8ebbe7e87df2048d5cf640477865dd9cf430f`
- `landscape-05.b64` -> `b364c3f59a44705ac81c6d8581bd9e32af96424a`
- `landscape-06a.b64` -> `986ff8b82f959111870d1c8332175d9228cb96b3`
- `landscape-06b.b64` -> `cb6e785d1949247225bddd98c2ebc33e8b10db73`
- `landscape-07a.b64` -> `8e3b5e265334c9879180740d40c6a74912a4ef3d`
- `landscape-07b.b64` -> `7548d83af4d0fb4f4d5bbdf8238504b550b14e2c`

The ONLY verified mismatch is:
- repo `repair-staging/uat014/landscape-04.b64`
  - size: 6,976 chars
  - WRONG repo blob SHA: `c6c764b52d82843430e70549559a75c917725ea8`
- intended exact `landscape-04.b64`
  - size: 6,976 chars
  - EXPECTED blob SHA: `4a8b80a9cb5fd9430a90d938c4502b7291c20363`

Therefore the run failed during reconstruction verification because chunk 04 content is wrong even though its length is correct.

Unused/invalid staging objects:
- `repair-staging/uat014/landscape-01.b64` — incomplete 6,016-char early file; DO NOT use.
- dangling blob `fa4eaf09fabd172860ef6133943f98327d3003f5` — abandoned partial direct-upload object; DO NOT use.

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
- do not recreate all staging chunks
- do not use incomplete `landscape-01.b64`
- do not use dangling blob `fa4eaf09...`
- do not re-run failed run `36111407206`

## EXACT NEXT ACTION — SHORT CHUNK R1C ONLY
1. Re-read current `main` + this handoff.
2. Replace ONLY `repair-staging/uat014/landscape-04.b64` with the exact intended 6,976-char content from the already prepared local approved staging source.
3. Verify the updated file blob SHA is exactly `4a8b80a9cb5fd9430a90d938c4502b7291c20363`.
4. Retrigger the existing one-shot repair workflow by changing ONLY the existing `repair-staging/uat014/RUN_EXACT_REPAIR` trigger file (do not recreate workflow/chunks).
5. Persist the new trigger commit/run identity and STOP without polling repeatedly.
6. Following short chunk: read the new repair run once; on success verify production asset size 41,838 and blob `6183aecb8d4469b137edaa3ffb95d8cf7e8ec2bc`, then checkpoint R1 complete and STOP before UI QA/visual review.

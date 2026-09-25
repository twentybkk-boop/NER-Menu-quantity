# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-013 REPAIR ROOT CAUSE CONFIRMED; CHUNK 08 ONLY NEEDS RESTORE

Latest user hands-on result:
- UAT-011 cutout cleanup is accepted; do not reopen it.
- portrait background is visible but still looks too composited/cut-and-paste.
- user explicitly approved the newly generated portrait-native background candidate for production integration.

## UAT-013 — USER-APPROVED PORTRAIT BACKGROUND
Generated source:
- `/mnt/data/dreamy_bistro_garden_hot_pot_backdrop.png`
- 941x1672 RGB
- 1,756,700 bytes
- SHA256 `93a846e9e94590f6384d04cb2cbfea394692960bcbffdefb067d6f30c64521d9`

Optimized production target:
- `/mnt/data/portrait-background-garden-v1.webp`
- 941x1672 RGB
- 125,912 bytes
- SHA256 `050777632f5fcd1c9217777e4925041633699f52ad37636aeb100a08226ad823`
- expected base64 encoded length: 167,884 characters
- WebP quality 88 / method 6 from the approved PNG.

## REPAIR RUN 1 — VERIFIED FAILURE
- trigger commit: `bd5ea0a6bd5eea09c46338d5d74e2036083c6476`
- workflow run: `36100717195`
- final status: `completed/failure`
- failed step: `Reconstruct and verify approved portrait background`
- exact log failure: `base64: invalid input`
- failure happened during concatenation/decode, before target size/hash verification and before production asset commit.

## ROOT CAUSE — VERIFIED
- local exact `portrait-08.b64` normalized payload length = 16,000 chars.
- expected exact normalized Git blob SHA for chunk 08 = `788cd6ab47119fc35da10a6e52f3c420ed0fdb76`.
- trigger-time remote chunk 08 had blob SHA `5ecc80fe9b6083826191ca874bb42971b73f624d` and size 15,999 chars, so it was missing one base64 character.
- current `main` now returns 404 for `repair-staging/uat013/portrait-08.b64`; chunk 08 is absent.
- remote chunks `00–07`, `09`, and `10` match the local exact chunk blob SHAs (allowing only expected trailing-newline/no-newline representation).
- commit `1206cfc98b041676e42f17e164e4039d7597dbbe` is an EMPTY commit despite message `Correct exact UAT-013 portrait background chunk 08`: GitHub reports `stats.total=0` and `files=[]`; it did not correct the chunk.

## CURRENT STAGING STATE
- `portrait-00.b64` through `portrait-07.b64`: verified present/exact.
- `portrait-08.b64`: MISSING on current `main`; must be restored from local exact chunk only.
- `portrait-09.b64` and `portrait-10.b64`: verified present/exact.
- `RUN_EXACT_REPAIR` marker still exists from run 1.
- no production portrait CSS integration has been performed.

## UAT-011 — VERIFIED FIXED / DO NOT REOPEN
- exact cleaned top-left production blob `5740a9a4619938e8d71b28d8162729b2738bfb59`, 180,814 bytes
- exact cleaned bottom-left production blob `cc0c119b00d1d91fa6b4d6503b1bec5c66061128`, 233,136 bytes
- right unchanged `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`, 51,376 bytes

## PRIOR UAT-012 — SUPERSEDED ONLY FOR PORTRAIT ART DIRECTION
- prior fix made the old background visible and kept it backmost.
- UAT-013 replaces only the portrait visual because user rejects its composited look.
- accepted landscape background/behavior must remain unchanged.

## VERIFIED BASELINE — DO NOT REOPEN
- V4 Chunk 1–4 baseline acceptance
- UAT-011 exact cutout repair
- P0-A/P0-B/P0-D/layering/sharpness/tap-safety and phone-landscape interaction/modal behavior
- no business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export changes

## DO NOT REPEAT
- do not regenerate UAT-011 assets/masks
- do not edit landscape background behavior
- do not modify business logic
- do not rewrite good chunks `00–07`, `09`, `10`
- do not trust run 1 as successful mapping
- do not touch portrait CSS before exact production asset mapping is verified

## EXACT NEXT ACTION
NEXT SHORT SESSION ONLY:
1. Restore `repair-staging/uat013/portrait-08.b64` from `/mnt/data/uat013_chunks/portrait-08.b64`, using the exact normalized 16,000-character payload.
2. Verify remote chunk 08 blob SHA exactly `788cd6ab47119fc35da10a6e52f3c420ed0fdb76` and size 16,000.
3. Verify full normalized staging aggregate is 167,884 chars with chunks `00–10` and no extra `08a/08b` files on remote.
4. Persist a corrected-staging checkpoint.
5. STOP before retriggering repair.

Following short session: modify existing `RUN_EXACT_REPAIR` marker content to create a new push trigger, observe the new repair run once, and checkpoint result. Only after exact production blob verification may portrait-only CSS integration begin.

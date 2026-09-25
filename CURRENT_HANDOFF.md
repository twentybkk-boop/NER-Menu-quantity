# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-013 EXACT REPAIR RUNNING

User-approved remaining fix: replace only the portrait background art with the approved portrait-native garden/hot-pot backdrop; landscape and all accepted runtime/business behavior remain unchanged.

## APPROVED UAT-013 ASSET
- local `/mnt/data/portrait-background-garden-v1.webp`
- 941x1672 RGB
- 125,912 bytes
- SHA256 `050777632f5fcd1c9217777e4925041633699f52ad37636aeb100a08226ad823`
- target `assets/background-portrait-garden-v1.webp`

## EXACT STAGING — VERIFIED
- chunks `01–07`, `09`, `10` match their local exact Git blob SHAs.
- chunk `00` differs only by one trailing newline; workflow strips whitespace.
- malformed old `portrait-08.b64` was removed.
- exact chunk 08 is represented by four 4,000-char ordered quarters:
  - `08a` blob `d82f87a5dabc52b23ef8b0f16fa85a28f9579f0c`
  - `08b` blob `2a16e50a9db28cc0eb6dcd70fb6d964ebe5c1c41`
  - `08c` blob `b4c7c06a27b4e94ca8f2384a6d4a6f74353439a6`
  - `08d` blob `0fe1a087282245689a79de4a6b9efd996410499a`
- normalized aggregate is the approved 167,884-char base64 payload.

## REPAIR WORKFLOW
- `.github/workflows/repair-uat013-portrait-background.yml`
- verifies decoded size 125,912 bytes and SHA256 `050777632f5fcd1c9217777e4925041633699f52ad37636aeb100a08226ad823`
- on success commits exactly `assets/background-portrait-garden-v1.webp`.

## CURRENT REPAIR RUN
- retrigger commit `6f88e4891fe1d6c1be96097fd4c99d2ac55712e1`
- workflow `Repair exact UAT-013 portrait background`
- run ID `36101535008`
- run number 2
- latest bounded status: `in_progress`
- prior run `36100717195` failed before mapping because of malformed old chunk 08; DO NOT USE.

## ACCEPTED / DO NOT REOPEN
- UAT-011 character cutout cleanup
- V4 Chunk 1–4 acceptance
- landscape background/layout/interaction
- P0-A/P0-B/P0-D/layering/sharpness/tap-safety/phone-landscape calculator behavior
- business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export semantics

## DO NOT REPEAT
- do not regenerate UAT-013 art
- do not rewrite exact staged chunks
- do not modify portrait CSS before exact asset mapping succeeds
- do not change landscape background behavior

## EXACT NEXT ACTION
1. Read repair run `36101535008` once.
2. If success: fresh-read `main`, verify bot commit `Map exact approved UAT-013 portrait background` changes only `assets/background-portrait-garden-v1.webp`, then persist binary-mapped checkpoint BEFORE CSS.
3. If failed: read only failed repair step/log and checkpoint exact blocker before edits.
4. After verified mapping only: integrate the new asset portrait-only, update targeted QA, deploy, manually inspect phone portrait, cleanup staging/marker if appropriate, and persist READY FOR USER FINAL REVIEW.

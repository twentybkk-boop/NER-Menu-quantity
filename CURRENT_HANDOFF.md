# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-013 PORTRAIT BACKGROUND EXACT TRANSPORT IN PROGRESS

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
- WebP quality 88 / method 6 from the approved PNG.

## EXACT BINARY TRANSPORT — DURABLE PROGRESS
Repair workflow exists:
- `.github/workflows/repair-uat013-portrait-background.yml`
- trigger path: `repair-staging/uat013/RUN_EXACT_REPAIR`
- runner reconstructs staged base64 chunks, verifies exactly 125,912 bytes + expected SHA256, then commits only `assets/background-portrait-garden-v1.webp`.

Staging status on current `main`:
- `portrait-00.b64` through `portrait-08.b64` are VERIFIED DURABLE on remote.
- current verified staging head: `5762a1b7f023748c91acd53e877347fcaadabb8a` (`Stage UAT-013 portrait background chunk 08`).
- `portrait-09.b64` and `portrait-10.b64` are the only remaining chunks to stage.
- no repair trigger marker has been created yet.

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
- do not rewrite chunks `00–08`
- do not trigger the repair workflow until chunks `09–10` are durable and the full staging set is verified
- do not trust UAT-013 binary mapping without exact final blob size/hash verification

## EXACT NEXT ACTION
SESSION B ONLY:
1. Stage `repair-staging/uat013/portrait-09.b64` and `portrait-10.b64` from the already-prepared exact local chunks.
2. Verify remote staging directory contains `portrait-00.b64` through `portrait-10.b64` with no gaps.
3. Verify expected encoded aggregate before trigger.
4. Persist a STAGING READY checkpoint.
5. STOP before creating `RUN_EXACT_REPAIR`.

After that, next session may create the trigger marker, observe the repair run once, verify mapped production blob exact size/hash, persist binary-mapping checkpoint, then update portrait-only CSS and run QA/Pages + targeted phone-portrait local/live review.

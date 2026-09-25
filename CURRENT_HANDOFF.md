# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-013 STAGING READY; REPAIR NOT YET TRIGGERED

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

## EXACT BINARY TRANSPORT — STAGING VERIFIED READY
Repair workflow exists:
- `.github/workflows/repair-uat013-portrait-background.yml`
- trigger path: `repair-staging/uat013/RUN_EXACT_REPAIR`
- runner concatenates staged `portrait-*.b64`, strips whitespace, decodes, verifies exactly 125,912 bytes + expected SHA256, then commits only `assets/background-portrait-garden-v1.webp`.

Remote staging verification:
- `portrait-00.b64` through `portrait-10.b64` are all present on `main` with no gaps.
- current staging head before this checkpoint: `0eb2a98aedcbd610c25bf9459c6a854fdb0149ed` (`Stage UAT-013 portrait background chunk 10`).
- raw aggregate GitHub file sizes sum to exactly 167,884 bytes/chars, matching the approved base64 encoded length.
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
- do not rewrite any staged chunk `00–10`
- do not trust UAT-013 binary mapping without exact final production blob size/hash verification

## EXACT NEXT ACTION
SESSION C ONLY:
1. Create `repair-staging/uat013/RUN_EXACT_REPAIR` trigger marker.
2. Observe the UAT-013 repair workflow once.
3. If still running, persist run ID/status and STOP; do not poll loop.
4. If completed, verify result and mapped `assets/background-portrait-garden-v1.webp` exact size/hash.
5. Persist binary-mapping checkpoint before any CSS change.
6. STOP before portrait CSS integration.

After that, a later short session may update portrait-only CSS to use the new asset, keep landscape unchanged/backmost, then run UI QA/Pages and targeted phone-portrait local/live review.

# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-013 REPAIR TRIGGERED; WORKFLOW IN PROGRESS

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
- staging head before checkpoint: `0eb2a98aedcbd610c25bf9459c6a854fdb0149ed` (`Stage UAT-013 portrait background chunk 10`).
- raw aggregate GitHub file sizes sum to exactly 167,884 bytes/chars, matching the approved base64 encoded length.

## REPAIR TRIGGER — DURABLE EXTERNAL STATE
- trigger marker commit: `bd5ea0a6bd5eea09c46338d5d74e2036083c6476` (`Trigger UAT-013 exact portrait background repair`)
- workflow run: `36100717195`
- workflow: `Repair exact UAT-013 portrait background`
- head SHA: `bd5ea0a6bd5eea09c46338d5d74e2036083c6476`
- bounded read status: `in_progress`
- no further polling was performed in this session.

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
- do not rewrite staged chunks `00–10`
- do not create another UAT-013 repair trigger
- do not poll repair run `36100717195` repeatedly
- do not trust UAT-013 binary mapping without exact final production blob size/hash verification

## EXACT NEXT ACTION
NEXT SHORT SESSION ONLY:
1. Read workflow run `36100717195` once.
2. If still running, persist current status and STOP; no polling loop.
3. If completed/success, verify the bot mapping commit and `assets/background-portrait-garden-v1.webp` exact size/hash (125,912 bytes; SHA256 `050777632f5fcd1c9217777e4925041633699f52ad37636aeb100a08226ad823`).
4. If completed/failure, inspect only the failed repair job/step and persist exact blocker.
5. Persist binary-mapping checkpoint before any CSS change.
6. STOP before portrait CSS integration.

After binary mapping is verified, a later short session may update portrait-only CSS to use the new asset, keep landscape unchanged/backmost, then run UI QA/Pages and targeted phone-portrait local/live review.

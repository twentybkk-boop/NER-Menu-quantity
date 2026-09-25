# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-013 APPROVED PORTRAIT BACKGROUND; EXACT BINARY TRANSPORT PLANNED

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

## EXACT BINARY TRANSPORT PLAN — VERIFIED DECISION
Direct connector writes are text-oriented and prior binary payload transport has produced truncation, so UAT-013 will use the already-proven repository repair pattern:
1. create `.github/workflows/repair-uat013-portrait-background.yml`;
2. stage the exact approved WebP as bounded base64 text chunks under `repair-staging/uat013/`;
3. workflow triggers only from `repair-staging/uat013/RUN_EXACT_REPAIR`;
4. runner concatenates chunks, decodes binary, verifies exactly 125,912 bytes and SHA256 `050777632f5fcd1c9217777e4925041633699f52ad37636aeb100a08226ad823`;
5. runner commits exactly `assets/background-portrait-garden-v1.webp` and refuses any other staged production path;
6. verify production Git blob size/hash before any CSS change.

No workflow trigger has been created yet at this checkpoint.

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
- do not trust UAT-013 binary mapping without exact final blob size/hash verification
- do not trigger the repair workflow until workflow + every base64 chunk are durable and verified present

## EXACT NEXT ACTION
1. Create UAT-013 repair workflow.
2. Stage all exact base64 chunks of the approved WebP; verify expected chunk count/aggregate encoded length.
3. Persist staging-ready checkpoint.
4. Create trigger marker and observe repair run once.
5. Verify mapped production blob exact size/hash.
6. Persist binary-mapping checkpoint before CSS.
7. Update portrait-only CSS to use the portrait-native asset; keep landscape unchanged/backmost.
8. Run UI QA/Pages and targeted phone-portrait local/live review; persist `READY FOR USER FINAL REVIEW` if passed.

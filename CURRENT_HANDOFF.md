# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-013 PORTRAIT BACKGROUND REPLACEMENT APPROVED

Latest user hands-on re-review result:
- UAT-011 character cutout cleanup is accepted by current evidence/user state; do not reopen it.
- Portrait background is now visible, but the user reports it still looks too obviously composited / cut-and-paste in portrait.
- The user explicitly approved the newly generated portrait background candidate for production integration.

## UAT-013 — PORTRAIT BACKGROUND LOOKS TOO COMPOSITED
Observed from latest user screenshot:
- portrait background is visible, so the prior missing-background defect is no longer the issue;
- remaining defect is visual quality/cohesion: the current portrait scene reads as pasted/cropped fragments at the sides rather than one coherent background.

Expected:
- one coherent portrait-native environment image;
- warm garden/bistro/jaw-hon atmosphere;
- visual detail concentrated near edges with a calm center behind app content;
- background remains strictly backmost and must not obstruct controls/characters;
- landscape behavior must remain unchanged.

## USER-APPROVED PORTRAIT BACKGROUND CANDIDATE — VERIFIED LOCAL FILE
Generated source:
- local path `/mnt/data/dreamy_bistro_garden_hot_pot_backdrop.png`
- dimensions 941x1672 RGB
- source size 1,756,700 bytes
- SHA256 `93a846e9e94590f6384d04cb2cbfea394692960bcbffdefb067d6f30c64521d9`

Optimized production candidate:
- local path `/mnt/data/portrait-background-garden-v1.webp`
- dimensions 941x1672 RGB
- size 125,912 bytes
- SHA256 `050777632f5fcd1c9217777e4925041633699f52ad37636aeb100a08226ad823`
- derived from the user-approved generated PNG with WebP quality 88 / method 6.

## UAT-011 — VERIFIED FIXED / DO NOT REOPEN
- exact cleaned top-left target: 518x500 RGBA, 180,814 bytes, SHA256 `f0ffd24fdde830d06b0d715c7c6ba8c2e81402c9e93731524a3dfa724915d393`
- exact cleaned bottom-left target: 655x524 RGBA, 233,136 bytes, SHA256 `bd645b4744270e221fe0eae8fe08eabf2771269391ddfc4650492e6da831ad31`
- bot mapping commit `df45d20922d7706ceb641c160be21247a3cada9b`
- production blobs:
  - top `5740a9a4619938e8d71b28d8162729b2738bfb59`, 180,814 bytes
  - bottom `cc0c119b00d1d91fa6b4d6503b1bec5c66061128`, 233,136 bytes
  - right unchanged `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`, 51,376 bytes

## PRIOR UAT-012 FIX — SUPERSEDED FOR PORTRAIT VISUAL STYLE
- prior product fix `6fdebb8da6fc87710be6f93141c26579d57d0056` made the old background visible in portrait.
- the visibility/layering result remains useful, but the old portrait visual itself is now superseded by UAT-013 because the user finds it too composited.
- landscape remains accepted and must not change.

## VERIFIED BASELINE — DO NOT REOPEN
- V4 Chunk 1–4 baseline acceptance
- UAT-011 exact cutout repair
- P0-A/P0-B/P0-D/layering/sharpness/tap-safety and phone-landscape interaction/modal behavior
- no business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export changes

## DO NOT REPEAT
- do not regenerate UAT-011 assets/masks
- do not edit landscape background behavior
- do not modify business logic
- do not use the old wide `background-master.webp` as the final portrait visual once the approved portrait candidate is integrated
- do not trust a binary upload unless final Git blob size/hash are verified against the approved WebP bytes

## EXACT NEXT ACTION
1. Integrate the approved WebP as a new portrait-only asset using a binary-safe exact-byte transport/reconstruction path.
2. Verify production Git blob size/hash exactly matches 125,912 bytes and SHA256 `050777632f5fcd1c9217777e4925041633699f52ad37636aeb100a08226ad823`.
3. Persist a binary-mapping checkpoint before editing CSS.
4. Update portrait-only CSS to use this new portrait-native background at natural portrait coverage; keep landscape unchanged and keep the background on the backmost plane.
5. Run existing UI QA/Pages, inspect targeted phone-portrait local/live evidence, then persist `READY FOR USER FINAL REVIEW` if visual composition passes.

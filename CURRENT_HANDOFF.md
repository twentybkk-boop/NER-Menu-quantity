# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-011/UAT-012 VERIFIED COMPLETE; QA MARKER CLEANED; READY CHECK NEXT

## UAT-011 — VERIFIED FIXED
- exact cleaned top-left target: 518x500 RGBA, 180,814 bytes, SHA256 `f0ffd24fdde830d06b0d715c7c6ba8c2e81402c9e93731524a3dfa724915d393`
- exact cleaned bottom-left target: 655x524 RGBA, 233,136 bytes, SHA256 `bd645b4744270e221fe0eae8fe08eabf2771269391ddfc4650492e6da831ad31`
- bot mapping commit `df45d20922d7706ceb641c160be21247a3cada9b` changes exactly the two high-res top/bottom overlays.
- production Git tree verified:
  - top blob `5740a9a4619938e8d71b28d8162729b2738bfb59`, 180,814 bytes
  - bottom blob `cc0c119b00d1d91fa6b4d6503b1bec5c66061128`, 233,136 bytes
  - right unchanged `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`, 51,376 bytes
- targeted manual phone-portrait review PASS: no lower-character hair/head fragment under top-left; no upper-character elbow/shirt fragment above bottom-left; required story details retained.

## UAT-012 — VERIFIED FIXED
- product fix `6fdebb8da6fc87710be6f93141c26579d57d0056`
- portrait master sizing `auto 100dvh -> 160% auto`
- portrait ivory wash `.42/.16/.34 -> .18/.06/.16`
- landscape unchanged
- regression gate `f28893b255f41ff70643c4e406d4de003909eddb`
- targeted manual phone-portrait review PASS: environment background visibly present at the sides behind the UI and remains backmost.

## FINAL AUTOMATION — VERIFIED SUCCESS
Pages:
- `36096022108` — completed/success

UI QA:
- `36096022816` — completed/success
- job `107948357218`
- all required local/deployed gates passed, including P0-A/P0-B/P0-D, Chunk3/4, orientation/background, high-res sharpness, calculator hierarchy and phone-landscape interaction.

Artifact:
- `ui-qa-screenshots`
- ID `10846819582`
- digest `sha256:5fde96f1c6c346d2eec384bf583cc5c8715ee5b16270c211578f4673d861f598`

## TARGETED LOCAL/LIVE EQUIVALENCE — VERIFIED
- `29-phone-portrait-layering-v1@2x.png`: local/live byte-identical, SHA256 `e5b15c5f1216dfbb85415abd8d13a525856c816e18562fd90f7b6004be8089cc`
- `31-phone-portrait-sharpness-v2@3x.png`: local/live byte-identical, SHA256 `0945c0a62f7204ad26e8e3c6a8c2c9f9d08f66c09ef260cd3e58eec652f7fa54`
- `34-chunk4-phone-portrait-page.png`: local/live byte-identical, same SHA256 `0945c0a62f7204ad26e8e3c6a8c2c9f9d08f66c09ef260cd3e58eec652f7fa54`

## TEMP QA MARKER CLEANUP — VERIFIED
- deletion commit `44016ea9edf42dd81a2757a71630188e5847ed53` — `Remove temporary UAT delta QA trigger`
- verified commit diff changes exactly one path:
  - deleted `qa/RUN_UI_QA_UAT_DELTA`
- no product/runtime/assets/recipe/business logic changed by cleanup.

## VERIFIED BASELINE — DO NOT REOPEN
- V4 Chunk 1–4 baseline acceptance
- UAT-011 contamination discovery / alpha-mask derivation / encoder proof / exact mapping
- UAT-012 portrait background root cause/fix
- successful UI QA `36096022816`
- successful targeted manual visual acceptance
- no business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export changes

## DO NOT REPEAT
- do not trigger exact overlay repair again
- do not regenerate UAT-011 assets/masks
- do not create another QA trigger
- do not rerun completed run `36096022816`
- do not re-open UAT-011/UAT-012 investigation unless new user evidence contradicts this accepted state

## CLEANUP NOTE
- `.github/workflows/repair-uat011-exact-overlays.yml` and any repair trigger history are repair/recovery infrastructure, not production runtime behavior. Do not remove or change them in this final acceptance step unless a later explicit cleanup task requires it.

## EXACT NEXT ACTION — NEXT SHORT SESSION
1. Fresh-read current `main` + this handoff.
2. Check GitHub Pages/deployment state for cleanup commit `44016ea9edf42dd81a2757a71630188e5847ed53` exactly once.
3. Because cleanup changed only a QA marker, do not rerun or reinterpret UAT-011/UAT-012 automation unless current GitHub state reveals an actual deployment failure.
4. Persist `READY FOR USER RE-REVIEW` once live readiness is confirmed.
5. Hand back `https://twentybkk-boop.github.io/NER-Menu-quantity/` for the user to verify the two comments on the real web app.

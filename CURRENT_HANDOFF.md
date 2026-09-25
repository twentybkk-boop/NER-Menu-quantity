# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-011/UAT-012 TARGETED VISUAL ACCEPTANCE PASS; TEMP QA MARKER CLEANUP NEXT

## UAT-011 — VERIFIED FIXED
- exact cleaned top-left target: 518x500 RGBA, 180,814 bytes, SHA256 `f0ffd24fdde830d06b0d715c7c6ba8c2e81402c9e93731524a3dfa724915d393`
- exact cleaned bottom-left target: 655x524 RGBA, 233,136 bytes, SHA256 `bd645b4744270e221fe0eae8fe08eabf2771269391ddfc4650492e6da831ad31`
- bot mapping commit `df45d20922d7706ceb641c160be21247a3cada9b` changes exactly:
  - `assets/overlay-top-left-hires.webp`
  - `assets/overlay-bottom-left-hires.webp`
- production Git tree verified:
  - top blob `5740a9a4619938e8d71b28d8162729b2738bfb59`, 180,814 bytes
  - bottom blob `cc0c119b00d1d91fa6b4d6503b1bec5c66061128`, 233,136 bytes
  - right unchanged `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`, 51,376 bytes

### Manual targeted visual acceptance
Evidence from successful UI QA run `36096022816`, artifact `10846819582`:
- `31-phone-portrait-sharpness-v2@3x.png` manually inspected at full page and zoomed cutout edges.
- top-left character lower edge is clean: no foreign lower-character hair/head fragment remains; drink, glasses, gesture, apron/shirt and speech bubble remain intact.
- bottom-left character upper edge is clean: no foreign upper-character elbow/shirt fragment remains; hair, helmet, cat, table, foliage and speech bubble remain intact.
- UAT-011 = **MANUAL VISUAL PASS**.

## UAT-012 — VERIFIED FIXED
- product fix `6fdebb8da6fc87710be6f93141c26579d57d0056`
- portrait master sizing `auto 100dvh -> 160% auto`
- portrait ivory wash `.42/.16/.34 -> .18/.06/.16`
- landscape unchanged
- regression gate `f28893b255f41ff70643c4e406d4de003909eddb`

### Manual targeted visual acceptance
- `29-phone-portrait-layering-v1@2x.png` shows the environment master visibly present in portrait on both side regions behind the app surface.
- background remains backmost and does not cover cards/controls/characters.
- final page corroborated by `34-chunk4-phone-portrait-page.png`.
- UAT-012 = **MANUAL VISUAL PASS**.

## LOCAL / DEPLOYED EVIDENCE EQUIVALENCE — VERIFIED
From artifact `10846819582`:
- local/live `29-phone-portrait-layering-v1@2x.png` are byte-identical, SHA256 `e5b15c5f1216dfbb85415abd8d13a525856c816e18562fd90f7b6004be8089cc`
- local/live `31-phone-portrait-sharpness-v2@3x.png` are byte-identical, SHA256 `0945c0a62f7204ad26e8e3c6a8c2c9f9d08f66c09ef260cd3e58eec652f7fa54`
- local/live `34-chunk4-phone-portrait-page.png` are byte-identical, SHA256 `0945c0a62f7204ad26e8e3c6a8c2c9f9d08f66c09ef260cd3e58eec652f7fa54`
- therefore the manually inspected local evidence exactly matches deployed evidence for these targeted views.

## FINAL AUTOMATION — VERIFIED SUCCESS
Pages:
- run `36096022108` — **completed / success**

UI QA:
- run `36096022816` — **completed / success**
- job `107948357218`
- all required local/deployed gates passed, including P0-A/P0-B/P0-D, Chunk 3/4, orientation/background, high-res sharpness, calculator hierarchy and phone-landscape interaction.

Artifact:
- `ui-qa-screenshots`
- ID `10846819582`
- size `78,293,605` bytes
- digest `sha256:5fde96f1c6c346d2eec384bf583cc5c8715ee5b16270c211578f4673d861f598`

## VERIFIED BASELINE — DO NOT REOPEN
- V4 Chunk 1–4 baseline acceptance
- UAT-011 contamination discovery / alpha-mask derivation / encoder proof / exact mapping
- UAT-012 portrait background root cause/fix
- current exact top/bottom production binaries
- successful run `36096022816`
- no business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export changes

## DO NOT REPEAT
- do not trigger exact overlay repair again
- do not regenerate UAT-011 assets/masks
- do not create another QA trigger
- do not rerun completed run `36096022816`
- do not re-open UAT-011/UAT-012 investigation unless new user evidence contradicts this accepted state

## OPEN CLEANUP
- temporary QA trigger marker `qa/RUN_UI_QA_UAT_DELTA` may still exist and should be removed if present.
- verify cleanup commit changes only that marker.
- repair workflow/marker cleanup should not alter product assets or runtime behavior; do not broaden scope without checking current tree/handoff first.

## EXACT NEXT ACTION — NEXT SHORT SESSION
1. Fresh-read current `main` + this handoff.
2. Fetch `qa/RUN_UI_QA_UAT_DELTA` directly.
3. If present, delete only that path and verify deletion commit scope is exactly the marker.
4. Persist final clean-state checkpoint immediately.
5. Confirm Pages/live state remains valid; do not rerun full QA merely because a QA-only marker was deleted unless GitHub current state indicates otherwise.
6. Persist `READY FOR USER RE-REVIEW` and return `https://twentybkk-boop.github.io/NER-Menu-quantity/`.

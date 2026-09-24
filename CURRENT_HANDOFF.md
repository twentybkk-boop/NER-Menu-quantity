# CURRENT HANDOFF — NER Menu Quantity

> EMERGENCY CRASH-SAFE RECOVERY — SAVE FIRST, ANALYZE SECOND.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json`. Current GitHub state wins if stale.

## CURRENT OBJECTIVE
V3 Session 2B.2 exact high-resolution character overlay recovery, automated UI/sharpness QA, manual `31-*sharpness-v2` visual acceptance, temporary QA-trigger cleanup, and live deployment verification are VERIFIED COMPLETE. The web app is READY FOR HANDS-ON TESTING.

## VERIFIED BASELINE — DO NOT REDO
- V2 P0-A/B/C/D VERIFIED; V3 Session 1 VERIFIED; Session 2A DONE; Session 2B.1 VERIFIED.
- Exact top Git object VERIFIED: `990c6b3523f79a483f41f17032f03f880f97f461`.
- Exact bottom Git object VERIFIED: `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`.
- Exact right Git object VERIFIED: `a4d051c52a4b0f5191ad2770c3eee416fa01aba4` (51,376 bytes; canonical SHA256 `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed`).

## PRODUCTION HIGH-RES MAPPING — VERIFIED EXACT
Production-only mapping commit:
- `4339d297640901b8205f2084d3ae8ca1b8e0ac4b` (`Map verified exact high-resolution overlays`).
- changed ONLY the three production high-resolution overlay files.
- `assets/overlay-top-left-hires.webp` → `990c6b3523f79a483f41f17032f03f880f97f461`, size `31174` — MATCH.
- `assets/overlay-bottom-left-hires.webp` → `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`, size `39712` — MATCH.
- `assets/overlay-right-hires.webp` → `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`, size `51376` — MATCH.

## REPAIR / TEMPORARY CLEANUP — VERIFIED COMPLETE
- no `repair-staging/` paths on `main`.
- no `.github/workflows/repair-*` paths on `main`.
- temporary `qa/RUN_UI_QA_V3` marker deleted in commit `d19461bea755a9cd20989c7a841b7fc73921f9bb`.
- deletion commit changed ONLY `qa/RUN_UI_QA_V3`.
- `.github/workflows/ui-qa.yml` remains present and unchanged.

## UI QA + MANUAL VISUAL ACCEPTANCE — VERIFIED PASS
Primary V3 QA run:
- run `36035600267` (`UI QA`) — `completed` / `success`.
- local + deployed P0-A/B/D, orientation/layering, V3 high-res sharpness, calculator hierarchy, evidence rendering all passed.
Manual artifact acceptance:
- artifact `ui-qa-screenshots`, ID `10824396587`.
- inspected all four `31-*sharpness-v2` phone/iPad portrait/landscape screenshots.
- all three required characters present together — PASS.
- bottom-left NO glasses + helmet + cat/table + speech bubble — PASS.
- top-left glasses + drink + peace gesture + speech bubble — PASS.
- right white backpack/straps + clipboard/pen + food/chalkboard + speech bubble — PASS.
- no stacking/layering regression — PASS.
- sharpness acceptable across all generated viewport/orientation evidence — PASS.

## FINAL CLEAN-STATE QA — VERIFIED SUCCESS
Marker deletion itself triggered the existing `qa/**` workflow path, providing an independent clean-state rerun:
- run `36036869881` (`UI QA`), head SHA `d19461bea755a9cd20989c7a841b7fc73921f9bb`.
- status `completed`; conclusion `success`.
- local and deployed acceptance gates including deployed orientation/layering and deployed V3 high-res sharpness passed.
- no clean-state regression detected.

## LIVE GITHUB PAGES DEPLOYMENT — VERIFIED READY
Public app endpoint used by the deployed QA contracts:
- `https://twentybkk-boop.github.io/NER-Menu-quantity/`
Clean marker-deletion commit deployment:
- Pages run `36036868667`, head SHA `d19461bea755a9cd20989c7a841b7fc73921f9bb` — `completed` / `success`.
Current checkpoint main deployment:
- pre-readiness-checkpoint `main` SHA `2402701fcb8eeee016931a7f6c79a40075e1925b`.
- Pages run `36036944983` — `completed` / `success`.
- Pages jobs `build`, `deploy`, and `report-build-status` all concluded `success`.
- the only difference between clean app commit `d19461be...` and checkpoint commit `2402701f...` is `CURRENT_HANDOFF.md`; no production/runtime/UI asset changed.
- deployed UI QA against the public GitHub Pages endpoint passed on the clean app state.
- STATUS: WEB APP READY FOR HANDS-ON TESTING.

## DO NOT REPEAT
- Do not redo repair/source/reconstruction work.
- Do not remap production high-resolution assets unless a later verified regression proves mapping wrong.
- Do not recreate temporary QA marker.
- Do not rerun V3 acceptance solely for bookkeeping.
- Do not change verified layout/business logic before collecting hands-on test feedback.

## OPEN BLOCKERS
None for starting hands-on web-app testing.

## EXACT NEXT RECOVERY ACTION
Begin hands-on testing at `https://twentybkk-boop.github.io/NER-Menu-quantity/`. Record concrete defects with viewport/orientation, page/state, expected vs actual behavior, and screenshot/evidence when available. If a defect is found, persist it as the next crash-safe work head before making fixes. Do not proactively modify the verified V3 implementation without a reproduced defect.

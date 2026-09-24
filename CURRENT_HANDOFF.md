# CURRENT HANDOFF — NER Menu Quantity

> EMERGENCY CRASH-SAFE RECOVERY — SAVE FIRST, ANALYZE SECOND.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json`. Current GitHub state wins if stale.

## CURRENT OBJECTIVE
Finish V3 Session 2B.2 exact high-resolution character overlay recovery without changing verified layout/business logic; then run existing sharpness/UI QA and inspect `31-*sharpness-v2` screenshots.

## VERIFIED BASELINE — DO NOT REDO
- V2 P0-A/B/C/D VERIFIED; V3 Session 1 VERIFIED; Session 2A DONE; Session 2B.1 VERIFIED.
- Exact top Git object VERIFIED present: `990c6b3523f79a483f41f17032f03f880f97f461`.
- Exact bottom Git object VERIFIED present: `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`.
- Canonical right local file: 51,376 bytes; SHA256 `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed`; base64 68,504 chars; final binary Git target `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.

## FAILURE ROOT CAUSE — LOCALIZED
Failed final assembler run `36032106873` decoded 51,376 bytes but produced SHA256 `f2f715dc111e302ea6dd612df1e8a475a14ff33706bfc5c48f0fa3143583182c` instead of canonical `d94dffb...`.
Fresh one-pass range comparison proved the only mismatching staged file was stale `right-01.b64`; all other seven staged ranges matched fresh canonical expected values.

## RIGHT-01 REPAIR — VERIFIED EXACT
- fresh halves `right-01a-fresh.b64` and `right-01b-fresh.b64`: VERIFIED EXACT.
- repair workflow `.github/workflows/repair-right-01-fresh.yml`: VERIFIED.
- trigger commit `557181b4428905750c5bd13011bddc0ca6fb10a2`.
- Actions run `36033565588`: `completed` / `success`.
- corrected output commit `5d2164714cfc1e3dd010dd5509dc430fb883ed33`.
- corrected `repair-staging/right/right-01.b64`: size `12000`; blob `d7ea4dac7f9d38b0e0d80a1dd306f3d6b9549df9`; VERIFIED EXACT.

## COMPLETE EIGHT-RANGE REVALIDATION — VERIFIED 8/8
Repair branch head inspected before final assembly: `5d2164714cfc1e3dd010dd5509dc430fb883ed33`; tree `dc81c5e2ff5ef7d43432b95b5fffef5d7097e636`.
- `right-00.b64`: blob `4cfbab61acc0c0e6489b51da0bb423c2da1d5e50`, size `6000` — MATCH.
- `right-01.b64`: blob `d7ea4dac7f9d38b0e0d80a1dd306f3d6b9549df9`, size `12000` — MATCH.
- `right-02.b64`: blob `010d7aedd8d7681240b1e6d555819065fab9ac33`, size `12000` — MATCH.
- `right-03.b64`: blob `654a08614380f215c9b3c785bf6945add55b897f`, size `18000` — MATCH.
- `right-04a.b64`: blob `0699b88e134d2ae675e7dee3a46d829eff79208e`, size `6000` — MATCH.
- `right-04b.b64`: blob `1de2d4138e0ac4ba68f11a26329f15f8dcf6533a`, size `6000` — MATCH.
- `right-04c.b64`: blob `41bd3338b623908f19399f4d4dac59dcf832903f`, size `6000` — MATCH.
- `right-04d.b64`: blob `87d79ed174e11938becb04788693164198f5e632`, size `2504` — MATCH.
- STATUS: COMPLETE STAGED SET VERIFIED EXACT 8/8. Do not rewrite any of these eight files.

## FINAL-RIGHT RETRIGGER — DURABLE; ACTIONS RUN VERIFIED SUCCESS
- trigger path: `repair-staging/right/RUN_RIGHT_FINAL` on repair branch.
- new deterministic marker: `run-right-final-v2`.
- trigger content blob: `3edc53449ee8d0d4f80925bd878178fb83996f5e`.
- trigger commit: `b397634299d845f234442e982243b52a36ac1888`.
- matching Actions run `36034559407`, workflow `Repair exact right binary`, status `completed`, conclusion `success`.

## FINAL RIGHT BINARY PROOF — INDEPENDENTLY VERIFIED EXACT
- successful assembler output commit on repair branch: `247ab75f6680fca05aefa8cf417385fea9152da6` (`Assemble exact right binary proof`).
- proof/output path: `repair-staging/right/right-q70-a60.webp`.
- size exactly `51376` bytes.
- Git blob exactly `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
- STATUS: FINAL RIGHT EXACT BINARY VERIFIED DURABLE. Do not rebuild/rewrite it.

## PRODUCTION HIGH-RES MAPPING — VERIFIED EXACT
Clean production-only mapping commit on `main`:
- commit `4339d297640901b8205f2084d3ae8ca1b8e0ac4b` (`Map verified exact high-resolution overlays`).
- parent `74fb09e4182e9e1087691f04dae610ca62ceb000`.
- commit verification: changed ONLY the three production high-resolution overlay files; no layout/business-logic files changed.
- `assets/overlay-top-left-hires.webp` → blob `990c6b3523f79a483f41f17032f03f880f97f461`, size `31174` — MATCH.
- `assets/overlay-bottom-left-hires.webp` → blob `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`, size `39712` — MATCH.
- `assets/overlay-right-hires.webp` → blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`, size `51376` — MATCH.
- STATUS: ALL THREE VERIFIED EXACT OBJECTS ARE NOW MAPPED TO PRODUCTION PATHS.

## REPAIR-ONLY CLEANUP — VERIFIED CLEAN ON MAIN
- inspected current `main` checkpoint `033e8abefbf287bd1133ef3562c7fd7963cdd0e6`, tree `fad7e014cab0ce88c9115b44160ef0c3d44e9863`.
- no `repair-staging/` paths exist on current `main`.
- no `.github/workflows/repair-*` paths exist on current `main`.
- existing `.github/workflows/ui-qa.yml` remains present and unchanged.
- therefore no deletion commit was required; cleanup status is already clean.
- production high-resolution overlay blobs remain mapped exactly as verified above.

## UI QA TRIGGER — DURABLE; RUN NOT YET INSPECTED
- existing `.github/workflows/ui-qa.yml` supports `workflow_dispatch` and `push` on `qa/**`.
- connector exposed no direct workflow-dispatch action, so QA was triggered through the workflow's existing `qa/**` push path without touching production/runtime/UI logic.
- trigger marker: `qa/RUN_UI_QA_V3`.
- marker content: `run-ui-qa-v3-production-overlays-v1`.
- trigger commit: `f7748a65231282df621d2ba52ab10f355ee027ad` (`Trigger UI QA for verified production overlays`).
- commit verification: changed ONLY `qa/RUN_UI_QA_V3`; no other file changed.
- QA run ID/status/conclusion have NOT yet been inspected at this checkpoint and must not be inferred.

## DO NOT REPEAT / REJECTED
- Do not redo repo-wide/source/Library/V2/Session1/2A/2B.1/layout/orientation/calculator/P0 investigations or redraw/reconstruction.
- Do not alter the eight verified staged right ranges on the repair branch.
- Do not rewrite corrected `right-01.b64` or either fresh half.
- Do not re-inspect/re-trigger runs `36033565588` or `36034559407`.
- Do not rewrite `RUN_RIGHT_FINAL` again.
- Do not rebuild or rewrite `repair-staging/right/right-q70-a60.webp`.
- Do not remap the three production high-resolution assets unless a later verified QA failure proves the mapping itself wrong.
- Do not change verified layout/business logic during QA.
- Do not perform repair cleanup again on `main`; current `main` is already verified free of repair-only residue.
- Do not create another QA trigger while the run from `f7748a65231282df621d2ba52ab10f355ee027ad` is pending/being inspected.

## OPEN BLOCKERS
1. Inspect ONLY the UI QA run caused by trigger commit `f7748a65231282df621d2ba52ab10f355ee027ad`; record exact run ID/status/conclusion; checkpoint before screenshots/artifacts.
2. Manually inspect `31-*sharpness-v2` screenshots for final acceptance of all three characters and verified composition; checkpoint final acceptance/result.

## EXACT NEXT RECOVERY ACTION
After confirming this QA-trigger checkpoint is durable, inspect ONLY GitHub Actions runs associated with QA trigger commit `f7748a65231282df621d2ba52ab10f355ee027ad`. Record the matching `UI QA` run ID/status/conclusion and immediately persist that QA-run checkpoint before manually inspecting `31-*sharpness-v2` screenshots or any QA artifacts. Do not make any other change in that work unit.

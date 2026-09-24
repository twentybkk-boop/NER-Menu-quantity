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
- Production paths remain untouched.

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

## FRESH CANONICAL EIGHT-RANGE TARGETS
- `right-00.b64` → `4cfbab61acc0c0e6489b51da0bb423c2da1d5e50`
- `right-01.b64` → `d7ea4dac7f9d38b0e0d80a1dd306f3d6b9549df9`
- `right-02.b64` → `010d7aedd8d7681240b1e6d555819065fab9ac33`
- `right-03.b64` → `654a08614380f215c9b3c785bf6945add55b897f`
- `right-04a.b64` → `0699b88e134d2ae675e7dee3a46d829eff79208e`
- `right-04b.b64` → `1de2d4138e0ac4ba68f11a26329f15f8dcf6533a`
- `right-04c.b64` → `41bd3338b623908f19399f4d4dac59dcf832903f`
- `right-04d.b64` → `87d79ed174e11938becb04788693164198f5e632`

## COMPLETE EIGHT-RANGE REVALIDATION — VERIFIED 8/8
Repair branch head inspected: `5d2164714cfc1e3dd010dd5509dc430fb883ed33`; tree `dc81c5e2ff5ef7d43432b95b5fffef5d7097e636`.
Current Git tree metadata matches the canonical targets for all eight files:
- `right-00.b64`: blob `4cfbab61acc0c0e6489b51da0bb423c2da1d5e50`, size `6000` — MATCH.
- `right-01.b64`: blob `d7ea4dac7f9d38b0e0d80a1dd306f3d6b9549df9`, size `12000` — MATCH.
- `right-02.b64`: blob `010d7aedd8d7681240b1e6d555819065fab9ac33`, size `12000` — MATCH.
- `right-03.b64`: blob `654a08614380f215c9b3c785bf6945add55b897f`, size `18000` — MATCH.
- `right-04a.b64`: blob `0699b88e134d2ae675e7dee3a46d829eff79208e`, size `6000` — MATCH.
- `right-04b.b64`: blob `1de2d4138e0ac4ba68f11a26329f15f8dcf6533a`, size `6000` — MATCH.
- `right-04c.b64`: blob `41bd3338b623908f19399f4d4dac59dcf832903f`, size `6000` — MATCH.
- `right-04d.b64`: blob `87d79ed174e11938becb04788693164198f5e632`, size `2504` — MATCH.
- STATUS: COMPLETE STAGED SET VERIFIED EXACT 8/8. Do not rewrite any of these eight files.

## DO NOT REPEAT / REJECTED
- Do not redo repo-wide/source/Library/V2/Session1/2A/2B.1/layout/orientation/calculator/P0 investigations or redraw/reconstruction.
- Do not alter any of the eight now-verified staged ranges.
- Do not rewrite corrected `right-01.b64` or either fresh half.
- Do not recreate/rewrite the right-01 repair workflow or trigger.
- Do not re-inspect/re-trigger run `36033565588`.
- Do not rerun the old failed final-right trigger unchanged.
- Do not touch production paths before final right binary target `a4d051c52a4b0f5191ad2770c3eee416fa01aba4` is VERIFIED durable.

## OPEN BLOCKERS
1. Trigger final-right assembler once with a NEW deterministic trigger change; persist trigger state before inspecting the run.
2. Verify the new final-right Actions run and final binary Git blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`; checkpoint.
3. Only then: production mapping → cleanup → QA/manual acceptance.

## EXACT NEXT RECOVERY ACTION
After confirming this checkpoint is durable, update ONLY `repair-staging/right/RUN_RIGHT_FINAL` on repair branch to a NEW deterministic marker value so `.github/workflows/repair-right-final.yml` runs exactly once against the now-verified 8/8 staged set. Verify the trigger commit is durable and immediately persist trigger state before inspecting any Actions run. Do not make any other write in that work unit.

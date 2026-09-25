# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-011 + UAT-012 CODE DURABLE; FINAL VERIFICATION NEXT

## UAT-011 — FIX DURABLE
- production cleanup commit `be16bd5979546218bbbca81a0d46c1da33e3ac5c`
- changed exactly:
  - `assets/overlay-top-left-hires.webp`
  - `assets/overlay-bottom-left-hires.webp`
- cleaned top-left: 518x500 RGBA, SHA256 `f0ffd24fdde830d06b0d715c7c6ba8c2e81402c9e93731524a3dfa724915d393`, Git blob `e457bc39bfa490b467b7b061afd388c924203dec`
- cleaned bottom-left: 655x524 RGBA, SHA256 `bd645b4744270e221fe0eae8fe08eabf2771269391ddfc4650492e6da831ad31`, Git blob `d028a38f30098759217c1f2808a29f2327de441d`
- character geometry unchanged.

## UAT-012 — ROOT CAUSE + FIX DURABLE
Root cause:
- `background-master.webp` is 440x293 landscape.
- old portrait `auto 100dvh` scaled it to ~1267x844 on a 390x844 phone, showing only ~31% of source width; ivory wash further flattened the visible crop.
- old layering QA checked presence/backmost stacking but not portrait crop strategy.

Product fix:
- commit `6fdebb8da6fc87710be6f93141c26579d57d0056` — `Restore visible portrait environment background`
- changed exactly `assets/visual-uat-v4-chunk1.css`
- portrait only:
  - preserved radial ambience/backmost layer and background-master aspect ratio;
  - image layer size `auto 100dvh -> 160% auto`;
  - reduced only the portrait ivory wash from `.42/.16/.34` to `.18/.06/.16`;
  - landscape rule unchanged.

Regression gate:
- commit `f28893b255f41ff70643c4e406d4de003909eddb` — `Guard portrait environment crop strategy`
- changed exactly `qa/layering-orientation-v1-contract.mjs`
- adds computed `body::before.backgroundSize` capture and requires portrait cases to expose the new `160%` image sizing;
- all existing backmost/layering/ambient/rail assertions remain unchanged.

## DIFF SCOPE — VERIFIED
- `6fdebb8d...`: one CSS file, only portrait background presentation block/comment.
- `f28893b2...`: one QA contract, only background-size capture/assertion.
- no landscape behavior, character geometry, JS/business/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export changes.

## VERIFIED BASELINE — DO NOT REOPEN
- V4 Chunk 1–4 pre-delta acceptance remains the baseline.
- preserve P0-A/P0-B/P0-D/layering/sharpness/tap-safety and phone-landscape interaction/modal behavior.

## DO NOT REPEAT
- do not redo UAT-011 binary cleanup.
- do not redo UAT-012 root-cause derivation.
- do not modify landscape background for this delta.
- do not weaken existing QA gates.

## ACTIONS STATUS
- intentionally NOT consumed yet for the final latest head in this checkpoint.

## EXACT NEXT ACTION — FINAL COMBINED VERIFICATION
1. Fresh-read current `main`; current GitHub wins.
2. Perform one bounded Actions read for the latest relevant head containing both UAT-011 and UAT-012 fixes.
3. If UI QA/Pages are still running, persist run IDs/status and STOP rather than polling long.
4. If failed, read only the first failed required step/log and persist before edits.
5. If success, persist run IDs + artifact metadata immediately.
6. Inspect targeted final evidence only:
   - phone portrait `29-*-layering-v1@2x.png` for stronger environment visibility/backmost behavior;
   - phone portrait Chunk 4/page character evidence for clean top/bottom-left cutouts;
   - local/live equivalence when available.
7. If both UAT-011 and UAT-012 visually PASS, persist `READY FOR USER RE-REVIEW` and hand the live URL back to the user.

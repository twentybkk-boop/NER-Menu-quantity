# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-011 + UAT-012 CODE DURABLE; EXTERNAL QA RUNNING

## UAT-011 — FIX DURABLE
- production cleanup commit `be16bd5979546218bbbca81a0d46c1da33e3ac5c`
- changed exactly:
  - `assets/overlay-top-left-hires.webp`
  - `assets/overlay-bottom-left-hires.webp`
- cleaned top-left: 518x500 RGBA, SHA256 `f0ffd24fdde830d06b0d715c7c6ba8c2e81402c9e93731524a3dfa724915d393`, blob `e457bc39bfa490b467b7b061afd388c924203dec`
- cleaned bottom-left: 655x524 RGBA, SHA256 `bd645b4744270e221fe0eae8fe08eabf2771269391ddfc4650492e6da831ad31`, blob `d028a38f30098759217c1f2808a29f2327de441d`
- character geometry unchanged.

## UAT-012 — ROOT CAUSE + FIX DURABLE
Root cause:
- `background-master.webp` is 440x293 landscape.
- old portrait `auto 100dvh` exposed only about 31% of source width on a 390x844 phone and the ivory wash further flattened the scene.

Product fix:
- `6fdebb8da6fc87710be6f93141c26579d57d0056` — `Restore visible portrait environment background`
- portrait master sizing `auto 100dvh -> 160% auto`
- portrait ivory wash reduced from `.42/.16/.34` to `.18/.06/.16`
- landscape unchanged.

Regression gate:
- `f28893b255f41ff70643c4e406d4de003909eddb` — `Guard portrait environment crop strategy`
- existing layering contract now records `body::before.backgroundSize` and requires portrait to retain the `160%` image layer sizing.
- no existing gate weakened.

## FINAL COMBINED ACTIONS — ONE BOUNDED READ RECORDED
Relevant app/test head: `f28893b255f41ff70643c4e406d4de003909eddb`.

Pages:
- run `36093278458`
- **completed / success**

UI QA:
- run `36093279114`
- run number `141`
- status at bounded read: **in_progress**
- conclusion: not yet available

Per crash-safe external-wait rule, no polling loop was started after observing this running state.

## VERIFIED DIFF SCOPE
- UAT-011 changed only two high-res character binaries.
- UAT-012 changed only `assets/visual-uat-v4-chunk1.css` portrait presentation.
- QA change only `qa/layering-orientation-v1-contract.mjs` background-size capture/assertion.
- no business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export changes.

## VERIFIED BASELINE — DO NOT REOPEN
- V4 Chunk 1–4 pre-delta acceptance remains baseline.
- preserve P0-A/P0-B/P0-D/layering/sharpness/tap-safety and phone-landscape interaction/modal behavior.

## DO NOT REPEAT
- do not redo UAT-011 cleanup.
- do not redo UAT-012 root-cause derivation/fix.
- do not rerun the same QA while run `36093279114` is active.
- do not poll `36093279114` in a loop.

## EXACT NEXT ACTION — WHEN CONTINUING
1. Fresh-read current `main` + this handoff.
2. Read UI QA run `36093279114` **once** for its final/current state.
3. If still running: persist status and stop again.
4. If failed: read only the first failed required step/log, checkpoint exact evidence before edits.
5. If completed/success:
   - fetch job steps and artifact metadata once;
   - persist automation success;
   - inspect only targeted final evidence: phone portrait layering screenshot for environment visibility and phone portrait page/character evidence for clean top/bottom-left cutouts;
   - use local/live byte equivalence when available.
6. If both defects visually PASS, persist `READY FOR USER RE-REVIEW` and hand back `https://twentybkk-boop.github.io/NER-Menu-quantity/`.

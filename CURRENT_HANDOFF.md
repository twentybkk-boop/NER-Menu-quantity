# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-011 + UAT-012 CODE DURABLE; FIRST COMBINED QA FAILURE ISOLATED

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

## FINAL COMBINED ACTIONS — VERIFIED FINAL RESULT
Relevant app/test head: `f28893b255f41ff70643c4e406d4de003909eddb`.

Pages:
- run `36093278458`
- **completed / success**

UI QA:
- run `36093279114`
- run number `141`
- job `107940026638`
- **completed / failure**

### Gates that passed before the failure
- base Chromium + WebKit UI QA — PASS
- P0-A complete character composition — PASS
- P0-B protected center frame — PASS
- P0-D top composition — PASS
- P0-D long-list rhythm — PASS
- V4 thumbnail semantics/density — PASS
- V4 Chunk 4 scale/detail/safety — PASS
- orientation layering/backmost environment — PASS in Chromium + WebKit for phone portrait, phone landscape, iPad portrait, iPad landscape and wide iPad landscape

This proves the new UAT-012 `160% auto` portrait crop contract is active and the backmost/layering regression suite accepts it.

### FIRST FAILED REQUIRED STEP — VERIFIED
Step 15: `Verify V3 character high-res sharpness locally`

Exact log failure:
`page.evaluate: Error: failed to load http://127.0.0.1:8000/assets/overlay-top-left-hires.webp?v=20260924-v3-recovered1`

Source:
- `qa/character-sampling-v1-contract.mjs`
- failure occurs while directly loading the top-left high-resolution production asset.
- process exits before calculator/deployed gates, so those later steps were skipped.

Artifact upload still succeeded:
- `ui-qa-screenshots`
- artifact ID `10845589504`
- size `29,236,200` bytes
- digest `sha256:dcad54fa1a5757ba9706cb751aeaf16f3de394e76ceff8de2c346eef091e578e`

## VERIFIED DIFF SCOPE
- UAT-011 changed only two high-res character binaries.
- UAT-012 changed only `assets/visual-uat-v4-chunk1.css` portrait presentation.
- QA change only `qa/layering-orientation-v1-contract.mjs` background-size capture/assertion.
- no business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export changes.

## HYPOTHESES ELIMINATED
- UAT-012 layering/crop regression is NOT the cause of this QA failure; its contract passed in both engines/all targeted orientations.
- generic P0-A/P0-B composition geometry is NOT the first blocker; both passed.
- do not change portrait background presentation in response to this failure.

## OPEN BLOCKER
Determine why the cleaned production `assets/overlay-top-left-hires.webp` cannot be decoded/loaded by the direct sharpness contract after the UAT-011 binary cleanup. Do not assume whether the issue is binary encoding vs serving/query-string behavior until inspected.

## VERIFIED BASELINE — DO NOT REOPEN
- V4 Chunk 1–4 pre-delta acceptance remains baseline.
- preserve P0-A/P0-B/P0-D/layering/sharpness/tap-safety and phone-landscape interaction/modal behavior.
- UAT-012 presentation fix is currently accepted by its dedicated local regression gate.

## DO NOT REPEAT
- do not redo UAT-011 contamination discovery/alpha-mask cleanup.
- do not redo UAT-012 root-cause derivation/fix.
- do not rerun failed run `36093279114` unchanged.
- do not modify portrait background rules while resolving the asset-load blocker.

## EXACT NEXT ACTION
1. Fresh-confirm this failure checkpoint is durable on `main`.
2. Inspect ONLY `assets/overlay-top-left-hires.webp` and, as control, `assets/overlay-bottom-left-hires.webp` / `assets/overlay-right-hires.webp` for WebP validity/decodability and the exact direct-load URL used by `qa/character-sampling-v1-contract.mjs`.
3. Determine whether the blocker is malformed cleaned binary or test/server URL behavior.
4. Persist verified root cause BEFORE editing.
5. Apply the smallest fix, checkpoint, then run one combined UI QA + Pages verification for UAT-011/UAT-012.
6. If automation passes, inspect only targeted phone-portrait environment + character cutout evidence, then persist `READY FOR USER RE-REVIEW` and hand back `https://twentybkk-boop.github.io/NER-Menu-quantity/`.

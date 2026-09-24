# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts.

## CURRENT WORK HEAD — P0-A FAILURE CHECKPOINT
- Remote `main` immediately before this checkpoint: `35d9fc39552f9819c86ba26e5eccde0154b2b9d0` (`Checkpoint running Actions after modal safe-zone fix`).
- Relevant product CSS fix: `5bb9cb4d99e5753f41e07324bc91f977a0caa23e`.
- Relevant Chunk 4 contract fix: `42a6bedf675eebcb5d2ca9a05ad0001604948a3b`.
- `35d9fc39…` is handoff-only after those code/test commits; the failing UI QA checked out exact code/test head `42a6bedf…`.

## NEW FINAL FAILURE EVIDENCE — VERIFIED DURABLE
UI QA run:
- run ID: `36058265001`
- job ID: `107830594992`
- workflow head: `42a6bedf675eebcb5d2ca9a05ad0001604948a3b`
- run/job: **completed / failure**

Steps before failure:
- checkout/setup/install — PASS
- thumbnail contract / atlas integrity — PASS
- static server — PASS
- base Chromium + WebKit UI QA — PASS
  - Chromium: iphone / iPad portrait / iPad landscape PASS
  - WebKit: iphone / iPad portrait / iPad landscape PASS

First failing required step:
- step 8: `Verify P0-A complete character composition` — **FAIL**
- exact assertion:
  `chromium/calculator: .decor-a became too small to preserve story detail`
- source: `qa/character-composition-v2-contract.mjs:29`, during calculator/modal inspection.

Because P0-A failed, required verification steps after it (P0-B, P0-D, Chunk 3 regression, Chunk 4 local, layering, sharpness, calculator, Chunk 2 landscape, deployed gates) were skipped in this run. Do not treat them as post-fix PASS.

Failure-run artifact upload itself succeeded:
- artifact ID: `10833665689`
- artifact name: `ui-qa-screenshots`
- size reported by workflow: `5,381,118` bytes
- digest: `sha256:7ff3d23b111d50546f28a04d9d8b0bcc628c8b18fb01f7ec706879efb08f3c20`
- only evidence produced before the P0-A stop should be assumed present; this is NOT a full post-fix acceptance artifact.

## INTERPRETATION — VERIFIED, NOT YET FIXED
The modal safe-zone CSS correction solved a real manually observed title/subtitle obstruction by shrinking modal `.decor-a`, but the phone/calculator state now violates the older P0-A story-detail floor.

Current relevant modal `.decor-a` values after `5bb9cb4d…`:
- phone portrait: `56x61`
- phone landscape: `80x87` (unchanged from the previously passing state)
- iPad portrait: `70x77`
- iPad/wide landscape: `72x79`

The concrete blocker is therefore a **constraint conflict in the current presentation geometry**: title/subtitle safe-zone clearance must be preserved without shrinking the approved top-left composition below the P0-A story-detail requirement.

IMPORTANT: this evidence does **not** prove that `qa/character-composition-v2-contract.mjs` is obsolete. Do not relax P0-A merely to make CI green. Determine the feasible geometry first.

## PREVIOUS RECOVERY / MANUAL EVIDENCE — DO NOT REDO
Durable recovery chain:
- `cda4189dd99776bf64d78c0e771c64062f8eb12c` — emergency post-timeout recovery checkpoint.
- `9bcd7f91c3411beef19947e804e0d40dc45d7ac0` — recovered final pre-fix automation result.
- `6252b538bc918723d1b6c72eb7e3a1c136b94728` — local/live evidence equivalence.
- `ecc061adf0ed9545718a91f3145c3626a16dd9e7` — manual visual obstruction checkpoint.
- `b519655358488e8d555d710ca718578c8d96fcae` — modal scale-vs-safe-zone contract conflict.
- `46d53d9c870fa978b7e7237cd293127c84dfab81` — scoped safe-zone fix checkpoint before Actions.
- `35d9fc39552f9819c86ba26e5eccde0154b2b9d0` — one-shot running-Actions status checkpoint.

Pre-fix product head `3802e2d2bfcb425b2533acf9a6b960cbf2b992a4` had full automation PASS, but manual artifact review found the top-left modal character obscuring title/subtitle in phone portrait, iPad portrait, and iPad landscape. Phone landscape modal passed. Page states in all four orientations passed. UAT-009 density passed.

Pre-fix full artifact:
- `10832610030`
- digest `sha256:6fe188ce4781c0f377048ad907cd3586f179e3c82a3d7bab9205a50e9c463364`
- local/deployed `34-chunk4-*` pairs were byte-identical.

## SCOPED SAFE-ZONE CHANGE ALREADY DURABLE — DO NOT REAPPLY
CSS commit `5bb9cb4d…` changed only modal `.decor-a` in the three manually failing orientations:
- phone portrait `92x101 -> 56x61`
- iPad portrait `128x141 -> 70x77`
- iPad/wide landscape `142x156 -> 72x79`
- phone-landscape modal stayed `80x87`
- page-state geometry, `.decor-b`, `.decor-c`, UAT-009 density, and business logic were untouched.

QA commit `42a6bedf…` added a direct `.modal-title` / `.modal-subtitle` non-intersection gate for those three states while preserving other Chunk 4 gates.

`b5196553… -> 42a6bedf…` was verified to touch exactly:
1. `assets/visual-uat-v4-chunk4.css`
2. `qa/chunk4-polish-v4-contract.mjs`

## VERIFIED BASELINE — DO NOT REOPEN
- V4 Chunk 1 `UAT-001/002/003` — VERIFIED COMPLETE; checkpoint `3eb47a81fa1bd84d2ebf8942e694deeaea333ef5`.
- V4 Chunk 2 `UAT-004/005` + landscape UAT-010 — VERIFIED COMPLETE; checkpoint `8eefd4142a4d2d27dca7dcf8e8ce175238b335e8`.
- V4 Chunk 3 `UAT-006/007` — VERIFIED COMPLETE; checkpoint `92aef5661454ea21580328df96cd3428838a43d5`.
- Approved production character binaries remain locked; do not remap/reconstruct them.

## LOCKED INVARIANTS
- no recipe/business/quantity/exclusion/replacement/Matrix/PIN/import-export changes.
- no high-resolution character binary/source remapping.
- preserve all page-state geometry that passed manual review.
- preserve phone-landscape modal state that already passed manual review.
- preserve modal bottom-left/right characters and UAT-009 density.
- preserve Chunk 1/2/3 contracts and existing P0/layering/sharpness/tap-safety gates unless concrete evidence proves a contract itself invalid.

## DO NOT REPEAT
- do not poll/re-read completed UI QA `36058265001` again.
- do not redo its full log analysis; the exact first failure is recorded above.
- do not restart repo-wide/Chunk 4 investigation.
- do not redo old artifact/manual review.
- do not simply revert to the old oversized modal `.decor-a` values; those reproduce the manually verified header obstruction.
- do not simply relax P0-A or the new title/subtitle safe-zone gate.
- do not change code before the bounded geometry investigation below is checkpointed.

## EXACT NEXT ACTION — BOUNDED ROOT-CAUSE WORK ONLY
1. Fresh-read current `main` and this handoff.
2. Inspect **only**:
   - `qa/character-composition-v2-contract.mjs` to recover the exact P0-A calculator/modal `.decor-a` story-detail minimum and any geometry assumptions;
   - the current modal `.decor-a` rules in `assets/visual-uat-v4-chunk4.css`;
   - only if strictly necessary, the modal/card/header geometry that determines the available top-left safe region.
3. Determine a concrete feasible size/placement region that satisfies BOTH:
   - legacy P0-A story-detail preservation;
   - direct title/subtitle non-intersection safe zone.
4. **Checkpoint that root cause / feasible geometry before editing CSS or tests.**
5. Then make the smallest presentation-only fix. Do not relax either contract blindly.

## FINAL COMPLETION CONDITION
Chunk 4 is NOT complete. It becomes VERIFIED COMPLETE only after:
- P0-A and all existing regression gates pass after the final geometry fix;
- new Chunk 4 title/subtitle safe-zone gate passes local + deployed;
- local/deployed evidence consistency is verified;
- manual review of the three previously failing modal orientations confirms no title/subtitle obstruction;
- UAT-008 / UAT-009 / final UAT-010 status is persisted.

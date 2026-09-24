# EMERGENCY POST-TIMEOUT RECOVERY CHECKPOINT — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + `CURRENT_HANDOFF.md` + GitHub Actions.
> Recovery timestamp: 2026-09-25 03:42 +07:00.
> This section supersedes the stale Chunk 4 "EXACT NEXT" text further below until recovery is completed.

## CURRENT MAIN HEAD — VERIFIED DURABLE
- `main` before this recovery-checkpoint write: `3802e2d2bfcb425b2533acf9a6b960cbf2b992a4`.
- tree: `98d2cba6fbe8f4704e90f8f629d3eec00212d03f`.
- latest relevant code commit: `3802e2d2bfcb425b2533acf9a6b960cbf2b992a4` — `Keep enlarged iPad character inside left rail`.
- parent: `6bd85ed12b1cbcc7e1efd4fe32e14ec1bd72905f`.

## VERIFIED DURABLE
- Chunk 1 / Chunk 2 / Chunk 3 remain previously VERIFIED COMPLETE; do not reopen without new reproduced evidence.
- Chunk 4 implementation/test work already exists on `main`; do not restart Chunk 4 investigation from scratch.
- The exact latest durable product change is in `assets/visual-uat-v4-chunk4.css`: normal iPad portrait `.decor-b` kept at `162x119` and moved from `left:7px` to `left:1px` only.
- That offset-only correction is commit `3802e2d2bfcb425b2533acf9a6b960cbf2b992a4` and is durable on `main`.
- Current GitHub Actions for that exact head have reached final state:
  - UI QA run `36054794980` — `completed/success`.
  - Pages build/deployment run `36054790742` — `completed/success`.
- The final Actions success above is externally durable in GitHub and is being persisted into this handoff by this emergency checkpoint.

## INVESTIGATION ALREADY PERFORMED — DO NOT REDO
- Inspected the earlier failed UI QA run `36054197193` and its job log.
- Confirmed Chunk 4 LOCAL itself passed Chromium + WebKit across the four target orientations before the later regression gate.
- Isolated the later failure to existing `qa/layering-orientation-v1-contract.mjs`, not to recipe/business logic.
- Inspected `qa/layering-orientation-v1-contract.mjs` and its rail-intrusion geometry.
- Inspected `assets/visual-uat-v4-chunk4.css` and relevant iPad portrait sizing/offset rules.
- Verified the regression contract keeps `maxRailIntrusion = 40` for non-phone-portrait cases.
- The concrete failing evidence was: `chromium/ipad-portrait/local: left character rail intrudes 45px into cards`.
- The bounded correction chosen from that evidence was to preserve the enlarged `162x119` bottom-left character and move it left by 6px, from `left:7px` to `left:1px`; the regression test was not relaxed.

## CHUNK 4 RECOVERED CHANGE HISTORY — ALREADY COMMITTED, DO NOT REAPPLY
Visible durable work before timeout includes:
- `9335b84f…` initial Chunk 4 implementation/contract wiring.
- `6272565b…` phone portrait right-character shelf correction after P0-B evidence.
- `44478dad…` Chunk 4 threshold-only correction to match the preserved P0-B bound.
- `4e62fe5e…` phone portrait UAT-009 density correction.
- `b5185425…` clipped-control QA geometry correction; product CSS unchanged in that step.
- `e1267038…` phone-landscape UAT-009 chrome reduction while preserving Chunk 2 geometry.
- `6bd85ed12b1cbcc7e1efd4fe32e14ec1bd72905f` half-open clipping-boundary QA correction; product CSS unchanged in that step.
- `3802e2d2bfcb425b2533acf9a6b960cbf2b992a4` iPad portrait bottom-left rail-offset correction.

## VERIFIED BUT NOT YET PERSISTED BEFORE THIS RECOVERY WRITE
- At timeout, the final result of UI QA `36054794980` had not yet been written into `CURRENT_HANDOFF.md`.
- At timeout, the final result of Pages `36054790742` had not yet been written into `CURRENT_HANDOFF.md`.
- Those two final results are now recorded above by this recovery checkpoint.
- Manual inspection of the final `34-chunk4-*` / live evidence for the successful `3802e2d2…` run has NOT yet been recovered/verified in this session.
- A final Chunk 4 completion checkpoint (manual evidence + exact final artifact metadata + final UAT-008/009/010 status) has NOT yet been written.

## UNKNOWN / LOST TAIL
- Any hidden/internal reasoning after the last visible Actions polling before timeout is intentionally treated as UNKNOWN and will not be reconstructed by broad re-investigation.
- No uncommitted code/CSS change is evidenced after `3802e2d2…`; treat any alleged local-only edit after that commit as UNKNOWN unless GitHub proves it exists.
- Final artifact ID/digest for successful UI QA `36054794980` is not yet recovered in this checkpoint.
- Final per-step job summary for successful UI QA `36054794980` is not yet recovered in this checkpoint.
- Manual visual verdict for the final successful `3802e2d2…` screenshots is UNKNOWN until the persisted artifact is inspected.

## DO NOT REPEAT
- Do not restart repo-wide or Chunk 4 root-cause investigation.
- Do not re-open V3 high-res repair/source reconstruction.
- Do not re-run the already diagnosed `36054197193` failure analysis.
- Do not re-derive the 45px iPad portrait rail failure or re-apply the `left:7px -> 1px` fix.
- Do not relax `qa/layering-orientation-v1-contract.mjs` rail tolerance.
- Do not alter recipe/business meaning, quantity calculations, exclusion/replacement semantics, Matrix logic, PIN behavior, or unrelated import/export behavior.
- Do not poll GitHub Actions in a long loop.

## EXACT NEXT ACTION — RECOVERY ONLY
After confirming this emergency checkpoint is on remote `main`, perform ONE bounded Phase-1 recovery read for the already-finished `3802e2d2…` verification:
1. Fetch UI QA run `36054794980` jobs ONCE to recover the final per-step state. Because the run is already `completed/success`, do not read failure logs unless an unexpected failed/skipped required step is revealed.
2. Fetch the run artifact metadata ONCE to recover final artifact ID/digest.
3. Confirm Pages `36054790742` remains `completed/success` without a polling loop.
4. Immediately update `CURRENT_HANDOFF.md` with the recovered final step/artifact evidence and commit it.
5. STOP before any new product investigation. If final steps are all green, the next work unit after that checkpoint is manual inspection of representative final `34-chunk4-*` local/deployed screenshots only, followed by an immediate Chunk 4 verification checkpoint.

---

# PRE-TIMEOUT DURABLE CONTEXT — PRESERVED BELOW

## CURRENT OBJECTIVE
Hands-on V4 UAT is in progress. **Chunk 1, Chunk 2, and Chunk 3 are VERIFIED COMPLETE.** Preserve all verified responsive/interaction behavior, exact high-resolution character assets, and business semantics. The bounded work unit in progress at timeout was **Chunk 4 only: character scale + detail density polish (`UAT-008` / `UAT-009`) plus final `UAT-010` interaction-safety recheck**.

## VERIFIED BASELINE — DO NOT REDO
- V2 P0-A/B/C/D VERIFIED; V3 Session 1 VERIFIED; Session 2A DONE; Session 2B.1 VERIFIED; V3 Session 2B.2 visual acceptance VERIFIED PASS.
- Production high-resolution overlays remain exact:
  - top `assets/overlay-top-left-hires.webp` → blob `990c6b3523f79a483f41f17032f03f880f97f461`.
  - bottom `assets/overlay-bottom-left-hires.webp` → blob `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`.
  - right `assets/overlay-right-hires.webp` → blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
- V3 readiness checkpoint `15c678e8535872fbf25d76a76d7d410648fe0346`.
- Do not redo repair/reconstruction/high-res recovery unless a new verified regression proves it necessary.

## V4 HANDS-ON UAT EVIDENCE — DURABLE
Durable defect register: `docs/UAT_DEFECTS_2026-09-25_V4.md` created in `c88dfa414c68ec938581e710db34d632b31879e6`.
Initial V4 work-head checkpoint: `2cc395196d03262c4c171c9f9b0be334ef8e63de`.

## V4 CHUNK 1 — VERIFIED COMPLETE
Resolved `UAT-001/002/003`.
- Pages `36041042430` — completed/success.
- UI QA `36041043778` — completed/success.
- artifact `10826890723`, digest `sha256:1b2c36a36ad8c0cd19428eaa68df706b8f729289e277e0ba70b02e95d03a0696`.
- durable checkpoint `3eb47a81fa1bd84d2ebf8942e694deeaea333ef5`.

## V4 CHUNK 2 — VERIFIED COMPLETE
Resolved `UAT-004/005`; `UAT-010` verified for landscape interaction state, with final cross-state recheck reserved for Chunk 4.
- Pages `36043980683` — completed/success.
- UI QA `36043981769` — completed/success.
- artifact `10827363085`, digest `sha256:93d9dd79b431ea9f82981206f47648a6ee82a683b12e6be57bf43201382a1eb1`.
- durable checkpoint `8eefd4142a4d2d27dca7dcf8e8ce175238b335e8`.

## V4 CHUNK 3 — VERIFIED COMPLETE
Resolved `UAT-006/007`.
- Pages `36049635506` — completed/success.
- UI QA `36049636400` — completed/success.
- artifact `10830321129`, digest `sha256:35dc6789cb2e881c097da77dfa0a230584cb93ad2929e4329e6992eb5383dd59`.
- manual local/deployed `33-thumbnail-v4-*` evidence PASS.
- local/deployed evidence byte-identical by orientation.
- STATUS: **DO NOT REOPEN UAT-006/007 without new hands-on evidence.**

## LOCKED INVARIANTS DURING CHUNK 4
- Do not change recipe/business meaning, quantity calculations, exclusion/replacement semantics, Matrix logic, PIN behavior, or unrelated import/export behavior.
- Do not replace/remap verified exact high-resolution character assets.
- Keep all three characters together where expected; bottom-left NO GLASSES; top-left glasses + drink + peace gesture + bubble; right backpack/straps + clipboard/pen + food/chalkboard + bubble.
- Preserve Chunk 1 backmost background architecture.
- Preserve Chunk 2 low-height landscape calculator geometry and durable landscape interaction contract.
- Preserve Chunk 3 item-level thumbnail semantic cues and compact tile dimensions unless a new reproduced regression specifically requires adjustment.
- Decorative/background layers remain `pointer-events:none` and outside protected tap/content zones.

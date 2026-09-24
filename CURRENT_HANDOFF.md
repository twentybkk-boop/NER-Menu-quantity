# EMERGENCY POST-TIMEOUT RECOVERY CHECKPOINT — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + `CURRENT_HANDOFF.md` + GitHub Actions.
> Recovery started: 2026-09-25 03:42 +07:00.

## CURRENT WORK HEAD
- Latest durable recovery checkpoint before this write: `9bcd7f91c3411beef19947e804e0d40dc45d7ac0` — `Persist recovered final Chunk 4 automation result`.
- Latest relevant product/test head under verification remains `3802e2d2bfcb425b2533acf9a6b960cbf2b992a4` — `Keep enlarged iPad character inside left rail`.
- `3802e2d2…` tree: `98d2cba6fbe8f4704e90f8f629d3eec00212d03f`.
- The only code change in `3802e2d2…` is `assets/visual-uat-v4-chunk4.css`: iPad portrait normal `.decor-b` remains `162x119` and moves `left:7px -> 1px`.

## RECOVERY PHASE 0 — VERIFIED DURABLE
- Recovery checkpoint `cda4189dd99776bf64d78c0e771c64062f8eb12c` is on remote `main` and was re-read successfully.
- Chunk 1 / Chunk 2 / Chunk 3 remain VERIFIED COMPLETE and are not reopened.
- No evidence exists of an uncommitted code/CSS edit after `3802e2d2…`.

## RECOVERY PHASE 1 — FINAL AUTOMATION STATE — VERIFIED DURABLE
Exact head verified: `3802e2d2bfcb425b2533acf9a6b960cbf2b992a4`.

### Pages
- run `36054790742` — `completed/success`.
- head SHA `3802e2d2bfcb425b2533acf9a6b960cbf2b992a4`.

### UI QA
- run `36054794980` — `completed/success`.
- job `107818939787` — `completed/success`.
- No required step failed or was skipped.
- Critical recovered success gates:
  - base Chromium + WebKit UI QA — PASS.
  - P0-A complete character composition — PASS.
  - P0-B protected center frame — PASS.
  - P0-D top composition / long-list rhythm — PASS.
  - V4 thumbnail semantics + compact density LOCAL — PASS.
  - **V4 Chunk 4 character scale + detail density + safety LOCAL — PASS.**
  - **orientation/layering LOCAL — PASS.**
  - V3 exact high-res sharpness LOCAL — PASS.
  - calculator hierarchy — PASS.
  - V4 phone-landscape calculator interaction LOCAL — PASS.
  - deployed P0-A/P0-B/P0-D — PASS.
  - deployed V4 thumbnail semantics + compact density — PASS.
  - **deployed V4 Chunk 4 character scale + detail density + safety — PASS.**
  - **deployed orientation/layering — PASS.**
  - deployed V4 phone-landscape calculator interaction — PASS.
  - deployed V3 exact high-res sharpness — PASS.
  - screenshot upload — PASS.

### Final artifact
- artifact name: `ui-qa-screenshots`.
- artifact ID: `10832610030`.
- size: `74,538,232` bytes.
- digest: `sha256:6fe188ce4781c0f377048ad907cd3586f179e3c82a3d7bab9205a50e9c463364`.
- artifact workflow head SHA is exactly `3802e2d2bfcb425b2533acf9a6b960cbf2b992a4`.

## MANUAL EVIDENCE HASH PRECHECK — VERIFIED DURABLE
Artifact `10832610030` was downloaded once and only the Chunk 4 evidence was extracted.

For every final Chunk 4 page/modal screenshot, LOCAL and DEPLOYED files are byte-identical:
- iPad landscape modal: `6a351ed8dce8c8a7d5ea1130108940ee5539cf7db281989799452ab2f566497d`.
- iPad landscape page: `0985c7b056e4cc69a6023244f11352a06ab51e8875a8c122c43529dc8d0612ab`.
- iPad portrait modal: `5a8dcaabe8972f3fcec246661809e2b3a4eab778aac94ea91efe3245156eae1e`.
- iPad portrait page: `689e0438fafd83f66353674a9a9e0bc822d88193360fec37e753555939ed95eb`.
- phone landscape modal: `10679f1f01332aa413ec0730ee8fec18a57200fe48dcac972e06105094024aa8`.
- phone landscape page: `8e8c604bce1924db5b26917127ed28f9b18c0577e6953ab5f075abfb67c93257`.
- phone portrait modal: `21bff05dabaf02befce5872cca2cde55431256ac52b3be52cce91923bce058ee`.
- phone portrait page: `b654f52f4290c4263aa4be5b8506208189bda00e50457953be19c2065e55d866`.

Consequence: manual visual inspection only needs the 8 LOCAL files (`page` + `modal` × 4 orientations); their matching deployed evidence is exactly the same bytes and must not be re-inspected separately.

## INVESTIGATION ALREADY PERFORMED — DO NOT REDO
- Earlier failed run `36054197193` was inspected before timeout.
- Chunk 4 LOCAL itself had already passed there; the later failure was isolated to `qa/layering-orientation-v1-contract.mjs`.
- Exact failure evidence: `chromium/ipad-portrait/local: left character rail intrudes 45px into cards`.
- `qa/layering-orientation-v1-contract.mjs` was inspected; non-phone-portrait `maxRailIntrusion` remains `40px`.
- `assets/visual-uat-v4-chunk4.css` responsive geometry was inspected.
- The bounded correction preserved the enlarged iPad portrait bottom-left character at `162x119` and shifted it left by 6px (`7px -> 1px`); the regression test was not relaxed.
- Final recovered UI QA proves this correction resolves the layering regression LOCAL/DEPLOYED while preserving required gates.

## CHUNK 4 DURABLE CHANGE HISTORY — DO NOT REAPPLY
- `9335b84f…` initial Chunk 4 implementation/contract wiring.
- `6272565b…` phone portrait right-character shelf correction after P0-B evidence.
- `44478dad…` Chunk 4 threshold-only correction while preserving P0-B.
- `4e62fe5e…` phone portrait UAT-009 density correction.
- `b5185425…` clipped-control QA geometry correction; product CSS unchanged in that step.
- `e1267038…` phone-landscape UAT-009 chrome reduction while preserving Chunk 2 geometry.
- `6bd85ed12b1cbcc7e1efd4fe32e14ec1bd72905f` half-open clipping-boundary QA correction.
- `3802e2d2bfcb425b2533acf9a6b960cbf2b992a4` iPad portrait bottom-left rail-offset correction.

## VERIFIED BUT NOT YET PERSISTED
- Automated verification and local/deployed byte-equivalence are now persisted.
- **Final human visual verdict is still not durable**: the 8 LOCAL Chunk 4 screenshots still need visual inspection.

## UNKNOWN / LOST TAIL
- Any hidden/internal reasoning after the last visible pre-timeout polling is intentionally UNKNOWN and will not be recreated by broad re-investigation.
- No uncommitted product change after `3802e2d2…` is evidenced.

## LOCKED INVARIANTS
- Do not change recipe/business meaning, quantity calculations, exclusion/replacement semantics, Matrix logic, PIN behavior, or unrelated import/export behavior.
- Do not replace/remap verified exact high-resolution character assets.
- Keep all three characters together where expected; bottom-left NO GLASSES; top-left glasses + drink + peace gesture + bubble; right backpack/straps + clipboard/pen + food/chalkboard + bubble.
- Preserve Chunk 1 background, Chunk 2 landscape interaction geometry, and Chunk 3 thumbnail semantics/density.
- Decorative/background layers remain `pointer-events:none` and outside protected tap/content zones.

## DO NOT REPEAT
- Do not restart repo-wide or Chunk 4 root-cause investigation.
- Do not re-run failed-run `36054197193` analysis.
- Do not re-derive the 45px iPad portrait rail failure.
- Do not re-apply `left:7px -> 1px`.
- Do not relax the 40px rail tolerance.
- Do not poll completed runs `36054794980` / `36054790742` again.
- Do not visually inspect the `live-34-*` copies separately; they are byte-identical to local.

## EXACT NEXT ACTION
Perform **only final manual visual inspection of the 8 extracted LOCAL Chunk 4 screenshots**:
- `34-chunk4-phone-portrait-page.png`
- `34-chunk4-phone-portrait-modal.png`
- `34-chunk4-phone-landscape-page.png`
- `34-chunk4-phone-landscape-modal.png`
- `34-chunk4-ipad-portrait-page.png`
- `34-chunk4-ipad-portrait-modal.png`
- `34-chunk4-ipad-landscape-page.png`
- `34-chunk4-ipad-landscape-modal.png`

Judge only:
1. moderate character enlargement without protected-content/card intrusion;
2. all three character identities/details remain intact and together;
3. modal actionable content appears early enough and is not visually buried by chrome;
4. no visible content/tap obstruction in the reviewed modal state.

If PASS, immediately persist **V4 Chunk 4 VERIFIED COMPLETE** with UAT-008/UAT-009/UAT-010 PASS and set the next action from the durable defect register/current project tail. If FAIL, persist the exact visible defect before any code edit.

---

## VERIFIED BASELINE — DO NOT REDO
- V2 P0-A/B/C/D VERIFIED; V3 Session 1 VERIFIED; Session 2A DONE; Session 2B.1 VERIFIED; V3 Session 2B.2 visual acceptance VERIFIED PASS.
- Production high-resolution overlays remain exact:
  - top `assets/overlay-top-left-hires.webp` → blob `990c6b3523f79a483f41f17032f03f880f97f461`.
  - bottom `assets/overlay-bottom-left-hires.webp` → blob `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`.
  - right `assets/overlay-right-hires.webp` → blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
- V4 Chunk 1 checkpoint `3eb47a81fa1bd84d2ebf8942e694deeaea333ef5`.
- V4 Chunk 2 checkpoint `8eefd4142a4d2d27dca7dcf8e8ce175238b335e8`.
- V4 Chunk 3 head `98a8febd21fe796111488e5607922fdf4569d0f8`; artifact `10830321129`; manual evidence PASS.

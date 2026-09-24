# EMERGENCY POST-TIMEOUT RECOVERY CHECKPOINT — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + `CURRENT_HANDOFF.md` + GitHub Actions.
> Recovery started: 2026-09-25 03:42 +07:00.

## CURRENT WORK HEAD
- Latest durable recovery checkpoint before this write: `cda4189dd99776bf64d78c0e771c64062f8eb12c` — `Emergency post-timeout recovery checkpoint`.
- Latest relevant product/test head under verification: `3802e2d2bfcb425b2533acf9a6b960cbf2b992a4` — `Keep enlarged iPad character inside left rail`.
- `3802e2d2…` tree: `98d2cba6fbe8f4704e90f8f629d3eec00212d03f`.
- `3802e2d2…` parent: `6bd85ed12b1cbcc7e1efd4fe32e14ec1bd72905f`.
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
  - thumbnail contact-sheet and character-inventory rendering — PASS.
  - screenshot upload — PASS.

### Final artifact
- artifact name: `ui-qa-screenshots`.
- artifact ID: `10832610030`.
- size: `74,538,232` bytes.
- digest: `sha256:6fe188ce4781c0f377048ad907cd3586f179e3c82a3d7bab9205a50e9c463364`.
- artifact is not expired.
- artifact workflow head SHA is exactly `3802e2d2bfcb425b2533acf9a6b960cbf2b992a4`.

## INVESTIGATION ALREADY PERFORMED — DO NOT REDO
- Earlier failed run `36054197193` was inspected before timeout.
- Chunk 4 LOCAL itself had already passed there; the later failure was isolated to `qa/layering-orientation-v1-contract.mjs`.
- Exact failure evidence: `chromium/ipad-portrait/local: left character rail intrudes 45px into cards`.
- `qa/layering-orientation-v1-contract.mjs` was inspected; non-phone-portrait `maxRailIntrusion` remains `40px`.
- `assets/visual-uat-v4-chunk4.css` responsive geometry was inspected.
- The bounded correction preserved the enlarged iPad portrait bottom-left character at `162x119` and shifted it left by 6px (`7px -> 1px`); the regression test was not relaxed.
- Final recovered UI QA now proves that this correction resolves the layering regression in both LOCAL and DEPLOYED checks while preserving all other required gates.

## CHUNK 4 DURABLE CHANGE HISTORY — DO NOT REAPPLY
Visible committed work before timeout includes:
- `9335b84f…` initial Chunk 4 implementation/contract wiring.
- `6272565b…` phone portrait right-character shelf correction after P0-B evidence.
- `44478dad…` Chunk 4 threshold-only correction while preserving P0-B.
- `4e62fe5e…` phone portrait UAT-009 density correction.
- `b5185425…` clipped-control QA geometry correction; product CSS unchanged in that step.
- `e1267038…` phone-landscape UAT-009 chrome reduction while preserving Chunk 2 geometry.
- `6bd85ed12b1cbcc7e1efd4fe32e14ec1bd72905f` half-open clipping-boundary QA correction; product CSS unchanged in that step.
- `3802e2d2bfcb425b2533acf9a6b960cbf2b992a4` iPad portrait bottom-left rail-offset correction.

## VERIFIED BUT NOT YET PERSISTED
- None for automated verification: final Pages/UI QA/artifact state is now persisted by this checkpoint write.
- Manual visual inspection of representative final `34-chunk4-*` and `live-34-chunk4-*` screenshots from artifact `10832610030` is **not yet done**.
- Therefore the final human visual verdict for UAT-008/UAT-009/UAT-010 is not yet durable.

## UNKNOWN / LOST TAIL
- Any hidden/internal reasoning after the last visible pre-timeout polling is intentionally treated as UNKNOWN and will not be recreated by broad re-investigation.
- No uncommitted product change after `3802e2d2…` is evidenced; treat any such alleged change as UNKNOWN unless GitHub proves otherwise.
- Manual screenshot observations from after the timeout are UNKNOWN because none were durably recorded.

## LOCKED INVARIANTS
- Do not change recipe/business meaning, quantity calculations, exclusion/replacement semantics, Matrix logic, PIN behavior, or unrelated import/export behavior.
- Do not replace/remap verified exact high-resolution character assets.
- Keep all three characters together where expected; bottom-left NO GLASSES; top-left glasses + drink + peace gesture + bubble; right backpack/straps + clipboard/pen + food/chalkboard + bubble.
- Preserve Chunk 1 backmost background architecture.
- Preserve Chunk 2 low-height landscape calculator geometry and durable landscape interaction contract.
- Preserve Chunk 3 item-level thumbnail semantic cues and compact tile dimensions.
- Decorative/background layers remain `pointer-events:none` and outside protected tap/content zones.

## DO NOT REPEAT
- Do not restart repo-wide or Chunk 4 root-cause investigation.
- Do not re-open V3 high-res repair/source reconstruction.
- Do not re-run analysis of failed run `36054197193`.
- Do not re-derive the 45px iPad portrait rail failure.
- Do not re-apply `left:7px -> 1px`; it is already durable and automation-verified.
- Do not relax `qa/layering-orientation-v1-contract.mjs` rail tolerance.
- Do not poll completed runs `36054794980` / `36054790742` again unless a new conflicting GitHub state appears.

## EXACT NEXT ACTION
Perform **only manual evidence inspection for the already-successful `3802e2d2…` run**:
1. Download artifact `10832610030` once.
2. Inspect representative final `34-chunk4-*` LOCAL screenshots and matching `live-34-chunk4-*` DEPLOYED screenshots for phone portrait, phone landscape, iPad portrait, and iPad landscape.
3. Verify visually only: moderate character enlargement without protected-content intrusion, earlier actionable modal content, all three character identities/details intact, and no visible tap/content obstruction in the reviewed modal/detail state.
4. Do not change code unless the persisted screenshots reproduce a real visual defect.
5. Immediately persist a Chunk 4 manual-verification checkpoint with PASS/FAIL evidence and exact next action.

---

## VERIFIED BASELINE — DO NOT REDO
- V2 P0-A/B/C/D VERIFIED; V3 Session 1 VERIFIED; Session 2A DONE; Session 2B.1 VERIFIED; V3 Session 2B.2 visual acceptance VERIFIED PASS.
- Production high-resolution overlays remain exact:
  - top `assets/overlay-top-left-hires.webp` → blob `990c6b3523f79a483f41f17032f03f880f97f461`.
  - bottom `assets/overlay-bottom-left-hires.webp` → blob `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`.
  - right `assets/overlay-right-hires.webp` → blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
- V3 readiness checkpoint `15c678e8535872fbf25d76a76d7d410648fe0346`.
- V4 Chunk 1 checkpoint `3eb47a81fa1bd84d2ebf8942e694deeaea333ef5`.
- V4 Chunk 2 checkpoint `8eefd4142a4d2d27dca7dcf8e8ce175238b335e8`.
- V4 Chunk 3 verification head `98a8febd21fe796111488e5607922fdf4569d0f8`; artifact `10830321129`, digest `sha256:35dc6789cb2e881c097da77dfa0a230584cb93ad2929e4329e6992eb5383dd59`; manual evidence PASS.

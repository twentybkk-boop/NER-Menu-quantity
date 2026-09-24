# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + `CURRENT_HANDOFF.md` + GitHub Actions + persisted screenshot artifact.
> Recovery started: 2026-09-25 03:42 +07:00.

## CURRENT WORK HEAD
- Latest durable checkpoint before this write: `6252b538bc918723d1b6c72eb7e3a1c136b94728` — local/live Chunk 4 evidence equivalence.
- Latest relevant product/test code head remains `3802e2d2bfcb425b2533acf9a6b960cbf2b992a4`.
- No product code was changed during recovery/manual inspection after `3802e2d2…`.

## RECOVERY STATUS — VERIFIED DURABLE
Recovery is complete and durable.
- emergency checkpoint: `cda4189dd99776bf64d78c0e771c64062f8eb12c`.
- final automation-result checkpoint: `9bcd7f91c3411beef19947e804e0d40dc45d7ac0`.
- local/live evidence-equivalence checkpoint: `6252b538bc918723d1b6c72eb7e3a1c136b94728`.

## FINAL AUTOMATION STATE FOR `3802e2d2…` — VERIFIED PASS
- Pages run `36054790742` — `completed/success`.
- UI QA run `36054794980` — `completed/success`.
- UI QA job `107818939787` — all required steps success.
- Chunk 4 character scale/detail density/safety LOCAL + DEPLOYED — automated PASS.
- orientation/layering LOCAL + DEPLOYED — automated PASS.
- P0-A/P0-B/P0-D, sharpness, calculator hierarchy, phone-landscape interaction and thumbnail regressions — PASS.

Artifact:
- ID `10832610030`.
- digest `sha256:6fe188ce4781c0f377048ad907cd3586f179e3c82a3d7bab9205a50e9c463364`.
- workflow head exactly `3802e2d2bfcb425b2533acf9a6b960cbf2b992a4`.

## LOCAL/DEPLOYED EVIDENCE EQUIVALENCE — VERIFIED
All eight final Chunk 4 LOCAL screenshots are byte-identical to their matching DEPLOYED screenshots. Therefore manual inspection of local copies is authoritative for the deployed visual state too.

## FINAL MANUAL VISUAL REVIEW — FAIL, DURABLE EVIDENCE
Reviewed exactly these eight LOCAL files from artifact `10832610030`:
- `34-chunk4-phone-portrait-page.png`
- `34-chunk4-phone-portrait-modal.png`
- `34-chunk4-phone-landscape-page.png`
- `34-chunk4-phone-landscape-modal.png`
- `34-chunk4-ipad-portrait-page.png`
- `34-chunk4-ipad-portrait-modal.png`
- `34-chunk4-ipad-landscape-page.png`
- `34-chunk4-ipad-landscape-modal.png`

### Page state — PASS across all four orientations
- all three approved characters are present together.
- top-left identity/details intact: glasses + drink + peace gesture + bubble.
- bottom-left identity/details intact: NO GLASSES + helmet + cat/table + bubble.
- right identity/details intact: backpack/straps + clipboard/pen + food/chalkboard + bubble.
- moderate enlargement reads clearly.
- no visible character intrusion into menu-card content lanes in the reviewed page state.
- the prior iPad portrait left-rail defect is visually resolved after `left:7px -> 1px`.

### UAT-009 modal density — MANUAL PASS
- actionable exclusion options appear immediately after a compact modal header/section label.
- no excessive intro/status chrome visually buries the first actionable control.
- phone portrait, phone landscape, iPad portrait, and iPad landscape all show materially compacted pre-action vertical overhead.

### Final modal safe-zone review — MANUAL FAIL
A real **visual content-obstruction** defect remains even though tap/interaction automation passes.

Observed:
- **phone portrait modal:** top-left character visibly overlaps the left side of the modal header and obscures part of the menu title/subtitle region.
- **iPad portrait modal:** same issue; top-left character overlaps the left header/title/subtitle region.
- **iPad landscape modal:** smaller but still visible intrusion into the beginning of the modal title/header region.
- **phone landscape modal:** no comparable title obstruction observed.
- bottom-left and right characters remain outside the actionable modal content and do not visibly obstruct the reviewed controls.
- no tap-target obstruction was observed by automation; this is specifically a visual/content safe-zone failure.

### UAT verdict after manual evidence
- `UAT-008` moderate character enlargement: **PARTIAL / NOT COMPLETE** — page state passes, but enlarged top-left modal-state presentation violates the visual header safe zone in 3 orientations.
- `UAT-009` detail/selection modal density: **PASS**.
- final `UAT-010` interaction/tap safety automation: **PASS**, but final visual safe-zone review is **FAIL** because modal header content is visibly covered.
- Therefore **V4 Chunk 4 is NOT VERIFIED COMPLETE yet**.

## ROOT CAUSE ALREADY NARROWED BY VISUAL EVIDENCE
The remaining defect is not recipe logic, modal semantics, or card geometry. It is limited to **modal-state top-left character (`.decor-a`) responsive scale/offset** relative to the modal header/title safe zone.

Do not reopen bottom-left/right character geometry, UAT-009 density, page-state layout, recipe/business behavior, or completed Chunk 1/2/3 work unless a new regression appears.

## LOCKED INVARIANTS
- do not change recipe/business meaning, quantity calculations, exclusion/replacement semantics, Matrix logic, PIN behavior, or unrelated import/export behavior.
- do not replace/remap approved high-resolution character assets.
- keep all three characters present together where expected.
- preserve page-state enlargement that passed manual review.
- preserve Chunk 1 background, Chunk 2 landscape interaction geometry, Chunk 3 thumbnail semantics/density, and the 40px layering rail tolerance.
- preserve UAT-009 compact modal density.
- do not relax automated safety/regression gates.

## DO NOT REPEAT
- do not restart repo-wide/Chunk 4 investigation.
- do not re-poll completed runs `36054794980` / `36054790742`.
- do not re-inspect `live-34-*` copies separately; they are byte-identical to local.
- do not re-derive the old 45px iPad portrait page-rail failure or re-apply `left:7px -> 1px`.
- do not alter page-state character sizes/offsets that manually passed.
- do not change bottom-left/right modal characters unless new evidence specifically implicates them.

## EXACT NEXT ACTION
Perform one **small, presentation-only modal-state `.decor-a` fix** in `assets/visual-uat-v4-chunk4.css`:
1. Inspect only the existing modal-state `.decor-a` rules for:
   - phone portrait;
   - iPad portrait;
   - wide/iPad landscape.
2. Move/reduce only top-left modal character enough to clear the modal title/subtitle safe zone while keeping it visibly larger than the pre-Chunk-4 baseline where possible.
3. Do not change phone-landscape `.decor-a` unless its current PASS state is affected by a shared rule.
4. Do not change page-state character geometry, modal density, business logic, or automated test tolerances.
5. Verify the CSS diff is limited to modal-state `.decor-a` presentation and immediately persist a code-change checkpoint **before** starting GitHub Actions verification.

After that checkpoint, run the existing full UI QA once, inspect only new failure evidence if any, and checkpoint the final result before further work.

---

## VERIFIED BASELINE — DO NOT REDO
- V2 P0-A/B/C/D VERIFIED; V3 Session 1 VERIFIED; Session 2A DONE; Session 2B.1 VERIFIED; V3 Session 2B.2 visual acceptance VERIFIED PASS.
- V4 Chunk 1 checkpoint `3eb47a81fa1bd84d2ebf8942e694deeaea333ef5`.
- V4 Chunk 2 checkpoint `8eefd4142a4d2d27dca7dcf8e8ce175238b335e8`.
- V4 Chunk 3 head `98a8febd21fe796111488e5607922fdf4569d0f8`; artifact `10830321129`; manual evidence PASS.
- Production exact overlays remain:
  - top `990c6b3523f79a483f41f17032f03f880f97f461`.
  - bottom `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`.
  - right `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.

# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + durable UAT evidence/checkpoints.

## CURRENT OBJECTIVE
Hands-on V4 UAT is in progress. **Chunk 1, Chunk 2, and Chunk 3 are VERIFIED COMPLETE.** Preserve all verified responsive/interaction behavior, exact high-resolution character assets, and business semantics. The next bounded work unit is **Chunk 4 only: character scale + detail density polish (`UAT-008` / `UAT-009`) plus final `UAT-010` interaction-safety recheck**.

## VERIFIED BASELINE — DO NOT REDO
- V2 P0-A/B/C/D VERIFIED; V3 Session 1 VERIFIED; Session 2A DONE; Session 2B.1 VERIFIED; V3 Session 2B.2 visual acceptance VERIFIED PASS.
- Production high-resolution overlays remain exact and were untouched by V4 Chunk 3:
  - top `assets/overlay-top-left-hires.webp` → blob `990c6b3523f79a483f41f17032f03f880f97f461`.
  - bottom `assets/overlay-bottom-left-hires.webp` → blob `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`.
  - right `assets/overlay-right-hires.webp` → blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
- V3 readiness checkpoint `15c678e8535872fbf25d76a76d7d410648fe0346`.
- Do not redo repair/reconstruction/high-res recovery unless a new verified regression proves it necessary.

## V4 HANDS-ON UAT EVIDENCE — DURABLE
Durable defect register: `docs/UAT_DEFECTS_2026-09-25_V4.md` created in `c88dfa414c68ec938581e710db34d632b31879e6`.
Initial V4 work-head checkpoint: `2cc395196d03262c4c171c9f9b0be334ef8e63de`.

---

## V4 CHUNK 1 — BACKGROUND + LAYERING — VERIFIED COMPLETE
Resolved `UAT-001/002/003`.

Implementation:
- `assets/visual-uat-v4-chunk1.css` — `ee5c895a719949eec585da74fa05109f9008eac9`.
- load-order update — `b551180c6d6e4a154c8288c9b5d7f3d9126e39a3`.
- strengthened orientation contract — `20df83d84267a08590be8bcd266cba276667b2e0`.

Verification:
- Pages `36041042430` — completed/success.
- UI QA `36041043778` — completed/success.
- artifact `10826890723`, digest `sha256:1b2c36a36ad8c0cd19428eaa68df706b8f729289e277e0ba70b02e95d03a0696`.
- durable checkpoint `3eb47a81fa1bd84d2ebf8942e694deeaea333ef5`.

STATUS: **DO NOT REOPEN UAT-001/002/003 without new reproduced evidence.**

---

## V4 CHUNK 2 — LANDSCAPE INTERACTION + OVERLAY GEOMETRY — VERIFIED COMPLETE
Resolved `UAT-004/005`; `UAT-010` verified for landscape interaction state, with final cross-state recheck reserved for Chunk 4.

Key root cause:
- 844×390 phone landscape incorrectly matched historical width-only 768–1023 tablet rules, producing a measured 126px calculator card.

Implementation:
- `assets/visual-uat-v4-chunk2.css` — `fa1ae5a61dabf9cb0033c30213b37fe4c0a11529`.
- load-order update — `7442c4c9f66faa75f1f9bd27e30dddf721e7a143`.
- durable interaction contract `qa/landscape-calculator-v4-contract.mjs` plus test-only harness corrections `4bc92c09be661faf3762f7394e89f1a5928b9a5d` and `725fde7cef04227d8ee4fcc796d0399cbaefcdda`.

Final verification:
- Pages `36043980683` — completed/success.
- UI QA `36043981769` — completed/success.
- artifact `10827363085`, digest `sha256:93d9dd79b431ea9f82981206f47648a6ee82a683b12e6be57bf43201382a1eb1`.
- durable checkpoint `8eefd4142a4d2d27dca7dcf8e8ce175238b335e8`.

STATUS: **DO NOT REOPEN UAT-004/005 without new reproduced evidence. Preserve the landscape interaction contract.**

---

## V4 CHUNK 3 — THUMBNAIL SEMANTICS + COMPACT INFOGRAPHIC — VERIFIED COMPLETE
Resolved:
- `UAT-006` thumbnail infographic too generic for similar menu names — **VERIFIED FIXED**.
- `UAT-007` thumbnail/infographic footprint too large relative to information value — **VERIFIED FIXED**.

### Root cause — VERIFIED
- `assets/menu-thumbnail-map.css` / `semantic-atlas-v1.webp` still provide 45/45 semantic atlas provenance, but `assets/visual-thumbnail-infographic.css` intentionally stopped painting atlas crops in live menu cards after an earlier visual correction.
- live cards instead used simple pictogram tiles with coarse groups, so similar items shared the same cue: beef cuts shared `🥩`, leafy vegetables shared `🥬`, noodles shared `🍜`, tofu variants shared `▦`, several snacks shared `✦`.
- base infographic sizing remained large despite later card-density work: roughly 90–118×62–78px depending on viewport/signature state, so the tile competed with the real menu title.
- therefore reverting to photo atlas was not appropriate; the bounded fix was item-level semantic cues inside the accepted infographic system plus a smaller tile footprint.

### Implementation — PRESENTATION ONLY
1. `assets/visual-uat-v4-chunk3.css`
   - commit `049711ab7a9e293ca4fa48cef160b762c2dfaa7d` (`Refine V4 thumbnail semantics and footprint`).
   - menu-specific cue text is derived from current `recipe_master.json` menu names, e.g. `ใบพาย`, `ริบอาย`, `เสือร้อง`, `ผักบุ้ง`, `โหระพา`, `วุ้นเส้น`, `มาม่า`, `เต้าหู้/ปลา`, `เต้าหู้/ชีส`, `ไก่ป๊อป`, `เทเทอร์`, `สละ`, `ลูกตาล`, `พร้อมทาน`, `หมูจุก`.
   - no ingredient/recipe meaning was invented or changed.
   - compact tile targets:
     - base ordinary ~68×48; signature ~76×50.
     - phone portrait ordinary ~60×42; signature ~68×44.
     - low-height phone landscape ordinary ~62×42; signature ~70×44.
   - card min-height/touch targets were preserved.
2. `assets/visual-polish.css`
   - commit `e7ccb93fc396efed0f7eabe166cedf63e7f29430` (`Load V4 Chunk 3 thumbnail override last`).
3. `qa/thumbnail-semantic-v4-contract.mjs`
   - commit `4f579b25ec5a0f24f2e5d4ef9feaab793729b996` (`Add V4 thumbnail semantic density contract`).
   - verifies Chromium + WebKit at 390×844, 844×390, 820×1180, 1180×820.
   - requires 45 cards, specific representative cues, distinct cues within similar-item groups, compact dimension ceilings, and no card/page horizontal overflow.
   - captures `33-thumbnail-v4-*` evidence for all four orientations.
4. `.github/workflows/ui-qa.yml`
   - commit `98a8febd21fe796111488e5607922fdf4569d0f8` (`Verify V4 thumbnail semantics in UI QA`).
   - runs the Chunk 3 contract both LOCAL and DEPLOYED.

### Final verification — PASS
Verification head: `98a8febd21fe796111488e5607922fdf4569d0f8`.

- Pages run `36049635506` — **completed/success**.
- UI QA run `36049636400` — **completed/success**.
- thumbnail asset validator / atlas integrity — PASS.
- existing Chromium + WebKit UI QA — PASS.
- top composition / long-list rhythm — PASS.
- new V4 thumbnail semantic + compact density LOCAL — PASS for Chromium + WebKit across phone portrait, phone landscape, iPad portrait, iPad landscape.
- new V4 thumbnail semantic + compact density DEPLOYED — PASS for Chromium + WebKit across the same four viewports.
- Chunk 1 orientation/layering regression gates — PASS local/deployed.
- Chunk 2 phone-landscape interaction regression gates — PASS local/deployed.
- exact-character/high-res sharpness gates — PASS local/deployed.

Final artifact:
- `ui-qa-screenshots` artifact ID `10830321129`.
- digest `sha256:35dc6789cb2e881c097da77dfa0a230584cb93ad2929e4329e6992eb5383dd59`.

Manual evidence inspected only for Chunk 3:
- `33-thumbnail-v4-phone-portrait.png`
- `33-thumbnail-v4-phone-landscape.png`
- `33-thumbnail-v4-ipad-portrait.png`
- `33-thumbnail-v4-ipad-landscape.png`
- the four matching `live-33-thumbnail-v4-*` screenshots.

Manual result: **PASS**.
- similar menu items now display distinct, name-aligned recognition cues rather than one repeated generic category icon.
- infographic tiles are visibly smaller and subordinate to the actual menu title.
- phone portrait/landscape and iPad portrait/landscape retain clean long-list rhythm with no horizontal overflow.
- all three character compositions remain intact in the reviewed viewports.
- local and deployed evidence are byte-identical for each orientation:
  - phone portrait SHA256 `585b99224f98cf4da7f6d363c48e03fda51aad2aaf24b3b18be26fe5d99decc2`.
  - phone landscape SHA256 `0928729a167c8fdbd6f773a6f3ec3925134c8f182df4d137775dc25413a508e4`.
  - iPad portrait SHA256 `81193e3f620bc2137b4b427bca614b8d00b3efb5b1cc38c5b38572e875b972d8`.
  - iPad landscape SHA256 `578672d90b6a9ed08fd2c1f17ec99f3bd05df2f49fa5fe123fd2c7fbd5ff576d`.

STATUS: **V4 CHUNK 3 VERIFIED COMPLETE. DO NOT REOPEN UAT-006/007 without new hands-on evidence.**

---

## REMAINING V4 DEFECT SET / WORK HEAD

### P2 — Chunk 4: character scale + detail density polish — EXACT NEXT
- `UAT-008`: character illustrations can be moderately larger while preserving safe zones.
- `UAT-009`: detail/selection modal uses too much vertical real estate before actionable content.
- final visual + interaction-safety recheck of `UAT-010` across relevant modal/detail states.

## LOCKED INVARIANTS DURING CHUNK 4
- Do not change recipe/business meaning, quantity calculations, exclusion/replacement semantics, Matrix logic, PIN behavior, or unrelated import/export behavior.
- Do not replace/remap verified exact high-resolution character assets.
- Keep all three characters together where expected; bottom-left NO GLASSES; top-left glasses + drink + peace gesture + bubble; right backpack/straps + clipboard/pen + food/chalkboard + bubble.
- Preserve Chunk 1 backmost background architecture.
- Preserve Chunk 2 low-height landscape calculator geometry and durable landscape interaction contract.
- Preserve Chunk 3 item-level thumbnail semantic cues and compact tile dimensions unless a new reproduced regression specifically requires adjustment.
- Decorative/background layers remain `pointer-events:none` and outside protected tap/content zones.

## CHUNK ORDER — DO NOT SKIP
1. Chunk 1 — `UAT-001/002/003` — VERIFIED COMPLETE.
2. Chunk 2 — `UAT-004/005/010` landscape state — VERIFIED COMPLETE.
3. Chunk 3 — `UAT-006/007` — VERIFIED COMPLETE.
4. **Chunk 4 — `UAT-008/009` + final `UAT-010` recheck — EXACT NEXT.**

## DO NOT REPEAT
- Do not redo V3 repair/source reconstruction/high-res recovery.
- Do not reopen Chunk 1/2/3 without new reproduced evidence.
- Do not investigate recipe/business semantics during Chunk 4 visual-density work.
- Do not remove or relax `qa/landscape-calculator-v4-contract.mjs` or `qa/thumbnail-semantic-v4-contract.mjs`.
- Do not replace the approved character binaries; Chunk 4 may adjust responsive presentation scale/offset only.

## OPEN BLOCKERS
1. `UAT-008` moderate character scale increase remains unresolved.
2. `UAT-009` detail/selection modal density remains unresolved.
3. final cross-state `UAT-010` visual/tap-zone recheck remains unresolved.

## EXACT NEXT RECOVERY ACTION
Start **Chunk 4 only** from current GitHub `main`. First inspect only the responsive character sizing/offset rules and the detail/selection modal header/intro/status geometry that determine how soon actionable exclusion/options appear. Reproduce `UAT-008` and `UAT-009` against the current verified state; do not alter recipe or interaction semantics. Make the smallest presentation-only adjustment that moderately enlarges all three approved high-resolution character compositions while preserving their required identities/details and protected content/tap zones, and tightens the detail/selection modal so actionable options appear earlier. Then run targeted phone portrait, phone landscape, iPad portrait and iPad landscape visual/interaction QA, rerun the existing Chunk 1/2/3 regression contracts, explicitly recheck `UAT-010` pointer/tap safety, inspect representative local/deployed evidence, and **persist the Chunk 4 verification checkpoint immediately after verification**.

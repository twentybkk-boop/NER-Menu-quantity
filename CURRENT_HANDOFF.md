# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + durable UAT evidence/checkpoints.

## CURRENT OBJECTIVE
Hands-on V4 UAT is in progress. **Chunk 1 and Chunk 2 are VERIFIED COMPLETE.** Preserve verified high-resolution character assets and all business semantics. The next bounded work unit is **Chunk 3 only: thumbnail semantic mapping + compact infographic (`UAT-006` / `UAT-007`)**.

## VERIFIED BASELINE — DO NOT REDO
- V2 P0-A/B/C/D VERIFIED; V3 Session 1 VERIFIED; Session 2A DONE; Session 2B.1 VERIFIED; V3 Session 2B.2 visual acceptance VERIFIED PASS.
- Production high-resolution overlays remain exact and must not be remapped during responsive/UI fixes:
  - top `assets/overlay-top-left-hires.webp` → blob `990c6b3523f79a483f41f17032f03f880f97f461`.
  - bottom `assets/overlay-bottom-left-hires.webp` → blob `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`.
  - right `assets/overlay-right-hires.webp` → blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
- V3 primary UI QA run `36035600267` — `completed/success`.
- clean-state UI QA run `36036869881` — `completed/success`.
- Previous V3 readiness checkpoint: `15c678e8535872fbf25d76a76d7d410648fe0346`.
- Do not redo repair/reconstruction/high-res recovery unless a new verified regression proves it necessary.

## V4 HANDS-ON UAT EVIDENCE — DURABLE
User evidence received on 2026-09-25:
- portrait screenshot showing ambient green circles visually above the intended background plane.
- screen recording covering portrait → detail/selection flow → rotation to landscape → landscape list/detail/overlay states.
- user requested more semantically accurate thumbnails, smaller infographic areas, and moderately larger character art later in the sequence.

Durable defect register:
- `docs/UAT_DEFECTS_2026-09-25_V4.md`
- creation commit `c88dfa414c68ec938581e710db34d632b31879e6`.
- V4 initial work-head checkpoint `2cc395196d03262c4c171c9f9b0be334ef8e63de`.

---

## V4 CHUNK 1 — BACKGROUND + LAYERING — VERIFIED COMPLETE
Resolved:
- `UAT-001` ambient green circles not true backmost — **VERIFIED FIXED**.
- `UAT-002` portrait background missing/too faint — **VERIFIED FIXED**.
- `UAT-003` landscape background weak / NER header conflict — **VERIFIED FIXED**.

Implementation:
- `assets/visual-uat-v4-chunk1.css` — commit `ee5c895a719949eec585da74fa05109f9008eac9`.
- `assets/visual-polish.css` load-order update — commit `b551180c6d6e4a154c8288c9b5d7f3d9126e39a3`.
- strengthened `qa/layering-orientation-v1-contract.mjs` — commit `20df83d84267a08590be8bcd266cba276667b2e0`.

Verification:
- Pages run `36041042430` — `completed/success`.
- UI QA run `36041043778` — `completed/success`.
- local/deployed orientation/layering Chromium + WebKit PASS.
- manual phone portrait/landscape + iPad portrait/landscape PASS.
- artifact `10826890723`, digest `sha256:1b2c36a36ad8c0cd19428eaa68df706b8f729289e277e0ba70b02e95d03a0696`.
- Chunk 1 durable checkpoint `3eb47a81fa1bd84d2ebf8942e694deeaea333ef5`.

STATUS: **DO NOT REOPEN UAT-001/002/003 without new reproduced evidence.**

---

## V4 CHUNK 2 — LANDSCAPE INTERACTION + OVERLAY GEOMETRY — VERIFIED COMPLETE
Resolved:
- `UAT-004` landscape blocked “ไม่รับของ” / exclusion and quantity inspection — **VERIFIED FIXED**.
- `UAT-005` landscape modal overflow / seam-like compression — **VERIFIED FIXED**.
- `UAT-010` decorative/background interaction safety for this landscape state — **VERIFIED FIXED for Chunk 2; final recheck remains in Chunk 4**.

### Pre-fix reproduction / root cause
Durable interaction contract:
- `qa/landscape-calculator-v4-contract.mjs` created in commit `c93cc7d60b21efc6d94b06833bd7ffe79044f393`.
- local + deployed contract wired into `.github/workflows/ui-qa.yml` in commit `a05ebc4670cdbe4883e4a83a50c923e8f58cb7f2`.

Pre-fix run `36042314898` reproduced the actual defect while all older gates before it passed:
- exact assertion: **`chromium/phone-landscape/local: calculator card compressed to 126px`**.
- root cause: 844×390 phone landscape matched historical width-only `768–1023px` tablet/portrait rules, which reserved 114px top + 150px bottom and forced a column calculator, leaving a 126px card.
- no recipe/exclusion/quantity semantic defect was found.
- failure artifact `10827390756`, digest `sha256:bd3fb3af36ee6e1fc13cf2d4f311e462a917e61e0353792e84c8fda077441f81`.
- reproduction/root-cause checkpoint `d7a2b7ec42c20dc0fedf89f4c804ad6725cf522e`.

### Implementation
- `assets/visual-uat-v4-chunk2.css` — commit `fa1ae5a61dabf9cb0033c30213b37fe4c0a11529` (`Fix V4 phone landscape calculator geometry`).
  - scoped to `(orientation:landscape) and (max-height:540px) and (max-width:950px)`.
  - near-full-height calculator card.
  - compact modal header.
  - true 46% / 54% exclusion + quantity two-column grid.
  - independent vertical scrolling for left/right panels; no horizontal overflow.
  - replacement list remains usable inside the panel.
  - three approved character compositions remain visible in dedicated non-interactive side rails and outside the calculator card.
- `assets/visual-polish.css` loads Chunk 2 override last — commit `7442c4c9f66faa75f1f9bd27e30dddf721e7a143`.
- no JS business/exclusion/replacement/quantity semantics were changed.

### Verification harness corrections — TEST ONLY
Two failures after the UI geometry fix were verified to be automation-flow limitations, not product regressions:
1. replacement picker is intentionally auto-opened by `toggleExclude`; the test had toggled it closed again. Corrected in commit `4bc92c09be661faf3762f7394e89f1a5928b9a5d` without relaxing any geometry/tap gate.
2. Playwright mobile WebKit does not support `mouse.wheel`. Chromium retains a real wheel scroll; WebKit now deterministically advances the native scroll container and still asserts `scrollTop`, while all tap/exclusion/replacement/rotation gates remain intact. Corrected in commit `725fde7cef04227d8ee4fcc796d0399cbaefcdda`.

### Final verification — PASS
Final verification head: `725fde7cef04227d8ee4fcc796d0399cbaefcdda`.

- Pages run `36043980683` — **completed/success**.
- UI QA run `36043981769` — **completed/success**.
- `Verify V4 phone-landscape calculator interaction locally` — PASS for Chromium + WebKit.
- `Verify deployed V4 phone-landscape calculator interaction` — PASS for Chromium + WebKit.
- contract verifies 844×390 phone landscape:
  - useful modal height (no 126px compression),
  - two simultaneous exclusion/quantity panels,
  - exclusion click changes state,
  - net quantity responds,
  - selectable replacement works,
  - independent panel scrolling works,
  - close/reopen works,
  - portrait→landscape rotation while modal is open still permits exclusion interaction,
  - all three character decorations are present, pointer-events none, and do not overlap the calculator card beyond the tiny allowed rail tolerance.
- all prior UI QA / character composition / center-frame / Chunk 1 orientation / sharpness / calculator hierarchy gates remained PASS.

Final artifact:
- `ui-qa-screenshots` artifact ID `10827363085`.
- digest `sha256:93d9dd79b431ea9f82981206f47648a6ee82a683b12e6be57bf43201382a1eb1`.
- manually inspected only:
  - `32-phone-landscape-calculator-v4.png`
  - `live-32-phone-landscape-calculator-v4.png`
- manual result: **PASS** — modal uses useful viewport height; exclusion and quantity are visible side-by-side; no compression/horizontal overflow/seam regression; all 3 characters remain visible in side rails and do not cover controls; local and deployed evidence visually agree.

STATUS: **V4 CHUNK 2 VERIFIED COMPLETE. DO NOT REOPEN UAT-004/005 except on new reproduced hands-on evidence. Preserve the interaction contract.**

---

## REMAINING V4 DEFECT SET / WORK HEAD

### P1 — Chunk 3: thumbnail semantic mapping + compact infographic — NEXT
- `UAT-006`: several thumbnails are too generic and do not communicate the menu name closely enough.
- `UAT-007`: thumbnail/infographic container is oversized relative to its information value.

### P2 — Chunk 4: character scale + detail density polish — WAIT
- `UAT-008`: character illustrations can be moderately larger while preserving safe zones.
- `UAT-009`: detail/selection modal uses too much vertical real estate before actionable content.
- final visual/interaction recheck of `UAT-010`.

## LOCKED INVARIANTS DURING REMAINING V4 FIXES
- Do not change recipe/business meaning, quantity calculations, exclusion/replacement semantics, Matrix logic, PIN behavior, or unrelated import/export behavior.
- Do not replace/remap verified exact high-resolution character assets.
- Keep all three characters together where expected; bottom-left NO GLASSES; top-left glasses + drink + peace gesture + bubble; right backpack/straps + clipboard/pen + food/chalkboard + bubble.
- Preserve Chunk 1 backmost background architecture.
- Preserve Chunk 2 low-height landscape interaction geometry and the durable landscape interaction contract.
- Decorative/background layers remain non-interactive and outside protected tap/content zones.

## CHUNK ORDER — DO NOT SKIP
1. Chunk 1 — `UAT-001/002/003` — VERIFIED COMPLETE.
2. Chunk 2 — `UAT-004/005/010` — VERIFIED COMPLETE.
3. **Chunk 3 — `UAT-006/007` — EXACT NEXT.**
4. Chunk 4 — `UAT-008/009` + final `010` recheck — wait until Chunk 3 checkpoint.

## DO NOT REPEAT
- Do not redo V3 repair/source reconstruction/high-res recovery.
- Do not reopen Chunk 1 or Chunk 2 without new reproduced evidence.
- Do not investigate recipe/business semantics while doing thumbnail polish.
- Do not remove/relax `qa/landscape-calculator-v4-contract.mjs`.
- Do not jump to Chunk 4 before Chunk 3 verification is persisted.

## OPEN BLOCKERS
1. `UAT-006/007` thumbnail semantic clarity / infographic density remain unresolved.
2. `UAT-008/009` character scale / detail-density polish remain unresolved.
3. final UAT-010 recheck remains for Chunk 4.

## EXACT NEXT RECOVERY ACTION
Start **Chunk 3 only** from current GitHub `main`. Inspect only the existing menu thumbnail semantic mapping/assets and the CSS sizing/layout of `.menu-card::before` / infographic treatment. Use actual menu names/categories from current `recipe_master.json` as the semantic source of truth. Identify representative incorrect/generic thumbnail mappings from the current app/evidence, make the smallest presentation-only remapping/refinement that makes the infographic meaning closer to each menu while reducing the thumbnail container footprint, and preserve all recipe/business behavior plus Chunk 1/2 responsive/interaction geometry. Verify representative menu categories and long-list rhythm on phone portrait, phone landscape, iPad portrait and iPad landscape, run the existing thumbnail asset validator + UI QA, inspect the resulting representative screenshots/contact sheet, and **persist a checkpoint immediately after Chunk 3 verification before touching Chunk 4**.

# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + durable UAT evidence/checkpoints.

## CURRENT OBJECTIVE
Hands-on testing reopened V4 UAT after the verified V3 acceptance. **V4 Chunk 1 — background + layering system is VERIFIED COMPLETE. V4 Chunk 2 has now been independently reproduced with an interaction contract and root cause is verified; implementation is NEXT.** Preserve verified high-resolution character assets and business semantics while fixing only the reproduced landscape calculator geometry/interaction defect.

## VERIFIED BASELINE — DO NOT REDO
- V2 P0-A/B/C/D VERIFIED; V3 Session 1 VERIFIED; Session 2A DONE; Session 2B.1 VERIFIED; V3 Session 2B.2 visual acceptance VERIFIED PASS.
- Production high-resolution overlays remain exact and must not be remapped during responsive/UI fixes:
  - top `assets/overlay-top-left-hires.webp` → blob `990c6b3523f79a483f41f17032f03f880f97f461`.
  - bottom `assets/overlay-bottom-left-hires.webp` → blob `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`.
  - right `assets/overlay-right-hires.webp` → blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
- V3 primary UI QA run `36035600267` — `completed/success`.
- clean-state UI QA run `36036869881` — `completed/success`.
- previous Pages deployment run `36036944983` — `completed/success`.
- Previous V3 readiness checkpoint: `15c678e8535872fbf25d76a76d7d410648fe0346`.
- Do not redo repair/reconstruction/high-res recovery unless a new verified regression proves it necessary.

## V4 HANDS-ON UAT EVIDENCE — DURABLE
User evidence received on 2026-09-25:
- portrait screenshot showing ambient green circles visually above the intended background plane.
- screen recording covering portrait → detail/selection flow → rotation to landscape → landscape list/detail/overlay states.
- user-reported defects were cross-checked against the supplied visual evidence.

Durable defect register:
- `docs/UAT_DEFECTS_2026-09-25_V4.md`
- creation commit `c88dfa414c68ec938581e710db34d632b31879e6` (`Add V4 hands-on UAT defect register`).
- V4 work-head checkpoint before fixes: `2cc395196d03262c4c171c9f9b0be334ef8e63de`.

## V4 CHUNK 1 — BACKGROUND + LAYERING — VERIFIED COMPLETE
Resolved defects:
- `UAT-001` — ambient green circles were not on the true backmost plane: **VERIFIED FIXED**.
- `UAT-002` — portrait background atmosphere missing/too faint: **VERIFIED FIXED**.
- `UAT-003` — landscape background too weak / conflicting with NER header: **VERIFIED FIXED**.

### Root cause verified
- historical `#decor-layer::before` / `#decor-layer::after` ambient circles remained inside the foreground character stacking context, so they could paint above normal UI even though `body::before` itself was backmost.
- `visual-layering-orientation-v1.css`, loaded after earlier background rules, forced the background master back to `cover` across orientations, causing portrait crop/weak atmosphere and making landscape composition compete with identity/header content.
- prior orientation QA asserted the `body::before` plane but did not assert that `#decor-layer` pseudo-elements were disabled; this gap allowed the UAT regression to pass automated QA.

### Implementation — bounded presentation-only changes
1. `assets/visual-uat-v4-chunk1.css`
   - commit `ee5c895a719949eec585da74fa05109f9008eac9` (`Fix V4 background layering and orientation`).
2. `assets/visual-polish.css`
   - commit `b551180c6d6e4a154c8288c9b5d7f3d9126e39a3` (`Load V4 Chunk 1 background override last`).
3. `qa/layering-orientation-v1-contract.mjs`
   - commit `20df83d84267a08590be8bcd266cba276667b2e0` (`Tighten layering contract for V4 UAT`).

### Verification
- Pages run `36041042430` — `completed/success`.
- UI QA run `36041043778` — `completed/success`.
- tightened V4 orientation/layering LOCAL + DEPLOYED — PASS.
- manual phone portrait/landscape + iPad portrait/landscape — PASS.
- artifact `10826890723`, digest `sha256:1b2c36a36ad8c0cd19428eaa68df706b8f729289e277e0ba70b02e95d03a0696`.

STATUS: **V4 CHUNK 1 VERIFIED COMPLETE. DO NOT REOPEN UAT-001/002/003 unless new hands-on evidence reproduces a regression.**

## V4 CHUNK 2 — LANDSCAPE INTERACTION — REPRODUCED / ROOT CAUSE VERIFIED
Target defects:
- `UAT-004`: landscape blocks core interaction for “ไม่รับของ” / exclusion and quantity inspection.
- `UAT-005`: landscape detail/overlay composition shows overflow/seam-like split/compression.
- `UAT-010`: decorative/background layers must not intercept or crowd interactive regions.

### Durable reproduction contract
- added `qa/landscape-calculator-v4-contract.mjs` in commit `c93cc7d60b21efc6d94b06833bd7ffe79044f393` (`Add V4 landscape calculator interaction contract`).
- wired local + deployed contract steps into `.github/workflows/ui-qa.yml` in commit `a05ebc4670cdbe4883e4a83a50c923e8f58cb7f2` (`Run V4 landscape interaction contract in UI QA`).
- contract uses real 844×390 phone-landscape viewport and requires: open menu → real exclusion click → selectable replacement where available → net quantity response → panel scroll geometry → close/reopen → portrait→landscape rotation → tap still works.
- contract also checks that all three character decorations remain non-interactive and stay in side rails rather than overlap calculator controls.

### Pre-fix failure evidence — VERIFIED
UI QA run `36042314898` on head `a05ebc4670cdbe4883e4a83a50c923e8f58cb7f2`:
- all pre-existing UI QA / character / orientation / sharpness / calculator visual hierarchy steps passed.
- new `Verify V4 phone-landscape calculator interaction locally` failed exactly as intended.
- exact assertion: **`chromium/phone-landscape/local: calculator card compressed to 126px`**.
- failure was at `qa/landscape-calculator-v4-contract.mjs` geometry gate before business interaction could proceed.
- artifact from failure run: `10827390756`, digest `sha256:bd3fb3af36ee6e1fc13cf2d4f311e462a917e61e0353792e84c8fda077441f81`.

### Root cause — VERIFIED
- phone landscape viewport in reproduced flow is approximately 844×390.
- historical responsive rules classify width `768–1023px` as an iPad/tablet layout without an orientation/height guard.
- `assets/visual-responsive.css` in that width band forces calculator body to a vertical column and, while calculator is open, reserves **114px top + 150px bottom** for illustration rails.
- it also constrains the calculator modal card to `max-height: calc(100dvh - 264px - safe areas)`.
- at 390px viewport height this yields the measured **126px calculator card**, matching the CI failure exactly.
- later real-device/historical tablet rules reinforce the same width-based column behavior, so an additive final phone-landscape override is required; changing business/exclusion/quantity code is NOT required.

STATUS: **UAT-004/005/010 are reproducibly caused by responsive geometry, not recipe or exclusion semantics.**

## REMAINING V4 DEFECT SET / WORK HEAD

### P0 — Chunk 2: landscape interaction + overlay geometry — IMPLEMENTATION NEXT
- `UAT-004` / `UAT-005` / `UAT-010` — reproduced and root-caused; fix not yet verified.

### P1 — Chunk 3: thumbnail semantic mapping + compact infographic
- `UAT-006`: several thumbnails are too generic and do not communicate the menu name closely enough.
- `UAT-007`: thumbnail/infographic container is oversized relative to its information value.

### P2 — Chunk 4: character scale + detail density polish
- `UAT-008`: character illustrations can be moderately larger while preserving safe zones.
- `UAT-009`: detail/selection modal uses too much vertical real estate before actionable content.
- final visual/interaction recheck of `UAT-010`.

## LOCKED INVARIANTS DURING V4 FIXES
- Do not change recipe/business meaning, quantity calculations, exclusion/replacement semantics, Matrix logic, PIN behavior, or unrelated import/export behavior unless a separate reproduced defect proves them wrong.
- Do not replace/remap verified exact high-resolution character assets.
- Keep all three characters together where expected; bottom-left NO GLASSES; top-left glasses + drink + peace gesture + bubble; right backpack/straps + clipboard/pen + food/chalkboard + bubble.
- Decorative/background layers must be non-interactive and stay outside protected tap/content zones.
- **For UAT-004, real click/tap + scroll + exclusion + quantity behavior is mandatory; screenshot-only QA is insufficient.**

## CHUNK ORDER — DO NOT SKIP
1. Chunk 1 — `UAT-001/002/003` — VERIFIED COMPLETE.
2. **Chunk 2 — `UAT-004/005/010` — REPRODUCED; IMPLEMENT + VERIFY NEXT.**
3. Chunk 3 — `UAT-006/007` — wait until Chunk 2 checkpoint.
4. Chunk 4 — `UAT-008/009` + final `010` recheck — wait.

## DO NOT REPEAT
- Do not redo V3 repair/source reconstruction/high-res recovery.
- Do not modify Chunk 1 without new reproduced evidence.
- Do not investigate business semantics for UAT-004; root cause is verified responsive geometry.
- Do not remove/relax the new landscape interaction contract to make CI pass.
- Do not jump to Chunk 3/4 before Chunk 2 verification is persisted.

## OPEN BLOCKERS
1. Implement the bounded phone-landscape calculator override and make the new local/deployed contract pass Chromium + WebKit.
2. Verify no regression to Chunk 1 / exact character source / existing calculator hierarchy.
3. Persist Chunk 2 verification checkpoint before Chunk 3.
4. `UAT-006/007` and `UAT-008/009` remain untouched.

## EXACT NEXT RECOVERY ACTION
Implement **Chunk 2 fix only** from current `main`: add a final-loaded presentation-only phone-landscape override scoped to `(orientation: landscape) and (max-height: 540px) and (max-width: 950px)` that prevents the 768–1023 tablet/portrait rules from compressing the calculator. Restore a near-full-height modal card, compact header, true two-column exclusion/quantity grid with independent panel scrolling, and side illustration rails that remain visible/non-interactive but do not overlap the card. Do not change JS exclusion/replacement/quantity semantics. Then run the existing UI QA with the durable `qa/landscape-calculator-v4-contract.mjs`, require Chromium + WebKit LOCAL and DEPLOYED PASS including close/reopen/rotate, inspect the generated `32-*phone-landscape-calculator-v4.png` evidence, and **persist a checkpoint immediately after verification before touching Chunk 3**.

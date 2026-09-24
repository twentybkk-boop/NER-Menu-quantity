# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + durable UAT evidence/checkpoints.

## CURRENT OBJECTIVE
Hands-on testing reopened V4 UAT after the verified V3 acceptance. **V4 Chunk 1 — background + layering system is now VERIFIED COMPLETE.** Preserve the verified high-resolution character assets and business semantics while continuing only through the remaining reproduced UAT defects.

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
   - disables `#decor-layer::before/after` completely; foreground ambient circles no longer exist.
   - ambient shapes + `background-master.webp` now live only on fixed `body::before`, `z-index:0`, `pointer-events:none`.
   - portrait uses `background-master.webp` sized `auto 100dvh` so the environmental scene is visible instead of heavily cropped.
   - landscape uses a fuller background treatment plus a protected, opaque-enough `.brand-masthead` editorial plate.
2. `assets/visual-polish.css`
   - commit `b551180c6d6e4a154c8288c9b5d7f3d9126e39a3` (`Load V4 Chunk 1 background override last`).
   - imports `visual-uat-v4-chunk1.css` last so historical `!important` rules cannot silently restore the defect.
3. `qa/layering-orientation-v1-contract.mjs`
   - commit `20df83d84267a08590be8bcd266cba276667b2e0` (`Tighten layering contract for V4 UAT`).
   - now asserts both `#decor-layer::before/after` are `display:none`, `background-image:none`, and non-interactive.
   - still requires the true `body::before` background plane to contain `background-master.webp` + ambient gradients and remain below shell/character layers.
   - landscape cases now require a protected masthead background plate.
   - exact high-resolution character-source assertions remain active.

### Automated + deployed verification
Latest implementation/QA head before this checkpoint: `20df83d84267a08590be8bcd266cba276667b2e0`.
- Pages run `36041042430` — `completed/success`.
- UI QA run `36041043778` — `completed/success`.
- Chromium + WebKit main UI QA — PASS.
- P0-A character composition — PASS.
- P0-B protected center frame — PASS.
- P0-D top + long-list contracts — PASS.
- tightened V4 orientation/layering contract LOCAL — PASS.
- tightened V4 orientation/layering contract DEPLOYED — PASS.
- V3 high-res character sharpness local + deployed — PASS.
- calculator visual hierarchy — PASS.

### Manual 4-orientation verification
Artifact:
- `ui-qa-screenshots`, artifact ID `10826890723`.
- digest `sha256:1b2c36a36ad8c0cd19428eaa68df706b8f729289e277e0ba70b02e95d03a0696`.
Manually inspected deployed orientation evidence:
- phone portrait — ambient circles are behind surfaces; background atmosphere visible; no card/arrow overlay regression — PASS.
- phone landscape — background master clearly visible; NER masthead protected from environmental artwork; character rails preserved — PASS.
- iPad portrait — environmental master visible behind/around central UI; ambient circles remain on the background plane; cards and controls remain above it — PASS.
- iPad landscape — environmental background visibly restored; NER masthead sits on protected pale plate; no background/header collision; character rails preserved — PASS.

STATUS: **V4 CHUNK 1 VERIFIED COMPLETE. DO NOT REOPEN UAT-001/002/003 unless new hands-on evidence reproduces a regression.**

## REMAINING V4 DEFECT SET / WORK HEAD

### P0 — Chunk 2: landscape interaction + overlay geometry — NEXT
- `UAT-004`: landscape blocks core interaction for “ไม่รับของ” / exclusion and quantity inspection.
- `UAT-005`: landscape detail/overlay composition shows overflow/seam-like split/compression.
- `UAT-010`: decorative/background layers must not intercept or crowd interactive regions.

### P1 — Chunk 3: thumbnail semantic mapping + compact infographic
- `UAT-006`: several thumbnails are too generic and do not communicate the menu name closely enough.
- `UAT-007`: thumbnail/infographic container is oversized relative to its information value.

### P2 — Chunk 4: character scale + detail density polish
- `UAT-008`: character illustrations can be moderately larger while preserving safe zones.
- `UAT-009`: detail/selection modal uses too much vertical real estate before actionable content.
- final visual/interaction recheck of `UAT-010`.

## LOCKED INVARIANTS DURING V4 FIXES
- Do not change recipe/business meaning, quantity calculations, exclusion/replacement semantics, Matrix logic, PIN behavior, or unrelated import/export behavior unless a separate reproduced defect proves them wrong.
- Do not replace/remap the verified exact high-resolution character assets as part of responsive/layering fixes.
- Keep all three characters together where expected.
- Bottom-left character remains NO GLASSES.
- Top-left glasses + drink + peace gesture + speech bubble remain.
- Right character backpack/straps + clipboard/pen + food/chalkboard + speech bubble remain.
- Decorative/background layers must be non-interactive and stay outside protected tap/content zones.
- **For UAT-004, verify real click/tap + scroll + exclusion + quantity behavior in landscape; screenshot-only QA is not sufficient.**

## CHUNK ORDER — DO NOT SKIP
1. **Chunk 1 — Background + layering system** — `UAT-001/002/003` — VERIFIED COMPLETE.
2. **Chunk 2 — Landscape interaction + overlay geometry** — `UAT-004/005/010` → verify tap/scroll/exclusion/quantity in landscape → checkpoint.
3. **Chunk 3 — Thumbnail semantic mapping + compact infographic** — `UAT-006/007` → verify representative menu categories + long-list rhythm → checkpoint.
4. **Chunk 4 — Character scale + detail density polish** — `UAT-008/009` + final `010` recheck → responsive visual QA/manual review → checkpoint.

## DO NOT REPEAT
- Do not redo V3 repair/source reconstruction/high-res recovery.
- Do not rerun old V3 acceptance just for bookkeeping.
- Do not modify Chunk 1 again without new reproduced evidence.
- Do not alter business semantics while fixing responsive/UI defects.
- Do not treat screenshot-only orientation PASS as proof that landscape touch interaction is correct.
- Do not jump to Chunk 3/4 before Chunk 2 verification is persisted.

## OPEN BLOCKERS
1. `UAT-004` landscape exclusion/quantity interaction is a functional blocker.
2. `UAT-005` landscape overlay overflow/seam/compression unresolved.
3. `UAT-010` landscape decorative/interaction safety unresolved and must be verified with real controls.
4. `UAT-006/007` thumbnail clarity/density polish unresolved.
5. `UAT-008/009` character scale/detail-density polish unresolved.

## EXACT NEXT RECOVERY ACTION
Start **Chunk 2 only** from current GitHub `main`. Reproduce the user’s phone-landscape flow from the 2026-09-25 recording and inspect only the calculator modal / scroll-lock / panel overflow / stacking / tap geometry paths needed for `UAT-004`, `UAT-005`, and `UAT-010`. Prove which layer or layout rule blocks “ไม่รับของ” and quantity inspection, then make the smallest responsive/interaction fix without changing exclusion/replacement/quantity semantics. Verify real landscape interaction (open menu → tap exclusion → select replacement where available → inspect net quantity → scroll both relevant regions → close/reopen/rotate) in Chromium + WebKit and deployed Pages, then **persist a checkpoint immediately after verification before touching Chunk 3**.

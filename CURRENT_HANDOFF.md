# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + durable UAT evidence/checkpoints.

## CURRENT OBJECTIVE
Hands-on testing has reopened V4 UAT work after the previously verified V3 acceptance. Preserve the verified high-resolution character assets and business semantics while fixing only reproduced hands-on defects from the 2026-09-25 screenshot + screen recording.

## VERIFIED BASELINE — DO NOT REDO
- V2 P0-A/B/C/D VERIFIED; V3 Session 1 VERIFIED; Session 2A DONE; Session 2B.1 VERIFIED; V3 Session 2B.2 visual acceptance VERIFIED PASS.
- Production high-resolution overlays remain exact:
  - top `assets/overlay-top-left-hires.webp` → blob `990c6b3523f79a483f41f17032f03f880f97f461`.
  - bottom `assets/overlay-bottom-left-hires.webp` → blob `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`.
  - right `assets/overlay-right-hires.webp` → blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
- V3 primary UI QA run `36035600267` — `completed/success`.
- clean-state UI QA run `36036869881` — `completed/success`.
- Pages deployment run `36036944983` — `completed/success`.
- Previous V3 readiness checkpoint: `15c678e8535872fbf25d76a76d7d410648fe0346`.
- Do not redo repair/reconstruction/high-res recovery unless a new verified regression proves it necessary.

## V4 HANDS-ON UAT EVIDENCE — DURABLE
User evidence received on 2026-09-25:
- portrait screenshot showing ambient green circles visually above the intended background plane.
- screen recording covering portrait → detail/selection flow → rotation to landscape → landscape list/detail/overlay states.
- user-reported defects were cross-checked against the supplied visual evidence before being persisted.

Durable defect register:
- `docs/UAT_DEFECTS_2026-09-25_V4.md`
- creation commit `c88dfa414c68ec938581e710db34d632b31879e6` (`Add V4 hands-on UAT defect register`).

## V4 DEFECT SET / WORK HEAD

### P0 — Chunk 1: background + layering system
- `UAT-001`: ambient green circles are not on the true backmost plane.
- `UAT-002`: portrait background atmosphere is missing/too faint.
- `UAT-003`: landscape background is too weak and compositionally conflicts with the NER system label/header.

### P0 — Chunk 2: landscape interaction + overlay geometry
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

## IMPORTANT OBSERVED VIDEO NOTES
- Portrait detail/selection flow is reachable and scrollable, but upper summary/header treatment consumes significant viewport height.
- Landscape visibly compresses the content and shows an apparent backdrop/content seam in overlay/detail states.
- The recording supports the reported landscape usability failure; automated screenshot success alone is insufficient for this defect class.
- Character illustrations remain crisp and all three-character identity/details are preserved; V4 fixes must not regress this.

## LOCKED INVARIANTS DURING V4 FIXES
- Do not change recipe/business meaning, quantity calculations, exclusion/replacement semantics, Matrix logic, PIN behavior, or unrelated import/export behavior unless a separate reproduced defect proves them wrong.
- Do not replace/remap the verified exact high-resolution character assets as part of responsive/layering fixes.
- Keep all three characters together where expected.
- Bottom-left character remains NO GLASSES.
- Top-left glasses + drink + peace gesture + speech bubble remain.
- Right character backpack/straps + clipboard/pen + food/chalkboard + speech bubble remain.
- Decorative/background layers must be non-interactive (`pointer-events` safety) and stay outside protected tap/content zones.
- Verify real interaction in landscape manually; screenshot-only QA is not sufficient for `UAT-004`.

## CHUNK ORDER — DO NOT SKIP
1. **Chunk 1 — Background + layering system** → `UAT-001`/`002`/`003` → verify phone portrait/landscape + iPad portrait/landscape → checkpoint.
2. **Chunk 2 — Landscape interaction + overlay geometry** → `UAT-004`/`005`/`010` → verify tap/scroll/exclusion/quantity in landscape → checkpoint.
3. **Chunk 3 — Thumbnail semantic mapping + compact infographic** → `UAT-006`/`007` → verify representative menu categories + long-list rhythm → checkpoint.
4. **Chunk 4 — Character scale + detail density polish** → `UAT-008`/`009` + final `010` recheck → responsive visual QA/manual review → checkpoint.

## DO NOT REPEAT
- Do not redo the V3 repair/source reconstruction work.
- Do not rerun old V3 acceptance just for bookkeeping.
- Do not alter business semantics while fixing responsive/UI defects.
- Do not treat prior automated orientation/sharpness PASS as proof that landscape touch interaction is correct; hands-on UAT has superseded that assumption.
- Do not jump to Chunk 2/3/4 before Chunk 1 verification is persisted.

## OPEN BLOCKERS
1. `UAT-001`–`UAT-003` background/layer system are unresolved.
2. `UAT-004` landscape exclusion/quantity interaction is a functional blocker.
3. `UAT-005`/`010` landscape overlay/decorative interaction safety unresolved.
4. `UAT-006`/`007` thumbnail clarity/density polish unresolved.
5. `UAT-008`/`009` character scale/detail-density polish unresolved.

## EXACT NEXT RECOVERY ACTION
Start **Chunk 1 only** from current GitHub `main`. Inspect only the code paths responsible for the ambient green circles/environment background/NER header composition, reproduce `UAT-001`–`UAT-003`, make the smallest responsive/layering fix that establishes one true backmost decorative plane plus a protected NER/header zone, verify phone portrait + phone landscape + iPad portrait + iPad landscape, and **persist a checkpoint immediately after verification before touching Chunk 2**.

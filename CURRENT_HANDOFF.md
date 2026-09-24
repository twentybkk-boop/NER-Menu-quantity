# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts.

## CURRENT WORK HEAD — FEASIBLE GEOMETRY CHECKPOINT
- Previous durable failure checkpoint: `f7db56cef450c3f2a539c0149058b2c072172266`.
- Relevant product CSS fix under investigation: `5bb9cb4d99e5753f41e07324bc91f977a0caa23e`.
- Relevant Chunk 4 safe-zone contract commit: `42a6bedf675eebcb5d2ca9a05ad0001604948a3b`.
- No CSS/test code has been edited after the P0-A failure checkpoint yet.

## P0-A FAILURE — VERIFIED DURABLE
UI QA run:
- run ID: `36058265001`
- job ID: `107830594992`
- workflow head: `42a6bedf675eebcb5d2ca9a05ad0001604948a3b`
- run/job: **completed / failure**

First failing required step:
- `Verify P0-A complete character composition`
- exact assertion: `chromium/calculator: .decor-a became too small to preserve story detail`
- `qa/character-composition-v2-contract.mjs` requires every `.decor-a/.decor-b/.decor-c` box to be at least **78px wide and 76px high**, while preserving the approved high-res source, `background-size: contain`, >=96% viewport-visible box area, and pointer safety.

Failure artifact:
- artifact ID `10833665689`
- digest `sha256:7ff3d23b111d50546f28a04d9d8b0bcc628c8b18fb01f7ec706879efb08f3c20`
- not a full post-fix acceptance artifact because the workflow stopped at P0-A.

## BOUNDED ROOT CAUSE — VERIFIED, CHECKPOINTED BEFORE CODE EDIT
The previous safe-zone correction shrank modal `.decor-a` below the legacy P0-A story-detail floor even though the responsive layout already reserves a dedicated **top illustration rail above the modal card**.

Relevant responsive rail contract from `assets/visual-responsive.css`:
- phone portrait calculator modal top padding: `76px + safe-area-top`
- iPad portrait calculator modal top padding: `114px + safe-area-top`
- iPad landscape/wide calculator modal top padding: `122px + safe-area-top`
- modal `#decor-layer` is raised above modal UI at `z-index:105` while the modal itself is `z-index:100`, so character geometry must remain inside the reserved rail and outside title/subtitle rectangles.

Relevant current Chunk 4 modal `.decor-a` values:
- phone portrait: `56x61`, `left:2`, `top:+2`
- phone landscape: `80x87`, unchanged and already manually passing
- iPad portrait: `70x77`, `left:8`, `top:+4`
- iPad landscape/wide: `72x79`, `left:10`, `top:+3`

### Concrete feasible geometry
The direct safe-zone contract uses 2px separation from both `.modal-title` and `.modal-subtitle`. With the existing reserved top rail and current Chunk 4 header padding/typography, the following smallest geometry satisfies BOTH P0-A and the safe-zone without moving into the title/subtitle:

1. **Phone portrait**
   - candidate: `78x76`, `left:2`, `top:calc(env(safe-area-inset-top) + 2px)`
   - P0-A: exactly meets `>=78x76`
   - modal card starts at about `76px + safe-area-top`; title starts around `86px + safe-area-top`
   - character bottom = about `78px + safe-area-top`
   - title clearance is therefore about 8px, greater than the required 2px
   - full box remains inside the viewport.

2. **iPad portrait**
   - candidate: **width only** `70 -> 78`; keep `height:77`, `left:8`, `top:+4`
   - P0-A: `78x77` passes
   - modal card starts at about `114px + safe-area-top`; title starts around `125px + safe-area-top`
   - character bottom = about `81px + safe-area-top`
   - large vertical clearance remains; no title/subtitle intersection.

3. **iPad landscape/wide**
   - candidate: **width only** `72 -> 78`; keep `height:79`, `left:10`, `top:+3`
   - P0-A: `78x79` passes
   - modal card starts at about `122px + safe-area-top`; title starts around `133px + safe-area-top`
   - character bottom = about `82px + safe-area-top`
   - large vertical clearance remains; no title/subtitle intersection.

4. **Phone landscape**
   - do not change: `80x87` already satisfies P0-A and was manually accepted.

### Root-cause conclusion
This is not a contract conflict requiring a weakened test. It is a presentation-geometry regression caused by over-shrinking the top-left box despite an existing reserved top rail. The correct fix is to restore only the minimum necessary `.decor-a` dimensions inside that rail. **Do not relax P0-A and do not relax the direct safe-zone assertion.**

## PREVIOUS RECOVERY / MANUAL EVIDENCE — DO NOT REDO
Durable recovery chain:
- `cda4189dd99776bf64d78c0e771c64062f8eb12c` — emergency post-timeout recovery checkpoint.
- `9bcd7f91c3411beef19947e804e0d40dc45d7ac0` — recovered final pre-fix automation result.
- `6252b538bc918723d1b6c72eb7e3a1c136b94728` — local/live evidence equivalence.
- `ecc061adf0ed9545718a91f3145c3626a16dd9e7` — manual visual obstruction checkpoint.
- `b519655358488e8d555d710ca718578c8d96fcae` — modal scale-vs-safe-zone conflict checkpoint.
- `46d53d9c870fa978b7e7237cd293127c84dfab81` — scoped safe-zone fix checkpoint before Actions.
- `35d9fc39552f9819c86ba26e5eccde0154b2b9d0` — one-shot running-Actions status checkpoint.
- `f7db56cef450c3f2a539c0149058b2c072172266` — exact P0-A failure checkpoint.

Pre-fix product head `3802e2d2bfcb425b2533acf9a6b960cbf2b992a4` had full automation PASS, but manual artifact review found the top-left modal character obscuring title/subtitle in phone portrait, iPad portrait, and iPad landscape. Phone landscape modal passed. Page states in all four orientations passed. UAT-009 density passed.

## VERIFIED BASELINE — DO NOT REOPEN
- V4 Chunk 1 `UAT-001/002/003` — VERIFIED COMPLETE; checkpoint `3eb47a81fa1bd84d2ebf8942e694deeaea333ef5`.
- V4 Chunk 2 `UAT-004/005` + landscape UAT-010 — VERIFIED COMPLETE; checkpoint `8eefd4142a4d2d27dca7dcf8e8ce175238b335e8`.
- V4 Chunk 3 `UAT-006/007` — VERIFIED COMPLETE; checkpoint `92aef5661454ea21580328df96cd3428838a43d5`.
- Approved production character binaries remain locked; do not remap/reconstruct them.

## LOCKED INVARIANTS
- no recipe/business/quantity/exclusion/replacement/Matrix/PIN/import-export changes.
- no high-resolution character binary/source remapping.
- preserve all page-state geometry that passed manual review.
- preserve phone-landscape modal state.
- preserve modal bottom-left/right characters and UAT-009 density.
- preserve P0-A story-detail floor and Chunk 4 title/subtitle safe-zone gate.
- preserve Chunk 1/2/3 and existing P0/layering/sharpness/tap-safety gates.

## DO NOT REPEAT
- do not poll/re-read completed UI QA `36058265001` again.
- do not redo full failure-log analysis.
- do not restart repo-wide/Chunk 4 investigation.
- do not redo old artifact/manual review.
- do not revert to old oversized modal `.decor-a` values (`92x101`, `128x141`, `142x156`); those reproduced the manually verified header obstruction.
- do not shrink below P0-A `78x76`.
- do not relax P0-A or the safe-zone gate.
- do not alter phone-landscape modal geometry.

## EXACT NEXT ACTION — SMALLEST PRESENTATION FIX
On the next continuation:
1. Fresh-read current `main` and this handoff; GitHub current wins.
2. Edit **only** `assets/visual-uat-v4-chunk4.css` modal `.decor-a` dimensions in the three affected orientations:
   - phone portrait `56x61 -> 78x76`
   - iPad portrait `70x77 -> 78x77`
   - iPad landscape/wide `72x79 -> 78x79`
   - keep all existing left/top values unchanged.
3. Do **not** change `qa/character-composition-v2-contract.mjs` or `qa/chunk4-polish-v4-contract.mjs`.
4. Verify the commit/diff changes exactly that one CSS file and only those three dimension pairs.
5. Immediately persist a post-fix/pre-Actions checkpoint and STOP before Actions polling.

## FINAL COMPLETION CONDITION
Chunk 4 is NOT complete. It becomes VERIFIED COMPLETE only after:
- P0-A and all existing regression gates pass after the final geometry fix;
- Chunk 4 title/subtitle safe-zone gate passes local + deployed;
- local/deployed evidence consistency is verified;
- manual review of the three previously failing modal orientations confirms no title/subtitle obstruction;
- UAT-008 / UAT-009 / final UAT-010 status is persisted.

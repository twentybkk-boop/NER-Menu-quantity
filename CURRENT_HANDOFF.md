# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-011 ROOT CAUSE VERIFIED; FIX NEXT
Previous user-review ready checkpoint:
- `4f131e2a058b9c41cbe30b1e49d535a5489c7ca6`.
New defect-delta checkpoint:
- `ad16d64a9c2ac0390d07f8c0181247cd82c69ae9`.

## NEW DEFECT DELTA
### UAT-011 — character cutout contamination / cross-character bleed
Status: **ROOT CAUSE VERIFIED DURABLE; NOT FIXED YET.**

User real-device portrait evidence:
- lower-left character hair/graphic fragment appears under the top-left composition;
- upper character elbow/hair/clothing fragment appears above/inside the bottom-left composition.

### Verified production-binary evidence
The currently mapped high-resolution production overlays were inspected directly with their alpha channel visualized over a checkerboard.

Top-left production asset:
- `assets/overlay-top-left-hires.webp`
- repo blob `990c6b3523f79a483f41f17032f03f880f97f461`
- previously verified file SHA256 `6d70ae5b226ff6b7f92b04853c702401da71e7d03ef9fbf94a8fd46bb01574ca`
- 518x500 RGBA
- VERIFIED contamination: a fragment of the lower character's dark hair/head remains at the bottom edge of the top-left overlay.

Bottom-left production asset:
- `assets/overlay-bottom-left-hires.webp`
- repo blob `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`
- previously verified file SHA256 `9d27c16f9185a4cac32a16f3415b4d60c392fcede32f877a863cad515b4baae8`
- 655x524 RGBA
- VERIFIED contamination: fragments of the upper character's hair/arm/clothing remain along the top edge; one detached alpha component is also present near the top.

The exact artifacts match the pieces circled by the user on the real-device screenshot.

### Root-cause conclusion
**UAT-011 is binary alpha/content contamination in the production high-resolution overlay assets, not CSS z-index or `.decor-a/.decor-b` positioning.**

Moving/clipping the CSS boxes would merely hide the symptom and risk story/detail regressions. The correct repair is the smallest alpha cleanup of the two production overlays while preserving the intended character pixels and all existing geometry.

### UAT-011 acceptance
- remove only foreign cross-character fragments from top-left/bottom-left overlays;
- preserve top-left glasses+drink+gesture+bubble and intended body silhouette;
- preserve bottom-left no-glasses+helmet+cat/table+bubble and intended silhouette;
- preserve source dimensions/aspect ratio unless absolutely necessary;
- no `.decor-a/.decor-b` page/modal geometry changes;
- no business/runtime changes;
- pass P0-A/P0-B/layering/sharpness/safety regressions.

### UAT-012 — portrait environment/background still visually missing
Status: OPEN; root cause not yet verified.
Observed: latest real-device phone portrait still reads mostly as pale/blank instead of a clearly perceivable environment scene.
Expected: portrait environment visibly present on the true backmost plane without competing with UI.

## VERIFIED BASELINE — DO NOT REOPEN
- Chunk 1 `UAT-001/002/003` — VERIFIED COMPLETE.
- Chunk 2 `UAT-004/005` + landscape UAT-010 — VERIFIED COMPLETE.
- Chunk 3 `UAT-006/007` — VERIFIED COMPLETE.
- Chunk 4 `UAT-008/009` + final UAT-010 — VERIFIED COMPLETE.
- UI QA `36060607688` and app-code Pages `36060607153` — completed/success.
- final manual V4 acceptance checkpoint `881b9be680cc48d32ad74348078348d30034618f`.

## LOCKED INVARIANTS
- no recipe/business/quantity/exclusion/replacement/Matrix/PIN/import-export changes.
- no generic redraw/recomposition.
- preserve all character identity/story details and current verified CSS geometry.
- preserve phone-landscape interaction/modal behavior.
- preserve P0-A/P0-B/P0-D/layering/sharpness/tap-safety gates.

## DO NOT REPEAT
- do not redo V4 Chunk 1–4 investigation.
- do not investigate CSS as primary cause for UAT-011 again unless the binary cleanup fails verification.
- do not remap to old/rejected character blobs.
- do not alter right-character production binary for UAT-011.

## EXACT NEXT ACTION — UAT-011 MINIMAL BINARY CLEANUP
1. Fresh-confirm this root-cause checkpoint is durable.
2. Starting from the exact production top-left and bottom-left binaries, create cleaned derivatives by editing **alpha/content only in the verified foreign-fragment regions**.
3. Preserve dimensions, intended character/story pixels, and overall rendering fidelity.
4. Inspect cleaned assets visually over transparency and verify no intended silhouette/detail is removed.
5. Compute exact file hashes/dimensions.
6. Persist cleaned binaries into `assets/overlay-top-left-hires.webp` and `assets/overlay-bottom-left-hires.webp` only; do not touch CSS in this chunk.
7. Verify commit changed exactly those two binaries; immediately checkpoint UAT-011 code fix before Actions.
8. Then proceed to UAT-012 portrait-background investigation as a separate chunk.

## COMPLETION CONDITION FOR THIS DELTA
- UAT-011 foreign fragments absent in final phone portrait evidence.
- UAT-012 portrait environment clearly visible/backmost.
- automated regressions pass.
- targeted manual evidence passes.
- new READY FOR USER REVIEW checkpoint persisted.

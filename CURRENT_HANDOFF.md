# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-011 FIX DURABLE; UAT-012 INVESTIGATION NEXT
Previous user-review ready checkpoint:
- `4f131e2a058b9c41cbe30b1e49d535a5489c7ca6`.
Defect-delta checkpoint:
- `ad16d64a9c2ac0390d07f8c0181247cd82c69ae9`.
UAT-011 root-cause checkpoint:
- `a02d419c093652fb3134762304201957eda68d59`.

## UAT-011 — BINARY ROOT CAUSE VERIFIED AND FIX DURABLE
Root cause:
- cross-character bleed existed inside the alpha/content of the two production high-resolution overlay binaries themselves, not in CSS geometry/z-index.

Final production cleanup commit:
- `be16bd5979546218bbbca81a0d46c1da33e3ac5c` — `Update cleaned character overlay assets`
- parent `d1047b40031ed6a5f8f7b19f39374bedcf05ae36`
- commit diff verified to contain exactly two changed paths:
  - `assets/overlay-top-left-hires.webp`
  - `assets/overlay-bottom-left-hires.webp`
- no CSS, JS, recipe, business, quantity, exclusion, replacement, Matrix, PIN, import/export or right-character file changed.

Cleaned top-left production asset:
- dimensions 518x500 RGBA preserved
- file SHA256 `f0ffd24fdde830d06b0d715c7c6ba8c2e81402c9e93731524a3dfa724915d393`
- Git blob `e457bc39bfa490b467b7b061afd388c924203dec`
- transparency review: foreign lower-character hair/head arc removed; intended glasses, drink, gesture, bubble, forearm/shirt silhouette retained.

Cleaned bottom-left production asset:
- dimensions 655x524 RGBA preserved
- file SHA256 `bd645b4744270e221fe0eae8fe08eabf2771269391ddfc4650492e6da831ad31`
- Git blob `d028a38f30098759217c1f2808a29f2327de441d`
- transparency review: foreign upper-character hair/arm/clothing fragments removed; intended no-glasses hair, helmet, cat/table, bubble retained.

Status:
- UAT-011 PRODUCT FIX = DURABLE ON `main`.
- final deployed/QA evidence will be verified after UAT-012 is fixed so both new-delta changes can share one final verification run.

## UAT-012 — OPEN; INVESTIGATE ONLY THIS NEXT
User real-device portrait evidence still shows the intended environment/background as effectively absent/too faint. The current screen reads mainly as pale cream/blank with only weak peripheral scene hints.

Expected:
- phone portrait environment is clearly perceivable;
- remains on the true backmost plane;
- does not compete with masthead/cards/characters or reintroduce foreground ambient circles;
- landscape behavior remains stable.

## VERIFIED BASELINE — DO NOT REOPEN
- V4 Chunk 1 `UAT-001/002/003` complete.
- V4 Chunk 2 `UAT-004/005` + landscape UAT-010 complete.
- V4 Chunk 3 `UAT-006/007` complete.
- V4 Chunk 4 `UAT-008/009` + final UAT-010 complete.
- old app-code UI QA `36060607688` + Pages `36060607153` passed before this delta.

## LOCKED INVARIANTS
- preserve current character geometry and identity/story details.
- no business/runtime/recipe changes.
- no right-character binary change.
- preserve phone-landscape interaction/modal behavior and all P0/layering/sharpness/tap-safety gates.

## DO NOT REPEAT
- do not redo UAT-011 binary investigation/cleanup.
- do not recreate cleaned blobs `e457bc39...` / `d028a38f...`.
- do not reopen old V4 chunks generically.

## EXACT NEXT ACTION — UAT-012 ROOT CAUSE
1. Fresh-confirm this UAT-011 fix checkpoint is durable.
2. Inspect ONLY the final effective portrait environment background path:
   - `assets/visual-background.css`
   - `assets/visual-layering-orientation-v1.css`
   - `assets/visual-uat-v4-chunk1.css`
   - `assets/visual-responsive.css` only where it affects `body::before`
   - actual `assets/background-master.webp` dimensions/visual content.
3. Determine the effective phone-portrait `body::before` image, opacity, background-size and background-position after import order.
4. Compare that crop/opacity against the user's real portrait screenshot and identify the smallest presentation fix.
5. Persist UAT-012 root cause BEFORE editing CSS.
6. Apply smallest fix, checkpoint, then run final UI QA/Pages for UAT-011+012 together.

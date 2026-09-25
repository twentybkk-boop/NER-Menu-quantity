# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

# EMERGENCY POST-TIMEOUT RECOVERY CHECKPOINT

## CURRENT PROJECT / REPOSITORY
- Repository: `twentybkk-boop/NER-Menu-quantity`
- Actual working branch: `main`
- Current remote HEAD at recovery start: `6b8fc7ea378658ad791fd985c7f98aa94d4b7fba` — `Checkpoint UAT-011 binary fix durable`
- Current tree at recovery start: `69bd458f704a020776579422f284f9b01c887069`

## LATEST RELEVANT DURABLE COMMITS
- `be16bd5979546218bbbca81a0d46c1da33e3ac5c` — `Update cleaned character overlay assets`
- `6b8fc7ea378658ad791fd985c7f98aa94d4b7fba` — checkpoint confirming UAT-011 binary fix durable.
- Earlier UAT-011 root-cause checkpoint: `a02d419c093652fb3134762304201957eda68d59`.

## LATEST RELEVANT CI / WORKFLOW STATE
- Last fully verified pre-delta UI QA: run `36060607688` — completed/success.
- Last fully verified pre-delta Pages run: `36060607153` — completed/success.
- Final post-UAT-011 deployed/QA evidence has intentionally NOT yet been used as acceptance because UAT-012 remains open; UAT-011 + UAT-012 are intended to share one final verification run after UAT-012 fix.
- Any workflow activity after the timeout that is not already recorded above is UNKNOWN until explicitly re-read; do not assume.

## VERIFIED DURABLE
### UAT-011 — root cause and production fix
- Cross-character bleed was inside the alpha/content of the two production high-resolution overlay binaries themselves, not caused by CSS geometry/z-index.
- Final production cleanup commit `be16bd5979546218bbbca81a0d46c1da33e3ac5c` changes exactly:
  - `assets/overlay-top-left-hires.webp`
  - `assets/overlay-bottom-left-hires.webp`
- No CSS, JS, recipe, business, quantity, exclusion, replacement, Matrix, PIN, import/export or right-character file changed in that production cleanup commit.

Cleaned top-left production asset:
- 518x500 RGBA
- SHA256 `f0ffd24fdde830d06b0d715c7c6ba8c2e81402c9e93731524a3dfa724915d393`
- Git blob `e457bc39bfa490b467b7b061afd388c924203dec`
- foreign lower-character hair/head arc removed; intended glasses, drink, gesture, bubble, forearm/shirt retained.

Cleaned bottom-left production asset:
- 655x524 RGBA
- SHA256 `bd645b4744270e221fe0eae8fe08eabf2771269391ddfc4650492e6da831ad31`
- Git blob `d028a38f30098759217c1f2808a29f2327de441d`
- foreign upper-character hair/arm/clothing fragments removed; intended no-glasses hair, helmet, cat/table, bubble retained.

### Previously verified baseline — DO NOT REOPEN
- V4 Chunk 1 `UAT-001/002/003` complete.
- V4 Chunk 2 `UAT-004/005` + landscape UAT-010 complete.
- V4 Chunk 3 `UAT-006/007` complete.
- V4 Chunk 4 `UAT-008/009` + final UAT-010 complete.

## VERIFIED BUT NOT YET PERSISTED
- None remaining from the visible timeout tail after reconciling with current GitHub.
- The visible pre-timeout top cleaned blob creation (`e457bc39...`) and transparency review are already superseded by stronger durable evidence on current `main`, including both cleaned production blobs and the production cleanup commit.

## UNKNOWN / LOST TAIL
- Any hidden analysis performed after checkpoint `6b8fc7ea...` is not trusted unless externally evidenced.
- UAT-012 root-cause conclusion is NOT yet durable; do not guess it.
- Any post-timeout CI run not explicitly recorded in this handoff is UNKNOWN until read once.

## FILES / CODE / CSS / ASSETS ALREADY INSPECTED — DO NOT REDO GENERICALLY
- `assets/overlay-top-left-hires.webp`
- `assets/overlay-bottom-left-hires.webp`
- phone-portrait `.decor-a/.decor-b` character composition path as needed to eliminate CSS geometry/z-index as UAT-011 cause.
- Prior character composition/sampling layers relevant to preserving approved story details.

## FAILURES ALREADY CONFIRMED
- UAT-011: top/bottom-left production overlay binaries contained cross-character residual alpha/content.
- UAT-012: user real-device portrait still shows environment/background as effectively absent or too faint.

## HYPOTHESES ALREADY ELIMINATED
- UAT-011 is NOT primarily a CSS z-index/positioning/cropping issue; the contamination existed in the binary pixels themselves.
- Do not try to fix UAT-011 by moving `.decor-a`/`.decor-b` or changing stacking.

## LOCKED INVARIANTS
- preserve current character geometry and identity/story details.
- no business/runtime/recipe changes.
- no right-character binary change.
- preserve phone-landscape interaction/modal behavior and all P0/layering/sharpness/tap-safety gates.

## DO NOT REPEAT
- do not redo UAT-011 binary investigation/cleanup.
- do not recreate cleaned blobs `e457bc39...` / `d028a38f...`.
- do not reopen old V4 chunks generically.
- do not reconstruct lost hidden reasoning.
- do not enter a long CI polling loop.

## OPEN BLOCKERS
1. UAT-012 portrait environment/background is still too faint/missing on real phone portrait.
2. Final combined UAT-011 + UAT-012 automated/deployed verification is pending until UAT-012 is fixed.

## EXACT NEXT ACTION — UAT-012 ROOT CAUSE ONLY
1. Fresh-confirm this emergency recovery checkpoint is durable on remote `main`.
2. Inspect ONLY the final effective portrait environment background path:
   - `assets/visual-background.css`
   - `assets/visual-layering-orientation-v1.css`
   - `assets/visual-uat-v4-chunk1.css`
   - `assets/visual-responsive.css` only where it affects `body::before`
   - actual `assets/background-master.webp` dimensions/visual content.
3. Determine the effective phone-portrait `body::before` image, opacity, background-size and background-position after import order.
4. Compare that effective crop/opacity against the user's real portrait screenshot and identify the smallest presentation fix.
5. Persist UAT-012 root cause BEFORE editing CSS.
6. Apply the smallest fix, checkpoint immediately, then run one final UI QA/Pages verification for UAT-011 + UAT-012 together.

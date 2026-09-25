# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-011 DURABLE; UAT-012 ROOT CAUSE VERIFIED
Current recovery lineage already preserved on `main` through the emergency recovery checkpoint after UAT-011.

## UAT-011 — FIX DURABLE, FINAL COMBINED QA PENDING
- Root cause: foreign cross-character pixels were inside the production high-resolution overlay binaries, not CSS.
- Production cleanup commit: `be16bd5979546218bbbca81a0d46c1da33e3ac5c`.
- Verified commit scope: exactly
  - `assets/overlay-top-left-hires.webp`
  - `assets/overlay-bottom-left-hires.webp`
- Cleaned top-left: 518x500 RGBA, SHA256 `f0ffd24fdde830d06b0d715c7c6ba8c2e81402c9e93731524a3dfa724915d393`, blob `e457bc39bfa490b467b7b061afd388c924203dec`.
- Cleaned bottom-left: 655x524 RGBA, SHA256 `bd645b4744270e221fe0eae8fe08eabf2771269391ddfc4650492e6da831ad31`, blob `d028a38f30098759217c1f2808a29f2327de441d`.
- Character geometry was not changed.

## UAT-012 — ROOT CAUSE VERIFIED DURABLE
User real-device phone portrait still reads as pale/blank instead of showing the environmental scene clearly.

### Final effective CSS path
Import order ends with `visual-uat-v4-chunk1.css` for background behavior; Chunk 2/3/4 do not override `body::before` environment sizing.

Relevant final portrait rule in `assets/visual-uat-v4-chunk1.css`:
- image layer = `url("background-master.webp")`
- opacity of the pseudo plane = `1`
- background position = `center top`
- image layer size = `auto 100dvh`
- an ivory linear-gradient wash remains above the image at approximately `.42` opacity at top, `.16` mid, `.34` bottom.

Earlier `visual-responsive.css` independently used the same `auto 100dvh` strategy for phone/iPad portrait, so this behavior is intentional historical carry-over rather than a later accidental override.

### Background master geometry
`assets/background-master.webp` is a VP8 WebP with dimensions **440x293**, aspect ratio about **1.50:1 (landscape)**.

On a representative 390x844 phone portrait viewport:
- `auto 100dvh` scales the 440x293 master to about 1267x844;
- the 390px viewport therefore exposes only about **31% of the source width**, centered;
- roughly 69% of the source's horizontal environmental context is cropped away.

This exactly matches the real-device symptom: the page receives the image technically, so old QA sees `background-master.webp` and passes, but visually the user mostly sees a pale central crop plus the ivory wash rather than the environment.

### Why automated QA missed it
`qa/layering-orientation-v1-contract.mjs` currently checks:
- background exists;
- background is backmost;
- background contains the master and radial ambience;
- pointer safety / stacking.
It does **not** assert portrait background sizing/crop, so `auto 100dvh` is allowed to pass despite poor real-device visibility.

### Smallest presentation fix selected
Preserve the landscape master aspect ratio and backmost plane; do NOT stretch to `100% 100%`.
For portrait only:
- change only the image layer size from `auto 100dvh` to **`160% auto`**;
  - phone 390px viewport -> image ~624x416, exposing ~62.5% of source width instead of ~31%, while still extending through the masthead/hero/top-menu region;
  - iPad portrait receives the same aspect-preserving behavior.
- reduce the portrait ivory wash only, so the scene reads clearly without competing with content.
- leave landscape rules unchanged.
- keep all ambient circles on `body::before` and all foreground pseudo-circles disabled.

Add a regression assertion to the existing layering/orientation contract so phone/iPad portrait computed `body::before` background-size must include the new portrait image sizing. Do not weaken any existing layering gate.

## VERIFIED BASELINE — DO NOT REOPEN
- V4 Chunk 1–4 remain verified except this newly identified portrait-visibility delta.
- no recipe/business/quantity/exclusion/replacement/Matrix/PIN/import-export changes.
- preserve character geometry, phone-landscape interaction/modal behavior, P0-A/P0-B/P0-D/layering/sharpness/tap-safety gates.

## DO NOT REPEAT
- do not redo UAT-011 cleanup.
- do not re-investigate generic stacking for UAT-012; backmost stacking is already verified.
- do not change landscape background behavior.
- do not distort the 440x293 master to fill portrait height.

## EXACT NEXT ACTION — UAT-012 SMALLEST FIX
1. Fresh-confirm this checkpoint is durable on `main`.
2. Edit only `assets/visual-uat-v4-chunk1.css` portrait environment rule:
   - preserve all radial ambience/backmost properties;
   - use the same background master with portrait image-layer size `160% auto`;
   - reduce only the portrait ivory wash to improve scene visibility.
3. Update only `qa/layering-orientation-v1-contract.mjs` as needed to record/assert computed background-size for portrait; preserve all existing assertions.
4. Verify diff scope; checkpoint before Actions.
5. Run one final combined UI QA + Pages verification for UAT-011 and UAT-012.
6. Inspect targeted phone-portrait layering screenshot plus character evidence; if PASS, persist READY FOR USER RE-REVIEW and hand back live URL.

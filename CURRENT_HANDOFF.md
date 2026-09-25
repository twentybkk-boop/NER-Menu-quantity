# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-011 ROOT CAUSE VERIFIED; BINARY FIX COMMIT PREPARED
Previous user-review ready checkpoint:
- `4f131e2a058b9c41cbe30b1e49d535a5489c7ca6`.
New defect-delta checkpoint:
- `ad16d64a9c2ac0390d07f8c0181247cd82c69ae9`.
UAT-011 root-cause checkpoint:
- `a02d419c093652fb3134762304201957eda68d59`.

## UAT-011 — VERIFIED ROOT CAUSE
The user-reported cross-character cutout bleed is present in the production high-resolution overlay binaries themselves, not caused by CSS geometry or z-index.

Affected production assets before cleanup:
- `assets/overlay-top-left-hires.webp` — blob `990c6b3523f79a483f41f17032f03f880f97f461`, 518x500 RGBA; contained lower-character hair/head pixels along its bottom edge.
- `assets/overlay-bottom-left-hires.webp` — blob `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`, 655x524 RGBA; contained upper-character hair/arm/clothing pixels along its top edge.

## CLEANED BINARY FIX — PREPARED AND VISUALLY REVIEWED
Cleaned derivatives were created from the exact production binaries by removing only verified foreign-fragment alpha/content while preserving intended character/story pixels and original dimensions.

Top-left cleaned candidate:
- 518x500 RGBA
- SHA256 `f0ffd24fdde830d06b0d715c7c6ba8c2e81402c9e93731524a3dfa724915d393`
- Git blob `e457bc39bfa490b467b7b061afd388c924203dec`
- visual transparency review: foreign lower-character hair arc removed; glasses, drink, gesture, bubble, forearm/shirt silhouette preserved.

Bottom-left cleaned candidate:
- 655x524 RGBA
- SHA256 `bd645b4744270e221fe0eae8fe08eabf2771269391ddfc4650492e6da831ad31`
- Git blob `d028a38f30098759217c1f2808a29f2327de441d`
- visual transparency review: foreign upper-character top fragments removed; intended hair, no-glasses identity, helmet, cat/table, bubble preserved.

Prepared Git tree/commit:
- tree `8301c1eabf74cfd16b07839592efd57e77c367db`
- commit `b10c97dca1666a2e41e9de6dc54a07ba052abd84` — `Clean cross-character cutout bleed`
- parent `a02d419c093652fb3134762304201957eda68d59`

IMPORTANT: at the time this checkpoint is written, `main` is still `a02d419c...`; `b10c97dc...` is prepared but not yet attached to `main`. No CSS changes are part of this binary fix.

## UAT-012 — OPEN
Portrait environment/background is still visually too faint/missing on the user's real phone. Root cause not yet verified in this delta.

## VERIFIED BASELINE — DO NOT REOPEN
- V4 Chunks 1–4 remain VERIFIED COMPLETE before this new delta.
- no recipe/business/quantity/exclusion/replacement/Matrix/PIN/import-export changes.
- preserve all verified page/modal geometry and interaction contracts.

## EXACT NEXT ACTION
1. Fresh-read `main`.
2. If `main` is still `a02d419c093652fb3134762304201957eda68d59`, fast-forward `main` to prepared commit `b10c97dca1666a2e41e9de6dc54a07ba052abd84`; if GitHub advanced, reconcile instead of overwriting.
3. Verify commit scope is exactly the two binary paths above.
4. Immediately persist UAT-011 FIX DURABLE checkpoint.
5. Then investigate UAT-012 only, starting with the final effective phone-portrait `body::before` background rules and actual `background-master.webp` visibility/cropping/opacity.

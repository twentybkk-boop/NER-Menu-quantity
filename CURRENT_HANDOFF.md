# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — NEW USER UAT DELTA AFTER V4 COMPLETION
Previous ready-for-review checkpoint:
- `4f131e2a058b9c41cbe30b1e49d535a5489c7ca6` — `Checkpoint ready for user hands-on review`.

The user tested the deployed web app on a real phone in portrait and reported exactly two remaining visual defects. Treat these as a NEW delta only; do not reopen already verified V4 chunks generically.

## NEW DEFECT DELTA
### UAT-011 — character cutout contamination / cross-character bleed
Severity: Medium visual polish defect.

Observed in the latest real-device portrait screenshot:
- a dark hair/graphic fragment from the lower-left character appears underneath/inside the top-left character area;
- a white/skin/clothing fragment from the top-left character appears near/over the lower-left character area;
- the issue is visible in the user's circled regions even though all three approved character compositions are otherwise present.

Expected:
- each character composition must read as a clean independent cutout;
- no visible fragment from another character may appear inside a different character's rail/composition.

Current hypothesis — NOT YET VERIFIED:
- either the production high-resolution overlay binaries contain residual pixels outside the intended subject silhouette;
- or CSS/background-position/box clipping exposes remote pixels from a larger source composition when scaled/cropped.

Do not assume which one until inspecting the actual approved overlay assets and current CSS geometry.

Acceptance:
- phone portrait page has no visible top↔bottom-left cross-character fragment;
- all three approved characters and their story details remain intact;
- no regression to P0-A/P0-B/layering/sharpness/modal safety.

### UAT-012 — portrait environment/background still visually missing
Severity: Medium visual polish defect.

Observed in the same real-device portrait screenshot:
- the intended environment background is still effectively absent/too faint in portrait;
- landscape had previously shown more of the environment, but the latest portrait still reads mostly as a pale blank canvas rather than the intended scene.

Expected:
- portrait shows a clearly perceivable environment background while remaining the backmost plane;
- background must not compete with menu cards, masthead, characters, or tap targets;
- landscape behavior must remain unchanged unless necessary to preserve consistency.

Current hypothesis — NOT YET VERIFIED:
- portrait-specific `body::before` background-size/position/opacity or a later override may still crop or wash out the environment master on the real phone viewport.

Acceptance:
- real/QA phone portrait clearly shows the environment background;
- backmost-layer contract remains true;
- no foreground ambient circles return;
- masthead/cards remain legible and unaffected.

## VERIFIED BASELINE — DO NOT REOPEN
- Chunk 1 `UAT-001/002/003` — VERIFIED COMPLETE.
- Chunk 2 `UAT-004/005` + landscape UAT-010 — VERIFIED COMPLETE.
- Chunk 3 `UAT-006/007` — VERIFIED COMPLETE.
- Chunk 4 `UAT-008/009` + final UAT-010 — VERIFIED COMPLETE.
- App-code UI QA `36060607688` — completed/success.
- App-code Pages run `36060607153` — completed/success.
- final manual-evidence acceptance checkpoint `881b9be680cc48d32ad74348078348d30034618f`.
- production character binaries remain locked unless UAT-011 proves the binary itself is contaminated and a minimal corrected binary is necessary.

## LOCKED INVARIANTS
- no recipe/business/quantity/exclusion/replacement/Matrix/PIN/import-export changes.
- no generic redraw/recomposition of characters.
- preserve current character identity/story details: top-left glasses+drink+gesture+bubble; bottom-left no glasses+helmet+cat/table+bubble; right backpack+clipboard/food/chalkboard+bubble.
- preserve phone-landscape interaction and modal geometry.
- preserve P0-A/P0-B/P0-D/layering/sharpness/tap-safety gates.

## DO NOT REPEAT
- do not redo V4 Chunk 1–4 investigations or old artifact reviews.
- do not rerun old successful run `36060607688` unless a new code change requires a new verification run.
- do not remap or reconstruct character binaries speculatively.
- do not change business/runtime logic for these two visual defects.

## EXACT NEXT ACTION — CHUNK A (UAT-011) FIRST
1. Fresh-confirm this defect-delta checkpoint is durable on remote `main`.
2. Inspect ONLY:
   - current production overlay asset files/sources for top-left and bottom-left characters;
   - current CSS rules/background sizing/positioning/clipping for `.decor-a` and `.decor-b` in phone portrait page state;
   - existing character composition/layering contracts only as needed to preserve invariants.
3. Determine whether the circled bleed is binary residual content or CSS box/cropping exposure.
4. Persist the verified root cause BEFORE editing production code/assets.
5. Apply the smallest UAT-011 fix, verify, checkpoint.
6. Then perform CHUNK B for UAT-012: inspect only portrait environment background rules, fix visibility/backmost presentation, verify, checkpoint.
7. Run new UI QA/Pages after both fixes; inspect targeted phone-portrait evidence; hand back live URL for user re-review.

## COMPLETION CONDITION FOR THIS DELTA
This delta is complete only when:
- UAT-011 cutout bleed is visually absent in phone portrait;
- UAT-012 portrait environment is clearly visible but remains backmost;
- automated regressions pass;
- targeted manual evidence passes;
- a new ready-for-user-review checkpoint is persisted.

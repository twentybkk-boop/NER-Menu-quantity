# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — DETERMINISTIC EXACT OVERLAY RECONSTRUCTION PROVEN

## UAT-012 — FIX REMAINS DURABLE AND ACCEPTED BY ITS GATE
- product fix `6fdebb8da6fc87710be6f93141c26579d57d0056`
- portrait master sizing `auto 100dvh -> 160% auto`
- portrait ivory wash reduced `.42/.16/.34 -> .18/.06/.16`
- landscape unchanged
- regression gate `f28893b255f41ff70643c4e406d4de003909eddb`
- UI QA run `36093279114` confirmed orientation/layering/backmost environment PASS in Chromium + WebKit for all targeted orientations before a later unrelated failure.

## UAT-011 — VERIFIED ROOT CAUSE OF QA FAILURE
The intended alpha cleanup is valid, but the current production Git blobs are not the full verified candidate bytes.

Verified exact cleaned candidates:
- top: 518x500 RGBA, 180,814 bytes, SHA256 `f0ffd24fdde830d06b0d715c7c6ba8c2e81402c9e93731524a3dfa724915d393`
- bottom: 655x524 RGBA, 233,136 bytes, SHA256 `bd645b4744270e221fe0eae8fe08eabf2771269391ddfc4650492e6da831ad31`

Current wrong production blobs:
- top `e457bc39bfa490b467b7b061afd388c924203dec`, 14,997 bytes
- bottom `d028a38f30098759217c1f2808a29f2327de441d`, 14,999 bytes
- right control `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`, 51,376 bytes remains unchanged.

UI QA `36093279114` first failed required step:
- V3 character high-res sharpness local
- exact failure: `failed to load http://127.0.0.1:8000/assets/overlay-top-left-hires.webp?v=20260924-v3-recovered1`
- P0-A/P0-B/P0-D/Chunk 3/Chunk 4/layering all passed before this failure.

## EXACT RECONSTRUCTION PROOF — VERIFIED
Instead of transporting ~552KB base64 through connector payloads, the exact cleaned candidate bytes can be reconstructed deterministically from the previously verified original production binaries.

Original authoritative sources:
- top old Git blob `990c6b3523f79a483f41f17032f03f880f97f461`, 518x500 RGBA
- bottom old Git blob `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`, 655x524 RGBA

Pixel-delta proof from original -> cleaned candidate:
- only alpha changes; every changed pixel becomes alpha=0
- RGB of every pixel that remains visible is unchanged
- top: exactly 552 alpha-zero pixels across rows 486..499
- bottom: exactly 3,176 alpha-zero pixels across rows 0..32

Exact top row-run mask (inclusive x ranges):
- 486: 298-304
- 487: 294-305
- 488: 290-306
- 489: 287-303, 305-305
- 490: 283-295, 297-307
- 491: 279-297, 303-308
- 492: 276-308
- 493: 273-309
- 494: 271-311
- 495: 259-312
- 496: 252-312
- 497: 247-313
- 498: 243-314, 359-359
- 499: 239-315, 356-361

Exact bottom row-run mask (inclusive x ranges):
- 0: 118-213, 302-370
- 1: 119-208, 303-369
- 2: 120-202, 303-369
- 3: 121-196, 304-368
- 4: 122-193, 304-368
- 5: 123-193, 303-303, 305-367
- 6: 124-193, 303-367
- 7: 125-194, 297-366
- 8: 126-194, 293-366
- 9: 127-195, 308-365
- 10: 128-195, 308-365
- 11: 129-196, 309-364
- 12: 131-196, 309-363
- 13: 132-197, 309-362
- 14: 134-197, 310-361
- 15: 136-197, 312-360
- 16: 139-197, 313-359
- 17: 141-197, 313-358
- 18: 143-196, 314-358
- 19: 146-196, 315-358
- 20: 148-195, 316-355
- 21: 150-195, 319-355
- 22: 152-194, 325-354
- 23: 153-194, 330-353
- 24: 157-193, 331-352
- 25: 161-193, 331-351
- 26: 165-192, 331-351
- 27: 169-192, 334-350
- 28: 172-191, 336-350
- 29: 175-191, 339-350
- 30: 178-190, 344-350
- 31: 182-190, 344-350
- 32: 185-189, 344-350

Encoding proof:
- Pillow version `12.3.0`
- save parameters: `format='WEBP', lossless=True, quality=80, method=6, exact=False`
- applying the masks above to the old originals and saving with those parameters regenerates byte-for-byte exact targets:
  - top => 180,814 bytes + SHA256 `f0ffd24fdde830d06b0d715c7c6ba8c2e81402c9e93731524a3dfa724915d393`
  - bottom => 233,136 bytes + SHA256 `bd645b4744270e221fe0eae8fe08eabf2771269391ddfc4650492e6da831ad31`

Therefore the exact-byte repair no longer needs chunked base64 staging. The repair workflow can fetch full Git history, materialize the two known old blobs, apply the compact deterministic alpha masks with Pillow 12.3.0, verify exact byte size + SHA256, and map only the two production overlay paths.

## REPAIR WORKFLOW STATE
Temporary workflow already exists:
- `.github/workflows/repair-uat011-exact-overlays.yml`
- created in commit `ffe6fd1b53679c1195040b398b5a9837fe4ec41a`
- it has NOT been triggered.

Two orphan ASCII chunk blobs were created during the abandoned chunk approach but are not referenced by any tree/commit and require no cleanup:
- `c60fbeb5090e82ad1dddbd73d72ee18b0628861d`
- `c474a81e2698fccc980314e177864fa09142ecce`

## VERIFIED ACTIONS STATE
- Pages `36093278458` — completed/success
- UI QA `36093279114` — completed/failure at sharpness step only after P0/layering gates above passed
- failure artifact `10845589504`, digest `sha256:dcad54fa1a5757ba9706cb751aeaf16f3de394e76ceff8de2c346eef091e578e`

## VERIFIED BASELINE — DO NOT REOPEN
- V4 Chunk 1–4 pre-delta acceptance remains baseline.
- UAT-012 presentation fix remains accepted by its dedicated local regression gate.
- preserve P0-A/P0-B/P0-D/layering/sharpness/tap-safety and phone-landscape interaction/modal behavior.
- no business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export changes.

## DO NOT REPEAT
- do not redo UAT-011 contamination discovery or alpha-mask derivation.
- do not continue the abandoned 32-chunk base64 staging plan.
- do not regenerate/modify mask pixels beyond the exact row-runs above.
- do not change UAT-012 portrait background rules.
- do not rerun `36093279114` unchanged.

## EXACT NEXT ACTION
1. Fresh-confirm this reconstruction-proof checkpoint is durable on `main`.
2. Replace the temporary repair workflow implementation so it:
   - checkout with `fetch-depth: 0`;
   - install `Pillow==12.3.0`;
   - materialize old blobs `990c6b...` and `cf1f98...` with `git cat-file blob`;
   - apply the exact row-run alpha masks above;
   - encode with the proven Pillow parameters;
   - verify exact target byte sizes + SHA256 before copying into production;
   - stage and commit exactly the two production overlay paths only.
3. Create trigger marker `repair-staging/uat011/RUN_EXACT_REPAIR` only after workflow update is durable.
4. Inspect the repair run once; if running, checkpoint run ID/status and stop polling; if completed, verify exact result and checkpoint.
5. Verify resulting Git tree blob sizes/diff scope.
6. Run one combined UI QA + Pages verification for UAT-011/UAT-012.
7. If automation passes, inspect only targeted phone-portrait environment + character-cutout evidence, persist `READY FOR USER RE-REVIEW`, and hand back `https://twentybkk-boop.github.io/NER-Menu-quantity/`.

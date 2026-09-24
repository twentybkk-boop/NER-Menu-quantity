# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts.

## CURRENT WORK HEAD — AUTOMATION VERIFIED; MANUAL EVIDENCE NEXT
- Feasible-geometry checkpoint: `1fb4512f942500e55b0b26aeffebe73cef2f6252`.
- Presentation fix: `c0cf1314e3e50504d2fb07d17bad30cfae664ebc` — `Restore minimum modal story-detail geometry`.
- Pre-Actions checkpoint: `a04301c9803a5f4bc07734c4743b3392ac078a6c`.

## FIX SCOPE — VERIFIED DURABLE
`c0cf1314…` changes exactly one file, `assets/visual-uat-v4-chunk4.css`, and only these modal `.decor-a` dimensions:
- phone portrait `56x61 -> 78x76`, left/top unchanged.
- iPad portrait `70x77 -> 78x77`, left/top unchanged.
- iPad landscape/wide `72x79 -> 78x79`, left/top unchanged.
- phone landscape remains `80x87`.
- no QA/test, `.decor-b/.decor-c`, density/chrome, recipe/business/quantity/exclusion/replacement/Matrix/PIN/import-export changes.

## POST-FIX AUTOMATION — VERIFIED SUCCESS
Code head verified: `c0cf1314e3e50504d2fb07d17bad30cfae664ebc`.

Pages:
- run `36060607153`
- `completed / success`

UI QA:
- run `36060607688`
- run number `138`
- job `107838353210`
- `completed / success`

Required successful gates include:
- base Chromium + WebKit UI QA
- P0-A complete character composition
- P0-B protected center frame
- P0-D top composition + long-list rhythm
- V4 thumbnail semantics/density
- V4 Chunk 4 character scale/detail density/safety LOCAL + DEPLOYED
- orientation layering/backmost environment LOCAL + DEPLOYED
- V3 high-res sharpness LOCAL + DEPLOYED
- calculator visual hierarchy
- V4 phone-landscape calculator interaction LOCAL + DEPLOYED
- screenshot upload

Artifact:
- name `ui-qa-screenshots`
- ID `10834148831`
- size `72,943,476` bytes
- digest `sha256:c3e698110745b8f806640b9ae4452e22de1367b8ff1d4a6aba2af4cb2d138adb`
- head SHA `c0cf1314e3e50504d2fb07d17bad30cfae664ebc`

## ROOT CAUSE / CONTRACT STATUS — VERIFIED
- P0-A floor remains unchanged: every character box >= `78x76`, approved high-res source, `background-size:contain`, >=96% box visibility, pointer safety.
- Chunk 4 safe-zone gate remains unchanged and directly requires top-left modal composition to avoid `.modal-title` and `.modal-subtitle` with 2px separation.
- The fix uses the already-reserved modal top rails instead of weakening either contract.

## PREVIOUS MANUAL DEFECT — MUST BE RECHECKED, NOT RE-DERIVED
Old pre-fix artifact manual review found top-left modal character obstruction in:
- phone portrait
- iPad portrait
- iPad landscape
Phone landscape modal and all page states passed; UAT-009 density passed.

## VERIFIED BASELINE — DO NOT REOPEN
- Chunk 1 `UAT-001/002/003` complete — checkpoint `3eb47a81fa1bd84d2ebf8942e694deeaea333ef5`.
- Chunk 2 `UAT-004/005` + landscape UAT-010 complete — checkpoint `8eefd4142a4d2d27dca7dcf8e8ce175238b335e8`.
- Chunk 3 `UAT-006/007` complete — checkpoint `92aef5661454ea21580328df96cd3428838a43d5`.
- approved production character binaries remain locked.

## LOCKED INVARIANTS
- no recipe/business/quantity/exclusion/replacement/Matrix/PIN/import-export changes.
- no character binary/source remapping.
- preserve page-state geometry, phone-landscape modal geometry, modal `.decor-b/.decor-c`, UAT-009 density.
- preserve all existing P0/layering/sharpness/tap-safety gates.

## DO NOT REPEAT
- do not re-read failed run `36058265001`.
- do not redo feasible-geometry derivation.
- do not rerun `36060607688`; it is verified success.
- do not relax P0-A or safe-zone gates.
- do not restore old oversized modal `.decor-a` values.

## EXACT NEXT ACTION
1. Fresh-confirm this checkpoint is durable on `main`.
2. Download artifact `10834148831` once.
3. Extract only Chunk 4 evidence files `34-chunk4-*` and `live-34-chunk4-*`.
4. Verify local/live byte/hash equivalence for the three previously failing modal orientations (phone portrait, iPad portrait, iPad landscape; phone landscape may be included as regression confirmation).
5. Manual-review only local copies when byte-identical:
   - all three approved characters present;
   - top-left story detail remains readable;
   - no top-left overlap with modal title/subtitle;
   - bottom-left/right remain intact;
   - no new rail/control obstruction;
   - density/action visibility remains acceptable.
6. Persist manual visual verdict immediately.
7. If PASS, mark UAT-008/UAT-009/final UAT-010 + V4 Chunk 4 VERIFIED COMPLETE, then perform one final live-readiness check and hand the deployed URL to the user for real web-app review.
8. If FAIL, checkpoint exact screenshot/defect before any code edit.

## FINAL COMPLETION CONDITION
V4 Chunk 4 is complete only after manual evidence confirms the three previously failing modal orientations and the final readiness state is persisted. User hands-on review begins only after that durable checkpoint.

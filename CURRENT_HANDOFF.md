# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts.

## CURRENT WORK HEAD — AUTOMATION + EVIDENCE EQUIVALENCE VERIFIED; MANUAL VISUAL NEXT
- Feasible-geometry checkpoint: `1fb4512f942500e55b0b26aeffebe73cef2f6252`.
- Presentation fix: `c0cf1314e3e50504d2fb07d17bad30cfae664ebc`.
- Automation-success checkpoint: `a72c763019e6f5d2b4eec44428df8ca479b225f5`.

## FIX SCOPE — VERIFIED DURABLE
`c0cf1314…` changes only `assets/visual-uat-v4-chunk4.css` and only these modal `.decor-a` dimensions:
- phone portrait `56x61 -> 78x76`
- iPad portrait `70x77 -> 78x77`
- iPad landscape/wide `72x79 -> 78x79`
All left/top values unchanged; phone-landscape remains `80x87`; no QA/business/recipe/interaction changes.

## POST-FIX AUTOMATION — VERIFIED SUCCESS
Pages:
- run `36060607153` — completed/success

UI QA:
- run `36060607688` — completed/success
- job `107838353210`
- all required LOCAL + DEPLOYED gates passed, including P0-A, P0-B, P0-D, Chunk 3, Chunk 4, layering, high-res sharpness, calculator hierarchy, and phone-landscape interaction.

Artifact:
- `ui-qa-screenshots`
- ID `10834148831`
- size `72,943,476` bytes
- digest `sha256:c3e698110745b8f806640b9ae4452e22de1367b8ff1d4a6aba2af4cb2d138adb`

## FINAL CHUNK 4 EVIDENCE — LOCAL/LIVE BYTE EQUIVALENCE VERIFIED
Artifact was downloaded once and only `34-chunk4-*` / `live-34-chunk4-*` files were extracted.

All LOCAL screenshots are byte-identical to their DEPLOYED counterparts:
- phone portrait page: `b654f52f4290c4263aa4be5b8506208189bda00e50457953be19c2065e55d866`
- phone portrait modal: `e85e45d1878e73514df541027622e0c3d54a952b6af8299dc6c5b5a941dc1b8e`
- phone landscape page: `8e8c604bce1924db5b26917127ed28f9b18c0577e6953ab5f075abfb67c93257`
- phone landscape modal: `10679f1f01332aa413ec0730ee8fec18a57200fe48dcac972e06105094024aa8`
- iPad portrait page: `689e0438fafd83f66353674a9a9e0bc822d88193360fec37e753555939ed95eb`
- iPad portrait modal: `57b804b6a7e621013d3c1beb65674d01356cdf653bc2a05cd6b1b2a9bc39c7b5`
- iPad landscape page: `0985c7b056e4cc69a6023244f11352a06ab51e8875a8c122c43529dc8d0612ab`
- iPad landscape modal: `cbf32230274a0177045243d1433e3bae85c849b1187ca5ad56120e87e0aaf7a2`

Therefore manual visual review only needs the eight LOCAL copies; no duplicate LIVE visual review is necessary.

## ROOT CAUSE / CONTRACT STATUS — VERIFIED
- P0-A floor remains >= `78x76`, approved high-res source, contain sizing, >=96% box visibility, pointer safety.
- Chunk 4 direct title/subtitle non-intersection safe-zone gate remains unchanged.
- The final geometry uses reserved top rails and weakens no contract.

## VERIFIED BASELINE — DO NOT REOPEN
- Chunk 1 `UAT-001/002/003` complete — `3eb47a81fa1bd84d2ebf8942e694deeaea333ef5`.
- Chunk 2 `UAT-004/005` + landscape UAT-010 complete — `8eefd4142a4d2d27dca7dcf8e8ce175238b335e8`.
- Chunk 3 `UAT-006/007` complete — `92aef5661454ea21580328df96cd3428838a43d5`.
- approved production character binaries remain locked.

## LOCKED INVARIANTS
- no recipe/business/quantity/exclusion/replacement/Matrix/PIN/import-export changes.
- no character binary/source remapping.
- preserve page-state geometry, phone-landscape modal geometry, modal `.decor-b/.decor-c`, UAT-009 density, all P0/layering/sharpness/tap-safety gates.

## DO NOT REPEAT
- do not rerun `36060607688`.
- do not re-download artifact `10834148831` unless local mount is lost.
- do not visually review LIVE copies; hashes prove exact equality.
- do not redo geometry derivation or old failure analysis.

## EXACT NEXT ACTION
Manual-review only these LOCAL files from artifact `10834148831`:
- `34-chunk4-phone-portrait-page.png`
- `34-chunk4-phone-portrait-modal.png`
- `34-chunk4-phone-landscape-page.png`
- `34-chunk4-phone-landscape-modal.png`
- `34-chunk4-ipad-portrait-page.png`
- `34-chunk4-ipad-portrait-modal.png`
- `34-chunk4-ipad-landscape-page.png`
- `34-chunk4-ipad-landscape-modal.png`

Acceptance:
- all 3 characters present and story details readable;
- no top-left modal overlap with title/subtitle in phone portrait, iPad portrait, iPad landscape;
- phone landscape remains accepted;
- bottom-left/right intact;
- no rail/control obstruction;
- actionable content density remains acceptable.

Persist manual verdict immediately. If PASS, mark UAT-008/UAT-009/final UAT-010 and V4 Chunk 4 VERIFIED COMPLETE, then perform one final live-readiness check and hand the deployed URL to the user for hands-on review.

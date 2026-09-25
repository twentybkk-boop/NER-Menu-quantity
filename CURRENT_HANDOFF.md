# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — EXACT-BYTE BINARY REPAIR PROTOCOL SELECTED

## UAT-012 — FIX REMAINS DURABLE AND ACCEPTED BY ITS GATE
- product fix `6fdebb8da6fc87710be6f93141c26579d57d0056`
- portrait master sizing `auto 100dvh -> 160% auto`
- portrait ivory wash reduced `.42/.16/.34 -> .18/.06/.16`
- landscape unchanged
- regression gate `f28893b255f41ff70643c4e406d4de003909eddb`
- UI QA run `36093279114` confirmed orientation/layering/backmost environment PASS in Chromium + WebKit for all targeted orientations before a later unrelated failure.

## UAT-011 — VERIFIED ROOT CAUSE OF QA FAILURE
The alpha-cleanup itself is valid. Production Git blobs do not contain the full verified cleaned candidate bytes.

Verified local exact candidates:
- top: `/mnt/data/uat011_clean/overlay-top-left-hires-clean.webp`, 518x500 RGBA, 180,814 bytes, SHA256 `f0ffd24fdde830d06b0d715c7c6ba8c2e81402c9e93731524a3dfa724915d393`
- bottom: `/mnt/data/uat011_clean/overlay-bottom-left-hires-clean.webp`, 655x524 RGBA, 233,136 bytes, SHA256 `bd645b4744270e221fe0eae8fe08eabf2771269391ddfc4650492e6da831ad31`
- both decode with Pillow and FFmpeg/ffprobe.

Current wrong production blobs:
- top blob `e457bc39bfa490b467b7b061afd388c924203dec`, only 14,997 bytes
- bottom blob `d028a38f30098759217c1f2808a29f2327de441d`, only 14,999 bytes
- right control remains valid blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`, 51,376 bytes.

UI QA `36093279114` first failed required step:
- V3 character high-res sharpness local
- exact failure: `failed to load http://127.0.0.1:8000/assets/overlay-top-left-hires.webp?v=20260924-v3-recovered1`
- P0-A/P0-B/P0-D/Chunk 3/Chunk 4/layering all passed before this failure.

## BINARY-SAFE TRANSPORT DECISION — VERIFIED DURABLE
Direct text/base64 blob submission is rejected for this repair because the previous path produced ~15KB blobs instead of full candidate bytes.

Use the already-proven repository repair pattern from `repair/v3-2b2-exact-blobs-20260924`:
- stage ASCII base64 in multiple small files;
- workflow with `permissions: contents: write` concatenates chunks in GitHub Actions;
- decode in runner into binary files;
- verify exact byte size + SHA256 before any commit;
- replace ONLY `assets/overlay-top-left-hires.webp` and `assets/overlay-bottom-left-hires.webp`;
- commit/push from Actions only if all exact checks pass.

Base64 staging sizes at 18,000-char chunks:
- top base64 length 241,088 => 14 chunks
- bottom base64 length 310,848 => 18 chunks

No lossy q70/q75 derivative has been approved or mapped. Exact cleaned pixels remain authoritative.

## VERIFIED ACTIONS STATE
- Pages `36093278458` — completed/success
- UI QA `36093279114` — completed/failure at sharpness step only after all gates listed above passed
- failure artifact `10845589504`, digest `sha256:dcad54fa1a5757ba9706cb751aeaf16f3de394e76ceff8de2c346eef091e578e`

## VERIFIED BASELINE — DO NOT REOPEN
- V4 Chunk 1–4 pre-delta acceptance remains baseline.
- UAT-012 presentation fix remains accepted by its dedicated local regression gate.
- preserve P0-A/P0-B/P0-D/layering/sharpness/tap-safety and phone-landscape interaction/modal behavior.
- no business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export changes.

## DO NOT REPEAT
- do not redo UAT-011 contamination discovery or alpha-mask cleanup.
- do not regenerate the cleaned candidates.
- do not switch to lossy derivatives unless exact-byte repair is proven impossible and that decision is checkpointed first.
- do not change UAT-012 portrait background rules.
- do not rerun `36093279114` unchanged.

## EXACT NEXT ACTION
1. Fresh-confirm this repair-plan checkpoint is durable on `main`.
2. Create temporary repair workflow + base64 staging chunks under a non-production repair path.
3. Trigger workflow only after all chunks are present.
4. Workflow must verify:
   - decoded top size = 180,814 and SHA256 = `f0ffd24fdde830d06b0d715c7c6ba8c2e81402c9e93731524a3dfa724915d393`
   - decoded bottom size = 233,136 and SHA256 = `bd645b4744270e221fe0eae8fe08eabf2771269391ddfc4650492e6da831ad31`
5. Workflow maps only the two production overlay paths, commits and pushes.
6. Verify resulting Git tree blob sizes/diff scope; checkpoint corrected mapping immediately.
7. Run one combined UI QA + Pages verification for UAT-011/UAT-012.
8. If automation passes, inspect only targeted phone-portrait environment + character-cutout evidence, persist `READY FOR USER RE-REVIEW`, and hand back `https://twentybkk-boop.github.io/NER-Menu-quantity/`.

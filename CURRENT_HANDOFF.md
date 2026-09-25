# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-011 CLEANUP LOGIC VERIFIED; PRODUCTION BLOBS ARE WRONG/TRUNCATED; UAT-012 FIX STILL ACCEPTED

## UAT-012 — FIX REMAINS DURABLE AND ACCEPTED BY ITS GATE
- product fix `6fdebb8da6fc87710be6f93141c26579d57d0056`
- portrait master sizing `auto 100dvh -> 160% auto`
- portrait ivory wash reduced `.42/.16/.34 -> .18/.06/.16`
- landscape unchanged
- regression gate `f28893b255f41ff70643c4e406d4de003909eddb`
- UI QA run `36093279114` confirmed orientation/layering/backmost environment PASS in Chromium + WebKit for all targeted orientations before a later unrelated failure.

## UAT-011 — VERIFIED ROOT CAUSE OF THE QA FAILURE
The alpha-cleanup work itself is not the blocker. The bytes mapped into GitHub production are not the verified cleaned candidate bytes.

### Verified local cleaned candidates
Top-left candidate:
- path persisted in recovery workspace: `/mnt/data/uat011_clean/overlay-top-left-hires-clean.webp`
- 518x500 RGBA
- SHA256 `f0ffd24fdde830d06b0d715c7c6ba8c2e81402c9e93731524a3dfa724915d393`
- local file size **180,814 bytes**
- `file`: RIFF Web/P lossless
- Pillow decode: PASS
- FFmpeg/ffprobe decode: PASS (`webp`, 518x500, argb)

Bottom-left candidate:
- `/mnt/data/uat011_clean/overlay-bottom-left-hires-clean.webp`
- 655x524 RGBA
- SHA256 `bd645b4744270e221fe0eae8fe08eabf2771269391ddfc4650492e6da831ad31`
- local file size **233,136 bytes**
- `file`: RIFF Web/P lossless
- Pillow decode: PASS
- FFmpeg/ffprobe decode: PASS (`webp`, 655x524, argb)

### Git tree proof — current production blobs do NOT match those candidates
Current `main` tree shows:
- `assets/overlay-top-left-hires.webp`
  - blob `e457bc39bfa490b467b7b061afd388c924203dec`
  - **size 14,997 bytes**
- `assets/overlay-bottom-left-hires.webp`
  - blob `d028a38f30098759217c1f2808a29f2327de441d`
  - **size 14,999 bytes**
- control `assets/overlay-right-hires.webp`
  - blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`
  - size 51,376 bytes

The top/bottom production blob sizes are incompatible with the verified local candidate sizes and therefore cannot be the exact candidate bytes whose SHA256 values were recorded previously.

This explains UI QA run `36093279114` step 15 failure:
`failed to load http://127.0.0.1:8000/assets/overlay-top-left-hires.webp?v=20260924-v3-recovered1`

The sharpness contract is functioning as designed: it is the first gate that directly decodes the high-resolution source and therefore exposed the malformed/wrong production blob.

## HYPOTHESES ELIMINATED
- NOT a UAT-012 background regression: layering/orientation contract passed fully.
- NOT a CSS URL/query-string regression: the same contract path/URL construction was previously verified; the changed variable is the production binary mapping.
- NOT generic character geometry: P0-A/P0-B passed before sharpness.
- the local cleaned candidate encoding itself is decodable by independent image decoders; the mismatch is between verified candidate bytes and GitHub blob bytes.

## VERIFIED ACTIONS STATE
Pages for relevant app/test head:
- `36093278458` — completed/success

UI QA:
- `36093279114` — completed/failure
- first failed required step: V3 character high-res sharpness local
- artifact `10845589504`, digest `sha256:dcad54fa1a5757ba9706cb751aeaf16f3de394e76ceff8de2c346eef091e578e`

## VERIFIED BASELINE — DO NOT REOPEN
- V4 Chunk 1–4 pre-delta acceptance remains baseline.
- UAT-012 presentation fix remains accepted by its dedicated local regression gate.
- preserve P0-A/P0-B/P0-D/layering/sharpness/tap-safety and phone-landscape interaction/modal behavior.
- no business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export changes.

## DO NOT REPEAT
- do not redo UAT-011 contamination discovery or alpha-mask cleanup.
- do not regenerate the cleaned candidate pixels unless exact-byte upload proves impossible.
- do not change UAT-012 portrait background rules.
- do not rerun `36093279114` unchanged.

## EXACT NEXT ACTION
1. Fresh-confirm this root-cause checkpoint is durable on `main`.
2. Create new Git blobs from the FULL exact local cleaned candidate bytes (not reconstructed/truncated text), preserving SHA256 candidate identity locally.
3. Verify newly created Git blob sizes are consistent with full candidates, then map ONLY:
   - `assets/overlay-top-left-hires.webp`
   - `assets/overlay-bottom-left-hires.webp`
4. Verify commit diff scope is exactly those two binary paths and immediately checkpoint the corrected mapping.
5. Run one combined UI QA + Pages verification for UAT-011/UAT-012.
6. If automation passes, inspect only targeted phone-portrait environment + character-cutout evidence, persist `READY FOR USER RE-REVIEW`, and hand back `https://twentybkk-boop.github.io/NER-Menu-quantity/`.

# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-011 EXACT OVERLAYS MAPPED; PAGES PASS; UI QA NEEDS EXPLICIT TRIGGER

## UAT-011 — EXACT REPAIR VERIFIED DURABLE
User defect: foreign top/bottom character fragments were embedded in the production cutouts.

Verified cleaned targets:
- top-left: 518x500 RGBA, 180,814 bytes, SHA256 `f0ffd24fdde830d06b0d715c7c6ba8c2e81402c9e93731524a3dfa724915d393`
- bottom-left: 655x524 RGBA, 233,136 bytes, SHA256 `bd645b4744270e221fe0eae8fe08eabf2771269391ddfc4650492e6da831ad31`

Verified bot mapping commit:
- `df45d20922d7706ceb641c160be21247a3cada9b` — `Map exact cleaned UAT-011 overlays`
- author: `github-actions[bot]`
- commit diff contains exactly:
  - `assets/overlay-top-left-hires.webp`
  - `assets/overlay-bottom-left-hires.webp`

Verified production Git tree at bot commit:
- `assets/overlay-top-left-hires.webp`
  - Git blob `5740a9a4619938e8d71b28d8162729b2738bfb59`
  - size **180,814 bytes**
- `assets/overlay-bottom-left-hires.webp`
  - Git blob `cc0c119b00d1d91fa6b4d6503b1bec5c66061128`
  - size **233,136 bytes**
- right control remains `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`, 51,376 bytes

## UAT-012 — FIX REMAINS DURABLE
- product fix `6fdebb8da6fc87710be6f93141c26579d57d0056`
- portrait master sizing `auto 100dvh -> 160% auto`
- portrait ivory wash reduced `.42/.16/.34 -> .18/.06/.16`
- landscape unchanged
- regression gate `f28893b255f41ff70643c4e406d4de003909eddb`

## POST-REPAIR ACTIONS — ONE-SHOT READ
Queried workflow runs for exact bot head `df45d20922d7706ceb641c160be21247a3cada9b` once.

Observed:
- Pages run `36095839556`
  - status `completed`
  - conclusion `success`
  - head SHA `df45d20922d7706ceb641c160be21247a3cada9b`
- no UI QA run was returned for this exact bot head SHA

Therefore:
- deployment of the corrected binaries succeeded
- do NOT poll this head waiting for UI QA
- a separate normal `qa/**` trigger commit is required to exercise the existing UI QA workflow against current `main`

## PRIOR FAILED QA — DO NOT RERUN UNCHANGED
- UI QA `36093279114` — completed/failure
- first failed required step: V3 high-res sharpness local
- cause resolved by corrected full-size production blobs
- artifact `10845589504`, digest `sha256:dcad54fa1a5757ba9706cb751aeaf16f3de394e76ceff8de2c346eef091e578e`

## VERIFIED BASELINE — DO NOT REOPEN
- V4 Chunk 1–4 baseline acceptance
- UAT-011 contamination discovery / alpha-mask derivation / encoder proof / exact mapping
- UAT-012 portrait background root cause/fix
- P0-A/P0-B/P0-D/layering/sharpness/tap-safety and phone-landscape interaction/modal behavior remain regression gates
- no business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export changes

## DO NOT REPEAT
- do not trigger exact overlay repair again
- do not regenerate UAT-011 masks/assets again
- do not resume abandoned base64 chunk staging
- do not change UAT-012 portrait rules while validating the combined fix
- do not poll bot head `df45d209…` waiting for a UI QA run
- do not rerun old failed run `36093279114`

## EXACT NEXT ACTION — NEXT SHORT SESSION
1. Fresh-read current `main` + this handoff.
2. Check whether a dedicated UAT-delta QA trigger marker already exists under `qa/`.
3. If absent, create one small marker commit under `qa/**` (no product/runtime changes) to trigger the existing UI QA workflow against current `main`.
4. Read Actions for that trigger commit once.
5. If UI QA is still running: persist run ID/status and stop; no polling loop.
6. If UI QA completed:
   - inspect final status + first failed required step if any;
   - if success, fetch artifact metadata and checkpoint automation success before manual evidence review.
7. After automation success, inspect only targeted phone-portrait environment + top/bottom-left cutout evidence; if visually PASS, persist `READY FOR USER RE-REVIEW` and return the live URL.

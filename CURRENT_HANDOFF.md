# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-011/UAT-012 AUTOMATION PASS; TARGETED VISUAL REVIEW NEXT

## UAT-011 — EXACT REPAIR VERIFIED DURABLE
- exact cleaned top-left target: 518x500 RGBA, 180,814 bytes, SHA256 `f0ffd24fdde830d06b0d715c7c6ba8c2e81402c9e93731524a3dfa724915d393`
- exact cleaned bottom-left target: 655x524 RGBA, 233,136 bytes, SHA256 `bd645b4744270e221fe0eae8fe08eabf2771269391ddfc4650492e6da831ad31`
- bot mapping commit `df45d20922d7706ceb641c160be21247a3cada9b` changes exactly:
  - `assets/overlay-top-left-hires.webp`
  - `assets/overlay-bottom-left-hires.webp`
- production Git tree verified:
  - top blob `5740a9a4619938e8d71b28d8162729b2738bfb59`, 180,814 bytes
  - bottom blob `cc0c119b00d1d91fa6b4d6503b1bec5c66061128`, 233,136 bytes
  - right control unchanged `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`, 51,376 bytes

## UAT-012 — FIX REMAINS DURABLE
- product fix `6fdebb8da6fc87710be6f93141c26579d57d0056`
- portrait master sizing `auto 100dvh -> 160% auto`
- portrait ivory wash `.42/.16/.34 -> .18/.06/.16`
- landscape unchanged
- regression gate `f28893b255f41ff70643c4e406d4de003909eddb`

## QA TRIGGER — DURABLE
- marker `qa/RUN_UI_QA_UAT_DELTA`
- trigger commit `88a27c41da670409c8321e69b84747369f2fe295` — `Trigger UI QA for UAT-011 and UAT-012`
- trigger commit changes only the QA marker; product/runtime unchanged

## FINAL VERIFICATION ACTIONS — VERIFIED SUCCESS
Pages:
- run `36096022108`
- head SHA `88a27c41da670409c8321e69b84747369f2fe295`
- **completed / success**

UI QA:
- run `36096022816`
- run number `142`
- job `107948357218`
- head SHA `88a27c41da670409c8321e69b84747369f2fe295`
- **completed / success**

All required job steps passed, including:
- base Chromium + WebKit UI QA
- P0-A complete character composition
- P0-B protected center frame
- P0-D top composition
- P0-D long-list rhythm
- V4 thumbnail semantics/density local + deployed
- V4 Chunk 4 character scale/detail/safety local + deployed
- orientation layering/backmost environment local + deployed
- V3 character high-res sharpness local + deployed
- calculator visual hierarchy
- V4 phone-landscape calculator interaction local + deployed
- artifact rendering/upload

Artifact:
- `ui-qa-screenshots`
- artifact ID `10846819582`
- size `78,293,605` bytes
- digest `sha256:5fde96f1c6c346d2eec384bf583cc5c8715ee5b16270c211578f4673d861f598`
- not expired

## PRIOR FAILED QA — RESOLVED; DO NOT RERUN
- UI QA `36093279114` — completed/failure at V3 high-res sharpness local
- cause was wrong/truncated production top/bottom blobs
- resolved by exact full-size mapping above

## VERIFIED BASELINE — DO NOT REOPEN
- V4 Chunk 1–4 baseline acceptance
- UAT-011 contamination discovery / alpha-mask derivation / encoder proof / exact mapping
- UAT-012 portrait background root cause/fix
- P0-A/P0-B/P0-D/layering/sharpness/tap-safety and phone-landscape interaction/modal behavior remain regression gates
- no business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export changes

## DO NOT REPEAT
- do not trigger exact overlay repair again
- do not regenerate UAT-011 assets/masks
- do not create another QA trigger
- do not poll completed run `36096022816`
- do not change UAT-012 portrait rules after successful automation
- do not rerun old failed run `36093279114`

## EXACT NEXT ACTION — NEXT SHORT SESSION
1. Fresh-read current `main` + this handoff.
2. Download artifact `10846819582` exactly once.
3. Inspect ONLY targeted phone-portrait evidence needed for the two remaining user comments:
   - environment/background visibility (UAT-012)
   - clean top-left/bottom-left cutouts with no cross-character fragments (UAT-011)
4. Compare local/live corresponding phone-portrait evidence when available; if bytes are identical, inspect one copy only.
5. Persist targeted manual visual result immediately.
6. If PASS, remove temporary QA marker `qa/RUN_UI_QA_UAT_DELTA` if still present, verify deletion scope, checkpoint final clean state, then persist `READY FOR USER RE-REVIEW` and return `https://twentybkk-boop.github.io/NER-Menu-quantity/`.
7. If FAIL, checkpoint exact screenshot/visual blocker before any further code change.

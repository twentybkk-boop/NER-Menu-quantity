# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-011/UAT-012 FINAL VERIFICATION RUNNING; DO NOT POLL IN LOOP

## UAT-011 — EXACT REPAIR VERIFIED DURABLE
User defect: foreign top/bottom character fragments were embedded in the production cutouts.

Verified cleaned targets:
- top-left: 518x500 RGBA, 180,814 bytes, SHA256 `f0ffd24fdde830d06b0d715c7c6ba8c2e81402c9e93731524a3dfa724915d393`
- bottom-left: 655x524 RGBA, 233,136 bytes, SHA256 `bd645b4744270e221fe0eae8fe08eabf2771269391ddfc4650492e6da831ad31`

Verified bot mapping commit:
- `df45d20922d7706ceb641c160be21247a3cada9b` — `Map exact cleaned UAT-011 overlays`
- commit diff exactly:
  - `assets/overlay-top-left-hires.webp`
  - `assets/overlay-bottom-left-hires.webp`

Verified production Git tree:
- top blob `5740a9a4619938e8d71b28d8162729b2738bfb59`, **180,814 bytes**
- bottom blob `cc0c119b00d1d91fa6b4d6503b1bec5c66061128`, **233,136 bytes**
- right control unchanged `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`, 51,376 bytes

## UAT-012 — FIX REMAINS DURABLE
- product fix `6fdebb8da6fc87710be6f93141c26579d57d0056`
- portrait master sizing `auto 100dvh -> 160% auto`
- portrait ivory wash reduced `.42/.16/.34 -> .18/.06/.16`
- landscape unchanged
- regression gate `f28893b255f41ff70643c4e406d4de003909eddb`

## DEPLOYMENT OF CORRECTED BINARIES — VERIFIED
Bot-head Pages run:
- `36095839556`
- head SHA `df45d20922d7706ceb641c160be21247a3cada9b`
- `completed / success`

No UI QA run was created for the bot head, so a normal QA-only trigger was used.

## QA TRIGGER — DURABLE
Trigger marker:
- `qa/RUN_UI_QA_UAT_DELTA`
- content: `uat-delta-exact-overlays-and-portrait-background-v1`

Trigger commit:
- `88a27c41da670409c8321e69b84747369f2fe295` — `Trigger UI QA for UAT-011 and UAT-012`
- product/runtime files unchanged by this trigger commit

## FINAL VERIFICATION ACTIONS — BOUNDED READ
Read Actions for exact trigger head `88a27c41da670409c8321e69b84747369f2fe295` once.

Observed:
- UI QA run `36096022816`
  - run number `142`
  - status **in_progress**
  - conclusion not yet available
- Pages run `36096022108`
  - status **pending**
  - conclusion not yet available

Per crash-safe rule, no polling loop was started after observing running external state.

## PRIOR FAILED QA — DO NOT RERUN UNCHANGED
- UI QA `36093279114` — completed/failure at V3 high-res sharpness local
- cause resolved by corrected full-size production blobs
- failure artifact `10845589504`, digest `sha256:dcad54fa1a5757ba9706cb751aeaf16f3de394e76ceff8de2c346eef091e578e`

## VERIFIED BASELINE — DO NOT REOPEN
- V4 Chunk 1–4 baseline acceptance
- UAT-011 contamination discovery / alpha-mask derivation / encoder proof / exact mapping
- UAT-012 portrait background root cause/fix
- P0-A/P0-B/P0-D/layering/sharpness/tap-safety and phone-landscape interaction/modal behavior remain regression gates
- no business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export changes

## DO NOT REPEAT
- do not trigger exact overlay repair again
- do not regenerate UAT-011 assets/masks again
- do not create another QA trigger while run `36096022816` is active
- do not poll `36096022816` or `36096022108` in a loop
- do not change UAT-012 portrait rules while verification is running
- do not rerun old failed run `36093279114`

## EXACT NEXT ACTION — NEXT SHORT SESSION
1. Fresh-read current `main` + this handoff.
2. Read UI QA `36096022816` and Pages `36096022108` **once each**.
3. If either required run is still non-terminal: persist current statuses and stop again.
4. If UI QA failed: inspect only the first failed required step/log and checkpoint evidence before edits.
5. If both completed/success:
   - fetch UI QA job steps + artifact metadata once;
   - persist automation-success checkpoint before opening images.
6. Then inspect only targeted phone-portrait evidence for:
   - environment/background visibility (UAT-012)
   - clean top-left/bottom-left cutouts with no cross-character fragments (UAT-011)
   - local/live equivalence when available.
7. If targeted visual evidence passes, persist `READY FOR USER RE-REVIEW` and return `https://twentybkk-boop.github.io/NER-Menu-quantity/`.

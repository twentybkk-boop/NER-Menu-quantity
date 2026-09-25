# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-013 QA HARNESS FIX DURABLE; NEW CI VERIFICATION NEXT

Only remaining user-reported defect was portrait background art looking composited/cut-and-paste. User explicitly approved the newly generated portrait-native garden/hot-pot background.

## APPROVED UAT-013 ASSET — VERIFIED MAPPED
- 941x1672 RGB
- 125,912 bytes
- SHA256 `050777632f5fcd1c9217777e4925041633699f52ad37636aeb100a08226ad823`
- production path `assets/background-portrait-garden-v1.webp`
- repair run `36101535008` — completed/success
- bot mapping commit `1d7a134e8cfc595f5633bc3a7cb7614cdb1bf4a4`
- bot commit changed exactly one path: `assets/background-portrait-garden-v1.webp`
- production blob `30437127857f50d217f12451f9ecff8ec61a9ef9`, size 125,912 bytes

## UAT-013 PRODUCT INTEGRATION — DURABLE
- `assets/visual-uat-v4-chunk1.css` commit `7abe32e8a4147ab2b7b5763a98e31a8bb93dbd19`
  - portrait only uses `background-portrait-garden-v1.webp`
  - portrait image layer uses `cover`, centered top
  - portrait ivory veil/ambient opacity reduced so the approved art reads as one coherent scene
  - landscape branch remains on accepted `background-master.webp` with existing geometry/masthead protection
- dedicated contract `qa/uat013-portrait-background-contract.mjs` commit `d7879675cc58f111bb5390b5d10c606d6b98581a`
- orientation regression contract updated commit `6d3a25434e97588af7bc6e1509e0280978b5b339`
- `.github/workflows/ui-qa.yml` commit `33c9f26cb49dc1ce27dfadccd2151956d2acc26f` wires UAT-013 local + deployed gates
- code checkpoint commit `21e994f8a670f527a269693f6b448e21ceebe473`

## FIRST CI FAILURE — ROOT CAUSE VERIFIED
- UI QA run `36101969064`, job `107966196621`, code head `33c9f26cb49dc1ce27dfadccd2151956d2acc26f`
- first failed required step: `Run Chromium + WebKit UI QA`
- exact assertion: `chromium/iphone: background master not active`
- actual computed portrait background correctly contained `assets/background-portrait-garden-v1.webp`
- root cause was stale generic/base QA assumption, not a product CSS regression.

## QA HARNESS FIX — VERIFIED DURABLE
Commit:
- `9a6fd3cfa52b28c997fc4eba81fd080480b4fc2a` — `Update base UI QA for UAT-013 portrait background`

Scope verification:
- changed exactly one path: `qa/ui-qa-runner.mjs`
- no product CSS/assets/business/runtime code changed.

Behavior:
- compatibility wrapper now patches only the old base background assertion in its ephemeral runtime copy.
- `iphone` and `ipad-portrait` require `background-portrait-garden-v1.webp` and reject `background-master.webp`.
- `ipad-landscape` continues to require `background-master.webp` and rejects the portrait-only asset.
- central readability gradient assertion remains intact.
- existing thumbnail compatibility patch, calculator behavior, manager/PIN, Matrix/download, overflow, character presence, screenshots and orientation reflow remain unchanged.
- fail-closed source-block checks remain: if legacy source changes unexpectedly, wrapper throws instead of silently patching the wrong code.

## PAGES PRIOR STATE
- Pages run `36102019453` on earlier checkpoint head `21e994f8a670f527a269693f6b448e21ceebe473` was `in_progress` at the prior bounded read. This is superseded for final acceptance by the new QA-harness-fix code state.

## ACCEPTED / DO NOT REOPEN
- UAT-011 character cutout cleanup
- V4 Chunk 1–4 acceptance
- landscape background/layout/interaction
- P0-A/P0-B/P0-D/layering/sharpness/tap-safety/phone-landscape calculator behavior
- business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export semantics

## DO NOT REPEAT
- do not regenerate UAT-013 art
- do not rebuild/remap the verified UAT-013 binary
- do not rewrite exact repair staging chunks
- do not alter landscape behavior unless a concrete regression appears
- do not touch accepted character binaries
- do not rerun old failed UI QA `36101969064`
- do not change product CSS for the stale base assertion already fixed in QA harness

## EXACT NEXT ACTION
NEXT SHORT SESSION ONLY:
1. Read Actions for commit `9a6fd3cfa52b28c997fc4eba81fd080480b4fc2a` / current `main`: UI QA + Pages once.
2. If UI QA is still running, persist run ID/status and STOP; no polling loop.
3. If UI QA fails, inspect only the first failed required step/log and persist exact blocker before editing.
4. If UI QA succeeds, persist automation-success checkpoint before artifact review.
5. Then download only `ui-qa-screenshots` and inspect targeted local/live `35-phone-portrait-uat013.png` plus phone portrait layering evidence; verify local/live equivalence and manual visual integration.
6. After verified visual acceptance, remove only temporary UAT-013 repair staging/trigger artifacts, verify cleanup scope, then persist READY FOR USER FINAL REVIEW.

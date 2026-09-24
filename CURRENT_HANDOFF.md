# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts.

## CURRENT WORK HEAD — POST-FIX / PRE-ACTIONS CHECKPOINT
- Feasible-geometry checkpoint: `1fb4512f942500e55b0b26aeffebe73cef2f6252`.
- Presentation fix commit: `c0cf1314e3e50504d2fb07d17bad30cfae664ebc` — `Restore minimum modal story-detail geometry`.
- This handoff checkpoint is intentionally being written **before any Actions polling** for the new fix.

## P0-A FAILURE — VERIFIED DURABLE
Previous verification run:
- UI QA run `36058265001`
- job `107830594992`
- workflow head `42a6bedf675eebcb5d2ca9a05ad0001604948a3b`
- completed / failure
- first failing required step: `Verify P0-A complete character composition`
- exact assertion: `chromium/calculator: .decor-a became too small to preserve story detail`

`qa/character-composition-v2-contract.mjs` requires every character box, including calculator/modal state, to be at least **78px wide and 76px high**, while preserving approved high-res source, `background-size:contain`, >=96% viewport-visible box area, and pointer safety.

Failure artifact:
- `10833665689`
- digest `sha256:7ff3d23b111d50546f28a04d9d8b0bcc628c8b18fb01f7ec706879efb08f3c20`
- not a full post-fix acceptance artifact because the run stopped at P0-A.

## ROOT CAUSE — VERIFIED DURABLE
The first safe-zone correction over-shrank modal `.decor-a`, even though responsive CSS already reserves a dedicated top illustration rail above the calculator card:
- phone portrait top rail: `76px + safe-area-top`
- iPad portrait top rail: `114px + safe-area-top`
- iPad landscape/wide top rail: `122px + safe-area-top`

Therefore P0-A and the title/subtitle safe-zone are simultaneously satisfiable without weakening either contract.

## SMALLEST PRESENTATION FIX — VERIFIED DURABLE CODE
Commit `c0cf1314e3e50504d2fb07d17bad30cfae664ebc` changes exactly one file:
- `assets/visual-uat-v4-chunk4.css`

Exact changes:
1. phone portrait modal `.decor-a`
   - `56x61 -> 78x76`
   - `left:2` unchanged
   - `top:calc(env(safe-area-inset-top) + 2px)` unchanged
2. iPad portrait modal `.decor-a`
   - `70x77 -> 78x77`
   - `left:8` unchanged
   - `top:calc(env(safe-area-inset-top) + 4px)` unchanged
3. iPad landscape/wide modal `.decor-a`
   - `72x79 -> 78x79`
   - `left:10` unchanged
   - `top:calc(env(safe-area-inset-top) + 3px)` unchanged

Verified commit diff scope:
- exactly 1 changed file
- exactly the 3 dimension lines above
- no QA/test files changed
- no phone-landscape geometry changed
- no `.decor-b` / `.decor-c` changes
- no modal density/chrome changes
- no recipe/business/quantity/exclusion/replacement/Matrix/PIN/import-export changes

## WHY THIS SHOULD SATISFY BOTH CONTRACTS
- phone portrait `78x76` exactly meets P0-A and ends around the reserved rail boundary, leaving the modal title below it with >2px expected separation.
- iPad portrait `78x77` meets P0-A with large vertical clearance inside the 114px top rail.
- iPad landscape `78x79` meets P0-A with large vertical clearance inside the 122px top rail.
- phone landscape remains `80x87`, already manually accepted and P0-A compliant.

IMPORTANT: this is a geometry fix, not a test relaxation. P0-A and the direct title/subtitle non-intersection gate both remain unchanged.

## PREVIOUS RECOVERY / MANUAL EVIDENCE — DO NOT REDO
Durable recovery chain:
- `cda4189dd99776bf64d78c0e771c64062f8eb12c` — emergency post-timeout recovery checkpoint.
- `9bcd7f91c3411beef19947e804e0d40dc45d7ac0` — recovered final pre-fix automation result.
- `6252b538bc918723d1b6c72eb7e3a1c136b94728` — local/live evidence equivalence.
- `ecc061adf0ed9545718a91f3145c3626a16dd9e7` — manual visual obstruction checkpoint.
- `b519655358488e8d555d710ca718578c8d96fcae` — modal scale-vs-safe-zone conflict checkpoint.
- `46d53d9c870fa978b7e7237cd293127c84dfab81` — scoped safe-zone fix checkpoint before Actions.
- `35d9fc39552f9819c86ba26e5eccde0154b2b9d0` — one-shot running-Actions status checkpoint.
- `f7db56cef450c3f2a539c0149058b2c072172266` — exact P0-A failure checkpoint.
- `1fb4512f942500e55b0b26aeffebe73cef2f6252` — feasible geometry checkpoint.

Pre-fix product head `3802e2d2bfcb425b2533acf9a6b960cbf2b992a4` had full automation PASS, but manual artifact review found modal top-left character obstruction in phone portrait, iPad portrait, and iPad landscape. Phone landscape modal, all page states, and UAT-009 density passed.

## VERIFIED BASELINE — DO NOT REOPEN
- V4 Chunk 1 `UAT-001/002/003` — VERIFIED COMPLETE; checkpoint `3eb47a81fa1bd84d2ebf8942e694deeaea333ef5`.
- V4 Chunk 2 `UAT-004/005` + landscape UAT-010 — VERIFIED COMPLETE; checkpoint `8eefd4142a4d2d27dca7dcf8e8ce175238b335e8`.
- V4 Chunk 3 `UAT-006/007` — VERIFIED COMPLETE; checkpoint `92aef5661454ea21580328df96cd3428838a43d5`.
- approved production character binaries remain locked.

## LOCKED INVARIANTS
- no recipe/business/quantity/exclusion/replacement/Matrix/PIN/import-export changes.
- no character binary/source remapping.
- preserve all page-state geometry that passed manual review.
- preserve phone-landscape modal geometry.
- preserve modal `.decor-b` / `.decor-c` and UAT-009 density.
- preserve P0-A story-detail floor and Chunk 4 title/subtitle safe-zone gate.
- preserve Chunk 1/2/3 and existing P0/layering/sharpness/tap-safety gates.

## DO NOT REPEAT
- do not re-read/re-analyze failed run `36058265001`.
- do not redo feasible-geometry derivation.
- do not reapply commit `c0cf1314…`.
- do not relax P0-A or the safe-zone gate.
- do not restore old oversized modal `.decor-a` values (`92x101`, `128x141`, `142x156`).
- do not enter a long polling loop.

## ACTIONS STATUS
- **NOT CHECKED YET for `c0cf1314…` in this work chunk by design.**
- This checkpoint is the required durable boundary before external verification.

## EXACT NEXT ACTION
On the next continuation:
1. Fresh-read current `main` and this handoff; current GitHub wins.
2. Perform **one bounded Actions status read** for verification triggered by code commit `c0cf1314e3e50504d2fb07d17bad30cfae664ebc` (or the latest relevant code head if GitHub advanced concurrently).
3. If UI QA / Pages are still running, persist run IDs/status and STOP — no polling loop.
4. If UI QA failed, read only the first failed required step/log, persist exact evidence, then STOP before code edits.
5. If UI QA + Pages completed/success, persist final automation result/artifact metadata immediately. In a separate small chunk, inspect only the new Chunk 4 modal evidence for phone portrait, iPad portrait, and iPad landscape; verify local/live equivalence first so live copies need not be visually re-reviewed when byte-identical.

## FINAL COMPLETION CONDITION
Chunk 4 is NOT complete. It becomes VERIFIED COMPLETE only after:
- P0-A and all existing regression gates pass after `c0cf1314…`;
- Chunk 4 title/subtitle safe-zone gate passes local + deployed;
- local/deployed evidence consistency is verified;
- manual review confirms no title/subtitle obstruction in phone portrait, iPad portrait, and iPad landscape modal states;
- UAT-008 / UAT-009 / final UAT-010 statuses are persisted.

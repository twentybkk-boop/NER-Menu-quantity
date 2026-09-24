# CURRENT HANDOFF — NER Menu Quantity

> EMERGENCY CRASH-SAFE RECOVERY — SAVE FIRST, ANALYZE SECOND.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json`. Current GitHub state wins if stale.

## CURRENT OBJECTIVE
Finish V3 Session 2B.2 exact high-resolution character overlay recovery without changing verified layout/business logic; then run existing sharpness/UI QA and inspect `31-*sharpness-v2` screenshots.

## VERIFIED BASELINE — DO NOT REDO
- V2 P0-A/B/C/D VERIFIED; V3 Session 1 VERIFIED; Session 2A DONE; Session 2B.1 VERIFIED.
- Exact top Git object VERIFIED present: `990c6b3523f79a483f41f17032f03f880f97f461`.
- Exact bottom Git object VERIFIED present: `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`.
- Canonical right local file `/mnt/data/ner-menu-repair/right-q70-a60.webp`: 51,376 bytes; SHA256 `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed`; base64 len 68,504; final binary Git blob target `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
- Production asset paths remain untouched.

## FAILURE ROOT CAUSE LOCALIZED
Failed final assembler run `36032106873`, job `107743133786`:
- base64 length `68504` PASS
- decode PASS
- decoded size `51376` PASS
- actual SHA256 `f2f715dc111e302ea6dd612df1e8a475a14ff33706bfc5c48f0fa3143583182c`
- expected `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed`
- failed at SHA256 gate; final Git-blob gate not reached.

Fresh one-pass canonical range comparison proved exactly ONE staged mismatch:
- `right-01.b64` current blob `c4a33fd7e0ebf46121c8a2c7a7db397364b0be26`
- canonical `[6000:18000]` target blob `d7ea4dac7f9d38b0e0d80a1dd306f3d6b9549df9`
- the other seven staging files match current canonical expected blobs exactly.

## RIGHT-01 REPAIR — VERIFIED PROGRESS
Repair branch: `repair/v3-2b2-exact-blobs-20260924`.

To avoid another large-string mutation, canonical `[6000:18000]` is being rebuilt from two fresh 6,000-char subchunks.

### `right-01a-fresh.b64` — VERIFIED EXACT
- canonical local range: `[6000:12000]`
- length: 6,000 chars
- deterministic expected Git text-blob SHA: `e39624890160330617bd4f28aa005fc9d91e9b4d`
- repair commit: `014495378ee667195aad18d1471ff667bc139a63`
- GitHub file SHA: `e39624890160330617bd4f28aa005fc9d91e9b4d`
- STATUS: VERIFIED EXACT; MUST NOT be rewritten.

Fresh second-half expected value already computed from the SAME current canonical local-file read:
- `right-01b-fresh.b64` canonical `[12000:18000]`
- length: 6,000 chars
- expected Git text-blob SHA: `4c9767b0898fea0c847306c02863f57e92d24342`
- not yet created/verified at this checkpoint.

## FRESH CANONICAL EIGHT-RANGE EXPECTED BLOBS
- `right-00` → `4cfbab61acc0c0e6489b51da0bb423c2da1d5e50`
- corrected `right-01` target → `d7ea4dac7f9d38b0e0d80a1dd306f3d6b9549df9`
- `right-02` → `010d7aedd8d7681240b1e6d555819065fab9ac33`
- `right-03` → `654a08614380f215c9b3c785bf6945add55b897f`
- `right-04a` → `0699b88e134d2ae675e7dee3a46d829eff79208e`
- `right-04b` → `1de2d4138e0ac4ba68f11a26329f15f8dcf6533a`
- `right-04c` → `41bd3338b623908f19399f4d4dac59dcf832903f`
- `right-04d` → `87d79ed174e11938becb04788693164198f5e632`

## DO NOT REPEAT / REJECTED
- Do not redo repo-wide/source/Library/V2/Session1/2A/2B.1/layout/orientation/calculator/P0 investigations or redraw/reconstruction.
- Do not alter the seven already matching staging files.
- Do not rewrite `right-01a-fresh.b64`.
- Do not rerun final-right workflow until corrected `right-01.b64` is assembled from fresh halves, verified to `d7ea4dac...`, checkpointed, and all eight staged blobs revalidated.
- Do not touch production paths before final right binary target `a4d051c5...` is VERIFIED durable.

## OPEN BLOCKERS
1. Create and verify fresh `right-01b-fresh.b64` `[12000:18000]` → expected `4c9767b0898fea0c847306c02863f57e92d24342`; checkpoint.
2. Assemble `01a+01b` into corrected `right-01.b64`, require len 12,000 and blob `d7ea4dac7f9d38b0e0d80a1dd306f3d6b9549df9`; checkpoint.
3. Revalidate all eight staged blobs against the fresh canonical list; then rerun/fresh-trigger final assembler once.
4. Verify final binary Git blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`; checkpoint.
5. Only then: production mapping → cleanup → QA/manual acceptance.

## EXACT NEXT RECOVERY ACTION
After confirming this checkpoint is durable, create ONLY `repair-staging/right/right-01b-fresh.b64` from current canonical local `base64(right)[12000:18000]`, expected text-blob SHA `4c9767b0898fea0c847306c02863f57e92d24342`. Verify GitHub file SHA exactly matches, then immediately persist before assembling or editing `right-01.b64`.

# CURRENT HANDOFF — NER Menu Quantity

> EMERGENCY CRASH-SAFE RECOVERY — SAVE FIRST, ANALYZE SECOND.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json`. Current GitHub state wins if stale.

## CURRENT OBJECTIVE
Finish V3 Session 2B.2 exact high-resolution character overlay recovery without changing verified layout/business logic; then run existing sharpness/UI QA and inspect `31-*sharpness-v2` screenshots.

## VERIFIED BASELINE — DO NOT REDO
- V2 P0-A/B/C/D VERIFIED; V3 Session 1 VERIFIED; Session 2A DONE; Session 2B.1 VERIFIED.
- Exact top Git object VERIFIED present: `990c6b3523f79a483f41f17032f03f880f97f461`.
- Exact bottom Git object VERIFIED present: `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`.
- Canonical right local file: 51,376 bytes; SHA256 `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed`; base64 68,504 chars; final binary Git target `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
- Production paths remain untouched.

## FAILURE ROOT CAUSE — LOCALIZED
Failed final assembler run `36032106873` decoded 51,376 bytes but produced SHA256 `f2f715dc111e302ea6dd612df1e8a475a14ff33706bfc5c48f0fa3143583182c` instead of canonical `d94dffb...`.
Fresh one-pass range comparison proved the only mismatching staged file was:
- stale `right-01.b64` blob `c4a33fd7e0ebf46121c8a2c7a7db397364b0be26`
- canonical `[6000:18000]` target blob `d7ea4dac7f9d38b0e0d80a1dd306f3d6b9549df9`
All other seven staged ranges match fresh canonical expected values.

## RIGHT-01 FRESH SUBCHUNKS — BOTH VERIFIED EXACT
Repair branch: `repair/v3-2b2-exact-blobs-20260924`.

1. `repair-staging/right/right-01a-fresh.b64`
   - canonical range `[6000:12000]`
   - 6,000 chars
   - expected/file blob `e39624890160330617bd4f28aa005fc9d91e9b4d`
   - commit `014495378ee667195aad18d1471ff667bc139a63`
   - STATUS VERIFIED EXACT.
2. `repair-staging/right/right-01b-fresh.b64`
   - canonical range `[12000:18000]`
   - 6,000 chars
   - expected/file blob `4c9767b0898fea0c847306c02863f57e92d24342`
   - commit `dbcf5caa6c9c227f3dbd948d189b89b10008b86f`
   - STATUS VERIFIED EXACT.

Desired corrected combined `right-01.b64`:
- length `12000`
- deterministic canonical text-blob target `d7ea4dac7f9d38b0e0d80a1dd306f3d6b9549df9`.
- Corrected output has NOT yet been independently inspected at this checkpoint.

## RIGHT-01 REPAIR WORKFLOW — CREATED, VERIFIED
Temporary repair-only workflow:
- path `.github/workflows/repair-right-01-fresh.yml`
- creation commit `16441f9888ff36b10021b3dd082efa5aed15ee0e`
- trigger path `repair-staging/right/RUN_RIGHT01_FRESH` on repair branch only
- commit verification: changed ONLY `.github/workflows/repair-right-01-fresh.yml`
- workflow concatenates ONLY `right-01a-fresh.b64 + right-01b-fresh.b64`
- requires assembled length exactly `12000`
- requires `git hash-object` exactly `d7ea4dac7f9d38b0e0d80a1dd306f3d6b9549df9`
- only after those gates pass, replaces/commits ONLY `repair-staging/right/right-01.b64`

## RIGHT-01 REPAIR TRIGGER — DURABLE; ACTIONS RUN VERIFIED SUCCESS
- trigger file `repair-staging/right/RUN_RIGHT01_FRESH`
- deterministic marker `run-right01-fresh-v1`
- trigger blob `ced56538cd6d9d7c712c49dbc8914c66d124af7c`
- trigger commit `557181b4428905750c5bd13011bddc0ca6fb10a2`
- commit changed ONLY `repair-staging/right/RUN_RIGHT01_FRESH`
- Actions run for workflow `Repair right-01 from fresh halves`:
  - run ID `36033565588`
  - head SHA `557181b4428905750c5bd13011bddc0ca6fb10a2`
  - event `push`
  - status `completed`
  - conclusion `success`
- Corrected `right-01.b64` output has NOT yet been independently inspected at this checkpoint.

## FRESH CANONICAL EIGHT-RANGE TARGETS
- `right-00` `4cfbab61acc0c0e6489b51da0bb423c2da1d5e50`
- corrected `right-01` `d7ea4dac7f9d38b0e0d80a1dd306f3d6b9549df9`
- `right-02` `010d7aedd8d7681240b1e6d555819065fab9ac33`
- `right-03` `654a08614380f215c9b3c785bf6945add55b897f`
- `right-04a` `0699b88e134d2ae675e7dee3a46d829eff79208e`
- `right-04b` `1de2d4138e0ac4ba68f11a26329f15f8dcf6533a`
- `right-04c` `41bd3338b623908f19399f4d4dac59dcf832903f`
- `right-04d` `87d79ed174e11938becb04788693164198f5e632`

## DO NOT REPEAT / REJECTED
- Do not redo repo-wide/source/Library/V2/Session1/2A/2B.1/layout/orientation/calculator/P0 investigations or redraw/reconstruction.
- Do not alter the seven already matching staged ranges.
- Do not rewrite either fresh `right-01a-fresh` or `right-01b-fresh`.
- Do not recreate or rewrite `.github/workflows/repair-right-01-fresh.yml`.
- Do not recreate or rewrite `RUN_RIGHT01_FRESH` unless current GitHub source of truth explicitly requires it.
- Do not re-inspect/re-trigger run `36033565588`; its status/conclusion is checkpointed as completed/success.
- Do not rerun final-right workflow before corrected `right-01.b64` itself is independently verified and checkpointed.
- Do not touch production paths before final right binary target is VERIFIED durable.

## OPEN BLOCKERS
1. Independently verify corrected `right-01.b64` length 12,000 and blob `d7ea4dac7f9d38b0e0d80a1dd306f3d6b9549df9`; checkpoint immediately.
2. Revalidate all eight staged range blobs against fresh canonical targets; checkpoint.
3. Trigger final-right assembler once with a new deterministic trigger change; verify final binary Git blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`; checkpoint.
4. Only then: production mapping → cleanup → QA/manual acceptance.

## EXACT NEXT RECOVERY ACTION
After confirming this checkpoint is durable, inspect ONLY `repair-staging/right/right-01.b64` on repair branch. Require length exactly `12000` and Git blob SHA exactly `d7ea4dac7f9d38b0e0d80a1dd306f3d6b9549df9`. Immediately persist that verification checkpoint before revalidating any other staged range or rerunning any workflow. Do not make any other write in that work unit.

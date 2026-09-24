# CURRENT HANDOFF — NER Menu Quantity

> EMERGENCY CRASH-SAFE RECOVERY CHECKPOINT — SAVE FIRST, ANALYZE SECOND.
> Source of truth: current GitHub `main` + actual code + `recipe_master.json`; current `main` wins if any status below becomes stale.

## CURRENT OBJECTIVE
Finish V3 Session 2B.2 by restoring the three exact browser-decodable approved high-resolution character overlays without changing verified layout/business logic; then run existing sharpness/UI QA and manually inspect `31-*sharpness-v2` screenshots.

## LATEST VERIFIED STATE
- V2 P0-A/B/C/D VERIFIED; V3 Session 1 VERIFIED; Session 2A DONE; Session 2B.1 VERIFIED — do not redo.
- Exact top Git object VERIFIED present: `990c6b3523f79a483f41f17032f03f880f97f461`.
- Exact bottom Git object VERIFIED present: `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`.
- Exact right local candidate `right-q70-a60.webp` VERIFIED locally: 51,376 bytes, SHA256 `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed`, deterministic final Git blob target `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
- No production asset path has been changed by the exact-target recovery flow.

## RIGHT STAGING — VERIFIED PREFIX
Repair branch: `repair/v3-2b2-exact-blobs-20260924`.
- `right-00.b64`: 6,000 chars, exact blob `4cfbab61acc0c0e6489b51da0bb423c2da1d5e50`.
- `right-01.b64`: 12,000 chars, exact blob `c4a33fd7e0ebf46121c8a2c7a7db397364b0be26`.
- `right-02.b64`: 12,000 chars, exact blob `010d7aedd8d7681240b1e6d555819065fab9ac33`.
- Verified exact prefix = base64 chars `0–29,999` (30,000 chars total).

## RIGHT CHUNK 03 — DIRECT PATH STILL REJECTED
- Initial concurrent `right-03.b64`: blob `86f52cd5f36c0b84fde7009287937064d41ee4b7` — REJECTED.
- Direct correction attempt at repair commit `797214b33cc272a5957036dd22504b6f85ae8b54` returned blob `a41faed84e5fb310604fb690db9ba9a6557d65b1` — REJECTED.
- Exact desired local segment offsets `30,000–47,999`: 18,000 chars, target text-blob SHA `654a08614380f215c9b3c785bf6945add55b897f`.

## RIGHT CHUNK 03 SUBCHUNKS — VERIFIED PROGRESS
Selected method: split exact desired 18,000-char segment into three repair-only 6,000-char files, verify each, then concatenate/hash-gate on GitHub runner.

- `repair-staging/right/right-03a.b64`
  - exact local source: `base64(right)[30000:36000]`
  - length: 6,000 chars
  - expected deterministic Git blob SHA: `e864f9da6f68159a5964ecb8b9d8f941a9503627`
  - created at repair commit `cd0671a622a6d6abda5c47f9c4829f1277962790`
  - GitHub commit file SHA: `e864f9da6f68159a5964ecb8b9d8f941a9503627`
  - STATUS: VERIFIED EXACT. MUST NOT be rewritten.

`right-03b` and `right-03c` have not yet been created/verified at this checkpoint.

## VERIFIED FINDINGS
- Known blocker remains binary browser decode/load, not layout/geometry/business logic.
- Top and bottom exact objects are durable in Git object storage.
- Right exact local bytes are verified; remaining right work is transport only.
- Right staging offsets `0–29,999` are exact.
- `right-03a` is exact and durable.
- Production paths remain untouched.

## DO NOT REPEAT / REJECTED
- Do not redo prior V2/Session1/2A/2B.1, layout/orientation/calculator/P0, source recovery, or character reconstruction.
- Do not rewrite `right-00`/`right-01`/`right-02` or `right-03a`.
- Do not reuse right blobs `86f52cd5...`, `a41faed8...`, or failed final right blob `06e26ae2...`.
- Do not create `right-03c`, stage chars `48,000+`, assemble final right payload, or touch production paths before `right-03b` is verified and checkpointed.

## OPEN BLOCKERS
1. Produce and verify `right-03b` exact local offsets `36,000–41,999`.
2. Persist before producing `right-03c`.
3. After all three subchunks are exact, assemble corrected `right-03.b64` on GitHub runner and require blob `654a08614380f215c9b3c785bf6945add55b897f`.
4. Stage right chars `48,000–68,503`, assemble/decode full right payload, verify final target `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
5. Only then: production mapping → cleanup → QA/manual acceptance.

## EXACT NEXT RECOVERY ACTION
Confirm this checkpoint is durable. Then RIGHT ONLY: regenerate exact local subchunk `base64(right)[36000:42000]` (6,000 chars), compute deterministic Git blob SHA, create NEW repair-only `repair-staging/right/right-03b.b64`, verify GitHub-reported file SHA exactly matches local expected, and immediately persist a new checkpoint. Do not create `03c` yet.

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

## RIGHT CHUNK 03 — FAILED DIRECT REPLACEMENTS
- Initial concurrent `right-03.b64`: 18,000 chars, blob `86f52cd5f36c0b84fde7009287937064d41ee4b7` — REJECTED.
- Exact desired local segment offsets `30,000–47,999`: 18,000 chars, deterministic Git blob `654a08614380f215c9b3c785bf6945add55b897f`.
- Direct correction attempt committed only `right-03.b64` at repair commit `797214b33cc272a5957036dd22504b6f85ae8b54`, but returned blob `a41faed84e5fb310604fb690db9ba9a6557d65b1` — REJECTED.
- Production remained untouched.

## TRANSPORT METHOD DECISION — DURABLE
Minimal capability check found no direct connector action that accepts a local file/path for a byte-preserving GitHub contents write. Repeating a single 18,000-character model-supplied string is therefore not accepted as reliable.

Selected crash-safe method for `right-03` ONLY:
1. Regenerate exact local offsets `30,000–47,999` from `/mnt/data/ner-menu-repair/right-q70-a60.webp`.
2. Split that exact 18,000-character segment into three 6,000-character temporary subchunks on the repair branch.
3. For EACH subchunk: create → verify exact size/blob SHA → immediately checkpoint before creating the next subchunk.
4. After all three subchunks are exact, create a temporary repair-only GitHub Actions workflow that concatenates the three files on the runner, verifies `git hash-object` of assembled `right-03.b64` equals `654a08614380f215c9b3c785bf6945add55b897f`, and only then commits the corrected `right-03.b64` to the repair branch.
5. Verify repair-branch tree blob for `right-03.b64` equals the target, then checkpoint before any chars `48,000+`.
6. Temporary subchunks/workflow are cleanup-only artifacts and must never be mapped to production.

## VERIFIED FINDINGS
- Known blocker remains binary browser decode/load, not layout/geometry/business logic.
- Top and bottom exact objects are durable in Git object storage.
- Right exact local bytes are verified; remaining right work is transport only.
- Right staging offsets `0–29,999` are exact.
- Current `right-03.b64` remains mismatched and must not be assembled.

## DO NOT REPEAT / REJECTED
- Do not redo prior V2/Session1/2A/2B.1, layout/orientation/calculator/P0, source recovery, or character reconstruction.
- Do not rewrite `right-00`/`right-01`/`right-02`.
- Do not reuse right blobs `86f52cd5...` or `a41faed8...`, or failed final right blob `06e26ae2...`.
- Do not stage chars `48,000+`, assemble final right payload, or touch production paths until `right-03` is exact and durably checkpointed.

## OPEN BLOCKERS
1. Produce and verify three exact 6,000-char `right-03` subchunks.
2. Assemble corrected `right-03.b64` on GitHub runner and require blob `654a08614380f215c9b3c785bf6945add55b897f`.
3. Stage right chars `48,000–68,503`, assemble/decode full right payload, and verify final target `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
4. Only after all three exact asset blobs exist: production mapping → cleanup → QA/manual acceptance.

## EXACT NEXT RECOVERY ACTION
Confirm this checkpoint is durable. Then RIGHT ONLY: regenerate exact local subchunk `base64(right)[30000:36000]` (6,000 chars), compute its deterministic Git blob SHA, create it at a NEW temporary repair-only path such as `repair-staging/right/right-03a.b64`, verify GitHub-reported/tree size and blob SHA exactly match local, and immediately persist a new checkpoint. Do not create `03b` yet.

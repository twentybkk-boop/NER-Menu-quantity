# CURRENT HANDOFF — NER Menu Quantity

> EMERGENCY CRASH-SAFE RECOVERY CHECKPOINT — SAVE FIRST, ANALYZE SECOND.
> Source of truth: current GitHub `main` + actual code + `recipe_master.json`; current `main` wins if any status below becomes stale.

## CURRENT OBJECTIVE
Finish V3 Session 2B.2: restore the three exact browser-decodable approved high-resolution character overlays without changing verified layout/business logic; then run existing sharpness/UI QA and inspect `31-*sharpness-v2` screenshots.

## VERIFIED BASELINE — DO NOT REDO
- V2 P0-A/B/C/D VERIFIED; V3 Session 1 VERIFIED; Session 2A DONE; Session 2B.1 VERIFIED.
- Exact top Git object VERIFIED present: `990c6b3523f79a483f41f17032f03f880f97f461`.
- Exact bottom Git object VERIFIED present: `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`.
- Exact right local candidate `right-q70-a60.webp`: 51,376 bytes, SHA256 `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed`, final target Git blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
- Production asset paths remain untouched.

## RIGHT STAGING — VERIFIED PREFIX
Repair branch: `repair/v3-2b2-exact-blobs-20260924`.
- `right-00.b64`: exact blob `4cfbab61acc0c0e6489b51da0bb423c2da1d5e50`.
- `right-01.b64`: exact blob `c4a33fd7e0ebf46121c8a2c7a7db397364b0be26`.
- `right-02.b64`: exact blob `010d7aedd8d7681240b1e6d555819065fab9ac33`.
- Exact staged prefix = base64 chars `0–29,999`.

## RIGHT-03 DIRECT FILE — REJECTED
Desired local segment `[30000:48000]`: 18,000 chars; target text blob `654a08614380f215c9b3c785bf6945add55b897f`.
- Initial `right-03.b64` blob `86f52cd5f36c0b84fde7009287937064d41ee4b7` — REJECTED.
- Direct correction repair commit `797214b33cc272a5957036dd22504b6f85ae8b54` produced blob `a41faed84e5fb310604fb690db9ba9a6557d65b1` — REJECTED.

## RIGHT-03 SUBCHUNKS — ALL VERIFIED EXACT
Crash-safe split transport is complete for the desired 18,000-char segment:
1. `right-03a.b64`
   - local `[30000:36000]`, 6,000 chars
   - blob `e864f9da6f68159a5964ecb8b9d8f941a9503627`
   - repair commit `cd0671a622a6d6abda5c47f9c4829f1277962790`
   - VERIFIED EXACT.
2. `right-03b.b64`
   - local `[36000:42000]`, 6,000 chars
   - blob `8e59014cc5dd7da95de93d6c5a972f48f936aac9`
   - repair commit `50d32c293060797d9641d8721681ff728bb8442e`
   - VERIFIED EXACT.
3. `right-03c.b64`
   - local `[42000:48000]`, 6,000 chars
   - blob `978227ee0823f8724aea71fdbd310079d90dfaf8`
   - repair commit `2dc8f3865d8f7d8822acd975473c3583bfb97a72`
   - GitHub commit file SHA exactly `978227ee0823f8724aea71fdbd310079d90dfaf8`
   - VERIFIED EXACT.

No later right payload chars have been staged in this recovery flow yet.

## VERIFIED FINDINGS
- Top/bottom exact objects are durable in Git.
- Right exact local bytes are verified; remaining right work is transport only.
- Right prefix `0–29,999` is exact.
- All three `right-03` subchunks are exact and durable.
- Production remains untouched.

## DO NOT REPEAT / REJECTED
- No repo-wide/source/Library audits; no prior V2/Session1/2A/2B.1, layout/orientation/calculator/P0 work; no redraw/reconstruction.
- Do not rewrite `right-00`, `right-01`, `right-02`, `right-03a`, `right-03b`, or `right-03c`.
- Do not reuse rejected right blobs `86f52cd5...`, `a41faed8...`, or failed final blob `06e26ae2...`.
- Do not stage chars `48,000+`, assemble/decode full right payload, or touch production paths before corrected `right-03.b64` itself is assembled, hash-verified, and checkpointed.

## OPEN BLOCKERS
1. Concatenate exact `03a+03b+03c` into `right-03.b64` on GitHub runner; require `git hash-object` = `654a08614380f215c9b3c785bf6945add55b897f`; commit only on success.
2. Verify repair-branch tree `right-03.b64` blob equals target and checkpoint.
3. Stage right chars `48,000–68,503`, assemble/decode full right payload, verify final target `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
4. Only after all three asset target blobs exist: production mapping → repair-artifact cleanup → QA/manual acceptance.

## EXACT NEXT RECOVERY ACTION
Confirm this checkpoint is durable. Then create ONLY a temporary repair-branch workflow for assembling `right-03.b64` from the already-verified `right-03a/03b/03c`. Workflow must: concatenate without newlines, verify length 18,000 and `git hash-object` exactly `654a08614380f215c9b3c785bf6945add55b897f`, fail without commit on mismatch, and commit only corrected `right-03.b64` on success. Persist the workflow-creation state before triggering it.

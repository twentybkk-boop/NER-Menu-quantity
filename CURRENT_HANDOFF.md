# CURRENT HANDOFF — NER Menu Quantity

> EMERGENCY CRASH-SAFE RECOVERY CHECKPOINT — SAVE FIRST, ANALYZE SECOND.
> Source of truth: current GitHub `main` + actual code + `recipe_master.json`; current `main` wins if stale.

## SAVE-NOW DELTA — RIGHT-03 EXACTLY VERIFIED
- User required immediate persistence before any further investigation.
- Workflow run `36030835252` completed successfully on trigger commit `7b0a7e74decdcdbb38d92c0a3922fe66753a7dd5`.
- Independent repair-branch inspection is now complete:
  - repair branch head/assembler commit: `9f3aaf5125094fe85afd909bd76ef23f6e39112a`
  - commit message: `Assemble exact right chunk 03`
  - parent: `7b0a7e74decdcdbb38d92c0a3922fe66753a7dd5`
  - changed file: ONLY `repair-staging/right/right-03.b64`
  - resulting file/blob SHA: `654a08614380f215c9b3c785bf6945add55b897f`
  - this exactly equals the deterministic local target for `base64(right)[30000:48000]`.
- `right-03.b64` is therefore VERIFIED EXACT and MUST NOT be rewritten.
- Exact right base64 staging is now durably verified for chars `0–47,999` = 48,000 chars.
- Remaining exact right payload is chars `48,000–68,503` = 20,504 chars.
- No production asset path was changed.

### EXACT NEXT ACTION AFTER THIS CHECKPOINT IS CONFIRMED DURABLE
**RIGHT ONLY — one small chunk.** Regenerate exact local `base64(right)[48000:54000]` (6,000 chars), compute deterministic Git blob SHA, create NEW repair-only `repair-staging/right/right-04a.b64`, verify GitHub file SHA exactly matches local expected, and immediately persist a new checkpoint. Do not create the next chunk yet.

## CURRENT OBJECTIVE
Finish V3 Session 2B.2: restore the three exact browser-decodable approved high-resolution character overlays without changing verified layout/business logic; then run existing sharpness/UI QA and inspect `31-*sharpness-v2` screenshots.

## VERIFIED BASELINE — DO NOT REDO
- V2 P0-A/B/C/D VERIFIED; V3 Session 1 VERIFIED; Session 2A DONE; Session 2B.1 VERIFIED.
- Exact top Git object VERIFIED present: `990c6b3523f79a483f41f17032f03f880f97f461`.
- Exact bottom Git object VERIFIED present: `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`.
- Exact right local candidate: 51,376 bytes, SHA256 `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed`, final target Git blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
- Production asset paths remain untouched.

## RIGHT STAGING — VERIFIED THROUGH OFFSET 48,000
Repair branch: `repair/v3-2b2-exact-blobs-20260924`.
- `right-00/01/02` verify exact chars `0–29,999`.
- `right-03a/03b/03c` are exact repair-only source chunks.
- assembled `repair-staging/right/right-03.b64` verifies exact chars `30,000–47,999` and blob `654a08614380f215c9b3c785bf6945add55b897f`.
- Direct rejected `right-03` blobs `86f52cd5...` and `a41faed8...` must not be reused.

## TEMPORARY RIGHT-03 ASSEMBLER — COMPLETED
- workflow: `.github/workflows/repair-right-03.yml`
- creation commit: `d9f9c37d6956cd362fda686289c302bdad76eb3f`
- trigger commit: `7b0a7e74decdcdbb38d92c0a3922fe66753a7dd5`
- run ID: `36030835252`, status `completed`, conclusion `success`, attempt `1`.
- output commit independently verified: `9f3aaf5125094fe85afd909bd76ef23f6e39112a`.
- Do NOT trigger/re-run this assembler again.

## VERIFIED FINDINGS
- Top and bottom exact binary objects are already durable in Git object storage.
- Right exact local bytes are verified; remaining right work is transport only.
- Right base64 chars `0–47,999` are exact and durable in repair staging.
- Production remains untouched.

## UNRESOLVED
1. Stage right chars `48,000–68,503` in small recoverable chunks with a checkpoint after each.
2. Assemble full 68,504-char exact right base64, decode to exact 51,376-byte WebP, verify SHA256 `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed` and final Git blob target `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
3. Only after right exact object is durable: production mapping of top/bottom/right exact blobs.
4. Cleanup repair-only staging/workflow/trigger artifacts; then run post-repair QA and manual screenshot acceptance.

## DO NOT REPEAT / REJECTED
- No repo-wide/source/Library audits or prior completed V2/Session1/2A/2B.1/layout/orientation/calculator/P0 work.
- Do not rewrite verified right ranges `0–47,999` or rerun workflow `36030835252`.
- Do not reuse rejected right blobs `86f52cd5...`, `a41faed8...`, or failed final blob `06e26ae2...`.
- Do not touch production paths before final right target `a4d051c5...` is VERIFIED present.

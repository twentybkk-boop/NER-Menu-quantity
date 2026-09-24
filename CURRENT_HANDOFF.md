# CURRENT HANDOFF — NER Menu Quantity

> EMERGENCY CRASH-SAFE RECOVERY — SAVE FIRST, ANALYZE SECOND.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json`. Current GitHub state wins if anything here becomes stale.

## CURRENT OBJECTIVE
Finish V3 Session 2B.2: restore the three exact browser-decodable approved high-resolution character overlays without changing verified layout/business logic; then run existing sharpness/UI QA and inspect `31-*sharpness-v2` screenshots.

## VERIFIED BASELINE — DO NOT REDO
- V2 P0-A/B/C/D: VERIFIED.
- V3 Session 1 layering/orientation/background: VERIFIED.
- V3 Session 2A root-cause audit: DONE.
- V3 Session 2B.1 sampling/compositing safety: VERIFIED.
- Known blocker is binary WebP browser decode/load, not layout/geometry/business logic.
- Exact top Git object VERIFIED present: `990c6b3523f79a483f41f17032f03f880f97f461`.
- Exact bottom Git object VERIFIED present: `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`.
- Exact right local candidate `right-q70-a60.webp`: 51,376 bytes, RIFF/WEBP, SHA256 `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed`, full base64 length 68,504 chars, final Git blob target `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
- Production asset paths remain untouched by exact-target recovery.

## RIGHT STAGING — VERIFIED THROUGH OFFSET 54,000
Repair branch: `repair/v3-2b2-exact-blobs-20260924`.

Verified exact ranges:
- `right-00/01/02`: base64 chars `0–29,999`.
- assembled `repair-staging/right/right-03.b64`: chars `30,000–47,999`, 18,000 chars, exact blob `654a08614380f215c9b3c785bf6945add55b897f`.
  - assembled by workflow run `36030835252`.
  - output commit `9f3aaf5125094fe85afd909bd76ef23f6e39112a` changed ONLY `right-03.b64`.
  - do NOT rerun temporary right-03 assembler.
- NEW verified chunk `repair-staging/right/right-04a.b64`:
  - local exact range `base64(right)[48000:54000]`
  - length 6,000 chars
  - deterministic local Git text-blob SHA `0699b88e134d2ae675e7dee3a46d829eff79208e`
  - repair commit `6a8854a11807000037f1c84b18a072cd8f6d8e6c`
  - GitHub commit file SHA `0699b88e134d2ae675e7dee3a46d829eff79208e`
  - STATUS: VERIFIED EXACT; MUST NOT be rewritten.

Therefore exact right base64 staging is now durably verified for chars `0–53,999` = 54,000 chars total.
Remaining exact right payload: chars `54,000–68,503` = 14,504 chars.

## REJECTED / DO NOT USE
- top non-target `812e704774c25a1c2387e03e48a3d1eb27b9e672`
- bottom non-target `65c0568c8b4895ead37932fa6c7f2814ec4c90a1`
- failed/truncated top `b728455af0996ff48b21e49e1fd2b3c05e5fb4ea`
- failed right final one-shot `06e26ae2448ecc5383a452760f6f21f58daea62e`
- rejected direct right-03 blobs `86f52cd5f36c0b84fde7009287937064d41ee4b7` and `a41faed84e5fb310604fb690db9ba9a6557d65b1`
- invalid orphan blobs `35c12cd9...`, `42c06cd2...`, `9af0dd1f...`

## DO NOT REPEAT
- No repo-wide/source/Library audits.
- No V2/Session1/2A/2B.1, layout/orientation/calculator/P0 investigations.
- No character redraw/reconstruction.
- Do not retransport top/bottom.
- Do not rewrite right staged ranges `0–53,999`, including `right-04a`.
- Do not rerun workflow `36030835252` or recreate its trigger.
- Do not touch production asset paths before final right target `a4d051c5...` is VERIFIED present.

## OPEN BLOCKERS
1. Stage remaining exact right base64 chars `54,000–68,503` in small recoverable chunks, checkpoint after each.
2. Assemble full 68,504-char exact right base64, decode exact 51,376-byte WebP, verify SHA256 `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed` and Git blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
3. Only after all three exact binary objects are durable: map top/bottom/right exact blobs to production asset paths in a clean production commit.
4. Cleanup repair-only staging/workflow/trigger artifacts.
5. Run post-repair QA and manual `31-*sharpness-v2` screenshot acceptance.

## EXACT NEXT RECOVERY ACTION
After confirming this checkpoint is durable, RIGHT ONLY: regenerate exact local `base64(right)[54000:60000]` (6,000 chars), compute deterministic Git text-blob SHA, create NEW repair-only `repair-staging/right/right-04b.b64`, verify GitHub file SHA exactly matches local expected, and immediately persist a new checkpoint. Do not create the next chunk in the same uncheckpointed work unit.

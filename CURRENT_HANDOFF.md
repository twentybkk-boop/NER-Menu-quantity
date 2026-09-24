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
- Exact right local candidate `right-q70-a60.webp`: 51,376 bytes, RIFF/WEBP, SHA256 `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed`, base64 length 68,504 chars, final Git blob target `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
- Production asset paths remain untouched.

## RIGHT STAGING — VERIFIED THROUGH OFFSET 66,000
Repair branch: `repair/v3-2b2-exact-blobs-20260924`.
- `right-00/01/02`: exact chars `0–29,999`.
- assembled `right-03.b64`: exact chars `30,000–47,999`, blob `654a08614380f215c9b3c785bf6945add55b897f`, output commit `9f3aaf5125094fe85afd909bd76ef23f6e39112a`, workflow run `36030835252` success. Do not rerun.
- `right-04a.b64`: exact `[48000:54000]`, blob `0699b88e134d2ae675e7dee3a46d829eff79208e`, commit `6a8854a11807000037f1c84b18a072cd8f6d8e6c`, VERIFIED.
- `right-04b.b64`: exact `[54000:60000]`, blob `1de2d4138e0ac4ba68f11a26329f15f8dcf6533a`, commit `76827d745d44c6292349ef7c77618aecd19a4639`, VERIFIED.
- NEW `right-04c.b64`: exact local `[60000:66000]`, 6,000 chars, deterministic local blob `41bd3338b623908f19399f4d4dac59dcf832903f`, repair commit `8da2973e5f3e1f60ead136dfcbc49d257beb8109`, GitHub file SHA exactly `41bd3338b623908f19399f4d4dac59dcf832903f`, VERIFIED EXACT; MUST NOT be rewritten.

Exact right base64 staging is now verified for chars `0–65,999` = 66,000 chars.
Remaining exact tail: chars `66,000–68,503` = 2,504 chars.

## REJECTED / DO NOT USE
- top non-target `812e704774c25a1c2387e03e48a3d1eb27b9e672`
- bottom non-target `65c0568c8b4895ead37932fa6c7f2814ec4c90a1`
- failed/truncated top `b728455af0996ff48b21e49e1fd2b3c05e5fb4ea`
- failed right one-shot `06e26ae2448ecc5383a452760f6f21f58daea62e`
- rejected direct right-03 blobs `86f52cd5f36c0b84fde7009287937064d41ee4b7` and `a41faed84e5fb310604fb690db9ba9a6557d65b1`
- invalid orphan blobs `35c12cd9...`, `42c06cd2...`, `9af0dd1f...`

## DO NOT REPEAT
- No repo-wide/source/Library audits; no completed V2/Session1/2A/2B.1/layout/orientation/calculator/P0 investigations; no character redraw/reconstruction.
- Do not retransport top/bottom.
- Do not rewrite right staged chars `0–65,999`.
- Do not rerun right-03 assembler workflow or recreate its trigger.
- Do not touch production asset paths before final right target `a4d051c5...` is VERIFIED present.

## OPEN BLOCKERS
1. Stage final exact right tail chars `66,000–68,503` and checkpoint.
2. Assemble full 68,504-char exact base64, decode exact 51,376-byte WebP, verify SHA256 `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed` and Git blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
3. Only after all three exact binary objects are durable: clean production mapping of top/bottom/right blobs.
4. Cleanup repair-only staging/workflow/trigger artifacts.
5. Run post-repair QA and manual `31-*sharpness-v2` screenshot acceptance.

## EXACT NEXT RECOVERY ACTION
After confirming this checkpoint is durable, RIGHT ONLY: regenerate exact local `base64(right)[66000:68504]` (2,504 chars), compute deterministic Git text-blob SHA, create NEW repair-only `repair-staging/right/right-04d.b64`, verify GitHub file SHA exactly matches local expected, and immediately persist a new checkpoint before any full-payload assembly.

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

## RIGHT STAGING — FULL 68,504-CHAR BASE64 VERIFIED EXACT
Repair branch: `repair/v3-2b2-exact-blobs-20260924`.
- `right-00/01/02`: exact chars `0–29,999`.
- assembled `right-03.b64`: exact chars `30,000–47,999`, blob `654a08614380f215c9b3c785bf6945add55b897f`, output commit `9f3aaf5125094fe85afd909bd76ef23f6e39112a`, workflow run `36030835252` success. Do not rerun.
- `right-04a.b64`: exact `[48000:54000]`, 6,000 chars, blob `0699b88e134d2ae675e7dee3a46d829eff79208e`, commit `6a8854a11807000037f1c84b18a072cd8f6d8e6c`, VERIFIED.
- `right-04b.b64`: exact `[54000:60000]`, 6,000 chars, blob `1de2d4138e0ac4ba68f11a26329f15f8dcf6533a`, commit `76827d745d44c6292349ef7c77618aecd19a4639`, VERIFIED.
- `right-04c.b64`: exact `[60000:66000]`, 6,000 chars, blob `41bd3338b623908f19399f4d4dac59dcf832903f`, commit `8da2973e5f3e1f60ead136dfcbc49d257beb8109`, VERIFIED.
- NEW `right-04d.b64`: exact local `[66000:68504]`, 2,504 chars, deterministic local blob `87d79ed174e11938becb04788693164198f5e632`, repair commit `dc52a6560415d974cffe9161978e42bee0af3283`, GitHub file SHA exactly `87d79ed174e11938becb04788693164198f5e632`, VERIFIED EXACT; MUST NOT be rewritten.

All right base64 ranges `0–68,503` are now durably staged and individually exact. No further source/image recovery or chunk staging is needed.

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
- Do not rewrite any right staged chunk/range; all 68,504 base64 chars are exact and durable.
- Do not rerun right-03 assembler workflow or recreate its trigger.
- Do not touch production asset paths before final right binary target `a4d051c5...` is VERIFIED present.

## OPEN BLOCKERS
1. Assemble staged exact base64 in order (`right-00 + right-01 + right-02 + right-03 + right-04a + right-04b + right-04c + right-04d`), require total length 68,504, decode to exact 51,376-byte WebP, require SHA256 `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed` and Git binary blob `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`, then checkpoint.
2. Only after all three exact binary objects are durable: clean production mapping of top/bottom/right blobs.
3. Cleanup repair-only staging/workflow/trigger artifacts.
4. Run post-repair QA and manual `31-*sharpness-v2` screenshot acceptance.

## EXACT NEXT RECOVERY ACTION
After confirming this checkpoint is durable, create ONLY a temporary repair-branch final-right assembler workflow/trigger. It must concatenate the eight already-verified base64 staging files in order with no inserted newlines; require base64 length exactly 68,504; decode to a temporary WebP; require decoded size 51,376; require SHA256 exactly `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed`; require `git hash-object` exactly `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`; and only then commit a repair-only binary proof file so the exact Git object becomes durable. Persist workflow creation before triggering it.

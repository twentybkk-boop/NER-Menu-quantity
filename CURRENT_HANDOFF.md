# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE RECOVERY CHECKPOINT — DO NOT RESTART.
> Source of truth: current GitHub `main` + actual code + `recipe_master.json`; current `main` wins if any status below becomes stale.

## CURRENT OBJECTIVE
Finish V3 Session 2B.2 by restoring browser-decodable high-resolution approved character overlays, preserving all verified production geometry/logic, then run the existing sharpness/UI QA and manually inspect `31-*sharpness-v2` screenshots before closing the session.

## LATEST VERIFIED CHECKPOINT
- V2 P0-A/B/C/D: VERIFIED — do not redo.
- V3 Session 1 layering/orientation/background: VERIFIED — do not redo.
- V3 Session 2A root-cause audit: DONE — do not redo.
- V3 Session 2B.1 sampling/compositing safety: VERIFIED — do not redo.
- Recovered approved source `image-gen-2(7).png`: VERIFIED as intended story-complete source.
- `d32ff236c227d804c60e807749b2f41b3c05bb94` applied recovered high-res assets + cache bust.
- UI QA run `36012464625`, job `107676382757`: all checks through orientation/layering PASS; only V3 high-res sharpness FAILED because browser could not load/decode `overlay-top-left-hires.webp` (`img.onerror`).
- Interrupted `tmp-binary-repair/*` staging was audited and fully removed; accidental `tmp.txt` was also removed and must not be restored.
- Durable recovery/checkpoint lineage includes `4cade999...`, `bb864091...`, and `586b081bea76aa45c13b0937bad6cdfe053c15e0`.

## EVIDENCE CHECKED
- Current GitHub `main` and current handoff.
- UI QA run/job above and `qa/character-sampling-v1-contract.mjs`.
- Current local verified candidate files:
  - top `top-q70-a8.webp`: 518×500 RGBA, 31,174 bytes, SHA256 `6d70ae5b226ff6b7f92b04853c702401da71e7d03ef9fbf94a8fd46bb01574ca`, deterministic Git blob SHA `990c6b3523f79a483f41f17032f03f880f97f461`.
  - bottom `bottom-q70-a60.webp`: 655×524 RGBA, 39,712 bytes, deterministic Git blob SHA `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`.
  - right `right-q70-a60.webp`: 556×851 RGBA, 51,376 bytes, SHA256 `d94dffb06bf229f01cbed71f87133a18c8b80decabdcd32577bb7a1ff66958ed`, deterministic Git blob SHA `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`.
- Visual inspection confirms required story content is present: top glasses/drink/gesture/speech bubble; bottom NO GLASSES/helmet/cat/table/speech bubble; right white backpack/clipboard+pen/food+chalkboard/speech bubble.

## VERIFIED FINDINGS
1. Layout/geometry/character presence/center frame/top composition/rhythm/layering are not the blocker; prior QA proved those paths PASS.
2. Concrete blocker is browser image decode/load for repaired high-res WebP payloads.
3. Production repair scope remains three binary assets only unless post-repair QA proves a new concrete failure.
4. Intended dimensions remain 518×500 / 655×524 / 556×851.
5. Previously created blob `812e704774c25a1c2387e03e48a3d1eb27b9e672` does not equal deterministic Git SHA `990c6b...` of the currently verified top candidate bytes; do NOT wire it into production.
6. Previously created blob `47c3d7c1a28a19ec0f5ac48c8501613263e8b86a` does not equal deterministic Git SHA `cf1f98...` of the currently verified bottom candidate bytes; do NOT wire it into production.
7. Expected right-candidate Git SHA `a4d051c52a4b0f5191ad2770c3eee416fa01aba4` is not currently present in the repo object database (fetch returned 404).

## HYPOTHESES REJECTED
- Do NOT treat this as geometry/layout regression.
- Do NOT redo V2 / Session 1 / Session 2A / Session 2B.1.
- Do NOT restore invalid orphan blobs `35c12cd9...`, `42c06cd2...`, `9af0dd1f...`.
- Do NOT use prior blank/transparent high-res replacements.
- Do NOT synthesize production characters from separate character/accessory assets.
- Do NOT wire `812e7047...` or `47c3d7c1...` into production.

## DECISIONS / ASSUMPTIONS
- Preserve production CSS geometry and business logic.
- Use only the verified local recovered 1:1 candidates and verify exact Git SHA before production wiring.
- Perform binary transport on a temporary branch so `main` remains clean and recoverable while bytes are assembled. Temporary staging history must NOT be fast-forwarded into `main`.
- After exact binary blobs exist, create a clean single commit whose parent is then-current `main` and whose tree changes exactly the three `assets/overlay-*-hires.webp` paths.
- Checkpoint exact verified blob SHAs before creating/moving the production commit.

## DO NOT REPEAT
- Repo-wide audit/source recovery.
- P0-A/P0-B/P0-D/orientation/calculator investigations.
- Character redraw/reconstruction.
- Re-audit of already-cleaned staging/tmp incidents.
- Dimension-only acceptance without browser decode and visual evidence.

## OPEN BLOCKERS
1. Exact verified candidate bytes are not yet confirmed as Git blobs `990c6b...`, `cf1f98...`, `a4d051...`.
2. No clean three-asset production repair commit exists yet.
3. Post-repair UI QA/sharpness has not passed yet.
4. Manual local/live `31-*sharpness-v2` visual acceptance remains open.

## STATE NOT PROMOTED FROM HIDDEN REASONING
No hidden-only conclusion is considered verified. State above is from visible tool results, local files/hashes, visual inspection, and GitHub source of truth.

## EXACT NEXT ACTION
Create a temporary repair branch from current `main`; transport/decode the three verified local WebPs there and verify resulting asset blob SHAs exactly equal `990c6b3523f79a483f41f17032f03f880f97f461`, `cf1f98efe9c9f67cb48e3bd80f512b0f9adece45`, and `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`. Persist those exact verified SHAs in this handoff BEFORE creating a clean production tree/commit on then-current `main` that changes only the three high-res WebP paths. Then run existing UI QA; inspect only concrete failures; on automated PASS manually inspect local/live `31-*sharpness-v2` screenshots before marking Session 2B.2 VERIFIED.

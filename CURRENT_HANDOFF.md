# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + persisted artifacts + latest user hands-on evidence.

## CURRENT WORK HEAD — UAT-013 EXACT STAGING READY; RETRIGGER REPAIR NEXT

Latest user result:
- UAT-011 cutout cleanup accepted; DO NOT REOPEN.
- only remaining defect is portrait background art direction: old portrait background looked composited/cut-and-paste.
- user explicitly approved the newly generated portrait-native background candidate for production integration.

## UAT-013 — USER-APPROVED PORTRAIT BACKGROUND
Production candidate:
- local `/mnt/data/portrait-background-garden-v1.webp`
- 941x1672 RGB
- 125,912 bytes
- SHA256 `050777632f5fcd1c9217777e4925041633699f52ad37636aeb100a08226ad823`
- normalized base64 length 167,884 chars
- target path `assets/background-portrait-garden-v1.webp`

## REPAIR RUN 1 — VERIFIED FAILURE / DO NOT TRUST
- run `36100717195` completed/failure
- failure `base64: invalid input`
- root cause was malformed old `portrait-08.b64` (15,999 chars); no production asset mapping occurred.

## EXACT STAGING — VERIFIED READY
Good full chunks on current `main`:
- `portrait-00.b64`: 16,001 bytes only because of trailing newline; workflow strips whitespace.
- `portrait-01.b64` blob `af5d69253514a52b7efab693eedccfaf9309e125`
- `portrait-02.b64` blob `b85e157ba6296f1cc2b63dd5f3ed06c99d468123`
- `portrait-03.b64` blob `d7615caec857616cfaeacdf6058b17092f6d8fb0`
- `portrait-04.b64` blob `a6daa5234bd19e422d7c71989b1191f1dc9219b7`
- `portrait-05.b64` blob `31e022c8124057696d902f51774fc3eeb1431753`
- `portrait-06.b64` blob `d43617d58e434ea8bc10ae0a487201e65896de24`
- `portrait-07.b64` blob `67376c268f33dba4756dc8af4f102944aed32ee6`
- `portrait-09.b64` blob `71fcde0febc51a87de1d7a75985660c22a15ad0c`
- `portrait-10.b64` blob `78375cead6091f3ee1136b74d48260d8b84d8bdf`

Exact replacement for old malformed chunk 08 is four ordered quarter chunks, 4,000 chars each:
- `portrait-08a.b64` blob `d82f87a5dabc52b23ef8b0f16fa85a28f9579f0c`
- `portrait-08b.b64` blob `2a16e50a9db28cc0eb6dcd70fb6d964ebe5c1c41`
- `portrait-08c.b64` blob `b4c7c06a27b4e94ca8f2384a6d4a6f74353439a6`
- `portrait-08d.b64` blob `0fe1a087282245689a79de4a6b9efd996410499a`

Old malformed `portrait-08.b64` is absent. Shell glob order is `00..07,08a,08b,08c,08d,09,10`; workflow strips whitespace before decoding, so normalized aggregate reconstructs the original 167,884-char payload.

## REPAIR WORKFLOW — DURABLE
- `.github/workflows/repair-uat013-portrait-background.yml`
- trigger path `repair-staging/uat013/RUN_EXACT_REPAIR`
- verifies decoded size exactly 125,912 and SHA256 exactly `050777632f5fcd1c9217777e4925041633699f52ad37636aeb100a08226ad823`
- commits only `assets/background-portrait-garden-v1.webp` on success.
- existing marker is from failed run 1 and MUST be updated to a fresh nonce for retrigger.

## UAT-011 — VERIFIED FIXED / DO NOT REOPEN
- top blob `5740a9a4619938e8d71b28d8162729b2738bfb59`, 180,814 bytes
- bottom blob `cc0c119b00d1d91fa6b4d6503b1bec5c66061128`, 233,136 bytes
- right unchanged `a4d051c52a4b0f5191ad2770c3eee416fa01aba4`, 51,376 bytes

## DO NOT REPEAT
- do not regenerate approved UAT-013 image
- do not rewrite verified staging chunks
- do not trust repair run 1
- do not edit landscape background behavior
- do not touch portrait CSS until exact production asset mapping is verified
- do not modify business/runtime/recipe/quantity/exclusion/replacement/Matrix/PIN/import-export logic

## EXACT NEXT ACTION
1. Fresh-fetch `repair-staging/uat013/RUN_EXACT_REPAIR` and update its content to a fresh nonce to retrigger exact repair.
2. Read the new `Repair exact UAT-013 portrait background` run once.
3. If running: persist run ID/status and stop polling.
4. If success: verify current `main` bot mapping commit changes only `assets/background-portrait-garden-v1.webp`, then checkpoint exact binary mapping BEFORE CSS.
5. Only after mapping verification: inspect current portrait CSS and integrate the new asset portrait-only; landscape unchanged.

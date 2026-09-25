# CURRENT HANDOFF — NER Menu Quantity

> TEMPORARY CRASH-SAFE EXTERNAL-STATE CHECKPOINT.
> IMPORTANT: current GitHub `main` still wins for product state. This recovery branch exists only to persist an in-flight workflow status without advancing `main` and causing the repair bot's push to become non-fast-forward.

## CURRENT WORK HEAD — EXACT UAT-011 REPAIR RUN IN PROGRESS

Repository: `twentybkk-boop/NER-Menu-quantity`
Product branch: `main`
Recovery status branch: `recovery/uat011-run-36095827232`

Trigger commit on `main`:
- `7e654f4f44c21d1d614dcd9002d6116afc1a63a8` — `Trigger exact UAT-011 overlay repair`
- marker: `repair-staging/uat011/RUN_EXACT_REPAIR`

Repair workflow:
- `.github/workflows/repair-uat011-exact-overlays.yml`
- deterministic implementation commit `1c06f9de5a3234a19353ef3099c48a94704e0b80`
- exact reconstruction proof checkpoint `48a7d2d3570dc6fad5997ede05eef7efd9d59a12`
- workflow-ready checkpoint `56d9e7f83545be6c5c710c84a0cc0bb23ea9deac`

## IN-FLIGHT ACTION — VERIFIED DURABLE EXTERNAL STATE
Repair run:
- workflow: `Repair exact UAT-011 overlays`
- run ID `36095827232`
- run number `1`
- trigger head SHA `7e654f4f44c21d1d614dcd9002d6116afc1a63a8`
- event `push`
- observed status: **in_progress**
- conclusion: null at the single allowed status read

Per crash-safe policy, do NOT poll this run repeatedly.

## EXACT REPAIR TARGETS
Top cleaned target:
- 518x500 RGBA
- 180,814 bytes
- SHA256 `f0ffd24fdde830d06b0d715c7c6ba8c2e81402c9e93731524a3dfa724915d393`

Bottom cleaned target:
- 655x524 RGBA
- 233,136 bytes
- SHA256 `bd645b4744270e221fe0eae8fe08eabf2771269391ddfc4650492e6da831ad31`

Workflow reconstructs from old authoritative Git blobs with exact persisted alpha masks and Pillow 12.3.0, then refuses to commit unless size + SHA256 + staged path set are exact.

## UAT-012 — DO NOT REOPEN
Portrait environment fix remains durable:
- product fix `6fdebb8da6fc87710be6f93141c26579d57d0056`
- regression gate `f28893b255f41ff70643c4e406d4de003909eddb`
- portrait `160% auto` + reduced ivory wash already passed local Chromium/WebKit orientation-layering gates in run `36093279114`.

## DO NOT REPEAT
- do not redo UAT-011 contamination discovery, alpha-mask derivation or encoder proof.
- do not restart abandoned base64 staging.
- do not alter UAT-012.
- do not create another trigger marker while run `36095827232` is unresolved.
- do not advance `main` merely to record this in-flight status; that could break the repair bot push.

## EXACT NEXT ACTION
On the next continuation:
1. Fresh-read current `main` FIRST; it may already contain the repair bot commit.
2. Read run `36095827232` ONCE for final state only.
3. If completed/success:
   - inspect repair job/result only;
   - verify current `main` contains the bot commit;
   - verify production Git tree top/bottom blob sizes and diff scope;
   - persist corrected-mapping checkpoint on `main`.
4. If completed/failure:
   - inspect only failed repair step/log;
   - persist exact blocker on `main` only if doing so cannot conflict with any still-running push.
5. Then verify the UI QA + Pages runs triggered by the exact asset bot commit. Do not rerun old `36093279114` unchanged.
6. If combined automation passes, inspect targeted phone-portrait environment + character cutout evidence and persist `READY FOR USER RE-REVIEW`.

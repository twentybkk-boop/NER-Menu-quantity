# UI LIVE / DEPLOY ACCEPTANCE — 2026-09-24

Repository: `twentybkk-boop/NER-Menu-quantity`

Scope: final deployed GitHub Pages acceptance against the four original real-device feedback items recorded in `docs/UI_REAL_DEVICE_FEEDBACK_2026-09-24.md`.

## Deployment evidence

- GitHub Pages URL: `https://twentybkk-boop.github.io/NER-Menu-quantity/`
- Verified deployed source SHA: `1f3e6eb2a3cb6be20986bc67ee117c585b3d8c72`
- Pages build/deployment run: **35968350715**
- Pages conclusion: **SUCCESS**
- UI QA / live acceptance run: **35968351126**
- UI QA conclusion: **SUCCESS**
- Screenshot artifact: **10794069988** (`ui-qa-screenshots`)
- Artifact digest: `sha256:66f34250429a835481cc4cd20a5631914cde9ea9aafb7091aa26d50b849f9823`

The UI QA run now opens the deployed GitHub Pages URL directly in Chromium and WebKit using `qa/live-pages-acceptance.mjs`. The gate polls the deployed `assets/visual-polish.css` until the current fidelity layers are visible, then performs the acceptance checks against the live page.

## Original feedback acceptance

### 1. Cards should remain inside the central frame and not compete with character artwork

**LIVE ACCEPTED**

The live gate verifies:

- phone menu lane width remains <= 327 CSS px at a 390px phone viewport;
- both left and right character rails remain reserved;
- the menu content remains inside the protected center frame.

Manual evidence: `13-live-pages-iphone@3x.png` shows the menu stack visually owning the center lane while character artwork remains at the edges.

### 2. Food images were blurry

**LIVE ACCEPTED WITH RETINA-SCALE AUTOMATED EVIDENCE; PHYSICAL SAFARI USER CHECK REMAINS THE FINAL SUBJECTIVE CHECK**

The live gate verifies:

- production semantic atlas is active;
- normal thumbnails remain <= 67×45 CSS px;
- signature thumbnails remain <= 73×49 CSS px;
- 3:2 source geometry is preserved;
- atlas crop geometry remains `600% 500%`.

Manual evidence: `13-live-pages-iphone@3x.png` shows the signature/menu food imagery without the earlier oversized soft rendering.

### 3. Character detail was missing — helmet / white backpack / identity detail

**LIVE ACCEPTED AT THE DEPLOYED CSS/ASSET CONTRACT LEVEL**

The live gate verifies:

- all three character roles are visible and non-interactive;
- high-detail character masters are active:
  - `ner-character-top-left.png`
  - `ner-character-bottom-left.png`
  - `ner-character-right.png`;
- gray full-face helmet asset is active;
- white backpack asset is active;
- bottom-left character remains no-glasses.

Manual evidence:

- `13-live-pages-iphone@3x.png` confirms the three-person edge-frame composition on the deployed page;
- `14-live-pages-calculator@3x.png` confirms the three-person calculator composition remains visible around the live modal and controls are unobstructed.

### 4. Live UI did not look like the prepared/generated visual direction

**MATERIALLY IMPROVED + LIVE ACCEPTED FOR REPOSITORY WORKSTREAM**

The deployed page now includes and exposes the completed bounded fidelity passes:

- compact phone brand/hero hierarchy;
- secondary Matrix action;
- protected central content lane;
- semantic category hierarchy;
- deliberate normal/signature card rhythm;
- softer background / edge framing;
- compact calculator with distinct exclusion/action and net-result zones.

The live gate additionally verifies the duplicate phone hero title remains hidden and seven semantic category tokens are active on the deployed page.

## Durable gate added

`qa/live-pages-acceptance.mjs` is now part of `.github/workflows/ui-qa.yml` via the step:

`Verify deployed GitHub Pages acceptance`

This prevents future presentation changes from passing only local/static QA while the actual deployed GitHub Pages state has drifted or is stale.

## Decision

No new repository visual defect was found during this final live/deploy acceptance pass. No additional CSS was added after the verified bounded visual passes.

**Repository visual correction workstream status: READY FOR USER ACCEPTANCE.**

Remaining acceptance is a human physical-device Safari spot check for subjective sharpness, browser chrome / Dynamic Island / bottom-toolbar interaction, and final visual preference. New code changes should require concrete new real-device defect evidence rather than another unsolicited redesign pass.

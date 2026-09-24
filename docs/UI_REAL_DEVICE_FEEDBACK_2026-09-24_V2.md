# UI Real-Device Acceptance Feedback V2 — 2026-09-24

Status: **AUTHORITATIVE USER ACCEPTANCE REOPENED**

This document supersedes any earlier statement that the visual-correction workstream was ready for acceptance when it conflicts with the user's latest iPhone screen recording and three reference images reviewed on 2026-09-24.

## Evidence reviewed

- iPhone Safari screen recording, approximately 7.8 seconds, 512×1108, showing the deployed page from the top through multiple menu categories.
- Reference image 1: the approved three-character composition with complete identity/story details.
- Reference image 2: the red hand-drawn protected center-frame intent for menu cards.
- Reference image 3: the approved illustrated/branded UI direction.

The actual media remains conversation evidence; this file preserves the durable acceptance interpretation so later sessions do not lose or reinterpret it.

---

# USER FEEDBACK — REQUIRED

1. **The three characters shown in the approved reference are the correct characters with complete detail. The web app is using the wrong/incomplete visual result.**
2. **The menu-card stack must stay within the center frame indicated by the red box in reference image 2. The implemented layout must be judged against that visual intent, not merely a loose numeric lane check.**
3. **The imagery still looks blurred / visually weak on the real device.**
4. **The live UI should materially resemble reference image 3; the current live page still looks too much like a utility list with decoration rather than the approved branded illustrated interface.**
5. **Food-photo thumbnails create visual noise. Replace them with simple infographic / pictogram-style visuals.**

---

# SCREEN-RECORDING REVIEW — ADDITIONAL FINDINGS

## A. Character source / crop fidelity

The deployed page technically shows three character positions, but the recording demonstrates that they read as clipped fragments rather than the complete approved character composition.

Acceptance requires preserving the actual visual identity/story details from reference image 1, including the composition cues that make each character recognizable. Merely having three DOM decoration nodes or three cropped people is not sufficient.

Approved reference details include:

- upper-left character: drink, glasses, gesture/pose and speech-bubble/story detail;
- lower-left character: helmet, cat/table scene and speech-bubble/story detail; this character remains **no-glasses**;
- right character: white backpack, clipboard/pen and food-scene/story detail.

## B. Protected center frame

The red-box reference communicates a stronger rule than the previous automated lane bound:

- the card stack should visually occupy a deliberate central reading frame;
- left/right regions belong to illustration/decorative framing;
- cards must not feel like full-width slabs that visually compete with the characters;
- the frame must remain obvious while scrolling long lists.

## C. Thumbnail strategy

The recording shows many realistic food crops with similar visual weight. Repetition of pork, vegetables, noodles and side dishes makes the list tiring to scan and creates visual noise.

New acceptance direction:

- do **not** use food-photo crops in live menu cards;
- use simple semantic infographic / pictogram tiles;
- prioritise fast recognition and calm scanning over photographic richness;
- repeated categories may share a visual language, but category/type meaning must remain distinguishable.

## D. Overall UI fidelity

Reference image 3 remains the primary art-direction target. The live product should read as a designed NER illustrated interface, not a generic mobile list with characters placed at the edges.

Important target traits:

- strong brand moment at the top;
- illustrated/environmental framing;
- soft editorial card system;
- clear protected center content frame;
- intentional character storytelling rather than partial fragments;
- calmer simplified thumbnail language;
- warm illustrated detail and visual rhythm closer to the approved reference.

## E. Long-list scan fatigue

Even when category headers are present, the recording shows that a long repeated series of similarly weighted photo thumbnails makes the page visually dense. The revised direction should reduce visual weight per row and let category breaks provide meaningful rest points.

---

# ACCEPTANCE PRIORITY

## P0

- P0-A — correct approved three-character visual source/composition and identity details.
- P0-B — protected center-frame fidelity against the red-box reference intent.
- P0-C — remove blurry/noisy food-photo thumbnails from live cards; use simple infographic tiles.
- P0-D — bring live art direction materially closer to approved reference image 3.

## P1

- preserve storytelling details where they support the approved composition without obstructing controls;
- reduce long-list visual fatigue;
- improve category rest rhythm and decorative/environmental richness only after P0 is correct.

---

# LOCKED BEHAVIOR

Do not intentionally change:

- recipe calculations or quantities;
- canonical recipe meaning;
- exclusion/replacement semantics;
- Matrix data logic;
- PIN behavior;
- unrelated import/export behavior.

Presentation work must remain isolated from business behavior.

---

# IMPLEMENTATION PROGRESS AFTER THIS FEEDBACK

- **P0-C started immediately:** `assets/visual-thumbnail-infographic.css` replaces live food-photo atlas painting with simple semantic infographic/pictogram tiles while retaining the old atlas mapping only as semantic/provenance data.
- QA is being updated so future CI explicitly rejects reintroducing the photo atlas into live menu cards.

The other P0 items remain open until separately implemented and verified against the latest reference intent.

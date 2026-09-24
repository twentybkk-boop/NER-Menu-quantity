# CURRENT HANDOFF — NER Menu Quantity

> **Crash-safe continuation checkpoint — DO NOT RESTART.**
>
> Source of truth: current GitHub `main` + actual code + `recipe_master.json`. If any SHA/run below is stale, current `main` wins.

## Repository

- Repo: `twentybkk-boop/NER-Menu-quantity`
- Branch: `main`
- Authoritative feedback: `docs/UI_REAL_DEVICE_FEEDBACK_2026-09-24_V2.md`
- Character source finding: `docs/UI_CHARACTER_SOURCE_FINDING_2026-09-24.md`
- Latest verified implementation/QA HEAD before this handoff-only commit: `04370f808ea78df2dbf7160cc07f1f6eba547bd9`
- Latest UI QA run: **35980100012 — SUCCESS**
- Latest screenshot artifact: **10800290439** (`ui-qa-screenshots`)
- Artifact digest: `sha256:c8fcc0e1cd399ab108f67eaba1c8bc571c36cfd53932d7db84bbec4f92758be6`

---

# ACCEPTANCE STATUS — OPEN

The earlier `READY FOR USER ACCEPTANCE` conclusion remains superseded by the user's later iPhone recording + reference images.

Current P0 status:

- **P0-A — correct approved 3-character source/composition: IMPLEMENTED + LOCAL/LIVE QA VERIFIED**
- **P0-B — protected center-frame fidelity: IMPLEMENTED + LOCAL/LIVE QA VERIFIED**
- **P0-C — simple infographic thumbnails: IMPLEMENTED + LOCAL/LIVE QA VERIFIED**
- **P0-D — approved illustrated/branded UI direction: TOP/FIRST-SCREEN PASS V1 IMPLEMENTED + LOCAL/LIVE QA VERIFIED; LONG-LIST/ENVIRONMENTAL RHYTHM STILL OPEN**

Do not claim the full visual workstream is complete until the remaining P0-D long-list/environmental rhythm pass is implemented and visually re-accepted.

---

# PHASE 1 DATA / MAPPING

**COMPLETE — DO NOT REDO unless `recipe_master.json` changes.**

- 45 menus; semantic mapping 45/45.
- Existing atlas remains provenance/mapping evidence only.
- Live cards use the accepted infographic/pictogram layer, not food-photo crops.

---

# P0-A — APPROVED CHARACTER COMPOSITION

**DONE + VERIFIED ON LOCAL + DEPLOYED GITHUB PAGES — DO NOT REDO**

Authoritative source family:

- `assets/overlay-top-left.webp`
- `assets/overlay-bottom-left.webp`
- `assets/overlay-right.webp`

Implementation / gates:

- `assets/visual-character-composition-v2.css`
- `qa/character-composition-v2-contract.mjs`
- `qa/live-pages-acceptance-v2.mjs`

Locked visual facts:

- upper-left keeps glasses + drink + gesture + bubble;
- lower-left remains **no-glasses** and keeps helmet + cat/table + bubble;
- right keeps white backpack + clipboard/pen + food scene + bubble;
- foreground art remains `pointer-events:none`.

Relevant verified commits:

- `609dd0b19dcef75af6ac3cd19dd1d3892ab773aa` — preserve top-left identity detail
- `c08112dde5bfd9e178fedf3be626c98871d30ada` — align local/live character detail gate

---

# P0-B — PROTECTED CENTER FRAME

**DONE + VERIFIED ON LOCAL + DEPLOYED GITHUB PAGES — DO NOT REDO**

Implementation:

- `assets/visual-center-frame-v2.css`
- phone `#app-menus`: `width:min(300px,calc(100vw - 80px))`
- at 390px viewport this yields ~300px center reading frame with ~45px illustration rails;
- hero is aligned to the same frame;
- lower illustration shelf keeps the lower-left/right approved compositions visually separate from the scrolling card stack.

Corrected root cause already fixed:

- old nested `%` geometry produced a rejected ~232px lane;
- `22cf24509db87917cbdea0ee36049a744200b2c0` switched to viewport-relative geometry.

---

# P0-C — INFOGRAPHIC THUMBNAILS

**DONE + VERIFIED — DO NOT REDO**

- `assets/visual-thumbnail-infographic.css`
- live cards do not paint `semantic-atlas-v1.webp` food-photo crops;
- signature sets remain distinct;
- recipe/business behavior unchanged.

---

# P0-D — APPROVED ILLUSTRATED / BRANDED UI DIRECTION

## Top / first-screen composition V1

**DONE + VERIFIED ON LOCAL + DEPLOYED GITHUB PAGES**

Bounded implementation:

- `assets/visual-top-composition-v1.css`
- imported last from `assets/visual-polish.css`
- scope is phone masthead + utility hero + first category only;
- long-list categories below the first block were intentionally not redesigned in this pass.

What changed in this bounded pass:

- masthead is now a ~300px soft editorial illustrated panel instead of a free-floating logo;
- approved upper-left story character is enlarged/repositioned to participate in the masthead without covering the NER wordmark;
- warm paper wash + sage/peach environmental shapes + hand-drawn accent line strengthen the branded first-screen moment without reintroducing duplicate background branding;
- utility hero is now a compact supporting ribbon;
- Matrix action remains fully functional but visually secondary;
- first category gets a bounded editorial/environmental grouping and softer signature-card treatment;
- P0-B center width, P0-C infographic tiles, and business behavior remain unchanged.

Durable acceptance contract:

- `qa/top-composition-v1-contract.mjs`
- runs on Chromium + WebKit at 390×844;
- local and deployed GitHub Pages use the same contract;
- live gate waits for `visual-top-composition-v1.css` before evaluating to avoid deployment-lag false results.

Latest P0-D commits:

- `f5c8b5db7d5a0dc482a337f36cbfe721988c817c` — `Add bounded P0-D top composition layer [skip ci]`
- `18655b5b720c8095bd097c36d401254d180992ce` — `Activate bounded P0-D top composition [skip ci]`
- `df2570ef77db3cd09638f118a18a90b240b11362` — `Add P0-D top composition acceptance contract [skip ci]`
- `04370f808ea78df2dbf7160cc07f1f6eba547bd9` — `Gate bounded P0-D top composition in UI QA`

Final verification run `35980100012`:

- base Chromium + WebKit UI QA — PASS
- P0-A character composition — PASS
- P0-B protected center frame — PASS
- **P0-D top composition local — PASS**
- calculator visual hierarchy — PASS
- deployed Pages P0-A/P0-B — PASS
- **deployed Pages P0-D top composition — PASS**
- thumbnail/contact-sheet evidence — PASS
- character asset inventory evidence — PASS

Manual screenshot inspection from artifact `10800290439`:

- `23-top-composition-v1-iphone@3x.png`
- `24-live-top-composition-v1@3x.png`

Observed local/live equivalence:

- strong NER illustrated first-screen panel;
- upper-left approved character participates in the masthead and does not obscure the wordmark;
- Matrix utility is visibly secondary;
- first category reads as a soft editorial section;
- signature cards remain inside the protected ~300px frame;
- infographic pictograms remain intact;
- lower approved character compositions remain on the illustration shelf.

## Remaining P0-D

**OPEN: long-list / environmental rhythm only.**

The page below the first category still transitions back to the older utility-list rhythm. The next bounded pass should extend the accepted art direction through later category breaks without making every section a heavy card and without increasing scan fatigue.

---

# LOCKED BUSINESS CONSTRAINTS

Do **not** intentionally change:

- recipe calculations or quantities;
- canonical recipe meaning;
- exclusion / replacement semantics;
- Matrix data logic;
- PIN behavior;
- unrelated import / export behavior.

Do not regress:

- approved `overlay-*.webp` character sources;
- lower-left no-glasses;
- ~300px protected phone center frame;
- infographic thumbnails;
- calculator behavior;
- Matrix behavior;
- `pointer-events:none` foreground art;
- verified P0-D top/first-screen V1 composition.

---

# DO NOT REPEAT

Do not redo:

- repo-wide investigation;
- 45-menu inventory;
- atlas architecture / semantic mapping;
- infographic-thumbnail conversion;
- character asset inventory investigation;
- P0-A source/composition implementation;
- P0-B geometry investigation/fix;
- P0-D top/first-screen V1 pass;
- Matrix/PIN functional investigation;
- modal scroll restoration investigation.

---

# SHORT-SESSION RULE

Every continuation session must:

1. minimally read current `main` + this handoff;
2. complete **one bounded task**;
3. persist code/evidence/checkpoint;
4. report exact **NEXT ACTION** and stop.

---

# EXACT NEXT ACTION

**Next short session: P0-D long-list / environmental rhythm only.**

Do not touch the already verified first-screen composition unless new user evidence shows a defect.

Bounded goals:

1. keep all later menu cards inside the verified ~300px center frame;
2. reduce the abrupt transition from the illustrated first category back to a generic utility list;
3. improve category rest rhythm using lightweight editorial/environmental separators, not heavy card soup;
4. preserve infographic scanability and keep repeated rows calm;
5. keep all three approved character compositions and lower illustration shelf unchanged;
6. do not modify recipe/Matrix/PIN/import-export behavior;
7. add one long-list rhythm contract + screenshot state, run Chromium + WebKit + deployed Pages QA, manually inspect, checkpoint, then stop.

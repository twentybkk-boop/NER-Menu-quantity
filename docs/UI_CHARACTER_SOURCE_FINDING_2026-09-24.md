# P0-A Character Source Finding — 2026-09-24

Status: **ROOT CAUSE VERIFIED — IMPLEMENTATION NEXT**

This checkpoint is intentionally narrow and exists to prevent repeated asset investigation after chat/session timeouts.

## What was inspected

A durable contact sheet was generated from the actual repository assets in UI QA run `35973449831` and stored in artifact `10797496052` as `10-character-asset-contact-sheet.png`.

The contact sheet compares:

- `assets/ner-team-bg.webp`
- `assets/ner-character-top-left.png`
- `assets/ner-character-bottom-left.png`
- `assets/ner-character-right.png`
- `assets/overlay-top-left.webp`
- `assets/overlay-bottom-left.webp`
- `assets/overlay-right.webp`
- `assets/accessory-glasses.svg`
- `assets/accessory-gray-fullface-helmet.svg`
- `assets/accessory-white-backpack.svg`
- `assets/background-master.webp`

## Verified root cause

The current live normal composition is sourcing the **three `ner-character-*.png` masters** and then adding separate helmet/backpack accessory SVGs in CSS.

That is not the same visual source/composition as the user's approved reference.

The repository already contains a much closer authoritative composition family:

- `assets/ner-team-bg.webp` shows the three-character illustrated composition together with the storytelling environment;
- `assets/overlay-top-left.webp` contains the upper-left character with drink / gesture / speech bubble;
- `assets/overlay-bottom-left.webp` contains the lower-left character with helmet / cat / table / speech bubble and no glasses;
- `assets/overlay-right.webp` contains the right character with backpack / clipboard / food scene / chalkboard / speech bubble.

Therefore P0-A is **not** primarily a missing-DOM-node problem and should not be solved by keeping the current PNG masters plus synthetic accessory overlays. The wrong presentation source was selected for the accepted composition.

## Source-of-truth comparison

The user's approved reference image remains the acceptance target. The durable asset inventory proves that the `overlay-*.webp` / `ner-team-bg.webp` family is semantically and compositionally aligned with that target, while the currently painted `ner-character-*.png` family is incomplete as a standalone composition.

## Constraints retained

- all three characters must remain present together in relevant states;
- lower-left remains no-glasses;
- foreground remains non-interactive / `pointer-events:none`;
- menu infographic work from P0-C must not be changed;
- recipe / calculation / replacement / Matrix / PIN behavior must not change.

## Exact next implementation action

Replace the current normal-page character source in a bounded presentation layer so the page paints the approved-composition `overlay-*.webp` family (or an equivalent higher-resolution derivative of the approved reference) instead of `ner-character-*.png` + synthetic accessory overlays.

Acceptance must verify **story details**, not merely three visible DOM nodes:

- upper-left: drink + gesture + speech bubble + glasses;
- lower-left: helmet + cat/table + speech bubble + no glasses;
- right: backpack + clipboard + food/chalkboard + speech bubble.

Then run Chromium + WebKit + live Pages QA and manually inspect screenshots before moving to P0-B center-frame fidelity.

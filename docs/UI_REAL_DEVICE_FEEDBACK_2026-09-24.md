# Real-device UI feedback — 2026-09-24

> Durable product feedback / acceptance input. This file is presentation-only guidance. It does **not** authorize changes to recipe quantities, canonical recipe semantics, exclusion/replacement behavior, Matrix data logic, PIN behavior, or unrelated import/export behavior.

## Evidence context

Feedback was captured from the deployed GitHub Pages UI on a real iPhone/Safari session after the previous automated screenshot acceptance checkpoint.

The real-device evidence takes priority over the earlier Playwright-only visual acceptance where they disagree.

## User feedback — MUST FIX

### F1 — Keep menu cards inside the central content frame

The menu cards currently extend too far toward the screen edges and overlap visually with the foreground characters.

Required result:

- the card stack must stay inside a clear central content column / safe frame;
- characters live in dedicated edge rails / framing space, not inside the primary reading area;
- cards must not visually compete with or cover important character details;
- the central reading path should remain stable through long category lists.

### F2 — Food/menu images are visibly blurry on the real device

The current thumbnails are too soft / blurry at actual iPhone rendering size.

Required result:

- menu thumbnails must be crisp at the rendered card size on iPhone Safari;
- signature set cards must receive especially clear imagery;
- do not upscale a low-resolution crop beyond the source detail available;
- if the current shared atlas cannot meet real-device sharpness, use higher-resolution or per-item/per-semantic source assets rather than accepting blur.

### F3 — Character identity details are missing

Important character details are not preserved in the deployed composition. In particular the approved character treatment requires visible details such as the helmet and white backpack where applicable.

Required result:

- character silhouettes and identity details must remain recognizable;
- helmet detail must be visible where present in the approved character source;
- white backpack detail must be visible where present in the approved character source;
- bottom-left character remains the no-glasses version;
- all three required people remain present together on relevant states;
- foreground art remains non-interactive (`pointer-events:none`) and must not block controls.

### F4 — Live UI does not match the generated / approved visual target closely enough

Functional correctness alone is not sufficient. The implemented page has drifted from the prepared generated visual direction.

Required result:

- use the approved generated visual direction as the visual target, not merely as loose inspiration;
- restore comparable layout proportions, whitespace, character framing, card containment, image quality, background softness, and overall polish;
- compare target-vs-live by section: masthead/hero, content frame, category header, menu card, character rail, background treatment, calculator modal;
- do not solve fidelity issues by changing business behavior.

## Additional review feedback — SECONDARY TO USER FEEDBACK

These were identified during review and should be addressed only where they support the four user priorities above.

1. **Header meaning is duplicated.** The large NER masthead is immediately followed by another `NER แจ่วฮ้อน Smart Recipe` title. Reduce repetition so the top of the phone page is more efficient.
2. **Matrix UI is visually too dominant.** It is an admin/back-office action and should read as secondary to the core menu → calculation flow.
3. **Repeated `ปรับวัตถุดิบ` subtitles add visual noise.** Reduce prominence or remove where the card action is already obvious.
4. **Category hierarchy can scan faster.** Category icons / treatment should better reflect category semantics rather than feeling repeated.
5. **Foreground characters currently carry too much visual weight relative to menu content.** Keep all three, but use edge rails / intentional clipping so they frame the UI instead of competing with it.
6. **Background edge artwork can still feel busy.** Keep the brand artwork, but protect the central reading zone and reduce competition around card content.
7. **Calculator hierarchy can improve.** Make selection/exclusion state and final net result visually easier to distinguish while preserving behavior.
8. **Internal/admin wording and branded customer-facing language are mixed.** Technical terms such as `Matrix UI` should be visually secondary; do not rename behavior in a way that could break tests or workflows without explicit evidence.

## Priority

### P0

1. Central card containment / character-safe rails.
2. Real-device thumbnail sharpness.
3. Restore character identity details.
4. Bring live implementation materially closer to the approved generated visual target.

### P1

5. Reduce duplicated header hierarchy.
6. Reduce Matrix visual dominance.
7. Reduce repeated subtitle noise / improve category scan hierarchy.
8. Fine-tune background and calculator visual hierarchy.

## Acceptance criteria for the next implementation pass

- [ ] iPhone menu cards remain inside a deliberate central content column and do not run underneath the character rails.
- [ ] Real-device-scale food thumbnails are visibly crisp, especially the four signature set menus.
- [ ] All three characters are present in required states.
- [ ] Bottom-left character has no glasses.
- [ ] Approved helmet / white-backpack identity details are visible where applicable.
- [ ] Character layers never intercept pointer/touch input.
- [ ] Header is less repetitive and Matrix action is secondary.
- [ ] Live composition is visibly closer to the approved generated direction, not only functionally equivalent.
- [ ] Existing recipe/business semantics remain unchanged.
- [ ] Chromium + WebKit UI QA passes after the presentation changes.
- [ ] New screenshots are manually inspected against this document before declaring visual acceptance.

## Continuation rule

The previous statement in `CURRENT_HANDOFF.md` that no repository blocker remained is superseded by this real-device evidence. Continue from current `main`; do not restart completed inventory or business-logic work. Fix only the presentation layers evidenced here, rerun QA, then update the handoff with the new verified state.
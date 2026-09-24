# UI Real-Device Acceptance Feedback V3 — 2026-09-24

Status: **NEW REAL-DEVICE DEFECTS — ACCEPTANCE REOPENED**

Source evidence: latest user iPhone Safari screen recording (~34 s) plus the newly supplied iPhone mockup reference.

This feedback is additive to V2. P0-A/B/C/D work remains valuable, but the visual workstream is not complete until these new device/orientation defects are resolved.

## New required feedback

1. **Orientation/layering bug:** rotating the phone to landscape visibly breaks composition. Phone landscape is not a primary usage mode, but it must not produce broken stacking/layout.
2. **Ambient green circles are visually on the same plane as the three characters.** They must read as background atmosphere, behind characters/content.
3. **Add/reinforce a true backmost environmental background layer** so the overall mood reads closer to the supplied mockup while remaining calm behind the center content frame.
4. **Character artwork is visibly blurred/soft. This is HIGH PRIORITY.** The problem is reported on phone portrait, phone landscape, iPad portrait, and iPad landscape.
5. **Character stacking is wrong on wider/orientation states:** in phone landscape and on iPad portrait/landscape, character art can fall behind menu cards. Characters must remain on the intended foreground illustration plane while staying non-interactive.

## Crash-safe session split

### Session 1 — layering / orientation / background

Scope only:

- fix phone-landscape and iPad character/card stacking;
- move ambient green-circle atmosphere to the backmost/background plane;
- reinforce the environmental background mood behind all content;
- add viewport/orientation QA for phone portrait, phone landscape, iPad portrait, iPad landscape;
- do **not** attempt sharpness/source-resolution work in this session.

### Session 2 — character sharpness

Scope only after Session 1 is verified:

- audit actual source pixel dimensions / encoding of the approved character assets;
- identify CSS/browser scaling that causes softness;
- replace/derive higher-resolution assets when necessary;
- verify sharpness on phone portrait/landscape and iPad portrait/landscape;
- preserve approved story details and layering from Session 1.

## Locked behavior

Do not change recipe calculations, recipe meaning, exclusion/replacement semantics, Matrix data logic, PIN behavior, or unrelated import/export behavior.

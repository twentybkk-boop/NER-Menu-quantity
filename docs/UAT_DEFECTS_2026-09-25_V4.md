# UAT Defects — 2026-09-25 V4

## Scope / evidence
This defect set is derived from the user's hands-on test feedback, the attached portrait screenshot, and the attached screen recording from 2026-09-25. Observed behavior is separated from likely root-cause hypotheses. No code fix is implied by a hypothesis until reproduced against current `main`.

## UAT-001 — Ambient green circles are not on the backmost plane
- **Severity:** P0 visual/layering regression
- **Viewport/state:** mobile portrait, menu list
- **Reproduction:** open the main menu list in portrait and inspect the green circular ambient decoration near the upper-right of the content frame.
- **Expected:** ambient circles sit behind every header/card/control/content surface and never visually overlap or compete with interactive UI.
- **Observed:** the green circles visually sit too high in the stack and overlap the foreground/card area.
- **Likely root cause hypothesis:** decoration container participates in a foreground stacking context (`z-index`, positioned ancestor, transform/filter/opacity-created stacking context, or DOM placement) instead of a dedicated backmost decorative plane.
- **Acceptance gate:** circles remain visible as atmosphere but are always behind the page chrome/content frame in phone/iPad portrait and landscape.

## UAT-002 — Portrait background atmosphere is missing/too faint
- **Severity:** P0 visual/responsive regression
- **Viewport/state:** mobile portrait, main/menu screens
- **Reproduction:** open the app in portrait and compare the environment/background treatment with landscape.
- **Expected:** the designed environmental background remains visibly present in portrait, with controlled contrast and without competing with content.
- **Observed:** portrait background is effectively absent/too faint compared with landscape.
- **Likely root cause hypothesis:** portrait breakpoint hides, clips, scales out, or heavily attenuates the background layer; possible media-query/object-position/opacity/background-size issue.
- **Acceptance gate:** portrait shows a clearly readable but non-distracting environment background on the same visual system as landscape.

## UAT-003 — Landscape background is too weak and conflicts with the NER system label/header
- **Severity:** P0 visual/responsive regression
- **Viewport/state:** mobile landscape, main/menu screens
- **Reproduction:** rotate to landscape and inspect the background/environment behind the NER system label/header area.
- **Expected:** background is visible enough to establish atmosphere while keeping the NER label/header clean and unobstructed.
- **Observed:** the background appears, but is too faint/unclear in some areas and compositionally collides with or sits behind the NER system label/header.
- **Likely root cause hypothesis:** shared landscape positioning/sizing for the environment layer does not reserve a protected header-safe zone.
- **Acceptance gate:** background remains legible, NER label/header has a clear protected region, and no visual collision occurs at supported landscape widths.

## UAT-004 — Landscape blocks core interaction for exclusion and quantity inspection
- **Severity:** P0 functional blocker
- **Viewport/state:** mobile landscape, menu/item detail/selection flow
- **Reproduction:** rotate to landscape, open a menu item, then attempt to mark an ingredient/item as not accepted/excluded and attempt to inspect or interact with quantity controls/details.
- **Expected:** all exclusion/replacement and quantity-related controls remain visible, scrollable, and tappable in landscape.
- **Observed:** in landscape the user cannot reliably select “ไม่รับของ” and cannot access/inspect quantity as in portrait.
- **Likely root cause hypothesis:** landscape viewport height compression combined with overflow/positioning/sticky/fixed overlay behavior causes controls to be outside the reachable scroll/tap region or covered by another layer.
- **Acceptance gate:** the complete flow works in landscape with no hidden controls, clipped content, blocked tap targets, or unreachable scroll region.

## UAT-005 — Landscape detail/overlay composition shows overflow / seam-like split
- **Severity:** P1 responsive/polish
- **Viewport/state:** mobile landscape, item detail/overlay states
- **Reproduction:** rotate to landscape and open detail/selection overlays; scroll through the state.
- **Expected:** one continuous backdrop/content surface with no visible viewport seam, clipping edge, or abrupt background split.
- **Observed:** recording shows a visible composition split/seam and compressed layout behavior in landscape.
- **Likely root cause hypothesis:** independent fixed/absolute layers use mismatched viewport/container dimensions or backdrop sizing across orientation.
- **Acceptance gate:** overlay/backdrop is continuous across the viewport and all content layers remain aligned during orientation and scrolling.

## UAT-006 — Thumbnail infographic is often semantically too generic for the menu name
- **Severity:** P1 content clarity
- **Viewport/state:** menu list, portrait and landscape
- **Reproduction:** scan menu cards and compare the thumbnail graphic to the Thai menu name.
- **Expected:** each thumbnail communicates the specific menu/category closely enough to support recognition before reading the full text.
- **Observed:** several thumbnails reuse broad/generic meat/pork/hotpot imagery and do not distinguish similarly named menu items well.
- **Likely root cause hypothesis:** current thumbnail mapping uses coarse category-level assets rather than item-level semantic mapping.
- **Acceptance gate:** menu thumbnails are meaningfully differentiated and visually aligned with each menu name without inventing misleading ingredients.

## UAT-007 — Thumbnail/infographic container is oversized relative to its information value
- **Severity:** P1 density/layout polish
- **Viewport/state:** menu list, portrait and landscape
- **Reproduction:** inspect menu-card proportions.
- **Expected:** thumbnail acts as a compact recognition cue while the menu name remains the dominant information element.
- **Observed:** infographic/thumbnail box consumes more horizontal/vertical space than necessary.
- **Likely root cause hypothesis:** fixed thumbnail width/height and card padding are tuned too generously for mobile.
- **Acceptance gate:** thumbnail container is reduced while preserving legibility, touch layout, and card rhythm; text gains useful space.

## UAT-008 — Character illustrations can be moderately larger without harming usability
- **Severity:** P2 visual polish
- **Viewport/state:** main/menu/detail screens where the three-character composition is present
- **Reproduction:** inspect portrait and landscape compositions after the high-resolution asset mapping.
- **Expected:** characters feel intentionally present and expressive while never obstructing controls/content.
- **Observed:** user feedback indicates all three characters could be somewhat larger; current sizing is still conservative.
- **Likely root cause hypothesis:** post-sharpness sizing remained intentionally cautious after earlier overlap regressions.
- **Acceptance gate:** increase character scale modestly, keep all three together, preserve bottom-left no-glasses contract, and maintain content/tap safe zones in phone/iPad portrait/landscape.

## UAT-009 — Detail/selection modal uses too much vertical real estate before actionable content
- **Severity:** P2 usability/polish
- **Viewport/state:** mobile portrait, ingredient/item selection flow
- **Reproduction:** open a menu item and enter the selection/exclusion detail state.
- **Expected:** primary actions/options appear promptly with efficient use of the mobile viewport.
- **Observed:** header/intro/status blocks occupy a relatively large portion of the viewport before the actionable ingredient list/options.
- **Likely root cause hypothesis:** stacked header padding, summary blocks, and fixed decorative areas are too tall for mobile.
- **Acceptance gate:** actionable options move upward without losing context, hierarchy, or accessibility.

## UAT-010 — Decorative characters/background must not intercept or visually crowd interactive regions
- **Severity:** P1 interaction safety / visual polish
- **Viewport/state:** modal/detail states, especially mobile portrait/landscape
- **Reproduction:** open overlays/details and inspect/tap controls near screen edges and lower corners.
- **Expected:** decorative artwork is `pointer-events: none`, remains outside protected interaction zones, and never visually competes with controls.
- **Observed:** recording shows decorative characters/background close to active content in several states; combined with the landscape failure this requires explicit interaction-safety verification.
- **Likely root cause hypothesis:** decorative layers and responsive offsets are not consistently governed by a shared protected-frame contract.
- **Acceptance gate:** no decorative layer intercepts pointer/touch input; protected content/tap zones remain clear in all supported orientations.

# Work Head / Fix Order

## Chunk 1 — Background + layering system (P0)
Targets: `UAT-001`, `UAT-002`, `UAT-003`.
- Reproduce on current `main` only.
- Identify the actual environment/ambient DOM/CSS layers and their stacking contexts.
- Establish one explicit backmost decorative/background plane.
- Preserve a protected NER/header zone in portrait and landscape.
- Verify phone portrait + phone landscape first; then iPad portrait + iPad landscape.
- **Checkpoint immediately after verification before moving to Chunk 2.**

## Chunk 2 — Landscape interaction and overlay geometry (P0)
Targets: `UAT-004`, `UAT-005`, `UAT-010`.
- Reproduce exclusion/quantity failure in landscape.
- Fix reachability, overflow, tap-target occlusion, and overlay/backdrop geometry without changing exclusion/replacement/quantity semantics.
- Verify rotation, scrolling, tapping, exclusion selection, replacement selection, and quantity inspection.
- **Checkpoint immediately after verification before moving to Chunk 3.**

## Chunk 3 — Thumbnail semantic mapping + compact infographic box (P1)
Targets: `UAT-006`, `UAT-007`.
- Audit current item-to-thumbnail mapping against actual menu names in `recipe_master.json`/UI source of truth.
- Improve semantic differentiation using existing or newly prepared non-misleading assets.
- Reduce infographic container size while preserving list rhythm and readability.
- Verify representative menu categories and long-list behavior in portrait/landscape.
- **Checkpoint immediately after verification before moving to Chunk 4.**

## Chunk 4 — Character scale + detail density polish (P2)
Targets: `UAT-008`, `UAT-009` and final visual recheck of `UAT-010`.
- Increase character scale only moderately.
- Keep all three characters together where expected.
- Preserve bottom-left NO-glasses contract and all story/accessory details.
- Tighten detail/modal vertical density so actionable content appears sooner.
- Re-run targeted responsive visual QA and manual evidence review.
- **Checkpoint immediately after verification.**

# Locked invariants during UAT fixes
- Do not change recipe/business meaning, quantity calculations, exclusion/replacement semantics, Matrix logic, or PIN behavior unless a separate reproduced defect proves them wrong.
- Do not regress the exact high-resolution production overlay assets already verified.
- Do not remove any of the three required character identities/details.
- Do not treat automated screenshot success as sufficient for interaction bugs; manually verify touch/scroll behavior in landscape.
- Current GitHub `main` remains source of truth; if concurrent work advances it, rebase the work head on the newer verified state.

# Exact next action
Start **Chunk 1 only**. Inspect the current `main` code paths that implement the ambient green circles/environment background/header composition, reproduce `UAT-001`–`UAT-003`, make the smallest responsive/layering fix, verify phone portrait/landscape and iPad portrait/landscape, then persist a checkpoint before touching Chunk 2.

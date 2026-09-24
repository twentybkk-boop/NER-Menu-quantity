# V3 Session 2A — Character Sharpness Audit — 2026-09-24

Status: **ROOT CAUSE VERIFIED — IMPLEMENTATION NEXT**

This is a bounded crash-safe checkpoint. Do not repeat the asset-resolution audit unless the approved character sources change.

## Scope

User-reported defect: approved character compositions are visibly soft/blurry on:

- phone portrait;
- phone landscape;
- iPad portrait;
- iPad landscape.

Session 1 layering/orientation/background work is locked and was not changed by this audit.

## Approved composition sources currently painted

The approved story-complete overlays remain:

- `assets/overlay-top-left.webp`
- `assets/overlay-bottom-left.webp`
- `assets/overlay-right.webp`

Natural raster dimensions were decoded from the actual WebP headers in the repository:

| Asset | Natural pixels | File size |
| --- | ---: | ---: |
| `overlay-top-left.webp` | **130×121** | 5,978 B |
| `overlay-bottom-left.webp` | **150×114** | 5,858 B |
| `overlay-right.webp` | **110×171** | 5,594 B |

These files are extremely small for Retina foreground illustration.

## Existing higher-resolution repo candidates

The existing partial character PNG masters are larger but do **not** contain the approved complete story compositions by themselves:

| Asset | Natural pixels | File size |
| --- | ---: | ---: |
| `ner-character-top-left.png` | **168×176** | 54,747 B |
| `ner-character-bottom-left.png` | **188×175** | 57,621 B |
| `ner-character-right.png` | **160×305** | 86,630 B |

`assets/ner-team-bg.webp` is **540×360** (12,806 B) and contains the three-character/environment composition together, but is not a direct drop-in replacement for three independent foreground rails.

Therefore simply reverting to the PNG masters would regress the already-approved story details and is **not** an acceptable sharpness fix.

## Effective render scale of current approved overlays

Because `background-size: contain` is used, the image is scaled into each CSS box while keeping aspect ratio.

### Phone portrait

- top: source 130×121 → ~108×100.5 CSS px → **1.20 source px / CSS px**
- bottom-left: 150×114 → ~128.9×98 CSS px → **1.16 source px / CSS px**
- right: 110×171 → ~96×149.2 CSS px → **1.15 source px / CSS px**

At DPR 3 this is only about **0.38–0.40 source px / device px**.

### Phone landscape

- top: ~**1.16 source px / CSS px**
- bottom-left: ~**1.24 source px / CSS px**
- right: ~**1.20 source px / CSS px**

At DPR 2–3 this remains materially undersampled.

### iPad portrait

- top: **0.93 source px / CSS px** — already enlarged beyond native resolution
- bottom-left: **1.04 source px / CSS px**
- right: **0.95 source px / CSS px** — already enlarged beyond native resolution

At DPR 2, effective detail is only about **0.46–0.52 source px / device px**.

### iPad landscape

- top: **0.73 source px / CSS px** — ~1.37× CSS upscaling
- bottom-left: **0.84 source px / CSS px** — ~1.19× CSS upscaling
- right: **0.74 source px / CSS px** — ~1.35× CSS upscaling

At DPR 2, effective detail is only about **0.36–0.42 source px / device px**.

## CSS/browser softness contributor

`assets/visual-character-composition-v2.css` currently applies this filter to every raster character:

```css
filter: drop-shadow(0 6px 12px rgba(73,45,31,.08)) saturate(1.015) contrast(1.01) !important;
```

On Safari/WebKit this forces filtered raster compositing/resampling on artwork that is already resolution-constrained. It is a secondary contributor to softness.

The primary defect is still insufficient source resolution; removing the filter alone cannot create missing detail.

## Root cause

**Verified:** the live composition is semantically correct but physically undersampled for Retina rendering.

The approved `overlay-*.webp` family was created at roughly 110–150 pixels in width. That is insufficient for CSS render sizes near 90–180 px on DPR 2–3 displays, and becomes especially poor on iPad landscape where the source is enlarged even before device-pixel scaling.

This exactly matches the user's observation that softness is visible in every orientation and is worst on larger/tablet layouts.

## Implementation constraint

Do **not** solve sharpness by reverting to the incomplete `ner-character-*.png` family plus synthetic accessories. That would regress P0-A identity/story acceptance.

The correct implementation path is:

1. produce or use **higher-resolution equivalents of the approved three story-complete compositions**;
2. target at least **2 source pixels per CSS pixel** for iPad/Retina states (3× desirable for phone @3x where practical);
3. keep the same three independent composition roles and story details;
4. remove the raster `filter` chain where it is not required and use a non-filter shadow strategy if visual separation is still needed;
5. preserve the Session 1 layer model and center-frame geometry.

## Exact next action

**V3 Session 2B — implement high-resolution approved character assets + remove raster-softening filter.**

Before modifying geometry, derive/use higher-resolution story-complete assets for top-left, bottom-left and right, wire them into the same `.decor-a/.decor-b/.decor-c` roles, add a source-resolution/sharpness contract for phone portrait/landscape and iPad portrait/landscape, then run Chromium + WebKit + deployed Pages QA and inspect @2x/@3x screenshots.

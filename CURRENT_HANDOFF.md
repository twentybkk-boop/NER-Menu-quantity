# CURRENT HANDOFF — NER Menu Quantity

> Crash-safe continuation checkpoint — DO NOT RESTART.
> Source of truth: current GitHub `main` + actual code + `recipe_master.json`; current `main` wins if any status below becomes stale.

## Current status
- V2 P0-A/B/C/D: VERIFIED — do not redo.
- V3 Session 1 layering/orientation/background: VERIFIED — do not redo.
- V3 Session 2A root-cause audit: DONE — do not redo.
- V3 Session 2B.1 sampling/compositing safety: VERIFIED — do not redo.
- V3 Session 2B.2: recovered approved high-resolution source set prepared and committed; branch ref / QA verification remains.

## Recovered source
Recovered prior generated project asset `image-gen-2(7).png` from Library: 1536×1024 RGBA with original transparency and all three approved story-complete compositions. No production character was redrawn or rebuilt from `ner-character-*.png` + accessory SVGs.

Acceptance present in source:
- upper-left: glasses + drink + gesture + speech bubble;
- lower-left: NO GLASSES + helmet + cat/table + speech bubble;
- right: white backpack + clipboard/pen + food/chalkboard + speech bubble.

Recovered 1:1 WebP assets, no upscale:
- top-left 518×500 → Git blob `f3c75c16cc39ab6ae218f58fb1d69e0c51c381ca`;
- bottom-left 655×524 → Git blob `96b166210249e5ca2fc666c077f211cb1e2a505d`;
- right 556×851 → Git blob `bda6a1fa9f92baa526feee7ea3f439bdf991c947`.
- CSS cache-bust-only blob: `bad72bef714914ee02264504f58b5ec3849f3330`, query `v=20260924-v3-recovered1`.

Implementation commit reconciled on top of handoff checkpoint:
- `f558c60a38cbc9a8373bc3cadcc668ca47177ef2`
- parent `6e1380ce5b26502f97e9290ece62c60bcdb00da1`
- tree `ed2eb620d914e63a25afa72941b7f8bab7381bc5`

Production geometry, z-index, center frame, environment background, recipe/business logic, Matrix, PIN, import/export: unchanged.

## Prior blocker/root cause
- orphan blobs `35c12cd9…`, `42c06cd2…`, `9af0dd1f…`: invalid WebP — never restore;
- later large replacement WebPs: decodable dimensions but visually blank/transparent; source-pixel QA falsely passed;
- temporary fallback commit `753d409b9c31ff1d01fc59770c738ba7caee6a3d` restored verified visible low-res assets while source recovery was performed;
- recovered Library source resolves the missing high-res source blocker.

## Do not repeat
- V2 / Session 1 / Session 2A / Session 2B.1 investigations;
- P0-A/P0-B/P0-D/orientation/calculator compatibility fixes;
- Library/source recovery search;
- invalid orphan blobs or blank large canvases;
- synthetic production composition from separate character/accessory assets.

## EXACT NEXT ACTION
Fast-forward `main` to `f558c60a38cbc9a8373bc3cadcc668ca47177ef2`, then wait for the existing UI QA and Pages runs, inspect only concrete failures if any, and on success manually inspect all local/live `31-*sharpness-v2` phone portrait/landscape @3x and iPad portrait/landscape @2x screenshots before closing Session 2B.2.

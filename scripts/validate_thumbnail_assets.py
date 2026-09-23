#!/usr/bin/env python3
"""Validate recipe -> thumbnail coverage without changing recipe semantics."""
from __future__ import annotations
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
recipe = json.loads((ROOT / "recipe_master.json").read_text(encoding="utf-8"))
css = (ROOT / "assets" / "menu-thumbnail-map.css").read_text(encoding="utf-8")
menus = set(recipe.get("categories", {}))
pairs = re.findall(
    r'\.menu-card\[data-menu="([^"]+)"\]\{--menu-art:url\("menu-thumbnails/([^"]+)"\) !important;\}',
    css,
)
mapped = dict(pairs)
missing = sorted(menus - set(mapped))
stale = sorted(set(mapped) - menus)
missing_files = sorted(
    f"{name}: assets/menu-thumbnails/{asset}"
    for name, asset in mapped.items()
    if not (ROOT / "assets" / "menu-thumbnails" / asset).is_file()
)
signature = ["ชุดจุ่มหมูทะเล", "ชุดจุ่มเนื้อ", "ชุดจุ่มหมู", "ชุดจุ่มเดี่ยวหมู"]
signature_assets = [mapped.get(name) for name in signature]
errors = []
if missing:
    errors.append("missing menu mappings: " + ", ".join(missing))
if stale:
    errors.append("stale menu mappings: " + ", ".join(stale))
if missing_files:
    errors.append("missing files: " + "; ".join(missing_files))
if None in signature_assets or len(set(signature_assets)) != 4:
    errors.append("signature set assets must be 4 distinct files: " + repr(signature_assets))
if errors:
    raise SystemExit("\n".join(errors))
print(f"thumbnail coverage: {len(mapped)}/{len(menus)} (100%)")
print("signature set assets: 4/4 unique")
print("missing files: 0")

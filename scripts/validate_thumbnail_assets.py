#!/usr/bin/env python3
"""Validate recipe -> semantic atlas coverage without changing recipe semantics."""
from __future__ import annotations
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
recipe = json.loads((ROOT / "recipe_master.json").read_text(encoding="utf-8"))
css = (ROOT / "assets" / "menu-thumbnail-map.css").read_text(encoding="utf-8")
menus = set(recipe.get("categories", {}))

pattern = re.compile(
    r'\.menu-card\[data-menu="([^"]+)"\]\{'
    r'--menu-art:url\("menu-thumbnails/([^"]+)"\) !important;'
    r'--menu-art-x:([^;]+) !important;'
    r'--menu-art-y:([^;]+) !important;\}'
)
rows = pattern.findall(css)
mapped = {name: {"asset": asset, "x": x.strip(), "y": y.strip()} for name, asset, x, y in rows}
missing = sorted(menus - set(mapped))
stale = sorted(set(mapped) - menus)
errors: list[str] = []

if missing:
    errors.append("missing menu mappings: " + ", ".join(missing))
if stale:
    errors.append("stale menu mappings: " + ", ".join(stale))

atlas = ROOT / "assets" / "menu-thumbnails" / "semantic-atlas-v1.webp"
if not atlas.is_file():
    errors.append("missing atlas: assets/menu-thumbnails/semantic-atlas-v1.webp")

unexpected_assets = sorted({m["asset"] for m in mapped.values()} - {"semantic-atlas-v1.webp"})
if unexpected_assets:
    errors.append("exact mappings reference unexpected assets: " + ", ".join(unexpected_assets))

signature = ["ชุดจุ่มหมูทะเล", "ชุดจุ่มเนื้อ", "ชุดจุ่มหมู", "ชุดจุ่มเดี่ยวหมู"]
signature_regions = [(mapped.get(n, {}).get("x"), mapped.get(n, {}).get("y")) for n in signature]
if any(x is None or y is None for x, y in signature_regions) or len(set(signature_regions)) != 4:
    errors.append("signature sets must use 4 distinct atlas regions: " + repr(signature_regions))

reserved = ("80%", "66.667%")  # mushroom cell, no current menu
reserved_users = sorted(name for name, m in mapped.items() if (m["x"], m["y"]) == reserved)
if reserved_users:
    errors.append("reserved mushroom region is mapped by current menus: " + ", ".join(reserved_users))

# Semantic guardrails: these families must never fall through to ready-to-eat.
ready_region = ("100%", "100%")
for name, category in recipe.get("categories", {}).items():
    region = (mapped.get(name, {}).get("x"), mapped.get(name, {}).get("y"))
    if category in {"เนื้อสัตว์เพิ่มเติม", "ผักเพิ่มเติม", "เส้นเพิ่มเติม"} and region == ready_region:
        errors.append(f"semantic mismatch: {name} ({category}) -> ready-to-eat region")

if errors:
    raise SystemExit("\n".join(errors))

print(f"thumbnail coverage: {len(mapped)}/{len(menus)} (100%)")
print("atlas: assets/menu-thumbnails/semantic-atlas-v1.webp")
print("signature set regions: 4/4 unique")
print("reserved region misuse: 0")
print("semantic mismatch guards: pass")

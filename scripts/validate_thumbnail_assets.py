#!/usr/bin/env python3
"""Validate recipe -> semantic atlas coverage without changing recipe semantics."""
from __future__ import annotations
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
recipe = json.loads((ROOT / "recipe_master.json").read_text(encoding="utf-8"))
css = (ROOT / "assets" / "menu-thumbnail-map.css").read_text(encoding="utf-8")
menus = set(recipe.get("categories", {}))
atlas = ROOT / "assets" / "menu-thumbnails" / "semantic-atlas-v1.webp"
EXPECTED_ATLAS_SIZE = 59_500
EXPECTED_ATLAS_SHA256 = "1976697397b1581091dc3936412ac9789256b6bd0210ef8afdeac6ac375cd9b4"

block_re = re.compile(
    r'((?:\.menu-card\[data-menu="[^"]+"\],?)+)\{'
    r'--menu-art:url\("menu-thumbnails/semantic-atlas-v1\.webp"\) !important;'
    r'--menu-art-x:([^;]+) !important;'
    r'--menu-art-y:([^;]+) !important;\}'
)
name_re = re.compile(r'data-menu="([^"]+)"')
mapped = {}
for selectors, x, y in block_re.findall(css):
    for name in name_re.findall(selectors):
        mapped[name] = (x.strip(), y.strip())

errors = []
missing = sorted(menus - set(mapped))
stale = sorted(set(mapped) - menus)
if missing:
    errors.append("missing menu mappings: " + ", ".join(missing))
if stale:
    errors.append("stale menu mappings: " + ", ".join(stale))
if not atlas.is_file():
    errors.append("missing atlas: assets/menu-thumbnails/semantic-atlas-v1.webp")
else:
    atlas_bytes = atlas.read_bytes()
    if len(atlas_bytes) != EXPECTED_ATLAS_SIZE:
        errors.append(f"atlas size mismatch: {len(atlas_bytes)} != {EXPECTED_ATLAS_SIZE}")
    atlas_sha256 = hashlib.sha256(atlas_bytes).hexdigest()
    if atlas_sha256 != EXPECTED_ATLAS_SHA256:
        errors.append(f"atlas sha256 mismatch: {atlas_sha256} != {EXPECTED_ATLAS_SHA256}")

valid_x = {"0%", "20%", "40%", "60%", "80%", "100%"}
valid_y = {"0%", "25%", "50%", "75%", "100%"}
invalid = sorted(name for name, (x, y) in mapped.items() if x not in valid_x or y not in valid_y)
if invalid:
    errors.append("invalid 6x5 atlas region: " + ", ".join(invalid))

signature = ["ชุดจุ่มหมูทะเล", "ชุดจุ่มเนื้อ", "ชุดจุ่มหมู", "ชุดจุ่มเดี่ยวหมู"]
signature_regions = [mapped.get(name) for name in signature]
if None in signature_regions or len(set(signature_regions)) != 4:
    errors.append("signature sets must use 4 distinct regions: " + repr(signature_regions))

ready = ("40%", "100%")
for name, category in recipe.get("categories", {}).items():
    if category in {"เนื้อสัตว์เพิ่มเติม", "ผักเพิ่มเติม", "เส้นเพิ่มเติม"} and mapped.get(name) == ready:
        errors.append(f"semantic mismatch: {name} ({category}) -> ready-to-eat")

expected = {
    "กะหล่ำปลี": ("60%", "50%"),
    "คาลามารี": ("80%", "75%"),
    "ซาโมซ่ากล้วย": ("100%", "75%"),
    "สละลอยแก้ว": ("0%", "100%"),
    "ลูกตาลลอยแก้ว": ("0%", "100%"),
    "โมจิไอศครีม": ("20%", "100%"),
    "อิ่มเดี่ยว ต้มพร้อมทาน": ready,
    "อิ่มเดี่ยว หมูจุกจุก": ready,
    "ฟองเต้าหู้แท่ง": ("0%", "75%"),
    "ฟองเต้าหู้ทอด": ("0%", "75%"),
}
for name, region in expected.items():
    if mapped.get(name) != region:
        errors.append(f"semantic correction mismatch: {name} -> {mapped.get(name)}, expected {region}")

if "background-size:var(--menu-art-size,600% 500%)!important" not in css:
    errors.append("6x5 atlas geometry override missing")

if errors:
    raise SystemExit("\n".join(errors))

print(f"thumbnail coverage: {len(mapped)}/{len(menus)} (100%)")
print("atlas: assets/menu-thumbnails/semantic-atlas-v1.webp (6x5)")
print(f"atlas integrity: {EXPECTED_ATLAS_SIZE} bytes / sha256 {EXPECTED_ATLAS_SHA256}")
print("signature set regions: 4/4 unique")
print("semantic correction gates: pass")
print("semantic mismatch guards: pass")

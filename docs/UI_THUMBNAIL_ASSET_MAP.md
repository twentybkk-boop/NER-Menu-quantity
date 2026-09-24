# UI Thumbnail Asset Map

Source of truth: `recipe_master.json` on `main`; Phase 1 started from `a9b26e4768972de59fd6a1ac9e1aa0fccf0077ea`.

## Coverage summary

- Real menu count: **45**
- Exact current-menu mapping: **45/45 (100%)**
- Production packaging: **1 optimized WebP semantic atlas**, `assets/menu-thumbnails/semantic-atlas-v1.webp`
- Atlas geometry: **6 × 5**
- Illustrated semantic regions: **27** (3 unused cells)
- Four signature sets: **4/4 distinct artwork**
- Universal generic-pot fallback: **none**
- Unknown future names remain neutral unless a semantic-safe keyword fallback applies.

The final atlas corrects visual mismatches found during contact-sheet review: cabbage now reads as cabbage (not napa), ready-to-eat is a cooked hotpot bowl, tofu-skin is distinct from tofu, calamari is distinct from generic fried food, banana samosa is distinct from other desserts, and `ลอยแก้ว` / mochi use separate dessert artwork.

| Menu | Category | Semantic group | Atlas cell | Mode | Fallback? |
|---|---|---|---:|---|---|
| ชุดจุ่มหมูทะเล | อาหารเซ็ต | `set-seafood` | `0,0` | unique | no |
| ชุดจุ่มเนื้อ | อาหารเซ็ต | `set-beef` | `1,0` | unique | no |
| ชุดจุ่มหมู | อาหารเซ็ต | `set-pork` | `2,0` | unique | no |
| ชุดจุ่มเดี่ยวหมู | อาหารเซ็ต | `set-pork-single` | `3,0` | unique | no |
| อิ่มเดี่ยว ต้มพร้อมทาน | อาหารเซ็ต | `ready-to-eat` | `2,4` | shared | no |
| อิ่มเดี่ยว หมูจุกจุก | อาหารเซ็ต | `ready-to-eat` | `2,4` | shared | no |
| หมูล้วน (ไม่มีเครื่องใน) | เนื้อสัตว์เพิ่มเติม | `pork-shoulder` | `1,1` | shared | no |
| หมูหมัก NER | เนื้อสัตว์เพิ่มเติม | `pork-shoulder` | `1,1` | shared | no |
| สามชั้นหมูสไลซ์ | เนื้อสัตว์เพิ่มเติม | `pork-belly` | `4,0` | shared | no |
| สันคอ | เนื้อสัตว์เพิ่มเติม | `pork-neck` | `5,0` | shared | no |
| สันนอก | เนื้อสัตว์เพิ่มเติม | `pork-loin` | `0,1` | shared | no |
| ตับหมู | เนื้อสัตว์เพิ่มเติม | `organ` | `3,1` | shared | no |
| เซ่งจี๊หมู | เนื้อสัตว์เพิ่มเติม | `organ` | `3,1` | shared | no |
| เนื้อใบพายสไลซ์ | เนื้อสัตว์เพิ่มเติม | `beef` | `2,1` | shared | no |
| เนื้อริบอายสไลซ์ | เนื้อสัตว์เพิ่มเติม | `beef` | `2,1` | shared | no |
| เนื้อเสือร้องไห้สไลซ์ | เนื้อสัตว์เพิ่มเติม | `beef` | `2,1` | shared | no |
| เนื้อรวม | เนื้อสัตว์เพิ่มเติม | `beef` | `2,1` | shared | no |
| ปลาดอลลี่ | เนื้อสัตว์เพิ่มเติม | `fish` | `0,2` | shared | no |
| กุ้ง | เนื้อสัตว์เพิ่มเติม | `shrimp` | `4,1` | shared | no |
| ปลาหมึก | เนื้อสัตว์เพิ่มเติม | `squid` | `5,1` | shared | no |
| ชุดผักรวม | ผักเพิ่มเติม | `leafy-vegetables` | `2,2` | shared | no |
| กะหล่ำปลี | ผักเพิ่มเติม | `cabbage` | `3,2` | shared | no |
| ผักบุ้ง | ผักเพิ่มเติม | `leafy-vegetables` | `2,2` | shared | no |
| ผักชีฝรั่ง | ผักเพิ่มเติม | `leafy-vegetables` | `2,2` | shared | no |
| โหระพา | ผักเพิ่มเติม | `leafy-vegetables` | `2,2` | shared | no |
| ใบชะพลู | ผักเพิ่มเติม | `leafy-vegetables` | `2,2` | shared | no |
| วุ้นเส้น | เส้นเพิ่มเติม | `noodles` | `4,2` | shared | no |
| มาม่า | เส้นเพิ่มเติม | `noodles` | `4,2` | shared | no |
| หมี่หยก(สด) | เส้นเพิ่มเติม | `noodles` | `4,2` | shared | no |
| เส้นอุด้ง | เส้นเพิ่มเติม | `noodles` | `4,2` | shared | no |
| ไข่ไก่สด | เมนูเพิ่มเติม | `egg` | `1,3` | shared | no |
| เต้าหู้ปลา | เมนูเพิ่มเติม | `tofu` | `5,2` | shared | no |
| เต้าหู้ไข่ | เมนูเพิ่มเติม | `tofu` | `5,2` | shared | no |
| เต้าหู้ชีส | เมนูเพิ่มเติม | `tofu` | `5,2` | shared | no |
| ฟองเต้าหู้แท่ง | เมนูเพิ่มเติม | `tofu-skin` | `0,3` | shared | no |
| ฟองเต้าหู้ทอด | เมนูเพิ่มเติม | `tofu-skin` | `0,3` | shared | no |
| ข้าวเปล่า | เมนูเพิ่มเติม | `rice` | `2,3` | shared | no |
| ไก่ป๊อป | ของทานเล่น | `fried-bites` | `3,3` | shared | no |
| แฮชบราวน์ เทเทอร์ ทอตส์ | ของทานเล่น | `fried-bites` | `3,3` | shared | no |
| ข้าวเกรียบปลา | ของทานเล่น | `fried-bites` | `3,3` | shared | no |
| คาลามารี | ของทานเล่น | `calamari` | `4,3` | shared | no |
| ซาโมซ่ากล้วย | ของหวาน | `banana-samosa` | `5,3` | shared | no |
| สละลอยแก้ว | ของหวาน | `loy-kaew` | `0,4` | shared | no |
| ลูกตาลลอยแก้ว | ของหวาน | `loy-kaew` | `0,4` | shared | no |
| โมจิไอศครีม | ของหวาน | `mochi-icecream` | `1,4` | shared | no |

## Atlas layout

```text
row 0: set-seafood | set-beef | set-pork | set-pork-single | pork-belly | pork-neck
row 1: pork-loin | pork-shoulder | beef | organ | shrimp | squid
row 2: fish | seafood-generic | leafy-vegetables | cabbage | noodles | tofu
row 3: tofu-skin | egg | rice | fried-bites | calamari | banana-samosa
row 4: loy-kaew | mochi-icecream | ready-to-eat | [empty] | [empty] | [empty]
```

`seafood-generic` is retained only as a semantic-safe future fallback for names containing `ซีฟู้ด` / `ทะเล`; no current menu depends on it.

## Validation

`python scripts/validate_thumbnail_assets.py` verifies:

- recipe inventory and exact mapping coverage,
- stale or missing menu mappings,
- production atlas presence,
- valid 6×5 atlas coordinates,
- four distinct signature-set regions,
- semantic mismatch guards,
- explicit gates for cabbage, ready-to-eat, tofu-skin, calamari, banana samosa, `ลอยแก้ว`, and mochi,
- the CSS atlas geometry override.

Visual QA artifacts:

- production atlas: `assets/menu-thumbnails/semantic-atlas-v1.webp`
- browser contact sheet: `docs/UI_THUMBNAIL_CONTACT_SHEET.html`

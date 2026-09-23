# UI Thumbnail Asset Map

Source of truth: `recipe_master.json` on `main`; Phase 1 started from `a9b26e4768972de59fd6a1ac9e1aa0fccf0077ea`.

- Real menu count: **45**
- Active semantic thumbnail masters: **23**
- Packaging: **1 optimized WebP atlas** (`assets/menu-thumbnails/semantic-atlas-v1.webp`, 6×4 grid; one reserved mushroom cell)
- Exact current-menu coverage: **45/45 (100%)**
- Signature set artworks: **4/4 distinct atlas regions**
- Unknown future names remain neutral unless a semantic-safe keyword fallback applies; there is no universal ready-pot fallback.

| Menu | Category | Semantic group | Atlas region | Mode | Fallback used? |
|---|---|---|---|---|---|
| ชุดจุ่มหมูทะเล | อาหารเซ็ต | `set-menu-seafood` | `set-seafood` (`0,0`) | unique | no |
| ชุดจุ่มเนื้อ | อาหารเซ็ต | `set-menu-beef` | `set-beef` (`1,0`) | unique | no |
| ชุดจุ่มหมู | อาหารเซ็ต | `set-menu-pork` | `set-pork` (`2,0`) | unique | no |
| ชุดจุ่มเดี่ยวหมู | อาหารเซ็ต | `set-menu-pork-single` | `set-pork-single` (`3,0`) | unique | no |
| อิ่มเดี่ยว ต้มพร้อมทาน | อาหารเซ็ต | `ready-to-eat` | `ready-to-eat` (`5,3`) | shared | no |
| อิ่มเดี่ยว หมูจุกจุก | อาหารเซ็ต | `ready-to-eat` | `ready-to-eat` (`5,3`) | shared | no |
| หมูล้วน (ไม่มีเครื่องใน) | เนื้อสัตว์เพิ่มเติม | `pork-mixed` | `pork-shoulder` (`1,1`) | shared | no |
| หมูหมัก NER | เนื้อสัตว์เพิ่มเติม | `pork-marinated` | `pork-shoulder` (`1,1`) | shared | no |
| สามชั้นหมูสไลซ์ | เนื้อสัตว์เพิ่มเติม | `pork-belly` | `pork-belly` (`4,0`) | shared | no |
| สันคอ | เนื้อสัตว์เพิ่มเติม | `pork-neck` | `pork-neck` (`5,0`) | shared | no |
| สันนอก | เนื้อสัตว์เพิ่มเติม | `pork-loin` | `pork-loin` (`0,1`) | shared | no |
| ตับหมู | เนื้อสัตว์เพิ่มเติม | `organ-meat` | `organ` (`3,1`) | shared | no |
| เซ่งจี๊หมู | เนื้อสัตว์เพิ่มเติม | `organ-meat` | `organ` (`3,1`) | shared | no |
| เนื้อใบพายสไลซ์ | เนื้อสัตว์เพิ่มเติม | `beef` | `beef` (`2,1`) | shared | no |
| เนื้อริบอายสไลซ์ | เนื้อสัตว์เพิ่มเติม | `beef` | `beef` (`2,1`) | shared | no |
| เนื้อเสือร้องไห้สไลซ์ | เนื้อสัตว์เพิ่มเติม | `beef` | `beef` (`2,1`) | shared | no |
| เนื้อรวม | เนื้อสัตว์เพิ่มเติม | `beef` | `beef` (`2,1`) | shared | no |
| ปลาดอลลี่ | เนื้อสัตว์เพิ่มเติม | `fish` | `fish` (`0,2`) | shared | no |
| กุ้ง | เนื้อสัตว์เพิ่มเติม | `shrimp` | `shrimp` (`4,1`) | shared | no |
| ปลาหมึก | เนื้อสัตว์เพิ่มเติม | `squid` | `squid` (`5,1`) | shared | no |
| ชุดผักรวม | ผักเพิ่มเติม | `leafy-vegetables` | `leafy-vegetables` (`2,2`) | shared | no |
| กะหล่ำปลี | ผักเพิ่มเติม | `cabbage` | `napa-cabbage` (`3,2`) | shared | no |
| ผักบุ้ง | ผักเพิ่มเติม | `leafy-vegetables` | `leafy-vegetables` (`2,2`) | shared | no |
| ผักชีฝรั่ง | ผักเพิ่มเติม | `leafy-vegetables` | `leafy-vegetables` (`2,2`) | shared | no |
| โหระพา | ผักเพิ่มเติม | `leafy-vegetables` | `leafy-vegetables` (`2,2`) | shared | no |
| ใบชะพลู | ผักเพิ่มเติม | `leafy-vegetables` | `leafy-vegetables` (`2,2`) | shared | no |
| วุ้นเส้น | เส้นเพิ่มเติม | `noodles` | `noodles` (`5,2`) | shared | no |
| มาม่า | เส้นเพิ่มเติม | `noodles` | `noodles` (`5,2`) | shared | no |
| หมี่หยก(สด) | เส้นเพิ่มเติม | `noodles` | `noodles` (`5,2`) | shared | no |
| เส้นอุด้ง | เส้นเพิ่มเติม | `noodles` | `noodles` (`5,2`) | shared | no |
| ไข่ไก่สด | เมนูเพิ่มเติม | `egg` | `egg` (`1,3`) | shared | no |
| เต้าหู้ปลา | เมนูเพิ่มเติม | `tofu` | `tofu` (`0,3`) | shared | no |
| เต้าหู้ไข่ | เมนูเพิ่มเติม | `tofu` | `tofu` (`0,3`) | shared | no |
| เต้าหู้ชีส | เมนูเพิ่มเติม | `tofu` | `tofu` (`0,3`) | shared | no |
| ฟองเต้าหู้แท่ง | เมนูเพิ่มเติม | `tofu` | `tofu` (`0,3`) | shared | no |
| ฟองเต้าหู้ทอด | เมนูเพิ่มเติม | `tofu` | `tofu` (`0,3`) | shared | no |
| ข้าวเปล่า | เมนูเพิ่มเติม | `rice` | `rice` (`2,3`) | shared | no |
| ไก่ป๊อป | ของทานเล่น | `fried-food` | `fried` (`3,3`) | shared | no |
| แฮชบราวน์ เทเทอร์ ทอตส์ | ของทานเล่น | `fried-food` | `fried` (`3,3`) | shared | no |
| ข้าวเกรียบปลา | ของทานเล่น | `fried-food` | `fried` (`3,3`) | shared | no |
| คาลามารี | ของทานเล่น | `fried-food` | `fried` (`3,3`) | shared | no |
| ซาโมซ่ากล้วย | ของหวาน | `dessert` | `dessert` (`4,3`) | shared | no |
| สละลอยแก้ว | ของหวาน | `dessert` | `dessert` (`4,3`) | shared | no |
| ลูกตาลลอยแก้ว | ของหวาน | `dessert` | `dessert` (`4,3`) | shared | no |
| โมจิไอศครีม | ของหวาน | `dessert` | `dessert` (`4,3`) | shared | no |

## Atlas layout

```text
row 0: set-seafood | set-beef | set-pork | set-pork-single | pork-belly | pork-neck
row 1: pork-loin | pork-shoulder | beef | organ | shrimp | squid
row 2: fish | seafood | leafy-vegetables | napa-cabbage | [reserved mushroom] | noodles
row 3: tofu | egg | rice | fried | dessert | ready-to-eat
```

## QA

`python scripts/validate_thumbnail_assets.py` validates exact recipe coverage, stale mappings, atlas presence, unique signature-set regions, reserved-cell misuse, and semantic-safe family guards.

Visual contact sheet/gallery: `docs/UI_THUMBNAIL_CONTACT_SHEET.html`.

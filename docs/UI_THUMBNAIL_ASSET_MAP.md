# UI Thumbnail Asset Map

Source of truth: `recipe_master.json` on `main`, starting HEAD `a9b26e4768972de59fd6a1ac9e1aa0fccf0077ea`.

- Real menu count: **45**
- Master thumbnail assets: **23** (plus `contact-sheet.webp` QA artifact)
- Exact current-menu coverage: **45/45 (100%)**
- Signature set artworks: **4/4 unique**
- Unmatched future names intentionally remain neutral rather than using a misleading generic pot; keyword fallbacks cover known semantic families.

| Menu | Category | Semantic group | Asset | Mode | Fallback used? |
|---|---|---|---|---|---|
| ชุดจุ่มหมูทะเล | อาหารเซ็ต | `set-menu-seafood` | `assets/menu-thumbnails/set-seafood.webp` | unique | no |
| ชุดจุ่มเนื้อ | อาหารเซ็ต | `set-menu-beef` | `assets/menu-thumbnails/set-beef.webp` | unique | no |
| ชุดจุ่มหมู | อาหารเซ็ต | `set-menu-pork` | `assets/menu-thumbnails/set-pork.webp` | unique | no |
| ชุดจุ่มเดี่ยวหมู | อาหารเซ็ต | `set-menu-pork-single` | `assets/menu-thumbnails/set-pork-single.webp` | unique | no |
| อิ่มเดี่ยว ต้มพร้อมทาน | อาหารเซ็ต | `ready-to-eat` | `assets/menu-thumbnails/ready-to-eat.webp` | shared | no |
| อิ่มเดี่ยว หมูจุกจุก | อาหารเซ็ต | `ready-to-eat` | `assets/menu-thumbnails/ready-to-eat.webp` | shared | no |
| หมูล้วน (ไม่มีเครื่องใน) | เนื้อสัตว์เพิ่มเติม | `pork-mixed` | `assets/menu-thumbnails/pork-shoulder.webp` | shared | no |
| หมูหมัก NER | เนื้อสัตว์เพิ่มเติม | `pork-marinated` | `assets/menu-thumbnails/pork-shoulder.webp` | shared | no |
| สามชั้นหมูสไลซ์ | เนื้อสัตว์เพิ่มเติม | `pork-belly` | `assets/menu-thumbnails/pork-belly.webp` | shared | no |
| สันคอ | เนื้อสัตว์เพิ่มเติม | `pork-neck` | `assets/menu-thumbnails/pork-neck.webp` | shared | no |
| สันนอก | เนื้อสัตว์เพิ่มเติม | `pork-loin` | `assets/menu-thumbnails/pork-loin.webp` | shared | no |
| ตับหมู | เนื้อสัตว์เพิ่มเติม | `organ-meat` | `assets/menu-thumbnails/organ.webp` | shared | no |
| เซ่งจี๊หมู | เนื้อสัตว์เพิ่มเติม | `organ-meat` | `assets/menu-thumbnails/organ.webp` | shared | no |
| เนื้อใบพายสไลซ์ | เนื้อสัตว์เพิ่มเติม | `beef` | `assets/menu-thumbnails/beef.webp` | shared | no |
| เนื้อริบอายสไลซ์ | เนื้อสัตว์เพิ่มเติม | `beef` | `assets/menu-thumbnails/beef.webp` | shared | no |
| เนื้อเสือร้องไห้สไลซ์ | เนื้อสัตว์เพิ่มเติม | `beef` | `assets/menu-thumbnails/beef.webp` | shared | no |
| เนื้อรวม | เนื้อสัตว์เพิ่มเติม | `beef` | `assets/menu-thumbnails/beef.webp` | shared | no |
| ปลาดอลลี่ | เนื้อสัตว์เพิ่มเติม | `fish` | `assets/menu-thumbnails/fish.webp` | shared | no |
| กุ้ง | เนื้อสัตว์เพิ่มเติม | `shrimp` | `assets/menu-thumbnails/shrimp.webp` | shared | no |
| ปลาหมึก | เนื้อสัตว์เพิ่มเติม | `squid` | `assets/menu-thumbnails/squid.webp` | shared | no |
| ชุดผักรวม | ผักเพิ่มเติม | `leafy-vegetables` | `assets/menu-thumbnails/leafy-vegetables.webp` | shared | no |
| กะหล่ำปลี | ผักเพิ่มเติม | `cabbage` | `assets/menu-thumbnails/napa-cabbage.webp` | shared | no |
| ผักบุ้ง | ผักเพิ่มเติม | `leafy-vegetables` | `assets/menu-thumbnails/leafy-vegetables.webp` | shared | no |
| ผักชีฝรั่ง | ผักเพิ่มเติม | `leafy-vegetables` | `assets/menu-thumbnails/leafy-vegetables.webp` | shared | no |
| โหระพา | ผักเพิ่มเติม | `leafy-vegetables` | `assets/menu-thumbnails/leafy-vegetables.webp` | shared | no |
| ใบชะพลู | ผักเพิ่มเติม | `leafy-vegetables` | `assets/menu-thumbnails/leafy-vegetables.webp` | shared | no |
| วุ้นเส้น | เส้นเพิ่มเติม | `noodles` | `assets/menu-thumbnails/noodles.webp` | shared | no |
| มาม่า | เส้นเพิ่มเติม | `noodles` | `assets/menu-thumbnails/noodles.webp` | shared | no |
| หมี่หยก(สด) | เส้นเพิ่มเติม | `noodles` | `assets/menu-thumbnails/noodles.webp` | shared | no |
| เส้นอุด้ง | เส้นเพิ่มเติม | `noodles` | `assets/menu-thumbnails/noodles.webp` | shared | no |
| ไข่ไก่สด | เมนูเพิ่มเติม | `egg` | `assets/menu-thumbnails/egg.webp` | shared | no |
| เต้าหู้ปลา | เมนูเพิ่มเติม | `tofu` | `assets/menu-thumbnails/tofu.webp` | shared | no |
| เต้าหู้ไข่ | เมนูเพิ่มเติม | `tofu` | `assets/menu-thumbnails/tofu.webp` | shared | no |
| เต้าหู้ชีส | เมนูเพิ่มเติม | `tofu` | `assets/menu-thumbnails/tofu.webp` | shared | no |
| ฟองเต้าหู้แท่ง | เมนูเพิ่มเติม | `tofu` | `assets/menu-thumbnails/tofu.webp` | shared | no |
| ฟองเต้าหู้ทอด | เมนูเพิ่มเติม | `tofu` | `assets/menu-thumbnails/tofu.webp` | shared | no |
| ข้าวเปล่า | เมนูเพิ่มเติม | `rice` | `assets/menu-thumbnails/rice.webp` | shared | no |
| ไก่ป๊อป | ของทานเล่น | `fried-food` | `assets/menu-thumbnails/fried.webp` | shared | no |
| แฮชบราวน์ เทเทอร์ ทอตส์ | ของทานเล่น | `fried-food` | `assets/menu-thumbnails/fried.webp` | shared | no |
| ข้าวเกรียบปลา | ของทานเล่น | `fried-food` | `assets/menu-thumbnails/fried.webp` | shared | no |
| คาลามารี | ของทานเล่น | `fried-food` | `assets/menu-thumbnails/fried.webp` | shared | no |
| ซาโมซ่ากล้วย | ของหวาน | `dessert` | `assets/menu-thumbnails/dessert.webp` | shared | no |
| สละลอยแก้ว | ของหวาน | `dessert` | `assets/menu-thumbnails/dessert.webp` | shared | no |
| ลูกตาลลอยแก้ว | ของหวาน | `dessert` | `assets/menu-thumbnails/dessert.webp` | shared | no |
| โมจิไอศครีม | ของหวาน | `dessert` | `assets/menu-thumbnails/dessert.webp` | shared | no |

## QA

`python scripts/validate_thumbnail_assets.py` checks current recipe coverage, stale mappings, missing files, and the four signature-set uniqueness gate.

Visual QA artifact: `assets/menu-thumbnails/contact-sheet.webp`.

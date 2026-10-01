# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + durable artifacts + latest user review.

## CURRENT WORK HEAD — REAL-USAGE AUTO REPLACEMENT DEFECT ACTIVE

User reported a new real-usage workflow defect after the previous bugfix scope was closed.

### USER-REPORTED BEHAVIOR
Current exclusion flow wastes time because selecting `ไม่เอา` auto-opens the replacement dropdown immediately. Expected operational flow is:
- user can tap several `ไม่เอา` choices in sequence without being interrupted by a dropdown
- replacement is chosen automatically
- if, for example, 4 of 5 eligible items in one category are excluded, the remaining eligible item in that same category should become the automatic replacement
- automatic replacement must stay in the excluded item's category while at least one eligible in-set item from that category remains
- cross-category fallback is allowed only when no eligible item from the excluded item's category remains in the current set
- automatic replacement may NEVER choose an item outside the current menu/set (existing invariant)

### VERIFIED CURRENT CODE FINDING
`index.html` currently does all of the following:
- `getSortedReplacementOptions(menuName, excludedItem)` already filters replacement-rule targets through `menuBaseIngredients.includes(repItem)`, preserving the existing no-outside-set invariant
- `getSortedValidReplacements(...)` returns selectable candidates
- `toggleExclude(item)` assigns `valid[0] || ''` but also sets `openReplacementPicker = item`, causing the dropdown to open after every exclusion
- `checkAndFixFallbacks()` only replaces a current mapping if it becomes invalid; category preference is not enforced as a first-class invariant
- `veggieGroups` already represents the existing non-meat/veg-side grouping used by replacement ordering; items outside that list form the complementary category for this behavior

### ACCEPTED / DO NOT REOPEN
All previously accepted scopes remain closed unless directly contradicted by this new defect:
- V4 UAT-001–UAT-014 visual work
- multi-item shrimp pooling
- bundled import integrity
- transactional Excel import validation
- Matrix numeric edit validation
- startup recipe master runtime integrity
- authoritative recipe data

### DO NOT REPEAT
- do not perform repo-wide investigation
- do not change `recipe_master.json`
- do not weaken the existing no-outside-set rule
- do not reopen visual/background work
- do not remove manual replacement capability unless required; the defect is automatic interruption, not the existence of the picker

## EXACT NEXT ACTION
1. Inspect only the exact `index.html` exclusion/replacement functions and the existing interaction contract that currently expects the picker to auto-open.
2. Implement category-first automatic replacement:
   - same category candidates first
   - cross-category candidates only when same-category candidates are exhausted
   - current set only
3. Stop automatically opening the replacement picker from `toggleExclude()`; keep manual picker available when the user explicitly taps its trigger.
4. Add/update permanent regression coverage for:
   - repeated exclusions do not auto-open dropdown
   - 4-of-5 same-category exclusions converge automatically to the remaining same-category item
   - cross-category fallback only after same-category exhaustion
   - no outside-set auto replacement
5. Run UI QA and persist the result before requesting user re-review.

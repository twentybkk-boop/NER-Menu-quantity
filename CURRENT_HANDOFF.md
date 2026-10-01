# CURRENT HANDOFF — NER Menu Quantity

> CRASH-SAFE CONTINUATION — CURRENT GITHUB `main` WINS.
> Source of truth: current GitHub `main` + actual code/assets + `recipe_master.json` + GitHub Actions + durable artifacts + latest user review.

## CURRENT WORK HEAD — REAL-USAGE AUTO REPLACEMENT DEFECT / GUARDED REPAIR RUNNING

User reported a new real-usage workflow defect after the previous bugfix scope was closed.

### USER-REPORTED BEHAVIOR
Current exclusion flow wastes time because selecting `ไม่เอา` auto-opens the replacement dropdown immediately. Expected operational flow is:
- user can tap several `ไม่เอา` choices in sequence without being interrupted by a dropdown
- replacement is chosen automatically
- if 4 of 5 eligible items in one category are excluded, the remaining eligible item in that same category becomes the automatic replacement
- automatic replacement stays in the excluded item's category while at least one eligible in-set item from that category remains
- cross-category fallback is allowed only when no eligible item from the excluded item's category remains in the current set
- automatic replacement may NEVER choose an item outside the current menu/set
- manual replacement selection remains available only when the operator explicitly taps its trigger

### VERIFIED CURRENT CODE FINDING
Before repair:
- `getSortedReplacementOptions(menuName, excludedItem)` already filtered targets through `menuBaseIngredients.includes(repItem)`, preserving the no-outside-set invariant
- `toggleExclude(item)` assigned `valid[0] || ''` and also set `openReplacementPicker = item`, causing the dropdown to interrupt every exclusion
- `checkAndFixFallbacks()` only corrected invalid mappings; same-category preference was not enforced as an auto invariant
- `veggieGroups` is the existing veg-side/non-meat grouping; items outside it form the complementary category

### DURABLE WORK THIS DEFECT
- defect checkpoint commit `941e93460c4b4645bf3fed79dfa9fe6199dc9c62`
- permanent regression contract added: `qa/auto-replacement-flow-contract.mjs`
  - commit `ce0908c8b3a47ca55b60d06a979b556a61bd8291`
  - covers silent repeated exclusions, 4-of-5 convergence, category exhaustion, return to same category, explicit manual picker, and no-outside-set
- guarded repair workflow added: `.github/workflows/repair-auto-replacement-flow.yml`
  - commit `ef2f5e848a54dbea570b8da319fcc4072ca2b8b5`
- repair trigger marker: `repair-staging/auto-replacement/RUN_FIX`
  - commit `a5d72618f752fe95b92628bc2c46240ed8f69d9f`
- repair run `36837106598`
  - workflow: `Repair auto replacement flow`
  - bounded-read status: `in_progress`
  - no repeated polling performed at this checkpoint

### INTENDED GUARDED PRODUCT PATCH
The repair workflow is guarded to change only `index.html` and will:
- add automatic/manual replacement-state separation
- auto-pick randomly from same-category valid in-set candidates first
- cross category only when same-category valid candidates are exhausted
- dynamically return automatic mappings to same category if a same-category item becomes available again
- stop `toggleExclude()` from auto-opening the picker
- keep explicit manual picker/selection available
- keep `menuBaseIngredients.includes(repItem)` no-outside-set protection
- update operator copy to explain automatic replacement

### ACCEPTED / DO NOT REOPEN
All previous accepted scopes remain closed unless directly contradicted by new evidence:
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
- do not weaken no-outside-set behavior
- do not reopen visual/background work
- do not remove manual replacement capability
- do not trigger another repair while run `36837106598` is unresolved

## EXACT NEXT ACTION
1. Read repair run `36837106598` once.
2. If success: verify the bot product commit changes only `index.html` and contains the intended category-first/no-auto-open logic.
3. Wire `qa/auto-replacement-flow-contract.mjs` into permanent UI QA LOCAL + DEPLOYED.
4. Update the existing landscape interaction contract that still assumes `toggleExclude()` auto-opens the picker.
5. Run full UI QA and Pages verification.
6. If all pass, remove temporary repair workflow/trigger marker, verify cleanup scope, and persist READY FOR USER REAL-USAGE RE-REVIEW.

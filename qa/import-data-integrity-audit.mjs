import fs from 'node:fs';

export function auditImportedRecipeData(baseMenu, replaceRules) {
  const mismatchedMenus = [];
  const invalidExcludes = [];
  const duplicateRules = [];
  const noOptions = [];
  const ruleMap = new Map();

  for (const [index, rawRule] of (replaceRules || []).entries()) {
    const menu = String(rawRule?.menu || '').trim();
    const exclude = String(rawRule?.exclude || '').trim();
    const key = `${menu}\u0000${exclude}`;

    if (ruleMap.has(key)) duplicateRules.push({ menu, exclude, firstIndex: ruleMap.get(key).index, duplicateIndex: index });
    else ruleMap.set(key, { ...rawRule, menu, exclude, index });

    if (!Object.prototype.hasOwnProperty.call(baseMenu || {}, menu)) {
      mismatchedMenus.push({ menu, exclude, index });
      continue;
    }
    if (!Object.prototype.hasOwnProperty.call(baseMenu[menu] || {}, exclude)) {
      invalidExcludes.push({ menu, exclude, index });
    }
  }

  for (const [menu, recipe] of Object.entries(baseMenu || {})) {
    const ingredients = Object.keys(recipe || {});
    if (ingredients.length <= 1) continue;
    const ingredientSet = new Set(ingredients);

    for (const exclude of ingredients) {
      const rule = ruleMap.get(`${menu}\u0000${exclude}`);
      if (!rule) {
        noOptions.push({ menu, exclude, reason: 'missing-rule' });
        continue;
      }
      const visibleOptions = Object.keys(rule.replace || {}).filter(rep => rep !== exclude && ingredientSet.has(rep));
      if (visibleOptions.length === 0) noOptions.push({ menu, exclude, reason: 'no-base-overlap' });
    }
  }

  return { mismatchedMenus, invalidExcludes, duplicateRules, noOptions };
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  const data = JSON.parse(fs.readFileSync(new URL('../recipe_master.json', import.meta.url), 'utf8'));
  const result = auditImportedRecipeData(data.baseMenu, data.replaceRules);
  const counts = Object.fromEntries(Object.entries(result).map(([key, rows]) => [key, rows.length]));
  console.log(`IMPORT_DATA_AUDIT_COUNTS=${JSON.stringify(counts)}`);
  for (const [kind, rows] of Object.entries(result)) {
    if (rows.length) console.log(`IMPORT_DATA_AUDIT_${kind.toUpperCase()}=${JSON.stringify(rows)}`);
  }
  if (Object.values(counts).some(count => count > 0)) process.exitCode = 1;
}

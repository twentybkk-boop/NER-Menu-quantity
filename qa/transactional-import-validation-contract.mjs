import assert from 'node:assert/strict';
import fs from 'node:fs';
import { auditImportedRecipeData } from './import-data-integrity-audit.mjs';

const emptyCounts = (result) => Object.values(result).every(rows => rows.length === 0);

const validBase = {
  'เมนูทดสอบ': { 'หมูหมัก': 1, 'ปลาหมึก': 1 }
};
const validRules = [
  { menu: 'เมนูทดสอบ', exclude: 'หมูหมัก', replace: { 'หมูหมัก': 0, 'ปลาหมึก': 1 } },
  { menu: 'เมนูทดสอบ', exclude: 'ปลาหมึก', replace: { 'หมูหมัก': 1, 'ปลาหมึก': 0 } }
];

assert.equal(emptyCounts(auditImportedRecipeData(validBase, validRules)), true, 'valid parsed workbook data must pass integrity validation');

const mismatchedMenu = auditImportedRecipeData(validBase, [
  ...validRules,
  { menu: 'เมนูไม่มีจริง', exclude: 'หมูหมัก', replace: { 'ปลาหมึก': 1 } }
]);
assert.equal(mismatchedMenu.mismatchedMenus.length, 1, 'missing menu must be detected');

const invalidExclude = auditImportedRecipeData(validBase, [
  ...validRules,
  { menu: 'เมนูทดสอบ', exclude: 'วัตถุดิบไม่มีจริง', replace: { 'ปลาหมึก': 1 } }
]);
assert.equal(invalidExclude.invalidExcludes.length, 1, 'exclude outside parsed base recipe must be detected');

const duplicateRule = auditImportedRecipeData(validBase, [
  ...validRules,
  { menu: 'เมนูทดสอบ', exclude: 'หมูหมัก', replace: { 'ปลาหมึก': 1 } }
]);
assert.equal(duplicateRule.duplicateRules.length, 1, 'duplicate (menu, exclude) rule must be detected');

const noOptions = auditImportedRecipeData(validBase, [
  { menu: 'เมนูทดสอบ', exclude: 'หมูหมัก', replace: { 'หมูหมัก': 1 } },
  { menu: 'เมนูทดสอบ', exclude: 'ปลาหมึก', replace: { 'ปลาหมึก': 1 } }
]);
assert.equal(noOptions.noOptions.length, 2, 'multi-ingredient exclusions without base-overlap replacements must be detected');

const source = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const start = source.indexOf('    function importExcelData(event) {');
const end = source.indexOf('\n\n    function downloadJSON()', start);
assert.ok(start >= 0 && end > start, 'importExcelData() must be discoverable');
const handler = source.slice(start, end);

const liveAssignments = [
  'originalMenu = newOriginalMenu;',
  'menuCategories = newMenuCategories;',
  'replaceUseRules = newReplaceRules;',
  'allIngredientsList = repIngredientsList;'
];
for (const assignment of liveAssignments) {
  assert.ok(handler.includes(assignment), `expected live-state assignment missing: ${assignment}`);
}

const firstAssignmentIndex = Math.min(...liveAssignments.map(assignment => handler.indexOf(assignment)));
const validationCall = 'validateImportedRecipeData(newOriginalMenu, newReplaceRules)';
const validationIndex = handler.indexOf(validationCall);

assert.ok(validationIndex >= 0, 'transactional import validation gate is missing before live-state replacement');
assert.ok(validationIndex < firstAssignmentIndex, 'transactional import validation must run before any live-state assignment');

console.log('transactional Excel import validation contract: PASS');

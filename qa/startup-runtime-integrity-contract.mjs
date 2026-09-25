import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

function extract(startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start);
  assert.ok(start >= 0 && end > start, `${startMarker} must be discoverable in production index.html`);
  return source.slice(start, end).trim();
}

const loadDataSource = extract(
  'async function loadData() {',
  '\n\n    function initMenus() {'
);
const validatorSource = extract(
  'function validateImportedRecipeData(baseMenu, replaceRules) {',
  '\n\n    function hasImportValidationErrors(result) {'
);

const initialState = {
  originalMenu: { 'ข้อมูลเดิม': { 'กุ้ง': 9 } },
  menuCategories: { 'ข้อมูลเดิม': 'เดิม' },
  replaceUseRules: [{ menu: 'ข้อมูลเดิม', exclude: 'กุ้ง', replace: {} }],
  allIngredientsList: ['กุ้ง'],
};

const validPayload = {
  categories: { 'เมนูทดสอบ': 'ทดสอบ' },
  baseMenu: { 'เมนูทดสอบ': { 'กุ้ง': 2, 'หมูหมัก': 3 } },
  replaceRules: [
    { menu: 'เมนูทดสอบ', exclude: 'กุ้ง', replace: { 'หมูหมัก': 1 } },
    { menu: 'เมนูทดสอบ', exclude: 'หมูหมัก', replace: { 'กุ้ง': 1 } },
  ],
  ingredients: ['กุ้ง', 'หมูหมัก'],
};

const invalidPayloads = {
  mismatchedMenus: {
    ...validPayload,
    replaceRules: [
      ...validPayload.replaceRules,
      { menu: 'เมนูไม่มีจริง', exclude: 'กุ้ง', replace: { 'หมูหมัก': 1 } },
    ],
  },
  invalidExcludes: {
    ...validPayload,
    replaceRules: [
      ...validPayload.replaceRules,
      { menu: 'เมนูทดสอบ', exclude: 'วัตถุดิบไม่มีจริง', replace: { 'กุ้ง': 1 } },
    ],
  },
  duplicateRules: {
    ...validPayload,
    replaceRules: [
      ...validPayload.replaceRules,
      { menu: 'เมนูทดสอบ', exclude: 'กุ้ง', replace: { 'หมูหมัก': 2 } },
    ],
  },
  noOptions: {
    ...validPayload,
    replaceRules: [
      { menu: 'เมนูทดสอบ', exclude: 'กุ้ง', replace: { 'วัตถุดิบไม่มีจริง': 1 } },
      validPayload.replaceRules[1],
    ],
  },
};

async function exercise(payload) {
  const elements = { 'app-menus': { innerHTML: 'OLD_UI' } };
  const context = {
    console,
    Date,
    Object,
    Map,
    Set,
    Array,
    String,
    JSON,
    Promise,
    fetch: async () => ({ ok: true, status: 200, json: async () => structuredClone(payload) }),
    structuredClone,
  };
  vm.createContext(context);
  vm.runInContext(`
    var GITHUB_JSON_URL = 'https://example.test/recipe_master.json';
    var originalMenu = ${JSON.stringify(initialState.originalMenu)};
    var menuCategories = ${JSON.stringify(initialState.menuCategories)};
    var replaceUseRules = ${JSON.stringify(initialState.replaceUseRules)};
    var allIngredientsList = ${JSON.stringify(initialState.allIngredientsList)};
    var initCalls = 0;
    var matrixCalls = 0;
    var elements = { 'app-menus': { innerHTML: 'OLD_UI' } };
    function el(id) { return elements[id]; }
    function initMenus() { initCalls += 1; }
    function renderMatrixTable() { matrixCalls += 1; }
    ${validatorSource}
    ${loadDataSource}
  `, context);

  const finding = context.validateImportedRecipeData(payload.baseMenu, payload.replaceRules);
  await context.loadData();
  return {
    finding: structuredClone(finding),
    originalMenu: structuredClone(context.originalMenu),
    menuCategories: structuredClone(context.menuCategories),
    replaceUseRules: structuredClone(context.replaceUseRules),
    allIngredientsList: structuredClone(context.allIngredientsList),
    initCalls: context.initCalls,
    matrixCalls: context.matrixCalls,
    appMenusHtml: context.elements['app-menus'].innerHTML,
  };
}

const valid = await exercise(validPayload);
assert.deepEqual(valid.finding, { mismatchedMenus: [], invalidExcludes: [], duplicateRules: [], noOptions: [] }, 'valid fixture must be integrity-clean');
assert.deepEqual(valid.originalMenu, validPayload.baseMenu, 'valid startup payload must populate originalMenu');
assert.deepEqual(valid.menuCategories, validPayload.categories, 'valid startup payload must populate categories');
assert.deepEqual(valid.replaceUseRules, validPayload.replaceRules, 'valid startup payload must populate replace rules');
assert.deepEqual(valid.allIngredientsList, validPayload.ingredients, 'valid startup payload must populate ingredients');
assert.equal(valid.initCalls, 1, 'valid startup payload must initialize menus once');
assert.equal(valid.matrixCalls, 1, 'valid startup payload must render Matrix once');
console.log('STARTUP_RUNTIME_VALID_CASE=' + JSON.stringify({ initCalls: valid.initCalls, matrixCalls: valid.matrixCalls }));

for (const [kind, payload] of Object.entries(invalidPayloads)) {
  const observed = await exercise(payload);
  assert.ok(observed.finding[kind]?.length > 0, `${kind}: fixture must contain the intended integrity finding`);
  console.log(`STARTUP_RUNTIME_INVALID_${kind.toUpperCase()}=` + JSON.stringify({
    findingCount: observed.finding[kind].length,
    committedMenuNames: Object.keys(observed.originalMenu),
    initCalls: observed.initCalls,
    matrixCalls: observed.matrixCalls,
  }));
  assert.deepEqual(observed.originalMenu, initialState.originalMenu, `${kind}: invalid startup payload must preserve previous originalMenu`);
  assert.deepEqual(observed.menuCategories, initialState.menuCategories, `${kind}: invalid startup payload must preserve previous menuCategories`);
  assert.deepEqual(observed.replaceUseRules, initialState.replaceUseRules, `${kind}: invalid startup payload must preserve previous replaceUseRules`);
  assert.deepEqual(observed.allIngredientsList, initialState.allIngredientsList, `${kind}: invalid startup payload must preserve previous allIngredientsList`);
  assert.equal(observed.initCalls, 0, `${kind}: invalid startup payload must not initialize menus`);
  assert.equal(observed.matrixCalls, 0, `${kind}: invalid startup payload must not render Matrix`);
}

console.log('Startup recipe runtime integrity contract: PASS');

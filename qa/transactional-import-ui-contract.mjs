import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium } from 'playwright';

const base = process.env.TRANSACTIONAL_IMPORT_BASE || 'http://127.0.0.1:8000/';
const prefix = process.env.TRANSACTIONAL_IMPORT_PREFIX || 'local';
const artifactDir = 'qa-artifacts';
fs.mkdirSync(artifactDir, { recursive: true });

async function workbookBuffer(page, kind) {
  const bytes = await page.evaluate(kindName => {
    if (typeof XLSX === 'undefined') throw new Error('XLSX browser library is unavailable');
    const workbook = XLSX.utils.book_new();
    const originalRows = [
      ['หมวด', 'ชื่อเมนู', 'หมูหมัก', 'ปลาหมึก'],
      ['', '', '', ''],
      ['ทดสอบ', 'เมนูทดสอบ', 1, 1]
    ];
    const replacementRows = kindName === 'invalid'
      ? [
          ['เมนู', 'หัก', 'หมูหมัก', 'ปลาหมึก'],
          ['เมนูไม่มีจริง', 'หมูหมัก', 0, 1]
        ]
      : [
          ['เมนู', 'หัก', 'หมูหมัก', 'ปลาหมึก'],
          ['เมนูทดสอบ', 'หมูหมัก', 0, 1],
          ['', 'ปลาหมึก', 1, 0]
        ];
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(originalRows), 'Original menu');
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(replacementRows), 'Replace Use');
    return Array.from(new Uint8Array(XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })));
  }, kind);
  return Buffer.from(bytes);
}

async function liveStateSnapshot(page) {
  return page.evaluate(() => JSON.stringify({ originalMenu, menuCategories, replaceUseRules, allIngredientsList }));
}

async function runViewport(browser, label, viewport) {
  const page = await browser.newPage({ viewport });
  const dialogs = [];
  page.on('dialog', async dialog => {
    dialogs.push(dialog.message());
    await dialog.accept();
  });

  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => typeof XLSX !== 'undefined' && typeof openMatrix === 'function' && Object.keys(originalMenu || {}).length > 0, null, { timeout: 30000 });

  const beforeInvalid = await liveStateSnapshot(page);
  await page.evaluate(() => openMatrix());
  await page.locator('#matrixModal').waitFor({ state: 'visible' });

  const invalid = await workbookBuffer(page, 'invalid');
  await page.locator('#excelInput').setInputFiles({
    name: 'invalid-transactional-import.xlsx',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    buffer: invalid
  });

  const errorBanner = page.locator('#importStatus.error');
  await errorBanner.waitFor({ state: 'visible' });
  const errorText = await errorBanner.innerText();
  assert.match(errorText, /นำเข้าไม่สำเร็จ — ตรวจพบข้อมูลไม่สอดคล้อง/, 'invalid import must show the validation summary header');
  assert.match(errorText, /เมนูใน Replace Use ไม่พบใน Original menu/, 'invalid import must identify mismatched menu linkage');
  assert.match(errorText, /ข้อมูลเดิมยังไม่ถูกเปลี่ยน/, 'invalid import must tell the manager that prior live data was preserved');
  assert.equal(await liveStateSnapshot(page), beforeInvalid, 'invalid workbook must not replace any live recipe state');
  assert.equal(dialogs.length, 0, 'validation rejection must not show the success alert');

  await page.screenshot({ path: `${artifactDir}/33-${prefix}-${label}-import-validation-error.png`, fullPage: false });

  const valid = await workbookBuffer(page, 'valid');
  await page.locator('#excelInput').setInputFiles({
    name: 'valid-transactional-import.xlsx',
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    buffer: valid
  });

  const successBanner = page.locator('#importStatus.success');
  await successBanner.waitFor({ state: 'visible' });
  assert.match(await successBanner.innerText(), /นำเข้าสำเร็จ • 1 เมนู • 2 กฎการแทนที่/, 'valid import must show concise success status');
  assert.ok(dialogs.includes('อัปโหลดและแปลงข้อมูลสำเร็จ!'), 'valid import must preserve the existing success alert');

  const imported = await page.evaluate(() => ({
    menus: Object.keys(originalMenu),
    recipe: originalMenu['เมนูทดสอบ'],
    ruleCount: replaceUseRules.length,
    ingredients: allIngredientsList
  }));
  assert.deepEqual(imported.menus, ['เมนูทดสอบ'], 'valid workbook must replace live menu state after validation');
  assert.deepEqual(imported.recipe, { 'หมูหมัก': 1, 'ปลาหมึก': 1 }, 'valid workbook recipe must be committed intact');
  assert.equal(imported.ruleCount, 2, 'valid workbook replacement rules must be committed');
  assert.deepEqual(imported.ingredients, ['หมูหมัก', 'ปลาหมึก'], 'valid workbook ingredient list must be committed');

  await page.screenshot({ path: `${artifactDir}/34-${prefix}-${label}-import-validation-success.png`, fullPage: false });
  await page.close();
}

const browser = await chromium.launch();
try {
  await runViewport(browser, 'desktop', { width: 1280, height: 900 });
  await runViewport(browser, 'phone', { width: 390, height: 844 });
  console.log(`transactional import browser acceptance: PASS (${base})`);
} finally {
  await browser.close();
}

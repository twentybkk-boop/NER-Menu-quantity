import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

/*
 * Runtime compatibility wrapper for qa/ui-qa.mjs.
 *
 * The legacy base harness contains the manager/PIN regression path and should not be
 * wholesale rewritten just to change thumbnail presentation assertions. This wrapper
 * updates only the old atlas-specific thumbnail contract in an ephemeral copy, then
 * executes the complete original harness unchanged for all business/Matrix behavior.
 */

const sourcePath = path.resolve('qa/ui-qa.mjs');
const runtimePath = path.resolve('qa/.ui-qa-runtime.mjs');
let source = fs.readFileSync(sourcePath, 'utf8');

const oldBlock = `  const thumbs = await page.locator('.menu-card').evaluateAll(cards => cards.map(card => {
    const s = getComputedStyle(card, '::before');
    return { img:s.backgroundImage, size:s.backgroundSize, pos:s.backgroundPosition };
  }));
  assert.equal(thumbs.length, 45, \`${'${deviceName}'}: thumbnail count mismatch\`);
  assert.ok(thumbs.every(t => /semantic-atlas-v1\\.webp/.test(t.img)), \`${'${deviceName}'}: unresolved thumbnail\`);
  assert.ok(thumbs.every(t => t.size === '600% 500%'), \`${'${deviceName}'}: atlas crop geometry mismatch\`);

  const signatures = await page.evaluate(() => ['ชุดจุ่มหมูทะเล','ชุดจุ่มเนื้อ','ชุดจุ่มหมู','ชุดจุ่มเดี่ยวหมู'].map(name => {
    const el = document.querySelector(\`.menu-card[data-menu="${'${name}'}"]\`);
    return getComputedStyle(el, '::before').backgroundPosition;
  }));
  assert.equal(new Set(signatures).size, 4, \`${'${deviceName}'}: signature sets are not visually distinct regions\`);`;

const newBlock = `  const thumbs = await page.locator('.menu-card').evaluateAll(cards => cards.map(card => {
    const s = getComputedStyle(card, '::before');
    return { img:s.backgroundImage, content:s.content, display:s.display };
  }));
  assert.equal(thumbs.length, 45, \`${'${deviceName}'}: thumbnail count mismatch\`);
  assert.ok(thumbs.every(t => !/semantic-atlas-v1\\.webp/.test(t.img)), \`${'${deviceName}'}: rejected food-photo atlas is still painted\`);
  assert.ok(thumbs.every(t => /gradient/.test(t.img)), \`${'${deviceName}'}: infographic tile treatment missing\`);
  assert.ok(thumbs.every(t => t.content && t.content !== '\"\"'), \`${'${deviceName}'}: unresolved infographic pictogram\`);
  assert.ok(thumbs.every(t => t.display === 'grid'), \`${'${deviceName}'}: infographic tile alignment drifted\`);

  const signatures = await page.evaluate(() => ['ชุดจุ่มหมูทะเล','ชุดจุ่มเนื้อ','ชุดจุ่มหมู','ชุดจุ่มเดี่ยวหมู'].map(name => {
    const el = document.querySelector(\`.menu-card[data-menu="${'${name}'}"]\`);
    return getComputedStyle(el, '::before').content;
  }));
  assert.equal(new Set(signatures).size, 4, \`${'${deviceName}'}: signature infographic pictograms are not distinct\`);`;

if (!source.includes(oldBlock)) {
  throw new Error('ui-qa atlas assertion block changed; update qa/ui-qa-runner.mjs intentionally instead of silently patching the wrong source');
}

source = source.replace(oldBlock, newBlock);
fs.writeFileSync(runtimePath, source, 'utf8');
try {
  await import(`${pathToFileURL(runtimePath).href}?v=${Date.now()}`);
} finally {
  fs.rmSync(runtimePath, { force: true });
}

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

/*
 * Runtime compatibility wrapper for qa/ui-qa.mjs.
 *
 * The legacy base harness contains the manager/PIN regression path and should not be
 * wholesale rewritten just to change presentation assertions. This wrapper updates
 * only known presentation contracts in an ephemeral copy, then executes the complete
 * original harness unchanged for all business/Matrix behavior.
 */

const sourcePath = path.resolve('qa/ui-qa.mjs');
const runtimePath = path.resolve('qa/.ui-qa-runtime.mjs');
let source = fs.readFileSync(sourcePath, 'utf8');

const oldBackgroundBlock = `  const background = await page.evaluate(() => getComputedStyle(document.body, '::before').backgroundImage);
  assert.match(background, /background-master\\.webp/, \`${'${deviceName}'}: background master not active\`);
  assert.match(background, /radial-gradient/, \`${'${deviceName}'}: central readability veil not active\`);`;

const newBackgroundBlock = `  const background = await page.evaluate(() => getComputedStyle(document.body, '::before').backgroundImage);
  const isPortrait = deviceName.endsWith('/iphone') || deviceName.endsWith('/ipad-portrait');
  if (isPortrait) {
    assert.match(background, /background-portrait-garden-v1\\.webp/, \`${'${deviceName}'}: approved portrait background not active\`);
    assert.doesNotMatch(background, /background-landscape-garden-v1\\.webp/, \`${'${deviceName}'}: landscape background leaked into portrait\`);
    assert.doesNotMatch(background, /background-master\\.webp/, \`${'${deviceName}'}: legacy master leaked into portrait\`);
  } else {
    assert.match(background, /background-landscape-garden-v1\\.webp/, \`${'${deviceName}'}: approved landscape background not active\`);
    assert.doesNotMatch(background, /background-portrait-garden-v1\\.webp/, \`${'${deviceName}'}: portrait background leaked into landscape\`);
    assert.doesNotMatch(background, /background-master\\.webp/, \`${'${deviceName}'}: legacy master still active in landscape\`);
  }
  assert.match(background, /radial-gradient/, \`${'${deviceName}'}: central readability veil not active\`);`;

if (!source.includes(oldBackgroundBlock)) {
  throw new Error('ui-qa background assertion block changed; update qa/ui-qa-runner.mjs intentionally instead of silently patching the wrong source');
}
source = source.replace(oldBackgroundBlock, newBackgroundBlock);

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

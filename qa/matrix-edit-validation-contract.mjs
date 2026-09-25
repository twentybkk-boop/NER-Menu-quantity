import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const startMarker = '    function editMatrixCell(rowIndex, ingredient, currentValue) {';
const endMarker = '\n\n    function renderMatrixTable() {';
const start = source.indexOf(startMarker);
const end = source.indexOf(endMarker, start);
assert.ok(start >= 0 && end > start, 'editMatrixCell() must be discoverable in production index.html');
const functionSource = source.slice(start, end).trim();

function exercise(input, initialValue = 2.5) {
  let renders = 0;
  const context = {
    replaceUseRules: [{ menu: 'เมนูทดสอบ', exclude: 'หมูหมัก', replace: { 'กุ้ง': initialValue } }],
    prompt: () => input,
    renderMatrixTable: () => { renders += 1; },
    console,
    Number,
    parseFloat,
  };
  vm.createContext(context);
  vm.runInContext(functionSource, context);
  context.editMatrixCell(0, 'กุ้ง', initialValue);
  return { value: context.replaceUseRules[0].replace['กุ้ง'], renders };
}

const observations = {
  validInteger: exercise('3'),
  validDecimal: exercise('0.75'),
  mixedText: exercise('1abc'),
  negative: exercise('-5'),
  infinity: exercise('Infinity'),
  whitespace: exercise('   '),
};

console.log('matrix edit observations:', JSON.stringify(observations));

assert.equal(observations.validInteger.value, 3, 'valid integer edit must be stored exactly');
assert.equal(observations.validInteger.renders, 1, 'valid integer edit must re-render once');
assert.equal(observations.validDecimal.value, 0.75, 'valid decimal edit must preserve raw decimal precision');
assert.equal(observations.validDecimal.renders, 1, 'valid decimal edit must re-render once');

for (const [label, result] of Object.entries({
  mixedText: observations.mixedText,
  negative: observations.negative,
  infinity: observations.infinity,
  whitespace: observations.whitespace,
})) {
  assert.equal(result.value, 2.5, `${label}: invalid Matrix numeric edit must leave the previous value unchanged`);
  assert.equal(result.renders, 0, `${label}: rejected Matrix numeric edit must not re-render`);
}

console.log('Matrix numeric edit validation contract: PASS');

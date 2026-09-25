import assert from 'node:assert/strict';
import fs from 'node:fs';

const source = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

const helperMatch = source.match(/function floorPooledShrimpCredit\(rawTotal\) \{([\s\S]*?)\n    \}/);
assert.ok(helperMatch, 'floorPooledShrimpCredit() must exist in index.html');

const floorPooledShrimpCredit = new Function('rawTotal', helperMatch[1]);
assert.equal(floorPooledShrimpCredit(0.4 + 0.7), 1, '0.4 + 0.7 must pool to 1 shrimp');
assert.equal(floorPooledShrimpCredit(0.8 + 0.8), 1, '0.8 + 0.8 must floor once to 1 shrimp, not round to 2');
assert.equal(floorPooledShrimpCredit(2.9), 2, 'pooled shrimp credit must floor once at the end');
assert.equal(floorPooledShrimpCredit(0), 0, 'zero pooled shrimp credit must stay zero');
assert.equal(floorPooledShrimpCredit(-1), 0, 'negative pooled shrimp credit must not create shrimp');
assert.equal(floorPooledShrimpCredit('bad'), 0, 'invalid pooled shrimp credit must not create shrimp');

const calcMatch = source.match(/function calculateNetRecipe\(menuName\) \{([\s\S]*?)\n    \}\n\n    function getSortedReplacementOptions/);
assert.ok(calcMatch, 'calculateNetRecipe() block must be discoverable');
const calc = calcMatch[1];

assert.match(calc, /let pooledShrimpCredit = 0;/, 'shrimp replacement credit must be accumulated separately from base quantity');
assert.match(calc, /if \(rep === 'กุ้ง'\) \{\s*pooledShrimpCredit \+= addAmt;/, 'shrimp replacement rows must contribute raw credit to the pool');
assert.match(calc, /netRecipeMap\[rep\] = \(Number\(netRecipeMap\[rep\]\) \|\| 0\) \+ addAmt;/, 'non-shrimp replacement targets must retain existing accumulation behavior');
assert.match(calc, /const pooledShrimpAddition = floorPooledShrimpCredit\(pooledShrimpCredit\);/, 'shrimp pool must be floored exactly once after aggregation');
assert.match(calc, /netRecipeMap\['กุ้ง'\] = \(Number\(netRecipeMap\['กุ้ง'\]\) \|\| 0\) \+ pooledShrimpAddition;/, 'floored shrimp addition must be added to base shrimp after pooling');

console.log('replacement pooling contract: PASS');

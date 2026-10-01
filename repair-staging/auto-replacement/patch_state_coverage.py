from pathlib import Path

qa = Path('qa/landscape-calculator-v4-contract.mjs')
q = qa.read_text(encoding='utf-8')
old = """    // Reopen in portrait, then rotate while the modal is open. This reproduces
    // the user's orientation transition rather than testing only a fresh load.
    await page.setViewportSize({width:390,height:844});
    await openCandidate(page, candidate);
    await page.setViewportSize({width:844,height:390});
    await page.waitForTimeout(120);
    await geometry(page, `${scope}/rotated`);
    const rotatedExclude = page.locator('#excludeOptions .exclude-btn').filter({hasText:candidate.exclude}).first();
    await rotatedExclude.click();
    assert.ok(await rotatedExclude.evaluate(el => el.classList.contains('is-excluded')), `${scope}: exclusion is blocked after portrait→landscape rotation`);
    assert.equal(await page.locator('.replacement-menu').count(), 0, `${scope}: rotated exclusion unexpectedly auto-opened replacement picker`);
    await page.locator('#closeCalculatorButton').click();
"""
new = """    // Reopen the same menu in portrait. The exclusion/manual replacement from
    // tapFlow must persist now; reopening must not silently reset the operator's work.
    await page.setViewportSize({width:390,height:844});
    await openCandidate(page, candidate);
    const persistedExclude = page.locator('#excludeOptions .exclude-btn').filter({hasText:candidate.exclude}).first();
    assert.equal(await persistedExclude.count(), 1, `${scope}: persisted exclusion button missing after reopen`);
    assert.ok(await persistedExclude.evaluate(el => el.classList.contains('is-excluded')), `${scope}: exclusion state was lost after close/reopen`);
    assert.equal(await page.locator('.replacement-menu').count(), 0, `${scope}: same-menu reopen unexpectedly opened replacement picker`);

    // Rotate while the modal is open, confirm the persisted exclusion survives,
    // then exclude a different still-eligible item to prove taps remain non-blocking.
    await page.setViewportSize({width:844,height:390});
    await page.waitForTimeout(120);
    await geometry(page, `${scope}/rotated`);
    assert.ok(await persistedExclude.evaluate(el => el.classList.contains('is-excluded')), `${scope}: exclusion state was lost across portrait→landscape rotation`);

    const availableAfterRotate = page.locator('#excludeOptions .exclude-btn:not(.is-excluded)');
    assert.ok(await availableAfterRotate.count() > 0, `${scope}: no eligible exclusion remains after rotation`);
    const rotatedTargetName = (await availableAfterRotate.first().locator('span').first().innerText()).trim();
    assert.ok(rotatedTargetName, `${scope}: rotated exclusion target has no ingredient name`);
    const rotatedExclude = page.locator('#excludeOptions .exclude-btn').filter({hasText:rotatedTargetName}).first();
    await rotatedExclude.click();
    assert.ok(await rotatedExclude.evaluate(el => el.classList.contains('is-excluded')), `${scope}: new exclusion is blocked after portrait→landscape rotation`);
    assert.ok(await persistedExclude.evaluate(el => el.classList.contains('is-excluded')), `${scope}: prior exclusion changed while excluding another item after rotation`);
    assert.equal(await page.locator('.replacement-menu').count(), 0, `${scope}: rotated exclusion unexpectedly auto-opened replacement picker`);
    await page.locator('#closeCalculatorButton').click();
"""
if q.count(old) != 1:
    raise SystemExit(f'landscape stale-state exact guard failed: {q.count(old)} matches')
q = q.replace(old, new, 1)
qa.write_text(q, encoding='utf-8')

handoff = Path('CURRENT_HANDOFF.md')
h = handoff.read_text(encoding='utf-8')
if '## LANDSCAPE REOPEN CONTRACT CORRECTION — IMPLEMENTED' in h:
    raise SystemExit('landscape correction checkpoint already present')
marker = '## EXACT NEXT ACTION\n'
if h.count(marker) != 1:
    raise SystemExit(f'handoff exact-next marker guard failed: {h.count(marker)} matches')
checkpoint = """## LANDSCAPE REOPEN CONTRACT CORRECTION — IMPLEMENTED
- UI QA run `36838859184` proved the expanded auto-replacement contract PASS in Chromium + WebKit before failing the phone-landscape interaction contract
- root cause was a stale test assumption, not a product click defect: the landscape test excluded an item in `tapFlow()`, closed/reopened the same menu, then clicked that already-excluded item again and expected it to remain excluded
- same-menu reopen now intentionally preserves exclusion/replacement state, so that second click correctly un-excluded the item
- landscape regression now first asserts the prior exclusion persists after close/reopen and portrait→landscape rotation, then excludes a different still-eligible item and asserts the picker remains closed and the prior exclusion remains intact
- no production behavior or recipe data changed in this correction

"""
prefix, suffix = h.split(marker, 1)
handoff.write_text(prefix + checkpoint + marker + suffix, encoding='utf-8')

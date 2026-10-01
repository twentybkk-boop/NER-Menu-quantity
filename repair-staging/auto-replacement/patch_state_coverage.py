from pathlib import Path

qa = Path('qa/auto-replacement-flow-contract.mjs')
q = qa.read_text(encoding='utf-8')
anchor = """    const page = await context.newPage();
    await waitForApp(page);
    const fixture = await installSyntheticSet(page);
    const scope = `${browserName}/${LIVE ? 'live' : 'local'}`;

    // One exclusion must auto-assign silently, without interrupting the operator.
"""
replacement = """    const page = await context.newPage();
    await waitForApp(page);
    const fixture = await installSyntheticSet(page);
    const scope = `${browserName}/${LIVE ? 'live' : 'local'}`;

    // Product selection is intentionally random in production. Stub Math.random in this
    // synthetic contract so multiple-candidate coverage is deterministic and non-flaky.
    const rngSequence = [0.01, 0.74, 0.38, 0.92, 0.21, 0.57];
    await page.evaluate(sequence => {
      let rngIndex = 0;
      Math.random = () => sequence[(rngIndex++) % sequence.length];
    }, rngSequence);

    // One exclusion must auto-assign silently, without interrupting the operator.
"""
if q.count(anchor) != 1:
    raise SystemExit(f'RNG insertion exact guard failed: {q.count(anchor)} matches')
q = q.replace(anchor, replacement, 1)
qa.write_text(q, encoding='utf-8')

handoff = Path('CURRENT_HANDOFF.md')
h = handoff.read_text(encoding='utf-8')
if '## DETERMINISTIC RNG COVERAGE — IMPLEMENTED' in h:
    raise SystemExit('deterministic RNG checkpoint already present')
marker = '## EXACT NEXT ACTION\n'
if h.count(marker) != 1:
    raise SystemExit(f'handoff exact-next marker guard failed: {h.count(marker)} matches')
checkpoint = """## DETERMINISTIC RNG COVERAGE — IMPLEMENTED
- production automatic replacement remains randomized within the eligible preferred pool
- the synthetic auto-replacement contract now stubs browser `Math.random()` with a fixed repeating sequence
- Scenario C therefore exercises multiple-candidate automatic selection deterministically while still asserting same-category membership and exclusion/out-of-set safety
- no production selection semantics were changed for test determinism

"""
prefix, suffix = h.split(marker, 1)
handoff.write_text(prefix + checkpoint + marker + suffix, encoding='utf-8')

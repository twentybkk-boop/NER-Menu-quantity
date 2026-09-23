from pathlib import Path
import re

path = Path('index.html')
html = path.read_text(encoding='utf-8')

html = re.sub(
    r"#decor-layer \{.*?\.decor-c \{.*?\}\n",
    '''#decor-layer {
      position: fixed;
      inset: 0;
      overflow: hidden;
      pointer-events: none !important;
      user-select: none;
      z-index: 12;
    }
    .decor-person {
      position: absolute;
      display: block;
      pointer-events: none !important;
      user-select: none;
      background-image: url('assets/ner-team-bg.webp');
      background-repeat: no-repeat;
      background-size: 680px auto;
      filter: saturate(.98) contrast(1.01);
      opacity: .90;
    }
    .decor-a {
      width: 190px; height: 245px; left: -38px; top: 455px;
      background-position: left top;
      -webkit-mask-image: linear-gradient(90deg,#000 0 58%,rgba(0,0,0,.75) 72%,transparent 100%);
      mask-image: linear-gradient(90deg,#000 0 58%,rgba(0,0,0,.75) 72%,transparent 100%);
    }
    .decor-b {
      width: 190px; height: 245px; left: -48px; top: 1220px;
      background-position: left bottom; opacity: .84;
      -webkit-mask-image: linear-gradient(90deg,#000 0 58%,rgba(0,0,0,.72) 72%,transparent 100%);
      mask-image: linear-gradient(90deg,#000 0 58%,rgba(0,0,0,.72) 72%,transparent 100%);
    }
    .decor-c {
      width: 185px; height: 280px; right: -42px; top: 820px;
      background-position: right center; opacity: .86;
      -webkit-mask-image: linear-gradient(270deg,#000 0 58%,rgba(0,0,0,.72) 72%,transparent 100%);
      mask-image: linear-gradient(270deg,#000 0 58%,rgba(0,0,0,.72) 72%,transparent 100%);
    }
''',
    html,
    count=1,
    flags=re.S,
)

html = html.replace(
    "#app-shell {\n      position: relative;\n      z-index: 10;",
    "#app-shell {\n      position: relative;\n      z-index: 20;",
    1,
)

html = html.replace(
    ".exclude-item { margin-bottom: 11px; }",
    "#excludeOptions { display: block !important; min-height: 1px; }\n    .exclude-item { display: block; margin-bottom: 11px; position: relative; z-index: 1; }",
    1,
)
html = html.replace(
    "text-align: left; cursor: pointer;\n    }\n    .exclude-btn.is-excluded",
    "text-align: left; cursor: pointer; pointer-events: auto; touch-action: manipulation; position: relative; z-index: 2;\n    }\n    .exclude-btn.is-excluded",
    1,
)

old_matrix = '''#tableContainer { flex: 1; overflow: auto; padding: 12px; background: #fbf5ed; }
    .matrix-table { border-collapse: collapse; width: 100%; min-width: 980px; white-space: nowrap; background: #fffdf9; font-size: 11px; }
    .matrix-table th, .matrix-table td { padding: 10px; border-bottom: 1px solid #eee2d8; text-align: center; }
    .matrix-table th { position: sticky; top: 0; z-index: 6; background: #f4e7dc; color: #4a382e; font-size: 10px; }
    .matrix-table .sticky-1 { position: sticky; left: 0; z-index: 5; min-width: 145px; text-align: left; background: #fffdf9; }
    .matrix-table .sticky-2 { position: sticky; left: 145px; z-index: 5; min-width: 150px; text-align: left; background: #fffdf9; }
    .matrix-table th.sticky-1, .matrix-table th.sticky-2 { z-index: 8; background: #efe0d4; }
    .matrix-cell-edit { background: #fff8f1; color: #6d4937; font-weight: 800; cursor: pointer; }
    .matrix-cell-edit:hover { background: #f2e0d0; }'''
new_matrix = '''#tableContainer {
      --matrix-col-1: 108px;
      --matrix-col-2: 112px;
      --matrix-data-col: 64px;
      flex: 1; overflow: auto; padding: 8px; background: #fbf5ed;
      -webkit-overflow-scrolling: touch;
    }
    .matrix-table {
      border-collapse: separate; border-spacing: 0;
      width: max-content; min-width: 100%;
      white-space: normal; background: #fffdf9; font-size: 10px;
    }
    .matrix-table th, .matrix-table td {
      height: 44px; padding: 5px 4px; border-bottom: 1px solid #eee2d8; border-right: 1px solid #f2e8df;
      text-align: center; vertical-align: middle; line-height: 1.15;
    }
    .matrix-table th {
      position: sticky; top: 0; z-index: 6; background: #f4e7dc; color: #4a382e;
      font-size: 9px; font-weight: 800; overflow-wrap: anywhere;
    }
    .matrix-table th:not(.sticky-1):not(.sticky-2),
    .matrix-table td:not(.sticky-1):not(.sticky-2) {
      width: var(--matrix-data-col); min-width: var(--matrix-data-col); max-width: var(--matrix-data-col);
      overflow-wrap: anywhere;
    }
    .matrix-table .sticky-1 {
      position: sticky; left: 0; z-index: 5;
      width: var(--matrix-col-1); min-width: var(--matrix-col-1); max-width: var(--matrix-col-1);
      text-align: left; background: #fffdf9; white-space: normal; overflow-wrap: anywhere;
    }
    .matrix-table .sticky-2 {
      position: sticky; left: var(--matrix-col-1); z-index: 5;
      width: var(--matrix-col-2); min-width: var(--matrix-col-2); max-width: var(--matrix-col-2);
      text-align: left; background: #fffdf9; white-space: normal; overflow-wrap: anywhere;
    }
    .matrix-table th.sticky-1, .matrix-table th.sticky-2 { z-index: 8; background: #efe0d4; }
    .matrix-cell-edit { background: #fff8f1; color: #6d4937; font-weight: 800; cursor: pointer; }
    .matrix-cell-edit:hover { background: #f2e0d0; }'''
if old_matrix not in html:
    raise SystemExit('matrix CSS block not found')
html = html.replace(old_matrix, new_matrix, 1)

old_mobile_art = '''      /* On phones the art peeks out rather than sitting beneath controls. */
      .decor-a { width: 135px; height: 182px; left: -105px; top: 270px; opacity: .66; background-size: 520px auto; }
      .decor-b { width: 132px; height: 178px; left: -103px; top: 1130px; opacity: .50; background-size: 520px auto; }
      .decor-c { width: 132px; height: 205px; right: -103px; top: 790px; opacity: .53; background-size: 520px auto; }'''
new_mobile_art = '''      /* On phones the team is intentionally visible at the edges, but never intercepts taps. */
      .decor-a { width: 150px; height: 198px; left: -34px; top: 500px; opacity: .90; background-size: 575px auto; }
      .decor-b { width: 150px; height: 198px; left: -43px; top: 1260px; opacity: .80; background-size: 575px auto; }
      .decor-c { width: 148px; height: 228px; right: -34px; top: 860px; opacity: .84; background-size: 575px auto; }

      #tableContainer { --matrix-col-1: 86px; --matrix-col-2: 92px; --matrix-data-col: 54px; padding: 4px; }
      .matrix-table { font-size: 9px; }
      .matrix-table th, .matrix-table td { height: 40px; padding: 4px 3px; }
      .matrix-table th { font-size: 8px; }
      .matrix-table .sticky-1, .matrix-table .sticky-2 { font-size: 9px; }'''
if old_mobile_art not in html:
    raise SystemExit('mobile art block not found')
html = html.replace(old_mobile_art, new_mobile_art, 1)

old_open = '''function openCalculator(menuName) {
      if (!originalMenu[menuName]) return;
      currentActiveMenu = menuName;
      excludedItemsMap = {};
      openReplacementPicker = null;
      el('calcMenuTitle').textContent = menuName;

      const single = Object.keys(originalMenu[menuName]).length === 1;
      el('leftPanel').style.display = single ? 'none' : '';
      el('rightPanel').style.width = single ? '100%' : '';

      renderExcludeOptions();
      renderNetResults();
      showModal('calculatorModal');
    }'''
new_open = '''function openCalculator(menuName) {
      if (!originalMenu[menuName]) return;
      currentActiveMenu = menuName;
      excludedItemsMap = {};
      openReplacementPicker = null;
      el('calcMenuTitle').textContent = menuName;

      const single = Object.keys(originalMenu[menuName]).length === 1;
      el('leftPanel').style.display = single ? 'none' : 'block';
      el('rightPanel').style.width = single ? '100%' : '';

      showModal('calculatorModal');
      renderExcludeOptions();
      renderNetResults();
    }'''
if old_open not in html:
    raise SystemExit('openCalculator block not found')
html = html.replace(old_open, new_open, 1)

start = html.index('function renderExcludeOptions() {')
end = html.index('\n    function renderNetResults()', start)
new_render = '''function renderExcludeOptions() {
      const container = el('excludeOptions');
      const ingredients = Object.keys(originalMenu[currentActiveMenu] || {});
      container.replaceChildren();

      if (!ingredients.length) {
        const empty = document.createElement('div');
        empty.className = 'picker-empty';
        empty.textContent = 'ไม่พบรายการวัตถุดิบสำหรับเมนูนี้';
        container.appendChild(empty);
        return;
      }

      ingredients.forEach(item => {
        const excluded = excludedItemsMap[item] !== undefined;
        const row = document.createElement('div');
        row.className = 'exclude-item';

        const excludeButton = document.createElement('button');
        excludeButton.type = 'button';
        excludeButton.className = `exclude-btn${excluded ? ' is-excluded' : ''}`;
        const name = document.createElement('span');
        name.textContent = item;
        excludeButton.appendChild(name);
        if (excluded) {
          const status = document.createElement('span');
          status.className = 'exclude-status';
          status.textContent = '✓ ตัดออก';
          excludeButton.appendChild(status);
        }
        excludeButton.addEventListener('click', () => toggleExclude(item));
        row.appendChild(excludeButton);

        if (excluded) {
          const options = getSortedReplacementOptions(currentActiveMenu, item);
          const selected = excludedItemsMap[item] || '';
          const isOpen = openReplacementPicker === item;

          const wrap = document.createElement('div');
          wrap.className = 'replacement-wrap';

          const trigger = document.createElement('button');
          trigger.type = 'button';
          trigger.className = `replacement-trigger${isOpen ? ' is-open' : ''}`;
          trigger.setAttribute('aria-expanded', String(isOpen));
          const label = document.createElement('span');
          const mainLabel = document.createElement('span');
          mainLabel.textContent = selected || 'ไม่มีรายการที่แทนได้';
          const hint = document.createElement('small');
          hint.textContent = 'เลือกวัตถุดิบทดแทน';
          label.append(mainLabel, hint);
          const chevron = document.createElement('span');
          chevron.className = 'chevron';
          chevron.textContent = '⌄';
          trigger.append(label, chevron);
          trigger.addEventListener('click', () => toggleReplacementPicker(item));
          wrap.appendChild(trigger);

          if (isOpen) {
            const menu = document.createElement('div');
            menu.className = 'replacement-menu';
            if (!options.length) {
              const empty = document.createElement('div');
              empty.className = 'picker-empty';
              empty.textContent = 'ไม่มีข้อมูลการแทนสำหรับรายการนี้';
              menu.appendChild(empty);
            } else {
              options.forEach(opt => {
                const option = document.createElement('button');
                option.type = 'button';
                option.className = `replacement-option ${opt.selectable ? 'selectable' : 'disabled'}${selected === opt.name ? ' selected' : ''}`;
                const optionName = document.createElement('span');
                optionName.textContent = opt.name;
                option.appendChild(optionName);
                if (opt.selectable) {
                  if (selected === opt.name) {
                    const mark = document.createElement('span');
                    mark.className = 'selected-mark';
                    mark.textContent = '✓ เลือกอยู่';
                    option.appendChild(mark);
                  }
                  option.addEventListener('click', () => setReplacement(item, opt.name));
                } else {
                  option.disabled = true;
                  option.setAttribute('aria-disabled', 'true');
                  const note = document.createElement('span');
                  note.className = 'option-note';
                  note.textContent = 'แทนไม่ได้';
                  option.appendChild(note);
                }
                menu.appendChild(option);
              });
            }
            wrap.appendChild(menu);
          }
          row.appendChild(wrap);
        }

        container.appendChild(row);
      });
    }
'''
html = html[:start] + new_render + html[end:]

html = re.sub(
    r"\n\s*el\('excludeOptions'\)\.addEventListener\('click', e => \{.*?\n\s*\}\);",
    '',
    html,
    count=1,
    flags=re.S,
)

path.write_text(html, encoding='utf-8')
print('patched index.html', len(html.encode('utf-8')))

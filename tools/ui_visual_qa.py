from pathlib import Path
import json
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'artifacts'/'ui-visual-qa'
OUT.mkdir(parents=True,exist_ok=True)
recipe=(ROOT/'recipe_master.json').read_text(encoding='utf-8')
views=[(390,844,'iphone'),(820,1180,'ipad-portrait'),(1180,820,'ipad-landscape')]
results=[]
with sync_playwright() as p:
  for bn in ('chromium','webkit'):
    b=getattr(p,bn).launch()
    for w,h,label in views:
      c=b.new_context(viewport={'width':w,'height':h})
      pg=c.new_page()
      pg.route('**/*recipe_master.json*',lambda r:r.fulfill(status=200,content_type='application/json',body=recipe))
      pg.goto('http://127.0.0.1:8000/index.html',wait_until='domcontentloaded')
      pg.locator('.menu-card').first.wait_for()
      state=pg.evaluate("""() => {const r=document.documentElement,a=document.querySelector('.decor-a'), cards=[...document.querySelectorAll('.menu-card')].slice(0,4), arts=cards.map(x=>getComputedStyle(x,'::before').backgroundImage); return {overflow:r.scrollWidth<=innerWidth+1,fixed:getComputedStyle(a).position==='fixed',pe:getComputedStyle(a).pointerEvents==='none',distinct:new Set(arts).size===4,firstArt:arts[0],css:[...document.styleSheets].some(s=>s.href&&s.href.includes('visual-polish.css'))}}""")
      assert all([state['overflow'],state['fixed'],state['pe'],state['distinct'],state['css']]) and 'set-seafood.svg' in state['firstArt'],state
      y0=pg.locator('.decor-a').bounding_box()['y']
      pg.evaluate('scrollTo(0,Math.min(500,document.documentElement.scrollHeight-innerHeight))')
      pg.wait_for_timeout(80)
      y1=pg.locator('.decor-a').bounding_box()['y']
      assert abs(y1-y0)<3,(y0,y1)
      pg.evaluate('scrollTo(0,0)')
      pg.locator('.menu-card').first.click()
      pg.locator('#calculatorModal').wait_for(state='visible')
      selectable=False; disabled=False
      for i in range(pg.locator('.exclude-btn').count()):
        pg.locator('.exclude-btn').nth(i).click()
        if pg.locator('.replacement-trigger').count():
          if pg.locator('.replacement-option.disabled').count():
            opt=pg.locator('.replacement-option.disabled').first
            assert opt.is_disabled(); disabled=True
          if pg.locator('.replacement-option.selectable').count():
            pg.locator('.replacement-option.selectable').first.click(); selectable=True; break
        btns=pg.locator('.exclude-btn')
        if i<btns.count() and 'is-excluded' in (btns.nth(i).get_attribute('class') or ''): btns.nth(i).click()
      assert selectable and disabled,(selectable,disabled)
      pg.locator('#closeCalculatorButton').click()
      pg.locator('#managerButton').click(); pg.locator('#pinInput').fill('206738'); pg.locator('#verifyPinButton').click(); pg.locator('#matrixModal').wait_for(state='visible')
      matrix=pg.evaluate("""() => {const t=document.getElementById('tableContainer');t.scrollLeft=200;return [t.scrollWidth>t.clientWidth,t.scrollLeft,document.documentElement.scrollWidth<=innerWidth+1]}""")
      assert matrix[0] and matrix[1]>0 and matrix[2],matrix
      pg.locator('#closeMatrixButton').click()
      if label=='ipad-portrait':
        pg.evaluate('window.__orientation_token=1'); pg.set_viewport_size({'width':1180,'height':820}); pg.wait_for_timeout(100)
        assert pg.evaluate('window.__orientation_token===1 && document.documentElement.scrollWidth<=innerWidth+1')
        pg.set_viewport_size({'width':820,'height':1180}); pg.wait_for_timeout(80)
      pg.screenshot(path=str(OUT/f'{bn}-{label}.png'))
      results.append({'browser':bn,'viewport':f'{w}x{h}',**state,'matrixScroll':matrix[1],'replacementSelectable':selectable,'zeroQtyDisabled':disabled})
      c.close()
    b.close()
(OUT/'results.json').write_text(json.dumps(results,indent=2),encoding='utf-8')
print(json.dumps(results,indent=2))

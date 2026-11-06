#!/usr/bin/env bash
# e2e-fm-12.sh — visual-upgrade run 2 E2E for FM lesson 1.2:
# desktop 1280 + mobile 390 + dark-mode, screenshots of both figures,
# quiz interactivity + KaTeX + console-error capture.
set -u
BASE=http://localhost:3000/book/foundation-mathematics/lesson/fm-comparing-ordering-numbers
OUT=/tmp/e2e-fm12
mkdir -p "$OUT"
PAGE_JS=$(cat /home/z/my-project/scripts/e2e-fm-12.page.js)

run_checks () {  # $1 = label
  agent-browser open "$BASE" >/dev/null 2>&1
  agent-browser wait --load networkidle >/dev/null 2>&1 || true
  agent-browser wait 1200 >/dev/null 2>&1 || true
  agent-browser reload >/dev/null 2>&1 || true
  agent-browser wait --load networkidle >/dev/null 2>&1 || true
  agent-browser wait 1200 >/dev/null 2>&1 || true
  agent-browser eval "window.__e2eErrors=[];var _ce=console.error;console.error=function(){window.__e2eErrors.push([].slice.call(arguments).join(' '));_ce.apply(console,arguments)};'installed'"
  agent-browser eval "$PAGE_JS" > "$OUT/$1.json" 2>"$OUT/$1.err"
  agent-browser wait 800 >/dev/null 2>&1 || true
  agent-browser eval "JSON.stringify({scoreText:(document.body.textContent.match(/You scored[^·]*/g)||[]).slice(0,1),solPills:Array.prototype.slice.call(document.querySelectorAll('span')).filter(function(s){return s.textContent.trim()==='Sol.';}).length,consoleErrors:(window.__e2eErrors||[]).length})" > "$OUT/$1.score" 2>"$OUT/$1.score.err"
  node -e "
    const fs=require('fs');
    const parse=(p)=>{let raw=fs.readFileSync(p,'utf8').trim();let d=JSON.parse(raw);if(typeof d==='string')d=JSON.parse(d);return d};
    let d;try{d=parse('$OUT/$1.json')}catch(e){console.log('RAW:',fs.readFileSync('$OUT/$1.json','utf8').slice(0,400));process.exit(0)}
    let sc={};try{sc=parse('$OUT/$1.score')}catch(e){}
    const pass=(c,m)=>console.log((c?'  PASS ':'  FAIL ')+m);
    pass(d.hasBody,'lesson body');
    pass(d.figureCount===2,'exactly 2 figures (got '+d.figureCount+')');
    pass(d.hasChart && d.hasTug,'chart + tug-of-war present');
    if(d.chartRects!==undefined){
      pass(d.chartRects===12,'chart: 12 rects (4 header + 8 cells, got '+d.chartRects+')');
      pass(d.chartAmberRects===3,'chart: 3 amber-tinted cells (header + 2 rows)');
      pass(d.chartAmberDigits==='89','chart: amber digits exactly 8,9 (tens column)');
      pass(d.chartTexts===16,'chart: 16 text nodes');
      pass(d.chartAria,'chart: aria-label');
    }
    if(d.tugRects!==undefined){
      pass(d.tugRects===4,'tug: 4 rects (barA + barB + gap + pattern tile)');
      pass(d.tugBarA===1,'tug: bar A w=520 (one step of 10)');
      pass(d.tugBarB===1,'tug: bar B w=468 (max of 9)');
      pass(d.tugGap===1,'tug: dashed gap w=52 at 9..10');
      pass(d.tugPattern,'tug: stripe pattern present (currentColor)');
      pass(d.tugAmberTexts==='1|unclosable gap','tug: amber texts = 1 + unclosable gap');
      pass(d.tugTickLabels==='0,1,2,3,4,5,6,7,8,9,10','tug: tick labels 0..10');
      pass(d.tugTexts===17,'tug: 17 text nodes');
      pass(d.tugAria,'tug: aria-label');
    }
    pass(d.katexNodes>30,'KaTeX nodes > 30 (got '+d.katexNodes+')');
    pass(d.katexErrors===0,'KaTeX errors 0');
    pass(d.dollarInText===0,'no raw \$ in prose');
    pass(d.rawDollarInSvg===0,'no raw \$ in SVG');
    pass(d.quizClicked===5,'quiz 5/5 clicked');
    pass(/scored\s*5\s*\/\s*5/.test((sc.scoreText||[]).join('')),'quiz scored 5/5: '+((sc.scoreText||[]).join('')||'(none)'));
    pass(d.showButtons===8 && (sc.solPills||0)===10,'solutions expanded: 8 exercise pills + 2 example pills (got show='+d.showButtons+' sol='+(sc.solPills||0)+')');
    pass(!d.hOverflow,'no horizontal overflow (scroll '+d.docScrollW+' vs view '+d.innerWidth+')');
    pass(!d.crashText,'no crash text');
    pass((sc.consoleErrors||0)===0,'console errors 0 (got '+sc.consoleErrors+')');
  "
}

echo "== desktop 1280 =="
agent-browser set viewport 1280 900 >/dev/null 2>&1 || true
run_checks desktop
# screenshots: both figures
agent-browser eval "var s=[].slice.call(document.querySelectorAll('figure svg')).find(function(x){return (x.getAttribute('viewBox')||'')==='0 0 760 240'});s.scrollIntoView({block:'center'});'ok'" >/dev/null 2>&1
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot "$OUT/tug-1280.png" >/dev/null 2>&1
agent-browser eval "var s=[].slice.call(document.querySelectorAll('figure svg')).find(function(x){return (x.getAttribute('viewBox')||'')==='0 0 760 250'});s.scrollIntoView({block:'center'});'ok'" >/dev/null 2>&1
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot "$OUT/chart-1280.png" >/dev/null 2>&1

echo "== dark mode 1280 (tug figure) =="
agent-browser eval "document.documentElement.classList.add('dark');'dark-on'" >/dev/null 2>&1
agent-browser eval "var s=[].slice.call(document.querySelectorAll('figure svg')).find(function(x){return (x.getAttribute('viewBox')||'')==='0 0 760 240'});s.scrollIntoView({block:'center'});'ok'" >/dev/null 2>&1
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot "$OUT/tug-dark-1280.png" >/dev/null 2>&1
agent-browser eval "document.documentElement.classList.remove('dark');'dark-off'" >/dev/null 2>&1

echo "== mobile 390 =="
agent-browser set viewport 390 844 >/dev/null 2>&1 || true
run_checks mobile
agent-browser eval "var s=[].slice.call(document.querySelectorAll('figure svg')).find(function(x){return (x.getAttribute('viewBox')||'')==='0 0 760 240'});s.scrollIntoView({block:'center'});'ok'" >/dev/null 2>&1
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot "$OUT/tug-390.png" >/dev/null 2>&1
agent-browser eval "var s=[].slice.call(document.querySelectorAll('figure svg')).find(function(x){return (x.getAttribute('viewBox')||'')==='0 0 760 250'});s.scrollIntoView({block:'center'});'ok'" >/dev/null 2>&1
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot "$OUT/chart-390.png" >/dev/null 2>&1

echo "== done — outputs in $OUT =="

#!/usr/bin/env bash
# e2e-fm-11.sh — visual-upgrade run 1 E2E for FM lesson 1.1:
# desktop 1280 + mobile 390 + dark-mode, screenshots of both figures,
# quiz interactivity + KaTeX + console-error capture.
set -u
BASE=http://localhost:3000/book/foundation-mathematics/lesson/fm-numbers-digits-place-value
OUT=/tmp/e2e-fm11
mkdir -p "$OUT"
PAGE_JS=$(cat /home/z/my-project/scripts/e2e-fm-11.page.js)

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
    pass(d.hasSeatFigure && d.hasNumberLine,'seat + number-line present');
    if(d.seatRects!==undefined){
      pass(d.seatRects===8,'seat: 8 rects (4 strips + 4 value boxes, got '+d.seatRects+')');
      pass(d.seatArrows===3,'seat: 3 march arrows');
      pass(d.seatAmberDigits===7,'seat: 4 amber fives + 3 x10 labels');
      pass(d.seatTexts===28,'seat: 28 text nodes');
      pass(d.seatAria,'seat: aria-label');
    }
    if(d.nlDots7andM4!==undefined){
      pass(d.nlDots7andM4===2,'number-line: 2 emphasis dots (7, −4)');
      pass(d.nlOriginDot===1,'number-line: origin dot');
      pass(d.nlAmberLabels===2,'number-line: amber labels 7 & −4');
      pass(d.nlAria,'number-line: aria-label');
    }
    pass(d.katexNodes>30,'KaTeX nodes > 30 (got '+d.katexNodes+')');
    pass(d.katexErrors===0,'KaTeX errors 0');
    pass(d.dollarInText===0,'no raw \$ in prose');
    pass(d.rawDollarInSvg===0,'no raw \$ in SVG');
    pass(d.quizClicked===5,'quiz 5/5 clicked');
    pass(/scored\s*5\s*\/\s*5/.test((sc.scoreText||[]).join('')),'quiz scored 5/5: '+((sc.scoreText||[]).join('')||'(none)'));
    pass(d.showButtons===9 && (sc.solPills||0)===10,'solutions expanded: 9 exercise Sol pills + 1 example Sol pill (got '+(sc.solPills||0)+')');
    pass(!d.hOverflow,'no horizontal overflow (scroll '+d.docScrollW+' vs view '+d.innerWidth+')');
    pass(!d.crashText,'no crash text');
    pass((sc.consoleErrors||0)===0,'console errors 0 (got '+sc.consoleErrors+')');
  "
}

echo "== desktop 1280 =="
agent-browser set viewport 1280 900 >/dev/null 2>&1 || true
run_checks desktop
# screenshots: both figures
agent-browser eval "var s=[].slice.call(document.querySelectorAll('figure svg')).find(function(x){return (x.getAttribute('viewBox')||'')==='0 0 620 282'});s.scrollIntoView({block:'center'});'ok'" >/dev/null 2>&1
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot "$OUT/seat-1280.png" >/dev/null 2>&1
agent-browser eval "var s=[].slice.call(document.querySelectorAll('figure svg')).find(function(x){return (x.getAttribute('viewBox')||'')==='0 0 760 150'});s.scrollIntoView({block:'center'});'ok'" >/dev/null 2>&1
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot "$OUT/nl-1280.png" >/dev/null 2>&1

echo "== dark mode 1280 (seat figure) =="
agent-browser eval "document.documentElement.classList.add('dark');'dark-on'" >/dev/null 2>&1
agent-browser eval "var s=[].slice.call(document.querySelectorAll('figure svg')).find(function(x){return (x.getAttribute('viewBox')||'')==='0 0 620 282'});s.scrollIntoView({block:'center'});'ok'" >/dev/null 2>&1
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot "$OUT/seat-dark-1280.png" >/dev/null 2>&1
agent-browser eval "document.documentElement.classList.remove('dark');'dark-off'" >/dev/null 2>&1

echo "== mobile 390 =="
agent-browser set viewport 390 844 >/dev/null 2>&1 || true
run_checks mobile
agent-browser eval "var s=[].slice.call(document.querySelectorAll('figure svg')).find(function(x){return (x.getAttribute('viewBox')||'')==='0 0 620 282'});s.scrollIntoView({block:'center'});'ok'" >/dev/null 2>&1
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot "$OUT/seat-390.png" >/dev/null 2>&1
agent-browser eval "var s=[].slice.call(document.querySelectorAll('figure svg')).find(function(x){return (x.getAttribute('viewBox')||'')==='0 0 760 150'});s.scrollIntoView({block:'center'});'ok'" >/dev/null 2>&1
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot "$OUT/nl-390.png" >/dev/null 2>&1

echo "== done — outputs in $OUT =="

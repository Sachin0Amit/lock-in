#!/usr/bin/env bash
# e2e-fm-13.sh — visual-upgrade run E2E for FM lesson 1.3:
# desktop 1280 + mobile 390 + dark-mode, screenshots of both figures,
# quiz interactivity + KaTeX + console-error capture.
set -u
BASE=http://localhost:3000/book/foundation-mathematics/lesson/fm-rounding-and-estimating
OUT=/tmp/e2e-fm13
mkdir -p "$OUT"
PAGE_JS=$(cat /home/z/my-project/scripts/e2e-fm-13.page.js)

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
    let fails=0;
    const f=(c,m)=>{pass(c,m);if(!c)fails++};
    f(d.hasBody,'lesson body');
    f(d.figureCount===2,'exactly 2 figures (got '+d.figureCount+')');
    f(d.hasNL && d.hasTrap,'number line + trap figure present');
    if(d.nlLines!==undefined){
      f(d.nlLines===12,'nl: 12 lines (axis + 11 ticks, got '+d.nlLines+')');
      f(d.nlTexts===14,'nl: 14 text nodes (got '+d.nlTexts+')');
      f(d.nlCircles===2,'nl: 2 dots (got '+d.nlCircles+')');
      f(d.nlDots==='256,504','nl: dots at 43 (256) and 47 (504)');
      f(d.nlArrows===2,'nl: 2 rounded-decision arrows (got '+d.nlArrows+')');
      f(d.nlArrowD==='M256,88 Q160,34 70,86|M504,88 Q600,34 690,86','nl: arrow tips land on the 40/50 tick tops');
      f(d.nlTickLabels==='40,41,42,43,44,45,46,47,48,49,50','nl: tick labels 40..50');
      f(d.nlLabelGroup14===true,'nl: tick labels inherit the 14px group');
      f(d.nlMidNote===true,'nl: midpoint note at 13px');
      f(d.nlAria===true,'nl: aria-label');
    }
    if(d.trapLines!==undefined){
      f(d.trapLines===13,'trap: 13 lines (2 rails + 5 ticks + 2 brackets, got '+d.trapLines+')');
      f(d.trapTexts===13,'trap: 13 text nodes (got '+d.trapTexts+')');
      f(d.trapCircles===2 && d.trapGreenDots===2,'trap: 2 green dots (the true positions)');
      f(d.trapArrowCount===2,'trap: 2 move arrows (got '+d.trapArrowCount+')');
      f(d.trapArrowD==='M254,62 Q120,108 82,178|M386,62 Q640,108 678,178','trap: moves 4,829→4,800 and 4,851→4,900 drawn');
      f(d.trapBracketA===3,'trap: true-gap bracket = 3 strokes (got '+d.trapBracketA+')');
      f(d.trapBracketB===3,'trap: rounded-gap bracket = 3 strokes (got '+d.trapBracketB+')');
      f(d.trapRailALabels==='4,800,4,829,4,851,4,900','trap: rail A labels in true positions');
      f(d.trapRailBLabels==='4,800,4,900','trap: rail B labels = the rounded positions');
      f(d.trapMoveTags==='rounds down|−29|rounds up|+49','trap: move tags −29 / +49');
      f(d.trapAria===true,'trap: aria-label');
    }
    f(d.katexNodes>50,'KaTeX nodes > 50 (got '+d.katexNodes+')');
    f(d.katexErrors===0,'KaTeX errors 0');
    f(d.dollarInText===0,'no raw \$ in prose');
    f(d.rawDollarInSvg===0,'no raw \$ in SVG');
    f(d.quizClicked===5,'quiz 5/5 clicked');
    f(/scored\s*5\s*\/\s*5/.test((sc.scoreText||[]).join('')),'quiz scored 5/5: '+((sc.scoreText||[]).join('')||'(none)'));
    f(d.showButtons===8 && (sc.solPills||0)===11,'solutions expanded: 8 exercise pills + 3 example pills (got show='+d.showButtons+' sol='+(sc.solPills||0)+')');
    f(!d.hOverflow,'no horizontal overflow (scroll '+d.docScrollW+' vs view '+d.innerWidth+')');
    f(!d.crashText,'no crash text');
    f((sc.consoleErrors||0)===0,'console errors 0 (got '+sc.consoleErrors+')');
    console.log((fails===0?'  ALL PASS ':'  '+fails+' FAILS ')+ '($1)');
    process.exit(fails===0?0:1);
  "
}

echo "== desktop 1280 =="
agent-browser set viewport 1280 900 >/dev/null 2>&1 || true
run_checks desktop
# screenshots: both figures
agent-browser eval "var s=[].slice.call(document.querySelectorAll('figure svg')).find(function(x){return (x.getAttribute('viewBox')||'')==='0 0 760 280'});s.scrollIntoView({block:'center'});'ok'" >/dev/null 2>&1
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot "$OUT/trap-1280.png" >/dev/null 2>&1
agent-browser eval "var s=[].slice.call(document.querySelectorAll('figure svg')).find(function(x){return (x.getAttribute('viewBox')||'')==='0 0 760 180'});s.scrollIntoView({block:'center'});'ok'" >/dev/null 2>&1
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot "$OUT/nl-1280.png" >/dev/null 2>&1

echo "== dark mode 1280 (both figures) =="
agent-browser eval "document.documentElement.classList.add('dark');'dark-on'" >/dev/null 2>&1
agent-browser eval "var s=[].slice.call(document.querySelectorAll('figure svg')).find(function(x){return (x.getAttribute('viewBox')||'')==='0 0 760 280'});s.scrollIntoView({block:'center'});'ok'" >/dev/null 2>&1
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot "$OUT/trap-dark-1280.png" >/dev/null 2>&1
agent-browser eval "var s=[].slice.call(document.querySelectorAll('figure svg')).find(function(x){return (x.getAttribute('viewBox')||'')==='0 0 760 180'});s.scrollIntoView({block:'center'});'ok'" >/dev/null 2>&1
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot "$OUT/nl-dark-1280.png" >/dev/null 2>&1
agent-browser eval "document.documentElement.classList.remove('dark');'dark-off'" >/dev/null 2>&1

echo "== mobile 390 =="
agent-browser set viewport 390 844 >/dev/null 2>&1 || true
run_checks mobile
agent-browser eval "var s=[].slice.call(document.querySelectorAll('figure svg')).find(function(x){return (x.getAttribute('viewBox')||'')==='0 0 760 280'});s.scrollIntoView({block:'center'});'ok'" >/dev/null 2>&1
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot "$OUT/trap-390.png" >/dev/null 2>&1
agent-browser eval "var s=[].slice.call(document.querySelectorAll('figure svg')).find(function(x){return (x.getAttribute('viewBox')||'')==='0 0 760 180'});s.scrollIntoView({block:'center'});'ok'" >/dev/null 2>&1
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot "$OUT/nl-390.png" >/dev/null 2>&1

echo "== done — outputs in $OUT =="

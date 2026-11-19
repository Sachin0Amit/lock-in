#!/usr/bin/env bash
# e2e-fm-21.sh — visual-upgrade run E2E for FM lesson 2.1 (fm-addition-carrying):
# desktop 1280 + mobile 390 + dark-mode, screenshots of all four figures,
# quiz interactivity + KaTeX + console-error capture.
set -u
BASE=http://localhost:3000/book/foundation-mathematics/lesson/fm-addition-carrying
OUT=/tmp/e2e-fm21
mkdir -p "$OUT"
PAGE_JS=$(cat /home/z/my-project/scripts/e2e-fm-21.page.js)

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
    f(d.figureCount===4,'exactly 4 figures (got '+d.figureCount+')');
    f(d.hasNL && d.hasBoard && d.hasCol && d.hasRip,'number line + counting board + seat map + ripple present');
    if(d.nlLines!==undefined){
      f(d.nlLines===22,'nl: 22 lines (2 rails + 20 ticks, got '+d.nlLines+')');
      f(d.nlTexts===24,'nl: 24 texts (got '+d.nlTexts+')');
      f(d.nlCircles===4,'nl: 4 dots (got '+d.nlCircles+')');
      f(d.nlDots==='340,550,270,550','nl: dots on the 4/7 and 3/7 columns');
      f(d.nlArcCount===2,'nl: 2 hop arcs (got '+d.nlArcCount+')');
      f(d.nlArcD==='M 340 82 Q 445 10 550 80|M 270 194 Q 410 122 550 192','nl: hop arcs anchored dot-column to dot-column with arrowheads');
      f(d.nlTickLabels==='0,1,2,3,4,5,6,7,8,9','nl: top tick labels 0..9');
      f(d.nlTickLabelsBottom==='0,1,2,3,4,5,6,7,8,9','nl: bottom tick labels 0..9');
      f(d.nlGroup14===true,'nl: 14px group font (mobile legibility)');
      f(d.nlAria===true,'nl: aria-label');
    }
    if(d.boardCounters!==undefined){
      f(d.boardWires===3,'board: 3 wires (got '+d.boardWires+')');
      f(d.boardLines===4,'board: 4 lines total incl. the rise guide (got '+d.boardLines+')');
      f(d.boardCounters===10,'board: EXACTLY ten counters on the full wire (got '+d.boardCounters+')');
      f(d.boardCounterXs==='173,219,265,311,357,403,449,495,541,587','board: counter centres at pitch 46');
      f(d.boardAloft===1 && d.boardGhost===1,'board: one carried counter mid-flight + one dashed landing ghost');
      f(d.boardGuide==='380,206,152','board: rise guide from the wire (206) to 2px below the ghost bottom (152)');
      f(d.boardLabels==='one of the next seat|ten of one seat — the wire is full','board: the two exchange labels');
      f(d.boardAria===true,'board: aria-label');
    }
    if(d.colLines!==undefined){
      f(d.colLines===2,'col: 2 lines (sum line + each-carry guide, got '+d.colLines+')');
      f(d.colRects===11,'col: 11 rects (3 carry + 8 digit cells, got '+d.colRects+')');
      f(d.colTexts===20,'col: 20 texts (got '+d.colTexts+')');
      f(d.colCarryCells===3,'col: 3 carry cells');
      f(d.colRow1==='4589' && d.colRow2==='2764' && d.colSumDigits==='7353','col: file digits walk to the sum (4589 + 2764 = 7353)');
      f(d.colArrowD==='M 635 94 Q 565 76 495 58|M 495 94 Q 425 76 355 58|M 355 94 Q 285 76 215 58','col: carry arrows at exact column centres → exact carry-cell bottoms');
      f(d.colNote===true,'col: totals note names 13, 15, 13, 7 and carries 1, 1, 1');
      f(d.colAria===true,'col: aria-label');
    }
    if(d.ripLines!==undefined){
      f(d.ripLines===1,'rip: 1 sum line (got '+d.ripLines+')');
      f(d.ripRects===10,'rip: 10 rects (3 carry + 6 digit + the new-seat zone, got '+d.ripRects+')');
      f(d.ripTexts===18,'rip: 18 texts (got '+d.ripTexts+')');
      f(d.ripZone===1,'rip: the dashed new-seat zone present');
      f(d.ripRow2==='001','rip: the 1 padded into its seats (001, got '+d.ripRow2+')');
      f(d.ripFaintZeros===2,'rip: two faint placeholder zeros');
      f(d.ripSumDigits==='1000','rip: sum reads 1000');
      f(d.ripArrowD==='M 635 94 Q 565 76 495 58|M 495 94 Q 425 76 355 58|M 355 94 Q 285 76 215 58','rip: the three ripple arrows chain to the new seat');
      f(d.ripNewSeatTag===true,'rip: «the new seat» tag');
      f(d.ripAria===true,'rip: aria-label');
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
# screenshots: all four figures
shot () { # $1 = viewBox, $2 = outfile
  agent-browser eval "var s=[].slice.call(document.querySelectorAll('figure svg')).find(function(x){return (x.getAttribute('viewBox')||'')==='$1'});if(s){s.scrollIntoView({block:'center'});}'ok'" >/dev/null 2>&1
  agent-browser wait 500 >/dev/null 2>&1 || true
  agent-browser screenshot "$2" >/dev/null 2>&1
}
shot '0 0 760 240' "$OUT/nl-1280.png"
shot '0 0 760 250' "$OUT/board-1280.png"
shot '0 0 760 290' "$OUT/seatmap-1280.png"
agent-browser eval "var s=[].slice.call(document.querySelectorAll('figure svg')).filter(function(x){return (x.getAttribute('viewBox')||'')==='0 0 760 290'})[1];if(s){s.scrollIntoView({block:'center'});}'ok'" >/dev/null 2>&1
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot "$OUT/ripple-1280.png" >/dev/null 2>&1

echo "== dark mode 1280 (all four figures) =="
agent-browser eval "document.documentElement.classList.add('dark');'dark-on'" >/dev/null 2>&1
shot '0 0 760 240' "$OUT/nl-dark-1280.png"
shot '0 0 760 250' "$OUT/board-dark-1280.png"
agent-browser eval "var s=[].slice.call(document.querySelectorAll('figure svg')).filter(function(x){return (x.getAttribute('viewBox')||'')==='0 0 760 290'})[1];if(s){s.scrollIntoView({block:'center'});}'ok'" >/dev/null 2>&1
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot "$OUT/ripple-dark-1280.png" >/dev/null 2>&1
agent-browser eval "document.documentElement.classList.remove('dark');'dark-off'" >/dev/null 2>&1

echo "== mobile 390 =="
agent-browser set viewport 390 844 >/dev/null 2>&1 || true
run_checks mobile
shot '0 0 760 240' "$OUT/nl-390.png"
shot '0 0 760 250' "$OUT/board-390.png"
shot '0 0 760 290' "$OUT/seatmap-390.png"
agent-browser eval "var s=[].slice.call(document.querySelectorAll('figure svg')).filter(function(x){return (x.getAttribute('viewBox')||'')==='0 0 760 290'})[1];if(s){s.scrollIntoView({block:'center'});}'ok'" >/dev/null 2>&1
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot "$OUT/ripple-390.png" >/dev/null 2>&1

echo "== done — outputs in $OUT =="

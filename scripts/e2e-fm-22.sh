#!/usr/bin/env bash
# e2e-fm-22.sh — visual-upgrade run E2E for FM lesson 2.2 (fm-subtraction-borrowing):
# desktop 1280 + mobile 390 + dark-mode, screenshots of all four figures,
# quiz interactivity + KaTeX + console-error capture.
set -u
BASE=http://localhost:3000/book/foundation-mathematics/lesson/fm-subtraction-borrowing
OUT=/tmp/e2e-fm22
mkdir -p "$OUT"
PAGE_JS=$(cat /home/z/my-project/scripts/e2e-fm-22.page.js)

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
    f(d.hasNL && d.hasBorrow && d.hasDissolve && d.hasClimb,'number line + borrow map + dissolve + climb present');
    if(d.nlLines!==undefined){
      f(d.nlLines===27,'nl: 27 lines (3 rails + 24 ticks, got '+d.nlLines+')');
      f(d.nlTexts===29,'nl: 29 texts (got '+d.nlTexts+')');
      f(d.nlCircles===4,'nl: 4 dots incl. the dashed ghost (got '+d.nlCircles+')');
      f(d.nlDots==='550,340,410,60','nl: dots on the 7/4 and 3/-4 columns (got '+d.nlDots+')');
      f(d.nlGhost===1,'nl: the dashed would-be landing ring at -4');
      f(d.nlArcCount===2,'nl: 2 hop arcs (got '+d.nlArcCount+')');
      f(d.nlArcD==='M 550 82 Q 445 10 340 80|M 410 194 Q 235 122 60 192','nl: hop arcs anchored dot-column to dot-column with arrowheads');
      f(d.nlTickLabels==='0,1,2,3,4,5,6,7,8,9','nl: top tick labels 0..9');
      f(d.nlTickLabelsBottom==='-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9','nl: bottom tick labels -4..9 (got '+d.nlTickLabelsBottom+')');
      f(d.nlGroup14===true,'nl: 14px group font (mobile legibility)');
      f(d.nlAria===true,'nl: aria-label');
    }
    if(d.boLines!==undefined){
      f(d.boLines===3,'bo: 3 lines (2 strikes + sum line, got '+d.boLines+')');
      f(d.boRects===9,'bo: 9 rects (8 digit cells + exchange pill, got '+d.boRects+')');
      f(d.boTexts===19,'bo: 19 texts (got '+d.boTexts+')');
      f(d.boPill===1,'bo: the exchange-rate pill (rx 17)');
      f(d.boArrowD==='M 215 94 Q 285 66 355 94','bo: borrow arrow lender-centre → receiver-centre');
      f(d.boRow1==='4589' && d.boRow2==='2764' && d.boDiff==='1825','bo: file digits walk to the difference (4589 − 2764 = 1825)');
      f(d.boCorr==='3,15','bo: pencil corrections 4→3 and 5→15');
      f(d.boPillText===true,'bo: «1 thousand = 10 hundreds» pill text');
      f(d.boSumLine===true,'bo: sum line 140..710 (symmetric overhangs)');
      f(d.boNote===true,'bo: note names the borrow arithmetic');
      f(d.boAria===true,'bo: aria-label');
    }
    if(d.diLines!==undefined){
      f(d.diLines===5,'di: 5 lines (4 strikes + sum line, got '+d.diLines+')');
      f(d.diRects===9,'di: 9 rects (8 cells + dissolved zone, got '+d.diRects+')');
      f(d.diTexts===20,'di: 20 texts (got '+d.diTexts+')');
      f(d.diZone===1,'di: the dashed dissolved-seat zone present');
      f(d.diArrowD==='M 215 94 Q 285 66 355 94|M 355 94 Q 425 66 495 94|M 495 94 Q 565 66 635 94','di: the three lends chain thousands→hundreds→tens→ones');
      f(d.diRow1==='1000' && d.diRow2==='0001','di: 1000 minus the padded 0001');
      f(d.diFaintZeros===3,'di: three faint placeholder zeros');
      f(d.diAnswer==='999','di: answer reads 999 — no digit in the dissolved slot');
      f(d.diCorr==='0,9,9,10','di: corrections 1→0, 0→9, 0→9, 0→10');
      f(d.diZoneTag===true,'di: «the dissolved seat» tag');
      f(d.diLends===true,'di: «lends →» label');
      f(d.diNote===true,'di: note names the chain');
      f(d.diAria===true,'di: aria-label');
    }
    if(d.clRects!==undefined){
      f(d.clRects===1 && d.clBar==='60,660','cl: one 660px journey bar from x=60 (got '+d.clBar+')');
      f(d.clLines===12,'cl: 12 lines (3 dividers + 5 binding + 4 hop ticks, got '+d.clLines+')');
      f(d.clPoly===1,'cl: the arrival arrowhead');
      f(d.clTexts===11,'cl: 11 texts (got '+d.clTexts+')');
      f(d.clDividers==='73.02,145.35,687.81','cl: true-scale boundaries (got '+d.clDividers+')');
      f(d.clHopLabels==='+36,+200,+1,500,+89','cl: hop labels +36 · +200 · +1,500 · +89');
      f(d.clMilestones==='2,800,3,000,4,500','cl: milestones 2,800 · 3,000 · 4,500');
      f(d.clEnds==='2,764,4,589','cl: bold ends 2,764 · 4,589');
      f(d.clNote===true,'cl: note totals 1,825 with no borrow');
      f(d.clAria===true,'cl: aria-label');
    }
    f(d.katexNodes>50,'KaTeX nodes > 50 (got '+d.katexNodes+')');
    f(d.katexErrors===0,'KaTeX errors 0');
    f(d.dollarInText===0,'no raw \$ in prose');
    f(d.rawDollarInSvg===0,'no raw \$ in SVG');
    f(d.quizClicked===5,'quiz 5/5 clicked');
    f(/scored\s*5\s*\/\s*5/.test((sc.scoreText||[]).join('')),'quiz scored 5/5: '+((sc.scoreText||[]).join('')||'(none)'));
    f(d.showButtons===8 && (sc.solPills||0)===10,'solutions expanded: 8 exercise pills + 2 example pills (got show='+d.showButtons+' sol='+(sc.solPills||0)+')');
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
shot () { # $1 = viewBox, $2 = outfile, $3 = aria-regex
  agent-browser eval "var s=[].slice.call(document.querySelectorAll('figure svg')).find(function(x){return (x.getAttribute('viewBox')||'')==='$1' && /$3/.test(x.getAttribute('aria-label')||'')});if(s){s.scrollIntoView({block:'center'});}'ok'" >/dev/null 2>&1
  agent-browser wait 500 >/dev/null 2>&1 || true
  agent-browser screenshot "$2" >/dev/null 2>&1
}
shot '0 0 760 258' "$OUT/nl-1280.png" '7 minus 3'
shot '0 0 760 290' "$OUT/borrow-1280.png" '4589 minus 2764'
shot '0 0 760 290' "$OUT/dissolve-1280.png" '1000 minus 1'
shot '0 0 760 250' "$OUT/climb-1280.png" 'journey bar'

echo "== dark mode 1280 (all four figures) =="
agent-browser eval "document.documentElement.classList.add('dark');'dark-on'" >/dev/null 2>&1
shot '0 0 760 258' "$OUT/nl-dark-1280.png" '7 minus 3'
shot '0 0 760 290' "$OUT/borrow-dark-1280.png" '4589 minus 2764'
shot '0 0 760 290' "$OUT/dissolve-dark-1280.png" '1000 minus 1'
shot '0 0 760 250' "$OUT/climb-dark-1280.png" 'journey bar'
agent-browser eval "document.documentElement.classList.remove('dark');'dark-off'" >/dev/null 2>&1

echo "== mobile 390 =="
agent-browser set viewport 390 844 >/dev/null 2>&1 || true
run_checks mobile
shot '0 0 760 258' "$OUT/nl-390.png" '7 minus 3'
shot '0 0 760 290' "$OUT/borrow-390.png" '4589 minus 2764'
shot '0 0 760 290' "$OUT/dissolve-390.png" '1000 minus 1'
shot '0 0 760 250' "$OUT/climb-390.png" 'journey bar'

echo "== done — outputs in $OUT =="

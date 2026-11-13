#!/usr/bin/env bash
# e2e-al-121.sh — per-lesson E2E for Elementary Algebra lesson 12.1 (Ratio Laws
# and the Componendo Family): desktop 1280 + mobile 390 + dark-mode, quiz
# interactivity (keys 1/1/1/0/1) + KaTeX + console-error capture + screenshots.
set -u
BASE=http://localhost:3000/book/elementary-algebra/lesson/al-ratio-laws-and-the-componendo-family
OUT=/tmp/e2e-al121
mkdir -p "$OUT"
PAGE_JS=$(cat /home/z/my-project/scripts/e2e-al-121.page.js)

run_checks () {  # $1 = label
  LESSON_PATH='al-ratio-laws-and-the-componendo-family'
  nav_ok() {
    local LOC
    LOC=$(agent-browser eval "location.pathname" 2>/dev/null | tr -d '"' || true)
    printf '%s' "$LOC" | grep -q "$LESSON_PATH"
  }
  agent-browser open "$BASE" >/dev/null 2>&1 || true
  agent-browser wait --load networkidle >/dev/null 2>&1 || true
  if ! nav_ok; then
    agent-browser eval "location.assign('$BASE');'nav'" >/dev/null 2>&1 || true
    agent-browser wait --load networkidle >/dev/null 2>&1 || true
    agent-browser wait 2000 >/dev/null 2>&1 || true
  fi
  if ! nav_ok; then
    echo "  FAIL navigation to $LESSON_PATH (still on $(agent-browser eval "location.pathname" 2>/dev/null))"
  fi
  agent-browser wait --load networkidle >/dev/null 2>&1 || true
  agent-browser wait 3000 >/dev/null 2>&1 || true
  agent-browser reload >/dev/null 2>&1 || true
  agent-browser wait --load networkidle >/dev/null 2>&1 || true
  agent-browser wait 3000 >/dev/null 2>&1 || true
  PREV=""
  for _ in 1 2 3 4 5 6 7 8 9 10 11 12; do
    CUR=$(agent-browser eval "document.querySelectorAll('.lesson-body .katex').length" 2>/dev/null | tr -d '"' || true)
    if [ -n "$CUR" ] && [ "$CUR" = "$PREV" ]; then break; fi
    PREV="$CUR"
    agent-browser wait 900 >/dev/null 2>&1 || true
  done
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
    pass(d.quizClicked===5,'quiz: 5 answers clicked on intended keys (got '+d.quizClicked+')');
    pass(d.showButtons>=1,'show-solution buttons present ('+d.showButtons+')');
    pass(d.katexNodes>60,'KaTeX nodes > 60 (got '+d.katexNodes+')');
    pass(d.katexErrors===0,'KaTeX errors 0 (got '+d.katexErrors+')');
    pass(d.dollarInText===0,'raw \$ in text 0 (got '+d.dollarInText+')');
    pass(d.svgCount===2,'2 figures rendered (got '+d.svgCount+')');
    pass(d.rawDollarInSvg===0,'no raw LaTeX in SVG text (got '+d.rawDollarInSvg+')');
    pass(d.tables===2,'two tables in 12.1 (got '+d.tables+')');
    pass(d.termHits>=12,'terms present ('+d.termHits+' hits)');
    pass(d.prereqChips>=3,'prerequisite chips, authored = 3 (got '+d.prereqChips+')');
    pass(d.docScrollW<=d.innerWidth+1,'no horizontal overflow ('+d.docScrollW+' vs '+d.innerWidth+')');
    if(sc.scoreText) pass(/5\/5/.test(sc.scoreText[0]),'quiz scored 5/5 live ('+sc.scoreText[0]+')');
    pass(sc.solPills>=20,'Sol. pills >= 20 after expansion (got '+sc.solPills+')');
    pass((sc.consoleErrors||0)===0,'console errors 0 (got '+sc.consoleErrors+')');
  "
}

echo "== DESKTOP 1280 =="
agent-browser set viewport 1280 900 >/dev/null 2>&1 || true
run_checks desktop
agent-browser screenshot "$OUT/desktop.png" >/dev/null 2>&1 || true

echo "== MOBILE 390 =="
agent-browser set viewport 390 844 >/dev/null 2>&1 || true
run_checks mobile
agent-browser screenshot "$OUT/mobile.png" >/dev/null 2>&1 || true

echo "== DARK MODE (1280) =="
agent-browser set viewport 1280 900 >/dev/null 2>&1 || true
run_checks dark
agent-browser eval "document.documentElement.classList.add('dark');'dark-on'" >/dev/null 2>&1 || true
agent-browser wait 1200 >/dev/null 2>&1 || true
agent-browser screenshot "$OUT/dark.png" >/dev/null 2>&1 || true
agent-browser eval "document.documentElement.classList.remove('dark');'dark-off'" >/dev/null 2>&1 || true
agent-browser set viewport 1280 900 >/dev/null 2>&1 || true
echo "DONE e2e-al-121"

#!/usr/bin/env bash
# figure-audit-smoke.sh — E2E smoke for figure-audit-touched lessons.
# Usage: bash scripts/figure-audit-smoke.sh <lessonId>:<figCount>:<k1,k2,k3,k4,k5> [...]
set -u
PAGE_JS=$(cat /home/z/my-project/scripts/figure-audit-smoke.page.js)
OUT=/tmp/figaudit-smoke
mkdir -p "$OUT"

for SPEC in "$@"; do
  L="${SPEC%%:*}"; REST="${SPEC#*:}"
  FIGS="${REST%%:*}"; KEYS="${REST#*:}"
  case "$L" in
    ans-*) BB="http://localhost:3000/book/arithmetic-and-number-systems/lesson" ;;
    al-*)  BB="http://localhost:3000/book/elementary-algebra/lesson" ;;
    aa-*)  BB="http://localhost:3000/book/advanced-algebra/lesson" ;;
    *)     BB="http://localhost:3000/book/foundation-mathematics/lesson" ;;
  esac
  echo "== $L (figures=$FIGS keys=$KEYS) =="
  for VP in "1280 900 desktop" "390 844 mobile"; do
    set -- $VP; W=$1; H=$2; TAG=$3
    agent-browser set viewport "$W" "$H" >/dev/null 2>&1 || true
    agent-browser open "$BB/$L" >/dev/null 2>&1
    agent-browser wait --load networkidle >/dev/null 2>&1 || true
    agent-browser wait 1200 >/dev/null 2>&1 || true
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$BB/$L")
    agent-browser eval "window.__e2eErrors=[];var _ce=console.error;console.error=function(){window.__e2eErrors.push([].slice.call(arguments).join(' '));_ce.apply(console,arguments)};window.__intended=[$KEYS];'installed'" >/dev/null 2>&1
    agent-browser eval "$PAGE_JS" > "$OUT/$L.$TAG.json" 2>"$OUT/$L.$TAG.err"
    agent-browser wait 800 >/dev/null 2>&1 || true
    agent-browser eval "JSON.stringify({scoreText:(document.body.textContent.match(/You scored[^·]*/g)||[]).slice(0,1),consoleErrors:(window.__e2eErrors||[]).length})" > "$OUT/$L.$TAG.errcount" 2>/dev/null
    node -e "
      const fs=require('fs');
      const parse=(p)=>{let raw=fs.readFileSync(p,'utf8').trim();let d=JSON.parse(raw);if(typeof d==='string')d=JSON.parse(d);return d};
      let d;try{d=parse('$OUT/$L.$TAG.json')}catch(e){console.log('  RAW:',fs.readFileSync('$OUT/$L.$TAG.json','utf8').slice(0,300));process.exit(0)}
      let ec={};try{ec=parse('$OUT/$L.$TAG.errcount')}catch(e){}
      const pass=(c,m)=>console.log('  [$TAG] '+(c?'PASS ':'FAIL ')+m);
      pass('$STATUS'==='200','route 200 (got $STATUS)');
      pass(d.hasBody,'lesson body');
      pass(d.figureCount===$FIGS,'figure count '+$FIGS+' (got '+d.figureCount+')');
      pass(d.zeroSize===0,'no zero-size figures (got '+d.zeroSize+')');
      pass(d.figAras,'every svg has honest aria-label');
      pass(d.katexNodes>0 && d.katexErrors===0,'KaTeX renders, 0 errors ('+d.katexNodes+' nodes)');
      pass(d.dollarInText===0,'no raw \$ in prose');
      pass(d.quizClicked===5,'quiz 5 answers clicked (got '+d.quizClicked+')');
      pass(/scored\s*5\s*\/\s*5/.test((ec.scoreText||[]).join('')),'quiz scored 5/5: '+((ec.scoreText||[]).join('')||'(none)'));
      pass(!d.hOverflow,'no horizontal overflow ('+d.docScrollW+' vs '+d.innerWidth+')');
      pass(!d.crashText,'no crash text');
      pass((ec.consoleErrors||0)===0,'console errors 0 (got '+ec.consoleErrors+')');
    "
  done
  # dark-mode pass at 1280 (figures visible, no console errors on toggle)
  agent-browser set viewport 1280 900 >/dev/null 2>&1 || true
  agent-browser open "$BB/$L" >/dev/null 2>&1
  agent-browser wait --load networkidle >/dev/null 2>&1 || true
  agent-browser wait 800 >/dev/null 2>&1 || true
  agent-browser eval "window.__e2eErrors=[];var _ce=console.error;console.error=function(){window.__e2eErrors.push([].slice.call(arguments).join(' '));_ce.apply(console,arguments)};document.documentElement.classList.add('dark');'dark-on'" >/dev/null 2>&1
  agent-browser wait 600 >/dev/null 2>&1 || true
  agent-browser eval "var f=[].slice.call(document.querySelectorAll('figure svg'));JSON.stringify({n:f.length,zero:f.filter(function(s){var b=s.getBoundingClientRect();return b.width<10||b.height<10}).length,consoleErrors:(window.__e2eErrors||[]).length})" > "$OUT/$L.dark.json" 2>/dev/null
  node -e "
    const fs=require('fs');
    const parse=(p)=>{let raw=fs.readFileSync(p,'utf8').trim();let d=JSON.parse(raw);if(typeof d==='string')d=JSON.parse(d);return d};
    let d;try{d=parse('$OUT/$L.dark.json')}catch(e){console.log('  [dark] RAW:',fs.readFileSync('$OUT/$L.dark.json','utf8').slice(0,200));process.exit(0)}
    const pass=(c,m)=>console.log('  [dark] '+(c?'PASS ':'FAIL ')+m);
    pass(d.n===$FIGS,'dark: '+$FIGS+' figures render (got '+d.n+')');
    pass(d.zero===0,'dark: no zero-size figures');
    pass(d.consoleErrors===0,'dark: console errors 0 (got '+d.consoleErrors+')');
  "
  agent-browser eval "document.documentElement.classList.remove('dark');'light'" >/dev/null 2>&1
done
echo DONE

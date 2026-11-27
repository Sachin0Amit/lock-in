#!/usr/bin/env bash
# e2e-wh-12-13.sh — E2E for WORLD HISTORY lessons 1.2 'Sources: Literary and
# Archaeological' (quiz keys [2,3,1,0,2]) and 1.3 'Time, Periodisation and the
# Calendar' (quiz keys [0,2,3,1,0]) — HSS RUN 2's close. Desktop 1280 + TRUE
# 390px mobile (agent-browser set viewport — the open --viewport flag is known
# broken, window stays 1280) + dark mode; quiz interactivity + KaTeX + console
# errors + solution expansion + overflow checks.
set -u
declare -A SLUGS
SLUGS[12]="wh-sources-literary-and-archaeological"
SLUGS[13]="wh-time-periodisation-and-the-calendar"
declare -A KEYS
KEYS[12]="[2,3,1,0,2]"
KEYS[13]="[0,2,3,1,0]"
OUT=/tmp/e2e-wh-12-13
mkdir -p "$OUT"

# one-shell server guard (the sandbox reaps the dev server between calls)
if ! curl -s -o /dev/null http://localhost:3000/ 2>/dev/null; then
  setsid nohup bun run dev > dev.log 2>&1 &
  for i in $(seq 1 40); do
    sleep 2
    curl -s -o /dev/null http://localhost:3000/ 2>/dev/null && break
  done
fi

for N in 12 13; do
  SLUG="${SLUGS[$N]}"
  PAGE_JS=$(cat "scripts/e2e-wh-$N.page.js")
  BASE="http://localhost:3000/book/world-history/lesson/$SLUG"
  CODE=$(curl -s -o /dev/null -w '%{http_code}' "$BASE")
  echo "== lesson 1.$N ($SLUG): route warm $CODE =="

  for MODE in desktop mobile; do
    agent-browser close >/dev/null 2>&1 || true
    agent-browser open "$BASE" >/dev/null 2>&1 || true
    if [ "$MODE" = "desktop" ]; then
      agent-browser set viewport 1280 900 >/dev/null 2>&1
    else
      agent-browser set viewport 390 844 >/dev/null 2>&1
    fi
    agent-browser wait --load networkidle >/dev/null 2>&1
    agent-browser wait 2500 >/dev/null 2>&1
    agent-browser reload >/dev/null 2>&1 || true
    agent-browser wait --load networkidle >/dev/null 2>&1
    agent-browser wait 2500 >/dev/null 2>&1
    agent-browser eval "window.__e2eErrors=[];var _ce=console.error;console.error=function(){window.__e2eErrors.push([].slice.call(arguments).join(' '));_ce.apply(console,arguments)};'installed'" >/dev/null 2>&1
    agent-browser eval "$PAGE_JS" > "$OUT/l$N-$MODE.json" 2>/dev/null
    agent-browser wait 800 >/dev/null 2>&1
    agent-browser eval "JSON.stringify({consoleErrors:(window.__e2eErrors||[]).length})" > "$OUT/l$N-$MODE.score" 2>/dev/null
  done

  # dark mode probe (desktop)
  agent-browser close >/dev/null 2>&1 || true
  agent-browser open "$BASE" >/dev/null 2>&1 || true
  agent-browser set viewport 1280 900 >/dev/null 2>&1
  agent-browser wait --load networkidle >/dev/null 2>&1
  agent-browser wait 2000 >/dev/null 2>&1
  agent-browser eval "document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';'dark-set'" >/dev/null 2>&1
  agent-browser wait 1500 >/dev/null 2>&1
  agent-browser eval "$PAGE_JS" > "$OUT/l$N-dark.json" 2>/dev/null

  for MODE in desktop mobile dark; do
    node -e "
      const fs=require('fs');
      const parse=(p)=>{let raw=fs.readFileSync(p,'utf8').trim();let d=JSON.parse(raw);if(typeof d==='string')d=JSON.parse(d);return d};
      let d;try{d=parse('$OUT/l$N-'+process.argv[1]+'.json')}catch(e){console.log(process.argv[1],'RAW:',fs.readFileSync('$OUT/l$N-'+process.argv[1]+'.json','utf8').slice(0,200));process.exit(0)}
      let sc={};try{sc=parse('$OUT/l$N-'+process.argv[1]+'.score')}catch(e){}
      const pass=(c,m)=>console.log((c?'  PASS ':'  FAIL ')+m);
      console.log('[1.$N '+process.argv[1]+']');
      pass(d.hasBody,'lesson body');
      pass(d.quizClicked===5,'quiz 5/5 on keys ${KEYS[$N]} (got '+d.quizClicked+')');
      pass(d.showButtons>=15,'show-solution buttons >= 15 (got '+d.showButtons+')');
      pass(d.katexNodes>0,'KaTeX renders ('+d.katexNodes+' nodes)');
      pass(d.katexErrors===0,'0 KaTeX errors');
      pass(d.dollarInText===0,'no raw \$ in prose');
      pass(d.svgAll>=6,'SVGs >= 6 (3 body + 3 solution; got '+d.svgAll+')');
      pass(d.rawDollarInSvg===0,'SVG text hygiene');
      pass(d.tables>=1,'tables present (got '+d.tables+')');
      pass(d.termHits>=150,'vocabulary >= 150 hits (got '+d.termHits+')');
      pass(d.docScrollW<=d.innerWidth+2,'no horizontal overflow ('+d.docScrollW+' <= '+d.innerWidth+')');
      pass((sc.consoleErrors||0)===0,'console errors 0 (got '+(sc.consoleErrors||0)+')');
    " "$MODE"
  done
done
agent-browser close >/dev/null 2>&1 || true
echo "e2e-wh-12-13 done"

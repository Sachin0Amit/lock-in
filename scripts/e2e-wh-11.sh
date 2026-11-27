#!/usr/bin/env bash
# e2e-wh-11.sh — E2E for WORLD HISTORY lesson 1.1 'How History Is Written'
# (HSS RUN 1): desktop 1280 + mobile 390 + dark-mode; quiz interactivity on
# keys [1,0,2,3,1] + KaTeX + console-error capture + solution expansion +
# overflow checks. The lesson route: /book/world-history/lesson/wh-how-history-is-written
set -u
SLUG="wh-how-history-is-written"
PAGE_JS_PATH="scripts/e2e-wh-11.page.js"
BASE=http://localhost:3000/book/world-history/lesson/$SLUG
OUT=/tmp/e2e-wh-11
mkdir -p "$OUT"
PAGE_JS=$(cat "$PAGE_JS_PATH")

# one-shell server guard (the sandbox reaps the dev server between calls)
if ! curl -s -o /dev/null http://localhost:3000/ 2>/dev/null; then
  setsid nohup bun run dev > dev.log 2>&1 &
  for i in $(seq 1 40); do
    sleep 2
    curl -s -o /dev/null http://localhost:3000/ 2>/dev/null && break
  done
fi
# warm the lesson route (the site serves the DB pack, not the TS registry)
CODE=$(curl -s -o /dev/null -w '%{http_code}' "$BASE")
echo "route warm: $CODE"

run_checks () {  # $1 = label, $2 = viewport args
  agent-browser close >/dev/null 2>&1 || true
  agent-browser open "$BASE" $2 >/dev/null 2>&1 || true
  agent-browser wait --load networkidle >/dev/null 2>&1 || true
  agent-browser wait 2500 >/dev/null 2>&1 || true
  agent-browser reload >/dev/null 2>&1 || true
  agent-browser wait --load networkidle >/dev/null 2>&1 || true
  agent-browser wait 2500 >/dev/null 2>&1 || true
  agent-browser eval "window.__e2eErrors=[];var _ce=console.error;console.error=function(){window.__e2eErrors.push([].slice.call(arguments).join(' '));_ce.apply(console,arguments)};'installed'"
  agent-browser eval "$PAGE_JS" > "$OUT/$1.json" 2>"$OUT/$1.err" || true
  agent-browser wait 800 >/dev/null 2>&1 || true
  agent-browser eval "JSON.stringify({consoleErrors:(window.__e2eErrors||[]).length})" > "$OUT/$1.score" 2>"$OUT/$1.score.err" || true
}

run_checks "desktop" "--viewport 1280x900"
run_checks "mobile" "--viewport 390x844"

for label in desktop mobile; do
  node -e "
    const fs=require('fs');
    const parse=(p)=>{let raw=fs.readFileSync(p,'utf8').trim();let d=JSON.parse(raw);if(typeof d==='string')d=JSON.parse(d);return d};
    let d;try{d=parse('$OUT/'+process.argv[1]+'.json')}catch(e){console.log(process.argv[1],'RAW:',fs.readFileSync('$OUT/'+process.argv[1]+'.json','utf8').slice(0,300));process.exit(0)}
    let sc={};try{sc=parse('$OUT/'+process.argv[1]+'.score')}catch(e){}
    const pass=(c,m)=>console.log((c?'  PASS ':'  FAIL ')+m);
    console.log('['+process.argv[1]+']');
    pass(d.hasBody,'lesson body');
    pass(d.quizClicked===5,'quiz 5/5 on keys [1,0,2,3,1] (got '+d.quizClicked+')');
    pass(d.showButtons>=15,'show-solution buttons >= 15 (got '+d.showButtons+')');
    pass(d.katexNodes>0,'KaTeX renders ('+d.katexNodes+' nodes)');
    pass(d.katexErrors===0,'0 KaTeX errors');
    pass(d.dollarInText===0,'no raw \$ in prose');
    pass(d.svgAll>=9,'SVGs >= 9 (7 body + 2 solution; got '+d.svgAll+')');
    pass(d.rawDollarInSvg===0,'SVG text hygiene (no \$ / TeX in figure text)');
    pass(d.tables>=2,'tables >= 2 (got '+d.tables+')');
    pass(d.termHits>=200,'vocabulary >= 200 hits (got '+d.termHits+')');
    pass(d.docScrollW<=d.innerWidth+2,'no horizontal overflow ('+d.docScrollW+' <= '+d.innerWidth+')');
    pass((sc.consoleErrors||0)===0,'console errors 0 (got '+(sc.consoleErrors||0)+')');
  " "$label"
done

# dark mode (same probe on the dark scheme)
agent-browser close >/dev/null 2>&1 || true
agent-browser open "$BASE" --viewport 1280x900 >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser eval "document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';'dark-set'" >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
agent-browser eval "$PAGE_JS" > "$OUT/dark.json" 2>"$OUT/dark.err" || true
node -e "
  const fs=require('fs');
  const parse=(p)=>{let raw=fs.readFileSync(p,'utf8').trim();let d=JSON.parse(raw);if(typeof d==='string')d=JSON.parse(d);return d};
  let d;try{d=parse('$OUT/dark.json')}catch(e){console.log('dark RAW:',fs.readFileSync('$OUT/dark.json','utf8').slice(0,300));process.exit(0)}
  const pass=(c,m)=>console.log((c?'  PASS ':'  FAIL ')+m);
  console.log('[dark]');
  pass(d.hasBody,'lesson body in dark');
  pass(d.svgAll>=9,'figures render in dark ('+d.svgAll+')');
  pass(d.katexErrors===0,'0 KaTeX errors in dark');
  pass(d.docScrollW<=d.innerWidth+2,'no overflow in dark ('+d.docScrollW+' <= '+d.innerWidth+')');
"
agent-browser close >/dev/null 2>&1 || true
echo "e2e-wh-11 done"

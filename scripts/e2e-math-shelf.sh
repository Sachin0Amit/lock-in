#!/usr/bin/env bash
# e2e-math-shelf.sh — full-shelf planning pass E2E (2026-11-10): the 27-book
# mathematics shelf renders end-to-end — home shelf census, sampled planned
# books (Geometry, Coordinate Geometry, Real Analysis, the capstone), the
# long-synthetic TOC of the biggest book, empty states, 404 integrity,
# mobile pass, zero console errors on every page. Usage:
#   bash scripts/e2e-math-shelf.sh
set -u
BASE=http://localhost:3000
OUT=/tmp/mathshelf-e2e
mkdir -p "$OUT"
TRAP="window.__e2eErrors=[];var _ce=console.error;console.error=function(){window.__e2eErrors.push([].slice.call(arguments).join(' '));_ce.apply(console,arguments)};'trap-installed'"

agent-browser set viewport 1280 900 >/dev/null 2>&1 || true

echo "== home: the 27-book Mathematics shelf =="
agent-browser open "$BASE/" >/dev/null 2>&1
agent-browser eval "$TRAP" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
agent-browser eval "
  (function(){
    var t = document.body.textContent;
    var newTitles = ['Geometry','Coordinate Geometry','Trigonometry','Differential Calculus','Integral Calculus','Multivariable Calculus','Differential Equations','Linear Algebra','Discrete Mathematics','Number Theory','Set Theory','Mathematical Logic','Combinatorics','Probability Theory','Statistics','Real Analysis','Complex Analysis','Abstract Algebra','Topology','Numerical Analysis','Mathematical Methods for Engineering','Optimization and Operations Research','Advanced Mathematical Foundations'];
    var found = 0, missing = [];
    for (var i=0;i<newTitles.length;i++){ if (t.indexOf(newTitles[i])!==-1) found++; else missing.push(newTitles[i]); }
    return JSON.stringify({
      bookCount: (t.match(/27\s*books?/i) || [null])[0],
      newTitlesFound: found + '/' + newTitles.length,
      missing: missing,
      oldStillThere: t.indexOf('Foundation Mathematics')!==-1 && t.indexOf('Elementary Algebra')!==-1 && t.indexOf('Advanced Algebra')!==-1,
      consoleErrors: (window.__e2eErrors || []).length
    });
  })()
" > "$OUT/home.json" 2>"$OUT/home.err"
cat "$OUT/home.json"
agent-browser screenshot "$OUT/home.png" >/dev/null 2>&1 || true

echo "== sampled planned books: full TOC plans render =="
for bk in geometry coordinate-geometry real-analysis advanced-mathematical-foundations trigonometry; do
  PAGE_JS=$(sed "s/__BOOK_ID__/'$bk'/" /home/z/my-project/scripts/e2e-math-shelf.page.js)
  agent-browser open "$BASE/book/$bk" >/dev/null 2>&1
  agent-browser eval "$TRAP" >/dev/null 2>&1
  agent-browser wait --load networkidle >/dev/null 2>&1 || true
  agent-browser wait 1300 >/dev/null 2>&1 || true
  agent-browser eval "$PAGE_JS" > "$OUT/book-$bk.json" 2>"$OUT/book-$bk.err"
  cat "$OUT/book-$bk.json"
  agent-browser screenshot "$OUT/book-$bk.png" >/dev/null 2>&1 || true
done

echo "== planned-lesson titles spot-check on two books =="
agent-browser open "$BASE/book/geometry" >/dev/null 2>&1
agent-browser eval "$TRAP" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1000 >/dev/null 2>&1 || true
agent-browser eval "
  (function(){
    var t = document.body.textContent;
    var titles = ['Euclid\u2019s Five Postulates: the Rules of the Game','Pythagoras Proved: the Theorem Earned','The Non-Euclidean Door: when Parallel Lines Misbehave','Heron\u2019s Formula, Derived'];
    var found = titles.filter(function(x){return t.indexOf(x)!==-1;}).length;
    return JSON.stringify({ geometryTitlesFound: found + '/' + titles.length, consoleErrors: (window.__e2eErrors||[]).length });
  })()
" > "$OUT/geometry-titles.json" 2>&1
cat "$OUT/geometry-titles.json"
agent-browser open "$BASE/book/differential-calculus" >/dev/null 2>&1
agent-browser eval "$TRAP" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1000 >/dev/null 2>&1 || true
agent-browser eval "
  (function(){
    var t = document.body.textContent;
    var titles = ['The Sandwich Rule and Indeterminate Forms','Cauchy\u2019s Mean Value Theorem and Consequences','The Doorstep: the Reverse Question'];
    var found = titles.filter(function(x){return t.indexOf(x)!==-1;}).length;
    return JSON.stringify({ dcTitlesFound: found + '/' + titles.length, consoleErrors: (window.__e2eErrors||[]).length });
  })()
" > "$OUT/dc-titles.json" 2>&1
cat "$OUT/dc-titles.json"

echo "== empty states + 404 integrity on a new book =="
for p in revise glossary; do
  agent-browser open "$BASE/book/topology/$p" >/dev/null 2>&1
  agent-browser eval "$TRAP" >/dev/null 2>&1
  agent-browser wait --load networkidle >/dev/null 2>&1 || true
  agent-browser wait 900 >/dev/null 2>&1 || true
  agent-browser eval "
    (function(){
      return JSON.stringify({ page: '$p', rendered: document.body.textContent.length > 200,
        crash: /Application error|Internal Server Error/i.test(document.body.textContent),
        consoleErrors: (window.__e2eErrors || []).length });
    })()
  " > "$OUT/topology-$p.json" 2>&1
  cat "$OUT/topology-$p.json"
done
agent-browser open "$BASE/book/topology/lesson/top-nothing-yet" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "location.pathname.includes('top-nothing-yet') ? document.body.textContent.length : 'gone'" > "$OUT/404-lesson.txt" 2>&1
cat "$OUT/404-lesson.txt"; echo

echo "== mobile 390x844: the biggest planned TOC without overflow =="
agent-browser set viewport 390 844 >/dev/null 2>&1 || true
agent-browser open "$BASE/book/coordinate-geometry" >/dev/null 2>&1
agent-browser eval "$TRAP" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1200 >/dev/null 2>&1 || true
agent-browser eval "
  (function(){
    return JSON.stringify({
      h1: (document.querySelector('h1')||{}).textContent || '',
      plannedChip: (document.body.textContent.match(/\d+ planned/) || [null])[0],
      overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      consoleErrors: (window.__e2eErrors || []).length
    });
  })()
" > "$OUT/mobile.json" 2>"$OUT/mobile.err"
cat "$OUT/mobile.json"
agent-browser screenshot "$OUT/mobile.png" >/dev/null 2>&1 || true
agent-browser set viewport 1280 900 >/dev/null 2>&1 || true

echo "== screenshot pixel checks (non-blank, no blue cast) =="
python3 - "$OUT" <<'PYEOF'
import sys, os
from PIL import Image
out = sys.argv[1]
for name in ["home.png", "book-geometry.png", "book-coordinate-geometry.png", "mobile.png"]:
    p = os.path.join(out, name)
    if not os.path.exists(p):
        print(f"{name}: MISSING")
        continue
    im = Image.open(p).convert("RGB")
    w, h = im.size
    px = im.resize((min(w, 200), min(h, 200))).getdata()
    n = len(px)
    nonwhite = sum(1 for (r, g, b) in px if not (r > 240 and g > 240 and b > 240)) / n
    bluecast = sum(1 for (r, g, b) in px if b > 150 and b > r + 30 and b > g + 30) / n
    print(f"{name}: {w}x{h} nonwhite={nonwhite:.1%} bluecast={bluecast:.1%}")
PYEOF

echo "== done — outputs in $OUT =="

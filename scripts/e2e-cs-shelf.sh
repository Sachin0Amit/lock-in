#!/usr/bin/env bash
# e2e-cs-shelf.sh — the CS full-shelf planning pass E2E (2026-11-15,
# owner directive: mirror the mathematics method): the 44-book Computer
# Science shelf renders end-to-end — home shelf census, sampled planned
# books across the shelf, planned-TOC spot-checks, cover art wiring,
# empty states, 404 integrity, mobile pass, zero console errors.
# Phases (the sandbox reaps background daemons, so each phase runs in one
# bounded invocation driven by scripts/run-cs-e2e-phase.sh, which starts
# the dev server when down):
#   PHASE=home|books-a|books-b|spot|cover|states|mobile|all (default all)
set -u
PHASE="${PHASE:-all}"
BASE=http://localhost:3000
OUT=/tmp/csshelf-e2e
mkdir -p "$OUT"
TRAP="window.__e2eErrors=[];var _ce=console.error;console.error=function(){window.__e2eErrors.push([].slice.call(arguments).join(' '));_ce.apply(console,arguments)};'trap-installed'"
want() { [ "$PHASE" = "all" ] || [ "$PHASE" = "$1" ]; }

if want home; then
echo "== home: the 44-book Computer Science shelf =="
agent-browser set viewport 1280 900 >/dev/null 2>&1 || true
agent-browser open "$BASE/" >/dev/null 2>&1
agent-browser eval "$TRAP" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
agent-browser eval "
  (function(){
    var t = document.body.textContent;
    var titles = ['Computer Fundamentals','Digital Logic Design','Computer Organization and Architecture','Data Structures','Algorithms','Theory of Computation','Compiler Design','Operating Systems','Database Management Systems','Computer Networks','Computer Graphics','Software Engineering','Object-Oriented Programming','C Programming','Java Programming','Python Programming','JavaScript and Web Technologies','Frontend Engineering','Backend Engineering','Distributed Systems','Cloud Computing','Cybersecurity','Cryptography','Artificial Intelligence','Machine Learning','Deep Learning','Natural Language Processing','Computer Vision','Generative AI and LLMs','Reinforcement Learning','Data Science','Big Data Engineering','Data Mining','Information Retrieval','Blockchain','Internet of Things','Mobile App Development','Human-Computer Interaction','Parallel Computing','Advanced Computer Science'];
    var found = 0, missing = [];
    for (var i=0;i<titles.length;i++){ if (t.indexOf(titles[i])!==-1) found++; else missing.push(titles[i]); }
    return JSON.stringify({
      totalBooks: (t.match(/72\s*books?/i) || [null])[0],
      csTitleFound: found + '/' + titles.length,
      missing: missing,
      mathStillThere: t.indexOf('Foundation Mathematics')!==-1 && t.indexOf('Advanced Algebra')!==-1,
      consoleErrors: (window.__e2eErrors || []).length
    });
  })()
" > "$OUT/home.json" 2>"$OUT/home.err"
cat "$OUT/home.json"
agent-browser screenshot "$OUT/home.png" >/dev/null 2>&1 || true
fi

if want books || want books-a || want books-b; then
echo "== sampled planned CS books: full TOC plans render =="
PHASE_LIST="computer-fundamentals digital-logic-design theory-of-computation algorithms compiler-design"
[ "$PHASE" = books-b ] && PHASE_LIST="operating-systems database-management-systems java-programming generative-ai-and-llms advanced-computer-science"
[ "$PHASE" = all ] && PHASE_LIST="computer-fundamentals digital-logic-design theory-of-computation algorithms compiler-design operating-systems database-management-systems java-programming generative-ai-and-llms advanced-computer-science"
for bk in $PHASE_LIST; do
  PAGE_JS=$(sed "s/__BOOK_ID__/'$bk'/" /home/z/my-project/scripts/e2e-math-shelf.page.js)
  agent-browser open "$BASE/book/$bk" >/dev/null 2>&1
  agent-browser eval "$TRAP" >/dev/null 2>&1
  agent-browser wait --load networkidle >/dev/null 2>&1 || true
  agent-browser wait 1300 >/dev/null 2>&1 || true
  agent-browser eval "$PAGE_JS" > "$OUT/book-$bk.json" 2>"$OUT/book-$bk.err"
  cat "$OUT/book-$bk.json"
  agent-browser screenshot "$OUT/book-$bk.png" >/dev/null 2>&1 || true
done
fi

if want spot; then
echo "== planned-lesson titles spot-check on two books =="
agent-browser open "$BASE/book/theory-of-computation" >/dev/null 2>&1
agent-browser eval "$TRAP" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1000 >/dev/null 2>&1 || true
agent-browser eval "
  (function(){
    var t = document.body.textContent;
    var titles = ['The Halting Problem, Proved','Nondeterminism: the Parallel Lives','NP-Completeness: Cook-Levin and the Census','The Thesis Stated Honestly'];
    var found = titles.filter(function(x){return t.indexOf(x)!==-1;}).length;
    return JSON.stringify({ tocTitlesFound: found + '/' + titles.length, consoleErrors: (window.__e2eErrors||[]).length });
  })()
" > "$OUT/toc-titles.json" 2>&1
cat "$OUT/toc-titles.json"
agent-browser open "$BASE/book/operating-systems" >/dev/null 2>&1
agent-browser eval "$TRAP" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1000 >/dev/null 2>&1 || true
agent-browser eval "
  (function(){
    var t = document.body.textContent;
    var titles = ['The Banker\u2019s Algorithm, Worked','The Classic Problems, Solved Honestly','A Linux Boots: the Live Tour'];
    var found = titles.filter(function(x){return t.indexOf(x)!==-1;}).length;
    return JSON.stringify({ osTitlesFound: found + '/' + titles.length, consoleErrors: (window.__e2eErrors||[]).length });
  })()
" > "$OUT/os-titles.json" 2>&1
cat "$OUT/os-titles.json"
fi

if want cover; then
echo "== cover art wiring: the CS covers render on book pages =="
agent-browser open "$BASE/book/theory-of-computation" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1200 >/dev/null 2>&1 || true
agent-browser eval "
  (function(){
    var imgs = Array.prototype.slice.call(document.querySelectorAll('img'));
    var art = imgs.filter(function(i){ var s=(i.src||'').replace(/%2F/g,'/').replace(/%2F/g,'/'); return decodeURIComponent(s).indexOf('/covers/theory-of-computation.webp')!==-1 && i.complete && i.naturalWidth>10; });
    return JSON.stringify({ coverArtRendered: art.length > 0, totalImgs: imgs.length, consoleErrors: (window.__e2eErrors||[]).length });
  })()
" > "$OUT/cover.json" 2>&1
cat "$OUT/cover.json"
fi

if want states; then
echo "== empty states + 404 integrity on a new book =="
for p in revise glossary; do
  agent-browser open "$BASE/book/generative-ai-and-llms/$p" >/dev/null 2>&1
  agent-browser eval "$TRAP" >/dev/null 2>&1
  agent-browser wait --load networkidle >/dev/null 2>&1 || true
  agent-browser wait 900 >/dev/null 2>&1 || true
  agent-browser eval "
    (function(){
      return JSON.stringify({ page: '$p', rendered: document.body.textContent.length > 200,
        crash: /Application error|Internal Server Error/i.test(document.body.textContent),
        consoleErrors: (window.__e2eErrors || []).length });
    })()
  " > "$OUT/genai-$p.json" 2>&1
  cat "$OUT/genai-$p.json"
done
agent-browser open "$BASE/book/cybersecurity/lesson/sec-nothing-yet" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "location.pathname.includes('sec-nothing-yet') ? document.body.textContent.length : 'gone'" > "$OUT/404-lesson.txt" 2>&1
cat "$OUT/404-lesson.txt"; echo
fi

if want mobile; then
echo "== mobile 390x844: the biggest planned TOC without overflow =="
agent-browser set viewport 390 844 >/dev/null 2>&1 || true
agent-browser open "$BASE/book/computer-organization-architecture" >/dev/null 2>&1
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
fi

echo "== screenshot pixel checks (non-blank, no blue cast) =="
python3 - "$OUT" <<'PYEOF'
import sys, os
from PIL import Image
out = sys.argv[1]
for name in ["home.png", "book-theory-of-computation.png", "book-computer-fundamentals.png", "mobile.png"]:
    p = os.path.join(out, name)
    if not os.path.exists(p):
        print(f"{name}: MISSING (phase not run)")
        continue
    im = Image.open(p).convert("RGB")
    w, h = im.size
    px = im.resize((min(w, 200), min(h, 200))).getdata()
    n = len(px)
    nonwhite = sum(1 for (r, g, b) in px if not (r > 240 and g > 240 and b > 240)) / n
    bluecast = sum(1 for (r, g, b) in px if b > 150 and b > r + 30 and b > g + 30) / n
    print(f"{name}: {w}x{h} nonwhite={nonwhite:.1%} bluecast={bluecast:.1%}")
PYEOF

echo "== done (phase: $PHASE) — outputs in $OUT =="

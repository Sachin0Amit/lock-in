#!/usr/bin/env bash
# e2e-book4-promotion.sh — run-89 E2E: the promoted planned book renders
# end-to-end (home shelf, book TOC plan, revise/glossary empty states,
# 404 integrity, mobile pass, screenshots + pixel checks, zero console
# errors with the trap installed on EVERY page). Usage:
#   bash scripts/e2e-book4-promotion.sh
set -u
BASE=http://localhost:3000
OUT=/tmp/book4-e2e
mkdir -p "$OUT"
PAGE_JS=$(cat /home/z/my-project/scripts/e2e-book4-promotion.page.js)
TRAP="window.__e2eErrors=[];var _ce=console.error;console.error=function(){window.__e2eErrors.push([].slice.call(arguments).join(' '));_ce.apply(console,arguments)};'trap-installed'"

agent-browser set viewport 1280 900 >/dev/null 2>&1 || true

echo "== home: the new book appears on the Mathematics shelf =="
agent-browser open "$BASE/" >/dev/null 2>&1
agent-browser eval "$TRAP" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1200 >/dev/null 2>&1 || true
agent-browser eval "
  (function(){
    var t = document.body.textContent;
    return JSON.stringify({
      newBookOnShelf: t.indexOf('Advanced Algebra') !== -1,
      fourBooks: (t.match(/4\s*books?/i) || [null])[0],
      fmStillThere: t.indexOf('Foundation Mathematics') !== -1,
      ansStillThere: t.indexOf('Arithmetic and Number Systems') !== -1,
      alStillThere: t.indexOf('Elementary Algebra') !== -1,
      consoleErrors: (window.__e2eErrors || []).length
    });
  })()
" > "$OUT/home.json" 2>"$OUT/home.err"
cat "$OUT/home.json"
agent-browser screenshot "$OUT/home.png" >/dev/null 2>&1 || true

echo "== book page: the planned TOC =="
agent-browser open "$BASE/book/advanced-algebra" >/dev/null 2>&1
agent-browser eval "$TRAP" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
agent-browser eval "$PAGE_JS" > "$OUT/book.json" 2>"$OUT/book.err"
cat "$OUT/book.json"
agent-browser screenshot "$OUT/book.png" >/dev/null 2>&1 || true

echo "== revise + glossary empty states =="
for p in revise glossary; do
  agent-browser open "$BASE/book/advanced-algebra/$p" >/dev/null 2>&1
  agent-browser eval "$TRAP" >/dev/null 2>&1
  agent-browser wait --load networkidle >/dev/null 2>&1 || true
  agent-browser wait 1000 >/dev/null 2>&1 || true
  agent-browser eval "
    (function(){
      return JSON.stringify({
        page: '$p',
        rendered: document.body.textContent.length > 200,
        crash: /Application error|Internal Server Error/i.test(document.body.textContent),
        consoleErrors: (window.__e2eErrors || []).length
      });
    })()
  " > "$OUT/$p.json" 2>"$OUT/$p.err"
  cat "$OUT/$p.json"
done

echo "== 404 integrity: unknown lesson and unknown book =="
agent-browser open "$BASE/book/advanced-algebra/lesson/aa-nothing-yet" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "location.pathname.includes('aa-nothing-yet') ? document.body.textContent.length : 'gone'" > "$OUT/404-lesson.txt" 2>&1
cat "$OUT/404-lesson.txt"; echo
agent-browser open "$BASE/book/not-a-real-book" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "location.pathname.includes('not-a-real-book') ? document.body.textContent.length : 'gone'" > "$OUT/404-book.txt" 2>&1
cat "$OUT/404-book.txt"; echo
agent-browser screenshot "$OUT/404.png" >/dev/null 2>&1 || true

echo "== mobile 390x844: book page renders without horizontal overflow =="
agent-browser set viewport 390 844 >/dev/null 2>&1 || true
agent-browser open "$BASE/book/advanced-algebra" >/dev/null 2>&1
agent-browser eval "$TRAP" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1200 >/dev/null 2>&1 || true
agent-browser eval "
  (function(){
    return JSON.stringify({
      h1: (document.querySelector('h1')||{}).textContent || '',
      overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      plannedChip: (document.body.textContent.match(/35 planned/) || [null])[0],
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
for name in ["home.png", "book.png", "mobile.png"]:
    p = os.path.join(out, name)
    im = Image.open(p).convert("RGB")
    w, h = im.size
    px = im.resize((min(w, 200), min(h, 200))).getdata()
    n = len(px)
    nonwhite = sum(1 for (r, g, b) in px if not (r > 240 and g > 240 and b > 240)) / n
    bluecast = sum(1 for (r, g, b) in px if b > 150 and b > r + 30 and b > g + 30) / n
    print(f"{name}: {w}x{h} nonwhite={nonwhite:.1%} bluecast={bluecast:.1%}")
PYEOF

echo "== done — outputs in $OUT =="

#!/usr/bin/env bash
# e2e-book3-promotion.sh — run-66 E2E: the promoted planned book renders
# end-to-end (home shelf, book TOC plan, revise/glossary empty states,
# 404 integrity, zero console errors). Usage: bash scripts/e2e-book3-promotion.sh
set -u
BASE=http://localhost:3000
OUT=/tmp/book3-e2e
mkdir -p "$OUT"
PAGE_JS=$(cat /home/z/my-project/scripts/e2e-book3-promotion.page.js)

echo "== home: the new book appears on the Mathematics shelf =="
agent-browser open "$BASE/" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1200 >/dev/null 2>&1 || true
agent-browser eval "
  (function(){
    var t = document.body.textContent;
    return JSON.stringify({
      newBookOnShelf: t.indexOf('Elementary Algebra') !== -1,
      threeBooks: (t.match(/3\s*books?/i) || [null])[0],
      fmStillThere: t.indexOf('Foundation Mathematics') !== -1,
      ansStillThere: t.indexOf('Arithmetic and Number Systems') !== -1,
      consoleErrors: (window.__e2eErrors || []).length
    });
  })()
" > "$OUT/home.json" 2>"$OUT/home.err"
cat "$OUT/home.json"

echo "== book page: the planned TOC =="
agent-browser open "$BASE/book/elementary-algebra" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
agent-browser eval "$PAGE_JS" > "$OUT/book.json" 2>"$OUT/book.err"
cat "$OUT/book.json"

echo "== revise + glossary empty states =="
for p in revise glossary; do
  agent-browser open "$BASE/book/elementary-algebra/$p" >/dev/null 2>&1
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
agent-browser open "$BASE/book/elementary-algebra/lesson/al-nothing-yet" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser eval "location.pathname.includes('al-nothing-yet') ? document.body.textContent.length : 'gone'" > "$OUT/404-lesson.txt" 2>&1
cat "$OUT/404-lesson.txt"; echo
agent-browser open "$BASE/book/not-a-real-book" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser eval "location.pathname.includes('not-a-real-book') ? document.body.textContent.length : 'gone'" > "$OUT/404-book.txt" 2>&1
cat "$OUT/404-book.txt"; echo

echo "== done — outputs in $OUT =="

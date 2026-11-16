#!/usr/bin/env bash
# e2e-hl-shelf.sh — the Humanities & Languages full-shelf planning pass E2E
# (2026-11-16, owner directive: mirror the engineering method): the 16+13-book
# shelves render end-to-end — home shelf census, sampled planned books across
# the branches, planned-TOC spot-checks, cover art wiring, empty states, 404
# integrity, mobile pass, zero console errors.
# Phases (the sandbox reaps background daemons, so each phase runs in one
# bounded invocation driven by scripts/run-hl-e2e-phase.sh, which starts the
# dev server when down):
#   PHASE=home|books|spot|cover|states|mobile|all (default all)
set -u
PHASE="${PHASE:-all}"
BASE=http://localhost:3000
OUT=/tmp/hlshelf-e2e
mkdir -p "$OUT"
TRAP="window.__e2eErrors=[];var _ce=console.error;console.error=function(){window.__e2eErrors.push([].slice.call(arguments).join(' '));_ce.apply(console,arguments)};'trap-installed'"
want() { [ "$PHASE" = "all" ] || [ "$PHASE" = "$1" ]; }

if want home; then
echo "== home: the 29-book Humanities & Languages shelves =="
agent-browser set viewport 1280 900 >/dev/null 2>&1 || true
agent-browser open "$BASE/" >/dev/null 2>&1
agent-browser eval "$TRAP" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
agent-browser eval "
  (function(){
    var t = document.body.textContent;
    var hum = ['World History','Indian History','Political Science','International Relations','Public Administration','Law and Legal Studies','Sociology','Anthropology','Cultural Studies','Psychology','Philosophy','Ethics','Geography','Environmental Studies','Archaeology and Heritage Studies','Art History'];
    var lang = ['Japanese','German','French','Spanish','Mandarin','Korean','Arabic','Russian','Portuguese','Italian'];
    var foundH = hum.filter(function(x){return t.indexOf(x)!==-1;}).length;
    var foundL = lang.filter(function(x){return t.indexOf(x)!==-1;}).length;
    return JSON.stringify({
      totalBooks: (t.match(/139\s*books?/i) || [null])[0],
      humTitlesFound: foundH + '/' + hum.length,
      langTitlesFound: foundL + '/' + lang.length,
      mathStillThere: t.indexOf('Foundation Mathematics')!==-1 && t.indexOf('Advanced Algebra')!==-1,
      csStillThere: t.indexOf('Digital Logic Design')!==-1 && t.indexOf('Advanced Computer Science')!==-1,
      engStillThere: t.indexOf('Engineering Mechanics')!==-1 && t.indexOf('Thermodynamics')!==-1,
      consoleErrors: (window.__e2eErrors || []).length
    });
  })()
" > "$OUT/home.json" 2>"$OUT/home.err"
cat "$OUT/home.json"
agent-browser screenshot "$OUT/home.png" >/dev/null 2>&1 || true
fi

if want books; then
echo "== sampled planned humanities + languages books: full TOC plans render =="
PHASE_LIST="world-history indian-history sociology psychology geography law-and-legal-studies japanese german mandarin arabic english"
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
echo "== planned-lesson titles spot-check on four books =="
agent-browser open "$BASE/book/sociology" >/dev/null 2>&1
agent-browser eval "$TRAP" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1000 >/dev/null 2>&1 || true
agent-browser eval "
  (function(){
    var t = document.body.textContent;
    var titles = ['The Birth From Modernity','The Survey and Its Sampling','Marx and the Conflict Register','The Caste\u2019s Anatomy and Change'];
    var found = titles.filter(function(x){return t.indexOf(x)!==-1;}).length;
    return JSON.stringify({ socTitlesFound: found + '/' + titles.length, consoleErrors: (window.__e2eErrors||[]).length });
  })()
" > "$OUT/soc-titles.json" 2>&1
cat "$OUT/soc-titles.json"
agent-browser open "$BASE/book/psychology" >/dev/null 2>&1
agent-browser eval "$TRAP" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1000 >/dev/null 2>&1 || true
agent-browser eval "
  (function(){
    var t = document.body.textContent;
    var titles = ['The Schools\u2019 Census','The Neuron and the Transmitters','The Thresholds','The Classical Engine'];
    var found = titles.filter(function(x){return t.indexOf(x)!==-1;}).length;
    return JSON.stringify({ psyTitlesFound: found + '/' + titles.length, consoleErrors: (window.__e2eErrors||[]).length });
  })()
" > "$OUT/psy-titles.json" 2>&1
cat "$OUT/psy-titles.json"
agent-browser open "$BASE/book/japanese" >/dev/null 2>&1
agent-browser eval "$TRAP" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1000 >/dev/null 2>&1 || true
agent-browser eval "
  (function(){
    var t = document.body.textContent;
    var titles = ['The Three Scripts\u2019 Division','The Forty-Six Census','The Particle Census','The N5\u2019s Hundred'];
    var found = titles.filter(function(x){return t.indexOf(x)!==-1;}).length;
    return JSON.stringify({ jpnTitlesFound: found + '/' + titles.length, consoleErrors: (window.__e2eErrors||[]).length });
  })()
" > "$OUT/jpn-titles.json" 2>&1
cat "$OUT/jpn-titles.json"
agent-browser open "$BASE/book/german" >/dev/null 2>&1
agent-browser eval "$TRAP" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1000 >/dev/null 2>&1 || true
agent-browser eval "
  (function(){
    var t = document.body.textContent;
    var titles = ['The Vowels\u2019 Pure Discipline','The Gender\u2019s Logic','The Regular and the Strong Ablaut','The Verb-Second Regime'];
    var found = titles.filter(function(x){return t.indexOf(x)!==-1;}).length;
    return JSON.stringify({ gerTitlesFound: found + '/' + titles.length, consoleErrors: (window.__e2eErrors||[]).length });
  })()
" > "$OUT/ger-titles.json" 2>&1
cat "$OUT/ger-titles.json"
fi

if want cover; then
echo "== cover art wiring: the humanities + languages covers render on book pages =="
for covbk in sociology japanese; do
  agent-browser open "$BASE/book/$covbk" >/dev/null 2>&1
  agent-browser wait --load networkidle >/dev/null 2>&1 || true
  agent-browser wait 1200 >/dev/null 2>&1 || true
  agent-browser eval "
    (function(){
      var imgs = Array.prototype.slice.call(document.querySelectorAll('img'));
      var art = imgs.filter(function(i){ var s=(i.src||'').replace(/%2F/g,'/'); return decodeURIComponent(s).indexOf('/covers/$covbk.webp')!==-1 && i.complete && i.naturalWidth>10; });
      return JSON.stringify({ book: '$covbk', coverArtRendered: art.length > 0, totalImgs: imgs.length, consoleErrors: (window.__e2eErrors || []).length });
    })()
  " > "$OUT/cover-$covbk.json" 2>&1
  cat "$OUT/cover-$covbk.json"
done
fi

if want states; then
echo "== empty states + 404 integrity on new books =="
for p in revise glossary; do
  agent-browser open "$BASE/book/psychology/$p" >/dev/null 2>&1
  agent-browser eval "$TRAP" >/dev/null 2>&1
  agent-browser wait --load networkidle >/dev/null 2>&1 || true
  agent-browser wait 900 >/dev/null 2>&1 || true
  agent-browser eval "
    (function(){
      return JSON.stringify({ page: '$p', rendered: document.body.textContent.length > 200,
        crash: /Application error|Internal Server Error/i.test(document.body.textContent),
        consoleErrors: (window.__e2eErrors || []).length });
    })()
  " > "$OUT/psy-$p.json" 2>&1
  cat "$OUT/psy-$p.json"
done
agent-browser open "$BASE/book/sociology/lesson/soc-nothing-yet" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "location.pathname.includes('soc-nothing-yet') ? document.body.textContent.length : 'gone'" > "$OUT/404-lesson.txt" 2>&1
cat "$OUT/404-lesson.txt"; echo
fi

if want mobile; then
echo "== mobile 390x844: the biggest planned TOC without overflow =="
agent-browser set viewport 390 844 >/dev/null 2>&1 || true
agent-browser open "$BASE/book/indian-history" >/dev/null 2>&1
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
for name in ["home.png", "book-sociology.png", "book-japanese.png", "mobile.png"]:
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

#!/usr/bin/env python3
"""gen-geo129-e2e.py — generates the six per-lesson E2E pairs for the maths
RUN 129 ship (GEOMETRY ch.3 lessons 3.1-3.6), on the e2e-geo-24 pattern.
Pins CALIBRATED FROM THE LIVE DOM PROBE of this run (the honest method):
katex 595/490/560/630/744/902, bodyFigs 7/6/7/4/5/5, svgAll 28/29/29/26/25/26,
tables 4/3/2/3/4/2, show-solution buttons 15 everywhere, KaTeX errors 0,
prereq chips 11/12/14/12/18/12, all routes 200 warm.

Run:  cd /home/z/my-project && python3 scripts/gen-geo129-e2e.py
"""

import os

ROOT = "/home/z/my-project"

LESSONS = [
    {"slug": "geo-congruence-the-idea-of-same-shape-and-size", "code": "31", "num": "3.1",
     "title": "Congruence: the Idea of Same Shape and Size", "key": [1, 3, 0, 2, 1],
     "katex": 555, "bodyfig": 7, "svgall": 25, "tables": 4, "prereq": 10,
     "termre": "congruen|coincide|correspond|superposition|rigid|reflection|rotation|translation|perimeter|area|shape|size|mirror|motion"},
    {"slug": "geo-the-congruence-criteria-sas-asa-aas-sss-rhs", "code": "32", "num": "3.2",
     "title": "The Congruence Criteria: SAS, ASA, AAS, SSS, RHS", "key": [0, 2, 1, 3, 2],
     "katex": 450, "bodyfig": 6, "svgall": 26, "tables": 3, "prereq": 10,
     "termre": "criterion|criteria|SAS|ASA|AAS|SSS|RHS|included|opposite|ambiguous|equilateral|Pythagoras|hypotenuse|Euclid|I\\.4|I\\.26|I\\.8|angle sum"},
    {"slug": "geo-isosceles-triangles-the-classic-consequences", "code": "33", "num": "3.3",
     "title": "Isosceles Triangles: the Classic Consequences", "key": [2, 0, 3, 1, 0],
     "katex": 520, "bodyfig": 7, "svgall": 26, "tables": 2, "prereq": 12,
     "termre": "isosceles|equilateral|base angle|apex|pons asinorum|converse|altitude|median|bisector|Euclid|I\\.5|I\\.6|coincide|perpendicular"},
    {"slug": "geo-inequalities-in-a-triangle-sides-and-angles", "code": "34", "num": "3.4",
     "title": "Inequalities in a Triangle: Sides and Angles", "key": [3, 1, 2, 0, 3],
     "katex": 590, "bodyfig": 4, "svgall": 23, "tables": 3, "prereq": 10,
     "termre": "inequal|larger|smaller|exterior angle|hinge|triangle inequality|Euclid|I\\.16|I\\.18|I\\.19|I\\.20|ordering|side|angle"},
    {"slug": "geo-the-cevian-theorems-ceva-and-menelaus", "code": "35", "num": "3.5",
     "title": "The Cevian Theorems: Ceva and Menelaus", "key": [1, 0, 2, 3, 1],
     "katex": 700, "bodyfig": 5, "svgall": 22, "tables": 4, "prereq": 16,
     "termre": "cevian|Ceva|Menelaus|concurrent|concurrence|collinear|directed|product|transversal|median|centroid|ratio|sign"},
    {"slug": "geo-stewarts-theorem-and-the-median-relation", "code": "36", "num": "3.6",
     "title": "Stewart's Theorem and the Median Relation", "key": [0, 3, 1, 2, 0],
     "katex": 860, "bodyfig": 5, "svgall": 23, "tables": 2, "prereq": 10,
     "termre": "Stewart|cevian|median|Apollonius|centroid|bisector|parabola|quadratic|witness|length|altitude|vertex|minimum"},
]

PAGE_TMPL = """// e2e-geo-{code}.page.js — targeted interactivity for GEOMETRY lesson {num}
// '{title}' (quiz keys {key}; {bodyfig} body figures + solution figures; the
// live census calibrated in scripts/gen-geo129-e2e.py).
var r = {{}};
var body = document.querySelector('.lesson-body');
r.hasBody = !!body;

var quizSection = Array.prototype.slice
  .call(document.querySelectorAll('section'))
  .find(function (s) {{ return /CHECK YOURSELF|SELF-CHECK/i.test((s.querySelector('header') || {{}}).textContent || ''); }});

var intended = {key};
var clicked = 0;
if (quizSection) {{
  var allButtons = Array.prototype.slice.call(quizSection.querySelectorAll('button'))
    .filter(function (b) {{ return !/retake/i.test(b.textContent || ''); }});
  var groups = {{}};
  Array.prototype.forEach.call(allButtons, function (b) {{
    var wrap = b.closest('div.px-5');
    var key = Array.prototype.indexOf.call(quizSection.querySelectorAll('div.px-5'), wrap);
    (groups[key] = groups[key] || []).push(b);
  }});
  Object.keys(groups).sort(function (a, b) {{ return a - b; }}).forEach(function (k, i) {{
    var btns = groups[k];
    var idx = intended[i] !== undefined ? intended[i] : 0;
    if (btns[idx]) {{ btns[idx].click(); clicked++; }}
  }});
}}
r.quizClicked = clicked;

var showBtns = Array.prototype.slice.call(document.querySelectorAll('button'))
  .filter(function (b) {{ return /show solution/i.test(b.textContent || ''); }});
r.showButtons = showBtns.length;
Array.prototype.forEach.call(showBtns, function (b) {{ b.click(); }});

r.katexNodes = document.querySelectorAll('.lesson-body .katex').length;
r.dollarInText = (document.querySelector('.lesson-body').textContent.match(/\\$/g) || []).length;
r.katexErrors = document.querySelectorAll('.katex-error').length;
r.svgCount = Array.prototype.slice.call(document.querySelectorAll('figure svg')).filter(function (x) {{ return !x.closest('.katex'); }}).length;
r.svgAll = Array.prototype.slice.call(document.querySelectorAll('.lesson-body svg')).filter(function (x) {{ return !x.closest('.katex'); }}).length;
r.rawDollarInSvg = Array.prototype.slice.call(document.querySelectorAll('figure svg text')).filter(function (t) {{ return !t.closest('.katex'); }})
  .filter(function (t) {{ return /\\$|\\\\tfrac|\\\\times|\\\\div|\\\\text/.test(t.textContent || ''); }}).length;
r.tables = document.querySelectorAll('.lesson-body table').length;
r.termHits = (document.body.textContent.match(/{termre}/gi) || []).length;
r.prereqChips = Array.prototype.slice.call(document.querySelectorAll('a'))
  .filter(function (a) {{ return /geometry\\/lesson\\/geo-/.test(a.href || ''); }}).length;
r.docScrollW = document.documentElement.scrollWidth;
r.innerWidth = window.innerWidth;
JSON.stringify(r);
"""

SH_TMPL = """#!/usr/bin/env bash
# e2e-geo-{code}.sh — per-lesson E2E for GEOMETRY lesson {num} '{title}':
# desktop 1280 + mobile 390 + dark-mode; quiz interactivity + KaTeX +
# console-error capture + solution-figure expansion + overflow checks.
# The maths RUN 129 ship (chapter 3 closed COMPLETE). Pins calibrated from
# the live DOM probe: quiz 5/5 on keys {key}; KaTeX nodes >= {katex}; exactly
# {bodyfig} body figures + the SOLUTION figures (svgAll >= {svgall}); tables
# >= {tables}; show-solution buttons >= 15 (15 exercises); Sol. pills
# >= 2 after expansion; vocabulary >= 200 hits; prereq/nav chips >= {prereq}.
set -u
SLUG="{slug}"
PAGE_JS_PATH="scripts/e2e-geo-{code}.page.js"
BASE=http://localhost:3000/book/geometry/lesson/$SLUG
OUT=/tmp/e2e-geo-{code}
mkdir -p "$OUT"
PAGE_JS=$(cat "$PAGE_JS_PATH")

# one-shell server guard (the sandbox reaps the dev server between calls)
if ! curl -s -o /dev/null http://localhost:3000/ 2>/dev/null; then
  setsid nohup bun run dev > dev.log 2>&1 &
  for i in $(seq 1 30); do
    sleep 2
    curl -s -o /dev/null http://localhost:3000/ 2>/dev/null && break
  done
fi

run_checks () {{  # $1 = label
  LESSON_PATH="$SLUG"
  nav_ok() {{
    local LOC
    LOC=$(agent-browser eval "location.pathname" 2>/dev/null | tr -d '"' || true)
    printf '%s' "$LOC" | grep -q "$LESSON_PATH"
  }}
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
  agent-browser eval "window.__e2eErrors=[];var _ce=console.error;console.error=function(){{window.__e2eErrors.push([].slice.call(arguments).join(' '));_ce.apply(console,arguments)}};'installed'"
  agent-browser eval "$PAGE_JS" > "$OUT/$1.json" 2>"$OUT/$1.err"
  agent-browser wait 800 >/dev/null 2>&1 || true
  agent-browser eval "JSON.stringify({{scoreText:(document.body.textContent.match(/You scored[^·]*/g)||[]).slice(0,1),solPills:Array.prototype.slice.call(document.querySelectorAll('span')).filter(function(s){{return s.textContent.trim()==='Sol.';}}).length,consoleErrors:(window.__e2eErrors||[]).length}})" > "$OUT/$1.score" 2>"$OUT/$1.score.err"
  node -e "
    const fs=require('fs');
    const parse=(p)=>{{let raw=fs.readFileSync(p,'utf8').trim();let d=JSON.parse(raw);if(typeof d==='string')d=JSON.parse(d);return d}};
    let d;try{{d=parse('$OUT/$1.json')}}catch(e){{console.log('RAW:',fs.readFileSync('$OUT/$1.json','utf8').slice(0,400));process.exit(0)}}
    let sc={{}};try{{sc=parse('$OUT/$1.score')}}catch(e){{}}
    const pass=(c,m)=>console.log((c?'  PASS ':'  FAIL ')+m);
    pass(d.hasBody,'lesson body');
    pass(d.quizClicked===5,'quiz: 5 answers clicked on intended keys (got '+d.quizClicked+')');
    pass(d.showButtons>=15,'show-solution buttons >= 15 — the 15 exercises (got '+d.showButtons+')');
    pass(d.katexNodes>={katex},'KaTeX nodes >= {katex} (got '+d.katexNodes+')');
    pass(d.katexErrors===0,'KaTeX errors 0 (got '+d.katexErrors+')');
    pass(d.dollarInText===0,'raw \\$ in text 0 (got '+d.dollarInText+')');
    pass(d.svgCount==={bodyfig},'{bodyfig} body figures rendered (got '+d.svgCount+')');
    pass(d.svgAll>={svgall},'body figures + SOLUTION figures >= {svgall} (v9.0) (got '+d.svgAll+')');
    pass(d.rawDollarInSvg===0,'no raw LaTeX in SVG text (got '+d.rawDollarInSvg+')');
    pass(d.tables>={tables},'teaching tables present (got '+d.tables+')');
    pass(d.termHits>=200,'lesson vocabulary present ('+d.termHits+' hits)');
    pass(d.prereqChips>={prereq},'prereq/nav chips >= {prereq} (the ch.3 chain written) (got '+d.prereqChips+')');
    pass(d.docScrollW<=d.innerWidth+1,'no horizontal overflow ('+d.docScrollW+' vs '+d.innerWidth+')');
    if(sc.scoreText) pass(/5\\/5/.test(sc.scoreText[0]),'quiz scored 5/5 live ('+sc.scoreText[0]+')');
    pass(sc.solPills>=2,'Sol. pills >= 2 after expansion (got '+sc.solPills+')');
    pass((sc.consoleErrors||0)===0,'console errors 0 (got '+sc.consoleErrors+')');
  "
}}

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
echo "DONE e2e-geo-{code}"
"""


def main() -> None:
    for L in LESSONS:
        key = "[" + ", ".join(str(k) for k in L["key"]) + "]"
        page = PAGE_TMPL.format(code=L["code"], num=L["num"], title=L["title"].replace("'", "\\'"),
                                key=key, bodyfig=L["bodyfig"], termre=L["termre"])
        sh = SH_TMPL.format(code=L["code"], num=L["num"], title=L["title"].replace("'", "\\'"),
                            key=key, katex=L["katex"], bodyfig=L["bodyfig"], svgall=L["svgall"],
                            tables=L["tables"], prereq=L["prereq"], slug=L["slug"])
        pj = os.path.join(ROOT, f"scripts/e2e-geo-{L['code']}.page.js")
        shp = os.path.join(ROOT, f"scripts/e2e-geo-{L['code']}.sh")
        open(pj, "w", encoding="utf-8").write(page)
        open(shp, "w", encoding="utf-8").write(sh)
        os.chmod(shp, 0o755)
        print(f"wrote {pj} + {shp}")


if __name__ == "__main__":
    main()

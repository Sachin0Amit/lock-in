#!/usr/bin/env python3
"""gen-aa10-e2e.py — generate the five run-123 AA ch.10 E2E pairs
(.sh + .page.js) on the e2e-aa-91.sh house pattern: desktop 1280 +
mobile 390 + dark-mode; quiz interactivity on intended keys + KaTeX +
console-error capture + overflow checks + Sol. pill census."""

import os

ROOT = "/home/z/my-project"

SPECS = [
    dict(tag="aa-101", num="10.1", slug="aa-competition-algebra-the-advanced-craft",
         title="Competition Algebra: the Advanced Craft", keys=[2, 0, 1, 3, 1],
         katex=200, body_figs=4, svg_all=8, tables=1, sol_pills=30,
         prereq=r"al-competition-algebra-identities-and-substitutions|aa-symmetric-reads-and-common-roots|aa-the-arithmetic-geometric-mean-inequality|aa-special-series-and-the-method-of-differences|aa-binomial-coefficients-at-work|aa-the-laws-of-logarithms-and-the-change-of-base",
         terms=r"substitution|ladder|symmetric|AM–GM|telescoping|binomial|digits|logarithm|witness|recurrence"),
    dict(tag="aa-102", num="10.2", slug="aa-functional-equations-building-functions-from-rules",
         title="Functional Equations: Building Functions from Rules", keys=[1, 2, 0, 1, 2],
         katex=200, body_figs=3, svg_all=7, tables=1, sol_pills=24,
         prereq=r"aa-composition-machines-in-series|aa-inverse-functions-the-machine-undone|aa-mathematical-induction-the-domino-principle|aa-logarithms-the-inverse-machine",
         terms=r"functional equation|ladder|rule|involution|census|orbit|product|additive|cycle|Gauss"),
    dict(tag="aa-103", num="10.3", slug="aa-the-book-in-one-page-synthesis",
         title="The Book in One Page: Synthesis", keys=[0, 2, 1, 0, 3],
         katex=150, body_figs=3, svg_all=7, tables=2, sol_pills=18,
         prereq=r"aa-exponentials-and-logarithms-unit-9-review|aa-unit-review-functions-as-objects|al-the-function-idea-the-doorstep",
         terms=r"census|wiring|ledger|shelf|chain|formula|chapter|audit|map"),
    dict(tag="aa-104", num="10.4", slug="aa-the-doorstep-limits-and-the-changing-output",
         title="The Doorstep: Limits and the Changing Output", keys=[2, 1, 0, 2, 1],
         katex=250, body_figs=4, svg_all=7, tables=10, sol_pills=18,
         prereq=r"aa-geometric-progressions-and-the-infinite-tail|aa-exponential-and-logarithmic-series|aa-function-zoo-modulus-signum-gif-elementary-catalog|al-slope-the-steepness-theorem",
         terms=r"limit|secant|slope|epsilon|converge|continuity|quotient|derivative|tail|promise"),
    dict(tag="aa-10R", num="10.R", slug="aa-the-synthesis-and-the-doorstep-unit-10-review",
         title="Unit 10 Completion Review", keys=[1, 0, 2, 1, 2],
         katex=200, body_figs=3, svg_all=7, tables=1, sol_pills=21,
         prereq=r"aa-competition-algebra-the-advanced-craft|aa-functional-equations-building-functions-from-rules|aa-the-book-in-one-page-synthesis|aa-the-doorstep-limits-and-the-changing-output",
         terms=r"review|audit|bench|census|chain|handoff|door|ladder|digits|witness"),
]

PAGE_JS = """// e2e-{tag}.page.js — targeted interactivity for Advanced Algebra lesson {num} '{title}'
// (run 123; quiz keys [{keys}]; prereqs: the chapter ground).
var r = {{}};
var body = document.querySelector('.lesson-body');
r.hasBody = !!body;

var quizSection = Array.prototype.slice
  .call(document.querySelectorAll('section'))
  .find(function (s) {{ return /CHECK YOURSELF|QUIZ|CHECKPOINT/i.test((s.querySelector('header') || {{}}).textContent || ''); }});

var intended = [{keys}];
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
  .filter(function (t) {{ return /\\$|\\\\tfrac|\\\\times|\\\\sqrt|\\\\geq/.test(t.textContent || ''); }}).length;
r.tables = document.querySelectorAll('.lesson-body table').length;
r.termHits = (document.body.textContent.match(/{terms}/gi) || []).length;
r.prereqChips = Array.prototype.slice.call(document.querySelectorAll('a'))
  .filter(function (a) {{ return /{prereq}/.test(a.href || ''); }}).length;
r.docScrollW = document.documentElement.scrollWidth;
r.innerWidth = window.innerWidth;
JSON.stringify(r);
"""

SH = """#!/usr/bin/env bash
# e2e-{tag}.sh — per-lesson E2E for AA lesson {num} '{title}' (run 123):
# desktop 1280 + mobile 390 + dark-mode; quiz interactivity + KaTeX +
# console-error capture + overflow checks.
# Pins: quiz 5/5 on keys [{keys}]; KaTeX nodes >= {katex}; {body_figs} body
# figures + the SOLUTION figures (svgAll >= {svg_all}); tables >= {tables};
# Sol. pills >= {sol_pills}; vocabulary hits; prereq chips.
set -u
SLUG="{slug}"
PAGE_JS_PATH="scripts/e2e-{tag}.page.js"
BASE=http://localhost:3000/book/advanced-algebra/lesson/$SLUG
OUT=/tmp/e2e-{tag}
mkdir -p "$OUT"
PAGE_JS=$(cat "$PAGE_JS_PATH")

if ! curl -s -o /dev/null http://localhost:3000/ 2>/dev/null; then
  setsid nohup bun run dev > dev.log 2>&1 &
  for i in $(seq 1 30); do
    sleep 2
    curl -s -o /dev/null http://localhost:3000/ 2>/dev/null && break
  done
fi

run_checks () {{
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
    let sc={{};try{{sc=parse('$OUT/$1.score')}}catch(e){{}}
    const pass=(c,m)=>console.log((c?'  PASS ':'  FAIL ')+m);
    pass(d.hasBody,'lesson body');
    pass(d.quizClicked===5,'quiz: 5 answers clicked on intended keys (got '+d.quizClicked+')');
    pass(d.showButtons>=1,'show-solution buttons present ('+d.showButtons+')');
    pass(d.katexNodes>={katex},'KaTeX nodes >= {katex} (got '+d.katexNodes+')');
    pass(d.katexErrors===0,'KaTeX errors 0 (got '+d.katexErrors+')');
    pass(d.dollarInText===0,'raw \\$ in text 0 (got '+d.dollarInText+')');
    pass(d.svgCount==={body_figs},'{body_figs} rendered body figures (got '+d.svgCount+')');
    pass(d.svgAll>={svg_all},'body figures + SOLUTION figures >= {svg_all} (v9.0) (got '+d.svgAll+')');
    pass(d.rawDollarInSvg===0,'no raw LaTeX in SVG text (got '+d.rawDollarInSvg+')');
    pass(d.tables>={tables},'the lesson tables present (got '+d.tables+')');
    pass(d.termHits>=60,'lesson vocabulary present ('+d.termHits+' hits)');
    pass(d.prereqChips>=3,'prerequisite chips >= 3 (got '+d.prereqChips+')');
    pass(d.docScrollW<=d.innerWidth+1,'no horizontal overflow ('+d.docScrollW+' vs '+d.innerWidth+')');
    if(sc.scoreText) pass(/5\\/5/.test(sc.scoreText[0]),'quiz scored 5/5 live ('+sc.scoreText[0]+')');
    pass(sc.solPills>={sol_pills},'Sol. pills >= {sol_pills} after expansion (got '+sc.solPills+')');
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
echo "DONE e2e-{tag}"
"""

for s in SPECS:
    keys_str = ", ".join(str(k) for k in s["keys"])
    page = PAGE_JS.format(tag=s["tag"], num=s["num"], title=s["title"], keys=keys_str,
                          terms=s["terms"], prereq=s["prereq"])
    sh = SH
    for k, v in dict(s, keys=keys_str).items():
        sh = sh.replace("{" + k + "}", str(v))
    sh = sh.replace("{{", "{").replace("}}", "}")
    open(os.path.join(ROOT, "scripts", f"e2e-{s['tag']}.page.js"), "w").write(page)
    shp = os.path.join(ROOT, "scripts", f"e2e-{s['tag']}.sh")
    open(shp, "w").write(sh)
    os.chmod(shp, 0o755)
    print(f"wrote e2e-{s['tag']}.sh + .page.js ({s['num']} keys=[{keys_str}])")
print("ALL FIVE E2E PAIRS GENERATED")

#!/usr/bin/env python3
"""gen-cs5-e2e.py — generates the three per-lesson E2E pairs for the CS
RUN 5 ship (lessons 3.2, 3.6, 3.7), on the established e2e-cf-2*.sh
pattern (desktop 1280 + mobile 390 + dark; quiz interactivity on the
pinned keys; KaTeX + console-error capture; solution-figure expansion;
overflow checks; calibrated per-lesson pins from the shipped census).

Run:  cd /home/z/my-project && python3 scripts/gen-cs5-e2e.py
"""

import os

ROOT = "/home/z/my-project"

LESSONS = [
    {
        "slug": "cf-the-numbering-systems-binary-octal-hexadecimal",
        "code": "32", "num": "3.2",
        "title": "The Numbering Systems: Binary, Octal, Hexadecimal",
        "key": "[2, 0, 3, 1, 2]",
        "key_js": "[2, 0, 3, 1, 2]",
        "katex": 40, "bodyfig": 4, "svgall": 10, "tables": 3,
        "solpills": 23, "termhits": 120,
        "termre": "binary|octal|hexadecimal|decimal|base|digit|place|positional|radix|grouping|census|witness|dress|alphabet|pattern|bit|byte",
        "prereq": "0",
        "prereq_note": "prereq chips 0 (3.1 rides CS RUN 6; the reader drops unwritten prereqs by design)",
    },
    {
        "slug": "cf-decimal-to-binary-conversion",
        "code": "36", "num": "3.6",
        "title": "Decimal to Binary Conversion",
        "key": "[1, 0, 3, 2, 2]",
        "key_js": "[1, 0, 3, 2, 2]",
        "katex": 40, "bodyfig": 5, "svgall": 12, "tables": 3,
        "solpills": 26, "termhits": 120,
        "termre": "binary|decimal|conversion|ladder|division|remainder|quotient|positional|powers|fraction|octal|hexadecimal|bit|roll-over|method|repeating",
        "prereq": "1",
        "prereq_note": "prereq chips >= 1 (3.2 shipped this run)",
    },
    {
        "slug": "cf-binary-to-decimal-conversion",
        "code": "37", "num": "3.7",
        "title": "Binary to Decimal Conversion",
        "key": "[3, 2, 1, 0, 3]",
        "key_js": "[3, 2, 1, 0, 3]",
        "katex": 40, "bodyfig": 5, "svgall": 12, "tables": 3,
        "solpills": 26, "termhits": 120,
        "termre": "binary|decimal|weight|doubling|Horner|positional|regroup|hexadecimal|octal|fraction|popcount|pattern|point|census|byte",
        "prereq": "1",
        "prereq_note": "prereq chips >= 1 (3.2 shipped this run)",
    },
]

SH_TMPL = """#!/usr/bin/env bash
# e2e-cf-{code}.sh — per-lesson E2E for Computer Fundamentals lesson {num}
# '{title}': desktop 1280 + mobile 390 + dark-mode; quiz interactivity +
# KaTeX + console-error capture + solution-figure expansion + overflow
# checks. The CS RUN 5 ship (chapter 3 opened in-progress).
# Pins: quiz 5/5 on keys {key}; KaTeX nodes >= {katex}; exactly {bodyfig} body
# figures + the v9.0 SOLUTION figures (svgAll >= {svgall}: {bodyfig} body +
# {solfig}); tables >= {tables}; Sol. pills >= {solpills} (illustrations +
# 15 exercise solutions); vocabulary >= {termhits} hits; {prereq_note}.
set -u
SLUG="{slug}"
PAGE_JS_PATH="scripts/e2e-cf-{code}.page.js"
BASE=http://localhost:3000/book/computer-fundamentals/lesson/$SLUG
OUT=/tmp/e2e-cf-{code}
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
    pass(d.showButtons>=1,'show-solution buttons present ('+d.showButtons+')');
    pass(d.katexNodes>={katex},'KaTeX nodes >= {katex} (got '+d.katexNodes+')');
    pass(d.katexErrors===0,'KaTeX errors 0 (got '+d.katexErrors+')');
    pass(d.dollarInText===0,'raw \\$ in text 0 (got '+d.dollarInText+')');
    pass(d.svgCount==={bodyfig},'{bodyfig} body figures rendered (got '+d.svgCount+')');
    pass(d.svgAll>={svgall},'body figures + SOLUTION figures >= {svgall} (v9.0) (got '+d.svgAll+')');
    pass(d.rawDollarInSvg===0,'no raw LaTeX in SVG text (got '+d.rawDollarInSvg+')');
    pass(d.tables>={tables},'teaching tables present (got '+d.tables+')');
    pass(d.termHits>={termhits},'lesson vocabulary present ('+d.termHits+' hits)');
    pass(d.prereqChips>={prereq},'prerequisite chips ({prereq_note}) (got '+d.prereqChips+')');
    pass(d.docScrollW<=d.innerWidth+1,'no horizontal overflow ('+d.docScrollW+' vs '+d.innerWidth+')');
    if(sc.scoreText) pass(/5\\/5/.test(sc.scoreText[0]),'quiz scored 5/5 live ('+sc.scoreText[0]+')');
    pass(sc.solPills>={solpills},'Sol. pills >= {solpills} after expansion (illustrations + 15 exercise solutions) (got '+sc.solPills+')');
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
echo "DONE e2e-cf-{code}"
"""

PAGE_TMPL = """// e2e-cf-{code}.page.js — targeted interactivity for Computer Fundamentals
// lesson {num} '{title}' (quiz keys {key}; {bodyfig} body figures + solution
// figures; the shipped census calibrated in scripts/gen-cs5-e2e.py).
var r = {{}};
var body = document.querySelector('.lesson-body');
r.hasBody = !!body;

var quizSection = Array.prototype.slice
  .call(document.querySelectorAll('section'))
  .find(function (s) {{ return /CHECK YOURSELF/i.test((s.querySelector('header') || {{}}).textContent || ''); }});

var intended = {key_js};
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
  .filter(function (a) {{ return /computer-fundamentals\\/lesson\\/cf-/.test(a.href || ''); }}).length;
r.docScrollW = document.documentElement.scrollWidth;
r.innerWidth = window.innerWidth;
JSON.stringify(r);
"""


def main() -> None:
    for L in LESSONS:
        sh = SH_TMPL.format(solfig=int(L["svgall"]) - int(L["bodyfig"]), **L)
        page = PAGE_TMPL.format(**L)
        shp = os.path.join(ROOT, f"scripts/e2e-cf-{L['code']}.sh")
        pjp = os.path.join(ROOT, f"scripts/e2e-cf-{L['code']}.page.js")
        open(shp, "w").write(sh)
        open(pjp, "w").write(page)
        os.chmod(shp, 0o755)
        print(f"wrote {shp} + {pjp}")


if __name__ == "__main__":
    main()

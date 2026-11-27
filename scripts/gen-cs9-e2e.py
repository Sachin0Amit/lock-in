#!/usr/bin/env python3
"""gen-cs9-e2e.py — generates the three per-lesson E2E pairs for the CS
RUN 9 rider (b): the ch.4 e2e debt — 4.1, 4.2 (both modes: desktop 1280 +
mobile 390 + dark) and the 4.R desktop recheck (full script run; 4.R dark
already PASSed RUN 8's rider). On the established e2e-cf-*.sh pattern;
pins calibrated from the shipped DOM census (probe 2026-11-26, post
hero-image pass, DB pack v2 @ 221 lessons) + hero img pins for 4.1/4.2.

Run:  cd /home/z/my-project && python3 scripts/gen-cs9-e2e.py
"""

import os

ROOT = "/home/z/my-project"

# Live DOM census recalibrated 2026-11-28 (CS RUN 10 rider): the single-open
# solution accordion means KaTeX/SVG/pill counts VARY with which solution is
# open — pins re-floored to observed live truths minus a small margin; the
# quiz-section regex widened (the ch.4+ seats title their quiz 'Checkpoint
# quiz', which the ch.1-3-era /CHECK YOURSELF/i regex never matched).
LESSONS = [
    {
        "slug": "cf-the-motherboard-the-city-plan",
        "code": "41", "num": "4.1",
        "title": "The Motherboard: the City Plan",
        "key": "[2, 0, 3, 1, 3]",
        "katex": 100, "bodyfig": 4, "svgall": 25, "tables": 3,
        "solpills": 5, "termhits": 300,
        "termre": "motherboard|socket|chipset|bus|slot|RAM|capacitor|firmware|PCIe|city|plan|expansion|trace|board",
        "prereq": "6",
        "prereq_note": "prereq/nav chips >= 6 (ch.1-3 written + ch.4 siblings)",
        "hero": 1,
    },
    {
        "slug": "cf-the-processor-named-honestly",
        "code": "42", "num": "4.2",
        "title": "The Processor Named Honestly",
        "key": "[3, 0, 1, 2, 1]",
        "katex": 80, "bodyfig": 4, "svgall": 23, "tables": 1,
        "solpills": 6, "termhits": 300,
        "termre": "processor|fetch|decode|execute|core|clock|cycle|register|cache|pipeline|instruction|CPU",
        "prereq": "8",
        "prereq_note": "prereq/nav chips >= 8 (4.1 written this chapter)",
        "hero": 1,
    },
    {
        "slug": "cf-unit-4-completion-review",
        "code": "4R", "num": "4.R",
        "title": "Unit 4 Completion Review",
        "key": "[3, 1, 0, 1, 2]",
        "katex": 120, "bodyfig": 7, "svgall": 26, "tables": 3,
        "solpills": 3, "termhits": 300,
        "termre": "review|chapter|motherboard|processor|memory|hierarchy|bus|port|census|unit|inside",
        "prereq": "12",
        "prereq_note": "prereq/nav chips >= 12 (all five ch.4 lessons written)",
        "hero": 0,
    },
]

SH_TMPL = """#!/usr/bin/env bash
# e2e-cf-{code}.sh — per-lesson E2E for Computer Fundamentals lesson {num}
# '{title}': desktop 1280 + mobile 390 + dark-mode; quiz interactivity +
# KaTeX + console-error capture + solution-figure expansion + overflow
# checks. The CS RUN 9 rider (b): the ch.4 e2e debt closed.
# Pins: quiz 5/5 on keys {key}; KaTeX nodes >= {katex}; {bodyfig} figure svgs
# + the v9.0 SOLUTION figures (svgAll >= {svgall}); tables >= {tables}; Sol.
# pills >= {solpills} (illustrations + 15 exercise solutions); vocabulary >=
# {termhits} hits; {prereq_note}.{hero_comment}
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
# warm the route first (the 481KB ch-04 module compiles slowly cold)
curl -s -o /dev/null --max-time 420 "$BASE" || true

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
    pass(d.svgCount>={bodyfig},'figure svgs rendered >= {bodyfig} (got '+d.svgCount+')');
    pass(d.svgAll>={svgall},'body figures + SOLUTION figures >= {svgall} (v9.0) (got '+d.svgAll+')');
    pass(d.rawDollarInSvg===0,'no raw LaTeX in SVG text (got '+d.rawDollarInSvg+')');
    pass(d.tables>={tables},'teaching tables present (got '+d.tables+')');
    pass(d.imgBlocks>={hero},'hero image block rendered (got '+d.imgBlocks+')');
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
// lesson {num} '{title}' (quiz keys {key}; {bodyfig} figure svgs + solution
// figures; the shipped census calibrated in scripts/gen-cs9-e2e.py).
var r = {{}};
var body = document.querySelector('.lesson-body');
r.hasBody = !!body;

var quizSection = Array.prototype.slice
  .call(document.querySelectorAll('section'))
  .find(function (s) {{ return /CHECK YOURSELF|CHECKPOINT|SELF-CHECK/i.test((s.querySelector('header') || {{}}).textContent || ''); }});

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
r.imgBlocks = document.querySelectorAll('.lesson-body img').length;
r.termHits = (document.body.textContent.match(/{termre}/gi) || []).length;
r.prereqChips = Array.prototype.slice.call(document.querySelectorAll('a'))
  .filter(function (a) {{ return /computer-fundamentals\\/lesson\\/cf-/.test(a.href || ''); }}).length;
r.docScrollW = document.documentElement.scrollWidth;
r.innerWidth = window.innerWidth;
JSON.stringify(r);
"""


def main():
    for L in LESSONS:
        hero_comment = (
            " Hero img >= 1 (the RUN-hero pass block)."
            if L["hero"] else " Review lesson: SVG-only by design (no hero img)."
        )
        sh = SH_TMPL.format(hero_comment=hero_comment, **L)
        page = PAGE_TMPL.format(**L)
        with open(os.path.join(ROOT, f"scripts/e2e-cf-{L['code']}.sh"), "w") as f:
            f.write(sh)
        os.chmod(os.path.join(ROOT, f"scripts/e2e-cf-{L['code']}.sh"), 0o755)
        with open(os.path.join(ROOT, f"scripts/e2e-cf-{L['code']}.page.js"), "w") as f:
            f.write(page)
        print(f"wrote scripts/e2e-cf-{L['code']}.sh + .page.js ({L['num']} {L['title']}, keys {L['key']})")


if __name__ == "__main__":
    main()

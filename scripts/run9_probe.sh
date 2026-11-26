#!/bin/bash
# run9_probe.sh — CS RUN 9 rider prep: (1) re-capture the 2 compile-wall VLM
# sweep shots (cf-text-images-and-sound-as-bits.light + cf-codes-ascii-unicode-and-bcd.dark,
# desktop 1280, full page, solutions expanded); (2) probe the ch.4 e2e-debt
# lesson DOMs (4.1 / 4.2 / 4.R) for pin calibration on the gen-cs6-e2e.py pattern.
set -u
BASE=http://localhost:3000/book/computer-fundamentals/lesson
OUT=/tmp/run9/probe
mkdir -p "$OUT"

PROBE_JS='
var r = {};
var body = document.querySelector(".lesson-body");
r.hasBody = !!body;
var showBtns = Array.prototype.slice.call(document.querySelectorAll("button"))
  .filter(function (b) { return /show solution/i.test(b.textContent || ""); });
r.showButtons = showBtns.length;
Array.prototype.forEach.call(showBtns, function (b) { b.click(); });
r.katexNodes = document.querySelectorAll(".lesson-body .katex").length;
r.katexErrors = document.querySelectorAll(".katex-error").length;
r.svgCount = Array.prototype.slice.call(document.querySelectorAll("figure svg")).filter(function (x) { return !x.closest(".katex"); }).length;
r.svgAll = Array.prototype.slice.call(document.querySelectorAll(".lesson-body svg")).filter(function (x) { return !x.closest(".katex"); }).length;
r.rawDollarInSvg = Array.prototype.slice.call(document.querySelectorAll("figure svg text")).filter(function (t) { return !t.closest(".katex"); })
  .filter(function (t) { return /\$|\\tfrac|\\times|\\div|\\text/.test(t.textContent || ""); }).length;
r.tables = document.querySelectorAll(".lesson-body table").length;
r.imgBlocks = document.querySelectorAll(".lesson-body img").length;
r.prereqChips = Array.prototype.slice.call(document.querySelectorAll("a"))
  .filter(function (a) { return /computer-fundamentals\/lesson\/cf-/.test(a.href || ""); }).length;
r.dollarInText = (document.querySelector(".lesson-body").textContent.match(/\$/g) || []).length;
r.solPills = Array.prototype.slice.call(document.querySelectorAll("span"))
  .filter(function (s) { return s.textContent.trim() === "Sol."; }).length;
r.bodyLen = (document.querySelector(".lesson-body").textContent || "").length;
JSON.stringify(r);
'

settle () {  # $1 = slug
  agent-browser open "$BASE/$1" >/dev/null 2>&1 || true
  agent-browser wait --load networkidle >/dev/null 2>&1 || true
  agent-browser wait 3000 >/dev/null 2>&1 || true
  local LOC PREV CUR
  LOC=$(agent-browser eval "location.pathname" 2>/dev/null | tr -d '"' || true)
  case "$LOC" in *"$1") ;; *) agent-browser eval "location.assign('$BASE/$1');'nav'" >/dev/null 2>&1 || true
    agent-browser wait --load networkidle >/dev/null 2>&1 || true
    agent-browser wait 3000 >/dev/null 2>&1 || true ;; esac
  PREV=""
  for _ in 1 2 3 4 5 6 7 8 9 10 11 12; do
    CUR=$(agent-browser eval "document.querySelectorAll('.lesson-body .katex').length" 2>/dev/null | tr -d '"' || true)
    if [ -n "$CUR" ] && [ "$CUR" = "$PREV" ]; then break; fi
    PREV="$CUR"
    agent-browser wait 900 >/dev/null 2>&1 || true
  done
}

echo "== VLM re-capture 1: cf-text-images-and-sound-as-bits LIGHT 1280 =="
agent-browser set viewport 1280 900 >/dev/null 2>&1 || true
agent-browser eval "document.documentElement.classList.remove('dark');'light'" >/dev/null 2>&1 || true
settle cf-text-images-and-sound-as-bits
agent-browser eval "Array.from(document.querySelectorAll('button')).filter(function(b){return /show solution/i.test(b.textContent||'')}).forEach(function(b){b.click()}); 'expanded'" >/dev/null 2>&1 || true
agent-browser wait 1200 >/dev/null 2>&1 || true
agent-browser screenshot --full-page "$OUT/cf-text-images-and-sound-as-bits.light.png" >/dev/null 2>&1 || agent-browser screenshot "$OUT/cf-text-images-and-sound-as-bits.light.png" >/dev/null 2>&1 || true
ls -la "$OUT/cf-text-images-and-sound-as-bits.light.png" 2>/dev/null || echo "CAPTURE 1 FAILED"

echo "== VLM re-capture 2: cf-codes-ascii-unicode-and-bcd DARK 1280 =="
agent-browser eval "document.documentElement.classList.add('dark');'dark-on'" >/dev/null 2>&1 || true
agent-browser wait 1200 >/dev/null 2>&1 || true
settle cf-codes-ascii-unicode-and-bcd
agent-browser eval "Array.from(document.querySelectorAll('button')).filter(function(b){return /show solution/i.test(b.textContent||'')}).forEach(function(b){b.click()}); 'expanded'" >/dev/null 2>&1 || true
agent-browser wait 1200 >/dev/null 2>&1 || true
agent-browser screenshot --full-page "$OUT/cf-codes-ascii-unicode-and-bcd.dark.png" >/dev/null 2>&1 || agent-browser screenshot "$OUT/cf-codes-ascii-unicode-and-bcd.dark.png" >/dev/null 2>&1 || true
ls -la "$OUT/cf-codes-ascii-unicode-and-bcd.dark.png" 2>/dev/null || echo "CAPTURE 2 FAILED"
agent-browser eval "document.documentElement.classList.remove('dark');'dark-off'" >/dev/null 2>&1 || true

echo "== e2e pin calibration probes (light, 1280, solutions expanded) =="
for L in cf-the-motherboard-the-city-plan cf-the-processor-named-honestly cf-unit-4-completion-review; do
  settle "$L"
  agent-browser eval "Array.from(document.querySelectorAll('button')).filter(function(b){return /show solution/i.test(b.textContent||'')}).forEach(function(b){b.click()}); 'expanded'" >/dev/null 2>&1 || true
  agent-browser wait 900 >/dev/null 2>&1 || true
  echo "--- $L ---"
  agent-browser eval "$PROBE_JS" 2>/dev/null
  echo ""
done
echo "DONE run9_probe"

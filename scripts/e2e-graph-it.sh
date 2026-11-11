#!/usr/bin/env bash
# e2e-graph-it.sh — runtime verification of FX-02 "Graph it" (owner-approved
# 2026-11-11): the plot icon appears on display equations that honestly
# parse, opens the inline canvas grapher with constant sliders, redraws on
# slider input, survives zoom/reset/close (Escape + X), refuses ungraphable
# equations (P(x)-heads), and does it all without a single console error.
# Lesson targets and expected counts come from scripts/verify-graphit-census.ts:
#   al-the-parabola-quadratic-graphs-and-vertices  11 display-math, 2 plottable (function, a/b/c)
#   al-equations-in-two-variables                 12 display-math, 3 plottable (line)
#   al-rational-expressions-simplify-first        10 display-math, 1 plottable (identity, a/m/b/n)
set -u
BASE=http://localhost:3000
OUT=/tmp/e2e-gi
mkdir -p "$OUT"

agent-browser set viewport 1280 900 >/dev/null 2>&1 || true

trap_errors() {
  agent-browser eval "window.__e2eErrors=[];var _ce=console.error;console.error=function(){window.__e2eErrors.push([].slice.call(arguments).join(' '));_ce.apply(console,arguments)};'installed'" >/dev/null 2>&1 || true
}

inkPixels() {
  agent-browser eval "JSON.stringify((function(){var cv=document.querySelector('.graphit-panel canvas'); if(!cv) return -1; var ctx=cv.getContext('2d'); var d=ctx.getImageData(0,0,cv.width,cv.height).data; var n=0; for(var i=0;i<d.length;i+=4){ if(d[i]!==255||d[i+1]!==253||d[i+2]!==245){ n++ } } return n})())" 2>/dev/null
}

echo "== 1. parabola lesson — function mode, sliders a/b/c =="
agent-browser open "$BASE/book/elementary-algebra/lesson/al-the-parabola-quadratic-graphs-and-vertices" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1800 >/dev/null 2>&1 || true
trap_errors
agent-browser eval "JSON.stringify({
  wraps: document.querySelectorAll('.math-display-wrap').length,
  plotIcons: document.querySelectorAll('.graphit-btn').length,
  firstIconLabel: (document.querySelector('.graphit-btn')||{}).getAttribute('aria-label')
})" 2>/dev/null | tee "$OUT/parabola-counts.json"

agent-browser eval "document.querySelector('.graphit-btn').click(); 'opened'" >/dev/null 2>&1 || true
agent-browser wait 700 >/dev/null 2>&1 || true
agent-browser eval "JSON.stringify({
  panel: !!document.querySelector('.graphit-panel'),
  canvas: !!document.querySelector('.graphit-panel canvas'),
  sliders: document.querySelectorAll('.graphit-panel input[type=range]').length,
  chip: (document.querySelector('.graphit-chip')||{textContent:null}).textContent.trim(),
  expanded: (document.querySelector('.graphit-btn')||{}).getAttribute('aria-expanded')
})" 2>/dev/null | tee "$OUT/parabola-panel.json"
inkPixels > "$OUT/parabola-ink-before.txt"
agent-browser screenshot "$OUT/parabola-open.png" >/dev/null 2>&1 || true

# slider input must redraw the canvas (native setter + input event)
agent-browser eval "var r=document.querySelector('.graphit-panel input[type=range]'); var s=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set; s.call(r,'2.5'); r.dispatchEvent(new Event('input',{bubbles:true})); 'slid'" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
inkPixels > "$OUT/parabola-ink-after.txt"
agent-browser eval "JSON.stringify({
  sliderVal: (document.querySelector('.graphit-panel input[type=range]')||{}).value
})" 2>/dev/null | tee "$OUT/parabola-slider.json"

# zoom + reset controls live, then Escape closes
agent-browser eval "var b=document.querySelector('.graphit-panel [aria-label=\"Zoom in\"]'); if(b)b.click(); 'zoomed'" >/dev/null 2>&1 || true
agent-browser wait 400 >/dev/null 2>&1 || true
agent-browser eval "var b=document.querySelector('.graphit-panel [aria-label=\"Reset view and constants\"]'); if(b)b.click(); 'reset'" >/dev/null 2>&1 || true
agent-browser wait 400 >/dev/null 2>&1 || true
inkPixels > "$OUT/parabola-ink-reset.txt"
agent-browser eval "window.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'})); 'esc'" >/dev/null 2>&1 || true
agent-browser wait 400 >/dev/null 2>&1 || true
agent-browser eval "JSON.stringify({
  panelAfterEscape: !!document.querySelector('.graphit-panel'),
  expandedAfter: (document.querySelector('.graphit-btn')||{}).getAttribute('aria-expanded')
})" 2>/dev/null | tee "$OUT/parabola-escape.json"

# reopen, close via the X button
agent-browser eval "document.querySelector('.graphit-btn').click(); 'reopened'" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser eval "var b=document.querySelector('.graphit-panel [aria-label=\"Close grapher\"]'); if(b)b.click(); 'closed'" >/dev/null 2>&1 || true
agent-browser wait 400 >/dev/null 2>&1 || true
agent-browser eval "JSON.stringify({
  panelAfterClose: !!document.querySelector('.graphit-panel'),
  consoleErrors: (window.__e2eErrors||[]).length
})" 2>/dev/null | tee "$OUT/parabola-close.json"

echo "== 2. two-variables lesson — line mode =="
agent-browser open "$BASE/book/elementary-algebra/lesson/al-equations-in-two-variables" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1800 >/dev/null 2>&1 || true
trap_errors
agent-browser eval "JSON.stringify({
  wraps: document.querySelectorAll('.math-display-wrap').length,
  plotIcons: document.querySelectorAll('.graphit-btn').length
})" 2>/dev/null | tee "$OUT/two-vars-counts.json"
# open the LAST icon — the ax+by=c form with a/b/c sliders
agent-browser eval "document.querySelectorAll('.graphit-btn')[2].click(); 'opened'" >/dev/null 2>&1 || true
agent-browser wait 700 >/dev/null 2>&1 || true
agent-browser eval "JSON.stringify({
  panel: !!document.querySelector('.graphit-panel'),
  sliders: document.querySelectorAll('.graphit-panel input[type=range]').length,
  chip: (document.querySelector('.graphit-chip')||{textContent:null}).textContent.trim()
})" 2>/dev/null | tee "$OUT/two-vars-panel.json"
agent-browser screenshot "$OUT/two-vars-open.png" >/dev/null 2>&1 || true
agent-browser eval "JSON.stringify({consoleErrors: (window.__e2eErrors||[]).length})" 2>/dev/null | tee "$OUT/two-vars-errors.json"

echo "== 3. rational lesson — identity mode + honest refusal =="
agent-browser open "$BASE/book/elementary-algebra/lesson/al-rational-expressions-simplify-first" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1800 >/dev/null 2>&1 || true
trap_errors
# 10 display equations on this page, exactly ONE plottable: the monomial
# quotient identity. R(x) = P(x)/Q(x) and friends must never carry the icon.
agent-browser eval "JSON.stringify({
  wraps: document.querySelectorAll('.math-display-wrap').length,
  plotIcons: document.querySelectorAll('.graphit-btn').length
})" 2>/dev/null | tee "$OUT/rational-counts.json"
agent-browser eval "document.querySelector('.graphit-btn').click(); 'opened'" >/dev/null 2>&1 || true
agent-browser wait 700 >/dev/null 2>&1 || true
agent-browser eval "JSON.stringify({
  panel: !!document.querySelector('.graphit-panel'),
  sliders: document.querySelectorAll('.graphit-panel input[type=range]').length,
  chips: Array.prototype.map.call(document.querySelectorAll('.graphit-chip'), function(c){return c.textContent.trim()}).join('|')
})" 2>/dev/null | tee "$OUT/rational-panel.json"
agent-browser screenshot "$OUT/rational-open.png" >/dev/null 2>&1 || true
agent-browser eval "JSON.stringify({consoleErrors: (window.__e2eErrors||[]).length, consoleSample: ((window.__e2eErrors||[])[0]||'').slice(0,120)})" 2>/dev/null | tee "$OUT/rational-errors.json"

echo "== results =="
for f in parabola-counts parabola-panel parabola-ink-before parabola-ink-after parabola-slider parabola-ink-reset parabola-escape parabola-close two-vars-counts two-vars-panel two-vars-errors rational-counts rational-panel rational-errors; do
  printf '%-18s %s\n' "$f" "$(cat $OUT/$f.* 2>/dev/null | tr -d '\n' | head -c 200)"
done
echo "DONE (screenshots in $OUT)"

#!/usr/bin/env bash
# sweep_vlm_geo131.sh — maths RUN 131 VLM audit crop collector (GEOMETRY ch.4
# close): per lesson, element-screenshots every body figure + ONE expanded
# solution figure, in light and dark themes (the sweep_vlm_geo127.sh scope).
# Output: /tmp/vlm-geo131/<code>-<sel>-<theme>.png
# Note: a concurrent lane re-packs the db — a blank/zero-byte crop or a 500
# page is retried ONCE after 10s; ch.4 content itself will not change.
set -u
OUT=/tmp/vlm-geo131
mkdir -p "$OUT"

if ! curl -s -o /dev/null http://localhost:3000/ 2>/dev/null; then
  setsid nohup bun run dev > dev.log 2>&1 &
  for i in $(seq 1 30); do sleep 2; curl -s -o /dev/null http://localhost:3000/ 2>/dev/null && break; done
fi
agent-browser set viewport 1280 900 >/dev/null 2>&1 || true

LESSONS="geo-similar-figures-same-shape-at-any-scale:41 geo-the-basic-proportionality-theorem-thales:42 geo-the-similarity-criteria-aa-sas-sss:43 geo-pythagoras-proved-the-theorem-earned:44"

size_ok() { [ -f "$1" ] && [ "$(stat -c %s "$1" 2>/dev/null || echo 0)" -gt 0 ]; }

# shoot <sel> <outfile> — screenshot, retry once after 10s if missing/0-byte
shoot() {
  SEL="$1"; OUTFILE="$2"
  agent-browser screenshot "#$SEL" "$OUTFILE" >/dev/null 2>&1 || true
  if ! size_ok "$OUTFILE"; then
    sleep 10
    if ! curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ 2>/dev/null | grep -q 200; then
      for i in $(seq 1 15); do sleep 2; curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ 2>/dev/null | grep -q 200 && break; done
    fi
    agent-browser screenshot "#$SEL" "$OUTFILE" >/dev/null 2>&1 || true
  fi
}

for PAIR in $LESSONS; do
  SLUG="${PAIR%%:*}"; CODE="${PAIR##*:}"
  BASE="http://localhost:3000/book/geometry/lesson/$SLUG"
  agent-browser open "$BASE" >/dev/null 2>&1 || true
  agent-browser wait --load networkidle >/dev/null 2>&1 || true
  agent-browser wait 2500 >/dev/null 2>&1 || true
  # expand ALL solutions (the re-query-until-none law — forEach-all loses Radix toggles)
  for round in 1 2 3 4 5 6; do
    N=$(agent-browser eval "var b=Array.prototype.slice.call(document.querySelectorAll('button')).filter(function(x){return /show solution/i.test(x.textContent||'')&&!/hide/i.test(x.textContent||'')});b.forEach(function(x){x.click()});b.length" 2>/dev/null | tr -d '"')
    [ -z "$N" ] || [ "$N" = "0" ] && break
    agent-browser wait 700 >/dev/null 2>&1 || true
  done
  # tag every figure svg's parent with an id; also tag the FIRST solution svg
  agent-browser eval "var figs=Array.prototype.slice.call(document.querySelectorAll('figure svg')).filter(function(x){return !x.closest('.katex')});figs.forEach(function(f,i){f.closest('figure').id='vlmfig'+i});var sol=Array.prototype.slice.call(document.querySelectorAll('.lesson-body svg')).filter(function(x){return !x.closest('.katex')&&!x.closest('figure')});if(sol.length){var t=sol[0];while(t&&t.tagName!=='DIV'){t=t.parentElement}if(t){t.id='vlmsol0'}};figs.length+'/'+sol.length" 2>/dev/null | tr -d '"'
  for THEME in light dark; do
    if [ "$THEME" = "dark" ]; then
      agent-browser eval "document.documentElement.classList.add('dark');'dark-on'" >/dev/null 2>&1 || true
      agent-browser wait 900 >/dev/null 2>&1 || true
    fi
    for SEL in vlmfig0 vlmfig1 vlmfig2 vlmfig3 vlmfig4 vlmfig5 vlmfig6 vlmsol0; do
      agent-browser eval "document.getElementById('$SEL')!==null" 2>/dev/null | tr -d '"' | grep -q true || continue
      shoot "$SEL" "$OUT/$CODE-$SEL-$THEME.png"
    done
    if [ "$THEME" = "dark" ]; then
      agent-browser eval "document.documentElement.classList.remove('dark');'dark-off'" >/dev/null 2>&1 || true
    fi
  done
  # whole-lesson retry once: 500 page or all crops lost → re-open and redo
  if [ "$(ls $OUT/$CODE-*.png 2>/dev/null | wc -l)" -eq 0 ]; then
    echo "lesson $CODE yielded no crops — retrying once after 10s"
    sleep 10
    agent-browser open "$BASE" >/dev/null 2>&1 || true
    agent-browser wait --load networkidle >/dev/null 2>&1 || true
    agent-browser wait 2500 >/dev/null 2>&1 || true
    for round in 1 2 3 4 5 6; do
      N=$(agent-browser eval "var b=Array.prototype.slice.call(document.querySelectorAll('button')).filter(function(x){return /show solution/i.test(x.textContent||'')&&!/hide/i.test(x.textContent||'')});b.forEach(function(x){x.click()});b.length" 2>/dev/null | tr -d '"')
      [ -z "$N" ] || [ "$N" = "0" ] && break
      agent-browser wait 700 >/dev/null 2>&1 || true
    done
    agent-browser eval "var figs=Array.prototype.slice.call(document.querySelectorAll('figure svg')).filter(function(x){return !x.closest('.katex')});figs.forEach(function(f,i){f.closest('figure').id='vlmfig'+i});var sol=Array.prototype.slice.call(document.querySelectorAll('.lesson-body svg')).filter(function(x){return !x.closest('.katex')&&!x.closest('figure')});if(sol.length){var t=sol[0];while(t&&t.tagName!=='DIV'){t=t.parentElement}if(t){t.id='vlmsol0'}};figs.length+'/'+sol.length" 2>/dev/null | tr -d '"'
    for THEME in light dark; do
      if [ "$THEME" = "dark" ]; then
        agent-browser eval "document.documentElement.classList.add('dark');'dark-on'" >/dev/null 2>&1 || true
        agent-browser wait 900 >/dev/null 2>&1 || true
      fi
      for SEL in vlmfig0 vlmfig1 vlmfig2 vlmfig3 vlmfig4 vlmfig5 vlmfig6 vlmsol0; do
        agent-browser eval "document.getElementById('$SEL')!==null" 2>/dev/null | tr -d '"' | grep -q true || continue
        shoot "$SEL" "$OUT/$CODE-$SEL-$THEME.png"
      done
      if [ "$THEME" = "dark" ]; then
        agent-browser eval "document.documentElement.classList.remove('dark');'dark-off'" >/dev/null 2>&1 || true
      fi
    done
  fi
  echo "captured $CODE: $(ls $OUT/$CODE-* 2>/dev/null | wc -l) crops"
done
echo "DONE sweep_vlm_geo131 — total $(ls $OUT/*.png 2>/dev/null | wc -l) crops in $OUT"

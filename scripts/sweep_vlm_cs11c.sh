#!/usr/bin/env bash
# sweep_vlm_cs11c.sh — CS RUN 11 VLM crop collector, CORRECT PASS (CF ch.5):
# per lesson — open, RELOAD, wait for hydration (katex stability), click every
# 'Show solution' button ONCE (the label does not toggle: a re-query loop
# re-collapses them — the run-11 discovery), then tag ALL figure svgs
# (body + solution figures both render inside <figure>) and screenshot each
# in light and dark themes.
# Output: /tmp/vlm-cs11/<code>-vlmfigN-<theme>.png
set -u
OUT=/tmp/vlm-cs11
mkdir -p "$OUT"
rm -f $OUT/*.png

if ! curl -s -o /dev/null http://localhost:3000/ 2>/dev/null; then
  setsid nohup bun run dev > dev.log 2>&1 &
  for i in $(seq 1 40); do sleep 3; curl -s -o /dev/null http://localhost:3000/ 2>/dev/null && break; done
fi
agent-browser set viewport 1280 900 >/dev/null 2>&1 || true

LESSONS="cf-system-software-the-manager-layer:51 cf-application-software-the-worker-families:52 cf-installing-updating-and-licensing-honestly:53 cf-unit-5-completion-review:5R"

size_ok() { [ -f "$1" ] && [ "$(stat -c %s "$1" 2>/dev/null || echo 0)" -gt 0 ]; }

shoot() {
  SEL="$1"; OUTFILE="$2"
  agent-browser screenshot "#$SEL" "$OUTFILE" >/dev/null 2>&1 || true
  if ! size_ok "$OUTFILE"; then
    sleep 10
    if ! curl -s -o /dev/null http://localhost:3000/ 2>/dev/null; then
      for i in $(seq 1 20); do sleep 3; curl -s -o /dev/null http://localhost:3000/ 2>/dev/null && break; done
    fi
    agent-browser screenshot "#$SEL" "$OUTFILE" >/dev/null 2>&1 || true
  fi
}

for PAIR in $LESSONS; do
  SLUG="${PAIR%%:*}"; CODE="${PAIR##*:}"
  BASE="http://localhost:3000/book/computer-fundamentals/lesson/$SLUG"
  curl -s -o /dev/null --max-time 180 "$BASE" || true
  agent-browser open "$BASE" >/dev/null 2>&1 || true
  agent-browser wait --load networkidle >/dev/null 2>&1 || true
  agent-browser reload >/dev/null 2>&1 || true
  agent-browser wait --load networkidle >/dev/null 2>&1 || true
  agent-browser wait 3000 >/dev/null 2>&1 || true
  PREV=""
  for i in $(seq 1 12); do
    CUR=$(agent-browser eval "document.querySelectorAll('.lesson-body .katex').length" 2>/dev/null | tr -d '"')
    [ -n "$CUR" ] && [ "$CUR" = "$PREV" ] && break
    PREV="$CUR"
    agent-browser wait 900 >/dev/null 2>&1 || true
  done
  CLICKED=$(agent-browser eval "var b=Array.prototype.slice.call(document.querySelectorAll('button')).filter(function(x){return /show solution/i.test(x.textContent||'')});b.forEach(function(x){x.click()});b.length" 2>/dev/null | tr -d '"')
  agent-browser wait 1800 >/dev/null 2>&1 || true
  CENSUS=$(agent-browser eval "var figs=Array.prototype.slice.call(document.querySelectorAll('figure svg')).filter(function(x){return !x.closest('.katex')});figs.forEach(function(f,i){if(i<12){f.closest('figure').id='vlmfig'+i}});var big=figs.filter(function(x){var r=x.getBoundingClientRect();return r.width>=100&&r.height>=50}).length;figs.length+' big:'+big" 2>/dev/null | tr -d '"')
  echo "lesson $CODE: showBtns=$CLICKED figureSvgs=$CENSUS"
  for THEME in light dark; do
    if [ "$THEME" = "dark" ]; then
      agent-browser eval "document.documentElement.classList.add('dark');'dark-on'" >/dev/null 2>&1 || true
      agent-browser wait 900 >/dev/null 2>&1 || true
    fi
    for N in 0 1 2 3 4 5 6 7 8 9 10 11; do
      SEL="vlmfig$N"
      agent-browser eval "document.getElementById('$SEL')!==null" 2>/dev/null | tr -d '"' | grep -q true || continue
      shoot "$SEL" "$OUT/$CODE-$SEL-$THEME.png"
    done
    if [ "$THEME" = "dark" ]; then
      agent-browser eval "document.documentElement.classList.remove('dark');'dark-off'" >/dev/null 2>&1 || true
    fi
  done
  echo "captured $CODE: $(ls $OUT/$CODE-*.png 2>/dev/null | wc -l) crops"
done
echo "DONE sweep_vlm_cs11c — total $(ls $OUT/*.png 2>/dev/null | wc -l) crops in $OUT"

#!/usr/bin/env bash
# collect_vlm_crops_cf2.sh — CS RUN 3 VLM audit crop collector: scrolls to each
# body figure (and one expanded solution figure per lesson) and screenshots the
# viewport, in light and dark themes, for both new lessons.
set -u
OUT=/tmp/vlm-cf2
mkdir -p "$OUT"

guard_server () {
  if ! curl -s -o /dev/null http://localhost:3000/ 2>/dev/null; then
    setsid nohup bun run dev > dev.log 2>&1 &
    for i in $(seq 1 30); do sleep 2; curl -s -o /dev/null http://localhost:3000/ 2>/dev/null && break; done
  fi
}

crop_fig () {  # $1 slug  $2 figIndex (0-based among figure svg elements)  $3 label  $4 dark(0/1)
  local SLUG="$1" IDX="$2" LABEL="$3" DARK="$4"
  local BASE="http://localhost:3000/book/computer-fundamentals/lesson/$SLUG"
  agent-browser open "$BASE" >/dev/null 2>&1 || true
  agent-browser wait --load networkidle >/dev/null 2>&1 || true
  agent-browser wait 2500 >/dev/null 2>&1 || true
  agent-browser eval "var els=document.querySelectorAll('figure svg'); var f=els[$IDX]; if(f){f.closest('figure').scrollIntoView({block:'center'});} 'ok'" >/dev/null 2>&1 || true
  agent-browser wait 1200 >/dev/null 2>&1 || true
  if [ "$DARK" = "1" ]; then
    agent-browser eval "document.documentElement.classList.add('dark');'dark-on'" >/dev/null 2>&1 || true
    agent-browser wait 900 >/dev/null 2>&1 || true
  fi
  agent-browser screenshot "$OUT/${LABEL}.png" >/dev/null 2>&1 || true
  if [ "$DARK" = "1" ]; then
    agent-browser eval "document.documentElement.classList.remove('dark');'dark-off'" >/dev/null 2>&1 || true
  fi
}

guard_server
agent-browser set viewport 1280 900 >/dev/null 2>&1 || true

# lesson 2.1 — light: the three body figures + one solution figure (expanded)
S21="cf-input-devices-the-human-handshake"
crop_fig "$S21" 0 "21-fig1-handshake-light" 0
crop_fig "$S21" 1 "21-fig2-keyboard-light" 0
crop_fig "$S21" 2 "21-fig3-scanner-light" 0
# dark: figure 1 + 2
crop_fig "$S21" 0 "21-fig1-handshake-dark" 1
crop_fig "$S21" 1 "21-fig2-keyboard-dark" 1
# a solution figure (expand all solutions first): scroll to the first svg inside the exercises area
agent-browser open "http://localhost:3000/book/computer-fundamentals/lesson/$S21" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2500 >/dev/null 2>&1 || true
agent-browser eval "Array.prototype.slice.call(document.querySelectorAll('button')).filter(function(b){return /show solution/i.test(b.textContent||'');}).forEach(function(b){b.click();});'expanded'" >/dev/null 2>&1 || true
agent-browser wait 900 >/dev/null 2>&1 || true
agent-browser eval "var els=document.querySelectorAll('.lesson-body svg'); var f; for(var i=els.length-1;i>=0;i--){if(!els[i].closest('.katex')){f=els[i];break;}} if(f){f.scrollIntoView({block:'center'});} 'ok'" >/dev/null 2>&1 || true
agent-browser wait 1000 >/dev/null 2>&1 || true
agent-browser screenshot "$OUT/21-solfig-dpi-light.png" >/dev/null 2>&1 || true

# lesson 2.2 — light: the three body figures; dark: the pixel grid
S22="cf-output-devices-screens-printers-and-sound"
crop_fig "$S22" 0 "22-fig1-mirror-light" 0
crop_fig "$S22" 1 "22-fig2-pixels-light" 0
crop_fig "$S22" 2 "22-fig3-laser-light" 0
crop_fig "$S22" 1 "22-fig2-pixels-dark" 1
# a solution figure (the PPI triangle, expanded)
agent-browser open "http://localhost:3000/book/computer-fundamentals/lesson/$S22" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2500 >/dev/null 2>&1 || true
agent-browser eval "Array.prototype.slice.call(document.querySelectorAll('button')).filter(function(b){return /show solution/i.test(b.textContent||'');}).forEach(function(b){b.click();});'expanded'" >/dev/null 2>&1 || true
agent-browser wait 900 >/dev/null 2>&1 || true
agent-browser eval "var els=document.querySelectorAll('.lesson-body svg'); var f; for(var i=els.length-1;i>=0;i--){if(!els[i].closest('.katex')){f=els[i];break;}} if(f){f.scrollIntoView({block:'center'});} 'ok'" >/dev/null 2>&1 || true
agent-browser wait 1000 >/dev/null 2>&1 || true
agent-browser screenshot "$OUT/22-solfig-ppi-light.png" >/dev/null 2>&1 || true

ls -la "$OUT"
echo "DONE crops"

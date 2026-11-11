#!/usr/bin/env bash
# run-undo-verify.sh — one-shot verification of the palette undo button
# (owner directive 2026-11-11: "where you choose the colour, there also undo
# the selected highlight"). Does, inside a single shell call so the dev
# server cannot be reaped mid-run:
#   1. ensure localhost:3000 is serving (start next dev if needed)
#   2. confirm the new CSS rules are in the served stylesheet
#   3. run the full covers+highlights e2e (incl. the new undo phase)
#   4. capture palette screenshots (disabled on fresh text, enabled over a
#      painted mark) + computed-style ground truth for both states
set -u
cd /home/z/my-project
OUT=/tmp/e2e-ch
mkdir -p "$OUT"
LESSON="http://localhost:3000/book/elementary-algebra/lesson/al-from-arithmetic-to-algebra"

started=0
if ! curl -s -o /dev/null --max-time 3 http://localhost:3000/; then
  setsid nohup bun run dev >/dev/null 2>&1 < /dev/null &
  started=1
  for _ in $(seq 1 60); do
    curl -s -o /dev/null --max-time 3 http://localhost:3000/ && break
    sleep 2
  done
fi
curl -s -o /dev/null -w "server:%{http_code}\n" --max-time 15 http://localhost:3000/

# --- 2. served CSS must contain the palette-undo rules -------------------
curl -s --max-time 120 "$LESSON" > /tmp/pg.html
cssn=0
for u in $(grep -oE '/_next/static/[^"]+\.css' /tmp/pg.html | sort -u); do
  n=$(curl -s --max-time 30 "http://localhost:3000$u" | grep -c "hl-undo-btn")
  cssn=$((cssn + n))
done
echo "css-hl-undo-rules:$cssn"

# --- 3. full e2e (covers + highlights incl. undo phase) -------------------
bash scripts/e2e-covers-highlights.sh > "$OUT/e2e.log" 2>&1
sed -n '/== results ==/,$p' "$OUT/e2e.log"

# --- 4. palette screenshots + computed styles ------------------------------
agent-browser set viewport 1280 900 >/dev/null 2>&1 || true
agent-browser open "$LESSON" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true

# 4a. fresh selection (nothing highlighted) -> eraser disabled
agent-browser eval "$(cat scripts/e2e-covers-highlights.page.js)" >/dev/null 2>&1 || true
agent-browser wait 400 >/dev/null 2>&1 || true
agent-browser eval "JSON.stringify({disabled: (document.querySelector('[role=toolbar] .hl-undo-btn')||{}).disabled, opacity: (function(){var b=document.querySelector('[role=toolbar] .hl-undo-btn'); return b?getComputedStyle(b).opacity:null})(), cursor: (function(){var b=document.querySelector('[role=toolbar] .hl-undo-btn'); return b?getComputedStyle(b).cursor:null})(), sep: (function(){var s=document.querySelector('[role=toolbar] .hl-toolbar-sep'); if(!s)return null; var c=getComputedStyle(s); return c.width+'x'+c.height+' '+c.backgroundColor})()})" 2>/dev/null | tee "$OUT/styles-disabled.json"
agent-browser screenshot "$OUT/palette-disabled.png" >/dev/null 2>&1 || true

# 4b. paint yellow over the same stretch, re-select -> eraser enabled
agent-browser eval "document.querySelector('[role=toolbar] .hl-swatch-btn').click(); 'painted'" >/dev/null 2>&1 || true
agent-browser wait 400 >/dev/null 2>&1 || true
agent-browser eval "$(cat scripts/e2e-covers-highlights.page.js)" >/dev/null 2>&1 || true
agent-browser wait 400 >/dev/null 2>&1 || true
agent-browser eval "JSON.stringify({disabled: (document.querySelector('[role=toolbar] .hl-undo-btn')||{}).disabled, opacity: (function(){var b=document.querySelector('[role=toolbar] .hl-undo-btn'); return b?getComputedStyle(b).opacity:null})(), marks: document.querySelectorAll('mark.hl-mark').length})" 2>/dev/null | tee "$OUT/styles-enabled.json"
agent-browser screenshot "$OUT/palette-enabled.png" >/dev/null 2>&1 || true

# clean the painted mark so the device state stays tidy for real users
agent-browser eval "document.querySelector('[role=toolbar] .hl-undo-btn').click(); 'cleaned'" >/dev/null 2>&1 || true
agent-browser wait 300 >/dev/null 2>&1 || true
agent-browser eval "JSON.stringify({marksLeft: document.querySelectorAll('mark.hl-mark').length})" 2>/dev/null | tee "$OUT/cleaned.json"

echo "started-server:$started"
echo "VERIFY-DONE"

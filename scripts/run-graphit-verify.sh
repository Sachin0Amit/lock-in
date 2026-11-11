#!/usr/bin/env bash
# run-graphit-verify.sh — one-shot verification of FX-02 "Graph it"
# (owner-approved 2026-11-11: a small plot icon on rendered display
# equations opens an inline grapher with sliders for the formula's
# constants). Everything runs inside a single shell call so the dev
# server cannot be reaped mid-run:
#   1. ensure localhost:3000 is serving (start next dev if needed)
#   2. confirm the graphit CSS rules are in the SERVED stylesheet
#      (the palette-undo run caught the watcher serving a stale chunk —
#      that check stays mandatory for every feature with new CSS)
#   3. offline gate: parser unit asserts + full-shelf plottable census
#   4. browser e2e: icon counts per lesson, panel, canvas ink, slider
#      redraw, zoom/reset, Escape/X close, identity chips, refusal,
#      0 console errors
#   5. regression: the full covers + highlights + palette-undo e2e
#   6. screenshots of the open grapher in light AND dark mode for VLM
set -u
cd /home/z/my-project
OUT=/tmp/e2e-gi
mkdir -p "$OUT"
LESSON="http://localhost:3000/book/elementary-algebra/lesson/al-the-parabola-quadratic-graphs-and-vertices"

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

# --- 2. served CSS must contain the graphit rules -----------------------
curl -s --max-time 120 "$LESSON" > /tmp/pg.html
cssn=0
for u in $(grep -oE '/_next/static/[^"]+\.css' /tmp/pg.html | sort -u); do
  n=$(curl -s --max-time 30 "http://localhost:3000$u" | grep -c "graphit-btn")
  cssn=$((cssn + n))
done
echo "css-graphit-rules:$cssn"

# --- 3. offline gate: unit asserts + shelf census -------------------------
bun scripts/verify-graphit-census.ts > "$OUT/census.log" 2>&1
tail -4 "$OUT/census.log"

# --- 4. browser e2e -------------------------------------------------------
bash scripts/e2e-graph-it.sh > "$OUT/e2e.log" 2>&1
sed -n '/== results ==/,$p' "$OUT/e2e.log"

# --- 5. regression: covers + highlights + palette-undo -------------------
bash scripts/e2e-covers-highlights.sh > "$OUT/regression.log" 2>&1
sed -n '/== results ==/,$p' "$OUT/regression.log" | head -18

# --- 6. light + dark screenshots of the open grapher ---------------------
agent-browser set viewport 1280 900 >/dev/null 2>&1 || true
agent-browser open "$LESSON" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
agent-browser eval "document.querySelectorAll('.graphit-btn')[0].click(); 'opened'" >/dev/null 2>&1 || true
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "var r=document.querySelector('.graphit-panel input[type=range]'); if(r){r.scrollIntoView({block:'center'});}" >/dev/null 2>&1 || true
agent-browser wait 300 >/dev/null 2>&1 || true
agent-browser screenshot "$OUT/grapher-light.png" >/dev/null 2>&1 || true
agent-browser eval "document.documentElement.classList.add('dark'); 'dark'" >/dev/null 2>&1 || true
agent-browser wait 400 >/dev/null 2>&1 || true
agent-browser screenshot "$OUT/grapher-dark.png" >/dev/null 2>&1 || true
agent-browser eval "document.documentElement.classList.remove('dark'); 'light-back'" >/dev/null 2>&1 || true

echo "started-server:$started"
echo "VERIFY-DONE (screenshots: $OUT/grapher-light.png $OUT/grapher-dark.png)"

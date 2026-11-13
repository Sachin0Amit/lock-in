#!/usr/bin/env bash
# audit-topicdepth-figures.sh — layer-2 vision audit of the nine new/changed
# figures of the 2026-11-13 topic-depth pass (owner directive #2). Requires
# the dev server UP (restart it in the same shell invocation that calls this).
# Crops every figure of the four touched lessons, then montages + audits the
# NEW/CHANGED ones with the strict house prompt.
set -u
OUT=/tmp/topicdepth
mkdir -p "$OUT"
PAGE_JS=$(cat /home/z/my-project/scripts/figure-audit-bboxes.page.js)

declare -A LESSONS=(
  [aa-function-zoo-modulus-signum-gif-elementary-catalog]=aa
  [aa-graph-transformations-shifts-stretches-flips-gif]=aa
  [al-the-coordinate-plane-and-linear-graphs]=al
  [fm-bar-charts-line-graphs-and-pie-charts]=fm
)

for L in "${!LESSONS[@]}"; do
  echo "== $L =="
  case "${LESSONS[$L]}" in
    aa) BB="http://localhost:3000/book/advanced-algebra/lesson" ;;
    al) BB="http://localhost:3000/book/elementary-algebra/lesson" ;;
    *)  BB="http://localhost:3000/book/foundation-mathematics/lesson" ;;
  esac
  agent-browser open "$BB/$L" >/dev/null 2>&1
  agent-browser wait --load networkidle >/dev/null 2>&1 || true
  agent-browser wait 1500 >/dev/null 2>&1 || true
  LOC=$(agent-browser eval "location.pathname" 2>/dev/null | tr -d '"' || true)
  case "$LOC" in *"$L") ;; *) echo "  NAV FAIL (on $LOC)"; continue ;; esac
  agent-browser screenshot --full "$OUT/$L.png" >/dev/null 2>&1 || echo "  SHOT FAIL"
  agent-browser eval "$PAGE_JS" > "$OUT/$L.bbox.json" 2>"$OUT/$L.bbox.err"
  python3 - "$L" <<'PYEOF'
import json, sys
from PIL import Image
lesson = sys.argv[1]
raw = open(f"/tmp/topicdepth/{lesson}.bbox.json").read().strip()
s = raw
for _ in range(3):
    if isinstance(s, str):
        try: s = json.loads(s)
        except Exception: break
if not isinstance(s, dict) or 'figs' not in s:
    print("  BBOX PARSE FAIL:", raw[:150]); sys.exit(0)
im = Image.open(f"/tmp/topicdepth/{lesson}.png")
scale = im.width / s['vw'] if s['vw'] else 1.0
PAD = 34
print(f"  shot {im.width}x{im.height} scale={scale:.3f} figures={len(s['figs'])}")
for f in s['figs']:
    x1 = max(0, int(f['fx']*scale) - PAD)
    y1 = max(0, int(f['fy']*scale) - PAD)
    x2 = min(im.width, int((f['fx']+f['fw'])*scale) + PAD)
    y2 = min(im.height, int((f['fy']+f['fh'])*scale) + PAD)
    out = f"/tmp/topicdepth/{lesson}-fig{f['i']}.png"
    im.crop((x1, y1, x2, y2)).save(out)
    print(f"  fig{f['i']} crop={x2-x1}x{y2-y1} vb={f['viewBox']} cap=«{f['cap'][:60]}»")
PYEOF
done

# montage A: the six AA 1.5 new/changed figures (fig 1,2,3,4,5,6 — fig 4 is
# the layer-1-repaired gifSawtooth); montage B: AA 1.7 fig 1 + AL 10.1 fig 1
# + FM 10.2 fig 3.
Z=aa-function-zoo-modulus-signum-gif-elementary-catalog
G=aa-graph-transformations-shifts-stretches-flips-gif
AL=al-the-coordinate-plane-and-linear-graphs
FM=fm-bar-charts-line-graphs-and-pie-charts
python3 scripts/figure-audit-montage.py "$OUT/montageA.png" \
  "$OUT/$Z-fig1.png" "$OUT/$Z-fig2.png" "$OUT/$Z-fig3.png" \
  "$OUT/$Z-fig4.png" "$OUT/$Z-fig5.png" "$OUT/$Z-fig6.png"
python3 scripts/figure-audit-montage.py "$OUT/montageB.png" \
  "$OUT/$G-fig1.png" "$OUT/$AL-fig1.png" "$OUT/$FM-fig3.png"

echo "== VISION montageA (AA 1.5 six figures) =="
bash scripts/figure-audit-vision.sh "$OUT/montageA.png" \
  "Six figures from Advanced Algebra lesson 1.5 (The Function Zoo), tiles 1-6 top to bottom: (1) the piecewise auto-rickshaw fare machine graph — three branches with solid/open switch dots; (2) two panels: the V of y=|x| with the pair (-3,3),(3,3) printing 3, and the shifted V of y=|x-3| cut by the dashed line y=5 at x=8 and x=-2; (3) two panels: the signum graph (rays at heights 1 and -1, open dots, solid origin dot) and the identity line y=|x|*sgn(x)=x; (4) two panels: the greatest-integer staircase y=[x] and the fractional-part sawtooth y={x}; (5) the sawtooth y={x} alone with witnesses {0.6}=0.6 and {-0.6}=0.4 plus a period-1 brace; (6) the lower envelope min{x^2,x+2} of a parabola and a line with crossings at -1 and 2."
echo "== VISION montageB (AA 1.7 modulus wraps + AL walls + FM chooser) =="
bash scripts/figure-audit-vision.sh "$OUT/montageB.png" \
  "Three figures, tiles 1-3 top to bottom: (1) four mini-panels of the modulus family on m(x)=(x-1)(x-3): the parent, |m| with the notch lifted, m(|x|) mirrored and even, and the |y|=m(x) relation with split seats; (2) two panels: the walls y=2 (horizontal) and x=-1 (vertical) crossing at (-1,2), and the line y=2x+1 pierced once by each of three dashed vertical probes at h=-2,0,3 with meets (-2,-3),(0,1),(3,7); (3) three chart panels on one fruit survey (mango 4, banana 5, guava 3): an honest bar chart, a lying line graph, and a pie with slices 120, 150, 90 degrees."
echo DONE

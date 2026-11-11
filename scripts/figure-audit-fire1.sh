#!/usr/bin/env bash
# figure-audit-fire1.sh — screenshot + bbox collection for the figure-audit
# cron fire 1 (FM sweep items 1-12, protocol §4 layer 2).
# Usage: bash scripts/figure-audit-fire1.sh <lessonId> [<lessonId> ...]
set -u
OUT=/tmp/figaudit
mkdir -p "$OUT"
PAGE_JS=$(cat /home/z/my-project/scripts/figure-audit-bboxes.page.js)

for L in "$@"; do
  echo "== $L =="
  case "$L" in
    ans-*) BB="http://localhost:3000/book/arithmetic-and-number-systems/lesson" ;;
    al-*)  BB="http://localhost:3000/book/elementary-algebra/lesson" ;;
    aa-*)  BB="http://localhost:3000/book/advanced-algebra/lesson" ;;
    *)     BB="http://localhost:3000/book/foundation-mathematics/lesson" ;;
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
raw = open(f"/tmp/figaudit/{lesson}.bbox.json").read().strip()
s = raw
for _ in range(3):
    if isinstance(s, str):
        try: s = json.loads(s)
        except Exception: break
if not isinstance(s, dict) or 'figs' not in s:
    print("  BBOX PARSE FAIL:", raw[:150]); sys.exit(0)
im = Image.open(f"/tmp/figaudit/{lesson}.png")
scale = im.width / s['vw'] if s['vw'] else 1.0
PAD = 34  # css px of generous margin
print(f"  shot {im.width}x{im.height} scale={scale:.3f} figures={len(s['figs'])}")
for f in s['figs']:
    x1 = max(0, int(f['fx']*scale) - PAD)
    y1 = max(0, int(f['fy']*scale) - PAD)
    x2 = min(im.width, int((f['fx']+f['fw'])*scale) + PAD)
    y2 = min(im.height, int((f['fy']+f['fh'])*scale) + PAD)
    out = f"/tmp/figaudit/{lesson}-fig{f['i']}.png"
    im.crop((x1, y1, x2, y2)).save(out)
    print(f"  fig{f['i']} {out} crop={x2-x1}x{y2-y1} svg={f['sw']:.0f}x{f['sh']:.0f} vb={f['viewBox']} cap=«{f['cap'][:70]}»")
PYEOF
done
echo DONE

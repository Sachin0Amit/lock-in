#!/usr/bin/env bash
# figure-audit-capture.sh — protocol §4 layer 2 prep: open a lesson page,
# screenshot it full-page (light or dark), crop every <figure> block from
# the page coordinates, montage the crops into one sheet for the VLM pass.
# Usage: bash scripts/figure-audit-capture.sh <lessonId> [dark]
set -u
L="$1"
MODE="${2:-light}"
case "$L" in
  ans-*) BB="http://localhost:3000/book/arithmetic-and-number-systems/lesson" ;;
  al-*)  BB="http://localhost:3000/book/elementary-algebra/lesson" ;;
  aa-*)  BB="http://localhost:3000/book/advanced-algebra/lesson" ;;
  *)     BB="http://localhost:3000/book/foundation-mathematics/lesson" ;;
esac
OUT=/tmp/fig
mkdir -p "$OUT"
PAGE_JS=$(cat /home/z/my-project/scripts/figure-audit-bboxes.page.js)

agent-browser set viewport 1280 900 >/dev/null 2>&1 || true
agent-browser open "$BB/$L" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
LOC=$(agent-browser eval "location.pathname" 2>/dev/null | tr -d '"' || true)
case "$LOC" in *"$L") ;; *) echo "NAV FAIL (on $LOC)"; exit 1 ;; esac

# expand every exercise solution so solution figures mount (pass B audits)
agent-browser eval "Array.from(document.querySelectorAll('button')).filter(function(b){return /show solution/i.test(b.textContent||'')}).forEach(function(b){b.click()}); 'expanded'" >/dev/null 2>&1
agent-browser wait 900 >/dev/null 2>&1 || true

if [ "$MODE" = "dark" ]; then
  agent-browser eval "document.documentElement.classList.add('dark'); 'dark-on'" >/dev/null 2>&1
  agent-browser wait 700 >/dev/null 2>&1 || true
fi

agent-browser screenshot "$OUT/$L.$MODE.png" --full >/dev/null 2>&1
agent-browser eval "$PAGE_JS" > "$OUT/$L.$MODE.bboxes.json" 2>/dev/null
if [ "$MODE" = "dark" ]; then
  agent-browser eval "document.documentElement.classList.remove('dark'); 'light'" >/dev/null 2>&1
fi

python3 - "$L" "$MODE" "$OUT" <<'PYEOF'
import json, sys
from PIL import Image
lesson, mode, out = sys.argv[1], sys.argv[2], sys.argv[3]
raw = open(f"{out}/{lesson}.{mode}.bboxes.json").read().strip()
s = raw
for _ in range(3):
    if isinstance(s, str):
        try: s = json.loads(s)
        except Exception: break
im = Image.open(f"{out}/{lesson}.{mode}.png")
crops = []
for f in s["figs"]:
    pad = 10
    box = (max(0, int(f["fx"]) - pad), max(0, int(f["fy"]) - pad),
           min(im.width, int(f["fx"] + f["fw"]) + pad), min(im.height, int(f["fy"] + f["fh"]) + pad))
    if box[2] - box[0] < 40 or box[3] - box[1] < 40:
        continue
    c = im.crop(box)
    p = f"{out}/{lesson}.{mode}.f{f['i']}.png"
    c.save(p)
    crops.append(p)
print(f"{lesson} {mode}: {len(crops)} figure crops; page {im.width}x{im.height}")
if crops:
    import subprocess
    sheet = f"{out}/{lesson}.{mode}.sheet.png"
    subprocess.run(["python3", "/home/z/my-project/scripts/figure-audit-montage.py", sheet] + crops)
PYEOF

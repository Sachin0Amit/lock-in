#!/usr/bin/env bash
# figure-audit-vision.sh — strict VLM audit of one cropped figure
# (protocol §4 layer 2). Usage: bash scripts/figure-audit-vision.sh <crop.png> [extra-context]
set -u
PROMPT='You are a STRICT mathematical-figure auditor auditing a figure rendered from a mathematics textbook lesson (readers aged 10-14). The figure image includes its figcaption. Check EVERY detail: (a) are all labels spelled correctly and placed on the right elements, (b) is any text clipped, overlapping, or escaping the frame, (c) does the drawn geometry match the stated counts/coordinates/relationships (e.g. exactly as many arrows/jumps/ticks/bars as the caption and labels claim; positions proportional), (d) is any mathematical value wrong or inconsistent between caption and drawing, (e) do arrows/lines/leaders attach to the right nodes, (f) any rendering artifact (faded strokes, dark-mode bleed, garbled glyphs). List every defect with its location, however small. Then give verdict PASS or FAIL (cosmetic nitpicks still listed but only material defects force FAIL). End your reply with a line: VERDICT: PASS or VERDICT: FAIL.'
f="$1"
out="${f%.png}.verdict.txt"
if [ -n "${2:-}" ]; then PROMPT="$PROMPT Context: $2"; fi
for try in 1 2 3 4; do
  z-ai vision -p "$PROMPT" -i "$f" > "$out.raw" 2>&1
  if grep -q '"choices"' "$out.raw"; then break; fi
  echo "  (429/backoff try $try)" >&2
  sleep 25
done
python3 - "$out" <<'PYEOF'
import json, sys
out = sys.argv[1]
raw = open(out + '.raw').read()
txt = raw[raw.index('{'):] if '{' in raw else raw
try:
    d = json.loads(txt)
    content = d['choices'][0]['message']['content'] if isinstance(d, dict) and 'choices' in d else txt
except Exception:
    content = raw
open(out, 'w').write(content)
print(content)
PYEOF

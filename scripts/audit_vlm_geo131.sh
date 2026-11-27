#!/usr/bin/env bash
# audit_vlm_geo131.sh — maths RUN 131 VLM figure audit (GEOMETRY ch.4 close):
# one z-ai vision call per lesson over its light+dark figure crops.
set -u
OUT=/tmp/vlm-geo131
RES=/tmp/vlm-geo131/verdicts
mkdir -p "$RES"

PROMPT='You are auditing figure crops captured from a geometry lesson web page (inline SVG teaching figures). The attached images are individual figure elements: first the light-theme crops in figure order, then the same figures in dark theme. For EACH image check: (1) no blank or broken SVG regions (missing strokes or fills, empty boxes, half-rendered shapes); (2) no text overlapping other text or strokes, no labels clipped at the edges; (3) every label legible against its background, especially in the dark-theme crops; (4) the geometry looks coherent (lines meet where meeting points are marked, marked angles plausible, arrows and dots sensible). Reply with exactly one line per image in order: "image K: PASS" or "image K: FAIL - short defect description". Then a final line "OVERALL: PASS" if every image passed, else "OVERALL: FAIL".'

for CODE in 41 42 43 44; do
  IMGS=""
  for F in $OUT/$CODE-vlmfig*-light.png $OUT/$CODE-vlmsol0-light.png $OUT/$CODE-vlmfig*-dark.png $OUT/$CODE-vlmsol0-dark.png; do
    [ -f "$F" ] && IMGS="$IMGS -i $F"
  done
  [ -z "$IMGS" ] && { echo "no crops for $CODE"; continue; }
  echo "=== auditing lesson 4.$((CODE % 10)) ($CODE) ==="
  z-ai vision -p "$PROMPT" $IMGS > "$RES/$CODE.txt" 2>&1 || true
  tail -n +1 "$RES/$CODE.txt" | grep -E "image [0-9]+:|OVERALL" | head -30
done
echo "DONE audit_vlm_geo131"

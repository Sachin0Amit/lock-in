#!/usr/bin/env bash
# audit_vlm_cs11.sh — CS RUN 11 VLM figure audit (CF ch.5 close):
# one z-ai vision call per lesson over its light+dark figure crops.
set -u
OUT=/tmp/vlm-cs11
RES=/tmp/vlm-cs11/verdicts
mkdir -p "$RES"

PROMPT='You are auditing figure crops captured from a computer-fundamentals lesson web page (inline SVG teaching diagrams: layer stacks, family trees, timelines, install flows, licence grids). The attached images are individual figure elements: first the light-theme crops in figure order, then more figures in dark theme. For EACH image check: (1) no blank or broken SVG regions (missing strokes or fills, empty boxes, half-rendered shapes); (2) no text overlapping other text or strokes, no labels clipped at the edges; (3) every label legible against its background, especially in the dark-theme crops; (4) the diagram looks coherent (boxes and arrows connect where marked, tree levels sensible, flow directions consistent). Reply with exactly one line per image in order: "image K: PASS" or "image K: FAIL - short defect description". Then a final line "OVERALL: PASS" if every image passed, else "OVERALL: FAIL".'

for CODE in 51 52 53 5R; do
  IMGS=""
  for F in $OUT/$CODE-vlmfig*-light.png $OUT/$CODE-vlmsol*-light.png $OUT/$CODE-vlmfig*-dark.png $OUT/$CODE-vlmsol*-dark.png; do
    [ -f "$F" ] && IMGS="$IMGS -i $F"
  done
  [ -z "$IMGS" ] && { echo "no crops for $CODE"; continue; }
  echo "=== auditing lesson 5.$CODE ==="
  z-ai vision -p "$PROMPT" $IMGS > "$RES/$CODE.txt" 2>&1 || true
  grep -E "image [0-9]+:|OVERALL" "$RES/$CODE.txt" | head -30
done
echo "DONE audit_vlm_cs11"

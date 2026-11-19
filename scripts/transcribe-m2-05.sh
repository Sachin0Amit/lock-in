#!/usr/bin/env bash
# transcribe-m2-05.sh — 2026-11-19 run-111 research step: vision-transcribe the
# m2-05 "Progression and Series" theory ground for AA ch. 5 lessons 5.1 + 5.2
# (the whole theory band printed 5.1–5.18; the exercise band 5.33+ is NOT
# transcribed — every exercise of ours is our own per study-never-reproduce;
# CAE items + answers are transcribed as method/shape ground only).
#   batch A: PDF 10–13 (printed 5.1–5.3 expected) — Introduction, CAE 5.1,
#            Arithmetic Progression (Difference Series), Properties of Terms
#   batch B: PDF 14–18 (printed ~5.4–5.8) — Arithmetic Mean, CAE 5.2, Sum of
#            n Terms of an A.P., Sum of Arithmetic Means Inserted between
#            Two Numbers (the hosted fold), CAE 5.3
#   batch C: PDF 19–23 (printed ~5.9–5.13) — Geometric Progression, Increasing
#            and Decreasing G.P. (the hosted fold), Properties of Terms of G.P.,
#            Geometric Mean, AM–GM relation, CAE 5.4
#   batch D: PDF 24–28 (printed ~5.14–5.18) — Sum of Terms of G.P., Sum of
#            Infinite Terms of G.P., CAE 5.5 tail
# Renders must already exist in /tmp/m2pdf05 (pdftoppm 100 DPI JPEG).
# Page-offset calibration: m2-06's PROVEN layout says printed 6.1 = PDF 11;
# batch A carries PDF 10–13 so the first take's [PDF p.N | printed 5.M]
# markers PROVE the true offset before any prose is authored (the survey's
# front-matter census is NOT to be trusted after the m2-06 lesson).
# Batches run SEQUENTIALLY with 20 s pacing (the 2026-11-17 429 lesson).
set -u
BASE=/home/z/my-project/temporary-references/m2scan
mkdir -p "$BASE"

PROMPT='You are transcribing scanned pages of a Cengage-style algebra textbook chapter (chapter 5, "Progression and Series"). Transcribe FULLY and FAITHFULLY, in reading order: every ALL-CAPS section heading, every definition, rule and boxed formula (write mathematics in LaTeX between $...$), every worked ILLUSTRATION with its full Sol. chain (keep the worked numbers exact), every CAE (concept-application exercise) item with its answer, every table with its rows, and for every figure a one-sentence description of what is drawn (axes, points, labels, regions). Mark page boundaries as [PDF p.N | printed 5.M] using the printed page header if legible. Do NOT summarize or skip worked steps; transcribe the mathematical content completely. If something is illegible write (?). Output plain text only.'

run_batch () {
  local name="$1"; shift
  local out="$BASE/$name"
  local imgs=()
  local p
  for p in "$@"; do imgs+=(-i "$p"); done
  z-ai vision -p "$PROMPT" "${imgs[@]}" > "$out.raw" 2>&1
  # the CLI prints the model text (possibly wrapped in JSON) — normalise
  python3 - "$out.raw" "$out" <<'EOF'
import json, sys, pathlib
raw = pathlib.Path(sys.argv[1]).read_text(errors='replace').strip()
out_path = pathlib.Path(sys.argv[2])
try:
    j = json.loads(raw)
    text = j.get('content') or j.get('text') or j.get('message') or raw
except Exception:
    text = raw
out_path.write_text(text if text.endswith('\n') else text + '\n')
print(f"{out_path.name}: {len(text)} chars")
EOF
}

D=/tmp/m2pdf05

run_batch tr-5.A-band1 $D/pg-10.jpg $D/pg-11.jpg $D/pg-12.jpg $D/pg-13.jpg
sleep 20
run_batch tr-5.A-band2 $D/pg-14.jpg $D/pg-15.jpg $D/pg-16.jpg $D/pg-17.jpg $D/pg-18.jpg
sleep 20
run_batch tr-5.B-band1 $D/pg-19.jpg $D/pg-20.jpg $D/pg-21.jpg $D/pg-22.jpg $D/pg-23.jpg
sleep 20
run_batch tr-5.B-band2 $D/pg-24.jpg $D/pg-25.jpg $D/pg-26.jpg $D/pg-27.jpg $D/pg-28.jpg
echo "ALL BATCHES DONE"

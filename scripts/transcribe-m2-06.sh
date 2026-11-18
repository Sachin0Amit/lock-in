#!/usr/bin/env bash
# transcribe-m2-06.sh — 2026-11-18 owner-directive parallel-swarm research step:
# vision-transcribe the m2-06 "Inequalities Involving Means" theory ground for
# AA ch. 4 (the whole theory band printed 6.1–6.10; the exercise band 6.11+ is
# NOT transcribed — every exercise of ours is our own per study-never-reproduce;
# CAE items + answers are transcribed as method/shape ground only).
#   batch A: PDF 11–14 (printed 6.1–6.4) — Simple Means of Two Positive Numbers,
#            CAE 6.1, Simple Means of n Positive Numbers, AM-GM Inequality,
#            GM-HM Inequality start
#   batch B: PDF 15–18 (printed 6.5–6.8) — GM-HM tail, CAE 6.2, Weighted Means,
#            CAE 6.3 start
#   batch C: PDF 19–20 (printed 6.9–6.10) — CAE 6.3, Means of mth Power, CAE 6.4
# Renders must already exist in /tmp/m2pdf06 (pdftoppm 100 DPI JPEG).
# Page-offset calibration is verified by the [PDF p.N | printed 6.M] markers in
# batch A's output (survey front-matter census: 6 covers + 2 blanks + opener +
# blank → printed 6.1 expected at PDF 11).
# Batches run SEQUENTIALLY with 20 s pacing (the 2026-11-17 429 lesson).
set -u
BASE=/home/z/my-project/temporary-references/m2scan
mkdir -p "$BASE"

PROMPT='You are transcribing scanned pages of a Cengage-style algebra textbook chapter (chapter 6, "Inequalities Involving Means"). Transcribe FULLY and FAITHFULLY, in reading order: every ALL-CAPS section heading, every definition, rule and boxed formula (write mathematics in LaTeX between $...$), every worked ILLUSTRATION with its full Sol. chain (keep the worked numbers exact), every CAE (concept-application exercise) item with its answer, every table with its rows, and for every figure a one-sentence description of what is drawn (axes, points, labels, regions). Mark page boundaries as [PDF p.N | printed 6.M] using the printed page header if legible. Do NOT summarize or skip worked steps; transcribe the mathematical content completely. If something is illegible write (?). Output plain text only.'

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
if '[PDF p.' not in text and text.startswith('🚀'):
    text = text[text.find('[PDF p.'):] if '[PDF p.' in text else text
out_path.write_text(text if text.endswith('\n') else text + '\n', encoding='utf-8')
print(f'{out_path.name}: {len(text)} chars')
EOF
}

run_batch tr-6.1-6.4.txt /tmp/m2pdf06/pg-11.jpg /tmp/m2pdf06/pg-12.jpg /tmp/m2pdf06/pg-13.jpg /tmp/m2pdf06/pg-14.jpg
sleep 20
run_batch tr-6.5-6.8.txt /tmp/m2pdf06/pg-15.jpg /tmp/m2pdf06/pg-16.jpg /tmp/m2pdf06/pg-17.jpg /tmp/m2pdf06/pg-18.jpg
sleep 20
run_batch tr-6.9-6.10.txt /tmp/m2pdf06/pg-19.jpg /tmp/m2pdf06/pg-20.jpg
echo "ALL BATCHES DONE"
ls -la "$BASE"

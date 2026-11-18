#!/usr/bin/env bash
# transcribe-m2-06b.sh — 2026-11-18 parallel-swarm research step, SECOND take:
# the first take's markers proved printed 6.N = PDF N+2 (the same offset the
# m2-02/m2-03 modules carry; the survey's front-matter census was misread), so
# the CORE THEORY band is PDF 3–10 = printed 6.1–6.8. This script transcribes
# exactly that band (the first take's PDF 11–20 output keeps its true band
# names: tr-6.9-6.12.txt, tr-6.13-6.14-sol.txt, tr-s.117-119.txt):
#   batch D: PDF 3–6  (printed 6.1–6.4) — Simple Means of Two Positive Numbers,
#            CAE 6.1, Simple Means of n Positive Numbers, AM-GM Inequality,
#            GM-HM Inequality start
#   batch E: PDF 7–10 (printed 6.5–6.8) — GM-HM tail, CAE 6.2, Weighted Means,
#            CAE 6.3, Means of mth Power start
# Renders must already exist in /tmp/m2pdf06 (pdftoppm 100 DPI JPEG).
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

run_batch tr-6.1-6.4.txt /tmp/m2pdf06/pg-03.jpg /tmp/m2pdf06/pg-04.jpg /tmp/m2pdf06/pg-05.jpg /tmp/m2pdf06/pg-06.jpg
sleep 20
run_batch tr-6.5-6.8.txt /tmp/m2pdf06/pg-07.jpg /tmp/m2pdf06/pg-08.jpg /tmp/m2pdf06/pg-09.jpg /tmp/m2pdf06/pg-10.jpg
echo "ALL BATCHES DONE"
ls -la "$BASE"

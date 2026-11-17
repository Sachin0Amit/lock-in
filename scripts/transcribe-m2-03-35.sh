#!/usr/bin/env bash
# transcribe-m2-03-35.sh — run-109 research step: vision-transcribe the m2-03
# ground bands for AA 3.5 (De Moivre, Roots of Unity and the Complex Loci).
#   batch A: PDF 8–11  (printed 3.6–3.9)  — cube-roots-of-unity start + the
#             square-root u,v method band (3.3's engine, scope-note)
#   batch B: PDF 21–26 (printed 3.19–3.24) — De Moivre / nth roots band
#   batch C: PDF 27–31 (printed 3.25–3.29) — loci band part 1
#   batch D: PDF 32–36 (printed 3.30–3.34) — loci band part 2 (equilateral,
#             diametric circle, straight line)
# Renders must already exist in /tmp/m2pdf (pdftoppm 100 DPI JPEG).
# STUDY-NEVER-REPRODUCE: transcriptions inform method/shape only.
set -u
BASE=/home/z/my-project/temporary-references/m2scan
mkdir -p "$BASE"

PROMPT='You are transcribing scanned pages of a Cengage-style complex-numbers textbook chapter (chapter 3). Transcribe FULLY and FAITHFULLY, in reading order: every ALL-CAPS section heading, every definition, rule and boxed formula (write mathematics in LaTeX between $...$), every worked ILLUSTRATION with its full Sol. chain (keep the worked numbers exact), every CAE (concept-application exercise) item with its answer, every table with its rows, and for every figure a one-sentence description of what is drawn (axes, points, labels, regions). Mark page boundaries as [PDF p.N | printed 3.M] using the printed page header if legible. Do NOT summarize or skip worked steps; transcribe the mathematical content completely. If something is illegible write (?). Output plain text only.'

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
# strip any CLI banner lines before the transcription start
if '[PDF p.' not in text and text.startswith('🚀'):
    text = text[text.find('[PDF p.'):] if '[PDF p.' in text else text
out_path.write_text(text if text.endswith('\n') else text + '\n', encoding='utf-8')
print(f'{out_path.name}: {len(text)} chars')
EOF
}

run_batch tr-3.6-3.9.txt  /tmp/m2pdf/pg8-11-08.jpg  /tmp/m2pdf/pg8-11-09.jpg /tmp/m2pdf/pg8-11-10.jpg /tmp/m2pdf/pg8-11-11.jpg &
run_batch tr-3.19-3.24.txt /tmp/m2pdf/pg21-36-21.jpg /tmp/m2pdf/pg21-36-22.jpg /tmp/m2pdf/pg21-36-23.jpg /tmp/m2pdf/pg21-36-24.jpg /tmp/m2pdf/pg21-36-25.jpg /tmp/m2pdf/pg21-36-26.jpg &
run_batch tr-3.25-3.29.txt /tmp/m2pdf/pg21-36-27.jpg /tmp/m2pdf/pg21-36-28.jpg /tmp/m2pdf/pg21-36-29.jpg /tmp/m2pdf/pg21-36-30.jpg /tmp/m2pdf/pg21-36-31.jpg &
run_batch tr-3.30-3.34.txt /tmp/m2pdf/pg21-36-32.jpg /tmp/m2pdf/pg21-36-33.jpg /tmp/m2pdf/pg21-36-34.jpg /tmp/m2pdf/pg21-36-35.jpg /tmp/m2pdf/pg21-36-36.jpg &
wait
echo "ALL BATCHES DONE"
ls -la "$BASE"

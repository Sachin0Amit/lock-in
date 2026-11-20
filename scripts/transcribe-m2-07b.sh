#!/usr/bin/env bash
# transcribe-m2-07b.sh — continuation driver (Task 6-0, 2026-11-20): the three
# theory batches the first foreground run did not reach inside its 600 s
# window (take 1 landed tr-7.1-7.5 … tr-7.20-7.24; this take lands the tail):
#   batch F: PDF 27–31 (printed 7.25–7.29) — Number of Divisors + CAE 7.9 +
#            Division and Distribution of Distinct Objects + CAE 7.10 +
#            Distribution of Identical start → 6.6
#   batch G: PDF 32–36 (printed 7.30–7.34) — Identical distribution +
#            integral solutions (multinomial) + CAE 7.11 + PIE start → 6.6
#   batch H: PDF 37–40 (printed 7.35–7.38) — PIE + Distribution if empty
#            groups not allowed + Derangement + CAE 7.12 + Exercises start
# Same calibration (printed 7.N = PDF N + 2), same 100 DPI renders in
# /tmp/m2pdf07, same sequential-with-pacing discipline (20 s).
set -u
BASE=/home/z/my-project/temporary-references/m2scan
mkdir -p "$BASE"

PROMPT_HEAD='You are transcribing scanned pages of a Cengage-style algebra textbook chapter (chapter 7, "Permutation and Combination"). '
PROMPT_BODY='Transcribe FULLY and FAITHFULLY, in reading order: every ALL-CAPS section heading, every definition, rule and boxed formula (write mathematics in LaTeX between $...$), every worked ILLUSTRATION with its full Sol. chain (keep the worked numbers exact), every CAE (concept-application exercise) item with its answer, every table with its rows, and for every figure a one-sentence description of what is drawn (axes, points, labels, regions). Mark page boundaries as [PDF p.N | printed 7.M] using the printed page header if legible. Do NOT summarize or skip worked steps; transcribe the mathematical content completely. If something is illegible write (?). Output plain text only.'

run_batch () {
  local name="$1"; shift
  local first="$1"; shift
  local last="${*: -1}"
  local out="$BASE/$name"
  local imgs=()
  local p
  for p in "$@"; do imgs+=(-i "$p"); done
  local prompt="${PROMPT_HEAD}The images that follow are PDF pages ${first}..${last} of the file, in order. ${PROMPT_BODY}"
  z-ai vision -p "$prompt" "${imgs[@]}" > "$out.raw" 2>&1
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

run_batch tr-7.25-7.29.txt 27 /tmp/m2pdf07/pg-27.jpg /tmp/m2pdf07/pg-28.jpg /tmp/m2pdf07/pg-29.jpg /tmp/m2pdf07/pg-30.jpg /tmp/m2pdf07/pg-31.jpg
sleep 20
run_batch tr-7.30-7.34.txt 32 /tmp/m2pdf07/pg-32.jpg /tmp/m2pdf07/pg-33.jpg /tmp/m2pdf07/pg-34.jpg /tmp/m2pdf07/pg-35.jpg /tmp/m2pdf07/pg-36.jpg
sleep 20
run_batch tr-7.35-7.38.txt 37 /tmp/m2pdf07/pg-37.jpg /tmp/m2pdf07/pg-38.jpg /tmp/m2pdf07/pg-39.jpg /tmp/m2pdf07/pg-40.jpg
echo "CONTINUATION BATCHES DONE"
ls -la "$BASE"

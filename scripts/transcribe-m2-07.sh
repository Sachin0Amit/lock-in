#!/usr/bin/env bash
# transcribe-m2-07.sh — 2026-11-20 parallel-swarm research step (Task 6-0):
# vision-transcribe the m2-07 "Permutation and Combination" THEORY ground for
# AA ch. 6 (the whole theory band printed 7.1–7.38, i.e. through CAE 7.12 and
# the Exercises start; the long pure-exercise band printed 7.36–7.48 is NOT
# transcribed — every exercise of ours is our own per study-never-reproduce;
# CAE items + answers are transcribed as method/shape ground only. The first
# solutions band rides transcribe-m2-07b.sh.)
#   batch A: PDF 3–7   (printed 7.1–7.5)   — Fundamental Principle of Counting
#            (multiplication + addition rules) + worked examples + CAE 7.1
#            → 6.1's primary
#   batch B: PDF 8–11  (printed 7.6–7.9)   — Factorial Notation + Exponent of
#            Prime in n! + CAE 7.2 + Permutation/Formula start → 6.2/6.3
#   batch C: PDF 12–15 (printed 7.10–7.13) — CAE 7.3 tail + Permutation when
#            all Objects are Not Distinct + CAE 7.4 + Permutation Under
#            Restriction + CAE 7.5 → 6.3/6.4
#   batch D: PDF 16–21 (printed 7.14–7.19) — Properties of nCr + CAE 7.6
#            (the 6.2 fold ground + 6.5's head)
#   batch E: PDF 22–26 (printed 7.20–7.24) — Combination and Arrangement +
#            CAE 7.7 + Circular Permutation (clockwise/anticlockwise) +
#            CAE 7.8 + All Possible Combinations start → 6.4/6.5/6.6
#   batch F: PDF 27–31 (printed 7.25–7.29) — Number of Divisors + CAE 7.9 +
#            Division and Distribution of Distinct Objects + CAE 7.10
#            + Distribution of Identical start → 6.6
#   batch G: PDF 32–36 (printed 7.30–7.34) — Identical distribution + integral
#            solutions (multinomial) + CAE 7.11 + PIE start → 6.6
#   batch H: PDF 37–40 (printed 7.35–7.38) — PIE + Distribution if empty groups
#            not allowed + Derangement + CAE 7.12 + Exercises start → 6.6
# Page-offset calibration PROVEN by the probe take (PDF 4 = printed 7.2
# "Algebra" head; PDF 5 = printed 7.3 "Permutation and Combination"; PDF 6 =
# printed 7.4) — printed 7.N = PDF N + 2, the SAME offset every M2 module has
# carried; the printed band 7.1–7.48 = PDF 3–50, the solutions part = PDF 51+.
# Renders must already exist in /tmp/m2pdf07 (pdftoppm 100 DPI JPEG).
# Batches run SEQUENTIALLY with 20 s pacing (the 2026-11-17 429 lesson).
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

run_batch tr-7.1-7.5.txt 3  /tmp/m2pdf07/pg-03.jpg /tmp/m2pdf07/pg-04.jpg /tmp/m2pdf07/pg-05.jpg /tmp/m2pdf07/pg-06.jpg /tmp/m2pdf07/pg-07.jpg
sleep 20
run_batch tr-7.6-7.9.txt 8  /tmp/m2pdf07/pg-08.jpg /tmp/m2pdf07/pg-09.jpg /tmp/m2pdf07/pg-10.jpg /tmp/m2pdf07/pg-11.jpg
sleep 20
run_batch tr-7.10-7.13.txt 12 /tmp/m2pdf07/pg-12.jpg /tmp/m2pdf07/pg-13.jpg /tmp/m2pdf07/pg-14.jpg /tmp/m2pdf07/pg-15.jpg
sleep 20
run_batch tr-7.14-7.19.txt 16 /tmp/m2pdf07/pg-16.jpg /tmp/m2pdf07/pg-17.jpg /tmp/m2pdf07/pg-18.jpg /tmp/m2pdf07/pg-19.jpg /tmp/m2pdf07/pg-20.jpg /tmp/m2pdf07/pg-21.jpg
sleep 20
run_batch tr-7.20-7.24.txt 22 /tmp/m2pdf07/pg-22.jpg /tmp/m2pdf07/pg-23.jpg /tmp/m2pdf07/pg-24.jpg /tmp/m2pdf07/pg-25.jpg /tmp/m2pdf07/pg-26.jpg
sleep 20
run_batch tr-7.25-7.29.txt 27 /tmp/m2pdf07/pg-27.jpg /tmp/m2pdf07/pg-28.jpg /tmp/m2pdf07/pg-29.jpg /tmp/m2pdf07/pg-30.jpg /tmp/m2pdf07/pg-31.jpg
sleep 20
run_batch tr-7.30-7.34.txt 32 /tmp/m2pdf07/pg-32.jpg /tmp/m2pdf07/pg-33.jpg /tmp/m2pdf07/pg-34.jpg /tmp/m2pdf07/pg-35.jpg /tmp/m2pdf07/pg-36.jpg
sleep 20
run_batch tr-7.35-7.38.txt 37 /tmp/m2pdf07/pg-37.jpg /tmp/m2pdf07/pg-38.jpg /tmp/m2pdf07/pg-39.jpg /tmp/m2pdf07/pg-40.jpg
echo "ALL BATCHES DONE"
ls -la "$BASE"

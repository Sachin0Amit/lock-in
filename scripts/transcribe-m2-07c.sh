#!/usr/bin/env bash
# transcribe-m2-07c.sh — solutions-band driver (Task 6-0, 2026-11-20): the
# first solutions band of the m2-07 module. The printed theory band
# 7.1–7.48 = PDF 3–50 (offset +2, proven); PDF 51+ is the module's
# solutions part (its own printed numbering — transcribe the headers as
# seen). PDF 41–50 (the long pure-exercise band printed 7.39–7.48) is NOT
# transcribed per study-never-reproduce — the survey TOC's shapes suffice.
#   batch S1: PDF 51–56 — the solutions part's opening band (expected: the
#             CAE 7.x worked solutions — the method/shape ground the lesson
#             agents study, never reproduce).
# Same 100 DPI renders in /tmp/m2pdf07, sequential with 20 s pacing.
set -u
BASE=/home/z/my-project/temporary-references/m2scan
mkdir -p "$BASE"

PROMPT_HEAD='You are transcribing scanned pages of a Cengage-style algebra textbook (the chapter 7 "Permutation and Combination" solutions part). '
PROMPT_BODY='Transcribe FULLY and FAITHFULLY, in reading order: every section banner (e.g. "Hints and Solutions" / exercise-set names), and every worked solution with its full chain (write mathematics in LaTeX between $...$, keep the worked numbers exact). Mark page boundaries as [PDF p.N | printed <header>] using the printed page header if legible — the solutions part may carry its own numbering (e.g. S.xx), transcribe it exactly as printed. Do NOT summarize or skip worked steps. If something is illegible write (?). Output plain text only.'

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

run_batch tr-s.first.txt 51 /tmp/m2pdf07/pg-51.jpg /tmp/m2pdf07/pg-52.jpg /tmp/m2pdf07/pg-53.jpg /tmp/m2pdf07/pg-54.jpg /tmp/m2pdf07/pg-55.jpg /tmp/m2pdf07/pg-56.jpg
echo "SOLUTIONS BAND DONE"
ls -la "$BASE"

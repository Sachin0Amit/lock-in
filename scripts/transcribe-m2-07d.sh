#!/usr/bin/env bash
# transcribe-m2-07d.sh — solutions-band continuation (Task 6-0, 2026-11-20):
# the SECOND solutions batch — PDF 57–62 (printed S.130–S.135 expected), the
# CAE 7.9–7.12 worked solutions (All-Possible-Combinations / Division and
# Distribution / Identical / PIE) — the method-shape ground for 6.6. The
# solutions part opens at PDF 51 and runs to PDF 74; take 1 (tr-s.first.txt,
# PDF 51–56 = printed S.125–S.129) landed CAE 7.1–7.8 solutions. The remaining
# tail (the main Exercises' worked solutions, PDF 63–74) is NOT transcribed —
# our exercises are our own per study-never-reproduce; the survey TOC's
# exercise-band shapes suffice.
# Same 100 DPI renders in /tmp/m2pdf07, same pacing discipline.
set -u
BASE=/home/z/my-project/temporary-references/m2scan
mkdir -p "$BASE"

PROMPT_HEAD='You are transcribing scanned pages of a Cengage-style algebra textbook (the chapter 7 "Permutation and Combination" solutions part). '
PROMPT_BODY='Transcribe FULLY and FAITHFULLY, in reading order: every section banner (e.g. "Hints and Solutions" / exercise-set names), and every worked solution with its full chain (write mathematics in LaTeX between $...$, keep the worked numbers exact). Mark page boundaries as [PDF p.N | printed <header>] using the printed page header if legible — the solutions part carries its own numbering (S.xx), transcribe it exactly as printed. Do NOT summarize or skip worked steps. If something is illegible write (?). Output plain text only.'

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
i = raw.find('{')
text = raw
if i >= 0:
    try:
        j = json.loads(raw[i:])
        text = j['choices'][0]['message']['content']
    except Exception:
        pass
out_path.write_text(text if text.endswith('\n') else text + '\n', encoding='utf-8')
print(f'{out_path.name}: {len(text)} chars')
EOF
}

run_batch tr-s.130-135.txt 57 /tmp/m2pdf07/pg-57.jpg /tmp/m2pdf07/pg-58.jpg /tmp/m2pdf07/pg-59.jpg /tmp/m2pdf07/pg-60.jpg /tmp/m2pdf07/pg-61.jpg /tmp/m2pdf07/pg-62.jpg
echo "SOLUTIONS BAND 2 DONE"
ls -la "$BASE"

#!/usr/bin/env bash
# vlm_extract_toc.sh <key> — send the rendered front pages of one Drive book
# to the vision model and transcribe the COMPLETE table of contents.
# (Owner directive 2026-11-10: scanned Drive books get their TOC extracted
# by the vision model — nothing missed, not a single TOC.)
# Output: temporary-references/tocs/<key>.txt
set -uo pipefail
key="$1"
BASE=/home/z/my-project/temporary-references
imgdir="$BASE/tocimg/$key"
[ -d "$imgdir" ] || { echo "no image dir for $key" >&2; exit 1; }
mapfile -t imgs < <(ls "$imgdir"/p-*.jpg "$imgdir"/p*.jpg 2>/dev/null | sort -V)
[ "${#imgs[@]}" -gt 0 ] || { echo "no images for $key" >&2; exit 1; }

args=()
for i in "${imgs[@]}"; do args+=(-i "$i"); done

prompt="These are the first ${#imgs[@]} pages of a scanned JEE-mathematics reference book (Cengage-style module or classic text). Transcribe the COMPLETE table of contents exactly as printed: every topic number, every topic title, every subtopic, and every exercise/section entry (e.g. 'Concept Application Exercise', 'Exercise (JEE Main)', 'Exercise (JEE Advanced)', 'Answers', 'Hints and Solutions', 'Chapter Summary', 'Subjective Problems', 'Objective Problems', 'Fill in the Blanks', 'True/False', 'Multiple Choice', 'Assertion-Reasoning', 'Matrix-Match', 'Integer Answer Type', 'Linked Comprehension', 'Archive'). Include page numbers where printed. Keep the printed numbering (2.1, 2.2, 1.01, A, B …). If a page is a cover, title page, or dedication, output '[cover/title page]' for it and move on. Do NOT summarise or skip any contents entry — transcribe them ALL, one per line, in printed order. Plain text only, no commentary."

z-ai vision -p "$prompt" "${args[@]}" -o "$BASE/tocs/${key}.json"
python3 - "$BASE/tocs/${key}.json" "$BASE/tocs/${key}.txt" <<'PY'
import json, sys
src, dst = sys.argv[1], sys.argv[2]
with open(src) as f:
    data = json.load(f)
# tolerate different JSON shapes
text = None
if isinstance(data, dict):
    for k in ("content", "text", "message", "response", "result", "output"):
        if k in data and isinstance(data[k], str):
            text = data[k]; break
    if text is None:
        # nested choices
        try:
            text = data["choices"][0]["message"]["content"]
        except Exception:
            text = json.dumps(data, indent=1)
else:
    text = str(data)
with open(dst, "w") as f:
    f.write(text if text is not None else "")
print(f"{dst}: {len(text or '')} chars")
PY

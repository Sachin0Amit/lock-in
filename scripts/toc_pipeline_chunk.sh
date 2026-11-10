#!/usr/bin/env bash
# toc_pipeline_chunk.sh [budget_seconds] — ONE invocation of the full-shelf
# TOC pipeline (owner directive 2026-11-10): for the manifest entries not yet
# resolved, download → render-or-text-extract → delete PDF; then VLM-extract
# every rendered-but-untranscribed book, 3 z-ai vision calls in parallel.
# The sandbox reaps background daemons between invocations, so this script
# runs a bounded chunk per invocation and is re-invoked until ALL-DONE.
# State on disk (idempotent): tocs/<key>.txt, tocimg/<key>/, extract.log.
set -uo pipefail
BUDGET="${1:-480}"
START=$(date +%s)
BASE=/home/z/my-project/temporary-references
MANIFEST="$BASE/manifest.tsv"
LOG="$BASE/extract.log"

# ---- phase 1: downloads (one at a time) ----
while IFS=$'\t' read -r key fid label; do
  [ -z "$key" ] && continue
  now=$(date +%s); [ $((now - START)) -gt "$BUDGET" ] && break
  [ -s "$BASE/tocs/${key}.txt" ] && continue
  [ -d "$BASE/tocimg/${key}" ] && continue
  out="$BASE/pdfs/${key}.pdf"
  echo "=== $key :: $label" >> "$LOG"
  if bash /home/z/my-project/scripts/download_drive_file.sh "$fid" "$out" >> "$LOG" 2>&1; then
    pages=$(pdfinfo "$out" 2>/dev/null | awk '/^Pages:/{print $2}')
    echo "pages: $pages" >> "$LOG"
    pdftotext -f 1 -l 22 -layout "$out" - 2>/dev/null | sed -e 's/\f/\n---PAGEBREAK---\n/' > "$BASE/tocs/${key}.txt.tmp"
    chars=$(tr -d '[:space:]' < "$BASE/tocs/${key}.txt.tmp" | tr -d '[:cntrl:]' | wc -c)
    echo "chars: $chars" >> "$LOG"
    if [ "$chars" -lt 200 ]; then
      case "$key" in root-*) front=16 ;; *) front=6 ;; esac
      [ -n "$pages" ] && [ "$pages" -lt "$front" ] && front="$pages"
      mkdir -p "$BASE/tocimg/${key}"
      pdftoppm -jpeg -r 120 -jpegopt quality=82 -f 1 -l "$front" "$out" "$BASE/tocimg/${key}/p" >> "$LOG" 2>&1
      rm -f "$BASE/tocs/${key}.txt.tmp"
      echo "images: $(ls "$BASE/tocimg/${key}" 2>/dev/null | wc -l) (front $front) — NEEDS-VISION" >> "$LOG"
    else
      mv "$BASE/tocs/${key}.txt.tmp" "$BASE/tocs/${key}.txt"
      echo "STATUS: OK (text layer)" >> "$LOG"
    fi
    rm -f "$out"
  else
    echo "STATUS: DOWNLOAD-FAILED" >> "$LOG"
  fi
done < "$MANIFEST"

# ---- phase 2: VLM extraction, 3 in parallel ----
extract_one() {
  local key="$1"
  bash /home/z/my-project/scripts/vlm_extract_toc.sh "$key" > /dev/null 2>&1
}
JOBS=()
while IFS=$'\t' read -r key fid label; do
  [ -z "$key" ] && continue
  now=$(date +%s); [ $((now - START)) -gt $((BUDGET + 120)) ] && break
  [ -s "$BASE/tocs/${key}.txt" ] && continue
  [ -d "$BASE/tocimg/${key}" ] || continue
  extract_one "$key" &
  JOBS+=($!)
  while [ "$(jobs -r | wc -l)" -ge 3 ]; do sleep 4; done
done < "$MANIFEST"
for j in "${JOBS[@]:-}"; do wait "$j" 2>/dev/null; done

# ---- status ----
total=0; done_n=0; failed=0
while IFS=$'\t' read -r key fid label; do
  [ -z "$key" ] && continue
  total=$((total+1))
  [ -s "$BASE/tocs/${key}.txt" ] && done_n=$((done_n+1)) || true
done < "$MANIFEST"
[ -f "$BASE/vlm-failures.txt" ] && failed=$(wc -l < "$BASE/vlm-failures.txt")
echo "PROGRESS: $done_n / $total TOCs resolved ($failed VLM failures so far)"
if [ "$done_n" -eq "$total" ]; then echo "ALL-DONE"; fi

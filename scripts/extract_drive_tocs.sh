#!/usr/bin/env bash
# extract_drive_tocs.sh (v2) — full mathematics-shelf TOC extraction driver
# (owner directive 2026-11-10). ONE FILE AT A TIME (never bulk, storage law):
#   download → try pdftotext on the front matter →
#   digital PDF: keep the text TOC, delete the PDF;
#   scanned PDF: render the front pages to JPEG (for the VLM pass), delete
#                the PDF — nothing large is ever kept on disk.
# Idempotent: a key is skipped when its TOC text or its image set exists.
# Progress log: temporary-references/extract.log (reopened per invocation).
set -uo pipefail
BASE=/home/z/my-project/temporary-references
MANIFEST="$BASE/manifest.tsv"
LOG="$BASE/extract.log"
touch "$LOG"

while IFS=$'\t' read -r key fid label; do
  [ -z "$key" ] && continue
  txt="$BASE/tocs/${key}.txt"
  imgdir="$BASE/tocimg/${key}"
  if [ -s "$txt" ] || [ -d "$imgdir" ]; then
    echo "=== $key :: SKIP (already processed)" >> "$LOG"
    continue
  fi
  out="$BASE/pdfs/${key}.pdf"
  echo "=== $key :: $label" >> "$LOG"
  if bash /home/z/my-project/scripts/download_drive_file.sh "$fid" "$out" >> "$LOG" 2>&1; then
    pages=$(pdfinfo "$out" 2>/dev/null | awk '/^Pages:/{print $2}')
    echo "pages: $pages" >> "$LOG"
    pdftotext -f 1 -l 22 -layout "$out" - 2>/dev/null | sed -e 's/\f/\n---PAGEBREAK---\n/' > "$txt"
    chars=$(tr -d '[:space:]' < "$txt" | tr -d '[:cntrl:]' | wc -c)
    echo "chars: $chars" >> "$LOG"
    if [ "$chars" -lt 200 ]; then
      # scanned: render front pages for the VLM pass
      # modules: chapter-books, contents within the first ~6 pages
      # root tomes: deeper front matter, take 16
      case "$key" in
        root-*) front=16 ;;
        *) front=6 ;;
      esac
      [ "$pages" -lt "$front" ] && front="$pages"
      mkdir -p "$imgdir"
      pdftoppm -jpeg -r 120 -jpegopt quality=82 -f 1 -l "$front" "$out" "$imgdir/p" >> "$LOG" 2>&1
      n_img=$(ls "$imgdir" 2>/dev/null | wc -l)
      echo "images: $n_img (front $front)" >> "$LOG"
      rm -f "$txt"
      if [ "$n_img" -gt 0 ]; then
        echo "STATUS: NEEDS-VISION (rendered $n_img pages)" >> "$LOG"
      else
        echo "STATUS: RENDER-FAILED" >> "$LOG"
      fi
    else
      echo "STATUS: OK (text layer)" >> "$LOG"
    fi
    rm -f "$out" "$BASE/pdfs/${key}.keep.pdf"
  else
    echo "STATUS: DOWNLOAD-FAILED" >> "$LOG"
  fi
done < "$MANIFEST"
echo "PASS-DONE" >> "$LOG"

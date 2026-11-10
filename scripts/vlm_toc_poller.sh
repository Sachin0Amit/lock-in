#!/usr/bin/env bash
# vlm_toc_poller.sh — poll tocimg/ for newly rendered books and VLM-extract
# each one's TOC (owner directive 2026-11-10: every Drive book's TOC, vision
# for the scanned ones — nothing missed). Runs until the download driver has
# logged PASS-DONE AND every manifest key is resolved (tocs/<key>.txt or a
# recorded failure). Log: temporary-references/vlm-poller.log
set -uo pipefail
BASE=/home/z/my-project/temporary-references
MANIFEST="$BASE/manifest.tsv"
LOG="$BASE/vlm-poller.log"
: > "$LOG"

for round in $(seq 1 200); do
  driver_done=0
  rg -q '^PASS-DONE' "$BASE/extract.log" 2>/dev/null && driver_done=1

  pending=0
  while IFS=$'\t' read -r key fid label; do
    [ -z "$key" ] && continue
    [ -s "$BASE/tocs/${key}.txt" ] && continue
    if [ -d "$BASE/tocimg/${key}" ]; then
      pending=$((pending+1))
      echo "=== round $round: VLM $key :: $label" >> "$LOG"
      if bash /home/z/my-project/scripts/vlm_extract_toc.sh "$key" >> "$LOG" 2>&1; then
        echo "  -> tocs/${key}.txt written" >> "$LOG"
      else
        echo "  -> VLM FAILED for $key" >> "$LOG"
        echo "$key" >> "$BASE/vlm-failures.txt"
      fi
    else
      # no images yet and no text TOC — still pending unless driver is done
      # (text-layer books get tocs/<key>.txt from the driver itself)
      [ "$driver_done" -eq 1 ] || pending=$((pending+1))
    fi
  done < "$MANIFEST"

  if [ "$driver_done" -eq 1 ] && [ "$pending" -eq 0 ]; then
    echo "ALL-TOCS-DONE" >> "$LOG"
    break
  fi
  sleep 25
done
echo "POLLER-EXIT" >> "$LOG"

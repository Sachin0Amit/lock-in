#!/usr/bin/env bash
# download_drive_file.sh <fileId> <outPath> — download a Google Drive file
# (link-shared) via the usercontent endpoint with confirm token handling.
set -euo pipefail
id="$1"
out="$2"
if [ -z "$id" ] || [ -z "$out" ]; then
  echo "usage: download_drive_file.sh <fileId> <outPath>" >&2
  exit 1
fi
ua="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36"
url="https://drive.usercontent.google.com/download?id=${id}&export=download&confirm=t"
curl -fSL -A "$ua" "$url" -o "$out"
# If we got an HTML interstitial instead of the file, bail loudly.
if head -c 200 "$out" | grep -qi '<!DOCTYPE html\|<html'; then
  echo "ERROR: got HTML interstitial, not the file" >&2
  exit 2
fi
ls -lh "$out"

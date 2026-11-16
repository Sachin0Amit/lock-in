#!/usr/bin/env bash
# Client-bundle content leak audit (LockIn Library)
# Usage: bash scripts/audit-client-bundle.sh <url>
#
# Fetches the page HTML, extracts every referenced .js chunk, downloads
# each chunk, and greps for distinctive strings that exist ONLY inside
# written lesson content (not in any UI string). Any hit means library
# content is being shipped inside the browser JavaScript bundle.
set -u
URL="${1:-http://localhost:3000/}"
PROBE1="four jobs"          # SVG text inside Elementary Algebra 1.1 figure 1
PROBE2="spot the hat"       # same figure's footer line
PROBE3="five instance cards" # EA 1.1 figure 2 aria-label fragment

TMP=$(mktemp -d)
curl -s "$URL" -o "$TMP/page.html"
echo "== page: $URL ($(wc -c < "$TMP/page.html") bytes html)"

# collect script srcs (dev + prod forms)
grep -oE '(src|href)="[^"]*\.js[^"]*"' "$TMP/page.html" | sed -E 's/^(src|href)="//; s/"$//' | sort -u > "$TMP/chunks.txt"
# absolutise relative urls
sed -E 's#^/_next#http://localhost:3000/_next#' "$TMP/chunks.txt" > "$TMP/urls.txt"
echo "== $(wc -l < "$TMP/urls.txt") js references found"

hits=0
while read -r u; do
  [ -z "$u" ] && continue
  curl -s "$u" -o "$TMP/chunk.js"
  for probe in "$PROBE1" "$PROBE2" "$PROBE3"; do
    if grep -qF "$probe" "$TMP/chunk.js"; then
      hits=$((hits+1))
      echo "  LEAK: '$probe' found in $u ($(wc -c < "$TMP/chunk.js") bytes)"
    fi
  done
done < "$TMP/urls.txt"

if [ "$hits" -eq 0 ]; then
  echo "CLEAN: no written-lesson content string found in any referenced JS chunk."
else
  echo "VERDICT: $hits leak hit(s) — lesson content ships inside the client bundle."
fi
rm -rf "$TMP"

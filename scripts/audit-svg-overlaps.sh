#!/usr/bin/env bash
# audit-svg-overlaps.sh — run the figure-overlap detector on every lesson page
# Usage: bash scripts/audit-svg-overlaps.sh [lessonId ...]   (default: all FM lessons)
set -u
BASE=http://localhost:3000/book/foundation-mathematics/lesson
OUT=/tmp/overlap-audit
mkdir -p "$OUT"
PAGE_JS=$(cat /home/z/my-project/scripts/audit-svg-overlaps.page.js)

ALL_LESSONS=(
  fm-numbers-digits-place-value
  fm-comparing-ordering-numbers
  fm-rounding-and-estimating
  fm-addition-carrying
  fm-subtraction-borrowing
  fm-multiplication-repeated-addition
  fm-division-remainders-zero
  fm-order-of-operations
  fm-divisibility-and-its-tests
  fm-prime-numbers-factorisation
  fm-highest-common-factor
  fm-lowest-common-multiple
  fm-hcf-lcm-and-how-they-relate
  fm-idea-of-a-fraction
)
if [ "$#" -gt 0 ]; then LESSONS=("$@"); else LESSONS=("${ALL_LESSONS[@]}"); fi

for L in "${LESSONS[@]}"; do
  echo "== $L =="
  # infer the book from the lesson-id prefix (ans-* lessons live in book #2)
  case "$L" in
    ans-*) BOOK_BASE="http://localhost:3000/book/arithmetic-and-number-systems/lesson" ;;
    al-*) BOOK_BASE="http://localhost:3000/book/elementary-algebra/lesson" ;;
    *) BOOK_BASE="$BASE" ;;
  esac
  agent-browser open "$BOOK_BASE/$L" >/dev/null 2>&1
  agent-browser wait --load networkidle >/dev/null 2>&1 || true
  agent-browser wait 1200 >/dev/null 2>&1 || true
  LOC=$(agent-browser eval "location.pathname" 2>/dev/null | tr -d '"' || true)
  case "$LOC" in *"$L") ;; *) echo "  NAV FAIL (on $LOC) — skipping"; continue ;; esac
  agent-browser eval "$PAGE_JS" > "$OUT/$L.json" 2>"$OUT/$L.err"
  # print a compact digest
  node -e "
    const fs = require('fs');
    let raw = fs.readFileSync('$OUT/$L.json', 'utf8').trim();
    let data;
    try {
      let s = raw;
      for (let i = 0; i < 3; i++) { if (typeof s === 'string') { try { s = JSON.parse(s); } catch (e) { break; } } }
      data = s;
    } catch (e) { data = null; }
    if (!Array.isArray(data)) { console.log('  PARSE FAIL — raw head:', raw.slice(0, 200)); process.exit(0); }
    for (const r of data) {
      const n = r.issues.length;
      console.log('  svg' + r.svg + ' [' + r.W + 'x' + r.H + '] texts=' + r.texts + ' issues=' + n + '  «' + String(r.cap).slice(0, 60) + '…»');
      for (const i of r.issues) console.log('     - ' + i.type + '  ' + JSON.stringify(i.a) + (i.b ? ' × ' + JSON.stringify(i.b) : '') + (i.g ? ' vs ' + i.g : '') + '  ' + JSON.stringify(i.aAt || '') + (i.ov ? ' ov=' + JSON.stringify(i.ov) : ''));
    }
  "
done
echo "DONE — raw JSON in $OUT/"

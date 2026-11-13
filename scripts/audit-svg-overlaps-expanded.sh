#!/usr/bin/env bash
# audit-svg-overlaps-expanded.sh — same detector as audit-svg-overlaps.sh,
# but every exercise solution is EXPANDED first so solution figures
# (protocol §10.1) mount and get their layer-1 audit too.
# Usage: bash scripts/audit-svg-overlaps-expanded.sh <lessonId> [...]
set -u
PAGE_JS=$(cat /home/z/my-project/scripts/audit-svg-overlaps.page.js)
OUT=/tmp/overlap-audit
mkdir -p "$OUT"
for L in "$@"; do
  case "$L" in
    ans-*) BB="http://localhost:3000/book/arithmetic-and-number-systems/lesson" ;;
    al-*)  BB="http://localhost:3000/book/elementary-algebra/lesson" ;;
    aa-*)  BB="http://localhost:3000/book/advanced-algebra/lesson" ;;
    *)     BB="http://localhost:3000/book/foundation-mathematics/lesson" ;;
  esac
  echo "== $L (solutions expanded) =="
  agent-browser open "$BB/$L" >/dev/null 2>&1
  agent-browser wait --load networkidle >/dev/null 2>&1 || true
  agent-browser wait 1200 >/dev/null 2>&1 || true
  agent-browser eval "Array.from(document.querySelectorAll('button')).filter(function(b){return /show solution/i.test(b.textContent||'')}).forEach(function(b){b.click()}); 'expanded'" >/dev/null 2>&1
  agent-browser wait 900 >/dev/null 2>&1 || true
  LOC=$(agent-browser eval "location.pathname" 2>/dev/null | tr -d '"' || true)
  case "$LOC" in *"$L") ;; *) echo "  NAV FAIL (on $LOC) — skipping"; continue ;; esac
  agent-browser eval "$PAGE_JS" > "$OUT/$L.expanded.json" 2>"$OUT/$L.expanded.err"
  node -e "
    const fs = require('fs');
    let raw = fs.readFileSync('$OUT/$L.expanded.json', 'utf8').trim();
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
      for (const i of r.issues) console.log('     - ' + i.type + '  ' + JSON.stringify(i.a) + (i.b ? ' × ' + JSON.stringify(i.b) : '') + (i.g ? ' vs ' + JSON.stringify(i.g) : '') + '  ' + JSON.stringify(i.aAt || '') + (i.ov ? ' ov=' + JSON.stringify(i.ov) : ''));
    }
  "
done
echo DONE

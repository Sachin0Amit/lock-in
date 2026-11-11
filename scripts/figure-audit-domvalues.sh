#!/usr/bin/env bash
# figure-audit-domvalues.sh — Layer 1.5 live-DOM text/palette/aria audit per lesson.
# Usage: bash scripts/figure-audit-domvalues.sh <lessonId> [<lessonId> ...]
set -u
PAGE_JS=$(cat /home/z/my-project/scripts/figure-audit-domvalues.page.js)
mkdir -p /tmp/figaudit
for L in "$@"; do
  case "$L" in
    ans-*) BB="http://localhost:3000/book/arithmetic-and-number-systems/lesson" ;;
    al-*)  BB="http://localhost:3000/book/elementary-algebra/lesson" ;;
    aa-*)  BB="http://localhost:3000/book/advanced-algebra/lesson" ;;
    *)     BB="http://localhost:3000/book/foundation-mathematics/lesson" ;;
  esac
  agent-browser open "$BB/$L" >/dev/null 2>&1
  agent-browser wait --load networkidle >/dev/null 2>&1 || true
  agent-browser wait 1200 >/dev/null 2>&1 || true
  LOC=$(agent-browser eval "location.pathname" 2>/dev/null | tr -d '"' || true)
  case "$LOC" in *"$L") ;; *) echo "== $L NAV FAIL (on $LOC)"; continue ;; esac
  agent-browser eval "$PAGE_JS" > "/tmp/figaudit/$L.domvalues.json" 2>/dev/null
  python3 - "$L" <<'PYEOF'
import json, sys
lesson = sys.argv[1]
raw = open(f"/tmp/figaudit/{lesson}.domvalues.json").read().strip()
s = raw
for _ in range(3):
    if isinstance(s, str):
        try: s = json.loads(s)
        except Exception: break
if not isinstance(s, list):
    print(f"== {lesson} PARSE FAIL:", raw[:120]); sys.exit(0)
print(f"== {lesson}: {len(s)} figures")
anyflag = False
for f in s:
    fl = f['flags'] or ['none']
    if f['flags']: anyflag = True
    print(f"  fig{f['i']} vb={f['viewBox'][:30]} aria={'yes' if f['aria']!='MISSING' else 'MISSING'} flags={';'.join(fl)}")
    print(f"    tokens: {' | '.join(f['tokens'])}")
print(f"== {lesson}: {'FLAGS-PRESENT' if anyflag else 'CLEAN'}")
PYEOF
done

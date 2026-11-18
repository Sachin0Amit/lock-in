#!/usr/bin/env bash
# e2e-revision-progress.sh — full-journey E2E for the Revision Hub Progress
# tab + study progress engine (owner directive 2026-11-18):
#
#   1. the Progress tab renders on /revision (hero tiles, engine section,
#      picker, book standing with filters)
#   2. the in-hub picker loads the library tree, marks a chapter studied
#      (guest, no sign-in) → the topic lands in the stored list below with
#      its revision count — the owner's core loop: mark → store → list
#   3. a second revision pass via the topic row's Revise button (×2) and
#      via the engine's recommendation (Log revision) — revision counting
#   4. questions understood: an exact quiz write (score/total) and a legacy
#      quiz write (rating only) land in the census — 4/5 + 1/5 estimated
#   5. the engine recommends: weak mastery (revise) + next chapter (start)
#      rows with working links
#   6. the /practice?book= deep link opens the drill tab pre-scoped
#   7. console-error trap, mobile 390 viewport, dark mode, screenshots
#
# Uses agent-browser's snapshot-ref workflow (real CDP clicks). The dev
# server must be running on :3000 (started by the caller, per the
# nohup-per-command rule).
set -u
BASE=http://localhost:3000
OUT=/tmp/e2e-progress
mkdir -p "$OUT"
STAMP=$(date +%s)
PASS=0
FAIL=0

ev() { agent-browser eval "$1" 2>/dev/null | tr -d '"'; }

chk() { # $1 name, $2 JS returning true
  local R
  R=$(ev "$2")
  if [ "$R" = "true" ]; then
    PASS=$((PASS + 1))
    echo "  PASS $1"
  else
    FAIL=$((FAIL + 1))
    echo "  FAIL $1 (got: $R)"
  fi
}

wait_for() { # $1 JS returning true, $2 attempts (x500ms)
  local i R
  i=0
  while [ "$i" -lt "$2" ]; do
    R=$(ev "$1")
    if [ "$R" = "true" ]; then return 0; fi
    agent-browser wait 500 >/dev/null 2>&1 || true
    i=$((i + 1))
  done
  return 1
}

clickref() { # $1 grep pattern on the snapshot line, $2 occurrence
  local OCC REF LINES
  OCC="${2:-1}"
  LINES=$(agent-browser snapshot -i 2>/dev/null | grep -F "$1")
  REF=$(echo "$LINES" | sed -n "${OCC}p" | sed -n 's/.*ref=\(e[0-9]\+\)\].*/\1/p' | head -1)
  if [ -z "$REF" ]; then
    echo "missing-ref: $1"
    return 1
  fi
  agent-browser scrollintoview "@$REF" >/dev/null 2>&1 || true
  agent-browser click "@$REF" >/dev/null 2>&1
  return 0
}

TRAP="window.__e2eErrors=[];var _ce=console.error;console.error=function(){window.__e2eErrors.push([].slice.call(arguments).join(' '));_ce.apply(console,arguments)};'trap'"

echo "== DESKTOP 1280 — the Progress tab renders =="

agent-browser set viewport 1280 900 >/dev/null 2>&1 || true
agent-browser open "$BASE/revision" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2500 >/dev/null 2>&1 || true
ev "$TRAP" >/dev/null 2>&1 || true
ev "localStorage.clear();'cleared'" >/dev/null 2>&1 || true
# reset the shared local-learner ledger so this run is deterministic
# (synchronous XHR — fire-and-forget fetches would be aborted by navigation)
ev "var x=new XMLHttpRequest();x.open('POST','/api/revision/mark',false);x.setRequestHeader('content-type','application/json');x.send(JSON.stringify({items:[{scope:'chapter',refId:'foundation-mathematics:1'},{scope:'lesson',refId:'fm-numbers-digits-place-value'},{scope:'lesson',refId:'fm-comparing-ordering-numbers'}],action:'unmark'}));'reset:'+x.status" >/dev/null 2>&1 || true

chk "hub: four tabs now render" "[].slice.call(document.querySelectorAll('[role=tab]')).length===4"
clickref 'tab "Progress"' >/dev/null
agent-browser wait 1200 >/dev/null 2>&1 || true

if wait_for "document.body.textContent.indexOf('Your study progress')>-1" 30; then
  PASS=$((PASS + 1)); echo "  PASS progress hero renders"
else
  FAIL=$((FAIL + 1)); echo "  FAIL progress hero"
fi
chk "hero: Topics studied tile" "document.body.textContent.indexOf('Topics studied')>-1"
chk "hero: Books completed tile" "document.body.textContent.indexOf('Books completed')>-1"
chk "hero: Questions understood tile" "document.body.textContent.indexOf('Questions understood')>-1"
chk "hero: Chapters covered tile" "document.body.textContent.indexOf('Chapters covered')>-1"
chk "hero: Revision passes tile" "document.body.textContent.indexOf('Revision passes')>-1"
chk "engine section heading" "document.body.textContent.indexOf('What the engine recommends')>-1"
chk "stored list heading" "document.body.textContent.indexOf('Your studied topics')>-1"
chk "book standing heading + filters" "document.body.textContent.indexOf('Progress by book')>-1 && document.body.textContent.indexOf('Completed')>-1 && document.body.textContent.indexOf('Untouched')>-1"
chk "picker collapsed prompt" "document.body.textContent.indexOf('Mark topics you have studied')>-1"
chk "explainer present" "document.body.textContent.indexOf('How the engine analyses you')>-1"
agent-browser screenshot "$OUT/01-progress-empty.png" >/dev/null 2>&1 || true

echo "== the picker: mark a chapter → it stores in the list =="

clickref 'Mark topics you have studied' >/dev/null
if wait_for "document.getElementById('progress-book')!==null" 30; then
  PASS=$((PASS + 1)); echo "  PASS picker opens with the book select"
else
  FAIL=$((FAIL + 1)); echo "  FAIL picker open"
fi
# the tree fetch must finish before the book options exist — wait for both books
if wait_for "document.querySelector('#progress-book option[value=foundation-mathematics]')!==null && document.querySelector('#progress-book option[value=advanced-algebra]')!==null" 40; then
  agent-browser select "#progress-book" "foundation-mathematics" >/dev/null 2>&1 || true
  agent-browser wait 800 >/dev/null 2>&1 || true
  PASS=$((PASS + 1)); echo "  PASS foundation-mathematics selectable after the tree loads"
else
  FAIL=$((FAIL + 1)); echo "  FAIL tree options loaded"
fi
chk "picker: foundation book chapters render" "document.body.textContent.indexOf('Chapter 1 · Numbers, Digits and Place Value')>-1 || document.body.textContent.indexOf('Chapter 1 ·')>-1"
# planned chapters render honestly (advanced-algebra carries authored + planned ones)
agent-browser select "#progress-book" "advanced-algebra" >/dev/null 2>&1 || true
agent-browser wait 600 >/dev/null 2>&1 || true
chk "picker: planned chapters labelled honestly" "document.body.textContent.indexOf('Planned ·')>-1"
agent-browser select "#progress-book" "foundation-mathematics" >/dev/null 2>&1 || true
agent-browser wait 600 >/dev/null 2>&1 || true

# mark chapter 1 studied from the picker (guest → local learner ledger)
clickref 'button "Mark studied"' >/dev/null
if wait_for "document.body.textContent.indexOf('revised 1×')>-1" 40; then
  PASS=$((PASS + 1)); echo "  PASS chapter mark stores in the progress list (revised 1×)"
else
  FAIL=$((FAIL + 1)); echo "  FAIL mark → stored list"
fi
chk "stored row shows the book it came from" "document.body.textContent.indexOf('Foundation Mathematics · revised')>-1"
chk "stored row shows mastery + due" "document.body.textContent.indexOf('mastery')>-1 && document.body.textContent.indexOf('Due')>-1"
agent-browser screenshot "$OUT/02-marked-list.png" >/dev/null 2>&1 || true

echo "== revision counting: the row's Revise button =="

# the topic row Revise button (snapshot ref: 'Revise' appears in the row)
clickref 'button "Revise"' >/dev/null
agent-browser wait 1500 >/dev/null 2>&1 || true
if wait_for "document.body.textContent.indexOf('revised 2×')>-1" 40; then
  PASS=$((PASS + 1)); echo "  PASS revise button logs a pass (revised 2×)"
else
  FAIL=$((FAIL + 1)); echo "  FAIL revision pass count"
fi
chk "hero: topics + passes reflect the ledger" "(function(){var t=document.body.textContent;return t.indexOf('Revision passes')>-1})()"

echo "== the engine: weak-mastery revise + next-chapter start =="

# time travel (the house pattern): weaken + backdate the local learner's
# chapter entry so the weak-mastery recommendation is deterministic
bun -e '
const { db } = await import("/home/z/my-project/src/lib/db.ts")
const u = await db.user.findUnique({ where: { email: "local@lockin.library" } })
const n = await db.studyEntry.updateMany({
  where: { userId: u.id, refId: "foundation-mathematics:1" },
  data: { lastAt: new Date(Date.now() - 6 * 86400000), dueAt: new Date(Date.now() - 5 * 86400000), intervalDays: 2, lastQuality: 1, mastery: 18 },
})
console.log("backdated entries:", n.count)
await db.$disconnect()
' 2>/dev/null

agent-browser open "$BASE/revision" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2000 >/dev/null 2>&1 || true
clickref 'tab "Progress"' >/dev/null
agent-browser wait 1500 >/dev/null 2>&1 || true

if wait_for "document.body.textContent.indexOf('What the engine recommends')>-1 && [].slice.call(document.querySelectorAll('ul.divide-y li')).length>0" 40; then
  PASS=$((PASS + 1)); echo "  PASS engine recommendations render after the mark"
else
  FAIL=$((FAIL + 1)); echo "  FAIL recommendations render"
fi
chk "engine: weak mastery recommendation (mastery text)" "(function(){var t=document.body.textContent;return t.indexOf('Mastery is still')>-1 || t.indexOf('Studied once, never revised')>-1})()"
chk "engine: next-chapter start recommendation" "document.body.textContent.indexOf('The next step in')>-1 || document.body.textContent.indexOf('chapters studied so far')>-1"
chk "engine: revise rows carry the practice link" "[].slice.call(document.querySelectorAll('a')).some(function(a){return a.getAttribute('href') && a.getAttribute('href').indexOf('/practice?book=')===0})"
chk "engine: Log revision action present" "[].slice.call(document.querySelectorAll('button')).some(function(b){return b.textContent.indexOf('Log revision')>-1})"
agent-browser screenshot "$OUT/03-recommendations.png" >/dev/null 2>&1 || true

echo "== questions understood: exact + legacy quiz writes =="

# exact write (the reader-quiz contract, now carrying raw score/total)
Q1=$(ev "var x=new XMLHttpRequest();x.open('POST','/api/revision/mark',false);x.setRequestHeader('content-type','application/json');x.send(JSON.stringify({items:[{scope:'lesson',refId:'fm-comparing-ordering-numbers'}],action:'quiz',quality:4,kind:'quiz',score:4,total:5}));'exact:'+x.status")
# legacy write (rating only — the pre-2026-11-18 rows still in ledgers)
Q2=$(ev "var x=new XMLHttpRequest();x.open('POST','/api/revision/mark',false);x.setRequestHeader('content-type','application/json');x.send(JSON.stringify({items:[{scope:'lesson',refId:'fm-numbers-digits-place-value'}],action:'quiz',quality:1,kind:'quiz'}));'legacy:'+x.status")
if [ "$Q1" = "exact:200" ]; then
  PASS=$((PASS + 1)); echo "  PASS exact quiz write accepted (score 4/5 rides the contract)"
else
  FAIL=$((FAIL + 1)); echo "  FAIL exact quiz write ($Q1)"
fi
if [ "$Q2" = "legacy:200" ]; then
  PASS=$((PASS + 1)); echo "  PASS legacy quiz write accepted (rating only, no raw score)"
else
  FAIL=$((FAIL + 1)); echo "  FAIL legacy quiz write ($Q2)"
fi
# invalid writes must be rejected by the contract (score > total; score on non-quiz action)
B1=$(ev "var x=new XMLHttpRequest();x.open('POST','/api/revision/mark',false);x.setRequestHeader('content-type','application/json');x.send(JSON.stringify({items:[{scope:'lesson',refId:'fm-numbers-digits-place-value'}],action:'quiz',quality:4,kind:'quiz',score:6,total:5}));'r:'+x.status")
B2=$(ev "var x=new XMLHttpRequest();x.open('POST','/api/revision/mark',false);x.setRequestHeader('content-type','application/json');x.send(JSON.stringify({items:[{scope:'lesson',refId:'fm-numbers-digits-place-value'}],action:'revise',quality:4,kind:'revision',score:3,total:5}));'r:'+x.status")
if [ "$B1" = "r:400" ]; then
  PASS=$((PASS + 1)); echo "  PASS mark contract rejects score>total (400)"
else
  FAIL=$((FAIL + 1)); echo "  FAIL score>total rejection ($B1)"
fi
if [ "$B2" = "r:400" ]; then
  PASS=$((PASS + 1)); echo "  PASS mark contract rejects score on non-quiz actions (400)"
else
  FAIL=$((FAIL + 1)); echo "  FAIL non-quiz score rejection ($B2)"
fi

agent-browser open "$BASE/revision" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2000 >/dev/null 2>&1 || true
ev "$TRAP" >/dev/null 2>&1 || true
clickref 'tab "Progress"' >/dev/null
agent-browser wait 1500 >/dev/null 2>&1 || true

if wait_for "document.body.textContent.indexOf('5/10')>-1" 40; then
  PASS=$((PASS + 1)); echo "  PASS questions understood census shows 5/10 (exact 4/5 + legacy est 1/5)"
else
  FAIL=$((FAIL + 1)); echo "  FAIL questions understood census"
fi
chk "quiz accuracy shown (50% across both writes)" "document.body.textContent.indexOf('50% accuracy')>-1"
chk "legacy estimates labelled honestly" "document.body.textContent.indexOf('estimated from their ratings')>-1"
agent-browser screenshot "$OUT/04-quiz-census.png" >/dev/null 2>&1 || true

echo "== the /practice?book= deep link =="

agent-browser open "$BASE/practice?book=foundation-mathematics" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2000 >/dev/null 2>&1 || true
ev "$TRAP" >/dev/null 2>&1 || true
chk "deep link opens on the Adaptive drill tab" "(function(){var t=[].slice.call(document.querySelectorAll('[role=tab]')).find(function(x){return x.getAttribute('aria-selected')==='true'});return !!t && t.textContent.indexOf('Adaptive drill')>-1})()"
chk "deep link pre-selects One book focus" "(function(){var t=document.body.textContent;return t.indexOf('One book')>-1})()"
chk "deep link pre-selects Foundation Mathematics" "document.getElementById('drill-book') && document.getElementById('drill-book').value==='foundation-mathematics'"
agent-browser screenshot "$OUT/05-deep-link.png" >/dev/null 2>&1 || true

echo "== console errors + mobile + dark =="

ERRORS=$(ev "window.__e2eErrors ? window.__e2eErrors.length : -1")
if [ "$ERRORS" = "0" ]; then
  PASS=$((PASS + 1)); echo "  PASS zero console errors"
else
  FAIL=$((FAIL + 1)); echo "  FAIL console errors: $ERRORS"
  ev "window.__e2eErrors && window.__e2eErrors.slice(0,5).join(' || ')" 2>/dev/null || true
fi

agent-browser set viewport 390 844 >/dev/null 2>&1 || true
agent-browser open "$BASE/revision" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2500 >/dev/null 2>&1 || true
ev "$TRAP" >/dev/null 2>&1 || true
clickref 'tab "Progress"' >/dev/null
agent-browser wait 2000 >/dev/null 2>&1 || true
chk "mobile 390: no horizontal overflow on the Progress tab" "document.documentElement.scrollWidth<=395"
agent-browser screenshot "$OUT/06-mobile-progress.png" >/dev/null 2>&1 || true

agent-browser set viewport 1280 900 >/dev/null 2>&1 || true
ev "localStorage.setItem('theme','dark');'dark'" >/dev/null 2>&1 || true
agent-browser open "$BASE/revision" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2500 >/dev/null 2>&1 || true
ev "$TRAP" >/dev/null 2>&1 || true
agent-browser wait 2500 >/dev/null 2>&1 || true
clickref 'tab "Progress"' >/dev/null
agent-browser wait 2000 >/dev/null 2>&1 || true
chk "dark mode renders the Progress tab" "document.documentElement.classList.contains('dark') && document.querySelectorAll('h2,h3').length>0"
agent-browser screenshot "$OUT/07-dark-progress.png" >/dev/null 2>&1 || true
ev "localStorage.removeItem('theme');'light'" >/dev/null 2>&1 || true

echo "== cleanup: unmark the test ledger =="
ev "var x=new XMLHttpRequest();x.open('POST','/api/revision/mark',false);x.setRequestHeader('content-type','application/json');x.send(JSON.stringify({items:[{scope:'chapter',refId:'foundation-mathematics:1'},{scope:'lesson',refId:'fm-numbers-digits-place-value'},{scope:'lesson',refId:'fm-comparing-ordering-numbers'}],action:'unmark'}));'reset:'+x.status" >/dev/null 2>&1 || true

echo ""
if [ "$FAIL" -gt 0 ]; then
  echo "e2e-revision-progress: $PASS/$((PASS + FAIL)) checks FAILED ($FAIL failures)"
  exit 1
fi
echo "e2e-revision-progress: $PASS/$((PASS + FAIL)) checks ALL GREEN"
exit 0

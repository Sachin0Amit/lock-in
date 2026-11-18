#!/usr/bin/env bash
# e2e-focus-planner.sh — full-journey E2E for the Focus Hub (study to-do ×
# pomodoro, owner chat directive 2026-11-18):
#
#   1. /focus renders: timer card (25:00 default dial), engine notes,
#      empty list, the add form
#   2. add a plain task → the row with its estimate; add a linked task via
#      the catalog picker (book → chapter → lesson) → link chip + href
#   3. pomodoro: set focus length to 1 min via the settings popover,
#      focus ON the linked task, wait for the bell → session logged,
#      "1 of 1 pomodoros · 1 min focused", cycle dot 1/4, ledger note
#   4. the ledger bridge: the linked lesson gained a study pass
#      (StudyEvent kind 'focus', honest secs) — Revision Hub sees it
#   5. complete a task → Completed section; Stats tab: tiles, week bars,
#      "where the focus went"
#   6. keyboard: Space pauses/resumes the running phase
#   7. console-error trap, mobile 390 viewport, dark mode, screenshots
#
# Uses agent-browser's snapshot-ref workflow (real CDP clicks). The dev
# server must be running on :3000 (started by the caller, warm-before-gate).
set -u
BASE=http://localhost:3000
OUT=/tmp/e2e-focus
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

typeval() { # $1 css id, $2 value — React-native setter + input event
  ev "var el=document.getElementById('$1');var d=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value');d.set.call(el,'$2');el.dispatchEvent(new Event('input',{bubbles:true}))"
}

TRAP="window.__e2eErrors=[];var _ce=console.error;console.error=function(){window.__e2eErrors.push([].slice.call(arguments).join(' '));_ce.apply(console,arguments)};'trap'"

reset_all() {
  ev "var x=new XMLHttpRequest();x.open('POST','/api/revision/mark',false);x.setRequestHeader('content-type','application/json');x.send(JSON.stringify({items:[{scope:'lesson',refId:'fm-comparing-ordering-numbers'},{scope:'lesson',refId:'fm-numbers-digits-place-value'}],action:'unmark'}));'reset-ledger:'+x.status" >/dev/null 2>&1 || true
  bun -e '
const { db } = await import("/home/z/my-project/src/lib/db.ts")
const u = await db.user.findUnique({ where: { email: "local@lockin.library" } })
await db.focusTask.deleteMany({ where: { userId: u.id } })
await db.focusSession.deleteMany({ where: { userId: u.id } })
await db.studyEvent.deleteMany({ where: { userId: u.id, kind: "focus" } })
console.log("focus tables reset")
await db.$disconnect()
' 2>/dev/null
}

echo "== DESKTOP 1280 — the Focus Hub renders =="

agent-browser set viewport 1280 900 >/dev/null 2>&1 || true
agent-browser open "$BASE/focus" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2500 >/dev/null 2>&1 || true
ev "$TRAP" >/dev/null 2>&1 || true
ev "localStorage.clear();'cleared'" >/dev/null 2>&1 || true
reset_all

agent-browser open "$BASE/focus" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2000 >/dev/null 2>&1 || true
ev "$TRAP" >/dev/null 2>&1 || true

chk "hub: the Focus Hub heading renders" "document.body.textContent.indexOf('Focus Hub')>-1"
chk "timer: the default 25:00 dial" "document.body.textContent.indexOf('25:00')>-1 && document.body.textContent.indexOf('of 25 min')>-1"
chk "timer: cadence dots 0/4" "document.body.textContent.indexOf('0/4 · then long break')>-1"
chk "engine notes section" "document.body.textContent.indexOf('The engine suggests')>-1"
chk "empty state invites the first task" "document.body.textContent.indexOf('The list is clear')>-1"
chk "nav: Focus item in the header" "[].slice.call(document.querySelectorAll('header a')).some(function(a){return (a.getAttribute('href')||'')==='/focus'})"
agent-browser screenshot "$OUT/01-render.png" >/dev/null 2>&1 || true

echo "== add a plain task =="

typeval "focus-title" "E2E first task"
clickref 'button "Add"' >/dev/null
if wait_for "document.body.textContent.indexOf('E2E first task')>-1" 30; then
  PASS=$((PASS + 1)); echo "  PASS the plain task lands as a row"
else
  FAIL=$((FAIL + 1)); echo "  FAIL plain task row"
fi
chk "row: fresh estimate honest label" "document.body.textContent.indexOf('0 of 1 pomodoros · 0 min focused')>-1"
agent-browser screenshot "$OUT/02-first-task.png" >/dev/null 2>&1 || true

echo "== add a linked task via the catalog picker =="

clickref 'Estimate, priority, due date, library link' >/dev/null
if wait_for "document.getElementById('focus-link-book')!==null" 30; then
  PASS=$((PASS + 1)); echo "  PASS details expand with the picker"
else
  FAIL=$((FAIL + 1)); echo "  FAIL details expand"
fi
if wait_for "document.querySelector('#focus-link-book option[value=foundation-mathematics]')!==null" 40; then
  agent-browser select "#focus-link-book" "foundation-mathematics" >/dev/null 2>&1 || true
  agent-browser wait 800 >/dev/null 2>&1 || true
  PASS=$((PASS + 1)); echo "  PASS book selectable after the tree loads"
else
  FAIL=$((FAIL + 1)); echo "  FAIL tree options"
fi
agent-browser select "#focus-link-chapter" "1" >/dev/null 2>&1 || true
agent-browser wait 600 >/dev/null 2>&1 || true
chk "chapter select enables the lessons" "document.querySelector('#focus-link-lesson option[value=fm-comparing-ordering-numbers]')!==null"
agent-browser select "#focus-link-lesson" "fm-comparing-ordering-numbers" >/dev/null 2>&1 || true
agent-browser wait 400 >/dev/null 2>&1 || true
chk "linked preview names the lesson" "document.body.textContent.indexOf('Linked: lesson')>-1"
typeval "focus-title" "E2E linked task"
clickref 'button "Add"' >/dev/null
if wait_for "[].slice.call(document.querySelectorAll('a')).some(function(a){return (a.getAttribute('href')||'').indexOf('/book/foundation-mathematics/lesson/fm-comparing-ordering-numbers')>-1})" 30; then
  PASS=$((PASS + 1)); echo "  PASS the linked row carries the deep-link chip"
else
  FAIL=$((FAIL + 1)); echo "  FAIL linked row chip"
fi
chk "linked row shows the lesson label" "document.body.textContent.indexOf('1.2 Comparing and Ordering Numbers')>-1"
agent-browser screenshot "$OUT/03-linked-task.png" >/dev/null 2>&1 || true

echo "== the pomodoro bell: 1-minute focus ON the linked task =="

clickref 'Pomodoro settings' >/dev/null
if wait_for "document.getElementById('set-focus')!==null" 30; then
  PASS=$((PASS + 1)); echo "  PASS settings popover opens"
else
  FAIL=$((FAIL + 1)); echo "  FAIL settings popover"
fi
ev "var el=document.getElementById('set-focus');var d=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value');d.set.call(el,'1');el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('focusout',{bubbles:true}));el.dispatchEvent(new Event('blur'))" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser press Escape >/dev/null 2>&1 || true
agent-browser wait 800 >/dev/null 2>&1 || true
chk "dial now shows a 1-minute focus" "document.body.textContent.indexOf('of 1 min')>-1"

clickref 'Focus on task: E2E linked task' >/dev/null
agent-browser wait 1500 >/dev/null 2>&1 || true
chk "timer running: 01:0x countdown in the dial" "(function(){var t=document.body.textContent;return /0[01]:[0-5][0-9]/.test(t) || t.indexOf('01:00')>-1})()"
chk "title carries the countdown" "document.title.indexOf('Focus')>-1 || document.title.indexOf(':')>-1"
chk "the linked task row shows On the clock" "document.body.textContent.indexOf('On the clock')>-1"
agent-browser screenshot "$OUT/04-running.png" >/dev/null 2>&1 || true

echo "== waiting for the bell (~65s) =="

if wait_for "document.body.textContent.indexOf('1 of 1 pomodoros · 1 min focused')>-1" 140; then
  PASS=$((PASS + 1)); echo "  PASS the bell logged: 1 of 1 pomodoros · 1 min focused"
else
  FAIL=$((FAIL + 1)); echo "  FAIL the bell logged"
fi
chk "cadence dot advanced to 1/4" "document.body.textContent.indexOf('1/4 · then long break')>-1"
chk "ledger note: the study pass logged" "document.body.textContent.indexOf('Study pass logged')>-1"
chk "the break phase armed after the bell" "(function(){var t=document.body.textContent;return t.indexOf('Break')>-1})()"
agent-browser screenshot "$OUT/05-after-bell.png" >/dev/null 2>&1 || true

echo "== the ledger bridge: Revision Hub sees the focus =="

LEDGER=$(bun -e '
const { db } = await import("/home/z/my-project/src/lib/db.ts")
const u = await db.user.findUnique({ where: { email: "local@lockin.library" } })
const e = await db.studyEntry.findFirst({ where: { userId: u.id, refId: "fm-comparing-ordering-numbers" } })
const ev = await db.studyEvent.findFirst({ where: { userId: u.id, kind: "focus" }, orderBy: { createdAt: "desc" } })
const f = await db.focusSession.findFirst({ where: { userId: u.id }, orderBy: { startedAt: "desc" } })
console.log(JSON.stringify({ passes: e?.passes, entryId: e?.id, evEntry: ev?.entryId, evSecs: ev?.secs, evOutcome: ev?.kind, sessSecs: f?.actualSecs, sessOutcome: f?.outcome }))
await db.$disconnect()
' 2>/dev/null)
echo "ledger: $LEDGER"
if echo "$LEDGER" | grep -q '"passes":1' && echo "$LEDGER" | grep -q '"evSecs":60' && echo "$LEDGER" | grep -q '"sessOutcome":"complete"'; then
  PASS=$((PASS + 1)); echo "  PASS ledger bridge verified (entry + focus event + session row)"
else
  FAIL=$((FAIL + 1)); echo "  FAIL ledger bridge"
fi

chk "revision overview now lists the lesson entry" "(function(){var x=new XMLHttpRequest();x.open('GET','/api/revision/overview',false);x.send();var d=JSON.parse(x.responseText);return d.entries.some(function(e){return e.refId==='fm-comparing-ordering-numbers'})})()"

echo "== keyboard: Space runs the break, pauses, resumes =="

agent-browser press Space >/dev/null 2>&1 || true
agent-browser wait 800 >/dev/null 2>&1 || true
chk "Space started the armed break (Pause offered)" "[].slice.call(document.querySelectorAll('button')).some(function(b){return b.textContent.indexOf('Pause')>-1})"
agent-browser press Space >/dev/null 2>&1 || true
agent-browser wait 800 >/dev/null 2>&1 || true
chk "Space paused it (Resume offered)" "[].slice.call(document.querySelectorAll('button')).some(function(b){return b.textContent.indexOf('Resume')>-1})"
agent-browser press Space >/dev/null 2>&1 || true
agent-browser wait 800 >/dev/null 2>&1 || true
chk "Space resumed it (Pause offered again)" "[].slice.call(document.querySelectorAll('button')).some(function(b){return b.textContent.indexOf('Pause')>-1})"
agent-browser press Space >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true

echo "== complete the plain task → Completed section =="

clickref 'Mark task done' >/dev/null
agent-browser wait 1500 >/dev/null 2>&1 || true
if wait_for "document.body.textContent.indexOf('Completed (1)')>-1" 30; then
  PASS=$((PASS + 1)); echo "  PASS done task moves into Completed (1)"
else
  FAIL=$((FAIL + 1)); echo "  FAIL completed section"
fi
clickref 'Completed (' >/dev/null
agent-browser wait 800 >/dev/null 2>&1 || true
chk "done rows honest: reopen offered" "[].slice.call(document.querySelectorAll('button')).some(function(b){return b.textContent.indexOf('Reopen')>-1})"
agent-browser screenshot "$OUT/06-completed.png" >/dev/null 2>&1 || true

echo "== the Stats tab =="

clickref 'tab "Stats"' >/dev/null
agent-browser wait 1500 >/dev/null 2>&1 || true
chk "stats: Focus today tile (1 min)" "document.body.textContent.indexOf('Focus today')>-1 && document.body.textContent.indexOf('1 min')>-1"
chk "stats: Streak tile alive" "document.body.textContent.indexOf('Streak')>-1 && document.body.textContent.indexOf('1 day')>-1"
chk "stats: Tasks done today tile" "document.body.textContent.indexOf('Tasks done today')>-1"
chk "stats: the week bars section" "document.body.textContent.indexOf('The last seven days')>-1"
chk "stats: where the focus went names the linked task" "document.body.textContent.indexOf('E2E linked task')>-1"
chk "stats: honest minute census" "document.body.textContent.indexOf('Honest minutes')>-1"
agent-browser screenshot "$OUT/07-stats.png" >/dev/null 2>&1 || true

echo "== console errors + mobile + dark =="

ERRORS=$(ev "window.__e2eErrors ? window.__e2eErrors.length : -1")
if [ "$ERRORS" = "0" ]; then
  PASS=$((PASS + 1)); echo "  PASS zero console errors"
else
  FAIL=$((FAIL + 1)); echo "  FAIL console errors: $ERRORS"
  ev "window.__e2eErrors && window.__e2eErrors.slice(0,5).join(' || ')" 2>/dev/null || true
fi

agent-browser set viewport 390 844 >/dev/null 2>&1 || true
agent-browser open "$BASE/focus" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2500 >/dev/null 2>&1 || true
ev "$TRAP" >/dev/null 2>&1 || true
agent-browser wait 2000 >/dev/null 2>&1 || true
chk "mobile 390: no horizontal overflow" "document.documentElement.scrollWidth<=395"
chk "mobile: the timer survives the reload (armed break)" "document.body.textContent.indexOf('Break')>-1"
agent-browser screenshot "$OUT/08-mobile.png" >/dev/null 2>&1 || true

agent-browser set viewport 1280 900 >/dev/null 2>&1 || true
ev "localStorage.setItem('theme','dark');'dark'" >/dev/null 2>&1 || true
agent-browser open "$BASE/focus" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2500 >/dev/null 2>&1 || true
ev "$TRAP" >/dev/null 2>&1 || true
agent-browser wait 2500 >/dev/null 2>&1 || true
chk "dark mode renders the Focus Hub" "document.documentElement.classList.contains('dark') && document.body.textContent.indexOf('Focus Hub')>-1"
agent-browser screenshot "$OUT/09-dark.png" >/dev/null 2>&1 || true
ev "localStorage.removeItem('theme');'light'" >/dev/null 2>&1 || true

echo "== cleanup =="

reset_all
ev "localStorage.removeItem('lockin:focus-timer:v1');localStorage.removeItem('lockin:focus-settings:v1');'timer-cleared'" >/dev/null 2>&1 || true

echo ""
if [ "$FAIL" -gt 0 ]; then
  echo "e2e-focus-planner: $PASS/$((PASS + FAIL)) checks FAILED ($FAIL failures)"
  exit 1
fi
echo "e2e-focus-planner: $PASS/$((PASS + FAIL)) checks ALL GREEN"
exit 0

#!/usr/bin/env bash
# e2e-floating-pomodoro.sh — full-journey E2E for the floating pomodoro icon
# (owner chat directives 2026-11-18: "hover the mouse and see how much time
# is left", then later: "the icon should show more features like add more
# time, adjust time or play pause such"):
#
#   1. idle render on the library home — the quiet 48 px corner icon
#   2. hidden on /focus (the big dial already lives there)
#   3. idle click opens the Focus Hub
#   4. a RUNNING focus seeded on the store: the icon rides a book lesson
#      page, the ring depletes, hover (pointer + keyboard focus) opens the
#      live tooltip — phase, wall-clock remainder, 'ends hh:mm', cadence
#      2/4, the free-focus line
#   5. QUICK CONTROLS on the same hover panel: +5 tailors the phase to
#      30 min (end epoch, aria, tooltip all move together), −1 shrinks it
#      to 29, pause keeps the remainder and adjusts while paused, resume,
#      skip arms the next phase, no click ever navigates, idle rests the
#      steps but keeps Start live (and starting from the panel runs a
#      fresh 25-min focus without leaving the page)
#   6. EXPIRED-WHILE-AWAY: a phase that ran out while the tab was closed
#      completes on load via the root-layout runtime (armed break next,
#      exactly one session row — single-flight pinned)
#   7. the off-hub toast: a completed focus on a LINKED task logs the
#      study pass into the revision ledger and the toast carries the news
#   8. drag: the icon moves, persists, clamps inside the viewport, and a
#      drag never fires the click navigation
#   9. console-error trap, mobile 390 (no horizontal overflow, the OPEN
#      panel included), dark mode
#
# Uses agent-browser's snapshot-ref workflow (real CDP clicks). The dev
# server must be running on :3000 (started by the caller).
set -u
BASE=http://localhost:3000
OUT=/tmp/e2e-floating
mkdir -p "$OUT"
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

clickref() { # $1 grep pattern on the snapshot line
  local REF LINES
  LINES=$(agent-browser snapshot -i 2>/dev/null | grep -F "$1")
  REF=$(echo "$LINES" | sed -n 's/.*ref=\(e[0-9]\+\)\].*/\1/p' | head -1)
  if [ -z "$REF" ]; then
    echo "missing-ref: $1"
    return 1
  fi
  agent-browser scrollintoview "@$REF" >/dev/null 2>&1 || true
  agent-browser click "@$REF" >/dev/null 2>&1
  return 0
}

TRAP="window.__e2eErrors=[];var _ce=console.error;console.error=function(){window.__e2eErrors.push([].slice.call(arguments).join(' '));_ce.apply(console,arguments)};'trap'"

seed_timer() { # $1 = JS object literal of overrides — a pure localStorage write (no page state)
  ev "localStorage.setItem('lockin:focus-timer:v1',JSON.stringify({state:Object.assign({phase:'focus',running:true,endsAt:null,remainingMs:null,cycleFocus:0,taskId:null,phaseStartedAt:null,lastSeq:0,settings:{focusMin:25,shortMin:5,longMin:15,longEvery:4,autoStartBreaks:false,autoStartFocus:false,sound:true,notify:true}},$1),version:0}));'seeded'"
}

reset_all() {
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

echo "== DESKTOP 1280 — the floating icon renders idle on the library home =="

agent-browser set viewport 1280 900 >/dev/null 2>&1 || true
agent-browser open "$BASE/" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2500 >/dev/null 2>&1 || true
ev "$TRAP" >/dev/null 2>&1 || true
ev "localStorage.removeItem('lockin:focus-timer:v1');localStorage.removeItem('lockin:floating-pomodoro:v1');'cleared'" >/dev/null 2>&1 || true
reset_all

agent-browser open "$BASE/" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2000 >/dev/null 2>&1 || true
ev "$TRAP" >/dev/null 2>&1 || true

chk "home: the floating icon is mounted" "document.querySelector('[data-pomodoro-float]')!==null"
chk "home: idle state" "document.querySelector('[data-pomodoro-float]').getAttribute('data-pomodoro-state')==='idle'"
chk "home: idle aria label invites the hub" "document.querySelector('[data-pomodoro-float] button').getAttribute('aria-label')==='Pomodoro idle — open the Focus Hub'"
chk "home: idle honest full phase (25 min)" "document.querySelector('[data-pomodoro-float] button').getAttribute('data-pomodoro-left')==='1500'"
chk "home: tooltip hidden until hover" "document.querySelector('[data-pomodoro-tooltip]').className.indexOf('opacity-0')>-1"
agent-browser screenshot "$OUT/01-idle-home.png" >/dev/null 2>&1 || true

echo "== hidden on /focus =="

agent-browser open "$BASE/focus" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2500 >/dev/null 2>&1 || true
chk "/focus: the floating icon stays quiet" "document.querySelector('[data-pomodoro-float]')===null"

echo "== idle click opens the Focus Hub =="

agent-browser open "$BASE/" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2000 >/dev/null 2>&1 || true
clickref 'Pomodoro idle' >/dev/null
if wait_for "location.pathname==='/focus'" 20; then
  PASS=$((PASS + 1)); echo "  PASS the idle click opens the Focus Hub"
else
  FAIL=$((FAIL + 1)); echo "  FAIL idle click navigation"
fi

echo "== a RUNNING focus rides a book lesson page =="

seed_timer "{endsAt:Date.now()+90000,remainingMs:null,cycleFocus:2,phaseStartedAt:Date.now()-1000}" >/dev/null 2>&1 || true
agent-browser open "$BASE/book/foundation-mathematics/lesson/fm-comparing-ordering-numbers" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2500 >/dev/null 2>&1 || true
ev "$TRAP" >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true

chk "lesson: running state while reading" "document.querySelector('[data-pomodoro-float]').getAttribute('data-pomodoro-state')==='running'"
chk "lesson: wall-clock remainder ~90s" "(function(){var l=Number(document.querySelector('[data-pomodoro-float] button').getAttribute('data-pomodoro-left'));return l>=60&&l<=95})()"
chk "lesson: aria names the minute and the phase" "document.querySelector('[data-pomodoro-float] button').getAttribute('aria-label')==='Pomodoro: a minute left in Focus'"

# hover (real pointer-over) opens the live tooltip
ev "document.querySelector('[data-pomodoro-float]').dispatchEvent(new PointerEvent('pointerover',{bubbles:true}));'over'" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
chk "hover: the tooltip opens" "document.querySelector('[data-pomodoro-tooltip]').className.indexOf('opacity-100')>-1"
chk "hover: the phase word shows" "document.querySelector('[data-pomodoro-tooltip]').textContent.indexOf('Focus')>-1"
chk "hover: the countdown ticks (01:xx)" "/01:[0-5][0-9]/.test(document.querySelector('[data-pomodoro-tooltip]').textContent)"
chk "hover: the absolute end stamp" "document.querySelector('[data-pomodoro-tooltip]').textContent.indexOf('ends')>-1"
chk "hover: the cadence reads 2/4" "document.querySelector('[data-pomodoro-tooltip]').textContent.indexOf('of 25 min · 2/4 pomodoros')>-1"
chk "hover: free focus line" "document.querySelector('[data-pomodoro-tooltip]').textContent.indexOf('Free focus — the bell only counts time.')>-1"
chk "hover: the drag hint" "document.querySelector('[data-pomodoro-tooltip]').textContent.indexOf('drag to move')>-1"
agent-browser screenshot "$OUT/02-running-tooltip.png" >/dev/null 2>&1 || true
ev "document.querySelector('[data-pomodoro-float]').dispatchEvent(new PointerEvent('pointerout',{bubbles:true}));'out'" >/dev/null 2>&1 || true
agent-browser wait 400 >/dev/null 2>&1 || true
chk "leave: the tooltip closes" "document.querySelector('[data-pomodoro-tooltip]').className.indexOf('opacity-0')>-1"
# keyboard focus opens the tooltip too (a11y parity with hover)
ev "document.querySelector('[data-pomodoro-float] button').focus();'focus'" >/dev/null 2>&1 || true
agent-browser wait 400 >/dev/null 2>&1 || true
chk "keyboard focus: the tooltip opens too" "document.querySelector('[data-pomodoro-tooltip]').className.indexOf('opacity-100')>-1"
ev "document.querySelector('[data-pomodoro-float] button').blur();'blur'" >/dev/null 2>&1 || true

echo "== EXPIRED-WHILE-AWAY completes on load via the runtime =="

seed_timer "{endsAt:Date.now()-5000,remainingMs:null,cycleFocus:0,phaseStartedAt:Date.now()-1505000}" >/dev/null 2>&1 || true
agent-browser open "$BASE/" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
ev "$TRAP" >/dev/null 2>&1 || true
if wait_for "document.querySelector('[data-pomodoro-float]')&&document.querySelector('[data-pomodoro-float]').getAttribute('data-pomodoro-state')==='armed'" 20; then
  PASS=$((PASS + 1)); echo "  PASS the expired phase completed on load (armed break now)"
else
  FAIL=$((FAIL + 1)); echo "  FAIL expired-phase completion"
fi
chk "expiry: the break phase armed 05:00" "document.querySelector('[data-pomodoro-float] button').getAttribute('aria-label')==='Pomodoro armed — 5 minutes of Short break ready'"
chk "expiry: tooltip says Short break / ready" "(function(){var b=document.querySelector('[data-pomodoro-float] button');b.focus();return true})()&&document.querySelector('[data-pomodoro-tooltip]').textContent.indexOf('Short break')>-1&&document.querySelector('[data-pomodoro-tooltip]').textContent.indexOf('ready')>-1"
ev "document.querySelector('[data-pomodoro-float] button').blur();'blur'" >/dev/null 2>&1 || true

SESSIONS=$(bun -e '
const { db } = await import("/home/z/my-project/src/lib/db.ts")
const u = await db.user.findUnique({ where: { email: "local@lockin.library" } })
const rows = await db.focusSession.findMany({ where: { userId: u.id } })
console.log(JSON.stringify({ count: rows.length, kinds: rows.map((r) => r.kind), outcomes: rows.map((r) => r.outcome), secs: rows.map((r) => r.actualSecs) }))
await db.$disconnect()
' 2>/dev/null)
echo "sessions: $SESSIONS"
if echo "$SESSIONS" | grep -q '"count":1' && echo "$SESSIONS" | grep -q '"outcomes":\["complete"\]' && echo "$SESSIONS" | grep -q '"secs":\[1500\]'; then
  PASS=$((PASS + 1)); echo "  PASS single-flight pinned — exactly one complete 1500s session row"
else
  FAIL=$((FAIL + 1)); echo "  FAIL session single-flight"
fi

echo "== the off-hub toast: a completed focus on a LINKED task logs the study pass =="

TASKID=$(ev "var x=new XMLHttpRequest();x.open('POST','/api/focus/task',false);x.setRequestHeader('content-type','application/json');x.send(JSON.stringify({title:'E2E floating task',estimate:2,link:{kind:'lesson',refId:'fm-comparing-ordering-numbers'}}));JSON.parse(x.responseText).id")
if [ -n "$TASKID" ]; then
  PASS=$((PASS + 1)); echo "  PASS the linked task created ($TASKID)"
else
  FAIL=$((FAIL + 1)); echo "  FAIL linked task create"
fi
seed_timer "{endsAt:Date.now()-4000,remainingMs:null,cycleFocus:0,taskId:'$TASKID',phaseStartedAt:Date.now()-1504000}" >/dev/null 2>&1 || true
agent-browser open "$BASE/" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
ev "$TRAP" >/dev/null 2>&1 || true
if wait_for "document.body.textContent.indexOf('Focus bell — study pass logged')>-1" 30; then
  PASS=$((PASS + 1)); echo "  PASS the off-hub toast carried the bell"
else
  FAIL=$((FAIL + 1)); echo "  FAIL off-hub toast"
fi
chk "toast: the note names the ledger pass" "document.body.textContent.indexOf('Study pass logged')>-1"
chk "toast: the icon politely steps aside while the toast is up" "document.querySelector('[data-pomodoro-float]').style.transform==='translateY(-104px)'"
agent-browser screenshot "$OUT/03-toast.png" >/dev/null 2>&1 || true

LEDGER=$(bun -e '
const { db } = await import("/home/z/my-project/src/lib/db.ts")
const u = await db.user.findUnique({ where: { email: "local@lockin.library" } })
const ev = await db.studyEvent.findFirst({ where: { userId: u.id, kind: "focus" }, orderBy: { createdAt: "desc" } })
const rows = await db.focusSession.findMany({ where: { userId: u.id } })
const t = await db.focusTask.findFirst({ where: { userId: u.id, title: "E2E floating task" } })
console.log(JSON.stringify({ hasEvent: !!ev, secs: ev?.secs, sessions: rows.length, pomos: t?.pomos, taskSecs: t?.focusSecs }))
await db.$disconnect()
' 2>/dev/null)
echo "ledger: $LEDGER"
if echo "$LEDGER" | grep -q '"hasEvent":true' && echo "$LEDGER" | grep -q '"sessions":2' && echo "$LEDGER" | grep -q '"pomos":1'; then
  PASS=$((PASS + 1)); echo "  PASS the ledger bridge wrote the study pass (2 sessions, 1 pomo on the task)"
else
  FAIL=$((FAIL + 1)); echo "  FAIL ledger bridge"
fi

echo "== quick controls: play/pause, ±minutes, skip — without leaving the page =="

seed_timer "{endsAt:Date.now()+90000,remainingMs:null,cycleFocus:2,phaseStartedAt:Date.now()-1410000}" >/dev/null 2>&1 || true
agent-browser open "$BASE/book/foundation-mathematics/lesson/fm-comparing-ordering-numbers" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2500 >/dev/null 2>&1 || true
ev "$TRAP" >/dev/null 2>&1 || true
agent-browser wait 1200 >/dev/null 2>&1 || true

ev "document.querySelector('[data-pomodoro-float]').dispatchEvent(new PointerEvent('pointerover',{bubbles:true}));'over'" >/dev/null 2>&1 || true
agent-browser wait 400 >/dev/null 2>&1 || true
chk "controls: the hover panel opened" "document.querySelector('[data-pomodoro-tooltip]').className.indexOf('opacity-100')>-1"
chk "controls: the play/pause control is offered" "(function(){var b=document.querySelector('[data-pomodoro-toggle]');return !!b&&b.getAttribute('aria-label')==='Pause the pomodoro'})()"
chk "controls: three step buttons with honest labels" "(function(){var bs=[].slice.call(document.querySelectorAll('[data-pomodoro-controls] [data-pomodoro-adjust]'));return bs.length===3&&bs[0].getAttribute('aria-label')==='Subtract one minute from the phase'&&bs[1].getAttribute('aria-label')==='Add one minute to the phase'&&bs[2].getAttribute('aria-label')==='Add five minutes to the phase'})()"
chk "controls: the skip control is offered" "document.querySelector('[data-pomodoro-skip]')!==null"

# +5 minutes — the end epoch and the tailored length both grow
ev "document.querySelector('[data-pomodoro-adjust=\"300000\"]').click();'plus5'" >/dev/null 2>&1 || true
agent-browser wait 700 >/dev/null 2>&1 || true
chk "adjust +5: the remainder grew ~5 min" "(function(){var l=Number(document.querySelector('[data-pomodoro-float] button').getAttribute('data-pomodoro-left'));return l>=330&&l<=400})()"
chk "adjust +5: the tooltip reads the tailored 30 min" "document.querySelector('[data-pomodoro-tooltip]').textContent.indexOf('of 30 min')>-1"
chk "adjust +5: the aria floors to the new minute count" "document.querySelector('[data-pomodoro-float] button').getAttribute('aria-label')==='Pomodoro: 6 minutes left in Focus'"
chk "adjust +5: the wall-clock end stamp kept up" "document.querySelector('[data-pomodoro-tooltip]').textContent.indexOf('ends')>-1"
agent-browser screenshot "$OUT/07-quick-controls.png" >/dev/null 2>&1 || true

# −1 minute — the tailored length shrinks too
ev "document.querySelector('[data-pomodoro-adjust=\"-60000\"]').click();'minus1'" >/dev/null 2>&1 || true
agent-browser wait 700 >/dev/null 2>&1 || true
chk "adjust −1: the remainder dropped ~1 min" "(function(){var l=Number(document.querySelector('[data-pomodoro-float] button').getAttribute('data-pomodoro-left'));return l>=270&&l<=345})()"
chk "adjust −1: the tooltip reads the tailored 29 min" "document.querySelector('[data-pomodoro-tooltip]').textContent.indexOf('of 29 min')>-1"

# pause keeps the remainder; +1 while paused adjusts the stored remainder
ev "document.querySelector('[data-pomodoro-toggle]').click();'paused'" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
chk "pause: the widget state is paused" "document.querySelector('[data-pomodoro-float]').getAttribute('data-pomodoro-state')==='paused'"
chk "pause: the aria names the paused phase" "document.querySelector('[data-pomodoro-float] button').getAttribute('aria-label').indexOf('Pomodoro paused — ')===0"
chk "pause: the tooltip says paused" "document.querySelector('[data-pomodoro-tooltip]').textContent.indexOf('paused')>-1"
ev "document.querySelector('[data-pomodoro-adjust=\"60000\"]').click();'plus1-paused'" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
chk "adjust while paused: the stored remainder grew" "(function(){var l=Number(document.querySelector('[data-pomodoro-float] button').getAttribute('data-pomodoro-left'));return l>=320&&l<=400})()"
chk "adjust while paused: the panel is still open (the bridge holds)" "document.querySelector('[data-pomodoro-tooltip]').className.indexOf('opacity-100')>-1"

# resume → running again, then skip arms the next phase
ev "document.querySelector('[data-pomodoro-toggle]').click();'resumed'" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
chk "resume: the widget state is running again" "document.querySelector('[data-pomodoro-float]').getAttribute('data-pomodoro-state')==='running'"
ev "document.querySelector('[data-pomodoro-skip]').click();'skipped'" >/dev/null 2>&1 || true
agent-browser wait 700 >/dev/null 2>&1 || true
chk "skip: the short break armed (the 3rd pomodoro never rang)" "document.querySelector('[data-pomodoro-float]').getAttribute('data-pomodoro-state')==='armed'&&document.querySelector('[data-pomodoro-float] button').getAttribute('aria-label')==='Pomodoro armed — 5 minutes of Short break ready'"
chk "skip: the cadence honestly stays 2/4 (a skipped bell never counts)" "document.querySelector('[data-pomodoro-tooltip]').textContent.indexOf('2/4 pomodoros')>-1"
chk "controls: no click navigated — still on the lesson page" "location.pathname==='/book/foundation-mathematics/lesson/fm-comparing-ordering-numbers'"
ev "document.querySelector('[data-pomodoro-float]').dispatchEvent(new PointerEvent('pointerout',{bubbles:true}));'out'" >/dev/null 2>&1 || true
agent-browser wait 400 >/dev/null 2>&1 || true
chk "controls: the panel closes on pointer-out" "document.querySelector('[data-pomodoro-tooltip]').className.indexOf('opacity-0')>-1"

# keyboard: the widget focus opens the panel, focus then moves INTO the
# controls (a control in the closed panel is not focusable — the panel must
# open first, exactly how Tab reaches the buttons for a real keyboard user)
ev "document.querySelector('[data-pomodoro-float] button').focus();'focus-widget'" >/dev/null 2>&1 || true
agent-browser wait 400 >/dev/null 2>&1 || true
chk "keyboard: the widget focus opens the panel" "document.querySelector('[data-pomodoro-tooltip]').className.indexOf('opacity-100')>-1"
ev "document.querySelector('[data-pomodoro-toggle]').focus();'focus-control'" >/dev/null 2>&1 || true
agent-browser wait 400 >/dev/null 2>&1 || true
chk "keyboard: focus moves into the controls — the panel stays open" "document.querySelector('[data-pomodoro-tooltip]').className.indexOf('opacity-100')>-1&&document.activeElement===document.querySelector('[data-pomodoro-toggle]')"
ev "document.querySelector('[data-pomodoro-toggle]').blur();'blur-control'" >/dev/null 2>&1 || true
agent-browser wait 400 >/dev/null 2>&1 || true
chk "keyboard: blurring the control closes the panel" "document.querySelector('[data-pomodoro-tooltip]').className.indexOf('opacity-0')>-1"

echo "== idle: the steps rest, the Start stays live — and starting runs in place =="

ev "localStorage.removeItem('lockin:focus-timer:v1');'timer-cleared-idle'" >/dev/null 2>&1 || true
agent-browser open "$BASE/" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2000 >/dev/null 2>&1 || true
ev "$TRAP" >/dev/null 2>&1 || true
ev "document.querySelector('[data-pomodoro-float]').dispatchEvent(new PointerEvent('pointerover',{bubbles:true}));'over'" >/dev/null 2>&1 || true
agent-browser wait 400 >/dev/null 2>&1 || true
chk "idle: the three steps rest disabled" "(function(){var bs=[].slice.call(document.querySelectorAll('[data-pomodoro-controls] [data-pomodoro-adjust]'));return bs.length===3&&bs.every(function(b){return b.disabled})})()"
chk "idle: skip rests disabled" "document.querySelector('[data-pomodoro-skip]').disabled===true"
chk "idle: the toggle offers a fresh focus block" "document.querySelector('[data-pomodoro-toggle]').getAttribute('aria-label')==='Start a focus block'"
ev "document.querySelector('[data-pomodoro-toggle]').click();'started'" >/dev/null 2>&1 || true
agent-browser wait 700 >/dev/null 2>&1 || true
chk "idle→start: the focus runs from the panel" "document.querySelector('[data-pomodoro-float]').getAttribute('data-pomodoro-state')==='running'"
chk "idle→start: the full 25 min armed" "(function(){var l=Number(document.querySelector('[data-pomodoro-float] button').getAttribute('data-pomodoro-left'));return l>=1480&&l<=1500})()"
chk "idle→start: still on the home page" "location.pathname==='/'"
ev "document.querySelector('[data-pomodoro-float]').dispatchEvent(new PointerEvent('pointerout',{bubbles:true}));'out'" >/dev/null 2>&1 || true
agent-browser wait 300 >/dev/null 2>&1 || true

echo "== drag: move, persist, clamp — and a drag never navigates =="

DRAG=$(ev "(function(){var b=document.querySelector('[data-pomodoro-float] button');var r=b.getBoundingClientRect();var cx=r.left+r.width/2,cy=r.top+r.height/2;b.dispatchEvent(new PointerEvent('pointerdown',{clientX:cx,clientY:cy,bubbles:true,pointerId:7,pointerType:'mouse',button:0,isPrimary:true}));b.dispatchEvent(new PointerEvent('pointermove',{clientX:cx+120,clientY:cy-90,bubbles:true,pointerId:7,pointerType:'mouse',isPrimary:true}));b.dispatchEvent(new PointerEvent('pointerup',{clientX:cx+120,clientY:cy-90,bubbles:true,pointerId:7,pointerType:'mouse',isPrimary:true}));return 'dragged'})()")
if [ "$DRAG" = "dragged" ]; then
  PASS=$((PASS + 1)); echo "  PASS the drag gestures dispatched"
else
  FAIL=$((FAIL + 1)); echo "  FAIL drag dispatch"
fi
chk "drag: the position applied" "(function(){var w=document.querySelector('[data-pomodoro-float]');return w.style.left!==''&&w.style.top!==''})()"
chk "drag: the position persisted" "(function(){var p=JSON.parse(localStorage.getItem('lockin:floating-pomodoro:v1'));return p&&p.state&&p.state.pos&&p.state.pos.x>0&&p.state.pos.y>0})()"
chk "drag: clamped inside the 1280x900 viewport" "(function(){var w=document.querySelector('[data-pomodoro-float]');var x=parseFloat(w.style.left),y=parseFloat(w.style.top);return x>=8&&x<=1280-48-8&&y>=8&&y<=900-48-8})()"
ev "document.querySelector('[data-pomodoro-float] button').click();'clicked'" >/dev/null 2>&1 || true
agent-browser wait 800 >/dev/null 2>&1 || true
chk "drag: the following click never navigated" "location.pathname==='/'"
# drag hard off-screen — clamped back to the header-safe corner (8, 80)
ev "(function(){var b=document.querySelector('[data-pomodoro-float] button');var r=b.getBoundingClientRect();var cx=r.left+r.width/2,cy=r.top+r.height/2;b.dispatchEvent(new PointerEvent('pointerdown',{clientX:cx,clientY:cy,bubbles:true,pointerId:8,pointerType:'mouse',button:0,isPrimary:true}));b.dispatchEvent(new PointerEvent('pointermove',{clientX:cx-3000,clientY:cy-3000,bubbles:true,pointerId:8,pointerType:'mouse',isPrimary:true}));b.dispatchEvent(new PointerEvent('pointerup',{clientX:cx-3000,clientY:cy-3000,bubbles:true,pointerId:8,pointerType:'mouse',isPrimary:true}));return 'far'})()" >/dev/null 2>&1 || true
chk "drag: off-screen clamps to the header-safe corner (8, 80)" "document.querySelector('[data-pomodoro-float]').style.left==='8px'&&document.querySelector('[data-pomodoro-float]').style.top==='80px'"
agent-browser screenshot "$OUT/04-dragged.png" >/dev/null 2>&1 || true
ev "document.querySelector('[data-pomodoro-float] button').click();'clicked'" >/dev/null 2>&1 || true
agent-browser wait 400 >/dev/null 2>&1 || true
ev "document.querySelector('[data-pomodoro-float] button').click();'clicked-again'" >/dev/null 2>&1 || true
if wait_for "location.pathname==='/focus'" 20; then
  PASS=$((PASS + 1)); echo "  PASS the icon still navigates after dragging (second click)"
else
  FAIL=$((FAIL + 1)); echo "  FAIL post-drag navigation"
fi
# park-free: clear the dragged spot so mobile + dark show the default corner
# (each clear lands AFTER a viewport change — a live-page resize would
# re-clamp the in-memory pos and re-persist it over the removal)

echo "== console errors + mobile 390 + dark =="

ERRORS=$(ev "window.__e2eErrors ? window.__e2eErrors.length : -1")
if [ "$ERRORS" = "0" ]; then
  PASS=$((PASS + 1)); echo "  PASS zero console errors"
else
  FAIL=$((FAIL + 1)); echo "  FAIL console errors: $ERRORS"
  ev "window.__e2eErrors && window.__e2eErrors.slice(0,5).join(' || ')" 2>/dev/null || true
fi

agent-browser set viewport 390 844 >/dev/null 2>&1 || true
ev "localStorage.removeItem('lockin:floating-pomodoro:v1');'pos-cleared-mobile'" >/dev/null 2>&1 || true
agent-browser open "$BASE/" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2500 >/dev/null 2>&1 || true
ev "$TRAP" >/dev/null 2>&1 || true
chk "mobile 390: no horizontal overflow" "document.documentElement.scrollWidth<=395"
chk "mobile 390: the icon renders at the default corner" "(function(){var w=document.querySelector('[data-pomodoro-float]');var r=w.getBoundingClientRect();return r.right<=395&&r.bottom<=844&&r.left>395-120&&r.top>844-120})()"
# the OPEN control panel fits the narrow screen too — hover it and measure
ev "document.querySelector('[data-pomodoro-float]').dispatchEvent(new PointerEvent('pointerover',{bubbles:true}));'over-mobile'" >/dev/null 2>&1 || true
agent-browser wait 400 >/dev/null 2>&1 || true
chk "mobile 390: the open panel never overflows" "document.documentElement.scrollWidth<=395"
chk "mobile 390: the open panel fits the viewport" "(function(){var r=document.querySelector('[data-pomodoro-tooltip]').getBoundingClientRect();return r.left>=0&&r.right<=395&&r.top>=0})()"
agent-browser screenshot "$OUT/08-mobile-panel-open.png" >/dev/null 2>&1 || true
ev "document.querySelector('[data-pomodoro-float]').dispatchEvent(new PointerEvent('pointerout',{bubbles:true}));'out-mobile'" >/dev/null 2>&1 || true
agent-browser wait 300 >/dev/null 2>&1 || true
agent-browser screenshot "$OUT/05-mobile.png" >/dev/null 2>&1 || true

agent-browser set viewport 1280 900 >/dev/null 2>&1 || true
ev "localStorage.removeItem('lockin:floating-pomodoro:v1');'pos-cleared-dark'" >/dev/null 2>&1 || true
ev "localStorage.setItem('theme','dark');'dark'" >/dev/null 2>&1 || true
agent-browser open "$BASE/" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2500 >/dev/null 2>&1 || true
ev "$TRAP" >/dev/null 2>&1 || true
chk "dark mode: the icon renders at the default corner" "document.documentElement.classList.contains('dark') && (function(){var r=document.querySelector('[data-pomodoro-float]').getBoundingClientRect();return r.left>1100&&r.top>700})()"
# the OPEN control panel rides dark mode too
ev "document.querySelector('[data-pomodoro-float]').dispatchEvent(new PointerEvent('pointerover',{bubbles:true}));'over-dark'" >/dev/null 2>&1 || true
agent-browser wait 400 >/dev/null 2>&1 || true
chk "dark mode: the open panel shows the controls" "document.querySelector('[data-pomodoro-controls]')!==null&&document.querySelector('[data-pomodoro-tooltip]').className.indexOf('opacity-100')>-1"
agent-browser screenshot "$OUT/09-dark-panel-open.png" >/dev/null 2>&1 || true
ev "document.querySelector('[data-pomodoro-float]').dispatchEvent(new PointerEvent('pointerout',{bubbles:true}));'out-dark'" >/dev/null 2>&1 || true
agent-browser wait 300 >/dev/null 2>&1 || true
agent-browser screenshot "$OUT/06-dark.png" >/dev/null 2>&1 || true
ev "localStorage.removeItem('theme');'light'" >/dev/null 2>&1 || true

echo "== cleanup =="

reset_all
ev "localStorage.removeItem('lockin:focus-timer:v1');localStorage.removeItem('lockin:floating-pomodoro:v1');'timer-cleared'" >/dev/null 2>&1 || true

echo ""
if [ "$FAIL" -gt 0 ]; then
  echo "e2e-floating-pomodoro: $PASS/$((PASS + FAIL)) checks FAILED ($FAIL failures)"
  exit 1
fi
echo "e2e-floating-pomodoro: $PASS/$((PASS + FAIL)) checks ALL GREEN"
exit 0

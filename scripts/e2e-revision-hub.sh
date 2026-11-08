#!/usr/bin/env bash
# e2e-revision-hub.sh — full-journey E2E for the Revision & Mastery system:
#
#   0. guest: /revision explainer (no wall), on-the-go chapter marking on a
#      book page falls back to the device-local store with an honest hint
#   1. register → server-backed marking on the book page (state chip, pass
#      counter, due badge, revise + undo actions)
#   2. lesson reader completion feeds the ledger (revision schedule line)
#   3. time-travel (direct ledger backdate) → autonomous prompts appear:
#      header due chip, library-home banner, Revision Hub queue with human
#      reasons, guided revision session with ratings (Again/Hard/Good/Easy)
#   4. knowledge graph renders (nodes/edges/hulls), node click opens the
#      detail panel with direct actions
#   5. insights: book standing, least-revised rankings, study log
#   6. undo/unmark returns the chapter to unstudied
#   7. console-error trap, mobile 390 viewport, dark mode, screenshots
#
# Uses agent-browser's snapshot-ref workflow (real CDP clicks). The dev
# server must be running on :3000 (started by the caller, per the
# nohup-per-command rule).
set -u
BASE=http://localhost:3000
OUT=/tmp/e2e-revision
mkdir -p "$OUT"
STAMP=$(date +%s)
EMAIL="e2e-rev+$STAMP@example.com"
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

echo "== DESKTOP 1280 — guest surfaces =="

agent-browser set viewport 1280 900 >/dev/null 2>&1 || true
agent-browser open "$BASE/revision" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2000 >/dev/null 2>&1 || true
ev "$TRAP" >/dev/null 2>&1 || true
# clear leftover device-local state from earlier runs (the browser profile persists)
ev "localStorage.clear();'cleared'" >/dev/null 2>&1 || true

chk "guest hub: Revision Hub heading" "[].slice.call(document.querySelectorAll('h1')).some(function(h){return h.textContent.indexOf('Revision Hub')>-1})"
chk "guest hub: honest explainer (spaced-repetition schedule)" "document.body.textContent.indexOf('spaced-repetition schedule')>-1"
chk "guest hub: sign-in CTA" "[].slice.call(document.querySelectorAll('a')).some(function(a){return a.textContent.indexOf('Sign in to start tracking')>-1})"
chk "guest hub: no fake data (no queue)" "document.body.textContent.indexOf('Your revision plan')===-1"

agent-browser open "$BASE/book/foundation-mathematics" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2500 >/dev/null 2>&1 || true

chk "book page: on-the-go Mark studied on chapters" "document.querySelectorAll('button').length>0 && [].slice.call(document.querySelectorAll('button')).filter(function(b){return b.textContent.indexOf('Mark studied')>-1}).length>=3"
clickref 'button "Mark studied"' >/dev/null
agent-browser wait 800 >/dev/null 2>&1 || true
chk "guest chapter mark lands on-device" "document.body.textContent.indexOf('Studied · this device')>-1"
chk "guest sees the sign-in sync hint" "document.body.textContent.indexOf('sign in to track revisions')>-1 || document.body.textContent.indexOf('sync')>-1"
agent-browser screenshot "$OUT/01-guest-book-mark.png" >/dev/null 2>&1 || true

echo "== DESKTOP 1280 — registered journey =="

# ---- register -----------------------------------------------------------
agent-browser open "$BASE/signin?next=/revision" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2000 >/dev/null 2>&1 || true
ev "$TRAP" >/dev/null 2>&1 || true
clickref 'tab "Create account"' >/dev/null
agent-browser wait 700 >/dev/null 2>&1 || true
agent-browser fill "#name" "Revision E2E" >/dev/null 2>&1 || true
agent-browser fill "#email" "$EMAIL" >/dev/null 2>&1 || true
agent-browser fill "#password" "e2e-revision-pass-1" >/dev/null 2>&1 || true
clickref 'button "Create account"' >/dev/null 2>&1 || true
if wait_for "[].slice.call(document.querySelectorAll('h1')).some(function(h){return h.textContent.indexOf('Revision Hub')>-1})" 40; then
  PASS=$((PASS + 1)); echo "  PASS register redirects into the hub"
else
  FAIL=$((FAIL + 1)); echo "  FAIL register redirect"
fi

chk "hub: empty-state guidance for a fresh account" "document.body.textContent.indexOf('Nothing tracked yet')>-1 || document.body.textContent.indexOf('Mark chapters as studied')>-1"
chk "hub: onboarding stats render (Chapters studied tile)" "document.body.textContent.indexOf('Chapters studied')>-1 && document.body.textContent.indexOf('Average mastery')>-1"
agent-browser screenshot "$OUT/02-hub-empty.png" >/dev/null 2>&1 || true

# ---- server-backed marking on the book page ------------------------------
agent-browser open "$BASE/book/foundation-mathematics" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2500 >/dev/null 2>&1 || true

clickref 'button "Mark studied"' >/dev/null
if wait_for "document.body.textContent.indexOf('×1')>-1" 30; then
  PASS=$((PASS + 1)); echo "  PASS chapter marked into the server ledger (pass counter)"
else
  FAIL=$((FAIL + 1)); echo "  FAIL server-backed chapter mark"
fi
chk "chapter state chip appears (Familiar)" "document.body.textContent.indexOf('Familiar')>-1"
chk "due badge shows the schedule" "document.body.textContent.indexOf('Due')>-1"
chk "quick revise action present" "[].slice.call(document.querySelectorAll('button')).some(function(b){return b.textContent.indexOf('Revise')>-1})"
chk "Revision Hub link on the book hero" "[].slice.call(document.querySelectorAll('a[href=\"/revision\"]')).length>0"
agent-browser screenshot "$OUT/03-book-marked.png" >/dev/null 2>&1 || true

# ---- lesson reader completion feeds the ledger ---------------------------
agent-browser open "$BASE/book/foundation-mathematics/lesson/fm-numbers-digits-place-value" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2500 >/dev/null 2>&1 || true
ev "$TRAP" >/dev/null 2>&1 || true

clickref 'button "Mark lesson complete"' >/dev/null
if wait_for "document.body.textContent.indexOf('next revision')>-1" 30; then
  PASS=$((PASS + 1)); echo "  PASS lesson completion shows the revision schedule line"
else
  FAIL=$((FAIL + 1)); echo "  FAIL lesson ledger line"
fi
chk "schedule line shows pass and mastery" "document.body.textContent.indexOf('Revision pass 1')>-1 && document.body.textContent.indexOf('mastery')>-1"
chk "log-revision quick action present" "[].slice.call(document.querySelectorAll('button')).some(function(b){return b.textContent.indexOf('Log revision now')>-1})"

# ---- time travel: backdate the ledger (simulating elapsed time) ----------
EMAIL="$EMAIL" bun -e '
const { db } = await import("/home/z/my-project/src/lib/db.ts")
const u = await db.user.findUnique({ where: { email: process.env.EMAIL } })
const n = await db.studyEntry.updateMany({
  where: { userId: u.id },
  data: { dueAt: new Date(Date.now() - 40 * 86400000), lastAt: new Date(Date.now() - 48 * 86400000), intervalDays: 7 },
})
console.log("backdated entries:", n.count)
await db.$disconnect()
' 2>/dev/null

# ---- autonomous prompts appear ------------------------------------------
agent-browser open "$BASE/" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2500 >/dev/null 2>&1 || true
ev "$TRAP" >/dev/null 2>&1 || true
if wait_for "[].slice.call(document.querySelectorAll('a[href=\"/revision\"]')).some(function(a){return (a.title||'').indexOf('due for revision')>-1})" 30; then
  PASS=$((PASS + 1)); echo "  PASS header due chip appears after items go overdue"
else
  FAIL=$((FAIL + 1)); echo "  FAIL header due chip"
fi
if wait_for "document.body.textContent.indexOf('due for revision')>-1 && document.body.textContent.indexOf('Revise now')>-1" 30; then
  PASS=$((PASS + 1)); echo "  PASS library-home revision banner"
else
  FAIL=$((FAIL + 1)); echo "  FAIL home banner"
fi
agent-browser screenshot "$OUT/04-home-banner.png" >/dev/null 2>&1 || true

# ---- the hub with a live queue -------------------------------------------
agent-browser open "$BASE/revision" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 3000 >/dev/null 2>&1 || true
ev "$TRAP" >/dev/null 2>&1 || true

if wait_for "document.body.textContent.indexOf('What to revise next')>-1" 40; then
  PASS=$((PASS + 1)); echo "  PASS revision queue appears"
else
  FAIL=$((FAIL + 1)); echo "  FAIL queue"
fi
chk "queue explains WHY (Due … days ago)" "(function(){var m=document.body.textContent.match(/Due [0-9]+ days? ago/);return !!m})()"
chk "Due now tile counts the overdue items" "(function(){return [].slice.call(document.querySelectorAll('div')).some(function(d){if(d.textContent.indexOf('Due now')===-1)return false;var p=d.querySelector('p');return !!p&&parseInt(p.textContent,10)>=1})})()"
chk "activity calendar rendered (squares)" "document.querySelectorAll('[role=img][aria-label*=activity]').length>0 || document.querySelectorAll('.bg-emerald-500\\/40').length>0 || document.querySelectorAll('[title*=study event]').length>0"
chk "mastery distribution present" "document.body.textContent.indexOf('Mastered')>-1 && document.body.textContent.indexOf('Learning')>-1"
chk "least-revised callout present" "document.body.textContent.indexOf('Needs your attention')>-1"
agent-browser screenshot "$OUT/05-hub-queue.png" >/dev/null 2>&1 || true

# ---- the guided revision session ------------------------------------------
clickref 'Start revision session' >/dev/null
if wait_for "document.body.textContent.indexOf('Why revise this now')>-1" 30; then
  PASS=$((PASS + 1)); echo "  PASS session opens with the reason panel"
else
  FAIL=$((FAIL + 1)); echo "  FAIL session open"
fi
chk "session shows the overdue facts" "document.body.textContent.indexOf('Overdue by')>-1"
chk "four rating buttons" "(function(){var b=[].slice.call(document.querySelectorAll('button')).map(function(x){return x.textContent});return ['Again','Hard','Good','Easy'].every(function(r){return b.some(function(t){return t.indexOf(r)>-1})})})()"
agent-browser screenshot "$OUT/06-session-open.png" >/dev/null 2>&1 || true

# skip first: no write, straight to the summary
clickref 'button "Skip"' >/dev/null
if wait_for "document.body.textContent.indexOf('Session complete')>-1 && document.body.textContent.indexOf('1 skipped')>-1" 20; then
  PASS=$((PASS + 1)); echo "  PASS skip advances without writing"
else
  FAIL=$((FAIL + 1)); echo "  FAIL skip flow"
fi

# restart on demand and rate for real
clickref 'Run the session again' >/dev/null
if wait_for "document.body.textContent.indexOf('Why revise this now')>-1" 20; then
  PASS=$((PASS + 1)); echo "  PASS session restarts on demand"
else
  FAIL=$((FAIL + 1)); echo "  FAIL session restart"
fi
clickref 'button "Good' >/dev/null
agent-browser wait 1200 >/dev/null 2>&1 || true
if wait_for "document.body.textContent.indexOf('Session complete')>-1 && document.body.textContent.indexOf('1 revision logged')>-1" 30; then
  PASS=$((PASS + 1)); echo "  PASS rating (Good) logs the revision and completes the session"
else
  FAIL=$((FAIL + 1)); echo "  FAIL rating flow"
fi
agent-browser screenshot "$OUT/06-session-complete.png" >/dev/null 2>&1 || true
clickref 'Back to the hub' >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true

# ---- the knowledge graph ---------------------------------------------------
clickref 'tab "Knowledge graph"' >/dev/null
if wait_for "document.querySelectorAll('svg[role=img]').length>0" 40; then
  PASS=$((PASS + 1)); echo "  PASS knowledge graph svg renders"
else
  FAIL=$((FAIL + 1)); echo "  FAIL graph render"
fi
chk "graph has ~100 lesson nodes" "(function(){var c=document.querySelectorAll('svg circle').length;return c>90})()"
chk "graph stats text (prerequisite links)" "document.body.textContent.indexOf('prerequisite links')>-1"
chk "graph toolbar: book + mastery filters" "document.body.textContent.indexOf('All books')>-1 && document.body.textContent.indexOf('All states')>-1"
chk "legend present" "document.body.textContent.indexOf('concept bridge')>-1 && document.body.textContent.indexOf('overdue')>-1"
# click the first lesson node (React synthetic click through the DOM)
ev "[].slice.call(document.querySelectorAll('svg g[class*=cursor-pointer]'))[0].dispatchEvent(new MouseEvent('click',{bubbles:true}));'clicked'" >/dev/null 2>&1 || true
agent-browser wait 800 >/dev/null 2>&1 || true
if wait_for "document.body.textContent.indexOf('Open lesson')>-1" 20; then
  PASS=$((PASS + 1)); echo "  PASS node click opens the detail panel"
else
  FAIL=$((FAIL + 1)); echo "  FAIL node detail panel"
fi
chk "detail panel shows concepts" "document.body.textContent.indexOf('Concepts')>-1"
agent-browser screenshot "$OUT/06-knowledge-graph.png" >/dev/null 2>&1 || true

# ---- insights ----------------------------------------------------------------
clickref 'tab "Insights"' >/dev/null
if wait_for "document.body.textContent.indexOf('Standing by book')>-1" 30; then
  PASS=$((PASS + 1)); echo "  PASS insights: book standing"
else
  FAIL=$((FAIL + 1)); echo "  FAIL insights tab"
fi
chk "least revised chapters ranking" "document.body.textContent.indexOf('Least revised chapters')>-1"
chk "study log lists events" "document.body.textContent.indexOf('Study log')>-1 && document.body.textContent.indexOf('revision')>-1"
chk "explainer: how these numbers work" "document.body.textContent.indexOf('How these numbers work')>-1"
agent-browser screenshot "$OUT/07-insights.png" >/dev/null 2>&1 || true

# ---- undo: unmark returns the chapter to unstudied ----------------------------
agent-browser open "$BASE/book/foundation-mathematics" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2500 >/dev/null 2>&1 || true
ev "$TRAP" >/dev/null 2>&1 || true
if wait_for "[].slice.call(document.querySelectorAll('span')).some(function(s){return /^×[0-9]+$/.test(s.textContent)})" 30; then
  PASS=$((PASS + 1)); echo "  PASS chapter state rendered before undo (pass counter)"
else
  FAIL=$((FAIL + 1)); echo "  FAIL chapter state before undo"
fi
clickref 'Undo mark as studied' >/dev/null
if wait_for "[].slice.call(document.querySelectorAll('span')).every(function(s){return !/^×[0-9]+$/.test(s.textContent)})" 30; then
  PASS=$((PASS + 1)); echo "  PASS unmark removes the chapter state (counter gone)"
else
  FAIL=$((FAIL + 1)); echo "  FAIL unmark state removal"
fi
chk "unmark returns Mark studied" "[].slice.call(document.querySelectorAll('button')).some(function(b){return b.textContent.indexOf('Mark studied')>-1})"

# ---- console errors + mobile + dark --------------------------------------------
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
agent-browser wait 3000 >/dev/null 2>&1 || true
chk "mobile 390: no horizontal overflow" "document.documentElement.scrollWidth<=395"
agent-browser screenshot "$OUT/08-mobile-hub.png" >/dev/null 2>&1 || true

agent-browser set viewport 1280 900 >/dev/null 2>&1 || true
ev "localStorage.setItem('theme','dark');'dark'" >/dev/null 2>&1 || true
agent-browser open "$BASE/revision" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2500 >/dev/null 2>&1 || true
ev "$TRAP" >/dev/null 2>&1 || true
agent-browser wait 2500 >/dev/null 2>&1 || true
chk "dark mode renders the hub" "document.documentElement.classList.contains('dark') && document.querySelectorAll('h1,h2').length>0"
agent-browser screenshot "$OUT/09-dark-hub.png" >/dev/null 2>&1 || true
ev "localStorage.removeItem('theme');'light'" >/dev/null 2>&1 || true

# ---- cleanup ----------------------------------------------------------------
EMAIL="$EMAIL" bun -e '
const { db } = await import("/home/z/my-project/src/lib/db.ts")
await db.user.deleteMany({ where: { email: process.env.EMAIL } })
await db.$disconnect()
' 2>/dev/null

echo ""
if [ "$FAIL" -gt 0 ]; then
  echo "e2e-revision-hub: $PASS/$((PASS + FAIL)) checks FAILED ($FAIL failures)"
  exit 1
fi
echo "e2e-revision-hub: $PASS/$((PASS + FAIL)) checks ALL GREEN"
exit 0

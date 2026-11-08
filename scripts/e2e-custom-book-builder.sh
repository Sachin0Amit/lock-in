#!/usr/bin/env bash
# e2e-custom-book-builder.sh — full-journey E2E for the Custom Book Builder:
# register → build from a pasted topic list → honest review (missing topics
# reported) → curate + reorder → publish → coverage report → reader (KaTeX,
# progress, bookmarks, notes, prev/next) → bookshelf → delete. Desktop 1280 +
# mobile 390 + dark mode; console-error trap; screenshots.
#
# Uses agent-browser's snapshot-ref workflow (real CDP clicks — Radix
# components need genuine pointer events) with CSS fills for inputs.
set -u
BASE=http://localhost:3000
OUT=/tmp/e2e-cbb
mkdir -p "$OUT"
STAMP=$(date +%s)
EMAIL="e2e+$STAMP@example.com"
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

# click a snapshot ref by grepping the interactive snapshot (real click)
clickref() { # $1 grep pattern on the snapshot line, $2 occurrence (default 1)
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

echo "== DESKTOP 1280 — full journey =="

# ---- 1. register ---------------------------------------------------------
agent-browser set viewport 1280 900 >/dev/null 2>&1 || true
agent-browser open "$BASE/signin" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2500 >/dev/null 2>&1 || true
ev "$TRAP" >/dev/null 2>&1 || true

chk "signin page offers account creation" "[].slice.call(document.querySelectorAll('[role=tab]')).some(function(t){return t.textContent.indexOf('Create account')>-1})"
clickref 'tab "Create account"' >/dev/null
agent-browser wait 700 >/dev/null 2>&1 || true
chk "register form shows the name field" "!!document.getElementById('name')"
agent-browser fill "#name" "E2E Tester" >/dev/null 2>&1 || true
agent-browser fill "#email" "$EMAIL" >/dev/null 2>&1 || true
agent-browser fill "#password" "e2e-password-123" >/dev/null 2>&1 || true
clickref 'button "Create account"' >/dev/null
if wait_for "location.pathname==='/my-books'" 40; then
  PASS=$((PASS + 1)); echo "  PASS registration redirects to /my-books"
else
  FAIL=$((FAIL + 1)); echo "  FAIL registration redirect (at $(ev 'location.pathname'))"
fi
chk "empty bookshelf state" "document.body.textContent.indexOf('Your shelf is empty')>-1"

# ---- 2. builder landing --------------------------------------------------
clickref "Build your first book" >/dev/null
if wait_for "location.pathname==='/builder'" 30; then
  PASS=$((PASS + 1)); echo "  PASS empty state links to the builder"
else
  FAIL=$((FAIL + 1)); echo "  FAIL navigate to builder"
fi
chk "heading: Build Your Own Book" "[].slice.call(document.querySelectorAll('h1')).some(function(h){return h.textContent.indexOf('Build Your Own Book')>-1})"
chk "subtitle mentions the Academic Library" "document.body.textContent.indexOf('Academic Library')>-1"
chk "five creation methods offered" "(function(){var t=document.body.textContent;return ['Method 1','Method 2','Method 3','Method 4','Method 5'].every(function(m){return t.indexOf(m)>-1})})()"

# ---- 3. method 3: topic list ----------------------------------------------
clickref 'button "Start"' 3 >/dev/null
agent-browser wait 1000 >/dev/null 2>&1 || true
chk "method-3 input step with topic editor" "!!document.getElementById('topics')"

TOPICS='Chapter 1: Number Basics\n1. Greatest Common Divisor\nChapter 2: Equations\n2. Solving Linear Equations\nChapter 3: Beyond the library\n3. CPU Scheduling'
ev "window.__set=function(id,v){var el=document.getElementById(id);if(!el)return 'missing:'+id;var proto=el.tagName==='TEXTAREA'?window.HTMLTextAreaElement.prototype:window.HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(el,v);el.dispatchEvent(new Event('input',{bubbles:true}));return 'ok'};window.__set('topics','$TOPICS')" >/dev/null 2>&1 || true
chk "live parse preview appears" "document.body.textContent.indexOf('Parsed structure')>-1"
clickref 'button "Search the Main Library"' >/dev/null
if wait_for "document.body.textContent.indexOf('Review the library matches')>-1" 40; then
  PASS=$((PASS + 1)); echo "  PASS review step reached"
else
  FAIL=$((FAIL + 1)); echo "  FAIL review step"
fi

# ---- 4. honest review ------------------------------------------------------
chk "missing topics marked 'Not in Main Library' (>=2)" "(document.body.textContent.split('Not in Main Library').length-1)>=2"
chk "matched topic shows library location" "document.body.textContent.indexOf('Foundation Mathematics')>-1"
chk "prerequisites surfaced" "document.body.textContent.indexOf('rerequisites available in the library')>-1"
chk "coverage counts shown" "(function(){var t=document.body.textContent;return t.indexOf('not available')>-1 && t.indexOf('requested')>-1})()"

# ---- 5. curate + reorder ---------------------------------------------------
clickref 'button "Curate the table of contents"' >/dev/null
if wait_for "document.body.textContent.indexOf('Curate your book')>-1" 30; then
  PASS=$((PASS + 1)); echo "  PASS curate step reached"
else
  FAIL=$((FAIL + 1)); echo "  FAIL curate step"
fi
BEFORE=$(ev "JSON.stringify([].slice.call(document.querySelectorAll('input[aria-label]')).filter(function(i){return i.getAttribute('aria-label').indexOf('Title of chapter')===0}).map(function(i){return i.value}))")
chk "two chapters in the TOC" "document.querySelectorAll('section[aria-label^=\"Chapter \"]').length===2"
clickref 'button "Move chapter up"' 2 >/dev/null
agent-browser wait 700 >/dev/null 2>&1 || true
AFTER=$(ev "JSON.stringify([].slice.call(document.querySelectorAll('input[aria-label]')).filter(function(i){return i.getAttribute('aria-label').indexOf('Title of chapter')===0}).map(function(i){return i.value}))")
if [ "$BEFORE" != "$AFTER" ] && [ -n "$BEFORE" ] && [ "$BEFORE" != "null" ] && [ "$BEFORE" != "[]" ]; then
  PASS=$((PASS + 1)); echo "  PASS chapter reorder works ($BEFORE -> $AFTER)"
else
  FAIL=$((FAIL + 1)); echo "  FAIL chapter reorder ($BEFORE vs $AFTER)"
fi
chk "summary rail with coverage of request" "document.body.textContent.indexOf('Coverage of your request')>-1"

# ---- 6. publish -------------------------------------------------------------
clickref 'button "Publish to My Custom Books"' >/dev/null
if wait_for "/^\/my-books\/[^\/]+$/.test(location.pathname)" 40; then
  PASS=$((PASS + 1)); echo "  PASS published → book detail page"
else
  FAIL=$((FAIL + 1)); echo "  FAIL publish (at $(ev 'location.pathname'))"
fi
chk "detail shows coverage tab" "[].slice.call(document.querySelectorAll('[role=tab]')).some(function(t){return t.textContent.indexOf('Coverage report')>-1})"
clickref 'tab "Coverage report"' >/dev/null
agent-browser wait 900 >/dev/null 2>&1 || true
chk "coverage report lists the missing topic" "document.body.textContent.indexOf('CPU Scheduling')>-1"
chk "coverage report is honest about gaps" "document.body.textContent.indexOf('does not fully cover')>-1"
chk "coverage percent below 100" "(function(){var m=document.body.textContent.match(/([0-9]+(\.[0-9]+)?)%\s*coverage/);return !!m && parseFloat(m[1])<100})()"

# ---- 7. reader ---------------------------------------------------------------
clickref 'link "Read the book"' >/dev/null
if wait_for "location.pathname.indexOf('/read')>-1 && document.querySelectorAll('.lesson-body .katex').length>0" 60; then
  PASS=$((PASS + 1)); echo "  PASS reader opened with rendered content"
else
  FAIL=$((FAIL + 1)); echo "  FAIL reader (at $(ev 'location.pathname'))"
fi
PREV=""
for _ in 1 2 3 4 5 6 7 8 9 10 11 12; do
  CUR=$(ev "document.querySelectorAll('.lesson-body .katex').length" 2>/dev/null)
  if [ -n "$CUR" ] && [ "$CUR" = "$PREV" ]; then break; fi
  PREV="$CUR"
  agent-browser wait 800 >/dev/null 2>&1 || true
done
chk "KaTeX typeset content (>=30 nodes)" "document.querySelectorAll('.lesson-body .katex').length>=30"
chk "no KaTeX errors" "document.querySelectorAll('.katex-error').length===0"
chk "reader sidebar with progress" "document.body.textContent.indexOf('Reading progress')>-1"
chk "font size controls present" "!!document.querySelector('[aria-label=\"Larger text\"]')"
chk "in-book search present" "!!document.querySelector('[aria-label=\"Search within this book\"]')"

clickref 'button "Mark topic complete"' >/dev/null
if wait_for "document.body.textContent.indexOf('Completed — tap to undo')>-1" 20; then
  PASS=$((PASS + 1)); echo "  PASS mark complete"
else
  FAIL=$((FAIL + 1)); echo "  FAIL mark complete"
fi
agent-browser wait 900 >/dev/null 2>&1 || true
chk "progress bar reflects completion (1/3)" "document.body.textContent.indexOf('1/3')>-1"
clickref 'button "Bookmark this topic"' >/dev/null
agent-browser wait 800 >/dev/null 2>&1 || true
chk "bookmark toggles" "!!document.querySelector('[aria-label=\"Remove bookmark\"]')"
clickref 'button "Notes"' >/dev/null
agent-browser wait 1000 >/dev/null 2>&1 || true
ev "(function(){var el=document.querySelector('textarea[aria-label=\"New note\"]');if(!el)return 'missing';Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype,'value').set.call(el,'Balance principle is key.');el.dispatchEvent(new Event('input',{bubbles:true}));return 'ok'})()" >/dev/null 2>&1 || true
clickref 'button "Save note"' >/dev/null
if wait_for "document.body.textContent.indexOf('Balance principle is key.')>-1" 20; then
  PASS=$((PASS + 1)); echo "  PASS note saved and listed"
else
  FAIL=$((FAIL + 1)); echo "  FAIL note"
fi
agent-browser press Escape >/dev/null 2>&1 || true
agent-browser wait 900 >/dev/null 2>&1 || true

BEFORE_LESSON=$(ev "(document.querySelector('[aria-live=polite]')||{}).textContent||''")
agent-browser press ArrowRight >/dev/null 2>&1 || true
if wait_for "(document.querySelector('[aria-live=polite]')||{}).textContent!=='' && (document.querySelector('[aria-live=polite]')||{}).textContent!=='$BEFORE_LESSON' && document.querySelectorAll('.lesson-body .katex').length>0" 60; then
  PASS=$((PASS + 1)); echo "  PASS next-topic navigation (keyboard →)"
else
  FAIL=$((FAIL + 1)); echo "  FAIL next-topic navigation"
fi
chk "no horizontal overflow (desktop reader)" "document.documentElement.scrollWidth<=window.innerWidth+1"
agent-browser screenshot "$OUT/reader-desktop.png" >/dev/null 2>&1 || true

# ---- 8. mobile reader overflow ----------------------------------------------
agent-browser set viewport 390 844 >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
chk "no horizontal overflow (mobile reader)" "document.documentElement.scrollWidth<=window.innerWidth+1"
agent-browser screenshot "$OUT/reader-mobile.png" >/dev/null 2>&1 || true
agent-browser set viewport 1280 900 >/dev/null 2>&1 || true
agent-browser wait 800 >/dev/null 2>&1 || true

# ---- 9. bookshelf + delete ---------------------------------------------------
clickref 'link "My Custom Books"' >/dev/null
if ! wait_for "location.pathname==='/my-books' && document.body.textContent.indexOf('Continue reading')>-1" 30; then
  # fallback: synthetic click on the breadcrumb link (plain Next Link)
  ev "(document.querySelector('a[href=\"/my-books\"]')||{}).click && document.querySelector('a[href=\"/my-books\"]').click(); 'fallback'" >/dev/null 2>&1 || true
fi
if wait_for "location.pathname==='/my-books' && document.body.textContent.indexOf('Continue reading')>-1" 40; then
  PASS=$((PASS + 1)); echo "  PASS bookshelf shows the book with reading state"
else
  FAIL=$((FAIL + 1)); echo "  FAIL bookshelf (at $(ev 'location.pathname'))"
fi
chk "shelf shows missing-coverage badge" "document.body.textContent.indexOf('missing')>-1"
chk "shelf shows reading progress" "(function(){var t=document.body.textContent;return t.indexOf('Reading')>-1 && t.indexOf('%')>-1})()"
clickref 'button "Actions for My custom book"' >/dev/null
if ! wait_for "document.querySelectorAll('[role=menuitem]').length>0" 20; then
  clickref 'button "Actions for My custom book"' >/dev/null
fi
wait_for "document.querySelectorAll('[role=menuitem]').length>0" 20 || true
agent-browser wait 600 >/dev/null 2>&1 || true
clickref 'menuitem "Delete…"' || echo "    (delete menuitem not found)"
agent-browser wait 900 >/dev/null 2>&1 || true
chk "delete dialog warns honestly" "(function(){var d=document.querySelector('[role=alertdialog]')||document.body;return d.textContent.indexOf('Main Academic Library is never affected')>-1})()"
clickref 'button "Delete custom book"' || echo "    (delete button not found)"
if wait_for "document.body.textContent.indexOf('Your shelf is empty')>-1" 40; then
  PASS=$((PASS + 1)); echo "  PASS delete → empty shelf"
else
  FAIL=$((FAIL + 1)); echo "  FAIL delete"
fi

# ---- 10. console errors over the whole SPA journey ---------------------------
chk "console errors 0 across the journey" "(window.__e2eErrors||[]).length===0"
ERRS=$(ev "(window.__e2eErrors||[]).slice(0,5).join(' | ')")
if [ -n "$ERRS" ] && [ "$ERRS" != " | " ]; then echo "    errors: $ERRS"; fi

# ---- 11. mobile landing checks ------------------------------------------------
echo "== MOBILE 390 =="
agent-browser set viewport 390 844 >/dev/null 2>&1 || true
agent-browser open "$BASE/builder" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2500 >/dev/null 2>&1 || true
ev "$TRAP" >/dev/null 2>&1 || true
chk "mobile builder heading" "[].slice.call(document.querySelectorAll('h1')).some(function(h){return h.textContent.indexOf('Build Your Own Book')>-1})"
chk "no horizontal overflow (mobile builder)" "document.documentElement.scrollWidth<=window.innerWidth+1"
agent-browser screenshot "$OUT/builder-mobile.png" >/dev/null 2>&1 || true
agent-browser open "$BASE/my-books" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2500 >/dev/null 2>&1 || true
chk "mobile bookshelf renders (signed in)" "[].slice.call(document.querySelectorAll('h1')).some(function(h){return h.textContent.indexOf('My Custom Books')>-1})"
chk "no horizontal overflow (mobile bookshelf)" "document.documentElement.scrollWidth<=window.innerWidth+1"
chk "mobile console errors 0" "(window.__e2eErrors||[]).length===0"

# ---- 12. dark mode -------------------------------------------------------------
echo "== DARK MODE (1280) =="
agent-browser set viewport 1280 900 >/dev/null 2>&1 || true
agent-browser open "$BASE/builder" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2000 >/dev/null 2>&1 || true
agent-browser eval "document.documentElement.classList.add('dark');'dark-on'" >/dev/null 2>&1 || true
agent-browser wait 1200 >/dev/null 2>&1 || true
agent-browser screenshot "$OUT/builder-dark.png" >/dev/null 2>&1 || true
chk "dark mode applied" "document.documentElement.classList.contains('dark')"
agent-browser eval "document.documentElement.classList.remove('dark');'dark-off'" >/dev/null 2>&1 || true

# ---- cleanup test account -------------------------------------------------------
cd /home/z/my-project && bun --eval 'const{PrismaClient}=require("@prisma/client");const db=new PrismaClient();db.user.deleteMany({where:{email:{contains:"e2e+"}}}).then(function(r){console.log("cleaned "+r.count+" e2e users");return db.$disconnect()}).catch(function(){return db.$disconnect()})' >/dev/null 2>&1 || true

echo ""
echo "e2e-custom-book-builder: $PASS passed, $FAIL failed"
if [ "$FAIL" -gt 0 ]; then exit 1; fi
echo "DONE e2e-custom-book-builder"

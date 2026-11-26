#!/bin/bash
# run9_recap.sh — the 2 compile-wall VLM sweep re-captures, done right:
# navigate FIRST, wait for KaTeX settle, expand solutions, THEN apply the
# theme class, then full-page capture (--full). One-invocation server guard
# (the sandbox reaps the dev server between tool calls).
set -u
BASE=http://localhost:3000/book/computer-fundamentals/lesson
OUT=/tmp/run9/probe
mkdir -p "$OUT"

if ! curl -s -o /dev/null http://localhost:3000/ 2>/dev/null; then
  cd /home/z/my-project
  setsid nohup bun run dev > dev.log 2>&1 < /dev/null &
  for i in $(seq 1 30); do
    sleep 2
    curl -s -o /dev/null http://localhost:3000/ 2>/dev/null && break
  done
fi

settle () {  # $1 = slug
  agent-browser open "$BASE/$1" >/dev/null 2>&1 || true
  agent-browser wait --load networkidle >/dev/null 2>&1 || true
  agent-browser wait 3000 >/dev/null 2>&1 || true
  local LOC PREV CUR
  LOC=$(agent-browser eval "location.pathname" 2>/dev/null | tr -d '"' || true)
  case "$LOC" in *"$1") ;; *) agent-browser eval "location.assign('$BASE/$1');'nav'" >/dev/null 2>&1 || true
    agent-browser wait --load networkidle >/dev/null 2>&1 || true
    agent-browser wait 3000 >/dev/null 2>&1 || true ;; esac
  # body must be REAL before the katex-stability loop can mean anything
  for _ in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15; do
    CUR=$(agent-browser eval "var b=document.querySelector('.lesson-body'); JSON.stringify({k: document.querySelectorAll('.lesson-body .katex').length, l: b ? b.textContent.length : 0})" 2>/dev/null | tr -d '"' || true)
    case "$CUR" in *'"l":0'*|*'"l":,'*|"") agent-browser wait 2000 >/dev/null 2>&1 || true; continue ;; esac
    break
  done
  PREV=""
  for _ in 1 2 3 4 5 6 7 8 9 10 11 12; do
    CUR=$(agent-browser eval "document.querySelectorAll('.lesson-body .katex').length" 2>/dev/null | tr -d '"' || true)
    if [ -n "$CUR" ] && [ "$CUR" = "$PREV" ]; then break; fi
    PREV="$CUR"
    agent-browser wait 900 >/dev/null 2>&1 || true
  done
}

expand () {
  agent-browser eval "Array.from(document.querySelectorAll('button')).filter(function(b){return /show solution/i.test(b.textContent||'')}).forEach(function(b){b.click()}); 'expanded'" >/dev/null 2>&1 || true
  agent-browser wait 1200 >/dev/null 2>&1 || true
}

echo "== re-capture 1: cf-text-images-and-sound-as-bits LIGHT full-page =="
agent-browser set viewport 1280 900 >/dev/null 2>&1 || true
settle cf-text-images-and-sound-as-bits
expand
agent-browser eval "document.documentElement.classList.remove('dark');'light'" >/dev/null 2>&1 || true
agent-browser wait 1200 >/dev/null 2>&1 || true
agent-browser screenshot --full "$OUT/cf-text-images-and-sound-as-bits.light.png" >/dev/null 2>&1 || true
ls -la "$OUT/cf-text-images-and-sound-as-bits.light.png"

echo "== re-capture 2: cf-codes-ascii-unicode-and-bcd DARK full-page =="
settle cf-codes-ascii-unicode-and-bcd
expand
agent-browser eval "document.documentElement.classList.add('dark');'dark-on'" >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
agent-browser eval "JSON.stringify({dark: document.documentElement.classList.contains('dark'), bg: getComputedStyle(document.body).backgroundColor})" 2>/dev/null
agent-browser screenshot --full "$OUT/cf-codes-ascii-unicode-and-bcd.dark.png" >/dev/null 2>&1 || true
ls -la "$OUT/cf-codes-ascii-unicode-and-bcd.dark.png"
agent-browser eval "document.documentElement.classList.remove('dark');'dark-off'" >/dev/null 2>&1 || true
echo "DONE run9_recap"

#!/usr/bin/env bash
# e2e-practice-sections.sh — E2E for the sectioned CBT exam upgrade:
# JEE Section A/B (MCQ + numerical type-in), CAT calculator + TITA,
# per-section palette/submit modal/results, sitting autosave + resume,
# mobile 390px. Desktop 1280 first, then mobile.
# NOTE: all tab queries are scoped to the exam overlay (the underlying
# Practice Hub tablist also uses role=tab and would pollute counts).
set -u
BASE=http://localhost:3000
OUT=/tmp/e2e-practice-sections
mkdir -p "$OUT"

ab () { agent-browser "$@"; }

pass=0; fail=0
ck () {
  if [ "$1" = "1" ] || [ "$1" = "true" ] || [ "$1" = "PASS" ]; then pass=$((pass+1)); echo "  PASS $2";
  else fail=$((fail+1)); echo "  FAIL $2  (got: $1)"; fi
}

jqish () {
  node -e "
const fs=require('fs');
let raw='';
try{raw=fs.readFileSync(0,'utf8').trim()}catch(e){}
let d;try{d=JSON.parse(raw)}catch(e){d=raw}
if(typeof d==='string'){try{d=JSON.parse(d)}catch(e){}}
const k=process.argv[1];
let out;
if(k==='.'){out=d}
else{const m=/^\\.\\[(\\d+)\\]$/.exec(k);if(m){out=d==null?undefined:d[Number(m[1])]}else{const key=k.slice(1);out=d==null?undefined:d[key]}}
console.log(JSON.stringify(out===undefined?null:out))
" "$1"
}

# ---------- E1. hub loads ----------
ab set viewport 1280 800 >/dev/null 2>&1
ab open "$BASE/practice" >/dev/null 2>&1
ab wait --load networkidle >/dev/null 2>&1 || true
ab wait 2000 >/dev/null 2>&1 || true
ab eval "window.__e2eErrors=[];var _ce=console.error;console.error=function(){window.__e2eErrors.push([].slice.call(arguments).join(' '));_ce.apply(console,arguments)};'installed'" >/dev/null 2>&1
HUB=$(ab eval "JSON.stringify(['Mock exams','Adaptive drill','Mistake Bank','Readiness'].map(function(t){return document.body.textContent.indexOf(t)>=0}).concat([document.body.textContent.indexOf('JEE Main')>=0,document.body.textContent.indexOf('calculator')>=0]))" 2>/dev/null | jqish '.')
echo "E1 hub:"
ck "$(echo "$HUB" | jqish '.[0]')" "Mock exams tab present"
ck "$(echo "$HUB" | jqish '.[1]')" "Adaptive drill tab present"
ck "$(echo "$HUB" | jqish '.[2]')" "Mistake Bank tab present"
ck "$(echo "$HUB" | jqish '.[3]')" "Readiness tab present"
ck "$(echo "$HUB" | jqish '.[4]')" "JEE Main card present"
ck "$(echo "$HUB" | jqish '.[5]')" "CAT card shows calculator badge"

# ---------- E2. JEE card exposes per-section structure ----------
JEECARD=$(ab eval "var card=Array.prototype.slice.call(document.querySelectorAll('div.rounded-xl')).find(function(c){return /JEE Main/.test(c.textContent||'')&&/Start paper/.test(c.textContent||'')});JSON.stringify([!!card&&/MCQ/.test(card.textContent),!!card&&/Numerical value/.test(card.textContent),!!card&&/20 questions/.test(card.textContent)])" 2>/dev/null | jqish '.')
echo "E2 JEE card sections:"
ck "$(echo "$JEECARD" | jqish '.[0]')" "MCQ section chip"
ck "$(echo "$JEECARD" | jqish '.[1]')" "Numerical-value section chip"
ck "$(echo "$JEECARD" | jqish '.[2]')" "section counts shown"

# ---------- E3. start JEE paper -> instructions ----------
ab eval "var card=Array.prototype.slice.call(document.querySelectorAll('div.rounded-xl')).find(function(c){return /JEE Main/.test(c.textContent||'')&&/Start paper/.test(c.textContent||'')});var b=Array.prototype.slice.call(card.querySelectorAll('button')).find(function(x){return /Start paper/.test(x.textContent||'')});b.click();'clicked'" >/dev/null 2>&1
ab wait 3000 >/dev/null 2>&1 || true
INSTR=$(ab eval "var ov=document.querySelector('div.fixed.inset-0');var t=ov?ov.textContent:'';JSON.stringify([/Sections of this paper/.test(t),/Section A · Mathematics/.test(t),/Section B · Numerical Value/.test(t),/Type-in questions/.test(t),!/on-screen calculator/.test(t),/per section/.test(t)])" 2>/dev/null | jqish '.')
echo "E3 instructions:"
ck "$(echo "$INSTR" | jqish '.[0]')" "sections table present"
ck "$(echo "$INSTR" | jqish '.[1]')" "Section A labelled"
ck "$(echo "$INSTR" | jqish '.[2]')" "Section B labelled"
ck "$(echo "$INSTR" | jqish '.[3]')" "type-in explainer present"
ck "$(echo "$INSTR" | jqish '.[4]')" "no calculator note on JEE (expect true)"
ck "$(echo "$INSTR" | jqish '.[5]')" "marking fact says per section"
ab screenshot "$OUT/instructions.png" >/dev/null 2>&1

# ---------- E4. begin the paper ----------
ab eval "var cb=document.querySelector('[role=checkbox]');if(cb){cb.click()};'declared'" >/dev/null 2>&1
ab wait 500 >/dev/null 2>&1 || true
ab eval "var b=Array.prototype.slice.call(document.querySelectorAll('button')).find(function(x){return /I am ready to begin/.test(x.textContent||'')});b.click();'begun'" >/dev/null 2>&1
ab wait 1500 >/dev/null 2>&1 || true

RUN=$(ab eval "var ov=document.querySelector('div.fixed.inset-0');var tabs=Array.prototype.slice.call(ov.querySelectorAll('header [role=tablist] button'));var pal=Array.prototype.slice.call(ov.querySelectorAll('aside button[aria-label^=\\\"Go to question\\\"]'));JSON.stringify([!!ov.querySelector('[role=timer]'),tabs.length===2,/Section A/.test(tabs[0]?tabs[0].textContent:''),/Section B/.test(tabs[1]?tabs[1].textContent:''),pal.length===20,/Question No\\. 1/.test(ov.textContent),ov.querySelectorAll('[role=radiogroup] button').length>=2,/\\+4 correct/.test(ov.textContent)&&/−1 wrong/.test(ov.textContent),!Array.prototype.slice.call(ov.querySelectorAll('button')).some(function(b){return /Calculator/.test(b.textContent||'')})])" 2>/dev/null | jqish '.')
echo "E4 running (Section A):"
ck "$(echo "$RUN" | jqish '.[0]')" "countdown timer present"
ck "$(echo "$RUN" | jqish '.[1]')" "two section tabs"
ck "$(echo "$RUN" | jqish '.[2]')" "tab A labelled"
ck "$(echo "$RUN" | jqish '.[3]')" "tab B labelled"
ck "$(echo "$RUN" | jqish '.[4]')" "palette lists Section A only (20)"
ck "$(echo "$RUN" | jqish '.[5]')" "Question No. 1"
ck "$(echo "$RUN" | jqish '.[6]')" "MCQ options render"
ck "$(echo "$RUN" | jqish '.[7]')" "per-question marks chip +4/−1"
ck "$(echo "$RUN" | jqish '.[8]')" "no calculator on JEE"
ab screenshot "$OUT/running-section-a.png" >/dev/null 2>&1

# ---------- E5. answer Q1, mark Q2 ----------
ab eval "var ov=document.querySelector('div.fixed.inset-0');ov.querySelectorAll('[role=radiogroup] button')[0].click();'answered'" >/dev/null 2>&1
ab wait 400 >/dev/null 2>&1 || true
ab eval "var ov=document.querySelector('div.fixed.inset-0');var b=Array.prototype.slice.call(ov.querySelectorAll('button')).find(function(x){return /Save & Next/.test(x.textContent||'')});b.click();'next'" >/dev/null 2>&1
ab wait 400 >/dev/null 2>&1 || true
ab eval "var ov=document.querySelector('div.fixed.inset-0');var b=Array.prototype.slice.call(ov.querySelectorAll('button')).find(function(x){return /Mark for Review/.test(x.textContent||'')});b.click();'marked'" >/dev/null 2>&1
ab wait 400 >/dev/null 2>&1 || true
STATE=$(ab eval "var ov=document.querySelector('div.fixed.inset-0');var pal=Array.prototype.slice.call(ov.querySelectorAll('aside button[aria-label^=\\\"Go to question\\\"]'));JSON.stringify([pal.filter(function(b){return /bg-emerald-600/.test(b.className)}).length===1,pal.filter(function(b){return /bg-violet-600/.test(b.className)}).length===1,/1\\/25/.test(ov.textContent)])" 2>/dev/null | jqish '.')
echo "E5 palette states:"
ck "$(echo "$STATE" | jqish '.[0]')" "Q1 answered (green)"
ck "$(echo "$STATE" | jqish '.[1]')" "Q2 marked (violet)"
ck "$(echo "$STATE" | jqish '.[2]')" "1/25 answered counter"

# ---------- E6. switch to Section B: numeric entry ----------
ab eval "var ov=document.querySelector('div.fixed.inset-0');ov.querySelectorAll('header [role=tablist] button')[1].click();'secB'" >/dev/null 2>&1
ab wait 800 >/dev/null 2>&1 || true
SECB=$(ab eval "var ov=document.querySelector('div.fixed.inset-0');var pal=Array.prototype.slice.call(ov.querySelectorAll('aside button[aria-label^=\\\"Go to question\\\"]'));var input=ov.querySelector('input[aria-label^=\\\"Your answer for question\\\"]');JSON.stringify([pal.length===5,/Question No\\. 21/.test(ov.textContent),!!input,ov.querySelectorAll('[aria-label=\\\"Numeric keypad\\\"] button').length>0,/\\+4 correct/.test(ov.textContent),/Numerical value/.test(ov.textContent)])" 2>/dev/null | jqish '.')
echo "E6 Section B (numerical):"
ck "$(echo "$SECB" | jqish '.[0]')" "palette lists Section B only (5)"
ck "$(echo "$SECB" | jqish '.[1]')" "question numbering continues (Q21)"
ck "$(echo "$SECB" | jqish '.[2]')" "type-in field present"
ck "$(echo "$SECB" | jqish '.[3]')" "on-screen numeric keypad"
ck "$(echo "$SECB" | jqish '.[4]')" "Section B marks chip +4 (JEE −1)"
ck "$(echo "$SECB" | jqish '.[5]')" "Numerical value type badge"
ab screenshot "$OUT/running-section-b.png" >/dev/null 2>&1

# ---------- E7. type an answer (native setter + keypad append) ----------
ab eval "var ov=document.querySelector('div.fixed.inset-0');var input=ov.querySelector('input[aria-label^=\\\"Your answer for question\\\"]');var setter=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;setter.call(input,'12');input.dispatchEvent(new Event('input',{bubbles:true}));'typed'" >/dev/null 2>&1
ab wait 400 >/dev/null 2>&1 || true
ab eval "var ov=document.querySelector('div.fixed.inset-0');var kp=ov.querySelectorAll('[aria-label=\\\"Numeric keypad\\\"] button');var five=Array.prototype.slice.call(kp).find(function(b){return (b.textContent||'').trim()==='5'});five.click();'keypad'" >/dev/null 2>&1
ab wait 400 >/dev/null 2>&1 || true
TYPED=$(ab eval "var ov=document.querySelector('div.fixed.inset-0');var input=ov.querySelector('input[aria-label^=\\\"Your answer for question\\\"]');JSON.stringify([input?input.value==='125':false])" 2>/dev/null | jqish '.')
echo "E7 typed numeric answer:"
ck "$(echo "$TYPED" | jqish '.[0]')" "typed value via setter + keypad = 125"

# ---------- E8. submit modal: per-section counts ----------
ab eval "var ov=document.querySelector('div.fixed.inset-0');var b=Array.prototype.slice.call(ov.querySelectorAll('aside button')).find(function(x){return /Submit Test/.test(x.textContent||'')});b.click();'modal'" >/dev/null 2>&1
ab wait 800 >/dev/null 2>&1 || true
MODAL=$(ab eval "var dlg=document.querySelector('[aria-labelledby=submit-dialog-title]');JSON.stringify([!!dlg,!!dlg&&!!dlg.querySelector('table'),dlg?dlg.querySelectorAll('tbody tr').length===3:false,dlg?/Total/.test(dlg.textContent):false,dlg?/−1 in every section/.test(dlg.textContent):false])" 2>/dev/null | jqish '.')
echo "E8 submit modal:"
ck "$(echo "$MODAL" | jqish '.[0]')" "modal opens"
ck "$(echo "$MODAL" | jqish '.[1]')" "per-section table"
ck "$(echo "$MODAL" | jqish '.[2]')" "2 section rows + total"
ck "$(echo "$MODAL" | jqish '.[3]')" "total row present"
ck "$(echo "$MODAL" | jqish '.[4]')" "per-section negative wording"
ab screenshot "$OUT/submit-modal.png" >/dev/null 2>&1

# ---------- E9. submit -> results with sections + time analysis ----------
ab eval "var dlg=document.querySelector('[aria-labelledby=submit-dialog-title]');var b=Array.prototype.slice.call(dlg.querySelectorAll('button')).find(function(x){return /Yes, submit/.test(x.textContent||'')});b.click();'submitted'" >/dev/null 2>&1
ab wait 3500 >/dev/null 2>&1 || true
RES=$(ab eval "var ov=document.querySelector('div.fixed.inset-0');var t=ov?ov.textContent:document.body.textContent;JSON.stringify([/— results/.test(t),/Section scores/.test(t),(t.match(/Section [AB] ·/g)||[]).length>=2,/Time analysis/.test(t),/mean per question/.test(t),/You typed:/.test(t),document.querySelectorAll('[title=\\\"Time spent on this question\\\"]').length>=1,/Question review/.test(t)])" 2>/dev/null | jqish '.')
echo "E9 results:"
ck "$(echo "$RES" | jqish '.[0]')" "results view"
ck "$(echo "$RES" | jqish '.[1]')" "section scores table"
ck "$(echo "$RES" | jqish '.[2]')" "both section rows in scores"
ck "$(echo "$RES" | jqish '.[3]')" "time analysis strip"
ck "$(echo "$RES" | jqish '.[4]')" "mean time per question"
ck "$(echo "$RES" | jqish '.[5]')" "typed answer echoed in review"
ck "$(echo "$RES" | jqish '.[6]')" "per-question time chips"
ck "$(echo "$RES" | jqish '.[7]')" "question review"
ab screenshot "$OUT/results.png" >/dev/null 2>&1

# ---------- E10. CAT: calculator + TITA no-negative chip ----------
ab eval "var b=Array.prototype.slice.call(document.querySelectorAll('button')).find(function(x){return /^Done$/.test((x.textContent||'').trim())});if(b){b.click()};'done'" >/dev/null 2>&1
ab wait 1000 >/dev/null 2>&1 || true
ab eval "var card=Array.prototype.slice.call(document.querySelectorAll('div.rounded-xl')).find(function(c){return /CAT ·/.test(c.textContent||'')&&/Start paper/.test(c.textContent||'')});var b=Array.prototype.slice.call(card.querySelectorAll('button')).find(function(x){return /Start paper/.test(x.textContent||'')});b.click();'cat-started'" >/dev/null 2>&1
ab wait 3000 >/dev/null 2>&1 || true
ab eval "var cb=document.querySelector('[role=checkbox]');if(cb){cb.click()};'declared'" >/dev/null 2>&1
ab wait 500 >/dev/null 2>&1 || true
ab eval "var b=Array.prototype.slice.call(document.querySelectorAll('button')).find(function(x){return /I am ready to begin/.test(x.textContent||'')});b.click();'begun'" >/dev/null 2>&1
ab wait 1500 >/dev/null 2>&1 || true
CAT=$(ab eval "var ov=document.querySelector('div.fixed.inset-0');var tabs=ov.querySelectorAll('header [role=tablist] button');JSON.stringify([Array.prototype.slice.call(ov.querySelectorAll('button')).some(function(b){return /Calculator/.test(b.textContent||'')}),tabs.length===2])" 2>/dev/null | jqish '.')
echo "E10 CAT paper:"
ck "$(echo "$CAT" | jqish '.[0]')" "calculator FAB present"
ck "$(echo "$CAT" | jqish '.[1]')" "two section tabs (MCQ/TITA)"
ab eval "var ov=document.querySelector('div.fixed.inset-0');var fab=Array.prototype.slice.call(ov.querySelectorAll('button')).find(function(b){return /Calculator/.test(b.textContent||'')});fab.click();'calc-open'" >/dev/null 2>&1
ab wait 800 >/dev/null 2>&1 || true
ab screenshot "$OUT/cat-calculator.png" >/dev/null 2>&1
ab eval "var dlg=document.querySelector('[aria-label=\\\"On-screen calculator\\\"]');var b=Array.prototype.slice.call(dlg.querySelectorAll('button')).find(function(x){return (x.textContent||'').trim()==='7'});b.click();'7'" >/dev/null 2>&1
ab wait 250 >/dev/null 2>&1 || true
ab eval "var dlg=document.querySelector('[aria-label=\\\"On-screen calculator\\\"]');var b=Array.prototype.slice.call(dlg.querySelectorAll('button')).find(function(x){return (x.textContent||'').trim()==='×'});b.click();'×'" >/dev/null 2>&1
ab wait 250 >/dev/null 2>&1 || true
ab eval "var dlg=document.querySelector('[aria-label=\\\"On-screen calculator\\\"]');var b=Array.prototype.slice.call(dlg.querySelectorAll('button')).find(function(x){return (x.textContent||'').trim()==='6'});b.click();'6'" >/dev/null 2>&1
ab wait 250 >/dev/null 2>&1 || true
ab eval "var dlg=document.querySelector('[aria-label=\\\"On-screen calculator\\\"]');var b=Array.prototype.slice.call(dlg.querySelectorAll('button')).find(function(x){return (x.textContent||'').trim()==='='});b.click();'='" >/dev/null 2>&1
ab wait 400 >/dev/null 2>&1 || true
CALC=$(ab eval "var dlg=document.querySelector('[aria-label=\\\"On-screen calculator\\\"]');JSON.stringify([dlg?(dlg.querySelector('[role=status]').textContent||'').trim()==='42':false])" 2>/dev/null | jqish '.')
echo "E10b calculator math:"
ck "$(echo "$CALC" | jqish '.[0]')" "7 × 6 = 42"
ab eval "var dlg=document.querySelector('[aria-label=\\\"On-screen calculator\\\"]');var x=Array.prototype.slice.call(dlg.querySelectorAll('button')).find(function(b){return /Close calculator/.test(b.getAttribute('aria-label')||'')});x.click();'closed'" >/dev/null 2>&1
ab wait 400 >/dev/null 2>&1 || true
ab eval "var ov=document.querySelector('div.fixed.inset-0');ov.querySelectorAll('header [role=tablist] button')[1].click();'tita'" >/dev/null 2>&1
ab wait 800 >/dev/null 2>&1 || true
TITA=$(ab eval "var ov=document.querySelector('div.fixed.inset-0');JSON.stringify([/no negative/.test(ov.textContent),/TITA/.test(ov.textContent),!!ov.querySelector('input[aria-label^=\\\"Your answer for question\\\"]')])" 2>/dev/null | jqish '.')
echo "E10c CAT TITA section:"
ck "$(echo "$TITA" | jqish '.[0]')" "no-negative marking chip"
ck "$(echo "$TITA" | jqish '.[1]')" "TITA type badge"
ck "$(echo "$TITA" | jqish '.[2]')" "type-in field"
ab screenshot "$OUT/cat-tita.png" >/dev/null 2>&1
# abandon CAT (no submit — keep the attempt history clean-ish)
ab eval "var ov=document.querySelector('div.fixed.inset-0');var b=Array.prototype.slice.call(ov.querySelectorAll('button')).find(function(x){return (x.getAttribute('aria-label')||'')==='Abandon paper'});b.click();'abandoned'" >/dev/null 2>&1
ab wait 1000 >/dev/null 2>&1 || true

# ---------- E11. sitting autosave + resume ----------
ab eval "var card=Array.prototype.slice.call(document.querySelectorAll('div.rounded-xl')).find(function(c){return /JEE Main/.test(c.textContent||'')&&/Start paper/.test(c.textContent||'')});var b=Array.prototype.slice.call(card.querySelectorAll('button')).find(function(x){return /Start paper/.test(x.textContent||'')});b.click();'restart'" >/dev/null 2>&1
ab wait 3000 >/dev/null 2>&1 || true
ab eval "var cb=document.querySelector('[role=checkbox]');if(cb){cb.click()};'d'" >/dev/null 2>&1
ab wait 400 >/dev/null 2>&1 || true
ab eval "var b=Array.prototype.slice.call(document.querySelectorAll('button')).find(function(x){return /I am ready to begin/.test(x.textContent||'')});b.click();'b'" >/dev/null 2>&1
ab wait 1200 >/dev/null 2>&1 || true
ab eval "var ov=document.querySelector('div.fixed.inset-0');ov.querySelectorAll('[role=radiogroup] button')[1].click();'a'" >/dev/null 2>&1
ab wait 1000 >/dev/null 2>&1 || true
SNAP=$(ab eval "JSON.stringify([!!localStorage.getItem('lockin:exam-sitting:v1')])" 2>/dev/null | jqish '.')
echo "E11 sitting autosave:"
ck "$(echo "$SNAP" | jqish '.[0]')" "sitting autosaved to localStorage"
ab reload >/dev/null 2>&1
ab wait --load networkidle >/dev/null 2>&1 || true
ab wait 2000 >/dev/null 2>&1 || true
BANNER=$(ab eval "JSON.stringify([/— in progress/.test(document.body.textContent),!!Array.prototype.slice.call(document.querySelectorAll('button')).find(function(b){return /Resume paper/.test(b.textContent||'')})])" 2>/dev/null | jqish '.')
echo "E11b resume banner after reload:"
ck "$(echo "$BANNER" | jqish '.[0]')" "in-progress banner"
ck "$(echo "$BANNER" | jqish '.[1]')" "Resume paper button"
ab screenshot "$OUT/resume-banner.png" >/dev/null 2>&1
ab eval "var b=Array.prototype.slice.call(document.querySelectorAll('button')).find(function(x){return /Resume paper/.test(x.textContent||'')});b.click();'resumed'" >/dev/null 2>&1
ab wait 1500 >/dev/null 2>&1 || true
RESUMED=$(ab eval "var ov=document.querySelector('div.fixed.inset-0');var pal=ov?Array.prototype.slice.call(ov.querySelectorAll('aside button[aria-label^=\\\"Go to question\\\"]')):[];JSON.stringify([!!ov&&/Question No\\./.test(ov.textContent),!!ov&&!!ov.querySelector('[role=timer]'),pal.length>0&&/bg-emerald-600/.test(pal[0].className),!!ov&&!/I am ready to begin/.test(ov.textContent)])" 2>/dev/null | jqish '.')
echo "E11c resumed sitting:"
ck "$(echo "$RESUMED" | jqish '.[0]')" "paper is running"
ck "$(echo "$RESUMED" | jqish '.[1]')" "timer recomputed from wall clock"
ck "$(echo "$RESUMED" | jqish '.[2]')" "answer restored (Q1 green)"
ck "$(echo "$RESUMED" | jqish '.[3]')" "instructions skipped"
# abandon to clear the sitting
ab eval "var ov=document.querySelector('div.fixed.inset-0');var b=Array.prototype.slice.call(ov.querySelectorAll('button')).find(function(x){return (x.getAttribute('aria-label')||'')==='Abandon paper'});b.click();'cleared'" >/dev/null 2>&1
ab wait 800 >/dev/null 2>&1 || true
CLEAN=$(ab eval "JSON.stringify([!localStorage.getItem('lockin:exam-sitting:v1')])" 2>/dev/null | jqish '.')
ck "$(echo "$CLEAN" | jqish '.[0]')" "abandon clears the sitting"

# ---------- E12. console errors (desktop) ----------
ERRS=$(ab eval "JSON.stringify([(window.__e2eErrors||[]).length===0,(window.__e2eErrors||[])[0]||null])" 2>/dev/null | jqish '.')
echo "E12 console:"
ck "$(echo "$ERRS" | jqish '.[0]')" "zero console errors"

# ---------- E13. mobile 390px ----------
ab set viewport 390 844 >/dev/null 2>&1
ab open "$BASE/practice" >/dev/null 2>&1
ab wait --load networkidle >/dev/null 2>&1 || true
ab wait 2000 >/dev/null 2>&1 || true
ab eval "window.__e2eM=[];var _ce=console.error;console.error=function(){window.__e2eM.push([].slice.call(arguments).join(' '));_ce.apply(console,arguments)};'installed'" >/dev/null 2>&1
ab eval "var card=Array.prototype.slice.call(document.querySelectorAll('div.rounded-xl')).find(function(c){return /JEE Main/.test(c.textContent||'')&&/Start paper/.test(c.textContent||'')});var b=Array.prototype.slice.call(card.querySelectorAll('button')).find(function(x){return /Start paper/.test(x.textContent||'')});b.click();'m-start'" >/dev/null 2>&1
ab wait 3000 >/dev/null 2>&1 || true
ab eval "var cb=document.querySelector('[role=checkbox]');if(cb){cb.click()};'d'" >/dev/null 2>&1
ab wait 400 >/dev/null 2>&1 || true
ab eval "var b=Array.prototype.slice.call(document.querySelectorAll('button')).find(function(x){return /I am ready to begin/.test(x.textContent||'')});b.click();'b'" >/dev/null 2>&1
ab wait 1500 >/dev/null 2>&1 || true
MOB=$(ab eval "var ov=document.querySelector('div.fixed.inset-0');var aside=ov.querySelector('aside');JSON.stringify([!!Array.prototype.slice.call(ov.querySelectorAll('button')).find(function(b){return /Palette/.test(b.textContent||'')}),!aside||aside.offsetParent===null,document.documentElement.scrollWidth<=window.innerWidth+1])" 2>/dev/null | jqish '.')
echo "E13 mobile 390px:"
ck "$(echo "$MOB" | jqish '.[0]')" "floating palette button"
ck "$(echo "$MOB" | jqish '.[1]')" "desktop aside hidden"
ck "$(echo "$MOB" | jqish '.[2]')" "no horizontal overflow"
ab screenshot "$OUT/mobile-section-a.png" >/dev/null 2>&1
# mobile palette drawer + section tabs inside
ab eval "var ov=document.querySelector('div.fixed.inset-0');var b=Array.prototype.slice.call(ov.querySelectorAll('button')).find(function(x){return /Palette/.test(x.textContent||'')&&!/Question Palette/.test(x.textContent||'')});b.click();'drawer'" >/dev/null 2>&1
ab wait 800 >/dev/null 2>&1 || true
DRAWER=$(ab eval "var drawer=document.querySelector('[class*=\\\"z-[55\\\"]');JSON.stringify([!!drawer&&/Question Palette/.test(drawer.textContent),drawer?drawer.querySelectorAll('button[aria-label^=\\\"Go to question\\\"]').length===20:false,drawer?drawer.querySelectorAll('[role=tablist] button').length===2:false])" 2>/dev/null | jqish '.')
echo "E13b mobile drawer:"
ck "$(echo "$DRAWER" | jqish '.[0]')" "drawer opens"
ck "$(echo "$DRAWER" | jqish '.[1]')" "section-A palette inside drawer (20)"
ck "$(echo "$DRAWER" | jqish '.[2]')" "section tabs in drawer"
ab screenshot "$OUT/mobile-drawer.png" >/dev/null 2>&1
# jump to Section B via the drawer's own tabs, then close the drawer
ab eval "var drawer=document.querySelector('[class*=\\\"z-[55\\\"]');var tabs=drawer.querySelectorAll('[role=tablist] button');tabs[1].click();'secB'" >/dev/null 2>&1
ab wait 600 >/dev/null 2>&1 || true
ab eval "var drawer=document.querySelector('[class*=\\\"z-[55\\\"]');var x=Array.prototype.slice.call(drawer.querySelectorAll('button')).find(function(b){return /Close palette/.test(b.getAttribute('aria-label')||'')});x.click();'closed'" >/dev/null 2>&1
ab wait 600 >/dev/null 2>&1 || true
MOBNUM=$(ab eval "var ov=document.querySelector('div.fixed.inset-0');JSON.stringify([!!ov.querySelector('input[aria-label^=\\\"Your answer for question\\\"]'),ov.querySelectorAll('[aria-label=\\\"Numeric keypad\\\"] button').length>0,document.documentElement.scrollWidth<=window.innerWidth+1])" 2>/dev/null | jqish '.')
echo "E13c mobile numeric section:"
ck "$(echo "$MOBNUM" | jqish '.[0]')" "type-in field"
ck "$(echo "$MOBNUM" | jqish '.[1]')" "numeric keypad"
ck "$(echo "$MOBNUM" | jqish '.[2]')" "no horizontal overflow"
ab screenshot "$OUT/mobile-section-b.png" >/dev/null 2>&1
MERRS=$(ab eval "JSON.stringify([(window.__e2eM||[]).length===0])" 2>/dev/null | jqish '.')
ck "$(echo "$MERRS" | jqish '.[0]')" "zero mobile console errors"

echo "=============================="
echo "e2e-practice-sections: $pass passed, $fail failed"
[ "$fail" = "0" ] || exit 1

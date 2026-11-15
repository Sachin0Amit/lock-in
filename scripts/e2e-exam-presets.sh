#!/usr/bin/env bash
# e2e-exam-presets.sh — E2E for the 2026-11-15 exam-topic coverage pass
# (owner directive: "make sure different exams topics are also
# covered"): the preset census grew 6 → 28 across every registry family;
# the Exams tab groups them; sampled new presets generate real papers
# through the existing CBT shell. Desktop 1280 first, then mobile 390.
set -u
BASE=http://localhost:3000
OUT=/tmp/e2e-exam-presets
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

# ---------- E1. hub loads with the error watch installed ----------
ab set viewport 1280 800 >/dev/null 2>&1
ab open "$BASE/practice" >/dev/null 2>&1
ab wait --load networkidle >/dev/null 2>&1 || true
ab wait 2500 >/dev/null 2>&1 || true
ab eval "window.__e2eErrors=[];var _ce=console.error;console.error=function(){window.__e2eErrors.push([].slice.call(arguments).join(' '));_ce.apply(console,arguments)};'installed'" >/dev/null 2>&1

HUB=$(ab eval "document.body.textContent.indexOf('Mock exams')>=0 && document.body.textContent.indexOf('exam families researched in the registry')>=0" 2>/dev/null | jqish '.')
echo "E1 hub loads:"
ck "$HUB" "practice hub + registry-families intro present"

# ---------- E2. grouped preset census: headings + 28 cards ----------
CENSUS=$(ab eval "var cards=Array.prototype.slice.call(document.querySelectorAll('button')).filter(function(b){return /Start paper/.test(b.textContent||'')});var headings=Array.prototype.slice.call(document.querySelectorAll('section[aria-label] h2')).map(function(h){return h.textContent.replace(/[0-9]+$/,'').trim()});var t=document.body.textContent;JSON.stringify([cards.length===28,Array.prototype.every.call(['General practice','University entrance','Engineering entrance','School-leaving','Postgraduate','Management entrance','Government & defence','Professional','Mathematics entrance','Olympiad & contests'],function(l){return headings.indexOf(l)>=0}),headings.indexOf('General practice')>=0,headings.indexOf('University entrance')>=0,headings.indexOf('Engineering entrance')>=0,headings.indexOf('School-leaving')>=0,headings.indexOf('Postgraduate')>=0,headings.indexOf('Management entrance')>=0,headings.indexOf('Government & defence')>=0,headings.indexOf('Professional')>=0,headings.indexOf('Mathematics entrance')>=0,headings.indexOf('Olympiad & contests')>=0, t.indexOf('Other exams')<0])" 2>/dev/null | jqish '.')
echo "E2 grouped census:"
ck "$(echo "$CENSUS" | jqish '.[0]')" "28 preset cards render"
ck "$(echo "$CENSUS" | jqish '.[1]')" "all 10 group headings render"
ck "$(echo "$CENSUS" | jqish '.[2]')" "General practice group"
ck "$(echo "$CENSUS" | jqish '.[3]')" "University entrance group"
ck "$(echo "$CENSUS" | jqish '.[4]')" "Engineering entrance group"
ck "$(echo "$CENSUS" | jqish '.[5]')" "School-leaving group"
ck "$(echo "$CENSUS" | jqish '.[6]')" "Postgraduate group"
ck "$(echo "$CENSUS" | jqish '.[7]')" "Management entrance group"
ck "$(echo "$CENSUS" | jqish '.[8]')" "Government & defence group"
ck "$(echo "$CENSUS" | jqish '.[9]')" "Professional group"
ck "$(echo "$CENSUS" | jqish '.[10]')" "Mathematics entrance group"
ck "$(echo "$CENSUS" | jqish '.[11]')" "Olympiad & contests group"
ck "$(echo "$CENSUS" | jqish '.[12]')" "no orphan 'Other exams' fallback group"

# ---------- E3. sampled new preset cards carry structure + caveats ----------
NEWS=$(ab eval "var get=function(re){var card=Array.prototype.slice.call(document.querySelectorAll('div.rounded-xl')).find(function(c){return re.test(c.textContent||'')&&/Start paper/.test(c.textContent||'')});return card?card.textContent:''};var sat=get(/SAT · Mathematics/),gate=get(/GATE · Engineering Mathematics/),aime=get(/AIME · Integer-answer/),gaokao=get(/Gaokao · Mathematics/),adv=get(/JEE Advanced · Mathematics/),imo=get(/IMO · Topic set/),upsc=get(/UPSC CSAT/);var t=document.body.textContent;JSON.stringify([/Grid-in/.test(sat),/15 questions/.test(sat),/Trigonometry & radian/.test(sat),/NAT/.test(gate),/6 questions/.test(gate),/5 questions/.test(gate),/\+2/.test(gate),/Linear algebra/.test(gate),/type-in/.test(aime),/Fill-in/.test(gaokao),/MCQ/.test(gaokao),/Matrices & determinants/.test(adv),/proof/.test(imo)||/Proof/.test(imo),/alligation/.test(upsc),t.indexOf('Korean CSAT')>=0,t.indexOf('EJU')>=0,t.indexOf('A-Level')>=0,t.indexOf('IB ·')>=0,t.indexOf('GRE ·')>=0,t.indexOf('GMAT ·')>=0,t.indexOf('TMUA')>=0,t.indexOf('Oxford MAT')>=0,t.indexOf('STEP ·')>=0,t.indexOf('Euclid')>=0,t.indexOf('CA Foundation')>=0,t.indexOf('ISI')>=0,t.indexOf('UGC NET')>=0,t.indexOf('AMC 12')>=0,t.indexOf('ACT ·')>=0])" 2>/dev/null | jqish '.')
echo "E3 sampled new preset cards:"
ck "$(echo "$NEWS" | jqish '.[0]')" "SAT card: grid-in type chip"
ck "$(echo "$NEWS" | jqish '.[1]')" "SAT card: student-produced-response section"
ck "$(echo "$NEWS" | jqish '.[2]')" "SAT card: trigonometry caveat listed"
ck "$(echo "$NEWS" | jqish '.[3]')" "GATE card: NAT section"
ck "$(echo "$NEWS" | jqish '.[4]')" "GATE card: 1-mark MCQ section"
ck "$(echo "$NEWS" | jqish '.[5]')" "GATE card: 2-mark MCQ section"
ck "$(echo "$NEWS" | jqish '.[6]')" "GATE card: linear-algebra caveat listed"
ck "$(echo "$NEWS" | jqish '.[7]')" "AIME card: type-in section"
ck "$(echo "$NEWS" | jqish '.[8]')" "Gaokao card: fill-in section"
ck "$(echo "$NEWS" | jqish '.[9]')" "Gaokao card: multiple-choice section"
ck "$(echo "$NEWS" | jqish '.[10]')" "JEE Advanced card: matrices caveat"
ck "$(echo "$NEWS" | jqish '.[11]')" "IMO card: proof caveat"
ck "$(echo "$NEWS" | jqish '.[12]')" "UPSC card: alligation caveat"
ck "$(echo "$NEWS" | jqish '.[13]')" "Korean CSAT card present"
ck "$(echo "$NEWS" | jqish '.[14]')" "EJU card present"
ck "$(echo "$NEWS" | jqish '.[15]')" "A-Level card present"
ck "$(echo "$NEWS" | jqish '.[16]')" "IB card present"
ck "$(echo "$NEWS" | jqish '.[17]')" "GRE card present"
ck "$(echo "$NEWS" | jqish '.[18]')" "GMAT card present"
ck "$(echo "$NEWS" | jqish '.[19]')" "TMUA card present"
ck "$(echo "$NEWS" | jqish '.[20]')" "Oxford MAT card present"
ck "$(echo "$NEWS" | jqish '.[21]')" "STEP card present"
ck "$(echo "$NEWS" | jqish '.[22]')" "Euclid card present"
ck "$(echo "$NEWS" | jqish '.[23]')" "CA Foundation card present"
ck "$(echo "$NEWS" | jqish '.[24]')" "ISI card present"
ck "$(echo "$NEWS" | jqish '.[25]')" "UGC NET card present"
ck "$(echo "$NEWS" | jqish '.[26]')" "AMC 12 card present"
ck "$(echo "$NEWS" | jqish '.[27]')" "ACT card present"
ab screenshot "$OUT/exams-tab.png" >/dev/null 2>&1

# ---------- E4. start the SAT paper -> instructions -> sections ----------
ab eval "var card=Array.prototype.slice.call(document.querySelectorAll('div.rounded-xl')).find(function(c){return /SAT · Mathematics/.test(c.textContent||'')&&/Start paper/.test(c.textContent||'')});var b=Array.prototype.slice.call(card.querySelectorAll('button')).find(function(x){return /Start paper/.test(x.textContent||'')});b.click();'clicked'" >/dev/null 2>&1
ab wait 3000 >/dev/null 2>&1 || true
INSTR=$(ab eval "var ov=document.querySelector('div.fixed.inset-0');var t=ov?ov.textContent:'';JSON.stringify([/SAT · Mathematics/.test(t),/Module · Multiple choice/.test(t),/Module · Student-produced response/.test(t),/Type-in questions/.test(t),/15/.test(t),/20 questions|20/.test(t)])" 2>/dev/null | jqish '.')
echo "E4 SAT instructions:"
ck "$(echo "$INSTR" | jqish '.[0]')" "SAT paper title"
ck "$(echo "$INSTR" | jqish '.[1]')" "MCQ module row in sections table"
ck "$(echo "$INSTR" | jqish '.[2]')" "grid-in module row in sections table"
ck "$(echo "$INSTR" | jqish '.[3]')" "type-in explainer present"
ck "$(echo "$INSTR" | jqish '.[4]')" "section counts shown"

ab eval "var cb=document.querySelector('[role=checkbox]');if(cb){cb.click()};'declared'" >/dev/null 2>&1
ab wait 500 >/dev/null 2>&1 || true
ab eval "var b=Array.prototype.slice.call(document.querySelectorAll('button')).find(function(x){return /I am ready to begin/.test(x.textContent||'')});b.click();'begun'" >/dev/null 2>&1
ab wait 1500 >/dev/null 2>&1 || true
RUN=$(ab eval "var ov=document.querySelector('div.fixed.inset-0');var tabs=Array.prototype.slice.call(ov.querySelectorAll('header [role=tablist] button'));var pal=Array.prototype.slice.call(ov.querySelectorAll('aside button[aria-label^=\\\"Go to question\\\"]'));JSON.stringify([!!ov.querySelector('[role=timer]'),tabs.length===2,/Multiple choice/.test(tabs[0]?tabs[0].textContent:''),/Student-produced/.test(tabs[1]?tabs[1].textContent:''),pal.length===15,/no negative/.test(ov.textContent),ov.querySelectorAll('[role=radiogroup] button').length>=2])" 2>/dev/null | jqish '.')
echo "E4 SAT running (module 1):"
ck "$(echo "$RUN" | jqish '.[0]')" "countdown timer present"
ck "$(echo "$RUN" | jqish '.[1]')" "two module tabs"
ck "$(echo "$RUN" | jqish '.[2]')" "tab 1 = multiple choice"
ck "$(echo "$RUN" | jqish '.[3]')" "tab 2 = student-produced response"
ck "$(echo "$RUN" | jqish '.[4]')" "palette scoped to 15 MCQ questions"
ck "$(echo "$RUN" | jqish '.[5]')" "no-negative marking shown"
ck "$(echo "$RUN" | jqish '.[6]')" "radio options render"

# switch to module 2 -> numeric entry
ab eval "var ov=document.querySelector('div.fixed.inset-0');var tabs=Array.prototype.slice.call(ov.querySelectorAll('header [role=tablist] button'));tabs[1].click();'switched'" >/dev/null 2>&1
ab wait 800 >/dev/null 2>&1 || true
MOD2=$(ab eval "var ov=document.querySelector('div.fixed.inset-0');var pal=Array.prototype.slice.call(ov.querySelectorAll('aside button[aria-label^=\\\"Go to question\\\"]'));JSON.stringify([pal.length===5,!!ov.querySelector('input[inputmode=decimal]'),ov.querySelectorAll('[role=radiogroup] button').length===0])" 2>/dev/null | jqish '.')
echo "E4 SAT module 2 (grid-in):"
ck "$(echo "$MOD2" | jqish '.[0]')" "palette scoped to 5 grid-in questions"
ck "$(echo "$MOD2" | jqish '.[1]')" "numeric entry input present"
ck "$(echo "$MOD2" | jqish '.[2]')" "no radio options in the grid-in module"

# abandon the sitting honestly (clears the localStorage snapshot)
ab eval "var b=document.querySelector('button[aria-label=\"Abandon paper\"]');if(b){b.click()};'abandoned'" >/dev/null 2>&1
ab wait 1000 >/dev/null 2>&1 || true

# ---------- E5. AIME paper: answers-only, numeric entry from question 1 ----------
ab eval "var card=Array.prototype.slice.call(document.querySelectorAll('div.rounded-xl')).find(function(c){return /AIME · Integer-answer/.test(c.textContent||'')&&/Start paper/.test(c.textContent||'')});var b=Array.prototype.slice.call(card.querySelectorAll('button')).find(function(x){return /Start paper/.test(x.textContent||'')});b.click();'clicked'" >/dev/null 2>&1
ab wait 3000 >/dev/null 2>&1 || true
ab eval "var cb=document.querySelector('[role=checkbox]');if(cb){cb.click()};'declared'" >/dev/null 2>&1
ab wait 500 >/dev/null 2>&1 || true
ab eval "var b=Array.prototype.slice.call(document.querySelectorAll('button')).find(function(x){return /I am ready to begin/.test(x.textContent||'')});b.click();'begun'" >/dev/null 2>&1
ab wait 1500 >/dev/null 2>&1 || true
AIME=$(ab eval "var ov=document.querySelector('div.fixed.inset-0');var pal=Array.prototype.slice.call(ov.querySelectorAll('aside button[aria-label^=\\\"Go to question\\\"]'));JSON.stringify([pal.length===15,!!ov.querySelector('input[inputmode=decimal]'),ov.querySelectorAll('[role=radiogroup] button').length===0,!!ov.querySelector('[aria-label=\"Numeric keypad\"]'),/no negative/.test(ov.textContent)])" 2>/dev/null | jqish '.')
echo "E5 AIME running:"
ck "$(echo "$AIME" | jqish '.[0]')" "15 palette entries"
ck "$(echo "$AIME" | jqish '.[1]')" "numeric input from question 1"
ck "$(echo "$AIME" | jqish '.[2]')" "no MCQ radios anywhere"
ck "$(echo "$AIME" | jqish '.[3]')" "on-screen numeric keypad present"
ck "$(echo "$AIME" | jqish '.[4]')" "no-negative marking shown"
ab screenshot "$OUT/aime-runner.png" >/dev/null 2>&1
ab eval "var b=document.querySelector('button[aria-label=\\"Abandon paper\\"]');if(b){b.click()};'abandoned'" >/dev/null 2>&1
ab wait 1000 >/dev/null 2>&1 || true

# ---------- E6. desktop: zero console errors across the pass ----------
ERRS=$(ab eval "window.__e2eErrors.length===0" 2>/dev/null | jqish '.')
echo "E6 console:"
ck "$ERRS" "zero console errors at 1280px"

# ---------- E7. mobile 390px: grouped tab + no horizontal overflow ----------
ab set viewport 390 844 >/dev/null 2>&1
ab open "$BASE/practice" >/dev/null 2>&1
ab wait --load networkidle >/dev/null 2>&1 || true
ab wait 2500 >/dev/null 2>&1 || true
MOB=$(ab eval "var cards=Array.prototype.slice.call(document.querySelectorAll('button')).filter(function(b){return /Start paper/.test(b.textContent||'')});JSON.stringify([cards.length===28,document.documentElement.scrollWidth<=390,document.body.textContent.indexOf('Olympiad & contests')>=0])" 2>/dev/null | jqish '.')
echo "E7 mobile 390px:"
ck "$(echo "$MOB" | jqish '.[0]')" "28 preset cards on mobile"
ck "$(echo "$MOB" | jqish '.[1]')" "no horizontal overflow"
ck "$(echo "$MOB" | jqish '.[2]')" "group headings render on mobile"
ab screenshot "$OUT/exams-mobile.png" >/dev/null 2>&1

echo
echo "e2e-exam-presets: $pass pass / $fail fail"
[ "$fail" = "0" ]

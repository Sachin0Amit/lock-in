#!/usr/bin/env bash
# e2e-cengage-style.sh — verify the Cengage-style reader reskin on live pages
# (owner directive 2026-11-03). Usage: bash scripts/e2e-cengage-style.sh
set -u
BASE=http://localhost:3000/book/foundation-mathematics/lesson
PAGE_JS=$(cat /home/z/my-project/scripts/e2e-cengage-style.page.js)
OUT=/tmp/cengage-e2e
mkdir -p "$OUT"

LESSONS=(
  fm-numbers-digits-place-value
  fm-order-of-operations
  fm-highest-common-factor
  fm-idea-of-a-fraction
  fm-equivalent-fractions-simplification
  fm-comparing-fractions
  fm-adding-subtracting-fractions
)

for L in "${LESSONS[@]}"; do
  echo "== $L =="
  agent-browser open "$BASE/$L" >/dev/null 2>&1
  agent-browser wait --load networkidle >/dev/null 2>&1 || true
  agent-browser wait 1500 >/dev/null 2>&1 || true
  agent-browser eval "$PAGE_JS" > "$OUT/$L.json" 2>"$OUT/$L.err"
  node -e "
    const fs = require('fs');
    let raw = (fs.readFileSync('$OUT/$L.json', 'utf8') || '').trim();
    if (!raw) { console.log('  NO OUTPUT'); process.exit(0); }
    const d = JSON.parse(raw.replace(/^\"/, '').replace(/\"$/, '').replace(/\\\\\"/g, '\"').replace(/\\\\n/g, ' '));
    console.log('  h2:', JSON.stringify(d.h2));
    console.log('  illustrations:', d.illustrations && d.illustrations.count, '| first:', d.illustrations && d.illustrations.first, '| Sol. pills:', d.illustrations && d.illustrations.solPills, '| step rows:', d.illustrations && d.illustrations.stepRows, '| stepNumberBadges (must be 0):', d.stepNumberBadges);
    console.log('  solutionChain:', JSON.stringify(d.solutionChain), '(inlineSolPills must equal solPills; thereforeTags > 0 on lessons with Hence/answer lines; legacyAnswerBoxes must be 0)');
    console.log('  noteBoxes:', JSON.stringify((d.noteBoxes||[]).slice(0, 8)));
    console.log('  exercisesBar:', JSON.stringify(d.exercisesBar));
    console.log('  quizBar:', JSON.stringify(d.quizBar));
    console.log('  katex:', d.katexNodes, '| dollarInSvg:', d.dollarInSvg, '| tableHeader:', d.tableHeader, '| nextjsPortal:', d.nextjsPortal);
  " || echo "  PARSE FAIL: $(head -c 300 "$OUT/$L.json")"
done

echo "== interactivity: quiz + solution on lesson 1.1 =="
agent-browser open "$BASE/fm-numbers-digits-place-value" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1200 >/dev/null 2>&1 || true
# click an option on each quiz question (option A of each)
for qi in 1 2 3 4 5; do
  agent-browser eval "
    (function(){
      var secs = document.querySelectorAll('section');
      for (var s of secs) {
        if (/CHECK YOURSELF/i.test(s.textContent) || (s.querySelector('header') && s.querySelector('header').textContent.indexOf('question') >= 0 && /CHECK YOURSELF/i.test(s.querySelector('header').textContent))) {}
      }
      return '';
    })()
  " >/dev/null 2>&1 || true
done
agent-browser eval "
(function(){
  var quizSec = Array.prototype.slice.call(document.querySelectorAll('section')).find(function(s){
    var h = s.querySelector('header'); return h && /CHECK YOURSELF/i.test(h.textContent);
  });
  if (!quizSec) return 'NO QUIZ SECTION';
  var btns = quizSec.querySelectorAll('button[type=button]');
  var clicked = 0;
  // click option A of every question group: buttons come in groups of options
  var qs = quizSec.querySelectorAll('div.px-5');
  qs.forEach(function(qdiv){
    var b = qdiv.querySelector('button[type=button]');
    if (b) { b.click(); clicked++; }
  });
  return 'clicked ' + clicked + ' options; score text: ' + (quizSec.textContent.match(/You scored[^·]*/)||['n/a'])[0].trim();
})()
" 2>/dev/null | head -3
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var quizSec = Array.prototype.slice.call(document.querySelectorAll('section')).find(function(s){
    var h = s.querySelector('header'); return h && /CHECK YOURSELF/i.test(h.textContent);
  });
  return quizSec ? (quizSec.textContent.match(/You scored[^\n]*/)||['no score line'])[0].trim() : 'NO QUIZ';
})()
" 2>/dev/null | head -2

# expand the first exercise solution
agent-browser eval "
(function(){
  var trig = document.querySelector('section header + div ol li button'); 
  return 'trigger found: ' + !!trig;
})()
" 2>/dev/null | head -2
agent-browser eval "
(function(){
  var links = Array.prototype.slice.call(document.querySelectorAll('button')).filter(function(b){ return /Show solution/.test(b.textContent); });
  if (links.length === 0) return 'NO SHOW-SOLUTION BUTTONS';
  links[0].click();
  return 'clicked first Show solution of ' + links.length;
})()
" 2>/dev/null | head -2
agent-browser wait 600 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var open = document.querySelectorAll('[data-state=open]');
  var sol = Array.prototype.slice.call(document.querySelectorAll('span')).filter(function(s){ return s.textContent.trim()==='Sol.'; }).length;
  var ans = Array.prototype.slice.call(document.querySelectorAll('span')).filter(function(s){ return s.textContent.trim()==='ANSWER'||s.textContent.trim()==='Answer'; }).length;
  return 'open collapsibles: ' + open.length + ' | Sol. pills: ' + sol + ' | Answer labels: ' + ans;
})()
" 2>/dev/null | head -2

echo "== mobile 390px overflow check (lesson 1.1) =="
agent-browser set viewport 390 844 >/dev/null 2>&1
agent-browser open "$BASE/fm-numbers-digits-place-value" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var de = document.scrollingElement;
  var art = document.querySelector('article');
  return 'docScrollW=' + de.scrollWidth + ' overflowX=' + (de.scrollWidth > 390 ? 'YES' : 'none') + ' articleW=' + (art ? art.getBoundingClientRect().width : 'n/a');
})()
" 2>/dev/null | head -2
agent-browser screenshot /tmp/cengage-e2e/mobile-1-1.png >/dev/null 2>&1 || true

echo "== desktop screenshot for visual check =="
agent-browser set viewport 1440 900 >/dev/null 2>&1
agent-browser open "$BASE/fm-numbers-digits-place-value" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
agent-browser screenshot /tmp/cengage-e2e/desktop-1-1-top.png >/dev/null 2>&1 || true
agent-browser eval "window.scrollBy(0, 1800)" >/dev/null 2>&1 || true
agent-browser wait 400 >/dev/null 2>&1 || true
agent-browser screenshot /tmp/cengage-e2e/desktop-1-1-mid.png >/dev/null 2>&1 || true
ls -la /tmp/cengage-e2e/*.png 2>/dev/null | head -5
echo "done"

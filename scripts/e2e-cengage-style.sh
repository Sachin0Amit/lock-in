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
  fm-multiplying-dividing-fractions
  fm-decimal-places-and-the-point
  fm-decimals-and-fractions-two-ways
  fm-operating-on-decimals
  fm-percent-and-its-meaning
  fm-percentage-change-discounts-simple-interest
  fm-ratio-as-a-comparison
  fm-rates-and-unit-rates
  fm-proportion-and-cross-multiplication
  fm-direct-and-inverse-variation
  fm-scaling-maps-models-and-recipes
  fm-negative-numbers-why-they-exist
  fm-adding-subtracting-integers
  fm-multiplying-integers-sign-rules
  fm-absolute-value-as-distance
  fm-points-lines-and-planes
  fm-angles-and-their-measurement
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

echo "== lesson 4.5 dedicated: quiz live + all solutions expand + mobile 390px =="
agent-browser set viewport 1280 900 >/dev/null 2>&1
agent-browser open "$BASE/fm-multiplying-dividing-fractions" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
# click option of every quiz question (the correct-index option per verify AM1-AM5: 1/2/1/0/3)
agent-browser eval "
(function(){
  var quizSec = Array.prototype.slice.call(document.querySelectorAll('section')).find(function(s){
    var h = s.querySelector('header'); return h && /CHECK YOURSELF/i.test(h.textContent);
  });
  if (!quizSec) return 'NO QUIZ SECTION';
  var correct = [1, 2, 1, 0, 3];
  var groups = quizSec.querySelectorAll('div.px-5');
  var clicked = 0;
  groups.forEach(function(qdiv, qi){
    var btns = qdiv.querySelectorAll('button[type=button]');
    var pick = btns[correct[qi]] || btns[0];
    if (pick) { pick.click(); clicked++; }
  });
  return 'clicked ' + clicked + ' correct options; score: ' + (quizSec.textContent.match(/You scored[^\u00b7]*/)||['n/a'])[0].trim();
})()
" 2>/dev/null | head -3
agent-browser wait 800 >/dev/null 2>&1 || true
# force-expand every exercise solution and count the chain parts
agent-browser eval "
(function(){
  var links = Array.prototype.slice.call(document.querySelectorAll('button')).filter(function(b){ return /Show solution/.test(b.textContent); });
  var n = links.length;
  links.forEach(function(b){ b.click(); });
  return 'expanded ' + n + ' solutions of 12';
})()
" 2>/dev/null | head -2
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var sol = Array.prototype.slice.call(document.querySelectorAll('span')).filter(function(s){ return s.textContent.trim()==='Sol.'; }).length;
  var th = Array.prototype.slice.call(document.querySelectorAll('.katex')).filter(function(k){ return k.textContent.indexOf('\u2234') >= 0; }).length;
  var open = document.querySelectorAll('[data-state=open]').length;
  var box = Array.prototype.slice.call(document.querySelectorAll('div')).filter(function(d){ return d.className && String(d.className).indexOf('border-dashed') >= 0 && /Answer/i.test(d.textContent.slice(0, 40)); }).length;
  return 'Sol. pills: ' + sol + ' | KaTeX with \u2234: ' + th + ' | open collapsibles: ' + open + ' | legacy Answer boxes: ' + box;
})()
" 2>/dev/null | head -2
agent-browser screenshot /tmp/cengage-e2e/desktop-4-5-quiz.png >/dev/null 2>&1 || true
# mobile 390px on the new lesson
agent-browser set viewport 390 844 >/dev/null 2>&1
agent-browser open "$BASE/fm-multiplying-dividing-fractions" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var de = document.scrollingElement;
  var art = document.querySelector('article');
  return '4.5 mobile: docScrollW=' + de.scrollWidth + ' overflowX=' + (de.scrollWidth > 390 ? 'YES' : 'none') + ' articleW=' + (art ? art.getBoundingClientRect().width : 'n/a');
})()
" 2>/dev/null | head -2
agent-browser screenshot /tmp/cengage-e2e/mobile-4-5.png >/dev/null 2>&1 || true
agent-browser set viewport 1440 900 >/dev/null 2>&1
ls -la /tmp/cengage-e2e/*4-5*.png 2>/dev/null | head -4
ls -la /tmp/cengage-e2e/*.png 2>/dev/null | head -5

# ---- lesson 5.1 dedicated: quiz live + all solutions expand + mobile 390px (run 21) ----
agent-browser set viewport 1280 900 >/dev/null 2>&1
agent-browser open "$BASE/fm-decimal-places-and-the-point" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
# click the correct-index option per quiz (verify M: indices 1/2/3/1/2)
agent-browser eval "
(function(){
  var quizSec = Array.prototype.slice.call(document.querySelectorAll('section')).find(function(s){
    var h = s.querySelector('header'); return h && /CHECK YOURSELF/i.test(h.textContent);
  });
  if (!quizSec) return 'NO QUIZ SECTION';
  var correct = [1, 2, 3, 1, 2];
  var groups = quizSec.querySelectorAll('div.px-5');
  var clicked = 0;
  groups.forEach(function(qdiv, qi){
    var btns = qdiv.querySelectorAll('button[type=button]');
    var pick = btns[correct[qi]] || btns[0];
    if (pick) { pick.click(); clicked++; }
  });
  return 'clicked ' + clicked + ' correct options; score: ' + (quizSec.textContent.match(/You scored[^\u00b7]*/)||['n/a'])[0].trim();
})()
" 2>/dev/null | head -3
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var links = Array.prototype.slice.call(document.querySelectorAll('button')).filter(function(b){ return /Show solution/.test(b.textContent); });
  var n = links.length;
  links.forEach(function(b){ b.click(); });
  return 'expanded ' + n + ' solutions of 12';
})()
" 2>/dev/null | head -2
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var sol = Array.prototype.slice.call(document.querySelectorAll('span')).filter(function(s){ return s.textContent.trim()==='Sol.'; }).length;
  var th = Array.prototype.slice.call(document.querySelectorAll('.katex')).filter(function(k){ return k.textContent.indexOf('\u2234') >= 0; }).length;
  var open = document.querySelectorAll('[data-state=open]').length;
  var box = Array.prototype.slice.call(document.querySelectorAll('div')).filter(function(d){ return d.className && String(d.className).indexOf('border-dashed') >= 0 && /Answer/i.test(d.textContent.slice(0, 40)); }).length;
  return '5.1 Sol. pills: ' + sol + ' | KaTeX with \u2234: ' + th + ' | open collapsibles: ' + open + ' | legacy Answer boxes: ' + box;
})()
" 2>/dev/null | head -2
agent-browser screenshot /tmp/cengage-e2e/desktop-5-1-quiz.png >/dev/null 2>&1 || true
# mobile 390px on the new lesson
agent-browser set viewport 390 844 >/dev/null 2>&1
agent-browser open "$BASE/fm-decimal-places-and-the-point" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var de = document.scrollingElement;
  var art = document.querySelector('article');
  return '5.1 mobile: docScrollW=' + de.scrollWidth + ' overflowX=' + (de.scrollWidth > 390 ? 'YES' : 'none') + ' articleW=' + (art ? art.getBoundingClientRect().width : 'n/a');
})()
" 2>/dev/null | head -2
agent-browser screenshot /tmp/cengage-e2e/mobile-5-1.png >/dev/null 2>&1 || true
agent-browser set viewport 1440 900 >/dev/null 2>&1
ls -la /tmp/cengage-e2e/*5-1*.png 2>/dev/null | head -4

# ---- lesson 5.2 dedicated: quiz live + all solutions expand + mobile 390px (run 22) ----
agent-browser set viewport 1280 900 >/dev/null 2>&1
agent-browser open "$BASE/fm-decimals-and-fractions-two-ways" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
# click the correct-index option per quiz (verify AC5: indices 0/2/2/1/0)
agent-browser eval "
(function(){
  var quizSec = Array.prototype.slice.call(document.querySelectorAll('section')).find(function(s){
    var h = s.querySelector('header'); return h && /CHECK YOURSELF/i.test(h.textContent);
  });
  if (!quizSec) return 'NO QUIZ SECTION';
  var correct = [0, 2, 2, 1, 0];
  var groups = quizSec.querySelectorAll('div.px-5');
  var clicked = 0;
  groups.forEach(function(qdiv, qi){
    var btns = qdiv.querySelectorAll('button[type=button]');
    var pick = btns[correct[qi]] || btns[0];
    if (pick) { pick.click(); clicked++; }
  });
  return 'clicked ' + clicked + ' correct options; score: ' + (quizSec.textContent.match(/You scored[^\u00b7]*/)||['n/a'])[0].trim();
})()
" 2>/dev/null | head -3
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var links = Array.prototype.slice.call(document.querySelectorAll('button')).filter(function(b){ return /Show solution/.test(b.textContent); });
  var n = links.length;
  links.forEach(function(b){ b.click(); });
  return 'expanded ' + n + ' solutions of 12';
})()
" 2>/dev/null | head -2
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var sol = Array.prototype.slice.call(document.querySelectorAll('span')).filter(function(s){ return s.textContent.trim()==='Sol.'; }).length;
  var th = Array.prototype.slice.call(document.querySelectorAll('.katex')).filter(function(k){ return k.textContent.indexOf('\u2234') >= 0; }).length;
  var open = document.querySelectorAll('[data-state=open]').length;
  var figs = document.querySelectorAll('figure svg, svg[role=img]').length;
  return '5.2 Sol. pills: ' + sol + ' | KaTeX with \u2234: ' + th + ' | open collapsibles: ' + open + ' | svg figures: ' + figs;
})()
" 2>/dev/null | head -2
agent-browser screenshot /tmp/cengage-e2e/desktop-5-2-quiz.png >/dev/null 2>&1 || true
agent-browser eval "window.scrollBy(0, 2400)" >/dev/null 2>&1 || true
agent-browser wait 400 >/dev/null 2>&1 || true
agent-browser screenshot /tmp/cengage-e2e/desktop-5-2-carousel.png >/dev/null 2>&1 || true
# mobile 390px on the new lesson
agent-browser set viewport 390 844 >/dev/null 2>&1
agent-browser open "$BASE/fm-decimals-and-fractions-two-ways" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var de = document.scrollingElement;
  var art = document.querySelector('article');
  return '5.2 mobile: docScrollW=' + de.scrollWidth + ' overflowX=' + (de.scrollWidth > 390 ? 'YES' : 'none') + ' articleW=' + (art ? art.getBoundingClientRect().width : 'n/a');
})()
" 2>/dev/null | head -2
agent-browser screenshot /tmp/cengage-e2e/mobile-5-2.png >/dev/null 2>&1 || true
agent-browser set viewport 1440 900 >/dev/null 2>&1
ls -la /tmp/cengage-e2e/*5-2*.png 2>/dev/null | head -4
echo "done"

# ---- lesson 5.3 dedicated: quiz live + all solutions expand + mobile 390px (run 23) ----
agent-browser set viewport 1280 900 >/dev/null 2>&1
agent-browser open "$BASE/fm-operating-on-decimals" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
# click the correct-index option per quiz (verify AJ5: indices 2/1/2/0/1)
agent-browser eval "
(function(){
  var quizSec = Array.prototype.slice.call(document.querySelectorAll('section')).find(function(s){
    var h = s.querySelector('header'); return h && /CHECK YOURSELF/i.test(h.textContent);
  });
  if (!quizSec) return 'NO QUIZ SECTION';
  var correct = [2, 1, 2, 0, 1];
  var groups = quizSec.querySelectorAll('div.px-5');
  var clicked = 0;
  groups.forEach(function(qdiv, qi){
    var btns = qdiv.querySelectorAll('button[type=button]');
    var pick = btns[correct[qi]] || btns[0];
    if (pick) { pick.click(); clicked++; }
  });
  return 'clicked ' + clicked + ' correct options; score: ' + (quizSec.textContent.match(/You scored[^\u00b7]*/)||['n/a'])[0].trim();
})()
" 2>/dev/null | head -3
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var links = Array.prototype.slice.call(document.querySelectorAll('button')).filter(function(b){ return /Show solution/.test(b.textContent); });
  var n = links.length;
  links.forEach(function(b){ b.click(); });
  return 'expanded ' + n + ' solutions of 12';
})()
" 2>/dev/null | head -2
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var sol = Array.prototype.slice.call(document.querySelectorAll('span')).filter(function(s){ return s.textContent.trim()==='Sol.'; }).length;
  var th = Array.prototype.slice.call(document.querySelectorAll('.katex')).filter(function(k){ return k.textContent.indexOf('\u2234') >= 0; }).length;
  var open = document.querySelectorAll('[data-state=open]').length;
  var figs = document.querySelectorAll('figure svg, svg[role=img]').length;
  var der = document.querySelectorAll('.lesson-body ol').length;
  return '5.3 Sol. pills: ' + sol + ' | KaTeX with \u2234: ' + th + ' | open collapsibles: ' + open + ' | svg figures: ' + figs;
})()
" 2>/dev/null | head -2
agent-browser screenshot /tmp/cengage-e2e/desktop-5-3-quiz.png >/dev/null 2>&1 || true
# scroll to the ladder figure and the tableau figure
agent-browser eval "
(function(){
  var figs = document.querySelectorAll('figure');
  if (figs[0]) figs[0].scrollIntoView({block: 'center'});
  return 'scrolled to figure 1 of ' + figs.length;
})()
" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot /tmp/cengage-e2e/desktop-5-3-ladder.png >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var figs = document.querySelectorAll('figure');
  if (figs[1]) figs[1].scrollIntoView({block: 'center'});
  return 'scrolled to figure 2';
})()
" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot /tmp/cengage-e2e/desktop-5-3-tableau.png >/dev/null 2>&1 || true
# mobile 390px on the new lesson
agent-browser set viewport 390 844 >/dev/null 2>&1
agent-browser open "$BASE/fm-operating-on-decimals" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var de = document.scrollingElement;
  var art = document.querySelector('article');
  return '5.3 mobile: docScrollW=' + de.scrollWidth + ' overflowX=' + (de.scrollWidth > 390 ? 'YES' : 'none') + ' articleW=' + (art ? art.getBoundingClientRect().width : 'n/a');
})()
" 2>/dev/null | head -2
agent-browser screenshot /tmp/cengage-e2e/mobile-5-3.png >/dev/null 2>&1 || true
agent-browser set viewport 1440 900 >/dev/null 2>&1
ls -la /tmp/cengage-e2e/*5-3*.png 2>/dev/null | head -6
echo "done-5-3"

# ---- lesson 5.4 dedicated: quiz live + all solutions expand + mobile 390px (run 24) ----
agent-browser set viewport 1280 900 >/dev/null 2>&1
agent-browser open "$BASE/fm-percent-and-its-meaning" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
# click the correct-index option per quiz (verify BS5: indices 0/1/1/2/2)
agent-browser eval "
(function(){
  var quizSec = Array.prototype.slice.call(document.querySelectorAll('section')).find(function(s){
    var h = s.querySelector('header'); return h && /CHECK YOURSELF/i.test(h.textContent);
  });
  if (!quizSec) return 'NO QUIZ SECTION';
  var correct = [0, 1, 1, 2, 2];
  var groups = quizSec.querySelectorAll('div.px-5');
  var clicked = 0;
  groups.forEach(function(qdiv, qi){
    var btns = qdiv.querySelectorAll('button[type=button]');
    var pick = btns[correct[qi]] || btns[0];
    if (pick) { pick.click(); clicked++; }
  });
  return 'clicked ' + clicked + ' correct options';
})()
" 2>/dev/null | head -3
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var quizSec = Array.prototype.slice.call(document.querySelectorAll('section')).find(function(s){
    var h = s.querySelector('header'); return h && /CHECK YOURSELF/i.test(h.textContent);
  });
  return 'score: ' + (quizSec ? (quizSec.textContent.match(/You scored[^·]*/)||['n/a'])[0].trim() : 'no quiz');
})()
" 2>/dev/null | head -3
agent-browser eval "
(function(){
  var links = Array.prototype.slice.call(document.querySelectorAll('button')).filter(function(b){ return /Show solution/.test(b.textContent); });
  var n = links.length;
  links.forEach(function(b){ b.click(); });
  return 'expanded ' + n + ' solutions of 12';
})()
" 2>/dev/null | head -2
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var sol = Array.prototype.slice.call(document.querySelectorAll('span')).filter(function(s){ return s.textContent.trim()==='Sol.'; }).length;
  var th = Array.prototype.slice.call(document.querySelectorAll('.katex')).filter(function(k){ return k.textContent.indexOf('\u2234') >= 0; }).length;
  var open = document.querySelectorAll('[data-state=open]').length;
  var figs = document.querySelectorAll('figure svg, svg[role=img]').length;
  return '5.4 Sol. pills: ' + sol + ' | KaTeX with \u2234: ' + th + ' | open collapsibles: ' + open + ' | svg figures: ' + figs;
})()
" 2>/dev/null | head -2
agent-browser screenshot /tmp/cengage-e2e/desktop-5-4-quiz.png >/dev/null 2>&1 || true
# scroll to the 100-square figure and the conversion map figure
agent-browser eval "
(function(){
  var figs = document.querySelectorAll('figure');
  if (figs[0]) figs[0].scrollIntoView({block: 'center'});
  return 'scrolled to figure 1 of ' + figs.length;
})()
" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot /tmp/cengage-e2e/desktop-5-4-square.png >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var figs = document.querySelectorAll('figure');
  if (figs[1]) figs[1].scrollIntoView({block: 'center'});
  return 'scrolled to figure 2';
})()
" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot /tmp/cengage-e2e/desktop-5-4-map.png >/dev/null 2>&1 || true
# mobile 390px on the new lesson
agent-browser set viewport 390 844 >/dev/null 2>&1
agent-browser open "$BASE/fm-percent-and-its-meaning" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var de = document.scrollingElement;
  var art = document.querySelector('article');
  return '5.4 mobile: docScrollW=' + de.scrollWidth + ' overflowX=' + (de.scrollWidth > 390 ? 'YES' : 'none') + ' articleW=' + (art ? art.getBoundingClientRect().width : 'n/a');
})()
" 2>/dev/null | head -2
agent-browser screenshot /tmp/cengage-e2e/mobile-5-4.png >/dev/null 2>&1 || true
agent-browser set viewport 1440 900 >/dev/null 2>&1
ls -la /tmp/cengage-e2e/*5-4*.png 2>/dev/null | head -6
echo "done-5-4"

# ---- lesson 5.5 dedicated: quiz live + all solutions expand + mobile 390px (run 25) ----
agent-browser set viewport 1280 900 >/dev/null 2>&1
agent-browser open "$BASE/fm-percentage-change-discounts-simple-interest" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
# click the correct-index option per quiz (verify CC5: indices 0/1/1/2/3)
agent-browser eval "
(function(){
  var quizSec = Array.prototype.slice.call(document.querySelectorAll('section')).find(function(s){
    var h = s.querySelector('header'); return h && /CHECK YOURSELF/i.test(h.textContent);
  });
  if (!quizSec) return 'NO QUIZ SECTION';
  var correct = [0, 1, 1, 2, 3];
  var groups = quizSec.querySelectorAll('div.px-5');
  var clicked = 0;
  groups.forEach(function(qdiv, qi){
    var btns = qdiv.querySelectorAll('button[type=button]');
    var pick = btns[correct[qi]] || btns[0];
    if (pick) { pick.click(); clicked++; }
  });
  return 'clicked ' + clicked + ' correct options';
})()
" 2>/dev/null | head -3
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var quizSec = Array.prototype.slice.call(document.querySelectorAll('section')).find(function(s){
    var h = s.querySelector('header'); return h && /CHECK YOURSELF/i.test(h.textContent);
  });
  return 'score: ' + (quizSec ? (quizSec.textContent.match(/You scored[^·]*/)||['n/a'])[0].trim() : 'no quiz');
})()
" 2>/dev/null | head -3
agent-browser eval "
(function(){
  var links = Array.prototype.slice.call(document.querySelectorAll('button')).filter(function(b){ return /Show solution/.test(b.textContent); });
  var n = links.length;
  links.forEach(function(b){ b.click(); });
  return 'expanded ' + n + ' solutions of 12';
})()
" 2>/dev/null | head -2
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var sol = Array.prototype.slice.call(document.querySelectorAll('span')).filter(function(s){ return s.textContent.trim()==='Sol.'; }).length;
  var th = Array.prototype.slice.call(document.querySelectorAll('.katex')).filter(function(k){ return k.textContent.indexOf('\u2234') >= 0; }).length;
  var open = document.querySelectorAll('[data-state=open]').length;
  var figs = document.querySelectorAll('figure svg, svg[role=img]').length;
  return '5.5 Sol. pills: ' + sol + ' | KaTeX with \u2234: ' + th + ' | open collapsibles: ' + open + ' | svg figures: ' + figs;
})()
" 2>/dev/null | head -2
agent-browser screenshot /tmp/cengage-e2e/desktop-5-5-quiz.png >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var figs = document.querySelectorAll('figure');
  if (figs[0]) figs[0].scrollIntoView({block: 'center'});
  return 'scrolled to figure 1 of ' + figs.length;
})()
" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot /tmp/cengage-e2e/desktop-5-5-roundtrip.png >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var figs = document.querySelectorAll('figure');
  if (figs[1]) figs[1].scrollIntoView({block: 'center'});
  return 'scrolled to figure 2';
})()
" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot /tmp/cengage-e2e/desktop-5-5-twolane.png >/dev/null 2>&1 || true
agent-browser set viewport 390 844 >/dev/null 2>&1
agent-browser open "$BASE/fm-percentage-change-discounts-simple-interest" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var de = document.scrollingElement;
  var art = document.querySelector('article');
  return '5.5 mobile: docScrollW=' + de.scrollWidth + ' overflowX=' + (de.scrollWidth > 390 ? 'YES' : 'none') + ' articleW=' + (art ? art.getBoundingClientRect().width : 'n/a');
})()
" 2>/dev/null | head -2
agent-browser screenshot /tmp/cengage-e2e/mobile-5-5.png >/dev/null 2>&1 || true
agent-browser set viewport 1440 900 >/dev/null 2>&1
ls -la /tmp/cengage-e2e/*5-5*.png 2>/dev/null | head -6
echo "done-5-5"

# ---- lesson 6.1 dedicated: quiz live + all solutions expand + mobile 390px (run 26) ----
agent-browser set viewport 1280 900 >/dev/null 2>&1
agent-browser open "$BASE/fm-ratio-as-a-comparison" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
# click the correct-index option per quiz (verify I10: indices 2/1/3/2/0)
agent-browser eval "
(function(){
  var quizSec = Array.prototype.slice.call(document.querySelectorAll('section')).find(function(s){
    var h = s.querySelector('header'); return h && /CHECK YOURSELF/i.test(h.textContent);
  });
  if (!quizSec) return 'NO QUIZ SECTION';
  var correct = [2, 1, 3, 2, 0];
  var groups = quizSec.querySelectorAll('div.px-5');
  var clicked = 0;
  groups.forEach(function(qdiv, qi){
    var btns = qdiv.querySelectorAll('button[type=button]');
    var pick = btns[correct[qi]] || btns[0];
    if (pick) { pick.click(); clicked++; }
  });
  return 'clicked ' + clicked + ' correct options';
})()
" 2>/dev/null | head -3
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var quizSec = Array.prototype.slice.call(document.querySelectorAll('section')).find(function(s){
    var h = s.querySelector('header'); return h && /CHECK YOURSELF/i.test(h.textContent);
  });
  return 'score: ' + (quizSec ? (quizSec.textContent.match(/You scored[^·]*/)||['n/a'])[0].trim() : 'no quiz');
})()
" 2>/dev/null | head -3
agent-browser eval "
(function(){
  var links = Array.prototype.slice.call(document.querySelectorAll('button')).filter(function(b){ return /Show solution/.test(b.textContent); });
  var n = links.length;
  links.forEach(function(b){ b.click(); });
  return 'expanded ' + n + ' solutions of 12';
})()
" 2>/dev/null | head -2
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var sol = Array.prototype.slice.call(document.querySelectorAll('span')).filter(function(s){ return s.textContent.trim()==='Sol.'; }).length;
  var th = Array.prototype.slice.call(document.querySelectorAll('.katex')).filter(function(k){ return k.textContent.indexOf('\u2234') >= 0; }).length;
  var open = document.querySelectorAll('[data-state=open]').length;
  var figs = document.querySelectorAll('figure svg, svg[role=img]').length;
  return '6.1 Sol. pills: ' + sol + ' | KaTeX with \u2234: ' + th + ' | open collapsibles: ' + open + ' | svg figures: ' + figs;
})()
" 2>/dev/null | head -2
agent-browser screenshot /tmp/cengage-e2e/desktop-6-1-quiz.png >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var figs = document.querySelectorAll('figure');
  if (figs[0]) figs[0].scrollIntoView({block: 'center'});
  return 'scrolled to figure 1 of ' + figs.length;
})()
" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot /tmp/cengage-e2e/desktop-6-1-family.png >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var figs = document.querySelectorAll('figure');
  if (figs[1]) figs[1].scrollIntoView({block: 'center'});
  return 'scrolled to figure 2';
})()
" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot /tmp/cengage-e2e/desktop-6-1-sharing.png >/dev/null 2>&1 || true
agent-browser set viewport 390 844 >/dev/null 2>&1
agent-browser open "$BASE/fm-ratio-as-a-comparison" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var de = document.scrollingElement;
  var art = document.querySelector('article');
  return '6.1 mobile: docScrollW=' + de.scrollWidth + ' overflowX=' + (de.scrollWidth > 390 ? 'YES' : 'none') + ' articleW=' + (art ? art.getBoundingClientRect().width : 'n/a');
})()
" 2>/dev/null | head -2
agent-browser screenshot /tmp/cengage-e2e/mobile-6-1.png >/dev/null 2>&1 || true
agent-browser set viewport 1440 900 >/dev/null 2>&1
ls -la /tmp/cengage-e2e/*6-1*.png 2>/dev/null | head -6
echo "done-6-1"

# ---- lesson 6.2 dedicated: quiz live + all solutions expand + mobile 390px (run 27) ----
agent-browser set viewport 1280 900 >/dev/null 2>&1
agent-browser open "$BASE/fm-rates-and-unit-rates" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
# click the correct-index option per quiz (verify S6: indices 1/0/1/2/1)
agent-browser eval "
(function(){
  var quizSec = Array.prototype.slice.call(document.querySelectorAll('section')).find(function(s){
    var h = s.querySelector('header'); return h && /CHECK YOURSELF/i.test(h.textContent);
  });
  if (!quizSec) return 'NO QUIZ SECTION';
  var correct = [1, 0, 1, 2, 1];
  var groups = quizSec.querySelectorAll('div.px-5');
  var clicked = 0;
  groups.forEach(function(qdiv, qi){
    var btns = qdiv.querySelectorAll('button[type=button]');
    var pick = btns[correct[qi]] || btns[0];
    if (pick) { pick.click(); clicked++; }
  });
  return 'clicked ' + clicked + ' correct options';
})()
" 2>/dev/null | head -3
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var quizSec = Array.prototype.slice.call(document.querySelectorAll('section')).find(function(s){
    var h = s.querySelector('header'); return h && /CHECK YOURSELF/i.test(h.textContent);
  });
  return 'score: ' + (quizSec ? (quizSec.textContent.match(/You scored[^·]*/)||['n/a'])[0].trim() : 'no quiz');
})()
" 2>/dev/null | head -3
agent-browser eval "
(function(){
  var links = Array.prototype.slice.call(document.querySelectorAll('button')).filter(function(b){ return /Show solution/.test(b.textContent); });
  var n = links.length;
  links.forEach(function(b){ b.click(); });
  return 'expanded ' + n + ' solutions of 12';
})()
" 2>/dev/null | head -2
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var sol = Array.prototype.slice.call(document.querySelectorAll('span')).filter(function(s){ return s.textContent.trim()==='Sol.'; }).length;
  var th = Array.prototype.slice.call(document.querySelectorAll('.katex')).filter(function(k){ return k.textContent.indexOf('\u2234') >= 0; }).length;
  var open = document.querySelectorAll('[data-state=open]').length;
  var figs = document.querySelectorAll('figure svg, svg[role=img]').length;
  return '6.2 Sol. pills: ' + sol + ' | KaTeX with \u2234: ' + th + ' | open collapsibles: ' + open + ' | svg figures: ' + figs;
})()
" 2>/dev/null | head -2
agent-browser screenshot /tmp/cengage-e2e/desktop-6-2-quiz.png >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var figs = document.querySelectorAll('figure');
  if (figs[0]) figs[0].scrollIntoView({block: 'center'});
  return 'scrolled to figure 1 of ' + figs.length;
})()
" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot /tmp/cengage-e2e/desktop-6-2-rulers.png >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var figs = document.querySelectorAll('figure');
  if (figs[1]) figs[1].scrollIntoView({block: 'center'});
  return 'scrolled to figure 2';
})()
" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot /tmp/cengage-e2e/desktop-6-2-journey.png >/dev/null 2>&1 || true
agent-browser set viewport 390 844 >/dev/null 2>&1
agent-browser open "$BASE/fm-rates-and-unit-rates" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var de = document.scrollingElement;
  var art = document.querySelector('article');
  return '6.2 mobile: docScrollW=' + de.scrollWidth + ' overflowX=' + (de.scrollWidth > 390 ? 'YES' : 'none') + ' articleW=' + (art ? art.getBoundingClientRect().width : 'n/a');
})()
" 2>/dev/null | head -2
agent-browser screenshot /tmp/cengage-e2e/mobile-6-2.png >/dev/null 2>&1 || true
agent-browser set viewport 1440 900 >/dev/null 2>&1
ls -la /tmp/cengage-e2e/*6-2*.png 2>/dev/null | head -6
echo "done-6-2"

# ---- lesson 6.3 dedicated: quiz live + all solutions expand + mobile 390px (run 29) ----
agent-browser set viewport 1280 900 >/dev/null 2>&1
agent-browser open "$BASE/fm-proportion-and-cross-multiplication" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
# click the correct-index option per quiz (verify AC6: indices 0/1/2/3/2)
agent-browser eval "
(function(){
  var quizSec = Array.prototype.slice.call(document.querySelectorAll('section')).find(function(s){
    var h = s.querySelector('header'); return h && /CHECK YOURSELF/i.test(h.textContent);
  });
  if (!quizSec) return 'NO QUIZ SECTION';
  var correct = [0, 1, 2, 3, 2];
  var groups = quizSec.querySelectorAll('div.px-5');
  var clicked = 0;
  groups.forEach(function(qdiv, qi){
    var btns = qdiv.querySelectorAll('button[type=button]');
    var pick = btns[correct[qi]] || btns[0];
    if (pick) { pick.click(); clicked++; }
  });
  return 'clicked ' + clicked + ' correct options';
})()
" 2>/dev/null | head -3
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var quizSec = Array.prototype.slice.call(document.querySelectorAll('section')).find(function(s){
    var h = s.querySelector('header'); return h && /CHECK YOURSELF/i.test(h.textContent);
  });
  return 'score: ' + (quizSec ? (quizSec.textContent.match(/You scored[^·]*/)||['n/a'])[0].trim() : 'no quiz');
})()
" 2>/dev/null | head -3
agent-browser eval "
(function(){
  var links = Array.prototype.slice.call(document.querySelectorAll('button')).filter(function(b){ return /Show solution/.test(b.textContent); });
  var n = links.length;
  links.forEach(function(b){ b.click(); });
  return 'expanded ' + n + ' solutions of 12';
})()
" 2>/dev/null | head -2
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var sol = Array.prototype.slice.call(document.querySelectorAll('span')).filter(function(s){ return s.textContent.trim()==='Sol.'; }).length;
  var th = Array.prototype.slice.call(document.querySelectorAll('.katex')).filter(function(k){ return k.textContent.indexOf('\u2234') >= 0; }).length;
  var open = document.querySelectorAll('[data-state=open]').length;
  var figs = document.querySelectorAll('figure svg, svg[role=img]').length;
  return '6.3 Sol. pills: ' + sol + ' | KaTeX with \u2234: ' + th + ' | open collapsibles: ' + open + ' | svg figures: ' + figs;
})()
" 2>/dev/null | head -2
agent-browser screenshot /tmp/cengage-e2e/desktop-6-3-quiz.png >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var figs = document.querySelectorAll('figure');
  if (figs[0]) figs[0].scrollIntoView({block: 'center'});
  return 'scrolled to figure 1 of ' + figs.length;
})()
" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot /tmp/cengage-e2e/desktop-6-3-seats.png >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var figs = document.querySelectorAll('figure');
  if (figs[1]) figs[1].scrollIntoView({block: 'center'});
  return 'scrolled to figure 2';
})()
" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot /tmp/cengage-e2e/desktop-6-3-line.png >/dev/null 2>&1 || true
agent-browser set viewport 390 844 >/dev/null 2>&1
agent-browser open "$BASE/fm-proportion-and-cross-multiplication" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var de = document.scrollingElement;
  var art = document.querySelector('article');
  return '6.3 mobile: docScrollW=' + de.scrollWidth + ' overflowX=' + (de.scrollWidth > 390 ? 'YES' : 'none') + ' articleW=' + (art ? art.getBoundingClientRect().width : 'n/a');
})()
" 2>/dev/null | head -2
agent-browser screenshot /tmp/cengage-e2e/mobile-6-3.png >/dev/null 2>&1 || true
agent-browser set viewport 1440 900 >/dev/null 2>&1
ls -la /tmp/cengage-e2e/*6-3*.png 2>/dev/null | head -6
echo "done-6-3"

# ---- lesson 6.4 dedicated: quiz live + all solutions expand + mobile 390px (run 30) ----
agent-browser set viewport 1280 900 >/dev/null 2>&1
agent-browser open "$BASE/fm-direct-and-inverse-variation" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
# click the correct-index option per quiz (verify AN6: indices 2/1/1/2/1)
agent-browser eval "
(function(){
  var quizSec = Array.prototype.slice.call(document.querySelectorAll('section')).find(function(s){
    var h = s.querySelector('header'); return h && /CHECK YOURSELF/i.test(h.textContent);
  });
  if (!quizSec) return 'NO QUIZ SECTION';
  var correct = [2, 1, 1, 2, 1];
  var groups = quizSec.querySelectorAll('div.px-5');
  var clicked = 0;
  groups.forEach(function(qdiv, qi){
    var btns = qdiv.querySelectorAll('button[type=button]');
    var pick = btns[correct[qi]] || btns[0];
    if (pick) { pick.click(); clicked++; }
  });
  return 'clicked ' + clicked + ' correct options';
})()
" 2>/dev/null | head -3
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var quizSec = Array.prototype.slice.call(document.querySelectorAll('section')).find(function(s){
    var h = s.querySelector('header'); return h && /CHECK YOURSELF/i.test(h.textContent);
  });
  return 'score: ' + (quizSec ? (quizSec.textContent.match(/You scored[^·]*/)||['n/a'])[0].trim() : 'no quiz');
})()
" 2>/dev/null | head -3
agent-browser eval "
(function(){
  var links = Array.prototype.slice.call(document.querySelectorAll('button')).filter(function(b){ return /Show solution/.test(b.textContent); });
  var n = links.length;
  links.forEach(function(b){ b.click(); });
  return 'expanded ' + n + ' solutions of 12';
})()
" 2>/dev/null | head -2
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var sol = Array.prototype.slice.call(document.querySelectorAll('span')).filter(function(s){ return s.textContent.trim()==='Sol.'; }).length;
  var th = Array.prototype.slice.call(document.querySelectorAll('.katex')).filter(function(k){ return k.textContent.indexOf('\u2234') >= 0; }).length;
  var open = document.querySelectorAll('[data-state=open]').length;
  var figs = document.querySelectorAll('figure svg, svg[role=img]').length;
  return '6.4 Sol. pills: ' + sol + ' | KaTeX with \u2234: ' + th + ' | open collapsibles: ' + open + ' | svg figures: ' + figs;
})()
" 2>/dev/null | head -2
agent-browser screenshot /tmp/cengage-e2e/desktop-6-4-quiz.png >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var figs = document.querySelectorAll('figure');
  if (figs[0]) figs[0].scrollIntoView({block: 'center'});
  return 'scrolled to figure 1 of ' + figs.length;
})()
" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot /tmp/cengage-e2e/desktop-6-4-panels.png >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var figs = document.querySelectorAll('figure');
  if (figs[1]) figs[1].scrollIntoView({block: 'center'});
  return 'scrolled to figure 2';
})()
" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot /tmp/cengage-e2e/desktop-6-4-flip.png >/dev/null 2>&1 || true
agent-browser set viewport 390 844 >/dev/null 2>&1
agent-browser open "$BASE/fm-direct-and-inverse-variation" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var de = document.scrollingElement;
  var art = document.querySelector('article');
  return '6.4 mobile: docScrollW=' + de.scrollWidth + ' overflowX=' + (de.scrollWidth > 390 ? 'YES' : 'none') + ' articleW=' + (art ? art.getBoundingClientRect().width : 'n/a');
})()
" 2>/dev/null | head -2
agent-browser screenshot /tmp/cengage-e2e/mobile-6-4.png >/dev/null 2>&1 || true
agent-browser set viewport 1440 900 >/dev/null 2>&1
ls -la /tmp/cengage-e2e/*6-4*.png 2>/dev/null | head -6
echo "done-6-4"

# ---- lesson 6.5 dedicated: quiz live + all solutions expand + mobile 390px (run 32) ----
agent-browser set viewport 1280 900 >/dev/null 2>&1
agent-browser open "$BASE/fm-scaling-maps-models-and-recipes" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
# click the correct-index option per quiz (verify AW6: indices 0/1/0/2/1)
agent-browser eval "
(function(){
  var quizSec = Array.prototype.slice.call(document.querySelectorAll('section')).find(function(s){
    var h = s.querySelector('header'); return h && /CHECK YOURSELF/i.test(h.textContent);
  });
  if (!quizSec) return 'NO QUIZ SECTION';
  var correct = [0, 1, 0, 2, 1];
  var groups = quizSec.querySelectorAll('div.px-5');
  var clicked = 0;
  groups.forEach(function(qdiv, qi){
    var btns = qdiv.querySelectorAll('button[type=button]');
    var pick = btns[correct[qi]] || btns[0];
    if (pick) { pick.click(); clicked++; }
  });
  return 'clicked ' + clicked + ' correct options';
})()
" 2>/dev/null | head -3
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var quizSec = Array.prototype.slice.call(document.querySelectorAll('section')).find(function(s){
    var h = s.querySelector('header'); return h && /CHECK YOURSELF/i.test(h.textContent);
  });
  return 'score: ' + (quizSec ? (quizSec.textContent.match(/You scored[^·]*/)||['n/a'])[0].trim() : 'no quiz');
})()
" 2>/dev/null | head -3
agent-browser eval "
(function(){
  var links = Array.prototype.slice.call(document.querySelectorAll('button')).filter(function(b){ return /Show solution/.test(b.textContent); });
  var n = links.length;
  links.forEach(function(b){ b.click(); });
  return 'expanded ' + n + ' solutions of 12';
})()
" 2>/dev/null | head -2
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var sol = Array.prototype.slice.call(document.querySelectorAll('span')).filter(function(s){ return s.textContent.trim()==='Sol.'; }).length;
  var th = Array.prototype.slice.call(document.querySelectorAll('.katex')).filter(function(k){ return k.textContent.indexOf('\u2234') >= 0; }).length;
  var open = document.querySelectorAll('[data-state=open]').length;
  var figs = document.querySelectorAll('figure svg, svg[role=img]').length;
  var katexAll = document.querySelectorAll('.lesson-body .katex').length;
  var tbl = document.querySelectorAll('.lesson-body table').length;
  return '6.5 Sol. pills: ' + sol + ' | KaTeX with \u2234: ' + th + ' | katex nodes: ' + katexAll + ' | tables: ' + tbl + ' | open collapsibles: ' + open + ' | svg figures: ' + figs;
})()
" 2>/dev/null | head -2
agent-browser screenshot /tmp/cengage-e2e/desktop-6-5-quiz.png >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var figs = document.querySelectorAll('figure');
  if (figs[0]) figs[0].scrollIntoView({block: 'center'});
  return 'scrolled to figure 1 of ' + figs.length;
})()
" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot /tmp/cengage-e2e/desktop-6-5-atlas.png >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var figs = document.querySelectorAll('figure');
  if (figs[1]) figs[1].scrollIntoView({block: 'center'});
  return 'scrolled to figure 2';
})()
" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot /tmp/cengage-e2e/desktop-6-5-bars.png >/dev/null 2>&1 || true
agent-browser set viewport 390 844 >/dev/null 2>&1
agent-browser open "$BASE/fm-scaling-maps-models-and-recipes" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var de = document.scrollingElement;
  var art = document.querySelector('article');
  return '6.5 mobile: docScrollW=' + de.scrollWidth + ' overflowX=' + (de.scrollWidth > 390 ? 'YES' : 'none') + ' articleW=' + (art ? art.getBoundingClientRect().width : 'n/a');
})()
" 2>/dev/null | head -2
agent-browser screenshot /tmp/cengage-e2e/mobile-6-5.png >/dev/null 2>&1 || true
agent-browser set viewport 1440 900 >/dev/null 2>&1
ls -la /tmp/cengage-e2e/*6-5*.png 2>/dev/null | head -6
echo "done-6-5"

# ---- lesson 7.2 dedicated: quiz live + all solutions expand + mobile 390px (run 34) ----
agent-browser set viewport 1280 900 >/dev/null 2>&1
agent-browser open "$BASE/fm-adding-subtracting-integers" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
# click the intended correct option of every quiz question (verify Q1-Q6 keys: 0/1/2/0/3)
agent-browser eval "
(function(){
  var quizSec = Array.prototype.slice.call(document.querySelectorAll('section')).find(function(s){
    var h = s.querySelector('header'); return h && /CHECK YOURSELF/i.test(h.textContent);
  });
  if (!quizSec) return 'NO QUIZ SECTION';
  var correct = [0, 1, 2, 0, 3];
  var groups = quizSec.querySelectorAll('div.px-5');
  var clicked = 0;
  groups.forEach(function(qdiv, qi){
    var btns = qdiv.querySelectorAll('button[type=button]');
    var pick = btns[correct[qi]] || btns[0];
    if (pick) { pick.click(); clicked++; }
  });
  return 'clicked ' + clicked + ' correct options; score: ' + (quizSec.textContent.match(/You scored[^\u00b7]*/)||['n/a'])[0].trim();
})()
" 2>/dev/null | head -3
agent-browser wait 800 >/dev/null 2>&1 || true
# expand every exercise solution and count the chain parts
agent-browser eval "
(function(){
  var links = Array.prototype.slice.call(document.querySelectorAll('button')).filter(function(b){ return /Show solution/.test(b.textContent); });
  var n = links.length;
  links.forEach(function(b){ b.click(); });
  return 'expanded ' + n + ' solutions of 12';
})()
" 2>/dev/null | head -2
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var sol = Array.prototype.slice.call(document.querySelectorAll('span')).filter(function(s){ return s.textContent.trim()==='Sol.'; }).length;
  var th = Array.prototype.slice.call(document.querySelectorAll('.katex')).filter(function(k){ return k.textContent.indexOf('\u2234') >= 0; }).length;
  var open = document.querySelectorAll('[data-state=open]').length;
  var figs = document.querySelectorAll('figure svg').length;
  var katexAll = document.querySelectorAll('.lesson-body .katex').length;
  var tbl = document.querySelectorAll('.lesson-body table').length;
  var dtext = Array.prototype.slice.call(document.querySelectorAll('.lesson-body p, .lesson-body h2, .lesson-body li, .lesson-body td, .lesson-body th')).filter(function(el){ return !el.querySelector('.katex') && el.textContent.indexOf('$') >= 0; }).length;
  return '7.2 Sol. pills: ' + sol + ' | KaTeX with \u2234: ' + th + ' | katex nodes: ' + katexAll + ' | tables: ' + tbl + ' | svg figures: ' + figs + ' | open collapsibles: ' + open + ' | raw-dollar text nodes: ' + dtext;
})()
" 2>/dev/null | head -2
agent-browser screenshot /tmp/cengage-e2e/desktop-7-2-quiz.png >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var figs = document.querySelectorAll('figure svg');
  if (figs[0]) figs[0].scrollIntoView({block: 'center'});
  return 'scrolled to figure 1 of ' + figs.length;
})()
" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot /tmp/cengage-e2e/desktop-7-2-fig1.png >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var figs = document.querySelectorAll('figure svg');
  if (figs[1]) figs[1].scrollIntoView({block: 'center'});
  return 'scrolled to figure 2';
})()
" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot /tmp/cengage-e2e/desktop-7-2-fig2.png >/dev/null 2>&1 || true
agent-browser set viewport 390 844 >/dev/null 2>&1
agent-browser open "$BASE/fm-adding-subtracting-integers" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var de = document.scrollingElement;
  var art = document.querySelector('article');
  return '7.2 mobile: docScrollW=' + de.scrollWidth + ' overflowX=' + (de.scrollWidth > 390 ? 'YES' : 'none') + ' articleW=' + (art ? art.getBoundingClientRect().width : 'n/a');
})()
" 2>/dev/null | head -2
agent-browser screenshot /tmp/cengage-e2e/mobile-7-2.png >/dev/null 2>&1 || true
agent-browser set viewport 1440 900 >/dev/null 2>&1
ls -la /tmp/cengage-e2e/*7-2*.png 2>/dev/null | head -6
echo "done-7-2"

# ---- lesson 8.1 dedicated: quiz live + all solutions expand + figure screenshots + mobile 390px (run 37) ----
agent-browser set viewport 1280 900 >/dev/null 2>&1
agent-browser open "$BASE/fm-points-lines-and-planes" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
# full targeted block (intended quiz keys 3/1/1/2/3)
agent-browser eval "$(cat /home/z/my-project/scripts/e2e-81.page.js)" 2>/dev/null | head -3
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var quizSec = Array.prototype.slice.call(document.querySelectorAll('section')).find(function(s){
    var h = s.querySelector('header'); return h && /CHECK YOURSELF/i.test(h.textContent);
  });
  return '8.1 score: ' + (quizSec ? (quizSec.textContent.match(/You scored[^·]*/)||['n/a'])[0].trim() : 'no quiz');
})()
" 2>/dev/null | head -3
agent-browser eval "
(function(){
  var sol = Array.prototype.slice.call(document.querySelectorAll('span')).filter(function(s){ return s.textContent.trim()==='Sol.'; }).length;
  var th = Array.prototype.slice.call(document.querySelectorAll('.katex')).filter(function(k){ return k.textContent.indexOf('\u2234') >= 0; }).length;
  var open = document.querySelectorAll('[data-state=open]').length;
  var figs = document.querySelectorAll('figure svg, svg[role=img]').length;
  var katexAll = document.querySelectorAll('.lesson-body .katex').length;
  var dtext = Array.prototype.slice.call(document.querySelectorAll('.lesson-body p, .lesson-body h2, .lesson-body li, .lesson-body td, .lesson-body th')).filter(function(el){ return !el.querySelector('.katex') && el.textContent.indexOf('$') >= 0; }).length;
  return '8.1 Sol. pills: ' + sol + ' | KaTeX with \u2234: ' + th + ' | katex nodes: ' + katexAll + ' | svg figures: ' + figs + ' | open collapsibles: ' + open + ' | raw-dollar text nodes: ' + dtext;
})()
" 2>/dev/null | head -2
agent-browser screenshot /tmp/cengage-e2e/desktop-8-1-quiz.png >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var figs = document.querySelectorAll('figure svg');
  if (figs[0]) figs[0].scrollIntoView({block: 'center'});
  return 'scrolled to figure 1 of ' + figs.length;
})()
" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot /tmp/cengage-e2e/desktop-8-1-fig1.png >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var figs = document.querySelectorAll('figure svg');
  if (figs[1]) figs[1].scrollIntoView({block: 'center'});
  return 'scrolled to figure 2';
})()
" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot /tmp/cengage-e2e/desktop-8-1-fig2.png >/dev/null 2>&1 || true
agent-browser set viewport 390 844 >/dev/null 2>&1
agent-browser open "$BASE/fm-points-lines-and-planes" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var de = document.scrollingElement;
  var art = document.querySelector('article');
  return '8.1 mobile: docScrollW=' + de.scrollWidth + ' overflowX=' + (de.scrollWidth > 390 ? 'YES' : 'none') + ' articleW=' + (art ? art.getBoundingClientRect().width : 'n/a');
})()
" 2>/dev/null | head -2
agent-browser screenshot /tmp/cengage-e2e/mobile-8-1.png >/dev/null 2>&1 || true
agent-browser set viewport 1440 900 >/dev/null 2>&1
ls -la /tmp/cengage-e2e/*8-1*.png 2>/dev/null | head -6
echo "done-8-1"

# ---- lesson 8.2 dedicated: quiz live + all solutions expand + figure screenshots + mobile 390px (run 38) ----
agent-browser set viewport 1280 900 >/dev/null 2>&1
agent-browser open "$BASE/fm-angles-and-their-measurement" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
# full targeted block (intended quiz keys 1/1/0/2/2)
agent-browser eval "$(cat /home/z/my-project/scripts/e2e-82.page.js)" 2>/dev/null | head -3
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var quizSec = Array.prototype.slice.call(document.querySelectorAll('section')).find(function(s){
    var h = s.querySelector('header'); return h && /CHECK YOURSELF/i.test(h.textContent);
  });
  return '8.2 score: ' + (quizSec ? (quizSec.textContent.match(/You scored[^·]*/)||['n/a'])[0].trim() : 'no quiz');
})()
" 2>/dev/null | head -3
agent-browser eval "
(function(){
  var sol = Array.prototype.slice.call(document.querySelectorAll('span')).filter(function(s){ return s.textContent.trim()==='Sol.'; }).length;
  var th = Array.prototype.slice.call(document.querySelectorAll('.katex')).filter(function(k){ return k.textContent.indexOf('\u2234') >= 0; }).length;
  var open = document.querySelectorAll('[data-state=open]').length;
  var figs = document.querySelectorAll('figure svg, svg[role=img]').length;
  var katexAll = document.querySelectorAll('.lesson-body .katex').length;
  var dtext = Array.prototype.slice.call(document.querySelectorAll('.lesson-body p, .lesson-body h2, .lesson-body li, .lesson-body td, .lesson-body th')).filter(function(el){ return !el.querySelector('.katex') && el.textContent.indexOf('$') >= 0; }).length;
  var katexErr = document.querySelectorAll('.katex-error').length;
  return '8.2 Sol. pills: ' + sol + ' | KaTeX with \u2234: ' + th + ' | katex nodes: ' + katexAll + ' | svg figures: ' + figs + ' | open collapsibles: ' + open + ' | raw-dollar text nodes: ' + dtext + ' | katex-errors: ' + katexErr;
})()
" 2>/dev/null | head -2
agent-browser screenshot /tmp/cengage-e2e/desktop-8-2-quiz.png >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var figs = document.querySelectorAll('figure svg');
  if (figs[0]) figs[0].scrollIntoView({block: 'center'});
  return 'scrolled to figure 1 of ' + figs.length;
})()
" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot /tmp/cengage-e2e/desktop-8-2-fig1.png >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var figs = document.querySelectorAll('figure svg');
  if (figs[1]) figs[1].scrollIntoView({block: 'center'});
  return 'scrolled to figure 2';
})()
" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser screenshot /tmp/cengage-e2e/desktop-8-2-fig2.png >/dev/null 2>&1 || true
agent-browser set viewport 390 844 >/dev/null 2>&1
agent-browser open "$BASE/fm-angles-and-their-measurement" >/dev/null 2>&1
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
agent-browser eval "
(function(){
  var de = document.scrollingElement;
  var art = document.querySelector('article');
  return '8.2 mobile: docScrollW=' + de.scrollWidth + ' overflowX=' + (de.scrollWidth > 390 ? 'YES' : 'none') + ' articleW=' + (art ? art.getBoundingClientRect().width : 'n/a');
})()
" 2>/dev/null | head -2
agent-browser screenshot /tmp/cengage-e2e/mobile-8-2.png >/dev/null 2>&1 || true
agent-browser set viewport 1440 900 >/dev/null 2>&1
ls -la /tmp/cengage-e2e/*8-2*.png 2>/dev/null | head -6
echo "done-8-2"

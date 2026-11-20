// e2e-aa-5R.page.js — targeted interactivity for Advanced Algebra lesson 5.R
// 'Unit 5 Completion Review' (quiz keys 1/3/0/2/1; prereqs = the six chapter-5
// siblings 5.1 the constant climb, 5.2 the ratio engine + the infinite tail,
// 5.3 the flip + the A.G.P. hybrid, 5.4 the difference census + the
// telescopes, 5.5 the sigma engine + the power sums, 5.6 the recurring
// series + the scale of relation — the six engines the review walks in one
// room under 5.6's recurring umbrella).
var r = {};
var body = document.querySelector('.lesson-body');
r.hasBody = !!body;

var quizSection = Array.prototype.slice
  .call(document.querySelectorAll('section'))
  .find(function (s) { return /CHECK YOURSELF/i.test((s.querySelector('header') || {}).textContent || ''); });

var intended = [1, 3, 0, 2, 1];
var clicked = 0;
if (quizSection) {
  var allButtons = Array.prototype.slice.call(quizSection.querySelectorAll('button'))
    .filter(function (b) { return !/retake/i.test(b.textContent || ''); });
  var groups = {};
  Array.prototype.forEach.call(allButtons, function (b) {
    var wrap = b.closest('div.px-5');
    var key = Array.prototype.indexOf.call(quizSection.querySelectorAll('div.px-5'), wrap);
    (groups[key] = groups[key] || []).push(b);
  });
  Object.keys(groups).sort(function (a, b) { return a - b; }).forEach(function (k, i) {
    var btns = groups[k];
    var idx = intended[i] !== undefined ? intended[i] : 0;
    if (btns[idx]) { btns[idx].click(); clicked++; }
  });
}
r.quizClicked = clicked;

var showBtns = Array.prototype.slice.call(document.querySelectorAll('button'))
  .filter(function (b) { return /show solution/i.test(b.textContent || ''); });
r.showButtons = showBtns.length;
Array.prototype.forEach.call(showBtns, function (b) { b.click(); });

r.katexNodes = document.querySelectorAll('.lesson-body .katex').length;
r.dollarInText = (document.querySelector('.lesson-body').textContent.match(/\$/g) || []).length;
r.katexErrors = document.querySelectorAll('.katex-error').length;
r.svgCount = Array.prototype.slice.call(document.querySelectorAll('figure svg')).filter(function (x) { return !x.closest('.katex'); }).length;
r.rawDollarInSvg = Array.prototype.slice.call(document.querySelectorAll('figure svg text')).filter(function (t) { return !t.closest('.katex'); })
  .filter(function (t) { return /\$|\\tfrac|\\times|\\sqrt/.test(t.textContent || ''); }).length;
r.tables = document.querySelectorAll('.lesson-body table').length;
// NOTE: the /g flag is required — without it String.match returns only the
// first match (termHits pinned at 1); QA run Q1 2026-11-18 fixed the miss.
r.termHits = (document.body.textContent.match(/progression|arithmetic|geometric|harmonic|sequence|series|ratio|difference|mean|telescope|census|sigma|recurring|scale|relation|Fibonacci|Binet|Cassini|Nicomachus|generating|prefix|licence|inserted|power|engine|bench|trap|flip|climb|tail|umbrella|ladder|fork|recovery|read-back|collapse|shift/gi) || []).length;
r.prereqChips = Array.prototype.slice.call(document.querySelectorAll('a'))
  .filter(function (a) { return /aa-arithmetic-progressions-the-constant-climb|aa-geometric-progressions-and-the-infinite-tail|aa-harmonic-and-arithmetico-geometric-progressions|aa-special-series-and-the-method-of-differences|aa-sigma-notation-and-the-classical-power-sums|aa-recurring-series-and-the-scale-of-relation/.test(a.href || ''); }).length;
r.docScrollW = document.documentElement.scrollWidth;
r.innerWidth = window.innerWidth;
JSON.stringify(r);

// e2e-aa-4R.page.js — targeted interactivity for Advanced Algebra lesson 4.R
// 'Unit 4 Completion Review' (quiz keys 2/0/1/3/1; prereqs = the six chapter-4
// siblings 4.1 AM-GM, 4.2 weighted AM-GM, 4.3 Cauchy-Schwarz + Engel,
// 4.4 rearrangement + Chebyshev, 4.5 Jensen + convexity, 4.6 absolute value +
// the triangle inequality — the six engines the review walks in one room).
var r = {};
var body = document.querySelector('.lesson-body');
r.hasBody = !!body;

var quizSection = Array.prototype.slice
  .call(document.querySelectorAll('section'))
  .find(function (s) { return /CHECK YOURSELF/i.test((s.querySelector('header') || {}).textContent || ''); });

var intended = [2, 0, 1, 3, 1];
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
r.termHits = (document.body.textContent.match(/engine|mean|AM.GM|weighted|ladder|Cauchy|Engel|Nesbitt|rearrangement|Chebyshev|Jensen|triangle|pairing|equality|certificate|convex|concave|band|detour|verdict|fraction|sorted|split|witness|bench|trap|engine map/gi) || []).length;
r.prereqChips = Array.prototype.slice.call(document.querySelectorAll('a'))
  .filter(function (a) { return /aa-the-arithmetic-geometric-mean-inequality|aa-the-weighted-am-gm-and-its-consequences|aa-cauchy-schwarz-and-engels-form|aa-the-rearrangement-and-chebyshev-inequalities|aa-jensens-inequality-and-convexity|aa-absolute-value-at-depth-the-triangle-inequality/.test(a.href || ''); }).length;
r.docScrollW = document.documentElement.scrollWidth;
r.innerWidth = window.innerWidth;
JSON.stringify(r);

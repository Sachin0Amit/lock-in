// e2e-aa-6R.page.js — targeted interactivity for Advanced Algebra lesson 6.R
// 'Unit 6 Completion Review' (quiz keys 1/0/3/0/1; prereqs = the six chapter-6
// siblings 6.1 the fundamental principle, 6.2 factorials and the toolkit,
// 6.3 permutations the arrangement count, 6.4 circular and restricted
// permutations, 6.5 combinations the selection count, 6.6 distributions and
// the classic counting puzzles — the six engines the review walks in one
// room under the decision map).
var r = {};
var body = document.querySelector('.lesson-body');
r.hasBody = !!body;

var quizSection = Array.prototype.slice
  .call(document.querySelectorAll('section'))
  .find(function (s) { return /CHECK YOURSELF/i.test((s.querySelector('header') || {}).textContent || ''); });

var intended = [1, 0, 3, 0, 1];
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
r.termHits = (document.body.textContent.match(/count|chain|fork|multiplication|addition|factorial|permutation|arrangement|circular|necklace|combination|selection|distribution|identical|distinct|census|derangement|onto|divide|order|repetition|groups|persons|empty|decision|bench|trap|engine|witness|stamps|licence|unwrap|flip|brackets|bracelet|envelope|sweets|oranges|panel|captain|favourable|probability/gi) || []).length;
r.prereqChips = Array.prototype.slice.call(document.querySelectorAll('a'))
  .filter(function (a) { return /aa-the-fundamental-principle-of-counting|aa-factorials-and-the-counting-toolkit|aa-permutations-the-arrangement-count|aa-circular-and-restricted-permutations|aa-combinations-the-selection-count|aa-distributions-and-the-classic-counting-puzzles/.test(a.href || ''); }).length;
r.docScrollW = document.documentElement.scrollWidth;
r.innerWidth = window.innerWidth;
JSON.stringify(r);

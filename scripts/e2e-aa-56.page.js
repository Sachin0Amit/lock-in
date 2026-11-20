// e2e-aa-56.page.js — targeted interactivity for Advanced Algebra lesson 5.6
// 'Recurring Series and the Scale of Relation' (quiz keys 0/2/2/1/1;
// prereqs = AA 5.1 + 5.2 + 5.4; 4 figures — the recurrence lattice, the
// honesty fork, the double-root grid, the decimals machine; 1 census
// table).
var r = {};
var body = document.querySelector('.lesson-body');
r.hasBody = !!body;

var quizSection = Array.prototype.slice
  .call(document.querySelectorAll('section'))
  .find(function (s) { return /CHECK YOURSELF/i.test((s.querySelector('header') || {}).textContent || ''); });

var intended = [0, 2, 2, 1, 1];
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

var showBtns = Array.prototype.slice
  .call(document.querySelectorAll('button'))
  .filter(function (b) { return /show solution/i.test(b.textContent || ''); });
r.showButtons = showBtns.length;
Array.prototype.forEach.call(showBtns, function (b) { b.click(); });

r.solPills = Array.prototype.slice.call(document.querySelectorAll('span'))
  .filter(function (s) { return s.textContent.trim() === 'Sol.'; }).length;

r.katexNodes = document.querySelectorAll('.lesson-body .katex').length;
r.katexErrors = document.querySelectorAll('.katex-error').length;
r.rawDollarInSvg = Array.prototype.slice.call(document.querySelectorAll('figure svg text')).filter(function (t) { return !t.closest('.katex'); })
  .filter(function (t) { return /\$|\\tfrac|\\times|\\sqrt/.test(t.textContent || ''); }).length;

r.svgCount = Array.prototype.slice.call(document.querySelectorAll('figure svg')).filter(function (x) { return !x.closest('.katex'); }).length;
r.tables = document.querySelectorAll('.lesson-body table').length;

var txt = document.body.textContent || '';
r.termHits = (document.body.textContent.match(/recurring|scale|relation|series|generating|Fibonacci|Binet|Cassini|decimal|prefix|base|term|sum/gi) || []).length;

r.dollarInText = Array.prototype.slice.call(document.querySelectorAll('.lesson-body p, .lesson-body h2, .lesson-body h3, .lesson-body li'))
  .filter(function (el) { return /[^\\]\$[a-zA-Z]/.test(el.textContent || '') && el.querySelectorAll('.katex').length === 0; }).length;

r.prereqChips = Array.prototype.slice.call(document.querySelectorAll('a'))
  .filter(function (a) { return /arithmetic-progressions-the-constant-climb|geometric-progressions-and-the-infinite-tail|special-series-and-the-method-of-differences/.test(a.href || ''); }).length;

r.docScrollW = document.documentElement.scrollWidth;
r.innerWidth = window.innerWidth;
r.headings = Array.prototype.slice.call(document.querySelectorAll('.lesson-body h2, .lesson-body h3'))
  .map(function (h) { return (h.textContent || '').trim().slice(0, 60); });
JSON.stringify(r);

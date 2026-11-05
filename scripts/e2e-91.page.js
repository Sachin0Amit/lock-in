// e2e-91.page.js — targeted interactivity for lesson 9.1 (quiz + solutions; intended indices 0,1,2,2,2)
var r = {};
var body = document.querySelector('.lesson-body');
r.hasBody = !!body;

// locate the quiz section (the one whose header says CHECK YOURSELF)
var quizSection = Array.prototype.slice
  .call(document.querySelectorAll('section'))
  .find(function (s) { return /CHECK YOURSELF/i.test((s.querySelector('header') || {}).textContent || ''); });

// click the intended correct option of each quiz question
var intended = [0, 1, 2, 2, 2];
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

// expand every exercise solution
var showBtns = Array.prototype.slice
  .call(document.querySelectorAll('button'))
  .filter(function (b) { return /show solution/i.test(b.textContent || ''); });
r.showButtons = showBtns.length;
Array.prototype.forEach.call(showBtns, function (b) { b.click(); });

// count Sol. pills + ∴ glyphs + score text
r.solPills = Array.prototype.slice.call(document.querySelectorAll('span'))
  .filter(function (s) { return s.textContent.trim() === 'Sol.'; }).length;
r.thereforeGlyphs = Array.prototype.slice
  .call(document.querySelectorAll('.lesson-body .katex span'))
  .filter(function (m) { return m.textContent.trim() === '\u2234'; }).length;
r.scoreText = (document.body.textContent.match(/You scored[^·]*/g) || []).slice(0, 1);
r.katexNodes = document.querySelectorAll('.lesson-body .katex').length;
r.dollarInText = (document.querySelector('.lesson-body').textContent.match(/\$/g) || []).length;
r.katexErrors = document.querySelectorAll('.katex-error').length;
r.svgCount = document.querySelectorAll('figure svg').length;
r.illustrations = document.querySelectorAll('section[aria-label^="Illustration"]').length;
r.rawDollarInSvg = Array.prototype.slice.call(document.querySelectorAll('figure svg text'))
  .filter(function (t) { return /\$/.test(t.textContent || ''); }).length;
r.noteBoxes = Array.prototype.slice.call(document.querySelectorAll('.lesson-body [class*="border"]'))
  .map(function (el) { return (el.textContent || '').slice(0, 40); })
  .filter(function (t, i, a) { return /^(Definition|Note|Caution|Historical note|Exam corner|Theorem)/i.test(t.trim()); }).length;
r.tables = document.querySelectorAll('.lesson-body table').length;
r.docScrollW = document.documentElement.scrollWidth;
r.innerWidth = window.innerWidth;
JSON.stringify(r);

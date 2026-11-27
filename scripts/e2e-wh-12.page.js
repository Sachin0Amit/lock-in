// e2e-wh-12.page.js — targeted interactivity probe for WORLD HISTORY lesson 1.2
// 'Sources: Literary and Archaeological' (quiz keys [2,3,1,0,2]; 3 body figures
// + 3 solution figures; the live census calibrated in the run's e2e pass).
var r = {};
var body = document.querySelector('.lesson-body');
r.hasBody = !!body;

var quizSection = Array.prototype.slice
  .call(document.querySelectorAll('section'))
  .find(function (s) { return /CHECK YOURSELF|SELF-CHECK/i.test((s.querySelector('header') || {}).textContent || ''); });

var intended = [2, 3, 1, 0, 2];
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
r.svgAll = Array.prototype.slice.call(document.querySelectorAll('.lesson-body svg')).filter(function (x) { return !x.closest('.katex'); }).length;
r.rawDollarInSvg = Array.prototype.slice.call(document.querySelectorAll('figure svg text')).filter(function (t) { return !t.closest('.katex'); })
  .filter(function (t) { return /\$|\\tfrac|\\times|\\div|\\text/.test(t.textContent || ''); }).length;
r.tables = document.querySelectorAll('.lesson-body table').length;
r.termHits = (document.body.textContent.match(/epigraphy|numismatics|stratigraphy|superposition|radiocarbon|dendrochronology|Rosetta|Prinsep|Megasthenes|Fa\u2011Hien|Xuanzang|Al\u2011Biruni|Ashoka|three-age system/gi) || []).length;
r.prereqChips = Array.prototype.slice.call(document.querySelectorAll('a'))
  .filter(function (a) { return /world-history\/lesson\/wh-/.test(a.href || ''); }).length;
r.docScrollW = document.documentElement.scrollWidth;
r.innerWidth = window.innerWidth;
JSON.stringify(r);

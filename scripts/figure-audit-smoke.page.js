/* figure-audit-smoke.page.js — generic E2E smoke for a figure-audit-touched
 * lesson: figures render nonzero, KaTeX clean, quiz 5/5 on INTENDED (passed
 * via window.__intended), no overflow/crash/console errors. */
var r = {};
var body = document.querySelector('.lesson-body');
r.hasBody = !!body;

var figs = document.querySelectorAll('figure svg');
r.figureCount = figs.length;
r.zeroSize = Array.prototype.slice.call(figs).filter(function (s) {
  var b = s.getBoundingClientRect();
  return b.width < 10 || b.height < 10;
}).length;
r.figAras = Array.prototype.slice.call(figs).every(function (s) {
  return (s.getAttribute('aria-label') || '').length > 15;
});

r.katexNodes = document.querySelectorAll('.lesson-body .katex').length;
r.katexErrors = document.querySelectorAll('.katex-error').length;
r.dollarInText = (body.textContent.match(/\$/g) || []).length;

/* quiz — click intended answers (window.__intended), expect 5/5 */
var quizSection = Array.prototype.slice.call(document.querySelectorAll('section'))
  .find(function (s) { return /CHECK YOURSELF/i.test((s.querySelector('header') || {}).textContent || ''); });
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
  var intended = window.__intended || [0, 0, 0, 0, 0];
  Object.keys(groups).sort(function (a, b) { return a - b; }).forEach(function (k, i) {
    var btns = groups[k];
    var idx = intended[i] !== undefined ? intended[i] : 0;
    if (btns[idx]) { btns[idx].click(); clicked++; }
  });
}
r.quizClicked = clicked;

r.docScrollW = document.documentElement.scrollWidth;
r.innerWidth = window.innerWidth;
r.hOverflow = r.docScrollW > r.innerWidth;
r.crashText = /Application error|Internal Server Error/i.test(document.body.textContent);
JSON.stringify(r);

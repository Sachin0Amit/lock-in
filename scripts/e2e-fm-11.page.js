// e2e-fm-11.page.js — visual-upgrade run 1 E2E for FM lesson 1.1
// (fm-numbers-digits-place-value): both figures present with exact
// structure, KaTeX renders, quiz interactive (intended 3/2/1/1/1),
// solutions expand, no horizontal overflow at the current viewport.
var r = {};
var body = document.querySelector('.lesson-body');
r.hasBody = !!body;

/* figures */
var figs = document.querySelectorAll('figure svg');
r.figureCount = figs.length;
var seat = null, nl = null;
Array.prototype.forEach.call(figs, function (s) {
  var vb = s.getAttribute('viewBox') || '';
  if (vb === '0 0 620 282') seat = s;
  if (vb === '0 0 760 150') nl = s;
});
r.hasSeatFigure = !!seat;
r.hasNumberLine = !!nl;
if (seat) {
  r.seatRects = seat.querySelectorAll('rect').length; // 4 value boxes + 4 strips = 8
  r.seatArrows = seat.querySelectorAll('line[marker-end]').length; // 3
  r.seatAmberDigits = Array.prototype.slice.call(seat.querySelectorAll('text'))
    .filter(function (t) { return (t.getAttribute('fill') || '') === '#ea580c'; }).length; // 4 fives + 3 x10 labels = 7
  r.seatAria = (seat.getAttribute('aria-label') || '').length > 20;
  r.seatTexts = seat.querySelectorAll('text').length; // headers 3 + digits 10 + x10 3 + seats 8 + values 4 = 28
}
if (nl) {
  r.nlDots7andM4 = Array.prototype.slice.call(nl.querySelectorAll('circle'))
    .filter(function (c) { return c.getAttribute('r') === '5'; }).length; // 2 emphasis dots
  r.nlOriginDot = Array.prototype.slice.call(nl.querySelectorAll('circle'))
    .filter(function (c) { return c.getAttribute('r') === '4'; }).length; // 1
  r.nlAmberLabels = Array.prototype.slice.call(nl.querySelectorAll('text'))
    .filter(function (t) { return (t.getAttribute('fill') || '') === '#ea580c'; }).length; // 7 and -4
  r.nlTickLines = nl.querySelectorAll('g[line] line, g > line').length || nl.querySelectorAll('line').length - 1;
  r.nlAria = (nl.getAttribute('aria-label') || '').length > 20;
}

/* KaTeX */
r.katexNodes = document.querySelectorAll('.lesson-body .katex').length;
r.katexErrors = document.querySelectorAll('.katex-error').length;
r.dollarInText = (document.querySelector('.lesson-body').textContent.match(/\$/g) || []).length;
r.rawDollarInSvg = Array.prototype.slice.call(document.querySelectorAll('figure svg text'))
  .filter(function (t) { return /\$/.test(t.textContent || ''); }).length;

/* quiz — click intended answers 3/2/1/1/1 */
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
  var intended = [3, 2, 1, 1, 1];
  Object.keys(groups).sort(function (a, b) { return a - b; }).forEach(function (k, i) {
    var btns = groups[k];
    var idx = intended[i] !== undefined ? intended[i] : 0;
    if (btns[idx]) { btns[idx].click(); clicked++; }
  });
}
r.quizClicked = clicked;
r.scoreText = (document.body.textContent.match(/You scored[^·]*/g) || []).slice(0, 1);

/* exercises — expand all solutions (pill count read in the delayed 2nd eval) */
var showBtns = Array.prototype.slice.call(document.querySelectorAll('button'))
  .filter(function (b) { return /show solution/i.test(b.textContent || ''); });
r.showButtons = showBtns.length;
Array.prototype.forEach.call(showBtns, function (b) { b.click(); });

/* layout integrity at this viewport */
r.docScrollW = document.documentElement.scrollWidth;
r.innerWidth = window.innerWidth;
r.hOverflow = r.docScrollW > r.innerWidth;
r.crashText = /Application error|Internal Server Error/i.test(document.body.textContent);

JSON.stringify(r);

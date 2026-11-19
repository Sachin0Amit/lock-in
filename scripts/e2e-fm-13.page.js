// e2e-fm-13.page.js — visual-upgrade run E2E for FM lesson 1.3
// (fm-rounding-and-estimating): both figures present with exact structure,
// KaTeX renders, quiz interactive (intended 2/1/0/1/1), solutions expand,
// no horizontal overflow at the current viewport.
var r = {};
var body = document.querySelector('.lesson-body');
r.hasBody = !!body;

/* figures */
var figs = document.querySelectorAll('figure svg');
r.figureCount = figs.length;
var nl = null, trap = null;
Array.prototype.forEach.call(figs, function (s) {
  var vb = s.getAttribute('viewBox') || '';
  if (vb === '0 0 760 180') nl = s;
  if (vb === '0 0 760 280') trap = s;
});
r.hasNL = !!nl;
r.hasTrap = !!trap;
if (nl) {
  r.nlLines = nl.querySelectorAll('line').length; // axis + 11 ticks = 12
  r.nlTexts = nl.querySelectorAll('text').length; // 11 labels + 2 arrows + midpoint = 14
  r.nlCircles = nl.querySelectorAll('circle').length; // dots for 43 and 47 = 2
  r.nlArrows = Array.prototype.slice.call(nl.querySelectorAll('path'))
    .filter(function (p) { return (p.getAttribute('fill') || '') === 'none'; }).length; // 2
  r.nlArrowD = Array.prototype.slice.call(nl.querySelectorAll('path'))
    .filter(function (p) { return (p.getAttribute('fill') || '') === 'none'; })
    .map(function (p) { return p.getAttribute('d'); }).join('|');
  r.nlTickLabels = Array.prototype.slice.call(nl.querySelectorAll('text'))
    .filter(function (t) { return t.getAttribute('y') === '122'; })
    .map(function (t) { return t.textContent; }).join(','); // '40,41,...,50'
  r.nlLabelGroup14 = !!nl.querySelector('g[font-size="14"]');
  r.nlMidNote = Array.prototype.slice.call(nl.querySelectorAll('text'))
    .some(function (t) { return t.getAttribute('font-size') === '13' && /midpoint 45/.test(t.textContent || ''); });
  r.nlAria = (nl.getAttribute('aria-label') || '').length > 40;
  r.nlDots = Array.prototype.slice.call(nl.querySelectorAll('circle'))
    .map(function (c) { return c.getAttribute('cx'); }).join(','); // '256,504'
}
if (trap) {
  r.trapLines = trap.querySelectorAll('line').length; // 2 axes + 5 ticks + 6 bracket strokes = 13
  r.trapTexts = trap.querySelectorAll('text').length; // 13
  r.trapCircles = trap.querySelectorAll('circle').length; // 2
  r.trapGreenDots = Array.prototype.slice.call(trap.querySelectorAll('circle'))
    .filter(function (c) { return (c.getAttribute('fill') || '') === '#16a34a'; }).length; // 2
  r.trapArrows = Array.prototype.slice.call(trap.querySelectorAll('path'))
    .filter(function (p) { return (p.getAttribute('fill') || '') === 'none' && (p.getAttribute('stroke') || '') === '#d97706'; });
  r.trapArrowCount = r.trapArrows.length; // 2
  r.trapArrowD = r.trapArrows.map(function (p) { return p.getAttribute('d'); }).join('|');
  r.trapBracketA = Array.prototype.slice.call(trap.querySelectorAll('line'))
    .filter(function (l) { return l.getAttribute('y1') === '104' || l.getAttribute('y1') === '124'; }).length; // 3
  r.trapBracketB = Array.prototype.slice.call(trap.querySelectorAll('line'))
    .filter(function (l) { return l.getAttribute('y1') === '232' || l.getAttribute('y1') === '248'; }).length; // 3
  r.trapRailALabels = Array.prototype.slice.call(trap.querySelectorAll('text'))
    .filter(function (t) { return t.getAttribute('y') === '94'; })
    .map(function (t) { return t.textContent; }).join(','); // '4,800,4,829,4,851,4,900'
  r.trapRailBLabels = Array.prototype.slice.call(trap.querySelectorAll('text'))
    .filter(function (t) { return t.getAttribute('y') === '222'; })
    .map(function (t) { return t.textContent; }).join(','); // '4,800,4,900'
  r.trapMoveTags = Array.prototype.slice.call(trap.querySelectorAll('text'))
    .filter(function (t) { return (t.getAttribute('fill') || '') === '#d97706'; })
    .map(function (t) { return t.textContent; }).join('|'); // 'rounds down|−29|rounds up|+49'
  r.trapAria = (trap.getAttribute('aria-label') || '').length > 40;
}

/* KaTeX */
r.katexNodes = document.querySelectorAll('.lesson-body .katex').length;
r.katexErrors = document.querySelectorAll('.katex-error').length;
r.dollarInText = (document.querySelector('.lesson-body').textContent.match(/\$/g) || []).length;
r.rawDollarInSvg = Array.prototype.slice.call(document.querySelectorAll('figure svg text'))
  .filter(function (t) { return /\$/.test(t.textContent || ''); }).length;

/* quiz — click intended answers 2/1/0/1/1 */
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
  var intended = [2, 1, 0, 1, 1];
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

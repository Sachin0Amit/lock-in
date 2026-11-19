// e2e-fm-22.page.js — visual-upgrade run E2E for FM lesson 2.2
// (fm-subtraction-borrowing): all four figures present with exact structure
// (subtraction number line, borrow seat map, 1,000−1 dissolve, counting-up
// journey bar), KaTeX renders, quiz interactive (intended 2/1/2/1/2),
// solutions expand, no horizontal overflow at the current viewport.
var r = {};
var body = document.querySelector('.lesson-body');
r.hasBody = !!body;

/* figures */
var figs = document.querySelectorAll('figure svg');
r.figureCount = figs.length;
var nl = null, borrow = null, dissolve = null, climb = null;
Array.prototype.forEach.call(figs, function (s) {
  var vb = s.getAttribute('viewBox') || '';
  var aria = s.getAttribute('aria-label') || '';
  if (vb === '0 0 760 258') nl = s;
  if (vb === '0 0 760 290' && /4589 minus 2764/.test(aria)) borrow = s;
  if (vb === '0 0 760 290' && /1000 minus 1/.test(aria)) dissolve = s;
  if (vb === '0 0 760 250') climb = s;
});
r.hasNL = !!nl;
r.hasBorrow = !!borrow;
r.hasDissolve = !!dissolve;
r.hasClimb = !!climb;
if (nl) {
  r.nlLines = nl.querySelectorAll('line').length; // 3 rails + 24 ticks = 27
  r.nlTexts = nl.querySelectorAll('text').length; // 2 titles + 24 tick labels + 2 hop labels + 1 note = 29
  r.nlCircles = nl.querySelectorAll('circle').length; // 2 start + 1 landing + 1 dashed ghost = 4
  r.nlDots = Array.prototype.slice.call(nl.querySelectorAll('circle'))
    .map(function (c) { return c.getAttribute('cx'); }).join(','); // '550,340,410,60'
  r.nlGhost = Array.prototype.slice.call(nl.querySelectorAll('circle'))
    .filter(function (c) { return c.getAttribute('fill') === 'none'; }).length; // 1 dashed ghost
  r.nlArcs = Array.prototype.slice.call(nl.querySelectorAll('path'))
    .filter(function (p) { return /^M /.test(p.getAttribute('d') || ''); });
  r.nlArcCount = r.nlArcs.length; // 2
  r.nlArcD = r.nlArcs.map(function (p) { return p.getAttribute('d'); }).join('|');
  r.nlTickLabels = Array.prototype.slice.call(nl.querySelectorAll('text'))
    .filter(function (t) { return t.getAttribute('y') === '114'; })
    .map(function (t) { return t.textContent; }).join(','); // '0,1,...,9'
  r.nlTickLabelsBottom = Array.prototype.slice.call(nl.querySelectorAll('text'))
    .filter(function (t) { return t.getAttribute('y') === '226'; })
    .map(function (t) { return t.textContent; }).join(','); // '-4,...,9'
  r.nlGroup14 = !!nl.querySelector('g[font-size="14"]');
  r.nlAria = (nl.getAttribute('aria-label') || '').length > 40;
}
if (borrow) {
  r.boLines = borrow.querySelectorAll('line').length; // 2 strikes + sum line = 3
  r.boRects = borrow.querySelectorAll('rect').length; // 8 cells + 1 pill = 9
  r.boTexts = borrow.querySelectorAll('text').length; // 19
  r.boPill = Array.prototype.slice.call(borrow.querySelectorAll('rect'))
    .filter(function (x) { return x.getAttribute('rx') === '17'; }).length; // 1
  r.boArrows = Array.prototype.slice.call(borrow.querySelectorAll('path'))
    .filter(function (p) { return (p.getAttribute('marker-end') || '') === 'url(#bo-arrow)'; });
  r.boArrowD = r.boArrows.map(function (p) { return p.getAttribute('d'); }).join('|'); // 'M 215 94 Q 285 66 355 94'
  r.boRow1 = Array.prototype.slice.call(borrow.querySelectorAll('text'))
    .filter(function (t) { return t.getAttribute('y') === '124'; })
    .map(function (t) { return t.textContent; }).join(''); // '4589'
  r.boRow2 = Array.prototype.slice.call(borrow.querySelectorAll('text'))
    .filter(function (t) { return t.getAttribute('y') === '186'; })
    .map(function (t) { return t.textContent; }).join(''); // '2764'
  r.boDiff = Array.prototype.slice.call(borrow.querySelectorAll('text'))
    .filter(function (t) { return t.getAttribute('y') === '252'; })
    .map(function (t) { return t.textContent; }).join(''); // '1825'
  r.boCorr = Array.prototype.slice.call(borrow.querySelectorAll('text'))
    .filter(function (t) { return t.getAttribute('y') === '112'; })
    .map(function (t) { return t.textContent; }).join(','); // '3,15'
  r.boPillText = Array.prototype.slice.call(borrow.querySelectorAll('text'))
    .some(function (t) { return t.textContent === '1 thousand = 10 hundreds'; });
  r.boSumLine = Array.prototype.slice.call(borrow.querySelectorAll('line'))
    .some(function (l) { return l.getAttribute('x1') === '140' && l.getAttribute('x2') === '710'; });
  r.boNote = Array.prototype.slice.call(borrow.querySelectorAll('text'))
    .some(function (t) { return /^hundreds: 5 < 7/.test(t.textContent || ''); });
  r.boAria = (borrow.getAttribute('aria-label') || '').length > 40;
}
if (dissolve) {
  r.diLines = dissolve.querySelectorAll('line').length; // 4 strikes + sum line = 5
  r.diRects = dissolve.querySelectorAll('rect').length; // 8 cells + dissolved zone = 9
  r.diTexts = dissolve.querySelectorAll('text').length; // 20
  r.diZone = Array.prototype.slice.call(dissolve.querySelectorAll('rect'))
    .filter(function (x) { return x.getAttribute('height') === '40'; }).length; // 1 dashed dissolved-seat zone
  r.diArrows = Array.prototype.slice.call(dissolve.querySelectorAll('path'))
    .filter(function (p) { return (p.getAttribute('marker-end') || '') === 'url(#lend-arrow)'; });
  r.diArrowD = r.diArrows.map(function (p) { return p.getAttribute('d'); }).join('|');
  r.diRow1 = Array.prototype.slice.call(dissolve.querySelectorAll('text'))
    .filter(function (t) { return t.getAttribute('y') === '124'; })
    .map(function (t) { return t.textContent; }).join(''); // '1000'
  r.diRow2 = Array.prototype.slice.call(dissolve.querySelectorAll('text'))
    .filter(function (t) { return t.getAttribute('y') === '186' && t.getAttribute('x') !== '80'; })
    .map(function (t) { return t.textContent; }).join(''); // '0001'
  r.diFaintZeros = Array.prototype.slice.call(dissolve.querySelectorAll('text'))
    .filter(function (t) { return t.getAttribute('y') === '186' && t.textContent === '0'; }).length; // 3
  r.diAnswer = Array.prototype.slice.call(dissolve.querySelectorAll('text'))
    .filter(function (t) { return t.getAttribute('y') === '252'; })
    .map(function (t) { return t.textContent; }).join(''); // '999'
  r.diCorr = Array.prototype.slice.call(dissolve.querySelectorAll('text'))
    .filter(function (t) { return t.getAttribute('y') === '112'; })
    .map(function (t) { return t.textContent; }).join(','); // '0,9,9,10'
  r.diZoneTag = Array.prototype.slice.call(dissolve.querySelectorAll('text'))
    .some(function (t) { return t.textContent === 'the dissolved seat'; });
  r.diLends = Array.prototype.slice.call(dissolve.querySelectorAll('text'))
    .some(function (t) { return t.textContent === 'lends →'; });
  r.diNote = Array.prototype.slice.call(dissolve.querySelectorAll('text'))
    .some(function (t) { return /^zeros: receive 10/.test(t.textContent || ''); });
  r.diAria = (dissolve.getAttribute('aria-label') || '').length > 40;
}
if (climb) {
  r.clRects = climb.querySelectorAll('rect').length; // 1 bar
  r.clLines = climb.querySelectorAll('line').length; // 3 dividers + 5 binding ticks + 4 hop ticks = 12
  r.clPoly = climb.querySelectorAll('polygon').length; // 1 arrival arrowhead
  r.clTexts = climb.querySelectorAll('text').length; // 11
  r.clBar = Array.prototype.slice.call(climb.querySelectorAll('rect'))
    .map(function (x) { return x.getAttribute('x') + ',' + x.getAttribute('width'); }).join('|'); // '60,660'
  r.clDividers = Array.prototype.slice.call(climb.querySelectorAll('line'))
    .filter(function (l) { return l.getAttribute('y1') === '96' && l.getAttribute('y2') === '136'; })
    .map(function (l) { return l.getAttribute('x1'); }).join(','); // '73.02,145.35,687.81' (stroke inherited from the divider group)
  r.clHopLabels = Array.prototype.slice.call(climb.querySelectorAll('text'))
    .filter(function (t) { return t.getAttribute('y') === '166'; })
    .map(function (t) { return t.textContent; }).join(','); // '+36,+200,+1,500,+89'
  r.clMilestones = Array.prototype.slice.call(climb.querySelectorAll('text'))
    .filter(function (t) { return t.getAttribute('y') === '78'; })
    .map(function (t) { return t.textContent; }).join(','); // '2,800,3,000,4,500'
  r.clEnds = Array.prototype.slice.call(climb.querySelectorAll('text'))
    .filter(function (t) { return t.getAttribute('y') === '56'; })
    .map(function (t) { return t.textContent; }).join(','); // '2,764,4,589'
  r.clNote = Array.prototype.slice.call(climb.querySelectorAll('text'))
    .some(function (t) { return /^36 \+ 200 \+ 1,500 \+ 89 = 1,825/.test(t.textContent || ''); });
  r.clAria = (climb.getAttribute('aria-label') || '').length > 40;
}

/* KaTeX */
r.katexNodes = document.querySelectorAll('.lesson-body .katex').length;
r.katexErrors = document.querySelectorAll('.katex-error').length;
r.dollarInText = (document.querySelector('.lesson-body').textContent.match(/\$/g) || []).length;
r.rawDollarInSvg = Array.prototype.slice.call(document.querySelectorAll('figure svg text'))
  .filter(function (t) { return /\$/.test(t.textContent || ''); }).length;

/* quiz — click intended answers 2/1/2/1/2 */
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
  var intended = [2, 1, 2, 1, 2];
  Object.keys(groups).sort(function (a, b) { return a - b; }).forEach(function (k, i) {
    var btns = groups[k];
    var idx = intended[i] !== undefined ? intended[i] : 0;
    if (btns[idx]) { btns[idx].click(); clicked++; }
  });
}
r.quizClicked = clicked;

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

// e2e-fm-21.page.js — visual-upgrade run E2E for FM lesson 2.1
// (fm-addition-carrying): all four figures present with exact structure
// (number line, counting board, column seat map, 999+1 ripple), KaTeX
// renders, quiz interactive (intended 0/1/2/1/2), solutions expand,
// no horizontal overflow at the current viewport.
var r = {};
var body = document.querySelector('.lesson-body');
r.hasBody = !!body;

/* figures */
var figs = document.querySelectorAll('figure svg');
r.figureCount = figs.length;
var nl = null, board = null, col = null, rip = null;
Array.prototype.forEach.call(figs, function (s) {
  var vb = s.getAttribute('viewBox') || '';
  if (vb === '0 0 760 240') nl = s;
  if (vb === '0 0 760 250') board = s;
  if (vb === '0 0 760 290' && /4589 and 2764/.test(s.getAttribute('aria-label') || '')) col = s;
  if (vb === '0 0 760 290' && /999 and 1/.test(s.getAttribute('aria-label') || '')) rip = s;
});
r.hasNL = !!nl;
r.hasBoard = !!board;
r.hasCol = !!col;
r.hasRip = !!rip;
if (nl) {
  r.nlLines = nl.querySelectorAll('line').length; // 2 rails + 20 ticks = 22
  r.nlTexts = nl.querySelectorAll('text').length; // 2 titles + 20 tick labels + 2 hop labels = 24
  r.nlCircles = nl.querySelectorAll('circle').length; // 2 start + 2 landing = 4
  r.nlDots = Array.prototype.slice.call(nl.querySelectorAll('circle'))
    .map(function (c) { return c.getAttribute('cx'); }).join(','); // '340,550,270,550'
  r.nlArcs = Array.prototype.slice.call(nl.querySelectorAll('path'))
    .filter(function (p) { return /^M /.test(p.getAttribute('d') || ''); });
  r.nlArcCount = r.nlArcs.length; // 2
  r.nlArcD = r.nlArcs.map(function (p) { return p.getAttribute('d'); }).join('|');
  r.nlTickLabels = Array.prototype.slice.call(nl.querySelectorAll('text'))
    .filter(function (t) { return t.getAttribute('y') === '114'; })
    .map(function (t) { return t.textContent; }).join(','); // '0,1,...,9'
  r.nlTickLabelsBottom = Array.prototype.slice.call(nl.querySelectorAll('text'))
    .filter(function (t) { return t.getAttribute('y') === '226'; })
    .map(function (t) { return t.textContent; }).join(',');
  r.nlGroup14 = !!nl.querySelector('g[font-size="14"]');
  r.nlAria = (nl.getAttribute('aria-label') || '').length > 40;
}
if (board) {
  r.boardWires = Array.prototype.slice.call(board.querySelectorAll('line'))
    .filter(function (l) { return !l.getAttribute('marker-end'); }).length; // 3
  r.boardLines = board.querySelectorAll('line').length; // 3 wires + 1 rise guide = 4
  var counterGroup = board.querySelector('g[fill="#d97706"]');
  r.boardCounters = counterGroup ? counterGroup.querySelectorAll('circle').length : 0; // exactly 10
  r.boardCounterXs = counterGroup ? Array.prototype.slice.call(counterGroup.querySelectorAll('circle'))
    .map(function (c) { return c.getAttribute('cx'); }).join(',') : '';
  r.boardAloft = Array.prototype.slice.call(board.querySelectorAll('circle'))
    .filter(function (c) { return c.getAttribute('fill') === '#ea580c' && c.getAttribute('cy') === '180'; }).length; // 1
  r.boardGhost = Array.prototype.slice.call(board.querySelectorAll('circle'))
    .filter(function (c) { return c.getAttribute('fill') === 'none' && c.getAttribute('cy') === '141'; }).length; // 1
  var guideLine = Array.prototype.slice.call(board.querySelectorAll('line'))
    .find(function (l) { return l.getAttribute('marker-end') === 'url(#board-rise)'; });
  r.boardGuide = guideLine ? guideLine.getAttribute('x1') + ',' + guideLine.getAttribute('y1') + ',' + guideLine.getAttribute('y2') : ''; // '380,206,152'
  r.boardLabels = Array.prototype.slice.call(board.querySelectorAll('text'))
    .map(function (t) { return t.textContent; }).join('|'); // 'one of the next seat|ten of one seat — the wire is full'
  r.boardAria = (board.getAttribute('aria-label') || '').length > 40;
}
if (col) {
  r.colLines = col.querySelectorAll('line').length; // sum line + each-carry guide = 2
  r.colRects = col.querySelectorAll('rect').length; // 3 carry cells + 8 digit cells = 11
  r.colTexts = col.querySelectorAll('text').length; // 20
  r.colCarryCells = Array.prototype.slice.call(col.querySelectorAll('rect'))
    .filter(function (x) { return x.getAttribute('rx') === '17'; }).length; // 3
  r.colArrows = Array.prototype.slice.call(col.querySelectorAll('path'))
    .filter(function (p) { return (p.getAttribute('marker-end') || '') === 'url(#ca-arrow)'; });
  r.colArrowD = r.colArrows.map(function (p) { return p.getAttribute('d'); }).join('|');
  r.colSumDigits = Array.prototype.slice.call(col.querySelectorAll('text'))
    .filter(function (t) { return t.getAttribute('y') === '252'; })
    .map(function (t) { return t.textContent; }).join(''); // '7353'
  r.colRow1 = Array.prototype.slice.call(col.querySelectorAll('text'))
    .filter(function (t) { return t.getAttribute('y') === '124'; })
    .map(function (t) { return t.textContent; }).join(''); // '4589'
  r.colRow2 = Array.prototype.slice.call(col.querySelectorAll('text'))
    .filter(function (t) { return t.getAttribute('y') === '186'; })
    .map(function (t) { return t.textContent; }).join(''); // '2764'
  r.colNote = Array.prototype.slice.call(col.querySelectorAll('text'))
    .some(function (t) { return /^column totals 13, 15, 13, 7/.test(t.textContent || ''); });
  r.colAria = (col.getAttribute('aria-label') || '').length > 40;
}
if (rip) {
  r.ripLines = rip.querySelectorAll('line').length; // sum line only = 1
  r.ripRects = rip.querySelectorAll('rect').length; // 3 carry + 6 digit + 1 new-seat zone = 10
  r.ripTexts = rip.querySelectorAll('text').length; // 18
  r.ripZone = Array.prototype.slice.call(rip.querySelectorAll('rect'))
    .filter(function (x) { return x.getAttribute('height') === '108'; }).length; // 1 dashed new-seat zone
  r.ripArrows = Array.prototype.slice.call(rip.querySelectorAll('path'))
    .filter(function (p) { return (p.getAttribute('marker-end') || '') === 'url(#rip-arrow)'; });
  r.ripArrowD = r.ripArrows.map(function (p) { return p.getAttribute('d'); }).join('|');
  r.ripRow2 = Array.prototype.slice.call(rip.querySelectorAll('text'))
    .filter(function (t) { return t.getAttribute('y') === '186' && t.getAttribute('x') !== '80'; })
    .map(function (t) { return t.textContent; }).join(''); // '001'
  r.ripFaintZeros = Array.prototype.slice.call(rip.querySelectorAll('text'))
    .filter(function (t) { return t.getAttribute('y') === '186' && t.textContent === '0'; }).length; // 2
  r.ripSumDigits = Array.prototype.slice.call(rip.querySelectorAll('text'))
    .filter(function (t) { return t.getAttribute('y') === '252'; })
    .map(function (t) { return t.textContent; }).join(''); // '1000'
  r.ripNewSeatTag = Array.prototype.slice.call(rip.querySelectorAll('text'))
    .some(function (t) { return t.textContent === 'the new seat'; });
  r.ripAria = (rip.getAttribute('aria-label') || '').length > 40;
}

/* KaTeX */
r.katexNodes = document.querySelectorAll('.lesson-body .katex').length;
r.katexErrors = document.querySelectorAll('.katex-error').length;
r.dollarInText = (document.querySelector('.lesson-body').textContent.match(/\$/g) || []).length;
r.rawDollarInSvg = Array.prototype.slice.call(document.querySelectorAll('figure svg text'))
  .filter(function (t) { return /\$/.test(t.textContent || ''); }).length;

/* quiz — click intended answers 0/1/2/1/2 */
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
  var intended = [0, 1, 2, 1, 2];
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

// e2e-fm-12.page.js — visual-upgrade run 2 E2E for FM lesson 1.2
// (fm-comparing-ordering-numbers): both figures present with exact
// structure, KaTeX renders, quiz interactive (intended 1/0/0/2/1),
// solutions expand, no horizontal overflow at the current viewport.
var r = {};
var body = document.querySelector('.lesson-body');
r.hasBody = !!body;

/* figures */
var figs = document.querySelectorAll('figure svg');
r.figureCount = figs.length;
var chart = null, tug = null;
Array.prototype.forEach.call(figs, function (s) {
  var vb = s.getAttribute('viewBox') || '';
  if (vb === '0 0 760 250') chart = s;
  if (vb === '0 0 760 240') tug = s;
});
r.hasChart = !!chart;
r.hasTug = !!tug;
if (chart) {
  r.chartRects = chart.querySelectorAll('rect').length; // 4 header + 8 cells = 12
  r.chartAmberRects = Array.prototype.slice.call(chart.querySelectorAll('rect'))
    .filter(function (q) { return (q.getAttribute('fill') || '') === '#b45309'; }).length; // header + 2 rows = 3
  r.chartAmberDigits = Array.prototype.slice.call(chart.querySelectorAll('text'))
    .filter(function (t) { return (t.getAttribute('fill') || '') === '#b45309' && t.getAttribute('font-size') === '22'; })
    .map(function (t) { return t.textContent; }).join(''); // '89'
  r.chartTexts = chart.querySelectorAll('text').length; // 4 seats + 2 row labels + 8 digits + footer + corner = 16
  r.chartAria = (chart.getAttribute('aria-label') || '').length > 20;
}
if (tug) {
  r.tugRects = tug.querySelectorAll('rect').length; // barA + barB + gap + pattern rect = 4
  r.tugLines = tug.querySelectorAll('line').length; // axis + 11 ticks + 1 pattern stripe = 13
  r.tugBarA = Array.prototype.slice.call(tug.querySelectorAll('rect'))
    .filter(function (q) { return q.getAttribute('y') === '48' && q.getAttribute('width') === '520'; }).length; // 1
  r.tugBarB = Array.prototype.slice.call(tug.querySelectorAll('rect'))
    .filter(function (q) { return q.getAttribute('y') === '128' && q.getAttribute('width') === '468'; }).length; // 1
  r.tugGap = Array.prototype.slice.call(tug.querySelectorAll('rect'))
    .filter(function (q) { return q.getAttribute('width') === '52' && q.getAttribute('stroke-dasharray') === '5 4'; }).length; // 1
  r.tugAmberTexts = Array.prototype.slice.call(tug.querySelectorAll('text'))
    .filter(function (t) { return (t.getAttribute('fill') || '') === '#b45309'; })
    .map(function (t) { return t.textContent; }).join('|'); // '1|unclosable gap'
  r.tugPattern = !!tug.querySelector('pattern[id="fig-tug-stripes"]');
  r.tugTickLabels = Array.prototype.slice.call(tug.querySelectorAll('text'))
    .filter(function (t) { return t.getAttribute('y') === '228'; })
    .map(function (t) { return t.textContent; }).join(','); // '0,1,...,10'
  r.tugAria = (tug.getAttribute('aria-label') || '').length > 20;
  r.tugTexts = tug.querySelectorAll('text').length; // 2 labels + 2 values + 2 gap + 11 ticks = 17
}

/* KaTeX */
r.katexNodes = document.querySelectorAll('.lesson-body .katex').length;
r.katexErrors = document.querySelectorAll('.katex-error').length;
r.dollarInText = (document.querySelector('.lesson-body').textContent.match(/\$/g) || []).length;
r.rawDollarInSvg = Array.prototype.slice.call(document.querySelectorAll('figure svg text'))
  .filter(function (t) { return /\$/.test(t.textContent || ''); }).length;

/* quiz — click intended answers 1/0/0/2/1 */
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
  var intended = [1, 0, 0, 2, 1];
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

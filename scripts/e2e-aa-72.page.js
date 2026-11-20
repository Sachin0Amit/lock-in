// e2e-aa-72.page.js — targeted interactivity for Advanced Algebra lesson 7.2
// 'The Binomial Theorem, Proved' (quiz keys 2/1/3/0/1; prereqs: 6.2 factorials,
// 6.5 combinations, 7.1 the domino principle).
var r = {};
var body = document.querySelector('.lesson-body');
r.hasBody = !!body;

var quizSection = Array.prototype.slice
  .call(document.querySelectorAll('section'))
  .find(function (s) { return /CHECK YOURSELF/i.test((s.querySelector('header') || {}).textContent || ''); });

var intended = [2, 1, 3, 0, 1];
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
  .filter(function (t) { return /\$|\\tfrac|\\times|\\sqrt|\\geq|\\binom/.test(t.textContent || ''); }).length;
r.tables = document.querySelectorAll('.lesson-body table').length;
r.termHits = (document.body.textContent.match(/binomial|theorem|Pascal|coefficient|general term|middle|expansion|induction|counting|selection|triangle|conjugate|row|seat|term/gi) || []).length;
r.prereqChips = Array.prototype.slice.call(document.querySelectorAll('a'))
  .filter(function (a) { return /aa-factorials-and-the-counting-toolkit|aa-combinations-the-selection-count|aa-mathematical-induction-the-domino-principle/.test(a.href || ''); }).length;
var worst = { right: 0, text: '', chain: '' };
Array.prototype.forEach.call(document.querySelectorAll('.lesson-body *'), function (el) {
  var rect = el.getBoundingClientRect();
  if (rect.right > worst.right && rect.width > 0) {
    var chain = [];
    var par = el.parentElement;
    for (var i = 0; i < 6 && par && !/lesson-body/.test(par.className || ''); i++) { chain.push(par.tagName + ':' + String(par.className || '').slice(0, 22)); par = par.parentElement; }
    worst = { right: Math.round(rect.right), text: (el.textContent || '').slice(0, 80), chain: chain.join('<') };
  }
});
r.worstOverflow = worst;
var docCausers = [];
Array.prototype.forEach.call(document.querySelectorAll('.lesson-body *'), function (el) {
  var rect = el.getBoundingClientRect();
  if (rect.right > 391 && rect.right <= 410 && rect.width > 5 && el.children.length === 0) {
    var par = el.parentElement;
    var chain = [];
    for (var i = 0; i < 7 && par && !/lesson-body/.test(par.className || ''); i++) { chain.push(par.tagName + ':' + String(par.className || '').slice(0, 26)); par = par.parentElement; }
    docCausers.push({ right: Math.round(rect.right), text: (el.textContent || '').slice(0, 60), chain: chain.join('<') });
  }
});
r.docCausers = docCausers;
var wideDisplays = [];
Array.prototype.forEach.call(document.querySelectorAll('.math-display, [class*=math-display]'), function (el) {
  var rect = el.getBoundingClientRect();
  if (rect.right > 392) {
    var kx = el.querySelector('.katex');
    wideDisplays.push({ right: Math.round(rect.right), text: (kx ? kx.textContent : el.textContent || '').slice(0, 90) });
  }
});
r.wideDisplays = wideDisplays;
r.hasNewContent = document.body.textContent.indexOf('432') !== -1 && document.body.innerHTML.indexOf('qquad (n') === -1;
r.docScrollW = document.documentElement.scrollWidth;
r.innerWidth = window.innerWidth;
JSON.stringify(r);

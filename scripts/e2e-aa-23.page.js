// e2e-aa-23.page.js — targeted interactivity for Advanced Algebra lesson 2.3
// 'Symmetric Reads and Common Roots' (quiz keys 2/1/0/2/0; prereqs = AL 9.4
// Viète relations + AA 2.1 vertex + AA 2.2 sign diagram).
var r = {};
var body = document.querySelector('.lesson-body');
r.hasBody = !!body;

var quizSection = Array.prototype.slice
  .call(document.querySelectorAll('section'))
  .find(function (s) { return /CHECK YOURSELF/i.test((s.querySelector('header') || {}).textContent || ''); });

var intended = [2, 1, 0, 2, 0];
var clicked = 0;
var quizScore = null;
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
  // read back the score badge if the reader prints one
  var badge = quizSection.textContent.match(/(\d)\s*\/\s*5/);
  quizScore = badge ? badge[1] : null;
}
r.quizClicked = clicked;
r.quizScore = quizScore;

var showBtns = Array.prototype.slice.call(document.querySelectorAll('button'))
  .filter(function (b) { return /show solution/i.test(b.textContent || ''); });
r.showButtons = showBtns.length;
Array.prototype.forEach.call(showBtns, function (b) { b.click(); });

r.katexNodes = document.querySelectorAll('.lesson-body .katex').length;
r.dollarInText = (document.querySelector('.lesson-body').textContent.match(/\$/g) || []).length;
r.katexErrors = document.querySelectorAll('.katex-error').length;
r.svgCount = Array.prototype.slice.call(document.querySelectorAll('figure svg')).filter(function (x) { return !x.closest('.katex'); }).length;
r.rawDollarInSvg = Array.prototype.slice.call(document.querySelectorAll('figure svg text')).filter(function (t) { return !t.closest('.katex'); })
  .filter(function (t) { return /\$|\\tfrac|\\times|\\sqrt/.test(t.textContent || ''); }).length;
r.tables = document.querySelectorAll('.lesson-body table').length;
r.termHits = (document.body.textContent.match(/symmetric function|common root|repeated root|proportionality|Viète|double root|power-sum|reconstruction|transformation of an equation/gi) || []).length;
r.prereqChips = Array.prototype.slice.call(document.querySelectorAll('a'))
  .filter(function (a) { return /aa-vertex-form-at-work-maxima-and-minima|aa-quadratic-inequalities-and-the-sign-diagram|al-roots-and-coefficients-viete-relations/.test(a.href || ''); }).length;
r.illusPills = (document.body.textContent.match(/ILLUSTRATION/g) || []).length;
r.sharedDoorText = (document.body.textContent.match(/shared door/gi) || []).length;
r.docScrollW = document.documentElement.scrollWidth;
r.innerWidth = window.innerWidth;
JSON.stringify(r);

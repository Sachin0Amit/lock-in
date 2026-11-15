// e2e-aa-24.page.js — targeted interactivity for Advanced Algebra lesson 2.4
// 'Location of Roots: Doors in Intervals' (quiz keys 1/2/1/2/0; prereqs =
// AA 2.1 vertex + AA 2.2 sign diagram + AL 10.3 parabola).
var r = {};
var body = document.querySelector('.lesson-body');
r.hasBody = !!body;

var quizSection = Array.prototype.slice
  .call(document.querySelectorAll('section'))
  .find(function (s) { return /CHECK YOURSELF/i.test((s.querySelector('header') || {}).textContent || ''); });

var intended = [1, 2, 1, 2, 0];
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
r.termHits = (document.body.textContent.match(/location of roots|wall|fixed point|pencil|turning seat|antiderivative|interleav|escaper|k-system|add-the-walls/gi) || []).length;
r.prereqChips = Array.prototype.slice.call(document.querySelectorAll('a'))
  .filter(function (a) { return /aa-vertex-form-at-work-maxima-and-minima|aa-quadratic-inequalities-and-the-sign-diagram|al-the-parabola-quadratic-graphs-and-vertices/.test(a.href || ''); }).length;
r.illusPills = (document.body.textContent.match(/ILLUSTRATION/g) || []).length;
// lesson-specific prose pins: the fixed point, the census family, the
// interleaving witnesses, the add-the-walls constant, the tangent seat
r.fixedPointText = (document.body.textContent.match(/fixed point/gi) || []).length;
r.familyText = (document.body.textContent.match(/\(m \+ 1\)x \+ 3m − 5|\(m\+1\)x \+ 3m − 5/g) || []).length;
r.witnessText = (document.body.textContent.match(/19\/5|24\\lambda|3√65/g) || []).length;
r.tangentText = (document.body.textContent.match(/tangent seat/gi) || []).length;
r.docScrollW = document.documentElement.scrollWidth;
r.innerWidth = window.innerWidth;
JSON.stringify(r);

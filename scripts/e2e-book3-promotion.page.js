// e2e-book3-promotion.page.js — run-66 E2E for the promoted planned book
// (Elementary Algebra): TOC renders as a plan, empty states hold, nothing
// crashes with zero written lessons.
var r = {};

/* book page structure */
r.breadcrumb = !!document.querySelector('nav[aria-label="Breadcrumb"]');
var titleEl = document.querySelector('h1');
r.h1 = titleEl ? titleEl.textContent.trim() : '';

/* meta chips: "0 written · 37 planned · 0 words · 0 min" */
var metas = Array.prototype.slice.call(document.body.textContent.match(/\d+ written/g) || []);
r.writtenChip = metas.length > 0 ? metas[0] : null;
r.plannedChip = (document.body.textContent.match(/\d+ planned/) || [null])[0];

/* chapter tiles: numbers 01..11 */
var chapterNums = Array.prototype.slice.call(document.querySelectorAll('main span, main div'))
  .map(function (e) { return e.textContent ? e.textContent.trim() : ''; })
  .filter(function (t) { return /^(01|02|03|04|05|06|07|08|09|10|11)$/.test(t); });
r.chapterTilesSeen = chapterNums.length;

r.plannedTitlesSample = [
  'From Arithmetic to Algebra: What a Letter Does',
  'Powers and the Laws of Exponents',
  'What a Polynomial Is: Terms, Degree and Family',
  'Common Factors and Grouping',
  'What an Equation Is: the Balance Principle',
  'Substitution and Elimination',
  'Solving Linear Inequalities',
  'Rational Expressions: Simplify First',
  'Completing the Square, Derived',
  'Slope: the Steepness Theorem',
  'The Function Idea: the Doorstep',
].map(function (t) { return document.body.textContent.indexOf(t) !== -1; });

/* status badge says planned */
r.statusPlanned = /planned/i.test(document.body.textContent);

/* no stray lesson links pointing at lessons that do not exist */
var links = Array.prototype.slice.call(document.querySelectorAll('a'));
r.lessonLinks = links.filter(function (a) { return /\/lesson\//.test(a.getAttribute('href') || ''); }).length;

/* console errors */
r.consoleErrors = (window.__e2eErrors || []).length;

r;

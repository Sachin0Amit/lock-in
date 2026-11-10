// e2e-book4-promotion.page.js — run-89 E2E for the promoted planned book
// (Advanced Algebra): TOC renders as a plan, empty states hold, nothing
// crashes with zero written lessons.
var r = {};

/* book page structure */
r.breadcrumb = !!document.querySelector('nav[aria-label="Breadcrumb"]');
var titleEl = document.querySelector('h1');
r.h1 = titleEl ? titleEl.textContent.trim() : '';

/* meta chips: "0 written · 35 planned · 0 words · 0 min" */
var metas = Array.prototype.slice.call(document.body.textContent.match(/\d+ written/g) || []);
r.writtenChip = metas.length > 0 ? metas[0] : null;
r.plannedChip = (document.body.textContent.match(/\d+ planned/) || [null])[0];

/* chapter tiles: numbers 01..10 */
var chapterNums = Array.prototype.slice.call(document.querySelectorAll('main span, main div'))
  .map(function (e) { return e.textContent ? e.textContent.trim() : ''; })
  .filter(function (t) { return /^(01|02|03|04|05|06|07|08|09|10)$/.test(t); });
r.chapterTilesSeen = chapterNums.length;

r.plannedTitlesSample = [
  'Relations: the Set-of-Pairs View',
  'One-One and Onto: Classifying the Machines',
  'Composition: Machines in Series',
  'Inverse Functions: the Machine Undone',
  'Vertex Form at Work: Maxima and Minima',
  'Quadratic Inequalities and the Sign Diagram',
  'Symmetric Reads and Common Roots',
  'Location of Roots: Doors in Intervals',
  'The Closure Failure That Forces i',
  'Conjugate and Modulus',
  'Negative Discriminants: the Doors Turn Complex',
  'The Arithmetic-Geometric Mean Inequality',
  'Cauchy-Schwarz and Engel’s Form',
  'Absolute Value at Depth: the Triangle Inequality',
  'Arithmetic Progressions: the Constant Climb',
  'Geometric Progressions and the Infinite Tail',
  'Harmonic and Arithmetico-Geometric Progressions',
  'Special Series and the Method of Differences',
  'The Fundamental Principle of Counting',
  'Permutations: the Arrangement Count',
  'Combinations: the Selection Count',
  'Distributions and the Classic Counting Puzzles',
  'Mathematical Induction: the Domino Principle',
  'The Binomial Theorem, Proved',
  'Binomial Coefficients at Work',
  'Binomial Applications and Approximations',
  'How Many Roots: Degree n, n Roots',
  'Cubics and Quartics: the Symmetric Functions',
  'Transformation of Equations',
  'The Exponential Family: Every Real Index',
  'Logarithms: the Inverse Machine',
  'Logarithmic and Exponential Equations',
  'Competition Algebra: the Advanced Craft',
  'The Book in One Page: Synthesis',
  'The Doorstep: Limits and the Changing Output',
].map(function (t) { return document.body.textContent.indexOf(t) !== -1; });

/* status badge says planned */
r.statusPlanned = /planned/i.test(document.body.textContent);

/* no stray lesson links pointing at lessons that do not exist */
var links = Array.prototype.slice.call(document.querySelectorAll('a'));
r.lessonLinks = links.filter(function (a) { return /\/lesson\//.test(a.getAttribute('href') || ''); }).length;

/* no horizontal overflow at the current viewport */
r.overflowX = document.documentElement.scrollWidth > document.documentElement.clientWidth;

/* console errors */
r.consoleErrors = (window.__e2eErrors || []).length;

r;

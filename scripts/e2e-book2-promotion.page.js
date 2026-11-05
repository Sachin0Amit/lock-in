// e2e-book2-promotion.page.js — run-48 E2E for the promoted planned book
// (Arithmetic and Number Systems): TOC renders as a plan, empty states hold,
// nothing crashes with zero written lessons.
var r = {};

/* book page structure */
r.breadcrumb = !!document.querySelector('nav[aria-label="Breadcrumb"]');
var titleEl = document.querySelector('h1');
r.h1 = titleEl ? titleEl.textContent.trim() : '';

/* meta chips: "0 written · 34 planned · 0 words · 0 min" */
var metas = Array.prototype.slice.call(document.body.textContent.match(/\d+ written/g) || []);
r.writtenChip = metas.length > 0 ? metas[0] : null;
r.plannedChip = (document.body.textContent.match(/\d+ planned/) || [null])[0];

/* chapter rows: numbers + planned lesson entries */
var chapterNums = Array.prototype.slice.call(document.querySelectorAll('main span, main div'))
  .map(function (e) { return e.textContent ? e.textContent.trim() : ''; })
  .filter(function (t) { return /^(01|02|03|04|05|06|07|08|09|10)$/.test(t); });
r.chapterTilesSeen = chapterNums.length;

r.plannedTitlesSample = [
  'The Architecture of Counting: Successors and Order',
  'Division with Rest: The Division Algorithm',
  'The Representation Theorem: Every Number Has Exactly One Name',
  'The Fundamental Theorem of Arithmetic',
  'Remainders Become Numbers: Congruence Defined',
  'The Diagonal of the Square: \u221a2 Is Irrational',
  'The Indian Decimal Revolution and Zero',
  'The Great Extension Story',
].map(function (t) { return document.body.textContent.indexOf(t) !== -1; });

/* status badge says planned */
r.statusPlanned = /planned/i.test(document.body.textContent);

/* no stray "Start" CTA pointing at a lesson that does not exist */
var links = Array.prototype.slice.call(document.querySelectorAll('a'));
r.lessonLinks = links.filter(function (a) { return /\/lesson\//.test(a.getAttribute('href') || ''); }).length;

/* console errors */
r.consoleErrors = (window.__e2eErrors || []).length;

r;

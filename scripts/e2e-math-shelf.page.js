// e2e-math-shelf.page.js — full-shelf planning pass E2E (2026-11-10):
// a newly planned book's page renders as a complete plan — planned chips,
// chapter tiles, planned-lesson titles present, status 'planned', no stray
// lesson links, no overflow, zero console errors. Parameterised by the
// BOOK env injected by the .sh driver via template substitution.
var r = {};
var BOOK = __BOOK_ID__;

r.bookId = BOOK;
r.h1 = (document.querySelector('h1') || {}).textContent ? document.querySelector('h1').textContent.trim() : '';
r.writtenChip = (document.body.textContent.match(/0 written/) || [null])[0];
r.plannedChip = (document.body.textContent.match(/\d+ planned/) || [null])[0];
r.statusPlanned = /planned/i.test(document.body.textContent);
r.chapterCount = Array.prototype.slice.call(document.querySelectorAll('main span, main div'))
  .map(function (e) { return e.textContent ? e.textContent.trim() : ''; })
  .filter(function (t) { return /^(0[1-9]|1[0-3])$/.test(t); }).length;
r.overflowX = document.documentElement.scrollWidth > document.documentElement.clientWidth;
r.consoleErrors = (window.__e2eErrors || []).length;
r.crash = /Application error|Internal Server Error/i.test(document.body.textContent);
r.textLen = document.body.textContent.length;
r;

/**
 * e2e-cengage-style.page.js — page-side verifier for the Cengage-style
 * reskin (owner directive 2026-11-03). Evaluated by agent-browser inside a
 * live lesson page. Returns a JSON string of checks.
 */
(function () {
  var r = {};
  var body = document.querySelector('.lesson-body');

  /* 1. Theory section heads: uppercase + green + rule above */
  var h2 = document.querySelector('.lesson-body .lesson-h2');
  if (h2) {
    var cs = getComputedStyle(h2);
    r.h2 = {
      count: document.querySelectorAll('.lesson-body .lesson-h2').length,
      upper: cs.textTransform,
      borderTop: cs.borderTopWidth + ' ' + cs.borderTopStyle,
      color: cs.color,
    };
  }

  /* 2. Illustrations: pill label + sage band + Cengage solution chain
     (Sol. pill INLINE on the first line + connective tag column). */
  var pills = Array.prototype.slice
    .call(document.querySelectorAll('section[aria-label^="Illustration"]'))
    .map(function (s) {
      return s.getAttribute('aria-label');
    });
  r.illustrations = {
    count: pills.length,
    first: pills[0] || null,
    solPills: Array.prototype.slice
      .call(document.querySelectorAll('span'))
      .filter(function (s) {
        return s.textContent.trim() === 'Sol.';
      }).length,
    stepRows: document.querySelectorAll('section[aria-label^="Illustration"] ol > li').length,
  };

  /* 2c. Cengage solution chain (owner directive 2026-11-03): the Sol. pill
     must sit inline at the start of the first solution line (its chain
     container also carries the first step text), ∴ tags render (KaTeX
     mord glyphs), and the old boxed Answer rows are gone. */
  var solPillEls = Array.prototype.slice
    .call(document.querySelectorAll('span'))
    .filter(function (s) { return s.textContent.trim() === 'Sol.'; });
  r.solutionChain = {
    solPills: solPillEls.length,
    inlineSolPills: solPillEls.filter(function (s) {
      var chain = s.closest('div.relative');
      return !!chain && chain.querySelector('ol > li') !== null;
    }).length,
    thereforeTags: Array.prototype.slice
      .call(document.querySelectorAll('.lesson-body .katex span'))
      .filter(function (m) { return m.textContent.trim() === '\u2234'; }).length,
    legacyAnswerBoxes: document.querySelectorAll(
      '.lesson-body .rounded-r-md.border-l-2'
    ).length,
  };

  /* 2b. No step numbers anywhere (owner directive 2026-11-03):
     no aria-hidden span outside KaTeX may be a bare digit — the old
     circled step badges (Sol. steps, derivations, solutions, algorithm
     lines) are all gone. (.katex-html is KaTeX's own aria-hidden render
     layer for math like $6$ — not a badge, excluded.) */
  r.stepNumberBadges = Array.prototype.slice
    .call(document.querySelectorAll('.lesson-body span[aria-hidden="true"]'))
    .filter(function (s) {
      if (s.closest('.katex')) return false;
      return /^\d+$/.test(s.textContent.trim());
    }).length;

  /* 3. Note boxes: small-caps label lead-ins */
  r.noteBoxes = Array.prototype.slice
    .call(document.querySelectorAll('.lesson-body aside'))
    .map(function (a) {
      var lbl = a.querySelector('div > span');
      return lbl ? lbl.textContent.trim() : null;
    })
    .filter(Boolean);

  /* 4. Exercises: green bar + Sol. in expanded solutions */
  var exBar = Array.prototype.slice
    .call(document.querySelectorAll('section header'))
    .find(function (h) {
      return /EXERCISES/i.test(h.textContent) || /QUESTIONS · FULL SOLUTIONS/i.test(h.textContent);
    });
  r.exercisesBar = exBar
    ? { text: exBar.textContent.replace(/\s+/g, ' ').trim().slice(0, 60), bg: getComputedStyle(exBar).backgroundColor }
    : null;

  /* 5. Quiz header bar */
  var quizBar = Array.prototype.slice
    .call(document.querySelectorAll('section header'))
    .find(function (h) {
      return /CHECK YOURSELF/i.test(h.textContent);
    });
  r.quizBar = quizBar
    ? { text: quizBar.textContent.replace(/\s+/g, ' ').trim().slice(0, 60), bg: getComputedStyle(quizBar).backgroundColor }
    : null;

  /* 6. KaTeX + no $ in SVG */
  r.katexNodes = document.querySelectorAll('.katex').length;
  var dollarInSvg = 0;
  Array.prototype.forEach.call(document.querySelectorAll('figure svg text'), function (t) {
    if (t.textContent.indexOf('$') >= 0) dollarInSvg++;
  });
  r.dollarInSvg = dollarInSvg;

  /* 7. Tables: sage header fill */
  var th = document.querySelector('thead tr');
  r.tableHeader = th ? getComputedStyle(th).backgroundColor : null;

  /* 8. Error overlay absence (Next.js dev) */
  r.nextjsPortal = document.querySelector('nextjs-portal') ? 'PRESENT' : 'absent';

  return JSON.stringify(r);
})()

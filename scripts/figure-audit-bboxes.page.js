/* figure-audit-bboxes.page.js — collect per-figure render boxes for the
 * figure-audit cron fire (protocol §4 layer 2). Returns one record per
 * <figure> block (the whole block incl. figcaption) plus the svg rect.
 * Evaluated via agent-browser eval on the live lesson page.
 */
(function () {
  var figs = Array.prototype.slice.call(document.querySelectorAll('figure')).filter(function (f) {
    var s = f.querySelector('svg');
    return s && !s.closest('.katex');
  });
  return {
    vw: window.innerWidth,
    docH: document.documentElement.scrollHeight,
    figs: figs.map(function (f, i) {
      var fr = f.getBoundingClientRect();
      var s = f.querySelector('svg');
      var sr = s.getBoundingClientRect();
      var cap = f.querySelector('figcaption');
      return {
        i: i,
        fx: fr.x, fy: fr.y + window.scrollY, fw: fr.width, fh: fr.height,
        sx: sr.x, sy: sr.y + window.scrollY, sw: sr.width, sh: sr.height,
        svgW: s.getAttribute('width') || '',
        svgH: s.getAttribute('height') || '',
        viewBox: s.getAttribute('viewBox') || '',
        aria: s.getAttribute('aria-label') || '',
        cap: cap ? (cap.textContent || '').trim().slice(0, 110) : ''
      };
    })
  };
})()

/* figure-audit-domvalues.page.js — deterministic Layer 1.5 from the LIVE DOM:
 * per figure: all text/tspan tokens, raw-$ / raw-^ / blue-indigo fill checks,
 * svg viewBox/aria presence. Evaluated via agent-browser eval.
 */
(function () {
  var figs = Array.prototype.slice.call(document.querySelectorAll('figure')).filter(function (f) {
    var s = f.querySelector('svg');
    return s && !s.closest('.katex');
  });
  var BAD = ['#3b82f6', '#2563eb', '#1d4ed8', '#6366f1', '#4f46e5', '#4338ca', '#0ea5e9', '#0284c7', '#60a5fa', '#93c5fd', '#818cf8', '#a5b4fc', '#8b5cf6', '#7c3aed', '#6d28d9', '#a78bfa', '#c4b5fd', '#dbeafe', '#e0e7ff', '#ede9fe', '#bfdbfe', '#c7d2fe', '#ddd6fe'];
  return figs.map(function (f, i) {
    var s = f.querySelector('svg');
    var texts = Array.prototype.slice.call(s.querySelectorAll('text, tspan'));
    var tokens = [];
    var flags = [];
    texts.forEach(function (t) {
      var v = (t.textContent || '').replace(/\s+/g, ' ').trim();
      if (!v) return;
      tokens.push(v);
      if (v.indexOf('$') >= 0) flags.push('raw-$:' + v.slice(0, 40));
      if (/\^[0-9{]/.test(v)) flags.push('raw-^:' + v.slice(0, 40));
      if (/(blue|indigo)/i.test(v) && v.length < 30) flags.push('word-blue:' + v);
    });
    Array.prototype.slice.call(s.querySelectorAll('[fill],[stroke]')).forEach(function (el) {
      ['fill', 'stroke'].forEach(function (a) {
        var v = (el.getAttribute(a) || '').toLowerCase().trim();
        if (BAD.indexOf(v) >= 0) flags.push('palette:' + a + '=' + v);
      });
    });
    var cap = f.querySelector('figcaption');
    return {
      i: i,
      viewBox: s.getAttribute('viewBox') || 'MISSING',
      aria: s.getAttribute('aria-label') || 'MISSING',
      flags: flags,
      tokens: tokens,
      cap: cap ? (cap.textContent || '').trim().slice(0, 130) : ''
    };
  });
})()

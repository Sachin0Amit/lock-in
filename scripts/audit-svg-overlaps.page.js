/**
 * audit-svg-overlaps.page.js — page-side detector, evaluated by agent-browser
 * inside a live lesson page (exact fonts, exact layout).
 *
 * Flags:
 *   TEXT/TEXT   — two <text> glyph bboxes intersecting > 1.5px in both axes
 *   TEXT/PATH   — sampled path geometry entering a text bbox (+1px pad)
 *   TEXT/LINE   — segment crossing a text bbox (+1px pad)
 *   TEXT/CIRCLE — circumference entering a text bbox (unless the circle
 *                 fully encloses that single text — intentional ring)
 *   TEXT/RECT   — rect border entering a text bbox (+1px pad) — catches
 *                 labels spilling out of flowchart boxes
 *   CLIP        — text or geometry escaping the viewBox by > 1.5px
 *
 * Returns JSON string: [{svg, cap, W, H, texts, issues:[...]}]
 */
(function () {
  var PAD = 1.0; // near-touch pad for text vs geometry
  var T2T = 1.5; // min intersection for text vs text
  var CLIP = 1.5; // overflow tolerance
  var reports = [];
  var svgs = Array.prototype.slice.call(document.querySelectorAll('figure svg')).filter(function (x) { return !x.closest('.katex'); });
  svgs.forEach(function (svg, si) {
    var vb = svg.viewBox && svg.viewBox.baseVal;
    var W = vb && vb.width ? vb.width : 0;
    var H = vb && vb.height ? vb.height : 0;
    var cap = svg.getAttribute('aria-label') || 'svg#' + si;

    var texts = [];
    Array.prototype.forEach.call(svg.querySelectorAll('text'), function (t, ti) {
      var b;
      try { b = t.getBBox(); } catch (e) { return; }
      if (!(b.width > 0) || !(b.height > 0)) return;
      texts.push({
        ti: ti,
        s: (t.textContent || '').replace(/\s+/g, ' ').trim(),
        x: b.x, y: b.y, w: b.width, h: b.height,
      });
    });

    var geoms = [];
    Array.prototype.forEach.call(svg.querySelectorAll('path'), function (p, gi) {
      var L;
      try { L = p.getTotalLength(); } catch (e) { return; }
      if (!(L > 0)) return;
      var n = Math.max(12, Math.ceil(L / 2.5));
      var pts = [];
      for (var i = 0; i <= n; i++) {
        var q = p.getPointAtLength((L * i) / n);
        pts.push([q.x, q.y]);
      }
      geoms.push({ gi: gi, kind: 'path', pts: pts });
    });
    Array.prototype.forEach.call(svg.querySelectorAll('line'), function (l, gi) {
      var x1 = l.x1.baseVal.value, y1 = l.y1.baseVal.value,
          x2 = l.x2.baseVal.value, y2 = l.y2.baseVal.value;
      var pts = [];
      for (var i = 0; i <= 24; i++) {
        pts.push([x1 + ((x2 - x1) * i) / 24, y1 + ((y2 - y1) * i) / 24]);
      }
      geoms.push({ gi: gi, kind: 'line', pts: pts });
    });
    Array.prototype.forEach.call(svg.querySelectorAll('circle'), function (c, gi) {
      var cx = c.cx.baseVal.value, cy = c.cy.baseVal.value, r = c.r.baseVal.value;
      var pts = [];
      for (var i = 0; i < 64; i++) {
        var a = (i / 64) * 2 * Math.PI;
        pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
      }
      geoms.push({ gi: gi, kind: 'circle', cx: cx, cy: cy, r: r, pts: pts });
    });
    Array.prototype.forEach.call(svg.querySelectorAll('rect'), function (rc, gi) {
      var x = rc.x.baseVal.value, y = rc.y.baseVal.value,
          w = rc.width.baseVal.value, h = rc.height.baseVal.value;
      var pts = [];
      var i;
      for (i = 0; i <= 24; i++) { pts.push([x + (w * i) / 24, y]); pts.push([x + (w * i) / 24, y + h]); }
      for (i = 0; i <= 12; i++) { pts.push([x, y + (h * i) / 12]); pts.push([x + w, y + (h * i) / 12]); }
      geoms.push({ gi: gi, kind: 'rect', x: x, y: y, w: w, h: h, pts: pts });
    });

    var issues = [];

    // 1. text vs text
    for (var a = 0; a < texts.length; a++) {
      for (var b = a + 1; b < texts.length; b++) {
        var A = texts[a], B = texts[b];
        var ox = Math.min(A.x + A.w, B.x + B.w) - Math.max(A.x, B.x);
        var oy = Math.min(A.y + A.h, B.y + B.h) - Math.max(A.y, B.y);
        if (ox > T2T && oy > T2T) {
          issues.push({
            type: 'TEXT/TEXT',
            a: A.s, b: B.s,
            aAt: [Math.round(A.x), Math.round(A.y), Math.round(A.w), Math.round(A.h)],
            bAt: [Math.round(B.x), Math.round(B.y), Math.round(B.w), Math.round(B.h)],
            ov: [Math.round(ox * 10) / 10, Math.round(oy * 10) / 10],
          });
        }
      }
    }

    // 2. text vs geometry
    texts.forEach(function (T) {
      geoms.forEach(function (G) {
        if (G.kind === 'circle') {
          // intentional ring: circle fully encloses this text
          var enc =
            T.x >= G.cx - G.r + 1 && T.x + T.w <= G.cx + G.r - 1 &&
            T.y >= G.cy - G.r + 1 && T.y + T.h <= G.cy + G.r - 1;
          if (enc) return;
        }
        if (G.kind === 'rect') {
          // intentional box: text fully inside rect
          var inside = T.x >= G.x - 1 && T.x + T.w <= G.x + G.w + 1 &&
                       T.y >= G.y - 1 && T.y + T.h <= G.y + G.h + 1;
          if (inside) return;
        }
        var l = T.x - PAD, r = T.x + T.w + PAD, t = T.y - PAD, bt = T.y + T.h + PAD;
        var hit = null;
        for (var k = 0; k < G.pts.length; k++) {
          var px = G.pts[k][0], py = G.pts[k][1];
          if (px >= l && px <= r && py >= t && py <= bt) { hit = [px, py]; break; }
        }
        if (hit) {
          // A short line whose ENDPOINTS both lie outside the text box but
          // which passes through it is a strikethrough (borrow notation),
          // not a collision — the factor-tree bug had endpoints INSIDE.
          if (G.kind === 'line') {
            var e1 = G.pts[0], e2 = G.pts[G.pts.length - 1];
            var outside = function (p) {
              return p[0] < T.x - 2 || p[0] > T.x + T.w + 2 || p[1] < T.y - 2 || p[1] > T.y + T.h + 2;
            };
            if (outside(e1) && outside(e2)) return; // intentional strike
          }
          issues.push({
            type: 'TEXT/' + G.kind.toUpperCase(),
            a: T.s, g: G.kind + '#' + G.gi,
            aAt: [Math.round(T.x), Math.round(T.y), Math.round(T.w), Math.round(T.h)],
            at: [Math.round(hit[0]), Math.round(hit[1])],
          });
        }
      });
    });

    // 3. viewBox overflow
    if (W && H) {
      texts.forEach(function (T) {
        if (T.x < -CLIP || T.y < -CLIP || T.x + T.w > W + CLIP || T.y + T.h > H + CLIP) {
          issues.push({
            type: 'CLIP/text',
            a: T.s,
            aAt: [Math.round(T.x), Math.round(T.y), Math.round(T.w), Math.round(T.h)],
            vb: [W, H],
          });
        }
      });
      geoms.forEach(function (G) {
        var out = null;
        for (var k = 0; k < G.pts.length; k++) {
          var px = G.pts[k][0], py = G.pts[k][1];
          if (px < -CLIP || py < -CLIP || px > W + CLIP || py > H + CLIP) { out = [px, py]; break; }
        }
        if (out) {
          issues.push({ type: 'CLIP/' + G.kind, g: G.kind + '#' + G.gi, at: [Math.round(out[0]), Math.round(out[1])], vb: [W, H] });
        }
      });
    }

    reports.push({ svg: si, cap: cap, W: W, H: H, texts: texts.length, issues: issues });
  });
  return JSON.stringify(reports);
})()

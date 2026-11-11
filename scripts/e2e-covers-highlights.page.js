// e2e-covers-highlights.page.js — phase 3a: count highlight anchor hosts in
// the reading pane and make a live selection inside the first one (the
// palette should then appear; later evals click its swatches).
var r = {};
r.hosts = document.querySelectorAll('.lesson-body [data-hl]').length;
r.hostsOutsideBody = document.querySelectorAll('[data-hl]:not(.lesson-body [data-hl])').length;

var host = document.querySelector('.lesson-body [data-hl]');
var w = document.createTreeWalker(host, NodeFilter.SHOW_TEXT);
var nodes = [];
var len = 0;
var n;
while ((n = w.nextNode())) {
  nodes.push({ node: n, start: len });
  len += n.data.length;
}
function loc(off) {
  for (var i = 0; i < nodes.length; i++) {
    var t = nodes[i];
    if (off >= t.start && off <= t.start + t.node.data.length) return [t.node, off - t.start];
  }
  return null;
}
var a = loc(8);
var b = loc(Math.min(56, len - 2));
if (a && b) {
  var range = document.createRange();
  range.setStart(a[0], a[1]);
  range.setEnd(b[0], b[1]);
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
  r.selectedChars = sel.toString().length;
  r.hostKey = host.getAttribute('data-hl');
} else {
  r.selectedChars = 0;
}
r.paras = document.querySelectorAll('.lesson-body .lesson-p').length;
JSON.stringify(r);

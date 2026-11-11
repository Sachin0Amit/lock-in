#!/usr/bin/env bash
# e2e-covers-highlights.sh — runtime verification of the two features wired
# this run (owner directive 2026-11-11): CV-01 AI cover art in the UI
# (BookCover art branch on home cards + book page) and the multi-colour
# highlighter (selection palette → paint → popover recolour/note → panel
# jump/erase → persistence → repaint after collapsible/quiz mutations).
set -u
BASE=http://localhost:3000
OUT=/tmp/e2e-ch
mkdir -p "$OUT"

agent-browser set viewport 1280 900 >/dev/null 2>&1 || true

# console-error trap survives navigations only per-page; install fresh each page
trap_errors() {
  agent-browser eval "window.__e2eErrors=[];var _ce=console.error;console.error=function(){window.__e2eErrors.push([].slice.call(arguments).join(' '));_ce.apply(console,arguments)};'installed'" >/dev/null 2>&1 || true
}

echo "== 1. home page cover art =="
agent-browser open "$BASE/" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1500 >/dev/null 2>&1 || true
agent-browser eval "JSON.stringify({
  coverImgs: document.querySelectorAll('img[src*=\"covers\"]').length,
  gradientCards: Array.prototype.filter.call(document.querySelectorAll('main a[href^=\"/book/\"] > div > div'), function(d){return (d.style||{}).background && d.style.background.indexOf('gradient')>=0;}).length,
  sampleAlt: (document.querySelector('img[src*=\"covers\"]')||{}).alt === ''
})" 2>/dev/null | tee "$OUT/home.json"
agent-browser screenshot "$OUT/home-covers.png" >/dev/null 2>&1 || true

echo "== 2. book page large cover =="
agent-browser open "$BASE/book/advanced-algebra" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 1200 >/dev/null 2>&1 || true
trap_errors
agent-browser eval "var img=document.querySelector('img[src*=\"advanced-algebra\"]'); JSON.stringify({
  hasArt: !!img,
  natural: img ? (img.naturalWidth+'x'+img.naturalHeight) : null,
  titleOverlay: (function(){var t=document.querySelector('h1');return t? t.textContent.trim():''})(),
  consoleErrors: (window.__e2eErrors||[]).length
})" 2>/dev/null | tee "$OUT/book.json"
agent-browser screenshot "$OUT/book-cover.png" >/dev/null 2>&1 || true

echo "== 3. lesson highlighter =="
LESSON="$BASE/book/elementary-algebra/lesson/al-from-arithmetic-to-algebra"
agent-browser open "$LESSON" >/dev/null 2>&1 || true
agent-browser wait --load networkidle >/dev/null 2>&1 || true
agent-browser wait 2000 >/dev/null 2>&1 || true
trap_errors

# 3a. count highlight anchor hosts + make a selection inside the first one
agent-browser eval "$(cat /home/z/my-project/scripts/e2e-covers-highlights.page.js)" 2>/dev/null | tee "$OUT/lesson-select.json"

# 3b. palette should have appeared; click the yellow swatch
agent-browser eval "JSON.stringify({palette: !!document.querySelector('[role=toolbar].hl-floating'), swatches: document.querySelectorAll('[role=toolbar] .hl-swatch-btn').length})" 2>/dev/null | tee "$OUT/lesson-palette.json"
agent-browser eval "document.querySelector('[role=toolbar] .hl-swatch-btn').click(); 'clicked-yellow'" >/dev/null 2>&1 || true
agent-browser wait 400 >/dev/null 2>&1 || true

# 3c. mark painted + persisted + panel shows it (zustand persist wraps state
#     as {state: {byLesson}, version})
agent-browser eval "JSON.stringify({
  marks: document.querySelectorAll('mark.hl-mark').length,
  markColor: (document.querySelector('mark.hl-mark')||{}).className,
  storedLesson: Object.keys((JSON.parse(localStorage.getItem('lockin-highlights')||'{}').state||{}).byLesson['al-from-arithmetic-to-algebra']||{}).length,
  panelHintGone: document.body.textContent.indexOf('Select any text while reading') < 0
})" 2>/dev/null | tee "$OUT/lesson-mark.json"
agent-browser screenshot "$OUT/lesson-highlighted.png" >/dev/null 2>&1 || true

# 3d. click the mark -> popover -> recolour green
agent-browser eval "document.querySelector('mark.hl-mark').click(); 'clicked-mark'" >/dev/null 2>&1 || true
agent-browser wait 300 >/dev/null 2>&1 || true
agent-browser eval "JSON.stringify({popover: !!document.querySelector('.hl-popover'), greenBtn: !!document.querySelector('.hl-popover [aria-label=\"Recolour highlight in Green\"]')})" 2>/dev/null | tee "$OUT/lesson-popover.json"
agent-browser eval "document.querySelector('.hl-popover [aria-label=\"Recolour highlight in Green\"]').click(); 'recolored'" >/dev/null 2>&1 || true
agent-browser wait 300 >/dev/null 2>&1 || true
agent-browser eval "JSON.stringify({markColor: (document.querySelector('mark.hl-mark')||{}).className})" 2>/dev/null | tee "$OUT/lesson-recolour.json"

# 3e. add a note from the popover, save, verify panel row shows it
agent-browser eval "var b=Array.prototype.filter.call(document.querySelectorAll('.hl-popover button'),function(x){return /add note/i.test(x.textContent)}); if(b[0])b[0].click(); 'note-open'" >/dev/null 2>&1 || true
agent-browser wait 300 >/dev/null 2>&1 || true
agent-browser eval "var t=document.querySelector('.hl-popover textarea'); if(t){var s=Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype,'value').set; s.call(t,'definition worth revising'); t.dispatchEvent(new Event('input',{bubbles:true}));} 'typed'" >/dev/null 2>&1 || true
agent-browser eval "var s=Array.prototype.filter.call(document.querySelectorAll('.hl-popover button'),function(x){return /save/i.test(x.textContent)}); if(s[0])s[0].click(); 'saved'" >/dev/null 2>&1 || true
agent-browser wait 400 >/dev/null 2>&1 || true

# open the panel and verify the note + quote row
agent-browser eval "var trig=document.querySelector('footer [data-slot=collapsible-trigger], footer .group.flex'); var t=Array.prototype.filter.call(document.querySelectorAll('footer button,footer [role=button]'),function(x){return /highlights/i.test(x.textContent)&&!/clear|copy|erase|jump/i.test(x.textContent)}); if(t[0])t[0].click(); 'panel-open'" >/dev/null 2>&1 || true
agent-browser wait 400 >/dev/null 2>&1 || true
agent-browser eval "JSON.stringify({
  noteInStore: (function(){var s=JSON.parse(localStorage.getItem('lockin-highlights')||'{}');var l=((s.state||{}).byLesson||{})['al-from-arithmetic-to-algebra']||{};var k=Object.keys(l)[0];return k?(l[k].note||''):''})(),
  panelRowText: (function(){var li=document.querySelector('footer ul > li');return li?li.textContent.replace(/\\s+/g,' ').slice(0,90):''})()
})" 2>/dev/null | tee "$OUT/lesson-note.json"
agent-browser screenshot "$OUT/lesson-panel.png" >/dev/null 2>&1 || true

# 3f. React-safety: highlight inside a collapsible solution, collapse it,
# reopen — the mark must repaint and the page must stay alive
agent-browser eval "var show=Array.prototype.filter.call(document.querySelectorAll('button'),function(x){return /show solution/i.test(x.textContent)}); if(show[0])show[0].click(); 'sol-open'" >/dev/null 2>&1 || true
agent-browser wait 500 >/dev/null 2>&1 || true
agent-browser eval "
var sol=Array.prototype.filter.call(document.querySelectorAll('[data-hl]'),function(h){return !!h.closest('[data-slot=collapsible-content], .CollapsibleContent') || !!h.closest('[data-state=open]')});
var host=sol[0]||document.querySelector('.lesson-body [data-hl]');
var w=document.createTreeWalker(host,NodeFilter.SHOW_TEXT); var nodes=[]; var len=0; var n;
while((n=w.nextNode())){nodes.push({node:n,start:len}); len+=n.data.length;}
function loc(off){for(var i=0;i<nodes.length;i++){var t=nodes[i]; if(off>=t.start&&off<=t.start+t.node.data.length) return [t.node, off-t.start];} return null;}
var a=loc(2), b=loc(Math.min(24,len-1));
if(a&&b){var r=document.createRange(); r.setStart(a[0],a[1]); r.setEnd(b[0],b[1]); var s=window.getSelection(); s.removeAllRanges(); r&&s.addRange(r);}
'selected-in-solution'" >/dev/null 2>&1 || true
agent-browser wait 300 >/dev/null 2>&1 || true
agent-browser eval "document.querySelector('[role=toolbar] .hl-swatch-btn').click(); 'sol-highlighted'" >/dev/null 2>&1 || true
agent-browser wait 600 >/dev/null 2>&1 || true
agent-browser eval "JSON.stringify({marksNow: document.querySelectorAll('mark.hl-mark').length})" 2>/dev/null | tee "$OUT/lesson-solhl.json"
agent-browser eval "var show=Array.prototype.filter.call(document.querySelectorAll('button'),function(x){return /show solution/i.test(x.textContent)}); if(show[0])show[0].click(); 'sol-closed'" >/dev/null 2>&1 || true
agent-browser wait 800 >/dev/null 2>&1 || true
agent-browser eval "var show=Array.prototype.filter.call(document.querySelectorAll('button'),function(x){return /show solution/i.test(x.textContent)}); if(show[0])show[0].click(); 'sol-reopened'" >/dev/null 2>&1 || true
agent-browser wait 1400 >/dev/null 2>&1 || true
agent-browser eval "JSON.stringify({
  marksAfterReopen: document.querySelectorAll('mark.hl-mark').length,
  consoleErrors: (window.__e2eErrors||[]).length,
  consoleSample: ((window.__e2eErrors||[])[0]||'').slice(0,120)
})" 2>/dev/null | tee "$OUT/lesson-reopen.json"

# 3g. quiz interaction with marks on the page (re-render safety)
agent-browser eval "var quiz=Array.prototype.filter.call(document.querySelectorAll('section header'),function(h){return /check yourself/i.test(h.textContent)}).map(function(h){return h.parentElement})[0]; var btn=quiz?quiz.querySelectorAll('button[type=button]')[0]:null; if(btn)btn.click(); 'quiz-clicked'" >/dev/null 2>&1 || true
agent-browser wait 700 >/dev/null 2>&1 || true
agent-browser eval "JSON.stringify({alive: !!document.querySelector('mark.hl-mark'), consoleErrors: (window.__e2eErrors||[]).length})" 2>/dev/null | tee "$OUT/lesson-quiz.json"

# 3h. clear-all from the panel
agent-browser eval "var c=Array.prototype.filter.call(document.querySelectorAll('footer button, footer [role=button]'),function(x){return /clear all/i.test(x.textContent)}); if(c[0])c[0].click(); 'confirm-armed'" >/dev/null 2>&1 || true
agent-browser wait 300 >/dev/null 2>&1 || true
agent-browser eval "var c=Array.prototype.filter.call(document.querySelectorAll('footer button, footer [role=button]'),function(x){return /click again to erase all/i.test(x.textContent)}); if(c[0])c[0].click(); 'cleared'" >/dev/null 2>&1 || true
agent-browser wait 600 >/dev/null 2>&1 || true
agent-browser eval "JSON.stringify({
  marksLeft: document.querySelectorAll('mark.hl-mark').length,
  storedLessons: Object.keys((JSON.parse(localStorage.getItem('lockin-highlights')||'{}').state||{}).byLesson||{}).length
})" 2>/dev/null | tee "$OUT/lesson-cleared.json"
agent-browser screenshot "$OUT/lesson-final.png" >/dev/null 2>&1 || true

echo "== results =="
for f in home book lesson-select lesson-palette lesson-mark lesson-popover lesson-recolour lesson-note lesson-solhl lesson-reopen lesson-quiz lesson-cleared; do
  printf '%-16s %s\n' "$f" "$(cat $OUT/$f.json 2>/dev/null | tr -d '\n' | head -c 220)"
done
echo "DONE (screenshots in $OUT)"

/* --------------------------------------------------------------------------
 * Research Library renderer — books -> chapters -> topics scaffold.
 * Loads the registry (books-data.js: assignments + research queues), then
 * the department's shelf data (js/data/<shelf>.js) and renders it into
 * <div id="booksRoot">. Content is authored later: planned topics show as
 * outline pills, authored lessons as filled pills.
 * -------------------------------------------------------------------------- */
(function () {
  'use strict';

  var root = document.getElementById('booksRoot');
  if (!root) return;
  var dep = document.body.getAttribute('data-department');
  var assignments = window.COLLEGE_SHELF_ASSIGNMENTS || {};
  var spec = assignments[dep];
  if (!spec) return;

  var ICONS = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
    chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>'
  };

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function fmt(n) { return n.toLocaleString('en-US'); }

  /* ---------------------------------------------------------------- */
  /* Queue mode (research backlog — chapters come later)               */
  /* ---------------------------------------------------------------- */
  function renderQueue(queueKey) {
    var q = (window.COLLEGE_QUEUE || {})[queueKey];
    if (!q) { root.innerHTML = ''; return; }
    var areas = q.groups.reduce(function (s, g) { return s + g.items.length; }, 0);

    var html = '';
    html += '<div class="books-stats reveal-none">';
    html += statCard(fmt(areas), 'Research areas queued', ICONS.layers);
    html += statCard('0', 'Research phases opened', ICONS.clock);
    html += statCard('—', 'Chapters · topics', 'planned once research opens');
    html += statCard('—', 'Lessons authored', 'the cadence starts after research');
    html += '</div>';

    html += '<div class="queue-note"><strong>How this shelf grows.</strong> Each area below is a future title in the library plan. A book is created only when its research phase (reference survey + syllabus audit) is complete — then its chapter and topic plan is locked, exactly like the shelves on the other department pages. Nothing is padded in advance.</div>';

    html += '<div class="queue-groups">';
    q.groups.forEach(function (g) {
      html += '<div class="queue-group"><h3>' + esc(g.name) + '</h3><div class="queue-items">';
      g.items.forEach(function (it) {
        html += '<span class="queue-chip">' + ICONS.clock + '<span>' + esc(it) + '</span></span>';
      });
      html += '</div></div>';
    });
    html += '</div>';
    root.innerHTML = html;
  }

  function statCard(value, label, iconOrNote) {
    var isIcon = iconOrNote.indexOf('<svg') === 0;
    return '<div class="book-stat"><span class="book-stat-value">' + esc(value) + '</span><span class="book-stat-label">' +
      esc(label) + '</span>' +
      (isIcon ? '<span class="book-stat-icon">' + iconOrNote + '</span>'
              : '<span class="book-stat-note">' + esc(iconOrNote) + '</span>') +
      '</div>';
  }

  /* ---------------------------------------------------------------- */
  /* Shelf mode (researched books with chapter/topic plans)            */
  /* ---------------------------------------------------------------- */
  var state = { q: '', filter: 'all', openBooks: {} };

  function renderShelf(shelf, only) {
    var books = shelf.books.slice();
    if (only && only.length) {
      var want = {};
      only.forEach(function (id) { want[id] = true; });
      books = books.filter(function (b) { return want[b.id]; });
    }

    var totCh = 0, totTop = 0, totAuth = 0, totDone = 0, totProg = 0;
    books.forEach(function (b) {
      totCh += b.chapters.length;
      b.chapters.forEach(function (c) {
        totTop += c.topics.length + c.lessons.length;
        totAuth += c.lessons.length;
      });
      if (b.status === 'complete') totDone++;
      else if (b.status === 'in-progress') totProg++;
    });

    /* ---- stats ---- */
    var html = '<div class="books-stats">';
    html += statCard(fmt(books.length), 'Researched books', ICONS.book);
    html += statCard(fmt(totCh), 'Chapters planned', ICONS.layers);
    html += statCard(fmt(totTop), 'Topics mapped', ICONS.search);
    html += statCard(fmt(totAuth), 'Lessons authored', 'the rest are authored unit by unit');
    html += '</div>';

    /* ---- toolbar ---- */
    html += '<div class="books-toolbar">';
    html += '<div class="books-search">' + ICONS.search +
      '<input type="search" id="booksSearch" placeholder="Search books, chapters, topics…" aria-label="Search the research shelf"></div>';
    html += '<div class="books-filters" role="group" aria-label="Filter by status">';
    html += pill('all', 'All (' + fmt(books.length) + ')');
    if (totDone + totProg > 0) html += pill('authored', 'Authored (' + fmt(totDone + totProg) + ')');
    html += pill('planned', 'Planned (' + fmt(books.length - totDone - totProg) + ')');
    html += '</div>';
    html += '<div class="books-bulk">' +
      '<button type="button" class="btn btn-ghost btn-sm" id="booksExpand">Expand all</button>' +
      '<button type="button" class="btn btn-ghost btn-sm" id="booksCollapse">Collapse all</button></div>';
    html += '</div>';

    html += '<div class="books-grid" id="booksGrid"></div>';
    html += '<p class="books-resultnote" id="booksNote" role="status"></p>';
    html += '<p class="books-footnote">Status key — <span class="badge badge-plan">Planned</span> research complete, lesson text to be authored · ' +
      '<span class="badge badge-prog">In progress</span> chapters being written · ' +
      '<span class="badge badge-done">Complete</span> fully authored. Chapter plans come from the library\'s syllabus and reference surveys.</p>';

    root.innerHTML = html;

    var grid = document.getElementById('booksGrid');
    var note = document.getElementById('booksNote');
    var search = document.getElementById('booksSearch');

    function bookMatches(b, q) {
      if (!q) return true;
      var hay = (b.title + ' ' + b.subtitle + ' ' + b.description + ' ' + b.level).toLowerCase();
      if (hay.indexOf(q) !== -1) return true;
      for (var i = 0; i < b.chapters.length; i++) {
        var c = b.chapters[i];
        if ((c.title + ' ' + c.summary).toLowerCase().indexOf(q) !== -1) return true;
        for (var j = 0; j < c.topics.length; j++) {
          if (c.topics[j].toLowerCase().indexOf(q) !== -1) return true;
        }
        for (var k = 0; k < c.lessons.length; k++) {
          if (c.lessons[k].title.toLowerCase().indexOf(q) !== -1) return true;
        }
      }
      return false;
    }

    function statusOf(b) {
      if (b.status === 'complete') return { cls: 'badge-done', label: 'Complete' };
      if (b.status === 'in-progress') return { cls: 'badge-prog', label: 'In progress' };
      return { cls: 'badge-plan', label: 'Planned' };
    }

    function renderBookCard(b) {
      var st = statusOf(b);
      var top = 0, auth = 0;
      b.chapters.forEach(function (c) { top += c.topics.length + c.lessons.length; auth += c.lessons.length; });
      var a1 = b.accent[0], a2 = b.accent[1];
      var monogram = b.title.split(/\s+/).slice(0, 2).map(function (w) { return w.charAt(0); }).join('');

      var h = '<article class="book-card" data-id="' + esc(b.id) + '" data-status="' + esc(b.status) + '">';
      h += '<div class="book-head">';
      h += '<div class="book-cover" style="background:linear-gradient(150deg,' + esc(a1) + ' 0%,' + esc(a2) + ' 100%)">';
      h += '<span class="book-cover-badge ' + st.cls + '">' + st.label + '</span>';
      h += '<span class="book-cover-mono">' + esc(monogram) + '</span>';
      h += '<span class="book-cover-strip"></span>';
      h += '</div>';
      h += '<div class="book-info">';
      h += '<h3 class="book-title">' + esc(b.title) + '</h3>';
      if (b.subtitle) h += '<p class="book-subtitle">' + esc(b.subtitle) + '</p>';
      h += '<div class="book-meta">';
      if (b.level) h += '<span class="book-chip">' + esc(b.level) + '</span>';
      h += '<span class="book-chip">' + fmt(b.chapters.length) + ' chapters · ' + fmt(top) + ' topics</span>';
      if (auth > 0) h += '<span class="book-chip book-chip-done">' + fmt(auth) + ' lessons authored</span>';
      h += '</div>';
      h += '<p class="book-desc">' + esc(b.description) + '</p>';
      h += '<button type="button" class="book-toggle" aria-expanded="false"><span>View chapter plan</span>' + ICONS.chev + '</button>';
      h += '</div></div>';

      /* ---- chapter plan (collapsed) ---- */
      h += '<div class="book-body" hidden>';
      b.chapters.forEach(function (c) {
        var cDone = c.lessons.length > 0;
        var cBadge = c.status === 'complete' || cDone
          ? '<span class="badge badge-done">Authored</span>'
          : (c.status === 'in-progress' ? '<span class="badge badge-prog">In progress</span>' : '<span class="badge badge-plan">To author</span>');
        h += '<div class="chapter">';
        h += '<button type="button" class="chapter-head" aria-expanded="false">';
        h += '<span class="chapter-num">' + esc(c.n) + '</span>';
        h += '<span class="chapter-title">' + esc(c.title) + '</span>';
        h += cBadge;
        h += '<span class="chapter-count">' + fmt(c.topics.length + c.lessons.length) + ' topics</span>';
        h += ICONS.chev;
        h += '</button>';
        h += '<div class="chapter-panel" hidden>';
        if (c.summary) h += '<p class="chapter-summary">' + esc(c.summary) + '</p>';
        h += '<div class="topic-cloud">';
        c.lessons.forEach(function (l) {
          h += '<span class="topic-pill topic-authored">' + ICONS.check + '<span>' + esc(l.n) + ' · ' + esc(l.title) + '</span></span>';
        });
        c.topics.forEach(function (t) {
          h += '<span class="topic-pill">' + esc(t) + '</span>';
        });
        h += '</div></div></div>';
      });
      h += '</div></article>';
      return h;
    }

    function paint() {
      var q = state.q.trim().toLowerCase();
      var shown = 0;
      grid.innerHTML = books.map(function (b) {
        var okQ = bookMatches(b, q);
        var okF = state.filter === 'all' ||
          (state.filter === 'authored' && (b.status === 'complete' || b.status === 'in-progress')) ||
          (state.filter === 'planned' && b.status === 'planned');
        if (okQ && okF) { shown++; return renderBookCard(b); }
        return '';
      }).join('');
      note.textContent = q || state.filter !== 'all'
        ? shown + ' of ' + books.length + ' books shown'
        : '';
      wireCards();
    }

    function wireCards() {
      Array.prototype.forEach.call(grid.querySelectorAll('.book-card'), function (card) {
        var toggle = card.querySelector('.book-toggle');
        var body = card.querySelector('.book-body');
        if (toggle && body) {
          toggle.addEventListener('click', function () {
            var open = !body.hidden;
            body.hidden = open;
            toggle.setAttribute('aria-expanded', String(!open));
            card.classList.toggle('open', !open);
          });
        }
        Array.prototype.forEach.call(card.querySelectorAll('.chapter-head'), function (ch) {
          var panel = ch.parentElement.querySelector('.chapter-panel');
          if (!panel) return;
          ch.addEventListener('click', function () {
            var open = !panel.hidden;
            panel.hidden = open;
            ch.setAttribute('aria-expanded', String(!open));
            ch.parentElement.classList.toggle('open', !open);
          });
        });
      });
      /* restore previously opened books after re-paint */
      Object.keys(state.openBooks).forEach(function (id) {
        if (!state.openBooks[id]) return;
        var card = grid.querySelector('.book-card[data-id="' + id + '"]');
        if (card) {
          var body = card.querySelector('.book-body');
          var toggle = card.querySelector('.book-toggle');
          body.hidden = false;
          toggle.setAttribute('aria-expanded', 'true');
          card.classList.add('open');
        }
      });
    }

    function pill(key, label) {
      return '<button type="button" class="filter-pill' + (state.filter === key ? ' active' : '') + '" data-filter="' + key + '">' + esc(label) + '</button>';
    }

    search.addEventListener('input', function () { state.q = search.value; paint(); });
    root.addEventListener('click', function (e) {
      var p = e.target.closest ? e.target.closest('.filter-pill') : null;
      if (p) {
        state.filter = p.getAttribute('data-filter');
        Array.prototype.forEach.call(root.querySelectorAll('.filter-pill'), function (el) {
          el.classList.toggle('active', el === p);
        });
        paint();
      }
    });
    document.getElementById('booksExpand').addEventListener('click', function () {
      Array.prototype.forEach.call(grid.querySelectorAll('.book-card'), function (card) {
        state.openBooks[card.getAttribute('data-id')] = true;
        var body = card.querySelector('.book-body');
        body.hidden = false;
        card.querySelector('.book-toggle').setAttribute('aria-expanded', 'true');
        card.classList.add('open');
      });
    });
    document.getElementById('booksCollapse').addEventListener('click', function () {
      state.openBooks = {};
      Array.prototype.forEach.call(grid.querySelectorAll('.book-card'), function (card) {
        var body = card.querySelector('.book-body');
        body.hidden = true;
        card.querySelector('.book-toggle').setAttribute('aria-expanded', 'false');
        card.classList.remove('open');
      });
    });

    paint();
  }

  /* ---------------------------------------------------------------- */
  function loadScript(src, ok, fail) {
    var s = document.createElement('script');
    s.src = src;
    s.onload = ok;
    s.onerror = fail || function () {
      root.innerHTML = '<p class="books-footnote">The shelf data could not be loaded (' + esc(src) + ').</p>';
    };
    document.head.appendChild(s);
  }

  function boot() {
    if (spec.queue) { renderQueue(spec.queue); return; }
    if (spec.shelf) {
      loadScript('js/data/' + spec.shelf + '.js', function () {
        var shelf = window.COLLEGE_LIBRARY_SHELF;
        if (!shelf || !shelf.books) {
          root.innerHTML = '<p class="books-footnote">No shelf data for this department yet.</p>';
          return;
        }
        renderShelf(shelf, spec.only);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

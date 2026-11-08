# Custom Book Builder — feature documentation

Added 2026-11-08 (feature run); **unified one-desk upgrade 2026-11-08**.
A product feature inside the existing LockIn Library application: users
create **personalized academic books by curating existing Main Academic
Library content**.

**CORE PRINCIPLE: ONE MAIN ACADEMIC LIBRARY, UNLIMITED PERSONALIZED CUSTOM BOOKS.**

The Main Academic Library remains the TypeScript registry under
`src/data/library/` — the single source of truth for all academic content.
The Custom Book Builder never generates, researches, downloads or invents
academic content. Custom books store **only references** to canonical lesson
ids (stable forever by the `types.ts` contract) plus user-authored structure,
bookmarks, notes and reading progress.

## The two worlds

| | Main Academic Library | Custom Book Builder |
|---|---|---|
| Content | `src/data/library/**` (TS books) | references to lesson ids only |
| Storage | git (compile-time) | SQLite via Prisma (`db/custom.db`) |
| Mutability | the authoring workflow | user-curated, per-account |
| Public? | yes, unchanged | accounts for saving/reading state |

## User-facing flow

1. **`/builder` — “Build Your Own Book” — THE UNIFIED DESK.** All five
   creation methods live on **one screen** (collapsible source panels, each
   optional, freely combined) instead of a method picker:
   - *Quick start · examination* (GATE CSE, JEE Main/Advanced, UPSC CSE,
     CUET UG, NEET UG, CAT + free text) — built-in scope maps (topic NAMES
     only, used solely to select library content; the desk recognizes the
     exam **live** and previews its scope; unknown exams get honest
     guidance, never fabricated matches).
   - *Browse the Main Library* — searchable tree picker (discipline → book →
     chapter → topic; planned lessons shown greyed, not selectable).
   - *Paste a topic list* — paste any syllabus; a parser understands
     `Subject:`/`Chapter N:` headers, numbered/sub-numbered items,
     bullets, roman/alpha lists and indentation, with a live preview.
   - *Upload a syllabus PDF* — text layer via pdfjs-dist (font-size &
     pattern based structure detection); scanned PDFs fall back to
     pdftoppm + tesseract OCR; the extracted structure is always shown
     **for user review/editing** before any search happens.
   - *Merge an existing custom book* — its topics are merged in; duplicates
     removed automatically.

   A sticky **request rail** lists every collected source as a removable
   chip with live counts (≈ topics requested), a single **“Find matching
   library lessons”** CTA (Ctrl/⌘+Enter), sign-in hints and draft resume.
   Deep links prefill the desk: `/builder?exam=…&topics=…&book=…&base=…`.
   A three-step stepper tracks Compose → Review matches → Curate & publish.
2. **Review matches** — every requested topic gets a status:
   `exact` / `equivalent` (synonym groups, chapter & book expansions) /
   `partial` / `not_available`. The header shows **which sources were
   searched**; non-fatal warnings (e.g. an unrecognized exam beside other
   sources) are shown without blocking. Alternatives can be swapped;
   prerequisites available in the library are surfaced as one-click
   additions. Going “Back to your sources” preserves all desk state.
3. **Curate the TOC** — reorder chapters/topics, rename, remove, add more
   library topics; edit title/description; save draft or publish. Wizard
   state persists in `localStorage` (`lockin-builder-draft`) for resuming.
4. **`/my-books` — bookshelf** — covers, counts, honest coverage %,
   reading progress, status; actions: read, continue, edit, coverage
   report, duplicate, archive, delete.
5. **`/my-books/[bookId]`** — structure editor (explicit save), full
   coverage report, settings (metadata, publish/archive, duplicate,
   delete-with-warning).
6. **`/my-books/[bookId]/read` — the reader** — left collapsible TOC
   (desktop sidebar / mobile sheet), the referenced library lesson rendered
   with the library's own `BlockRenderer` (KaTeX, quizzes, figures, tables,
   exercises — nothing flattened), prev/next + keyboard ←/→/B/C, reading
   progress (per-book, server-side), bookmarks, personal notes (side
   sheet), full-text search within the book, font-size controls, light/dark
   themes, last-position restore.

## Architecture

```
src/lib/builder/            engine (server) + shared types + client API
  types.ts                   isomorphic contracts (TopicNode, MatchStatus…)
  match-input.ts             unified multi-channel request planner: any mix of
                             exam + topicText + parsed + selection + base book
                             → one MatchPlan (derivedMethod, sources, warnings,
                             legacy per-method validation preserved)
  catalog.ts                 flattens the registry → records + versionHash
                             (sha256 of lesson content) + library tree API shape
                             (words via countLessonWords — authored or computed)
  topic-parser.ts            pasted-text/OCR-lines → topic hierarchy (isomorphic)
  matcher.ts                 the discovery engine: normalisation, academic
                             synonym groups, scoring (exact 1.0 → synonym .93 →
                             concept .9 → title-containment .7 partial →
                             guarded overlap), chapter/book expansions,
                             prerequisites, dedupe, alternatives
  toc.ts                     TOC proposal + server-side validation
  exam-templates.ts          curated exam scope maps (selection aids only)
  pdf-extract.ts             pdfjs text layer → OCR fallback → structure
  books-service.ts           persistence: create/get/list/update/duplicate/
                             delete + invariant enforcement (records exist,
                             no duplicate lessons, honest coverage rows)
  client-api.ts              typed fetch helpers for the client
src/components/builder/      all UI (unified desk, shelf, detail, reader…)
src/app/api/**               17 route handlers (below)
prisma/schema.prisma         User, Session, CustomBook, CustomBookChapter,
                             CustomBookContentReference (unique per book+record),
                             CustomBookBookmark/Note/Progress, CustomBookCoverage
```

### APIs

- `POST /api/auth/register|login|logout` · `GET /api/auth/me`
- `GET /api/library/tree` · `GET /api/library/search?q=` ·
  `GET /api/library/lessons/[lessonId]` (full blocks JSON for the reader)
- `POST /api/builder/match` — **unified**: any mix of `exam`, `topicText`,
  `parsed`, `selection`, `baseBookId` in one request (legacy single-method
  bodies with an explicit `method` keep their stricter validation). Returns
  matches + TOC + coverage + `derivedMethod` + `sources` + `warnings`.
- `POST /api/builder/upload-pdf` (multipart; ≤15 MB; OCR fallback)
- `GET|POST /api/custom-books` · `GET|PATCH|DELETE /api/custom-books/[bookId]`
  · `POST …/duplicate` · `GET …/search?q=` (in-book full-text)
- `GET|POST|DELETE …/bookmarks` · `GET|POST …/notes` ·
  `PATCH|DELETE …/notes/[noteId]` · `GET|PUT …/progress`

### Data isolation & invariants

- Every custom-book query is scoped by `userId`; foreign ids return 404.
- `validateToc`/`validateCoverage` reject unknown records, duplicate lessons
  per book, and dishonest coverage rows (matched-without-record or
  not_available-with-record).
- Deleting a custom book cascades only builder tables — the library is not
  in this database and can never be affected.
- Coverage rows change only when the client explicitly replaces them;
  editing structure never rewrites the gap report.

### Content versioning

Each reference pins `selectedVersion` (content hash at selection time).
The detail/reader endpoints compare it with the live hash and flag
`updateAvailable` per topic; ordering, bookmarks, notes and progress are
keyed by stable record ids and therefore preserved across library updates.
Live references only — no content snapshots are stored (deliberately:
the library is the single academic source).

## Quality gates (all green, 2026-11-08, unified-desk run)

- `bun run scripts/verify-custom-book-builder.ts` — **78/78** engine checks
  (parser shapes, honest statuses, synonym/containment behaviour, expansions,
  prerequisites, dedupe, coverage arithmetic, validation, PDF extraction,
  **+23 unified-input planner checks**: multi-channel plans, derived methods,
  legacy strictness, unknown-exam-beside-other-sources, node coercion,
  engine assembly of combined plans). PDF fixture reproducible via
  `python3 scripts/make-syllabus-fixture.py`.
- `bun run scripts/smoke-custom-books.ts` — **57/57** API checks (auth,
  permissions isolation between users, CRUD, reorder, publish validation,
  bookmarks/notes/progress, in-book search, duplicate/delete, version drift
  detection, logout).
- `bash scripts/e2e-custom-book-builder.sh` — **62/62 × 2 runs** browser E2E
  via agent-browser: guest combined-sources journey (exam chip + pasted
  topics in ONE request → sources badges → back-to-desk state preservation →
  per-source removal), then the full registered journey (register →
  topic-list book → honest review → curate/reorder → publish → coverage
  report → reader with KaTeX, progress, bookmark, note, keyboard navigation
  → shelf → delete), desktop 1280 + mobile 390 + dark mode, 0 console
  errors, no horizontal overflow.
- `python3 scripts/visual-check-builder.py` — programmatic screenshot sanity
  (ink distribution, two-column desk + rail, mobile gutters) over 7 pages.
- `bunx tsc --noEmit` clean · `bunx eslint` 0 errors · all routes 200.

## Known limitations (honest)

- **Exam scope maps are approximate** topic-name lists for selection only;
  they are not official syllabi, and unknown examinations are not guessed.
- **OCR is environment-dependent**: the text layer (pdfjs-dist, portable)
  always works; the scanned-PDF path needs `pdftoppm` + `tesseract` on the
  host (present in this sandbox; a clear error message is shown otherwise).
- PDF table extraction is best-effort (columns are joined); the mandatory
  review step lets users fix structure before matching.
- Large PDFs are parsed synchronously (≤ 15 MB, ≤ 80 pages; OCR ≤ 20 pages)
  — background job processing was not needed at the current library scale
  and is not implemented.
- The reader's in-book quiz interactions also record device-local progress
  (existing library behaviour) in addition to per-book server progress.
- Draft books on the shelf are visible only to their owner; there is no
  sharing/collaboration (not requested).

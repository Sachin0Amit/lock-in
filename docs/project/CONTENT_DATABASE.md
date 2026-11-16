# Content Database — the delivery layer for the Main Academic Library

**Status:** live since 2026-11-16 · owner directive: "I want a database which stores [the books], and when the website runs… the user clicks on any chapter, that data is fetched from there… the website would not be heavy, and any person cannot directly steal everything."

## The one-paragraph summary

The TypeScript files under `src/data/library/` remain the **authoring** source of truth (git diffs, the verify/E2E gate battery, and the house authoring conventions all live there). A packer (`bun run lib:pack`, backed by `scripts/pack-library.ts`) compiles that registry into three SQLite tables in `db/custom.db`. Every reading route — home, book, lesson, glossary, flashcards — is now served **on demand from those tables**, never from the TS registry, and never from the client bundle. The deployed site is one server plus one database file.

## The pipeline

```
authoring (TS, git)               delivery (SQLite, on demand)
──────────────────────            ─────────────────────────────
src/data/library/**/book.ts       db/custom.db
src/data/library/**/ch-NN.ts  ──►   LibraryBook   (outline + stats)
src/data/library/index.ts          LibraryLesson (full lesson JSON)
        scripts/pack-library.ts     ContentPack   (version singleton)
                                   ▲
        force-dynamic pages: /  /book/[bookId]  /book/[bookId]/lesson/[lessonId]
        /book/[bookId]/glossary  /book/[bookId]/revise  /api/library/index
        (src/lib/library-db.ts — cached per pack version)
```

- **`LibraryBook`** — one row per book (planned books included). `outlineJson` is the full `Book` object with every written lesson reduced to a stub `{ id, number, title, concepts, words, blocks: [] }`; `statsJson` carries the packer-computed `bookStats` (honest term/formula counts the stubs cannot know).
- **`LibraryLesson`** — one row per written lesson, keyed by the **canonical lesson id** (the packer never invents ids — every persisted reference in custom books, practice runs and the revision ledger keeps resolving forever). `contentJson` holds the complete lesson (blocks, LaTeX, SVG figures, quizzes, exercises). `position` is the global reading order, so prev/next navigation is one indexed lookup.
- **`ContentPack`** — a singleton row stamped by every pack run. The server reads it on each request (one indexed row, sub-millisecond) and caches parsed content **keyed by its version**: a `lib:pack` while the server is live is picked up on the very next request — no restart.

## The client-bundle fix (the actual theft hole, closed)

Before this pass, client components imported the registry directly, so the **entire written library shipped inside the browser JavaScript** — verified live: a 211 KB chunk of `elementary-algebra/ch-01.ts` was served with the home page (`scripts/audit-client-bundle.sh` recorded 3 leak hits). After the pass the same audit reports **CLEAN** on every reading route.

The rule that keeps it closed:

- `src/data/library/derive.ts` — **client-safe**: pure functions on passed-in values (`paths`, `bookStats`, `bookGlossary`, `bookFormulas`, `headingAnchor`, `disciplineOf`, `bookLessons`, the UI prop types). Client components may import ONLY this.
- `src/data/library/index.ts` — **server-only**: the data-bound registry (`allBooks`, `allLessons`, `findLesson`, `searchLibrary`, `libraryStats`). Re-exports the pure helpers so server consumers (builder catalog, practice engine, packer) are untouched. If a `'use client'` file ever imports it again, the whole library leaks into the bundle — code-review line.

Client data flows now: the home receives a serialisable `LibrarySnapshot` prop (book cards + stats + lesson stubs); the book page passes the outline `Book` + precomputed stats; the lesson page passes the one `LessonRef` plus server-computed `prev`/`next`/`prereqs`; the command palette searches through `/api/library/search` and navigates off the stub index from `/api/library/index` (`src/lib/library-client.ts`). The dead `app-shell.tsx` (never routed, registry-importing) was deleted.

## Workflow

| When | Command | What it does |
| --- | --- | --- |
| after authoring any book/lesson | `bun run lib:pack` | full repack + self-verification (row counts vs registry census, exit 1 on mismatch) |
| deploy / CI sanity | `bun run lib:check` | drift check only — fails if DB ≠ registry |
| first setup / schema change | `bun run db:push` | applies the Prisma schema, regenerates the client |

Deploy order: `db:push` → `lib:pack` → `build`. Current pack: **269 books / 2,172 chapters / 145 written lessons / 721,908 words → 9.25 MB**.

Standing verification: `scripts/verify-content-db.sh` (19 checks — routes, APIs, the DB-mutation proof that pages follow database edits over the live TS registry, the bundle-leak audit on every route type, 404s, builder/practice surfaces, `lib:check`).

## What this protects — and the honest limit

Protected now: the TS/LaTeX/SVG **source** never ships; there is no static folder of lesson pages to download and no bulk endpoint — a visitor's browser receives exactly the one lesson they open; wholesale mirroring requires crawling URL by URL. Deliberate, still open (candidate roadmap): per-IP/per-account rate limiting on lesson routes; login-gated full lesson bodies with a blurred anonymous preview (the account system already exists); invisible per-reader watermarking; moving `/api/library/search` and `/api/library/lessons/[lessonId]` (currently registry-backed, server-side only — no client leak, but they stay consistent only after a repack) onto the database, optionally via SQLite FTS5; server-side KaTeX so even the visited lesson's raw LaTeX never reaches the browser. The hard limit stands: a determined reader can always save pages one at a time — the posture is "slow, traceable, legally actionable", the same as every commercial content platform. `robots.txt` is intentionally open (SEO is a product decision).

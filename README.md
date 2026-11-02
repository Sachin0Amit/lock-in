# LockIn Library

A growing digital library of complete, professionally written textbooks —
from absolute zero to research level — rendered in a distraction-free,
typeset reading platform.

**Books are TypeScript data.** Every chapter is type-checked
(`src/data/library/`), version-controlled, and rendered with KaTeX
equations, original SVG figures, derivations, worked examples, interactive
quizzes and graded exercises with full solutions.

## Run it

```bash
bun install
bun run dev        # http://localhost:3000
bun run lint       # code quality
```

## Project map

```
src/
  app/                         Next.js 16 App Router (single-page reader)
  components/library/          reader UI: home / book / lesson / blocks / math
  data/library/
    types.ts                   THE content model (authoring contract)
    disciplines.ts             the 11 shelves
    index.ts                   registry + search + stats
    books/<discipline>/<book>/ book.ts + ch-NN.ts chapters
docs/project/                  the project's memory — READ FIRST each session
  MASTER_PLAN.md               mission, source workflow, quality gates, rules
  BOOK_FORMAT.md               how to author a book (with checklist)
  PROGRESS.json                machine-readable state
  RESUME_POINTER.json          what to do next
  WORKLOG.md                   append-only journal
  SOURCE_LOG.md                Google Drive download/usage ledger (9 GB law)
  EXAM_REGISTRY.json           50+ examination research target
  SUBJECT_BACKLOG.md           full library plan per discipline
```

## Authoring in one paragraph

A lesson is an array of typed blocks — `para`, `heading`, `callout`
(insight/warn/definition/theorem/historical/exam), `terms`, `equation`,
`derivation`, `example`, `figure` (inline SVG), `table`, `list`, `quiz`,
`exercises` (levels L1–L6 with worked solutions). Inline math is
`$...$`. Lesson ids are globally unique and stable forever because they key
reader progress. Full guide: `docs/project/BOOK_FORMAT.md`.

## Status

Foundation Mathematics (Mathematics shelf) — chapter 1 of 11 in progress.
The full plan lives in `docs/project/SUBJECT_BACKLOG.md`; the workflow and
rules in `docs/project/MASTER_PLAN.md`.

All content is original educational material authored for this project.
Reference books inform and verify concepts; they are never reproduced.

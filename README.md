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

## Pushing to GitHub (owner access)

The sandbox holds no write credentials for
`git@github.com:Sachin0Amit/lock-in.git`. To let the agent push directly,
create a **fine-grained personal access token**:

1. GitHub → *Settings → Developer settings → Personal access tokens →
   Fine-grained tokens → Generate new token*
   (direct link: <https://github.com/settings/personal-access-tokens/new>).
2. Name it e.g. `lock-in-agent`, expiration **7 days** — it only needs to
   survive the push session.
3. *Repository access* → **Only select repositories** → `Sachin0Amit/lock-in`.
4. *Permissions* → Repository permissions → **Contents: Read and write**
   (nothing else).
5. Generate, copy the token (`github_pat_…`) and paste it in chat.
6. It is used once to configure the remote and push, never echoed back;
   **revoke it** (token page → Delete) after the session or any time.

A classic token with the `repo` scope also works but grants far more than
needed — prefer fine-grained. The agent never commits or stores the token
in files; it lives only in the git remote URL for the session.

## Project map

```
src/
  app/                         Next.js 16 App Router — routed, statically generated:
                                 /  ·  /book/[bookId]  ·  /book/[bookId]/lesson/[lessonId]
                                 /book/[bookId]/revise (flashcards)  ·  /book/[bookId]/glossary
  components/library/          site chrome, command palette (Ctrl/Cmd+K), reader
                                 (scrollspy TOC, progress bar, keyboard shortcuts),
                                 blocks, flashcards, glossary, progress store
  data/library/
    types.ts                   THE content model (authoring contract)
    disciplines.ts             the 11 shelves
    index.ts                   registry + full-text search + stats + paths
    books/<discipline>/<book>/ book.ts + ch-NN.ts chapters
docs/project/                  the project's memory — READ FIRST each session
  MASTER_PLAN.md               mission, source workflow, architecture (§8), rules
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
(insight/warn/definition/theorem/historical/exam), `terms` (feeds flashcards
and the glossary automatically), `equation`, `derivation`, `example`,
`figure` (inline SVG), `table`, `list`, `quiz` (best score remembered),
`exercises` (levels L1–L6 with worked solutions), `formula` (revision card →
formula sheet), `algorithm` (pseudocode). Lessons may declare
`prerequisites` (lesson-id links) and `sources` (SOURCE_LOG.md keys).
Inline math is `$...$`. Lesson ids are globally unique and stable forever
because they key reader progress. Full guide: `docs/project/BOOK_FORMAT.md`.

## Status

Foundation Mathematics (Mathematics shelf) — chapter 1 of 11 in progress.
**Authoring cadence (owner directive): one unit — one chapter — of one
subject at a time.** The full plan lives in
`docs/project/SUBJECT_BACKLOG.md`; the workflow and rules in
`docs/project/MASTER_PLAN.md`.

All content is original educational material authored for this project.
Reference books inform and verify concepts; they are never reproduced.

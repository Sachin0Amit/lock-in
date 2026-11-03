# BOOK FORMAT — how textbooks are authored in this repo

Books are **TypeScript data**, type-checked and rendered by the platform's
lesson reader. This file is the authoring contract; the machine contract is
`src/data/library/types.ts`.

## File layout

```
src/data/library/
  types.ts                    content model + word counter
  disciplines.ts              the 11 shelves
  index.ts                    registry: import books here
  books/
    <discipline>/
      <book-id>/
        book.ts               metadata + full TOC (assembled chapters)
        ch-01.ts              one file per chapter
        ch-02.ts
```

## Authoring cadence (owner directive 2026-11-03)

**One unit of one subject at a time.** A unit = one chapter (`ch-NN.ts`).
Research, author, verify and ship a single chapter before touching the
next; never batch-draft multiple chapters. Books complete chapter by
chapter. Full workflow: `docs/project/MASTER_PLAN.md` §2.

## Authoring a chapter

1. **Copy the shape** of an existing chapter file (see
   `books/mathematics/foundation-mathematics/ch-01.ts` — the reference
   exemplar: it uses every block type correctly).
2. Export a `Chapter` object. Lesson ids are kebab-case, globally unique,
   **stable forever** (they persist in readers' progress/bookmarks).
3. Register the chapter in the book's `book.ts`; planned lessons belong in
   `plannedLessons: string[]` until written.
4. New book? Create the folder, export a `Book`, import it in
   `src/data/library/index.ts` → `allBooks`. The home page, search, stats and
   navigation pick it up automatically.
5. `bun run lint` + open the app; read the chapter in the reader.

## Block types (the toolkit)

| Block | Use for | Notes |
|---|---|---|
| `para` | body prose | supports `$inline math$`, `**bold**`, `*italic*` |
| `heading` | section heading (h2) | auto-styled with rule; anchor id auto-derived for the scrollspy TOC |
| `callout` | insight / warn / definition / theorem / historical / exam | `tone` picks the colour |
| `terms` | definition lists | term + def pairs; **feeds the book's flashcards and glossary automatically** |
| `equation` | display math, centred | KaTeX source; `\tag{n}` numbers it; `note` = "where…" prose |
| `derivation` | step-by-step proofs | label + formula + why, per step; result boxed |
| `example` | worked examples | numbered steps |
| `figure` | inline SVG | self-contained, viewBox, labels match prose text |
| `table` | tabular data | auto-styled; cells support `$math$` |
| `list` | bullet/ordered lists | |
| `quiz` | self-check MCQs | interactive in the reader; `answer` = option index; `explain` says why wrong options fail; best score persisted per lesson |
| `exercises` | graded question sets | levels L1–L6; every question carries a full worked `solution` — **as a steps array** (see below) |
| `formula` | revision formula card | name + KaTeX + note; **aggregated into the auto "Formula sheet" page** — use for every must-recall formula |
| `algorithm` | pseudocode / procedures | numbered monospace lines with optional per-line notes; for CS books and stepwise methods |

## Lesson-level fields

- `prerequisites?: string[]` — ids of lessons the reader should know first;
  rendered as completion-aware chips at the top of the lesson.
- `sources?: string[]` — citation keys into `docs/project/SOURCE_LOG.md`,
  rendered at the lesson footer. Omit for purely original exposition.
- `concepts` — 5–8 key phrases (search + recap chips).
- `objectives?` — "by the end you will be able to…" list.

## House style (from the master instruction §5–7)

- **Depth**: explain from zero; intuitive → formal; no unexplained symbols.
- **Derivations**: every non-trivial formula gets a `derivation` block.
- **Figures**: original SVG, labelled axes/units, caption that teaches.
  Figure numbers are auto-assigned by the reader.
- **Questions**: 6 difficulty levels (L1 beginner → L6 research/olympiad);
  solutions include strategy, not just answers.
- **Worked-solution format (owner directive 2026-11-03)**: every
  `solution` is written as an **array of short steps** — one worked line per
  array entry, words + `$math$` mixed, like a handwritten worked solution
  ("Seat the digits right to left: …", "Expanded form: $…$", "…").
  Lead-in words per step (Split / Take / Check / Hence …); keep each step to
  one move. End with `answer: '…'` (a single result line) whenever the
  question has a crisp final result — it renders as a boxed Answer row.
  Never one dense paragraph. All 125 pre-existing solutions were migrated
  to this format on 2026-11-03 (`scripts/convert-solutions-to-steps.py`,
  token-preserving).
- **Exams**: label items "exam-style" unless sourced from an official paper;
  add an `exam` callout mapping the lesson to real examinations.
- **Honesty**: `words`/`readMins` are computed automatically — never inflate.
- **No duplication**: if another book teaches it, cross-reference
  (`prerequisites`, prose mentions) instead of repeating.

## Verification checklist per chapter

- [ ] All math recomputed by script or by hand (no copy-paste errors)
- [ ] Every figure label appears in the prose terminology
- [ ] Quiz `answer` indices point at the intended option
- [ ] Exercise solutions complete and numerically verified
- [ ] Lesson ids globally unique (grep before adding)
- [ ] Lint clean; chapter renders correctly in the reader (all block types)
- [ ] `WORKLOG.md` + `PROGRESS.json` updated

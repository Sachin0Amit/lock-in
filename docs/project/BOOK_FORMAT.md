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

**The TOC-as-lessons contract (owner directive 2026-11-11):** every lesson
authored by a scheduled run follows `docs/project/TOC_LESSON_GUIDE.md` — the
pre-flight checklist (read the pointer → the format contract → consult
`docs/project/TOC_FOLD_LEDGER.json` for folds hosted by your lesson), the
lesson anatomy bar, and the seven fold modes' minimum treatments for surveyed
TOC topics that do not require a separate lesson. Standing gate:
`bun run scripts/verify_toc_as_lessons.ts`.

**One full chapter per scheduled run** (owner directive 2026-11-06; cadence
moved hourly → every 2 hours by owner chat directive the same day): every
not-yet-written lesson of the current chapter plus the unit completion
review is authored in a single run — same or higher per-lesson depth;
lessons stay sequential and are never batch-drafted or thinned to fit
the run.

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
| `heading` | theory section heading | rendered Cengage-style: ink-green ALL-CAPS over a thin green rule (authors write Title Case — the reader uppercases); anchor id auto-derived for the scrollspy TOC |
| `callout` | insight / warn / definition / theorem / historical / exam | rendered as printed **note boxes** — tinted panel, small-caps label lead-in (Note / Caution / Definition / Theorem / Historical note / Exam corner) + bold title; `tone` picks the colour |
| `terms` | definition lists | term + def pairs; **feeds the book's flashcards and glossary automatically**; terms print in ink-green |
| `equation` | display math, centred | KaTeX source; `\tag{n}` numbers it; `note` = "where…" prose |
| `derivation` | step-by-step proofs | green-ruled title, steps on a green rail (no step numbers — owner directive 2026-11-03), boxed Result — the book's reasoned-argument presentation |
| `example` | worked examples | rendered as **Illustrations** (Cengage): auto-numbered green pill `ILLUSTRATION n`, the `title` on a sage tinted band, then the **Cengage solution chain** — `Sol.` pill inline on the first line + connective tag column, unnumbered (owner directive 2026-11-03). `title` must be a crisp problem statement |
| `figure` | inline SVG | self-contained, viewBox, labels match prose text; **vivid palette below** (owner directive 2026-11-08 — the old muted olive/gray set was retired for poor visibility); structure strokes ≥1.2 px, plain labels |
| `table` | tabular data | sage header row in ink-green + alternating tinted rows; cells support `$math$` |
| `list` | bullet/ordered lists | `marker: 'roman'` renders the Cengage `(i) (ii) (iii)` example-run enumeration |
| `quiz` | self-check MCQs | green bar header; interactive in the reader; `answer` = option index; `explain` says why wrong options fail; best score persisted per lesson |
| `exercises` | graded question sets | green bar header (Cengage exercise banner); hairline-separated questions, no cards; levels L1–L6; every question carries a full worked `solution` — **as a steps array** (see the Cengage solution chain below), printed with the `Sol.` pill inline + tag column + terminal ∴ answer line |
| `formula` | revision formula card | name + KaTeX + note; **aggregated into the auto "Formula sheet" page** — use for every must-recall formula |
| `algorithm` | pseudocode / procedures | monospace lines with optional per-line notes, **unnumbered** (owner directive 2026-11-03); for CS books and stepwise methods |

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
- **Figure colour palette (owner directive 2026-11-08: "bright colour — the
  old colours were dull, visibility was less")**: every figure SVG uses the
  **vivid figure palette** below. Warm-academic hues only — green, lime,
  teal, amber, orange, red; **never blue or indigo**. The reader renders
  each figure on a light paper plate (`#fffdf5`, ink `#1c1917`) in BOTH
  light and dark themes, so pick hexes for visibility on warm paper —
  they are guaranteed to keep working after dark.

  | Role | Hex | Swatch idea | Old (retired, do not reuse) |
  |---|---|---|---|
  | structure strokes — boxes, axes, node circles | `#16a34a` | vivid green | `#3f6212` olive |
  | primary text — titles, emphasised labels | `#166534` | rich green ink | `#365314` olive-black |
  | mid text — formulas, values, second-level labels | `#65a30d` | bright lime | `#4d7c0f` olive |
  | captions, footnote text, light strokes | `#0d9488` | vivid teal | `#6b7a72` gray-green |
  | connector lines, ticks, operand/leaf text | `#d97706` | bright amber | `#9a6b2f` / `#7c5a2e` dull brown |
  | accent — key values, arrows, highlighted bars | `#ea580c` | vivid orange | `#b45309` muted amber |
  | teal structure (number lines, secondary boxes) | `#0d9488` | vivid teal | `#1f5c4d` dark teal |
  | teal primary text | `#0f766e` | teal ink | `#123f35` near-black teal |
  | refusal / warning / negative verdict | `#dc2626` | vivid red | `#7c2d12` / `#9a3412` brown-red |
  | tinted panel fills | `#fef3c7` / `#ffedd5` | amber/orange-100 | `#fdf8ef` / `#f5eddd` cream |
  | light separators | `#fcd34d` | amber-300 | `#d8d2c2` |
  | faint grids, unpicked borders, dots | `#5eead4` | teal-300 | `#b9c6bd` / `#b9c4bd` |
  | white text inside filled bars | `#ffffff` | unchanged | — |

  Rules: hard-coded `#rrggbb` only (hex is stable across themes because
  of the paper plate); `currentColor` is allowed for whole-figure ink that
  should follow the plate text colour. Text roles keep ≥4.5:1 on `#fffdf5`,
  stroke roles ≥3:1. When a figure needs a NEW colour, add it to this table
  first (same warm families, same contrast floors) — never invent a muted
  olive/gray halfway hue. Chapter job scripts that assert figure colours
  (e2e / audit / generators) must reference these exact hexes.
- **Questions**: 6 difficulty levels (L1 beginner → L6 research/olympiad);
  solutions include strategy, not just answers.
- **Cengage theory presentation (owner directive 2026-11-03)**: the theory
  of every lesson is written and laid out in the manner of the Cengage JEE
  mathematics books (the Drive `MATHS` M1–M5 modules — style reference
  studied 2026-11-03, no content reproduced). The **look** is automatic —
  the reader renders section heads as ink-green caps over a rule,
  illustrations as green pills + sage bands, exercises under green bars.
  The **voice** is the author's job:
  - **Definitions** open formally — "*X* is said to be … if …" — and are
    followed by a symbolic restatement on its own line: "Thus,
    $A \subseteq B \Leftrightarrow x \in A \Rightarrow x \in B$." Keep
    the `definition` callout + `terms` entries for the same idea.
  - **Example runs** after a definition use "For example," followed by a
    `list` with `marker: 'roman'` — items `(i)`, `(ii)`, `(iii)`.
  - **Properties lists** ("Properties of …") are plain bullet lists, one
    property per bullet, each with a verified instance.
  - **Illustrations**: `example.title` is a crisp problem statement
    ("Round 5,768 to the nearest ten, hundred and thousand"), `steps` the
    worked solution in the Cengage solution-chain format below — first
    step states the setup, later steps make one move each, final step
    concludes ("Hence …").
  - **Notes and cautions**: short, boxed, single-idea — the `insight`
    callout prints as a "Note" box, `warn` as "Caution".
  - **Summary lines** that harvest a section ("From the above discussion,
    it follows that …") use `list marker: 'roman'` or an `equation` with
    `\tag`.
- **Cengage solution chain (owner directive 2026-11-03: "the solution
  should also be in cengage style" — style re-grounded by studying the
  M2/01 worked solutions + S.x solutions pages, no content reproduced)**:
  every `solution` is written as an **array of short worked lines** — one
  move per entry, words + `$math$` mixed — and the renderer prints them
  exactly as Cengage prints its solutions:
  - the **"Sol." pill sits inline at the start of the first solution
    line** (never on a row of its own), the remaining lines hanging
    under it;
  - lines that open with a connective get it parsed into a **fixed left
    tag column** — the staircase: `Hence/Thus/Therefore` → **∴** (KaTeX),
    `or` → **or**, `Now,/So,/But/And` → the word; lines with no
    connective run full width as prose (the book interleaves both);
    `Case (i):`-led lines print the lead bold;
  - the **`answer` prints as the terminal ∴ line** of the chain
    (green-ink, medium weight) — Cengage boxes nothing and labels
    nothing "Answer:"; a literal `Answer:`/`Hence:` prefix in the data
    is stripped at display time;
  - **no step numbers anywhere** (owner directive 2026-11-03, "no need
    to show the steps number") — the lead-in connectives carry the
    sequence; **no boxed Answer row** (removed 2026-11-03 to match
    Cengage).
  Authoring rules: lead lines with the natural connectives (Split /
  Take / Check / Now, / So, / or / Hence …), one move per line, never a
  dense paragraph; end with `answer: '…'` whenever there is a crisp
  final result. All 125 pre-existing solutions were migrated to the
  steps format on 2026-11-03 (`scripts/convert-solutions-to-steps.py`,
  token-preserving) — the chain layout is display-only, so every one of
  them renders in the Cengage manner with zero content edits.
- **Exams**: label items "exam-style" unless sourced from an official paper;
  add an `exam` callout mapping the lesson to real examinations.
- **Honesty**: `words`/`readMins` are computed automatically — never inflate.
- **No duplication**: if another book teaches it, cross-reference
  (`prerequisites`, prose mentions) instead of repeating.

## Verification checklist per chapter

- [ ] All math recomputed by script or by hand (no copy-paste errors)
- [ ] Every figure label appears in the prose terminology
- [ ] Every figure SVG uses the vivid palette table (no retired muted hexes:
      `#3f6212 #365314 #6b7a72 #b45309 #9a6b2f #4d7c0f #1f5c4d #123f35
      #7c2d12 #9a3412 #fdf8ef #f5eddd #d8d2c2 #b9c6bd #b9c4bd #7c5a2e`)
- [ ] Quiz `answer` indices point at the intended option
- [ ] Exercise solutions complete and numerically verified
- [ ] Lesson ids globally unique (grep before adding)
- [ ] Lint clean; chapter renders correctly in the reader (all block types)
- [ ] `WORKLOG.md` + `PROGRESS.json` updated

# TOC LESSON GUIDE — what a scheduled task writes, and how a TOC topic becomes (or joins) a lesson

*Owner directive 2026-11-11: "make sure those TOC are written as lessons and make a guide —
when a scheduled task is on [a lesson] it should [know] what should be included; if that TOC
does not require a separate lesson, be elaborate." This file is that guide. It binds every
scheduled (fire) run and every authoring turn. The machine contract it pairs with:
`docs/project/BOOK_FORMAT.md` (content) + `scripts/verify_toc_as_lessons.ts` (this guide's gate).*

---

## 1. The three-tier TOC guarantee (what already exists, machine-checked)

The Drive TOC survey (`docs/research/DRIVE_TOC_SURVEY.md`, 53 sources) is extracted into a
topic ledger by `scripts/lib/survey_topics.ts` (same parsing/routing as the blob gate
`scripts/verify_topic_coverage.ts`). Every surveyed topic lands on exactly one tier:

| Tier | Meaning | Enforced by |
|---|---|---|
| **1 — IS a lesson** | The topic (≥60% of its significant tokens) appears in a **lesson title** of its routed shelf book — a written lesson or a `plannedLessons` entry. | `scripts/verify_toc_as_lessons.ts` |
| **2 — guided fold** | The topic does **not** warrant its own lesson; it is recorded in `docs/project/TOC_FOLD_LEDGER.json` with a **host lesson** (which must exist as a real lesson title in the same book) and a **fold mode** whose minimum treatment this guide defines. | same gate (ledger phase) |
| **3 — cross-reference** | The topic is a lesson in a *different* shelf book (the survey's own cross-shelf arrangement, reviewed by hand). | same gate (tier-3 pass) |

Current census (2026-11-11): **1,861 surveyed topics — 1,068 lessons + 403 guided folds +
390 cross-references, 0 gaps.** The gate is a standing ship gate: `bun run
scripts/verify_toc_as_lessons.ts` must be green on every run that touches plans, ledger or
content, exactly like lint/tsc/the blob gate.

**Routing is the "arrange them accordingly" artifact.** Which book owns which topic is decided
by the routing tables inside `scripts/lib/survey_topics.ts` (module sources → the survey's own
Shelf-book mapping; the classics and the Khattar/H&K censuses → curated tables). When a topic
is misplaced, fix the ROUTE first, then the plan — never silence the gate.

---

## 2. When a scheduled task is ON: the pre-flight checklist

Every fire run that authors a lesson (or a chapter unit) runs this pre-flight **before any
prose**, in order:

1. **Read the pointer** — `docs/project/RESUME_POINTER.json` names the next lessons (strict
   sequential order, two-lessons-per-run cadence, verify-first discipline). Never re-derive
   the order yourself.
2. **Read the content contract** — `docs/project/BOOK_FORMAT.md` and `src/data/library/types.ts`.
3. **Consult the fold ledger for YOUR lesson** — open `docs/project/TOC_FOLD_LEDGER.json`
   and filter `entry.host === <your lesson's exact title>`. Every entry that matches is a
   **binding obligation** for that lesson (§4). The ledger is keyed by exact lesson title,
   so the filter is exact. (If you author a whole chapter, do this for each lesson.)
4. **Check the routed TOC context** — in `docs/research/DRIVE_TOC_SURVEY.md`, the survey
   section(s) whose `Shelf book` is your book show the source TOCs your plan was built from;
   the chapter summaries in the book's `book.ts` already weave the module sources' arcs in.
   Skim them once — the surveyed subtopics are the lesson's raw material census.
5. **Verify-first discipline** (unchanged): the chapter's verify script is grown green
   before/with the prose; the audit gates (blob coverage + lesson coverage + exam registry)
   are standing ship gates.

**Zero-lesson runs are allowed and normal** (planning passes, memory passes, gate repairs) —
but an authoring run that skips the pre-flight checklist is a defective run.

---

## 3. What a lesson must include (the anatomy bar)

A lesson written by a scheduled task is *not* a summary of its title. The title is a promise;
the block toolkit (`BOOK_FORMAT.md` §Block types) is how the promise is kept. The minimum
anatomy for every lesson (the two-lesson cadence has never thinned this — the 2026-11-06
directive: same or higher depth, never thinned to fit the run):

- **Opening motivation** (`para`): why this object exists — the failure or the question that
  forces it. No lesson starts at the definition.
- **Formal core**: `definition` callouts for every named object; `theorem` callouts for every
  named result; at least one `derivation` where a result has a proof the shelf-level reader
  can own (prove it — do not cite it — unless the lesson is explicitly a cross-reference).
- **Worked craft**: at least two `example` blocks (Illustrations) with full Cengage-chain
  solutions, escalating in difficulty; the second must be exam-shaped (JEE-style for the
  Indian competitive arc, university-style for L5 books — follow the book's research notes).
- **Visual**: at least one `figure` (inline SVG, vivid palette, labels matching the prose)
  wherever the object has geometry; a `table` for any classification/census the prose makes.
- **Vocabulary**: a `terms` block (feeds glossary + flashcards automatically).
- **Recall**: `formula` cards for every must-recall identity (feeds the book's formula sheet).
- **Self-check**: a `quiz` (≥4 items, wrong options with explains that say *why they fail*).
- **Graded practice**: an `exercises` block with L1→L4/L5 sets, every question with a full
  steps-array solution; include the exam typology the book's research notes name (Single
  Correct / Multiple Correct / Linked Comprehension / Matrix Match / Numerical Value for the
  Cengage-arc books).
- **Handoffs**: `prerequisites` ids, cross-reference prose to the named sibling lessons
  (never re-teach a banked lesson — cite it), `sources` citation keys into SOURCE_LOG.md.

Then, on top of the anatomy bar: **the fold obligations** (§4). A lesson that passes lint,
tsc, KaTeX rendering and word-count checks but misses a hosted fold is **incomplete**.

---

## 4. When a TOC topic does NOT require a separate lesson — the fold rules (elaborate)

### 4.1 The lesson-worthiness test

A surveyed TOC topic gets its own planned lesson **iff it clears at least one of these**:

1. **Own teachable core** — it has a definition cycle of its own (definition → properties →
   examples → exercises) that would take roughly a full reading sitting (≥ ~1,500 authored
   words) to treat honestly. *Example: "De Moivre's theorem", "The dual space".*
2. **Named-method status** — it is a method students must *reach for by name* under exam
   pressure. *Example: "Circular and restricted permutations", "Frobenius/Sturm–Liouville".*
3. **Multi-source heading** — it appears as a heading in ≥2 of the routed sources (the
   census repeated it because both texts teach it as a unit).
4. **Exam-registry demand** — an `EXAM_REGISTRY.json` exam's mathUnits names it as a unit
   or a syllabus point. (Check the registry before deciding.)

Otherwise the topic **folds into a host lesson** (tier 2). Folds are not second-class
coverage: they are binding minimum treatments inside a real lesson, recorded and audited.

### 4.2 The seven fold modes and their minimum treatments

Each mode says what MUST physically appear inside the host lesson when it is authored.
The ledger's `note` field repeats the bar in one line; this section is the definition.

- **`section`** — a named subsection inside the host lesson (`heading` block + prose):
  a formal definition of the folded topic and **at least one worked example** that carries
  it. The subsection heading should contain the topic's own wording where natural, so a
  reader searching the topic finds it.
- **`example-family`** — **at least two** worked `example` blocks inside the host lesson of
  exactly this topic's type (not generic exercises of the host). They must be traceable to
  the topic (title or setup names the family, e.g. "distribution into groups of equal size").
- **`exercise-thread`** — **at least three** items inside the host's `exercises` sets on
  exactly this topic, each with a full worked steps-solution, spread over ≥2 difficulty
  levels. (Used when the topic is pure drill technique — the craft is the practice.)
- **`glossary`** — a `terms`-block entry whose `term` is the topic (or its canonical name)
  and whose `def` is a self-contained one-sentence treatment, **plus** the term used once in
  the host's prose. (Vocabulary-only topics: notation names, singular objects.)
- **`derivation-annex`** — a `derivation` block (or `theorem`/`warn` callout with proof
  content) inside the host lesson that proves or derives the folded topic's statement —
  e.g. the loss-of-roots warning inside Transformation of Equations.
- **`review-page`** — the topic is carried by the host **chapter's completion review** (the
  unit-review page authored with the chapter's last lesson): the review must name the topic
  and give it at least one exercise. The ledger's `host` is the lesson that anchors the arc;
  the run authoring the chapter's review page discharges the obligation.
- **`chapter-umbrella`** — the topic literally **names the chapter** (e.g. "Complex Numbers"
  for ch. 3, "Systems of ODEs", "Data Sufficiency"). No separate treatment is required: the
  chapter's own arc is the coverage. The `host` is the chapter's first lesson (which opens
  the arc), and the chapter summary must already name the topic verbatim (the blob gate
  checks summaries too).

### 4.3 The mechanics (how folds are recorded and audited)

- Ledger path: `docs/project/TOC_FOLD_LEDGER.json`. Entry shape:
  `{ "source", "topic", "book", "host", "mode", "note" }` — `topic` must be the survey's
  verbatim topic line; `book` the routed shelf-book id; `host` the **exact** lesson title
  (the gate verifies it exists in that book's plan); `mode` one of §4.2; `note` the
  one-line bar.
- One entry per unique (source, book, topic). The gate dedupes and fails on duplicates,
  on hosts that don't exist, and on modes the guide doesn't define.
- Regenerating the ledger after a routing/plan change: `bun run /tmp/dump_topics.ts`
  (or re-dump survey topics) then `python3 scripts/gen_fold_ledger.py` — the generator
  validates every topic string against the live extraction, so a drifted topic string
  fails loudly instead of silently mismatching.
- **When a folded topic is later promoted to a lesson** (the plan grows): delete its ledger
  entry, add the planned lesson, re-run the gate. The audit's tier-1 pass automatically
  releases the topic.

### 4.4 New topics arriving mid-stream (research, exam units, owner additions)

When a scheduled run researches a new topic the survey doesn't carry (an exam unit, an
owner-requested addition, a popular-book TOC):

1. Decide lesson vs fold by §4.1 (write the decision into the run's WORKLOG entry).
2. **Lesson route**: add the title to the right chapter's `plannedLessons` (keep ≥3
   per chapter, titles unique per book, no duplication of a banked sibling lesson —
   cross-reference instead), then re-run `verify_toc_as_lessons.ts` (it must stay green)
   and `verify-math-shelf-planning.ts`.
3. **Fold route**: append a ledger entry via `scripts/gen_fold_ledger.py`'s table (not by
   hand-editing the JSON, which bypasses validation), re-run the gate.
4. If the topic belongs to a *new* source (e.g. a freshly downloaded popular book), first
   extend the survey + routing table in `scripts/lib/survey_topics.ts` — the gate's
   `sources === 53` check in the blob gate pins the survey census; grow that pin honestly
   with the run recorded.

### 4.5 Worked examples of the decision (so the bar is concrete)

- *"Middle Terms" (binomial)* → **fold, `section`** into "The Binomial Theorem, Proved": no
  independent definition cycle; it is the theorem's own reading skill.
- *"Circular Permutation"* → **lesson** ("Circular and Restricted Permutations"): named
  method + multi-source heading + JEE unit demand.
- *"Principal Value of cot⁻¹(cot x)"* → **fold, `example-family`** into the Principal-Value
  Discipline lesson: the discipline is the lesson; each inverse is a drill of it.
- *"Modeling Computation" (Rosen)* → got its own **chapter** (DM ch. 9) because four of its
  sections cleared the test together — folds never bury a whole source chapter.
- *"Statistics" (M2 module header)* → **fold, `chapter-umbrella`**: it names the shelf
  book's census, not a teachable unit of Advanced Algebra's parent module.

---

## 5. Exam coverage is part of the same discipline

`docs/project/EXAM_REGISTRY.json` (56 exams researched: 22 Indian + 34 international, with
mathUnits and per-exam coverage maps + the book-wise rollup) is the "cover all the top exams
of the world to maximum level" instrument. When a scheduled run adds exam coverage:

- a new exam → research its mathUnits honestly (web sources recorded in SOURCE_LOG.md),
  add the registry entry + coverage map, keep the registry checks in
  `verify_topic_coverage.ts` green (≥50 exams, ≥10 Indian, ≥20 international, every
  coverage book id real);
- a mathUnit that lands as a new topic → §4.4 (lesson or fold, then gates green);
- never widen a book's claimed scope to "serve" an exam — route the topic to the book that
  actually teaches it.

---

## 6. Standing gates (run them, in this order, on every ship)

```
bun run lint
bunx tsc --noEmit
bun run scripts/verify_topic_coverage.ts      # blob gate (topic-inclusion, exam registry)
bun run scripts/verify_toc_as_lessons.ts      # THIS guide's gate: lessons + folds + ledger hygiene
bun run scripts/verify-math-shelf-planning.ts # shelf hygiene (planned chapters, uniqueness)
```

Plus the run-specific verify scripts (e.g. `verify-book4-ch01.ts` when authoring AA ch. 1)
and the E2E pass (`scripts/e2e-math-shelf.sh` for shelf-visible changes). A run ends only
with every gate green, the six-file memory set updated, and the commit made — in that order.

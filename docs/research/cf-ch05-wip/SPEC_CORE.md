# SPEC CORE — the shared authoring contract for the CS RUN 9 swarm (chapter 5)

You are ONE authoring agent of a four-agent swarm writing Computer
Fundamentals chapter 5 'Software Families' for the LockIn Library. You own
EXACTLY ONE seat. Other agents own the other seats — never touch any
file except your own two. This file is part of your spec; your seat
spec names your unique content. Read BOTH fully before writing anything.

Repo root: /home/z/my-project (a Next.js + TypeScript site; books are
TypeScript data rendered by the lesson reader).

## Your two deliverables

1. ENGINE (write FIRST, run GREEN before prose):
   `docs/research/cf-ch05-wip/v-cf<NN>.ts` — a standalone Bun script
   with AT LEAST 45 numbered checks (`ok(name, cond)` rows) that
   brute-force EVERY number your lesson will print: every census,
   ratio, date arithmetic, version arithmetic and quiz key.
   Pattern it on the harness below. It imports nothing from the site;
   it may import your part file ONLY at the end (a final block of ≥5
   checks re-reading the shipped part: word floor, quiz key, figure
   count, solution-figure count, id/number/title/prereqs). Run it:
   `cd /home/z/my-project && bun run docs/research/cf-ch05-wip/v-cf<NN>.ts`
   It must print `V-CF<NN>: <n>/<n> GREEN` with zero RED before you
   write a single prose paragraph.
2. PART (the lesson): `docs/research/cf-ch05-wip/part-cf<NN>.ts` — a
   TypeScript file exporting exactly one lesson object:

```ts
import type { Lesson } from '../../src/data/library/types'

/* palette (vivid set; never blue/indigo) */
const C = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}
const FONT = 'ui-sans-serif, system-ui, sans-serif'

function <uniqueHelper>(...): string { /* SVG fragment builders */ }

export const lesson<NN>: Lesson = { ... }
```

Prefix every helper/palette read uniquely (your spec pins the tag) so
the five parts never collide when concatenated. The orchestrator
assembles the chapter from your exports verbatim.

## The engine harness (copy this shape)

```ts
export {}
let P = 0; let F = 0
const fails: string[] = []
function ok(name: string, cond: boolean, detail = '') {
  if (cond) { P++ } else { F++; fails.push(name + (detail ? ' :: ' + detail : '')) }
}
// ... your checks ...
import { lesson<NN> } from './part-cf<NN>'
import { countLessonWords } from '../../src/data/library/types'
// final re-read checks (>= 5)
console.log(`V-CF<NN>: ${P}/${P + F} GREEN`)
if (F > 0) { fails.forEach((f) => console.log('  RED: ' + f)); process.exit(1) }
```

(ESM import order: put ALL imports at the top of the file.)

## Lesson anatomy (every bar is a gate the orchestrator re-checks)

- `id` (pinned in your spec — stable forever), `number` (e.g. '5.1'),
  `title` (pinned VERBATIM — the planned-lesson title; never reword),
  `concepts` (5–8 phrases), `objectives` (5–6 'By the end of this
  lesson you can…' lines), `prerequisites` (pinned ids), `sources:
  ['cs-cf-web-ground-ch05']`, `blocks`.
- Depth: ≥ 7,000 words for content seats (≥ 6,500 for the review; the
  hard gate floor is 6,000/5,200 — aim high). Count with
  `countLessonWords(lesson)` from `../../src/data/library/types`.
- Blocks to use: `para` (body prose, `$inline math$`, `**bold**`),
  `heading` (section heads, Title Case), `callout` (tones: insight =
  Note / warn = Caution / definition / theorem / historical / exam),
  `terms` (term+def pairs — feed the glossary), `equation` (display
  KaTeX, `\tag{n}`), `derivation` (title + statement + steps[{label,
  formula?, explanation}] + result), `example` (Illustrations: `title` =
  crisp problem statement, `steps` = the worked solution lines),
  `figure` (computed SVG, caption that teaches), `table` (head + rows),
  `list` (marker 'roman' for (i)(ii)(iii) example runs), `algorithm`
  (monospace lines + per-line notes, for procedures), `formula`
  (revision cards: name + latex + note), `quiz` (exactly 5 items,
  `answer` = option index, `explain` must say why EACH wrong option
  fails), `exercises` (graded sets, 15 questions TOTAL across sets,
  levels 'L1'..'L6' — use at least L1..L3, label exam-style items in
  prose honestly).
- At least 3 `figure` blocks in the body; at least 4 SOLUTION figures
  (`figures: [{ caption, svg }]` arrays inside exercise questions,
  0–2 per question, only where the diagram genuinely aids THAT
  solution — v9.0 directive). Every figure: self-contained SVG, its own
  `viewBox`, `role="img"` + a descriptive `aria-label`, geometry
  COMPUTED from constants (never eyeballed), labels in PLAIN text (no
  TeX, no `$`, use '-' not U+2212), the palette above only, text ≥9px,
  ≥8px viewBox margins, no text overlap (the orchestrator audits with a
  browser + a vision model).
- Illustrations (`example` blocks): 8–12 per content lesson, Cengage
  style. Solutions (exercise + example `steps`) are arrays of SHORT
  worked lines, one move per line, led by natural connectives (Split /
  Take / Check / Now, / So, / or / Hence / Therefore / Thus …); end
  crisp answers with `answer: '…'` on the question. NO step numbers, NO
  'Answer:' prefixes.
- An `exam` callout mapping the lesson to real examinations
  (banking/SSC computer-awareness + school boards + Cambridge 9618 /
  A-level-style asks — honest 'exam-style' wording, never claim to
  quote a real paper).
- Cross-references: name your doorstep books in prose ('Computer
  Organization and Architecture' owns the full theory door; 'Operating
  Systems' owns virtual memory; 'Digital Logic Design' owns the
  gate-level view) — never re-teach their ground.

## Raw-TeX law (binding, from the 2026-11-18 repair)
- `$...$` inline math ONLY inside `para`/`callout`/`table` text and
  exercise/example `steps` lines. NEVER a bare `\frac` outside math
  delimiters; NEVER `$` inside SVG text.
- No `\qquad` inside inline `$...$` (long spans cannot line-break on
  mobile — split into separate short `$...$` clauses with prose
  between). Derivation `formula` fields and `equation` blocks are display
  KaTeX (no `$`). Derivation `result` renders through RichText: write
  clause-wise `$...$`, prose tails bare. Derivation `title` + step
  `label` render PLAIN — words only, no math markup.
- In JS string literals, LaTeX backslashes must be ESCAPED
  (`\\times` not `\times`) — single backslashes corrupt to JS escapes.
- Use ASCII hyphen '-' in SVG text and labels; the fancy dash
  characters (\u2013/\u2014) are allowed only in prose, never in SVG.

## Voice (Cengage JEE mathematics style, adapted to CS)
- Definitions open formally ('*X* is said to be … if …') inside a
  `definition` callout, followed by a symbolic restatement line.
- Example runs after a definition: 'For example,' + a `list` with
  `marker: 'roman'`.
- Notes/cautions: short, boxed, single idea. Historical notes: dated,
  honest, OUR OWN retelling.
- Explain from zero; intuitive → formal; no unexplained symbols.
  British-Indian textbook register, second person, no fluff.

## Honesty and provenance
- Every roster, figure, Illustration, quiz item and exercise is OUR OWN
  (study-never-reproduce). The pinned dates/numbers in your spec are
  web-verified by the orchestrator (2026-11-26, banked under
  `cs-cf-web-ground-ch05`) — carry them EXACTLY; where a source is a
  legend (e.g. disputed anecdotes), SAY SO in the prose.
- The engine wins over any other source: if your draft disagrees with
  a pinned value, the pinned value ships.
- Write files to disk EARLY and often (engine first, then the part file
  section by section) so your work survives a channel drop. If you die
  mid-flight, whatever landed is preserved.

## Your final message back
Report: the two file paths, the engine's green tally, the lesson's word
count, quiz key, figure counts (body + solution), and a 5-line content
summary. Nothing else needs to leave your seat.

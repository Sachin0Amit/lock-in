# SPEC wh101 — seat 1.1 of HSS RUN 1: world-history lesson 1.1 'How History Is Written'

You are agent wh101 (Task ID 3-a). Your deliverable is ONE lesson as a TypeScript
part file + its verify harness. You see no other repo context; this spec is
self-contained. Repo root: /home/z/my-project/lock-in (bun runtime).

## Outputs (write-early-often — save each stage as it completes)

1. `/home/z/my-project/lock-in/docs/research/wh-ch01-wip/part-wh101.ts` — the lesson
   (first line EXACTLY: `import type { Lesson } from '../../../src/data/library/types'`;
   ends with `export const lessonWh101: Lesson = {...}`).
2. `/home/z/my-project/lock-in/docs/research/wh-ch01-wip/v-wh101.ts` — the verify harness.
3. Run `cd /home/z/my-project/lock-in && bun run docs/research/wh-ch01-wip/v-wh101.ts`
   until ALL GREEN. Do not declare the lesson done while any check fails.

STAGED SAVES (mandatory): (stage 1) part-wh101.ts skeleton + palette/helpers +
an empty lesson shell — save; (stage 2) body prose first half — save; (stage 3)
body second half + quiz — save; (stage 4) exercises + solutions — save; (stage 5)
v-wh101.ts + run green. Never hold the whole thing in memory; the file on disk is
the deliverable of record.

## The lesson (identity fields EXACT)

- id: `wh-how-history-is-written` (kebab, globally unique)
- number: `'1.1'`; title: `How History Is Written`
- concepts (5-8): 'historiography', 'primary source', 'secondary source',
  'external criticism', 'internal criticism', 'corroboration', 'historia',
  'the Annales school' (pick 5-8 of these)
- objectives: 4-6 "by the end you will be able to…" lines
- prerequisites: NONE (omit the field or `[]`)
- sources: `['wh-survey-ground', 'wh-web-historians']`

## VERIFY-BEFORE-WRITING (web duty)

Verify each claim below with WebSearch/WebFetch before you use it; if a fetch
fails twice, phrase the claim with 'c.' or drop the precise year — never invent.
Claims: Herodotus c. 484-c. 425 BCE, The Histories, Cicero 'Father of History';
Thucydides c. 460-c. 400 BCE, eyewitness method; E.H. Carr 1892-1982, 'What Is
History?' 1961 (Trevelyan Lectures), 'an unending dialogue between the present
and the past'; Leopold von Ranke 1795-1886, 'wie es eigentlich gewesen' (1824);
Marc Bloch 1886-1944, Annales journal founded 1929 with Lucien Febvre, 'The
Historian's Craft' posthumous 1949. Sima Qian and Ibn Khaldun facts are already
verified (below).

## The pinned facts (engine 69/69 GREEN — use THESE numbers verbatim)

- Herodotus c. 484-c. 425 BCE (5th century BCE, 400-499 BCE); The Histories on
  the Greco-Persian Wars; aim: prevent 'the traces of human events from being
  erased by time'; historia = inquiry.
- Thucydides c. 460-c. 400 BCE; History of the Peloponnesian War; the
  eyewitness/exile method; the two were coeval 35 years (460-425).
- Sima Qian c. 145-c. 86 BCE; Shiji completed c. 94 BCE; 130 chapters = 12 basic
  annals + 10 tables + 8 treatises + 30 hereditary houses + 70 ordered
  biographies (sum = 130); inherited the taishi (grand historian) post; the
  model for all later official Chinese histories.
- Herodotus's death c. 425 BCE and Sima Qian's birth c. 145 BCE lie 569 years
  apart (425 + 145 - 1 = 569, no year zero); Herodotus c. 484 BCE to Ibn
  Khaldun's Muqaddimah 1377 = 1860 years.
- Ibn Khaldun 1332-1406; Muqaddimah 1377, written in about six months at Qalat
  Ibn Salama; asabiyyah (group solidarity) drives the rise and fall of
  dynasties; checks reports against 'the general conditions of the period'.
- Ranke 1795-1886 (91 years); 'wie es eigentlich gewesen' = 'how it essentially
  was' (1824 preface); archival primary-source seminars.
- Bloch 1886-1944; Annales d'histoire economique et sociale founded 1929 with
  Febvre (15 years before his Gestapo execution); The Historian's Craft
  published posthumously 1949 (5 years after).
- Carr 1892-1982; What Is History? 1961 (69 years of age); the unending-dialogue
  definition; history as 'a continuous process of interaction between the
  historian and his facts'.
- Primary source = evidence from the period itself (inscription, coin, sherd,
  eyewitness account, document, temple wall). Secondary source = a later
  historian's account built FROM the primaries.
- External criticism asks: is the evidence GENUINE? (material, script, language,
  anachronisms, provenance, fabrication). Internal criticism asks: is the
  testimony CREDIBLE? (bias, context, plausibility, corroboration).
- Corroboration: independent sources agreeing strengthen a claim; a single
  source can never settle it (the Muqaddimah rule).

## Lesson shape (the Cengage house voice — every requirement is pinned by the v-file)

Blocks in this order (body >= 10 blocks):
1. heading + 3-4 opening paras (the craft: why history is a METHOD, not a list
   of facts; the reader's own paper trail).
2. heading 'What is historiography' + definition callout (historia = inquiry) +
   paras + a roman-marked list of the method's stages (question, source hunt,
   criticism, synthesis, narrative, new questions).
3. BODY FIGURE A: the historian's craft cycle (circular, 6 nodes).
4. heading 'Primary against secondary' + definition callouts + paras + a TABLE
   of examples (event | primary witness | secondary account).
5. BODY FIGURE B: the source ladder (event -> primary artifact -> secondary
   account with a time arrow).
6. heading 'The two criticisms' + paras + derivation 1 'External criticism as a
   protocol' (4 steps: material check, script/language check, anachronism check,
   provenance check) + BODY FIGURE C: the external-vs-internal panel.
7. heading 'Bias and corroboration' + paras + derivation 2 'Why one source
   settles nothing' (the corroboration argument: two INDEPENDENT sources
   agreeing multiplies the chance of independent error; dependence defeats the
   multiplication) + insight callout.
8. heading 'The lineage' + historical callouts on Herodotus, Thucydides, Sima
   Qian, Ibn Khaldun, Ranke, Bloch/Carr + the lineage TABLE (historian | dates |
   work | the move they contributed) + example blocks (>= 3 Illustrations, each
   >= 4 steps): (i) dating a manuscript by anachronism; (ii) cross-checking
   Megasthenes against the Arthashastra register; (iii) reading a chronicle for
   bias (the court chronicle's patron problem).
9. exam callout (tone 'exam'): UPSC GS-I 'History of the World' register + UGC
   NET History + the historiography questions of AP World.
10. terms block (>= 8 items: historiography, primary source, secondary source,
    external criticism, internal criticism, corroboration, anachronism,
    provenance, asabiyyah, Whig history — at least 8).
11. formula cards (>= 4): 'The span rule across the era line' (span = A + B - 1,
    note: no year zero); 'The Shiji census' (12 + 10 + 8 + 30 + 70 = 130);
    'The coeval window of Herodotus and Thucydides' (425 - 460 -> 35 years);
    'Ranke's life in numbers' (1795-1886 = 91 years).
12. quiz block title 'Self-check quiz' with EXACTLY 5 items, 4 options each,
    intended keys [1, 0, 2, 3, 1] and the correct option MUST contain the
    pinned token for that item: (1) 'primary source', (2) 'external criticism',
    (3) 'Sima Qian', (4) 'corroborat', (5) 'Annales'. Every explain >= 60 chars
    and audits why EACH wrong option fails.
13. exercises block with EXACTLY 15 questions across sets spanning L1..L6
    (e.g. L1 x3, L2 x3, L3 x3, L4 x3, L5 x2, L6 x1), every question a full
    steps-array solution (>= 3 short lines, Cengage connectives: Sol. pill is
    automatic — lead lines with Split/Take/Check/Now,/So,/or/Hence) + a terminal
    `answer` field whose numeric tokens appear in the solution. >= 3 questions
    carry a `figures` array (solution figures): (a) the historians' timeline
    (Herodotus c. 484-c. 425 BCE -> Thucydides c. 460-c. 400 -> Sima Qian c.
    145-c. 86 -> Ibn Khaldun 1332-1406 -> Ranke 1795-1886 -> Bloch 1886-1944 ->
    Carr 1892-1982, scaled axis, gaps labelled); (b) the Shiji 130-chapter bar
    census (12+10+8+30+70); (c) the corroboration diagram (one source vs three
    converging sources). All 15 answers engine-verifiable (year arithmetic,
    census sums, classification).

## SVG law (BINDING — the v-file asserts every clause)

- Palette const c11 (EXACT keys/values): ink '#166534', mid '#65a30d', teal
  '#0d9488', tealInk '#0f766e', amber '#d97706', orange '#ea580c', red '#dc2626',
  green '#16a34a', panel '#fef3c7', panel2 '#ffedd5', sep '#fcd34d', faint
  '#5eead4', white '#ffffff', paper '#fffdf5'. NO OTHER HEX anywhere.
- Font const f11 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif".
- Helper prefix wh1A (wh1ATxt, wh1ALine, wh1ADot, wh1ABox, wh1AArrow,
  wh1AArc...). Each SVG root: `<svg xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 W H" role="img" aria-label="...">` via a wh1ASvg(w,h,label,parts)
  wrapper.
- SVG <text> is PLAIN: no '$', no backslash TeX, minus is U+2212 (−) NEVER '-'
  before a digit, years written plain ('c. 484-c. 425 BCE' fine — but a negative
  number renders as −5). font-size 11-14.5; strokes >= 1.2; labels must not clip
  (estimate 0.62 em per char; keep 7 px margins inside the viewBox).
- Every figure is referenced by the surrounding prose by WHAT IT SHOWS.

## Math-span law

Inline math inside $...$ only; never '$$' in any data string; never '\qquad'
inside an inline span; derivation titles/step labels are PLAIN words (no $);
result fields may carry short $clauses$. History prose: most numbers can stay
plain text; use $44 + 14 - 1 = 57$ style only where the arithmetic itself is the
point.

## v-wh101.ts contract (mirror of the geo v-file pattern)

Header comment; `import { countLessonWords } from '../../../src/data/library/types'`;
`import type { Lesson } from '../../../src/data/library/types'`; `export {}`;
Chk/pcheck/check harness helpers; ENGINE SECTION: recompute EVERY pinned number
in code (569, 1860, 130-census sum, 35, 91, 69, 15, 5, quiz-key check, exercise
answer witnesses via the same arithmetic) with check() calls; then
`async function runPins(): Promise<void> { ... }` doing P01..P10 exactly like the
geo pattern (P01 load part + export; P02 quiz keys [1,0,2,3,1] + 4 options +
tokens + explains; P03 15 exercises L1-L6 spanned + steps + answers + P08
numeric containment + P04b/P04c solution figures >= 3; P04a body figures >= 3 +
P04d named trio (timeline/census/corroboration captions); P05 terms >= 6 items
in one block; P06 >= 4 formula cards (names match the plan above); P07
countLessonWords >= 6000; P09a-h the full SVG law incl. palette hex allow-list
(the 14 c11 values), stroke >= 1.2, font 11-14.5, text hygiene, minus law, clip
estimator; P10 math-span laws). END the file with this EXACT section (the
assembler cuts at the marker):

```
/* ------------------------------------------------------------------ */
/* bottom harness                                                      */
/* ------------------------------------------------------------------ */
function report(label: string, list: Chk[]): { pass: number; fail: number } {
  const pass = list.filter((c) => c.ok).length
  const fail = list.length - pass
  for (const c of list) if (!c.ok) console.log(`  FAIL ${c.name} — ${c.detail}`)
  console.log(`${label}: ${pass} pass, ${fail} fail`)
  return { pass, fail }
}
console.log('=== ENGINE (recompute everything) ===')
const e = report('wh101-engine', engine)
console.log('=== PINS (audit the part file) ===')
await runPins()
const p = report('wh101-pins', pins)
const fail = e.fail + p.fail
console.log(`wh101 TOTAL: ${e.pass + p.pass} pass, ${fail} fail`)
if (fail > 0) process.exit(1)
```

## Quality bar

- countLessonWords(lessonWh101) >= 6000 (target 8,000-10,000).
- Every figure referenced in prose; no decoration-only figures.
- STUDY-NEVER-REPRODUCE: all wording OUR OWN; no quote longer than one line;
  no reproduction of any book's expression.
- Report back: the two file paths + word count + v-file verdict line
  (`wh101 TOTAL: N pass, 0 fail`) + any fact you could NOT verify.

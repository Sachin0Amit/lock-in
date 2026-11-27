# SPEC wh102 — seat 1.2 of HSS RUN 1: world-history lesson 1.2 'Sources: Literary and Archaeological'

You are agent wh102 (Task ID 3-b). Your deliverable is ONE lesson as a TypeScript
part file + its verify harness. You see no other repo context; this spec is
self-contained. Repo root: /home/z/my-project/lock-in (bun runtime).

## Outputs (write-early-often — save each stage as it completes)

1. `/home/z/my-project/lock-in/docs/research/wh-ch01-wip/part-wh102.ts` — the lesson
   (first line EXACTLY: `import type { Lesson } from '../../../src/data/library/types'`;
   ends with `export const lessonWh102: Lesson = {...}`).
2. `/home/z/my-project/lock-in/docs/research/wh-ch01-wip/v-wh102.ts` — the verify harness.
3. Run `cd /home/z/my-project/lock-in && bun run docs/research/wh-ch01-wip/v-wh102.ts`
   until ALL GREEN. Do not declare the lesson done while any check fails.

STAGED SAVES (mandatory): (stage 1) skeleton + palette/helpers + lesson shell —
save; (stage 2) body prose first half — save; (stage 3) body second half + quiz —
save; (stage 4) exercises + solutions — save; (stage 5) v-wh102.ts + run green.

## The lesson (identity fields EXACT)

- id: `wh-sources-literary-and-archaeological` (kebab, globally unique)
- number: `'1.2'`; title: `Sources: Literary and Archaeological`
- concepts: 'literary sources', 'archaeological sources', 'epigraphy', 'numismatics',
  'stratigraphy', 'radiocarbon dating', 'the three-age system', 'foreign accounts'
- objectives: 4-6 lines (classify sources; read inscriptions and coins; explain
  the dating sciences; interpret stratigraphy)
- prerequisites: `['wh-how-history-is-written']`
- sources: `['wh-ncert-canon', 'wh-web-sources', 'wh-survey-ground']`

## VERIFY-BEFORE-WRITING (web duty)

Verify with WebSearch/WebFetch before use (drop the precise figure with 'c.' if a
fetch fails twice — never invent): Rigveda 1028 hymns (1017 + 11 valakhilya), 10
mandalas; Megasthenes ambassador of Seleucus I to Chandragupta Maurya c. 302
BCE, Indica survives in fragments; Fa-Hien (Faxian) in India 399-414 CE;
Xuanzang 630-645; Al-Biruni 973-1048, Kitab-ul-Hind; Samudragupta's Prayagraj
Pillar inscription composed by Harisena; punch-marked coins from c. 6th century
BCE; C.J. Thomsen's three-age system 1836 Copenhagen. Already verified (use
verbatim): Rosetta Stone, Ashokan edicts, radiocarbon — below.

## The pinned facts (engine 69/69 GREEN — use THESE numbers verbatim)

- The literary register: religious literature (the Rigveda's 1028 hymns in 10
  mandalas, oral transmission before writing), secular literature (court
  chronicles, biographies, drama, inscribed panegyrics), and foreign accounts.
- Foreign accounts: Megasthenes (c. 302 BCE, ambassador of Seleucus I to
  Chandragupta Maurya, Indica surviving in fragments quoted by later writers);
  Fa-Hien 399-414 (a 15-year journey); Xuanzang 630-645 (15 years); Al-Biruni
  973-1048 (Kitab-ul-Hind, early 11th century). Megasthenes's embassy to
  Fa-Hien's arrival = 700 years (302 + 399 - 1, no year zero); Fa-Hien leaves
  414 -> Xuanzang lands 630 = 216 years.
- The archaeological register: epigraphy (inscriptions), numismatics (coins),
  monuments and material culture.
- Ashoka's inscriptions: 30+ known, 14 Major Rock Edicts + 7 Major Pillar
  Edicts; pillars are monolithic polished sandstone, 12-15 m, up to 50 tonnes;
  Brahmi deciphered by James Prinsep 1836-1838 (published March 1838, with
  Cunningham's help), Devanampriya Piyadasi identified with Ashoka via George
  Turnour's Pali records; Kharoshthi script in the northwest; at Kandahar a
  Greek-Aramaic bilingual and a Greek-only edict (the empire's multilingual
  communication).
- The Rosetta Stone: Memphis decree of Ptolemy V, dated 27 March 196 BCE;
  found July 1799 by Pierre-Francois Bouchard at Rashid (Rosetta) during Fort
  Julien repairs on Napoleon's campaign; hieroglyphic 14 lines + Demotic 32 +
  Greek 54 = 100 surviving lines; Champollion announced the decipherment 1822
  (23 years after the find); in the British Museum since 1802 (3 years after);
  carved 196 BCE -> found 1799 = 1994 years in the ground.
- Radiocarbon dating: half-life 5730 years (Libby's original 5568 superseded);
  after 1/2/3 half-lives 1/2, 1/4, 1/8 remains; N = N0 (1/2)^(t/5730); effective
  range ~50,000 years (0.236% remains at the edge); Libby developed it in the
  mid-1940s at the University of Chicago; Nobel Prize 1960.
- Stratigraphy: the law of superposition — in an undisturbed deposit older
  layers lie below younger; typology (seriation of forms).
- The three-age system: Stone -> Bronze -> Iron, C.J. Thomsen, 1836, the
  Copenhagen museum guidebook — a classification OF ARTIFACTS that became a
  periodisation of prehistory.
- Numismatics: punch-marked coins from c. 6th century BCE (the earliest Indian
  coinage); Gupta gold dinars; coins carry kings, deities, dates and scripts.
- The Prayagraj Pillar inscription of Samudragupta composed by his court poet
  Harisena (the panegyric register in stone).

## Lesson shape (Cengage house voice — every requirement pinned by the v-file)

Blocks in this order (body >= 10 blocks):
1. heading + 3-4 opening paras (evidence is the historian's raw material; the
   two great registers and what each can and cannot say).
2. heading 'The literary register' + definition callout + paras + roman list of
   the three literary classes + the Rigveda census (1028 = 1017 + 11, 10
   mandalas) + foreign-account paras with the pinned travellers.
3. BODY FIGURE A: the source taxonomy tree (History's evidence -> literary
   [religious | secular | foreign] + archaeological [epigraphy | numismatics |
   monuments | material]).
4. heading 'The archaeological register' + definition callouts (epigraphy,
   numismatics) + Ashoka paras (30+, 14 + 7, monoliths 12-15 m / 50 t, Prinsep
   1836-38, Turnour) + Rosetta paras (the full pinned census) + example
   Illustration (>= 4 steps): 'How the Rosetta registers lock together' (the
   same decree in three scripts; the Greek readable, the others unlocked
   through it).
5. BODY FIGURE B: the stratigraphy cross-section (three strata, older below
   younger, a sherd in the middle layer, the superposition law labelled).
6. heading 'The dating sciences' + derivation 1 'The radiocarbon law'
   (exponential decay -> half-life 5730 -> N = N0(1/2)^(t/5730), steps with
   formula fields, result) + BODY FIGURE C: the radiocarbon decay curve
   (computed points: 1, 1/2, 1/4, 1/8 at 5730/11460/17190; the ~50,000-yr edge
   marked; '0.236%' label) + paras on dendrochronology, thermoluminescence,
   typology + the three-age system para (Thomsen 1836).
7. heading 'Coins and inscriptions as witnesses' + paras (punch-marked c. 6th
   c. BCE; Gupta dinars; the Prayagraj Pillar / Harisena) + example blocks (2
   more Illustrations, each >= 4 steps): (i) dating a coin layer by typology;
   (ii) the Prinsep identification chain (Devanampriya Piyadasi -> Turnour's
   Pali -> Ashoka).
8. exam callout (tone 'exam'): UPSC GS-I/optional History source-questions +
   UGC NET History (epigraphy/numismatics) + NCERT Themes register.
9. terms block (>= 8 items: epigraphy, numismatics, stratigraphy, law of
   superposition, typology, radiocarbon dating, half-life, dendrochronology,
   thermoluminescence, three-age system).
10. formula cards (>= 4): 'The radiocarbon law' (N = N0(1/2)^(t/5730), note
    t in years); 'The half-life ladder' (5730 -> 1/2, 11460 -> 1/4, 17190 ->
    1/8); 'The travellers' gap' (Megasthenes c. 302 BCE to Fa-Hien 399 = 700
    years, span = A + B - 1); 'The Rosetta register census' (14 + 32 + 54 = 100
    lines).
11. quiz block title 'Self-check quiz' with EXACTLY 5 items, 4 options each,
    intended keys [2, 3, 1, 0, 2] and the correct option MUST contain the
    pinned token: (1) 'superposition', (2) '5730', (3) 'Rosetta', (4) 'Prinsep'
    (or 'Brahmi'), (5) 'numismatics'. Every explain >= 60 chars auditing each
    wrong option.
12. exercises block with EXACTLY 15 questions spanning L1..L6, full
    steps-array solutions + terminal answers, numeric tokens consistent. >= 3
    questions carry solution figures: (a) the travellers' timeline (Megasthenes
    c. 302 BCE -> Fa-Hien 399-414 -> Xuanzang 630-645 -> Al-Biruni c. 1030, the
    700 and 216 gaps labelled); (b) the Rosetta three-register panel (14/32/54);
    (c) the Ashokan pillar schematic (monolith, 12-15 m band, up to 50 t, the
    14+7 edict census). All 15 answers engine-verifiable (spans, census sums,
    half-life fractions, classification).

## SVG law (BINDING — the v-file asserts every clause)

- Palette const c12 (EXACT same 14 values as c11): ink '#166534', mid '#65a30d',
  teal '#0d9488', tealInk '#0f766e', amber '#d97706', orange '#ea580c', red
  '#dc2626', green '#16a34a', panel '#fef3c7', panel2 '#ffedd5', sep '#fcd34d',
  faint '#5eead4', white '#ffffff', paper '#fffdf5'. NO OTHER HEX.
- Font const f12 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif".
- Helper prefix wh1B (wh1BTxt, wh1BLine, wh1BDot, wh1BBox, wh1BArrow, wh1BRect...);
  wh1BSvg(w,h,label,parts) wrapper with role="img" + aria-label + viewBox.
- SVG <text> PLAIN: no '$', no backslash, minus U+2212 never '-' before a digit,
  years plain; font-size 11-14.5; strokes >= 1.2; 0.62 em/char clip estimate,
  7 px margins.
- Every figure referenced by the prose.

## Math-span law

$...$ inline only; never '$$'; no '\qquad' in inline spans; derivation titles/
labels PLAIN; history numbers mostly plain text.

## v-wh102.ts contract (mirror of the geo v-file pattern)

Same structure as spec-wh101's v-file contract: header comment; imports
(countLessonWords + Lesson type); `export {}`; Chk/pcheck/check helpers; ENGINE
SECTION recomputing EVERY pinned number (700 = 302+399-1; 216; 15+15 journeys;
1028 = 1017+11; 14+7; 14+32+54 = 100; 1994 = 196+1799-1; 23; 3; 1/2, 1/4, 1/8
fractions; 0.236% at 50,000; 12-15 m band; quiz key; exercise witnesses); then
`async function runPins()` with P01..P10 (P01 part loads + export lessonWh102;
P02 quiz keys [2,3,1,0,2] + 4 options + tokens + explains >= 60; P03 15
exercises L1-L6 spanned + steps >= 3 + answers + P08 numeric containment;
P04a body figures >= 3 + P04d named trio (taxonomy/stratigraphy/radiocarbon);
P04b-c solution figures >= 3; P05 terms >= 6; P06 >= 4 formula cards; P07
countLessonWords >= 6000; P09a-h full SVG law with the 14-color allow-list;
P10 math-span laws). END with the EXACT bottom harness section (assembler cuts
at the marker) — same text as spec-wh101 but with labels 'wh102-engine' /
'wh102-pins' and `if (fail > 0) process.exit(1)`.

## Quality bar

- countLessonWords(lessonWh102) >= 6000 (target 8,000-10,000).
- All figures referenced in prose; no decoration-only.
- STUDY-NEVER-REPRODUCE: all wording OUR OWN.
- Report back: the two file paths + word count + `wh102 TOTAL: N pass, 0 fail` +
  any fact you could NOT verify.

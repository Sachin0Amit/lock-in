import type { Chapter, Lesson } from '../../../types'

/**
 * Advanced Algebra — chapter 6 "Counting: Permutations and Combinations"
 * (the PARALLEL-SWARM RUN II closed the unit whole, 2026-11-20).
 *
 * PROVENANCE: the 2026-11-18 owner chat directive "launch multiple agents
 * for authoring lessons", honored a SECOND time (the 2026-11-18 ch. 4
 * swarm is the precedent): seven parallel authoring agents — six lessons
 * + the review — authored the unit as part files under
 * scripts/aa-ch06-work/ per the standing master plan
 * docs/research/AA_CH06_MASTER_PLAN.md (§2 pins the teaching order below,
 * §5 the architecture), and the orchestrator (this assembly) merged the
 * seven parts into this ONE self-contained chapter file (the
 * one-file-per-chapter layout the content-completeness audit reads),
 * emptied plannedLessons and closed the book wiring.
 *
 * Ground: the Drive `MATHS/M2 Algebra :: 07. Permutation and Combination`
 * module (citation key `cengage-m2-07`, Drive id
 * `1689UZ9q8ctrhiBtWLNLBpKCcHUQzS-me`, 67.8 MB scanned, 74 PDF pages) —
 * vision-transcribed with the page offset PROVEN from two independent
 * kinds of takes (printed 7.N = PDF N+2, the same offset the
 * m2-02/-03/-05/-06 modules carry) + the banked web canon (NCERT class 11
 * ch. 6 "Permutations and Combinations", the JEE (Main) 2026 syllabus,
 * Hall & Knight Higher Algebra ch. XI, Khattar QA 4e, OpenStax College
 * Algebra 2e). STUDY-NEVER-REPRODUCE honored: the module informed method
 * shapes only; every roster, exhibit, number, figure, quiz item and
 * exercise below is OUR OWN, recomputed by the agents' engines and re-run
 * against this file by scripts/verify-book4-ch06.ts (sections A–N + the
 * assembler's census Z).
 *
 * LESSON CENSUS (the teaching order the master plan §2 pins — book.ts's
 * plannedLessons ARRAY order was non-pedagogical, an artifact of the
 * 2026-11-17 insertion pass; the order below is the pedagogical order:
 * the fundamental principle first, factorials as the bookkeeping, then
 * the two great counts, the restrictions, the selection engine, and the
 * puzzle room where they interlock):
 *   6.1 "The Fundamental Principle of Counting"      (agent 6-a; engines A/B 38+15)
 *   6.2 "Factorials and the Counting Toolkit"        (agent 6-b; engines C/D 77+35)
 *   6.3 "Permutations: the Arrangement Count"       (agent 6-c; engines E/F 69+30)
 *   6.4 "Circular and Restricted Permutations"      (agent 6-d; engines G/H 46+35)
 *   6.5 "Combinations: the Selection Count"         (agent 6-e; engines I/J 87+37)
 *   6.6 "Distributions and the Classic Counting Puzzles" (agent 6-f; engines K/L 52+42)
 *   6.R "Unit 6 Completion Review"                  (agent 6-g; engines M/N 94+34)
 * Seven lessons; every lesson's engine green before its prose was
 * declared done (the run records live in the part-file headers below,
 * kept verbatim); the honest word count and totals are re-run by the
 * verifier's census section Z.
 */

/**
 * l6-1.ts — Advanced Algebra chapter 6, lesson 6.1
 * "The Fundamental Principle of Counting" (id
 * aa-the-fundamental-principle-of-counting, pinned permanent and globally
 * unique — grep-verified 0 hits across src/data/library/ at authoring time).
 *
 * AUTHORED 2026-11-20 by the ch-06 parallel swarm (owner chat directive
 * 2026-11-18, honored a second time; agent Task 6-a). Ground: the Drive M2
 * Algebra module 07 band tr-7.1-7.5 (multiplication rule + its repetition
 * proof, addition rule, the route-tree and doors exhibits, ILLUSTRATIONS
 * 7.1–7.19, CAE 7.1) + the S.125 solution shapes — STUDY-NEVER-REPRODUCE:
 * the module informed METHOD SHAPES only; every roster, number, figure,
 * Illustration and exercise below is OUR OWN, recomputed brute-force by the
 * engine v6-1.ts (sections A/B) BEFORE this prose was declared done.
 *
 * NOTE FOR THE ORCHESTRATOR AT PASTE TIME: swap the types import path above
 * to the ch-06.ts in-file form ('../../../types') when assembling — the
 * object shape below is otherwise the exact ch-04.ts lesson shape.
 *
 * Run record (pinned by run-61.ts green — TOTAL 53/53): engine sections
 * A/B (A = 38 checks brute-forcing every number below on literally
 * enumerated small cases — every journey, roster, pattern set, number band
 * and string census swept, the engines caught one real drafting slip: the
 * E9 playlist witness first built with a 1-track overlap where the prose
 * promised 2 — fixed and pinned; B = 15 structural pins); quiz keys
 * [1, 2, 1, 2, 3]; 15 exercises L1–L6 = 2/2/3/3/3/2; 2 original SVG
 * figures (the route tree; the two box-chains) on the vivid palette only;
 * 10 Illustrations incl. the exam-shaped capstone; 4 derivations (the
 * multiplication rule by repetition, the chain by induction, the addition
 * rule by disjoint union + the overlap repair, the complement identity);
 * 5 formula cards; 8 equations \tag 1–8; 2 tables; 10 terms; 13 paras,
 * 8 headings, 8 callouts, 1 census list; 8,227 honest words by
 * countLessonWords (pinned by engine check B10). Hosted folds: NONE
 * (verified — no TOC_FOLD_LEDGER entry hosts this title).
 */
const lesson61: Lesson = {
  id: 'aa-the-fundamental-principle-of-counting',
  number: '6.1',
  title: 'The Fundamental Principle of Counting',
  concepts: [
    'the multiplication rule for AND-chains of choices',
    'the addition rule for disjoint OR-forks',
    'with repetition versus without repetition',
    'the outcome set: a count is the size of a set',
    'the small-case census before any formula',
    'the complement principle: total minus bad',
    'double counting and the honest divide, seeded forward',
  ],
  objectives: [
    'Count journeys, menus and answer sheets with the multiplication rule — and prove it rather than recite it: n added to itself m times, block by block, on the outcome set itself.',
    'Split every question into stages (AND) or alternatives (OR) before touching numbers: multiply along chains, add across forks — and only across DISJOINT forks, with the overlap correction when forks share outcomes.',
    'Tell the two repetition models apart at a glance: the free chain with n to the k, the shrinking chain n(n−1)…(n−k+1) — each censused at small scale before it is trusted.',
    'Read any count as the cardinality of an outcome set — a chain is a cartesian product, a disjoint fork a union — standing on Chapter 1\u2019s set-of-pairs view.',
    'Run the small-case census as the first move of every problem: list sizes 2 and 3 and compare against the formula, so a wrong model is caught before it is priced.',
    'Price at-least-one questions by the complement (total minus bad), and name the divide-by-two repair that the selection lesson owns when order stops mattering.',
  ],
  prerequisites: ['aa-relations-the-set-of-pairs-view'],
  sources: ['cengage-m2-07', 'cengage-jee-style', 'ncert-math11-ch6-permutations-combinations', 'jee-main-2026-syllabus', 'hall-knight-higher-algebra'],
  blocks: [
    { kind: 'para', text: 'Begin with a small, honest question: how many complete lunches can be assembled from one of 4 starters, one of 6 mains and one of 3 desserts? Listing the menus is honest work and takes a page — 72 lines, each line a real menu. Now ask the same-shaped question about a six-question quiz in which each question carries four options: listing the answer patterns would take 4,096 lines, and the listing would teach nothing the lunch list did not already teach. Yet both questions have exact answers reachable in one line of arithmetic, and the line is not a trick — it is a theorem about sets, provable in the same register Chapter 1 taught us to treat pairings as objects. This chapter is the book\u2019s discrete half: counting done as an exact science, the way the JEE module and Hall & Knight both open the subject — the fundamental principle first, everything after built on it. This lesson builds that atom in both of its forms. One form multiplies along a chain of choices joined by AND; the other adds across forks joined by OR — but only across forks that share nothing, a condition this lesson prices honestly rather than waves past. Every later lesson of the chapter is this one principle in costume: lesson 6.2, "Factorials and the Counting Toolkit", compresses the shrinking chains into bookkeeping; lesson 6.3, "Permutations: the Arrangement Count", names them; lesson 6.4, "Circular and Restricted Permutations", restricts them; lesson 6.5, "Combinations: the Selection Count", repairs their double counts; lesson 6.6, "Distributions and the Classic Counting Puzzles", interlocks them all. And the whole ground is what Probability inherits when the shelf prices chance — that handoff is named at this lesson\u2019s close.' },
    { kind: 'para', text: 'The principle is born from two exhibits small enough to census by hand, and the two exhibits deliberately look alike while their answers are built by DIFFERENT rules — which is exactly why the subject keeps both. The first exhibit is a journey with two legs: a trek route runs from Ashvale camp to the harbour dock by way of Beacon ridge, with 3 marked trails from Ashvale to Beacon and 4 marked roads from Beacon to the harbour. How many two-leg journeys are there? The second exhibit is a room with exits on two walls: a studio has 2 doors on the north wall and 4 doors on the south wall, and a visitor must leave by exactly one door. How many ways out are there? The journey answers 12; the room answers 6; the first answer is a product and the second is a sum, and the words AND and EITHER sit at the hinge of the difference.' },

    { kind: 'heading', text: 'Two Exhibits, Two Rules' },
    { kind: 'para', text: 'Take the journey first, and do the honest thing before any formula: list it. A two-leg journey is one trail AND one road — pick a trail from Ashvale to Beacon, then a road from Beacon to the harbour. The figure below draws the tree; the roster beneath it writes the census out in full.' },
    { kind: 'figure', caption: 'The route tree of the journey exhibit: three amber curves (labelled trail 1 to trail 3) run from Ashvale to Beacon, four curves (labelled road 1 to road 4) run from Beacon to the Harbour, and the fan of twelve orange dots on the right marks the twelve two-leg journeys — one dot per trail-and-road pairing, 3 × 4 = 12. Every dot is reached from exactly one trail and one road: the dots ARE the census of all pairings, the cartesian product of the trail set with the road set in miniature.', svg: routeTreeSvg() },
    { kind: 'list', marker: 'decimal', items: [
      'journey 1 — trail 1, then road 1',
      'journey 2 — trail 1, then road 2',
      'journey 3 — trail 1, then road 3',
      'journey 4 — trail 1, then road 4',
      'journey 5 — trail 2, then road 1',
      'journey 6 — trail 2, then road 2',
      'journey 7 — trail 2, then road 3',
      'journey 8 — trail 2, then road 4',
      'journey 9 — trail 3, then road 1',
      'journey 10 — trail 3, then road 2',
      'journey 11 — trail 3, then road 3',
      'journey 12 — trail 3, then road 4',
    ] },
    { kind: 'para', text: 'Read the roster the way a mathematician reads it, not the way a courier does. The twelve journeys fall into three blocks of four: the first four share trail 1, the next four share trail 2, the last four share trail 3. Every block has the SAME length — 4 — because fixing the trail does not remove any road: the road list never cared which trail brought you to Beacon. Three blocks of four is three fours added — which is what the product $3 \\times 4 = 12$ abbreviates. That block-by-block reading is not a metaphor for the rule; it IS the rule\u2019s proof, written down once and for all below.' },
    { kind: 'callout', tone: 'definition', title: 'The fundamental principle of counting (the multiplication rule)', text: 'If one task $A$ can be done in $m$ ways, and a second task $B$ — done after, or alongside, or together with $A$ — can be done in $n$ ways FOR EACH of those $m$ ways, then the joint task "$A$ and $B$" can be done in $m \\times n$ ways. Thus, 3 trails and 4 roads give $3 \\times 4 = 12$ two-leg journeys; 2 doors north and 4 doors south would give $2 \\times 4 = 8$ two-door passages (through and through) — but the one-door exit is a different question, the fork of the next section.' },
    { kind: 'equation', latex: 'm \\times n \\quad \\text{ways} \\tag{1}', note: 'the multiplication rule: m ways for the first task, n continuations for each — both together priced at the product.' },
    { kind: 'para', text: 'A rule this central deserves a proof, not a recital. The argument is the block reading made formal, and it rests on one identification this book made in its very first lesson: an outcome of the joint task is an ordered pair — a way of $A$ paired with a way of $B$ — so the count is the size of a SET, and set arithmetic can price it.' },
    { kind: 'derivation', title: 'The multiplication rule, proved by repetition', statement: 'If task A can be done in m ways and, for each of those ways, task B can be done in n ways, then the joint task A-and-B has exactly m × n ways — proved by partitioning the outcome set into m blocks of size n and adding.', steps: [
      { label: 'Name the outcome set', formula: '\\Omega = \\{(a, b)\\}', explanation: 'An outcome of the joint task is a pair — one way of $A$, one way of $B$ — exactly the ordered-pair objects of Chapter 1\u2019s "Relations: the Set-of-Pairs View". A count is the size of a set, so the set is named before it is counted.' },
      { label: 'Partition by the first stage', formula: '\\Omega = \\bigsqcup_{i=1}^{m} B_i', explanation: 'Group the outcomes by WHICH way of $A$ they use: block $B_i$ collects the outcomes whose first stage is the $i$-th way of $A$. The blocks are disjoint — an outcome uses exactly one way of $A$ — and together they cover all of $\\Omega$.' },
      { label: 'Every block has the same size', formula: '|B_i| = n', explanation: 'Inside block $i$ the first stage is pinned, but the second task still offers all $n$ of its ways: nothing about choosing way $i$ of $A$ removes any continuation of $B$. This independence is the load-bearing hypothesis — the rule dies without it, and a later caution prices its failure.' },
      { label: 'Add the blocks: n added m times', formula: '|\\Omega| = \\underbrace{n + n + \\cdots + n}_{m \\text{ times}} = m \\times n', explanation: 'A disjoint union\u2019s size is the sum of its block sizes — $n$ added to itself $m$ times, which is the very definition of the product $m \\times n$. No slogan was invoked: the multiplication rule is addition, performed $m$ times over a partition.' },
    ], result: '$|\\Omega| = m \\times n$ — the product is $n$ added $m$ times, block by block' },
    { kind: 'para', text: 'Three-storey journeys price the same way, and the generalisation is immediate: if three tasks can be done in $m$, $n$ and $p$ ways respectively — each count unaffected by how the earlier tasks went — the triple has $m \\times n \\times p$ ways, and so on for any number of storeys. The journey exhibit grows a third leg: 2 ferries run from the harbour dock to the island, and the full Ashvale-to-island journey count becomes $3 \\times 4 \\times 2 = 24$.' },
    { kind: 'callout', tone: 'theorem', title: 'The chain form of the principle', text: 'A chain of $k$ stages — stage one, AND stage two, AND … AND stage $k$, with $m_i$ ways at stage $i$ INDEPENDENT of the earlier stages — has $m_1 \\times m_2 \\times \\cdots \\times m_k$ outcomes. One factor per stage; the independence clause ("the count of continuations at each stage is fixed no matter how the earlier stages went") is what licenses the multiplication.' },
    { kind: 'equation', latex: 'm_1 \\times m_2 \\times \\cdots \\times m_k \\quad \\text{ways} \\tag{2}', note: 'the chain form: k stages joined by AND multiply, one factor per stage — proved by induction on the chain length just below.' },
    { kind: 'derivation', title: 'Chains of any length: induction on the chain', statement: 'A chain of k stages, with m_i ways at stage i (independent of the earlier stages), has the product m_1 m_2 … m_k outcomes — proved by induction on the number of stages.', steps: [
      { label: 'Base of the induction: two stages', formula: 'm_1 \\times m_2', explanation: 'The two-stage chain is the multiplication rule just proved by repetition — the floor is laid, not assumed.' },
      { label: 'Induction step: split off the first stage', formula: 'm_1 \\times \\left(m_2 \\times \\cdots \\times m_{k+1}\\right)', explanation: 'A $(k+1)$-stage chain is: choose stage one ($m_1$ ways), then run the $k$-stage tail — and by the induction hypothesis the tail carries $m_2 \\cdots m_{k+1}$ ways WHATEVER the first choice was, which is precisely the independence clause.' },
      { label: 'Apply the two-stage rule', formula: 'm_1 \\times \\left(m_2 \\times \\cdots \\times m_{k+1}\\right) = m_1 m_2 \\cdots m_{k+1}', explanation: 'The proved two-stage rule prices exactly this shape: $m_1$ ways, and for each, the tail\u2019s full count of continuations — so the product gains one factor, and the staircase climbs.' },
      { label: 'The chain closes', formula: '\\prod_{i=1}^{k} m_i', explanation: 'By induction the product form holds for every chain length $k \\geq 2$. This tiny staircase is a preview of chapter 7\u2019s "Induction and the Binomial Theorem", which builds induction into a proof engine of its own; here it serves as a two-line servant of counting.' },
    ], result: '$\\prod_{i=1}^{k} m_i$ — one factor per stage, for every chain length' },
    { kind: 'formula', name: 'The multiplication rule (AND chains)', latex: 'm_1 \\times m_2 \\times \\cdots \\times m_k', note: 'one factor per stage; the stages must be independent — the count of continuations at each stage fixed no matter how the earlier stages went.' },
    { kind: 'example', title: 'Count the set menus: one of 4 starters, one of 6 mains, one of 3 desserts', steps: [
      'The meal is a three-stage AND chain — starter AND main AND dessert — with the three choices independent: the dessert list does not care which starter was taken.',
      'So, the multiplication rule prices it stage by stage: $4$ ways for the starter, $6$ for the main, $3$ for the dessert.',
      'Hence, the chain closes at $4 \\times 6 \\times 3 = 72$ set menus.',
      'Check, the small-case census at $(2, 2, 2)$: two starters, two mains and two desserts give $2 \\times 2 \\times 2 = 8$ combinations, listable in one breath — (s1, m1, d1), (s1, m1, d2), (s1, m2, d1), (s1, m2, d2), (s2, m1, d1), (s2, m1, d2), (s2, m2, d1), (s2, m2, d2) — and the list\u2019s length is exactly the count, so the rule is trusted before it is scaled.',
    ] },
    { kind: 'example', title: 'The demo team: one senior AND one junior, from 14 seniors and 9 juniors', steps: [
      'The team is two tasks done together: pick the senior, pick the junior — the word AND is the signal that the counts multiply.',
      'So, $14 \\times 9 = 126$ teams by the multiplication rule.',
      'Now, read the count as a set: the teams are the ordered pairs (senior, junior) — one per cell of the $14 \\times 9$ roster grid — the cartesian product of the senior set with the junior set.',
      'Hence, $126 = |S \\times J|$ — a count is the size of a set of outcomes, Chapter 1\u2019s set-of-pairs view cashed at its smallest.',
    ] },

    { kind: 'heading', text: 'Repetition: the First Question of Every Chain' },
    { kind: 'para', text: 'Before any chain in this chapter is priced, one question decides WHICH chain you are in — and it is asked before the first number is written: does a stage spend its option? A shop window holds a row of 3 mugs, each a different one of 7 colours: the first place has 7 colours to choose from, but once a colour is placed the second place has only 6 left, and the third only 5 — the chain SHRINKS, stage by stage, giving $7 \\times 6 \\times 5 = 210$ rows. Contrast the six-question answer sheet: every question freely takes any of its 4 marks no matter what the earlier questions took — the chain is FREE, giving $4^6 = 4096$ patterns. The shrinking chain is the WITHOUT-repetition model; the free chain is the WITH-repetition model; and the whole difference between the chapter\u2019s two great counts later rides on this divide, because lesson 6.2\u2019s factorial bookkeeping exists to compress exactly the shrinking chain. The figure contrasts the two shapes at a glance.' },
    { kind: 'figure', caption: 'The two box-chains of the repetition divide. Top: the free chain of the answer sheet — six stages, each holding the full stock of 4 options, 4 × 4 × 4 × 4 × 4 × 4 = 4⁶ = 4096 patterns. Bottom: the shrinking chain of the display row — three stages holding 7, 6 and 5 as each place spends its colour, 7 × 6 × 5 = 210 rows (and 7³ = 343 rows if colours could repeat — the free version of the same stock). Ask "does a stage spend its option?" and the two chains tell themselves apart.', svg: boxChainsSvg() },
    { kind: 'equation', latex: 'n^k = \\underbrace{n \\times n \\times \\cdots \\times n}_{k \\text{ factors}} \\tag{3}', note: 'the with-repetition census: every stage free to reuse the whole stock of n options — the answer sheets, coin flips and digit codes of this lesson.' },
    { kind: 'equation', latex: 'n \\times (n-1) \\times (n-2) \\times \\cdots \\times (n-k+1) \\tag{4}', note: 'the without-repetition census: each stage spends one option, and the chain shrinks — the bookkeeping lesson 6.2 compresses into factorials.' },
    { kind: 'callout', tone: 'warn', title: 'Repetition decides the chain — ask first, compute second', text: 'The single most common counting error is pricing one model with the other\u2019s chain. $4^6$ prices an answer sheet BECAUSE marks may repeat; the same six questions forced to carry six DIFFERENT marks would price at $4 \\times 3 \\times 2 \\times 1 \\times 0 \\times 0 = 0$ — impossible, the stock of options runs dry — and a subtler constraint (no two CONSECUTIVE answers alike) prices at $4 \\times 3 \\times 3 \\times 3 \\times 3 \\times 3 = 972$, worked below. Before multiplying anything, say aloud which model the problem lives in: "may a stage reuse a spent option?"' },
    { kind: 'example', title: 'The display row: 7 mug colours on 3 places, no colour twice — and the same row if repetition were allowed', steps: [
      'Setup: a shop window holds a row of 3 mugs, each a different one of 7 colours — a three-stage chain WITHOUT repetition.',
      'So, the chain shrinks: first place $7$ options, second place $6$ (one colour spent), third place $5$: $7 \\times 6 \\times 5 = 210$ rows.',
      'Now, if repetition were allowed the chain would be free: $7 \\times 7 \\times 7 = 7^3 = 343$ rows — the same stock, the other model.',
      'Hence, the two models differ by $343 - 210 = 133$ rows — precisely the rows that repeat a colour; telling the models apart IS telling the answers apart.',
    ] },
    { kind: 'example', title: 'The answer sheet: 6 questions, 4 options each — all patterns, then the no-two-consecutive-alike patterns', steps: [
      'All patterns: each question freely takes any of its 4 marks — a six-stage chain WITH repetition, so $4^6 = 4096$ patterns.',
      'Now, the constrained sheet: the first answer is free ($4$ ways), but each later answer must differ from its neighbour — $3$ ways each: $4 \\times 3^5 = 972$ patterns.',
      'Check, the census at two questions: $4 \\times 3 = 12$ no-alike pairs out of $4 \\times 4 = 16$ total — the four matching pairs (a, a) are exactly what the constraint deletes, $16 - 12 = 4$.',
      'Hence, $4096$ unconstrained and $972$ with no two consecutive alike — one sheet, two chains, priced apart by the repetition question.',
    ] },
    { kind: 'formula', name: 'The with-repetition census', latex: 'n^k', note: 'k stages, each free to pick any of n options — the answer-sheet, coin-flip and digit-code chains of this lesson.' },
    { kind: 'formula', name: 'The without-repetition census', latex: 'n\\,(n-1)(n-2)\\cdots(n-k+1)', note: 'each stage spends one option: the shrinking chain — 6.2\u2019s factorial bookkeeping and 6.3\u2019s arrangement count are this chain compressed and named.' },
    { kind: 'table', caption: 'The two chains censused on this lesson\u2019s own worked numbers: the free chain prices repetition, the shrinking chain prices the spent option — the difference between the two models is exactly the repeated-outcome rows, and every row below is brute-force re-verified by the engines.', head: ['Scenario', 'Stage options', 'Chain', 'Count'], rows: [
      ['answer sheet, 6 questions × 4 options, repeats allowed', '4, 4, 4, 4, 4, 4', '$4^6$', '4096'],
      ['display row, 7 colours on 3 places, no repeat', '7, 6, 5', '$7 \\times 6 \\times 5$', '210'],
      ['the same display row if colours could repeat', '7, 7, 7', '$7^3$', '343'],
      ['4-symbol security code: one letter, three digits, repeats allowed', '26, 10, 10, 10', '$26 \\times 10^3$', '26000'],
      ['the same code with the three digits distinct', '26, 10, 9, 8', '$26 \\times 10 \\times 9 \\times 8$', '18720'],
      ['5-letter strings from the alphabet {P, Q, R, S}', '4, 4, 4, 4, 4', '$4^5$', '1024'],
    ] },

    { kind: 'heading', text: 'The Addition Rule: Forks That Add' },
    { kind: 'para', text: 'The second exhibit is the studio with exits on two walls: 2 doors on the north wall, 4 on the south, and a visitor who must leave by exactly one door. The ways out split into two families — out through a north door, OR out through a south door — and the families share nothing: a door is on one wall or the other, never both. Counting the north family (2 ways), then the south family (4 ways), counts every exit exactly once, so the total is $2 + 4 = 6$ ways out. The word EITHER did all the work: where AND joined tasks into a chain that multiplies, EITHER splits a task into forks that add — and the addition rule\u2019s honesty clause is that the forks must be disjoint, which the walls of a studio deliver and the double-listings of a cinema do not.' },
    { kind: 'callout', tone: 'definition', title: 'The addition rule (disjoint forks)', text: 'If a task can be done EITHER by route $X$, which offers $m$ ways, OR by route $Y$, which offers $n$ ways, AND the two routes share no outcome, then the task has $m + n$ ways. Thus, the studio\u2019s exits: $2 + 4 = 6$ ways out — a fork of two disjoint families.' },
    { kind: 'equation', latex: 'm + n \\quad \\text{ways} \\tag{5}', note: 'the addition rule: two disjoint alternatives, either-or — the OR count; overlapping forks need the correction of equation (6).' },
    { kind: 'derivation', title: 'The addition rule, proved by disjoint union', statement: 'If the task can be done either by route X (m ways) or by route Y (n ways), and no outcome belongs to both routes, the task has m + n ways; if the routes overlap, the shared outcomes must be subtracted back exactly once.', steps: [
      { label: 'Disjoint forks: count X, then count Y', formula: '|X \\cup Y| = |X| + |Y| \\quad (X \\cap Y = \\varnothing)', explanation: 'When the routes share nothing, listing $X$\\u2019s outcomes and then $Y$\\u2019s lists every outcome of the union exactly once — the disjoint-union law on Chapter 1\u2019s set ground, and the entire content of the addition rule.' },
      { label: 'Where exclusivity is load-bearing', formula: 'X \\cap Y \\neq \\varnothing \\;\\Longrightarrow\\; |X| + |Y| \\;\\text{overcounts}', explanation: 'A shared outcome is counted once inside $m$ and AGAIN inside $n$ — the sum double-counts it. Witness the smallest pair of overlapping lists: $X = \\{1, 2\\}$ and $Y = \\{2, 3\\}$ give $2 + 2 = 4$ while the union holds only three elements.' },
      { label: 'The corrected count', formula: '|X \\cup Y| = |X| + |Y| - |X \\cap Y|', explanation: 'Subtract the overlap once: the double-counted members are given back exactly once, and the corrected formula counts every outcome exactly once — shared or not.' },
      { label: 'The full machine, named forward only', formula: '|X \\cup Y \\cup Z| = \\sum |X_i| - \\sum |X_i \\cap X_j| + |X \\cap Y \\cap Z|', explanation: 'Three overlapping forks alternate signs — the inclusion–exclusion principle, which lesson 6.6 builds and cashes in full generality; here it is only NAMED, never used.' },
    ], result: 'disjoint forks add: $m + n$ — overlapping forks must return $-\\,|X \\cap Y|$' },
    { kind: 'equation', latex: '|X \\cup Y| = |X| + |Y| - |X \\cap Y| \\tag{6}', note: 'the overlap-corrected addition: forks that share outcomes must give the shared ones back — the minus sign is the honesty clause.' },
    { kind: 'callout', tone: 'warn', title: 'Only disjoint forks add', text: 'The addition rule has one hypothesis, and dropping it silently is the chapter\u2019s second classic fraud (after the repetition mix-up). A cinema lists 6 thrillers and 9 comedies this week, and 2 of the films are listed under BOTH genres: the naive $6 + 9 = 15$ counts each crossover film twice, and the honest count is $6 + 9 - 2 = 13$ — worked below. Whenever a fork is priced, say whether its arms share outcomes; if they do, the shared ones go back.' },
    { kind: 'formula', name: 'The addition rule (disjoint OR forks)', latex: 'm + n \\quad (\\text{arms share nothing})', note: 'either-or across mutually exclusive alternatives; overlapping arms need equation (6)\u2019s correction — never add blindly.' },
    { kind: 'example', title: 'The platform fork: 5 express trains and 7 local trains to the coast — one ticket', steps: [
      'The traveller boards EITHER an express OR a local: the word OR signals that the counts add — PROVIDED the fleets share no train.',
      'So, check the disjointness honesty: the 5 expresses and 7 locals are distinct services, no train listed in both fleets — the fork\u2019s arms share nothing.',
      'Hence, $5 + 7 = 12$ ways to board — the addition rule on a genuinely disjoint fork.',
      'Note, the multiplication rule would answer a DIFFERENT question: $5 \\times 7 = 35$ would price an express-out-and-local-back round trip — two legs, a chain. The fork and the chain are two QUESTIONS, not two methods for one question.',
    ] },
    { kind: 'example', title: 'The cinema listings: 6 thrillers and 9 comedies, 2 films listed under both genres — distinct films on offer', steps: [
      'The fork overlaps: the 2 crossover films sit in both lists, so the naive sum $6 + 9 = 15$ counts each of them twice.',
      'So, correct by equation (6): $6 + 9 - 2 = 13$ distinct films.',
      'Check, the tiny witness of the derivation: lists $\\{1, 2\\}$ and $\\{2, 3\\}$ overlap at one element, and $2 + 2 - 1 = 3$ — the same repair at the smallest scale.',
      'Hence, 13 distinct films — a fork that had to give its shared outcomes back.',
    ] },

    { kind: 'heading', text: 'Outcomes as Sets: the Ground of Chapter 1' },
    { kind: 'para', text: 'Everything above runs on a quiet foundation worth stating once, loudly, because the whole chapter stands on it: every count is the CARDINALITY of a set of outcomes. The multiplication rule is a statement about cartesian products — a two-stage chain\u2019s outcomes are exactly the ordered pairs of $A \\times B$, so the rule says $|A \\times B| = |A| \\cdot |B|$, which is what the engines of this book\u2019s first lesson already computed when they counted relations. The addition rule is a statement about unions of disjoint sets. The complement principle below is a statement about set differences. This is Chapter 1\u2019s "Relations: the Set-of-Pairs View" cashed into a counting discipline: name the outcome set first, and the arithmetic follows from the set\u2019s shape. When a problem feels slippery, the cure is always the same — write down what ONE outcome looks like as a mathematical object, and count those objects.' },
    { kind: 'equation', latex: '|A \\times B| = |A| \\cdot |B| \\tag{7}', note: 'the set-of-pairs read of the multiplication rule: a two-stage chain IS a cartesian product — chapter 1\u2019s ground cashed.' },
    { kind: 'example', title: 'Ordered pairs (x, y) with x < 3 < y, drawn from {1, 2, …, 8}', steps: [
      'Read the outcome set: the pair $(x, y)$ is an ordered pair — chapter 1\u2019s set-of-pairs object — and the constraint $x < 3 < y$ splits into two independent stage lists.',
      'So, $x \\in \\{1, 2\\}$: $2$ options; and $y \\in \\{4, 5, 6, 7, 8\\}$: $5$ options — the middle value 3 belongs to neither list.',
      'Now, the chain closes: $2 \\times 5 = 10$ ordered pairs.',
      'Hence, listed in full — (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (2, 4), (2, 5), (2, 6), (2, 7), (2, 8) — the count and the list agree, as the small-case census demands.',
    ] },
    { kind: 'table', caption: 'The two rules at a glance, on this lesson\u2019s own witnesses — the question the data asks, the rule it wants, and the honest count. Read the question\u2019s joining word first (AND or EITHER), then the repetition clause, then the overlap clause: three questions, and the rule names itself.', head: ['Question the data asks', 'Rule', 'This lesson\u2019s witness', 'Count'], rows: [
      ['one of each, stage after stage (AND)', 'multiply', 'the lunch chain $4 \\times 6 \\times 3$', '72'],
      ['every stage free to repeat (AND)', 'multiply', 'the answer sheet $4^6$', '4096'],
      ['each stage spends its option (AND)', 'multiply', 'the display row $7 \\times 6 \\times 5$', '210'],
      ['either of two disjoint arms (OR)', 'add', 'the platform fork $5 + 7$', '12'],
      ['either of two overlapping arms (OR)', 'add, overlap returned', 'the cinema listings $6 + 9 - 2$', '13'],
      ['at least one (the rest of a total)', 'total minus bad', 'the coin flips $2^5 - 1$', '31'],
    ] },

    { kind: 'heading', text: 'The Small-Case Census: the Wrong-Model Catcher' },
    { kind: 'para', text: 'This chapter installs one habit above all others, and this lesson is where it is planted: before any formula is trusted, LIST the cases at size two or three and compare. The multiplication rule survived its census — the twelve journeys were literally written out before the product was allowed to speak. The overlap correction survives its census: two tiny lists of two elements, three in the union, one given back. The repetition divide survives its census: at two questions the answer-sheet constraint deletes exactly the four matching pairs. In the other direction, the census CATCHES wrong models before they are priced: a solver who adds where a fork overlaps, or multiplies where stages are not independent, or prices a shrinking chain with a free chain\u2019s power, produces a number that is wrong by a factor the census exposes at size three. Every lesson of this chapter — from 6.2\u2019s factorial identities to 6.6\u2019s derangements — opens its machines at a scale the human eye can check; that discipline is installed here, first.' },
    { kind: 'callout', tone: 'insight', title: 'The census discipline', text: 'List sizes 2 and 3 before trusting any formula. The habit costs one line at small scale and catches every wrong model the chapter\u2019s formulas can invite: the addition fraud, the overlap fraud, the repetition mix-up, the independence failure. A formula that survives its own census has earned its seat; one that has never met a census is a slogan, and this book does not ship slogans.' },

    { kind: 'heading', text: 'Both Rules at Once: the Case-Split Machine' },
    { kind: 'para', text: 'Real counting questions interlock the two rules, and the standard interlock is the CASE SPLIT: a constraint carves the outcome set into disjoint families, each family is priced by its own chain, and the families add. The classic exhibit — small enough to census first, rich enough to exercise every clause — is the even-numbered count with distinct digits: parity pins the units digit, distinctness shrinks the chain, and the zero carries a case boundary of its own.' },
    { kind: 'example', title: 'Three-digit numbers with all digits distinct and even — the case-split machine, censused small first', steps: [
      'Census first, at two digits: among 10–99 with distinct digits and even value — Case (i), units digit 0: the tens place has $9$ options, so $9$ numbers. Case (ii), units digit in $\\{2, 4, 6, 8\\}$: $4$ unit choices, and the tens place then takes any of the $8$ remaining nonzero digits: $4 \\times 8 = 32$. Total $9 + 32 = 41$ — and a brute list of the two-digit band confirms 41, so the machinery is trusted before it is scaled.',
      'Now, the three-digit machine — Case (i), units digit 0: the hundreds place takes any of $1$–$9$ ($9$ ways, zero barred), the tens place any of the $8$ remaining: $9 \\times 8 = 72$ numbers.',
      'Case (ii), units digit in $\\{2, 4, 6, 8\\}$ ($4$ ways): the hundreds place takes any nonzero digit except the units digit ($8$ ways), the tens place any unused digit, zero included ($8$ ways): $4 \\times 8 \\times 8 = 256$ numbers.',
      'Hence, $72 + 256 = 328$ — two disjoint cases, each priced by a shrinking chain, added across the fork: both rules in one number. The engines sweep all 900 three-digit numbers and confirm 328.',
    ] },

    { kind: 'heading', text: 'The Complement: Count the Honest Side' },
    { kind: 'para', text: 'One more engine belongs to this lesson\u2019s foundation, because the rest of the chapter leans on it constantly: when a question asks for AT LEAST ONE of something, the direct count is usually ugly (sum over one, two, three … cases), while the opposite side is often a single block. The repair is to count the tidy side and subtract from the total — total minus bad. The principle is a one-line consequence of the addition rule applied to a partition every set carries for free; the discipline of using it — choosing the side that is cheap to count — is the craft. Lesson 6.4 will price "not-together" arrangements by this subtraction, lesson 6.6 will count derangements by it, and the review 6.R lists it on the chapter\u2019s decision map as a standing move.' },
    { kind: 'derivation', title: 'The complement identity', statement: 'For any finite universe Ω and any subset A, the count of outcomes NOT in A is the total minus the count of A — the complement principle, proved from the addition rule.', steps: [
      { label: 'Split the universe', formula: '\\Omega = A \\sqcup (\\Omega \\setminus A)', explanation: 'Every outcome either lies in $A$ or outside it, and never both — the complement partition, the simplest disjoint fork in the subject, delivered free by the meaning of set difference.' },
      { label: 'Apply the addition rule', formula: '|\\Omega| = |A| + |\\Omega \\setminus A|', explanation: 'The two parts are disjoint alternatives that cover everything, so the addition rule of this lesson applies verbatim.' },
      { label: 'Rearrange', formula: '|\\Omega \\setminus A| = |\\Omega| - |A|', explanation: 'Total minus bad. When the bad side is one tiny block — the single all-heads coin sequence, the no-repeat codes inside the repeat-allowed total — the at-least-one side prices in one subtraction.' },
      { label: 'The census guard', formula: '|A| \\leq |\\Omega|', explanation: 'The subtraction is honest only when $A$ really sits inside $\\Omega$ — and the small-case census checks that the bad side is what it claims to be before it is subtracted: at tiny scale the complement CAN be empty, and knowing that early saves a formula from being trusted in a regime where it answers zero.' },
    ], result: '$|\\Omega \\setminus A| = |\\Omega| - |A|$ — total minus bad' },
    { kind: 'equation', latex: '|\\Omega \\setminus A| = |\\Omega| - |A| \\tag{8}', note: 'the complement principle: count the honest side and subtract — the engine that 6.4 and 6.6 cash at restrictions and derangements.' },
    { kind: 'formula', name: 'The complement principle', latex: '|\\Omega \\setminus A| = |\\Omega| - |A|', note: 'price at-least-one questions from the opposite side: total minus bad — the engine 6.4 and 6.6 cash at restricted arrangements and derangements.' },
    { kind: 'example', title: 'Five coin flips: sequences with at least one tail — the complement priced', steps: [
      'The universe: five independent flips, each a two-option stage — $2^5 = 32$ sequences, the with-repetition census of equation (3).',
      'So, the bad side: sequences with NO tail at all — exactly one, HHHHH, the single member of the bad set.',
      'Hence, at least one tail: $32 - 1 = 31$ sequences — the complement principle, equation (8), priced in one subtraction.',
      'Now, the same census read as subsets: a 3-element set has $2^3 = 8$ subsets — empty, {p}, {q}, {r}, {p, q}, {p, r}, {q, r}, {p, q, r} — each element\u2019s own in-or-out binary decision, the per-object census that lesson 6.5 grows into the full $2^n$ selection engine. A 5-element set has $2^5 = 32$ subsets, $31$ of them non-empty — the SAME 32-and-31 as the coins, because flips and subsets are the same free chain.',
    ] },
    { kind: 'example', title: 'Exam-style: a four-symbol security code — with repetition, without repetition, and the at-least-one-repeat side', steps: [
      'Setup (exam-shaped, our own design): a 4-symbol code puts one of the 26 letters first, then three digits from 0–9.',
      'Part (i), repetition allowed: the chain is free — $26 \\times 10 \\times 10 \\times 10 = 26000$ codes.',
      'Part (ii), the three digits distinct: the digit chain shrinks — $26 \\times 10 \\times 9 \\times 8 = 18720$ codes.',
      'Part (iii), at least one digit repeated: the complement of (ii) inside (i) — $26000 - 18720 = 7280$ codes, the side equation (8) prices.',
      'Check, the census at one digit: $26 \\times 10 = 260$ two-symbol codes, and the repeat side is EMPTY there — a complement can be zero at small scale, exactly why the census is run before the subtraction is trusted.',
      'Hence, 26000 / 18720 / 7280 — one code, three models, both rules: the free chain, the shrinking chain, and the subtraction between them.',
    ] },

    { kind: 'heading', text: 'Where the Engine Sits' },
    { kind: 'callout', tone: 'exam', title: 'Where this sits in the examinations', text: 'This chapter\u2019s exam ground is REAL, and this lesson sits at its front door: the JEE (Main) 2026 mathematics syllabus carries permutations and combinations as a named unit of its unit list (the banked syllabus audit records it at unit 4), so the multiplication and addition principles — the prerequisites of every P&C item — are examined material in their own right. The school-canon ground is NCERT class 11 chapter 6, "Permutations and Combinations", whose opening pages teach this very principle with journeys and codes; the classic stretch is Hall and Knight\u2019s permutations chapter, which opens identically — the fundamental principle first, the two great counts after. Khattar-style aptitude papers price the same discipline numerically: outfit counts, code counts, signal counts, day counts. The module\u2019s own exercise typology — single correct, multiple correct, linked comprehension, matrix match and numerical value — is the typology this lesson\u2019s L4–L6 sets mirror. Every item in this lesson is our own design, labelled exam-style honestly, never lifted from any paper.' },
    { kind: 'callout', tone: 'historical', title: 'Leibniz 1666: the art of combining', text: 'The "how many ways" question is old enough to have founded a discipline: in 1666 Gottfried Wilhelm Leibniz published his Dissertatio de arte combinatoria — a discourse on the art of combinations — proposing that reasoning itself might reduce to a calculus of combinations, an ambition this chapter\u2019s two rules serve in miniature. And when Pascal and Fermat, in their 1654 letters on the division of an interrupted game, founded probability, they were counting outcomes of exactly the kind this lesson counts — the fundamental principle doing probability\u2019s arithmetic before probability had a name. The book\u2019s positioning states the handoff plainly: this chapter is the ground Probability inherits, and the counted universes built here — the 4096 answer sheets, the 32 coin sequences — are the denominators of every probability to come. The shelf\u2019s Combinatorics volume rereads these fundamentals at full depth — bijections, generating functions, inclusion–exclusion at full generality — as the next rung beyond this chapter; no lesson ids exist there yet, and none is invented here.' },
    { kind: 'para', text: 'What waits ahead, in order. Lesson 6.2, "Factorials and the Counting Toolkit", compresses the shrinking chain $n(n-1)(n-2)\\cdots$ into factorial bookkeeping and states the false laws that compression tempts; lesson 6.3, "Permutations: the Arrangement Count", names the shrinking chain $n\\,P\\,r$ and prices the arrangement questions this lesson only chains; lesson 6.4, "Circular and Restricted Permutations", moves the chain to the round table and cashes the complement at not-together restrictions; lesson 6.5, "Combinations: the Selection Count", owns the divide-by-two repair this lesson\u2019s diagonal count glimpsed, and grows the per-object binary census into the full selection engine; lesson 6.6, "Distributions and the Classic Counting Puzzles", interlocks everything in the puzzle room; and the Unit 6 Completion Review walks the chapter\u2019s decision map — chain or fork, repetition or not, overlap or not, at-least-one or its complement. Beyond the chapter, Probability inherits this whole ground, and the Combinatorics volume deepens it. The two questions that opened this lesson — which word joins the choices, and does a stage spend its option — ride with you through all of it.' },

    { kind: 'terms', items: [
      { term: 'fundamental principle of counting', def: 'the multiplication rule: a task done as an AND-chain of stages, with $m_i$ ways at stage $i$ independent of the earlier stages, has the product $m_1 m_2 \\cdots m_k$ ways — proved by partitioning the outcome set into $m$ blocks of size $n$ and adding.' },
      { term: 'addition rule', def: 'the OR count: a task done either by route $X$ ($m$ ways) or by disjoint route $Y$ ($n$ ways) has $m + n$ ways; overlapping arms must return their shared outcomes, $|X \\cup Y| = |X| + |Y| - |X \\cap Y|$.' },
      { term: 'disjoint alternatives', def: 'forks that share no outcome — the only forks the plain addition rule prices; exclusivity is load-bearing, not decorative.' },
      { term: 'chain of stages', def: 'a task decomposed into sequential choices joined by AND — one factor per stage in the multiplication rule, valid only when the count of continuations at each stage is fixed regardless of the earlier stages.' },
      { term: 'with repetition', def: 'the free chain: every stage may reuse the whole stock of options — $k$ stages over $n$ options give $n^k$ outcomes (answer sheets, coin flips, digit codes).' },
      { term: 'without repetition', def: 'the shrinking chain: each stage spends one option — $n(n-1)\\cdots(n-k+1)$ outcomes; the bookkeeping that 6.2 compresses into factorials and 6.3 names as the arrangement count.' },
      { term: 'outcome set', def: 'the set whose cardinality IS the count — a chain\u2019s outcomes form a cartesian product, a disjoint fork\u2019s a union; chapter 1\u2019s set-of-pairs view cashed into counting.' },
      { term: 'small-case census', def: 'the chapter\u2019s discipline: list the cases at size 2 or 3 and compare against the formula before trusting it — the wrong-model catcher every later lesson runs first.' },
      { term: 'complement principle', def: 'total minus bad: $|\\Omega \\setminus A| = |\\Omega| - |A|$ — price at-least-one questions from the opposite side; cashed at restrictions in 6.4 and derangements in 6.6.' },
      { term: 'double counting', def: 'counting one outcome twice — by overlap in a fork (the $-|X \\cap Y|$ repair) or by order in a selection (each pair picked as (P, Q) and again as (Q, P)); the divide that 6.5 owns.' },
    ] },

    { kind: 'quiz', title: 'Check yourself: the fundamental principle of counting', items: [
      { q: 'A wardrobe holds 5 shirts and 4 trousers; an outfit is one shirt with one pair of trousers. The number of outfits is:', options: ['9', '20', '40', '625'], answer: 1, explain: 'The outfit is an AND-chain — shirt AND trousers — so the counts multiply: $5 \\times 4 = 20$ (option B). Option A\u2019s 9 is the addition fork $5 + 4$, which prices a DIFFERENT question — how many single garments could be worn alone. Option C\u2019s 40 counts a phantom third stage ($5 \\times 4 \\times 2$) — a block of two shoes smuggled into a two-stage question. Option D\u2019s $625 = 5^4$ pastes the with-repetition power onto a chain that never repeats: each trouser pairs with each shirt exactly once — 4 ways per shirt, not 5.' },
      { q: 'A shelf holds 8 mathematics books and 6 physics books, none listed twice; a reader takes exactly one book. The number of choices is:', options: ['48', '2', '14', '6'], answer: 2, explain: 'One book from EITHER shelf is a disjoint OR-fork — the arms share nothing — so the counts add: $8 + 6 = 14$ (option C). Option A\u2019s $48 = 8 \\times 6$ is the multiplication rule pasted onto a fork: it would price taking one book from EACH shelf, a two-book question. Option B\u2019s 2 counts the genres rather than the books; option D\u2019s 6 counts only the physics arm — a fork with one arm forgotten.' },
      { q: 'Four seats in a row are filled by four of 6 distinct volunteers, no volunteer used twice. The number of fillings is:', options: ['1296', '360', '18', '24'], answer: 1, explain: 'A without-repetition chain of four stages: $6 \\times 5 \\times 4 \\times 3 = 360$ (option B). Option A\u2019s $1296 = 6^4$ is the WITH-repetition census — the same four seats if volunteers could repeat; option C\u2019s $18 = 6 + 5 + 4 + 3$ adds the stages, pricing stages that are AND-joined as though they were forks; option D\u2019s $24 = 4 \\times 3 \\times 2 \\times 1$ prices the chain as though only 4 volunteers existed — the full-length fill of a 4-deep roster, the trap 6.2\u2019s factorials will name precisely.' },
      { q: 'A six-question true/false quiz is answered in all possible ways. The number of answer patterns with at least one TRUE is:', options: ['64', '32', '63', '6'], answer: 2, explain: 'The total is $2^6 = 64$; exactly ONE pattern has no TRUE (all six FALSE); so at least one TRUE costs $64 - 1 = 63$ (option C) — the complement principle at work. Option A\u2019s 64 is the raw total, the at-least-one clause forgotten; option B\u2019s $32 = 2^5$ prices a five-question quiz, one stage deleted; option D\u2019s 6 counts only the exactly-one-TRUE patterns ($6$ ways to place the single TRUE) — a much smaller set than at-least-one.' },
      { q: 'With x and y drawn from {1, 2, …, 9}, the number of ordered pairs (x, y) with x ≤ 2 and y ≥ 5 is:', options: ['20', '7', '5', '10'], answer: 3, explain: 'The two constraints are independent stage lists: $x \\in \\{1, 2\\}$ ($2$ options) and $y \\in \\{5, 6, 7, 8, 9\\}$ ($5$ options), so the pairs form a $2 \\times 5$ census — $10$ ordered pairs (option D). Option A\u2019s 20 misreads the first list as $\\{1, 2, 3, 4\\}$ ($x \\leq 4$) and multiplies $4 \\times 5$; option B\u2019s $7 = 2 + 5$ adds the stage lists — the AND read priced as an OR; option C\u2019s 5 counts only the y-column, the x-stage forgotten.' },
    ] },

    { kind: 'exercises', title: 'Exercises 6.1', sets: [
      { level: 'L1', questions: [
        { q: 'A café serves 2 soups (tomato, corn) and 3 breads (flat, sourdough, roll). Enumerate every soup-and-bread pairing, and state which rule prices the count.', solution: [
          'The pairing is an AND-chain at its smallest honest scale: soup AND bread, the two stages independent.',
          'So, enumerate the roster: (tomato, flat), (tomato, sourdough), (tomato, roll), (corn, flat), (corn, sourdough), (corn, roll) — six pairings, one line each.',
          'Hence, the multiplication rule prices it: $2 \\times 3 = 6$ — and at this scale the enumeration IS the proof, the list\u2019s length read off directly.',
        ], answer: '6 pairings, enumerated — the multiplication rule' },
        { q: 'A set lunch is one crust (3 kinds), one topping (7 kinds) and one drink (4 kinds). Run the small-case census at (2, 2, 2) first, then count the set lunches.', solution: [
          'Census first: with 2 crusts, 2 toppings and 2 drinks the roster holds $2 \\times 2 \\times 2 = 8$ lunches, listable in one breath — the rule is trusted before it is scaled.',
          'So, the real chain: $3 \\times 7 \\times 4 = 84$ set lunches — three stages, three factors.',
          'Hence, 84 — the multiplication rule on a three-storey chain, each stage independent of the rest.',
        ], answer: '84 set lunches' },
      ] },
      { level: 'L2', questions: [
        { q: 'A news app lists 10 cricket articles and 8 football articles; 3 articles are listed under both headings. How many DISTINCT articles can a reader open?', solution: [
          'The fork overlaps: the 3 double-listed articles sit in both lists, so the naive sum $10 + 8 = 18$ counts each of them twice.',
          'So, correct by the overlap law, equation (6): $10 + 8 - 3 = 15$ distinct articles.',
          'Check, the census at the tiny witness: lists $\\{1, 2\\}$ and $\\{2, 3\\}$ give $2 + 2 - 1 = 3$ — the shared member given back exactly once.',
          'Hence, 15 distinct articles — a fork that had to return its shared outcomes.',
        ], answer: '15 distinct articles' },
        { q: 'Eight runners finish a race with no ties; gold, silver and bronze medals go to three distinct runners. How many podium outcomes (first, second, third) exist?', solution: [
          'The podium is a three-stage without-repetition chain: first place $8$ options, second place $7$ (one runner spent), third place $6$.',
          'So, $8 \\times 7 \\times 6 = 336$ podium outcomes by the multiplication rule on a shrinking chain.',
          'Hence, 336 — the shape lesson 6.3 will compress and name; here it is only chained, never named.',
        ], answer: '336 podium outcomes' },
      ] },
      { level: 'L3', questions: [
        { q: 'Count the ordered pairs (x, y) with x and y in {1, 2, …, 10} and x + y even, by splitting into disjoint cases.', solution: [
          'Split by parity — two disjoint cases that cover everything: both odd, or both even (a sum is even exactly when the parities match).',
          'Case (i), both odd: $x \\in \\{1, 3, 5, 7, 9\\}$ and $y$ likewise — $5 \\times 5 = 25$ pairs.',
          'Case (ii), both even: likewise $5 \\times 5 = 25$ pairs.',
          'Hence, $25 + 25 = 50$ ordered pairs — the fork added across, the chains multiplied within: both rules in one count. The engines sweep all 100 pairs and confirm 50.',
        ], answer: '50 ordered pairs' },
        { q: 'A control panel has 4 switches, each ON or OFF. Count (i) all states, (ii) states with at least one switch ON, (iii) states with exactly one switch ON.', solution: [
          '(i) Each switch is a two-option stage, four independent stages: $2^4 = 16$ states — the with-repetition census.',
          '(ii) At least one ON — the complement of the single all-OFF state: $16 - 1 = 15$ states.',
          '(iii) Exactly one ON: choose WHICH switch is on — $4$ ways; the other three are then forced OFF: $4$ states.',
          'Hence, $16$ / $15$ / $4$ — the total, the complement side, and a single-stage choice with forced completion.',
        ], answer: '16 states; 15 with at least one ON; 4 with exactly one ON' },
        { q: 'Count the two-digit numbers with distinct digits and even value by hand; then the three-digit numbers with distinct digits and even value. (The small-case census is not optional — it is the method.)', solution: [
          'Two-digit census — Case (i), units digit 0: the tens place has $9$ options ($1$–$9$): $9$ numbers. Case (ii), units digit in $\\{2, 4, 6, 8\\}$: $4$ unit choices, and the tens place then takes any of the $8$ remaining nonzero digits: $4 \\times 8 = 32$. Total $9 + 32 = 41$.',
          'Three-digit — Case (i), units digit 0: the hundreds place takes any nonzero digit ($9$ ways), the tens place any of the $8$ remaining: $9 \\times 8 = 72$.',
          'Case (ii), units digit in $\\{2, 4, 6, 8\\}$ ($4$ ways): the hundreds place any nonzero digit except the units digit ($8$ ways), the tens place any unused digit, zero included ($8$ ways): $4 \\times 8 \\times 8 = 256$.',
          'Hence, $72 + 256 = 328$ three-digit numbers — two disjoint cases, each a shrinking chain, added across the fork. The engines brute-sweep both bands and confirm 41 and 328.',
        ], answer: '41 two-digit; 328 three-digit' },
      ] },
      { level: 'L4', questions: [
        { q: 'Exam-style (Single Correct). A 5-symbol code is written using the digits {1, 2, 3, 4, 5, 6}. The number of codes in which at least one symbol repeats is: (A) 7776 (B) 720 (C) 7056 (D) 46656. Find the answer with full reasoning.', solution: [
          'The universe: five free stages, each over the 6 digits — WITH repetition, $6^5 = 7776$ codes.',
          'So, the all-distinct side: a shrinking chain, $6 \\times 5 \\times 4 \\times 3 \\times 2 = 720$ codes.',
          'Hence, at least one repeat is the complement: $7776 - 720 = 7056$ — option (C).',
          'Note, the distractors: (A) is the raw total with the subtraction forgotten; (B) is the subtrahend reported as the answer; (D) is $6^6$, a six-stage power pasted onto a five-stage question — each distractor is a mispriced piece of the same machine.',
        ], answer: '(C) 7056' },
        { q: 'Exam-style (Multiple Correct). Which of the following counts are computed correctly? (A) A 4-question quiz with 3 options each, answers freely repeated: $3^4 = 81$ patterns. (B) A fork between 5 red buses and 6 blue buses on distinct routes: 11 ways to board one bus. (C) A playlist listing 5 rock tracks and 6 jazz tracks, with 2 tracks double-listed: 9 distinct tracks. (D) A two-leg journey with 3 roads on leg one and 4 on leg two: $3 + 4 = 7$ routes. Identify every true statement.', solution: [
          '(A) is TRUE: four free stages over 3 options — the with-repetition census $3^4 = 81$.',
          '(B) is TRUE: a disjoint OR-fork (no bus serves both colours) — $5 + 6 = 11$.',
          '(C) is TRUE: the fork overlaps, so the overlap returns — $5 + 6 - 2 = 9$ distinct tracks.',
          '(D) is FALSE: the legs are AND-joined — $3 \\times 4 = 12$ routes, not $7$; the addition rule was pasted onto a chain.',
          'Hence, (A), (B) and (C) hold; only the chain-priced-as-a-fork (D) fails — the two rules swapped.',
        ], answer: '(A), (B) and (C) are true; (D) is false — the journey is a chain: 12 routes' },
        { q: 'Exam-style (Linked Comprehension). A signal mast flies a vertical stack of distinct flags chosen from 5 different flags; the top-to-bottom order matters. (i) Count the 2-flag signals. (ii) Count the 3-flag signals. (iii) Count the signals of exactly 2 or 3 flags.', solution: [
          '(i) A two-stage without-repetition chain: top flag $5$ ways, bottom flag $4$ — $5 \\times 4 = 20$ signals.',
          '(ii) Three stages: $5 \\times 4 \\times 3 = 60$ signals.',
          '(iii) The 2-flag and 3-flag families are disjoint (a signal has exactly one length), so they add: $20 + 60 = 80$ signals.',
          'Hence, $20$ / $60$ / $80$ — chains within each family, the addition rule across families; the at-least-2-flags version that also flies the 4- and 5-flag families is 6.3\u2019s business once factorials compress it.',
        ], answer: '(i) 20; (ii) 60; (iii) 80' },
      ] },
      { level: 'L5', questions: [
        { q: 'A system label is EITHER a single letter (26 available) OR a letter followed by two DIFFERENT digits. Count the labels.', solution: [
          'The two families are disjoint: one symbol versus three — no label is both, so the family counts will add.',
          'So, family one: $26$ single-letter labels.',
          'Family two: letter AND first digit AND second digit, the two digits distinct: $26 \\times 10 \\times 9 = 2340$ labels.',
          'Hence, $26 + 2340 = 2366$ labels — a fork whose arms are themselves chains: both rules, one count.',
        ], answer: '2366 labels' },
        { q: 'A 5-day radio plan picks one of 6 stations each day; no two consecutive days may carry the same station. Count the plans, running the census at 2 days first.', solution: [
          'Census at 2 days: day one $6$ ways, day two any station but day one\u2019s — $5$: $6 \\times 5 = 30$ of the $36$ unconstrained pairs, the $6$ matching pairs deleted.',
          'So, the five-day chain: day one $6$ ways; each later day any of the $5$ stations left once the neighbour\u2019s is fixed: $6 \\times 5^4 = 3750$ plans.',
          'Hence, $3750$ — a chain with repetition allowed in principle but each stage losing exactly the neighbour\u2019s option: the adjacent-restriction shape.',
        ], answer: '3750 plans' },
        { q: 'Count the ordered pairs (x, y) with x and y in {0, 1, …, 9} and |x − y| ≥ 6, by a row-by-row census.', solution: [
          'Census by rows: the rows are disjoint in $x$, so the row counts add across the fork.',
          'So, the row lengths: for $x = 0, 1, 2, 3$ the admissible $y$ run $6\\text{–}9$, $7\\text{–}9$, $8\\text{–}9$, $9$ — lengths $4, 3, 2, 1$; the middle rows $x = 4, 5$ are empty; by mirror symmetry the rows $x = 6, 7, 8, 9$ have lengths $1, 2, 3, 4$.',
          'Now, add the rows: $4 + 3 + 2 + 1 + 0 + 0 + 1 + 2 + 3 + 4 = 20$ ordered pairs.',
          'Hence, 20 — a census of ten disjoint rows, each row a tiny interval count; the engines sweep all 100 pairs and confirm 20.',
        ], answer: '20 ordered pairs' },
      ] },
      { level: 'L6', questions: [
        { q: 'Eight points in the plane, no three collinear. (i) Count the segments joining pairs of points by picking first one endpoint then the other, and repair the double count. (ii) The eight points form a convex octagon; count its diagonals. (iii) Verify the small-case census at the square.', solution: [
          '(i) Ordered picks: first endpoint $8$ ways, second $7$ — $8 \\times 7 = 56$ ordered picks. But the segment $PQ$ is picked as (P, Q) and again as (Q, P): every segment counted exactly twice.',
          'So, repair the double count: $56 \\div 2 = 28$ segments.',
          '(ii) Diagonals: from each vertex the non-side partners number $8 - 3 = 5$ (the vertex itself and its two side-neighbours excluded) — $8 \\times 5 = 40$ ordered non-side picks, each diagonal twice: $40 \\div 2 = 20$ diagonals.',
          '(iii) Census at the square: $4$ points give $4 \\times 3 \\div 2 = 6$ segments, of which $4$ are sides — $6 - 4 = 2$ diagonals, exactly the two an eye can count.',
          'Hence, 28 segments and 20 diagonals — the honest divide-by-two that lesson 6.5 builds into the selection count, where order stops mattering BY DESIGN.',
        ], answer: '28 segments; 20 diagonals (the square census: 6 and 2)' },
        { q: 'A 5-letter string is built from the alphabet {P, Q, R, S}, repetition allowed. (i) Count all strings. (ii) Count the strings with no two adjacent letters equal. (iii) Count the strings with at least one adjacent equal pair. (iv) Say which side the complement priced.', solution: [
          '(i) Five free stages over 4 letters — $4^5 = 1024$ strings, the with-repetition census.',
          '(ii) The adjacent-restriction chain: first letter $4$ ways, each later letter any of the other $3$: $4 \\times 3^4 = 324$ strings.',
          '(iii) At least one adjacent equal pair — the complement of (ii) inside (i): $1024 - 324 = 700$ strings.',
          '(iv) The complement priced the at-least-one side from the no-adjacent-equal side — total minus bad, equation (8); the engines brute-list all 1024 strings and confirm both sides.',
          'Hence, $1024$ / $324$ / $700$ — the free census, its adjacent-restricted twin, and the subtraction between them: the whole lesson in one alphabet.',
        ], answer: '1024 strings; 324 with no adjacent equal pair; 700 with at least one' },
      ] },
    ] },
  ],
}


/* ------------------------------------------------------------------ */
/* figures for lesson 6.1 — the route tree of the journey exhibit, and  */
/* the two box-chains of the repetition divide (vivid palette only)     */
/* ------------------------------------------------------------------ */

function routeTreeSvg(): string {
  // the route tree: Ashvale (x=95) -> 3 trails -> Beacon (x=330) -> 4 roads
  // -> Harbour (x=545); a fan of 12 leaf dots at x=652 marks the journeys,
  // one dot per trail-and-road pairing (the cartesian product in miniature)
  const leafY = (i: number): number => 44 + 24 * i
  const leaves = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    .map((i) => `<line x1="566" y1="170" x2="648" y2="${leafY(i)}" stroke="#d97706" stroke-width="1.1"/><circle cx="652" cy="${leafY(i)}" r="4.5" fill="#ea580c"/>`)
    .join('')
  const stations = [
    { x: 95, name: 'Ashvale' },
    { x: 330, name: 'Beacon' },
    { x: 545, name: 'Harbour' },
  ]
    .map((s) => `<circle cx="${s.x}" cy="170" r="20" fill="#fef3c7" stroke="#16a34a" stroke-width="2.4"/><text x="${s.x}" y="207" font-size="11" font-weight="700" text-anchor="middle" fill="#166534">${s.name}</text>`)
    .join('')
  return `<svg viewBox="0 0 720 350" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The route tree exhibit: three stations Ashvale, Beacon and Harbour. Three curves labelled trail 1, trail 2 and trail 3 run from Ashvale to Beacon; four curves labelled road 1 through road 4 run from Beacon to the Harbour. A fan of twelve orange dots at the right marks the twelve possible two-leg journeys, one dot per trail-and-road pairing: three times four equals twelve.">
  <text x="360" y="22" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the route tree: three trails and four roads</text>
  <text x="360" y="42" font-size="11" text-anchor="middle" fill="#0f766e">each trail meets each road: 3 × 4 = 12 two-leg journeys</text>
  <path d="M115,170 Q212,86 310,170" fill="none" stroke="#16a34a" stroke-width="2.2"/>
  <path d="M115,170 Q212,170 310,170" fill="none" stroke="#16a34a" stroke-width="2.2"/>
  <path d="M115,170 Q212,254 310,170" fill="none" stroke="#16a34a" stroke-width="2.2"/>
  <text x="212" y="118" font-size="10" font-weight="700" text-anchor="middle" fill="#166534">trail 1</text>
  <text x="212" y="156" font-size="10" font-weight="700" text-anchor="middle" fill="#166534">trail 2</text>
  <text x="212" y="230" font-size="10" font-weight="700" text-anchor="middle" fill="#166534">trail 3</text>
  <path d="M350,170 Q437,58 525,170" fill="none" stroke="#d97706" stroke-width="2.2"/>
  <path d="M350,170 Q437,118 525,170" fill="none" stroke="#d97706" stroke-width="2.2"/>
  <path d="M350,170 Q437,222 525,170" fill="none" stroke="#d97706" stroke-width="2.2"/>
  <path d="M350,170 Q437,282 525,170" fill="none" stroke="#d97706" stroke-width="2.2"/>
  <text x="437" y="106" font-size="10" font-weight="700" text-anchor="middle" fill="#166534">road 1</text>
  <text x="437" y="136" font-size="10" font-weight="700" text-anchor="middle" fill="#166534">road 2</text>
  <text x="437" y="190" font-size="10" font-weight="700" text-anchor="middle" fill="#166534">road 3</text>
  <text x="437" y="240" font-size="10" font-weight="700" text-anchor="middle" fill="#166534">road 4</text>
  ${stations}
  ${leaves}
  <text x="652" y="336" font-size="9.5" font-weight="700" text-anchor="middle" fill="#0f766e">the 12 journeys</text>
</svg>`
}

function boxChainsSvg(): string {
  // top: the free chain — six stages each holding the full stock of 4
  // (4 × 4 × 4 × 4 × 4 × 4 = 4⁶ = 4096 answer patterns); bottom: the
  // shrinking chain — three stages holding 7, 6, 5 (7 × 6 × 5 = 210 rows,
  // 343 if colours could repeat): the repetition divide at a glance
  const topBoxes = [0, 1, 2, 3, 4, 5]
    .map((i) => {
      const x = 92 + 96 * i
      const cx = x + 31
      return `<rect x="${x}" y="48" width="62" height="54" rx="6" fill="#fef3c7" stroke="#16a34a" stroke-width="2.2"/><text x="${cx}" y="82" font-size="20" font-weight="700" text-anchor="middle" fill="#166534">4</text><text x="${cx}" y="118" font-size="8.5" text-anchor="middle" fill="#65a30d">Q${i + 1}</text>`
    })
    .join('')
  const topTimes = [0, 1, 2, 3, 4]
    .map((i) => `<text x="${170 + 96 * i}" y="80" font-size="13" font-weight="700" text-anchor="middle" fill="#d97706">×</text>`)
    .join('')
  const bottomBoxes = [0, 1, 2]
    .map((i) => {
      const x = 188 + 130 * i
      const cx = x + 42
      return `<rect x="${x}" y="212" width="84" height="54" rx="6" fill="#fef3c7" stroke="#16a34a" stroke-width="2.2"/><text x="${cx}" y="246" font-size="22" font-weight="700" text-anchor="middle" fill="#166534">${['7', '6', '5'][i]}</text><text x="${cx}" y="284" font-size="8.5" text-anchor="middle" fill="#65a30d">place ${i + 1}</text>`
    })
    .join('')
  const bottomTimes = [0, 1]
    .map((i) => `<text x="${295 + 130 * i}" y="244" font-size="13" font-weight="700" text-anchor="middle" fill="#d97706">×</text>`)
    .join('')
  return `<svg viewBox="0 0 720 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two box-chains contrasted. Top: the free chain of the answer sheet — six boxes each holding 4, because with repetition every question keeps all four options: 4 times 4 times 4 times 4 times 4 times 4 equals 4 to the 6th, 4096 patterns. Bottom: the shrinking chain of the display row — three boxes holding 7, 6 and 5, because without repetition each place loses the colour already used: 7 times 6 times 5 equals 210 rows. A note adds that 7 cubed, 343 rows, is what the same stock would give if colours could repeat.">
  <text x="360" y="26" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">with repetition: every stage free — the answer-sheet chain</text>
  ${topBoxes}
  ${topTimes}
  <text x="360" y="142" font-size="10.5" text-anchor="middle" fill="#0f766e">4 × 4 × 4 × 4 × 4 × 4 = 4⁶ = 4096 answer patterns</text>
  <text x="360" y="188" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">without repetition: each stage spends its colour — the display-row chain</text>
  ${bottomBoxes}
  ${bottomTimes}
  <text x="360" y="308" font-size="10.5" text-anchor="middle" fill="#0f766e">7 × 6 × 5 = 210 rows (7³ = 343 if colours could repeat)</text>
</svg>`
}

/**
 * Advanced Algebra — chapter 6, lesson 6.2
 * "Factorials and the Counting Toolkit" (parallel-swarm run, task 6-b).
 *
 * NOTE FOR THE ORCHESTRATOR (paste-time): this part-file lives in
 * scripts/aa-ch06-work/; when pasted into
 * src/data/library/books/mathematics/advanced-algebra/ch-06.ts the type
 * import above must become the chapter file's own
 * `import type { Chapter, Lesson } from '../../../types'` (or join the
 * existing import) — everything else is the chapter's exact Lesson shape.
 *
 * VERIFY-FIRST: the engines were grown green BEFORE this prose was
 * declared done — scripts/aa-ch06-work/v6-2.ts sections C (every number
 * below recomputed by brute force: factorial roster, the two unwinding
 * fractions, the three false-law witnesses, every Legendre exponent
 * audited against a BigInt factorisation of the factorial itself, the
 * composite min reads, the trailing zeros, every nCr identity swept over
 * ranges, the row-of-ten census, every quiz distractor, every exercise
 * answer) and D (the structural pins) — run by
 * `cd /home/z/my-project && bun run scripts/aa-ch06-work/run-62.ts`,
 * which exits 0 only when all checks are green.
 *
 * Ground: the m2-07 module band 7.6–7.7 (Factorial Notation, its results,
 * the three false-law notes, Exponent of Prime in n!, CAE 7.2) + the
 * Properties-of-nCr band 7.14–7.19 (the teaser fold) — STUDY-NEVER-
 * REPRODUCE: every roster, witness, figure, Illustration, quiz item and
 * exercise below is OUR OWN (the module's 32!/100!/130! instances are
 * deliberately NOT reused; the method shapes only — the floor census,
 * the min rule, the ratio-law system — inform the design).
 *
 * HOSTED FOLDS (binding, TOC_FOLD_LEDGER m2-07 entries on this title):
 * "Exponent of Prime in n!" — mode section — served by the named
 * subsection 'The Exponent of Prime in n!: Legendre's Counting Argument'
 * (formal definition callout of E_p(n!), the floor-counting derivation,
 * three worked Illustrations, the tally figure, the census table);
 * "Properties of nCr" — mode section (the TEASER fold) — served by the
 * named subsection 'The Properties of nCr: Factorial Algebra' (formal
 * definition of the nCr fraction, five worked Illustrations, two
 * derivations, the row figure + census table) — 6.5 owns the full
 * selection engine.
 *
 * Lesson census (engine-pinned): 11 Illustrations (the last exam-shaped);
 * 5 derivations; 3 figures (vivid palette only); 3 tables; 10 terms;
 * 6 formula cards; 10 tagged equations; quiz 5 items, keys [2, 3, 0,
 * 2, 1]; exercises 15 in L1–L6 = 2/2/3/3/3/2 with the Cengage exam
 * typology at L4–L6; prerequisites pinned to 6.1
 * aa-the-fundamental-principle-of-counting + ANS 4.2
 * ans-fundamental-theorem-of-arithmetic; sources cengage-m2-07 (banked
 * at close), cengage-jee-style, ncert-math11-ch6-permutations-combinations,
 * jee-main-2026-syllabus, hall-knight-higher-algebra, khattar-qa-4e.
 */
const lesson62: Lesson = {
  id: 'aa-factorials-and-the-counting-toolkit',
  number: '6.2',
  title: 'Factorials and the Counting Toolkit',
  concepts: [
    'factorial notation and the shrinking chain',
    'the recursion law n·(n−1)!',
    'the two unwinding fractions n!/r! and n!/(n−r)!',
    '0! as the empty product',
    'three false factorial laws, refuted by witnesses',
    'the exponent of prime in n! (Legendre)',
    'the composite honesty min rule and trailing zeros',
    'properties of nCr: symmetry, Pascal, ratio law, the middle maximum',
  ],
  objectives: [
    'Define the factorial as the bookkeeping of the shrinking chain of lesson 6.1, run the recursion n! = n·(n−1)! down any roster, and state 0! = 1 as the empty-product consistency it is — never as a decree.',
    'Prove and use the two unwinding fractions — n!/r! as the top n−r factors and n!/(n−r)! as the top r factors of the one chain — always counting factors before multiplying, and read each as a seat-count of the multiplication rule.',
    'Refute the three false laws (m+n)! ≠ m! + n!, (mn)! ≠ m!·n!, (kn)! ≠ k·n! with tiny hand-listed witnesses, and explain structurally why every such shortcut undersells the true value.',
    'Compute the exponent of a prime in n! by Legendre\u2019s floor-counting census — each multiple of p donating one p, each multiple of p² a second — prove the census counts every donation exactly, and price composite powers honestly by the min rule, cross-referencing the trailing-zeros instance ANS 4.3 already banked (cited, never re-taught).',
    'Read the combination symbol nCr = n!/(r!(n−r)!) as factorial algebra and prove its property stack — symmetry, the equality discipline, Pascal\u2019s identity, the ratio law, the middle maximum, k! divisibility of consecutive runs, p | pCr — by algebra here, as the groundwork lesson 6.5 re-reads as selection facts.',
    'Solve factorial equations and row equations at exam speed by unwinding: recursion hunts like (n+2)! = 42·n!, equality-discipline reads like nC12 = nC8, and ratio systems like the symmetric 56/70/56 triple.',
    'Name where every tool is cashed — 6.3\u2019s arrangements, 6.5\u2019s selections, 6.6\u2019s distributions, chapter 7\u2019s binomial coefficients — and the Probability ground this chapter\u2019s counted universe hands forward.',
  ],
  prerequisites: ['aa-the-fundamental-principle-of-counting', 'ans-fundamental-theorem-of-arithmetic'],
  sources: ['cengage-m2-07', 'cengage-jee-style', 'ncert-math11-ch6-permutations-combinations', 'jee-main-2026-syllabus', 'hall-knight-higher-algebra', 'khattar-qa-4e'],
  blocks: [
    { kind: 'para', text: 'Lesson 6.1, "The Fundamental Principle of Counting", ended with chains that shrink. Filling four seats from nine distinct objects is a chain of independent choices — nine ways, then eight, then seven, then six — and the multiplication rule multiplies along it: $9 \\cdot 8 \\cdot 7 \\cdot 6 = 3024$. Filling all six seats from six is the same machine at full length: $6 \\cdot 5 \\cdot 4 \\cdot 3 \\cdot 2 \\cdot 1 = 720$. Every chain in that lesson manufactured some slice of one and the same object — a descending product of consecutive integers — and a count this central cannot stay anonymous. This lesson names it, builds its algebra, and polices its misuse: the factorial as bookkeeping, the recursion that unwinds it, the two fractions that cut it, the false laws that counterfeit it, and (in the two hosted sections below) the exact census of any prime hiding inside it and the algebra of the combination symbol the rest of the chapter leans on.' },
    { kind: 'para', text: 'The plan, in order: factorial notation and the recursion, with $0! = 1$ earned honestly; the two unwinding fractions $\\tfrac{n!}{r!}$ and $\\tfrac{n!}{(n-r)!}$ — the toolkit\u2019s two quotients, each read back as a seat-count of 6.1\u2019s principle; the three false laws, each killed by a witness small enough to check by hand; then the first hosted section, the Exponent of Prime in $n!$ — Legendre\u2019s formula as a counting argument, with the composite honesty it forces and the trailing-zeros instance ANS 4.3 already banked; then the second hosted section, the Properties of ${}^{n}C_r$ — the teaser fold: the symbol defined here as factorial algebra, its property stack proved by algebra, and its full selection engine deliberately left for lesson 6.5. Every number below was recomputed by this lesson\u2019s engines before a word of prose was fixed.' },

    { kind: 'heading', text: 'Factorial Notation: the Shrinking Chain Named' },
    { kind: 'para', text: 'Why does the shrinking product deserve a symbol at all? Because it refuses to stay a local convenience. The chain $8 \\cdot 7 \\cdot 6$ prices three seats from eight objects; the chain $6 \\cdot 5 \\cdot 4 \\cdot 3 \\cdot 2 \\cdot 1$ prices six seats from six; the fraction work below will need the tail of one chain, the head of another, and the exact count of primes inside the whole product — all of it the one object, sliced. Give it a name and the bookkeeping becomes algebra.' },
    { kind: 'callout', tone: 'definition', title: 'Factorial', text: 'For a positive integer $n$, the FACTORIAL of $n$, written $n!$ and read "factorial $n$", is said to be the product of all the integers from 1 up to $n$: $n! = 1 \\cdot 2 \\cdot 3 \\cdots (n-1) \\cdot n$. Thus, $5! = 1 \\cdot 2 \\cdot 3 \\cdot 4 \\cdot 5 = 120$ and $6! = 720$. The product over an EMPTY list of factors — the empty product — is 1, so $0! = 1$; the honesty of that convention is priced two paragraphs down. The notation\u2019s own history rides in the historical note below.' },
    { kind: 'equation', latex: 'n! = 1 \\cdot 2 \\cdot 3 \\cdots (n-1) \\cdot n = n \\cdot (n-1)!, \\qquad 0! = 1 \\tag{1}', note: 'the factorial of n — the running product of every integer up to n; the recursion splits off the top factor, and the empty product sets 0! = 1.' },
    { kind: 'para', text: 'For example, on the roster every later lesson of this chapter leans on (each value recomputed by the engines before this prose was written):' },
    { kind: 'list', marker: 'roman', items: [
      '(i) $0! = 1$ — the empty product, the convention the recursion is about to force;',
      '(ii) $1! = 1$, $2! = 2$, $3! = 6$, $4! = 24$ — the climb begins gently;',
      '(iii) $5! = 120$, $6! = 720$, $7! = 5040$ — and accelerates hard;',
      '(iv) $10! = 3628800 = 2^8 \\cdot 3^4 \\cdot 5^2 \\cdot 7$ — the audit roster: its prime census is exactly what the hosted section below learns to price without expanding anything.',
    ] },
    { kind: 'figure', caption: 'The shrinking chain of lesson 6.1 as bookkeeping: six seats, each filled in one way fewer than the last — 6, 5, 4, 3, 2, 1 — with the running product climbing underneath: 6, 30, 120, 360, 720, 720, reaching its final value 6! = 720 exactly when the last seat is filled. The badge reads the same product from its top: 6! = 6 × 5! = 6 × 120 — remove the first seat and the remaining product is exactly the factorial of the shortened chain. Filling all six seats is the multiplication rule\u2019s full-length product 6·5·4·3·2·1 = 720.', svg: shrinkingChainSvg() },
    { kind: 'para', text: 'The recursion $n! = n \\cdot (n-1)!$ is not a new fact — it is the definition\u2019s own bookkeeping read from its top end: the product of every integer up to $n$ is the product of every integer up to $n-1$, times $n$ itself. Unwound twice, $n! = n(n-1) \\cdot (n-2)!$; unwound all the way down, $n! = n(n-1)(n-2) \\cdots 2 \\cdot 1 \\cdot 0!$ — and there the convention must pay its rent. Fill ALL $n$ seats from $n$ objects: the count of full-length orders is the whole product, and the bookkeeping fraction $\\tfrac{n!}{(n-n)!}$ must return exactly $n!$, which forces $\\tfrac{n!}{0!} = n!$, that is $0! = 1$. The empty product is not a decree; it is the only value that keeps the fraction algebra continuous with the counting it records.' },
    { kind: 'callout', tone: 'insight', title: '0! = 1 is consistency, not caprice', text: 'A product over no factors must be the multiplicative identity 1 — exactly as a sum over no terms is the additive identity 0, the empty-sum convention behind every honest telescoping in chapter 5. The seat-read forces the same value from the other side: filling all n seats has n! orders, and the fraction n!/(n − n)! must return that count, so 0! = 1. And the recursion polices it in both directions: $1! = 1 \\cdot 0!$ must equal 1, which pins 0! = 1 from below. Declare 0! = 0 instead and the whole ladder 1!, 2!, 3!, … collapses to zero — the convention is load-bearing.' },
    { kind: 'derivation', title: 'The recursion law and the two unwinding fractions', statement: 'For positive integers $n$ and $r$ with $r \\leq n$: the factorial obeys the recursion $n! = n \\cdot (n-1)!$, and the two fractions unwind as $\\tfrac{n!}{r!} = (r+1)(r+2) \\cdots n$ (the top $n - r$ factors) and $\\tfrac{n!}{(n-r)!} = n (n-1) \\cdots (n-r+1)$ (the top $r$ factors).', steps: [
      { label: 'Write the product forwards', formula: 'n! = 1 \\cdot 2 \\cdots r \\cdots (n-r) \\cdots (n-1) \\cdot n', explanation: 'The definition read from its small end: the running product of every integer from 1 to n. Both fractions below are this one product with a head cancelled — nothing deeper enters.' },
      { label: 'Split off the top factor', formula: 'n! = \\left( 1 \\cdot 2 \\cdots (n-1) \\right) \\cdot n = (n-1)! \\cdot n', explanation: 'The bracket is itself a factorial — the product of every integer up to $n-1$. This IS the recursion: each factorial is its predecessor times its own top number. Unwound twice: $n! = n(n-1) \\cdot (n-2)!$, and so on down to the $0! = 1$ floor.' },
      { label: 'Cancel the tail', formula: '\\dfrac{n!}{r!} = \\dfrac{1 \\cdot 2 \\cdots r \\cdot (r+1) \\cdots n}{1 \\cdot 2 \\cdots r} = (r+1)(r+2) \\cdots n', explanation: 'The bottom $r!$ cancels the first $r$ factors, leaving the TOP $n - r$ factors — a product that starts at $r + 1$ and climbs to $n$. Count before multiplying: at $n = 8$, $r = 5$ that is $6 \\cdot 7 \\cdot 8$, three factors, 336.' },
      { label: 'Cancel the complement tail', formula: '\\dfrac{n!}{(n-r)!} = \\dfrac{1 \\cdot 2 \\cdots (n-r) \\cdot (n-r+1) \\cdots n}{1 \\cdot 2 \\cdots (n-r)} = n(n-1) \\cdots (n-r+1)', explanation: 'Now the bottom cancels the first $n - r$ factors, leaving the TOP $r$ factors — the product that starts at $n$ and falls: $n,\\ n-1,\\ \\ldots,\\ n-r+1$. This is the shrinking chain of lesson 6.1 with exactly $r$ seats — lesson 6.3 names it ${}^{n}P_r$.' },
      { label: 'Read both as windows on one chain', formula: '\\dfrac{n!}{r!} = (r+1) \\cdots n \\quad (n - r \\text{ factors}), \\qquad \\dfrac{n!}{(n-r)!} = n \\cdots (n-r+1) \\quad (r \\text{ factors})', explanation: 'The two fractions are two window lengths onto the same falling product: the first keeps its LAST $n - r$ factors (read from the bottom up: $r+1$ through $n$), the second keeps its FIRST $r$ factors (read from the top down). They are the same fraction exactly when $r = n - r$; otherwise they count different lengths of the one chain.' },
    ], result: '$n! = n \\cdot (n-1)!$ — the recursion; $\\qquad$ $\\tfrac{n!}{r!} = (r+1)(r+2) \\cdots n$ — the top $n-r$ factors; $\\qquad$ $\\tfrac{n!}{(n-r)!} = n(n-1) \\cdots (n-r+1)$ — the top $r$ factors' },
    { kind: 'equation', latex: '\\dfrac{n!}{r!} = (r+1)(r+2) \\cdots (n-1) \\cdot n \\quad (n - r \\text{ factors}) \\tag{2}', note: 'the first unwinding fraction — the tail of the chain cancelled, the top n − r factors kept.' },
    { kind: 'equation', latex: '\\dfrac{n!}{(n-r)!} = n (n-1) (n-2) \\cdots (n-r+2)(n-r+1) \\quad (r \\text{ factors}) \\tag{3}', note: 'the second unwinding fraction — the chain of r seats at full width; lesson 6.3 cashes it as nPr.' },
    { kind: 'example', title: 'Run the recursion down the roster: verify each factorial against its predecessor and close the chain at 0! = 1', steps: [
      'The recursion checks, top down: $7! = 5040 = 7 \\cdot 720 = 7 \\cdot 6!$; $6! = 720 = 6 \\cdot 120 = 6 \\cdot 5!$; $5! = 120 = 5 \\cdot 24 = 5 \\cdot 4!$; $4! = 24 = 4 \\cdot 6 = 4 \\cdot 3!$.',
      'The pattern is the definition\u2019s own bookkeeping — each row is its predecessor times its own top factor, so the roster $1, 1, 2, 6, 24, 120, 720, 5040$ rebuilds itself from the single seed $0! = 1$.',
      'The consistency at the floor: $1! = 1 \\cdot 0! = 1$, so $0! = 1$ — the empty product earning its keep on the very first rung, exactly as the insight note promised.',
      'Hence, the whole roster is one recursion anchored at $0! = 1$ — and every factorial equation in this lesson is solved by unwinding exactly this ladder, never by expanding a factorial by hand.',
    ] },
    { kind: 'example', title: 'Count factors before multiplying: evaluate 8!/5! and 8!/(8 − 5)!, and read each as a seat-count', steps: [
      'The first fraction: the bottom $5!$ cancels the factors 1 through 5, leaving the TOP $8 - 5 = 3$ factors — $6 \\cdot 7 \\cdot 8 = 336$.',
      'The second: $\\tfrac{8!}{(8-5)!} = \\tfrac{8!}{3!}$ cancels 1 through 3, leaving the top $r = 5$ factors — $4 \\cdot 5 \\cdot 6 \\cdot 7 \\cdot 8 = 6720$ (raw check: $40320 / 6 = 6720$).',
      'The seat-reads: 336 fills three seats from eight objects — the chain $8 \\cdot 7 \\cdot 6$ of lesson 6.1\u2019s multiplication rule; 6720 fills five — $8 \\cdot 7 \\cdot 6 \\cdot 5 \\cdot 4$. Lesson 6.3 names these two chains ${}^{8}P_3$ and ${}^{8}P_5$.',
      'Hence, $\\tfrac{8!}{5!} = 336$ and $\\tfrac{8!}{3!} = 6720$ — two window lengths onto the one falling chain; the discipline is counting factors BEFORE multiplying, never expanding $40320$ by hand.',
    ] },
    { kind: 'formula', name: 'The factorial and its recursion', latex: 'n! = n \\cdot (n-1)!, \\qquad 0! = 1', note: 'the running product of the integers up to n; each factorial is its predecessor times its own top factor, and the empty product is the multiplicative identity.' },
    { kind: 'formula', name: 'The two unwinding fractions', latex: '\\dfrac{n!}{r!} = (r+1)(r+2) \\cdots n; \\qquad \\dfrac{n!}{(n-r)!} = n(n-1) \\cdots (n-r+1)', note: 'the top n − r factors and the top r factors of the one chain — count factors before multiplying; lesson 6.3 cashes the second as nPr.' },
    { kind: 'callout', tone: 'historical', title: 'Christian Kramp, 1808: the exclamation gets its job', text: 'The notation is younger than the object. Christian Kramp, of Strasbourg, introduced the exclamation mark for this product in his 1808 Élémens d\u2019arithmétique universelle; earlier writers used a left-siding bracket bundle or simply spelled products out. The name Kramp wanted was "factorielle" — and the symbol won on printability: one stroke, unmistakable, and room beside it for the superscripts and subscripts this chapter is about to hang on it. The counting depth came from the same year\u2019s theory: Adrien-Marie Legendre\u2019s Essai sur la théorie des nombres (1808) already carried the prime-exponent census of $n!$ — the hosted section below rebuilds it as a counting argument rather than quoting it.' },

    { kind: 'heading', text: 'Three False Laws, Refuted by Hand' },
    { kind: 'para', text: 'The factorial grows so fast that every shortcut dreamed up around it is wrong, and the damage concentrates in three fevers: a distributive fever ("factorials split over sums"), a multiplicative fever ("they split over products"), and a scaling fever ("a constant inside becomes a constant outside"). All three fail, and all three fail VISIBLY — each is killed by a witness small enough to list by hand, which is this chapter\u2019s small-case census discipline doing its cheapest work: before trusting any manipulation of a factorial, run it on numbers you can expand in your head.' },
    { kind: 'callout', tone: 'warn', title: 'The three false laws', text: 'For positive integers $m, n, k$: $(m+n)! \\neq m! + n!$ — factorials do not distribute over sums; $(mn)! \\neq m! \\cdot n!$ — they do not split over products; $(kn)! \\neq k \\cdot n!$ — a constant INSIDE the argument does not become a constant OUTSIDE it. Each is refuted by a two-line witness below. Memorise the refutations, not just the verdicts — the witness is what you re-derive under exam pressure.' },
    { kind: 'example', title: 'Refute all three false laws with hand-listed witnesses', steps: [
      'The distributive fever, witness $m = 3$, $n = 4$: the left side $(3+4)! = 7! = 5040$; the right side $3! + 4! = 6 + 24 = 30$ — and $5040 \\neq 30$.',
      'The multiplicative fever, witness $m = 2$, $n = 4$: the left side $(2 \\cdot 4)! = 8! = 40320$; the right side $2! \\cdot 4! = 2 \\cdot 24 = 48$ — off by three orders of magnitude.',
      'The scaling fever, witness $k = 3$, $n = 2$: the left side $(3 \\cdot 2)! = 6! = 720$; the right side $3 \\cdot 2! = 6$ — the constant compounds inside the argument; outside it would merely scale.',
      'Hence, all three laws are dead, each on one witness — a single computed pair of numbers standing in for a proof of failure, the census discipline at its cheapest.',
    ] },
    { kind: 'table', caption: 'The three false laws and their hand witnesses — every cell recomputed by the engines before this prose was written. The left side is always the honest factorial of the combined argument; the right side is the shortcut\u2019s offer, and the gap is what the shortcut undersells.', head: ['Claimed shortcut', 'Tiny witness', 'Left side (honest)', 'Right side (shortcut)', 'Verdict'], rows: [
      ['$(m+n)! = m! + n!$', '$m = 3,\\ n = 4$', '$7! = 5040$', '$3! + 4! = 30$', 'false — $5040 \\neq 30$'],
      ['$(mn)! = m! \\cdot n!$', '$m = 2,\\ n = 4$', '$8! = 40320$', '$2! \\cdot 4! = 48$', 'false — $40320 \\neq 48$'],
      ['$(kn)! = k \\cdot n!$', '$k = 3,\\ n = 2$', '$6! = 720$', '$3 \\cdot 2! = 6$', 'false — $720 \\neq 6$'],
    ] },
    { kind: 'para', text: 'Why does every shortcut undersell, and always in the same direction? The first unwinding fraction makes the structure readable: $(m+n)! = m! \\cdot (m+1)(m+2) \\cdots (m+n)$ — the factorial of the sum is $m!$ times the top $n$ factors of the $(m+n)$-chain. Each cross-factor $m + i$ beats the corresponding factor $i$ of $n!$, so $(m+n)! > m! \\cdot n!$, which already dwarfs $m! + n!$; the other two fevers fail for the same structural reason. The honest slogan: the argument of a factorial is a SEAT-COUNT, and seat-counts do not add, multiply or scale into seat-counts of the same shape — the chain, not the arithmetic of the arguments, is the object.' },

    { kind: 'heading', text: 'The Exponent of Prime in n!: Legendre\u2019s Counting Argument' },
    { kind: 'para', text: 'The toolkit\u2019s first genuine theorem answers a question the prerequisite ground makes well-posed: by the Fundamental Theorem of Arithmetic — ANS 4.2\u2019s unique prime factorisation — every factorial has exactly one prime decomposition, so "how many $p$\u2019s live in $n!$?" is a definite number, not a matter of luck. It matters because factorials sit under every count this chapter builds, and the divisibility questions examinations actually ask are all of this shape: how many zeros end $45!$? What is the largest power of 12 that divides $40!$? The answer is a census, not a formula to memorise — count the donations, prime by prime — and it carries the name of the man who published it in 1808: Adrien-Marie Legendre.' },
    { kind: 'callout', tone: 'definition', title: 'The exponent of a prime in n!', text: 'For a prime $p$ and a positive integer $n$, let $E_p(n!)$ be said to be the EXPONENT of the largest power of $p$ that divides $n!$ — the largest whole $e$ with $p^e \\mid n!$, which is exactly the number of copies of $p$ in the prime factorisation of $n!$. Thus, $E_2(6!) = 4$: the engines check $6! = 720 = 2^4 \\cdot 3^2 \\cdot 5$. Legendre\u2019s formula computes it without ever expanding the factorial — by counting donations.' },
    { kind: 'derivation', title: 'Legendre\u2019s formula by floor-counting', statement: 'For a prime $p$ and a positive integer $n$, the exponent of $p$ in $n!$ is $E_p(n!) = \\lfloor n/p \\rfloor + \\lfloor n/p^2 \\rfloor + \\lfloor n/p^3 \\rfloor + \\cdots$ — a finite sum: every floor past the first with $p^i > n$ is zero, so the census closes on its own.', steps: [
      { label: 'Count the first donations', formula: '\\text{multiples of } p \\text{ among } 1, 2, \\ldots, n: \\quad \\lfloor n/p \\rfloor', explanation: 'The factorial is the product $1 \\cdot 2 \\cdots n$; every factor that is a multiple of $p$ donates at least one $p$ to the total. The count of such multiples is the floor $\\lfloor n/p \\rfloor$ — each full block of $p$ consecutive integers contains exactly one multiple, and the floor counts the complete blocks.' },
      { label: 'Count the second donations', formula: '\\text{multiples of } p^2: \\quad \\lfloor n/p^2 \\rfloor', explanation: 'A factor divisible by $p^2$ donates a SECOND $p$ — for instance $36 = 2^2 \\cdot 9$ carries two 2s. It has already been counted once in the first floor; the second floor adds its second donation exactly, without ever counting it twice-or-none.' },
      { label: 'The higher floors likewise', formula: '\\lfloor n/p^3 \\rfloor, \\quad \\lfloor n/p^4 \\rfloor, \\quad \\ldots', explanation: 'A number with exactly $t$ copies of $p$ in its own factorisation appears in the first $t$ floors and in no others — so the sum counts its donation $t$ times, which is exactly right. The census never double-charges and never skips: each floor counts one more copy from precisely the numbers that have it.' },
      { label: 'Sum the donations', formula: 'E_p(n!) = \\lfloor n/p \\rfloor + \\lfloor n/p^2 \\rfloor + \\lfloor n/p^3 \\rfloor + \\cdots', explanation: 'The total exponent of $p$ in $1 \\cdot 2 \\cdots n$ is the sum of the donations of the individual factors — and the floors have now counted each factor\u2019s donation exactly once per copy. Finiteness is structural: once $p^i > n$ the floor is 0, and the powers grow without bound, so only finitely many floors are non-zero.' },
      { label: 'Audit on the opening roster', formula: 'E_2(10!) = \\lfloor 10/2 \\rfloor + \\lfloor 10/4 \\rfloor + \\lfloor 10/8 \\rfloor = 5 + 2 + 1 = 8', explanation: 'Ten numbers: five of them even ($2, 4, 6, 8, 10$ — one 2 each), two divisible by 4 ($4, 8$ — a second 2 each), one divisible by 8 ($8$ — a third). Total 8 — and the roster\u2019s own audit line agrees: $10! = 2^8 \\cdot 14175$. The figure below is this audit drawn.' },
    ], result: '$E_p(n!) = \\lfloor n/p \\rfloor + \\lfloor n/p^2 \\rfloor + \\lfloor n/p^3 \\rfloor + \\cdots$ — the donation census, finite by construction' },
    { kind: 'equation', latex: 'E_p(n!) = \\left\\lfloor \\dfrac{n}{p} \\right\\rfloor + \\left\\lfloor \\dfrac{n}{p^2} \\right\\rfloor + \\left\\lfloor \\dfrac{n}{p^3} \\right\\rfloor + \\cdots \\tag{4}', note: 'Legendre\u2019s formula — the exponent of a prime in n! as a census of the multiples of p, p², p³, … up to n.' },
    { kind: 'figure', caption: 'The donation census drawn for E₂(10!): the ten factors of 10! in their cells, each even one carrying one amber tick (its first donated 2), each multiple of 4 a second, and 8 a third. The tally lines read the floors directly: multiples of 2 — five of them (2, 4, 6, 8, 10); multiples of 4 — two (4, 8); multiples of 8 — one (8). The census closes: E₂(10!) = 5 + 2 + 1 = 8, agreeing with the roster audit 10! = 2⁸ · 14175.', svg: legendreTallySvg() },
    { kind: 'example', title: 'Run the census: find the exponent of 3 in 50!', steps: [
      'The floors: $\\lfloor 50/3 \\rfloor = 16$ — the sixteen multiples $3, 6, \\ldots, 48$; $\\lfloor 50/9 \\rfloor = 5$ — the multiples of 9 ($9, 18, 27, 36, 45$), each donating a second 3; $\\lfloor 50/27 \\rfloor = 1$ — the single multiple of 27, donating a third.',
      'The tail: $3^4 = 81 > 50$, so every later floor is 0 — the census closes at three lines, exactly as the derivation promised.',
      'The total: $E_3(50!) = 16 + 5 + 1 = 22$.',
      'The sibling census for contrast: the same factorial\u2019s 2-side reads $25 + 12 + 6 + 3 + 1 = 47$ — more than twice as many 2s as 3s, the scarcity of larger primes showing already.',
      'Hence, 22 threes live in $50!$ — priced without expanding a single digit of it.',
    ] },
    { kind: 'table', caption: 'The census band for E₃(50!): each power of 3 donates one line — the multiples of 3 give one 3 each, the multiples of 9 a second, the multiple of 27 a third, and the powers past 27 give nothing at all. The total is the donation census of equation (4) run at n = 50, p = 3.', head: ['Power of 3', 'Multiples up to 50', 'Floor count', 'Donation'], rows: [
      ['$3$', '$3, 6, 9, \\ldots, 48$', '$\\lfloor 50/3 \\rfloor = 16$', 'one 3 each'],
      ['$9$', '$9, 18, 27, 36, 45$', '$\\lfloor 50/9 \\rfloor = 5$', 'a second 3'],
      ['$27$', '$27$', '$\\lfloor 50/27 \\rfloor = 1$', 'a third 3'],
      ['$81$', 'none', '$\\lfloor 50/81 \\rfloor = 0$', 'nothing'],
      ['total', '—', '$16 + 5 + 1 + 0$', '$E_3(50!) = 22$'],
    ] },
    { kind: 'para', text: 'Composites are where the census is misused — and the misuse is instructive. The largest power of 6 in $24!$ is NOT $\\lfloor 24/6 \\rfloor + \\lfloor 24/36 \\rfloor + \\cdots = 4 + 0 = 4$: that sum counts only the factors that are multiples of 6 AS WHOLE NUMBERS, and it is blind to the sixes ASSEMBLED from a 2 living in one factor and a 3 in another. The Fundamental Theorem of Arithmetic — the prerequisite ground — is exactly what legalises the honest route: a composite\u2019s power in $n!$ is priced prime-by-prime, and the scarce side binds.' },
    { kind: 'callout', tone: 'theorem', title: 'The composite honesty (the min rule)', text: 'The largest power of $c = p_1^{a_1} p_2^{a_2} \\cdots$ dividing $n!$ is $\\min\\left( \\left\\lfloor E_{p_1}(n!)/a_1 \\right\\rfloor, \\left\\lfloor E_{p_2}(n!)/a_2 \\right\\rfloor, \\ldots \\right)$ — each prime priced by its own Legendre census, the number of complete copies of $c$ limited by the scarcest side. Thus the largest power of $6 = 2 \\cdot 3$ in $24!$ is $\\min(E_2(24!), E_3(24!)) = \\min(22, 10) = 10$ — not the naive 4: six copies assemble across different factors of the roster, and the 3-side, ten strong, binds.' },
    { kind: 'equation', latex: 'E_{p_1^{a_1} \\, p_2^{a_2} \\cdots}(n!) = \\min \\left( \\left\\lfloor \\dfrac{E_{p_1}(n!)}{a_1} \\right\\rfloor, \\ \\left\\lfloor \\dfrac{E_{p_2}(n!)}{a_2} \\right\\rfloor, \\ \\ldots \\right) \\tag{5}', note: 'the composite honesty — price a composite prime-by-prime; the binding side decides. For 10 = 2·5 this single line is the trailing-zeros count.' },
    { kind: 'example', title: 'Price a composite honestly: the largest power of 12 = 2²·3 that divides 40!', steps: [
      'The 2-census: $E_2(40!) = 20 + 10 + 5 + 2 + 1 = 38$ — the multiples of 2, 4, 8, 16, 32 up to 40.',
      'The 3-census: $E_3(40!) = 13 + 4 + 1 = 18$ — the multiples of 3, 9, 27.',
      'Each 12 consumes $2^2$ and one 3: the 2-side allows $\\lfloor 38/2 \\rfloor = 19$ copies, the 3-side allows 18 — the binding side is the 3-side, scarce by one.',
      'Hence, $12^{18}$ is the largest power of 12 dividing $40!$ — while the naive multiples-of-12 census would report $\\lfloor 40/12 \\rfloor = 3$: blind to the thirty-plus twelves whose 2 and 3 were donated by DIFFERENT factors of the roster.',
    ] },
    { kind: 'example', title: 'The trailing zeros of 45! — the min rule at c = 10, cross-checked with the banked ANS 4.3', steps: [
      'A trailing zero is a factor of $10 = 2 \\cdot 5$, so the zeros at the end of $45!$ number exactly $E_{10}(45!) = \\min(E_2(45!),\\ E_5(45!))$.',
      'The censuses: $E_5(45!) = \\lfloor 45/5 \\rfloor + \\lfloor 45/25 \\rfloor = 9 + 1 = 10$; $E_2(45!) = 22 + 11 + 5 + 2 + 1 = 41$.',
      'The binding side: the 5s are the scarce side — $\\min(41, 10) = 10$.',
      'Hence, $45!$ ends in exactly ten zeros — the special case ANS 4.3, "Divisors from DNA: Divisor Counts and Factorial Zeros", priced when it built divisor counts from prime DNA. That lesson owns the divisor engine and this one owns the factorial census; they meet exactly here (cited, never re-taught — run the min rule, never memorise a zeros table).',
    ] },
    { kind: 'equation', latex: 'E_{10}(n!) = \\min\\left( E_2(n!),\\ E_5(n!) \\right) = E_5(n!) \\tag{6}', note: 'the trailing zeros of n! — the 2-census always outruns the 5-census, so the 5-side always binds.' },
    { kind: 'callout', tone: 'warn', title: 'The naive composite census', text: 'Never compute the power of a composite $c$ in $n!$ by flooring $n/c, n/c^2, \\ldots$: that counts only the copies assembled inside SINGLE factors and misses every copy built from primes donated by different factors. In $40!$ it would report $\\lfloor 40/12 \\rfloor = 3$ where the truth is 18 — a sixfold undersell. The honest route is always prime-by-prime: run Legendre per prime, then let the min rule bind.' },
    { kind: 'callout', tone: 'insight', title: 'Why the 2s always outnumber the 5s', text: 'For every $n$: $\\lfloor n/2 \\rfloor \\geq \\lfloor n/5 \\rfloor$, and the same inequality runs down every matching pair of powers — so $E_2(n!) \\geq E_5(n!)$ always, and the zeros of $n!$ are exactly $E_5(n!)$. The scarcity reads cleanly off the census: among any five consecutive integers exactly one is a multiple of 5, while half the whole roster is even. Larger primes are structurally scarcer — which is why, in any composite, it is the largest prime\u2019s side that usually binds.' },
    { kind: 'formula', name: 'Legendre\u2019s exponent formula', latex: 'E_p(n!) = \\lfloor n/p \\rfloor + \\lfloor n/p^2 \\rfloor + \\lfloor n/p^3 \\rfloor + \\cdots', note: 'the donation census of the multiples of p, p squared, p cubed and so on up to n; finite because every floor past p to the i exceeding n is zero.' },
    { kind: 'formula', name: 'The composite honesty and the trailing zeros', latex: 'E_{p_1^{a_1} \\cdots}(n!) = \\min\\left( \\lfloor E_{p_1}(n!)/a_1 \\rfloor, \\ldots \\right), \\qquad E_{10}(n!) = E_5(n!)', note: 'composites priced prime-by-prime with the scarce side binding; the zeros at the end of a factorial are its 5-census, since the 2s always outnumber them.' },

    { kind: 'heading', text: 'The Properties of nCr: Factorial Algebra' },
    { kind: 'para', text: 'The chapter\u2019s second great count gets its symbol here — but only half its meaning, and the split is deliberate. A combination is a SELECTION: the count of ways to choose $r$ objects from $n$ distinct ones when order does not matter, and lesson 6.5, "Combinations: the Selection Count", owns that engine whole — the select-then-arrange two-step, the zero-or-more censuses, the words that make the fraction count. THIS lesson\u2019s business is the groundwork 6.5 builds on: define the symbol ${}^{n}C_r$ as a factorial fraction, then prove its property stack — symmetry, the equality discipline, Pascal\u2019s identity, the ratio law, the middle maximum, and two divisibility reads — by factorial algebra alone. The precedent is the weighted-means teaser of 4.1: the algebra half lives in the earlier lesson, the engine half in the lesson that owns the object.' },
    { kind: 'callout', tone: 'definition', title: 'The combination symbol (factorial algebra)', text: 'For integers $0 \\leq r \\leq n$, the symbol ${}^{n}C_r$ (read "$n$ choose $r$" or "n C r") is said to be the fraction $\\tfrac{n!}{r!\\,(n-r)!}$ — the top $r$ factors of the chain, divided by the $r!$ orders that each $r$-selection carries. Thus, ${}^{8}C_3 = \\tfrac{8 \\cdot 7 \\cdot 6}{3 \\cdot 2 \\cdot 1} = 56$, and (as the symmetry below forces) ${}^{8}C_5 = 56$ as well. The SELECTION meaning — the proof that this fraction counts selections — is lesson 6.5\u2019s engine; here it is a fraction with remarkable algebra.' },
    { kind: 'equation', latex: '{}^{n}C_r = \\dfrac{n!}{r!\\,(n-r)!} = \\dfrac{n(n-1) \\cdots (n-r+1)}{r!} \\tag{7}', note: 'the combination symbol as factorial algebra — the chain of r seats divided by the r! orders of each selection.' },
    { kind: 'example', title: 'Compute 8C3 twice: once by the fraction, once by un-counting the orders', steps: [
      'By the fraction: ${}^{8}C_3 = \\tfrac{8!}{3! \\cdot 5!} = \\tfrac{40320}{6 \\cdot 120} = \\tfrac{40320}{720} = 56$.',
      'By the chain first: the top three factors are $8 \\cdot 7 \\cdot 6 = 336$ — the arrangement count, because each 3-selection carries $3! = 6$ orders ($abc$ and its five rearrangements) — and $336/6 = 56$.',
      'The two routes must agree: the fraction IS the chain with the orders divided out — which is why ${}^{n}C_r \\cdot r!$ always equals the chain of $r$ seats, the identity lesson 6.5 turns into its two-step derivation.',
      'Hence, ${}^{8}C_3 = 56$ — one number, two honest routes, and the second route is precisely the teaser 6.5 cashes in full.',
    ] },
    { kind: 'para', text: 'The first property is free algebra: swap $r$ for $n - r$ in the fraction and the denominator merely swaps its two factors — ${}^{n}C_{n-r} = \\tfrac{n!}{(n-r)!\\,r!} = {}^{n}C_r$. Choosing $r$ objects and rejecting the other $n - r$ are the same act; 6.5 gives that sentence its selection meaning, and the algebra gives it now. The second property is the equality discipline — WHEN can two coefficients of the same row hold the same value? The row climbs to its middle and mirrors down (the ratio law below proves that shape), so a value can repeat only when the seats coincide or mirror: $x = y$, or $x + y = n$. That one-line discipline turns a whole class of exam equations into mental arithmetic.' },
    { kind: 'equation', latex: '{}^{n}C_r = {}^{n}C_{n-r} \\tag{8}', note: 'symmetry — choose r, reject n − r: the same act, one fraction with its denominator swapped.' },
    { kind: 'example', title: 'Use the equality discipline: if nC12 = nC8, find n — then price nC2', steps: [
      'The discipline: two coefficients of one row coincide only at equal or complementary seats — $x = y$ or $x + y = n$ — because the row climbs to its middle and mirrors down (the shape the ratio law proves below).',
      'Here $12 \\neq 8$, so the seats must be complementary: $12 + 8 = n = 20$.',
      'The check: ${}^{20}C_{12} = \\tfrac{20!}{12! \\cdot 8!} = {}^{20}C_{8}$ — the coincidence IS the symmetry identity, seated at $r = 8$.',
      'The follow-up: ${}^{20}C_2 = \\tfrac{20 \\cdot 19}{2} = 190$ — and by symmetry ${}^{20}C_{18} = 190$ too.',
      'Hence, $n = 20$ and ${}^{20}C_2 = 190$ — one discipline line standing in for a scan of twenty-one coefficients.',
    ] },
    { kind: 'callout', tone: 'theorem', title: 'The equality discipline', text: 'For $0 \\leq x, y \\leq n$: ${}^{n}C_x = {}^{n}C_y$ holds exactly when $x = y$ or $x + y = n$ — and never otherwise. The proof rides the row\u2019s shape: by the ratio law the values climb strictly up to the middle seat and fall strictly after it, so a value can repeat only at mirrored seats — and the symmetry ${}^{n}C_r = {}^{n}C_{n-r}$ supplies exactly those mirrors and no others. Witness the pair: ${}^{18}C_8 = {}^{18}C_{10}$ with $8 + 10 = 18$, and ${}^{12}C_7 = {}^{12}C_5$ with $7 + 5 = 12$.', },
    { kind: 'para', text: 'The third property is the one the whole chapter\u2019s architecture runs on. Two adjacent coefficients of one row merge into a single coefficient of the next — Pascal\u2019s identity, the recurrence that builds the triangle bearing Pascal\u2019s name and (in chapter 7) the coefficient engine of the binomial expansion. The proof is one common denominator — pure factorial algebra, no counting needed at this stage; 6.5 re-proves it as an in-or-out split, and both proofs stay true.' },
    { kind: 'derivation', title: 'Pascal\u2019s identity by factorial algebra', statement: 'For $1 \\leq r \\leq n$: ${}^{n}C_r + {}^{n}C_{r-1} = {}^{n+1}C_r$ — two adjacent coefficients of row $n$ merge into one coefficient of row $n+1$.', steps: [
      { label: 'Write both fractions', formula: '{}^{n}C_r + {}^{n}C_{r-1} = \\dfrac{n!}{r!\\,(n-r)!} + \\dfrac{n!}{(r-1)!\\,(n-r+1)!}', explanation: 'The definition, twice. The denominators share the factorials $(r-1)!$ and $(n-r)!$ — the common denominator is $r!\\,(n-r+1)!$, one factor of $r$ and one of $n-r+1$ away from each.' },
      { label: 'Bring to the common denominator', formula: '= \\dfrac{n!\\,(n-r+1)}{r!\\,(n-r+1)!} + \\dfrac{n! \\cdot r}{r!\\,(n-r+1)!}', explanation: 'The first fraction is topped up by $n-r+1$ (multiplying and dividing), the second by $r$: the two missing factors are exactly the ones the common denominator added — bookkeeping, nothing else.' },
      { label: 'Add and factor', formula: '= \\dfrac{n!\\,(n - r + 1 + r)}{r!\\,(n-r+1)!} = \\dfrac{n!\\,(n+1)}{r!\\,(n-r+1)!}', explanation: 'The two numerators combine because they now sit on one denominator — and $n - r + 1 + r$ collapses to $n + 1$, the extra object the next row owns.' },
      { label: 'Recognise the next row', formula: '\\dfrac{(n+1) \\cdot n!}{r!\\,((n+1)-r)!} = {}^{n+1}C_r', explanation: 'The numerator is the recursion\u2019s own unwinding of $(n+1)!$ — equation (1) at $n+1$ — and the denominator is row $n+1$\u2019s: the sum has landed on the coefficient one row down, same seat.' },
      { label: 'Audit on the row that matters', formula: '{}^{8}C_3 + {}^{8}C_4 = 56 + 70 = 126 = {}^{9}C_4', explanation: 'Row 8\u2019s adjacent pair 56 and 70 merges into row 9\u2019s 126 — the very triple the exam-shaped Illustration below resolves from the other direction, and the engines sweep the identity over every row up to $n = 25$.' },
    ], result: '${}^{n}C_r + {}^{n}C_{r-1} = {}^{n+1}C_r$ — one common denominator; $\\qquad$ re-read as an in-or-out selection split in lesson 6.5' },
    { kind: 'equation', latex: '{}^{n}C_r + {}^{n}C_{r-1} = {}^{n+1}C_r \\tag{9}', note: 'Pascal\u2019s identity — the adjacency law of every row; chapter 7 reads it as the coefficient engine of the binomial expansion.' },
    { kind: 'para', text: 'The fourth property prices how a row GROWS — and it is the property the examinations love most, because it builds any row without a single factorial. Consecutive coefficients stand in a one-line ratio; that ratio tells you when the row is climbing, when it flattens, and when it falls; and the answer to "when does it stop climbing" is the middle maximum, the single most-asked row question there is.' },
    { kind: 'derivation', title: 'The ratio law and the middle maximum', statement: 'For $1 \\leq r \\leq n$: the consecutive ratio is $\\tfrac{{}^{n}C_r}{{}^{n}C_{r-1}} = \\tfrac{n-r+1}{r}$; the row climbs while $r < \\tfrac{n+1}{2}$, flattens at the odd middle, and falls after — so the maximum is ${}^{n}C_{\\lfloor n/2 \\rfloor}$, with a twin seat when $n$ is odd.', steps: [
      { label: 'Divide the fractions', formula: '\\dfrac{{}^{n}C_r}{{}^{n}C_{r-1}} = \\dfrac{n!}{r!\\,(n-r)!} \\cdot \\dfrac{(r-1)!\\,(n-r+1)!}{n!}', explanation: 'The definition of each, divided: the $n!$ cancels outright, and the leftover factorials pair off into two tiny quotients.' },
      { label: 'Cancel to one line', formula: '= \\dfrac{(n-r+1)!}{(n-r)!} \\cdot \\dfrac{(r-1)!}{r!} = \\dfrac{n-r+1}{r}', explanation: 'Two one-factor quotients: the first is the new factor the row ADDS on the numerator side ($n - r + 1$), the second is the extra factor of $r$ the denominator picks up. The whole growth of a row is these two numbers racing.' },
      { label: 'Read the sign of growth', formula: '\\text{climbs} \\iff \\dfrac{n-r+1}{r} > 1 \\iff r < \\dfrac{n+1}{2}', explanation: 'The coefficient at seat $r$ beats its predecessor exactly when the numerator-side factor still leads — that is, while $r$ sits below the half-way seat. The race flips exactly at the middle.' },
      { label: 'Locate the peak', formula: '\\max_r {}^{n}C_r = {}^{n}C_{n/2} \\ (n \\text{ even}), \\qquad {}^{n}C_{(n-1)/2} = {}^{n}C_{(n+1)/2} \\ (n \\text{ odd})', explanation: 'When $n$ is even the half-way seat $\\tfrac{n+1}{2}$ is not a whole number: the climb runs through $r = \\tfrac{n}{2}$ and the fall begins after — a unique peak. When $n$ is odd, $r = \\tfrac{n+1}{2}$ IS a seat and the ratio into it is exactly 1 — a flat step, so the two middle seats tie.' },
      { label: 'Audit on the row of ten', formula: '{}^{10}C_4 = 210 \\ \\to\\ {}^{10}C_5 = 252 \\ \\to\\ {}^{10}C_6 = 210', explanation: 'The ratios around the middle: $\\tfrac{6}{5} > 1$ (one more climb into 252) then $\\tfrac{5}{6} < 1$ (the fall) — the peak sits exactly at $r = 5$, and the engines sweep every row up to $n = 25$ to confirm the shape.' },
    ], result: '$\\tfrac{{}^{n}C_r}{{}^{n}C_{r-1}} = \\tfrac{n-r+1}{r}$ — the row climbs past $r < \\tfrac{n+1}{2}$, peaks at the middle, and mirrors down' },
    { kind: 'equation', latex: '\\dfrac{{}^{n}C_r}{{}^{n}C_{r-1}} = \\dfrac{n-r+1}{r} \\tag{10}', note: 'the ratio law — the growth engine of every row; the middle maximum and the twin seats of odd rows ride it.' },
    { kind: 'figure', caption: 'The row of ten as a ramp: the eleven coefficients 10C0 through 10C10 — 1, 10, 45, 120, 210, 252, 210, 120, 45, 10, 1 — as bars of height proportional to value. The row climbs while the ratio (11 − r)/r exceeds 1, peaks at the middle seat r = 5 with 10C5 = 252 (the orange bar), and mirrors down to 10C10 = 1. The staggered amber brackets under the axis join the symmetric partner pairs, which sit at equal heights — 10C2 = 10C8 = 45, 10C3 = 10C7 = 120, 10C4 = 10C6 = 210 — the symmetry identity drawn as mirror brackets; the peak is unique because 10 is even.', svg: rowTenRampSvg() },
    { kind: 'example', title: 'Walk the row of ten by the ratio law: build 10C0 … 10C10 without a factorial and locate the peak', steps: [
      'The seed: ${}^{10}C_0 = 1$ — the empty selection (and by symmetry ${}^{10}C_{10} = 1$).',
      'The walk, by $\\tfrac{{}^{10}C_r}{{}^{10}C_{r-1}} = \\tfrac{11 - r}{r}$: $\\times \\tfrac{10}{1} \\to 10$; $\\times \\tfrac{9}{2} \\to 45$; $\\times \\tfrac{8}{3} \\to 120$; $\\times \\tfrac{7}{4} \\to 210$; $\\times \\tfrac{6}{5} \\to 252$.',
      'Past the middle the ratios invert: $\\times \\tfrac{5}{6} \\to 210$; $\\times \\tfrac{4}{7} \\to 120$; $\\times \\tfrac{3}{8} \\to 45$; $\\times \\tfrac{2}{9} \\to 10$; $\\times \\tfrac{1}{10} \\to 1$ — the row mirrors itself exactly, as symmetry demanded all along.',
      'The peak: the ratios exceed 1 through $r = 5$ and drop below after — ${}^{10}C_5 = 252$ is the maximum, with the twin neighbours ${}^{10}C_4 = {}^{10}C_6 = 210$ one step off.',
      'Hence, the row is $1, 10, 45, 120, 210, 252, 210, 120, 45, 10, 1$ — eleven coefficients, zero factorials, one ratio at a time; the same walk builds any row, and 6.5 re-reads it as the selection census of a ten-object roster.',
    ] },
    { kind: 'table', caption: 'The row-of-ten census behind the ramp figure: every coefficient built by the ratio law, the ratio that produced it, and the verdict at each seat. The row climbs through r = 5, peaks at 252, and mirrors down — every value recomputed by the engines before this prose was written.', head: ['Seat $r$', '${}^{10}C_r$', 'Ratio in $\\tfrac{11-r}{r}$', 'Verdict'], rows: [
      ['$0$', '$1$', '—', 'the empty selection'],
      ['$1$', '$10$', '$\\tfrac{10}{1} = 10$', 'climbing'],
      ['$2$', '$45$', '$\\tfrac{9}{2} = 4.5$', 'climbing'],
      ['$3$', '$120$', '$\\tfrac{8}{3} \\approx 2.67$', 'climbing'],
      ['$4$', '$210$', '$\\tfrac{7}{4} = 1.75$', 'climbing'],
      ['$5$', '$252$', '$\\tfrac{6}{5} = 1.2$', 'the peak'],
      ['$6$', '$210$', '$\\tfrac{5}{6} \\approx 0.83$', 'falling'],
      ['$7$', '$120$', '$\\tfrac{4}{7} \\approx 0.57$', 'falling'],
      ['$8$', '$45$', '$\\tfrac{3}{8} = 0.375$', 'falling'],
      ['$9$', '$10$', '$\\tfrac{2}{9} \\approx 0.22$', 'falling'],
      ['$10$', '$1$', '$\\tfrac{1}{10} = 0.1$', 'the mirror of $r = 0$'],
    ] },
    { kind: 'para', text: 'The property stack closes with two divisibility reads — facts the fraction hands over for free, which examinations state as number-theory surprises. The first: the product of any $k$ consecutive integers is divisible by $k!$ (so no run of consecutive integers is ever "prime-shaped" past its first). The second: for a prime $p$, every interior coefficient of row $p$ is a multiple of $p$. Both are one-liners once the fraction is on the page — and both get re-read with selection meanings in 6.5.' },
    { kind: 'derivation', title: 'Two divisibility reads: runs of consecutive integers and prime rows', statement: 'Two divisibility facts the fraction donates: for any positive integers $m$ and $k$, $k!$ divides the run $m(m+1) \\cdots (m+k-1)$, with cofactor ${}^{m+k-1}C_k$; and for a prime $p$, $p \\mid {}^{p}C_r$ for every $1 \\leq r \\leq p-1$.', steps: [
      { label: 'Write the run as a fraction', formula: 'm (m+1) \\cdots (m+k-1) = \\dfrac{(m+k-1)!}{(m-1)!}', explanation: 'A run of $k$ consecutive integers starting at $m$ telescopes into the second unwinding fraction — the chain of $k$ seats from $m + k - 1$ objects, equation (3) with $n = m+k-1$ and $r = k$.' },
      { label: 'Force the combination out', formula: '\\dfrac{(m+k-1)!}{(m-1)!\\,k!} = {}^{m+k-1}C_{k} \\in \\mathbb{Z}', explanation: 'Insert the factor $k!$ into the denominator: the quotient is exactly the combination symbol — and a combination is a COUNT of selections (6.5\u2019s engine, arriving), so it is a whole number. Hence $k!$ divides the run, cofactor on display.' },
      { label: 'Clear the prime row', formula: 'p! = {}^{p}C_r \\cdot r! \\cdot (p-r)!', explanation: 'Multiply the definition of ${}^{p}C_r$ by its denominator: an exact factorisation of $p!$ — the same clearing move every factorial fraction in this lesson teaches.' },
      { label: 'Apply Euclid\u2019s lemma', formula: 'p \\mid p! \\ \\Rightarrow\\ p \\mid {}^{p}C_r \\cdot r! \\cdot (p-r)! \\ \\Rightarrow\\ p \\mid {}^{p}C_r', explanation: 'A prime dividing a product divides one of its factors — Euclid\u2019s lemma, the ground ANS 4.2 built the Fundamental Theorem on. But $p$ cannot divide $r!$ or $(p-r)!$: every factor inside both is a positive integer smaller than $p$, and if $p$ divided such a product it would divide one of those smaller numbers — impossible. So it must divide the combination.' },
      { label: 'Audit both reads', formula: '7 \\cdot 8 \\cdot 9 \\cdot 10 \\cdot 11 = 55440 = 5! \\cdot 462, \\qquad 7 \\mid {}^{7}C_3 = 35', explanation: 'The run of five consecutive integers divides by $120$ with cofactor $462 = {}^{11}C_5$ — the combination the algebra predicted — and the prime row of 7 hands its third-seat coefficient to 7 outright.' },
    ], result: '$k! \\mid m(m+1) \\cdots (m+k-1)$ — cofactor ${}^{m+k-1}C_{k}$; $\\qquad$ $p \\mid {}^{p}C_r$ for prime $p$, $1 \\leq r \\leq p-1$' },
    { kind: 'example', title: 'Cash the divisibility reads: 5! divides 7·8·9·10·11, and the prime rows hand over their interiors', steps: [
      'The run: $7 \\cdot 8 \\cdot 9 \\cdot 10 \\cdot 11 = 55440$, and $55440 / 120 = 462$ — so $5!$ divides the run, cofactor 462.',
      'The cofactor is a combination: $462 = {}^{11}C_5$ — the derivation\u2019s read at $m = 7$, $k = 5$: every run of $k$ consecutive integers is $k!$ times a combination, always.',
      'The prime rows: ${}^{7}C_3 = 35 = 7 \\cdot 5$ and ${}^{11}C_4 = 330 = 11 \\cdot 30$ — the prime hands every interior coefficient of its own row to itself.',
      'Hence, both divisibility reads cash on one line each — the fraction\u2019s structure donating number theory for free, with the selection meanings waiting in 6.5.',
    ] },
    { kind: 'para', text: 'From the above discussion, the property stack of the row — each line an algebraic identity proved in this lesson, each carrying its own verified instance:' },
    { kind: 'list', items: [
      'Symmetry: ${}^{n}C_r = {}^{n}C_{n-r}$ — witness ${}^{10}C_2 = {}^{10}C_8 = 45$.',
      'The equality discipline: ${}^{n}C_x = {}^{n}C_y$ forces $x = y$ or $x + y = n$ — witness ${}^{18}C_8 = {}^{18}C_{10}$ with $8 + 10 = 18$.',
      'Pascal\u2019s identity: ${}^{n}C_r + {}^{n}C_{r-1} = {}^{n+1}C_r$ — witness $56 + 70 = 126 = {}^{9}C_4$.',
      'The ratio law: $\\tfrac{{}^{n}C_r}{{}^{n}C_{r-1}} = \\tfrac{n-r+1}{r}$ — witness $\\tfrac{252}{210} = \\tfrac{6}{5} = \\tfrac{10-5+1}{5}$.',
      'The middle maximum: the peak is ${}^{n}C_{\\lfloor n/2 \\rfloor}$, twin seats when $n$ is odd — witness ${}^{10}C_5 = 252$ and ${}^{9}C_4 = {}^{9}C_5 = 126$.',
      'Runs divide: $k! \\mid m(m+1) \\cdots (m+k-1)$ — witness $3 \\cdot 4 \\cdot 5 \\cdot 6 \\cdot 7 \\cdot 8 = 20160 = 6! \\cdot 28$.',
      'Prime rows: $p \\mid {}^{p}C_r$ for prime $p$, $1 \\leq r \\leq p-1$ — witness $7 \\mid 35$ and $11 \\mid 330$.',
    ] },
    { kind: 'formula', name: 'The combination fraction', latex: '{}^{n}C_r = \\dfrac{n!}{r!\\,(n-r)!} = \\dfrac{n(n-1) \\cdots (n-r+1)}{r!}', note: 'the chain of r seats divided by the r! orders of each selection — factorial algebra here; the selection engine and its meaning are lesson 6.5\u2019s.' },
    { kind: 'formula', name: 'The property stack of a row', latex: '{}^{n}C_r = {}^{n}C_{n-r}; \\qquad {}^{n}C_r + {}^{n}C_{r-1} = {}^{n+1}C_r; \\qquad \\dfrac{{}^{n}C_r}{{}^{n}C_{r-1}} = \\dfrac{n-r+1}{r}', note: 'symmetry, Pascal and the ratio law — the middle maximum and the twin seats of odd rows ride the third; all proved by algebra here and re-read as selection facts in 6.5.' },
    { kind: 'example', title: 'Exam-style: if nC(r−1) = 56, nCr = 70 and nC(r+1) = 56, find n and r — and say why the data could not have been anything but symmetric', steps: [
      'Set up the two ratio equations the data hands over: $\\tfrac{{}^{n}C_r}{{}^{n}C_{r-1}} = \\tfrac{n - r + 1}{r} = \\tfrac{70}{56} = \\tfrac{5}{4}$ and $\\tfrac{{}^{n}C_{r+1}}{{}^{n}C_r} = \\tfrac{n - r}{r + 1} = \\tfrac{56}{70} = \\tfrac{4}{5}$.',
      'Clear the first: $4(n - r + 1) = 5r$, that is $4n + 4 = 9r$.',
      'Clear the second: $5(n - r) = 4(r + 1)$, that is $5n - 4 = 9r$.',
      'Subtract: $n = 8$; then $9r = 36$, so $r = 4$.',
      'Check against the row: ${}^{8}C_3 = 56$, ${}^{8}C_4 = 70$, ${}^{8}C_5 = 56$ — and the outer symmetry ${}^{8}C_3 = {}^{8}C_5$ ($3 + 5 = 8$) is exactly why the data was symmetric: the seat $r = 4$ is the row\u2019s middle, carrying its maximum $70$.',
      'Hence, $(n, r) = (8, 4)$ — a ratio-system solved in four lines, the shape the JEE unit list (which carries permutations and combinations) prices as a staple.',
    ] },

    { kind: 'heading', text: 'Where the Engine Sits' },
    { kind: 'callout', tone: 'exam', title: 'Where this sits in the examinations', text: 'JEE (Main) 2026\u2019s unit list CARRIES permutations and combinations — unit 4 of the banked syllabus audit — so the factorial-toolkit items here are exam-grounded in the strong sense, not by courtesy: the Legendre numerical-value questions (the exponent of a prime in a factorial, the zeros at its end), the row-equation single-correct items (the equality discipline, the symmetric triples), and the multiple-correct property checks are all live syllabus residents. The module\u2019s own exercise typology — Single Correct, Multiple Correct, Linked Comprehension, Numerical Value — is the typology this lesson\u2019s L4–L6 sets mirror. NCERT class 11 chapter 6 carries the school-canon ground (the notation and the first properties); Hall & Knight\u2019s chapter XI is the classic stretch; Khattar\u2019s aptitude corner prices the same divisibility hunts numerically. Every item in this lesson is exam-style — our own designs, labelled honestly, never lifted from any paper.' },
    { kind: 'callout', tone: 'historical', title: 'The triangle before Pascal, the formula before Legendre', text: 'The identity ${}^{n}C_r + {}^{n}C_{r-1} = {}^{n+1}C_r$ builds the array Indian sources knew as Meru-prastaara — Pingala\u2019s prosody chants, two millennia old — and the "arithmetic triangle" that Europe printed on the title pages of algebra books a century before Blaise Pascal\u2019s Traité du triangle arithmétique (1654) gave it the name that stuck. Legendre\u2019s exponent census appeared in his Essai sur la théorie des nombres (1808) — the same year Kramp\u2019s exclamation mark was minted — and it is still the working tool whenever a factorial\u2019s prime structure must be priced without expanding it. The history is a reminder this lesson takes seriously: none of these facts were tabulated into existence; each was ARGUED into existence, and the arguments above are reconstructions of exactly that discipline.' },
    { kind: 'para', text: 'What waits ahead, in order. Lesson 6.3, "Permutations: the Arrangement Count", cashes the second unwinding fraction as its whole engine — ${}^{n}P_r = \\tfrac{n!}{(n-r)!}$ derived from the chain itself, the alike-things division $\\tfrac{n!}{p!\\,q!\\,\\cdots}$ riding the same bookkeeping, and the dictionary-rank craft priced on it. Lesson 6.5, "Combinations: the Selection Count", returns to the property stack built here and re-reads every line as a selection fact — symmetry as the choose-reject split, Pascal as the in-or-out split, the ratio law as how a selection row grows — then builds the zero-or-more censuses on top. Lesson 6.6, "Distributions and the Classic Counting Puzzles", is the room where all of it interlocks. Farther out, chapter 7, "Induction and the Binomial Theorem", reads Pascal\u2019s identity as the coefficient engine of the binomial expansion — the triangle above is already carrying its name — and the Combinatorics shelf beyond this book takes the same fundamentals to full depth. And the counted universe this whole chapter builds — chains, factorials, the two great counts — is exactly the ground Probability inherits: every equally-likely model prices its outcomes with these counts, a handoff the book\u2019s positioning promises and the closing lessons name in prose.' },

    { kind: 'terms', items: [
      { term: 'Factorial', def: 'the product $n! = 1 \\cdot 2 \\cdots n$ of every integer up to $n$ — the bookkeeping of the shrinking chain of the fundamental principle; the roster runs 1, 1, 2, 6, 24, 120, 720, 5040.' },
      { term: 'Recursion law', def: '$n! = n \\cdot (n-1)!$ — each factorial is its predecessor times its own top factor; the ladder that unwinds every factorial equation, anchored at the floor $0! = 1$.' },
      { term: 'The two unwinding fractions', def: '$\\tfrac{n!}{r!} = (r+1) \\cdots n$ (the top $n - r$ factors) and $\\tfrac{n!}{(n-r)!} = n(n-1) \\cdots (n-r+1)$ (the top $r$ factors) — the toolkit\u2019s two quotients; count factors before multiplying.' },
      { term: 'Empty product', def: 'the product over no factors, defined as 1 — the multiplicative identity — which is why $0! = 1$ and why every fraction $n!/0!$ returns $n!$; the additive twin is the empty sum 0 behind every telescoping.' },
      { term: 'Exponent of prime in n!', def: '$E_p(n!) = \\lfloor n/p \\rfloor + \\lfloor n/p^2 \\rfloor + \\cdots$ (Legendre\u2019s formula) — the largest $e$ with $p^e \\mid n!$, computed as the donation census of the multiples of $p$, $p^2$, $p^3$, … up to $n$.' },
      { term: 'Composite honesty (the min rule)', def: 'the largest power of $p_1^{a_1} p_2^{a_2} \\cdots$ in $n!$ is $\\min(\\lfloor E_{p_1}/a_1 \\rfloor, \\ldots)$ — composites are priced prime-by-prime and the scarce side binds; never floor by the composite itself.' },
      { term: 'Trailing zeros of n!', def: 'the exponent of 10 in $n!$, which is $\\min(E_2, E_5) = E_5$ — the 5-side always binds because 2s outnumber 5s at every power; the special case ANS 4.3 banked with its divisor counts.' },
      { term: 'Combination symbol (factorial algebra)', def: '${}^{n}C_r = \\tfrac{n!}{r!\\,(n-r)!}$ — the chain of $r$ seats divided by the $r!$ orders of each selection; defined and algebraically owned here, with the selection engine in lesson 6.5.' },
      { term: 'Equality discipline (rows)', def: '${}^{n}C_x = {}^{n}C_y$ forces $x = y$ or $x + y = n$ — two coefficients of one row coincide only at equal or complementary seats, because the row climbs to its middle and mirrors down.' },
      { term: 'Ratio law and the middle maximum', def: '$\\tfrac{{}^{n}C_r}{{}^{n}C_{r-1}} = \\tfrac{n-r+1}{r}$ — the row grows past $r < \\tfrac{n+1}{2}$, flattens at the odd middle, and falls after; the peak is ${}^{n}C_{\\lfloor n/2 \\rfloor}$, twin seats when $n$ is odd.' },
    ] },

    { kind: 'quiz', title: 'Check yourself: factorials and the counting toolkit', items: [
      { q: 'The exponent of 2 in $10!$ — that is, $\\lfloor 10/2 \\rfloor + \\lfloor 10/4 \\rfloor + \\lfloor 10/8 \\rfloor$ — equals:', options: ['$5$', '$7$', '$8$', '$10$'], answer: 2, explain: 'The floors are the donation census: five even numbers ($2, 4, 6, 8, 10$) donate one 2 each, the two multiples of 4 ($4, 8$) donate a second, and 8 donates a third: $5 + 2 + 1 = 8$ — and indeed $10! = 3628800 = 2^8 \\cdot 14175$ (option C). Option A\u2019s 5 is the first floor alone — it forgets that multiples of 4 carry a second 2. Option B\u2019s 7 stops one floor early, forgetting 8\u2019s third donation. Option D\u2019s 10 is the naive "ten numbers" count — most of them ($1, 3, 5, 7, 9$) donate nothing at all.' },
      { q: 'Which of the following statements about factorials is TRUE?', options: ['$(m+n)! = m! + n!$ for all positive $m, n$', '$(mn)! = m! \\cdot n!$ for all positive $m, n$', '$(kn)! = k \\cdot n!$ for all positive $k, n$', '$n! = n \\cdot (n-1)!$ for every positive integer $n$'], answer: 3, explain: 'The recursion is the definition\u2019s own bookkeeping — split off the top factor and the bracket is $(n-1)!$, which is Option D. The other three are the classic false laws, each killed by a two-line witness: the sum law fails at $m = n = 2$, where $4! = 24$ but $2! + 2! = 4$; the product law fails at $m = 2, n = 3$, where $6! = 720$ but $2! \\cdot 3! = 12$; the scaling law fails at $k = 2, n = 3$, where again $6! = 720$ but $2 \\cdot 3! = 12$ — a factorial never respects arithmetic on its argument.' },
      { q: 'The value of ${}^{9}C_4$ is:', options: ['$126$', '$84$', '$3024$', '$36$'], answer: 0, explain: 'The fraction: ${}^{9}C_4 = \\tfrac{9!}{4! \\cdot 5!} = \\tfrac{9 \\cdot 8 \\cdot 7 \\cdot 6}{4 \\cdot 3 \\cdot 2 \\cdot 1} = \\tfrac{3024}{24} = 126$ (option A). Option B\u2019s 84 is ${}^{9}C_3$ — the seat one step toward the middle ($\\tfrac{9 \\cdot 8 \\cdot 7}{6} = 84$). Option C\u2019s 3024 is the arrangement count — the un-divided chain of four seats, forgetting that each selection carries $4! = 24$ orders. Option D\u2019s 36 is ${}^{9}C_2$ — the wrong seat altogether.' },
      { q: 'The largest power of $6 = 2 \\cdot 3$ that divides $20!$ is:', options: ['$18$', '$3$', '$8$', '$6$'], answer: 2, explain: 'Price the composite prime-by-prime: $E_2(20!) = 10 + 5 + 2 + 1 = 18$ and $E_3(20!) = 6 + 2 = 8$, so the power of 6 is $\\min(18, 8) = 8$ — the 3-side binds (option C). Option A\u2019s 18 is $E_2$ alone, forgetting that every 6 needs a 3 as well. Option B\u2019s 3 is the naive count $\\lfloor 20/6 \\rfloor$ of multiples of 6 — blind to the sixes assembled from a 2 and a 3 living in different factors. Option D\u2019s 6 is $\\lfloor 20/3 \\rfloor$ — the first floor of the 3-census, missing the multiples of 9\u2019s second donations.' },
      { q: 'The maximum value of ${}^{10}C_r$ over $r = 0, 1, \\ldots, 10$ is:', options: ['$210$', '$252$', '$120$', '$1023$'], answer: 1, explain: 'The ratio law: the row climbs while $\\tfrac{11 - r}{r} > 1$, that is while $r < 5.5$ — so it climbs through $r = 5$ and falls after: the peak is ${}^{10}C_5 = 252$ (option B), with the mirrored neighbours ${}^{10}C_4 = {}^{10}C_6 = 210$ one step off. Option A\u2019s 210 is exactly that off-by-one seat. Option C\u2019s 120 is ${}^{10}C_3$, two steps short of the middle. Option D\u2019s $1023 = 2^{10} - 1$ counts ALL non-empty selections from ten objects — the zero-or-more census lesson 6.5 builds — not any single coefficient of the row.' },
    ] },

    { kind: 'exercises', title: 'Exercises 6.2', sets: [
      { level: 'L1', questions: [
        { q: 'Evaluate $\\tfrac{9!}{6!}$ and $\\tfrac{9!}{(9-4)!}$, counting the factors in each before multiplying, and name the seat-count each product fills.', solution: [
          'The first fraction: the bottom $6!$ cancels the factors 1 through 6, leaving the top $9 - 6 = 3$ factors — $7 \\cdot 8 \\cdot 9 = 504$.',
          'The second: $\\tfrac{9!}{(9-4)!} = \\tfrac{9!}{5!}$ cancels 1 through 5, leaving the top $r = 4$ factors — $6 \\cdot 7 \\cdot 8 \\cdot 9 = 3024$.',
          'The seat-reads: 504 fills three seats from nine objects ($9 \\cdot 8 \\cdot 7$ — the chain of the fundamental principle); 3024 fills four ($9 \\cdot 8 \\cdot 7 \\cdot 6$) — lesson 6.3 names these ${}^{9}P_3$ and ${}^{9}P_4$.',
          'Hence, $\\tfrac{9!}{6!} = 504$ (three factors) and $\\tfrac{9!}{5!} = 3024$ (four factors) — two window lengths onto the one falling chain, neither needing an expanded factorial.',
        ], answer: '$\\tfrac{9!}{6!} = 504$ (three factors); $\\tfrac{9!}{(9-4)!} = \\tfrac{9!}{5!} = 3024$ (four factors)' },
        { q: 'Simplify $\\tfrac{(n+3)!}{(n+1)!}$ as a product of integers, then evaluate it at $n = 4$ and verify against the raw factorials.', solution: [
          'Unwind with the recursion: $(n+3)! = (n+3)(n+2) \\cdot (n+1)!$.',
          'Cancel the common tail: $\\tfrac{(n+3)!}{(n+1)!} = (n+2)(n+3)$ — two factors, as the factorial difference $3 - 1 = 2$ promises.',
          'At $n = 4$: $(6)(7) = 42$.',
          'Verify raw: $\\tfrac{7!}{5!} = \\tfrac{5040}{120} = 42$ — the bookkeeping and the arithmetic agree.',
          'Hence, the fraction is $(n+2)(n+3)$ throughout, equal to 42 at $n = 4$.',
        ], answer: '$(n+2)(n+3)$; at $n = 4$ the value is $42$ (raw check $5040/120$)' },
      ] },
      { level: 'L2', questions: [
        { q: 'Find the positive integer $n$ satisfying $(n+1)! = 30 \\cdot (n-1)!$, and check it against the raw factorials.', solution: [
          'Unwind the left side by the recursion: $(n+1)! = (n+1) \\cdot n \\cdot (n-1)!$.',
          'Cancel the common $(n-1)!$ from both sides: $(n+1) \\cdot n = 30$.',
          'Solve: $n^2 + n - 30 = 0$, that is $(n+6)(n-5) = 0$, so $n = 5$ (the positive root).',
          'Check raw: $6! = 720$ and $30 \\cdot 4! = 30 \\cdot 24 = 720$ — both sides match exactly.',
          'Hence, $n = 5$ — the equation unwound to a two-factor product, which is all a factorial equation ever is.',
        ], answer: '$n = 5$ (since $6! = 30 \\cdot 4! = 720$)' },
        { q: 'Compute the exponent of 5 in $30!$ by Legendre\u2019s census, and state why no further floors contribute.', solution: [
          'The census: $E_5(30!) = \\lfloor 30/5 \\rfloor + \\lfloor 30/25 \\rfloor + \\lfloor 30/125 \\rfloor + \\cdots$.',
          'The floors: $\\lfloor 30/5 \\rfloor = 6$ — the six multiples $5, 10, 15, 20, 25, 30$; and $\\lfloor 30/25 \\rfloor = 1$ — the single multiple of 25, which is 25 itself, donating a second 5.',
          'The tail: $5^3 = 125 > 30$, so every later floor is 0 — the census is finite by construction, exactly as the derivation proved.',
          'Hence, $E_5(30!) = 6 + 1 = 7$ — seven 5s in all: six first donations and one second.',
        ], answer: '$E_5(30!) = 6 + 1 = 7$; the floors vanish past $5^2 = 25 \\leq 30 < 125$' },
      ] },
      { level: 'L3', questions: [
        { q: 'Find the largest power of $24 = 2^3 \\cdot 3$ that divides $30!$.', solution: [
          'Price both prime sides by Legendre: $E_2(30!) = 15 + 7 + 3 + 1 = 26$ and $E_3(30!) = 10 + 3 + 1 = 14$.',
          'Each copy of 24 consumes $2^3$ and one 3: the 2-side allows $\\lfloor 26/3 \\rfloor = 8$ copies (since $3 \\cdot 9 = 27 > 26$), the 3-side allows 14.',
          'The binding side decides: the largest power is $\\min(8, 14) = 8$ — the 2s run out first, three at a time.',
          'Hence, $24^8$ divides $30!$ while $24^9$ does not — the composite priced prime-by-prime, the 2-side binding.',
        ], answer: '$24^8$ (the 2-side binds: $\\lfloor E_2(30!)/3 \\rfloor = \\lfloor 26/3 \\rfloor = 8 < 14$)' },
        { q: 'If ${}^{n}C_7 = {}^{n}C_5$, find $n$; then evaluate ${}^{n}C_2$.', solution: [
          'The equality discipline: since $7 \\neq 5$, the coincidence must be complementary — $7 + 5 = n = 12$.',
          'The check: ${}^{12}C_7 = {}^{12}C_5$ is exactly the symmetry identity ${}^{12}C_r = {}^{12}C_{12-r}$ seated at $r = 5$.',
          'Now, ${}^{12}C_2 = \\tfrac{12 \\cdot 11}{2} = 66$.',
          'Hence, $n = 12$ and ${}^{12}C_2 = 66$ — one discipline line standing in for a scan of the row.',
        ], answer: '$n = 12$; ${}^{12}C_2 = 66$' },
        { q: 'Show that $6!$ divides the product $3 \\cdot 4 \\cdot 5 \\cdot 6 \\cdot 7 \\cdot 8$, exhibit the cofactor as a combination symbol, and verify it numerically.', solution: [
          'The run-as-fraction read: $3 \\cdot 4 \\cdot 5 \\cdot 6 \\cdot 7 \\cdot 8 = \\tfrac{8!}{2!}$ — a chain of six seats from eight objects, the second unwinding fraction at $n = 8$, $r = 6$.',
          'Force the combination out: $\\tfrac{8!}{2! \\cdot 6!} = {}^{8}C_6$ is a whole number, so $6!$ divides the run with cofactor ${}^{8}C_6$.',
          'By symmetry the cofactor is legible: ${}^{8}C_6 = {}^{8}C_2 = \\tfrac{8 \\cdot 7}{2} = 28$.',
          'Verify numerically: $3 \\cdot 4 \\cdot 5 \\cdot 6 \\cdot 7 \\cdot 8 = 20160$ and $20160 = 720 \\cdot 28 = 6! \\cdot 28$.',
          'Hence, the divisibility holds with cofactor ${}^{8}C_6 = 28$ — every run of $k$ consecutive integers is $k!$ times a combination, as the derivation proved.',
        ], answer: '$20160 = 6! \\cdot 28$, cofactor ${}^{8}C_6 = {}^{8}C_2 = 28$' },
      ] },
      { level: 'L4', questions: [
        { q: 'Exam-style (Single Correct). The largest power of $15 = 3 \\cdot 5$ that divides $22!$ is: (A) 9 (B) 4 (C) 7 (D) 1. Decide with full reasoning.', solution: [
          'Legendre on both sides: $E_3(22!) = \\lfloor 22/3 \\rfloor + \\lfloor 22/9 \\rfloor = 7 + 2 = 9$; and $E_5(22!) = \\lfloor 22/5 \\rfloor = 4$ (since $22 < 25$, the 5-census closes at one floor).',
          'Each 15 consumes one 3 and one 5: the answer is $\\min(9, 4) = 4$ — the 5-side binds.',
          'So (B) 4. (A)\u2019s 9 is $E_3$ alone — every 15 needs a 5 too. (C)\u2019s 7 is $\\lfloor 22/3 \\rfloor$, the first floor of the wrong census. (D)\u2019s 1 is $\\lfloor 22/15 \\rfloor$ — the naive multiples-of-15 count, blind to the fifteens assembled from a 3 here and a 5 there.',
          'Hence, the answer is (B) — the composite priced prime-by-prime, and the 5-side is the scarce one.',
        ], answer: '(B) 4 — since $E_3(22!) = 9$ and $E_5(22!) = 4$, the min rule binds at 4' },
        { q: 'Exam-style (Multiple Correct). Which of the following hold? (A) ${}^{n}C_r = {}^{n}C_{n-r}$ for $0 \\leq r \\leq n$ (B) $\\tfrac{{}^{n}C_r}{{}^{n}C_{r-1}} = \\tfrac{n-r+1}{r}$ for $1 \\leq r \\leq n$ (C) ${}^{n}C_x = {}^{n}C_y$ implies $x = y$ (D) $p \\mid {}^{p}C_r$ for prime $p$ and $1 \\leq r \\leq p-1$. Identify every true statement.', solution: [
          '(A) is symmetry — TRUE: ${}^{n}C_{n-r} = \\tfrac{n!}{(n-r)!\\,r!} = {}^{n}C_r$; witness ${}^{10}C_2 = {}^{10}C_8 = 45$.',
          '(B) is the ratio law — TRUE, proved in this lesson by dividing the two fractions; witness $\\tfrac{{}^{12}C_5}{{}^{12}C_4} = \\tfrac{792}{495} = \\tfrac{8}{5} = \\tfrac{12 - 5 + 1}{5}$.',
          '(C) is HALF the discipline — FALSE: the full statement is $x = y$ OR $x + y = n$; the witness ${}^{10}C_2 = {}^{10}C_8$ has $2 \\neq 8$, complementary seats coinciding.',
          '(D) is the prime-row law — TRUE, proved by clearing $p! = {}^{p}C_r \\cdot r! \\cdot (p-r)!$ and applying Euclid\u2019s lemma; witnesses $7 \\mid 35$ and $11 \\mid 330$.',
          'Hence, (A), (B) and (D) hold; (C) fails by the complementary coincidence.',
        ], answer: '(A), (B) and (D) hold; (C) is the half-discipline — complementary seats $x + y = n$ also coincide' },
        { q: 'Exam-style (Numerical Value). If ${}^{18}C_r = {}^{18}C_{r+2}$, find $r$ (report the integer).', solution: [
          'The seats differ ($r \\neq r + 2$), so the equality discipline forces the complementary read: $r + (r + 2) = 18$.',
          'Solve: $2r = 16$, so $r = 8$.',
          'Check the discipline\u2019s promise: ${}^{18}C_8 = {}^{18}C_{10}$ — complementary seats of the row of 18, which is the symmetry identity seated at $r = 8$.',
          'Hence, $r = 8$.',
        ], answer: '$8$' },
      ] },
      { level: 'L5', questions: [
        { q: 'Prove that Legendre\u2019s sum is always finite — every floor past the first power $p^i > n$ is zero — and compute $E_7(60!)$.', solution: [
          'Finiteness: each floor $\\lfloor n/p^i \\rfloor$ counts the multiples of $p^i$ up to $n$; once $p^i > n$ there are none, so that floor — and every one after it, since the powers only grow — is 0. The census closes on its own.',
          'The census for $p = 7$, $n = 60$: $\\lfloor 60/7 \\rfloor = 8$ (the multiples $7, 14, \\ldots, 56$) and $\\lfloor 60/49 \\rfloor = 1$ (the single multiple of 49, which is 49 itself, donating a second 7).',
          'The tail: $7^3 = 343 > 60$, so every later floor is 0.',
          'Hence, $E_7(60!) = 8 + 1 = 9$ — eight first donations and one second, the sum finite exactly as proved.',
        ], answer: '$E_7(60!) = 8 + 1 = 9$; finite because $7^3 = 343 > 60$ kills every later floor' },
        { q: 'Prove, by the ratio law, where the row ${}^{n}C_r$ peaks: a unique middle seat when $n$ is even, twin seats when $n$ is odd. Witness both parities on the rows of 10 and of 9.', solution: [
          'The ratio law: $\\tfrac{{}^{n}C_r}{{}^{n}C_{r-1}} = \\tfrac{n - r + 1}{r}$, so the coefficient at seat $r$ beats its predecessor exactly when $\\tfrac{n - r + 1}{r} > 1$, that is $r < \\tfrac{n+1}{2}$.',
          'When $n$ is even, $\\tfrac{n+1}{2}$ is not a whole seat: the climb runs through $r = \\tfrac{n}{2}$ (the ratio into it is $\\tfrac{n/2 + 1}{n/2} > 1$) and the ratio out of it is $\\tfrac{n/2}{n/2 + 1} < 1$ — a unique peak at $r = n/2$.',
          'When $n$ is odd, $r = \\tfrac{n+1}{2}$ IS a seat and the ratio into it is exactly $\\tfrac{(n+1)/2}{(n+1)/2} = 1$ — a flat step, so the two middle seats tie: ${}^{n}C_{(n-1)/2} = {}^{n}C_{(n+1)/2}$.',
          'Witness, $n = 10$: ${}^{10}C_4 = 210 \\to {}^{10}C_5 = 252 \\to {}^{10}C_6 = 210$ — ratios $\\tfrac{6}{5}$ then $\\tfrac{5}{6}$, the unique peak 252 at the middle seat $r = 5$.',
          'Witness, $n = 9$: the ratio into $r = 5$ is $\\tfrac{9 - 5 + 1}{5} = 1$, so ${}^{9}C_4 = {}^{9}C_5 = 126$ — twin middle seats, as promised.',
          'Hence, the peak is ${}^{n}C_{\\lfloor n/2 \\rfloor}$ always, with the odd rows carrying its twin ${}^{n}C_{\\lceil n/2 \\rceil}$ beside it.',
        ], answer: 'peak ${}^{n}C_{\\lfloor n/2 \\rfloor}$, twin seats when n is odd; witnesses 252 at $r = 5$ (n = 10) and 126 at $r = 4 = 5$ (n = 9)' },
        { q: 'If the ratio ${}^{2n}C_3 : {}^{n}C_3$ equals $12 : 1$, find $n$.', solution: [
          'Write both sides as factorial fractions and cancel the common $3!$: $\\tfrac{{}^{2n}C_3}{{}^{n}C_3} = \\tfrac{(2n)(2n-1)(2n-2)}{n(n-1)(n-2)}$.',
          'Factor the run: $(2n)(2n-1)(2n-2) = 4n(n-1)(2n-1)$ — the second unwinding fraction at full width — so the ratio collapses to $\\tfrac{4(2n-1)}{n-2}$.',
          'The equation: $\\tfrac{4(2n-1)}{n-2} = 12$, that is $8n - 4 = 12n - 24$.',
          'Solve: $4n = 20$, so $n = 5$.',
          'Check raw: ${}^{10}C_3 = 120$ and ${}^{5}C_3 = 10$ — the ratio is $12 : 1$ exactly.',
          'Hence, $n = 5$ — the fraction algebra beating a search over rows.',
        ], answer: '$n = 5$ (since ${}^{10}C_3 = 120$ and ${}^{5}C_3 = 10$)' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove Legendre\u2019s binary form: $E_2(n!) = n - s_2(n)$, where $s_2(n)$ is the number of 1s in the binary expansion of $n$. Verify at $n = 10$ and $n = 13$.', solution: [
          'Run the halving machine: write $n = 2q_0 + b_0$, then $q_0 = 2q_1 + b_1$, $q_1 = 2q_2 + b_2$, and so on — the successive quotients of the divisions by 2, with the bits $b_i$ the binary digits of $n$. Then $\\lfloor n/2 \\rfloor = q_0$, $\\lfloor n/4 \\rfloor = q_1$, $\\lfloor n/8 \\rfloor = q_2$, … — the floors ARE the quotient ladder.',
          'Sum the ladder the honest way: $q_0 = \\tfrac{n - b_0}{2}$, $q_1 = \\tfrac{n - b_0 - 2b_1}{4}$, $q_2 = \\tfrac{n - b_0 - 2b_1 - 4b_2}{8}$, and so on — each quotient strips one more binary digit from $n$.',
          'Adding all the lines, each bit $b_i$ is charged the full geometric tail from its own place down: the total is $n - b_0 - b_1 - b_2 - \\cdots$, since $\\tfrac{1}{2} + \\tfrac{1}{4} + \\tfrac{1}{8} + \\cdots = 1$ closes each scale exactly. Hence $E_2(n!) = q_0 + q_1 + q_2 + \\cdots = n - s_2(n)$.',
          'Verify $n = 10$: the binary expansion $1010$ carries $s_2 = 2$ ones, and $E_2(10!) = 5 + 2 + 1 = 8 = 10 - 2$ — exact.',
          'Verify $n = 13$: the binary expansion $1101$ carries three ones, and $E_2(13!) = 6 + 3 + 1 = 10 = 13 - 3$ — exact again.',
          'Hence, $E_2(n!) = n - s_2(n)$ — the floors of the powers of two are the halving machine\u2019s quotient ladder, and the 1-bits are exactly what it fails to collect.',
        ], answer: '$E_2(n!) = n - s_2(n)$; verified $10 \\to 8 = 10 - 2$ and $13 \\to 10 = 13 - 3$' },
        { q: 'Prove that a prime $p$ divides ${}^{p}C_r$ for every $1 \\leq r \\leq p - 1$, and show the primality is load-bearing by exhibiting composite $n$ with $n \\nmid {}^{n}C_r$.', solution: [
          'Clear the definition: ${}^{p}C_r = \\tfrac{p!}{r!\\,(p-r)!}$ gives the exact factorisation $p! = {}^{p}C_r \\cdot r! \\cdot (p-r)!$.',
          'The prime $p$ divides the left side — it is one of $p$!\u2019s own factors — so it divides the product ${}^{p}C_r \\cdot r! \\cdot (p-r)!$.',
          'By Euclid\u2019s lemma (the ground of ANS 4.2, The Fundamental Theorem of Arithmetic), $p$ must divide one of the three factors. It cannot divide $r!$ or $(p-r)!$: every factor inside both is a positive integer smaller than $p$, and if $p$ divided such a product it would divide one of those smaller numbers — impossible. So $p \\mid {}^{p}C_r$.',
          'Witnesses: ${}^{7}C_3 = 35 = 7 \\cdot 5$ and ${}^{11}C_4 = 330 = 11 \\cdot 30$ — the prime hands every interior coefficient of its own row to itself.',
          'The primality is load-bearing: $4 \\nmid {}^{4}C_2 = 6$ and $6 \\nmid {}^{6}C_3 = 20$ — composite rows leave middle coefficients undivided, because a composite dividing a product need not divide any single factor.',
          'Hence, prime rows are honest to their interiors; composite rows are not — the sharpest algebraic fingerprint of primality in this whole toolkit.',
        ], answer: 'proved — $p \\mid {}^{p}C_r$ via Euclid on $p! = {}^{p}C_r \\cdot r! \\cdot (p-r)!$; composites fail ($4 \\nmid 6$, $6 \\nmid 20$)' },
      ] },
    ] },
  ],
}

/* ------------------------------------------------------------------ */
/* figures for lesson 6.2 — the shrinking chain staircase, the         */
/* Legendre donation tally and the row-of-ten ramp                     */
/* ------------------------------------------------------------------ */

function shrinkingChainSvg(): string {
  // six seats filled in 6, 5, 4, 3, 2, 1 ways (the shrinking chain of
  // 6.1); the running product strip underneath climbing 6, 30, 120,
  // 360, 720, 720; the recursion badge 6! = 6 × 5! in the footer
  const seats = [6, 5, 4, 3, 2, 1]
  const running = [6, 30, 120, 360, 720, 720]
  const boxes = seats.map((v, i) => {
    const x = 40 + i * 108
    return `<rect x="${x}" y="70" width="100" height="62" rx="8" fill="#ffedd5" stroke="#16a34a" stroke-width="2"/>` +
      `<text x="${x + 50}" y="112" font-size="26" font-weight="700" text-anchor="middle" fill="#166534">${v}</text>` +
      `<text x="${x + 50}" y="60" font-size="11" text-anchor="middle" fill="#0f766e">seat ${i + 1}</text>`
  }).join('')
  const dots = running.map((v, i) => {
    const cx = 90 + i * 108
    const last = i === 5
    return `<circle cx="${cx}" cy="188" r="6" fill="${last ? '#ea580c' : '#16a34a'}"/>` +
      `<text x="${cx}" y="172" font-size="11.5" font-weight="700" text-anchor="middle" fill="${last ? '#ea580c' : '#166534'}">${v}</text>`
  }).join('')
  return `<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The shrinking chain as bookkeeping: six seats in a row, each labelled with the number of ways it can be filled — 6, 5, 4, 3, 2, 1 — with the running product underneath climbing 6, 30, 120, 360, 720, 720. The final value 720 is marked 6 factorial. A footer badge reads the recursion: 6 factorial equals 6 times 5 factorial, which is 6 times 120. Filling all six seats is the multiplication rule at full length, product 720.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the shrinking chain: six seats, one running product</text>
  ${boxes}
  <text x="360" y="140" font-size="10.5" text-anchor="middle" fill="#0f766e">each seat: one way fewer than the last — the chain of lesson 6.1</text>
  <line x1="60" y1="188" x2="680" y2="188" stroke="#d97706" stroke-width="1.6"/>
  ${dots}
  <text x="360" y="212" font-size="10.5" text-anchor="middle" fill="#0f766e">the running product: 6 → 30 → 120 → 360 → 720 → 720 (all seats filled)</text>
  <text x="360" y="244" font-size="12" font-weight="700" text-anchor="middle" fill="#ea580c">6! = 6 × 5! = 6 × 120 — remove the first seat and the rest is exactly 5!</text>
  <text x="360" y="268" font-size="10.5" text-anchor="middle" fill="#0d9488">fill all six seats: the multiplication rule prices the full-length product 6·5·4·3·2·1 = 720</text>
  <text x="360" y="288" font-size="10.5" text-anchor="middle" fill="#0d9488">the recursion badge is the same product read from its top end</text>
</svg>`
}

function legendreTallySvg(): string {
  // the donation census for E2(10!): the ten factors of 10! in cells,
  // amber ticks under each number marking its donated 2s (one per even
  // number, a second for multiples of 4, a third for 8); the tally lines
  // read the floors 5 + 2 + 1 = 8
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const ticksOf = (v: number): number => (v % 8 === 0 ? 3 : v % 4 === 0 ? 2 : v % 2 === 0 ? 1 : 0)
  const cells = nums.map((v, i) => {
    const col = i % 5
    const row = Math.floor(i / 5)
    const x = 44 + col * 128
    const y = 52 + row * 78
    const t = ticksOf(v)
    const ticks = [0, 1, 2].slice(0, t).map((k) => `<rect x="${x + 40 + k * 14}" y="${y + 44}" width="9" height="9" fill="#d97706"/>`).join('')
    return `<rect x="${x}" y="${y}" width="120" height="58" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="2"/>` +
      `<text x="${x + 60}" y="${y + 34}" font-size="20" font-weight="700" text-anchor="middle" fill="#166534">${v}</text>` +
      (ticks || `<text x="${x + 60}" y="${y + 52}" font-size="9.5" text-anchor="middle" fill="#5eead4">no 2s</text>`)
  }).join('')
  return `<svg viewBox="0 0 720 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The donation census for the exponent of 2 in 10 factorial: the ten factors of the factorial in cells, each even number carrying one amber tick for its first donated 2, each multiple of 4 a second tick, and 8 a third. The tally lines read the floors: multiples of 2 — five of them; multiples of 4 — two; multiples of 8 — one; total 5 plus 2 plus 1 equals 8. This agrees with the roster audit, 10 factorial equals 2 to the 8 times 14175.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the donation census: the exponent of 2 in 10!</text>
  ${cells}
  <text x="360" y="206" font-size="10.5" text-anchor="middle" fill="#0f766e">one amber tick per donated 2 — a second for multiples of 4, a third for 8</text>
  <line x1="120" y1="222" x2="600" y2="222" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="120" y="244" font-size="11" fill="#166534">multiples of 2: 2, 4, 6, 8, 10</text>
  <text x="600" y="244" font-size="11" text-anchor="end" fill="#166534">⌊10/2⌋ = 5</text>
  <text x="120" y="264" font-size="11" fill="#166534">multiples of 4: 4, 8</text>
  <text x="600" y="264" font-size="11" text-anchor="end" fill="#166534">⌊10/4⌋ = 2</text>
  <text x="120" y="284" font-size="11" fill="#166534">multiples of 8: 8</text>
  <text x="600" y="284" font-size="11" text-anchor="end" fill="#166534">⌊10/8⌋ = 1</text>
  <text x="360" y="314" font-size="13" font-weight="700" text-anchor="middle" fill="#ea580c">E2(10!) = 5 + 2 + 1 = 8 — agreeing with 10! = 2⁸ · 14175</text>
</svg>`
}

function rowTenRampSvg(): string {
  // the eleven coefficients of row 10 as bars: 1, 10, 45, 120, 210, 252,
  // 210, 120, 45, 10, 1; peak bar (r = 5) orange; the symmetric partner
  // pairs joined by staggered mirror brackets UNDER the axis; the
  // ratio-law lines in the footer
  const vals = [1, 10, 45, 120, 210, 252, 210, 120, 45, 10, 1]
  const base = 300
  const scale = 200 / 252
  const bars = vals.map((v, r) => {
    const x = 60 + r * 54
    const h = Math.max(3, Math.round(v * scale))
    const peak = r === 5
    return `<rect x="${x}" y="${base - h}" width="44" height="${h}" fill="${peak ? '#ea580c' : '#16a34a'}" opacity="${peak ? 1 : 0.88}"/>` +
      `<text x="${x + 22}" y="${base - h - 6}" font-size="10" font-weight="700" text-anchor="middle" fill="${peak ? '#ea580c' : '#166534'}">${v}</text>` +
      `<text x="${x + 22}" y="${base + 16}" font-size="10" text-anchor="middle" fill="#0f766e">r=${r}</text>`
  }).join('')
  // staggered mirror brackets under the axis, innermost pair deepest
  const pairs: Array<[number, number]> = [[4, 6], [3, 7], [2, 8], [1, 9], [0, 10]]
  const brackets = pairs.map(([a, b], k) => {
    const depth = 324 + k * 11
    const xa = 60 + a * 54 + 22
    const xb = 60 + b * 54 + 22
    return `<line x1="${xa}" y1="${depth}" x2="${xb}" y2="${depth}" stroke="#d97706" stroke-width="1.3" stroke-dasharray="4 4"/>` +
      `<line x1="${xa}" y1="${base + 20}" x2="${xa}" y2="${depth}" stroke="#d97706" stroke-width="1.1"/>` +
      `<line x1="${xb}" y1="${base + 20}" x2="${xb}" y2="${depth}" stroke="#d97706" stroke-width="1.1"/>`
  }).join('')
  return `<svg viewBox="0 0 720 410" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The row of ten as a ramp: the eleven coefficients of 10 choose r — 1, 10, 45, 120, 210, 252, 210, 120, 45, 10, 1 — drawn as bars of height proportional to value, labelled r = 0 through r = 10. The row climbs while the ratio 11 minus r over r exceeds 1, peaks at the middle seat r = 5 with 252, drawn as the orange bar, and mirrors down. Staggered amber brackets under the axis join the symmetric partner pairs, which sit at equal heights — 45, 120 and 210 twice each — and the peak is unique because 10 is even.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the row of ten: climbs to the middle, mirrors down</text>
  ${bars}
  <line x1="40" y1="${base}" x2="700" y2="${base}" stroke="#0d9488" stroke-width="2"/>
  ${brackets}
  <text x="700" y="46" font-size="11" font-weight="700" text-anchor="end" fill="#ea580c">the peak: 10C5 = 252 — unique, since 10 is even</text>
  <text x="360" y="384" font-size="10.5" text-anchor="middle" fill="#0f766e">the mirror brackets: 10C2 = 10C8 = 45, 10C3 = 10C7 = 120, 10C4 = 10C6 = 210 — symmetric partners share a height</text>
  <text x="360" y="402" font-size="10.5" text-anchor="middle" fill="#0d9488">the ratio law: 10C5 / 10C4 = 6/5 > 1 — one more climb; 10C6 / 10C5 = 5/6 < 1 — the fall begins</text>
</svg>`
}

/**
 * Advanced Algebra — chapter 6, lesson 6.3
 * "Permutations: the Arrangement Count" (parallel-swarm run, task 6-c).
 *
 * NOTE FOR THE ORCHESTRATOR (paste-time): this part-file lives in
 * scripts/aa-ch06-work/; when pasted into
 * src/data/library/books/mathematics/advanced-algebra/ch-06.ts the type
 * import above must become the chapter file's own
 * `import type { Chapter, Lesson } from '../../../types'` (or join the
 * existing import) — everything else is the chapter's exact Lesson shape.
 *
 * VERIFY-FIRST: the engines were green BEFORE this prose was declared done —
 * scripts/aa-ch06-work/v6-3.ts sections E (every number recomputed: nPr
 * values swept, alike-arrangement counts by literal enumeration, dictionary
 * ranks by brute-force sorting of the actual permutations, quiz keys and
 * distractors, every exercise answer) + F (the structural pins on this
 * part-file lesson object), run by scripts/aa-ch06-work/run-63.ts. The
 * engines caught real drafting slips: a hand-computed rank of 31 for a
 * five-letter word whose honest rank is 34 (one letter sitting between two
 * comparison letters was missed at the second seat), a rank off by one from
 * a +1 forgotten at a seat where the word's own letter is the alphabetically
 * smallest remaining, and an adjacency complement computed on a mis-sized
 * bundle (4!/3! = 4 where the true bundle count is 5!/3! = 20) — all fixed
 * and pinned. Ground: the m2-07 module band 7.7–7.12 (Permutation, the
 * Formula for Permutation with its r-vacant-places chain, the
 * with-repetition n^r census, CAE 7.3, Permutation when all Objects are Not
 * Distinct with its overcount argument, CAE 7.4, the dictionary-rank craft
 * at 7.10) — METHOD SHAPES only, studied never reproduced: every word,
 * roster, number, figure, quiz item and exercise below is OUR OWN,
 * recomputed by the engine before this prose was declared done.
 *
 * HOSTED FOLDS (TOC_FOLD_LEDGER.json, binding — a lesson that misses its
 * hosted fold is INCOMPLETE):
 * - (m2-07) "Formula for Permutation" — mode section: served by the named
 *   subsection "The Formula for Permutation: the r Vacant Places" (heading +
 *   prose + the full derivation of nPr from the vacant-places chain + worked
 *   examples).
 * - (m2-07) "Permutation when all Objects are Not Distinct" — mode section:
 *   served by the named subsection "Permutation when All Objects are Not
 *   Distinct: the Overcount Division" (heading + prose + the formal
 *   n!/(p!q!…) statement + the by-hand census + worked examples of exactly
 *   the not-distinct type).
 *
 * Lesson census (engine-pinned): 10 Illustrations (the last exam-shaped);
 * 4 derivations (the nPr vacant-places chain, the with-repetition n^r, the
 * overcount division, the dictionary-rank ladder); 3 original SVG figures
 * (the vacant-places chain; the overcount division exhibit; the dictionary
 * page) on the vivid palette only; 3 census tables; 10 terms; 4 formula
 * cards; 5 equations \tag 1–5; quiz 5 items, keys [0,1,2,3,1]; exercises 15
 * in sets L1–L6 = 2/2/3/3/3/2 (the Cengage exam typology at L4–L6: Single
 * Correct / Multiple Correct / Numerical Value / Linked Comprehension, all
 * labelled exam-style, all our own designs); prerequisites pinned to the
 * chapter siblings 6.1 The Fundamental Principle of Counting +
 * 6.2 Factorials and the Counting Toolkit; sources cengage-m2-07,
 * cengage-jee-style, ncert-math11-ch6-permutations-combinations,
 * jee-main-2026-syllabus, hall-knight-higher-algebra, khattar-qa-4e.
 */
const lesson63: Lesson = {
  id: 'aa-permutations-the-arrangement-count',
  number: '6.3',
  title: 'Permutations: the Arrangement Count',
  concepts: [
    'permutation: the arrangement where order is priced',
    'the r vacant places and the shrinking chain',
    'the formula nPr = n!/(n−r)! as the chain compressed',
    'nPn = n! and the 0! consistency',
    'repetition allowed: the n^r census told apart from nPr',
    'arrangements of alike things by the overcount division',
    'the dictionary rank: 1 plus the words-before count',
    'the small-case census as the wrong-model catcher',
  ],
  objectives: [
    'Define a permutation of n distinct objects taken r at a time as an arrangement in which order is priced, and count small cases by hand before any formula is trusted — the census discipline this chapter installed at lesson 6.1.',
    'Derive the formula for permutation from the r vacant places themselves: the chain n, n−1, …, n−r+1 closed by the multiplication rule of lesson 6.1, then compressed by the factorial bookkeeping of lesson 6.2 into n!/(n−r)! — never memorized, always re-derivable.',
    'Price the endpoints nPn = n! and nP1 = n, read the 0! = 1 consistency cross-referenced from lesson 6.2, and solve nPr equations by matching chains of consecutive factors.',
    'Tell the with-repetition count n^r from nPr with the small-case census — each seat free versus each seat eating the pool — and price answer sheets, codes and signals of both kinds.',
    'Count arrangements of alike things n!/(p!q!…) through the overcount argument: stamp the twins distinct, overcount to n!, then divide by every stamping — with the 2-alike-of-3 case listed by hand as the honest exhibit.',
    'Compute the dictionary rank of a word among the arrangements of its letters: rank = 1 + the words-before count, priced seat by seat down the alphabetical ladder, with alike letters shrinking each rung.',
    'Use the complement read (total minus bad) on adjacency questions such as two alike letters never together — the seed lesson 6.1 planted and lesson 6.4 will cash at full strength.',
  ],
  prerequisites: ['aa-the-fundamental-principle-of-counting', 'aa-factorials-and-the-counting-toolkit'],
  sources: ['cengage-m2-07', 'cengage-jee-style', 'ncert-math11-ch6-permutations-combinations', 'jee-main-2026-syllabus', 'hall-knight-higher-algebra', 'khattar-qa-4e'],
  blocks: [
    { kind: 'para', text: 'Lesson 6.1, "The Fundamental Principle of Counting", priced chains: a journey of three independent legs has $m \\cdot n \\cdot p$ routes, and only one honest requirement — the forks must be disjoint. Lesson 6.2, "Factorials and the Counting Toolkit", taught the bookkeeping those chains kept producing: a shrinking product of consecutive integers is a factorial fraction, $\\tfrac{n!}{(n-r)!}$ being exactly $r$ of those factors, top down. Between the two sits this lesson\u2019s question, and it is the oldest counting question there is. Eight sprinters cross a finish line; gold, silver and bronze wait on the podium. In how many orders can the podium be filled? The chain of 6.1 answers at once — gold in 8 ways, then silver in 7, then bronze in 6, so $8 \\cdot 7 \\cdot 6 = 336$ — and no new principle was needed. But watch what the answer IS: a product of exactly as many consecutive descending factors as there are places to fill. That observation, swept over every arrangement question this chapter asks, becomes a formula so useful that examinations reach for it by name — and this lesson\u2019s whole discipline is to DERIVE it rather than memorize it, so that when the objects repeat, or the seats are the whole alphabet, or the word must be found in a dictionary of its own arrangements, the chain — never the formula — is what you rebuild.' },
    { kind: 'para', text: 'The route has four stations. First the definition itself: what a permutation is (an arrangement, order priced) and what it is not (a selection, order ignored — lesson 6.5\u2019s whole business). Second the formula for permutation, derived from the r vacant places and compressed into factorials — the second of the two fractions lesson 6.2 built the algebra for, cashed here. Third the two variations that fraud every exam paper: repetition allowed ($n^r$, each seat free — 6.1\u2019s chain again, NOT a permutation formula) and arrangements of alike things ($\\tfrac{n!}{p!\\,q!\\,\\cdots}$, the overcount division). Fourth the dictionary-rank ladder: given a word, find its position among all arrangements of its letters — the craft that turns this lesson\u2019s counts into a locating tool. Throughout, the small-case census stays the law of the chapter: no formula is trusted until it has counted a case small enough to list by hand.' },

    { kind: 'heading', text: 'Permutation: the Arrangement Itself' },
    { kind: 'para', text: 'A PERMUTATION is an arrangement — an ordered placing of objects into positions, where swapping two objects produces a different arrangement. That single word, "ordered", is the entire definition: take the letters $\\{1, 2, 3\\}$ two at a time and the six arrangements are the six two-digit numbers $12, 13, 21, 23, 31, 32$ — listed in full, because the census comes before the formula — and the count is $3 \\cdot 2 = 6$. Had order been free (a SELECTION, lesson 6.5\u2019s object), the pairs $12$ and $21$ would be one object, and the count would be three. Order is the only difference between those two answers, and it is the difference this lesson prices.' },
    { kind: 'callout', tone: 'definition', title: 'Permutation of n distinct objects taken r at a time', text: 'A PERMUTATION of $n$ DISTINCT objects taken $r$ at a time is an ordered arrangement of $r$ of those $n$ objects — a filling of $r$ distinct places, each place holding exactly one object, and two fillings being different arrangements whenever some place holds a different object. Thus, for the objects $\\{1, 2, 3\\}$ taken 2 at a time: $12$, $13$, $21$, $23$, $31$ and $32$ are the six permutations, and the COUNT of permutations is written $^{n}P_{r}$. Here $n$ names the pool (3 objects) and $r$ the places (2 seats): the count above is $^{3}P_{2} = 6$.' },
    { kind: 'list', marker: 'roman', items: [
      '(i) the pool $\\{1, 2, 3\\}$, two seats: $12$, $13$, $21$, $23$, $31$, $32$ — six arrangements, $^{3}P_{2} = 3 \\cdot 2 = 6$;',
      '(ii) the pool $\\{1, 2\\}$, two seats: $12$, $21$ — two arrangements, $^{2}P_{2} = 2 \\cdot 1 = 2$;',
      '(iii) the pool $\\{1, 2, 3, 4\\}$, two seats: the twelve arrangements pair as $12/21$, $13/31$, $14/41$, $23/32$, $24/42$, $34/43$ — six selections, each doubled by order, $^{4}P_{2} = 12$;',
      '(iv) the pool $\\{1, 2, 3\\}$, three seats: $123$, $132$, $213$, $231$, $312$, $321$ — six arrangements, $^{3}P_{3} = 6$.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Order is the only difference', text: 'Compare census (i) with census (iii): three objects two at a time give 6 arrangements; four objects two at a time give 12 — and the 12 sit in 6 order-PAIRS ($12$ with $21$, and so on). A selection ignores which member of a pair you hold; an arrangement prices the pair twice. That doubling is not decoration — it is the bridge to lesson 6.5, where $^{n}P_{r} = \\,^{n}C_{r} \\cdot r!$ becomes the definition-by-split of the selection count: select, then arrange. This lesson builds the arrange half; 6.5 cashes the split.' },
    { kind: 'callout', tone: 'warn', title: 'The podium is not the committee', text: 'The classic fraud is pricing a selection with the arrangement count, or vice versa. A committee of 3 chosen from 8 people is a selection — the SAME three people in any internal order; a gold–silver–bronze podium from 8 sprinters is an arrangement — Ana ahead of Bo is a different result from Bo ahead of Ana. Ask first: does swapping two chosen objects change the outcome? If yes, arrange (this lesson); if no, select (6.5). The exam corner prices exactly this fork, and the small-case census of $\\{1,2,3\\}$ two at a time — 6 arrangements, 3 selections — is the fastest catcher there is.' },

    { kind: 'heading', text: 'The Formula for Permutation: the r Vacant Places' },
    { kind: 'para', text: 'Now the formula — derived, never quoted. The picture is the one the definition already drew: $r$ VACANT PLACES in a row, and a pool of $n$ distinct objects, each place to hold exactly one object. Fill the places one at a time, from the left. The first place admits any of the $n$ objects — $n$ ways. The second place admits any of the $n - 1$ objects still unplaced — $n - 1$ ways. The third: $n - 2$ ways. Every placement removes exactly one object from the pool, so by the time the $r$-th place is reached, $r - 1$ objects are gone and $n - (r - 1)$ remain: the last place fills in $n - r + 1$ ways. The chain is exactly the multiplication rule of lesson 6.1 — the stages are independent because each stage\u2019s count depends only on how many objects remain, not on WHICH objects — and the derivation below closes it and then compresses it.' },
    { kind: 'figure', caption: 'The r vacant places filled from a pool of n = 8 distinct objects, r = 4 seats: the shrinking chain. Place 1 fills in 8 ways, place 2 in 7, place 3 in 6, place 4 in 5 — each placement removes one object from the pool (the amber pool bar shrinks by one each seat). The multiplication rule of lesson 6.1 closes the chain: 8 × 7 × 6 × 5 = 1680 arrangements = 8P4 = 8!/(8−4)! — four consecutive descending factors, which is 8!/4! by the toolkit of lesson 6.2.', svg: vacantPlacesSvg() },
    { kind: 'derivation', title: 'The formula for permutation, from the vacant places', statement: 'For integers $n \\geq r \\geq 1$: the number of permutations of $n$ distinct objects taken $r$ at a time is the product of the $r$ consecutive descending factors starting at $n$, which compresses to $\\tfrac{n!}{(n-r)!}$.', steps: [
      { label: 'Stage the job as r vacant places', formula: '\\square \\ \\square \\ \\square \\ \\cdots \\ \\square \\quad (r \\text{ places}), \\quad \\text{pool } = \\{a_1, a_2, \\ldots, a_n\\}', explanation: 'A permutation is a filling of $r$ distinct places by $n$ distinct objects, one object per place. The picture is the engine: nothing about the pool matters except its size, because the objects are distinct and every object is available for every place until placed.' },
      { label: 'Price the places left to right', formula: 'n, \\ (n-1), \\ (n-2), \\ \\ldots, \\ (n-r+1) \\text{ ways}', explanation: 'Place 1: any of the $n$ objects. Place 2: the pool has shrunk by one, so $n-1$. Each place removes exactly one object, so place $k$ sees a pool of $n - (k - 1)$ objects — and place $r$ sees $n - r + 1$. The last factor is the honest one to check: at $r = 3$, $n = 8$ the chain is $8, 7, 6$ — the count $8 \\cdot 7 \\cdot 6 = 336$ the podium question demanded.' },
      { label: 'Close the chain by the multiplication rule', formula: '^{n}P_{r} = n (n-1)(n-2) \\cdots (n-r+1)', explanation: 'The stages are independent in the sense 6.1 requires: the number of ways at each stage depends only on how many objects remain, never on which ones were placed earlier — so the product rule applies and the total is the product of the $r$ stage-counts. This is a fresh derivation of the chain, not a new principle: 6.1\u2019s engine wearing its most useful coat.' },
      { label: 'Compress by factorial bookkeeping', formula: 'n(n-1) \\cdots (n-r+1) = \\dfrac{n (n-1) \\cdots (n-r+1) \\cdot (n-r) (n-r-1) \\cdots 2 \\cdot 1}{(n-r)(n-r-1) \\cdots 2 \\cdot 1} = \\dfrac{n!}{(n-r)!}', explanation: 'Multiply and divide by the missing tail $(n-r)(n-r-1) \\cdots 2 \\cdot 1 = (n-r)!$ — the top becomes the full $n!$, and the fraction $\\tfrac{n!}{(n-r)!}$ is exactly the $r$ top factors of $n!$. This is the second of the two fractions lesson 6.2 built the algebra for ($\\tfrac{n!}{r!}$ = the top $n - r$ factors; $\\tfrac{n!}{(n-r)!}$ = the top $r$ factors) — cashed here as a count.' },
      { label: 'Read the honest edge cases', formula: 'r = n: \\ ^{n}P_{n} = n!; \\qquad r = 1: \\ ^{n}P_{1} = n; \\qquad r = 0: \\ ^{n}P_{0} = \\tfrac{n!}{n!} = 1', explanation: 'At $r = n$ the last factor is $n - n + 1 = 1$ and the chain is all of $n!$. At $r = 1$ the chain is the single factor $n$. At $r = 0$ — no places — the one empty arrangement: $\\tfrac{n!}{n!} = 1$, the same empty-product consistency that gave $0! = 1$ in 6.2.' },
    ], result: '$^{n}P_{r} = n(n-1)(n-2)\\cdots(n-r+1) = \\tfrac{n!}{(n-r)!}$ $\\qquad$ $\\text{for integers } 0 \\le r \\le n$ $\\qquad$ the chain, compressed' },
    { kind: 'equation', latex: '^{n}P_{r} = n (n-1)(n-2) \\cdots (n-r+1) = \\dfrac{n!}{(n-r)!} \\qquad (0 \\le r \\le n) \\tag{1}', note: 'the formula for permutation: r consecutive descending factors from n — derived from the vacant places, compressed by the factorial bookkeeping of lesson 6.2.' },
    { kind: 'formula', name: 'The arrangement count', latex: '^{n}P_{r} = n(n-1) \\cdots (n-r+1) = \\dfrac{n!}{(n-r)!}, \\qquad ^{n}P_{n} = n!, \\qquad ^{n}P_{1} = n', note: 'r seats, pool shrinking by one each seat; r = n empties the pool and the chain is the full n factorial; one seat has no shrinks to do. Never memorize — rebuild from the vacant places.' },
    { kind: 'para', text: 'Two consistency checks, both census-shaped, both swept by the engines before this prose was fixed. First, $^{n}P_{n}$: with $r = n$ the fraction reads $\\tfrac{n!}{0!}$, and for that to equal the chain\u2019s value $n!$ one needs $0! = 1$ — exactly the empty-product consistency lesson 6.2 installed; the permutation count AGREES with that convention rather than demanding it, which is the healthiest kind of check a definition can pass. Second, the recurrence the chain hands us for free: peel the first seat off and $^{n}P_{r} = n \\cdot \\,^{n-1}P_{r-1}$, because the first place takes any of the $n$ objects and the remaining $r - 1$ places are a fresh vacant-places problem on the $n - 1$ survivors — pinned as equation 2 below and proved in an exercise.' },
    { kind: 'equation', latex: '^{n}P_{r} = n \\cdot \\, ^{n-1}P_{r-1} \\tag{2}', note: 'the first-seat peel: place any of the n objects first, then run the same problem on n−1 objects and r−1 places.' },

    { kind: 'example', title: 'Eight sprinters, a three-medal podium: count the finishing orders, then re-derive the number from the formula', steps: [
      'The podium is an arrangement: gold, silver and bronze are three distinct places, and Ana–Bo–Chi is a different outcome from Bo–Ana–Chi — order is priced, so the vacant-places engine applies with $n = 8$ pool and $r = 3$ seats.',
      'The chain: gold in 8 ways, silver in 7, bronze in 6 — so $^{8}P_{3} = 8 \\cdot 7 \\cdot 6 = 336$ finishing orders.',
      'The formula\u2019s compression: $^{8}P_{3} = \\tfrac{8!}{(8-3)!} = \\tfrac{8!}{5!} = \\tfrac{8 \\cdot 7 \\cdot 6 \\cdot 5!}{5!} = 8 \\cdot 7 \\cdot 6 = 336$ — the factorial form cancels its own tail and returns the chain.',
      'Hence, 336 podium orders — the chain and the formula agree, as they must, since the formula IS the chain with bookkeeping.' ],
    },
    { kind: 'example', title: 'If 8P_r = 6720, recover r by matching consecutive factors', steps: [
      'Set up the chain form: $^{8}P_{r} = 8 \cdot 7 \cdot 6 \cdot \ldots$ — exactly $r$ consecutive descending factors starting at 8, so the value 6720 must factor into such a chain.',
      'Factor the value into the chain: $6720 = 8 \cdot 7 \cdot 6 \cdot 5 \cdot 4$ — check the running products: $8 \cdot 7 = 56$, then $56 \cdot 6 = 336$, then $336 \cdot 5 = 1680$, then $1680 \cdot 4 = 6720$.',
      'Count the factors: five consecutive factors, so $r = 5$ — and the chain is the whole test, because no other run starting at 8 lands on 6720: four factors stop at $1680 = \\,^{8}P_{4}$, six factors reach $8 \\cdot 7 \\cdot 6 \\cdot 5 \\cdot 4 \\cdot 3 = 20160 = \\,^{8}P_{6}$, and only the whole pool $r = 8$ climbs to $8! = 40320$.',
      'Cross-check by the factorial form: $^{8}P_{5} = \tfrac{8!}{(8-5)!} = \tfrac{40320}{3!} = \tfrac{40320}{6} = 6720$ — the tail $(8-5)! = 3! = 6$ cancels and leaves exactly the five top factors of $8!$.',
      'Hence, $r = 5$.' ],
    },
    { kind: 'example', title: 'A shelf of six different books: count the shelf orders, and witness nPn = n! and the 0! agreement', steps: [
      'Six books, six shelf slots — every slot is a place and every book an object: $n = r = 6$, the whole-pool case.',
      'The chain: slot 1 in 6 ways, slot 2 in 5, then 4, 3, 2, 1 — so $^{6}P_{6} = 6 \\cdot 5 \\cdot 4 \\cdot 3 \\cdot 2 \\cdot 1 = 720$ shelf orders.',
      'The factorial read: $^{6}P_{6} = 6! = 720$ — the arrangement count of ALL objects is the factorial itself, which is why 6.2 called $n!$ the bookkeeping of the shrinking chain.',
      'The consistency check: the formula at $r = n$ reads $\\tfrac{n!}{0!} = n!$, so it AGREES with the $0! = 1$ convention of 6.2 — the empty product is not an extra assumption here, it is what makes one formula cover both $r < n$ and $r = n$.',
      'Hence, 720 orders — and the same count governs any "arrange everything" question: a queue of six, an ordering of six tasks, a ranking of six candidates.' ],
    },
    { kind: 'example', title: 'A signal mast with four different flags: count the signals that use any number of flags', steps: [
      'Name the fork: a signal is a vertical arrangement of one or more flags, order read top to bottom — an arrangement, but the LENGTH is free, so split by length and add: the addition rule of 6.1 (disjoint alternatives: a one-flag signal is never a two-flag signal).',
      'One flag: $^{4}P_{1} = 4$ signals. Two flags: $^{4}P_{2} = 4 \\cdot 3 = 12$. Three: $^{4}P_{3} = 4 \\cdot 3 \\cdot 2 = 24$. Four: $^{4}P_{4} = 4! = 24$.',
      'Add the disjoint lengths: $4 + 12 + 24 + 24 = 64$ signals.',
      'Hence, 64 signals — the "any number of objects" family is always an ADDITION of permutation counts, one term per allowed length; the census at $n = 2$ (flags $\\{$up, down$\\}$: $2 + 2 = 4$ signals, listed as up, down, up-over-down, down-over-up) keeps the model honest.' ],
    },

    { kind: 'heading', text: 'Repetition Allowed: the n^r Census' },
    { kind: 'para', text: 'The vacant-places engine has a hidden hypothesis: each placement REMOVES an object from the pool. Lift that hypothesis and the count changes character entirely. A 3-digit entry code is built from the digits $\\{1, 2, 3\\}$ and a digit may REPEAT — then every place is filled from the full pool: 3 ways, 3 ways, 3 ways, and the multiplication rule of 6.1 gives $3 \\cdot 3 \\cdot 3 = 9$ codes, listed in full: $11, 12, 13, 21, 22, 23, 31, 32, 33$. Without repetition the same seats give only the six $12, 13, 21, 23, 31, 32$ — the pool shrinks each seat. SAME multiplication rule, DIFFERENT stage-counts: the with-repetition chain never shrinks, so $r$ seats each in $n$ ways give $n^r$.' },
    { kind: 'derivation', title: 'The with-repetition count n to the r', statement: 'The number of arrangements of $r$ places from $n$ distinct objects, when each object may be used any number of times, is $n^r$.', steps: [
      { label: 'Re-read the seats', formula: '\\square \\ \\square \\ \\cdots \\ \\square \\quad (r \\text{ places}), \\quad \\text{pool } = \\{a_1, \\ldots, a_n\\} \\text{ intact at every seat}', explanation: 'The same vacant-places picture, one hypothesis lifted: placing an object does NOT remove it. The pool has all $n$ objects available at every seat — a digit dial that never wears out.' },
      { label: 'Price every place the same', formula: 'n \\text{ ways}, \\ n \\text{ ways}, \\ \\ldots, \\ n \\text{ ways} \\quad (r \\text{ times})', explanation: 'No shrinking: each of the $r$ places independently admits any of the $n$ objects. The census pins it at $n = 3$, $r = 2$: the nine codes $11, 12, 13, 21, 22, 23, 31, 32, 33$ — three per first digit, and the three of them that repeat a digit ($11, 22, 33$) are exactly the ones the permutation count $^{3}P_{2} = 6$ cannot see.' },
      { label: 'Close the chain', formula: 'n \\cdot n \\cdots n \\ (r \\text{ factors}) = n^{r}', explanation: 'The multiplication rule again — 6.1\u2019s engine, not a new one. Note what this count is NOT: it is not a permutation formula, because the objects need not be distinct across seats; it is the free-seat census, the same shape that priced 6.1\u2019s answer sheets.' },
      { label: 'Tell the two apart by the census', formula: '3^{2} = 9 \\ \\text{vs}\\ ^{3}P_{2} = 6; \\qquad 10^{4} = 10000 \\ \\text{vs}\\ ^{10}P_{4} = 5040', explanation: 'The honest discriminator is never the formula — it is the question: does using an object remove it from the pool? Codes with repetition allowed: $n^r$. Podiums, queues, anagrams of a fixed word: the pool shrinks, $^{n}P_{r}$. At the PIN machine, four digits from $\\{0, \\ldots, 9\\}$: $10^{4} = 10000$ possible PINs with repetition, but only $^{10}P_{4} = 5040$ if the machine refuses a repeated digit — both numbers are correct under their own hypotheses.' },
    ], result: '$\\text{with repetition: } n^{r}$ $\\qquad$ $\\text{without: } ^{n}P_{r} = \\tfrac{n!}{(n-r)!}$ $\\qquad$ the census decides, never the memory' },
    { kind: 'equation', latex: 'n^{r} = \\underbrace{n \\cdot n \\cdots n}_{r \\text{ factors}} \\tag{3}', note: 'repetition allowed — every seat free, the pool never shrinks; 6.1\u2019s chain with constant stage-counts.' },
    { kind: 'formula', name: 'The with-repetition arrangement count', latex: 'n^{r} \\quad \\text{(each object usable any number of times)}', note: 'r seats, each facing the full pool of n — codes, answer sheets, toss sequences. Told apart from the permutation count by one question: does a used object leave the pool?' },
    { kind: 'table', caption: 'The repetition census: same seats, both hypotheses, every value recomputed by the engines before this prose was written. The two counts agree only at r = 1, where no repeat is possible; from r = 2 on, the with-repetition count strictly exceeds the permutation count, and the gap widens fast.', head: ['Pool and seats', 'With repetition', 'Without (nPr)', 'Read'], rows: [
      ['3 objects, 2 seats', '$3^{2} = 9$ codes', '$^{3}P_{2} = 6$', 'the three doubles 11, 22, 33 are the difference'],
      ['2 objects, 3 seats', '$2^{3} = 8$ strings', 'none ($r > n$)', 'a shrinking pool empties before the third seat'],
      ['4 objects, 3 seats', '$4^{3} = 64$ codes', '$^{4}P_{3} = 24$', '24 of the 64 — three-eighths — repeat no digit'],
      ['10 digits, 4 seats', '$10^{4} = 10000$ PINs', '$^{10}P_{4} = 5040$', 'the PIN machine\u2019s two regimes'],
      ['26 letters, 4 seats', '$26^{4} = 456976$', '$^{26}P_{4} = 358800$', 'letter codes with and without reuse'],
    ] },
    { kind: 'example', title: 'A licence plate design: two different letters followed by three different digits — price it, then price the repetition-allowed variant', steps: [
      'The design says DIFFERENT twice: within the letters and within the digits the pool shrinks — a no-repetition question in two blocks.',
      'The letter block: two seats from 26 letters, no reuse: $^{26}P_{2} = 26 \\cdot 25 = 650$.',
      'The digit block: three seats from the 9 digits $\\{1, \\ldots, 9\\}$, no reuse: $^{9}P_{3} = 9 \\cdot 8 \\cdot 7 = 504$.',
      'The plates chain the two blocks — every letter pair pairs with every digit triple — so the multiplication rule gives $650 \\cdot 504 = 327600$ plates.',
      'The repetition-allowed variant: $26^{2} \\cdot 9^{3} = 676 \\cdot 729 = 492804$ plates — strictly more, because reused letters and digits become possible ($\\text{AA-111}$ joins the registry).',
      'Hence, 327600 plates under the design as written, 492804 if repetition is allowed — the two regimes differ by 165204 plates, every one of which repeats something.' ],
    },
    { kind: 'callout', tone: 'warn', title: 'Which count does the question want?', text: 'The examination trap is a silent swap of hypotheses. "A four-digit code is formed from the digits 1 to 5" — repetition allowed or not? The honest reader looks for the words: "digits may repeat" gives $5^{4} = 625$; "no digit is repeated" gives $^{5}P_{4} = 120$; NEITHER reading may be assumed — and if the question is genuinely silent, the disciplined answer prices both. The census of $\\{1, 2, 3\\}$ two at a time (9 with repetition, 6 without) is the ten-second sanity check that has caught this fraud in every paper it has appeared in.' },

    { kind: 'heading', text: 'Permutation when All Objects are Not Distinct: the Overcount Division' },
    { kind: 'para', text: 'Every count so far priced DISTINCT objects — and the formula\u2019s derivation demanded it (the pool\u2019s content mattered only through its size because the objects were all different). Break that hypothesis and the count must shrink: arrange the three letters $\\{G, O, O\\}$ and the honest census lists THREE arrangements — $GOO$, $OGO$, $OOG$ — not the six $3! = 6$ that distinct objects would give. What died is not the engine but the labels: the two O\u2019s are interchangeable, so the six distinct-labelled arrangements collapse in pairs. The craft that prices this collapse is the OVERCOUNT DIVISION — and its general law is the fourth station of this lesson.' },
    { kind: 'list', marker: 'roman', items: [
      '(i) the multiset $\\{G, O, O\\}$: $GOO$, $OGO$, $OOG$ — three arrangements $= \\tfrac{3!}{2!} = 3$ (the twin O\u2019s halve the distinct count);',
      '(ii) the multiset $\\{L, E, E, D\\}$: the twelve arrangements are $DEEL$, $DELE$, $DLEE$, $EDEL$, $EDLE$, $EEDL$, $EELD$, $ELDE$, $ELED$, $LDEE$, $LEDE$, $LEED$ — the count is $\\tfrac{4!}{2!} = 12$, and the hand list licenses the formula before it is trusted;',
      '(iii) the multiset $\\{D, D, K, K\\}$: $DDKK$, $DKDK$, $DKKD$, $KDDK$, $KDKD$, $KKDD$ — six arrangements $= \\tfrac{4!}{2!\\,2!} = 6$ (TWO twin pairs, TWO divisions);',
      '(iv) the multiset $\\{T, O, M, A, T, O\\}$: $\\tfrac{6!}{2!\\,2!} = 180$ arrangements — too many to list, which is exactly when the formula earns its keep; the census at (i)–(iii) is what licensed it.',
    ] },
    { kind: 'figure', caption: 'The overcount division on the multiset D, D, K, K. Left: stamping the two D\u2019s and the two K\u2019s distinct (subscripted labels) turns the 6 honest arrangements into 4! = 24 labelled ones — each honest arrangement fans into 2! × 2! = 4 stampings, the four swaps of its twins\u2019 labels. Right: the census row — 6 arrangements × 4 stampings each = 24 = 4! — so the honest count is the overcount divided: 4!/(2!·2!) = 6. The division is exact because the stampings are evenly sized: every honest arrangement has exactly the same 4 label-swaps.', svg: overcountDivisionSvg() },
    { kind: 'derivation', title: 'Arrangements of alike things, by the overcount division', statement: 'Of $n$ objects, suppose $p$ are alike of one kind, $q$ alike of a second, $s$ alike of a third, and the rest distinct. The number of distinct arrangements of all $n$ objects is $\\tfrac{n!}{p!\\,q!\\,s!\\,\\cdots}$.', steps: [
      { label: 'Count the stamped world first', formula: '\\text{distinct-labelled arrangements} = n!', explanation: 'Temporarily STAMP the alike objects distinct: give the $p$ twins subscripts, the $q$ twins subscripts, and so on — every object now distinct, so the whole pool of $n$ arranges in $n!$ ways, the proved whole-pool count. This is an overcount of the honest question, but a COUNTABLE one.' },
      { label: 'Group the stamped arrangements by their honest shape', formula: 'x \\ \\text{honest arrangements} \\times p!\\,q!\\,s! \\cdots \\ \\text{stampings each} = n!', explanation: 'Take any honest arrangement — say the stamped version of some seating. Its $p$ stamped twins can be re-stamped in $p!$ orders among themselves, its $q$ in $q!$, its $s$ in $s!$, all independently — so EACH honest arrangement owns exactly $p!\\,q!\\,s! \\cdots$ labelled versions, and every one of the $n!$ labelled arrangements belongs to exactly one honest shape (erase the subscripts to see which).' },
      { label: 'Divide the overcount out', formula: 'x = \\dfrac{n!}{p!\\,q!\\,s! \\cdots}', explanation: 'The grouping is even — every honest arrangement owns the SAME number of labelled versions — so the division is exact, not an estimate. The exhibits pin it: $\\{G, O, O\\}$ has $x \\cdot 2! = 3! = 6$, so $x = 3$ — and the census listed exactly $GOO, OGO, OOG$. $\\{D, D, K, K\\}$ has $x \\cdot 2! \\cdot 2! = 4! = 24$, so $x = 6$ — and the census listed exactly the six.' },
      { label: 'Read the division honestly', formula: '\\text{all distinct} \\iff p = q = s = \\cdots = 1: \\ \\dfrac{n!}{1!\\,1! \\cdots} = n!', explanation: 'The law closes the circle: with no twins the divisions are all $1! = 1$ and the count returns the whole-pool $n!$ — the distinct case was the special case all along, which is the healthiest structure a formula can have.' },
    ], result: '$\\text{alike arrangements} = \\tfrac{n!}{p!\\,q!\\,s!\\cdots}$ $\\qquad$ the overcount, divided out exactly' },
    { kind: 'equation', latex: 'x = \\dfrac{n!}{p!\\,q!\\,s! \\cdots} \\tag{4}', note: 'n objects of which p, q, s, … are alike in groups, the rest distinct — the stamped overcount n! divided by every group\u2019s stampings.' },
    { kind: 'formula', name: 'The alike-things arrangement count', latex: '\\dfrac{n!}{p!\\,q!\\,s!\\cdots} \\quad (p + q + s + \\cdots \\le n, \\text{ the rest distinct})', note: 'arrange everything, twins interchangeable: overcount to n factorial by stamping, then divide by each group\u2019s stampings. The 2-alike-of-3 census (three arrangements, not six) is the exhibit that licenses it.' },
    { kind: 'table', caption: 'The alike-things census, every count verified by literal enumeration in the engine before this prose was written. The TOMATO and WALLABY rows are the working sizes — words a solver actually meets; the first three rows are the hand-listed exhibits that license the formula.', head: ['Multiset', 'Arrangements', 'Formula read'], rows: [
      ['$\\{G, O, O\\}$', '$3$', '$\\tfrac{3!}{2!}$ — one twin pair'],
      ['$\\{L, E, E, D\\}$', '$12$', '$\\tfrac{4!}{2!}$ — one twin pair'],
      ['$\\{D, D, K, K\\}$', '$6$', '$\\tfrac{4!}{2!\\,2!}$ — two twin pairs'],
      ['$\\{T, O, M, A, T, O\\}$', '$180$', '$\\tfrac{6!}{2!\\,2!}$ — two twin pairs'],
      ['$\\{W, A, L, L, A, B, Y\\}$', '$1260$', '$\\tfrac{7!}{2!\\,2!}$ — A and L both twin'],
      ['$\\{P, E, P, P, E, R\\}$', '$60$', '$\\tfrac{6!}{3!\\,2!}$ — a triplet and a pair'],
    ] },
    { kind: 'example', title: 'Count the distinct arrangements of all the letters of WALLABY, then of MAMMA', steps: [
      'Census the letters of WALLABY: $W, A, L, L, A, B, Y$ — one $W$, two $A$\u2019s, two $L$\u2019s, one $B$, one $Y$: $n = 7$ with twin groups $p = 2$ (A\u2019s) and $q = 2$ (L\u2019s).',
      'The overcount division: $\\tfrac{7!}{2!\\,2!} = \\tfrac{5040}{4} = 1260$ arrangements — stamp the A\u2019s $A_1, A_2$ and the L\u2019s $L_1, L_2$ and the count would be the full $7! = 5040$; each honest arrangement owns $2 \\cdot 2 = 4$ stampings, so divide.',
      'Census the letters of MAMMA: $M, A, M, M, A$ — three $M$\u2019s and two $A$\u2019s, $n = 5$.',
      'The division: $\\tfrac{5!}{3!\\,2!} = \\tfrac{120}{6 \\cdot 2} = 10$ arrangements — a triplet and a pair divide the stamped count 120 down to 10, and the engine\u2019s literal enumeration confirms the ten.',
      'Hence, WALLABY gives 1260 and MAMMA gives 10 — the sharper the twinning, the deeper the division; MAMMA collapses 120 stamped arrangements onto just 10 honest ones.' ],
    },
    { kind: 'example', title: 'TOMATO: arrangements with the two O\u2019s never together, priced by the complement', steps: [
      'Census the letters: $T, O, M, A, T, O$ — two $T$\u2019s, two $O$\u2019s, one $M$, one $A$: $n = 6$, two twin pairs.',
      'The unrestricted count: $\\tfrac{6!}{2!\\,2!} = \\tfrac{720}{4} = 180$ arrangements of all six letters.',
      'The bad family — the two O\u2019s TOGETHER: bundle $\\langle OO\\rangle$ into one object, so the row is $\\{T, T, M, A, \\langle OO\\rangle\\}$ — five objects with the T\u2019s twin, so $\\tfrac{5!}{2!} = 60$ arrangements carry the O\u2019s adjacent.',
      'The complement — the seed 6.1 planted, total minus bad: $180 - 60 = 120$ arrangements with the O\u2019s never adjacent.',
      'The engine cross-checks both families by literal enumeration of all 180 arrangements: exactly 60 contain the block OO and exactly 120 do not — the census discipline, machine-run.',
      'Hence, 120 arrangements — and the same complement shape prices "never together" on any pair; lesson 6.4 builds the fuller gap method it generalizes into.' ],
    },
    { kind: 'callout', tone: 'insight', title: 'The overcount division is an engine, not a one-off', text: 'Stamp, count, divide — the pattern has just been born and it will carry this whole chapter. The circle of lesson 6.4 divides by $n$ because each circular arrangement fans into $n$ linear ones; the necklace divides by $2n$; lesson 6.6\u2019s equal-size groups divide by $k!$; the derangement formula divides nothing but is BUILT from overcounts of exactly this stamped kind. Whenever a count is too big by a KNOWN, EVEN factor, divide it out — the only proof obligation is that every honest object owns the same number of stamped versions, the evenness this derivation\u2019s second step checked.' },

    { kind: 'heading', text: 'The Dictionary-Rank Ladder' },
    { kind: 'para', text: 'The last station turns the counting engine into a LOCATING tool. Write out all $6$ arrangements of the letters $\\{A, B, C\\}$ in alphabetical order — as a dictionary would: $ABC, ACB, BAC, BCA, CAB, CBA$. The word $CAB$ sits FIFTH in that list, and its RANK is 5. The dictionary question is always the same: among all arrangements of a word\u2019s own letters, sorted, where does the word itself sit? The brute-force answer — write all $n!$ and count down — dies at $n = 6$ already ($720$ lines); the ladder prices the position without ever writing the list, and its engine is nothing but this lesson\u2019s own counts.' },
    { kind: 'figure', caption: 'The dictionary page of the letters A, B, C: the six arrangements listed alphabetically, rank numbers on the right. CAB sits fifth — one plus the four words before it (ABC, ACB, BAC, BCA). The rank formula in miniature: rank = 1 + the words-before count, and the four words before CAB are exactly the two starting with A, plus the two starting with B — the ladder\u2019s rungs already visible at n = 3.', svg: dictionaryPageSvg() },
    { kind: 'derivation', title: 'The dictionary-rank ladder', statement: 'Among the arrangements of a word\u2019s letters, sorted alphabetically, the rank of the word is $1 + (\\text{the number of arrangements before it})$, and the before-count splits by first letters, then by second letters, and so on — each rung priced by this lesson\u2019s own counts.', steps: [
      { label: 'State the split', formula: '\\text{rank} = 1 + \\#\\{\\text{arrangements} < \\text{the word}\\}', explanation: 'A list sorted alphabetically places the word after every arrangement strictly smaller than it and before every larger one — so its position is one more than the count of smaller arrangements. That count is the whole job; the "+1" is the word itself, the slip the engines were built to catch.' },
      { label: 'Rung one, the first letter', formula: '\\sum_{\\ell \\,<\\, \\text{first letter}} (\\text{arrangements of the remaining letters}), \\quad \\text{then fix the first letter}', explanation: 'Every arrangement starting with a letter alphabetically smaller than the word\u2019s first letter is smaller than the word — regardless of the rest. Those arrangements count by the remaining letters: distinct case $\\Rightarrow (n-1)!$, alike case $\\Rightarrow$ the overcount division on what is left. Then FIX the word\u2019s own first letter and move to seat two.' },
      { label: 'Rung k, the same move one seat deeper', formula: '\\text{at seat } k: \\ \\sum_{\\ell \\,<\\, w_k} (\\text{arrangements of what is left}) \\ \\text{after the prefix is fixed}', explanation: 'With the prefix fixed, the arrangements still smaller are exactly those agreeing on the prefix but placing a smaller letter at seat $k$ — count each such letter\u2019s continuation by the remaining multiset (the division again, if the leftovers repeat). Sum over every unused letter smaller than the word\u2019s — the classic slip is missing one that sits BETWEEN two letters being compared.' },
      { label: 'Close the ladder', formula: '\\text{before-count} = \\sum_{\\text{seats } k} \\sum_{\\ell \\,\\text{unused},\\ \\ell \\,<\\, w_k} (\\text{arrangements of the unused letters after choosing } \\ell)', explanation: 'The rungs are disjoint (different prefixes) and exhaustive (every smaller arrangement differs from the word first at exactly one seat) — so the sum is the whole before-count, and the rank is one more. The engine\u2019s brute force — literally generating and sorting all arrangements — is the census this formula answers to.' },
    ], result: '$\\text{rank} = 1 + \\text{(words before)}$ $\\qquad$ $\\text{words before} = \\sum_{\\text{seats}} \\sum_{\\ell < w_k} (\\text{continuations})$' },
    { kind: 'equation', latex: '\\text{rank of } w = 1 + \\sum_{k=1}^{n} \\sum_{\\substack{\\ell \\text{ unused} \\\\ \\ell \\,<\\, w_k}} N(\\text{leftover multiset after } \\ell) \\tag{5}', note: 'the dictionary rank: one plus the before-count; each rung prices the continuations of every unused letter smaller than the word\u2019s letter at that seat, the prefix fixed.' },
    { kind: 'formula', name: 'The dictionary rank', latex: '\\text{rank} = 1 + (\\text{words-before count})', note: 'the word\u2019s position among the alphabetical arrangements of its own letters; priced seat by seat down the ladder, each rung counting continuations of smaller unused letters. Never forget the plus one.' },
    { kind: 'example', title: 'Find the rank of the word WHALE among the arrangements of its letters', steps: [
      'Census the letters: $W, H, A, L, E$ — all five distinct, so $5! = 120$ arrangements in the dictionary, and the ladder\u2019s rungs are plain factorials of the leftovers.',
      'Seat one, first letter $W$: unused letters smaller than $W$ are $A, E, H, L$ — four letters, each starting $4! = 24$ arrangements: $4 \\cdot 24 = 96$ words before that start with a smaller letter. Fix $W$.',
      'Seat two, second letter $H$: unused now $\\{H, A, L, E\\}$, smaller than $H$ are $A, E$ — two letters, each starting $3! = 6$: $12$ more. Fix $WH$.',
      'Seat three, third letter $A$: unused $\\{A, L, E\\}$, nothing is smaller than $A$: zero. Fix $WHA$.',
      'Seat four, fourth letter $L$: unused $\\{L, E\\}$, smaller than $L$ is $E$ — it starts $1! = 1$ arrangement, namely $WHAEL$: one more. Fix $WHAL$.',
      'Seat five, last letter $E$: nothing remains to compare: zero. The before-count is $96 + 12 + 0 + 1 + 0 = 109$.',
      'Hence, the rank of WHALE is $109 + 1 = 110$ — and the engine\u2019s brute force, sorting all 120 arrangements literally, places WHALE at exactly position 110.' ],
    },
    { kind: 'table', caption: 'The WHALE ladder, rung by rung — the working shape of the rank craft on a five-letter distinct word. Each rung fixes one more letter and prices the smaller-letter continuations; the before-count is the rung sum, the rank one more.', head: ['Seat', 'Letter of WHALE', 'Unused letters before it', 'Arrangements each', 'Rung contribution'], rows: [
      ['1', '$W$', '$A, E, H, L$ (4)', '$4! = 24$', '$4 \\times 24 = 96$'],
      ['2', '$H$', '$A, E$ (2)', '$3! = 6$', '$2 \\times 6 = 12$'],
      ['3', '$A$', 'none', '$2! = 2$', '$0$'],
      ['4', '$L$', '$E$ (1)', '$1! = 1$', '$1$'],
      ['5', '$E$', 'none', '$0! = 1$', '$0$'],
      ['—', 'before-count $96 + 12 + 0 + 1 + 0 = 109$', '—', '—', 'rank $= 109 + 1 = 110$'],
    ] },
    { kind: 'example', title: 'Find the rank of the word SASSY among the arrangements of its letters', steps: [
      'Census the letters: $S, A, S, S, Y$ — three $S$\u2019s, one $A$, one $Y$: $n = 5$ with a triplet, so $\\tfrac{5!}{3!} = 20$ arrangements in the dictionary, and the rungs carry the overcount division.',
      'Seat one, first letter $S$: unused letters smaller than $S$ — only $A$: arrangements of $\\{S, S, S, Y\\}$ are $\\tfrac{4!}{3!} = 4$: four words before start with $A$. Fix $S$.',
      'Seat two, second letter $A$: unused $\\{S, S, Y\\}$ — nothing smaller than $A$: zero. Fix $SA$.',
      'Seat three, third letter $S$: unused $\\{S, S, Y\\}$, nothing smaller than $S$: zero. Fix $SAS$.',
      'Seat four, fourth letter $S$: unused $\\{S, Y\\}$, nothing smaller: zero. Fix $SASS$.',
      'Seat five, last letter $Y$: unused $\\{Y\\}$, nothing smaller: zero. The before-count is $4 + 0 + 0 + 0 + 0 = 4$.',
      'Hence, the rank of SASSY is $4 + 1 = 5$ — the engine\u2019s literal sort of the twenty arrangements confirms position 5, and note how the triplet shrank every rung: four words before, not the distinct-world $1 \\cdot 4! = 24$.' ],
    },
    { kind: 'example', title: 'Exam-style: find the rank of the word PEPPER among the arrangements of its letters', steps: [
      'Census the letters: $P, E, P, P, E, R$ — three $P$\u2019s, two $E$\u2019s, one $R$: $\\tfrac{6!}{3!\\,2!} = 60$ arrangements in the dictionary.',
      'Seat one, first letter $P$: unused smaller letters — only $E$: arrangements of $\\{P, P, P, E, R\\}$ are $\\tfrac{5!}{3!} = 20$: twenty words before start with $E$. Fix $P$.',
      'Seat two, second letter $E$: unused $\\{P, P, E, R\\}$, nothing smaller than $E$: zero. Fix $PE$.',
      'Seat three, third letter $P$: unused $\\{P, E, P, R\\}$ — that is $\\{P, P, E, R\\}$; smaller than $P$ is $E$: fixing $PEE$ leaves $\\{P, P, R\\}$, whose arrangements number $\\tfrac{3!}{2!} = 3$: three more. Fix $PEP$.',
      'Seat four, fourth letter $P$: unused $\\{P, E, R\\}$, smaller than $P$ is $E$: fixing $PEPE$ leaves $\\{P, R\\}$ — $2$ arrangements: two more. Fix $PEPP$.',
      'Seat five, fifth letter $E$: unused $\\{E, R\\}$, nothing smaller than $E$: zero — THIS is the rung where a hand count adds a phantom "+1": the word\u2019s own letter is the alphabetically smallest left, so NOTHING at all precedes it, and the rung contributes exactly zero. Fix $PEPPE$.',
      'Seat six, last letter $R$: unused $\\{R\\}$, nothing smaller: zero. The before-count is $20 + 0 + 3 + 2 + 0 + 0 = 25$.',
      'Hence, the rank of PEPPER is $25 + 1 = 26$ — brute-forced by the engine\u2019s literal sort of all 60 arrangements, and the exam-shaped moral: alike letters shrink the rungs (factorial-of-leftovers, not plain factorials), and the "+1" survives every rung that happens to be empty.' ],
    },
    { kind: 'callout', tone: 'warn', title: 'The two classic ladder slips', text: 'Slip one: at a middle seat, forgetting an unused letter that sits BETWEEN two letters being compared — the second seat of the word KNEEL below (letter $N$) has BOTH $E$ and $L$ smaller than it, and the $L$ is the one a hurried solver misses ($L$ sits between $E$ and $N$ in the alphabet); the rung then undercounts by $\\tfrac{3!}{2!} = 3$ and the rank is wrong by exactly that. Slip two: forgetting the final $+1$ — reporting the before-count as the rank; the difference is one position, which is enough. The cure for both is the census: at $n \\le 5$ the engine (or the hand) lists the whole dictionary, and the ladder that disagrees with the list is the ladder that was built wrong.' },

    { kind: 'heading', text: 'Where the Engine Sits' },
    { kind: 'callout', tone: 'exam', title: 'Where this sits in the examinations', text: 'This lesson\u2019s ground is REAL exam ground, and it is labelled honestly: the JEE (Main) 2026 mathematics unit list carries permutations and combinations as its own unit (unit 4 of the banked syllabus audit) — the chain-solve items (find r given a value of nPr), the repetition/no-repetition code items, the alike-arrangement word items and the dictionary-rank items are all unit residents. The school canon underneath is NCERT class 11 chapter 6 "Permutations and Combinations"; the classic stretch is Hall and Knight\u2019s Higher Algebra chapter XI, whose permutation sections run exactly this vacant-places ladder; Khattar\u2019s quantitative-aptitude corner prices the same counts at exam speed (code and signal items). The module\u2019s own exercise typology — Single Correct, Multiple Correct, Linked Comprehension, Matrix Match, Numerical Value — is the typology this lesson\u2019s L4–L6 sets mirror. Every item below is our own design, labelled exam-style, never lifted from any paper.' },
    { kind: 'callout', tone: 'historical', title: 'The oldest priced count on record', text: 'Arrangement counting is the oldest piece of combinatorics there is: Bhāskara II\u2019s twelfth-century LILAVATI prices the permutations of the six flavours of a dish — the ṣaḍ-rasa count, all six at a time — which is $6! = 720$, a full factorial priced half a millennium before Europe\u2019s combinatorics took its systematic shape. Leibniz\u2019s 1666 DE ARTE COMBINATORIA then made the subject a discipline — arrangements and selections together — and the $n!/(n-r)!$ compression rides every modern paper. The notation $^{n}P_{r}$ itself is a textbook convention of the Indian competitive canon (the NCERT line); nothing in the mathematics waits on the symbols.' },
    { kind: 'para', text: 'What waits ahead, in order. Lesson 6.4, "Circular and Restricted Permutations", prices the two restriction families (always-together bundles, never-together gaps) at full strength and moves to the round table — where the overcount division you just learned does the heaviest lifting: each circular arrangement fans into $n$ linear ones, so $(n-1)!$ — and to necklaces, where a further division by 2 waits. Lesson 6.5, "Combinations: the Selection Count", builds the selection engine from this lesson\u2019s arrangement count — $^{n}P_{r} = \\,^{n}C_{r} \\cdot r!$, the select-then-arrange split the order-pairing insight above promised — and re-reads 6.2\u2019s algebraic properties of $^{n}C_{r}$ as selection facts. Lesson 6.6, "Distributions and the Classic Counting Puzzles", runs the puzzle room where these counts interlock; the unit review walks the chapter\u2019s decision map. And the destination the whole book\u2019s positioning names: Probability — the counted universe you are building here, arrangement by arrangement, is exactly the sample space Probability inherits; every denominator you will ever compute there is one of the counts this chapter prices.' },

    { kind: 'terms', items: [
      { term: 'Permutation', def: 'an arrangement of objects in which order is priced — a filling of distinct places; swapping two objects makes a new arrangement. Counted for distinct objects taken r at a time by the vacant-places chain.' },
      { term: 'Permutation of n distinct objects taken r at a time', def: 'the ordered arrangements of r objects chosen from a pool of n distinct objects; the count is written nPr and equals n(n−1)…(n−r+1) = n!/(n−r)!.' },
      { term: 'The r vacant places', def: 'the derivation picture for nPr: a row of r empty seats filled left to right from a pool of n, the pool shrinking by one each seat — n, n−1, …, n−r+1 ways, closed by the multiplication rule of lesson 6.1.' },
      { term: 'Repetition allowed (n to the r)', def: 'the with-repetition count n^r: every seat faces the full pool, nothing shrinks — told apart from nPr by the question of whether a used object leaves the pool; the small-case census catches every silent swap.' },
      { term: 'Alike objects and the overcount division', def: 'for n objects with p, q, s, … alike in groups, the distinct arrangements of all n number n!/(p!q!s!…) — stamped distinct, the count overcounts to n!, and each honest arrangement owns exactly p!q!s!… stampings, so the division is exact.' },
      { term: 'Dictionary rank', def: 'the position of a word among the alphabetical arrangements of its own letters: rank = 1 + the words-before count, priced seat by seat — each rung counts the continuations of every unused letter smaller than the word\u2019s letter at that seat.' },
      { term: 'The before-count', def: 'the number of arrangements alphabetically smaller than the word — the ladder\u2019s rung sum; the classic slips are a missed letter sitting between two compared letters, and forgetting the final +1.' },
      { term: 'The first-seat peel', def: 'the recurrence nPr = n · (n−1)P(r−1): place any of the n objects in the first seat, then run the same problem on the survivors — the formula\u2019s own self-similarity, proved in the exercises.' },
      { term: 'The complement read', def: 'total minus bad — counting the arrangements where a forbidden pattern DOES occur, then subtracting from the unrestricted total; priced here on never-together pairs, cashed at full strength in lesson 6.4\u2019s gap method.' },
      { term: 'Small-case census', def: 'the chapter\u2019s standing discipline: list the arrangements of a case small enough to write out (three letters, two seats) before trusting any formula — the wrong-model catcher that every derivation above answers to.' },
    ] },

    { kind: 'quiz', title: 'Check yourself: permutations, the arrangement count', items: [
      { q: 'The value of $^{8}P_{3}$ is:', options: ['$336$', '$512$', '$24$', '$56$'], answer: 0, explain: 'The chain: three seats from eight distinct objects — $8 \\cdot 7 \\cdot 6 = 336$ (option A); the factorial form $\\tfrac{8!}{5!}$ cancels its own tail and returns the same. Option B\u2019s $512 = 8^{3}$ is the WITH-REPETITION count — each seat free, the pool never shrinking; a podium shrinks it. Option C\u2019s $24 = 8 \\cdot 3$ is the seats-times-pool swap, multiplying the places by the objects instead of chaining. Option D\u2019s $56 = \\tfrac{8 \\cdot 7}{2} = \\,^{8}C_{3}$ is the SELECTION count — order ignored — which is lesson 6.5\u2019s number wearing this lesson\u2019s clothes.' },
      { q: 'Three-digit entry codes are built from the digits $\\{1, 2, 3, 4\\}$ and a digit MAY repeat. The number of codes is:', options: ['$24$', '$64$', '$12$', '$81$'], answer: 1, explain: 'Repetition allowed means every seat faces the full pool of 4: $4^{3} = 64$ (option B). Option A\u2019s $24 = \\,^{4}P_{3} = 4 \\cdot 3 \\cdot 2$ is the NO-repetition count — the pool shrinks each seat; the question\u2019s "may repeat" is precisely the hypothesis it drops. Option C\u2019s $12 = 4 \\cdot 3$ chains only two seats — the third seat forgotten mid-chain. Option D\u2019s $81 = 3^{4}$ swaps the roles: three objects into four seats — the seats/objects exchange, a pure role-reversal fraud.' },
      { q: 'The number of distinct arrangements of ALL the letters of PUZZLE is:', options: ['$720$', '$180$', '$360$', '$120$'], answer: 2, explain: 'PUZZLE has six letters with one twin pair — $Z \\times 2$ — so the count is $\\tfrac{6!}{2!} = 360$ (option C): stamp the two Z\u2019s distinct and you would have $720$; each honest arrangement owns $2$ stampings, so divide. Option A\u2019s $720 = 6!$ forgets the division entirely — the distinct-objects count. Option B\u2019s $180 = \\tfrac{6!}{2!\\,2!}$ divides TWICE, as if a second pair existed — only the Z\u2019s repeat. Option D\u2019s $120 = 5!$ seats the twin Z\u2019s as one object and arranges five — close in spirit to the together-bundle craft, but here it undercounts by ignoring the honest pair\u2019s own swap.' },
      { q: 'Among the six arrangements of the letters $\\{A, B, C\\}$ written alphabetically, the word $CAB$ sits at rank:', options: ['$4$', '$2$', '$6$', '$5$'], answer: 3, explain: 'The dictionary is $ABC, ACB, BAC, BCA, CAB, CBA$ — four words before $CAB$ (two starting with A, two starting with B), so the rank is $4 + 1 = 5$ (option D). Option A\u2019s $4$ is the before-count itself — the final +1 forgotten, the ladder\u2019s second classic slip. Option B\u2019s $2$ counts only the LETTERS before C in the alphabet, mistaken for the rank — the rung does not replace the ladder. Option C\u2019s $6$ is the total number of arrangements — the "every word shares one rank" fraud; a rank is a position, and positions run 1 to 6 here.' },
      { q: 'If $^{n}P_{2} = 56$, then $n$ is:', options: ['$7$', '$8$', '$6$', '$9$'], answer: 1, explain: 'Two seats give $n(n-1) = 56$, and $8 \\cdot 7 = 56$ — so $n = 8$ (option B); the quadratic $n^{2} - n - 56 = (n-8)(n+7)$ confirms it is the only positive root. Option A\u2019s $7$ comes from reading $7 \\cdot 8 = 56$ as $n(n+1)$ — the chain DESCENDS, $n$ then $n - 1$, never $n + 1$. Option C\u2019s $6$ gives $6 \\cdot 5 = 30 \\ne 56$ — the nearest descent that is simply too short. Option D\u2019s $9$ gives $9 \\cdot 8 = 72$ — overshooting the value by a whole factor of growth.' },
    ] },

    { kind: 'exercises', title: 'Exercises 6.3', sets: [
      { level: 'L1', questions: [
        { q: 'Compute $^{6}P_{3}$ and $^{6}P_{6}$ by the vacant-places chain, then verify each by the factorial form $\\tfrac{n!}{(n-r)!}$.', solution: [
          'The chain for $^{6}P_{3}$: three seats from six — $6 \\cdot 5 \\cdot 4 = 120$.',
          'The factorial form: $\\tfrac{6!}{(6-3)!} = \\tfrac{720}{3!} = \\tfrac{720}{6} = 120$ — the cancelled tail is $3! = 6$, and the engines check $720/6 = 120$ exactly.',
          'The chain for $^{6}P_{6}$: six seats — $6 \\cdot 5 \\cdot 4 \\cdot 3 \\cdot 2 \\cdot 1 = 720$.',
          'The factorial form: $\\tfrac{6!}{0!} = \\tfrac{720}{1} = 720$ — the $0! = 1$ convention of 6.2 is what makes one formula cover the whole-pool case, and the agreement is the check.',
          'Hence, $^{6}P_{3} = 120$ and $^{6}P_{6} = 720$, chain and formula agreeing at both.',
        ], answer: '$^{6}P_{3} = 120$, $^{6}P_{6} = 720$' },
        { q: 'List by hand every distinct arrangement of the letters of DEED and of LULL; verify each count against the overcount division.', solution: [
          'Census DEED: letters $D, E, E, D$ — two $D$\u2019s and two $E$\u2019s, $n = 4$.',
          'The honest list: $DEED$, $DEDE$, $DDEE$, $EDDE$, $EDED$, $EEDD$ — six arrangements, found by fixing the first letter (D or E) and arranging the honest remainder.',
          'The division: $\\tfrac{4!}{2!\\,2!} = \\tfrac{24}{4} = 6$ — matches the list.',
          'Census LULL: letters $L, U, L, L$ — three $L$\u2019s and one $U$, $n = 4$.',
          'The honest list: $LLLU$, $LLUL$, $LULL$, $ULLL$ — four arrangements, and the division $\\tfrac{4!}{3!} = \\tfrac{24}{6} = 4$ — matches.',
          'Hence, DEED gives 6 and LULL gives 4 — both licensed by the hand list, both priced by $\\tfrac{n!}{(\\text{twin factorials})}$.',
        ], answer: 'DEED: 6 arrangements; LULL: 4 arrangements' },
      ] },
      { level: 'L2', questions: [
        { q: 'Find the positive integer $n$ for which $^{n}P_{3} = 60$.', solution: [
          'Write the chain: $^{n}P_{3} = n(n-1)(n-2) = 60$ — three consecutive descending factors.',
          'Hunt the factorization: $60 = 5 \\cdot 4 \\cdot 3$, and the descent $5, 4, 3$ is exactly consecutive — so $n = 5$.',
          'Check nearby descents to be sure it is the only one: $4 \\cdot 3 \\cdot 2 = 24$ and $6 \\cdot 5 \\cdot 4 = 120$ bracket 60, so no other integer works.',
          'Hence, $n = 5$ — chain-matching, not quadratic-solving, is the fast engine here.',
        ], answer: '$n = 5$' },
        { q: 'From a 5-letter alphabet, count the 3-letter strings if (i) repetition is allowed, (ii) no letter is used twice; then say by how much the two counts differ.', solution: [
          'The fork: does a used letter leave the pool? In (i) it does not; in (ii) it does.',
          '(i) Every seat faces the full alphabet: $5^{3} = 125$ strings.',
          '(ii) The pool shrinks: $^{5}P_{3} = 5 \\cdot 4 \\cdot 3 = 60$ strings.',
          'The difference: $125 - 60 = 65$ — the strings that repeat a letter; the census view at $n = 3$, $r = 2$ shows the same structure: $9 - 6 = 3$ doubles.',
          'Hence, 125 with repetition, 60 without, a difference of 65.',
        ], answer: '(i) $125$; (ii) $60$; difference $65$' },
      ] },
      { level: 'L3', questions: [
        { q: 'Find the rank of the word BELLA among the arrangements of its letters.', solution: [
          'Census: $B, E, L, L, A$ — one $A$, one $B$, one $E$, two $L$\u2019s: $\\tfrac{5!}{2!} = 60$ arrangements in the dictionary.',
          'Seat one, letter $B$: unused smaller letters — only $A$: arrangements of $\\{B, E, L, L\\}$ are $\\tfrac{4!}{2!} = 12$. Fix $B$.',
          'Seat two, letter $E$: unused $\\{E, L, L, A\\}$, smaller than $E$ is $A$: arrangements of $\\{E, L, L\\}$ are $\\tfrac{3!}{2!} = 3$. Fix $BE$.',
          'Seat three, letter $L$: unused $\\{L, L, A\\}$, smaller than $L$ is $A$: arrangements of $\\{L, L\\}$ are $\\tfrac{2!}{2!} = 1$. Fix $BEL$.',
          'Seat four, letter $L$: unused $\\{L, A\\}$, smaller than $L$ is $A$: the leftover $\\{L\\}$ gives $1$ arrangement. Fix $BELL$.',
          'Seat five, letter $A$: nothing remains smaller: zero.',
          'Hence, before-count $= 12 + 3 + 1 + 1 = 17$ and the rank of BELLA is $17 + 1 = 18$ — confirmed by the engine\u2019s literal sort of all 60 arrangements.',
        ], answer: 'rank $= 18$' },
        { q: 'Count the arrangements of the letters of GRASS in which the two S\u2019s are never adjacent.', solution: [
          'Census: $G, R, A, S, S$ — one $G$, one $R$, one $A$, two $S$\u2019s: the unrestricted count is $\\tfrac{5!}{2!} = 60$.',
          'The bad family — the S\u2019s adjacent: bundle $\\langle SS\\rangle$ into one object, so the row is $\\{G, R, A, \\langle SS\\rangle\\}$ — four distinct objects, $4! = 24$ arrangements.',
          'The complement: $60 - 24 = 36$ arrangements with the S\u2019s never adjacent.',
          'The engine cross-check: literal enumeration of all 60 arrangements finds exactly 24 containing the block SS and 36 not — the census discipline, machine-run.',
          'Hence, 36 arrangements — total minus bad, the seed 6.1 planted.',
        ], answer: '$36$ arrangements' },
        { q: 'A signal mast flies six different flags; a signal is any non-empty vertical arrangement of them, order read top to bottom. Count the signals.', solution: [
          'The fork: length is free, so split by length and add — the addition rule of 6.1 on disjoint alternatives.',
          'One flag: $^{6}P_{1} = 6$. Two: $^{6}P_{2} = 6 \\cdot 5 = 30$. Three: $^{6}P_{3} = 6 \\cdot 5 \\cdot 4 = 120$. Four: $6 \\cdot 5 \\cdot 4 \\cdot 3 = 360$. Five: $6 \\cdot 5 \\cdot 4 \\cdot 3 \\cdot 2 = 720$. Six: $6! = 720$.',
          'Add the disjoint lengths: $6 + 30 + 120 + 360 + 720 + 720 = 1956$.',
          'Hence, 1956 signals — an addition of permutation counts, one term per allowed length.',
        ], answer: '$1956$ signals' },
      ] },
      { level: 'L4', questions: [
        { q: 'Exam-style (Single Correct). If $^{n}P_{4} = 12 \\cdot \\,^{n}P_{2}$, then $n$ equals: (A) $4$  (B) $5$  (C) $6$  (D) $8$. Solve with full reasoning.', solution: [
          'Write both sides as chains: $^{n}P_{4} = n(n-1)(n-2)(n-3)$ and $^{n}P_{2} = n(n-1)$.',
          'Divide out the common factor $n(n-1)$ (nonzero for $n \\geq 2$): the equation becomes $(n-2)(n-3) = 12$.',
          'Expand and solve: $n^{2} - 5n + 6 = 12$, so $n^{2} - 5n - 6 = 0$, which factors as $(n - 6)(n + 1) = 0$ — the positive root is $n = 6$.',
          'Check: at $n = 6$, $^{6}P_{4} = 6 \\cdot 5 \\cdot 4 \\cdot 3 = 360$ and $12 \\cdot \\,^{6}P_{2} = 12 \\cdot 30 = 360$ — exact.',
          'The distractors: (A) $4$ gives $(4-2)(4-3) = 2 \\ne 12$; (B) $5$ gives $3 \\cdot 2 = 6 \\ne 12$; (D) $8$ gives $6 \\cdot 5 = 30 \\ne 12$ — every wrong option is a near-miss descent, not a solution.',
          'Hence, the answer is (C) $6$.',
        ], answer: '(C) $n = 6$' },
        { q: 'Exam-style (Multiple Correct). Four distinct letters are available. Which of the following statements are TRUE? (A) the 4-letter strings with repetition allowed number $4^{4} = 256$; (B) the 4-letter strings with no letter repeated number $^{4}P_{4} = 24$; (C) the distinct arrangements of $\\{A, A, A, B\\}$ number $\\tfrac{4!}{3!} = 4$; (D) the distinct arrangements of $\\{A, A, B, B\\}$ number $\\tfrac{4!}{2!} = 12$. Identify every true statement.', solution: [
          '(A): repetition allowed — every seat faces all four letters, $4^{4} = 256$ — TRUE, and the census $2^{2} = 4$ strings from two letters (AA, AB, BA, BB) confirms the model.',
          '(B): no repetition, four seats, four letters — the whole-pool chain $4 \\cdot 3 \\cdot 2 \\cdot 1 = 24$ — TRUE, the $n = r$ case.',
          '(C): one triplet and a single — $\\tfrac{4!}{3!\\,1!} = \\tfrac{24}{6} = 4$: $AAAB$, $AABA$, $ABAA$, $BAAA$ — TRUE, the honest four listed.',
          '(D): two twin pairs — the count is $\\tfrac{4!}{2!\\,2!} = \\tfrac{24}{4} = 6$ ($AABB$, $ABAB$, $ABBA$, $BAAB$, $BABA$, $BBAA$), NOT $\\tfrac{4!}{2!} = 12$ — FALSE, the statement divides by only ONE pair\u2019s stampings, forgetting the second; the hand list of six kills it.',
          'Hence, (A), (B) and (C) are true; (D) is the missing-division fraud.',
        ], answer: '(A), (B) and (C) are true; (D) is false — the count is 6, not 12' },
        { q: 'Exam-style (Numerical Value). The letters of the word SMOKE are arranged in all possible ways and written out as in a dictionary. Report the rank of the word SMOKE (the integer).', solution: [
          'Census: $S, M, O, K, E$ — five distinct letters, $5! = 120$ arrangements; alphabetical order of the letters is $E < K < M < O < S$.',
          'Seat one, letter $S$: unused smaller letters are $E, K, M, O$ — four, each starting $4! = 24$: $4 \\cdot 24 = 96$. Fix $S$.',
          'Seat two, letter $M$: unused $\\{M, O, K, E\\}$, smaller than $M$ are $K, E$ — two, each starting $3! = 6$: $12$. Fix $SM$.',
          'Seat three, letter $O$: unused $\\{O, K, E\\}$, smaller than $O$ are $K, E$ — two, each starting $2! = 2$: $4$. Fix $SMO$.',
          'Seat four, letter $K$: unused $\\{K, E\\}$, smaller than $K$ is $E$ — it starts $1$ arrangement: $1$. Fix $SMOK$.',
          'Seat five, letter $E$: nothing smaller: zero. The before-count is $96 + 12 + 4 + 1 = 113$.',
          'Hence, the rank of SMOKE is $113 + 1 = 114$ — the engine\u2019s literal sort of all 120 arrangements places it at exactly 114.',
        ], answer: '$114$' },
      ] },
      { level: 'L5', questions: [
        { q: 'Prove the first-seat peel $^{n}P_{r} = n \\cdot \\,^{n-1}P_{r-1}$ for $n \\geq r \\geq 1$, and use it to compute $^{8}P_{4}$ from $^{7}P_{3}$.', solution: [
          'The split: a permutation of $n$ objects taken $r$ at a time has SOME object in its first seat — and which one it is splits the family into $n$ disjoint sub-families (the addition rule\u2019s exclusive alternatives).',
          'Each sub-family: fix the first-seat object; the remaining $r - 1$ seats are filled from the $n - 1$ survivors — a fresh vacant-places problem, $^{n-1}P_{r-1}$ ways.',
          'The count: $n$ disjoint alternatives each of size $^{n-1}P_{r-1}$, so $^{n}P_{r} = n \\cdot \\,^{n-1}P_{r-1}$ — the addition rule of 6.1 doing the splitting, the multiplication form happening to coincide here because the alternatives are equal-sized.',
          'The factorial cross-check: $n \\cdot \\tfrac{(n-1)!}{(n-1-(r-1))!} = \\tfrac{n!}{(n-r)!}$ — the formula reproduces itself.',
          'The use: $^{8}P_{4} = 8 \\cdot \\,^{7}P_{3} = 8 \\cdot (7 \\cdot 6 \\cdot 5) = 8 \\cdot 210 = 1680$.',
          'Hence, proved, and $^{8}P_{4} = 1680$ — the peel turns one big count into a smaller one times a single factor, which is exactly how an exam solver regrows a forgotten row.',
        ], answer: 'proved; $^{8}P_{4} = 8 \\cdot 210 = 1680$' },
        { q: 'MAMMAL: count the arrangements of all the letters, then the arrangements in which the two A\u2019s are never adjacent.', solution: [
          'Census: $M, A, M, M, A, L$ — three $M$\u2019s, two $A$\u2019s, one $L$: $\\tfrac{6!}{3!\\,2!} = \\tfrac{720}{6 \\cdot 2} = 60$ unrestricted arrangements.',
          'The bad family — the A\u2019s adjacent: bundle $\\langle AA\\rangle$, so the row is $\\{M, M, M, L, \\langle AA\\rangle\\}$ — five objects with the M\u2019s triple: $\\tfrac{5!}{3!} = 20$ arrangements.',
          'The complement: $60 - 20 = 40$ arrangements with the A\u2019s never adjacent.',
          'The engine cross-check: literal enumeration of all 60 arrangements finds exactly 20 containing the block AA and 40 not — the census discipline, machine-run; note the bundle row is $\\{M, M, M, L, \\langle AA\\rangle\\}$ — five objects, because the L rides along — and a bundle that forgets a passenger undercounts the bad family ($\\tfrac{4!}{3!} = 4$ instead of $\\tfrac{5!}{3!} = 20$) and so overcounts the complement.',
          'Hence, 60 total, 40 with the A\u2019s apart.',
        ], answer: '$60$ total; $40$ with the two A\u2019s never adjacent' },
        { q: 'The digits $2, 2, 5, 5, 9$ form five-digit numbers, each digit used exactly once. Count (i) all such numbers, (ii) the odd ones, (iii) the ones starting with 2, (iv) the ones starting with 5.', solution: [
          '(i) The multiset: two 2\u2019s, two 5\u2019s, one 9 — $\\tfrac{5!}{2!\\,2!} = \\tfrac{120}{4} = 30$ five-digit numbers (no digit is 0, so every arrangement is a valid number).',
          '(ii) Odd means the last digit is 9: fix it, arrange $\\{2, 2, 5, 5\\}$ in the first four seats — $\\tfrac{4!}{2!\\,2!} = 6$ numbers.',
          '(iii) Starting with 2: fix a 2, arrange $\\{2, 5, 5, 9\\}$ — $\\tfrac{4!}{2!} = 12$ numbers.',
          '(iv) Starting with 5: fix a 5, arrange $\\{2, 2, 5, 9\\}$ — $\\tfrac{4!}{2!} = 12$ numbers.',
          'The audit: (iii) + (iv) = 24, and the remaining 6 must start with 9 — $\\tfrac{4!}{2!\\,2!} = 6$ — the three starting-digit blocks sum to $24 + 6 = 30$ exactly, the census closing the books.',
          'Hence, 30 total, 6 odd, 12 starting with 2, 12 starting with 5.',
        ], answer: '(i) $30$; (ii) $6$; (iii) $12$; (iv) $12$' },
      ] },
      { level: 'L6', questions: [
        { q: 'Exam-style (Linked Comprehension). The letters of the word GRAVITY are arranged in all possible ways and written out as in a dictionary. (i) Count the total arrangements. (ii) Count the arrangements that start with a vowel. (iii) Find the rank of the word GRAVITY itself.', solution: [
          'Census: $G, R, A, V, I, T, Y$ — seven distinct letters, so (i) the total is $7! = 5040$ arrangements.',
          '(ii) The vowels are $A$ and $I$: fix either as the first letter and arrange the remaining six — $2 \\cdot 6! = 2 \\cdot 720 = 1440$ arrangements start with a vowel.',
          '(iii) The ladder, alphabetical order $A < G < I < R < T < V < Y$. Seat one, letter $G$: smaller unused letters — $A$ only: $1 \\cdot 6! = 720$. Fix $G$.',
          'Seat two, letter $R$: unused $\\{R, A, V, I, T, Y\\}$, smaller than $R$ are $A, I$: $2 \\cdot 5! = 240$. Fix $GR$.',
          'Seat three, letter $A$: unused $\\{A, V, I, T, Y\\}$, nothing smaller than $A$: zero. Fix $GRA$.',
          'Seat four, letter $V$: unused $\\{V, I, T, Y\\}$, smaller than $V$ are $I, T$: $2 \\cdot 3! = 12$. Fix $GRAV$.',
          'Seat five, letter $I$: unused $\\{I, T, Y\\}$, nothing smaller than $I$: zero. Fix $GRAVI$.',
          'Seat six, letter $T$: unused $\\{T, Y\\}$, nothing smaller than $T$: zero. Fix $GRAVIT$.',
          'Seat seven, letter $Y$: unused $\\{Y\\}$, nothing smaller: zero. The before-count is $720 + 240 + 12 = 972$.',
          'Hence, (i) $5040$; (ii) $1440$; (iii) the rank of GRAVITY is $972 + 1 = 973$ — brute-confirmed by the engine\u2019s literal sort of all 5040 arrangements.',
        ], answer: '(i) $5040$; (ii) $1440$; (iii) rank $= 973$' },
        { q: 'KNEEL: prove the ladder formula (rank = 1 + the before-count, the rungs disjoint and exhaustive) on this word — find the rank of KNEEL, pricing the between-letters trap at the second seat — and cross-check against the honest count of the word\u2019s 60 arrangements.', solution: [
          'Census: $K, N, E, E, L$ — one $K$, one $N$, two $E$\u2019s, one $L$: $\\tfrac{5!}{2!} = 60$ arrangements; alphabetical order $E < K < L < N$.',
          'Rung structure (the proof): every arrangement smaller than KNEEL disagrees with it first at exactly one seat $k$ with a smaller letter at that seat — so the before-count splits into disjoint rungs "agree on the prefix, place smaller at seat $k$", one rung per seat; each rung counts continuations of the leftover multiset; the rungs are disjoint (different prefixes after seat $k$) and exhaustive (any smaller arrangement must diverge somewhere), so the sum is the whole before-count — and the rank is one more.',
          'Seat one, letter $K$: smaller unused letters — $E$ only: arrangements of $\\{K, N, E, L\\}$ (one $E$ spent, one left, all distinct) are $4! = 24$. Fix $K$.',
          'Seat two, letter $N$ — the trap seat: smaller unused letters are $E$ AND $L$ (the $L$ sits between $E$ and $N$ alphabetically, and it is the one a hurried solver misses): with $E$: $KE\\ldots$ arranges $\\{N, E, L\\}$ in $3! = 6$ ways; with $L$: $KL\\ldots$ arranges $\\{N, E, E\\}$ in $\\tfrac{3!}{2!} = 3$ ways — the rung is $6 + 3 = 9$, not the naive 6. Fix $KN$.',
          'Seat three, letter $E$: unused $\\{E, E, L\\}$, nothing smaller than $E$: zero. Fix $KNE$.',
          'Seat four, letter $E$: unused $\\{E, L\\}$, nothing smaller: zero. Fix $KNEE$.',
          'Seat five, letter $L$: unused $\\{L\\}$, nothing smaller: zero. The before-count is $24 + 9 = 33$.',
          'Hence, the rank of KNEEL is $33 + 1 = 34$ — brute-confirmed by the engine\u2019s literal sort of all 60 arrangements, and the between-letters trap priced: missing the $L$ at the second seat would undercount by exactly its 3 continuations and report the false rank 31.',
        ], answer: 'proved; rank of KNEEL $= 34$ (the trap rung is $6 + 3 = 9$)' },
      ] },
    ] },
  ],
}

/* ------------------------------------------------------------------ */
/* figures for lesson 6.3 — the vacant-places chain, the overcount     */
/* division exhibit, and the dictionary page                          */
/* ------------------------------------------------------------------ */

function vacantPlacesSvg(): string {
  // n = 8 pool, r = 4 seats: boxes labeled place 1..4, up-arrows priced
  // 8, 7, 6, 5; the amber pool bar shrinking by one each seat; footer
  // 8 × 7 × 6 × 5 = 1680 = 8P4 = 8!/(8−4)!
  const boxes = [1, 2, 3, 4]
  const counts = [8, 7, 6, 5]
  const bx = (i: number): number => 70 + i * 155
  const boxEls = boxes.map((b, i) => `
  <rect x="${bx(i)}" y="92" width="120" height="64" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="2.4"/>
  <text x="${bx(i) + 60}" y="118" font-size="11.5" font-weight="700" text-anchor="middle" fill="#166534">place ${b}</text>
  <text x="${bx(i) + 60}" y="142" font-size="12" font-weight="700" text-anchor="middle" fill="#65a30d">${counts[i]} ways</text>
  <line x1="${bx(i) + 60}" y1="196" x2="${bx(i) + 60}" y2="160" stroke="#ea580c" stroke-width="2.6" marker-end="url(#arrow)"/>`).join('')
  const poolEls = [8, 7, 6, 5].map((p, i) => `
  <rect x="${bx(i) + 12}" y="216" width="96" height="13" rx="6" fill="#d97706" opacity="${0.35 + 0.16 * i}"/>`).join('')
  const dots = [8, 7, 6, 5].map((p, i) => {
    const w = 96 * p / 8
    return `<rect x="${bx(i) + 12}" y="216" width="${w.toFixed(1)}" height="13" rx="6" fill="#ea580c"/>`
  }).join('')
  return `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The r vacant places filled from a pool of eight distinct objects, four seats: the shrinking chain. Each of the four amber places is a seat; the first fills in 8 ways, the second in 7, the third in 6 and the fourth in 5 — the orange pool bar below each seat shrinks by one object every seat, from 8 objects wide down to 5. The multiplication rule closes the chain: 8 times 7 times 6 times 5 equals 1680 arrangements, which is 8P4, the four top factors of 8 factorial over 4 factorial.">
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#ea580c"/></marker>
  </defs>
  <text x="360" y="26" font-size="13.5" font-weight="700" text-anchor="middle" fill="currentColor">the r vacant places: n = 8 objects, r = 4 seats</text>
  <text x="360" y="48" font-size="10.5" text-anchor="middle" fill="#0f766e">each place holds one object; each placement removes one object from the pool</text>
  ${boxEls}
  <text x="360" y="185" font-size="10" font-weight="700" text-anchor="middle" fill="#0f766e">the pool, seat by seat:</text>
  ${poolEls}
  ${dots}
  <text x="360" y="254" font-size="13" font-weight="700" text-anchor="middle" fill="#166534">8 × 7 × 6 × 5 = 1680 arrangements = 8P4</text>
  <text x="360" y="278" font-size="11" text-anchor="middle" fill="#0f766e">four consecutive descending factors — the chain compressed: 8!/(8−4)! = 1680</text>
  <text x="360" y="300" font-size="10.5" text-anchor="middle" fill="#0f766e">place 4 fills last, in 8 − 4 + 1 = 5 ways — the honest edge factor to check</text>
</svg>`
}

function overcountDivisionSvg(): string {
  // the multiset {D, D, K, K}: top the 6 honest arrangements; middle the
  // fan of one arrangement (DKDK) into its 4 stamped copies; footer
  // 6 × 4 = 24 = 4!, so the honest count is 4!/(2!·2!) = 6
  const honest = ['DDKK', 'DKDK', 'DKKD', 'KDDK', 'KDKD', 'KKDD']
  const honestEls = honest.map((w, i) => {
    const x = 52 + i * 103
    const tiles = w.split('').map((c, j) => `<rect x="${x + j * 21}" y="76" width="18" height="24" rx="3" fill="${c === 'D' ? '#ffedd5' : '#fcd34d'}" stroke="${c === 'D' ? '#ea580c' : '#65a30d'}" stroke-width="1.6"/><text x="${x + j * 21 + 9}" y="93" font-size="12.5" font-weight="700" text-anchor="middle" fill="${c === 'D' ? '#ea580c' : '#166534'}">${c}</text>`).join('')
    return `${tiles}`
  }).join('')
  const stamped = ['D₁K₁D₂K₂', 'D₁K₂D₂K₁', 'D₂K₁D₁K₂', 'D₂K₂D₁K₁']
  const stampEls = stamped.map((w, i) => {
    const x = 58 + i * 168
    return `<text x="${x}" y="216" font-size="13" font-weight="700" fill="#166534">${w}</text>`
  }).join('')
  return `<svg viewBox="0 0 720 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The overcount division on the multiset D, D, K, K. Top row: the six honest arrangements of two D tiles and two K tiles — DDKK, DKDK, DKKD, KDDK, KDKD and KKDD — drawn as tile strings. Middle: one honest arrangement, DKDK, fans into its four stamped copies D1K1D2K2, D1K2D2K1, D2K1D1K2 and D2K2D1K1 — the four label-swaps of its twin D pair and twin K pair, 2 factorial times 2 factorial. Footer: six arrangements times four stampings each equals twenty-four, which is 4 factorial; so the honest count is the overcount divided: 4 factorial over 2 factorial times 2 factorial equals 6.">
  <text x="360" y="24" font-size="13.5" font-weight="700" text-anchor="middle" fill="currentColor">the overcount division: the multiset D, D, K, K</text>
  <text x="360" y="46" font-size="10.5" text-anchor="middle" fill="#0f766e">the six honest arrangements — twins interchangeable, tiles drawn as pairs</text>
  ${honestEls}
  <text x="360" y="130" font-size="11" font-weight="700" text-anchor="middle" fill="#0d9488">one honest arrangement fans into its 2! × 2! = 4 stampings:</text>
  <rect x="212" y="146" width="150" height="34" rx="6" fill="#fef3c7" stroke="#16a34a" stroke-width="2"/>
  <text x="287" y="168" font-size="13.5" font-weight="700" text-anchor="middle" fill="#166534">DKDK</text>
  <line x1="287" y1="146" x2="120" y2="204" stroke="#d97706" stroke-width="1.6" stroke-dasharray="4 3"/>
  <line x1="287" y1="146" x2="290" y2="204" stroke="#d97706" stroke-width="1.6" stroke-dasharray="4 3"/>
  <line x1="287" y1="146" x2="460" y2="204" stroke="#d97706" stroke-width="1.6" stroke-dasharray="4 3"/>
  <line x1="287" y1="146" x2="630" y2="204" stroke="#d97706" stroke-width="1.6" stroke-dasharray="4 3"/>
  ${stampEls}
  <text x="360" y="250" font-size="13" font-weight="700" text-anchor="middle" fill="#166534">6 arrangements × 4 stampings each = 24 = 4!</text>
  <text x="360" y="274" font-size="11.5" text-anchor="middle" fill="#0f766e">so the honest count is the overcount divided: 4!/(2! · 2!) = 6</text>
  <text x="360" y="296" font-size="10.5" text-anchor="middle" fill="#0f766e">the division is exact: every honest arrangement owns exactly the same 4 label-swaps</text>
</svg>`
}

function dictionaryPageSvg(): string {
  // the dictionary page of {A, B, C}: six arrangements listed alphabetically
  // with rank numbers; CAB highlighted (orange) at rank 5; footer
  // rank = 1 + the 4 words before it
  const words = ['ABC', 'ACB', 'BAC', 'BCA', 'CAB', 'CBA']
  const rows = words.map((w, i) => {
    const y = 88 + i * 34
    const hot = w === 'CAB'
    return `
  <rect x="150" y="${y - 4}" width="270" height="28" rx="6" fill="${hot ? '#ffedd5' : '#fef3c7'}" stroke="${hot ? '#ea580c' : '#fcd34d'}" stroke-width="${hot ? 2.2 : 1.2}"/>
  <text x="176" y="${y + 16}" font-size="13" font-weight="${hot ? 700 : 400}" fill="${hot ? '#ea580c' : '#166534'}">${w}</text>
  <text x="396" y="${y + 16}" font-size="12" font-weight="700" text-anchor="middle" fill="${hot ? '#ea580c' : '#0f766e'}">${i + 1}</text>`
  }).join('')
  return `<svg viewBox="0 0 720 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The dictionary page of the letters A, B and C: the six arrangements listed alphabetically with rank numbers at the right — ABC at 1, ACB at 2, BAC at 3, BCA at 4, CAB highlighted in orange at 5, CBA at 6. A bracket on the left marks the four words before CAB — the two starting with A and the two starting with B — and the footer states the rank formula in miniature: the rank of CAB is one plus the four words before it, which is 5.">
  <text x="360" y="26" font-size="13.5" font-weight="700" text-anchor="middle" fill="currentColor">the dictionary page of the letters A, B, C</text>
  <text x="360" y="46" font-size="10.5" text-anchor="middle" fill="#0f766e">all 3! = 6 arrangements, written alphabetically — rank numbers at the right</text>
  ${rows}
  <line x1="126" y1="84" x2="126" y2="196" stroke="#ea580c" stroke-width="2.4"/>
  <line x1="120" y1="84" x2="126" y2="84" stroke="#ea580c" stroke-width="2.4"/>
  <line x1="120" y1="196" x2="126" y2="196" stroke="#ea580c" stroke-width="2.4"/>
  <text x="112" y="145" font-size="10" font-weight="700" text-anchor="end" fill="#ea580c">4 words</text>
  <text x="112" y="158" font-size="10" font-weight="700" text-anchor="end" fill="#ea580c">before</text>
  <text x="360" y="300" font-size="12.5" font-weight="700" text-anchor="middle" fill="#166534">rank of CAB = 1 + 4 = 5</text>
  <text x="360" y="318" font-size="10.5" text-anchor="middle" fill="#0f766e">the four before it: two starting with A, two starting with B — the ladder\u2019s first rung, already visible at n = 3</text>
</svg>`
}

/**
 * Advanced Algebra — chapter 6, lesson 6.4
 * "Circular and Restricted Permutations" (parallel-swarm run, task 6-d).
 *
 * NOTE FOR THE ORCHESTRATOR (paste-time): this part-file lives in
 * scripts/aa-ch06-work/; when pasted into
 * src/data/library/books/mathematics/advanced-algebra/ch-06.ts the type
 * import above must become the chapter file's own
 * `import type { Chapter, Lesson } from '../../../types'` (or join the
 * existing import) — everything else is the chapter's exact Lesson shape.
 *
 * VERIFY-FIRST: the engines of scripts/aa-ch06-work/v6-4.ts (section G —
 * every number below recomputed by literal enumeration: circular
 * arrangements rotation-collapsed, necklace classes rotation+reflection-
 * collapsed, bundle/gap counts enumerated on small rosters, every quiz
 * distractor priced, every exercise answer swept) were green BEFORE this
 * prose was declared done; section H pins the structural contract on this
 * part-file object. Run: `cd /home/z/my-project && bun run
 * scripts/aa-ch06-work/run-64.ts`.
 *
 * GROUND (study-never-reproduce): the m2-07 module bands 7.12–7.13
 * (Permutation Under Restriction — the together/gap taxonomy, CAE 7.5) and
 * 7.20–7.24 (the restricted drills, Circular Permutation with the shift
 * argument, Clockwise and Anticlockwise Arrangements, CAE 7.7/7.8) informed
 * METHOD SHAPES ONLY — the two restriction families, the shift argument for
 * (n−1)!, the observation-side argument for (n−1)!/2, the alternation and
 * subtraction reads. Every roster, word, number, figure, Illustration and
 * exercise below is OUR OWN, recomputed by the engine before the prose was
 * declared done.
 *
 * HOSTED FOLDS (TOC_FOLD_LEDGER.json, binding): (m2-07) "Permutation Under
 * Restriction" — mode section — discharged by the named subsection
 * "Permutation Under Restriction: the Two Families" (formal definition +
 * equations (1)–(2) + two derivations + three restricted-type worked
 * Illustrations); (m2-07) "Clockwise and Anticlockwise Arrangements" —
 * mode section — discharged by the named subsection "Clockwise and
 * Anticlockwise Arrangements" (formal theorem + equation (7) + the
 * observation-side derivation + two necklace-type worked Illustrations).
 *
 * Lesson census (engine-pinned): 9 Illustrations (the last exam-shaped);
 * 4 derivations (bundle, gap, the shift argument, the necklace divide);
 * 3 figures (the shift-rotation wheel, the gap-method table layout, the
 * necklace flip) on the vivid palette only; 2 tables; 10 terms; 6 formula
 * cards; 7 equations \tag 1–7; quiz 5 items, keys [1, 1, 2, 0, 3];
 * exercises 15 in L1–L6 = 2/2/3/3/3/2; prerequisites pinned to AA 6.3
 * (aa-permutations-the-arrangement-count); sources cengage-m2-07,
 * cengage-jee-style, ncert-math11-ch6-permutations-combinations,
 * jee-main-2026-syllabus, hall-knight-higher-algebra, khattar-qa-4e.
 */
const lesson64: Lesson = {
  id: 'aa-circular-and-restricted-permutations',
  number: '6.4',
  title: 'Circular and Restricted Permutations',
  concepts: [
    'restrictions: always together and never together',
    'the bundle method (bundle plus internal order)',
    'the gap method (gaps between the seated)',
    'circular permutations and the shift argument',
    'clockwise and anticlockwise arrangements',
    'the necklace, garland and keyring divide by two',
    'alternation and the subtraction read at round tables',
    'the small-case census as the wrong-model catcher',
  ],
  objectives: [
    'Classify a restriction into its family — particular objects always together, or never together — and name the engine each family demands before any factorial is written down.',
    'Run the bundle method: bind the r particular objects into one object, arrange the shortened roster, then price the internal order r! — and verify the count by literal small-case enumeration.',
    'Run the gap method: seat the unrestricted objects first, count the gaps they create (n−r+1 in a row, n−r at a round table), and place the restricted objects into distinct gaps — knowing when the placement is an arrangement and when it is a selection.',
    'Prove the circle count (n−1)! by the shift argument — each circular arrangement unwraps into exactly n linear ones — and price alternation, together and never-together at round tables by gaps and by subtraction.',
    'Prove the necklace count (n−1)!/2 by the observation-side argument, know exactly which objects pay it (necklaces, garlands, keyrings, bracelets) and which do not (tables with an observable clockwise side), and respect the n ≥ 3 edge of the divide.',
    'Run the small-case census — list n = 3 and n = 4 literally before trusting any circular formula — so that a wrong model is caught before it is priced.',
    'Read both routes to one count: gap and subtraction must agree when the cases split cleanly, and the disagreement of two routes is a missing case, not a second answer.',
  ],
  prerequisites: ['aa-permutations-the-arrangement-count'],
  sources: ['cengage-m2-07', 'cengage-jee-style', 'ncert-math11-ch6-permutations-combinations', 'jee-main-2026-syllabus', 'hall-knight-higher-algebra', 'khattar-qa-4e'],
  blocks: [
    { kind: 'para', text: 'Lesson 6.3, "Permutations: the Arrangement Count", priced the row: $n$ distinct objects in $n$ labeled seats, ${}^{n}P_{r}$ when only $r$ seats are to be filled, and $\\tfrac{n!}{p!\\,q!\\,\\cdots}$ when some of the objects are twins. Two new pressures now arrive — and, the way examination papers like to deliver them, they arrive together. The first is the restriction: of the books on a shelf, a matched pair that must stand shoulder to shoulder; of the diners at a table, two who refuse to be neighbours; of the letters of a word, two that may not touch. The second is the circle: a round table has no first seat and no last seat. A row of eight diners prices at $8! = 40320$; the same eight at an unnumbered round table price at $5040$ — exactly an eighth of the row, for a reason this lesson proves rather than quotes. And when the object being arranged is a necklace — a garland, a keyring, a bracelet — a third collapse halves the count again, for a reason that has nothing to do with rotation at all: you can look at a necklace from the other side.' },
    { kind: 'para', text: 'The route is short and every stop is proved. First the two restriction families, each with its engine: together means bind a bundle, never-together means build on gaps. Then the circle, with the shift argument for $(n-1)!$ — and, before trusting it, the small-case census at $n = 3$ and $n = 4$ listed literally, the guard this whole chapter has carried since lesson 6.1, "The Fundamental Principle of Counting". Then the two circle engines proper: gaps at round tables (alternation and the no-two-together counts) and the subtraction read that never-together counts as total minus together. And finally the garland: the observation-side argument that halves the circle, with its honest edge at $n = 2$. Throughout, the factorial bookkeeping of lesson 6.2, "Factorials and the Counting Toolkit", and the multiplication rule of lesson 6.1 are used, never re-derived — and lesson 6.5\u2019s selection engine is named forward exactly where a gap filling turns from an arrangement into a choice.' },

    { kind: 'heading', text: 'Permutation Under Restriction: the Two Families' },
    { kind: 'para', text: 'A restriction is a promise about where particular objects sit, and nearly every promise an examination ever makes falls into one of two families. Family one: particular objects are ALWAYS TOGETHER — the two volumes of a set, the couple that must sit side by side, the cluster of red beads that must be unbroken. Family two: particular objects are NEVER TOGETHER — no two women adjacent, the rivals separated, the vowels never touching. The families demand opposite engines, and choosing the engine is the whole first half of every such problem: together is priced by BINDING, never-together is priced by GAPS. A third species — fixed separations ("exactly two letters between M and N"), alternations, at-least-one-between hunts — is built from the same two moves plus the selection engine that lesson 6.5 owns; this lesson prices the two pure families and builds one fixed-separation shape in the exercise bench.' },
    { kind: 'callout', tone: 'definition', title: 'The two restriction families', text: 'A PERMUTATION UNDER RESTRICTION is an arrangement count in which a condition is imposed on where particular objects sit. The two great families are: (i) ALWAYS TOGETHER — $r$ particular objects must occur in one unbroken block, priced by the BUNDLE method: bind the $r$ objects into a single object, arrange the shortened roster, then multiply by the $r!$ internal orders; and (ii) NEVER TOGETHER — no two of the $r$ particular objects may be adjacent, priced by the GAP method: arrange the unrestricted $n - r$ objects first, then place the $r$ restricted objects into the gaps thus created, at most one per gap. Thus, for $n$ distinct objects in a row: family (i) gives $(n-r+1)!\\,r!$ and family (ii) gives $(n-r)!\\,{}^{n-r+1}P_{r}$ — both proved below, both witnessed by literal census.' },
    { kind: 'equation', latex: '\\text{together (row): } (n-r+1)!\\,r! \\tag{1}', note: 'the bundle count: bind the r particular objects into one object, arrange the n−r+1 objects, price the r! orders inside the bundle.' },
    { kind: 'equation', latex: '\\text{never together (row): } (n-r)!\\,{}^{n-r+1}P_{r} \\tag{2}', note: 'the gap count: seat the n−r unrestricted objects first (n−r+1 gaps in a row), then place the r restricted objects into distinct gaps — an arrangement, not a selection.' },
    { kind: 'derivation', title: 'The bundle count, proved and witnessed', statement: 'For $n$ distinct objects in a row, of which $r$ particular objects must appear in one unbroken block, the number of arrangements is $(n-r+1)!\\,r!$.', steps: [
      { label: 'Bind the block', formula: '(\\underbrace{X_1\\,X_2\\,\\cdots\\,X_r}_{\\text{one bundle}}),\\ Y_1,\\,Y_2,\\,\\ldots,\\,Y_{n-r}', explanation: 'Glue the $r$ particular objects into a single bundle. The row now offers $n - r + 1$ objects to arrange: the bundle, treated as one named object, and the $n - r$ free objects.' },
      { label: 'Arrange the coarser row', formula: '(n-r+1)!', explanation: 'The $n-r+1$ objects of the coarser row are distinct — the bundle carries a name of its own — so the arrangement engine of lesson 6.3 prices the row at $(n-r+1)!$.' },
      { label: 'Price the inside of the bundle', formula: 'r!', explanation: 'Within the block, the $r$ particular objects may stand in any of their $r!$ internal orders. This is a second stage of choices, independent of where the bundle itself sits.' },
      { label: 'Multiply the stages', formula: '(n-r+1)! \\times r!', explanation: 'One arrangement of the coarser row AND one internal order of the block — independent stages, so lesson 6.1\u2019s multiplication rule applies (cited, not re-taught).' },
      { label: 'Witness on a five-object roster', formula: 'n = 5,\\ r = 2: \\quad 4! \\times 2! = 48', explanation: 'The objects $P, Q, R, S, T$ with $P$ and $T$ glued: the engine\u2019s literal census of all $5! = 120$ rows finds exactly $48$ with $P$ and $T$ adjacent — the formula audited, not trusted.' },
    ], result: '$\\text{arrangements} = (n-r+1)!\\,r!$ $\\qquad$ witnessed at $n = 5$, $r = 2$: $4! \\cdot 2! = 48$ of $120$ rows' },
    { kind: 'derivation', title: 'The gap count, proved and witnessed', statement: 'For $n$ distinct objects in a row, of which no two of $r$ particular objects may be adjacent, the number of arrangements is $(n-r)!\\,{}^{n-r+1}P_{r}$ — provided $r \\leq n-r+1$; otherwise it is $0$.', steps: [
      { label: 'Seat the unrestricted objects first', formula: 'Y_1\\,Y_2\\,\\cdots\\,Y_{n-r}: \\quad (n-r)!\\ \\text{rows}', explanation: 'The $n - r$ objects that carry no restriction may sit anywhere, so they go down first — arranged in $(n-r)!$ ways by the engine of lesson 6.3.' },
      { label: 'Count the gaps', formula: '\\times\\;Y_1\\;\\times\\;Y_2\\;\\times\\;\\cdots\\;\\times\\;Y_{n-r}\\;\\times', explanation: 'A row of $n - r$ seated objects creates exactly $n - r + 1$ gaps: one before each seated object and one after the last — the between-places AND the two end-places.' },
      { label: 'Place the restricted objects', formula: '{}^{n-r+1}P_{r} = (n-r+1)(n-r)\\cdots(n-2r+2)', explanation: 'Each gap takes AT MOST ONE of the restricted objects — that is precisely what "no two together" means — so the $r$ restricted objects occupy $r$ of the $n-r+1$ gaps in order: an arrangement ${}^{n-r+1}P_{r}$, since the objects are distinct people or letters, not interchangeable.' },
      { label: 'Multiply the stages', formula: '(n-r)! \\times {}^{n-r+1}P_{r}', explanation: 'Two independent stages again — the seated row and the gap filling — so the multiplication rule applies. And if $r > n-r+1$, the gaps cannot host the restricted objects one each: the count is honestly $0$.' },
      { label: 'Witness on the same roster', formula: 'n = 5,\\ r = 2: \\quad 3! \\times {}^{4}P_{2} = 72', explanation: 'The same five objects with $P$ and $T$ never adjacent: the literal census finds exactly $72$ clean rows — and the account closes exactly: $48$ (together) $+ 72$ (never) $= 120$ (all).' },
    ], result: '$\\text{arrangements} = (n-r)!\\,{}^{n-r+1}P_{r}$ $\\qquad$ zero when $r > n-r+1$ $\\qquad$ witnessed: $3! \\cdot {}^4P_2 = 72$, and $48 + 72 = 120$' },
    { kind: 'para', text: 'For example, on one roster, both engines at once:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) the objects $P, Q, R, S, T$ with $P$ and $T$ always together: $4! \\times 2! = 48$ arrangements;',
      '(ii) the same objects with $P$ and $T$ never together: $3! \\times {}^4P_2 = 6 \\times 12 = 72$ arrangements;',
      '(iii) the audit that closes the account: $48 + 72 = 120 = 5!$ — together and never-together partition the rows exactly, the census the engines ran literally;',
      '(iv) and if the restriction demanded that $P$, $T$ and $Q$ all stay together: the bundle would price at $3! \\times 3! = 36$ — the bundle method with a three-object inside.',
    ] },
    { kind: 'example', title: 'Eight ledgers stand on a shelf; two of them are volumes I and II of a matched set and must be neighbours. Count the shelf arrangements', steps: [
      'Name the family: two particular objects always together — family (i), the bundle method.',
      'Bind the pair $(V_1 V_2)$ into one object: the shelf now carries $7$ objects — the bundle and six free ledgers.',
      'Arrange the coarser shelf in $7! = 5040$ ways, and price the bundle\u2019s inside: $V_1 V_2$ or $V_2 V_1$, that is $2! = 2$ internal orders.',
      'Multiply the stages: $7! \\times 2 = 10080$ arrangements.',
      'Hence, the shelf prices at $10080$ — and the engine\u2019s literal census of all $8! = 40320$ shelves finds exactly $10080$ with the pair adjacent, an exact audit of equation (1) at full roster size.',
    ] },
    { kind: 'example', title: 'Four women and three men line up for a photograph; no two men may stand adjacent. Count the lineups', steps: [
      'Name the family: no two of the three men adjacent — family (ii), the gap method, with the men the restricted family precisely because they are the fewer side.',
      'Seat the unrestricted objects first: the four women, in $4! = 24$ ways.',
      'Now, their row creates $5$ gaps — before, between and after the women: $\\times\\,W\\,\\times\\,W\\,\\times\\,W\\,\\times\\,W\\,\\times$.',
      'Place the men: each gap takes at most one man, so the three men occupy three of the five gaps in ${}^5P_3 = 5 \\cdot 4 \\cdot 3 = 60$ ways — an arrangement, because the men are three distinct people.',
      'Hence, $4! \\cdot {}^5P_3 = 24 \\times 60 = 1440$ lineups — the engines sweep all $7! = 5040$ raw lineups and count exactly $1440$ clean ones, equation (2) audited at its classic four-and-three size.',
    ] },
    { kind: 'formula', name: 'The bundle method (always together)', latex: '\\text{row: } (n-r+1)!\\,r! \\qquad \\text{round table: } (n-r)!\\,r!', note: 'bind the r particular objects into one object, arrange the coarser roster, then multiply by the internal r! — twins carry no internal order (swap them and nothing changes).' },
    { kind: 'formula', name: 'The gap method (never together)', latex: '\\text{row: } (n-r)!\\,{}^{n-r+1}P_{r} \\qquad \\text{round table: } (n-r-1)!\\,{}^{n-r}P_{r}', note: 'seat the unrestricted n−r first, then place the r restricted into distinct gaps: n−r+1 gaps in a row, only n−r at a round table (a circle has no end seats). Needs r no larger than the gap count, else the count is zero.' },
    { kind: 'example', title: 'The letters of LETTER are arranged; count the arrangements in which the two T\u2019s are never together — and price it BOTH ways', steps: [
      'The roster first: LETTER carries $6$ letters with T twice and E twice, so lesson 6.3\u2019s alike-engine prices the unrestricted count at $\\tfrac{6!}{2!\\,2!} = 180$ distinct arrangements.',
      'Route one, subtraction: glue the T\u2019s into one bundle $(TT)$; with L, E, E, R that is $5$ objects with E doubled, so $\\tfrac{5!}{2!} = 60$ arrangements carry the T\u2019s together — and note the honesty: the T\u2019s are IDENTICAL twins, so the bundle has no internal $2!$; swapping them changes nothing.',
      'So, the never-together count by subtraction: $180 - 60 = 120$ — the complement seed planted in lesson 6.1 ("total minus bad"), cashed.',
      'Route two, gaps: arrange the frame letters L, E, E, R first — $\\tfrac{4!}{2!} = 12$ distinct frames — creating $5$ gaps; the two T\u2019s must occupy two different gaps, chosen in ${}^5C_2 = 10$ ways.',
      'Now, the contrast that the roster teaches: the T\u2019s are interchangeable, so their gap filling is a SELECTION (${}^5C_2$) — had the restricted letters been distinct (two different vowels, say), the filling would be an arrangement ${}^5P_2$. That selection engine is exactly lesson 6.5\u2019s subject, named forward here.',
      'Hence, both routes read $12 \\times 10 = 120 = 180 - 60$ — the subtraction read and the gap read agreeing exactly, and the engine\u2019s literal census of the $180$ words confirming $60$ together and $120$ clean.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Two routes, one count', text: 'The LETTER drill prices "never together" twice — by gaps and by subtraction — and the two routes agree at $120$. This is no accident to shrug at: adjacent and non-adjacent split the arrangements cleanly, so the two counts must add to the total, and the census closes: $60 + 120 = 180$. Make this a discipline: whenever a restriction splits the world into a "bad" case and its complement, price the bad case (usually the easier bundle count) and subtract — and, when both routes are within reach, run both and let them audit each other. A disagreement between the two routes is never a second answer: it is a missing case, and the account does not close until it is found.' },

    { kind: 'heading', text: 'The Circle: the Shift Argument' },
    { kind: 'para', text: 'Now the second pressure. A round table has no first seat: there is no seat 1, no seat $n$, and asking "who sits at the head" is precisely what a plain round table refuses to answer. What a round-table seating MEANS is neighbour structure: each diner has a left neighbour and a right neighbour, and nothing else distinguishes the seating. So the eight seatings you get by rotating everyone one place round the table — every diner moving one seat to the left, together — are not eight seatings at all: they are one. The figure shows the whole engine: shift the circle and every left-neighbour and right-neighbour pair survives untouched, so all four shifts return the same arrangement.' },
    { kind: 'figure', caption: 'The shift argument at four seats. Left: the circle P, Q, R, S read clockwise, with the anticlockwise shift arrow — shifting everyone one seat changes no neighbour pair, so the four shifts are one seating. Right: the same seating unwrapped at each of the four cut points: cut before P reads P Q R S, cut before Q reads Q R S P, cut before R reads R S P Q, cut before S reads S P Q R — four rows, one circle. So 24 rows collapse to 6 circles, four unwrappings each: the (n−1)! divide, literally.', svg: shiftWheelSvg() },
    { kind: 'callout', tone: 'definition', title: 'Circular and flip-symmetric arrangements', text: 'A CIRCULAR PERMUTATION of $n$ distinct objects is an arrangement in which two seatings that differ by a rotation are IDENTICAL — the outcome set is the set of rows quotiented by the $n$ rotations, and a round-table seating is exactly this: neighbour structure, nothing else. A FLIP-SYMMETRIC arrangement — the necklace, garland, keyring, bracelet — additionally identifies the two observation sides, quotienting further by the mirror. Thus the row counts of lesson 6.3 refine to three models in order: $n!$ for labeled seats, $(n-1)!$ for the circle, $\\tfrac{(n-1)!}{2}$ for the flip-symmetric ring — and the rest of this lesson prices each divide and the restrictions that ride on top of it.' },
    { kind: 'derivation', title: 'The circle count by the shift argument', statement: 'The number of circular arrangements of $n$ distinct objects — arrangements in which rotations are identified, a round-table seating — is $(n-1)!$.', steps: [
      { label: 'Cut the circle into rows', formula: '\\text{circular arrangement} \\longmapsto \\text{linear strings}', explanation: 'Take any circular arrangement and read it clockwise, starting at any one of the $n$ seats: each choice of starting seat produces one linear string containing all $n$ objects.' },
      { label: 'Count the cuts per arrangement', formula: '\\text{exactly } n \\text{ strings, all rotations}', explanation: 'The $n$ readings differ only by a cyclic shift — and a shift moves every object together, so every left-neighbour pair and every right-neighbour pair survives: the $n$ readings are the same circular arrangement. No two readings coincide, since the object that sits first differs in each.' },
      { label: 'Count both sides of the map', formula: 'n \\times (\\text{circular count}) = n!', explanation: 'Every circular arrangement unwraps into exactly $n$ linear strings, and every linear string wraps onto exactly one circular arrangement (join its ends). So the linear count of lesson 6.3 — $n!$ — equals $n$ times the circular count.' },
      { label: 'Divide', formula: '\\text{circular count} = \\tfrac{n!}{n} = (n-1)!', explanation: 'One factor of $n$ cancels: the circle is the row with one object\u2019s seat spent as the anchor. The engines verify the division by literal census at $n = 3, 4, 5$ below.' },
      { label: 'The anchor read', formula: '\\text{fix } X,\\ \\text{arrange the other } n-1 \\text{ clockwise}', explanation: 'Equivalently, pin one named object as the anchor and read clockwise from it: each circular arrangement is ONE linear arrangement of the remaining $n-1$ objects — the count $(n-1)!$ directly, the form examination solutions usually reach for.' },
    ], result: '$\\text{circular arrangements} = \\tfrac{n!}{n} = (n-1)!$ $\\qquad$ each circle unwraps into exactly $n$ rows' },
    { kind: 'equation', latex: '\\text{circular arrangements of } n \\text{ distinct objects} = \\frac{n!}{n} = (n-1)! \\tag{3}', note: 'the shift argument: rotations are free, so the row count divides by exactly n — the object spent as the anchor.' },
    { kind: 'callout', tone: 'theorem', title: 'The circle count', text: 'For $n$ distinct objects around a circle whose clockwise side is observable — a round table, a circular display rack with a fixed viewing side — the number of arrangements is $(n-1)!$. The licence is one: the objects are distinct, and no seat is distinguished. Number the chairs (a stage crew taping labels on them) and the count returns to the row count $n!$: numbered chairs are labeled seats. The proof is the shift argument above — each circular arrangement unwraps into exactly $n$ rows.' },
    { kind: 'formula', name: 'The circle count', latex: '(n-1)! = \\frac{n!}{n} \\quad \\text{($n$ distinct, rotations identified)}', note: 'a round-table seating is neighbour structure; rotating everyone together changes nothing. Fix one object as the anchor and arrange the remaining n−1 clockwise.' },
    { kind: 'callout', tone: 'insight', title: 'The anchor trick: fix one, kill all rotations', text: 'Both faces of the shift argument are usable, and the anchor face is the faster one at any table: pin one named object — any diner, any bead — and read clockwise from it. Every circular arrangement then corresponds to exactly ONE arrangement of the remaining $n-1$ objects, so the count is $(n-1)!$ with no division remembered at all. The anchor also explains why the divide by $n$ can never be skipped by cleverness: the $n$ rotations of a seating differ in WHO leads the reading, and in nothing else — a symmetry, not a coincidence. The same trick returns in the exercises, and it is exactly how the verify engines audit every circular count of this lesson: fix an anchor, enumerate the rows of the rest.' },
    { kind: 'example', title: 'Seven delegates from seven countries take seats at a round table; count the seatings, and say exactly what a seating ignores', steps: [
      'A seating at a plain round table is fully described by who sits on each delegate\u2019s left and right — the seats carry no names, so every rotation of a seating is the same seating.',
      'So, the count is the circle count: $(7-1)! = 6! = 720$ — the anchor read: fix one delegate and arrange the remaining six clockwise.',
      'Check the shape at the guard sizes before trusting it: three diners price at $2$ and four at $6$ — the census table below lists both literally — and $720$ rides the proved division $\\tfrac{7!}{7}$, not a memorised rule.',
      'Hence, $720$ seatings — and had the seven chairs been numbered, the answer would be the row count $7! = 5040$: numbered chairs are labeled seats, and the first question of every circular problem is exactly this — which symmetries are free.',
    ] },

    { kind: 'heading', text: 'The Small-Case Census: the Circle\u2019s Own Guard' },
    { kind: 'para', text: 'The circle invites exactly two wrong models — dividing when you should not, and not dividing when you should — so the chapter\u2019s standing guard applies with special force: list the small cases literally before trusting any circular formula. This is the same discipline lesson 6.1 installed on the multiplication rule itself (sizes 2 and 3 before any chain), now run at the two natural guard sizes of the circle: $n = 3$ and $n = 4$. Here is the census, in full.' },
    { kind: 'list', marker: 'roman', items: [
      '(i) three diners $P, Q, R$: the $6$ rows collapse into $2$ circular arrangements — reading clockwise from $P$, either $Q$ then $R$, or $R$ then $Q$; each unwraps into exactly $3$ rows ($PQR, QRP, RPQ$ and $PRQ, RQP, QPR$); as a garland the $2$ collapse to $1$;',
      '(ii) four diners $P, Q, R, S$: the $24$ rows collapse into $6$ circular arrangements — fix $P$ as the anchor and arrange $Q, R, S$ clockwise: $QRS$, $QSR$, $RQS$, $RSQ$, $SQR$, $SRQ$; each unwraps into exactly $4$ rows; as garlands the $6$ pair off into $3$ — the mirror pairs $(QRS, SRQ)$, $(QSR, RSQ)$ and $(RQS, SQR)$;',
      '(iii) five diners: $120$ rows collapse into $24$ circles, unwrap factor $5$, and into $12$ garlands — the pattern row of the census table, swept by the engines.',
    ] },
    { kind: 'table', caption: 'The guard census — every cell recomputed by the engines before this prose was written (rows collapse to circles by rotation, circles to necklaces by the flip; the unwrap factor is the number of rows per circle).', head: ['Circle size n', 'Rows n!', 'Circles (n−1)!', 'Necklaces (n−1)!/2', 'Unwrap factor n'], rows: [
      ['3', '$6$', '$2$', '$1$', '$3$'],
      ['4', '$24$', '$6$', '$3$', '$4$'],
      ['5', '$120$', '$24$', '$12$', '$5$'],
    ] },
    { kind: 'callout', tone: 'warn', title: 'The wrong-model catcher', text: 'The guard exists because two reflexes corrupt circular counts in opposite directions. Dividing when you should not: an eight-diner table halved to $20160$ — the reflex paste of the necklace divide onto a table that HAS an observable clockwise side (a diner knows perfectly well who sits on their left). Not dividing when you should: a keyring left at $120$ — the ring can be turned over, so the mirror seating is the same ring, and $\\tfrac{5!}{2} = 60$ is the honest count. The catcher is the census: before pricing any big roster, price $n = 3$ and $n = 4$ literally and check your model reproduces $2$ and $6$ — the wrong model fails at the guard for cents before it fails at the summit for millions.' },
    { kind: 'para', text: 'The census also shows WHY the necklace column halves: at $n = 4$ the six circles pair off as mirror partners — $QRS$ with $SRQ$, and so on — because turning a garland over exchanges each clockwise reading with its reverse. That pairing is a theorem, not an observation about the number four, and it takes its own subsection below. First, the circle\u2019s own engines: restrictions at round tables.' },

    { kind: 'heading', text: 'The Gap Method at Round Tables' },
    { kind: 'para', text: 'The gap method crosses to the circle with one change that traps the unwary: the gap count. A row of $n - r$ seated objects creates $n - r + 1$ gaps — the two end seats are gaps too. A circle of $n - r$ seated objects creates exactly $n - r$ gaps: there are no ends. Five seated men create five gaps, not six. This is the whole difference between equation (2) and equation (4), and it is the single most-priced trap of round-table counting.' },
    { kind: 'figure', caption: 'The gap method at a round table. Five seated men (green) create exactly five gaps (amber slots) — a circle has no end seats, so the gap count equals the seated count. Three women (orange) take three of the five gaps, at most one each, in 5 × 4 × 3 = 60 placings. The count: seat the men in (5−1)! = 24 circles, fill gaps in 60 ways — 24 × 60 = 1440 seatings. The two empty amber slots sit on the left of the table, between the bottom woman and the upper-right woman — they stay empty, exactly as the model demands.', svg: roundTableGapSvg() },
    { kind: 'equation', latex: '\\text{never together (round table): } (n-r-1)!\\,{}^{n-r}P_{r} \\tag{4}', note: 'seat the n−r unrestricted around the circle in (n−r−1)! ways — creating exactly n−r gaps — then place the r restricted into distinct gaps. Needs r ≤ n−r, else zero.' },
    { kind: 'para', text: 'On the instance of the figure: five men and three women, no two women together. Seat the five men first: $(5-1)! = 24$ circles of men, creating five gaps. The three women take three of the five gaps in order, ${}^5P_3 = 5 \\cdot 4 \\cdot 3 = 60$ placings, so the count is $24 \\times 60 = 1440$ — and the engines verify it by literal census (fix one man as the anchor, sweep all $7! = 5040$ anchor-fixed seatings, count $1440$ clean). The same engine prices the alternation question when the two sides are equal: four men and four women alternate at a round table — the men\u2019s $(4-1)! = 6$ circles create four gaps, alternation demands EVERY gap be filled by a woman, so the women go in $4! = 24$ orders: $6 \\times 24 = 144$. A row of the same roster would double that to $2 \\times 4! \\times 4! = 1152$ — a row has two parity patterns (man-first or woman-first), a circle has none, because a rotation carries either pattern onto itself.' },
    { kind: 'equation', latex: '\\text{alternation (round table, } m = w\\text{)}: \\ (m-1)!\\,m! \\qquad \\text{row: } 2\\,m!\\,w! \\tag{5}', note: 'equal sides alternate around a circle in (m−1)!·m! seatings — seat one side, fill every gap; the row doubles it because a row has two parity patterns and the circle has none.' },
    { kind: 'example', title: 'Four men and four women sit alternately at a round table; count the seatings', steps: [
      'Seat the men first: $(4-1)! = 3! = 6$ circular arrangements of the men alone — the women are not yet seated, so only the men\u2019s circle is priced.',
      'Now, the four men create exactly four gaps — a circle has no end seats, so the gap count equals the seated count: four gaps for four women.',
      'Fill every gap: alternation forces each gap to be taken, so the four women occupy the four gaps in $4! = 24$ orders — an arrangement, with no choice of which gaps to fill.',
      'Multiply the stages: $3! \\times 4! = 6 \\times 24 = 144$ seatings.',
      'Hence, $144$ — the engines enumerate all $8! = 40320$ rows, collapse rotations to $5040$ circles, and count exactly $144$ alternating ones; and the row version of the same roster prices at $2 \\times 4! \\times 4! = 1152$ (the exercise bench prices it), the doubling being the row\u2019s two parity patterns.',
    ] },
    { kind: 'formula', name: 'Alternation at a round table', latex: '(m-1)!\\,m! \\quad (m = w \\text{, equal sides})', note: 'seat one side first, then fill every gap — no parity choice exists on a circle. Unequal sides alternating is impossible; at most one more of the larger side fits.' },
    { kind: 'example', title: 'Fifteen delegates arrive at a summit round table; two particular delegates (i) insist on neighbouring seats, (ii) refuse them. Count both', steps: [
      '(i) The bundle rides the circle: glue the pair into one object — $14$ objects at a round table price at $(14-1)! = 13!$ circles, and the bundle\u2019s inside carries $2! = 2$ orders.',
      'So, the together count is $2 \\cdot 13! = 2 \\times 6227020800 = 12454041600$.',
      '(ii) The subtraction read: the total is $(15-1)! = 14! = 87178291200$, and subtracting the together count leaves $14! - 2 \\cdot 13! = 13!\\,(14 - 2) = 12 \\cdot 13! = 74724249600$.',
      'The small-instance audit, before the big number is trusted: at six delegates the engines literally enumerate the $5! = 120$ circles and find $48$ with the pair adjacent — exactly $2 \\cdot 4!$ — and $72$ clean: $120 - 48 = 72 = 3 \\cdot 4!$, the shape $(n-3)(n-2)!$ of equation (6) at $n = 6$.',
      'Hence, (i) $12454041600$ and (ii) $74724249600$ — the together and never-together pair, one subtraction apart, with the model audited at the guard size where it can be listed.',
    ] },
    { kind: 'equation', latex: '\\text{never together (circle)}: \\ (n-1)! - 2\\,(n-2)! = (n-3)\\,(n-2)! \\tag{6}', note: 'two particular never together at a round table of n: the total (n−1)! minus the bundled-together count 2(n−2)! — the subtraction read, lesson 6.1\u2019s complement seed cashed at the circle.' },
    { kind: 'formula', name: 'Never-together at a round table (the subtraction read)', latex: '(n-1)! - 2\\,(n-2)! = (n-3)\\,(n-2)!', note: 'for a particular pair: count all circles, subtract the circles where the pair is bundled. Gap route for the same event: seat the other n−2 first — the two routes must agree, and the engines check that they do.' },

    { kind: 'heading', text: 'Clockwise and Anticlockwise Arrangements' },
    { kind: 'para', text: 'A round table has a last secret symmetry, and whether it is free decides the final divide. Stand before a garland of four flowers and read them clockwise: $P$, then $Q$, then $R$, then $S$. Now walk round to the other side of the same garland and read clockwise again: $P$, then $S$, then $R$, then $Q$. Nothing about the garland changed — only the side you observe it from — yet the clockwise reading reversed. For people at a table this never happens: a delegate can tell their left neighbour from their right one, so the two readings describe two genuinely different seatings. But for a necklace, a garland, a keyring, a bracelet — objects you can simply turn over — the two readings are ONE arrangement. The circle count $(n-1)!$ counts those two readings separately; the honest necklace count must identify them.' },
    { kind: 'figure', caption: 'The necklace flip: one garland, two clockwise reads. Left: seen from side A, the beads read clockwise P, Q, R, S. Right: the SAME garland seen from side B reads clockwise P, S, R, Q — the reverse reading. Two circular arrangements, one necklace: the mirror pairing that halves (n−1)! to (n−1)!/2. At a round table the two readings are different seatings (a delegate knows left from right); on a garland nobody can tell which side you saw.', svg: necklaceFlipSvg() },
    { kind: 'derivation', title: 'The necklace count by the observation-side argument', statement: 'For $n \\geq 3$ distinct objects arranged where clockwise and anticlockwise orders are NOT distinguished — necklaces, garlands, keyrings, bracelets — the number of arrangements is $\\tfrac{(n-1)!}{2}$.', steps: [
      { label: 'Mirror every circle', formula: '\\text{reverse the clockwise reading}', explanation: 'Each circular arrangement has a mirror: the same seats read in the opposite direction. For $n \\geq 3$ distinct objects the mirror is a DIFFERENT circular arrangement — the clockwise neighbour of any object becomes its anticlockwise neighbour, and with three or more distinct objects those two neighbours are different objects.' },
      { label: 'The mirror is an involution', formula: '\\text{mirror of the mirror} = \\text{original}', explanation: 'Reversing a reading twice returns it exactly. So the mirror map is a perfect pairing device on the circular arrangements: it matches each arrangement with one partner and never leaves any arrangement paired with itself.' },
      { label: 'One side, one class', formula: '\\text{necklace} = \\text{a circle and its mirror}', explanation: 'A necklace seen from one side is one circular arrangement; seen from the other side, its mirror. The two circular arrangements are ONE necklace — turning the object over is not a change in the object, only in the observer.' },
      { label: 'Halve', formula: '\\tfrac{(n-1)!}{2}', explanation: 'The pairing being perfect, the $(n-1)!$ circular arrangements halve into necklace classes. The engines verify it by literal census: at $n = 4$, six circles pair into three garlands, and at $n = 5$, twenty-four circles pair into twelve.' },
      { label: 'The honest edge', formula: 'n = 2: \\quad \\text{necklaces} = 1 = (n-1)!', explanation: 'At $n = 2$ the mirror of the one arrangement IS the arrangement — with only two objects, each one\u2019s clockwise neighbour is also its anticlockwise neighbour — so nothing pairs and nothing halves: the count stays $1$, where $\\tfrac{(n-1)!}{2}$ would misprice it as $\\tfrac{1}{2}$. The divide-by-2 licence needs three or more objects.' },
    ], result: '$\\text{necklace count} = \\tfrac{(n-1)!}{2}$ for $n \\geq 3$ $\\qquad$ the edge: at $n = 2$ the count is $1$, not $\\tfrac{1}{2}$' },
    { kind: 'equation', latex: '\\text{necklaces} = \\frac{(n-1)!}{2} \\quad (n \\geq 3) \\tag{7}', note: 'necklace, garland, keyring, bracelet: rotations identified AND the two observation sides identified — the circle count halved by the perfect mirror pairing.' },
    { kind: 'callout', tone: 'theorem', title: 'The necklace count', text: 'For $n \\geq 3$ distinct beads on a necklace — a garland, a keyring, a bracelet, any arrangement seen from both sides — the count is $\\tfrac{(n-1)!}{2}$: the circle count halved by the mirror pairing. The licence has two clauses: the objects are distinct, and the two sides of observation are genuinely not distinguished. At $n = 2$ the mirror of the single arrangement is itself, and the count is $1$ — not $\\tfrac{1}{2}$.' },
    { kind: 'callout', tone: 'warn', title: 'A table is not a garland', text: 'The two divides are separate licences. The divide by $n$ (rotations free) applies to every plain circle — round tables included. The divide by $2$ (sides not distinguished) applies only to the flip-symmetric objects: necklace, garland, keyring, bracelet, wind-chime. A conference table has an observable clockwise side — each delegate knows who sits on their left — so its count is $(n-1)!$, and pasting the necklace divide onto it undercounts by exactly $2$. A keyring can be turned over, so its count is $\\tfrac{(n-1)!}{2}$, and forgetting the flip overcounts by $2$. One question separates the models: CAN THE OBJECT BE TURNED OVER without changing the arrangement? People at a table, no. Beads on a string, keys on a ring, flowers on a wire — yes.' },
    { kind: 'formula', name: 'The necklace count', latex: '\\frac{(n-1)!}{2} \\quad (n \\geq 3,\\ \\text{flip-symmetric ring})', note: 'two divides stack: rotations collapse the rows by n, the flip halves the circles. At n = 2 the count is 1 — the mirror of the one arrangement is itself.' },
    { kind: 'example', title: 'Nine different beads are strung on a cord to make a necklace; count the necklaces', steps: [
      'A necklace is the flip-symmetric circle: rotations identified AND the two observation sides identified.',
      'So, the count is $\\tfrac{(9-1)!}{2} = \\tfrac{8!}{2} = \\tfrac{40320}{2} = 20160$.',
      'The engines audit it literally: all $9! = 362880$ strings are enumerated, the $9$ rotations and the $2$ sides are collapsed, and exactly $20160$ classes survive — $362880 = 20160 \\times 18$, the full $2n$ collapse witnessed.',
      'Contrast the two sister models on the same beads: at a round display table (clockwise observable) they price at $8! = 40320$ — twice the necklace, exactly the mirror pairing — and on a numbered tray (labeled seats) at $9! = 362880$.',
      'Hence, $20160$ necklaces — one roster, three models, and the model question (which symmetry is free) decided before any factorial was written.',
    ] },
    { kind: 'example', title: 'A garland is strung from nine different flowers, of which three are featured specimens that must hang together as one cluster; count the garlands', steps: [
      'Two engines stack: the bundle method (family i) inside the necklace divide.',
      'Glue the three featured flowers into one cluster: the garland now carries $7$ objects.',
      'Price the garland of $7$ flip-symmetrically: $\\tfrac{(7-1)!}{2} = \\tfrac{6!}{2} = 360$ classes.',
      'Price the cluster\u2019s inside: $3! = 6$ internal orders — the flowers are DISTINCT specimens, so the internal order is real (exactly unlike the twin T\u2019s of the LETTER drill, whose bundle had no inside).',
      'Multiply: $360 \\times 6 = 2160$ garlands — and the engines literally enumerate all $9! = 362880$ strings, collapse rotations and flips to $20160$ garland classes, and count exactly $2160$ with the cluster unbroken.',
      'Hence, $2160$ — the bundle and the flip stacked, and the stack audited end to end by the census.',
    ] },
    { kind: 'example', title: 'Exam-style (Linked Comprehension): a jeweller sets six different gems — an amethyst, a sapphire and four others — for a display. (i) The six at a round display table; (ii) the six strung as a bracelet that may be turned over; (iii) the bracelet with the amethyst and the sapphire adjacent. Count each, and name the model each count uses', steps: [
      '(i) Round table, clockwise observable — the circle count with one divide: $(6-1)! = 5! = 120$ arrangements (the shift argument\u2019s division by $6$).',
      '(ii) The bracelet flips: the mirror pairing halves the circle count — $\\tfrac{5!}{2} = 60$ bracelets, and $120 = 2 \\times 60$ is the pairing witnessed on the roster itself.',
      '(iii) The bundle rides the flip-symmetric ring: glue the pair into one object — $5$ objects on a flippable ring price at $\\tfrac{(5-1)!}{2} = \\tfrac{4!}{2} = 12$ classes — and the pair\u2019s inside carries $2! = 2$ orders: $24$ bracelets.',
      'The engines audit every number literally: $6! = 720$ rows collapse to $120$ circles, to $60$ bracelets, of which exactly $24$ carry the two gems as neighbours.',
      'Hence, $120$, $60$ and $24$ — three models on one roster (labeled seats, circle, flip-symmetric ring), each selected by asking which symmetry is free: exactly the shape of the single-correct items the competitive papers set on this material.',
    ] },

    { kind: 'heading', text: 'Where the Engine Sits' },
    { kind: 'callout', tone: 'exam', title: 'Where this sits in the examinations', text: 'This lesson\u2019s exam ground is real, and it is labelled honestly. The JEE (Main) 2026 mathematics unit list carries permutations and combinations as a unit of the algebra bank (the banked syllabus audit\u2019s unit 4) — and the circular and restricted items are a recognised family inside it: round-table seatings, necklace and garland counts, alternating rows and circles, together and never-together at both. The single-correct items usually test WHICH model applies — the divide by $n$ versus the divide by $2$, the bundle versus the gap — which is precisely why this lesson runs the small-case census as its guard. NCERT class 11 chapter 6 carries the school-canon ground (its own circular-permutation section); Hall & Knight\u2019s Higher Algebra is the classic stretch; Khattar-style aptitude papers price the round table and the seating puzzle numerically. The module\u2019s own exercise typology — Single Correct, Multiple Correct, Linked Comprehension, Matrix Match, Numerical Value — is the typology our L4 sets mirror. Every item in this lesson and its exercises is our own design, labelled exam-style honestly, never lifted from any paper.' },
    { kind: 'table', caption: 'The model census — the whole lesson as one decision table: which count for which situation, and the trap that each row punishes. Every count in the third column is one the engines re-verified by literal enumeration before this prose was written.', head: ['The situation', 'The model', 'The count', 'The trap it punishes'], rows: [
      ['$n$ distinct in a row', 'labeled seats — every position distinct', '$n!$', 'none: the base model of lesson 6.3'],
      ['$n$ distinct at a round table', 'rotations identified, clockwise observable', '$(n-1)!$', 'quoting $n!$ prices numbered chairs — an overcount by $n$'],
      ['$n$ distinct on a necklace or keyring', 'rotations AND the flip identified', '$\tfrac{(n-1)!}{2}$', 'forgetting the flip overcounts by exactly $2$'],
      ['$r$ particular always together (row)', 'bundle: bind, arrange, price the inside', '$(n-r+1)!\,r!$', 'forgetting the internal $r!$ undercounts'],
      ['$r$ particular never together (row)', 'gaps: seat the unrestricted first', '$(n-r)!\,{}^{n-r+1}P_{r}$', 'using ${}^{n}C_{r}$ where distinct objects take ${}^{n}P_{r}$'],
      ['alternation, $m = w$, at a round table', 'seat one side, fill every gap', '$(m-1)!\,m!$', 'doubling for the two parities — the row\u2019s reflex'],
      ['two particular never together (circle)', 'subtraction: total minus together', '$(n-1)! - 2(n-2)!$', 'subtracting with the wrong together-count'],
    ] },
    { kind: 'callout', tone: 'historical', title: 'The round table in the classical texts', text: 'The two divides of this lesson are old friends of the classical algebra course. Hall & Knight\u2019s Higher Algebra — the classic stretch banked for this chapter — treats the circular readings inside its permutations chapter, and the modern competitive modules give them a section of their own; the garland with its reversed reading appears in the aptitude tradition as the bracelet-and-keyring puzzle. What has not changed across a century of texts is the discipline this lesson enforces: the counts are never quoted as rules to memorise — the shift argument and the observation-side argument are the whole content, and the small census is the audit. A solver who can rebuild those two arguments from a four-seat picture will price every round-table item any paper can set; a solver who memorised two formulas will halve a conference table.' },
    { kind: 'para', text: 'What waits ahead, in order. Lesson 6.5, "Combinations: the Selection Count", builds the engine this lesson kept borrowing in miniature — the gap filling that was a selection whenever the restricted objects were interchangeable (the twin T\u2019s of the LETTER drill chose their two gaps in ${}^5C_2$ ways), and the ${}^{12}C_6$ split of the two-table exercise: the selection count ${}^{n}C_{r}$ derived from the arrangement count, with the order divide installed as the first question of every problem. Lesson 6.6, "Distributions and the Classic Counting Puzzles", opens the puzzle room where these engines interlock — and it owns in full the equal-size divide that one exercise below has already touched (two identical tables of six), plus the inclusion–exclusion engine that a three-person never-together subtraction would need. The unit completion review walks the chapter\u2019s decision map — selection or arrangement, circle or line, flip or no flip — with the master count table. Farther out, the Combinatorics book of this library re-derives the whole ground at depth (bijections, generating functions, inclusion–exclusion at full generality) — the next rung for the reader who wants the necklace count by Burnside\u2019s lemma with repeated colours, the one case this lesson honestly does not price. And the handoff the chapter summary promises: the counted universes of this whole chapter — rows, circles, necklaces, gap fillings — are exactly the sample spaces that Probability inherits and divides. No Probability lesson exists yet in this library\u2019s plans; the inheritor is named here, as the positioning demands, and nothing is cited.' },

    { kind: 'terms', items: [
      { term: 'Permutation under restriction', def: 'an arrangement count with a condition imposed on where particular objects sit; the two families are ALWAYS TOGETHER (priced by binding a bundle) and NEVER TOGETHER (priced by gaps), and fixed-separation and alternation conditions are built from these two moves.' },
      { term: 'The bundle method (always together)', def: 'glue the $r$ restricted objects into one object, arrange the coarser roster, then multiply by the $r!$ internal orders: $(n-r+1)!\\,r!$ in a row, $(n-r)!\\,r!$ at a round table — identical twins carry no internal order.' },
      { term: 'The gap method (never together)', def: 'arrange the unrestricted $n-r$ objects first, then place the $r$ restricted objects into the gaps thus created, at most one each: $(n-r)!\\,{}^{n-r+1}P_{r}$ in a row, $(n-r-1)!\\,{}^{n-r}P_{r}$ at a round table, where the gap count equals the seated count.' },
      { term: 'Circular permutation', def: 'an arrangement of $n$ distinct objects with rotations identified — a round-table seating, fully described by each diner\u2019s two neighbours; the count is $(n-1)!$, the row count with one object spent as the anchor.' },
      { term: 'The shift argument', def: 'the proof of the circle count: each circular arrangement unwraps into exactly $n$ linear strings (reading clockwise from each seat in turn), so $n! = n \\times (n-1)!$ — shifting everyone one seat round the circle changes no neighbour pair.' },
      { term: 'Clockwise and anticlockwise arrangements', def: 'the two readings of one circular arrangement from its two observation sides; when the sides are not distinguished (necklace, garland, keyring, bracelet) the mirror pairing halves the count to $\\tfrac{(n-1)!}{2}$.' },
      { term: 'Necklace count', def: 'the number of distinct flip-symmetric rings of $n \\geq 3$ distinct beads — necklaces, garlands, keyrings, bracelets — equal to $\\tfrac{(n-1)!}{2}$; at $n = 2$ the count is $1$, the mirror of the single arrangement being itself.' },
      { term: 'The small-case census (the guard)', def: 'the discipline of literally listing the $n = 3$ and $n = 4$ cases before trusting any circular formula — $2$ circles from $6$ rows, $6$ from $24$, $1$ and $3$ garlands — the wrong-model catcher this chapter installed in lesson 6.1.' },
      { term: 'Alternation', def: 'a seating in which two kinds of object strictly alternate: in a row of equal numbers there are two parity patterns ($2\\,m!\\,w!$); at a round table there is none — $(m-1)!\\,m!$ with $m = w$.' },
      { term: 'The subtraction read', def: 'counting the complement — never-together as total minus together, $(n-1)! - 2(n-2)! = (n-3)(n-2)!$ at a round table — the complement seed lesson 6.1 planted, cashed here at tables, garlands and benches.' },
    ] },

    { kind: 'quiz', title: 'Check yourself: circular and restricted permutations', items: [
      { q: 'Five books stand on a shelf; two of them are a matched pair that must stay adjacent. The number of shelf arrangements is:', options: ['$5! = 120$', '$4! \\cdot 2! = 48$', '$2 \\cdot 5! = 240$', '$\\tfrac{5!}{2} = 60$'], answer: 1, explain: 'Bind the pair into one bundle: the shelf then carries four objects, arranged in $4! = 24$ ways, and the bundle carries $2! = 2$ internal orders — $48$ (option B). Option A\u2019s $120$ is the UNRESTRICTED shelf: it happily counts arrangements where the pair is split apart. Option C\u2019s $240 = 2 \\times 120$ multiplies the whole shelf by the pair\u2019s internal order — the $2!$ must act inside the bundle only, not on the full row. Option D\u2019s $60$ halves the shelf as if it were a necklace — a shelf has two distinct ends and no flip symmetry to divide by.' },
      { q: 'Eight diners take seats at a round table with unnumbered chairs. The number of seatings is:', options: ['$8! = 40320$', '$7! = 5040$', '$\\tfrac{8!}{2} = 20160$', '$6! = 720$'], answer: 1, explain: 'Rotations are free: each circular seating unwraps into exactly $8$ rows, so the count is $\\tfrac{8!}{8} = 7! = 5040$ (option B). Option A\u2019s $40320$ prices NUMBERED chairs — labeled seats, the row model of lesson 6.3. Option C\u2019s $20160$ pastes the necklace\u2019s divide-by-2 onto a table — but a diner can tell their left neighbour from their right one, so the mirror seating is a genuinely different seating; the divide by $2$ belongs to flippable objects only. Option D\u2019s $720 = 6!$ anchors two diners — one anchor already kills every rotation; a second steals a factor that is not free.' },
      { q: 'Twelve different beads are strung on a necklace. The number of distinct necklaces is:', options: ['$11! = 39916800$', '$\\tfrac{10!}{2} = 1814400$', '$\\tfrac{11!}{2} = 19958400$', '$12! = 479001600$'], answer: 2, explain: 'Two divides stack: rotations collapse the $12!$ rows by $12$ (the circle count $(12-1)! = 11!$), and the two observation sides of a necklace halve that — $\\tfrac{11!}{2} = 19958400$ (option C). Option A\u2019s $11!$ is the round-table count: it forgets that a necklace can be turned over, so it counts each garland twice. Option B\u2019s $\\tfrac{10!}{2} = 1814400$ shifts one bead too many — that is the ELEVEN-bead necklace. Option D\u2019s $12!$ is the plain row of beads — no divide at all, the labeled-seat reflex.' },
      { q: 'Six men and three women sit at a round table; no two women may be adjacent. The number of seatings is:', options: ['$5! \\cdot 6 \\cdot 5 \\cdot 4 = 14400$', '$\\tfrac{5! \\cdot 6 \\cdot 5 \\cdot 4}{2} = 7200$', '$5! \\cdot {}^6C_3 = 2400$', '$8! = 40320$'], answer: 0, explain: 'Seat the men first: $(6-1)! = 5! = 120$ circles of men, creating SIX gaps — a circle has no end seats, so the gap count equals the seated count; the three women occupy three of the six gaps in order, ${}^6P_3 = 6 \\cdot 5 \\cdot 4 = 120$ — so $5! \\cdot 120 = 14400$ (option A). Option B\u2019s $7200$ halves a table count: the necklace reflex again — a seating has an observable clockwise side. Option C\u2019s $2400 = 5! \\cdot {}^6C_3$ fills the gaps with a SELECTION — but the three women are distinct people, and three distinct people in three gaps is an arrangement (${}^6P_3$), not a choice. Option D\u2019s $40320 = 8!$ numbers the chairs: labeled seats, and it also ignores the restriction entirely.' },
      { q: 'Eight people sit at a round table; two particular people refuse to sit together. The number of seatings is:', options: ['$7! = 5040$', '$2 \\cdot 6! = 1440$', '$\\tfrac{7! - 2 \\cdot 6!}{2} = 1800$', '$7! - 2 \\cdot 6! = 3600$'], answer: 3, explain: 'Total: $(8-1)! = 7! = 5040$; together: the bundle of $7$ objects circles at $(7-1)! = 6!$, doubled by the pair\u2019s internal order — $2 \\cdot 6! = 1440$; so never-together is $5040 - 1440 = 3600$, the subtraction shape $(n-3)(n-2)! = 5 \\cdot 6!$ (option D). Option A\u2019s $5040$ ignores the refusal outright. Option B\u2019s $1440$ is the TOGETHER count — the complement misread, reporting the bad case as the answer. Option C\u2019s $1800$ halves the answer — an unearned divide: nothing about a round table of people identifies the two clockwise directions.' },
    ] },

    { kind: 'exercises', title: 'Exercises 6.4', sets: [
      { level: 'L1', questions: [
        { q: 'Four books stand on a shelf; two of them are a matched pair that must stay adjacent. Count the arrangements, and audit the count literally.', solution: [
          'Family (i): bind the pair into one bundle — the shelf now carries three objects: the bundle and two free books.',
          'Arrange them: $3! = 6$ shelves; price the bundle\u2019s inside: $2! = 2$ orders.',
          'Multiply: $3! \\times 2! = 12$ arrangements — equation (1) at its smallest full roster.',
          'Audit: the engines list all $4! = 24$ shelves and count exactly $12$ with the pair adjacent — half the shelves, precisely as the bundle engine predicts.',
        ], answer: '$12$ arrangements ($3! \\cdot 2! = 12$; literal census $12$ of $24$)' },
        { q: 'Three different keys are threaded on a keyring. Count the distinct rings, literally, and say why the count is not halved twice.', solution: [
          'A keyring rotates AND flips: rotations and the mirror are all one class.',
          'Literal census: the $3! = 6$ orderings fall into rotation classes of size $3$ — $2$ circular arrangements — and those two are mirrors of each other, so ONE ring.',
          'The formula agrees: $\\tfrac{(3-1)!}{2} = \\tfrac{2!}{2} = 1$.',
          'Why not halved twice: the two divides act on different things — the rotation divide collapses the $6$ rows to $2$ circles, the mirror divide pairs those $2$ circles into $1$ ring; no step is applied twice.',
          'Hence, $1$ distinct ring — the guard census\u2019s very first row, verified by hand.',
        ], answer: '$1$ distinct ring (census: $6$ rows → $2$ circles → $1$ ring)' },
      ] },
      { level: 'L2', questions: [
        { q: 'Nine athletes line up for a team photograph; three of them are juniors who must be pairwise non-adjacent. Count the lineups.', solution: [
          'Family (ii) at size nine: seat the unrestricted objects first — the six seniors, in $6! = 720$ ways.',
          'Now, six seniors in a row create $7$ gaps (including the two end seats).',
          'Place the three juniors into three distinct gaps, in order: ${}^7P_3 = 7 \\cdot 6 \\cdot 5 = 210$ placings.',
          'Multiply: $6! \\times 210 = 151200$ lineups — and the engines sweep all $9! = 362880$ rows and count exactly $151200$ clean ones.',
          'Note the honest contrast: a SUBTRACTION route for three restricted objects would need to overlap the three "bad" events — the inclusion–exclusion engine that lesson 6.6 owns, named forward; the gap route prices the count directly and that is exactly why it is preferred here.',
        ], answer: '$151200$ lineups ($6! \\cdot {}^7P_3 = 720 \\cdot 210$)' },
        { q: 'The letters of MASTERS are arranged; the two vowels (A and E) must never be adjacent. Count the arrangements both ways and reconcile.', solution: [
          'The roster: M, A, S, T, E, R, S — seven letters with S twice, so the unrestricted count is $\\tfrac{7!}{2!} = 2520$ distinct arrangements (lesson 6.3\u2019s alike engine, cited not re-taught).',
          'Route one, subtraction: vowels together — glue them into one object with $2! = 2$ inside orders; the coarser roster is the pair plus M, S, T, R, S, that is six objects with S doubled: $\\tfrac{6!}{2!} = 360$; times $2$: $720$ together.',
          'So, never-together by subtraction: $2520 - 720 = 1800$.',
          'Route two, gaps: arrange the frame M, S, T, R, S first — $\\tfrac{5!}{2!} = 60$ distinct frames — creating $6$ gaps; the vowels A and E are DISTINCT, so their filling is an arrangement: ${}^6P_2 = 30$; total $60 \\times 30 = 1800$.',
          'Both routes read $1800$ — and the engines\u2019 literal census of the $2520$ words confirms $720$ with the vowels adjacent and $1800$ clean; note the contrast with the twin-T drill: distinct vowels take an ORDERED gap filling.',
        ], answer: '$1800$ arrangements (both routes: $2520 - 720 = 1800 = \\tfrac{5!}{2!} \\cdot {}^6P_2$)' },
      ] },
      { level: 'L3', questions: [
        { q: 'The letters of MONARCH (seven distinct letters) are arranged so that exactly two letters stand between M and N. Count the arrangements.', solution: [
          'Build the block: M and N must sit at the two ENDS of a four-letter block, with exactly two of the other five letters inside.',
          'Choose and order the insiders: ${}^5C_2 \\cdot 2! = 20$ ordered fillings.',
          'The block\u2019s ends: M and N may sit in either order — $2$ end-assignments.',
          'Now, the block is one object: with the three remaining single letters, the row carries $4$ objects, arranged in $4! = 24$ ways.',
          'Multiply: $20 \\times 2 \\times 24 = 960$ — and the engines sweep all $7! = 5040$ rows and count exactly $960$ in which the positions of M and N differ by $3$.',
        ], answer: '$960$ arrangements ($2 \\cdot {}^5C_2 \\cdot 2! \\cdot 4! = 960$)' },
        { q: 'Four men and four women line up in a row, strictly alternating. Count the lineups, and reconcile the count with the round-table Illustration.', solution: [
          'A row of eight seats alternates in exactly TWO patterns: a man at seats $1, 3, 5, 7$, or a woman there — the row has ends, so the parity of the first seat is a real choice.',
          'Pattern one: $4! \\times 4! = 576$ lineups; pattern two: another $576$ — and the patterns are exclusive, so they ADD (lesson 6.1\u2019s addition rule, cited).',
          'So, $2 \\times 4! \\times 4! = 1152$ lineups — the engines sweep all $8! = 40320$ rows and count exactly $1152$ alternating ones.',
          'Reconcile with the circle: the Illustration priced the same roster at a round table as $(4-1)! \\times 4! = 144$ — and $1152 = 8 \\times 144$: the circle identifies the $8$ rotations of each alternating row pattern, so dividing the row count by $8$ recovers the circle count exactly.',
          'Hence, $1152$ — the row keeps both parity patterns and loses no rotation; the circle keeps one pattern and forgives eight rotations.',
        ], answer: '$1152$ lineups ($2 \\cdot 4! \\cdot 4!$; the round-table count is $144 = 1152/8$)' },
        { q: 'Five different medals are mounted (i) on a circular display rack whose rotations are identical, and (ii) on a garland that can also be flipped. Count both, and exhibit one mirror pair that the flip identifies.', solution: [
          '(i) The rack: rotations identified, clockwise observable — the circle count $(5-1)! = 4! = 24$ arrangements.',
          '(ii) The garland: rotations AND the mirror — $\\tfrac{4!}{2} = 12$ garlands.',
          'A mirror pair, literally: fix medal $P$ at the top and read the rest clockwise — the rack $P, Q, R, S, T$ and the rack $P, T, S, R, Q$ are two DIFFERENT racks, but ONE garland: the second is the first seen from the other side.',
          'The engines enumerate all $5! = 120$ rows: $24$ rotation classes, $12$ reflection classes, each rack-class pairing with exactly one mirror — the census $120 = 24 \\times 5 = 12 \\times 10$ closing both collapses.',
          'Hence, $24$ and $12$ — one flip apart, with the pairing exhibited on the roster itself.',
        ], answer: '(i) $24 = 4!$; (ii) $12 = \\tfrac{4!}{2}$; mirror pair $P,Q,R,S,T$ against $P,T,S,R,Q$ (clockwise from $P$)' },
      ] },
      { level: 'L4', questions: [
        { q: 'Exam-style (Single Correct). Nine people sit at a round table; two particular people are never to sit together. The number of seatings is: (A) $2 \\cdot 7! = 10080$  (B) $8! = 40320$  (C) $8! - 2 \\cdot 7! = 30240$  (D) $2 \\cdot 8! = 80640$. Solve with full reasoning.', solution: [
          'Total seatings: $(9-1)! = 8! = 40320$ — the shift argument\u2019s division by $9$.',
          'Together: the bundle of two becomes one object — $8$ objects circle at $(8-1)! = 7!$ — doubled by the pair\u2019s $2!$ inside orders: $2 \\cdot 7! = 10080$.',
          'Never: $40320 - 10080 = 30240$ — the subtraction shape $(n-3)(n-2)! = 6 \\cdot 7!$ at $n = 9$.',
          'So, (C) $30240$. (A) is the together count — the complement misread; (B) is the unrestricted total, restriction ignored; (D) doubles the total — the reflex of multiplying by $2$ without any case split at all.',
          'Engine audit: the engines enumerate the $40320$ circles (fix one neutral diner as the anchor) and count exactly $10080$ with the pair adjacent — the census behind every option.',
        ], answer: '(C) $30240$ seatings ($8! - 2 \\cdot 7! = 6 \\cdot 7!$)' },
        { q: 'Exam-style (Multiple Correct). Which of the following statements are TRUE? (A) For $n \\geq 3$ distinct beads on a necklace, the count is $\\tfrac{(n-1)!}{2}$. (B) At a round table of $n \\geq 3$ diners, the seating count is $\\tfrac{n!}{2}$. (C) If $r$ particular of $n$ distinct objects in a row must stay together, the count is $(n-r+1)!\\,r!$. (D) At a round table of $m$ men and $r$ women with no two women together, one needs $r \\leq m$. Identify every true statement.', solution: [
          '(A) TRUE — the necklace divide: the perfect mirror pairing halves the circle count, proved for $n \\geq 3$; the engines sweep the census at $n = 3, 4, 5, 6$ — $1, 3, 12, 60$ classes — exactly $\\tfrac{(n-1)!}{2}$ at each.',
          '(B) FALSE — a round table seats $n$ diners in $(n-1)!$, and $\\tfrac{n!}{2}$ already disagrees at $n = 3$: the honest count is $2$, while $\\tfrac{3!}{2} = 3$ — the halving belongs to flippable objects, and people are not flippable.',
          '(C) TRUE — the bundle count of equation (1), audited by literal enumeration at $(n, r) = (5, 2)$: $48$; $(6, 2)$: $240$; $(7, 3)$: $720$ — each exactly $(n-r+1)!\\,r!$.',
          '(D) TRUE — the women need one gap each, and $m$ seated men create exactly $m$ gaps (a circle has no end seats): $r > m$ forces two women into one gap, and the count is honestly $0$ — the engines witness both sides: four women among three men seat in $0$ no-adjacent ways at a round table, while two women among three men seat in $(3-1)! \\times {}^3P_2 = 12$ ways.',
          'Hence, (A), (C) and (D) are true; only the halved table (B) fails — the wrong model with the wrong divide.',
        ], answer: '(A), (C), (D) true; (B) false — the table count is $(n-1)!$, not $\\tfrac{n!}{2}$ (witness $n = 3$: $2 \\neq 3$)' },
        { q: 'Exam-style (Linked Comprehension). A jeweller strings seven different charms on a bracelet, which may be turned over. (i) Count the bracelets. (ii) Count the bracelets on which two particular charms hang adjacent. (iii) Count the bracelets on which they never hang adjacent.', solution: [
          '(i) The bracelet is the flip-symmetric circle: $\\tfrac{(7-1)!}{2} = \\tfrac{6!}{2} = 360$.',
          '(ii) Bundle the pair: six objects on a flippable ring price at $\\tfrac{(6-1)!}{2} = \\tfrac{5!}{2} = 60$, and the pair\u2019s inside carries $2! = 2$ orders — $120$.',
          '(iii) Subtraction: $360 - 120 = 240$ — the never-together shape of equation (6) transplanted to the flippable ring: $\\tfrac{(n-1)!}{2} - 2 \\cdot \\tfrac{(n-2)!}{2} = \\tfrac{(n-3)(n-2)!}{2}$, at $n = 7$: $\\tfrac{4 \\cdot 5!}{2} = 240$.',
          'Engine audit: the literal census of the $360$ bracelet classes counts exactly $120$ with the pair adjacent and $240$ without — every part of the comprehension verified.',
          'Hence, $360$, $120$ and $240$ — the lesson\u2019s three models stacked on one roster, exactly as a linked-comprehension item likes them.',
        ], answer: '(i) $360$; (ii) $120$; (iii) $240$ bracelets' },
      ] },
      { level: 'L5', questions: [
        { q: 'Four women and six men dine at a round table; no two women may sit together. Count the seatings.', solution: [
          'Seat the men first: $(6-1)! = 5! = 120$ circular arrangements of the men — the unrestricted family.',
          'The six men create exactly six gaps (no end seats on a circle).',
          'Place the four women into four distinct gaps, in order: ${}^6P_4 = 6 \\cdot 5 \\cdot 4 \\cdot 3 = 360$.',
          'Multiply: $120 \\times 360 = 43200$ seatings.',
          'Engine audit: fix one man as the anchor and enumerate the $9! = 362880$ clockwise seatings of the other nine — exactly $43200$ carry no two women adjacent; the formula\u2019s model is the census\u2019s model, and the $r \\leq m$ licence is satisfied ($4 \\leq 6$).',
        ], answer: '$43200$ seatings ($5! \\cdot {}^6P_4 = 120 \\cdot 360$)' },
        { q: 'Twelve guests are seated at two round tables, six at each: (i) the tables are distinguishable — an oak table and a garden table; (ii) the two tables are identical. Count both, and name the divide that separates them.', solution: [
          '(i) Two independent stages: choose the six guests for the oak table — ${}^{12}C_6 = 924$ selections (lesson 6.5\u2019s engine, named forward) — then seat each table round: $5!$ circles each.',
          'So, $924 \\times 5! \\times 5! = 924 \\times 14400 = 13305600$ dinners.',
          '(ii) Identical tables: the dinner (oak set, garden set) and the dinner (garden set, oak set) are the SAME dinner — the seatings split into swapped pairs, so divide by $2!$: $6652800$.',
          'The divide is the EQUAL-SIZE divide: swapping two groups of equal size reproduces the same split, so the count divides by $2!$ — precisely the honesty that lesson 6.6, "Distributions and the Classic Counting Puzzles", prices in full when it distributes distinct objects into groups.',
          'Small-instance audit: four guests at two identical round tables, two at each — ${}^4C_2 \\times 1! \\times 1! \\div 2! = 3$ dinners, and the engines list them literally: $\\{AB, CD\\}$, $\\{AC, BD\\}$, $\\{AD, BC\\}$.',
        ], answer: '(i) $13305600$; (ii) $6652800$ — the equal-size $\\div\\,2!$ divide' },
        { q: 'Ten people sit at a round table. Count the seatings (i) without conditions, (ii) with two particular people together, (iii) with those two never together — and audit the model at full size.', solution: [
          '(i) $(10-1)! = 9! = 362880$ — the shift argument\u2019s division by $10$.',
          '(ii) Bundle: nine objects at the round table price at $(9-1)! = 8! = 40320$, times the pair\u2019s $2! = 2$ inside orders: $80640$.',
          '(iii) Subtraction: $362880 - 80640 = 282240 = 7 \\cdot 8!$ — the $(n-3)(n-2)!$ shape at $n = 10$.',
          'Audit at full size: the engines fix one neutral person as the anchor and enumerate all $9! = 362880$ circles; exactly $80640$ carry the pair adjacent — the subtraction verified at the biggest roster this chapter needs.',
          'Hence, $362880$, $80640$ and $282240$ — one roster, three reads, each audited.',
        ], answer: '(i) $362880$; (ii) $80640$; (iii) $282240$ ($= 7 \\cdot 8!$)' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove that the number of circular arrangements of $n \\geq 3$ distinct objects in which a particular pair is never adjacent is $(n-1)! - 2(n-2)! = (n-3)(n-2)!$, and verify the formula at $n = 3, 4, 5$ by literal census — including the honest zero at $n = 3$.', solution: [
          'Total: $(n-1)!$ circles, by the shift argument.',
          'Together: bundle the pair — $n-1$ objects around the circle price at $(n-2)!$, and the pair\u2019s $2!$ inside orders double it: $2(n-2)!$.',
          'Subtract — adjacent and non-adjacent are exclusive and exhaustive: $(n-1)! - 2(n-2)! = (n-2)!\\,(n-1) - 2(n-2)! = (n-3)(n-2)!$.',
          'Census $n = 3$: the formula reads $(0)(1!) = 0$ — and indeed with three objects every pair IS adjacent on a circle (each object\u2019s two neighbours are the other two objects): the engines list both circles and find $0$ clean. The zero is honest, not a failure of the formula.',
          'Census $n = 4$: $(1)(2!) = 2$ — the engines list the $6$ circles of $P, Q, R, S$ and find exactly $2$ with $P$ and $Q$ non-adjacent (the circles $RQS$ and $SQR$ clockwise from $P$, where $R$ and $S$ shield $P$ from $Q$ on both sides).',
          'Census $n = 5$: $(2)(3!) = 12$ — the engines count $12$ clean among the $24$ circles. Hence the shape is proved and thrice witnessed, zero included.',
        ], answer: 'proved: $(n-1)! - 2(n-2)! = (n-3)(n-2)!$; censuses $0, 2, 12$ at $n = 3, 4, 5$ (the $n = 3$ zero honest — everyone is adjacent to everyone)' },
        { q: 'Prove that the number of necklaces of $n$ distinct beads is $\\tfrac{(n-1)!}{2}$ for $n \\geq 3$ by the mirror-pairing argument — including the lemma that no circular arrangement of $n \\geq 3$ distinct beads equals its own mirror — and explain honestly why the count at $n = 2$ is $1$ and not $\\tfrac{1}{2}$. Verify by census at $n = 2, 3, 4, 5$.', solution: [
          'The mirror map reverses the clockwise reading of a circular arrangement, and it is an involution: the mirror of the mirror is the original.',
          'The no-fixed-point lemma: in any circular arrangement of $n \\geq 3$ distinct beads, take a bead $X$ — its clockwise neighbour $Y$ and its anticlockwise neighbour $Z$ are two DIFFERENT beads (at least three beads, all distinct). In the mirror, $X$\u2019s clockwise neighbour is $Z$, so the mirror disagrees with the original about $X$\u2019s clockwise neighbour: the two arrangements are different. No arrangement is its own mirror.',
          'So, the $(n-1)!$ circular arrangements split into pairs $\\{A, \\text{mirror of } A\\}$, and each pair is ONE necklace: seen from one side the necklace reads $A$, from the other side its mirror — turning a necklace over changes the observer, not the object.',
          'Hence $\\tfrac{(n-1)!}{2}$ necklaces for $n \\geq 3$ — a perfect pairing, so an exact halving.',
          'The $n = 2$ edge: with two beads, the mirror of the single arrangement is ITSELF — each bead\u2019s clockwise neighbour is also its anticlockwise neighbour, since there is only one other bead. There is nothing to pair and nothing to halve: the necklace count is $(2-1)! = 1$, where $\\tfrac{(n-1)!}{2}$ would misprice it as $\\tfrac{1}{2}$ — a warning that a formula\u2019s hypotheses are part of the formula.',
          'Census: the engines enumerate literally — $n = 2$: $2! = 2$ rows, $1$ circle, $1$ necklace (the mirror IS itself); $n = 3$: $6$ rows, $2$ circles, $1$ necklace; $n = 4$: $24$ rows, $6$ circles, $3$ necklaces; $n = 5$: $120$ rows, $24$ circles, $12$ necklaces — and for every $n \\geq 3$ each necklace class carries exactly two circles, the pairing verified.',
        ], answer: 'proved by mirror-pairing with the no-fixed-point lemma; censuses $1, 1, 3, 12$ at $n = 2, 3, 4, 5$; at $n = 2$ the count is $1$ — the mirror of the one arrangement is itself, so nothing halves' },
      ] },
    ] },
  ],
}

/* ------------------------------------------------------------------ */
/* figures for lesson 6.4 — the shift-rotation wheel, the round-table  */
/* gap layout, and the necklace flip (vivid palette, plain labels)    */
/* ------------------------------------------------------------------ */

function shiftWheelSvg(): string {
  // left: circle P(top) Q(right) R(bottom) S(left) with an anticlockwise
  // shift arrow; right: the four unwrapping rows (cut before P/Q/R/S)
  const cx = 168, cy = 158, r = 96
  const seats: Array<[string, number, number]> = [
    ['P', cx, cy - r],
    ['Q', cx + r, cy],
    ['R', cx, cy + r],
    ['S', cx - r, cy],
  ]
  const dots = seats.map(([, x, y]) => `<circle cx="${x}" cy="${y}" r="13" fill="#ea580c"/>`).join('')
  const labels = seats.map(([t, x, y]) => `<text x="${x}" y="${y + 4.5}" font-size="12.5" font-weight="700" text-anchor="middle" fill="#ffffff">${t}</text>`).join('')
  const spokes = seats.map(([, x, y]) => `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#d97706" stroke-width="1.2" stroke-dasharray="3 4"/>`).join('')
  // anticlockwise shift arrow: an arc just outside the circle, with a head
  const aR = r + 24
  const ax1 = cx + aR * Math.cos((-70 * Math.PI) / 180), ay1 = cy + aR * Math.sin((-70 * Math.PI) / 180)
  const ax2 = cx + aR * Math.cos((-170 * Math.PI) / 180), ay2 = cy + aR * Math.sin((-170 * Math.PI) / 180)
  const rows: Array<[string, string]> = [
    ['cut before P', 'P  Q  R  S'],
    ['cut before Q', 'Q  R  S  P'],
    ['cut before R', 'R  S  P  Q'],
    ['cut before S', 'S  P  Q  R'],
  ]
  const rowSvg = rows.map(([lab, str], i) => `
  <rect x="356" y="${62 + i * 52}" width="330" height="40" rx="7" fill="#fef3c7" stroke="#d97706" stroke-width="1.2"/>
  <text x="372" y="${87 + i * 52}" font-size="11" font-weight="700" fill="#0f766e">${lab}</text>
  <text x="524" y="${87 + i * 52}" font-size="14" font-weight="700" text-anchor="middle" fill="#166534" font-family="Georgia, serif">${str}</text>`).join('')
  return `<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The shift argument at four seats. On the left a circle carries the letters P at top, Q at right, R at bottom and S at left, with a dashed amber arrow urging an anticlockwise shift: moving everyone one seat round changes no neighbour pair, so the four shifts are one seating. On the right, four amber rows show the same seating unwrapped at each cut point: cut before P reads P Q R S, cut before Q reads Q R S P, cut before R reads R S P Q, cut before S reads S P Q R — four rows, one circle, so twenty-four rows collapse to six circles, four unwrappings each.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the shift argument: rotate the circle, unwrap it four ways</text>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#16a34a" stroke-width="2.4"/>
  ${spokes}
  ${dots}
  ${labels}
  <text x="${cx}" y="${cy - 14}" font-size="10" text-anchor="middle" fill="#0f766e">the table</text>
  <path d="M ${ax1} ${ay1} A ${aR} ${aR} 0 0 0 ${ax2} ${ay2}" fill="none" stroke="#d97706" stroke-width="2"/>
  <path d="M ${ax2} ${ay2} l 9 -4 l -3 10 z" fill="#d97706"/>
  <text x="${cx}" y="290" font-size="10.5" text-anchor="middle" fill="#0f766e">shift one seat anticlockwise: every neighbour pair survives — same seating</text>
  <text x="521" y="48" font-size="10.5" text-anchor="middle" fill="#0f766e">one circular seating = exactly 4 rows</text>
  ${rowSvg}
</svg>`
}

function roundTableGapSvg(): string {
  // a round table with 5 men (M1..M5) seated; 5 amber gap slots between
  // them; 3 women (W1..W3) placed in three of the gaps, 2 gaps left empty
  const cx = 250, cy = 165, rSeat = 104
  const men: Array<[string, number, number, number, number]> = []
  for (let i = 0; i < 5; i++) {
    const ang = (-90 + i * 72) * (Math.PI / 180)
    men.push([`M${i + 1}`, cx + rSeat * Math.cos(ang), cy + rSeat * Math.sin(ang), cx + (rSeat - 26) * Math.cos(ang), cy + (rSeat - 26) * Math.sin(ang)])
  }
  const menSvg = men.map(([t, x, y, lx, ly]) => `
  <circle cx="${x}" cy="${y}" r="15" fill="#16a34a"/>
  <text x="${x}" y="${y + 4}" font-size="11" font-weight="700" text-anchor="middle" fill="#ffffff">${t}</text>
  <line x1="${lx}" y1="${ly}" x2="${cx}" y2="${cy}" stroke="#5eead4" stroke-width="1.1" stroke-dasharray="3 4"/>`).join('')
  // gaps sit midway between adjacent men, slightly outside the seat circle;
  // every gap position renders an amber slot backing — the three women sit
  // ON three of the five slots (the honest-drawing fix from the Q3 VLM
  // audit: the caption says "take three of the five gaps", so all five
  // slots are drawn, three carrying a woman on top)
  const gaps: Array<[number, number]> = []
  for (let i = 0; i < 5; i++) {
    const ang = (-90 + i * 72 + 36) * (Math.PI / 180)
    gaps.push([cx + (rSeat + 30) * Math.cos(ang), cy + (rSeat + 30) * Math.sin(ang)])
  }
  // women placed in gaps 0,1,2; gaps 3,4 empty
  const gapSvg = gaps.map(([x, y], i) => {
    const slot = `
  <rect x="${x - 13}" y="${y - 13}" width="26" height="26" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1.4"/>`
    if (i < 3) {
      return `${slot}
  <circle cx="${x}" cy="${y}" r="15" fill="#ea580c"/>
  <text x="${x}" y="${y + 4}" font-size="11" font-weight="700" text-anchor="middle" fill="#ffffff">W${i + 1}</text>`
    }
    return `${slot}
  <text x="${x}" y="${y + 4}" font-size="11" font-weight="700" text-anchor="middle" fill="#d97706">gap</text>`
  }).join('')
  const line1 = [
    { y: 66, txt: 'seat the 5 men first' },
    { y: 84, txt: '(5−1)! = 24 circles' },
  ].map((o) => `<text x="508" y="${o.y}" font-size="11.5" font-weight="700" fill="#166534">${o.txt}</text>`).join('')
  const line2 = [
    { y: 118, txt: 'a circle has no end seats:' },
    { y: 136, txt: '5 seated men create 5 gaps' },
  ].map((o) => `<text x="508" y="${o.y}" font-size="11.5" fill="#0f766e">${o.txt}</text>`).join('')
  const line3 = [
    { y: 170, txt: '3 women into 3 distinct gaps' },
    { y: 188, txt: '5 × 4 × 3 = 60 placings' },
  ].map((o) => `<text x="508" y="${o.y}" font-size="11.5" fill="#0f766e">${o.txt}</text>`).join('')
  const line4 = [
    { y: 222, txt: 'together: 24 × 60 = 1440' },
    { y: 240, txt: 'two empty gaps stay empty' },
  ].map((o) => `<text x="508" y="${o.y}" font-size="11.5" font-weight="700" fill="#166534">${o.txt}</text>`).join('')
  return `<svg viewBox="0 0 720 348" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The gap method at a round table. Five green dots marked M1 through M5 sit around a table; between each adjacent pair, slightly outside the circle, sits an amber gap slot — five amber slots in all. Three orange dots marked W1, W2 and W3 sit on three of the five slots, and the remaining two slots stay empty, labelled gap. A side panel reads: seat the five men first, that is five minus one factorial, twenty-four circles; a circle has no end seats, so five seated men create five gaps; three women into three distinct gaps, five times four times three equals sixty placings; together twenty-four times sixty, one thousand four hundred forty seatings, two empty gaps stay empty.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the gap method at a round table: five seated create five gaps</text>
  <circle cx="${cx}" cy="${cy}" r="70" fill="#ffedd5" stroke="#d97706" stroke-width="1.6"/>
  <text x="${cx}" y="${cy + 4}" font-size="10.5" text-anchor="middle" fill="#0f766e">table</text>
  <circle cx="${cx}" cy="${cy}" r="${rSeat}" fill="none" stroke="#16a34a" stroke-width="2"/>
  ${menSvg}
  ${gapSvg}
  <text x="360" y="340" font-size="10.5" text-anchor="middle" fill="#0f766e">at most one woman per gap — the gap count equals the seated count, no end seats on a circle</text>
  <line x1="470" y1="56" x2="470" y2="250" stroke="#fcd34d" stroke-width="1.2"/>
  ${line1}
  ${line2}
  ${line3}
  ${line4}
</svg>`
}

function necklaceFlipSvg(): string {
  // two views of one four-bead garland: side A reads P,Q,R,S clockwise;
  // side B (the same garland turned over) reads P,S,R,Q clockwise
  const beads: Array<[string, string]> = [
    ['P', '#ea580c'],
    ['Q', '#16a34a'],
    ['R', '#d97706'],
    ['S', '#0d9488'],
  ]
  const ring = (cx: number, cy: number, r: number, order: number[], clockwise: boolean): string => {
    // order lists bead indices placed clockwise starting at top
    const pos: Array<[number, number]> = []
    for (let i = 0; i < order.length; i++) {
      const ang = (-90 + i * 90) * (Math.PI / 180)
      pos.push([cx + r * Math.cos(ang), cy + r * Math.sin(ang)])
    }
    const dots = pos
      .map(([x, y], i) => {
        const [t, fill] = beads[order[i]]
        return `<circle cx="${x}" cy="${y}" r="16" fill="${fill}"/><text x="${x}" y="${y + 4.5}" font-size="12.5" font-weight="700" text-anchor="middle" fill="#ffffff">${t}</text>`
      })
      .join('')
    const dir = '↻'
    const label = 'read clockwise'
    const reading = order.map((i) => beads[i][0]).join(', ')
    return `${dots}<text x="${cx}" y="${cy - 40}" font-size="11" font-weight="700" text-anchor="middle" fill="#0f766e">${reading}</text><text x="${cx + 0}" y="${cy + 46}" font-size="10" text-anchor="middle" fill="#0f766e">${label} ${dir}</text>`
  }
  const left = ring(178, 170, 92, [0, 1, 2, 3], true)
  const right = ring(542, 170, 92, [0, 3, 2, 1], false)
  return `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The necklace flip. Two views of one garland of four coloured beads. On the left, seen from side A, the beads read clockwise P, then Q, then R, then S. On the right, the same garland seen from side B reads clockwise P, then S, then R, then Q — the reverse reading. Two circular arrangements, one necklace: the mirror pairing that halves the circle count to one half of it. A dashed amber arrow between the two views marks the flip.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">one garland, two clockwise reads — the necklace divide</text>
  <text x="178" y="54" font-size="11.5" font-weight="700" text-anchor="middle" fill="#166534">side A: clockwise P, Q, R, S</text>
  <text x="542" y="54" font-size="11.5" font-weight="700" text-anchor="middle" fill="#166534">side B: clockwise P, S, R, Q</text>
  <circle cx="178" cy="170" r="92" fill="none" stroke="#16a34a" stroke-width="2.2"/>
  <circle cx="542" cy="170" r="92" fill="none" stroke="#16a34a" stroke-width="2.2"/>
  ${left}
  ${right}
  <path d="M 300 170 L 420 170" stroke="#d97706" stroke-width="2" stroke-dasharray="6 5"/>
  <path d="M 420 170 l -12 -7 l 0 14 z" fill="#d97706"/>
  <text x="360" y="152" font-size="10.5" font-weight="700" text-anchor="middle" fill="#d97706">turn the garland over</text>
  <text x="360" y="300" font-size="10.5" text-anchor="middle" fill="#0f766e">two circular arrangements, one necklace — so the circle count halves; at a round table the two reads are different seatings</text>
</svg>`
}

/**
 * Advanced Algebra — chapter 6, lesson 6.5
 * "Combinations: the Selection Count" (parallel-swarm run, task 6-e).
 *
 * NOTE FOR THE ORCHESTRATOR (paste-time): this part-file lives in
 * scripts/aa-ch06-work/; when pasted into
 * src/data/library/books/mathematics/advanced-algebra/ch-06.ts the type
 * import above must become the chapter file's own
 * `import type { Chapter, Lesson } from '../../../types'` (or join the
 * existing import) — everything else is the chapter's exact Lesson shape,
 * exported here as `lesson65` per the ch-04.ts internal naming.
 *
 * VERIFY-FIRST: the engine was green BEFORE this prose was declared done —
 * `bun run scripts/aa-ch06-work/run-65.ts` stands 124/124 (section I, the
 * brute-force engines, 87/87; section J, the structural pins, 37/37) and
 * re-verifies every number below: every nCr value by literal small-set
 * enumeration, both censuses (2^n and 2^n − 1) by literal subset
 * enumeration through n = 6 and by the row-doubling read through n = 8, the
 * Pascal in/out split by literal bucket counts, every product-chain count
 * by double enumeration, the quiz keys, and all fifteen exercise answers.
 * The engines caught two real drafting slips before the prose stood: the
 * quiz Q5 distractor originally written 465 (a Σ_{r≤5} miscomputed with a
 * stray 210) is now the honest 381 = 9 + 36 + 84 + 126 + 126, and a
 * garbled clause in the Q1 explain was rewritten. Ground: the m2-07 module
 * band 7.13–7.24 (Combination: Elementary — the select-then-arrange
 * two-step; Properties of nCr; Combination and Arrangement; All Possible
 * Combinations — selection of zero or more / at least one) — METHOD SHAPES
 * studied, never reproduced: every roster, word, figure, Illustration and
 * exercise below is OUR OWN, recomputed by the engine before a line of
 * prose was pinned.
 *
 * Lesson census (engine-pinned): 13 Illustrations incl. the TWO hosted
 * example-family folds ("Selection of Zero or More Objects from n Different
 * Objects" — the camper 2^6 census + the stamp row-sum census; "Selection
 * of At Least One Object from n Different Objects" — the borrower 2^7 − 1
 * census + the comics-and-atlases (2^4 − 1)(2^2 − 1) = 45 chain); 4
 * derivations (the order divide nPr = nCr · r!, the complement law as the
 * choose-is-reject bijection, Pascal's identity as the in/out split, the
 * 2^n per-object census); 5 formula cards; 8 tagged equations; 2 original
 * SVG figures (the select-then-arrange split diagram; the Pascal in/out
 * split) on the vivid palette only; 2 census tables; 8 terms; quiz 5
 * items, keys [0, 1, 1, 1, 3]; exercises 15 in L1–L6 = 2/2/3/3/3/2 with
 * the Cengage exam typology honestly labelled (Single Correct + Multiple
 * Correct + Linked Comprehension at L4; a second Linked Comprehension and
 * a Numerical Value at L5); the
 * Probability handoff NAMED in prose (favourable selections over total
 * selections); prerequisites pinned to AA 6.2 + 6.3; honest authored word
 * count 8,251 by countLessonWords (engine check J30, floor 4,500).
 */
const lesson65: Lesson = {
  id: 'aa-combinations-the-selection-count',
  number: '6.5',
  title: 'Combinations: the Selection Count',
  concepts: [
    'combination as selection, not arrangement',
    'the order divide: nCr = nPr / r!',
    'the complement law — choose is reject',
    'Pascal’s identity as the in/out split',
    'the ratio law and how a row grows',
    'the 2ⁿ census of all selections',
    'the 2ⁿ − 1 at-least-one census',
    'selection-then-arrangement words',
  ],
  objectives: [
    'Derive ${}^nC_r$ from ${}^nP_r$ by the two-step split — every arrangement is a selection followed by an ordering of the cast — and never treat the fraction as a memorised formula: the select-then-arrange route rebuilds it in one line.',
    'Re-read lesson 6.2’s factorial-algebra properties as selection facts: prove the complement law by the choose-is-reject bijection, Pascal’s identity by the in/out split on one marked object, and the ratio law as the growth of a row — counting proofs beside 6.2’s algebraic ones, cited never re-taught.',
    'Run the equality discipline as a mirror hunt: ${}^nC_x = {}^nC_y$ forces $x = y$ or $x + y = n$, because a row strictly climbs to its middle — and solve equation-shaped census questions without listing a thing.',
    'Count the two censuses by the per-object decision: $2^n$ selections of zero or more from $n$ different objects, $2^n - 1$ of at least one — and run both engines on rosters of our own, splitting a census by any marked object into two equal halves.',
    'Price at-least-one-of-each product chains $(2^a - 1)(2^b - 1)$ and the at-most-k symmetry hunts on odd rosters, checking every number against a literal enumeration before it is reported.',
    'Recognise and price selection-then-arrangement words — ${}^nC_r \\cdot r!$, across single rosters and two-group casts — and know the one question that governs every counting word: does the order matter here?',
    'Name the Probability handoff honestly: a probability is favourable selections over total selections, and the counted universe this chapter builds is exactly the ground Probability inherits.',
  ],
  prerequisites: ['aa-factorials-and-the-counting-toolkit', 'aa-permutations-the-arrangement-count'],
  sources: ['cengage-m2-07', 'cengage-jee-style', 'ncert-math11-ch6-permutations-combinations', 'jee-main-2026-syllabus', 'hall-knight-higher-algebra', 'khattar-qa-4e', 'openstax-college-algebra'],
  blocks: [
    { kind: 'para', text: 'Lesson 6.3, "Permutations: the Arrangement Count", priced the ordered world: fill $r$ seats from $n$ different objects and the chain of shrinking choices hands you ${}^nP_r$. Lesson 6.4, "Circular and Restricted Permutations", taught the one honest repair when an arrangement engine overcounts — the circle counted each arrangement $n$ times over and divided by $n$. But most of the questions that actually matter are quieter than either. A committee of three is chosen from nine people, and nobody asks who was picked first. A hand of five is dealt, not sequenced. A triple of points is taken to form a triangle, not a parade. In every one of these the CAST matters and the order does not: choosing Amira, Ben and Chet is choosing Ben, Chet and Amira. The arrangement engine will happily count such questions — and overcount them, $r!$ times over. This lesson builds the repair, and the repair is one question asked before any formula is trusted: does the order matter here?' },
    { kind: 'para', text: 'The route is four storeys. First, the order divide itself: every arrangement of $r$ objects taken from $n$ is a SELECTION of the $r$ followed by an ARRANGEMENT of what was selected — so ${}^nP_r$ factors as the selection count times $r!$, and the selection count ${}^nC_r$ is derived, never memorised. Second, the selection facts: lesson 6.2, "Factorials and the Counting Toolkit", proved the properties of the fraction ${}^nC_r = \\tfrac{n!}{r!\\,(n-r)!}$ by algebra; each of those identities is a counting statement in disguise, and this lesson re-reads every one of them as a fact about selections — choose is reject, the in/out split, how a row grows. Third, the two censuses: the total number of selections from $n$ different objects is $2^n$, because each object makes its own binary decision; deleting the empty selection leaves $2^n - 1$ — and the two hosted example families of this lesson run on exactly those two engines. Fourth, the words that weld the counts together: selection-then-arrangement (${}^nC_r \\cdot r!$), the at-least-one-of-each product chains, and the symmetry hunts that solve equation-shaped questions without listing a thing. Throughout, the small-case census discipline that lesson 6.1, "The Fundamental Principle of Counting", installed as the chapter’s habit is the guard: sizes two and three are listed by hand before any formula is believed.' },

    { kind: 'heading', text: 'Select, Then Arrange: the Order Divide' },
    { kind: 'para', text: 'Take the four-object roster $a, b, c, d$ and ask for two of them. The honest first move is the census — list everything, both kinds of outcome, and compare. The list is short enough to hold in one glance, and the comparison it forces is the entire lesson:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) the selections of two: $ab$, $ac$, $ad$, $bc$, $bd$, $cd$ — six unordered pairs, six casts;',
      '(ii) the arrangements of two: those same six pairs, each in two orders — twelve ordered pairs, which is ${}^4P_2 = 4 \\times 3 = 12$, exactly the number 6.3’s seat-chain hands over;',
      '(iii) the collapse: $ab$ and $ba$ are two different arrangements but the SAME selection — the cast $\\{a, b\\}$ is one cast whichever name leads. Six casts, twelve orderings, a factor of exactly $2!$ between them.',
    ] },
    { kind: 'callout', tone: 'definition', title: 'Combination: the selection count', text: 'A COMBINATION of $r$ objects from $n$ different objects is a SELECTION — a subset of the roster — in which the identity of the cast matters and the order of its choosing does not. The number of such selections is written ${}^nC_r$ (also $\\binom{n}{r}$): the count of $r$-element selections from an $n$-element roster. Thus, for the roster $a, b, c, d$: ${}^4C_2 = 6$, the six selections listed above, while ${}^4P_2 = 12$ counts their orderings — and the two counts differ by exactly $2!$, the number of orderings of any fixed cast.' },
    { kind: 'derivation', title: 'The order divide: deriving the selection count from the arrangement count', statement: 'For $0 \\leq r \\leq n$ over different objects: $\\;{}^nP_r = {}^nC_r \\cdot r!$, and consequently $\\;{}^nC_r = \\tfrac{n!}{r!\\,(n-r)!}$.', steps: [
      { label: 'Name the two jobs', formula: '\\text{(job 1) select } r \\text{ of the } n; \\qquad \\text{(job 2) order the chosen } r', explanation: 'Every arrangement of $r$ objects taken from $n$ completes two jobs in sequence — which $r$, then in what order. Lesson 6.1’s multiplication rule prices the chain as soon as the two counts are named.' },
      { label: 'Count job two', formula: 'r! \\text{ orderings of any fixed cast}', explanation: 'Once the cast is fixed, arranging it is 6.3’s own engine at full length: $r$ seats filled by $r$ distinct objects, $r!$ ways. The number depends on nothing but the size of the cast — EVERY cast of $r$ different objects has exactly $r!$ orderings.' },
      { label: 'Count the chain', formula: '\\left(\\text{selections}\\right) \\times r!', explanation: 'If the selections number ${}^nC_r$ and each contributes $r!$ arrangements, then the two-step chain SELECT-THEN-ARRANGE produces ${}^nC_r \\cdot r!$ arrangements — the multiplication rule of lesson 6.1 run over the two jobs.' },
      { label: 'Price the same set the other way', formula: '{}^nP_r = \\tfrac{n!}{(n-r)!}', explanation: 'But 6.3 already counted the arrangements directly: $r$ vacant seats filled in $n$, $n-1$, $\\ldots$, $n-r+1$ ways — the bookkeeping compression ${}^nP_r = \\tfrac{n!}{(n-r)!}$, lesson 6.2’s second fraction. The two counts count the SAME set of outcomes, so they must agree.' },
      { label: 'Divide the order out', formula: '{}^nC_r = \\tfrac{{}^nP_r}{r!} = \\tfrac{n!}{r!\\,(n-r)!}', explanation: 'Equate the two counts and divide by $r!$ — an honest division, because $r!$ divides every product of $r$ consecutive integers (6.2’s divisibility fact meeting its counting meaning: each selection carries exactly $r!$ orderings). The edges sit honestly in the formula: ${}^nC_0 = 1$ (the one empty selection) and ${}^nC_n = 1$ (the full roster).' },
    ], result: '$\\;{}^nP_r = {}^nC_r \\cdot r!$ $\\qquad$ $\\;{}^nC_r = \\tfrac{n!}{r!\\,(n-r)!}$ — the arrangement count with the order of each cast divided out' },
    { kind: 'equation', latex: '{}^nP_r = {}^nC_r \\cdot r! \\qquad (0 \\leq r \\leq n) \\tag{1}', note: 'the two-step identity — select the cast, then order it; the whole lesson is this line read forwards and backwards.' },
    { kind: 'equation', latex: '{}^nC_r = \\frac{n!}{r!\\,(n-r)!} = \\frac{{}^nP_r}{r!} \\tag{2}', note: 'the selection count — a derived quantity: never memorised, rebuilt from the divide whenever forgotten.' },
    { kind: 'formula', name: 'The selection count', latex: '{}^nC_r = \\dfrac{n!}{r!\\,(n-r)!} = \\dfrac{{}^nP_r}{r!}', note: 'the order divide; edges one and one at r = 0 and r = n come free. Recall it as the chain of r factors over r!, not as a fraction to memorise.' },
    { kind: 'example', title: 'List every selection of two from the four-object roster a, b, c, d, exhibit the ab = ba collapse, and reconcile the two counts', steps: [
      'The census, by hand: the selections of two are $ab$, $ac$, $ad$, $bc$, $bd$, $cd$ — six selections, each an unordered pair.',
      'The arrangements of two: each selection orders in $2! = 2$ ways — $ab$ and $ba$, $ac$ and $ca$, and so on — so the ordered pairs number $6 \\times 2 = 12$.',
      'The reconciliation: $12 = {}^4P_2 = 4 \\times 3$, exactly 6.3’s seat-chain — and $6 = {}^4C_2 = \\tfrac{12}{2!}$, exactly the order divide at work.',
      'The collapse itself: $ab$ and $ba$ are TWO arrangements but ONE selection — the cast $\\{a, b\\}$ is the same cast whichever name leads, so each of the six casts carries exactly two orderings.',
      'Hence, ${}^4C_2 = 6$ and ${}^4P_2 = 12 = 6 \\cdot 2!$ — select, then arrange, and the two counts cannot drift apart; the engine below re-enumerates all six selections and all twelve ordered pairs literally before this prose stands.',
    ] },
    { kind: 'example', title: 'Compute C(8, 3) and C(10, 4) through the order divide, and cross-check each against the arrangement engine', steps: [
      'Split the first: ${}^8C_3 = \\tfrac{8 \\cdot 7 \\cdot 6}{3!} = \\tfrac{336}{6} = 56$ — the three-factor chain of 6.3 divided by the six orderings of any chosen cast.',
      'Cross-check the first: ${}^8P_3 = 8 \\cdot 7 \\cdot 6 = 336 = 56 \\times 3!$ — the arrangement count is the selection count times the orderings, as the divide demands.',
      'Split the second: ${}^{10}C_4 = \\tfrac{10 \\cdot 9 \\cdot 8 \\cdot 7}{4!} = \\tfrac{5040}{24} = 210$.',
      'Cross-check the second: ${}^{10}P_4 = 5040 = 210 \\times 4!$ — again exact, and the engine literally enumerates all 56 three-casts of an eight-roster and all 210 four-casts of a ten-roster before this prose stands.',
      'Hence, ${}^8C_3 = 56$ and ${}^{10}C_4 = 210$ — with the habit that pays: compute a selection count as a CHAIN divided by a factorial, never as a memorised fraction.',
    ] },
    { kind: 'table', caption: 'The complete selection census of the four-object roster a, b, c, d — sixteen selections in all, bucketed by size. Every count in the bucket column is a literal enumeration swept by the engine; the bucket sizes 1, 4, 6, 4, 1 are the roster’s row, their sum 16 = 2⁴ is the zero-or-more census this lesson proves twice, and the empty bottom row of the next census is exactly one string: all-OUT.', head: ['r (size of the selection)', 'count of casts', 'the casts themselves'], rows: [
      ['$0$', '$1$', '(none) — the empty selection'],
      ['$1$', '$4$', 'a · b · c · d'],
      ['$2$', '$6$', 'ab, ac, ad, bc, bd, cd'],
      ['$3$', '$4$', 'abc, abd, acd, bcd'],
      ['$4$', '$1$', 'abcd — the full roster'],
    ] },
    { kind: 'figure', caption: 'The two-step split on the roster a, b, c, d. Left (green): the six selections of two — order ignored. Each selection expands into exactly 2! = 2 arrangements (right, orange): the pair {a, b} is shown with both its orderings, ab and ba, and the dashed bracket is the ab = ba collapse — two arrangements, one selection. The count chain reads 6 × 2! = 12 = 4P2. Lesson 6.4’s circle divided by n for the same reason: each circular arrangement unwrapped into n linear ones; here each selection unwraps into r! arrangements.', svg: selectThenArrangeSvg() },
    { kind: 'para', text: 'Pause on the shape of the repair, because chapter 6 has now used it twice. Lesson 6.4’s circle divided $n!$ by $n$ because each circular arrangement unwrapped into exactly $n$ linear arrangements — an equivalence class of size $n$. The order divide is the same move one storey down: each selection unwraps into exactly $r!$ arrangements, so the arrangement count divided by $r!$ counts the classes themselves. Whenever a counting engine overcounts by a fixed factor, the honest repair is to exhibit the equivalence: count the total, count the class size, divide. That is the whole of this lesson’s first storey — and it is why ${}^nC_r$ is a DERIVED quantity in this book: forget the formula and the two-step split rebuilds it in one line.' },

    { kind: 'heading', text: 'The Selection Facts: 6.2’s Algebra Re-Read' },
    { kind: 'para', text: 'Lesson 6.2 closed on a teaser: the fraction ${}^nC_r = \\tfrac{n!}{r!\\,(n-r)!}$ carries a set of algebraic properties — symmetry, the equality discipline, Pascal’s identity, the ratio law, the middle maximum — proved there by algebra on factorials, and promised a counting reread. Each property is secretly a statement about selections, and a statement about selections can be proved by counting. This section re-reads the three load-bearing ones combinatorially — a proof that counts, standing beside 6.2’s proof that computes — and runs the rest on instances. The algebra is 6.2’s to keep; it is cited here, never re-taught.' },
    { kind: 'derivation', title: 'The complement law: choose is reject', statement: 'For $0 \\leq r \\leq n$: $\\;{}^nC_r = {}^nC_{n-r}$ — the number of $r$-selections from a roster of $n$ different objects equals the number of $(n-r)$-selections from the same roster.', steps: [
      { label: 'Fix the roster', formula: 'R = \\{a_1, a_2, \\ldots, a_n\\}', explanation: 'One fixed roster of $n$ different objects throughout; the claim compares two buckets of THAT roster’s census — the $r$-bucket and the $(n-r)$-bucket.' },
      { label: 'Pair each selection with its rejection', formula: 'S \\;\\longmapsto\\; R \\setminus S', explanation: 'Any $r$-selection $S$ carries with it the set of objects NOT selected — its complement $R \\setminus S$, which is an $(n-r)$-selection. Choosing $r$ and rejecting $n-r$ are one act read two ways.' },
      { label: 'The pairing is a bijection', formula: 'S_1 \\neq S_2 \\;\\Rightarrow\\; R \\setminus S_1 \\neq R \\setminus S_2', explanation: 'Distinct selections reject distinct complements (complementing again recovers $S$), and every $(n-r)$-selection arises as a rejection (it is the complement of its own complement). A bijection between the two buckets — lesson 6.1’s outcome-set discipline at work: sets in one-to-one correspondence have equal cardinalities.' },
      { label: 'Count the bijection', formula: '{}^nC_r = {}^nC_{n-r}', explanation: 'A bijection preserves cardinality, so the two buckets carry the same number of selections. Reconcile with 6.2: the factorial fraction is unchanged under $r \\leftrightarrow n-r$ — the same law, proved there by algebra on the fraction, here by the choose-is-reject pairing.' },
    ], result: '$\\;{}^nC_r = {}^nC_{n-r}$ $\\qquad$ choose $r$ — reject $n - r$ — one act, two buckets of equal size' },
    { kind: 'equation', latex: '{}^nC_r = {}^nC_{n-r} \\tag{3}', note: 'the complement law — choosing r and leaving n minus r behind are the same act; the equality discipline below rides on it.' },
    { kind: 'derivation', title: 'Pascal’s identity: the in/out split', statement: 'For $1 \\leq r \\leq n$: $\\;{}^{n+1}C_r = {}^nC_r + {}^nC_{r-1}$ — every $r$-selection from a roster enlarged by one marked object either contains the newcomer or does not.', steps: [
      { label: 'Enlarge the roster by one marked object', formula: 'R \\text{ of size } n, \\text{ plus the newcomer } \\star', explanation: 'Build the $(n+1)$-roster by adding one distinguished object. Every $r$-selection of the enlarged roster takes a stance on the newcomer: in, or out — there is no third stance.' },
      { label: 'Split by the stance', formula: '\\text{IN: } \\star \\in S \\qquad \\text{OUT: } \\star \\notin S', explanation: 'The two cases share no selection and every $r$-selection falls into exactly one — lesson 6.1’s addition rule is licensed precisely because the forks are disjoint and exhaustive.' },
      { label: 'Price the IN case', formula: '{}^nC_{r-1}', explanation: 'With the newcomer already in the cast, the other $r-1$ members come from the remaining $n$ objects: ${}^nC_{r-1}$ selections.' },
      { label: 'Price the OUT case', formula: '{}^nC_r', explanation: 'With the newcomer rejected, all $r$ members come from the remaining $n$ objects: ${}^nC_r$ selections.' },
      { label: 'Add the forks', formula: '{}^{n+1}C_r = {}^nC_{r-1} + {}^nC_r', explanation: 'Disjoint forks add. 6.2 proved this identity by putting two factorial fractions over a common denominator; the proof here never touches a factorial — it splits a census by one object’s membership. Pascal’s triangle is this split printed row under row.' },
    ], result: '$\\;{}^{n+1}C_r = {}^nC_r + {}^nC_{r-1}$ $\\qquad$ the in/out split — the newcomer is either in the cast or out of it' },
    { kind: 'equation', latex: '{}^{n+1}C_r = {}^nC_r + {}^nC_{r-1} \\tag{4}', note: 'Pascal’s identity — the in/out split on one marked object; the row under a row is this split printed.' },
    { kind: 'equation', latex: '\\frac{{}^nC_r}{{}^nC_{r-1}} = \\frac{n-r+1}{r} \\tag{5}', note: 'the ratio law — how a row grows from each entry to the next: a row climbs while the factor exceeds one, pauses at parity, and descends past the middle.' },
    { kind: 'figure', caption: 'The in/out split behind Pascal’s identity. The enlarged roster’s marked object (orange, starred) either joins the cast — pick the other r − 1 from the remaining n objects, C(n, r−1) ways — or stays out — pick all r from the remaining n, C(n, r) ways. The forks are disjoint and exhaustive, so they add into C(n + 1, r). Below, the split printed as rows: every entry of the row 1 5 10 10 5 1 is the sum of its two parents in 1 4 6 4 1 — the highlighted mid-row 10 is 4 + 6, and each parent is itself a sum of parents, all the way up to the row of ones.', svg: pascalInOutSvg() },
    { kind: 'formula', name: 'The complement law', latex: '{}^nC_r = {}^nC_{n-r}', note: 'choose is reject: the r-selections and the (n minus r)-selections of one roster are in bijection. Compute at the SMALLER of the two seats — the mirror hunt below lives on this law.' },
    { kind: 'formula', name: 'Pascal’s identity (the in/out split)', latex: '{}^{n+1}C_r = {}^nC_r + {}^nC_{r-1}', note: 'one marked object, two stances, disjoint forks that add. The algebra lives in lesson 6.2; the split is this lesson’s proof.' },
    { kind: 'formula', name: 'The ratio law (row growth)', latex: '\\dfrac{{}^nC_r}{{}^nC_{r-1}} = \\dfrac{n-r+1}{r}', note: 'each step of a row multiplies by (n minus r plus one) over r — above one up the climb, exactly one at the middle pause, below one on the descent.' },
    { kind: 'example', title: 'For the six-object roster a, b, c, d, e, f, verify the complement law at r = 2 and r = 4 by pairing every 2-selection with its 4-rejection', steps: [
      'The $r = 2$ bucket: fifteen selections — $ab$, $ac$, $\\ldots$, $ef$ — counted by ${}^6C_2 = \\tfrac{6 \\cdot 5}{2} = 15$.',
      'The pairing: the selection $\\{a, b\\}$ rejects $\\{c, d, e, f\\}$; the selection $\\{c, d\\}$ rejects $\\{a, b, e, f\\}$ — every 2-selection names exactly one 4-rejection, its complement.',
      'The $r = 4$ bucket: the fifteen rejections ARE the fifteen 4-selections — so ${}^6C_4 = 15$ with no new counting. The engine enumerates both buckets literally and confirms the fifteen pairings are distinct and exhaustive.',
      'The same law at the edges: ${}^6C_0 = {}^6C_6 = 1$ (the empty selection rejects everything) and ${}^6C_1 = {}^6C_5 = 6$ (each single chosen names the other five rejected).',
      'Hence, ${}^6C_2 = {}^6C_4 = 15$ — choose is reject, and the two buckets of the six-roster census are mirror images of one roster.',
    ] },
    { kind: 'example', title: 'If C(n, 5) = C(n, 2), find n and the common value — the equality discipline as a mirror hunt', steps: [
      'The discipline (from 6.2, re-read here): ${}^nC_x = {}^nC_y$ forces $x = y$ or $x + y = n$. Its engine: by the ratio law a row strictly climbs to its middle, so no two seats of the rising half share a value; equal values must therefore sit at MIRROR seats, and the complement law prices mirrors — ${}^nC_x = {}^nC_{n-x}$.',
      'Apply: here $x = 5$ and $y = 2$ are unequal, so the seats are mirrored — $5 + 2 = n$, that is $n = 7$.',
      'The common value, computed the short way the complement law licenses: ${}^7C_5 = {}^7C_2 = \\tfrac{7 \\cdot 6}{2} = 21$.',
      'Check by census: the engine enumerates the 5-selections of a seven-roster — twenty-one of them, each the complement of a 2-selection — and the 2-selections, also twenty-one.',
      'Hence, $n = 7$ with common value $21$ — the equality discipline turns an equation into a mirror hunt, and no roster is ever listed.',
    ] },
    { kind: 'example', title: 'Trace the row n = 7 entry by entry with the ratio law, and locate the middle maximum', steps: [
      'The row: ${}^7C_0, {}^7C_1, \\ldots, {}^7C_7$ runs $1, 7, 21, 35, 35, 21, 7, 1$ — symmetric end to end by the complement law: seat $r$ mirrors seat $7 - r$.',
      'The climb: ${}^7C_1 = {}^7C_0 \\times \\tfrac{7-1+1}{1} = 7$; ${}^7C_2 = {}^7C_1 \\times \\tfrac{7-2+1}{2} = 7 \\times \\tfrac{6}{2} = 21$; ${}^7C_3 = {}^7C_2 \\times \\tfrac{7-3+1}{3} = 21 \\times \\tfrac{5}{3} = 35$.',
      'The pause: ${}^7C_4 = {}^7C_3 \\times \\tfrac{7-4+1}{4} = 35 \\times 1 = 35$ — the factor is exactly one, so an ODD roster’s row peaks at two equal middle seats, both $35$.',
      'The descent: the factors now run $\\tfrac{3}{5}$, $\\tfrac{1}{3}$, $\\tfrac{1}{7}$ — each the mirror of a climb factor, as the symmetry of the row demands.',
      'Hence, the row of seven is $1, 7, 21, 35, 35, 21, 7, 1$ with the twin maximum $35$ at seats 3 and 4 — and an EVEN roster’s row peaks at one seat: ${}^6C_3 = 20$, which the engine confirms alongside.',
    ] },
    { kind: 'para', text: 'From the above discussion, the selection facts of 6.2’s factorial algebra stand collected — each with a verified instance, all engine-swept before this list was pinned:' },
    { kind: 'list', items: [
      'the complement law, ${}^nC_r = {}^nC_{n-r}$ — choosing $r$ is rejecting $n-r$; instance: ${}^{12}C_5 = {}^{12}C_7 = 792$;',
      'the equality discipline, ${}^nC_x = {}^nC_y \\Rightarrow x = y$ or $x + y = n$ — a row strictly climbs to its middle, so equal values sit at mirror seats; instance: ${}^{11}C_4 = {}^{11}C_7 = 330$;',
      'Pascal’s identity, ${}^{n+1}C_r = {}^nC_r + {}^nC_{r-1}$ — the in/out split on one marked object; instance: ${}^5C_2 = 10 = 6 + 4 = {}^4C_2 + {}^4C_1$;',
      'the ratio law, ${}^nC_r = {}^nC_{r-1} \\cdot \\tfrac{n-r+1}{r}$ — how a row grows seat by seat; instance: ${}^8C_4 = 70 = 56 \\times \\tfrac{5}{4}$, climbing from ${}^8C_3 = 56$;',
      'the middle maximum — one peak seat when $n$ is even (${ }^6C_3 = 20$), two equal peak seats when $n$ is odd (${ }^7C_3 = {}^7C_4 = 35$);',
      '6.2’s divisibility fact re-read: $k!$ divides every product of $k$ consecutive integers because such a product IS a chain over $k!$ — instance: $5 \\cdot 6 \\cdot 7 = 210 = 35 \\times 3! = {}^7C_3 \\cdot 3!$, a selection count times its orderings.',
    ] },

    { kind: 'heading', text: 'The Census of All Selections: 2 to the n and 2 to the n minus 1' },
    { kind: 'para', text: 'How many selections can be made from $n$ different objects, if ANY number may be taken — none, one, a few, all? The question prices a roster’s whole census, and the census has a strikingly clean answer, because every object makes its own decision. Walk the roster object by object: each one is either IN the selection or OUT of it — two possibilities, independent of every other object’s stance. Lesson 6.1’s multiplication rule prices the chain of $n$ independent two-way decisions at $2^n$, and the outcome-set formalisation certifies the outcomes distinct: each decision string (in, out, in, $\\ldots$) IS a different selection, one for one. Nobody builds subsets and counts them — the census counts itself.' },
    { kind: 'derivation', title: 'The total-selection census: every object flips its own coin', statement: 'For a roster of $n$ different objects: the number of selections of zero or more objects is $2^n$, and the number of selections of at least one object is $2^n - 1$.', steps: [
      { label: 'Name the decision string', formula: '\\text{each of the } n \\text{ objects: IN or OUT}', explanation: 'A selection is exactly a stance for every object — an $n$-letter string over $\\{$IN, OUT$\\}$. This IS the outcome set of the census: subsets and decision strings are the same thing, matched one for one.' },
      { label: 'Count the strings', formula: '2 \\times 2 \\times \\cdots \\times 2 \\; (n \\text{ factors}) = 2^n', explanation: 'Each stance is a free two-way choice, independent of all others, so 6.1’s multiplication rule prices the chain at $2^n$. The distinctness check is automatic: two strings that differ at some object’s stance are different selections, so nothing is over- or under-counted.' },
      { label: 'Bucket by size and reconcile', formula: '\\sum_{r=0}^{n} {}^nC_r = 2^n', explanation: 'The same census bucketed by size: the $r$-bucket carries ${}^nC_r$ selections, and the buckets partition the strings — so a roster’s row sums to $2^n$. This row-sum identity is proved here for the first time in the chapter, and the engine enumerates it literally through $n = 6$ before trusting the doubling beyond.' },
      { label: 'Delete the empty selection', formula: '2^n - 1', explanation: 'Exactly one decision string selects nothing — the all-OUT string, the empty selection. Deleting it, and only it, leaves the census of selections with at least one object: $2^n - 1$, one behind the total at every roster size.' },
    ], result: '$\\;\\sum_{r=0}^{n} {}^nC_r = 2^n$ $\\qquad$ at least one: $2^n - 1$ — the all-OUT string is the single outcome deleted' },
    { kind: 'equation', latex: '\\sum_{r=0}^{n} {}^nC_r = 2^n \\tag{6}', note: 'the zero-or-more census — every object’s own in/out decision; bucketed by size, the roster’s whole row sums to it.' },
    { kind: 'equation', latex: '\\sum_{r=1}^{n} {}^nC_r = 2^n - 1 \\tag{7}', note: 'the at-least-one census — the same decision strings with the all-OUT string deleted; the engine of this lesson’s second example family.' },
    { kind: 'formula', name: 'The two censuses', latex: '\\sum_{r=0}^{n} {}^nC_r = 2^n; \\qquad \\sum_{r=1}^{n} {}^nC_r = 2^n - 1', note: 'zero or more from n different objects: 2 to the n. At least one: 2 to the n minus 1. Two engines, two example families below.' },
    { kind: 'para', text: 'The two censuses are not just identities — they are the engines of this lesson’s two hosted example families, the module’s own "selection of zero or more" and "selection of at least one" bands, rebuilt on rosters of our own. Every example below runs on exactly one of the two engines, and the engine re-enumerates every number literally before it stands. First family: selections of zero or more objects from $n$ different objects, the $2^n$ engine.' },
    { kind: 'example', title: 'Selection of zero or more objects from 6 different objects: the camper’s gear census, split by a marked item', steps: [
      'The roster: six different gear items — tarp, lantern, water filter, compass, stove, rope — and the camper may pack any number of them, none included: a selection of zero or more objects from 6 different objects.',
      'The engine: each item is either packed or left behind — six independent in/out decisions — so the census of possible loads is $2^6 = 64$.',
      'The split by a marked item: loads that INCLUDE the lantern are $2^5 = 32$ (the other five items still free either way), and loads that EXCLUDE it are $32$ as well — the in/out split again, and $32 + 32 = 64$.',
      'The bucketed read: the 64 loads are $\\tbinom{6}{0} + \\tbinom{6}{1} + \\tbinom{6}{2} + \\tbinom{6}{3} + \\tbinom{6}{4} + \\tbinom{6}{5} + \\tbinom{6}{6} = 1 + 6 + 15 + 20 + 15 + 6 + 1 = 64$ — the row-sum, bucket by bucket.',
      'Hence, 64 possible loads, and HALF of them contain any given item — the engine enumerates all sixty-four loads and the thirty-two lantern-loads literally before this prose stands.',
    ] },
    { kind: 'example', title: 'Selection of zero or more objects from 8 different objects: the row-sum read of a stamp collection', steps: [
      'The roster: eight different stamps, and a display page may show any number of them — zero allowed: a selection of zero or more objects from 8 different objects.',
      'The per-object engine: $2^8 = 256$ pages — each new stamp splits every earlier page into a with-copy and a without-copy, so the census doubles at every roster step ($64 \\to 128 \\to 256$ from six to eight).',
      'The row-sum read: the row of eight is $1, 8, 28, 56, 70, 56, 28, 8, 1$ — the page counts bucket by size — and the row sums to $1 + 8 + 28 + 56 + 70 + 56 + 28 + 8 + 1 = 256$.',
      'The rare-stamp split: pages containing one particular rare stamp number $2^7 = 128$ — half the census again, whatever the roster size, by the same in/out split.',
      'Hence, 256 pages — the engine builds the row of eight from the row of seven by Pascal’s in/out split, checks every bucket against the formula, and confirms the sum and both halves.',
    ] },
    { kind: 'para', text: 'Second family: selections of at least one object from $n$ different objects — the $2^n - 1$ engine, the all-OUT string deleted. Watch the subtraction appear in the numbers: each count below sits exactly one behind the census of the same roster.' },
    { kind: 'example', title: 'Selection of at least one object from 7 different objects: the borrower’s non-empty census', steps: [
      'The roster: seven different magazines at a hostel desk, and a reader may borrow one or more of them — never none: a selection of at least one object from 7 different objects.',
      'The census first: zero-or-more would be $2^7 = 128$ decision strings; borrowing at least one deletes exactly the all-OUT string, leaving $2^7 - 1 = 127$ borrowings.',
      'The bucketed read: $\\tbinom{7}{1} + \\tbinom{7}{2} + \\cdots + \\tbinom{7}{7} = 7 + 21 + 35 + 35 + 21 + 7 + 1 = 127$ — the row with its empty bucket removed.',
      'The complement read: the forbidden borrowing — none — is ONE of the 128 strings, so the subtraction removes exactly one outcome; that is why the answer misses 128 by exactly 1, at this roster size and every other.',
      'Hence, 127 borrowings — the engine enumerates the 128 strings of a seven-roster and counts the 127 non-empty ones literally.',
    ] },
    { kind: 'example', title: 'Selection of at least one object from each of two groups: comics and atlases on a shelf', steps: [
      'The roster: four different comics and two different atlases; a bundle takes AT LEAST ONE comic and AT LEAST ONE atlas — each group non-empty: the at-least-one engine run per group and multiplied.',
      'The comic census, non-empty: $2^4 - 1 = 15$ ways to take at least one of the four comics.',
      'The atlas census, non-empty: $2^2 - 1 = 3$ ways — one atlas, the other, or both.',
      'The chain: the two choices are independent — 6.1’s multiplication rule — so the bundles number $15 \\times 3 = 45$.',
      'The audit: the engine enumerates all fifteen non-empty comic sets against all three non-empty atlas sets — forty-five pairs, literally. The subtraction read agrees: 64 total pairs of subsets, minus the 16 with no comic (atlas subsets alone, $2^4 = 16$), minus the 4 with no atlas (comic subsets alone, $2^2 = 4$), plus the 1 doubly-empty pair: $64 - 16 - 4 + 1 = 45$ — a two-set subtraction whose general shape is 6.6’s inclusion–exclusion engine, named here and cashed there, never here.',
      'Hence, 45 bundles — the at-least-one census per group, multiplied along the chain; the equation shape $(2^4 - 1)(2^2 - 1) = 45$ is this lesson’s product-chain family in its smallest honest case.',
    ] },
    { kind: 'table', caption: 'The two censuses by roster size. The zero-or-more column doubles at every step — each new object splits every earlier selection into an in-copy and an out-copy — and the at-least-one column is always exactly one behind it: the empty selection, and only that one, deleted. Engine-enumerated literally through n = 6 and extended by the doubling read through n = 8; every value below was swept before the table was pinned.', head: ['n (roster size)', 'zero or more: 2 to the n', 'at least one: 2 to the n minus 1'], rows: [
      ['1', '2', '1'],
      ['2', '4', '3'],
      ['3', '8', '7'],
      ['4', '16', '15'],
      ['5', '32', '31'],
      ['6', '64', '63'],
      ['7', '128', '127'],
      ['8', '256', '255'],
    ] },
    { kind: 'example', title: 'A film-festival equation: at least one and at most k of 2k + 1 films give 63 viewing lists — find k', steps: [
      'The shape: the festival screens $2k+1$ films and a critic reviews at least one and at most $k$ of them; the number of possible viewing lists is $63$ — an equation between a counted census and a number.',
      'The count, honestly: $\\tbinom{2k+1}{1} + \\tbinom{2k+1}{2} + \\cdots + \\tbinom{2k+1}{k}$ — non-empty selections of size at most $k$.',
      'The symmetry discipline: on an odd roster the complement law pairs every seat with its mirror — $\\tbinom{2k+1}{r} = \\tbinom{2k+1}{2k+1-r}$ — and the two end seats $\\tbinom{2k+1}{0} = \\tbinom{2k+1}{2k+1} = 1$ stand alone, so the whole row sums to $2^{2k+1} = 2 + 2\\bigl(\\tbinom{2k+1}{1} + \\cdots + \\tbinom{2k+1}{k}\\bigr)$: every non-end seat has a distinct mirror.',
      'So the at-most-$k$ non-empty count is $\\tfrac{2^{2k+1} - 2}{2} = 2^{2k} - 1$ — the at-least-one census of a HALF-sized roster, by symmetry rather than by listing.',
      'Solve: $2^{2k} - 1 = 63$ gives $2^{2k} = 64 = 2^6$, so $2k = 6$ and $k = 3$ — a seven-film festival, the critic reviews one, two or three films.',
      'The census check: $\\tbinom{7}{1} + \\tbinom{7}{2} + \\tbinom{7}{3} = 7 + 21 + 35 = 63$ — the engine enumerates the 63 lists literally. And the half-row read: with the empty list admitted, the at-most-3 side counts $1 + 63 = 64$, matched seat for seat by the at-least-4 side $\\tbinom{7}{4} + \\tbinom{7}{5} + \\tbinom{7}{6} + \\tbinom{7}{7} = 35 + 21 + 7 + 1 = 64$ — the two equal halves of a seven-roster census.',
      'Hence, $k = 3$: a seven-film festival — and the equation never asked how many lists of each size; the symmetry discipline answered without listing.',
    ] },

    { kind: 'heading', text: 'Selection, Then Arrangement: the Words That Weld the Counts' },
    { kind: 'para', text: 'The last storey of the arc is the family of examination words in which the two great counts cooperate: a cast is SELECTED, and then the cast is ARRANGED. The engine is the two-step split run deliberately — select with ${}^nC_r$ (or a product of selection factors across groups), then arrange with $r!$: the order divide reversed. One question still governs everything, and it deserves its own line: does the order matter here? If it does not, the answer is a selection count — stop there. If it does, the answer is a selection count times the orderings of the cast — never an arrangement engine started from the wrong end.' },
    { kind: 'equation', latex: '\\text{(selections)} \\times r! = \\text{(arrangements)}: \\qquad {}^nC_r \\cdot r! = {}^nP_r \\tag{8}', note: 'the reversed divide — select the cast, then order it; across two groups, multiply the selection factors first and arrange the whole cast once.' },
    { kind: 'example', title: 'From 9 classmates choose 4 to stand in a photo row: the select-then-arrange count', steps: [
      'Split the word: a photo row is ORDERED, so an arrangement count is due — but the natural engine selects the cast first and orders it after.',
      'Select: ${}^9C_4 = \\tfrac{9 \\cdot 8 \\cdot 7 \\cdot 6}{4!} = \\tfrac{3024}{24} = 126$ casts.',
      'Arrange: each cast of four orders in $4! = 24$ ways, so the rows number $126 \\times 24 = 3024$.',
      'Cross-check: ${}^9P_4 = 9 \\cdot 8 \\cdot 7 \\cdot 6 = 3024$ — the arrangement engine in one line, the two-step engine in two, and the answers agree by the order divide, not by coincidence.',
      'Hence, 3024 photo rows from nine classmates four at a time — one question asked first (does order matter?), one engine chosen once.',
    ] },
    { kind: 'example', title: 'From 6 adults and 4 children choose 2 of each for a photo row: the two-group select-then-arrange count', steps: [
      'Split the word: the cast is two adults AND two children — selections from two groups — and the four who stand are arranged in a row after.',
      'Select the cast: ${}^6C_2 \\times {}^4C_2 = 15 \\times 6 = 90$ casts — fifteen adult-pairs against six child-pairs, the engine enumerating all ninety literally.',
      'Arrange the cast: each of the four-member casts orders in $4! = 24$ ways — so the rows number $90 \\times 24 = 2160$.',
      'The audit: the engine confirms $2160 = 90 \\times 24$ and re-derives it as $({}^6C_2 \\times {}^4C_2) \\times 4!$ — selection factors multiplied first, one arrangement factor for the whole cast after.',
      'Hence, 2160 rows — the order question is asked once (for the row) and answered once (by the single $4!$), never per group.',
    ] },
    { kind: 'example', title: 'Exam-style: a judging panel of 3 from 5 scientists and 4 artists — selection counts, a complement, and a stage row', steps: [
      'Part (i), any three: ${}^9C_3 = \\tfrac{9 \\cdot 8 \\cdot 7}{3!} = 84$ panels — the engine enumerates all eighty-four casts literally.',
      'Part (ii), exactly one artist: pick the artist (${}^4C_1 = 4$ ways) and the two scientists (${}^5C_2 = 10$ ways): $4 \\times 10 = 40$ panels.',
      'Part (iii), at least one artist: the bad panels are the all-scientist ones, ${}^5C_3 = 10$ of them, so the count is $84 - 10 = 74$ — total minus bad, the complement seed lesson 6.1 planted and 6.4 priced at round tables, here a one-line subtraction.',
      'Part (iv), the stage row: seat the 84 casts of part (i) in three chairs — $84 \\times 3! = 84 \\times 6 = 504$ orderings.',
      'Hence, (i) 84, (ii) 40, (iii) 74, (iv) 504 — one roster, four questions, every answer either a selection, a complement of one, or a selection with the order restored.',
    ] },

    { kind: 'heading', text: 'Where the Engine Sits' },
    { kind: 'callout', tone: 'exam', title: 'Where this sits in the examinations', text: 'JEE (Main) 2026’s mathematics unit list CARRIES permutations and combinations as its own unit — unit 4 of the banked syllabus audit — so this lesson’s ground is real exam territory, honestly labelled: the single-correct items on $\\tbinom{n}{r}$ values and mirror-hunt equations, the multiple-correct property checks over the selection facts, the linked-comprehension committee and panel items, and the numerical-value census hunts (the 63-hunt shape above) are all priced here, and Khattar-style aptitude papers run the same census discipline numerically. NCERT class 11 chapter 6 "Permutations and Combinations" is the school-canon ground the prerequisites ride; Hall & Knight chapter XI is the classic stretch, and OpenStax’s sequencing cross-check places this counting ground beside probability in its own syllabus. Every item in this lesson is exam-style — our own designs, labelled honestly, never lifted from any paper.' },
    { kind: 'callout', tone: 'historical', title: 'The staircase before Pascal', text: 'The split this lesson proves as Pascal’s identity is older than its European name by roughly eighteen centuries. Pingala’s Chandahsutra, the Sanskrit prosody manual of about the second century BCE, counts metrical patterns of long and short syllables — exactly the in/out census of this lesson, long or short, in or out — and the tenth-century commentary of Halayudha prints the rows as the meru-prastara, "the staircase of Mount Meru". In China the rows appear in the thirteenth-century triangle of Yang Hui (and Zhu Shijie’s sequel). Blaise Pascal organised them in his 1654 Traité du triangle arithmétique, the little book whose accompanying correspondence on the problem of points also seeded probability — the very subject this chapter hands its censuses to. The counting facts are nobody’s property; the names are the history.' },
    { kind: 'para', text: 'What this chapter hands forward, and this lesson’s last word. A counted universe is the ground Probability inherits: asked for the chance that a random three-person panel from the nine above contains the class captain, the denominator is a selection count — ${}^9C_3 = 84$ equally likely selections — and the numerator is one too: panels containing the captain number ${}^8C_2 = 28$ (the captain plus any two of the other eight), so the chance is $\\tfrac{28}{84} = \\tfrac{1}{3}$. That fraction — FAVOURABLE selections over TOTAL selections — is the whole handoff: the book’s positioning names Probability as the inheritor of this counting ground, and no Probability lesson exists yet in this shelf to cite, honestly said; when one is written, every probability it prices will stand on a census built exactly like these. Nearer at hand, lesson 6.6, "Distributions and the Classic Counting Puzzles", opens the puzzle room where selections meet identical objects, divisors, groups and boxes: the $2^n - 1$ engine reappears there priced against identical copies (the census stops doubling and starts counting slowly), and the in/out split grows into the inclusion–exclusion machine. The small-case census remains the guard throughout — every model above was caught by a literal enumeration before it was trusted.' },

    { kind: 'terms', items: [
      { term: 'Combination (selection)', def: 'a subset of a roster — a choice in which the cast matters and the order of choosing does not; ${}^nC_r$ counts the $r$-element selections from an $n$-element roster of different objects.' },
      { term: 'The order divide', def: 'the identity ${}^nP_r = {}^nC_r \\cdot r!$: every arrangement is a selection plus an ordering of the cast, so the arrangement count divided by the $r!$ orderings each cast carries is the selection count — the derivation, never a memorised fraction.' },
      { term: 'Complement law (choose is reject)', def: '${}^nC_r = {}^nC_{n-r}$: choosing $r$ and rejecting $n-r$ are one act, so the two buckets of a roster’s census are in bijection and equal in size.' },
      { term: 'Pascal’s identity (the in/out split)', def: '${}^{n+1}C_r = {}^nC_r + {}^nC_{r-1}$: split the enlarged roster’s $r$-selections by the newcomer’s stance — in the cast or out of it — and the disjoint forks add.' },
      { term: 'The ratio law (row growth)', def: '${}^nC_r/{}^nC_{r-1} = (n-r+1)/r$: each seat of a row is the previous seat times a factor that exceeds one on the climb, equals one at the middle pause, and falls below one on the descent.' },
      { term: 'The zero-or-more census', def: 'the $2^n$ total selections from $n$ different objects — every object’s own in/out decision; the row-sum $\\sum {}^nC_r = 2^n$ is the same count bucketed by size.' },
      { term: 'The at-least-one census', def: 'the $2^n - 1$ non-empty selections from $n$ different objects — the zero-or-more census with the single all-OUT string deleted; per group it builds the product chains $(2^a - 1)(2^b - 1)\\cdots$.' },
      { term: 'Selection-then-arrangement', def: 'the word family priced by ${}^nC_r \\cdot r! = {}^nP_r$ — select the cast, then order it; across two groups, multiply the selection factors first and arrange the whole cast once.' },
    ] },

    { kind: 'quiz', title: 'Check yourself: combinations — the selection count', items: [
      { q: 'From 10 different books, the number of ways to choose 3 (order irrelevant) is:', options: ['$120$', '$240$', '$720$', '$6$'], answer: 0, explain: 'The order divide: $\\tbinom{10}{3} = \\tfrac{10 \\cdot 9 \\cdot 8}{3!} = \\tfrac{720}{6} = 120$ (option A). Option B’s 240 is the chain divided by 3 instead of $3!$ — only one of every cast’s three orderings divided out, so two orderings per cast are still being counted. Option C’s 720 is ${}^{10}P_3$, the ARRANGEMENT count — order counted, exactly the engine this lesson exists to divide out. Option D’s 6 is $3!$ itself, the divisor reported as the answer.' },
      { q: 'If $\\tbinom{n}{4} = \\tbinom{n}{7}$, then $n$ is:', options: ['$3$', '$11$', '$10$', '$4$'], answer: 1, explain: 'The equality discipline: the seats are unequal ($4 \\neq 7$), so they must be mirror seats — $x + y = n$ gives $n = 4 + 7 = 11$, and indeed $\\tbinom{11}{4} = \\tbinom{11}{7} = 330$ (option B). Option A’s 3 is $7 - 4$, the DIFFERENCE of the seats — the mirror reads sum, not difference. Option C’s 10 is $4 + 7 - 1$, the classic off-by-one from counting the seats inclusively. Option D’s 4 reports $x$ itself — a seat value, not the roster size.' },
      { q: 'A chef may use one or more of 6 different spices. The number of non-empty spice selections is:', options: ['$64$', '$63$', '$6$', '$65$'], answer: 1, explain: 'The at-least-one census: $2^6 - 1 = 63$ (option B) — 64 decision strings with the all-OUT string deleted. Option A’s 64 is the zero-or-more census, which counts the empty dish — the no-spice plate — as a selection. Option C’s 6 counts only the single-spice selections, $\\tbinom{6}{1}$, forgetting the blends entirely. Option D’s 65 overshoots in the other direction, adding the empty selection back on top of a census that already excludes it.' },
      { q: 'From 7 runners, 3 are chosen and assigned gold, silver and bronze. The number of ways is:', options: ['$35$', '$210$', '$120$', '$21$'], answer: 1, explain: 'Selection-then-arrangement: $\\tbinom{7}{3} \\cdot 3! = 35 \\times 6 = 210$, which is exactly ${}^7P_3$ (option B). Option A’s 35 is $\\tbinom{7}{3}$ alone — the podium ORDER forgotten, though gold differs from bronze. Option C’s 120 is $5!$, the count of arranging a five-cast — a roster-size mix-up. Option D’s 21 is $\\tbinom{7}{5} = \\tbinom{7}{2}$, the complement-size selection — the right roster, the wrong seat, a mirror away.' },
      { q: 'From 9 different objects, the number of ways to select AT MOST 3 is:', options: ['$129$', '$84$', '$381$', '$130$'], answer: 3, explain: 'At most 3 sums the small buckets: $\\tbinom{9}{0} + \\tbinom{9}{1} + \\tbinom{9}{2} + \\tbinom{9}{3} = 1 + 9 + 36 + 84 = 130$ (option D). Option A’s 129 deletes the empty selection — but "at most 3" includes zero, and the empty selection is a legal answer. Option B’s 84 is $\\tbinom{9}{3}$ alone, the exactly-3 count, not the cumulative one. Option C’s 381 is the count of at least one and at most FIVE — the same buckets summed one seat too far with the empty selection left out: $9 + 36 + 84 + 126 + 126 = 381$.' },
    ] },

    { kind: 'exercises', title: 'Exercises 6.5', sets: [
      { level: 'L1', questions: [
        { q: 'For the six-object roster $a, b, c, d, e, f$: compute $\\tbinom{6}{2}$ and $\\tbinom{6}{4}$, and verify both by literal enumeration — list the fifteen 2-selections, then exhibit the complement pairing into the fifteen 4-selections.', solution: [
          'Compute the first: $\\tbinom{6}{2} = \\tfrac{6 \\cdot 5}{2!} = 15$.',
          'The census, literally: $ab$, $ac$, $ad$, $ae$, $af$, $bc$, $bd$, $be$, $bf$, $cd$, $ce$, $cf$, $de$, $df$, $ef$ — fifteen 2-selections, counted by hand.',
          'Now, the pairing: each 2-selection rejects a 4-selection — $\\{a,b\\}$ rejects $\\{c,d,e,f\\}$, and so on — so the 4-selections number fifteen too: $\\tbinom{6}{4} = \\tbinom{6}{2} = 15$ by the complement law, verified here by the bijection itself.',
          'Hence, $\\tbinom{6}{2} = \\tbinom{6}{4} = 15$ — the engine enumerates both buckets and confirms the fifteen pairings are distinct and exhaustive.',
        ], answer: '$\\tbinom{6}{2} = \\tbinom{6}{4} = 15$, the complement pairing exhibited on all fifteen pairs' },
        { q: 'From 8 different fruits, in how many ways can a bowl of exactly 3 fruits be selected? Compute through the order divide and cross-check against the arrangement engine.', solution: [
          'The word: a bowl is a CAST — order irrelevant — so the answer is a selection count: $\\tbinom{8}{3}$.',
          'Split the chain: $\\tbinom{8}{3} = \\tfrac{8 \\cdot 7 \\cdot 6}{3!} = \\tfrac{336}{6} = 56$.',
          'Cross-check: ${}^8P_3 = 8 \\cdot 7 \\cdot 6 = 336 = 56 \\times 3!$ — the arrangement engine overcounts the bowls by exactly the $3!$ orderings of each bowl, and the divide repairs it.',
          'Hence, 56 bowls — the engine enumerates all fifty-six 3-selections of an eight-roster literally before this answer stands.',
        ], answer: '56 bowls' },
      ] },
      { level: 'L2', questions: [
        { q: 'If $\\tbinom{n}{2} = 36$, find $n$.', solution: [
          'Write the count: $\\tbinom{n}{2} = \\tfrac{n(n-1)}{2} = 36$, so $n(n-1) = 72$.',
          'So, $n^2 - n - 72 = 0$, which factors as $(n - 9)(n + 8) = 0$.',
          'The honest root: $n = 9$ (a roster size is positive; $-8$ is rejected).',
          'Check: $\\tbinom{9}{2} = \\tfrac{9 \\cdot 8}{2} = 36$ — exact.',
          'Hence, $n = 9$.',
        ], answer: '$n = 9$' },
        { q: 'Show that the number of 5-member committees from a 12-person club equals the number of 7-member committees from the same club; explain WHY with the complement pairing; then compute the common value.', solution: [
          'The law: $\\tbinom{12}{5} = \\tbinom{12}{7}$ — choosing 5 is rejecting 7: every 5-committee names its own 7-person complement, and the pairing is a bijection, so the two counts are equal.',
          'The discipline cross-read: the seats 5 and 7 are unequal and sum to 12 — mirror seats, exactly the equality discipline’s forced pairing.',
          'Now, compute at the smaller seat: $\\tbinom{12}{5} = \\tfrac{12 \\cdot 11 \\cdot 10 \\cdot 9 \\cdot 8}{5!} = \\tfrac{95040}{120} = 792$.',
          'Check at the mirror: $\\tbinom{12}{7} = \\tfrac{12 \\cdot 11 \\cdot 10 \\cdot 9 \\cdot 8}{5!} = 792$ as well — the complement law seen numerically, and the engine enumerates both buckets literally (792 each).',
          'Hence, both committee counts are $792$ — equal by bijection, not by coincidence.',
        ], answer: 'both counts equal $792$, by the complement pairing choose-5-is-reject-7' },
      ] },
      { level: 'L3', questions: [
        { q: 'For a five-object roster, list the full row of selection counts $\\tbinom{5}{0}, \\tbinom{5}{1}, \\ldots, \\tbinom{5}{5}$, verify each by literal enumeration, and confirm the row-sum identity $\\sum \\tbinom{5}{r} = 2^5$.', solution: [
          'The row, computed: $1, 5, 10, 10, 5, 1$ — symmetric by the complement law (seat $r$ mirrors seat $5 - r$).',
          'The buckets, literally: one empty selection; five singles; ten pairs ($ab, ac, ad, ae, bc, bd, be, cd, ce, de$); ten triples (the complements of the pairs); five quadruples (the complements of the singles); the full roster.',
          'Now, the sum: $1 + 5 + 10 + 10 + 5 + 1 = 32$.',
          'Confirm the census: $2^5 = 32$ — five objects each in or out, 32 decision strings, and the engine enumerates all thirty-two literally.',
          'Hence, the row of five is $1, 5, 10, 10, 5, 1$ and sums to $32 = 2^5$ — the zero-or-more census, bucket by bucket.',
        ], answer: 'row $1, 5, 10, 10, 5, 1$; sum $32 = 2^5$' },
        { q: 'A stationer holds 4 different pens and 2 different notebooks. In how many ways can a shopper buy at least one pen and at least one notebook?', solution: [
          'The shape: at least one object from EACH of two groups — the at-least-one engine run per group and multiplied along 6.1’s chain.',
          'The pen census, non-empty: $2^4 - 1 = 15$ ways to buy at least one of the four pens.',
          'The notebook census, non-empty: $2^2 - 1 = 3$ ways — one notebook, the other, or both.',
          'So, the chain: $15 \\times 3 = 45$ purchases.',
          'The audit: the engine enumerates the fifteen non-empty pen-sets against the three non-empty notebook-sets — forty-five pairs, literally — and the subtraction read agrees: $2^4 \\times 2^2 - 2^2 - 2^4 + 1 = 64 - 4 - 16 + 1 = 45$.',
          'Hence, 45 purchases.',
        ], answer: '$45$' },
        { q: 'From 10 players, a coach selects 5 and writes them into a batting order. Count the possible orders by the select-then-arrange engine, and cross-check against ${}^{10}P_5$.', solution: [
          'Split the word: the batting order is arranged — but the cast is selected first: ${}^{10}C_5$ casts, each ordered in $5!$ ways.',
          'Select: ${}^{10}C_5 = \\tfrac{10 \\cdot 9 \\cdot 8 \\cdot 7 \\cdot 6}{5!} = \\tfrac{30240}{120} = 252$ casts.',
          'Arrange: each cast orders in $5! = 120$ ways, so the orders number $252 \\times 120 = 30240$.',
          'Cross-check: ${}^{10}P_5 = 10 \\cdot 9 \\cdot 8 \\cdot 7 \\cdot 6 = 30240$ — the two engines agree by the order divide.',
          'Hence, 30240 batting orders.',
        ], answer: '$30240 = 252 \\times 5! = {}^{10}P_5$' },
      ] },
      { level: 'L4', questions: [
        { q: 'Exam-style (Single Correct). A festival screens $2k+1$ films; a critic reviews at least one and at most $k$ of them, in 15 possible viewing lists. Then $k$ is: (A) 2 (B) 3 (C) 4 (D) 5. Decide with full reasoning.', solution: [
          'The count: $\\tbinom{2k+1}{1} + \\tbinom{2k+1}{2} + \\cdots + \\tbinom{2k+1}{k}$ — non-empty selections of size at most $k$.',
          'The symmetry: on the odd roster every non-end seat has a distinct mirror, so the row sums to $2^{2k+1} = 2 + 2(\\text{the count})$.',
          'So, the count is $\\tfrac{2^{2k+1} - 2}{2} = 2^{2k} - 1$.',
          'Solve: $2^{2k} - 1 = 15$ gives $2^{2k} = 16 = 2^4$, so $2k = 4$ and $k = 2$ — five films, the critic reviews one or two.',
          'Check the rejected seats: $k = 3$ would give $2^6 - 1 = 63$ lists; $k = 4$ gives $255$; $k = 5$ gives $1023$ — the engine sweeps all four literally, and only (A) lands on 15.',
          'Hence, the answer is (A) $k = 2$.',
        ], answer: '(A) $k = 2$ (five films; $\\tbinom{5}{1} + \\tbinom{5}{2} = 5 + 10 = 15$)' },
        { q: 'Exam-style (Multiple Correct). Which of the following hold? (A) $\\tbinom{10}{4} = \\tbinom{10}{6}$  (B) $\\tbinom{n}{r} = \\tbinom{n}{n-r}$ for all $0 \\leq r \\leq n$  (C) $\\sum_{k=0}^{n} \\tbinom{n}{k} = 2^n + 1$  (D) $\\tbinom{2n}{2} = 2\\tbinom{n}{2}$ for every $n \\geq 2$. Identify every true statement.', solution: [
          '(A) is the complement law at $n = 10$: seats 4 and 6 are mirrors ($4 + 6 = 10$), and $\\tbinom{10}{4} = \\tfrac{10 \\cdot 9 \\cdot 8 \\cdot 7}{4!} = 210 = \\tbinom{10}{6}$ — TRUE.',
          '(B) is the complement law itself — proved by the choose-is-reject bijection, swept by the engine on every roster through $n = 9$ — TRUE.',
          '(C) fails at the smallest witness: $\\sum \\tbinom{2}{k} = 1 + 2 + 1 = 4 = 2^2$, not $2^2 + 1 = 5$ — the census has no spare string; FALSE.',
          '(D) fails at $n = 3$: $\\tbinom{6}{2} = 15$ while $2\\tbinom{3}{2} = 6$ — the roster doubled gains more than its mirrors; FALSE (indeed $\\tbinom{2n}{2} = n(2n-1)$ against $n(n-1)$, equal only at $n = 0$).',
          'Hence, (A) and (B) hold; (C) and (D) fail.',
        ], answer: '(A) and (B) are true; (C) fails at $n = 2$ ($4 \\neq 5$), (D) at $n = 3$ ($15 \\neq 6$)' },
        { q: 'Exam-style (Linked Comprehension). A club has 6 men and 5 women (11 members). (i) In how many ways can a 4-member task force be chosen? (ii) How many of those task forces have exactly 2 men and 2 women? (iii) How many have at least one woman? Answer all three with the engine named.', solution: [
          '(i) The selection count: $\\tbinom{11}{4} = \\tfrac{11 \\cdot 10 \\cdot 9 \\cdot 8}{4!} = \\tfrac{7920}{24} = 330$ — any four of the eleven, order irrelevant.',
          '(ii) The two-group selection: $\\tbinom{6}{2} \\times \\tbinom{5}{2} = 15 \\times 10 = 150$ — fifteen male pairs against ten female pairs, the engine enumerating all 150 casts literally.',
          '(iii) The complement: bad task forces are the all-male ones — $\\tbinom{6}{4} = 15$ — so at least one woman gives $330 - 15 = 315$.',
          'The audits: $\\tbinom{11}{4} = 330$ and $\\tbinom{6}{4} = 15$ both engine-enumerated literally; the complement read is total minus bad, 6.1’s seed cashed.',
          'Hence, (i) 330, (ii) 150, (iii) 315.',
        ], answer: '(i) $330$; (ii) $150$; (iii) $315$' },
      ] },
      { level: 'L5', questions: [
        { q: 'Prove Pascal’s identity $\\tbinom{n+1}{r} = \\tbinom{n}{r} + \\tbinom{n}{r-1}$ by BOTH routes — the in/out split (this lesson’s counting proof) and the factorial algebra (6.2’s route, re-run by you, cited not copied) — and witness both at $n = 4$, $r = 2$.', solution: [
          'Route one (in/out): enlarge a 4-roster by a marked newcomer. Its 2-selections split by the newcomer’s stance — IN: pick 1 more from the other 4, $\\tbinom{4}{1} = 4$ ways; OUT: pick both from the other 4, $\\tbinom{4}{2} = 6$ ways — disjoint, exhaustive forks that add: $\\tbinom{5}{2} = 10 = 4 + 6$.',
          'Route two (algebra, 6.2’s): $\\tbinom{n}{r} + \\tbinom{n}{r-1} = \\tfrac{n!}{r!\\,(n-r)!} + \\tfrac{n!}{(r-1)!\\,(n-r+1)!} = \\tfrac{n!}{(r-1)!\\,(n-r)!}\\left(\\tfrac{1}{r} + \\tfrac{1}{n-r+1}\\right) = \\tfrac{n!}{(r-1)!\\,(n-r)!} \\cdot \\tfrac{n+1}{r\\,(n-r+1)} = \\tfrac{(n+1)!}{r!\\,(n+1-r)!} = \\tbinom{n+1}{r}$.',
          'The witness at $n = 4, r = 2$: route one reads $6 + 4$; route two reads $\\tfrac{24}{2 \\cdot 2} + \\tfrac{24}{1 \\cdot 6} = 6 + 4$ — both land on $\\tbinom{5}{2} = 10$.',
          'The engine cross-checks the identity literally at every $n \\leq 8$: each bucket of the enlarged roster split by the marked object counts up to the two summands exactly.',
          'Hence, both routes prove the split; the counting proof explains WHY (a stance is taken), the algebraic proof confirms THAT (the fractions conspire) — one identity, two honest certificates.',
        ], answer: 'proved both ways; at $n = 4, r = 2$: $10 = 6 + 4$' },
        { q: 'Exam-style (Linked Comprehension). For a six-object roster, price the full census and its symmetry splits: (i) zero-or-more selections; (ii) at-least-one selections; (iii) exactly-3 selections; (iv) at-least-4 selections, and show it equals at-most-2.', solution: [
          '(i) The zero-or-more census: $2^6 = 64$ — six in/out decisions, engine-enumerated literally.',
          '(ii) The at-least-one census: $2^6 - 1 = 63$ — the all-OUT string deleted.',
          '(iii) Exactly 3: $\\tbinom{6}{3} = \\tfrac{6 \\cdot 5 \\cdot 4}{3!} = 20$ — the middle peak of the even row, engine-enumerated.',
          '(iv) At least 4: $\\tbinom{6}{4} + \\tbinom{6}{5} + \\tbinom{6}{6} = 15 + 6 + 1 = 22$.',
          'The symmetry: at least 4 means rejecting at most 2 — the complement read pairs each such selection with its at-most-2 rejection, and indeed $\\tbinom{6}{0} + \\tbinom{6}{1} + \\tbinom{6}{2} = 1 + 6 + 15 = 22$ — equal counts from complementary sizes, the engine bucketing all 64 strings to confirm both 22s.',
          'Hence, 64; 63; 20; 22 — and 22 = 22 by the mirror, not by luck.',
        ], answer: '(i) $64$; (ii) $63$; (iii) $20$; (iv) $22$, equal to at-most-2 by the complement pairing' },
        { q: 'Exam-style (Numerical Value). From 6 adults and 4 children, choose 2 adults and 2 children for a photograph, then arrange all four in a row. Report the number of photographs (the integer), and state which single factor the order question contributes.', solution: [
          'Select the cast: $\\tbinom{6}{2} \\times \\tbinom{4}{2} = 15 \\times 6 = 90$ casts — the two-group selection engine.',
          'Arrange the cast: all four stand in a row, so the cast orders in $4! = 24$ ways — the ONE arrangement factor the order question contributes.',
          'So, the count: $90 \\times 24 = 2160$ photographs.',
          'The audit: the engine enumerates the 90 casts literally and confirms $2160 = 90 \\times 24 = (15 \\times 6) \\times 24$.',
          'Hence, 2160 photographs — selection factors first, the single $4!$ once.',
        ], answer: '$2160 = \\tbinom{6}{2}\\tbinom{4}{2} \\times 4!$; the order contributes exactly one factor, $4!$' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove the product-chain law: the number of ways to select at least one object from EACH of $k$ groups of different objects, of sizes $a, b, \\ldots$, is $(2^a - 1)(2^b - 1) \\cdots$. Then price it on two rosters of our own: 4 comics and 2 atlases; 5 fiction and 3 non-fiction volumes.', solution: [
          'The per-group engine: from a group of $a$ different objects, the at-least-one selections number $2^a - 1$ — the group’s zero-or-more census with the all-OUT string deleted (equation 7, proved by the per-object decision census).',
          'The chain: the groups’ choices are independent — each group’s non-empty selection is made without consulting any other group — so 6.1’s multiplication rule multiplies the per-group counts: $(2^a - 1)(2^b - 1) \\cdots$.',
          'The witness on 4 comics and 2 atlases: $(2^4 - 1)(2^2 - 1) = 15 \\times 3 = 45$ — the engine enumerates the 45 (non-empty comic set, non-empty atlas set) pairs literally.',
          'The witness on 5 fiction and 3 non-fiction: $(2^5 - 1)(2^3 - 1) = 31 \\times 7 = 217$ — the engine enumerates the 31 non-empty fiction sets against the 7 non-empty non-fiction sets, 217 pairs literally.',
          'The subtraction read agrees on the second: $2^8 - 2^5 - 2^3 + 1 = 256 - 32 - 8 + 1 = 217$ — total strings minus the empty-fiction ones minus the empty-non-fiction ones plus the double-deleted string; the two-set subtraction is the smallest honest instance of the inclusion–exclusion engine 6.6 builds.',
          'Hence, the product-chain law stands — at-least-one censuses multiplied along 6.1’s chain, verified by literal enumeration at both witnesses.',
        ], answer: 'proved; $45 = (2^4-1)(2^2-1)$ and $217 = (2^5-1)(2^3-1)$' },
        { q: 'Prove the half-row identities: for an odd roster $n = 2k+1$, $\\sum_{r=0}^{k} \\tbinom{n}{r} = 2^{n-1}$; for an even roster $n = 2k$, $\\sum_{r=0}^{k-1} \\tbinom{n}{r} = \\tfrac{2^n - \\tbinom{n}{k}}{2}$. Price both at $n = 7$ and $n = 6$, and verify by literal enumeration.', solution: [
          'The odd case: seats $r$ and $n - r$ are mirrors with equal values, and the middle seat $k = \\tfrac{n-1}{2}$ pairs with $k+1 = \\tfrac{n+1}{2}$ — also a mirror pair — so the row splits into two equal halves: $\\sum_{r=0}^{2k+1} \\tbinom{n}{r} = 2^n = 2 \\sum_{r=0}^{k} \\tbinom{n}{r}$, giving $\\sum_{r=0}^{k} = 2^{n-1}$.',
          'Price it at $n = 7$: $\\tbinom{7}{0} + \\tbinom{7}{1} + \\tbinom{7}{2} + \\tbinom{7}{3} = 1 + 7 + 21 + 35 = 64 = 2^6$ — and the engine enumerates all 128 strings of a seven-roster, confirming 64 sit in the at-most-3 half.',
          'The even case: seats $r < k$ mirror seats $n - r > k$, and the MIDDLE seat $k$ is its own mirror — unpaired — so $2^n = 2\\sum_{r=0}^{k-1} \\tbinom{n}{r} + \\tbinom{n}{k}$, giving $\\sum_{r=0}^{k-1} = \\tfrac{2^n - \\tbinom{n}{k}}{2}$.',
          'Price it at $n = 6$: $\\tbinom{6}{0} + \\tbinom{6}{1} + \\tbinom{6}{2} = 1 + 6 + 15 = 22$, and $\\tfrac{2^6 - \\tbinom{6}{3}}{2} = \\tfrac{64 - 20}{2} = 22$ — the engine enumerates all 64 strings, 22 in the at-most-2 half, 22 in the at-least-4 half, 20 in the middle seat.',
          'The meaning: on an odd roster the census halves evenly; on an even roster the unpaired middle seat is the whole difference — and the 63-hunt of the lesson is the odd case with the empty string deleted ($2^{2k} - 1$).',
          'Hence, the half-row identities are proved and priced: 64 at $n = 7$, 22 at $n = 6$, engine-swept literally.',
        ], answer: 'odd: $\\sum_{r \\leq k} = 2^{n-1}$ ($64$ at $n=7$); even: $\\sum_{r \\leq k-1} = (2^n - \\tbinom{n}{k})/2$ ($22$ at $n=6$)' },
      ] },
    ] },
  ],
}

/* ------------------------------------------------------------------ */
/* figures for lesson 6.5 — the select-then-arrange split diagram and   */
/* the Pascal in/out split (vivid palette only, plain labels)          */
/* ------------------------------------------------------------------ */

function selectThenArrangeSvg(): string {
  // left panel: the six 2-selections of {a,b,c,d} as green pills; the pair
  // {a,b} highlighted; arrow to the right panel where that pair expands
  // into its two orderings ab and ba (orange); the count chain reads
  // 6 × 2! = 12 = 4P2; the dashed bracket is the ab = ba collapse
  const pills: Array<[string, number, boolean]> = [
    ['ab', 0, true], ['ac', 1, false], ['ad', 2, false],
    ['bc', 3, false], ['bd', 4, false], ['cd', 5, false],
  ]
  const pillX = (i: number): number => (i % 2 === 0 ? 110 : 250)
  const pillY = (i: number): number => 128 + Math.floor(i / 2) * 34
  const leftPills = pills
    .map(([label, i, hot]) => `<circle cx="${pillX(i) + 26}" cy="${pillY(i) + 12}" r="12" fill="${hot ? '#ea580c' : '#16a34a'}"/><text x="${pillX(i) + 26}" y="${pillY(i) + 16}" font-size="10.5" font-weight="700" text-anchor="middle" fill="#ffffff">${label}</text>`)
    .join('')
  return `<svg viewBox="0 0 720 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The two-step split on the roster a b c d. Left, in a green-framed panel: the six selections of two objects — ab, ac, ad, bc, bd, cd — drawn as green pills, with the pair ab highlighted in orange. An amber arrow with the stacked corridor label each cast arranges in 2! equals 2 ways (three lines between the panels) leads to the right panel, framed in orange: the pair a b shown with both its orderings, the ordered row a then b and the ordered row b then a, drawn as orange chips, with the label 6 times 2! equals 12 equals 4P2. A dashed bracket below joins the two orderings back to the single selection, labelled the ab equals ba collapse — two arrangements, one selection.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">select, then arrange — the two-step split on the roster a, b, c, d</text>
  <rect x="52" y="62" width="280" height="168" rx="14" fill="#fef3c7" stroke="#16a34a" stroke-width="2.2"/>
  <text x="192" y="88" font-size="11.5" font-weight="700" text-anchor="middle" fill="#166534">the six selections of two</text>
  ${leftPills}
  <text x="192" y="240" font-size="10.5" text-anchor="middle" fill="#0f766e">C(4,2) = 6 — order ignored</text>
  <path d="M336,146 C368,146 376,120 404,104" fill="none" stroke="#d97706" stroke-width="2.4"/>
  <path d="M404,104 l-10,-1.5 l6,8 z" fill="#d97706"/>
  <text x="370" y="162" font-size="10" font-weight="700" text-anchor="middle" fill="#d97706">each cast</text>
  <text x="370" y="176" font-size="10" font-weight="700" text-anchor="middle" fill="#d97706">arranges in</text>
  <text x="370" y="190" font-size="10" font-weight="700" text-anchor="middle" fill="#d97706">2! = 2 ways</text>
  <rect x="410" y="62" width="262" height="168" rx="14" fill="#ffedd5" stroke="#ea580c" stroke-width="2.2"/>
  <text x="541" y="88" font-size="11.5" font-weight="700" text-anchor="middle" fill="#166534">the pair {a, b} and its two orderings</text>
  <circle cx="492" cy="128" r="12" fill="#ea580c"/><text x="492" y="132" font-size="10.5" font-weight="700" text-anchor="middle" fill="#ffffff">ab</text>
  <circle cx="590" cy="128" r="12" fill="#ea580c"/><text x="590" y="132" font-size="10.5" font-weight="700" text-anchor="middle" fill="#ffffff">ba</text>
  <text x="492" y="106" font-size="10" font-weight="700" text-anchor="middle" fill="#0f766e">a then b</text>
  <text x="590" y="106" font-size="10" font-weight="700" text-anchor="middle" fill="#0f766e">b then a</text>
  <path d="M470,158 C500,190 580,190 612,158" fill="none" stroke="#65a30d" stroke-width="1.6" stroke-dasharray="5 4"/>
  <text x="541" y="204" font-size="10" text-anchor="middle" fill="#166534">the ab = ba collapse — two arrangements, one selection</text>
  <text x="541" y="228" font-size="11.5" font-weight="700" text-anchor="middle" fill="#ea580c">6 × 2! = 12 = 4P2</text>
  <text x="360" y="262" font-size="10.5" text-anchor="middle" fill="#0f766e">the order divide: every arrangement = a selection + an ordering of that cast</text>
  <text x="360" y="282" font-size="10.5" text-anchor="middle" fill="#0f766e">lesson 6.4 divided by n for the same reason — each circle unwrapped into n linear rows</text>
</svg>`
}

function pascalInOutSvg(): string {
  // top: a roster of five green object circles with the marked newcomer
  // (orange, starred) appended; two branch arrows — IN (orange) and OUT
  // (green) — with the two case counts C(n, r−1) and C(n, r); they merge
  // into the total C(n+1, r) bar. Below: rows 4 and 5 of the triangle with
  // the two parents of a highlighted 10 marked. (Q3 QA redraw of the top
  // region: the green OUT box moved below the title band, the IN/OUT labels
  // moved INSIDE their boxes, the star painted ON the newcomer circle, and
  // both arrows re-routed so no label is crossed or masked.)
  const objs = [1, 2, 3, 4]
  const roster = objs
    .map((k) => `<circle cx="${120 + (k - 1) * 34}" cy="66" r="11" fill="#16a34a"/>`)
    .join('')
  const labels = objs
    .map((k) => `<text x="${120 + (k - 1) * 34}" y="70" font-size="9.5" font-weight="700" text-anchor="middle" fill="#ffffff">${k}</text>`)
    .join('')
  const row4 = [1, 4, 6, 4, 1]
  const row5 = [1, 5, 10, 10, 5, 1]
  const r4 = row4
    .map((v, i) => `<text x="${168 + i * 64}" y="268" font-size="11" font-weight="${i === 1 || i === 2 ? 700 : 400}" text-anchor="middle" fill="${i === 1 || i === 2 ? '#d97706' : '#166534'}">${v}</text>`)
    .join('')
  const r5 = row5
    .map((v, i) => `<text x="${136 + i * 64}" y="296" font-size="11" font-weight="${i === 3 ? 700 : 400}" text-anchor="middle" fill="${i === 3 ? '#ea580c' : '#166534'}">${v}</text>`)
    .join('')
  return `<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The in/out split behind Pascal's identity. Top: a roster of four green numbered objects plus one orange starred newcomer object. Two branch arrows leave the newcomer: the orange IN branch, labelled IN — the newcomer joins the cast, pick the other r minus 1 from the remaining n objects in C(n, r minus 1) ways; and the green OUT branch, labelled OUT — the newcomer stays out, pick all r from the remaining n in C(n, r) ways. The branches merge into a bar reading total C(n plus 1, r) equals C(n, r) plus C(n, r minus 1). Below: the triangle rows 1 4 6 4 1 and 1 5 10 10 5 1, with the two amber parents 4 and 6 of the highlighted orange 10 marked — every entry of the lower row is the sum of its two parents.">
  <text x="360" y="22" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">Pascal’s identity — the in/out split on one marked object</text>
  <text x="130" y="48" font-size="10" font-weight="700" fill="#166534">the roster of n objects…</text>
  ${roster}${labels}
  <circle cx="284" cy="66" r="11" fill="#ea580c"/>
  <text x="284" y="70" font-size="11" font-weight="700" text-anchor="middle" fill="#ffffff">★</text>
  <text x="318" y="48" font-size="10" font-weight="700" text-anchor="middle" fill="#ea580c">the newcomer — the (n+1)st object</text>
  <path d="M300,74 C340,100 366,124 404,140" fill="none" stroke="#ea580c" stroke-width="2.4"/>
  <path d="M404,140 l-11,-4 l3,11 z" fill="#ea580c"/>
  <path d="M300,58 C340,66 372,64 404,62" fill="none" stroke="#16a34a" stroke-width="2.4"/>
  <path d="M404,62 l-11,-3.5 l3.5,10 z" fill="#16a34a"/>
  <rect x="404" y="110" width="272" height="62" rx="10" fill="#fef3c7" stroke="#d97706" stroke-width="1.8"/>
  <text x="540" y="128" font-size="10" font-weight="700" text-anchor="middle" fill="#ea580c">IN — join the cast</text>
  <text x="540" y="146" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">pick the other r − 1 from the n</text>
  <text x="540" y="164" font-size="11.5" font-weight="700" text-anchor="middle" fill="#ea580c">C(n, r−1)</text>
  <rect x="404" y="30" width="272" height="62" rx="10" fill="#ffedd5" stroke="#16a34a" stroke-width="1.8"/>
  <text x="540" y="48" font-size="10" font-weight="700" text-anchor="middle" fill="#166534">OUT — stay out of it</text>
  <text x="540" y="66" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">pick all r from the n</text>
  <text x="540" y="84" font-size="11.5" font-weight="700" text-anchor="middle" fill="#16a34a">C(n, r)</text>
  <rect x="160" y="196" width="400" height="34" rx="8" fill="#fef3c7" stroke="#ea580c" stroke-width="2"/>
  <text x="360" y="218" font-size="12" font-weight="700" text-anchor="middle" fill="#166534">disjoint forks add: C(n+1, r) = C(n, r) + C(n, r−1)</text>
  <text x="360" y="252" font-size="10.5" text-anchor="middle" fill="#0f766e">the split printed row under row — each entry is the sum of its two parents:</text>
  ${r4}
  ${r5}
  <path d="M232,272 C244,282 252,286 260,288" fill="none" stroke="#d97706" stroke-width="1.6" stroke-dasharray="4 3"/>
  <path d="M296,272 C284,282 276,286 268,288" fill="none" stroke="#d97706" stroke-width="1.6" stroke-dasharray="4 3"/>
  <text x="470" y="312" font-size="9.5" text-anchor="middle" fill="#0f766e">the orange 10 = the amber 4 + 6 — 6.2 proved it by algebra; the split proves it by a stance</text>
</svg>`
}

/**
 * Advanced Algebra — chapter 6, lesson 6.6
 * "Distributions and the Classic Counting Puzzles" (parallel-swarm run, task 6-f —
 * the chapter's capstone, carrying the HEAVIEST fold load of the unit: ELEVEN
 * hosted folds from the m2-07 module band 7.24–7.35).
 *
 * NOTE FOR THE ORCHESTRATOR (paste-time): this part-file lives in
 * scripts/aa-ch06-work/; when pasted into
 * src/data/library/books/mathematics/advanced-algebra/ch-06.ts the type import
 * above must become the chapter file's own
 * `import type { Chapter, Lesson } from '../../../types'` (or join the existing
 * import) — everything else is the chapter's exact Lesson shape, and the three
 * SVG figure functions below must ride along with the lesson (hoisted
 * declarations, called from the block list).
 *
 * VERIFY-FIRST: this lesson's own brute-force engine
 * scripts/aa-ch06-work/v6-6.ts (section K) was grown green BEFORE this prose
 * was declared done — every selection census, division count, distribution
 * count, bars-and-gaps count, series coefficient, PIE union, onto count and
 * derangement below is re-derived by literal enumeration (subset lists,
 * assignment lists, symbol-arrangement lists, permutation lists) and by the
 * closed forms, the two agreeing exactly; section L pins the structural
 * contract (quiz 5, exercises 15 in 2/2/3/3/3/2, the fold-discharge
 * traceability, the raw-TeX repair list). Ground: the m2-07 module's
 * 7.24–7.35 band (selection from identical, divisors, division and
 * distribution of distinct and of identical objects, the series method, PIE,
 * onto, derangements — CAE 7.9–7.12) + the S.125–S.135 solutions shapes.
 * STUDY-NEVER-REPRODUCE: every roster, word, number, figure, Illustration and
 * exercise below is OUR OWN — the module informed METHOD SHAPES only.
 *
 * Lesson census (engine-pinned): 21 Illustrations (the eleven hosted folds
 * discharged: Selection from Identical Objects / Division and Distribution of
 * Distinct Objects / Distribution of Identical Objects / Number of Integral
 * Solutions Using Series (Multinomial Theorem) as named sections, and the seven
 * example-families — (m+n) two-group, (m+n+p) three-group, equal-size,
 * sizes-not-fixed, identical-empty-not-allowed, identical-empty-allowed,
 * distinct-empty-not-allowed — with two named Illustrations each); 7
 * derivations; 3 figures (vivid palette only); 4 tables; 5 formula cards; 11
 * terms; quiz 5 items, keys [2, 2, 1, 3, 0]; exercises 15 in 2/2/3/3/3/2; 12
 * tagged equations. Prerequisites pinned to AA 6.5 "Combinations: the
 * Selection Count" + ANS 4.3 "Divisors from DNA: Divisor Counts"; sources
 * cengage-m2-07 (banked at close), cengage-jee-style,
 * ncert-math11-ch6-permutations-combinations, jee-main-2026-syllabus,
 * hall-knight-higher-algebra, openstax-college-algebra.
 */
const lesson66: Lesson = {
  id: 'aa-distributions-and-the-classic-counting-puzzles',
  number: '6.6',
  title: 'Distributions and the Classic Counting Puzzles',
  concepts: [
    'selection from identical objects and the (n + 1)-seat census',
    'division and distribution of distinct objects',
    'groups of equal size and the k-factorial honesty',
    'distribution of identical objects: bars in gaps',
    'integral solutions by the series method',
    'the principle of inclusion and exclusion',
    'derangements and the exactly-k-correct censuses',
  ],
  objectives: [
    'Count selections from identical stocks — the $n + 1$ zero-or-more census, mixed identical-and-distinct censuses by the multiplication rule, and the divisor-count reread of Arithmetic and Number Systems 4.3, cited and never re-taught.',
    'Divide and distribute distinct objects — the $\\tbinom{m+n}{m}$ two-group split, the three-group and general $m!/(x_1!\\,x_2!\\cdots x_k!)$ engine, the equal-size division with its $k!$ correction proved on a four-object literal table, and the $\\times k!$ a person-count charges.',
    'Distribute identical objects — the bars-in-gaps count $\\tbinom{n+r-1}{r-1}$ and the gaps-in-bars count $\\tbinom{n-1}{r-1}$, both proved, both read as equations in non-negative and positive unknowns.',
    'Price integral solutions by the series method — coefficients of a product of geometric strings, the $(1-x)^{-n}$ coefficient law NAMED as chapter 7\u2019s any-index binomial doorstep and never cashed here.',
    'Run the principle of inclusion and exclusion from the two-set Venn census to the onto count $r^n - \\tbinom{r}{1}(r-1)^n + \\cdots$, and price derangements $D(n) = n!\\sum(-1)^k/k!$ with $D(4) = 9$ exhibited by hand.',
    'Open every puzzle at $n = 2$ and $n = 3$ — the small-case census that catches a wrong model before it is priced, the discipline this chapter closes with.',
  ],
  prerequisites: ['aa-combinations-the-selection-count', 'ans-divisors-from-dna-divisor-counts'],
  sources: ['cengage-m2-07', 'cengage-jee-style', 'ncert-math11-ch6-permutations-combinations', 'jee-main-2026-syllabus', 'hall-knight-higher-algebra', 'openstax-college-algebra'],
  blocks: [
    { kind: 'para', text: 'Lesson 6.5, "Combinations: the Selection Count", ended with the reader asking one question before every count: does order matter? This lesson adds the two questions that finish the chapter. A pile of festival sweets is about to be handed out, a shelf of distinct prizes is about to be split between two winners, four letters are about to be posted into the wrong envelopes — and every one of these puzzles is decided by the same interrogation: are the objects IDENTICAL or DISTINCT, are EMPTY groups allowed or not, and are the recipients GROUPS (unlabelled piles) or PERSONS (named hands)? Three yes-or-no questions, and the answers route the puzzle to one of the chapter\u2019s engines — or expose it as a fraud that no engine should touch.' },
    { kind: 'para', text: 'This is the puzzle room where the whole chapter interlocks, and the method throughout is the census discipline the chapter has kept since lesson 6.1: never trust a formula on a puzzle you have not opened at $n = 2$ or $n = 3$. Two identical sweets to two children make three distributions; two DISTINCT sweets to the same children make four — one tiny roster that separates an entire engine. The route: selection from identical objects first (the $n + 1$ census, with the divisor reread of Arithmetic and Number Systems 4.3 cited, never re-taught); then division and distribution of distinct objects into groups and hands; then distribution of identical objects, where the bars-and-gaps picture earns its formula; then integral solutions by the series method, the second engine for the same count; and finally the two classic puzzles that pay the whole chapter off — inclusion–exclusion cashed into the onto count, and derangements, the envelope puzzle, with $D(4) = 9$ listed by hand before any formula is believed.' },

    { kind: 'heading', text: 'Selection from Identical Objects' },
    { kind: 'para', text: 'Lesson 6.5 priced selections from DISTINCT objects: each object carries its own binary decision — in or out — so zero-or-more from $k$ distinct objects runs to $2^k$ selections. Identical objects carry no such identity. Five pens of the same colour are interchangeable in every way a selection can tell, so a selection from them is decided by exactly one datum: HOW MANY. Taking two of the five is one selection, not $\\tbinom{5}{2}$ — there is no "which two" to ask.' },
    { kind: 'callout', tone: 'definition', title: 'Selection from identical objects', text: 'The number of selections of ZERO OR MORE objects from $n$ identical objects is $n + 1$ — the seats $0, 1, 2, \\ldots, n$. The number of selections of ONE OR MORE is $n$ (the seat 0 removed). For a mixed stock of identical types of sizes $p, q, \\ldots$ together with $k$ distinct objects, zero-or-more selections run to $(p+1)(q+1)\\cdots 2^k$, and one-or-more selections to $(p+1)(q+1)\\cdots 2^k - 1$ — the empty selection subtracted.' },
    { kind: 'equation', latex: '\\text{zero-or-more from } n \\text{ identical} = n + 1, \\qquad \\text{one-or-more} = n \\tag{1}', note: 'the identical selection census — the datum is the count taken, not which objects.' },
    { kind: 'para', text: 'The multiplication rule of lesson 6.1 strings the mixed stock together, because the per-type decisions are independent: an identical type of size $p$ contributes its own $p + 1$ seats, every distinct object contributes its own factor of 2. The classic disguise of this census is divisor counting: a divisor of $N = p^{\\alpha} q^{\\beta}$ chooses how many $p$-factors to take ($\\alpha + 1$ seats) and how many $q$-factors ($\\beta + 1$ seats), so $\\tau(N) = (\\alpha + 1)(\\beta + 1)$ — Arithmetic and Number Systems lesson 4.3, "Divisors from DNA: Divisor Counts", priced exactly this census on the prime factorisation, and this lesson cites it without re-teaching it. So $\\tau(2^4 \\cdot 3^6) = 5 \\cdot 7 = 35$: thirty-five divisors, and thirty-five selections of zero-or-more objects from a stack of 4 identical twos and 6 identical threes — one count, two costumes.' },
    { kind: 'example', title: 'Selection from identical objects: the mixed drawer census', steps: [
      'Setup: a drawer holds 4 identical red pens, 6 identical blue notebooks and 5 distinct markers. Count the selections of zero or more objects, then the selections of one or more.',
      'The identical types price first: the pens contribute $4 + 1 = 5$ seats (0 to 4 pens), the notebooks contribute $6 + 1 = 7$ seats — no binomial is due, because "which pens" is not a question identical objects can answer.',
      'The distinct markers price next: each marker is its own in-or-out decision, so the 5 markers contribute $2^5 = 32$ selections — lesson 6.5\u2019s own census.',
      'Now, the chain (lesson 6.1\u2019s multiplication rule on independent decisions): zero-or-more selections $= 5 \\cdot 7 \\cdot 32 = 1120$.',
      'The empty selection is one of them — every factor chose its zero seat: $1 \\cdot 1 \\cdot 1 = 1$ — so one-or-more selections $= 1120 - 1 = 1119$.',
      'Hence, 1120 selections with emptiness allowed and 1119 without — and, by the divisor reread, the same engine prices $\\tau(2^4 \\cdot 3^6) = 5 \\cdot 7 = 35$.',
    ] },
    { kind: 'formula', name: 'Selection from identical objects', latex: '\\text{zero-or-more} = (p+1)(q+1)\\cdots 2^k - \\{\\text{empty}\\} = (p+1)(q+1)\\cdots 2^k - 1 \\text{ for one-or-more}', note: 'identical types contribute count-seats, distinct objects contribute binary factors; the mixed census is their product, the nonempty census that product minus one.' },
    { kind: 'callout', tone: 'warn', title: 'Identical is not distinct', text: 'One or more objects from a pile of 2 IDENTICAL sweets: the seats are 1 and 2, so the answer is 2. One or more from a pair of DISTINCT sweets: $\\tbinom{2}{1} + \\tbinom{2}{2} = 3$, the $2^2 - 1$ census of lesson 6.5. The two answers differ by exactly the empty-handed-looking middle case of taking one specific sweet — a distinction identical objects cannot record. Every distribution puzzle in this lesson opens with this fork; pricing a distinct-object formula on an identical stock (or the reverse) is the chapter\u2019s most common fraud, and the $n = 2$ census above catches it every time.' },

    { kind: 'heading', text: 'Division and Distribution of Distinct Objects' },
    { kind: 'para', text: 'Splitting DISTINCT objects raises a new axis that selection never had: the receiving piles may be indistinguishable GROUPS or named PERSONS. A DIVISION breaks the objects into unlabelled piles; a DISTRIBUTION hands the piles to named recipients. The distinction is priced — and the price is a factor — because two piles of different sizes are told apart by their sizes, while two equal-sized piles are not told apart at all. Both facts will be proved rather than asserted, the second on a four-object literal table.' },
    { kind: 'callout', tone: 'definition', title: 'Division and distribution of distinct objects', text: 'A DIVISION of $m$ distinct objects into groups of sizes $x_1, x_2, \\ldots, x_k$ (with $x_1 + x_2 + \\cdots + x_k = m$) is a splitting into UNLABELLED groups. Its count is $\\tfrac{m!}{x_1!\\,x_2!\\cdots x_k!}$ — further divided by $\\prod$ (multiplicity factorial) whenever equal sizes make groups interchangeable, e.g. three equal groups of size $x$ divide the count by $3!$. A DISTRIBUTION of the same objects to $k$ PERSONS (each person receiving one prescribed group) additionally multiplies by the number of ways to hand the groups to the persons.' },
    { kind: 'derivation', title: 'The two-group division count', statement: 'The number of ways to divide $m + n$ distinct objects into two groups of sizes $m$ and $n$, with $m \\neq n$, is the binomial coefficient C(m+n, m).', steps: [
      { label: 'Name the first group', formula: '\\text{the group of size } m \\text{ is a selection}', explanation: 'A division is fixed the instant its size-$m$ group is fixed — the remaining $n$ objects form the second group automatically, with no further choice to exercise.' },
      { label: 'Price the selection', formula: '\\binom{m+n}{m} = \\frac{(m+n)!}{m!\\,n!}', explanation: 'Lesson 6.5\u2019s engine: choosing which $m$ of the $m + n$ distinct objects sit in the first group — order inside the group is invisible, which is exactly why no permutation appears.' },
      { label: 'Confirm the roles are not double-counted', formula: '\\binom{m+n}{m} = \\binom{m+n}{n}', explanation: 'Choosing the $m$-group and choosing its complement the other way round are the same list of divisions — the symmetry read of lesson 6.5 certifies that the two descriptions do not double the count.' },
      { label: 'Read the distribution on top', formula: '\\binom{m+n}{m}\\cdot 2!', explanation: 'Two LABELLED persons can receive the two groups two ways — either the $m$-group goes to the first person, or to the second. Distinct sizes make the groups distinguishable, so the hand-over genuinely doubles.' },
    ], result: '$\\text{divisions} = \\tbinom{m+n}{m},$ $\\qquad$ $\\text{distributions to two persons} = \\tbinom{m+n}{m} \\cdot 2!$' },
    { kind: 'equation', latex: '\\binom{m+n}{m} = \\frac{(m+n)!}{m!\\,n!} \\quad (m \\neq n) \\tag{2}', note: 'two unequal groups: the complement is forced, so one selection prices the whole division.' },
    { kind: 'example', title: '(m + n) two-group division and distribution: nine distinct posters into a 4-and-5 split', steps: [
      'Setup: 9 distinct festival posters are divided into two display lots of sizes 4 and 5. First count the divisions; then count the distributions of the same posters between two named clubs.',
      'The small-case census first (the chapter\u2019s guard): 3 posters into a 1-and-2 split run to $\\{A \\mid B,C\\}$, $\\{B \\mid A,C\\}$, $\\{C \\mid A,B\\}$ — three divisions, and $\\tbinom{3}{1} = 3$ agrees, so the model is honest at the smallest size.',
      'The division: choose which 4 posters form the smaller lot, $\\tbinom{9}{4} = \\tfrac{9!}{4!\\,5!} = 126$ — the other lot is forced.',
      'The distribution to two named clubs: the two lots are distinguishable by size, and either club may take either lot, so $126 \\times 2! = 252$.',
      'Hence, 126 divisions and 252 distributions — the person-count charged exactly the factor of 2 the hand-over earns, no more.',
    ] },
    { kind: 'example', title: '(m + n) two-group division and distribution, exam-style: eleven distinct gifts to two cousins in 5 and 6', steps: [
      'Setup (exam-style, the single-correct shape competitive papers favour): 11 distinct gifts are divided into two parcels of sizes 5 and 6, and the parcels are then handed to cousins Meera and Arjun. Count the divisions and the distributions.',
      'The division: $\\tbinom{11}{5} = \\tfrac{11!}{5!\\,6!} = 462$ — the 6-parcel is the complement, forced.',
      'The distribution: either cousin can receive the 5-parcel, so the hand-over runs to $2! = 2$ ways and the distributions total $462 \\times 2 = 924$.',
      'Check the trap honestly: had the parcels been of EQUAL size, the division count would need the $\\div 2!$ correction the next-but-one derivation proves — but 5 and 6 differ, so no correction is due here, and a solver who divides 462 by 2 has priced the wrong object.',
      'Hence, 462 divisions, 924 distributions.',
    ] },
    { kind: 'para', text: 'Three groups run the same engine twice: select $m$ of the $m + n + p$ for the first group, then $n$ of the remaining $n + p$ for the second — the third is forced. The two selections multiply, $\\tbinom{m+n+p}{m}\\tbinom{n+p}{n}$, and the factorial arithmetic collapses the product into a single fraction, the pattern that generalises to any number of groups.' },
    { kind: 'equation', latex: '\\binom{m+n+p}{m}\\binom{n+p}{n} = \\frac{(m+n+p)!}{m!\\,n!\\,p!} \\tag{3}', note: 'three unequal groups: two chained selections, one collapsed fraction — and the same collapse gives m!/(x₁! x₂! ⋯ x_k!) for any number of groups.' },
    { kind: 'example', title: '(m + n + p) three-group division and distribution: twelve distinct seed packets into 3, 4 and 5', steps: [
      'Setup: 12 distinct seed packets are divided into three unlabelled batches of sizes 3, 4 and 5; then the batches are distributed among three neighbours who receive 3, 4 and 5 packets in some order.',
      'The division, two chained selections: $\\tbinom{12}{3}\\tbinom{9}{4} = 220 \\times 126 = 27720$ — and the collapsed fraction agrees, $\\tfrac{12!}{3!\\,4!\\,5!} = \\tfrac{479001600}{17280} = 27720$.',
      'The sizes 3, 4, 5 are all different, so no equal-size correction is due: the three batches are told apart by their sizes alone.',
      'The distribution among three persons: the batches can be handed over in $3! = 6$ orders (which neighbour takes the 3-batch, which the 4, which the 5), so $27720 \\times 6 = 166320$.',
      'Hence, 27720 divisions and 166320 distributions — every number re-derived by the brute-force engine on the literal assignments before this prose was fixed.',
    ] },
    { kind: 'example', title: '(m + n + p) three-group division with two equal sizes: eight distinct books into 3, 3 and 2', steps: [
      'Setup: 8 distinct books are divided into three groups, two reading-circle tables receiving 3 books each and a locked display case receiving 2 — the two 3-sized groups are interchangeable piles.',
      'The naive fraction first, honestly: $\\tfrac{8!}{3!\\,3!\\,2!} = 560$ prices ONE fixed seating of the sizes onto labelled slots — it distinguishes "first 3-table" from "second 3-table", which the physical setup cannot tell apart.',
      'The correction: the two 3-sized groups are interchangeable, so each true division was counted $2! = 2$ times, and the honest division count is $560 \\div 2 = 280$.',
      'The distribution to three persons who receive 3, 3 and 2 books in some order: the hand-over now multiplies back by $3! = 6$ — the persons are named, so all six size-assignments are different distributions — giving $280 \\times 6 = 1680$.',
      'Hence, 280 divisions and 1680 distributions — the equal-size divide and the person-multiply are SEPARATE corrections, and the tally $\\tfrac{8!}{3!\\,3!\\,2!\\,2!} \\times 3!$ prices both at once.',
    ] },
    { kind: 'derivation', title: 'Equal-size groups: the division by k-factorial', statement: 'Dividing m distinct objects into k groups of EQUAL size x (so kx = m) overcounts by exactly k! — the honest count is m! divided by (x!)^k and by k!. The proof is a four-object literal table.', steps: [
      { label: 'List the whole small case', formula: '\\text{four objects } P, Q, R, S \\text{ into two pairs}', explanation: 'The ordered-split count is $\\tfrac{4!}{2!\\,2!} = 6$: choose the first pair, complement the second. The six ordered splits are listed in full in the table beside this derivation — nothing is abstract yet.' },
      { label: 'Read the table honestly', formula: '(PQ \\mid RS) \\leftrightarrow (RS \\mid PQ)', explanation: 'Row 1 and row 6 describe ONE physical division — a pile {P, Q} and a pile {R, S} on a table; likewise rows 2 and 5, rows 3 and 4. Six ordered splits collapse into three divisions.' },
      { label: 'Name the overcount', formula: '\\text{each division counted } 2! \\text{ times}', explanation: 'The two slots "first group" and "second group" are interchangeable when the sizes match — the fraction $\\tfrac{4!}{2!\\,2!}$ priced an ORDERED pair of groups, and the physical object is an UNORDERED one.' },
      { label: 'Scale to k equal groups', formula: '\\frac{m!}{(x!)^k\\,k!}', explanation: 'With $k$ equal-sized groups the slots permute in $k!$ ways for every true division; groups of equal size are told apart by nothing at all. Mixed sizes divide by the multiplicity of EACH size separately — three 2-groups and two 3-groups divide by $2! \\cdot 3!$.' },
      { label: 'Price the persons honestly', formula: '\\frac{m!}{(x!)^k\\,k!} \\cdot k!', explanation: 'Handing k labelled persons one group each runs to k! orders — exactly cancelling the division\u2019s k!: equal distribution to persons is the plain ordered count $\\tfrac{m!}{(x!)^k}$.' },
    ], result: '$\\text{equal-size divisions} = \\tfrac{m!}{(x!)^k\\,k!},$ $\\qquad$ $\\text{equal share to } k \\text{ persons} = \\tfrac{m!}{(x!)^k}$' },
    { kind: 'table', caption: 'The four-object literal table behind the equal-size division: six ordered splits of P, Q, R, S into two pairs, collapsing pairwise into three divisions — every row and every pairing re-derived by the brute-force engine before this prose was written.', head: ['Split', 'First pair', 'Second pair', 'Same division as'], rows: [
      ['1', '$P, Q$', '$R, S$', 'row 6'],
      ['2', '$P, R$', '$Q, S$', 'row 5'],
      ['3', '$P, S$', '$Q, R$', 'row 4'],
      ['4', '$Q, R$', '$P, S$', 'row 3'],
      ['5', '$Q, S$', '$P, R$', 'row 2'],
      ['6', '$R, S$', '$P, Q$', 'row 1'],
    ] },
    { kind: 'figure', caption: 'The equal-size honesty drawn: the six ordered splits of the four coins P, Q, R, S as first-pair and second-pair cells (left), with dashed brackets joining the rows that describe the SAME physical division — row 1 with row 6, row 2 with row 5, row 3 with row 4 — and the three true divisions listed on the right. Six ordered splits ÷ 2! = 3 divisions: the interchange of the two pair-slots is the entire overcount, exactly the k! the general formula divides away.', svg: equalSizePairingSvg() },
    { kind: 'equation', latex: '\\frac{m!}{x_1!\\,x_2!\\cdots x_k!} \\;\\Big/\\; \\prod_{\\text{equal sizes}} (\\text{multiplicity}!) \\tag{4}', note: 'the general division engine: the factorial fraction for labelled slots, divided by the interchange factor of each family of equal-sized groups.' },
    { kind: 'example', title: 'Division into groups of equal size: six distinct coins into three equal pairs', steps: [
      'Setup: 6 distinct coins are divided into three unlabelled pairs; then the same coins are dealt to three named collectors, two each.',
      'The honest division: $\\tfrac{6!}{(2!)^3\\,3!} = \\tfrac{720}{8 \\cdot 6} = 15$ — the $\\div 3!$ is the equal-size correction just proved, and it is NOT optional: the naive $\\tfrac{6!}{(2!)^3} = 90$ counts the three pair-slots as labelled.',
      'The distribution to three named collectors, two coins each: the pairs are handed out in $3!$ orders, so $15 \\times 6 = 90$ — and it is no accident that the person-count restores the naive number: labelling the recipients re-labels the slots the division had unlabelled.',
      'The engine cross-check: the 15 divisions were re-derived by literal enumeration of the $3^6 = 729$ labelled assignments (90 of which deal two to each collector) before this prose was fixed.',
      'Hence, 15 divisions, 90 distributions — one factor of $3!$ removed for the groups, one restored for the persons.',
    ] },
    { kind: 'example', title: 'Division into groups of equal size, exam-style: twelve distinct stamps into four groups of 3', steps: [
      'Setup (exam-style): 12 distinct stamps are divided into four unlabelled album pages of 3 stamps each; then distributed to four named collectors, 3 stamps each.',
      'The division: $\\tfrac{12!}{(3!)^4\\,4!} = \\tfrac{479001600}{1296 \\cdot 24} = 15400$ — four equal-sized groups divide by $4!$, the correction the four-object table proved and the census below re-witnesses.',
      'The distribution to four named collectors: the pages are handed over in $4!$ orders, so $15400 \\times 24 = 369600 = \\tfrac{12!}{(3!)^4}$ — the persons re-label the pages exactly as the six-coin example re-labelled the pairs.',
      'A smaller census for the same shape, run literally by the engine: 8 distinct beads into four pairs give $\\tfrac{8!}{(2!)^4\\,4!} = 105$ divisions and $\\tfrac{8!}{(2!)^4} = 2520$ distributions to four named strings — the pattern holds at every size.',
      'Hence, 15400 divisions and 369600 distributions.',
    ] },
    { kind: 'para', text: 'When the sizes are NOT fixed at all, the group structure disappears and the multiplication rule of lesson 6.1, "The Fundamental Principle of Counting", returns in its purest costume: each distinct object independently picks its recipient, so $n$ distinct objects among $r$ persons run to $r^n$ distributions. This is also the function census of chapter 1, "Relations: the Set of Pairs View", read again — a distribution IS a function from objects to persons, and the count of functions from an $n$-set to an $r$-set is $r^n$. The subtraction shape rides the same census: if one recipient is forbidden to sweep everything, subtract the sweep assignments from the total.' },
    { kind: 'equation', latex: 'r^n \\tag{5}', note: 'n distinct objects to r persons, sizes not fixed: each object its own decision — the function census of chapter 1 again.' },
    { kind: 'example', title: 'Distribution of distinct objects when group sizes are not fixed: four distinct cards to three friends', steps: [
      'Setup: 4 distinct greeting cards are distributed among 3 friends, with no restriction on how many each friend receives.',
      'The census first, at the smallest size: 2 cards to 2 friends give $2^2 = 4$ assignments — card 1\u2019s recipient times card 2\u2019s recipient — and the four are $(A, A)$, $(A, B)$, $(B, A)$, $(B, B)$ read as (card 1\u2019s friend, card 2\u2019s friend). The model is honest.',
      'The count: each card picks its friend independently, so $3^4 = 81$ distributions — the multiplication rule of lesson 6.1, four factors of 3.',
      'The reread: a distribution here IS a function from the 4 cards to the 3 friends — chapter 1\u2019s "Relations: the Set of Pairs View" priced exactly this census, and $3^4$ is its number again.',
      'Hence, 81 distributions, sizes entirely unfixed.',
    ] },
    { kind: 'example', title: 'Distribution when group sizes are not fixed, with a subtraction: four trophies to three houses, no sweep', steps: [
      'Setup: 4 distinct trophies go to 3 houses (the houses receive any number each), but no single house may sweep all 4 trophies.',
      'The unrestricted census: each trophy picks its house, $3^4 = 81$ distributions.',
      'The forbidden assignments: a sweep is every trophy to one house — 3 assignments, one per house; the subtraction $81 - 3 = 78$ removes exactly them.',
      'Check the subtraction\u2019s honesty at $n = 2$: 2 trophies to 2 houses with no sweep gives $2^2 - 2 = 2$ — the assignments (A, B) and (B, A) — and no other assignment sweeps.',
      'Hence, 78 distributions — the total-minus-bad discipline, valid because the bad set is tiny and exactly listed; when bad events OVERLAP instead, the honest tool is inclusion–exclusion, this lesson\u2019s closing engine.',
    ] },
    { kind: 'formula', name: 'Division and distribution of distinct objects', latex: '\\frac{m!}{x_1!\\,x_2!\\cdots x_k!} \\;\\Big/\\; \\prod (\\text{multiplicity}!) \\quad \\xrightarrow{\\;\\text{to persons}\\;} \\quad \\times k!', note: 'the factorial fraction for labelled group-slots; divide by the interchange factor of every family of equal sizes; multiply by the hand-over orders only when the recipients are named persons.' },

    { kind: 'heading', text: 'Distribution of Identical Objects' },
    { kind: 'para', text: 'Identical objects turn the distribution question inside out: nothing about the objects can be recorded except HOW MANY each recipient holds, so a distribution of $n$ identical objects among $r$ persons is exactly a list of counts $(x_1, x_2, \\ldots, x_r)$ with $x_1 + x_2 + \\cdots + x_r = n$. Division and distribution COINCIDE for identical objects — the persons differ only by the counts they hold, and the tuple is the whole story. The honest exhibit first, in full.' },
    { kind: 'example', title: 'Distribution of identical objects: five sweets, two children, the full census', steps: [
      'Setup: 5 identical sweets are distributed between two children, any child receiving any number (zero included). List the whole census before trusting any formula.',
      'The census, in full: the distributions are $(0, 5)$, $(1, 4)$, $(2, 3)$, $(3, 2)$, $(4, 1)$, $(5, 0)$ — six distributions, one per count the first child can hold, the second child\u2019s count forced each time.',
      'The formula read: the count is the number of $x$ with $0 \\le x \\le 5$, which is $5 + 1 = 6$ — the $n + 1$ census of the opening section, wearing distribution clothes.',
      'The bars read, arriving one section early: $5 + 2 - 1 = 6$ symbols in a row with one bar among them — $\\tbinom{6}{1} = 6$ arrangements — the same six.',
      'Hence, 6 distributions — and for identical objects the DIVISION count (piles of sweets) is the same number: the piles carry no labels to tell apart.',
    ] },
    { kind: 'table', caption: 'The identical-distribution census in full: five identical sweets between two children, every row a distribution and every count re-derived literally. The total is 6 — the (n + 1) census, the bars count and the literal list all agreeing.', head: ['Sweets to child 1', 'Sweets to child 2', 'One way?'], rows: [
      ['0', '5', 'yes — 1 way'],
      ['1', '4', 'yes — 1 way'],
      ['2', '3', 'yes — 1 way'],
      ['3', '2', 'yes — 1 way'],
      ['4', '1', 'yes — 1 way'],
      ['5', '0', 'yes — 1 way'],
    ] },
    { kind: 'para', text: 'The general picture that prices the whole subject is the BARS-AND-GAPS model: lay the $n$ identical objects in a row and cut the row into $r$ spans with $r - 1$ bars. Where the bars sit, the spans sit — so counting distributions is counting symbol-arrangements, and arrangement counting is this chapter\u2019s oldest engine. The model has two honest readings depending on whether empty spans are allowed, and each reading is proved below.' },
    { kind: 'derivation', title: 'Bars in gaps: empty groups allowed', statement: 'The number of distributions of n identical objects among r persons, with empty shares allowed, is C(n + r − 1, r − 1).', steps: [
      { label: 'Build the symbol row', formula: 'n \\text{ objects} + (r-1) \\text{ bars} = n + r - 1 \\text{ symbols}', explanation: 'Write the objects as a row of identical dots and insert $r - 1$ identical bars anywhere in the row — before the first dot, after the last, between dots, and bars may stand ADJACENT (a pair of neighbouring bars encloses an empty span).' },
      { label: 'Count the arrangements', formula: '\\frac{(n + r - 1)!}{n!\\,(r-1)!}', explanation: 'The row is an arrangement of $n + r - 1$ symbols of two kinds — $n$ alike of one, $r - 1$ alike of the other — the lesson 6.3 engine for alike things, the very fraction that priced the word-arrangement puzzles.' },
      { label: 'Read the bijection', formula: '\\text{arrangement} \\leftrightarrow (x_1, \\ldots, x_r)', explanation: 'An arrangement FIXES the span lengths: the dots before the first bar are person 1\u2019s $x_1$, those between bars 1 and 2 are $x_2$, and so on. Conversely every tuple of counts draws exactly one arrangement. Chapter 1\u2019s set-of-outcomes discipline: two counts are equal when their outcome sets are in bijection.' },
      { label: 'Sweep the gap census', formula: '\\tbinom{n+r-1}{r-1} = \\tbinom{n+r-1}{n}', explanation: 'The binomial form is the seat count — choose the $r - 1$ bar-seats among the $n + r - 1$ symbol positions — and the symmetry read of lesson 6.5 shows the same number as choosing the $n$ dot-seats.' },
    ], result: '$\\text{empty allowed: } \\tbinom{n+r-1}{r-1} \\; \\text{distributions}$ $\\qquad$ $\\text{equivalently } \\tfrac{(n+r-1)!}{n!\\,(r-1)!}$' },
    { kind: 'derivation', title: 'Gaps in bars: empty groups not allowed', statement: 'The number of distributions of n identical objects among r persons, each receiving at least one, is C(n − 1, r − 1).', steps: [
      { label: 'Line the objects up', formula: 'n \\text{ objects} \\Rightarrow n-1 \\text{ inner gaps}', explanation: 'With the $n$ objects in a row, the spaces BETWEEN consecutive objects — not before the first nor after the last — number $n - 1$. Lesson 6.4\u2019s gap method at the round table returns here, one chapter later, in identical clothing.' },
      { label: 'Seat each bar in a gap', formula: '\\text{choose } r-1 \\text{ of the } n-1 \\text{ gaps}', explanation: 'A bar in an inner gap separates two objects that were adjacent, so every span keeps at least one object; two bars in ONE gap would enclose an empty span, so each gap hosts at most one bar — a SELECTION of gaps, not an arrangement.' },
      { label: 'Price the selection', formula: '\\binom{n-1}{r-1}', explanation: 'Lesson 6.5\u2019s engine once more — choose which $r - 1$ of the $n - 1$ inner gaps carry a bar; the spans and their lengths are then forced.' },
      { label: 'Cross-check by substitution', formula: 'y_i = x_i - 1 \\;\\Rightarrow\\; \\textstyle\\sum y_i = n - r', explanation: 'Setting $y_i = x_i - 1 \\ge 0$ turns the positive count into a non-negative one on the total $n - r$: by the bars-in-gaps result that is $\\tbinom{(n-r)+r-1}{r-1} = \\tbinom{n-1}{r-1}$ — two engines, one number.' },
    ], result: '$\\text{none empty: } \\tbinom{n-1}{r-1} \\; \\text{distributions}$ $\\qquad$ $\\text{cross-check } \\tbinom{n-1}{r-1} = \\tbinom{n-r+r-1}{r-1}$' },
    { kind: 'figure', caption: 'The bars-and-gaps model, both readings, on one roster: 7 identical objects to 3 persons. Top (empty allowed): the objects and 2 bars make 9 symbols in a row — the 2 bar-seats are chosen among all 9 symbol positions (bar seats 2 and 6 highlighted, giving the shares 1, 3, 3), and the count is C(9,2) = 36 — bars may stand at the ends or adjacent, which is precisely what empty shares are. Bottom (none empty): the 7 objects create only 6 inner gaps, the 2 bars must occupy distinct inner gaps (gaps 2 and 3 highlighted, giving the shares 2, 1, 4), and the count is C(6,2) = 15. Same objects, same bars, two different questions — and two different numbers.', svg: barsGapsSvg() },
    { kind: 'equation', latex: '\\binom{n+r-1}{r-1} = \\frac{(n+r-1)!}{n!\\,(r-1)!} \\tag{6}', note: 'identical objects, empty shares allowed — bars anywhere among the n + r − 1 symbols.' },
    { kind: 'equation', latex: '\\binom{n-1}{r-1} \\tag{7}', note: 'identical objects, every share at least one — bars in distinct inner gaps of the n − 1.' },
    { kind: 'para', text: 'The two counts are equation counts in disguise, and the disguise deserves to be stripped in both directions. A distribution of $n$ identical objects among $r$ persons is a tuple of counts $(x_1, \\ldots, x_r)$ with $x_1 + \\cdots + x_r = n$ — so the number of NON-NEGATIVE integral solutions of that equation is $\\tbinom{n+r-1}{r-1}$, and the number of POSITIVE integral solutions is $\\tbinom{n-1}{r-1}$. Every identical-distribution puzzle is an equation puzzle and conversely; the algebra statement and the sweets statement are the same sentence.' },
    { kind: 'example', title: 'Distribution of identical objects, empty groups allowed: seven raffle tickets to three boxes', steps: [
      'Setup: 7 identical raffle tickets are dropped into 3 distinct boxes, any box allowed to stay empty. Count the distributions, then restate the count as an equation.',
      'The bars count: $n = 7$, $r = 3$ — arrange 7 dots and 2 bars, $\\tbinom{7+3-1}{2} = \\tbinom{9}{2} = 36$ distributions.',
      'The engine cross-check: the 36 were re-derived by literal enumeration of the triples $(x, y, z) \\ge 0$ summing to 7 before this prose was fixed — the two engines agree exactly.',
      'The equation read: the count is the number of non-negative solutions of $x + y + z = 7$ — same sentence, algebra costume.',
      'Hence, 36 distributions $= \\tbinom{9}{2} = 36$ non-negative solutions.',
    ] },
    { kind: 'example', title: 'Distribution of identical objects, empty groups allowed, the equation read: x + y + z + w = 12', steps: [
      'Setup: count the non-negative integral solutions of $x + y + z + w = 12$ — the identical-distribution census for 12 objects and 4 persons, empty shares allowed.',
      'The bars count: $\\tbinom{12 + 4 - 1}{3} = \\tbinom{15}{3} = 455$.',
      'The honest middle census: at $n = 3$, $r = 2$ the formula reads $\\tbinom{4}{1} = 4$, and the solutions of $x + y = 3$ are literally $(0,3), (1,2), (2,1), (3,0)$ — four, as promised; the model is honest before it is scaled.',
      'The engine cross-check: the 455 quadruples were enumerated literally — every $(x, y, z, w) \\ge 0$ with sum 12 — and the census closed at exactly 455.',
      'Hence, 455 solutions — one equation, four persons\u2019 worth of identical sweets, empty shares priced in.',
    ] },
    { kind: 'example', title: 'Distribution of identical objects, empty groups not allowed: nine oranges to four children', steps: [
      'Setup: 9 identical oranges are shared among 4 children, each child receiving at least one. Count the distributions, in both readings.',
      'The gaps-in-bars count: 9 objects in a row make 8 inner gaps; seat 3 bars in 3 of them — $\\tbinom{8}{3} = 56$ distributions.',
      'The substitution cross-check: hand each child one orange first (4 gone), leaving 5 to distribute freely among 4 — $\\tbinom{5+4-1}{3} = \\tbinom{8}{3} = 56$, the two readings agreeing exactly.',
      'The equation read: 56 is the number of positive solutions of $x_1 + x_2 + x_3 + x_4 = 9$.',
      'Hence, 56 distributions — and the engine enumerated the 56 positive quadruples literally before this number was written.',
    ] },
    { kind: 'example', title: 'Distribution of identical objects, empty groups not allowed, floor raised: twelve candles, each box at least two', steps: [
      'Setup: 12 identical candles go into 3 distinct boxes, each box receiving at least TWO candles. Count the distributions.',
      'The substitution discipline: write $x_i \\ge 2$ for each box and set $y_i = x_i - 2 \\ge 0$ — the constraint migrates into the total, $y_1 + y_2 + y_3 = 12 - 6 = 6$.',
      'The count: non-negative solutions of the reduced equation, $\\tbinom{6 + 3 - 1}{2} = \\tbinom{8}{2} = 28$ distributions.',
      'The small census guard: with 4 candles into 2 boxes at least 2 each, the distributions are exactly $(2, 2)$ — one — and the same substitution gives $y_1 + y_2 = 0$, $\\tbinom{1}{1} = 1$; honest at the smallest size.',
      'The engine cross-check: the 28 triples $(x_1, x_2, x_3) \\ge 2$ summing to 12 were enumerated literally, and the census closed at exactly 28.',
      'Hence, 28 distributions — the floor-raise travels through the substitution, never through a new formula.',
    ] },
    { kind: 'formula', name: 'Distribution of identical objects', latex: '\\binom{n+r-1}{r-1} \\;\\text{(empty allowed)} \\qquad \\binom{n-1}{r-1} \\;\\text{(none empty)}', note: 'bars in gaps and bars in inner gaps — the same pair reads as the non-negative and positive solution counts of x₁ + ⋯ + x_r = n.' },
    { kind: 'callout', tone: 'warn', title: 'The identical-versus-distinct cross-fire', text: 'Four objects to two persons: IDENTICAL objects give $\\tbinom{5}{1} = 5$ distributions — the counts $(0,4)$ through $(4,0)$; DISTINCT objects give $2^4 = 16$ — each object its own binary decision. The gap between 5 and 16 is the identity the objects do or do not carry, and no formula repair bridges it — only the right model does. The companion fraud is forgetting WHICH bars formula is due: 10 identical sweets to 4 children with none left out give $\\tbinom{9}{3} = 84$, while the empty-allowed model would answer 286 — a wrong-model answer that a single $n = 2$ census (2 sweets, 2 children, none empty: only $(1,1)$, one way, $\\tbinom{1}{1} = 1$) exposes immediately.' },
    { kind: 'callout', tone: 'insight', title: 'One engine, two costumes', text: 'The bars-in-gaps count and the equal-size division share one skeleton: both are arrangement counts of ALIKE things (dots and bars; group-slots of equal size), both are corrected by the interchange factor of the alike family, and both were met before — lesson 6.3\u2019s $n!/(p!\\,q!\\cdots)$ for words with repeated letters. The chapter\u2019s engines are converging: the same fraction, read as words, as groups, or as symbol rows, is the single machine behind all three.' },

    { kind: 'heading', text: 'Number of Integral Solutions Using Series (Multinomial Theorem)' },
    { kind: 'para', text: 'The equation $x + y + z = 7$ was just priced by laying out sweets and bars. The same question has a SECOND engine, algebraic in costume and ultimately more powerful, because it absorbs UPPER BOUNDS — a ceiling like $x \\le 4$ that the bars picture prices only awkwardly. The idea: stop treating $x$ as a count of objects and treat its possible VALUES as powers of a bookkeeping symbol $p$. A variable taking the values $0, 1, 2, \\ldots$ contributes the string $p^0 + p^1 + p^2 + \\cdots$; choosing values for all the variables multiplies their strings; and the exponent of $p$ ADDS along the product — so the coefficient of $p^n$ in the product counts exactly the value-choices with $x + y + z = n$. This is the series method — the coefficient-reading of the multinomial theorem, met here in its counting clothes.' },
    { kind: 'para', text: 'One engine, two readings, and the readings must agree: the coefficient of $p^7$ in $(1 + p + p^2 + \\cdots)^3$ counts the triples $(x, y, z) \\ge 0$ with sum 7, which the bars-in-gaps engine already fixed at $\\tbinom{9}{2} = 36$. The agreement is not luck — the infinite string $1 + p + p^2 + \\cdots$ IS the geometric series of chapter 5 (lesson 5.2, "Geometric Progressions and the Infinite Tail", banks it), so the series method is the bars picture wearing chapter 5\u2019s algebra. The engine that makes the agreement a theorem is the coefficient law below.' },
    { kind: 'derivation', title: 'The series law: coefficients of the negative-power binomial', statement: 'The coefficient of x^r in (1 − x) to the power −n is C(n + r − 1, r) — the same number the bars-and-gaps engine produced. The law is chapter 7\u2019s doorstep, named here, never cashed.', steps: [
      { label: 'Unfold the geometric string', formula: '(1 + x + x^2 + \\cdots)^n = \\frac{1}{(1-x)^n}', explanation: 'The infinite string is the geometric series $\\tfrac{1}{1-x}$ (lesson 5.2\u2019s ground, cited not re-taught), so its $n$-fold product is exactly $(1 - x)^{-n}$ — the negative-index power whose full binomial theory is chapter 7\u2019s to build.' },
      { label: 'Read one term of the product', formula: 'x^{a_1} \\text{ from copy 1}, \\ldots, x^{a_n} \\text{ from copy } n', explanation: 'A term of the product picks one power from each of the $n$ copies; the term carries the total exponent $a_1 + a_2 + \\cdots + a_n$; so the terms of degree $r$ are exactly the $n$-tuples of non-negative exponents summing to $r$.' },
      { label: 'Count those tuples by the bars engine', formula: '\\#\\{a_i \\ge 0 : \\textstyle\\sum a_i = r\\} = \\binom{n+r-1}{n-1}', explanation: 'The tuples are identical-distributions of $r$ objects among $n$ persons, empty shares allowed — the count this lesson already proved by the symbol-row bijection. Chapter 1\u2019s discipline again: two counts agree when their outcome sets are the same set.' },
      { label: 'State the law', formula: '[x^r]\\,(1-x)^{-n} = \\binom{n+r-1}{r}', explanation: 'The coefficient of $x^r$ is $\\tbinom{n+r-1}{r}$, which equals $\\tbinom{n+r-1}{n-1}$ by lesson 6.5\u2019s symmetry read. Chapter 7, "Induction and the Binomial Theorem", will re-derive this as the any-index binomial — a promise made here and never cashed.' },
    ], result: '$[x^r]\\,(1-x)^{-n} = \\tbinom{n+r-1}{r}$ $\\qquad$ $\\text{the bars count in algebra clothing}$' },
    { kind: 'equation', latex: '(1 - x)^{-n} = 1 + \\binom{n}{1}x + \\binom{n+1}{2}x^2 + \\cdots + \\binom{n+r-1}{r}x^r + \\cdots \\tag{8}', note: 'the negative-index expansion — chapter 7\u2019s any-index binomial doorstep, named forward, never cashed in this chapter.' },
    { kind: 'example', title: 'Integral solutions by the series method: three distinct dice summing to 10', steps: [
      'Setup: three DISTINCT dice are thrown; count the outcomes in which the upper faces sum to 10 — distinct dice, so the ORDERED triple $(x_1, x_2, x_3)$ with $1 \\le x_i \\le 6$ is the outcome.',
      'The series setup: each die contributes the string $p + p^2 + \\cdots + p^6$, so the count is the coefficient of $p^{10}$ in $(p + p^2 + \\cdots + p^6)^3$.',
      'Factor out the minimum: $p(1 + p + \\cdots + p^5)$ per die, so the product is $p^3(1 + p + \\cdots + p^5)^3$ and the wanted coefficient is that of $p^{7}$ in $(1 + p + \\cdots + p^5)^3$.',
      'Convert to closed fractions: $1 + p + \\cdots + p^5 = \\tfrac{1 - p^6}{1 - p}$, so the cube is $(1 - p^6)^3(1 - p)^{-3}$ — and for the coefficient of $p^7$ only the terms $1$ and $-3p^6$ of $(1 - p^6)^3$ can contribute.',
      'The coefficient arithmetic: the main term is $[p^7](1-p)^{-3} = \\tbinom{3+7-1}{7} = \\tbinom{9}{7} = 36$, and the $-3p^6$ term pairs with $[p^1](1-p)^{-3} = \\tbinom{3}{1} = 3$, so the answer is $36 - 3 \\times 3 = 27$.',
      'The literal census (the engine\u2019s own cross-check, run before this prose): the unordered triples summing to 10 with parts in $[1, 6]$ are $(1,3,6)$, $(1,4,5)$, $(2,2,6)$, $(2,3,5)$, $(2,4,4)$, $(3,3,4)$ — worth $6 + 6 + 3 + 6 + 3 + 3 = 27$ ordered outcomes.',
      'Hence, 27 outcomes — the series engine, the closed fraction and the literal enumeration agreeing exactly.',
    ] },
    { kind: 'example', title: 'Integral solutions by the series method, a bounded variable: x + y + z = 10 with x at most 4', steps: [
      'Setup: count the non-negative solutions of $x + y + z = 10$ with the upper bound $x \\le 4$ — the bound is exactly what the series engine absorbs and the bars picture does not.',
      'The strings: $x$ contributes $1 + p + p^2 + p^3 + p^4 = \\tfrac{1 - p^5}{1 - p}$, while $y$ and $z$ contribute the free string $\\tfrac{1}{1 - p}$ each.',
      'The product: $(1 - p^5)(1 - p)^{-3}$, so the wanted coefficient of $p^{10}$ splits by the two terms of $(1 - p^5)$.',
      'The coefficient arithmetic: $[p^{10}](1-p)^{-3} = \\tbinom{12}{2}$-shaped — precisely $\\tbinom{3+10-1}{10} = \\tbinom{12}{10} = 66$ — minus $[p^{5}](1-p)^{-3} = \\tbinom{7}{5} = 21$.',
      'Hence, $66 - 21 = 45$ solutions — and the engine\u2019s literal enumeration of the triples $(x, y, z)$ with $x \\le 4$ summing to 10 closed at exactly 45 before this number was written.',
    ] },
    { kind: 'formula', name: 'The series method (the coefficient engine)', latex: '\\#\\{\\text{solutions}\\} = [p^n]\\,\\prod_{\\text{variables}}\\Big(1 + p + \\cdots + p^{\\text{bound}}\\Big), \\qquad [p^r]\\,(1-p)^{-n} = \\binom{n+r-1}{r}', note: 'each variable\u2019s value-set becomes a geometric string; upper bounds truncate the string to (1 − p^{bound+1})/(1 − p); the negative-power law then prices every coefficient.' },
    { kind: 'callout', tone: 'insight', title: 'Two engines, one outcome set', text: 'The bars-and-gaps picture, the series product and the literal enumeration all count THE SAME SET of tuples — chapter 1\u2019s cardinality discipline is why they must agree, and the brute-force engine in this lesson\u2019s verify script is the census-machine form of that discipline. When a puzzle admits an upper bound the bars engine cannot wear, the series engine takes over without a new model; when it admits neither, the enumeration itself is the referee. This convergence — several costumes, one count — is the deep habit the whole chapter has been building.' },

    { kind: 'heading', text: 'The Principle of Inclusion and Exclusion' },
    { kind: 'para', text: 'The subtraction shape of the trophies example — total minus bad — worked because the bad set was a list of 3 easy assignments. The moment two bad events OVERLAP, subtraction starts cheating: subtract each bad event and the overlap is subtracted twice, once inside each. The repair is the principle of inclusion and exclusion (PIE), and the honest way to build it is the two-set Venn census: count, region by region, how many times the alternating formula touches each piece of the diagram.' },
    { kind: 'para', text: 'For two sets the census is one line. The union $A \\cup B$ splits into three disjoint regions — $A$ alone, $B$ alone, and the overlap $A \\cap B$. The sum $n(A) + n(B)$ counts the first region once, the second once, and the overlap TWICE — so subtracting $n(A \\cap B)$ repairs exactly the double count. Nothing here is folklore: it is a three-region census, and the figure beside the next derivation runs the same census for three sets, where the alternation first shows its sign pattern.' },
    { kind: 'equation', latex: 'n(A \\cup B) = n(A) + n(B) - n(A \\cap B) \\tag{9}', note: 'the two-set census — the overlap was counted twice in the sum, so it is subtracted once.' },
    { kind: 'figure', caption: 'The PIE Venn ladder, both rungs, every region priced. Left (two sets): the regions A alone and B alone carry the tag +1 — the sum n(A) + n(B) counts each once — while the overlap carries +1 +1 −1 = +1: the alternation repairs exactly the double count. Right (three sets): the seven regions each end at exactly +1 — a lone region is counted once in the singles, a pairwise-only region is counted +2 in the singles then −1 in the pairs, and the triple region is counted +3 −3 +1 = +1. The sign alternation\u2019s whole job is to land every region at exactly one net count, and the engine swept both diagrams region by region before this prose was written.', svg: pieVennLadderSvg() },
    { kind: 'equation', latex: 'n(A \\cup B \\cup C) = n(A) + n(B) + n(C) - n(A \\cap B) - n(B \\cap C) - n(A \\cap C) + n(A \\cap B \\cap C) \\tag{10}', note: 'the three-set census: singles in, pairs out, the triple back in — every region lands at exactly +1.' },
    { kind: 'callout', tone: 'theorem', title: 'The principle of inclusion and exclusion', text: 'For sets $A_1, \\ldots, A_m$: include the cardinalities, exclude the pairwise intersections, include the triple-wise, exclude the quadruple-wise, alternating to the $m$-tuple intersection — included if $m$ is odd, excluded if even. The engine is the region census just run: a point in exactly $k$ of the sets is counted $\\tbinom{k}{1} - \\tbinom{k}{2} + \\tbinom{k}{3} - \\cdots + (-1)^{k-1}\\tbinom{k}{k} = 1$ time, the alternating binomial sum that collapses to exactly one. The complement read — $n(U) - n(A_1 \\cup \\cdots \\cup A_m)$ counts what is in NONE of the bad sets — is the form the classic puzzles cash.' },
    { kind: 'example', title: 'Inclusion–exclusion cashed: the divisibility census to 250', steps: [
      'Setup: how many of the integers 1 to 250 are divisible by at least one of 2, 5 and 7? And how many by none of them?',
      'The sets: $n(A_2) = \\lfloor 250/2 \\rfloor = 125$, $n(A_5) = 50$, $n(A_7) = 35$ — divisibility by a product is the intersection, since 2, 5, 7 share no prime.',
      'The pairwise intersections: $n(A_{10}) = 25$, $n(A_{14}) = 17$, $n(A_{35}) = 7$; the triple: $n(A_{70}) = 3$.',
      'The union by the three-set census: $125 + 50 + 35 - 25 - 17 - 7 + 3 = 210 - 49 + 3 = 164$ integers divisible by at least one of the three.',
      'The complement read: $250 - 164 = 86$ integers divisible by none of 2, 5, 7 — the "none of the bad sets" form.',
      'The engine cross-check: the divisibility of all 250 integers was enumerated literally and both censuses closed at exactly 164 and 86 before this prose was fixed.',
      'Hence, 164 and 86 — the PIE engine cashed on its most classical stage, the divisibility census.',
    ] },
    { kind: 'para', text: 'The distribution promise now falls due. The unrestricted count $r^n$ priced "sizes not fixed, empty shares allowed"; the none-empty version — every one of the $r$ persons receives at least one of the $n$ distinct objects — is the ONTO count, and the bad events ("person $i$ receives nothing") overlap exactly the way PIE repairs. This is the formula the module ground itself deferred to its own PIE section; this lesson derives it, cashes it twice, and hands it forward as the surjection count of chapter 1\u2019s function census.' },
    { kind: 'derivation', title: 'The onto count by inclusion and exclusion', statement: 'The number of distributions of n distinct objects among r persons with no person left empty is r to the n, minus C(r,1) times (r−1) to the n, plus C(r,2) times (r−2) to the n, alternating to the end. The same number is the count of onto functions from an n-set to an r-set.', steps: [
      { label: 'Name the bad events', formula: 'A_i = \\{\\text{person } i \\text{ receives nothing}\\}', explanation: 'The wanted distributions are the complement of the union of the $A_i$ — chapter 6.1\u2019s total-minus-bad seed, grown up: the bad events overlap, so plain subtraction would under-count the complement.' },
      { label: 'Price one bad event', formula: 'n(A_i) = (r-1)^n', explanation: 'If person $i$ is excluded, every object picks among the remaining $r - 1$ persons — the function census again, on a smaller codomain.' },
      { label: 'Price k simultaneous bad events', formula: 'n(A_{i_1} \\cap \\cdots \\cap A_{i_k}) = (r-k)^n', explanation: 'Excluding $k$ named persons leaves $r - k$ recipients; there are $\\tbinom{r}{k}$ such intersections, one per choice of the excluded set.' },
      { label: 'Run the PIE alternation', formula: 'r^n - \\tbinom{r}{1}(r-1)^n + \\tbinom{r}{2}(r-2)^n - \\cdots', explanation: 'The complement of the union, by the theorem just stated: singles out, pairs in, alternating — the term $\\tbinom{r}{r-1}(r-(r-1))^n = \\tbinom{r}{r-1}$ closes the sum.' },
      { label: 'Witness at the two-person edge', formula: '2^n - 2 \\cdot 1^n = 2^n - 2', explanation: 'Two persons, none empty: every object to one or the other, minus the two sweeps — and for 4 distinct objects that is $16 - 2 = 14$, the census the wrong-model callout exhibited.' },
    ], result: '$\\text{onto count} = r^n - \\tbinom{r}{1}(r-1)^n + \\tbinom{r}{2}(r-2)^n - \\cdots$ $\\qquad$ $\\text{(distributions with no empty person)}$' },
    { kind: 'equation', latex: '\\text{onto}(n \\to r) = r^n - \\binom{r}{1}(r-1)^n + \\binom{r}{2}(r-2)^n - \\cdots + (-1)^{r-1}\\binom{r}{r-1} \\tag{11}', note: 'distributions of n distinct objects leaving no person empty — the same number counts onto functions from an n-set onto an r-set.' },
    { kind: 'example', title: 'Distribution of distinct objects, empty groups not allowed: four letters, three mailboxes', steps: [
      'Setup: 4 distinct letters are posted into 3 distinct mailboxes, no mailbox left empty. Count the postings — the onto census at its smallest honest size.',
      'The onto engine: $3^4 - \\tbinom{3}{1} \\cdot 2^4 + \\tbinom{3}{2} \\cdot 1^4 = 81 - 48 + 3 = 36$.',
      'The reread: a posting is a function from the 4 letters to the 3 mailboxes, and "no mailbox empty" is exactly ONTO — so 36 is also the count of onto functions from a 4-set onto a 3-set, the number chapter 1\u2019s function census left unpriced.',
      'The engine cross-check: all $3^4 = 81$ postings were enumerated literally; exactly 36 leave no mailbox empty — the PIE alternation and the census agree.',
      'Hence, 36 postings — one engine, two costumes (distribution and function), one number.',
    ] },
    { kind: 'example', title: 'Distribution of distinct objects, empty groups not allowed, exam-style: six volunteers, four teams', steps: [
      'Setup (exam-style, the numerical-value shape): 6 distinct volunteers sign up across 4 named teams, every team receiving at least one volunteer. Count the assignments.',
      'The onto engine: $4^6 - \\tbinom{4}{1} \\cdot 3^6 + \\tbinom{4}{2} \\cdot 2^6 - \\tbinom{4}{3} \\cdot 1^6$.',
      'The arithmetic, term by term: $4^6 = 4096$; $4 \\cdot 3^6 = 4 \\cdot 729 = 2916$; $\\tbinom{4}{2} \\cdot 2^6 = 6 \\cdot 64 = 384$; $\\tbinom{4}{3} \\cdot 1 = 4$.',
      'The alternation: $4096 - 2916 + 384 - 4 = 1560$ assignments.',
      'The engine cross-check: all $4^6 = 4096$ assignments were enumerated literally; exactly 1560 leave no team empty.',
      'Hence, 1560 assignments — the full four-term alternation, priced and witnessed.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The alternation is not decoration', text: 'Dropping a sign is not a small error — it is a different count. For 6 volunteers and 4 teams, stopping after the first subtraction gives $4096 - 2916 = 1180$: the 384 pair-repairs are missing, and the answer is off by a quarter. The honest habit is the edge census: at $r = 2$ the formula must read $2^n - 2$ (every object distributed, no sweep), and any alternation that fails this edge is misassembled. The companion fraud is the bars formula pasted onto distinct objects: 6 identical badges to 4 empty-forbidden teams would be $\\tbinom{5}{3} = 10$, not 1560 — identical is not distinct, and the $n = 2$ census separates them.' },

    { kind: 'heading', text: 'Derangements: the Classic Puzzle, Cash in Full' },
    { kind: 'para', text: 'The chapter\u2019s final puzzle is its oldest: $n$ letters and $n$ addressed envelopes, one letter per envelope, and the question that has amused three centuries of mathematicians — in how many ways can EVERY letter land in a WRONG envelope? Such a placement is a DERANGEMENT, and its count $D(n)$ is PIE\u2019s most elegant cash: the bad events become "letter $i$ lands correctly", the complement is "no letter correct", and the alternation collapses into a sum so tidy it carries its own limit.' },
    { kind: 'callout', tone: 'definition', title: 'Derangement', text: 'A DERANGEMENT is a permutation of a set in which no element appears in its original position — for letters and envelopes, a placement with no letter in its own envelope. The derangement number $D(n)$ counts the derangements of $n$ objects; $D(1) = 0$ (a single letter has nowhere wrong to go), $D(2) = 1$ (swap), $D(3) = 2$.' },
    { kind: 'derivation', title: 'The derangement formula by inclusion and exclusion', statement: 'The derangement number is D(n) = n factorial times the alternating reciprocal sum — the count of permutations fixing no letter, priced by PIE on the correct-placement events.', steps: [
      { label: 'Name the bad events', formula: 'A_i = \\{\\text{letter } i \\text{ correct}\\}', explanation: 'A derangement fixes no letter, so the wanted set is the complement of the union of the $A_i$ — the same complement shape as the onto count, on the permutation universe of size $n!$.' },
      { label: 'Price k simultaneous correct letters', formula: 'n(A_{i_1} \\cap \\cdots \\cap A_{i_k}) = (n-k)!', explanation: 'Fix $k$ named letters into their own envelopes; the remaining $n - k$ letters go arbitrarily into the remaining envelopes — $(n-k)!$ ways; there are $\\tbinom{n}{k}$ such intersections.' },
      { label: 'Run the alternation', formula: 'n! - \\tbinom{n}{1}(n-1)! + \\tbinom{n}{2}(n-2)! - \\cdots', explanation: 'PIE on the complement of the union — the term count $\\tbinom{n}{k}(n-k)!$ simplifies beautifully, because $\\tbinom{n}{k}(n-k)! = \\tfrac{n!}{k!}$.' },
      { label: 'Collapse the factorials', formula: 'D(n) = n!\\left(1 - \\tfrac{1}{1!} + \\tfrac{1}{2!} - \\cdots + \\tfrac{(-1)^n}{n!}\\right)', explanation: 'Every term divided by $n!$ becomes a reciprocal factorial with alternating signs — the tidiness that makes derangements the classic exhibit.' },
      { label: 'Fix the recurrence for speed', formula: 'D(n) = n \\cdot D(n-1) + (-1)^n', explanation: 'The formula telescopes into a one-line recursion — checked below on the honest table: $D(4) = 4 \\cdot 2 + 1 = 9$ and $D(5) = 5 \\cdot 9 - 1 = 44$. The engine swept the recursion against the literal permutation census for $n = 1$ to 6.' },
    ], result: '$D(n) = n!\\left(1 - \\tfrac{1}{1!} + \\tfrac{1}{2!} - \\cdots + \\tfrac{(-1)^n}{n!}\\right)$ $\\qquad$ $D(n) = n \\cdot D(n-1) + (-1)^n$' },
    { kind: 'equation', latex: 'D(n) = n!\\sum_{k=0}^{n} \\frac{(-1)^k}{k!} \\tag{12}', note: 'the derangement number — the alternating reciprocal sum times n factorial; the recurrence D(n) = n·D(n−1) + (−1)ⁿ prices it at speed.' },
    { kind: 'example', title: 'Derangements: four letters, four envelopes, none correct — D(4) by hand and by formula', steps: [
      'Setup: 4 letters are placed into their 4 addressed envelopes, one per envelope, with no letter in its own envelope. Count the placements — first BY HAND, then by the formula.',
      'The by-hand census (the honest exhibit): labelling the letters 1, 2, 3, 4 and reading placements as the tuple of envelope-choices, the nine derangements are 2143, 2341, 2413, 3142, 3412, 3421, 4123, 4312, 4321 — nine, and the engine enumerated all $4! = 24$ permutations literally and kept exactly these nine.',
      'The formula read: $D(4) = 4!\\left(1 - 1 + \\tfrac{1}{2} - \\tfrac{1}{6} + \\tfrac{1}{24}\\right) = 24 - 24 + 12 - 4 + 1 = 9$.',
      'The recurrence read: $D(4) = 4 \\cdot D(3) + 1 = 4 \\cdot 2 + 1 = 9$ — three engines, one number.',
      'The exactly-one-correct companion: choose the one correct letter ($\\tbinom{4}{1} = 4$) and derange the other three ($D(3) = 2$) — $8$ placements with exactly one letter correct; the at-least-one count is $24 - 9 = 15$, the complement read.',
      'Hence, 9 placements — the smallest derangement count big enough to be non-obvious, and the exhibit that earns the formula its trust.',
    ] },
    { kind: 'table', caption: 'The derangement census n = 1 to 6, every value computed literally by the engine (permutation enumeration) and reconciled with both the alternating formula and the recurrence. The last column watches the ratio D(n)/n! settle toward 0.368… — the constant 1/e, the drift the wider theory names.', head: ['n', 'D(n) literal', 'D(n)/n! (approx)', 'Recurrence check'], rows: [
      ['1', '0', '0', '—'],
      ['2', '1', '0.5', '$2 \\cdot 0 + 1 = 1$'],
      ['3', '2', '0.3333', '$3 \\cdot 1 - 1 = 2$'],
      ['4', '9', '0.375', '$4 \\cdot 2 + 1 = 9$'],
      ['5', '44', '0.3667', '$5 \\cdot 9 - 1 = 44$'],
      ['6', '265', '0.3681', '$6 \\cdot 44 + 1 = 265$'],
    ] },
    { kind: 'example', title: 'Exam-style finale: six guests, six hats — exactly one or exactly two correct', steps: [
      'Setup (exam-style, the linked shape): 6 guests leave 6 hats with a hat-check and retrieve them at random, one hat each. Count the retrievals in which exactly ONE guest, or exactly TWO guests, get their own hats.',
      'Exactly one correct: choose the lucky guest ($\\tbinom{6}{1} = 6$) and derange the other five hats ($D(5) = 44$) — $6 \\times 44 = 264$ retrievals.',
      'Exactly two correct: choose the pair ($\\tbinom{6}{2} = 15$) and derange the other four ($D(4) = 9$) — $15 \\times 9 = 135$ retrievals.',
      'The total asked: $264 + 135 = 399$ retrievals with exactly one or exactly two hats correct.',
      'The engine cross-check: all $6! = 720$ retrievals were enumerated literally and binned by the number of correct hats; the bins at exactly-one and exactly-two closed at exactly 264 and 135 before this prose was fixed.',
      'Hence, 399 — the exactly-k-correct census, the derangement engine\u2019s most exam-shaped cash.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'Montmort and the matching problem', text: 'The derangement count carries a name older than the notation: Pierre Rémond de Montmort priced the matching problem — the "problème des rencontres" — in his 1708 Essai d\u2019analyse sur les jeux de hazard, one of the first printed probability texts, and the alternating reciprocal sum was known in that circle within a decade. The 1/e drift of the table above was observed just as early: the chance that nobody retrieves the correct hat hovers near three-eighths from n = 4 onward, a stability that made the puzzle a permanent fixture of every counting course since. The hat-check costume itself is the folklore name the twentieth century gave it.' },
    { kind: 'formula', name: 'The derangement number', latex: 'D(n) = n!\\left(1 - \\frac{1}{1!} + \\frac{1}{2!} - \\cdots + \\frac{(-1)^n}{n!}\\right), \\qquad D(n) = n\\,D(n-1) + (-1)^n', note: 'no element in its original position; the recurrence prices it at speed, and D(n)/n! rides toward 1/e.' },

    { kind: 'heading', text: 'Where the Engine Sits' },
    { kind: 'table', caption: 'The four great distribution counts in one census — the two questions every puzzle of this lesson asks (identical or distinct? empty allowed or not?) and the engine each answer routes to. Every cell was witnessed on a literal roster in the sections above; the master decision map that adds the arrangement questions belongs to lesson 6.R, "Unit 6 Completion Review".', head: ['The objects', 'Empty shares allowed', 'No empty share'], rows: [
      ['distinct (sizes not fixed)', '$r^n$ — each object its own recipient (the function census of chapter 1)', 'the onto count: $r^n - \\tbinom{r}{1}(r-1)^n + \\tbinom{r}{2}(r-2)^n - \\cdots$'],
      ['identical', '$\\tbinom{n+r-1}{r-1}$ — bars anywhere in the symbol row', '$\\tbinom{n-1}{r-1}$ — bars in distinct inner gaps'],
    ] },
    { kind: 'callout', tone: 'exam', title: 'Where this sits in the examinations', text: 'Unlike the chapters this book has shipped before this one, the exam ground here is REAL and on the syllabus: the JEE (Main) 2026 mathematics unit list carries permutations and combinations as its unit 4 (the banked syllabus audit — `jee-main-2026-syllabus`), NCERT class 11 chapter 6 is the school-canon statement of this whole chapter, and Hall & Knight chapter XI is the classic stretch that first assembled these puzzles in print. The module ground\u2019s own exercise typology — Single Correct, Multiple Correct, Linked Comprehension, Matrix Match, Numerical Value — is exactly the typology this lesson\u2019s L4–L6 sets mirror, and aptitude papers of the Khattar type price the derangement and divisibility censuses as numerical-speed items. Every exam-style item in this lesson is OUR OWN design, labelled honestly, never lifted from any paper.' },
    { kind: 'para', text: 'What waits ahead, in order. Chapter 7, "Induction and the Binomial Theorem", cashes the promise this lesson kept making: the coefficient law $[x^r](1-x)^{-n} = \\tbinom{n+r-1}{r}$ is the any-index binomial theorem\u2019s doorstep, and chapter 7\u2019s "The Binomial Theorem for Any Index" builds the full negative-index expansion as its own lesson — this lesson named the door and never opened it. The Combinatorics shelf book recalls the whole of this chapter at depth — bijections, generating functions taken past the humble geometric string, and inclusion–exclusion at full generality — as its first chapters\u2019 ground; no lesson ids exist there yet, so this lesson points and never cites one. And the handoff the book\u2019s own positioning promises — "for the counting ground — Probability" — lands next: every count in this chapter is a denominator waiting for its numerator. The 36 onto postings out of $3^4$, the 9 derangements out of $4!$, the 164 divisible integers out of 250 — Probability divides exactly these pairs, and it inherits a counted universe only because this chapter built it honestly. The unit\u2019s own review, lesson 6.R, "Unit 6 Completion Review", walks the decision map that routes every puzzle of the chapter — selection or arrangement, identical or distinct, circle or line, groups or persons, empty allowed or not — and the small-case census rides with you through all of it.' },
    { kind: 'callout', tone: 'insight', title: 'Open every puzzle at n = 2', text: 'The discipline this chapter installed in lesson 6.1 and cashed in every section of this one: before any formula is trusted, list the puzzle at $n = 2$ or $n = 3$. Two sweets to two children (3 ways if identical, 4 if distinct); two letters into two envelopes wrongly (1 way); two trophies to two houses with no sweep (2 ways). One minute of census catches the wrong model — the single most expensive error in this subject — before it is priced. The chapter\u2019s formulas are all honest; the frauds live in the routing, and the small-case census is the router\u2019s only honest referee.' },

    { kind: 'terms', items: [
      { term: 'Selection from identical objects', def: 'the census that counts HOW MANY rather than WHICH — zero-or-more from $n$ identical objects gives $n + 1$ selections, one-or-more gives $n$; mixed stocks multiply the per-type seats.' },
      { term: 'Division of distinct objects', def: 'splitting $m$ distinct objects into UNLABELLED groups of sizes $x_1, \\ldots, x_k$: the count $\\tfrac{m!}{x_1!\\cdots x_k!}$ divided by the interchange factor of every family of equal sizes.' },
      { term: 'Distribution of distinct objects', def: 'handing distinct objects to NAMED persons: the division count multiplied by the hand-over orders (a factor of $k!$ for $k$ persons each receiving one prescribed group).' },
      { term: 'Equal-size division', def: 'dividing $m$ distinct objects into $k$ groups of one equal size $x$: the honest count $\\tfrac{m!}{(x!)^k\\,k!}$, the $k!$ proved on the four-object literal table.' },
      { term: 'Bars-and-gaps model', def: 'the identical-distribution picture: $n$ objects and $r-1$ bars as one symbol row — bars anywhere gives $\\tbinom{n+r-1}{r-1}$ (empty allowed), bars in distinct inner gaps gives $\\tbinom{n-1}{r-1}$ (none empty).' },
      { term: 'Non-negative integral solution', def: 'a tuple $(x_1, \\ldots, x_r)$ of integers $\\ge 0$ with $x_1 + \\cdots + x_r = n$; the count is $\\tbinom{n+r-1}{r-1}$ — the empty-allowed identical distribution.' },
      { term: 'Positive integral solution', def: 'a tuple of integers $\\ge 1$ with the same sum; the count is $\\tbinom{n-1}{r-1}$ — the none-empty identical distribution.' },
      { term: 'The series method', def: 'pricing integral-solution counts as coefficients: each variable contributes a geometric string of its allowed values, and the coefficient of $p^n$ in the product counts the solutions — upper bounds truncate the string to $\\tfrac{1-p^{\\text{bound}+1}}{1-p}$.' },
      { term: 'Principle of inclusion and exclusion', def: 'the overlapping-complement repair: include the cardinalities, exclude pairwise intersections, alternate to the end — a point in exactly $k$ bad sets is counted exactly once, by the alternating binomial collapse.' },
      { term: 'Onto count', def: 'distributions of $n$ distinct objects among $r$ persons leaving none empty: $r^n - \\tbinom{r}{1}(r-1)^n + \\tbinom{r}{2}(r-2)^n - \\cdots$ — also the count of onto functions from an $n$-set onto an $r$-set.' },
      { term: 'Derangement', def: 'a permutation with no element in its original position; $D(n) = n!\\sum_{k \\ge 0}(-1)^k/k!$ with the speed recurrence $D(n) = n\\,D(n-1) + (-1)^n$, and $D(n)/n!$ riding toward $1/e$.' },
    ] },

    { kind: 'quiz', title: 'Check yourself: distributions and the classic counting puzzles', items: [
      { q: 'A basket holds 5 identical red notebooks and 4 identical blue pens. The number of selections of at least one item is:', options: ['$20$', '$30$', '$29$', '$9$'], answer: 2, explain: 'Identical types contribute count-seats: $5 + 1 = 6$ for the notebooks, $4 + 1 = 5$ for the pens, so zero-or-more selections run to $6 \\times 5 = 30$ and the nonempty census subtracts the one empty selection: $30 - 1 = 29$ (option C). Option A\u2019s 20 is $5 \\times 4$ — the AT-LEAST-ONE-OF-EACH count, an entirely different question (take 1 to 5 notebooks AND 1 to 4 pens); option B\u2019s 30 is the zero-or-more census with the empty selection left in — "at least one" was promised; option D\u2019s 9 is $5 + 4$, the one-from-each linear misfire that ignores the multiplicative seat structure entirely.' },
      { q: '9 distinct medals are divided into two groups of sizes 4 and 5. The number of DIVISIONS is:', options: ['$252$', '$63$', '$126$', '$3024$'], answer: 2, explain: 'Choose the size-4 group, the rest is forced: $\\tbinom{9}{4} = \\tfrac{9!}{4!\\,5!} = 126$ (option C). Option A\u2019s 252 is the DISTRIBUTION to two named persons ($126 \\times 2!$) — the question asked for unlabelled groups; option B\u2019s 63 is $126 \\div 2$, the equal-size correction pasted onto groups of DIFFERENT sizes (4 and 5 are told apart by size — nothing is interchangeable, nothing is divided); option D\u2019s 3024 is $\\tbinom{9}{4}$-shaped permutation $9 \\cdot 8 \\cdot 7 \\cdot 6$, the arrangement misfire that counts order inside a group a selection cannot see.' },
      { q: '10 identical sweets are distributed among 4 children, each receiving at least one. The number of distributions is:', options: ['$286$', '$84$', '$120$', '$210$'], answer: 1, explain: 'None empty: seat 3 bars in the 9 inner gaps of the 10 sweets — $\\tbinom{9}{3} = 84$ (option B); equivalently give each child one sweet first and distribute the remaining 6 freely, $\\tbinom{6+4-1}{3} = \\tbinom{9}{3} = 84$, the two reads agreeing. Option A\u2019s 286 is $\\tbinom{13}{3}$, the EMPTY-ALLOWED model — the "at least one" clause was thrown away; option C\u2019s 120 is $\\tbinom{10}{3}$, seating bars among 10 gaps when only the 9 INNER gaps are legal (the two end positions would empty a child); option D\u2019s 210 is $\\tbinom{10}{4}$, the bars-and-gaps roles swapped (choosing sweet-seats among bar-seats mispriced by one role).' },
      { q: 'Four letters are placed into their four addressed envelopes, one per envelope, none in its own. The number of placements is:', options: ['$24$', '$15$', '$12$', '$9$'], answer: 3, explain: 'This is the derangement $D(4) = 4!\\left(1 - 1 + \\tfrac{1}{2} - \\tfrac{1}{6} + \\tfrac{1}{24}\\right) = 24 - 24 + 12 - 4 + 1 = 9$ (option D), and the literal census lists exactly nine: 2143, 2341, 2413, 3142, 3412, 3421, 4123, 4312, 4321. Option A\u2019s 24 is $4!$, every placement — the "none correct" restriction was forgotten entirely; option B\u2019s 15 is $24 - 9$, the AT-LEAST-ONE-correct count — the complement of what was asked; option C\u2019s 12 is $4!/2$, the halving reflex this chapter taught for necklaces, pasted onto an object with no symmetry to halve.' },
      { q: 'The number of non-negative integral solutions of $x + y + z = 8$ is:', options: ['$45$', '$21$', '$120$', '$28$'], answer: 0, explain: 'Bars in gaps with $n = 8$, $r = 3$: $\\tbinom{8+3-1}{2} = \\tbinom{10}{2} = 45$ (option A) — equally the coefficient of $p^8$ in $(1+p+p^2+\\cdots)^3$, the series engine agreeing. Option B\u2019s 21 is $\\tbinom{7}{2}$, the POSITIVE-solutions count — the $\\ge 1$ model misread onto a $\\ge 0$ question (subtract 1 per variable and the total drops to 5); option C\u2019s 120 is $\\tbinom{10}{3}$, choosing 3 bar-seats when $r - 1 = 2$ bars are due — one bar invented; option D\u2019s 28 is $\\tbinom{8}{2}$, seating the bars among the 8 objects\u2019 positions instead of the full $n + r - 1$ symbol row, the end-positions thrown away.' },
    ] },

    { kind: 'exercises', title: 'Exercises 6.6', sets: [
      { level: 'L1', questions: [
        { q: 'A jar holds 6 identical red marbles and 5 identical blue marbles. Find (i) the number of selections of at least one marble, and (ii) the number of selections containing at least one of EACH colour.', solution: [
          'The identical seats: the red marbles contribute $6 + 1 = 7$ seats, the blue $5 + 1 = 6$ seats — "which marbles" is not a question identical marbles can answer.',
          'The zero-or-more census: $7 \\times 6 = 42$ selections, by lesson 6.1\u2019s multiplication rule on the two independent per-colour decisions.',
          'The at-least-one census: subtract the empty selection, $42 - 1 = 41$ selections of at least one marble.',
          'The at-least-one-of-each census: drop to the seats $1$ through $6$ for red and $1$ through $5$ for blue, $6 \\times 5 = 30$ selections.',
          'Hence, 41 and 30 — and the engine enumerated the 42 $(i, j)$ seat-pairs literally before this solution was written.',
        ], answer: '(i) 41 selections of at least one marble; (ii) 30 with at least one of each colour' },
        { q: '8 distinct coins are divided between two pouches, one holding 3 coins and one holding 5. Find (i) the number of divisions when the pouches are interchangeable, and (ii) the number of distributions when the pouches belong to two named friends, either friend receiving either pouch.', solution: [
          'The division: choose the 3-coin group, $\\tbinom{8}{3} = \\tfrac{8!}{3!\\,5!} = 56$ — the 5-coin group is forced as the complement.',
          'The sizes 3 and 5 differ, so the two groups are told apart by size and no equal-size correction is due: the interchangeable-pouch answer IS 56.',
          'The distribution to two named friends: either friend takes the 3-pouch, so the hand-over runs to $2! = 2$ ways and the distributions total $56 \\times 2 = 112$.',
          'The small census guard: 3 coins into a 1-and-2 split give $\\tbinom{3}{1} = 3$ divisions and $6$ distributions — the same two questions, honest at the smallest size.',
          'Hence, 56 divisions and 112 distributions.',
        ], answer: '56 divisions; 112 distributions to the two named friends' },
      ] },
      { level: 'L2', questions: [
        { q: '10 distinct books are divided into three unlabelled groups of sizes 2, 3 and 5. Find the number of divisions, and the number of distributions among three persons who receive 2, 3 and 5 books in some order.', solution: [
          'The division: the factorial fraction $\\tfrac{10!}{2!\\,3!\\,5!} = \\tfrac{3628800}{2 \\times 6 \\times 120} = 2520$ — all three sizes differ, so no interchange correction is due.',
          'The distribution among three persons, sizes in any order: the three groups are handed over in $3! = 6$ orders (which person takes the 2-group, which the 3, which the 5).',
          'The distributions total $2520 \\times 6 = 15120$.',
          'The engine cross-check: the $3^{10} = 59049$ labelled assignments were enumerated literally; those dealing sizes 2, 3, 5 in some order closed at exactly 15120, and unlabelling by $3!$ recovers 2520.',
          'Hence, 2520 divisions and 15120 distributions.',
        ], answer: '2520 divisions; 15120 distributions among the three persons' },
        { q: '6 distinct prizes are distributed among 3 children, each child receiving exactly 2 prizes. Find the number of distributions, and the number of divisions into three unlabelled pairs that lies behind it.', solution: [
          'The division into three unlabelled pairs: $\\tfrac{6!}{(2!)^3\\,3!} = \\tfrac{720}{8 \\times 6} = 15$ — the $\\div 3!$ is the equal-size correction the four-object table proved.',
          'The distribution to 3 named children: the three pairs are handed over in $3! = 6$ orders, so $15 \\times 6 = 90$ distributions.',
          'The single-fraction read: $\\tfrac{6!}{(2!)^3} = 90$ prices the distribution directly — labelling the recipients re-labels the slots the division had unlabelled.',
          'The engine cross-check: the $3^6 = 729$ labelled assignments were enumerated; exactly 90 deal two prizes to each child.',
          'Hence, 90 distributions, standing on 15 unlabelled divisions.',
        ], answer: '90 distributions to the children; 15 divisions into unlabelled pairs' },
      ] },
      { level: 'L3', questions: [
        { q: '12 identical cookies are shared among 5 children, each child receiving at least one. Find the number of distributions, and state the equation whose positive solutions this count is.', solution: [
          'The gaps-in-bars engine: 12 cookies in a row make 11 inner gaps; seat 4 bars in 4 of them — $\\tbinom{11}{4} = 330$ distributions.',
          'The substitution cross-check: give each child one cookie first (5 gone), leaving 7 to distribute freely among 5 — $\\tbinom{7+5-1}{4} = \\tbinom{11}{4} = 330$; the two readings agree.',
          'The equation read: 330 is the number of positive integral solutions of $x_1 + x_2 + x_3 + x_4 + x_5 = 12$.',
          'The engine cross-check: the positive quintuples summing to 12 were enumerated literally and closed at exactly 330 before this solution was written.',
          'Hence, 330 distributions — the equation\u2019s positive solution count.',
        ], answer: '330 distributions — the positive solutions of x₁ + x₂ + x₃ + x₄ + x₅ = 12' },
        { q: 'Find the number of non-negative integral solutions of $x_1 + x_2 + x_3 + x_4 = 15$, and check the answer against the small census at $n = 2$, $r = 4$.', solution: [
          'The bars-in-gaps engine: $\\tbinom{15 + 4 - 1}{3} = \\tbinom{18}{3} = 816$ solutions.',
          'The series engine agrees: the coefficient of $p^{15}$ in $(1 + p + p^2 + \\cdots)^4$ is $\\tbinom{4 + 15 - 1}{15} = \\tbinom{18}{15} = 816$ — one count, two costumes.',
          'The small census at $n = 2$, $r = 4$: the formula reads $\\tbinom{5}{3} = 10$, and the quadruples $(2,0,0,0)$-type (4 of them) and $(1,1,0,0)$-type (6 of them) total exactly 10 — honest at the smallest size.',
          'The engine cross-check: the quadruples were enumerated literally and closed at exactly 816.',
          'Hence, 816 non-negative solutions, census-verified.',
        ], answer: '816 solutions (the n = 2 census reads 10, matching the literal list)' },
        { q: '9 distinct gems are divided into four unlabelled groups of sizes 2, 2, 2 and 3. Find the number of divisions, and the number of distributions among four persons who receive 2, 2, 2 and 3 gems in some order.', solution: [
          'The factorial fraction with equal sizes: $\\tfrac{9!}{2!\\,2!\\,2!\\,3!} = \\tfrac{362880}{48} = 7560$ counts LABELLED slots, distinguishing the three 2-slots the physical setup cannot tell apart.',
          'The equal-size correction: the three 2-sized groups are interchangeable, so each true division was counted $3! = 6$ times — $7560 \\div 6 = 1260$ divisions.',
          'The distribution to four named persons, sizes in some order: the hand-over multiplies by $4! = 24$, so $1260 \\times 24 = 30240$ distributions.',
          'The engine cross-check: the $4^9 = 262144$ labelled assignments were enumerated literally; those dealing sizes 2, 2, 2, 3 in some order closed at exactly 30240, and unlabelling recovers 1260.',
          'Hence, 1260 divisions and 30240 distributions — the $\\div 3!$ and the $\\times 4!$ priced as the separate corrections they are.',
        ], answer: '1260 divisions; 30240 distributions among the four persons' },
      ] },
      { level: 'L4', questions: [
        { q: 'Exam-style (Single Correct). 5 distinct gifts are distributed among 3 persons so that no person is left without a gift. The number of distributions is: (A) 150  (B) 243  (C) 120  (D) 90. Choose the answer with full reasoning, and price every distractor.', solution: [
          'The onto engine: $3^5 - \\tbinom{3}{1} \\cdot 2^5 + \\tbinom{3}{2} \\cdot 1^5 = 243 - 96 + 3 = 150$ — answer (A).',
          'The engine cross-check: all $3^5 = 243$ assignments were enumerated literally; exactly 150 leave no person empty.',
          'Distractor (B): 243 is $3^5$ itself — the unrestricted count, the "no person empty" clause thrown away entirely.',
          'Distractor (C): 120 is $5!$ — the permutation misfire that arranges the five gifts in a row as if the persons were ordered seats; a distribution carries no order across persons, and the chapter\u2019s oldest discipline is that order invisible to the question must be divided out.',
          'Distractor (D): 90 prices ONE size-profile only — the $(2,2,1)$ profile: $\\tbinom{5}{2}\\tbinom{3}{2}\\tbinom{1}{1} \\times \\tfrac{3!}{2!} = 30 \\times 3 = 90$ — forgetting that the $(3,1,1)$ profile exists and contributes its own $\\tbinom{5}{3}\\tbinom{2}{1}\\tbinom{1}{1} \\times 3 = 60$; profiles ADD, and $90 + 60 = 150$ is the honest total.',
          'Hence, (A) 150 — the alternation, the literal census and the reading all agreeing.',
        ], answer: '(A) 150 — the onto count 3⁵ − 3·2⁵ + 3 = 150' },
        { q: 'Exam-style (Numerical Value). 4 letters are placed into their 4 addressed envelopes, one per envelope. Find the number of placements in which EXACTLY TWO letters are in their own envelopes.', solution: [
          'Choose the two correct letters: $\\tbinom{4}{2} = 6$ ways.',
          'Derange the remaining two: the two remaining letters must both avoid their own envelopes, and with two letters and two envelopes there is exactly ONE such placement (the swap), $D(2) = 1$.',
          'The count: $6 \\times 1 = 6$ placements with exactly two correct.',
          'The engine cross-check: all $4! = 24$ placements were enumerated literally and binned by the number of correct letters — the exactly-two bin closed at exactly 6.',
          'Hence, 6 — the exactly-k census at its smallest honest size.',
        ], answer: '6 placements' },
        { q: 'Exam-style (Multiple Correct). Which of the following counts are correct? (A) 7 distinct objects divided into unlabelled groups of sizes 3, 2 and 2: 105 divisions. (B) 10 identical balls into 4 distinct boxes, none empty: 84 distributions. (C) 6 identical balls into 3 distinct boxes, empty allowed: 28 distributions. (D) 4 distinct balls to 2 distinct persons, none empty: 16 distributions.', solution: [
          'Statement (A): $\\tfrac{7!}{3!\\,2!\\,2!} = 210$ counts labelled slots; the two 2-sized groups are interchangeable, so divide by $2!$: $210 \\div 2 = 105$ — TRUE.',
          'Statement (B): none empty, identical: $\\tbinom{10 - 1}{4 - 1} = \\tbinom{9}{3} = 84$ — TRUE.',
          'Statement (C): empty allowed, identical: $\\tbinom{6 + 3 - 1}{2} = \\tbinom{8}{2} = 28$ — TRUE.',
          'Statement (D): none empty, distinct, two persons: the onto count $2^4 - 2 = 14$, not 16 — FALSE: 16 is the unrestricted $2^4$, the two sweep assignments (all four balls to one person) left in.',
          'The engine cross-check: all four numbers were re-derived literally (labelled assignment enumeration for A and D, tuple enumeration for B and C) before this solution was written.',
          'Hence, (A), (B) and (C) are correct; (D) is the empty-subtraction fraud.',
        ], answer: '(A), (B), (C) true; (D) false — the honest count is 14, not 16' },
      ] },
      { level: 'L5', questions: [
        { q: 'Count the non-negative integral solutions of $x + y + z = 10$ subject to the upper bound $x \\le 4$, by the series method, and verify the answer by a literal-style census of the pattern types.', solution: [
          'The strings: $x$ contributes $1 + p + p^2 + p^3 + p^4 = \\tfrac{1 - p^5}{1 - p}$; $y$ and $z$ contribute the free string $\\tfrac{1}{1 - p}$ each.',
          'The product: $(1 - p^5)(1 - p)^{-3}$, so the wanted coefficient of $p^{10}$ splits by the two terms of $1 - p^5$.',
          'The coefficients: $[p^{10}](1-p)^{-3} = \\tbinom{3 + 10 - 1}{10} = \\tbinom{12}{10} = 66$, and $[p^{5}](1-p)^{-3} = \\tbinom{7}{5} = 21$.',
          'The answer: $66 - 21 = 45$ solutions with $x \\le 4$.',
          'The census-style verification: with $x = 0, 1, 2, 3, 4$ the pairs $(y, z)$ with $y + z = 10 - x$ number $11, 10, 9, 8, 7$ — summing $11 + 10 + 9 + 8 + 7 = 45$, the same answer from the other door.',
          'Hence, 45 — the series method\u2019s bound absorption, cross-checked by the column census.',
        ], answer: '45 solutions' },
        { q: 'Count the non-negative integral solutions of the INEQUALITY $x + y + z + w \\le 9$.', solution: [
          'The slack-variable discipline: introduce $t \\ge 0$ and rewrite the inequality as the equation $x + y + z + w + t = 9$ — every solution of the inequality pairs with exactly one solution of the equation (the slack is the leftover), so the two counts agree.',
          'The bars count on the equation: five variables, total 9 — $\\tbinom{9 + 5 - 1}{4} = \\tbinom{13}{4} = 715$ solutions.',
          'The series engine agrees: the coefficient of $p^9$ in $(1 + p + p^2 + \\cdots)^5$ is $\\tbinom{5 + 9 - 1}{9} = \\tbinom{13}{9} = 715$.',
          'The engine cross-check: the quadruples $(x, y, z, w) \\ge 0$ with $x + y + z + w \\le 9$ were enumerated literally and closed at exactly 715.',
          'Hence, 715 — the inequality tamed by one invented variable, the oldest trick in the equation book.',
        ], answer: '715 solutions' },
        { q: '5 distinct letters are posted into 4 distinct mailboxes, no mailbox left empty. Find the number of postings, and reconcile it with the count of onto functions from a 5-set onto a 4-set.', solution: [
          'The onto engine: $4^5 - \\tbinom{4}{1} \\cdot 3^5 + \\tbinom{4}{2} \\cdot 2^5 - \\tbinom{4}{3} \\cdot 1^5$.',
          'The arithmetic, term by term: $4^5 = 1024$; $4 \\cdot 3^5 = 4 \\cdot 243 = 972$; $\\tbinom{4}{2} \\cdot 2^5 = 6 \\cdot 32 = 192$; $\\tbinom{4}{3} \\cdot 1 = 4$.',
          'The alternation: $1024 - 972 + 192 - 4 = 240$ postings.',
          'The function reread: a posting IS a function from the 5 letters to the 4 mailboxes, and "no mailbox empty" is surjectivity — so 240 is the count of onto functions from a 5-set onto a 4-set, chapter 1\u2019s function census finally paid in full.',
          'The engine cross-check: all $4^5 = 1024$ postings were enumerated literally; exactly 240 leave no mailbox empty.',
          'Hence, 240 — distribution language and function language naming one number.',
        ], answer: '240 postings — the onto functions from a 5-set onto a 4-set' },
      ] },
      { level: 'L6', questions: [
        { q: 'Compute $D(5)$ three ways — the alternating formula, the recurrence $D(n) = n \\cdot D(n-1) + (-1)^n$, and the literal permutation census — then count the placements of 5 letters into 5 envelopes with exactly two letters correct.', solution: [
          'The formula: $D(5) = 5!\\left(1 - 1 + \\tfrac{1}{2} - \\tfrac{1}{6} + \\tfrac{1}{24} - \\tfrac{1}{120}\\right) = 120 - 120 + 60 - 20 + 5 - 1 = 44$.',
          'The recurrence: $D(5) = 5 \\cdot D(4) + (-1)^5 = 5 \\times 9 - 1 = 44$ — the same number.',
          'The literal census: the engine enumerated all $5! = 120$ permutations and kept those fixing nothing — exactly 44, so all three engines agree.',
          'Exactly two correct: choose the two correct letters ($\\tbinom{5}{2} = 10$) and derange the remaining three ($D(3) = 2$) — $10 \\times 2 = 20$ placements.',
          'The engine cross-check: the exactly-two bin of the literal census closed at exactly 20.',
          'Hence, $D(5) = 44$ by all three engines, and 20 placements have exactly two letters correct.',
        ], answer: 'D(5) = 44 (formula, recurrence and census agreeing); exactly two correct: 20 placements' },
        { q: 'Linked comprehension (exam-style). 11 identical apples are distributed among 3 persons, each receiving at least one, and NO TWO persons receiving the same number. (i) List the unordered partitions of 11 into three distinct positive parts. (ii) Count the distributions to the three named persons. (iii) Say what changes if the apples are DISTINCT instead, same constraints.', solution: [
          '(i) The partitions: $x < y < z$ positive with $x + y + z = 11$ — the list is $\\{1, 2, 8\\}$, $\\{1, 3, 7\\}$, $\\{1, 4, 6\\}$, $\\{2, 3, 6\\}$, $\\{2, 4, 5\\}$: five partitions.',
          '(ii) The distributions to named persons: each partition assigns its three distinct counts to the three persons in $3! = 6$ orders, so $5 \\times 6 = 30$ distributions — distinct counts make the roles interchangeable-free.',
          '(iii) If the apples are DISTINCT: a distribution first splits 11 distinct apples into groups of three distinct SIZES — but now which apples matter too. The honest answer keeps the lesson\u2019s discipline: the group sizes must still be a distinct triple from (i), and for EACH size triple the division runs $\\tfrac{11!}{x!\\,y!\\,z!}$; summing over the five triples gives $11!\\left(\\tfrac{1}{1!\\,2!\\,8!} + \\tfrac{1}{1!\\,3!\\,7!} + \\tfrac{1}{1!\\,4!\\,6!} + \\tfrac{1}{2!\\,3!\\,6!} + \\tfrac{1}{2!\\,4!\\,5!}\\right)$ divisions, times $3!$ for the persons — a sum of factorially-priced terms, not a bars formula, because "no two equal" is a constraint the bars engine does not wear.',
          'The identical-part engine cross-check: the $30$ ordered distinct triples $(x, y, z) \\ge 1$ summing to 11 with all parts different were enumerated literally and closed at exactly 30.',
          'Hence, (i) five partitions; (ii) 30 distributions; (iii) the distinct-apple count is a five-term factorial sum — the constraint changes the ENGINE, not just the numbers.',
        ], answer: '(i) 5 partitions: {1,2,8}, {1,3,7}, {1,4,6}, {2,3,6}, {2,4,5}; (ii) 30 distributions; (iii) a five-term factorial sum 11!(1/(1!2!8!) + ⋯ + 1/(2!4!5!)) × 3!, not a bars count' },
      ] },
    ] },

    /* ---- figures for lesson 6.6 (vivid palette, plain-text labels only) ---- */
  ],
}

/* ------------------------------------------------------------------ */
/* figure builders — vivid house palette only, plain-text SVG labels   */
/* ------------------------------------------------------------------ */

function barsGapsSvg(): string {
  // top panel: 7 dots + 2 bars = 9 symbols, bar seats 2 and 6 highlighted,
  // giving the shares (1, 3, 3); bottom panel: the 7 dots with 6 inner gap
  // ticks, gaps 2 and 3 highlighted, giving the shares (2, 1, 4) — the Q3
  // QA fix: the ticks now highlight gaps 2 and 3 (the bars fall after the
  // 2nd and 3rd objects), matching the pinned shares (2, 1, 4)
  const dot = (x: number, y: number): string => `<circle cx="${x}" cy="${y}" r="9" fill="#fef3c7" stroke="#16a34a" stroke-width="1.8"/>`
  const bar = (x: number, y: number): string => `<rect x="${x - 4}" y="${y - 16}" width="8" height="32" rx="2" fill="#ea580c"/>`
  const tick = (x: number, y: number, hot: boolean): string => `<line x1="${x}" y1="${y - 9}" x2="${x}" y2="${y + 9}" stroke="${hot ? '#ea580c' : '#5eead4'}" stroke-width="${hot ? 3.4 : 1.4}"/>`
  const seats = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((s) => {
    const hot = s === 2 || s === 6
    return `<rect x="${80 + (s - 1) * 62 + 21}" y="128" width="20" height="14" rx="3" fill="${hot ? '#ea580c' : '#ffedd5'}"/><text x="${80 + (s - 1) * 62 + 31}" y="139" font-size="9.5" text-anchor="middle" fill="${hot ? '#ffffff' : '#166534'}" font-weight="700">${s}</text>`
  }).join('')
  return `<svg viewBox="0 0 720 350" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The bars-and-gaps model for 7 identical objects and 3 persons, in two readings. Top row: the 7 objects drawn as dots with 2 orange bars placed between them, making 9 symbols in a row; the bar seats are numbered 1 to 9 beneath, and seats 2 and 6 are highlighted, giving the shares 1, 3 and 3 — the count of seat choices is C of 9 choose 2, which is 36, empty shares allowed. Bottom row: the same 7 dots with 6 inner gap ticks, of which gaps 2 and 3 are highlighted in orange, giving the shares 2, 1 and 4 — the count of gap choices is C of 6 choose 2, which is 15, no share empty.">
  <text x="360" y="26" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the bars-and-gaps model: 7 identical objects, 3 persons, 2 bars</text>
  <text x="70" y="62" font-size="11.5" font-weight="700" fill="#166534">empty allowed — bars anywhere in the 9-symbol row</text>
  ${[1, 3, 4, 5, 7, 8, 9].map((s) => dot(80 + (s - 1) * 62 + 31, 100)).join('')}
  ${bar(80 + (2 - 1) * 62 + 31, 100)}${bar(80 + (6 - 1) * 62 + 31, 100)}
  <text x="80" y="78" font-size="9.5" fill="#0f766e">seat 1 is before the first object — an empty first share</text>
  ${seats}
  <text x="80" y="166" font-size="10.5" fill="#0f766e">the highlighted seats 2 and 6 give the shares (1, 3, 3) — choose 2 bar seats of 9: C(9,2) = 36 ways</text>
  <line x1="60" y1="190" x2="690" y2="190" stroke="#fcd34d" stroke-width="1.6"/>
  <text x="70" y="222" font-size="11.5" font-weight="700" fill="#166534">none empty — bars only in the 6 inner gaps</text>
  ${[1, 2, 3, 4, 5, 6, 7].map((s) => dot(80 + (s - 1) * 62 + 31, 262)).join('')}
  ${[1, 2, 3, 4, 5, 6].map((g) => tick(80 + (g - 1) * 62 + 62, 262, g === 2 || g === 3)).join('')}
  <text x="80" y="318" font-size="10.5" fill="#0f766e">the highlighted gaps 2 and 3 give the shares (2, 1, 4) — choose 2 gaps of 6: C(6,2) = 15 ways</text>
  <text x="360" y="342" font-size="10" text-anchor="middle" fill="#0f766e">same objects, same bars — the empty-allowed question counts seats, the none-empty question counts gaps</text>
</svg>`
}

function equalSizePairingSvg(): string {
  // the four-object equal-size table as a picture: six ordered splits of
  // P, Q, R, S into first-pair / second-pair cells, paired by dashed amber
  // brackets into the three true divisions; footer prices the divide by 2!
  const row = (y: number, a: string, b: string, c: string, d: string): string => `
  <g fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"><rect x="120" y="${y}" width="70" height="30" rx="5"/><rect x="220" y="${y}" width="70" height="30" rx="5"/></g>
  <g font-size="13" font-weight="700" fill="#166534" text-anchor="middle"><text x="140" y="${y + 20}">${a}</text><text x="160" y="${y + 20}">${b}</text><text x="240" y="${y + 20}">${c}</text><text x="260" y="${y + 20}">${d}</text></g>`
  return `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The equal-size division honesty on four objects P, Q, R and S. Six ordered splits, each drawn as a first-pair cell and a second-pair cell: P Q with R S; P R with Q S; P S with Q R; Q R with P S; Q S with P R; and R S with P Q. A dashed amber bracket joins row one to row six, row two to row five and row three to row four, because each joined pair describes the same physical division. The six ordered splits collapse into three true divisions, so the ordered count 6 divides by 2 factorial to give 3.">
  <text x="360" y="26" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">equal-size division: six ordered splits, three true divisions</text>
  <text x="155" y="56" font-size="11" font-weight="700" fill="#0f766e" text-anchor="middle">first pair</text>
  <text x="255" y="56" font-size="11" font-weight="700" fill="#0f766e" text-anchor="middle">second pair</text>
  ${row(70, 'P', 'Q', 'R', 'S')}
  ${row(122, 'P', 'R', 'Q', 'S')}
  ${row(174, 'P', 'S', 'Q', 'R')}
  ${row(226, 'Q', 'R', 'P', 'S')}
  ${row(278, 'Q', 'S', 'P', 'R')}
  ${row(330, 'R', 'S', 'P', 'Q')}
  <g stroke="#d97706" stroke-width="1.8" stroke-dasharray="5 4" fill="none">
    <path d="M 100 85 C 40 85, 40 345, 100 345"/>
    <path d="M 100 137 C 55 137, 55 293, 100 293"/>
    <path d="M 100 189 C 70 189, 70 241, 100 241"/>
  </g>
  <g font-size="10.5" fill="#d97706" font-weight="700">
    <text x="60" y="215">same</text>
    <text x="60" y="228">division</text>
    <text x="72" y="215"> </text>
  </g>
  <g fill="#ffedd5" stroke="#ea580c" stroke-width="1.8"><rect x="470" y="150" width="200" height="34" rx="6"/><rect x="470" y="196" width="200" height="34" rx="6"/><rect x="470" y="242" width="200" height="34" rx="6"/></g>
  <g font-size="12" fill="#166534" font-weight="700" text-anchor="middle">
    <text x="570" y="172">{P, Q} and {R, S}</text>
    <text x="570" y="218">{P, R} and {Q, S}</text>
    <text x="570" y="264">{P, S} and {Q, R}</text>
  </g>
  <text x="570" y="130" font-size="11.5" font-weight="700" fill="#ea580c" text-anchor="middle">the three true divisions</text>
  <text x="360" y="382" font-size="10.5" text-anchor="middle" fill="#0f766e">6 ordered splits ÷ 2! = 3 divisions — the two pair-slots are interchangeable when the sizes match</text>
  <text x="360" y="398" font-size="10" text-anchor="middle" fill="#0f766e">with k equal groups the overcount is k! — the division count m! / ((x!)^k · k!)</text>
</svg>`
}

function pieVennLadderSvg(): string {
  // left: two-set Venn with per-region net counts; right: three-set Venn with
  // all seven regions at net +1; footers state the alternating laws
  return `<svg viewBox="0 0 720 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The inclusion and exclusion Venn ladder. Left panel: a rectangle labeled U containing two overlapping circles A and B. Three region tags: A alone plus 1, B alone plus 1, and the overlap plus 1 plus 1 minus 1 equals plus 1 — the union law n of A union B equals n of A plus n of B minus n of A intersect B. Right panel: three overlapping circles A, B and C with seven region tags, each netting to exactly plus 1: A only plus 1, B only plus 1, C only plus 1, A and B only plus 2 minus 1, A and C only plus 2 minus 1, B and C only plus 2 minus 1, and the triple plus 3 minus 3 plus 1. Every region lands at exactly one net count — that is the whole job of the sign alternation.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the PIE Venn ladder: every region lands at exactly +1</text>
  <g stroke="#16a34a" stroke-width="2" fill="none"><rect x="50" y="46" width="320" height="250" rx="8"/></g>
  <text x="62" y="66" font-size="11.5" font-weight="700" fill="#0f766e">U</text>
  <g stroke="#0d9488" stroke-width="2.4" fill="#fef3c7" fill-opacity="0.45">
    <circle cx="160" cy="170" r="72"/><circle cx="260" cy="170" r="72"/>
  </g>
  <text x="112" y="174" font-size="13" font-weight="700" fill="#0f766e">A</text>
  <text x="308" y="174" font-size="13" font-weight="700" fill="#0f766e">B</text>
  <text x="108" y="126" font-size="10" font-weight="700" fill="#166534">A alone: +1</text>
  <text x="262" y="126" font-size="10" font-weight="700" fill="#166534">B alone: +1</text>
  <text x="164" y="238" font-size="10" font-weight="700" fill="#ea580c" text-anchor="middle">overlap: +1 +1 −1 = +1</text>
  <text x="210" y="284" font-size="10" fill="#0f766e" text-anchor="middle">n(A ∪ B) = n(A) + n(B) − n(A ∩ B)</text>
  <g stroke="#16a34a" stroke-width="2" fill="none"><rect x="410" y="46" width="290" height="250" rx="8"/></g>
  <text x="422" y="66" font-size="11.5" font-weight="700" fill="#0f766e">U</text>
  <g stroke="#0d9488" stroke-width="2.2" fill="#fef3c7" fill-opacity="0.4">
    <circle cx="500" cy="150" r="64"/><circle cx="590" cy="150" r="64"/><circle cx="545" cy="218" r="64"/>
  </g>
  <text x="452" y="112" font-size="12" font-weight="700" fill="#0f766e">A</text>
  <text x="632" y="112" font-size="12" font-weight="700" fill="#0f766e">B</text>
  <text x="545" y="262" font-size="12" font-weight="700" fill="#0f766e">C</text>
  <g font-size="9.5" font-weight="700" fill="#166534">
    <text x="446" y="146">A only: +1</text>
    <text x="612" y="146">B only: +1</text>
    <text x="520" y="128">A∩B: +2−1</text>
    <text x="554" y="201">B∩C: +2−1</text>
    <text x="470" y="190">A∩C: +2−1</text>
  </g>
  <text x="548" y="172" font-size="9.5" font-weight="700" fill="#ea580c">A∩B∩C:</text>
  <text x="548" y="183" font-size="9.5" font-weight="700" fill="#ea580c">+3−3+1 = +1</text>
  <!-- Q3 QA: "C only: +1" re-seated fully inside the C-only region (below the
       B∩C lens, above the big C letter) so it no longer straddles B's arc -->
  <text x="545" y="238" font-size="9.5" font-weight="700" fill="#166534" text-anchor="middle">C only: +1</text>
  <text x="555" y="284" font-size="10" fill="#0f766e" text-anchor="middle">singles in, pairs out, the triple back in — alternation to the end</text>
  <text x="360" y="318" font-size="10" text-anchor="middle" fill="#0f766e">a point in exactly k of the sets is counted C(k,1) − C(k,2) + ⋯ times = exactly once — the alternating binomial collapse</text>
</svg>`
}

/**
 * l6-R.ts — Advanced Algebra chapter 6, lesson 6.R
 * "Unit 6 Completion Review" (id
 * aa-counting-permutations-combinations-unit-6-review — the LIVE 3.R/4.R/5.R
 * convention aa-{chapter-slug}-unit-{n}-review; the master plan's
 * 'aa-counting-unit-6-review' pin was LOOSE and the live convention WINS:
 * aa-classical-inequalities-unit-4-review, aa-complex-numbers-unit-3-review,
 * aa-sequences-and-series-unit-5-review — chapter 6's book.ts slug is
 * 'counting-permutations-combinations', so THIS id follows; grep-verified 0
 * hits across src/data/library/ at authoring time — pinned permanent and
 * globally unique).
 *
 * AUTHORED 2026-11-20 by the ch-06 parallel swarm (owner chat directive
 * 2026-11-18, honored a third time; agent Task 6-g, the review wave). Ground:
 * the six banked sibling lessons 6.1–6.6 (their module ground cengage-m2-07,
 * studied never reproduced) + the master plan §2's 6.R row — the decision map,
 * the master count table, the witnesses re-audited, the consolidated laws, the
 * traps, the 15-question mixed bench and the Probability handoff NAMED.
 * STUDY-NEVER-REPRODUCE: every roster, witness, number, figure, quiz item and
 * exercise below is OUR OWN, and every number that overlaps a sibling's arc
 * was reconciled against that sibling's pinned engine (v6-1 … v6-6) BEFORE
 * this prose was declared done; every NEW number is brute-forced in THIS
 * lesson's own engine v6-R.ts (sections M/N) and flagged M-NEW in its header.
 *
 * NOTE FOR THE ORCHESTRATOR AT PASTE TIME: swap the types import path above
 * to the ch-06.ts in-file form
 * `import type { Chapter, Lesson } from '../../../types'` (or join the
 * existing import) — the object shape below is otherwise the exact ch-04.ts
 * lessonReview4 shape, exported here as `lessonReview6` per the master plan's
 * §2 naming (lesson61 … lesson66 + lessonReview6).
 *
 * Run record (pinned by run-6R.ts green — TOTAL 128/128): engine sections
 * M (the brute-force engines, 94 checks — every number in this review
 * recomputed: the roman roster, both master tables' witnesses, all six
 * re-audited witnesses, the one-roster and one-panel mixed exhibits, every
 * trap's witness, every quiz key and every distractor's failure number, and
 * every bench answer) + N (the structural pins, 34 checks). Quiz keys
 * [1, 0, 3, 0, 1]; 15 exercises L1–L6 = 2/2/3/3/3/2 — the MIXED bench,
 * graded by shapes with every arc covered at least thrice: the 6.1 arcs
 * priced by L1#1, L2#2 and L4#3; the 6.2 arcs by L1#2, L2#1 and L5#1; the
 * 6.3 arcs by L2#1, L2#2, L4#2 and L6#2; the 6.4 arcs by L3#1, L4#1, L6#1
 * and L6#2; the 6.5 arcs by L2#2, L3#3, L4#2, L5#3 and L6#2; the 6.6 arcs
 * by L3#2, L4#3, L5#2 and L6#2; 2 original SVG figures (the decision map; the one-roster reunion)
 * on the vivid palette only; 8 Illustrations (the six witnesses re-audited +
 * one roster through six engines + the exam-shaped one-panel-four-engines
 * capstone); 3 recall-style derivations (the two rules and their five
 * divides; every count is a set count; the small-case census); 6 tagged
 * equations; 9 formula cards; 9 terms; 2 master tables (the count census +
 * the decision map); honest authored word count 11,257 (≥ the 4,000 review
 * floor, pinned by engine check N14) — the exact figure printed by the
 * runner. Sources: banked keys only + cengage-m2-07 (the module key the
 * orchestrator banks at close).
 */
const lessonReview6: Lesson = {
  id: 'aa-counting-permutations-combinations-unit-6-review',
  number: '6.R',
  title: 'Unit 6 Completion Review',
  concepts: [
    'the arc of the chapter: six engines, one room — the principle, the toolkit, the arrangement, the circle, the selection and the puzzle room',
    'the decision map: AND or OR, repetition or not, order or not, alike or distinct, line or circle, flip or no flip, groups or persons, empty allowed or not',
    'the master count table: one row per count — its question, its formula, its verified witness and its trap',
    'the one discipline behind every formula: the multiplication rule plus honest divides, each divide a count of stamps sharing one object',
    'the outcome-set ground of chapter 1: a count is the size of a set of outcomes, and every divide is a quotient of a set',
    'the mixed bench: examination items that price several engines in one exhibit — the way the hall prices a chapter',
    'the Probability handoff: favourable selections over total selections — the counted universe this chapter hands over',
  ],
  objectives: [
    'hold the whole chapter in one hand — the wiring of its six engines, the promises made early and cashed late (the divide-by-two 6.1 seeded, 6.5 cashed; the complement 6.1 planted, 6.4 and 6.6 grew; the nCr algebra 6.2 built, 6.5 re-read as selection facts), and where each master count row lives.',
    'run the decision map\u2019s questions in order — does a stage spend its option, does order matter, are the objects alike, is the seating round or flippable, groups or persons, empty allowed or not — and reach for the engine the answers point at, at examination speed.',
    'recall the consolidated laws and the master count table without re-deriving them — each formula, its validity seat and its trap — and rebuild any of them from the multiplication rule plus its divides when memory fails.',
    'solve mixed items that price several engines in one exhibit, and diagnose every miss back to its home lesson by the shape it wore.',
    'state the chapter\u2019s honest boundaries — what the school canon (NCERT class 11 chapter 6) and the competitive canon (the JEE unit list, Hall & Knight, Khattar\u2019s aptitude batteries) share, what is deferred to chapter 7\u2019s binomial theorem and the Combinatorics shelf, and the Probability ground this chapter hands over as favourable selections over total selections.',
  ],
  prerequisites: [
    'aa-the-fundamental-principle-of-counting',
    'aa-factorials-and-the-counting-toolkit',
    'aa-permutations-the-arrangement-count',
    'aa-circular-and-restricted-permutations',
    'aa-combinations-the-selection-count',
    'aa-distributions-and-the-classic-counting-puzzles',
  ],
  sources: [
    'cengage-m2-07',
    'cengage-jee-style',
    'ncert-math11-ch6-permutations-combinations',
    'jee-main-2026-syllabus',
    'hall-knight-higher-algebra',
    'khattar-qa-4e',
    'openstax-college-algebra',
  ],
  blocks: [
    { kind: 'para', text: 'Chapter 1 taught this book to see a pairing as an object — a set of ordered pairs, countable like anything else. This chapter spent six lessons turning that freedom into an exact science: counting done with theorems, not tallies. Lesson 6.1, "The Fundamental Principle of Counting", proved the two rules everything else rides on — multiply along a chain of independent choices, add across disjoint forks, and repair the forks that overlap. Lesson 6.2, "Factorials and the Counting Toolkit", compressed the shrinking chains into bookkeeping — the factorial, its two unwinding fractions, the false laws refuted, the primes audited inside. Lesson 6.3, "Permutations: the Arrangement Count", named the filled-seats chain $^{n}P_{r}$, priced alike objects by the overcount division, and climbed the dictionary ladder. Lesson 6.4, "Circular and Restricted Permutations", moved the seats to the round table — the unwrap divide $(n-1)!$ — and to the flippable cord — the necklace divide $(n-1)!/2$. Lesson 6.5, "Combinations: the Selection Count", priced the order divide $^{n}C_{r} = \\,^{n}P_{r}/r!$ and the in/out censuses $2^{n}$ and $2^{n} - 1$. Lesson 6.6, "Distributions and the Classic Counting Puzzles", opened the room where every engine interlocks — identical stocks, groups and persons, bars in gaps, inclusion–exclusion, the derangement $D(4) = 9$ listed by hand. The room is now walked.' },
    { kind: 'para', text: 'A review in this book does two things and refuses a third. It RE-MAPS the chapter — the arc from the two rules to the puzzle room, the promises made early and cashed late (the honest divide-by-two of 6.1\u2019s diagonal count, named forward and cashed as 6.5\u2019s order divide; the complement seed of 6.1, planted and grown into 6.4\u2019s never-together subtractions and 6.6\u2019s derangement; the $2^{n}$ per-object census 6.5 built, re-read by 6.6 against identical copies where it stops doubling), and the one master count table that reunites the chapter\u2019s whole formula family with the decision map that routes a question to its engine. And it runs a MIXED census: the witnesses below deliberately price several engines in one exhibit, and the fifteen-question bench prices several storeys per item, because that is exactly how an examination prices a chapter — one machine arrives, and every reading the chapter owns is asked of it in turn. What the review refuses: re-proving what the lessons already proved. Every derivation below is one line of recall with a pointer to its lesson; nothing is re-derived that 6.1 through 6.6 established once. The engines re-ran every number on this page — and reconciled them against the six siblings\u2019 own pinned engines — before a word of it was written.' },
    { kind: 'para', text: 'The map first, then the tables, then the witnesses, then the laws, then the traps, then the mixed bench. Read the decision diagram once before the exercises and once after: the second reading should look shorter.' },

    { kind: 'heading', text: 'The Arc: Six Engines, One Room' },
    { kind: 'para', text: 'Storey one (6.1, "The Fundamental Principle of Counting") built the gear the whole room turns on: the multiplication rule PROVED by repetition — $n$ added to itself $m$ times, block by block, on the outcome set itself — not recited as a slogan; the addition rule for disjoint forks with the overlap repair $|X \\cup Y| = |X| + |Y| - |X \\cap Y|$ when arms share outcomes; the repetition divide asked BEFORE any number is written (the free chain $n^{k}$ against the shrinking chain $n(n-1)\\cdots$); the outcome-set formalization on chapter 1\u2019s set-of-pairs ground; and the small-case census installed as the chapter\u2019s standing law — list sizes 2 and 3 before trusting any formula. Storey two (6.2, "Factorials and the Counting Toolkit") taught the bookkeeping those chains kept producing: the recursion $n! = n \\cdot (n-1)!$ anchored at the empty product $0! = 1$; the two unwinding fractions $\\tfrac{n!}{r!}$ (the top $n - r$ factors) and $\\tfrac{n!}{(n-r)!}$ (the top $r$ factors); the three false factorial laws each killed by a tiny witness; Legendre\u2019s exponent-of-prime census $E_{p}(n!) = \\sum \\lfloor n/p^{i} \\rfloor$ with the composite honesty of the min rule; and the $^{n}C_{r}$ fraction\u2019s algebraic property stack — the teaser fold 6.5 would re-read as selection facts.' },
    { kind: 'para', text: 'Storey three (6.3, "Permutations: the Arrangement Count") named the arrangement: $r$ vacant places filled in $n, n-1, \\ldots, n-r+1$ ways, closed by 6.1\u2019s multiplication rule and compressed by 6.2\u2019s second fraction into $\\tfrac{n!}{(n-r)!}$ — derived, never memorized; the with-repetition census $n^{r}$ told apart at a glance; the overcount division $\\tfrac{n!}{p!\\,q!\\cdots}$ for alike objects, stamped and divided; and the dictionary-rank ladder, rank = 1 + the words-before count, priced seat by seat. Storey four (6.4, "Circular and Restricted Permutations") priced restriction and rotation: the bundle method (bind, arrange the shortened roster, price the internal order $r!$) and the gap method (seat the free, count the gaps, place the restricted); the shift argument proving the circle count $(n-1)!$ — each circular arrangement unwraps into exactly $n$ linear ones; the observation-side argument for the necklace divide $(n-1)!/2$, paid by flippable objects only — necklaces, garlands, keyrings — never by tables with an observable clockwise side; and alternation at round tables by gaps and subtractions.' },
    { kind: 'para', text: 'Storey five (6.5, "Combinations: the Selection Count") priced the one thing order cannot see: the selection $^{n}C_{r}$, derived from $^{n}P_{r}$ by the two-step split — every arrangement is a selection followed by an ordering of the cast, so the arrangement count divides by $r!$; 6.2\u2019s algebra re-read as selection facts (symmetry as the choose-is-reject bijection, Pascal\u2019s identity as the in/out split on one marked object); the mirror discipline $^{n}C_{x} = {}^{n}C_{y}$ forcing $x = y$ or $x + y = n$; the two censuses $2^{n}$ and $2^{n} - 1$; and the selection-then-arrangement words $^{n}C_{r} \\cdot r!$. Storey six (6.6, "Distributions and the Classic Counting Puzzles") opened the puzzle room: the identical licence — a selection from $n$ identical objects is decided by how many, so $n + 1$ seats; division and distribution of distinct objects into groups and hands, with the equal-size $\\div k!$ honesty and the persons $\\times k!$ charge; the bars-in-gaps counts $\\tbinom{n+r-1}{r-1}$ and $\\tbinom{n-1}{r-1}$ priced as equations in non-negative and positive unknowns; the series method riding chapter 7\u2019s any-index binomial doorstep (named, never cashed); inclusion–exclusion built from the two-set Venn census and cashed into the onto count; and the derangement $D(n) = n!\\sum (-1)^{k}/k!$ with $D(4) = 9$ exhibited by hand.' },
    { kind: 'para', text: 'And under all six storeys, one ground: the outcome set — chapter 1\u2019s "Relations: the Set-of-Pairs View", cited by 6.1 and never re-taught since. A count is the cardinality of a set of outcomes: a chain\u2019s outcomes form a cartesian product, a disjoint fork\u2019s a union, and every divide in the chapter is a quotient of a set — a collapsing of stamps onto the one object they share. On that ground stands the chapter\u2019s own discipline, the SMALL-CASE CENSUS: list the cases at size 2 or 3 and compare against the formula before trusting it, because the census catches every wrong model the formulas can invite — the addition fraud, the repetition mix-up, the independence failure, the identical misread, the forgotten divide. Arithmetic and Number Systems stands under two storeys besides: 4.2\u2019s fundamental theorem of arithmetic carries 6.2\u2019s prime audits, and 4.3\u2019s divisor census $\\tau(2^{4} \\cdot 3^{6}) = 35$ is the identical-selection licence in costume — both cited by their lessons, never re-taught here.' },
    { kind: 'para', text: 'For example, the whole map in one roster — each row a shape, an engine, and a verdict this review\u2019s engines re-ran (and reconciled against the home lesson\u2019s own engine) before the prose was fixed:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) choices joined by AND → the multiplication rule (6.1): one of 4 starters, one of 6 mains, one of 3 desserts gives $4 \\times 6 \\times 3 = 72$ set menus;',
      '(ii) alternatives joined by OR that overlap → the repair (6.1): 6 thrillers, 9 comedies, 2 double-listed give $6 + 9 - 2 = 13$ distinct films;',
      '(iii) a shrinking chain → the factorial fractions (6.2): $\\tfrac{8!}{5!} = 6 \\cdot 7 \\cdot 8 = 336$ and $\\tfrac{8!}{3!} = 6720$ — the same chain, two window lengths;',
      '(iv) r distinct seats, order priced → the arrangement (6.3): the podium $^{8}P_{3} = 8 \\cdot 7 \\cdot 6 = 336$;',
      '(v) alike objects on the roster → the overcount division (6.3): TOMATO carries $\\tfrac{6!}{2!\\,2!} = 180$ distinct arrangements;',
      '(vi) seats at a round table → the circle divide (6.4): seven delegates seat in $6! = 720$ ways;',
      '(vii) beads on a flippable cord → the necklace divide (6.4): nine beads string into $\\tfrac{8!}{2} = 20160$ necklaces;',
      '(viii) order ignored → the selection (6.5): $^{8}C_{3} = 56$, the divide $\\tfrac{336}{3!}$ cashed;',
      '(ix) the in/out census (6.5): zero-or-more from six different objects runs to $2^{6} = 64$ selections, at least one to $63$;',
      '(x) an identical stock → the seats census (6.6): five sweets, two children — $6$ distributions, the literal $x = 0, \\ldots, 5$;',
      '(xi) equal groups → the k-factorial honesty (6.6): six distinct coins into three equal pairs give $15$ divisions, not $90$;',
      '(xii) none correct → the derangement (6.6): $D(4) = 9$, four letters into four wrong envelopes.',
    ] },
    { kind: 'figure', caption: 'The decision map of the counting room: five questions asked in order — does a stage spend its option, does order matter, are the objects alike, is the seating round or flippable, groups or persons and empty allowed or not — route any counting question to one of the six engine boxes (the principle, the toolkit, the arrangement, the circle, the selection, the puzzle room). Under all six boxes runs the ground bar: a count is the size of a set of outcomes, and the small-case census — list the cases at size 2 or 3 before trusting any formula — is the guard the whole chapter stands on. Name the shape first; reach for the engine second.', svg: decisionMapSvg() },
    { kind: 'callout', tone: 'definition', title: 'The six engines of the counting room', text: 'The chapter\u2019s architecture, stated once as a definition. An ENGINE of this chapter is one machine that prices a family of counts: (i) the PRINCIPLE engine — the multiplication rule for AND-chains and the addition rule for disjoint OR-forks (6.1); (ii) the BOOKKEEPING engine — the factorial, its two fractions, its prime audits (6.2); (iii) the ARRANGEMENT engine — $^{n}P_{r}$, the alike division, the dictionary rank (6.3); (iv) the CIRCLE engine — the unwrap divide, the gap and bundle methods, the necklace flip (6.4); (v) the SELECTION engine — $^{n}C_{r}$, its property stack, the two censuses (6.5); (vi) the PUZZLE engine — identical licences, distributions, bars in gaps, inclusion–exclusion, derangements (6.6). Thus every counting question the chapter answers is two questions in disguise: which shape is this, and which engine owns that shape.' },
    { kind: 'derivation', title: 'The two rules and their five divides', statement: 'Every formula of the chapter is the multiplication rule of 6.1 plus honest divides — recalled here one line at a time, each with its pointer, nothing re-derived.', steps: [
      { label: 'The two rules, recalled', formula: 'm_1 \\times m_2 \\times \\cdots \\times m_k; \\qquad |X \\cup Y| = |X| + |Y| - |X \\cap Y|', explanation: 'Lesson 6.1 proved the multiplication rule by repetition — $n$ added to itself $m$ times over the outcome set\u2019s partition blocks — and the addition rule by disjoint union, with the overlap repair priced on the cinema listings. Every count below is these two rules in costume.' },
      { label: 'The order divide', formula: '^{n}C_{r} = \\dfrac{^{n}P_{r}}{r!}', explanation: 'Lesson 6.5\u2019s two-step split: every arrangement is a selection followed by an ordering of the cast, and each cast of $r$ distinct objects carries exactly $r!$ orderings — so the arrangement count divided by the stamp count $r!$ is the selection count. The divide-by-two that 6.1\u2019s diagonal witness seeded, cashed at full strength.' },
      { label: 'The alike divide', formula: '\\dfrac{n!}{p!\\,q!\\cdots}', explanation: 'Lesson 6.3\u2019s overcount argument: stamp the twins distinct, arrange all $n$ stamped objects ($n!$), then collapse — each honest arrangement carries $p!\\,q!\\cdots$ stampings, because the stamps on one of the alike letters can be permuted freely. The honest exhibit {G, O, O} listed by hand: $\\tfrac{3!}{2!} = 3$.' },
      { label: 'The circle divide', formula: '\\dfrac{n!}{n} = (n-1)!', explanation: 'Lesson 6.4\u2019s shift argument: each circular seating unwraps into exactly $n$ linear rows (start the reading at each of the $n$ diners in turn), so the $n!$ rows collapse by the factor $n$. The census guard at $n = 3$: $6$ rows collapse to $2$ circles.' },
      { label: 'The flip divide', formula: '\\dfrac{(n-1)!}{2} \\quad (n \\geq 3)', explanation: 'Lesson 6.4\u2019s observation-side argument: a necklace seen from the other side is the same necklace, and for $n \\geq 3$ each necklace class carries exactly $2$ circle classes — so the flippable objects halve the circle count. Tables with an observable clockwise side never pay it; at $n = 2$ the flip is the circle itself.' },
      { label: 'The equal-size divide', formula: '\\dfrac{m!}{x_1!\\,x_2!\\cdots x_k!} \\;\\div\\; k! \\quad (\\text{equal sizes, groups}), \\qquad \\times k! \\quad (\\text{persons})', explanation: 'Lesson 6.6\u2019s honesty: into GROUPS (unlabelled piles) of equal size, the labelled count divides by $k!$ — the six-coin table, $90$ labelled splits collapsing to $15$; into PERSONS (named hands) it multiplies by the group order instead. The one question — groups or persons — is a whole factor of $k!$ wide.' },
    ], result: '$\\text{two rules}$ — the chain and the fork; $\\qquad$ $\\text{five divides}$ — order, alike, circle, flip, equal-size; $\\qquad$ $\\text{every formula in the room}$ — one multiplication rule honestly divided' },
    { kind: 'derivation', title: 'Every count is a set count', statement: 'The ground the whole room stands on, recalled from 6.1 and chapter 1: a count is the cardinality of a set of outcomes, and every divide in the chapter is a quotient of a set.', steps: [
      { label: 'Name the outcome set', formula: '\\Omega \\; \\text{with} \\; |\\Omega| \\; \\text{the count}', explanation: 'Chapter 1\u2019s "Relations: the Set-of-Pairs View", cited by 6.1 and never re-taught: before any number is written, say what one outcome IS — a menu, a journey, a seating, a distribution — and the count is the size of that set.' },
      { label: 'A chain is a product', formula: '\\Omega = S_1 \\times S_2 \\times \\cdots \\times S_k', explanation: 'An AND-chain\u2019s outcomes are tuples — one choice per stage — so the multiplication rule is the product cardinality of a cartesian product, and the proof by blocks of $n$ is a partition of exactly this set.' },
      { label: 'A fork is a union', formula: '\\Omega = X \\sqcup Y \\;\\; \\text{or} \\;\\; X \\cup Y', explanation: 'An OR-fork\u2019s outcomes come from two families; disjoint arms make the union\u2019s size the sum, shared outcomes make the overlap repair the honest price — 6.1\u2019s two exhibits in set language.' },
      { label: 'Every divide is a quotient', formula: '\\left| \\tfrac{\\Omega}{\\sim} \\right| = \\dfrac{|\\Omega|}{|\\text{class}|}', explanation: 'When outcomes group into equivalence classes all of one size — the $r!$ orderings of one cast, the $p!\\,q!$ stampings of one word, the $n$ unwrappings of one seating, the $k!$ labelings of one equal split — the count of honest objects is the quotient. That single sentence is the whole formula family of this chapter.' },
      { label: 'The census reads the set', formula: '|\\Omega| \\; \\text{listed literally at} \\; n = 2, 3', explanation: 'The small-case census is the set-count discipline made operational: list the outcomes at tiny scale and compare with the formula — a wrong model is caught before it is priced, which is why every lesson of this chapter ran one before trusting a single symbol.' },
    ], result: '$|\\Omega|$ — a count is a set\u2019s size; $\\qquad$ $\\Omega = S_1 \\times \\cdots \\times S_k$ — chains are products; $\\qquad$ $X \\cup Y$ — forks are unions; $\\qquad$ every divide — a quotient by equal classes' },
    { kind: 'derivation', title: 'The small-case census, one last sweep', statement: 'The wrong-model catcher the chapter installed at 6.1 and closed with at 6.6 — its five standing catchers, each one line of recall with its pinned witness.', steps: [
      { label: 'The two-sweet catcher', formula: '2 \\; \\text{identical} \\to 3; \\qquad 2 \\; \\text{distinct} \\to 4', explanation: '6.6\u2019s opening roster: two identical sweets to two children make three distributions ($x = 0, 1, 2$), two DISTINCT sweets make four (each child independently in or out, $2^2$) — one tiny roster that separates an entire engine, the identical licence against the distinct census.' },
      { label: 'The taken-two catcher', formula: '\\{1,2,3\\}: \\; 6 \\; \\text{arrangements}, \\; 3 \\; \\text{selections}', explanation: '6.3\u2019s census: three objects taken two at a time give $12, 13, 21, 23, 31, 32$ — six arrangements, three selections — the fastest check of whether order is priced or ignored, and the exact seat where the order divide lives.' },
      { label: 'The circle catcher', formula: 'n = 3: \\; 6 \\to 2 \\; \\text{circles} \\to 1 \\; \\text{necklace}', explanation: '6.4\u2019s guard: at a three-seat table the $3! = 6$ rows collapse to $2$ circular seatings and, on a cord, to $1$ necklace — the divides $\\div 3$ and $\\div 2$ seen in miniature before any formula is trusted at scale.' },
      { label: 'The repetition catcher', formula: '4^{3} = 64 \\; \\text{vs} \\; ^{4}P_{3} = 24', explanation: '6.3\u2019s pair: three seats over four options with repetition free give $64$ fillings; forced distinct give $24$ — one census that prices the repetition question before the chain is multiplied.' },
      { label: 'The wrong-envelope catcher', formula: 'D(4) = 9 \\; \\text{of} \\; 4! = 24', explanation: '6.6\u2019s hand list: four letters into four wrong envelopes number exactly $9$ — listed before the alternating formula was believed, and the fraction $\\tfrac{9}{24} = 0.375$ is the drift Probability inherits \u2014 hovering near three-eighths, the value the derangement table approaches.' },
    ], result: 'the census — five catchers, one discipline: $\\text{list at } n = 2, 3$ before trusting any formula; $\\qquad$ every wrong model caught before it is priced' },
    { kind: 'equation', latex: 'm_1 \\times m_2 \\times \\cdots \\times m_k \\quad \\text{(AND chains)}; \\qquad |X \\cup Y| = |X| + |Y| - |X \\cap Y| \\quad \\text{(OR forks)} \\tag{1}', note: 'the two rules every formula in the chapter rides on — 6.1\u2019s multiplication rule and addition rule, with the overlap repair; proved once, recalled ever after.' },

    { kind: 'heading', text: 'The Master Tables Reunited' },
    { kind: 'para', text: 'Strip the chapter of its prose and two tables remain — the two the examinations actually price. The first is the master census of the count family: one row per count, the statement in one line, when to reach for it, and the trap that haunts it. The second is the decision map proper — the table of questions that routes the shape you face to the engine that owns it, each row carrying a witness re-run from the lesson that banked it. Both were engine-swept again before this page was written: every row below is a verdict the review\u2019s engines re-ran against the six lessons\u2019 own exhibits — and reconciled against their pinned engines — not a memory transcribed.' },
    { kind: 'table', caption: 'The count family in one census — one row per count of the chapter: the statement, when to reach for it, and the trap that haunts it. Every row cross-checked against its home lesson by the review\u2019s engines before this prose was written.', head: ['Engine (lesson)', 'The statement, one line', 'When to reach for it', 'The classic trap'], rows: [
      ['the multiplication rule (6.1)', '$m_1 m_2 \\cdots m_k$ ways for an AND-chain of independent stages', 'outfits, journeys, codes, answer sheets', 'stages not independent — the count of continuations drifts'],
      ['the addition rule (6.1)', 'disjoint arms add: $m + n$; shared outcomes repaired: $|X| + |Y| - |X \\cap Y|$', 'EITHER/OR alternatives, one of several families', 'non-disjoint arms added raw ($6+9 = 15$ against the honest $13$)'],
      ['with repetition (6.1/6.3)', '$n^{r}$: each of $r$ seats free over $n$ options', 'codes, signals, answer sheets that may repeat', 'pasted onto without-repetition questions ($4^{3} = 64$ against $^{4}P_{3} = 24$)'],
      ['the arrangement (6.3)', '$^{n}P_{r} = n(n-1)\\cdots(n-r+1) = \\tfrac{n!}{(n-r)!}$', '$r$ distinct seats, distinct objects, order priced', 'used where a selection is due ($336$ against $56$)'],
      ['alike arrangements (6.3)', '$\\tfrac{n!}{p!\\,q!\\cdots}$: stamps collapsed', 'words and codes with repeated letters', 'the division forgotten ($12$ against $6$ at four letters, two pairs)'],
      ['the circle (6.4)', '$(n-1)!$: each seating unwraps $n$ ways', 'round tables, one observable side', 'the unwrap $\\div n$ forgotten ($40320$ against $5040$)'],
      ['the necklace (6.4)', '$(n-1)!/2$ for $n \\geq 3$: flip collapse', 'necklaces, garlands, keyrings, bracelets', 'the flip $\\div 2$ forgotten ($120$ against $60$); tables never pay it'],
      ['the selection (6.5)', '$^{n}C_{r} = \\tfrac{n!}{r!(n-r)!} = \\tfrac{^{n}P_{r}}{r!}$', 'order ignored, distinct objects', 'the arrangement pasted in ($3024$ against $126$)'],
      ['the censuses (6.5)', '$2^{n}$ zero-or-more; $2^{n} - 1$ at least one', 'in/out per object, any number taken', 'the empty selection mishandled ($64$ against $63$)'],
      ['identical selection (6.6)', '$n + 1$ seats (zero-or-more); mixed $(p+1)(q+1)\\cdots 2^{k}$', 'interchangeable stock — the datum is how many', 'identical treated as distinct ($2$ against $3$ at $n = 2$)'],
      ['distinct division (6.6)', '$\\tfrac{m!}{x_1! x_2! \\cdots x_k!}$ into groups; $\\div k!$ on equal sizes; $\\times k!$ to persons', 'splitting a distinct set into piles or hands', 'the equal-size divide forgotten ($90$ against $15$)'],
      ['identical distribution (6.6)', '$\\tbinom{n+r-1}{r-1}$ empty allowed; $\\tbinom{n-1}{r-1}$ not', 'bars in gaps; equations in unknowns', 'the empty licence swapped ($28$ against $10$ on the sweets)'],
      ['onto, by PIE (6.6)', '$r^{n} - \\tbinom{r}{1}(r-1)^{n} + \\cdots$', 'distinct to persons, none empty', 'a sign dropped ($1180$ against $1560$)'],
      ['the derangement (6.6)', '$D(n) = n! \\sum (-1)^{k}/k!$', 'none correct — envelopes, hats', 'the complement side reported ($24 - 9 = 15$ against $D(4) = 9$)'],
    ] },
    { kind: 'table', caption: 'The decision map — the questions asked in order route the shape you face to the engine that owns it, every witness re-run by the review\u2019s engines from the lesson that banked it. The last row is the ground the whole room stands on.', head: ['The shape you face', 'The question to ask', 'The engine that owns it', 'A verified witness'], rows: [
      ['choices joined by AND', 'may a stage reuse a spent option?', 'the multiplication rule (6.1): $n^{r}$ free, $n(n-1)\\cdots$ shrinking', 'the answer sheet $4^{6} = 4096$; the display row $7 \\cdot 6 \\cdot 5 = 210$'],
      ['alternatives joined by OR', 'do the arms share outcomes?', 'the addition rule (6.1)', 'the exits $2 + 4 = 6$; the listings $6 + 9 - 2 = 13$'],
      ['$r$ seats filled from $n$ distinct objects', 'does order matter? does a seat spend?', '$^{n}P_{r}$ (6.3), or $n^{r}$ if repetition is free (6.1)', 'the podium $336$; the licence plate $650 \\cdot 504 = 327600$'],
      ['alike objects on a roster', 'which letters repeat?', 'the overcount division (6.3)', 'TOMATO $\\tfrac{6!}{2!\\,2!} = 180$'],
      ['seats around a round table', 'is there an observable side?', 'the circle divide (6.4)', 'seven delegates $6! = 720$'],
      ['beads on a cord', 'can it be flipped over?', 'the necklace divide (6.4)', 'nine beads $\\tfrac{8!}{2} = 20160$'],
      ['a cast chosen, order ignored', 'in or out, per object?', '$^{n}C_{r}$ (6.5)', 'the committee $\\tfrac{336}{3!} = 56$'],
      ['any number taken, of each', 'are the objects distinct?', 'the censuses (6.5/6.6)', 'the camper $2^{6} = 64$; the borrower $2^{7} - 1 = 127$; the drawer $(4+1)(6+1)2^{5} = 1120$'],
      ['objects into groups', 'are the objects distinct? sizes fixed? equal?', 'division (6.6), $\\div k!$ on equal sizes', 'six coins into three pairs: $15 = \\tfrac{90}{3!}$'],
      ['objects into hands', 'groups (unlabelled) or persons (named)?', 'distribution (6.6), $\\times k!$ to persons', 'the posters: $126$ divisions, $252$ distributions'],
      ['identical objects into boxes', 'are empty boxes allowed?', 'bars in gaps (6.6)', 'the sweets $6 = \\tbinom{6}{1}$; the oranges $56 = \\tbinom{8}{3}$'],
      ['none correct, none empty', 'complement, or inclusion–exclusion?', 'derangements / onto (6.6)', 'the mailroom $36$ of $81$; the hats $D(4) = 9$'],
    ] },
    { kind: 'callout', tone: 'theorem', title: 'The one discipline behind the tables', text: 'Every row of both tables is the same move in a different dress: PRICE THE STAGES WITH THE MULTIPLICATION RULE, THEN DIVIDE BY EVERYTHING THE QUESTION CANNOT SEE. Order cannot see the $r!$ orderings of one cast — divide by $r!$. Twin letters cannot see their $p!\\,q!$ stamps — divide by them. A round table cannot see the starting point — divide by $n$. A cord\u2019s flip cannot see the two sides — divide by $2$. Unlabelled equal groups cannot see the $k!$ labelings — divide by $k!$. Named hands CAN see them — multiply instead. And whenever the question hides something of no uniform size, the plain rules return and the census runs: case-split, add across disjoint cases, and list at size 2 or 3 before trusting the result. Proved once in its lesson, recalled in one line here — the refusal discipline working for you as a map.' },
    { kind: 'callout', tone: 'insight', title: 'Which table answers which question', text: 'The working rule the chapter earned, stated once for the room: under examination pressure read the DECISION MAP first — run its questions in order (AND or OR, repetition, order, alike, round or flippable, groups or persons, empty allowed or not), then pull the census row for the statement and the trap, then run. The map is the diagnosis instrument too: a missed item names its engine by the shape it wore, which is why the bench below is graded by MIXED shapes, not by lesson — the hall does not label its items by lesson either.' },

    { kind: 'heading', text: 'The Witnesses, Re-Audited' },
    { kind: 'para', text: 'Six exhibits carried the chapter\u2019s weight — one anchored in each storey — and a review earns its keep by re-auditing them TOGETHER: each is re-run below in the review\u2019s own words, every number re-computed by the engines and reconciled against the home lesson\u2019s pinned engine before a word of this prose was fixed, and each now prices more than the storey that introduced it. Two mixed exhibits close the section: one roster taken through six engines, and one panel priced by four engines plus the probability read — the handoff itself.' },
    { kind: 'example', title: 'The principle witness re-audited: journeys, doors and the answer-sheet family', steps: [
      'The two exhibits of 6.1, re-priced: three trails and four roads give $3 \\times 4 = 12$ two-leg journeys — an AND-chain, the multiplication rule; two north doors and four south doors give $2 + 4 = 6$ exits — a disjoint OR-fork, the addition rule; and the one-word hinge between the answers is AND against EITHER.',
      'The three-stage menu: one of 4 starters, one of 6 mains, one of 3 desserts — $4 \\times 6 \\times 3 = 72$ set menus, the chain form of the rule with each stage independent.',
      'The answer-sheet family, swept whole: six questions over four options give $4^{6} = 4096$ patterns with repetition free; the no-two-consecutive-alike variant prices at $4 \\times 3^{5} = 972$; and the at-least-one-TRUE read is the complement: $2^{6} - 1 = 63$ of the $64$ true/false sheets carry at least one TRUE.',
      'The code family, the chapter\u2019s first exam shape: five symbols over six digits give $6^{5} = 7776$ codes with repetition, $6 \\times 5 \\times 4 \\times 3 \\times 2 = 720$ all-distinct, and $7776 - 720 = 7056$ with at least one repeat — the complement cashed at the very first lesson, a seed 6.4 and 6.6 grew into never-together subtractions and derangements.',
      'Hence the principle room\u2019s whole census on one plate: the two rules, their repetition divide, and the complement — every later engine in the chapter is one of these three moves wearing a formula.',
    ] },
    { kind: 'example', title: 'The bookkeeping witness re-audited: the factorial roster, the two fractions and the primes inside', steps: [
      'The roster every later lesson leans on, re-run: $0! = 1$, $1! = 1$, $2! = 2$, $3! = 6$, $4! = 24$, $5! = 120$, $6! = 720$, $7! = 5040$ — one recursion anchored at the empty product — and the audit roster $10! = 3628800 = 2^{8} \\cdot 3^{4} \\cdot 5^{2} \\cdot 7$.',
      'The two fractions, window lengths on the one chain: $\\tfrac{8!}{5!} = 6 \\cdot 7 \\cdot 8 = 336$ (the top $8 - 5 = 3$ factors) and $\\tfrac{8!}{3!} = 6720$ (the top $5$) — count factors before multiplying, never expand $40320$ by hand.',
      'The false laws, killed by their witnesses once and forever: $(3+4)! = 5040$ against $3! + 4! = 30$ — the sum law fails by a factor of $168$; the multiplication law and the scalar law fail the same way on their own tiny witnesses, and the structural reason is honest: the true count\u2019s factors keep climbing.',
      'Legendre\u2019s census, re-run: $E_{2}(10!) = 5 + 2 + 1 = 8$; $E_{3}(50!) = 16 + 5 + 1 = 22$ with $E_{2}(50!) = 47$; the largest power of $6$ in $24!$ is $\\min(22, 10) = 10$ — the min rule the naive $\\lfloor 24/6 \\rfloor = 4$ undersells; and $45!$ ends in exactly $10$ zeros.',
      'The teaser fold\u2019s arithmetic, re-read: $^{8}C_{3} = \\tfrac{8!}{3!\\,5!} = 56$, and the row of ten peaks at $^{10}C_{5} = 252$ — the fraction 6.2 defined as algebra and 6.5 re-read as the selection count.',
      'Hence the bookkeeping room\u2019s census: one recursion, two windows, three dead false laws, one prime census with its min rule, and the $^{n}C_{r}$ fraction handed forward — the compressed arithmetic the other five storeys call by name.',
    ] },
    { kind: 'example', title: 'The arrangement witness re-audited: the podium, the recovery and the dictionary ladder', steps: [
      'The podium, re-derived both ways: gold, silver, bronze from eight sprinters — the chain $8 \\cdot 7 \\cdot 6 = 336$, and the compression $\\tfrac{8!}{(8-3)!} = \\tfrac{8!}{5!}$ returning exactly the chain.',
      'The recovery read: if $^{8}P_{r} = 6720$, match consecutive descending factors — $6720 = 8 \\cdot 7 \\cdot 6 \\cdot 5 \\cdot 4$ is five factors, so $r = 5$; the chain, never the formula, does the diagnosis.',
      'The overcount division: TOMATO carries $\\tfrac{6!}{2!\\,2!} = 180$ distinct arrangements — each honest word carrying its $2! \\cdot 2! = 4$ stampings — and the never-together side is the complement: $60$ contain the block OO, $180 - 60 = 120$ do not.',
      'The dictionary ladder, re-run at three seats: rank(WHALE) $= 110$ (the ladder $96 + 12 + 1 = 109$ words before it), rank(PEPPER) $= 26$ (the rungs $20 + 3 + 2 = 25$), rank(KNEEL) $= 34$ — the rungs $24 + 6 + 3 = 33$, where the honest count caught the hand-slip $31$ that missed a between-letter\u2019s continuations.',
      'Hence the arrangement room\u2019s census: the vacant-places chain, its factorial compression, the alike division with its stamps, and the rank ladder — order priced at every seat, and every number above re-swept by the engines against 6.3\u2019s own pins.',
    ] },
    { kind: 'example', title: 'The circle witness re-audited: the guards, the summit table and the necklace census', steps: [
      'The census guards, re-listed before any formula: at $n = 3$ the $6$ rows collapse to $2$ circles and $1$ necklace; at $n = 4$, $24 \\to 6 \\to 3$; at $n = 5$, $120 \\to 24 \\to 12$ — the unwrap factor $n$ and the flip factor $2$ seen literally, table-sized.',
      'The round table: seven delegates seat in $\\tfrac{7!}{7} = 6! = 720$ ways — the shift argument\u2019s verdict; and a seating IGNORES exactly the starting point.',
      'The subtraction read in the round: eight diners, two particular never neighbours — total $7! = 5040$, together $2 \\cdot 6! = 1440$, never $5040 - 1440 = 3600$ — the complement of 6.1 cashed at the circle.',
      'The flippable census: nine beads string into $\\tfrac{(9-1)!}{2} = 20160$ necklaces — the observation-side divide — while nine SEATS at a table would price at $8! = 40320$: the flip is paid by cords, never by tables.',
      'The alternation contrast, one roster both shapes: four men and four women alternate at a round table in $3! \\cdot 4! = 144$ seatings, but in a ROW in $2 \\cdot 4! \\cdot 4! = 1152$ lineups — the row has two gender frames, the circle has none.',
      'Hence the round room\u2019s census: two divides ($\\div n$, then $\\div 2$ for the flippable), the gap and bundle methods for restrictions, and the subtraction read — every number re-swept against 6.4\u2019s literal censuses.',
    ] },
    { kind: 'example', title: 'The selection witness re-audited: the four-roster, the censuses and the panel read', steps: [
      'The smallest honest exhibit, re-listed: the two-selections of $\\{a, b, c, d\\}$ are exactly $ab, ac, ad, bc, bd, cd$ — six selections, $12$ ordered pairs, the divide $\\div 2!$ — the whole selection engine in one roster.',
      'The divide at scale: $^{8}C_{3} = 56$, the chain $8 \\cdot 7 \\cdot 6 = 336$ divided by the $3! = 6$ orderings each cast carries — select, then arrange, the two-step split read backwards.',
      'The censuses, re-swept: the camper\u2019s $2^{6} = 64$ loads (zero or more of six items), split exactly in half by the marked lantern — $32$ in, $32$ out; the borrower\u2019s $2^{7} - 1 = 127$ non-empty selections; the comics-and-atlases chain $(2^{4} - 1)(2^{2} - 1) = 45$.',
      'The mirror hunt, re-read: at most three of nine films gives $1 + 9 + 36 + 84 = 130$ lists — and at least six gives the SAME $130$ by the complementary row halves, the equality discipline\u2019s finest hour.',
      'The panel read — the handoff itself, re-audited: a three-person panel from nine classmates totals $^{9}C_{3} = 84$ equally likely selections; panels containing the captain number $^{8}C_{2} = 28$; the chance is $\\tfrac{28}{84} = \\tfrac{1}{3}$ — FAVOURABLE selections over TOTAL selections, the counted universe handed to Probability.',
      'Hence the selection room\u2019s census: the order divide, the two censuses with their complement, the mirror discipline, and the probability read — every number re-swept against 6.5\u2019s literal enumerations.',
    ] },
    { kind: 'example', title: 'The puzzle-room witness re-audited: two sweets, one drawer, equal pairs and wrong envelopes', steps: [
      'The opening roster, re-priced: two identical sweets to two children make $3$ distributions ($x = 0, 1, 2$) — two DISTINCT sweets make $4$ — the identical licence against the distinct census, one line apart.',
      'The mixed drawer: four spare and six filters of one type each plus five distinct tools — $(4+1)(6+1) \\cdot 2^{5} = 1120$ zero-or-more selections, $1119$ at least one — and the divisor reread rides beside it: $\\tau(2^{4} \\cdot 3^{6}) = 35$, Arithmetic and Number Systems 4.3\u2019s census cited, never re-taught.',
      'The equal-size honesty: six distinct coins into three equal pairs — $90$ labelled splits collapse to $15$ true divisions, the $\\div 3!$ the unlabelled piles cannot see; to three NAMED children the count multiplies back.',
      'The bars and gaps: five identical sweets to two children give $6 = \\tbinom{5+2-1}{1}$ distributions; nine identical oranges to four children, none empty, give $\\tbinom{8}{3} = 56$ — the empty licence priced on both sides.',
      'The two closers: four letters to three mailboxes none empty — $3^{4} - \\tbinom{3}{1}2^{4} + \\tbinom{3}{2}1^{4} = 81 - 48 + 3 = 36$ onto postings of the $81$; and four letters into four wrong envelopes — $D(4) = 9$, with the drift $\\tfrac{9}{24} = 0.375$.',
      'Hence the puzzle room\u2019s census: the identical licence, the division and distribution engine with its $\\div k!$ and $\\times k!$ forks, the bars-in-gaps pair, the onto count and the derangement — every number re-swept against 6.6\u2019s literal assignment and permutation censuses.',
    ] },
    { kind: 'figure', caption: 'The reunion roster: one shelf of six distinct books taken through the chapter\u2019s engines, every count on one axis. Three display seats with repetition free price at 6 cubed = 216; the same seats forced distinct price at 6P3 = 120; the selection of three books is C(6,3) = 20 — and 20 times 3! = 120 is the arrangement again, the order divide drawn as a bar. The full-length shelf orders run to 6! = 720; the round-table seating collapses to (6 − 1)! = 120; the necklace of the six books halves again to 60; and the in/out census of the whole shelf — every subset of books, any size — prices at 2 to the 6 = 64, which is a freedom about the SET, not the seats. Two different questions share the number 120 — the engines tell them apart.', svg: reunionRosterSvg() },
    { kind: 'example', title: 'One roster, six engines: a shelf of six distinct books through the whole chapter', steps: [
      'The free chain (6.1): three display seats, each free to show any of the six books — $6^{3} = 216$ displays, repetition allowed.',
      'The arrangement (6.3): the same three seats forced distinct — $^{6}P_{3} = 6 \\cdot 5 \\cdot 4 = 120$ displays, the shrinking chain 6.2 compressed.',
      'The selection (6.5): which three books go on display, order ignored — $^{6}C_{3} = 20$ casts — and the split reconciles the two engines: $20 \\cdot 3! = 120 = \\,^{6}P_{3}$, each cast carrying its six orderings.',
      'The full length (6.3): all six books on the shelf in a row — $6! = 720$ orders, the chain at full width.',
      'The circle and the cord (6.4): the six books passed round a reading circle seat in $(6-1)! = 120$ ways — the unwrap divide — and strung as a flippable garland in $\\tfrac{120}{2} = 60$ ways — the flip divide on top of it.',
      'The census (6.5): every subset of the shelf, any size — $2^{6} = 64$ selections — a freedom about the SET of books, not about any seats: the same roster, and the engine chosen decides the answer.',
      'Hence one roster, six verdicts — $216, 120, 20, 720, 120, 60, 64$ — and the decision map\u2019s questions (repetition? order? round? flip? in/out?) are the only things that changed between them.',
    ] },
    { kind: 'example', title: 'Exam-style: one panel, four engines and the handoff — from 4 scientists and 5 artists, a three-person panel', steps: [
      'The total (6.5): any three of the nine people — $^{9}C_{3} = 84$ panels, the order divide $\\tfrac{9 \\cdot 8 \\cdot 7}{3!}$ cashed.',
      'The two-group read (6.5): exactly two scientists and one artist — $^{4}C_{2} \\cdot {}^{5}C_{1} = 6 \\cdot 5 = 30$ panels, the multiplication rule of 6.1 joining two selection counts.',
      'The complement read (6.1\u2019s seed, 6.5\u2019s cash): at least one scientist — total minus the all-artist panels: $84 - {}^{5}C_{3} = 84 - 10 = 74$ panels.',
      'The arrangement read (6.3): the panel stands in a photo row — $84 \\cdot 3! = 504 = \\,^{9}P_{3}$ rows, the split run forwards.',
      'The handoff (Probability, NAMED): the panel is drawn at random — the denominator is the $84$ equally likely selections; the chance it contains the senior scientist is $\\tfrac{28}{84} = \\tfrac{1}{3}$, the favourable $^{8}C_{2} = 28$ over the total — favourable selections over total selections, the ground this chapter hands over.',
      'Hence five verdicts, five engines, one roster — $84, 30, 74, 504, \\tfrac{1}{3}$ — the chapter priced at examination speed, and the inheritor named at the close.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'How the witnesses interlock', text: 'The eight exhibits are not eight problems — they are the chapter wearing eight costumes. The principle witness\u2019s complement is the circle witness\u2019s never-together subtraction and the puzzle room\u2019s onto count; the bookkeeping witness\u2019s second fraction IS the arrangement witness\u2019s compression; the arrangement witness\u2019s overcount division is the puzzle room\u2019s equal-size divide with the stamps relabelled; the selection witness\u2019s order divide is the one-roster exhibit\u2019s $20 \\times 6 = 120$; the circle\u2019s two divides are the puzzle room\u2019s $\\div k!$ in rotation; and the panel witness is the whole room cashed into one fraction — favourable over total. The hall\u2019s mixed items run exactly this game: hand you one machine and bill you for several storeys at once — and the diagnosis runs the same direction, a miss on a mixed item naming its home lesson by its shape.' },

    { kind: 'heading', text: 'The Laws Worth Recalling' },
    { kind: 'para', text: 'The chapter deposited its formula shelf lesson by lesson — the two rules in 6.1, the factorial algebra in 6.2, the arrangement family in 6.3, the circle pair in 6.4, the selection family and its censuses in 6.5, the distribution and puzzle counts in 6.6 — and the reader\u2019s formula-sheet page aggregates them automatically. Eight of them are load-bearing: the consolidated laws the next chapters will actually reach for, each re-verified by the review\u2019s engines before this page was written. The laws in display, the cards, then the vocabulary:' },
    { kind: 'equation', latex: '^{n}P_{r} = n(n-1)\\cdots(n-r+1) = \\dfrac{n!}{(n-r)!}, \\qquad n^{r} \\quad \\text{(repetition free)} \\tag{2}', note: 'the arrangement count beside its with-repetition twin — derived from the vacant places, compressed by 6.2; the census pair $4^{3} = 64$ against $^{4}P_{3} = 24$ tells them apart.' },
    { kind: 'equation', latex: '\\dfrac{n!}{p!\\,q!\\cdots} \\quad \\text{(alike)}; \\qquad (n-1)! \\quad \\text{(circle)}; \\qquad \\dfrac{(n-1)!}{2} \\quad (n \\geq 3, \\text{ flippable}) \\tag{3}', note: 'the three structural divides — stamps, unwrap, flip — each a count of copies sharing one honest object; the guards $6 \\to 2 \\to 1$ at $n = 3$ price all three literally.' },
    { kind: 'equation', latex: '^{n}C_{r} = \\dfrac{n!}{r!(n-r)!} = \\dfrac{^{n}P_{r}}{r!}, \\qquad ^{n}C_{r} = {}^{n}C_{n-r} \\tag{4}', note: 'the selection count and its symmetry — the order divide and the choose-is-reject bijection; the mirror discipline $x = y$ or $x + y = n$ behind every row equality.' },
    { kind: 'equation', latex: '2^{n} \\quad \\text{zero-or-more}; \\qquad 2^{n} - 1 \\quad \\text{at least one}; \\qquad n + 1 \\quad \\text{from } n \\text{ identical} \\tag{5}', note: 'the three censuses — per-object in/out, its complement, and the identical licence; the camper\u2019s $64$, the borrower\u2019s $127$, the two-sweet roster\u2019s $3$ are their standing witnesses.' },
    { kind: 'equation', latex: '\\dbinom{n+r-1}{r-1} \\;\\; (\\text{empty allowed}), \\qquad \\dbinom{n-1}{r-1} \\;\\; (\\text{not}), \\qquad \\dfrac{m!}{x_1! x_2! \\cdots x_k!} \\;\\; (\\text{division}), \\qquad D(n) = n! \\sum_{k=0}^{n} \\dfrac{(-1)^{k}}{k!} \\tag{6}', note: 'the puzzle room\u2019s four counts — bars in gaps on both sides of the empty licence, the distinct division with its equal-size $\\div k!$ fork, and the derangement; onto rides the same alternating signs ($r^n - \\tbinom{r}{1}(r-1)^n + \\cdots$).' },
    { kind: 'formula', name: 'The two rules of the principle', latex: 'm_1 \\times m_2 \\times \\cdots \\times m_k \\quad \\text{(AND)}; \\qquad m + n \\quad \\text{(disjoint OR)}; \\qquad |X \\cup Y| = |X| + |Y| - |X \\cap Y| \\quad \\text{(overlap)}', note: 'the chapter\u2019s atoms — chains multiply stage by stage, disjoint forks add, and overlapping forks return their shared outcomes once (6.1; the listings $6 + 9 - 2 = 13$).' },
    { kind: 'formula', name: 'The factorial toolkit', latex: 'n! = n \\cdot (n-1)!, \\quad 0! = 1; \\qquad \\dfrac{n!}{r!} = (r+1) \\cdots n \\;\\; (n-r \\text{ factors}), \\qquad \\dfrac{n!}{(n-r)!} = n \\cdots (n-r+1) \\;\\; (r \\text{ factors})', note: 'the recursion with its empty-product anchor and the two unwinding fractions — count factors before multiplying (6.2; $\\tfrac{8!}{5!} = 336$, $\\tfrac{8!}{3!} = 6720$).' },
    { kind: 'formula', name: 'The arrangement family', latex: '^{n}P_{r} = \\dfrac{n!}{(n-r)!}; \\qquad \\dfrac{n!}{p!\\,q!\\cdots} \\;\\; (\\text{alike}); \\qquad \\text{rank} = 1 + (\\text{words before})', note: 'the vacant-places chain compressed, the overcount division for alike objects, and the dictionary ladder — never memorized, rebuilt from the seats (6.3; the podium $336$, TOMATO $180$).' },
    { kind: 'formula', name: 'The circle and the necklace', latex: '(n-1)! \\quad \\text{(round table)}; \\qquad \\dfrac{(n-1)!}{2} \\quad (n \\geq 3, \\text{ flippable}); \\qquad \\text{bundle } r! \\;\\text{ and gaps}, \\qquad (n-r+1) \\;\\; \\text{in a row}', note: 'the unwrap divide, the flip divide paid only by flippable objects, and the two restriction engines — bundle the always-together, gap the never-together (6.4; $720$, $20160$).' },
    { kind: 'formula', name: 'The selection count and its divides', latex: '^{n}C_{r} = \\dfrac{n!}{r!(n-r)!} = \\dfrac{^{n}P_{r}}{r!}; \\qquad ^{n}C_{r} \\cdot r! = \\,^{n}P_{r}; \\qquad ^{n}C_{x} = {}^{n}C_{y} \\iff x = y \\;\\text{or}\\; x + y = n', note: 'select then arrange, in both directions, with the mirror discipline every row equality runs on (6.5; $336 = 56 \\cdot 6$, the committee $56$).' },
    { kind: 'formula', name: 'The three censuses', latex: '2^{n} \\;\\; \\text{(zero-or-more distinct)}, \\qquad 2^{n} - 1 \\;\\; \\text{(at least one)}, \\qquad (p+1)(q+1)\\cdots 2^{k} \\;\\; \\text{(mixed stock)}', note: 'the per-object in/out census, its complement, and the mixed licence where identical types contribute seats and distinct objects factors of two (6.5/6.6; $64$, $127$, $1120$).' },
    { kind: 'formula', name: 'Division and distribution of distinct objects', latex: '\\dfrac{m!}{x_1!\\,x_2!\\cdots x_k!} \\;\\; (\\text{labelled sizes}); \\qquad \\div k! \\;\\; (\\text{equal sizes, groups}); \\qquad \\times k! \\;\\; (\\text{persons}); \\qquad r^{n} \\;\\; (\\text{sizes free})', note: 'the division engine with its two forks — unlabelled equal groups divide by $k!$, named hands multiply by it — and the free-size census (6.6; $90 \\to 15$, $126 \\to 252$).' },
    { kind: 'formula', name: 'Identical objects into boxes', latex: '\\dbinom{n+r-1}{r-1} \\quad (\\text{empty allowed}); \\qquad \\dbinom{n-1}{r-1} \\quad (\\text{not allowed}); \\qquad \\text{floors: } \\dbinom{n+r-1 - r \\cdot f}{r-1}', note: 'bars in gaps on both sides of the empty licence, with the floor shift for at-least-$f$ boxes — the equation reads $x_1 + \\cdots + x_r = n$ (6.6; $6$ sweets, $56$ oranges).' },
    { kind: 'formula', name: 'The alternating pair: onto and derangement', latex: '\\text{onto}(n, r) = r^{n} - \\dbinom{r}{1}(r-1)^{n} + \\dbinom{r}{2}(r-2)^{n} - \\cdots; \\qquad D(n) = n! \\sum_{k=0}^{n} \\dfrac{(-1)^{k}}{k!}', note: 'inclusion–exclusion cashed twice — none empty by the onto signs, none correct by the derangement sum; $D(4) = 9$ of $24$, and the drift $\\tfrac{D(n)}{n!} \\to \\tfrac{1}{e}$ rides beside (6.6).' },
    { kind: 'terms', items: [
      { term: 'The decision map', def: 'the table of questions asked in order — does a stage spend its option, does order matter, are the objects alike, is the seating round or flippable, groups or persons, empty allowed or not — that routes any counting question to the engine that owns it.' },
      { term: 'The mixed census', def: 'the review\u2019s discipline of pricing several engines in one exhibit — the way an examination actually prices a chapter: one machine arrives, and every reading the chapter owns is asked of it in turn.' },
      { term: 'The order divide', def: 'the move $\\tfrac{^{n}P_{r}}{r!} = {}^{n}C_{r}$ — every arrangement is a selection plus an ordering of the cast, so each cast of $r$ carries exactly $r!$ orderings and the honest count divides by them; the bridge between 6.3 and 6.5.' },
      { term: 'The repetition divide', def: 'the first question of every chain — may a stage reuse a spent option? — with the free chain $n^{r}$ against the shrinking chain $n(n-1)\\cdots$; pasted onto the wrong side it is the chapter\u2019s oldest fraud.' },
      { term: 'The unwrap divide', def: 'the circle count $(n-1)!$ — each circular seating unwraps into exactly $n$ linear rows, so the $n!$ rows collapse by $n$; a seating ignores exactly the starting point.' },
      { term: 'The flip divide', def: 'the necklace count $\\tfrac{(n-1)!}{2}$ for $n \\geq 3$ — a cord seen from the other side is the same necklace, so flippable objects (necklaces, garlands, keyrings, bracelets) halve the circle count; tables with an observable clockwise side never pay it.' },
      { term: 'The small-case census', def: 'the chapter\u2019s standing law — list the outcomes at size 2 or 3 and compare with the formula before trusting it; the wrong-model catcher that caught every fraud in this review\u2019s trap shelf at miniature scale.' },
      { term: 'The identical licence', def: 'a selection from $n$ identical objects is decided by how many — the seats $0, 1, \\ldots, n$ price it at $n + 1$ — because interchangeable objects carry no in/out identity; the divisor census of ANS 4.3 is this licence in costume.' },
      { term: 'The probability handoff', def: 'favourable selections over total selections — the counted universe this chapter builds is exactly the ground Probability inherits; every denominator of every probability to come is a count audited like these.' },
    ] },

    { kind: 'heading', text: 'The Traps the Hall Sets' },
    { kind: 'para', text: 'The chapter\u2019s own caution shelf, compressed to the seven traps the examination hall actually sets — each is one lesson\u2019s discipline pointed at one wrong instinct, each is cross-checkable against that lesson\u2019s own caution box, and every witness number was re-run by the review\u2019s engines:' },
    { kind: 'list', items: [
      'An arrangement priced where a selection is due (6.3/6.5): a committee of three from eight is $56$ selections, a podium of three from eight is $336$ orders — and the hall\u2019s misprint offers $9 \\cdot 8 \\cdot 7 \\cdot 6 = 3024$ for the four-seat committee that should be $\\tbinom{9}{4} = 126$. Ask FIRST whether swapping two chosen objects changes the outcome; the taken-two census ($6$ against $3$) answers in one line.',
      'The repetition mix-up (6.1/6.3): $4^{3} = 64$ prices three seats that may repeat, $^{4}P_{3} = 24$ the same seats forced distinct — and the six-question sheet forced to carry six different marks prices at $4 \\times 3 \\times 2 \\times 1 \\times 0 \\times 0 = 0$, impossible, the stock runs dry. Say aloud which chain you are in before multiplying anything.',
      'The circle unwrap forgotten (6.4): eight diners seat in $7! = 5040$ circles, not $8! = 40320$ rows — the shift argument divides by exactly $n$; the census guard at $n = 3$ ($6 \\to 2$) catches the fraud at a table you can list by hand.',
      'The necklace flip forgotten — or paid twice (6.4): a cord of six different charms carries $\\tfrac{5!}{2} = 60$ classes, not $120$; a twelve-bead necklace carries $\\tfrac{11!}{2} = 19958400$, not $11! = 39916800$. And the reverse fraud: a TABLE halved to $8!/2$ answers a question nobody asked — the flip is paid by cords only, and $n = 2$ is the honest edge where the flip is the circle.',
      'The equal-size divide forgotten, the persons charge skipped (6.6): six coins into three equal pairs give $15$ divisions, not the $90$ labelled splits — the unlabelled piles cannot see their $3!$ labelings; and to three named children the count multiplies back by the group order, because named hands CAN see it. Groups or persons is a whole factor of $k!$ wide.',
      'Identical treated as distinct (6.6): two identical sweets to two children make $3$ distributions, not $4$; at scale, $(5+1)(4+1) - 1 = 29$ selections of at least one from five pens and four markers of one type each — not the $5 \\cdot 4 = 20$ a distinct misread offers. The datum is HOW MANY, never WHICH.',
      'The empty-group licence and the onto signs (6.6): six identical sweets to three children allow empties in $\\tbinom{8}{2} = 28$ ways and forbid them in $\\tbinom{5}{2} = 10$ — one licence, two counts, the bars move; and the onto count\u2019s alternating signs drop one sign and $4096 - 2916 = 1180$ masquerades as the honest $1560$. The derangement\u2019s own trap: $24 - 9 = 15$ is the AT-LEAST-one-correct side, not $D(4) = 9$ itself.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The one warning that carries forward', text: 'A count without its model named is a guess — and the chapter\u2019s engines are now load-bearing for the rest of this book. Chapter 7\u2019s binomial theorem reads every coefficient as a selection count $\\tbinom{n}{r}$, its induction certifies the identities this chapter priced by algebra, and the any-index binomial — the $(1-x)^{-n}$ coefficient law 6.6 named — is built on the bars-and-gaps census banked here. Probability inherits the whole room: every denominator it will ever price is a count audited exactly like these. Carry the decision map\u2019s questions into all three — they are the one habit every later chapter prices, and the one the hall never stops testing.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — the honest coverage audit', text: 'The audit, stated once for the whole chapter: the JEE (Main) 2026 mathematics unit list carries permutations and combinations as its own unit — unit 4 of the banked syllabus audit — so this review\u2019s ground is real exam territory, honestly labelled. The school canon is NCERT class 11 chapter 6, "Permutations and Combinations", whose arc this chapter walked storey by storey; the classic stretch is Hall & Knight\u2019s permutations chapter, which opens identically — the fundamental principle first, the two great counts after; the aptitude side rides the Khattar QA batteries, which price the same censuses numerically (outfit counts, code counts, signal counts, divisor counts); OpenStax\u2019s College Algebra places this ground beside probability in its own sequencing. The registers the six lessons drilled, re-priced by this bench: the 6.1 chain-and-fork staples and at-least-one complements, the 6.2 exponent-of-prime and trailing-zero items (the Numerical-Value shape), the 6.3 rank and licence-plate arrangement items, the 6.4 circle, necklace and never-together subtractions, the 6.5 mirror-hunt equations and census hunts, the 6.6 distribution and onto items — with the module\u2019s own typology (Single Correct, Multiple Correct, Linked Comprehension, Matrix Match, Numerical Value) mirrored by the bench\u2019s L4–L6 sets. The items in this review are exam-style — our own constructions on those registers, honestly labelled; no past-paper text is reproduced, and every number above was generated and verified by this book\u2019s own engines.' },
    { kind: 'callout', tone: 'historical', title: 'The family gathered', text: 'The counting room this chapter built was gathered once, in one tradition\u2019s arc: Leibniz\u2019s 1666 Dissertatio de arte combinatoria proposed that reasoning itself might reduce to a calculus of combinations; Pascal and Fermat, in their 1654 letters on the division of an interrupted game, founded probability by counting outcomes of exactly the kind this chapter counts — the fundamental principle doing probability\u2019s arithmetic before probability had a name; Pascal\u2019s own 1654 Trait\u00e9 du triangle arithmétique printed the rows whose in/out split 6.5 proved (a staircase Pingala\u2019s Chandahsutra had climbed centuries earlier, counting metrical patterns long or short — in or out); and Montmort\u2019s 1708 Essai d\u2019analyse sur les jeux de hazard priced the matching problem whose derangement $D(4) = 9$ this chapter listed by hand. The chapter walked in six lessons and one review what the canon gathered over three centuries; every attribution above was web-checked by the sibling lessons\u2019 research runs before it was written, and the handoff — Probability, the inheritor — is the arc\u2019s own ending: the counted universe was always being built for someone else\u2019s numerators.' },

    { kind: 'heading', text: 'The Chapter Closes' },
    { kind: 'para', text: 'And so the chapter closes. Chapter 1 handed this book the set-of-pairs view; the book returned a counting room: six engines that price selections, arrangements, circles, cords, groups and wrong envelopes without one tally listed at scale — the principle, the toolkit, the arrangement, the circle, the selection and the puzzle room, every formula derived from the multiplication rule plus honest divides, every divide a count of stamps sharing one object, every model caught by a census at size 2 or 3 before it was priced. What began as "how many two-leg journeys" ends as a decision made in seconds: AND or OR — the principle; does order matter — $^{n}P_{r}$ or $^{n}C_{r}$; alike or distinct — the stamps divide or the census doubles; round or flippable — $\\div n$, then $\\div 2$; groups or persons — $\\div k!$ or $\\times k!$; empty allowed or not — the bars move; and none correct — the derangement. The honest map of what was named but deferred: chapter 7 "Induction and the Binomial Theorem" reads every $\\tbinom{n}{r}$ as a selection count and builds the any-index binomial whose doorstep 6.6 named; the Combinatorics shelf book recalls this whole chapter at depth — bijections, generating functions past the humble geometric string, inclusion–exclusion at full generality — as its first chapters\u2019 ground, no lesson ids existing there yet; and Probability inherits everything: the counted universe IS its denominators. All named, none cashed early.' },
    { kind: 'para', text: 'Use the review honestly and it will diagnose you. Attempt the mixed bench WITHOUT looking back at the lessons; every miss names its home lesson by its shape — an added fork or a drifting stage sends you to 6.1, a false factorial law or a missed prime audit to 6.2, a mispriced rank or a forgotten stamp to 6.3, a forgotten unwrap or flip to 6.4, an arrangement where a selection was due or a mishandled empty selection to 6.5, an identical misread or a dropped sign to 6.6. The five quiz questions price five engines — one panel count, one prime audit, one cord, one licence, one derangement; the bench takes the rest. Score them honestly, revisit exactly what the misses name, and the room is yours — and when Probability arrives to divide your counts, you will recognise the denominators: you built them.' },

    { kind: 'quiz', title: 'Check yourself — the chapter in five questions', items: [
      { q: 'From 9 people, a chair, a vice-chair and a secretary are named (three DIFFERENT posts). The number of slates is:', options: ['$84$', '$504$', '$28$', '$729$'], answer: 1, explain: 'Three distinct posts price ORDER — the vacant-places chain: $9 \\times 8 \\times 7 = 504 = {}^{9}P_{3}$ (option B). Option A\u2019s $84 = {}^{9}C_{3}$ prices the committee-shaped question (same three people, no posts) — the selection pasted where the arrangement is due, the chapter\u2019s oldest fraud; the taken-two census ($6$ against $3$) catches it in one line. Option C\u2019s $28 = {}^{8}C_{2}$ is the favourable-count from the panel\u2019s probability read — a numerator without its posts. Option D\u2019s $729 = 3^{6}$ pastes a with-repetition power onto a without-repetition chain — and with the wrong base and exponent at that: three posts over nine people, not six seats over three options.' },
      { q: 'The exponent of the prime 3 in 20! (that is, the largest $k$ with $3^{k}$ dividing $20!$) is:', options: ['$8$', '$6$', '$18$', '$3$'], answer: 0, explain: 'Legendre\u2019s census: $E_{3}(20!) = \\lfloor 20/3 \\rfloor + \\lfloor 20/9 \\rfloor = 6 + 2 = 8$ (option A) — each multiple of 3 donates one 3, each multiple of 9 a second, and $27 > 20$ stops the ladder. Option B\u2019s $6$ is the first floor alone — the census quit after the multiples of 3 and missed the double donors. Option C\u2019s $18$ is $E_{2}(20!)$ — the two-side\u2019s exponent pasted onto the three-question; the min rule would need BOTH sides anyway. Option D\u2019s $3 = \\lfloor 20/6 \\rfloor$ is the composite misread — counting multiples of 6, which undersells by the very structure the Legendre census repairs (at $24!$ the naive $\\lfloor 24/6 \\rfloor = 4$ against the honest $\\min(22, 10) = 10$).' },
      { q: 'Six different charms are strung on a bracelet that may be turned over. The number of distinct bracelets is:', options: ['$120$', '$720$', '$24$', '$60$'], answer: 3, explain: 'The cord pays BOTH divides: $6! = 720$ rows collapse by the unwrap $\\div 6$ to $(6-1)! = 120$ circles, and the flippable bracelet halves again — $\\tfrac{120}{2} = 60$ (option D). Option A\u2019s $120$ forgets the flip — the count of a cord you may NOT turn over (or a table\u2019s seatings); Option B\u2019s $720 = 6!$ forgets both divides — the linear row count; Option C\u2019s $24 = 4!$ divides once by an unwritten $30$ — no honest route produces it. The census guard prices the whole ladder literally at $n = 3$: $6 \\to 2 \\to 1$.' },
      { q: 'Six identical sweets are handed to three children; a child may receive none. The number of distributions is:', options: ['$28$', '$10$', '$56$', '$729$'], answer: 0, explain: 'Identical objects into boxes with empties ALLOWED: bars in gaps — $\\tbinom{6 + 3 - 1}{3 - 1} = \\tbinom{8}{2} = 28$ (option A), the equation read $x + y + z = 6$ in non-negative integers. Option B\u2019s $10 = \\tbinom{5}{2}$ is the EMPTY-NOT-ALLOWED model — the licence swapped, one bar moved; the two-sweets roster catches the swap in miniature ($3$ distributions with empties allowed, only $1$ with none empty). Option C\u2019s $56 = \\tbinom{8}{3}$ invents a fourth bar — or swaps the roles of sweets and children in the formula. Option D\u2019s $729 = 3^{6}$ prices the DISTINCT-object assignment — each sweet choosing its child; identical sweets have no such identity, the datum is HOW MANY each child gets.' },
      { q: 'Five guests retrieve five hats at random. The number of ways NOBODY gets the correct hat is:', options: ['$120$', '$44$', '$76$', '$24$'], answer: 1, explain: 'The derangement $D(5) = 5!\\left(1 - 1 + \\tfrac{1}{2!} - \\tfrac{1}{3!} + \\tfrac{1}{4!} - \\tfrac{1}{5!}\\right) = 44$ (option B) — and the alternating sum expands honestly: $120 - 120 + 60 - 20 + 5 - 1 = 44$, which the recurrence $D(n) = n \\cdot D(n-1) + (-1)^{n}$ reconciles on the banked $D(4) = 9$: $5 \\cdot 9 - 1 = 44$. Option A\u2019s $120 = 5!$ is the raw total with the subtraction never run. Option C\u2019s $76 = 120 - 44$ reports the COMPLEMENT side — at least one correct — as if it were the none-correct count, the derangement\u2019s own standing trap. Option D\u2019s $24 = 4!$ pastes the four-guest TOTAL onto a five-guest question \u2014 the population and the count swapped together.' },
    ] },

    { kind: 'exercises', title: 'Exercises 6.R — the mixed bench', sets: [
      { level: 'L1', questions: [
        { q: 'A trek route runs from Ashvale camp to the harbour dock by way of Beacon ridge: 3 marked trails to Beacon, 4 marked roads on. A studio has 2 doors on the north wall and 4 on the south, and a visitor leaves by exactly one door. (i) Count the two-leg journeys. (ii) Count the exits. (iii) Name the rule each count uses and the one word that sits at the hinge.', solution: [
          'The journey is one trail AND one road — a chain of two stages, the second\u2019s count independent of the first.',
          'So, the multiplication rule: $3 \\times 4 = 12$ two-leg journeys — the census roster of twelve pairings listed in 6.1 itself.',
          'The exit is one door from EITHER wall — a fork of two disjoint arms (no door is on both walls), so the addition rule: $2 + 4 = 6$ exits.',
          'Hence, $12$ journeys by the multiplication rule, $6$ exits by the addition rule — and the hinge is the word joining the choices: AND multiplies, EITHER adds.',
        ], answer: '12 journeys (multiplication rule); 6 exits (addition rule); the hinge is AND against EITHER' },
        { q: 'Run the factorial roster $0!$ through $7!$; audit $10! = 3628800$ as a product of primes; then evaluate $\\tfrac{8!}{5!}$ and $\\tfrac{8!}{3!}$ by counting factors — never by expanding $40320$.', solution: [
          'The roster, anchored at the empty product: $0! = 1$, $1! = 1$, $2! = 2$, $3! = 6$, $4! = 24$, $5! = 120$, $6! = 720$, $7! = 5040$ — one recursion $n! = n(n-1)!$ all the way down.',
          'So, the audit: $10! = 3628800 = 2^{8} \\cdot 3^{4} \\cdot 5^{2} \\cdot 7$ — Legendre\u2019s census in one line ($E_{2} = 5+2+1 = 8$, $E_{3} = 3+1 = 4$, $E_{5} = 2$, $E_{7} = 1$).',
          'The first fraction: $\\tfrac{8!}{5!}$ cancels the factors 1 through 5, leaving the TOP $3$ factors — $6 \\cdot 7 \\cdot 8 = 336$.',
          'The second: $\\tfrac{8!}{3!}$ cancels 1 through 3, leaving the TOP $5$ factors — $4 \\cdot 5 \\cdot 6 \\cdot 7 \\cdot 8 = 6720$ (raw check $40320/6 = 6720$, but the factor count came first).',
          'Hence, $336$ and $6720$ — two window lengths on the one falling chain, the toolkit\u2019s two quotients cashed exactly as 6.2 built them.',
        ], answer: '1, 1, 2, 6, 24, 120, 720, 5040; 10! = 2⁸·3⁴·5²·7; 336 and 6720' },
      ] },
      { level: 'L2', questions: [
        { q: 'Eight sprinters cross a finish line; gold, silver and bronze go to three distinct runners. (i) Count the podium orders as a chain. (ii) Recover $r$ if $^{8}P_{r} = 6720$, by matching consecutive factors. (iii) Write the chain\u2019s factorial compression.', solution: [
          'The podium is three distinct seats filled without repetition: gold 8 ways, silver 7, bronze 6 — the chain $8 \\cdot 7 \\cdot 6 = 336 = {}^{8}P_{3}$.',
          'The recovery: $^{8}P_{r}$ is $r$ consecutive descending factors from 8, and $6720 = 8 \\cdot 7 \\cdot 6 \\cdot 5 \\cdot 4$ — five factors, so $r = 5$ (${}^{8}P_{5} = \\tfrac{8!}{3!} = 6720$).',
          'The compression: $^{8}P_{r} = \\tfrac{8!}{(8-r)!}$ — multiply and divide by the missing tail, the second of 6.2\u2019s two fractions cashed as a count.',
          'Hence, $336$ orders; $r = 5$; and $\\tfrac{8!}{(8-r)!}$ is the chain with bookkeeping — derived from the vacant places, never memorized.',
        ], answer: '336; r = 5; 8P_r = 8!/(8 − r)!' },
        { q: 'From the roster $\\{a, b, c, d\\}$ taken two at a time: (i) list the selections; (ii) price the ordered pairs; (iii) reconcile the two counts by the order divide. Then compute $^{8}C_{3}$ as $\\tfrac{336}{3!}$ and say which lesson owns each move.', solution: [
          'The selections, order ignored: $ab, ac, ad, bc, bd, cd$ — six two-selections, listed because the census precedes the formula.',
          'The ordered pairs: each selection carries $2! = 2$ orderings — $ab$ with $ba$, and so on — so $12$ ordered pairs, which is $^{4}P_{2} = 4 \\cdot 3 = 12$, 6.3\u2019s chain.',
          'The reconciliation: the arrangement count $12$ divided by the stamp count $2!$ returns the selection count $6$ — the order divide $\\tfrac{^{n}P_{r}}{r!} = {}^{n}C_{r}$, 6.5\u2019s two-step split read backwards.',
          'At scale: $^{8}C_{3} = \\tfrac{8 \\cdot 7 \\cdot 6}{3!} = \\tfrac{336}{6} = 56$ — the same divide with the chain 6.1 priced and 6.2\u2019s compression behind it.',
          'Hence, $6$ selections, $12$ pairs, the divide $\\div 2!$; and $56 = \\tfrac{336}{3!}$ — 6.1 owns the chain, 6.3 the arrangement, 6.5 the divide, exactly the wiring the decision map draws.',
        ], answer: '6 selections; 12 ordered pairs; ÷2!; 8C3 = 56 = 336/6' },
      ] },
      { level: 'L3', questions: [
        { q: 'Seven delegates take seats at a round table. (i) Count the seatings. (ii) Run the census guards at $n = 3$ and $n = 4$. (iii) Say exactly what a circular seating ignores, and which divide prices it.', solution: [
          'The round table: $7! = 5040$ linear rows collapse by the unwrap divide $\\div 7$ — each circular seating unwraps into exactly $7$ readings — so $\\tfrac{5040}{7} = 720 = 6!$ seatings.',
          'The guard at $n = 3$: the $3! = 6$ rows of three delegates collapse to $2$ circular seatings (clockwise from the first delegate: the two readings QR and RQ) — $\\div 3$ seen literally.',
          'The guard at $n = 4$: $4! = 24$ rows collapse to $6$ circles — $\\div 4$ again, and on a flippable cord the $6$ would halve once more to $3$ necklaces.',
          'Hence, $720$ seatings; the guards $6 \\to 2$ and $24 \\to 6$; and a circular seating ignores exactly the STARTING POINT — the shift argument\u2019s $\\div n$, 6.4\u2019s first divide, priced before the flip divide is even asked for.',
        ], answer: '720 = 6!; guards 6 → 2 and 24 → 6; a seating ignores the starting point (÷n)' },
        { q: 'Five identical sweets go to two children; nine identical oranges go to four children, none left empty-handed. Count both distributions, name both formulas, and say the one licence that separates them.', solution: [
          'The sweets, empties allowed: $x + y = 5$ in non-negative integers — bars in gaps gives $\\tbinom{5 + 2 - 1}{2 - 1} = \\tbinom{6}{1} = 6$ distributions, the literal roster $x = 0, 1, \\ldots, 5$.',
          'The oranges, empties forbidden: $x_1 + x_2 + x_3 + x_4 = 9$ in POSITIVE integers — seat one orange per child first ($9 - 4 = 5$ left), so $\\tbinom{5 + 4 - 1}{4 - 1} = \\tbinom{8}{3} = 56$ distributions.',
          'The formulas: $\\tbinom{n + r - 1}{r - 1}$ against $\\tbinom{n - 1}{r - 1}$ — the same bars-in-gaps picture with the bars moved one seat in.',
          'Hence, $6$ and $56$ — and the licence is the EMPTY GROUP: allowed moves the bars, forbidden raises the floor; identical objects never ask WHICH, only HOW MANY, so the equation read is the whole question.',
        ], answer: '6 = C(6,1); 56 = C(8,3); the empty-group licence (bars moved)' },
        { q: 'A film club holds 9 films. (i) Count the viewing plans of at most 3 films — the empty plan (no films) counts as a plan. (ii) Count the plans of at least 6 films. (iii) Reconcile the two answers through the row of nine, and name the discipline that predicted they would match.', solution: [
          'At most 3, the empty plan included: $\\tbinom{9}{0} + \\tbinom{9}{1} + \\tbinom{9}{2} + \\tbinom{9}{3} = 1 + 9 + 36 + 84 = 130$ plans — zero films is a plan.',
          'At least 6: $\\tbinom{9}{6} + \\tbinom{9}{7} + \\tbinom{9}{8} + \\tbinom{9}{9} = 84 + 36 + 9 + 1 = 130$ plans — the all-films plan rides in.',
          'The reconciliation: the row of nine is $1, 9, 36, 84, 126, 84, 36, 9, 1$ — mirror seats pair $\\tbinom{9}{k} = \\tbinom{9}{9-k}$, so the at-most-3 rungs $(9, 36, 84)$ pair with the at-least-6 rungs $(84, 36, 9)$, and the two leftover singletons settle the account: $\\tbinom{9}{0} = 1$ (the empty list, which the at-most-3 side excludes) and $\\tbinom{9}{9} = 1$ (the all-films list, which the at-least-6 side includes) — both worth exactly one, so the totals agree.',
          'Hence both sides price $130$ — the equality discipline: $\\tbinom{n}{x} = \\tbinom{n}{y}$ forces $x = y$ or $x + y = n$, and the row\u2019s mirror makes the two halves of a census agree whenever the cut sizes are complementary.',
        ], answer: '130 and 130 — the empty plan and the all-films plan both worth 1: mirror rungs of the row of nine (the equality discipline)' },
      ] },
      { level: 'L4', questions: [
        { q: 'Exam-style (Single Correct). Eight diners take seats at a round table; two particular diners refuse neighbouring seats. The number of seatings is: (A) 5040 (B) 3600 (C) 1440 (D) 1800. Find the answer with full reasoning and price every distractor.', solution: [
          'The universe: eight diners round a table — the unwrap divide gives $7! = 5040$ seatings.',
          'The bad side: the two particular diners adjacent — bind them into one bundle ($6$ objects round the table: $5!$ seatings) times the internal order $2!$: $2 \\cdot 6! = 1440$ seatings with the pair together.',
          'The complement: $5040 - 1440 = 3600$ seatings with the pair never together — option (B).',
          'The distractors: (A) $5040$ is the raw total, the at-least-one clause never run; (C) $1440$ is the subtrahend reported as the answer — the together side itself; (D) $1800$ is the halved total $\\tfrac{7!}{2}$ — a necklace divide pasted onto a table that never pays it, the flip fraud of the trap shelf.',
          'Hence (B) $3600$ — the complement cashed at the circle, with the bundle method pricing the bad side and the round-table divide pricing the total.',
        ], answer: '(B) 3600 = 7! − 2·6! (distractors: the total, the subtrahend, and a halved table)' },
        { q: 'Exam-style (Multiple Correct). Which of the following counts are computed correctly? (A) A 3-person committee from 10 people: $\\tbinom{10}{3} = 120$. (B) The distinct arrangements of TOMATO: $\\tfrac{6!}{2!\\,2!} = 180$. (C) A necklace of 9 different beads: $8! = 40320$. (D) Six distinct coins into three equal piles: $\\tfrac{6!}{(2!)^{3}} = 90$ divisions. Identify every true statement.', solution: [
          '(A) is TRUE: order ignored, distinct people — the selection count $\\tbinom{10}{3} = \\tfrac{10 \\cdot 9 \\cdot 8}{3!} = 120$, the order divide cashed (6.5).',
          '(B) is TRUE: alike letters stamped and collapsed — each honest word carries $2! \\cdot 2! = 4$ stampings, so $\\tfrac{720}{4} = 180$ (6.3\u2019s overcount division).',
          '(C) is FALSE: a cord pays BOTH divides — $8! = 40320$ is the circle count (the flip forgotten); the necklace count is $\\tfrac{8!}{2} = 20160$, the trap the bracelet census catches at $n = 6$ ($120 \\to 60$).',
          '(D) is FALSE: the unlabelled equal piles cannot see their $3!$ labelings — $\\tfrac{6!}{(2!)^{3}} = 90$ is the LABELLED split count; the honest division is $\\tfrac{90}{3!} = 15$, the equal-size honesty of the puzzle room.',
          'Hence (A) and (B) hold; (C) forgets the flip, (D) forgets the equal-size divide — two divides dropped, one on each false side.',
        ], answer: '(A) and (B) are true; (C) forgets the necklace ÷2 (20160); (D) forgets the equal-size ÷3! (15)' },
        { q: 'Exam-style (Linked Comprehension). Four different letters are posted into three different mailboxes. (i) Count all postings. (ii) Count the postings with no mailbox left empty. (iii) Count the postings with at least one mailbox empty — and say which engine priced each part.', solution: [
          '(i) Each letter independently chooses one of 3 mailboxes — the free chain of 6.1 at its purest: $3^{4} = 81$ postings, the functions-count census chapter 1 met.',
          '(ii) None empty — inclusion–exclusion\u2019s onto count: $3^{4} - \\tbinom{3}{1}2^{4} + \\tbinom{3}{2}1^{4} = 81 - 48 + 3 = 36$ postings — subtract the single-empty families, return the double-empty ones once (6.6).',
          '(iii) At least one empty — the complement inside the universe: $81 - 36 = 45$ postings — 6.1\u2019s oldest seed, total minus bad, cashed at the distribution engine.',
          'Hence $81$ by the multiplication rule, $36$ by the onto signs, $45$ by the complement — three engines on one mailroom, and the onto check reconciles: $36 + 45 = 81$ closes the account.',
        ], answer: '81; 36 (onto, 81 − 48 + 3); 45 (complement) — and 36 + 45 = 81' },
      ] },
      { level: 'L5', questions: [
        { q: 'Exam-style (Numerical Value). The exponent of the prime 7 in $50!$ (the largest $k$ with $7^{k}$ dividing $50!$) is — (integer answer). Price it by Legendre\u2019s census and verify against the naive floor read.', solution: [
          'The census: $E_{7}(50!) = \\lfloor 50/7 \\rfloor + \\lfloor 50/49 \\rfloor + \\cdots = 7 + 1 + 0 = 8$ — each multiple of 7 donates one, each multiple of 49 a second, and $7^{3} = 343 > 50$ stops the ladder.',
          'So, the answer: $8$ — the largest power of 7 dividing $50!$.',
          'The naive floor read $\\lfloor 50/7 \\rfloor = 7$ undersells by exactly the double donors — the 49 and its multiples-of-49 companion: one extra 7 from $49 = 7^{2}$ alone.',
          'Hence, $8$ — the two-line census every prime audit runs; the companion audits reconcile the same way ($E_{3}(50!) = 16 + 5 + 1 = 22$, $E_{2}(50!) = 47$).',
        ], answer: '8 (= 7 + 1; the naive ⌊50/7⌋ = 7 misses the double donor 49)' },
        { q: 'Three distinct dice are rolled and summed to 10. Count the ordered triples by the series method, and verify by the pattern census.', solution: [
          'The series method: each die contributes the string $p + p^{2} + \\cdots + p^{6}$, and the ordered triples summing to 10 are the coefficient of $p^{10}$ in $(p + \\cdots + p^{6})^{3}$ — factoring $p^{3}(1 + p + \\cdots + p^{5})^{3}$, the coefficient of $p^{7}$ in $(1 + \\cdots + p^{5})^{3}$.',
          'So, the weak compositions of 7 into 3 parts with each part at most 5: $\\tbinom{9}{2} = 36$ minus the three oversized parts (a part $\\geq 6$, i.e. $6 + $ a weak 1 into the rest after the shift: $\\tbinom{3}{1}\\tbinom{3}{2} = 9$) — $36 - 9 = 27$ ordered triples.',
          'The pattern census, listed by smallest die: $(1,3,6)$-family $6$, $(1,4,5)$-family $6$, $(2,2,6)$-family $3$, $(2,3,5)$-family $6$, $(2,4,4)$-family $3$, $(3,3,4)$-family $3$ — $6 + 6 + 3 + 6 + 3 + 3 = 27$.',
          'Hence, $27$ — the series method riding the $(1 - x)^{-n}$ coefficient law that chapter 7\u2019s any-index binomial will certify (named here as the doorstep, never cashed early).',
        ], answer: '27 ordered triples (coefficient of p¹⁰; census 6 + 6 + 3 + 6 + 3 + 3)' },
        { q: 'From 9 classmates — one of them the class captain — a 3-person panel is chosen at random. (i) Count the total selections. (ii) Count the selections containing the captain. (iii) Compute the chance. (iv) Name the read this computation hands to the next subject.', solution: [
          '(i) The total: $\\tbinom{9}{3} = 84$ equally likely selections — the denominator, 6.5\u2019s order divide at examination speed.',
          '(ii) The favourable: panels containing the captain — the captain plus any two of the other eight: $\\tbinom{8}{2} = 28$ selections.',
          '(iii) The chance: $\\tfrac{28}{84} = \\tfrac{1}{3}$ — reduce by 28, and the fraction is honest because every selection is equally likely.',
          '(iv) The read: FAVOURABLE selections over TOTAL selections — probability as a ratio of two counts, the counted universe handed over exactly as 6.5 named it at its close: every denominator Probability will ever price is a census audited like this one.',
          'Hence, $84$, $28$, $\\tfrac{1}{3}$ — the handoff itself, re-audited as the bench\u2019s closing item.',
        ], answer: '84; 28; 1/3 — favourable selections over total selections (the Probability handoff)' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove the necklace divide $(n-1)!/2$ for $n \\geq 3$ by the observation-side argument: exhibit the full census at $n = 4$ ($24$ rows, $6$ circles, $3$ necklaces), and explain the honest edge at $n = 2$.', solution: [
          'The unwrap first: $n!$ rows collapse by $\\div n$ to $(n-1)!$ circles — 6.4\u2019s shift argument, each circular seating unwrapping into exactly $n$ linear readings (one per diner as the reading\u2019s start).',
          'The flip: a necklace viewed from the other side of the cord is the SAME necklace, and for $n \\geq 3$ the mirror image of a circular arrangement is a DIFFERENT circle — clockwise order reversed — so the $(n-1)!$ circles pair off into $\\tfrac{(n-1)!}{2}$ necklace classes, each necklace carrying exactly 2 circles.',
          'The census at $n = 4$: the $4! = 24$ rows of four beads collapse to $\\tfrac{24}{4} = 6$ circles, which pair into $3$ necklaces — the mirror pairs (QRS against SRQ and their kin) visible literally in 6.4\u2019s guard table.',
          'The edge at $n = 2$: two beads on a cord — the flip reverses a 2-cycle onto itself, so the necklace count is the CIRCLE count: $\\tfrac{(2-1)!}{2}$ would be a half; honestly, $\\tfrac{1!}{1} = 1$ circle IS $1$ necklace — the divide $\\div 2$ fails exactly when the flip fixes the circle, and $n = 2$ is that seat.',
          'Hence, $\\tfrac{(n-1)!}{2}$ for $n \\geq 3$, the census $24 \\to 6 \\to 3$ at $n = 4$, and the $n = 2$ edge where the honest answer is $1$ — a divide proved by counting copies, which is the only way this chapter proves anything.',
        ], answer: 'each necklace carries exactly 2 circles for n ≥ 3; at n = 4: 24 → 6 → 3; at n = 2 the flip fixes the circle (1 necklace, no ÷2)' },
        { q: 'Prove that every divide in the chapter is a stamping count — one argument, five cashes — and audit the five pinned witnesses: (i) $^{8}P_{3} = 336 \\to \\tbinom{8}{3} = 56$; (ii) $6! \\to 180$ at TOMATO; (iii) $7! = 5040 \\to 720$ circles; (iv) $90 \\to 15$ at the six-coin equal split; (v) the one sentence that unifies all of them.', solution: [
          'The argument: build the stamped world by the multiplication rule ($M$ outcomes), find that each HONEST object carries exactly $s$ stamps — the stamps being interchangeable in every way the question cannot see — and the honest count is $\\tfrac{M}{s}$, a quotient of the outcome set by classes of equal size. Every formula in the chapter is this sentence with one stamping named.',
          '(i) The order divide: $336$ arrangements of three of eight, each CAST carrying its $3! = 6$ orderings — $\\tfrac{336}{6} = 56$ selections, 6.5\u2019s two-step split.',
          '(ii) The alike divide: $720$ stamped arrangements of TOMATO\u2019s six letters, each honest word carrying $2! \\cdot 2! = 4$ stampings — $\\tfrac{720}{4} = 180$, 6.3\u2019s overcount division.',
          '(iii) The circle divide: $5040$ rows of seven delegates, each circular seating unwrapping into its $7$ readings — $\\tfrac{5040}{7} = 720$ circles, 6.4\u2019s shift argument.',
          '(iv) The equal-size divide: $90$ labelled splits of six coins into three pairs, each unlabelled split carrying its $3! = 6$ labelings — $\\tfrac{90}{6} = 15$ divisions, 6.6\u2019s table.',
          'Hence the one sentence: EVERY FORMULA OF THIS CHAPTER IS THE MULTIPLICATION RULE DIVIDED BY THE NUMBER OF STAMPS SHARING ONE HONEST OBJECT — order stamps, twin stamps, unwrap stamps, label stamps; and when the stamps have unequal sizes, the plain rules return and the census runs. That sentence is the whole master table.',
        ], answer: 'each divide = a stamping count: 56 = 336/6, 180 = 720/4, 720 = 5040/7, 15 = 90/6 — one sentence unifies the chapter' },
      ] },
    ] },
  ],
}


/* ------------------------------------------------------------------ */
/* figures for lesson 6.R — the decision map of the counting room, and */
/* the reunion roster (one shelf of six books through every engine)    */
/* ------------------------------------------------------------------ */

function decisionMapSvg(): string {
  // five question chips (left) route to six engine boxes (right); the
  // ground bar runs underneath; arrows drawn as quadratic curves
  const questions = [
    { y: 78, q: 'does a stage spend its option?', sub: 'the free chain or the shrinking chain' },
    { y: 138, q: 'does order matter?', sub: 'arrangement or selection' },
    { y: 198, q: 'are the objects alike?', sub: 'identical or distinct' },
    { y: 258, q: 'is the seating round or flippable?', sub: 'line, circle, or cord' },
    { y: 318, q: 'groups or persons? empty allowed?', sub: 'the distribution licence' },
  ]
    .map((c) => `<rect x="34" y="${c.y - 26}" width="252" height="46" rx="7" fill="#fef3c7" stroke="#16a34a" stroke-width="2.2"/><text x="160" y="${c.y - 6}" font-size="11.5" font-weight="700" text-anchor="middle" fill="#166534">${c.q}</text><text x="160" y="${c.y + 11}" font-size="9.5" text-anchor="middle" fill="#0f766e">${c.sub}</text>`)
    .join('')
  const engines = [
    { y: 78, e: 'the principle — 6.1', sub: 'the chain and the fork' },
    { y: 138, e: 'the toolkit — 6.2', sub: 'factorials and fractions' },
    { y: 198, e: 'the arrangement — 6.3', sub: 'nPr, alike, the rank' },
    { y: 258, e: 'the circle — 6.4', sub: 'unwrap and flip' },
    { y: 318, e: 'the selection — 6.5', sub: 'nCr and the censuses' },
    { y: 378, e: 'the puzzle room — 6.6', sub: 'distributions and PIE' },
  ]
    .map((c) => `<rect x="452" y="${c.y - 26}" width="236" height="46" rx="7" fill="#fef3c7" stroke="#16a34a" stroke-width="2.2"/><text x="570" y="${c.y - 6}" font-size="11.5" font-weight="700" text-anchor="middle" fill="#166534">${c.e}</text><text x="570" y="${c.y + 11}" font-size="9.5" text-anchor="middle" fill="#0f766e">${c.sub}</text>`)
    .join('')
  const arrows = [
    'M286,78 Q370,58 452,78', 'M286,78 Q370,150 452,160', 'M286,78 Q370,240 452,262',
    'M286,138 Q370,120 452,120', 'M286,138 Q370,180 452,200', 'M286,138 Q370,300 452,326',
    'M286,198 Q370,190 452,198', 'M286,198 Q370,330 452,390',
    'M286,258 Q370,250 452,258', 'M286,258 Q370,270 452,264',
    'M286,318 Q370,320 452,326', 'M286,318 Q370,360 452,390',
  ]
    .map((d) => `<path d="${d}" fill="none" stroke="#d97706" stroke-width="1.6" stroke-dasharray="none"/>`)
    .join('')
  return `<svg viewBox="0 0 720 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The decision map of the counting room: five question chips on the left — does a stage spend its option, does order matter, are the objects alike, is the seating round or flippable, groups or persons and empty allowed — route by amber arrows to six engine boxes on the right: the principle of lesson 6.1, the toolkit of 6.2, the arrangement of 6.3, the circle of 6.4, the selection of 6.5 and the puzzle room of 6.6. A ground bar underneath reads: a count is the size of a set of outcomes; list the cases at size 2 or 3 before trusting any formula.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the decision map: five questions route every count</text>
  <text x="160" y="46" font-size="10" font-weight="700" text-anchor="middle" fill="#0f766e">ask, in order</text>
  <text x="570" y="46" font-size="10" font-weight="700" text-anchor="middle" fill="#0f766e">the engine that owns the answer</text>
  ${questions}
  ${engines}
  ${arrows}
  <rect x="34" y="420" width="654" height="40" rx="7" fill="#ffedd5" stroke="#0d9488" stroke-width="2.2"/>
  <text x="360" y="437" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">the ground: a count is the size of a set of outcomes</text>
  <text x="360" y="452" font-size="9.5" text-anchor="middle" fill="#0f766e">and the small-case census — list the cases at size 2 or 3 — guards every formula in the room</text>
</svg>`
}

function reunionRosterSvg(): string {
  // one shelf of six distinct books through every engine: horizontal bars
  // scaled by count (max 720 = the full-length shelf orders)
  const rows = [
    { label: 'the free chain: 3 seats, repetition', value: 216, formula: '6³ = 216' },
    { label: 'the arrangement: 6P3', value: 120, formula: '6P3 = 120' },
    { label: 'the selection: C(6,3)', value: 20, formula: 'C(6,3) = 20' },
    { label: 'the census: every subset', value: 64, formula: '2⁶ = 64' },
    { label: 'the circle: (6−1)!', value: 120, formula: '(6−1)! = 120' },
    { label: 'the necklace: the flip', value: 60, formula: '(6−1)!/2 = 60' },
    { label: 'the full length: 6!', value: 720, formula: '6! = 720' },
  ]
  const y0 = 66
  const rowH = 48
  const bars = rows
    .map((r, i) => {
      const y = y0 + i * rowH
      const w = Math.max(14, Math.round((r.value / 720) * 400))
      return `<text x="188" y="${y + 16}" font-size="10.5" font-weight="700" text-anchor="end" fill="#166534">${r.label}</text><rect x="196" y="${y}" width="${w}" height="26" rx="4" fill="#fef3c7" stroke="#16a34a" stroke-width="2"/><text x="${202 + w}" y="${y + 17}" font-size="11" font-weight="700" fill="#ea580c">${r.formula}</text>`
    })
    .join('')
  return `<svg viewBox="0 0 720 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The reunion roster: one shelf of six distinct books taken through the chapter's engines, drawn as horizontal bars scaled by count. Three display seats with repetition free price at six cubed, 216; the same seats forced distinct price at 6P3 = 120; the selection of three books is C(6,3) = 20, and twenty times three factorial returns the 120 arrangements; the in-out census of the whole shelf prices at two to the sixth, 64; the round-table seating of all six books prices at five factorial, 120; the flippable necklace halves to 60; and the full-length shelf in a row prices at six factorial, 720 — the longest bar. A note beneath: the selection divides the arrangement by 3 factorial — 120 = 20 × 6 — and two different questions share the number 120, the engines tell them apart.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">one roster, six engines: six distinct books, every count at a glance</text>
  <text x="360" y="44" font-size="10" text-anchor="middle" fill="#0f766e">bar lengths honest to the counts — the selection bar is small because selections ARE fewer</text>
  ${bars}
  <text x="360" y="428" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">the order divide drawn as a bar: 120 = 20 × 6 — select, then arrange</text>
  <text x="360" y="446" font-size="9.5" text-anchor="middle" fill="#0f766e">two different questions share 120 (the arrangement and the circle) — the engines tell them apart; the census 64 is a freedom about the set, not the seats</text>
</svg>`
}

export const chapter06: Chapter = {
  number: 6,
  slug: 'counting-permutations-combinations',
  title: 'Counting: Permutations and Combinations',
  summary:
    'Algebra’s discrete half: counting as an exact science, the way both the JEE module and Hall & Knight teach it — the fundamental principle first (multiply along a chain of independent choices, add across mutually exclusive alternatives), then the two great counts derived rather than memorized: the permutation as an arrangement (nPr from the chain itself, factorials, arrangements of alike things, the circle), and the combination as a selection (nCr, its symmetry and complement reads, choosing from groups). The chapter closes with the distribution puzzles — words into boxes, people into rooms, at-least and at-most selections — where the two principles interlock and a wrong model is caught by the small-case census. Circular permutations — the round table and the necklace — with the clockwise and anticlockwise arrangements priced exactly; the distribution of identical objects and of distinct objects into groups, with and without empty groups allowed; and the properties of nCr (symmetry, absorption, Pascal’s identity) derived, not quoted. This is the ground Probability inherits, and it is built to be inherited honestly.',
  status: 'complete',
  lessons: [lesson61, lesson62, lesson63, lesson64, lesson65, lesson66, lessonReview6],
  plannedLessons: [],
}

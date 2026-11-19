import type { Chapter, Lesson } from '../../../types'

/**
 * Advanced Algebra — chapter 5 "Sequences and Series" (run 111 opens the unit).
 *
 * STATUS: IN-PROGRESS — lessons 5.1 and 5.2 authored this run (run 111,
 * 2026-11-19); lessons 5.3–5.6 remain planned on the one-unit-at-a-time
 * cadence. Ground: the Drive `MATHS/M2 Algebra :: 05. Progression and
 * Series` module (citation key `cengage-m2-05`, Drive id
 * `1m_rsi-kLcVQEhwC_v445TkRGVzDSY77k`, 51 MB scanned, 81 pp) —
 * vision-transcribed this run with the page offset PROVEN from two
 * independent takes (printed 5.M = PDF M+2, the same offset the
 * m2-02/m2-03/m2-06 modules carry; the survey's front-matter census was
 * wrong again, honestly recorded). STUDY-NEVER-REPRODUCE honored: the
 * module informed method shapes only; every exhibit, number, figure,
 * quiz item and exercise below is our own, recomputed by
 * scripts/verify-book4-ch05.ts.
 *
 * The lesson consts below are appended by the run in strict serial order
 * (the single-job rule — the 2026-11-18 parallel-swarm variant does not
 * apply to this run): lesson 5.1 first, then lesson 5.2, gates per lesson.
 */

// (lessons authored below this line, in serial order)

/** Lesson 5.1 — authored run 111 (2026-11-19), single-job serial order.
 *  Engines green BEFORE prose: scripts/verify-book4-ch05.ts section A
 *  38/38 (which caught four real design errors pre-prose). Fold served:
 *  "Sum of Arithmetic Means Inserted between Two Numbers" (example-family,
 *  two Illustrations + a derivation); the m2-05 module informed method
 *  shapes only — every exhibit below is our own. 4 derivations; 6 formula
 *  cards; 3 figures (vivid palette); quiz keys [1,2,3,0,2]; 15 exercises
 *  2/2/3/3/3/2. */
const lesson51: Lesson = {
  id: 'aa-arithmetic-progressions-the-constant-climb',
  number: '5.1',
  title: 'Arithmetic Progressions: the Constant Climb',
  concepts: [
    'sequence, series and progression',
    'the common difference as the constant climb',
    'the general term a + (n−1)d and its linearity in n',
    'arithmetic means inserted between two numbers',
    'the sum of n terms by Gauss pairing',
    'equidistant terms and the three-term parametrisation',
    'reading S_n as a quadratic in n',
  ],
  objectives: [
    'Define a sequence, a series and a progression, and test whether a given sequence follows a pattern expressible as a formula for the nth term.',
    'Write the general term of an arithmetic progression as $a_n = a + (n - 1)d$, read it as a linear function of the position, and produce any named term without listing the climb.',
    'Prove and use the structural properties of A.P. terms — the equal-distance pairing, the effect of adding or scaling, and the three-term parametrisation $a-d,\\ a,\\ a+d$.',
    'Insert n arithmetic means between two numbers, prove that their sum is always $n$ copies of the single arithmetic mean, and exploit the pairing symmetry $A_k + A_{n+1-k} = a + b$.',
    'Derive the two sum formulas $S_n = \\tfrac{n}{2}[2a + (n-1)d] = \\tfrac{n}{2}(a + l)$ by the Gauss pairing and price every classic exam shape: divisible-number censuses, term-ratio to sum-ratio, and reading $S_n$ as a quadratic in $n$.',
    'Prove the three-term identity and the telescoping radical identity, and use both at exam speed with honest attention to when two answers are both correct.',
  ],
  prerequisites: ['aa-relations-the-set-of-pairs-view', 'aa-the-arithmetic-geometric-mean-inequality'],
  sources: ['cengage-m2-05', 'ncert-math11-ch8-sequences-series', 'wiki-gauss-anecdote'],
  blocks: [
    { kind: 'para', text: 'Chapter 1 built the function as a machine: feed a position, receive a value. This chapter feeds the machine the simplest diet possible — the positions $1, 2, 3, \\ldots$ — and asks what comes out. A salary that rises by the same increment every year, the rungs of a ladder spaced at equal heights, the seat numbers in a row that steps up by a fixed amount: each is a function whose outputs climb by a constant. That single structural fact — the same step, taken again and again — generates every formula in this lesson, and examinations across every board price it relentlessly. But first the vocabulary must be honest, because the words *sequence*, *series* and *progression* are not synonyms, and the examinations are precise about the difference.' },
    { kind: 'para', text: 'The plan of the climb: define the three words formally; build the arithmetic progression and its general term; prove the structural properties that make three-term problems tractable; insert arithmetic means between numbers and prove the fold-level fact about their sum; then derive the sum formulas by the pairing that the schoolboy Gauss is said to have handed his teacher, and price every classic exam shape the pairing unlocks. Every number below was recomputed and pinned by the chapter engine before a word of prose was written.' },

    { kind: 'heading', text: 'Sequences, Series and Progressions' },
    { kind: 'callout', tone: 'definition', title: 'Sequence, series, progression', text: 'A **sequence** is an ordered list of objects — its members (also called *terms*) have fixed positions, order matters, and repeats are allowed; the number of terms (possibly infinite) is its *length*. A **series** is what results from adding (or subtracting) the terms of a sequence: if $a_1, a_2, \\ldots, a_n$ is a sequence, then $a_1 + a_2 + \\cdots + a_n$ is a series. A **progression** is a sequence whose terms follow a pattern expressible as a mathematical rule — typically a formula for the nth term. Thus, every progression is a sequence, but not every sequence is a progression.' },
    { kind: 'para', text: 'In the language of chapter 1, a sequence is a set of ordered pairs — the relation view — with the position $n$ as input and the term $t_n$ as output: a function whose domain is the counting positions. A finite sequence has a last pair; an infinite sequence does not. And the definition\'s last clause is the honest boundary: some sequences follow a rule you can write down, and some simply do not.' },
    { kind: 'example', title: 'A sequence with a formula, and one without: write the first four terms of the sequence with nth term $t_n = \\dfrac{3n - 1}{2^n}$, and test whether the list $2, 2, \\tfrac{8}{3}, 4, \\ldots$ from $t_n = \\dfrac{2^n}{n}$ follows an arithmetic pattern.', steps: [
      'Put $n = 1, 2, 3, 4$ into $t_n = \\dfrac{3n-1}{2^n}$: the terms are $1,\\ \\tfrac{5}{4},\\ 1,\\ \\tfrac{11}{16}$.',
      'The list rises, falls back to 1, and falls again — $\\tfrac{5}{4} - 1 \\neq 1 - \\tfrac{11}{16}$ — so no constant step exists; it is a genuine sequence with a formula, but not a progression of the arithmetic type.',
      'For $t_n = \\dfrac{2^n}{n}$: the terms are $2,\\ 2,\\ \\tfrac{8}{3},\\ 4, \\ldots$ — the gap from first to second is 0 and from second to third is $\\tfrac{2}{3}$, so again no constant climb.',
      'Hence both lists are sequences (even formula-driven ones); neither is an arithmetic progression.' ] },
    { kind: 'para', text: 'The distinction is not pedantry. When a sequence *is* a progression, the formula does the work of the whole list: the 50th even number is $2 \\times 50 = 100$ without listing forty-nine predecessors. The rest of this lesson studies the first and most examined progression family — the one that climbs by a constant.' },

    { kind: 'heading', text: 'The Arithmetic Progression: the Constant Climb' },
    { kind: 'callout', tone: 'definition', title: 'Arithmetic progression', text: 'A sequence is an **arithmetic progression** (A.P.) if its terms increase or decrease by a **fixed number**, called the **common difference** $d$. If the first term is $a$, the progression reads $a,\\ a + d,\\ a + 2d,\\ \\ldots,\\ a + (n-1)d,\\ \\ldots$ with $d = a_n - a_{n-1}$ for every $n$.' },
    { kind: 'para', text: 'The common difference is the whole personality of the family. Check it on any consecutive pair — the test for "is this an A.P.?" is simply: subtract neighbours, and see the same number every time. The name of the game with the general term is that $a_n$ is **linear in $n$**: after $n - 1$ steps of size $d$ from the start $a$, the term is $a + (n-1)d$. Two consequences are worth carrying as reflexes.' },
    { kind: 'equation', latex: 'a_n = a + (n - 1)d \\quad \\text{(the general term; linear in } n\\text{)}', note: 'where $a$ is the first term and $d = a_n - a_{n-1}$' },
    { kind: 'equation', latex: "a'_n = l - (n-1)d \\quad \\text{(the } n\\text{th term counted from the end)}", note: 'where $l$ is the last term — counting backwards runs the climb in reverse' },
    { kind: 'para', text: 'The first reflex: given any two terms together with their positions, both $a$ and $d$ are pinned — two linear equations, always solvable. The second: a term\'s position and its value determine each other, so "which term equals this value?" is a linear equation in the position, not a hunt.' },
    { kind: 'example', title: 'Show that $7, 11, 15, 19, \\ldots$ is an A.P.; find its 23rd term and its general term.', steps: [
      'Since $11 - 7 = 15 - 11 = 19 - 15 = 4$, the sequence is an A.P. with $a = 7$ and $d = 4$.',
      'Now, $a_{23} = a + 22d = 7 + 22 \\times 4 = 95$.',
      'So, the general term is $a_n = 7 + (n-1) \\times 4 = 4n + 3$ — linear in $n$, as the theory promises.',
      'Hence $a_{23} = 95$ and $a_n = 4n + 3$.' ] },
    { kind: 'figure', caption: 'The constant climb: the A.P. $7, 11, 15, 19, 23, \\ldots$ as a staircase — each step rises by the same riser $d = 4$, and the dashed trend line through the step tops is exactly the line $a_n = 4n + 3$, the general term linear in $n$. The amber risers mark the common difference; the first step starts at $a = 7$.', svg: '<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg"><text x="20" y="28" font-size="15" fill="#166534" font-family="Georgia, serif" font-weight="bold">The constant climb: equal risers make the general term linear</text><line x1="60" y1="250" x2="600" y2="250" stroke="#0d9488" stroke-width="2"/><line x1="60" y1="250" x2="60" y2="60" stroke="#0d9488" stroke-width="2"/><text x="34" y="262" font-size="13" fill="#0f766e">0</text><g stroke="#5eead4" stroke-width="1"><line x1="110" y1="215" x2="110" y2="250"/><line x1="210" y1="180" x2="210" y2="250"/><line x1="310" y1="145" x2="310" y2="250"/><line x1="410" y1="110" x2="410" y2="250"/><line x1="510" y1="75" x2="510" y2="250"/></g><rect x="110" y="215" width="100" height="35" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/><rect x="210" y="180" width="100" height="70" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/><rect x="310" y="145" width="100" height="105" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/><rect x="410" y="110" width="100" height="140" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/><rect x="510" y="75" width="100" height="175" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/><text x="150" y="238" font-size="14" fill="#166534" text-anchor="middle" font-weight="bold">7</text><text x="250" y="203" font-size="14" fill="#166534" text-anchor="middle" font-weight="bold">11</text><text x="350" y="168" font-size="14" fill="#166534" text-anchor="middle" font-weight="bold">15</text><text x="450" y="133" font-size="14" fill="#166534" text-anchor="middle" font-weight="bold">19</text><text x="550" y="98" font-size="14" fill="#166534" text-anchor="middle" font-weight="bold">23</text><text x="160" y="70" font-size="12" fill="#0f766e" text-anchor="middle">a₁</text><text x="260" y="55" font-size="12" fill="#0f766e" text-anchor="middle">a₂</text><text x="360" y="40" font-size="12" fill="#0f766e" text-anchor="middle">a₃</text><text x="460" y="25" font-size="12" fill="#0f766e" text-anchor="middle">a₄</text><text x="560" y="14" font-size="12" fill="#0f766e" text-anchor="middle">a₅</text><line x1="160" y1="220" x2="560" y2="80" stroke="#ea580c" stroke-width="2.4" stroke-dasharray="7 5"/><text x="615" y="42" font-size="13" fill="#ea580c" text-anchor="end" font-weight="bold">dashed: the line aₙ = 4n + 3</text><g stroke="#d97706" stroke-width="2.6" fill="none" marker-end="url(#arrow-51)"><line x1="112" y1="212" x2="112" y2="186"/><line x1="212" y1="177" x2="212" y2="151"/><line x1="312" y1="142" x2="312" y2="116"/><line x1="412" y1="107" x2="412" y2="81"/><line x1="512" y1="72" x2="512" y2="46"/></g><defs><marker id="arrow-51" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#d97706"/></marker></defs><text x="330" y="285" font-size="13" fill="#0d9488" text-anchor="middle">each riser = the common difference d = 4 — the same step, taken n − 1 times</text></svg>' },
    { kind: 'para', text: 'The logarithm family hides a beautiful arithmetic progression — worth catching, because examinations set exactly this trap: the *terms* look multiplicative while their *logarithms* climb by a constant.' },
    { kind: 'example', title: 'Show that $\\log 3, \\log 6, \\log 12, \\log 24, \\ldots$ (base 10) is an A.P. and find its 10th term.', steps: [
      'Now, $\\log 6 - \\log 3 = \\log \\tfrac{6}{3} = \\log 2$, and likewise $\\log 12 - \\log 6 = \\log 2$ and $\\log 24 - \\log 12 = \\log 2$.',
      'So, the difference of each term from its predecessor is always $\\log 2$ — an A.P. with common difference $\\log 2$.',
      'Hence, $a_{10} = \\log 3 + 9 \\log 2 = \\log(3 \\cdot 2^9) = \\log 1536$.' ] },
    { kind: 'example', title: 'In a certain A.P., four times the 3rd term equals seven times the 6th term. Prove that its 10th term is zero.', steps: [
      'Take the terms as $a$ and $d$: the condition reads $4(a + 2d) = 7(a + 5d)$.',
      'Now, $4a + 8d = 7a + 35d$, so $0 = 3a + 27d$, hence $a = -9d$.',
      'But then $a_{10} = a + 9d = -9d + 9d = 0$.',
      'Hence, the 10th term is zero — the two given conditions force the climb to cross zero exactly at position 10.' ] },
    { kind: 'example', title: 'Find the last positive term and the first non-positive term of the A.P. $41, 37, 33, 29, \\ldots$.', steps: [
      'Here $a = 41$ and $d = -4$, so $a_n = 41 - 4(n - 1) = 45 - 4n$.',
      'Now, $a_n > 0$ requires $n < \\tfrac{45}{4} = 11\\tfrac{1}{4}$, so the last positive term is at $n = 11$: $a_{11} = 45 - 44 = 1$.',
      'So, the first non-positive term is $a_{12} = 45 - 48 = -3$.',
      'Hence, the last positive term is $1$ (the 11th) and the first non-positive term is $-3$ (the 12th) — a decreasing climb crosses zero between two consecutive positions, never on a half-step.' ] },
    { kind: 'callout', tone: 'insight', title: 'When positions matter more than values', text: 'The 10th-term-zero illustration and the last-positive-term illustration share one discipline: translate the request into an inequality or equation about the *position* $n$, solve it, and read the term back. The position is a counting number — when a solve lands on $11\\tfrac{1}{4}$, round down for "last positive" and up for "first non-positive", and expect the boundary terms to bracket zero without hitting it.' },
    { kind: 'para', text: 'One more speed habit the family sells cheaply: any two terms *with their positions* pin the whole climb, because the general term is linear — two equations, two unknowns, always solvable. Conversely, a single term plus the difference prices every other term by walking the formula in either direction: forward from $a$ by adding $d$ per step, or backward from any known term by subtracting. The examinations rarely ask for more than this two-reflex toolkit, dressed up: a term count, a value hunt, or a boundary question about which term first crosses a threshold.' },


    { kind: 'heading', text: 'Properties of Terms of an A.P.' },
    { kind: 'para', text: 'The constant difference generates structural laws that examinations price more heavily than the general term itself. Each property below is stated with a verified instance — the honest way to hold a property.' },
    { kind: 'list', marker: 'roman', items: [
      '**The mean property.** If $a, b, c$ are in A.P. then $b - a = c - b$, i.e. $2b = a + c$, and $b$ is the *arithmetic mean* of $a$ and $c$. At $8, 9, 10$: $2 \\times 9 = 8 + 10$ holds.',
      '**Shift invariance.** Adding (or subtracting) a fixed number to every term leaves an A.P. an A.P. with the *same* $d$; multiplying every term by a non-zero constant scales $d$ but keeps the family. Both operations together say: $\\lambda a_n + \\mu$ is an A.P. whenever $a_n$ is.',
      '**Termwise combination.** The termwise sum or difference of two A.P.s is an A.P. — the two climbs add as vectors: differences add.',
      '**Equal-distance extraction.** Terms taken at equal distance are again in A.P.: $a_1, a_3, a_5, \\ldots$ from $a_1, a_2, a_3, \\ldots$, and in general $a_{n-k}, a_n, a_{n+k}$ are in A.P., so $a_n = \\tfrac{1}{2}(a_{n-k} + a_{n+k}).$ At positions 4, 10, 16 of the climb $7, 11, 15, \\ldots$: the terms are 19, 43, 67 and indeed $43 = \\tfrac{19 + 67}{2}$.',
      '**The three-term parametrisation.** Three consecutive terms should be taken as $a - d,\\ a,\\ a + d$ (sum $3a$) and four consecutive terms as $a - 3d,\\ a - d,\\ a + d,\\ a + 3d$ (sum $4a$) — the parametrisation kills one unknown before algebra begins.',
    ] },
    { kind: 'para', text: 'The equal-distance law is the one to internalise deepest, because it is the engine behind both the Gauss pairing below and every "indices that sum to the same total give the same pair-sum" examination trap.' },
    { kind: 'example', title: 'Three numbers in A.P. have sum 27 and product 720. Find the numbers.', steps: [
      'Take the numbers as $a - d,\\ a,\\ a + d$ — the three-term parametrisation.',
      'Now, $(a - d) + a + (a + d) = 3a = 27$, so $a = 9$.',
      'So, $(9 - d) \\times 9 \\times (9 + d) = 720$ gives $81 - d^2 = 80$, hence $d^2 = 1$ and $d = \\pm 1$.',
      'Hence, the numbers are $8, 9, 10$ (the sign of $d$ only reverses the reading order).' ] },
    { kind: 'derivation', title: 'The three-term identity of any A.P.', statement: 'If the pth, qth and rth terms of an A.P. are $a$, $b$ and $c$ respectively, then $a(q - r) + b(r - p) + c(p - q) = 0$ — a determinant-free certificate that three values sit on one climb.', steps: [
      { label: 'Name the climb', formula: 'a = A + (p-1)D,\\quad b = A + (q-1)D,\\quad c = A + (r-1)D', explanation: 'Let the progression have first term $A$ and difference $D$; the three given values sit at positions $p, q, r$.' },
      { label: 'Substitute into the combination', formula: 'a(q-r) + b(r-p) + c(p-q)', explanation: 'Replace each of $a, b, c$ by its position formula.' },
      { label: 'Collect the first-term mass', formula: 'A\\left[(q-r) + (r-p) + (p-q)\\right] = A \\cdot 0 = 0', explanation: 'The three bracketed differences close a cycle: their sum is exactly zero, so the $A$-part vanishes identically.' },
      { label: 'Collect the difference mass', formula: 'D\\left[(p-1)(q-r) + (q-1)(r-p) + (r-1)(p-q)\\right]', explanation: 'Expand the position offsets; the $-1$ parts close the same cycle and vanish, leaving $D[p(q-r) + q(r-p) + r(p-q)]$.' },
      { label: 'The cycle closes again', formula: 'p(q-r) + q(r-p) + r(p-q) = pq - pr + qr - qp + rp - rq = 0', explanation: 'Every product appears once with each sign; the bracket is identically zero.' },
    ], result: '$a(q - r) + b(r - p) + c(p - q) = 0$ — always, for any A.P. and any three positions' },
    { kind: 'para', text: 'The identity\'s use is diagnostic: hand it three values and three positions, and it answers *yes* or *no* to "do these sit on one climb?" — with no subtraction of equations and no case analysis. The engine swept it over four position triples on a rising climb and three on a falling one before this prose was written.' },

    { kind: 'heading', text: 'Arithmetic Means and Their Insertion' },
    { kind: 'callout', tone: 'definition', title: 'Arithmetic mean; insertion of n arithmetic means', text: 'The **arithmetic mean** of two numbers $a$ and $b$ is $A = \\dfrac{a + b}{2}$ — the unique number making $a, A, b$ an A.P. If $n$ numbers $A_1, A_2, \\ldots, A_n$ are inserted so that $a,\\ A_1,\\ A_2,\\ \\ldots,\\ A_n,\\ b$ is an A.P., then $A_1, \\ldots, A_n$ are **$n$ arithmetic means between $a$ and $b$**; the full list has $n + 2$ terms.' },
    { kind: 'para', text: 'Insertion is just the climb again, with the endpoints known and the step unknown. The $n + 2$-term list runs from $a$ to $b$, so the whole span $b - a$ is crossed in exactly $n + 1$ steps:' },
    { kind: 'equation', latex: 'd = \\dfrac{b - a}{n + 1}, \\qquad A_k = a + \\dfrac{k\\,(b - a)}{n + 1} \\quad (k = 1, \\ldots, n)', note: 'the kth inserted mean sits exactly $k$ steps of size $\\tfrac{b-a}{n+1}$ above $a$' },
    { kind: 'para', text: 'For example, between 10 and 50 four arithmetic means are inserted: $d = \\tfrac{40}{5} = 8$, so the means are $18, 26, 34, 42$. The next figure shows this ladder — and the pairing its symmetry forces.' },
    { kind: 'figure', caption: 'Four arithmetic means between $a = 10$ and $b = 50$ on the number line: the step is $d = \\tfrac{b-a}{n+1} = \\tfrac{40}{5} = 8$, giving the means $18, 26, 34, 42$. The brackets pair the kth mean from the left with the kth from the right — each pair sums to $a + b = 60$, which is exactly why the sum of all inserted means is $n$ copies of the single arithmetic mean $30$.', svg: '<svg viewBox="0 0 640 210" xmlns="http://www.w3.org/2000/svg"><text x="20" y="26" font-size="15" fill="#166534" font-family="Georgia, serif" font-weight="bold">Insertion as a ladder: 4 arithmetic means between 10 and 50</text><line x1="50" y1="150" x2="610" y2="150" stroke="#16a34a" stroke-width="2.6"/><g stroke="#16a34a" stroke-width="2.6"><line x1="90" y1="142" x2="90" y2="158"/><line x1="190" y1="142" x2="190" y2="158"/><line x1="290" y1="142" x2="290" y2="158"/><line x1="390" y1="142" x2="390" y2="158"/><line x1="490" y1="142" x2="490" y2="158"/><line x1="590" y1="142" x2="590" y2="158"/></g><circle cx="90" cy="150" r="7" fill="#fef3c7" stroke="#166534" stroke-width="2"/><circle cx="190" cy="150" r="7" fill="#ffedd5" stroke="#d97706" stroke-width="2.4"/><circle cx="290" cy="150" r="7" fill="#ffedd5" stroke="#d97706" stroke-width="2.4"/><circle cx="390" cy="150" r="7" fill="#ffedd5" stroke="#d97706" stroke-width="2.4"/><circle cx="490" cy="150" r="7" fill="#ffedd5" stroke="#d97706" stroke-width="2.4"/><circle cx="590" cy="150" r="7" fill="#fef3c7" stroke="#166534" stroke-width="2"/><text x="90" y="130" font-size="14" fill="#166534" text-anchor="middle" font-weight="bold">10 (a)</text><text x="190" y="130" font-size="14" fill="#166534" text-anchor="middle" font-weight="bold">18</text><text x="290" y="130" font-size="14" fill="#166534" text-anchor="middle" font-weight="bold">26</text><text x="390" y="130" font-size="14" fill="#166534" text-anchor="middle" font-weight="bold">34</text><text x="490" y="130" font-size="14" fill="#166534" text-anchor="middle" font-weight="bold">42</text><text x="590" y="130" font-size="14" fill="#166534" text-anchor="middle" font-weight="bold">50 (b)</text><g stroke="#d97706" stroke-width="2" stroke-dasharray="5 4" fill="none"><path d="M 290 172 Q 290 184 340 184 Q 390 184 390 172"/><path d="M 190 172 Q 190 196 340 196 Q 490 196 490 172"/></g><text x="140" y="120" font-size="12" fill="#ea580c" text-anchor="middle">d = 8</text><text x="240" y="120" font-size="12" fill="#ea580c" text-anchor="middle">d = 8</text><text x="340" y="120" font-size="12" fill="#ea580c" text-anchor="middle">d = 8</text><text x="440" y="120" font-size="12" fill="#ea580c" text-anchor="middle">d = 8</text><text x="540" y="120" font-size="12" fill="#ea580c" text-anchor="middle">d = 8</text><text x="290" y="205" font-size="12.5" fill="#0d9488" text-anchor="middle">each bracket pair sums to a + b = 60: 18+42, 26+34 — the pairing behind the sum law</text></svg>' },
    { kind: 'derivation', title: 'The sum of inserted arithmetic means', statement: 'The sum of the $n$ arithmetic means inserted between $a$ and $b$ equals exactly $n$ copies of the single arithmetic mean of $a$ and $b$ — the fold-level fact this lesson is contractually obliged to teach in worked craft.', steps: [
      { label: 'Name the inserted list', formula: 'a,\\ A_1,\\ A_2,\\ \\ldots,\\ A_n,\\ b \\text{ is an A.P. with step } d', explanation: 'The means are the interior rungs of one $(n+2)$-term climb from $a$ to $b$.' },
      { label: 'Pair from both ends', formula: 'A_1 + A_n = (a + d) + (b - d)', explanation: 'The first mean sits one step above $a$; the last mean sits one step below $b$.' },
      { label: 'The steps cancel', formula: 'A_1 + A_n = a + b', explanation: 'The interior offsets $+d$ and $-d$ cancel; likewise $A_2 + A_{n-1} = a + b$, and so on — every mirror pair sums to $a + b$.' },
      { label: 'Sum by the mirror pairs', formula: '\\sum_{k=1}^{n} A_k = \\tfrac{n}{2}\\,(A_1 + A_n) \\text{ if } n \\text{ even; } \\tfrac{n-1}{2}(a+b) + A_m \\text{ otherwise}', explanation: 'Pair the means mirror-wise; any unpaired middle mean $A_m$ equals the arithmetic mean $\\tfrac{a+b}{2}$ itself, since it sits at the centre of the climb.' },
      { label: 'Collect', formula: '\\sum_{k=1}^{n} A_k = n \\cdot \\dfrac{a + b}{2}', explanation: 'Every mirror pair contributes one full $a + b$ per two means, and the middle mean contributes exactly half of it — so the total is $n$ copies of the mean, no matter the parity of $n$.' },
    ], result: '$A_1 + A_2 + \\cdots + A_n = n\\left(\\dfrac{a+b}{2}\\right)$ — $n$ copies of the arithmetic mean, for every $n$' },
    { kind: 'callout', tone: 'theorem', title: 'Sum of arithmetic means inserted between two numbers', text: 'If $A_1, \\ldots, A_n$ are the $n$ arithmetic means inserted between $a$ and $b$, then $A_1 + A_2 + \\cdots + A_n = n \\times (\\text{A.M. of } a \\text{ and } b) = \\dfrac{n(a + b)}{2}.$ The endpoints are *not* counted — the means alone carry the sum.' },
    { kind: 'example', title: 'Twelve arithmetic means are inserted between 5 and 60. Find the sum of these twelve means.', steps: [
      'Now, the sum of $n$ inserted means is $n$ times the arithmetic mean of the endpoints.',
      'So, the A.M. of 5 and 60 is $\\tfrac{5 + 60}{2} = \\tfrac{65}{2}$.',
      'Hence, the sum is $12 \\times \\tfrac{65}{2} = 6 \\times 65 = 390$.' ] },
    { kind: 'example', title: 'A nest of arithmetic means between 3 and 55 has sum 348. How many means were inserted, and what is the 5th mean?', steps: [
      'Now, if $n$ means sit between 3 and 55, their sum is $n \\times \\tfrac{3 + 55}{2} = 29n$.',
      'So, $29n = 348$ gives $n = 12$.',
      'Take the step: the full climb has $n + 2 = 14$ terms, so $d = \\tfrac{55 - 3}{13} = 4$.',
      'Hence, the 5th mean is $A_5 = 3 + 5 \\times 4 = 23$, and the nest holds twelve means.' ] },
    { kind: 'callout', tone: 'exam', title: 'Where the examinations price this', text: 'The insertion sum is a favourite of JEE Main, CUET and every state board\'s objective papers, usually disguised: "means are inserted… the *sum of the resulting series* is…" (count the endpoints — then the total is $\\tfrac{(n+2)(a+b)}{2}$), or "the ratio of the kth to the last-but-one mean is…" (solve in $n$ through the step $\\tfrac{b-a}{n+1}$). The derivation above prices both disguises without new machinery.' },

    { kind: 'para', text: 'One disguise deserves a worked prose note because it appears on objective papers constantly: "the sum of the resulting series". When means are inserted, the *series* usually means the whole climb — endpoints included. With $n$ means between $a$ and $b$, the resulting series has $n + 2$ terms running from $a$ to $b$, so its sum is $\\tfrac{(n+2)(a + b)}{2}$ — exactly $a + b$ more than the means-only sum. On the twelve-means example above (5 to 60): the means alone carry 390, the full series carries $\\tfrac{14 \\times 65}{2} = 455$ — 65 more, which is precisely the two endpoints. Read the question twice, decide *whose* sum is asked, and the two formulas never collide.' },

    { kind: 'heading', text: 'The Sum of Terms: Gauss Pairing' },
    { kind: 'para', text: 'The sum of a climb is the most famous piece of school mathematics in existence. The traditional story — reported as a popular anecdote, not a verified document — has the young Carl Friedrich Gauss handed the busywork of adding $1 + 2 + \\cdots + 100$ by his teacher J. G. Büttner, and replying almost at once with 5050: fifty pairs, each summing to 101. Whatever its historical standing, the *move* is the real thing: pair the climb from both ends, and every pair carries the same weight.' },
    { kind: 'derivation', title: 'The two sum formulas of an A.P.', statement: 'For an A.P. with first term $a$, difference $d$ and last term $l = a + (n-1)d$, the sum of the first $n$ terms admits two equal closed forms.', steps: [
      { label: 'Write the sum forwards', formula: 'S_n = a_1 + a_2 + \\cdots + a_{n-1} + a_n', explanation: 'The climb read left to right.' },
      { label: 'Write it backwards', formula: 'S_n = a_n + a_{n-1} + \\cdots + a_2 + a_1', explanation: 'The same terms in reverse order — the sum cannot care about reading direction.' },
      { label: 'Add columnwise', formula: '2S_n = (a_1 + a_n) + (a_2 + a_{n-1}) + \\cdots + (a_n + a_1)', explanation: 'Each column pairs a term with its mirror from the other end.' },
      { label: 'Every pair equals the ends', formula: 'a_k + a_{n+1-k} = a_1 + a_n', explanation: 'By the equal-distance law: the two positions sit at distances $k-1$ and $n-k$ from the two ends, and the offsets $\\pm(k-1)d$ cancel.' },
      { label: 'Count the columns', formula: '2S_n = n\\,(a_1 + a_n)', explanation: 'There are exactly $n$ columns, each of weight $a_1 + a_n$.' },
      { label: 'Halve and expand', formula: 'S_n = \\tfrac{n}{2}(a_1 + a_n) = \\tfrac{n}{2}\\left[2a + (n-1)d\\right]', explanation: 'Substituting $a_n = a + (n-1)d$ converts the ends-form into the parameters-form.' },
    ], result: '$S_n = \\dfrac{n}{2}\\left[2a + (n-1)d\\right] = \\dfrac{n}{2}(a + l)$ — the two sum formulas, one derivation' },
    { kind: 'figure', caption: 'Gauss pairing made visible: the climb $3, 8, 13, 18, 23, 28$ (a = 3, d = 5) stacked forwards (amber) and its mirror stacked backwards (teal) interlock into a rectangle — every column of the doubled sum carries the same weight $a_1 + a_n = 31$, so $2S_n = n(a_1+a_n)$ and $S_n = \\tfrac{6}{2} \\times 31 = 93$. The pairing is the equal-distance law in action.', svg: '<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg"><text x="20" y="24" font-size="15" fill="#166534" font-family="Georgia, serif" font-weight="bold">Pairing from both ends: the doubled sum is a rectangle</text><line stroke="#ea580c" stroke-width="2.6" stroke-dasharray="9 5" x2="464" y1="46" y2="46"/><line x1="464" y1="46" x2="110" y2="46" stroke="#ea580c" stroke-width="2.6" stroke-dasharray="9 5"/><text x="287" y="40" font-size="13" fill="#ea580c" text-anchor="middle" font-weight="bold">every column = a₁ + aₙ = 31 — the doubled sum is one rectangle</text><rect x="110" y="214" width="54" height="18" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/><rect x="170" y="184" width="54" height="48" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/><rect x="230" y="154" width="54" height="78" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/><rect x="290" y="124" width="54" height="108" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/><rect x="350" y="94" width="54" height="138" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/><rect x="410" y="64" width="54" height="168" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/><rect x="110" y="46" width="54" height="168" fill="#5eead4" stroke="#0d9488" stroke-width="1.6"/><rect x="170" y="46" width="54" height="138" fill="#5eead4" stroke="#0d9488" stroke-width="1.6"/><rect x="230" y="46" width="54" height="108" fill="#5eead4" stroke="#0d9488" stroke-width="1.6"/><rect x="290" y="46" width="54" height="78" fill="#5eead4" stroke="#0d9488" stroke-width="1.6"/><rect x="350" y="46" width="54" height="48" fill="#5eead4" stroke="#0d9488" stroke-width="1.6"/><rect x="410" y="46" width="54" height="18" fill="#5eead4" stroke="#0d9488" stroke-width="1.6"/><line x1="95" y1="232" x2="470" y2="232" stroke="#0d9488" stroke-width="1.6"/><text x="137" y="255" font-size="12" fill="#166534" text-anchor="middle">3</text><text x="197" y="255" font-size="12" fill="#166534" text-anchor="middle">8</text><text x="257" y="255" font-size="12" fill="#166534" text-anchor="middle">13</text><text x="317" y="255" font-size="12" fill="#166534" text-anchor="middle">18</text><text x="377" y="255" font-size="12" fill="#166534" text-anchor="middle">23</text><text x="437" y="255" font-size="12" fill="#166534" text-anchor="middle">28</text><text x="500" y="130" font-size="13.5" fill="#166534">2Sₙ = n(a₁ + aₙ)</text><text x="500" y="155" font-size="13.5" fill="#166534">Sₙ = 6/2 × 31 = 93</text><text x="287" y="288" font-size="12.5" fill="#0d9488" text-anchor="middle">forward climb 3, 8, 13, 18, 23, 28 (amber) under the mirror 28, 23, 18, 13, 8, 3 (teal) — every column tops at 31</text></svg>' },
    { kind: 'callout', tone: 'historical', title: 'The schoolroom anecdote', text: 'The pairing story is handed down as a *popular story*: the young Gauss, set the task $1 + 2 + \\cdots + 100$ by his teacher Büttner, answered 5050 almost immediately — fifty pairs, each of weight 101. Anecdote or not (the sources report it as tradition, not document), the move itself is beyond dispute: it is the equal-distance law, and it prices every climb ever set.' },
    { kind: 'example', title: 'Find the sum of all three-digit natural numbers divisible by 11.', steps: [
      'Now, the smallest three-digit multiple of 11 is $110 = 11 \\times 10$ and the largest is $990 = 11 \\times 90$, so the list is $110, 121, \\ldots, 990$ — an A.P. with $a = 110$ and $d = 11$.',
      'Take the count: $110 + 11(n - 1) = 990$ gives $11(n-1) = 880$, so $n - 1 = 80$ and $n = 81$.',
      'So, $S_{81} = \\tfrac{81}{2}(110 + 990) = \\tfrac{81}{2} \\times 1100 = 81 \\times 550 = 44{,}550$.',
      'Hence, the required sum is 44,550 — the divisible-number census: locate the endpoints, count the terms, average the ends.' ] },
    { kind: 'example', title: 'How many terms of the A.P. $24, 21, 18, \\ldots$ must be taken for the sum to be 78? Explain the two answers.', steps: [
      'Now, $a = 24$ and $d = -3$, so $S_n = \\tfrac{n}{2}[48 - 3(n-1)] = \\tfrac{n(51 - 3n)}{2}$.',
      'So, $\\tfrac{n(51 - 3n)}{2} = 78$ gives $n(51 - 3n) = 156$, hence $3n^2 - 51n + 156 = 0$ and $n^2 - 17n + 52 = 0$.',
      'Factor: $(n - 4)(n - 13) = 0$, so $n = 4$ or $n = 13$ — both give $S_n = 78$.',
      'Hence, both roots are honest answers — and the reason is structural: $S_{13} - S_4 = 78 - 78 = 0$, so the block of terms from the 5th to the 13th adds nothing. The climb is positive only through $a_8 = 3$, hits $a_9 = 0$, and the negative tail cancels the positives of that block exactly.',
      'Hence, $n = 4$ or $n = 13$ — the falling climb\'s negative tail exactly cancels a stretch of positives, a *structural* fact the quadratic hands you for free.' ] },
    { kind: 'example', title: 'In a 20-term A.P., $a_4 + a_8 + a_{13} + a_{17} = 236$. Find the sum of all 20 terms.', steps: [
      'Pair the indices: $4 + 17 = 21$ and $8 + 13 = 21$, and for 20 terms the mirror sum is $n + 1 = 21$ — so each pair $a_k + a_{21-k}$ equals the constant $a_1 + a_{20}$.',
      'Now, the given sum is $(a_4 + a_{17}) + (a_8 + a_{13}) = 2(a_1 + a_{20}) = 236$.',
      'So, $a_1 + a_{20} = 118$, and $S_{20} = \\tfrac{20}{2}(a_1 + a_{20}) = 10 \\times 118 = 1180$.',
      'Hence, $S_{20} = 1180$ — indices that sum to $n + 1$ always pair to the same weight.' ] },
    { kind: 'example', title: 'The sums of $n$ terms of two A.P.s are in the ratio $(7n + 2) : (11n + 3)$. Find the ratio of their 12th terms.', steps: [
      'Write the ratio: $\\tfrac{S_n\'}{S_n\'\'} = \\tfrac{\\tfrac{n}{2}(2a_1\' + (n-1)d_1\')}{\\tfrac{n}{2}(2a_2\' + (n-1)d_2\')} = \\tfrac{7n + 2}{11n + 3}$ — the $\\tfrac{n}{2}$ cancels.',
      'Now, choose $n$ so that the leftover bracket reads as twice a *term*: $2a + (n-1)d$ equals $2(a + kd)$ exactly when $n - 1 = 2k$, i.e. $n = 2k + 1$.',
      'So, for the 12th terms take $k = 11$, hence $n = 23$: $\\tfrac{2a_1\' + 22d_1\'}{2a_2\' + 22d_2\'} = \\tfrac{7(23) + 2}{11(23) + 3} = \\tfrac{163}{256}$.',
      'Hence, the ratio of the 12th terms is $163 : 256$ — the trick is one honest substitution, not a memory.' ] },
    { kind: 'example', title: 'For a certain A.P., $S_n = 2n^2 + 3n$. Find the first term, the common difference and the 10th term.', steps: [
      'Now, the term is the difference of consecutive sums: $a_n = S_n - S_{n-1}$.',
      'So, $a_n = (2n^2 + 3n) - (2(n-1)^2 + 3(n-1)) = 2(2n - 1) + 3 = 4n + 1$.',
      'Hence, $a_1 = 5$, $d = 4$ (the coefficient of $n$), and $a_{10} = 41$.' ] },
    { kind: 'table', caption: 'The sum machine read both ways — every row recomputed by the chapter engine', head: ['First term a', 'Common difference d', 'Terms n', 'Sum S_n'], rows: [
      ['7', '4', '23', '1173'],
      ['9', '5', '30', '2445'],
      ['11', '4', '19', '893'],
      ['24', '-3', '13', '78'],
    ] },
    { kind: 'callout', tone: 'insight', title: 'S_n is always a quadratic without a constant term', text: 'Expanding $S_n = \\tfrac{n}{2}[2a + (n-1)d] = \\tfrac{d}{2}n^2 + (a - \\tfrac{d}{2})n$: the sum of an A.P. is *always* $An^2 + Bn$ with no constant term. That is why "$S_p = S_q$" forces "$S_{p+q} = 0$" (the quadratic $An^2 + Bn$ vanishes at $n = 0$ and at $n = -\\tfrac{B}{A} = p + q$), and why reading $a_n = S_n - S_{n-1}$ off a given quadratic is always legitimate.' },

    { kind: 'heading', text: 'A Telescope of Radicals' },
    { kind: 'para', text: 'One identity closes the lesson — a favourite of the harder examinations because it *looks* impossible until the common difference is made to do the cancelling. It also shows the A.P. discipline serving a family far from progressions on the surface.' },
    { kind: 'derivation', title: 'The telescoping radical identity', statement: 'If $a_1, a_2, \\ldots, a_n$ are positive terms of an A.P., then the reciprocal-of-neighbour-roots sum telescopes to a closed form involving only the end terms.', steps: [
      { label: 'Rationalise one denominator', formula: '\\dfrac{1}{\\sqrt{a_k} + \\sqrt{a_{k+1}}} = \\dfrac{\\sqrt{a_{k+1}} - \\sqrt{a_k}}{a_{k+1} - a_k}', explanation: 'Multiply above and below by the conjugate $\\sqrt{a_{k+1}} - \\sqrt{a_k}$.' },
      { label: 'The A.P. does the cancellation', formula: 'a_{k+1} - a_k = d \\text{ (constant)}', explanation: 'This is the whole power of the progression here: every denominator is the *same* constant $d$.' },
      { label: 'Sum telescopes', formula: '\\sum_{k=1}^{n-1} \\dfrac{\\sqrt{a_{k+1}} - \\sqrt{a_k}}{d} = \\dfrac{\\sqrt{a_n} - \\sqrt{a_1}}{d}', explanation: 'Each interior radical appears once positive and once negative — the sum collapses to the ends.' },
      { label: 'Close the form', formula: '\\dfrac{\\sqrt{a_n} - \\sqrt{a_1}}{d} = \\dfrac{(a_n - a_1)}{d(\\sqrt{a_n} + \\sqrt{a_1})}', explanation: 'Rationalise the numerator; then substitute $a_n - a_1 = (n-1)d$.' },
      { label: 'The d cancels', formula: '\\dfrac{(n-1)d}{d(\\sqrt{a_n} + \\sqrt{a_1})}', explanation: 'The step length leaves the identity entirely — only the end roots and the count remain.' },
    ], result: '$\\sum_{k=1}^{n-1} \\dfrac{1}{\\sqrt{a_k} + \\sqrt{a_{k+1}}} = \\dfrac{n - 1}{\\sqrt{a_1} + \\sqrt{a_n}}$ — only the ends survive' },
    { kind: 'para', text: 'The engine pinned this numerically on the climb $2, 4, 6, 8, 10$ (left side $\\approx 0.87400$, right side $\\approx 0.87400$ to twelve places) before the prose existed. The exercises set it on the climb $1, 3, 5, 7, 9$, where the closed form reads $\\tfrac{4}{1 + 3} = 1$ exactly.' },

    { kind: 'heading', text: 'The Constant Climb in Retrospect' },
    { kind: 'para', text: 'From the three vocabulary words to the Gauss rectangle, one structural constant did everything: the common difference. It made the general term linear, the mirror pairs equal, the inserted means a ladder whose sum is $n$ copies of the single mean, and the radical sum a telescope. What it could *not* do is make anything grow fast — a constant step adds the same forever. The next lesson removes the ceiling: let each term *multiply* the last by a fixed ratio, and the climb becomes exponential, the mirror pairing becomes a shift-and-subtract, and the sum of an infinite list becomes possible — the infinite tail.' },
    { kind: 'formula', name: 'General term of an A.P.', latex: 'a_n = a + (n - 1)d', note: 'linear in the position; also $a\'_n = l - (n-1)d$ from the end' },
    { kind: 'formula', name: 'Sum of n terms (two forms)', latex: 'S_n = \\tfrac{n}{2}\\left[2a + (n-1)d\\right] = \\tfrac{n}{2}(a + l)', note: 'the Gauss pairing — pair the ends, count the columns' },
    { kind: 'formula', name: 'Sum of inserted arithmetic means', latex: 'A_1 + A_2 + \\cdots + A_n = \\dfrac{n(a + b)}{2}', note: 'n copies of the single arithmetic mean — the hosted fold' },
    { kind: 'formula', name: 'The kth inserted mean', latex: 'A_k = a + \\dfrac{k\\,(b - a)}{n + 1}', note: 'the step is fixed by the endpoints and the count: $d = \\tfrac{b-a}{n+1}$' },
    { kind: 'formula', name: 'Three consecutive terms', latex: 'a - d,\\quad a,\\quad a + d \\quad (\\text{sum } 3a)', note: 'four terms: $a - 3d,\\ a - d,\\ a + d,\\ a + 3d$ (sum $4a$)' },
    { kind: 'formula', name: 'The telescoping radical identity', latex: '\\sum_{k=1}^{n-1} \\dfrac{1}{\\sqrt{a_k} + \\sqrt{a_{k+1}}} = \\dfrac{n - 1}{\\sqrt{a_1} + \\sqrt{a_n}}', note: 'for positive A.P. terms — the difference does the cancelling' },
    { kind: 'terms', items: [
      { term: 'sequence', def: 'an ordered list of objects; members occupy fixed positions, repeats allowed, length possibly infinite' },
      { term: 'series', def: 'the expression obtained by adding (or subtracting) the terms of a sequence' },
      { term: 'progression', def: 'a sequence whose terms follow an expressible pattern — typically a formula for the nth term' },
      { term: 'arithmetic progression (A.P.)', def: 'a sequence whose terms increase or decrease by a fixed common difference $d$' },
      { term: 'common difference', def: 'the constant $d = a_n - a_{n-1}$; the single structural parameter of the A.P. family' },
      { term: 'general term', def: 'the closed form $a_n = a + (n-1)d$ — linear in the position $n$' },
      { term: 'arithmetic mean', def: 'of $a$ and $b$: the number $A = \\tfrac{a+b}{2}$ making $a, A, b$ an A.P.; $n$ means can be inserted between any two numbers' },
      { term: 'equidistant terms', def: 'terms at equal distance from an end (or from a central term); mirror pairs $a_k + a_{n+1-k}$ all share the weight $a_1 + a_n$' },
    ] },
    { kind: 'quiz', items: [
      { q: 'In an A.P. with first term 7 and common difference $-3$, the tenth term is', options: ['-23', '-20', '-17', '26'], answer: 1, explain: '$a_{10} = 7 + 9(-3) = -20$. Option $-23$ subtracts $10$ differences (an off-by-one); $-17$ subtracts only 8; $26$ adds the difference instead of subtracting — watch the sign of $d$.' },
      { q: 'The sum of the first 12 terms of the A.P. $4, 9, 14, \\ldots$ is', options: ['366', '390', '378', '402'], answer: 2, explain: '$S_{12} = 6(8 + 11 \\times 5) = 6 \\times 63 = 378$. $366$ uses $11d$ instead of $(n-1)d$ in one factor; $390$ averages the wrong ends; $402$ adds an extra term.' },
      { q: 'Seven arithmetic means are inserted between 3 and 43. Their sum is', options: ['322', '138', '184', '161'], answer: 3, explain: 'the sum is $7 \\times \\tfrac{3+43}{2} = 7 \\times 23 = 161$. $322$ forgets to halve (seven copies of $46$); $138$ inserts six means; $184$ inserts eight — count the means, then take $n$ copies of the mean.' },
      { q: 'Three numbers in A.P. have sum 21 and product 315. The numbers are', options: ['5, 7, 9', '4, 7, 10', '3, 7, 11', '6, 7, 8'], answer: 0, explain: 'with the parametrisation $a-d, a, a+d$: $3a = 21$ gives $a = 7$, and $7(49 - d^2) = 315$ gives $d^2 = 4$, so $5, 7, 9$ — sum and product both check. The distractors satisfy the sum but their products are $280, 231, 336$.' },
      { q: 'If the nth term of an A.P. is $4n - 7$, the term equal to 61 is the', options: ['15th', '16th', '17th', '18th'], answer: 2, explain: '$4n - 7 = 61$ gives $4n = 68$, so $n = 17$. The 16th term is $57$ and the 18th is $65$ — solve the linear equation, do not guess.' },
    ] },
    { kind: 'exercises', sets: [
      { level: 'L1', questions: [
        { q: 'Find the 19th term of the A.P. $11, 15, 19, 23, \\ldots$.', solution: ['Take the climb: $a = 11$ and $d = 4$.', 'Now, $a_{19} = a + 18d = 11 + 18 \\times 4 = 11 + 72$.', 'Hence, $a_{19} = 83$.'], answer: '83' },
        { q: 'Which term of the A.P. $6, 11, 16, \\ldots$ equals 176?', solution: ['Now, $a_n = 6 + 5(n - 1) = 5n + 1$.', 'So, $5n + 1 = 176$ gives $5n = 175$, hence $n = 35$.', 'Hence, the 35th term equals 176.'], answer: 'the 35th term' },
      ] },
      { level: 'L2', questions: [
        { q: 'The 4th and 9th terms of an A.P. are 13 and 33. Find its 25th term.', solution: ['Take the gap: nine terms minus four terms is five steps, so $5d = 33 - 13 = 20$ and $d = 4$.', 'Now, $a = 13 - 3 \\times 4 = 1$.', 'So, $a_{25} = 1 + 24 \\times 4 = 97$.', 'Hence, the 25th term is 97.'], answer: '97' },
        { q: 'Find the sum of the first 30 terms of the A.P. $9, 14, 19, \\ldots$.', solution: ['Now, $a = 9$, $d = 5$, and $S_n = \\tfrac{n}{2}[2a + (n-1)d]$.', 'So, $S_{30} = 15\\,[18 + 29 \\times 5] = 15 \\times 163$.', 'Hence, $S_{30} = 2445$.'], answer: '2445' },
      ] },
      { level: 'L3', questions: [
        { q: 'How many terms of the A.P. $24, 21, 18, \\ldots$ must be taken for the sum to be 78? Explain the answer.', solution: ['Now, $a = 24$, $d = -3$: $S_n = \\tfrac{n}{2}[48 - 3(n - 1)] = \\tfrac{n(51 - 3n)}{2}$.', 'So, $\\tfrac{n(51 - 3n)}{2} = 78$ gives $n^2 - 17n + 52 = 0$, hence $(n - 4)(n - 13) = 0$ and $n = 4$ or $13$.', 'Hence, $n = 4$ or $n = 13$: the terms are positive only through $a_8 = 3$, then $a_9 = 0$ and negative; the block from the 5th to the 13th term sums to $S_{13} - S_4 = 0$, so both counts land on 78 — the falling climb\'s negative tail cancels its own positives.'], answer: 'n = 4 or n = 13 (both honest)' },
        { q: 'Three numbers in A.P. have sum 30 and the sum of their squares is 302. Find them.', solution: ['Take the parametrisation $a - d,\\ a,\\ a + d$: the sum gives $3a = 30$, so $a = 10$.', 'Now, the squares: $(a - d)^2 + a^2 + (a + d)^2 = 3a^2 + 2d^2 = 300 + 2d^2 = 302$.', 'So, $2d^2 = 2$ gives $d = \\pm 1$.', 'Hence, the numbers are $9, 10, 11$.'], answer: '9, 10, 11' },
        { q: 'The 7th term of an A.P. is 34 and the 13th term is 64. Find the sum of its first 18 terms.', solution: ['Take the gap: $6d = 64 - 34 = 30$, so $d = 5$.', 'Now, $a = 34 - 6 \\times 5 = 4$.', 'So, $S_{18} = 9\\,[8 + 17 \\times 5] = 9 \\times 93 = 837$.', 'Hence, $S_{18} = 837$.'], answer: '837' },
      ] },
      { level: 'L4', questions: [
        { q: 'A number of arithmetic means inserted between 3 and 55 have sum 348. How many means are there, and what is the fifth of them?', solution: ['Now, the sum of $n$ inserted means is $n \\times \\tfrac{3 + 55}{2} = 29n$.', 'So, $29n = 348$ gives $n = 12$.', 'Take the step: the full climb has 14 terms, so $d = \\tfrac{55 - 3}{13} = 4$.', 'Hence, there are twelve means, and the fifth is $A_5 = 3 + 5 \\times 4 = 23$.'], answer: 'twelve means; the fifth is 23' },
        { q: 'The digits of a three-digit number are in A.P. and sum to 18; the number exceeds the number formed by reversing its digits by 594. Find the number.', solution: ['Take the digits as $a - d$ (units), $a$ (tens), $a + d$ (hundreds); the number is $100(a + d) + 10a + (a - d) = 111a + 99d$ and its reversal is $111a - 99d$.', 'Now, the digit sum gives $3a = 18$, so $a = 6$.', 'So, the difference: $198d = 594$ gives $d = 3$.', 'Hence, the number is $111 \\times 6 + 99 \\times 3 = 963$ (its reversal $369$, and $963 - 369 = 594$).'], answer: '963' },
        { q: 'For a certain A.P., $S_n = 2n^2 + 3n$. Find the first term, the common difference and the 10th term.', solution: ['Now, $a_n = S_n - S_{n-1} = (2n^2 + 3n) - (2(n - 1)^2 + 3(n - 1)) = 4n + 1$.', 'So, $a_1 = 5$ and $d = a_2 - a_1 = 4$.', 'Hence, $a_{10} = 41$.'], answer: 'a = 5, d = 4, a₁₀ = 41' },
      ] },
      { level: 'L5', questions: [
        { q: 'If the pth term of an A.P. is $q$ and the qth term is $p$ ($p \\neq q$), prove that its rth term is $p + q - r$ and find the sum of its first $p + q$ terms.', solution: ['Subtract: $a_p - a_q = (p - q)d$, so $q - p = (p - q)d$ and hence $d = -1$.', 'Now, $a = a_p - (p - 1)d = q + (p - 1) = p + q - 1$.', 'So, $a_r = p + q - 1 - (r - 1) = p + q - r$.', 'Hence, $S_{p+q} = \\tfrac{p+q}{2}\\,[2(p+q-1) + (p+q-1)(-1)] = \\tfrac{(p+q)(p+q-1)}{2}$.'], answer: '$a_r = p + q - r$; $S_{p+q} = \\tfrac{(p+q)(p+q-1)}{2}$' },
        { q: 'Find the sum of all three-digit multiples of 13.', solution: ['Now, the first is $13 \\times 8 = 104$ and the last is $13 \\times 76 = 988$ (since $13 \\times 77 = 1001$).', 'Take the count: $n = 76 - 8 + 1 = 69$.', 'So, $S = \\tfrac{69}{2}(104 + 988) = 69 \\times 546 = 37{,}674$.', 'Hence, the sum is 37,674.'], answer: '37,674' },
        { q: 'The interior angles of a convex polygon are in A.P., the smallest is $100^\\circ$ and the common difference is $4^\\circ$. Find the number of sides.', solution: ['Now, the angle sum of an $n$-gon is $180(n - 2)$, and the A.P. sum is $\\tfrac{n}{2}\\,[200 + 4(n - 1)] = n(98 + 2n)$.', 'So, $n(98 + 2n) = 180(n - 2)$ gives $2n^2 - 82n + 360 = 0$, hence $n^2 - 41n + 180 = 0$ and $(n - 5)(n - 36) = 0$.', 'Now, reject $n = 36$: the largest angle would be $100 + 35 \\times 4 = 240^\\circ$, impossible for a convex polygon (interior angles stay below $180^\\circ$).', 'Hence, the polygon has 5 sides (angles $100, 104, 108, 112, 116$ — sum $540^\\circ$).'], answer: '5 sides' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove that for positive terms in A.P., $\\dfrac{1}{\\sqrt{a_1} + \\sqrt{a_2}} + \\dfrac{1}{\\sqrt{a_2} + \\sqrt{a_3}} + \\cdots + \\dfrac{1}{\\sqrt{a_{n-1}} + \\sqrt{a_n}} = \\dfrac{n-1}{\\sqrt{a_1} + \\sqrt{a_n}}$, and use it to evaluate $\\dfrac{1}{1 + \\sqrt{3}} + \\dfrac{1}{\\sqrt{3} + \\sqrt{5}} + \\dfrac{1}{\\sqrt{5} + \\sqrt{7}} + \\dfrac{1}{\\sqrt{7} + 3}$.', solution: ['Rationalise each denominator: $\\tfrac{1}{\\sqrt{a_k} + \\sqrt{a_{k+1}}} = \\tfrac{\\sqrt{a_{k+1}} - \\sqrt{a_k}}{a_{k+1} - a_k} = \\tfrac{\\sqrt{a_{k+1}} - \\sqrt{a_k}}{d}$.', 'So, the sum telescopes: $\\tfrac{\\sqrt{a_n} - \\sqrt{a_1}}{d} = \\tfrac{a_n - a_1}{d(\\sqrt{a_n} + \\sqrt{a_1})} = \\tfrac{(n-1)d}{d(\\sqrt{a_n} + \\sqrt{a_1})} = \\tfrac{n-1}{\\sqrt{a_1} + \\sqrt{a_n}}$.', 'Now, apply it to the climb $1, 3, 5, 7, 9$ ($n = 5$): the value is $\\tfrac{4}{\\sqrt{1} + \\sqrt{9}} = \\tfrac{4}{4}$.', 'Hence, the given sum equals 1.'], answer: 'the identity holds; the given sum is 1' },
        { q: 'If the sum of the first $p$ terms of an A.P. equals the sum of its first $q$ terms ($p \\neq q$), prove that the sum of its first $p + q$ terms is zero. Then find $S_{16}$ for the A.P. whose $S_5 = S_{11}$.', solution: ['Write $S_n = An^2 + Bn$ with $A = \\tfrac{d}{2}$ and $B = a - \\tfrac{d}{2}$ (the constant term is zero — the sum of an A.P. is a quadratic through the origin).', 'Now, $S_p = S_q$ gives $A(p^2 - q^2) + B(p - q) = 0$, so $(p - q)[A(p + q) + B] = 0$; since $p \\neq q$, $A(p + q) = -B$.', 'So, $S_{p+q} = A(p+q)^2 + B(p+q) = (p + q)[A(p + q) + B] = 0$.', 'Hence, for $S_5 = S_{11}$: $p + q = 16$ and $S_{16} = 0$.'], answer: 'proved; S₁₆ = 0' },
      ] },
    ] },
  ],
}

/** Lesson 5.2 — authored run 111 (2026-11-19), single-job serial order.
 *  Engines green BEFORE prose: scripts/verify-book4-ch05.ts section C
 *  47/47. Fold served: "Increasing and Decreasing G.P." (example-family,
 *  two Illustrations + the four-case table); the m2-05 module informed
 *  method shapes only — every exhibit below is our own. 4 derivations;
 *  7 formula cards; 2 figures (vivid palette); quiz keys [2,1,3,1,2];
 *  15 exercises 2/2/3/3/3/2. */
const lesson52: Lesson = {
  id: 'aa-geometric-progressions-and-the-infinite-tail',
  number: '5.2',
  title: 'Geometric Progressions and the Infinite Tail',
  concepts: [
    'geometric progression and the common ratio',
    'the general term ar^(n-1)',
    'increasing, decreasing and alternating G.P.s',
    'geometric means and their product G^n',
    'the AM-GM relation between two numbers',
    'the sum of n terms by shift-and-subtract',
    'the infinite tail: S = a/(1-r) for 0 < |r| < 1',
  ],
  objectives: [
    'Define a geometric progression, write its general term $a r^{n-1}$, and produce any named term — including sign behaviour under a negative ratio — without listing the climb.',
    'Classify a G.P. as increasing, decreasing, alternating or constant from the signs of $a$ and $r$ alone, and construct the four-case table that examinations quote.',
    'Insert geometric means between two numbers, prove that the product of $n$ inserted means is $G^n$, and recover two numbers from their arithmetic and geometric means through the relation $x = A \\pm \\sqrt{A^2 - G^2}$.',
    'Derive the sum of $n$ terms by the shift-and-subtract machine and use it at exam speed on three-term-recovery and sum-to-term problems.',
    'Prove the infinite-sum formula $S = \\tfrac{a}{1-r}$ for $0 < |r| < 1$ from the vanishing of $r^n$, and price the classic applications: recurring decimals, physical rebound totals, and sum-versus-squares-sum recovery.',
  ],
  prerequisites: ['aa-arithmetic-progressions-the-constant-climb', 'aa-the-arithmetic-geometric-mean-inequality'],
  sources: ['cengage-m2-05', 'ncert-math11-ch8-sequences-series', 'wiki-euclid-elements-ix-35', 'sep-zeno-dichotomy'],
  blocks: [
    { kind: 'para', text: 'The arithmetic progression climbed by a constant *addition* — and addition, honest as it is, cannot make anything grow fast. A single rupee placed at simple interest creeps; the same rupee at compound interest, where each year\'s interest earns the next year\'s, doubles and doubles again. The distinction is structural: in the compound world, each term is not the previous term *plus* a constant but the previous term *times* a constant. That single change — addition to multiplication — creates the second great progression family, and it comes with a gift the arithmetic family can never offer: when the multiplier is a proper fraction, the terms shrink toward nothing fast enough that infinitely many of them can have a finite sum. That gift is the infinite tail, and it is where this lesson ends.' },
    { kind: 'para', text: 'The plan: define the family and its general term; classify its growth behaviour (the fold this lesson is contractually obliged to serve); build the geometric mean machinery and its product law; derive the finite sum by the shift-and-subtract machine that replaces Gauss pairing; then let the ratio shrink and derive the infinite tail honestly — with the recurring decimal, the bouncing ball, and Zeno\'s runner as its witnesses. As always, every number below was recomputed and pinned by the chapter engine before a word of prose was written.' },

    { kind: 'heading', text: 'The Geometric Progression: the Constant Ratio' },
    { kind: 'callout', tone: 'definition', title: 'Geometric progression', text: 'A **geometric progression** (G.P.) is a sequence whose first term is non-zero and each succeeding term equals the preceding term **multiplied by a fixed non-zero constant** — the **common ratio** $r$. If the first term is $a$, the progression reads $a,\\ ar,\\ ar^2,\\ ar^3,\\ \\ldots,\\ ar^{n-1},\\ \\ldots$ with $r = \\tfrac{a_n}{a_{n-1}}$ for every $n$.' },
    { kind: 'para', text: 'Where the A.P. was *linear in the position*, the G.P. is *exponential in it*: after $n - 1$ multiplications by $r$, the term is $ar^{n-1}$. The two reflexes carry over with one change of operation — given two terms with their positions, divide (not subtract) to expose $r$; and "which term equals this value?" is an *exponential* equation in the position, solved by matching powers.' },
    { kind: 'equation', latex: 'a_n = a\\,r^{\\,n-1} \\quad \\text{(the general term; exponential in } n\\text{)}', note: 'where $r = \\tfrac{a_n}{a_{n-1}}$ — check it on any consecutive pair' },
    { kind: 'equation', latex: "a'_n = \\dfrac{l}{r^{\\,n-1}} \\quad \\text{(the } n\\text{th term counted from the end)}", note: 'counting backwards divides — the climb runs in reverse' },
    { kind: 'example', title: 'Show that $4, -12, 36, -108, \\ldots$ is a G.P.; find its 9th term and general term.', steps: [
      'Now, $\\tfrac{-12}{4} = \\tfrac{36}{-12} = \\tfrac{-108}{36} = -3$, so the sequence is a G.P. with $a = 4$ and $r = -3$.',
      'Take the 9th term: $a_9 = 4 \\cdot (-3)^{8}$ — an even power, so the sign is positive: $4 \\times 6561 = 26{,}244$.',
      'Hence, $a_n = 4(-3)^{n-1}$, and $a_9 = 26{,}244$ — under a negative ratio the sign alternates with the parity of the position.' ] },
    { kind: 'example', title: 'The 3rd term of a G.P. is 18 and the 6th is 486. Find its 10th term.', steps: [
      'Now, three ratio-steps separate the positions: $r^3 = \\tfrac{486}{18} = 27$, so $r = 3$.',
      'Take the first term: $a r^2 = 18$ gives $a \\times 9 = 18$, so $a = 2$.',
      'So, $a_{10} = 2 \\times 3^9 = 2 \\times 19{,}683 = 39{,}366$.',
      'Hence, the 10th term is 39,366.' ] },
    { kind: 'figure', caption: 'The ratio ladder: the G.P. $3, 6, 12, 24, 48, \\ldots$ ($a = 3$, $r = 2$) — each bar is the previous bar times the constant ratio $r = 2$ (the amber connectors), so growth is exponential in the position, not linear. An equal-step arithmetic climb starting from 3 falls behind these bars by the third rung — which is exactly why compound interest outruns simple interest.', svg: '<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg"><text x="20" y="28" font-size="15" fill="#166534" font-family="Georgia, serif" font-weight="bold">The ratio ladder: each rung = previous rung × r (here r = 2)</text><line x1="60" y1="250" x2="610" y2="250" stroke="#0d9488" stroke-width="2"/><line x1="60" y1="250" x2="60" y2="40" stroke="#0d9488" stroke-width="2"/><rect x="90" y="238" width="55" height="12" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/><text x="117" y="230" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">3</text><rect x="190" y="226" width="55" height="24" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/><text x="217" y="218" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">6</text><rect x="290" y="202" width="55" height="48" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/><text x="317" y="194" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">12</text><rect x="390" y="154" width="55" height="96" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/><text x="417" y="146" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">24</text><rect x="490" y="58" width="55" height="192" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/><text x="517" y="50" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">48</text><path d="M 145 244 Q 167.5 204 186 232" stroke="#d97706" stroke-width="2.4" fill="none" marker-end="url(#arrow-52)"/><text x="167.5" y="196" font-size="12.5" fill="#d97706" font-weight="bold" text-anchor="middle">×2</text><path d="M 245 232 Q 267.5 180 286 208" stroke="#d97706" stroke-width="2.4" fill="none" marker-end="url(#arrow-52)"/><text x="267.5" y="172" font-size="12.5" fill="#d97706" font-weight="bold" text-anchor="middle">×2</text><path d="M 345 208 Q 367.5 132 386 160" stroke="#d97706" stroke-width="2.4" fill="none" marker-end="url(#arrow-52)"/><text x="367.5" y="124" font-size="12.5" fill="#d97706" font-weight="bold" text-anchor="middle">×2</text><path d="M 445 160 Q 467.5 36 486 64" stroke="#d97706" stroke-width="2.4" fill="none" marker-end="url(#arrow-52)"/><text x="467.5" y="28" font-size="12.5" fill="#d97706" font-weight="bold" text-anchor="middle">×2</text><defs><marker id="arrow-52" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#d97706"/></marker></defs><text x="330" y="285" font-size="13" fill="#0d9488" text-anchor="middle">aₙ = 3·2ⁿ⁻¹ — multiplications outrun additions: an equal-step arithmetic climb falls behind by the third rung</text></svg>' },
    { kind: 'callout', tone: 'insight', title: 'The middle term owns the product', text: 'In any *odd-length* G.P. the product of all terms equals the middle term raised to the length: a 7-term G.P. with 4th term 27 has product $27^7 = 3^{21} = 10{,}460{,}353{,}203$. The reason is the mirror structure this chapter keeps re-meeting: positions equidistant from the middle multiply to the middle term squared, and the exponents sum symmetrically. Examinations price this as "the product of the first $(2k{+}1)$ terms is $T_{k+1}^{\\,2k+1}$" — one reflex, no listing.' },

    { kind: 'heading', text: 'Increasing and Decreasing G.P.s' },
    { kind: 'para', text: 'When is a G.P. *rising* and when *falling*? The arithmetic family answered this by the sign of $d$ alone; the geometric family needs both players — and the first surprise is that **the ratio must be positive for the question to even make sense**. If $r < 0$, consecutive terms carry opposite signs, so the sequence is neither increasing nor decreasing: it is *alternating*. The honest classification is therefore a four-case table, plus the alternating out-law.' },
    { kind: 'table', caption: 'The four honest cases (r > 0) — and the alternation out-law (r < 0)', head: ['Sign of first term a', 'Common ratio r', 'Behaviour of the G.P.', 'Instance'], rows: [
      ['$a > 0$', '$r > 1$', 'Increasing', '$5, 15, 45, \\ldots$'],
      ['$a > 0$', '$0 < r < 1$', 'Decreasing', '$8, 4, 2, 1, \\ldots$'],
      ['$a < 0$', '$r > 1$', 'Decreasing', '$-3, -12, -48, \\ldots$'],
      ['$a < 0$', '$0 < r < 1$', 'Increasing', '$-16, -8, -4, \\ldots$'],
      ['any $a$', '$r < 0$', 'Alternating (neither)', '$4, -12, 36, \\ldots$'],
      ['any $a$', '$r = 1$', 'Constant', '$7, 7, 7, \\ldots$'],
    ] },
    { kind: 'para', text: 'Read the table\'s logic once and it never needs memorising. Multiplying a *positive* term by $r > 1$ makes bigger positives (rising); by a fraction makes smaller positives (falling). Multiplying a *negative* term by $r > 1$ makes more deeply negative (falling); by a fraction pulls it back toward zero (rising — $-16$ to $-8$ to $-4$ is rising, since $-4 > -8$). The sign of $a$ decides which way the values face, and the size of $r$ decides whether the magnitude grows or shrinks.' },
    { kind: 'example', title: 'Classify each G.P. as increasing, decreasing or alternating, with reasons: (i) $5, 15, 45, \\ldots$ (ii) $8, 4, 2, 1, \\ldots$ (iii) $-3, -12, -48, \\ldots$ (iv) $-16, -8, -4, \\ldots$', steps: [
      '(i) Now, $a = 5 > 0$ and $r = 3 > 1$: positive terms growing in magnitude — increasing.',
      '(ii) Here $a = 8 > 0$ and $r = \\tfrac{1}{2} \\in (0,1)$: positive terms shrinking toward zero — decreasing.',
      '(iii) Now, $a = -3 < 0$ and $r = 4 > 1$: negative terms deepening — decreasing (note $-48 < -12$: falling means falling on the number line).',
      '(iv) Here $a = -16 < 0$ and $r = \\tfrac{1}{2}$: negatives pulled back toward zero — increasing ($-4 > -8$).' ] },
    { kind: 'example', title: 'A G.P. has first term 729 and common ratio $\\tfrac{1}{3}$. Which is the first term below 1, and how many terms exceed 10?', steps: [
      'Now, $a_n = 729 \\cdot \\left(\\tfrac{1}{3}\\right)^{n-1} = 3^{\\,7 - n}$ — the exponent falls by 1 each step (a decreasing G.P. by the table: $a > 0$, $0 < r < 1$).',
      'Take the first term below 1: $3^{7-n} < 1$ needs $7 - n < 0$, so $n \\geq 8$, and the term is $a_8 = 3^{-1} = \\tfrac{1}{3}$.',
      'Take the terms above 10: $3^{7-n} > 10$ needs $7 - n > \\log_3 10 \\approx 2.096$, so $n < 4.9$: the first four terms $729, 243, 81, 27$ — exactly four terms exceed 10.',
      'Hence, the first term below 1 is $\\tfrac{1}{3}$ (the 8th), and exactly 4 terms exceed 10 — a decreasing G.P. crosses every threshold exactly once.' ] },
    { kind: 'callout', tone: 'warn', title: 'Caution: "increasing" lives on the number line, not on magnitudes', text: 'The commonest misclassification is reading $-3, -12, -48$ as "increasing because the magnitudes grow". Increasing means each term is *greater* than its predecessor: $-12 < -3$, so the G.P. is decreasing. When the terms are negative, growing magnitude and falling value are the same event.' },
    { kind: 'para', text: 'The alternation out-law has a companion reading worth owning: an alternating G.P. (r < 0) is never increasing or decreasing, but its family of *absolute values* is itself a G.P. — with the positive ratio $|r|$ — and is always honestly classifiable. When a question asks about the *size* of an alternating family\'s terms, translate once (absolute values) and re-enter the four-case table.' },
    { kind: 'example', title: 'The G.P. $3, -6, 12, -24, \ldots$: classify the family, and classify the family of its absolute values.', steps: [
      'Now, $r = \tfrac{-6}{3} = -2 < 0$: consecutive terms carry opposite signs — the family is alternating (neither increasing nor decreasing).',
      'Take the absolute values: $3, 6, 12, 24, \ldots$ — a G.P. with $a = 3 > 0$ and $|r| = 2 > 1$: increasing, by the first row of the table.',
      'Hence, the original family alternates, while its magnitudes climb — the two classifications answer two different questions, and the honest answer names both.' ] },


    { kind: 'para', text: 'One parametrisation habit carries over from the arithmetic family with the operation exchanged: three positive terms of a G.P. are best taken as $\\tfrac{b}{r},\\ b,\\ br$ rather than as $x, y, z$. The product immediately fixes the middle term ($b^3$), the sum then prices the ratio, and one quadratic serves the whole problem — the multiplicative mirror of taking three arithmetic terms as $a - d,\\ a,\\ a + d$, where the *sum* fixed the middle and the product priced the difference. Four terms, when a product is involved, go as $\\tfrac{a}{r^3},\\ \\tfrac{a}{r},\\ ar,\\ ar^3$ — the product pins $a^4$ at once.' },
    { kind: 'example', title: 'Three numbers in G.P. have sum 31 and product 125. Find them.', steps: [
      'Take the parametrisation $\\tfrac{b}{r},\\ b,\\ br$: the product is $b^3 = 125$, so $b = 5$ — the middle term falls first.',
      'Now, the sum is $5\\left(\\tfrac{1}{r} + 1 + r\\right) = 31$, so $\\tfrac{1}{r} + r = \\tfrac{26}{5}$.',
      'So, $5r^2 - 26r + 5 = 0$ gives $(5r - 1)(r - 5) = 0$, hence $r = 5$ or $\\tfrac{1}{5}$.',
      'Hence, the numbers are $1, 5, 25$ — the two roots give the same family read in opposite directions (sum $31$, product $125$, both honest).' ] },
    { kind: 'heading', text: 'Geometric Means and the AM-GM Relation' },
    { kind: 'callout', tone: 'definition', title: 'Geometric mean; insertion of n geometric means', text: 'The **geometric mean** of two positive numbers $a$ and $b$ is $G = \\sqrt{ab}$ — the number making $a, G, b$ a G.P. If $n$ numbers $G_1, \\ldots, G_n$ are inserted so that $a, G_1, \\ldots, G_n, b$ is a G.P. (of $n + 2$ terms), they are **$n$ geometric means between $a$ and $b$**, with ratio $r = \\left(\\tfrac{b}{a}\\right)^{1/(n+1)}$.' },
    { kind: 'para', text: 'Chapter 4.1 proved the order $A \\geq G$ for two positive numbers — the arithmetic mean of a pair is never smaller than the geometric mean, equality exactly when the pair coincides. This lesson builds the *converse machinery*: given the two means, recover the pair.' },
    { kind: 'derivation', title: 'Recovering two numbers from their two means', statement: 'If two positive numbers have arithmetic mean $A$ and geometric mean $G$, the pair is fully determined: the numbers are the roots of the quadratic $x^2 - 2Ax + G^2 = 0$, namely $A \\pm \\sqrt{A^2 - G^2}$.', steps: [
      { label: 'Name the pair', formula: 'x + y = 2A \\quad \\text{and} \\quad xy = G^2', explanation: 'The two means hand you the sum and the product of the pair directly.' },
      { label: 'Build the quadratic', formula: 'x^2 - (x + y)\\,x + xy = 0 \\Rightarrow\\ x^2 - 2Ax + G^2 = 0', explanation: 'Two numbers with a known sum and product are the roots of $x^2 - (\\text{sum})x + (\\text{product}) = 0$ — chapter 2\'s toolkit.' },
      { label: 'Read the roots', formula: 'x = \\dfrac{2A \\pm \\sqrt{4A^2 - 4G^2}}{2}', explanation: 'The quadratic formula on the known-sum, known-product equation.' },
      { label: 'Simplify', formula: 'x = A \\pm \\sqrt{A^2 - G^2}', explanation: 'Halve; the discriminant is $4(A^2 - G^2)$, non-negative exactly by the $A \\geq G$ order of chapter 4.1.' },
    ], result: '$x = A + \\sqrt{A^2 - G^2}$ and $y = A - \\sqrt{A^2 - G^2}$ — the pair recovered from its means' },
    { kind: 'para', text: 'The discriminant sentence is the honest bridge to chapter 4: the recovery *works* precisely because $A \\geq G$ always holds; when given "means" violate it (say $A = 5, G = 6$), no real pair exists — the quadratic\'s roots go complex. Examinations occasionally set exactly that trap, and the discriminant catches it in one glance.' },
    { kind: 'example', title: 'Two positive numbers have arithmetic mean 13 and geometric mean 12. Find them.', steps: [
      'Now, $x = A + \\sqrt{A^2 - G^2} = 13 + \\sqrt{169 - 144} = 13 + 5 = 18$ and $y = 13 - 5 = 8$.',
      'So, check both means: $\\tfrac{18 + 8}{2} = 13$ and $\\sqrt{18 \\times 8} = \\sqrt{144} = 12$.',
      'Hence, the numbers are 8 and 18.' ] },
    { kind: 'derivation', title: 'The product of inserted geometric means', statement: 'The product of the $n$ geometric means inserted between $a$ and $b$ equals $G^n$, where $G = \\sqrt{ab}$ is the single geometric mean — the mirror of lesson 5.1\'s sum law for arithmetic means.', steps: [
      { label: 'Name the inserted ladder', formula: 'a,\\ ar,\\ ar^2,\\ \\ldots,\\ ar^n,\\ b \\text{ with } r^{n+1} = \\tfrac{b}{a}', explanation: 'The means are the interior rungs; the ratio satisfies $b = a r^{n+1}$.' },
      { label: 'Multiply all means', formula: '(ar)(ar^2) \\cdots (ar^n) = a^n r^{1 + 2 + \\cdots + n}', explanation: 'Each mean contributes one $a$; the exponents of $r$ run 1 through $n$.' },
      { label: 'Sum the exponents', formula: '1 + 2 + \\cdots + n = \\dfrac{n(n+1)}{2}', explanation: 'The triangular number — the same Gauss pairing of lesson 5.1, now applied to exponents.' },
      { label: 'Substitute the ratio', formula: 'a^n r^{\\frac{n(n+1)}{2}} = a^n \\left(r^{n+1}\\right)^{\\frac{n}{2}}', explanation: 'Fold the exponent law: $r^{n(n+1)/2} = (r^{n+1})^{n/2}$.' },
      { label: 'Close with the endpoints', formula: 'a^n \\left(\\dfrac{b}{a}\\right)^{n/2} = (ab)^{n/2} = \\left(\\sqrt{ab}\\right)^n', explanation: 'The $a$-powers halve into both endpoints; the product lands on the single mean raised to $n$.' },
    ], result: '$G_1 G_2 \\cdots G_n = (ab)^{n/2} = G^n$ — the product of the means is the mean\'s power' },
    { kind: 'example', title: 'Insert three geometric means between 2 and 162.', steps: [
      'Now, the full ladder has five terms: $2, g_1, g_2, g_3, 162$ with $2 r^4 = 162$, so $r^4 = 81$ and $r = 3$.',
      'So, the means are $g_1 = 2 \\times 3 = 6$, $g_2 = 2 \\times 9 = 18$ and $g_3 = 2 \\times 27 = 54$.',
      'Hence, the three means are $6, 18, 54$ — and as the law promises, their product $6 \\times 18 \\times 54 = 5832 = 18^3 = (\\sqrt{2 \\times 162})^3$.' ] },
    { kind: 'callout', tone: 'theorem', title: 'Product of geometric means inserted between two numbers', text: 'If $G_1, \\ldots, G_n$ are the $n$ geometric means inserted between $a$ and $b$, then $G_1 G_2 \\cdots G_n = \\left(\\sqrt{ab}\\right)^n = G^n.$ The mirror of the arithmetic law: there, the *sum* of the means is $n$ copies of the mean; here, the *product* of the means is the mean\'s own $n$th power. Addition and multiplication trade roles throughout.' },

    { kind: 'heading', text: 'The Sum of Terms: Shift and Subtract' },
    { kind: 'para', text: 'Gauss paired the arithmetic climb because its mirror pairs matched. The geometric climb\'s mirror pairs do *not* match — but its terms *shift*: each term is the previous one times $r$. So the machine is not add-the-reverse but **multiply-and-subtract**: the same move that clears decimals from equations, here promoted to a summation engine. Euclid\'s Elements already carries the finite-sum formula for continued proportion (Book IX, Proposition 35) — the result below is twenty-three centuries old.' },
    { kind: 'derivation', title: 'The sum of n terms of a G.P.', statement: 'For a G.P. with first term $a \\neq 0$ and ratio $r \\neq 1$, the sum of the first $n$ terms admits one closed form (in two guises).', steps: [
      { label: 'Write the sum', formula: 'S_n = a + ar + ar^2 + \\cdots + ar^{n-2} + ar^{n-1}', explanation: 'The climb read in order — note the last exponent is $n - 1$.' },
      { label: 'Shift it: multiply by r', formula: 'r S_n = ar + ar^2 + \\cdots + ar^{n-1} + ar^{n}', explanation: 'Each term moves one place to the right; a fresh leading term $ar^n$ enters.' },
      { label: 'Subtract', formula: 'S_n - rS_n = a - ar^{n}', explanation: 'All interior terms $ar, \\ldots, ar^{n-1}$ cancel — the entire middle of the ladder vanishes.' },
      { label: 'Factor both sides', formula: 'S_n (1 - r) = a\\left(1 - r^{n}\\right)', explanation: 'Left: the common factor $S_n$. Right: the two surviving boundary terms.' },
      { label: 'Divide', formula: 'S_n = \\dfrac{a(1 - r^n)}{1 - r} = a\\left(\\dfrac{r^n - 1}{r - 1}\\right)', explanation: 'The two guises — pick the one whose numerator stays positive for your $r$.' },
    ], result: '$S_n = \\dfrac{a(1 - r^n)}{1 - r} = a \\cdot \\dfrac{r^n - 1}{r - 1}$ — for $r \\neq 1$; and $S_n = na$ when $r = 1$' },
    { kind: 'para', text: 'The engine swept this formula against brute-force addition on a grid of twelve (a, r, n) combinations — including negative ratios — before the prose existed. Two habits make it exam-fast: three given terms usually expose $r$ by division before any summing; and when a *sum* $S_n$ is given as a formula in $n$, the term is the difference $a_n = S_n - S_{n-1}$, exactly as in the arithmetic family.' },
    { kind: 'example', title: 'Find the sum of the first 8 terms of the G.P. $5, 15, 45, \\ldots$.', steps: [
      'Now, $a = 5$, $r = 3$ and $n = 8$: $S_8 = \\tfrac{5(3^8 - 1)}{3 - 1} = \\tfrac{5(6561 - 1)}{2}$.',
      'So, $S_8 = \\tfrac{5 \\times 6560}{2} = 5 \\times 3280 = 16{,}400$.',
      'Hence, the sum of the first 8 terms is 16,400.' ] },
    { kind: 'example', title: 'If $S_n = 2^{n+1} - 2$ for a G.P., find its first term, its ratio and its 5th term.', steps: [
      'Now, $a_n = S_n - S_{n-1} = (2^{n+1} - 2) - (2^n - 2) = 2^n$.',
      'So, the terms are $2, 4, 8, 16, \\ldots$ — a G.P. with $a = 2$ and $r = 2$ (verify honestly: $S_3 = 2^4 - 2 = 14 = 2 + 4 + 8$).',
      'Hence, $a = 2$, $r = 2$, and $a_5 = 2^5 = 32$.' ] },
    { kind: 'callout', tone: 'exam', title: 'Where the examinations price this family', text: 'JEE Main and CUET quote the four-case table directly ("the G.P. $a, ar, ar^2, \ldots$ with $a > 0$ is decreasing if and only if…"), price the recovery pair ("A.M. $m$, G.M. $n$ — the ratio of the numbers is…"), and set the infinite tail in costume: recurring decimals, rebound totals, and "each term is $k$ times the sum of all following terms". The three costumes share one undressing: name $a$, name $r$, check the licence $|r| < 1$, then let $\tfrac{a}{1-r}$ speak. The NCERT Class 11 chapter on Sequences and Series carries the same spine — the school canon and the competitive canon agree on this family.' },


    { kind: 'heading', text: 'The Infinite Tail' },
    { kind: 'para', text: 'Now the gift. When $0 < |r| < 1$, the terms shrink toward zero *fast* — and the sum formula\'s tail term $r^n$ dies as $n$ grows. Watch it happen on the honest ladder $8, 6, 4.5, 3.375, \\ldots$ (ratio $\\tfrac{3}{4}$): the partial sums read $8, 14, 18.5, 21.875, 24.40625, \\ldots$ — each step adds less, and the running total closes in on a ceiling it never reaches: $32$.' },
    { kind: 'derivation', title: 'The sum of an infinite G.P.', statement: 'For $0 < |r| < 1$, the infinite geometric series $a + ar + ar^2 + \\cdots$ has a finite sum $\\tfrac{a}{1-r}$ — the infinite tail.', steps: [
      { label: 'Start from the finite form', formula: 'S_n = \\dfrac{a(1 - r^n)}{1 - r} = \\dfrac{a}{1-r} - \\dfrac{a r^n}{1-r}', explanation: 'Split the numerator: a constant piece and a *dying* piece.' },
      { label: 'Watch the dying piece die', formula: 'r^n \\to 0 \\text{ as } n \\to \\infty \\quad (0 < |r| < 1)', explanation: 'A number smaller than 1 in magnitude, multiplied by itself forever, shrinks to nothing — the engine pinned this numerically: $0.95^{60} < 0.1$.' },
      { label: 'The tail vanishes', formula: '\\dfrac{a r^n}{1-r} \\to 0', explanation: 'A bounded factor times a dying factor dies.' },
      { label: 'The constant survives alone', formula: 'S = \\lim_{n \\to \\infty} S_n = \\dfrac{a}{1 - r}', explanation: 'The partial sums close in on the constant piece — finite, exact, and never actually reached by any finite $n$.' },
    ], result: '$S = \\dfrac{a}{1 - r}$ for $0 < |r| < 1$ — infinitely many terms, one finite number' },
    { kind: 'figure', caption: 'The infinite tail closing in: the partial sums of $8 + 6 + 4.5 + 3.375 + \\cdots$ (ratio $\\tfrac{3}{4}$) rise through $8, 14, 18.5, 21.875, 24.40625, \\ldots$ toward the ceiling $S = \\tfrac{8}{1 - 3/4} = 32$ (the dashed line) — each new bar adds less than the last, and the gap to the ceiling shrinks by the factor $\\tfrac{3}{4}$ at every rung. The sums never *reach* 32; the limit is what they deserve, not what they attain.', svg: '<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg"><text x="20" y="28" font-size="15" fill="#166534" font-family="Georgia, serif" font-weight="bold">The infinite tail: partial sums closing in on S = a/(1−r) = 32</text><line x1="60" y1="255" x2="610" y2="255" stroke="#0d9488" stroke-width="2"/><line x1="60" y1="255" x2="60" y2="40" stroke="#0d9488" stroke-width="2"/><line x1="60" y1="45" x2="610" y2="45" stroke="#ea580c" stroke-width="2.6" stroke-dasharray="8 6"/><text x="575" y="38" font-size="14" fill="#ea580c" text-anchor="end" font-weight="bold">the ceiling S = 32</text><g stroke="#16a34a" stroke-width="1.6"><rect x="85" y="195" width="34" height="60" fill="#fef3c7"/><rect x="125" y="150" width="34" height="105" fill="#fef3c7"/><rect x="165" y="121" width="34" height="134" fill="#fef3c7"/><rect x="205" y="99" width="34" height="156" fill="#fef3c7"/><rect x="245" y="83" width="34" height="172" fill="#fef3c7"/></g><text x="102" y="250" font-size="11" fill="#166534" text-anchor="middle">8</text><text x="142" y="145" font-size="11" fill="#166534" text-anchor="middle">14</text><text x="182" y="116" font-size="11" fill="#166534" text-anchor="middle">18.5</text><text x="222" y="94" font-size="11" fill="#166534" text-anchor="middle">21.9</text><text x="262" y="77" font-size="11" fill="#166534" text-anchor="middle">24.4</text><path d="M 102 195 Q 180 100 262 83" stroke="#d97706" stroke-width="2.2" fill="none" stroke-dasharray="4 4"/><path d="M 285 83 L 285 48" stroke="#dc2626" stroke-width="2" marker-end="url(#arrow-52b)"/><defs><marker id="arrow-52b" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#dc2626"/></marker></defs><text x="322" y="65" font-size="12.5" fill="#dc2626">the gap shrinks by ×3/4 each rung</text><text x="330" y="255" font-size="13" fill="#0d9488">…8, 14, 18.5, 21.875, 24.40625, … → 32, never attained</text><text x="330" y="285" font-size="13" fill="#0f766e">each added term = previous × 3/4</text></svg>' },
    { kind: 'callout', tone: 'warn', title: 'Caution: the formula lies outside its kingdom', text: 'For $|r| \\geq 1$ the infinite sum does not exist: $r^n$ refuses to die, and the partial sums climb without ceiling ($1 + 2 + 4 + \\cdots$) or refuse to settle ($1 + 1 + 1 + \\cdots$; and $1 - 1 + 1 - \\cdots$ oscillates). The condition $0 < |r| < 1$ is not decoration — it is the licence for the whole derivation. A negative ratio *inside* the kingdom is fine: $9 - 6 + 4 - \\cdots$ converges because $|{-\\tfrac23}| < 1$.' },
    { kind: 'example', title: 'Find the sums to infinity: (i) $12 + 4 + \\tfrac{4}{3} + \\cdots$ (ii) $9 - 6 + 4 - \\tfrac{8}{3} + \\cdots$', steps: [
      '(i) Now, $r = \\tfrac{4}{12} = \\tfrac{1}{3}$, so $S = \\tfrac{12}{1 - \\tfrac{1}{3}} = \\tfrac{12}{\\tfrac{2}{3}} = 12 \\times \\tfrac{3}{2} = 18$.',
      '(ii) Here, $r = -\\tfrac{6}{9} = -\\tfrac{2}{3}$, so $S = \\tfrac{9}{1 - (-\\tfrac{2}{3})} = \\tfrac{9}{\\tfrac{5}{3}} = 9 \\times \\tfrac{3}{5} = \\tfrac{27}{5} = 5.4$.',
      'Hence, the sums are 18 and $\\tfrac{27}{5}$ — the second converges *because* $|{-\\tfrac{2}{3}}| < 1$, alternating while shrinking.' ] },
    { kind: 'example', title: 'Express as fractions: (i) $0.\\overline{7}$ (ii) $0.1\\overline{6}$.', steps: [
      '(i) Now, $0.\\overline{7} = \\tfrac{7}{10} + \\tfrac{7}{100} + \\tfrac{7}{1000} + \\cdots$ — a G.P. with $a = \\tfrac{7}{10}$ and $r = \\tfrac{1}{10}$, so $S = \\tfrac{\\tfrac{7}{10}}{1 - \\tfrac{1}{10}} = \\tfrac{7/10}{9/10} = \\tfrac{7}{9}$.',
      '(ii) Here, $0.1\\overline{6} = \\tfrac{1}{10} + \\left(\\tfrac{6}{100} + \\tfrac{6}{1000} + \\cdots\\right)$: the shifting tail is a G.P. with $a = \\tfrac{6}{100}$ and $r = \\tfrac{1}{10}$, whose sum is $\\tfrac{6/100}{9/10} = \\tfrac{6}{90} = \\tfrac{1}{15}$.',
      'So, the total is $\\tfrac{1}{10} + \\tfrac{1}{15} = \\tfrac{3}{30} + \\tfrac{2}{30} = \\tfrac{5}{30} = \\tfrac{1}{6}$.',
      'Hence, $0.\\overline{7} = \\tfrac{7}{9}$ and $0.1\\overline{6} = \\tfrac{1}{6}$ — every recurring decimal is an infinite G.P. wearing decimal clothes.' ] },
    { kind: 'callout', tone: 'insight', title: 'The honest 0.9 with a bar', text: 'Run the same machine on $0.\\overline{9}$: it is the G.P. $\\tfrac{9}{10} + \\tfrac{9}{100} + \\tfrac{9}{1000} + \\cdots$ with sum $\\tfrac{9/10}{1 - 1/10} = \\tfrac{9/10}{9/10} = 1$ — so $0.\\overline{9}$ *equals* 1, not merely approaches it. There is no gap to close: the infinite tail is the number whose partial sums deserve the ceiling. The same sentence answers the sceptic who insists "$0.\\overline{9}$ is a little below 1" — a little below 1 would be a *finite* tail, and this one is not finite.' },

    { kind: 'example', title: 'A ball is dropped from 27 m and rebounds to $\\tfrac{2}{3}$ of the height it fell from. Find the total distance it travels before coming to rest.', steps: [
      'Now, the pattern: it falls 27, rises $\\tfrac{2}{3} \\times 27 = 18$, falls 18, rises 12, falls 12, … — each journey after the first pairs a rise and a fall of the same height.',
      'So, the total distance $= 27 + 2\\left(18 + 12 + 8 + \\cdots\\right)$ — the bracket is a G.P. with $a = 18$, $r = \\tfrac{2}{3}$, summing to $\\tfrac{18}{1 - \\tfrac{2}{3}} = 54$.',
      'Hence, the total distance is $27 + 2 \\times 54 = 135$ m — infinitely many bounces, one finite answer.' ] },
    { kind: 'example', title: 'The sum of an infinite G.P. is 15 and the sum of the squares of its terms is 45. Find the first term and the ratio.', steps: [
      'Now, $\\tfrac{a}{1 - r} = 15$ and — squaring every term turns the ratio into $r^2$ — $\\tfrac{a^2}{1 - r^2} = 45$.',
      'So, square the first equation: $\\tfrac{a^2}{(1 - r)^2} = 225$, and divide the second by it: $\\tfrac{(1 - r)^2}{1 - r^2} = \\tfrac{45}{225} = \\tfrac{1}{5}$.',
      'Now, $\\tfrac{1 - r}{1 + r} = \\tfrac{1}{5}$ gives $5 - 5r = 1 + r$, so $6r = 4$ and $r = \\tfrac{2}{3}$.',
      'Hence, $a = 15\\left(1 - \\tfrac{2}{3}\\right) = 5$ — the G.P. is $5, \\tfrac{10}{3}, \\tfrac{20}{9}, \\ldots$ (check: $\\tfrac{5}{1/3} = 15$; squares: $\\tfrac{25}{1 - 4/9} = \\tfrac{25 \\times 9}{5} = 45$).' ] },
    { kind: 'callout', tone: 'historical', title: 'Zeno\'s runner, and the twenty-three-century answer', text: 'Zeno of Elea argued that motion is impossible: to finish a course you must first finish half of it, and first a quarter of that half, and so on *forever* — infinitely many tasks before any arrival. The dichotomy (as Aristotle catalogued it) generates the infinite series $\\tfrac{1}{2} + \\tfrac{1}{4} + \\tfrac{1}{8} + \\cdots$, and the modern resolution is exactly this lesson\'s theorem: that series *converges* — its sum is the finite number 1, the whole course. The runner finishes because the tasks, though endless, are also endlessly cheap. What Zeno\'s paradox actually forced mathematics to build — the convergent infinite series — is the machinery every infinite tail in this book rides on.' },

    { kind: 'heading', text: 'The Two Climbings, Side by Side' },
    { kind: 'para', text: 'The chapter\'s two progressions are one story told with two operations. The A.P. adds a constant; its general term is linear; its mirror pairs match, so Gauss *adds the reverse*; its inserted means *sum* to $n$ copies of the single mean; and no infinite arithmetic climb ever sums to a finite ceiling. The G.P. multiplies by a constant; its general term is exponential; its terms shift, so the machine *shifts and subtracts*; its inserted means *multiply* to the mean\'s own $n$th power; and when the ratio is a proper fraction, its infinite tail converges. Every theorem of this pair of lessons is the same theorem, with addition and multiplication exchanged — and the chapter\'s later families (harmonic progressions, arithmetico-geometric hybrids, the special sums) live exactly on that duality\'s border.' },
    { kind: 'table', caption: 'The two climbings, one story, two operations — the chapter\'s spine in one view', head: ['The question', 'Arithmetic progression', 'Geometric progression'], rows: [
      ['the constant', 'a difference $d$ (addition)', 'a ratio $r$ (multiplication)'],
      ['the general term', '$a_n = a + (n-1)d$ — linear', '$a_n = ar^{n-1}$ — exponential'],
      ['the sum machine', 'Gauss: add the reverse, pair the ends', 'shift-and-subtract: $rS_n - S_n$'],
      ['the sum formula', '$\\tfrac{n}{2}[2a + (n-1)d] = \\tfrac{n}{2}(a+l)$', '$\\tfrac{a(1-r^n)}{1-r}$; $na$ when $r=1$'],
      ['the means law', 'sum of $n$ A.M.s $= n \\times$ the single mean', 'product of $n$ G.M.s $= G^n$'],
      ['three-term parametrisation', '$a-d,\\ a,\\ a+d$ — sum pins the middle', '$\\tfrac{b}{r},\\ b,\\ br$ — product pins the middle'],
      ['growth ceiling', 'none — a constant step sums forever without bound', 'converges: $S = \\tfrac{a}{1-r}$ when $0 < |r| < 1$'],
      ['the classic trap', 'reading $S_n$ as a quadratic in $n$', 'the $|r| < 1$ licence — outside it, no infinite sum exists'],
    ] },

    { kind: 'formula', name: 'General term of a G.P.', latex: 'a_n = a\\,r^{\\,n-1}', note: 'exponential in the position; from the end, $a\'_n = l/r^{n-1}$' },
    { kind: 'formula', name: 'Sum of n terms', latex: 'S_n = \\dfrac{a(1 - r^n)}{1 - r} \\quad (r \\neq 1); \\qquad S_n = na \\quad (r = 1)', note: 'the shift-and-subtract machine — Euclid IX.35' },
    { kind: 'formula', name: 'The infinite tail', latex: 'S = \\dfrac{a}{1 - r} \\quad \\text{for } 0 < |r| < 1', note: 'infinitely many terms, one finite number; outside the kingdom, no sum exists' },
    { kind: 'formula', name: 'Geometric mean and insertion', latex: 'G = \\sqrt{ab}, \\qquad r = \\left(\\dfrac{b}{a}\\right)^{1/(n+1)} \\text{ for } n \\text{ means}', note: 'the kth mean is $a\\,(b/a)^{k/(n+1)}$' },
    { kind: 'formula', name: 'Product of inserted geometric means', latex: 'G_1 G_2 \\cdots G_n = \\left(\\sqrt{ab}\\right)^n = G^n', note: 'the mirror of the arithmetic sum law — product for the multiplicative family' },
    { kind: 'formula', name: 'The AM-GM recovery', latex: 'x = A \\pm \\sqrt{A^2 - G^2}', note: 'the pair from its two means; real exactly because $A \\geq G$' },
    { kind: 'formula', name: 'The middle-term product', latex: '\\prod_{k=1}^{2m+1} a_k = \\left(a_{m+1}\\right)^{2m+1}', note: 'odd-length G.P.: the product is the middle term to the length' },
    { kind: 'terms', items: [
      { term: 'geometric progression (G.P.)', def: 'a sequence whose first term is non-zero and each term is the previous times a fixed ratio $r$: $a, ar, ar^2, \\ldots$' },
      { term: 'common ratio', def: 'the constant $r = a_n / a_{n-1}$; positive for monotone families, negative for alternating ones' },
      { term: 'increasing / decreasing G.P.', def: 'with $r > 0$: rising when $a > 0, r > 1$ or $a < 0, 0 < r < 1$; falling in the other two cases; $r < 0$ is alternating (neither)' },
      { term: 'geometric mean', def: 'of positive $a, b$: the number $G = \\sqrt{ab}$ making $a, G, b$ a G.P.; $n$ means insert with ratio $(b/a)^{1/(n+1)}$' },
      { term: 'product law for inserted means', def: 'the product of the $n$ geometric means between $a$ and $b$ is exactly $G^n$ where $G = \\sqrt{ab}$' },
      { term: 'convergent infinite G.P.', def: 'a G.P. with $0 < |r| < 1$, whose infinite sum exists and equals $\\tfrac{a}{1-r}$' },
      { term: 'the infinite tail', def: 'the vanishing terms beyond any finite cut — what the partial sums close in on and never reach' },
      { term: 'alternating G.P.', def: 'a G.P. with $r < 0$: consecutive terms carry opposite signs; converges when $|r| < 1$ (e.g. $9 - 6 + 4 - \\cdots$)' },
    ] },
    { kind: 'quiz', items: [
      { q: 'The fifth term of the G.P. $3, 6, 12, 24, \\ldots$ is', options: ['24', '36', '48', '96'], answer: 2, explain: '$a_5 = 3 \\times 2^4 = 48$. Option 24 is the fourth term (an off-by-one on the exponent); 36 mistakes the ratio for 1.5 (an arithmetic read); 96 double-counts one shift.' },
      { q: 'A G.P. of positive terms with first term 10 is decreasing exactly when', options: ['r > 1', '0 < r < 1', '-1 < r < 0', 'r < -1'], answer: 1, explain: 'positive terms multiplied by a fraction shrink toward zero. $r > 1$ grows them; negative ratios make the family alternating, not decreasing; $r < -1$ alternates *and* grows in magnitude.' },
      { q: 'The geometric mean of 5 and 45 is', options: ['25', '9', '12', '15'], answer: 3, explain: '$\\sqrt{5 \\times 45} = \\sqrt{225} = 15$. Option 25 is the arithmetic mean — the chapter 4 order $A > G$ itself rules it out for distinct numbers; 9 mis-multiplies; 12 is a near-midpoint guess that satisfies no mean formula.' },
      { q: 'The sum of infinitely many terms of $6 + 2 + \\tfrac{2}{3} + \\cdots$ is', options: ['8', '9', '10', '12'], answer: 1, explain: '$r = \\tfrac{2}{6} = \\tfrac{1}{3}$, so $S = \\tfrac{6}{1 - 1/3} = 9$. Option 8 stops one term early (a partial sum); 10 and 12 come from mis-dividing by $1 - r$ or by using $r$ itself as the denominator.' },
      { q: 'Three geometric means are inserted between 5 and 405. Their product is', options: ['45', '2025', '91,125', '135'], answer: 2, explain: 'the product is $G^3$ with $G = \\sqrt{5 \\times 405} = \\sqrt{2025} = 45$, so $45^3 = 91{,}125$. Option 45 forgets the exponent; 2025 uses $G^2$ (two means would give that); 135 is the last mean ($5 \\times 27$), not the product.' },
    ] },
    { kind: 'exercises', sets: [
      { level: 'L1', questions: [
        { q: 'Find the 10th term of the G.P. $7, 21, 63, \\ldots$.', solution: ['Now, $a = 7$ and $r = 3$.', 'So, $a_{10} = 7 \\times 3^9 = 7 \\times 19{,}683$.', 'Hence, $a_{10} = 137{,}781$.'], answer: '137,781' },
        { q: 'Which term of the G.P. $2, 6, 18, \\ldots$ equals 4374?', solution: ['Now, $2 \\times 3^{n-1} = 4374$ gives $3^{n-1} = 2187 = 3^7$.', 'So, $n - 1 = 7$, hence $n = 8$.', 'Hence, the 8th term equals 4374.'], answer: 'the 8th term' },
      ] },
      { level: 'L2', questions: [
        { q: 'The second term of a G.P. is 12 and the fifth is 324. Find the first term and the eighth term.', solution: ['Now, $r^3 = \\tfrac{324}{12} = 27$, so $r = 3$.', 'Take the first term: $a \\times 3 = 12$ gives $a = 4$.', 'So, $a_8 = 4 \\times 3^7 = 4 \\times 2187 = 8748$.', 'Hence, $a = 4$ and the 8th term is 8748.'], answer: 'a = 4; the 8th term is 8748' },
        { q: 'Find the sum of the first 9 terms of the G.P. $6, 18, 54, \\ldots$.', solution: ['Now, $a = 6$ and $r = 3$: $S_9 = \\tfrac{6(3^9 - 1)}{3 - 1} = 3(19{,}683 - 1)$.', 'So, $S_9 = 3 \\times 19{,}682 = 59{,}046$.', 'Hence, the sum of the first 9 terms is 59,046.'], answer: '59,046' },
      ] },
      { level: 'L3', questions: [
        { q: 'Insert two geometric means between 3 and 24, and verify the product law.', solution: ['Now, the ladder $3, g_1, g_2, 24$ has $3r^3 = 24$, so $r^3 = 8$ and $r = 2$.', 'So, $g_1 = 6$ and $g_2 = 12$.', 'Hence, the means are 6 and 12, and their product $72 = (\\sqrt{3 \\times 24})^2 = (\\sqrt{72})^2$ — the product law $G^2$ holds.'], answer: 'means 6 and 12; product 72 = G²' },
        { q: 'Classify the G.P. $1, r, r^2, \\ldots$ (first term 1) for every value of $r$: increasing, decreasing, alternating or constant?', solution: ['Take the four-case table with $a = 1 > 0$.', 'Now, $r > 1$: positive terms growing — increasing. $0 < r < 1$: shrinking toward zero — decreasing.', 'So, $r < 0$: opposite-sign consecutive terms — alternating; $r = 1$: every term equals 1 — constant.', 'Hence: increasing for $r > 1$, decreasing for $0 < r < 1$, alternating for $r < 0$, constant for $r = 1$ (and $r = 0$ degenerates to $1, 0, 0, \\ldots$, outside the definition).'], answer: 'increasing r > 1; decreasing 0 < r < 1; alternating r < 0; constant r = 1' },
        { q: 'The arithmetic mean of two positive numbers is 25 and their geometric mean is 24. Find the numbers.', solution: ['Now, the recovery: $x = 25 \\pm \\sqrt{25^2 - 24^2} = 25 \\pm \\sqrt{625 - 576} = 25 \\pm 7$.', 'So, the numbers are 32 and 18.', 'Hence, check: $\\tfrac{32 + 18}{2} = 25$ and $\\sqrt{32 \\times 18} = \\sqrt{576} = 24$.'], answer: '18 and 32' },
      ] },
      { level: 'L4', questions: [
        { q: 'Express $0.4\\overline{8}$ (that is, 0.4888…) as a fraction in lowest terms.', solution: ['Now, $0.4\\overline{8} = \\tfrac{4}{10} + \\left(\\tfrac{8}{100} + \\tfrac{8}{1000} + \\cdots\\right)$.', 'So, the shifting tail is a G.P. with $a = \\tfrac{8}{100}$, $r = \\tfrac{1}{10}$: its sum is $\\tfrac{8/100}{9/10} = \\tfrac{8}{90} = \\tfrac{4}{45}$.', 'Hence, the total is $\\tfrac{4}{10} + \\tfrac{4}{45} = \\tfrac{18}{45} + \\tfrac{4}{45} = \\tfrac{22}{45}$.'], answer: '22/45' },
        { q: 'The sum of an infinite G.P. is 4 and the sum of the squares of its terms is 12. Find the first term and the common ratio.', solution: ['Now, $\\tfrac{a}{1-r} = 4$ and $\\tfrac{a^2}{1-r^2} = 12$ (squaring the terms squares the ratio).', 'So, square the first: $\\tfrac{a^2}{(1-r)^2} = 16$; divide the second by it: $\\tfrac{(1-r)^2}{1-r^2} = \\tfrac{12}{16} = \\tfrac{3}{4}$.', 'Now, $\\tfrac{1-r}{1+r} = \\tfrac{3}{4}$ gives $4 - 4r = 3 + 3r$, so $7r = 1$ and $r = \\tfrac{1}{7}$.', 'Hence, $a = 4\\left(1 - \\tfrac{1}{7}\\right) = \\tfrac{24}{7}$ (check: squares sum to $\\tfrac{(24/7)^2}{1 - 1/49} = \\tfrac{576/49}{48/49} = 12$).'], answer: 'a = 24/7, r = 1/7' },
        { q: 'The product of the first three terms of a G.P. is 1000 and their sum is 35. Find the terms.', solution: ['Now, write the terms as $\\tfrac{b}{r}, b, br$: the product is $b^3 = 1000$, so $b = 10$ — the middle term is fixed first.', 'So, the sum is $10\\left(\\tfrac{1}{r} + 1 + r\\right) = 35$, hence $\\tfrac{1}{r} + r = \\tfrac{5}{2}$.', 'Now, $2r^2 - 5r + 2 = 0$ gives $(2r - 1)(r - 2) = 0$, so $r = 2$ or $\\tfrac{1}{2}$.', 'Hence, the terms are $5, 10, 20$ (or read in reverse — the same family in the opposite direction).'], answer: '5, 10, 20' },
      ] },
      { level: 'L5', questions: [
        { q: 'If $a, b, c$ are in G.P., prove that $(a + b + c)(a - b + c) = a^2 + b^2 + c^2$, and verify it on $3, 6, 12$.', solution: ['Now, expand the left side: $(a + c)^2 - b^2 = a^2 + 2ac + c^2 - b^2$.', 'So, the G.P. condition $b^2 = ac$ converts the cross term: $a^2 + 2ac + c^2 - ac = a^2 + ac + c^2 = a^2 + b^2 + c^2$.', 'Hence, $(a+b+c)(a-b+c) = a^2 + b^2 + c^2$ — verified at $(3, 6, 12)$: $21 \\times 9 = 189 = 9 + 36 + 144$.'], answer: 'proved; 189 = 189 at (3, 6, 12)' },
        { q: 'Every term of an infinite G.P. is three times the sum of all the terms that follow it. Find the common ratio.', solution: ['Now, write the condition: $a r^{n-1} = 3\\left(ar^n + ar^{n+1} + \\cdots\\right)$ for every $n$.', 'So, the tail is itself a G.P. starting at $ar^n$: its sum is $\\tfrac{ar^n}{1 - r}$, and the condition reads $ar^{n-1} = 3 \\cdot \\tfrac{ar^n}{1-r}$.', 'Now, cancel $ar^{n-1}$: $1 = \\tfrac{3r}{1 - r}$, so $1 - r = 3r$, hence $r = \\tfrac{1}{4}$.', 'Hence, the common ratio is $\\tfrac{1}{4}$ — check on $1, \\tfrac{1}{4}, \\tfrac{1}{16}, \\ldots$: the tail after the first term sums to $\\tfrac{1/4}{3/4} = \\tfrac{1}{3}$, exactly one third of 1.'], answer: 'r = 1/4' },
        { q: 'Each square in a nest is formed by joining the midpoints of the previous square\'s sides, starting from a square of side 8. Find the total area of all the squares in the nest.', solution: ['Now, the midpoint square of a square of side $s$ has side $\\tfrac{s}{\\sqrt{2}}$ (each new side is the hypotenuse of a right isosceles triangle on half-edges $\\tfrac{s}{2}$), so each area is exactly half the previous: the areas are $64, 32, 16, \\ldots$ — a G.P. with $r = \\tfrac{1}{2}$.', 'So, the total area is $\\tfrac{64}{1 - \\tfrac{1}{2}} = 64 \\times 2 = 128$.', 'Hence, the nest of infinitely many squares carries total area 128 — infinitely many pieces, one finite area.'], answer: '128' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove that a G.P. of positive terms becomes an A.P. when every term is replaced by its logarithm (any base $> 1$), and conversely. Then find the 8th term of the G.P. whose log-terms begin $\\log 3, \\log 15, \\log 75, \\ldots$', solution: ['Now, if $a_k = ar^{k-1}$ then $\\log a_k = \\log a + (k - 1)\\log r$ — an A.P. with first term $\\log a$ and difference $\\log r$.', 'Conversely, if $\\log a_k$ is an A.P. with difference $\\delta$, then $a_k$ is the previous term times the constant $10^{\\delta}$ (base 10, say): a G.P.', 'So, the given log-A.P. has first term $\\log 3$ and difference $\\log 5$, hence the G.P. is $3, 15, 75, \\ldots$ with $r = 5$.', 'Hence, the 8th term is $3 \\times 5^7 = 3 \\times 78{,}125 = 234{,}375$.'], answer: 'proved; the 8th term is 234,375' },
        { q: 'Find the sum $\\displaystyle\\sum_{k=1}^{\\infty} \\dfrac{2^k + 3^k}{6^k}$.', solution: ['Split the summand: $\\tfrac{2^k + 3^k}{6^k} = \\left(\\tfrac{2}{6}\\right)^k + \\left(\\tfrac{3}{6}\\right)^k = \\left(\\tfrac{1}{3}\\right)^k + \\left(\\tfrac{1}{2}\\right)^k$.', 'Now, each piece is an infinite G.P. starting at its $k = 1$ value: $\\tfrac{1/3}{1 - 1/3} = \\tfrac{1}{2}$ and $\\tfrac{1/2}{1 - 1/2} = 1$.', 'So, the total is $\\tfrac{1}{2} + 1 = \\tfrac{3}{2}$.', 'Hence, $\\sum \\tfrac{2^k + 3^k}{6^k} = \\tfrac{3}{2}$ — split, sum, recombine: three honest ratios, none invented.'], answer: '3/2' },
      ] },
    ] },
  ],
}

export const chapter05: Chapter = {
  number: 5,
  slug: 'sequences-and-series',
  title: 'Sequences and Series',
  summary:
    'Algebra\u2019s ordered half: the sequence as an object with a position, then the two progressions every examination ecosystem prices. The arithmetic progression is the constant climb \u2014 equal steps, a general term linear in the position, the Gauss pairing that prices its sum, and arithmetic means inserted between numbers whose sum is always n copies of the single mean. The geometric progression is the constant ratio \u2014 multiplicative growth, the sum by the shift-and-subtract machine, geometric means whose product is always G to the power n, and the infinite tail: what happens to a sum when the ratio shrinks the terms to nothing. The harmonic, arithmetico-geometric and special-sum families, sigma notation, and the method of differences complete the chapter on later runs.',
  status: 'in-progress',
  lessons: [lesson51, lesson52],
  plannedLessons: [
    'Harmonic and Arithmetico-Geometric Progressions',
    'Special Series and the Method of Differences',
    'Sigma Notation and the Classical Power Sums',
    'Recurring Series and the Scale of Relation',
  ],
}

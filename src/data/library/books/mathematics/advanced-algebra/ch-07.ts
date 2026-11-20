import type { Chapter, Lesson } from '../../../types'

/**
 * Advanced Algebra — chapter 7 "Induction and the Binomial Theorem"
 * (opened by RUN 116, 2026-11-21; the chapter stays IN-PROGRESS — 7.1
 * shipped this run, 7.2 authored this run after its own engines, the
 * remaining lessons 7.3–7.6 + the unit review ride the next runs).
 *
 * PROVENANCE: ground = the Drive `MATHS/M2 Algebra :: 04. Principle of
 * Mathematical Induction` module (citation key `cengage-m2-04`, Drive id
 * `1o_KwANO0z6_wNKE7rdGYtADqKLYf7G11`, 2.7 MB scanned, 6 PDF pages —
 * body printed 4.1–4.2 + the full solutions band, vision-transcribed in
 * one band at temporary-references/m2scan/m2-04-all; printed-page offset
 * PROVEN: printed 4.N = PDF N+2, the same offset every M2 module carries)
 * + the Drive `MATHS/M2 Algebra :: 08. Binomial Theorem` module head
 * (citation key `cengage-m2-08`, Drive id `1ybH8EEGhqyk0gnqosFGtqQPJ9mCnKkEM`,
 * 43 MB scanned, 69 PDF pages; the printed 8.1–8.9 band = PDF 3–12
 * transcribed in two bands m2scan/m2-08-A, m2-08-B — the band lessons
 * 7.1–7.2 need) + the banked web canon (`hall-knight-higher-algebra` chs.
 * XII–XIII arcs, `ncert-math11-ch7-binomial-theorem`,
 * `jee-main-2026-syllabus`, `cengage-jee-style`).
 *
 * STUDY-NEVER-REPRODUCE honored: the modules informed METHOD SHAPES only;
 * every roster, witness value, figure, Illustration, quiz item and
 * exercise below is OUR OWN, recomputed brute-force by
 * scripts/verify-book4-ch07.ts (sections A/B for 7.1, C/D for 7.2 grown
 * green BEFORE the corresponding prose was declared done).
 *
 * TEACHING ORDER (derived from the chapter summary arc FIRST, as the
 * standing pointer directs — induction first as the chapter's proof
 * engine, then the binomial theorem that engine proves):
 *   7.1 "Mathematical Induction: the Domino Principle"   (engines A/B)
 *   7.2 "The Binomial Theorem, Proved"                   (engines C/D)
 *   7.3 "The Binomial Theorem for Any Index"             (planned)
 *   7.4 "The Multinomial Theorem"                        (planned)
 *   7.5 "Binomial Coefficients at Work"                  (planned)
 *   7.6 "Binomial Applications and Approximations"       (planned)
 *   7.R "Unit 7 Completion Review"                       (planned)
 */

/* ------------------------------------------------------------------ */
/* figures — original SVG, vivid palette (owner directive 2026-11-08)  */
/* ------------------------------------------------------------------ */

function dominoChainSvg(): string {
  // top chain: 8 dominoes, the first pushed — every domino falls.
  // bottom chain: 8 dominoes with a MISSING 5th — the fall stops there.
  // standing = amber outline; fallen = green fill rotated ~72°; missing = red.
  const W = 720
  const chain = (y0: number, fallen: number[], missing: number[]) => {
    let s = ''
    for (let i = 0; i < 8; i++) {
      const x = 66 + i * 72
      if (missing.includes(i)) {
        s += `<rect x="${x}" y="${y0 - 46}" width="20" height="46" rx="3" fill="none" stroke="#dc2626" stroke-width="2.2" stroke-dasharray="4 3"/><text x="${x + 10}" y="${y0 + 22}" font-size="10" font-weight="700" fill="#dc2626" text-anchor="middle">missing</text>`
        continue
      }
      if (fallen.includes(i)) {
        s += `<rect x="${x - 6}" y="${y0 - 24}" width="46" height="18" rx="3" fill="#16a34a" stroke="#166534" stroke-width="1.6" transform="rotate(14 ${x + 4} ${y0 - 15})"/>`
      } else {
        s += `<rect x="${x}" y="${y0 - 46}" width="20" height="46" rx="3" fill="#fef3c7" stroke="#d97706" stroke-width="2.2"/>`
      }
    }
    return s
  }
  const arrow = (x: number, y: number) =>
    `<line x1="${x}" y1="${y}" x2="${x + 34}" y2="${y}" stroke="#ea580c" stroke-width="2.4"/><path d="M ${x + 34} ${y} l -9 -5 v 10 z" fill="#ea580c"/>`
  return `<svg viewBox="0 0 ${W} 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two domino chains. Top: the first domino is pushed, and because each standing domino touches the next, all eight fall — base case plus inductive step prove every case. Bottom: the fifth domino is missing, so the fall stops after the fourth — a chain with one gap never reaches the end, which is why the inductive step must be proved for every k.">
  <text x="360" y="26" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the domino principle: base + step = all fall</text>
  ${chain(120, [0, 1, 2, 3, 4, 5, 6, 7], [])}
  ${arrow(36, 96)}
  <text x="360" y="168" font-size="11" font-weight="700" fill="#166534" text-anchor="middle">P(1) proved, and P(k) implies P(k+1) for every k — so P(n) holds for every n</text>
  ${chain(268, [0, 1, 2, 3], [4])}
  <text x="588" y="252" font-size="11" font-weight="700" fill="#dc2626" text-anchor="middle">the fall stops here</text>
  <text x="360" y="306" font-size="11" font-weight="700" fill="#166534" text-anchor="middle">one missing domino breaks the chain — the step must be proved for EVERY k, with no gap</text>
</svg>`
}

function gnomonSquaresSvg(): string {
  // the odd-sum family: 1 = 1^2, 1+3 = 2^2, ..., 1+3+5+7+9 = 25 = 5^2,
  // drawn as L-shaped shells (gnomons) on a 5x5 grid, one colour per shell
  const cell = 56
  const ox = 60
  const oy = 64
  const shellCols = ['#ea580c', '#d97706', '#16a34a', '#0d9488', '#65a30d']
  const shellOf = (r: number, c0: number) => Math.max(r, c0) // shell index 0..4
  let s = ''
  for (let r = 0; r < 5; r++) {
    for (let c0 = 0; c0 < 5; c0++) {
      const sh = shellOf(r, c0)
      s += `<rect x="${ox + c0 * cell}" y="${oy + r * cell}" width="${cell - 5}" height="${cell - 5}" rx="6" fill="${shellCols[sh]}" fill-opacity="${sh % 2 === 0 ? 0.92 : 0.85}" stroke="#fffdf5" stroke-width="2"/>`
    }
  }
  const labels = ['1', '3', '5', '7', '9']
  labels.forEach((t, sh) => {
    const x = ox + sh * cell + (cell - 5) / 2
    const y = oy + sh * cell + (cell - 5) / 2 + 6
    s += `<text x="${x}" y="${y}" font-size="17" font-weight="800" fill="#ffffff" text-anchor="middle">${t}</text>`
  })
  const legend = shellCols
    .map((col, i) => `<rect x="${ox}" y="${oy + 5 * cell + 34 + i * 24}" width="15" height="15" rx="3" fill="${col}"/><text x="${ox + 22}" y="${oy + 5 * cell + 46 + i * 24}" font-size="11.5" font-weight="700" fill="#166534">shell ${i + 1} = ${2 * i + 1} cells — the odd number ${2 * i + 1}</text>`)
    .join('')
  return `<svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A five by five square built from L-shaped shells: the first shell is 1 cell, each later shell is an L of 3, 5, 7 and 9 cells. The shells are exactly the odd numbers, so the odd-number sum is a square: 1 plus 3 plus 5 plus 7 plus 9 equals 25 equals 5 squared. Induction is what proves the square family for every size, not just this drawn one.">
  <text x="200" y="30" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the odd numbers are L-shaped shells: the sum is a square</text>
  ${s}
  <text x="200" y="${oy + 5 * cell + 12}" font-size="12" font-weight="800" fill="#166534" text-anchor="middle">1 + 3 + 5 + 7 + 9 = 25 = 5²</text>
  ${legend}
</svg>`
}

/* ------------------------------------------------------------------ */
/* lesson 7.1                                                          */
/* ------------------------------------------------------------------ */

const lesson71: Lesson = {
  id: 'aa-mathematical-induction-the-domino-principle',
  number: '7.1',
  title: 'Mathematical Induction: the Domino Principle',
  concepts: [
    'the principle of mathematical induction',
    'base case and inductive step',
    'the induction hypothesis as the fallen domino',
    'why verification is never proof',
    'divisibility statements and the add-a-multiple move',
    'inequalities with a shifted base case',
    'what induction never proves: counterexamples',
    'strong induction for two-step recurrences',
  ],
  objectives: [
    'State the principle of mathematical induction formally — base case plus inductive step — and explain why the two together force P(n) for every natural number n.',
    'Run the standard induction proof on sum formulas: verify the base, assume the induction hypothesis for k, and drive P(k+1) out of P(k) — certifying the sum formulas chapter 5 derived by ladders.',
    'Prove divisibility statements by the add-a-multiple move: rewrite the (k+1)-case so the induction hypothesis appears as a named factor.',
    'Prove inequalities by induction, including statements whose base case is shifted (2ⁿ ≥ n² first holds for every n ≥ 4) — and explain the fail-witness 8 < 9 honestly.',
    'State Bernoulli’s inequality and prove it by induction, the engine lesson 7.6’s approximations will reuse.',
    'Say precisely what induction never proves — verification is not proof, and a false statement with a plausible step is killed by naming its counterexample.',
    'Run the strong-induction variant when the step needs MORE than the previous case (two-term recurrences, the postage family).',
  ],
  prerequisites: ['aa-arithmetic-progressions-the-constant-climb', 'aa-sigma-notation-and-the-classical-power-sums', 'aa-the-arithmetic-geometric-mean-inequality'],
  sources: ['cengage-m2-04', 'cengage-jee-style', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus'],
  blocks: [
    { kind: 'para', text: 'Here is a question every earlier chapter of this book has quietly postponed. The formula $1 + 2 + 3 + \\cdots + n = \\tfrac{n(n+1)}{2}$ has been used a hundred times — lesson 5.1 priced the arithmetic progression with it, lesson 5.5 harvested it from a ladder — and every use assumed the formula holds for ALL natural numbers $n$, not just the ones somebody bothered to check. But what does "holds for all $n$" mean, and how is it ever proved? Checking $n = 1$, then $n = 2$, then $n = 3$ is honest work and it goes on forever: however many cases are verified, the very next one stands unverified. Two thousand verified cases prove nothing about case 2001. Finite verification and universal truth are different planets, and the bridge between them is the single most consequential proof idea in elementary mathematics: the principle of mathematical induction. This lesson builds that bridge carefully — what it says, why it works, how it is run, and, just as importantly, what it can never do. The payoff arrives one lesson later: the binomial theorem, the expansion machine every examination expects, is itself proved by induction, so the engine built here is the engine everything else in the chapter runs on.' },
    { kind: 'para', text: 'The idea has a physical shape that has carried generations of students through it. Stand dominoes in a row, close enough that each one, when it falls, knocks its neighbour. Push the first. What happens? Everything falls — provided two things hold: the first domino actually falls, and every domino that falls knocks down the next. If the first is never pushed, nothing happens. If domino 5 is missing from the row, the fall stops at 4 and the tail stands forever. The two conditions are exactly the two steps of an induction proof, and the whole method is the observation that the two steps together are AS GOOD AS watching every domino fall. Mathematics’ name for the two steps: the base case, and the inductive step.' },

    { kind: 'figure', caption: 'The domino principle drawn as two chains. Top: the first domino is pushed (base case) and each standing domino touches the next (inductive step), so all eight fall — and the argument never had to watch domino 8 fall to know it. Bottom: the fifth domino is missing, so the fall stops after the fourth — a chain with one gap never reaches its end. This is why an induction proof must carry the inductive step for EVERY k with no gap, and why the base case must be genuinely proved, not assumed.', svg: dominoChainSvg() },

    { kind: 'callout', tone: 'definition', title: 'The principle of mathematical induction', text: 'Let $P(n)$ be a statement about each natural number $n$. Suppose that (i) the base case holds: $P(1)$ is true; and (ii) the inductive step holds: for every natural number $k$, if $P(k)$ is true then $P(k+1)$ is also true. Then $P(n)$ is true for every natural number $n$. The assumption "$P(k)$ is true" used inside the inductive step is called the induction hypothesis — it is the domino that has already fallen, borrowed for one paragraph to knock down the next.' },
    { kind: 'para', text: 'Thus, in symbols, the principle says: $P(1) \\wedge \\bigl(\\forall k,\\; P(k) \\Rightarrow P(k+1)\\bigr) \\;\\Rightarrow\\; \\forall n,\\; P(n)$. For example, a statement that passes the base check but fails the step (a row of dominoes nobody pushes) proves nothing at large $n$; a statement with a plausible step but a false base (a pushed chain with a broken first hinge) proves nothing either. Both steps, or nothing.' },
    { kind: 'terms', items: [
      { term: 'Mathematical induction', def: 'the proof principle certifying a statement P(n) for every natural number n from two facts: the base case P(1) and the inductive step P(k) ⇒ P(k+1) for every k.' },
      { term: 'Base case', def: 'the explicitly verified first instance of the statement — P(1), or P(n₀) if the claim starts at n₀; the domino that is pushed.' },
      { term: 'Inductive step', def: 'the conditional argument showing P(k) ⇒ P(k+1) for every k — each domino, on falling, knocks the next.' },
      { term: 'Induction hypothesis', def: 'the temporary assumption P(k) made inside the inductive step — never the conclusion; using it is the whole engine, and it is legitimate precisely because the step is conditional.' },
      { term: 'Divisible', def: 'a is divisible by b when a = b·m for some integer m — written b ∣ a; the inductive step for divisibility statements usually adds a multiple of b on purpose.' },
      { term: 'Counterexample', def: 'one instance where a universal statement fails; a single counterexample kills the statement completely, however many cases verify.' },
      { term: 'Strong induction', def: 'the variant whose inductive step assumes P(j) for ALL j ≤ k, not just j = k — needed when the next case is built from more than the previous one.' },
      { term: 'Well-ordering principle', def: 'every non-empty set of positive integers has a least element — the principle induction is equivalent to; named here as the honest foundation, not proved.' },
    ] },

    { kind: 'heading', text: 'Why the Two Steps Deliver Every Case' },
    { kind: 'para', text: 'The principle is not a convention someone declared — it is forced by the structure of the natural numbers, and one line of set language makes the forcing visible. Let $S$ be the set of indices for which the statement holds: $S = \\{n : P(n) \\text{ is true}\\}$. The base case says $1 \\in S$. The inductive step says: whenever $k \\in S$, also $k + 1 \\in S$. So suppose, for contradiction, that some natural number is missing from $S$ — the set $T$ of failures is non-empty. By the well-ordering principle (every non-empty set of positive integers has a least element — taken here as the ground the integers stand on), $T$ has a least element $t$. Then $t \\neq 1$, because $1 \\in S$; so $t \\geq 2$, and $t - 1$ is a positive integer smaller than every element of $T$, hence $t - 1 \\in S$. But the inductive step at $k = t - 1$ forces $t \\in S$ — contradiction. So $T$ is empty and $P(n)$ holds for every $n$. Note what the argument never did: it never exhibited $P$ holding at any particular large $n$. It showed that a failure would produce a LEAST failure, and killed that possibility — the least-failure contradiction is the logical heart, and the dominoes are its picture.' },
    { kind: 'callout', tone: 'insight', title: 'Induction is a single axiom-class fact, not a series of checks', text: 'The proof above uses the well-ordering principle once, for an arbitrary non-empty failure set — not once per value of n. That is why induction delivers infinitely many facts from two: the content lives in the structure of the integers (no infinite descending chain), not in any amount of computation. Conversely, induction implies well-ordering, so the two are equivalent statements about the integers — this lesson uses them as two faces of one foundation and does not need to choose.' },

    { kind: 'heading', text: 'The Sum Formulas, Finally Certified' },
    { kind: 'para', text: 'Chapter 5 derived the great sum formulas by ladders — telescoping differences that exhibit WHY each closed form is right — and lesson 5.5 banked them as computational identities. What the ladder method delivers is a derivation; what induction delivers is the certificate that the formula holds for every $n$ at once, no ladder of unbounded length required. The two methods answer different questions and this chapter carries both: the ladder explains the formula, induction certifies it. Run the engine three times and the rhythm will be permanent.' },
    { kind: 'derivation', title: 'Theorem: the sum formula 1 + 2 + … + n = n(n+1)/2, certified for every n', statement: 'For every natural number n, the sum of the first n natural numbers equals n(n+1)/2 — derived by ladders in lesson 5.5, certified here for ALL n at once by induction.', steps: [
      { label: 'Base case', formula: '1 + \\cdots + 1 = \\tfrac{1 \\cdot 2}{2} = 1', explanation: 'For $n = 1$ both sides are 1 — the first domino is pushed, by direct arithmetic, not by trust.' },
      { label: 'State the induction hypothesis', formula: '1 + 2 + \\cdots + k = \\tfrac{k(k+1)}{2}', explanation: 'Assume $P(k)$ for some natural number $k$. This is the fallen domino — borrowed for one paragraph, never believed unconditionally.' },
      { label: 'Add the next term', formula: '1 + 2 + \\cdots + k + (k+1) = \\tfrac{k(k+1)}{2} + (k+1)', explanation: 'The $(k+1)$-sum is the $k$-sum plus one term — the only move the step ever makes in the sum family.' },
      { label: 'Factor the right side', formula: '\\tfrac{k(k+1)}{2} + (k+1) = (k+1)\\left(\\tfrac{k}{2} + 1\\right) = \\tfrac{(k+1)(k+2)}{2}', explanation: 'Take $(k+1)$ out as a common factor; the bracket rebinds into $\\tfrac{(k+2)}{2}$, so the closed form reappears with $n$ replaced by $k+1$.' },
      { label: 'Conclusion by induction', formula: '\\tfrac{(k+1)(k+2)}{2} = \\tfrac{(k+1)((k+1)+1)}{2}', explanation: 'Both steps hold, so by the principle of mathematical induction $P(n)$ is true for every natural number $n$ — the chain delivers all of them at once. $\\blacksquare$' },
    ], result: '$1 + 2 + \\cdots + n = \\tfrac{n(n+1)}{2}$ for every $n$ — base checked, step proved, induction hands over the rest' },
    { kind: 'para', text: 'Watch where the work sits in that proof: inside the inductive step there is no induction at all — just algebra on ONE value, the passage from $k$ to $k+1$. The scaffolding (base, hypothesis, conclusion) is fixed and identical in every induction proof in this book; only the middle algebra changes. Students who find induction dizzying are usually trying to hold all values of $n$ simultaneously; the method’s gift is that you never have to. Hold one domino at a time.' },
    { kind: 'derivation', title: 'Theorem: the squares sum to the pyramid formula, certified for every n', statement: 'For every natural number n, 1² + 2² + … + n² = n(n+1)(2n+1)/6 — and the same route certifies the cubes: 1³ + … + n³ = [n(n+1)/2]² (Nicomachus’s square-of-the-sum, lesson 5.5’s figure).', steps: [
      { label: 'Base case', formula: '1^2 = \\tfrac{1 \\cdot 2 \\cdot 3}{6} = 1', explanation: 'For $n = 1$ both sides are 1.' },
      { label: 'Induction hypothesis', formula: '1^2 + \\cdots + k^2 = \\tfrac{k(k+1)(2k+1)}{6}', explanation: 'Assume the closed form holds through $k^2$ for some $k$.' },
      { label: 'Add the next square', formula: '\\tfrac{k(k+1)(2k+1)}{6} + (k+1)^2', explanation: 'The $(k+1)$-sum is the old sum plus $(k+1)^2$ — one move, as always.' },
      { label: 'Factor and rebind', formula: '(k+1)\\left[\\tfrac{k(2k+1)}{6} + (k+1)\\right] = \\tfrac{(k+1)(2k^2 + 7k + 6)}{6} = \\tfrac{(k+1)(k+2)(2k+3)}{6}', explanation: 'Take $(k+1)$ out; the bracket $\\tfrac{2k^2+7k+6}{6}$ factors as $(k+2)(2k+3)/6$ — and $(k+2)(2(k+1)+1)$ is exactly the closed form at $k+1$.' },
      { label: 'Conclusion; the cubes ride the same engine', formula: '\\left[\\tfrac{k(k+1)}{2}\\right]^2 + (k+1)^3 = \\left[\\tfrac{(k+1)(k+2)}{2}\\right]^2', explanation: 'Adding $(k+1)^3$ to the square of the $k$-sum rebuilds the square of the $(k+1)$-sum — so $1^3 + \\cdots + n^3 = \\left[\\tfrac{n(n+1)}{2}\\right]^2$ is certified by the identical scaffold. $\\blacksquare$' },
    ], result: '$\\sum r^2 = \\tfrac{n(n+1)(2n+1)}{6}$ and $\\sum r^3 = \\left(\\tfrac{n(n+1)}{2}\\right)^{\\!2}$ for every $n$ — for example, the $n = 6$ runs give $441 = 21^2$ for the cubes and $91$ for the squares' },
    { kind: 'example', title: 'A sequence is defined by $b_0 = 7$ and $b_k = 5 + b_{k-1}$ for $k \\geq 1$. Prove that $b_n = 7 + 5n$ for every $n \\geq 0$ (the base sits at zero)', steps: [
      'Here the indexing starts at $b_0$, so the honest base is $n = 0$ — induction does not care which index the chain starts from, only that SOME first case is proved and the step reaches from each case to its successor.',
      '**Base case.** $b_0 = 7$ by definition, and the formula gives $7 + 5 \\cdot 0 = 7$. True.',
      '**Induction hypothesis.** Assume $b_k = 7 + 5k$ for some $k \\geq 0$.',
      '**Inductive step.** $b_{k+1} = 5 + b_k = 5 + 7 + 5k = 7 + 5(k+1)$ — the recursion itself hands the step its material.',
      'Hence $P(k+1)$ whenever $P(k)$; with the base, $P(n)$ holds for every $n \\geq 0$ — the sequence runs $7, 12, 17, 22, \\ldots, 57$ at $n = 10$, each landing exactly on the closed form.',
    ] },
    { kind: 'example', title: 'The step in action at a specific k: rebuild row 4 from row 3 and the sum doubling with it', steps: [
      'Row 3 of the coefficient table is $1, 3, 3, 1$; Pascal’s rule builds row 4: borders $1, 1$, and the interiors $1 + 3 = 4$, $3 + 3 = 6$, $3 + 1 = 4$.',
      'So, row 4 is $1, 4, 6, 4, 1$ — and its sum is $1 + 4 + 6 + 4 + 1 = 16$, exactly twice row 3’s $8$: each of row 3’s entries participates in two adjacent pairs.',
      'Hence the coefficient doubling seen in the table ($2, 4, 8, 16$) is Pascal’s rule read as accounting — the same one-line reason the theorem itself rides.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The base case is load-bearing', text: 'A tempting shortcut: "the step is all the work, so check the base quickly or trust it." No. If P(1) is false and the step is valid, the conclusion is simply never invoked — the chain of implications hangs from a first domino that never fell. Every induction proof in an examination is marked on BOTH steps, and a missing base case is a structural hole, not a style deduction.' },

    { kind: 'heading', text: 'Divisibility Statements: the Add-a-Multiple Move' },
    { kind: 'para', text: 'The second great family of induction proofs asserts that some expression is **divisible** by a fixed integer — the classic examination phrasing is "prove that $a_n$ is divisible by $b$ for all $n$". The shape of the inductive step is uniform and worth naming before any example: assume the $k$-case says $a_k = b \\cdot m$ for some integer $m$; then the $(k+1)$-expression is rewritten so that $a_k$ appears as a whole factor, plus a remainder whose own divisibility is visible. In short: split the new case into "the old case, times something" plus "a fresh multiple of $b$" — the add-a-multiple move. Two families, run in full.' },
    { kind: 'example', title: 'Prove that $5^{2n+1} + 1$ is divisible by $6$ for every natural number $n$', steps: [
      'Let $P(n)$ be the statement "$6$ divides $5^{2n+1} + 1$"; the base first, by direct arithmetic.',
      '**Base case.** $n = 1$: $5^3 + 1 = 126 = 6 \\cdot 21$, so $P(1)$ is true.',
      '**Induction hypothesis.** Assume $5^{2k+1} + 1 = 6m$ for some integer $m$.',
      '**Inductive step.** The next case rewrites as a power of the old one: $5^{2k+3} + 1 = 5^2 \\cdot 5^{2k+1} + 1 = 25(6m - 1) + 1$ — the hypothesis deployed as a whole factor.',
      'So, $25(6m - 1) + 1 = 150m - 24 = 6(25m - 4)$, which is divisible by $6$.',
      'Hence $P(k+1)$ holds whenever $P(k)$ does, and the base is proved; by induction $P(n)$ holds for all natural $n$ — the first witnesses are $126$, $3126$ and $78126$ for $n = 1, 2, 3$.',
    ] },
    { kind: 'example', title: 'Prove that $n^3 - n$ is divisible by $6$ for every natural number $n$', steps: [
      'Let $P(n)$ be the statement "$6$ divides $n^3 - n$".',
      '**Base case.** $n = 1$: $1 - 1 = 0 = 6 \\cdot 0$, so $P(1)$ is true.',
      '**Induction hypothesis.** Assume $k^3 - k = 6m$ for some integer $m$.',
      '**Inductive step.** Expand the next case directly: $(k+1)^3 - (k+1) = k^3 + 3k^2 + 3k + 1 - k - 1 = (k^3 - k) + 3k(k+1)$ — the old case falls out as a whole bracket.',
      'Now, the first bracket is $6m$ by hypothesis; and $k(k+1)$ is a product of consecutive integers, so one of them is even — hence $3k(k+1)$ is divisible by $6$, say $3k(k+1) = 6r$.',
      'So, $(k+1)^3 - (k+1) = 6m + 6r = 6(m + r)$ — divisible by $6$.',
      'Hence $P(k+1)$ whenever $P(k)$; the base holds; by induction $P(n)$ holds for all $n$ — the first witnesses are $6, 24, 60, 120, 210$ for $n = 2$ to $6$.',
    ] },
    { kind: 'para', text: 'The second proof smuggled in one extra fact — that a product of two consecutive integers is always even. That is legitimate: an induction proof may use any already-established fact in its step, exactly as any other proof may. What it may NOT do is use the statement it is proving, one level up (using $P(k+1)$ to prove $P(k+1)$ is the circularity that the conditional form of the step exists to prevent).' },
    { kind: 'callout', tone: 'insight', title: 'The divisibility template, in one breath', text: 'Base: check the smallest n by direct arithmetic. Hypothesis: a_k = b·m for some integer m. Step: rewrite a_{k+1} = (shape)·a_k + (fresh multiple of b), conclude a_{k+1} = b·(integer). The entire art of the family is choosing the "shape" that makes a_k appear whole — multiply the hypothesis by a constant, expand a power, or expand (k+1)³ so the old expression falls out as a bracket.' },

    { kind: 'heading', text: 'Inequalities: the Base Case Need Not Be 1' },
    { kind: 'para', text: 'The third family proves inequalities "for all sufficiently large $n$", and it forces an honest refinement of the template: the base case is wherever the statement FIRST becomes true, not automatically $n = 1$. Chapter 4’s engines (AM–GM and friends) guessed several such statements; induction converts the guesses into theorems. The flagship example also teaches the subtlety: the obvious-looking claim $2^n \\geq n^2$ is FALSE at $n = 3$ ($8 < 9$) and TRUE from $n = 4$ onward — so the theorem must be stated with the shifted base, and the proof must start there.' },
    { kind: 'example', title: 'Prove that $2^n \\geq n^2$ for every natural number $n \\geq 4$', steps: [
      'The honest survey comes first: $2^1 = 2 \\geq 1$, $2^2 = 4 \\geq 4$, but $2^3 = 8 < 9$ — the statement FAILS at $n = 3$, so it can only be claimed from $n = 4$ up.',
      '**Base case (shifted).** $n = 4$: $2^4 = 16 = 4^2$, so $P(4)$ is true (equality — the tightest possible base).',
      '**Induction hypothesis.** Assume $2^k \\geq k^2$ for some $k \\geq 4$.',
      '**Inductive step.** Double: $2^{k+1} = 2 \\cdot 2^k \\geq 2k^2$. So it suffices to show $2k^2 \\geq (k+1)^2$, i.e. $k^2 - 2k - 1 \\geq 0$, i.e. $(k - 1)^2 \\geq 2$.',
      'Now, for $k \\geq 4$ this is immediate: $(k-1)^2 \\geq 9 \\geq 2$ — the shifted base is doing real work here; at $k = 2$ the bracket would read $1 \\geq 2$, false, which is exactly why the claim fails below 4.',
      'Hence $2^{k+1} \\geq (k+1)^2$, so $P(k+1)$ whenever $P(k)$ with $k \\geq 4$.',
      'Hence, with the base and the step proved, $2^n \\geq n^2$ for all $n \\geq 4$ — and the witnesses climb away from equality: $32 \\geq 25$, $64 \\geq 36$, $128 \\geq 49$, $256 \\geq 64$.',
    ] },
    { kind: 'para', text: 'The same engine certifies the inequality lesson 7.6 will lean on hardest. **Bernoulli’s inequality**: for every real $x \\geq -1$ and every natural number $n$, $(1+x)^n \\geq 1 + nx$. The base is $n = 1$, where both sides are $1 + x$ — equality. The step multiplies: if $(1+x)^k \\geq 1 + kx$, then $(1+x)^{k+1} = (1+x)^k(1+x) \\geq (1+kx)(1+x) = 1 + (k+1)x + kx^2 \\geq 1 + (k+1)x$, the last move legal because $x^2 \\geq 0$ and $k \\geq 0$. Note the step’s multiplication legality: multiplying an inequality by $(1+x)$ needs $1 + x \\geq 0$, which is exactly the hypothesis $x \\geq -1$ — the theorem’s fine print is not decoration; it is what keeps one line of the proof legal.' },
    { kind: 'formula', name: 'Bernoulli’s inequality (proved here, used in 7.6)', latex: '(1+x)^n \\geq 1 + nx \\quad \\text{for } x \\geq -1,\\; n \\in \\mathbb{N}', note: 'equality at $n = 1$ or $x = 0$; the engine behind the approximation $(1+x)^n \\approx 1 + nx$ for small $x$.' },

    { kind: 'heading', text: 'What Induction Never Proves' },
    { kind: 'para', text: 'A tool this powerful earns an equally honest boundary map, and both walls are worth walking.' },
    { kind: 'list', marker: 'roman', items: [
      '**Verification is not proof.** Checking any finite number of cases — two thousand, two million — leaves the next case untouched. The statement "$n^2 + n + 41$ is prime" is a famous lesson: it holds for $n = 0, 1, 2, \\ldots, 39$ (forty consecutive verifications!), then fails at $n = 40$, where $40^2 + 40 + 41 = 1681 = 41^2$. Forty verified cases, and the forty-first kills the claim — induction exists precisely because no finite survey reaches "all".',
      '**A plausible step with a false base proves nothing — and a true base with a gap in the step proves nothing.** The classic cautionary tale: "all horses are the same colour". The step is genuinely valid for every $k \\geq 2$ (in a set of $k+1$ horses, the first $k$ agree and the last $k$ agree, so everyone agrees — PROVIDED the two overlapping groups share a horse). But the step’s two groups OVERLAP only when $k \\geq 2$; at $k = 1$ the sets $\\{\\text{horse}_1\\}$ and $\\{\\text{horse}_2\\}$ are disjoint, the overlap argument collapses, and the chain has its gap exactly between the base and the first step. The base ($k = 1$: one horse, trivially uniform) is true; the step fails AT ONE VALUE; so nothing follows. Finding the exact broken value is the discipline this lesson trains.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'How examinations test the boundary', text: 'The two classic trap shapes: (a) "the statement holds for n = 1, 2, 3, 4 — hence for all n" (no: verification is not proof); (b) an induction whose step silently assumes the case k+1, or uses the hypothesis for a value it does not cover (a domino reaching sideways). A correct induction proof needs the base PROVED, the step PROVED for every k in range, and nothing else — and spotting which of the two is missing in a flawed proof is itself an examination question.' },

    { kind: 'heading', text: 'Strong Induction: When One Fallen Domino Is Not Enough' },
    { kind: 'para', text: 'Some statements build their $(k+1)$-case out of MORE than the $k$-case. A two-term recurrence is the honest example: the $(k+1)$-th Fibonacci-type value needs BOTH of its predecessors, so the plain induction hypothesis ("$P(k)$ holds") is not enough raw material. The fix is the second domino form: assume $P(j)$ for EVERY $j \\leq k$ — the whole prefix has fallen, not just the last domino — and derive $P(k+1)$. The base is usually TWO cases now (both $P(1)$ and $P(2)$), because the step’s smallest legitimate use reaches two back. Nothing else changes: the same least-failure argument certifies the variant, so strong induction is a theorem, not a new axiom.' },
    { kind: 'example', title: 'A sequence $u_1, u_2, \\ldots$ is defined by $u_1 = u_2 = 1$ and $u_n = u_{n-1} + u_{n-2}$ for $n \\geq 3$. Prove that $u_n < 2^n$ for every $n \\geq 1$', steps: [
      'The step builds $u_{k+1}$ from $u_k$ AND $u_{k-1}$ — plain induction cannot even state what it needs; strong induction is the honest tool.',
      '**Base cases.** $u_1 = 1 < 2 = 2^1$ and $u_2 = 1 < 4 = 2^2$. Both fall.',
      '**Strong induction hypothesis.** Assume $u_j < 2^j$ for every $j \\leq k$ (with $k \\geq 2$).',
      '**Inductive step.** $u_{k+1} = u_k + u_{k-1} < 2^k + 2^{k-1} = 2^{k-1}(2 + 1) = 3 \\cdot 2^{k-1} < 4 \\cdot 2^{k-1} = 2^{k+1}$.',
      'Hence $u_{k+1} < 2^{k+1}$ whenever the whole prefix below holds — the step is proven.',
      'Hence, with both bases true and the step valid for every $k \\geq 2$, strong induction delivers $u_n < 2^n$ for all $n$ — the sequence runs $1, 1, 2, 3, 5, 8, 13, 21, \\ldots$, comfortably under $2, 4, 8, 16, 32, 64, 128, 256$.',
    ] },
    { kind: 'example', title: 'Strong induction at ground level: prove that every integer amount of $2$ rupees or more can be paid using $2$-rupee and $3$-rupee coins only', steps: [
      '**Base cases.** $2 = 2$ (one coin); $3 = 3$ (one coin). The two smallest amounts fall — and they must BOTH be checked, because the step reaches two back.',
      '**Strong induction hypothesis.** Assume every amount $j$ with $2 \\leq j \\leq k$ is payable, for some $k \\geq 3$.',
      '**Inductive step.** To pay $k + 1$ (with $k + 1 \\geq 4$): first pay $(k+1) - 2 = k - 1$ — payable since $k - 1 \\geq 3 \\geq 2$ lies inside the assumed prefix — then add one $2$-rupee coin.',
      'Hence $k+1$ is payable whenever the prefix is; with the bases, every amount $\\geq 2$ is payable.',
      'Hence, by strong induction, every integer amount $\\geq 2$ is a $2a + 3b$ combination — the lone exception is $1$, which no smaller prefix can rescue and no combination reaches.',
    ] },

    { kind: 'para', text: 'Choosing between the two domino forms is itself a skill worth naming, because the wrong choice produces a proof that LOOKS right. Plain induction is the tool whenever the $(k+1)$-case can be derived from the $k$-case ALONE — the sum formulas (each needs only the previous partial sum), the divisibility families (each rewrite exposes $a_k$ as one factor), Bernoulli (each multiplies the previous inequality once). Strong induction is the tool whenever the $(k+1)$-case reaches further back: two-term recurrences touch $u_k$ AND $u_{k-1}$; the postage family pays $k+1$ from $k-1$; any statement whose step "reduces to a smaller case" without saying WHICH one is silently reaching into the prefix. The honest test is one sentence: name exactly which earlier cases the step uses, and let that list decide the form — one name, plain induction; several names or an unspecified smaller case, strong induction. Choosing well costs nothing; choosing wrong costs a gap the domino picture shows plainly.' },
    { kind: 'heading', text: 'The Method, Assembled' },
    { kind: 'para', text: 'From the above discussion, it follows that every induction proof in this book is the same five-line scaffold with different algebra in the middle. For example, the families met here sort out as follows:' },
    { kind: 'table', head: ['Family', 'Base case', 'The step’s middle move', 'This lesson’s certified example'], rows: [
      ['Sum formulas', '$n = 1$', 'add the $(k+1)$-term, rebuild the closed form', '$\\Sigma n$, $\\Sigma n^2$, $\\Sigma n^3$ — chapter 5’s ladders, now certified'],
      ['Divisibility', 'smallest $n$', 'express the new case as (multiple of the hypothesis) + (fresh multiple)', '$5^{2n+1} + 1 \\equiv 0 \\pmod 6$; $n^3 - n \\equiv 0 \\pmod 6$'],
      ['Inequalities', 'where truth starts (may be shifted)', 'compare against the hypothesis; the base’s slack powers the step', '$2^n \\geq n^2$ for $n \\geq 4$; Bernoulli for $x \\geq -1$'],
      ['Recurrences (strong form)', 'as many as the step reaches back', 'invoke the whole prefix, bound the sum', '$u_n < 2^n$ for the two-term recurrence'],
    ] },
    { kind: 'figure', caption: 'The gnomon picture behind the odd-sum family: a 5×5 square assembled from L-shaped shells of sizes 1, 3, 5, 7 and 9. The shells ARE the odd numbers, so the odd-number sum is always a perfect square — 1 + 3 + 5 + 7 + 9 = 25 = 5² — and induction is what certifies the square family for EVERY n, not just the drawn one (the picture shows n = 5; the theorem shows all n).', svg: gnomonSquaresSvg() },
    { kind: 'para', text: 'And the boundaries, restated once where they will be remembered: verification of any finite collection of cases is never proof; a counterexample is a complete refutation; the base case and the inductive step are each load-bearing; and the step must hold for EVERY $k$ in the claimed range, with no gaps and no sideways reaches. The next lesson takes this engine to the chapter’s headline: the binomial theorem, stated for a positive integral index and proved — twice — with the domino principle doing the second proof.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner', text: 'Mathematical induction is a headline chapter of state-board algebra and of olympiad training, and it supplies the proof the JEE syllabus’ binomial theorem chapter assumes (the positive-index proof is THIS lesson’s engine at work in 7.2). Expect three question shapes: full induction proofs of sum or divisibility families (the 5-line scaffold, 3–4 marks); "find the flaw" items dissecting a broken step or a missing base; and shifted-base inequalities (2ⁿ ≥ n² from n = 4) where the trap is quoting the statement without its range.' },
    { kind: 'quiz', title: 'Check yourself: the domino principle', items: [
      { q: 'A statement is checked for $n = 1, 2, \\ldots, 2000$ and holds every single time. What has been established?', options: ['the statement is true for every natural number', 'nothing about the case $n = 2001$ — a finite check never reaches the next case', 'the statement is true for $n = 2001$ as well', 'the statement is true for all $n \\leq 2001$, hence for all $n$'], answer: 1, explain: 'Finite verification, however long, never touches the next case — that is the entire gap induction exists to bridge (option B). Option A is the classic fallacy this lesson dismantles with $n^2 + n + 41$: prime for forty straight values, composite at the forty-first. Option C asserts the very case no survey reaches. Option D smuggles "hence for all $n$" out of a finite bound — no implication of that shape exists.' },
      { q: 'In an induction proof, the induction hypothesis is:', options: ['the claim $P(k+1)$ being established', 'the verification of $P(1)$', 'the temporary assumption that $P(k)$ holds — the fallen domino borrowed for the step', 'the final conclusion that $P(n)$ holds for all $n$'], answer: 2, explain: 'The hypothesis is exactly the assumption $P(k)$ made temporarily inside the conditional step — legitimate because the step only claims $P(k) \\Rightarrow P(k+1)$ (option C). Option A is the goal of the step, not its raw material. Option B is the base case — a separate, independently proved item. Option D is what the WHOLE principle delivers at the end; calling it the hypothesis is the circularity trap.' },
      { q: 'In proving "$7^n - 1$ is divisible by $6$" by induction, suppose $7^k - 1 = 6m$. The inductive step shows $7^{k+1} - 1$ equals:', options: ['$6(7m + 1)$', '$7m + 6$', '$6m + 7$', '$42m - 1$'], answer: 0, explain: 'Deploy the hypothesis whole: $7^{k+1} - 1 = 7 \\cdot 7^k - 1 = 7(6m + 1) - 1 = 42m + 6 = 6(7m + 1)$ (option A) — the add-a-multiple move, witnessed numerically by $m = 8$: $7^2 - 1 = 48$ gives $7^3 - 1 = 342 = 6 \\cdot 57$. Option B drops the structure entirely. Option C adds 7 to the old case, a number not divisible by 6 in general. Option D’s $42m - 1$ is off by the constant: the $-1$ never cancels.' },
      { q: 'The inequality $2^n \\geq n^2$ holds for every natural number from which point onward?', options: ['$n = 1$', '$n = 2$', '$n = 3$', '$n = 4$'], answer: 3, explain: 'The honest survey: $2^1 = 2 \\geq 1$ and $2^2 = 4 \\geq 4$ hold, but $2^3 = 8 < 9$ FAILS — so the universal claim starts at $n = 4$, where $16 = 4^2$ (option D). Options A and B are seductive because those cases verify; the statement is not "for these $n$" but "for every $n$ from here", and the single failure at $n = 3$ forbids any start below 4. Option C is exactly the false case — the counterexample this item is built to expose.' },
      { q: 'By the induction-certified formula, $1^2 + 2^2 + 3^2 + 4^2 + 5^2$ equals:', options: ['$25$', '$55$', '$45$', '$50$'], answer: 1, explain: 'The certified closed form gives $\\tfrac{5 \\cdot 6 \\cdot 11}{6} = 55$ (option B) — and the direct run agrees: $1 + 4 + 9 + 16 + 25 = 55$. Option A’s $25$ is $5^2$, the SQUARE of the count — the answer to a different family ($\\Sigma n$ vs $\\Sigma n^2$). Option C’s $45$ drops the last term’s excess. Option D’s $50$ is $2 \\times 25$, a doubled square — none of these survive the closed form plus the five-term arithmetic run together.' },
    ] },
    { kind: 'exercises', title: 'Exercises 7.1', sets: [
      { level: 'L1', questions: [
        { q: 'Prove by induction that $1 + 3 + 5 + \\cdots + (2n-1) = n^2$ for every natural number $n$, and state the sum for $n = 7$.', solution: [
          '**Base case.** $n = 1$: L.H.S. $= 1$; R.H.S. $= 1^2 = 1$. True.',
          '**Induction hypothesis.** Assume $1 + 3 + \\cdots + (2k-1) = k^2$ for some $k$.',
          '**Inductive step.** Add the next odd number: $1 + 3 + \\cdots + (2k-1) + (2k+1) = k^2 + (2k+1) = (k+1)^2$.',
          'Hence $P(k+1)$ holds; both steps proved, so by induction $P(n)$ holds for all $n$.',
          'Hence, in particular, the $n = 7$ sum is $1 + 3 + 5 + 7 + 9 + 11 + 13 = 49 = 7^2$.',
        ], answer: '$1 + 3 + \\cdots + (2n-1) = n^2$ for all $n$; the $n = 7$ sum is $49$' },
        { q: 'Prove by induction that $7^n - 1$ is divisible by $6$ for every natural number $n$.', solution: [
          '**Base case.** $n = 1$: $7 - 1 = 6 = 6 \\cdot 1$. True.',
          '**Induction hypothesis.** Assume $7^k - 1 = 6m$ for some integer $m$.',
          '**Inductive step.** $7^{k+1} - 1 = 7(7^k) - 1 = 7(6m + 1) - 1 = 42m + 6 = 6(7m + 1)$ — divisible by $6$.',
          'Hence $P(k+1)$ whenever $P(k)$; with the base, $P(n)$ holds for all $n$ (witnesses: $6, 48, 342, 2400$ for $n = 1$ to $4$).',
        ], answer: '$7^n - 1$ is divisible by $6$ for every natural number $n$' },
      ] },
      { level: 'L2', questions: [
        { q: 'Prove by induction that $1 \\cdot 2 + 2 \\cdot 3 + \\cdots + n(n+1) = \\tfrac{n(n+1)(n+2)}{3}$ for every natural number $n$, and verify the formula directly at $n = 10$.', solution: [
          '**Base case.** $n = 1$: L.H.S. $= 2$; R.H.S. $= \\tfrac{1 \\cdot 2 \\cdot 3}{3} = 2$. True.',
          '**Induction hypothesis.** Assume the sum through $k(k+1)$ equals $\\tfrac{k(k+1)(k+2)}{3}$.',
          '**Inductive step.** Add $(k+1)(k+2)$: the new sum is $(k+1)(k+2)\\left[\\tfrac{k}{3} + 1\\right] = \\tfrac{(k+1)(k+2)(k+3)}{3}$ — statement $P(k+1)$ exactly.',
          'Hence $P(k+1)$ whenever $P(k)$; with the base, $P(n)$ holds for all $n$ by induction.',
          'Hence the direct check at $n = 10$: $\\tfrac{10 \\cdot 11 \\cdot 12}{3} = 440$, and the ten products add to the same $440$.',
        ], answer: 'the formula holds for all $n$; at $n = 10$ both sides give $440$' },
        { q: 'Prove by induction that $11^{n+2} + 12^{2n+1}$ is divisible by $133$ for every natural number $n$.', solution: [
          '**Base case.** $n = 1$: $11^3 + 12^3 = 1331 + 1728 = 3059 = 133 \\cdot 23$. True.',
          '**Induction hypothesis.** Assume $11^{k+2} + 12^{2k+1} = 133m$ for some integer $m$.',
          '**Inductive step.** Shape the new case onto the old: $11^{k+3} + 12^{2k+3} = 11 \\cdot 11^{k+2} + 144 \\cdot 12^{2k+1} = 11\\left(11^{k+2} + 12^{2k+1}\\right) + 133 \\cdot 12^{2k+1}$ — the hypothesis appears whole, and the remainder carries $133$ openly.',
          'So, the new case is $11 \\cdot 133m + 133 \\cdot 12^{2k+1} = 133\\left(11m + 12^{2k+1}\\right)$ — divisible by $133$.',
          'Hence $P(k+1)$ whenever $P(k)$; with the base, $P(n)$ holds for all $n$.',
        ], answer: '$11^{n+2} + 12^{2n+1}$ is divisible by $133$ for every natural number $n$ (first witness: $3059 = 133 \\cdot 23$)' },
      ] },
      { level: 'L3', questions: [
        { q: 'Prove by induction that $2^n > n$ for every natural number $n$.', solution: [
          '**Base case.** $n = 1$: $2 > 1$. True.',
          '**Induction hypothesis.** Assume $2^k > k$ for some $k$.',
          '**Inductive step.** $2^{k+1} = 2 \\cdot 2^k > 2k \\geq k + 1$, the last step using $k \\geq 1$.',
          'Hence $P(k+1)$ whenever $P(k)$; with the base, $P(n)$ holds for all $n$.',
        ], answer: '$2^n > n$ for every natural number $n$' },
        { q: 'Prove by induction that $\\tfrac{1}{2} + \\tfrac{1}{4} + \\cdots + \\tfrac{1}{2^n} = 1 - \\tfrac{1}{2^n}$ for every natural number $n$, and give the exact value at $n = 4$.', solution: [
          '**Base case.** $n = 1$: L.H.S. $= \\tfrac{1}{2}$; R.H.S. $= 1 - \\tfrac{1}{2} = \\tfrac{1}{2}$. True.',
          '**Induction hypothesis.** Assume the sum through $\\tfrac{1}{2^k}$ equals $1 - \\tfrac{1}{2^k}$.',
          '**Inductive step.** Add $\\tfrac{1}{2^{k+1}}$: the new sum is $1 - \\tfrac{1}{2^k} + \\tfrac{1}{2^{k+1}} = 1 - \\tfrac{2}{2^{k+1}} + \\tfrac{1}{2^{k+1}} = 1 - \\tfrac{1}{2^{k+1}}$ — statement $P(k+1)$.',
          'Hence $P(k+1)$ whenever $P(k)$; with the base, $P(n)$ holds for all $n$.',
          'Hence at $n = 4$: $\\tfrac{1}{2} + \\tfrac{1}{4} + \\tfrac{1}{8} + \\tfrac{1}{16} = \\tfrac{15}{16}$, matching $1 - \\tfrac{1}{16}$.',
        ], answer: 'the identity holds for all $n$; at $n = 4$ the sum is exactly $\\tfrac{15}{16}$' },
        { q: 'Prove by induction that $3^n \\geq 2^n + 1$ for every natural number $n$, and identify the case of equality.', solution: [
          '**Base case.** $n = 1$: $3 \\geq 3$ — equality. True.',
          '**Induction hypothesis.** Assume $3^k \\geq 2^k + 1$ for some $k$.',
          '**Inductive step.** $3^{k+1} = 3 \\cdot 3^k \\geq 3(2^k + 1) = 3 \\cdot 2^k + 3$. Compare with $2^{k+1} + 1 = 2 \\cdot 2^k + 1$: the difference is $(3 \\cdot 2^k + 3) - (2 \\cdot 2^k + 1) = 2^k + 2 > 0$.',
          'So, $3^{k+1} \\geq 2^{k+1} + 1$, with strict inequality for every $k \\geq 1$.',
          'Hence $P(k+1)$ whenever $P(k)$; with the base, $P(n)$ holds for all $n$ — and equality holds ONLY at $n = 1$, since every step after it opens a strictly positive gap.',
        ], answer: '$3^n \\geq 2^n + 1$ for all $n$, with equality exactly at $n = 1$' },
      ] },
      { level: 'L4', questions: [
        { q: 'Prove that $2^n \\geq n^2$ for every natural number $n \\geq 4$, and explain in one sentence why the same proof does not cover $n = 3$.', solution: [
          '**Honest survey first.** $2^1 = 2 \\geq 1$, $2^2 = 4 \\geq 4$, but $2^3 = 8 < 9$: the claim must start at $n = 4$.',
          '**Base case (shifted).** $n = 4$: $16 = 16$ — equality. True.',
          '**Induction hypothesis.** Assume $2^k \\geq k^2$ for some $k \\geq 4$.',
          '**Inductive step.** $2^{k+1} = 2 \\cdot 2^k \\geq 2k^2 \\geq (k+1)^2$, the last inequality since $2k^2 - (k+1)^2 = (k-1)^2 - 2 \\geq 9 - 2 > 0$ for $k \\geq 4$.',
          'Hence $P(k+1)$ whenever $P(k)$ with $k \\geq 4$; with the base, $P(n)$ holds for all $n \\geq 4$.',
          'Hence the sentence: the proof does not cover $n = 3$ because the statement is FALSE there ($8 < 9$) — the step’s slack argument $(k-1)^2 \\geq 2$ fails at $k = 2$ precisely where the truth fails.',
        ], answer: '$2^n \\geq n^2$ for all $n \\geq 4$; $n = 3$ is the fail-witness $8 < 9$, and the step’s slack dies exactly there' },
        { q: 'Prove by induction that $4^n + 15n - 1$ is divisible by $9$ for every natural number $n$.', solution: [
          '**Base case.** $n = 1$: $4 + 15 - 1 = 18 = 9 \\cdot 2$. True.',
          '**Induction hypothesis.** Assume $4^k + 15k - 1 = 9m$ for some integer $m$.',
          '**Inductive step.** The $(k+1)$-case: $4^{k+1} + 15(k+1) - 1 = 4 \\cdot 4^k + 15k + 14$. Write $4^k = 9m - 15k + 1$ from the hypothesis.',
          'So, $4 \\cdot 4^k + 15k + 14 = 4(9m - 15k + 1) + 15k + 14 = 36m - 45k + 18 = 9(4m - 5k + 2)$ — divisible by $9$.',
          'Hence $P(k+1)$ whenever $P(k)$; with the base, $P(n)$ holds for all $n$ (witnesses: $18, 45, 108, 321$ for $n = 1$ to $4$).',
        ], answer: '$4^n + 15n - 1$ is divisible by $9$ for every natural number $n$' },
        { q: 'State and prove Bernoulli’s inequality: for every real $x \\geq -1$ and every natural number $n$, $(1+x)^n \\geq 1 + nx$. Then use it to compare $(1.02)^5$ with $1.10$. (exam-style)', solution: [
          '**Statement.** $x \\geq -1$, $n \\in \\mathbb{N}$ $\\Rightarrow$ $(1+x)^n \\geq 1 + nx$.',
          '**Base case.** $n = 1$: both sides equal $1 + x$. True with equality.',
          '**Induction hypothesis.** Assume $(1+x)^k \\geq 1 + kx$ for some $k$; note $1 + x \\geq 0$ makes multiplication by $(1+x)$ legal.',
          '**Inductive step.** $(1+x)^{k+1} = (1+x)^k (1+x) \\geq (1 + kx)(1 + x) = 1 + (k+1)x + kx^2 \\geq 1 + (k+1)x$, since $kx^2 \\geq 0$.',
          'Hence $P(k+1)$ whenever $P(k)$; with the base, $P(n)$ holds for all $n$.',
          'Hence the application: $(1.02)^5 \\geq 1 + 5(0.02) = 1.10$ — the linear bound is the theorem’s direct output (and $1.02^5 = 1.1040808\\ldots$ in fact, so the bound is honest and slightly tight).',
        ], answer: 'Bernoulli proved by induction on the multiplication structure; $(1.02)^5 \\geq 1.10$' },
      ] },
      { level: 'L5', questions: [
        { q: 'Prove that $n^5 - n$ is divisible by $30$ for every natural number $n$, using induction for one factor and a residue argument for the other.', solution: [
          'Factor honestly: $n^5 - n = n(n^4 - 1) = n(n^2 - 1)(n^2 + 1) = (n-1)\\,n\\,(n+1)(n^2 + 1)$.',
          'Now, the factor $6$: $(n-1)n(n+1)$ is three consecutive integers, so one is even and one is a multiple of $3$ — the product carries $2 \\cdot 3 = 6$. (Induction certifies the same fact as the lesson’s $n^3 - n$ theorem, of which this is the same witness family.)',
          'The factor $5$, by residues: for $n \\equiv 0$ the factor $n$ carries $5$; for $n \\equiv \\pm 1$, $n^2 - 1 \\equiv 0$; for $n \\equiv \\pm 2$, $n^2 + 1 \\equiv 4 + 1 \\equiv 0 \\pmod 5$ — every residue class is covered.',
          'So, $6$ and $5$ are coprime and both divide $n^5 - n$, hence $30 \\mid n^5 - n$ for every $n$; an induction on $n$ with hypothesis $k^5 - k = 30m$ and step $(k+1)^5 - (k+1) = (k^5 - k) + 5k(k^3 + 1) + 10k^2(k+1)$ re-derives the same, since each new term carries a $5$ and the bracket $k(k^3+1) + 2k^2(k+1)$ is even.',
          'Hence the witnesses: $2^5 - 2 = 30$, $3^5 - 3 = 240 = 30 \\cdot 8$, $4^5 - 4 = 1020 = 30 \\cdot 34$.',
        ], answer: '$n^5 - n$ is divisible by $30$ for every natural number $n$ (the $6$ rides the consecutive triple, the $5$ rides the five residue classes)' },
        { q: 'Prove by induction that $\\tfrac{1}{n+1} + \\tfrac{1}{n+2} + \\cdots + \\tfrac{1}{2n} \\geq \\tfrac{1}{2}$ for every natural number $n \\geq 1$, giving the exact fraction at $n = 2$.', solution: [
          '**Base case.** $n = 1$: L.H.S. $= \\tfrac{1}{2} = \\tfrac{1}{2}$ — equality. True.',
          '**Induction hypothesis.** Assume $\\tfrac{1}{k+1} + \\cdots + \\tfrac{1}{2k} \\geq \\tfrac{1}{2}$ for some $k$.',
          '**Inductive step.** The $(k+1)$-case replaces the head term $\\tfrac{1}{k+1}$ with $\\tfrac{1}{k+2}$ and APPENDS $\\tfrac{1}{2k+1}$ and $\\tfrac{1}{2k+2}$: new sum $= \\left(\\tfrac{1}{k+1} + \\cdots + \\tfrac{1}{2k}\\right) - \\tfrac{1}{k+1} + \\tfrac{1}{2k+1} + \\tfrac{1}{2k+2}$.',
          'Now, $\\tfrac{1}{2k+1} + \\tfrac{1}{2k+2} \\geq \\tfrac{2}{2k+2} = \\tfrac{1}{k+1}$ (each of the two new denominators is at most $2k+2$), so the change is non-negative.',
          'Hence the new sum is at least the old sum, which is at least $\\tfrac{1}{2}$: $P(k+1)$ whenever $P(k)$; with the base, $P(n)$ holds for all $n$.',
          'Hence at $n = 2$: $\\tfrac{1}{3} + \\tfrac{1}{4} = \\tfrac{7}{12} \\geq \\tfrac{1}{2}$ — the exact fraction.',
        ], answer: 'the tail sum is $\\geq \\tfrac{1}{2}$ for all $n$; at $n = 2$ it is exactly $\\tfrac{7}{12}$' },
        { q: 'Using strong induction, prove that every integer amount of $2$ rupees or more can be paid with $2$-rupee and $3$-rupee coins, and exhibit a payment for $17$ rupees.', solution: [
          '**Base cases.** $2 = 2$ (one coin); $3 = 3$ (one coin). Both fall — the step will reach two back.',
          '**Strong induction hypothesis.** Assume every amount $j$ with $2 \\leq j \\leq k$ is payable, for some $k \\geq 3$.',
          '**Inductive step.** To pay $k + 1 \\geq 4$: first pay $k - 1$ (payable since $3 \\leq k - 1 \\leq k$ sits inside the assumed prefix), then add one $2$-rupee coin.',
          'Hence $k + 1$ is payable whenever the prefix is; with both bases, every amount $\\geq 2$ is payable — by strong induction.',
          'Hence the exhibit for $17$: $17 = 7 \\cdot 2 + 1 \\cdot 3 = 14 + 3$ — seven $2$s and one $3$.',
        ], answer: 'every amount $\\geq 2$ is payable; $17 = 7 \\cdot 2 + 1 \\cdot 3$' },
      ] },
      { level: 'L6', questions: [
        { q: 'The "all horses are the same colour" fallacy claims: for every $k \\geq 1$, in any set of $k$ horses all share a colour. Its base ($k = 1$) is true and its step argues "remove one horse; the remaining $k$ agree by hypothesis; reinsert and remove another; so all agree." Pinpoint the exact value of $k$ where the step breaks, and explain why this kills the induction.', solution: [
          'The step’s two sub-arguments each invoke the hypothesis on a $k$-element subset; stitching them together needs the two subsets to OVERLAP — a horse common to both — so the agreed colour transfers.',
          'Take the first move from $k$ to $k + 1 = 2$: the subsets are $\\{\\text{horse}_1\\}$ and $\\{\\text{horse}_2\\}$, and their intersection is EMPTY — no horse is common to both, so no colour transfers.',
          'So, the step is valid exactly for $k \\geq 2$ and FAILS at $k = 1$ — the gap sits immediately after the base, between $P(1)$ and $P(2)$.',
          'Hence nothing is delivered beyond the (true) base: $P(1)$ holds, the step from 1 to 2 does not, and the chain never starts moving — the fallacy is a complete induction proof EXCEPT for one broken step value, which is one value too many.',
        ], answer: 'the step breaks at $k = 1$ (disjoint singleton sets, no overlap to carry the colour) — one broken value stops the whole chain' },
        { q: 'Prove by induction that $n! \\geq 2^{n-1}$ for every natural number $n$, and state the inequality’s values at $n = 9$. Where does equality hold?', solution: [
          '**Base case.** $n = 1$: $1! = 1 = 2^0$. Equality. True.',
          '**Induction hypothesis.** Assume $k! \\geq 2^{k-1}$ for some $k$.',
          '**Inductive step.** $(k+1)! = (k+1) \\cdot k! \\geq (k+1) \\cdot 2^{k-1} \\geq 2 \\cdot 2^{k-1} = 2^k$, the middle move using $k + 1 \\geq 2$.',
          'Hence $P(k+1)$ whenever $P(k)$; with the base, $P(n)$ holds for all $n$.',
          'Hence at $n = 9$: $9! = 362880 \\geq 2^8 = 256$ — the inequality has run far past equality.',
          'Hence the equality census: equality holds at $n = 1$ ($1 = 1$) and $n = 2$ ($2 = 2$); from $n = 3$ on ($6 > 4$) every step opens the gap wider, since the factor $(k+1) \\geq 2$ is strict from $k + 1 = 3$.',
        ], answer: '$n! \\geq 2^{n-1}$ for all $n$; at $n = 9$ it reads $362880 \\geq 256$; equality exactly at $n = 1, 2$' },
      ] },
    ] },
    { kind: 'formula', name: 'The induction template', latex: 'P(1)\\;\\wedge\\;\\bigl(\\forall k,\\; P(k) \\Rightarrow P(k+1)\\bigr) \\;\\Rightarrow\\; \\forall n,\\; P(n)', note: 'base proved, step proved for every $k$ — nothing else is needed; the shifted base $P(n_0)$ variant when truth starts at $n_0$.' },
    { kind: 'formula', name: 'Sum formulas certified this lesson', latex: '\\sum_{r=1}^{n} r = \\tfrac{n(n+1)}{2}, \\quad \\sum_{r=1}^{n} r^2 = \\tfrac{n(n+1)(2n+1)}{6}, \\quad \\sum_{r=1}^{n} r^3 = \\left(\\tfrac{n(n+1)}{2}\\right)^{\\!2}', note: 'derived by ladders in lesson 5.5; certified for every $n$ by induction here.' },
    { kind: 'formula', name: 'The odd numbers are shells of a square', latex: '1 + 3 + 5 + \\cdots + (2n-1) = n^2', note: 'the gnomon picture: L-shaped shells of size $1, 3, 5, \\ldots$ tile the $n \\times n$ square.' },
    { kind: 'formula', name: 'Bernoulli’s inequality', latex: '(1+x)^n \\geq 1 + nx \\qquad (x \\geq -1,\\; n \\in \\mathbb{N})', note: 'the engine behind lesson 7.6’s $(1+x)^n \\approx 1 + nx$ for small $x$.' },
    { kind: 'formula', name: 'Strong induction', latex: '[P(1) \\wedge P(2)] \\wedge \\bigl(\\forall k,\\; [P(j) \\text{ for all } j \\leq k] \\Rightarrow P(k+1)\\bigr) \\Rightarrow \\forall n,\\; P(n)', note: 'assume the WHOLE prefix has fallen; the base covers as many cases as the step reaches back.' },
  ],
}

/* ------------------------------------------------------------------ */
/* lesson 7.2                                                          */
/* ------------------------------------------------------------------ */

function pascalTriangleSvg(): string {
  // rows 0..6 of Pascal's triangle; the two-parent arrows are drawn for the
  // 4 -> row-4 middle cell (C(3,1) + C(3,2) = C(4,2) = 6); the greatest
  // entry of each row (the middle) is highlighted orange
  const R = 15
  const dx = 38
  const y0 = 56
  const dy = 46
  const cx0 = 360
  const cell = (n: number, r: number) => ({ x: cx0 + (r - n / 2) * dx, y: y0 + n * dy, v: binomSvg(n, r) })
  const midOf = (n: number) => (n % 2 === 0 ? n / 2 : null)
  let s = ''
  for (let n = 0; n <= 6; n++) {
    const mid = midOf(n)
    for (let r = 0; r <= n; r++) {
      const { x, y, v } = cell(n, r)
      const hot = mid !== null && r === mid
      s += `<circle cx="${x}" cy="${y}" r="${R}" fill="${hot ? '#ea580c' : '#fef3c7'}" stroke="#16a34a" stroke-width="1.8"/><text x="${x}" y="${y + 5}" font-size="12.5" font-weight="800" fill="${hot ? '#ffffff' : '#166534'}" text-anchor="middle">${v}</text>`
    }
    s += `<text x="${cx0 - (n / 2) * dx - 66}" y="${y0 + n * dy + 5}" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="end">row ${n}</text>`
  }
  // the two-parent arrows into C(4,2) = 6
  const a = cell(3, 1), b = cell(3, 2), t = cell(4, 2)
  const arrow = (from: { x: number; y: number }, to: { x: number; y: number }) =>
    `<line x1="${from.x + 10}" y1="${from.y + 14}" x2="${to.x - 4}" y2="${to.y - 15}" stroke="#d97706" stroke-width="2"/><path d="M ${to.x - 4} ${to.y - 15} l 9 1 l -5 8 z" fill="#d97706"/>`
  return `<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pascal triangle rows zero to six, values 1; 1 1; 1 2 1; 1 3 3 1; 1 4 6 4 1; 1 5 10 10 5 1; 1 6 15 20 15 6 1. Each entry is the sum of the two entries above it — the amber arrows show 3 plus 3 making 6 in row four — and each entry is also C(n, r), the number of ways to choose r of n objects. The middle entry of each row, highlighted orange, is the greatest coefficient.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">Pascal's triangle: each entry sums its two parents — and counts selections</text>
  ${s}
  ${arrow(a, t)}${arrow(b, t)}
  <text x="180" y="${y0 + 4 * dy + 34}" font-size="11" font-weight="700" fill="#166534" text-anchor="middle">3 + 3 = 6: Pascal's rule at work</text>
  <text x="360" y="382" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">row n carries the coefficients of (a + b)ⁿ — n + 1 entries, the middle one greatest</text>
</svg>`
}

function binomSvg(n: number, r: number): string {
  // C(n, r) computed honestly for the SVG labels
  let v = 1
  for (let i = 0; i < r; i++) v = (v * (n - i)) / (i + 1)
  return String(Math.round(v))
}

function factorChoiceSvg(): string {
  // the counting proof for (a+b)^4: the 16 products of four (a|b) factors,
  // grouped by how many factors donate b — the group sizes ARE 1,4,6,4,1
  const slotW = 13
  const stripW = 4 * slotW + 6
  const colX = (r: number) => 70 + r * 112
  const baseY = 330
  const groups = [1, 4, 6, 4, 1]
  const colLabels = ['0 b', '1 b', '2 b', '3 b', '4 b']
  let s = ''
  for (let r = 0; r < 5; r++) {
    const g = groups[r]
    for (let k = 0; k < g; k++) {
      const y = baseY - (k + 1) * 26
      let strip = ''
      for (let i = 0; i < 4; i++) {
        const donatesB = (r === 0 ? false : true) && i < r // the first r slots donate b (representative strips)
        strip += `<rect x="${colX(r) + i * slotW}" y="${y}" width="${slotW - 3}" height="20" rx="3" fill="${donatesB ? '#ea580c' : '#fef3c7'}" stroke="#d97706" stroke-width="1.4"/>`
      }
      s += strip
    }
    s += `<text x="${colX(r) + stripW / 2 - 6}" y="${baseY + 20}" font-size="12" font-weight="800" fill="#166534" text-anchor="middle">${g}</text>`
    s += `<text x="${colX(r) + stripW / 2 - 6}" y="${baseY + 38}" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">${colLabels[r]}</text>`
  }
  return `<svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The counting proof drawn out for a plus b to the fourth: sixteen strips, one per way to choose which of the four factors donates b. Grouped by how many factors donate b, the groups hold 1, 4, 6, 4 and 1 strips — exactly the coefficients of the expansion. The middle group of six, with two orange b-slots each, is the coefficient of a-squared b-squared.">
  <text x="320" y="26" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the counting proof at (a + b)⁴: 16 products, grouped by b-count</text>
  ${s}
  <text x="320" y="${baseY + 66}" font-size="11.5" font-weight="800" fill="#166534" text-anchor="middle">the group sizes 1, 4, 6, 4, 1 ARE the coefficients</text>
  <text x="320" y="${baseY + 86}" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">orange slot = that factor donates b; amber slot = it donates a — the coefficient of a²b² is the count of strips with two orange slots</text>
</svg>`
}

const lesson72: Lesson = {
  id: 'aa-the-binomial-theorem-proved',
  number: '7.2',
  title: 'The Binomial Theorem, Proved',
  concepts: [
    'the binomial theorem for a positive integral index',
    'Pascal’s triangle and Pascal’s rule',
    'the counting proof: coefficients are selection counts',
    'the induction proof: the theorem lesson 7.1’s engine certifies',
    'the general term T_{r+1} = nCr a^{n−r} b^r',
    'the middle term(s) and the greatest coefficient',
    'terms from the end: the (n + 2 − p) reversal',
    'the reflex toolkit: (a ± b)², (a ± b)³ and kin',
  ],
  objectives: [
    'State the binomial theorem for a positive integral index in both its summation and term forms, and say exactly how many terms the expansion has.',
    'Prove the theorem TWICE — once by the counting argument on chapter 6’s selections, once by induction on n using Pascal’s rule and lesson 7.1’s engine.',
    'Build Pascal’s triangle from Pascal’s rule and explain why each entry is simultaneously a sum of two parents and a selection count C(n, r).',
    'Price any specific term with the general term formula, including the (a − b)ⁿ sign discipline.',
    'Locate the middle term when n is even and the two middle terms when n is odd, and connect them to the greatest coefficient of the row.',
    'Convert between term positions from the start and from the end with the (n + 2 − p) rule, verified on explicit term lists.',
    'Reassemble a hidden power from its expansion — the reverse read examinations set as recognition items.',
  ],
  prerequisites: ['aa-factorials-and-the-counting-toolkit', 'aa-combinations-the-selection-count', 'aa-mathematical-induction-the-domino-principle'],
  sources: ['cengage-m2-08', 'cengage-jee-style', 'ncert-math11-ch7-binomial-theorem', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus'],
  blocks: [
    { kind: 'para', text: 'Two of the last three chapters have been quietly circling the same mountain. Chapter 6 built the exact science of counting — chains, seats, selections, $\\binom{n}{r}$ priced as a formula and as a meaning; and chapter 5’s sigma machinery multiplied powers and summed them. What nobody has yet done is point the counting engine at ALGEBRA ITSELF and ask the most natural question in the subject: what is $(a + b)^n$, fully expanded, for a general positive integer $n$? The reflex answers are old friends — $(a+b)^2 = a^2 + 2ab + b^2$ and $(a+b)^3 = a^3 + 3a^2 b + 3ab^2 + b^3$ were banked in Elementary Algebra and have been silently powering quadratics and cubics ever since. The binomial theorem is what those two facts grow into when $n$ is let loose: a complete, closed description of the expansion — every coefficient, every power, the exact number of terms — and this chapter’s headline proof of it uses the domino engine lesson 7.1 built, plus a second proof chapter 6 built. Two proofs, one theorem: the honest sign that the ground has matured.' },
    { kind: 'para', text: 'The chapter’s opening toolkit first, because every examination assumes it by reflex and because the toolkit IS the theorem’s smallest cases. For example, the family every student must reconstruct without thinking:' },
    { kind: 'list', marker: 'roman', items: [
      '$(a + b)^2 = a^2 + 2ab + b^2$ and $(a - b)^2 = a^2 - 2ab + b^2$ — the two quadratics behind every completing-the-square and every discriminant read;',
      '$(a + b)^3 = a^3 + 3a^2 b + 3ab^2 + b^3$ and $(a - b)^3 = a^3 - 3a^2 b + 3ab^2 - b^3$ — the cubics behind every $a^3 \\pm b^3$ factorisation;',
      '$(a + b)^4 = a^4 + 4a^3 b + 6a^2 b^2 + 4ab^3 + b^4$ — read off the coefficient row $1, 4, 6, 4, 1$;',
      'and the coefficient rows themselves: $1$; $1, 1$; $1, 2, 1$; $1, 3, 3, 1$; $1, 4, 6, 4, 1$; $1, 5, 10, 10, 5, 1$ — the triangle the whole lesson lives inside.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Where the coefficients come from — the counting peek before the theorem', text: 'Expand (a+b)³ by hand, without collecting: (a+b)(a+b)(a+b) = aaa + aab + aba + abb + baa + bab + bba + bbb — EIGHT products, one per way to pick a or b from each of three factors. Group them: one aaa (a³), three ways to pick one b (3ab²... arranged as 3a²b), three ways to pick two b’s (3ab²), one bbb. The counts 1, 3, 3, 1 are not algebra accidents — they are SELECTION counts: C(3, r) ways to choose which r of the 3 factors donate b. Chapter 6’s machinery was built for exactly this sentence.' },

    { kind: 'para', text: 'And the toolkit is not merely a neighbour of the theorem — it IS the theorem at its smallest cases, and the two reflex identities keep specific promises inside the general formula. Setting $n = 2$ recovers $(a+b)^2 = \\binom{2}{0}a^2 + \\binom{2}{1}ab + \\binom{2}{2}b^2 = a^2 + 2ab + b^2$ — row 2 of the triangle IS the quadratic. Setting $n = 3$ recovers the cubic, with the coefficients $1, 3, 3, 1$ standing in the same seats. And the difference forms keep their own promises: the middle term of $(a-b)^3$ is NEGATIVE ($-3a^2b$ and $+3ab^2$, alternating), which is exactly why $a^3 - b^3 = (a-b)(a^2 + ab + b^2)$ — the factorisation’s plus-signs are the theorem’s alternating signs wearing cancellation as clothes: $(a-b)(a^2+ab+b^2) = a^3 + a^2b + ab^2 - a^2b - ab^2 - b^3$, the interior terms killing each other in ± pairs. Every reflex identity a student carries into the examination hall is the binomial theorem at $n = 2$ or $3$, and the general formula is what lets the reflexes extend to seats they never memorised.' },

    { kind: 'heading', text: 'Pascal’s Triangle: One Object, Two Meanings' },
    { kind: 'para', text: 'The coefficient rows arrange into a triangle with a mechanical generation rule. Row $n$ holds the $n + 1$ coefficients of $(a+b)^n$; and row $n+1$ is produced from row $n$ by one move — each interior entry is the SUM of the two entries above it, with $1$s bordering every row. The rule is named for Blaise Pascal, whose 1654 treatise gave it its European name, but the triangle is far older: the additive rule appears in Pingala’s ancient Indian work (commentators elaborating it around the early centuries CE), in Varahamihira’s 6th-century astronomical writing, in Chinese and Persian manuscripts centuries before Pascal — this book says, as it always does, that the arithmetic belongs to the whole tradition, and the history callout carries the honest pointers.' },
    { kind: 'figure', caption: 'Pascal’s triangle, rows 0 to 6. The generation rule is visible in the amber arrows: the two 3s of row 3 sum to the 6 of row 4 — Pascal’s rule. But each entry has a SECOND meaning: row n, entry r is C(n, r), the number of ways to choose r objects from n (chapter 6’s selection count). The middle entry of each row is highlighted: it is the greatest coefficient of the row, the seat the middle-term pricing finds below.', svg: pascalTriangleSvg() },
    { kind: 'derivation', title: 'Pascal’s rule, proved — the hinge that joins the two meanings', statement: 'For all n ≥ 1 and 0 ≤ r ≤ n−1: C(n, r) + C(n, r−1) = C(n+1, r). Each entry is the sum of its two parents — the triangle’s generation rule is a theorem about selections.', steps: [
      { label: 'Split the selections by the newest object', formula: '\\binom{n+1}{r} = \\binom{n}{r} + \\binom{n}{r-1}', explanation: 'Choose $r$ of $n+1$ objects; the newest object is either NOT chosen ($\\binom{n}{r}$ ways, all from the other $n$) or CHOSEN ($\\binom{n}{r-1}$ ways: pick the remaining $r-1$ from the other $n$). The two cases are disjoint and exhaustive — the addition rule of lesson 6.1 prices the union.' },
      { label: 'Verify the algebra', formula: '\\tfrac{n!}{r!(n-r)!} + \\tfrac{n!}{(r-1)!(n-r+1)!} = \\tfrac{n!(n+1)}{r!(n-r+1)!} = \\tfrac{(n+1)!}{r!(n+1-r)!}', explanation: 'Over the common denominator $r!(n-r+1)!$ the numerator collects $n!(n-r+1) + n!\\,r = n!(n+1)$ — the same identity, derived purely from the factorial form; the counting proof and the algebraic proof agree, as they must.' },
      { label: 'Witnesses at the triangle', formula: '\\binom{4}{2} = 3 + 3 = 6; \\quad \\binom{5}{3} = 6 + 4 = 10', explanation: 'The rule at the exact cells the figure arrows draw — row 4’s 6 from row 3’s $3 + 3$, row 5’s 10 from $\\binom{4}{2} + \\binom{4}{3} = 6 + 4$.' },
    ], result: '$\\binom{n}{r} + \\binom{n}{r-1} = \\binom{n+1}{r}$ — the triangle’s rule is a counting theorem, and the selection meaning makes it obvious' },
    { kind: 'table', head: ['n', 'Row $n$ (coefficients of $(a+b)^n$)', 'Sum of the row'], rows: [
      ['0', '1', '1'],
      ['1', '1, 1', '2'],
      ['2', '1, 2, 1', '4'],
      ['3', '1, 3, 3, 1', '8'],
      ['4', '1, 4, 6, 4, 1', '16'],
      ['5', '1, 5, 10, 10, 5, 1', '32'],
      ['6', '1, 6, 15, 20, 15, 6, 1', '64'],
      ['7', '1, 7, 21, 35, 35, 21, 7, 1', '128'],
      ['8', '1, 8, 28, 56, 70, 56, 28, 8, 1', '256'],
    ], caption: 'The coefficient rows to n = 8, each verified by literal repeated multiplication of (a + b) n times; the sums are 2ⁿ — setting a = b = 1 in the theorem (lesson 7.5 mines this systematically).' },
    { kind: 'para', text: 'Note the sum column’s whisper: setting $a = b = 1$ in $(a+b)^n$ must give $\\sum_{r=0}^{n} \\binom{n}{r} = 2^n$, and the table confirms it row by row — a theorem lesson 7.5 proves properly with the chapter’s engines; here it is the triangle’s own fingerprint, checked numerically as far as the table runs. Note too the sum column’s SHAPE: each row’s total is exactly twice the previous row’s ($2, 4, 8, 16, \ldots$), and Pascal’s rule says why in one line — the sum of row $n+1$ collects every adjacent pair of row $n$, and each entry of row $n$ participates in exactly two such pairs, so the new total is the old total counted twice. The doubling is not a coincidence of these particular rows; it is the generation rule itself, read as an accounting identity — and it is the coefficient-level shadow of the same fact at the level of products ($2^{n+1} = 2 \\cdot 2^n$ uncollected terms).' },

    { kind: 'callout', tone: 'historical', title: 'From Pascal to Newton: where this chapter’s road forks', text: 'The positive-index theorem was known to the tradition long before Pascal’s 1654 Traité: the triangle’s generation rule appears in Pingala’s prosody work as elaborated by early commentators, in Varahamihira’s 6th-century writing, in al-Karaji’s and Omar Khayyam’s Persian algebra, and in Yang Hui’s Chinese treatise — every one of them centuries before the European name stuck. What Newton saw around 1665 is the fork this book reaches in lesson 7.3: the SAME series idea continues past the positive integers to negative and fractional indices, where the expansion stops being a finite polynomial and becomes an infinite series — the ground of the general binomial theorem. This lesson’s finite theorem is the entry ticket; 7.3’s extension is Newton’s, and its honesty requires convergence care the finite case never needed.' },

    { kind: 'heading', text: 'The Binomial Theorem, Stated' },
    { kind: 'callout', tone: 'theorem', title: 'The binomial theorem (positive integral index)', text: 'For every positive integer $n$ and any two quantities $a, b$: $(a + b)^n = \\binom{n}{0} a^n + \\binom{n}{1} a^{n-1} b + \\binom{n}{2} a^{n-2} b^2 + \\cdots + \\binom{n}{n} b^n = \\sum_{r=0}^{n} \\binom{n}{r} a^{n-r} b^r$. The expansion has exactly $n + 1$ terms; the $r$-index runs $0$ to $n$; the powers of $a$ descend while the powers of $b$ ascend, and the two exponents of every term add to $n$.' },
    { kind: 'equation', latex: '(a + b)^n = \\sum_{r=0}^{n} \\binom{n}{r} a^{n-r} b^r \\tag{1}', note: 'for $n \\in \\mathbb{N}$; the $r$-th term (calling the first term $r = 0$) is $T_{r+1} = \\binom{n}{r} a^{n-r} b^r$ — the general term every pricing below runs on.' },
    { kind: 'para', text: 'For example, the sign variant: replacing $b$ by $-b$ in (1) and watching $(-b)^r = (-1)^r b^r$ alternate the signs,' },
    { kind: 'equation', latex: '(a - b)^n = \\sum_{r=0}^{n} (-1)^r \\binom{n}{r} a^{n-r} b^r', note: 'the signs alternate strictly: plus, minus, plus, minus — the last term’s sign is $(-1)^n$; the general term carries $(-1)^r$, and forgetting it is the family’s classic error.' },
    { kind: 'para', text: 'Thus the symmetry: since $\\binom{n}{r} = \\binom{n}{n-r}$ (the selection symmetry of 6.5), the expansion reads the same forwards and backwards with $a$ and $b$ swapped — the coefficient of $a^{n-r} b^r$ equals the coefficient of $a^r b^{n-r}$. And the sum column of the table above is (1) with $a = b = 1$: $2^n$. Three structural facts to bank before the proofs: exactly $n + 1$ terms; coefficients symmetric about the middle; total coefficient mass $2^n$.' },

    { kind: 'heading', text: 'Proof One: the Counting Proof' },
    { kind: 'para', text: 'The first proof is chapter 6 running at full song. Multiply out $(a+b)^n$ WITHOUT collecting like terms: by the multiplication rule there are $2^n$ products, one for each way to choose — from each of the $n$ factors $(a+b)$ — whether that factor donates its $a$ or its $b$. A product with exactly $r$ factors donating $b$ carries $b^r$ and $a^{n-r}$; the number of such products is the number of ways to choose WHICH $r$ of the $n$ factors donate $b$, namely $\\binom{n}{r}$. Collecting, the coefficient of $a^{n-r} b^r$ is exactly $\\binom{n}{r}$ — which is the theorem. Every term of (1) is a selection count in costume.' },
    { kind: 'figure', caption: 'The counting proof drawn out for $n = 4$: all 16 products of four (a|b) choices, grouped by how many factors donate b. The groups hold 1, 4, 6, 4, 1 strips — exactly row 4 of the triangle, because a group of size C(4, r) is by definition the count of ways to pick which r of the four factors donate b. The middle group (two orange slots per strip) IS the coefficient 6 of a²b².', svg: factorChoiceSvg() },
    { kind: 'example', title: 'The counting proof at ground level: expand $(a+b)^4$ by hand and collect', steps: [
      'The raw multiplication rule prices the census: $2^4 = 16$ uncollected products — aaaa, aaab in its 4 seat-choices, aabb in its 6, abbb in its 4, bbbb.',
      'Now, group by how many factors donated $b$: one product has none (aaaa $= a^4$), four have one (4 seats for the single $b$), six have two ($\\binom{4}{2} = 6$ seat-pairs), four have three, one has all four.',
      'So, collecting within each group: $a^4$ with coefficient 1, $a^3 b$ with $4$, $a^2 b^2$ with $6$, $a b^3$ with $4$, $b^4$ with $1$.',
      'Hence $(a+b)^4 = a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4$ — the row $1, 4, 6, 4, 1$, each coefficient a literal count of products, verified by multiplying the whole expansion out at $a = 2, b = 3$: $5^4 = 625$, and the collected form gives $16 + 96 + 216 + 192 + 81 = 625$.',
    ] },

    { kind: 'heading', text: 'Proof Two: the Induction Proof — Lesson 7.1’s Engine at the Headline' },
    { kind: 'para', text: 'The counting proof is complete on its own. But the theorem is ALSO the demonstration piece for the engine the whole chapter was built for — the one proof idea that certifies a statement for every $n$ at once — and running it here is the chapter summary’s explicit promise ("the theorem PROVED by induction"). The proof needs one preparation: Pascal’s rule above, which is exactly the algebra the inductive step will lean on.' },
    { kind: 'derivation', title: 'The binomial theorem, proved by induction on n', statement: 'For every positive integer n, (a + b)ⁿ = Σᵣ C(n, r) aⁿ⁻ʳ bʳ — proved by the domino principle, with Pascal’s rule supplying the step’s one merge.', steps: [
      { label: 'Base case n = 1', formula: '(a+b)^1 = a + b = \\binom{1}{0}a + \\binom{1}{1}b', explanation: 'Both sides read $a + b$ — the first domino falls by direct inspection, coefficients $\\binom{1}{0} = \\binom{1}{1} = 1$.' },
      { label: 'State the induction hypothesis', formula: '(a+b)^k = \\sum_{r=0}^{k} \\binom{k}{r} a^{k-r} b^r', explanation: 'Assume the closed expansion holds through exponent $k$ for some $k \\geq 1$ — the fallen domino, borrowed for one merge.' },
      { label: 'Multiply by (a + b)', formula: '(a+b)^{k+1} = (a+b)^k (a+b)', explanation: 'Each term of the assumed expansion is hit by $a$ (raising its $a$-power) and by $b$ (raising its $b$-power): the product opens into two sums, $\\sum_{r=0}^{k} \\binom{k}{r} a^{k-r+1} b^r$ and $\\sum_{r=0}^{k} \\binom{k}{r} a^{k-r} b^{r+1}$ — one per donation choice.' },
      { label: 'Collect the b^s-coefficient (1 ≤ s ≤ k)', formula: '\\binom{k}{s} + \\binom{k}{s-1} = \\binom{k+1}{s}', explanation: 'The $b^s$-terms arrive from the first sum at $r = s$ and the second at $r = s - 1$; their sum merges by Pascal’s rule — the one external theorem the proof needs, itself proved above.' },
      { label: 'The edge terms merge automatically', formula: '\\binom{k+1}{0} = \\binom{k}{0}; \\quad \\binom{k+1}{k+1} = \\binom{k}{k}', explanation: 'The $a^{k+1}$ term comes only from the first sum’s $r = 0$ (coefficient 1), the $b^{k+1}$ only from the second sum’s $r = k$ (coefficient 1) — no merge needed, and the coefficients are exactly the border 1s of row $k+1$.' },
      { label: 'Conclusion by induction', formula: '(a+b)^{k+1} = \\sum_{s=0}^{k+1} \\binom{k+1}{s} a^{k+1-s} b^s', explanation: 'Interior coefficients by Pascal’s rule, border coefficients by direct read: the hypothesis rebuilds itself one exponent higher. Both steps hold, so the theorem holds for every positive integer $n$. $\\blacksquare$' },
    ], result: 'The binomial theorem for every positive integral index — the counting proof shows WHY each coefficient is a selection count, the induction proof shows the formula PROPAGATES: two proofs, one theorem, neither replacing the other' },
    { kind: 'callout', tone: 'insight', title: 'What the two proofs each see — and why a theorem deserves both', text: 'The counting proof explains the COEFFICIENTS (each is a selection count — the meaning); the induction proof explains the FORMULA (it propagates row to row by Pascal’s rule — the mechanism). Examinations price the results; mathematics prices the understanding, and the two proofs are the difference between using the theorem and owning it. Which one to CITE depends on the claim being proved: coefficient identities that sum or weigh the row (7.5’s programme) are natural at $a = b = 1$ substitutions of the theorem, not new inductions; claims about how the expansion BEHAVES as n grows (new rows, new shapes) are natural inductions with Pascal’s rule as the merge; and claims about what each coefficient MEANS are natural counting arguments on the selection set. The multinomial theorem (7.4) will ask for the same three-way choice, and the habit formed here — meaning by counting, propagation by induction, values by substitution — carries over unchanged.' },

    { kind: 'heading', text: 'The Seat Dictionary: Reading Any Expansion Fluently' },
    { kind: 'para', text: 'Every pricing question in this lesson is a translation between three encodings of the same seat: the term NUMBER ($T_1$ through $T_{n+1}$, how examinations phrase the request), the index $r$ ($0$ through $n$, how the formula takes its input), and the monomial itself ($a^{n-r} b^r$, how the answer is recognised). The dictionary for $n = 5$ makes the three-way mapping concrete — and worth one slow read, because every error this lesson’s callouts warn about is a slip between adjacent columns:' },
    { kind: 'table', head: ['$T$', '$r$', '$\\binom{5}{r}$', '$(2+x)^5$ term'], rows: [
      ['$T_1$', '$0$', '1', '$32$'],
      ['$T_2$', '$1$', '5', '$80x$'],
      ['$T_3$', '$2$', '10', '$80x^2$'],
      ['$T_4$', '$3$', '10', '$40x^3$'],
      ['$T_5$', '$4$', '5', '$10x^4$'],
      ['$T_6$', '$5$', '1', '$x^5$'],
    ], caption: 'The seat dictionary for (2 + x)⁵: term number = r + 1; coefficient = C(5, r); the term prices as C(5, r)·2⁵⁻ʳ·xʳ. Note the coefficients peak at the middle seats ($T_3, T_4$) — the ratio law of 6.2 reborn for the rows: C(n, r+1)/C(n, r) = (n−r)/(r+1), which exceeds 1 exactly before the middle.' },

    { kind: 'heading', text: 'Conjugate Powers: Adding and Subtracting the Two Expansions' },
    { kind: 'para', text: 'One structural read turns the theorem into a machine for pairs of questions that look twice as long as they are. The two conjugate powers $(a+b)^n$ and $(a-b)^n$ carry the SAME coefficient magnitudes — they differ only in the signs $(-1)^r$. So their SUM cancels every odd-$r$ term (opposite signs) and doubles every even-$r$ term (equal signs), while their DIFFERENCE does the opposite:' },
    { kind: 'equation', latex: '(a+b)^n + (a-b)^n = 2\\bigl[\\tbinom{n}{0}a^n + \\tbinom{n}{2}a^{n-2}b^2 + \\cdots\\bigr]', note: 'the even seats only, doubled — the bracket’s pattern continues $+\\tbinom{n}{4}a^{n-4}b^4 + \\cdots$; the difference of the same two powers is the same machine on the odd seats (the identity E10 of the exercises verifies it on row 7).' },
    { kind: 'example', title: 'Evaluate $(1.02)^4 + (0.98)^4$ without expanding either power fully', steps: [
      'Recognise the conjugate shape: $1.02 = 1 + 0.02$ and $0.98 = 1 - 0.02$, so the sum is $(a+b)^4 + (a-b)^4$ with $a = 1$, $b = 0.02$.',
      'So, apply the even-seats machine: the sum is $2\\bigl[\\tbinom{4}{0} + \\tbinom{4}{2}(0.02)^2 + \\tbinom{4}{4}(0.02)^4\\bigr]$.',
      'Now, the numbers: the bracket is $1 + 6 \\cdot 0.0004 + 0.00000016 = 1.00240016$, and doubling gives $2.00480032$.',
      'Hence $(1.02)^4 + (0.98)^4 = 2.00480032$ — and the direct run agrees: $1.08243216 + 0.92236816 = 2.00480032$. Four binomial seats instead of two fourth powers: the conjugate read is the exam-speed route (and the odd seats — the terms with $b^1$ and $b^3$ — are exactly what the DIFFERENCE would have priced).',
    ] },

    { kind: 'heading', text: 'The General Term: Pricing Any Seat in the Expansion' },
    { kind: 'para', text: 'Almost every examination question about an expansion asks for ONE term or ONE coefficient — not the whole expansion — and the instrument for that is the general term. In the expansion of $(a+b)^n$, the $(r+1)$-th term (the indexing runs $r = 0, 1, \\ldots, n$, so the first term is $T_1$ with $r = 0$) is' },
    { kind: 'equation', latex: 'T_{r+1} = \\binom{n}{r} a^{n-r} b^r \\tag{4}', note: 'and for $(a - b)^n$: $T_{r+1} = (-1)^r \\binom{n}{r} a^{n-r} b^r$ — the sign factor $(-1)^r$ rides the term’s $b$-power, so odd $r$ terms are negative.' },
    { kind: 'para', text: 'Three discipline points the worked examples enforce: (i) convert the requested term NUMBER (say "the 7th term") into the index ($r = 6$) BEFORE touching the formula; (ii) in $(a-b)^n$ write the sign first, then compute magnitudes; (iii) keep the $a$-power descending and the $b$-power ascending consistently — the exponents of every term still add to $n$. And the translation runs both ways: when the examination gives the term NUMBER, subtract one for the index; when it gives the TARGET POWER of one letter, solve the exponent equation for $r$ instead — $x^{12-3r} = x^6$ hands over $r = 2$ directly (the E11 route below), and the seat is found before any coefficient is computed. Two entry doors, one dictionary: term number → $r$, or target power → $r$; everything after the door is the same formula. Now the pricing, at exam shape.' },
    { kind: 'example', title: 'Find the 7th term of $(2a + b)^{12}$', steps: [
      'Setup: the 7th term means $r = 6$ in $T_{r+1} = \\binom{12}{r} (2a)^{12-r} b^r$.',
      'So, $T_7 = \\binom{12}{6} (2a)^6 b^6$.',
      'Now, the numbers: $\\binom{12}{6} = 924$ (row 12’s middle entry) and $(2a)^6 = 64 a^6$.',
      'Hence $T_7 = 924 \\cdot 64 \\, a^6 b^6 = 59136 \\, a^6 b^6$.',
    ] },
    { kind: 'example', title: 'The expansion $81x^4 + 216x^3y + 216x^2y^2 + 96xy^3 + 16y^4$ is a fourth power — recognize it', steps: [
      'A fourth power’s expansion has $5$ terms with symmetric coefficients; read the pure terms first: $81x^4 = (3x)^4$ and $16y^4 = (2y)^4$ — candidates $a = 3x$, $b = 2y$.',
      'Now, check the middle coefficient against the theorem: for $(3x + 2y)^4$ the $x^2 y^2$ coefficient is $\\binom{4}{2} \\cdot 3^2 \\cdot 2^2 = 6 \\cdot 9 \\cdot 4 = 216$ — matches.',
      'So, verify the remaining rows the same way: $\\binom{4}{1} \\cdot 3^3 \\cdot 2 = 216$ and $\\binom{4}{3} \\cdot 3 \\cdot 2^3 = 96$ — both match.',
      'Hence the expansion is exactly $(3x + 2y)^4$ — the reverse read: theorem first, recognition second (and the whole expansion prices to $5^4 = 625$ at $x = y = 1$, a one-line self-check).',
    ] },

    { kind: 'para', text: 'The dictionary at work, three quick reads at the speed examinations set them. Read one (target power): the coefficient of $x^3$ in $(1+x)^9$ — the exponent equation is $r = 3$ directly, so the answer is $\\binom{9}{3} = 84$, no expansion written. Read two (term number): the 4th term of $(2 - x)^6$ — the index is $r = 3$, the sign factor is $(-1)^3 = -1$, and the term prices as $-\\binom{6}{3} \\cdot 2^3 \\cdot x^3 = -80\\,x^3$; sign first, magnitude second. Read three (seat identity): the middle seats of an odd row are EQUAL as coefficients and adjacent as seats — row 9’s twins are $\\binom{9}{4} = \\binom{9}{5} = 126$, the pair the ratio law climbs through without distinguishing. Each read runs the same three-step reflex — encode the request as $r$, apply the sign rule, compute the magnitude — and the reflex is worth rehearsing until it is boring, because that is exactly the speed every examination assumes.' },

    { kind: 'heading', text: 'The Middle Term(s): Where the Coefficients Peak' },
    { kind: 'para', text: 'The expansion has $n+1$ terms, and the middle of that list depends on the parity of $n$. If $n$ is even, $n + 1$ is odd and there is ONE middle term, the $(\\tfrac{n}{2} + 1)$-th. If $n$ is odd, $n + 1$ is even and there are TWO middle terms, the $\\tfrac{n+1}{2}$-th and the $(\\tfrac{n+1}{2} + 1)$-th. The deeper fact rides the row’s shape: the coefficient sequence climbs while $\\tfrac{n-r}{r+1} > 1$ and falls after (the ratio law of 6.2 applied to the row), so the greatest coefficient sits exactly at the middle — one peak when $n$ is even, two equal peaks when $n$ is odd (the triangle’s highlighted entries). The middle term’s position:' },
    { kind: 'table', head: ['$n$', 'Terms', 'Middle term(s)'], rows: [
      ['$n$ even', '$n + 1$ (odd)', 'only $T_{n/2+1}$'],
      ['$n$ odd', '$n + 1$ (even)', '$T_{(n+1)/2}$ and $T_{(n+3)/2}$'],
    ], caption: 'In index terms: $r = n/2$ for the even case; $r = (n-1)/2$ and $r = (n+1)/2$ for the odd case.' },
    { kind: 'example', title: 'Find the middle term of $(3x + 2)^8$', steps: [
      'Here $n = 8$ is even, so there is one middle term: $T_{8/2 + 1} = T_5$, with $r = 4$.',
      'So, $T_5 = \\binom{8}{4} (3x)^4 (2)^4$.',
      'Now, the numbers: $\\binom{8}{4} = 70$, $(3x)^4 = 81 x^4$, $2^4 = 16$.',
      'Hence $T_5 = 70 \\cdot 81 \\cdot 16 \\, x^4 = 90720 \\, x^4$ — and 70 IS the greatest coefficient of row 8, as the middle-seat theory promises.',
    ] },
    { kind: 'example', title: 'Find the two middle terms of $(x - 2y)^7$', steps: [
      'Here $n = 7$ is odd: two middle terms, $T_4$ ($r = 3$) and $T_5$ ($r = 4$). The sign factor $(-1)^r$ rides each.',
      'So, $T_4 = (-1)^3 \\binom{7}{3} x^4 (2y)^3 = -35 \\cdot 8 \\, x^4 y^3 = -280 \\, x^4 y^3$.',
      'And $T_5 = (-1)^4 \\binom{7}{4} x^3 (2y)^4 = +35 \\cdot 16 \\, x^3 y^4 = 560 \\, x^3 y^4$.',
      'Hence the two middle terms are $-280\\,x^4y^3$ and $560\\,x^3y^4$ — equal-magnitude opposite-sign neighbours, exactly what the alternating signs of an odd-$(a-b)^n$ expansion force at its symmetric seat pair.',
    ] },

    { kind: 'para', text: 'One refinement of the middle-seat story deserves its own sentence, because examinations probe it: the tie cases. When $n$ is even the greatest coefficient is UNIQUE — row 8’s peak is $\\binom{8}{4} = 70$ alone, since the neighbours $\\binom{8}{3} = \\binom{8}{5} = 56$ sit strictly lower. When $n$ is odd the peak is a PAIR of equal coefficients — row 9’s $\\binom{9}{4} = \\binom{9}{5} = 126$, row 15’s $6435$ pair below — because the ratio law’s crossing point falls exactly between two seats, and the climb has no seat on which to land. There is no other tie shape: the ratio $\\tfrac{n-r}{r+1}$ is strictly decreasing in $r$, so the row has exactly one turning region — one peak or two equal peaks, never a plateau and never two separate maxima. That single-shape fact is what makes “greatest coefficient” questions have clean answers, and the two middle terms of an odd expansion are its visible signature.' },

    { kind: 'heading', text: 'Terms from the End: the (n + 2 − p) Reversal' },
    { kind: 'para', text: 'The last position conversion: examinations ask for "the 5th term from the END", and the end is where the indexing runs backwards. Count it honestly: in an expansion of $n + 1$ terms, the $p$-th from the end has exactly $p - 1$ terms after it and $n + 1 - p$ terms before it — so its term-number from the START is $(n + 1 - p) + 1 = n + 2 - p$. The rule is symmetric and worth one line: the $p$-th term from the end IS the $(n + 2 - p)$-th term from the start. A mini-check before the priced example: in $(a+b)^6$ the 3rd from the end should be the $(6 + 2 - 3) = 5$th from the start — and the 7-term list runs $T_1 \\ldots T_7$ with $T_7, T_6, T_5$ counted from the back, so the 3rd from the end is indeed $T_5$. The verifier ran the rule against the explicit term lists of $(a+b)^4$ through $(a+b)^7$, every $p$ — it holds with no exceptions, and the symmetry $\\binom{n}{r} = \\binom{n}{n-r}$ is exactly why: the coefficient of the $p$-th-from-end seat mirrors the coefficient of the mirrored seat.' },
    { kind: 'example', title: 'Find the 5th term from the end in the expansion of $(x + 2)^{12}$', steps: [
      'The rule converts the seat first: $n + 2 - p = 12 + 2 - 5 = 9$ — the 5th from the end is the 9th from the start, with $r = 8$.',
      'So, $T_9 = \\binom{12}{8} x^4 (2)^8$.',
      'Now, the numbers: $\\binom{12}{8} = \\binom{12}{4} = 495$ (the selection symmetry doing the arithmetic) and $2^8 = 256$.',
      'Hence $T_9 = 495 \\cdot 256 \\, x^4 = 126720 \\, x^4$.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The two off-by-one traps of this lesson', text: 'Trap (i): "the 7th term" means r = 6, not r = 7 — the general term is T_{r+1} precisely so that the 1st term is r = 0. Trap (ii): in (a − b)ⁿ the sign belongs to EVERY term: odd-r terms are negative, and the r-index of the term you are pricing decides the sign — the sign is not "plus for the first half, minus after" (that pattern would be wrong for n ≥ 3). Both traps are caught the same way: run the small case (expand (a − b)² or (a − b)³ by hand) and compare.' },
    { kind: 'para', text: 'One teaser before the close, banked honestly: setting $x = 1$ then $x = -1$ in $(1 + x)^n$ gives $\\sum \\binom{n}{r} = 2^n$ and $\\sum (-1)^r \\binom{n}{r} = 0$ — the total and alternating coefficient sums, engine-verified for every $n$ up to 12. Lesson 7.5 makes these coefficients themselves the objects of study; the next run’s 7.3 extends the theorem beyond the positive integers; and the applications lesson 7.6 turns (1) into the approximation engine Bernoulli’s inequality already bounds. The chapter’s machine is now assembled.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner', text: 'The binomial theorem (positive integral index) is on the JEE (Main) syllabus and every state-board class-11 course; the module this lesson is grounded on devotes a full chapter to it. The question shapes, in frequency order: general-term pricing (find a specific term or coefficient — the T_{r+1} formula at speed); middle-term hunts (one or two, with the parity rule); from-the-end conversions (the n + 2 − p rule); recognition items (reassemble a hidden power); and coefficient-sum quick reads (a = b = 1, x = −1). The theorem’s proof by induction is a board-examination classic — lesson 7.1’s scaffold plus Pascal’s rule, five lines, all marks. At JEE depth the same machinery is dressed with negative or fractional exponents (lesson 7.3’s ground) and with coefficient identities (7.5’s), so the discipline installed here — index first, sign second, magnitude last — is the transferable skill the later lessons assume.' },
    { kind: 'quiz', title: 'Check yourself: the binomial theorem, proved', items: [
      { q: 'The expansion of $(a + b)^{12}$ has how many terms?', options: ['11', '12', '13', '24'], answer: 2, explain: 'The theorem guarantees exactly $n + 1$ terms: $12 + 1 = 13$ (option C). Options A and B misprice the count as $n - 1$ or $n$ — the $r$-index runs $0$ to $n$, which is $n + 1$ values. Option D doubles the count by counting both $(a+b)^{12}$ and $(a-b)^{12}$ — a different question.' },
      { q: 'The general term of $(a - b)^n$ is:', options: ['$\\binom{n}{r} a^{n-r} b^r$', '$(-1)^r \\binom{n}{r} a^{n-r} b^r$', '$(-1)^n \\binom{n}{r} a^{n-r} b^r$', '$\\binom{n}{r} a^r b^{n-r}$'], answer: 1, explain: 'Replacing $b$ by $-b$ makes the sign ride $(-b)^r = (-1)^r b^r$ — the sign is fixed by the TERM’s index $r$, not the exponent $n$ (option B). Option A drops the alternation entirely. Option C ties the sign to $n$, which would make every term of $(a-b)^{12}$ positive — false, e.g. $(a-b)^2 = a^2 - 2ab + b^2$. Option D has the powers swapped: the $a$-power DESCENDS with $r$.' },
      { q: 'The expansion of $(a + b)^{15}$ has which middle term(s)?', options: ['only $T_8$', 'only $T_9$', '$T_7$ and $T_8$', '$T_8$ and $T_9$'], answer: 3, explain: '$n = 15$ is odd, so $n + 1 = 16$ terms and TWO middles: $T_{(15+1)/2} = T_8$ and $T_{(15+3)/2} = T_9$ (option D), at $r = 7$ and $r = 8$ — the twin peaks of row 15. Options A and B each stop at one of the pair. Option C sits one seat early: $T_7$ ($r = 6$) and $T_8$ are not symmetric about the 16-term list’s centre.' },
      { q: 'The coefficient of $a^3 b^2$ in the expansion of $(a + b)^5$ is:', options: ['10', '20', '30', '5'], answer: 0, explain: 'The coefficient of $a^{n-r} b^r$ is $\\binom{n}{r}$: for $a^3 b^2$, $r = 2$ and $\\binom{5}{2} = 10$ (option A). Option B’s $20 = 2 \\times 10$ would be the SUM of the $a^3b^2$ and $a^2b^3$ coefficients — a different seat. Option C confuses the coefficient with $\\binom{5}{2} + \\binom{5}{3} + \\binom{5}{4}$-style aggregates. Option D is $\\binom{5}{1}$ — one seat off the middle.' },
      { q: 'In the expansion of $(x + y)^9$, the 4th term from the end is which term from the start?', options: ['6th', '7th', '8th', '9th'], answer: 1, explain: 'The reversal rule: the $p$-th from the end is the $(n + 2 - p)$-th from the start — $9 + 2 - 4 = 7$ (option B). Option A applies $n + 1 - p$ (forgetting the term itself). Option C applies $n + 3 - p$ (double-counting). Option D counts from the wrong end entirely — a 10-term list has its mirror seats 11 apart, and 4-from-end ↔ 7-from-start is exactly that mirror.' },
    ] },
    { kind: 'exercises', title: 'Exercises 7.2', sets: [
      { level: 'L1', questions: [
        { q: 'Expand $(2x + 3y)^5$ fully, and check your expansion by pricing it at $x = y = 1$.', solution: [
          'The coefficient row is $1, 5, 10, 10, 5, 1$; the general form is $\\sum_{r} \\binom{5}{r} (2x)^{5-r} (3y)^r$.',
          'So, term by term: $32x^5 + 5 \\cdot 16 \\cdot 3 \\, x^4 y + 10 \\cdot 8 \\cdot 9 \\, x^3 y^2 + 10 \\cdot 4 \\cdot 27 \\, x^2 y^3 + 5 \\cdot 2 \\cdot 81 \\, xy^4 + 243 y^5$.',
          'Hence $(2x+3y)^5 = 32x^5 + 240x^4y + 720x^3y^2 + 1080x^2y^3 + 810xy^4 + 243y^5$.',
          'Check at $x = y = 1$: the six coefficients add to $32 + 240 + 720 + 1080 + 810 + 243 = 3125 = 5^5$ — and $(2 + 3)^5 = 3125$. Verified.',
        ], answer: '$32x^5 + 240x^4y + 720x^3y^2 + 1080x^2y^3 + 810xy^4 + 243y^5$, summing to $3125 = 5^5$ at $x = y = 1$' },
        { q: 'Expand $(1 + x)^6$ and state (i) the sum of its coefficients, (ii) its alternating coefficient sum.', solution: [
          'Row 6 is $1, 6, 15, 20, 15, 6, 1$; so $(1+x)^6 = 1 + 6x + 15x^2 + 20x^3 + 15x^4 + 6x^5 + x^6$.',
          'Now, (i): the sum is the theorem at $x = 1$: $2^6 = 64$ (and the coefficients add to exactly 64).',
          'And (ii): the alternating sum is the theorem at $x = -1$: $(1 - 1)^6 = 0$ — the even and odd seats cancel in pairs by the row’s symmetry.',
        ], answer: '$1 + 6x + 15x^2 + 20x^3 + 15x^4 + 6x^5 + x^6$; coefficient sum $64$, alternating sum $0$' },
      ] },
      { level: 'L2', questions: [
        { q: 'Find the 4th term of the expansion of $(x + 2)^7$.', solution: [
          'The 4th term means $r = 3$: $T_4 = \\binom{7}{3} x^4 (2)^3$.',
          'So, $\\binom{7}{3} = 35$ and $2^3 = 8$.',
          'Hence $T_4 = 35 \\cdot 8 \\, x^4 = 280 \\, x^4$.',
        ], answer: '$280\\,x^4$' },
        { q: 'Find the middle term of the expansion of $\\left(x + \\tfrac{1}{x}\\right)^{10}$.', solution: [
          '$n = 10$ is even: one middle term, $T_6$ at $r = 5$: $T_6 = \\binom{10}{5} x^{10-5} \\left(\\tfrac{1}{x}\\right)^5$.',
          'So, the powers cancel: $x^5 \\cdot x^{-5} = x^0$ — the middle term is free of $x$.',
          'Hence $T_6 = \\binom{10}{5} = 252$, a constant — the middle term of this self-inverse shape is always the pure number $\\binom{n}{n/2}$. (Lesson 7.5 prices this “term independent of x” family systematically.)',
        ], answer: '$252$ — the middle term is the constant $\\binom{10}{5}$' },
      ] },
      { level: 'L3', questions: [
        { q: 'Find the two middle terms of the expansion of $(2x - 3)^7$.', solution: [
          '$n = 7$ is odd: two middles, $T_4$ ($r = 3$) and $T_5$ ($r = 4$); the sign factor $(-1)^r$ rides each since the second term is $-3$.',
          'So, $T_4 = (-1)^3 \\binom{7}{3} (2x)^4 (3)^3 = -35 \\cdot 16 \\cdot 27 \\, x^4 = -15120 \\, x^4$.',
          'And $T_5 = (-1)^4 \\binom{7}{4} (2x)^3 (3)^4 = +35 \\cdot 8 \\cdot 81 \\, x^3 = 22680 \\, x^3$.',
          'Hence the two middle terms are $-15120\\,x^4$ and $22680\\,x^3$ — opposite signs, the alternation at the twin peaks.',
        ], answer: '$T_4 = -15120\\,x^4$ and $T_5 = 22680\\,x^3$' },
        { q: 'Find the coefficient of $x^4$ in the expansion of $(2 + x)^9$.', solution: [
          'The general term: $T_{r+1} = \\binom{9}{r} 2^{9-r} x^r$; for $x^4$, take $r = 4$.',
          'So, the coefficient is $\\binom{9}{4} 2^5 = 126 \\cdot 32$.',
          'Hence the coefficient of $x^4$ is $4032$.',
        ], answer: '$4032$' },
        { q: 'Find the 5th term from the end of the expansion of $(2 + x)^9$, as a term from the start first, then priced.', solution: [
          'Convert the seat: $n + 2 - p = 9 + 2 - 5 = 6$ — the 5th from the end is the 6th from the start, $r = 5$.',
          'So, $T_6 = \\binom{9}{5} (2)^{4} x^5$ (writing the $x$-power ascending: the term is $\\binom{9}{5} 2^{9-5} x^5$).',
          'Now, $\\binom{9}{5} = \\binom{9}{4} = 126$ and $2^4 = 16$.',
          'Hence $T_6 = 126 \\cdot 16 \\, x^5 = 2016 \\, x^5$.',
        ], answer: 'the 6th from the start; priced as $2016\\,x^5$' },
      ] },
      { level: 'L4', questions: [
        { q: 'In the expansion of $(1 + x)^n$, the coefficients of the 4th and 5th terms are equal. Find $n$, and state the common coefficient.', solution: [
          'The 4th term has $r = 3$: coefficient $\\binom{n}{3}$; the 5th has $r = 4$: coefficient $\\binom{n}{4}$.',
          'Now, $\\binom{n}{4} = \\binom{n}{3} \\cdot \\tfrac{n - 3}{4}$, so equality forces $\\tfrac{n - 3}{4} = 1$, i.e. $n = 7$.',
          'So, $\\binom{7}{3} = \\binom{7}{4} = 35$ — the common coefficient is 35, and $n = 7$ is exactly the odd row where the twin peaks sit at $r = 3, 4$.',
        ], answer: '$n = 7$, common coefficient $35$' },
        { q: 'Prove Pascal’s rule $\\binom{n}{r} + \\binom{n}{r-1} = \\binom{n+1}{r}$ algebraically from the factorial form, and verify it on the cell $\\binom{6}{3}$.', solution: [
          'The factorial form: $\\binom{n}{r} = \\tfrac{n!}{r!(n-r)!}$ and $\\binom{n}{r-1} = \\tfrac{n!}{(r-1)!(n-r+1)!}$.',
          'Common denominator $r!(n-r+1)!$: the sum is $\\tfrac{n!(n-r+1) + n!\\,r}{r!(n-r+1)!} = \\tfrac{n!(n + 1)}{r!(n-r+1)!}$.',
          'Hence $= \\tfrac{(n+1)!}{r!(n+1-r)!} = \\binom{n+1}{r}$ — the rule as an algebraic identity.',
          'Verification at $\\binom{6}{3} = 20$: $\\binom{5}{2} + \\binom{5}{3} = 10 + 10 = 20$ — the triangle’s cell confirms the algebra.',
        ], answer: 'Pascal’s rule proved from factorials; at $r = 3$, $10 + 10 = 20$' },
        { q: 'Show that $(x + y)^7 - (x - y)^7 = 2\\left(7x^6 y + 35x^4 y^3 + 21x^2 y^5 + y^7\\right)$, and explain which entries of row 7 the four numbers $7, 35, 21, 1$ are.', solution: [
          'Expand both by the theorem: $(x+y)^7$ has coefficients $\\binom{7}{r}$ with ascending $y$-powers; $(x-y)^7$ the same magnitudes with signs $(-1)^r$.',
          'Subtracting: even-$r$ terms (which carry equal signs in both) cancel; odd-$r$ terms (opposite signs) double — the difference is $2\\sum_{r \\text{ odd}} \\binom{7}{r} x^{7-r} y^r$.',
          'So, the odd seats of row 7 are $\\binom{7}{1} = 7$, $\\binom{7}{3} = 35$, $\\binom{7}{5} = 21$, $\\binom{7}{7} = 1$ — exactly the four numbers, and the identity stands.',
          'Hence the statement: the difference of the two conjugate powers isolates the odd-index coefficients, doubled.',
        ], answer: 'proved by cancellation of even seats; $7, 35, 21, 1$ are $\\binom{7}{1}, \\binom{7}{3}, \\binom{7}{5}, \\binom{7}{7}$ doubled' },
      ] },
      { level: 'L5', questions: [
        { q: 'Find the coefficient of $x^6$ in the expansion of $\\left(3x - \\tfrac{2}{x^2}\\right)^{12}$.', solution: [
          'The general term: $T_{r+1} = \\binom{12}{r} (3x)^{12-r} \\left(-\\tfrac{2}{x^2}\\right)^r$ — the $x$-power is $x^{12 - r} \\cdot x^{-2r} = x^{12 - 3r}$.',
          'For $x^6$: $12 - 3r = 6$, so $r = 2$ — a unique seat, no other index reaches $x^6$.',
          'So, the coefficient is $\\binom{12}{2} \\cdot 3^{10} \\cdot (-2)^2 = 66 \\cdot 59049 \\cdot 4$.',
          'Hence the coefficient is $15\\,588\\,936$ — positive, since $r = 2$ is even.',
        ], answer: '$15\\,588\\,936$' },
        { q: 'For which $n$ is the 3rd term from the end of $(x + y)^n$ equal to the 5th term from the start? Verify on the expansion you find.', solution: [
          'The reversal rule equates seats: $n + 2 - 3 = 5$, so $n = 6$.',
          'Now, verify on $(x+y)^6$: the 5th term ($r = 4$) is $\\binom{6}{4} x^2 y^4 = 15 x^2 y^4$; the 3rd from the end is the $(6 + 2 - 3) = 5$th from the start — the same seat, so the same term.',
          'Hence $n = 6$, and the seat’s coefficient $15$ sits symmetric about row 6’s middle ($\\binom{6}{4} = \\binom{6}{2}$), which is exactly WHY end-seat and start-seat can coincide.',
        ], answer: '$n = 6$; the shared term is $15\\,x^2y^4$ (5th from start = 3rd from end)' },
        { q: 'The greatest coefficient of $(1 + x)^{15}$ is how much, and where does it sit? Use the middle-term rules and state both seats.', solution: [
          '$n = 15$ is odd: two middle terms at $r = 7$ and $r = 8$ — the twin peaks of row 15.',
          'So, the greatest coefficient is $\\binom{15}{7} = \\binom{15}{8}$ (the symmetry $\\binom{n}{r} = \\binom{n}{n-r}$ makes them equal).',
          'Now, compute honestly: the factorial form is $\\binom{15}{7} = \\tfrac{15!}{7!\\,8!} = 6435$ — and the arithmetic, run in the open: the numerator product $15 \\cdot 14 \\cdot \\cdots \\cdot 9 = 32\\,432\\,400$ over $7! = 5040$ gives $32\\,432\\,400 \\div 5040 = 6435$.',
          'Hence the greatest coefficient is $6435$, sitting at BOTH $T_8$ and $T_9$ — the expansion’s only tie for the peak.',
        ], answer: '$\\binom{15}{7} = \\binom{15}{8} = 6435$, the twin middle seats $T_8$ and $T_9$' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove by induction on $n$ that $\\sum_{r=0}^{n} \\binom{n}{r} = 2^n$, using Pascal’s rule as the step’s merge (the coefficient version of the theorem at $a = b = 1$).', solution: [
          '**Base case.** $n = 1$: $\\binom{1}{0} + \\binom{1}{1} = 2 = 2^1$. True.',
          '**Induction hypothesis.** Assume $\\sum_{r=0}^{k} \\binom{k}{r} = 2^k$ for some $k$.',
          '**Inductive step.** Split row $k+1$ by Pascal’s rule: every interior entry is $\\binom{k}{r} + \\binom{k}{r-1}$, and the two borders are 1.',
          'So, by Pascal’s rule each interior entry of row $k+1$ splits into two entries of row $k$, and the borders carry over as $1$s: the new total is $\\sum_{r=0}^{k+1} \\binom{k+1}{r} = \\sum_{r=0}^{k} \\binom{k}{r} + \\sum_{r=0}^{k} \\binom{k}{r}$.',
          'Now, each interior pair collapses by the rule, and the two half-sums reassemble: $\\sum_{r=0}^{k} \\binom{k}{r} + \\sum_{r=0}^{k} \\binom{k}{r} = 2 \\cdot 2^k = 2^{k+1}$.',
          'Hence $P(k+1)$ whenever $P(k)$; with the base, $P(n)$ holds for all $n$ — the coefficient-sum statement inherits the domino proof from the theorem itself.',
        ], answer: '$\\sum_{r=0}^{n} \\binom{n}{r} = 2^n$ for all $n$, by induction on the rows' },
        { q: 'Verify numerically that $\\sum_{r=0}^{n} \\binom{n}{r}^2 = \\binom{2n}{n}$ for $n = 1, \\ldots, 6$ (Vandermonde’s identity — stated for a future lesson, verified honestly here), and give the $n = 3$ line in full.', solution: [
          'Run the census for each $n$: the left side squares each entry of row $n$ and adds; the right side is the central coefficient of row $2n$.',
          'The $n = 3$ line in full: row 3 is $1, 3, 3, 1$, so the squares are $1, 9, 9, 1$ and the sum is $1 + 9 + 9 + 1 = 20$ — and $\\binom{6}{3} = 20$. Equal.',
          'The smaller lines confirm the pattern the same way: $n = 1$ gives $1 + 1 = 2 = \\binom{2}{1}$, $n = 2$ gives $1 + 4 + 1 = 6 = \\binom{4}{2}$.',
          'Hence the identity verifies at every $n$ from 1 to 6 (the same sweep, honestly computed): $2, 6, 20, 70, 252, 924$ on both sides at $n = 1$ through $6$.',
        ], answer: 'verified for $n = 1$ to $6$; the $n = 3$ line reads $1 + 9 + 9 + 1 = 20 = \\binom{6}{3}$' },
      ] },
    ] },
    { kind: 'formula', name: 'The binomial theorem (positive integral index)', latex: '(a+b)^n = \\sum_{r=0}^{n} \\binom{n}{r} a^{n-r} b^r', note: 'for $n \\in \\mathbb{N}$ — $n + 1$ terms; coefficients from row $n$ of Pascal’s triangle; proved by counting AND by induction.' },
    { kind: 'formula', name: 'The general term', latex: 'T_{r+1} = \\binom{n}{r} a^{n-r} b^r; \\quad (a-b)^n: \\; T_{r+1} = (-1)^r \\binom{n}{r} a^{n-r} b^r', note: 'the “7th term” means $r = 6$ — convert the term number to the index first.' },
    { kind: 'formula', name: 'The middle term(s)', latex: 'n \\text{ even}: \\; T_{n/2+1}; \\qquad n \\text{ odd}: \\; T_{(n+1)/2}, \\; T_{(n+3)/2}', note: 'the middle seat(s) carry the greatest coefficient(s) of the row.' },
    { kind: 'formula', name: 'Terms from the end', latex: '\\text{the } p\\text{-th term from the end} = \\text{the } (n + 2 - p)\\text{-th from the start}', note: 'verified on explicit term lists for $n = 4$ to $7$; the coefficient symmetry $\\binom{n}{r} = \\binom{n}{n-r}$ is why it works.' },
    { kind: 'formula', name: 'Pascal’s rule', latex: '\\binom{n}{r} + \\binom{n}{r-1} = \\binom{n+1}{r}', note: 'each triangle entry sums its two parents; the induction proof’s one merge.' },
    { kind: 'formula', name: 'Coefficient sums (the 7.5 teaser)', latex: '\\sum_{r=0}^{n} \\binom{n}{r} = 2^n, \\qquad \\sum_{r=0}^{n} (-1)^r \\binom{n}{r} = 0', note: 'the theorem at $a = b = 1$ and at $x = -1$; engine-verified to $n = 12$.' },
  ],
}

export const chapter07: Chapter = {
  number: 7,
  slug: 'induction-and-binomial-theorem',
  title: 'Induction and the Binomial Theorem',
  summary:
    'The book’s proof engine and its most-used consequence, in the order the classics teach them. Mathematical induction first — the domino principle: base case, inductive step, and the honest scope note (what induction proves and what it never can), applied to the sum formulas chapter 5 left uncertified, to divisibility statements, and to inequality statements the AM–GM engine guessed. Then the binomial theorem for a positive integral index — Pascal’s triangle read as a counting statement about chapter 6’s selections, the theorem PROVED by induction, the general and middle terms priced exactly. The coefficients become objects of study (their sum, their alternating sum, the term independent of x), and the chapter closes with the applications: (1 + x)ⁿ ≈ 1 + nx for small x, divisibility reads, and coefficient-hunting at exam speed. The frequently used expansions — (a ± b)², (a ± b)³ and the kin every exam expects by reflex — banked as the chapter’s opening toolkit.',
  status: 'in-progress',
  lessons: [lesson71, lesson72],
  plannedLessons: [
    'The Binomial Theorem for Any Index',
    'The Multinomial Theorem',
    'Binomial Coefficients at Work',
    'Binomial Applications and Approximations',
    'Unit 7 Completion Review',
  ],
}

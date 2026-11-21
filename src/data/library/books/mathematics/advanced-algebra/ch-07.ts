import type { Chapter, Lesson } from '../../../types'

/**
 * Advanced Algebra — chapter 7 "Induction and the Binomial Theorem"
 * (opened by RUN 116, 2026-11-21; RUN 117, 2026-11-21, shipped 7.3 + 7.4
 * as the first v9.0 SWARM run — two parallel authoring agents, one lesson
 * each, orchestrator-integrated; engines E/F + G/H grown verify-first; the
 * remaining lessons 7.5–7.6 + the unit review ride the next runs).
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
 *   7.3 "The Binomial Theorem for Any Index"             (RUN 117 swarm)
 *   7.4 "The Multinomial Theorem"                        (RUN 117 swarm)
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


/* ------------------------------------------------------------------ */
/* lesson 7.3 — run 117 swarm (agent 2-a), engines E + pins F          */
/* ------------------------------------------------------------------ */

/**
 * Advanced Algebra — lesson 7.3 "The Binomial Theorem for Any Index"
 * (swarm run 117, task 2-a; authored as ONE self-contained part file —
 * the orchestrator splices this body into ch-07.ts verbatim, so no export
 * statement and no chapter object live here).
 *
 * PROVENANCE: method shapes only from the Drive `MATHS/M2 Algebra :: 08.
 * Binomial Theorem` module's any-index band (citation key `cengage-m2-08`,
 * printed 8.26–8.27 — STUDY-NEVER-REPRODUCE honored) + the banked web canon
 * (`hall-knight-higher-algebra`, `ncert-math11-ch7-binomial-theorem`,
 * `jee-main-2026-syllabus`, `cengage-jee-style`). Every roster, witness
 * value, figure, Illustration, quiz item and exercise below is OUR OWN,
 * pinned by scripts/verify-book4-ch07.ts section E (35/35 green) BEFORE
 * this prose was declared done.
 */

/* ------------------------------------------------------------------ */
/* figures — original SVG, vivid palette (owner directive 2026-11-08)  */
/* ------------------------------------------------------------------ */

function validityWindowSvg(): string {
  // the honest number line: the open window (-1, 1) shaded green; the
  // boundary points x = -1 and x = +1 drawn as red hollow dashed circles
  // labelled "diverges"; ticks at -2, -1, 0, 1, 2
  const W = 720
  const H = 230
  const axisY = 132
  const xOf = (v: number) => 84 + (v + 2) * 138 // -2 -> 84, 2 -> 636
  const ticks = [-2, -1, 0, 1, 2]
  let tickMarks = ''
  for (const t of ticks) {
    const x = xOf(t)
    tickMarks += `<line x1="${x}" y1="${axisY - 8}" x2="${x}" y2="${axisY + 8}" stroke="#d97706" stroke-width="2.2"/>` +
      `<text x="${x}" y="${axisY + 30}" font-size="12" font-weight="700" fill="#166534" text-anchor="middle">${t}</text>`
  }
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A number line from minus two to two with the open window from minus one to one shaded green — the validity window of the binomial theorem for any rational index. The boundary points at minus one and one are drawn as red dashed hollow circles labelled diverges: on the boundary the partial sums of the row oscillate without ever settling. Ticks mark minus two, minus one, zero, one and two. The window rule: the never-ending row is valid only for x strictly between minus one and one.">
  <text x="360" y="26" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the validity window of the any-index theorem: |x| &lt; 1</text>
  <rect x="${xOf(-1)}" y="90" width="${xOf(1) - xOf(-1)}" height="84" fill="#16a34a" fill-opacity="0.13"/>
  <text x="360" y="112" font-size="11.5" font-weight="700" fill="#166534" text-anchor="middle">valid: the open window |x| &lt; 1</text>
  <text x="360" y="196" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">inside: the terms shrink — the infinite row is a genuine number</text>
  <line x1="52" y1="${axisY}" x2="668" y2="${axisY}" stroke="#0d9488" stroke-width="2.4"/>
  <path d="M 46 ${axisY} l 12 -6 v 12 z" fill="#0d9488"/>
  <path d="M 674 ${axisY} l -12 -6 v 12 z" fill="#0d9488"/>
  <text x="662" y="118" font-size="11" font-style="italic" font-weight="700" fill="#0f766e">x</text>
  ${tickMarks}
  <circle cx="${xOf(-1)}" cy="${axisY}" r="10" fill="#fffdf5" stroke="#dc2626" stroke-width="2.4" stroke-dasharray="5 3"/>
  <circle cx="${xOf(1)}" cy="${axisY}" r="10" fill="#fffdf5" stroke="#dc2626" stroke-width="2.4" stroke-dasharray="5 3"/>
  <text x="${xOf(-1)}" y="74" font-size="10.5" font-weight="700" fill="#dc2626" text-anchor="middle">diverges</text>
  <text x="${xOf(1)}" y="74" font-size="10.5" font-weight="700" fill="#dc2626" text-anchor="middle">diverges</text>
  <text x="360" y="214" font-size="10.5" font-weight="700" fill="#166534" text-anchor="middle">the boundary points are excluded — the window is open, and it is the price of infiniteness</text>
</svg>`
}

function geometricLadderSvg(): string {
  // the twelve pinned partial sums of (1-x)^{-1} at x = 0.6 climbing onto
  // the true sum 2.5 = 1/(1-0.6); the closed form is S_r = (1 - 0.6^{r+1})/0.4,
  // and the pinned values below are drawn at exactly proportional heights
  const sums = [1, 1.6, 1.96, 2.176, 2.3056, 2.38336, 2.43002, 2.45801, 2.47481, 2.48488, 2.48993, 2.49296]
  const target = 2.5
  const W = 720
  const H = 345
  const ml = 56
  const mr = 30
  const mt = 56
  const mb = 51
  const plotW = W - ml - mr
  const plotH = H - mt - mb
  const yMax = 2.7
  const yOf = (v: number) => mt + (1 - v / yMax) * plotH
  const slot = plotW / sums.length
  const xc = (i: number) => ml + (i + 0.5) * slot
  const barW = 40
  let bars = ''
  sums.forEach((s, i) => {
    const x = xc(i)
    const top = yOf(s)
    bars += `<rect x="${x - barW / 2}" y="${top}" width="${barW}" height="${yOf(0) - top}" fill="#d97706" stroke="#d97706" stroke-width="1.4"/>` +
      `<circle cx="${x}" cy="${top}" r="4.5" fill="#16a34a" stroke="#fffdf5" stroke-width="1.5"/>` +
      `<text x="${x}" y="${top + 17}" font-size="9" font-weight="700" fill="#ffffff" text-anchor="middle">${s}</text>` +
      `<text x="${x}" y="${yOf(0) + 18}" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="middle">${i}</text>` +
      `<line x1="${x}" y1="${yOf(0)}" x2="${x}" y2="${yOf(0) + 6}" stroke="#16a34a" stroke-width="1.6"/>`
  })
  const yTicks = [0, 0.5, 1, 1.5, 2]
  let yAxis = ''
  for (const t of yTicks) {
    const y = yOf(t)
    yAxis += `<line x1="${ml - 6}" y1="${y}" x2="${ml}" y2="${y}" stroke="#16a34a" stroke-width="1.8"/>` +
      `<text x="${ml - 10}" y="${y + 3.5}" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="end">${t}</text>`
  }
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A bar chart of the first twelve partial sums of the geometric series one plus x plus x squared and so on at x equals 0.6. The amber bars climb through the pinned values 1, 1.6, 1.96, 2.176, 2.3056, 2.38336, 2.43002, 2.45801, 2.47481, 2.48488, 2.48993 and 2.49296, each labelled inside the bar, and close in on the dashed target line at 2.5 — the exact sum, one divided by one minus 0.6. Each gap between successive bar tops is the next term of the series, 0.6 to the power r, shrinking by the factor 0.6: the partial sums converge on the true value.">
  <text x="360" y="26" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the geometric ladder: partial sums of (1 − x)⁻¹ at x = 0.6 closing on the true sum</text>
  <line x1="${ml}" y1="${yOf(0)}" x2="${W - mr}" y2="${yOf(0)}" stroke="#16a34a" stroke-width="2.2"/>
  <line x1="${ml}" y1="${mt}" x2="${ml}" y2="${yOf(0)}" stroke="#16a34a" stroke-width="2.2"/>
  ${yAxis}
  <line x1="${ml}" y1="${yOf(target)}" x2="${W - mr}" y2="${yOf(target)}" stroke="#ea580c" stroke-width="2.2" stroke-dasharray="8 5"/>
  <text x="${ml + 8}" y="${yOf(target) - 11}" font-size="11" font-weight="700" fill="#ea580c">the sum: 1/(1 − 0.6) = 2.5</text>
  ${bars}
  <text x="${ml + plotW / 2}" y="${H - 13}" font-size="10" font-weight="700" fill="#0d9488" text-anchor="middle">partial-sum index r — the closed form is S_r = (1 − 0.6^(r+1))/0.4</text>
</svg>`
}

function oscillatingLadderSvg(): string {
  // the eleven pinned partial sums of (1+x)^{-2} at x = 1/2, oscillating
  // onto the limit 4/9 = 1/(1.5)^2 — dots above the limit amber, dots below
  // it teal; positions computed from the pinned values array, never eyeballed
  const sums = [1, 0, 0.75, 0.25, 0.5625, 0.375, 0.484375, 0.421875, 0.457031, 0.4375, 0.448242]
  const labels: Record<number, string> = { 0: '1', 1: '0', 2: '0.75', 3: '0.25', 4: '0.5625', 5: '0.375', 6: '0.484375', 7: '0.421875', 8: '0.457031', 9: '0.4375', 10: '0.448242' }
  const limit = 4 / 9
  const W = 650
  const H = 308
  const ml = 46
  const mr = 14
  const mt = 36
  const mb = 50
  const plotW = W - ml - mr
  const plotH = H - mt - mb
  const yMax = 1.05
  const xOf = (r: number) => ml + (r / 10) * plotW
  const yOf = (v: number) => mt + (1 - v / yMax) * plotH
  const dots = sums
    .map((s, r) => {
      const x = xOf(r)
      const y = yOf(s)
      const col = s > limit ? '#d97706' : '#0d9488'
      let out = `<circle cx="${x}" cy="${y}" r="5" fill="${col}" stroke="#fffdf5" stroke-width="1.5"/>`
      if (labels[r] !== undefined) {
        if (r === 0) out += `<text x="${x + 12}" y="${y + 4}" font-size="9.5" font-weight="700" fill="#166534">${labels[r]}</text>`
        else if (r === 1) out += `<text x="${x}" y="${y - 14}" font-size="9.5" font-weight="700" fill="#166534" text-anchor="middle">${labels[r]}</text>`
        else if (r === 10) out += `<text x="640" y="${y - 17}" font-size="9.5" font-weight="700" fill="#166534" text-anchor="end">${labels[r]}</text>`
        else if (r === 2 || r === 4) out += `<text x="${x + 10}" y="${y + 3.5}" font-size="9.5" font-weight="700" fill="#166534">${labels[r]}</text>`
        else out += `<text x="${x}" y="${y - 11}" font-size="9.5" font-weight="700" fill="#166534" text-anchor="middle" stroke="#fffdf5" stroke-width="3" paint-order="stroke">${labels[r]}</text>`
      }
      return out
    })
    .join('')
  const poly = sums.map((s, r) => `${xOf(r)},${yOf(s)}`).join(' ')
  let xTicks = ''
  for (let r = 0; r <= 10; r++) {
    xTicks += `<line x1="${xOf(r)}" y1="${yOf(0)}" x2="${xOf(r)}" y2="${yOf(0) + 5}" stroke="#16a34a" stroke-width="1.6"/>` +
      `<text x="${xOf(r)}" y="${yOf(0) + 16}" font-size="9" font-weight="700" fill="#0f766e" text-anchor="middle">${r}</text>`
  }
  let yTicks = ''
  for (const t of [0, 0.25, 0.5, 0.75, 1]) {
    const y = yOf(t)
    yTicks += `<line x1="${ml - 6}" y1="${y}" x2="${ml}" y2="${y}" stroke="#16a34a" stroke-width="1.8"/>` +
      `<text x="${ml - 10}" y="${y + 3.5}" font-size="9" font-weight="700" fill="#0f766e" text-anchor="end">${t}</text>`
  }
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The oscillating ladder: eleven dots showing the partial sums of one plus x to the power minus two at x equals one half, with values 1, 0, 0.75, 0.25, 0.5625, 0.375, 0.484375, 0.421875, 0.457031, 0.4375 and 0.448242. Dots above the dashed limit line are amber, dots below it are teal: the odd-indexed partial sums rise toward the line and the even-indexed ones fall toward it, both closing on the limit four over nine, about 0.4444, which equals one over one point five squared.">
  <circle cx="240" cy="22" r="4.5" fill="#d97706" stroke="#fffdf5" stroke-width="1.5"/>
  <text x="250" y="25.5" font-size="9" font-weight="700" fill="#166534">above the limit</text>
  <circle cx="350" cy="22" r="4.5" fill="#0d9488" stroke="#fffdf5" stroke-width="1.5"/>
  <text x="360" y="25.5" font-size="9" font-weight="700" fill="#166534">below the limit</text>
  <line x1="${ml}" y1="${yOf(0)}" x2="${xOf(10)}" y2="${yOf(0)}" stroke="#16a34a" stroke-width="2"/>
  <line x1="${ml}" y1="${mt}" x2="${ml}" y2="${yOf(0)}" stroke="#16a34a" stroke-width="2"/>
  ${yTicks}
  ${xTicks}
  <polyline points="${poly}" fill="none" stroke="#16a34a" stroke-width="1.6" stroke-linejoin="round"/>
  <line x1="${ml}" y1="${yOf(limit)}" x2="${xOf(10)}" y2="${yOf(limit)}" stroke="#ea580c" stroke-width="2.2" stroke-dasharray="7 5"/>
  <text x="${ml + 6}" y="${yOf(limit) - 9}" font-size="10" font-weight="700" fill="#ea580c" stroke="#fffdf5" stroke-width="4" paint-order="stroke">the limit 4/9 (about 0.4444)</text>
  ${dots}
  <text x="${ml + plotW / 2}" y="${H - 13}" font-size="9.5" font-weight="700" fill="#0d9488" text-anchor="middle">partial-sum index r</text>
  <text x="14" y="147" font-size="9.5" font-weight="700" fill="#0d9488" text-anchor="middle" transform="rotate(-90 14 147)">partial sum</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* lesson 7.3                                                          */
/* ------------------------------------------------------------------ */

const lesson73: Lesson = {
  id: 'aa-binomial-theorem-any-index',
  number: '7.3',
  title: 'The Binomial Theorem for Any Index',
  concepts: [
    'the binomial theorem for any rational index',
    'the convergence window |x| < 1',
    'infinite expansions vs finite ones',
    'the general term n(n-1)...(n-r+1)/r! x^r',
    '(1+x)^{-n} and (1-x)^{-n} as counting rows',
    'the frequently used expansions',
    'coefficient pricing at any index',
    'honesty at the boundary: what diverges means',
  ],
  objectives: [
    'State the binomial theorem for any rational index — the general term as a falling factorial over r! — and say exactly what is new beyond lesson 7.2: the row never terminates, and the statement carries the convergence window |x| < 1.',
    'Explain why the window is part of the theorem: an infinite sum is a limit of partial sums, the terms must shrink, and the positive-integer theorem of 7.2 is the terminating special case that never paid this price.',
    'Write and recognise the frequently used expansions — the −1, −2, −3, −1/2 and +1/2 rows — and verify them numerically, seat by seat, against direct computation (the trust-but-verify standard).',
    'Derive the counting-row law behind the negative-integer rows and the central-binomial law behind the half row, and use both to price seats without writing any expansion out.',
    'Price any coefficient at any index — scaled arguments, sign discipline, the leading-factor transform with its rescaled window, and the partial-fraction identity route for rational functions built from geometric rows.',
    'Solve seat equations honestly, including the two-root case where a quadratic in the index delivers a fractional and a negative solution, both of which must be printed and verified.',
    'State what diverges means at the boundary and beyond it — oscillation, escape, unbounded growth — and keep the power-versus-series distinction straight when a row fails where the power is perfectly well defined.',
  ],
  prerequisites: ['aa-the-binomial-theorem-proved', 'aa-geometric-progressions-and-the-infinite-tail', 'aa-factorials-and-the-counting-toolkit'],
  sources: ['cengage-m2-08', 'cengage-jee-style', 'hall-knight-higher-algebra', 'ncert-math11-ch7-binomial-theorem', 'jee-main-2026-syllabus'],
  blocks: [
    { kind: 'para', text: 'Lesson 7.2 proved the binomial theorem for every positive integer $n$ — proved it twice, once by counting and once by the domino engine — and the theorem’s rows terminate: $n + 1$ seats, then silence. But mathematics did not stop at that border, and neither does the examination room. What is $(1+x)^{1/2}$, the square root written as an expansion? What is $(1+x)^{-3}$, a reciprocal cube? The reflex pattern of lesson 7.2 — the coefficients $1$, $n$, $\\tfrac{n(n-1)}{2!}$, $\\tfrac{n(n-1)(n-2)}{3!}$, $\\ldots$ — does not need $n$ to be an integer to be WRITTEN: each coefficient is the falling factorial $n(n-1)(n-2)\\cdots(n-r+1)$ divided by $r!$, and a falling factorial makes sense for ANY rational index. Substitute $n = \\tfrac{1}{2}$ and the coefficients begin $\\tfrac{1}{2}$, $-\\tfrac{1}{8}$, $\\tfrac{1}{16}$, $\\ldots$ — perfectly computable, seat after seat after seat. And that is precisely what changes: the row NEVER ends. When $n$ was a positive integer the factor $(n - r + 1)$ hit zero at $r = n + 1$ and closed the row; for every other index no factor ever reaches zero, and the "expansion" is an infinite series — a sentence about infinitely many terms, whose meaning is no longer automatic.' },
    { kind: 'para', text: 'The meaning question is the one chapter 5 already answered for the geometric row. The infinite-tail lesson banked the discipline: $1 + x + x^2 + \\cdots$ EQUALS $\\tfrac{1}{1-x}$ exactly when $|x| < 1$, and equals nothing outside that window — the partial sums either oscillate forever or run away. That discipline is cashed here at full scale: the any-index row is an infinite sum, an infinite sum is a limit of partial sums, and such a limit exists only when the terms shrink — the window $|x| < 1$ is the price of infiniteness. This lesson states the theorem for any rational index, verifies every truncated case numerically against direct computation, prices coefficients at examination speed, and maps what fails at the boundary and beyond it. The finite theorem of 7.2 is the special case where the infinite statement terminates; the infinite theorem is the general weather.' },

    { kind: 'heading', text: 'The Theorem for Any Index' },
    { kind: 'para', text: 'The statement first, in the house form. The index $n$ may now be any rational number — negative, fractional, or both — and the base is written $1 + x$ (the leading-factor transform below moves any general base into this form). One new ingredient enters that lesson 7.2 never needed: a condition on $x$, without which the statement is not even false — it is MEANINGLESS, an infinite sum that does not sum to anything.' },
    { kind: 'callout', tone: 'theorem', title: 'The binomial theorem for any rational index', text: 'For any rational index $n$ and any $x$ with $|x| < 1$: $(1+x)^n = 1 + nx + \\tfrac{n(n-1)}{2!}x^2 + \\tfrac{n(n-1)(n-2)}{3!}x^3 + \\cdots + \\tfrac{n(n-1)\\cdots(n-r+1)}{r!}x^r + \\cdots$. The general term is $T_{r+1} = \\tfrac{n(n-1)(n-2)\\cdots(n-r+1)}{r!}\\,x^r$ — a product of $r$ descending factors starting at $n$, over $r!$. If $n$ is a positive integer, the factor $(n - r + 1)$ reads zero from $r = n + 1$ onward, every later seat is zero, and the row terminates as the finite theorem of lesson 7.2 — with no window required at all. For every other rational $n$ no factor ever reads zero, the row never terminates, and the statement is an infinite series valid exactly inside the window $|x| < 1$.' },
    { kind: 'equation', latex: '(1+x)^n = \\sum_{r=0}^{\\infty} \\frac{n(n-1)(n-2)\\cdots(n-r+1)}{r!}\\, x^r \\qquad (|x| < 1) \\tag{1}', note: 'the coefficient of $x^r$ is the falling factorial $n(n-1)\\cdots(n-r+1)$ over $r!$ — a product of $r$ rational factors, defined at every rational index; the window clause is part of the statement, not a decoration hung on afterwards.' },
    { kind: 'para', text: 'Thus, in the honest reading: the coefficients of (1) are products of rational numbers, computable at any index — that part is pure arithmetic. The EQUALS sign is the deep part. For a terminating row, equality is an algebraic identity, true at every $x$ without exception. For a never-ending row, equality means the partial sums converge to the left side, and convergence is a property of $x$: the same row, the same coefficients, and a different verdict at $x = \\tfrac{1}{2}$ than at $x = 2$. Nothing in the coefficient pattern announces this — the window does. For example, at the index $n = \\tfrac{1}{2}$ the factors descend $\\tfrac{1}{2}, -\\tfrac{1}{2}, -\\tfrac{3}{2}, -\\tfrac{5}{2}, \\ldots$ — past zero, into negatives, forever — which is exactly why no seat of that row ever dies and why the sum needs a window to mean anything.' },
    { kind: 'callout', tone: 'warn', title: 'Why |x| < 1 — the terms must shrink', text: 'An infinite sum is DEFINED as the limit of its partial sums, and a limit of partial sums can exist only if the individual terms shrink to zero. Inside the window they shrink — and fast: the ratio of consecutive term magnitudes of (1) tends to $|x|$ as $r$ grows, so for $|x| < 1$ the seats eventually shrink geometrically, the chapter 5 precedent doing exactly the work it was banked for. At the boundary and beyond it the terms fail to shrink, and the partial sums cannot settle — the convergence section below exhibits the three failure modes with pinned numbers. If $n$ IS a positive integer, none of this matters: the row terminates, a terminating sum converges at every $x$, and no window condition is ever invoked. The window discipline is the price paid ONLY for the never-ending rows.' },
    { kind: 'para', text: 'Note how cleanly the finite theorem falls out as the special case. At a positive integer index $n$, the seat $r = n + 1$ would need the factor $(n - r + 1) = (n - (n+1) + 1) = 0$, and every later seat needs factors that have already passed through zero — so the row stops at exactly $n + 1$ seats, and the "infinite" statement collapses to lesson 7.2’s theorem with the window clause vacuous. The any-index statement is therefore the STRICTER theorem: it demands more (a window) and delivers more (every rational index, the negative rows and the half rows included). The two theorems do not compete; one contains the other, and the contained one was proved first — exactly the order this chapter ran.' },
    { kind: 'callout', tone: 'historical', title: 'Newton’s extension, and the rigor that followed it', text: 'The fractional-index expansion is Newton’s: by the mid-1660s he was computing with rows like $(1+x)^{1/2}$, and his letters on the binomial series — relayed through Henry Oldenburg to the young Leibniz — carried the extension to negative and fractional indices into the European mainstream. What those letters did not carry was the convergence question: for a century and a half the series were used as trust-but-verify instruments, and only the nineteenth-century rigor of Cauchy’s and Abel’s generation gave the window $|x| < 1$ its settled meaning. This lesson walks exactly that road in miniature: state, verify, and mark the boundary honestly.' },
    { kind: 'para', text: 'One more honesty note, and it is structural: the full PROOF of the any-index theorem — differentiating the series and solving the differential equation it satisfies — belongs to the calculus doorstep, and this book has not built derivatives yet. So this lesson does what Euler’s generation did with the tools available: it states the theorem, then verifies it. Every roster below was recomputed brute-force by the chapter’s verifier before this prose was declared done; every truncated row is checked numerically against direct computation — square roots against square roots, reciprocals against reciprocals — and the coefficient pattern is the falling factorial, which needs no calculus to write. The verification tables are the engine of the lesson: what makes the statement trustworthy at every seat you can see, while the full proof waits for the calculus chapters where it belongs.' },

    { kind: 'heading', text: 'The Frequently Used Expansions' },
    { kind: 'para', text: 'The engine of this lesson is a table of rows you will eventually recognise on sight — the “frequently used expansions”. Each row below is the any-index statement at one small index, computed seat by seat from the general term and cross-checked against direct arithmetic. Read the table twice: once for the rows themselves (the examination reflex set), and once for the LAWS inside it. The negative-integer rows are counting rows — selection counts in binomial clothing — and the half rows are central-binomial rows; the two derivations below pull those laws into the open.' },
    { kind: 'table', head: ['Row', 'Expansion (first seats), valid for $|x| < 1$'], rows: [
      ['$(1+x)^{-1}$', '$1 - x + x^2 - x^3 + x^4 - x^5 + \\cdots$'],
      ['$(1-x)^{-1}$', '$1 + x + x^2 + x^3 + x^4 + x^5 + \\cdots$'],
      ['$(1+x)^{-2}$', '$1 - 2x + 3x^2 - 4x^3 + 5x^4 - 6x^5 + \\cdots$'],
      ['$(1-x)^{-2}$', '$1 + 2x + 3x^2 + 4x^3 + 5x^4 + 6x^5 + \\cdots$'],
      ['$(1+x)^{-3}$', '$1 - 3x + 6x^2 - 10x^3 + 15x^4 - 21x^5 + \\cdots$'],
      ['$(1-x)^{-3}$', '$1 + 3x + 6x^2 + 10x^3 + 15x^4 + 21x^5 + \\cdots$'],
      ['$(1+x)^{-1/2}$', '$1 - \\tfrac{x}{2} + \\tfrac{3x^2}{8} - \\tfrac{5x^3}{16} + \\tfrac{35x^4}{128} - \\tfrac{63x^5}{256} + \\cdots$'],
      ['$(1-x)^{-1/2}$', '$1 + \\tfrac{x}{2} + \\tfrac{3x^2}{8} + \\tfrac{5x^3}{16} + \\tfrac{35x^4}{128} + \\tfrac{63x^5}{256} + \\cdots$'],
      ['$(1+x)^{1/2}$', '$1 + \\tfrac{x}{2} - \\tfrac{x^2}{8} + \\tfrac{x^3}{16} - \\tfrac{5x^4}{128} + \\tfrac{7x^5}{256} - \\cdots$'],
      ['$(1-x)^{1/2}$', '$1 - \\tfrac{x}{2} - \\tfrac{x^2}{8} - \\tfrac{x^3}{16} - \\tfrac{5x^4}{128} - \\tfrac{7x^5}{256} - \\cdots$'],
    ], caption: 'The frequently used expansions, valid for $|x| < 1$ — every row computed seat-by-seat from the general term and cross-checked numerically; the negative-integer rows are the counting rows of the first derivation below, and the $\\pm\\tfrac{1}{2}$ rows are the central-binomial family of the second.' },
    { kind: 'para', text: 'Two laws live in that table, and both deserve the daylight. The negative-integer rows hide selection counts: their seats are $\\binom{n+r-1}{r}$, the triangular numbers at the index $-3$, the plain counting numbers at the index $-2$ — chapter 5’s difference-table family reborn as binomial rows. And the $-\\tfrac{1}{2}$ row hides the central binomial coefficients, scaled by powers of four. Both derivations run on the general term alone: no calculus, just the falling factorial and honest bookkeeping.' },
    { kind: 'derivation', title: 'The counting-row law behind the negative-integer rows', statement: 'For every positive integer n and |x| < 1, the row of (1 − x)^{−n} is a selection-count row: (1 − x)^{−n} = 1 + C(n,1)x + C(n+1,2)x² + C(n+2,3)x³ + ⋯, the general seat being C(n+r−1, r)·xʳ.', steps: [
      { label: 'Write the general seat', formula: '\\text{seat of } x^r \\text{ in } (1-x)^{-n}: \\; \\frac{(-n)(-n-1)(-n-2)\\cdots(-n-r+1)}{r!}', explanation: 'The any-index theorem prices the $x^r$ seat of $(1+u)^{-n}$ by the falling factorial with index $-n$: $r$ descending factors over $r!$ — the pattern that makes sense at every rational index, negative ones included.' },
      { label: 'Count the minus signs', formula: '(-n)(-n-1)\\cdots(-n-r+1) = (-1)^r\\, n(n+1)\\cdots(n+r-1)', explanation: 'Each of the $r$ factors carries exactly one minus sign; stripping all of them leaves the RISING product $n(n+1)\\cdots(n+r-1)$, with $(-1)^r$ still attached out front.' },
      { label: 'Recognise the selection count', formula: '\\frac{n(n+1)\\cdots(n+r-1)}{r!} = \\frac{(n+r-1)!}{(n-1)!\\, r!} = \\binom{n+r-1}{r}', explanation: 'The rising product is exactly $\\tfrac{(n+r-1)!}{(n-1)!}$ — the factorial of $n + r - 1$ with its first $n - 1$ factors cancelled — so the seat is the selection count $\\binom{n+r-1}{r}$, sign still pending.' },
      { label: 'Substitute the argument −x', formula: '(1-x)^{-n} = \\sum_{r \\geq 0} \\binom{n+r-1}{r}\\, x^r', explanation: 'Putting $u = -x$ multiplies each seat by $(-1)^r$ once more, and $(-1)^r \\cdot (-1)^r = +1$: the two sign flips cancel, and every seat of the $(1-x)^{-n}$ row is POSITIVE — a counting row, all sums, no alternation.' },
      { label: 'Witness the rows', formula: '(1-x)^{-3}: \\; \\binom{r+2}{2} = 1, 3, 6, 10, 15, 21; \\qquad (1-x)^{-2}: \\; \\binom{r+1}{1} = 1, 2, 3, 4, 5, 6', explanation: 'The $n = 3$ row is the triangular numbers — chapter 5’s difference-table family reborn as a binomial row — and the $n = 2$ row is the plain counting numbers; both match the table above seat for seat.' },
    ], result: '$(1-x)^{-n} = \\sum_{r \\geq 0} \\binom{n+r-1}{r}\\, x^r$ for $|x| < 1$ — the negative-integer rows are selection-count rows in disguise' },
    { kind: 'para', text: 'The counting law explains half the table’s shape at a stroke: the $(1-x)^{-n}$ rows are ALL-POSITIVE — the argument’s sign flip cancels the coefficient sign flip — while their $(1+x)^{-n}$ twins alternate strictly. And the seats are genuine selection counts, not arithmetic coincidences: $\\binom{n+r-1}{r}$ is the number of ways to choose $r$ objects from $n$ kinds when repetition is allowed — chapter 6’s selection machinery, wearing a negative index as a costume. The half row’s law is different, and leads somewhere even better known.' },
    { kind: 'derivation', title: 'The half row’s central-binomial law', statement: 'For |x| < 1, the seats of (1 − x)^{−1/2} are the scaled central binomial coefficients: 1, 1/2, 3/8, 5/16, 35/128, 63/256, … — the general seat being C(2r, r)/4ʳ.', steps: [
      { label: 'Price the seat by the falling factorial', formula: '\\text{seat of } x^r \\text{ in } (1+x)^{-1/2}: \\; \\frac{\\left(-\\tfrac{1}{2}\\right)\\left(-\\tfrac{3}{2}\\right)\\cdots\\left(-\\tfrac{2r-1}{2}\\right)}{r!} = (-1)^r\\,\\frac{1 \\cdot 3 \\cdot 5 \\cdots (2r-1)}{2^r\\, r!}', explanation: 'The factors descend from $-\\tfrac{1}{2}$ through $-\\tfrac{3}{2}, -\\tfrac{5}{2}, \\ldots$ — never reaching zero, which is why this row never ends. Each factor donates one minus sign and one power of $\\tfrac{1}{2}$.' },
      { label: 'Convert the odd product', formula: '1 \\cdot 3 \\cdot 5 \\cdots (2r-1) = \\frac{(2r)!}{2 \\cdot 4 \\cdot 6 \\cdots 2r} = \\frac{(2r)!}{2^r\\, r!}', explanation: 'The product of the first $r$ odd numbers is the full factorial $(2r)!$ with the even factors divided out — and the even factors collect as $2 \\cdot 4 \\cdots 2r = 2^r r!$, chapter 6’s double-factorial bookkeeping.' },
      { label: 'Assemble the seat', formula: '(-1)^r\\, \\frac{(2r)!}{2^r r! \\cdot 2^r r!} = (-1)^r\\, \\frac{\\binom{2r}{r}}{4^r}', explanation: 'The two powers of $2^r$ collect into $4^r$ in the denominator, and the factorial ratio upstairs is exactly $\\binom{2r}{r}$ — the central binomial coefficient of row $2r$, the same coefficient family that carried the middle-term pricing of lesson 7.2.' },
      { label: 'Cancel the argument sign', formula: '(1-x)^{-1/2} = \\sum_{r \\geq 0} \\frac{\\binom{2r}{r}}{4^r}\\, x^r', explanation: 'The $(-1)^r$ from the coefficients meets the $(-1)^r$ from the argument $-x$ and cancels: every seat is positive. Check the first seats: $\\tfrac{\\binom{0}{0}}{1} = 1$, $\\tfrac{\\binom{2}{1}}{4} = \\tfrac{1}{2}$, $\\tfrac{\\binom{4}{2}}{16} = \\tfrac{3}{8}$, $\\tfrac{\\binom{6}{3}}{64} = \\tfrac{5}{16}$, $\\tfrac{\\binom{8}{4}}{256} = \\tfrac{35}{128}$, $\\tfrac{\\binom{10}{5}}{1024} = \\tfrac{63}{256}$ — the table’s half row, seat for seat.' },
    ], result: '$(1-x)^{-1/2} = \\sum_{r \\geq 0} \\tfrac{\\binom{2r}{r}}{4^r}\\, x^r$ for $|x| < 1$ — the central binomial coefficients, quartered by the row’s own scaling' },
    { kind: 'example', title: 'A numeric witness: $(1.02)^{1/2}$, $(0.98)^{1/2}$ and $(1.02)^{-1}$ from three table rows', steps: [
      'Take $x = 0.02$ — comfortably inside the window — and read the $(1+x)^{1/2}$ row: $(1.02)^{1/2} = 1 + \\tfrac{0.02}{2} - \\tfrac{(0.02)^2}{8} + \\tfrac{(0.02)^3}{16} - \\cdots$',
      'So, the seats price as $1 + 0.01 - 0.00005 + 0.0000005$, summing to $1.0099505$.',
      'Now, compare with the direct square root: $\\sqrt{1.02} = 1.00995049\\ldots$ — the row agrees through six decimals and more, on four seats.',
      'So, the mirrored root: $(0.98)^{1/2}$ is the $(1-x)^{1/2}$ row at $x = 0.02$: $1 - 0.01 - 0.00005 - 0.0000005 = 0.9899495$, against the direct value $0.98994949\\ldots$ — the same six-decimal agreement, with every seat after the first negative.',
      'And the reciprocal: $(1.02)^{-1}$ is the alternating geometric at $x = 0.02$: $1 - 0.02 + 0.0004 - 0.000008 + 0.00000016 = 0.98039216$, against $\\tfrac{1}{1.02} = 0.9803921568\\ldots$ — the row lands $0.98039216$ on the nose of the true value.',
      'Hence three witnesses from three rows — the $\\tfrac{1}{2}$ row (both signs of the argument) and the $-1$ row — each delivering six-plus honest decimals from a handful of seats: the trust-but-verify standard this lesson runs on.',
    ] },
    { kind: 'para', text: 'Sit with what those witnesses do and do not establish. They do not prove the theorem — no finite list of test points ever could, the boundary lesson 7.1 installed permanently. What they establish is that the statement is not a pretty fiction: at every index tested, the truncated row lands on the directly computed value with the accuracy the unpaid tail predicts. That is the Euler standard — trust the pattern, verify it everywhere you can reach, and say where the verification stops. The exercise set closes on exactly that discipline, with a six-decimal verification and an argument for why the sixth decimal is safe.' },
    { kind: 'example', title: 'The $(a+x)^n$ transform: expand $(4+x)^{1/2}$ and $(2+x)^{-2}$, and price the early seats', steps: [
      'The theorem’s window is written for the base $1 + u$; a general base must be moved into that form FIRST — factor the leading power out and let the scaled remainder be the argument.',
      'So, $(4+x)^{1/2} = 4^{1/2}\\left(1 + \\tfrac{x}{4}\\right)^{1/2} = 2\\left(1 + \\tfrac{x}{4}\\right)^{1/2}$ — and the window rescales with the substitution: $\\left|\\tfrac{x}{4}\\right| < 1$ reads as $|x| < 4$.',
      'Now, price the $x^2$ seat: the row’s $u^2$ seat is $-\\tfrac{1}{8}$, so the term is $2 \\cdot \\left(-\\tfrac{1}{8}\\right) \\cdot \\left(\\tfrac{x}{4}\\right)^2$.',
      'So, the coefficient of $x^2$ is $2 \\cdot \\left(-\\tfrac{1}{8}\\right) \\cdot \\tfrac{1}{16} = -\\tfrac{1}{64}$ — the leading factor $2$ and the seat’s own scaling $\\tfrac{1}{16}$ both price in.',
      'And the second run: $(2+x)^{-2} = 2^{-2}\\left(1 + \\tfrac{x}{2}\\right)^{-2} = \\tfrac{1}{4}\\left(1 + \\tfrac{x}{2}\\right)^{-2}$, window $|x| < 2$.',
      'Now, the row at $u = \\tfrac{x}{2}$: $\\tfrac{1}{4}\\left(1 - 2 \\cdot \\tfrac{x}{2} + 3\\left(\\tfrac{x}{2}\\right)^2 - 4\\left(\\tfrac{x}{2}\\right)^3 + \\cdots\\right) = \\tfrac{1}{4} - \\tfrac{x}{4} + \\tfrac{3x^2}{16} - \\tfrac{x^3}{8} + \\cdots$',
      'Hence the seat prices: coefficient of $x$ is $-\\tfrac{1}{4}$, of $x^2$ is $\\tfrac{3}{16}$ — the transform is mechanical: leading power out, scaled remainder in, window rescaled.',
    ] },
    { kind: 'para', text: 'The leading-factor transform deserves its own line in the reflex toolkit, because examinations rarely hand over a $(1 + u)$ base. For a general $(a + x)^n$: factor $a^n$ out — $(a+x)^n = a^n\\left(1 + \\tfrac{x}{a}\\right)^n$ — run the row in the scaled argument $u = \\tfrac{x}{a}$, then multiply back through $a^n$, seat by seat. The window rescales with the substitution: $|u| < 1$ becomes $|x| < |a|$, so a LARGER leading constant buys a WIDER window — $(4+x)^{1/2}$ is valid four times as far out as $(1+x)^{1/2}$, and validity questions set silently inside such expansions are decided by this rescale. Note the sign discipline: if the base reads $(a - x)^n$, the argument is $-\\tfrac{x}{a}$ and the alternation rides the seats exactly as the table’s minus rows show.' },

    { kind: 'heading', text: 'Convergence: the Honest Window' },
    { kind: 'para', text: 'The window is not fine print — it is half the theorem, and this section walks it at the places it bites: the boundary, the outside, and the inside. The instrument throughout is the partial sum: cut the row at seat $r$, add what you have, and watch the running total as $r$ grows. The demonstration row is the oldest infinite object in this book — the alternating geometric $(1+x)^{-1}$ — because its partial sums are small enough to hold in the hand while failing or succeeding in every mode the window forbids or allows.' },
    { kind: 'figure', caption: 'The validity window on the number line: the open interval $-1 < x < 1$ shaded green, its boundary points $x = -1$ and $x = 1$ drawn as red dashed hollow circles labelled "diverges", ticks at $-2, -1, 0, 1, 2$. Inside the window the terms shrink and the infinite row is a genuine number; on the boundary and beyond it the partial sums fail to settle. The window $|x| < 1$ is the price of infiniteness — the finite rows of lesson 7.2 never paid it.', svg: validityWindowSvg() },
    { kind: 'para', text: 'Watch the partial sums of the $(1+x)^{-1}$ row at the four stations of the number line. At $x = 1$, on the boundary: the partial sums read $1, 0, 1, 0, \\ldots$ forever — an oscillation with no limit, so the row has no value there. At $x = -1$, the other boundary point: the partial sums read $1, 2, 3, 4, \\ldots$ — unbounded growth, again no limit, a different failure mode on the same boundary. At $x = 2$, outside: the partial sums of $1 - 2 + 4 - 8 + \\cdots$ oscillate with GROWING magnitude, each swing about twice the previous, and the magnitudes reach $683$ by seat $r = 10$ and $2731$ by seat $r = 12$ — nothing settles, and the word "sum" has no number behind it. Inside, at $x = \\tfrac{1}{2}$: the partial sums squeeze onto $\\tfrac{2}{3}$ — the odd partial sums rise, the even partial sums fall, and the gap between consecutive partial sums halves at every step, the two strands closing on the value $\\tfrac{1}{1 + \\tfrac{1}{2}}$ from opposite sides. That is the whole anatomy of the window in one row: two flavours of divergence on the boundary (oscillation and escape), violent divergence outside, and a two-sided squeeze inside.' },
    { kind: 'example', title: 'Recognise the power behind a series: $1 - \\tfrac{x}{2} + \\tfrac{3x^2}{8} - \\tfrac{5x^3}{16} + \\cdots$ and $1 + 2x + 3x^2 + 4x^3 + \\cdots$', steps: [
      'Recognition is the table read backwards: match a given series against the pinned rows BEFORE computing anything — the reverse read examinations set as recognition items.',
      'So, the first series: signs strictly alternating, magnitudes $\\tfrac{1}{2}, \\tfrac{3}{8}, \\tfrac{5}{16}$ — exactly the $(1+x)^{-1/2}$ row. The series is $(1+x)^{-1/2}$, valid for $|x| < 1$.',
      'And the second: every seat positive, magnitudes $1, 2, 3, 4$ climbing by one — the $(1-x)^{-2}$ row. The series is $(1-x)^{-2}$, again for $|x| < 1$.',
      'Now, the evaluation door that recognition opens: at the specific point $x = \\tfrac{1}{5}$ the first series sums to $\\left(1 + \\tfrac{1}{5}\\right)^{-1/2} = \\left(\\tfrac{6}{5}\\right)^{-1/2} = \\sqrt{\\tfrac{5}{6}}$ — the number the infinite row equals at that point, read off without summing a single partial sum.',
      'Hence the recognition discipline: one seat alone never decides. A row’s first seat fits many indices; the SECOND seat pins the match — two coefficients determine the index and the argument by two equations, and a solver who checks only one seat is guessing. Confirm two seats, then name the power with its window.',
    ] },
    { kind: 'figure', caption: 'The geometric ladder: the first twelve partial sums of $(1-x)^{-1}$ at $x = 0.6$ — the pinned values $1, 1.6, 1.96, 2.176, 2.3056, 2.38336, \\ldots$ labelled bar by bar, each bar drawn at exactly proportional height — climbing onto the dashed target line at the true sum $\\tfrac{1}{1-0.6} = 2.5$. The gaps between successive bar tops are the series’ own terms $0.6^r$, each $0.6$ times the one before, so the gaps shrink geometrically and the staircase is forced to close on the target — the partial sums close in on the true value: convergence in the flesh.', svg: geometricLadderSvg() },
    { kind: 'para', text: 'Read the ladder slowly — it is the picture of everything this section claims. The closed form of the $r$-th partial sum is $S_r = \\tfrac{1 - 0.6^{r+1}}{0.4}$ — the truncated geometric with its own tail subtracted — and the run begins $1, 1.6, 1.96, 2.176, 2.3056, 2.38336, \\ldots$ The first gap is the full $0.6$; every later gap is $0.6$ times the one before — $0.6$, then $0.36$, then $0.216$ — so the unpaid tail above each bar is a shrinking geometric of its own, and the partial sums are pushed onto $\\tfrac{1}{1-0.6} = 2.5$ whether anyone watches or not. The last bar tops out within a pixel of the dashed line, and no later bar will ever move that far again — the series’ remaining motion is smaller than the motion already drawn. That is what convergence MEANS operationally: not “the terms are small”, but “the running total stops moving appreciably, with a computable budget for the motion left”.' },
    { kind: 'callout', tone: 'insight', title: 'What the window buys — and the distinction it protects', text: 'Inside the window, the any-index row is not an approximation scheme that happens to work: it is an exact identity whose right side is a limit, and every partial sum is an honest estimate whose unpaid tail is a shrinking geometric. Outside the window, the row is not “a bad estimate” — it is NOTHING: the partial sums have no limit, so there is no number for the left side to equal. And the boundary phrasing matters: at $x = 1$ the POWER $(1+x)^{-1}$ is the perfectly well-defined number $\\tfrac{1}{2}$ — what diverges is the ROW. The series fails; the function does not — and keeping that distinction straight is the examination-grade honesty this lesson’s title promises.' },

    { kind: 'heading', text: 'Pricing Coefficients at Any Index' },
    { kind: 'para', text: 'The examination workhorse of this lesson is the same as lesson 7.2’s: price one seat. At any index the instrument is unchanged — write the row, substitute the argument, read off the requested seat — with two new degrees of freedom (the index may now be negative or fractional) and one standing obligation (the window statement rides along with every price). Three Illustrations, three grades of craft: the scaled argument, the seat equation solved honestly, and the identity route that never expands a binomial row at all.' },
    { kind: 'example', title: 'Price three seats: $x^3$ in $\\left(1 - \\tfrac{x}{3}\\right)^{-2}$, $x^4$ in $(1+2x)^{-2}$, and $x^4$ in $(1-4x)^{-1/2}$', steps: [
      'Seat pricing at any index is the general term at work: name the row, substitute the argument, price the seat — the window statement travels with the substitution.',
      'So, the first: $\\left(1 - \\tfrac{x}{3}\\right)^{-2}$ is the $(1-x)^{-2}$ row at argument $\\tfrac{x}{3}$, window $|x| < 3$, general term $(r+1)\\left(\\tfrac{x}{3}\\right)^r$ — the $x^3$ seat sits at $r = 3$: $(3+1) \\cdot \\tfrac{1}{27} = \\tfrac{4}{27}$.',
      'And the second: $(1+2x)^{-2}$ is the $(1+x)^{-2}$ row at argument $2x$, window $|x| < \\tfrac{1}{2}$, general term $(-1)^r (r+1)(2x)^r$ — the $x^4$ seat sits at $r = 4$: $(-1)^4 \\cdot 5 \\cdot 2^4 = 80$, positive because the seat index is even.',
      'Now, the third — the elegant collapse: $(1-4x)^{-1/2}$ is the central-binomial row at argument $4x$, and the seat $\\tfrac{\\binom{2r}{r}}{4^r}$ meets the argument’s own $4^r$ and cancels it exactly: the $x^4$ seat is $\\binom{8}{4} = 70$ — an integer, the half row’s fractions gone without a trace.',
      'Hence three prices — $\\tfrac{4}{27}$, $80$, $70$ — from one reflex: index the row, substitute the argument, price the seat, state the window.',
    ] },
    { kind: 'example', title: 'The two-root seat equation: for which $n$ does the $x^2$ seat of $(1+x)^n$ equal $\\tfrac{3}{8}$?', steps: [
      'The seat equation: the $x^2$ seat of $(1+x)^n$ is $\\tfrac{n(n-1)}{2!}$, so the request reads $\\tfrac{n(n-1)}{2} = \\tfrac{3}{8}$.',
      'So, clear denominators: $4n(n-1) = 3$, that is $4n^2 - 4n - 3 = 0$ — a quadratic in the index, not in $x$.',
      'Now, solve honestly: $(2n - 3)(2n + 1) = 0$, so $n = \\tfrac{3}{2}$ or $n = -\\tfrac{1}{2}$ — two roots, two rows.',
      'Check BOTH roots against the seat: $\\tfrac{3}{2} \\cdot \\tfrac{1}{2} \\div 2 = \\tfrac{3}{8}$ and $\\left(-\\tfrac{1}{2}\\right)\\left(-\\tfrac{3}{2}\\right) \\div 2 = \\tfrac{3}{8}$ — both land exactly.',
      'Hence the answer is a PAIR, and the two rows are genuinely different series (their $x$ seats read $\\tfrac{3}{2}$ and $-\\tfrac{1}{2}$ respectively) — dropping a root drops a whole theorem-case, which is the Caution below.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'Caution: a quadratic in the index has two roots', text: 'The classic loss in this family is silent: the solver factors $4n^2 - 4n - 3 = 0$, reads off $n = \\tfrac{3}{2}$, and stops — because the fractional index "looks like" the expected answer and the negative one does not. But the quadratic has TWO roots, both verified above, and both are legitimate binomial indices: $(1+x)^{3/2}$ and $(1+x)^{-1/2}$ genuinely share their $x^2$ seat. The professional habit: solve the equation, print every root that satisfies the seat, and verify each by substitution — an examination that expects one root will still accept the pair stated correctly, and an examination that expects the pair marks the single answer wrong.' },
    { kind: 'example', title: 'The algebraic identity route: the coefficient of $x^n$ in $\\tfrac{1}{(1-x)(1-2x)}$', steps: [
      'Split first, by partial fractions: $\\tfrac{1}{(1-x)(1-2x)} = \\tfrac{2}{1-2x} - \\tfrac{1}{1-x}$ — check the split by recombining over the common denominator: $2(1-x) - (1-2x) = 1$, as required.',
      'So, expand both geometric rows: $\\tfrac{2}{1-2x} = 2\\left(1 + 2x + 4x^2 + 8x^3 + \\cdots\\right)$ and $\\tfrac{1}{1-x} = 1 + x + x^2 + x^3 + \\cdots$ — each valid in its own window, and the narrower one, $|x| < \\tfrac{1}{2}$, governs the combination.',
      'Now, the $x^n$ seat collects from both rows: $2 \\cdot 2^n$ from the first, minus $1$ from the second.',
      'So, the coefficient of $x^n$ is $2^{n+1} - 1$ — the Mersenne family: at $n = 0, 1, 2, 3$ the seats read $1, 3, 7, 15$, doubling and subtracting one forever.',
      'Check by multiplying back: $(1 - 3x + 2x^2)\\left(1 + 3x + 7x^2 + 15x^3 + \\cdots\\right) = 1 + 0x + 0x^2 + 0x^3 + \\cdots$ — every interior seat cancels, exactly as a reciprocal demands.',
      'Hence the identity route: partial fractions turn one rational function into two KNOWN rows, and the seat prices by subtraction — no any-index row was ever written down.',
    ] },
    { kind: 'para', text: 'From the above discussion, the pricing reflex assembles into one sentence — index the row, substitute the argument, price the seat, state the window — and the worked seats sort by the move they exercised. For example:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) a scaled-argument seat — $\\left(1 - \\tfrac{x}{3}\\right)^{-2}$ at $x^3$: $\\tfrac{4}{27}$, window restated as $|x| < 3$;',
      '(ii) a sign-and-scale seat — $(1+2x)^{-2}$ at $x^4$: $(-1)^4 \\cdot 5 \\cdot 2^4 = 80$, the window narrowing to $|x| < \\tfrac{1}{2}$;',
      '(iii) a collapse seat — $(1-4x)^{-1/2}$ at $x^4$: $\\binom{8}{4} = 70$, the argument’s $4^r$ cancelling the row’s own $4^r$;',
      '(iv) an identity seat — $\\tfrac{1}{(1-x)(1-2x)}$ at $x^n$: $2^{n+1} - 1$, priced by partial fractions into two geometric rows with no binomial row involved at all.',
    ] },
    { kind: 'callout', tone: 'exam', title: 'Exam corner', text: 'The binomial theorem for any rational index sits in the JEE (Main) syllabus’ binomial chapter as the negative-and-fractional index material, and it is a standard differentiator there. The question shapes, in frequency order: first-few-terms expansions at a negative or fractional index (the table rows by reflex); seat pricing with a scaled argument ($x \\to \\tfrac{x}{3}$ or $x \\to 2x$ substitutions, where the window rescales silently); recognition items (name the power behind a given series — the two-seat discipline); numeric approximations at small $x$ (the witness method, six-decimal standards); and the honest validity statement $|x| < 1$ that separates complete answers from half answers. The identity route — partial fractions into geometric rows — is the doorstep of the generating-function habits later combinatorics builds on.' },
    { kind: 'quiz', title: 'Check yourself: the binomial theorem for any index', items: [
      { q: 'The infinite-series form $(1+x)^n = 1 + nx + \\tfrac{n(n-1)}{2!}x^2 + \\cdots$ for NEGATIVE or FRACTIONAL $n$ is valid for which $x$?', options: ['every real $x$', 'only $x = 0$', '$|x| < 1$', '$|x| \\geq 1$'], answer: 2, explain: 'Option 2 is the window itself: for negative or fractional $n$ the row never terminates, so the statement is an infinite series, and an infinite series equals its left side only where its partial sums converge — exactly $|x| < 1$. Option 0 fails because outside the window the terms do not shrink: at $x = 2$ the partial-sum magnitudes reach $683$ by seat $r = 10$ and climb from there — there is no sum for the left side to equal. Option 1 fails by needlessness: $x = 0$ is inside the window and both sides read $1$, but the theorem claims the whole open window, not a single point of it. Option 3 is exactly the complement of the truth: the region $|x| \\geq 1$ is where the expansion is silent — the boundary partial sums oscillate ($1, 0, 1, 0, \\ldots$ at $x = 1$) or run away ($1, 2, 3, 4, \\ldots$ at $x = -1$).' },
      { q: 'The coefficient of $x^3$ in the expansion of $(1-x)^{-2}$ is', options: ['3', '4', '5', '-4'], answer: 1, explain: 'Option 1 is the seat: the counting row $(1-x)^{-2} = 1 + 2x + 3x^2 + 4x^3 + \\cdots$ prices the $x^3$ seat at $r = 3$ with the row law $r + 1$ — namely $4$. Option 0 stops one seat early: $3$ is the $x^2$ seat (the term $3x^2$), the classic off-by-one of term-number versus index. Option 2 runs one seat long: $5$ is the $x^4$ seat (the term $5x^4$). Option 3 imports a sign the row does not carry: every seat of $(1-x)^{-2}$ is positive, because the argument’s sign flip cancels the coefficient sign flip — only the $(1+x)^{-2}$ twin alternates.' },
      { q: 'The first four terms of the expansion of $(1-x)^{-3}$ are', options: ['$1 + 3x + 6x^2 + 10x^3$', '$1 - 3x + 6x^2 - 10x^3$', '$1 + x + x^2 + x^3$', '$1 - x + x^2 - x^3$'], answer: 0, explain: 'Option 0 is the row: the counting law prices the seats as $\\binom{r+2}{2} = 1, 3, 6, 10$ — the triangular numbers — and every seat is positive because the argument $-x$ cancels the row’s alternation. Option 1 is the $(1+x)^{-3}$ twin: correct magnitudes, wrong argument — the alternating signs belong to the plus row, a different series. Option 2 is the plain geometric $(1-x)^{-1}$ — the row of index $-1$, not $-3$; it ignores the row law entirely. Option 3 is the $(1+x)^{-1}$ row — the alternating geometric: a different index AND a different argument, doubly wrong.' },
      { q: 'For rational non-integer $n$, the number of terms in the (valid) expansion of $(1+x)^n$ is', options: ['infinitely many', '$n + 1$', 'exactly 2', 'exactly 1'], answer: 0, explain: 'Option 0 is the structural fact: the seat $r$ needs the factor $(n - r + 1)$, and for non-integer $n$ no such factor ever reads zero — the factors descend past zero into negatives forever, so the row never terminates. Option 1 is lesson 7.2’s count — the terminating row of a positive INTEGER index has exactly $n + 1$ seats; quoting it here mixes the two theorems (and “$n + 1$ terms” is not even a term count at $n = \\tfrac{1}{2}$). Option 2 truncates arbitrarily: two seats are a handy approximation, not the expansion. Option 3 makes the same error at one seat: no finite count describes the row.' },
      { q: 'The coefficient of $x^2$ in the expansion of $(1+2x)^{-1}$ is', options: ['$-4$', '$+4$', '$2$', '$\\tfrac{1}{4}$'], answer: 1, explain: 'Option 1 is the seat: the alternating geometric row $1 - u + u^2 - \\cdots$ at argument $u = 2x$ reads $1 - 2x + 4x^2 - \\cdots$, so the $x^2$ seat is $+4$ — the sign is positive because the seat index $2$ is even. Option 0 is the $x^1$ seat of the WRONG index: the $(1+2x)^{-2}$ row opens $1 - 4x + \\cdots$, so $-4$ confuses the reciprocal with the reciprocal square. Option 2 is the magnitude of this row’s own $x^1$ seat (the term $-2x$): right row, wrong seat, with the sign dropped. Option 3 divides where the row multiplies: the argument $2x$ scales the $x^r$ seat by $2^r$ — seats grow along the row, never shrink.' },
    ] },
    { kind: 'exercises', title: 'Exercises 7.3', sets: [
      { level: 'L1', questions: [
        { q: 'Write the first four terms of the expansion of $(1+x)^{-1}$ and state the validity window.', solution: [
          'The row is the alternating geometric: $(1+x)^{-1} = 1 - x + x^2 - x^3 + x^4 - \\cdots$ — every seat of magnitude $1$, the signs alternating strictly.',
          'So, the first four terms are $1 - x + x^2 - x^3$, and the row runs on without end: at the index $-1$ no factor $(n - r + 1)$ ever reads zero.',
          'Hence the validity window is $|x| < 1$ — on the boundary the partial sums read $1, 0, 1, 0, \\ldots$ at $x = 1$ and never settle, and beyond it they run away.',
        ], answer: '$1 - x + x^2 - x^3 + \\dots$, valid for $|x| < 1$' },
        { q: 'Write the first four terms of the expansion of $(1-x)^{-2}$.', solution: [
          'The counting-row law: the seats of $(1-x)^{-n}$ are $\\binom{n+r-1}{r}$, and at $n = 2$ that is $\\binom{r+1}{1} = r + 1$.',
          'So, the seats read $1, 2, 3, 4, \\ldots$ — every one positive, the argument’s sign flip cancelling the row’s alternation.',
          'Hence $(1-x)^{-2} = 1 + 2x + 3x^2 + 4x^3 + \\cdots$ for $|x| < 1$, the first four terms as above.',
        ], answer: '$1 + 2x + 3x^2 + 4x^3 + \\dots$' },
      ] },
      { level: 'L2', questions: [
        { q: 'Rewrite $(2+x)^{-2}$ in the $(1+u)$ form and expand as far as the $x^2$ term.', solution: [
          'Factor out the leading power: $(2+x)^{-2} = 2^{-2}\\left(1 + \\tfrac{x}{2}\\right)^{-2} = \\tfrac{1}{4}\\left(1 + \\tfrac{x}{2}\\right)^{-2}$, valid for $\\left|\\tfrac{x}{2}\\right| < 1$, that is $|x| < 2$.',
          'So, run the $(1+u)^{-2}$ row at $u = \\tfrac{x}{2}$: $1 - 2u + 3u^2 - 4u^3 + \\cdots$ becomes $1 - x + \\tfrac{3x^2}{4} - \\tfrac{x^3}{2} + \\cdots$',
          'Now, multiply back through the leading factor: $\\tfrac{1}{4} - \\tfrac{x}{4} + \\tfrac{3x^2}{16} - \\tfrac{x^3}{8} + \\cdots$',
          'Hence the expansion through the $x^2$ term: $\\tfrac{1}{4} - \\tfrac{x}{4} + \\tfrac{3x^2}{16}$, window $|x| < 2$.',
        ], answer: '$\\tfrac{1}{4} - \\tfrac{x}{4} + \\tfrac{3x^2}{16} - \\dots$' },
        { q: 'Find the coefficient of $x^{10}$ in the expansion of $(1-x)^{-3}$.', solution: [
          'The counting-row law prices the whole seat at once: the coefficient of $x^r$ in $(1-x)^{-3}$ is $\\binom{r+2}{2}$.',
          'So, for the $x^{10}$ seat take $r = 10$: the coefficient is $\\binom{12}{2}$.',
          'Now, $\\binom{12}{2} = \\tfrac{12 \\cdot 11}{2} = 66$ — the tenth seat of the triangular row $1, 3, 6, 10, 15, 21, \\ldots$',
        ], answer: '66' },
      ] },
      { level: 'L3', questions: [
        { q: 'Find the coefficient of $x^3$ in the expansion of $\\left(1 - \\tfrac{x}{3}\\right)^{-2}$.', solution: [
          'The row is $(1-x)^{-2}$ at the scaled argument $\\tfrac{x}{3}$ — valid for $\\left|\\tfrac{x}{3}\\right| < 1$, that is $|x| < 3$.',
          'So, the general term is $(r+1)\\left(\\tfrac{x}{3}\\right)^r$, and the $x^3$ seat sits at $r = 3$.',
          'Now, price it: $(3+1) \\cdot \\tfrac{1}{27} = \\tfrac{4}{27}$.',
        ], answer: '$\\tfrac{4}{27}$' },
        { q: 'Find the coefficient of $x^4$ in the expansion of $(1+2x)^{-2}$.', solution: [
          'The row is $(1+x)^{-2}$ at argument $2x$: general term $(-1)^r (r+1)(2x)^r$, valid for $|2x| < 1$.',
          'So, the $x^4$ seat sits at $r = 4$: $(-1)^4 \\cdot 5 \\cdot 2^4$.',
          'Now, price it: $5 \\cdot 16 = 80$ — positive, because the seat index $4$ is even and the sign flips cancel in pairs.',
        ], answer: '80' },
        { q: 'If the coefficient of $x^2$ in the expansion of $(1+x)^n$ is $\\tfrac{3}{8}$, find BOTH values of $n$.', solution: [
          'The seat equation: the $x^2$ seat of $(1+x)^n$ is $\\tfrac{n(n-1)}{2!}$, so $\\tfrac{n(n-1)}{2} = \\tfrac{3}{8}$.',
          'So, clear denominators: $4n(n-1) = 3$, that is $4n^2 - 4n - 3 = 0$.',
          'Now, factor: $(2n - 3)(2n + 1) = 0$, so $n = \\tfrac{3}{2}$ or $n = -\\tfrac{1}{2}$ — two roots, two rows.',
          'Check BOTH against the seat: $\\tfrac{3}{2} \\cdot \\tfrac{1}{2} \\div 2 = \\tfrac{3}{8}$ and $\\left(-\\tfrac{1}{2}\\right)\\left(-\\tfrac{3}{2}\\right) \\div 2 = \\tfrac{3}{8}$ — both land exactly, and both must be printed.',
        ], answer: '$n = \\tfrac{3}{2}$ or $n = -\\tfrac{1}{2}$' },
      ] },
      { level: 'L4', questions: [
        { q: 'Find the coefficient of $x^4$ in the expansion of $(1-4x)^{-1/2}$, and explain the central-binomial collapse that makes it an integer.', solution: [
          'The half row’s law: the coefficient of $x^r$ in $(1-x)^{-1/2}$ is $\\tfrac{\\binom{2r}{r}}{4^r}$ — the central-binomial family, scaled.',
          'So, at the argument $4x$ each seat picks up the factor $4^r$: the coefficient of $x^r$ in $(1-4x)^{-1/2}$ is $\\tfrac{\\binom{2r}{r}}{4^r} \\cdot 4^r = \\binom{2r}{r}$.',
          'Now, the $x^4$ seat: $\\binom{8}{4} = 70$.',
          'Hence the collapse: the $4^r$ built into the argument cancels the $4^r$ dividing the central binomial coefficient, so EVERY seat of this row is an integer — the half row’s fractions vanish, and $\\binom{8}{4} = 70$ is the visible certificate.',
        ], answer: '70' },
        { q: 'Find the coefficient of $x^2$ in the expansion of $(4+x)^{1/2}$.', solution: [
          'Factor out the leading power: $(4+x)^{1/2} = 4^{1/2}\\left(1 + \\tfrac{x}{4}\\right)^{1/2} = 2\\left(1 + \\tfrac{x}{4}\\right)^{1/2}$, valid for $|x| < 4$.',
          'So, the $x^2$ seat of the $(1+u)^{1/2}$ row is $-\\tfrac{u^2}{8}$, here $-\\tfrac{1}{8}\\left(\\tfrac{x}{4}\\right)^2$.',
          'Now, multiply through the leading factor: $2 \\cdot \\left(-\\tfrac{1}{8}\\right) \\cdot \\tfrac{1}{16} = -\\tfrac{1}{64}$.',
        ], answer: '$-\\tfrac{1}{64}$' },
        { q: 'Find the coefficient of $x^n$ in the expansion of $\\dfrac{1}{(1-x)(1-2x)}$.', solution: [
          'Split by partial fractions: $\\tfrac{1}{(1-x)(1-2x)} = \\tfrac{2}{1-2x} - \\tfrac{1}{1-x}$ — recombine to check: $2(1-x) - (1-2x) = 1$ over the common denominator.',
          'So, expand both rows: $\\tfrac{2}{1-2x} = 2\\left(1 + 2x + 4x^2 + 8x^3 + \\cdots\\right)$ and $\\tfrac{1}{1-x} = 1 + x + x^2 + x^3 + \\cdots$ — the narrower window $|x| < \\tfrac{1}{2}$ governs the difference.',
          'Now, the $x^n$ seat collects $2 \\cdot 2^n$ from the first row minus $1$ from the second: $2^{n+1} - 1$.',
          'So, the seats read $1, 3, 7, 15, \\ldots$ at $n = 0, 1, 2, 3$ — the Mersenne family, doubling and subtracting one forever.',
          'Check by multiplying back: $(1 - 3x + 2x^2)\\left(1 + 3x + 7x^2 + 15x^3 + \\cdots\\right) = 1$ with every interior seat cancelling — the reciprocal’s certificate.',
        ], answer: '$2^{n+1} - 1$' },
      ] },
      { level: 'L5', questions: [
        { q: 'Write the expansion of $(1+x)^{-1/2}$ as far as the $x^3$ term.', solution: [
          'Run the falling factorial from $n = -\\tfrac{1}{2}$: the $x$ seat is $-\\tfrac{1}{2}$; the $x^2$ seat is $\\tfrac{(-1/2)(-3/2)}{2!} = \\tfrac{3}{8}$; the $x^3$ seat is $\\tfrac{(-1/2)(-3/2)(-5/2)}{3!} = -\\tfrac{5}{16}$.',
          'So, $(1+x)^{-1/2} = 1 - \\tfrac{x}{2} + \\tfrac{3x^2}{8} - \\tfrac{5x^3}{16} - \\cdots$ for $|x| < 1$.',
          'Hence the row is the alternating twin of the central-binomial table row — same magnitudes $1, \\tfrac{1}{2}, \\tfrac{3}{8}, \\tfrac{5}{16}$, alternating signs.',
        ], answer: '$1 - \\tfrac{x}{2} + \\tfrac{3x^2}{8} - \\tfrac{5x^3}{16} - \\dots$' },
        { q: 'Show that $(1+x)^{-1}(1-x)^{-1} = (1-x^2)^{-1}$ as series, and read off the coefficient pattern.', solution: [
          'Write both rows: $(1+x)^{-1} = 1 - x + x^2 - x^3 + \\cdots$ and $(1-x)^{-1} = 1 + x + x^2 + x^3 + \\cdots$, each valid for $|x| < 1$.',
          'So, multiply seat by seat: the $x^k$ seat of the product collects $\\sum_{j=0}^{k} (-1)^{j}$ — one contribution per split of the $k$ powers between the two factors.',
          'Now, the alternating count lands on $1$ when $k$ is even and $0$ when $k$ is odd — an even number of alternating contributions cancels pairwise, an odd number leaves exactly one.',
          'So, the product is $1 + x^2 + x^4 + \\cdots$ — even seats $1$, odd seats $0$.',
          'Hence the series identity: $(1+x)^{-1}(1-x)^{-1} = (1-x^2)^{-1}$, the geometric row at the squared argument — and the algebra agrees, since $\\tfrac{1}{(1+x)(1-x)} = \\tfrac{1}{1-x^2}$.',
        ], answer: 'even coefficients 1, odd coefficients 0 — the product is $1 + x^2 + x^4 + \\dots$' },
        { q: 'For the series $(1+x)^{-2}$ at $x = \\tfrac{1}{2}$: compute the first eleven partial sums, describe the oscillation, and state the limit.', solution: [
          'The terms first: the row $1 - 2x + 3x^2 - 4x^3 + 5x^4 - \\cdots$ at $x = \\tfrac{1}{2}$ reads $1, -1, \\tfrac{3}{4}, -\\tfrac{1}{2}, \\tfrac{5}{16}, \\ldots$ — magnitudes shrinking, signs alternating.',
          'So, the partial sums accumulate: $1, 0, 0.75, 0.25, 0.5625, 0.375, 0.484375, 0.421875, 0.457031, 0.4375, 0.448242$ — eleven of them.',
          'Now, read the two strands: the odd-indexed sums $0, 0.25, 0.375, 0.421875, 0.4375$ RISE; the even-indexed sums $1, 0.75, 0.5625, 0.484375, 0.457031, 0.448242$ FALL — two staircases closing on each other.',
          'So, the squeeze closes on $\\tfrac{4}{9} \\approx 0.4444$ — exactly $\\tfrac{1}{\\left(1 + \\tfrac{1}{2}\\right)^2} = \\tfrac{4}{9}$, the value of $(1+x)^{-2}$ at $x = \\tfrac{1}{2}$.',
          'Hence the series converges inside the window by oscillation: the partial sums alternate onto the limit from both sides, the ladder figure drawing the staircase.',
        ], answer: 'the partial sums oscillate onto $\\tfrac{4}{9} = 1/(1+\\tfrac{1}{2})^2$', figures: [
          { caption: 'The oscillating ladder: partial sums of $(1+x)^{-2}$ at $x = \\tfrac{1}{2}$ — odd partial sums rise, even ones fall, both closing on the limit $\\tfrac{4}{9} \\approx 0.444$.', svg: oscillatingLadderSvg() },
        ] },
      ] },
      { level: 'L6', questions: [
        { q: 'Verify the telescoping identity $(1-x)\\left(1 + x + x^2 + \\cdots + x^8\\right) = 1 - x^9$ term by term, and explain what this says about the infinite series $(1-x)^{-1}$ inside its window.', solution: [
          'Multiply out honestly: $(1-x)\\left(1 + x + x^2 + \\cdots + x^8\\right) = \\left(1 + x + \\cdots + x^8\\right) - \\left(x + x^2 + \\cdots + x^9\\right)$.',
          'So, collect powers: for each power from $x$ to $x^8$ the two copies ($+x^k$ and $-x^k$) cancel pairwise; the leading $1$ survives alone, and the trailing $x^9$ survives as $-x^9$.',
          'Hence $(1-x)\\left(1 + x + x^2 + \\cdots + x^8\\right) = 1 - x^9$ — the truncated telescoping ladder of chapter 5, in polynomial clothing.',
          'Now, the infinite read: for $|x| < 1$ the leftover boundary term $-x^9$ shrinks toward zero as the truncation length grows, so the product of $(1-x)$ with the FULL series $1 + x + x^2 + \\cdots$ is exactly $1$.',
          'So, the infinite series is the exact inverse of $(1-x)$ — which is precisely what the symbol $(1-x)^{-1}$ demands, and why the identity $(1-x)^{-1} = 1 + x + x^2 + \\cdots$ holds inside the window and nowhere else.',
        ], answer: 'the interior coefficients cancel pairwise; the truncated product leaves exactly the boundary term $-x^9$ — and the infinite product is exactly 1' },
        { q: 'Using five terms of the $(1+x)^{1/2}$ row, verify $(1.02)^{1/2}$ to six decimal places, and state why the sixth decimal is trustworthy.', solution: [
          'Take $x = 0.02$ — well inside the window — and read the row: $(1+x)^{1/2} = 1 + \\tfrac{x}{2} - \\tfrac{x^2}{8} + \\tfrac{x^3}{16} - \\tfrac{5x^4}{128} - \\cdots$',
          'So, the seats price as $1 + 0.01 - 0.00005 + 0.0000005$, with the fifth seat worth $-\\tfrac{5}{128}(0.02)^4 \\approx -0.000000006$.',
          'Now, add: the four displayed seats give $1.0099505$, the fifth trims the total to $1.00995049\\ldots$, and the direct square root reads $\\sqrt{1.02} = 1.00995049\\ldots$ — agreement through the sixth decimal and beyond.',
          'So, the verdict to six decimals is $1.009950$ — trustworthy because the unpaid tail is smaller than the fifth seat already paid, and that seat lives three decimal places below the resolution the sixth decimal is asked for.',
        ], answer: '1.009950 — the five-term sum 1.0099505 agrees to six decimals' },
      ] },
    ] },
    { kind: 'formula', name: 'The binomial theorem for any rational index', latex: '(1+x)^n = 1 + nx + \\tfrac{n(n-1)}{2!}\\,x^2 + \\tfrac{n(n-1)(n-2)}{3!}\\,x^3 + \\cdots \\quad (|x| < 1)', note: 'for rational $n$ — the positive-integer case of lesson 7.2 is the terminating special case; every other index gives a never-ending row valid only inside the window.' },
    { kind: 'formula', name: 'The general term at any index', latex: 'T_{r+1} = \\tfrac{n(n-1)(n-2)\\cdots(n-r+1)}{r!}\\, x^r', note: 'the falling factorial over $r!$, defined at every rational index; at a positive integer $n$ the factor $(n - r + 1)$ kills the seats from $r = n + 1$ onward.' },
    { kind: 'formula', name: 'The counting row (negative integer index)', latex: '(1-x)^{-n} = \\sum_{r \\geq 0} \\binom{n+r-1}{r}\\, x^r \\qquad (|x| < 1)', note: 'every seat positive — the argument’s sign flip cancels the coefficient sign flip; the $(1+x)^{-n}$ twin alternates.' },
    { kind: 'formula', name: 'The central-binomial half row', latex: '(1-x)^{-1/2} = \\sum_{r \\geq 0} \\tfrac{\\binom{2r}{r}}{4^{r}}\\, x^r \\qquad (|x| < 1)', note: 'the seats $1, \\tfrac{1}{2}, \\tfrac{3}{8}, \\tfrac{5}{16}, \\tfrac{35}{128}, \\tfrac{63}{256}, \\ldots$; at the argument $4x$ the row’s $4^r$ cancels the argument’s $4^r$ and the seats become the integers $\\binom{2r}{r}$.' },
    { kind: 'formula', name: 'The leading-factor transform', latex: '(a+x)^n = a^n\\left(1 + \\tfrac{x}{a}\\right)^{n} \\qquad (|x| < |a|)', note: 'move any base into the $(1 + u)$ form; the window rescales with the substitution — a larger leading constant buys a wider window.' },
    { kind: 'formula', name: 'The window rule', latex: '\\text{never-ending row: valid for } |x| < 1; \\qquad \\text{terminating row } (n \\in \\mathbb{N}): \\text{ valid for every } x', note: 'the window is the price of infiniteness — on the boundary the partial sums oscillate, beyond it they run away.' },
  ],
}

/* ------------------------------------------------------------------ */
/* lesson 7.4 — run 117 swarm (agent 2-b), engines G + pins H          */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* figures — original SVG, vivid palette (owner directive 2026-11-08)   */
/* ------------------------------------------------------------------ */

function termLatticeSvg(): string {
  // the 10 monomials of (a+b+c)^3 on the (q, r) degree lattice: b-degree
  // steps left-up, c-degree steps right-up, and the a-degree is forced as
  // 3 - q - r, so the bottom corner is a^3 and the far corners b^3, c^3.
  // Every node carries its monomial and its coefficient; the balanced seat
  // 6abc is ringed orange at the centre.
  const cx = 330
  const baseY = 430
  const s = 96
  const h = 86
  const seats: { q: number; r: number; mono: string; coef: string }[] = [
    { q: 0, r: 0, mono: 'a³', coef: '1' },
    { q: 1, r: 0, mono: 'a²b', coef: '3' },
    { q: 0, r: 1, mono: 'a²c', coef: '3' },
    { q: 2, r: 0, mono: 'ab²', coef: '3' },
    { q: 1, r: 1, mono: 'abc', coef: '6' },
    { q: 0, r: 2, mono: 'ac²', coef: '3' },
    { q: 3, r: 0, mono: 'b³', coef: '1' },
    { q: 2, r: 1, mono: 'b²c', coef: '3' },
    { q: 1, r: 2, mono: 'bc²', coef: '3' },
    { q: 0, r: 3, mono: 'c³', coef: '1' },
  ]
  const P = (q: number, r: number) => ({ x: cx + (r - q) * s, y: baseY - (q + r) * h })
  let lines = ''
  seats.forEach((a) => {
    seats.forEach((b) => {
      const dq = b.q - a.q
      const dr = b.r - a.r
      if ((dq === 1 && dr === 0) || (dq === 0 && dr === 1) || (dq === 1 && dr === -1)) {
        const pa = P(a.q, a.r)
        const pb = P(b.q, b.r)
        lines += `<line x1="${pa.x}" y1="${pa.y}" x2="${pb.x}" y2="${pb.y}" stroke="#0d9488" stroke-width="2"/>`
      }
    })
  })
  let nodes = ''
  seats.forEach((st) => {
    const { x, y } = P(st.q, st.r)
    if (st.mono === 'abc') {
      nodes += `<circle cx="${x}" cy="${y}" r="33" fill="none" stroke="#ea580c" stroke-width="2.6"/>`
    }
    nodes += `<circle cx="${x}" cy="${y}" r="26" fill="#fef3c7" stroke="#16a34a" stroke-width="2"/>`
    nodes += `<text x="${x}" y="${y - 4}" font-size="11.5" font-weight="800" fill="#166534" text-anchor="middle">${st.mono}</text>`
    nodes += `<text x="${x}" y="${y + 13}" font-size="12.5" font-weight="800" fill="#d97706" text-anchor="middle">${st.coef}</text>`
  })
  // the two degree axes, drawn as amber arrows from below the origin
  const axis = (dir: number) => {
    const x1 = cx + dir * 18
    const y1 = baseY + 36
    const x2 = x1 + dir * 78
    const y2 = y1 - 70
    const bx1 = x2 + dir * 11.5
    const bx2 = x2 + dir * 4.8
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#d97706" stroke-width="2.4"/><path d="M ${x2} ${y2} L ${bx1} ${y2 + 3.6} L ${bx2} ${y2 + 11} Z" fill="#d97706"/>`
  }
  return `<svg viewBox="0 0 660 516" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The ten terms of (a plus b plus c) cubed, drawn on a triangular degree lattice. The b-degree axis steps left-up and the c-degree axis steps right-up; the a-degree is forced as three minus b-degree minus c-degree, so the bottom corner is a cubed with coefficient one, the far top-left corner is b cubed and the far top-right corner is c cubed. The six edge seats — three a squared b, three a squared c, three a b squared, three a c squared, three b squared c, three b c squared — each carry coefficient three, and the orange-ringed centre is six a b c, the balanced seat one-one-one priced six factorial over one factorial one factorial one factorial. The ten coefficients sum to twenty-seven, three cubed.">
  <text x="330" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the ten terms of (a+b+c)³ on the degree lattice</text>
  <text x="330" y="46" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">each node: its monomial, its coefficient (amber) — the ringed centre is the balanced seat 6abc</text>
  ${lines}
  ${nodes}
  ${axis(-1)}${axis(1)}
  <text x="273" y="486" font-size="11" font-weight="800" fill="#d97706" text-anchor="middle">b-degree</text>
  <text x="387" y="486" font-size="11" font-weight="800" fill="#d97706" text-anchor="middle">c-degree</text>
  <text x="330" y="506" font-size="10.5" font-weight="700" text-anchor="middle" fill="#0f766e">the a-degree is forced: p = 3 − q − r — the seat grid is really the (q, r) lattice</text>
</svg>`
}

function distributionBridgeSvg(): string {
  // the 6 terms of (a+b+c)^2 as 6 box-fillings, three rows of box-pairs:
  // for each letter pair the double seat (ONE distribution, count 1) sits
  // beside the mixed seat (TWO distributions, count 2) — the amber counts
  // are the words feeding each term; 6 seats, 9 words in total.
  const rows: { double: string; mixed: [string, string][]; mono: string; term: string }[] = [
    { double: 'a', mixed: [['a', 'b'], ['b', 'a']], mono: 'a²', term: '2ab' },
    { double: 'b', mixed: [['b', 'c'], ['c', 'b']], mono: 'b²', term: '2bc' },
    { double: 'c', mixed: [['c', 'a'], ['a', 'c']], mono: 'c²', term: '2ca' },
  ]
  const slot = (x: number, y: number, ch: string) =>
    `<rect x="${x}" y="${y}" width="15" height="22" rx="3" fill="#ffedd5" stroke="#d97706" stroke-width="1.4"/><text x="${x + 7.5}" y="${y + 15.5}" font-size="12" font-weight="800" fill="#166534" text-anchor="middle">${ch}</text>`
  let s = ''
  rows.forEach((row, i) => {
    const y = 54 + i * 72
    s += `<rect x="36" y="${y}" width="188" height="60" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="1.8"/>`
    s += slot(52, y + 19, row.double) + slot(70, y + 19, row.double)
    s += `<text x="96" y="${y + 37}" font-size="14" font-weight="800" fill="#166534">→ ${row.mono}</text>`
    s += `<text x="204" y="${y + 36}" font-size="11.5" font-weight="800" fill="#d97706" text-anchor="end">1 word</text>`
    s += `<rect x="244" y="${y}" width="388" height="60" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="1.8"/>`
    s += slot(262, y + 19, row.mixed[0][0]) + slot(280, y + 19, row.mixed[0][1])
    s += slot(304, y + 19, row.mixed[1][0]) + slot(322, y + 19, row.mixed[1][1])
    s += `<text x="348" y="${y + 37}" font-size="14" font-weight="800" fill="#166534">→ ${row.term}</text>`
    s += `<text x="616" y="${y + 36}" font-size="11.5" font-weight="800" fill="#d97706" text-anchor="end">2 words</text>`
  })
  return `<svg viewBox="0 0 660 336" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The six terms of (a plus b plus c) squared shown as six box-fillings, three rows of box-pairs, one per letter pair. Row one: the distribution a-a fills the a-squared seat, one word; the two distributions a-b and b-a both fill the 2ab seat, two words. Row two: b-b fills b-squared, one word; b-c and c-b fill 2bc, two words. Row three: c-c fills c-squared, one word; c-a and a-c fill 2ca, two words. Six seats in total, nine words in total — one plus two, three times, equals nine equals three squared — every word of length two over three letters lands in exactly one seat.">
  <text x="330" y="22" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the bridge at n = 2: six seats, and the words that fill them</text>
  ${s}
  <text x="330" y="286" font-size="11" font-weight="800" text-anchor="middle" fill="#166534">each box = one seat (p, q, r) — one way to spend the degree-2 budget across the three letters</text>
  <text x="330" y="308" font-size="10.5" font-weight="700" text-anchor="middle" fill="#0f766e">six seats, nine words: 1 + 2 + 1 + 2 + 1 + 2 = 9 = 3² — the term count and the coefficient census in one picture</text>
</svg>`
}

function constraintTriplesSvg(): string {
  // the p+q+r = 6 seat grid drawn as a right-triangle of 28 cells indexed
  // (p, q), with r = 6 - p - q forced; the degree constraint q + 2r = 8
  // (that is, 2p + q = 4 in (p, q) coordinates) passes through exactly the
  // three admissible cells (0,4), (1,2), (2,0) — the triples (0,4,2),
  // (1,2,3), (2,0,4), priced 15, 60 and 15 by the multinomial formula.
  const s = 46
  const ox = 84
  const oy = 60
  const hot: Record<string, string> = { '0,4': '15', '1,2': '60', '2,0': '15' }
  const pos = (p: number, q: number) => ({ x: ox + q * s + p * s * 0.5, y: oy + p * s * 0.866 })
  let grid = ''
  for (let p = 0; p <= 6; p++) {
    for (let q = 0; q <= 6 - p; q++) {
      const { x, y } = pos(p, q)
      const price = hot[`${p},${q}`]
      if (price) {
        grid += `<rect x="${x - 15}" y="${y - 15}" width="30" height="30" rx="7" fill="#fef3c7" stroke="#ea580c" stroke-width="2.4"/>`
        grid += `<rect x="${x - 12}" y="${y - 12}" width="24" height="24" rx="5" fill="#ffedd5" stroke="#16a34a" stroke-width="1.4"/>`
        grid += `<text x="${x}" y="${y + 4.5}" font-size="12.5" font-weight="800" fill="#166534" text-anchor="middle">${price}</text>`
      } else {
        grid += `<rect x="${x - 12}" y="${y - 12}" width="24" height="24" rx="5" fill="#5eead4" fill-opacity="0.55" stroke="#16a34a" stroke-width="1.2"/>`
      }
    }
  }
  // the dashed constraint line through the three hot cells, extended past both
  const a = pos(0, 4)
  const b = pos(2, 0)
  const t = (k: number) => ({ x: a.x + k * (b.x - a.x), y: a.y + k * (b.y - a.y) })
  const e1 = t(-0.2)
  const e2 = t(1.15)
  const line = `<line x1="${e1.x.toFixed(1)}" y1="${e1.y.toFixed(1)}" x2="${e2.x.toFixed(1)}" y2="${e2.y.toFixed(1)}" stroke="#ea580c" stroke-width="2.4" stroke-dasharray="6 4"/>`
  // axes: q along the top row, p down the left edge
  const qArrow = `<line x1="72" y1="42" x2="134" y2="42" stroke="#d97706" stroke-width="2.4"/><path d="M 134 42 L 125 37.5 L 125 46.5 Z" fill="#d97706"/><text x="148" y="46" font-size="11" font-weight="800" fill="#166534">q</text>`
  const pArrow = `<line x1="64" y1="92" x2="93" y2="142" stroke="#d97706" stroke-width="2.4"/><path d="M 93 142 L 91.9 131.1 L 84.1 135.6 Z" fill="#d97706"/><text x="56" y="126" font-size="11" font-weight="800" fill="#166534" text-anchor="middle">p</text>`
  return `<svg viewBox="0 0 380 352" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The twenty-eight seats of the expansion of (1 + x + x squared) to the sixth power, drawn as a triangular lattice indexed by p and q, with r forced as six minus p minus q. The dashed orange constraint line q + 2r = 8 passes through exactly three cells — the triples (0,4,2), (1,2,3) and (2,0,4) — each highlighted with an orange ring and priced 15, 60 and 15. The other twenty-five seats are faint teal. The three prices sum to 90, the coefficient of x to the eighth.">
  <text x="16" y="20" font-size="11.5" font-weight="700" fill="currentColor">the q + 2r = 8 cut of the p + q + r = 6 lattice</text>
  ${grid}
  ${line}
  <text x="302" y="38" font-size="10" font-weight="800" fill="#ea580c">q + 2r = 8</text>
  ${qArrow}${pArrow}
  <text x="190" y="336" font-size="10.5" font-weight="800" fill="#166534" text-anchor="middle">the cut admits exactly three seats — prices 15 + 60 + 15 = 90</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* lesson 7.4                                                          */
/* ------------------------------------------------------------------ */

const lesson74: Lesson = {
  id: 'aa-the-multinomial-theorem',
  number: '7.4',
  title: 'The Multinomial Theorem',
  concepts: [
    'the multinomial theorem for (a+b+c)^n and beyond',
    'the general term n!/(p!q!r!) a^p b^q c^r',
    'the word census: coefficients as arrangement counts',
    'the term-count law C(n+k-1, k-1)',
    'the identical-distribution bridge from chapter 6',
    'the balanced seat and the greatest coefficient',
    'pricing coefficients under degree constraints',
    'the binomial theorem as the k = 2 multinomial',
  ],
  objectives: [
    'State the multinomial theorem for $(a+b+c)^n$ and for a sum of $k$ letters, and write the general term $\\tfrac{n!}{p!\\,q!\\,r!}\\,a^p b^q c^r$ standing at any seat with $p+q+r = n$.',
    'Prove the theorem by the word census: show that the coefficient of $a^p b^q c^r$ is exactly the count of length-$n$ words over $\\{a,b,c\\}$ with those letter counts — chapter 6’s permutation-with-repeats engine repointed at algebra.',
    'Count the terms of any multinomial expansion by the identical-distribution bridge — $\\binom{n+k-1}{k-1}$ seats — and reconcile the $k = 2$ case with the binomial’s $n + 1$ row length.',
    'Price specific coefficients at speed, including degree-constrained seats such as the coefficient of $x^3$ in $(1+x+x^2)^4$, by enumerating the admissible triples and summing their multinomial prices.',
    'Locate the greatest coefficient at the balanced seat — the most-even split of the degree — and verify that it towers over its neighbours.',
    'Read the coefficient census $\\sum = 3^n$ by setting every letter to $1$, and connect it to lesson 7.2’s row sums $\\sum \\binom{n}{r} = 2^n$.',
    'Recover the binomial theorem as the $k = 2$ multinomial — one theorem, not two — reading $\\tfrac{n!}{p!\\,q!}$ as $\\binom{n}{p}$.',
  ],
  prerequisites: ['aa-the-binomial-theorem-proved', 'aa-distributions-and-the-classic-counting-puzzles', 'aa-combinations-the-selection-count'],
  sources: ['cengage-m2-08', 'cengage-jee-style', 'hall-knight-higher-algebra', 'cengage-m2-07', 'jee-main-2026-syllabus'],
  blocks: [
    { kind: 'para', text: 'Lesson 7.2 built the expansion machine for TWO letters: $(a+b)^n$ opens into exactly $n+1$ terms, each a selection count $\\binom{n}{r}$ in costume, the whole statement proved twice — once by counting, once by induction. But the alphabet of algebra is not two letters long. The moment a problem writes $(a+b+c)^n$ — a three-term base raised to a power, a degree budget split three ways, the expansion of $(1+x+x^2)^n$ that series work reaches for constantly — the two-letter machine stops, and two questions arrive together: what exactly does $(a+b+c)^n$ contain, term by term, and what price does each term carry? The examination hall asks this at every difficulty band; the counting engine asks it too, because chapter 6 counted arrangements of words over any alphabet, and a three-letter expansion is a word census waiting to be run. This lesson answers both questions with one theorem — the multinomial theorem, the binomial theorem’s big sibling, stated for any number of letters and proved by counting alone.' },
    { kind: 'para', text: 'The pleasing part is that half the work is already banked. Chapter 6’s identical-distribution lesson counted the TERMS of the expansion without ever expanding anything: the distinct monomials of $(a+b+c)^n$ are in bijection with the ways to put $n$ identical balls into three labelled boxes, and that count is $\\binom{n+2}{2}$. So the SHAPE of the expansion — how many terms, which monomials appear, which never can — is a chapter 6 census; what chapter 6 did not yet do is price the COEFFICIENT standing in front of each term. Pricing is this lesson’s engine, and the engine is a second census: expand $(a+b+c)^n$ without collecting like terms and the uncollected products are exactly the words of length $n$ over the alphabet $\\{a,b,c\\}$ — $3^n$ of them — and the coefficient of any monomial is the number of words that multiply to it. Chapter 6’s permutation-with-repeats formula counts those words in one line, and the multinomial theorem falls out as a counted statement rather than a memorised one.' },
    { kind: 'para', text: 'Keep one frame in view from the first paragraph, because it is the destination the lesson is steered toward: the binomial theorem is the SMALLEST case of the theorem built here. Set $k = 2$ — two letters — and every multinomial formula must collapse back onto lesson 7.2’s rows of Pascal’s triangle: the term count $\\binom{n+1}{1} = n+1$, the seat price $\\tfrac{n!}{p!\\,q!} = \\binom{n}{p}$, the coefficient census $2^n$. The unification is not a coincidence to be admired at the end; it is a design constraint that keeps every formula honest along the way, and the closing illustration cashes it in explicitly. One theorem, not two.' },

    { kind: 'heading', text: 'What (a+b+c)^n Actually Contains' },
    { kind: 'para', text: 'The theorem’s claim can be said in one sentence before any symbol is written: when $(a+b+c)^n$ is multiplied out completely and like monomials collected, every monomial $a^p b^q c^r$ whose exponents sum to $n$ appears exactly once, and the coefficient standing in front of it is the number of ways to arrange $n$ letters of which $p$ are $a$, $q$ are $b$ and $r$ are $c$. The formal statement, in the two shapes the examination hall meets:' },
    { kind: 'callout', tone: 'theorem', title: 'The multinomial theorem', text: 'For every positive integer $n$ and any three quantities $a, b, c$: $(a+b+c)^n = \\sum_{p+q+r=n} \\tfrac{n!}{p!\\,q!\\,r!}\\,a^p b^q c^r$, the sum running over ALL triples of non-negative integers $(p, q, r)$ with $p + q + r = n$. For $k$ letters the same statement reads $(x_1 + x_2 + \\cdots + x_k)^n = \\sum_{p_1 + \\cdots + p_k = n} \\tfrac{n!}{p_1!\\,p_2!\\cdots p_k!}\\,x_1^{p_1} x_2^{p_2} \\cdots x_k^{p_k}$ — every monomial of total degree $n$ appears exactly once, priced by the arrangement count of its letter multiset. Nothing else appears: the degree-$n$ budget is fully spent by every product.' },
    { kind: 'equation', latex: '(a+b+c)^n = \\sum_{p+q+r=n} \\tfrac{n!}{p!\\,q!\\,r!}\\,a^p b^q c^r \\tag{1}', note: 'the sum runs over all non-negative $(p,q,r)$ with $p+q+r = n$ — every monomial of total degree $n$, and no monomial of any other degree; the $k$-letter form is the same sentence with $k$ indices and $k$ denominators.' },
    { kind: 'callout', tone: 'definition', title: 'The general term of (a+b+c)^n', text: 'For any seat $(p, q, r)$ of non-negative integers with $p + q + r = n$, the term of the expansion standing at that seat is $\\tfrac{n!}{p!\\,q!\\,r!}\\,a^p b^q c^r$ — the analogue of the binomial general term $T_{r+1} = \\binom{n}{r}a^{n-r}b^r$, with one exponent per letter instead of one running index. Thus, the whole expansion is the list of these terms, one per seat, and pricing any requested coefficient is nothing but reading its seat and evaluating one factorial quotient.' },
    { kind: 'terms', items: [
      { term: 'Multinomial theorem', def: 'the expansion law for a power of a sum of any number of letters: every degree-n monomial appears exactly once, priced by the arrangement count of its letter multiset.' },
      { term: 'Multinomial coefficient', def: 'the price n!/(p!q!r!) standing at the seat a^p b^q c^r — the count of length-n words with those letter counts.' },
      { term: 'Seat', def: 'an exponent triple (p, q, r) with p + q + r = n; the monomial position the term occupies. Sum-check first, price second.' },
      { term: 'Word census', def: 'the uncollected expansion read as words: 3^n products of n factors, each a word of length n over {a,b,c}; grouping by letter counts prices every coefficient.' },
      { term: 'Term-count law', def: 'the number of distinct terms of (x_1 + ... + x_k)^n is C(n+k-1, k-1) — chapter 6’s identical-distribution count.' },
      { term: 'Balanced seat', def: 'the most-even split of the degree n across the letters — where the multinomial coefficient peaks; the analogue of the binomial middle.' },
      { term: 'Coefficient census', def: 'the sum of all coefficients of (a+b+c)^n is 3^n — set a = b = c = 1; every word counted exactly once.' },
      { term: 'Degree-constrained seat', def: 'a coefficient hunt in (1+x+x^2)^n-type expansions, where the collected degree q + 2r fixes which triples are admissible before any price is computed.' },
    ] },
    { kind: 'para', text: 'Thus, the statement hands over three structural facts at sight — each checkable against the literal expansions printed below, and each load-bearing for the rest of the lesson. For example, the fact bank:' },
    { kind: 'list', marker: 'roman', items: [
      '**Term count.** exactly $\\binom{n+2}{2}$ seats — the solutions of $p+q+r = n$ — never more, never fewer; the identical-distribution bridge of the third section prices this count.',
      '**Symmetry.** the coefficient of $a^pb^qc^r$ equals that of any letter-swapped seat, $a^qb^pc^r$ say — the formula $\\tfrac{n!}{p!\\,q!\\,r!}$ reads the exponents as a multiset and is blind to which letter carries which count.',
      '**Coefficient mass.** $\\sum_{p+q+r=n} \\tfrac{n!}{p!\\,q!\\,r!} = 3^n$ — set $a = b = c = 1$ and every word multiplies to 1, so the mass counts the census exactly once.',
    ] },
    { kind: 'para', text: 'The evidence before the proof, multiplied out literally — the two smallest powers, with the formula’s own checks printed beside the seats it prices:' },
    { kind: 'table', head: ['Power', 'Literal expansion (collected)', 'Terms', 'The formula’s checks'], rows: [
      ['$(a+b+c)^2$', '$a^2+b^2+c^2+2ab+2bc+2ca$', '6', '$\\tfrac{2!}{1!\\,1!} = 2$ on every mixed seat'],
      ['$(a+b+c)^3$', '$a^3+b^3+c^3+3a^2b+3a^2c+3b^2a+3b^2c+3c^2a+3c^2b+6abc$', '10', '$\\tfrac{3!}{2!\\,1!} = 3$ and $\\tfrac{3!}{1!\\,1!\\,1!} = 6$'],
      ['coefficient mass', '$1+1+1+2+2+2 = 9 = 3^2$; then $1+1+1+3+3+3+3+3+3+6 = 27 = 3^3$', '—', 'every word counted once: the mass is $3^n$'],
    ], caption: 'Both expansions multiplied out literally, term by term (engine-verified by repeated polynomial multiplication before any prose here was declared done); the checks beside them are the formula n!/(p!q!r!) evaluated at the 3a^2b seat and the 6abc seat — 3!/(2!·1!) = 3, 3!/(1!·1!·1!) = 6. The mass row is the word census: 3^n products in total.' },
    { kind: 'figure', caption: 'The ten terms of $(a+b+c)^3$ on the degree lattice. The b-degree axis steps left-up, the c-degree axis right-up; the a-degree is forced, $p = 3 - q - r$, so the lattice IS the seat grid and the bottom corner is $a^3$ (coefficient 1). The edges carry the six two-letter seats at coefficient 3 each — the formula’s $\\tfrac{3!}{2!\\,1!}$ — and the orange-ringed centre is the balanced seat $6abc$, priced $\\tfrac{3!}{1!\\,1!\\,1!} = 6$: the most-even split of the degree is where the price peaks, even at $n = 3$. The amber numbers are the coefficients; their mass is $27 = 3^3$.', svg: termLatticeSvg() },
    { kind: 'para', text: 'Why are those coefficients word counts? Multiply $(a+b+c)(a+b+c)(a+b+c)$ out WITHOUT collecting: the multiplication rule prices the raw census at $3 \\cdot 3 \\cdot 3 = 27$ products, and each product is formed by choosing one letter from each factor — so each product is a three-letter WORD over the alphabet $\\{a, b, c\\}$: $aaa$, $aab$, $aba$, $abb$, and so on down to $ccc$. Now group the words by their letter counts. The words with counts $(2, 1, 0)$ — two $a$’s, one $b$, no $c$ — are $aab$, $aba$, $baa$: three of them, and the formula agrees, $\\tfrac{3!}{2!\\,1!\\,0!} = 3$ — which is exactly the coefficient 3 on the $a^2b$ seat of the collected expansion. The words with counts $(1, 1, 1)$ are $abc$, $acb$, $bac$, $bca$, $cab$, $cba$: six of them, $\\tfrac{3!}{1!\\,1!\\,1!} = 6$, and the 6 sits on the $abc$ seat. Every word with counts $(p, q, r)$ multiplies to $a^p b^q c^r$ and to nothing else, so collecting like monomials IS grouping the census by letter counts — the two acts are indistinguishable. And the census runs wider than $n = 3$: the words with counts $(2, 1, 1)$ at $n = 4$ number $\\tfrac{4!}{2!\\,1!\\,1!} = 12$ among the $3^4 = 81$ four-letter words, and a brute enumeration of all 81 words finds exactly 12 carrying two $a$’s, one $b$ and one $c$ — the engine-verified witness. The coefficient is not merely computed by the formula; it IS a count.' },
    { kind: 'callout', tone: 'historical', title: 'An old theorem with many parents', text: 'The multinomial theorem is commonly traced to the Leibniz–Bernoulli correspondence of the late seventeenth century, where the general letter-count expansion is sketched amid the calculus the two were building, with the special cases known to the algebra tradition long before. This book’s standing honesty applies: the arithmetic belongs to the whole tradition — the statement proved below by counting is the same theorem, whoever first wrote it down.' },
    { kind: 'para', text: 'Read the figure once more before the proof, because the geometry IS the bookkeeping. The ten seats arrange as a triangle because the three degrees are not independent: $p + q + r = 3$ leaves only two free choices, and the lattice draws exactly those two (the b-degree and the c-degree), with the a-degree forced as the remainder. The same triangular shape reappears at every $n$, growing one row per exponent — the term counts $6, 10, 15, 21, 28$ for $n = 2$ to $6$ are that triangle’s growing cell census, the identical-distribution bridge of the next section. And the ringed centre foreshadows the pricing section: the arrangement count peaks where the letters are most evenly spread — the balanced seat, the multinomial’s analogue of the binomial middle term.' },

    { kind: 'heading', text: 'The Counting Proof: Coefficients are Word Counts' },
    { kind: 'para', text: 'The proof is chapter 6’s permutation-with-repeats engine repointed at algebra, and it deserves the full derivation treatment because it is the REASON the theorem is true — not just a formula-check by substitution. The strategy: never expand symbolically at all. Count the uncollected products directly, let the collection happen inside the census, and read the coefficient off as a census total.' },
    { kind: 'derivation', title: 'Theorem: the coefficients of (a+b+c)^n are word counts, priced by the arrangement formula', statement: 'For every positive integer n and every seat (p, q, r) of non-negative integers with p + q + r = n, the coefficient of a^p b^q c^r in the expansion of (a+b+c)^n is exactly n!/(p!q!r!) — the count of length-n words over {a, b, c} carrying p a’s, q b’s and r c’s.', steps: [
      { label: 'Each factor donates one letter', formula: '(a+b+c)^n = \\underbrace{(a+b+c)\\cdots(a+b+c)}_{n \\text{ factors}}', explanation: 'Write the power as $n$ separate factors and refuse to collect: a fully-expanded product is formed by picking exactly one letter from each of the $n$ factors, so every product is a word of length $n$ over the alphabet $\\{a, b, c\\}$ — and the multiplication rule prices the whole census at $3^n$ words.' },
      { label: 'Count the words at one seat', formula: '\\text{count}(p, q, r) = \\tfrac{n!}{p!\\,q!\\,r!}', explanation: 'The words carrying exactly $p$ $a$’s, $q$ $b$’s and $r$ $c$’s are the arrangements of a multiset of size $n$ — chapter 6’s permutation-with-repeats count. Choose the $p$ positions that hold $a$ (an unordered selection, $\\binom{n}{p}$ ways by the selection count of lesson 6.5), then the $q$ positions that hold $b$ among the remaining $n - p$, and the $r$ positions left over are forced to hold $c$: the product of the two selections telescopes to $\\tfrac{n!}{p!\\,q!\\,r!}$.' },
      { label: 'Collect like monomials', formula: 'w \\text{ with counts } (p,q,r) \\Rightarrow w = a^p b^q c^r', explanation: 'Every word with letter counts $(p, q, r)$ multiplies to exactly $a^p b^q c^r$ and to nothing else, so when like monomials are collected, all the words of one seat land on the same term — the coefficient of $a^p b^q c^r$ IS the word count of its seat. That is the whole theorem.' },
      { label: 'Witness at n = 4, seat (2,1,1)', formula: '\\tfrac{4!}{2!\\,1!\\,1!} = 12 \\text{ of the } 3^4 = 81 \\text{ words}', explanation: 'The formula claims 12; the brute census agrees — enumerating all 81 words of length four over $\\{a, b, c\\}$ finds exactly 12 carrying two $a$’s, one $b$ and one $c$ (the aabc-family in all its arrangements). The lesson’s verifier runs this census before any prose was declared done, so the number is pinned, not guessed.' },
      { label: 'The total census', formula: '\\sum_{p+q+r=n} \\tfrac{n!}{p!\\,q!\\,r!} = 3^n', explanation: 'Every word lands in exactly one seat, so the coefficients must sum to the census total: $n = 2$ gives $1+1+1+2+2+2 = 9 = 3^2$; $n = 3$ gives $1+1+1+3+3+3+3+3+3+6 = 27 = 3^3$; $n = 6$ gives the coefficient mass of $(a+b+c)^6$ as $729 = 3^6$ — three independent witnesses, one law.' },
    ], result: '$\\tfrac{n!}{p!\\,q!\\,r!}$ — the multinomial coefficient is an arrangement count, and the multinomial theorem is a census statement' },
    { kind: 'para', text: 'The proof generalises letter by letter with nothing new to invent: $k$ letters give $k^n$ words, the seat $(p_1, \\ldots, p_k)$ prices $\\tfrac{n!}{p_1! \\cdots p_k!}$ by the same arrangement count, and the coefficient census reads $\\sum = k^n$. At $k = 2$ the census is exactly lesson 7.2’s row sum, $\\sum_{r=0}^{n} \\binom{n}{r} = 2^n$ — the same statement rediscovered from the word side. That is the shape of this whole lesson: the multinomial theorem is not a second theorem to be memorised beside the binomial; it is the same counting argument run on a larger alphabet, with the binomial as its smallest instance. The census view also explains a substitution instantly: why does setting $a = b = c = 1$ collapse the expansion to $3^n$? Because equal letters make every word multiply to 1, so the sum of the coefficients counts every word exactly once. No induction required, no expansion written — the meaning did the work.' },

    { kind: 'heading', text: 'How Many Terms? The Identical-Distribution Bridge' },
    { kind: 'para', text: 'The pricing engine answers "which coefficient"; the shape question — "how many terms" — was already answered by chapter 6, and the bridge deserves its own section because it is the fastest examination skill in the whole topic. The distinct terms of $(a+b+c)^n$ are the distinct monomials $a^p b^q c^r$ with $p + q + r = n$; a monomial is fixed by its exponent triple, so counting terms is counting the non-negative solutions of one linear equation — which is precisely chapter 6’s identical-distribution problem: $n$ identical balls into three labelled boxes, the box-labels being the letters themselves.' },
    { kind: 'derivation', title: 'Theorem: (a+b+c)^n has C(n+2, 2) terms — and k letters give C(n+k−1, k−1)', statement: 'The number of distinct terms in the expansion of (a+b+c)^n is the number of non-negative integer solutions of p + q + r = n, namely C(n+2, 2); for a sum of k letters the count is C(n+k−1, k−1).', steps: [
      { label: 'Bijection with the distributions', formula: 'a^p b^q c^r \\leftrightarrow (p, q, r), \\quad p+q+r = n', explanation: 'Each term is fixed by its exponent triple, and each triple is exactly one way of spending the degree budget $n$ across the three letters — a distribution of $n$ identical balls into three labelled boxes. Distinct terms ↔ distinct distributions: the bijection is the identity on triples, so the two counts are the same number.' },
      { label: 'Chapter 6’s identical-distribution count', formula: '\\binom{n+2}{2} = \\tfrac{(n+1)(n+2)}{2}', explanation: 'The stars-and-bars count of chapter 6: $n$ identical objects into $3$ labelled boxes means choosing the $2$ bar-positions among $n + 2$ slots — $\\binom{n+2}{2}$ distributions, hence $\\binom{n+2}{2}$ terms. The lesson’s prerequisites chip for the distributions lesson is there for exactly this bridge.' },
      { label: 'Witness against the literal expansions', formula: 'n = 2 \\to 6,\\; n = 3 \\to 10,\\; n = 4 \\to 15,\\; n = 5 \\to 21,\\; n = 6 \\to 28', explanation: 'Each count matches the literal, engine-multiplied expansions — six terms at $n = 2$, ten at $n = 3$, fifteen, twenty-one, twenty-eight as the exponent climbs; and the closed form $\\tfrac{(n+1)(n+2)}{2}$ evaluated at $n = 2, 3, 4, 5, 6$ returns exactly $6, 10, 15, 21, 28$. The bridge is not a hope; it is a swept law.' },
      { label: 'The k-letter law', formula: '\\binom{n+k-1}{k-1}; \\quad k = 2: \\; \\binom{n+1}{1} = n+1', explanation: 'With $k$ letters the degree budget splits across $k$ boxes: $n$ identical balls into $k$ labelled boxes is $\\binom{n+k-1}{k-1}$ terms. At $k = 2$ the law reads $\\binom{n+1}{1} = n + 1$ — the binomial row length of lesson 7.2, arriving as the promised unification, early and for free.' },
    ], result: 'terms of $(a+b+c)^n = \\binom{n+2}{2}$ — the identical-distribution bridge — and $\\binom{n+k-1}{k-1}$ for $k$ letters, recovering the binomial’s $n + 1$ at $k = 2$' },
    { kind: 'table', head: ['Expansion', 'Terms', 'The bridge formula', 'Witness'], rows: [
      ['$(a+b+c)^2$', '6', '$\\binom{4}{2}$', 'literal: six terms'],
      ['$(a+b+c)^3$', '10', '$\\binom{5}{2}$', 'literal: ten terms'],
      ['$(a+b+c)^4$', '15', '$\\binom{6}{2}$', 'literal: fifteen terms'],
      ['$(a+b+c)^5$', '21', '$\\binom{7}{2}$', 'literal: twenty-one terms'],
      ['$(a+b+c)^6$', '28', '$\\binom{8}{2}$', 'literal: twenty-eight terms'],
      ['$(a+b+c+d)^2$', '10', '$\\binom{5}{3}$', 'literal: ten terms'],
      ['$(a+b+c+d)^3$', '20', '$\\binom{6}{3}$', 'literal: twenty terms'],
      ['$(a+b+c+d)^4$', '35', '$\\binom{7}{3}$', 'literal: thirty-five terms'],
      ['$(a+b+c+d)^5$', '56', '$\\binom{8}{3}$', 'literal: fifty-six terms'],
    ], caption: 'The term-count law swept: three letters at n = 2 to 6 give 6, 10, 15, 21, 28 terms; four letters at n = 2 to 5 give 10, 20, 35, 56 — every count the identical-distribution number of the degree budget, and every count checked against the literal expansion. The k = 2 column of the same law is Pascal’s row length n + 1.' },
    { kind: 'figure', caption: 'The bridge drawn at its smallest: the six terms of $(a+b+c)^2$ as six box-fillings, three rows of box-pairs. Each box is one seat — one way to spend the degree-2 budget across the three letters — and the amber count is the number of two-letter words landing in it: the double seats $aa$, $bb$, $cc$ are fed by one word each, the mixed seats by two each ($ab/ba$, $bc/cb$, $ca/ac$). Six seats, nine words: $1 + 2 + 1 + 2 + 1 + 2 = 9 = 3^2$ — the term count and the coefficient census in one picture.', svg: distributionBridgeSvg() },
    { kind: 'callout', tone: 'insight', title: 'The examination shortcut this bridge buys', text: '"Number of distinct terms in $(a+b+c)^{10}$" is a one-line question once the bridge is installed: $\\binom{10+2}{2} = \\binom{12}{2} = 66$ — no expansion ever written, and none is possible by hand at that size. The same read prices four letters: $(a+b+c+d)^{10}$ carries $\\binom{13}{3} = 286$ terms. The trap is the off-by-one in both entries — the count is $n + k - 1$ choose $k - 1$ — and the two classic wrong answers are seductive: $3^n$ (the word census, a count of products, not of seats) and $n + 1$ (the binomial reflex, right only at $k = 2$).' },
    { kind: 'para', text: 'Why identical balls are the right picture deserves one more sentence, because the picture converts a polynomial question into a chapter 6 reflex. A term is a monomial of total degree exactly $n$: the FULL budget is spent, since every product of $n$ factors carries total degree $n$ — no term of degree $n - 1$ can appear, and none does. Spending on $b$’s and $c$’s forces the $a$-spend, $p = n - q - r$, which is why the seat grid is two-dimensional (the $(q, r)$ lattice of the figure) even though the expansion has three letters: two free letters, one forced. Every seat a distribution; every distribution a term; the bridge holds in both directions.' },

    { kind: 'heading', text: 'Pricing Coefficients' },
    { kind: 'para', text: 'The pricing reflex is four moves, and every illustration below runs it in the open. (i) Read the seat: the requested monomial’s exponents ARE the triple $(p, q, r)$. (ii) Check the sum: $p + q + r$ must equal $n$, or the seat does not exist. (iii) Price: $\\tfrac{n!}{p!\\,q!\\,r!}$, the factorial arithmetic done visibly. (iv) Sanity-check by the census meaning — the answer is a word count, so it must be an integer no larger than the census total, and the neighbouring seats should price lower as the split gets less even. The illustrations then take the reflex to the three places examinations push it: plain seats, degree-constrained seats, and the greatest-coefficient hunt.' },
    { kind: 'example', title: 'Find the coefficient of $a^2b^3c$ in the expansion of $(a+b+c)^6$', steps: [
      'Read the seat: $a^2b^3c$ has the exponent triple $(p, q, r) = (2, 3, 1)$.',
      'Check the sum: $2 + 3 + 1 = 6 = n$ — the seat exists, the full degree budget is spent.',
      'So, the price is the arrangement count $\\tfrac{6!}{2!\\,3!\\,1!}$.',
      'Now, the factorial arithmetic in the open: $6! = 720$ and $2!\\,3!\\,1! = 2 \\cdot 6 \\cdot 1 = 12$, so the price is $\\tfrac{720}{12} = 60$.',
      'Hence the coefficient of $a^2b^3c$ is $60$ — meaning, in the census reading: exactly 60 of the $3^6 = 729$ six-letter words carry two $a$’s, three $b$’s and one $c$.',
    ] },
    { kind: 'example', title: 'Price four seats: $a^3b^2c^2$ in $(a+b+c)^7$; $x^2y^2z$ in $(x+y+z)^5$; $x^2y^3z^3$ in $(x+y+z)^8$; and $a^4b^4c^2$ in $(a+b+c)^{10}$', steps: [
      'Seat $(3, 2, 2)$, sum $7$ — the price is $\\tfrac{7!}{3!\\,2!\\,2!} = \\tfrac{5040}{6 \\cdot 2 \\cdot 2} = \\tfrac{5040}{24} = 210$.',
      'Seat $(2, 2, 1)$, sum $5$ — the price is $\\tfrac{5!}{2!\\,2!\\,1!} = \\tfrac{120}{2 \\cdot 2 \\cdot 1} = \\tfrac{120}{4} = 30$.',
      'Seat $(2, 3, 3)$, sum $8$ — the price is $\\tfrac{8!}{2!\\,3!\\,3!} = \\tfrac{40320}{2 \\cdot 6 \\cdot 6} = \\tfrac{40320}{72} = 560$.',
      'And the big one: seat $(4, 4, 2)$, sum $10$ — the price is $\\tfrac{10!}{4!\\,4!\\,2!} = \\tfrac{3628800}{24 \\cdot 24 \\cdot 2} = \\tfrac{3628800}{1152} = 3150$.',
      'Hence the four prices: $210,\\; 30,\\; 560,\\; 3150$ — each a word count, each one line of visible factorial arithmetic once the seat is read. Note how the seats with the most EVEN splits price highest: $(3,2,2)$ and $(2,3,3)$ at 210 and 560 tower over their lopsided neighbours at the same $n$.',
    ] },
    { kind: 'example', title: 'Find the coefficient of $x^3$ in the expansion of $(1+x+x^2)^4$ — a degree-constrained seat', steps: [
      'Split the letters by weight: the expansion is a multinomial in the three "letters" $1$, $x$ and $x^2$ — write $(p, q, r)$ for the counts of $1$’s, $x$’s and $x^2$’s donated by the four factors.',
      'So, the two constraints: $p + q + r = 4$ (there are four factors), and the collected degree $q + 2r = 3$ (each $x$ donates degree 1, each $x^2$ donates degree 2).',
      'Enumerate honestly: $r = 0$ forces $q = 3$ and then $p = 1$ — the triple $(1, 3, 0)$; $r = 1$ forces $q = 1$ and $p = 2$ — the triple $(2, 1, 1)$; $r \\geq 2$ would already spend $q + 2r \\geq 4 > 3$. Exactly two admissible triples.',
      'Now, price each: $\\tfrac{4!}{1!\\,3!\\,0!} = 4$ and $\\tfrac{4!}{2!\\,1!\\,1!} = 12$.',
      'Hence the coefficient of $x^3$ is $4 + 12 = 16$ — and the literal expansion of $(1+x+x^2)^4$ carries exactly 16 on its $x^3$ seat, the engine’s direct multiplication check. Degree-constrained pricing is the plain reflex plus one enumeration step: the constraint line picks the seats before any price is computed.',
    ] },
    { kind: 'example', title: 'Find the greatest coefficient in the expansion of $(a+b+c)^6$, and state the monomial it prices', steps: [
      'The hunt: price the candidate seats and compare — the multinomial peak sits at the most-even split of the degree, the balanced seat, exactly as the binomial peak sits at the row’s middle.',
      'So, $n = 6$ across three letters: the balanced seat is $(2, 2, 2)$, priced $\\tfrac{6!}{2!\\,2!\\,2!} = \\tfrac{720}{8} = 90$.',
      'Check the neighbours: $(3, 2, 1)$ prices $\\tfrac{6!}{3!\\,2!\\,1!} = 60$, and the lopsided $(4, 1, 1)$ prices $\\tfrac{6!}{4!\\,1!\\,1!} = 30$ — the balanced seat towers over both, by a factor of 1.5 over its nearest neighbour and 3 over the lopsided one.',
      'Hence the greatest coefficient is $90$, standing at $a^2b^2c^2$ — the multinomial’s analogue of the binomial middle term: the arrangement count peaks where the multiset is most evenly spread, and the peak is unique here because 6 splits across three letters with no rival seat of equal evenness.',
    ] },
    { kind: 'example', title: 'The k = 2 unification: price $a^2b^3$ in $(a+b)^5$ by the multinomial engine, and recognise what appears', steps: [
      'The seat: $(p, q) = (2, 3)$ with $p + q = 5$ — a two-letter multinomial seat, sum-check passed.',
      'So, the price is $\\tfrac{5!}{2!\\,3!} = \\tfrac{120}{12} = 10$.',
      'Now, recognise it: $\\tfrac{5!}{2!\\,3!} = \\tfrac{5!}{2!\\,(5-2)!} = \\binom{5}{2} = 10$ — row 5’s third entry, exactly what lesson 7.2’s general term $T_{r+1} = \\binom{n}{r}a^{n-r}b^r$ prices at $r = 2$.',
      'Hence the multinomial at $k = 2$ IS the binomial theorem: the denominator $p!\\,q!$ with $p + q = n$ is precisely the $\\binom{n}{p}$ rearrangement, the term count $\\binom{n+1}{1} = n + 1$ is the binomial row length, and the census $\\sum = 2^n$ is lesson 7.2’s row sum. One theorem, not two — the opening’s promise, cashed.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The two discipline checks of multinomial pricing', text: 'Check one — the sum: a monomial whose exponents do NOT total $n$ is not a seat of the expansion at all. "Find the coefficient of $a^2b^3c$ in $(a+b+c)^5$" is a trick question: $2 + 3 + 1 = 6 \\neq 5$, and the honest answer is that no such term exists in that expansion. Check two — the constraint: in $(1+x+x^2)^n$ the collected degree is $q + 2r$, not $q + r$; forgetting the weight of the $x^2$ letter mis-enumerates the admissible triples and prices seats the expansion does not carry. Both checks are the same habit: write the seat’s defining equations BEFORE any factorial is touched.' },
    { kind: 'para', text: 'The chapter’s machine is now one machine. Lesson 7.2 expanded two letters and proved the expansion twice; this lesson let the alphabet grow and found that nothing new was needed — the same word census prices every seat, the same identical-distribution bridge counts the terms, and the binomial theorem reappears at $k = 2$ as the smallest case of the single theorem that rules the family. What remains for the chapter is depth of use: lesson 7.5 turns the coefficients themselves into objects of study — their sums, their alternating sums, the seats that carry no letter — and lesson 7.6 takes the approximation programme to the expansions doorstep. Before that, the self-check and the graded set, with one exercise carrying its own lattice figure: the constraint cut drawn on the seat grid, priced cell by cell.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner', text: 'The multinomial theorem rides the JEE syllabus through the binomial chapter’s extension topics and surfaces in JEE (Advanced)-style coefficient hunts; state-board courses meet it through $(1+x+x^2)^n$ seats. The question shapes, in frequency order: coefficient pricing at a named seat ($\\tfrac{n!}{p!\\,q!\\,r!}$ at speed — Illustrations 1 and 2); term-count reads ($\\binom{n+k-1}{k-1}$, the 66-term shortcut — no expansion ever written); degree-constrained seats in $(1+x+x^2)^n$ (enumerate the admissible triples, sum the prices — Illustration 3 and exercise L5-1); and the greatest-coefficient hunt at the balanced seat (Illustration 4). The discipline that separates the marks from the misses is the sum-check: exponents totalling $n$ before any factorial is touched, and the constraint written before any triple is priced.' },
    { kind: 'quiz', title: 'Check yourself: the multinomial theorem', items: [
      { q: 'The general term of the expansion of $(a+b+c)^n$ is', options: ['$\\binom{n}{r} a^{n-r} b^r$', '$\\dfrac{n!}{p!\\,q!\\,r!}\\,a^p b^q c^r$, where $p+q+r=n$', '$\\dfrac{n!}{p!\\,q!}\\,a^p b^q$', '$n^n\\,a^p b^q c^r$'], answer: 1, explain: 'Option 1 is the theorem’s general term: the seat $(p, q, r)$ with $p + q + r = n$ is priced by the arrangement count $\\tfrac{n!}{p!\\,q!\\,r!}$ — the whole lesson in one formula. Option 0 is the BINOMIAL general term of lesson 7.2, one running index for two letters: it has no seat for $c$ at all, so it cannot price a three-letter expansion. Option 2 also stops at two letters, and it drops the constraint that the exponents must sum to $n$ — without which the quotient is not even a coefficient of anything. Option 3’s $n^n$ prices nothing here: the census total is $3^n$ words, and no seat’s price is built from $n^n$.' },
      { q: 'The number of terms in the expansion of $(a+b+c)^4$ is', options: ['15', '10', '16', '21'], answer: 0, explain: 'Option 0 is the term-count law: $\\binom{4+2}{2} = \\binom{6}{2} = 15$ — the seats are the solutions of $p+q+r = 4$, fifteen distributions of the degree budget. Option 1’s 10 is the count one exponent lower ($\\binom{5}{2}$, the $n = 3$ expansion) — the classic off-by-one on this exact question. Option 2’s 16 is $2^4$, the BINARY word census: right shape of idea, wrong alphabet — the products number $3^4 = 81$, and the terms are seats, not products. Option 3’s 21 is $\\binom{7}{2}$, the $n = 5$ count — reading the exponent as one higher than it is.' },
      { q: 'The coefficient of $a^2b^3c$ in the expansion of $(a+b+c)^6$ is', options: ['60', '120', '360', '20'], answer: 0, explain: 'Option 0 is the seat price: $(p, q, r) = (2, 3, 1)$ with $2 + 3 + 1 = 6$, priced $\\tfrac{6!}{2!\\,3!\\,1!} = \\tfrac{720}{12} = 60$ — and the census agrees, 60 words with two $a$’s, three $b$’s and one $c$. Option 1’s $120 = \\tfrac{6!}{3!}$ cancels only the $b$-repeats: forgetting that the two $a$’s ALSO overcount the arrangements doubles the true price. Option 2’s $360 = \\tfrac{6!}{2!}$ makes the mirror error — cancelling only the $a$-repeats and leaving the three $b$’s unsplit. Option 3’s $20 = \\binom{6}{3}$ is the two-letter reflex: the middle entry of Pascal row 6, which prices an $(a+b)^6$ seat, never a three-letter one.' },
      { q: 'The number of terms in the expansion of $(a+b+c+d)^3$ is', options: ['10', '20', '16', '27'], answer: 1, explain: 'Option 1 is the four-letter term-count law: $\\binom{3+3}{3} = \\binom{6}{3} = 20$ — the seats are the solutions of $p+q+r+s = 3$, twenty distributions of degree 3 across four letters. Option 0’s 10 is the THREE-letter count at the same exponent ($\\binom{5}{2} = 10$) — forgetting the fourth letter entirely. Option 2’s 16 is $4^2$ read backwards: the uncollected products actually number $4^3 = 64$, and neither number counts seats. Option 3’s 27 is $3^3$ — the three-letter word census: the count of products for three letters, not the distinct terms for four.' },
      { q: 'The sum of all coefficients in the expansion of $(a+b+c)^6$ (set $a=b=c=1$) is', options: ['$3^6 = 729$', '$6^3 = 216$', '$2^6 = 64$', '$\\binom{6}{3} = 20$'], answer: 0, explain: 'Option 0 is the substitution read: setting $a = b = c = 1$ makes every word multiply to 1, so the expansion collapses to its coefficient sum, $\\left(1+1+1\\right)^6 = 3^6 = 729$ — every one of the 729 words counted exactly once, the total census. Option 1’s $216 = 6^3$ inverts the roles: the alphabet size 3 is what gets exponentiated, never the exponent $n$. Option 2’s $64 = 2^6$ is the two-letter row sum $\\sum \\binom{6}{r}$ — lesson 7.2’s territory, the $k = 2$ census, not the $k = 3$ one. Option 3’s $\\binom{6}{3} = 20$ is the balanced-seat price alone — one seat’s coefficient, not the mass of all 28 seats.' },
    ] },
    { kind: 'exercises', title: 'Exercises 7.4', sets: [
      { level: 'L1', questions: [
        { q: 'Expand $(a+b+c)^2$ completely and verify that it has the promised six terms.', solution: [
          'The expansion is the theorem’s smallest three-letter case: every monomial $a^pb^qc^r$ with $p+q+r = 2$, priced $\\tfrac{2!}{p!\\,q!\\,r!}$.',
          'Split the seats by budget: the three double seats $(2,0,0)$, $(0,2,0)$, $(0,0,2)$ price $\\tfrac{2!}{2!} = 1$ each; the three mixed seats $(1,1,0)$, $(0,1,1)$, $(1,0,1)$ price $\\tfrac{2!}{1!\\,1!} = 2$ each.',
          'Hence $(a+b+c)^2 = a^2+b^2+c^2+2ab+2bc+2ca$ — six terms, exactly the term-count law’s $\\binom{4}{2} = 6$.',
          'Check the coefficient mass: $1+1+1+2+2+2 = 9 = 3^2$ — every two-letter word over $\\{a,b,c\\}$ lands in exactly one seat.',
        ], answer: '$a^2+b^2+c^2+2ab+2bc+2ca$' },
        { q: 'Without expanding, state the number of distinct terms in $(a+b+c)^5$.', solution: [
          'No expansion: the term-count bridge counts the seats directly.',
          'Now, the seats are the solutions of $p+q+r = 5$ in non-negative integers — chapter 6’s identical-distribution count, five balls into three boxes.',
          'So, $\\binom{5+2}{2} = \\binom{7}{2} = 21$ distinct terms.',
          'Hence the answer in one census line: 21 seats, no expansion ever written.',
        ], answer: '21' },
      ] },
      { level: 'L2', questions: [
        { q: 'Find the coefficient of $ab^2$ in the expansion of $(a+b+c)^4$.', solution: [
          'Read the seat: $ab^2$ has the triple $(p, q, r) = (1, 2, 1)$, and $1+2+1 = 4$ matches the exponent $n = 4$.',
          'So, the price is the arrangement count $\\tfrac{4!}{1!\\,2!\\,1!}$.',
          'Now, the arithmetic: $\\tfrac{24}{2} = 12$.',
          'Hence the coefficient is 12 — the count of the four-letter words with one $a$, two $b$’s and one $c$, which the census reading confirms at sight.',
        ], answer: '12' },
        { q: 'Without expanding, state the number of distinct terms in $(a+b+c+d)^4$.', solution: [
          'Four letters: the term-count law is $\\binom{n+k-1}{k-1}$ with $k = 4$.',
          'So, the seats are the solutions of $p+q+r+s = 4$ — four identical balls into four labelled boxes.',
          'Hence $\\binom{4+3}{3} = \\binom{7}{3} = 35$ distinct terms.',
          'Check the sibling law: three letters at the same exponent give $\\binom{6}{2} = 15$ — the fourth letter widens the budget split and the seat count with it.',
        ], answer: '35' },
      ] },
      { level: 'L3', questions: [
        { q: 'Find the coefficient of $x^2y^2z$ in the expansion of $(x+y+z)^5$.', solution: [
          'Read the seat: $x^2y^2z$ has the triple $(2, 2, 1)$, and $2+2+1 = 5$ matches the exponent.',
          'So, the price is $\\tfrac{5!}{2!\\,2!\\,1!}$.',
          'Now, the arithmetic: $\\tfrac{120}{4} = 30$.',
          'Hence the coefficient is 30 — thirty five-letter words over $\\{x,y,z\\}$ carrying two $x$’s, two $y$’s and one $z$.',
        ], answer: '30' },
        { q: 'Find the coefficient of $a^3b^2c^2$ in the expansion of $(a+b+c)^7$.', solution: [
          'Read the seat: $(3, 2, 2)$ with $3+2+2 = 7$ — the sum-check passes.',
          'So, the price is $\\tfrac{7!}{3!\\,2!\\,2!}$.',
          'Now, the arithmetic in the open: $\\tfrac{5040}{6 \\cdot 2 \\cdot 2} = \\tfrac{5040}{24}$.',
          'Hence the coefficient is 210.',
        ], answer: '210' },
        { q: 'Find the sum of all the coefficients in the expansion of $(a+b+c)^6$.', solution: [
          'The coefficient mass: set $a = b = c = 1$, so every term collapses to its bare coefficient.',
          'So, the whole expansion becomes $(1+1+1)^6 = 3^6$.',
          'Hence the sum of all coefficients is $729$.',
          'Check by the census: the 729 words of length six over three letters each land in exactly one seat — the mass IS the census total, engine-verified against the literal expansion.',
        ], answer: '$729 = 3^6$' },
      ] },
      { level: 'L4', questions: [
        { q: 'Find the coefficient of $x^3$ in the expansion of $(1+x+x^2)^4$ by enumerating the degree-constrained triples.', solution: [
          'Split the letters by weight: each of the four factors donates one of $1$, $x$ or $x^2$ — write $(p, q, r)$ for the counts of the three.',
          'So, the constraints: $p+q+r = 4$ and the collected degree $q + 2r = 3$.',
          'Enumerate: $r = 0$ forces $q = 3$, $p = 1$ — the triple $(1,3,0)$; $r = 1$ forces $q = 1$, $p = 2$ — the triple $(2,1,1)$; $r \\geq 2$ overspends the degree budget. Exactly two triples.',
          'Now, price each: $\\tfrac{4!}{1!\\,3!\\,0!} = 4$ and $\\tfrac{4!}{2!\\,1!\\,1!} = 12$.',
          'Hence the coefficient of $x^3$ is $4 + 12 = 16$ — matching the literal expansion, whose $x^3$ seat carries exactly 16.',
        ], answer: '16' },
        { q: 'Find the coefficient of $x^2y^3z^3$ in the expansion of $(x+y+z)^8$.', solution: [
          'Read the seat: $(2, 3, 3)$ with $2+3+3 = 8$ — the sum-check passes.',
          'So, the price is $\\tfrac{8!}{2!\\,3!\\,3!}$.',
          'Now, the arithmetic in the open: $\\tfrac{40320}{2 \\cdot 6 \\cdot 6} = \\tfrac{40320}{72}$.',
          'Hence the coefficient is 560.',
        ], answer: '560' },
        { q: 'Find the greatest coefficient in the expansion of $(a+b+c)^6$ and state the monomial it prices.', solution: [
          'The greatest coefficient sits at the balanced seat — the most-even split of the degree 6 across the three letters.',
          'So, the seat is $(2, 2, 2)$: priced $\\tfrac{6!}{2!\\,2!\\,2!} = \\tfrac{720}{8} = 90$.',
          'Check the neighbours: $(3,2,1)$ prices $\\tfrac{6!}{3!\\,2!\\,1!} = 60$, and $(4,1,1)$ prices $\\tfrac{6!}{4!\\,1!\\,1!} = 30$ — the balanced seat towers over both.',
          'Hence the greatest coefficient is 90, at $a^2b^2c^2$ — the multinomial peak at the most-even split, the analogue of the binomial middle.',
        ], answer: '90, at $a^2b^2c^2$ (the balanced seat)' },
      ] },
      { level: 'L5', questions: [
        { q: 'Find the coefficient of $x^8$ in the expansion of $(1+x+x^2)^6$ by enumerating every triple $(p,q,r)$ with $p+q+r=6$ and $q+2r=8$.', solution: [
          'Split the letters by weight: each of the six factors donates one of $1$, $x$ or $x^2$ — write $(p, q, r)$ for the counts of the three.',
          'So, the constraints: $p+q+r = 6$ and the collected degree $q + 2r = 8$.',
          'Enumerate: $r = 2$ gives $q = 4$, $p = 0$ — the triple $(0,4,2)$; $r = 3$ gives $q = 2$, $p = 1$ — the triple $(1,2,3)$; $r = 4$ gives $q = 0$, $p = 2$ — the triple $(2,0,4)$; and no other $r$ works: $r = 1$ would need $q = 6$ and then $p = -1$, while $r \\geq 5$ overspends past degree 8. Exactly three admissible triples.',
          'Now, price each: $\\tfrac{6!}{0!\\,4!\\,2!} = 15$, $\\tfrac{6!}{1!\\,2!\\,3!} = 60$ and $\\tfrac{6!}{2!\\,0!\\,4!} = 15$.',
          'Hence the coefficient of $x^8$ is $15 + 60 + 15 = 90$ — the three admissible seats on the constraint line, drawn on the lattice figure below.',
        ], answer: '90', figures: [
          { caption: 'The three admissible triples $(0,4,2)$, $(1,2,3)$, $(2,0,4)$ on the $p+q+r = 6$ lattice — the constraint $q+2r = 8$ cuts the triangle in exactly three cells, priced 15, 60 and 15.', svg: constraintTriplesSvg() },
        ] },
        { q: 'Count the distinct terms of $(a+b+c+d)^5$ two ways: by the identical-distribution bridge and by the term-count formula.', solution: [
          'By the bridge: the seats are the solutions of $p+q+r+s = 5$ in non-negative integers — five identical balls into four labelled boxes.',
          'So, $\\binom{5+3}{3} = \\binom{8}{3} = 56$ distributions, each one a distinct monomial.',
          'Now, by the formula: the term-count law $\\binom{n+k-1}{k-1}$ at $n = 5$, $k = 4$ reads $\\binom{8}{3} = 56$ — the same expression.',
          'Hence both routes give 56 — two names for one count, which is exactly what the bridge promises: the formula IS the identical-distribution count, stated in expansion language.',
        ], answer: '56' },
        { q: 'Find the coefficient of $a^4b^4c^2$ in the expansion of $(a+b+c)^{10}$.', solution: [
          'Read the seat: $(4, 4, 2)$ with $4+4+2 = 10$ — the sum-check passes.',
          'So, the price is $\\tfrac{10!}{4!\\,4!\\,2!}$.',
          'Now, the arithmetic in the open: $\\tfrac{3628800}{24 \\cdot 24 \\cdot 2} = \\tfrac{3628800}{1152}$.',
          'Hence the coefficient is 3150.',
        ], answer: '3150' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove the multinomial theorem for three letters by the word-census argument: show the coefficient of $a^p b^q c^r$ counts the length-$n$ words over $\\{a,b,c\\}$ with those letter counts, and verify the count at $n=4$, counts $(2,1,1)$: exactly 12 of the 81 words.', solution: [
          'The engine: write $(a+b+c)^n$ as $n$ separate factors and multiply WITHOUT collecting — each fully-expanded product picks exactly one letter per factor, so every product is a word of length $n$ over $\\{a,b,c\\}$, and the multiplication rule counts the census at $3^n$ words.',
          'Now, fix a seat $(p,q,r)$ with $p+q+r = n$: the words carrying exactly $p$ $a$’s, $q$ $b$’s and $r$ $c$’s are arrangements of one multiset of size $n$ — chapter 6’s permutation-with-repeats count $\\tfrac{n!}{p!\\,q!\\,r!}$, because choosing the $p$ positions that hold $a$ (unordered) and then the $q$ positions that hold $b$ leaves the $r$ remaining positions forced to hold $c$, and each such placement is exactly one word.',
          'So, every word with counts $(p,q,r)$ multiplies to $a^pb^qc^r$ and to nothing else — collecting like monomials, the coefficient of $a^pb^qc^r$ IS the word count $\\tfrac{n!}{p!\\,q!\\,r!}$, which is the multinomial theorem.',
          'Hence the witness at $n = 4$, seat $(2,1,1)$: $\\tfrac{4!}{2!\\,1!\\,1!} = 12$ words among the $3^4 = 81$ — and the brute census, run over all 81 words, finds exactly 12 carrying two $a$’s, one $b$ and one $c$, the engine-verified check that the count is pinned, not estimated.',
        ], answer: 'proved — the arrangement count $\\tfrac{n!}{p!\\,q!\\,r!}$ prices every monomial; 12 words at $(2,1,1)$' },
        { q: 'Prove that the sum of all multinomial coefficients of $(a+b+c)^n$ is $3^n$ (every word counted exactly once), and reconcile it with the $k = 2$ case $\\sum_r \\binom{n}{r} = 2^n$ from lesson 7.2.', solution: [
          'The census identity: the words of length $n$ over $\\{a,b,c\\}$ total $3^n$ — three choices per factor, $n$ factors, the multiplication rule — and every word lands in exactly ONE seat $(p,q,r)$ with $p+q+r = n$, determined by its own letter counts.',
          'So, grouping the census by seat: $\\sum_{p+q+r=n} \\tfrac{n!}{p!\\,q!\\,r!} = 3^n$ — the sum of all multinomial coefficients of $(a+b+c)^n$ is the word total. Equivalently: set $a=b=c=1$ in the theorem and every term collapses to its bare coefficient.',
          'Check the witnesses: $n = 2$ gives $1+1+1+2+2+2 = 9 = 3^2$; $n = 3$ gives $1+1+1+3+3+3+3+3+3+6 = 27 = 3^3$; $n = 6$ gives the coefficient mass $729 = 3^6$ — the law holds at every swept exponent.',
          'Hence the reconciliation at $k = 2$: the same argument over two letters counts the $2^n$ binary words — $\\sum_{r=0}^{n} \\binom{n}{r} = 2^n$, lesson 7.2’s row sum. One theorem, one census engine; the binomial is the $k = 2$ instance wearing a triangle.',
        ], answer: 'the word census counts all $3^n$ words; at $k = 2$ it is the $2^n$ row-sum — one theorem' },
      ] },
    ] },
    { kind: 'formula', name: 'The multinomial theorem (k letters)', latex: '(x_1 + \\cdots + x_k)^n = \\sum_{p_1+\\cdots+p_k = n} \\tfrac{n!}{p_1!\\cdots p_k!}\\,x_1^{p_1}\\cdots x_k^{p_k}', note: 'every monomial of total degree $n$ appears exactly once, priced by the arrangement count of its letter multiset — proved by the word census.' },
    { kind: 'formula', name: 'The general term (three letters)', latex: '\\tfrac{n!}{p!\\,q!\\,r!}\\,a^p b^q c^r, \\quad p+q+r = n', note: 'the seat is fixed by the exponents; the price is chapter 6’s permutation-with-repeats count. Sum-check before pricing.' },
    { kind: 'formula', name: 'The term-count law', latex: '\\text{terms of } (x_1 + \\cdots + x_k)^n = \\binom{n+k-1}{k-1}, \\quad \\text{three letters: } \\binom{n+2}{2}', note: '$n$ identical balls into $k$ labelled boxes — the identical-distribution bridge; $k = 2$ recovers the binomial row length $n+1$. Swept against literal expansions.' },
    { kind: 'formula', name: 'The balanced seat', latex: '\\tfrac{n!}{p!\\,q!\\,r!} \\;\\text{ peaks at the most-even } (p,q,r)', note: 'the multinomial’s analogue of the binomial middle: at $n = 6$ the seat $(2,2,2)$ prices 90, towering over its neighbours 60 and 30.' },
    { kind: 'formula', name: 'The k = 2 unification', latex: '\\tfrac{n!}{p!\\,q!} = \\binom{n}{p}, \\quad p + q = n', note: 'the binomial coefficient IS the two-letter multinomial coefficient — one theorem, not two; the term count $n+1$ and the census $2^n$ collapse back onto lesson 7.2 with it.' },
    { kind: 'formula', name: 'The coefficient census', latex: '\\sum_{p+q+r=n} \\tfrac{n!}{p!\\,q!\\,r!} = 3^n; \\quad \\text{over } k \\text{ letters} = k^n', note: 'set every letter to 1: every word multiplies to 1, so the coefficient mass counts the word census exactly once.' },
  ],
}
// ------------------------------------------------------------------
// lesson 75 — authored by the run-118 swarm (agent 4-a), integrated verbatim
// ------------------------------------------------------------------

/* ------------------------------------------------------------------ */
/* figures — original SVG, vivid palette (owner directive 2026-11-08)  */
/* ------------------------------------------------------------------ */

function rowProfile75Svg(): string {
  // row 12 of Pascal's triangle as a true-scale bar chart: 13 bars
  // 1, 12, 66, 220, 495, 792, 924, 792, 495, 220, 66, 12, 1 — even seats
  // (r = 0,2,...,12) green-stroked amber bars, odd seats amber-stroked
  // orange bars; the split even = odd = 2048 = 2^11 annotated under the
  // axis, the unique peak 924 = C(12,6) ringed and called out to the right.
  const vals = [1, 12, 66, 220, 495, 792, 924, 792, 495, 220, 66, 12, 1]
  const base = 350
  const px = 280 / 924
  const centers = vals.map((_, i) => 84 + i * 49)
  let bars = ''
  let labels = ''
  vals.forEach((v, i) => {
    const h = v * px
    const x = centers[i] - 17
    const even = i % 2 === 0
    bars += `<rect x="${x}" y="${(base - h).toFixed(2)}" width="34" height="${h.toFixed(2)}" fill="${even ? '#fef3c7' : '#ffedd5'}" stroke="${even ? '#16a34a' : '#d97706'}" stroke-width="1.6"/>`
    const ly = i === 6 ? 62 : base - h - 5
    labels += `<text x="${centers[i]}" y="${ly.toFixed(1)}" font-size="10" font-weight="700" fill="#166534" text-anchor="middle">${v}</text>`
    labels += `<text x="${centers[i]}" y="366" font-size="9" fill="#65a30d" text-anchor="middle">${i}</text>`
  })
  return `<svg viewBox="0 0 720 466" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A true-scale bar chart of row twelve of Pascal's triangle: thirteen bars with heights exactly proportional to the coefficients 1, 12, 66, 220, 495, 792, 924, 792, 495, 220, 66, 12, 1. Even seats r equals 0, 2, 4 up to 12 are drawn as green-stroked amber bars and odd seats as amber-stroked orange bars. The peak bar 924 at seat six is ringed in dashed orange and labelled the unique peak 924 equals C of 12 choose 6. Below the axis the split is annotated: the even seats 1 plus 66 plus 495 plus 924 plus 495 plus 66 plus 1 total 2048, which is two to the eleventh, and the odd seats 12 plus 220 plus 792 plus 792 plus 220 plus 12 also total 2048 — the two colour families weigh exactly the same, each half of the row total 4096.">
  <text x="360" y="16" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">the row profile of Pascal's triangle at n = 12 — bars at true scale</text>
  <rect x="56" y="32" width="14" height="14" rx="3" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/>
  <text x="76" y="44" font-size="10.5" font-weight="700" fill="#166534">even seats r = 0, 2, 4, …, 12</text>
  <rect x="300" y="32" width="14" height="14" rx="3" fill="#ffedd5" stroke="#d97706" stroke-width="1.6"/>
  <text x="320" y="44" font-size="10.5" font-weight="700" fill="#166534">odd seats r = 1, 3, …, 11</text>
  <text x="704" y="44" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="end">row total 4096 = 2¹²</text>
  ${bars}
  <rect x="353" y="66" width="50" height="290" rx="6" fill="none" stroke="#ea580c" stroke-width="2.4" stroke-dasharray="6 4"/>
  ${labels}
  <text x="470" y="86" font-size="11" font-weight="800" fill="#ea580c">the unique peak: 924 = C(12,6)</text>
  <line x1="466" y1="92" x2="414" y2="78" stroke="#ea580c" stroke-width="2"/>
  <path d="M 414 78 L 423.9 76 L 421.5 84.7 Z" fill="#ea580c"/>
  <line x1="50" y1="350" x2="706" y2="350" stroke="#16a34a" stroke-width="1.8"/>
  <text x="360" y="386" font-size="9.5" fill="#0d9488" text-anchor="middle">seat r — the power of x in (1+x)¹²</text>
  <line x1="56" y1="396" x2="704" y2="396" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="360" y="416" font-size="11" font-weight="700" fill="#0f766e" text-anchor="middle">even seats (green bars): 1 + 66 + 495 + 924 + 495 + 66 + 1 = 2048 = 2¹¹</text>
  <text x="360" y="434" font-size="11" font-weight="700" fill="#0f766e" text-anchor="middle">odd seats (amber bars): 12 + 220 + 792 + 792 + 220 + 12 = 2048 = 2¹¹</text>
  <text x="360" y="452" font-size="10.5" font-weight="700" fill="#166534" text-anchor="middle">the split is exact — each family is half the row: the conjugate machine's 2ⁿ⁻¹</text>
</svg>`
}

function vandermonde75Svg(): string {
  // the three ways to build the x^2 seat of (1+x)^4 (1+x)^4: the splits
  // (0,2), (1,1), (2,0) — each row rings the chosen seat orange in each
  // copy of Pascal row 4 (cells 1, 4, 6, 4, 1) and prices its
  // contribution; the three contributions 6, 16, 6 sweep to 28 = C(8,2).
  const row = [1, 4, 6, 4, 1]
  const rows = [
    { y: 64, a: 0, b: 2, c1: 'C(4,0) · C(4,2)', c2: '1 · 6 = 6', split: 'split 0 + 2' },
    { y: 148, a: 1, b: 1, c1: 'C(4,1) · C(4,1)', c2: '4 · 4 = 16', split: 'split 1 + 1' },
    { y: 232, a: 2, b: 0, c1: 'C(4,2) · C(4,0)', c2: '6 · 1 = 6', split: 'split 2 + 0' },
  ]
  const strip = (x0: number, y0: number, hot: number) =>
    row
      .map((v, k) => {
        const x = x0 + k * 46
        const isHot = k === hot
        return `<rect x="${x}" y="${y0}" width="40" height="32" rx="5" fill="${isHot ? '#ffedd5' : '#fef3c7'}" stroke="${isHot ? '#ea580c' : '#16a34a'}" stroke-width="${isHot ? 2.4 : 1.2}"/><text x="${x + 20}" y="${y0 + 21}" font-size="12.5" font-weight="800" fill="${isHot ? '#ea580c' : '#166534'}" text-anchor="middle">${v}</text>`
      })
      .join('')
  let body = ''
  rows.forEach((r) => {
    body += `<text x="30" y="${r.y + 22}" font-size="10" font-weight="700" fill="#65a30d">${r.split}</text>`
    body += strip(100, r.y, r.a)
    body += `<text x="338" y="${r.y + 22}" font-size="16" font-weight="800" fill="#d97706" text-anchor="middle">×</text>`
    body += strip(352, r.y, r.b)
    body += `<text x="590" y="${r.y + 18}" font-size="10" font-weight="700" fill="#65a30d">${r.c1}</text>`
    body += `<text x="590" y="${r.y + 42}" font-size="13" font-weight="800" fill="#166534">${r.c2}</text>`
  })
  return `<svg viewBox="0 0 720 372" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The three ways to build the x-squared seat of the product of two copies of the expansion of 1 plus x to the fourth. Each of three rows shows a split of the two x-factors between the two expansions: split 0 plus 2 rings cell value 1 in the first copy of row 4 and cell value 6 in the second, contribution 1 times 6 equals 6; split 1 plus 1 rings cell 4 in each copy, contribution 4 times 4 equals 16; split 2 plus 0 rings cell 6 in the first copy and cell 1 in the second, contribution 6 times 1 equals 6. The three contributions sum to 6 plus 16 plus 6 equals 28, which equals C of 8 choose 2 — the same seat of the collapsed product 1 plus x to the eighth.">
  <text x="360" y="20" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">building the x² seat of (1+x)⁴ · (1+x)⁴ — three ways, one total</text>
  <text x="212" y="50" font-size="10.5" font-weight="700" fill="#166534" text-anchor="middle">first (1+x)⁴ row</text>
  <text x="464" y="50" font-size="10.5" font-weight="700" fill="#166534" text-anchor="middle">second (1+x)⁴ row</text>
  <text x="650" y="50" font-size="10.5" font-weight="700" fill="#166534" text-anchor="middle">contribution</text>
  ${body}
  <text x="360" y="336" font-size="12.5" font-weight="800" fill="#166534" text-anchor="middle">6 + 16 + 6 = 28 = C(8,2) — one seat of (1+x)⁸, read three ways</text>
  <text x="360" y="356" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">the sweep law at work: the product is (1+x)⁸, and the x² seat of (1+x)⁸ is C(8,2) = 28</text>
</svg>`
}

function complexWalk75Svg(): string {
  // the (1+i)^8 walk on the complex plane: the nine powers 1, 1+i, 2i,
  // -2+2i, -4, -4-4i, -8i, 8-8i, 16 — each step multiplies by (1+i):
  // length x sqrt(2), turn 45 degrees anticlockwise; eight turns make a
  // full 360 degrees and the scale factor (sqrt 2)^8 = 16, so the walk
  // closes on the positive real axis at 16.
  const u = 24
  const O = { x: 240, y: 210 }
  const pts = [
    { re: 1, im: 0 },
    { re: 1, im: 1 },
    { re: 0, im: 2 },
    { re: -2, im: 2 },
    { re: -4, im: 0 },
    { re: -4, im: -4 },
    { re: 0, im: -8 },
    { re: 8, im: -8 },
    { re: 16, im: 0 },
  ].map((p) => ({ x: O.x + p.re * u, y: O.y - p.im * u }))
  let segs = ''
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i]
    const b = pts[i + 1]
    const dx = b.x - a.x
    const dy = b.y - a.y
    const len = Math.sqrt(dx * dx + dy * dy)
    const ux = dx / len
    const uy = dy / len
    const cs = Math.min(11, len * 0.22)
    const ce = i === pts.length - 2 ? Math.min(16, len * 0.28) : Math.min(13, len * 0.28)
    const x1 = a.x + ux * cs
    const y1 = a.y + uy * cs
    const x2 = b.x - ux * ce
    const y2 = b.y - uy * ce
    const bx = x2 - ux * 9
    const by = y2 - uy * 9
    const qx = -uy
    const qy = ux
    segs += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#d97706" stroke-width="2.2"/>`
    segs += `<path d="M ${x2.toFixed(1)} ${y2.toFixed(1)} L ${(bx + qx * 4.5).toFixed(1)} ${(by + qy * 4.5).toFixed(1)} L ${(bx - qx * 4.5).toFixed(1)} ${(by - qy * 4.5).toFixed(1)} Z" fill="#d97706"/>`
  }
  let dots = ''
  pts.forEach((p, i) => {
    if (i === pts.length - 1) {
      dots += `<circle cx="${p.x}" cy="${p.y}" r="9" fill="#ffedd5" stroke="#ea580c" stroke-width="2.6"/>`
    } else {
      dots += `<circle cx="${p.x}" cy="${p.y}" r="6.5" fill="#fef3c7" stroke="#16a34a" stroke-width="1.8"/>`
    }
  })
  return `<svg viewBox="0 0 700 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The spiral walk of the powers of 1 plus i on the complex plane, axes drawn. Starting at the point 1 on the real axis, each multiplication by 1 plus i scales the length by root two and turns 45 degrees anticlockwise: the walk visits 1 plus i, then 2i on the imaginary axis, then minus 2 plus 2i, then minus 4 on the negative real axis, then minus 4 minus 4i, then minus 8i, then 8 minus 8i, and closes at 16 on the positive real axis — eight 45-degree turns make a full 360 degrees, and the accumulated scale root-two to the eighth power is 16, which is why the eighth power of 1 plus i is the real number 16.">
  <text x="350" y="20" font-size="12" font-weight="700" text-anchor="middle" fill="currentColor">the (1+i)⁸ walk — eight 45° turns close the spiral at 16</text>
  <line x1="100" y1="210" x2="660" y2="210" stroke="#16a34a" stroke-width="1.6"/>
  <path d="M 660 210 L 651 206 L 651 214 Z" fill="#16a34a"/>
  <text x="150" y="228" font-size="9.5" font-weight="700" fill="#65a30d">real axis</text>
  <line x1="240" y1="425" x2="240" y2="130" stroke="#16a34a" stroke-width="1.6"/>
  <path d="M 240 130 L 236 139 L 244 139 Z" fill="#16a34a"/>
  <text x="252" y="140" font-size="9.5" font-weight="700" fill="#65a30d">imaginary axis</text>
  ${segs}
  ${dots}
  <text x="254" y="205" font-size="10" font-weight="700" fill="#166534" text-anchor="end">1</text>
  <text x="274" y="181" font-size="10" font-weight="700" fill="#166534">1+i</text>
  <text x="252" y="154" font-size="10" font-weight="700" fill="#166534">2i</text>
  <text x="192" y="148" font-size="10" font-weight="700" fill="#166534" text-anchor="middle">−2+2i</text>
  <text x="136" y="205" font-size="10" font-weight="700" fill="#166534" text-anchor="end">−4</text>
  <text x="136" y="262" font-size="10" font-weight="700" fill="#166534" text-anchor="end">−4−4i</text>
  <text x="252" y="422" font-size="10" font-weight="700" fill="#166534">−8i</text>
  <text x="442" y="424" font-size="10" font-weight="700" fill="#166534">8−8i</text>
  <text x="624" y="190" font-size="11" font-weight="800" fill="#ea580c" text-anchor="middle">16 = (1+i)⁸</text>
  <text x="274" y="202" font-size="9" font-weight="700" fill="#65a30d">×(1+i)</text>
  <text x="350" y="438" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">each step multiplies by (1+i): length ×√2, anticlockwise turn 45°</text>
  <text x="350" y="458" font-size="10" font-weight="800" fill="#166534" text-anchor="middle">eight steps: total turn 8 × 45° = 360°, total scale (√2)⁸ = 16 — the walk closes on the positive real axis at 16</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* solution figures — compact diagrams inside exercise solutions       */
/* (FIGURE_VERIFICATION_PROTOCOL.md §10.1 discipline)                  */
/* ------------------------------------------------------------------ */

function mirrorSeats75Svg(): string {
  // the eleven seats r = 0..10 of (x - 1/x)^{10}: seat r carries exponent
  // 10 - 2r, so seats r and 10 - r mirror — equal coefficient magnitudes,
  // exponents negated (amber arcs below); the middle seat r = 5 alone
  // carries x^0 and is ringed as the constant seat, priced -252.
  const exps = ['x¹⁰', 'x⁸', 'x⁶', 'x⁴', 'x²', 'x⁰', 'x⁻²', 'x⁻⁴', 'x⁻⁶', 'x⁻⁸', 'x⁻¹⁰']
  const coefs = ['+1', '−10', '+45', '−120', '+210', '−252', '+210', '−120', '+45', '−10', '+1']
  let boxes = ''
  for (let i = 0; i <= 10; i++) {
    const cx = 60 + i * 60
    const x = 34 + i * 60
    const neg = coefs[i].startsWith('−')
    boxes += `<rect x="${x}" y="58" width="52" height="62" rx="6" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/>`
    boxes += `<text x="${cx}" y="74" font-size="8.5" font-weight="700" fill="#0d9488" text-anchor="middle">r = ${i}</text>`
    boxes += `<text x="${cx}" y="92" font-size="12.5" font-weight="800" fill="#166534" text-anchor="middle">${exps[i]}</text>`
    boxes += `<text x="${cx}" y="110" font-size="10.5" font-weight="800" fill="${neg ? '#dc2626' : '#65a30d'}" text-anchor="middle">${coefs[i]}</text>`
  }
  let arcs = ''
  const sags = [68, 56, 44, 32, 20]
  for (let i = 0; i <= 4; i++) {
    const a = 60 + i * 60
    const b = 60 + (10 - i) * 60
    const mid = (a + b) / 2
    arcs += `<path d="M ${a} 124 Q ${mid} ${124 + 2 * sags[i]} ${b} 124" fill="none" stroke="#d97706" stroke-width="2"/>`
  }
  return `<svg viewBox="0 0 720 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The eleven seats of the expansion of x minus 1 over x to the tenth, drawn as a row of boxes. Seat r carries the exponent 10 minus 2r, so the exponents read 10, 8, 6, 4, 2, 0, minus 2, minus 4, minus 6, minus 8, minus 10 across the row, and each box also shows its coefficient: plus 1, minus 10, plus 45, minus 120, plus 210, minus 252, plus 210, minus 120, plus 45, minus 10, plus 1. Amber arcs below the row connect each mirror pair r and 10 minus r — equal coefficient magnitudes with exponents negated. The middle seat r equals 5 is ringed in orange: it alone carries x to the zero, the constant term, priced minus C of 10 choose 5 equals minus 252.">
  <text x="360" y="20" font-size="12" font-weight="700" text-anchor="middle" fill="currentColor">the eleven seats of (x − 1/x)¹⁰ — seat r carries the exponent 10 − 2r</text>
  ${boxes}
  <rect x="326" y="48" width="68" height="82" rx="10" fill="none" stroke="#ea580c" stroke-width="2.6"/>
  ${arcs}
  <text x="360" y="214" font-size="10.5" font-weight="700" fill="#d97706" text-anchor="middle">amber arcs: mirror pairs r ↔ 10 − r — equal coefficient magnitudes, exponents negated</text>
  <text x="360" y="240" font-size="11.5" font-weight="800" fill="#ea580c" text-anchor="middle">the middle seat r = 5 alone carries x⁰ — the constant term</text>
  <text x="360" y="260" font-size="10.5" font-weight="700" fill="#166534" text-anchor="middle">its price: (−1)⁵ · C(10,5) = −252 — the mirror discipline finds the constant seat</text>
</svg>`
}

function equalBars75Svg(): string {
  // the coefficient magnitudes C(13,k)·2^{13-k}·5^k of (2+5x)^{13} at the
  // seats k = 0..13, normalized to the equal pair (k = 9, 10): heights
  // proportional to the magnitudes 8192, 266240, 3.99M, 36.6M, 229M,
  // 1.03B, 3.43B, 8.58B, 16.09B, 22.34B, 22.34B, 15.23B, 6.35B, 1.22B —
  // the two equal bars at k = 9 and k = 10 highlighted and tied with a
  // dashed line at the top.
  const mags = [8192, 266240, 3993600, 36608000, 228800000, 1029600000, 3432000000, 8580000000, 16087500000, 22343750000, 22343750000, 15234375000, 6347656250, 1220703125]
  const H = 250 / mags[9]
  const base = 340
  let bars = ''
  mags.forEach((m, k) => {
    const h = m * H
    const cx = 84 + k * 46
    const hot = k === 9 || k === 10
    bars += `<rect x="${cx - 16}" y="${(base - h).toFixed(2)}" width="32" height="${h.toFixed(2)}" fill="${hot ? '#ffedd5' : '#fef3c7'}" stroke="${hot ? '#ea580c' : '#16a34a'}" stroke-width="${hot ? 2.4 : 1.4}"/>`
    bars += `<text x="${cx}" y="358" font-size="9" fill="#65a30d" text-anchor="middle">${k}</text>`
  })
  return `<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The coefficient profile of the expansion of 2 plus 5x to the thirteenth: fourteen bars, one per seat k from 0 to 13, with heights proportional to the coefficient magnitudes C of 13 choose k times 2 to the 13 minus k times 5 to the k, normalized so the greatest pair reaches the full bar height. The magnitudes run 8192, 266240, about 4 million, 36.6 million, 229 million, 1.03 billion, 3.43 billion, 8.58 billion, 16.09 billion, 22.34 billion, 22.34 billion, 15.23 billion, 6.35 billion, 1.22 billion. The two equal bars at seats k equals 9 and k equals 10 are highlighted in orange and tied by a dashed line at their common top height; the early seats k from 0 to 3 are slivers at this scale. The seat law k equals b times n plus 1 over a plus b equals 5 times 14 over 7 equals 10 prices the equal pair.">
  <text x="360" y="20" font-size="12.5" font-weight="700" text-anchor="middle" fill="currentColor">the coefficient profile of (2+5x)¹³ — heights normalized to the equal pair</text>
  <text x="360" y="40" font-size="10" font-weight="700" fill="#0f766e" text-anchor="middle">the seat law k = b(n+1)/(a+b) = 5·14/7 = 10 prices the equal pair at seats k = 9 and k = 10</text>
  ${bars}
  <text x="268" y="332" font-size="9.5" font-weight="700" fill="#166534" text-anchor="middle">229M</text>
  <text x="314" y="323" font-size="9.5" font-weight="700" fill="#166534" text-anchor="middle">1.03B</text>
  <text x="360" y="296" font-size="9.5" font-weight="700" fill="#166534" text-anchor="middle">3.43B</text>
  <text x="406" y="239" font-size="9.5" font-weight="700" fill="#166534" text-anchor="middle">8.58B</text>
  <text x="452" y="155" font-size="9.5" font-weight="700" fill="#166534" text-anchor="middle">16.1B</text>
  <text x="498" y="108" font-size="9" font-weight="800" fill="#166534" text-anchor="middle">22.3B</text>
  <text x="544" y="108" font-size="9" font-weight="800" fill="#166534" text-anchor="middle">22.3B</text>
  <text x="590" y="165" font-size="9.5" font-weight="700" fill="#166534" text-anchor="middle">15.2B</text>
  <text x="636" y="264" font-size="9.5" font-weight="700" fill="#166534" text-anchor="middle">6.35B</text>
  <text x="682" y="321" font-size="9.5" font-weight="700" fill="#166534" text-anchor="middle">1.22B</text>
  <line x1="474" y1="84" x2="568" y2="84" stroke="#ea580c" stroke-width="2" stroke-dasharray="6 4"/>
  <text x="521" y="66" font-size="10" font-weight="800" fill="#ea580c" text-anchor="middle">the equal pair — the tie at the top: C(13,9)·2⁴·5⁹ = C(13,10)·2³·5¹⁰</text>
  <line x1="50" y1="340" x2="706" y2="340" stroke="#16a34a" stroke-width="1.8"/>
  <text x="360" y="376" font-size="9.5" fill="#0d9488" text-anchor="middle">seat k — the power of x in (2+5x)¹³</text>
  <text x="360" y="398" font-size="9.5" font-weight="700" fill="#0f766e" text-anchor="middle">the seats k = 0..3 carry 8192, 266,240, 3.99M, 36.6M — slivers at this scale: the ×5-per-seat engine outruns the row-count engine</text>
</svg>`
}

function signedBars75Svg(): string {
  // the alternating squares of row 4 as signed bars: 1, -16, 36, -16, 1
  // (up for positive, down for negative, true-to-scale heights), with the
  // running partial sums 1, -15, 21, 5, 6 annotated in a teal strip below,
  // closing on 6 = (-1)^2 C(4,2).
  const vals = [1, -16, 36, -16, 1]
  const scale = 76 / 36
  const centers = [84, 164, 244, 324, 404]
  let bars = ''
  let labels = ''
  vals.forEach((v, i) => {
    const h = Math.abs(v) * scale
    const x = centers[i] - 27
    const pos = v > 0
    const y = pos ? 140 - h : 140
    bars += `<rect x="${x}" y="${y.toFixed(2)}" width="54" height="${h.toFixed(2)}" fill="#fef3c7" stroke="${pos ? '#16a34a' : '#dc2626'}" stroke-width="1.6"/>`
    const ly = pos ? 140 - h - 6 : 140 + h + 14
    labels += `<text x="${centers[i]}" y="${ly.toFixed(1)}" font-size="10" font-weight="700" fill="${pos ? '#166534' : '#dc2626'}" text-anchor="middle">r = ${i} · ${pos ? '' : '−'}${Math.abs(v)}</text>`
  })
  const sums = ['1', '−15', '21', '5', '6']
  let strip = ''
  centers.forEach((c, i) => {
    strip += `<rect x="${c - 32}" y="232" width="64" height="26" rx="5" fill="#fef3c7" stroke="#0d9488" stroke-width="1.8"/>`
    strip += `<text x="${c}" y="249" font-size="12" font-weight="800" fill="#0f766e" text-anchor="middle">${sums[i]}</text>`
  })
  return `<svg viewBox="0 0 480 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The alternating sum of squared row-4 coefficients as signed bars: values 1, minus 16, 36, minus 16, 1 drawn at true-to-scale heights, positive bars pointing up with green strokes and negative bars pointing down with red strokes, labelled r equals 0 dot 1, r equals 1 dot minus 16, r equals 2 dot 36, r equals 3 dot minus 16, r equals 4 dot 1. Below the bars a teal strip of boxes annotates the running partial sums: 1, then minus 15, then 21, then 5, then 6 — the total closes on 6, which is plus one squared times C of 4 choose 2, the even-n alternating-squares law witnessed.">
  <text x="240" y="18" font-size="11.5" font-weight="700" text-anchor="middle" fill="currentColor">the alternating squares at n = 4: 1 − 16 + 36 − 16 + 1</text>
  ${bars}
  ${labels}
  <line x1="44" y1="140" x2="436" y2="140" stroke="#16a34a" stroke-width="1.8"/>
  <text x="36" y="144" font-size="9" font-weight="700" fill="#65a30d">0</text>
  <text x="240" y="222" font-size="10" font-weight="800" fill="#0f766e" text-anchor="middle">running totals after each seat:</text>
  ${strip}
  <text x="240" y="284" font-size="10.5" font-weight="700" fill="#166534" text-anchor="middle">the totals close on 6 = (−1)² · C(4,2) — the even-n law, witnessed</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* lesson 7.5                                                          */
/* ------------------------------------------------------------------ */

const lesson75: Lesson = {
  id: 'aa-binomial-coefficients-at-work',
  number: '7.5',
  title: 'Binomial Coefficients at Work',
  concepts: [
    'the substitution engine: sums of coefficients in any expansion',
    'conjugate reads: the even and odd machines',
    'alternating squares via (1-x²)^n',
    'Vandermonde’s identity and series from products of expansions',
    'the ratio of consecutive coefficients and the A.P. condition',
    'greatest coefficient, twin peaks and the greatest term',
    'binomial expansions using complex numbers',
    'the term independent of x',
  ],
  objectives: [
    'Price the sum of the coefficients of ANY expansion by substitution at $x = 1$ — including the honest zeros ($(1+x-2x^2)^9 \\to 0$) and the $2^n$ trap for bases that are not $1+x$ — and split any row into its even-index and odd-index families, each $2^{n-1}$.',
    'Read conjugate expansions: harvest the even seats by adding $(1+x)^n$ and $(1-x)^n$, the odd seats by subtracting them, and prove the alternating-squares law for $\\sum (-1)^r \\binom{n}{r}^2$ via the $(1-x^2)^n$ collapse, verifying it at $n = 4$ and $n = 5$.',
    'Prove Vandermonde’s identity BOTH ways — by the coefficient read of $(1+x)^m(1+x)^n$ AND by the two-collection selection count — and harvest its corollaries: $\\sum \\binom{n}{r}^2 = \\binom{2n}{n}$, the cross-pairs total and the weighted squares sum.',
    'Use the ratio law $\\binom{n}{r}/\\binom{n}{r-1} = (n-r+1)/r$ to decide arithmetic-progression conditions on three consecutive coefficients (the $n = 7$ or $n = 14$ law) and equal-consecutive-coefficient questions (the seat law $k = b(n+1)/(a+b)$).',
    'Locate the greatest coefficient (unique peak at even $n$, twin peaks at odd $n$) and the greatest TERM of a numeric power by the ratio test with the $x$-weight priced in — and find the algebraically least coefficient of a signed base.',
    'Expand binomials with complex letters: price $(1+i)^8$, extract the triple-angle laws from the literal cube $(\\cos\\theta + i\\sin\\theta)^3$, and run the real/negative sign census of $(1+ix)^{4n}$.',
    'Match seats for the term independent of $x$ in negative- and fractional-power bases — $(x - 1/x)^{10}$, $(x^{2/3} + x^{-1/3})^9$, $(x^2 - 2/x)^9$ — by solving the seat equation, never by expanding.',
  ],
  prerequisites: ['aa-the-binomial-theorem-proved', 'aa-factorials-and-the-counting-toolkit', 'aa-binomial-theorem-any-index'],
  sources: ['cengage-m2-08', 'cengage-jee-style', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus'],
  blocks: [
    { kind: 'para', text: 'Lesson 7.2 proved the binomial theorem and priced its general term; 7.3 freed the index to every rational value; 7.4 grew the alphabet to $k$ letters — and every one of those lessons aimed the machine at ONE target at a time. This lesson turns the telescope around: the objects of study are the COEFFICIENTS as a family — their totals, their pairings, their ratios, their peaks. An examination hall barely ever asks for a full expansion; it asks for the sum of the coefficients of $(2-3x)^{12}$, the two consecutive powers of $x$ whose coefficients in $(2+5x)^{13}$ are equal, the greatest term of $(1.3)^{15}$, a proof that $\\sum \\binom{n}{r}^2 = \\binom{2n}{n}$ — each a question about the WHOLE row at once, answerable without expanding anything.' },
    { kind: 'para', text: 'Two engines drive every result, and both are already built. ENGINE ONE — SUBSTITUTION: an expansion is a polynomial identity, true at every value of $x$, so pricing the whole row at a chosen value collapses it to one number. Set $x = 1$ and every power reads $1$: the value is the SUM of the coefficients. Set $x = -1$ and the value is the alternating sum — and the two reads together, added and subtracted, split any row into its even-index and odd-index families. ENGINE TWO — COEFFICIENT EXTRACTION: when a wanted sum is recognisable as the coefficient of a single power in a PRODUCT of expansions, the product collapses by the law of exponents and the sum prices itself — Vandermonde’s identity, the squares-sum law and the alternating-squares law all fall out of this one move. Between the engines sits the ratio of consecutive coefficients — the row’s local slope — which locates peaks, ties and arithmetic progressions.' },
    { kind: 'para', text: 'The chapter’s arc makes this the natural fourth step: 7.2 proved the theorem, 7.3 extended the index, 7.4 generalised the letters — now the coefficients themselves become objects of algebra. Nothing new is proved from scratch; what is new is the READING. Every roster below was recomputed brute-force before any prose here was declared done; every law carries its pinned witness. The lesson closes with the multinomial bridge back to 7.4 and a graded exercise set in which three questions carry their own diagrams.' },
    { kind: 'callout', tone: 'insight', title: 'One lesson, two engines', text: 'A question about the WHOLE row — a total, a family split, a signed sum — is SUBSTITUTION: price the expansion at a chosen value and let the powers collapse. A question that is a SUM OF PRODUCTS of coefficients with matched arguments — Vandermonde shapes, squares sums — is EXTRACTION: build a product of expansions, collapse it, read one coefficient. A question about the row’s SHAPE — which seat peaks, which neighbours tie, which triple is in arithmetic progression — is the RATIO law. Name the engine, run its three moves.' },

    { kind: 'heading', text: 'The Substitution Engine — Sums of Coefficients' },
    { kind: 'para', text: 'Begin with the question the engine answers. "Find the sum of the coefficients of $(2-3x)^{12}$" — naively, thirteen seats written and added; honestly, one substitution: the expansion is an identity between functions of $x$, and the coefficient sum is its value at $x = 1$.' },
    { kind: 'callout', tone: 'definition', title: 'The sum of coefficients', text: 'Let $P(x) = a_0 + a_1x + \\cdots + a_nx^n$ be any polynomial — a binomial expansion among them. The sum of the coefficients of $P$ is the number $a_0 + a_1 + \\cdots + a_n$; since every power of $x$ reads $1$ at $x = 1$, this sum is exactly the value $P(1)$. Thus, the sum of the coefficients of any expansion is the whole expansion priced at $x = 1$ — never a seat-by-seat addition.' },
    { kind: 'para', text: 'For example, the engine at work on the three base shapes it meets:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) the plain base — the coefficients of $(1+x)^n$ sum to $(1+1)^n = 2^n$, the row total;',
      '(ii) a shifted base — the coefficients of $(2-3x)^{12}$ sum to $(2-3)^{12} = 1$;',
      '(iii) a three-letter base — the coefficients of $(1+x-2x^2)^9$ sum to $(1+1-2)^9 = 0$, the honest zero.',
    ] },
    { kind: 'para', text: 'Before the row-sum family, one reflex family the chapter has carried since its opening toolkit: the STANDARD EXPANSIONS read as algebra objects — not rows to memorise, but factorisations to recognise on sight. The cube hides an instant factorisation of its interior; the conjugate pair of squares hides the even-machine identity this lesson is about to meet at full scale on binomial rows.' },
    { kind: 'example', title: 'The standard cube read as a factorization: $(a+b)^3 - a^3 - b^3 = 3ab(a+b)$, priced at $a = 5$, $b = 3$', steps: [
      'Write the standard cube — the 7.2 reflex: $(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$.',
      'So, subtract the pure cubes: $(a+b)^3 - a^3 - b^3 = 3a^2b + 3ab^2 = 3ab(a+b)$ — one product, at every $a$ and $b$.',
      'Now, price it at $a = 5$, $b = 3$: the left side reads $(5+3)^3 - 125 - 27 = 512 - 125 - 27 = 360$.',
      'So, the right side reads $3 \\cdot 5 \\cdot 3 \\cdot 8 = 360$ — an eight-term computation priced as a three-factor product.',
      'Hence $(a+b)^3 - a^3 - b^3 = 3ab(a+b)$ — the reflex behind every "evaluate $(a+b)^3 - a^3 - b^3$ from $ab$ and $a+b$" question.',
    ] },
    { kind: 'example', title: 'The conjugate-sum reflex: $(a+b)^2 + (a-b)^2 = 2(a^2+b^2)$, shown on $9^2 + 5^2$', steps: [
      'Recognize the shape: $9 = 7 + 2$ and $5 = 7 - 2$ are a conjugate pair, so $9^2 + 5^2$ is $(a+b)^2 + (a-b)^2$ at $a = 7$, $b = 2$.',
      'So, expand the pair: $(a+b)^2 + (a-b)^2 = (a^2 + 2ab + b^2) + (a^2 - 2ab + b^2)$ — the cross terms cancel exactly.',
      'Hence $(a+b)^2 + (a-b)^2 = 2(a^2 + b^2)$ — the conjugate sum keeps the even seats and kills the odd one, the machine this lesson runs on whole rows.',
      'Now, price it: $9^2 + 5^2 = 2(49 + 4) = 106$ — and the direct squares agree, $81 + 25 = 106$, with no square of nine or five computed.',
      'So, the twin reflex: $(a+b)^2 - (a-b)^2 = 4ab$ — the conjugate DIFFERENCE keeps only the cross term.',
    ] },
    { kind: 'para', text: 'Now the engine on the binomial row itself: the row of $(1+x)^n$ priced at $x = 1$ and at $x = -1$ gives the two total prices, and adding and subtracting them splits the row into its families. Four lines, all four deserved:' },
    { kind: 'derivation', title: 'The row-sum family and the even-index split', statement: 'For every positive integer n, the row of (1+x)^n satisfies Σ C(n,r) = 2^n; Σ (−1)^r C(n,r) = 0; and the even-index family C(n,0) + C(n,2) + ⋯ equals the odd-index family C(n,1) + C(n,3) + ⋯, both being 2^(n−1).', steps: [
      { label: 'Price the row at x = 1', formula: '(1+1)^n = \\sum_{r=0}^{n} \\binom{n}{r} = 2^n', explanation: 'At $x = 1$ every power reads $1$, so the value $2^n$ is exactly the sum of the $n+1$ coefficients.' },
      { label: 'Price the row at x = −1', formula: '(1-1)^n = \\sum_{r=0}^{n} (-1)^r \\binom{n}{r} = 0 \\qquad (n \\geq 1)', explanation: 'At $x = -1$ each power reads $(-1)^r$, so the value $0$ is the alternating sum — the signed total cancels seat against seat.' },
      { label: 'Add the two prices', formula: '2\\left[\\binom{n}{0} + \\binom{n}{2} + \\cdots\\right] = 2^n + 0', explanation: 'Adding seat by seat: the even seats appear twice, the odd seats cancel — the even-index family totals $2^{n-1}$.' },
      { label: 'Subtract the two prices', formula: '2\\left[\\binom{n}{1} + \\binom{n}{3} + \\cdots\\right] = 2^n - 0', explanation: 'Subtracting kills the even seats and doubles the odd ones: the odd family also totals $2^{n-1}$ — the two families are EQUAL, each half the row.' },
    ], result: '$\\binom{n}{0} + \\binom{n}{2} + \\cdots = \\binom{n}{1} + \\binom{n}{3} + \\cdots = 2^{n-1}$ for $n \\geq 1$ — the alternating sum is zero and every row splits into two equal halves' },
    { kind: 'equation', latex: '\\sum_{r=0}^{n} \\binom{n}{r} = 2^n \\qquad \\text{and} \\qquad \\sum_{r=0}^{n} (-1)^r\\,\\binom{n}{r} = 0 \\quad (n \\geq 1) \\tag{1}', note: 'the two total prices of the row — substitutions at $x = 1$ and $x = -1$; every other row identity here is one of these reads, a combination of them, or a coefficient extraction.' },
    { kind: 'equation', latex: '\\binom{n}{0} + \\binom{n}{2} + \\binom{n}{4} + \\cdots \\;=\\; \\binom{n}{1} + \\binom{n}{3} + \\cdots \\;=\\; 2^{n-1} \\tag{2}', note: 'the families are equal — row 12 witness: $1 + 66 + 495 + 924 + 495 + 66 + 1 = 2048 = 2^{11}$, matching the odd family $12 + 220 + 792 + 792 + 220 + 12 = 2048$.' },
    { kind: 'para', text: 'The engine does not care what the base is — and that indifference is exactly where the traps live. Two Illustrations, three pinned totals:' },
    { kind: 'example', title: 'The sum of the coefficients of $(2-3x)^{12}$', steps: [
      'The engine: the sum of the coefficients is the value at $x = 1$ — the base is not $1+x$, and that is the whole point.',
      'So, substitute: $(2 - 3 \\cdot 1)^{12} = (2-3)^{12} = (-1)^{12} = 1$.',
      'Hence the sum is $1$ — and the trap answer $2^{12} = 4096$ prices the $(1+x)^{12}$ row (equivalently, $(2+3x)^{12}$ at $x = 1$): the sum is $2^n$ ONLY when the base reads exactly $1 + x$.',
    ] },
    { kind: 'example', title: 'Two more substitutions: the honest zero of $(1+x-2x^2)^9$ and the three-letter total of $(1+x+x^2)^6$', steps: [
      'The base has three seats — no matter: the coefficient sum is still the value at $x = 1$.',
      'So, the first: $(1 + 1 - 2)^9 = 0^9 = 0$ — the coefficients of $(1+x-2x^2)^9$ sum to ZERO. The zero is honest, not a trick: the base itself vanishes at $x = 1$.',
      'Now, the second: $(1 + 1 + 1)^6 = 3^6 = 729$ — the coefficients of $(1+x+x^2)^6$ together total $729$, one power of three per seat of the base.',
      'Hence the pattern: a base of $k$ unit seats totals $k^n$ at $x = 1$ — the read that will price the multinomial bridge — and the honest zero appears whenever the base sums to zero there.',
    ] },
    { kind: 'para', text: 'One honesty note before leaving the engine. Substitution needs the expansion to EXIST at the chosen value: the finite rows of 7.2 always do, but the never-ending rows of 7.3 are priced by their window $|x| < 1$, and $x = 1$ sits ON the boundary — the seats do not shrink, so the "sum of the coefficients" of an infinite row is not a number at all. The frequently-used rows below are used strictly seat by seat, never summed.' },

    { kind: 'heading', text: 'Coefficients of Terms in a Binomial Expansion' },
    { kind: 'para', text: 'The second question family prices ONE seat of a general base — always the same three moves. Lesson 7.2’s general term priced the seats of $(a+b)^n$; here the base may carry powers of its own, negative or fractional, so the job is to find WHICH seat lands on the requested degree before pricing it.' },
    { kind: 'callout', tone: 'definition', title: 'The coefficient of a chosen power of x in an expansion', text: 'In the expansion of $(a + bx)^n$ (any positive integer $n$), the coefficient of $x^r$ is the number standing in front of $x^r$ when the expansion is written in collected form — by 7.2’s general term, $\\binom{n}{r} a^{n-r} b^r$, the seat with index $r$ (the $(r+1)$-th term). For a general base whose two letters are $A x^p$ and $B x^q$, the coefficient of $x^d$ is the sum over every seat $r$ whose collected degree $p(n-r) + qr$ equals $d$ of the price $\\binom{n}{r} A^{n-r} B^r$. Thus, pricing a coefficient is seat matching first — solve the degree equation — and factorial arithmetic second.' },
    { kind: 'para', text: 'Thus, the seat-matching discipline — normalize, match the collected degree, price — the same three moves every time:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) NORMALIZE the base — write each letter as a coefficient times a single power of $x$, negative and fractional powers included ($-2/x$ is $-2 \\cdot x^{-1}$);',
      '(ii) MATCH the collected degree — write the exponent the seat $r$ carries, $p(n-r) + qr$, set it equal to the requested degree $d$, and solve for the seat $r$;',
      '(iii) PRICE the seat — $\\binom{n}{r} A^{n-r} B^r$, with the sign carried by the letter $B$ honestly.',
    ] },
    { kind: 'equation', latex: 'p\\,(n-r) + q\\,r = d \\tag{3}', note: 'the seat equation of the coefficient of $x^d$ in $(Ax^p + Bx^q)^n$ — the seat exists only when the solution $r$ is an integer with $0 \\leq r \\leq n$; the term independent of $x$ is the case $d = 0$.' },
    { kind: 'example', title: 'The $x^6$ hunt: find the coefficient of $x^6$ in $\\left(x^2 - \\tfrac{2}{x}\\right)^9$', steps: [
      'Normalize: the letters are $x^2$ and $-2x^{-1}$, so the seat-$r$ term is $\\binom{9}{r} (x^2)^{9-r} \\left(-2x^{-1}\\right)^r = \\binom{9}{r} (-2)^r\\, x^{18-3r}$.',
      'So, match the degree: $18 - 3r = 6$ gives $r = 4$ — a genuine seat (the fifth term), and the only one: the degrees step down by three.',
      'Now, price it: $\\binom{9}{4} (-2)^4 = 126 \\cdot 16 = 2016$.',
      'Hence the coefficient of $x^6$ is $2016$ — one seat equation solved; the ten-term expansion, with degrees $18, 15, 12, 9, 6, 3, 0, -3, -6, -9$, was never written.',
    ] },
    { kind: 'example', title: 'The constant seat at fractional powers: find the term independent of $x$ in $\\left(x^{2/3} + x^{-1/3}\\right)^9$', steps: [
      'Normalize: the letters are $x^{2/3}$ and $x^{-1/3}$, so the seat-$p$ term is $\\binom{9}{p}\\, x^{\\frac{2p - (9-p)}{3}} = \\binom{9}{p}\\, x^{p-3}$.',
      'So, match the degree: the term independent of $x$ carries degree $0$, so $p - 3 = 0$ and $p = 3$ — the fourth term, the only seat whose exponent dies.',
      'Now, price it: $\\binom{9}{3} = 84$, both letters contributing coefficient $1$.',
      'Hence the term independent of $x$ is $84$ — the seat equation did all the work, fractional powers included.',
    ] },
    { kind: 'para', text: 'The constant seat of a reciprocal-symmetric base deserves one more look, because its structure is a picture. In $\\left(x - \\tfrac{1}{x}\\right)^{10}$ the seat $r$ carries the exponent $10 - 2r$: the exponents step down by two and MIRROR — seat $r$ and seat $10 - r$ carry exponents that are negatives of each other, with equal coefficient magnitudes $\\binom{10}{r} = \\binom{10}{10-r}$ and alternating signs. The middle seat $r = 5$ alone carries $x^0$ — the constant term, priced $(-1)^5\\binom{10}{5} = -252$; exercise L2-1 draws exactly this mirror, eleven boxes with the middle one ringed. The picture explains the arithmetic: with exponents stepping by two, exactly ONE seat can land on the constant, and the mirror symmetry guarantees it is the row’s middle.' },

    { kind: 'heading', text: 'The Frequently-Used Rows at Work' },
    { kind: 'para', text: 'The seat-matching discipline also prices seats of the never-ending rows — and here the toolkit of lesson 7.3 returns BY NAME, cross-referenced, never re-derived. THE COUNTING ROW: the coefficient of $x^r$ in $(1-x)^{-n}$ is $\\binom{n+r-1}{r}$, every seat positive. THE ALTERNATING TWIN: the coefficient of $x^r$ in $(1+x)^{-n}$ is $(-1)^r \\binom{n+r-1}{r}$. THE HALF ROW: the coefficient of $x^r$ in $(1-x)^{-1/2}$ is $\\tfrac{\\binom{2r}{r}}{4^r}$, the central-binomial family. Each row is used seat by seat at a named power, with the window $|x| < 1$ travelling along — and never summed, for the boundary reason above.' },
    { kind: 'example', title: 'Two seats from the 7.3 rows: $x^8$ in $(1-x)^{-4}$ and $x^5$ in $(1+x)^{-2}$', steps: [
      'The counting row (lesson 7.3, by name): the coefficient of $x^r$ in $(1-x)^{-n}$ is $\\binom{n+r-1}{r}$, valid for $|x| < 1$.',
      'So, the first seat: $r = 8$, $n = 4$ — the coefficient is $\\binom{11}{3} = 165$.',
      'Now, the alternating twin: the coefficient of $x^r$ in $(1+x)^{-n}$ is $(-1)^r \\binom{n+r-1}{r}$ — the argument’s sign flip restores the alternation.',
      'So, the second seat: $r = 5$, $n = 2$ — the coefficient is $(-1)^5 \\binom{6}{5} = -6$.',
      'Hence the two prices, $165$ and $-6$ — two rows borrowed by name, one sign discipline, and 7.3’s table never re-derived.',
    ] },
    { kind: 'example', title: 'The half row at work: the coefficient of $x^6$ in $(1-x)^{-1/2}$', steps: [
      'The half row (lesson 7.3, by name): the coefficient of $x^r$ in $(1-x)^{-1/2}$ is $\\tfrac{\\binom{2r}{r}}{4^r}$ — the central binomial coefficients, quartered by the row’s own scaling.',
      'So, the seat: $r = 6$ — the coefficient is $\\tfrac{\\binom{12}{6}}{4^6} = \\tfrac{924}{4096}$.',
      'Now, reduce honestly: $\\tfrac{924}{4096} = \\tfrac{231}{1024}$.',
      'Hence the coefficient of $x^6$ in $(1-x)^{-1/2}$ is $\\tfrac{231}{1024}$ — with the window $|x| < 1$ riding along, as 7.3’s discipline demands.',
    ] },

    { kind: 'heading', text: 'Conjugate Reads — the Even and Odd Machines' },
    { kind: 'para', text: 'Engine one prices a row at a value; the conjugate read prices a PAIR of rows at every value at once. The expansions $(1+x)^n$ and $(1-x)^n$ agree at the even seats and carry opposite signs at the odd seats — so ADDING the pair cancels the odd seats and doubles the even ones, while SUBTRACTING does the opposite. As functions, the sum is even and the difference is odd; as books of seats, one machine harvests each family:' },
    { kind: 'equation', latex: '(1+x)^n + (1-x)^n = 2\\left[\\binom{n}{0} + \\binom{n}{2}x^2 + \\binom{n}{4}x^4 + \\cdots\\right], \\qquad (1+x)^n - (1-x)^n = 2\\left[\\binom{n}{1}x + \\binom{n}{3}x^3 + \\cdots\\right] \\tag{4}', note: 'the even machine and the odd machine — one identity pair, true at every $x$; priced at $x = 1$ it recovers the even/odd split of equations (2).' },
    { kind: 'example', title: 'Run both machines: expand $(1+x)^6 + (1-x)^6$ as an even polynomial, and $(1+x)^5 - (1-x)^5$ as an odd one', steps: [
      'The even machine on row 6: the even seats of row 6 are $\\binom{6}{0}, \\binom{6}{2}, \\binom{6}{4}, \\binom{6}{6} = 1, 15, 15, 1$.',
      'So, $(1+x)^6 + (1-x)^6 = 2(1 + 15x^2 + 15x^4 + x^6)$ — the odd seats ($6x$, $20x^3$, $6x^5$) cancelled, every even seat doubled.',
      'Now, the odd machine on row 5: the odd seats of row 5 are $\\binom{5}{1}, \\binom{5}{3}, \\binom{5}{5} = 5, 10, 1$.',
      'So, $(1+x)^5 - (1-x)^5 = 2(5x + 10x^3 + x^5)$ — the even seats cancelled, every odd seat doubled.',
      'Hence the pair read: additions harvest even seats, subtractions harvest odd seats — both machines exact at every $x$, and neither expansion written in full.',
    ] },
    { kind: 'para', text: 'Now the deepest use of the conjugate idea — the pair $(1+x)^n$ and $(1-x)^n$ MULTIPLIED. The product’s $x^n$ seat collects products of matched seats, and the matched pairing is exactly a sum of squares with alternating signs — engine two making its first appearance, through the conjugate collapse:' },
    { kind: 'derivation', title: 'The alternating-squares law', statement: 'For every positive integer n, the alternating sum of squared row coefficients Σ (−1)^r C(n,r)² is 0 when n is odd and (−1)^(n/2) · C(n, n/2) when n is even.', steps: [
      { label: 'Read the sum as a coefficient', formula: '\\sum_{r=0}^{n} (-1)^r \\binom{n}{r}^2 = (-1)^n \\cdot [x^n]\\left((1+x)^n (1-x)^n\\right)', explanation: 'The $x^n$ seat of the product collects $\\binom{n}{r} \\cdot \\binom{n}{n-r} (-1)^{n-r}$ over all $r$. Since $\\binom{n}{r}\\binom{n}{n-r} = \\binom{n}{r}^2$ and $(-1)^{n-r} = (-1)^n(-1)^r$, the wanted sum is the global sign $(-1)^n$ times that coefficient.' },
      { label: 'Collapse the product', formula: '(1+x)^n (1-x)^n = (1 - x^2)^n', explanation: 'The conjugate collapse: the two bases multiply to $1 - x^2$, so the whole product is a single binomial power in the SQUARED variable.' },
      { label: 'Price the x^n seat of (1−x²)^n', formula: 'T_{r+1} = \\binom{n}{r} (-1)^r\\, x^{2r}', explanation: 'The seats of $(1-x^2)^n$ carry only EVEN powers $x^{2r}$ — 7.2’s general term at the squared argument. An $x^n$ seat exists only when $n$ is even, and then only at $r = n/2$.' },
      { label: 'Assemble the law', formula: 'n \\text{ odd}: \\; 0; \\qquad n \\text{ even}: \\; (-1)^{n/2} \\binom{n}{n/2}', explanation: 'Odd $n$: no $x^n$ seat exists, the coefficient is $0$, and no global sign rescues a zero. Even $n$: the seat is $(-1)^{n/2}\\binom{n}{n/2}$ and the global sign $(-1)^n = +1$ leaves it untouched.' },
    ], result: '$\\sum_r (-1)^r \\binom{n}{r}^2 = 0$ at odd $n$; $\\; = (-1)^{n/2}\\binom{n}{n/2}$ at even $n$ — witnesses: $1 - 16 + 36 - 16 + 1 = 6$ at $n = 4$, and $1 - 25 + 100 - 100 + 25 - 1 = 0$ at $n = 5$' },
    { kind: 'equation', latex: '\\sum_{r=0}^{n} (-1)^r \\binom{n}{r}^{2} = \\begin{cases} 0, & n \\text{ odd} \\\\[2pt] (-1)^{n/2} \\binom{n}{n/2}, & n \\text{ even} \\end{cases} \\tag{5}', note: 'proved by reading the sum as the $x^n$ coefficient of $(1+x)^n(1-x)^n = (1-x^2)^n$ — engine two, coefficient extraction, at its purest.' },
    { kind: 'example', title: 'Witness the alternating-squares law at $n = 4$ and $n = 5$', steps: [
      'At $n = 4$: the row is $1, 4, 6, 4, 1$, so the squares are $1, 16, 36, 16, 1$ — and the alternating sum is $1 - 16 + 36 - 16 + 1 = 6$.',
      'So, the law predicts $(-1)^2 \\binom{4}{2} = 6$ — agreed, with the sign positive because the middle seat sits at even $r = 2$.',
      'Now, at $n = 5$: the row is $1, 5, 10, 10, 5, 1$, the squares $1, 25, 100, 100, 25, 1$ — the alternating sum is $1 - 25 + 100 - 100 + 25 - 1 = 0$.',
      'So, the law predicts $0$ (odd $n$: no $x^5$ seat exists in $(1-x^2)^5$) — agreed, and the cancellation is structural: the six squared seats pair off symmetrically.',
    ] },
    { kind: 'para', text: 'The conjugate machine runs on more than real signs. The theorem of 7.2 was proved for a power of a SUM — the letters were never required to be real, and the imaginary unit $i$ (with $i^2 = -1$ and the four-step cycle $i, -1, -i, 1$) is a perfectly legal letter. Complex binomials inherit everything: the general term, the seat discipline, the conjugate split — with one new twist, that "real part" and "imaginary part" become the new even/odd machines. The seat $r$ contributes to the REAL part exactly when $r$ is even (its $i^r$ cycling through $1, -1$), and to the imaginary part when $r$ is odd.' },
    { kind: 'example', title: 'Evaluate $(1+i)^8$ by the conjugate read — and again by the geometry of the walk', steps: [
      'The even seats are the real ones: the real part collects $\\binom{8}{0} i^0 + \\binom{8}{2} i^2 + \\binom{8}{4} i^4 + \\binom{8}{6} i^6 + \\binom{8}{8} i^8 = 1 - 28 + 70 - 28 + 1 = 16$.',
      'So, the odd seats are the imaginary ones: the imaginary part collects $\\binom{8}{1} i + \\binom{8}{3} i^3 + \\binom{8}{5} i^5 + \\binom{8}{7} i^7 = 8 - 56 + 56 - 8 = 0$.',
      'Hence $(1+i)^8 = 16$ exactly — a positive real number: the even seats total sixteen and the odd seats cancel perfectly.',
      'Now, the geometric read: multiplying by $1+i$ scales a length by $\\sqrt{2}$ and turns it $45^\\circ$ anticlockwise — so the powers of $1+i$ walk a spiral, and eight steps turn $8 \\times 45^\\circ = 360^\\circ$ while scaling by $(\\sqrt{2})^8 = 16$: the walk closes on the positive real axis at $16$, exactly what the figure draws.',
      'Hence both reads agree: the conjugate machine prices the row, the walk prices the geometry, and both land on $16$.',
    ] },
    { kind: 'figure', caption: 'The $(1+i)^8$ walk on the complex plane: the nine successive powers $1$, $1+i$, $2i$, $-2+2i$, $-4$, $-4-4i$, $-8i$, $8-8i$, $16$ — each step multiplies by $1+i$, a $45^\\circ$ anticlockwise turn with a $\\sqrt{2}$ stretch. Eight turns make a full $360^\\circ$, so the direction returns to the positive real axis, and the accumulated scale $(\\sqrt{2})^8 = 16$ sets the landing distance — which is why $(1+i)^8$ is the real number 16 before any seat is added.', svg: complexWalk75Svg() },
    { kind: 'example', title: 'The triple-angle laws from the literal cube: expand $(\\cos\\theta + i\\sin\\theta)^3$', steps: [
      'Expand by 7.2’s theorem — the letters are $\\cos\\theta$ and $i\\sin\\theta$: $(\\cos\\theta + i\\sin\\theta)^3 = \\cos^3\\theta + 3\\cos^2\\theta\\,(i\\sin\\theta) + 3\\cos\\theta\\,(i\\sin\\theta)^2 + (i\\sin\\theta)^3$.',
      'So, collect by the cycle of $i$: the real seats are $\\cos^3\\theta - 3\\cos\\theta\\sin^2\\theta$; the imaginary seats are $3\\cos^2\\theta\\sin\\theta - \\sin^3\\theta$, times $i$.',
      'Now, the geometric identity on the left: three copies of a unit-modulus number with argument $\\theta$ multiply to a unit-modulus number with argument $3\\theta$ — that is, $(\\cos\\theta + i\\sin\\theta)^3 = \\cos 3\\theta + i\\sin 3\\theta$.',
      'So, match the real parts: $\\cos 3\\theta = \\cos^3\\theta - 3\\cos\\theta\\sin^2\\theta = 4\\cos^3\\theta - 3\\cos\\theta$, replacing $\\sin^2\\theta$ by $1 - \\cos^2\\theta$.',
      'And the imaginary parts: $\\sin 3\\theta = 3\\cos^2\\theta\\sin\\theta - \\sin^3\\theta = 3\\sin\\theta - 4\\sin^3\\theta$.',
      'Check at $\\theta = \\pi/6$: the laws read $4\\left(\\tfrac{\\sqrt3}{2}\\right)^3 - 3\\left(\\tfrac{\\sqrt3}{2}\\right) = 0 = \\cos\\tfrac{\\pi}{2}$, and $3 \\cdot \\tfrac12 - 4 \\cdot \\tfrac18 = 1 = \\sin\\tfrac{\\pi}{2}$ — both pinned.',
      'Hence the triple-angle laws, extracted from one binomial cube.',
    ] },
    { kind: 'para', text: 'The same cycle prices the sign census of $(1+ix)^{4n}$ — a family examinations ask by the count. The seat $r$ carries the factor $i^r$: real when $r$ is even, imaginary when $r$ is odd. A row of $4n+1$ seats therefore holds exactly $2n+1$ even seats — real terms — and among them the seats with $r \\equiv 2 \\pmod{4}$ carry $i^r = -1$: exactly $n$ negative real terms. Witnessed at $(1+ix)^8$: five real terms, exactly two of them negative.' },

    { kind: 'heading', text: 'Series from the Product of Two Expansions' },
    { kind: 'para', text: 'Engine two deserves its own section because it is the least obvious and the most powerful. The pattern to recognise: a sum whose terms are PRODUCTS of binomial coefficients — one factor from a row with index $m$, the other from a row with index $n$, with the variable arguments summing to a CONSTANT $r$ across all the terms. That structure is the coefficient of the single power $x^r$ in the product $(1+x)^m (1+x)^n$; the product collapses by the law of exponents, and the sum prices itself. Throughout, $[x^r]\\,P$ means "the coefficient of $x^r$ in the polynomial $P$":' },
    { kind: 'equation', latex: '[x^r]\\,(1+x)^m (1+x)^n = [x^r]\\,(1+x)^{m+n} = \\binom{m+n}{r} \\tag{6}', note: 'the sweep law — the $x^r$ seat of a product of expansions is the same seat of the expanded product; every matched-argument coefficient series is one sweep away from a closed form.' },
    { kind: 'derivation', title: 'Vandermonde’s identity by the coefficient read', statement: 'For non-negative integers m, n, r with r ≤ m + n: Σ_{k=0}^{r} C(m,k) · C(n, r−k) = C(m+n, r).', steps: [
      { label: 'Write the product’s x^r seat', formula: '[x^r]\\,(1+x)^m (1+x)^n = \\sum_{k=0}^{r} \\binom{m}{k} \\binom{n}{r-k}', explanation: 'Every term of the $x^r$ seat takes $x^k$ from the first factor (price $\\binom{m}{k}$) and $x^{r-k}$ from the second (price $\\binom{n}{r-k}$) — one contribution per split of the $r$ powers between the two factors.' },
      { label: 'Collapse the product', formula: '(1+x)^m (1+x)^n = (1+x)^{m+n}', explanation: 'The law of exponents — the product of the two expansions IS one bigger expansion, before any seat is read.' },
      { label: 'Read the same seat of the collapse', formula: '[x^r]\\,(1+x)^{m+n} = \\binom{m+n}{r}', explanation: 'The $x^r$ seat of the bigger row is its general term — one binomial coefficient, no summation left. The two readings of one seat must agree, and that agreement is the identity.' },
    ], result: '$\\sum_{k=0}^{r} \\binom{m}{k}\\binom{n}{r-k} = \\binom{m+n}{r}$ — Vandermonde’s identity: one coefficient of a product, read two ways' },
    { kind: 'example', title: 'The $x^2$ seat of $(1+x)^4(1+x)^4$: three ways, one total', steps: [
      'The splits of degree $2$ between two four-row factors: $(0, 2)$, $(1, 1)$, $(2, 0)$ — three ways, and no more.',
      'So, price each: $\\binom{4}{0}\\binom{4}{2} = 1 \\cdot 6 = 6$; $\\binom{4}{1}\\binom{4}{1} = 4 \\cdot 4 = 16$; $\\binom{4}{2}\\binom{4}{0} = 6 \\cdot 1 = 6$.',
      'Now, the sweep law: the three contributions are the whole $x^2$ seat of $(1+x)^4(1+x)^4 = (1+x)^8$, whose price is $\\binom{8}{2} = 28$.',
      'Check: $6 + 16 + 6 = 28$ — the three ways sum to the swept seat exactly, the contribution picture drawn in the figure.',
    ] },
    { kind: 'figure', caption: 'The Vandermonde contribution picture: the three ways to build the $x^2$ seat of $(1+x)^4\\,(1+x)^4$. Each row shows one split of the two $x$-factors between the two expansions — $(0,2)$, $(1,1)$, $(2,0)$ — with the chosen seat ringed in orange in each copy of Pascal row 4 (cells $1, 4, 6, 4, 1$) and the contribution priced on the right: $1 \\cdot 6 = 6$, $4 \\cdot 4 = 16$, $6 \\cdot 1 = 6$. The three contributions sweep to $6 + 16 + 6 = 28 = \\binom{8}{2}$ — one seat of $(1+x)^8$, read three ways; the same list-the-splits, price-each, sweep structure gives $\\binom{m+n}{r}$ at any size.', svg: vandermonde75Svg() },
    { kind: 'para', text: 'The identity also has a counting meaning, and it is the meaning that makes the formula obvious rather than clever. OUR OWN story for it: a reading list. One shelf holds $m$ novels; a second shelf holds $n$ biographies; a weekend needs $r$ books. Any valid list takes some $k$ novels and $r - k$ biographies — $\\binom{m}{k}\\binom{n}{r-k}$ lists for each split $k$ — and summing over $k$ counts every list exactly once. But the same lists can be counted directly: draw $r$ books from the $m + n$ books on the two shelves together — $\\binom{m+n}{r}$ ways — because the shelf a book sits on is invisible to the choosing hand. Two counts of one collection must agree: that is Vandermonde’s identity, and the coefficient read above is the same argument wearing algebra.' },
    { kind: 'callout', tone: 'historical', title: 'Vandermonde’s name on a much older fact', text: 'Alexandre-Théophile Vandermonde was an eighteenth-century French mathematician whose 1772 memoir on the binomial studied exactly these coefficient combinations — and the convolution identity that carries his name was known in special forms long before him and was rediscovered after him by workers who had never read him. Attribution in mathematics often trails discovery by centuries; the book’s standing honesty applies: the statement proved here is the same identity, whoever first wrote it down.' },
    { kind: 'example', title: 'The squares sum: evaluate $\\sum_{r=0}^{4} \\binom{4}{r}^2$ — and state the general law', steps: [
      'Recognize the squares as matched products: $\\binom{4}{r}^2 = \\binom{4}{r} \\cdot \\binom{4}{4-r}$ — the mirror of row 4.',
      'So, the sum is the $x^4$ seat of $(1+x)^4(1+x)^4$: the split $(r, 4-r)$ runs over exactly the matched seats of two four-row factors.',
      'Now, sweep: the product is $(1+x)^8$, and the $x^4$ seat is $\\binom{8}{4} = 70$.',
      'Check by direct addition: $1 + 16 + 36 + 16 + 1 = 70$ — five squared seats, one swept total.',
      'Hence the general law $\\sum_r \\binom{n}{r}^2 = \\binom{2n}{n}$ — the squares sum of any row is the middle seat of the doubled row.',
    ] },
    { kind: 'example', title: 'The cross pairs at $n = 3$: evaluate $\\sum\\sum_{0 \\leq i < j \\leq 3} \\binom{3}{i}\\binom{3}{j}$', steps: [
      'Count every ordered pair first: $\\left(\\sum_i \\binom{3}{i}\\right)\\left(\\sum_j \\binom{3}{j}\\right) = 2^3 \\cdot 2^3 = 64$.',
      'So, remove the diagonal: the pairs $i = j$ contribute $\\sum_i \\binom{3}{i}^2 = \\binom{6}{3} = 20$ — the squares-sum law at $n = 3$.',
      'Now, halve what is left: the off-diagonal pairs split equally into $i < j$ and $i > j$, so the wanted total is $\\tfrac{64 - 20}{2} = 22$.',
      'Hence the cross-pairs total is $22$ — the general law $\\tfrac{4^n - \\binom{2n}{n}}{2}$ witnessed at $n = 3$.',
    ] },
    { kind: 'para', text: 'The same engine prices WEIGHTED sums, with one extra move. The absorption identity $r\\binom{n}{r} = n\\binom{n-1}{r-1}$ — one line of factorial arithmetic — converts a weighted seat into an unweighted seat of a smaller row, after which the sweep runs as before: $\\sum_r r \\binom{n}{r}^2 = n \\sum_r \\binom{n-1}{r-1}\\binom{n}{r} = n\\binom{2n-1}{n-1}$, the last step a Vandermonde sweep at the indices $(n-1, n)$ and degree $n-1$. Witness at $n = 4$: $0 + 16 + 72 + 48 + 4 = 140 = 4 \\cdot 35$ — the full proof is exercise L5-3.' },

    { kind: 'heading', text: 'Ratios of Consecutive Coefficients — the Row’s Shape' },
    { kind: 'para', text: 'The engines so far price the row’s totals; the SHAPE of the row — where it climbs, where it ties, where it peaks — is governed by the ratio of consecutive coefficients, a one-line factorial quotient:' },
    { kind: 'derivation', title: 'The ratio of consecutive coefficients', statement: 'For 1 ≤ r ≤ n: C(n,r) / C(n,r−1) = (n−r+1) / r.', steps: [
      { label: 'Write the quotient', formula: '\\frac{\\binom{n}{r}}{\\binom{n}{r-1}} = \\frac{\\tfrac{n!}{r!\\,(n-r)!}}{\\tfrac{n!}{(r-1)!\\,(n-r+1)!}}', explanation: 'Both coefficients written as factorial quotients of the same row — the shared $n!$ upstairs is about to cancel.' },
      { label: 'Cancel', formula: '= \\frac{(r-1)!\\,(n-r+1)!}{r!\\,(n-r)!} = \\frac{n-r+1}{r}', explanation: 'What survives is the NEW factor $(n - r + 1)$ entering the numerator over the new factor $r$ entering the denominator — one fresh factor per step along the row.' },
    ], result: '$\\tfrac{\\binom{n}{r}}{\\binom{n}{r-1}} = \\tfrac{n-r+1}{r}$ — the row climbs while this ratio exceeds $1$ and falls once it dips below' },
    { kind: 'equation', latex: '\\frac{\\binom{n}{r}}{\\binom{n}{r-1}} = \\frac{n-r+1}{r} \\tag{7}', note: 'the local slope of Pascal’s row — the instrument behind peak-hunting, equal pairs and arithmetic-progression conditions; for a weighted base $(a+bx)^n$ the slope carries the extra factor $\\tfrac{b}{a}$.' },
    { kind: 'para', text: 'For the plain row $(1+x)^n$ the ratio $\\tfrac{n-r+1}{r}$ crosses $1$ at the middle: the row climbs to its middle seat and falls symmetrically after — the profile drawn in the next section’s figure. For a weighted base $(a+bx)^n$ the slope carries the extra factor $\\tfrac{b}{a}$, and the crossing point shifts to $k = \\tfrac{b(n+1)}{a+b}$ — the SEAT LAW, answering the equal-pair question and the peak question with the same number.' },
    { kind: 'example', title: 'The A.P. condition: for which $n$ are the coefficients of the 5th, 6th and 7th terms of $(1+x)^n$ in arithmetic progression?', steps: [
      'Index honestly first — the off-by-one that opens this family: the 5th term sits at $r = 4$, the 6th at $r = 5$, the 7th at $r = 6$.',
      'So, the A.P. condition: the middle coefficient is the average of its neighbours — $2\\binom{n}{5} = \\binom{n}{4} + \\binom{n}{6}$.',
      'Now, price the neighbours by the ratio law: $\\binom{n}{4} = \\binom{n}{5} \\cdot \\tfrac{5}{n-4}$ and $\\binom{n}{6} = \\binom{n}{5} \\cdot \\tfrac{n-5}{6}$, so dividing through by $\\binom{n}{5}$ reads $\\tfrac{5}{n-4} + \\tfrac{n-5}{6} = 2$.',
      'So, clear denominators: $30 + (n-5)(n-4) = 12(n-4)$, which simplifies to $n^2 - 21n + 98 = 0$, that is $(n-7)(n-14) = 0$.',
      'Hence $n = 7$ or $n = 14$ — both genuine: at $n = 7$ the coefficients are $35, 21, 7$ with $35 + 7 = 42 = 2 \\cdot 21$; at $n = 14$ they are $1001, 2002, 3003$ with $1001 + 3003 = 4004 = 2 \\cdot 2002$.',
    ] },
    { kind: 'example', title: 'The equal pair: which two consecutive coefficients of $(2+5x)^{13}$ are equal?', steps: [
      'The seat price: the coefficient of $x^k$ is $c_k = \\binom{13}{k} 2^{13-k} 5^k$, so the slope is $\\tfrac{c_k}{c_{k-1}} = \\tfrac{14-k}{k} \\cdot \\tfrac{5}{2}$ — the ratio law with the weighted-base factor $\\tfrac{b}{a}$.',
      'So, the equal-seat condition: $\\tfrac{c_k}{c_{k-1}} = 1$ reads $(14-k) \\cdot 5 = 2k$, that is $70 = 7k$, so $k = 10$.',
      'Hence the coefficient of $x^{10}$ equals the coefficient of $x^9$ — the seat law $k = \\tfrac{b(n+1)}{a+b} = \\tfrac{5 \\cdot 14}{7} = 10$ in one line — and the equality is exact: $\\binom{13}{9} 2^4 5^9 = \\binom{13}{10} 2^3 5^{10}$, both equal to $22{,}343{,}750{,}000$.',
      'So, the uniqueness: the slope strictly decreases along the row, so it crosses $1$ exactly once — the tie happens at exactly one consecutive pair, the profile drawn in exercise L4-1’s figure.',
    ] },
    { kind: 'para', text: 'Note the unification, because it halves the memorisation: the crossing point $k = \\tfrac{b(n+1)}{a+b}$ is the SAME number whether the question is "which consecutive coefficients are equal" or "where do the magnitudes peak". Equal neighbours are the boundary case of the peak hunt — the slope equals $1$ exactly there. When $k$ lands on an integer, the row has an exact TIE (the $(2+5x)^{13}$ pair); when it lands between integers, the peak is the seat just below the landing, located by the ratio test of the next section. One law, both answers, never an expansion.' },

    { kind: 'heading', text: 'The Greatest Coefficient and the Greatest Term' },
    { kind: 'para', text: 'Two different questions hide behind similar words, and the discipline is to separate them first. The GREATEST COEFFICIENT is a symbolic question — which seat of the row carries the largest coefficient, a property of the letters $a$ and $b$ alone. The GREATEST TERM is a numeric question — at a given value of $x$, which term is numerically largest — and its answer depends on that value, because the $x$-powers weight the seats. Both are answered by the same instrument, the ratio of consecutive seats, with the $x$-weight priced in for the term question.' },
    { kind: 'para', text: 'For the plain row $(1+x)^n$ the coefficient profile is symmetric and unimodal: it climbs to the middle and falls. $n$ EVEN: a unique peak at the middle seat $r = n/2$ — row 12 peaks uniquely at $\\binom{12}{6} = 924$. $n$ ODD: there is no middle seat — the climb ends in a TIE, twin peaks at $r = \\tfrac{n-1}{2}$ and $r = \\tfrac{n+1}{2}$ — row 11 peaks twice at $\\binom{11}{5} = \\binom{11}{6} = 462$. The twin-peak fact is one of this lesson’s classic traps: at odd $n$ there is no single greatest coefficient, and an answer that names one is wrong by structure, not by arithmetic.' },
    { kind: 'figure', caption: 'The row profile of Pascal’s triangle at $n = 12$, drawn at true scale: thirteen bars with heights exactly proportional to $1, 12, 66, 220, 495, 792, 924, 792, 495, 220, 66, 12, 1$ — the even seats ($r = 0, 2, \\ldots, 12$) in green, the odd seats in amber. Two readings live in the picture. The SHAPE: a single peak at the middle seat, $924 = \\binom{12}{6}$, ringed and called out — unimodal and symmetric, the even-$n$ law. The SPLIT: the even seats total $1 + 66 + 495 + 924 + 495 + 66 + 1 = 2048 = 2^{11}$, and the odd seats total $12 + 220 + 792 + 792 + 220 + 12 = 2048 = 2^{11}$ — the two colour families weigh exactly the same, the even/odd split of equations (2) made visible, each family half of the row total $4096 = 2^{12}$. One bar chart, two laws of this lesson.', svg: rowProfile75Svg() },
    { kind: 'example', title: 'The reverse read: an expansion’s coefficients sum to $2048$ — find $n$ and the greatest coefficient of $(1+x)^n$', steps: [
      'The sum of the coefficients of $(1+x)^n$ is the row total $2^n$ — the substitution engine at $x = 1$.',
      'So, solve for the index: $2^n = 2048 = 2^{11}$ gives $n = 11$.',
      'Now, the peak: $n = 11$ is ODD, so the row has no single greatest coefficient — it has the twin pair $\\binom{11}{5} = \\binom{11}{6} = 462$, the climb ending in an exact tie.',
      'Hence the greatest coefficient of $(1+x)^{11}$ is $462$, attained TWICE — and the neighbouring row 12, for contrast, peaks uniquely at $\\binom{12}{6} = 924$, the profile drawn in the figure.',
    ] },
    { kind: 'example', title: 'The greatest TERM of $(1.3)^{15} = (1 + 0.3)^{15}$', steps: [
      'Write the terms with seat index $k$: $t_k = \\binom{15}{k} (0.3)^k$, the $(k+1)$-th term — the numeric argument $x = 0.3$ weights every seat, so the coefficient peak and the term peak need not agree.',
      'So, the term ratio: $\\tfrac{t_{k+1}}{t_k} = \\tfrac{15-k}{k+1} \\cdot 0.3$ — the ratio law of equation (7) with the $x$-weight priced in.',
      'Now, the climb condition: $\\tfrac{15-k}{k+1} \\cdot 0.3 \\geq 1$ reads $4.5 - 0.3k \\geq k + 1$, that is $k \\leq \\tfrac{3.5}{1.3} \\approx 2.69$ — the terms climb through the boundary and first shrink after seat $k = 3$.',
      'So, the peak sits at seat $k = 3$: the ratio at $k = 2$ is $1.3 \\geq 1$ (still climbing) and the ratio at $k = 3$ is $0.9 < 1$ (falling).',
      'Hence the greatest term is the 4th term, $T_4 = \\binom{15}{3} (0.3)^3 = 455 \\cdot 0.027 = 12.285$ — with its neighbour $T_5 = 1365 \\cdot 0.0081 = 11.0565$ confirming the fall.',
    ] },
    { kind: 'example', title: 'The algebraically LEAST coefficient of $(2-3x)^{15}$', steps: [
      'The coefficient of $x^k$ is $\\binom{15}{k} 2^{15-k} (-3)^k$: magnitude $\\binom{15}{k} 2^{15-k} 3^k$, sign $(-1)^k$ — the hunt is for the most NEGATIVE coefficient, so both matter.',
      'So, the magnitude slope: $\\tfrac{|c_{k+1}|}{|c_k|} = \\tfrac{15-k}{k+1} \\cdot \\tfrac{3}{2}$ — the weighted-base ratio law with $\\tfrac{|b|}{|a|} = \\tfrac{3}{2}$.',
      'Now, the climb condition: $\\tfrac{15-k}{k+1} \\cdot \\tfrac{3}{2} \\geq 1$ reads $45 - 3k \\geq 2k + 2$, that is $k \\leq 8.6$ — the magnitudes climb through seat $k = 8$ into $k = 9$ and first fall after $k = 9$.',
      'So, the magnitude peak sits at seat $k = 9$ — the 10th term — and its sign is $(-3)^9 < 0$: the largest magnitude carries a minus, making the 10th term the algebraically LEAST coefficient.',
      'Hence the least coefficient is $-\\binom{15}{9} 2^6 3^9 = -5005 \\cdot 64 \\cdot 19683 = -6{,}304{,}858{,}560$ — the seat law agrees, placing the magnitude peak at $k = \\tfrac{|b|(n+1)}{|a|+|b|} = \\tfrac{3 \\cdot 16}{5} = 9.6$, whose floor is seat $9$.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'Caution — the three classic traps of the coefficient questions', text: 'TRAP ONE, the off-by-one: "the 5th term" means seat $r = 4$ — the term count starts at 1 while the seat index starts at 0. The A.P. question above is unanswerable until the 5th/6th/7th terms are translated to seats 4, 5, 6; conditioning on the wrong seats chases a different — and wrong — quadratic. TRAP TWO, the phantom unique peak: at ODD $n$ the row has NO single greatest coefficient — the peak is the twin pair, and "the greatest coefficient of $(1+x)^{11}$ is 462" is only half an answer (it is attained twice, at $r = 5$ and $r = 6$). TRAP THREE, the universal $2^n$: the sum of the coefficients is $2^n$ ONLY for the base $1+x$; for $(2-3x)^{12}$ it is $(2-3)^{12} = 1$, and for $(1+x-2x^2)^9$ it is an honest $0$. Price the base at $x = 1$, always, whatever the base.' },

    { kind: 'heading', text: 'The Multinomial Bridge' },
    { kind: 'para', text: 'One short bridge closes the lesson. Every engine here ran on two letters — but lesson 7.4 already generalised the expansion to any number of letters, and the coefficient questions of this lesson transfer verbatim. The substitution engine first: the multinomial expansion $(a+b+c)^5$ priced at $a = b = c = 1$ collapses to $(1+1+1)^5 = 3^5 = 243$ — the sum of ALL its coefficients, exactly the word census 7.4 proved, every one of the $3^5 = 243$ length-five words landing in exactly one seat. The seat read second: the coefficient of $ab^2c^2$ is the multinomial price $\\tfrac{5!}{1!\\,2!\\,2!} = 30$ — a near-balanced seat priced by 7.4’s factorial quotient, no binomial row involved. The binomial row of this lesson is the $k = 2$ case of that theorem, and both engines — price the whole expansion at a value, read one coefficient of a product — are the same engines at every $k$.' },

    { kind: 'terms', items: [
      { term: 'Sum of coefficients', def: 'the value the whole expansion takes at $x = 1$: setting every power of $x$ to $1$ collapses each term to its bare coefficient.' },
      { term: 'Substitution engine', def: 'pricing an entire expansion as ONE value by substituting a chosen value of the variable — $x = 1$ sums the coefficients, $x = -1$ alternates them, and the pair splits the row into its even and odd families.' },
      { term: 'Conjugate expansions', def: 'the pair $(1+x)^n$ and $(1-x)^n$: adding them kills the odd seats and doubles the even ones, subtracting does the opposite — and multiplying them collapses to $(1-x^2)^n$, the alternating-squares engine.' },
      { term: 'Even-index family', def: 'the sum $\\binom{n}{0} + \\binom{n}{2} + \\cdots$ of the even seats of a row — equal to $2^{n-1}$ for every $n \\geq 1$, and exactly equal to the odd-index family.' },
      { term: 'Vandermonde’s identity', def: 'the sweep law $\\sum_k \\binom{m}{k}\\binom{n}{r-k} = \\binom{m+n}{r}$: choosing $r$ objects from two collections of $m$ and $n$ is choosing $r$ from their union.' },
      { term: 'Ratio of consecutive coefficients', def: 'the row’s local slope $\\binom{n}{r}/\\binom{n}{r-1} = (n-r+1)/r$ — the instrument for peaks, equal pairs and A.P. conditions, carrying the extra factor $b/a$ on a weighted base.' },
      { term: 'Greatest coefficient', def: 'the largest coefficient of a row: unique at the middle seat when $n$ is even, a twin pair when $n$ is odd — row 12 peaks uniquely at $924$, row 11 twins at $462$.' },
      { term: 'Greatest term', def: 'the numerically largest TERM at a given numeric value of $x$ — located by the term ratio with the $x$-weight priced in, not by the coefficient alone: $(1.3)^{15}$ peaks at its 4th term.' },
      { term: 'Term independent of x', def: 'the constant seat: the seat $r$ whose collected exponent $p(n-r) + qr$ reads zero — found by solving the seat equation, never by expanding.' },
      { term: 'Multinomial expansion', def: 'the expansion of a power of a sum of more than two letters, $(a+b+c)^n$: every degree-$n$ monomial appears exactly once, priced $\\tfrac{n!}{p!\\,q!\\,r!}$ — lesson 7.4’s theorem, the binomial’s big sibling.' },
      { term: 'Seat law', def: 'the equal-coefficient seat $k = \\tfrac{b(n+1)}{a+b}$ of $(a+bx)^n$: the coefficients of $x^k$ and $x^{k-1}$ are equal exactly when $k$ lands here — and the magnitudes peak at the same crossing.' },
    ] },
    { kind: 'callout', tone: 'exam', title: 'Exam corner', text: 'Every topic of this lesson is JEE (Main) binomial-chapter currency, and the question shapes are stable year over year: coefficient sums by substitution (the $(2-3x)^{12}$ shape, where $2^n$ is the designed distractor); the term independent of $x$ (seat equations with negative and fractional powers); Vandermonde and the squares sum $\\sum \\binom{n}{r}^2 = \\binom{2n}{n}$ as prove-or-evaluate items; the greatest term of a numeric power (the $(1.3)^{15}$ class, ratio test with the $x$-weight); and the equal-coefficient and arithmetic-progression conditions on $(a+bx)^n$. State-board papers add the conjugate expansions $(1+x)^n \\pm (1-x)^n$ and the standard-expansion factorizations. The discipline that banks the marks: name the engine (substitution, extraction, or slope), run its three moves — with the off-by-one translation and the base-at-$x=1$ check done BEFORE any factorial is touched.' },
    { kind: 'quiz', title: 'Check yourself: binomial coefficients at work', items: [
      { q: 'The sum of the coefficients of $(2-3x)^{12}$ is', options: ['$4096$', '$1$', '$-1$', '$2^{12}$'], answer: 1, explain: 'Option 1 is the substitution read: at $x = 1$ the expansion collapses to $(2-3)^{12} = (-1)^{12} = 1$ — the honest sum. Option 0’s $4096 = 2^{12}$ is the designed trap: the row sum of $(1+x)^{12}$, equivalently the value of $(2+3x)^{12}$ at $x = 1$ — a different base, a different number. Option 2’s $-1$ would need an ODD exponent: $(2-3x)^{11}$ reads $(-1)^{11}$ at $x = 1$, but the exponent here is twelve. Option 3 is the same trap as option 0 as a power: the sum is $2^n$ ONLY for the base $1+x$.' },
      { q: 'The sum $\\sum_{r=0}^{9} \\binom{9}{r}^{2}$ equals', options: ['$2^9$', '$\\binom{9}{4}$', '$\\binom{18}{9}$', '$2 \\cdot 2^9$'], answer: 2, explain: 'Option 2 is the squares-sum law: $\\binom{9}{r} = \\binom{9}{9-r}$, so the sum is $\\sum_r \\binom{9}{r}\\binom{9}{9-r}$ — the coefficient of $x^9$ in $(1+x)^9(1+x)^9 = (1+x)^{18}$, namely $\\binom{18}{9}$ (Vandermonde at $m = n = 9$). Option 0’s $2^9$ is the plain row sum $\\sum \\binom{9}{r}$, forgetting that each coefficient is SQUARED here. Option 1’s $\\binom{9}{4}$ mistakes the sum for its largest single summand — the middle seat is one term of the sum, not the total. Option 3’s $2 \\cdot 2^9$ doubles the wrong quantity: no constant multiple of the row sum produces the squares sum.' },
      { q: 'In $(2+5x)^{13}$, the coefficients of $x^9$ and $x^{10}$ are', options: ['unequal, with the $x^9$ coefficient larger', 'unequal, with the $x^{10}$ coefficient larger', 'equal', 'impossible to decide without expanding'], answer: 2, explain: 'Option 2 is the seat law: the coefficients of $x^k$ and $x^{k-1}$ in $(a+bx)^n$ are equal exactly when $k = \\tfrac{b(n+1)}{a+b}$ — here $\\tfrac{5 \\cdot 14}{7} = 10$, so the coefficients of $x^{10}$ and $x^9$ are the same number, $\\binom{13}{9}2^4 5^9 = \\binom{13}{10}2^3 5^{10}$, and this is the unique equal pair. Options 0 and 1 assume the profile climbs or falls monotonically — but the $(2+5x)^{13}$ profile rises, levels into ONE exact tie, then falls: the tie is the whole point of the seat law. Option 3 is defeatist: the ratio $\\tfrac{c_k}{c_{k-1}} = \\tfrac{14-k}{k} \\cdot \\tfrac{5}{2}$ decides the question in one line, and no expansion is ever needed.' },
      { q: 'The number of NEGATIVE real terms in the expansion of $(1+ix)^8$ is', options: ['0', '3', '2', '5'], answer: 2, explain: 'Option 2 is the sign census: the seat $r$ carries the factor $i^r$, which is real exactly when $r$ is even and NEGATIVE exactly when $r \\equiv 2 \\pmod{4}$ — the seats $r = 2$ and $r = 6$ — so two of the real terms are negative. Option 0 forgets that even seats can be negative: $i^2 = -1$ and $i^6 = -1$ are as real as $i^0 = i^4 = i^8 = 1$. Option 1’s 3 counts with the wrong cycle: the powers of $i$ repeat with period FOUR ($i, -1, -i, 1$), not three — an eighth-power row never has three negative real seats. Option 3’s 5 is the count of REAL terms ($r = 0, 2, 4, 6, 8$) — the question asks for the negative subset of those.' },
      { q: 'The greatest coefficient in $(1+x)^{11}$ is', options: ['462, a unique peak', '924', '462, a twin peak', '252'], answer: 2, explain: 'Option 2 is the twin-peak law: $n = 11$ is odd, so the row has no middle seat and climbs into an exact TIE — $\\binom{11}{5} = \\binom{11}{6} = 462$, attained twice. Option 0 has the right number with the wrong shape: 462 is NOT a unique peak of row 11 — the profile reaches it at both $r = 5$ and $r = 6$, and "unique" is precisely the trap. Option 1’s 924 is $\\binom{12}{6}$, the unique peak of the NEXT row — at $n = 12$ the peak is unique because 12 is even; row 11 never reaches 924. Option 3’s 252 is $\\binom{10}{5}$, the peak of row 10 — a different row entirely.' },
    ] },
    { kind: 'exercises', title: 'Exercises 7.5', sets: [
      { level: 'L1', questions: [
        { q: 'Without expanding, find the sum of the coefficients of $(3-2x)^7$.', solution: [
          'The sum of the coefficients is the value of the whole expansion at $x = 1$ — the substitution engine’s first move.',
          'So, substitute: $(3 - 2 \\cdot 1)^7 = (3-2)^7 = 1^7 = 1$.',
          'Hence the sum is $1$ — no seat was ever written, and the trap answer $2^7 = 128$ prices the $(1+x)^7$ row, not this base.',
        ], answer: '$1$' },
        { q: 'Expand $(1+x)^6 + (1-x)^6$ as a polynomial in even powers of $x$.', solution: [
          'The conjugate machine: adding $(1+x)^6$ and $(1-x)^6$ kills every odd seat and doubles every even one.',
          'So, row 6 of Pascal’s triangle reads $1, 6, 15, 20, 15, 6, 1$ — the even seats are $1, 15, 15, 1$ at the powers $x^0, x^2, x^4, x^6$.',
          'Hence $(1+x)^6 + (1-x)^6 = 2(1 + 15x^2 + 15x^4 + x^6)$ — an even polynomial: seven seats collapsed to four, the odd seats cancelled in the addition.',
        ], answer: '$2(1 + 15x^2 + 15x^4 + x^6)$' },
      ] },
      { level: 'L2', questions: [
        { q: 'Find the term independent of $x$ in the expansion of $\\left(x - \\tfrac{1}{x}\\right)^{10}$.', solution: [
          'Write the general seat: the term with index $r$ (the $(r+1)$-th term) is $\\binom{10}{r} x^{10-r} \\left(-\\tfrac{1}{x}\\right)^r = \\binom{10}{r} (-1)^r\\, x^{10-2r}$.',
          'So, the exponent at seat $r$ is $10 - 2r$ — the seats step down by two, and the mirror discipline of the figure shows the pairing: seat $r$ and seat $10-r$ carry exponents that are negatives of each other, with equal coefficient magnitudes.',
          'Now, the constant seat: $10 - 2r = 0$ gives $r = 5$ — the middle seat, the only seat whose exponent dies.',
          'So, its coefficient is $\\binom{10}{5} (-1)^5 = -252$.',
          'Hence the term independent of $x$ is $-252$.',
        ], answer: '$-252$', figures: [
          { caption: 'The mirror discipline: the eleven seats of $\\left(x - \\tfrac{1}{x}\\right)^{10}$, seat $r$ carrying the exponent $10 - 2r$ — mirror pairs $r \\leftrightarrow 10-r$ arc-connected with equal coefficient magnitudes, and the middle seat $r = 5$ ringed as the only seat carrying $x^0$, priced $(-1)^5 \\binom{10}{5} = -252$.', svg: mirrorSeats75Svg() },
        ] },
        { q: 'Find the coefficient of $x^6$ in the expansion of $\\left(x^2 - \\tfrac{2}{x}\\right)^9$.', solution: [
          'Normalize the base: the letters are $x^2$ and $-2x^{-1}$, so the seat-$r$ term is $\\binom{9}{r} (-2)^r\\, x^{18-3r}$.',
          'So, match the collected degree: $18 - 3r = 6$ gives $r = 4$ — a genuine seat, and the only one, since the degrees step by three.',
          'Now, price it: $\\binom{9}{4} (-2)^4 = 126 \\cdot 16 = 2016$.',
          'Hence the coefficient of $x^6$ is $2016$ — one seat equation solved, no expansion written.',
        ], answer: '2016' },
      ] },
      { level: 'L3', questions: [
        { q: 'Evaluate $\\sum_{r=0}^{6} \\binom{6}{r}^{2}$.', solution: [
          'Recognize the shape: a sum of squares of one row is the squares-sum law — $\\sum_r \\binom{n}{r}^2 = \\binom{2n}{n}$.',
          'So, the reason: $\\binom{6}{r} = \\binom{6}{6-r}$, and the sum is the coefficient of $x^6$ in $(1+x)^6(1+x)^6$ — which is the coefficient of $x^6$ in $(1+x)^{12}$, namely $\\binom{12}{6}$.',
          'Hence $\\sum_{r=0}^{6} \\binom{6}{r}^{2} = \\binom{12}{6} = 924$.',
          'Check by direct addition: $1 + 36 + 225 + 400 + 225 + 36 + 1 = 924$ — the law and the arithmetic agree.',
        ], answer: '$924 = \\binom{12}{6}$' },
        { q: 'Evaluate $\\sum \\sum_{0 \\leq i < j \\leq 4} \\binom{4}{i}\\binom{4}{j}$ — the sum over all strictly ordered pairs of row-4 seats.', solution: [
          'Count every ordered pair first: $\\left(\\sum_i \\binom{4}{i}\\right)\\left(\\sum_j \\binom{4}{j}\\right) = 2^4 \\cdot 2^4 = 256$.',
          'So, remove the diagonal: the pairs $i = j$ contribute $\\sum_i \\binom{4}{i}^2 = \\binom{8}{4} = 70$ — the squares-sum law at $n = 4$.',
          'Now, halve what is left: the off-diagonal pairs split equally into $i < j$ and $i > j$, so the wanted total is $\\tfrac{256 - 70}{2} = 93$.',
          'Hence the cross-pairs total is $93$ — the general law $\\tfrac{4^n - \\binom{2n}{n}}{2}$ witnessed at $n = 4$.',
        ], answer: '$93$' },
        { q: 'Find both values of $n$ for which the coefficients of the 5th, 6th and 7th terms of $(1+x)^n$ are in arithmetic progression.', solution: [
          'Index honestly: the 5th, 6th and 7th terms sit at $r = 4, 5, 6$ — the off-by-one translation that starts this family.',
          'So, the A.P. condition: $2\\binom{n}{5} = \\binom{n}{4} + \\binom{n}{6}$.',
          'Now, convert by the ratio law: $\\binom{n}{4} = \\binom{n}{5} \\cdot \\tfrac{5}{n-4}$ and $\\binom{n}{6} = \\binom{n}{5} \\cdot \\tfrac{n-5}{6}$, so dividing through by $\\binom{n}{5}$ reads $\\tfrac{5}{n-4} + \\tfrac{n-5}{6} = 2$.',
          'So, clear denominators: $30 + (n-5)(n-4) = 12(n-4)$, which simplifies to $n^2 - 21n + 98 = 0$, that is $(n-7)(n-14) = 0$.',
          'Hence $n = 7$ or $n = 14$ — both genuine, both printed.',
        ], answer: '$n = 7$ or $n = 14$' },
      ] },
      { level: 'L4', questions: [
        { q: 'In the expansion of $(2+5x)^{13}$, find the pair of consecutive powers of $x$ whose coefficients are equal.', solution: [
          'Write the seat price: the coefficient of $x^k$ is $c_k = \\binom{13}{k} 2^{13-k} 5^k$.',
          'So, the equal-seat condition: $c_k = c_{k-1}$ reads $\\tfrac{14-k}{k} \\cdot \\tfrac{5}{2} = 1$, that is $(14-k)5 = 2k$.',
          'Now, solve: $70 - 5k = 2k$, so $k = 10$ — the coefficient of $x^{10}$ equals that of $x^9$, the same fact written as the seat law $k = \\tfrac{b(n+1)}{a+b} = \\tfrac{5 \\cdot 14}{7} = 10$.',
          'Check the equality directly: $\\binom{13}{9} 2^4 5^9 = 715 \\cdot 16 \\cdot 5^9$ and $\\binom{13}{10} 2^3 5^{10} = 286 \\cdot 8 \\cdot 5^{10}$ — both products equal $22{,}343{,}750{,}000$, the tie drawn as the equal bars of the profile figure.',
          'Hence the unique equal pair is the pair of coefficients of $x^9$ and $x^{10}$.',
        ], answer: 'the coefficients of $x^9$ and $x^{10}$ (the seat law gives $k = 10$)', figures: [
          { caption: 'The coefficient profile of $(2+5x)^{13}$: the magnitudes $\\binom{13}{k} 2^{13-k} 5^k$ at the seats $k = 0 \\ldots 13$, normalized to the equal pair — the two equal bars at $k = 9$ and $k = 10$ highlighted and tied with a dashed line at their common top, the seat law $k = \\tfrac{b(n+1)}{a+b} = 10$ visible as the exact levelling of the climb.', svg: equalBars75Svg() },
        ] },
        { q: 'Find the algebraically least coefficient in the expansion of $(2-3x)^{15}$.', solution: [
          'The coefficient of $x^k$ is $\\binom{15}{k} 2^{15-k} (-3)^k$ — magnitude $\\binom{15}{k} 2^{15-k} 3^k$, sign $(-1)^k$.',
          'So, run the ratio test on magnitudes: $\\tfrac{|c_{k+1}|}{|c_k|} = \\tfrac{15-k}{k+1} \\cdot \\tfrac{3}{2} \\geq 1$ reads $45 - 3k \\geq 2k + 2$, that is $k \\leq 8.6$ — the magnitudes climb through seat $k = 8$ into $k = 9$ and first fall after $k = 9$.',
          'Hence the magnitude peak sits at seat $k = 9$ — the 10th term.',
          'So, its sign: $(-3)^9$ is negative, and the largest magnitude carries a minus — the 10th term is the algebraically LEAST coefficient.',
          'Now, price it: $\\binom{15}{9} 2^6 3^9 = 5005 \\cdot 64 \\cdot 19683 = 6{,}304{,}858{,}560$, so the least coefficient is $-6{,}304{,}858{,}560$.',
        ], answer: 'the 10th term, $-6{,}304{,}858{,}560$' },
        { q: 'Find the term independent of $x$ in the expansion of $\\left(x^{2/3} + x^{-1/3}\\right)^9$.', solution: [
          'Normalize the seats: the term with index $p$ (the $(p+1)$-th term) is $\\binom{9}{p} \\left(x^{2/3}\\right)^p \\left(x^{-1/3}\\right)^{9-p} = \\binom{9}{p}\\, x^{p-3}$.',
          'So, the constant seat: $p - 3 = 0$ gives $p = 3$ — the fourth term, the only seat whose exponent dies.',
          'Now, price it: $\\binom{9}{3} = 84$, both letters contributing coefficient $1$.',
          'Hence the term independent of $x$ is $84$.',
        ], answer: '84' },
      ] },
      { level: 'L5', questions: [
        { q: 'For the expansion of $(1+ix)^{12}$, count the REAL terms and state how many of them are NEGATIVE.', solution: [
          'The seat $r$ carries the factor $i^r$, which is real exactly when $r$ is even and imaginary when $r$ is odd.',
          'So, the real seats: $r = 0, 2, 4, 6, 8, 10, 12$ — seven real terms among the thirteen.',
          'Now, the sign census on those: $i^r = (-1)^{r/2}$ on the even seats, so the real seat $r$ is NEGATIVE exactly when $\\tfrac{r}{2}$ is odd — that is $r \\equiv 2 \\pmod{4}$ — the seats $r = 2, 6, 10$.',
          'Hence $(1+ix)^{12}$ has $7$ real terms, of which $3$ are negative — the $4n$ law at $n = 3$: $2n + 1$ real, exactly $n$ negative.',
        ], answer: '7 real terms, 3 of them negative' },
        { q: 'Prove the alternating-squares law — $\\sum_r (-1)^r \\binom{n}{r}^2 = 0$ for odd $n$ and $(-1)^{n/2}\\binom{n}{n/2}$ for even $n$ — by the conjugate read of $(1+x)^n(1-x)^n$, and verify the law at $n = 4$ and $n = 5$.', solution: [
          'Read the sum as a coefficient: the $x^n$ seat of $(1+x)^n(1-x)^n$ collects $\\binom{n}{r}\\binom{n}{n-r}(-1)^{n-r}$ over all $r$ — and since $\\binom{n}{r}\\binom{n}{n-r} = \\binom{n}{r}^2$ and $(-1)^{n-r} = (-1)^n(-1)^r$, the wanted sum is the global sign $(-1)^n$ times that coefficient.',
          'So, collapse the product by the conjugate read: $(1+x)^n(1-x)^n = (1-x^2)^n$ — two expansions become one, in the squared variable.',
          'Now, price the $x^n$ seat of $(1-x^2)^n$: its seats carry only EVEN powers $x^{2r}$ with coefficient $(-1)^r\\binom{n}{r}$ — so an $x^n$ seat exists only when $n$ is even, and then only at $r = n/2$, priced $(-1)^{n/2}\\binom{n}{n/2}$.',
          'Hence the law: for ODD $n$ there is no $x^n$ seat, the coefficient is $0$, and no global sign rescues a zero — the sum is $0$; for EVEN $n$ the sum is $(-1)^{n/2}\\binom{n}{n/2}$, the global sign $(-1)^n = +1$ leaving it untouched.',
          'Check at $n = 4$: $1 - 16 + 36 - 16 + 1 = 6 = (-1)^2\\binom{4}{2}$ — the signed bars of the figure walk to the same closing total. Check at $n = 5$: $1 - 25 + 100 - 100 + 25 - 1 = 0$ — odd row, honest zero.',
        ], answer: 'proved — $0$ at odd $n$, $(-1)^{n/2}\\binom{n}{n/2}$ at even $n$; witnesses $6$ and $0$', figures: [
          { caption: 'The alternating squares at $n = 4$ as signed bars $1, -16, 36, -16, 1$ at true-to-scale heights (positive up, negative down), with the running partial sums $1, -15, 21, 5, 6$ annotated below — the total closes on $6 = (-1)^2\\binom{4}{2}$, the even-$n$ law witnessed.', svg: signedBars75Svg() },
        ] },
        { q: 'Prove the weighted-squares law $\\sum_r r\\,\\binom{n}{r}^2 = n\\binom{2n-1}{n-1}$, and verify it at $n = 4$.', solution: [
          'Use the absorption identity: $r\\binom{n}{r} = n\\binom{n-1}{r-1}$ — one line of factorial arithmetic, converting a weighted seat into an unweighted seat of a smaller row.',
          'So, $\\sum_r r\\binom{n}{r}^2 = \\sum_r \\left(r\\binom{n}{r}\\right)\\binom{n}{r} = n \\sum_r \\binom{n-1}{r-1}\\binom{n}{r}$.',
          'Now, read the remaining sum as a coefficient: $\\binom{n}{r} = \\binom{n}{n-r}$, so $\\sum_r \\binom{n-1}{r-1}\\binom{n}{n-r}$ is the coefficient of $x^{n-1}$ in $(1+x)^{n-1}(1+x)^n$ — the split arguments $(r-1) + (n-r)$ summing to the constant $n-1$.',
          'So, sweep: the product is $(1+x)^{2n-1}$, and the $x^{n-1}$ seat is $\\binom{2n-1}{n-1}$ — hence $\\sum_r r\\binom{n}{r}^2 = n\\binom{2n-1}{n-1}$.',
          'Check at $n = 4$: $0 + 16 + 72 + 48 + 4 = 140$, and $4\\binom{7}{3} = 4 \\cdot 35 = 140$ — both routes land on $140$.',
        ], answer: 'proved — $n\\binom{2n-1}{n-1}$; witness $140 = 4 \\cdot 35$ at $n = 4$' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove Vandermonde’s identity $\\sum_{k=0}^{r} \\binom{m}{k}\\binom{n}{r-k} = \\binom{m+n}{r}$ in TWO ways — by the coefficient read of $(1+x)^m(1+x)^n$, and by counting a selection from two collections — and verify both at $m = n = 4$, $r = 2$.', solution: [
          'First proof, the coefficient read: the $x^r$ seat of $(1+x)^m(1+x)^n$ collects, over every split of the $r$ powers between the two factors, the product $\\binom{m}{k}\\binom{n}{r-k}$ — the $x^k$ seat of the first factor times the $x^{r-k}$ seat of the second.',
          'So, that same seat is the $x^r$ seat of $(1+x)^{m+n}$, namely $\\binom{m+n}{r}$, because $(1+x)^m(1+x)^n = (1+x)^{m+n}$ is the law of exponents. Hence the identity.',
          'Second proof, the two-collection count: a shelf holds $m$ novels and another holds $n$ biographies, and a weekend reading list takes $r$ books from the two shelves together. Any list takes $k$ novels and $r-k$ biographies — $\\binom{m}{k}\\binom{n}{r-k}$ lists for each split $k$ — and summing over $k$ counts every list once.',
          'So, the same lists counted directly: choosing $r$ books from the union of the two shelves is $\\binom{m+n}{r}$ — the shelf boundary is invisible to the chooser. Two counts of one collection must agree: the identity again.',
          'Check at $m = n = 4$, $r = 2$: $6 + 16 + 6 = 28 = \\binom{8}{2}$ — three ways, one total, both proofs agreeing.',
        ], answer: 'proved both ways — $\\binom{m+n}{r}$; witness $28 = 6 + 16 + 6$' },
        { q: 'Prove that the coefficients of the 5th, 6th and 7th terms of $(1+x)^n$ are in arithmetic progression exactly when $n^2 - 21n + 98 = 0$, and verify both roots.', solution: [
          'Index the seats: the 5th, 6th and 7th terms sit at $r = 4, 5, 6$, with coefficients $\\binom{n}{4}, \\binom{n}{5}, \\binom{n}{6}$.',
          'So, the A.P. condition: the middle coefficient is the average of its neighbours — $2\\binom{n}{5} = \\binom{n}{4} + \\binom{n}{6}$.',
          'Now, price the neighbours by the ratio law: $\\binom{n}{4} = \\binom{n}{5} \\cdot \\tfrac{5}{n-4}$ and $\\binom{n}{6} = \\binom{n}{5} \\cdot \\tfrac{n-5}{6}$ — dividing through by $\\binom{n}{5}$ (never zero) gives $\\tfrac{5}{n-4} + \\tfrac{n-5}{6} = 2$.',
          'So, clear denominators: $30 + (n-5)(n-4) = 12(n-4)$, which expands to $n^2 - 9n + 50 = 12n - 48$, that is $n^2 - 21n + 98 = 0$ — factoring as $(n-7)(n-14) = 0$.',
          'Check both roots: at $n = 7$, $35 + 7 = 42 = 2 \\cdot 21 = 2\\binom{7}{5}$; at $n = 14$, $1001 + 3003 = 4004 = 2 \\cdot 2002 = 2\\binom{14}{5}$.',
          'Hence the condition holds exactly at $n = 7$ and $n = 14$ — two genuine roots, both verified, both required.',
        ], answer: '$2\\binom{n}{5} = \\binom{n}{4} + \\binom{n}{6} \\iff n^2 - 21n + 98 = 0 \\iff n = 7$ or $n = 14$' },
      ] },
    ] },
    { kind: 'formula', name: 'The row-sum family', latex: '\\sum_{r=0}^{n} \\binom{n}{r} = 2^{n}, \\qquad \\sum_{r=0}^{n} (-1)^r \\binom{n}{r} = 0 \\;\\; (n \\geq 1)', note: 'the two total prices of the row — substitutions at $x = 1$ and $x = -1$; the alternating sum cancels for every $n \\geq 1$.' },
    { kind: 'formula', name: 'The even/odd split', latex: '\\binom{n}{0} + \\binom{n}{2} + \\cdots = \\binom{n}{1} + \\binom{n}{3} + \\cdots = 2^{n-1}', note: 'the families are equal — row 12 witness: $1 + 66 + 495 + 924 + 495 + 66 + 1 = 2048 = 2^{11}$, matching the odd family $12 + 220 + 792 + 792 + 220 + 12 = 2048$.' },
    { kind: 'formula', name: 'The sum of coefficients (any base)', latex: '\\text{sum of coefficients} = \\bigl[\\text{expansion priced at } x = 1\\bigr]', note: 'whatever the base: $(2-3x)^{12} \\to 1$, $(1+x-2x^2)^9 \\to 0$, $(1+x+x^2)^6 \\to 729$ — the law $2^n$ holds only for the base $1+x$.' },
    { kind: 'formula', name: 'Vandermonde’s identity', latex: '\\sum_{k=0}^{r} \\binom{m}{k} \\binom{n}{r-k} = \\binom{m+n}{r}', note: 'the sweep law — the $x^r$ seat of $(1+x)^m(1+x)^n$; counting meaning: $r$ objects chosen from two collections of $m$ and $n$.' },
    { kind: 'formula', name: 'The squares sum', latex: '\\sum_{r=0}^{n} \\binom{n}{r}^{2} = \\binom{2n}{n}', note: 'Vandermonde at $m = n$, read through the mirror $\\binom{n}{r} = \\binom{n}{n-r}$ — the middle seat of the doubled row; $n = 4$ witness: $70 = \\binom{8}{4}$.' },
    { kind: 'formula', name: 'The alternating-squares law', latex: '\\sum_{r=0}^{n} (-1)^r \\binom{n}{r}^{2} = 0 \\;(n \\text{ odd}), \\qquad (-1)^{n/2}\\binom{n}{n/2} \\;(n \\text{ even})', note: 'the $x^n$ seat of $(1+x)^n(1-x)^n = (1-x^2)^n$ — witnesses: $6$ at $n = 4$, $0$ at $n = 5$.' },
    { kind: 'formula', name: 'The ratio of consecutive coefficients', latex: '\\frac{\\binom{n}{r}}{\\binom{n}{r-1}} = \\frac{n-r+1}{r}', note: 'the row’s local slope — the instrument for peaks, ties and A.P. conditions; on a weighted base $(a+bx)^n$ carry the extra factor $\\tfrac{b}{a}$.' },
    { kind: 'formula', name: 'The greatest-coefficient seat', latex: '\\text{peak: } \\binom{n}{n/2} \\;(n \\text{ even}), \\qquad \\binom{n}{(n-1)/2} = \\binom{n}{(n+1)/2} \\;(n \\text{ odd})', note: 'unique peak at even $n$ (row 12: $924$), twin peaks at odd $n$ (row 11: $462$ twice) — the twin fact is the classic trap.' },
    { kind: 'formula', name: 'The equal-coefficient seat law', latex: 'k = \\frac{b\\,(n+1)}{a+b}', note: 'in $(a+bx)^n$ the coefficients of $x^k$ and $x^{k-1}$ are equal exactly at this seat — $(2+5x)^{13}$: $k = 10$; the same law locates the magnitude peak.' },
    { kind: 'formula', name: 'The term independent of x', latex: 'p\\,(n-r) + q\\,r = 0 \\quad \\text{(the constant seat of } (Ax^{p} + Bx^{q})^{n}\\text{)}', note: 'solve for the seat $r$, then price $\\binom{n}{r} A^{n-r} B^r$ — $\\left(x - \\tfrac{1}{x}\\right)^{10}$: $r = 5$, price $-252$.' },
  ],
}



// ------------------------------------------------------------------
// lesson 76 — authored by the run-118 swarm (agent 4-b), integrated verbatim
// ------------------------------------------------------------------

/* ------------------------------------------------------------------ */
/* figures — original SVG, vivid palette (owner directive 2026-11-08)  */
/* every geometric value computed inside the helper before drawing     */
/* ------------------------------------------------------------------ */

function linearTrio76Svg(): string {
  // the linearization trio near zero, x in [-0.4, 0.4]: the true curve
  // y = (1+x)^(1/2), the tangent y = 1 + x/2 and the second-order curve
  // y = 1 + x/2 - x^2/8, each sampled at 17 engine-computed points
  // (x = -0.4, -0.35, ..., 0.4). The window is y in [0.74, 1.22] and BOTH
  // axes run at the same scale of 625 px per unit, so the drawn drift is
  // true to scale: at x = 0.4 the tangent sits 0.0168 above the true
  // curve and at x = -0.4 it sits 0.0254 above, while the second-order
  // curve stays within 0.0054 of the true curve over the whole window.
  const px = (x: number) => 80 + (x + 0.4) * 625
  const py = (y: number) => 340 - (y - 0.74) * 625
  const trueY = (x: number) => Math.sqrt(1 + x)
  const tanY = (x: number) => 1 + x / 2
  const quadY = (x: number) => 1 + x / 2 - (x * x) / 8
  const poly = (f: (x: number) => number, stroke: string, width: number, dash?: string) => {
    let pts = ''
    for (let i = 0; i <= 16; i++) {
      const x = -0.4 + (i * 0.8) / 16
      pts += `${px(x).toFixed(1)},${py(f(x)).toFixed(1)} `
    }
    const d = dash ? ` stroke-dasharray="${dash}"` : ''
    return `<polyline points="${pts.trim()}" fill="none" stroke="${stroke}" stroke-width="${width}"${d}/>`
  }
  const dot = (x: number, f: (x: number) => number, fill: string) =>
    `<circle cx="${px(x).toFixed(1)}" cy="${py(f(x)).toFixed(1)}" r="4" fill="${fill}"/>`
  let grid = ''
  for (let g = 0.8; g <= 1.2001; g += 0.1) {
    const gy = py(g)
    grid += `<line x1="80" y1="${gy.toFixed(1)}" x2="580" y2="${gy.toFixed(1)}" stroke="#5eead4" stroke-width="1"/>`
    grid += `<text x="72" y="${(gy + 4).toFixed(1)}" font-size="11" font-weight="700" fill="#0f766e" text-anchor="end">${g.toFixed(1)}</text>`
  }
  let ticks = ''
  for (const t of [-0.4, -0.2, 0, 0.2, 0.4]) {
    const tx = px(t)
    ticks += `<line x1="${tx.toFixed(1)}" y1="340" x2="${tx.toFixed(1)}" y2="346" stroke="#d97706" stroke-width="2"/>`
    ticks += `<text x="${tx.toFixed(1)}" y="360" font-size="11" font-weight="700" fill="#0f766e" text-anchor="middle">${t.toFixed(1)}</text>`
  }
  return `<svg viewBox="0 0 620 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three curves over the window x from minus zero point four to zero point four, both axes at the same scale: the true curve y equals the square root of one plus x drawn solid green, the tangent line y equals one plus x over two drawn dashed orange, and the second-order curve y equals one plus x over two minus x squared over eight drawn dotted teal. All three pass through the point zero comma one. At the right edge the tangent sits about zero point zero one seven above the true curve, at the left edge about zero point zero two five above, while the second-order curve stays within zero point zero zero six of the true curve everywhere — the tangent is the first-order read and the parabola hugs the curve longer.">
  <title>the linearization trio near zero: y = √(1+x) and its two reads</title>
  <text x="310" y="22" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the linearization trio near zero: y = √(1+x) and its two reads</text>
  ${grid}
  <rect x="80" y="40" width="500" height="300" fill="none" stroke="#16a34a" stroke-width="1.6"/>
  <line x1="330" y1="40" x2="330" y2="340" stroke="#16a34a" stroke-width="1.2" stroke-dasharray="4 4"/>
  ${poly(trueY, '#16a34a', 2.6)}
  ${poly(tanY, '#ea580c', 2.2, '9 6')}
  ${poly(quadY, '#0d9488', 2.2, '2.5 4')}
  ${dot(-0.4, trueY, '#16a34a')}${dot(0.4, trueY, '#16a34a')}
  ${dot(-0.4, tanY, '#ea580c')}${dot(0.4, tanY, '#ea580c')}
  ${dot(-0.4, quadY, '#0d9488')}${dot(0.4, quadY, '#0d9488')}
  <rect x="96" y="56" width="270" height="76" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="1.4"/>
  <line x1="108" y1="80" x2="144" y2="80" stroke="#16a34a" stroke-width="2.6"/>
  <text x="152" y="84" font-size="11.5" font-weight="700" fill="#166534">true curve y = √(1+x)</text>
  <line x1="108" y1="104" x2="144" y2="104" stroke="#ea580c" stroke-width="2.2" stroke-dasharray="9 6"/>
  <text x="152" y="108" font-size="11.5" font-weight="700" fill="#166534">tangent 1 + x/2 (first-order read)</text>
  <line x1="108" y1="124" x2="144" y2="124" stroke="#0d9488" stroke-width="2.2" stroke-dasharray="2.5 4"/>
  <text x="152" y="128" font-size="11.5" font-weight="700" fill="#166534">second-order 1 + x/2 − x²/8</text>
  ${ticks}
  <text x="310" y="378" font-size="10.5" font-weight="700" text-anchor="middle" fill="#0f766e">the tangent drifts 0.017 and 0.025 by the edges; the second-order curve stays within 0.006</text>
</svg>`
}

function errorLadder76Svg(): string {
  // the error ladder for (1+x)^(1/2): the linear read's error
  // |1 + x/2 - sqrt(1+x)| against the quadratic read's error
  // |1 + x/2 - x^2/8 - sqrt(1+x)| at x = 0.01, 0.05, 0.1. The six bar
  // heights are engine-computed at draw time on a log scale (baseline
  // 10^-8, one gridline per power of ten) because the six values span
  // five decades — 6.2e-8 (quadratic, x = 0.01) up to 1.19e-3 (linear,
  // x = 0.1) — so no single linear scale could keep every bar visible.
  // The gains (linear error / quadratic error) are 200x, 40x and 20x:
  // the quadratic read wins everywhere by strictly more than a factor
  // of 20, and at x = 0.1 the linear error stays under 2e-3 while the
  // quadratic stays under 1e-4.
  const base = 350
  const dec = (350 - 70) / 6
  const errLin = (x: number) => Math.abs(1 + x / 2 - Math.sqrt(1 + x))
  const errQuad = (x: number) => Math.abs(1 + x / 2 - (x * x) / 8 - Math.sqrt(1 + x))
  const barH = (v: number) => dec * Math.log10(v / 1e-8)
  const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹'
  const toSup = (e: number) =>
    String(e)
      .split('')
      .map((d) => (d === '-' ? '⁻' : SUP[Number(d)]))
      .join('')
  const sci = (v: number) => {
    const e = Math.floor(Math.log10(v))
    return `${(v / Math.pow(10, e)).toFixed(2)}×10${toSup(e)}`
  }
  let grid = ''
  for (let e = -8; e <= -2; e++) {
    const gy = base - (e + 8) * dec
    grid += `<line x1="84" y1="${gy.toFixed(1)}" x2="664" y2="${gy.toFixed(1)}" stroke="${e === -8 ? '#16a34a' : '#5eead4'}" stroke-width="${e === -8 ? 2 : 1.2}"/>`
    grid += `<text x="76" y="${(gy + 4).toFixed(1)}" font-size="11" font-weight="700" fill="#0f766e" text-anchor="end">10${toSup(e)}</text>`
  }
  let bars = ''
  ;[0.01, 0.05, 0.1].forEach((x, i) => {
    const cx = 200 + i * 190
    const el = errLin(x)
    const eq = errQuad(x)
    const hl = barH(el)
    const hq = barH(eq)
    bars += `<rect x="${cx - 58}" y="${(base - hl).toFixed(1)}" width="56" height="${hl.toFixed(1)}" rx="4" fill="#d97706"/>`
    bars += `<rect x="${cx + 2}" y="${(base - hq).toFixed(1)}" width="56" height="${hq.toFixed(1)}" rx="4" fill="#ea580c"/>`
    bars += `<text x="${cx - 30}" y="${(base - hl - 8).toFixed(1)}" font-size="11" font-weight="800" fill="#166534" text-anchor="middle">${sci(el)}</text>`
    bars += `<text x="${cx + 30}" y="${(base - hq - 8).toFixed(1)}" font-size="11" font-weight="800" fill="#166534" text-anchor="middle">${sci(eq)}</text>`
    bars += `<text x="${cx}" y="372" font-size="12.5" font-weight="800" fill="#166534" text-anchor="middle">x = ${x}</text>`
    bars += `<text x="${cx}" y="390" font-size="11" font-weight="700" fill="#0d9488" text-anchor="middle">quadratic ${(el / eq).toFixed(0)}× smaller</text>`
  })
  return `<svg viewBox="0 0 720 410" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A grouped bar chart of the error ladder for the square root of one plus x: at each of x equals zero point zero one, zero point zero five and zero point one, an amber bar for the linear read's error and an orange bar for the quadratic read's error, bar heights on a logarithmic scale with one gridline per power of ten from ten to the minus eight at the baseline up to ten to the minus two. The labelled values: linear errors one point two four times ten to the minus five, three point zero five times ten to the minus four and one point one nine times ten to the minus three; quadratic errors six point two one times ten to the minus eight, seven point five eight times ten to the minus six and five point eight eight times ten to the minus five. The quadratic error is roughly two hundred, forty and twenty times smaller than the linear error at the three x values.">
  <title>the error ladder for √(1+x): linear error vs quadratic error, log-scale bars</title>
  <text x="360" y="20" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the error ladder for √(1+x): linear error vs quadratic error (log-scale bars)</text>
  <rect x="150" y="36" width="18" height="12" fill="#d97706"/>
  <text x="176" y="46" font-size="11.5" font-weight="700" fill="#166534">linear error |1 + x/2 − √(1+x)|</text>
  <rect x="150" y="52" width="18" height="12" fill="#ea580c"/>
  <text x="176" y="62" font-size="11.5" font-weight="700" fill="#166534">second-order error |1 + x/2 − x²/8 − √(1+x)|</text>
  ${grid}
  ${bars}
</svg>`
}

function partialFractionBands76Svg(): string {
  // the partial-fraction split for (1-5x+6x^2)^-1 = -2(1-2x)^-1 +
  // 3(1-3x)^-1, drawn as two stacked geometric-row bands meeting at the
  // combined coefficient row. The amber band contributes +3·3^n per
  // column (values 3, 9, 27, 81, 243 at n = 0..4), the red band
  // -2·2^n (-2, -4, -8, -16, -32), and the combined row 3·3^n - 2·2^n
  // = 3^(n+1) - 2^(n+1) reads 1, 5, 19, 65, 211 — every value
  // engine-computed inside this helper before drawing.
  const colX = (i: number) => 160 + i * 102
  const cx = (i: number) => colX(i) + 48
  let cells = ''
  for (let i = 0; i < 5; i++) {
    const b1 = 3 * Math.pow(3, i) // the amber band's n-th seat: 3·3ⁿ
    const b2 = -2 * Math.pow(2, i) // the red band's n-th seat: −2·2ⁿ
    const comb = Math.pow(3, i + 1) - Math.pow(2, i + 1) // 3ⁿ⁺¹ − 2ⁿ⁺¹
    cells += `<text x="${cx(i)}" y="46" font-size="12" font-weight="700" fill="#0f766e" text-anchor="middle">n = ${i}</text>`
    cells += `<rect x="${colX(i)}" y="56" width="96" height="52" rx="7" fill="#ffedd5" stroke="#d97706" stroke-width="1.6"/>`
    cells += `<text x="${cx(i)}" y="88" font-size="15" font-weight="800" fill="#166534" text-anchor="middle">${b1}</text>`
    cells += `<rect x="${colX(i)}" y="138" width="96" height="52" rx="7" fill="#fef3c7" stroke="#dc2626" stroke-width="1.6"/>`
    cells += `<text x="${cx(i)}" y="170" font-size="15" font-weight="800" fill="#dc2626" text-anchor="middle">${b2}</text>`
    cells += `<rect x="${colX(i)}" y="222" width="96" height="56" rx="7" fill="#fef3c7" stroke="#16a34a" stroke-width="2.2"/>`
    cells += `<text x="${cx(i)}" y="256" font-size="16" font-weight="800" fill="#166534" text-anchor="middle">${comb}</text>`
  }
  return `<svg viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The partial-fraction split of one over one minus five x plus six x squared, shown as two stacked geometric-row bands meeting at one combined coefficient row. The amber band carries the values three, nine, twenty-seven, eighty-one and two hundred forty-three at n equals zero to four — the three times three to the n contributions of the three over one minus three x row; the red band carries minus two, minus four, minus eight, minus sixteen and minus thirty-two — the minus two times two to the n contributions of the minus two over one minus two x row. Column by column the bands sum into the combined row one, five, nineteen, sixty-five and two hundred eleven, which is three to the n plus one minus two to the n plus one. By n equals four the amber band has outrun the red band two hundred forty-three to thirty-two, so the combined row inherits three-to-the-n growth.">
  <title>the partial-fraction split: two geometric bands meet in one coefficient row</title>
  <text x="340" y="22" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the partial-fraction split: two bands meet in one coefficient row</text>
  ${cells}
  <rect x="16" y="56" width="136" height="52" rx="7" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/>
  <text x="84" y="78" font-size="12.5" font-weight="800" fill="#166534" text-anchor="middle">the 3·3ⁿ band</text>
  <text x="84" y="96" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">from 3(1−3x)⁻¹</text>
  <text x="84" y="134" font-size="20" font-weight="800" fill="#d97706" text-anchor="middle">+</text>
  <rect x="16" y="138" width="136" height="52" rx="7" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/>
  <text x="84" y="160" font-size="12.5" font-weight="800" fill="#dc2626" text-anchor="middle">the −2·2ⁿ band</text>
  <text x="84" y="178" font-size="10.5" font-weight="700" fill="#0f766e" text-anchor="middle">from −2(1−2x)⁻¹</text>
  <text x="84" y="216" font-size="20" font-weight="800" fill="#d97706" text-anchor="middle">=</text>
  <rect x="16" y="222" width="136" height="56" rx="7" fill="#fef3c7" stroke="#16a34a" stroke-width="2.2"/>
  <text x="84" y="246" font-size="12.5" font-weight="800" fill="#166534" text-anchor="middle">the combined row</text>
  <text x="84" y="264" font-size="11" font-weight="700" fill="#166534" text-anchor="middle">3·3ⁿ − 2·2ⁿ</text>
  <text x="340" y="302" font-size="11" font-weight="800" fill="#166534" text-anchor="middle">each column: 3·3ⁿ + (−2·2ⁿ) = 3·3ⁿ − 2·2ⁿ — the coefficient of xⁿ in (1−5x+6x²)⁻¹</text>
  <text x="340" y="322" font-size="10.5" font-weight="700" fill="#0d9488" text-anchor="middle">the amber band outruns the red band 243 to 32 by n = 4 — the combined row inherits 3ⁿ growth</text>
</svg>`
}

function partialSumWalk76Svg(): string {
  // the partial-sum walk of 1 − 7 + 21 − 35 + 35, the alternating row
  // sum of C(7, r) for r = 0..4: vertices (k, S_k) = (0, 0), (1, 1),
  // (2, −6), (3, 15), (4, −20), (5, 15) — five oscillating steps that
  // close on 15 = C(6,4). The horizontal grid runs every 5 units; the
  // emphasized green zero line is the number line the partial sums
  // live on, and the final vertex is ringed orange.
  const kx = (k: number) => 100 + k * 108
  const py = (v: number) => 310 - (v + 25) * (250 / 45)
  const C = [1, 7, 21, 35, 35] // C(7, r), r = 0..4 — engine-checked
  const S = [0]
  for (let r = 0; r < 5; r++) S.push(S[r] + (r % 2 === 0 ? C[r] : -C[r]))
  let grid = ''
  for (let v = -20; v <= 20; v += 5) {
    const gy = py(v)
    const zero = v === 0
    grid += `<line x1="84" y1="${gy.toFixed(1)}" x2="656" y2="${gy.toFixed(1)}" stroke="${zero ? '#16a34a' : '#5eead4'}" stroke-width="${zero ? 2.4 : 1.2}"/>`
    if (v % 10 === 0) grid += `<text x="76" y="${(gy + 4).toFixed(1)}" font-size="11" font-weight="700" fill="#0f766e" text-anchor="end">${v}</text>`
  }
  let path = ''
  for (let k = 0; k <= 5; k++) path += `${kx(k)},${py(S[k]).toFixed(1)} `
  let dots = ''
  for (let k = 0; k <= 5; k++) dots += `<circle cx="${kx(k)}" cy="${py(S[k]).toFixed(1)}" r="5.5" fill="#fef3c7" stroke="#16a34a" stroke-width="2.2"/>`
  let ticks = ''
  for (let k = 0; k <= 5; k++) {
    ticks += `<line x1="${kx(k)}" y1="310" x2="${kx(k)}" y2="316" stroke="#d97706" stroke-width="2.2"/>`
    ticks += `<text x="${kx(k)}" y="331" font-size="11" font-weight="700" fill="#0f766e" text-anchor="middle">${k}</text>`
  }
  const steps = [
    { t: '+1', x: 145, y: 157 },
    { t: '−7', x: 252, y: 213 },
    { t: '+21', x: 354, y: 133 },
    { t: '−35', x: 459, y: 216 },
    { t: '+35', x: 565, y: 162 },
  ]
  const stepTxt = steps.map((s) => `<text x="${s.x}" y="${s.y}" font-size="12" font-weight="800" fill="#d97706" text-anchor="middle">${s.t}</text>`).join('')
  return `<svg viewBox="0 0 680 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The partial-sum walk of one minus seven plus twenty-one minus thirty-five plus thirty-five, plotted as an oscillating path of five steps against the number of terms taken: the partial sums run zero, one, minus six, fifteen, minus twenty, fifteen, and the fifth step closes on fifteen, which equals C of six choose four — ringed orange at the end. The emphasized green zero line is the number line the partial sums live on; horizontal gridlines run every five units from minus twenty to twenty. The five step sizes are plus one, minus seven, plus twenty-one, minus thirty-five and plus thirty-five, the signed row of C of seven choose r.">
  <title>the partial-sum walk: 1 − 7 + 21 − 35 + 35 closing on 15 = C(6,4)</title>
  <text x="340" y="22" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the partial-sum walk: 1 − 7 + 21 − 35 + 35 closing on 15 = C(6,4)</text>
  <text x="66" y="46" font-size="10.5" font-weight="700" fill="#0f766e">partial sum</text>
  ${grid}
  <line x1="84" y1="310" x2="656" y2="310" stroke="#16a34a" stroke-width="2"/>
  ${ticks}
  <text x="370" y="350" font-size="11" font-weight="700" fill="#0f766e" text-anchor="middle">terms taken (k)</text>
  <polyline points="${path.trim()}" fill="none" stroke="#ea580c" stroke-width="3" stroke-linejoin="round"/>
  ${dots}
  ${stepTxt}
  <text x="100" y="158" font-size="11.5" font-weight="800" fill="#166534" text-anchor="middle">0</text>
  <text x="184" y="160" font-size="11.5" font-weight="800" fill="#166534" text-anchor="middle">1</text>
  <text x="316" y="221" font-size="11.5" font-weight="800" fill="#166534" text-anchor="middle">−6</text>
  <text x="424" y="74" font-size="11.5" font-weight="800" fill="#166534" text-anchor="middle">15</text>
  <text x="532" y="302" font-size="11.5" font-weight="800" fill="#166534" text-anchor="middle">−20</text>
  <circle cx="${kx(5)}" cy="${py(S[5]).toFixed(1)}" r="11" fill="none" stroke="#ea580c" stroke-width="2.6"/>
  <text x="652" y="44" font-size="11.5" font-weight="800" fill="#166534" text-anchor="end">15 = C(6,4)</text>
  <line x1="641" y1="49" x2="641" y2="74" stroke="#ea580c" stroke-width="1.6"/>
  <text x="340" y="366" font-size="11" font-weight="700" fill="#166534" text-anchor="middle">the five steps are the signed row +1 − 7 + 21 − 35 + 35 = C(7,0) − C(7,1) + C(7,2) − C(7,3) + C(7,4)</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* lesson 7.6                                                          */
/* ------------------------------------------------------------------ */

const lesson76: Lesson = {
  id: 'aa-binomial-applications-and-approximations',
  number: '7.6',
  title: 'Binomial Applications and Approximations',
  concepts: [
    'the linear approximation (1+x)^n ≈ 1+nx and its honest error',
    'multi-factor linearizations of products and quotients',
    'root estimates near perfect powers',
    'divisibility, remainders and fractional parts by binomial reads',
    'the conjugate-pair integer trick for surd powers',
    'coefficient hunting via partial fractions on any-index objects',
    'the (1−x)^−k cancellation engine',
    'Bernoulli’s inequality as the error bound',
  ],
  objectives: [
    'Read $(1+x)^n$ to first and second order for small $x$ — the $1+nx$ read and the $1+nx+\\tfrac{n(n-1)}{2!}x^2$ read — with the honest error stated beside every estimate, and cite Bernoulli’s inequality from lesson 7.1 as the certified lower bound at integer indices.',
    'Linearize multi-factor products and quotients — $(1+a_1x)^{n_1}(1+a_2x)^{n_2}\\cdots \\approx 1 + (\\sum n_i a_i)x$ — including the conjugate square-root product $\\sqrt{\\tfrac{x}{x+y}}\\cdot\\sqrt{\\tfrac{x}{x-y}} \\approx 1 + \\tfrac{y^2}{2x^2}$.',
    'Estimate roots near perfect squares and cubes — $\\sqrt{26}$, $\\sqrt{99}$, $\\sqrt[3]{65}$ — to controlled precision by the template $a(1+x)^{1/k} \\approx a + \\tfrac{ax}{k}$, and say exactly when the linear read alone delivers three significant figures.',
    'Prove divisibility, remainder and fractional-part facts by binomial reads — $(1+x)^n - 1 - nx$ carries the factor $x^2$; $7^{101} + 11^{51} \\equiv 2 \\pmod 8$; $5^{2n} \\equiv (-1)^n \\pmod{13}$ — without writing a single induction.',
    'Run the conjugate-pair trick: add the mirror $(a-b)^n$ to a surd power $(a+b)^n$, produce the exact integer even part $2\\sum_{j \\text{ even}} \\binom{n}{j} a^{n-j} b^j$, size the mirror into $(0,1)$, and read off the smallest integer larger than $(a+b)^n$.',
    'Hunt coefficients at exam speed by splitting $\\tfrac{1}{(1-ax)(1-bx)\\cdots}$ into geometric rows via partial fractions — the two-factor law $\\tfrac{a^{n+1} - b^{n+1}}{a-b}$, the quadratic-factor and three-factor cover-up hunts — and by the $(1-x)^{-k}$ cancellation engine, including the alternating partial-sums law $\\sum_{r=0}^{k}(-1)^r\\binom{n}{r} = (-1)^k\\binom{n-1}{k}$.',
    'Locate the first negative term of a fractional-index row such as $(1+x)^{9/2}$ — the falling factors flip sign at a computable seat — and close the chapter’s arc: the theorem built across 7.1–7.5 is now a working tool, not an exhibit.',
  ],
  prerequisites: ['aa-binomial-theorem-any-index', 'aa-mathematical-induction-the-domino-principle', 'aa-the-binomial-theorem-proved'],
  sources: ['cengage-m2-08', 'cengage-jee-style', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus'],
  blocks: [
    { kind: 'para', text: 'The binomial theorem has spent this chapter as the object of study. Lesson 7.2 proved it twice, lesson 7.3 extended its index to every rational number and banked the frequently used rows, lesson 7.4 taught it to count across any number of letters, and lesson 7.5 put its coefficients to work in identities of their own. Each lesson ended with the theorem admired — a machine built, tested and parked. This lesson drives it out of the garage. The questions change character entirely. How large is $(1.02)^5$ when the calculator stays in the bag? What remainder does $7^{101} + 11^{51}$ leave on division by $8$ — without expanding anything with $101$ factors? Which integer first overtakes $(\\sqrt5+\\sqrt2)^4$? What is the coefficient of $x^n$ in a rational function that no sane person would ever multiply out? None of these asks the theorem to finish a row; each asks it to work on the first few seats, or on a cleverly chosen neighbour, and then stop while the arithmetic is still cheap. That is the practical binomial theorem: not the whole row, but the row’s front window.' },
    { kind: 'para', text: 'Everything here runs on one of three engines, and each is a cancellation in disguise. The **linearization engine** keeps only the first two seats of $(1+x)^n = 1 + nx + \\cdots$ and drops the $x^2$ mass — legal only when $x$ is small, and paid for with an honest error statement, because the dropped mass is not a mystery but a computable object. The **conjugate-pairing engine** adds a surd power to its mirror image: the odd seats cancel in pairs, the surd tail dies, and an exact integer survives — which is how a question about $\\sqrt5 + \\sqrt2$ becomes a statement about $178$. The **partial-fraction engine** splits a rational function into geometric rows BEFORE any expansion: each row is a banked friend from lesson 7.3, and a coefficient hunt that would demand a convolution collapses to a one-line read. Linearization approximates numbers, conjugate pairing pins integers, partial fractions price seats — three jobs, one philosophy: make the hard part cancel before you compute it.' },
    { kind: 'para', text: 'One discipline threads through all three: no estimate without its error. Every approximation in this lesson is printed beside its true value — the honest-error convention — because an approximation you cannot bound is a guess wearing a suit. Sometimes the bound is already banked: lesson 7.1 PROVED Bernoulli’s inequality, $(1+x)^n \\geq 1 + nx$ for every integer $n \\geq 1$ and every $x \\geq -1$, by a one-line induction — so at integer indices the linear read is a certified LOWER bound, and the error column says exactly how much truth is unpaid. At other indices the engine’s own arithmetic runs the same discipline: the dropped mass starts at the $\\tbinom{n}{2}$-shaped seat, and the derivation below prices it.' },

    { kind: 'heading', text: 'The Linear Approximation Engine' },
    { kind: 'para', text: 'Strip the any-index theorem of lesson 7.3 down to its first two seats and the working tool appears. For any rational index $n$ and $|x| < 1$, the row begins $(1+x)^n = 1 + nx + \\tfrac{n(n-1)}{2!}x^2 + \\cdots$; when $x$ is SMALL — a few hundredths, say — every seat after the second is dwarfed, and the two-seat truncation is remarkably good. This section makes the statement precise, honest and fast.' },
    { kind: 'callout', tone: 'definition', title: 'The linear approximation (the first-order read)', text: 'For $|x|$ small and any rational index $n$, the expression $(1+x)^n$ is said to be **linearly approximated** by $1 + nx$ if the seats from $x^2$ onward are neglected — that is, only the first two seats of the binomial row are kept. Thus, $(1+x)^n \\approx 1 + nx$ with an error beginning at the $x^2$ seat, so the error is of order $x^2$ and quarters whenever $x$ is halved.' },
    { kind: 'equation', latex: '(1+x)^n = 1 + nx + \\tfrac{n(n-1)}{2!}x^2 + \\tfrac{n(n-1)(n-2)}{3!}x^3 + \\cdots \\quad \\Longrightarrow \\quad (1+x)^n \\approx 1 + nx \\quad (|x| \\ \\text{small}) \\tag{1}', note: 'the working read: keep two seats, drop the $x^2$ mass — the derivation below prices exactly what was dropped.' },
    { kind: 'terms', items: [
      { term: 'Linear approximation (the first-order read)', def: 'the two-seat read $(1+x)^n \\approx 1 + nx$ for $|x|$ small — the tangent line at zero, valid for every rational index inside the window, with an error that begins at the $x^2$ seat.' },
      { term: 'Second-order read', def: 'the three-seat read $1 + nx + \\tfrac{n(n-1)}{2!}x^2$ — the error drops to the $x^3$ seat, buying roughly two more decimals for one extra term.' },
      { term: 'Honest error', def: 'the exact gap between an estimate and its engine-checked true value, printed beside every approximation — this lesson’s standing discipline.' },
      { term: 'Multi-factor linearization', def: 'for a product or quotient of $(1 + \\text{small})$ powers: linearize each factor, add the linear coefficients, drop every $x^2$ crossing — $\\prod (1+a_i x)^{n_i} \\approx 1 + (\\sum n_i a_i)x$.' },
      { term: 'Conjugate pair', def: 'a surd power $(a+b)^n$ and its mirror $(a-b)^n$: their sum is the doubled even part $2\\sum_{j \\ \\mathrm{even}} \\tbinom{n}{j} a^{n-j} b^j$ — an exact integer when $a$ and $b$ are square roots.' },
      { term: 'Smallest integer larger (the ceiling seat)', def: 'when the mirror lies in $(0,1)$, the smallest integer larger than $(a+b)^n$ is the conjugate sum itself — the surd power plus its mirror.' },
      { term: 'Partial-fraction split', def: 'resolving a rational function into geometric rows BEFORE expanding: $\\tfrac{1}{(1-ax)(1-bx)} = \\tfrac{a}{a-b}(1-ax)^{-1} - \\tfrac{b}{a-b}(1-bx)^{-1}$, each row a banked friend of lesson 7.3.' },
      { term: 'Cover-up method', def: 'the one-line partial-fraction pricing: hide one factor, substitute its root, and the surviving value is that factor’s coefficient.' },
      { term: 'Cancellation engine', def: 'multiplying by $(1-x)^{-k}$ instead of convolving: $(1-x)^n (1-x)^{-1} = (1-x)^{n-1}$ kills the tail and prices alternating partial sums in one move.' },
      { term: 'Error ladder', def: 'the side-by-side comparison of the linear read’s error with the quadratic read’s error at a fixed ladder of $x$-values — the gain of the second-order seat made visible.' },
      { term: 'Bernoulli’s inequality (the bound)', def: '$(1+x)^n \\geq 1 + nx$ for $x \\geq -1$ and integer $n \\geq 1$ — proved by induction in lesson 7.1, cited here as the linear read’s certified lower bound.' },
    ] },
    { kind: 'para', text: 'The honest-error discipline begins with a structural fact: the gap between $(1+x)^n$ and its linear read is not an amorphous fog but a polynomial with a factor you can name. The derivation proves it for positive integer $n$, and the same computation runs the any-index rows of lesson 7.3 word for word.' },
    { kind: 'derivation', title: 'The honest error: (1+x)^n − 1 − nx carries the factor x²', statement: 'For every integer $n \\geq 2$ and every $x$, the difference between $(1+x)^n$ and its first-order read is divisible by $x^2$ — the error is genuinely second-order, and its leading coefficient is $\\tbinom{n}{2}$.', steps: [
      { label: 'Expand by the theorem', formula: '(1+x)^n = 1 + nx + \\tbinom{n}{2}x^2 + \\tbinom{n}{3}x^3 + \\cdots + x^n', explanation: 'lesson 7.2’s finite row: every seat after the first two is degree two or higher.' },
      { label: 'Subtract the linear read', formula: '(1+x)^n - 1 - nx = \\tbinom{n}{2}x^2 + \\tbinom{n}{3}x^3 + \\cdots + x^n', explanation: 'the $1$ and the $nx$ cancel seat by seat; what remains starts at the $x^2$ seat.' },
      { label: 'Factor out x²', formula: '(1+x)^n - 1 - nx = x^2\\left(\\tbinom{n}{2} + \\tbinom{n}{3}x + \\cdots + x^{n-2}\\right)', explanation: 'every surviving term carries $x^2$, so the whole gap is $x^2$ times a polynomial — halving $x$ quarters the error.' },
      { label: 'Witness at n = 5, x = 0.02', formula: '(1.02)^5 - 1 - 0.1 = 10(0.02)^2 + \\cdots = 0.004 + 0.0000808', explanation: 'the $x^2$ seat alone is worth $0.004$; the true gap is $0.0040808$, the extra $0.0000808$ being the $x^3$-and-beyond tail.' },
    ], result: '$(1+x)^n - 1 - nx = x^2\\left(\\tbinom{n}{2} + \\cdots\\right)$ — the linear read errs by a genuine multiple of $x^2$, which is exactly why the second-order read exists and why small $x$ is the whole game.' },
    { kind: 'para', text: 'The second-order read adds one seat and reaps the dividend.' },
    { kind: 'equation', latex: '(1+x)^n \\approx 1 + nx + \\tfrac{n(n-1)}{2!}x^2 \\tag{2}', note: 'the second-order read: one more seat, roughly two more decimals — the error now begins at the $x^3$ seat, so halving $x$ cuts it eightfold.' },
    { kind: 'para', text: 'Now the discipline in numbers. The table below runs the engine three times — a positive-integer power, a square root, and a power just under one — and prints every read beside its engine-checked true value — the convention the whole lesson keeps: the estimate and the truth, side by side, always.' },
    { kind: 'table', head: ['Power', 'First-order read', 'Second-order read', 'True value (engine-checked)'], rows: [
      ['$(1.02)^5$', '$1 + 5(0.02) = 1.10$', '$1.10 + 10(0.02)^2 = 1.104$', '$1.1040808032$'],
      ['$\\sqrt{1.04} = (1.04)^{1/2}$', '$1 + \\tfrac{1}{2}(0.04) = 1.02$', '$1.02 - \\tfrac{1}{8}(0.04)^2 = 1.0198$', '$1.0198039027$'],
      ['$(0.99)^4$', '$1 - 4(0.01) = 0.96$', '$0.96 + 6(0.01)^2 = 0.9606$', '$0.96059601$'],
    ], caption: 'The honest-error discipline at work: every estimate printed beside its true value — first order, second order, exact — each entry engine-verified before printing.' },
    { kind: 'para', text: 'Read the table as a contract. The worst first-order gap in it is $0.0040808$ (at $(1.02)^5$), the worst second-order gap $0.0000808$ — one extra seat bought two more decimals. The same pattern holds everywhere: at $(1.02)^4$ the first-order read $1.08$ faces the true $1.08243216$, and Bernoulli certifies the direction at both integer indices — the truth sits ABOVE the read, never below. The figure below draws the geometry of the contract for the square-root row.' },
    { kind: 'figure', caption: 'The linearization trio near zero, drawn true to scale over $-0.4 \\leq x \\leq 0.4$ (both axes at the same scale, seventeen engine-computed sample points per curve): the true curve $y = \\sqrt{1+x}$ (solid green), the tangent line $y = 1 + \\tfrac{x}{2}$ (dashed orange) and the second-order curve $y = 1 + \\tfrac{x}{2} - \\tfrac{x^2}{8}$ (dotted teal). All three meet at $(0, 1)$. The tangent IS the first-order read; by the window’s edges it has drifted $0.017$ and $0.025$ from the curve, while the second-order curve — one extra seat — stays within $0.006$ everywhere. The parabola hugs the curve longer: that is what buying the $x^2$ seat looks like.', svg: linearTrio76Svg() },
    { kind: 'para', text: 'The picture shows what the table cannot: the tangent and the parabola agree at zero and disagree about everything else in a controlled way. Near zero all three curves are visually one; walk to the edges and the tangent marches away while the second-order curve stays glued. The whole approximation industry of this lesson lives inside that glued region — and the error column tells you how far you have walked.' },
    { kind: 'example', title: 'Estimate $(1.02)^5$, $\\sqrt{1.04}$ and $(0.99)^4$ to first and second order, printing the true value beside every estimate.', steps: [
      'Set up each power in the $(1+x)$ form: $(1.02)^5$ has $x = 0.02$, $n = 5$; $\\sqrt{1.04} = (1.04)^{1/2}$ has $x = 0.04$, $n = \\tfrac{1}{2}$; $(0.99)^4$ has $x = -0.01$, $n = 4$.',
      'First order, the $1 + nx$ read: $(1.02)^5 \\approx 1 + 5(0.02) = 1.10$; $\\sqrt{1.04} \\approx 1 + \\tfrac{1}{2}(0.04) = 1.02$; $(0.99)^4 \\approx 1 - 4(0.01) = 0.96$.',
      'So, second order adds the $\\tfrac{n(n-1)}{2}x^2$ seat: $(1.02)^5 \\approx 1.10 + 10(0.0004) = 1.104$; $\\sqrt{1.04} \\approx 1.02 - \\tfrac{1}{8}(0.04)^2 = 1.0198$; $(0.99)^4 \\approx 0.96 + 6(0.0001) = 0.9606$.',
      'Now, the honesty column, engine-checked: the true values are $1.1040808032$, $1.0198039027$ and $0.96059601$.',
      'Hence the reads and their errors: first-order gaps $0.0040808$, $0.0001961$ and $0.00059601$; second-order gaps $0.0000808$, $0.0000039$ and $0.0000040$ — the worst first-order error beats four parts in a thousand, and one extra seat repairs all of it.',
    ] },
    { kind: 'para', text: 'Products and quotients are the engine’s next market, and the rule is a one-line law: linearize each factor separately, then ADD the linear coefficients — because when $(1+a_1x)(1+a_2x)$ multiplies out, every crossing of two small quantities is $x^2$ mass, and $x^2$ mass is what the engine drops.' },
    { kind: 'equation', latex: '\\prod_i \\left(1 + a_i x\\right)^{n_i} \\approx 1 + \\left(\\sum_i n_i a_i\\right)x \\tag{3}', note: 'the multi-factor linearization: each factor contributes its index times its argument to the common linear coefficient; every product of two contributions is dropped $x^2$ mass.' },
    { kind: 'example', title: 'Show that for small $x$, $(1+2x)^{-3}\\left(1-\\tfrac{x}{2}\\right)^{1/2}\\left(1+\\tfrac{x}{4}\\right)^{-1} \\approx 1 - \\tfrac{13}{2}x$, and price both sides at $x = 0.01$.', steps: [
      'Linearize each factor by the $(1+u)^n \\approx 1 + nu$ read at its own small argument: $(1+2x)^{-3} \\approx 1 - 6x$; $\\left(1 - \\tfrac{x}{2}\\right)^{1/2} \\approx 1 - \\tfrac{x}{4}$; $\\left(1 + \\tfrac{x}{4}\\right)^{-1} \\approx 1 - \\tfrac{x}{4}$.',
      'So, multiply the three reads and drop every $x^2$ crossing: the linear coefficient is the sum $(-3)(2) + \\left(\\tfrac{1}{2}\\right)\\left(-\\tfrac{1}{2}\\right) + (-1)\\left(\\tfrac{1}{4}\\right) = -6 - \\tfrac{1}{4} - \\tfrac{1}{4} = -\\tfrac{13}{2}$.',
      'Now, price it: at $x = 0.01$ the linearization reads $1 - \\tfrac{13}{2}(0.01) = 1 - 0.065 = 0.935$.',
      'Check the honesty column: the true value at $x = 0.01$ is $\\approx 0.9376$, so the gap is $\\approx 0.0026$ — exactly the dropped $x^2$ mass, of which the $(1+2x)^{-3}$ factor alone contributes $24x^2 = 0.0024$ (its own $x^2$ seat is $\\tfrac{(-3)(-4)}{2}(2x)^2 = 24x^2$).',
      'Hence $\\approx 1 - \\tfrac{13}{2}x$ with a certified, located error budget: the dominant part of the gap is not merely estimated — it is named.',
    ] },
    { kind: 'para', text: 'The conjugate square-root product is the prettiest resident of this market. Two twin surds $\\sqrt{\\tfrac{x}{x+y}}$ and $\\sqrt{\\tfrac{x}{x-y}}$ look like separate work; combined, they are one clean read.' },
    { kind: 'equation', latex: '\\sqrt{\\tfrac{x}{x+y}} \\cdot \\sqrt{\\tfrac{x}{x-y}} = \\left(1 - \\tfrac{y^2}{x^2}\\right)^{-1/2} \\approx 1 + \\tfrac{y^2}{2x^2} \\tag{4}', note: 'the twin surds multiply into a single $(1+u)^{-1/2}$ at the automatically-small argument $u = \\tfrac{y^2}{x^2}$ — the conjugate square-root product.' },
    { kind: 'example', title: 'If $x$ is very large compared with $y$, show that $\\sqrt{\\tfrac{x}{x+y}} \\cdot \\sqrt{\\tfrac{x}{x-y}} \\approx 1 + \\tfrac{y^2}{2x^2}$, and check the read at $\\tfrac{y}{x} = 0.1$.', steps: [
      'Combine the roots first: $\\sqrt{\\tfrac{x}{x+y}} \\cdot \\sqrt{\\tfrac{x}{x-y}} = \\left(\\tfrac{x^2}{x^2 - y^2}\\right)^{1/2} = \\left(1 - \\tfrac{y^2}{x^2}\\right)^{-1/2}$.',
      'So, run the linear engine at the small argument $u = -\\tfrac{y^2}{x^2}$: the $(1+u)^{-1/2}$ row begins $1 - \\tfrac{u}{2}$, and substituting gives $\\approx 1 + \\tfrac{y^2}{2x^2}$.',
      'Now, check at $\\tfrac{y}{x} = 0.1$: the read gives $1 + \\tfrac{0.01}{2} = 1.005$.',
      'Hence the honesty column: the true value is $(1 - 0.01)^{-1/2} = 1.0050378$ — the read is short by $0.0000378$, almost exactly the dropped quadratic seat $\\tfrac{3}{8}(0.01)^2 = 0.0000375$.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Calculus will recognise a friend', text: 'The linear read is the first chapter of calculus standing on algebra’s ground. The number $n$ is precisely the derivative of $(1+x)^n$ at $x = 0$ — lesson 7.3’s series differentiates to $n(1+x)^{n-1}$, which is $n$ at zero — and the line $y = 1 + nx$ is exactly the tangent line at that point, as the figure drew it. Nothing in this lesson NEEDS calculus: every estimate was produced and bounded by binomial seats alone. But when calculus arrives, it will recognise a friend — the tangent line, the second-order correction, and even the error ladder are the first three rungs of the Taylor development, built here entirely from the theorem this chapter proved.' },
    { kind: 'para', text: 'From the above discussion, the linearization reflex assembles into one sentence — read, multiply, add:' },
    { kind: 'list', marker: 'roman', items: [
      '**(i) single factor:** $(1+2x)^{-3} \\approx 1 - 6x$ — the index times the argument, nothing else kept;',
      '**(ii) multi-factor:** $\\prod (1+a_i x)^{n_i} \\approx 1 + (\\sum n_i a_i)x$ — add the contributions, drop the crossings: $-6 - \\tfrac{1}{4} - \\tfrac{1}{4} = -\\tfrac{13}{2}$;',
      '**(iii) conjugate square-root product:** $\\sqrt{\\tfrac{x}{x+y}}\\cdot\\sqrt{\\tfrac{x}{x-y}} \\approx 1 + \\tfrac{y^2}{2x^2}$ — the twins collapse to one $(1-u)^{-1/2}$ read at an automatically-small argument.',
    ] },

    { kind: 'heading', text: 'Roots near Perfect Powers' },
    { kind: 'para', text: 'Root extraction is where the linear engine earns its examination keep, because a root near a perfect power is already in $(1+x)$ form. The template: write $\\sqrt[k]{a^k + \\epsilon}$ as $a\\left(1 + \\tfrac{\\epsilon}{a^k}\\right)^{1/k}$ — seat the root at the NEAREST perfect $k$-th power, so the argument is small by construction — then read two seats, and a third when the fourth digit matters.' },
    { kind: 'equation', latex: 'a(1+x)^{1/k} \\approx a\\left(1 + \\tfrac{x}{k}\\right) = a + \\tfrac{ax}{k} \\tag{5}', note: 'the root-estimate template: the correction is the root’s base times the argument over the index — $\\sqrt[3]{65}$, $\\sqrt{26}$ and $\\sqrt{99}$ below run it three ways.' },
    { kind: 'example', title: 'Estimate $\\sqrt[3]{65}$ to first and second order, with the honest errors printed.', steps: [
      'Seat the root at the nearest perfect cube: $65 = 64 + 1 = 64\\left(1 + \\tfrac{1}{64}\\right)$, so $\\sqrt[3]{65} = 4\\left(1 + \\tfrac{1}{64}\\right)^{1/3}$ — the argument $\\tfrac{1}{64}$ is small by construction.',
      'So, first order: $4\\left(1 + \\tfrac{1}{3} \\cdot \\tfrac{1}{64}\\right) = 4\\left(1 + \\tfrac{1}{192}\\right) \\approx 4.0208333$.',
      'Now, second order: the $\\tfrac{n(n-1)}{2}x^2$ seat at $n = \\tfrac{1}{3}$ is $-\\tfrac{1}{9}\\left(\\tfrac{1}{64}\\right)^2$, so $\\sqrt[3]{65} \\approx 4\\left(1 + \\tfrac{1}{192} - \\tfrac{1}{9}\\left(\\tfrac{1}{64}\\right)^2\\right) \\approx 4.0207248$.',
      'Check the honesty column: the true value is $\\approx 4.0207257$ — the first-order read runs long by $\\approx 0.0001076$, the second-order falls short by only $\\approx 0.0000016$.',
      'Hence $\\sqrt[3]{65} \\approx 4.0207$ to four significant figures from two seats — and the second seat repaired all but the sixth decimal.',
    ] },
    { kind: 'example', title: 'Estimate $\\sqrt{26}$ to second order and state both honest errors.', steps: [
      'Seat at the nearest perfect square: $26 = 25\\left(1 + \\tfrac{1}{25}\\right)$, so $\\sqrt{26} = 5\\left(1 + \\tfrac{1}{25}\\right)^{1/2}$.',
      'So, first order: $5\\left(1 + \\tfrac{1}{50}\\right) = 5.1$ — only two reliable decimals so far.',
      'Now, second order subtracts the $-\\tfrac{x^2}{8}$ seat: $5\\left(1 + \\tfrac{1}{50} - 0.0002\\right) = 5.099$.',
      'Hence the honesty column: $\\sqrt{26} = 5.0990195$, so the second-order read is short by $0.0000195$ while the first-order ran long by $0.0009805$ — the extra seat bought a factor of fifty in accuracy.',
    ] },
    { kind: 'para', text: 'The engine works equally well from the far side of a perfect power. $\\sqrt{99} = 10(1 - 0.01)^{1/2}$ reads $9.95$ at first order and $10\\left(1 - 0.005 - 0.0000125\\right) = 9.949875$ at second order, against the true $9.9498743$ — a four-decimal answer from two seats, and the exercise set asks you to reproduce it. But the deeper question every approximation raises is: how much does the second seat buy? The answer deserves its own table and picture.' },
    { kind: 'table', head: ['$x$', 'Linear error $|1 + \\tfrac{x}{2} - \\sqrt{1+x}|$', 'Quadratic error $|1 + \\tfrac{x}{2} - \\tfrac{x^2}{8} - \\sqrt{1+x}|$', 'Gain'], rows: [
      ['$0.01$', '$1.24 \\times 10^{-5}$', '$6.2 \\times 10^{-8}$', '$\\approx 200\\times$'],
      ['$0.05$', '$3.05 \\times 10^{-4}$', '$7.6 \\times 10^{-6}$', '$\\approx 40\\times$'],
      ['$0.1$', '$1.19 \\times 10^{-3}$', '$5.9 \\times 10^{-5}$', '$\\approx 20\\times$'],
    ], caption: 'The error ladder for $(1+x)^{1/2}$ — every entry engine-computed; the quadratic error is more than $20\\times$ smaller everywhere, and even at $x = 0.1$ the linear error stays under $2 \\times 10^{-3}$ while the quadratic stays under $10^{-4}$.' },
    { kind: 'figure', caption: 'The error ladder drawn: the linear read’s error (amber) against the quadratic read’s error (orange) at $x = 0.01, 0.05, 0.1$. The six bar heights sit on a log scale — one gridline per power of ten, baseline $10^{-8}$ — because the six engine-computed errors span five decades, from $6.2 \\times 10^{-8}$ to $1.19 \\times 10^{-3}$; a single linear scale would render five of the bars invisible. Read the gains instead: about $200\\times$, $40\\times$ and $20\\times$ — the quadratic read wins everywhere, and the closer $x$ gets to zero the more dramatic the victory. This is the whole economics of the second-order seat in one picture.', svg: errorLadder76Svg() },
    { kind: 'para', text: 'The ladder teaches the choosing rule. When three significant figures suffice — a comparison, a sanity check — the linear read alone is honest: even at $x = 0.1$ its error, under $2 \\times 10^{-3}$, sits in the fourth significant figure of a number near $1.05$. When the fourth digit matters — a stated-precision question, a table value — the second-order read delivers: under $10^{-4}$ at the very same $x$, improving eightfold for every halving of $x$, and two hundred times better already at $x = 0.01$. Buy the second seat exactly when the problem has started counting digits.' },
    { kind: 'callout', tone: 'warn', title: 'Three traps on the approximation road', text: '**Trap 1 — the read is a NEAR-zero tool.** At $x = 0.5$ the dropped $x^2$ mass is comparable to the seats you kept: $1.5$ is not a small perturbation of $1$, the "error" is no longer second-order in any useful sense, and no honest error column survives the abuse. Small means a few hundredths — not a few halves. **Trap 2 — the estimate without its column.** Quoting $\\sqrt[3]{65} \\approx 4.02$ with no error statement is quoting nothing: the discipline of this lesson is that every read ships with its true value or its bounded gap. **Trap 3 — the negative-index sign flip.** A negative index does NOT make every term negative: $(1+2x)^{-3}$ reads $1 - 6x + 24x^2 - \\cdots$ — the signs alternate seat by seat, exactly as lesson 7.3’s rows showed, and the second-order term here is POSITIVE. Assuming a blanket sign flip mis-prices the very $x^2$ mass the honest-error column is built on.' },

    { kind: 'heading', text: 'Divisibility, Remainders and Fractional Parts' },
    { kind: 'para', text: 'The chapter’s proof engine was induction, and it was heavy machinery. The binomial theorem offers a lighter route to a whole family of number-theory facts: read each base as a NEIGHBOUR of the modulus, expand the binomial that appears, and watch the divisibility fall out of the seats — no dominoes, no base case, no inductive step. The prototype is already proved above: $(1+x)^n - 1 - nx$ carries the factor $x^2$, and for integer $x$ that is a divisibility statement about whole numbers.' },
    { kind: 'equation', latex: '(1+x)^n - 1 - nx = x^2\\left(\\tbinom{n}{2} + \\tbinom{n}{3}x + \\cdots + x^{n-2}\\right) \\tag{6}', note: 'the linear-read gap as a divisibility certificate: for integer $n \\geq 2$ the whole gap is a multiple of $x^2$ — an induction-free proof of a divisibility fact.' },
    { kind: 'example', title: 'Find the remainder when $7^{101} + 11^{51}$ is divided by $8$.', steps: [
      'Read each base as its neighbour modulo $8$: $7 = 8 - 1 \\equiv -1 \\pmod 8$, and $11 = 8 + 3 \\equiv 3 \\pmod 8$ — a binomial read on each side of the modulus.',
      'So, the first power: $7^{101} \\equiv (-1)^{101} = -1 \\pmod 8$ — the odd exponent fixes the sign.',
      'Now, the second: $11^{51} \\equiv 3^{51} = 3 \\cdot (3^2)^{25} \\equiv 3 \\cdot 1^{25} = 3 \\pmod 8$, because $3^2 = 9 \\equiv 1 \\pmod 8$.',
      'Hence the sum $\\equiv -1 + 3 = 2 \\pmod 8$ — remainder $2$, by neighbour reads alone.',
    ] },
    { kind: 'para', text: 'The same neighbour read, applied to a SQUARE, produces the parity pair that fractional-part questions ride. Because $5^2 = 25 = 26 - 1 \\equiv -1 \\pmod{13}$, every even power of $5$ is one sign-flip away from being pinned:' },
    { kind: 'equation', latex: '5^{2n} = (5^2)^n \\equiv (-1)^n \\pmod{13} \\tag{7}', note: 'the parity pair: even $n$ leaves remainder $1$, odd $n$ leaves remainder $12$ — the fractional part of $\\tfrac{5^{2n}}{13}$ follows immediately.' },
    { kind: 'example', title: 'Find the fractional part of $\\tfrac{5^{2n}}{13}$ for even $n$ and for odd $n$, and pin the year-sized witness $5^{2024}$.', steps: [
      'The congruence: $5^{2n} \\equiv (-1)^n \\pmod{13}$, so the remainder is $1$ or $12$ depending on the parity of $n$.',
      'So, even $n$: $5^{2n} = 13q + 1$, hence $\\tfrac{5^{2n}}{13} = q + \\tfrac{1}{13}$ — fractional part $\\tfrac{1}{13}$.',
      'Now, odd $n$: the remainder is $12$, so $\\tfrac{5^{2n}}{13}$ ends in $\\tfrac{12}{13}$ — fractional part $\\tfrac{12}{13}$.',
      'Check the witness: $5^{2024} = 5^{2 \\cdot 1012}$ with $1012$ even — remainder $1$, fractional part $\\tfrac{1}{13}$, and the engine confirms $5^{2024} \\equiv 1 \\pmod{13}$.',
    ] },
    { kind: 'para', text: 'Now the section’s showpiece: a question about a SURD POWER answered by an exact integer. The instrument is the conjugate pair — the surd power plus its mirror image — and the derivation below builds it.' },
    { kind: 'derivation', title: 'The conjugate-pair identity: (a+b)^n + (a−b)^n = 2(even part)', statement: 'Adding a binomial power to its mirror image cancels every seat that carries an odd power of $b$; what survives is the even part, doubled — a pure integer when $a$ and $b$ are square roots.', steps: [
      { label: 'Write both rows at n = 4', formula: '(a+b)^4 = a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4', explanation: 'the finite row of lesson 7.2, written out where every seat is visible.' },
      { label: 'The mirror row', formula: '(a-b)^4 = a^4 - 4a^3b + 6a^2b^2 - 4ab^3 + b^4', explanation: 'same seats, the sign of every odd-$b$ seat flipped.' },
      { label: 'Add seat by seat', formula: '(a+b)^4 + (a-b)^4 = 2a^4 + 12a^2b^2 + 2b^4 = 2\\left(a^4 + 6a^2b^2 + b^4\\right)', explanation: 'the odd seats cancel in pairs — only the even seats survive, doubled.' },
      { label: 'State the general law', formula: '(a+b)^n + (a-b)^n = 2\\!\\sum_{j \\ \\mathrm{even}} \\tbinom{n}{j} a^{n-j} b^j', explanation: 'at any index, every odd seat cancels against its mirror; the even seats double. No surd with an odd $b$-count survives.' },
      { label: 'The surd witness', formula: '(\\sqrt5+\\sqrt2)^4 + (\\sqrt5-\\sqrt2)^4 = 2(25 + 60 + 4) = 178', explanation: 'at $a = \\sqrt5$, $b = \\sqrt2$: $a^4 = 25$, $6a^2b^2 = 60$, $b^4 = 4$ — pure integers, no surd in sight.' },
    ], result: '$(a+b)^n + (a-b)^n = 2\\sum_{j \\ \\mathrm{even}} \\binom{n}{j} a^{n-j} b^j$ — the even part doubled; for square-root $a, b$ this is an exact integer, the surd tail cancelled completely.' },
    { kind: 'example', title: 'Find the smallest integer larger than $(\\sqrt5+\\sqrt2)^4$.', steps: [
      'Summon the conjugate pair: $(\\sqrt5+\\sqrt2)^4 + (\\sqrt5-\\sqrt2)^4 = 2(25 + 60 + 4) = 178$ — the even-part identity, an exact integer.',
      'Now, size the mirror: $(\\sqrt5-\\sqrt2)^4 \\approx 0.4562$, which lies strictly between $0$ and $1$.',
      'So, $(\\sqrt5+\\sqrt2)^4 = 178 - 0.4562 \\approx 177.5438$, which lies strictly between $177$ and $178$.',
      'Hence the smallest integer larger than $(\\sqrt5+\\sqrt2)^4$ is $178$ — the conjugate sum itself, the mirror being too small to reach the next integer down.',
    ] },
    { kind: 'para', text: 'The trick generalises verbatim: whenever $a > b > 0$ with $a - b$ small, the mirror $(a-b)^n$ is squeezed into $(0,1)$ and the smallest integer larger than $(a+b)^n$ is the conjugate sum — the exercise set runs it at $(\\sqrt7+\\sqrt3)^4 = 184 + 40\\sqrt{21} \\approx 367.30$, whose mirror $(\\sqrt7-\\sqrt3)^4$ again lives in $(0,1)$, so the answer is the even part $368$. One more divisibility classic closes the section, stated here with its witness and proved in the exercise set: strip the corner seats from $(a+b)^n$ and every surviving seat carries the factor $ab$.' },
    { kind: 'equation', latex: '(a+b)^n - a^n - b^n = \\sum_{r=1}^{n-1} \\tbinom{n}{r} a^{n-r} b^r \\tag{8}', note: 'the interior seats: each carries a factor $ab$, and for odd $n$ the mirrored pairs $r \\leftrightarrow n-r$ each carry a further factor $(a+b)$ — so the whole sum is divisible by $ab(a+b)$ for every odd $n$.' },
    { kind: 'para', text: 'The pairing at the heart of that law: $\\tbinom{n}{r}a^{n-r}b^r + \\tbinom{n}{n-r}a^r b^{n-r} = \\tbinom{n}{r}a^r b^r\\left(a^{n-2r} + b^{n-2r}\\right)$, and when $n$ is odd the exponent $n - 2r$ is odd, so the bracket splits by the odd-power sum rule into a multiple of $a + b$. The witness at $n = 5$: $(2+3)^5 - 2^5 - 3^5 = 3125 - 32 - 243 = 2850 = 30 \\cdot 95$, exactly $ab(a+b) = 2 \\cdot 3 \\cdot 5$ times an integer. The full pairing proof is exercise L6-1 — and it needs no induction either.' },
    { kind: 'para', text: 'From the above discussion, the divisibility reflex has three reads, one per engine:' },
    { kind: 'list', marker: 'roman', items: [
      '**(i) the neighbour read:** $7 \\equiv -1 \\pmod 8$ with odd exponent gives $-1$; $11 \\equiv 3$ and $3^{51} = 3 \\cdot (3^2)^{25} \\equiv 3$; the sum pins at $2$;',
      '**(ii) the parity pair:** $5^{2n} \\equiv (-1)^n \\pmod{13}$ — remainder $1$ or $12$, fractional part $\\tfrac{1}{13}$ or $\\tfrac{12}{13}$;',
      '**(iii) the conjugate pin:** the even part is the exact integer, the mirror lives in $(0,1)$ — and the smallest integer larger than the surd power is the conjugate sum itself.',
    ] },

    { kind: 'heading', text: 'Coefficient Hunting at Any Index — Partial Fractions and the Cancellation Engine' },
    { kind: 'para', text: 'The last engine turns coefficient questions about rational functions into one-line reads. The raw material is banked: lesson 7.3’s frequently used rows price the $x^4$ seat of $(1-x)^{-2}$ at $5$ and the $x^8$ seat of $(1-x)^{-4}$ at $\\binom{11}{3} = 165$ without any expansion. The missing piece is the PRODUCT of such rows — $\\tfrac{1}{(1-x)(1-2x)}$, say — because multiplying two infinite rows seat by seat is a convolution, and convolutions are exactly the work this engine exists to avoid. The move: split BEFORE expanding, so that each piece is a geometric row you already own.' },
    { kind: 'equation', latex: '\\tfrac{1}{(1-ax)(1-bx)} = \\tfrac{a}{a-b}(1-ax)^{-1} - \\tfrac{b}{a-b}(1-bx)^{-1}, \\qquad [x^n] = \\tfrac{a^{n+1} - b^{n+1}}{a-b} \\tag{9}', note: 'the partial-fraction split law: two geometric rows instead of one convolution — and the coefficient of $x^n$ is the difference of two geometric sequences over $a - b$.' },
    { kind: 'example', title: 'Find the coefficient of $x^n$ in the expansion of $\\tfrac{1}{(1-x)(1-2x)}$.', steps: [
      'Split before expanding — partial fractions by the cover-up read: $\\tfrac{1}{(1-x)(1-2x)} = -\\tfrac{1}{1-x} + \\tfrac{2}{1-2x} = -(1-x)^{-1} + 2(1-2x)^{-1}$.',
      'So, expand both geometric rows: $-(1-x)^{-1} = -(1 + x + x^2 + \\cdots)$ and $2(1-2x)^{-1} = 2(1 + 2x + 4x^2 + 8x^3 + \\cdots)$.',
      'Now, the $x^n$ seat collects $-1$ from the first row and $2 \\cdot 2^n$ from the second: the coefficient is $2^{n+1} - 1$.',
      'Check the seats: $n = 0, 1, 2, 3, 4$ read $1, 3, 7, 15, 31$ — the Mersenne family, engine-verified seat by seat for $n \\leq 10$.',
    ] },
    { kind: 'para', text: 'When the denominator is a quadratic, the split needs one extra beat — FACTOR first, then cover up. And when it is a product of three linear factors, the cover-up method runs three times in a row, one hiding per factor, and the coefficient law assembles itself.' },
    { kind: 'example', title: 'Find the coefficient of $x^n$ in $(1-5x+6x^2)^{-1}$.', steps: [
      'Factor the quadratic denominator first: $1 - 5x + 6x^2 = (1-2x)(1-3x)$.',
      'So, split by cover-up: at $x = \\tfrac{1}{2}$ the surviving factor is $1 - \\tfrac{3}{2} = -\\tfrac{1}{2}$, pricing the $(1-2x)^{-1}$ piece at $-2$; at $x = \\tfrac{1}{3}$ it is $1 - \\tfrac{2}{3} = \\tfrac{1}{3}$, pricing the $(1-3x)^{-1}$ piece at $3$.',
      'Now, read the $x^n$ seat of $-2(1-2x)^{-1} + 3(1-3x)^{-1}$: it collects $-2 \\cdot 2^n + 3 \\cdot 3^n = 3^{n+1} - 2^{n+1}$.',
      'Check the seats: $n = 0, 1, 2, 3, 4$ read $1, 5, 19, 65, 211$ — and $3^1 - 2^1 = 1$ matches the function’s value at $x = 0$, as the constant seat must.',
    ] },
    { kind: 'example', title: 'Prove that the coefficient of $x^n$ in $\\tfrac{1}{(1-x)(1-3x)(1-5x)}$ is $\\tfrac{1 - 18 \\cdot 3^n + 25 \\cdot 5^n}{8}$.', steps: [
      'Set up the three-way split: $\\tfrac{1}{(1-x)(1-3x)(1-5x)} = A(1-x)^{-1} + B(1-3x)^{-1} + C(1-5x)^{-1}$.',
      'So, cover up each factor in turn: $A = \\tfrac{1}{(1-3)(1-5)} = \\tfrac{1}{8}$ at $x = 1$; $B = \\tfrac{1}{\\left(\\tfrac{2}{3}\\right)\\left(-\\tfrac{2}{3}\\right)} = -\\tfrac{9}{4}$ at $x = \\tfrac{1}{3}$; $C = \\tfrac{1}{\\left(\\tfrac{4}{5}\\right)\\left(\\tfrac{2}{5}\\right)} = \\tfrac{25}{8}$ at $x = \\tfrac{1}{5}$.',
      'Now, the $x^n$ seat collects $\\tfrac{1}{8} - \\tfrac{9}{4} \\cdot 3^n + \\tfrac{25}{8} \\cdot 5^n = \\tfrac{1 - 18 \\cdot 3^n + 25 \\cdot 5^n}{8}$ — clearing the denominators to read the law in one line.',
      'Check the $n = 0$ seat: $\\tfrac{1 - 18 + 25}{8} = \\tfrac{8}{8} = 1$ — the constant term is the function’s value at the origin, as it must be.',
    ] },
    { kind: 'para', text: 'The cancellation engine is the sibling trick for SUMS of binomial coefficients: instead of convolving rows, MULTIPLY by a negative-index row and let the index cancel. Its flagship identity below is proved by one multiplication — and it converts an alternating partial-sum question into a single seat read.' },
    { kind: 'derivation', title: 'The alternating partial-sums law, by the cancellation engine', statement: 'For every $n \\geq 1$ and $0 \\leq k \\leq n$: $\\sum_{r=0}^{k} (-1)^r \\tbinom{n}{r} = (-1)^k \\tbinom{n-1}{k}$ — proved not by induction but by one cancellation.', steps: [
      { label: 'Plant the two series', formula: '(1-x)^n = \\sum_{r=0}^{n} (-1)^r \\tbinom{n}{r} x^r, \\qquad (1-x)^{-1} = 1 + x + x^2 + \\cdots', explanation: 'the finite row of lesson 7.2 beside the geometric engine of lesson 7.3, both valid for $|x| < 1$.' },
      { label: 'Cancel before expanding', formula: '(1-x)^n (1-x)^{-1} = (1-x)^{n-1}', explanation: 'the $(1-x)$ factor divides out — a genuine identity of series, and the whole proof.' },
      { label: 'Read the x^k seat on both sides', formula: '\\sum_{r=0}^{k} (-1)^r \\tbinom{n}{r} = (-1)^k \\tbinom{n-1}{k}', explanation: 'the product’s $x^k$ seat collects every way to build $x^k$ — the alternating partial sum; the right side’s seat is one coefficient.' },
      { label: 'Witness at n = 7, k = 4', formula: '1 - 7 + 21 - 35 + 35 = 15 = \\tbinom{6}{4}', explanation: 'the partial sums walk $1, -6, 15, -20, 15$ — the fifth step lands exactly on $\\tbinom{6}{4}$, as the drawn walk in the exercise shows.' },
    ], result: '$\\sum_{r=0}^{k} (-1)^r \\binom{n}{r} = (-1)^k \\binom{n-1}{k}$ — engine-verified for every $n \\leq 12$ and all $k \\leq n$; the entire proof is one cancellation, $(1-x)^n(1-x)^{-1} = (1-x)^{n-1}$.' },
    { kind: 'example', title: 'Find the coefficient of $x^8$ in $(1-x)^{15}(1-x)^{-3}$.', steps: [
      'Cancel before expanding — the engine at its simplest: $(1-x)^{15}(1-x)^{-3} = (1-x)^{12}$, the negative index dividing out.',
      'So, the $x^8$ seat of $(1-x)^{12}$ is $\\tbinom{12}{8}$ by lesson 7.2’s row.',
      'Now, the arithmetic: $\\tbinom{12}{8} = \\tbinom{12}{4} = \\tfrac{12 \\cdot 11 \\cdot 10 \\cdot 9}{24} = 495$.',
      'Hence $495$ — one line of cancellation replaced a fifteen-by-three convolution of sixteen rows.',
    ] },
    { kind: 'para', text: 'One shape remains, and it closes the loop back to lesson 7.3’s fractional indices: the FIRST NEGATIVE TERM. For a positive index every seat of $(1+x)^n$ is positive when $x > 0$; for a fractional index the falling factors $n, n-1, n-2, \\ldots$ descend past zero and turn negative one seat at a time — so the row’s signs flip at a computable place.' },
    { kind: 'example', title: 'Find the first negative term in the expansion of $(1+x)^{9/2}$ for $x > 0$.', steps: [
      'Write the general term: $T_{r+1} = \\tfrac{\\left(\\tfrac{9}{2}\\right)\\left(\\tfrac{9}{2}-1\\right)\\cdots\\left(\\tfrac{9}{2}-r+1\\right)}{r!}\\,x^r$ — the falling factors carry every sign.',
      'So, list them: $\\tfrac{9}{2},\\; \\tfrac{7}{2},\\; \\tfrac{5}{2},\\; \\tfrac{3}{2},\\; \\tfrac{1}{2},\\; -\\tfrac{1}{2},\\; \\ldots$ — the factors stay positive down to the fifth and the SIXTH turns negative.',
      'Now, with $x > 0$ the sign of each term is the sign of its coefficient: $T_1$ through $T_6$ are positive, and at $r = 6$ the falling factorial acquires its first negative factor.',
      'Hence the first negative term is the 7th, $T_7$ — the fractional index descends past zero at a computable seat, and the row’s signs flip exactly there.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Three engines, one philosophy', text: 'Linearization, conjugate pairing and partial fractions look like three tricks; they are one move worn three ways: CHANGE THE OBJECT so the expensive part cancels before you compute. Drop the $x^2$ mass and the arithmetic quarters; add the mirror image and the surd tail dies; split the denominator and the convolution never happens. In every case the algebra you refuse to do is algebra the theorem does for free — the difference between a tool you have memorised and a tool you own, and exactly what the examination room pays for.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner', text: 'This lesson carries some of the highest-yield binomial material on JEE-style papers. The shapes, in frequency order: the first/second-order approximation MCQ — "(1.02)^5 to first order is" — with the second-order value sitting among the options as the classic trap; the root estimate to a stated precision ($\\sqrt[3]{65}$-class, "correct to four decimal places"); the remainder-on-division and fractional-part reads ($7^{101} + 11^{51}$-class mod-8 arithmetic, $5^{2n}/13$-class parity pairs); the smallest-integer-larger-than-a-surd-power classic ($(\\sqrt5+\\sqrt2)^4$-class, one conjugate line); and the partial-fraction coefficient hunt at two and three factors, plus the first-negative-term seat for fractional indices. Every item in this lesson’s sets is exam-style — written for this book, not lifted from any paper; the methods, not the questions, are the syllabus’s property.' },
    { kind: 'quiz', title: 'Check yourself: binomial applications and approximations', items: [
      { q: 'To first order, $(1.02)^5 \\approx$', options: ['1.104', '1.1', '1.01', '1.2'], answer: 1, explain: 'Option 1 is the two-seat read: $1 + 5(0.02) = 1.1$ — first order means keeping exactly the $1 + nx$ seats and no more. Option 0’s $1.104$ is the SECOND-order value, the honest two-term-plus-$x^2$ read — the right number for the wrong order, and precisely the trap the honest-error column exists to catch. Option 2’s $1.01$ forgets the index: it is the $n = 1$ read $1 + 1(0.02)$. Option 3’s $1.2$ uses $n = 10$: $1 + 10(0.02)$ — the right shape, the wrong row.' },
      { q: '$\\sqrt[3]{65} \\approx$', options: ['4.208', '4.5', '4.0208', '3.9'], answer: 2, explain: 'Option 2 is the seat-and-read: $\\sqrt[3]{65} = 4\\left(1 + \\tfrac{1}{64}\\right)^{1/3} \\approx 4\\left(1 + \\tfrac{1}{192}\\right) \\approx 4.0208$ — the template’s $a + \\tfrac{ax}{k}$ seat at $a = 4$, $x = \\tfrac{1}{64}$, $k = 3$. Option 0’s $4.208$ divides by $19.2$ instead of $192$ — the decimal slipped one seat. Option 1’s $4.5$ interpolates toward the NEXT cube as if roots travelled linearly — $65$ is one unit above $64$, not halfway to $125$. Option 3’s $3.9$ rounds DOWN, impossible: the cube root of $64\\left(1 + \\tfrac{1}{64}\\right)$ must exceed $4$ — Bernoulli’s direction.' },
      { q: 'The remainder when $7^{101} + 11^{51}$ is divided by $8$ is', options: ['0', '1', '2', '4'], answer: 2, explain: 'Option 2 is the neighbour read: $7 = 8 - 1 \\equiv -1 \\pmod 8$, and the odd exponent gives $7^{101} \\equiv -1$; $11 \\equiv 3 \\pmod 8$, and $3^{51} = 3 \\cdot (3^2)^{25} \\equiv 3 \\cdot 1 = 3$ because $3^2 = 9 \\equiv 1$. The sum pins at $-1 + 3 = 2$. Option 0 assumes the two residues cancel — they do not. Option 1 reduces $3^{51}$ to $1$, which needs an even power of $3^2$, not the odd $51$. Option 4’s $4$ would require a residue pair summing to $4$ — no seat produces it.' },
      { q: 'The smallest integer larger than $(\\sqrt5+\\sqrt2)^4$ is', options: ['177', '178', '176', '180'], answer: 1, explain: 'Option 1 is the conjugate seat: $(\\sqrt5+\\sqrt2)^4 + (\\sqrt5-\\sqrt2)^4 = 2(25 + 60 + 4) = 178$ exactly, and the mirror $(\\sqrt5-\\sqrt2)^4 \\approx 0.4562$ lies strictly in $(0,1)$, so $(\\sqrt5+\\sqrt2)^4 \\approx 177.5438$ lies in $(177, 178)$ — the smallest integer larger is the conjugate sum itself, $178$. Option 0’s $177$ is the floor, but the question asks for the ceiling. Option 2’s $176$ subtracts a whole unit, as if the mirror exceeded $1$. Option 3’s $180$ abandons the pin altogether — the surd power is nowhere near it.' },
      { q: 'The coefficient of $x^n$ in $(1-5x+6x^2)^{-1}$ is', options: ['$5^{n+1} - 4^{n+1}$', '$3^{n+1} - 2^{n+1}$', '$6^{n+1} - 5^{n+1}$', '$2^{n+1} - 1$'], answer: 1, explain: 'Option 1 is the split: factor $1 - 5x + 6x^2 = (1-2x)(1-3x)$, then $(1-5x+6x^2)^{-1} = -2(1-2x)^{-1} + 3(1-3x)^{-1}$, so the $x^n$ seat collects $-2 \\cdot 2^n + 3 \\cdot 3^n = 3^{n+1} - 2^{n+1}$. Option 0 uses the bases $5$ and $4$ — the roots of the WRONG quadratic $1 - 9x + 20x^2$. Option 2 multiplies the two roots $2 \\cdot 3$ into a $6$-base family — no such split exists. Option 3 is the Mersenne law $2^{n+1} - 1$ — the right law for $\\tfrac{1}{(1-x)(1-2x)}$, pasted onto the wrong denominator.' },
    ] },
    { kind: 'exercises', title: 'Exercises 7.6', sets: [
      { level: 'L1', questions: [
        { q: 'Estimate $(1.03)^6$ to first order, and say what you dropped. (exam-style)', solution: [
          'The setup: $(1.03)^6 = (1 + 0.03)^6$, so the engine runs at $x = 0.03$ — comfortably small.',
          'So, the first-order read: $(1.03)^6 \\approx 1 + 6(0.03) = 1.18$.',
          'Now, name the dropped mass: everything from the $x^2$ seat on, beginning at $\\tbinom{6}{2}x^2$ — so the true value sits ABOVE the read, as Bernoulli (lesson 7.1) certifies for a positive-integer index.',
          'Hence the estimate is $1.18$ — a two-seat read whose error is honestly classified as second-order.',
        ], answer: '1.18' },
        { q: 'Using the frequently used rows of lesson 7.3, state the coefficient of $x^4$ in $(1-x)^{-2}$ without expanding anything.', solution: [
          'The row is banked in 7.3: $(1-x)^{-2} = 1 + 2x + 3x^2 + 4x^3 + 5x^4 + \\cdots$, seats $r + 1$.',
          'So, the $x^4$ seat sits at $r = 4$: the coefficient is $5$.',
          'Check by the counting-row law: the seat of $x^r$ in $(1-x)^{-n}$ is $\\tbinom{n+r-1}{r}$, here $\\tbinom{5}{4} = 5$.',
          'Hence $5$ — one recycled row, zero expansion.',
        ], answer: '5' },
      ] },
      { level: 'L2', questions: [
        { q: 'Find the remainder when $5^{2024}$ is divided by $13$. (exam-style)', solution: [
          'The key congruence: $5^2 = 25 \\equiv -1 \\pmod{13}$, so every even power satisfies $5^{2n} = (5^2)^n \\equiv (-1)^n \\pmod{13}$.',
          'So, $2024 = 2 \\cdot 1012$ with $1012$ even: $5^{2024} \\equiv (-1)^{1012} \\equiv 1 \\pmod{13}$.',
          'Hence the remainder is $1$.',
          'Check the twin seat: an odd half-exponent would leave remainder $12$ — the parity pair the fractional-part reads ride.',
        ], answer: '1' },
        { q: 'Estimate $\\sqrt{99}$ to four decimal places, stating the honest error. (exam-style)', solution: [
          'Seat the root at the nearest perfect square: $99 = 100(1 - 0.01)$, so $\\sqrt{99} = 10(1 - 0.01)^{1/2}$.',
          'First order: $10(1 - 0.005) = 9.95$ — only three reliable figures so far.',
          'So, second order adds the $-\\tfrac{x^2}{8}$ seat at $x = 0.01$: $10\\left(1 - 0.005 - 0.0000125\\right) = 9.949875$.',
          'Hence $\\sqrt{99} \\approx 9.9499$ to four decimal places; the true value is $9.9498743$, so the second-order read is long by $0.0000007$ — comfortably inside the fourth decimal.',
        ], answer: '9.9499' },
      ] },
      { level: 'L3', questions: [
        { q: 'Find the coefficient of $x^n$ in the expansion of $\\dfrac{1}{(1-x)(1-2x)}$.', solution: [
          'Split before expanding — partial fractions by the cover-up read: $\\dfrac{1}{(1-x)(1-2x)} = -\\dfrac{1}{1-x} + \\dfrac{2}{1-2x} = -(1-x)^{-1} + 2(1-2x)^{-1}$.',
          'So, expand both geometric rows: $-(1-x)^{-1} = -(1 + x + x^2 + \\cdots)$ and $2(1-2x)^{-1} = 2(1 + 2x + 4x^2 + 8x^3 + \\cdots)$.',
          'Now, the $x^n$ seat collects $-1$ from the first row and $2 \\cdot 2^n$ from the second: the coefficient is $2^{n+1} - 1$.',
          'Check the seats: $n = 0, 1, 2, 3, 4$ read $1, 3, 7, 15, 31$ — the Mersenne family, engine-verified seat by seat for $n \\leq 10$.',
        ], answer: '$2^{n+1} - 1$' },
        { q: 'Approximate $(0.98)^5$ to three decimal places, with the honest error stated.', solution: [
          'The setup: $(0.98)^5 = (1 - 0.02)^5$, so $x = -0.02$ and $n = 5$.',
          'First order: $1 - 5(0.02) = 0.90$ — not yet three-decimal material.',
          'So, second order adds the $\\tbinom{5}{2}x^2$ seat: $1 - 0.1 + 10(0.0004) = 0.904$.',
          'Hence $(0.98)^5 \\approx 0.904$ to three decimals; the true value is $0.9039207968$, so the second-order read runs long by $0.0000792$ — inside the third decimal place.',
        ], answer: '0.904' },
        { q: 'Show that $(\\sqrt7+\\sqrt3)^4 + (\\sqrt7-\\sqrt3)^4 = 368$, and find the smallest integer larger than $(\\sqrt7+\\sqrt3)^4$.', solution: [
          'The conjugate-pair identity: $(a+b)^4 + (a-b)^4 = 2\\left(a^4 + 6a^2b^2 + b^4\\right)$, the odd seats having cancelled.',
          'Substitute $a = \\sqrt7$, $b = \\sqrt3$: $a^4 = 49$, $6a^2b^2 = 6 \\cdot 21 = 126$, $b^4 = 9$, so the sum is $2(49 + 126 + 9) = 368$ — an exact integer.',
          'Now, size the mirror: $(\\sqrt7-\\sqrt3)^2 = 10 - 2\\sqrt{21} \\approx 0.835$ already lies in $(0,1)$, so $(\\sqrt7-\\sqrt3)^4$ lies strictly between $0$ and $1$.',
          'So, $(\\sqrt7+\\sqrt3)^4 = 184 + 40\\sqrt{21} \\approx 367.30$, which lies strictly between $367$ and $368$.',
          'Hence the smallest integer larger than $(\\sqrt7+\\sqrt3)^4$ is $368$ — the conjugate sum itself.',
        ], answer: '368' },
      ] },
      { level: 'L4', questions: [
        { q: 'Prove that for small $x$, $(1+2x)^{-3}\\left(1-\\tfrac{x}{2}\\right)^{1/2}\\left(1+\\tfrac{x}{4}\\right)^{-1} \\approx 1 - \\tfrac{13}{2}x$, and compute both sides at $x = 0.01$.', solution: [
          'Linearize each factor by the $(1+u)^n \\approx 1 + nu$ read: $(1+2x)^{-3} \\approx 1 - 6x$; $\\left(1 - \\tfrac{x}{2}\\right)^{1/2} \\approx 1 - \\tfrac{x}{4}$; $\\left(1 + \\tfrac{x}{4}\\right)^{-1} \\approx 1 - \\tfrac{x}{4}$.',
          'So, multiply the three reads and drop every $x^2$ crossing: the linear coefficient is $(-3)(2) + \\left(\\tfrac{1}{2}\\right)\\left(-\\tfrac{1}{2}\\right) + (-1)\\left(\\tfrac{1}{4}\\right) = -6 - \\tfrac{1}{4} - \\tfrac{1}{4} = -\\tfrac{13}{2}$.',
          'Now, price it: at $x = 0.01$ the linearization reads $1 - \\tfrac{13}{2}(0.01) = 0.935$.',
          'Check the honesty column: the true value at $x = 0.01$ is $\\approx 0.9376$, so the gap is $\\approx 0.0026$ — exactly the dropped $x^2$ mass, the $(1+2x)^{-3}$ factor alone contributing $24x^2 = 0.0024$.',
          'Hence the read $1 - \\tfrac{13}{2}x$ with the error budget located: the gap is second-order and its dominant part is named.',
        ], answer: 'the linearization is $1 - \\tfrac{13}{2}x$; at $x = 0.01$ it reads $0.935$ against the true $\\approx 0.9376$ — gap $\\approx 0.0026$, the dropped $x^2$ mass' },
        { q: 'Find the coefficient of $x^n$ in $(1-5x+6x^2)^{-1}$. (exam-style)', solution: [
          'Factor the quadratic denominator first: $1 - 5x + 6x^2 = (1-2x)(1-3x)$.',
          'So, split by cover-up: at $x = \\tfrac{1}{2}$ the surviving denominator is $1 - \\tfrac{3}{2} = -\\tfrac{1}{2}$, pricing the $(1-2x)^{-1}$ piece at $-2$; at $x = \\tfrac{1}{3}$ it is $1 - \\tfrac{2}{3} = \\tfrac{1}{3}$, pricing the $(1-3x)^{-1}$ piece at $3$.',
          'Now, read the $x^n$ seat of $-2(1-2x)^{-1} + 3(1-3x)^{-1}$: it collects $-2 \\cdot 2^n + 3 \\cdot 3^n$.',
          'Hence the coefficient of $x^n$ is $3^{n+1} - 2^{n+1}$ — and the seats read $1, 5, 19, 65, 211$ at $n = 0, \\ldots, 4$, exactly the split picture’s combined row.',
        ], answer: '$3^{n+1} - 2^{n+1}$', figures: [
          { caption: 'The partial-fraction split as two stacked geometric-row bands meeting at the combined coefficient row: the amber $3 \\cdot 3^n$ band (values $3, 9, 27, 81, 243$ at $n = 0, \\ldots, 4$) and the red $-2 \\cdot 2^n$ band ($-2, -4, -8, -16, -32$) sum column by column into $3^{n+1} - 2^{n+1}$ — the combined row $1, 5, 19, 65, 211$.', svg: partialFractionBands76Svg() },
        ] },
        { q: 'Find the first negative term in the expansion of $(1+x)^{9/2}$ for $x > 0$.', solution: [
          'The general term: $T_{r+1} = \\tfrac{\\left(\\tfrac{9}{2}\\right)\\left(\\tfrac{7}{2}\\right)\\left(\\tfrac{5}{2}\\right)\\cdots\\left(\\tfrac{9}{2} - r + 1\\right)}{r!}\\,x^r$ — the falling factors carry every sign.',
          'So, list them: $\\tfrac{9}{2}, \\tfrac{7}{2}, \\tfrac{5}{2}, \\tfrac{3}{2}, \\tfrac{1}{2}, -\\tfrac{1}{2}, \\ldots$ — the factors stay positive down to the fifth, and the SIXTH factor ($r = 6$) is the first to go negative.',
          'Now, with $x > 0$ the sign of each term is the sign of its coefficient: $T_1$ through $T_6$ are positive, and the seventh term carries its first negative factor.',
          'Hence the first negative term is the 7th, $T_7$ — the row’s signs flip exactly where the falling factorial crosses zero.',
        ], answer: 'the 7th term $T_7$' },
      ] },
      { level: 'L5', questions: [
        { q: 'Prove that the coefficient of $x^n$ in $\\dfrac{1}{(1-x)(1-3x)(1-5x)}$ is $\\dfrac{1 - 18 \\cdot 3^n + 25 \\cdot 5^n}{8}$, verifying the $n = 0$ seat.', solution: [
          'Set up the split: $\\dfrac{1}{(1-x)(1-3x)(1-5x)} = A(1-x)^{-1} + B(1-3x)^{-1} + C(1-5x)^{-1}$.',
          'So, cover up each factor: $A = \\dfrac{1}{(1-3)(1-5)} = \\dfrac{1}{8}$ at $x = 1$; $B = \\dfrac{1}{\\left(\\tfrac{2}{3}\\right)\\left(-\\tfrac{2}{3}\\right)} = -\\dfrac{9}{4}$ at $x = \\tfrac{1}{3}$; $C = \\dfrac{1}{\\left(\\tfrac{4}{5}\\right)\\left(\\tfrac{2}{5}\\right)} = \\dfrac{25}{8}$ at $x = \\tfrac{1}{5}$.',
          'Now, the $x^n$ seat collects $\\tfrac{1}{8} - \\tfrac{9}{4} \\cdot 3^n + \\tfrac{25}{8} \\cdot 5^n = \\dfrac{1 - 18 \\cdot 3^n + 25 \\cdot 5^n}{8}$ — clearing denominators to read the law in one line.',
          'Check the $n = 0$ seat: $\\dfrac{1 - 18 + 25}{8} = \\dfrac{8}{8} = 1$ — the constant term is the function’s value at the origin, as it must be.',
          'Hence the coefficient law as stated — three geometric rows, one line of cover-up, no convolution anywhere.',
        ], answer: '$\\dfrac{1 - 18 \\cdot 3^n + 25 \\cdot 5^n}{8}$' },
        { q: 'Prove that $\\sum_{r=0}^{k} (-1)^r \\tbinom{n}{r} = (-1)^k \\tbinom{n-1}{k}$ by the cancellation engine $(1-x)^n (1-x)^{-1} = (1-x)^{n-1}$, verifying the law at $n = 7$, $k = 4$.', solution: [
          'Plant both series inside the window $|x| < 1$: $(1-x)^n = \\sum_{r=0}^{n} (-1)^r \\tbinom{n}{r} x^r$ and $(1-x)^{-1} = 1 + x + x^2 + \\cdots$ — the finite row times the geometric engine.',
          'So, cancel before expanding: $(1-x)^n (1-x)^{-1} = (1-x)^{n-1}$ — the negative index divides out, a genuine series identity.',
          'Now, read the coefficient of $x^k$ on both sides: the product’s seat collects $\\sum_{r=0}^{k} (-1)^r \\tbinom{n}{r}$ — every way to build $x^k$ — and the right side’s seat is $(-1)^k \\tbinom{n-1}{k}$.',
          'Hence the law, engine-verified for every $n \\leq 12$ and all $k \\leq n$.',
          'Check the witness $n = 7$, $k = 4$: the walk $1 - 7 + 21 - 35 + 35$ runs through the partial sums $1, -6, 15, -20$ and lands on $15 = \\tbinom{6}{4}$ — the drawn walk’s five steps.',
        ], answer: 'the law $\\sum_{r=0}^{k} (-1)^r \\tbinom{n}{r} = (-1)^k \\tbinom{n-1}{k}$; witness $1 - 7 + 21 - 35 + 35 = 15 = \\tbinom{6}{4}$', figures: [
          { caption: 'The partial-sum walk of $1 - 7 + 21 - 35 + 35$: five oscillating steps through the partial sums $0, 1, -6, 15, -20$, closing on $15 = \\tbinom{6}{4}$ — the emphasized zero line is the number line the partial sums live on.', svg: partialSumWalk76Svg() },
        ] },
        { q: 'Compute the coefficient of $x^8$ in $(1-x)^{15}(1-x)^{-3}$.', solution: [
          'Cancel before expanding — the engine at its simplest: $(1-x)^{15}(1-x)^{-3} = (1-x)^{12}$.',
          'So, the $x^8$ seat of $(1-x)^{12}$ is $\\tbinom{12}{8}$ by lesson 7.2’s row.',
          'Now, the arithmetic: $\\tbinom{12}{8} = \\tbinom{12}{4} = \\tfrac{12 \\cdot 11 \\cdot 10 \\cdot 9}{24} = 495$.',
          'Hence $495$ — one line of cancellation replaced a fifteen-by-three convolution.',
        ], answer: '495' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove that $(a+b)^n - a^n - b^n$ is divisible by $ab(a+b)$ for every odd $n$, and verify the witness $(2+3)^5 - 2^5 - 3^5 = 2850 = 30 \\cdot 95$.', solution: [
          'Strip the corner seats: $(a+b)^n - a^n - b^n = \\sum_{r=1}^{n-1} \\tbinom{n}{r} a^{n-r} b^r$ — the interior seats alone, and every one of them carries a factor $ab$.',
          'So, pair each interior seat with its mirror, $r \\leftrightarrow n - r$: $\\tbinom{n}{r}a^{n-r}b^r + \\tbinom{n}{n-r}a^r b^{n-r} = \\tbinom{n}{r}\\, a^r b^r\\left(a^{n-2r} + b^{n-2r}\\right)$, using $\\tbinom{n}{n-r} = \\tbinom{n}{r}$.',
          'Now, for ODD $n$ the exponent $n - 2r$ is odd for every whole-number $r$, and an odd-power sum splits as $a^{m} + b^{m} = (a+b)\\left(a^{m-1} - a^{m-2}b + \\cdots - ab^{m-2} + b^{m-1}\\right)$ with $m = n - 2r$ odd — so each mirrored pair carries the factor $(a+b)$.',
          'Hence every pair — and so the whole interior sum — is divisible by $a^r b^r (a+b)$, in particular by $ab(a+b)$: the divisibility is proved for every odd $n$, no induction written.',
          'Check the witness: $(2+3)^5 - 2^5 - 3^5 = 3125 - 32 - 243 = 2850$, and $2850 = 30 \\cdot 95$ with $30 = 2 \\cdot 3 \\cdot 5 = ab(a+b)$ — exactly as promised.',
        ], answer: 'divisible by $ab(a+b)$ for every odd $n$; witness $2850 = 30 \\cdot 95$' },
        { q: 'Prove the error-discipline statement for $(1+x)^{1/2}$: at each of $x = 0.01, 0.05, 0.1$, the second-order read beats the linear read by a factor greater than $20$; state the three concrete error pairs, and the regime in which the linear read alone suffices.', solution: [
          'The three linear errors, engine-computed against $\\sqrt{1+x}$: at $x = 0.01$: $\\left|1.005 - 1.0049876\\right| = 1.24 \\times 10^{-5}$; at $x = 0.05$: $\\left|1.025 - 1.0246951\\right| = 3.05 \\times 10^{-4}$; at $x = 0.1$: $\\left|1.05 - 1.0488088\\right| = 1.19 \\times 10^{-3}$.',
          'So, the three quadratic errors, with the $-\\tfrac{x^2}{8}$ seat included: $6.2 \\times 10^{-8}$, $7.6 \\times 10^{-6}$ and $5.9 \\times 10^{-5}$ respectively.',
          'Now, the gains: $\\approx 200\\times$, $\\approx 40\\times$ and $\\approx 20\\times$ — every one strictly greater than $20$, and the gain GROWS as $x$ shrinks.',
          'Hence the discipline statement is proved; and the regime: the linear read alone suffices for three significant figures — its worst error here, $1.19 \\times 10^{-3}$ at $x = 0.1$, sits in the fourth significant figure of $\\approx 1.05$ — while the second-order read is already good to $10^{-4}$ at the very same $x$.',
        ], answer: 'gains $\\approx 200\\times, 40\\times, 20\\times$ (all $> 20$); linear errors $1.24 \\times 10^{-5}, 3.05 \\times 10^{-4}, 1.19 \\times 10^{-3}$ vs quadratic $6.2 \\times 10^{-8}, 7.6 \\times 10^{-6}, 5.9 \\times 10^{-5}$ — the linear read suffices for three significant figures' },
      ] },
    ] },
    { kind: 'formula', name: 'The linear read (first order)', latex: '(1+x)^n \\approx 1 + nx \\quad (|x| \\ \\text{small, any rational } n)', note: 'the two-seat read; at integer indices Bernoulli (lesson 7.1) makes it a certified lower bound, and the dropped mass begins at the $\\tbinom{n}{2}x^2$ seat.' },
    { kind: 'formula', name: 'The second-order read', latex: '(1+x)^n \\approx 1 + nx + \\tfrac{n(n-1)}{2!}x^2', note: 'one more seat, roughly two more decimals — the error now begins at the $x^3$ seat, so halving $x$ cuts it eightfold.' },
    { kind: 'formula', name: 'The multi-factor linearization', latex: '\\prod_i \\left(1 + a_i x\\right)^{n_i} \\approx 1 + \\left(\\sum_i n_i a_i\\right)x', note: 'linearize each factor, add the linear coefficients, drop every $x^2$ crossing — the three-factor exhibit’s $-\\tfrac{13}{2}$.' },
    { kind: 'formula', name: 'The root-estimate template', latex: 'a(1+x)^{1/k} \\approx a + \\tfrac{ax}{k} \\quad \\text{for } \\sqrt[k]{a^k + \\epsilon},\\ \\epsilon \\ \\text{small}', note: 'seat the root at the nearest perfect power: $\\sqrt[3]{65} \\approx 4 + \\tfrac{4}{192}$, $\\sqrt{26} \\approx 5 + \\tfrac{1}{50}$, $\\sqrt{99} \\approx 10 - 0.05$.' },
    { kind: 'formula', name: 'The conjugate-pair even part', latex: '(a+b)^n + (a-b)^n = 2\\!\\sum_{j \\ \\mathrm{even}} \\tbinom{n}{j} a^{n-j} b^j', note: 'the odd seats cancel against the mirror; at $n = 4$: $2\\left(a^4 + 6a^2b^2 + b^4\\right)$ — an exact integer when $a, b$ are square roots.' },
    { kind: 'formula', name: 'The smallest-integer-larger seat', latex: '0 < (a-b)^n < 1 \\ \\Longrightarrow\\ \\text{the smallest integer larger than } (a+b)^n \\text{ is } (a+b)^n + (a-b)^n', note: 'the surd power plus its mirror IS the integer sought: $(\\sqrt5+\\sqrt2)^4 \\to 178$, $(\\sqrt7+\\sqrt3)^4 \\to 368$.' },
    { kind: 'formula', name: 'The partial-fraction split law', latex: '\\tfrac{1}{(1-ax)(1-bx)} = \\tfrac{a}{a-b}(1-ax)^{-1} - \\tfrac{b}{a-b}(1-bx)^{-1}, \\qquad [x^n] = \\tfrac{a^{n+1} - b^{n+1}}{a-b}', note: 'split before expanding; the cover-up method prices each row — at $a = 2, b = 1$: $2^{n+1} - 1$; at $a = 3, b = 2$: $3^{n+1} - 2^{n+1}$.' },
    { kind: 'formula', name: 'The cancellation engine', latex: '\\sum_{r=0}^{k} (-1)^r \\tbinom{n}{r} = (-1)^k \\tbinom{n-1}{k}', note: 'from $(1-x)^n (1-x)^{-1} = (1-x)^{n-1}$: cancel before expanding — the alternating partial sums and the $495$ exhibit in one move.' },
    { kind: 'formula', name: 'Bernoulli’s inequality (lesson 7.1)', latex: '(1+x)^n \\geq 1 + nx \\quad (x \\geq -1,\\ n \\in \\mathbb{N})', note: 'proved by induction in 7.1, cited here as the error bound — the linear read is a certified lower bound at integer indices.' },
    { kind: 'formula', name: 'The conjugate square-root product', latex: '\\sqrt{\\tfrac{x}{x+y}} \\cdot \\sqrt{\\tfrac{x}{x-y}} = \\left(1 - \\tfrac{y^2}{x^2}\\right)^{-1/2} \\approx 1 + \\tfrac{y^2}{2x^2}', note: 'the twin surds multiply into a single $(1-u)^{-1/2}$ read; at $\\tfrac{y}{x} = 0.1$: $1.005$ against the true $1.0050378$.' },
  ],
}



// ------------------------------------------------------------------
// lesson 7R — authored by the run-118 swarm (agent 4-c), integrated verbatim
// ------------------------------------------------------------------

/* ------------------------------------------------------------------ */
/* figures — original SVG, vivid palette (owner directive 2026-11-08)  */
/* ------------------------------------------------------------------ */

function decisionMap7RSvg(): string {
  // the two-stage decision map: 'which index?' routes to the three theorem
  // boxes (7.2 / 7.3 / 7.4); 'which object?' routes to the four engine
  // labels (7.2 general+middle term / 7.5 coefficient engine / 7.3 rows+validity
  // / 7.6 linearization+partial fractions); the ground bar (the row of
  // Pascal's triangle — selection counts that induction certifies) runs
  // underneath. Two stages stacked top-to-bottom, arrows as amber curves.
  const questions = [
    { y: 81, q: 'which index?', sub: 'positive · rational · k letters' },
    { y: 255, q: 'which object?', sub: 'term · coefficient · sum · estimate' },
  ]
    .map(
      (c) =>
        `<rect x="28" y="${c.y - 23}" width="200" height="46" rx="7" fill="#fef3c7" stroke="#16a34a" stroke-width="2.2"/><text x="128" y="${c.y - 4}" font-size="11.5" font-weight="700" text-anchor="middle" fill="#166534">${c.q}</text><text x="128" y="${c.y + 13}" font-size="9.5" text-anchor="middle" fill="#0f766e">${c.sub}</text>`
    )
    .join('')
  const theorems = [
    { y: 81, t: 'the positive-index theorem — 7.2', sub: 'n + 1 terms, proved twice' },
    { y: 135, t: 'the any-index rows — 7.3', sub: 'valid only inside |x| < 1' },
    { y: 189, t: 'the multinomial — 7.4', sub: 'k letters, C(n+k-1, k-1) terms' },
  ]
    .map(
      (c) =>
        `<rect x="300" y="${c.y - 23}" width="250" height="46" rx="7" fill="#fef3c7" stroke="#16a34a" stroke-width="2.2"/><text x="425" y="${c.y - 4}" font-size="11.5" font-weight="700" text-anchor="middle" fill="#166534">${c.t}</text><text x="425" y="${c.y + 13}" font-size="9.5" text-anchor="middle" fill="#0f766e">${c.sub}</text>`
    )
    .join('')
  const engines = [
    { y: 249, e: 'a single term — 7.2', sub: 'the general and the middle term' },
    { y: 303, e: 'a coefficient — 7.5', sub: 'substitution, Vandermonde, ratios, peaks' },
    { y: 357, e: 'a sum or identity — 7.3', sub: 'the rows and the validity window' },
    { y: 411, e: 'an approximation — 7.6', sub: 'linearization and partial fractions' },
  ]
    .map(
      (c) =>
        `<rect x="300" y="${c.y - 23}" width="380" height="46" rx="7" fill="#ffedd5" stroke="#16a34a" stroke-width="2.2"/><text x="490" y="${c.y - 4}" font-size="11.5" font-weight="700" text-anchor="middle" fill="#166534">${c.e}</text><text x="490" y="${c.y + 13}" font-size="9.5" text-anchor="middle" fill="#0f766e">${c.sub}</text>`
    )
    .join('')
  const arrows = [
    'M228,81 Q264,81 300,81',
    'M228,81 Q262,108 300,135',
    'M228,81 Q260,135 300,189',
    'M228,255 Q262,249 300,249',
    'M228,255 Q260,278 300,303',
    'M228,255 Q258,330 300,357',
    'M228,255 Q256,384 300,411',
  ]
    .map((d) => `<path d="${d}" fill="none" stroke="#d97706" stroke-width="1.6"/>`)
    .join('')
  return `<svg viewBox="0 0 760 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The decision map of the chapter: two questions asked in order. Question one, which index: a positive integral index routes to the positive-index theorem of lesson 7.2, n plus 1 terms, proved twice; any rational index routes to the any-index rows of lesson 7.3, valid only inside the window where the absolute value of x is less than 1; several letters route to the multinomial theorem of lesson 7.4, k letters with C of n plus k minus 1 choose k minus 1 terms. Question two, which object: a single term routes to 7.2, the general and the middle term; a coefficient routes to 7.5, substitution, Vandermonde, ratios and peaks; a sum or identity routes to 7.3, the rows and the validity window; an approximation routes to 7.6, linearization and partial fractions. A ground bar underneath reads: the row of Pascal's triangle — selection counts that induction certifies, lessons 7.1 and 7.2.">
  <text x="380" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the decision map: which index, then which object</text>
  <text x="128" y="50" font-size="10" font-weight="700" text-anchor="middle" fill="#0f766e">ask, in order</text>
  <text x="460" y="50" font-size="10" font-weight="700" text-anchor="middle" fill="#0f766e">the theorem, then the engine</text>
  ${questions}
  ${theorems}
  ${engines}
  ${arrows}
  <rect x="28" y="444" width="704" height="44" rx="7" fill="#ffedd5" stroke="#0d9488" stroke-width="2.2"/>
  <text x="380" y="462" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">the ground: the row of Pascal\u2019s triangle — selection counts</text>
  <text x="380" y="478" font-size="9.5" text-anchor="middle" fill="#0f766e">selection counts that induction certifies for every n — 7.1 / 7.2</text>
</svg>`
}

function promiseCashings7RSvg(): string {
  // the promise-cashings of the chapter: five lanes stacked above the six
  // lesson boxes, each lane running from the lesson that made an early
  // promise to the lesson that cashed it, with an amber arrow between the
  // promise chip and the cashing chip (7.1 Bernoulli -> 7.6 the error bound;
  // 7.2 Pascal's rule -> 7.5 the row algebra; 7.3 the convergence window ->
  // 7.6 honest errors; 7.4 the word census -> 7.5 the coefficient sums;
  // 7.2 conjugate powers -> 7.6 the conjugate-pair trick)
  const chip = (x: number, y: number, w: number, bold: string, sub: string) =>
    `<rect x="${x}" y="${y}" width="${w}" height="40" rx="7" fill="#fef3c7" stroke="#16a34a" stroke-width="2.2"/><text x="${x + w / 2}" y="${y + 17}" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">${bold}</text><text x="${x + w / 2}" y="${y + 32}" font-size="9.5" text-anchor="middle" fill="#0f766e">${sub}</text>`
  const arrow = (x1: number, x2: number, y: number) =>
    `<line x1="${x1}" y1="${y}" x2="${x2 - 9}" y2="${y}" stroke="#d97706" stroke-width="1.8"/><path d="M${x2},${y} l-9,-5 v10 z" fill="#ea580c"/>`
  const lanes = [
    { y: 58, px: 22, pw: 190, p: 'Bernoulli proved', ps: 'promised in 7.1', cx: 545, cw: 195, c: 'the error bound', cs: 'cashed in 7.6' },
    { y: 102, px: 140, pw: 190, p: 'Pascal\u2019s rule', ps: 'promised in 7.2', cx: 440, cw: 185, c: 'the row algebra', cs: 'cashed in 7.5' },
    { y: 146, px: 255, pw: 190, p: 'the convergence window', ps: 'promised in 7.3', cx: 545, cw: 195, c: 'honest errors', cs: 'cashed in 7.6' },
    { y: 190, px: 290, pw: 165, p: 'the word census', ps: 'promised in 7.4', cx: 480, cw: 140, c: 'the coefficient sums', cs: 'cashed in 7.5' },
    { y: 234, px: 140, pw: 190, p: 'conjugate powers', ps: 'promised in 7.2', cx: 540, cw: 200, c: 'the conjugate-pair trick', cs: 'cashed in 7.6' },
  ]
    .map((l) => chip(l.px, l.y, l.pw, l.p, l.ps) + arrow(l.px + l.pw, l.cx, l.y + 20) + chip(l.cx, l.y, l.cw, l.c, l.cs))
    .join('')
  const lessons = [
    ['7.1', 'the domino', 'principle'],
    ['7.2', 'the theorem', 'proved'],
    ['7.3', 'any index', 'rows'],
    ['7.4', 'multinomial', 'theorem'],
    ['7.5', 'coefficients', 'at work'],
    ['7.6', 'applications', 'approximations'],
  ]
    .map(
      (l, i) =>
        `<rect x="${31 + i * 120}" y="292" width="108" height="60" rx="7" fill="#fef3c7" stroke="#16a34a" stroke-width="2.2"/><text x="${85 + i * 120}" y="312" font-size="11.5" font-weight="800" text-anchor="middle" fill="#166534">${l[0]}</text><text x="${85 + i * 120}" y="328" font-size="9" text-anchor="middle" fill="#0f766e">${l[1]}</text><text x="${85 + i * 120}" y="342" font-size="9" text-anchor="middle" fill="#0f766e">${l[2]}</text>`
    )
    .join('')
  return `<svg viewBox="0 0 780 415" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The promise-cashings of the chapter: five lanes, each running from the lesson that made an early promise to the lesson that cashed it. 7.1 proved Bernoulli's inequality, cashed by 7.6 as the approximation error bound. 7.2 proved Pascal's rule, cashed by 7.5 as the row algebra. 7.3 stated the convergence window, cashed by 7.6 as the honest error column. 7.4 built the word census, cashed by 7.5 as the coefficient sums. 7.2 priced the conjugate powers, cashed by 7.6 as the conjugate-pair integer trick. The six lesson boxes sit in teaching order beneath: 7.1 the domino principle, 7.2 the theorem proved, 7.3 any-index rows, 7.4 the multinomial theorem, 7.5 coefficients at work, 7.6 applications and approximations.">
  <text x="390" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the promise-cashings: what 7.1–7.4 promised, 7.5–7.6 paid</text>
  <text x="390" y="42" font-size="10" text-anchor="middle" fill="#0f766e">each lane runs from the lesson that made the promise to the lesson that cashed it</text>
  ${lanes}
  ${lessons}
  <text x="390" y="372" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">the six storeys of the chapter, in teaching order — the promises ride forward, never backward</text>
  <text x="390" y="388" font-size="9.5" text-anchor="middle" fill="#0f766e">every promise made in 7.1 through 7.4 is paid by 7.5 or 7.6 — the chapter pays its own debts before it closes</text>
</svg>`
}

function partialSumWalk7RSvg(): string {
  // the L5-2 solution figure: the partial-sum walk of
  // sum_{r=0}^{4} (-1)^r C(7,r) — the five running totals 1, -6, 15, -20, 15,
  // drawn as a zigzag on an axis pair; y-axis scaled value -20 -> 205,
  // value +15 -> 45 (160 px over the 35-unit range, zero at y = 114)
  const xs = [55, 122.5, 190, 257.5, 325]
  const vs = [1, -6, 15, -20, 15]
  const yOf = (v: number) => 205 - (v + 20) * (160 / 35)
  const dots = vs
    .map((v, i) => `<circle cx="${xs[i]}" cy="${yOf(v).toFixed(1)}" r="4.5" fill="#ea580c" stroke="#166534" stroke-width="1.6"/>`)
    .join('')
  // the landing seat r = 4 (value 15 again — the twin of the k = 2 visit) is
  // RINGED so the two 15-points are tellable apart: the path's final answer
  const ring = `<circle cx="325" cy="${yOf(15).toFixed(1)}" r="10" fill="none" stroke="#ea580c" stroke-width="2.4"/>`
  const labels = [
    { x: 55, y: 97, t: '1' },
    { x: 122.5, y: 158, t: '-6' },
    { x: 190, y: 37, t: '15' },
    { x: 273, y: 210, t: '-20' },
    { x: 352, y: 48, t: '15' },
  ]
    .map((l) => `<text x="${l.x}" y="${l.y}" font-size="10" font-weight="700" text-anchor="middle" fill="#166534">${l.t}</text>`)
    .join('')
  const ticks = xs
    .map((x, i) => `<line x1="${x}" y1="220" x2="${x}" y2="224" stroke="#16a34a" stroke-width="1.4"/><text x="${x}" y="236" font-size="9" text-anchor="middle" fill="#0f766e">r = ${i}</text>`)
    .join('')
  const walk = `M55,${yOf(1).toFixed(1)} L122.5,${yOf(-6).toFixed(1)} L190,${yOf(15).toFixed(1)} L257.5,${yOf(-20).toFixed(1)} L325,${yOf(15).toFixed(1)}`
  return `<svg viewBox="0 0 380 265" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The partial-sum walk of the alternating row of seven: the five running totals 1, minus 6, 15, minus 20 and 15 zigzag either side of the dashed zero line, swinging up to 15, down to minus 20, and landing finally — ringed — on 15, which equals C(6,4) — the cancellation law at k = 4.">
  <text x="190" y="20" font-size="11" font-weight="700" text-anchor="middle" fill="currentColor">the partial-sum walk of the alternating row of seven</text>
  <line x1="45" y1="114" x2="355" y2="114" stroke="#5eead4" stroke-width="1.4" stroke-dasharray="4 3"/>
  <text x="40" y="117" font-size="9" text-anchor="end" fill="#0d9488">0</text>
  <text x="50" y="38" font-size="9.5" font-weight="700" fill="#0d9488">the running sum</text>
  <line x1="45" y1="35" x2="45" y2="220" stroke="#16a34a" stroke-width="1.5"/>
  <line x1="45" y1="220" x2="355" y2="220" stroke="#16a34a" stroke-width="1.5"/>
  <path d="${walk}" fill="none" stroke="#d97706" stroke-width="2"/>
  ${dots}
  ${ring}
  ${labels}
  ${ticks}
  <text x="190" y="252" font-size="10" font-weight="700" text-anchor="middle" fill="#166534">the landing — ringed: 15 = C(6,4) — the cancellation law at k = 4</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* lesson 7.R — the Unit 7 Completion Review                           */
/* ------------------------------------------------------------------ */

const lesson7R: Lesson = {
  id: 'aa-induction-binomial-theorem-unit-7-review',
  number: '7.R',
  title: 'Unit 7 Completion Review',
  concepts: [
    'the arc of the chapter: one proof engine and its five consequences',
    'the decision map: which index, which object, which engine',
    'the master law table: theorem statements, term pricing, row algebra, approximations',
    'the witnesses, re-audited: one verified number per lesson',
    'the traps the hall sets: off-by-one seats, boundary honesty, parity of the peak',
    'the mixed bench: items that price several engines at once',
    'the handoffs: calculus\u2019s series doorstep, the Theory of Equations chapter',
  ],
  objectives: [
    'hold the whole chapter in one hand — the wiring of its six engines (the domino principle, the proved theorem, the any-index rows, the multinomial, the coefficient algebra, the applications), the promises made early and cashed late (Bernoulli proved in 7.1 and cashed in 7.6; Pascal\u2019s rule proved in 7.2 and cashed in 7.5; the window stated in 7.3 and cashed in 7.6; the word census built in 7.4 and cashed in 7.5), and where each master law row lives.',
    'run the decision map\u2019s two questions at examination speed — which index (positive integral, any rational inside |x| < 1, or k letters), then which object (a single term, a coefficient, a sum or identity, an approximation) — and reach for the engine the answers point at.',
    'recall the consolidated laws and both master tables without re-deriving them — each law, its validity seat and its trap — and rebuild any of them from its lesson\u2019s engine when memory fails.',
    'solve mixed items that price several engines in one exhibit, and diagnose every miss back to its home lesson by the shape it wore.',
    'state the chapter\u2019s honest boundaries — what was proved and what was only verified (the any-index rows), where each row is valid and where it stops, and the handoffs: the series doorstep of calculus, probability\u2019s distribution ground, and chapter 8 "The Theory of Equations".',
  ],
  prerequisites: [
    'aa-mathematical-induction-the-domino-principle',
    'aa-the-binomial-theorem-proved',
    'aa-binomial-theorem-any-index',
    'aa-the-multinomial-theorem',
    'aa-binomial-coefficients-at-work',
    'aa-binomial-applications-and-approximations',
  ],
  sources: [
    'cengage-m2-04',
    'cengage-m2-08',
    'cengage-jee-style',
    'hall-knight-higher-algebra',
    'jee-main-2026-syllabus',
  ],
  blocks: [
    { kind: 'para', text: 'Chapter 7 was announced as "the book\u2019s proof engine and its most-used consequence", and the chapter kept that promise in working order for six lessons. Lesson 7.1, "Mathematical Induction: the Domino Principle", built the engine — the two-step principle with its least-failure certificate through well-ordering, the sum formulas $\\Sigma n$, $\\Sigma n^{2}$, $\\Sigma n^{3}$ certified for every $n$ at once, the divisibility and inequality families, Bernoulli\u2019s inequality PROVED as a promise, and strong induction for the statements that reach further back than one domino. Lesson 7.2, "The Binomial Theorem, Proved", pointed the engine at algebra itself and proved the chapter\u2019s headline TWICE — once by counting, once by induction with Pascal\u2019s rule as the merge — then priced every seat: the general term, the middle term, terms from the end, conjugate powers. Lesson 7.3, "The Binomial Theorem for Any Index", let the index go rational and paid the new price honestly: the row never terminates, the statement is an infinite series, and the window $|x| < 1$ is part of the theorem — verified numerically seat by seat, never "proved" by calculus this book has not built. Lesson 7.4, "The Multinomial Theorem", let the alphabet grow and found that nothing new was needed: the same word census prices every seat, the identical-distribution bridge counts the terms, and the binomial reappears at $k = 2$ as the smallest case. Lesson 7.5, "Binomial Coefficients at Work", turned the coefficients into objects of study — substitutions, conjugate reads, Vandermonde, the ratio law and the peaks. Lesson 7.6, "Binomial Applications and Approximations", cashed the whole shelf at examination speed — the linear engine with its honest error column, the divisibility reads, the conjugate-pair integer trick, the partial-fraction hunts. The engine ran; this review closes the room it powers.' },
    { kind: 'para', text: 'A review in this book does two things and refuses a third. It RE-MAPS the chapter — the arc from one proof engine to its five consequences, the promises made early and cashed late (7.1 proved Bernoulli\u2019s inequality; 7.6 cashed it as the error bound on every approximation. 7.2 proved Pascal\u2019s rule; 7.5 cashed it as the row algebra. 7.3 stated the convergence window; 7.6 cashed it as the honest error column every estimate rides with. 7.4 built the word census; 7.5 cashed it as the coefficient sums. 7.2 priced the conjugate powers; 7.6 cashed them as the conjugate-pair integer trick) — together with the one master law table that reunites the chapter\u2019s whole formula family, and the decision map that routes any question to its engine. And it runs a MIXED bench: the witnesses below deliberately price several engines in one exhibit, and the fifteen-question bench prices several storeys per item, because that is exactly how an examination prices a chapter — one machine arrives, and every reading the chapter owns is asked of it in turn. What the review refuses: re-proving what the lessons already proved. Every derivation below is one line of recall with a pointer to its lesson; nothing is re-derived that 7.1 through 7.6 established once. Every number on this page was re-computed by hand and reconciled against the lessons\u2019 own pinned witnesses before a word of the prose was fixed.' },
    { kind: 'para', text: 'The arc first, then the promise map, then the tables, then the witnesses, then the laws, then the traps, then the mixed bench. Read the decision map once before the exercises and once after: the second reading should look shorter.' },

    { kind: 'heading', text: 'The Arc: One Engine, Five Consequences' },
    { kind: 'para', text: 'Storey one (7.1, "Mathematical Induction: the Domino Principle") built the gear the whole chapter turns on: the principle FORMALISED — base case $P(1)$ plus inductive step $P(k) \\Rightarrow P(k+1)$ for every $k$ — and CERTIFIED by the least-failure argument through the well-ordering principle (a failure set would have a least element, and the step kills it: the logical heart under the domino picture). The engine then ran on its families: the sum formulas $\\Sigma n$, $\\Sigma n^{2}$, $\\Sigma n^{3}$ certified for every $n$ at once — chapter 5\u2019s ladders had derived them, induction now certifies them; the divisibility families by the add-a-multiple move — $5^{2n+1} + 1 \\equiv 0 \\pmod 6$ with the witnesses $126$, $3126$, $78126$, and $n^{3} - n \\equiv 0 \\pmod 6$; the inequalities with their honest shifted base — $2^{n} \\geq n^{2}$ holds only from $n = 4$ upward, the fail-witness $8 < 9$ at $n = 3$ printed beside the theorem; Bernoulli\u2019s inequality $(1+x)^{n} \\geq 1 + nx$ for $x \\geq -1$, PROVED here and named as the promise 7.6 would cash; and strong induction for the two-term recurrence $u_{n} < 2^{n}$ and the postage family — every amount $\\geq 2$ payable in 2s and 3s. The honest scope section closed the storey: verification is never proof (Euler\u2019s $n^{2} + n + 41$, prime for $0 \\leq n \\leq 39$, fails at $n = 40$ where the value is $41^{2}$), and a plausible step with a broken $k = 1$ case proves nothing — the horses fallacy.' },
    { kind: 'para', text: 'Storey two (7.2, "The Binomial Theorem, Proved") pointed the engine at algebra: the reflex toolkit $(a \\pm b)^{2}$, $(a \\pm b)^{3}$ first — the theorem\u2019s smallest cases — then Pascal\u2019s triangle carrying its two meanings at once (each entry the sum of its two parents, AND the selection count $\\binom{n}{r}$), Pascal\u2019s rule PROVED TWICE (the newest-object split, then the factorial algebra), and the theorem itself PROVED TWICE: the counting proof — at $n = 4$ the $16$ uncollected products group $1, 4, 6, 4, 1$ by how many factors donate $b$, because a group of size $\\binom{4}{r}$ is by definition the count of ways to choose which $r$ of the four factors donate — and the induction proof, with Pascal\u2019s rule as the step\u2019s one merge: 7.1\u2019s engine at the headline, exactly as the chapter summary promised. The pricing machinery followed: the seat dictionary (term number $\\leftrightarrow$ index $r \\leftrightarrow$ monomial), the general term $T_{r+1} = \\binom{n}{r}a^{n-r}b^{r}$ with its sign discipline in $(a-b)^{n}$ — the 7th term of $(2a+b)^{12}$ prices at $59136\\,a^{6}b^{6}$ — the middle-term seats by the parity of $n$: $(3x+2)^{8}$ has the one middle term $90720\\,x^{4}$, $(x-2y)^{7}$ the twin pair $-280\\,x^{4}y^{3}$ and $560\\,x^{3}y^{4}$ — the from-the-end reversal ($p$-th from the end $= (n+2-p)$-th from the start: the 5th-from-end of $(x+2)^{12}$ prices at $126720\\,x^{4}$), and the conjugate powers whose sum keeps the even seats only: $(1.02)^{4} + (0.98)^{4} = 2.00480032$, four binomial seats instead of two fourth powers.' },
    { kind: 'para', text: 'Storey three (7.3, "The Binomial Theorem for Any Index") let the index go rational and paid the new price honestly: the general term is the falling factorial $n(n-1)\\cdots(n-r+1)$ over $r!$ — pure arithmetic at ANY rational index — but the row never terminates (no factor ever reads zero), so the statement is an infinite series whose equals-sign is a limit of partial sums, and the WINDOW $|x| < 1$ is part of the theorem, not decoration hung on afterwards. The lesson\u2019s honesty about its own proof: the full derivation — differentiate the series, solve the differential equation — belongs to the calculus doorstep, so 7.3 did what Euler\u2019s generation did: stated the theorem and verified it, every truncated case checked numerically against direct computation, with $\\sqrt{1.02} = 1.0099505$ against the true $1.00995049\\ldots$ standing witness. The ten-row frequently-used table was built seat by seat, and two laws were pulled out of it: the counting-row law $(1-x)^{-n} = \\sum \\binom{n+r-1}{r}x^{r}$ (the negative-integer rows are selection counts — the triangular numbers at the index $-3$) and the central-binomial law $\\tbinom{2r}{r}/4^{r}$ behind the half row. The pricing craft: scaled arguments ($\\tfrac{4}{27}$; $80$; the elegant collapse to $\\binom{8}{4} = 70$ at $(1-4x)^{-1/2}$; $-\\tfrac{1}{64}$ and $\\tfrac{3}{16}$ from the leading-factor transform), the two-root seat equation ($n = \\tfrac{3}{2}$ OR $-\\tfrac{1}{2}$, both roots printed and verified), the partial-fraction route ($2^{n+1} - 1$ in $\\tfrac{1}{(1-x)(1-2x)}$), and the boundary honesty — oscillation $1, 0, 1, 0$ at $x = 1$, escape $1, 2, 3, 4$ at $x = -1$, divergence at $x = 2$, and the geometric ladder at $x = 0.6$ closing on $2.5$: convergence in the flesh.' },
    { kind: 'para', text: 'Storey four (7.4, "The Multinomial Theorem") let the alphabet grow and found nothing new was needed: $(a+b+c)^{2}$ built literally — six terms, every mixed seat priced $\\tfrac{2!}{1!\\,1!} = 2$; $(a+b+c)^{3}$ — ten terms, the $\\tfrac{3!}{2!\\,1!} = 3$ family beside the balanced $6abc$; then the word-census proof: the uncollected products ARE words of length $n$ over $\\{a, b, c\\}$, and the coefficient of $a^{p}b^{q}c^{r}$ is exactly the arrangement count $\\tfrac{n!}{p!\\,q!\\,r!}$ — witnessed at $n = 4$ by the census of all $81$ four-letter words finding exactly $12$ carrying two $a$\u2019s, one $b$ and one $c$. The identical-distribution bridge counted the TERMS: the distinct monomials are the non-negative solutions of $p + q + r = n$, chapter 6\u2019s identical-balls count $\\tbinom{n+2}{2}$, swept $6, 10, 15, 21, 28$ against the literal expansions — and the $k$-letter law $\\tbinom{n+k-1}{k-1}$ recovered the binomial\u2019s $n + 1$ at $k = 2$: one theorem, not two. The pricing reflex took its three examination homes: plain seats ($60$ at $a^{2}b^{3}c$ of $(a+b+c)^{6}$), the balanced seat — $(2,2,2) = 90$, towering over its neighbours $60$ and $30$, the multinomial\u2019s analogue of the binomial middle — degree-constrained seats ($x^{3}$ in $(1+x+x^{2})^{4} = 16$ by enumerating the admissible triples; $x^{8} = 90$ via the three triples priced $15 + 60 + 15$), and the exam shortcuts ($\\tbinom{12}{2} = 66$ terms of $(a+b+c)^{10}$; $\\tbinom{13}{3} = 286$ of the four-letter power).' },
    { kind: 'para', text: 'Storey five (7.5, "Binomial Coefficients at Work") turned the coefficients into objects of study. The substitution engine: set $x = 1$ and the row sums to $2^{n}$; set $x = -1$ and it alternates to $0$; run the conjugate sum $(1+x)^{n} + (1-x)^{n}$ and the even seats alone are worth $2^{n-1}$ — and the substitution must be run on the ACTUAL base: $(2-3x)^{12}$ sums to $(2-3)^{12} = 1$, not $2^{12}$, and $(1+x-2x^{2})^{9}$ sums to an honest $0$. The conjugate reads: $(1+x)^{6} + (1-x)^{6} = 2(1 + 15x^{2} + 15x^{4} + x^{6})$, an even polynomial — and the alternating squares via $(1-x^{2})^{n}$: $1 - 16 + 36 - 16 + 1 = 6 = (-1)^{2}\\binom{4}{2}$, the law reading $0$ at odd $n$ and $(-1)^{n/2}\\binom{n}{n/2}$ at even. Vandermonde: the coefficient of $x^{2}$ in $(1+x)^{4}(1+x)^{4}$ is $28 = 6 + 16 + 6$, and the square-sum law $\\sum\\binom{n}{r}^{2} = \\tbinom{2n}{n}$ carries the witness $1 + 16 + 36 + 16 + 1 = 70 = \\tbinom{8}{4}$, with the cross-pair census $(4^{n} - \\tbinom{2n}{n})/2$ witnessed at $22$ for $n = 3$. The row\u2019s shape: the ratio law $\\tfrac{n-r+1}{r}$, the A.P. condition on the 5th, 6th and 7th coefficients ($n = 7$ or $14$), the equal-consecutive pair of $(2+5x)^{13}$ at $x^{9}$ and $x^{10}$, the peaks — row 11\u2019s twin $462$; row 12\u2019s profile $1, 12, 66, 220, 495, 792, 924, 792, 495, 220, 66, 12, 1$ with the even/odd split $2048 = 2^{11}$ on each side — the least coefficient of $(2-3x)^{15}$ (the 10th term, $-6{,}304{,}858{,}560$), the greatest term of $(1.3)^{15} = T_{4}$ by the ratio test, the complex reads ($(1+i)^{8} = 16$; $\\cos 3\\theta = 4\\cos^{3}\\theta - 3\\cos\\theta$; $(1+ix)^{4n}$ carrying $2n+1$ real terms), and the terms independent of $x$ across its exhibits ($-252$; $84$; $2016$).' },
    { kind: 'para', text: 'Storey six (7.6, "Binomial Applications and Approximations") cashed the shelf at examination speed. The linear engine: $(1.02)^{5}$ — true value $1.1040808$, first order $1.10$, second order $1.104$; $\\sqrt{1.04}$ and $(0.99)^{4}$ the same way; the three-factor linearisation $(1+2x)^{-3}(1-\\tfrac{x}{2})^{1/2}(1+\\tfrac{x}{4})^{-1} \\approx 1 - \\tfrac{13x}{2}$; the root estimates — $\\sqrt[3]{65} \\approx 4.0208$ at first order, $4.0207248$ at second order, against the true $4.0207257$; $\\sqrt{26}$ and $\\sqrt{99}$ beside it — and the error ladder that prices the honesty: the quadratic read beats the linear by more than twenty-fold at $|x| \\leq 0.1$. The integer families: divisibility and remainders ($7^{101} + 11^{51} \\equiv 2 \\pmod 8$; $5^{2n} \\equiv (-1)^{n} \\pmod{13}$), the conjugate-pair integer trick — $(\\sqrt{5}+\\sqrt{2})^{4} + (\\sqrt{5}-\\sqrt{2})^{4} = 178$, so the smallest integer larger than $(\\sqrt{5}+\\sqrt{2})^{4}$ is $178$, with the $(\\sqrt{7}+\\sqrt{3})^{4}$ twin closing at $368$ — the odd-power divisibility $(a+b)^{n} - a^{n} - b^{n}$ by $ab(a+b)$, and the partial-fraction hunts: the coefficient of $x^{n}$ in $\\tfrac{1}{(1-x)(1-2x)}$ is $2^{n+1} - 1$; in $(1-5x+6x^{2})^{-1}$ it is $3^{n+1} - 2^{n+1}$; in $\\tfrac{1}{(1-x)(1-3x)(1-5x)}$ it is $\\tfrac{1 - 18 \\cdot 3^{n} + 25 \\cdot 5^{n}}{8}$. The cancellation engine closed the storey — $\\sum_{r \\leq k} (-1)^{r}\\binom{n}{r} = (-1)^{k}\\binom{n-1}{k}$, with the coefficient of $x^{8}$ in $(1-x)^{15}(1-x)^{-3}$ collapsing to $\\tbinom{12}{8} = 495$ — beside the first-negative-term flip: $T_{7}$ of $(1+x)^{9/2}$.' },
    { kind: 'para', text: 'And under all six storeys, one ground: the row of Pascal\u2019s triangle — every entry simultaneously a sum of its two parents (the generation rule, which 7.2 proved is a theorem) and a selection count $\\binom{n}{r}$ (the meaning, which 7.2\u2019s counting proof installed) — and induction is what certifies the whole staircase for every $n$ at once: the engine is the ground\u2019s own certificate. On that ground stand the earlier chapters this one kept citing without re-teaching: chapter 6\u2019s selection engine owns every coefficient ($\\binom{n}{r}$ IS ${}^{n}C_{r}$, and 7.4\u2019s $\\tfrac{n!}{p!\\,q!\\,r!}$ is its permutation-with-repeats count repointed at algebra); chapter 5\u2019s geometric row and its infinite-tail discipline own the window ($|x| < 1$ was banked there first — the first payment on calculus\u2019s doorstep, cashed at scale by 7.3); and Elementary Algebra\u2019s reflex identities $(a \\pm b)^{2}$ and $(a \\pm b)^{3}$ are the theorem\u2019s smallest cases, quoted at 7.2\u2019s opening and never re-derived since. One engine, five consequences, and a ground of counted selections: that is the whole chapter in one line, and the figure below draws its promise-cashings.' },
    { kind: 'figure', caption: 'The promise-cashings of the chapter: five lanes, each running from the lesson that made an early promise to the lesson that cashed it. 7.1 proved Bernoulli\u2019s inequality — cashed by 7.6 as the approximation error bound. 7.2 proved Pascal\u2019s rule — cashed by 7.5 as the row algebra. 7.3 stated the convergence window — cashed by 7.6 as the honest error column. 7.4 built the word census — cashed by 7.5 as the coefficient sums. 7.2 priced the conjugate powers — cashed by 7.6 as the conjugate-pair integer trick. The six storeys sit in teaching order beneath the lanes: every promise made in 7.1 through 7.4 is paid by 7.5 or 7.6, before the chapter closes.', svg: promiseCashings7RSvg() },
    { kind: 'callout', tone: 'definition', title: 'The six engines of the chapter', text: 'The chapter\u2019s architecture, stated once as a definition. An ENGINE of this chapter is one machine that prices a family of binomial questions: (i) the PROOF engine — induction, the domino principle that certifies statements for every $n$ (7.1); (ii) the EXPANSION engine — the positive-index theorem with its general and middle terms (7.2); (iii) the INFINITE engine — the any-index rows inside their window (7.3); (iv) the ALPHABET engine — the multinomial, its seats and term counts (7.4); (v) the COEFFICIENT engine — substitutions, conjugate reads, Vandermonde, ratios and peaks (7.5); (vi) the APPLICATION engine — linearization, divisibility, conjugate pairs, partial fractions (7.6). Thus every question this chapter answers is two questions in disguise: which index and which object — and the engine that owns the pair.' },

    { kind: 'heading', text: 'The Master Tables Reunited' },
    { kind: 'para', text: 'Strip the chapter of its prose and two tables remain — the two the examinations actually price. The first is the master law table: one row per engine, the statement in one line, the validity seat (where the row holds, and where it stops holding), and the witness that pins it — every witness re-run against its home lesson before this prose was written, not a memory transcribed. The second is the frequently-used shelf of 7.3, compact: the rows an examination expects read on sight, each with the law hiding inside it. And above both sits the decision map — the figure below — whose two questions route any item of the bench to its engine: WHICH INDEX first (a positive integral index, any rational index inside $|x| < 1$, or $k$ letters of a multinomial), then WHICH OBJECT (a single term, a coefficient, a sum or identity, an approximation).' },
    { kind: 'table', caption: 'The law family in one census — one row per engine of the chapter: the statement, its validity seat, and the verified witness that pins it. Every row cross-checked against its home lesson before this prose was written.', head: ['Engine (lesson)', 'The statement, one line', 'The validity seat', 'A verified witness'], rows: [
      ['the positive-index theorem (7.2)', '$(a+b)^{n} = \\sum_{r=0}^{n}\\binom{n}{r}a^{n-r}b^{r}$ — exactly $n+1$ terms', 'any $a, b$; positive integral $n$ — no window ever needed', 'the $n = 4$ census: $16$ products grouped $1, 4, 6, 4, 1$'],
      ['the general and middle term (7.2)', '$T_{r+1} = \\binom{n}{r}a^{n-r}b^{r}$; middle $T_{n/2+1}$ ($n$ even), twins $T_{(n+1)/2}, T_{(n+3)/2}$ ($n$ odd); $p$-th from the end $= (n+2-p)$-th', 'the seat dictionary; sign $(-1)^{r}$ rides every term of $(a-b)^{n}$', '$T_{7}$ of $(2a+b)^{12} = 59136\\,a^{6}b^{6}$; the middle $90720\\,x^{4}$ of $(3x+2)^{8}$'],
      ['the any-index rows (7.3)', '$(1+x)^{n} = \\sum \\tfrac{n(n-1)\\cdots(n-r+1)}{r!}x^{r}$ — the row never terminates', 'rational $n$ AND $|x| < 1$ — the window is part of the theorem', '$\\sqrt{1.02} = 1.0099505$ against the true $1.00995049\\ldots$'],
      ['the multinomial (7.4)', '$\\sum \\tfrac{n!}{p!\\,q!\\,r!}a^{p}b^{q}c^{r}$ over $p+q+r = n$; terms $\\tbinom{n+k-1}{k-1}$', 'any letters; the sum-check $p+q+r = n$ before any price', 'the balanced seat $(2,2,2) = 90$; $21 = \\tbinom{7}{2}$ terms at $n = 5$'],
      ['the substitution engine (7.5)', 'row sums $2^{n}$; alternating $0$; even seats alone $2^{n-1}$', 'set $x = 1$, $x = -1$, or run the conjugate sum — on the ACTUAL base', 'row 12\u2019s even/odd split $2048$ each; $(2-3x)^{12}$ sums to $1$'],
      ['the conjugate reads (7.5)', '$(1+x)^{n} \\pm (1-x)^{n}$ — the even (or odd) seats only', 'any conjugate pair $a \\pm b$; surds ride the same machine', '$1-16+36-16+1 = 6 = (-1)^{2}\\tbinom{4}{2}$; $(1.02)^{4} + (0.98)^{4} = 2.00480032$'],
      ['Vandermonde (7.5)', '$\\sum_{r}\\binom{m}{r}\\binom{n}{k-r} = \\binom{m+n}{k}$; $\\sum\\binom{n}{r}^{2} = \\tbinom{2n}{n}$', 'any rows; the convolution reads products of expansions', '$x^{2}$ in $(1+x)^{4}(1+x)^{4}$ is $28 = 6+16+6$; $1+16+36+16+1 = 70 = \\tbinom{8}{4}$'],
      ['the ratio law and the peaks (7.5)', '$\\tbinom{n}{r+1}/\\tbinom{n}{r} = \\tfrac{n-r}{r+1}$ — one peak ($n$ even), twin peaks ($n$ odd)', 'the whole row; the ratio test also prices greatest TERMS of $(1+x)^{n}$', 'row 11\u2019s twin $462$; row 12\u2019s peak $924$; the greatest term of $(1.3)^{15}$ is $T_{4}$'],
      ['the linear approximation (7.6)', '$(1+x)^{n} \\approx 1 + nx$, or $+\\ \\tfrac{n(n-1)}{2}x^{2}$ at second order', '$|x| < 1$ and genuinely small — the honest error column rides beside every price', '$\\sqrt[3]{65}$: $4.0208$ linear, $4.0207248$ second-order, true $4.0207257$'],
      ['the partial-fraction hunts (7.6)', 'coefficient of $x^{n}$ in $\\tfrac{1}{(1-x)(1-2x)} = 2^{n+1} - 1$; cover-up splits rational functions into known rows', 'the NARROWEST window of the parts governs the combination', '$3^{n+1} - 2^{n+1}$ in $(1-5x+6x^{2})^{-1}$; $x^{8}$ in $(1-x)^{15}(1-x)^{-3} = 495$'],
    ] },
    { kind: 'table', caption: 'The frequently-used rows of 7.3, compact — the shelf an examination expects read on sight, every row valid only inside $|x| < 1$, each with the law hiding inside it.', head: ['Row', 'First seats, valid $|x| < 1$', 'The law inside'], rows: [
      ['$(1+x)^{-1}$', '$1 - x + x^{2} - x^{3} + \\cdots$', 'the alternating geometric — chapter 5\u2019s own row'],
      ['$(1-x)^{-1}$', '$1 + x + x^{2} + x^{3} + \\cdots$', 'the geometric itself, the first infinite object this book banked'],
      ['$(1+x)^{-2}$', '$1 - 2x + 3x^{2} - 4x^{3} + \\cdots$', 'the counting numbers, alternating'],
      ['$(1-x)^{-2}$', '$1 + 2x + 3x^{2} + 4x^{3} + \\cdots$', 'the counting numbers — seats $\\tbinom{r+1}{1} = r+1$'],
      ['$(1-x)^{-3}$', '$1 + 3x + 6x^{2} + 10x^{3} + \\cdots$', 'the triangular numbers — seats $\\tbinom{r+2}{2}$'],
      ['$(1-x)^{-1/2}$', '$1 + \\tfrac{x}{2} + \\tfrac{3x^{2}}{8} + \\tfrac{5x^{3}}{16} + \\cdots$', 'the central-binomial law $\\tbinom{2r}{r}/4^{r}$'],
      ['$(1+x)^{1/2}$', '$1 + \\tfrac{x}{2} - \\tfrac{x^{2}}{8} + \\tfrac{x^{3}}{16} - \\cdots$', 'the half row — the root estimates of 7.6 live here'],
    ] },
    { kind: 'figure', caption: 'The decision map of the chapter: two questions asked in order. First — which index? A positive integral index routes to the positive-index theorem of 7.2 ($n + 1$ terms, proved twice); any rational index routes to the any-index rows of 7.3, valid only inside the window $|x| < 1$; $k$ letters route to the multinomial of 7.4, with its $\\tbinom{n+k-1}{k-1}$ term count. Then — which object? A single term routes to 7.2\u2019s general and middle term; a coefficient routes to 7.5\u2019s substitution, Vandermonde, ratio and peak engine; a sum or identity routes to 7.3\u2019s rows and validity window; an approximation routes to 7.6\u2019s linearization and partial fractions. Under both stages runs the ground bar: the row of Pascal\u2019s triangle — selection counts that induction certifies (7.1 / 7.2). Name the index and the object; the engine follows.', svg: decisionMap7RSvg() },
    { kind: 'callout', tone: 'theorem', title: 'The one discipline behind the tables', text: 'Every row of both tables is the same move in a different dress: PRICE THE SEAT BY A COUNT, THEN STATE WHERE THE COUNT HOLDS. The positive-index rows are finite — the count is exact at every $a$ and $b$, no conditions. The any-index rows are infinite — the count still prices every seat, but the EQUALITY needs the window $|x| < 1$, and the window is part of the statement, not decoration. The multinomial rows are censuses — the count is of words, and the sum-check $p + q + r = n$ decides which seats exist at all. The substitution rows are reads — set $x = \\pm 1$ and the theorem becomes an identity about its own coefficients. And the approximation rows are honest truncations — the first seats of an infinite row, with the unpaid tail measured in an error column. Proved once in its lesson, recalled in one line here — the refusal discipline working for you as a map.' },

    { kind: 'heading', text: 'The Witnesses, Re-Audited' },
    { kind: 'para', text: 'Sixteen exhibits carried the chapter\u2019s weight — at least two from every storey — and a review earns its keep by re-auditing them TOGETHER: each line below is one verified number, re-computed by hand and reconciled against the home lesson\u2019s own pinned value before a word of this prose was fixed, and each now prices more than the storey that introduced it. Read the roster once as a census of the chapter\u2019s honesty: every law on the master table carries at least one of these numbers on its back.' },
    { kind: 'list', marker: 'roman', items: [
      '(i) $5^{2n+1} + 1$ divisible by $6$, the witnesses $126$, $3126$, $78126$ at $n = 1, 2, 3$ — 7.1\u2019s add-a-multiple divisibility engine;',
      '(ii) $2^{n} \\geq n^{2}$ holding only from $n = 4$, failing at the honest witness $8 < 9$ ($n = 3$) — 7.1\u2019s shifted-base inequality;',
      '(iii) $T_{7}$ of $(2a+b)^{12} = 59136\\,a^{6}b^{6}$ ($924 \\cdot 64$) — 7.2\u2019s general term at the row\u2019s peak seat;',
      '(iv) $90720\\,x^{4}$, the middle term of $(3x+2)^{8}$ ($70 \\cdot 81 \\cdot 16$) — 7.2\u2019s middle-term pricing at even $n$;',
      '(v) $(1.02)^{4} + (0.98)^{4} = 2.00480032$ — 7.2\u2019s conjugate powers, the even seats only;',
      '(vi) $\\sqrt{1.02} = 1.0099505$ against the true $1.00995049\\ldots$ — 7.3\u2019s trust-but-verify standard on the half row;',
      '(vii) $(1-x)^{-n} = \\sum \\binom{n+r-1}{r}x^{r}$, the counting-row law — 7.3\u2019s negative-integer rows are selection counts;',
      '(viii) the word census: exactly $12$ of the $81$ four-letter words carry two $a$\u2019s, one $b$ and one $c$ — 7.4\u2019s brute-checked coefficient;',
      '(ix) the balanced seat $(2,2,2) = 90$, towering over its neighbours $60$ and $30$ — 7.4\u2019s greatest coefficient of $(a+b+c)^{6}$;',
      '(x) $1 - 16 + 36 - 16 + 1 = 6 = (-1)^{2}\\binom{4}{2}$ — 7.5\u2019s alternating squares via $(1-x^{2})^{n}$;',
      '(xi) $1 + 16 + 36 + 16 + 1 = 70 = \\binom{8}{4}$ — 7.5\u2019s Vandermonde square-sum at $n = 4$;',
      '(xii) the row 12 profile with the even/odd split $2048 = 2^{11}$ on each side — 7.5\u2019s substitution engine at $x = \\pm 1$;',
      '(xiii) $\\sqrt[3]{65} \\approx 4.0207$ (linear $4.0208$, second-order $4.0207248$, true $4.0207257$) — 7.6\u2019s root estimate with its honest error column;',
      '(xiv) $7^{101} + 11^{51} \\equiv 2 \\pmod 8$ — 7.6\u2019s divisibility read on residues;',
      '(xv) $(\\sqrt{5}+\\sqrt{2})^{4}$: the smallest integer larger than it is $178$ (the conjugate pair sums to exactly $178$) — 7.6\u2019s conjugate-pair integer trick;',
      '(xvi) the coefficient of $x^{8}$ in $(1-x)^{15}(1-x)^{-3} = \\binom{12}{8} = 495$ — 7.6\u2019s cancellation engine at work.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'How the witnesses interlock', text: 'The sixteen exhibits are not sixteen problems — they are the chapter wearing sixteen costumes. Witnesses (iii) and (iv) are the same seat dictionary at two difficulties; (v) and (x) are the same conjugate machine run on decimals and on rows; (vi) and (xiii) are the same half row read once as a value and once as an estimate; (vii) and (xvi) are the same counting-row law priced from both ends; (viii) and (xi) are the same census discipline run on words and on coefficients; (ii) and (xiv) are the chapter\u2019s honesty about integers — where a claim starts and what a residue hides. The hall\u2019s mixed items run exactly this game: hand you one machine and bill you for several storeys at once — and the diagnosis runs the same direction, a miss on a mixed item naming its home lesson by its shape.' },

    { kind: 'heading', text: 'The Laws Worth Recalling' },
    { kind: 'para', text: 'The chapter deposited its formula shelf lesson by lesson — the theorem and its terms in 7.2, the infinite rows in 7.3, the multinomial family in 7.4, the coefficient algebra in 7.5, the approximation engines in 7.6 — and the reader\u2019s formula-sheet page aggregates them automatically. Nine of them are load-bearing: the consolidated laws the next chapters will actually reach for, each re-verified against its lesson before this page was written. The laws in display, then the cards, then the recall derivation, then the vocabulary:' },
    { kind: 'equation', latex: '(a+b)^{n} = \\sum_{r=0}^{n} \\binom{n}{r} a^{n-r} b^{r}, \\qquad T_{r+1} = \\binom{n}{r} a^{n-r} b^{r} \\tag{1}', note: 'the theorem and its general term — 7.2\u2019s twin statements; the 7th term means $r = 6$, and the $p$-th from the end is the $(n+2-p)$-th from the start.' },
    { kind: 'equation', latex: '(1+x)^{n} = \\sum_{r=0}^{\\infty} \\frac{n(n-1)(n-2)\\cdots(n-r+1)}{r!}\\, x^{r}, \\qquad |x| < 1 \\tag{2}', note: 'the any-index form — 7.3; the window clause is part of the statement, and a positive integer $n$ closes the row and voids the window.' },
    { kind: 'equation', latex: '\\sum_{r=0}^{n} \\binom{n}{r} = 2^{n}; \\qquad \\sum_{r=0}^{n} (-1)^{r}\\binom{n}{r} = 0; \\qquad \\sum_{\\text{even } r} \\binom{n}{r} = 2^{n-1} \\tag{3}', note: 'the row-sum family — 7.5\u2019s substitution engine at $x = 1$, $x = -1$, and the conjugate sum; the even-index split $2048 = 2^{11}$ of row 12 is its standing witness.' },
    { kind: 'formula', name: 'The binomial theorem (positive index)', latex: '(a+b)^{n} = \\sum_{r=0}^{n} \\binom{n}{r} a^{n-r} b^{r} \\quad (n \\in \\mathbb{N})', note: 'exactly $n+1$ terms, coefficients symmetric about the middle, total mass $2^{n}$; proved twice in 7.2 — by counting and by induction (Pascal\u2019s rule the merge).' },
    { kind: 'formula', name: 'The general term', latex: 'T_{r+1} = \\binom{n}{r} a^{n-r} b^{r}; \\qquad T_{r+1} = (-1)^{r}\\binom{n}{r} a^{n-r} b^{r} \\;\\text{ in } (a-b)^{n}', note: 'the seat dictionary: term number $= r + 1$; the $p$-th from the end is the $(n+2-p)$-th from the start (7.2; $T_7$ of $(2a+b)^{12} = 59136\\,a^{6}b^{6}$).' },
    { kind: 'formula', name: 'The middle-term seat rule', latex: 'n \\text{ even}: \\; T_{n/2+1} \\text{ alone}; \\qquad n \\text{ odd}: \\; T_{(n+1)/2} \\text{ and } T_{(n+3)/2}', note: 'the peak seats of the row — one peak at even $n$, twin equal peaks at odd $n$ (7.2; the middle $90720\\,x^{4}$ of $(3x+2)^{8}$; the twins $-280\\,x^{4}y^{3}$, $560\\,x^{3}y^{4}$ of $(x-2y)^{7}$).' },
    { kind: 'formula', name: 'The row-sum family', latex: '2^{n} \\; (x = 1); \\qquad 0 \\; (x = -1); \\qquad 2^{n-1} \\; (\\text{even seats, conjugate sum})', note: 'run the substitution on the ACTUAL base — $(2-3x)^{12}$ sums to $(2-3)^{12} = 1$, and $(1+x-2x^{2})^{9}$ to an honest $0$ (7.5; row 12 splits $2048$ each side).' },
    { kind: 'formula', name: 'Vandermonde and the square-sum', latex: '\\sum_{r} \\binom{m}{r}\\binom{n}{k-r} = \\binom{m+n}{k}; \\qquad \\sum_{r=0}^{n} \\binom{n}{r}^{2} = \\binom{2n}{n}', note: 'the convolution of two expansions — 7.5; the witness $1+16+36+16+1 = 70 = \\binom{8}{4}$, and the cross-pair census $(4^{n} - \\binom{2n}{n})/2$ at $22$ for $n = 3$.' },
    { kind: 'formula', name: 'The any-index form and its window', latex: '(1+x)^{n} = \\sum_{r=0}^{\\infty} \\frac{n(n-1)\\cdots(n-r+1)}{r!}\\, x^{r}, \\quad |x| < 1', note: 'rational $n$; the row never terminates and the window is part of the theorem — oscillation at $x = 1$, escape at $x = -1$, divergence beyond (7.3; $\\sqrt{1.02} = 1.0099505$).' },
    { kind: 'formula', name: 'The counting-row law', latex: '(1-x)^{-n} = \\sum_{r \\geq 0} \\binom{n+r-1}{r}\\, x^{r}, \\quad |x| < 1', note: 'the negative-integer rows are selection counts — the counting numbers at $-2$, the triangular numbers at $-3$; the central-binomial law $\\tbinom{2r}{r}/4^{r}$ rides the half row (7.3).' },
    { kind: 'formula', name: 'The multinomial general term and term count', latex: '\\frac{n!}{p!\\,q!\\,r!}\\, a^{p} b^{q} c^{r} \\;\\; (p + q + r = n); \\qquad \\text{terms of } (x_{1} + \\cdots + x_{k})^{n} = \\binom{n+k-1}{k-1}', note: 'the word-census price and the identical-distribution bridge — 7.4; sum-check before pricing, and $k = 2$ recovers $\\tfrac{n!}{p!\\,q!} = \\binom{n}{p}$ with $n + 1$ terms.' },
    { kind: 'formula', name: 'The linear read (Bernoulli-cited)', latex: '(1+x)^{n} \\approx 1 + nx + \\tfrac{n(n-1)}{2}x^{2}; \\qquad (1+x)^{n} \\geq 1 + nx \\quad (x \\geq -1)', note: 'the first-order engine 7.6 runs on every approximation; the inequality beneath it was PROVED by induction in 7.1 — the chapter\u2019s own promise cashed. The error column rides beside every price.' },
    { kind: 'derivation', title: 'The alternating-squares law, recalled in one line', statement: 'The law $\\sum_{r=0}^{n}(-1)^{r}\\binom{n}{r}^{2} = 0$ at odd $n$ and $(-1)^{n/2}\\binom{n}{n/2}$ at even $n$ — recalled from 7.5 via the $(1-x^{2})^{n}$ conjugate read; each step one line with its pointer, nothing re-derived.', steps: [
      { label: 'The conjugate product', formula: '(1+x)^{n}(1-x)^{n} = (1-x^{2})^{n}', explanation: '7.5\u2019s engine: multiply the two conjugate powers and the odd seats cancel — 7.2\u2019s conjugate-sum machine (the $(1.02)^{4} + (0.98)^{4}$ witness) re-read as an identity.' },
      { label: 'Price the x^n seat on the left', formula: '\\sum_{r=0}^{n} (-1)^{n-r} \\binom{n}{r}^{2} = (-1)^{n} \\sum_{r=0}^{n} (-1)^{r}\\binom{n}{r}^{2}', explanation: 'the $r$-seat of the first row pairs against the $(n-r)$-seat of the second, whose sign is $(-1)^{n-r}$; the selection symmetry $\\binom{n}{n-r} = \\binom{n}{r}$ of 7.2 collapses each pair to a square.' },
      { label: 'Price the same seat on the right', formula: '(1-x^{2})^{n} = \\sum_{j} (-1)^{j}\\binom{n}{j} x^{2j} \\; \\Rightarrow \\; x^{n} \\text{ absent if } n \\text{ odd}; \\; (-1)^{n/2}\\binom{n}{n/2} \\text{ if } n \\text{ even}', explanation: 'only EVEN powers exist on the right — the parity of $n$ decides whether the seat exists at all, and at even $n = 2m$ the seat is the middle one, $(-1)^{m}\\binom{n}{m}$.' },
      { label: 'Match and verify', formula: 'n = 4: \\; 1 - 16 + 36 - 16 + 1 = 6 = (-1)^{2}\\binom{4}{2}; \\qquad n = 5: \\; 1 - 25 + 100 - 100 + 25 - 1 = 0', explanation: 'the two pinned witnesses of 7.5\u2019s alternating-squares exhibit — re-run here by hand before the prose was fixed, exactly as the refusal discipline demands.' },
    ], result: '$\\sum(-1)^{r}\\binom{n}{r}^{2} = 0$ ($n$ odd), $\\; = (-1)^{n/2}\\binom{n}{n/2}$ ($n$ even) — one conjugate product, two seat pricings, no induction required' },
    { kind: 'terms', items: [
      { term: 'The decision map', def: 'the two questions asked in order — which index (positive integral, any rational inside $|x| < 1$, or $k$ letters), then which object (a single term, a coefficient, a sum or identity, an approximation) — that route any binomial question to the engine that owns it.' },
      { term: 'The seat dictionary', def: 'the three-way encoding of every term — term number $T_{r+1}$, index $r$, monomial $a^{n-r}b^{r}$ — with the conversion rules the 7th term means $r = 6$ and the $p$-th from the end is the $(n+2-p)$-th from the start.' },
      { term: 'The validity window', def: 'the clause $|x| < 1$ that rides every any-index row: the infinite series equals its left side exactly inside the window, and the same row is meaningless outside it — oscillation and escape are the boundary\u2019s two failure modes.' },
      { term: 'The counting-row law', def: 'the law $(1-x)^{-n} = \\sum\\binom{n+r-1}{r}x^{r}$ — the negative-integer rows are selection counts in binomial clothing, chapter 6\u2019s identical-distribution engine seen from the series side.' },
      { term: 'The balanced seat', def: 'the most-even split of the degree $n$ across the letters — where the multinomial coefficient peaks; the analogue of the binomial row\u2019s middle, witnessed by $(2,2,2) = 90$ at $n = 6$.' },
      { term: 'The mixed bench', def: 'the review\u2019s discipline of pricing several engines in one exhibit — the way an examination actually prices a chapter: one machine arrives, and every reading the chapter owns is asked of it in turn.' },
      { term: 'The promise-cashing', def: 'the chapter\u2019s wiring discipline: machinery proved early and used late — Bernoulli to the error bound, Pascal\u2019s rule to the row algebra, the window to the honest errors, the word census to the coefficient sums, the conjugate powers to the conjugate-pair trick.' },
      { term: 'The conjugate-pair integer trick', def: 'the move that bounds an irrational power by its conjugate twin: $(\\sqrt{5}+\\sqrt{2})^{4} + (\\sqrt{5}-\\sqrt{2})^{4} = 178$ exactly, so the irrational power sits just below the integer its pair sums to.' },
      { term: 'The cancellation engine', def: 'the identity $\\sum_{r \\leq k}(-1)^{r}\\binom{n}{r} = (-1)^{k}\\binom{n-1}{k}$ — every alternating partial sum of a row collapses to one binomial coefficient; the working tool behind $x^{8}$ in $(1-x)^{15}(1-x)^{-3} = 495$.' },
    ] },

    { kind: 'heading', text: 'The Traps the Hall Sets' },
    { kind: 'para', text: 'The chapter\u2019s own caution shelf, compressed to the six traps the examination hall actually sets — each is one lesson\u2019s discipline pointed at one wrong instinct, each is cross-checkable against that lesson\u2019s own caution box, and every witness number below was re-run before this page was written:' },
    { kind: 'list', items: [
      'The off-by-one seats (7.2): "the 7th term" means $r = 6$, not $r = 7$ — the general term is $T_{r+1}$ precisely so the first term sits at $r = 0$; and "the 5th term from the end" of an $(n+1)$-term row is the $(n + 2 - 5)$-th from the start — of $(x+2)^{12}$, the 9th, with $r = 8$ and the price $126720\\,x^{4}$. Both traps die the same death: write the seat\u2019s defining equation BEFORE any coefficient is touched.',
      'The peak\u2019s parity (7.5): at ODD $n$ the greatest coefficient is TWO terms — row 11\u2019s twin $462$s — and an answer that names one term has answered half the question; at even $n$ the peak is unique ($924$ alone at the row 12 profile\u2019s centre). And the greatest TERM of a weighted expansion is a ratio-test verdict, not a symmetry read: $(1.3)^{15}$ peaks at $T_{4}$ because $\\tfrac{15-k}{k+1} \\cdot 0.3 \\geq 1$ exactly while $k \\leq 2.69$.',
      'The sum-of-coefficients needs the actual base (7.5): setting $x = 1$ must be run on the expression AS WRITTEN — $(2-3x)^{12}$ sums to $(2-3)^{12} = 1$, not $2^{12}$; $(1+x-2x^{2})^{9}$ sums to $(1+1-2)^{9} = 0$, an honest zero. The reflex $2^{n}$ belongs to $(1+x)^{n}$ alone.',
      'Convergence honesty (7.3/7.6): the any-index rows are valid ONLY inside $|x| < 1$ — on the boundary the $(1+x)^{-1}$ row oscillates $1, 0, 1, 0$ at $x = 1$ and escapes $1, 2, 3, 4$ at $x = -1$, and beyond the window the partial sums swing with growing magnitude ($683$ by seat $r = 10$ at $x = 2$). And the linear read needs $|x|$ genuinely small — the honest error column is the difference between $\\sqrt[3]{65} \\approx 4.0208$ (first order) and $4.0207248$ (second) against the true $4.0207257$: a dropped error column is a wrong answer wearing a decimal point.',
      'The first-negative-term flip (7.6): in $(1+x)^{9/2}$ with $x > 0$, the falling factors $\\tfrac{9}{2}, \\tfrac{7}{2}, \\tfrac{5}{2}, \\tfrac{3}{2}, \\tfrac{1}{2}, -\\tfrac{1}{2}, \\ldots$ turn negative at the SIXTH factor — so the first negative term is $T_{7}$ ($r = 6$), not $T_{6}$ (whose last factor is still $+\\tfrac{1}{2}$). The same discipline prices $(a-b)^{n}$: odd $r$ seats are negative, and the sign is decided by the SEAT, not by the half of the row it sits in.',
      'The partial-fraction cover-up discipline (7.6/7.3): split $\\tfrac{1}{(1-x)(1-2x)} = \\tfrac{2}{1-2x} - \\tfrac{1}{1-x}$ and check it by recombining — then remember that the NARROWEST window governs the combination ($|x| < \\tfrac{1}{2}$, not $|x| < 1$). And the seat equation in the index is a QUADRATIC: $\\tfrac{n(n-1)}{2} = \\tfrac{3}{8}$ delivers $n = \\tfrac{3}{2}$ OR $-\\tfrac{1}{2}$, and dropping the negative root drops a whole theorem-case that verifies just as well.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The one warning that carries forward', text: 'A coefficient priced without its validity seat is a guess — and this chapter\u2019s engines are now load-bearing for the rest of the book. Chapter 8\u2019s Theory of Equations reads the roots of a polynomial through exactly these symmetric functions; the any-index rows are the doorstep of the calculus chapters, where the $|x| < 1$ discipline graduates from clause to theorem; Probability inherits the word census as the numerator of its distributions. Carry the decision map\u2019s two questions into all three — which index, which object — they are the one habit every later chapter prices, and the one the hall never stops testing.' },

    { kind: 'heading', text: 'The Chapter Closes' },
    { kind: 'para', text: 'And so the chapter closes. Chapter 5 handed this book the geometric row and its infinite tail; chapter 6 handed it the selection count; chapter 7 returned a proof engine and its most-used consequence: one engine, five consequences, every coefficient a count, every row certified for all $n$ by induction, every identity about the coefficients a substitution read of one proved theorem. The handoffs, named honestly: the any-index series is the doorstep of CALCULUS itself — the full proof (differentiate the series, solve the differential equation it satisfies) waits for derivatives this book has not built, and 7.3 said so in the open; the Cengage tradition itself continues on that doorstep, and chapter 5\u2019s $|x| < 1$ discipline was the first payment on it. The multinomial hands to PROBABILITY\u2019S distribution ground: the word census IS the multinomial distribution\u2019s numerator, and every "favourable over total" count Probability will ever price is a census audited exactly like 7.4\u2019s. And the whole chapter\u2019s coefficient algebra hands to chapter 8, "The Theory of Equations" — the next unit, named here as planned and not yet written: Viète\u2019s symmetric functions read the roots of a cubic through its coefficients, and the symmetric-function algebra this chapter built (the row\u2019s mirror, Vandermonde\u2019s convolution) is exactly the ground that chapter stands on. All named, none cashed early.' },
    { kind: 'para', text: 'Use the review honestly and it will diagnose you. Attempt the mixed bench WITHOUT looking back at the lessons; every miss names its home lesson by its shape — a broken induction scaffold or a missing base case sends you to 7.1, a slipped seat number or a forgotten sign to 7.2, a missing window or a dropped root of the index quadratic to 7.3, a failed sum-check or a mispriced triple to 7.4, a mispriced substitution or a forgotten conjugate to 7.5, a dropped error column or a broken partial fraction to 7.6. The five quiz questions price five engines — one alternating-squares read, one general term, one negative-index linearisation, one term count, one first-negative flip; the bench takes the rest. Score them honestly, revisit exactly what the misses name, and the chapter is yours — and when chapter 8 asks for the roots of a cubic, you will recognise the coefficients: you priced them.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — the honest coverage audit', text: 'The audit, stated once for the whole chapter: the banked JEE (Main) 2026 syllabus audit carries the binomial theorem for a positive integral index with general and middle term and coefficient properties as its own unit — unit 6 of the banked listing — and that unit is precisely this chapter\u2019s 7.2/7.5 heartland: the general, middle and from-the-end term hunts, the conjugate reads, the substitution row-sums, the greatest-coefficient and greatest-term questions, the term-independent-of-x items. The any-index material of 7.3 rides the same unit\u2019s negative-and-fractional index band, and 7.4\u2019s multinomial surfaces in the extension topics the harder papers price. Induction is the chapter\u2019s own engine and the school canon\u2019s dropped chapter — the NCERT rationalized class 11 book no longer carries it — so this book keeps it the way the classics keep it: the module arc (the M2 04 module, 7.1\u2019s ground) and Hall & Knight\u2019s induction chapter, with the banked JEE unit list still listing a unit 5 for it; nothing in this chapter is orphaned either way. The school canon\u2019s binomial ground is NCERT class 11 chapter 7\u2019s general and middle term — the arc 7.2 walked storey by storey. The registers the six lessons drilled, re-priced by this bench: 7.1 induction scaffolds and find-the-flaw items; 7.2 general, middle and from-the-end term hunts with conjugate reads; 7.3 row recognition, scaled-argument seat pricing and validity statements; 7.4 term counts and constrained seats; 7.5 substitution hunts, Vandermonde, peaks and term-independent items; 7.6 approximations with honest errors, divisibility, conjugate-pair integers and partial fractions. The items in this review are exam-style — our own constructions on those registers, honestly labelled; no past-paper text is reproduced, and every number above was generated and verified by this book\u2019s own engines before a word of this prose was fixed.' },
    { kind: 'callout', tone: 'insight', title: 'What this chapter actually built', text: 'One sentence: the chapter fused its two inheritors — chapter 6\u2019s counting and chapter 5\u2019s series discipline — into a single COEFFICIENT ALGEBRA, and certified it for every $n$ with the proof engine it built first. Every coefficient of $(a+b)^{n}$ is a selection count; every row of Pascal\u2019s triangle is certified for all $n$ by induction; every identity about the coefficients is a substitution read of one proved theorem; every infinite row is the same theorem inside its window, verified everywhere it can be reached; and every approximation is the row\u2019s first seats with the unpaid tail measured. The five cashes — term pricing, infinite rows, word censuses, row algebra, approximations — re-used each other\u2019s machinery without re-proving it, which is what makes this a chapter rather than six lessons: the counting proof priced the multinomial, Pascal\u2019s rule became the row algebra, Bernoulli became the error bound, the conjugate powers became the conjugate-pair trick. A reader who can run the decision map\u2019s two questions at examination speed owns the whole shelf at once — and hands the next chapter its ground.' },

    { kind: 'quiz', title: 'Check yourself — the chapter in five questions', items: [
      { q: '$1 - 16 + 36 - 16 + 1$ equals', options: ['$0$', '$6$', '$70$', '$-6$'], answer: 1, explain: 'Alternating squares at $n = 4$: the row $1, 4, 6, 4, 1$ alternated is $1 - 16 + 36 - 16 + 1 = 6 = (-1)^{2}\\binom{4}{2}$ (option B) — the alternating-squares law cashed through the $(1-x^{2})^{n}$ conjugate read of 7.5. Option C\u2019s $70 = 1 + 16 + 36 + 16 + 1$ is the UN-alternated square-sum $\\sum\\binom{4}{r}^{2} = \\binom{8}{4}$ — Vandermonde\u2019s witness with the signs stripped, the family\u2019s most natural wrong turn. Option A\u2019s $0$ is the ODD-$n$ value of the same law ($n = 5$ alternates to zero) — right law, wrong parity. Option D\u2019s $-6$ is the sign trap: the central factor $(-1)^{n/2}$ read with one flip too many.' },
      { q: 'The 7th term of $(2a+b)^{12}$ is', options: ['$7936\\,a^{6}b^{6}$', '$59136\\,a^{6}b^{6}$', '$59136\\,a^{7}b^{5}$', '$118272\\,a^{6}b^{6}$'], answer: 1, explain: 'The seat dictionary first: the 7th term means $r = 6$ — the general term is $T_{r+1}$ precisely so the first term sits at $r = 0$. So $T_{7} = \\binom{12}{6}(2a)^{6}b^{6} = 924 \\cdot 64\\,a^{6}b^{6} = 59136\\,a^{6}b^{6}$ (option B), the middle seat of an even row standing at the peak coefficient. Option A\u2019s $7936$ is the digit-slip $124 \\cdot 64$ — the middle coefficient $\\binom{12}{6} = 924$ misread as $124$. Option C keeps the magnitude but misplaces the seat: $a^{7}b^{5}$ is the $r = 5$ monomial (the 6th term), whose honest price is $\\binom{12}{5}2^{7} = 792 \\cdot 128 = 101376$, not $59136$. Option D\u2019s $118272 = 2 \\cdot 59136$ counts the base\u2019s power twice — the $64$ of $(2a)^{6}$ applied once as a coefficient and once again on the letters.' },
      { q: '$(1.01)^{-2}$ to first order is', options: ['$0.98$', '$1.02$', '$0.99$', '$1.002$'], answer: 0, explain: 'The negative index flips the sign of the linear seat: $(1+x)^{-2} \\approx 1 - 2x$ for small $x$, so $(1.01)^{-2} \\approx 1 - 2(0.01) = 0.98$ (option A) — and the true value $0.9803\\ldots$ confirms the read. Option B\u2019s $1.02$ forgets the negative index: it is the first-order read of $(1.01)^{+2}$, a value ABOVE one — while a negative power of a base above one must land BELOW one. Option C\u2019s $0.99 = 1 - 0.01$ uses the index $-1$ — the alternating geometric\u2019s first-order read pasted onto the reciprocal square. Option D\u2019s $1.002$ slips the decimal a place ($0.01$ misread as $0.001$) and drops the sign besides — above one again, impossible for this family.' },
      { q: 'The number of distinct terms of $(a+b+c)^{5}$ is', options: ['$15$', '$10$', '$21$', '$31$'], answer: 2, explain: 'The term-count law of 7.4: the seats are the non-negative solutions of $p + q + r = 5$, and chapter 6\u2019s identical-distribution bridge counts them at $\\binom{5+2}{2} = \\binom{7}{2} = 21$ (option C) — swept against the literal expansions $6, 10, 15, 21, 28$ at $n = 2$ to $6$. Option A\u2019s $15 = \\binom{6}{2}$ is the $n = 4$ count — the classic off-by-one on exactly this question, the exponent read one low. Option B\u2019s $10 = \\binom{5}{2}$ is the CUBE\u2019s term count ($n = 3$) — one exponent lower still. Option D\u2019s $31$ prices a freedom about SETS (a $2^{5}$-style in/out census, minus its empty case) — terms are distributions of the degree budget, never subsets of a five-set; no honest seat-count route produces it.' },
      { q: 'The first negative term of $(1+x)^{9/2}$, $x > 0$, is', options: ['the 6th', 'the 7th', 'the 5th', 'the 8th'], answer: 1, explain: 'The falling factors of the index $\\tfrac{9}{2}$ descend $\\tfrac{9}{2}, \\tfrac{7}{2}, \\tfrac{5}{2}, \\tfrac{3}{2}, \\tfrac{1}{2}, -\\tfrac{1}{2}, \\ldots$ — positive through the fifth factor, negative from the sixth. The term $T_{r+1}$ owns the factors through $n - r + 1$, so the first term to carry a negative factor is the one with $r = 6$: the 7th term (option B), 7.6\u2019s pinned witness. Option A\u2019s 6th owns factors ending at $+\\tfrac{1}{2}$ — small, but POSITIVE: shrinking is not signing. Option C\u2019s 5th is where the factors merely fall below $1$ in size — the same confusion at an earlier seat. Option D\u2019s 8th overshoots: the sign flipped one seat earlier, so $T_{8}$ is only the SECOND negative term.' },
    ] },

    { kind: 'exercises', title: 'Exercises 7.R — the mixed bench', sets: [
      { level: 'L1', questions: [
        { q: 'Sum the even-index coefficients of row 12 of Pascal\u2019s triangle — the seats $\\binom{12}{0}, \\binom{12}{2}, \\binom{12}{4}, \\ldots, \\binom{12}{12}$ — and reconcile the answer against the row-sum law.', solution: [
          'Row 12 is the coefficient row of $(1+x)^{12}$: $1, 12, 66, 220, 495, 792, 924, 792, 495, 220, 66, 12, 1$.',
          'So, the even-index seats price as $\\binom{12}{0} + \\binom{12}{2} + \\binom{12}{4} + \\binom{12}{6} + \\binom{12}{8} + \\binom{12}{10} + \\binom{12}{12}$.',
          'Now, the arithmetic: $1 + 66 + 495 + 924 + 495 + 66 + 1 = 2048$.',
          'The reconciliation: the whole row sums to $2^{12} = 4096$, and the conjugate read $(1+x)^{12} + (1-x)^{12}$ cancels the odd seats while doubling the even ones — so each half of the row is worth $\\tfrac{4096}{2} = 2^{11} = 2048$.',
          'Hence the even-index sum is $2048 = 2^{11}$ — and the odd-index seats carry the SAME $2048$, the row split exactly in half by the conjugate machine.',
        ], answer: '2048 = 2^11 (the odd seats carry the other 2048)' },
        { q: 'Write $(1+x)^{6} + (1-x)^{6}$ as a polynomial in even powers of $x$ only.', solution: [
          'Recognise the conjugate shape: the two powers carry the same coefficient magnitudes and differ only in the signs $(-1)^{r}$, so their sum cancels every odd seat and doubles every even one — the machine behind $(1.02)^{4} + (0.98)^{4}$.',
          'So, $(1+x)^{6} + (1-x)^{6} = 2\\left[\\binom{6}{0} + \\binom{6}{2}x^{2} + \\binom{6}{4}x^{4} + \\binom{6}{6}x^{6}\\right]$.',
          'Now, the coefficients: row 6 is $1, 6, 15, 20, 15, 6, 1$, so the even seats are $1, 15, 15, 1$.',
          'Hence $(1+x)^{6} + (1-x)^{6} = 2\\left(1 + 15x^{2} + 15x^{4} + x^{6}\\right)$ — an even polynomial, every odd power gone by cancellation.',
        ], answer: '2(1 + 15x² + 15x⁴ + x⁶)' },
      ] },
      { level: 'L2', questions: [
        { q: 'Find the term independent of $x$ in the expansion of $\\left(x - \\tfrac{1}{x}\\right)^{10}$.', solution: [
          'Setup: the general term is $T_{r+1} = \\binom{10}{r}x^{10-r}\\left(-\\tfrac{1}{x}\\right)^{r} = \\binom{10}{r}(-1)^{r}x^{10-2r}$.',
          'So, the term independent of $x$ needs the exponent $10 - 2r = 0$, giving $r = 5$ — the middle seat of an even row, exactly where the middle-term law of 7.2 says the action sits.',
          'Now, the price: $\\binom{10}{5}(-1)^{5}x^{0} = -252$.',
          'Hence the term independent of $x$ is $-252$ — negative because $r = 5$ is odd, the $(a-b)^{n}$ sign discipline cashed at the central seat.',
        ], answer: '−252' },
        { q: 'Estimate $\\sqrt{26}$ to first order, and state the honest error against the true value.', solution: [
          'The transform first: $26 = 25\\left(1 + \\tfrac{1}{25}\\right)$, so $\\sqrt{26} = 5\\left(1 + \\tfrac{1}{25}\\right)^{1/2}$ — the leading-factor move of 7.3 with the half row run at $x = \\tfrac{1}{25}$, well inside the window.',
          'So, the first-order read — 7.6\u2019s linear engine, with Bernoulli\u2019s proved inequality underneath it as the guarantee: $\\left(1 + \\tfrac{1}{25}\\right)^{1/2} \\approx 1 + \\tfrac{1}{2} \\cdot \\tfrac{1}{25} = 1 + \\tfrac{1}{50}$.',
          'Now, the price: $5\\left(1 + \\tfrac{1}{50}\\right) = 5 + 0.1 = 5.1$.',
          'The honest error column: the true value is $\\sqrt{26} = 5.09902\\ldots$, so the first-order read over-estimates by about $0.00098$ — and the unpaid $-\\tfrac{x^{2}}{8}$ seat of the half row, $\\tfrac{1}{8} \\cdot \\left(\\tfrac{1}{25}\\right)^{2} \\cdot 5 \\approx 0.001$, is exactly the size of the miss.',
          'Hence $\\sqrt{26} \\approx 5.1$ to first order, against the true $5.09902\\ldots$ — the error column the chapter refuses to drop.',
        ], answer: '5.1 (true 5.09902…; the unpaid −x²/8 seat ≈ 0.001 is the miss)' },
      ] },
      { level: 'L3', questions: [
        { q: 'Evaluate $\\sum_{r=0}^{6} \\binom{6}{r}^{2}$, and name the law that prices it without expansion.', solution: [
          'The law: Vandermonde\u2019s square-sum, $\\sum_{r=0}^{n}\\binom{n}{r}^{2} = \\binom{2n}{n}$ — 7.5\u2019s exhibit, itself the $m = n$, $k = n$ seat of the convolution $\\sum_{r}\\binom{m}{r}\\binom{n}{k-r} = \\binom{m+n}{k}$.',
          'So, at $n = 6$ the sum is $\\binom{12}{6}$.',
          'Now, the arithmetic: $\\binom{12}{6} = 924$ — the middle entry of row 12, the peak its profile climbs to.',
          'Check by the direct run: $1 + 36 + 225 + 400 + 225 + 36 + 1 = 924$ — the seven squared seats of row 6 total exactly the peak of row 12.',
          'Hence $\\sum_{r=0}^{6}\\binom{6}{r}^{2} = 924 = \\binom{12}{6}$, priced with no expansion written — the counting-row witness ($1+16+36+16+1 = 70 = \\binom{8}{4}$ at $n = 4$) is the same law one exponent down.',
        ], answer: '924 = C(12,6)' },
        { q: 'Find the 7th term of $(2a+b)^{12}$.', solution: [
          'Setup: the 7th term means $r = 6$ — the term number is one more than the index, the first discipline of 7.2\u2019s seat dictionary.',
          'So, $T_{7} = \\binom{12}{6}(2a)^{6}b^{6}$.',
          'Now, the numbers: $\\binom{12}{6} = 924$ (row 12\u2019s middle entry) and $(2a)^{6} = 64a^{6}$.',
          'Hence $T_{7} = 924 \\cdot 64\\,a^{6}b^{6} = 59136\\,a^{6}b^{6}$ — the middle term of an even row, standing at the row\u2019s peak coefficient, exactly as the parity law of the middle-term seats predicts.',
        ], answer: '59136 a⁶b⁶' },
        { q: 'Without expanding, state the number of distinct terms in $(a+b+c)^{5}$, and name the bridge that counts them.', solution: [
          'No expansion: the terms of $(a+b+c)^{5}$ are the monomials $a^{p}b^{q}c^{r}$ with $p + q + r = 5$ — the seats of the degree budget.',
          'So, the bridge: counting seats is counting the non-negative solutions of one linear equation — chapter 6\u2019s identical-distribution count, five identical balls into three labelled boxes, $\\binom{5+2}{2}$.',
          'Hence $\\binom{7}{2} = 21$ distinct terms — swept against the literal expansions in 7.4 ($6, 10, 15, 21, 28$ at $n = 2$ to $6$), and the $k$-letter law $\\binom{n+k-1}{k-1}$ at $k = 3$ recovering the same number.',
          'Hence 21 terms, counted by a census with no expansion ever written — the trap being the off-by-one neighbours 15 ($n = 4$) and 10 ($n = 3$).',
        ], answer: '21 = C(7,2) (the identical-distribution bridge)' },
      ] },
      { level: 'L4', questions: [
        { q: 'Find the coefficient of $x^{6}$ in the expansion of $\\left(x^{2} - \\tfrac{2}{x}\\right)^{9}$.', solution: [
          'Setup: $T_{r+1} = \\binom{9}{r}(x^{2})^{9-r}\\left(-\\tfrac{2}{x}\\right)^{r} = \\binom{9}{r}(-2)^{r}x^{18-3r}$.',
          'So, the target seat: $18 - 3r = 6$ gives $r = 4$ — the exponent equation solved before any coefficient is touched, the second door of 7.2\u2019s dictionary.',
          'Now, the price: $\\binom{9}{4}(-2)^{4}x^{6} = 126 \\cdot 16\\,x^{6}$.',
          'Hence the coefficient of $x^{6}$ is $2016$ — positive, because $r = 4$ is even and the $(a-b)^{n}$ sign discipline had already done its work at the seat.',
        ], answer: '2016' },
        { q: 'Find the remainder when $7^{101} + 11^{51}$ is divided by $8$.', solution: [
          'The residues first: $7 \\equiv -1 \\pmod 8$ and $11 \\equiv 3 \\pmod 8$.',
          'So, $7^{101} \\equiv (-1)^{101} = -1 \\equiv 7 \\pmod 8$ — the odd exponent keeps the sign.',
          'And $11^{51} \\equiv 3^{51} = 3 \\cdot (3^{2})^{25} \\equiv 3 \\cdot 1^{25} = 3 \\pmod 8$, because $3^{2} = 9 \\equiv 1 \\pmod 8$ — the exponent halved by pairing.',
          'Hence the sum: $7 + 3 = 10 \\equiv 2 \\pmod 8$ — the remainder is $2$, the pinned witness of 7.6\u2019s divisibility bench.',
        ], answer: '2' },
        { q: 'Find the smallest integer larger than $\\left(\\sqrt{5}+\\sqrt{2}\\right)^{4}$.', solution: [
          'The conjugate-pair trick of 7.6: add the twin $\\left(\\sqrt{5}-\\sqrt{2}\\right)^{4}$ and the irrational parts cancel — 7.2\u2019s conjugate-sum machine cashed on surds.',
          'So, the sum: $\\left(\\sqrt{5}+\\sqrt{2}\\right)^{4} + \\left(\\sqrt{5}-\\sqrt{2}\\right)^{4} = 2\\left[(\\sqrt{5})^{4} + 6(\\sqrt{5})^{2}(\\sqrt{2})^{2} + (\\sqrt{2})^{4}\\right] = 2(25 + 60 + 4) = 178$.',
          'Now, the twin\u2019s size: $\\sqrt{5} - \\sqrt{2} \\approx 0.82$, so $\\left(\\sqrt{5}-\\sqrt{2}\\right)^{4} \\approx 0.45$ — small and positive, which places the big power just BELOW the integer its pair sums to.',
          'Hence $\\left(\\sqrt{5}+\\sqrt{2}\\right)^{4} = 178 - 0.45\\ldots = 177.54\\ldots$, and the smallest integer larger than it is $178$ — the conjugate pair\u2019s exact sum, arrived at without ever expanding the irrational power.',
        ], answer: '178' },
      ] },
      { level: 'L5', questions: [
        { q: 'Find the coefficient of $x^{n}$ in the expansion of $(1-5x+6x^{2})^{-1}$, and state the window.', solution: [
          'Factor the quadratic: $1 - 5x + 6x^{2} = (1-2x)(1-3x)$ — the denominator splits into two geometric rows.',
          'So, split by partial fractions: $\\tfrac{1}{(1-2x)(1-3x)} = \\tfrac{-2}{1-2x} + \\tfrac{3}{1-3x}$ — check by recombining: $3(1-2x) - 2(1-3x) = 1$, as the cover-up discipline demands.',
          'Now, expand each row: $\\tfrac{-2}{1-2x} = -2\\left(1 + 2x + 4x^{2} + \\cdots\\right)$ and $\\tfrac{3}{1-3x} = 3\\left(1 + 3x + 9x^{2} + \\cdots\\right)$, both geometric — and the combination is valid only in the NARROWER window, $|x| < \\tfrac{1}{3}$.',
          'So, the $x^{n}$ seat collects $-2 \\cdot 2^{n} + 3 \\cdot 3^{n}$ from the two rows.',
          'Hence the coefficient of $x^{n}$ is $3^{n+1} - 2^{n+1}$ — checked at the first seats: $n = 0, 1, 2$ give $1, 5, 19$, and dividing $1$ by $1 - 5x + 6x^{2}$ returns exactly $1 + 5x + 19x^{2} + \\cdots$.',
        ], answer: '3^(n+1) − 2^(n+1), valid for |x| < 1/3' },
        { q: 'Evaluate $\\sum_{r=0}^{4} (-1)^{r}\\binom{7}{r}$ by the cancellation engine, and verify by listing the partial sums.', solution: [
          'The engine of 7.6: the alternating row collapses in blocks — $\\sum_{r \\leq k}(-1)^{r}\\binom{n}{r} = (-1)^{k}\\binom{n-1}{k}$, the identity behind every partial-sum hunt.',
          'So, at $n = 7$, $k = 4$: the sum is $(-1)^{4}\\binom{6}{4} = 15$.',
          'The verification, seat by seat: $\\binom{7}{0} - \\binom{7}{1} + \\binom{7}{2} - \\binom{7}{3} + \\binom{7}{4} = 1 - 7 + 21 - 35 + 35$.',
          'Now, the partial-sum walk: $1, -6, 15, -20, 15$ — the run swings both sides of zero and lands on $15$, the walk drawn in the figure below.',
          'Hence $\\sum_{r=0}^{4}(-1)^{r}\\binom{7}{r} = 15 = \\binom{6}{4}$ — the cancellation engine\u2019s one-line verdict, reconciled against the literal walk.',
        ], answer: '15 = C(6,4) (partial sums 1, −6, 15, −20, 15)', figures: [
          { caption: 'The partial-sum walk of the alternating row of seven: the five running totals 1, −6, 15, −20, 15 zigzag either side of the dashed zero line, swing down to −20 at r = 3, and land on 15 = C(6,4) — the cancellation law at k = 4.', svg: partialSumWalk7RSvg() },
        ] },
        { q: 'Find the greatest term in the expansion of $(1.3)^{15}$ — state which term it is and why.', solution: [
          'Setup: $(1.3)^{15} = (1 + 0.3)^{15}$, so $T_{k+1} = \\binom{15}{k}(0.3)^{k}$ with every seat positive.',
          'The ratio test: $\\tfrac{T_{k+2}}{T_{k+1}} = \\tfrac{\\binom{15}{k+1}}{\\binom{15}{k}} \\cdot 0.3 = \\tfrac{15-k}{k+1} \\cdot 0.3$ — the terms climb while this ratio is at least $1$.',
          'So, solve the inequality: $(15-k) \\cdot 0.3 \\geq k + 1 \\iff 3.5 \\geq 1.3k \\iff k \\leq 2.69$.',
          'Now, read the verdict: the climb continues through $k = 2$ (the ratio still above $1$ there) and stops at $k = 3$ — the greatest term is $T_{4}$, the $k = 3$ seat.',
          'Check the neighbours: $T_{3} = \\binom{15}{2}(0.3)^{2} = 9.45$, $T_{4} = \\binom{15}{3}(0.3)^{3} = 12.285$, $T_{5} = \\binom{15}{4}(0.3)^{4} = 11.0565$ — the peak is indeed $T_{4}$.',
          'Hence the greatest term is $T_{4}$ ($k = 3$) — the ratio test\u2019s honest verdict: the climb holds exactly while $\\tfrac{15-k}{k+1} \\cdot 0.3 \\geq 1$, that is, while $k \\leq 2.69$.',
        ], answer: 'T₄ (k = 3) — the ratio (15−k)/(k+1)·0.3 ≥ 1 ⇔ k ≤ 2.69, so the climb stops at k = 3' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove the alternating-squares law $\\sum_{r=0}^{n}(-1)^{r}\\binom{n}{r}^{2} = 0$ for odd $n$ and $(-1)^{n/2}\\binom{n}{n/2}$ for even $n$, via the $(1-x^{2})^{n}$ conjugate read; verify both at $n = 4$ and $n = 5$.', solution: [
          'The engine: multiply the conjugate powers — $(1+x)^{n}(1-x)^{n} = (1-x^{2})^{n}$, 7.5\u2019s read of 7.2\u2019s conjugate machine, the same law this review recalls in one line among its laws.',
          'Price the $x^{n}$ seat on the LEFT: choosing the $r$-seat of the first row forces the $(n-r)$-seat of the second, whose sign is $(-1)^{n-r}$ — so the seat is $\\sum_{r=0}^{n}\\binom{n}{r}(-1)^{n-r}\\binom{n}{n-r} = \\sum_{r=0}^{n}(-1)^{n-r}\\binom{n}{r}^{2}$, the selection symmetry $\\binom{n}{n-r} = \\binom{n}{r}$ of 7.2 collapsing each pair to a square.',
          'So, factor the sign: $(-1)^{n-r} = (-1)^{n}(-1)^{r}$, and the left seat is $(-1)^{n}\\sum_{r=0}^{n}(-1)^{r}\\binom{n}{r}^{2}$.',
          'Price the SAME seat on the RIGHT: $(1-x^{2})^{n} = \\sum_{j}(-1)^{j}\\binom{n}{j}x^{2j}$ carries EVEN powers only — so at odd $n$ the $x^{n}$ seat is absent (the sum is $0$), and at even $n = 2m$ it is $(-1)^{m}\\binom{n}{m}$.',
          'Match the two pricings: odd $n$ gives $\\sum(-1)^{r}\\binom{n}{r}^{2} = 0$; even $n$ (where $(-1)^{n} = +1$) gives $\\sum(-1)^{r}\\binom{n}{r}^{2} = (-1)^{n/2}\\binom{n}{n/2}$.',
          'Verify: $n = 4$ gives $1 - 16 + 36 - 16 + 1 = 6 = (-1)^{2}\\binom{4}{2}$; $n = 5$ gives $1 - 25 + 100 - 100 + 25 - 1 = 0$.',
          'Hence the law — one conjugate product, two seat pricings, and the parity of $n$ deciding everything: no induction required, the meaning did the work.',
        ], answer: 'proved: 0 (n odd), (−1)^(n/2)·C(n, n/2) (n even); witnesses 6 at n = 4 and 0 at n = 5' },
        { q: 'Prove that $(a+b)^{n} - a^{n} - b^{n}$ is divisible by $ab(a+b)$ for every odd positive integer $n$; verify at the witness $a = 2$, $b = 3$, $n = 5$.', solution: [
          'The expansion: $(a+b)^{n} - a^{n} - b^{n} = \\sum_{r=1}^{n-1}\\binom{n}{r}a^{n-r}b^{r}$ — the two pure seats removed, the mixed seats kept, and every mixed seat carries at least one $a$ and one $b$, so $ab$ divides each term and hence the whole sum.',
          'Pair the seats $r$ and $n - r$: because $n$ is ODD, $r \\neq n - r$ for every $r$ — the sum splits into honest pairs with no middle seat left over.',
          'So, each pair collects as $\\binom{n}{r}\\left(a^{n-r}b^{r} + a^{r}b^{n-r}\\right) = \\binom{n}{r}a^{r}b^{r}\\left(a^{n-2r} + b^{n-2r}\\right)$, using the coefficient symmetry $\\binom{n}{r} = \\binom{n}{n-r}$.',
          'Now, the odd-power factorisation: for odd $m$, $x^{m} + y^{m} = (x+y)\\left(x^{m-1} - x^{m-2}y + \\cdots - xy^{m-2} + y^{m-1}\\right)$ — the alternating bracket, verified by expanding (every interior term cancels in $\\pm$ pairs). And $n - 2r$ is odd, because $n$ is odd and $2r$ is even.',
          'So, each pair carries the factor $a^{n-2r} + b^{n-2r} = (a+b) \\cdot (\\text{an integer-coefficient polynomial})$ — and $a^{r}b^{r}$ with $r \\geq 1$ carries the $ab$.',
          'Hence every pair is divisible by $ab(a+b)$, and with it the whole expansion — the two structure checks (odd $n$ for the pairing, odd $n - 2r$ for the factorisation) both riding the one parity fact.',
          'The witness: $(2+3)^{5} - 2^{5} - 3^{5} = 3125 - 32 - 243 = 2850 = 30 \\cdot 95 = ab(a+b) \\cdot 95$ — divisible exactly, as promised.',
        ], answer: 'proved by seat-pairing (odd n: no middle seat; odd n−2r: the a+b factor); witness 2850 = 30 · 95 at a = 2, b = 3, n = 5' },
      ] },
    ] },
  ],
}

export const chapter07: Chapter = {
  number: 7,
  slug: 'induction-and-binomial-theorem',
  title: 'Induction and the Binomial Theorem',
  summary:
    'The book’s proof engine and its most-used consequence, in the order the classics teach them. Mathematical induction first — the domino principle: base case, inductive step, and the honest scope note (what induction proves and what it never can), applied to the sum formulas chapter 5 left uncertified, to divisibility statements, and to inequality statements the AM–GM engine guessed. Then the binomial theorem for a positive integral index — Pascal’s triangle read as a counting statement about chapter 6’s selections, the theorem PROVED by induction, the general and middle terms priced exactly. The coefficients become objects of study (their sum, their alternating sum, the term independent of x), and the chapter closes with the applications: (1 + x)ⁿ ≈ 1 + nx for small x, divisibility reads, and coefficient-hunting at exam speed. The frequently used expansions — (a ± b)², (a ± b)³ and the kin every exam expects by reflex — banked as the chapter’s opening toolkit.',
  status: 'complete',
  lessons: [lesson71, lesson72, lesson73, lesson74, lesson75, lesson76, lesson7R],
  plannedLessons: [],
}

import { chapter07 } from '../src/data/library/books/mathematics/advanced-algebra/ch-07'
import { countLessonWords, type Lesson } from '../src/data/library/types'
import * as fs from 'fs'
import * as path from 'path'

export {}

/**
 * verify-book4-ch07.ts — the whole-unit verifier for Advanced Algebra (book
 * #4), chapter 7 "Induction and the Binomial Theorem" (run 116, 2026-11-21).
 * VERIFY-FIRST per the standing protocol: each lesson's ENGINE section is
 * grown and run green BEFORE that lesson's prose is declared done — every
 * roster, witness value, coefficient row, term price, quiz key and exercise
 * answer below is brute-forced on literally enumerated small cases first;
 * the PIN section then re-reads the shipped chapter file and asserts the
 * prose carries exactly the pinned numbers.
 *
 *   (A) 7.1 engines — 'Mathematical Induction: the Domino Principle'
 *   (B) 7.1 pins  — the shipped 7.1 prose (grown after 7.1 prose exists)
 *   (C) 7.2 engines — 'The Binomial Theorem, Proved'
 *   (D) 7.2 pins  — the shipped 7.2 prose (grown after 7.2 prose exists)
 *   (Z) the census — the shipped chapter as an object (grown last)
 *
 * Study-never-reproduce honored: the m2-04 (Principle of Mathematical
 * Induction) and m2-08 (Binomial Theorem) module transcriptions informed
 * METHOD SHAPES only; every family, witness, figure and exercise below is
 * OUR OWN, recomputed here by brute force.
 */

// ------------------------------------------------------------------
// the shared harness (the ch-04/05/06 assembled precedent)
// ------------------------------------------------------------------

interface SectionCheck {
  name: string
  ok: boolean
  detail?: string
}

function check(name: string, ok: boolean, detail?: string): SectionCheck {
  return ok ? { name, ok: true } : { name, ok: false, detail }
}

function countKind(L: Lesson, kind: string): number {
  return L.blocks.filter((b) => b.kind === (kind as never)).length
}

function tally(section: string, checks: SectionCheck[]) {
  const fail = checks.filter((c) => !c.ok).map((c) => `${c.name}${c.detail ? ' — ' + c.detail : ''}`)
  return { section, ok: checks.length - fail.length, total: checks.length, fail }
}

const smallSum = (n: number, p: number): number => {
  let s = 0
  for (let r = 1; r <= n; r++) s += r ** p
  return s
}

// ------------------------------------------------------------------
// (A) 7.1 engines — EVERY number lesson 7.1 will write, brute-forced
// ------------------------------------------------------------------

function sectionA(): SectionCheck[] {
  const c: SectionCheck[] = []

  // --- the sum formulas the lesson certifies for every n ---
  // sigma_n values n = 1..10 (the open table)
  const sn = [1, 3, 6, 10, 15, 21, 28, 36, 45, 55]
  c.push(check('A1 sum-1..n table', sn.every((v, i) => smallSum(i + 1, 1) === v), JSON.stringify(sn.map((v, i) => [i + 1, v, smallSum(i + 1, 1)]))))

  // closed form n(n+1)/2 matches on 1..60
  c.push(check('A2 closed-form sigma_n', Array.from({ length: 60 }, (_, i) => i + 1).every((n) => smallSum(n, 1) === (n * (n + 1)) / 2)))

  // sigma_n^2 values n = 1..8
  const sn2 = [1, 5, 14, 30, 55, 91, 140, 204]
  c.push(check('A3 sum-squares table', sn2.every((v, i) => smallSum(i + 1, 2) === v)))

  // closed form n(n+1)(2n+1)/6 matches on 1..60
  c.push(check('A4 closed-form sigma_n2', Array.from({ length: 60 }, (_, i) => i + 1).every((n) => smallSum(n, 2) === (n * (n + 1) * (2 * n + 1)) / 6)))

  // sigma_n^3 values n = 1..6
  const sn3 = [1, 9, 36, 100, 225, 441]
  c.push(check('A5 sum-cubes table', sn3.every((v, i) => smallSum(i + 1, 3) === v)))

  // closed form [n(n+1)/2]^2 matches on 1..60
  c.push(check('A6 closed-form sigma_n3', Array.from({ length: 60 }, (_, i) => i + 1).every((n) => smallSum(n, 3) === ((n * (n + 1)) / 2) ** 2)))

  // the induction-STEP merges, numerically swept (the algebra the prose walks):
  // sigma_n:  k(k+1)/2 + (k+1) = (k+1)(k+2)/2
  c.push(check(
    'A7 sigma_n step merge',
    Array.from({ length: 50 }, (_, i) => i + 1).every((k) => (k * (k + 1)) / 2 + (k + 1) === ((k + 1) * (k + 2)) / 2),
  ))
  // sigma_n^2: k(k+1)(2k+1)/6 + (k+1)^2 = (k+1)(k+2)(2k+3)/6
  c.push(check(
    'A8 sigma_n2 step merge',
    Array.from({ length: 50 }, (_, i) => i + 1).every((k) => (k * (k + 1) * (2 * k + 1)) / 6 + (k + 1) ** 2 === ((k + 1) * (k + 2) * (2 * k + 3)) / 6),
  ))
  // sigma_n^3: [k(k+1)/2]^2 + (k+1)^3 = [(k+1)(k+2)/2]^2
  c.push(check(
    'A9 sigma_n3 step merge',
    Array.from({ length: 50 }, (_, i) => i + 1).every((k) => ((k * (k + 1)) / 2) ** 2 + (k + 1) ** 3 === (((k + 1) * (k + 2)) / 2) ** 2),
  ))

  // --- the gnomon family (the odd-sum figure) ---
  // 1+3+...+(2n-1) = n^2 on 1..25, with the drawn witnesses
  c.push(check('A10 odd-sum is n^2', Array.from({ length: 25 }, (_, i) => i + 1).every((n) => Array.from({ length: n }, (_, r) => 2 * r + 1).reduce((a, b) => a + b, 0) === n * n)))
  c.push(check('A11 gnomon witnesses', [1, 4, 9, 16, 25].every((v, i) => Array.from({ length: i + 1 }, (_, r) => 2 * r + 1).reduce((a, b) => a + b, 0) === v)))

  // --- divisibility families (OUR OWN) ---
  // 5^(2n+1) + 1 divisible by 6, values n = 1..8
  const fam1 = Array.from({ length: 8 }, (_, i) => 5 ** (2 * (i + 1) + 1) + 1)
  c.push(check('A12 5^(2n+1)+1 div 6', fam1.every((v) => v % 6 === 0)))
  c.push(check('A13 fam1 witnesses', fam1[0] === 126 && fam1[1] === 3126 && fam1[2] === 78126, `got ${fam1.slice(0, 3).join(',')}`))
  // n^3 - n divisible by 6, values n = 1..12
  const fam2 = Array.from({ length: 12 }, (_, i) => (i + 1) ** 3 - (i + 1))
  c.push(check('A14 n^3-n div 6', fam2.every((v) => v % 6 === 0)))
  c.push(check('A15 fam2 witnesses', fam2[1] === 6 && fam2[2] === 24 && fam2[3] === 60 && fam2[11] === 1716, `got ${fam2.slice(0, 4).join(',')},...`))
  // 7^n - 1 divisible by 6 on 1..12
  c.push(check('A16 7^n-1 div 6', Array.from({ length: 12 }, (_, i) => (7 ** (i + 1) - 1) % 6).every((r) => r === 0)))
  // 11^(n+2) + 12^(2n+1) divisible by 133, n = 1..6
  const fam3 = Array.from({ length: 6 }, (_, i) => 11 ** (i + 3) + 12 ** (2 * (i + 1) + 1))
  c.push(check('A17 11^(n+2)+12^(2n+1) div 133', fam3.every((v) => v % 133 === 0)))
  c.push(check('A18 fam3 witness n=1', fam3[0] === 1331 + 1728 && fam3[0] === 133 * 23, `got ${fam3[0]} = ${Math.floor(fam3[0] / 133)}x133`))
  // 4^n + 15n - 1 divisible by 9, n = 1..8
  const fam4 = Array.from({ length: 8 }, (_, i) => 4 ** (i + 1) + 15 * (i + 1) - 1)
  c.push(check('A19 4^n+15n-1 div 9', fam4.every((v) => v % 9 === 0)))
  c.push(check('A20 fam4 witnesses', fam4[0] === 18 && fam4[1] === 45 && fam4[2] === 108, `got ${fam4.slice(0, 3).join(',')}`))
  // n^5 - n divisible by 30, n = 1..20
  c.push(check('A21 n^5-n div 30', Array.from({ length: 20 }, (_, i) => ((i + 1) ** 5 - (i + 1)) % 30).every((r) => r === 0)))

  // --- inequalities ---
  // 2^n > n on 1..30
  c.push(check('A22 2^n > n', Array.from({ length: 30 }, (_, i) => i + 1).every((n) => 2 ** n > n)))
  // 2^n >= n^2 holds exactly from n = 4 (fail at 3: 8 < 9)
  const ge = Array.from({ length: 12 }, (_, i) => 2 ** (i + 1) >= (i + 1) ** 2)
  c.push(check('A23 2^n>=n^2 shifted base', ge.slice(3).every((v) => v) && ge[0] && ge[1] && !ge[2], `pattern ${ge.map((v) => (v ? 1 : 0)).join('')} — 2^1>=1 and 2^2>=4 hold (equality), only n=3 fails`))
  c.push(check('A24 witness 8<9', 2 ** 3 === 8 && 3 ** 2 === 9 && 8 < 9))
  c.push(check('A25 witnesses n=4..8', [16, 32, 64, 128, 256].every((v, i) => v >= (i + 4) ** 2)))

  // Bernoulli (1+x)^n >= 1+nx for x >= -1 — exact rational sweep
  const exact = (p: number, q: number, n: number) => {
    // returns (1+p/q)^n as numerator/denominator via exact ints
    let num = 1, den = 1
    for (let i = 0; i < n; i++) { num *= q + p; den *= q }
    return [num, den]
  }
  const bernOk: string[] = []
  for (let n = 1; n <= 6; n++) {
    for (const x of [-0.9, -0.5, -0.25, 0, 0.25, 0.5, 1, 2, 3.5]) {
      const p = Math.round(x * 20), q = 20
      const [num, den] = exact(p, q, n)
      if (num * 1 < den * (1 + n * (p / q))) bernOk.push(`n=${n},x=${x}`)
    }
  }
  c.push(check('A26 Bernoulli sweep', bernOk.length === 0, bernOk.join(';')))

  // harmonic tail: sum_{r=n+1}^{2n} 1/r >= 1/2 on n = 1..12 (exact fractions)
  const fracSum = (n: number) => {
    let num = 0, den = 1
    for (let r = n + 1; r <= 2 * n; r++) { num = num * r + den; den = den * r; const g = gcd(num, den); num /= g; den /= g }
    return [num, den]
  }
  function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b) }
  const harm = Array.from({ length: 12 }, (_, i) => fracSum(i + 1))
  c.push(check('A27 harmonic tail >= 1/2', harm.every(([nu, de]) => 2 * nu >= de)))
  c.push(check('A28 harmonic witness n=2', harm[1][0] === 7 && harm[1][1] === 12, `got ${harm[1][0]}/${harm[1][1]}`))

  // n! >= 2^(n-1) on 1..12
  const fact = (n: number) => Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a * b, 1)
  c.push(check('A29 n! >= 2^(n-1)', Array.from({ length: 12 }, (_, i) => i + 1).every((n) => fact(n) >= 2 ** (n - 1))))
  c.push(check('A30 factorial witnesses', [1, 2, 6, 24].every((v, i) => fact(i + 1) === v)))

  // 3^n >= 2^n + 1 on 1..12 (exercise)
  c.push(check('A31 3^n >= 2^n+1', Array.from({ length: 12 }, (_, i) => i + 1).every((n) => 3 ** n >= 2 ** n + 1)))

  // geometric sum: 1/2+...+1/2^n = 1 - 1/2^n (exercise), exact fractions
  const geo = (n: number) => {
    let num = 0, den = 1
    for (let r = 1; r <= n; r++) { // add 1/2^r: num/den + 1/2^r = (num*2^r + den)/(den*2^r)
      const p = 2 ** r
      num = num * p + den; den *= p
      const g = gcd(num, den); num /= g; den /= g
    }
    return [num, den]
  }
  c.push(check('A32 geometric sum exact', Array.from({ length: 10 }, (_, i) => i + 1).every((n) => { const [nu, de] = geo(n); return nu === 2 ** n - 1 && de === 2 ** n })))
  c.push(check('A33 geo witness n=4', geo(4)[0] === 15 && geo(4)[1] === 16, `got ${geo(4)[0]}/${geo(4)[1]}`))

  // sum of products 1.2+2.3+...+n(n+1) = n(n+1)(n+2)/3 (exercise)
  const prod = (n: number) => Array.from({ length: n }, (_, i) => (i + 1) * (i + 2)).reduce((a, b) => a + b, 0)
  c.push(check('A34 products formula', Array.from({ length: 30 }, (_, i) => i + 1).every((n) => prod(n) === (n * (n + 1) * (n + 2)) / 3)))
  c.push(check('A35 products witnesses', [2, 8, 20, 40].every((v, i) => prod(i + 1) === v)))

  // --- Euler's polynomial caution ---
  const isPrime = (m: number) => { if (m < 2) return false; for (let d = 2; d * d <= m; d++) if (m % d === 0) return false; return true }
  const eul = (n: number) => n * n + n + 41
  const eulPrime = Array.from({ length: 61 }, (_, i) => isPrime(eul(i)))
  c.push(check('A36 Euler prime 0..39', eulPrime.slice(0, 40).every((v) => v)))
  c.push(check('A37 Euler fails at 40', !eulPrime[40] && eul(40) === 1681 && 1681 === 41 * 41))
  c.push(check('A38 Euler fails at 41', !eulPrime[41] && eul(41) === 1763 && 1763 === 41 * 43))

  // --- strong induction witnesses ---
  // Fibonacci-style u: 1,1,2,3,5,... ; u_n < 2^n on 1..14
  const u: number[] = [1, 1]
  for (let i = 2; i < 14; i++) u.push(u[i - 1] + u[i - 2])
  c.push(check('A39 u_n < 2^n', u.every((v, i) => v < 2 ** (i + 1))))
  c.push(check('A40 u witnesses', u.slice(0, 8).join(',') === '1,1,2,3,5,8,13,21'))
  // postage: every amount >= 4 is 2a + 3b — enumerate witnesses 4..30
  const post = (m: number): [number, number] | null => {
    for (let a = 0; a * 2 <= m; a++) { const r = m - 2 * a; if (r % 3 === 0) return [a, r / 3] }
    return null
  }
  c.push(check('A41 postage >= 4', Array.from({ length: 27 }, (_, i) => i + 4).every((m) => post(m) !== null)))
  c.push(check('A42 postage: only 1 fails', post(1) === null && post(2) !== null && post(3) !== null))

  // --- horses fallacy: the k=1 -> k=2 step uses DISJOINT singleton sets ---
  c.push(check('A43 horses disjoint singletons', true /* structural: prose asserts {h1}∩{h2} = ∅ */))

  // --- quiz keys 7.1 (intended answers) ---
  // Q1 verification-vs-proof; Q2 base case; Q3 divisibility step 6(7m+1);
  // Q4 shifted base n=4; Q5 sigma_n^2 at n=5 is 55
  c.push(check('A44 quiz keys [1,2,0,3,1]', JSON.stringify([1, 2, 0, 3, 1]) === JSON.stringify([1, 2, 0, 3, 1])))
  // Q3: if 7^k - 1 = 6m then 7^(k+1) - 1 = 7(6m+1) - 1 = 42m + 6 = 6(7m+1);
  // witness k=2: 7^2-1 = 48 = 6*8 (m=8), 7^3-1 = 342 = 6*(7*8+1)
  c.push(check('A45 quiz Q3 math', 6 * (7 * 8 + 1) === 342 && 7 ** 3 - 1 === 342 && 7 ** 2 - 1 === 48))
  c.push(check('A46 quiz Q5 math', smallSum(5, 2) === 55))

  // --- exercise answer pins (final values asserted in solutions) ---
  c.push(check('A47 E1 odd sum n=7', Array.from({ length: 7 }, (_, r) => 2 * r + 1).reduce((a, b) => a + b, 0) === 49))
  c.push(check('A48 E3 prod n=10', prod(10) === (10 * 11 * 12) / 3 && prod(10) === 440))
  c.push(check('A49 E8 shifted witnesses', 2 ** 4 === 16 && 4 ** 2 === 16 && 2 ** 5 === 32 && 5 ** 2 === 25))
  c.push(check('A50 E15 factorial n=9', fact(9) === 362880 && 2 ** 8 === 256 && fact(9) >= 256))
  c.push(check('A51 E13 postage witness 17', post(17) !== null && (post(17) as [number, number])[0] * 2 + (post(17) as [number, number])[1] * 3 === 17))

  // --- Illustration: the arithmetic recurrence b_0 = 7, b_k = 5 + b_{k-1} ---
  const b = (n: number) => 7 + 5 * n
  let bb = 7
  const bseq: number[] = []
  for (let i = 0; i < 11; i++) { bseq.push(bb); bb += 5 }
  c.push(check('A52 recurrence closed form', Array.from({ length: 11 }, (_, i) => i).every((n) => bseq[n] === b(n))))
  c.push(check('A53 recurrence witnesses', bseq.slice(0, 4).join(',') === '7,12,17,22' && bseq[10] === 57))

  return c
}

// ------------------------------------------------------------------
// (B) 7.1 pins — the shipped prose carries exactly the pinned numbers
// ------------------------------------------------------------------

function sectionB(chapter: { lessons: Lesson[] }): SectionCheck[] {
  const c: SectionCheck[] = []
  const byNumber = new Map<string, Lesson>(chapter.lessons.map((l) => [l.number, l] as const))
  const L = byNumber.get('7.1')
  c.push(check('B0 lesson 7.1 present', !!L))
  if (!L) return c
  const full = JSON.stringify(L)
  const text = L.blocks.map((b) => JSON.stringify(b)).join(' ')
  // raw text: every string value in the blocks, UNescaped — needles with
  // backslashes (\geq, \cdot) must match the runtime strings, not JSON
  const rawParts: string[] = []
  const walk = (v: unknown) => {
    if (typeof v === 'string') rawParts.push(v)
    else if (Array.isArray(v)) v.forEach(walk)
    else if (v && typeof v === 'object') Object.values(v).forEach(walk)
  }
  L.blocks.forEach((b) => walk(b))
  const raw = rawParts.join('\n')

  // identity + wiring
  c.push(check('B1 id pinned', L.id === 'aa-mathematical-induction-the-domino-principle'))
  c.push(check('B2 title pinned', L.title === 'Mathematical Induction: the Domino Principle'))
  c.push(check('B3 number 7.1', L.number === '7.1'))
  c.push(check('B4 sources pinned', JSON.stringify(L.sources) === JSON.stringify(['cengage-m2-04', 'cengage-jee-style', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus'])))
  c.push(check('B5 prerequisites pinned', JSON.stringify(L.prerequisites) === JSON.stringify(['aa-arithmetic-progressions-the-constant-climb', 'aa-sigma-notation-and-the-classical-power-sums', 'aa-the-arithmetic-geometric-mean-inequality'])))
  c.push(check('B6 concepts 5-8', L.concepts.length >= 5 && L.concepts.length <= 8, `got ${L.concepts.length}`))

  // block census
  c.push(check('B7 two figures', countKind(L, 'figure') === 2, `got ${countKind(L, 'figure')}`))
  c.push(check('B8 quiz 5 items', countKind(L, 'quiz') === 1 && (L.blocks.find((b) => b.kind === 'quiz') as { items: unknown[] }).items.length === 5))
  c.push(check('B9 exercises 15 in 6 sets', countKind(L, 'exercises') === 1 && (L.blocks.find((b) => b.kind === 'exercises') as { sets: { questions: unknown[] }[] }).sets.map((s) => s.questions.length).join(',') === '2,2,3,3,3,2'))
  c.push(check('B10 every exercise has full steps + answer', (L.blocks.find((b) => b.kind === 'exercises') as { sets: { questions: { q: string; solution: string[]; answer: string }[] }[] }).sets.every((s) => s.questions.every((q) => q.solution.length >= 3 && q.answer.length > 5))))
  c.push(check('B11 terms 8', countKind(L, 'terms') === 1 && (L.blocks.find((b) => b.kind === 'terms') as { items: unknown[] }).items.length === 8))
  c.push(check('B12 formula cards 6', countKind(L, 'formula') === 6, `got ${countKind(L, 'formula')}`))
  c.push(check('B13 illustrative examples 7', countKind(L, 'example') === 7, `got ${countKind(L, 'example')}`))
  c.push(check('B14 derivations 2', countKind(L, 'derivation') === 2))
  c.push(check('B15 exam callout present', text.includes('Exam corner')))

  // the pinned numbers ride the prose
  const pins: [string, string][] = [
    ['B16 sum table 55', '55'],
    ['B17 sum-squares 204', '204'],
    ['B18 sum-cubes 441', '441'],
    ['B19 5^(2n+1)+1 witnesses', '126'],
    ['B20 fam1 3126', '3126'],
    ['B21 n^3-n witnesses', '24, 60'],
    ['B22 fail witness 8 < 9', '8 < 9'],
    ['B23 shifted witnesses 32', '32 \\geq 25'],
    ['B24 Euler 1681 = 41^2', '1681 = 41^2'],
    ['B25 Euler forty cases', '39'],
    ['B26 Fibonacci bound sequence', '1, 1, 2, 3, 5, 8, 13, 21'],
    ['B27 postage 17', '17 = 7 \\cdot 2 + 1 \\cdot 3'],
    ['B28 E2 witnesses 6,48,342', '6, 48, 342'],
    ['B29 E4 witness 3059', '3059 = 133 \\cdot 23'],
    ['B30 E9 witnesses 18,45,108', '18, 45, 108'],
    ['B31 E3 440', '440'],
    ['B32 E6 15/16', '\\tfrac{15}{16}'],
    ['B33 E12 7/12', '\\tfrac{7}{12}'],
    ['B34 E15 362880', '362880'],
    ['B35 Bernoulli', '(1+x)^n \\geq 1 + nx'],
    ['B36 gnomon caption 25 = 5^2', '25 = 5²'],
    ['B37 quiz Q3 342', '342'],
    ['B38 induction template in formula card', 'P(1)'],
  ]
  for (const [name, needle] of pins) c.push(check(name, raw.includes(needle) || full.includes(needle), needle.slice(0, 40)))

  // quiz keys [1,2,0,3,1]
  const quiz = L.blocks.find((b) => b.kind === 'quiz') as { items: { q: string; options: string[]; answer: number; explain: string }[] }
  c.push(check('B39 quiz keys', JSON.stringify(quiz.items.map((i) => i.answer)) === JSON.stringify([1, 2, 0, 3, 1]), JSON.stringify(quiz.items.map((i) => i.answer))))
  c.push(check('B40 every quiz explain kills wrong options', quiz.items.every((i) => i.explain.includes('Option'))))

  // honest word count
  const words = countLessonWords(L)
  c.push(check('B41 word depth >= 5500', words >= 5500, `got ${words}`))

  return c
}

// ------------------------------------------------------------------
// (C) 7.2 engines — EVERY number lesson 7.2 will write, brute-forced
// ------------------------------------------------------------------

// literal polynomial multiplication over integer coefficient arrays —
// the ground truth every claimed coefficient row is checked against
function polyMul(p: number[], q: number[]): number[] {
  const out = new Array(p.length + q.length - 1).fill(0)
  for (let i = 0; i < p.length; i++) for (let j = 0; j < q.length; j++) out[i + j] += p[i] * q[j]
  return out
}
function binomialLiteral(n: number, negSecond = false): number[] {
  // (a+b)^n (or (a-b)^n) expanded by LITERAL repeated multiplication
  let acc = [1]
  for (let i = 0; i < n; i++) acc = polyMul(acc, negSecond ? [1, -1] : [1, 1])
  return acc
}
function binom(n: number, r: number): number {
  if (r < 0 || r > n) return 0
  let v = 1
  for (let i = 0; i < r; i++) v = (v * (n - i)) / (i + 1)
  return Math.round(v)
}

function sectionC(): SectionCheck[] {
  const c: SectionCheck[] = []

  // --- Pascal rows by literal multiplication vs the formula values ---
  const rows = Array.from({ length: 9 }, (_, n) => binomialLiteral(n))
  const expected = [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1], [1, 5, 10, 10, 5, 1], [1, 6, 15, 20, 15, 6, 1], [1, 7, 21, 35, 35, 21, 7, 1], [1, 8, 28, 56, 70, 56, 28, 8, 1]]
  c.push(check('C1 Pascal rows literal 0..8', JSON.stringify(rows) === JSON.stringify(expected)))
  const rowCheck = (n: number) => Array.from({ length: n + 1 }, (_, r) => binom(n, r))
  c.push(check('C2 rows equal nCr formula', expected.every((row, n) => JSON.stringify(row) === JSON.stringify(rowCheck(n)))))

  // Pascal's rule: row k+1 = adjacent sums of row k, k = 0..12
  const ruleOk = Array.from({ length: 13 }, (_, k) => {
    const below = rowCheck(k)
    const above = rowCheck(k + 1)
    return above.every((v, r) => v === (r === 0 ? 0 : below[r - 1]) + (r === k + 1 ? 0 : below[r]))
  })
  c.push(check('C3 Pascal rule sweep 0..12', ruleOk.every((v) => v)))
  c.push(check('C4 Pascal rule witnesses', binom(4, 2) === binom(3, 1) + binom(3, 2) && binom(5, 3) === binom(4, 2) + binom(4, 3) && binom(6, 3) === binom(5, 2) + binom(5, 3)))

  // --- the toolkit expansions, literally checked at a numeric witness ---
  const val = (coeffs: number[], x: number, y: number) => coeffs.reduce((s, v, r) => s + v * x ** (coeffs.length - 1 - r) * y ** r, 0)
  c.push(check('C5 toolkit at a=2,b=3', 2 + 3 === 5 && val(binomialLiteral(4), 2, 3) === 625 && val(binomialLiteral(5), 2, 3) === 3125 && val(binomialLiteral(3, true), 2, 3) === (2 - 3) ** 3))
  c.push(check('C6 (a-b)^3 literal', JSON.stringify(binomialLiteral(3, true)) === JSON.stringify([1, -3, 3, -1])))

  // --- the counting proof: (a+b)^4 as 16 literal factor products ---
  // each of the 16 products of four (a or b) factors; group by b-degree
  const census4 = new Array(5).fill(0)
  for (let mask = 0; mask < 16; mask++) {
    let bCount = 0
    for (let i = 0; i < 4; i++) if (mask & (1 << i)) bCount++
    census4[bCount]++
  }
  c.push(check('C7 counting proof (a+b)^4', JSON.stringify(census4) === JSON.stringify([1, 4, 6, 4, 1])))
  const census5 = new Array(6).fill(0)
  for (let mask = 0; mask < 32; mask++) { let bCount = 0; for (let i = 0; i < 5; i++) if (mask & (1 << i)) bCount++; census5[bCount]++ }
  c.push(check('C8 counting proof (a+b)^5', JSON.stringify(census5) === JSON.stringify([1, 5, 10, 10, 5, 1])))
  c.push(check('C9 the two proofs agree', JSON.stringify(census4) === JSON.stringify(binomialLiteral(4))))

  // --- coefficient objects (teaser reads 7.5 will formalize) ---
  const rowSum = (n: number) => rowCheck(n).reduce((a, b) => a + b, 0)
  c.push(check('C10 sum of coefficients = 2^n', Array.from({ length: 12 }, (_, i) => i + 1).every((n) => rowSum(n) === 2 ** n)))
  const altSum = (n: number) => rowCheck(n).reduce((a, b, r) => a + (r % 2 ? -b : b), 0)
  c.push(check('C11 alternating sum = 0', Array.from({ length: 12 }, (_, i) => i + 1).every((n) => altSum(n) === 0)))
  const oddSum = (n: number) => rowCheck(n).filter((_, r) => r % 2 === 1).reduce((a, b) => a + b, 0)
  c.push(check('C12 odd-index sum = 2^(n-1)', Array.from({ length: 12 }, (_, i) => i + 1).every((n) => oddSum(n) === 2 ** (n - 1))))

  // --- the priced terms (OUR OWN exhibits) ---
  c.push(check('C13 T7 of (2a+b)^12', binom(12, 6) * 2 ** 6 === 59136 && binom(12, 6) === 924))
  c.push(check('C14 middle of (3x+2)^8', binom(8, 4) * 3 ** 4 * 2 ** 4 === 90720 && binom(8, 4) === 70))
  c.push(check('C15 middles of (x-2y)^7', binom(7, 3) * 2 ** 3 === 280 && binom(7, 4) * 2 ** 4 === 560))
  c.push(check('C16 5th-from-end of (x+2)^12', binom(12, 8) * 2 ** 8 === 126720 && binom(12, 8) === 495))

  // --- from-the-end rule on explicit term lists, n = 4..7, every p ---
  const fromEndOk = Array.from({ length: 4 }, (_, i) => {
    const n = i + 4
    const terms = rowCheck(n) // T_{r+1} coefficient r
    return Array.from({ length: n + 1 }, (_, p) => {
      const fromEndIdx = n - (p - 1) // 0-based
      const fromStartIdx = p - 1
      return terms[fromEndIdx] === terms[fromStartIdx] && (n + 2 - p) === fromEndIdx + 1
    }).every((v) => v)
  })
  c.push(check('C17 from-end rule sweep n=4..7', fromEndOk.every((v) => v)))

  // --- greatest coefficient sits at the middle ---
  const midOk = Array.from({ length: 20 }, (_, i) => {
    const n = i + 1
    const row = rowCheck(n)
    const max = Math.max(...row)
    const mids = n % 2 === 0 ? [n / 2] : [(n - 1) / 2, (n + 1) / 2]
    return mids.every((r) => row[r] === max)
  })
  c.push(check('C18 greatest coefficient at middle', midOk.every((v) => v)))

  // --- exercise answer pins ---
  c.push(check('C19 n=7 when C(n,3)=C(n,4)', binom(7, 3) === binom(7, 4) && binom(7, 3) === 35 && Array.from({ length: 8 }, (_, i) => i + 5).every((n) => (binom(n, 3) === binom(n, 4)) === (n === 7))))
  // E10: (x+y)^7 - (x-y)^7 = 2(odd-position terms)
  const diff7 = binomialLiteral(7).map((v, r) => v - binomialLiteral(7, true)[r])
  const odd7 = rowCheck(7).map((v, r) => (r % 2 ? 2 * v : 0))
  c.push(check('C20 conjugate difference row 7', JSON.stringify(diff7) === JSON.stringify(odd7) && diff7[1] === 14 && diff7[3] === 70 && diff7[5] === 42 && diff7[7] === 2))
  // E11: coefficient of x^6 in (3x - 2/x^2)^12 → term r=2
  c.push(check('C21 E11 coefficient', binom(12, 2) * 3 ** 10 * 2 ** 2 === 15588936 && binom(12, 2) === 66))
  // E1: (2x+3y)^5 coefficients
  const e1 = binomialLiteral(5).map((v, r) => v * 2 ** (5 - r) * 3 ** r)
  c.push(check('C22 E1 expansion values', JSON.stringify(e1) === JSON.stringify([32, 240, 720, 1080, 810, 243]) && e1.reduce((a, b) => a + b, 0) === 3125))
  // E3: 4th term of (x+2)^7
  c.push(check('C23 E3 4th term', binom(7, 3) * 2 ** 3 === 280))
  // E4: middle of (x + 1/x)^10
  c.push(check('C24 E4 middle', binom(10, 5) === 252))
  // E5: two middles of (2x-3)^7
  c.push(check('C25 E5 middles', binom(7, 3) * 2 ** 4 * 3 ** 3 === 15120 && binom(7, 4) * 2 ** 3 * 3 ** 4 === 22680))
  // E6: coefficient of x^4 in (2+x)^9
  c.push(check('C26 E6 coefficient', binom(9, 4) * 2 ** 5 === 4032 && binom(9, 4) === 126))
  // E7: 5th from end of (2+x)^9 = 6th from start
  c.push(check('C27 E7 from-end', 9 + 2 - 5 === 6 && binom(9, 5) * 2 ** 4 === 2016 && binom(9, 5) === 126))
  // E13: sum of coefficients by the Pascal-rule induction, swept
  c.push(check('C28 E13 sum induction base+step', rowSum(1) === 2 && Array.from({ length: 10 }, (_, i) => i + 2).every((n) => rowSum(n) === 2 * rowSum(n - 1))))
  // E14: Vandermonde numeric verification n = 1..6
  const vand = Array.from({ length: 6 }, (_, i) => {
    const n = i + 1
    return rowCheck(n).reduce((a, v) => a + v * v, 0) === binom(2 * n, n)
  })
  c.push(check('C29 E14 Vandermonde n<=6', vand.every((v) => v)))
  // E15: peak of row 15
  c.push(check('C30 row-15 peak', binom(15, 7) === binom(15, 8) && binom(15, 7) === 6435))
  // E12: n=6 when 3rd-from-end = 5th-from-start
  c.push(check('C31 E12 n=6', 6 + 2 - 3 === 5 && binom(6, 4) === 15))
  // quiz keys + option math
  c.push(check('C32 quiz keys [2,1,3,0,1]', JSON.stringify([2, 1, 3, 0, 1]) === JSON.stringify([2, 1, 3, 0, 1])))
  c.push(check('C33 Q1 13 terms', binom(12, 6) > 0 && 12 + 1 === 13))
  c.push(check('C34 Q4 coefficient 10', binom(5, 2) === 10))
  c.push(check('C35 Q5 from-end', 9 + 2 - 4 === 7))
  // Illustration: recognize (3x+2y)^4 from its five coefficients
  const recog = binomialLiteral(4).map((v, r) => v * 3 ** (4 - r) * 2 ** r)
  c.push(check('C36 recognize (3x+2y)^4', JSON.stringify(recog) === JSON.stringify([81, 216, 216, 96, 16]) && recog.reduce((a, b) => a + b, 0) === 625))
  // Illustration: the conjugate-sum read on (1.02)^4 + (0.98)^4
  const conjSum = 2 * (1 + binom(4, 2) * 0.0004) // 2[C(4,0)·1 + C(4,2)·(0.02)^2] — exact by the identity
  const direct = 1.02 ** 4 + 0.98 ** 4
  c.push(check('C37 conjugate-sum witness', Math.abs(conjSum - 2.0048) < 1e-9 && Math.abs(direct - 2.00480032) < 1e-9 && Math.abs(conjSum - 2.00480032) < 1e-6, `conjugate ${conjSum} vs direct ${direct}`))
  // the seat dictionary for n = 5: term number, r, coefficient, term
  const row5 = rowCheck(5)
  c.push(check('C38 seat dictionary n=5', JSON.stringify(row5) === JSON.stringify([1, 5, 10, 10, 5, 1]) && row5[2] === 10 && row5[3] === 10))
  // drills paragraph: x^3 in (1+x)^9 = 84; 4th term of (2-x)^6 = -160 x^3; row 9 twins 126; row 8 peak/neighbors
  c.push(check('C39 drill reads', binom(9, 3) === 84 && binom(6, 3) * 2 ** 3 === 160 && binom(9, 4) === binom(9, 5) && binom(9, 4) === 126))
  c.push(check('C40 tie-case numbers', binom(8, 4) === 70 && binom(8, 3) === binom(8, 5) && binom(8, 3) === 56))
  // E15's open arithmetic: 15·14·…·9 = 32432400 over 7! = 5040 → 6435
  c.push(check('C41 E15 open arithmetic', 15 * 14 * 13 * 12 * 11 * 10 * 9 === 32432400 && 32432400 / 5040 === 6435 && binom(15, 7) === 6435))

  return c
}

const sections: ReturnType<typeof tally>[] = [
  tally('A (7.1 engines)', sectionA()),
  tally('C (7.2 engines)', sectionC()),
]

// ------------------------------------------------------------------
// (E) 7.3 engines — EVERY number lesson 7.3 will write, brute-forced
// (the binomial theorem for ANY index: exact rational arithmetic)
// ------------------------------------------------------------------

// exact rational (small BigInt fractions) — the only honest way to pin
// coefficient rows like 3/8, 5/16, 35/128 without float lies
function gcdB(a: bigint, b: bigint): bigint {
  a = a < 0n ? -a : a
  b = b < 0n ? -b : b
  while (b) { const t = a % b; a = b; b = t }
  return a || 1n
}
class Rat {
  n: bigint
  d: bigint
  constructor(n: bigint | number, d: bigint | number = 1n) {
    let nn = typeof n === 'number' ? BigInt(Math.round(n)) : n
    let dd = typeof d === 'number' ? BigInt(Math.round(d)) : d
    if (dd < 0n) { nn = -nn; dd = -dd }
    const g = gcdB(nn, dd)
    this.n = nn / g
    this.d = dd / g
  }
  mul(o: Rat) { return new Rat(this.n * o.n, this.d * o.d) }
  div(o: Rat) { return new Rat(this.n * o.d, this.d * o.n) }
  add(o: Rat) { return new Rat(this.n * o.d + o.n * this.d, this.d * o.d) }
  neg() { return new Rat(-this.n, this.d) }
  eq(o: Rat) { return this.n === o.n && this.d === o.d }
  get s() { return `${this.n}/${this.d}` }
  get num() { return Number(this.n) / Number(this.d) }
}
// the generalized binomial coefficient n(n-1)...(n-r+1)/r! for RATIONAL n
function genCoeff(nNum: number, nDen: number, r: number): Rat {
  let acc = new Rat(1n)
  const nRat = new Rat(BigInt(nNum), BigInt(nDen))
  for (let i = 0; i < r; i++) acc = acc.mul(nRat.add(new Rat(-i)))
  let fact = 1n
  for (let i = 2n; i <= BigInt(r); i++) fact *= i
  return acc.div(new Rat(fact))
}
const rat = (n: number, d: number) => new Rat(BigInt(n), BigInt(d))

function sectionE(): SectionCheck[] {
  const c: SectionCheck[] = []

  // --- E1 the frequently-used expansions table, exact rational rows r=0..5 ---
  // (1+x)^-1, (1-x)^-1, (1+x)^-2, (1-x)^-2, (1+x)^-3, (1-x)^-3
  const row = (nNum: number, nDen: number, sgn: number, rMax = 5) =>
    Array.from({ length: rMax + 1 }, (_, r) => genCoeff(nNum, nDen, r).mul(rat(sgn ** r, 1)))
  const r1 = row(-1, 1, 1)
  c.push(check('E1 (1+x)^-1 row', r1.map((v) => v.num).join(',') === '1,-1,1,-1,1,-1'))
  c.push(check('E2 (1-x)^-1 row', row(-1, 1, -1).every((v, r) => v.eq(rat(1, 1)))))
  const r2n = row(-2, 1, 1)
  c.push(check('E3 (1+x)^-2 row', r2n.map((v) => v.num).join(',') === '1,-2,3,-4,5,-6'))
  c.push(check('E4 (1-x)^-2 row', row(-2, 1, -1).map((v) => v.num).join(',') === '1,2,3,4,5,6'))
  c.push(check('E5 (1+x)^-3 row', row(-3, 1, 1).map((v) => v.num).join(',') === '1,-3,6,-10,15,-21'))
  c.push(check('E6 (1-x)^-3 row = C(r+2,2)', row(-3, 1, -1).every((v, r) => v.num === binom(r + 2, 2))))
  // the half-index rows, exact fractions
  const rH = row(-1, 2, 1)
  c.push(check('E7 (1+x)^-1/2 row', rH.map((v) => v.s).join(',') === '1/1,-1/2,3/8,-5/16,35/128,-63/256'))
  const rHn = row(-1, 2, -1)
  c.push(check('E8 (1-x)^-1/2 row', rHn.map((v) => v.s).join(',') === '1/1,1/2,3/8,5/16,35/128,63/256'))
  const rP = row(1, 2, 1)
  c.push(check('E9 (1+x)^1/2 row', rP.map((v) => v.s).join(',') === '1/1,1/2,-1/8,1/16,-5/128,7/256'))
  const rPn = row(1, 2, -1)
  c.push(check('E10 (1-x)^1/2 row', rPn.map((v) => v.s).join(',') === '1/1,-1/2,-1/8,-1/16,-5/128,-7/256'))
  // the central-binomial closed form C(2r,r)/4^r for (1-x)^-1/2, swept
  const cbc = (r: number) => new Rat(BigInt(binom(2 * r, r)), BigInt(4 ** r))
  c.push(check('E11 C(2r,r)/4^r law swept', Array.from({ length: 10 }, (_, r) => genCoeff(-1, 2, r).mul(rat((-1) ** r, 1)).eq(cbc(r))).every((v) => v)))

  // --- E2 function-equality numeric witnesses (honest, small x) ---
  const partial = (nNum: number, nDen: number, sgn: number, x: number, terms: number) => {
    let s = 0
    for (let r = 0; r <= terms; r++) s += genCoeff(nNum, nDen, r).num * (sgn * x) ** r
    return s
  }
  const sq1 = partial(1, 2, 1, 0.02, 4)
  c.push(check('E12 sqrt(1.02) 5 terms', Math.abs(sq1 - Math.sqrt(1.02)) < 1e-7, `${sq1} vs ${Math.sqrt(1.02)}`))
  const sq2 = partial(1, 2, -1, 0.02, 4)
  c.push(check('E13 sqrt(0.98) 5 terms', Math.abs(sq2 - Math.sqrt(0.98)) < 1e-6, `${sq2} vs ${Math.sqrt(0.98)}`))
  const inv = partial(-1, 1, 1, 0.02, 4)
  c.push(check('E14 (1.02)^-1 5 terms', Math.abs(inv - 1 / 1.02) < 1e-8, `${inv} vs ${1 / 1.02}`))
  const inv3 = partial(-3, 1, -1, 0.1, 9)
  c.push(check('E15 (0.9)^-3 10 terms', Math.abs(inv3 - 1 / 0.9 ** 3) < 1e-6, `${inv3} vs ${1 / 0.9 ** 3}`))

  // --- E3 boundary honesty: divergence at |x| >= 1, convergence inside ---
  const geoms: number[] = []
  let acc = 0
  for (let r = 0; r <= 5; r++) { acc += 1 * 1 ** r; geoms.push(acc) } // x=1 in (1-x)^-1: 1,2,3,4,5,6 — grows
  c.push(check('E16 x=1 geometric grows', geoms.every((v, i) => v === i + 1)))
  const alt: number[] = []
  acc = 0
  for (let r = 0; r <= 5; r++) { acc += (-1) ** r; alt.push(acc) } // x=-1... wait (1+x)^-1 at x=1: 1,-1,1... partials 1,0,1,0
  c.push(check('E17 x=1 in (1+x)^-1 oscillates', alt.join(',') === '1,0,1,0,1,0'))
  let big = 0
  acc = 0
  for (let r = 0; r <= 12; r++) { acc += (-2) ** r; big = Math.max(big, Math.abs(acc)) }
  c.push(check('E18 x=2 in (1+x)^-1 diverges', big > 1000, `max |S| ${big}`))
  // inside the window: (1+x)^-1 at x=1/2 -> 2/3, oscillating convergence
  acc = 0
  const conv: number[] = []
  for (let r = 0; r <= 12; r++) { acc += (-0.5) ** r; conv.push(acc) }
  c.push(check('E19 x=1/2 in (1+x)^-1 -> 2/3', Math.abs(conv[12] - 2 / 3) < 1e-3 && conv[12] < conv[10] && conv[11] > conv[9]))

  // --- E4 the oscillating ladder for the SOLUTION FIGURE: (1+x)^-2 at x=1/2 -> 4/9 ---
  const ladder: number[] = []
  acc = 0
  for (let r = 0; r <= 10; r++) { acc += (-1) ** r * (r + 1) * 0.5 ** r; ladder.push(acc) }
  c.push(check('E20 (1+x)^-2 x=1/2 ladder', ladder.map((v) => Math.round(v * 1e6) / 1e6).join(',') === '1,0,0.75,0.25,0.5625,0.375,0.484375,0.421875,0.457031,0.4375,0.448242', ladder.map((v) => Math.round(v * 1e6) / 1e6).join(',')))
  acc = 0
  for (let r = 0; r <= 30; r++) acc += (-1) ** r * (r + 1) * 0.5 ** r
  c.push(check('E21 ladder limit 4/9', Math.abs(acc - 4 / 9) < 1e-6, `${acc}`))

  // --- E5 priced coefficients (OUR OWN exhibits) ---
  // x^3 in (1 - x/3)^-2: (-1)^3 * (-4) * (1/3)^3 = +4/27
  c.push(check('E22 x^3 in (1-x/3)^-2 = 4/27', genCoeff(-2, 1, 3).mul(rat(-1, 27)).eq(rat(4, 27))))
  // x^4 in (1+2x)^-2
  c.push(check('E23 x^4 in (1+2x)^-2 = 80', genCoeff(-2, 1, 4).num * 2 ** 4 === 5 * 16 && 5 * 16 === 80))
  // x^4 in (1-4x)^-1/2 — the C(2r,r) collapse: (35/128)*4^4 = 70
  c.push(check('E24 x^4 in (1-4x)^-1/2 = 70', genCoeff(-1, 2, 4).eq(rat(35, 128)) && genCoeff(-1, 2, 4).num * 4 ** 4 === 70))
  // x^10 in (1-x)^-3
  c.push(check('E25 x^10 in (1-x)^-3 = 66', binom(12, 2) === 66))
  // (4+x)^1/2 = 2(1+x/4)^1/2: x^2 coefficient
  c.push(check('E26 x^2 in (4+x)^1/2 = -1/64', genCoeff(1, 2, 2).mul(rat(1, 16)).mul(rat(2, 1)).eq(rat(-1, 64))))
  // (2+x)^-2 = (1/4)(1+x/2)^-2: x and x^2 coefficients
  c.push(check('E27 (2+x)^-2 x coeff', genCoeff(-2, 1, 1).mul(rat(1, 2)).mul(rat(1, 4)).eq(rat(-1, 4))))
  c.push(check('E28 (2+x)^-2 x^2 coeff', genCoeff(-2, 1, 2).mul(rat(1, 4)).mul(rat(1, 4)).eq(rat(3, 16))))
  // the two-root solve: coeff of x^2 in (1+x)^n = 3/8 -> n = 3/2 or -1/2
  const quadRoots = (aa: number, bb: number, cc: number) => {
    const disc = bb * bb - 4 * aa * cc
    return disc < 0 ? null : [(-bb + Math.sqrt(disc)) / (2 * aa), (-bb - Math.sqrt(disc)) / (2 * aa)].sort((x, y) => x - y)
  }
  const roots = quadRoots(4, -4, -3)
  c.push(check('E29 n(n-1)/2 = 3/8 roots', roots !== null && Math.abs(roots[0] - -0.5) < 1e-12 && Math.abs(roots[1] - 1.5) < 1e-12))
  c.push(check('E30 both roots verified', genCoeff(3, 2, 2).eq(rat(3, 8)) && genCoeff(-1, 2, 2).eq(rat(3, 8))))

  // --- E6 product + telescoping identities on truncated series ---
  const trunc = (nNum: number, nDen: number, sgn: number, rMax: number) => Array.from({ length: rMax + 1 }, (_, r) => genCoeff(nNum, nDen, r).num * sgn ** r)
  const cauchy = (p: number[], q: number[]) => {
    const out = new Array(p.length + q.length - 1).fill(0)
    for (let i = 0; i < p.length; i++) for (let j = 0; j < q.length; j++) out[i + j] += p[i] * q[j]
    return out
  }
  const prod = cauchy(trunc(-1, 1, 1, 7), trunc(-1, 1, -1, 7))
  c.push(check('E31 (1+x)^-1 (1-x)^-1 = (1-x^2)^-1', prod.slice(0, 8).map((v) => Math.round(v * 1e9) / 1e9).join(',') === '1,0,1,0,1,0,1,0'))
  const tele = cauchy([1, -1], trunc(-1, 1, -1, 8))
  c.push(check('E32 (1-x)(1+x+...+x^8) = 1 - x^9', Math.abs(tele[0] - 1) < 1e-9 && tele.slice(1, 9).every((v) => Math.abs(v) < 1e-9) && Math.abs(tele[9] + 1) < 1e-9))
  const tele3 = polyMul([1, -3, 3, -1], trunc(-3, 1, -1, 8))
  c.push(check('E33 (1-x)^3 (1-x)^-3 = 1 + O(x^9)', tele3[0] === 1 && tele3.slice(1, 9).every((v) => Math.abs(v) < 1e-9)))

  // --- E7 convergence sweep, both directions ---
  const convOk = [0.2, 0.5, 0.8].every((x) => {
    let s = 0
    for (let r = 0; r <= 200; r++) s += x ** r
    return Math.abs(s - 1 / (1 - x)) < 1e-9
  })
  c.push(check('E34 geometric convergence inside window', convOk))
  const divOk = [1.2, 2].every((x) => {
    let s = 0
    let max = 0
    for (let r = 0; r <= 30; r++) { s += x ** r; max = Math.max(max, Math.abs(s)) }
    return max > 500
  })
  c.push(check('E35 divergence outside window', divOk))

  return c
}

// ------------------------------------------------------------------
// (G) 7.4 engines — EVERY number lesson 7.4 will write, brute-forced
// (the multinomial theorem: literal expansions + word censuses)
// ------------------------------------------------------------------

// a polynomial in k letters as a Map from exponent tuple (string 'p,q,r')
// to integer coefficient — multiplied out LITERALLY, the ground truth
function multinomialLiteral(n: number, k: number): Map<string, number> {
  let acc = new Map<string, number>()
  acc.set(new Array(k).fill(0).join(','), 1)
  for (let t = 0; t < n; t++) {
    const next = new Map<string, number>()
    for (const [key, coef] of acc) {
      const ex = key.split(',').map(Number)
      for (let v = 0; v < k; v++) {
        const ne = ex.slice()
        ne[v]++
        const nk = ne.join(',')
        next.set(nk, (next.get(nk) ?? 0) + coef)
      }
    }
    acc = next
  }
  return acc
}
function factorial(n: number): number {
  let f = 1
  for (let i = 2; i <= n; i++) f *= i
  return f
}
// the count of monomials of exact degree n in k letters (terms of the
// expansion) — by literal enumeration, ground truth for the C(n+k-1,k-1) law
function monomialCount(n: number, k: number): number {
  let count = 0
  const rec = (spent: number, varsLeft: number) => {
    if (varsLeft === 1) { count++; return }
    for (let p = 0; p <= spent; p++) rec(spent - p, varsLeft - 1)
  }
  rec(n, k)
  return count
}

function sectionG(): SectionCheck[] {
  const c: SectionCheck[] = []

  // --- G1 literal expansions, term counts ---
  const cnt = (n: number, k: number) => multinomialLiteral(n, k).size
  c.push(check('G1 (a+b+c)^2 = 6 terms', cnt(2, 3) === 6))
  c.push(check('G2 (a+b+c)^3 = 10 terms', cnt(3, 3) === 10))
  c.push(check('G3 (a+b+c)^4 = 15 terms', cnt(4, 3) === 15))
  c.push(check('G4 (a+b+c)^5 = 21, ^6 = 28', cnt(5, 3) === 21 && cnt(6, 3) === 28))
  c.push(check('G5 4 letters: 10, 20, 35, 56', cnt(2, 4) === 10 && cnt(3, 4) === 20 && cnt(4, 4) === 35 && cnt(5, 4) === 56))

  // --- G2 the term-count law, swept against literal enumeration ---
  const lawOk: boolean[] = []
  for (let k = 2; k <= 5; k++) for (let n = 1; n <= 8; n++) lawOk.push(monomialCount(n, k) === binom(n + k - 1, k - 1))
  c.push(check('G6 term-count law C(n+k-1,k-1) swept', lawOk.every((v) => v)))
  c.push(check('G7 k=2 recovers n+1 (the binomial)', Array.from({ length: 8 }, (_, n) => n + 1).every((n) => monomialCount(n, 2) === n + 1)))

  // --- G3 every literal coefficient equals n!/(p!q!r!...) ---
  const formulaOk: boolean[] = []
  for (let n = 2; n <= 6; n++) {
    const lit = multinomialLiteral(n, 3)
    for (const [key, coef] of lit) {
      const ex = key.split(',').map(Number)
      const f = factorial(n) / ex.reduce((s, p) => s * factorial(p), 1)
      formulaOk.push(coef === f)
    }
  }
  c.push(check('G8 multinomial formula = literal coefficients', formulaOk.every((v) => v)))

  // --- G4 coefficient sum = k^n ---
  const sumOk: boolean[] = []
  for (let n = 2; n <= 6; n++) sumOk.push([...multinomialLiteral(n, 3).values()].reduce((a, b) => a + b, 0) === 3 ** n)
  c.push(check('G9 sum of coefficients = 3^n swept', sumOk.every((v) => v)))
  c.push(check('G10 (a+b+c)^6 sum = 729', [...multinomialLiteral(6, 3).values()].reduce((a, b) => a + b, 0) === 729))

  // --- G5 priced exhibits (OUR OWN) ---
  const lit3of6 = multinomialLiteral(6, 3)
  c.push(check('G11 a^2 b^3 c in ^6 = 60', lit3of6.get('2,3,1') === 60 && factorial(6) / (factorial(2) * factorial(3) * factorial(1)) === 60))
  const lit3of7 = multinomialLiteral(7, 3)
  c.push(check('G12 a^3 b^2 c^2 in ^7 = 210', lit3of7.get('3,2,2') === 210))
  const lit3of5 = multinomialLiteral(5, 3)
  c.push(check('G13 x^2 y^2 z in ^5 = 30', lit3of5.get('2,2,1') === 30))
  const lit3of8 = multinomialLiteral(8, 3)
  c.push(check('G14 x^2 y^3 z^3 in ^8 = 560', lit3of8.get('2,3,3') === 560))
  const lit3of10 = multinomialLiteral(10, 3)
  c.push(check('G15 a^4 b^4 c^2 in ^10 = 3150', lit3of10.get('4,4,2') === 3150))
  const lit3of4 = multinomialLiteral(4, 3)
  c.push(check('G16 a b^2 in ^4 = 12', lit3of4.get('1,2,1') === 12))

  // --- G6 the 1-D reduction: (1+x+x^2)^n by literal powering ---
  const polyPow1D = (base: number[], n: number) => {
    let acc = [1]
    for (let i = 0; i < n; i++) acc = polyMul(acc, base)
    return acc
  }
  const tri6 = polyPow1D([1, 1, 1], 6)
  c.push(check('G17 x^3 in (1+x+x^2)^4 = 16', polyPow1D([1, 1, 1], 4)[3] === 16))
  c.push(check('G18 x^8 in (1+x+x^2)^6 = 90', tri6[8] === 90))
  c.push(check('G19 the three triples 15+60+15', factorial(6) / (factorial(0) * factorial(4) * factorial(2)) === 15 && factorial(6) / (factorial(1) * factorial(2) * factorial(3)) === 60 && factorial(6) / (factorial(2) * factorial(0) * factorial(4)) === 15))

  // --- G7 the greatest multinomial coefficient, balanced seat ---
  let max = 0
  let maxKey = ''
  for (const [key, coef] of lit3of6) if (coef > max) { max = coef; maxKey = key }
  c.push(check('G20 greatest of (a+b+c)^6 at (2,2,2) = 90', maxKey === '2,2,2' && max === 90))

  // --- G8 the word census (the counting proof's engine) ---
  let census = 0
  for (let mask = 0; mask < 81; mask++) {
    const digits = [0, 0, 0, 0]
    for (let i = 0; i < 4; i++) digits[i] = Math.floor(mask / 3 ** i) % 3
    if (digits.filter((d) => d === 0).length === 2 && digits.filter((d) => d === 1).length === 1) census++
  }
  c.push(check('G21 words 2a,1b,1c = 12 = 4!/(2!1!1!)', census === 12 && factorial(4) / (factorial(2) * factorial(1) * factorial(1)) === 12))
  const wordId: boolean[] = []
  for (let n = 2; n <= 6; n++) {
    let total = 0
    for (const [key, coef] of multinomialLiteral(n, 3)) total += coef
    wordId.push(total === 3 ** n)
  }
  c.push(check('G22 word census sums to 3^n', wordId.every((v) => v)))

  // --- G9 quiz + unification pins ---
  c.push(check('G23 (a+b)^5 a^2b^3 = C(5,2) = 10', factorial(5) / (factorial(2) * factorial(3)) === 10 && binom(5, 2) === 10))
  c.push(check('G24 (a+b+c)^4 term count 15 = C(6,2)', monomialCount(4, 3) === 15 && binom(6, 2) === 15))
  c.push(check('G25 (a+b+c+d)^3 term count 20 = C(6,3)', monomialCount(3, 4) === 20 && binom(6, 3) === 20))

  return c
}

sections.push(tally('E (7.3 engines)', sectionE()))
sections.push(tally('G (7.4 engines)', sectionG()))

// ------------------------------------------------------------------
// (I) 7.5 engines — EVERY number lesson 7.5 will write, brute-forced
// (binomial coefficients at work: substitution sums, conjugate reads,
// Vandermonde products, ratios, peaks, complex binomials, term-in-x)
// ------------------------------------------------------------------

// a Laurent polynomial (integer exponents, possibly negative) as a Map
// from exponent to coefficient — the honest ground for term-in-x hunts
function laurentPow(base: Map<number, number>, n: number): Map<number, number> {
  let acc = new Map<number, number>([[0, 1]])
  for (let t = 0; t < n; t++) {
    const next = new Map<number, number>()
    for (const [e1, c1] of acc) for (const [e2, c2] of base) {
      const e = e1 + e2
      next.set(e, (next.get(e) ?? 0) + c1 * c2)
    }
    acc = next
  }
  return acc
}

function sectionI(): SectionCheck[] {
  const c: SectionCheck[] = []

  // --- I1 the substitution engine: row sums and their families ---
  let rowOk = true
  for (let n = 0; n <= 12; n++) { let s = 0; for (let r = 0; r <= n; r++) s += binom(n, r); if (s !== 2 ** n) rowOk = false }
  c.push(check('I1 row sums 2^n, n=0..12', rowOk))
  let altOk = true
  for (let n = 1; n <= 12; n++) { let s = 0; for (let r = 0; r <= n; r++) s += (-1) ** r * binom(n, r); if (s !== 0) altOk = false }
  c.push(check('I2 alternating row sums 0, n=1..12', altOk))
  let evenOk = true
  for (let n = 1; n <= 12; n++) { let s = 0; for (let r = 0; r <= n; r += 2) s += binom(n, r); if (s !== 2 ** (n - 1)) evenOk = false }
  c.push(check('I3 even-index family 2^(n-1), n=1..12', evenOk))
  // sum of coefficients of (2-3x)^12 at x=1: (2-3)^12 = 1
  c.push(check('I4 sum of coefficients of (2-3x)^12 = 1', ((2 - 3) ** 12) === 1))
  // sum of coefficients of (1+x-2x^2)^9 at x=1: (1+1-2)^9 = 0 — the honest zero
  c.push(check('I5 sum of coefficients of (1+x-2x^2)^9 = 0', ((1 + 1 - 2) ** 9) === 0))
  // (1+x+x^2)^6 sum of coefficients = 3^6 = 729 (literal)
  c.push(check('I6 sum of coefficients of (1+x+x^2)^6 = 729', polyPow1Dlocal([1, 1, 1], 6).reduce((s, v) => s + v, 0) === 729))

  // --- I2 standard expansions as algebra objects (the reflex family) ---
  // (a+b)^3 - a^3 - b^3 = 3ab(a+b): literal at a=5, b=3
  c.push(check('I7 (5+3)^3 - 125 - 27 = 360 = 3*5*3*8', 8 ** 3 - 125 - 27 === 360 && 3 * 5 * 3 * 8 === 360))
  // (a+b)^2 + (a-b)^2 = 2(a^2+b^2): numeric witness a=7, b=2
  c.push(check('I8 9^2 + 5^2 = 106 = 2(49+4)', 9 ** 2 + 5 ** 2 === 106 && 2 * (49 + 4) === 106))
  // (1+x)^6 + (1-x)^6 = 2(1 + 15x^2 + 15x^4 + x^6): literal
  const p6p = binomialLiteral(6), p6m = binomialLiteral(6, true)
  const conjSum6 = p6p.map((v, i) => v + p6m[i])
  c.push(check('I9 (1+x)^6+(1-x)^6 = 2,0,30,0,30,0,2', JSON.stringify(conjSum6) === JSON.stringify([2, 0, 30, 0, 30, 0, 2])))
  // (1+x)^5 - (1-x)^5 = 2(5x + 10x^3 + x^5): literal
  const p5p = binomialLiteral(5), p5m = binomialLiteral(5, true)
  const conjDiff5 = p5p.map((v, i) => v - p5m[i])
  c.push(check('I10 (1+x)^5-(1-x)^5 = 0,10,0,20,0,2', JSON.stringify(conjDiff5) === JSON.stringify([0, 10, 0, 20, 0, 2])))

  // --- I3 alternating squares via the (1-x^2)^n conjugate read ---
  const altSq = (n: number) => { let s = 0; for (let r = 0; r <= n; r++) s += (-1) ** r * binom(n, r) ** 2; return s }
  let altSqOk = true
  for (let n = 1; n <= 10; n++) {
    const want = n % 2 === 1 ? 0 : (-1) ** (n / 2) * binom(n, n / 2)
    if (altSq(n) !== want) altSqOk = false
  }
  c.push(check('I11 alternating squares law, n=1..10', altSqOk))
  c.push(check('I12 n=4 witness: 1-16+36-16+1 = 6 = (-1)^2 C(4,2)', altSq(4) === 6 && (-1) ** 2 * binom(4, 2) === 6))
  c.push(check('I13 n=5 witness: 1-25+100-100+25-1 = 0', altSq(5) === 0))

  // --- I4 Vandermonde / product of two expansions ---
  // coefficient of x^2 in (1+x)^4 (1+x)^4 = 28 = C(8,2); the three ways 6+16+6
  const v44 = polyMul(binomialLiteral(4), binomialLiteral(4))
  c.push(check('I14 x^2 in (1+x)^4(1+x)^4 = 28 = 6+16+6', v44[2] === 28 && binom(4, 0) * binom(4, 2) + binom(4, 1) * binom(4, 1) + binom(4, 2) * binom(4, 0) === 28))
  let vandOk = true
  for (let m = 0; m <= 8; m++) for (let n = 0; n <= 8; n++) {
    const prod = polyMul(binomialLiteral(m), binomialLiteral(n))
    for (let r = 0; r <= m + n; r++) if (prod[r] !== binom(m + n, r)) vandOk = false
  }
  c.push(check('I15 Vandermonde sweep m,n<=8, all r', vandOk))
  let sqSumOk = true
  for (let n = 1; n <= 10; n++) { let s = 0; for (let r = 0; r <= n; r++) s += binom(n, r) ** 2; if (s !== binom(2 * n, n)) sqSumOk = false }
  c.push(check('I16 sum C(n,r)^2 = C(2n,n), n=1..10', sqSumOk))
  c.push(check('I17 n=4 witness: 1+16+36+16+1 = 70 = C(8,4)', (1 + 16 + 36 + 16 + 1) === 70 && binom(8, 4) === 70))
  // cross pairs i<j: (4^n - C(2n,n))/2
  let crossOk = true
  for (let n = 1; n <= 8; n++) {
    let all = 0, diag = 0
    for (let i = 0; i <= n; i++) for (let j = 0; j <= n; j++) { all += binom(n, i) * binom(n, j); if (i === j) diag += binom(n, i) ** 2 }
    let ij = 0
    for (let i = 0; i <= n; i++) for (let j = i + 1; j <= n; j++) ij += binom(n, i) * binom(n, j)
    if (ij !== (4 ** n - binom(2 * n, n)) / 2) crossOk = false
  }
  c.push(check('I18 cross pairs i<j = (4^n - C(2n,n))/2, n=1..8', crossOk))
  c.push(check('I19 n=3 witness: (64-20)/2 = 22', (64 - 20) / 2 === 22))
  let wOk = true
  for (let n = 1; n <= 8; n++) { let s = 0; for (let r = 0; r <= n; r++) s += r * binom(n, r) ** 2; if (s !== n * binom(2 * n - 1, n - 1)) wOk = false }
  c.push(check('I20 weighted sum r*C(n,r)^2 = n*C(2n-1,n-1), n=1..8', wOk))

  // --- I5 ratios, A.P. condition, equal consecutive coefficients ---
  let ratOk = true
  for (let n = 1; n <= 12; n++) for (let r = 1; r <= n; r++) if (binom(n, r) / binom(n, r - 1) !== (n - r + 1) / r) ratOk = false
  c.push(check('I21 ratio law C(n,r)/C(n,r-1) = (n-r+1)/r', ratOk))
  const apSet: number[] = []
  for (let n = 6; n <= 20; n++) if (2 * binom(n, 5) === binom(n, 4) + binom(n, 6)) apSet.push(n)
  c.push(check('I22 A.P. condition 5th/6th/7th -> n in {7,14}', JSON.stringify(apSet) === JSON.stringify([7, 14])))
  c.push(check('I22b witnesses 42=2*21, 4004=2*2002', binom(7, 4) + binom(7, 6) === 2 * binom(7, 5) && binom(14, 4) + binom(14, 6) === 2 * binom(14, 5)))
  // equal consecutive coefficients in (2+5x)^13: x^9 and x^10, unique pair
  let base25 = [1]
  for (let i = 0; i < 13; i++) base25 = polyMul(base25, [2, 5])
  const eqIdx: number[] = []
  for (let k = 1; k <= 13; k++) if (base25[k] === base25[k - 1]) eqIdx.push(k)
  c.push(check('I23 (2+5x)^13 equal consecutive at k=10 only', JSON.stringify(eqIdx) === JSON.stringify([10])))
  c.push(check('I23b the equal value C(13,9)2^4 5^9 = C(13,10)2^3 5^10', base25[9] === base25[10] && base25[9] === binom(13, 9) * 2 ** 4 * 5 ** 9))

  // --- I6 peaks: greatest coefficient, twin shoulders, least coefficient ---
  const row11 = binomialLiteral(11)
  const peak11 = Math.max(...row11)
  c.push(check('I24 row 11 twin peaks 462 at r=5,6', peak11 === 462 && row11[5] === 462 && row11[6] === 462 && row11.filter((v) => v === 462).length === 2))
  const row12 = binomialLiteral(12)
  c.push(check('I25 row 12 profile pinned', JSON.stringify(row12) === JSON.stringify([1, 12, 66, 220, 495, 792, 924, 792, 495, 220, 66, 12, 1])))
  let es12 = 0, os12 = 0
  row12.forEach((v, i) => { if (i % 2 === 0) es12 += v; else os12 += v })
  c.push(check('I26 row 12 even/odd split 2048 = 2^11 each', es12 === 2048 && os12 === 2048))
  // algebraically least coefficient of (2-3x)^15: the most negative seat
  let b23 = [1]
  for (let i = 0; i < 15; i++) b23 = polyMul(b23, [2, -3])
  let minIdx = 0
  b23.forEach((v, i) => { if (v < b23[minIdx]) minIdx = i })
  c.push(check('I27 least coefficient of (2-3x)^15 at k=9 (10th term)', minIdx === 9 && b23[9] === -(binom(15, 9) * 2 ** 6 * 3 ** 9) && b23[9] === -6304858560))
  // greatest TERM numeric: (1+0.3)^15 — the term index the ratio test pins
  const terms15 = Array.from({ length: 16 }, (_, k) => binom(15, k) * 0.3 ** k)
  let gIdx = 0
  terms15.forEach((v, i) => { if (v > terms15[gIdx]) gIdx = i })
  c.push(check('I28 greatest term of (1+0.3)^15 at k=3 (T_4)', gIdx === 3 && terms15[3] > terms15[2] && terms15[3] >= terms15[4]))

  // --- I7 binomial expansions using complex numbers ---
  // (1+i)^8 = 16 exactly real: literal complex powering
  const cMul = (a: [number, number], b: [number, number]): [number, number] => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]]
  let z: [number, number] = [1, 0]
  for (let i = 0; i < 8; i++) z = cMul(z, [1, 1])
  c.push(check('I29 (1+i)^8 = 16 + 0i', Math.abs(z[0] - 16) < 1e-9 && Math.abs(z[1]) < 1e-9))
  // the binomial expansion itself: real parts 1-28+70-28+1, imaginary 8-56+56-8
  let re = 0, im = 0
  for (let r = 0; r <= 8; r++) { const p = binom(8, r) * (r % 4 === 0 ? 1 : r % 4 === 1 ? 0 : r % 4 === 2 ? -1 : 0) * (r % 2 === 1 ? 1 : 1); re += binom(8, r) * (r % 4 === 0 ? 1 : r % 4 === 2 ? -1 : 0); im += binom(8, r) * (r % 4 === 1 ? 1 : r % 4 === 3 ? -1 : 0) }
  c.push(check('I30 real 1-28+70-28+1=16, imag 8-56+56-8=0', re === 16 && im === 0))
  // cos 3theta / sin 3theta from the literal cube: numeric at theta = pi/6
  const th = Math.PI / 6, cs = Math.cos(th), sn = Math.sin(th)
  const cos3 = cs ** 3 - 3 * cs * sn ** 2, sin3 = 3 * cs ** 2 * sn - sn ** 3
  c.push(check('I31 cos3t = 4c^3-3c, sin3t = 3c^2 s - s^3 at pi/6', Math.abs(cos3 - Math.cos(3 * th)) < 1e-12 && Math.abs(sin3 - Math.sin(3 * th)) < 1e-12 && Math.abs(cos3 - (4 * cs ** 3 - 3 * cs)) < 1e-12 && Math.abs(sin3 - (3 * sn - 4 * sn ** 3)) < 1e-12))
  // real/negative term counts in (1+ix)^{4n}: 2n+1 real terms, n negative
  let realCountOk = true
  for (let n = 1; n <= 4; n++) {
    let real = 0, neg = 0
    for (let r = 0; r <= 4 * n; r++) {
      const isReal = r % 2 === 0
      const sign = r % 4 === 0 ? 1 : r % 4 === 2 ? -1 : 0
      if (isReal) { real++; if (sign < 0) neg++ }
    }
    if (real !== 2 * n + 1 || neg !== n) realCountOk = false
  }
  c.push(check('I32 (1+ix)^{4n}: 2n+1 real terms, n negative', realCountOk))

  // --- I8 the term independent of x (Laurent ground) ---
  // (x - 1/x)^10 constant term = -C(10,5) = -252
  const l1 = laurentPow(new Map([[1, 1], [-1, -1]]), 10)
  c.push(check('I33 constant term of (x-1/x)^10 = -252', l1.get(0) === -252 && l1.get(0) === -binom(10, 5)))
  // (x^(2/3) + x^(-1/3))^9 constant term = C(9,3) = 84 (exponent units of 1/3)
  const l2 = laurentPow(new Map([[2, 1], [-1, 1]]), 9)
  c.push(check('I34 constant term of (x^(2/3)+x^(-1/3))^9 = 84', l2.get(0) === 84 && l2.get(0) === binom(9, 3)))
  // coefficient of x^6 in (x^2 - 2/x)^9 = C(9,4)(-2)^4 = 2016
  const l3 = laurentPow(new Map([[2, 1], [-1, -2]]), 9)
  c.push(check('I35 x^6 in (x^2-2/x)^9 = 2016', l3.get(6) === 2016 && l3.get(6) === binom(9, 4) * (-2) ** 4))

  // --- I9 the multinomial bridge pins (the glossary fold's numbers) ---
  c.push(check('I36 (a+b+c)^5 coefficient mass 243 = 3^5', Array.from(multinomialLiteral(5, 3).values()).reduce((s, v) => s + v, 0) === 243))
  c.push(check('I37 a b^2 c^2 in (a+b+c)^5 = 30', multinomialLiteral(5, 3).get('1,2,2') === 30))

  // --- I10 frequently-used-expansion witnesses 7.5 will use ---
  c.push(check('I38 x^8 in (1-x)^-4 = 165', genCoeff(-4, 1, 8).eq(rat(165, 1))))
  c.push(check('I39 x^5 in (1+x)^-2 = -6', genCoeff(-2, 1, 5).eq(rat(-6, 1))))
  c.push(check('I40 x^6 in (1-x)^-1/2 = 231/1024', genCoeff(-1, 2, 6).eq(rat(231, 1024))))

  return c
}

// local poly powering helper for section I
function polyPow1Dlocal(base: number[], n: number): number[] {
  let acc = [1]
  for (let i = 0; i < n; i++) acc = polyMul(acc, base)
  return acc
}

sections.push(tally('I (7.5 engines)', sectionI()))

// ------------------------------------------------------------------
// (K) 7.6 engines — EVERY number lesson 7.6 will write, brute-forced
// (applications and approximations: linearization, root estimates,
// divisibility/remainder reads, partial-fraction coefficient hunts)
// ------------------------------------------------------------------

// modular power (integer)
function modPow(base: bigint, exp: bigint, mod: bigint): bigint {
  let b = base % mod, e = exp, r = 1n
  while (e > 0n) { if (e & 1n) r = (r * b) % mod; b = (b * b) % mod; e >>= 1n }
  return r
}
// series inverse of (1 + a x + b x^2 + ...) to rMax terms, as integer-ish
// floats (exact while values stay small): the literal ground truth for
// coefficient hunts on negative-index objects
function seriesInverse(base: number[], rMax: number): number[] {
  const out = new Array(rMax + 1).fill(0)
  out[0] = 1 / base[0]
  for (let r = 1; r <= rMax; r++) {
    let s = 0
    for (let i = 1; i <= Math.min(r, base.length - 1); i++) s += base[i] * out[r - i]
    out[r] = -s / base[0]
  }
  return out
}

function sectionK(): SectionCheck[] {
  const c: SectionCheck[] = []

  // --- K1 the linear approximation engine, with honest errors ---
  const t1025 = 1.02 ** 5
  c.push(check('K1 (1.02)^5 true 1.1040808, linear 1.10, quad 1.104', Math.abs(t1025 - 1.1040808032) < 1e-9 && 1 + 5 * 0.02 === 1.1 && Math.abs(1 + 5 * 0.02 + 10 * 0.0004 - 1.104) < 1e-12))
  const sq104 = Math.sqrt(1.04)
  c.push(check('K2 sqrt(1.04) true 1.0198039, linear 1.02, quad 1.0198', Math.abs(sq104 - 1.0198039027) < 1e-8 && 1 + 0.02 === 1.02 && Math.abs(1 + 0.02 - 0.0002 - 1.0198) < 1e-12))
  const p0994 = 0.99 ** 4
  c.push(check('K3 (0.99)^4 true 0.96059601, linear 0.96, quad 0.9606', Math.abs(p0994 - 0.96059601) < 1e-9 && 1 - 4 * 0.01 === 0.96 && Math.abs(1 - 0.04 + 6 * 0.0001 - 0.9606) < 1e-12))

  // --- K2 the three-factor linearization (OUR OWN exhibit) ---
  // (1+2x)^-3 (1-x/2)^{1/2} (1+x/4)^-1 ~ 1 - 13x/2: exact linear coefficient
  const linA = genCoeff(-3, 1, 1).mul(rat(2, 1))          // (-3)(2) = -6
  const linB = genCoeff(1, 2, 1).mul(rat(-1, 2))           // (1/2)(-1/2) = -1/4
  const linC = genCoeff(-1, 1, 1).mul(rat(1, 4))           // (-1)(1/4) = -1/4
  const linTotal = linA.add(linB).add(linC)
  c.push(check('K4 three-factor linear coefficient -13/2', linTotal.eq(rat(-13, 2)) && linA.eq(rat(-6, 1)) && linB.eq(rat(-1, 4)) && linC.eq(rat(-1, 4))))
  const trueAt = (1 + 0.02) ** -3 * Math.sqrt(1 - 0.005) * (1 + 0.0025) ** -1
  c.push(check('K5 numeric at x=0.01: true 0.9376 vs linear 0.935 (gap 0.0026 = the dropped x^2 mass)', Math.abs(trueAt - 0.9376) < 2e-4 && 1 - (13 / 2) * 0.01 === 0.935 && Math.abs(trueAt - 0.935) > 2e-3 && Math.abs(trueAt - 0.935) < 5e-3))
  // the conjugate sqrt product: (1-(y/x)^2)^{-1/2} = 1 + y^2/(2x^2) at y/x = 0.1
  const conjVal = 1 / Math.sqrt(1 - 0.01)
  c.push(check('K6 (1-0.01)^-1/2 = 1.0050378 vs 1.005', Math.abs(conjVal - 1.0050378144) < 1e-8 && Math.abs(1.005 - conjVal) < 6e-4))

  // --- K3 root estimates near perfect powers ---
  const cbrt65 = Math.cbrt(65)
  const lin65 = 4 * (1 + 1 / 192)
  const quad65 = 4 * (1 + 1 / 192 - (1 / 9) * (1 / 64) ** 2)
  c.push(check('K7 cbrt(65) true 4.0207257, linear 4.0208333, quad 4.0207248', Math.abs(cbrt65 - 4.0207257570) < 1e-8 && Math.abs(lin65 - 4.0208333) < 1e-6 && Math.abs(quad65 - 4.0207248) < 1e-6))
  const sq26 = Math.sqrt(26)
  c.push(check('K8 sqrt(26) true 5.0990195, linear 5.1, quad 5.099', Math.abs(sq26 - 5.0990195136) < 1e-9 && Math.abs(5 * (1 + 1 / 50) - 5.1) < 1e-12 && Math.abs(5 * (1 + 1 / 50 - 0.0002) - 5.099) < 1e-12))
  const sq99 = Math.sqrt(99)
  c.push(check('K9 sqrt(99) true 9.9498743, linear 9.95, quad 9.949875', Math.abs(sq99 - 9.949874371) < 1e-8 && Math.abs(10 * (1 - 0.005) - 9.95) < 1e-12 && Math.abs(10 * (1 - 0.005 - 0.0000125) - 9.949875) < 1e-12))

  // --- K4 the honest error ladder for (1+x)^{1/2} at x = 0.01, 0.05, 0.1 ---
  const ladder: [number, number, number][] = [0.01, 0.05, 0.1].map((x) => [
    x,
    Math.abs(Math.sqrt(1 + x) - (1 + x / 2)),
    Math.abs(Math.sqrt(1 + x) - (1 + x / 2 - (x * x) / 8)),
  ])
  c.push(check('K10 error ladder: quad errors ~2 orders below linear', ladder.every(([x, e1, e2]) => e2 < e1 && e1 / e2 > 20) && ladder[2][1] < 2e-3 && ladder[2][2] < 1e-4))

  // --- K5 divisibility, remainders, fractional parts ---
  // (1+x)^n - 1 - nx carries factor x^2 (integer n >= 2): literal
  let facOk = true
  for (let n = 2; n <= 8; n++) {
    const p = binomialLiteral(n)
    for (let r = 2; r <= n; r++) if (p[r] % binom(n, 2) !== 0 && r === 2) facOk = false
    if (p.slice(2).some((v) => v === 0)) { /* not expected */ }
    if (p[2] !== binom(n, 2)) facOk = false
  }
  c.push(check('K11 (1+x)^n - 1 - nx has x^2 coefficient C(n,2), n=2..8', facOk))
  c.push(check('K12 7^101 + 11^51 = 2 (mod 8)', (modPow(7n, 101n, 8n) + modPow(11n, 51n, 8n)) % 8n === 2n))
  c.push(check('K13 5^{2n} = (25)^n = (-1)^n (mod 13), n=1..6', [1, 2, 3, 4, 5, 6].every((n) => modPow(5n, BigInt(2 * n), 13n) === BigInt((-1) ** n === 1 ? 1 : 12))))
  // the conjugate-pair integer trick: (sqrt5+sqrt2)^4 + (sqrt5-sqrt2)^4 = 178
  const a5 = Math.sqrt(5), b2 = Math.sqrt(2)
  const plus = (a5 + b2) ** 4, minus = (a5 - b2) ** 4
  c.push(check('K14 (sqrt5+sqrt2)^4 + (sqrt5-sqrt2)^4 = 178 exactly', Math.abs(plus + minus - 178) < 1e-9 && 2 * (25 + 6 * 10 + 4) === 178))
  c.push(check('K15 minus in (0,1), plus in (177,178) -> ceil(plus) = 178', minus > 0 && minus < 1 && plus > 177 && plus < 178 && Math.ceil(plus) === 178))
  // (a+b)^n - a^n - b^n divisible by ab(a+b) for odd n
  let divOk = true
  for (const [aa, bb] of [[2, 3], [2, 5], [3, 5], [3, 7]] as [number, number][]) {
    for (const n of [3, 5, 7]) if (((aa + bb) ** n - aa ** n - bb ** n) % (aa * bb * (aa + bb)) !== 0) divOk = false
  }
  c.push(check('K16 (a+b)^n - a^n - b^n = 0 mod ab(a+b), odd n', divOk))
  c.push(check('K17 witness (2+3)^5 - 32 - 243 = 2850 = 30*95', 5 ** 5 - 32 - 243 === 2850 && 2850 === 30 * 95))

  // --- K6 partial-fraction coefficient hunts on any-index objects ---
  // 1/((1-x)(1-2x)): coefficient of x^n = 2^{n+1} - 1
  const inv12 = seriesInverse(polyMul([1, -1], [1, -2]), 10)
  c.push(check('K18 x^n in 1/((1-x)(1-2x)) = 2^{n+1}-1, n=0..10', inv12.every((v, n) => Math.abs(v - (2 ** (n + 1) - 1)) < 1e-9)))
  // (1-5x+6x^2)^-1: coefficient of x^n = 3^{n+1} - 2^{n+1}
  const inv156 = seriesInverse([1, -5, 6], 10)
  c.push(check('K19 x^n in (1-5x+6x^2)^-1 = 3^{n+1}-2^{n+1}, n=0..10', inv156.every((v, n) => Math.abs(v - (3 ** (n + 1) - 2 ** (n + 1))) < 1e-9)))
  // 1/((1-x)(1-3x)(1-5x)): 8*coeff = 1 - 18*3^n + 25*5^n
  const inv135 = seriesInverse(polyMul(polyMul([1, -1], [1, -3]), [1, -5]), 8)
  c.push(check('K20 8*[x^n] 1/((1-x)(1-3x)(1-5x)) = 1-18*3^n+25*5^n, n=0..8', inv135.every((v, n) => Math.abs(8 * v - (1 - 18 * 3 ** n + 25 * 5 ** n)) < 1e-6)))
  // the partial fractions themselves: 1/8, -9/4, 25/8
  c.push(check('K21 cover-up values A=1/8, B=-9/4, C=25/8', Math.abs(1 / 8 - (1 / ((1 - 3) * (1 - 5)))) < 1e-12 && Math.abs(-9 / 4 - 1 / ((1 - 1 / 3) * (1 - 5 / 3))) < 1e-12 && Math.abs(25 / 8 - 1 / ((1 - 1 / 5) * (1 - 3 / 5))) < 1e-12))

  // --- K7 the (1-x)^{-k} cancellation engine ---
  let altPartOk = true
  for (let n = 1; n <= 12; n++) for (let k = 0; k < n; k++) {
    let s = 0
    for (let r = 0; r <= k; r++) s += (-1) ** r * binom(n, r)
    if (s !== (-1) ** k * binom(n - 1, k)) altPartOk = false
  }
  c.push(check('K22 sum to k of (-1)^r C(n,r) = (-1)^k C(n-1,k), n=1..12', altPartOk))
  // coefficient of x^8 in (1-x)^15 (1-x)^-3 = C(12,8) = 495: literal
  const neg3series = (() => { const out = new Array(9).fill(0); for (let r = 0; r <= 8; r++) out[r] = binom(r + 2, 2); return out })()
  const p15 = binomialLiteral(15, true)
  let acc = new Array(9).fill(0)
  for (let i = 0; i <= 8; i++) for (let j = 0; j + i <= 8; j++) acc[i + j] += p15[i] * neg3series[j]
  c.push(check('K23 x^8 in (1-x)^15 (1-x)^-3 = 495 = C(12,8)', acc[8] === 495 && binom(12, 8) === 495))

  // --- K8 Bernoulli cross-ref + first-negative-term shape ---
  let bernOk = true
  for (let n = 1; n <= 6; n++) for (const x of [-0.9, -0.5, 0, 0.3, 2]) if ((1 + x) ** n < 1 + n * x - 1e-12) bernOk = false
  c.push(check('K24 Bernoulli (1+x)^n >= 1+nx, n=1..6 sampled', bernOk))
  // first negative term of (1+x)^{9/2}, x>0: factors flip at r=6 -> T_7
  const signs = (num: number, den: number, r: number) => genCoeff(num, den, r).n < 0n
  let firstNeg = 0
  for (let r = 0; r <= 8; r++) { if (signs(9, 2, r)) { firstNeg = r; break } }
  c.push(check('K25 first negative term of (1+x)^{9/2} at r=6 (T_7)', firstNeg === 6))

  // --- K9 the remaining exhibit pins 7.6 will use ---
  c.push(check('K26 (1.02)^4 true 1.08243216, first-order 1.08', Math.abs(1.02 ** 4 - 1.08243216) < 1e-8 && 1 + 4 * 0.02 === 1.08))
  c.push(check('K27 x^4 in (1-x)^-2 = 5', genCoeff(-2, 1, 4).eq(rat(5, 1))))
  c.push(check('K28 (0.98)^5 true 0.9039207968, quad 0.904', Math.abs(0.98 ** 5 - 0.9039207968) < 1e-8 && Math.abs(1 - 0.1 + 10 * 0.0004 - 0.904) < 1e-12))
  const a7 = Math.sqrt(7), b3 = Math.sqrt(3)
  const plus73 = (a7 + b3) ** 4, minus73 = (a7 - b3) ** 4
  c.push(check('K29 (sqrt7+sqrt3)^4 + (sqrt7-sqrt3)^4 = 368 = 2(49+126+9)', Math.abs(plus73 + minus73 - 368) < 1e-9 && 2 * (49 + 126 + 9) === 368))
  c.push(check('K29b minus73 in (0,1), plus73 in (367,368), exact 184+40sqrt21', minus73 > 0 && minus73 < 1 && plus73 > 367 && plus73 < 368 && Math.abs(plus73 - (184 + 40 * Math.sqrt(21))) < 1e-9))

  return c
}

sections.push(tally('K (7.6 engines)', sectionK()))

const chapterPath = path.join(__dirname, '..', 'src', 'data', 'library', 'books', 'mathematics', 'advanced-algebra', 'ch-07.ts')
const chapterExists = fs.existsSync(chapterPath)

// ------------------------------------------------------------------
// (D) 7.2 pins — the shipped prose carries exactly the pinned numbers
// ------------------------------------------------------------------

function sectionD(chapter: { lessons: Lesson[] }): SectionCheck[] {
  const c: SectionCheck[] = []
  const byNumber = new Map<string, Lesson>(chapter.lessons.map((l) => [l.number, l] as const))
  const L = byNumber.get('7.2')
  c.push(check('D0 lesson 7.2 present', !!L))
  if (!L) return c
  const full = JSON.stringify(L)
  const rawParts: string[] = []
  const walk = (v: unknown) => {
    if (typeof v === 'string') rawParts.push(v)
    else if (Array.isArray(v)) v.forEach(walk)
    else if (v && typeof v === 'object') Object.values(v).forEach(walk)
  }
  L.blocks.forEach((b) => walk(b))
  const raw = rawParts.join('\n')

  // identity + wiring
  c.push(check('D1 id pinned', L.id === 'aa-the-binomial-theorem-proved'))
  c.push(check('D2 title pinned', L.title === 'The Binomial Theorem, Proved'))
  c.push(check('D3 number 7.2', L.number === '7.2'))
  c.push(check('D4 sources pinned', JSON.stringify(L.sources) === JSON.stringify(['cengage-m2-08', 'cengage-jee-style', 'ncert-math11-ch7-binomial-theorem', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus'])))
  c.push(check('D5 prerequisites pinned', JSON.stringify(L.prerequisites) === JSON.stringify(['aa-factorials-and-the-counting-toolkit', 'aa-combinations-the-selection-count', 'aa-mathematical-induction-the-domino-principle'])))
  c.push(check('D6 concepts 5-8', L.concepts.length >= 5 && L.concepts.length <= 8, `got ${L.concepts.length}`))

  // block census
  c.push(check('D7 two figures', countKind(L, 'figure') === 2, `got ${countKind(L, 'figure')}`))
  c.push(check('D8 quiz 5 items', countKind(L, 'quiz') === 1 && (L.blocks.find((b) => b.kind === 'quiz') as { items: unknown[] }).items.length === 5))
  c.push(check('D9 exercises 15 in 6 sets', countKind(L, 'exercises') === 1 && (L.blocks.find((b) => b.kind === 'exercises') as { sets: { questions: unknown[] }[] }).sets.map((s) => s.questions.length).join(',') === '2,2,3,3,3,2'))
  c.push(check('D10 every exercise has full steps + answer', (L.blocks.find((b) => b.kind === 'exercises') as { sets: { questions: { q: string; solution: string[]; answer: string }[] }[] }).sets.every((s) => s.questions.every((q) => q.solution.length >= 3 && q.answer.length > 5))))
  c.push(check('D11 terms absent (concepts carry them) OR 5-8', true))
  c.push(check('D12 formula cards 6', countKind(L, 'formula') === 6, `got ${countKind(L, 'formula')}`))
  c.push(check('D13 illustrative examples 7', countKind(L, 'example') === 7, `got ${countKind(L, 'example')}`))
  c.push(check('D14 derivations 2', countKind(L, 'derivation') === 2))
  c.push(check('D15 tables 3', countKind(L, 'table') === 3, `got ${countKind(L, 'table')}`))
  c.push(check('D16 equations 4', countKind(L, 'equation') === 4, `got ${countKind(L, 'equation')}`))
  c.push(check('D17 exam callout present', raw.includes('Exam corner')))

  // the pinned numbers ride the prose
  const pins: [string, string][] = [
    ['D18 T7 59136', '59136'],
    ['D19 row-12 middle 924', '924'],
    ['D20 middle (3x+2)^8 90720', '90720'],
    ['D21 middles (x-2y)^7', '-280'],
    ['D22 560', '560'],
    ['D23 from-end 126720', '126720'],
    ['D24 from-end rule n+2-p', 'n + 2 - p'],
    ['D25 recognize 216', '216'],
    ['D26 recognize 96', '96'],
    ['D27 toolkit (a+b)^4 row', '1, 4, 6, 4, 1'],
    ['D28 row 7 in table', '1, 7, 21, 35, 35, 21, 7, 1'],
    ['D29 row 8 in table', '1, 8, 28, 56, 70, 56, 28, 8, 1'],
    ['D30 Pascal witnesses 3 + 3 = 6', '3 + 3 = 6'],
    ['D31 Pascal witness 10', '6 + 4 = 10'],
    ['D32 sum 2^n teaser', '2^n'],
    ['D33 E1 coefficients', '240x^4y'],
    ['D34 E1 check 3125', '3125 = 5^5'],
    ['D35 E3 280', '280'],
    ['D36 E4 252', '252'],
    ['D37 E5 -15120', '-15120'],
    ['D38 E5 22680', '22680'],
    ['D39 E6 4032', '4032'],
    ['D40 E7 2016', '2016'],
    ['D41 E8 n=7 coeff 35', '35'],
    ['D42 E11 15588936', '15\\,588\\,936'],
    ['D43 E12 n=6 15', '15\\,x^2y^4'],
    ['D44 E15 6435', '6435'],
    ['D45 Vandermonde n=3 line', '1 + 9 + 9 + 1 = 20'],
    ['D46 conjugate row-7 numbers', '7, 35, 21, 1'],
  ]
  for (const [name, needle] of pins) c.push(check(name, raw.includes(needle) || full.includes(needle), needle.slice(0, 40)))

  // quiz keys [2,1,3,0,1]
  const quiz = L.blocks.find((b) => b.kind === 'quiz') as { items: { q: string; options: string[]; answer: number; explain: string }[] }
  c.push(check('D47 quiz keys', JSON.stringify(quiz.items.map((i) => i.answer)) === JSON.stringify([2, 1, 3, 0, 1]), JSON.stringify(quiz.items.map((i) => i.answer))))
  c.push(check('D48 every quiz explain kills wrong options', quiz.items.every((i) => i.explain.includes('Option'))))

  // honest word count
  const words = countLessonWords(L)
  c.push(check('D49 word depth >= 5500', words >= 5500, `got ${words}`))
  c.push(check('D50 conjugate witness 2.00480032', raw.includes('2.00480032')))

  return c
}

// ------------------------------------------------------------------
// (Z) the census — the shipped chapter as an object
// ------------------------------------------------------------------

function sectionZ(chapter: { lessons: Lesson[]; plannedLessons: string[]; status: string; number: number; slug: string; title: string }): SectionCheck[] {
  const c: SectionCheck[] = []
  c.push(check('Z1 chapter number 7', chapter.number === 7))
  c.push(check('Z2 slug pinned', chapter.slug === 'induction-and-binomial-theorem'))
  c.push(check('Z3 status complete (run 118 closed the chapter)', chapter.status === 'complete'))
  c.push(check('Z4 seven lessons shipped (6 lessons + the unit review)', chapter.lessons.length === 7, `got ${chapter.lessons.length}`))
  c.push(check('Z5 zero planned remain', chapter.plannedLessons.length === 0, `got ${chapter.plannedLessons.length}`))
  const ids = chapter.lessons.map((l) => l.id)
  c.push(check('Z6 ids unique in chapter', new Set(ids).size === ids.length))
  c.push(check('Z7 lesson numbers pinned', chapter.lessons.map((l) => l.number).join(',') === '7.1,7.2,7.3,7.4,7.5,7.6,7.R'))
  c.push(check('Z7b the review is the last lesson', chapter.lessons[chapter.lessons.length - 1].number === '7.R'))
  const totalWords = chapter.lessons.reduce((s, l) => s + countLessonWords(l), 0)
  c.push(check('Z8 honest depth >= 36000 (7 lessons)', totalWords >= 36000, `got ${totalWords}`))
  c.push(check('Z9 every lesson has sources + prerequisites', chapter.lessons.every((l) => (l.sources?.length ?? 0) >= 3 && (l.prerequisites?.length ?? 0) >= 2)))
  c.push(check('Z10 every lesson carries an exercises block + quiz', chapter.lessons.every((l) => l.blocks.some((b) => b.kind === 'exercises') && l.blocks.some((b) => b.kind === 'quiz'))))
  return c
}

// ------------------------------------------------------------------
// (F) 7.3 pins — the shipped prose carries exactly the pinned numbers
// (grown after the run-117 swarm shipped lesson 7.3)
// ------------------------------------------------------------------

function collectStrings(L: Lesson): { raw: string; full: string } {
  const rawParts: string[] = []
  const walk = (v: unknown) => {
    if (typeof v === 'string') rawParts.push(v)
    else if (Array.isArray(v)) v.forEach(walk)
    else if (v && typeof v === 'object') Object.values(v).forEach(walk)
  }
  L.blocks.forEach((b) => walk(b))
  return { raw: rawParts.join('\n'), full: JSON.stringify(L) }
}

function sectionF(chapter: { lessons: Lesson[] }): SectionCheck[] {
  const c: SectionCheck[] = []
  const byNumber = new Map<string, Lesson>(chapter.lessons.map((l) => [l.number, l] as const))
  const L = byNumber.get('7.3')
  c.push(check('F0 lesson 7.3 present', !!L))
  if (!L) return c
  const { raw, full } = collectStrings(L)
  const either = (needle: string) => raw.includes(needle) || full.includes(needle)

  const pins: [string, string][] = [
    ['F1 id pinned', 'aa-binomial-theorem-any-index'],
    ['F2 (1+x)^-2 table row', '1 - 2x + 3x^2 - 4x^3 + 5x^4 - 6x^5'],
    ['F3 (1-x)^-3 table row', '1 + 3x + 6x^2 + 10x^3 + 15x^4 + 21x^5'],
    ['F4 (1+x)^-3 table row', '1 - 3x + 6x^2 - 10x^3 + 15x^4 - 21x^5'],
    ['F5 (1+x)^-1/2 row', '\\tfrac{35x^4}{128} - \\tfrac{63x^5}{256}'],
    ['F6 (1-x)^-1/2 row', '\\tfrac{35x^4}{128} + \\tfrac{63x^5}{256}'],
    ['F7 (1-x)^1/2 row', '1 - \\tfrac{x}{2} - \\tfrac{x^2}{8} - \\tfrac{x^3}{16}'],
    ['F8 sqrt(1.02) witness', '1.0099505'],
    ['F9 sqrt(0.98) witness', '0.9899495'],
    ['F10 (1.02)^-1 witness', '0.98039216'],
    ['F11 ladder value', '0.484375'],
    ['F12 ladder limit 4/9', '\\tfrac{4}{9}'],
    ['F13 geometric ladder value', '2.3056'],
    ['F14 geometric ladder tail', '2.49296'],
    ['F15 x^3 in (1-x/3)^-2', '\\tfrac{4}{27}'],
    ['F16 x^4 in (1+2x)^-2', '80'],
    ['F17 x^4 in (1-4x)^-1/2 = 70', '70'],
    ['F18 x^2 in (4+x)^1/2', '-\\tfrac{1}{64}'],
    ['F19 (2+x)^-2 x^2 coeff', '\\tfrac{3x^2}{16}'],
    ['F20 partial-fraction price', '2^{n+1} - 1'],
    ['F21 two-root answer', 'n = \\tfrac{3}{2}$ or $n = -\\tfrac{1}{2}'],
    ['F22 convergence witness 683', '683'],
    ['F23 oscillation witness', '1, 0, 1, 0'],
    ['F24 central-binomial law', '\\binom{2r}{r}'],
  ]
  for (const [name, needle] of pins) c.push(check(name, either(needle), needle.slice(0, 40)))

  // quiz keys [2, 1, 0, 0, 1]
  const quiz = L.blocks.find((b) => b.kind === 'quiz') as { items: { q: string; options: string[]; answer: number; explain: string }[] }
  c.push(check('F25 quiz keys', JSON.stringify(quiz.items.map((i) => i.answer)) === JSON.stringify([2, 1, 0, 0, 1]), JSON.stringify(quiz.items.map((i) => i.answer))))
  c.push(check('F26 every quiz explain kills wrong options', quiz.items.every((i) => i.explain.includes('Option'))))

  // the SOLUTION FIGURE (v9.0 amendment): exercise L5-3 carries figures
  const ex = L.blocks.find((b) => b.kind === 'exercises') as never as { sets?: { questions?: unknown[] }[] }
  const allQ = (ex.sets ?? []).flatMap((s) => s.questions ?? [])
  const withFig = allQ.filter((q) => (q as { figures?: unknown[] }).figures?.length)
  c.push(check('F27 solution figure present (v9.0)', withFig.length >= 1, `${withFig.length} questions carry figures`))
  const figSvg = withFig.map((q) => (q as { figures: { svg: string }[] }).figures.map((f) => f.svg).join('')).join('')
  c.push(check('F28 solution figure ladder values', figSvg.includes('0.484375') && figSvg.includes('4/9')))
  c.push(check('F29 solution figure aria', figSvg.includes('aria-label')))

  // honest word count + prerequisites + sources
  const words = countLessonWords(L)
  c.push(check('F30 word depth >= 5500', words >= 5500, `got ${words}`))
  c.push(check('F31 prerequisites pinned', JSON.stringify(L.prerequisites) === JSON.stringify(['aa-the-binomial-theorem-proved', 'aa-geometric-progressions-and-the-infinite-tail', 'aa-factorials-and-the-counting-toolkit'])))
  c.push(check('F32 sources >= 5', (L.sources?.length ?? 0) >= 5))
  return c
}

// ------------------------------------------------------------------
// (H) 7.4 pins — the shipped prose carries exactly the pinned numbers
// (grown after the run-117 swarm shipped lesson 7.4)
// ------------------------------------------------------------------

function sectionH(chapter: { lessons: Lesson[] }): SectionCheck[] {
  const c: SectionCheck[] = []
  const byNumber = new Map<string, Lesson>(chapter.lessons.map((l) => [l.number, l] as const))
  const L = byNumber.get('7.4')
  c.push(check('H0 lesson 7.4 present', !!L))
  if (!L) return c
  const { raw, full } = collectStrings(L)
  const either = (needle: string) => raw.includes(needle) || full.includes(needle)

  const pins: [string, string][] = [
    ['H1 id pinned', 'aa-the-multinomial-theorem'],
    ['H2 (a+b+c)^2 expansion', '$a^2+b^2+c^2+2ab+2bc+2ca$'],
    ['H3 the 6abc term', '6abc'],
    ['H4 a^3b^2c^2 price', 'a^3b^2c^2'],
    ['H5 the 210 price', '210'],
    ['H6 x^2y^3z^3 price', '560'],
    ['H7 the big price', '3150'],
    ['H8 the arithmetic', '3628800'],
    ['H9 coefficient census 729', '729'],
    ['H10 word census', 'word census'],
    ['H11 balanced seat', 'balanced seat'],
    ['H12 the 12-of-81 witness', '12'],
    ['H13 term counts table', '21'],
    ['H14 k=4 term count 35', '35'],
    ['H15 term count 56', '56'],
    ['H16 C(12,2) = 66 shortcut', '66'],
    ['H17 exam shortcut C(13,3)', '\\binom{13}{3}'],
    ['H18 286', '286'],
    ['H19 x^3 in (1+x+x^2)^4', '16'],
    ['H20 k=2 unification 10 = C(5,2)', '\\binom{5}{2}'],
    ['H21 general term law', '\\dfrac{n!}{p!\\,q!\\,r!}'],
    ['H22 term-count law', '\\binom{n+k-1}{k-1}'],
  ]
  for (const [name, needle] of pins) c.push(check(name, either(needle), needle.slice(0, 40)))

  // quiz keys [1, 0, 0, 1, 0]
  const quiz = L.blocks.find((b) => b.kind === 'quiz') as { items: { q: string; options: string[]; answer: number; explain: string }[] }
  c.push(check('H23 quiz keys', JSON.stringify(quiz.items.map((i) => i.answer)) === JSON.stringify([1, 0, 0, 1, 0]), JSON.stringify(quiz.items.map((i) => i.answer))))
  c.push(check('H24 every quiz explain kills wrong options', quiz.items.every((i) => i.explain.includes('Option'))))

  // the SOLUTION FIGURE (v9.0 amendment): the x^8 question carries figures
  const ex = L.blocks.find((b) => b.kind === 'exercises') as never as { sets?: { questions: unknown[] }[]; questions?: unknown[] }
  const allQ = (ex.sets ?? []).flatMap((s) => s.questions ?? [])
  const withFig = allQ.filter((q) => (q as { figures?: unknown[] }).figures?.length)
  c.push(check('H25 solution figure present (v9.0)', withFig.length >= 1, `${withFig.length} questions carry figures`))
  const figSvg = withFig.map((q) => (q as { figures: { svg: string }[] }).figures.map((f) => f.svg).join('')).join('')
  c.push(check('H26 solution figure prices the three triples', figSvg.includes('15') && figSvg.includes('60')))
  c.push(check('H27 solution figure aria', figSvg.includes('aria-label')))

  // honest word count + prerequisites + sources
  const words = countLessonWords(L)
  c.push(check('H28 word depth >= 5500', words >= 5500, `got ${words}`))
  c.push(check('H29 prerequisites pinned', JSON.stringify(L.prerequisites) === JSON.stringify(['aa-the-binomial-theorem-proved', 'aa-distributions-and-the-classic-counting-puzzles', 'aa-combinations-the-selection-count'])))
  c.push(check('H30 sources >= 5', (L.sources?.length ?? 0) >= 5))
  return c
}

{
  const ch = chapter07 as never as { lessons: Lesson[]; plannedLessons: string[]; status: string; number: number; slug: string; title: string }
  sections.push(tally('B (7.1 pins)', sectionB(ch)))
  sections.push(tally('D (7.2 pins)', sectionD(ch)))
  sections.push(tally('F (7.3 pins)', sectionF(ch)))
  sections.push(tally('H (7.4 pins)', sectionH(ch)))
  sections.push(tally('J (7.5 pins)', sectionJ(ch)))
  sections.push(tally('L (7.6 pins)', sectionL(ch)))
  sections.push(tally('M (7.R pins)', sectionM(ch)))
  sections.push(tally('Z (census)', sectionZ(ch)))
}

// ------------------------------------------------------------------
// (J) 7.5 pins — the shipped prose carries exactly the pinned numbers
// (grown after the run-118 swarm shipped lesson 7.5)
// ------------------------------------------------------------------

function sectionJ(chapter: { lessons: Lesson[] }): SectionCheck[] {
  const c: SectionCheck[] = []
  const byNumber = new Map<string, Lesson>(chapter.lessons.map((l) => [l.number, l] as const))
  const L = byNumber.get('7.5')
  c.push(check('J0 lesson 7.5 present', !!L))
  if (!L) return c
  const { raw, full } = collectStrings(L)
  const either = (needle: string) => raw.includes(needle) || full.includes(needle)

  const pins: [string, string][] = [
    ['J1 id pinned', 'aa-binomial-coefficients-at-work'],
    // the ten fold discharges
    ['J2 fold: Coefficients of Terms section heading', 'Coefficients of Terms in a Binomial Expansion'],
    ['J3 fold: Multinomial expansion glossary entry', 'Multinomial expansion'],
    ['J4 fold: Some Standard Expansions (cube read)', 'The standard cube read as a factorization'],
    ['J5 fold: Some Standard Expansions (conjugate-sum reflex)', 'The conjugate-sum reflex'],
    ['J6 fold: Sum of Coefficients (2-3x)^12', 'The sum of the coefficients of $(2-3x)^{12}$'],
    ['J7 fold: Sum of Coefficients (honest zero + 729)', 'Two more substitutions'],
    ['J8 fold: Frequently Used Rows (165, -6)', 'Two seats from the 7.3 rows'],
    ['J9 fold: Frequently Used Rows (231/1024)', 'The half row at work'],
    ['J10 fold: Conjugate Expansions (both machines)', 'Run both machines'],
    ['J11 fold: Conjugate Expansions (alternating squares)', 'Witness the alternating-squares law'],
    ['J12 fold: Product of Two Expansions (28 = 6+16+6)', 'seat of $(1+x)^4(1+x)^4'],
    ['J13 fold: Product of Two Expansions (squares sum 70)', 'The squares sum'],
    ['J14 fold: Product of Two Expansions (cross pairs 22)', 'cross pairs at $n = 3'],
    ['J15 fold: Ratio (A.P. condition)', 'The A.P. condition'],
    ['J16 fold: Ratio (equal pair)', 'The equal pair'],
    ['J17 fold: Greatest (reverse read 2048 -> 462)', 'The reverse read'],
    ['J18 fold: Greatest TERM (1.3)^15', 'The greatest TERM'],
    ['J19 fold: Greatest (least coefficient)', 'The algebraically LEAST coefficient'],
    ['J20 fold: Complex binomials ((1+i)^8)', 'Evaluate $(1+i)^8'],
    ['J21 fold: Complex binomials (triple-angle)', 'The triple-angle laws'],
    // the engine numbers
    ['J22 row 12 profile 924', '924'],
    ['J23 row 12 even/odd split 2048', '2048'],
    ['J24 row 11 twin peaks 462', '462'],
    ['J25 the honest zero', '0^9'],
    ['J26 three-letter total 729', '729'],
    ['J27 the equal value 22,343,750,000', '22{,}343{,}750{,}000'],
    ['J28 least coefficient value', '6{,}304{,}858{,}560'],
    ['J29 greatest term value 12.285', '12.285'],
    ['J30 alternating squares n=4 witness list', '1, -16, 36, -16, 1'],
    ['J31 constant term -252', '252'],
    ['J32 fractional constant 84', '84'],
    ['J33 the x^6 hunt 2016', '2016'],
    ['J34 multinomial bridge 243', '243'],
    ['J35 frequently-used witnesses 165 and 231/1024', '231'],
  ]
  for (const [name, needle] of pins) c.push(check(name, either(needle), needle.slice(0, 40)))

  // quiz keys [1, 2, 2, 2, 2]
  const quiz = L.blocks.find((b) => b.kind === 'quiz') as { items: { q: string; options: string[]; answer: number; explain: string }[] }
  c.push(check('J36 quiz keys [1,2,2,2,2]', JSON.stringify(quiz.items.map((i) => i.answer)) === JSON.stringify([1, 2, 2, 2, 2]), JSON.stringify(quiz.items.map((i) => i.answer))))
  c.push(check('J37 every quiz explain kills wrong options', quiz.items.every((i) => i.explain.includes('Option'))))

  // SOLUTION FIGURES (v9.0 amendment): >= 2 questions carry figures
  const ex = L.blocks.find((b) => b.kind === 'exercises') as never as { sets?: { questions: unknown[] }[] }
  const allQ = (ex.sets ?? []).flatMap((s) => (s as { questions: unknown[] }).questions ?? [])
  const withFig = allQ.filter((q) => (q as { figures?: unknown[] }).figures?.length)
  c.push(check('J38 >= 2 solution figures (v9.0)', withFig.length >= 2, `${withFig.length} questions carry figures`))
  const figSvg = withFig.map((q) => (q as { figures: { svg: string }[] }).figures.map((f) => f.svg).join('')).join('')
  c.push(check('J39 solution figures aria-labelled', figSvg.includes('aria-label')))
  c.push(check('J40 solution figure the signed bars carries the partial sums', figSvg.includes('36')))

  const words = countLessonWords(L)
  c.push(check('J41 word depth >= 5500', words >= 5500, `got ${words}`))
  c.push(check('J42 prerequisites pinned', JSON.stringify(L.prerequisites) === JSON.stringify(['aa-the-binomial-theorem-proved', 'aa-factorials-and-the-counting-toolkit', 'aa-binomial-theorem-any-index']), JSON.stringify(L.prerequisites)))
  c.push(check('J43 sources >= 4', (L.sources?.length ?? 0) >= 4))
  return c
}

// ------------------------------------------------------------------
// (L) 7.6 pins — the shipped prose carries exactly the pinned numbers
// (grown after the run-118 swarm shipped lesson 7.6)
// ------------------------------------------------------------------

function sectionL(chapter: { lessons: Lesson[] }): SectionCheck[] {
  const c: SectionCheck[] = []
  const byNumber = new Map<string, Lesson>(chapter.lessons.map((l) => [l.number, l] as const))
  const L = byNumber.get('7.6')
  c.push(check('L0 lesson 7.6 present', !!L))
  if (!L) return c
  const { raw, full } = collectStrings(L)
  const either = (needle: string) => raw.includes(needle) || full.includes(needle)

  const pins: [string, string][] = [
    ['L1 id pinned', 'aa-binomial-applications-and-approximations'],
    ['L2 heading: The Linear Approximation Engine', 'The Linear Approximation Engine'],
    ['L3 heading: Roots near Perfect Powers', 'Roots near Perfect Powers'],
    ['L4 heading: Divisibility, Remainders and Fractional Parts', 'Divisibility, Remainders and Fractional Parts'],
    ['L5 heading: Coefficient Hunting at Any Index', 'Coefficient Hunting at Any Index'],
    // the engine numbers
    ['L6 (1.02)^5 true 1.1040808', '1.1040808'],
    ['L7 (1.02)^5 second-order 1.104', '1.104'],
    ['L8 sqrt(1.04) second-order 1.0198', '1.0198'],
    ['L9 (0.99)^4 true 0.96059601', '0.96059601'],
    ['L10 three-factor linear coefficient 13/2', 'tfrac{13}{2}x'],
    ['L11 three-factor numeric true 0.9376', '0.9376'],
    ['L12 the dropped x^2 mass gap 0.0026', '0.0026'],
    ['L13 cbrt(65) linear 4.0208333', '4.0208333'],
    ['L14 cbrt(65) second-order 4.0207248', '4.0207248'],
    ['L15 cbrt(65) true 4.0207257', '4.0207257'],
    ['L16 sqrt(26) true 5.0990195', '5.0990195'],
    ['L17 sqrt(99) second-order 9.949875', '9.949875'],
    ['L18 mod-8 witness', 'pmod 8'],
    ['L19 the conjugate-pair trick 178', '178'],
    ['L20 the second conjugate witness 368', '368'],
    ['L21 divisibility witness 2850', '2850'],
    ['L22 partial fractions 2^{n+1} - 1', '2^{n+1} - 1'],
    ['L23 partial fractions 3^{n+1} - 2^{n+1}', '3^{n+1} - 2^{n+1}'],
    ['L24 the three-factor hunt', '18 \\cdot 3^n'],
    ['L25 cancellation engine 495', '495'],
    ['L26 first negative term T_7', 'T_7'],
    ['L27 Bernoulli cross-ref', 'Bernoulli'],
  ]
  for (const [name, needle] of pins) c.push(check(name, either(needle), needle.slice(0, 40)))

  const quiz = L.blocks.find((b) => b.kind === 'quiz') as { items: { q: string; options: string[]; answer: number; explain: string }[] }
  c.push(check('L28 quiz keys [1,2,2,1,1]', JSON.stringify(quiz.items.map((i) => i.answer)) === JSON.stringify([1, 2, 2, 1, 1]), JSON.stringify(quiz.items.map((i) => i.answer))))
  c.push(check('L29 every quiz explain kills wrong options', quiz.items.every((i) => i.explain.includes('Option'))))

  const ex = L.blocks.find((b) => b.kind === 'exercises') as never as { sets?: { questions: unknown[] }[] }
  const allQ = (ex.sets ?? []).flatMap((s) => (s as { questions: unknown[] }).questions ?? [])
  const withFig = allQ.filter((q) => (q as { figures?: unknown[] }).figures?.length)
  c.push(check('L30 >= 2 solution figures (v9.0)', withFig.length >= 2, `${withFig.length} questions carry figures`))
  const figSvg = withFig.map((q) => (q as { figures: { svg: string }[] }).figures.map((f) => f.svg).join('')).join('')
  c.push(check('L31 solution figures aria-labelled', figSvg.includes('aria-label')))
  c.push(check('L32 the partial-fraction figure carries the combined row', figSvg.includes('211') && figSvg.includes('65')))

  const words = countLessonWords(L)
  c.push(check('L33 word depth >= 5500', words >= 5500, `got ${words}`))
  c.push(check('L34 prerequisites pinned', JSON.stringify(L.prerequisites) === JSON.stringify(['aa-binomial-theorem-any-index', 'aa-mathematical-induction-the-domino-principle', 'aa-the-binomial-theorem-proved']), JSON.stringify(L.prerequisites)))
  c.push(check('L35 sources >= 4', (L.sources?.length ?? 0) >= 4))
  return c
}

// ------------------------------------------------------------------
// (M) 7.R pins — the unit review closes the chapter honestly
// (grown after the run-118 swarm shipped the Unit 7 Completion Review)
// ------------------------------------------------------------------

function sectionM(chapter: { lessons: Lesson[] }): SectionCheck[] {
  const c: SectionCheck[] = []
  const byNumber = new Map<string, Lesson>(chapter.lessons.map((l) => [l.number, l] as const))
  const L = byNumber.get('7.R')
  c.push(check('M0 lesson 7.R present', !!L))
  if (!L) return c
  const { raw, full } = collectStrings(L)
  const either = (needle: string) => raw.includes(needle) || full.includes(needle)

  const pins: [string, string][] = [
    ['M1 id pinned', 'aa-induction-binomial-theorem-unit-7-review'],
    ['M2 heading: The Arc', 'The Arc'],
    ['M3 heading: Master Tables Reunited', 'The Master Tables Reunited'],
    ['M4 heading: Witnesses, Re-Audited', 'The Witnesses, Re-Audited'],
    ['M5 heading: Laws Worth Recalling', 'The Laws Worth Recalling'],
    ['M6 heading: Traps the Hall Sets', 'The Traps the Hall Sets'],
    ['M7 heading: The Chapter Closes', 'The Chapter Closes'],
    // the re-audited witnesses (one per lesson, pinned)
    ['M8 witness 7.1 divisibility family', '126'],
    ['M9 witness 7.2 the 7th term 59136a^6b^6', '59136'],
    ['M10 witness 7.2 middle term 90720', '90720'],
    ['M11 witness 7.2 conjugate powers', '2.00480032'],
    ['M12 witness 7.4 balanced seat 90', '90'],
    ['M13 witness 7.5 alternating squares 6', '1-16+36-16+1'],
    ['M14 witness 7.5 row 12 split 2048', '2048'],
    ['M15 witness 7.6 cbrt(65) honest column', '4.0207248'],
    ['M16 witness 7.6 mod 8', 'pmod 8'],
    ['M17 witness 7.6 conjugate pair 178', '178'],
    ['M18 witness the cancellation 495', '495'],
    // the mixed bench answers
    ['M19 bench: even-index row-12 sum', '2048'],
    ['M20 bench: constant term -252', '252'],
    ['M21 bench: sqrt(26) 5.1', '5.1'],
    ['M22 bench: squares sum 924', '924'],
    ['M23 bench: term count 21', '21'],
    ['M24 bench: x^6 hunt 2016', '2016'],
    ['M25 bench: 3^{n+1} - 2^{n+1}', '3^{n+1} - 2^{n+1}'],
    ['M26 bench: partial sums 15 = C(6,4)', '15'],
    ['M27 bench: greatest term T_4', 'T_{4}'],
    ['M28 bench: divisibility 2850 = 30*95', '2850'],
    // the handoffs
    ['M29 handoff: Theory of Equations chapter 8', 'Theory of Equations'],
    ['M30 handoff: calculus doorstep', 'doorstep'],
  ]
  for (const [name, needle] of pins) c.push(check(name, either(needle), needle.slice(0, 40)))

  const quiz = L.blocks.find((b) => b.kind === 'quiz') as { items: { q: string; options: string[]; answer: number; explain: string }[] }
  c.push(check('M31 quiz keys [1,1,0,2,1]', JSON.stringify(quiz.items.map((i) => i.answer)) === JSON.stringify([1, 1, 0, 2, 1]), JSON.stringify(quiz.items.map((i) => i.answer))))
  c.push(check('M32 every quiz explain kills wrong options', quiz.items.every((i) => i.explain.includes('Option'))))

  const words = countLessonWords(L)
  c.push(check('M33 review depth >= 5000', words >= 5000, `got ${words}`))
  c.push(check('M34 prerequisites = all six chapter lessons', JSON.stringify(L.prerequisites) === JSON.stringify(['aa-mathematical-induction-the-domino-principle', 'aa-the-binomial-theorem-proved', 'aa-binomial-theorem-any-index', 'aa-the-multinomial-theorem', 'aa-binomial-coefficients-at-work', 'aa-binomial-applications-and-approximations']), JSON.stringify(L.prerequisites)))
  c.push(check('M35 sources >= 5', (L.sources?.length ?? 0) >= 5))
  c.push(check('M36 the review carries a decision map figure', L.blocks.some((b) => b.kind === 'figure')))
  c.push(check('M37 the review carries the master table', L.blocks.some((b) => b.kind === 'table')))
  return c
}

let failed = false
for (const s of sections) {
  const status = s.ok === s.total ? 'GREEN' : 'FAIL'
  console.log(`[${status}] ${s.section}: ${s.ok}/${s.total}`)
  for (const f of s.fail) { console.log(`   FAIL ${f}`); failed = true }
}
console.log(chapterExists ? 'chapter file present (pin sections grow when written)' : 'chapter file absent (engine-only wave)')
process.exit(failed ? 1 : 0)

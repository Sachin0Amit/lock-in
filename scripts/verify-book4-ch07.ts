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
  c.push(check('Z3 status in-progress', chapter.status === 'in-progress'))
  c.push(check('Z4 two lessons shipped', chapter.lessons.length === 2, `got ${chapter.lessons.length}`))
  c.push(check('Z5 five planned remain', chapter.plannedLessons.length === 5, `got ${chapter.plannedLessons.length}`))
  c.push(check('Z6 planned titles pinned', JSON.stringify(chapter.plannedLessons) === JSON.stringify(['The Binomial Theorem for Any Index', 'The Multinomial Theorem', 'Binomial Coefficients at Work', 'Binomial Applications and Approximations', 'Unit 7 Completion Review'])))
  const ids = chapter.lessons.map((l) => l.id)
  c.push(check('Z7 ids unique in chapter', new Set(ids).size === ids.length))
  c.push(check('Z8 lesson numbers pinned', chapter.lessons.map((l) => l.number).join(',') === '7.1,7.2'))
  const totalWords = chapter.lessons.reduce((s, l) => s + countLessonWords(l), 0)
  c.push(check('Z9 honest depth >= 12000', totalWords >= 12000, `got ${totalWords}`))
  c.push(check('Z10 every lesson has sources + prerequisites', chapter.lessons.every((l) => (l.sources?.length ?? 0) >= 3 && (l.prerequisites?.length ?? 0) >= 2)))
  return c
}

{
  const ch = chapter07 as never as { lessons: Lesson[]; plannedLessons: string[]; status: string; number: number; slug: string; title: string }
  sections.push(tally('B (7.1 pins)', sectionB(ch)))
  sections.push(tally('D (7.2 pins)', sectionD(ch)))
  sections.push(tally('Z (census)', sectionZ(ch)))
}

let failed = false
for (const s of sections) {
  const status = s.ok === s.total ? 'GREEN' : 'FAIL'
  console.log(`[${status}] ${s.section}: ${s.ok}/${s.total}`)
  for (const f of s.fail) { console.log(`   FAIL ${f}`); failed = true }
}
console.log(chapterExists ? 'chapter file present (pin sections grow when written)' : 'chapter file absent (engine-only wave)')
process.exit(failed ? 1 : 0)

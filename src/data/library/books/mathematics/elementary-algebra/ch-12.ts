import type { Chapter } from '../../../types'

/**
 * Chapter 12 — Ratio, Proportion and Variation (the algebraic layer).
 *
 * CREATED by the pre-written-books audit (2026-11-11, owner directive:
 * "how you did for advanced algebra do it for pre written 3 books… see it
 * neet more topics or any changes if so do so"): the audit downloaded and
 * re-read the book's banked classic — Hall & Knight, *Elementary Algebra
 * for Schools* (Drive id 13p83Jss_D7bSgAXh1juKHKI69oKpBxWL, chapters I–XXI
 * recovered this pass, contents page re-transcribed) — plus Khattar QA 4e
 * ch. 7 (Drive id 12YnlSYX16Hl-Oze9Io7bBN0hZ_2qRcbi), and found that the
 * classic algebraic layer of XXXII "Ratio, Proportion, and Variation" was
 * carried nowhere on the shelf: FM 6.1–6.5 owns the school foundation
 * (ratio as comparison, cross-multiplication, direct/inverse variation,
 * scaling), but the duplicate/triplicate ratio family, continued
 * proportion and the mean proportional, the componendo–dividendo theorem
 * chain, and joint/combined variation belong to no lesson. This chapter
 * closes that gap, cross-referencing FM 6 throughout rather than
 * re-teaching it, and handing its speed craft to Quantitative Aptitude
 * ch. 4. Study-never-reproduce: every exhibit authored here is our own.
 *
 * Lesson 12.1 'Ratio Laws and the Componendo Family' (al-ratio-laws-and-the-componendo-family):
 * ratios as quotient comparisons wearing letters; duplicate/triplicate/
 * sub-duplicate ratios and their index laws; the four proportion theorems
 * (invertendo, alternendo, componendo, dividendo) each DERIVED from the
 * equality of fractions; componendo–dividendo proved and drilled; the
 * continued-proportion ladder a : b : : b : c with b² = ac.
 * Lesson 12.2 'Variation: the Algebra of Constants' (al-variation-the-algebra-of-constants):
 * direct variation as y = kx with the k-discipline (compute k from one
 * data point, never from two that disagree); inverse y = k/x with the
 * product invariance; JOINT variation z = kxy and COMBINED variation
 * z = kx/y with the dimensional checks; the three-step craft (write the
 * variation, fix k from honest data, predict and round-trip check).
 * Lesson 12.3 'Continued Proportion, Mean Proportionals and Applications'
 * (al-continued-proportion-and-mean-proportionals): the mean proportional
 * b = √(ac) between a and c (greeted from ANS 8.3's surd arithmetic);
 * the three-term family a, b, c in GP as continued proportion
 * (cross-referencing AA ch. 5's sequences arc); the triplicate-mean
 * family; classic applications — dividing in ratio, mixing with alligation
 * cross-referenced to QA, the "sum and ratio" equation family, and the
 * H&K-style word ladder.
 */
export const chapter12: Chapter = {
  number: 12,
  slug: 'ratio-proportion-variation',
  title: 'Ratio, Proportion and Variation',
  summary:
    'The algebraic layer of comparison: ratios as quotient structures wearing letters, the index-law families of duplicate and triplicate ratios, the four proportion theorems derived from one fraction equality, componendo–dividendo as the exam workhorse, continued proportion and the mean proportional, and variation (direct, inverse, joint, combined) as the algebra of the constant k. Foundation Mathematics taught the school layer; this chapter proves it and puts letters on it. Hands its speed craft to Quantitative Aptitude; hands its sequences face to Advanced Algebra.',
  status: 'planned',
  lessons: [],
  plannedLessons: [
    'Ratio Laws and the Componendo Family',
    'Variation: the Algebra of Constants',
    'Continued Proportion, Mean Proportionals and Applications',
  ],
}

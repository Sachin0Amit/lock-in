/**
 * Cover art manifest — the AI-generated text-free book covers.
 *
 * 28 covers were generated (864×1152, exact 3:4 portrait) with a motif keyed
 * to each book's subject and a palette from the book's own accent pair; a
 * vision sweep verified every cover is free of text/letters/numbers, so the
 * titles are rendered as clean CSS typography on top of the art.
 *
 * Assets live in `public/covers/<bookId>.webp` (repo-ready WebP, ~2.8 MB total
 * for the whole shelf). Any book not listed here falls back to the classic
 * gradient cover, so the reader never depends on the art being present.
 *
 * Owner directive 2026-11-11: "wire the cover image" — this manifest + the
 * BookCover art branch are that wiring (PROPOSED_FEATURES CV-01).
 */

/** bookId → art path under /public. Kept explicit so a missing file is a
 *  visible decision, not a silent 404 guessed from a slug. */
export const COVER_ART: Record<string, string> = {
  'advanced-algebra': '/covers/advanced-algebra.webp',
  'advanced-mathematical-foundations': '/covers/advanced-mathematical-foundations.webp',
  'abstract-algebra': '/covers/abstract-algebra.webp',
  'arithmetic-and-number-systems': '/covers/arithmetic-and-number-systems.webp',
  combinatorics: '/covers/combinatorics.webp',
  'complex-analysis': '/covers/complex-analysis.webp',
  'coordinate-geometry': '/covers/coordinate-geometry.webp',
  'differential-calculus': '/covers/differential-calculus.webp',
  'differential-equations': '/covers/differential-equations.webp',
  'discrete-mathematics': '/covers/discrete-mathematics.webp',
  'elementary-algebra': '/covers/elementary-algebra.webp',
  'foundation-mathematics': '/covers/foundation-mathematics.webp',
  geometry: '/covers/geometry.webp',
  'integral-calculus': '/covers/integral-calculus.webp',
  'linear-algebra': '/covers/linear-algebra.webp',
  'mathematical-logic': '/covers/mathematical-logic.webp',
  'mathematical-methods-for-engineering': '/covers/mathematical-methods-for-engineering.webp',
  'multivariable-calculus': '/covers/multivariable-calculus.webp',
  'number-theory': '/covers/number-theory.webp',
  'numerical-analysis': '/covers/numerical-analysis.webp',
  'optimization-and-operations-research': '/covers/optimization-and-operations-research.webp',
  'probability-theory': '/covers/probability-theory.webp',
  'quantitative-aptitude': '/covers/quantitative-aptitude.webp',
  'real-analysis': '/covers/real-analysis.webp',
  'set-theory': '/covers/set-theory.webp',
  statistics: '/covers/statistics.webp',
  topology: '/covers/topology.webp',
  trigonometry: '/covers/trigonometry.webp',
}

/** Art URL for a book, or null when that book has no generated cover — the
 *  reader then renders the accent-gradient cover (same geometry). */
export function coverArtUrl(bookId: string): string | null {
  return COVER_ART[bookId] ?? null
}

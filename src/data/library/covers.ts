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
 *
 * CS full-shelf planning pass (owner directive 2026-11-15, the "same method
 * as mathematics" turn): +44 Computer Science covers, the same discipline
 * (864×1152, motif per subject, palette per accent pair, VLM sweep — one
 * baked-text catch regenerated clean; scripts/gen_covers.py, recreated this
 * pass, is the idempotent generator).
 *
 * Engineering full-shelf planning pass (owner directive 2026-11-16, the
 * "same way as like other subject" turn): +38 Engineering covers, the same
 * discipline and generator (motif per subject, palette per accent pair,
 * VLM text-free sweep).
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
  // — the Computer Science shelf (2026-11-15 planning pass) —
  'computer-fundamentals': '/covers/computer-fundamentals.webp',
  'digital-logic-design': '/covers/digital-logic-design.webp',
  'computer-organization-architecture': '/covers/computer-organization-architecture.webp',
  'assembly-and-microprocessors': '/covers/assembly-and-microprocessors.webp',
  'data-structures': '/covers/data-structures.webp',
  algorithms: '/covers/algorithms.webp',
  'theory-of-computation': '/covers/theory-of-computation.webp',
  'compiler-design': '/covers/compiler-design.webp',
  'operating-systems': '/covers/operating-systems.webp',
  'database-management-systems': '/covers/database-management-systems.webp',
  'computer-networks': '/covers/computer-networks.webp',
  'computer-graphics': '/covers/computer-graphics.webp',
  'software-engineering': '/covers/software-engineering.webp',
  'object-oriented-programming': '/covers/object-oriented-programming.webp',
  'programming-languages-paradigms': '/covers/programming-languages-paradigms.webp',
  'c-programming': '/covers/c-programming.webp',
  'cpp-programming': '/covers/cpp-programming.webp',
  'java-programming': '/covers/java-programming.webp',
  'python-programming': '/covers/python-programming.webp',
  'javascript-and-web-technologies': '/covers/javascript-and-web-technologies.webp',
  'frontend-engineering': '/covers/frontend-engineering.webp',
  'backend-engineering': '/covers/backend-engineering.webp',
  'full-stack-web-development': '/covers/full-stack-web-development.webp',
  'distributed-systems': '/covers/distributed-systems.webp',
  'cloud-computing': '/covers/cloud-computing.webp',
  cybersecurity: '/covers/cybersecurity.webp',
  cryptography: '/covers/cryptography.webp',
  'artificial-intelligence': '/covers/artificial-intelligence.webp',
  'machine-learning': '/covers/machine-learning.webp',
  'deep-learning': '/covers/deep-learning.webp',
  'natural-language-processing': '/covers/natural-language-processing.webp',
  'computer-vision': '/covers/computer-vision.webp',
  'generative-ai-and-llms': '/covers/generative-ai-and-llms.webp',
  'reinforcement-learning': '/covers/reinforcement-learning.webp',
  'data-science': '/covers/data-science.webp',
  'big-data-engineering': '/covers/big-data-engineering.webp',
  'data-mining': '/covers/data-mining.webp',
  'information-retrieval': '/covers/information-retrieval.webp',
  blockchain: '/covers/blockchain.webp',
  'internet-of-things': '/covers/internet-of-things.webp',
  'mobile-app-development': '/covers/mobile-app-development.webp',
  'human-computer-interaction': '/covers/human-computer-interaction.webp',
  'parallel-computing': '/covers/parallel-computing.webp',
  'advanced-computer-science': '/covers/advanced-computer-science.webp',
  'engineering-mechanics': '/covers/engineering-mechanics.webp',
  'strength-of-materials': '/covers/strength-of-materials.webp',
  'theory-of-machines': '/covers/theory-of-machines.webp',
  'machine-design': '/covers/machine-design.webp',
  'thermodynamics': '/covers/thermodynamics.webp',
  'fluid-mechanics': '/covers/fluid-mechanics.webp',
  'heat-transfer': '/covers/heat-transfer.webp',
  'manufacturing-processes': '/covers/manufacturing-processes.webp',
  'industrial-engineering': '/covers/industrial-engineering.webp',
  'robotics-and-automation': '/covers/robotics-and-automation.webp',
  'cad-cam': '/covers/cad-cam.webp',
  'materials-science': '/covers/materials-science.webp',
  'circuit-theory-and-network-analysis': '/covers/circuit-theory-and-network-analysis.webp',
  'electrical-machines': '/covers/electrical-machines.webp',
  'power-systems': '/covers/power-systems.webp',
  'control-systems': '/covers/control-systems.webp',
  'power-electronics': '/covers/power-electronics.webp',
  'electrical-measurements': '/covers/electrical-measurements.webp',
  'high-voltage-engineering': '/covers/high-voltage-engineering.webp',
  'renewable-energy': '/covers/renewable-energy.webp',
  'electromagnetic-fields-and-waves': '/covers/electromagnetic-fields-and-waves.webp',
  'electronic-devices-and-circuits': '/covers/electronic-devices-and-circuits.webp',
  'analog-electronics': '/covers/analog-electronics.webp',
  'signals-and-systems': '/covers/signals-and-systems.webp',
  'analog-and-digital-communication': '/covers/analog-and-digital-communication.webp',
  'vlsi-design': '/covers/vlsi-design.webp',
  'embedded-systems': '/covers/embedded-systems.webp',
  'antennas-and-wave-propagation': '/covers/antennas-and-wave-propagation.webp',
  'digital-signal-processing': '/covers/digital-signal-processing.webp',
  'structural-engineering': '/covers/structural-engineering.webp',
  'surveying-and-geomatics': '/covers/surveying-and-geomatics.webp',
  'building-materials': '/covers/building-materials.webp',
  'geotechnical-engineering': '/covers/geotechnical-engineering.webp',
  'transportation-engineering': '/covers/transportation-engineering.webp',
  'environmental-engineering': '/covers/environmental-engineering.webp',
  'hydraulics': '/covers/hydraulics.webp',
  'water-resources-engineering': '/covers/water-resources-engineering.webp',
  'construction-management': '/covers/construction-management.webp',
}

/** Art URL for a book, or null when that book has no generated cover — the
 *  reader then renders the accent-gradient cover (same geometry). */
export function coverArtUrl(bookId: string): string | null {
  return COVER_ART[bookId] ?? null
}

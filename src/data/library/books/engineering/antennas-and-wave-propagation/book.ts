import type { Book, Chapter } from '../../../types'

/**
 * Antennas and Wave Propagation — the twenty-eighth book of the Engineering shelf (Electronics & Communication branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 33 planned lessons, zero written. Lesson ids will use the `ant-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Antennas and Wave Propagation owns the radiation and propagation census (GATE EC S8’s antenna lines: ’dipole and monopole antennas, linear antenna arrays’ — the wave-propagation phrases of the register served honestly). Electromagnetic Fields and Waves owns the field-and-wave theory beneath (its radiation doorway cross-referenced); Analog and Digital Communication owns the link budget and system story; the CS shelf’s wireless future books route here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 EC Section 8 (EC_2026_Syllabus.pdf, extracted this pass): the
 *   Electromagnetics section's closing lines — 'dipole and monopole antennas,
 *   linear antenna arrays' — plus the wave-propagation phrases of the section
 *   (plane waves' reflection and refraction routed to the fields book, the
 *   propagation-through-media craft shared) — this book serves the antenna and
 *   propagation lines at full depth.
 * - Balanis, Antenna Theory: Analysis and Design 4e — the TOC web-checked this
 *   pass (Antennas; Fundamental Parameters; Radiation Integrals; the Linear Wire
 *   family; Loop antennas; Arrays; Aperture; Horn and Reflector antennas;
 *   Microstrip; the smart-antenna chapter; measurements); K.D. Prasad's Antenna
 *   and Wave Propagation named as the Indian pole (the propagation chapters' home
 *   in the Indian canon); Jordan & Balmain named.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-antenna-idea',
    title: 'The Antenna Idea',
    summary:
      'Why radiation happens (the accelerating-charge honest note); the transition from guided wave to free space; the antenna census with its families priced; and the parameter family learned as the trade vocabulary — pattern, directivity, gain (the honest difference), beamwidth, impedance, polarisation, bandwidth and efficiency.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Radiation Mechanism, Honestly',
      'The Family Census',
      'The Parameter Vocabulary Earned',
      'This publication is in copyright. Subject to statutory exception and to the provisions of relevant collective licensing agreements, no reproduction of any part may take place without the written permission of Cambridge University Press'
    ],
  },
  {
    number: 2,
    slug: 'the-thin-wire-family',
    title: 'The Thin-Wire Family',
    summary:
      'The infinitesimal dipole\u2019s fields read (the near-and-far census from the fields book cross-referenced); the half-wave dipole analysed — its pattern, radiation resistance and input impedance; the folded dipole and its impedance craft; monopoles over ground planes (the image theory honest note); and the small loop as the magnetic sibling.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Half-Wave Dipole Analysed',
      'Folded Dipoles and Their Impedance Craft',
      'Monopoles and Image Theory',
      'The Loop Sibling',
    ],
  },
  {
    number: 3,
    slug: 'the-array-idea',
    title: 'The Array Idea',
    summary:
      'The two-element array earned (the pattern-interference craft); pattern multiplication as the array\u2019s algebra; the uniform linear array — broadside and endfire families with their beamwidth and sidelobe census; binomial and Dolph-Chebyshev distributions priced; beam steering and the phased-array craft; and the smart-antenna and MIMO glance (the modern doorstep named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Two Elements Earned',
      'Pattern Multiplication as Algebra',
      'Broadside, Endfire, Distributions',
      'Steering and the MIMO Glance',
    ],
  },
  {
    number: 4,
    slug: 'aperture-and-reflector-antennas',
    title: 'Aperture and Reflector Antennas',
    summary:
      'The aperture idea (the field-equivalence honest note); horns — the sectoral and pyramidal census with their gains; the parabolic reflector — its geometry, feed craft and efficiency census; the Cassegrain honest note; lens antennas glanced; and the aperture census table priced by the microwave niches they serve.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Aperture Idea',
      'Horns Priced',
      'The Parabolic Reflector Craft',
      'The Aperture Census Table',
    ],
  },
  {
    number: 5,
    slug: 'microstrip-and-modern-antennas',
    title: 'Microstrip and Modern Antennas',
    summary:
      'The patch antenna earned — its radiation mechanism, the transmission- line model, the width-and-length design arithmetic and the feed census; bandwidth and the ground-plane honest notes; the miniaturisation census; the dielectric resonator glanced; and the modern families named — wearable, UWB, the metasurface honest note — priced by maturity.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Patch Earned and Designed',
      'The Feed Census',
      'The Miniaturisation Census',
      'Modern Families Priced by Maturity',
    ],
  },
  {
    number: 6,
    slug: 'wave-propagation-i',
    title: 'Wave Propagation I: Ground and Space Waves',
    summary:
      'The propagation census on one page (the frequency-versus-route map); the ground wave — its surface-wave craft and the frequency honest niche; the space wave — LOS with the radio horizon (the curvature arithmetic), the reflection with fading named, the diffraction glance (the knife-edge craft); and the field-strength and link arithmetic practised on real links.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Frequency-versus-Route Map',
      'The Ground Wave\u2019s Niche',
      'LOS, Radio Horizon, Fading Named',
      'The Link Arithmetic Practised',
      'Propagation Delay 1150 18.3.3 Flash Memory'
    ],
  },
  {
    number: 7,
    slug: 'wave-propagation-ii',
    title: 'Wave Propagation II: The Sky Wave',
    summary:
      'The ionosphere earned (the layers as the honest radio mirror — D, E, F with their diurnal census); the sky-wave craft — incidence, virtual height, MUF and skip distance computed; the fading census (its mechanisms honestly priced); the HF propagation arithmetic worked on real circuits; and the satellite route priced as the modern honest successor (the slant-path arithmetic).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ionosphere Earned',
      'MUF and Skip Computed',
      'Fading\u2019s Mechanisms Priced',
      'The Satellite Route Priced',
    ],
  },
  {
    number: 8,
    slug: 'measurements-and-synthesis',
    title: 'Antenna Measurements and the Synthesis',
    summary:
      'The measurement census — pattern ranges and the anechoic honest note, gain by comparison and the three-antenna craft, the impedance measurement routed to the vector instruments; the near-field honest glance; and the synthesis — one page from the radiation mechanism to the wireless link, with the doorsteps: Analog and Digital Communication\u2019s link budget, the wireless future\u2019s books, Electromagnetic Fields and Waves beneath it all.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Measurement Census',
      'Gain Measured Honestly',
      'The Synthesis Page',
      'The Doorsteps Named',
    ],
  },
]

export const antennasAndWavePropagation: Book = {
  id: 'antennas-and-wave-propagation',
  title: 'Antennas and Wave Propagation',
  subtitle: 'Radiation engineered — the antenna census and the routes radio waves actually take',
  discipline: 'engineering',
  level: 'First antennas course → wireless-systems readiness',
  description: 'The radiated discipline: the antenna idea — the radiation mechanism, the antenna census (wire, aperture, microstrip, array), and the parameter family (radiation pattern, directivity and gain, beamwidth, input impedance, polarisation, bandwidth, efficiency); the thin-wire family — the infinitesimal and half-wave dipole analysed, the folded dipole and monopoles over ground; the array idea — the two-element array earned, the uniform linear array with pattern multiplication, binomial and end-fire arrays, beam steering and the smart-antenna glance; aperture and reflector antennas — horns, the parabolic reflector with its feed craft; microstrip and the modern census — the patch, the MIMO and adaptive glance; wave propagation — the ground wave, the sky wave and the ionosphere\u2019s layers with MUF and skip distance, the space wave and LOS with the curvature and fading honest notes; the link and field-strength craft; antenna measurements (patterns, gain, the anechoic honest note); and the synthesis with the wireless doorstep. Cross-references Electromagnetic Fields and Waves (the field theory beneath), Analog and Digital Communication (the link budget) and hands off to the wireless future.',
  status: 'planned',
  accent: ['#dc2626', '#991b1b'],
  chapters,
}

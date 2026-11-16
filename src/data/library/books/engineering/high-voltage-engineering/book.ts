import type { Book, Chapter } from '../../../types'

/**
 * High Voltage Engineering — the nineteenth book of the Engineering shelf (Electrical branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 30 planned lessons, zero written. Lesson ids will use the `hv-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): High Voltage Engineering owns insulation, breakdown and testing depth. Power Systems owns the grid context (corona, insulation coordination appear there at system level, cross-referenced); Electromagnetic Fields and Waves owns the field theory beneath breakdown; the future Physics shelf may grow a plasma/ionisation line (cross-reference when planned).
 *
 * RESEARCH PHASE (2026-11-16):
 * - Naidu & Kamaraju, High Voltage Engineering — the classic arc web-checked
 *   this pass (Conduction and Breakdown in Gases; Liquid Dielectrics; Solid
 *   Dielectrics; Applications of Insulating Materials; Generation of High Voltages
 *   and Currents; Measurement of High Voltages; High-Voltage Testing; the
 *   overvoltage/insulation chapters confirmed through the open listings and search
 *   records).
 * - Kuffel, Zaengl & Kuffel named as the depth pole; the IEC 60xxx and IS standards
 *   census noted for authoring time.
 * - GATE context: the EE register prices HVE indirectly through Power Systems'
 *   insulation and breaker lines — this book serves the elective and university
 *   pole honestly.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-hv-world',
    title: 'The High-Voltage World',
    summary:
      'Why voltage climbs (the power-transfer honest note P = root-3 V I); the insulation problem stated as the discipline; the voltage-class census; the testing-lab worldview; and the safety craft stated as law before anything else.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Why Voltage Climbs',
      'The Insulation Problem Stated',
      'The Lab and Its Safety Law',
    ],
  },
  {
    number: 2,
    slug: 'gaseous-breakdown',
    title: 'Conduction and Breakdown in Gases',
    summary:
      'Ionisation processes priced (collision, photo, thermal); Townsend\u2019s first and second coefficients and the avalanche growth equation; the self- sustaining discharge criterion; Paschen\u2019s law earned and its minimum read honestly; the streamer theory for high pd; corona (its audible and loss census cross-referenced to Power Systems); and spark versus arc distinguished.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Townsend\u2019s Avalanche Earned',
      'Paschen\u2019s Law and Its Minimum',
      'Streamers Beyond Townsend',
      'Corona Priced',
    ],
  },
  {
    number: 3,
    slug: 'liquid-and-solid-breakdown',
    title: 'Liquid and Solid Breakdown',
    summary:
      'Liquid dielectrics — the purified-oil honest mechanisms (intrinsic, suspended-particle, cavitation, electroconvection); moisture and contamination as the honest killers; solid dielectrics — intrinsic, electromechanical and electrothermal breakdown; treeing and tracking named with their honest prevention; composite insulation (oil-impregnated paper) priced as the transformer\u2019s real life; and the testing of the liquid and solid census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Liquid Mechanisms',
      'The Solid Mechanisms',
      'Treeing and Tracking',
      'Composite Insulation Priced',
    ],
  },
  {
    number: 4,
    slug: 'insulating-materials',
    title: 'Applications of Insulating Materials',
    summary:
      'The materials census — gases (SF6 with its environmental honest note), mineral and synthetic liquids, the solid family (paper, pressboard, epoxy, mica, polymer films, porcelain and glass), and their honest niches (transformer, switchgear, cable, insulator); thermal classes and ageing; and the selection craft by stress, thermal and environment.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Gaseous and Liquid Census',
      'The Solid Family and Its Niches',
      'Thermal Classes and Ageing',
    ],
  },
  {
    number: 5,
    slug: 'hv-generation',
    title: 'Generation of High Voltages and Currents',
    summary:
      'AC generation — cascaded transformers (with the reactor honest note); resonant transformers glanced; DC generation — the Cockcroft-Walton voltage-doubler chains analysed, the Van de Graaff craft; impulse generation — the Marx circuit analysed with the R-C wave-shaping arithmetic and the standard 1.2/50 lightning and 250/2500 switching waves earned; and high-current impulse generation glanced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Cascaded Transformers',
      'Cockcroft-Walton Analysed',
      'The Marx Circuit Earned',
      'Standard Waves Shaped',
    ],
  },
  {
    number: 6,
    slug: 'hv-measurement',
    title: 'Measurement of High Voltages',
    summary:
      'Why ordinary meters cannot come (the impedance honest note); sphere gaps as the calibration honest note (with the voltage-measurement law); peak- reading voltmeters; potential dividers — resistive, capacitive and the mixed damped craft; electrostatic voltmeters; and the measurement of impulse (the oscilloscope cross-referenced) with partial-discharge detection named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Sphere Gaps as Calibration',
      'Peak Voltmeters and Dividers',
      'The Mixed-Damped Craft',
      'Impulse Measured, PD Named',
    ],
  },
  {
    number: 7,
    slug: 'hv-testing',
    title: 'High-Voltage Testing and Standards',
    summary:
      'The test census — power frequency (wet and dry), impulse (up and down methods), partial discharge and interference; testing of the apparatus census (transformers, bushings, insulators, cables, surge arresters) each priced; the standards census (IEC 60xxx and the IS family) as the profession\u2019s shared language; the lab organisation and safety craft; and the test-report read as a genre.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Test Census',
      'Apparatus Priced One by One',
      'The Standards as Shared Language',
      'The Test Report as Genre',
    ],
  },
  {
    number: 8,
    slug: 'overvoltage-and-coordination',
    title: 'Overvoltage and Insulation Coordination',
    summary:
      'Lightning — its physics honestly priced (the stroke census, the mechanism models named); switching surges (the line-switching honest note); protective devices — the surge arrester (gap versus gapless, the ZnO craft) and shielding; insulation coordination — the BIL census, protective margins arithmetic, the coordination drawn on the voltage-time honest plane; and the doorstep — Power Systems\u2019 protection, the offshore and HVDC notes of Renewable Energy.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Lightning Priced Honestly',
      'Switching Surges',
      'Arresters and Their Margins',
      'Coordination Drawn',
    ],
  },
]

export const highVoltageEngineering: Book = {
  id: 'high-voltage-engineering',
  title: 'High Voltage Engineering',
  subtitle: 'Breakdown, generation and testing at high voltage — the insulation side of the grid',
  discipline: 'engineering',
  level: 'First high-voltage course → testing-and-insulation readiness',
  description: 'The insulation discipline: why high voltage exists (the power-transfer honest note); conduction and breakdown in gases — Townsend\u2019s avalanches, Paschen\u2019s law, the streamer and corona crafts; breakdown in liquid dielectrics (purified oil\u2019s honest mechanisms) and in solid dielectrics (electrothermal, electromechanical and treeing); the insulating-materials census (gases, liquids, solids, composites and their applications); generation of high voltages and currents — cascaded transformers for AC, Cockcroft-Walton multipliers and electrostatic generators for DC, impulse generators (Marx circuit) with the standard impulse wave shaped honestly; measurement of high voltages — sphere gaps, peak voltmeters, capacitive and resistive dividers; high-voltage testing of apparatus (power frequency, impulse, partial discharge named) and the standards census (IEC/IS); over-voltage phenomena — lightning (its physics honestly priced) and switching surges; and insulation coordination with protective devices (arresters) closing to the Power Systems doorstep. Cross-references Power Systems, Electromagnetic Fields and Waves and hands off to Renewable Energy\u2019s offshore and HVDC notes.',
  status: 'planned',
  accent: ['#7f1d1d', '#450a0a'],
  chapters,
}

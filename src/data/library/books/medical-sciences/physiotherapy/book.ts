import type { Book, Chapter } from '../../../types'

/**
 * Physiotherapy — the nineteenth book of the Medical Sciences shelf.
 *
 * STATUS: PLANNED (Medical Sciences full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 20 planned lessons, zero written. Lesson ids will use the `physio-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Physiotherapy owns the movement-and-rehabilitation register. The neuroanatomy to anatomy; the mechanism to medical-physiology (the movement’s-here); the pharmacology to pharmacology; the orthopaedic’s-surgery to general-surgery (the rehab here); the paediatric to pediatrics (the CP register here); the NEET-and-BPT lines are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Kisner-and-Colby’s Therapeutic Exercise named as the pole.
 * - O’Sullivan-and-Schmitz-and-Rehabilitation named as the neurological co-pole.
 * - The Indian-APTA-style register named with the BPT syllabus as the school ladder.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'foundation-movement-science',
    title: 'The Foundation-and-Movement-Science Register',
    summary:
      'The movement\u2019s frame: the biomechanic\u2019s craft (the axis-and-plane honesty with the conjugate movement register, the force\u2019s-couple craft — the calcaneus named at survey depth); the muscle\u2019s arc (the length-tension honesty with the SCATTER register named, the fibre\u2019s-type division cross-referenced from the biology shelf, the motor-unit recruitment honesty); the proprioception\u2019s register (the joint\u2019s-receptor census with the balance\u2019s craft — the VOR named at survey depth); and the kypholordotic register named (the posture\u2019s craft with the curve\u2019s honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Axis-Plane Honesty Fixed Once',
      'The Length-Tension Honesty Held',
      'The Recruitment Honesty Cross-Referenced',
      'The Posture\u2019s Craft Named',
    ],
  },
  {
    number: 2,
    slug: 'assessment-craft',
    title: 'The Assessment Craft',
    summary:
      'The measurement\u2019s discipline: the ROM\u2019s craft (the goniometer\u2019s honesty with the end-feel register — the capsular-and-division named); the MMT\u2019s craft (the grade\u2019s-division fixed by drill — the 3\u2019s-against-gravity honesty, the 4\u2019s 5\u2019s division with the make-or-break craft); the functional\u2019s scales (the BBS-and-ADL census named at survey depth with the each-register honesty); the gait\u2019s-analysis craft (the cycle\u2019s-reading — the stance\u2019s-against-swing division with the GRF honesty, the Trendelenburg receipt named); the neuro\u2019s-assessment arc (the tone-and-Modified craft with the reflex\u2019s census cross-referenced); and the assessment\u2019s-ethics (the informed honesty with the consent\u2019s-craft).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The End-Feel Register Named',
      'The Grade Division Fixed by Drill',
      'The Trendelenburg Receipt Named',
      'The Consent Craft Cross-Referenced',
    ],
  },
  {
    number: 3,
    slug: 'therapeutic-exercise-electrotherapy',
    title: 'The Therapeutic-Exercise-and-Electrotherapy Registers',
    summary:
      'The prescription and the machine craft: the exercise\u2019s arc (the prescription\u2019s-craft with the REP register named, the overload\u2019s honesty — the FITT craft fixed by drill, the stretching\u2019s PNF honesty with the hold-relax receipt priced straight, the core\u2019s stability arc with the deep honesty named); the electrotherapy\u2019s register (the TENS\u2019s pain\u2019s-gate honesty named with the IF-and-deep craft — the interference named, the ultrasound-and-thermal register with the non-thermal honesty named, the NMES\u2019s craft with the atrophy register); the hydrotherapy-and-register named (the Bad named at survey depth); and the taping\u2019s-craft named (the K named at survey depth with the evidence\u2019s honesty held).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The FITT Craft Fixed by Drill',
      'The Hold-Relax Receipt Priced Straight',
      'The Gate Honesty Named',
      'The Evidence Honesty Held Straight',
    ],
  },
  {
    number: 4,
    slug: 'musculoskeletal-register',
    title: 'The Musculoskeletal Register',
    summary:
      'The ortho rehab craft: the LBP\u2019s arc (the red-flag\u2019s honesty — the Keegan\u2019s-named at survey depth, the mechanical\u2019s-against-specific division with the yellow-flag register named, the core-and-aerobic craft with the evidence honesty priced straight); the sprain-and-strain division with the RICE\u2019s-arc and the POLICE named; the frozen\u2019s-shoulder register (the capsular\u2019s-arc with the staged craft); the arthroplasty\u2019s-arc (the pre-and-post register with the HIP precaution honesty — the posterior named); the ACL\u2019s craft with the Return register named (the hop test honesty); the tendinopathy\u2019s-arc with the eccentric receipt priced straight; and the fracture-and-rehab register with the immobilisation-and-consequence named — the osteoporosis register named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Yellow-Flag Register Named',
      'The Evidence Honesty Priced Straight',
      'The Hop Test Honesty Held',
      'The Eccentric Receipt Priced Straight',
    ],
  },
  {
    number: 5,
    slug: 'neuro-cardiopulmonary-community',
    title: 'The Neuro, Cardiopulmonary-and-Community Registers',
    summary:
      'The long rehab crafts: the neurological\u2019s arc (the stroke\u2019s Brunnstrom\u2019s-staged honesty with the Bobath\u2019s-craft named — the task\u2019s-against-compensation honesty held straight, the SCI\u2019s level\u2019s honesty with the transfer\u2019s craft, the BBPI-and-Grade register named, the Parkinson-and-BIG craft named, the CP-and-early register with the family\u2019s honesty); the cardiopulmonary\u2019s register (the Phase-II honesty with the TEGAR register named, the COPD-and-AD craft with the pursed-lip receipt — the clearance\u2019s census with the ACBT craft); the community\u2019s register (the geriatric-and-fall craft with the Otago named, the paediatric\u2019s milestone arc cross-referenced, the ergonomic\u2019s craft with the workstation\u2019s honesty); and the profession\u2019s-register (the evidence\u2019s-honesty with the CPD craft named — the IAP register named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Task Honesty Held Straight',
      'The ACBT Craft Named',
      'The Otago Register Named',
      'The Evidence Honesty Held as the Frame',
    ],
  },
]

export const physiotherapy: Book = {
  id: 'physiotherapy',
  title: 'Physiotherapy',
  subtitle: 'The movement discipline — assessment, the therapeutic exercise arc and the rehabilitation registers',
  discipline: 'medical-sciences',
  level: 'Undergraduate BPT core (the professional register)',
  description: 'The movement\u2019s discipline: the foundation register (the movement\u2019s-science — the biomechanic\u2019s honesty with the axis-and-plane craft, the muscle\u2019s length-tension arc, the proprioception\u2019s register with the balance\u2019s honesty); the assessment\u2019s craft (the ROM\u2019s goniometer honesty with the MMT manual testing fixed by drill — the grade\u2019s-division, the functional\u2019s scales — the BBS named at survey depth, the gait\u2019s-analysis craft with the cycle\u2019s-reading); the therapeutic-exercise arc (the strengthening-and-prescription craft — the REP register named, the stretching\u2019s PNF honesty, the aerobic-and-prescription register with the FITT craft, the core\u2019s stability arc); the electrotherapy\u2019s register (the TENS-and-IF division with the pain\u2019s-gate honesty named, the ultrasound\u2019s thermal crafts, the NMES register); the musculoskeletal\u2019s register (the back\u2019s lbp arc with the red-flag\u2019s honesty — the Keegan\u2019s-named at survey depth, the sprain-and-strain division with the RICE craft, the frozen\u2019s-shoulder register, the arthroplasty\u2019s rehab arc); the neurological\u2019s register (the stroke\u2019s Brunnstrom arc with the Bobath-and-honesty named, the SCI\u2019s level\u2019s honesty with the BBPI register, the Parkinson-and-BIG craft named, the CP-and-early register); the cardiopulmonary\u2019s register (the Phase-II honesty with the TEGAR register named, the COPD-and-AD craft with the pursed-lip receipt); the community\u2019s register (the geriatric-and-fall craft with the OSTEOPOROSIS register named, the paediatric\u2019s milestone arc cross-referenced, the ergonomic\u2019s craft); and the profession\u2019s register (the evidence\u2019s honesty with the CPD craft named).',
  status: 'planned',
  accent: ['#0284c7', '#0c4a6e'],
  chapters,
}

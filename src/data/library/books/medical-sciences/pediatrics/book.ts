import type { Book, Chapter } from '../../../types'

/**
 * Pediatrics — the fourteenth book of the Medical Sciences shelf.
 *
 * STATUS: PLANNED (Medical Sciences full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 20 planned lessons, zero written. Lesson ids will use the `pedi-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Pediatrics owns the child register. The mechanism’s to the adult books (cross-referenced with the child’s-difference held straight — the dose’s weight arithmetic); the immunisation’s-program to community-medicine; the obstetric to obstetrics-gynaecology; the NEET-and-FMGE lines are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - OP Ghai’s Essential Pediatrics named as the Indian pole.
 * - Nelson’s named as the depth co-pole.
 * - The NCERT-and-FMGE lines as the school ladder.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'growth-development',
    title: 'The Growth-and-Development Register',
    summary:
      'The child-and-measuring craft: the growth\u2019s craft (the percentile\u2019s craft with the WHO\u2019s honesty — the z-score-and-register named, the weight-and-length division, the faltering\u2019s identification honesty with the crossing-lines receipt); the development\u2019s census (the milestone\u2019s map with the red-flag\u2019s delay honesty — the referral craft priced straight, the two-screen registers named); the intelligence-and-craft named at survey depth; and the adolescent\u2019s register (the Tanner\u2019s craft with the confidentiality-and-honesty named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The z-Score Register Named',
      'The Crossing-Lines Receipt Held',
      'The Red-Flag Honesty Priced Straight',
      'The Confidentiality Honesty Named',
    ],
  },
  {
    number: 2,
    slug: 'neonatology',
    title: 'The Neonatology Register',
    summary:
      'The newborn\u2019s craft: the resuscitation\u2019s arc (the steps\u2019s craft with the golden-minute honesty — the airway-and-warming registers, the APGAR cross-referenced); the jaundice\u2019s craft (the physiological-and-pathological division with the graph honesty — the hour-specific craft priced straight, the phototherapy\u2019s exchange arithmetic with the Kernicterus-and-consequence named, the G6PD-and-register named); the sepsis\u2019s craft (the early-and-late division with the screen honesty); the prematurity\u2019s map (the steroid-and-antenatal receipt, the surfactant\u2019s craft cross-referenced from physiology, the feeding-and-IV register with the KMC\u2019s honesty); the birth-injury-and-HIE registers (the hypothermia-and-craft named); the congenital-screening map (the newborn-screen census with the hypothyroid\u2019s-India register named); and the feeding\u2019s register with the lactation cross-referenced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Hour-Specific Craft Priced Straight',
      'The Exchange Arithmetic Named',
      'The KMC Honesty Held',
      'The Newborn-Screen Census Named',
    ],
  },
  {
    number: 3,
    slug: 'nutrition-immunisation',
    title: 'The Nutrition-and-Immunisation Registers',
    summary:
      'The feeding-and-protecting craft: the nutrition\u2019s register (the exclusive\u2019s six-month honesty with the weaning-and-timeline craft, the complementary-and-frequency register, the SAM\u2019s craft cross-referenced — the appetite\u2019s test honesty with the stabilization-and-refeeding craft, the MAM-and-follow register); the micronutrient\u2019s craft (the VAMD-and-night register with the dose-and-India craft named, the anaemia\u2019s-IDA register with the deworming arc); the immunisation\u2019s register (the UIP\u2019s schedule fixed by drill with the miss\u2019s catch-up craft, the AEFI\u2019s report honesty, the cold-chain cross-referenced); and the obesity-and-register named with the screen-time honesty held.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Six-Month Honesty Held',
      'The Refeeding Craft Priced Straight',
      'The Schedule Fixed by Drill',
      'The Screen-Time Honesty Held Straight',
    ],
  },
  {
    number: 4,
    slug: 'infections-childhood',
    title: 'The Infections of Childhood',
    summary:
      'The child\u2019s illness map: the measles\u2019s arc (the Koplik receipt with the complication census — the SSPE named, the vitamin-A craft priced straight); the varicella-and-mumps registers (the orchitis honesty named with the complication census); the diphtheria\u2019s craft (the bull-neck honesty with the membrane\u2019s cross-referenced from medical-microbiology, the antitoxin-and-emergency craft); the pertussis\u2019s craft (the whooping honesty with the apnoea-and-register named); the TB\u2019s child map (the differences from the adult held straight — the miliary-and-CNS registers, the DOTs cross-referenced); the pneumonia\u2019s craft (the WHO\u2019s fast-breathing receipt with the danger census); the diarrhoea\u2019s craft (the ORS\u2019s zinc arithmetic cross-referenced from community-medicine — the who plan held, the dysentery\u2019s division); the dengue-and-lepto registers named; and the HIV-and-child register (the PCP prophylaxis cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Koplik Receipt Named',
      'The Emergency Craft Priced Straight',
      'The Child-TB Differences Held Straight',
      'The WHO Plans Held',
    ],
  },
  {
    number: 5,
    slug: 'systemic-pediatrics',
    title: 'The Systemic Pediatrics Registers',
    summary:
      'The systems of childhood: the congenital-heart\u2019s craft (the census — the acyanotic\u2019s-against-cyanotic division with the murmur\u2019s timing honesty cross-referenced, the failure-and-arterial craft named, the India screening named); the nephrotic\u2019s craft (the syndrome\u2019s honesty with the steroid-and-response register — the relapse\u2019s division); the asthma-and-child register with the inhaler\u2019s spacer honesty; the seizure\u2019s craft (the febrile\u2019s-against-epilepsy division with the status\u2019s emergency arithmetic — the benzodiazepine craft priced straight); the leukaemia\u2019s-preview (the ALL\u2019s 80 honesty with the cross-reference named); the anaemia\u2019s craft (the IDA cross-referenced with the thalassemia-and-register named — the transfusion\u2019s iron honesty held); the rickets register cross-referenced; and the cerebral-palsy register named with the early-intervention craft.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two-Census Division Held',
      'The Spacer Honesty Named',
      'The Status Arithmetic Priced Straight',
      'The Early-Intervention Craft Named',
      'Child Health Nursing for the Paediatrician',
    ],
  },
]

export const pediatrics: Book = {
  id: 'pediatrics',
  title: 'Pediatrics',
  subtitle: 'The child\u2019s register — growth, the newborn, nutrition and the illnesses of childhood',
  discipline: 'medical-sciences',
  level: 'Undergraduate MBBS core (the OP Ghai register)',
  description: 'The child\u2019s discipline: the growth-and-development register first (the percentile\u2019s craft with the WHO\u2019s chart honesty, the milestone census with the red-flag\u2019s delay honesty, the development-and-screening craft); the neonatology\u2019s register (the newborn\u2019s arc — the resuscitation\u2019s steps with the golden-minute honesty, the birth-injury-and-HIE registers, the jaundice-and-graph craft with the phototherapy\u2019s exchange arithmetic, the sepsis\u2019s prematurity map, the feeding-and-lactation register); the nutrition\u2019s craft (the feeding\u2019s census — the exclusive honesty with the weaning\u2019s timeline, the malnutrition\u2019s map with the SAM\u2019s craft cross-referenced from community-medicine, the obesity-and-register named); the immunisation\u2019s register (the UIP\u2019s schedule cross-referenced with the cold-chain honesty and the AEFI craft); the infections of childhood (the measles\u2019s arc with the Koplik receipt, the varicella-and-mumps registers, the diphtheria\u2019s pertussis crafts, the TB\u2019s child map, the pneumonia\u2019s diarrhoea crafts with the WHO plans, the dengue-and-lepto registers); the systemic\u2019s registers (the congenital-heart\u2019s census with the murmur honesty, the nephrotic\u2019s craft, the asthma-and-child register, the seizure-and-febrile division, the leukaemia\u2019s preview, the anaemia registers); the adolescent-and-register named; and the developmental-and-behavioural register (the autism\u2019s ADHD crafts with the screen-time honesty held).',
  status: 'planned',
  accent: ['#f97316', '#7c2d12'],
  chapters,
}

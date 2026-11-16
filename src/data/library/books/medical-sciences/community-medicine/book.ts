import type { Book, Chapter } from '../../../types'

/**
 * Community Medicine — the tenth book of the Medical Sciences shelf.
 *
 * STATUS: PLANNED (Medical Sciences full-shelf planning pass, 2026-11-16) — 6 chapters /
 * 24 planned lessons, zero written. Lesson ids will use the `phealth-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Community Medicine owns the population’s register. The disease’s mechanism to pathology-and-the specialty books (the population here, the patient there); the organism’s register to medical-microbiology; the statistics’ mathematical depth cross-referenced to the mathematics shelf; the NEET-and-FMGE lines are priced here with the Indian-program honesty named throughout.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Park’s Textbook of Preventive and Social Medicine named as the Indian pole (the program’s register).
 * - Gordis’ Epidemiology named as the craft’s co-pole.
 * - The NCERT-and-FMGE lines as the school ladder.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'concept-register',
    title: 'The Concept Register',
    summary:
      'The population\u2019s frame: the health\u2019s definition (the WHO\u2019s broad honesty priced straight — the criticism named); the disease\u2019s natural-history craft (the stage\u2019s division with the primary-secondary-tertiary prevention census — each fixed by its receipt); the iceberg analogy (the subclinical\u2019s spectrum honesty with the case-definition craft); the determinants register (the multi-causal honesty with the web-and-model craft — the poverty-and-structural registers named); the measurement\u2019s craft (the incidence\u2019s prevalence arithmetic fixed by drill with the at-risk honesty); and the indicator\u2019s census (the rate\u2019s ratio-and-proportion division with the MMR-and-IMR crafts named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Prevention Census by Its Receipts',
      'The Iceberg Honesty Held',
      'The Incidence-Prevalence Arithmetic Fixed by Drill',
      'The MMR-IMR Crafts Named',
    ],
  },
  {
    number: 2,
    slug: 'epidemiology-craft',
    title: 'The Epidemiology Craft',
    summary:
      'The study\u2019s discipline: the design\u2019s census (the descriptive-and-search craft, the analytical-and-observational division — the cohort\u2019s RR honesty with the prospective\u2019s cost, the case-control-and-OR craft with the recall\u2019s bias honesty priced straight, the cross-sectional\u2019s prevalence consequence); the 2x2\u2019s arithmetic (the association\u2019s measures fixed by drill — the RR-OR-AR-and-ER division with the attributable\u2019s public honesty); the trial\u2019s register (the RCT\u2019s gold honesty with the randomisation\u2019s blinding crafts, the ethics\u2019s consent arc); the confounding-and-bias census (the selection\u2019s information-and-confounding division with the matching\u2019s stratification crafts named); and the causal-and-criteria craft (the Hill\u2019s viewpoints held straight with the temporality\u2019s-first honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Cohort-Case-Control Honesty Held',
      'The 2x2 Arithmetic Fixed by Drill',
      'The Confounding Census by Its Kinds',
      'The Hill Criteria Held Straight',
    ],
  },
  {
    number: 3,
    slug: 'screening-biostatistics',
    title: 'The Screening-and-Biostatistics Register',
    summary:
      'The test-and-numbers craft: the screening\u2019s principles (the Wilson-and-criteria named at survey depth, the lead-time honesty with the length-bias register priced straight); the test\u2019s arithmetic (the sensitivity\u2019s specificity fixed by drill with the PPV-NPV crafts — the prevalence\u2019s-consequence on the PPV held straight, the ROC named at survey depth); the biostatistics\u2019 core (the data-and-types census, the central\u2019s dispersion crafts, the normal\u2019s SD honesty, the sampling-and-frame craft with the error\u2019s arithmetic, the significance\u2019s p-value honesty held straight — the null\u2019s-against-alternative frame, the CI-and-interval register named); and the demography\u2019s register (the census\u2019s rate crafts with the life-table honesty named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Lead-Time Honesty Priced Straight',
      'The Sensitivity-PPV Arithmetic Fixed by Drill',
      'The p-Value Honesty Held Straight',
      'The Life-Table Honesty Named',
    ],
  },
  {
    number: 4,
    slug: 'communicable-nutrition',
    title: 'The Communicable-and-Nutrition Registers',
    summary:
      'The population\u2019s disease map: the outbreak\u2019s craft (the investigation\u2019s seven-step arc with the epi-curve\u2019s honesty — the source-and-propagated division named, the isolation-and-quarantine register); the vaccine\u2019s register (the coverage\u2019s herd arithmetic with the cold-chain craft, the AEFI\u2019s honesty with the surveillance named); the national-and-program register (the UIP\u2019s schedule honesty with the polio\u2019s endgame arc priced straight, the NTEP-and-DOTs register cross-referenced, the IDSP\u2019s surveillance honesty); the nutrition\u2019s register (the malnutrition\u2019s census with the anthropometric crafts — the stunting-and-wasting division fixed by drill, the ICDS-and-midday named, the micronutrient-and-deficiency registers with the IDD-and-iodised receipt); and the obesity-and-Registers named at survey depth.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Seven-Step Arc Held',
      'The Epi-Curve\u2019s Source Division Named',
      'The Anthro Fixed by Drill',
      'The Iodised Receipt Named',
    ],
  },
  {
    number: 5,
    slug: 'environment-occupation',
    title: 'The Environment-and-Occupation Register',
    summary:
      'The living-and-working map: the water\u2019s craft (the purity\u2019s honesty with the standard\u2019s arithmetic, the purification\u2019s census — the chlorination-and-PPM craft with the filtration register); the air\u2019s register (the pollutant\u2019s census with the indoor honesty — the and-smoke-and-women register priced straight, the ambient\u2019s-standard named); the waste\u2019s craft (the sewage\u2019s treatment arc with the biomedical division cross-referenced from medical-microbiology); the occupation\u2019s census (the dust-and-pneumoconiosis register with the asbestosis\u2019s mesothelioma honesty, the lead-and-arsenic registers, the ergonomic crafts named, the compensation-and-honesty named); and the climate-and-health register named at survey depth (the one-health\u2019s frame held).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Chlorination Arithmetic Named',
      'The Indoor Honesty Priced Straight',
      'The Pneumoconiosis Register Held',
      'The One-Health Frame Held',
    ],
  },
  {
    number: 6,
    slug: 'mch-health-system',
    title: 'The MCH-and-Health-System Registers',
    summary:
      'The mother-and-system map: the maternal\u2019s craft (the ANC\u2019s register with the iron\u2019s calcium honesty, the skilled-birth arc with the institutional\u2019s honesty — the JSY named, the MMR-and-audit register); the child\u2019s register (the newborn\u2019s craft with the kangaroo\u2019s receipt, the immunisation\u2019s schedule cross-referenced, the IMR-and-NMR division); the adolescent-and-RKH register named at survey depth; the health-system\u2019s register (the primary\u2019s first honesty with the PHC\u2019s CHC architecture — the Indian\u2019s three-tier craft, the Ayushman\u2019s PM-JAY honesty named, the workforce census with the density\u2019s arithmetic); the and-international-and-register named (the Alma-Ata\u2019s SDG frame with the UHC\u2019s honesty); and the disaster-and-response register named at survey depth.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Skilled-Birth Arc Held',
      'The Three-Tier Architecture Named',
      'The UHC Honesty Held',
      'The SDG Frame Named',
    ],
  },
]

export const communityMedicine: Book = {
  id: 'community-medicine',
  title: 'Community Medicine',
  subtitle: 'The health of populations — epidemiology, prevention and the health-system craft',
  discipline: 'medical-sciences',
  level: 'Undergraduate MBBS core (the public-health register)',
  description: 'The population\u2019s discipline: the concept register first (the health\u2019s disease definitions with the WHO honesty, the iceberg analogy with the subclinical-and-spectrum craft); the epidemiology\u2019s craft in full (the study-and-design census — the descriptive-and-analytical division with the cohort\u2019s case-control honesty, the 2x2 arithmetic with the measures-of-association craft — the RR\u2019s OR-and-AR division fixed by drill, the confounding-and-bias census, the screening\u2019s test honesty with the sensitivity\u2019s specificity-and-PPV arithmetic priced straight); the biostatistics\u2019 core (the summary census with the normal\u2019s honesty, the sampling\u2019s significance crafts with the p-value\u2019s meaning held straight); the communicable-and-epidemiology register (the outbreak-and-investigation craft with the epi-curve honesty, the vaccine\u2019s coverage arithmetic, the national-program register with the polio\u2019s measles arcs); the NCD-and-surveillance register (the surveillance-and-types census with the IDSP\u2019s India honesty); the environment-and-occupation register (the air\u2019s water crafts with the purification\u2019s arithmetic, the occupational-health census with the lead-and-silica registers); the nutrition-and-public register (the malnutrition\u2019s survey crafts with the ICDS named); the maternal-and-child register (the RCH\u2019s indicator arithmetic with the MMR-IMR crafts); the health-system-and-policy register (the primary\u2019s honesty with the Indian\u2019s NRHM-and-Ayushman crafts named); and the disaster-and-response register named.',
  status: 'planned',
  accent: ['#0f766e', '#042f2e'],
  chapters,
}

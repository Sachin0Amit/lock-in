import type { Book, Chapter } from '../../../types'

/**
 * Internal Medicine — the eleventh book of the Medical Sciences shelf.
 *
 * STATUS: PLANNED (Medical Sciences full-shelf planning pass, 2026-11-16) — 7 chapters /
 * 31 planned lessons, zero written. Lesson ids will use the `intm-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Internal Medicine owns the adult clinical register. The mechanism to pathology-and-medical-physiology (the clinic here); the drug’s register to pharmacology (the regimen’s cross-referenced); the organisms to medical-microbiology; the surgery to general-surgery; the paediatric to pediatrics; the NEET-and-FMGE lines are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Davidson’s Principles and Practice of Medicine named as the university pole (the system’s register).
 * - Harrison’s named as the depth co-pole.
 * - The Indian-program registers named at survey depth with the NEET-and-FMGE lines as the school ladder.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'approach-patient',
    title: 'The Approach to the Patient',
    summary:
      'The physician\u2019s craft: the history\u2019s arc (the presenting complaint\u2019s SOCRATES honesty for the pain, the systems review with the red-flag\u2019s census, the drug-and-family-and-social registers — the occupational-and-honesty named); the examination\u2019s craft (the general survey with the hands-and-face honesty — the signs-on-the surface named, the system\u2019s examination arc with the auscultation\u2019s percussion crafts); the reasoning\u2019s register (the differential-and-construct craft with the common-first honesty — the Sutton-and-law named, the investigation\u2019s tiered honesty with the pre-test probability named); and the communication\u2019s craft (the breaking-bad-news register with the consent honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The SOCRATES Honesty Held',
      'The Signs on the Surface Named',
      'The Common-First Honesty with the Tiered Craft',
      'The Breaking-Bad-News Register Named',
    
      'Semester IV: Communication and Educational Technology',
      'Critical Analysis and Reasoning Skills (CARS)',
      'Scientific Inquiry and Reasoning Skills: Scientific Reasoning and Problem Solving'
    ],
  },
  {
    number: 2,
    slug: 'cardiovascular-medicine',
    title: 'The Cardiovascular Medicine',
    summary:
      'The pump\u2019s clinic: the chest-pain\u2019s map (the ACS\u2019s division with the troponin\u2019s calendar cross-referenced — the ECG\u2019s ST honesty with the thrombolysis-and-window craft priced straight, the stable-and-angina register); the heart-failure\u2019s craft (the class\u2019s NYHA arithmetic with the management\u2019s four-pillar register — the RAAS blockade honesty cross-referenced to pharmacology); the hypertension\u2019s register (the classification\u2019s target honesty with the secondary-and-screen census named); the arrhythmia\u2019s register (the AF\u2019s rate-rhythm-anticoagulation craft with the CHA2DS2-and-arithmetic named); the valvular-and-infective registers (the murmur-and-timing craft with the endocarditis\u2019s Duke honesty named); and the and-pericardial register named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Window Craft Priced Straight',
      'The Four-Pillar Register Held',
      'The CHA2DS2 Arithmetic Named',
      'The Murmur Timing Craft Fixed by Drill',
    ],
  },
  {
    number: 3,
    slug: 'respiratory-medicine',
    title: 'The Respiratory Medicine',
    summary:
      'The breath\u2019s clinic: the dyspnoea\u2019s map (the cause\u2019s census with the- obstructive-and-restrictive division — the spirometry\u2019s-honesty with the reversibility\u2019s craft); the asthma\u2019s craft (the control-and-stepwise register with the inhaler\u2019s technique honesty, the exacerbation-and-steroid craft); the COPD\u2019s craft (the GOLD\u2019s staging honesty with the oxygen-and-target register — the CO2 retention named); the TB\u2019s craft (the DOTs cross-referenced with the MDR honesty); the pleural-and-pneumonia registers (the effusion\u2019s transudate-exudate honesty with the Light-and-criteria named, the CAP\u2019s curb65 arithmetic); the ILD-and-occupation register named (the asbestosis cross-referenced); and the lung-cancer\u2019s staging honesty named at survey depth.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Reversibility Craft Held',
      'The CO2 Retention Named',
      'The Light Criteria Named',
      'The CURB65 Arithmetic Fixed by Drill',
    ],
  },
  {
    number: 4,
    slug: 'gi-hepatology',
    title: 'The Gastroenterology-and-Hepatology',
    summary:
      'The gut\u2019s liver clinic: the abdominal-pain\u2019s map (the quadrant-and-cause census with the surgical\u2019s red flags cross-referenced to general-surgery); the jaundice\u2019s craft (the prehepatic\u2019s hepatic-and-posthepatic division with the LFT reading cross-referenced); the cirrhosis\u2019s map (the complication\u2019s craft — the variceal\u2019s band honesty, the ascites\u2019-and-SAAG arithmetic named, the encephalopathy\u2019s grades); the GI-bleed\u2019s register (the variceal\u2019s-against-ulcer division with the endoscopy\u2019s craft); the IBD\u2019s division (the Crohn\u2019s-against-UC honesty with the topical register); the malabsorption-and-celiac craft named; the hepatitis\u2019s chronic map cross-referenced; and the colorectal-and-screening register named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three-Jaundice Division Fixed Once',
      'The SAAG Arithmetic Named',
      'The Band Honesty Held',
      'The IBD Division by Its Depth',
    ],
  },
  {
    number: 5,
    slug: 'nephro-endocrine',
    title: 'The Nephrology-and-Endocrine Register',
    summary:
      'The kidney\u2019s hormone clinic: the CKD\u2019s craft (the eGFR\u2019s staging arithmetic cross-referenced with the complication\u2019s anemia-bone register, the dialysis\u2019s division with the transplant-and-India register named); the AKI\u2019s division (the pre-renal\u2019s intrinsic\u2019s postrenal honesty with the FENa named); the nephrotic\u2019s nephritic map (the syndrome\u2019s division fixed by the urine\u2019s reading — the protein-and-cast honesty with the biopsy-and-craft named); the diabetes\u2019s craft (the complication\u2019s map with the control-and-target register — the HbA1c\u2019s honesty cross-referenced with the foot-and-eye crafts); the thyroid\u2019s craft (the hypo\u2019s-against-hyper division with the TSH reading\u2019s honesty); the adrenal-and-cushing register named; and the osteoporosis-and-DXA register named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Staging Arithmetic Cross-Referenced',
      'The Three-AKI Division Fixed Once',
      'The Syndrome Division by the Urine\u2019s Reading',
      'The TSH Reading Honesty Held',
    ],
  },
  {
    number: 6,
    slug: 'haematology-neurology',
    title: 'The Haematology-and-Neurology Registers',
    summary:
      'The blood\u2019s brain clinic: the anaemia-and-classification craft (the mechanism\u2019s division — the microcytic-and-IDA receipt with the cause map, the megaloblastic\u2019s B12-folate arc cross-referenced, the hemolytic\u2019s Peripheral honesty with the reticulocyte receipt); the leukaemia-and-lymphoma registers named (the acute-and-chronic division with the FAB honesty at survey depth); the transfusion\u2019s craft (the component\u2019s division with the reaction\u2019s census); the neurology\u2019s arc (the stroke\u2019s time honesty with the thrombolysis window priced straight — the FAST craft named, the seizure-and-epilepsy division with the classification honesty, the headache\u2019s red-flag census with the SNOOP named at survey depth, the Parkinson-and-tremor division, the GBS\u2019s ascending honesty); and the meningitis\u2019s craft with the LP reading named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Classification by the Mechanism\u2019s Division',
      'The Reticulocyte Receipt Held',
      'The FAST Craft Priced Straight',
      'The LP Reading Named',
      'Psychiatry',
      'Dermatology and STD',
    ],
  },
  {
    number: 7,
    slug: 'rheum-critical-care',
    title: 'The Rheumatology-and-Critical-Care Registers',
    summary:
      'The joint\u2019s ICU clinic: the rheumatology\u2019s register (the RA\u2019s craft with the ACPA cross-referenced — the DMARD-and-tier register with the biologic\u2019s named, the SLE\u2019s criteria cross-referenced from clinical-immunology with the flare\u2019s craft, the gout-and-acute register with the crystal\u2019s honesty); the vasculitis register named at survey depth; the critical-care\u2019s craft (the ABCDE\u2019s arc with the airway-and-craft named, the sepsis\u2019s qSOFA arithmetic with the bundle register, the shock\u2019s division cross-referenced from physiology, the ventilation-and-mode census at survey depth with the ARDS register named); and the palliative-and-register named (the honest end-of-life craft with the pain\u2019s WHO ladder held straight).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The DMARD Tier Register Named',
      'The qSOFA Arithmetic Fixed by Drill',
      'The Shock Division Cross-Referenced',
      'The WHO Ladder Held Straight',
      'Physiological Adaptation and Clinical Instability',
    ],
  },
]

export const internalMedicine: Book = {
  id: 'internal-medicine',
  title: 'Internal Medicine',
  subtitle: 'The physician\u2019s register — diagnosis by systems and the medicine of the whole adult',
  discipline: 'medical-sciences',
  level: 'Undergraduate MBBS core to postgraduate doorway (the Davidson register)',
  description: 'The physician\u2019s discipline: the approach to the patient first (the history-and-examination craft with the differential\u2019s diagnostic reasoning honesty); the cardiovascular medicine (the chest-pain\u2019s cause map with the ACS\u2019s troponin calendar, the heart-failure\u2019s class arithmetic with the management-and-class register, the hypertension\u2019s target honesty, the valvular-and-infective registers previewed); the respiratory medicine (the dyspnoea\u2019s cause map with the asthma-and-COPD division — the spirometry\u2019s reversibility honesty with the inhaler-and-stepwise register; the TB-and-DOTs craft cross-referenced); the gastroenterology-and-hepatology register (the jaundice-and-approach craft, the cirrhosis\u2019s complication map with the variceal honesty, the IBD-and-division named); the nephrology-and-endocrine register (the CKD\u2019s staging arithmetic with the dialysis-and-transplant named, the diabetes\u2019s complication map with the control-and-target register, the thyroid\u2019s dysfunction crafts); the haematology\u2019s register (the anaemia-and-classification craft by the mechanism — the microcytic-and-megaloblastic division with the transfusion honesty); the neurology\u2019s register (the stroke\u2019s time honesty with the imaging\u2019s thrombolysis window priced straight, the seizure-and-epilepsy division, the headache\u2019s red-flag census); the infectious\u2019s clinical map cross-referenced; the rheumatology-and-register named (the DMARD\u2019s craft); and the critical-care register named (the sepsis\u2019s organ arithmetic with the ABCDE craft).',
  status: 'planned',
  accent: ['#b91c1c', '#450a0a'],
  chapters,
}

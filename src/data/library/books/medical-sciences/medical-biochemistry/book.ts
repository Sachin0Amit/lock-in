import type { Book, Chapter } from '../../../types'

/**
 * Medical Biochemistry — the third book of the Medical Sciences shelf.
 *
 * STATUS: PLANNED (Medical Sciences full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 35 planned lessons, zero written. Lesson ids will use the `mchem-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Medical Biochemistry owns the clinical register of the patient’s chemistry. The general biomolecule chemistry belongs to the chemistry shelf’s biochemistry book (the sibling views — the general-and-structural there, the clinical-and-diagnostic here); the physiology-and-systems register to medical-physiology; the metabolic disease management to internal-medicine; the NEET-and-FMGE lines are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Harper’s Illustrated Biochemistry named as the university pole (the clinical register).
 * - The NCERT class 11-12 biomolecules chapters as the school ladder (the NEET register).
 * - The chemistry shelf’s biochemistry book cross-referenced as the general pole (the sibling view).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'water-acid-base',
    title: 'The Water-and-Acid-Base Register',
    summary:
      'The patient\u2019s fluids: the water\u2019s electrolyte arithmetic (the compartment census cross-referenced from physiology with the sodium\u2019s potassium\u2019s clinical honesty — the hyponatraemia\u2019s hyperkalaemia\u2019s ECG consequences named); the acid-and-base craft (the buffer\u2019s bicarbonate honesty, the compensation rules with the four primary disorders read by the numbers — the ABG\u2019s panel fixed by drill); the replacement\u2019s correction arithmetic (the and-fluid therapy-and-register named at survey depth with the osmolality\u2019s honesty); and the clinical craft — the numbers read as the patient\u2019s chemistry rather than as abstractions.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Compartment Census with the Clinical Honesty',
      'The ABG Panel Fixed by Drill',
      'The Correction Arithmetic Named',
      'The Numbers as the Patient\u2019s Chemistry',
    ],
  },
  {
    number: 2,
    slug: 'plasma-enzymes',
    title: 'The Plasma Proteins and the Enzyme Diagnosis',
    summary:
      'The diagnostic register: the plasma proteins\u2019 census (the albumin\u2019s globulin arithmetic with the A-G ratio\u2019s honesty, the acute-phase-and-CRP register); the enzyme-diagnosis craft (the plasma\u2019s isoenzyme honesty — the CK-MB\u2019s LDH isoenzymes\u2019 time-courses priced straight as the MI\u2019s biochemical calendar; the AST-and-ALT\u2019s hepatocellular map, the alkaline-phosphatase\u2019s GGT cholestatic map, the amylase\u2019s lipase pancreatic map); the tumour-marker register named at survey depth (the PSA\u2019s CA honesty with the specificity\u2019s caveat priced straight); and the diagnostic craft — the panel\u2019s reading as the organ\u2019s confession held honestly (the sensitivity\u2019s specificity arithmetic previewed for the community-medicine book\u2019s-own depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The A-G Ratio and the Acute-Phase Register',
      'The Isoenzymes\u2019 Calendar Priced Straight',
      'The Organ Maps by Their Enzymes',
      'The Panel as the Organ\u2019s Confession',
    ],
  },
  {
    number: 3,
    slug: 'carbohydrate-clinical',
    title: 'The Carbohydrate Register in Disease',
    summary:
      'The glucose register: the metabolism\u2019s clinical arc (the insulin\u2019s glucagon dial cross-referenced from physiology — the diabetes register owned here: the type-1-and-2 honesty with the ketoacidosis\u2019s hyperosmolar consequences priced straight); the diagnosis\u2019s arithmetic (the fasting\u2019s random-and-GTT crafts, the HbA1c\u2019s three-month honesty — the glycation receipt); the complications\u2019 biochemical basis named (the AGE\u2019s polyol-and-oxidative registers at survey depth); the hypoglycaemia-and-insulinoma register named; and the inborn-errors\u2019 preview (the galactosaemia\u2019s fructose honesty named with the storage-diseases register previewed for the paediatric book).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Dial\u2019s Consequences Priced Straight',
      'The HbA1c\u2019s Three-Month Honesty',
      'The Complications\u2019 Biochemical Basis Named',
      'The Inborn-Errors Preview Named',
    ],
  },
  {
    number: 4,
    slug: 'lipid-clinical',
    title: 'The Lipid Register in Disease',
    summary:
      'The cholesterol register: the lipoprotein-and-fractionation craft (the chylomicron\u2019s-VLDL-LDL-HDL arc with the apolipoprotein honesty — the receptor\u2019s-LDL craft with the familial-hypercholesterolaemia receipt priced straight); the atherosclerosis register (the foam-cell\u2019s oxidation arc named at survey depth with the risk arithmetic previewed); the fatty-acid-and-ketone register (the starvation\u2019s diabetic-ketosis honesty with the breath-and-fruity receipt named); the obesity\u2019s metabolic-syndrome arithmetic named (the visceral honesty at survey depth); and the dyslipidaemia\u2019s panel (the lipid-profile\u2019s reading with the and-treatment preview cross-referenced to pharmacology).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Fractionation Craft by Its Apolipoproteins',
      'The Familial Receipt Priced Straight',
      'The Ketosis Registers Named',
      'The Panel\u2019s Reading with the Preview',
    ],
  },
  {
    number: 5,
    slug: 'nitrogen-urea',
    title: 'The Nitrogen-and-Urea Register',
    summary:
      'The protein\u2019s ammonia arc: the amino-acid-and-transamination craft (the urea cycle held as the liver\u2019s detox engine — the hyperammonaemia\u2019s encephalopathy consequence with the and-genetic\u2019s-citrullinaemia preview named); the phenylketonuria-and-screening receipt (the PKU\u2019s newborn-screen honesty priced straight as the public-health craft); the methaemoglobin\u2019s haemoglobinopathies preview (the and-sickle\u2019s HbS honesty named with the pathology book owning the register); the creatinine\u2019s urea clearance (the and-RFT arithmetic cross-referenced); the purine-and-pyrimidine register (the gout\u2019s urate honesty with the Lesch-Nyhan preview); and the one-carbon register named (the folate-and-B12 craft with the megaloblastic preview).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Urea Engine and Its Consequence',
      'The PKU Screening Receipt Priced Straight',
      'The Gout\u2019s Urate Honesty',
      'The One-Carbon Craft Named',
      'Semester Iv: Genetics',
    ],
  },
  {
    number: 6,
    slug: 'organ-function',
    title: 'The Organ-Function Register',
    summary:
      'The LFT\u2019s RFT\u2019s arithmetic: the liver\u2019s confession (the bilirubin\u2019s jaundice arc — the prehepatic\u2019s hepatic\u2019s posthepatic honesty fixed by the panel\u2019s urine reading; the albumin\u2019s clotting-factor-and-synthetic register; the and-Child-Pugh craft named at survey depth); the kidney\u2019s confession (the urea\u2019s creatinine arithmetic with the and-GFR estimation — the eGFR\u2019s honesty priced straight; the and-proteinuria\u2019s cast reading previewed); the cardiac\u2019s confession (the CK-MB\u2019s troponin calendar cross-referenced); the and-thyroid\u2019s confession (the TSH\u2019s T4\u2019s feedback honesty with the primary-and-secondary reading); and the integration craft — the panels read together as the patient\u2019s story.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Jaundice Fixed by the Panel-and-Urine',
      'The eGFR Honesty Priced Straight',
      'The Calendar Cross-Referenced',
      'The Panels Read as the Story',
    ],
  },
  {
    number: 7,
    slug: 'vitamins-minerals-molecular',
    title: 'The Vitamins, Minerals-and-Molecular Registers',
    summary:
      'The nutrient-and-tool registers: the vitamin census (the fat-soluble\u2019s A-D-E-K and the water-soluble\u2019s B-complex-and-C crafts with the deficiency\u2019s excess honesty each — the scurvy\u2019s beri\u2019s pellagra\u2019s rickets\u2019 registers priced straight; the B12\u2019s folate megaloblastic arc with the intrinsic-factor receipt); the mineral census (the iron\u2019s absorption arithmetic with the anaemia\u2019s basis, the calcium-and-phosphorus register cross-referenced, the iodine\u2019s zinc honesty); the molecular-diagnostics register (the PCR\u2019s probe exploitation cross-referenced to biotechnology — the genetic-test\u2019s newborn-screen crafts with the and-ethics named); and the oncometabolism preview named (the Warburg\u2019s honesty at survey depth with the pathology book owning the register).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Deficiency Registers Priced Straight',
      'The Iron\u2019s Arithmetic Held',
      'The Molecular Crafts Cross-Referenced',
      'The Warburg Preview Named',
    ],
  },
  {
    number: 8,
    slug: 'integration-doorway',
    title: 'The Integration Craft and the Doorway',
    summary:
      'The metabolic map held as one physiology: the fed state\u2019s walk (the insulin\u2019s storage arithmetic); the starved state\u2019s walk (the glucagon\u2019s mobilisation crafts with the ketone\u2019s brain honesty — the three-day\u2019s adaptation arc); the exercise state named (the and-recruitment of the three fuel registers); the stress-and-injury state named (the cortisol\u2019s catabolism honesty with the and-acute-phase response); and the doorway — to internal-medicine for the disease\u2019s management, to the chemistry shelf\u2019s biochemistry for the general machinery beneath, to genetics for the inborn-error\u2019s register; the clinical biochemistry held honestly as the bridge: the chemistry read at the bedside, the numbers made into the patient\u2019s story.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Fed State Walked',
      'The Starved State\u2019s Adaptation Arc',
      'The Stress State Named',
      'The Bridge Held Honestly',
      'Applied Nutrition and Dietetics',
      'The Chemical Processes of Life',
      'Semester I: Biochemistry',
      'Veterinary Clinical Medicine (including Clinical Biochemistry And',
    ],
  },
]

export const medicalBiochemistry: Book = {
  id: 'medical-biochemistry',
  title: 'Medical Biochemistry',
  subtitle: 'The chemistry of the patient — metabolism in disease, enzymes in diagnosis and the organ-function arithmetic',
  discipline: 'medical-sciences',
  level: 'Undergraduate MBBS core (the clinical register; the general register owned by the chemistry shelf)',
  description: 'The biochemical discipline in its clinical register: the general register opened (the water-and-electrolyte arithmetic with the acid-and-base craft — the clinical correlate to the physiology book); the structural biochemistry\u2019s clinical side (the plasma proteins\u2019-and-enzyme-diagnosis register — the isoenzymes\u2019 honesty with the CK-and-LDH-and-AST-and-ALT panels priced straight by their organ maps); the metabolism-in-disease arc (the carbohydrate\u2019s glucose arithmetic with the diabetes register — the HbA1c\u2019s urine honesty; the lipid-and-cholesterol craft with the atherosclerosis register and the lipoprotein fractionation; the nitrogen\u2019s urea cycle with the hepatic-and-renal honesty — the ammonia\u2019s encephalopathy consequence); the liver\u2019s organ-function register (the LFT\u2019s RFT\u2019s arithmetic — the bilirubin\u2019s albumin\u2019s enzyme panels read as the organ\u2019s confession); the molecular-biology-and-diagnostics register (the PCR\u2019s probe exploitation cross-referenced to biotechnology with the genetic-test honesty); the nutrient registers (the vitamins\u2019-and-mineral arithmetic with the deficiency\u2019s excess honesty — the fat-and-water-soluble division); the cancer-biochemistry preview (the oncometabolism named at survey depth); and the integration craft — the metabolic map held as one physiology (the fed\u2019s starved\u2019s exercise states walked once).',
  status: 'planned',
  accent: ['#be123c', '#4c0519'],
  chapters,
}

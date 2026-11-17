import type { Book, Chapter } from '../../../types'

/**
 * Pathology — the fifth book of the Medical Sciences shelf.
 *
 * STATUS: PLANNED (Medical Sciences full-shelf planning pass, 2026-11-16) — 7 chapters /
 * 29 planned lessons, zero written. Lesson ids will use the `path-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Pathology owns the disease-mechanism register. The general-cell-and-tissue machinery belongs to the biology shelf’s books (cross-referenced — the sibling views); the micro-organisms to medical-microbiology; the immune mechanism to clinical-immunology; the systemic-clinical management to internal-medicine and the specialty books (the mechanism here, the management there); the NEET-and-FMGE lines are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Robbins and Cotran’s Pathologic Basis of Disease — the unit arc read this pass (the TOC retrieved: the cell-as-a-unit-of-health-and-disease through the organ-system units) as the spine.
 * - The Rubin’s Kumar co-poles named.
 * - The NCERT class 12 human-health-and-disease chapter as the school ladder (the NEET register).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'cell-injury',
    title: 'The Cell Injury Register',
    summary:
      'The mechanism\u2019s foundation: the injury-and-adaptation census (the atrophy, hypertrophy, hyperplasia and metaplasia crafts — the adaptation\u2019s stress honesty); the reversible\u2019s irreversible arc (the hypoxic\u2019s mitochondrial mechanism with the membrane\u2019s irreversibility point named); the necrosis\u2019s census (the coagulative-and-infarct receipt, the liquefactive\u2019s brain honesty, the caseous-and-TB craft, the fat-and-enzymatic registers, the fibrinoid named) fixed by drill with the gangrene register; the apoptosis craft (the programmed\u2019s caspase mechanism with the bcl-2 honesty — the physiological-and-pathological division); the intracellular accumulations named (the fatty-change-and-pigment registers); and the calcification-and-honesty named (the dystrophic-against-metastatic distinction).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Adaptation Census Fixed by Drill',
      'The Irreversibility Point Named',
      'The Necrosis Types by Their Organs',
      'The Caspase Craft Named',
    ],
  },
  {
    number: 2,
    slug: 'inflammation-repair',
    title: 'The Inflammation and the Repair',
    summary:
      'The response register: the acute inflammation (the vascular\u2019s cardinal-sign craft with the mediator\u2019s histamine-to-cytokine arc, the leukocyte\u2019s margination-emigration register); the suppurative craft (the abscess\u2019s pus honesty with the outcome\u2019s census — the resolution, abscess and chronic-fate arithmetic); the chronic inflammation (the granulomatous craft — the caseating\u2019s TB against the non-caseating\u2019s sarcoid honesty with the foreign-body register); the repair-and-healing craft (the primary\u2019s secondary union honesty with the granulation-and-contraction register, the collagen\u2019s scar arithmetic with the wound\u2019s time course); and the clinically-relevant honesty (the chronic\u2019s fibrosis consequence — the cirrhosis-and-pulmonary registers previewed).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Cardinal-Sign Mechanism Held',
      'The Outcome Arithmetic Priced',
      'The Granulomatous Craft by Its Cases',
      'The Scar Arithmetic Named',
    ],
  },
  {
    number: 3,
    slug: 'hemodynamic-disorders',
    title: 'The Haemodynamic Disorders',
    summary:
      'The flow register: the oedema craft (the Starling mechanism with the four-and-transudate-exudate honesty — the protein\u2019s specific-gravity arithmetic); the thrombosis register (the Virchow triad fixed by drill — the endothelial\u2019s stasis-and-hypercoagulability crafts with the arterial-against-venous distinction); the embolism\u2019s census (the pulmonary\u2019s systemic honesty with the fat\u2019s air-and-amniotic registers named); the infarction\u2019s craft (the red\u2019s white honesty with the organ\u2019s-dual-supply consequence — the lung\u2019s liver\u2019s-sparing named); the shock register (the cardiogenic-and-hypovolaemic-and-septic division with the compensation\u2019s decompensation arc); and the DIC preview named (the consumption honesty with the obstetric register).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Starling Mechanism Held',
      'The Virchow Triad Fixed by Drill',
      'The Dual-Supply Consequence Named',
      'The Shock Arc Priced Straight',
    ],
  },
  {
    number: 4,
    slug: 'genetic-immune-pathology',
    title: 'The Genetic-and-Immune Pathology',
    summary:
      'The inherited-and-immune registers: the genetic\u2019s developmental preview (the mendelian-and-multifactorial division with the trinucleotide\u2019s mitochondrial crafts named — the full register cross-referenced to genetics with the clinic\u2019s-own consequence here: the cystic-fibrosis\u2019s haemoglobinopathy previews priced straight); the immune\u2019s-pathology register (the four hypersensitivity mechanisms fixed once — the anaphylactic-and-IgE craft, the cytotoxic\u2019s transfusion honesty, the immune-complex\u2019s deposition arithmetic, the cell-mediated\u2019s TB honesty; the autoimmunity\u2019s tolerance-loss mechanisms previewed with the clinical-immunology cross-reference; the immunodeficiency\u2019s HIV arc previewed with the medical-microbiology cross-reference); and the transplant-pathology named (the rejection-and-graft registers at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Consequence Held for the Clinic',
      'The Four Hypersensitivity Mechanisms Fixed Once',
      'The Tolerance-Loss Preview Named',
      'The Transplant Registers Named',
      'Semester I: Microbiology',
    ],
  },
  {
    number: 5,
    slug: 'neoplasia',
    title: 'The Neoplasia Register',
    summary:
      'The tumor register in full: the nomenclature\u2019s craft (the benign-against-malignant distinction by its eight criteria — the differentiation, rate, invasion, metastasis and the rest fixed by drill); the carcinogenesis arc (the chemical\u2019s initiation-promotion honesty, the viral-and-integrated register — the HPV\u2019s E6-E7 craft priced straight, the radiation\u2019s DNA consequence, the oncogene\u2019s suppressor arithmetic — the Ras\u2019s p53 receipts with the multi-step\u2019s clonal honesty); the spread craft (the local\u2019s lymphatic-and-haematogenous registers with the organ\u2019s-preference honesty — the bone\u2019s liver receipts named); the grading-and-staging craft (the TNM\u2019s clinical consequence); the and-paraneoplastic register named (the endocrine\u2019s lambert-eaton crafts); and the tumor-markers\u2019 honesty priced straight (the screening\u2019s specificity caveat cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Eight Criteria Fixed by Drill',
      'The Multi-Step Clonal Honesty Held',
      'The Spread\u2019s Organ Preferences Named',
      'The Marker Honesty Priced Straight',
    ],
  },
  {
    number: 6,
    slug: 'infectious-pathology',
    title: 'The Infectious-Disease Pathology',
    summary:
      'The infection-and-tissue register: the bacterial\u2019s tissue consequence (the pyogenic-and-granulomatous division cross-referenced from inflammation with the specific organisms\u2019 previews — the TB-and-caseous craft owned here for the tissue, the typhoid\u2019s Peyer honesty named, the syphilis-and-gumma register named); the viral\u2019s cell consequence (the cytopathic-and-inclusion craft — the Cowdry\u2019s Negri receipts named with the syncytium honesty); the fungal\u2019s parasitic previews named (the tissue-invasion registers); and the sepsis\u2019s multi-organ register previewed with the medical-microbiology book owning the organisms\u2019 register (the tissue\u2019s-answer owned here — the sibling views held straight).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Pyogenic-and-Granulomatous Division Held',
      'The Inclusion Receipts Named',
      'The Tissue-Answer Owned Here',
      'The Sibling Views Held Straight',
    ],
  },
  {
    number: 7,
    slug: 'systemic-pathology',
    title: 'The Systemic Pathology Registers',
    summary:
      'The organ-system previews (the management owned by the clinical books, the mechanism\u2019s-owned-here): the cardiovascular (the atherosclerosis\u2019s plaque arc with the MI\u2019s evolution calendar — the first-week\u2019s consequent-month honesty, the valvular register previewed); the respiratory (the COPD-and-restrictive division named, the pneumonia\u2019s pattern preview); the GI-and-liver (the gastritis\u2019s ulcer arc with the H-pylori receipt named, the cirrhosis\u2019s portal-hypertension craft — the regeneration\u2019s nodule honesty); the renal (the nephrotic-and-nephritic division named — the glomerular preview); the haematological-and-lymphoid (the anaemia\u2019s leukaemia-and-lymphoma division previewed with the Hodgkin-and-craft named); the endocrine (the thyroid-and-diabetes registers previewed); the CNS (the stroke\u2019s demyelination previews); and the bones (the osteoporosis-and-pagets registers named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The MI Calendar Held',
      'The Cirrhosis Craft Named',
      'The Nephrotic-Nephritic Division Named',
      'The Previews Owned at Their Level',
    ],
  },
]

export const pathology: Book = {
  id: 'pathology',
  title: 'Pathology',
  subtitle: 'The mechanism of disease — cell injury, inflammation, neoplasia and the systemic registers',
  discipline: 'medical-sciences',
  level: 'Undergraduate MBBS core (the Robbins unit arc read this pass)',
  description: 'The disease-mechanism discipline by the Robbins arc: the cell-and-injury register (the reversible\u2019s irreversible honesty, the necrosis\u2019s apoptosis distinction with the morphological types fixed by drill); the inflammation-and-repair (the acute-and-vascular craft with the mediators, the chronic-and-granulomatous register, the healing\u2019s collagen arithmetic); the haemodynamic disorders (the thrombosis\u2019s Virchow triad, the embolism\u2019s infarction crafts, the oedema-and-shock registers); the genetic-and-developmental disease register previewed; the immune-pathology (the four hypersensitivities\u2019 mechanisms, the autoimmunity-and-transplant registers previewed); the neoplasia register in full (the nomenclature craft, the benign\u2019s malignant distinction by its eight criteria, the carcinogenesis\u2019s-chemical-and-viral arcs with the oncogene\u2019s suppressor honesty, the tumor-spread-and-staging craft with the TNM register, the paraneoplastic honesty named); the infectious-disease pathology (the bacterial\u2019s viral mechanisms previewed with the medical-microbiology cross-reference); and the systemic pathology registers (the cardiovascular-and-respiratory, the GI-and-liver-and-renal, the endocrine-and-reproductive, the haematological-and-lymphoid, the CNS-and-bones — each previewed for the clinical books\u2019-own depths with the mechanism\u2019s-owned-here honesty).',
  status: 'planned',
  accent: ['#991b1b', '#450a0a'],
  chapters,
}

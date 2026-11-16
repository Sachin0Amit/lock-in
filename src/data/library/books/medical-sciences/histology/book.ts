import type { Book, Chapter } from '../../../types'

/**
 * Histology — the fourth book of the Medical Sciences shelf.
 *
 * STATUS: PLANNED (Medical Sciences full-shelf planning pass, 2026-11-16) — 7 chapters /
 * 28 planned lessons, zero written. Lesson ids will use the `histo-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Histology owns the normal microanatomy register. The general tissue architecture belongs to the biology shelf’s animal-anatomy (the sibling views); the organ’s macro-architecture to anatomy; the diseased tissue to pathology (the normal here as its reference); the cell’s molecular machinery to molecular-biology; the NEET-and-FMGE lines are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Ross-and-Pawllina’s Histology: A Text and Atlas named as the university pole.
 * - Wheater’s Functional Histology named as the readable co-pole.
 * - The NCERT class 11 structural-organisation chapter as the school ladder (the NEET register).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'method-stains',
    title: 'The Method and the Stains',
    summary:
      'The craft register: the preparation\u2019s arc (the fixation\u2019s aldehyde honesty — the protein\u2019s lipid preservation, the dehydration\u2019s clearing-and-embedding craft, the section-and-ribbon register with the five-micron honesty); the staining\u2019s census (the H&E\u2019s basophil-and-acidophil craft — the nucleus\u2019s cytoplasm reading; the special stains\u2019 register — the PAS-and-carbohydrate craft, the Masson\u2019s collagen trichrome, the Perls\u2019-and-iron receipt, the Oil-Red-O-and-lipid honesty); the microscope\u2019s register (the resolution\u2019s magnification honesty with the condenser\u2019s craft); and the newer crafts named (the immunohistochemistry-and-antibody register with the fluorescence honesty at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Preparation Arc Held',
      'The Special Stains by Their Targets',
      'The Resolution Honesty Named',
      'The Immunohistochemistry Register Named',
    ],
  },
  {
    number: 2,
    slug: 'basic-tissues',
    title: 'The Basic Tissues Under the Microscope',
    summary:
      'The four-tissue register at the clinical depth: the epithelium (the surface\u2019s cuboidal-and-columnar crafts with the glandular census — the exocrine-and-endocrine division, the duct-and-acinus craft); the connective (the loose-and-dense register with the collagen\u2019s type honesty, the adipose\u2019s marrow crafts, the cartilage-and-lacunar register, the bone-and-osteonal craft with the remodelling honesty); the muscle (the skeletal\u2019s striation reading, the cardiac\u2019s intercalated honesty, the smooth-and-spindle register); the nerve (the neuron-and-Nissl craft, the peripheral nerve-and-myelin register); and the blood smear\u2019s reading (the and-RBC\u2019s morphology honesty with the differential\u2019s WBC atlas register previewed for the haematology door).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Epithelium\u2019s Glandular Census',
      'The Collagen\u2019s Type Honesty',
      'The Three Muscles by Their Slides',
      'The Smear\u2019s Reading Previewed',
    ],
  },
  {
    number: 3,
    slug: 'cardio-respiratory',
    title: 'The Cardiovascular-and-Respiratory Histology',
    summary:
      'The system slides: the heart-and-vessels register (the endocardium\u2019s myocardium layers, the atrial-natriuretic honesty named, the aorta\u2019s three-layer craft — the intima-media-adventitia with the elastic-and-muscular artery distinction); the vascular-and-sinusoid register (the capillary\u2019s three types by their wall honesty — the continuous, fenestrated and discontinuous crafts with the organ\u2019s-distribution consequence); the respiratory\u2019s arc (the trachea\u2019s C-ring craft, the bronchial-and-branching register, the respiratory\u2019s alveolar barrier — the type-one-and-type-two honesty with the surfactant lamellar receipt, the macrophage dust register named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three-Layer Aortic Craft',
      'The Capillary Types by Their Organs',
      'The Barrier Held with Its Cells',
      'The Surfactant Receipt Named',
    ],
  },
  {
    number: 4,
    slug: 'gi-glands',
    title: 'The GI-and-Glandular Histology',
    summary:
      'The digestive slides: the GI\u2019s arc (the oesophagus\u2019s non-keratinised honesty, the stomach\u2019s gastric pits with the parietal\u2019s chief crafts — the HCl-and-pepsin cells, the small intestine\u2019s villi-and-crypt register with the Paneth honesty, the colon-and-gland craft with the absorptive consequence); the liver-and-lobule craft (the hepatocyte-and-plate register, the sinusoid\u2019s Kupffer honesty, the portal-triad\u2019s reading with the bile-canaliculus craft); the pancreas (the acinar-and-islet register with the beta-and-alpha\u2019s-glucagon insulin honesty); the gallbladder-and-biliary craft named; and the salivary register (the serous\u2019s mucous crafts with the duct system).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Stomach\u2019s Cells by Their Secretions',
      'The Lobule\u2019s Triad Reading',
      'The Islet\u2019s Cells Named',
      'The Salivary Crafts Named',
    ],
  },
  {
    number: 5,
    slug: 'renal-endocrine',
    title: 'The Renal-and-Endocrine Histology',
    summary:
      'The kidney\u2019s hormone slides: the renal\u2019s arc (the cortex\u2019s medulla map, the corpuscle-and-Bowman craft — the podocyte\u2019s filtration barrier with the mesangial honesty, the proximal\u2019s brush-border receipt, the loop\u2019s thin honesty, the distal\u2019s macula-densa register with the JG cell\u2019s-renin craft); the endocrine\u2019s register (the thyroid-and-follicular craft with the C-cell honesty, the parathyroid-and-chief register, the adrenal\u2019s three-zone cortex — the GFR-honesty fixed by drill with the medulla-and-chromaffin craft, the pituitary\u2019s anterior-posterior census with the acidophil-and-basophil register); and the islet\u2019s cross reference held.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Filtration Barrier Held with Its Cells',
      'The Brush-Border Receipt',
      'The Three Zones Fixed by Drill',
      'The Pituitary Census by Its Stains',
    ],
  },
  {
    number: 6,
    slug: 'reproductive-lymphoid-oral',
    title: 'The Reproductive, Lymphoid-and-Oral Registers',
    summary:
      'The remaining slides: the reproductive\u2019s arc (the ovarian-and-follicular craft with the corpus-luteum-and-hormone receipt, the uterine\u2019s cycle histology — the proliferative\u2019s secretory reading, the testis-and-seminiferous register with the Sertoli-and-Leydig honesty, the prostate craft named); the lymphoid\u2019s register (the thymus\u2019s cortex-medulla craft with the Hassall honesty, the spleen\u2019s white-and-red pulp, the node\u2019s germinal centre, the MALT register named); the oral-and-special register (the tooth\u2019s enamel-dentine-pulp arc with the ameloblast-and-odontoblast honesty — the dentistry book\u2019s-own doorway); and the integument (the skin-and-layers craft with the melanocyte register named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Follicular-and-Corpus Crafts',
      'The Cycle\u2019s Reading Fixed',
      'The Lymphoid Census by Its Organs',
      'The Tooth\u2019s Arc Named for the Doorway',
    ],
  },
  {
    number: 7,
    slug: 'pathology-doorway',
    title: 'The Pathology Doorway',
    summary:
      'The normal held as the reference: the comparison\u2019s craft (the normal\u2019s metaplasia\u2019s dysplasia\u2019s arc — the reference that makes the abnormal readable, the irritation\u2019s consequence previewed); the drawer\u2019s register (the surgical-pathology\u2019s frozen-section craft named at survey depth); the and-artifact\u2019s honesty (the preparation\u2019s artifacts priced straight — the shrinkage-and-tearing registers that must not be read as disease); and the doorway — to pathology for the disease\u2019s register, to anatomy for the macro-architecture, to the biology shelf\u2019s animal-anatomy for the general view; the microanatomy held honestly as the microscope\u2019s grammar: the normal learned once, the abnormal read forever.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Metaplasia-and-Dysplasia Arc Previewed',
      'The Frozen-Section Craft Named',
      'The Artifact Honesty Priced Straight',
      'The Grammar Held Honestly',
    ],
  },
]

export const histology: Book = {
  id: 'histology',
  title: 'Histology',
  subtitle: 'The tissues under the microscope — the normal register that makes the abnormal readable',
  discipline: 'medical-sciences',
  level: 'Undergraduate MBBS core (the microscope\u2019s register)',
  description: 'The microanatomy discipline — the general tissue view is owned by the biology shelf\u2019s animal-anatomy book, cross-referenced as the sibling views: the method first (the tissue preparation\u2019s arc — the fixation, processing, sectioning and staining crafts with the H&E\u2019s special-stain honesty; the microscope-and-resolution register); the basic tissues in their clinical view (the epithelium\u2019s glandular crafts, the connective-and-collagen register, the cartilage-and-bone\u2019s blood smears, the muscle\u2019s nerve histology); the organ histology walked system-by-system (the cardiovascular-and-respiratory register — the heart\u2019s aorta\u2019s layers, the lung\u2019s-alveolar-and-blood barrier; the GI\u2019s glandular arc — the stomach\u2019s gastric pits, the small-intestine\u2019s villi, the liver-and-lobule craft with the sinusoid honesty, the pancreas-and-islet register; the renal\u2019s nephron histology with the juxtaglomerular craft; the endocrine\u2019s thyroid-and-adrenal registers; the reproductive histology with the ovarian\u2019s testicular cycle crafts; the lymphoid\u2019s spleen-and-thymus register); the oral-and-special histology (the tooth-and-enamel craft with the salivary register); and the pathology\u2019s doorway — the normal held as the reference standard that makes the abnormal readable.',
  status: 'planned',
  accent: ['#7c3aed', '#3b0764'],
  chapters,
}

import type { Book, Chapter } from '../../../types'

/**
 * Medical Physiology — the second book of the Medical Sciences shelf.
 *
 * STATUS: PLANNED (Medical Sciences full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 35 planned lessons, zero written. Lesson ids will use the `mphys-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Medical Physiology owns the human-clinical register of the machinery. The general-and-comparative register belongs to the biology shelf’s animal-physiology (the sibling views — the mechanism’s shared, the clinic here); the biochemistry beneath to medical-biochemistry; the pathology-in-disease to pathology; the pharmacology’s exploitation to pharmacology; the NEET-and-FMGE lines are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Guyton and Hall’s Textbook of Medical Physiology — the unit arc read this pass (the thirteen-unit TOC retrieved: Introduction-and-Cell / Membrane-Nerve-Muscle / the heart / circulation / respiration / the kidney-and-body-fluids / the blood / the GI / the endocrinology / the neurophysiology-and-special-senses / the sports-and-aviation-and-deep-sea physiology registers) as the spine.
 * - Ganong’s Review of Medical Physiology named as the revision co-pole.
 * - The NCERT class 11-12 human-physiology chapters as the school ladder (the NEET register).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'cell-transport-basis',
    title: 'The Cell and Transport Basis',
    summary:
      'The foundation register: the body\u2019s functional organisation (the internal-milieu honesty with the homeostasis craft priced as the discipline\u2019s frame); the cell membrane-and-transport census (the diffusion, the mediated-and-active registers with the sodium-potassium pump-and-battery receipt); the resting-and-action potential\u2019s preview (owned fully in the nerve chapter); the body-fluid compartments (the intra-and-extra-cellular arithmetic with the starling forces named — the one-third-and-two-thirds honesty fixed by drill); and the measurement crafts (the indicator-dilution honesty named at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Internal Milieu Held as the Frame',
      'The Transport Census with the Battery Receipt',
      'The Compartment Arithmetic Fixed by Drill',
      'The Dilution Honesty Named',
    ],
  },
  {
    number: 2,
    slug: 'excitable-neuromuscular',
    title: 'The Excitable Tissues',
    summary:
      'The nerve-and-muscle register: the resting potential\u2019s action potential craft (the ionic basis with the two refractories); the conduction\u2019s saltatory honesty; the synapse-and-neuromuscular junction (the acetylcholine-and-receptor craft with the myasthenia\u2019s anaesthetic honesty priced straight — the Lambert-Eaton distinction named); the skeletal muscle\u2019s excitation-contraction coupling (the crossbridge cycle with the calcium trigger); the twitch-and-tetanus arithmetic; and the muscle\u2019s fibre types (the red-and-white honesty with the denervation-atrophy register previewed).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ionic Basis Fixed by Drill',
      'The Junction\u2019s Craft and Its Clinical Honesty',
      'The Coupling Cycle Walked Slowly',
      'The Fibre Types Named',
    ],
  },
  {
    number: 3,
    slug: 'blood-haemostasis',
    title: 'The Blood and Haemostasis',
    summary:
      'The fluid tissue\u2019s register: the formed elements\u2019 census (the RBC\u2019s haemoglobin arithmetic with the erythropoietin craft, the platelets\u2019-and-WBC families with the differential\u2019s clinical reading); the haemostasis cascade (the primary platelet plug, the secondary coagulation cascade — the intrinsic-and-extrinsic honesty with the PT-and-aPTT reading, the fibrinolytic balance); the anticoagulants\u2019 physiological register (the natural craftrafts — the protein-C-and-antithrombin-and-heparin-precursor named); the blood groups (the ABO-and-Rh arithmetic with the transfusion-and-haemolytic-disease honesty — the crossmatch craft); and the anaemia\u2019s physiological basis previewed (the pathology book owning the register).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Formed-Element Census with the Differential\u2019s Reading',
      'The Cascade with the PT-and-aPTT Craft',
      'The Transfusion Arithmetic Priced Straight',
      'The Anaemia Preview Named',
    
      'Dermatology and Sexually Transmitted Diseases',
      'Physiological Integrity'
    ],
  },
  {
    number: 4,
    slug: 'cardiovascular',
    title: 'The Cardiovascular System',
    summary:
      'The pump-and-pipe register: the cardiac electrophysiology (the pacemaker\u2019s conduction-system craft — the SA-to-AV-to-bundle honesty, the ECG\u2019s waves-and-intervals read with the arrhythmia preview); the cardiac cycle (the phases with the output arithmetic — the stroke volume\u2019s rate determinants with the Frank-Starling receipt); the haemodynamics (the pressure-flow-and-resistance arithmetic with the Poiseuil honesty, the arterial pulse-and-pressure craft); the regulation (the baroreceptor-and-chemoreceptor reflexes, the autonomic\u2019s double lever); the capillary exchange-and-lymphatic return (the Starling forces with the oedema\u2019s four mechanisms named); and the special circulations (the coronary-and-cerebral-and-pulmonary-and-splanchnic registers named at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The ECG\u2019s Waves Read with the Preview',
      'The Frank-Starling Receipt Priced',
      'The Starling-and-Oedema Mechanisms Named',
      'The Special Circulations Named',
    ],
  },
  {
    number: 5,
    slug: 'respiratory',
    title: 'The Respiratory System',
    summary:
      'The gas register: the mechanics (the pressure-volume craft with the compliance-and-sur factant honesty — the neonatal receipt priced straight); the volumes-and-capacities (the spirogram\u2019s numbers fixed by drill with the obstructive-and-restrictive reading); the ventilation register (the dead space arithmetic — the alveolar-and-minute honesty); the exchange (the diffusion-perfusion match with the shunt-and-dead-space consequences); the transport (the oxyhaemoglobin-and-dissociation craft with the Bohr-Verdoubl-Haldane registers — the curve\u2019s shifts fixed by drill); the regulation (the central-and-peripheral chemoreceptors with the CO2-hypersensitivity honesty); and the special registers (the exercise-and-altitude-and-diving crafts with the medical-physiology\u2019s own crown named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Compliance-and-Surfactant Honesty',
      'The Spirogram Fixed by Drill',
      'The Curve\u2019s Shifts by Their Mechanisms',
      'The CO2 Honesty Held Straight',
    
      'Semester II: Physiology'
    ],
  },
  {
    number: 6,
    slug: 'renal',
    title: 'The Renal System',
    summary:
      'The kidney\u2019s register: the nephron\u2019s juxtaglomerular architecture; the GFR arithmetic (the pressure determinants with the measured-and-filtered-load honesty, the clearance craft — the inulin\u2019s creatinine receipts); the tubular transport (the glucose threshold, the loop countercurrent multiplier with the concentration engine, the ADH-and-aldosterone registers); the acid-and-base register (the bicarbonate\u2019s buffer arithmetic with the compensation rules — the four primary disorders fixed by drill with the anion-gap craft); the and-the body-fluids\u2019 arithmetic (the intake-and-output balance with the dehydration-and-overload registers); and the micturition register (the bladder\u2019s spinal arc with the cord-lesion consequence named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Clearance Craft by Its Receipts',
      'The Countercurrent Concentration Engine',
      'The Four Disorders Fixed by Drill',
      'The Anion-Gap Craft Named',
    ],
  },
  {
    number: 7,
    slug: 'gi-endocrine',
    title: 'The GI-and-Endocrine Systems',
    summary:
      'The digestive-and-chemical registers: the GI motility-and-secretion (the mouth-to-colon arc with the swallowing\u2019s peristalsis crafts, the gastric\u2019s pancreatic-and-biliary secretion arithmetic with the pH honesty per stage); the digestion-and-absorption (the carbohydrate\u2019s-protein-and-lipid registers with the malabsorption preview); the liver-and-metabolic register (the bile\u2019s processing crafts with the ammonia\u2019s urea honesty previewed); the endocrine axes (the pituitary\u2019s control honesty, the thyroid-and-calcium registers with the TSH-T3-T4-and-PTH-calcitonin arithmetic, the adrenal\u2019s cortical crafts with the stress\u2019s salt honesty, the glucose\u2019s-insulin-glucagon dial with the diabetes preview, the reproductive-and-hormonal arc with the cycle\u2019s arithmetic); and the calcium-phosphate balance (the PTH-and-vitamin-D register with the bone\u2019s honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Secretion Arithmetic per Stage',
      'The Liver\u2019s Processing Named',
      'The Glucose Dial with the Preview',
      'The Calcium Register Held',
    ],
  },
  {
    number: 8,
    slug: 'neuro-autonomic-integrative',
    title: 'The Neurophysiology-and-Integrative Registers',
    summary:
      'The control registers: the sensory-and-motor tracts (the ascending-and-descending honesty with the reflex arc — the stretch-and-withdrawal receipts); the autonomic division (the sympathetic-and-parasympathetic crafts with the receptor\u2019s organ table — the pharmacology book\u2019s-own doorway); the special senses\u2019 core (the vision-and-optic craft, the hearing\u2019s cochlear place arithmetic, the vestibular\u2019s honesty); the higher functions\u2019 register named (the sleep-and-EEG, the memory-and-learning at survey depth); and the integrative registers (the temperature regulation with the fever\u2019s-honesty, the exercise\u2019s arithmetic — the cardiac-and-respiratory coupling, the body\u2019s response to the extremes — the altitude-and-diving-and-space crafts named as the discipline\u2019s own crown).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Reflex Arc by Its Receipts',
      'The Autonomic Table Held for the Doorway',
      'The Place Arithmetic Named',
      'The Extremes as the Crown',
    ],
  },
]

export const medicalPhysiology: Book = {
  id: 'medical-physiology',
  title: 'Medical Physiology',
  subtitle: 'The human machinery in health — the systems by their numbers, for the clinic that will meet them in disease',
  discipline: 'medical-sciences',
  level: 'Undergraduate MBBS core (the Guyton register read this pass)',
  description: 'The physiological discipline in its clinical register (the biology shelf\u2019s animal-physiology owns the general register — cross-referenced, the sibling views: the mechanism shared, the clinic owned here): the cell-and-general-physiology foundation (the membrane\u2019s craft, the transport census with the sodium-potassium engine); the excitable tissues (the nerve\u2019s skeletal-muscle machinery, the neuromuscular junction with the anaesthetic\u2019s myasthenia honesty); the blood (the formed elements\u2019 census, the haemostasis cascade with the bleeding-and-clotting registers, the blood groups\u2019 transfusion arithmetic); the cardiovascular system in full (the electrophysiology-and-ECG, the cardiac cycle-and-output arithmetic, the haemodynamics-and-regulation, the capillary exchange with the oedema mechanism); the respiratory system (the mechanics-and-volumes, the gas exchange-and-transport with the oxyhaemoglobin craft, the regulation with the chemoreceptor honesty); the renal system (the nephron\u2019s Countercurrent engine, the GFR arithmetic, the tubular transport, the acid-and-base arithmetic with the compensation registers); the GI system (the motility-and-secretion crafts with the liver-and-biliary registers); the endocrine system (the pituitary-thyroid-adrenal-and-reproductive axis crafts with the feedback honesty); the neurophysiology\u2019s clinical core (the sensory-and-motor tracts, the autonomic division with the receptor\u2019s drug honesty); and the integrative registers (the temperature, the exercise and the body\u2019s response to the extremes).',
  status: 'planned',
  accent: ['#b91c1c', '#7f1d1d'],
  chapters,
}

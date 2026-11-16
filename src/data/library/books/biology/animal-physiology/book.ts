import type { Book, Chapter } from '../../../types'

/**
 * Animal Physiology — the nineteenth book of the Biology shelf (the zoology register).
 *
 * STATUS: PLANNED (Biology full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 32 planned lessons, zero written. Lesson ids will use the `zphys-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Animal Physiology owns the general-and-comparative machinery register. The human clinical depth belongs to the medical shelf’s medical-physiology (the sibling clinical view — mechanisms shared, disease owned there); the biochemical engine (glycolysis-and-ETC) belongs to the chemistry shelf’s biochemistry; the plant’s machinery to plant-physiology; the NCERT-and-NEET human-physiology lines are priced here at the general level.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Hickman’s Integrated Principles of Zoology — Part IV Activity of Life (read this pass) as the spine.
 * - Guyton and Hall’s Textbook of Medical Physiology cross-referenced as the human pole (the units read this pass: Introduction-and-Cell / Membrane-Nerve-Muscle / the thirteen-unit arc) with the medical shelf owning the clinical register.
 * - The NCERT class 11-12 human-physiology chapters as the school ladder (the NEET register).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'excitable-register',
    title: 'The Excitable Register',
    summary:
      'The nerve\u2019s machinery: the resting potential (the pump\u2019s potassium-leak honesty priced by the Nernst arithmetic at survey depth — the minus-seventy receipt); the action potential (the threshold\u2019s all-or-none honesty, the sodium\u2019s rising-and-potassium\u2019s-falling phases, the two refractory periods as the one-way gate); the propagation register (the unmyelinated\u2019s saltatory crafts — the node-of-Ranvier receipt priced by the speed-and-energy arithmetic); the synapse\u2019s craft (the vesicle\u2019s-release register, the EPSP-IPSP summation arithmetic, the electrical-and-gap honesty named); and the pharmaceutical cross-reference (the local anaesthetic\u2019s channel-blocker registers named for the pharmacology book\u2019s depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Resting Potential\u2019s Pump Honesty',
      'The All-or-None Engine and Its Gates',
      'The Saltatory Speed Arithmetic',
      'The Summation Craft Held',
      'The Human Nervous System and the Nerve Impulse',
      'Neural Control and Coordination',
    ],
  },
  {
    number: 2,
    slug: 'muscle-contraction',
    title: 'The Muscle\u2019s Contraction Craft',
    summary:
      'The motor machinery: the sliding-filament engine (the sarcomere\u2019s band-and-line anatomy, the cross-bridge\u2019s ATP cycle walked slowly); the trigger craft (the T-tubule-and-DHP receipt, the troponin\u2019s calcium trigger with the relaxation\u2019s-pump honesty); the twitch-and-tetanus arithmetic (the frequency-and-summation receipt — the fused honesty of the complete tetanus); the motor-unit register (the recruitment\u2019s size honesty — the small-first craft); and the three-muscle census (the skeletal\u2019s nerve-need against the cardiac\u2019s smooth\u2019s independence — the pacemaker\u2019s calmodulin receipts named as the two different triggers).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Sarcomere\u2019s Anatomy Held',
      'The Calcium Trigger Walked Slowly',
      'The Tetanus Arithmetic Priced',
      'The Three-Muscle Census Held',
      'Types of Movement: Ciliary, Flagellar and Muscular Locomotion',
    ],
  },
  {
    number: 3,
    slug: 'endocrine-register',
    title: 'The Endocrine Register',
    summary:
      'The chemical governance: the hormone classes (the peptide\u2019s surface-receptor craft with the cAMP second messenger against the steroid\u2019s nuclear-and-gene register — the two routes priced by their speed); the pituitary craft (the hypothalamic-and-portal control honesty, the tropic census); the thyroid register (the iodine\u2019s-uptake craft, the T3-T4 metabolic honesty, the goitre\u2019s-feedback receipt); the adrenal register (the cortex\u2019s salt-and-stress crafts, the medulla\u2019s fight-flight receipt); the glucose dial (the insulin-and-glucagon antagonism held as one arithmetic — the two-hormone\u2019s-one-number receipt); and the invertebrate registers named (the ecdysone-and-moult craft cross-referenced to entomology).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two Classes by Their Two Routes',
      'The Portal\u2019s Control Honesty',
      'The Feedback Receipts Priced',
      'The Glucose Dial Held as One Arithmetic',
      'Hormone Action and Its Disorders: Hypo- to Hyper-Activity',
      'Chemical Coordination and Integration',
    ],
  },
  {
    number: 4,
    slug: 'digestion-absorption',
    title: 'The Digestion and Absorption Register',
    summary:
      'The fuel processing: the route register (the salivary craft, the stomach\u2019s HCl-and-pepsin register, the chyme\u2019s sphincter crafts); the pancreatic-and-liver registers (the alkaline-and-enzyme honesty, the bile-and-emulsification craft — the micelle priced straight as the not-an-enzyme register); the enzyme-and-pH arithmetic (the amylase\u2019s neutral, the pepsin\u2019s acid and the trypsin\u2019s alkaline — the three-pH\u2019s one-gut honesty fixed once); the absorption craft (the villus\u2019s surface arithmetic cross-referenced from anatomy, the carrier\u2019s active honesty); and the liver\u2019s first-pass register (the portal\u2019s glycogen\u2019s deamination crafts named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Route Register Held',
      'The Bile\u2019s Emulsification Craft Priced Straight',
      'The Three-pH Honesty Fixed Once',
      'The Liver\u2019s First-Pass Craft Named',
      'Digestion and Nutrition',
    ],
  },
  {
    number: 5,
    slug: 'gas-transport-circulation',
    title: 'The Gas Transport and the Circulation',
    summary:
      'The oxygen delivery: the haemoglobin craft (the haem-and-iron receipt, the four-site cooperative honesty — the sigmoid receipt priced by the allostery); the Bohr shift register (the CO2-and-pH honesty — the working-tissue-and-unloading craft, the chloride shift receipt); the CO2 carriage (the bicarbonate-and-carbamino registers); the haemodynamics register (the pressure-flow-and-resistance arithmetic — the Poiseuil craft at survey depth, the Starling\u2019s capillary exchange named); the heart\u2019s cycle (the ECG wave\u2019s electrical honesty at survey depth, the cardiac output\u2019s stroke-and-rate arithmetic); and the comparative register (the three-against-four chamber honesty cross-referenced from anatomy).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Sigmoid\u2019s Cooperative Receipt',
      'The Bohr\u2019s Working-Tissue Craft',
      'The Haemodynamics Arithmetic Named',
      'The Output Arithmetic Held',
      'The Circulatory Disorders Register: Hypertension to Heart Failure',
      'Respiratory Volumes and Capacities',
      'Body Fluids: Blood and Lymph',
      'Coronary Artery Disease, Angina and Heart Failure',
      'Chemical and Neural Signalling',
      'The Integration of Body Systems',
      'Breathing and Respiration in Animals',
    ],
  },
  {
    number: 6,
    slug: 'osmoregulation-excretion',
    title: 'The Osmoregulation and Excretion Register',
    summary:
      'The water-and-waste discipline: the nitrogen census (the ammonia\u2019s cheap-but-toxic honesty of the aquatic, the urea\u2019s expensive-but-safe mammal register, the uric\u2019s insoluble-and-water-saved craft of the bird-and-reptile — the three priced by their habitat arithmetic); the nephron\u2019s engine (the glomerular filtration\u2019s pressure arithmetic, the selective reabsorption-and-secretion registers, the loop\u2019s countercurrent multiplier priced by its gradient arithmetic); the ADH register (the vasopressin\u2019s collecting-duct-and-aquaporin honesty — the diabetes-insipidus receipt); the RAAS named at survey depth (the aldosterone\u2019s salt honesty); and the two-strategy fish honesty (the marine\u2019s drink-and-excrete against the freshwater\u2019s pump-and-void crafts).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Nitrogen Census by Habitat Arithmetic',
      'The Nephron Engine Priced by Its Gradient',
      'The Aquaporin Honesty and Its Receipt',
      'The Two-Strategy Fish Honesty',
      'Ammonotelism, Ureotelism and Uricotelism',
      'The Human Excretory System: Urine Formation and Its Regulation',
      'Renal Disorders: Uraemia, Calculi, Nephritis and Dialysis',
      'Excretory Products and Their Elimination',
    ],
  },
  {
    number: 7,
    slug: 'thermoregulation-reproduction',
    title: 'The Thermoregulation and Reproduction Registers',
    summary:
      'The heat-and-generation crafts: the thermoregulation register (the ectotherm\u2019s behavioural basking-and-shuttle honesty, the endotherm-and-metabolic craft — the brown adipose-and-uncoupling receipt named, the countercurrent extremity craft, the panting-and-sweating evaporative census); the hibernation-and-torpor register named (the ground squirrel\u2019s receipt); the reproductive register (the ovarian cycle\u2019s FSH-LH craft — the two-hormone\u2019s-one-cycle honesty, the uterine proliferative-and-secretory register, the placenta-and-exchange craft with the counterflow named); the parturition register (the oxytocin\u2019s positive-feedback receipt — the one-and-only honesty priced straight); and the lactation register (the prolactin-and-craft named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ectotherm\u2019s Endotherm\u2019s Crafts',
      'The Uncoupling Receipt Named',
      'The One-Cycle Honesty Held',
      'The Positive-Feedback Receipt Priced Straight',
      'Homeostasis and Its Mechanisms',
    ],
  },
  {
    number: 8,
    slug: 'sensory-doorway',
    title: 'The Sensory Register and the Doorway',
    summary:
      'The information input: the transduction craft (the receptor potential\u2019s stimulus-to-voltage receipt, the phasic-and-tonic adaptation census); the photoreception register (the rod\u2019s one-rhodopsin against the cone\u2019s three-craft — the colour arithmetic priced straight, the compound eye cross-referenced from anatomy); the mechanoreception register (the cochlea\u2019s place arithmetic — the basilar\u2019s frequency honesty, the vestibular\u2019s utricle-and-canal crafts named); the chemoreception register (the olfactory receptor\u2019s family honesty named at survey depth); and the doorway — the physiology register\u2019s close with the internal-milieu idea held as the founding gift (the homeostasis craft priced as the discipline\u2019s own frame) and the medical-and-plant sibling registers named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Transduction Craft and Its Census',
      'The Cochlea\u2019s Place Arithmetic',
      'The Vestibular Crafts Named',
      'The Internal Milieu Held as the Founding Gift',
    ],
  },
]

export const animalPhysiology: Book = {
  id: 'animal-physiology',
  title: 'Animal Physiology',
  subtitle: 'How animals work — nerve, muscle, hormones, digestion, gas transport, the kidney and the senses',
  discipline: 'biology',
  level: 'Undergraduate zoology core (the Hickman activity arc; Guyton cross-referenced)',
  description: 'The animal machinery told as one machine: the excitable register (the resting potential\u2019s pump-and-potassium honesty, the action potential\u2019s all-or-none engine with its two refractories, the saltatory node arithmetic, the synapse-and-summation craft); the muscle register (the sliding-filament engine walked slowly — the cross-bridge cycle with its calcium trigger, the twitch-and-tetanus arithmetic, the cardiac\u2019s autorhythmic honesty); the endocrine register (the two hormone classes with their two receptor crafts, the feedback honesty as homeostasis\u2019s core engine, the pituitary-thyroid-adrenal crafts, the glucose dial held as one arithmetic); the digestion-and-absorption register (the three-pH\u2019s one-gut honesty, the liver\u2019s first-pass craft); the gas-and-circulation register (the haemoglobin\u2019s cooperative S-curve with the Bohr shift receipt, the haemodynamics and output arithmetic); the osmoregulation-and-excretion register (the nitrogen three-form census, the nephron\u2019s filtration-reabsorption-secretion engine, the ADH craft, the two-strategy fish honesty); the thermoregulation-and-reproduction registers (the ectotherm\u2019s behavioural and the endotherm\u2019s metabolic crafts, the ovarian cycle\u2019s one-arithmetic honesty); and the sensory register (the receptor-potential craft, the cochlea\u2019s place arithmetic, the internal-milieu idea held as the discipline\u2019s founding gift).',
  status: 'planned',
  accent: ['#0891b2', '#0e7490'],
  chapters,
}

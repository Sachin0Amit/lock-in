import type { Book, Chapter } from '../../../types'

/**
 * Anatomy — the first book of the Medical Sciences shelf.
 *
 * STATUS: PLANNED (Medical Sciences full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 37 planned lessons, zero written. Lesson ids will use the `anat-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Anatomy owns the human regional-and-clinical register. The general-and-comparative architecture belongs to the biology shelf’s animal-anatomy (the sibling views — the general there, the human clinic here); the embryology’s full arc to developmental-biology with the congenital-abnormality register priced here for the clinic; the physiology belongs to medical-physiology; the histology to histology; the NEET-and-FMGE lines are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Gray’s Anatomy for Students named as the university pole (the regional register) with Moore’s Clinically Oriented Anatomy as the co-pole.
 * - Guyton-and-Hall’s unit arc cross-referenced for the physiological correlate (the Introduction-and-Cell unit read this pass).
 * - The NCERT class 11-12 human-structure lines as the school ladder (the NEET register).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'language-planes',
    title: 'The Language and the Planes',
    summary:
      'The professional register opened: the anatomical position as the convention that makes every description repeatable; the directional terms (proximal-and-distal, medial-and-lateral, superficial-and-deep, ipsilateral-and-contralateral) fixed by drill; the planes (the sagittal, coronal and transverse) with the imaging correlate — the axial CT slice and the MRI\u2019s three-plane honesty; the body\u2019s cavities and the nine-region abdominal map with the quadrant alternative; the structural hierarchy (bone, muscle, fascia, viscera) named for the dissection register; and the clinical craft — why the language matters (the surgical safety register: the correct-side and correct-site honesty priced straight).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Position and the Terms by Drill',
      'The Three Planes with the Imaging Correlate',
      'The Nine-Region Map Held',
      'The Surgical-Safety Honesty',
    ],
  },
  {
    number: 2,
    slug: 'upper-limb',
    title: 'The Upper Limb',
    summary:
      'The arm\u2019s register: the brachial plexus\u2019s roots-trunks-cords-divisions architecture walked once (the landmark pattern that makes it learnable); the shoulder\u2019s joint-and-rotator-cuff craft; the arm\u2019s forearm\u2019s compartments with the nerve-and-artery honesty (the median, ulnar and radial nerves\u2019 territories); the hand-and-intrinsic register (the thenar-and-hypothenar eminences, the flexor synovial sheaths with the infection-spread consequence); the nerve-injury registers priced for the clinic (the Erb\u2019s Klumpke\u2019s palsies, the carpal tunnel, the ulnar nerve\u2019s funny-bone honesty, the radial nerve\u2019s Saturday-night palsy); and the vascular register (the brachial artery\u2019s pressure point, the venous drainage-and-cubital craft).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Plexus Walked Once',
      'The Compartment-and-Territory Honesty',
      'The Nerve-Injury Registers Priced',
      'The Vascular Register Named',
    ],
  },
  {
    number: 3,
    slug: 'thorax',
    title: 'The Thorax',
    summary:
      'The chest\u2019s register: the thoracic wall\u2019s cage-and-muscles with the intercostal space\u2019s neurovascular plane (the V-A-N honesty); the breast\u2019s clinical anatomy (the quadrant map, the lymphatic drainage with the metastatic route); the pleural cavities with the costodiaphragmatic recess and the pneumothorax-and-effusion consequence; the mediastinal map (the superior-and-inferior divisions, the thymus, the trachea-and-oesophagus); the heart\u2019s surface anatomy (the borders on the chest film, the valve-and-auscultation points with the radiological correlate); the lungs\u2019 lobes-and-segments (the bronchopulmonary segments priced as the surgical unit); and the diaphragm\u2019s openings (the T8-T12 honesty fixed by drill).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Wall and the Intercostal Plane',
      'The Pleural Recess and Its Consequences',
      'The Mediastinal Map Held',
      'The Surface Anatomy with the Auscultation Points',
      'Veterinary Anatomy (Gross Anatomy, Histology And Embryology, Splanchnology)',
    ],
  },
  {
    number: 4,
    slug: 'abdomen-pelvis',
    title: 'The Abdomen and the Pelvis',
    summary:
      'The trunk\u2019s register: the anterior abdominal wall\u2019s layers-and-rectus sheath (the surgical plane honesty); the inguinal canal with the hernia\u2019s anatomy (the indirect-and-direct distinction priced as the craft it is); the peritoneum\u2019s reflections (the greater-and-lesser sacs, the mesenteries and the subphrenic spaces); the GI viscera by region (the stomach\u2019s parts-and-nerve supply, the duodenum\u2019s C-loop, the liver\u2019s segments-and-Couinaud honesty, the biliary tree\u2019s Calot triangle, the pancreas, the spleen\u2019s ribs-shielded honesty); the retroperitoneal register (the kidneys-and-ureters, the aorta\u2019s IVC divisions); the pelvis (the pelvic diaphragm, the bladder\u2019s prostate relations, the female-and-male pelvic organs with the perineal pouches); and the lower limb\u2019s clinical core (the femoral triangle, the great saphenous vein, the sciatic nerve\u2019s honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Wall and the Hernia Craft',
      'The Peritoneal Reflections Named',
      'The Retroperitoneal Register Held',
      'The Femoral Triangle and the Lower-Limb Core',
    ],
  },
  {
    number: 5,
    slug: 'head-neck',
    title: 'The Head and Neck',
    summary:
      'The cephalic register: the skull\u2019s cranial-and-facial map with the foramina\u2019s nerve-and-vessel honesty; the scalp\u2019s five-layer craft (the danger space priced); the face\u2019s parotid region (the facial nerve\u2019s branches inside the parotid honesty — the surgical consequence); the neck\u2019s triangles (the anterior\u2019s posterior\u2019s contents with the thyroid-and-parathyroid register); the cervical fascia\u2019s spaces (the infection-spread routes); the cranial nerves\u2019 exits-and-distributions (the twelve walked once with the clinical sign each leaves when injured); the pharynx-and-larynx (the swallowing-and-voice registers, the recurrent laryngeal nerve\u2019s thyroid-surgery honesty); and the eye\u2019s ear clinical anatomy (the orbit\u2019s contents, the middle ear\u2019s ossicular chain with the facial nerve\u2019s intimate honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Foramina\u2019s Honesty by Drill',
      'The Parotid\u2019s Facial-Nerve Craft',
      'The Twelve Nerves Walked with Their Signs',
      'The Recurrent-Laryngeal Honesty Priced',
    ],
  },
  {
    number: 6,
    slug: 'neuroanatomy',
    title: 'The Neuroanatomy Core',
    summary:
      'The brain\u2019s register: the spinal cord\u2019s architecture (the grey-and-white matter, the ascending-and-descending tracts — the corticospinal-and-spinothalamic-and-posterior-column honesty with the clinical hemisection\u2019s Brown-Sequard receipt); the brainstem\u2019s three levels (the midbrain, pons and medulla with the cranial-nerve nuclei\u2019s honesty); the cerebellum\u2019s basal-ganglia registers (the movement\u2019s modulators with the Parkinson\u2019s Huntington\u2019s clinical honesty previewed); the diencephalon (the thalamus as the relay, the hypothalamus as the homeostatic head); the cerebral hemispheres\u2019 lobes-and-areas (the cortical map with the Broca\u2019s Wernicke\u2019s language honesty); the ventricles-and-CSF (the production-and-absorption with the hydrocephalus consequence); and the blood supply (the circle of Willis with the stroke syndromes priced straight).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Cord\u2019s Tracts with the Hemisection Receipt',
      'The Brainstem\u2019s Levels Named',
      'The Language Areas\u2019 Honesty',
      'The Circle-and-Stroke Register Priced Straight',
    ],
  },
  {
    number: 7,
    slug: 'embryology-clinical',
    title: 'The Embryology for the Clinic',
    summary:
      'The congenital register (the arc cross-referenced to developmental-biology — the clinic owns the malformation\u2019s consequences): the gametogenesis-and-fertilisation preview; the first three weeks\u2019 arc (the gastrulation-and-neurulation craft with the neural-tube defect\u2019s folate honesty priced straight); the organogenesis highlights (the heart\u2019s septation with the congenital-heart registers — the septal-and-ductal defects priced for the paediatric clinic; the pharyngeal arches-and-pouches with the branchial consequence; the urogenital-and-palatal crafts); the twinning register (the monozygotic\u2019s dizygotic honesty with the chorion-and-amnion consequence); and the teratology register (the critical-period honesty with the classic agents — the thalidomide receipt priced straight).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Neural-Tube and the Folate Honesty',
      'The Heart\u2019s Septation Registers',
      'The Arch-and-Pouch Craft',
      'The Critical-Period Receipt Priced Straight',
    ],
  },
  {
    number: 8,
    slug: 'sectional-imaging',
    title: 'The Sectional-and-Imaging Correlate',
    summary:
      'The radiological register: the CT-and-MRI cross-sections read at the landmark levels (the thoracic-and-abdominal-and-pelvic planes with the viscera\u2019s positions on each); the plain-film\u2019s reading (the chest film\u2019s heart-and-lobes-and-diaphragm honesty with the silhouette sign named); the contrast-and-enhancement crafts named at survey depth; the surface-projection register (the apex beat, the liver\u2019s spleen\u2019s kidney\u2019s projections, the appendix\u2019s gallbladder\u2019s points — the physical-examination landmarks); and the ultrasound-and-windows named (the FAST-and-obstetric honesty at survey depth) — the imaging register priced as the anatomist\u2019s radiologist\u2019s shared language.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Cross-Sections at the Landmark Levels',
      'The Plain Film\u2019s Reading Honesty',
      'The Surface-Projection Register',
      'The Ultrasound Windows Named',
      'Applied Anatomy: The Clinical Surface Register',
    ],
  },
]

export const anatomy: Book = {
  id: 'anatomy',
  title: 'Anatomy',
  subtitle: 'The human body by regions and systems — the professional register of structure',
  discipline: 'medical-sciences',
  level: 'Undergraduate MBBS core (the professional register; the general register owned by the biology shelf)',
  description: 'The medical anatomical discipline: the language and planes first (the anatomical position, the directional terms, the planes and the imaging cross-sections); the regional register — the upper limb from the shoulder\u2019s brachial plexus to the hand\u2019s thenar eminence; the thorax with its walls, the pleural cavities, the mediastinum and the heart\u2019s surface anatomy; the abdomen\u2019s nine-region map with the peritoneal reflections and the retroperitoneal organs; the pelvis and lower limb with the pelvic diaphragm and the femoral triangle; the head and neck with the triangles, the cranial nerves\u2019 exits and the cervical fascia; the neuroanatomy core (the spinal cord\u2019s tracts, the brainstem\u2019s levels, the basal ganglia, the ventricles and the cortical lobes with the internal capsule\u2019s honesty); the embryological view cross-referenced for the congenital register; the sectional-and-imaging correlate (the CT and MRI planes read with the landmarks); and the living-and-clinical craft — the surface projections, the percussion-and-auscultation landmarks and the common nerve-injury registers priced for the ward.',
  status: 'planned',
  accent: ['#dc2626', '#450a0a'],
  chapters,
}

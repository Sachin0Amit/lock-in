import type { Book, Chapter } from '../../../types'

/**
 * General Surgery — the twelfth book of the Medical Sciences shelf.
 *
 * STATUS: PLANNED (Medical Sciences full-shelf planning pass, 2026-11-16) — 7 chapters /
 * 28 planned lessons, zero written. Lesson ids will use the `surg-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): General Surgery owns the operative register. The anatomy to the anatomy book (the clinical correlates cross-referenced); the wound mechanism to pathology; the drug to pharmacology; the ICU to internal-medicine’s-critical-care; the obstetric to obstetrics-gynaecology; the NEET-and-FMGE lines are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Bailey and Love’s Short Practice of Surgery named as the university pole.
 * - Schwartz’s named as the depth co-pole.
 * - The NCERT-and-FMGE lines as the school ladder.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'principles-sterility',
    title: 'The Principles-and-Sterility Register',
    summary:
      'The theatre\u2019s craft: the aseptic\u2019s arc (the scrub\u2019s gown honesty with the sterile-field craft, the sterilisation\u2019s census cross-referenced from medical-microbiology with the Spaulding\u2019s division); the wound\u2019s craft (the healing\u2019s three-phase arc cross-referenced from pathology, the suture-and-material census with the needle honesty — the absorbable division, the closure-and-technique register with the cosmetic-and-consequence named); the bleeding\u2019s craft (the control\u2019s arc with the tourniquet\u2019s honesty, the transfusion-and-component register cross-referenced); and the surgical-ethics register named (the consent\u2019s risk honesty with the second-opinion craft).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Sterile-Field Craft Held',
      'The Suture Census by Its Materials',
      'The Control Arc Named',
      'The Consent Honesty Cross-Referenced',
    ],
  },
  {
    number: 2,
    slug: 'perioperative-arc',
    title: 'The Perioperative Arc',
    summary:
      'The around-the operation craft: the preop\u2019s register (the risk-and-assessment craft with the ASA\u2019s class honesty, the investigation-and-tiered census, the NBM\u2019s fasting arithmetic named, the vte-and-prophylaxis register); the anaesthesia\u2019s register (the class\u2019s division — the general\u2019s arc with the stages\u2019 honesty, the local-and-technique craft with the lignocaine\u2019s-MAX arithmetic, the spinal\u2019s level honesty with the postdural register named); the postop\u2019s map (the fever\u2019s cause clock with the day\u2019s division honesty — the atelectasis\u2019s day-one receipt, the DVT-and-Wells register with the ambulation\u2019s craft, the wound\u2019s infection\u2019s census, the ileus\u2019s erumidity honesty); and the and-ERAS-and-enhanced register named at survey depth.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The ASA Honesty Fixed by Drill',
      'The MAX Arithmetic Named',
      'The Fever Clock by Its Days',
      'The ERAS Register Named',
    ],
  },
  {
    number: 3,
    slug: 'infection-register',
    title: 'The Surgical-Infection Register',
    summary:
      'The infected-surgery craft: the site\u2019s classification (the clean\u2019s clean-contaminated-and-dirty honesty with the risk arithmetic); the abscess\u2019s principle (the drainage\u2019s craft with the antibiotic\u2019s-complement honesty — the source-control receipt priced straight); the cellulitis-and-erysipelas division named; the necrotising\u2019s register (the red-flag census with the gas honesty — the crepitus receipt and the debridement-and-emergency craft); the tetanus\u2019s arc (the prophylaxis-and-regime register with the IM arithmetic cross-referenced); and the biofilm\u2019s implant honesty named at survey depth with the removal craft.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Classification with Its Risk Arithmetic',
      'The Source-Control Receipt Priced Straight',
      'The Necrotising Red-Flags Held',
      'The Biofilm Honesty Named',
    ],
  },
  {
    number: 4,
    slug: 'trauma-burns',
    title: 'The Trauma-and-Burn Registers',
    summary:
      'The injured\u2019s craft: the ATLS\u2019s arc (the primary-and-ABCDE craft with the catastrophic-haemorrhage honesty first, the secondary-and-survey register, the adjuncts census); the trauma\u2019s-organ map (the head\u2019s GCS arithmetic fixed by drill with the pupil honesty, the spine\u2019s craft, the chest-and-tube register with the haemothorax arithmetic, the abdomen\u2019s FAST honesty, the pelvic-and-binder craft); the fracture-and-register named at survey depth; the burn\u2019s craft (the degree\u2019s-and census with the rule-of-nines cross-referenced from forensic-medicine, the Parkland\u2019s fluid arithmetic with the urine-output honesty, the eschar-and-consequence named); and the mass-casualty-and-register named at survey depth.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The ABCDE Craft with Its Order Honesty',
      'The GCS Arithmetic Fixed by Drill',
      'The Parkland Receipt Priced Straight',
      'The Mass-Casualty Register Named',
    ],
  },
  {
    number: 5,
    slug: 'acute-abdomen',
    title: 'The Acute Abdomen',
    summary:
      'The emergency\u2019s craft: the pain\u2019s approach (the visceral\u2019s-against-somatic honesty with the peritonism receipt — the guarding\u2019s rebound honesty); the appendicitis\u2019s craft (the mcburney\u2019s receipt with the Alvarado honesty named, the pediatric\u2019s elderly caution, the perforation\u2019s consequence); the obstruction\u2019s division (the small\u2019s-against-large honesty with the volvulus-and-sign named, the conservative\u2019s drip-suck register); the perforation\u2019s register (the ulcer\u2019s free-air honesty with the erect film\u2019s craft); the pancreatitis\u2019s craft (the amylase\u2019s-against-revision honesty — the Glasgow register named, the gallstone-and-alcohol division); the mesenteric ischaemia named; and the non-surgical mimics held straight (the medical\u2019s honesty — the diabetic ketoacidosis-and-abdominal register named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Peritonism Receipt Held',
      'The Alvarado Honesty Named',
      'The Drip-Suck Register Held',
      'The Medical Mimics Held Straight',
    ],
  },
  {
    number: 6,
    slug: 'hernia-biliary-colorectal',
    title: 'The Hernia, Biliary-and-Colorectal Registers',
    summary:
      'The elective\u2019s craft: the hernia\u2019s register (the anatomy cross-referenced from the anatomy book with the indirect-and-direct division, the strangulation\u2019s honesty with the emergency\u2019s craft, the mesh\u2019s tension-free receipt priced straight, the laparoscopic\u2019s TEP-TAPP registers named); the biliary\u2019s craft (the colic\u2019s-against-cholecystitis division with the murphy receipt, the ERCP-and-LCBDE registers named, the jaundice\u2019s-approach cross-referenced); the colorectal\u2019s register (the bleeding-and-approach craft, the cancer\u2019s staging honesty cross-referenced from pathology with the CEA named, the diverticular-and-hinchey register named); the anorectal\u2019s craft (the haemorrhoid\u2019s band honesty with the fissure-and-ointment register); and the breast-and-lump craft named (the triple assessment honesty at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Tension-Free Receipt Priced Straight',
      'The Murphy Receipt Held',
      'The Staging Cross-Referenced',
      'The Triple Assessment Named',
    ],
  },
  {
    number: 7,
    slug: 'urology-thoracic-oncologic',
    title: 'The Urology, Thoracic-and-Oncologic Principles',
    summary:
      'The remaining\u2019s craft: the urology\u2019s register (the colic\u2019s renal honesty with the stone-and-ct craft, the retention\u2019s catheter arc, the haematuria\u2019s approach, the prostate\u2019s BPH-against-cancer division named at survey depth); the thoracic\u2019s register (the pneumothorax\u2019s craft with the tube\u2019s honesty, the effusion-and-tap register); the oncologic\u2019s principles (the margin\u2019s node honesty with the wide\u2019s-against-local craft, the staging\u2019s cross-reference, the adjuvant\u2019s neoadjuvant honesty named, the multidisciplinary-and-MDT craft); the stoma-and-register named; and the surgical research-and-craft named (the trial\u2019s register cross-referenced from community-medicine).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Colic Honesty with the CT Craft',
      'The Tube Honesty Held',
      'The Margin-Node Honesty Named',
      'The MDT Craft Held',
      'Radiotherapy and Radiodiagnosis',
      'Anesthesiology',
      'Orthopaedics',
      'Ophthalmology and ENT (Otorhinolaryngology)',
    ],
  },
]

export const generalSurgery: Book = {
  id: 'general-surgery',
  title: 'General Surgery',
  subtitle: 'The surgeon\u2019s register — wounds, infections, trauma and the abdominal craft',
  discipline: 'medical-sciences',
  level: 'Undergraduate MBBS core (the operative register)',
  description: 'The surgical discipline: the principles first (the sterile-and-aseptic craft with the theatre\u2019s honesty, the wound\u2019s healing arc cross-referenced with the suture-and-material census, the surgical-bleeding-and-control craft with the transfusion\u2019s register); the perioperative arc (the preop-and-risk craft with the ASA honesty, the consent\u2019s register cross-referenced, the anaesthesia-and-class register with the local\u2019s spinal crafts, the postop\u2019s complication map — the atelectasis-and-DVT registers); the infection\u2019s register (the surgical-site craft with the classification\u2019s honesty, the abscess\u2019s drainage principle, the necrotising\u2019s red-flag register, the tetanus\u2019s prophylaxis arc); the trauma-and-burn registers (the ATLS-and-ABC craft with the polytrauma\u2019s honesty, the burn\u2019s fluid arithmetic with the Parkland receipt, the trauma\u2019s organ map); the abdominal surgery\u2019s core (the acute-abdomen\u2019s craft with the appendicitis\u2019s mcburney honesty, the obstruction\u2019s division, the hernia-and-repair registers cross-referenced from anatomy, the biliary-and-laparoscopic craft, the colorectal register); the oncologic-surgery-and-principles named (the margin\u2019s node honesty with the staging cross-referenced); and the and-urology\u2019s thoracic basics named at survey depth.',
  status: 'planned',
  accent: ['#7f1d1d', '#171717'],
  chapters,
}

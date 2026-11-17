import type { Book, Chapter } from '../../../types'

/**
 * Nursing — the sixteenth book of the Medical Sciences shelf.
 *
 * STATUS: PLANNED (Medical Sciences full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 25 planned lessons, zero written. Lesson ids will use the `nurs-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Nursing owns the caring register. The disease’s-mechanism to the medical books (the care’s-here); the pharmacology to pharmacology (the administration’s rights here); the public-health to community-medicine (the home register here); the psychology’s communication to the humanities shelf’s psychology book (cross-referenced); the NEET-and-NCLEX-style lines are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Potter-and-Perry’s Fundamentals of Nursing named as the pole.
 * - Brunner-and-Suddarth’s Medical-Surgical Nursing cross-referenced as the clinical co-pole.
 * - The INC’s Indian-register honesty with the BSc syllabus named as the school ladder.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'foundation-profession',
    title: 'The Foundation Register',
    summary:
      'The profession\u2019s craft: the history\u2019s arc (Nightingale-and-Crimea receipt priced straight — the statistics-and-sanitation crafts named with the polar-area diagram\u2019s honesty, the lamp symbolism held straight, the Indian-and-mission registers named); the ethics\u2019s code (the craft\u2019s-census with the confidentiality\u2019s honesty cross-referenced, the boundary-and-craft named, the informed-consent arc); the collaborative\u2019s register (the team\u2019s hierarchy honesty with the delegation\u2019s-craft named — the supervision requirement held straight); and the theory\u2019s-register named at survey depth (the needs-and-self-care crafts with the application\u2019s honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Crimea Receipt Priced Straight',
      'The Boundary Craft Named',
      'The Supervision Requirement Held Straight',
      'The Application Honesty Named',
      'Safe and Effective Care Environment',
      'Nursing Research and Statistics',
    ],
  },
  {
    number: 2,
    slug: 'fundamentals-assessment',
    title: 'The Fundamentals-and-Assessment Craft',
    summary:
      'The bedside\u2019s craft: the assessment\u2019s register (the head-to-toe arc with the vital-signs arithmetic fixed by drill — the BP\u2019s Korotkoff crafts, the SPO2-and-RR registers with the news2 honesty named, the pain\u2019s scale with the verbal craft); the hygiene-and-comfort craft (the bed-bath register with the oral care\u2019s honesty, the pressure-area craft with the staging\u2019s honesty — the turning\u2019s-two-hourly receipt priced straight); the mobility-and-safety register (the transfer\u2019s-craft with the DANDLE named at survey depth, the fall\u2019s prevention arc with the Morse named); the nutrition\u2019s elimination crafts (the assistive feeding\u2019s honesty with the catheter-and-embarrassment register — the CAUTI prevention named); and the documentation\u2019s craft (the contemporaneous honesty cross-referenced from forensic-medicine — the SBAR named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Vital Arithmetic Fixed by Drill',
      'The Two-Hourly Receipt Priced Straight',
      'The Morse Register Named',
      'The SBAR Named',
    ],
  },
  {
    number: 3,
    slug: 'medication-craft',
    title: 'The Medication-Administration Craft',
    summary:
      'The rights\u2019 discipline: the rights\u2019 census fixed by drill (the right\u2019s patient-drug-dose-route-time-documentation honesty — the nine-register named); the calculation\u2019s arithmetic (the dose-and-weight register with the drop\u2019s drip crafts — the mcg-and-ml arithmetic priced straight, the BSA register named); the route\u2019s census (the parenteral\u2019s division with the IM-site honesty — the deltoid\u2019s-against-gluteal crafts, the Z-track named, the IV register with the phlebitis\u2019s extravasation honesty, the subcutaneous insulin craft with the rotation\u2019s honesty); the storage register (the cold-chain cross-referenced with the cytotoxic-and-honesty named); and the error-and-prevention craft (the report\u2019s honesty with the just-culture named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Nine-Register Fixed by Drill',
      'The Drip Arithmetic Priced Straight',
      'The Z-Track Named',
      'The Just-Culture Honesty Held',
    ],
  },
  {
    number: 4,
    slug: 'clinical-nursing-arc',
    title: 'The Clinical-Nursing Arc',
    summary:
      'The ward-and-ICU craft: the perioperative\u2019s register (the preoperative\u2019s checklist honesty — the WHO craft cross-referenced, the positioning\u2019s pressure honesty with the sterile cross-referenced, the postoperative\u2019s craft with the early-ambulation receipt held straight); the MDU-and-isolation craft (the glove\u2019s gown honesty with the donning\u2019s order fixed by drill); the chronic-and-education register (the diabetes\u2019s education arc — the foot-and-annual craft named, the inhaler\u2019s technique honesty, the heart-failure\u2019s daily-weight receipt priced straight); the critical-care arc (the monitor\u2019s alarm honesty with the ventilator-and-communication craft — the COMFORT named at survey depth); and the emergency\u2019s first-response register (the BLS craft with the cpr\u2019s arithmetic priced straight).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Checklist Honesty Cross-Referenced',
      'The Daily-Weight Receipt Priced Straight',
      'The Communication Craft Named',
      'The CPR Arithmetic Priced Straight',
      'Safety and Infection Prevention and Control',
      'The Reduction of Risk Potential',
      'Psychosocial Integrity and Mental Health Nursing',
      'Management of Care and Coordination',
      'Basic Care and Comfort',
      'Applied Anatomy and Applied Physiology for Nurses',
    ],
  },
  {
    number: 5,
    slug: 'community-leadership-process',
    title: 'The Community, Leadership-and-Process Registers',
    summary:
      'The home-and-organisation craft: the community\u2019s register (the home-visit\u2019s craft with the family\u2019s-assessment honesty — the structure-and-function division named, the school health\u2019s map cross-referenced with the screening craft, the occupational register named); the leadership\u2019s register (the delegation\u2019s honesty — the five-rights craft named, the conflict\u2019s resolution arc, the change-and-management craft at survey depth); the record-and-legal register (the contemporaneous honesty cross-referenced with the evidence craft named); and the process\u2019s craft — the profession\u2019s own method (the ADPIE arc walked once: the assess\u2019s diagnose honesty with the NAND named, the plan-and-smart craft, the implement-and-prioritisation register with the maslow honesty named, the evaluate\u2019s revision arc — the care-plan held as the nurse\u2019s own document).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Family Assessment Honesty Held',
      'The Five-Rights Craft Named',
      'The Maslow Honesty Named',
      'The ADPIE Arc Walked Once',
      'Midwifery and Obstetric Nursing',
      'Semester VIII: Management of Nursing Services and Education',
    ],
  },
]

export const nursing: Book = {
  id: 'nursing',
  title: 'Nursing',
  subtitle: 'The caring discipline — assessment, fundamentals of care and the clinical practice arc',
  discipline: 'medical-sciences',
  level: 'Undergraduate BSc-Nursing core (the professional register)',
  description: 'The nursing discipline: the foundation register (the profession\u2019s history arc with Nightingale\u2019s receipt priced straight — the pioneer craft with the modern\u2019s-register named, the ethics\u2019s code honesty, the collaborative practice frame); the fundamentals of care (the assessment\u2019s craft with the vital-signs arithmetic — the BP-and-SPO2 registers fixed by drill, the hygiene\u2019s mobility crafts with the pressure-sore\u2019s-staging honesty, the safety register with the fall\u2019s craft); the medication-and-administration craft (the rights\u2019 census fixed by drill with the calculation\u2019s arithmetic — the dose-and-drop registers, the route census with the parenteral\u2019s craft); the medical-surgical nursing arc (the perioperative\u2019s-register cross-referenced with the MDU craft, the chronic\u2019s long-term register with the education\u2019s craft — the diabetes\u2019s CHF education registers named, the critical-care nursing arc with the monitor\u2019s honesty); the community-and-family nursing (the home-craft with the family\u2019s-assessment register, the school health map cross-referenced); the leadership-and-management register (the delegation honesty with the supervision craft, the record\u2019s-legal honesty); and the nursing-process (the five-step arc — the ADPIE craft with the care-plan\u2019s honesty held straight as the profession\u2019s own method).',
  status: 'planned',
  accent: ['#0d9488', '#134e4a'],
  chapters,
}

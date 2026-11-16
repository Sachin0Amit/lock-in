import type { Book, Chapter } from '../../../types'

/**
 * Dentistry — the fifteenth book of the Medical Sciences shelf.
 *
 * STATUS: PLANNED (Medical Sciences full-shelf planning pass, 2026-11-16) — 6 chapters /
 * 24 planned lessons, zero written. Lesson ids will use the `dent-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Dentistry owns the oral register. The tooth’s oral histology to histology (the sibling views cross-referenced); the microbiology to medical-microbiology (the plaque biofilm cross-referenced); the pharmacology to pharmacology (the local’s register); the radiology’s general to the anatomy book’s imaging chapter; the NEET-and-BDS lines are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Newman-and-Carranza’s Clinical Periodontology named as the pole.
 * - Shafer’s Oral Pathology cross-referenced with the endodontic co-pole named.
 * - The NCERT-and-BDS lines as the school ladder with the India’s oral-health registers named.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'oral-anatomy-review',
    title: 'The Oral-Anatomy Review',
    summary:
      'The mouth\u2019s frame: the tooth\u2019s census (the primary-and-permanent division fixed by drill with the eruption\u2019s-chronology honesty — the age\u2019s-reading craft priced straight, the notation-and-systems named); the histology\u2019s review (the enamel\u2019s hardest honesty with the dentine-and-sensitivity register cross-referenced from histology, the pulp\u2019s living honesty, the periodontal\u2019s attachment arc); the occlusion\u2019s craft (the Angle\u2019s-division named with the overjet\u2019s honesty); and the salivary\u2019s register cross-referenced with the temporomandibular\u2019s-craft named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Eruption Chronology Fixed by Drill',
      'The Age-Reading Craft Priced Straight',
      'The Angle Division Named',
      'The TMJ Craft Named',
    ],
  },
  {
    number: 2,
    slug: 'cariology-prevention',
    title: 'The Cariology-and-Prevention Register',
    summary:
      'The most-common craft: the caries\u2019 arc (the etiological triad fixed once — the tooth\u2019s plaque-and-substrate honesty, the Streptococcus-and-Lactobacillus division cross-referenced, the lesion\u2019s arc from the white-spot\u2019s-demineralsiation to the cavitation\u2019s consequence, the ICDAS named at survey depth); the prevention\u2019s craft (the fluoride\u2019s mechanism honesty — the topical\u2019s-against-systemic division with the 1000-PPM arithmetic, the PTA register named, the sealant\u2019s craft with the evidence honesty, the sugar-and-frequency register with the stepwise honesty held straight); the high-risk register (the identification craft with the India\u2019s-fluorosis map cross-referenced — the endemic\u2019s honesty priced straight); and the behavioural register (the brushing\u2019s-craft with the technique honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Triad Fixed Once',
      'The PPM Arithmetic Named',
      'The Fluorosis Map Cross-Referenced',
      'The Technique Honesty Held Straight',
      'Pre-clinical Conservative Dentistry',
      'General Human Anatomy with Embryology and Histology',
      'General Human Physiology, Biochemistry, Nutrition and Dietetics',
    ],
  },
  {
    number: 3,
    slug: 'periodontology',
    title: 'The Periodontology Register',
    summary:
      'The support craft: the plaque\u2019s biofilm honesty (the formation\u2019s-arc with the bacterial succession named, the calculus\u2019s-division — the supra\u2019s-against-sub honesty); the disease\u2019s arc (the gingivitis\u2019s reversible honesty against the periodontitis\u2019s attachment loss — the pocket\u2019s depth arithmetic with the BOP receipt, the mobility-and-grade register, the IPIR named at survey depth); the risk register (the diabetes\u2019s smoking honesty cross-referenced with the pregnancy\u2019s register); the treatment\u2019s craft (the scaling\u2019s division with the root\u2019s planing honesty, the surgical-and-flap register named at survey depth, the maintenance-and-visit craft with the recall honesty); and the Noma named at survey depth (the neglect\u2019s consequence held straight).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Succession Named',
      'The Depth Arithmetic Fixed by Drill',
      'The Risk Register Cross-Referenced',
      'The Recall Honesty Held',
      'General Pathology and Microbiology',
      'General and Dental Pharmacology and Therapeutics',
      'Oral Pathology and Oral Microbiology',
    ],
  },
  {
    number: 4,
    slug: 'restorative-endodontic',
    title: 'The Restorative-and-Endodontic Craft',
    summary:
      'The repair\u2019s discipline: the cavity\u2019s principles (Black\u2019s classification fixed by drill with the extension\u2019s-for-prevention honesty — the modified craft named for the fluoride era); the materials\u2019 register (the amalgam-and-GIC division with the bonded\u2019s honesty — the composite\u2019s craft with the etch register named); the endodontic\u2019s arc (the pulp-and-inflammation register — the reversible\u2019s-against-irreversible honesty priced straight, the RCT\u2019s-craft with the working-length honesty, the files\u2019 register with the obturation craft named, the failure register named); the vital-pulp register (the indirect\u2019s direct honesty with the MTA named); and the crown-and-register named (the post-and-core craft at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Classification Fixed by Drill',
      'The Reversible Honesty Priced Straight',
      'The Working-Length Honesty Held',
      'The MTA Named',
    ],
  },
  {
    number: 5,
    slug: 'ortho-prosth-oral-surgery',
    title: 'The Orthodontic, Prosthodontic-and-Oral-Surgery Registers',
    summary:
      'The repair and alignment crafts: the orthodontic\u2019s register (the malocclusion\u2019s census with the Angle\u2019s-division — the crowding honesty with the growth-and-window named, the appliance census — the removable\u2019s-against-fixed division with the retention\u2019s craft); the prosthodontic\u2019s register (the complete-and-partial division with the impression\u2019s honesty — the border craft named, the implant-and-osseointegration receipt named at survey depth); the oral-surgery\u2019s arc (the extraction\u2019s craft with the third-molar honesty, the impaction\u2019s-census, the fracture\u2019s Le-Fort map cross-referenced with the MMOI register named); the trauma-and-avulsion register (the replant\u2019s 30-minute honesty priced straight); and the anaesthesia\u2019s register (the local\u2019s craft with the IV-sedation honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Growth Window Named',
      'The Osseointegration Receipt Named',
      'The Le-Fort Map Cross-Referenced',
      'The 30-Minute Honesty Priced Straight',
      'Pre-clinical Prosthodontics and Crown and Bridge',
      'Orthodontics and Dentofacial Orthopaedics',
    ],
  },
  {
    number: 6,
    slug: 'oral-medicine-public',
    title: 'The Oral-Medicine-and-Public Register',
    summary:
      'The systemic\u2019s honesty: the mucosal census (the ulcer-and-differential craft — the aphthous\u2019s-against-traumatic division with the red-flag honesty: the potentially-malignant register with the leukoplakia\u2019s erythroplakia crafts — the tobacco\u2019s-India honesty priced straight with the OSF register named, the lichen planus named); the oral-systemic register (the diabetes\u2019s periodontal bidirectional honesty cross-referenced, the anemia\u2019s signs in the mouth named); the Xerostomia-and-register named; the public-health craft (the oral-cancer\u2019s-India burden honesty — the two-thirds register named, the screening\u2019s-VIA-analogue honesty, the dental-public-health craft with the school register named); and the ethics register (the consent\u2019s second-opinion honesty with the advertising\u2019s-DCI register named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Red-Flag Honesty Priced Straight',
      'The Bidirectional Honesty Named',
      'The India Burden Held Straight',
      'The DCI Register Named',
    ],
  },
]

export const dentistry: Book = {
  id: 'dentistry',
  title: 'Dentistry',
  subtitle: 'The oral register — caries, periodontics, restoration and the oral-systemic honesty',
  discipline: 'medical-sciences',
  level: 'Undergraduate BDS core (the professional register)',
  description: 'The oral-health discipline: the oral anatomy\u2019s histology review (the tooth-and-eruption census with the chronology\u2019s honesty — the primary-and-permanent division fixed by drill, the enamel\u2019s dentine-pulp arc cross-referenced from histology); the cariology\u2019s register (the etiological triad with the Streptococcus cross-referenced, the lesion\u2019s arc from white-spot to cavitation, the prevention craft — the fluoride\u2019s mechanism honesty with the sealant\u2019s register); the periodontology\u2019s register (the plaque-and-calculus craft with the disease\u2019s arc — the gingivitis\u2019s-against-periodontitis division with the attachment\u2019s honesty and the pocket\u2019s-depth arithmetic); the restorative-and-endodontic craft (the cavity\u2019s principles with Black-and-classification named, the pulp\u2019s arc with the RCT\u2019s-craft priced straight); the prosthodontic\u2019s register (the complete-and-partial division with the implant-and-honesty named at survey depth); the orthodontic\u2019s register (the malocclusion\u2019s-Angle honesty with the growth\u2019s window); the oral-surgery-and-trauma register (the extraction\u2019s craft with the third-molar\u2019s honesty, the fracture\u2019s Le-Fort map); the oral-medicine\u2019s register (the mucosal census with the red-flag honesty — the potentially-malignant register with the tobacco\u2019s-India honesty priced straight); the paediatric-and-preventive register named; and the public-health register (the oral-health\u2019s-indicators with the fluorosis map named).',
  status: 'planned',
  accent: ['#0891b2', '#083344'],
  chapters,
}

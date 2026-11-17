import type { Book, Chapter } from '../../../types'

/**
 * Forensic Medicine — the ninth book of the Medical Sciences shelf.
 *
 * STATUS: PLANNED (Medical Sciences full-shelf planning pass, 2026-11-16) — 7 chapters /
 * 30 planned lessons, zero written. Lesson ids will use the `foren-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Forensic Medicine owns the medicolegal register. The poisoning-and-pharmacology register to pharmacology-and-medical-biochemistry (the mechanism’s there, the evidence’s here); the death’s cell mechanism to pathology; the DNA-and-molecular craft to biotechnology (cross-referenced); the ethics’s-general register shared with the medical-ethics arc; the NEET-and-FMGE lines are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Parikh’s Textbook of Medical Jurisprudence and Forensic Medicine named as the Indian pole.
 * - Knight’s Forensic Pathology named as the depth co-pole.
 * - The NCERT-and-FMGE lines as the school ladder with the Indian-Legal register named.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'legal-ethics-frame',
    title: 'The Legal-and-Ethics Frame',
    summary:
      'The profession\u2019s frame: the law-and-medical register (the MVA\u2019s 1860 honesty with the professional-and-negligence craft — the Bolam test named at survey depth with the consumer\u2019s protection honesty); the ethics\u2019s arc (the consent\u2019s craft with the capacity\u2019s competence honesty — the minor-and-emergency registers, the refusal\u2019s against-advice receipt priced straight, the confidentiality-and-exception census); the record\u2019s craft (the contemporaneous\u2019s honesty with the alteration register — the court\u2019s reading); the MTP-and-PCPNDT registers named (the Indian honesty priced straight); and the euthanasia-and-register named (the passive-and-active division with the living-will honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Negligence Craft Named',
      'The Consent\u2019s Capacity Honesty Held',
      'The Contemporaneous Receipt Priced Straight',
      'The Euthanasia Register Named',
    ],
  },
  {
    number: 2,
    slug: 'death-register',
    title: 'The Death Register',
    summary:
      'The death\u2019s craft: the diagnosis\u2019s honesty (the somatic-and-brain division with the brain-death-and-criterion craft — the apnea honesty with the organ-donation-and-India register named); the post-mortem\u2019s arc (the algor\u2019s 1-2 receipt with the environment\u2019s caveat priced straight, the rigor\u2019s 12-24 honesty, the livor-and-hypostasis craft with the shift\u2019s position consequence, the putrefaction register with the green\u2019s bloating arc); the time-since-death\u2019s arithmetic held honestly (the combined estimate with the interval-and-confidence register — the honesty that no single sign suffices); the autopsy\u2019s craft (the forensic-and-anatomy register with the and-organization\u2019s-VMalex named at survey depth); and the cause-and-manner division fixed once (the natural\u2019s accidental-suicidal-and-homicidal census with the mechanism\u2019s-against-manner honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Brain-Death Criterion Craft',
      'The Four Signs by Their Clocks',
      'The Combined Estimate Held Honestly',
      'The Cause-and-Manner Division Fixed Once',
    ],
  },
  {
    number: 3,
    slug: 'asphyxia-violent',
    title: 'The Asphyxia-and-Violent-Death Register',
    summary:
      'The mechanical deaths: the asphyxia\u2019s craft (the generic-and-signs census with the petechiae\u2019s honesty priced straight — the nonspecific register, the hanging-and-knot craft with the ligature\u2019s mark\u2019s reading, the strangulation-and-manual register with the bruise-and-pattern craft, the drowning\u2019s arc with the and Gettler receipt named and the diatom\u2019s test honesty, the smothering-and-choking division); the thermal-and-electrical register (the burn-and-degree craft with the rule-of-nines honesty, the hypothermia-and-rewarming register, the electrocution\u2019s entry-exit reading with the high-voltage honesty); the and-lightning-and-fetal register named; and the traffic deaths\u2019 craft (the driver\u2019s pedestrian honesty with the pattern\u2019s register — the bumper\u2019s windscreen map).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Petechiae Honesty Priced Straight',
      'The Ligature\u2019s Reading Craft',
      'The Rule-of-Nines Fixed by Drill',
      'The Bumper-and-Windscreen Map',
    ],
  },
  {
    number: 4,
    slug: 'injury-register',
    title: 'The Injury Register',
    summary:
      'The wound\u2019s mechanics: the force\u2019s craft (the velocity\u2019s area arithmetic — the energy\u2019s consequence priced straight); the blunt\u2019s census (the abrasion-and-direction craft with the crust honesty, the bruise\u2019s colour clock with the depth\u2019s true-colour honesty, the laceration\u2019s tissue bridge receipt, the fracture-and-pattern registers named); the sharp\u2019s census (the incised-and-tail craft, the stab\u2019s weapon arithmetic — the track\u2019s depth honesty, the chop-and-heavy register, the healed\u2019s hesitation honesty with the suicidal\u2019s-against-homicidal division); the firearm\u2019s craft (the range\u2019s census with the contact\u2019s tattooing-and-muzzle register — the entry\u2019s exit reading with the bone\u2019s-bevel honesty); and the mechanical\u2019s pattern map (the custodial\u2019s defence honesty with the report\u2019s-craft named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Energy\u2019s Consequence Priced Straight',
      'The Colour Clock with Its Honesty',
      'The Track\u2019s Depth Honesty Held',
      'The Bevel Receipt Named',
    ],
  },
  {
    number: 5,
    slug: 'sexual-offence-examination',
    title: 'The Sexual-Offence-and-Examination Register',
    summary:
      'The sensitive craft: the examination\u2019s frame (the consent\u2019s witness honesty with the chain-of-custody\u2019s craft — the swab-and-kit register, the delay\u2019s honesty with the degradation-and-consequence named); the assault\u2019s reading (the injury-and-genital register with the hymen\u2019s-honesty priced straight — the consensual\u2019s-against-assault division held carefully, the anogenital map with the forensic biology-and-craft named); the victim-and-care register (the trauma\u2019s first response with the prophylaxis\u2019s craft cross-referenced — the STD\u2019s emergency contraception named); the accused\u2019s examination (the consent\u2019s-against-selfincrimination honesty with the timing\u2019s 72-hour register named); and the child\u2019s special honesty (the statement\u2019s forensic interview craft named at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Chain-of-Custody Craft Held',
      'The Hymen Honesty Priced Straight',
      'The Victim-First Register Named',
      'The Special Honesty Held Carefully',
    
      'First Year: Dental Materials'
    ],
  },
  {
    number: 6,
    slug: 'toxicology-identity',
    title: 'The Toxicology-and-Identity Registers',
    summary:
      'The poison and the person: the forensic toxicology\u2019s craft (the poison-and-class census with the corrosive-and-metal-and-pesticide registers — the organophosphate-and-cholinergic receipt with the samples\u2019-and-craft named, the preservative honesty per sample); the identity\u2019s register (the corpus-delicti frame, the fingerprint\u2019s craft with the ridge\u2019s minutiae honesty — the AFIS register named, the DNA\u2019s arc with the STR\u2019s profile arithmetic cross-referenced to biotechnology, the paternity\u2019s inclusion honesty with the 99-exclusion-and-craft named, the dental-and-identity register with the facial-reconstruction named at survey depth); and the anthropology\u2019s craft (the skeleton\u2019s sex-age-stature census with the epiphyseal honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Cholinergic Receipt with Its Samples',
      'The Minutiae Honesty Named',
      'The STR Arithmetic Cross-Referenced',
      'The Skeleton\u2019s Census Held',
    ],
  },
  {
    number: 7,
    slug: 'courtroom-craft',
    title: 'The Courtroom Craft',
    summary:
      'The witness register: the evidence\u2019s division (the fact\u2019s expert honesty fixed once — the opinion-and-permitted register with the cross-examination\u2019s craft); the summons\u2019s witness arc (the oath\u2019s testimony crafts with the record\u2019s signing honesty); the report\u2019s craft (the structure\u2019s honesty — the fact\u2019s opinion\u2019s division inside the report itself with the photograph-and-scale register); the Impartiality\u2019s frame held straight (the prosecution\u2019s defence honesty — the expert serves the court, not a side); and the hanging-and-execution register named at survey depth (the doctor\u2019s legal role with the India\u2019s honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Fact-Expert Division Fixed Once',
      'The Report\u2019s Structure Held',
      'The Impartiality Frame Held Straight',
      'The Doctor\u2019s Legal Role Named',
    
      'Scientific Inquiry and Reasoning Skills: Reasoning about the Design and Execution of Research'
    ],
  },
]

export const forensicMedicine: Book = {
  id: 'forensic-medicine',
  title: 'Forensic Medicine',
  subtitle: 'The law\u2019s medicine — death, injury, identity and the courtroom craft',
  discipline: 'medical-sciences',
  level: 'Undergraduate MBBS core (the medicolegal register)',
  description: 'The medicolegal discipline: the legal frame first (the Indian medical-and-law registers — the MVA\u2019s POA honesty, the medical-ethics arc with the consent-and-capacity craft, the record\u2019s contemporaneous honesty priced straight); the death register (the death\u2019s diagnosis honesty with the brain-death\u2019s organ-donation craft, the post-mortem\u2019s change arc — the algor-mor-rigor-livor census with the time-since-death\u2019s arithmetic priced honestly by its limits); the asphyxia-and-violent-death register (the hanging\u2019s strangulation crafts, the drowning\u2019s diagnosis receipts, the thermal-and-electrical registers); the injury register (the wound-and-mechanics craft — the blunt-and-sharp division with the hesitation\u2019s defence honesty, the firearm-and-range craft with the entry-and-exit reading); the sexual-offence-and-medicolegal register (the examination craft with the consent\u2019s chain honesty); the toxicology\u2019s forensic side (the poison\u2019s census with the forensic samples\u2019 craft); the identity register (the and-fingerprint\u2019s DNA crafts with the paternity honesty); and the courtroom craft (the witness-and-evidence registers with the expert\u2019s honesty).',
  status: 'planned',
  accent: ['#7f1d1d', '#1c1917'],
  chapters,
}

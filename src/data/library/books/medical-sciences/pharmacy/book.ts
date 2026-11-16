import type { Book, Chapter } from '../../../types'

/**
 * Pharmacy — the seventeenth book of the Medical Sciences shelf.
 *
 * STATUS: PLANNED (Medical Sciences full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 20 planned lessons, zero written. Lesson ids will use the `rx-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Pharmacy owns the drug’s-making-and-dispensing register. The pharmacology’s-mechanism to pharmacology (the sibling views — the body’s drug there, the dosage’s product here); the plant’s-register to the biology shelf’s economic-botany (the pharmacognosy cross-reference); the clinical’s-TDM shared with medical-biochemistry; the NEET-and-GPAT lines are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Remington’s The Science and Practice of Pharmacy named as the pole.
 * - Trease-and-Evans’ Pharmacognosy cross-referenced with the Indian co-pole named.
 * - The DTB named as the Indian register with the NCERT-and-GPAT lines as the school ladder.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'profession-history',
    title: 'The Profession Register',
    summary:
      'The discipline\u2019s frame: the history\u2019s arc (the apothecary\u2019s-to-pharmacist honesty with the separation receipt named at survey depth, the Indian arc with the 1948 act named); the craft\u2019s census (the community\u2019s hospital-and-industry division with the each register priced by its honesty — the counter\u2019s counsel crafts, the ward\u2019s TDM crafts, the GMP-and-QA crafts); the code\u2019s register (the ethics\u2019s honesty with the Pharmacy-Act\u2019s named); and the career\u2019s map honesty (the each-path register with the council-and-craft named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Separation Receipt Named',
      'The Three-Craft Division Priced by Its Honesty',
      'The Act Named',
      'The Each-Path Register Held',
    ],
  },
  {
    number: 2,
    slug: 'pharmaceutics',
    title: 'The Pharmaceutics Craft',
    summary:
      'The dosage\u2019s discipline: the form\u2019s census (the solid-and-liquid division with the semisolid-and-sterile registers named); the tablet\u2019s craft (the compression arc with the excipient\u2019s register — the binder-and-disintegrant division with the coating\u2019s honesty, the QC crafts — the hardness\u2019s disintegration\u2019s dissolution tests fixed by drill); the solution\u2019s suspension crafts (the solubility\u2019s honesty with the enhancement\u2019s register — the cosolvent named, the stability\u2019s expiry arithmetic with the Arrhenius named at survey depth, the rheology honesty); the sterile\u2019s register (the parenteral\u2019s-craft with the aseptic\u2019s cross-reference, the ophthalmic\u2019s sterility honesty); and the biopharmaceutic\u2019s arc (the dissolution\u2019s BSC honesty priced straight — the class\u2019s-division with the waiver register named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Excipient Register by Its Functions',
      'The QC Tests Fixed by Drill',
      'The Arrhenius Honesty Named',
      'The BSC Division Priced Straight',
    ],
  },
  {
    number: 3,
    slug: 'pharmacognosy-chem',
    title: 'The Pharmacognosy-and-MedChem Registers',
    summary:
      'The natural-and-molecular craft: the pharmacognosy\u2019s register (the crude\u2019s standardisation honesty with the marker\u2019s craft — the withanolide register named, the alkaloid-and-glycoside census cross-referenced from the biology shelf, the AYUSH\u2019s quality honesty priced straight, the adulteration craft with the DNA-barcoding named); the medicinal-chemistry\u2019s arc (the SAR\u2019s honesty — the structure\u2019s activity relationship held straight on the classic families: the sulfa\u2019s receptor crafts named, the prodrug\u2019s register with the ester\u2019s honesty, the stereochemistry-and-consequence named with the thalidomide receipt priced straight); and the combinatorial-and-modern register named at survey depth (the ADMET honesty with the in-silico craft).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Marker Craft Named',
      'The Thalidomide Receipt Priced Straight',
      'The Prodrug Honesty Held',
      'The In-Silico Craft Named',
    ],
  },
  {
    number: 4,
    slug: 'practice-dispensing',
    title: 'The Practice-and-Dispensing Craft',
    summary:
      'The counter\u2019s discipline: the dispensing\u2019s arc (the prescription-and-reading craft with the parts honesty — the Rx-and-superscription division named, the label\u2019s craft with the auxiliary registers, the container\u2019s honesty); the schedule\u2019s register (the Indian\u2019s division — the H\u2019s H1-and-X honesty priced straight with the Narcotic register named, the OTC division with the counsel\u2019s honesty); the interaction\u2019s craft (the types census cross-referenced from pharmacology — the detect\u2019s craft with the McGinnis named at survey depth, the counsel-and-document register); and the compounding\u2019s craft (the extemporaneous\u2019s honesty with the calculation register — the alligation craft named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Prescription Parts Named',
      'The H-X Honesty Priced Straight',
      'The Counsel Register Held',
      'The Alligation Craft Named',
    ],
  },
  {
    number: 5,
    slug: 'clinical-analysis-regulatory',
    title: 'The Clinical, Analysis-and-Regulatory Registers',
    summary:
      'The lab and the law: the clinical\u2019s arc (the ward-and-round craft with the ADE register — the report\u2019s honesty cross-referenced, the TDM\u2019s craft with the peak-trough cross-referenced from pharmacology, the stewardship\u2019s arc cross-referenced, the patient-counselling craft priced straight); the analysis\u2019s register (the QC\u2019s craft with the titrimetric\u2019s honesty — the Indian-pharmacopoeia\u2019s named, the instrumental\u2019s census: the UV-and-IR division with the HPLC-and-chromatographic craft named at survey depth); the regulatory\u2019s register (the CDSCO\u2019s approval arc with the phase\u2019s honesty — the I-through-IV division cross-referenced from community-medicine, the ANDA\u2019s generics honesty named, the IPRS-pharmacovigilance cross-referenced); and the GMP craft (the schedule-M honesty with the audit register named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The ADE Register Cross-Referenced',
      'The IP Named',
      'The Phase Honesty Cross-Referenced',
      'The Schedule-M Honesty Named',
    ],
  },
]

export const pharmacy: Book = {
  id: 'pharmacy',
  title: 'Pharmacy',
  subtitle: 'The medicine\u2019s discipline — from the molecule to the dispensing counter',
  discipline: 'medical-sciences',
  level: 'Undergraduate BPharm core (the professional register)',
  description: 'The pharmacy discipline: the profession\u2019s register first (the history arc with the apothecary\u2019s honesty, the Indian-Pharmacy-Act registers named, the craft\u2019s census — the community\u2019s hospital-and-industry division); the pharmaceutics\u2019 craft (the dosage-and-form census — the tablet\u2019s compression arc with the excipient\u2019s register, the solution\u2019s suspension crafts with the stability\u2019s honesty, the sterile register with the parenteral\u2019s craft, the biopharmaceutic\u2019s arc — the dissolution\u2019s BSC honesty priced straight); the pharmacokinetics\u2019 applied register (the ADME cross-referenced from pharmacology with the clinical-PK craft — the bayes honesty named at survey depth); the pharmacognosy\u2019s register (the natural\u2019s plant honesty cross-referenced from the biology shelf\u2019s economic-botany book with the alkaloid census, the AYUSH standardisation honesty); the medicinal-chemistry\u2019s register (the structure-activity honesty with the receptor\u2019s-craft — the sar register named on the classic families); the pharmacy-practice craft (the dispensing\u2019s prescription arc with the label\u2019s honesty, the OTC division with the schedule-and-Indian register — the H-and-X honesty priced straight, the interaction\u2019s craft with the counselling register); the clinical-pharmacy arc (the ward-and-round craft with the ADE register, the antimicrobial stewardship cross-referenced, the TDM craft); the pharmaceutical-analysis register (the QC arc with the titrimetric\u2019s instrumental crafts named — the HPLC named at survey depth, the pharmacopoeia honesty); and the regulatory\u2019s register (the DTB\u2019s CDSCO crafts with the pharmacovigilance cross-referenced).',
  status: 'planned',
  accent: ['#4f46e5', '#312e81'],
  chapters,
}

import type { Book, Chapter } from '../../../types'

/**
 * Environmental Chemistry — the sixth book of the Chemistry shelf.
 *
 * STATUS: PLANNED (Chemistry full-shelf planning pass, 2026-11-16) — 7 chapters /
 * 53 planned lessons, zero written. Lesson ids will use the `envchem-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Environmental Chemistry owns the chemistry-side register (the NCERT environmental-chemistry chapter deepened; the JEE/NEET environmental units). The humanities shelf’s environmental-studies book owns the school AEERS register; the engineering shelf’s environmental-engineering book owns the applied treatment engineering — cross-referenced both ways honestly.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The NCERT environmental chemistry register (class 11) and the JEE/NEET environmental units (read this pass in the same syllabus PDFs) as the spine.
 * - The CSIR NET interdisciplinary register (read this pass — green chemistry named in the syllabus PDF) priced for the closing chapter.
 * - The engineering environmental-engineering book's treatment chapters cross-referenced as the applied side.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'atmosphere-and-cycles',
    title: 'The Atmosphere and Its Cycles',
    summary:
      'The atmosphere\u2019s layered structure with the composition ledger; the oxygen-and-carbon cycles told chemically; the nitrogen cycle\u2019s fixation chemistry with the lightning register; and the atmosphere\u2019s radiation honesty previewed for the greenhouse chapter.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Layered Structure',
      'The O-C Ledgers',
      'The Nitrogen Fixation',
      'The Radiation Honesty',
      'Percentage Composition',
      'Black Body Radiation',
      'Exposure of Radiations',
      'Chemical Connections Nitrogen Under Chemical Connections Graphene—Miracle',
      'Hybridization and the Localized Electron Model 345 Chemistry in Your Career Educator and Environmental'
    ],
  },
  {
    number: 2,
    slug: 'air-pollution-chemistry',
    title: 'The Air-Pollution Chemistry',
    summary:
      'The pollutant census — CO, SO2, NOx with their chemical stories; the photochemical smog\u2019s chemistry read as the urban register; the ozone-layer chemistry — the CFC story with the radical catalysis told honestly; and the acid-rain register with its SO2-NOx arithmetic.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Pollutant Census',
      'The Smog Chemistry',
      'The Ozone Story',
      'The Acid-Rain Register',
      'Detergent Molecules Associated with Branched Hydrocarbon Tail Which Is a Source of Pollution',
      'How can Photochemical Smog be Controlled?',
      'Effects of Depletion of the Ozone Layer',
      'Some Suggestions for Reducing Pollution'
    ],
  },
  {
    number: 3,
    slug: 'greenhouse-and-climate',
    title: 'The Greenhouse and Climate Chemistry',
    summary:
      'The greenhouse-gas census with the IR-absorption honesty (the physical book\u2019s spectroscopy cross-referenced); the carbon-oxide registers — the sinks-and-sources ledger; the climate registers told chemically; and the mitigation-chemistry preview with the capture registers named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Greenhouse Census',
      'The IR Honesty',
      'The Carbon Ledger',
      'The Capture Preview',
      'Doug Martin/Science Source',
      'Committee on the Climate Crisis',
      'Science Source Image',
      '/ Science Source',
      'LAGUNA DESIGN / Science Source',
      'Chemical Connections Nitrous Oxide: Laughing Gas',
      'Oxides of phosphorous, arsenic and bismuth'
    ],
  },
  {
    number: 4,
    slug: 'water-pollution-chemistry',
    title: 'The Water-Pollution Chemistry',
    summary:
      'The water register\u2019s pollutants — the heavy-metal and pesticide census with the chemistry told; DO, BOD-and-COD computed as the water\u2019s health ledger; the eutrophication chemistry with the phosphate register; and the groundwater\u2019s arsenic-and-fluoride honesty priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Water Pollutant Census',
      'The DO-BOD-COD Ledger',
      'The Eutrophication Story',
      'The Groundwater Honesty',
      'Fluoride (F–) and Oxalate (C2O4^2–)',
      'Phosphate (PO4^3–) and Arsenate (AsO4^3–)',
      'Determination of Alkalinity in a Given Water Sample',
      'Down sea water process',
      'Arsenic, antimony and bismuth'
    ],
  },
  {
    number: 5,
    slug: 'soil-and-toxic-chemistry',
    title: 'The Soil and Toxic Chemistry',
    summary:
      'The soil\u2019s chemistry with the humus-and-nutrient registers; the pesticide census classified — the chlorinated-and-organophosphate families with the persistence honesty; the biomagnification register with the DDT story told honestly; and the heavy-metal soil registers with the remediation preview.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Soil Register',
      'The Pesticide Census',
      'The Biomagnification Story',
      'The Remediation Preview',
    ],
  },
  {
    number: 6,
    slug: 'waste-and-treatment',
    title: 'The Waste and Treatment Crafts',
    summary:
      'The water-treatment census — coagulation, the chlorination craft, the ozonation register; the wastewater ledger — the primary-secondary-tertiary registers (the engineering book\u2019s plant side cross-referenced); the solid-waste chemistry; and the green-chemistry register with the twelve principles named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Water-Treatment Census',
      'The Wastewater Ledger',
      'The Solid Register',
      'The Green Chemistry Register',
      'Ferrous Sulphate [FeSO4.7H2O] (Green Vitriol)',
      'Nobel Laureates in Green Chemistry and Metathesis',
      'Internal Treatment of Hardness by Calgon Process (Sequestration)',
      'Exact Treatment of Ionization Equilibri'
    ],
  },
  {
    number: 7,
    slug: 'monitoring-and-doorway',
    title: 'The Monitoring and Doorway Crafts',
    summary:
      'The ambient-monitoring register with the standards census — the BIS-and-WHO registers named; the analytical methods borrowed honestly (the analytical book\u2019s cross-reference); the EIA register priced briefly; and the research doorway marked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ambient Register',
      'The Standards Census',
      'The Analytical Borrowing',
      'The Research Doorway',
    ],
  },
]

export const environmentalChemistry: Book = {
  id: 'environmental-chemistry',
  title: 'Environmental Chemistry',
  subtitle: 'The chemistry of the environment: atmosphere, water and soil registers with the pollution and treatment crafts',
  discipline: 'chemistry',
  level: 'Class 11-12 + university register',
  description: 'The environmental register for the chemist: the atmosphere\u2019s structure and cycles, the air-pollution chemistry with the smog-and-ozone registers, the greenhouse-and-climate chemistry, the water-and-soil pollution registers with the biomagnification honesty, the treatment crafts, and the monitoring doorway.',
  status: 'planned',
  accent: ['#84cc16', '#3f6212'],
  chapters,
}

import type { Book, Chapter } from '../../../types'

/**
 * Clinical Immunology — the eighth book of the Medical Sciences shelf.
 *
 * STATUS: PLANNED (Medical Sciences full-shelf planning pass, 2026-11-16) — 6 chapters /
 * 24 planned lessons, zero written. Lesson ids will use the `climm-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Clinical Immunology owns the bedside register. The general machinery (the clonal selection, the receptor’s craft) belongs to the biology shelf’s immunology book (the sibling views — machinery there, clinic here); the pathogen-and-HIV register to medical-microbiology; the immunosuppressant-and-drug register to pharmacology; the autoimmune mechanism’s depth cross-referenced from pathology; the NEET-and-FMGE lines are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Abbas’ and Lichtman’s Basic Immunology named as the clinical pole with Janway’s cross-referenced from the biology shelf.
 * - The NCERT class 12 human-health chapter as the school ladder (the NEET register).
 * - The Indian transplant-and-vaccine registers named at survey depth.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'bridge-review',
    title: 'The Bridge-and-Review Register',
    summary:
      'The clinical reading of the machinery: the one-chapter review (the innate-and-adaptive census, the clonal-selection receipt, the antibody\u2019s T-cell crafts — each named in one honest paragraph with the full register cross-referenced to the biology shelf\u2019s immunology book); the clinical-and-reading craft (the immune\u2019s failure\u2019s three kinds held straight — the deficient, the dysregulated and the overactive registers as the book\u2019s-own map); the immune-and-window register (the infant\u2019s maternal-IgG honesty with the vaccination\u2019s timing consequence named); and the diagnostic\u2019s preview (the serology\u2019s interpretation honesty previewed for the last chapter\u2019s-own depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Machinery Reviewed in One Honest Paragraph',
      'The Three Failure Kinds as the Map',
      'The Maternal-IgG Window Named',
      'The Serology Preview Held',
    ],
  },
  {
    number: 2,
    slug: 'immunodeficiency',
    title: 'The Immunodeficiency Register',
    summary:
      'The deficient\u2019s map: the primary-and-secondary division fixed once (the recurrent\u2019s pattern honesty — the organism\u2019s kind as the immune\u2019s arm confession: the pyogenic-and-antibody register against the opportunistic\u2019s T-cell register priced straight); the primary\u2019s census (the X-linked-and-agammaglobulinaemia craft with the boys honesty, the SCID-and-bubble register with the gene-therapy receipt named, the DiGeorge-and-thymic craft, the complement-and-deficiency registers with the Neisseria confession named); the secondary\u2019s census (the malnutrition\u2019s first honesty, the HIV\u2019s arc with the CD4\u2019s staging arithmetic — the opportunism\u2019s map cross-referenced, the transplant-and-iatrogenic register); and the workup\u2019s craft (the screening\u2019s panel honesty with the acute-phase register named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Pattern Honesty Priced Straight',
      'The Organism as the Arm\u2019s Confession',
      'The CD4 Staging Arithmetic Cross-Referenced',
      'The Screening Panel Named',
    ],
  },
  {
    number: 3,
    slug: 'hypersensitivity',
    title: 'The Hypersensitivity Register',
    summary:
      'The overactive\u2019s map: the four types\u2019 clinical crafts (the type-I\u2019s anaphylaxis arc — the IgE-and-mast craft with the adrenaline\u2019s IM arithmetic priced straight, the skin-prick-and-RAST registers, the asthma\u2019s phenotype honesty with the hygiene hypothesis named); the type-II\u2019s cytotoxic map (the transfusion\u2019s haemolytic crafts with the Rh-and-pregnancy register — the anti-D receipt priced straight, the Goodpasture named); the type-III\u2019s complex map (the serum-sickness craft with the RA-and-lupus registers, the post-streptococcal-and-glomerulonephritis receipt named); the type-IV\u2019s delayed map (the contact-and-patch craft with the nickel honesty, the TB-and-Mantoux register with the reading\u2019s induration arithmetic); and the desensitisation-and-modern register named (the biologic-and-class craft at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Anaphylaxis Arithmetic Priced Straight',
      'The Anti-D Receipt Held',
      'The Induration Arithmetic Fixed by Drill',
      'The Biologic Register Named',
    ],
  },
  {
    number: 4,
    slug: 'autoimmunity',
    title: 'The Autoimmunity Register',
    summary:
      'The dysregulated\u2019s map: the mechanism\u2019s review (the tolerance-loss\u2019s three routes cross-referenced from the general book — the molecular-mimicry\u2019s cryptic-antigen-and-Treg registers); the organ-specific\u2019s census (the Hashimoto\u2019s Graves crafts with the antibody\u2019s TRAb honesty, the T1D-and-screening register, the myasthenia\u2019s antibody arc with the tensilon honesty named); the systemic\u2019s census (the SLE-and-criteria craft with the ANA\u2019s titre reading — the pattern\u2019s honesty priced straight with the dsDNA-and-specificity receipt, the mixed-and-MCTD named, the Sjogren-and-sicca register); the rheumatoid\u2019s craft (the ACPA\u2019s titer honesty with the joint\u2019s erosion consequence cross-referenced to pathology); and the treatment-and-principle register (the steroid\u2019s sparing honesty with the biologic-and-LEVER named at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three Routes Reviewed',
      'The ANA Pattern Honesty Priced Straight',
      'The ACPA Receipt Named',
      'The Sparing Principle Held',
    ],
  },
  {
    number: 5,
    slug: 'transplantation',
    title: 'The Transplantation Register',
    summary:
      'The grafted map: the HLA-and-typing craft (the six-antigen honesty with the matching\u2019s allocation arithmetic — the living-and-deceased division with the Indian-and-THOA register named at survey depth); the rejection\u2019s three-kind map (the hyperacute-and-antibody craft with the crossmatch\u2019s prevention honesty, the acute-and-cellular register with the biopsy-and-grading craft, the chronic\u2019s insidious honesty named); the immunosuppression\u2019s register (the class\u2019s census cross-referenced to pharmacology — the calcineurin-and-inhibitor craft with the and-nephrotoxicity consequence, the antiproliferative-and-steroid register with the infection\u2019s malignancy price honestly named); the GVHD-and-register named (the bone-marrow\u2019s-own consequence); and the transfusion\u2019s transplant honesty (the blood-as-the first transplant — the crossmatch craft reviewed once).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Matching Arithmetic Held',
      'The Three-Kind Map with the Biopsy Craft',
      'The Nephrotoxicity Consequence Named',
      'The First-Transplant Honesty Reviewed Once',
    ],
  },
  {
    number: 6,
    slug: 'tumour-vaccines-diagnosis',
    title: 'The Tumour, Vaccine-and-Diagnostics Registers',
    summary:
      'The applied registers: the tumour-and-immunology craft (the surveillance\u2019s editing hypothesis with the T-cell\u2019s response honesty — the checkpoint\u2019s inhibitor arc priced straight: the PD-1\u2019s CTLA-4 crafts with the response\u2019s price honesty, the CAR-T-and-chimeric receipt named at survey depth); the vaccine-and-clinical register (the type\u2019s efficacy arithmetic with the herd-and-threshold craft cross-referenced from the general book, the schedule-and-Indian register — the and UIP\u2019s honesty with the catch-up\u2019s craft, the cold-chain\u2019s arithmetic cross-referenced to community-medicine); and the diagnostics\u2019 register (the serology-and-interpretation craft — the titre\u2019s fourfold-rise honesty, the avidity\u2019s acute-against-past register, the ELISA\u2019s Western crafts with the confirmatory\u2019s sequential honesty, the flow\u2019s CD-counting craft with the HIV-and-monitoring register).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Checkpoint Arc Priced Straight',
      'The CAR-T Receipt Named',
      'The Fourfold-Rise Honesty Held',
      'The Sequential Confirmatory Honesty',
    ],
  },
]

export const clinicalImmunology: Book = {
  id: 'clinical-immunology',
  title: 'Clinical Immunology',
  subtitle: 'The immune system at the bedside — deficiency, hypersensitivity, autoimmunity and the transplant register',
  discipline: 'medical-sciences',
  level: 'Undergraduate MBBS core (the clinical register; the general register owned by the biology shelf)',
  description: 'The immune discipline in its clinical register: the review-and-bridge first (the innate-and-adaptive census with the clinical-reading — the sibling view cross-referenced to the biology shelf\u2019s immunology book which owns the general machinery); the immunodeficiency\u2019s register (the primary-and-secondary division with the recurrent-infection\u2019s honesty — the pattern-and-diagnostic craft; the HIV\u2019s arc owned at the clinical level with the CD4\u2019s staging arithmetic cross-referenced to medical-microbiology); the hypersensitivity\u2019s register in full (the four types\u2019 clinical maps — the anaphylaxis-and-adrenaline craft with the allergy\u2019s skin-prick register; the transfusion\u2019s hemolytic consequences; the immune-complex\u2019s renal registry; the contact\u2019s TB crafts with the patch\u2019s Mantoux honesty); the autoimmunity\u2019s register (the tolerance-loss mechanism cross-referenced from the general book with the disease\u2019s organ map — the SLE-and-criteria craft, the thyroid-and-T1D registers, the rheumatoid register); the transplantation\u2019s register (the HLA-and-typing craft with the matching\u2019s allocation honesty, the rejection\u2019s three-kind map with the immunosuppressant-and-class register cross-referenced to pharmacology); the tumour-immunology register named (the surveillance craft with the checkpoint\u2019s inhibitor honesty priced straight); the vaccine-and-clinical register (the types\u2019 efficacy arithmetic with the schedule\u2019s catch-up craft); and the immunological-diagnostics register (the ELISA\u2019s Western crafts with the serology\u2019s interpretation honesty — the titre\u2019s avidity arithmetic).',
  status: 'planned',
  accent: ['#db2777', '#831843'],
  chapters,
}

import type { Book, Chapter } from '../../../types'

/**
 * Immunology — the ninth book of the Biology shelf.
 *
 * STATUS: PLANNED (Biology full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 32 planned lessons, zero written. Lesson ids will use the `immu-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Immunology owns the general register of the immune system. The clinical disease registers (the immunodeficiency syndromes, the transplant-and-tumor immunology at clinical depth, the hypersensitivity disease management) belong to the medical shelf’s clinical-immunology (the sibling clinical view, cross-referenced); the vaccines’ public-health register is shared with community-medicine; the monoclonal-antibody technique is cross-referenced to biotechnology; the NEET human-health unit is priced at the general level here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Campbell Biology 12th edition — the innate-and-acquired-immunity chapters (read this pass) as the spine.
 * - The NCERT class 12 human-health-and-disease chapter as the school ladder.
 * - Janeway-and-Immunobiology named as the university pole (the clonal-selection and tolerance registers).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'innate-barriers-inflammation',
    title: 'The Innate Register',
    summary:
      'The always-on defence: the barriers\u2019 census (the skin\u2019s keratin-and-acid craft, the mucous membranes\u2019 trapping-and-ciliary escalator, the stomach\u2019s acid, the lysozyme tear); the inflammation\u2019s engine (the cytokine-and-histamine release, the vasodilation-and-permeability arithmetic, the neutrophil\u2019s margin-and-extravasation craft — the four signs told by their mechanism); the phagocyte census (the neutrophil\u2019s fast-and-short life, the macrophage\u2019s resident-and-activated registers, the eosinophil-and-parasite register); the complement cascade (the classical-and-alternative-and-lectin paths, the C3-convertase craft, the MAC terminal — the cascade\u2019s amplification arithmetic priced); and the NK cell as the missing-self detector.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Barriers\u2019 Census',
      'The Inflammation\u2019s Engine',
      'The Phagocyte Census',
      'The Complement Arithmetic',
    ],
  },
  {
    number: 2,
    slug: 'mhc-presentation',
    title: 'The Identity Cards and the Bridge',
    summary:
      'The antigen\u2019s display: the antigen-processing craft — the endogenous path (the proteasome\u2019s fragments onto MHC class I — every cell\u2019s forced confession of what it is making, the virally-infected receipt) against the exogenous path (the phagocytosed fragments onto MHC class II — the professional register); the MHC molecules\u2019 structure at survey depth (the groove\u2019s allele-variable honesty — why the transplant rejection lives in these genes, the HLA cross-reference); the dendritic cell as the bridge\u2019s courier (the tissue\u2019s patrol that matures and travels to the node with its cargo); and the CD8-against-CD4 reading rule fixed once — the co-receptor as the lock\u2019s second key.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two Processing Paths',
      'The Groove\u2019s Allele Honesty',
      'The Dendritic Courier',
      'The Reading Rule Fixed',
    ],
  },
  {
    number: 3,
    slug: 'b-cell-antibody',
    title: 'The B Cell and the Antibody Craft',
    summary:
      'The humoral machinery: the clonal-selection principle earned (the repertoire\u2019s generation by the random VDJ recombination — the combinatorial arithmetic honestly priced, the selection by antigen as the expansion\u2019s trigger); the antibody\u2019s anatomy (the Y shape, the heavy-and-light chains, the variable-and-constant domains, the hypervariable loops\u2019 contact craft, the class-switching of the Fc tail); the five classes\u2019 census (the IgM pentamer first, the IgG\u2019s opsonic-and-placental registers, the IgA-and-secretory craft, the IgE\u2019s parasite-and-allergy register, the IgD\u2019s naive role); the affinity maturation (the germinal-centre\u2019s somatic-hypermutation-and-selection engine — the improvement-by-mutation priced); the memory register (the plasma cell\u2019s decade-long antibody vs the memory B cell\u2019s fast recall); and the monoclonal technique (the hybridoma arc) cross-referenced to biotechnology.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Clonal-Selection Principle Earned',
      'The Antibody\u2019s Anatomy and Classes',
      'The Affinity-Maturation Engine',
      'The Memory Register and the Hybridoma Door',
    ],
  },
  {
    number: 4,
    slug: 't-cell-craft',
    title: 'The T Cell\u2019s Craft',
    summary:
      'The cellular machinery: the thymus\u2019s education (the positive selection of the self-MHC readers, the negative selection of the too-self-reactive — the tolerance earned in the organ, the Treg\u2019s survival honesty); the CD8 cytotoxic craft (the perforin-granzyme kill, the Fas-ligand register, the serial-killer arithmetic); the CD4 helper\u2019s orchestration (the Th1-Th2-Th17-Tfh census with their cytokine signatures — the response\u2019s chosen direction, the class-switching instructions); the delayed-type hypersensitivity preview (owned at clinical depth downstream); the T-cell memory register; and the MHC-restriction arc (Zinkernagel-and-Doherty-and-Nobel receipt — the recognition as the double key of receptor-and-self).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Thymic Education',
      'The Cytotoxic Kill Craft',
      'The Helper\u2019s Orchestration',
      'The Restriction Arc Earned',
    ],
  },
  {
    number: 5,
    slug: 'regulation-tolerance',
    title: 'The Regulation and Tolerance Question',
    summary:
      'The system\u2019s discipline: the self-and-non-self logic as the field\u2019s founding question (the danger-and-infectious-non-self refinements priced at survey depth); the central tolerance (the thymic-and-marrow deletion registers — the editor\u2019s craft); the peripheral tolerance census (the anergy\u2019s signal-two absence, the deletion, the Treg\u2019s active suppression — the FoxP3 honesty and the IPEX register); the privilege of the eye-and-brain-and-testis (the barrier-and-suppression registers); the maternal-fetal tolerance as the system\u2019s own standing puzzle (the placenta-and-local registers priced); and the failure census previewed (the autoimmunity-and-allergy-and-transplant registers owned downstream) — the question held honestly: why does the healthy system not attack itself?',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Founding Question and Its Refinements',
      'The Central Editor\u2019s Craft',
      'The Peripheral Census',
      'The Maternal Puzzle and the Held Question',
    ],
  },
  {
    number: 6,
    slug: 'immunopathology',
    title: 'The Immunopathology Census',
    summary:
      'The system\u2019s failures at general depth (the clinical management owned by the medical shelf): the four hypersensitivities — the immediate I (the IgE-mast-cell-histamine engine with the anaphylaxis arithmetic), the cytotoxic II (the transfusion-and-hemolytic registers), the immune-complex III (the deposition arithmetic), the delayed IV (the contact-and-TB registers); the autoimmunity census (the loss-of-tolerance mechanisms — the molecular-mimicry, the cryptic-antigen, the Treg failure registers, the lupus-and-thyroid-and-T1D examples priced at survey depth); the immunodeficiency arc (the primary-and-secondary registers, the SCID honesty, the HIV mechanism cross-referenced with its clinical detail downstream); and the transplant rejection preview (the host-versus-graft logic priced for the clinical book\u2019s ownership).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Four Hypersensitivities Earned',
      'The Autoimmunity Mechanisms',
      'The Immunodeficiency Arc',
      'The Transplant Preview',
    ],
  },
  {
    number: 7,
    slug: 'vaccines',
    title: 'The Vaccines\u2019 Craft',
    summary:
      'The memory exploited: the arc (Jenner-and-cowpox receipt, Pasteur\u2019s attenuation, the eradication of smallpox as the discipline\u2019s crown — the ring-vaccination arithmetic priced); the vaccines\u2019 census (the live-attenuated, the inactivated, the subunit-and-conjugate crafts with their herd-and-memory trade-offs, the toxoid register, the mRNA platform arc priced honestly as the thirty-year overnight); the adjuvant register (the alum-and-oil crafts as the innate-borrowing honesty); the herd-immunity arithmetic (the threshold formula priced on real numbers — the R0-to-coverage craft); the schedule craft (the prime-boost logic, the maternal-and-neonatal registers); and the honest difficulties (the cold chain, the waning, the needle-free-and-mucosal frontiers named) — the vaccine priced as immunology\u2019s greatest applied receipt.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Arc and the Eradication Crown',
      'The Vaccines\u2019 Census and the mRNA Story',
      'The Herd Arithmetic',
      'The Honest Difficulties',
    ],
  },
  {
    number: 8,
    slug: 'techniques-doorway',
    title: 'The Techniques and the Doorway',
    summary:
      'The laboratory register: the antigen-antibody craft as the instrument — the precipitation-and-agglutination basics, the ELISA\u2019s sandwich arithmetic (the enzyme\u2019s colour as the quantitative receipt), the Western blot-and-specificity craft, the immunofluorescence register, the flow-cytometry idea (the cell census by the fluorescent-antibody craft — the CD-gated counting); the serology register (the titre-and-acute-convalescent craft); the transplantation-and-diagnostics cross-references drawn; and the doorway — the immunology register\u2019s place on the shelf: the general machinery here, the clinical disease registers on the medical shelf, the technique exploitations in biotechnology, the research frontier (the tolerance-and-tumour-and-mucosal questions) held as the open field it remains.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Antigen-Antibody Instrument',
      'The ELISA and Western Crafts',
      'The Flow-Cytometry Idea',
      'The Doorway Drawn',
    ],
  },
]

export const immunology: Book = {
  id: 'immunology',
  title: 'Immunology',
  subtitle: 'The body\u2019s recognition system — innate and adaptive immunity, the antibody craft and the tolerance question',
  discipline: 'biology',
  level: 'Undergraduate core (the general register; the clinical disease register owned by the medical shelf)',
  description: 'The defence discipline from first principles: the innate register — the barriers (the skin, the mucous craft), the inflammatory response\u2019s Vasodilation engine, the phagocyte census (the neutrophil-and-macrophage craft, the complement\u2019s cascade arithmetic with its MAC terminal), the NK register; the innate-to-adaptive bridge (the dendritic cell\u2019s presentation, the MHC molecules as the identity cards — class I for every cell, class II for the professionals); the adaptive machinery — the lymphocyte census, the clonal-selection principle as the theory that explains it all, the B-cell register (the antibody\u2019s structure — the variable-and-constant domain craft, the five classes, the affinity-maturation engine of somatic hypermutation, the memory that makes vaccination work), the T-cell register (the CD4-and-CD8 split, the cytotoxic kill craft, the helper\u2019s cytokine orchestration); the regulation-and-tolerance question (the self-and-non-self logic, the central-and-peripheral deletion, the regulatory-T register); the immunopathology census (the four hypersensitivities, the autoimmunity mechanisms, the immunodeficiency arc) priced at general depth with the clinical detail owned downstream; the vaccines\u2019 craft; and the immunological techniques (the ELISA-and-Western registers) as the laboratory door.',
  status: 'planned',
  accent: ['#db2777', '#831843'],
  chapters,
}

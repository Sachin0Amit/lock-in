import type { Book, Chapter } from '../../../types'

/**
 * Microbiology — the eighth book of the Biology shelf.
 *
 * STATUS: PLANNED (Biology full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 40 planned lessons, zero written. Lesson ids will use the `bact-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Microbiology owns the general register of microbes. The pathogenesis and disease registers belong to the medical shelf’s medical-microbiology (the clinical view, cross-referenced as the sibling view); the immune response to microbes belongs to immunology; the recombinant tools (E. coli as the workhorse) belong to biotechnology; the molecular machinery inside viruses (the lytic craft) is shared with molecular-biology at intro depth only; the NEET micro-disease unit is priced here at the general level with the clinical detail owned downstream.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Campbell Biology 12th edition — the microbial-diversity chapters of Unit 5 (read this pass: the prokaryotes chapter, the viruses chapter, the fungi and protist surveys) as the spine.
 * - The NCERT class 11-12 micro-organisms and human-welfare chapter as the school ladder.
 * - Tortora-and-Microbiology named as the university pole (the growth-curve and control registers).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'discovery',
    title: 'The Discovery Register',
    summary:
      'The discipline\u2019s opening proofs: Leeuwenhoek\u2019s letters and the first drawings; the spontaneous-generation debate settled by Pasteur\u2019s swan-neck flask (the design\u2019s logic — the dust trapped, the broth clear); Tyndall and Cohn\u2019s contributions to the aseptic craft; Koch\u2019s postulates earned — the four-step disease-proof (isolate, culture, reinoculate, re-isolate) with its honest limits (the carrier states, the unculturable, the molecular-era addition of the sequence-based fifth postulate); the pure-culture craft (the streak plate, the media census — the defined against the enriched); and the golden-age arc from anthrax to the germ-theory hospital registers.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Swan-Neck Logic',
      'Koch\u2019s Postulates Earned',
      'The Pure-Culture Craft',
      'The Golden-Age Arc',
      'The Microscopy Register: Light to Electron',
    ],
  },
  {
    number: 2,
    slug: 'bacterial-structure',
    title: 'The Bacterial Architecture',
    summary:
      'The small cell told in full: the Gram craft (the wall\u2019s thickness and the crystal-violet trap — why the wall difference makes the colour difference); the LPS honesty of the Gram-negatives (the endotoxin register deferred to the medical shelf); the morphological census (the cocci\u2019s arrangements, the bacilli, the spirilla and spirochetes); the capsule and biofilm registers (the attachment-and-community craft — the plaque and catheter realities); the flagellar motor priced at the rotating-propeller depth; the endospore as the survival\u2019s hardest form (the anthrax register); and the size arithmetic (why the small is fast — the surface-volume honest consequence).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Gram Craft and the Wall Difference',
      'The Morphological Census',
      'The Biofilm Community',
      'The Spore and the Size Honesty',
      'The Prokaryotic Cell: Structure and Function',
      'The Morphology of Bacteria',
      'Living Organisms Exist in a Dynamic Steady Macromolecular Structure and Function'
    ],
  },
  {
    number: 3,
    slug: 'growth-metabolism',
    title: 'Growth and the Metabolic Diversity',
    summary:
      'The census and the chemistry\u2019s breadth: the growth curve\u2019s four phases (lag, exponential, stationary with its carrying-capacity honesty, death) and the generation-time arithmetic priced on real numbers; the counting craft (the viable-count pour-and-spread against the turbidity\u2019s total honesty); the metabolic census — the carbon-and-energy matrices (the photoautotroph, chemoautotroph, photoheterotroph, chemoheterotroph register) with the ecological receipt of each guild; the oxygen census (the obligate-and-facultative anaerobe register with the catalase-and-superoxide tests); the nitrogen-cycle microbes named (the fixers, nitrifiers, denitrifiers — the ecology book\u2019s cycle owned here at the organism level); and the extremophile register (the thermophiles, halophiles, methanogens) with the archaea as the third domain honestly introduced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Growth Curve and Its Arithmetic',
      'The Counting Craft',
      'The Metabolic Matrices',
      'The Extremophiles and the Archaea',
      'The Metabolic Diversity: Entner-Doudoroff, Glyoxylate and Chemolithotrophy',
      'Glycolysis: The Universal Pathway',
      'Redox Reactions, Electron Transport and Oxidative Phosphorylation',
      'Photosynthesis and the Calvin Cycle in Microbes',
      'Growth and Death Kinetics with Serial Dilution',
      'We lack the space here to acknowledge all the other 12 Biochemical Signaling',
      'Of Wisconsin-Madison, who helped us with advice and 19 Oxidative Phosphorylation'
    ],
  },
  {
    number: 4,
    slug: 'bacterial-genetics',
    title: 'The Bacterial Genetics',
    summary:
      'The horizontal register: the three transfers — transformation (the Griffith-Avery arc as the DNA-is-the gene proof, the competence craft), conjugation (the F-plasmid\u2019s pilus, the Hfr integration and its interrupt-mating maps, the resistance-plasmid reality), transduction (the phage\u2019s accident as the packaging mistake that carries genes); the recombination receipt; the regulation\u2019s cross-reference to the molecular book\u2019s operon chapter; the mutation register at the microbial level (the replica-plating craft, the Ames test); and the significance honestly priced — the horizontal transfer as evolution\u2019s fast lane and the resistance era\u2019s engine, the biotechnology book\u2019s opening door.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three Transfers Earned',
      'The Hfr Maps',
      'The Replica-Plating Craft',
      'The Fast-Lane Significance',
      'PCR, Real-Time PCR and Sequencing in Microbiology',
    ],
  },
  {
    number: 5,
    slug: 'viruses',
    title: 'The Viral Register',
    summary:
      'The chemistry-only edge: the structure census (the capsid\u2019s two symmetries, the envelope, the genome\u2019s four combinations — dsDNA, ssDNA, dsRNA, ssRNA with the sense-and-antisense honesty); the two cycles (the lytic and lysogenic — the lambda switch priced at the operator depth); the bacteriophage\u2019s craft (the T4 structure, the plaque assay); the animal viruses\u2019 entry-and-release register (the endocytosis, the budding); the retrovirus\u2019s reverse transcriptase (the HIV arc deferred to the medical shelf with the drug-register cross-reference); the plant viruses (the TMV as the classic); the prion honesty (the protein-only infectious claim priced as the still-astonishing proposition it is); and the virus-as-life debate settled honestly — the edge-of-life register.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Genome Census and the Capsid Craft',
      'The Two Cycles and the Lambda Switch',
      'The Retro Register',
      'The Prion Honesty',
      'Viruses, Viroids and the Subviral Agents',
    ],
  },
  {
    number: 6,
    slug: 'fungi',
    title: 'The Fungal Register',
    summary:
      'The decomposers\u2019 discipline: the body plan (the hypha and mycelium, the cell wall-and-chitin craft); the growth-and-reproduction register (the sporangia and conidia, the sexual-cycling honesty of the asco-and-basidio differences priced at survey depth); the nutritional honesty (the absorptive heterotroph, the saprobic against parasitic-and-mutualistic registers); the mutualism census (the mycorrhiza as the root-fungus market — the plant-ecology cross-reference, the lichen as the alga-fungus composite with its pollution-monitoring receipt); the economic registers (the yeast-and-fermentation craft, the antibiotics\u2019 Penicillium arc, the mould-and-mushroom foods); the medical register deferred (the pathogenic species named, the detail owned by the medical shelf); and the ecology\u2019s honest crown — the world\u2019s great recyclers.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Hypha and the Mycelium',
      'The Mutualism Census',
      'The Economic Registers',
      'The Recyclers\u2019 Crown',
    ],
  },
  {
    number: 7,
    slug: 'protists',
    title: 'The Protist Census',
    summary:
      'The eukaryotic ancestors\u2019 survey: the register honestly framed (the polyphyletic convenience, the modern-phylogeny caveat that dissolves the old kingdom); the algae census (the green-and-brown-and-red registers, the diatom-and-silica craft and the ocean\u2019s productivity engine, the dinoflagellate\u2019s red-tide register); the protozoa (the amoeboid-and-flagellated-and-ciliate crafts, the Paramecium as the classic, the Vorticella\u2019s stalk); the slime-mould honesty (the plasmodium as the brainless-network wonder); the parasitic register deferred to the parasitology book (the Plasmodium arc named as the downstream door); and the origin receipt — the protists as the endosymbiosis\u2019s stage and the ancestors of the plants, fungi and animals.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Polyphyletic Honesty',
      'The Algae Census and the Diatom Engine',
      'The Ciliate Crafts',
      'The Origin Receipt',
    ],
  },
  {
    number: 8,
    slug: 'control-resistance',
    title: 'The Control Craft and the Resistance Era',
    summary:
      'The war on the unseen: the sterilisation census (the heat register — autoclave\u2019s 121-at-15-minutes arithmetic, the pasteurisation\u2019s mild honesty, the dry-heat and flame registers; the filtration; the radiation; the chemical register — the phenol-and-alcohol-and-halogen census with their denature-and-oxidise mechanisms); the antibiotic arc — Fleming\u2019s mould plate as the accidental receipt, the Waksan-and-Florey scale-up, the classes\u2019 census with their targets (the wall, the ribosome, the DNA-and-RNA machines, the folate path); the resistance era honestly told (the selection receipt, the horizontal transfer\u2019s spread engine, the stewardship and discovery-gap registers); and the food-and-industry control (the canning-and-cold-pasteurisation crafts) — the control priced as management, never victory.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Sterilisation Census and Its Arithmetic',
      'The Antibiotic Arc and the Classes\u2019 Targets',
      'The Resistance Era Honestly Told',
      'The Management Honesty',
      'Disinfection and Sterilization',
    ],
  },
  {
    number: 9,
    slug: 'applied-register',
    title: 'The Applied Register',
    summary:
      'The microbes at work: the industrial fermentations\u2019 census (the beer-and-wine-and-bread yeast registers, the dairy\u2019s yoghurt-and-cheese crafts, the citric-and-amino-acid fermentations); the pharmaceutical registers (the antibiotics\u2019 production, the steroids-and-vaccine-and-insulin biotech arcs cross-referenced); the environmental microbes (the wastewater craft — the activated-sludge honesty, the bioremediation of the oil-and-metal registers, the geoengineering idea priced as the speculation it remains); the normal flora census (the gut-and-skin-and-oral microbiota with its 39-trillion honesty and its probiotic debate priced straight); the food-microbiological safety craft (the HACCP frame named); and the microbial-ecology crown — the unseen majority running the biosphere\u2019s chemistry.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Fermentation Census',
      'The Pharmaceutical Registers',
      'The Environmental Craft',
      'The Normal Flora and the Crown',
      'Microbes in Human Welfare: Sewage Treatment, Energy, Biocontrol and Biofertilisers',
      'Metagenomics and the Uncultivable Microorganisms',
      'Fermented Foods and Beverages',
      'Household and Industrial Microbial Products with Biogas',
      'The Role of Microorganisms in Organic Matter and Disease',
      'Antigen and Antibody Detection in Microbial Diagnosis',
      'Aerobic and Anaerobic Respiration with Chemolithotrophy',
      'The competing demands on our time; to our colleagues 18 Amino Acid Oxidation and the'
    ],
  },
]

export const microbiology: Book = {
  id: 'microbiology',
  title: 'Microbiology',
  subtitle: 'The unseen majority — bacteria, archaea, viruses, fungi and protists, from structure to ecosystems',
  discipline: 'biology',
  level: 'Secondary → undergraduate (NEET microbiology priced; the general register; the clinical register owned by the medical shelf)',
  description: 'The microbial world as a discipline in its own right: the discovery register (Leeuwenhoek\u2019s animalcules, Pasteur\u2019s swan-neck refutation of spontaneous generation, Koch\u2019s postulates as the disease-proof craft, the pure-culture technique); the bacteria — the Gram wall craft, the morphological census (cocci, bacilli, the spirals), the growth curve and its arithmetic, the metabolic diversity that owns the biosphere\u2019s chemistry (the autotroph-heterotroph, the aerobe-anaerobe censuses); the bacterial genetics register (transformation, conjugation and transduction — the horizontal transfer that the molecular book introduced); the viruses as the obligate parasites of the chemistry-only edge (the structure, the two cycles, the plant-animal-and-bacterial families); the fungi (the yeast and mould registers, the mutualisms); the protists as the eukaryotic ancestors\u2019 census; the control craft (sterilisation, the antibiotics\u2019 discovery and the resistance era honestly told); and the applied register (the industrial fermentations, the environmental microbes, the normal flora) with the pathogenic register deferred to the medical shelf.',
  status: 'planned',
  accent: ['#7c3aed', '#4c1d95'],
  chapters,
}

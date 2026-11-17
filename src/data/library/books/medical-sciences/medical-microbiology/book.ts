import type { Book, Chapter } from '../../../types'

/**
 * Medical Microbiology — the seventh book of the Medical Sciences shelf.
 *
 * STATUS: PLANNED (Medical Sciences full-shelf planning pass, 2026-11-16) — 7 chapters /
 * 29 planned lessons, zero written. Lesson ids will use the `medmic-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Medical Microbiology owns the clinical pathogen register. The organisms’ general biology belongs to the biology shelf’s microbiology (the sibling views — the organism there, the disease here); the host’s immune answer to clinical-immunology; the drug-and-antimicrobial register to pharmacology; the parasitology’s clinical map cross-referenced to the biology shelf’s parasitology book; the NEET-and-FMGE lines are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Ananthanarayan and Paniker’s Textbook of Microbiology named as the university pole (the Indian clinical register).
 * - Prescott’s Murray co-poles named for the laboratory register.
 * - The biology shelf’s microbiology book cross-referenced as the general pole (the sibling view).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'host-pathogen-lab',
    title: 'The Host-Pathogen-and-Laboratory Craft',
    summary:
      'The frame and the tool: the normal flora\u2019s register (the site census with the opportunism\u2019s honesty — the antibiotic\u2019s candida consequence named); the virulence-and-factor census (the adhesion\u2019s capsule crafts, the toxin\u2019s exo-endo division — the exotoxin-and-AB craft with the toxoid\u2019s vaccine consequence); the laboratory\u2019s arc (the specimen\u2019s transport honesty — the timing-and-container craft, the direct-and-microscopy register with the Gram\u2019s acid-fast crafts, the culture-and-medium census — the simple\u2019s differential-and-enrichment division with the Hiss honesty, the colony-and-reading craft, the biochemical-and-identification register with the UIM arithmetic, the susceptibility\u2019s disc-and-MIC craft); and the molecular-and-nucleic register named (the PCR\u2019s antigen crafts cross-referenced to biotechnology).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Opportunism Honesty Named',
      'The AB-Toxin Craft Held',
      'The Medium Census by Its Kinds',
      'The MIC Craft Named',
      'Normal Microbiota, Reservoirs, Nosocomial and Opportunistic Infections',
      'Chemotherapy and the Antibiotic Classes',
      'Human Diseases Caused by Viruses, Bacteria and Fungi',
    
      'Semester I: Microbiology'
    ],
  },
  {
    number: 2,
    slug: 'gram-positive',
    title: 'The Gram-Positive Register',
    summary:
      'The purple\u2019s disease map: the Staphylococcus\u2019s craft (the aureus-and-coagulase receipt with the MRSA register — the PBP honesty priced straight; the food-poisoning-and-enterotoxin craft); the Streptococcus\u2019s craft (the classification-and-lancefield register with the pyogenes-and-ASO receipt, the pneumoniae-and-quellung craft with the vaccine\u2019s conjugate honesty, the viridans\u2019-and-endocarditis register named); the Enterococcus named; the Bacillus\u2019s anthrax arc (the capsule-and-toxin craft with the wool-sorter honesty); the Clostridium-and-anaerobic register (the tetani-and-tetanospasmin craft with the spasmodic receipt, the perfringens\u2019s gangrene honesty, the botulinum\u2019s toxin arc with the therapeutic\u2019s-botox twist named); the Corynebacterium\u2019s-diphtheriae craft (the diphtheria-and-pseudomembrane receipt with the vaccine\u2019s toxoid honesty); and the Actinomyces-and-Nocardia named at survey depth.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Coagulase Receipt with the MRSA Register',
      'The Lancefield Register by Its Groups',
      'The Anaerobic Toxins by Their Receipts',
      'The Pseudomembrane Craft Priced Straight',
    ],
  },
  {
    number: 3,
    slug: 'gram-negative',
    title: 'The Gram-Negative Register',
    summary:
      'The enteric-and-zoonotic map: the Enterobacteriaceae\u2019s craft (the E-coli register with the O157-H7 receipt named, the Salmonella\u2019s typhi arc with the Widal honesty — the H-and-O craft, the Shigella-and-invasion register with the dysentery map, the Klebsiella-and-Proteus named); the Vibrio-and-cholerae craft (the CT-and-ADP-ribosylation receipt priced straight with the rice-water honesty and the ORS\u2019s therapy arithmetic — the Na-glucose craft named); the Helicobacter-and-ulcer receipt (the urea honesty with the cancer association named); the zoonotic\u2019s register (the Brucella-and-undulant craft, the Yersinia\u2019s plague arc with the flea vector named, the Francisella named); the Pseudomonas-and-opportunism register (the burn\u2019s cystic-fibrosis honesty); the spirochaete\u2019s craft (the Treponema\u2019s syphilis arc with the VDRL-and-TPPA honesty, the Borrelia-and-Lyme register named, the Leptospira named); and the Haemophilus-and-Bordetella-and-pertussis register named with the vaccine honesty.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Widal Honesty Priced Straight',
      'The Cholera\u2019s ADP Craft with the ORS Arithmetic',
      'The Zoonotic Map Named',
      'The Syphilis\u2019s Two-Test Honesty',
    ],
  },
  {
    number: 4,
    slug: 'mycobacteria-others',
    title: 'The Mycobacteria-and-Other Registers',
    summary:
      'The acid-fast\u2019s atypical map: the M-tuberculosis\u2019s craft (the acid-fast receipt with the slow honesty — the generation-and-week register, the granuloma-and-caseous register cross-referenced from pathology, the MDR-and-XDR registers with the DOTs honesty priced straight, the BCG register named); the M-leprae\u2019s craft (the tuberculoid-against-lepromatous honesty with the nerve\u2019s consequence); the atypical-and-NTM register named at survey depth; the Rickettsia-and-Chlamydia\u2019s registers (the obligate\u2019s intracellular honesty with the weil-felix craft named); the Mycoplasma\u2019s wall-less honesty named (the penicillin\u2019s irrelevance consequence priced straight); and the Corynebacterium-and-Listeria-and-neonatal register named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Slow Honesty with the DOTs Register',
      'The Tuberculoid-Lepromatous Honesty Held',
      'The Obligate Registers Named',
      'The Wall-Less Consequence Priced Straight',
    ],
  },
  {
    number: 5,
    slug: 'virology-clinical',
    title: 'The Clinical Virology Register',
    summary:
      'The viral\u2019s disease map: the replication-and-strategy census cross-referenced from the biology shelf (the DNA-against-RNA honesty with the sense craft); the respiratory\u2019s register (the influenza\u2019s antigenic-drift-and-shift honesty with the vaccine-and-match craft, the RSV-and-bronchiolitis register, the SARS-CoV-2\u2019s pandemic arc priced straight with the variant register named); the enteric-and-polio craft (the paralysis arithmetic with the eradication\u2019s endgame honesty — the India receipt priced straight); the hepatitis\u2019s map (the A-E-and-route division with the B-and-C\u2019s chronic honesty — the cirrhosis-and-cancer consequence with the antiviral-and-therapy register named); the herpes-and-latency register (the HSV-and-VZV crafts with the shingles receipt, the EBV-and-mono craft with the cancer association named); the HIV arc (the CD4 arithmetic with the opportunism map — the TB-and-crypto registers named, the HAART\u2019s craft cross-referenced to pharmacology); the arbovirus\u2019s register (the dengue\u2019s serotype honesty with the severe-and-shield craft, the chikungunya named); and the rabies-and-Negri receipt with the vaccine\u2019s post-exposure craft priced straight.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Drift-Shift Honesty with the Match Craft',
      'The A-E Route Map Held',
      'The CD4 Arithmetic with the Opportunism Map',
      'The Post-Exposure Craft Priced Straight',
    ],
  },
  {
    number: 6,
    slug: 'mycology-parasitology-preview',
    title: 'The Mycology and the Parasitology Preview',
    summary:
      'The fungal\u2019s parasitic clinical map: the mycology\u2019s register (the superficial-and-tinea craft with the KOH receipt, the Candida\u2019s opportunism map — the thrush\u2019s steroid consequence named, the Cryptococcus\u2019s India-ink craft with the meningitis\u2019s AIDS association, the systemic\u2019s histo-blasto registers named at survey depth, the Pneumocystis-and-PCP register with the prophylaxis craft); the parasitology\u2019s clinical preview (the malaria-and-diagnosis craft cross-referenced to the biology shelf\u2019s parasitology book with the RDT honesty named, the deworming register named); and the vector\u2019s census previewed (the entomology book\u2019s-own doorway).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The KOH Receipt Held',
      'The India-Ink Craft Named',
      'The PCP Prophylaxis Craft',
      'The Sibling Cross-Reference Held Straight',
    ],
  },
  {
    number: 7,
    slug: 'infection-control-public',
    title: 'The Infection-Control-and-Public Register',
    summary:
      'The hospital-and-community craft: the hospital-infection\u2019s register (the HAI\u2019s census with the route map, the outbreak-and-investigation craft — the case-definition\u2019s epi-curve honesty cross-referenced to community-medicine, the isolation-and-barrier register, the antibiotic-stewardship arc cross-referenced to pharmacology); the sterilisation-and-disinfection register (the Spaulding classification named with the critical-and-semi-critical division); the biomedical-waste register named (the Indian craft at survey depth); the surveillance-and-notification register (the notifiable census named with the IDSP\u2019s honesty); and the vaccination-and-public register (the cold-chain\u2019s coverage arithmetic cross-referenced to community-medicine — the eradication\u2019s-own craft).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The HAI Route Map Held',
      'The Spaulding Classification Named',
      'The Epi-Curve Honesty Cross-Referenced',
      'The Coverage Arithmetic Cross-Referenced',
      'The Human Disease Census: Malaria to Chikungunya',
      'Emerging Infectious Diseases and the Pathogenicity Mechanisms',
      'Food Spoilage and Microbial Toxins',
    ],
  },
]

export const medicalMicrobiology: Book = {
  id: 'medical-microbiology',
  title: 'Medical Microbiology',
  subtitle: 'The pathogens of the patient — bacteriology, virology, mycology and the laboratory craft',
  discipline: 'medical-sciences',
  level: 'Undergraduate MBBS core (the clinical register; the general register owned by the biology shelf)',
  description: 'The pathogen discipline in its clinical register: the host-pathogen frame first (the normal flora\u2019s opportunism honesty, the virulence\u2019s pathogenicity distinction with the factor census — the adhesion\u2019s toxin crafts); the laboratory\u2019s craft (the specimen\u2019s collection honesty, the culture-and-colony register with the staining-and-Gram craft, the identification\u2019s biochemical arithmetic, the susceptibility\u2019s disc test); the systematic bacteriology (the gram-positive\u2019s staph-strep-clostridium register with the toxin\u2019s disease map; the gram-negative\u2019s enteric arc — the E-coli-and-Salmonella-and-Shigella crafts with the typhoid\u2019s diarrhoeal maps; the Vibrio\u2019s Helicobacter receipts; the zoonotic\u2019s brucella-and-plague registers; the spirochaete-and-syphilis craft; the mycobacterium\u2019s acid-fast arc with the TB-and-leprosy registers); the virology\u2019s register (the structure-and-replication basics cross-referenced from the biology shelf, the clinical-and-class census — the respiratory\u2019s enteric crafts, the hepatitis\u2019s A-B-C-D-E map, the HIV\u2019s retroviral arc with the CD4 arithmetic, the herpes-and-latency register, the arbovirus\u2019s vector crafts with the dengue\u2019s platelet honesty); the mycology register (the superficial-and-systemic division with the Candida\u2019s Cryptococcus crafts); the parasitology\u2019s clinical preview cross-referenced to the biology shelf\u2019s-own book; and the infection-control-and-public register (the hospital\u2019s outbreak crafts with the surveillance honesty cross-referenced to community-medicine).',
  status: 'planned',
  accent: ['#9f1239', '#4c0519'],
  chapters,
}

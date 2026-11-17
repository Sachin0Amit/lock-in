import type { Book, Chapter } from '../../../types'

/**
 * Industrial Chemistry — the tenth book of the Chemistry shelf.
 *
 * STATUS: PLANNED (Chemistry full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 92 planned lessons, zero written. Lesson ids will use the `indchem-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Industrial Chemistry owns the chemical plant register. The engineering shelf’s core books own the unit-operations side (the process engineering register — honestly cross-referenced: chemical engineering is on the engineering pass’s investigate-later list); the organic book owns the reaction chemistry; the environmental book owns the effluent side.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Shreve's Chemical Process Industries (the canonical arc, named) as the spine; the NCERT class 12 chemistry-in-everyday-life and surface-chemistry registers (read this pass in the syllabus registers) as the school ladder beneath.
 * - The CSIR NET interdisciplinary registers (read this pass — catalysis and green chemistry named) priced for the process side.
 * - The engineering shelf's planning note (chemical engineering on the investigate-later list) recorded honestly as the boundary.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'water-and-utilities',
    title: 'Water and the Industrial Utilities',
    summary:
      'The plant\u2019s first chemistry: the water-quality registers — hardness treated by the softening census; boiler-feed honesty with the corrosion register (the physical book\u2019s electrochemistry cross-referenced); steam-and-compressed utilities told briefly; and the effluent\u2019s first look.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Hardness Census',
      'The Boiler Honesty',
      'The Utilities Register',
      'The Effluent First Look',
      'Industrial Method for the Preparation of (i) formaldehyde, (ii) acetaldehyde, and (iii) benzal-dehyde',
      'Chemistry in Your Career Senior Scientist',
      'The Composition of Solutions 123 Chemical Connections Nature Has Hot Plants',
      'Chemistry in Your Career Associate Professor of Ethnic',
      'Chemistry in Your Career Ceramics Glazer',
      'Chemistry in Your Career NASA Researcher',
      'List of Deeper Looks'
    ],
  },
  {
    number: 2,
    slug: 'acid-and-alkali',
    title: 'The Acid-and-Alkali Industries',
    summary:
      'The heavy-chemical register: the contact process read properly — the equilibrium-and-catalyst craft priced; the nitric-acid register with the Ostwald turn; the Solvay craft with its ammoniacal honesty; and the chlor-alkali register — the mercury-and-membrane cells told honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Contact Process',
      'The Ostwald Register',
      'The Solvay Craft',
      'The Chlor-Alkali Register',
    
      'Inquiry process (Inquiry 1 exploring and designing, Inquiry 2 collecting and processing data, Inquiry 3 concluding and evaluating)',
      'Bronsted–Lowry Acids and Bases',
      'Strength of Binary Acids and Oxyacids',
      'Manufacture of H_2SO_4 by Contact Process',
      'Hypofluorous Acid, HOF',
      'Relative Strengths of Trihalides of Boron as Lewis Acids',
      'Orthoboric Acid (H3BO3) or B(OH)3',
      'Carbonic Acid (H2CO3)',
      'Barbituric Acid Derivatives as Tranquillizers',
      'Harmful Effects of Acid Rains',
      'Taj Mahal and Acid Rain',
      'How to Reduce Acid Rain',
      'Oxidation with CrO₃ in Glacial Acetic Acid',
      'Highly Branched Acids',
      'Exo-2-norborane Carboxylic Acid (I)',
      'Reason for the Acidic Character of the Monoanion of the Following Dibasic Acid',
      'Dry Distillation of Calcium or Barium Salts of Fatty Acids',
      'By Passing the Vapours of Fatty Acids Over Manganous Oxide (MnO) at 573 K',
      'Order of Inter-conversion of Acid Derivative (Trans-acylation)',
      'Benzil–Benzilic Acid Rearrangement',
      'Decarboxylation of Trichloroacetic Acid (Cl3C—COOH) (I)',
      'Reaction of α-, β-, γ-, and δ-Halo Acids with Aqueous NaOH',
      'Hydroxamic Acids (R—C(=O)—NHOH)',
      'Acid Hydrazides (R—C(=O)—NHNH2)',
      'Reaction of Aldehydes and Ketones with N3H (Hydrazoic Acid) in Acidic Conditions (Claisen–Schmidt Rearrangement Type Reaction)',
      'Mixing of Strong Acids and Strong Bases',
      'The Brönsted–Lowry Acids and Bases',
      'Factors Affecting the Strength of Lewis Acids',
      'Calculation of pH of Extremely Dilute (<10⁻⁶ M) Solution of Strong Acids and Strong Bases',
      'DI- and Polybasic Acids and DI- and Polyacidic Bases',
      'Change in pH of an Acidic Buffer (When an Acid or a Base is Added)',
      'Calculation of Degree of Hydrolysis (h), Hydrolysis Constant (Kh), and pH of a Salt (ZnCl₂) of Weak Diacidic Base (Zn(OH)₂ and Monobasic Acid (HCl)',
      'The Properties of a Group: The Alkali Metals 282 Chemical Connections What’s Hot?',
      'Calculating the pH of Strong Acid Solutions',
      'Rate Laws: An Introduction 466 14.7 Polyprotic Acids',
      'Catalysis 494 14.12 Strategy for Solving Acid–Base Problems: A Summary',
      'Diastereoselectivity 852 The benzilic acid rearrangement',
      'Nitrous acid HNO2',
      'Hypophosphoric acid H4P2O6',
      'Orthophosphorous acid H3PO3',
      'Metaphosphorous acid (HPO2)n',
      'Hypophosphorous acid H3PO2',
      'Sp3 Hybridization 25 3.6 The Strength of Brønsted–Lowry Acids and Bases',
      'Hybridization 26 3.7 HOW TO Predict the Outcome of Acid–Base'
    ],
  },
  {
    number: 3,
    slug: 'fertilizers',
    title: 'The Fertilizer Industries',
    summary:
      'The nitrogen register\u2019s industrial side: ammonia synthesis — Haber\u2019s craft with the Le Chatelier honesty priced; the urea register with the prilling craft; the phosphatic census — the SSP-and-TSP registers; the NPK blending register; and the green-revolution ledger told briefly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Haber\u2019s Craft',
      'The Urea Register',
      'The Phosphatic Census',
      'The NPK Register',
    ],
  },
  {
    number: 4,
    slug: 'petroleum-and-petrochemicals',
    title: 'Petroleum and the Petrochemicals',
    summary:
      'The refinery register: crude\u2019s fractionation with the distillation craft; the conversion processes — cracking-and-reforming told chemically; the octane-and-cetane honesty; the petrochemical census — the three starter families with the downstream ladder; and the refinery\u2019s environmental ledger.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Fractionation Register',
      'The Conversion Processes',
      'The Octane Honesty',
      'The Starter Families',
      'Commercial Electrolytic Processes',
      'Weldon and Deacon processes',
      'Electrolytic processes'
    ],
  },
  {
    number: 5,
    slug: 'polymers-and-elastomers',
    title: 'The Polymer-and-Elastomer Register',
    summary:
      'The macromolecular industry: the addition-and-condensation census with the mechanism honesty (the organic book\u2019s preview cross-referenced); the plastics census — the six commodity families with their properties-and-processing told; the elastomer register with vulcanisation\u2019s craft; and the polymer-environment honesty carried.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two Censuses',
      'The Commodity Families',
      'Vulcanisation\u2019s Craft',
      'The Environment Honesty',
    
      'Simple polymers and their preparation (polystyrene, polyethylene, polyamides, polyesters); polymers and monomers, chain polymerizations, polyaddition and polycondensation',
      'Silicones or Silicon Polymers',
      'Some Commercially Important Polymers'
    ],
  },
  {
    number: 6,
    slug: 'fine-chemicals',
    title: 'The Fine-Chemicals Register',
    summary:
      'The value side: the drug register — the pharmacology families told chemically with the structure-activity idea named; the dye census — the azo-and-anthraquinone registers; the food-additive ledger — the preservative-and-antioxidant registers; and the cosmetics-and-cleaning chemistry told briefly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Drug Register',
      'The Dye Census',
      'The Food Ledger',
      'The Cleaning Chemistry',
      'The Food-Products Technology Register',
      'The Cereal, Oil and Fruit Processing Register',
      'Food Packaging, Storage and the Standards',
      'Dry Cleaning of Clothes',
      'Electrolytes 119 Chemistry in Your Career Vice President of Food and',
      'Chemistry in Your Career Executive Publisher 165 Chemical Connections 0.046 Femtometer Is a'
    ],
  },
  {
    number: 7,
    slug: 'fuels-and-energy',
    title: 'The Fuels-and-Energy Register',
    summary:
      'The energy chemistry: the fuel census — solid, liquid, gaseous with the calorific ledger; the hydrogen-and-fuel-cell registers told honestly; the battery chemistry cross-referenced to the physical book\u2019s electrochemistry; the nuclear fuel register priced briefly; and the renewable-chemistry preview.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Calorific Ledger',
      'The Fuel-Cell Register',
      'The Battery Cross-Reference',
      'The Renewable Preview',
    ],
  },
  {
    number: 8,
    slug: 'process-economics-and-safety',
    title: 'The Process Doorway',
    summary:
      'The plant\u2019s honesty: the economics register — yield-and-throughput priced; the safety-and-hazard census — the case registers told honestly; the environmental-compliance register (the environmental book\u2019s cross-reference); the quality-and-ISI registers named; and the career doorway marked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Economics Register',
      'The Hazard Census',
      'The Compliance Register',
      'The Career Doorway',
    ],
  },
]

export const industrialChemistry: Book = {
  id: 'industrial-chemistry',
  title: 'Industrial Chemistry',
  subtitle: 'The plant register: acids, alkalis, fertilizers, fuels and polymers — the chemistry of industry',
  discipline: 'chemistry',
  level: 'University + professional register',
  description: 'The industrial register: the water-and-utilities craft, the acid-alkali industries with the contact-and-Solvay registers, the fertilizer industries, petroleum refining with the petrochemical register, the polymer-and-elastomer census, the fine-chemicals register — drugs, dyes, food — and the process-economics-and-safety doorway.',
  status: 'planned',
  accent: ['#94a3b8', '#334155'],
  chapters,
}

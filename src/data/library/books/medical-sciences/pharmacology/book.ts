import type { Book, Chapter } from '../../../types'

/**
 * Pharmacology — the sixth book of the Medical Sciences shelf.
 *
 * STATUS: PLANNED (Medical Sciences full-shelf planning pass, 2026-11-16) — 6 chapters /
 * 24 planned lessons, zero written. Lesson ids will use the `pharm-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Pharmacology owns the drug register for the whole library. The receptor’s enzyme machinery belongs to the general physiology-and-biochemistry books (cross-referenced at the shared level); the plant-derived drugs’ botanical register to the biology shelf’s economic-botany (the pharmacognosy cross-reference); the clinical therapeutics per disease to internal-medicine and the specialty books (the mechanism-and-classes here, the regimen-and-monitoring there); the NEET-and-FMGE lines are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Katzung’s Basic and Clinical Pharmacology named as the university pole (the class-and-mechanism register).
 * - Goodman-and-Gilman’s named as the depth co-pole.
 * - The NCERT-and-FMGE lines as the school ladder with the Indian-and-essential register named.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'general-principles-pk',
    title: 'The General Principles — Pharmacokinetics',
    summary:
      'The body\u2019s drug arithmetic: the ADME arc (the absorption-and-route census with the bioavailability\u2019s first-pass honesty — the IV-against-oral arithmetic; the distribution-and-volume craft with the protein-binding\u2019s displacement consequence; the metabolism-and-phase register with the CYP\u2019s induction-inhibition honesty — the interaction-and-grapefruit receipt named; the excretion-and-clearance craft); the dosing\u2019s arithmetic (the half-life-and-plateau receipt with the steady-state\u2019s four-to-five honesty, the loading\u2019s maintenance crafts, the therapeutic-and-monitoring register with the TDM\u2019s peak-trough honesty); and the special populations named (the paediatric\u2019s geriatric\u2019s hepatic-renal registers at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The ADME Arc with the First-Pass Honesty',
      'The CYP Interaction Receipt Named',
      'The Plateau Receipt Fixed by Drill',
      'The Monitoring Register Named',
      'Pharmacological and Parenteral Therapies',
    ],
  },
  {
    number: 2,
    slug: 'general-principles-pd',
    title: 'The General Principles — Pharmacodynamics',
    summary:
      'The drug\u2019s target arithmetic: the receptor\u2019s craft (the affinity\u2019s efficacy distinction fixed once — the agonist-and-antagonist registers with the partial\u2019s inverse honesty named); the dose-response\u2019s arithmetic (the graded\u2019s quantal curves with the EC50\u2019s ED-TD-LD division — the therapeutic-and-index craft); the antagonism\u2019s census (the competitive\u2019s reversible against the non-competitive\u2019s irreversible honesty with the spare-receptor-and-explanation named); the signal\u2019s second-messenger register cross-referenced from physiology (the G-protein\u2019s channel-and-kinase routes with the drug\u2019s levers); the tolerance\u2019s tachyphylaxis honesty named; and the placebo-and-nocebo register priced straight (the trial\u2019s arm honesty cross-referenced to community-medicine).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Affinity-Efficacy Distinction Fixed Once',
      'The Therapeutic Index Craft',
      'The Spare-Receptor Explanation Named',
      'The Placebo Honesty Priced Straight',
    ],
  },
  {
    number: 3,
    slug: 'autonomic-cns',
    title: 'The Autonomic-and-CNS Pharmacology',
    summary:
      'The neural-and-mental register: the autonomic\u2019s craft (the adrenergic\u2019s cholinergic receptor table with the organ\u2019s response honesty — the α-β division with the blockade\u2019s organ consequences; the cholinergic\u2019s muscarinic-nicotinic division with the agonist-and-antagonist registers — the atropine-and-organ craft priced straight; the neuromuscular-and-blocker register with the reversal honesty); the CNS\u2019s arc (the general-anaesthetic-and-stage craft with the inhalation\u2019s MAC honesty, the opioid-and-receptor register with the morphine-and-adverse census, the antiepileptic-and-class craft by the seizure\u2019s-kind honesty, the antipsychotic-and-D2 register with the extrapyramidal consequence, the antidepressant\u2019s monoamine arc with the SSRI-and-class craft); and the Parkinson-and-dopamine register named with the levodopa honesty.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Receptor Table by Its Organs',
      'The Atropine Craft Priced Straight',
      'The Seizure-Kind Honesty Named',
      'The D2 Consequence Held',
    ],
  },
  {
    number: 4,
    slug: 'cardio-renal-autacoid',
    title: 'The Cardiovascular, Renal-and-Autacoid Registers',
    summary:
      'The systemic drug register: the antihypertensive\u2019s arc (the class census by its lever — the ACE-and-angiotensin craft with the bradykinin\u2019s cough consequence named, the β-blocker-and-class register, the calcium\u2019s channel honesty, the diuretic\u2019s class arc); the heart-failure\u2019s register (the digoxin-and-inotropic craft with the and-toxicity window); the antiarrhythmic\u2019s Vaughan-Williams class named; the antianginal-and-nitrate register with the tolerance\u2019s craft; the antithrombotic\u2019s register (the antiplatelet-and-anticoagulant division with the warfarin\u2019s INR arithmetic — the DOAC-and-honesty named); the lipid-and-statin craft (the HMG\u2019s mechanism with the side-effect register); the autacoid-and-respiratory register (the antihistamine\u2019s H1-H2 division, the bronchodilator-and-β2 craft with the steroid-and-inhaler register); and the NSAID-and-cyclooxygenase craft with the gastropathy\u2019s renal consequence priced straight.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Class Census by Its Levers',
      'The INR Arithmetic Named',
      'The Statin Mechanism Held',
      'The NSAID Consequence Priced Straight',
    ],
  },
  {
    number: 5,
    slug: 'endocrine-metabolic-chemo',
    title: 'The Endocrine, Metabolic-and-Chemotherapy Registers',
    summary:
      'The hormone-and-antimicrobial register: the endocrine\u2019s craft (the insulin\u2019s class arc with the analogue\u2019s timing honesty — the hypoglycaemic-and-recognition craft priced straight; the oral-and-class register with the metformin\u2019s first honesty; the corticosteroid-and-class craft with the equivalence-and-taper register — the withdrawal\u2019s collapse honesty named; the thyroid-and-antithyroid register; the steroid-and-anabolic division held); the chemotherapy\u2019s arc (the principle\u2019s selectivity honesty with the cell-cycle register — the alkylating\u2019s antimetabolite-and-microtubule crafts by their targets; the antimicrobial-and-class census by the target — the cell-wall\u2019s β-lactam craft with the and-inhibitor honesty, the protein\u2019s aminoglycoside-tetracycline register, the folate-and-sulphonamide craft with the synergy\u2019s receipt; the antiviral-and-nucleoside register with the HIV-and-HAART craft; the antifungal-and-azole register named); and the resistance\u2019s stewardship honesty (the R-plasmid transfer cross-referenced to the biology shelf\u2019s microbiology book).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Insulin Timing Honesty Held',
      'The Taper Register Named',
      'The Target Census by Its Classes',
      'The Stewardship Honesty Cross-Referenced',
    ],
  },
  {
    number: 6,
    slug: 'toxicology-prescribing',
    title: 'The Toxicology-and-Prescribing Register',
    summary:
      'The safety craft: the toxicology\u2019s register (the poisoning-and-triage craft with the antidote\u2019s census — the organophosphate-and-atropine receipt, the paracetamol-and-NAC craft, the heavy-metal-and-chelation register); the drug-interaction\u2019s types honesty (the pharmacokinetic-and-pharmacodynamic division with the CYP table\u2019s use); the adverse-and-reaction register (the type-A-and-type-B division with the pharmacovigilance\u2019s reporting honesty — the Yellow-Scheme craft named); the prescribing\u2019s craft (the generic\u2019s essential honesty, the and-rational-use register with the antibiotic-stewardship arc, the special-population-and-prescribing named); and the and-Indian register named (the essential-medicine list with the NLEM\u2019s NDMA honesty at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Antidote Census by Its Receipts',
      'The Interaction Types Held',
      'The Pharmacovigilance Honesty Named',
      'The Rational-Use Register Held',
    ],
  },
]

export const pharmacology: Book = {
  id: 'pharmacology',
  title: 'Pharmacology',
  subtitle: 'The discipline of drugs — principles, systems and the therapeutic arithmetic',
  discipline: 'medical-sciences',
  level: 'Undergraduate MBBS core (the Katzung register)',
  description: 'The drug discipline in one arc: the general principles first (the pharmacokinetic-and-pharmacodynamic division — the ADME arc with the bioavailability\u2019s first-pass honesty, the volume\u2019s clearance arithmetic, the half-life-and-dosing craft with the steady-state-and-plateau receipt; the receptor\u2019s affinity-efficacy craft with the agonist-and-antagonist register and the therapeutic\u2019s toxic window); the autonomic pharmacology (the sympathetic\u2019s parasympathetic crafts by their receptor\u2019s organ table with the neuromuscular register); the CNS pharmacology (the anaesthetic\u2019s analgesic arc with the opioid-and-receptor register, the antiepileptic\u2019s antipsychotic-and-antidepressant crafts by their mechanism); the cardiovascular-and-renal (the antihypertensive-and-ACE craft with the heart-failure-and-antiarrhythmic registers); the autacoids-and-respiratory (the antihistamine\u2019s bronchodilator crafts); the endocrine-and-metabolic (the insulin\u2019s oral-hypoglycaemic register, the corticosteroid\u2019s therapeutic arithmetic); the chemotherapy register (the antimicrobial\u2019s classes arc by their targets — the cell-wall, protein, DNA-and-RNA crafts with the resistance\u2019s stewardship honesty; the antifungal-and-antiviral registers; the anticancer\u2019s cell-cycle craft); and the toxicology-and-prescribing register (the poisoning-and-antidote craft with the pharmacovigilance honesty and the essential-medicine list named).',
  status: 'planned',
  accent: ['#0369a1', '#0c4a6e'],
  chapters,
}

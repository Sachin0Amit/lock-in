import type { Book, Chapter } from '../../../types'

/**
 * Veterinary Medicine — the eighteenth book of the Medical Sciences shelf.
 *
 * STATUS: PLANNED (Medical Sciences full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 25 planned lessons, zero written. Lesson ids will use the `vet-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Veterinary Medicine owns the animal-patient register. The general parasite register to the biology shelf’s parasitology (the sibling views); the microbiology to medical-microbiology (the shared organisms with the veterinary difference); the pharmacology to pharmacology (the dose’s species arithmetic); the public-health to community-medicine (the One Health bridge); the NEET-and-BVSc lines are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Radostits’ Veterinary Medicine named as the pole (the clinical register).
 * - The Indian-ICAR registers named with the BVSc syllabus as the school ladder.
 * - Blood-Henderson’s Veterinary Medicine cross-referenced as the co-pole.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'comparative-register',
    title: 'The Comparative Register',
    summary:
      'The species\u2019 differences held straight: the ruminant\u2019s craft (the forestomach census with the rumen\u2019s microbial honesty — the four-stomach division with the eructation-and-consequence named, the bloat register priced straight); the avian\u2019s register (the air-sac honesty with the flow-through difference cross-referenced, the crop\u2019s gizzard crafts, the shell gland register); the equine\u2019s craft (the gut\u2019s long honesty with the colic\u2019s consequence — the unforgiving register priced straight, the laminitis named); the dog\u2019s cat differences (the collie\u2019s-MDR honesty named with the CHOCOLATE register — the theobromine craft priced straight); and the blood-and-values census named at survey depth with the species\u2019s-reading craft.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Four-Stomach Division Fixed by Drill',
      'The Unforgiving Register Priced Straight',
      'The MDR Honesty Named',
      'The Species\u2019s-Reading Craft Named',
      'Veterinary Anatomy and Physiology: The Comparative Frame',
    ],
  },
  {
    number: 2,
    slug: 'husbandry-nutrition',
    title: 'The Husbandry-and-Nutrition Register',
    summary:
      'The production\u2019s craft: the nutrition\u2019s register (the ration\u2019s-arithmetic with the Pearson-square craft named — the TDN register, the mineral\u2019s urea honesty with the poisoning-and-consequence named); the dairy\u2019s cycle (the lactation\u2019s-arc with the dry-period honesty — the 305-day register named, the milking\u2019s craft with the hyggiene honesty); the poultry\u2019s cycle (the broiler-and-layer division with the light\u2019s honesty — the stimulation craft); the production-and-economics named at survey depth; and the welfare register held straight (the five-freedom honesty with the carrying craft named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Pearson Square Named',
      'The 305-Day Register Named',
      'The Light Honesty Held',
      'The Five-Freedom Honesty Priced Straight',
      'Animal Nutrition and Livestock Production Management',
      'Animal Genetics and Breeding',
      'Livestock Products Technology',
      'Veterinary and Animal Husbandry Extension Education',
      'Veterinary Biochemistry',
      'Livestock Farm Practices',
    
      'Livestock Production Management (including Poultry Production and Hatchery Management, Fodder Production and Grassland Management)',
      'Animal Welfare, Ethics and Jurisprudence'
    ],
  },
  {
    number: 3,
    slug: 'parasitic-infectious',
    title: 'The Parasitic-and-Infectious Registers',
    summary:
      'The organism maps: the parasitology\u2019s register (the tick-and-helminth census with the FLP arithmetic — the fasciola\u2019s-craft with the snail\u2019s honesty cross-referenced from the biology shelf, the strategic-dose register named, the drench\u2019s-rotation honesty); the infectious\u2019s craft (the HS-and-BQ division with the black-quarter\u2019s-craft named, the FMD\u2019s aria arc with the ring-vaccination craft — the stamping honesty named, the rabies-and-cross register with the post-exposure craft cross-referenced, the PPR named); the zoonotic\u2019s census (the 70-percent honesty named — the shared register priced straight: the anthrax\u2019s brucellosis\u2019s lepto crafts cross-referenced, the AMR honesty with the One Health frame held); and the notifiable-and-register named with the reporting\u2019s honesty.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The FLP Arithmetic Named',
      'The Ring-Vaccination Craft Held',
      'The 70-Percent Honesty Priced Straight',
      'The Notifiable Register Named',
      'Veterinary Pharmacology and Toxicology',
      'Veterinary Microbiology and Pathology',
    
      'Veterinary Parasitology (Helminthology, Entomology, Protozoology)'
    ],
  },
  {
    number: 4,
    slug: 'small-large-animal',
    title: 'The Small-and-Large-Animal Registers',
    summary:
      'The clinic-and-fields craft: the small-animal\u2019s medicine (the Parvo\u2019s CDV crafts with the vaccination schedule fixed by drill — the puppy\u2019s window honesty, the kennel\u2019s-cough register, the FIP named, the spay-neuter register with the anaesthesia\u2019s epidural honesty); the large-animal\u2019s craft (the colic\u2019s emergency arc — the rectal\u2019s honesty with the NSAID register, the milk-fever\u2019s IV calcium craft priced straight, the dystocia-and-correction register with the foetal\u2019s honesty, the lameness-and-hoof craft named); the poultry\u2019s craft (the marek\u2019s honesty with the H-program named, the RD register with the vaccination\u2019s honesty); and the surgery-and-anaesthesia register (the large-animal\u2019s-recumbency craft with the local\u2019s-preference honesty — the IV-intravenous named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Puppy Window Honesty Fixed by Drill',
      'The IV Calcium Craft Priced Straight',
      'The H-Program Named',
      'The Local\u2019s-Preference Honesty Held',
      'Veterinary Medicine: The Clinical Register',
      'Veterinary Gynaecology and Obstetrics',
      'Veterinary Surgery and Radiology',
    
      'Veterinary Surgery, Anaesthesiology and Diagnostic Imaging (including Orthopedics)',
      'Veterinary Gynecology, Obstetrics and Andrology'
    ],
  },
  {
    number: 5,
    slug: 'vph-doorway',
    title: 'The Veterinary-Public-Health-and-Doorway Register',
    summary:
      'The bridge craft: the milk\u2019s meat inspection (the CMT register with the mastitis\u2019s-craft, the abattoir\u2019s ante-post honesty with the organoleptic craft named, the SPS register named at survey depth); the zoonotic\u2019s-bridge (the One-Health frame cross-referenced from community-medicine — the AMR\u2019s stewardship honesty with the avlm named at survey depth, the wildlife\u2019s-ES register with the human-conflict craft named); the and-vet\u2019s-legal register named (the evidence\u2019s Acts honesty with the cruelty-and-act named); and the doorway — the veterinary\u2019s register held honestly as the comparative medicine: the human\u2019s animal-and-shared craft with the production\u2019s welfare arithmetic — the One Medicine honesty named as the discipline\u2019s own founding frame.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The CMT Register Named',
      'The Ante-Post Honesty Held',
      'The Cruelty Act Named',
      'The One Medicine Frame Held as the Founding One',
      'Veterinary Public Health and Epidemiology',
    ],
  },
]

export const veterinaryMedicine: Book = {
  id: 'veterinary-medicine',
  title: 'Veterinary Medicine',
  subtitle: 'The animal patient — comparative medicine, the production animals and the zoonotic bridge',
  discipline: 'medical-sciences',
  level: 'Undergraduate BVSc core (the professional register)',
  description: 'The veterinary discipline: the comparative\u2019s register first (the anatomy\u2019s physiology differences held straight — the ruminant-and-forestomach craft with the digestion\u2019s difference, the avian\u2019s air-sac honesty, the horse-and-gut craft — the colic\u2019s consequence); the husbandry-and-nutrition register (the feed\u2019s ration arithmetic with the Pearson square craft, the production\u2019s cycle — the dairy\u2019s poultry economics named); the parasitology register (the helminth\u2019s tick maps with the FLP arithmetic — the drench register named, the strategic-dosing craft); the infectious\u2019s register (the HS-and-BQ crafts — the multiple-vaccine register with the ring-vaccination craft named, the FMD\u2019s aria arc, the rabies-and-cross register with the- One Health honesty priced straight, the zoonotic\u2019s census — the 70-percent honesty named); the small-animal\u2019s register (the canine\u2019s feline medicine — the Parvo\u2019s CDV crafts with the vaccination schedule, the spay-neuter register with the anaesthesia honesty); the large-animal\u2019s register (the colic-and-emergency craft with the lameness\u2019s named, the milk-fever\u2019s parturient paresis register with the calcium\u2019s-IV craft, the dystocia register); the poultry register (the marek\u2019s honesty with the H program named); the surgery-and-anaesthesia register (the large-animal honesty with the recumbency craft); the veterinary-public-health register (the milk\u2019s meat inspection crafts with the zoonotic bridge — the anthrax\u2019s BQ cross-references, the AMR honesty named); and the wildlife register named at survey depth.',
  status: 'planned',
  accent: ['#57534e', '#292524'],
  chapters,
}

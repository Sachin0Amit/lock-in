import type { Book, Chapter } from '../../../types'

/**
 * Animal Diversity — the seventeenth book of the Biology shelf (the zoology register).
 *
 * STATUS: PLANNED (Biology full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 32 planned lessons, zero written. Lesson ids will use the `zdiv-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Animal Diversity owns the kingdom-survey register. The phylogenetics logic belongs to evolution (cross-referenced); the embryological machinery to developmental-biology; the arthropod depth to entomology; the parasite depth to parasitology; the physiology to animal-physiology; the NCERT-and-NEET diversity lines are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Hickman’s Integrated Principles of Zoology — Part III Diversity of Animal Life (read this pass: the contents-in-brief retrieved — the crustacean-through-tetrapod chapter arc) as the spine.
 * - The NCERT class 11 animal-kingdom chapter as the school ladder (the NEET register).
 * - Pechenik’s Biology of the Invertebrates named as the depth pole (the phyla register).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'body-plan-craft',
    title: 'The Body-Plan Craft',
    summary:
      'The survey\u2019s measuring sticks: the symmetry register (the radial\u2019s benthonic honesty against the bilateral\u2019s directed-life receipt); the germ layers (the diploblastic two-layer economy against the triploblastic mesoderm gift — the muscle-and-organ arithmetic); the coelom register (the acoel, pseudocoel and eucoel crafts priced as the hydrostatic-and-organ-room arithmetic — the advantage honestly priced without the ladder myth); the embryology craft (the protostome\u2019s spiral-and-determinate receipt against the deuterostome\u2019s radial-and-indeterminate register — the mouth-first-and-anus-second honesty); the segmentation register (the metamerism repetition receipt); and the tree-reading craft fixed (the shared-character honesty with the outgroup method cross-referenced to evolution).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Symmetry Register Priced',
      'The Coelom Arithmetic Held Honestly',
      'The Two embryology Receipts',
      'The Ladder Myth Held Apart',
      'The Salient Features of the Animal Phyla: Non-Chordates to Chordate Classes',
      'Distribution, Systematics and the Classification of Animals',
      'Phylogenetic Relationships: Classical and Molecular Tools',
      'The Diversity of Organisms: Classification and Cladistics',
      'Structure, Function and Evolutionary Relationships',
    ],
  },
  {
    number: 2,
    slug: 'sponges-cnidarians',
    title: 'The Sponges and the Cnidarians',
    summary:
      'The animals\u2019 first edges: the sponge register (the choanocyte\u2019s filter arithmetic, the ascon-to-sycon-to-leucon progression priced as the surface-volume receipt, the spicule-and-spongin skeleton, the regeneration-and-reconstitution wonder with the dissociated-sieve receipt); the cnidarian register (the diploblastic honesty, the cnidocyte\u2019s nematocyst — the physical-and-chemical trigger priced as the fastest cell in the sea, the polyp-and-medusa alternation with the Obelia-and-Aurelia receipts, the coral reef engine priced as the ecosystem\u2019s foundation with the symbiosis cross-reference); and the ctenophore named (the comb-jelly\u2019s rows-and-iridescence craft) with the planktonic honesty held.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Choanocyte Filter Arithmetic',
      'The Nematocyst Craft and the Alternation',
      'The Coral Reef Engine Priced',
      'The Comb-Jelly Named Honestly',
    ],
  },
  {
    number: 3,
    slug: 'flatworms-roundworms',
    title: 'The Flatworms and the Roundworms',
    summary:
      'The acoelomate-and-pseudocoelomate edges: the flatworm register (the Planaria\u2019s cross-eyed craft and the flame-cell excretion, the regeneration receipt; the fluke\u2019s digenetic cycle previewed for the parasitology book; the tapeworm\u2019s proglottid-and-scolex architecture priced as the absorptive-surface arithmetic — the gut given away as the surface gained); the roundworm register (the pseudocoel honesty, the cuticle-and-moult receipt shared with the arthropods, the Ascaris\u2019s enormous-census honesty previewed); and the parasitic-body census (the loss-and-gain arithmetic — the locomotor-and-digestive losses against the reproductive-and-attachment gains, priced as the parasite-and-own craft with the cross-reference to the parasitology book\u2019s depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Planaria Craft and the Flame Cell',
      'The Tapewody\u2019s Absorptive Arithmetic',
      'The Nematode Register Held',
      'The Parasite\u2019s Loss-and-Gain Census',
    ],
  },
  {
    number: 4,
    slug: 'annelids-molluscs',
    title: 'The Annelids and the Molluscs',
    summary:
      'The protostome crafts: the annelid register (the metamerism receipt — the segmentation\u2019s hydrostatic efficiency with the per-metamere septation, the polychaete\u2019s parapodium, the earthworm\u2019s leech\u2019s registers); the molluscan register (the foot-visceral-and-mantle body plan, the radula\u2019s ribbon-of-teeth craft, the trochophore-and-veliger larvae, the class census — the chiton, the gastropod-and-torsion receipt, the bivalve\u2019s filter economy, the cephalopod crown: the camera eye, the jet propulsion and the chromatophore register each priced as the convergence receipt it is); and the shell register (the aragonite craft priced as the defence-and-buoyancy arithmetic with the nautilus-and-chambered receipt).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Metamerism Receipt Priced',
      'The Radula-and-Trochophore Crafts',
      'The Class Census with the Torsion Honesty',
      'The Cephalod Convergence Receipts',
    ],
  },
  {
    number: 5,
    slug: 'arthropod-crown',
    title: 'The Arthropod Crown',
    summary:
      'The success arithmetic: the exoskeleton craft (the chitin-and-cuticle protection-and-leverage priced at the moult\u2019s cost — the ecdysis register shared with the nematodes as the Ecdysozoa receipt); the metamorphosis register (the hemi-and-holo honesty priced as the habitat\u2019s division — the larva\u2019s feeding against the adult\u2019s reproduction); the tracheal-and-book-lung crafts (the direct-delivery honesty cross-referenced to animal-physiology); the subphyla census (the chelicerate-and-arachnid craft, the myriapod register, the crustacean\u2019s carcinisation honesty named, the hexapod crown with the entomology book owning the depth); and the success receipts (the flight, the metamorphosis and the angiosperm coevolution — the radiation\u2019s register priced honestly as the ecological dominance it is, with the pollinator-and-decomposer services cross-referenced to ecology).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Exoskeleton\u2019s Moult Arithmetic',
      'The Metamorphosis Division Priced',
      'The Subphyla Census Held',
      'The Dominance Receipts Priced Straight',
    ],
  },
  {
    number: 6,
    slug: 'echinoderms-chordate-origins',
    title: 'The Echinoderms and the Chordate Origins',
    summary:
      'The deuterostome edge: the echinoderm register (the water-vascular system\u2019s tube-foot hydraulics — the pressure\u2019s adhesion arithmetic priced as the locomotion receipt, the pentaradial\u2019s secondary honesty — the bilateral larva with the radial adult, the star-and-urchin-and-cucumber-and-lily census); the hemichordate register (the acorn worm\u2019s stomochord — the link\u2019s claim priced straight, neither inflated nor dismissed); the chordate origin (the four synapomorphies — the notochord, the dorsal nerve tube, the pharyngeal slits and the post-anal tail; the tunicate\u2019s larval-and-Throwback honesty, the Amphioxus-and-cephalochordate register); and the vertebrate preparation (the craniate\u2019s neural-crest gift named at survey depth — the story told as the evidence\u2019s arc, not the ladder\u2019s myth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Tube-Foot Hydraulics Priced',
      'The Hemichordate Claim Priced Straight',
      'The Four Synapomorphies Fixed',
      'The Neural-Crest Gift Named',
    ],
  },
  {
    number: 7,
    slug: 'fishes-amphibians',
    title: 'The Fishes and the Amphibians',
    summary:
      'The vertebrate\u2019s first receipts: the fish register (the jaw\u2019s arc — the gill-arch\u2019s serial honesty priced as the gnathostome receipt; the cartilage-and-bone census — the shark\u2019s ray\u2019s register, the bony fish\u2019s swim-bladder-and-operculum crafts, the lobe-finned receipt — the coelacanth-and-lungfish register priced as the tetrapod\u2019s near-relatives); the amphibian register (the fin-to-finger receipt — the Tiktaalik arc priced as the fossil\u2019s-own-answer, the moist-skin\u2019s three-chamber honesty, the metamorphosis\u2019s water-egg constraint); and the ecological registers (the coral-fish\u2019s diversity engine and the amphibian\u2019s-decline crisis priced straight as the conservation honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Jaw\u2019s Arc Priced as the Receipt',
      'The Cartilage-and-Bone Census',
      'The Tiktaalik Arc Held',
      'The Water Constraint and the Decline Honesty',
    ],
  },
  {
    number: 8,
    slug: 'amniotes-birds-mammals',
    title: 'The Amniotes, Birds and Mammals',
    summary:
      'The land\u2019s full possession: the reptile register (the amniote egg-and-extraembryonic craft — the dry-land receipt priced by its four membranes, the scale\u2019s ectotherm honesty, the lepidosaur-and-archosaur census — the snake\u2019s jaw, the croc\u2019s turtle\u2019s registers, the dinosaur-and-bird arc told as the receipt it is); the bird register (the feather\u2019s flight arithmetic — the asymmetry-and-airfoil craft, the air-sac\u2019s flow-through lung as the high-metabolism receipt, the migration\u2019s navigation crafts named); the mammal register (the hair-and-mammary receipts, the warmth-and-placenta-and-brain crafts priced, the three-line census — the monotreme\u2019s marsupial-and-placental registers with the biogeography honesty); and the crown\u2019s cross-reference (the human lineage\u2019s arc owned by the evolution book).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Amniote Egg\u2019s Craft Priced',
      'The Feather-and-Air-Sac Receipts',
      'The Mammal Three-Line Census',
      'The Human Arc Cross-Referenced',
    ],
  },
]

export const animalDiversity: Book = {
  id: 'animal-diversity',
  title: 'Animal Diversity',
  subtitle: 'The animal kingdom in one arc — body plans, the great phyla and the chordate story',
  discipline: 'biology',
  level: 'Undergraduate zoology core (the Hickman diversity arc)',
  description: 'The kingdom\u2019s survey as one connected tree: the body-plan craft first (the symmetry, germ-layer, coelom, embryology and segmentation characters as the tree\u2019s own measuring sticks — the protostome-against-deuterostome split fixed once); the phyla walked in order (the sponges\u2019 filter craft and reconstitution wonder; the cnidarians\u2019 diploblastic economy and the coral reef engine; the flatworms\u2019-and-roundworms\u2019 parasite doors previewed for the parasitology book; the annelids\u2019 metamerism receipt and the molluscs\u2019 radula-and-trochophore register with the cephalopod\u2019s convergence wonders; the arthropod crown — the exoskeleton\u2019s metamorphosis arithmetic with the entomology book owning the depth; the echinoderms\u2019 water-vascular hydraulics and the chordate origins told as evidence); and the vertebrate story (the jaw, fin-to-limb, amniote egg, feather and placenta receipts each priced by its fossil evidence — the Tiktaalik and Archaeopterys arcs, the mammals\u2019 three-line census, the human lineage cross-referenced to evolution).',
  status: 'planned',
  accent: ['#0f766e', '#134e4a'],
  chapters,
}

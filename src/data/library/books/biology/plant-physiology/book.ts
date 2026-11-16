import type { Book, Chapter } from '../../../types'

/**
 * Plant Physiology — the eleventh book of the Biology shelf (the botany register).
 *
 * STATUS: PLANNED (Biology full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 36 planned lessons, zero written. Lesson ids will use the `pphys-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Plant Physiology owns the functional register of plants. The biochemical machinery of respiration-and-photosynthesis’s dark reactions is owned here at the organism register with the chemistry shelf’s biochemistry book owning the underlying chemical arc (cross-referenced, the sibling views); the anatomy of the conducting-and-photosynthetic tissues belongs to plant-anatomy; the ecological consequences (the productivity registers) belong to plant-ecology; the hormone exploits in agriculture are cross-referenced to economic-botany; the NEET photosynthesis-and-plant-growth units are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Taiz and Zeiger’s Plant Physiology and Development named as the university pole (the transporter-and-signals register).
 * - The NCERT class 11 transport-and-mineral-nutrition, photosynthesis chapters and class 12 plant-growth-regulators chapter as the school ladder (the NEET register).
 * - Hopkins’ Introduction to Plant Physiology named as the readable co-pole (the water-and-flowering registers).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'water-relations',
    title: 'The Water Relations',
    summary:
      'The water\u2019s arithmetic: the water-potential engine (the solute-and-pressure components combined — the zero-of-pure-water convention, the sign honesty that every exam answer lives or dies by); the cell\u2019s water states (the turgid-and-flaccid-and-plasmolysed register); the root\u2019s absorption (the root-hair surface arithmetic, the symplast-and-apoplast highways with the endodermis\u2019s Casparian gate); the ascent craft (the cohesion-tension theory earned — the tensile-water honesty, the cavitation-and-repair register, the root pressure\u2019s limited honesty); the stomatal regulation (the guard cell\u2019s potassium-and-turgor craft cross-referenced from anatomy, the ABA signal); and the transpiration ratio honesty (the ~500-grams-per-gram arithmetic — the price of the air\u2019s dinner).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Potential Engine and Its Signs',
      'The Two Highways and the Gate',
      'The Cohesion-Tension Craft',
      'The Stomatal and Ratio Honesty',
    ],
  },
  {
    number: 2,
    slug: 'mineral-nutrition',
    title: 'The Mineral Nutrition',
    summary:
      'The soil\u2019s dinner: the essential-element census (the seventeen by the two-criterion honesty — the macro\u2019s C-H-O-N-P-K-Ca-Mg-S against the micro\u2019s Fe-Mn-B-Zn-Cu-Mo-Ni-Cl register, the deficiency\u2019s symptom-and-mobility arithmetic as the diagnostic craft); the ion-uptake mechanism (the passive-and-active-and-facilitated census, the membrane\u2019s selectivity); the nitrogen register (the forms-and-their fates, the fixation\u2019s three routes — the symbiotic Rhizobium\u2019s nodular engine with the leghaemoglobin-and-nitrogenase oxygen-honesty, the free-living-and-industrial routes, the nitrification-and-denitrification cross-reference to the ecology book); and the mycorrhiza\u2019s market (the phosphorus-for-sugar trade — the two main types priced by their penetration honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Essential Census and the Diagnostic Craft',
      'The Uptake Mechanisms',
      'The Nodular Engine and Its Oxygen Honesty',
      'The Mycorrhiza Market',
    ],
  },
  {
    number: 3,
    slug: 'photosynthesis-light',
    title: 'Photosynthesis — the Light Reactions',
    summary:
      'The energy-capture engine owned in full: the pigment census (the chlorophyll a\u2019s special role, the accessory-and-antenna register, the reaction-centre honesty); the Z-scheme earned (the PSII\u2019s water-splitting-and-O2 receipt at the lumen side, the electron\u2019s passage through the plastoquinone-and-cytochrome-b6f-and-plastocyanin highway, the PSI\u2019s NADP+ reduction, the two photosystems\u2019 serial honesty against the older one-system story); the chemiosmotic engine (the proton gradient\u2019s thylakoid architecture, the ATP-synthase-and-rotary craft — the cross-reference to the cell-biology-and-biochemistry books); the cyclic-and-noncyclic census; and the action-and-absorption spectra\u2019s diagnostic honesty with the Engelmann arc priced as the classic receipt.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Pigment Census and the Centre Honesty',
      'The Z-Scheme Earned',
      'The Chemiosmotic Rotary Engine',
      'The Spectra\u2019s Diagnostic Craft',
    ],
  },
  {
    number: 4,
    slug: 'photosynthesis-dark',
    title: 'Photosynthesis — the Calvin Cycle and the Path Variants',
    summary:
      'The sugar\u2019s making: the Calvin cycle\u2019s three stages (the carboxylation-and-RuBisCO craft — the oxygenase mistake-and-its-consequence honesty, the reduction\u2019s ATP-and-NADPH ledger, the regeneration\u2019s sugar-shuffle arithmetic with the cycle\u2019s stoichiometry fixed once by drill); the C3 register\u2019s economics (the photorespiration loss priced — the ~25-to-50-percent honesty); the C4 answer (the mesophyll-PEP-and-bundle-sheath division of labour, the Kranz cross-reference, the ATP surcharge arithmetic, the tropical-and-hot receipt); the CAM answer (the nocturnal-CO2-storage craft of the desert — the temporal against the spatial separation honesty); and the productivity honesty (the C3-temperate against the C4-tropical-and-subtropical receipts priced without the advocacy).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three Stages by Drill',
      'The Oxygenase Mistake and the Loss Priced',
      'The C4 Division of Labour',
      'The CAM Answer and the Productivity Honesty',
    ],
  },
  {
    number: 5,
    slug: 'respiration-sugars',
    title: 'Respiration and the Sugar Traffic',
    summary:
      'The energy\u2019s release and the food\u2019s roads: the plant-and-respiration register (the glycolysis-and-Krebs-and-ETC owned at the plant level with the chemistry shelf\u2019s biochemistry book owning the chemical arc — the RQ arithmetic as the plant-and-own craft, the Q10 honesty, the alternative-oxidase named); the fermentation honesty (the anaerobic roots-and-their-lactic-and-ethanolic registers); the phloem\u2019s pressure-flow engine (the source\u2019s loading — the apoplastic-and-symplastic crafts, the sieve\u2019s turgor arithmetic, the sink\u2019s unloading); the sugar\u2019s destinations-and-forms (the transport-and-storage census, the starch-and-sucrose division); and the whole-plant carbon ledger (the photosynthesis-minus-respiration-and-construction arithmetic — the plant\u2019s daily economy priced honestly).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The RQ Craft and the AOX Named',
      'The Pressure-Flow Engine',
      'The Two Loadings',
      'The Whole-Plant Ledger',
    ],
  },
  {
    number: 6,
    slug: 'growth-regulators',
    title: 'The Growth Regulator Census',
    summary:
      'The hormone register: the auxin craft (the polar-transport engine, the receptor\u2019s TIR1 story, the apical-dominance-and-phototropism receipts, the rooting-and-herbicide applications priced); the gibberellin register (the stem-elongation-and-germination crafts — the aleurone-and-amylase receipt, the dwarf-and-bolting honesty); the cytokinin register (the cell-division-promotion-and-the senescence-delay crafts, the auxin-and-cytokinin ratio arithmetic — the callus-to-shoot-or-root dial); the ABA honesty (the stress-and-dormancy regulator — the stomatal-close signal, the seed-and-maturation craft); the ethylene craft (the gaseous honesty, the triple response, the fruit-ripening-and-abscission crafts — the one-gas-two-effects register); and the newer names (the brassinosteroid-and-jasmonate-and-salicylate signals named at survey depth) — the regulators priced as a network, never as five separate stories.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Auxin Craft and Its Receptor Story',
      'The GA-and-CK Registers',
      'The ABA-and-Ethylene Honesty',
      'The Network Held Together',
    ],
  },
  {
    number: 7,
    slug: 'photoperiodism-flowering',
    title: 'The Photoperiodism and the Flowering Signal',
    summary:
      'The timing discipline: the photoperiod\u2019s discovery (the tobacco-and-cocklebur arcs); the census (the short-day-against-long-day honesty — actually the night-length register priced by its interruption craft: the red-and-far-red reversibility of phytochrome as the clock\u2019s receptor); the phytochrome register (the Pr-and-Pfr interconversion, the shade-avoidance craft); the vernalisation craft (the winter\u2019s cold-and-the flowering licence — the epigenetic honesty cross-referenced to genetics); the florigen register (the leaf-made-and-mobile signal, the FT protein\u2019s receipt, the grafting evidence); and the whole-plant flowering arithmetic (the juvenility\u2019s wait, the commitment-and-reversal honesty) — the plant\u2019s calendar told as mechanism.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Night-Length Honesty',
      'The Phytochrome Register',
      'The Vernalisation Craft',
      'The Florigen Receipt',
    ],
  },
  {
    number: 8,
    slug: 'movements-stress',
    title: 'The Movements and the Stress Register',
    summary:
      'The behaviour-and-defence register: the movement census (the tropism\u2019s differential-growth craft — the phototropic-and-gravitropic mechanisms; the nastic\u2019s turgor-and-touch crafts — the Mimosa\u2019s seismonastic engine, the Venus flytrap\u2019s snap honest arithmetic); the abiotic-stress register (the drought\u2019s ABA-and-osmoprotectant answer, the salt\u2019s osmotic-and-ion honesty, the heat\u2019s protein-and-ROS crafts, the cold\u2019s membrane-and-antifreeze registers, the heavy-metal honesty); the biotic-stress register previewed (the pathogen\u2019s wall-strengthening-and-phytoalexin-and-SAR answers — the plant-pathology book owns the disease register, this chapter owns the response); and the cross-tolerance idea named — the stress register priced as a network of shared-and-specific answers.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Tropism-and-Nastic Census',
      'The Abiotic Answer Register',
      'The Biotic Response Previewed',
      'The Cross-Tolerance Idea',
    ],
  },
  {
    number: 9,
    slug: 'plant-physiology-doorway',
    title: 'The Doorway',
    summary:
      'The machine\u2019s close: the whole-plant arithmetic one final time (the harvest-index honesty, the yield\u2019s components priced without the advocacy); the methods\u2019 census (the potometer\u2019s transpiration measure, the infrared-gas-analyser-and-CO2 craft, the growth-room\u2019s controlled-light register); the agriculture register cross-referenced (the hormone exploits owned by economic-botany — the rooting powders, the GA-and-fruit craft, the anti-transpirants named); and the doorway — to plant-ecology for the field\u2019s arithmetic this machinery faces, to the economic register for the harvest it serves; the plant held honestly as the world\u2019s quiet engine: the water\u2019s arithmetic, the light\u2019s conversion, the sugar\u2019s traffic, the seed\u2019s timing — all of it computed without a single thought.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Whole-Plant Arithmetic',
      'The Methods Census',
      'The Agriculture Cross-Reference',
      'The Quiet Engine Held',
    ],
  },
]

export const plantPhysiology: Book = {
  id: 'plant-physiology',
  title: 'Plant Physiology',
  subtitle: 'How the plant works — water, minerals, photosynthesis, hormones and the flowering signal',
  discipline: 'biology',
  level: 'Undergraduate botany core (the Taiz-and-Zeiger register)',
  description: 'The working plant told as one machine: the water relations (the water-potential arithmetic — the solute-and-pressure components by which every movement is computed, the root\u2019s absorption, the xylem\u2019s transpiration stream with the cohesion-tension theory\u2019s negative-pressure honesty, the stomatal regulation, the guttation-and-transpiration ratio arithmetic); the mineral nutrition (the essential-element census — the macro-and-micronutrient registers with their deficiency receipts, the ion-uptake craft, the nitrogen-fixation symbiosis\u2019s nodular engine and the mycorrhiza\u2019s market); photosynthesis owned in full for the library (the light reactions\u2019 Z-scheme — the photosystem-and-cytochrome craft, the chemiosmotic ATP engine, the Calvin cycle\u2019s three stages, the C3-against-C4-and-CAM honesty with the Kranz cross-reference, the photorespiration loss priced honestly); respiration-and-fermentation at the plant register (the RQ arithmetic, the anaerobic honesty of the waterlogged roots); the transport of sugars (the phloem\u2019s pressure-flow mechanism — the source-and-sink arithmetic, the loading craft); growth-and-development (the growth regulator census — the auxin-and-polar craft and its receptor story, gibberellin\u2019s stem-and-germination registers, cytokinin\u2019s cell-division-and-senescence balance, ABA\u2019s stress honesty, ethylene\u2019s gaseous triple response, the florigen-and-vernalisation signals); and the movements-and-stress register (the tropisms-and-nastic craft, the plant\u2019s biotic-and-abiotic stress answers).',
  status: 'planned',
  accent: ['#65a30d', '#3f6212'],
  chapters,
}

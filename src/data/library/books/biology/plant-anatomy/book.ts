import type { Book, Chapter } from '../../../types'

/**
 * Plant Anatomy — the tenth book of the Biology shelf (the botany register).
 *
 * STATUS: PLANNED (Biology full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 32 planned lessons, zero written. Lesson ids will use the `pana-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Plant Anatomy owns the structural register of the plant body. The physiology of what these tissues do belongs to plant-physiology; the water-and-sugar transport mechanics belong there (this book owns the conducting structure); the taxonomy of what these organs say about relationships belongs to plant-taxonomy; the plant-genetics and plant-pathology books own their own registers; the NEET-and-CBSE plant-morphology lines are priced here (the anatomy-and-morphology unit).
 *
 * RESEARCH PHASE (2026-11-16):
 * - Mauseth’s Botany: An Introduction to Plant Biology — the Plant Structure section (read this pass: the four-part arc named from the retrieved contents — Plant Structure / Plant Physiology and Development / Genetics and Evolution / Ecology) as the spine.
 * - Raven’s Biology of Plants named as the co-pole (the Evert-Eichhorn edition).
 * - The NCERT class 11 anatomy-of-flowering-plants chapter as the school ladder (the NEET register).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'body-organisation',
    title: 'The Body\u2019s Organisation',
    summary:
      'The plant\u2019s architecture: the root-shoot axis as the body\u2019s answer to the two dinners (the soil\u2019s water-and-mineral meal, the air\u2019s carbon-and-light meal — the polarity earned); the three tissue systems (the dermal armour, the ground metabolism-and-storage, the vascular transport) as the body plan-and-threefold craft; the organ census (the leaf-stem-root-flower-fruit-and-seed register with their modified forms previewed — the tendril, rhizome, storage-and-aerial roots); the plant\u2019s open growth honesty against the animal\u2019s closed — the embryonic-and-meristematic forever; and the annual-herbaceous-woody census framing everything downstream.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two Dinners and the Axis',
      'The Three Systems',
      'The Modified-Organ Preview',
      'The Open-Growth Honesty',
    ],
  },
  {
    number: 2,
    slug: 'meristems-tissues',
    title: 'The Meristems and the Tissues',
    summary:
      'The growth engines and their products: the meristem census — the apical-and-lateral-and-intercalary registers with their origin-and-duration honesty; the primary meristem sequence (the protoderm-to-dermal, the ground-meristem-to-ground, the procambium-to-vascular differentiation); the simple tissues census (the parenchyma\u2019s living versatility — storage-and-photosynthesis-and-repair, the collenchyma\u2019s thick-angled plastic support, the sclerenchyma\u2019s lignified death — the fibre-and-sclereid crafts); the complex tissues (the xylem-and-tracheary craft — the tracheid-against-vessel honesty, the phloem\u2019s sieve-and-companion partnership); and the secretory register (the resin ducts, the laticifers) named at survey depth.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Meristem Census',
      'The Three Simple Tissues',
      'The Tracheary Craft',
      'The Secretory Register Named',
    ],
  },
  {
    number: 3,
    slug: 'the-root',
    title: 'The Root',
    summary:
      'The soil organ: the primary-root anatomy walked from the tip — the root cap\u2019s protective-and-gravity-sensing craft, the meristematic zone, the elongation zone, the maturation zone with its root hairs as the absorption\u2019s surface arithmetic; the cortex\u2019s storage role and the endodermis\u2019s Casparian strip as the membrane\u2019s enforced gate (the selective-uptake receipt); the vascular cylinder\u2019s arrangements (the diarch-to-polyarch honesty, the exarch xylem-and-centripetal craft); the lateral-root origin (the pericycle\u2019s internal birth — against the shoot\u2019s surface branching); the root modifications census (the storage taproots, the aerial-and-prop-and-stilt registers, the haustorial parasite craft cross-referenced to plant-pathology); and the mycorrhiza-and-root-nodule architecture previewed as the partnership surfaces.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Zones from Cap to Hair',
      'The Casparian Gate',
      'The Pericycle\u2019s Internal Birth',
      'The Modified-Root Census',
    ],
  },
  {
    number: 4,
    slug: 'the-stem',
    title: 'The Stem',
    summary:
      'The aerial axis: the primary-structure craft (the epidermis-with-cuticle-and-stomata, the cortex\u2019s chlorenchyma-and-collenchyma honesty, the vascular bundles\u2019 arrangements — the scattered-monocot against the ringed-eudicot with the pith-and-ray consequence); the stele\u2019s evolution (the protostele-to-siphonostele-to-eustele arc as the ferns-to-seed-plants reading); the leaf trace and gap craft (the vascular plumbing-and-continuity register); the cambium\u2019s secondary story previewed; the stem modifications (the rhizome, stolon, tuber, bulb-and-corm storage census with the potato\u2019s-edible honesty); and the monostelic honesty (why the giant bamboo and the slender mint share one architecture).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Primary Craft and Its Two Rings',
      'The Stele\u2019s Evolution',
      'The Trace-and-Gap Continuity',
      'The Modified-Stem Census',
    ],
  },
  {
    number: 5,
    slug: 'the-leaf',
    title: 'The Leaf',
    summary:
      'The photosynthetic organ: the anatomy of the typical blade (the two epidermes with their stomatal-and-guard-cell craft, the cuticle\u2019s water honesty, the mesophyll\u2019s palisade-and-spongy division of labour, the bundle-sheath-and-vein architecture); the stomatal register at depth (the opening\u2019s turgor-and-potassium mechanism, the dawn-and-dusk rhythm, the crypt-and-recess adaptations of the dry); the leaf\u2019s forms and venations (the parallel-against-reticulate honesty, the sheathing-base-and-stipule census); the abscission craft (the separation layer, the scar-and-protective register); the modified-leaf census (the scale, spine, tendril, the insectivorous pitcher\u2019s and bladderwort\u2019s carnivorous honesty — the nitrogen-hunger receipt); and the Kranz anatomy previewed for the plant-physiology book-and-C4 register.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Blade\u2019s Architecture',
      'The Stomatal Craft at Depth',
      'The Abscission Craft',
      'The Carnivorous Honesty',
    ],
  },
  {
    number: 6,
    slug: 'secondary-growth',
    title: 'The Secondary Growth',
    summary:
      'The wood-and-bark engine: the vascular cambium\u2019s origin (the fascicular-and-interfusional craft — the ring completed between the bundles); the cambium\u2019s two products (the fusiform initials\u2019 axial elements, the ray initials\u2019 horizontal highway — the xylem-and-phloem-and-ray arithmetic of a season\u2019s work); the wood\u2019s census (the spring\u2019s wide-and-thin-walled earlywood against the summer\u2019s dense latewood — the growth-ring arithmetic and the dendrochronology receipt, the heartwood\u2019s dead-and-preserved honesty against the sapwood\u2019s living wet); the cork engine (the phellogen-and-phelloderm register, the lenticel\u2019s breathing honesty, the bark\u2019s census from smooth to fissured); the secondary-growth arithmetic (the girth-and-height ledger, the monocot\u2019s absence honestly stated — with the palm-and-bamboo secondary records named as the exceptions they are); and the anomalous-and-wood census with the economic register priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ring Completed',
      'The Two Initials\u2019 Products',
      'The Ring-and-Bark Arithmetic',
      'The Anomalous Register and the Economic Woods',
    ],
  },
  {
    number: 7,
    slug: 'flower-fruit-anatomy',
    title: 'The Flower and the Fruit',
    summary:
      'The reproductive architecture: the floral whorl census (the calyx-and-corolla\u2019s perianth, the androecium-and-stamen craft — the anther\u2019s four-sac architecture, the tapetum\u2019s nurse role; the gynoecium-and-carpel craft — the ovule\u2019s integuments-and-nucellus-and-micropyle, the placenta\u2019s six arrangements); the floral anatomy\u2019s taxonomic value (the ovary\u2019s superior-and-inferior receipt, the placentation-and-aestivation registers cross-referenced to plant-taxonomy); the pollination architecture (the anther\u2019s dehiscence, the stigma-and-receptive craft — the self-and-cross engineering previewed for the plant-genetics book); the fruit anatomy (the pericarp\u2019s three layers, the true-and-accessory honesty, the fruit-types census from the simple berry-and-drupe-and-legume to the aggregate-and-multiple crafts); and the seed\u2019s anatomy (the coat-and-embryo-and-food-reserve register with the albuminous-against-exalbuminous arithmetic).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Floral Whorl Census',
      'The Taxonomic Receipts',
      'The Fruit-Types Census',
      'The Seed\u2019s Register',
    ],
  },
  {
    number: 8,
    slug: 'adaptive-anomalous-doorway',
    title: 'The Adaptive, the Anomalous and the Doorway',
    summary:
      'The register\u2019s close: the adaptive-anatomy census (the xerophyte\u2019s tricks — the thick cuticle, sunken stomata, the succulence-and-CAM cross-reference; the hydrophyte\u2019s aerenchyma-and-reduced-xylem honesty; the halophyte-and-salt craft); the anomalous-secondary register named at survey depth (the cambial variants of the lianas and the stored-xylem of the herbs); the anatomical method itself (the section\u2019s craft — the hand-section-and-stain register, the maceration for the isolated elements, the microscopic measure-and-draw discipline); and the doorway — to plant-physiology for the water-and-sugar story these structures serve, to plant-taxonomy for the diagnostic value they carry, to the economic-botany book for the woods-and-fibres they give us; the plant body honestly held as structure shaped by function, through deep time.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Adaptive Census',
      'The Anomalous Named',
      'The Method Itself',
      'The Doorway Drawn',
    ],
  },
]

export const plantAnatomy: Book = {
  id: 'plant-anatomy',
  title: 'Plant Anatomy',
  subtitle: 'The plant body opened up — tissues, organs, secondary growth and the wood register',
  discipline: 'biology',
  level: 'Undergraduate botany core (the Mauseth Plant Structure arc)',
  description: 'The structural botany discipline: the plant body\u2019s organisation (the root-shoot axis, the three tissue systems — the dermal, ground and vascular); the meristem register (the apical craft of primary growth, the lateral cambium-and-phellogen register of secondary growth, the intercalary honesty); the tissue census (the parenchyma\u2019s living versatility, the collenchyma\u2019s plastic support, the sclerenchyma\u2019s dead strength — fibres and sclereids, the tracheary elements\u2019 xylem-and-phloem craft with the vessel-against-tracheid honesty); the root (the zones from cap to hairs, the cortex-and-endodermis Casparian craft, the vascular cylinder\u2019s arrangements); the stem (the node-and-internode logic, the stele\u2019s evolution from protostele to siphonostele, the leaf-trace-and-gap craft); the leaf (the mesophyll-and-stomatal architecture, the Kranz honesty cross-referenced to plant physiology); the secondary growth register (the vascular cambium\u2019s fusiform-and-ray craft, the growth rings\u2019 dendrochronology arithmetic, the periderm-and-lenticel register, the wood-and-bark census); the flower-and-fruit anatomy (the floral whorls, the anther-and-ovule architecture, the fruit types); and the adaptive-and-anomalous anatomy register with the economic woods priced.',
  status: 'planned',
  accent: ['#4d7c0f', '#365314'],
  chapters,
}

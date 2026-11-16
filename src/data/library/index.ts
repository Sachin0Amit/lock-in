import { disciplines } from './disciplines'
import { foundationMathematics } from './books/mathematics/foundation-mathematics/book'
import { arithmeticNumberSystems } from './books/mathematics/arithmetic-number-systems/book'
import { elementaryAlgebra } from './books/mathematics/elementary-algebra/book'
import { advancedAlgebra } from './books/mathematics/advanced-algebra/book'
import { geometry } from './books/mathematics/geometry/book'
import { coordinateGeometry } from './books/mathematics/coordinate-geometry/book'
import { trigonometry } from './books/mathematics/trigonometry/book'
import { differentialCalculus } from './books/mathematics/differential-calculus/book'
import { integralCalculus } from './books/mathematics/integral-calculus/book'
import { multivariableCalculus } from './books/mathematics/multivariable-calculus/book'
import { differentialEquations } from './books/mathematics/differential-equations/book'
import { linearAlgebra } from './books/mathematics/linear-algebra/book'
import { discreteMathematics } from './books/mathematics/discrete-mathematics/book'
import { numberTheory } from './books/mathematics/number-theory/book'
import { setTheory } from './books/mathematics/set-theory/book'
import { mathematicalLogic } from './books/mathematics/mathematical-logic/book'
import { combinatorics } from './books/mathematics/combinatorics/book'
import { probabilityTheory } from './books/mathematics/probability-theory/book'
import { statistics } from './books/mathematics/statistics/book'
import { realAnalysis } from './books/mathematics/real-analysis/book'
import { complexAnalysis } from './books/mathematics/complex-analysis/book'
import { abstractAlgebra } from './books/mathematics/abstract-algebra/book'
import { topology } from './books/mathematics/topology/book'
import { numericalAnalysis } from './books/mathematics/numerical-analysis/book'
import { mathematicalMethodsForEngineering } from './books/mathematics/mathematical-methods-for-engineering/book'
import { optimizationAndOperationsResearch } from './books/mathematics/optimization-and-operations-research/book'
import { advancedMathematicalFoundations } from './books/mathematics/advanced-mathematical-foundations/book'
import { quantitativeAptitude } from './books/mathematics/quantitative-aptitude/book'
import { computerFundamentals } from './books/computer-science/computer-fundamentals/book'
import { digitalLogicDesign } from './books/computer-science/digital-logic-design/book'
import { computerOrganizationArchitecture } from './books/computer-science/computer-organization-architecture/book'
import { assemblyAndMicroprocessors } from './books/computer-science/assembly-and-microprocessors/book'
import { dataStructures } from './books/computer-science/data-structures/book'
import { algorithms } from './books/computer-science/algorithms/book'
import { theoryOfComputation } from './books/computer-science/theory-of-computation/book'
import { compilerDesign } from './books/computer-science/compiler-design/book'
import { operatingSystems } from './books/computer-science/operating-systems/book'
import { databaseManagementSystems } from './books/computer-science/database-management-systems/book'
import { computerNetworks } from './books/computer-science/computer-networks/book'
import { computerGraphics } from './books/computer-science/computer-graphics/book'
import { softwareEngineering } from './books/computer-science/software-engineering/book'
import { objectOrientedProgramming } from './books/computer-science/object-oriented-programming/book'
import { programmingLanguagesParadigms } from './books/computer-science/programming-languages-paradigms/book'
import { cProgramming } from './books/computer-science/c-programming/book'
import { cppProgramming } from './books/computer-science/cpp-programming/book'
import { javaProgramming } from './books/computer-science/java-programming/book'
import { pythonProgramming } from './books/computer-science/python-programming/book'
import { javascriptAndWebTechnologies } from './books/computer-science/javascript-and-web-technologies/book'
import { frontendEngineering } from './books/computer-science/frontend-engineering/book'
import { backendEngineering } from './books/computer-science/backend-engineering/book'
import { fullStackWebDevelopment } from './books/computer-science/full-stack-web-development/book'
import { distributedSystems } from './books/computer-science/distributed-systems/book'
import { cloudComputing } from './books/computer-science/cloud-computing/book'
import { cybersecurity } from './books/computer-science/cybersecurity/book'
import { cryptography } from './books/computer-science/cryptography/book'
import { artificialIntelligence } from './books/computer-science/artificial-intelligence/book'
import { machineLearning } from './books/computer-science/machine-learning/book'
import { deepLearning } from './books/computer-science/deep-learning/book'
import { naturalLanguageProcessing } from './books/computer-science/natural-language-processing/book'
import { computerVision } from './books/computer-science/computer-vision/book'
import { generativeAiAndLlms } from './books/computer-science/generative-ai-and-llms/book'
import { reinforcementLearning } from './books/computer-science/reinforcement-learning/book'
import { dataScience } from './books/computer-science/data-science/book'
import { bigDataEngineering } from './books/computer-science/big-data-engineering/book'
import { dataMining } from './books/computer-science/data-mining/book'
import { informationRetrieval } from './books/computer-science/information-retrieval/book'
import { blockchain } from './books/computer-science/blockchain/book'
import { internetOfThings } from './books/computer-science/internet-of-things/book'
import { mobileAppDevelopment } from './books/computer-science/mobile-app-development/book'
import { humanComputerInteraction } from './books/computer-science/human-computer-interaction/book'
import { parallelComputing } from './books/computer-science/parallel-computing/book'
import { advancedComputerScience } from './books/computer-science/advanced-computer-science/book'
import { engineeringMechanics } from './books/engineering/engineering-mechanics/book'
import { strengthOfMaterials } from './books/engineering/strength-of-materials/book'
import { theoryOfMachines } from './books/engineering/theory-of-machines/book'
import { machineDesign } from './books/engineering/machine-design/book'
import { thermodynamics } from './books/engineering/thermodynamics/book'
import { fluidMechanics } from './books/engineering/fluid-mechanics/book'
import { heatTransfer } from './books/engineering/heat-transfer/book'
import { manufacturingProcesses } from './books/engineering/manufacturing-processes/book'
import { industrialEngineering } from './books/engineering/industrial-engineering/book'
import { roboticsAndAutomation } from './books/engineering/robotics-and-automation/book'
import { cadCam } from './books/engineering/cad-cam/book'
import { materialsScience } from './books/engineering/materials-science/book'
import { circuitTheoryAndNetworkAnalysis } from './books/engineering/circuit-theory-and-network-analysis/book'
import { electricalMachines } from './books/engineering/electrical-machines/book'
import { powerSystems } from './books/engineering/power-systems/book'
import { controlSystems } from './books/engineering/control-systems/book'
import { powerElectronics } from './books/engineering/power-electronics/book'
import { electricalMeasurements } from './books/engineering/electrical-measurements/book'
import { highVoltageEngineering } from './books/engineering/high-voltage-engineering/book'
import { renewableEnergy } from './books/engineering/renewable-energy/book'
import { electromagneticFieldsAndWaves } from './books/engineering/electromagnetic-fields-and-waves/book'
import { electronicDevicesAndCircuits } from './books/engineering/electronic-devices-and-circuits/book'
import { analogElectronics } from './books/engineering/analog-electronics/book'
import { signalsAndSystems } from './books/engineering/signals-and-systems/book'
import { analogAndDigitalCommunication } from './books/engineering/analog-and-digital-communication/book'
import { vlsiDesign } from './books/engineering/vlsi-design/book'
import { embeddedSystems } from './books/engineering/embedded-systems/book'
import { antennasAndWavePropagation } from './books/engineering/antennas-and-wave-propagation/book'
import { digitalSignalProcessing } from './books/engineering/digital-signal-processing/book'
import { structuralEngineering } from './books/engineering/structural-engineering/book'
import { surveyingAndGeomatics } from './books/engineering/surveying-and-geomatics/book'
import { buildingMaterials } from './books/engineering/building-materials/book'
import { geotechnicalEngineering } from './books/engineering/geotechnical-engineering/book'
import { transportationEngineering } from './books/engineering/transportation-engineering/book'
import { environmentalEngineering } from './books/engineering/environmental-engineering/book'
import { hydraulics } from './books/engineering/hydraulics/book'
import { waterResourcesEngineering } from './books/engineering/water-resources-engineering/book'
import { constructionManagement } from './books/engineering/construction-management/book'
import { worldHistory } from './books/humanities/world-history/book'
import { indianHistory } from './books/humanities/indian-history/book'
import { politicalScience } from './books/humanities/political-science/book'
import { internationalRelations } from './books/humanities/international-relations/book'
import { publicAdministration } from './books/humanities/public-administration/book'
import { lawAndLegalStudies } from './books/humanities/law-and-legal-studies/book'
import { sociology } from './books/humanities/sociology/book'
import { anthropology } from './books/humanities/anthropology/book'
import { culturalStudies } from './books/humanities/cultural-studies/book'
import { psychology } from './books/humanities/psychology/book'
import { philosophy } from './books/humanities/philosophy/book'
import { ethics } from './books/humanities/ethics/book'
import { geography } from './books/humanities/geography/book'
import { environmentalStudies } from './books/humanities/environmental-studies/book'
import { archaeologyAndHeritageStudies } from './books/humanities/archaeology-and-heritage-studies/book'
import { artHistory } from './books/humanities/art-history/book'
import { english } from './books/languages/english/book'
import { hindi } from './books/languages/hindi/book'
import { sanskrit } from './books/languages/sanskrit/book'
import { japanese } from './books/languages/japanese/book'
import { german } from './books/languages/german/book'
import { french } from './books/languages/french/book'
import { spanish } from './books/languages/spanish/book'
import { mandarin } from './books/languages/mandarin/book'
import { korean } from './books/languages/korean/book'
import { arabic } from './books/languages/arabic/book'
import { russian } from './books/languages/russian/book'
import { portuguese } from './books/languages/portuguese/book'
import { italian } from './books/languages/italian/book'
import { foundationPhysics } from './books/physics/foundation-physics/book'
import { mechanics } from './books/physics/mechanics/book'
import { propertiesOfMatter } from './books/physics/properties-of-matter/book'
import { wavesAndOscillations } from './books/physics/waves-and-oscillations/book'
import { heatAndThermodynamics } from './books/physics/heat-and-thermodynamics/book'
import { electricityAndMagnetism } from './books/physics/electricity-and-magnetism/book'
import { electromagneticTheory } from './books/physics/electromagnetic-theory/book'
import { optics } from './books/physics/optics/book'
import { modernPhysics } from './books/physics/modern-physics/book'
import { quantumMechanics } from './books/physics/quantum-mechanics/book'
import { atomicPhysics } from './books/physics/atomic-physics/book'
import { nuclearPhysics } from './books/physics/nuclear-physics/book'
import { solidStatePhysics } from './books/physics/solid-state-physics/book'
import { statisticalMechanics } from './books/physics/statistical-mechanics/book'
import { relativity } from './books/physics/relativity/book'
import { astrophysics } from './books/physics/astrophysics/book'
import { particlePhysics } from './books/physics/particle-physics/book'
import { mathematicalPhysics } from './books/physics/mathematical-physics/book'
import { experimentalPhysics } from './books/physics/experimental-physics/book'
import { foundationEconomics } from './books/economics-commerce/foundation-economics/book'
import { microeconomics } from './books/economics-commerce/microeconomics/book'
import { macroeconomics } from './books/economics-commerce/macroeconomics/book'
import { internationalEconomics } from './books/economics-commerce/international-economics/book'
import { developmentEconomics } from './books/economics-commerce/development-economics/book'
import { publicEconomics } from './books/economics-commerce/public-economics/book'
import { monetaryEconomics } from './books/economics-commerce/monetary-economics/book'
import { econometrics } from './books/economics-commerce/econometrics/book'
import { behaviouralEconomics } from './books/economics-commerce/behavioural-economics/book'
import { financialEconomics } from './books/economics-commerce/financial-economics/book'
import { businessStudies } from './books/economics-commerce/business-studies/book'
import { accounting } from './books/economics-commerce/accounting/book'
import { costAccounting } from './books/economics-commerce/cost-accounting/book'
import { financialManagementAndCorporateFinance } from './books/economics-commerce/financial-management-and-corporate-finance/book'
import { banking } from './books/economics-commerce/banking/book'
import { investmentAnalysis } from './books/economics-commerce/investment-analysis/book'
import { statisticsForEconomics } from './books/economics-commerce/statistics-for-economics/book'
import { businessMathematics } from './books/economics-commerce/business-mathematics/book'
import { entrepreneurship } from './books/economics-commerce/entrepreneurship/book'
import { marketing } from './books/economics-commerce/marketing/book'
import { humanResourceManagement } from './books/economics-commerce/human-resource-management/book'
import { operationsManagement } from './books/economics-commerce/operations-management/book'
import { internationalBusiness } from './books/economics-commerce/international-business/book'
import { foundationChemistry } from './books/chemistry/foundation-chemistry/book'
import { physicalChemistry } from './books/chemistry/physical-chemistry/book'
import { organicChemistry } from './books/chemistry/organic-chemistry/book'
import { inorganicChemistry } from './books/chemistry/inorganic-chemistry/book'
import { analyticalChemistry } from './books/chemistry/analytical-chemistry/book'
import { environmentalChemistry } from './books/chemistry/environmental-chemistry/book'
import { biochemistry } from './books/chemistry/biochemistry/book'
import { quantumChemistry } from './books/chemistry/quantum-chemistry/book'
import { computationalChemistry } from './books/chemistry/computational-chemistry/book'
import { industrialChemistry } from './books/chemistry/industrial-chemistry/book'
/* Biology full-shelf planning pass (2026-11-16): 23 books, status planned, zero lessons written; durable generator scripts/gen_biology_shelf.py, evidence docs/research/BIOLOGY_TOC_SURVEY.md */
import { foundationBiology } from './books/biology/foundation-biology/book'
import { cellBiology } from './books/biology/cell-biology/book'
import { molecularBiology } from './books/biology/molecular-biology/book'
import { genetics } from './books/biology/genetics/book'
import { evolution } from './books/biology/evolution/book'
import { ecology } from './books/biology/ecology/book'
import { biotechnology } from './books/biology/biotechnology/book'
import { microbiology } from './books/biology/microbiology/book'
import { immunology } from './books/biology/immunology/book'
import { plantAnatomy } from './books/biology/plant-anatomy/book'
import { plantPhysiology } from './books/biology/plant-physiology/book'
import { plantTaxonomy } from './books/biology/plant-taxonomy/book'
import { plantEcology } from './books/biology/plant-ecology/book'
import { plantGenetics } from './books/biology/plant-genetics/book'
import { plantPathology } from './books/biology/plant-pathology/book'
import { economicBotany } from './books/biology/economic-botany/book'
import { animalDiversity } from './books/biology/animal-diversity/book'
import { animalAnatomy } from './books/biology/animal-anatomy/book'
import { animalPhysiology } from './books/biology/animal-physiology/book'
import { developmentalBiology } from './books/biology/developmental-biology/book'
import { animalBehaviour } from './books/biology/animal-behaviour/book'
import { entomology } from './books/biology/entomology/book'
import { parasitology } from './books/biology/parasitology/book'
/* Medical Sciences full-shelf planning pass (2026-11-16): 19 books, status planned, zero lessons written; durable generator scripts/gen_medical_shelf.py, evidence docs/research/MEDICAL_TOC_SURVEY.md */
import { anatomy } from './books/medical-sciences/anatomy/book'
import { medicalPhysiology } from './books/medical-sciences/medical-physiology/book'
import { medicalBiochemistry } from './books/medical-sciences/medical-biochemistry/book'
import { histology } from './books/medical-sciences/histology/book'
import { pathology } from './books/medical-sciences/pathology/book'
import { pharmacology } from './books/medical-sciences/pharmacology/book'
import { medicalMicrobiology } from './books/medical-sciences/medical-microbiology/book'
import { clinicalImmunology } from './books/medical-sciences/clinical-immunology/book'
import { forensicMedicine } from './books/medical-sciences/forensic-medicine/book'
import { communityMedicine } from './books/medical-sciences/community-medicine/book'
import { internalMedicine } from './books/medical-sciences/internal-medicine/book'
import { generalSurgery } from './books/medical-sciences/general-surgery/book'
import { obstetricsGynaecology } from './books/medical-sciences/obstetrics-gynaecology/book'
import { pediatrics } from './books/medical-sciences/pediatrics/book'
import { dentistry } from './books/medical-sciences/dentistry/book'
import { nursing } from './books/medical-sciences/nursing/book'
import { pharmacy } from './books/medical-sciences/pharmacy/book'
import { veterinaryMedicine } from './books/medical-sciences/veterinary-medicine/book'
import { physiotherapy } from './books/medical-sciences/physiotherapy/book'
/* Arts-Music full-shelf planning pass (2026-11-16): 36 books, status planned, zero lessons written; durable generator scripts/gen_arts_music_shelf.py, evidence docs/research/ARTS_MUSIC_TOC_SURVEY.md */
import { musicTheoryNotation } from './books/arts-music/music-theory-notation/book'
import { rhythmMeter } from './books/arts-music/rhythm-meter/book'
import { harmony } from './books/arts-music/harmony/book'
import { counterpoint } from './books/arts-music/counterpoint/book'
import { earTraining } from './books/arts-music/ear-training/book'
import { musicComposition } from './books/arts-music/music-composition/book'
import { musicHistory } from './books/arts-music/music-history/book'
import { acoustics } from './books/arts-music/acoustics/book'
import { instrumentStudies } from './books/arts-music/instrument-studies/book'
import { vocalMusic } from './books/arts-music/vocal-music/book'
import { musicProduction } from './books/arts-music/music-production/book'
import { drawing } from './books/arts-music/drawing/book'
import { painting } from './books/arts-music/painting/book'
import { colourTheory } from './books/arts-music/colour-theory/book'
import { perspective } from './books/arts-music/perspective/book'
import { illustration } from './books/arts-music/illustration/book'
import { sculpture } from './books/arts-music/sculpture/book'
import { graphicDesign } from './books/arts-music/graphic-design/book'
import { typography } from './books/arts-music/typography/book'
import { photography } from './books/arts-music/photography/book'
import { digitalArt } from './books/arts-music/digital-art/book'
import { animation } from './books/arts-music/animation/book'
import { threeDModelling } from './books/arts-music/3d-modelling/book'
import { danceFundamentals } from './books/arts-music/dance-fundamentals/book'
import { classicalDance } from './books/arts-music/classical-dance/book'
import { contemporaryDance } from './books/arts-music/contemporary-dance/book'
import { theatre } from './books/arts-music/theatre/book'
import { acting } from './books/arts-music/acting/book'
import { filmStudies } from './books/arts-music/film-studies/book'
import { cinematography } from './books/arts-music/cinematography/book'
import { screenwriting } from './books/arts-music/screenwriting/book'
import { stageProduction } from './books/arts-music/stage-production/book'
import { architecture } from './books/arts-music/architecture/book'
import { interiorDesign } from './books/arts-music/interior-design/book'
import { fashionDesign } from './books/arts-music/fashion-design/book'
import { creativeWriting } from './books/arts-music/creative-writing/book'
import type { Book, Chapter, Discipline, DisciplineId, Lesson, Term } from './types'
import { countLessonWords } from './types'
import { bookGlossary, type SearchHit } from './derive'

/*
 * PURE helpers (paths, bookStats, bookGlossary, bookFormulas, headings,
 * disciplineOf and the UI prop types) live in ./derive — client-safe, no
 * registry imports — and are re-exported below so every existing server
 * consumer (builder catalog, practice engine, packer) keeps working.
 * Everything data-bound in THIS module (allBooks, allLessons, findLesson,
 * searchLibrary, libraryStats) must stay server-side only: importing it
 * from a client component ships the whole library into the browser bundle
 * (fixed 2026-11-16 — see docs/project/CONTENT_DATABASE.md).
 */
export {
  paths,
  disciplineOf,
  bookLessons,
  bookGlossary,
  bookFormulas,
  headingAnchor,
  lessonHeadings,
  bookStats,
} from './derive'
export type {
  LessonRef,
  BookStats,
  GlossaryEntry,
  FormulaEntry,
  SearchHit,
  ShelfBook,
  LessonStub,
  LibrarySnapshot,
  NavLesson,
  CoverBook,
} from './derive'

/**
 * LockIn Library — central registry.
 *
 * Every book in the platform is imported here and nothing else touches the
 * book folders. To add a book: create its folder under books/<discipline>/,
 * export a Book from book.ts, import it into `allBooks`, done — the library
 * home, search index, navigation and stats all pick it up automatically.
 *
 * The mathematics shelf is fully planned as of the 2026-11-10 full-shelf
 * planning pass (27 books) plus the topic-inclusion guarantee pass
 * (2026-11-10, same day: the Khattar aptitude census's commercial family
 * given its own home): 28 books — 3 complete, 1 planned-with-authoring-
 * opening (Advanced Algebra) and 24 planned (status 'planned', complete
 * researched chapter/lesson layouts; see docs/research/DRIVE_TOC_SURVEY.md
 * for the reference evidence base and the topic coverage audit). Authoring
 * continues one book at a time.
 *
 * The Computer Science shelf is fully planned as of the 2026-11-15 CS
 * full-shelf planning pass (owner directive: mirror the mathematics
 * method): 44 books, status 'planned', zero lessons written — complete
 * researched chapter/lesson layouts with the evidence base at
 * docs/research/CS_TOC_SURVEY.md (27 Drive TOC extractions + web-checked
 * canonical arcs) and the gate scripts/verify-cs-shelf-planning.ts.
 *
 * The Engineering shelf is fully planned as of the 2026-11-16 Engineering
 * full-shelf planning pass (owner directive: "create all things how like
 * other subjects like maths and cs create it for engineering with books
 * topic same way as like other subject"): 38 books across the Mechanical,
 * Electrical, Electronics & Communication and Civil branches, status
 * 'planned', zero lessons written — complete researched chapter/lesson
 * layouts with the evidence base at docs/research/ENGINEERING_TOC_SURVEY.md
 * (the four GATE 2026 branch syllabi downloaded + extracted, canonical
 * textbook arcs web-checked) and the gate
 * scripts/verify-engineering-shelf-planning.ts.
 *
 * The Humanities & Social Sciences shelf is fully planned as of the
 * 2026-11-16 Humanities full-shelf planning pass (owner directive: "create all
 * things like you did for engineering do it for humanities and social science
 * and languages section" — the same turn as the Languages pass): 16 books
 * across the History, Polity & Governance, Society, Mind, Earth and Culture &
 * Past branches, status 'planned', zero lessons written — with the UPSC
 * GS-I/II/IV registers + the nine relevant optional-subject registers + the
 * UGC NET subject register + the College Board AP units + the CLAT register
 * as the exam anchors, and the evidence base at
 * docs/research/HUMANITIES_TOC_SURVEY.md and the gate
 * scripts/verify-humanities-shelf-planning.ts.
 *
 * The Languages shelf is fully planned as of the 2026-11-16 Languages
 * full-shelf planning pass (the same turn): 13 books — English, Hindi,
 * Sanskrit, Japanese, German, French, Spanish, Mandarin, Korean, Arabic,
 * Russian, Portuguese, Italian — status 'planned', zero lessons written, each
 * following the script → phonetics → vocabulary → grammar → literacy →
 * fluency → exam-prep arc with the CEFR + the official registers (JLPT,
 * Goethe-Zertifikat, DELF-DALF, DELE, HSK, TOPIK, IELTS, TOEFL, CLEP) as
 * the exam anchors; the evidence base at docs/research/LANGUAGES_TOC_SURVEY.md
 * and the gate scripts/verify-languages-shelf-planning.ts.
 *
 * The Physics shelf is fully planned as of the 2026-11-16 Physics full-shelf
 * planning pass (owner directive: "create a researched books with chapter
 * and topics for sections like finance, physics etc all the listed in docs
 * which can be authored later"): 19 books — the backlog's 20 lines with the
 * ONE honest fold (the Fluid Mechanics line folded into the mechanics
 * book's fluid chapters, cross-referenced to engineering's fluid-mechanics)
 * — status 'planned', zero lessons written, complete researched
 * chapter/lesson layouts; the evidence base at
 * docs/research/PHYSICS_TOC_SURVEY.md (the JEE Main 2026, NEET 2026, GATE
 * PH 2026 and CSIR NET Physical Sciences syllabus pages read this pass)
 * and the gate scripts/verify-physics-shelf-planning.ts.
 *
 * The Economics, Commerce & Finance shelf is fully planned as of the
 * 2026-11-16 ECF full-shelf planning pass (the same owner directive, the
 * same turn): 23 books — the backlog's 24 lines with the ONE honest fold
 * (Financial Management + Corporate Finance merged into ONE book, the
 * Circuit-Theory precedent) — status 'planned', zero lessons written;
 * the evidence base at docs/research/ECF_TOC_SURVEY.md (the UGC NET
 * Economics / Commerce / Management / HRM syllabus pages, the Mankiw
 * Principles TOC and the Brealey-Myers-Allen apparatus read this pass)
 * and the gate scripts/verify-ecf-shelf-planning.ts.
 *
 * The Chemistry shelf is fully planned as of the 2026-11-16 Chemistry
 * full-shelf planning pass (the same owner directive, the same turn):
 * 10 books — the backlog's 15 lines with FIVE honest folds (General →
 * foundation; Electrochemistry + Kinetics + Advanced Thermodynamics →
 * physical-chemistry; Materials → the engineering shelf's
 * materials-science, cross-referenced) — status 'planned', zero lessons
 * written; the evidence base at docs/research/CHEMISTRY_TOC_SURVEY.md
 * (the GATE CY 2026 + CSIR NET Chemical Sciences syllabus PDFs, the
 * Atkins Focus structure, the Clayden and J.D. Lee contents read this
 * pass) and the gate scripts/verify-chemistry-shelf-planning.ts.
 */
export const allBooks: Book[] = [
  foundationMathematics,
  arithmeticNumberSystems,
  elementaryAlgebra,
  advancedAlgebra,
  geometry,
  coordinateGeometry,
  trigonometry,
  differentialCalculus,
  integralCalculus,
  multivariableCalculus,
  differentialEquations,
  linearAlgebra,
  discreteMathematics,
  numberTheory,
  setTheory,
  mathematicalLogic,
  combinatorics,
  probabilityTheory,
  statistics,
  realAnalysis,
  complexAnalysis,
  abstractAlgebra,
  topology,
  numericalAnalysis,
  mathematicalMethodsForEngineering,
  optimizationAndOperationsResearch,
  advancedMathematicalFoundations,
  quantitativeAptitude,
  computerFundamentals,
  digitalLogicDesign,
  computerOrganizationArchitecture,
  assemblyAndMicroprocessors,
  dataStructures,
  algorithms,
  theoryOfComputation,
  compilerDesign,
  operatingSystems,
  databaseManagementSystems,
  computerNetworks,
  computerGraphics,
  softwareEngineering,
  objectOrientedProgramming,
  programmingLanguagesParadigms,
  cProgramming,
  cppProgramming,
  javaProgramming,
  pythonProgramming,
  javascriptAndWebTechnologies,
  frontendEngineering,
  backendEngineering,
  fullStackWebDevelopment,
  distributedSystems,
  cloudComputing,
  cybersecurity,
  cryptography,
  artificialIntelligence,
  machineLearning,
  deepLearning,
  naturalLanguageProcessing,
  computerVision,
  generativeAiAndLlms,
  reinforcementLearning,
  dataScience,
  bigDataEngineering,
  dataMining,
  informationRetrieval,
  blockchain,
  internetOfThings,
  mobileAppDevelopment,
  humanComputerInteraction,
  parallelComputing,
  advancedComputerScience,
  engineeringMechanics,
  strengthOfMaterials,
  theoryOfMachines,
  machineDesign,
  thermodynamics,
  fluidMechanics,
  heatTransfer,
  manufacturingProcesses,
  industrialEngineering,
  roboticsAndAutomation,
  cadCam,
  materialsScience,
  circuitTheoryAndNetworkAnalysis,
  electricalMachines,
  powerSystems,
  controlSystems,
  powerElectronics,
  electricalMeasurements,
  highVoltageEngineering,
  renewableEnergy,
  electromagneticFieldsAndWaves,
  electronicDevicesAndCircuits,
  analogElectronics,
  signalsAndSystems,
  analogAndDigitalCommunication,
  vlsiDesign,
  embeddedSystems,
  antennasAndWavePropagation,
  digitalSignalProcessing,
  structuralEngineering,
  surveyingAndGeomatics,
  buildingMaterials,
  geotechnicalEngineering,
  transportationEngineering,
  environmentalEngineering,
  hydraulics,
  waterResourcesEngineering,
  constructionManagement,
  worldHistory,
  indianHistory,
  politicalScience,
  internationalRelations,
  publicAdministration,
  lawAndLegalStudies,
  sociology,
  anthropology,
  culturalStudies,
  psychology,
  philosophy,
  ethics,
  geography,
  environmentalStudies,
  archaeologyAndHeritageStudies,
  artHistory,
  english,
  hindi,
  sanskrit,
  japanese,
  german,
  french,
  spanish,
  mandarin,
  korean,
  arabic,
  russian,
  portuguese,
  italian,
  foundationPhysics,
  mechanics,
  propertiesOfMatter,
  wavesAndOscillations,
  heatAndThermodynamics,
  electricityAndMagnetism,
  electromagneticTheory,
  optics,
  modernPhysics,
  quantumMechanics,
  atomicPhysics,
  nuclearPhysics,
  solidStatePhysics,
  statisticalMechanics,
  relativity,
  astrophysics,
  particlePhysics,
  mathematicalPhysics,
  experimentalPhysics,
  foundationEconomics,
  microeconomics,
  macroeconomics,
  internationalEconomics,
  developmentEconomics,
  publicEconomics,
  monetaryEconomics,
  econometrics,
  behaviouralEconomics,
  financialEconomics,
  businessStudies,
  accounting,
  costAccounting,
  financialManagementAndCorporateFinance,
  banking,
  investmentAnalysis,
  statisticsForEconomics,
  businessMathematics,
  entrepreneurship,
  marketing,
  humanResourceManagement,
  operationsManagement,
  internationalBusiness,
  foundationChemistry,
  physicalChemistry,
  organicChemistry,
  inorganicChemistry,
  analyticalChemistry,
  environmentalChemistry,
  biochemistry,
  quantumChemistry,
  computationalChemistry,
  industrialChemistry,
  foundationBiology,
  cellBiology,
  molecularBiology,
  genetics,
  evolution,
  ecology,
  biotechnology,
  microbiology,
  immunology,
  plantAnatomy,
  plantPhysiology,
  plantTaxonomy,
  plantEcology,
  plantGenetics,
  plantPathology,
  economicBotany,
  animalDiversity,
  animalAnatomy,
  animalPhysiology,
  developmentalBiology,
  animalBehaviour,
  entomology,
  parasitology,
  anatomy,
  medicalPhysiology,
  medicalBiochemistry,
  histology,
  pathology,
  pharmacology,
  medicalMicrobiology,
  clinicalImmunology,
  forensicMedicine,
  communityMedicine,
  internalMedicine,
  generalSurgery,
  obstetricsGynaecology,
  pediatrics,
  dentistry,
  nursing,
  pharmacy,
  veterinaryMedicine,
  physiotherapy,
  musicTheoryNotation,
  rhythmMeter,
  harmony,
  counterpoint,
  earTraining,
  musicComposition,
  musicHistory,
  acoustics,
  instrumentStudies,
  vocalMusic,
  musicProduction,
  drawing,
  painting,
  colourTheory,
  perspective,
  illustration,
  sculpture,
  graphicDesign,
  typography,
  photography,
  digitalArt,
  animation,
  threeDModelling,
  danceFundamentals,
  classicalDance,
  contemporaryDance,
  theatre,
  acting,
  filmStudies,
  cinematography,
  screenwriting,
  stageProduction,
  architecture,
  interiorDesign,
  fashionDesign,
  creativeWriting,
]

export const allDisciplines: Discipline[] = disciplines

/* ------------------------------------------------------------------ */
/* Derived structure                                                   */
/* ------------------------------------------------------------------ */

import type { LessonRef } from './derive'

/** Every written lesson in the library, in book/chapter order. */
export const allLessons: LessonRef[] = allBooks.flatMap((book) =>
  book.chapters.flatMap((chapter) =>
    chapter.lessons.map((lesson) => {
      const words = lesson.words ?? countLessonWords(lesson)
      return { book, chapter, lesson, words, readMins: Math.max(1, Math.round(words / 200)) }
    }),
  ),
)

export function findBook(id: string): Book | undefined {
  return allBooks.find((b) => b.id === id)
}

export function findLesson(id: string): LessonRef | undefined {
  return allLessons.find((l) => l.lesson.id === id)
}

/** The lesson written immediately before/after a given lesson in its book. */
export function lessonNeighbours(id: string): { prev?: LessonRef; next?: LessonRef } {
  const idx = allLessons.findIndex((l) => l.lesson.id === id)
  if (idx === -1) return {}
  return {
    prev: idx > 0 ? allLessons[idx - 1] : undefined,
    next: idx < allLessons.length - 1 ? allLessons[idx + 1] : undefined,
  }
}

export function booksOfDiscipline(d: DisciplineId | string): Book[] {
  return allBooks.filter((b) => b.discipline === d)
}

/* disciplineOf & paths live in ./derive (re-exported above). */

/* Glossary / formulas / heading helpers live in ./derive (re-exported above). */

/* ------------------------------------------------------------------ */
/* Library statistics                                                  */
/* ------------------------------------------------------------------ */

export function libraryStats() {
  const written = allLessons.length
  const words = allLessons.reduce((n, l) => n + l.words, 0)
  const plannedLessons = allBooks.reduce(
    (n, b) =>
      n +
      b.chapters.reduce(
        (m, c) => m + c.lessons.length + (c.plannedLessons?.length ?? 0),
        0,
      ),
    0,
  )
  const terms = allBooks.reduce((n, b) => n + bookGlossary(b).length, 0)
  return {
    disciplines: disciplines.length,
    books: allBooks.length,
    written,
    plannedLessons,
    words,
    terms,
  }
}

/* bookStats lives in ./derive (re-exported above). */

/* ------------------------------------------------------------------ */
/* Search                                                              */
/* ------------------------------------------------------------------ */

/* SearchHit lives in ./derive (re-exported above). */

interface SearchDoc {
  lessonId: string
  bookId: string
  /** lowercase searchable text of the whole lesson (prose, headings, terms, captions) */
  blob: string
  /** raw (original case) text for snippet extraction */
  raw: string
}

/** Collect every human-readable string in a lesson into one searchable blob. */
function lessonText(lesson: Lesson): string {
  const parts: string[] = [lesson.title, lesson.concepts.join(' ')]
  for (const b of lesson.blocks) {
    switch (b.kind) {
      case 'para':
      case 'heading':
        parts.push(b.text)
        break
      case 'callout':
        parts.push(b.title, b.text)
        break
      case 'terms':
        for (const t of b.items) parts.push(t.term, t.def)
        break
      case 'equation':
        if (b.note) parts.push(b.note)
        break
      case 'derivation':
        parts.push(b.title, b.statement)
        for (const s of b.steps) parts.push(s.label, s.explanation)
        parts.push(b.result)
        break
      case 'example':
        parts.push(b.title, ...b.steps)
        break
      case 'figure':
        parts.push(b.caption)
        break
      case 'table':
        if (b.caption) parts.push(b.caption)
        parts.push(...b.head)
        for (const r of b.rows) parts.push(...r)
        break
      case 'list':
        parts.push(...b.items)
        break
      case 'quiz':
        for (const it of b.items) parts.push(it.q, it.explain, ...it.options)
        break
      case 'exercises':
        for (const set of b.sets)
          for (const q of set.questions) {
            const sol = Array.isArray(q.solution) ? q.solution.join(' ') : q.solution
            parts.push(q.q, sol, q.answer ?? '')
          }
        break
      case 'formula':
        parts.push(b.name, b.note ?? '')
        break
      case 'algorithm':
        parts.push(b.title, b.note ?? '')
        for (const l of b.lines) parts.push(l.code, l.note ?? '')
        break
    }
  }
  return parts.join(' \n ')
}

/** Built once at module load: one searchable document per written lesson. */
const SEARCH_DOCS: SearchDoc[] = allLessons.map(({ book, lesson }) => {
  const raw = lessonText(lesson)
  return { lessonId: lesson.id, bookId: book.id, blob: raw.toLowerCase(), raw }
})

/** True when every space-separated token appears somewhere in `haystack`. */
function allTokensIn(tokens: string[], haystack: string): boolean {
  return tokens.every((t) => haystack.includes(t))
}

/** Short centered excerpt around the first token match, for full-text hits. */
function makeSnippet(raw: string, tokens: string[], len = 130): string {
  const lower = raw.toLowerCase()
  let at = -1
  for (const t of tokens) {
    const i = lower.indexOf(t)
    if (i !== -1 && (at === -1 || i < at)) at = i
  }
  if (at === -1) return ''
  const start = Math.max(0, at - 40)
  const text = raw.slice(start, start + len).replace(/\s+/g, ' ').trim()
  return `${start > 0 ? '… ' : ''}${text}${start + len < raw.length ? ' …' : ''}`
}

/**
 * Client-side search across books, lessons, glossary terms and full lesson
 * text. Ranking: title starts-with > title contains > concept/term match >
 * chapter title > contiguous full-text > scattered token match.
 */
export function searchLibrary(query: string, limit = 16): SearchHit[] {
  const q = query.trim().toLowerCase()
  if (q.length < 2) return []
  const tokens = q.split(/\s+/).filter(Boolean)
  const hits: SearchHit[] = []

  for (const b of allBooks) {
    const inTitle = b.title.toLowerCase()
    const inDesc = `${b.subtitle ?? ''} ${b.description}`.toLowerCase()
    if (inTitle.includes(q) || inDesc.includes(q) || allTokensIn(tokens, inDesc)) {
      hits.push({
        type: 'book',
        score: inTitle.startsWith(q) ? 100 : inTitle.includes(q) ? 60 : 20,
        title: b.title,
        subtitle: b.subtitle ?? b.description.slice(0, 80),
        bookId: b.id,
      })
    }
  }

  for (const { book, chapter, lesson } of allLessons) {
    const title = lesson.title.toLowerCase()
    const chapterTitle = chapter.title.toLowerCase()
    const concepts = lesson.concepts.join(' ').toLowerCase()
    const doc = SEARCH_DOCS.find((d) => d.lessonId === lesson.id)
    const blob = doc?.blob ?? ''
    let score = 0
    let snippet: string | undefined
    if (title.startsWith(q)) score = 95
    else if (title.includes(q)) score = 75
    else if (concepts.includes(q)) score = 55
    else if (chapterTitle.includes(q)) score = 45
    else if (blob.includes(q)) {
      score = 35
      snippet = makeSnippet(doc!.raw, [q])
    } else if (allTokensIn(tokens, blob)) {
      score = 28
      snippet = makeSnippet(doc!.raw, tokens)
    }
    if (score > 0) {
      hits.push({
        type: 'lesson',
        score,
        title: `${lesson.number} ${lesson.title}`,
        subtitle: `${book.title} · Chapter ${chapter.number}: ${chapter.title}`,
        snippet,
        lessonId: lesson.id,
        bookId: book.id,
      })
    }
  }

  /* Glossary term hits — definitions are often what a reader looks for. */
  for (const b of allBooks) {
    for (const entry of bookGlossary(b)) {
      const term = entry.term.toLowerCase()
      const def = entry.def.toLowerCase()
      let score = 0
      if (term === q) score = 85
      else if (term.startsWith(q)) score = 65
      else if (term.includes(q)) score = 50
      else if (def.includes(q)) score = 30
      if (score > 0) {
        hits.push({
          type: 'term',
          score,
          title: entry.term,
          subtitle: `Term · ${b.title} · lesson ${entry.lessonNumber}`,
          snippet: entry.def.length > 110 ? `${entry.def.slice(0, 110).trim()}…` : entry.def,
          lessonId: entry.lessonId,
          bookId: b.id,
        })
      }
    }
  }

  return hits
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit)
}

export type { Book, Chapter, Lesson, Discipline, DisciplineId, Term }

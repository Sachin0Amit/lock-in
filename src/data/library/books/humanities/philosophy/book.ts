import type { Book, Chapter } from '../../../types'

/**
 * Philosophy — the second book of the Mind branch.
 *
 * STATUS: PLANNED (Humanities & Social Sciences full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 45 planned lessons, zero written. Lesson ids will use the `phil-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Philosophy owns the pure-speculative register — the questions as questions. Ethics owns the moral register’s APPLICATION (the GS4 and the applied census — the normative theories are surveyed here at depth and applied there; the contract priced); Political Science owns the state’s practical reading (this book’s socio-political chapter is the normative side, cross-referenced); the Mathematics shelf’s mathematical-logic book owns the formal logic (this book’s logic chapter is the informal base — the hand-off stated in both); the Sanskrit book owns the language (the darshanas’ Sanskrit register cross-referenced); the CS shelf’s AI books cross-reference the philosophy-of-mind chapters.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The UPSC Philosophy optional register (read this pass — vajiramandravi.com + the testbook PDF: Paper I the History and Problems of Philosophy — the Indian darshanas, the Carvaka, the Buddhist and Jain systems, Western from Plato and Aristotle through Descartes-Spinoza-Leibniz, Locke-Berkeley-Hume, Kant, Hegel, dialectical materialism, logical positivism, phenomenology, existentialism; Paper II the socio-political philosophy and the philosophy of religion).
 * - Chatterjee & Datta, An Introduction to Indian Philosophy (the Google Books record read this pass — the general principles and the brief-sketch-of-each-system structure as the Indian pole).
 * - Russell's A History of Western Philosophy named as the Western survey pole (the classic's chapter arc as the standard register); the Durant's Story of Philosophy named as the popular companion.
 * - UGC NET Philosophy (code 03 — the updated-syllabus list read this pass at ugcnetonline.in).
 * - The NCERT-based school register named (the class 11-12 philosophy electives' arcs).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'what-is-philosophy',
    title: 'What Is Philosophy?',
    summary:
      'The discipline\u2019s own introduction: the word\u2019s etymology as the method\u2019s clue (the love of wisdom — the wanting as the point); the branches\u2019 census (metaphysics the what-is, epistemology the how-known, ethics the how-to-live, logic the how-to-think — each with its guiding question); the Western and the Indian contrasts priced honestly (the argument\u2019s adversarial tradition against the darshana\u2019s moksha orientation — the liberation as philosophy\u2019s end in the Indian frame); and the shelf\u2019s own map — which questions this book owns and which live in Ethics, Political Science and the Mathematics shelf\u2019s logic.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Word and the Method',
      'The Branches\u2019 Census',
      'The Western-Indian Contrast',
      'The Shelf\u2019s Own Map',
      'Unit 6: Recent Western Philosophy',
      'Historical Method, Research, Methodology And Historiography (scope And',
    ],
  },
  {
    number: 2,
    slug: 'the-logic-base',
    title: 'The Logic Base',
    summary:
      'The thinking\u2019s craft: the argument\u2019s anatomy (the premises, the conclusion, the indicator words); the validity and soundness\u2019s distinction (the valid-from-false-premises demonstration); the argument forms\u2019 census (the deductive — the syllogism\u2019s figure, the hypothetical and disjunctive; the inductive — the generalisation, the analogy, the cause); the informal fallacies\u2019 register (the relevance\u2019s family — the ad hominem and the appeal; the ambiguity\u2019s family — the equivocation and the composition; the Indian hetvabhasa register named); and the hand-off — the formal logic\u2019s propositional and predicate depth cross-referenced to the Mathematics shelf\u2019s mathematical-logic book.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Argument\u2019s Anatomy',
      'The Forms\u2019 Census',
      'The Fallacies\u2019 Register',
      'The Formal Handoff',
      'Unit 9: Logic',
    ],
  },
  {
    number: 3,
    slug: 'epistemology',
    title: 'Epistemology',
    summary:
      'The knowledge\u2019s theory: the knowledge\u2019s analysis (the justified-true-belief triad and the Gettier\u2019s crack); the justification\u2019s theories (the foundationalism\u2019s tower, the coherentism\u2019s web, the reliabilism\u2019s externalist turn); the rationalism against the empiricism\u2019s long argument (the innate ideas\u2019 debate — Descartes against Locke); the Kant\u2019s synthesis priced at survey depth (the mind\u2019s contribution — the categories); skepticism\u2019s lessons (the dream and the demon\u2019s method value — the doubt as the tool, not the conclusion); and the Indian pramana register (the Nyaya\u2019s four sources — the perception, inference, comparison, testimony — the Bhartrhari\u2019s testimony debate priced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The JTB and the Gettier',
      'The Justification\u2019s Theories',
      'Rationalism against Empiricism',
      'The Indian Pramana Register',
    ],
  },
  {
    number: 4,
    slug: 'metaphysics',
    title: 'Metaphysics',
    summary:
      'The being\u2019s questions: the substance\u2019s problem (the thing\u2019s what — the form and matter, the bundle theory\u2019s counter); the causation\u2019s analysis (the Humean regularity against the necessary connection\u2019s Kantian answer — the Buddhist pratityasamutpada named); the mind-body problem\u2019s census (the dualism, the materialism, the functionalism — the qualia\u2019s hard problem priced honestly, the AI cross-reference to the CS shelf); the free will and determinism (the compatibilism\u2019s craft — the Gita\u2019s karma register as the Indian parallel priced carefully); the personal identity (the ship of Theseus — the memory criterion); and the God question (the proofs\u2019 census — the ontological, cosmological and design arguments with the Humean critique, the evil\u2019s problem as the counter).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Substance and the Causation',
      'The Mind-Body Problem',
      'The Free Will Question',
      'The God Question and the Proofs',
    ],
  },
  {
    number: 5,
    slug: 'the-indian-systems',
    title: 'The Indian Systems',
    summary:
      'The darshana\u2019s six houses as one conversation: the Nyaya\u2019s logic (the pramana theory as the entry, the tarka\u2019s method); the Vaisheshika\u2019s categories (the padartha census — the atomism priced); the Samkhya\u2019s dualism (the purusha-prakriti frame, the guna\u2019s three); the Yoga\u2019s eight limbs (the Patanjali\u2019s ashtanga as the psychology\u2019s ancient craft); the Mimamsa\u2019s hermeneutics (the ritual\u2019s reading theory); the Vedanta\u2019s three (the Shankara\u2019s non-dualism — the brahman\u2019s maya, the Ramanuja\u2019s qualified, the Madhva\u2019s dualism); and the heterodox trio priced at full weight — the Carvaka\u2019s materialism (the perception-only epistemology), the Buddha\u2019s middle way (the anatta, the dependent origination, the four truths), the Mahavira\u2019s anekantavada (the many-sided truth — the syadvada\u2019s logic).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Nyaya-Vaisheshika Pair',
      'The Samkhya-Yoga Pair',
      'The Mimamsa-Vedanta Pair',
      'The Heterodox Trio',
    ],
  },
  {
    number: 6,
    slug: 'the-western-ancient-medieval',
    title: 'The Western Canon: Ancient and Medieval',
    summary:
      'The West\u2019s first act: the Presocratics\u2019 question-turn (the arche\u2019s hunt — Thales to Democritus, the Pythagoras\u2019s number); the Athens\u2019s trio (the Socrates\u2019s method — the elenchus as the examined life; the Plato\u2019s forms and the republic\u2019s justice; the Aristotle\u2019s four causes, the golden mean and the politics\u2019s zoon politikon); the Hellenistic therapies (the Stoic\u2019s apatheia, the Epicurus\u2019s ataraxia, the Skeptic\u2019s epoché); and the medieval act (the Augustine\u2019s two cities, the Aquinas\u2019s synthesis — the faith and reason\u2019s five ways, the Islamic and Jewish philosophy\u2019s register named — Al-Ghazali, Ibn Rushd, Maimonides).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Presocratics\u2019 Turn',
      'The Athens Trio',
      'The Hellenistic Therapies',
      'The Medieval Synthesis',
      'The Presocratics: Thales to Heraclitus',
      'Socrates, Plato and the Theory of Forms',
      'Aristotle: Logic, Ethics and Metaphysics',
      'Medieval Philosophy: Augustine to Aquinas',
      'Nietzsche, Existentialism and the Analytic Turn',
      'Chapter IV. Saint Augustine\'s Philosophy and Theology',
      'Chapter III. Pythagoras',
      'Chapter IV. Erasmus and More',
      'Western Political Thought - Plato, Aristotle, Machiavelli, Hobbes, Locke,',
    ],
  },
  {
    number: 7,
    slug: 'the-western-modern',
    title: 'The Western Canon: Modern',
    summary:
      'The West\u2019s second act: the rationalists (the Descartes\u2019s method and cogito — the foundation\u2019s crisis; the Spinoza\u2019s one substance; the Leibniz\u2019s monads and the best world); the empiricists (the Locke\u2019s blank slate and the qualities, the Berkeley\u2019s idealism — the esse percipi, the Hume\u2019s bundle and the fork); the Kant\u2019s critical turn (the synthetic-a-priori\u2019s question — the Copernican revolution in philosophy); the nineteenth century\u2019s register (the Hegel\u2019s dialectic, the Schopenhauer\u2019s will, the Marx\u2019s inversion — the praxis, the Nietzsche\u2019s genealogy and the god\u2019s death priced carefully); and the transition to the contemporary — the Frege-Russell\u2019s logic turn as the hinge.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Rationalists',
      'The Empiricists',
      'The Kantian Turn',
      'The Nineteenth Century\u2019s Register',
      'The Rationalists: Descartes, Spinoza and Leibniz',
      'The Empiricists: Locke, Berkeley and Hume',
      'Kant and the Critical Philosophy',
      'Chapter VII. Francis Bacon',
      'Chapter IX. Descartes',
      'Chapter XI. Leibniz',
    ],
  },
  {
    number: 8,
    slug: 'the-western-contemporary',
    title: 'The Western Canon: Contemporary',
    summary:
      'The West\u2019s third act: the analytic tradition (the Frege\u2019s sense-reference, the Russell\u2019s descriptions, the Wittgenstein\u2019s two — the picture of the Tractatus and the language games of the Investigations, the logical positivism\u2019s verification and its collapse); the phenomenology\u2019s register (the Husserl\u2019s intentionality and epoché, the Heidegger\u2019s dasein and being-toward-death); the existentialism\u2019s arc (the Kierkegaard\u2019s leap, the Sartre\u2019s freedom and the bad faith, the Camus\u2019s absurd and the Beckett register priced at survey depth); the continental\u2019s later register (the Foucault, Derrida and the postmodern\u2019s question — cross-referenced to Cultural Studies); and the analytic-contemporary\u2019s Indian register (the Bimal Krishna Matilal\u2019s Nyaya revival named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Phenomenological Register',
      'The Existential Arc',
      'The Contemporary Indian-Analytic Register',
    ],
  },
  {
    number: 9,
    slug: 'the-socio-political-philosophy',
    title: 'The Socio-Political Philosophy',
    summary:
      'The political\u2019s normative register: the equality\u2019s kinds (the formal against the substantive — the Rawls\u2019s difference principle priced); the justice\u2019s theories (the Rawls\u2019s veil of ignorance against the Nozick\u2019s entitlement — the debate framed honestly; the communitarian\u2019s Sandel correction; the Ambedkar\u2019s constitutional morality and the annihilation\u2019s argument as the Indian voice at full weight); the liberty\u2019s kinds (the negative and positive again — the political philosophy\u2019s home); the state\u2019s theories (the social contract\u2019s census — the Hobbes, Locke, Rousseau against the anarchist\u2019s question; the sovereignty and the danda\u2019s Indian debate); the democracy\u2019s Gandhi-against-Ambedkar register (the village republic\u2019s argument against the constitutional state\u2019s safeguards); and the gender justice\u2019s philosophy (the Okin register priced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Contract\u2019s Census',
      'The Indian Voices',
      'The Democracy and Gender Registers',
    ],
  },
  {
    number: 10,
    slug: 'the-applied-close-and-doorstep',
    title: 'The Applied Close and the Doorstep',
    summary:
      'The philosophy\u2019s contemporary work: the environmental ethics\u2019s register (the anthropocentric against the deep — the Indian prakriti register priced); the technology\u2019s questions (the AI\u2019s personhood and the alignment — the CS shelf\u2019s generative-AI book cross-referenced; the data\u2019s privacy as the informational self); the bioethics\u2019s pointer (the Ethics book owns the applied census — the hand-off stated); the death and the meaning\u2019s questions (the Camus\u2019s suicide question against the Gita\u2019s karma register — the death\u2019s philosophies compared); and the doorstep — to the reader\u2019s own wondering as philosophy\u2019s only real home, the examined life as the assignment.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Environmental Register',
      'The Technology Questions',
      'The Death and Meaning Registers',
      'The Doorstep: The Examined Life',
    ],
  },
]

export const philosophy: Book = {
  id: 'philosophy',
  title: 'Philosophy',
  subtitle: 'The love of wisdom — logic, knowledge, being and the Indian and Western canons',
  discipline: 'humanities',
  level: 'Senior secondary → university philosophy + UPSC (Philosophy optional)/UGC-NET readiness',
  description: 'The oldest discipline\u2019s honest survey. What philosophy is and its branches (metaphysics, epistemology, ethics, logic — the hand-off map to the shelf\u2019s other books stated up front); the logic base (the argument\u2019s anatomy, the validity and soundness, the fallacies\u2019 census — the formal depth handed to the Mathematics shelf\u2019s mathematical-logic book); epistemology (knowledge\u2019s analysis, the justification\u2019s theories, skepticism\u2019s lessons); metaphysics (being, causation, the mind-body problem, free will and determinism, personal identity, the philosophy of religion\u2019s proofs); then the Indian systems in full (the six darshanas — Nyaya\u2019s logic, Vaisheshika\u2019s categories, Samkhya\u2019s dualism, Yoga\u2019s eight limbs, Mimamsa\u2019s hermeneutics, Vedanta\u2019s non-dualism; the heterodox trio — the Carvaka\u2019s materialism, the Buddha\u2019s middle way, the Mahavira\u2019s anekantavada); the Western canon\u2019s three acts (the ancient-medieval — the Presocratics to Aquinas; the modern — Descartes to Hegel; the contemporary — the analytic and the continental turns); the socio-political philosophy register (equality, justice, liberty, the state, Gandhi-Ambedkar-Aurobindo); and the applied close. Cross-references Ethics (the moral register\u2019s application), the languages shelf\u2019s Sanskrit (the darshanas\u2019 language) and hands off to the reader\u2019s own wondering.',
  status: 'planned',
  accent: ['#44403c', '#292524'],
  chapters,
}

import type { Book, Chapter } from '../../../types'

/**
 * Ethics — the third book of the Mind branch.
 *
 * STATUS: PLANNED (Humanities & Social Sciences full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 36 planned lessons, zero written. Lesson ids will use the `eth-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Ethics owns the applied-moral register — the GS4 syllabus’s whole territory. Philosophy owns the normative theories’ history and the meta-ethics depth (the two cross-reference — the thinkers’ survey here for the moral-use, the full canon there; the contract stated in both books); Psychology owns the attitude and EI science (the mechanism chapters there, the administrative application here); Public Administration owns the accountability machinery (this book’s probity chapter is the values side, that book the institutional side); the CS shelf’s books cross-reference for the technology ethics.
 *
 * RESEARCH PHASE (2026-11-16):
 * - UPSC CSE GS Paper IV (the FULL register read this pass — drishtiias.com/mains/mains-syllabus/general-studies-paper-4: the Ethics and Human Interface; Attitude; Aptitude and foundational values; Emotional Intelligence; Contributions of Moral Thinkers; Public/Civil Service Values and Ethics in Public Administration; Probity in Governance; Case Studies).
 * - Rachels & Rachels, The Elements of Moral Philosophy (the McGraw-Hill product page read this pass — the TOC: What Is Morality?; The Challenge of Cultural Relativism; Subjectivism in Ethics; the utilitarian, Kantian and virtue arcs; the applied chapters) — mheducation.com.
 * - Lexicon for Ethics, Integrity and Aptitude named as the UPSC-tuned Indian pole (the standard register); the Subba Rao's Ethics arc named as the second pole.
 * - The NCERT values register named (the class 11-12 'Ethics and values' chapters priced as the school bridge).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-ethics-and-human-interface',
    title: 'The Ethics and Human Interface',
    summary:
      'The field\u2019s own map: the moral register\u2019s definition (the ethics as the systematic reflection on the moral — the morality against the etiquette and the law\u2019s boundaries); the essence and the determinants (the sources — the family, the society, the religion, the conscience\u2019s psychology cross-referenced); the consequences of ethics in human actions (the act\u2019s moral structure — the intention, the means, the end); the dimensions of ethics (the personal and the public — the public life\u2019s higher standard priced honestly); and the human values register (the lessons from the leaders\u2019 lives — the Gandhi\u2019s truth, the Lincoln\u2019s union of integrity, the Vivekananda\u2019s strength — the GS4\u2019s own line carried).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Moral Register Defined',
      'The Determinants of Ethics',
      'The Personal and the Public',
      'The Human Values Register',
    ],
  },
  {
    number: 2,
    slug: 'the-meta-walk',
    title: 'The Meta Walk',
    summary:
      'The challenge\u2019s honest tour (the Rachels arc): the cultural relativism\u2019s challenge (the Greeks and the Callatians — the argument\u2019s five steps and its collapse; the moral progress\u2019s need for a cross-cultural measure); the subjectivism\u2019s escape (the emotivism\u2019s dead end — the disagreement\u2019s real); the religion and morality\u2019s question (the divine command\u2019s dilemma — the Euthyphro\u2019s fork priced); the objectivity\u2019s middle (the reason\u2019s register — the minimum morality\u2019s Rachels argument); and the meta-ethics\u2019s map (the naturalism, the non-naturalism, the error theory\u2019s census — the hand-off to Philosophy\u2019s depth priced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Relativism Challenge',
      'The Subjectivism Escape',
      'The Religion Question',
      'The Objectivity\u2019s Middle',
    ],
  },
  {
    number: 3,
    slug: 'the-normative-census',
    title: 'The Normative Census',
    summary:
      'The three great theories and the thinkers: the utilitarian register (the Bentham\u2019s arithmetic and the Mill\u2019s qualitative correction, the measuring troubles, the trolley\u2019s honest exercises); the Kantian register (the good will, the categorical imperative\u2019s two formulations — the humanity\u2019s formula as the dignity\u2019s engine, the perfect-imperfect duties); the virtue register (the Aristotle\u2019s character — the golden mean, the phronesis, the telos; the Buddhist\u2019s karuna as the Indian virtue ethics priced); the applied pointers (the justice\u2019s Rawls-Nozick census — the hand-off to Philosophy\u2019s socio-political chapter); and the moral thinkers from India and the world in full (the GS4 register — the Buddha and the Mahavira, the Kautilya\u2019s danda-niti, the Gandhi\u2019s satya and ahimsa, the Ambedkar\u2019s constitutional morality; the Socrates, the Kant, the Mill, the Marx\u2019s critique register, the Peter Singer\u2019s expanding circle).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Utilitarian Register',
      'The Kantian Register',
      'The Virtue Register',
      'The Thinkers from India and the World',
    ],
  },
  {
    number: 4,
    slug: 'the-applied-census',
    title: 'The Applied Census',
    summary:
      'The fields where the theories earn their keep: the bioethics register (the autonomy-beneficence-justice triad, the consent\u2019s craft, the end-of-life\u2019s questions, the abortion and the enhancement\u2019s debates); the business and corporate ethics (the stakeholders against the shareholders, the CSR\u2019s honest register, the whistle-blowing\u2019s craft, the fraud\u2019s case studies); the environmental ethics (the anthropocentric against the ecocentric — the sustainable development\u2019s Brundtland register, the intergenerational justice — cross-referenced to the Environmental Studies book); the media and the technology ethics (the truth\u2019s media, the AI\u2019s alignment priced honestly — the CS shelf\u2019s cross-reference, the data\u2019s privacy); and the case-study craft\u2019s method taught as the frame (the facts-stakeholders-options-decide-justify ladder).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Bioethics Register',
      'The Business Ethics Register',
      'The Environmental Ethics Register',
      'The Media and Technology Register',
    ],
  },
  {
    number: 5,
    slug: 'attitude-and-values',
    title: 'Attitude and Values',
    summary:
      'The attitude\u2019s science and the values\u2019 craft: the attitude\u2019s content-structure-function (the ABC model — the affective, behavioural, cognitive; the psychology book\u2019s mechanism chapter cross-referenced); the attitude\u2019s influence on thought and behaviour (the consistency\u2019s theories — the cognitive dissonance\u2019s Festinger register); the moral and political attitudes (the formation\u2019s sources, the measurement\u2019s honest limits); the persuasion\u2019s craft (the source-message-channel-receiver model, the Cialdini\u2019s weapons priced, the propaganda\u2019s defence — the inoculation register); and the values\u2019 survey (the Rokeach terminal-instrumental census, the allport\u2019s values, the Schwartz\u2019s circular structure named — the value\u2019s conflict resolution priced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Attitude\u2019s ABC',
      'The Consistency Theories',
      'The Persuasion Craft',
      'The Values\u2019 Census',
    ],
  },
  {
    number: 6,
    slug: 'aptitude-and-ei',
    title: 'Aptitude and Emotional Intelligence',
    summary:
      'The civil service\u2019s own register: the aptitude\u2019s concept (the civil service aptitude as the trainable craft); the foundational values in full (the integrity as the wholeness — the private-public consistency; the impartiality and non-partisanship; the objectivity as the evidence\u2019s discipline; the dedication to the public service; the empathy — the felt understanding priced against the sympathy; the tolerance and the compassion toward the weaker sections — the GS4\u2019s own words carried); and the emotional intelligence\u2019s register (the Salovey-Mayer definition and the Goleman\u2019s popular arc — the five components; the EI\u2019s application in administration and governance — the self-aware officer, the team\u2019s emotional labour, the citizen\u2019s anger met with the craft; the measurement\u2019s honest limits).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Foundational Values in Full',
      'The Integrity and Objectivity Craft',
      'The Empathy-Tolerance-Compassion Register',
      'The Emotional Intelligence\u2019s Application',
    ],
  },
  {
    number: 7,
    slug: 'ethics-in-public-administration',
    title: 'Ethics in Public Administration',
    summary:
      'The public office\u2019s moral machinery: the public service\u2019s values and their status (the problems priced — the bureaucratic drift, the marketplace\u2019s imitation, the wrong-kind-of-integrity registers); the ethical concerns and dilemmas in government and the private institutions (the dilemma\u2019s typology — the personal against the professional, the loyalty\u2019s conflicts, the dirty hands question priced honestly); the sources of ethical guidance (the laws, rules and regulations against the conscience — the hierarchy\u2019s limits, the open door\u2019s craft); the accountability and the ethical governance (the external and internal — the Public Administration book\u2019s machinery cross-referenced); and the strengthening of the moral fibre (the training, the leadership\u2019s tone-at-the-top, the society\u2019s own culture).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Public Service\u2019s Values',
      'The Dilemma\u2019s Typology',
      'The Sources of Guidance',
      'The Strengthening Craft',
    ],
  },
  {
    number: 8,
    slug: 'probity-in-governance',
    title: 'Probity in Governance',
    summary:
      'The GS4\u2019s closing register carried in full: the concept of public service (the public office as the trust — the fiduciary frame); the philosophical basis of governance and probity (the dharma\u2019s Indian register priced — the Rajadharma; the Western social contract\u2019s echo); the information sharing and transparency (the RTI\u2019s architecture — the 2005 act\u2019s pillars, the proactive disclosure, the balancing of privacy); the codes of ethics and conduct (the civil service\u2019s conduct rules, the ministerial codes, the judicial values\u2019 Bangalore register named); the citizens\u2019 charters (the Sevottam\u2019s craft — the promise-and-redress frame with the honest failure register); the work culture and the quality of service delivery (the attitude\u2019s office face); the utilisation of public funds (the economy-efficiency-effectiveness triad, the CAG\u2019s moral role); and the challenges of corruption (the causes\u2019 honest census — the rent, the discretion, the low-salary myth retired; the Lokpal\u2019s arc, the CVC\u2019s register, the UNCAC frame).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Concept and Basis of Public Service',
      'The RTI and the Codes',
      'The Charters and the Service Quality',
      'The Corruption\u2019s Challenges',
    ],
  },
  {
    number: 9,
    slug: 'the-case-study-craft-and-doorstep',
    title: 'The Case-Study Craft and the Doorstep',
    summary:
      'The GS4\u2019s own art taught as a method: the case study\u2019s anatomy (the facts, the stakeholders, the values in tension, the options, the decision\u2019s justification — the ladder\u2019s craft); the case bank\u2019s method (the classic dilemmas — the ordered irregularity\u2019s register: the transfers, the RTI request from a corrupt contractor, the disaster\u2019s diversion, the whistleblower\u2019s choice, the communal tension\u2019s order, the vulnerable beneficiary\u2019s rule — each type\u2019s frame taught); the corporate governance\u2019s pointer (the hand-off to the Law book\u2019s commercial register); the ethics in international relations and funding (the aid\u2019s conditionalities priced — the IR handshake); and the doorstep — to the officer\u2019s own conscience, the case study as the mirror, the moral life as the assignment that never ends.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Case Study\u2019s Anatomy',
      'The Case Bank\u2019s Frames',
      'The International and Funding Registers',
      'The Doorstep: The Conscience\u2019s Mirror',
    ],
  },
]

export const ethics: Book = {
  id: 'ethics',
  title: 'Ethics',
  subtitle: 'The moral life and its craft — from the theories to probity in public affairs',
  discipline: 'humanities',
  level: 'Secondary school values education → UPSC GS-IV + university ethics readiness',
  description: 'The moral register as its own discipline and craft. The ethics-and-human-interface first (the essence, the determinants, the consequences of ethics in human actions; the dimensions — personal against public; the human values and their teachers); the meta-level\u2019s honest walk (the cultural relativism\u2019s challenge, the subjectivism\u2019s escape, the religion-morality question — the Rachels arc); the normative theories\u2019 census (the utilitarian\u2019s greatest happiness with its mills and its troubles, the Kant\u2019s categorical imperative as the dignity\u2019s engine, the virtue ethics\u2019s character turn; the moral thinkers from India and the world — the GS4 register in full); the applied census (bioethics, business and corporate ethics, environmental ethics, the media and technology ethics — the case-study craft begins); the attitude and values register (the attitude\u2019s content-structure-function, the moral and political attitudes, the persuasion\u2019s craft — the psychology cross-reference); the aptitude and the foundational values (the integrity, impartiality, non-partisanship, objectivity, the empathy-tolerance-compassion register; the emotional intelligence\u2019s science and its administration use); the public-service register (the ethics in public administration, the dilemmas, the sources of guidance — laws, rules, conscience); the probity\u2019s craft (the RTI, the codes, the charters, the public funds, the corruption\u2019s challenges); and the case-study method as the GS4\u2019s own art. Cross-references Philosophy (the normative theories\u2019 home depth) and hands off to the officer\u2019s own conscience.',
  status: 'planned',
  accent: ['#15803d', '#166534'],
  chapters,
}

import type { Book, Chapter } from '../../../types'

/**
 * Psychology — the first book of the Mind branch.
 *
 * STATUS: PLANNED (Humanities & Social Sciences full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 41 planned lessons, zero written. Lesson ids will use the `psy-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Psychology owns the individual-mind register. Sociology owns the social structure (the two cross-reference — the social psychology chapter here meets the socialisation chapter there; the attitude chapters exist in both, the psychological mechanism here, the sociological measurement there); Ethics owns the GS4 emotional-intelligence register’s APPLICATION (this book teaches the EI science, that book its civil-service use); the Biology shelf’s future neuroscience book will own the neural depth this book’s chapter 2 surveys; the UPSC Psychology optional register is the applied spine.
 *
 * RESEARCH PHASE (2026-11-16):
 * - NCERT Psychology class 12 (lepy1ps.pdf opened at ncert.nic.in this pass — the seven-chapter register: Variations in Psychological Attributes; Self and Personality; Meeting Life Challenges; Psychological Disorders; Therapeutic Approaches; Attitude and Social Cognition; Social Influence) with the class 11 book's register (What is Psychology?; methods; sensation; learning; memory; cognition; motivation) as the Indian school spine.
 * - The AP Psychology course-and-exam description (apcentral.collegeboard.org — the 186-page CED register read this pass: the biological bases, cognition, development, social, personality, the clinical arc) as the world-exam spine.
 * - The UPSC Psychology optional register (read this pass — vajiramandravi.com: Paper I Foundations — methods, biological bases, learning, memory, cognition, motivation, intelligence, personality; Paper II the issues-and-applications register).
 * - UGC NET Psychology (code 04 — the updated-syllabus list read this pass at ugcnetonline.in).
 * - Myers' Psychology and Baron's Psychology named as the standard university poles (the mheducation editions' register checked this pass).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-science-of-mind',
    title: 'The Science of Mind',
    summary:
      'The discipline\u2019s own story and craft: the schools\u2019 census (structuralism\u2019s introspection, functionalism\u2019s adaptation, behaviourism\u2019s stimulus-response, Gestalt\u2019s whole, psychoanalysis\u2019s depth, the humanistic third force, the cognitive revolution\u2019s arrival); the method\u2019s register (the experiment\u2019s logic, the correlation\u2019s caution, the case study, the survey — the statistics craft cross-referenced to the Mathematics shelf\u2019s statistics book); the ethics of research (the consent, the deception\u2019s limits, the IRB\u2019s arc); and the perspectives\u2019 pluralism as the field\u2019s honest state — the biopsychosocial lens.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Schools\u2019 Census',
      'The Method\u2019s Register',
      'The Ethics of Research',
      'The Biopsychosocial Lens',
    ],
  },
  {
    number: 2,
    slug: 'the-biological-bases',
    title: 'The Biological Bases',
    summary:
      'The mind\u2019s machinery: the neuron\u2019s anatomy and the action potential\u2019s engine; the neurotransmitters\u2019 census (the dopamine\u2019s reward, the serotonin\u2019s mood register); the nervous system\u2019s divisions (the central and peripheral, the autonomic\u2019s sympathetic-parasympathetic); the brain\u2019s tour (the lobes\u2019 functions, the limbic system\u2019s emotions, the plasticity\u2019s discovery); the imaging methods\u2019 census (the fMRI and the EEG\u2019s honest limits); the endocrine handshake (the stress axis — the cortisol\u2019s story); and the genetics of behaviour (the heritability\u2019s careful reading, the twin studies\u2019 logic).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Neuron and the Transmitters',
      'The Brain\u2019s Tour',
      'The Imaging and the Endocrine Handshake',
      'The Genetics of Behaviour',
    ],
  },
  {
    number: 3,
    slug: 'sensation-and-perception',
    title: 'Sensation and Perception',
    summary:
      'The world\u2019s arrival in the mind: the psychophysics\u2019 threshold (the absolute and the difference — the Weber law priced); the senses\u2019 census (the vision\u2019s journey from retina to cortex, the audition\u2019s cochlea, the chemical and the body senses); the perception\u2019s organisation (the Gestalt laws, the depth and constancy, the illusions\u2019 honest census); the attention\u2019s filter (the cocktail-party effect, the divided attention\u2019s limits); and the perception\u2019s constructive lesson — the world as built, not received (the ambiguous figures as the demonstration).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Thresholds',
      'The Senses\u2019 Census',
      'The Gestalt Organisation',
      'The Constructive Perception',
    ],
  },
  {
    number: 4,
    slug: 'learning',
    title: 'Learning',
    summary:
      'The experience\u2019s inscription: the classical conditioning (Pavlov\u2019s dogs — the extinction, the generalisation, the taste-aversion\u2019s Garcia correction); the operant conditioning (Skinner\u2019s contingencies — the reinforcement\u2019s schedules and their resistance to extinction, the punishment\u2019s problems, the shaping); the observational learning (Bandura\u2019s Bobo as the classic — the modelling\u2019s four processes); the cognitive learning\u2019s register (the latent, the insight, the maps); and the applications\u2019 census — the classroom, the behaviour therapy, the habit\u2019s engineering in the reader\u2019s own life.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Classical Engine',
      'The Operant Contingencies',
      'The Observational Register',
      'The Applications\u2019 Census',
    ],
  },
  {
    number: 5,
    slug: 'memory-and-cognition',
    title: 'Memory and Cognition',
    summary:
      'The mind\u2019s record and thought: the memory\u2019s stages (the sensory, the working memory\u2019s Baddeley model, the long-term\u2019s encoding-storage-retrieval); the forgetting\u2019s science (the decay-interference-retrieval-failure census, the Ebbinghaus curve, the false memory\u2019s Loftus warning priced); the thinking register (the concepts, the problem-solving\u2019s heuristics against the algorithms — the Kahneman-Tversky biases\u2019 honest census); the language\u2019s cognitive arc (the acquisition\u2019s stages, the bilingual brain\u2019s Indian register); and the metacognition\u2019s craft (the study strategies\u2019 evidence — the rereading against the retrieval practice).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Memory\u2019s Stages',
      'The Forgetting\u2019s Science',
      'The Heuristics and the Biases',
      'The Language and the Metacognition',
    ],
  },
  {
    number: 6,
    slug: 'motivation-and-emotion',
    title: 'Motivation and Emotion',
    summary:
      'The why and the feel: the motivation\u2019s theories\u2019 census (the drive and arousal, the Maslow\u2019s pyramid\u2019s honest critique, the intrinsic-extrinsic debate — the overjustification effect); the hunger and the sex\u2019s biopsychology priced at survey depth; the emotion\u2019s theories (the James-Lange against the Cannon-Bard, the Schachter-Singer two-factor, the appraisal\u2019s arc); the emotion\u2019s expression (the universality\u2019s Ekman register and its cultural critique); and the stress-coping arc (the Lazarus appraisal, the coping\u2019s problem-and-emotion focus — the NCERT\u2019s own \u2019meeting life challenges\u2019 chapter as the Indian pedagogy).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Motivation Census',
      'The Emotion Theories',
      'The Expression\u2019s Universality Debate',
      'The Stress-Coping Arc',
    ],
  },
  {
    number: 7,
    slug: 'the-self-and-personality',
    title: 'The Self and Personality',
    summary:
      'The person\u2019s register: the psychological attributes\u2019 variations (the assessment\u2019s concepts — the reliability and validity priced, the norms); the intelligence\u2019s honest history (the Spearman-g, the Thurstone\u2019s primaries, the Gardner\u2019s multiples priced against the evidence, the Sternberg\u2019s triarch, the EQ\u2019s emotional-intelligence register with the GS4 handshake); the self\u2019s psychology (the self-concept\u2019s formation, the esteem\u2019s arc, the Bandura\u2019s self-efficacy); the personality theories\u2019 census (the psychoanalytic — Freud\u2019s structures and defense, the neo-analysts — Jung and Adler; the trait — the Big Five\u2019s evidence; the humanistic — Rogers and Maslow; the social-cognitive — the Bandura-Mischel); and the assessment\u2019s methods (the objective against the projective).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Attributes and the Assessment',
      'The Intelligence\u2019s Honest History',
      'The Self\u2019s Psychology',
      'The Personality Theories\u2019 Census',
    ],
  },
  {
    number: 8,
    slug: 'development-and-the-social-register',
    title: 'Development and the Social Register',
    summary:
      'The life and the group: the development\u2019s arc (the Piaget\u2019s stages, the attachment\u2019s Bowlby-Ainsworth strange situation, the Erikson\u2019s eight crises, the ageing\u2019s register, the Vygotsky\u2019s cultural correction); the social cognition (the impression\u2019s formation, the attribution\u2019s errors — the fundamental one priced); the attitudes\u2019 register (the ABC model, the formation, the change\u2019s persuasion craft — the elaboration-likelihood\u2019s dual route with the Ethics book\u2019s GS4 attitude chapter cross-referenced); and the social influence (the Asch conformity, the Milgram\u2019s obedience and its ethics, the bystander\u2019s diffusion, the group\u2019s groupthink and polarisation — the Sociology handshake).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Development\u2019s Arc',
      'The Attribution\u2019s Errors',
      'The Attitudes and the Persuasion',
      'The Influence and the Groups',
      'Chapter XII. The Influence of Sparta'
    ],
  },
  {
    number: 9,
    slug: 'disorders-and-wellbeing',
    title: 'Disorders and Wellelling',
    summary:
      'The clinical register taught with care: the disorders\u2019 census (the anxiety\u2019s family, the OCD, the depression and the bipolar spectrum, the schizophrenia\u2019s honest picture, the dissociative and the somatic, the substance use); the explanation\u2019s models (the biopsychosocial — the demonological to the humane history); the suicide\u2019s warning signs as the civic lesson; the therapeutic approaches\u2019 census (the psychoanalytic, the behavioural and the cognitive-behavioural, the humanistic, the biomedical — the Indian mental-health act\u2019s register priced); and the health psychology\u2019s positive close (the wellbeing\u2019s PERMA register, the resilience\u2019s craft).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Disorders\u2019 Census',
      'The Explanation\u2019s Models',
      'The Therapeutic Approaches',
      'The Wellbeing and the Resilience',
    ],
  },
  {
    number: 10,
    slug: 'the-applications-and-doorstep',
    title: 'The Applications and the Doorstep',
    summary:
      'The applied register and the close: the psychology in education (the learning styles\u2019 myth debunked honestly, the gifted and the special needs, the inclusive classroom); the organisational register (the motivation\u2019s work application, the leadership, the personnel selection\u2019s fairness); the community and the environment\u2019s psychology (the crowding, the noise, the pro-environmental behaviour); the IT and media\u2019s psychology (the attention economy\u2019s own science, the screen\u2019s honest register); the disadvantaged groups\u2019 psychology (the stigma\u2019s internalisation, the empowerment\u2019s interventions); and the doorstep — to Ethics for the EI application, to Sociology for the social\u2019s structure, to the reader\u2019s own mind as the laboratory.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Educational Applications',
      'The Organisational and Community Registers',
      'The IT and the Media\u2019s Psychology',
      'The Doorstep: The Reader\u2019s Own Mind',
    ],
  },
]

export const psychology: Book = {
  id: 'psychology',
  title: 'Psychology',
  subtitle: 'Mind and behaviour — the science from neurons to the social self',
  discipline: 'humanities',
  level: 'Secondary school biology → university psychology + UPSC (Psychology optional)/CBSE/UGC-NET readiness',
  description: 'The science of mind and behaviour in one arc. The discipline\u2019s history and method (the schools\u2019 census, the experiment\u2019s craft, the ethics of research); the biological bases (the neuron, the nervous system\u2019s divisions, the brain\u2019s lobes and imaging, the endocrine handshake); sensation and perception (the senses\u2019 census, the perceptual organisation, attention); learning (the classical, operant and observational registers with their applications); memory and cognition (the stages, the forgetting\u2019s curve, the thinking-problem-solving-language register); motivation and emotion with the stress-coping arc; the self and personality (the attributes\u2019 variations, intelligence and its measurement\u2019s honest history, the personality theories); development across the lifespan and the social register (the social cognition, attitudes, the influence and persuasion, the groups); the disorders and wellbeing register (the psychological disorders\u2019 census, the therapeutic approaches, the health psychology) — priced with the NCERT\u2019s own Indian pedagogy; and the applications\u2019 register (education, work, community, the disadvantaged) with the GS4 emotional-intelligence handshake. Cross-references Sociology (the group\u2019s register) and hands off to the reader\u2019s own mind as the laboratory.',
  status: 'planned',
  accent: ['#a21caf', '#86198f'],
  chapters,
}

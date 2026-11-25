/**
 * verify-cs-exam-coverage.ts — the CS exam-topic coverage guarantee pass
 * (2026-11-15, owner directive: "make sure those exams topics are to be
 * covered in the books see if any topics is missing in cs books").
 *
 * The Mathematics shelf's exam coverage lives in two gates
 * (verify-exam-coverage.ts for the Practice-hub presets,
 * verify_topic_coverage.ts for the Drive TOC survey). This is the
 * Computer Science shelf's own gate, and it runs the SAME method:
 *
 *  I. REGISTRY COMPLETENESS — every registry examination that carries a
 *     RESEARCHED computer-science section (gate, ugc-net, ioi, cuet-ug,
 *     ib, a-levels, ap — the seven with official CS syllabi researched
 *     2026-11-15) records its units in `csUnits` and maps them to real
 *     shelf books in `coverageMap` (mathematics + computer-science ids
 *     that exist on the shelf). No other registry exam claims a CS
 *     section (exactly 7 carry csUnits).
 *
 *  II. TOPIC INCLUSION — the topic ledger (docs/research/
 *     CS_EXAM_TOPIC_LEDGER.md is the durable record; the table below is
 *     the machine-checked canonical form, transcribed/condensed from the
 *     OFFICIAL syllabi downloaded 2026-11-15 — GATE CSE 2026, UGC NET
 *     CS&A code 87, IOI 2024, CUET UG 308 CS/IP, IB DP CS, Cambridge
 *     9618, AP CS A) must be verifiably present in the plan blob of the
 *     shelf book the routing table assigns it to: description + chapter
 *     titles/summaries + plannedLessons, matched token-level on
 *     normalized text with a curated ALIAS table of genuine synonyms,
 *     >= 60% of significant tokens (the verify_topic_coverage.ts
 *     standard). A topic covered only by a DIFFERENT book is a CROSS
 *     (must be zero after this pass — reviewed by hand); a topic in NO
 *     book is a HARD GAP (must be zero).
 *
 *  III. CENSUS INTEGRITY — the shelf census pins match verify-cs-shelf-
 *     planning.ts (364 chapters / 1,222 planned lessons — the 2026-11-17 swarm reorg census
 *     pass from 363/1,146); the ledger's own census pins (251 topics
 *     across the seven exams: 52/94/31/19/22/28/5); every routed book id
 *     exists on the shelf; the durable ledger doc exists and cites every
 *     official source.
 *
 * Run: bun run scripts/verify-cs-exam-coverage.ts   (dev server NOT required)
 */
import { allBooks } from '../src/data/library'
import { readFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

let pass = 0
let fail = 0
const ok = (cond: boolean, label: string) => {
  if (cond) { pass++ } else { fail++; console.error(`  FAIL: ${label}`) }
}

/* ------------------------------------------------------------------ */
/* The blob machinery (same as verify_topic_coverage.ts, plus the      */
/* CS-exam ALIAS table curated during the 2026-11-15 pass).             */
/* ------------------------------------------------------------------ */

const DIR_FIX: Record<string, string> = {
  'arithmetic-and-number-systems': 'arithmetic-number-systems',
}
const SHELF = allBooks.map((b) => b.id)
const bookBlob: Record<string, Set<string>> = {}
for (const b of allBooks) {
  const dir = join('src/data/library/books', b.discipline, DIR_FIX[b.id] ?? b.id)
  let raw = ''
  if (statSync(dir).isDirectory()) {
    for (const f of readdirSync(dir)) {
      if (!f.endsWith('.ts')) continue
      raw += readFileSync(join(dir, f), 'utf8')
    }
  }
  const fieldRe = /(?:title|subtitle|summary|description|term|name):\s*'((?:\\.|[^'\\])*)'/g
  const planRe = /plannedLessons:\s*\[([\s\S]*?)\]/g
  const parts: string[] = []
  let m: RegExpExecArray | null
  const decode = (s: string) => s.replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16))).replace(/\\'/g, "'").replace(/\\\\/g, '\\')
  while ((m = fieldRe.exec(raw))) parts.push(decode(m[1]))
  while ((m = planRe.exec(raw))) parts.push(decode(m[1]))
  bookBlob[b.id] = tokenizeBlob(parts.join(' '))
}

function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/\uFB01/g, 'fi')
    .replace(/\uFB02/g, 'fl')
    .replace(/\uFB03/g, 'ffi')
    .replace(/\uFB04/g, 'ffl')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

const STOP = new Set(['a', 'an', 'and', 'are', 'as', 'at', 'based', 'basic', 'be', 'by', 'chapter', 'chapters', 'concept', 'concepts', 'discussion', 'edition', 'exercise', 'exercises', 'explanation', 'find', 'finding', 'first', 'for', 'form', 'forms', 'from', 'general', 'given', 'harder', 'in', 'introduction', 'is', 'its', 'key', 'miscellaneous', 'new', 'notes', 'of', 'on', 'or', 'overview', 'page', 'pages', 'part', 'points', 'problem', 'problems', 'review', 'second', 'solving', 'some', 'that', 'the', 'their', 'these', 'this', 'those', 'to', 'type', 'types', 'use', 'used', 'using', 'value', 'various', 'with'])

const ALIAS: Record<string, string[]> = {
  '3d': ['three', 'dimensional'],
  '2d': ['two', 'dimensional'],
  'dbms': ['database', 'databases'],
  'database': ['dbms', 'databases'],
  'databases': ['database', 'dbms'],
  'sql': ['query', 'queries', 'mysql'],
  'os': ['operating', 'systems'],
  'operating': ['os'],
  'cpus': ['cpu', 'processor'],
  'cpu': ['processor', 'cpus'],
  'gpus': ['gpu'],
  'io': ['input', 'output'],
  'algorithm': ['algorithms'],
  'algorithms': ['algorithm'],
  'algo': ['algorithm'],
  'graph': ['graphs'],
  'graphs': ['graph'],
  'tree': ['trees'],
  'trees': ['tree'],
  'automata': ['automaton'],
  'automaton': ['automata'],
  'machines': ['machine'],
  'compiler': ['compilers'],
  'compilers': ['compiler'],
  'translation': ['translators', 'translator', 'translates'],
  'network': ['networks', 'networking'],
  'networks': ['network', 'networking'],
  'internet': ['internet'],
  'web': ['www'],
  'www': ['web'],
  'programming': ['program', 'programs', 'programme'],
  'program': ['programming'],
  'language': ['languages'],
  'languages': ['language'],
  'data': [],
  'structures': ['structure'],
  'structure': ['structures'],
  'arrays': ['array'],
  'array': ['arrays', 'vector'],
  'queues': ['queue'],
  'queue': ['queues'],
  'stacks': ['stack'],
  'stack': ['stacks'],
  'links': ['linked'],
  'linked': ['links'],
  'lists': ['list'],
  'list': ['lists'],
  'heaps': ['heap'],
  'heap': ['heaps', 'priority'],
  'hashing': ['hash', 'hashes'],
  'hash': ['hashing', 'hashes'],
  'searching': ['search', 'searches'],
  'search': ['searching'],
  'sorting': ['sort', 'sorts', 'sorted'],
  'sort': ['sorting', 'sorted'],
  'recursions': ['recursion'],
  'recursive': ['recursion'],
  'traversals': ['traversal'],
  'traversal': ['traversals'],
  'synchronization': ['synchronisation', 'synchronizing', 'sync'],
  'scheduling': ['schedule', 'scheduler'],
  'virtual': ['virtualization'],
  'memory': ['memories', 'storage'],
  'storage': ['memory', 'storages'],
  'cache': ['caching'],
  'caches': ['cache'],
  'file': ['files'],
  'files': ['file'],
  'filesystems': ['file'],
  'processes': ['process'],
  'process': ['processes', 'processing'],
  'threads': ['thread'],
  'thread': ['threads', 'multithreading'],
  'deadlocks': ['deadlock'],
  'deadlock': ['deadlocks'],
  'transactions': ['transaction'],
  'transaction': ['transactions'],
  'relational': ['relations', 'relation'],
  'algebra': ['algebraic'],
  'boolean': ['bool'],
  'logic': ['logical'],
  'logical': ['logic'],
  'gates': ['gate'],
  'gate': ['gates'],
  'circuits': ['circuit'],
  'circuit': ['circuits', 'switching'],
  'sequential': ['sequence'],
  'flipflops': ['flip', 'flops'],
  'multiplexers': ['mux'],
  'mux': ['multiplexers'],
  'decoders': ['decoder'],
  'registers': ['register'],
  'counters': ['counter'],
  'instruction': ['scheduling'],
  'instructions': ['instruction'],
  'addressing': ['addresses', 'address'],
  'modes': ['mode'],
  'pipeline': ['pipelining', 'pipelines'],
  'pipelining': ['pipeline'],
  'arithmetic': ['arithmetics', 'alu'],
  'alu': ['arithmetic'],
  'floating': ['float'],
  'point': ['fixed'],
  'representation': ['representations', 'representing', 'represent'],
  'representations': ['representation'],
  'numbers': ['number'],
  'number': ['numbers'],
  'binary': ['bit', 'bits'],
  'bits': ['binary', 'bit'],
  'hexadecimal': ['hex'],
  'compression': ['compress', 'compressed', 'compressing'],
  'multimedia': ['media'],
  'graphics': ['graphic'],
  'sound': ['audio'],
  'audio': ['sound'],
  'images': ['image'],
  'image': ['images'],
  'encryption': ['encrypt', 'encrypted', 'cryptography', 'cipher'],
  'cryptography': ['encryption', 'cryptographic', 'cipher'],
  'digital': ['digit'],
  'signatures': ['signature', 'signing'],
  'certificates': ['certificate'],
  'protocols': ['protocol'],
  'protocol': ['protocols'],
  'security': ['secure', 'securing', 'safety'],
  'cybersecurity': ['security', 'cyber'],
  'threats': ['threat'],
  'privacy': ['private'],
  'integrity': ['constraints'],
  'ethics': ['ethical'],
  'ownership': ['own'],
  'copyright': ['licensing', 'license'],
  'artificial': ['ai'],
  'intelligence': ['ai'],
  'ai': ['artificial', 'intelligence'],
  'machine': ['assembly', 'assembler'],
  'learning': ['learn'],
  'ml': ['machine', 'learning'],
  'neural': ['networks', 'network'],
  'ann': ['neural', 'networks'],
  'networks2': [],
  'fuzzy': ['fuzziness'],
  'genetic': ['ga'],
  'agents': ['agent'],
  'agent': ['agents'],
  'planning': ['plan', 'plans'],
  'knowledge': ['knows', 'knowing'],
  'expert': ['experts'],
  'systems': ['system'],
  'system': ['systems'],
  'heuristic': ['heuristics'],
  'minmax': ['minimax', 'min', 'max'],
  'alpha': ['beta'],
  'parsing': ['parse', 'parser'],
  'parse': ['parsing', 'parser'],
  'parsers': ['parse', 'parsing'],
  'lexical': ['lexer', 'tokens'],
  'syntax': ['syntactic'],
  'semantic': ['semantics'],
  'semantics': ['semantic'],
  'grammar': ['grammars'],
  'grammars': ['grammar'],
  'regular': ['regex'],
  'regex': ['regular', 'expressions'],
  'expressions': ['expression'],
  'context': ['cfg'],
  'free': ['cfg'],
  'pushdown': ['pda'],
  'pda': ['pushdown'],
  'turing': ['tm'],
  'tm': ['turing'],
  'undecidability': ['undecidable'],
  'computability': ['computable'],
  'chomsky': ['hierarchy'],
  'hierarchy': ['chomsky'],
  'optimization': ['optimisation', 'optimise', 'optimizing'],
  'code': ['codes'],
  'codes': ['code'],
  'generation': ['generating', 'generate'],
  'intermediate': ['ir'],
  'runtime': ['run', 'time'],
  'activation': ['records'],
  'symbol': ['symbols'],
  'table': ['tables'],
  'tables': ['table'],
  'liveness': ['live'],
  'analysis': ['analyses', 'analyzing'],
  'analyses': ['analysis'],
  'mathematics': ['math', 'maths'],
  'discrete': ['discreteness'],
  'linear': ['linearity'],
  'matrices': ['matrix'],
  'matrix': ['matrices'],
  'eigenvalues': ['eigenvalue'],
  'eigenvectors': ['eigenvalue'],
  'determinants': ['determinant'],
  'probability': ['probabilities', 'probabilistic'],
  'statistics': ['statistical', 'stats'],
  'distribution': ['distributions', 'distributed'],
  'distributions': ['distribution'],
  'distributions2': [],
  'random': ['randomized', 'randomisation'],
  'bayes': ['bayesian'],
  'conditional': ['conditions'],
  'poisson': ['binomial'],
  'binomial': ['poisson'],
  'deviation': ['deviations'],
  'deviations': ['deviation'],
  'mean': ['median', 'mode', 'average'],
  'median': ['mean', 'mode'],
  'mode': ['mean', 'median'],
  'functions': ['function'],
  'function': ['functions'],
  'sets': ['set'],
  'set': ['sets'],
  'relations': ['relation'],
  'relation': ['relations'],
  'partial': ['posets'],
  'orders': ['order'],
  'lattices': ['lattice'],
  'lattice': ['lattices'],
  'monoids': ['monoid'],
  'groups': ['group'],
  'group': ['groups'],
  'counting': ['count', 'counts', 'combinatorics'],
  'combinatorics': ['counting'],
  'recurrence': ['recurrences'],
  'recurrences': ['recurrence'],
  'generating': ['generation'],
  'pigeonhole': ['pigeon'],
  'permutations': ['permutation'],
  'combinations': ['combination'],
  'inclusion': ['exclusion'],
  'induction': ['inductive'],
  'graphs2': [],
  'colouring': ['coloring'],
  'coloring': ['colouring'],
  'connectivity': ['connected', 'connect'],
  'matching': ['matchings', 'match'],
  'eulerian': ['euler', 'eulers'],
  'hamiltonian': ['hamilton', 'cycles'],
  'spanning': ['mst'],
  'mst': ['spanning'],
  'shortest': ['shortest', 'least'],
  'bipartite': ['bipartiteness'],
  'planar': ['planarity'],
  'prefix': ['codes'],
  'optimisation': ['optimization'],
  'programming2': [],
  'software': ['softwares'],
  'engineering': ['engineer'],
  'agile': ['scrum', 'xp'],
  'scrum': ['agile'],
  'requirements': ['requirement', 'srs'],
  'requirement': ['requirements'],
  'design': ['designs', 'designed'],
  'patterns': ['pattern'],
  'pattern': ['patterns'],
  'modularity': ['modular'],
  'cohesion': ['coupling'],
  'coupling': ['cohesion'],
  'testing': ['test', 'tests'],
  'test': ['testing', 'tests'],
  'validation': ['verification'],
  'verification': ['validation'],
  'estimation': ['estimating', 'estimate'],
  'cocomo': ['cost', 'model'],
  'maintenance': ['maintain'],
  'management': ['managing', 'manager'],
  'models': ['model'],
  'model': ['models'],
  'quality': ['qualities'],
  'risk': ['risks'],
  'version': ['versions'],
  'control': ['controlling'],
  'lifecycle': ['cycle', 'life'],
  'development': ['developing', 'develop'],
  'c': ['c++'],
  'java': ['javascript'],
  'javascript': ['java'],
  'python': ['pythonic'],
  'c++': ['cpp'],
  'classes': ['class'],
  'class': ['classes'],
  'objects': ['object'],
  'object': ['objects'],
  'oriented': ['oop'],
  'oop': ['oriented', 'objects'],
  'inheritance': ['inherited', 'inherits'],
  'polymorphism': ['polymorphic'],
  'encapsulation': ['encapsulate', 'encapsulating'],
  'constructors': ['constructor'],
  'destructors': ['destructor'],
  'overloading': ['overload', 'overloaded'],
  'templates': ['template'],
  'exceptions': ['exception'],
  'exception': ['exceptions'],
  'streams': ['stream'],
  'pointers': ['pointer'],
  'pointer': ['pointers'],
  'tokens': ['token', 'lexical'],
  'identifiers': ['identifier'],
  'preprocessors': ['preprocessor', 'macros'],
  'command': ['line'],
  'union': ['find', 'disjoint'],
  'html': ['markup', 'xml'],
  'xml': ['html', 'markup'],
  'dhtml': ['html'],
  'scripting': ['script', 'scripts'],
  'servlets': ['servlet', 'backend'],
  'applets': ['applet'],
  'event': ['events', 'event'],
  'raster': ['scan'],
  'scan': ['raster'],
  'rendering': ['render', 'renders', 'renderer'],
  'render': ['rendering'],
  'illumination': ['lighting', 'shading'],
  'clipping': ['clip', 'clips'],
  'viewing': ['viewport', 'view'],
  'viewport': ['viewing', 'view'],
  'bezier': ['bspline', 'spline', 'splines'],
  'spline': ['bezier', 'splines'],
  'splines': ['bezier', 'spline'],
  'quadric': ['surfaces'],
  'surfaces': ['surface'],
  'projection': ['projections'],
  'projections': ['projection'],
  'translation2': [],
  'rotation': ['rotate', 'rotations'],
  'scaling': ['scale', 'transform', 'transforms'],
  'transform': ['transforms', 'transformations'],
  'transforms': ['transform', 'transformations'],
  'homogeneous': ['coordinates'],
  'coordinates': ['homogeneous', 'coordinate'],
  'shear': ['shining'],
  'pandas': ['dataframe', 'series'],
  'dataframe': ['pandas', 'dataframes'],
  'numpy': ['arrays'],
  'matplotlib': ['plots', 'plotting', 'charts'],
  'plotting': ['matplotlib', 'plots'],
  'visualization': ['visualisation'],
  'ethics2': [],
  'footprint': ['digital'],
  'phishing': ['phish'],
  'ewaste': ['waste'],
  'gsm': ['mobile', 'cellular'],
  'cdma': ['gsm', 'mobile'],
  'mobile': ['gsm', 'mobiles'],
  'wireless': ['wifi', 'wlan'],
  'wifi': ['wireless'],
  'wlan': ['wireless'],
  'bluetooth': ['wireless'],
  'satellites': ['satellite'],
  'geolocation': ['location'],
  'sms': ['message', 'messaging'],
  'saas': ['paas', 'iaas', 'cloud'],
  'paas': ['saas', 'iaas', 'cloud'],
  'iaas': ['saas', 'paas', 'cloud'],
  'cloud': ['clouds', 'saas', 'paas', 'iaas'],
  'virtualization': ['virtual', 'vm'],
  'vm': ['virtual', 'virtualization'],
  'slas': ['sla', 'agreement'],
  'sla': ['slas', 'service', 'level'],
  'iot': ['internet', 'things'],
  'sensors': ['sensor', 'actuators'],
  'semaphores': ['semaphore'],
  'petersons': ['peterson'],
  'critical': ['section'],
  'ipc': ['interprocess', 'communication'],
  'interprocess': ['ipc'],
  'fragmentation': ['fragment', 'fragments'],
  'cidr': ['addressing', 'classless'],
  'nat': ['translation', 'network'],
  'arp': ['resolution', 'address'],
  'dhcp': ['icmp', 'arp'],
  'icmp': ['dhcp', 'arp'],
  'udp': ['tcp', 'transport'],
  'tcp': ['udp', 'transport'],
  'sockets': ['socket'],
  'dns': ['smtp', 'http'],
  'smtp': ['dns', 'email', 'mail'],
  'ftp': ['file', 'transfer'],
  'http': ['https', 'web'],
  'https': ['http'],
  'ethernet': ['bridging', 'lan'],
  'bridging': ['ethernet', 'bridge'],
  'mac': ['access', 'medium'],
  'csma': ['carrier', 'sense'],
  'switching': ['switch', 'switches'],
  'packet': ['packets', 'switching'],
  'osi': ['tcpip', 'layers', 'layered'],
  'tcpip': ['osi', 'ip', 'suite'],
  'layering': ['layers', 'stacks', 'osi'],
  'frames': ['framing', 'frame'],
  'framing': ['frames'],
  'error': ['errors'],
  'errors': ['error'],
  'detection': ['detecting', 'detect'],
  'correction': ['correcting', 'correct'],
  'flow': ['control'],
  'congestion': ['congested'],
  'hd': ['hdlc'],
  'hldc': ['hd'],
  'token': ['passing', 'ring'],
  'fdma': ['tdma', 'cdma'],
  'tdma': ['fdma', 'cdma'],
  'ipv4': ['ip', 'addressing'],
  'ipv6': ['ipv4', 'ip'],
  'routers': ['router'],
  'router': ['routers', 'routing'],
  'routing': ['route', 'routes', 'routers'],
  'lan': ['local', 'area'],
  'wan': ['wide', 'area'],
  'man': ['metropolitan'],
  'vectors': ['vector'],
  'vector': ['array', 'processors'],
  'dot': ['products'],
  'products': ['product', 'dot'],
  'cross': ['products'],
  'convex': ['hull'],
  'hull': ['convex'],
  'sweeping': ['sweep'],
  'euclids': ['euclidean'],
  'euclidean': ['euclid'],
  'sieve': ['eratosthenes'],
  'eratosthenes': ['sieve'],
  'primality': ['prime', 'primes'],
  'primes': ['prime'],
  'prime': ['primes', 'primality'],
  'exponentiation': ['exponent', 'exponential'],
  'backtracking': ['backtrack'],
  'backtrack': ['backtracking'],
  'branch': ['bound', 'and'],
  'bound': ['branch'],
  'greedy': ['greeds'],
  'dynamic': ['dp'],
  'dp': ['dynamic'],
  'divide': ['conquer'],
  'conquer': ['divide'],
  'amortized': ['amortisation', 'amortisation', 'aggregate'],
  'trie': ['tries'],
  'tries': ['trie'],
  'find': ['union', 'disjoint'],
  'disjoint': ['union', 'find'],
  'fenwick': ['binary', 'indexed', 'bit'],
  'segment': ['trees', 'intervals'],
  'lca': ['lowest', 'common', 'ancestor'],
  'ancestor': ['lca'],
  'scc': ['strongly', 'connected'],
  'biconnectivity': ['bridges', 'articulation'],
  'articulation': ['bridges', 'points'],
  'brute': ['force', 'exhaustive'],
  'np': ['completeness', 'hard'],
  'completeness': ['np'],
  'reducibility': ['reductions', 'reduce'],
  'reductions': ['reducibility', 'reduction'],
  'tractable': ['intractable'],
  'intractable': ['tractable'],
  'halting': ['problem', 'unsolvable'],
  'pcp': ['post', 'correspondence'],
  'diagonal': ['argument'],
  'simplex': ['linear', 'programming'],
  'pert': ['cpm', 'critical', 'path'],
  'cpm': ['pert'],
  'transportation': ['assignment'],
  'assignment': ['transportation'],
  'integer': ['integral', 'programming'],
  'no': ['nosql'],
  'nosql': ['no', 'sql', 'not'],
  'map': ['reduce', 'mapreduce'],
  'mapreduce': ['map', 'reduce'],
  'hadoop': ['hdfs', 'distributed'],
  'hdfs': ['hadoop', 'distributed', 'file'],
  'olap': ['oltp', 'warehousing'],
  'oltp': ['olap'],
  'warehousing': ['warehouse'],
  'warehouse': ['warehousing', 'olap'],
  'clustering': ['cluster', 'kmeans'],
  'association': ['rules', 'mining'],
  'regression': ['regress', 'linear'],
  'svm': ['support', 'vector', 'machines'],
  'knn': ['nearest', 'neighbour'],
  'nearest': ['knn', 'neighbour'],
  'hmm': ['hidden', 'markov'],
  'markov': ['hmm', 'hidden'],
  'gis': ['geographic'],
  'genome': ['genetic'],
  'xml2': [],
  'deductive': ['databases'],
  'temporal': ['time', 'databases'],
  'er': ['entity', 'relationship'],
  'entity': ['er', 'relationship'],
  'relationship': ['er', 'entity'],
  'normalization': ['normalisation', 'normal', 'forms'],
  'normalisation': ['normalization', 'normal', 'forms'],
  'normal': ['normalization', 'forms'],
  'functional': ['dependencies', 'fd'],
  'dependencies': ['functional', 'dependency'],
  'constraints': ['integrity', 'constraint'],
  'views': ['view'],
  'view': ['views'],
  'triggers': ['trigger'],
  'trigger': ['triggers'],
  'stored': ['program'],
  'procedures': ['procedure', 'stored'],
  'injection': ['injections', 'sql'],
  'tuples': ['tuple'],
  'tuple': ['tuples'],
  'calculus': ['relational', 'algebra'],
  'codd': ['rules', 'twelve'],
  'three': ['schema', 'architecture'],
  'schemas': ['schema'],
  'schema': ['schemas'],
  'independence': ['independent'],
  'client': ['server'],
  'server': ['client'],
  'centralized': ['centralised', 'centralisation'],
  'distributed2': [],
  'peterson': ['petersons', 'solution'],
  'lru': ['replacement', 'page'],
  'fifo': ['lifo'],
  'lifo': ['fifo'],
  'dma': ['direct', 'memory', 'access'],
  'interrupt': ['interrupts', 'interrupting'],
  'interrupts': ['interrupt'],
  'bus': ['buses'],
  'buses': ['bus'],
  'microoperations': ['micro', 'operations'],
  'rtl': ['register', 'transfer', 'language'],
  'microprogrammed': ['microprogramming', 'microprogram'],
  'microprogram': ['microprogrammed', 'control'],
  'risc': ['cisc'],
  'cisc': ['risc'],
  'multiprocessors': ['multiprocessor', 'parallel', 'multicore'],
  'multiprocessor': ['multiprocessors', 'multicore'],
  'multicore': ['multiprocessors', 'core'],
  'cache2': [],
  'coherence': ['coherent'],
  'associative': ['memory'],
  'asynchronous': ['sync', 'transfer'],
  'peripheral': ['peripherals', 'devices'],
  'peripherals': ['peripheral', 'devices'],
  'serial': ['communication'],
  'auxiliary': ['secondary', 'external'],
  'peterson2': [],
  'timing': ['control'],
  'codes2': [],
  'fixed': ['point'],
  'point2': [],
  'complements': ['complement'],
  'complement': ['complements'],
  'error2': [],
  'detection2': [],
  'hamming': ['parity'],
  'parity': ['hamming'],
  'simplified': ['simplification'],
  'simplification': ['simplified', 'karnaugh'],
  'karnaugh': ['maps', 'minimization', 'simplification'],
  'minimization': ['karnaugh', 'minimisation'],
  'minimisation': ['minimization', 'karnaugh'],
  'magnitude': ['sign'],
  'assembly': ['assembler', 'machine', 'language'],
  'assembler': ['assembly', 'assemblers'],
  'subroutines': ['subroutine'],
  'subroutine': ['subroutines', 'calls'],
  'macros': ['macro'],
  'relocation': ['relocating'],
  'linking': ['linker', 'links'],
  'loader': ['loading', 'linking'],
  'debuggers': ['debugger', 'debugging'],
  'debugging': ['debuggers', 'debug'],
  'boot': ['boots', 'booting'],
  'swapping': ['swap', 'swaps'],
  'paging': ['pages', 'page'],
  'pages': ['page', 'paging'],
  'segmentation': ['segments'],
  'thrashing': ['working', 'set'],
  'mapped': ['mapping'],
  'raid': ['disks', 'redundant'],
  'disks': ['disk', 'raid'],
  'disk': ['disks', 'raid'],
  'mass': ['storage'],
  'directories': ['directory'],
  'directory': ['directories'],
  'mounting': ['mount'],
  'mount': ['mounting'],
  'linux': ['unix', 'kernel'],
  'unix': ['linux'],
  'kernel': ['linux', 'modules'],
  'windows': ['microsoft'],
  'robustness': ['robust'],
  'grid': ['computing'],
  'byzantine': ['fault', 'tolerance'],
  'hadoop2': [],
  'no2': [],
  'query': ['queries', 'sql'],
  'queries': ['querying'],
  'postgres': ['sql', 'relational'],
  'mysql': ['sql', 'query'],
  'modeling': ['modelling'],
  'modelling': ['modeling', 'model', 'models'],
  'simulation': ['modelling', 'simulations'],
  'mont': ['carlo'],
  'carlo': ['mont'],
  'discrete2': [],
  'event2': [],
  'vhdl': ['verilog', 'hdl'],
  'verilog': ['vhdl'],
  'fsm': ['finite', 'state', 'machines'],
  'finite': ['fsm', 'automata', 'machines'],
  'state': ['fsm', 'machines', 'transition'],
  'machines2': [],
  'transitions': ['transition'],
  'transition': ['transitions'],
  'nfa': ['dfa', 'nondeterministic'],
  'dfa': ['nfa', 'deterministic'],
  'nondeterministic': ['nfa'],
  'deterministic': ['dfa'],
  'equivalence': ['equivalent'],
  'closure': ['properties'],
  'kleene': ['star', 'closure'],
  'star': ['kleene'],
  'cnf': ['chomsky', 'normal'],
  'gnf': ['greibach', 'normal'],
  'chomsky2': [],
  'ambiguity': ['ambiguous', 'ambiguous'],
  'derivation': ['derivations', 'parse'],
  'derivations': ['derivation'],
  'synthesized': ['synthesised', 'attributes'],
  'inherited': ['attributes', 'synthesize'],
  'attributes': ['attribute'],
  'attribute': ['attributes'],
  'sdd': ['syntax', 'directed', 'definitions'],
  'lld': ['ll', 'parser', 'predictive'],
  'lald': ['lalr', 'lr', 'parser'],
  'lr': ['lalr', 'lald'],
  'lalr': ['lald', 'lr'],
  'descent': ['top', 'down'],
  'peephole': ['hole', 'optimization'],
  'loop': ['loops', 'unrolling'],
  'unrolling': ['loop'],
  'constant': ['propagation'],
  'propagation': ['constant'],
  'liveness2': [],
  'subexpression': ['common', 'expressions', 'cse'],
  'cse': ['common', 'subexpression', 'elimination'],
  'elimination': ['cse', 'dead'],
  'flow2': [],
  'controlflow': ['control', 'flow'],
  'dataflow': ['data', 'flow'],
  'activation2': [],
  'records2': [],
  'parameter': ['parameters', 'passing'],
  'passing': ['parameter'],
  'declarations': ['declaration'],
  'declaration': ['declarations'],
  'boolean2': [],
  'prefix2': [],
  'infix': ['postfix', 'notations'],
  'postfix': ['infix', 'prefix'],
  'notations': ['infix', 'postfix'],
  'push': ['pop'],
  'pop': ['push'],
  'deque': ['dequeue', 'queue'],
  'dequeue': ['deque', 'queue'],
  'priority': ['priorities', 'queues'],
  'sparse': ['matrices'],
  'av': ['avl'],
  'avl': ['rotation', 'balance'],
  'rotation2': [],
  'threaded': ['threads', 'trees'],
  'forests': ['forest'],
  'forest': ['forests', 'trees'],
  'btree': ['b', 'trees'],
  'b': ['btree', 'trees'],
  'sets2': [],
  'adjacency': ['matrix', 'lists'],
  'connected': ['components', 'connectivity'],
  'components': ['component', 'connected'],
  'walk': ['path', 'trail'],
  'tour': ['cycle', 'path'],
  'pascal': ['programming'],
  'euclid': ['euclidean'],
  'minimax': ['min', 'max', 'minmax'],
  'asymptotic': ['big', 'oh', 'theta'],
  'symmetric': ['secret', 'secretkey'],
  'secret': ['symmetric'],
  'secretkey': ['symmetric', 'secret'],
  'publickey': ['public', 'asymmetric'],
  'asymmetric': ['public', 'publickey'],
  'latency': ['delay', 'delays'],
  'delay': ['latency'],
  'secondary': ['auxiliary'],
  'arraylist': ['collections'],
  'multilayer': ['multi', 'layer'],
  'layer': ['multilayer'],
  'steganography': ['watermarking'],
  'watermarking': ['steganography'],
  'monoid': ['monoids'],
  'semigroups': ['semigroup'],
  'semigroup': ['semigroups'],
  'ethical': ['ethics'],
  'insert': ['insertion', 'inserting'],
  'insertion': ['insert'],
  'delete': ['deletion', 'deleting'],
  'deletion': ['delete'],
  'querying': ['queries', 'query'],
  'inside': ['interior'],
  'interior': ['inside'],
  'pythagoras': ['pythagorean'],
  'pythagorean': ['pythagoras'],
  'responsibly': ['responsible', 'responsibility'],
  'responsible': ['responsibly'],
  'semester': [],
  'semester2': [],
  'grade': [],
  'grades': [],
}

/* ------------------------------------------------------------------ */
/* The topic ledger (exam, section, [topic, routed book]) — the        */
/* canonical table; docs/research/CS_EXAM_TOPIC_LEDGER.md mirrors it   */
/* with the sources and the human-readable verdicts.                    */
/* ------------------------------------------------------------------ */

const LEDGER: [string, string, [string, string][]][] = [
  ['gate-cse', 'S1 Engineering Mathematics', [
    ['Propositional and first order logic', 'discrete-mathematics'],
    ['Sets, relations, functions, partial orders and lattices', 'discrete-mathematics'],
    ['Monoids, Groups', 'abstract-algebra'],
    ['Graphs: connectivity, matching, colouring', 'discrete-mathematics'],
    ['Combinatorics: counting, recurrence relations, generating functions', 'discrete-mathematics'],
    ['Linear Algebra: matrices, determinants, system of linear equations, eigenvalues and eigenvectors, LU decomposition', 'linear-algebra'],
    ['Calculus: limits, continuity and differentiability, maxima and minima, mean value theorem, integration', 'differential-calculus'],
    ['Probability and Statistics: random variables, uniform, normal, exponential, Poisson and binomial distributions, mean, median, mode and standard deviation, conditional probability and Bayes theorem', 'probability-theory'],
  ]],
  ['gate-cse', 'S2 Digital Logic', [
    ['Boolean algebra', 'digital-logic-design'],
    ['Combinational and sequential circuits', 'digital-logic-design'],
    ['Minimization', 'digital-logic-design'],
    ['Number representations and computer arithmetic (fixed and floating point)', 'digital-logic-design'],
  ]],
  ['gate-cse', 'S3 Computer Organization and Architecture', [
    ['Machine instructions and addressing modes', 'computer-organization-architecture'],
    ['ALU, data-path and control unit', 'computer-organization-architecture'],
    ['Instruction pipelining, pipeline hazards', 'computer-organization-architecture'],
    ['Memory hierarchy: cache, main memory and secondary storage', 'computer-organization-architecture'],
    ['I/O interface (interrupt and DMA mode)', 'computer-organization-architecture'],
  ]],
  ['gate-cse', 'S4 Programming and Data Structures', [
    ['Programming in C', 'c-programming'],
    ['Recursion', 'c-programming'],
    ['Arrays, stacks, queues, linked lists, trees, binary search trees, binary heaps, graphs', 'data-structures'],
  ]],
  ['gate-cse', 'S5 Algorithms', [
    ['Searching, sorting, hashing', 'algorithms'],
    ['Asymptotic worst case time and space complexity', 'algorithms'],
    ['Algorithm design techniques: greedy, dynamic programming and divide-and-conquer', 'algorithms'],
    ['Graph traversals, minimum spanning trees, shortest paths', 'algorithms'],
  ]],
  ['gate-cse', 'S6 Theory of Computation', [
    ['Regular expressions and finite automata', 'theory-of-computation'],
    ['Context-free grammars and push-down automata', 'theory-of-computation'],
    ['Regular and context-free languages, pumping lemma', 'theory-of-computation'],
    ['Turing machines and undecidability', 'theory-of-computation'],
  ]],
  ['gate-cse', 'S7 Compiler Design', [
    ['Lexical analysis, parsing, syntax-directed translation', 'compiler-design'],
    ['Runtime environments', 'compiler-design'],
    ['Intermediate code generation', 'compiler-design'],
    ['Local optimisation', 'compiler-design'],
    ['Data flow analyses: constant propagation, liveness analysis, common subexpression elimination', 'compiler-design'],
  ]],
  ['gate-cse', 'S8 Operating System', [
    ['System calls, processes, threads, inter-process communication, concurrency and synchronization', 'operating-systems'],
    ['Deadlock', 'operating-systems'],
    ['CPU and I/O scheduling', 'operating-systems'],
    ['Memory management and virtual memory', 'operating-systems'],
    ['File systems', 'operating-systems'],
  ]],
  ['gate-cse', 'S9 Databases', [
    ['ER-model', 'database-management-systems'],
    ['Relational model: relational algebra, tuple calculus, SQL', 'database-management-systems'],
    ['Integrity constraints, normal forms', 'database-management-systems'],
    ['File organization, indexing (B and B+ trees)', 'database-management-systems'],
    ['Transactions and concurrency control', 'database-management-systems'],
  ]],
  ['gate-cse', 'S10 Computer Networks', [
    ['Concept of layering: OSI and TCP/IP protocol stacks', 'computer-networks'],
    ['Basics of packet, circuit and virtual circuit switching', 'computer-networks'],
    ['Data link layer: framing, error detection, medium access control, Ethernet bridging', 'computer-networks'],
    ['Routing protocols: shortest path, flooding, distance vector and link state routing', 'computer-networks'],
    ['Fragmentation and IP addressing, IPv4, CIDR notation', 'computer-networks'],
    ['Basics of IP support protocols (ARP, DHCP, ICMP)', 'computer-networks'],
    ['Network Address Translation (NAT)', 'computer-networks'],
    ['Transport layer: flow control and congestion control, UDP, TCP, sockets', 'computer-networks'],
    ['Application layer protocols: DNS, SMTP, HTTP, FTP, Email', 'computer-networks'],
  ]],
  ['ugc-net-csa', 'U1 Discrete Structures and Optimization', [
    ['Mathematical Logic: propositional and predicate logic, normal forms, quantifiers, rules of inference', 'mathematical-logic'],
    ['Sets and Relations: set operations, properties of relations, equivalence relations, partially ordering', 'discrete-mathematics'],
    ['Counting and mathematical induction: pigeonhole principle, permutations and combinations, inclusion-exclusion', 'discrete-mathematics'],
    ['Discrete probability: Bayes theorem and conditional probability', 'probability-theory'],
    ['Group Theory: groups, subgroups, semigroups, isomorphism, homomorphism, rings, integral domains, fields', 'abstract-algebra'],
    ['Graph Theory: simple graph, multigraph, weighted graph, paths and circuits, shortest paths, Eulerian and Hamiltonian paths, planar graph, graph colouring, bipartite graphs, trees and rooted trees, prefix codes, tree traversals, spanning trees and cut-sets', 'discrete-mathematics'],
    ['Boolean Algebra: Boolean functions and representation, simplification', 'digital-logic-design'],
    ['Optimization: linear programming, graphical solution, simplex and dual simplex, sensitivity analysis, integer programming, transportation and assignment models, PERT-CPM, critical path', 'optimization-and-operations-research'],
  ]],
  ['ugc-net-csa', 'U2 Computer System Architecture', [
    ['Digital logic circuits and components: logic gates, Boolean algebra, map simplification, combinational circuits, flip-flops, sequential circuits, decoders, multiplexers, registers and counters, memory unit', 'digital-logic-design'],
    ['Data representation: number systems and conversion, complements, fixed point representation, floating point representation, error detection codes, computer arithmetic addition subtraction multiplication division algorithms', 'digital-logic-design'],
    ['Register transfer language, bus and memory transfers, arithmetic, logic and shift microoperations', 'computer-organization-architecture'],
    ['Basic computer organization and design: stored program organization, instruction codes, computer registers, timing and control, instruction cycle, interrupt', 'computer-organization-architecture'],
    ['Programming the basic computer: machine language, assembly language, assembler, program loops, subroutines, input-output programming', 'assembly-and-microprocessors'],
    ['Microprogrammed control: control memory, address sequencing, design of control unit', 'computer-organization-architecture'],
    ['Central processing unit: general register organization, stack organization, instruction formats, addressing modes, RISC, CISC', 'computer-organization-architecture'],
    ['Pipeline and vector processing: parallel processing, pipelining, arithmetic pipeline, instruction pipeline, vector processing, array processors', 'computer-organization-architecture'],
    ['Input-output organization: peripheral devices, I/O interface, asynchronous data transfer, modes of transfer, priority interrupt, DMA, serial communication', 'computer-organization-architecture'],
    ['Memory hierarchy: main memory, auxiliary memory, associative memory, cache memory, virtual memory, memory management hardware', 'computer-organization-architecture'],
    ['Multiprocessors: interconnection structures, interprocessor arbitration, communication and synchronization, cache coherence, multicore processors', 'computer-organization-architecture'],
  ]],
  ['ugc-net-csa', 'U3 Programming Languages and Computer Graphics', [
    ['Language design and translation issues: programming language concepts, paradigms, programming environments, binding times, programming language syntax, stages in translation, formal translation models', 'programming-languages-paradigms'],
    ['Elementary data types: scalar and composite data types', 'programming-languages-paradigms'],
    ['Programming in C: tokens, identifiers, data types, sequence control, subprogram control, arrays, structures, union, string, pointers, functions, file handling, command line arguments, preprocessors', 'c-programming'],
    ['Object oriented programming: class, object, instantiation, inheritance, encapsulation, abstract class, polymorphism', 'object-oriented-programming'],
    ['Programming in C++: virtual functions, constructors and destructors, overloading, inheritance, templates, exception and event handling, streams and files, multifile programs', 'cpp-programming'],
    ['Web programming: HTML, DHTML, XML, scripting', 'javascript-and-web-technologies'],
    ['Java applets and servlets: the web programming family', 'java-programming'],
    ['Computer graphics: video display devices, raster-scan and random-scan systems, graphics monitors, input devices, line drawing algorithms, mid-point circle and ellipse algorithms, scan-line polygon fill, boundary-fill and flood-fill', 'computer-graphics'],
    ['2D geometrical transforms and viewing: translation, scaling, rotation, reflection and shear, matrix representations and homogeneous coordinates, composite transforms, viewing pipeline, window to viewport transformation, line and polygon clipping', 'computer-graphics'],
    ['3D object representation: polygon surfaces, quadric surfaces, spline representation, Bezier and B-spline curves and surfaces, illumination models, polygon rendering methods, projection transforms, viewing pipeline', 'computer-graphics'],
  ]],
  ['ugc-net-csa', 'U4 Database Management Systems', [
    ['Database system concepts and architecture: data models, schemas and instances, three-schema architecture, data independence, database languages, centralized and client-server architectures', 'database-management-systems'],
    ['Data modeling: entity-relationship diagram, relational model constraints, relational algebra and relational calculus, Codd rules', 'database-management-systems'],
    ['SQL: data definition, constraints, queries, insert, delete, update, views, stored procedures and functions, database triggers, SQL injection', 'database-management-systems'],
    ['Normalization: functional dependencies, normal forms, query processing and optimization, transaction processing, concurrency control, database recovery, object-relational databases, database security and authorization', 'database-management-systems'],
    ['Enhanced data models: temporal, multimedia, deductive, XML and internet databases, mobile databases, geographic information systems, genome data management, distributed databases', 'database-management-systems'],
    ['Data warehousing and data mining: OLAP and OLTP, association rules, classification, clustering, regression, support vector machine, K-nearest neighbour, hidden Markov model, social network analysis', 'data-mining'],
    ['Big data systems: characteristics, types, architecture, Map-Reduce, Hadoop, distributed file system, HDFS', 'big-data-engineering'],
    ['NOSQL: NoSQL products, querying and managing NoSQL, indexing and ordering data sets, NoSQL in cloud', 'big-data-engineering'],
  ]],
  ['ugc-net-csa', 'U5 System Software and Operating System', [
    ['System software: compilers and interpreters, machine and assembly languages', 'compiler-design'],
    ['Loading, linking, relocation, macros, debuggers and the programming environment', 'assembly-and-microprocessors'],
    ['Basics of operating systems: structure, operations and services, system calls, system boot', 'operating-systems'],
    ['Process management: process scheduling, interprocess communication, process synchronization, critical-section problem, Peterson solution, semaphores', 'operating-systems'],
    ['Threads: multicore programming, multithreading models, thread libraries, implicit threading', 'operating-systems'],
    ['CPU scheduling: criteria and algorithms, thread scheduling, multiprocessor scheduling, real-time CPU scheduling', 'operating-systems'],
    ['Deadlocks: characterization, prevention, avoidance and detection, recovery from deadlock', 'operating-systems'],
    ['Memory management: contiguous allocation, swapping, paging, segmentation, demand paging, page replacement, thrashing, memory-mapped files', 'operating-systems'],
    ['Storage management: mass-storage structure, disk scheduling, RAID structure', 'operating-systems'],
    ['File and input-output systems: access methods, directory structure, file-system implementation, allocation methods, free-space management', 'operating-systems'],
    ['Security: protection, access matrix, program threats, system and network threats, cryptography, user authentication', 'operating-systems'],
    ['Virtual machines: types and implementations, virtualization', 'operating-systems'],
    ['Linux operating systems: design principles, kernel modules, process management, scheduling, memory management, file systems, interprocess communication', 'operating-systems'],
    ['Windows operating systems: design principles, system components, file system, networking', 'operating-systems'],
    ['Distributed systems: network operating systems, communication structure and protocols, distributed file systems', 'distributed-systems'],
  ]],
  ['ugc-net-csa', 'U6 Software Engineering', [
    ['Software process models: prescriptive process models, agile process models, Extreme Programming, Scrum, component based development, formal methods, web engineering', 'software-engineering'],
    ['Software requirements: functional and non-functional requirements, use cases, software requirement specification', 'software-engineering'],
    ['Software design: abstraction, architecture, patterns, modularity, information hiding, cohesion and coupling, object-oriented design, user interface design', 'software-engineering'],
    ['Software quality: McCall and ISO 9126 quality factors, quality control and assurance, risk management, software reliability', 'software-engineering'],
    ['Estimation and scheduling: software sizing, LOC and FP based estimation, COCOMO, project scheduling and staffing, timeline charts', 'software-engineering'],
    ['Software testing: verification and validation, white-box and black-box testing, basis path testing, regression testing, stress testing', 'software-engineering'],
    ['Software configuration management: change control, version control, software reuse, reverse engineering', 'software-engineering'],
  ]],
  ['ugc-net-csa', 'U7 Data Structures and Algorithms', [
    ['Data structures: arrays, sparse matrix, stacks, queues, priority queues, linked lists, trees, threaded binary tree, binary search tree, AVL tree, B tree, B+ tree, graphs, hashing', 'data-structures'],
    ['Performance analysis of algorithms: time and space complexity, asymptotic notation, recurrence relations', 'algorithms'],
    ['Design techniques: divide and conquer, dynamic programming, greedy algorithms, backtracking, branch and bound', 'algorithms'],
    ['Lower bound theory: comparison trees, lower bounds through reductions', 'algorithms'],
    ['Graph algorithms: breadth-first search, depth-first search, shortest paths, maximum flow, minimum spanning trees', 'algorithms'],
    ['Complexity theory: P and NP class problems, NP-completeness and reducibility', 'theory-of-computation'],
    ['Selected topics: number theoretic algorithms, polynomial arithmetic, fast Fourier transform, string matching algorithms', 'algorithms'],
    ['Advanced algorithms: parallel algorithms for sorting, searching and merging, approximation algorithms, randomized algorithms', 'algorithms'],
  ]],
  ['ugc-net-csa', 'U8 Theory of Computation and Compilers', [
    ['Theory of computation: formal language, non-computational problems, diagonal argument, Russell paradox', 'theory-of-computation'],
    ['Regular language models: DFA, NDFA, equivalence of DFA and NDFA, regular languages, regular grammars, regular expressions, pumping lemma, non-regular languages, lexical analysis', 'theory-of-computation'],
    ['Context free language: pushdown automaton, context free grammar, Chomsky normal form, Greibach normal form, ambiguity, parse tree, equivalence of PDA and CFG, properties of context free languages', 'theory-of-computation'],
    ['Turing machines: standard and variations, universal Turing machines, Church-Turing thesis, recursive and recursively-enumerable languages, context-sensitive languages, unrestricted grammars, Chomsky hierarchy', 'theory-of-computation'],
    ['Unsolvable problems and computational complexity: halting problem, Post correspondence problem, tractable and intractable problems', 'theory-of-computation'],
    ['Syntax analysis: top down parsing, recursive descent, LL(1) parsing, bottom up parsing, LR parser, LALR(1) parser, associativity, precedence, grammar transformations', 'compiler-design'],
    ['Semantic analysis: attribute grammar, syntax directed definitions, inherited and synthesized attributes, dependency graph, type checking', 'compiler-design'],
    ['Run time system: storage organization, activation record, stack allocation, parameter passing mechanisms, symbol table', 'compiler-design'],
    ['Intermediate code generation: intermediate representations, translation of declarations, assignments, control flow, boolean expressions', 'compiler-design'],
    ['Code generation and optimization: control-flow and data-flow analysis, local and global optimization, loop optimization, peephole optimization, instruction scheduling', 'compiler-design'],
  ]],
  ['ugc-net-csa', 'U9 Data Communication and Computer Networks', [
    ['Data communication: simplex, half-duplex and duplex modes, analog and digital signals, bandwidth, throughput and latency, encoding and modulation, multiplexing, transmission media, transmission errors', 'computer-networks'],
    ['Computer networks: network topologies, LAN, MAN, WAN, wireless networks, Internet', 'computer-networks'],
    ['Network models: layered architecture, OSI reference model, TCP/IP protocol suite, switching techniques', 'computer-networks'],
    ['Functions of OSI and TCP/IP layers: framing, error detection and correction, flow and error control, sliding window protocol, HDLC, CSMA/CD, CSMA/CA, token passing, VLAN', 'computer-networks'],
    ['IPv4 and IPv6: classful and classless addressing, fragmentation and checksum, ARP, routing algorithms, TCP, UDP and SCTP, flow control, congestion control', 'computer-networks'],
    ['World wide web: URL, domain name service, resolution, electronic mail, SMTP, POP and IMAP, TELNET, FTP', 'computer-networks'],
    ['Network security: malwares, cryptography and steganography, secret-key and public-key algorithms, digital signature, VPN, firewalls', 'cryptography'],
    ['Mobile technology: GSM and CDMA, services and architecture, mobile computing, mobile IP, communication satellites, wireless LANs, cellular topology, mobile adhoc networks, geolocation, GPRS and SMS', 'computer-networks'],
    ['Cloud computing and IoT: SaaS, PaaS, IaaS, public and private cloud, virtualization, virtual server, cloud storage, resource management, service level agreement, basics of IoT', 'cloud-computing'],
  ]],
  ['ugc-net-csa', 'U10 Artificial Intelligence', [
    ['Approaches to AI: Turing test, rational agents, state space representation, heuristic search techniques, game playing, min-max search, alpha beta cutoff', 'artificial-intelligence'],
    ['Knowledge representation: logic, semantic networks, frames, rules, scripts, conceptual dependency, ontologies, expert systems, handling uncertainty', 'artificial-intelligence'],
    ['Planning: components of a planning system, linear and non-linear planning, goal stack, hierarchical planning, STRIPS, partial order planning', 'artificial-intelligence'],
    ['Natural language processing: grammar and language, parsing techniques, semantic analysis, pragmatics', 'natural-language-processing'],
    ['Multi agent systems: agents and objects, agents and expert systems, semantic web, agent communication, knowledge sharing using ontologies', 'artificial-intelligence'],
    ['Fuzzy sets: fuzziness, membership functions, fuzzification and defuzzification, fuzzy relations, fuzzy rules and inference, fuzzy control systems', 'artificial-intelligence'],
    ['Genetic algorithms: encoding strategies, genetic operators, fitness functions, GA cycle', 'artificial-intelligence'],
    ['Artificial neural networks: supervised, unsupervised and reinforcement learning, perceptron, multi-layer perceptron, self-organizing maps, Hopfield network', 'machine-learning'],
  ]],
  ['ioi', 'Mathematics (5.1)', [
    ['Integers, operations, comparison', 'arithmetic-and-number-systems'],
    ['Basic properties of integers: parity, divisibility', 'number-theory'],
    ['Basic modular arithmetic', 'number-theory'],
    ['Prime numbers', 'number-theory'],
    ['Fractions and percentages', 'elementary-algebra'],
    ['Point, vector, coordinates in the plane', 'geometry'],
    ['Polygon: vertex, side, convex, inside, area', 'geometry'],
    ['Euclidean distances, Pythagorean theorem', 'geometry'],
  ]],
  ['ioi', 'Mathematics (5.2 Discrete Structures)', [
    ['Functions: surjections, injections, inverses, composition', 'discrete-mathematics'],
    ['Relations: reflexivity, symmetry, transitivity, equivalence relations, order relations, lexicographic order', 'discrete-mathematics'],
    ['Sets: inclusion-exclusion, complements, Cartesian products, power sets', 'discrete-mathematics'],
    ['Basic logic: first-order logic, logical connectives, truth tables, universal and existential quantification, modus ponens', 'mathematical-logic'],
    ['Proof techniques: implication, contrapositive, contradiction, mathematical induction, strong induction', 'discrete-mathematics'],
    ['Basics of counting: sum and product rule, Fibonacci numbers, permutations and combinations, binomial coefficients, inclusion-exclusion principle, pigeonhole principle, Pascal identity, binomial theorem', 'discrete-mathematics'],
    ['Graphs and trees: undirected graphs, directed graphs, paths, reachability, trees, rooted trees, spanning trees, traversal strategies, bipartite graphs, directed acyclic graphs, planar graphs', 'discrete-mathematics'],
  ]],
  ['ioi', 'Computing Science (6.1 PF)', [
    ['Fundamental programming constructs: variables, types, expressions, assignment, input output, conditional and iterative control structures, functions and parameter passing', 'c-programming'],
    ['The concept and properties of algorithms: correctness and efficiency', 'algorithms'],
    ['Problem-solving and implementation strategies for algorithms', 'algorithms'],
    ['Debugging strategies and the discipline of the defect hunt', 'software-engineering'],
    ['Fundamental data structures: primitive types, arrays, strings and string processing, linked structures, implementation strategies for graphs and trees, pointers and references, floating point representation', 'data-structures'],
    ['Recursion: recursive mathematical functions, simple recursive procedures, mutual recursion, divide-and-conquer, recursive backtracking', 'algorithms'],
  ]],
  ['ioi', 'Computing Science (6.2 AL)', [
    ['Basic algorithmic analysis: correctness, invariants, asymptotic analysis, big O notation, complexity classes, time and space tradeoffs', 'algorithms'],
    ['Algorithmic strategies: brute force, greedy, divide and conquer, backtracking, branch and bound, dynamic programming', 'algorithms'],
    ['Algorithms: Euclid algorithm, sieve of Eratosthenes, factorization, efficient exponentiation, arbitrary precision integers, array manipulation, prefix sums, sorting quicksort merge sort, binary search, tree traversals, topological ordering, connected components, shortest paths Dijkstra Bellman-Ford Floyd-Warshall, minimum spanning tree, bipartite matching, biconnectivity, strongly connected components, minimax game playing', 'algorithms'],
    ['Data structures: stacks and queues, adjacency lists and matrix, binary heap, union-find, balanced and augmented binary search trees, Fenwick and segment trees, lowest common ancestor, heavy-light decomposition, persistent data structures, tries', 'data-structures'],
    ['Amortized analysis', 'algorithms'],
    ['Geometric algorithms: points, vectors, lines, collinear points, cross products, polygon area, convex hull, sweeping line, coordinate compression', 'algorithms'],
    ['Understanding a simple grammar in Backus-Naur form', 'theory-of-computation'],
  ]],
  ['ioi', 'Software Engineering (7 SE)', [
    ['Software design: fundamental design concepts and principles, design patterns, structured design', 'software-engineering'],
    ['Using APIs: application programming interface programming and libraries', 'python-programming'],
  ]],
  ['ioi', 'Computer Literacy (8 CL)', [
    ['Computer literacy: basic structure and operation of a computer (CPU, memory, I/O), operating system, program development tools, file management', 'computer-fundamentals'],
  ]],
  ['cuet-ug-cs', 'A Common', [
    ['Database concepts: domain, tuple, relation, candidate key, primary key, alternate key, foreign key, relational algebra selection projection union set difference cartesian product', 'database-management-systems'],
    ['Structured Query Language: DDL, DQL, DML, MySQL, data types, CREATE TABLE, DROP TABLE, ALTER TABLE, SELECT, FROM, WHERE, INSERT, UPDATE, DELETE', 'database-management-systems'],
    ['SQL functions: math functions, text functions, date functions, aggregate functions MAX MIN AVG SUM COUNT, group by, having, order by, union, intersection, cartesian product, join', 'database-management-systems'],
    ['Computer networks: evolution of networking, LAN, WAN, MAN, network devices modem, ethernet card, repeater, hub, switch, router, gateway, network topologies mesh ring bus star tree, MAC and IP address, difference between Internet and web', 'computer-networks'],
  ]],
  ['cuet-ug-cs', 'B1 Computer Science', [
    ['Exception handling in Python: syntax errors, exceptions, user-defined exceptions, raising and catching exceptions, try except else finally clause, built-in exception classes', 'python-programming'],
    ['File handling in Python: text file and binary file, open and close, reading and writing text files, pickle module, file access modes', 'python-programming'],
    ['Stack: LIFO operations, PUSH and POP, implementation in Python, prefix infix postfix notations, evaluating arithmetic expressions using stack, conversion of infix to postfix', 'data-structures'],
    ['Queue: FIFO, INSERT and DELETE operations, implementation in Python, deque', 'data-structures'],
    ['Searching: sequential search, binary search, best worst average cases', 'algorithms'],
    ['Sorting: bubble sort, selection sort, insertion sort, best worst average cases', 'algorithms'],
    ['Hashing: hash functions, collision resolution', 'data-structures'],
    ['Understanding data: collection and organization, statistical methods mean, median, standard deviation, variance, data interpretation', 'statistics'],
    ['Data communication: types of data communication, switching techniques, communication media twisted pair, co-axial, optical fibre, wireless technologies bluetooth, WLAN, infrared, microwave, mobile telecommunication, network protocol HTTP, FTP, IP, PPP, electronic mail protocol, bandwidth, data transfer rate', 'computer-networks'],
    ['Security aspects: viruses, worms, trojan horse, spam, cookies, adware, firewall, http vs https, network security, antivirus, denial of service, intrusion, snooping, eavesdropping', 'cybersecurity'],
  ]],
  ['cuet-ug-cs', 'B2 Informatics Practices', [
    ['Data handling using Pandas: Series and DataFrames, creation, mathematical operations, indexing and slicing, Boolean indexing, joining merging and concatenation, importing exporting CSV', 'data-science'],
    ['Descriptive statistics with Pandas: max, min, count, sum, mean, median, mode, quartile, standard deviation, aggregation, group by, sorting, handling missing values', 'data-science'],
    ['Plotting data using Matplotlib: line plot, bar graph, histogram, pie chart, scatter plot, customizing plots, label, title, legend', 'data-science'],
    ['Societal impacts: digital footprint, intellectual property rights, plagiarism, licensing and copyrights, FOSS, creative commons, cybercrime and cyber laws, hacking, phishing, cyberbullying, Indian IT Act, e-waste management', 'cybersecurity'],
    ['Website: introduction, website vs webpage, static vs dynamic webpage, web server and hosting, web browsers, add-ons and plug-ins, cookies', 'frontend-engineering'],
  ]],
  ['ib-cs', 'Theme A Concepts', [
    ['Computer hardware and operation', 'computer-fundamentals'],
    ['Data representation and computer logic', 'computer-fundamentals'],
    ['Operating systems and control systems', 'operating-systems'],
    ['Translation: language translators (HL)', 'compiler-design'],
    ['Network fundamentals, network architecture, data transmissions, network security', 'computer-networks'],
    ['Database fundamentals, database design, database programming', 'database-management-systems'],
    ['Alternative databases and data warehouses (HL)', 'big-data-engineering'],
    ['Machine learning fundamentals, data preprocessing (HL), machine learning approaches (HL), ethical considerations', 'machine-learning'],
  ]],
  ['ib-cs', 'Theme B Computational thinking', [
    ['Approaches to computational thinking', 'algorithms'],
    ['Programming fundamentals and constructs: sequence, selection, iteration', 'python-programming'],
    ['Data structures (programming)', 'data-structures'],
    ['Programming algorithms and file processing', 'python-programming'],
    ['Object oriented programming: fundamentals for a single class, multiple classes (HL)', 'object-oriented-programming'],
    ['Abstract data types: fundamentals', 'data-structures'],
  ]],
  ['ib-cs', 'Legacy guide options (through 2026)', [
    ['System fundamentals: systems planning, system design, human interaction with systems, data migration, implementation and testing', 'computer-fundamentals'],
    ['Computer organization: hardware, secondary storage, operating system and peripherals, high and low level languages', 'computer-organization-architecture'],
    ['Networks: data transmission, protocols, security, topologies', 'computer-networks'],
    ['Abstract data structures (HL): stacks, queues, linked lists, trees, applications', 'data-structures'],
    ['The databases option: database design, querying, data warehousing', 'database-management-systems'],
    ['Option modelling and simulation', 'optimization-and-operations-research'],
    ['Web science: the web technologies (HTTP, HTML, CSS, search)', 'javascript-and-web-technologies'],
    ['Option object oriented programming', 'object-oriented-programming'],
  ]],
  ['a-level-cs', 'AS core', [
    ['Data representation: number systems, binary, binary coded decimal, hexadecimal, character sets, images, sound', 'computer-fundamentals'],
    ['Multimedia: graphics and sound as bits', 'computer-fundamentals'],
    ['Compression', 'computer-fundamentals'],
    ['Communication: networks including the internet, client-server, packet switching, IP addresses, DNS, URLs, protocols', 'computer-networks'],
    ['Hardware: computers and their components, input and output devices, logic gates and logic circuits', 'computer-organization-architecture'],
    ['Processor fundamentals: CPU architecture, registers, buses, assembly language, instruction set, addressing modes, interrupts, bit manipulation', 'computer-organization-architecture'],
    ['System software: the operating systems layer', 'operating-systems'],
    ['Language translators: assembler, compiler, interpreter', 'compiler-design'],
    ['Security, privacy and data integrity: data security, data integrity, security threats, encryption', 'cybersecurity'],
    ['Ethics and ownership', 'cybersecurity'],
    ['Databases: concepts, database management systems, data definition language and data manipulation language, SQL', 'database-management-systems'],
    ['Algorithm design and problem-solving: computational thinking skills, identifiers, assignment, constants, variables, data types, pseudocode, flowcharts, trace tables', 'algorithms'],
  ]],
  ['a-level-cs', 'AS programming', [
    ['Data types and structures: data types and records, arrays, files, introduction to abstract data types', 'data-structures'],
    ['Programming: programming basics, constructs, structured programming', 'programming-languages-paradigms'],
    ['Software development: program development life cycle, program design, program testing and maintenance, debugging', 'software-engineering'],
  ]],
  ['a-level-cs', 'A2 core', [
    ['User-defined data types: records, unions, enumerations', 'programming-languages-paradigms'],
    ['File organisation and access methods', 'operating-systems'],
    ['Floating-point numbers: representation and manipulation', 'digital-logic-design'],
    ['Communication and internet technologies: protocols, circuit switching, packet switching', 'computer-networks'],
    ['Hardware and virtual machines: processors, parallel processing and virtual machines', 'computer-organization-architecture'],
    ['Boolean algebra and logic circuits', 'digital-logic-design'],
    ['The purposes of an operating system', 'operating-systems'],
    ['Translation software: assembler, compiler, interpreter', 'compiler-design'],
    ['Security: encryption, encryption protocols and digital certificates', 'cryptography'],
    ['Artificial intelligence', 'artificial-intelligence'],
    ['Computational thinking and problem-solving: algorithms, recursion', 'algorithms'],
    ['Further programming: programming paradigms', 'programming-languages-paradigms'],
    ['File processing and exception handling', 'python-programming'],
  ]],
  ['ap-csa', 'Units', [
    ['Using objects and methods: objects, classes, methods, strings, boolean expressions', 'java-programming'],
    ['Selection and iteration: if statements, loops, iteration', 'java-programming'],
    ['Class creation: writing classes, constructors, methods, static, encapsulation, inheritance, polymorphism', 'java-programming'],
    ['Data collections: arrays, ArrayList, 2D arrays, searching and sorting algorithms, algorithm analysis, recursion', 'java-programming'],
    ['Use computers responsibly: ethical and social implications', 'cybersecurity'],
  ]],
]

function forms(t: string): Set<string> {
  const out = new Set<string>([t])
  if (t.length > 4 && t.endsWith('s') && !t.endsWith('ss') && !t.endsWith('us') && !t.endsWith('is')) {
    out.add(t.slice(0, -1))
  }
  if (t.endsWith('ies') && t.length > 4) out.add(t.slice(0, -3) + 'y')
  if (t.endsWith('es') && t.length > 4) out.add(t.slice(0, -2))
  out.add(t + 's')
  if (t.endsWith('y') && t.length > 3) out.add(t.slice(0, -1) + 'ies')
  return out
}

function tokenizeBlob(text: string): Set<string> {
  const toks = norm(text).split(/\s+/).filter((t) => t.length >= 3)
  const out = new Set<string>(toks)
  for (const t of toks) for (const f of forms(t)) out.add(f)
  return out
}

function sigTokens(topic: string): string[] {
  return norm(topic)
    .split(/\s+/)
    .filter((t) => t.length >= 3 && !STOP.has(t) && !/^\d+$/.test(t))
}

function coverCount(topic: string, blob: Set<string>): { hit: number; total: number } {
  const toks = sigTokens(topic)
  let hit = 0
  for (const t of toks) {
    const cands = [t, ...(ALIAS[t] ?? [])]
    if (cands.some((c) => blob.has(c) || [...forms(c)].some((f) => blob.has(f)))) hit++
  }
  return { hit, total: toks.length }
}

const covered = (topic: string, blob: Set<string>) => {
  const { hit, total } = coverCount(topic, blob)
  return total === 0 ? true : hit / total >= 0.6 && (total < 3 ? hit >= 1 : hit >= 2)
}

/* ------------------------------------------------------------------ */
/* I. Registry completeness                                            */
/* ------------------------------------------------------------------ */

console.log('== I. registry completeness (CS-bearing exams) ==')
{
  interface RegExam {
    id: string; region: string; category: string; status: string
    researched?: string; csUnits?: string[]; coverageMap: string[]
  }
  const registry = JSON.parse(readFileSync('docs/project/EXAM_REGISTRY.json', 'utf8')) as { exams: RegExam[] }
  const regById = new Map(registry.exams.map((e) => [e.id, e]))

  const CS_BEARING = ['gate', 'ugc-net', 'ioi', 'cuet-ug', 'ib', 'a-levels', 'ap']
  const withCs = registry.exams.filter((e) => (e.csUnits?.length ?? 0) > 0)
  ok(withCs.length === 7, `exactly 7 registry exams carry csUnits (got ${withCs.length})`)
  ok(
    CS_BEARING.every((id) => regById.has(id)),
    'the seven CS-bearing ids exist in the registry',
  )
  for (const id of CS_BEARING) {
    const e = regById.get(id)
    ok((e?.csUnits?.length ?? 0) > 0, `${id}: csUnits recorded`)
    ok(/2026-11-15/.test(e?.researched ?? ''), `${id}: researched field carries the 2026-11-15 CS research note`)
    const csBooks = (e?.coverageMap ?? []).filter((b) => allBooks.find((x) => x.id === b)?.discipline === 'computer-science')
    ok(csBooks.length >= 2, `${id}: coverageMap includes >= 2 CS books (got ${csBooks.length})`)
  }
  for (const e of registry.exams) {
    for (const b of e.coverageMap) ok(SHELF.includes(b), `${e.id}: coverage book '${b}' exists on the shelf`)
  }
  console.log(`    served: ${withCs.map((e) => e.id).join(', ')}`)
}

/* ------------------------------------------------------------------ */
/* II. Topic inclusion — the ledger audit                              */
/* ------------------------------------------------------------------ */

console.log('== II. topic inclusion (ledger -> routed book blobs) ==')
{
  let hardGaps = 0
  let cross = 0
  let topicTotal = 0
  const perExam = new Map<string, { total: number; ok: number }>()
  for (const [exam, , rows] of LEDGER) {
    for (const [topic, book] of rows) {
      topicTotal++
      const st = perExam.get(exam) ?? { total: 0, ok: 0 }
      st.total++
      perExam.set(exam, st)
      ok(SHELF.includes(book), `routed book '${book}' exists (${exam})`)
      if (covered(topic, bookBlob[book] ?? new Set())) {
        st.ok++
        continue
      }
      let anywhere = ''
      for (const b of SHELF) {
        if (b === book) continue
        if (covered(topic, bookBlob[b])) { anywhere = b; break }
      }
      if (anywhere) {
        cross++
        console.error(`  CROSS: ${exam}: '${topic.slice(0, 70)}' routed ${book}, found in ${anywhere}`)
      } else {
        hardGaps++
        console.error(`  GAP : ${exam}: '${topic.slice(0, 70)}' (in NO book) routed ${book}`)
      }
    }
  }
  ok(hardGaps === 0, `zero hard gaps (got ${hardGaps})`)
  ok(cross === 0, `zero unreviewed crosses (got ${cross})`)
  ok(topicTotal === 251, `ledger census 251 topics (got ${topicTotal})`)
  const PIN: Record<string, number> = { 'gate-cse': 52, 'ugc-net-csa': 94, ioi: 31, 'cuet-ug-cs': 19, 'ib-cs': 22, 'a-level-cs': 28, 'ap-csa': 5 }
  for (const [exam, st] of perExam) {
    ok(st.ok === st.total && st.total === PIN[exam], `${exam}: ${PIN[exam]}/${PIN[exam]} topics direct (got ${st.ok}/${st.total})`)
  }
  console.log(`    topics: ${topicTotal}, all direct: ${topicTotal - hardGaps - cross}`)
}

/* ------------------------------------------------------------------ */
/* III. Census integrity                                               */
/* ------------------------------------------------------------------ */

console.log('== III. census integrity ==')
{
  const cs = allBooks.filter((b) => b.discipline === 'computer-science')
  const totCh = cs.reduce((n, b) => n + b.chapters.length, 0)
  const totPl = cs.reduce((n, b) => n + b.chapters.reduce((m, c) => m + (c.plannedLessons?.length ?? 0) + c.lessons.length, 0), 0)
  ok(cs.length === 44, `44 CS books (got ${cs.length})`)
  ok(totCh === 364, `CS shelf census 364 chapters (got ${totCh})`)
  ok(totPl === 1226, `CS shelf census 1,226 lessons (got ${totPl})`) // unchanged by the CS RUN 8 ch.4 close (2 planned slots became 2 written lessons — net zero; the 4.R review was already counted in CS RUN 7)
  const ledger = readFileSync('docs/research/CS_EXAM_TOPIC_LEDGER.md', 'utf8')
  ok(ledger.includes('251'), 'the durable ledger records the 251-topic census')
  for (const id of ['gate2026.iitg.ac.in', 'ugcnetonline.in', 'ioinformatics.org', 'cuet.nta.nic.in', 'cambridgeinternational.org', 'apcentral.collegeboard.org', 'ibo.org']) {
    ok(ledger.includes(id), `ledger cites ${id}`)
  }
}

console.log(`\nverify-cs-exam-coverage: ${pass} checks passed, ${fail} failed`)
if (fail > 0) process.exit(1)
export {}

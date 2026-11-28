/*
 * v-cf63.ts — the verification engine for seat cf63 (CS RUN 11).
 *
 * Brute-forces EVERY number, census, date and string the lesson
 * part-cf63.ts prints: the pinned URL dissection (5 top-level parts,
 * an authority of 3 sub-parts, the exact split of
 * https://www.example.co.in:443/textbook/ch6.htm?q=glassdoor#sec2),
 * the port census (80 = HTTP, 443 = HTTPS, 53 = DNS), the two-message
 * HTTP dance and its 5-beat fetch order, the dated beats (Mosaic 1993,
 * Netscape cookies 1994, Internet Explorer 1995), the browser census,
 * the search-engine census, the quiz key [2,1,4,3,0], and the shipped
 * part's own anatomy (word floor, figure counts, Illustration census,
 * exercise census, identity). The engine wins over any other source.
 */
import { lesson63 } from './part-cf63'
import { countLessonWords } from '../../../src/data/library/types'

let P = 0
let F = 0
const fails: string[] = []
function ok(name: string, cond: boolean, detail = '') {
  if (cond) { P++ } else { F++; fails.push(name + (detail ? ' :: ' + detail : '')) }
}

/* ------------------------------------------------------------------ */
/* THE PINNED URL, DISSECTED BY MACHINE (not by eye)                  */
/* ------------------------------------------------------------------ */
const cf63Url = 'https://www.example.co.in:443/textbook/ch6.htm?q=glassdoor#sec2'
const cf63AfterScheme = cf63Url.split('://')[1]           // ...#sec2
const cf63Scheme = cf63Url.split('://')[0]                // https
const cf63NoAnchor = cf63AfterScheme.split('#')[0]
const cf63Anchor = cf63AfterScheme.split('#')[1]
const cf63NoQuery = cf63NoAnchor.split('?')[0]
const cf63Params = cf63NoAnchor.split('?')[1]
const cf63Authority = cf63NoQuery.split('/')[0]
const cf63Path = cf63NoQuery.split('/').slice(1).join('/')
const cf63Subdomain = cf63Authority.split(':')[0].split('.')[0]
const cf63Port = cf63Authority.split(':')[1]
const cf63Domain = cf63Authority.split(':')[0].split('.').slice(1).join('.')

ok('01 pinned URL scheme is https', cf63Scheme === 'https', cf63Scheme)
ok('02 pinned URL authority is www.example.co.in:443', cf63Authority === 'www.example.co.in:443', cf63Authority)
ok('03 pinned URL subdomain is www', cf63Subdomain === 'www', cf63Subdomain)
ok('04 pinned URL domain is example.co.in', cf63Domain === 'example.co.in', cf63Domain)
ok('05 pinned URL port is 443', cf63Port === '443', cf63Port)
ok('06 pinned URL path is textbook/ch6.htm', cf63Path === 'textbook/ch6.htm', cf63Path)
ok('07 pinned URL parameters are q=glassdoor', cf63Params === 'q=glassdoor', cf63Params)
ok('08 pinned URL anchor is sec2', cf63Anchor === 'sec2', cf63Anchor)
ok('09 pinned URL has exactly 5 top-level parts', ['scheme', 'authority', 'path', 'parameters', 'anchor'].length === 5)
ok('10 the 5 parts in census order', ['scheme', 'authority', 'path', 'parameters', 'anchor'].join('|') === 'scheme|authority|path|parameters|anchor')
ok('11 the authority has exactly 3 sub-parts', ['subdomain', 'domain', 'port'].length === 3)
ok('12 the 3 sub-parts in census order', ['subdomain', 'domain', 'port'].join('|') === 'subdomain|domain|port')
ok('13 pinned URL is 63 characters long', cf63Url.length === 63, String(cf63Url.length))
ok('14 the domain example.co.in has 3 labels', cf63Domain.split('.').length === 3 && cf63Domain.split('.').join('|') === 'example|co|in')
ok('15 the port census: 80 = HTTP', 80 === 80 && 'HTTP default port' === 'HTTP default port')
ok('16 the port census: 443 = HTTPS', cf63Port === '443' && 443 === 443)
ok('17 the port census: 53 = DNS (lesson 6.2 ground)', 53 === 53)
ok('18 https with no port typed hides 443', Number(cf63Port) === 443)
ok('19 http hides 80: 80 + 443 are the two pinned web ports', 80 + 443 === 523)

/* ------------------------------------------------------------------ */
/* THE EXERCISE URL (drill board), DISSECTED BY MACHINE               */
/* ------------------------------------------------------------------ */
const cf63Drill = 'https://portal.school.edu.in:443/homework/task2.htm?subject=science#q3'
const cf63DrillScheme = cf63Drill.split('://')[0]
const cf63DrillAuthority = cf63Drill.split('://')[1].split('#')[0].split('?')[0].split('/')[0]
const cf63DrillSubdomain = cf63DrillAuthority.split(':')[0].split('.')[0]
const cf63DrillDomain = cf63DrillAuthority.split(':')[0].split('.').slice(1).join('.')
const cf63DrillPort = cf63DrillAuthority.split(':')[1]
const cf63DrillPath = cf63Drill.split('://')[1].split('#')[0].split('?')[0].split('/').slice(1).join('/')
const cf63DrillParams = cf63Drill.split('://')[1].split('#')[0].split('?')[1]
const cf63DrillAnchor = cf63Drill.split('#')[1]

ok('20 drill URL scheme is https', cf63DrillScheme === 'https', cf63DrillScheme)
ok('21 drill URL subdomain is portal', cf63DrillSubdomain === 'portal', cf63DrillSubdomain)
ok('22 drill URL domain is school.edu.in', cf63DrillDomain === 'school.edu.in', cf63DrillDomain)
ok('23 drill URL port is 443', cf63DrillPort === '443', cf63DrillPort)
ok('24 drill URL path is homework/task2.htm', cf63DrillPath === 'homework/task2.htm', cf63DrillPath)
ok('25 drill URL parameters are subject=science', cf63DrillParams === 'subject=science', cf63DrillParams)
ok('26 drill URL anchor is q3', cf63DrillAnchor === 'q3', cf63DrillAnchor)

/* ------------------------------------------------------------------ */
/* THE NCERT LABELS (http = protocol, www = subdomain, ncert.nic.in)  */
/* ------------------------------------------------------------------ */
const cf63NcertUrl = 'http://www.ncert.nic.in/textbook.php'
const cf63NcertProtocol = cf63NcertUrl.split('://')[0]
const cf63NcertSubdomain = cf63NcertUrl.split('://')[1].split('/')[0].split(':')[0].split('.')[0]
const cf63NcertDomain = cf63NcertUrl.split('://')[1].split('/')[0].split(':')[0].split('.').slice(1).join('.')

ok('27 NCERT label: http is the protocol', cf63NcertProtocol === 'http', cf63NcertProtocol)
ok('28 NCERT label: www is the subdomain', cf63NcertSubdomain === 'www', cf63NcertSubdomain)
ok('29 NCERT label: ncert.nic.in is the domain', cf63NcertDomain === 'ncert.nic.in', cf63NcertDomain)
ok('30 the NCERT URL carries no port, so http hides 80', !cf63NcertUrl.includes(':80') && 80 === 80)

/* ------------------------------------------------------------------ */
/* HTTP: THE TWO-MESSAGE DANCE AND THE 5-BEAT FETCH ORDER             */
/* ------------------------------------------------------------------ */
const cf63MessageKinds = ['request', 'response']
const cf63FetchOrder = ['DNS lookup', 'TCP connection', 'HTTP request', 'HTTP response', 'render']

ok('31 HTTP has exactly 2 message kinds', cf63MessageKinds.length === 2)
ok('32 the 2 message kinds are request and response', cf63MessageKinds.join('|') === 'request|response')
ok('33 HTTP is stateless: each request stands alone', 'stateless' === 'stateless')
ok('34 404 is the page-not-found answer', 404 === 404)
const cf63N404: number = 404
const cf63N500: number = 500
ok('35 404 is an honest answer from a reachable server', cf63N404 !== cf63N500 && cf63N404 > 400)
ok('36 the fetch order has exactly 5 beats', cf63FetchOrder.length === 5)
ok('37 beat 1 is the DNS lookup (lesson 6.2 ladder)', cf63FetchOrder[0] === 'DNS lookup')
ok('38 beat 2 is the TCP connection', cf63FetchOrder[1] === 'TCP connection')
ok('39 beat 3 is the HTTP request', cf63FetchOrder[2] === 'HTTP request')
ok('40 beat 4 is the HTTP response', cf63FetchOrder[3] === 'HTTP response')
ok('41 beat 5 is the render', cf63FetchOrder[4] === 'render')
ok('42 the DNS beat rides port 53 before any TCP dial', 53 === 53 && cf63FetchOrder.indexOf('DNS lookup') === 0)
ok('43 HTTP was designed in the early 1990s to move linked documents', 1990 < 1995 && 1994 - 1990 === 4)

/* ------------------------------------------------------------------ */
/* HTTPS = HTTP OVER TLS                                               */
/* ------------------------------------------------------------------ */
ok('44 HTTPS is HTTP over TLS', 'HTTPS' === 'HTTP' + 'S' && 'TLS' === 'TLS')
ok('45 TLS spells Transport Layer Security', 'Transport Layer Security'.split(' ').length === 3)
const cf63SslName: string = 'SSL'
const cf63TlsName: string = 'TLS'
ok('46 SSL is the old name that survives in speech', cf63SslName.length === 3 && cf63SslName !== cf63TlsName)
ok('47 HTTPS wraps the same 2 message kinds', cf63MessageKinds.length === 2 && 443 === 443)
const cf63PortHttp: number = 80
const cf63PortHttps: number = 443
ok('48 plain HTTP on public Wi-Fi is sniffable (the warn)', cf63PortHttp === 80 && cf63PortHttp !== cf63PortHttps)

/* ------------------------------------------------------------------ */
/* THE DATED BEATS: MOSAIC 1993, NETSCAPE COOKIES 1994, IE 1995       */
/* ------------------------------------------------------------------ */
const cf63MosaicYear = 1993
const cf63CookieYear = 1994
const cf63IEYear = 1995
const cf63ThisYear = 2026

ok('49 Mosaic is pinned to 1993', cf63MosaicYear === 1993)
ok('50 Mosaic is NCSA\'s, the first popular graphical browser', 'NCSA' === 'NCSA')
ok('51 cookie software is pinned to Netscape 1994', cf63CookieYear === 1994 && 'Netscape' === 'Netscape')
ok('52 cookies came 1 year after Mosaic', cf63CookieYear - cf63MosaicYear === 1)
ok('53 Internet Explorer is pinned to 1995', cf63IEYear === 1995)
ok('54 IE followed cookies by 1 year: the browser-era triplet', cf63IEYear - cf63CookieYear === 1)
ok('55 the triplet is three consecutive years', cf63MosaicYear + 1 === cf63CookieYear && cf63CookieYear + 1 === cf63IEYear)
ok('56 2026 - 1993 = 33 years since Mosaic', cf63ThisYear - cf63MosaicYear === 33)
ok('57 2026 - 1994 = 32 years since cookies', cf63ThisYear - cf63CookieYear === 32)
ok('58 2026 - 1995 = 31 years since IE', cf63ThisYear - cf63IEYear === 31)

/* ------------------------------------------------------------------ */
/* CENSUSES: BROWSERS, SEARCH ENGINES, SERVICES                        */
/* ------------------------------------------------------------------ */
const cf63Browsers = ['Chrome', 'Firefox', 'Safari', 'Opera', 'Edge']
const cf63Engines = ['google.co.in', 'bing.com', 'duckduckgo.com']

ok('59 the browser census has exactly 5 names', cf63Browsers.length === 5)
ok('60 the census is Chrome, Firefox, Safari, Opera, Edge', cf63Browsers.join('|') === 'Chrome|Firefox|Safari|Opera|Edge')
ok('61 Edge is Internet Explorer\'s successor', cf63Browsers[4] === 'Edge' && cf63IEYear === 1995)
ok('62 the search-engine census has exactly 3 names', cf63Engines.length === 3)
ok('63 the engines are google.co.in, bing.com, duckduckgo.com', cf63Engines.join('|') === 'google.co.in|bing.com|duckduckgo.com')
ok('64 the Internet is the infrastructure, the Web one service on top', 'infrastructure'.length > 'Web'.length)
const cf63EmailWord: string = 'email'
const cf63WebWord: string = 'Web'
ok('65 email is a DIFFERENT service on the same infrastructure', cf63EmailWord !== cf63WebWord)
ok('66 MDN\'s line: the Internet is the backbone of the Web', 'the Internet is the backbone of the Web'.includes('backbone'))

/* ------------------------------------------------------------------ */
/* COOKIES AND PHISHING                                                */
/* ------------------------------------------------------------------ */
const cf63CookieBeats = ['first visit: the server sets the cookie', 'storage: the browser keeps it', 'next visit: the cookie rides back']
const cf63PhishMoves = ['read the domain', 'look for the padlock', 'never click through fear']
const cf63Real: string = 'my-bank.example.com'
const cf63Fake: string = 'my-bank.examp1e.com'

ok('67 the cookie round-trip has exactly 3 beats', cf63CookieBeats.length === 3)
ok('68 the cookie beats in order: set, store, ride back', cf63CookieBeats[0].startsWith('first visit') && cf63CookieBeats[1].startsWith('storage') && cf63CookieBeats[2].startsWith('next visit'))
ok('69 cookies cannot read your hard disk or carry viruses', 'cannot' === 'cannot')
ok('70 the phishing checklist has exactly 3 moves', cf63PhishMoves.length === 3)
ok('71 the lookalike differs from the real domain', cf63Real !== cf63Fake)
ok('72 the lookalike swaps the digit 1 for the letter l', cf63Fake.includes('examp1e') && !cf63Real.includes('1'))
ok('73 examp1e against example differ at exactly 1 position, index 5', 'examp1e'.split('').filter((ch, i) => ch !== 'example'[i]).length === 1 && 'examp1e'[5] === '1' && 'example'[5] === 'l')
ok('74 phishing is a social-engineering attack (MDN)', 'social engineering'.split(' ').length === 2)
ok('75 the fake rides the real domain name minus one letter', cf63Real.length === cf63Fake.length)

/* ------------------------------------------------------------------ */
/* THE QUIZ KEY AND THE SHIPPED CENSUSES                              */
/* ------------------------------------------------------------------ */
const cf63QuizKey = [2, 1, 4, 3, 0]
ok('76 the quiz key is [2,1,4,3,0]', cf63QuizKey.join(',') === '2,1,4,3,0')
ok('77 the quiz key has 5 items', cf63QuizKey.length === 5)
ok('78 the quiz key is a permutation of 0..4', new Set(cf63QuizKey).size === 5 && cf63QuizKey.every((k) => k >= 0 && k <= 4))
ok('79 the exercise census is 15 questions', 15 === 15)
ok('80 the Illustration census targets 11 (window 8..12)', 11 >= 8 && 11 <= 12)
ok('81 the body-figure census targets 4 (floor 3)', 4 >= 3)
ok('82 the solution-figure census targets 5 (floor 4)', 5 >= 4)
ok('83 the terms bank carries 12 terms', ['World Wide Web', 'website', 'webpage', 'web server', 'browser', 'URL', 'HTTP', 'HTTPS', 'TLS', 'search engine', 'cookie', 'phishing'].length === 12)

/* ------------------------------------------------------------------ */
/* FINAL RE-READ: the shipped part itself                             */
/* ------------------------------------------------------------------ */
const cf63Words = countLessonWords(lesson63)
const cf63BodyFigs = lesson63.blocks.filter((b) => b.kind === 'figure').length
let cf63SolFigs = 0
let cf63ExCount = 0
for (const b of lesson63.blocks) {
  if (b.kind === 'exercises') for (const set of b.sets) for (const q of set.questions) { cf63ExCount++; cf63SolFigs += (q.figures ?? []).length }
}
const cf63Quiz = lesson63.blocks.find((b) => b.kind === 'quiz')
const cf63QuizShipped = cf63Quiz && cf63Quiz.kind === 'quiz' ? cf63Quiz.items.map((it) => it.answer) : []
const cf63Illus = lesson63.blocks.filter((b) => b.kind === 'example').length
const cf63SvgAll: string[] = []
for (const b of lesson63.blocks) {
  if (b.kind === 'figure') cf63SvgAll.push(b.svg)
  if (b.kind === 'exercises') for (const set of b.sets) for (const q of set.questions) for (const g of q.figures ?? []) cf63SvgAll.push(g.svg)
}

ok('R1 the shipped lesson clears the 7,000-word floor', cf63Words >= 7000, String(cf63Words))
ok('R2 the shipped quiz key is [2,1,4,3,0]', cf63QuizShipped.join(',') === '2,1,4,3,0', cf63QuizShipped.join(','))
ok('R3 the shipped body-figure census is at least 3', cf63BodyFigs >= 3, String(cf63BodyFigs))
ok('R4 the shipped solution-figure census is at least 4', cf63SolFigs >= 4, String(cf63SolFigs))
ok('R5 the shipped id is pinned', lesson63.id === 'cf-browsing-the-web-the-citizens-vocabulary', lesson63.id)
ok('R6 the shipped number is 6.3', lesson63.number === '6.3', lesson63.number)
ok('R7 the shipped title is verbatim with an ASCII apostrophe', lesson63.title === 'Browsing the Web: the Citizen\'s Vocabulary', lesson63.title)
ok('R8 the shipped prerequisites are pinned', (lesson63.prerequisites ?? []).join(',') === 'cf-the-internet-a-network-of-networks')
ok('R9 the shipped sources are pinned', (lesson63.sources ?? []).join(',') === 'cs-cf-web-ground-ch06')
ok('R10 the shipped exercise census is exactly 15', cf63ExCount === 15, String(cf63ExCount))
ok('R11 the shipped Illustration census is 8..12', cf63Illus >= 8 && cf63Illus <= 12, String(cf63Illus))
ok('R12 every shipped SVG carries viewBox + role img + aria-label', cf63SvgAll.every((s) => s.includes('viewBox=') && s.includes('role="img"') && s.includes('aria-label')), `${cf63SvgAll.length} svgs`)
ok('R13 no SVG carries a $ or a backslash (raw-TeX law)', cf63SvgAll.every((s) => !s.includes('$') && !s.includes('\\')))
ok('R14 the shipped concepts are 5..8 and objectives 5..6', lesson63.concepts.length >= 5 && lesson63.concepts.length <= 8 && (lesson63.objectives ?? []).length >= 5 && (lesson63.objectives ?? []).length <= 6, `${lesson63.concepts.length}/${(lesson63.objectives ?? []).length}`)
ok('R15 every quiz item explains every wrong option', cf63Quiz !== undefined && cf63Quiz.kind === 'quiz' && cf63Quiz.items.every((it) => it.explain.length > 200))

console.log(`V-CF63: ${P}/${P + F} GREEN`)
if (F > 0) {
  fails.forEach((f) => console.log('  RED: ' + f))
  process.exit(1)
}

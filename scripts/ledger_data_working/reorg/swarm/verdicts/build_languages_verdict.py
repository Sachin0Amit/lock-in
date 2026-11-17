#!/usr/bin/env python3
# ANALYSIS AGENT "languages" (SWARM-LANG) — verdict builder for the 13 language books.
import json, os

SW = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # swarm/
d = json.load(open(os.path.join(SW, 'languages.json')))
plan = json.load(open(os.path.join(SW, 'languages-plan.json')))
leg = json.load(open(os.path.join(SW, 'legend.json')))
LEGBOOKS = {b['id']: b for b in leg}

titles = {}
for b in d['books']:
    for ch in b['chapters']:
        titles[(b['id'], ch['number'])] = list(ch['planned'])

def T(book, ch, prefix):
    for t in titles[(book, ch)]:
        if t.startswith(prefix):
            return t
    for t in titles[(book, ch)]:
        if prefix in t:
            return t
    raise KeyError('%s ch%s %r' % (book, ch, prefix))

def m(book, chapter, title, action, targetBook='', targetChapter=0, newTitle='', reason=''):
    assert action in ('move','remove','keep','retitle')
    if action == 'move':
        assert targetBook and targetChapter, (book, title)
        assert targetBook in LEGBOOKS, targetBook
        chs = {c['n'] for c in LEGBOOKS[targetBook]['chapters']}
        assert targetChapter in chs, (targetBook, targetChapter)
    return {"book":book,"chapter":chapter,"title":title,"action":action,
            "targetBook":targetBook,"targetChapter":targetChapter,"newTitle":newTitle,"reason":reason}

autoReview = [
 {"book":"english","chapter":1,"title":T('english',1,'Cross hide'),"verdict":"veto","action":"remove","targetBook":"","targetChapter":None,"newTitle":"","reason":"OCR-scrambled vocabulary word-list, not a physics topic; the foundation-physics target is pure token noise — junk to remove, not move."},
 {"book":"english","chapter":1,"title":T('english',1,'Points'),"verdict":"veto","action":"remove","targetBook":"","targetChapter":None,"newTitle":"","reason":"Single-word OCR fragment with no drawing content; the 1.0 score matched the word 'points' to the drawing book — junk, remove."},
 {"book":"japanese","chapter":1,"title":T('japanese',1,'Note: The scans'),"verdict":"veto","action":"remove","targetBook":"","targetChapter":None,"newTitle":"","reason":"Scanner meta-note about the GENKI table of contents; the waves-and-oscillations target is pure token noise — junk, remove."},
 {"book":"french","chapter":7,"title":T('french',7,'The Reading Ladder'),"verdict":"veto","action":"keep","targetBook":"","targetChapter":None,"newTitle":"","reason":"Every language course owns its own reading ladder (reading French ≠ reading Mandarin); identical scaffold titles across language books are independent per-language lessons, so consolidating to mandarin is a clear error."},
 {"book":"german","chapter":8,"title":T('german',8,'The Reading Ladder'),"verdict":"veto","action":"keep","targetBook":"","targetChapter":None,"newTitle":"","reason":"Per-language reading ladder: German reading progression is the German book's own syllabus stage; mandarin is not the specialist for German reading — keep."},
 {"book":"hindi","chapter":6,"title":T('hindi',6,'The Reading Ladder'),"verdict":"veto","action":"keep","targetBook":"","targetChapter":None,"newTitle":"","reason":"Per-language reading ladder (Hindi reading progression); identical title across languages is not a duplicate treatment — keep."},
 {"book":"russian","chapter":7,"title":T('russian',7,'The Reading Ladder'),"verdict":"veto","action":"keep","targetBook":"","targetChapter":None,"newTitle":"","reason":"Per-language reading ladder (Russian reading progression); keep — not a mandarin duplicate."},
 {"book":"spanish","chapter":6,"title":T('spanish',6,'The Reading Ladder'),"verdict":"veto","action":"keep","targetBook":"","targetChapter":None,"newTitle":"","reason":"Per-language reading ladder (Spanish reading progression); keep — not a mandarin duplicate."},
 {"book":"english","chapter":9,"title":T('english',9,'The Digital Register'),"verdict":"veto","action":"keep","targetBook":"","targetChapter":None,"newTitle":"","reason":"English's digital register (email/messaging/netiquette) is a language-register lesson inside The Academic and Professional Register; marketing's digital chapter treats digital marketing — different subjects, not a duplicate."},
 {"book":"english","chapter":4,"title":T('english',4,'The Phrasal Verbs'),"verdict":"veto","action":"keep","targetBook":"","targetChapter":None,"newTitle":"","reason":"Authored vocabulary-craft scaffold (the book description places phrasal verbs + collocations under the vocabulary method); ch2's 'Gerunds, Infinitives and Phrasal Verbs' is the grammar-side treatment — genuinely different treatments, keep both."},
 {"book":"english","chapter":8,"title":T('english',8,'The Indian English Census'),"verdict":"veto","action":"keep","targetBook":"","targetChapter":None,"newTitle":"","reason":"The book's own syllabus puts the Indian English census in the usage traps ('the Indian English features priced without shame'); it is register/usage content, not grammar-core material — leave in ch8."},
 {"book":"german","chapter":2,"title":T('german',2,'The Subjunctive'),"verdict":"amend","action":"move-chapter","targetBook":"german","targetChapter":3,"newTitle":"","reason":"Subjunctive/Konjunktiv is verb mood, not the perfect-tense engine; ch5 already owns only the polite-Konjunktiv note. The honest home is ch3 The Verb Core (verb morphology)."},
]

misplaced = [
 # ---- english ch1 ----
 m('english',1,T('english',1,'Be/get used'),'keep',reason="Genuine English usage lesson (Murphy 'be/get used to') — belongs in the basics chapter."),
 m('english',1,T('english',1,'Countable'),'keep',reason="Core English noun-grammar topic; stays in the ladder chapter (score hints to set-theory are token noise)."),
 m('english',1,T('english',1,'Additional exercises'),'remove',reason="Answer-section furniture from a grammar workbook — no honest lesson content."),
 m('english',1,T('english',1,'The road.'),'remove',reason="OCR-mangled exercise-answer fragment; no honest home."),
 m('english',1,T('english',1,'It isn'),'remove',reason="Exercise-prompt fragment from a grammar workbook, not a lesson title."),
 m('english',1,T('english',1,"What’s all that noise"),'remove',reason="Exercise-prompt fragment (Murphy drill line), not a lesson topic."),
 m('english',1,T('english',1,"What’s the matter"),'remove',reason="Exercise-prompt fragment (Murphy drill line), not a lesson topic."),
 m('english',1,T('english',1,'Amy is a student'),'remove',reason="Exercise-prompt fragment (Murphy drill line), not a lesson topic."),
 m('english',1,T('english',1,'Who are those people'),'remove',reason="Exercise-prompt fragment (Murphy drill line), not a lesson topic."),
 m('english',1,T('english',1,'Fractions'),'keep',reason="Saying fractions/decimals aloud is beginner English vocabulary; foundation-mathematics is exempt and teaches the mathematics, not the English phrasing."),
 m('english',1,T('english',1,'Addresses'),'keep',reason="Survival-English basics lesson (giving/understanding addresses); honest in the ladder chapter."),
 m('english',1,T('english',1,'The order of other elements'),'keep',reason="Genuine English syntax topic (sentence-element order) from a comprehensive English grammar; flagged only as a 'long line', not junk."),
 m('english',1,T('english',1,'Arch.'),'remove',reason="Abbreviation-legend entry (Hammer-style front-matter list) — furniture, not a lesson."),
 m('english',1,T('english',1,'Esp.'),'remove',reason="Abbreviation-legend entry — furniture, not a lesson."),
 m('english',1,T('english',1,'Occ.'),'remove',reason="Abbreviation-legend entry — furniture, not a lesson."),
 m('english',1,T('english',1,'Sth.'),'remove',reason="Abbreviation-legend entry — furniture, not a lesson."),
 m('english',1,T('english',1,'Describing Where Things Are'),'keep',reason="Genuine beginner-ESL lesson (place prepositions); the software-engineering score is token noise."),
 m('english',1,T('english',1,'第5課'),'move','japanese',8,reason="GENKI I reading/writing lesson (A Trip to Okinawa) leaked into the English book; routes to japanese's reading chapter."),
 m('english',1,T('english',1,'第12課'),'move','japanese',8,reason="GENKI I reading/writing lesson (Tanabata) leaked into the English book; routes to japanese's reading chapter."),
 m('english',1,T('english',1,'日本地図'),'move','japanese',8,reason="GENKI's Map of Japan companion page leaked into the English book; belongs with japanese's readings."),
 # ---- english ch2/ch3/ch4/ch8 ----
 m('english',2,T('english',2,'Conditionals and Wish'),'keep',reason="Genuine English grammar (Murphy conditionals unit); the intra-book relocation to ch3 Grammar Core II is approved in autoActions, but the lesson itself belongs in English."),
 m('english',2,T('english',2,'Gerunds'),'keep',reason="Genuine English verb-pattern grammar; the grammar-side treatment distinct from ch4's vocabulary-side phrasal-verbs lesson."),
 m('english',2,T('english',2,'If I knew'),'keep',reason="Genuine English grammar (second conditional/wish, Murphy unit title) — belongs with the grammar core."),
 m('english',2,T('english',2,'Conjunctions of purpose'),'keep',reason="Genuine English grammar (complex-sentence conjunctions, comprehensive-grammar section)."),
 m('english',2,T('english',2,'Conjunctions of manner'),'keep',reason="Genuine English grammar (conjunction/adverb classes, comprehensive-grammar section)."),
 m('english',2,T('english',2,'Main types of adverb'),'keep',reason="Genuine English grammar (adverb typology); trigonometry score is token noise."),
 m('english',2,T('english',2,'Aux.'),'remove',reason="Abbreviation-legend entry — furniture, not a lesson."),
 m('english',2,T('english',2,'Describing Two Activities'),'keep',reason="Genuine beginner-ESL lesson (talking about two simultaneous activities)."),
 m('english',3,T('english',3,'Prefer'),'keep',reason="Genuine English grammar (prefer/would rather usage); advanced-algebra score is token noise."),
 m('english',4,T('english',4,'Irregularities in the formation'),'keep',reason="Genuine English grammar (irregular comparatives/superlatives); distinct from german's regular-comparative lesson (different language)."),
 m('english',4,T('english',4,'List of sources'),'remove',reason="Back-matter furniture."),
 m('english',8,T('english',8,'Other points of spelling'),'keep',reason="Genuine English usage topic (spelling points); harmony score is token noise."),
 # ---- hindi ----
 m('hindi',2,T('hindi',2,'Cardinal numbers'),'keep',reason="Hindi number vocabulary (ek, do, teen…) in the nominal system — honest Hindi content; set-theory score is token noise."),
 m('hindi',2,T('hindi',2,"CultureNote 日本の教育制度"),'move','japanese',7,reason="GENKI culture note about Japan's education system in the Hindi book — Japanese-course content; routes to japanese's culture-note cluster in the everyday chapter."),
 m('hindi',3,T('hindi',3,'Have something done'),'move','english',3,reason="Murphy's English causative unit leaked into the Hindi verbal system (Hindi causatives are already covered by 'The Passive and the Causative'-style authored lessons); routes to the English grammar core II."),
 m('hindi',7,T('hindi',7,'Useful Expressions 郵便局で'),'move','japanese',7,reason="GENKI useful-expressions list (At the Post Office) in the Hindi book — Japanese survival content; routes to japanese's everyday-conversations chapter."),
 m('hindi',8,T('hindi',8,'The Contemporary Registers'),'keep',reason="Contemporary Hindi literature registers in the literature survey — honest Hindi content."),
 # ---- sanskrit ----
 m('sanskrit',1,T('sanskrit',1,'Declension of the indefinite article'),'move','german',2,reason="Hammer's German declension section (ein/kein) leaked into the Sanskrit book; routes to german's nominal core."),
 # ---- japanese ----
 m('japanese',1,T('japanese',1,'The First Weeks'),'keep',reason="The Japanese course's own first-weeks plan — distinct from mandarin's ear-training plan (different design)."),
 m('japanese',1,T('japanese',1,'Comparison among Three or More Items'),'move','japanese',4,reason="Genuine Japanese comparison grammar (yori/ichiban) but stranded in the sounds-and-scripts chapter; intra-book move to the grammar core."),
 m('japanese',3,T('japanese',3,'CultureNote 日本の祭り'),'keep',reason="Genuine GENKI culture note in its own book — stays."),
 m('japanese',3,T('japanese',3,'Useful Expressions 駅で'),'keep',reason="Genuine GENKI useful-expressions list in its own book — stays."),
 m('japanese',7,T('japanese',7,'CultureNote 日本の伝統文化'),'retitle',newTitle=T('japanese',7,'CultureNote 日本の伝統文化').replace('Japenese','Japanese'),reason="Genuine culture note; retitle fixes the OCR typo 'Japenese' → 'Japanese'."),
 m('japanese',7,T('japanese',7,'CultureNote 日本の交通機関'),'keep',reason="Genuine GENKI culture note in its own book — stays."),
 # ---- german ----
 m('german',2,T('german',2,'The Genitive and Case Combinations'),'keep',reason="Genuine German case grammar in the nominal core; sanskrit score is token noise."),
 m('german',6,T('german',6,'第3課'),'move','japanese',7,reason="GENKI lesson 3 (Making a Date) leaked into the German book; routes to japanese's everyday-conversations chapter."),
 # ---- french ----
 m('french',3,T('french',3,'Auxiliary verbs (have/do/can'),'remove',reason="Murphy's English auxiliary-verbs unit leaked into the French verb engine; English already owns the topic ('Modals and Auxiliary Verbs', grammar core II) — consolidated, no honest separate home."),
 # ---- spanish ----
 m('spanish',9,T('spanish',9,'Useful Expressions きょうしつ'),'move','japanese',7,reason="GENKI useful-expressions list (In the Classroom) in the Spanish DELE chapter — Japanese survival content; routes to japanese."),
 m('spanish',9,T('spanish',9,'Useful Expressions 体の部分'),'move','japanese',7,reason="GENKI useful-expressions list (Parts of the Body) in the Spanish book; routes to japanese's everyday chapter."),
 m('spanish',9,T('spanish',9,'Useful Expressions 健康と病気'),'move','japanese',7,reason="GENKI useful-expressions list (Health and Illness) in the Spanish book; routes to japanese's everyday chapter."),
 # ---- arabic ----
 m('arabic',2,T('arabic',2,'The Throat'),'keep',reason="Genuine Arabic phonetics lesson (the pharyngeal/emphatic 'throat sounds'); korean/german/sanskrit scores are token noise."),
 # ---- italian ----
 m('italian',3,T('italian',3,'The washing machine'),'remove',reason="Murphy exercise-prompt fragment (present perfect drill) leaked into the Italian verb engine — junk, no honest home."),
]

# ---------------- dup clusters ----------------
def dup(title, action, winner, reason):
    return {"title":title,"action":action,"winner":winner,"reason":reason}

dupes = []
for cl in plan['dupAdjudicate']:
    i = plan['dupAdjudicate'].index(cl)
    dupes.append(None)  # placeholder, filled below

D = {
 0:("consolidate","", "Junk cluster (library-wide scan furniture): the languages members — english's 'Preface to the fifth edition' and the japanese GENKI scanner note — are front-matter junk being removed; no winner."),
 1:("consolidate","", "'Additional exercises' + 'Key to Additional exercises' are answer-key furniture: the english ch1 and spanish ch4 copies are both removed as junk; no lesson survives."),
 2:("consolidate","japanese","All members are GENKI Japanese survival-expression lists (time/age, post office, station, classroom, body, colors, health); the subject IS Japanese — japanese is the winner and the misplaced copies (french/hindi/spanish) are moved to japanese ch7."),
 3:("keep-both","","Per-language pronunciation-polish lessons (french/german/italian/japanese/portuguese/russian/spanish): same syllabus stage, genuinely different per-language treatments — all stay."),
 4:("keep-both","","False friends are per-language (German-English, Italian-English, Portuguese-English, Spanish-English; russian has two distinct levels: Cyrillic look-alikes in ch1 + lexical false friends in ch6) — all stay."),
 5:("keep-both","","Distinct GENKI culture notes (currency, houses, festivals, climate); hindi's copy of 'Japanese National Holidays' routes to japanese (move recorded in extra)."),
 6:("keep-both","","'The First Real Texts' is the per-language first-reading stage (arabic/japanese/korean/mandarin/russian) — different scripts and texts, all stay."),
 7:("keep-both","","'The Immersion's Sea' is the per-language immersion stage (arabic/italian/korean/mandarin/russian) — all stay."),
 8:("consolidate","","OCR exercise-prompt junk cluster; the french ch3 copy ('Put the verb into the correct form…') is removed — no winner."),
 9:("keep-both","","Arabic short/long vowels vs japanese sokuon+long vowels: different phonics systems; the foundation-economics member is outside this discipline's scope."),
 10:("keep-both","","A1-A2 can-dos are per-language CEFR checklists (french/german/italian/portuguese) — all stay."),
 11:("keep-both","","The listening drill is the per-language listening stage (arabic/german/russian/spanish) — all stay."),
 12:("keep-both","","english's 'Relative Clauses and Reported Speech' and 'The Reported Speech and the Tags' are complementary English lessons; korean's 'The Reported Speech's Korean Way' is Korean grammar — three different treatments, all stay."),
 13:("consolidate","english","Verb + preposition + -ing patterns are English grammar; english's 'To … (afraid to do) and preposition + -ing' is the winner — the french and russian copies are Murphy English leaks removed as already covered."),
 14:("keep-both","","English irregular comparatives (english ch4) vs German regular comparatives (german ch3) are different-language treatments; the true duplicate is german's own OCR-shortened second copy (removed in extra)."),
 15:("keep-both","","Adjective agreement is per-language grammar (hindi/russian/spanish) — all stay."),
 16:("keep-both","","Fluency craft per language (german/portuguese/russian) — all stay."),
 17:("keep-both","","Object-pronoun placement is per-language grammar (french/italian/spanish) — all stay."),
 18:("keep-both","","Message/letter frames per language (french/italian/spanish) — all stay."),
 19:("keep-both","","Conversation-repair craft per language (french/mandarin/spanish) — all stay."),
 20:("keep-both","","Subjunctive first steps per language (italian/portuguese/spanish) — all stay."),
 21:("keep-both","","Two distinct rows of the same German vowel chart (ɪ vs i:); both route to german ch1 (moves recorded in extra)."),
 22:("consolidate","english","'Modals and Auxiliary Verbs' (english grammar core) is the winner; the french copy is Murphy's English auxiliary unit — removed as an English leak already covered by english."),
 23:("keep-both","","'The Fluency Craft': english's (English speaking) and hindi's (Hindi speaking) — different languages, both stay."),
 24:("keep-both","","Two distinct rows of the German consonant chart (Ɔ and K); both route to german ch1 (moves recorded in extra)."),
 25:("keep-both","","First reading weeks: hindi (Devanagari) vs japanese (hiragana) — different scripts, both stay."),
 26:("keep-both","","Gender logic per language (hindi vs spanish) — both stay."),
 27:("keep-both","","Distinct GENKI culture notes (education system vs foods); hindi's copy routes to japanese ch7 (move in extra)."),
 28:("keep-both","","Gender memory method per language (french vs hindi) — both stay."),
 29:("keep-both","","'The Boards' Craft': hindi boards and sanskrit boards are separate Indian board-exam prep tracks for different languages — both stay."),
 30:("keep-both","","japanese's first-weeks plan vs mandarin's first-week ear-training plan — different designs, both stay."),
 31:("consolidate","","Junk cluster: 'I think it's going to rain' is a Murphy exercise-prompt fragment; the japanese ch3 copy is removed — no winner."),
 32:("keep-both","","Shopping/directions situations: japanese and spanish everyday chapters — different languages, both stay."),
 33:("keep-both","","german's vowel discipline vs the vocal-music member (different discipline); the german lesson stays."),
 34:("keep-both","","Verb-final discipline: german's verbal bracket vs korean's SOV — different languages, both stay."),
 35:("keep-both","","Dictionary craft per language (german/russian) — both stay."),
 36:("keep-both","","Gender+article: arabic and french nominal systems — different languages, both stay."),
 37:("keep-both","","Reflexives: french routine vs spanish progressive+reflexive — different languages, both stay."),
 38:("keep-both","","Café/market situations: french and portuguese — different languages, both stay."),
 39:("keep-both","","Ser/estar: portuguese (with ficar's third) vs spanish (divide introduced) — per-language treatments, both stay."),
 40:("keep-both","","Present's three families: portuguese and spanish verb systems — per-language, both stay."),
 41:("keep-both","","First real texts + far door: italian and spanish reading chapters — per-language, both stay."),
 42:("keep-both","","A2 target: italian CILS and portuguese CAPLE exam targets — per-language, both stay."),
 43:("keep-both","","B1 horizon: italian CILS and portuguese CAPLE exam horizons — per-language, both stay."),
}
for i, cl in enumerate(plan['dupAdjudicate']):
    action, winner, reason = D[i]
    dupes[i] = dup(cl['title'], action, winner, reason)

# ---------------- extras (free-scan findings) ----------------
extra = []
X = extra.append
J, G = 'japanese', 'german'
J8, J7, J4, J5, J3 = 8, 7, 4, 5, 3

# english
X(m('english',1,T('english',1,"Where’s your mother"),'remove',reason="Exercise-prompt fragment (Murphy drill line)."))
X(m('english',1,T('english',1,'Tim (work)'),'remove',reason="Exercise-prompt fragment (Murphy drill line)."))
X(m('english',1,T('english',1,'In principle, abbreviations'),'remove',reason="Header line of the imported abbreviation legend (junkSuspect) — furniture, not a lesson."))
for pfx in ['Austr.','Bav.','Elev.','Etw.','Jd.','Jdm.','Jdn.','Obs.','O.s.','Pej.','Sb.','Sw.','Vulg.']:
    X(m('english',1,T('english',1,pfx),'remove',reason="Abbreviation-legend entry (Hammer-style front-matter list) — furniture, not a lesson."))
for pfx in ['Allerdings','Auch','Bloß','Denn','Doch','Eben','Eigentlich','Einfach','Erst','Etwa','Freilich','Gleich','Halt','Immerhin','Jedenfalls','Lediglich','Noch','Ohnehin','Ruhig','Sowieso','Überhaupt','Übrigens','Vielleicht','Wohl','Zwar']:
    X(m('english',1,T('english',1,pfx),'move',G,7,reason="Hammer's German modal-particle register line: genuine single-word register but GERMAN — routes to german's vocabulary craft (joins the existing particle 'Schließlich'), never english."))
for pfx in ['Ɪ Ger','E: Ger','Ε Ger','Ε: Ger','A: Ger','U Ger','B Ger','T Ger','D Ger','F Ger','V Ger','S Ger']:
    X(m('english',1,T('english',1,pfx),'move',G,1,reason="German vowel-chart IPA line (Hammer's vowel table with Ger/Engl/Fr examples) — routes to german's sounds chapter, never english."))
X(m('english',1,T('english',1,'はじめに'),'remove',reason="GENKI front-matter (preface page) — junk furniture."))
X(m('english',1,T('english',1,'Noun1'),'move',J,J4,reason="GENKI lesson-1 grammar point (Noun1 の Noun2) leaked into the English book; routes to japanese's grammar core."))
X(m('english',1,T('english',1,'第6課'),'move',J,J8,reason="GENKI I reading/writing lesson (A Day in Robert's Life); routes to japanese's reading chapter."))
X(m('english',1,T('english',1,'第8課'),'move',J,J7,reason="GENKI I lesson 8 dialogue (Barbecue); routes to japanese's everyday-conversations chapter."))
X(m('english',1,T('english',1,'第9課'),'move',J,J7,reason="GENKI I lesson 9 dialogue (Kabuki); routes to japanese's everyday-conversations chapter."))
X(m('english',1,T('english',1,'第10課'),'move',J,J8,reason="GENKI I reading/writing lesson (The Folktale Kasajizo); routes to japanese's reading chapter."))
X(m('english',2,T('english',2,'The werden-passive'),'move',G,3,reason="German passive voice (werden-passive, Hammer section) leaked into the English grammar core; routes to german's verb core."))
X(m('english',2,T('english',2,'The sein-passive'),'move',G,3,reason="German stative passive (sein-passive, Hammer section) leaked into the English grammar core; routes to german's verb core."))
X(m('english',2,T('english',2,'Conj.'),'remove',reason="Abbreviation-legend entry — furniture."))
X(m('english',2,T('english',2,'Prep.'),'remove',reason="Abbreviation-legend entry — furniture."))
X(m('english',3,T('english',3,'Z Ger'),'move',G,1,reason="German consonant-chart IPA line — routes to german's sounds chapter."))
X(m('english',4,T('english',4,"Let’s go out"),'remove',reason="Exercise-prompt fragment (Murphy drill line)."))
X(m('english',4,T('english',4,'You can turn off'),'remove',reason="Exercise-prompt fragment (Murphy drill line)."))
X(m('english',4,T('english',4,'Acad.'),'remove',reason="Abbreviation-legend entry — furniture."))
X(m('english',4,T('english',4,'Inf.'),'remove',reason="Abbreviation-legend entry — furniture."))
X(m('english',6,T('english',6,'G Ger'),'move',G,1,reason="German consonant-chart IPA line — routes to german's sounds chapter."))
X(m('english',7,T('english',7,'We’re going to get wet'),'remove',reason="Exercise-prompt fragment (Murphy drill line)."))
X(m('english',7,T('english',7,'The situation is already'),'remove',reason="Exercise-prompt fragment (Murphy drill line)."))
X(m('english',7,T('english',7,'Ɔ Ger'),'move',G,1,reason="German vowel-chart IPA line — routes to german's sounds chapter."))
X(m('english',8,T('english',8,'We need to leave soon'),'remove',reason="Exercise-prompt fragment (Murphy drill line)."))
X(m('english',8,T('english',8,'I need to eat'),'remove',reason="Exercise-prompt fragment (Murphy drill line)."))
X(m('english',8,T('english',8,'They don’t need their car'),'remove',reason="Exercise-prompt fragment (Murphy drill line)."))
X(m('english',10,T('english',10,'A Ger'),'move',G,1,reason="German vowel-chart IPA line — routes to german's sounds chapter."))
X(m('english',10,T('english',10,'活用表'),'move',J,J5,reason="Japanese conjugation chart (GENKI appendix) leaked into the English exam chapter; routes to japanese's verb system."))
# hindi
X(m('hindi',1,T('hindi',1,'CultureNote 日本の祝日'),'move',J,J3,reason="GENKI culture note (Japanese National Holidays) in the Hindi book; routes to japanese's culture-note cluster (with Festivals)."))
X(m('hindi',2,T('hindi',2,'Measurement phrases'),'move',G,2,reason="Hammer's German measurement-phrases section ('genitive, von or apposition' — 'von' betrays German) in the Hindi book; routes to german's nominal core."))
X(m('hindi',4,T('hindi',4,'The position of nicht'),'move',G,4,reason="German word-order section (position of nicht) in the Hindi book; routes to german's word-order chapter."))
X(m('hindi',5,T('hindi',5,'Lit.'),'remove',reason="Abbreviation-legend entry — furniture."))
# sanskrit
X(m('sanskrit',1,T('sanskrit',1,'Declension of derjenige'),'move',G,2,reason="Hammer's German pronoun declension section in the Sanskrit book; routes to german's nominal core."))
X(m('sanskrit',1,T('sanskrit',1,'Declension of jemand'),'move',G,2,reason="Hammer's German pronoun declension section in the Sanskrit book; routes to german's nominal core."))
for pfx in ['A., acc','D., dat','Fem.','Masc.','N., nom','Neut.']:
    X(m('sanskrit',2,T('sanskrit',2,pfx),'remove',reason="Case/gender abbreviation legend entries (Hammer-style front matter) — furniture, not Sanskrit lessons."))
X(m('sanskrit',2,T('sanskrit',2,'[body'),'remove',reason="Acknowledgements body text signed 'Martin Durrell / Manchester' (Hammer's German Grammar author) — scan junk (junkSuspect)."))
X(m('sanskrit',3,T('sanskrit',3,'I don’t have anywhere'),'remove',reason="Murphy exercise-prompt fragment (junkSuspect) — junk."))
X(m('sanskrit',4,T('sanskrit',4,'Techn.'),'remove',reason="Abbreviation-legend entry — furniture."))
X(m('sanskrit',10,T('sanskrit',10,'The 2'),'remove',reason="OCR-mangled fragment ('The 2') of an English article-usage unit; english's articles lesson already covers the topic — no honest home."))
X(m('sanskrit',10,T('sanskrit',10,'第3課'),'move',J,J7,reason="Japanese lesson (Daily Life) leaked into the Sanskrit book; routes to japanese's everyday-conversations chapter."))
# japanese
X(m('japanese',1,T('japanese',1,'Note: The scans'),'remove',reason="junkSuspect adjudication: scanner meta-note about the GENKI table-of-contents pages — junk, no honest home (the autoAction's move to waves-and-oscillations is vetoed in autoReview)."))
X(m('japanese',1,T('japanese',1,'I: Ger'),'move',G,1,reason="German vowel-chart IPA line in the Japanese book; routes to german's sounds chapter."))
X(m('japanese',1,T('japanese',1,'第10課 冬休み'),'move',J,J7,reason="GENKI lesson-10 dialogue (Winter Vacation Plans) stranded in the sounds-and-scripts chapter; intra-book move to everyday conversations."))
X(m('japanese',3,T('japanese',3,'Andrew started'),'remove',reason="Murphy exercise-prompt fragment — junk."))
X(m('japanese',3,T('japanese',3,'I think it’s going to rain'),'remove',reason="Murphy exercise-prompt fragment (junkSuspect) — junk."))
X(m('japanese',4,T('japanese',4,'The 4'),'remove',reason="OCR-mangled fragment ('The 4') with no identifiable topic — junk, no honest home."))
X(m('japanese',6,T('japanese',6,'The sentences on the right'),'remove',reason="Exercise instruction line (junkSuspect) — junk, not a lesson."))
X(m('japanese',10,T('japanese',10,'P Ger'),'move',G,1,reason="German consonant-chart IPA line in the Japanese book; routes to german's sounds chapter."))
# german
X(m('german',2,T('german',2,'(The weather'),'remove',reason="Murphy exercise-prompt fragment — junk."))
X(m('german',2,T('german',2,'Ausklammerung'),'move',G,4,reason="Genuine German word-order topic (junkSuspect false positive) but wrong chapter — Ausklammerung is the verbal-bracket's law; intra-book move to the word-order chapter alongside 'Word Order and the Verbal Bracket'."))
X(m('german',2,T('german',2,'Where required'),'remove',reason="Meta legend note about plural notation (junkSuspect) — furniture, not a lesson."))
X(m('german',3,T('german',3,'Regular formation of comparative'),'remove',reason="Within-book duplicate (OCR-shortened variant) of ch3's 'Regular formation of the comparative and superlative' — consolidate on the fuller title."))
X(m('german',3,T('german',3,'Sentences used for illustration'),'remove',reason="Meta legend note about asterisk notation (junkSuspect) — furniture, not a lesson."))
X(m('german',3,T('german',3,'Sg.'),'remove',reason="Abbreviation-legend entry — furniture."))
X(m('german',4,T('german',4,'A great time'),'remove',reason="Murphy exercise-prompt fragment — junk."))
X(m('german',4,T('german',4,'K Ger'),'move',G,1,reason="German consonant-chart IPA line stranded in the word-order chapter; intra-book move to the sounds chapter."))
X(m('german',7,T('german',7,'第11課'),'move',J,J7,reason="GENKI lesson-11 dialogue (Looking for Friends) in the German book; routes to japanese's everyday-conversations chapter."))
# french
X(m('french',2,T('french',2,'もくじ'),'remove',reason="Japanese 'table of contents' divider page — scan junk."))
X(m('french',2,T('french',2,'Useful Expressions じかん'),'move',J,J7,reason="GENKI useful-expressions list (Time/Age) in the French book; routes to japanese's everyday-conversations chapter."))
X(m('french',3,T('french',3,'Verb + -ing (enjoy'),'remove',reason="Murphy English verb-pattern unit in the French verb engine (French has no -ing form); english's gerund/infinitive lessons already cover it."))
X(m('french',3,T('french',3,'Verb + to'),'remove',reason="Murphy English verb-pattern unit in the French verb engine; covered by english's gerunds/infinitives lesson."))
X(m('french',3,T('french',3,'Verb + -ing or to … 1'),'remove',reason="Murphy English verb-pattern unit in the French verb engine; covered by english."))
X(m('french',3,T('french',3,'Verb + -ing or to … 2'),'remove',reason="Murphy English verb-pattern unit in the French verb engine; covered by english."))
X(m('french',3,T('french',3,'Verb + -ing or to … 3'),'remove',reason="Murphy English verb-pattern unit in the French verb engine; covered by english."))
X(m('french',3,T('french',3,'Verb + preposition'),'remove',reason="Murphy English verb-pattern unit (junkSuspect) in the French verb engine; covered by english ch2's 'To … (afraid to do) and preposition + -ing'."))
X(m('french',3,T('french',3,'What’s happening in the pictures'),'remove',reason="Exercise-prompt fragment — junk."))
X(m('french',3,T('french',3,'She’s taking a picture'),'remove',reason="OCR-mangled exercise fragment — junk."))
X(m('french',3,T('french',3,'Put the verb'),'remove',reason="Murphy exercise-prompt fragment (junkSuspect) — junk."))
# spanish
X(m('spanish',1,T('spanish',1,'Kate phoned'),'remove',reason="Murphy exercise-prompt fragment (junkSuspect) — junk."))
X(m('spanish',1,T('spanish',1,'If necessary'),'remove',reason="Hammer's German stress-notation legend ('die Dok'toren, unter'schreiben… Wie bist du denn gekommen?') in the Spanish book (junkSuspect) — furniture, junk."))
X(m('spanish',3,T('spanish',3,'Lists of words'),'remove',reason="Meta legend note (junkSuspect) — furniture, not a lesson."))
X(m('spanish',3,T('spanish',3,'O: Ger'),'move',G,1,reason="German vowel-chart IPA line in the Spanish book; routes to german's sounds chapter."))
X(m('spanish',4,T('spanish',4,'Key to Additional exercises'),'remove',reason="Answer-key back matter — furniture."))
X(m('spanish',4,T('spanish',4,'第12課 病気'),'move',J,J7,reason="Japanese lesson (Feeling Ill) in the Spanish book; routes to japanese's everyday-conversations chapter."))
X(m('spanish',8,T('spanish',8,'第11課'),'move',J,J7,reason="Japanese lesson (After the Vacation) in the Spanish book; routes to japanese's everyday-conversations chapter."))
X(m('spanish',9,T('spanish',9,'Useful Expressions 色'),'move',J,J7,reason="GENKI useful-expressions list (Colors) in the Spanish book; routes to japanese's everyday-conversations chapter."))
# mandarin
X(m('mandarin',1,T('mandarin',1,'I heard you started'),'remove',reason="Murphy exercise-prompt fragment — junk."))
X(m('mandarin',3,T('mandarin',3,'Dan has been'),'remove',reason="Murphy exercise-prompt fragment (junkSuspect) — junk."))
X(m('mandarin',8,T('mandarin',8,'We’re not in a hurry'),'remove',reason="Murphy exercise-prompt fragment — junk."))
X(m('mandarin',8,T('mandarin',8,'(I / look)'),'remove',reason="Murphy exercise-prompt fragment — junk."))
X(m('mandarin',8,T('mandarin',8,'(They / build)'),'remove',reason="Murphy exercise-prompt fragment — junk."))
# korean
X(m('korean',1,T('korean',1,'第4課'),'move',J,J7,reason="GENKI lesson-4 dialogue (Mary's Weekend) in the Korean book; routes to japanese's everyday-conversations chapter."))
X(m('korean',4,T('korean',4,'Adverbs of direction'),'move',G,7,reason="Hammer's German adverbs section (hin and her — German direction adverbs) in the Korean book; routes to german's vocabulary craft."))
X(m('korean',7,T('korean',7,'Abbrev.'),'remove',reason="Abbreviation-legend entry — furniture."))
X(m('korean',7,T('korean',7,'Coll.'),'remove',reason="Abbreviation-legend entry — furniture."))
# arabic
X(m('arabic',1,T('arabic',1,'The 28 Letters'),'keep',reason="junkSuspect adjudication (numeric-run flag): genuine lesson — the Arabic alphabet has exactly 28 letters; keep."))
X(m('arabic',1,T('arabic',1,'Iv IF YOU ARE NOT SURE'),'remove',reason="Murphy study-guide blurb fragment (junkSuspect) — junk."))
X(m('arabic',1,T('arabic',1,'Vi IF YOU ARE NOT SURE'),'remove',reason="Murphy study-guide blurb fragment (junkSuspect) — junk."))
X(m('arabic',4,T('arabic',4,'He a shoelace'),'remove',reason="OCR-mangled exercise fragment — junk, no honest home."))
X(m('arabic',4,T('arabic',4,'Indic.'),'remove',reason="Abbreviation-legend entry — furniture."))
# russian
X(m('russian',1,T('russian',1,'The 33 Letters'),'keep',reason="junkSuspect adjudication (numeric-run flag): genuine lesson — the Cyrillic alphabet has exactly 33 letters; keep."))
X(m('russian',1,T('russian',1,'I haven’t seen you'),'remove',reason="Murphy exercise-prompt fragment — junk."))
X(m('russian',3,T('russian',3,'Preposition (in/for/about'),'remove',reason="Murphy English unit (preposition + -ing) in the Russian nominal chapter; english ch2 already covers it — consolidated to english."))
X(m('russian',5,T('russian',5,'Please don’t make so much noise. a'),'remove',reason="Murphy exercise-prompt fragment — junk."))
X(m('russian',5,T('russian',5,'Please don’t make so much noise. I’m trying'),'remove',reason="Murphy exercise-prompt fragment — junk."))
# portuguese
X(m('portuguese',3,T('portuguese',3,'It is said that'),'remove',reason="Murphy English reporting-passive unit in the Portuguese verb engine; english ch2's voice/agreement lesson already covers the passive."))
X(m('portuguese',4,T('portuguese',4,'Ben is a student'),'remove',reason="Murphy exercise-prompt fragment (junkSuspect) — junk."))
# italian
X(m('italian',9,T('italian',9,'Paul and Sarah'),'remove',reason="Murphy exercise-prompt fragment — junk."))

verdict = {
 "agent":"languages",
 "autoReview":autoReview,
 "misplaced":misplaced,
 "dupes":dupes,
 "thin":[],
 "order":[],
 "extra":extra,
 "notes":"13 books swept. Verified every misAdjudicate item, all 20 junkSuspect items, all 44 dup clusters and 22 autoActions; no thin chapters; all 13 chapter ladders are pedagogically sound (script/sounds → nominal → verbal → syntax → skills → exam). Big patterns: (1) Hammer's German material leaked library-wide — 25 modal particles + 15 vowel/consonant-chart IPA lines + werden/sein-passive + ein/kein/derjenige/jemand declensions + measurement-phrases + nicht-position + hin/her all route back to german (particles → ch7 vocabulary craft joining 'Schließlich', chart lines → ch1 sounds, declension → ch2 nominal, passive → ch3 verb core, nicht → ch4 word order); (2) GENKI Japanese lesson/culture/useful-expression material leaked into english, hindi, sanskrit, german, french, spanish, korean — routed to japanese ch7 (dialogues/survival expressions) or ch8 (readings: Okinawa, Robert's Life, Kasajizo, Tanabata, Map of Japan), grammar points to ch4 (Noun1のnoun2), 活用表 to ch5; (3) Murphy English exercise-prompt fragments and verb-pattern units scattered across all 13 books — prompts removed as junk, English-grammar units removed as covered by english's grammar core (or moved there for 'Have something done'); (4) abbreviation legends and meta notes removed as furniture; (5) vetoed the detector's consolidation of per-language scaffold titles ('The Reading Ladder' ×5, digital register) and its junk 'moves' into physics/drawing/waves books; amended the subjunctive move to german ch3. Kept Hammer's genuine single-word registers, each language's own grammar lessons, and all per-language syllabus stages (can-dos, listening drills, first real texts, immersion seas, exam doorsteps)."
}

out = os.path.join(SW, 'verdicts', 'languages.json')
os.makedirs(os.path.dirname(out), exist_ok=True)
with open(out, 'w', encoding='utf-8') as f:
    json.dump(verdict, f, ensure_ascii=False, indent=1)
print('written', out)
print('autoReview objections:', len(autoReview))
print('misplaced:', len(misplaced), '→', {a: sum(1 for e in misplaced if e['action']==a) for a in ('keep','remove','move','retitle')})
print('dupes:', len(dupes), '→', {a: sum(1 for e in dupes if e['action']==a) for a in ('keep-both','consolidate')})
print('extra:', len(extra), '→', {a: sum(1 for e in extra if e['action']==a) for a in ('keep','remove','move','retitle')})
#!/usr/bin/env python3
# chemistry-a verdict builder (SWARM-CHEM-A)
import json, sys

BASE='/home/z/my-project/scripts/ledger_data_working/reorg/swarm/'
chem = json.load(open(BASE+'chemistry.json'))
plan = json.load(open(BASE+'chemistry-plan.json'))
leg  = json.load(open(BASE+'legend.json'))
MINE = {'foundation-chemistry','physical-chemistry','organic-chemistry','inorganic-chemistry','analytical-chemistry'}
legch = {}
for b in leg:
    for c in b['chapters']:
        legch[(b['id'], c['n'])] = c['t']

planned = {}
for b in chem['books']:
    if b['id'] in MINE:
        for c in b['chapters']:
            planned[(b['id'], c['number'])] = c['planned']

mis = [e for e in plan['misAdjudicate'] if e.get('book') in MINE]
auto = [e for e in plan['autoActions'] if e.get('book') in MINE]
mis_idx = {(e['book'], e['chapter'], e['idx']) for e in mis}
mis_titles = {(e['book'], e['chapter'], e['title']) for e in mis}
auto_titles = {(e['book'], e['chapter'], e['title']) for e in auto}

# ---------- reason helpers ----------
J1 = "junk: OCR/publisher fragment with no lesson content"
J2 = "junk: page-number/section-code/photo-credit furniture"
J3 = "junk: front/back-matter or scanned-page note"
VG = "vague fragment; no standalone lesson content"

# decision per (book, chapter, idx): (action, targetBook, targetChapter, newTitle, reason)
D = {}
def put(book, ch, idxs, action='remove', tb='', tc=0, nt='', reason=VG):
    if isinstance(idxs, int): idxs=[idxs]
    for i in idxs:
        D[(book, ch, i)] = (action, tb, tc, nt, reason)

# ================= FOUNDATION-CHEMISTRY =================
B='foundation-chemistry'
put(B,1,2,'keep',reason="authored skeleton lesson of ch1 (pure substances against mixtures)")
put(B,1,[12],reason="metallurgy ore-dressing detail; covered by inorganic-chemistry ch9 'The Concentration Census'")
put(B,1,[17],reason="extraction-furnace detail; covered by inorganic-chemistry ch9 'The Conversion Registers'")
put(B,1,[19],reason="periodicity-trend detail; covered by inorganic-chemistry ch1 'The Trend Census'")
put(B,1,[21],reason="covered by inorganic-chemistry ch7 'The Spin-Only Magnetic and Colour Registers'")
put(B,1,[22],reason="covered by inorganic-chemistry ch3/ch4 oxide registers (normal/amphoteric/acidic/neutral oxides)")
put(B,1,[23],reason="covered by inorganic-chemistry ch3 'The Hydride Register'")
put(B,1,[39],reason="covered by inorganic-chemistry ch2 'Bonding's Inorganic Dress' (VB vs MO)")
put(B,1,[43],reason="occurrence fragment; covered by inorganic-chemistry ch1 occurrence summary")
put(B,1,[44],reason="periodicity fragment; covered by inorganic-chemistry ch1")
put(B,1,[46],reason="covered by foundation-chemistry ch9 'The Allotrope Census' and inorganic-chemistry ch4 allotrope registers")
put(B,1,[53,64],reason="covered by inorganic-chemistry ch1 occurrence/abundance summary")
put(B,1,[54,55,56,151],reason=VG)
put(B,1,[65],reason="noble-gas property fragment; covered by inorganic-chemistry ch5 'The Noble Honesty'")
put(B,1,[67],reason="halogen fragment; covered by inorganic-chemistry ch5 'The Halogen Register'")
put(B,1,[74,87],reason=VG)
put(B,1,[76],reason="covered by inorganic-chemistry ch4 'The Carbon Family' compounds (carbides)")
put(B,1,[78,81],reason="s-block compound detail; covered by inorganic-chemistry ch3 s-block compound registers")
put(B,1,[84,85],reason="noble-gas property; covered by inorganic-chemistry ch5 'The Noble Honesty'")
put(B,1,[97],reason="covered by foundation-chemistry ch6 'The Salt Census'")
put(B,1,[103,104,112],reason="group-14 compounds; covered by inorganic-chemistry ch4 'The Carbon Family'")
put(B,1,[121],reason="niche spiro nomenclature; covered by organic-chemistry ch1 'The IUPAC Discipline'")
put(B,1,[122],reason="covered by organic-chemistry ch5 'The Grignard Power'")
put(B,1,[123,125,126,133,134,135],reason="drug register detail; covered by organic-chemistry ch11 'The Therapeutic Classes' + 'Chemistry in Everyday Life' registers")
put(B,1,[137],'move','environmental-chemistry',2,'', "air-pollution topic; belongs in environmental-chemistry ch2 'The Air-Pollution Chemistry'")
put(B,1,[140],reason="catalyst detail; covered by organic-chemistry ch3 hydrogenation content")
put(B,1,[142],reason="covered by organic-chemistry ch7 reduction content")
put(B,1,[150,153,158],reason="stereochemistry detail; covered by organic-chemistry ch1 'Stereoisomers: Enantiomers, Diastereomers and Meso'")
put(B,1,[154],reason="OCR-mangled stereochemistry fragment; covered by organic-chemistry ch1 stereochemistry")
put(B,1,[159,163,164],reason=VG)
put(B,1,[161],reason="covered by organic-chemistry ch6 'Alcohols, Phenols and Ethers'")
put(B,1,[162],reason="trivia; no lesson content")
put(B,1,[165],reason="covered by organic-chemistry ch6 'The Williamson Synthesis'")
put(B,1,[166,180,181,182,183,185,197],reason="named organic rearrangement; covered by organic-chemistry ch7 'The Named-Reaction Ledger'")
put(B,1,[190],'move','industrial-chemistry',7,'', "coal is a fuel; belongs in industrial-chemistry ch7 'The Fuels-and-Energy Register'")
put(B,1,[195],reason="covered by organic-chemistry ch7/ch8 carbonyl/ester named reactions")
put(B,1,[209],reason=VG)
put(B,1,[211,215,216,218,219,220,221],reason=J2)
put(B,1,[224],reason="covered by organic-chemistry ch11 'The Addition and Condensation Polymer Families'")
put(B,1,[228],reason="covered by organic-chemistry ch11 commodity polymer register")
put(B,1,[230],reason=VG)
put(B,1,[235],reason="covered by organic-chemistry ch4 'The EAS Census'")
put(B,1,[237],reason=VG)
put(B,1,[241,242],reason="covered by organic-chemistry ch10 'The Carbohydrate Register'")
put(B,1,[244],reason="covered by organic-chemistry ch10 'The Protein First Pass'")
put(B,1,[248],reason="covered by organic-chemistry ch10 'Vitamins and Lipids'")
put(B,1,[251],reason="covered by physical-chemistry ch7 'The Crystal Systems and Close Packing'")
put(B,1,[253,254,255],reason="crystallography; covered by physical-chemistry ch7 'The Unit Cell Grammar'")
put(B,1,[256,257,258],reason="covered by physical-chemistry ch7 'The Defect Census'/solid-state magnetism")
put(B,1,[263],reason="maths skill; foundation-mathematics (authored) owns it; no chemistry home")
put(B,1,[264],reason=J1)
put(B,1,[265],reason=VG)
put(B,1,[267],reason="covered by inorganic nomenclature registers (inorganic-chemistry ch2/ch7 naming)")
put(B,1,[270],reason=J2)
put(B,1,[271],reason="covered by foundation-chemistry ch2 'The Mole Ledger'")
put(B,1,[280],'move','foundation-chemistry',3,'', "cathode-ray properties; belongs in foundation-chemistry ch3 'Atomic Structure at First Pass'")
put(B,1,[281],'move','foundation-chemistry',3,'', "discovery of the neutron; belongs in foundation-chemistry ch3 'The Model Ladder'")
put(B,1,[285],'move','foundation-chemistry',3,'', "Heisenberg uncertainty; belongs in foundation-chemistry ch3 'Atomic Structure at First Pass'")
put(B,1,[286],reason=VG)
put(B,1,[289],reason="covered by physical-chemistry ch6 'Catalysis Register'")
put(B,1,[290,291],reason="covered by physical-chemistry ch9 'The Colloid Census'")
put(B,1,[292,293,294],reason=J1)
put(B,1,[301,302,304,306,308,312,313,319,322],reason=J2)
put(B,1,[331,335,338,339,342,343,344,345,348,349,351,352,353,355,357,362],reason=J1)
put(B,1,[359,361],reason="pericyclic; covered by organic-chemistry ch4 'The Pericyclic Reactions and Organic Photochemistry'")
put(B,1,[365],reason="covered by physical-chemistry ch7 'The Solid State'")
put(B,1,[375],reason=VG)
put(B,1,[376,377],reason="covered by inorganic-chemistry ch7 geometry/CFSE registers")
put(B,1,[378],reason="covered by inorganic-chemistry ch7 'The Ligand Field'")
put(B,1,[381],reason="covered by inorganic-chemistry ch7 'The Organometallic Register' + organic-chemistry ch6 crown ethers")
put(B,1,[384,385],reason=VG)
put(B,1,[394,395],reason="covered by inorganic-chemistry ch4 silicon/silicate compounds")
put(B,1,[412],reason="covered by inorganic-chemistry ch5 'The Oxygen Family'")
put(B,1,[420],reason=J1)
put(B,1,[426],reason="covered by inorganic-chemistry ch6 'The Transition Register'")
put(B,1,[430],'move','foundation-chemistry',3,'', "the nucleus; belongs in foundation-chemistry ch3 'Atomic Structure at First Pass'")
put(B,1,[431],'move','foundation-chemistry',3,'The Nature of the Nucleus', "the nucleus; belongs in foundation-chemistry ch3; title was OCR-truncated")
put(B,1,[435],reason=J3)

# fc ch2
put(B,2,5,'keep',reason="authored skeleton lesson (reaction types and equation balancing; ch2 stoichiometry context)")
put(B,2,[8,9,10,11],reason="Cengage module TOC line; covered by ch2 skeleton + physical-chemistry ch6 'Chemical Kinetics'/ch3 'Chemical Equilibrium'")
put(B,2,[15,16],reason=J1)
put(B,2,[19],reason="covered by inorganic-chemistry ch10 'The Nuclear Register'")
put(B,2,[20,23,25,41,42,43],reason="covered by inorganic-chemistry ch1 'The Trend Census'")
put(B,2,[26],reason="covered by organic-chemistry ch1 resonance/effects register")
put(B,2,[27],reason="covered by inorganic-chemistry ch2 VBT treatment")
put(B,2,[28],reason="covered by foundation-chemistry ch5 'The Covalent Ledger'")
put(B,2,[29],reason="covered by inorganic-chemistry ch2 'The Hybridisation Engine'")
put(B,2,[31,32],reason="covered by inorganic-chemistry ch2 'The MO Taster'")
put(B,2,[33],reason=VG)
put(B,2,[35],reason="covered by inorganic-chemistry ch3 'Water, Heavy Water and Hydrogen Peroxide'")
put(B,2,[36],reason=VG)
put(B,2,[39],reason="covered by foundation-chemistry ch6 'The Salt Census'")
put(B,2,[40],reason="covered by physical-chemistry ch1 'The Enthalpy Ledger'")
put(B,2,[44,45,47,48],reason="coordination detail; covered by inorganic-chemistry ch7")
put(B,2,[49,50],reason=VG)
put(B,2,[52],reason="covered by organic-chemistry ch8 named reactions")
put(B,2,[54,55,56],reason="covered by organic-chemistry ch11 'Soaps, Detergents and the Cleansing Action'")
put(B,2,[57],reason="covered by environmental-chemistry ch3 'The Greenhouse and Climate Chemistry'")
put(B,2,[62],reason="covered by organic-chemistry ch6 'The Alcohol Census'")
put(B,2,[63],reason="covered by organic-chemistry ch8 'The Derivative Ladder'")
put(B,2,[65],reason="covered by organic-chemistry ch4 'The EAS Census'")
put(B,2,[69,70],reason="covered by organic-chemistry ch4/ch7 named-reaction registers")
put(B,2,[75,76],reason="covered by organic-chemistry ch7 'The Carbonyl Register'")
put(B,2,[77,79,81,82,86,87,88,91,92,93,95,96,97,98,112,113,114,116,118,119,121,122,125,126],reason="named organic reaction; covered by organic-chemistry ch5/ch7 named-reaction registers")
put(B,2,[99],reason="covered by organic-chemistry ch1 'Reactive Intermediates'")
put(B,2,[102],reason="covered by organic-chemistry ch2 'The Alkanes'")
put(B,2,[103],reason="covered by organic-chemistry ch3 'The Addition Census'")
put(B,2,[104],reason="covered by organic-chemistry ch8 'The Acids and Their Derivatives'")
put(B,2,[110],reason="covered by organic-chemistry ch3 'The Addition Census'")
put(B,2,[115],reason="covered by organic-chemistry ch5 'The SN Pair'")
put(B,2,[128,129,131,132,133],reason="solid-state structures; covered by physical-chemistry ch7 'The Unit Cell Grammar'/'The Cubic Arithmetic'")
put(B,2,135,'keep',reason="derived SI units; fits ch2 'The Measurement Craft and the Mole' (The Unit Discipline)")
put(B,2,[138],reason="covered by foundation-chemistry ch2 concentration-unit lesson")
put(B,2,[140,141,142],reason="covered by foundation-chemistry ch2 'The Reaction Census: Types and Balancing'")
put(B,2,[145,146],reason="covered by physical-chemistry ch5 'Electrochemistry (the fold)'")
put(B,2,[148],reason="covered by inorganic-chemistry ch10 'The Nuclear Register'")
put(B,2,[149,150],reason="covered by physical-chemistry ch6 'The Rate-Law Census'")
put(B,2,[151],reason="physics topic (kinetic-theory equipartition); no chemistry home in the registry")
put(B,2,[152,153],reason="covered by physical-chemistry ch9 'Physisorption against Chemisorption'/'Emulsions, Surfactants and Micelles'")
put(B,2,[155],reason="covered by physical-chemistry ch1/9 vapour-pressure treatments")
put(B,2,[158,160,161],reason="covered by physical-chemistry ch1 'The Enthalpy Ledger'")
put(B,2,[162],reason="covered by physical-chemistry ch1 'Entropy's Direction'")
put(B,2,[163],reason=J1)
put(B,2,[164,165],reason="covered by physical-chemistry ch1 thermodynamics registers")
put(B,2,[167],reason="covered by physical-chemistry ch4 'Buffers and Henderson'")
put(B,2,[169],reason="covered by analytical-chemistry ch3 'Acid-Base Curves'")
put(B,2,[178],reason="covered by foundation-chemistry ch2 'The Reaction Census: Types and Balancing'")
put(B,2,[179,180,182,183,187,189],reason=J1)
put(B,2,[185],reason="covered by physical-chemistry ch4 'Buffers and Henderson'")
put(B,2,[191,195,198,199,200,201,203,204,209],reason=J1)
put(B,2,[212],reason="covered by organic-chemistry ch7 carbonyl/enolate content")
put(B,2,[214],reason="covered by analytical-chemistry ch8 'The NMR Preview'")
put(B,2,[218],reason=J1)
put(B,2,[221],reason="covered by foundation-chemistry ch3 'The Electron's Address'")
put(B,2,[225],reason="covered by physical-chemistry ch7 'The Defect Census'")
put(B,2,[227],reason="covered by inorganic-chemistry ch7 'Werner to Nomenclature'")
put(B,2,[228,229,230],reason="s/p-block reactivity; covered by inorganic-chemistry ch3/ch4")
put(B,2,[231],reason="covered by inorganic-chemistry ch4 boron-family compounds")
put(B,2,[235],reason=J1)
put(B,2,[236],reason="covered by biochemistry ch10 'The Bioenergetics Doorway'")
put(B,2,[238],reason=J1)

# fc ch3
put(B,3,0,'keep',reason="authored skeleton lesson (Dalton-to-Bohr model ladder)")
put(B,3,5,'keep',reason="Bohr model and its limits; core ch3 content")
put(B,3,7,'keep',reason="shielding effect; standard first-pass atomic-structure content in ch3")
put(B,3,[11,12],reason="covered by organic-chemistry ch1 'Stereoisomers: Enantiomers, Diastereomers and Meso'")
put(B,3,20,'keep',reason="atomic mass; basic atomic-structure quantity in ch3")
put(B,3,[21],reason="covered by ch3 'Isotopes Counted'")
put(B,3,[22],reason="covered by foundation-chemistry ch2 'The Mole Ledger'")
put(B,3,23,'keep',reason="discovery of the electron; core ch3 model-ladder content")
put(B,3,[25,26,27],reason="subsumed by ch3 'The Model Ladder' and 'The Bohr Model Worked and Its Limits'")
put(B,3,28,'keep',reason="half-filled/filled sub-shell stability; standard ch3 electronic-configuration content")
put(B,3,[31],reason="covered by inorganic-chemistry ch10 'The Nuclear Register'")
put(B,3,[32],reason=J1)
put(B,3,[33],reason=J1)
put(B,3,[34,35],reason="covered by analytical-chemistry ch8 'The NMR Preview'")
put(B,3,[36],reason="covered by organic-chemistry ch4 'The Pericyclic Reactions and Organic Photochemistry'")

# fc ch4
put(B,4,0,'keep',reason="authored skeleton lesson (history of the periodic map)")
put(B,4,[6],reason="covered by ch4 'The First Trends'")
put(B,4,[8],reason="covered by ch4 'The First Trends'/'The Family Census'")
put(B,4,[11],reason=VG)
put(B,4,[12,13],reason=J2)
put(B,4,[14,15],reason=J2)
put(B,4,[16],reason=J3)
put(B,4,[21,22],reason=J1)
# fc ch5
put(B,5,3,'keep',reason="authored skeleton lesson (hydrogen bonding)")
put(B,5,7,'keep',reason="Lewis symbols; first-pass bonding content in ch5")
put(B,5,11,'keep',reason="He2 non-existence; octet/covalent-bond discussion in ch5")
put(B,5,[15],reason="covered by physical-chemistry ch4 'Ionic Equilibria'")
# fc ch6
put(B,6,[5],reason="covered by analytical-chemistry ch6 'The Partition Principle'")
put(B,6,[23,24],reason=VG)
put(B,6,[28,29],reason="covered by inorganic-chemistry ch2 'The MO Taster'")
put(B,6,[35],reason="covered by ch6 'The Salt Census'")
# fc ch7
put(B,7,[5],reason="covered by organic-chemistry ch7 'The Reduction Register'/named reactions")
put(B,7,[11],reason="covered by ch7 'Boyle and Charles'")
put(B,7,[12],reason=J2)
# fc ch8
put(B,8,2,'keep',reason="water hardness treatment; core ch8 'Water and Solutions' content")
put(B,8,5,'move','foundation-chemistry',3,'', "screening-effect magnitude; belongs in foundation-chemistry ch3 atomic structure")
put(B,8,[7,8,9],reason="anomalous first members; covered by inorganic-chemistry ch1 'The Anomaly Registers'")
put(B,8,20,'move','foundation-chemistry',3,'', "photoelectric effect; needed for the ch3 quantum-atomic story")
put(B,8,[39],reason=VG)
put(B,8,[45],reason=J1)
put(B,8,[46],reason="covered by organic-chemistry ch4 'The Orientation Register'")
# fc ch10
put(B,10,[5],reason=VG)
put(B,10,[6,15],reason="covered by inorganic-chemistry ch10 'The Systematic Scheme'")
put(B,10,[11],reason="covered by ch10 'The First Titration'")
put(B,10,[12],reason=VG)
put(B,10,[13],reason="covered by physical-chemistry ch6 kinetics methods")
put(B,10,[17],reason=J1)
put(B,10,[19],reason=VG)

# ================= PHYSICAL-CHEMISTRY =================
B='physical-chemistry'
put(B,1,[4],reason="covered by physical-chemistry ch1 'The Enthalpy Ledger'")
put(B,1,[8],reason="covered by physical-chemistry ch1 skeleton")
put(B,1,[9],reason="native-state occurrence; covered by inorganic-chemistry ch1 occurrence summary")
put(B,1,[19],reason=VG)
put(B,1,[22],reason="covered by physical-chemistry ch9 'Real Gases Again'")
put(B,1,[27],reason="covered by analytical-chemistry ch3 'Acid-Base Curves'")
put(B,1,[38,40,41,43,44],reason=J1)
put(B,1,[48],reason="covered by inorganic-chemistry ch4 silicates")
put(B,2,[5],reason="covered by organic-chemistry ch1 'Stereoisomers'")
put(B,2,[6],reason="covered by foundation-chemistry ch2 'The Mole Ledger'")
put(B,2,[7],reason="covered by physical-chemistry ch5 'The EMF Ledger'")
put(B,2,[11],reason=VG)
put(B,4,[7],reason=VG)
put(B,4,[10,11,12],reason="covered by physical-chemistry ch4 'Buffers and Henderson'")
put(B,5,4,'keep',reason="batteries, fuel cells and corrosion; core electrochemistry content missing from ch5 skeleton")
put(B,5,[8,10],reason="covered by physical-chemistry ch5 'The Cell Architecture'")
put(B,5,[12,13],reason="covered by the kept 'Batteries, Fuel Cells and Corrosion' lesson")
put(B,6,[8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],reason="element-uses register; covered by the inorganic-chemistry family registers (ch3 s-block, ch4/5 p-block, ch6 d- and f-block)")
put(B,6,[25],reason="covered by inorganic-chemistry ch7 'Werner to Nomenclature'")
put(B,6,[26],reason="covered by physical-chemistry ch6 'Catalysis Register'")
put(B,6,[28],reason="covered by organic-chemistry ch7 carbonyl/enol content")
put(B,6,[34,35],reason=J1)
put(B,6,[36],reason="covered by physical-chemistry ch7 'The Solid State'")
put(B,6,[45,46],reason=J1)
put(B,6,[47],reason="covered by inorganic-chemistry ch10 'The Nuclear Register'")
put(B,6,[48,50,51,64],reason=J1)
put(B,6,[57,58,59,60,61,62,63],reason="element-uses register; covered by inorganic-chemistry family registers")
put(B,7,4,'keep',reason="ionic radii and radius ratios; core solid-state content in ch7")
put(B,7,5,'keep',reason="crystal systems and close packing; core solid-state content in ch7")
put(B,7,[10,11],reason="covered by physical-chemistry ch7 'The Cubic Arithmetic'")
put(B,7,[13],reason="covered by foundation-chemistry ch3 'The Model Ladder'")
put(B,7,[14],reason="covered by physical-chemistry ch7 'The Unit Cell Grammar'")
put(B,7,[17],reason="covered by physical-chemistry ch7 'The Doping Preview'")
put(B,8,[5,6],reason="covered by inorganic-chemistry ch1 'The Trend Census'")
put(B,8,[7,8],reason="covered by organic-chemistry ch1 'The IUPAC Discipline'")
put(B,8,[9],reason="covered by foundation-chemistry ch2 'The Unit Discipline'")
put(B,8,[10],reason="covered by foundation-chemistry ch2 'The Mole Ledger'")
put(B,9,7,'keep',reason="intermolecular forces and the liquid state; fits ch9 gaseous/surface registers")
put(B,9,8,'keep',reason="vapour pressure, surface tension and viscosity; fits ch9 surface register")
put(B,9,9,'keep',reason="surfaces and interfaces; core ch9 surface-register content")
put(B,9,[10],reason="covered by inorganic-chemistry ch5 'The Noble Honesty'")
put(B,9,[11],reason="covered by physical-chemistry ch8 colligative registers")
put(B,9,[13,14,15,16,19,20,21,22],reason="covered by physical-chemistry ch9 surface/colloid registers")
put(B,9,[25],reason=J2)
put(B,10,[6],reason="covered by physical-chemistry ch10 'The EM Register Read'")
put(B,10,[7,8],reason=VG)
put(B,11,[4],reason="covered by foundation-chemistry ch2 'First Stoichiometry'")
put(B,12,[5],reason=VG)
put(B,12,[8],reason=J1)

# ================= ORGANIC-CHEMISTRY =================
B='organic-chemistry'
put(B,1,[7],reason="combustion analysis; covered by foundation-chemistry ch2 'First Stoichiometry' and ch11 purification/characterisation")
put(B,1,9,'keep',reason="nucleophilicity/electrophilicity reactivity map; authored-style ch1 lesson")
put(B,1,[19],reason=VG)
put(B,1,[30],reason=VG)
put(B,1,[31],reason="covered by ch1 'Stereoisomers: Enantiomers, Diastereomers and Meso'")
put(B,1,[42],reason="covered by ch1 'The Effect Census'")
put(B,1,[47],reason="covered by ch1 'Reactive Intermediates: Carbocations, Carbanions and Radicals'")
put(B,1,[71],reason="covered by inorganic-chemistry ch3 'The Hydride Register'")
put(B,2,[5],reason=J1)
put(B,2,[10],reason="covered by organic-chemistry ch7 'The Addition Grammar'")
put(B,3,[8],reason="covered by inorganic-chemistry ch1 occurrence registers")
put(B,3,[9],reason="covered by inorganic-chemistry ch1 periodicity")
put(B,3,[13],reason="covered by inorganic-chemistry ch4 'The Boron Family'")
put(B,3,[22],reason="covered by organic-chemistry ch7 'The Addition Grammar'")
put(B,3,[36],reason=J1)
put(B,3,[38,39],reason="covered by physical-chemistry ch7 'The Defect Census'")
put(B,3,[42],reason=J1)
put(B,4,[11],reason="covered by foundation-chemistry ch6 'The Definitions'")
put(B,4,[19],reason="covered by ch4 'The EAS Census'")
put(B,4,[27,28],reason="covered by ch4 'The Heterocyclic Register' and pericyclic lesson")
put(B,5,[7],reason="covered by ch1 'Stereoisomers'")
put(B,5,[22],reason=J1)
put(B,5,[25],reason="covered by ch5 'Fittig, Wurtz-Fittig and Nucleophilic Aromatic Substitution'")
put(B,5,[28],reason=VG)
put(B,5,[29],reason=J2)
put(B,6,[5],reason="covered by inorganic-chemistry ch3 s-block compound registers")
put(B,6,[8],reason="covered by inorganic-chemistry ch8 'The Ion-Transport Register'")
put(B,6,[27,28,29,30],reason="sodium-salt register; covered by inorganic-chemistry ch3 'The Sodium and Calcium Compound Industries'")
put(B,7,[7,9],reason="covered by inorganic-chemistry ch3 s-block compound registers")
put(B,7,[21,24,31],reason="covered by ch7 'The Named-Reaction Ledger'/'The Reduction Register'")
put(B,7,[43],reason="covered by ch3 alkyne preparation")
put(B,7,[49],reason=VG)
put(B,8,[8],reason="covered by inorganic-chemistry ch3 'Water, Heavy Water and Hydrogen Peroxide'")
put(B,9,[9],reason="covered by inorganic-chemistry ch7")
put(B,9,[13,14],reason="covered by ch1 'The IUPAC Discipline'")
put(B,9,[20],reason="covered by ch1 stereoisomerism")
put(B,9,[27],reason="covered by ch9 'The Diazonium Crafts: Sandmeyer and Azo Coupling'")
put(B,9,[30,31],reason="covered by foundation-chemistry ch2 'The Mole Ledger'")
put(B,9,[33],reason="covered by analytical-chemistry ch8 'The NMR Preview'")
put(B,10,[6],reason=J1)
put(B,10,[8],reason="covered by inorganic-chemistry ch4 silicates")
put(B,11,1,'keep',reason="authored cross-reference lesson (organic book's pointer to the industrial polymer register)")
put(B,11,5,'keep',reason="authored-style polymer-family lesson per ch11 summary ('polymers school register cross-referenced to the industrial book')")
put(B,11,8,'keep',reason="soaps/detergents/cleansing; NCERT Chemistry-in-Everyday-Life content owned by ch11")
put(B,11,9,'keep',reason="therapeutic classes; NCERT Chemistry-in-Everyday-Life content owned by ch11")
put(B,11,[15,16,17,18,19,20,21,22],reason="granular drug/sweetener register item; covered by ch11 'Chemistry in Everyday Life: The Drug and Sweetener Registers' and 'The Therapeutic Classes'")
put(B,11,[23],reason="covered by ch9 'The Nitro Story'")
put(B,11,[25,26],reason="covered by ch7 'The Named-Reaction Ledger'")
put(B,11,[28],reason=J1)

# ================= INORGANIC-CHEMISTRY =================
B='inorganic-chemistry'
put(B,1,3,'keep',reason="diagonal relation; core periodicity-at-depth content in ch1")
put(B,1,6,'keep',reason="crustal abundance; occurrence context of ch1")
put(B,1,[8],reason="covered by ch1 'Summary of Occurrence and Extraction of Few Elements'")
put(B,1,[12],reason="covered by ch1 'The Diagonal Relation'")
put(B,1,[14],reason="covered by ch1 'The Trend Census'")
put(B,1,[16,17],reason=VG)
put(B,1,[24,25],reason="covered by ch1 occurrence summary")
put(B,1,[26],reason=VG)
put(B,2,[6],reason="covered by foundation-chemistry ch5 'The Covalent Ledger' and ch2 'Orbital Overlap and the Covalent Bond'")
put(B,2,[7],reason="covered by ch2 'The MO Taster'")
put(B,2,[13],reason="materials-engineering topic; no inorganic-chemistry chapter home (building-materials owns construction materials)")
put(B,2,[14],reason="covered by ch2 'The Bonding Models: Ionic, Covalent and Metallic'")
put(B,2,[15,25],reason="covered by ch2 'The Polarity Register'")
put(B,2,[17],reason="covered by ch2 'The VSEPR Census'")
put(B,2,[22,23,24],reason="covered by inorganic-chemistry ch7 'Werner to Nomenclature'/isomerism census")
put(B,2,[29,30],reason=J1)
put(B,3,5,'keep',reason="sodium/calcium compound industries; authored-style ch3 lesson")
put(B,3,[10],reason="covered by ch3 'The Hydride Register: Ionic, Covalent and Interstitial'")
put(B,3,[22,24],reason="covered by ch3 'Some Important Compounds of Magnesium and Calcium'")
put(B,3,[25],reason="covered by ch8 'The Ion-Transport Register'")
put(B,3,[37],reason="covered by physical-chemistry ch7 'The Defect Census'")
put(B,3,[39],reason="covered by ch3 'The Hydride Register' (interstitial compounds)")
put(B,3,[42],reason="covered by ch1 occurrence summary")
put(B,4,8,'keep',reason="phosphorus allotropes and halides; authored-style p-block lesson")
put(B,4,[12],reason="covered by ch4 'The Nitrogen Compounds: Ammonia, Nitric Acid and the Phosphines'")
put(B,4,[18],reason="covered by ch4 'The First-Member Honesty'")
put(B,4,[34],reason=J1)
put(B,4,[40],reason="covered by ch4 'The Phosphorus Register: Allotropes and Halides'")
put(B,5,3,'keep',reason="authored-style p-block consolidating recap in ch5")
put(B,7,[6],reason="covered by ch7 'The Organometallic Register'")
put(B,7,[10],reason="covered by ch7 'VBT against CFT' + 'The Ligand Field'")
put(B,7,[11],reason="covered by ch7 'The Stability Ledger'")
put(B,7,[12],reason="covered by ch7 'Werner to Nomenclature'")
put(B,7,[13,14],reason="covered by ch7 'VBT against CFT'")
put(B,7,[19],reason="organic named reaction; covered by organic-chemistry ch7")
put(B,7,[20],reason="covered by physical-chemistry ch6 'Arrhenius's Activation'")
put(B,7,[21],reason="covered by physical-chemistry ch4 'Solubility Product'")
put(B,7,[22],reason=J1)
put(B,8,[5],reason="covered by ch8 'The Ion-Transport Register'")
put(B,9,5,'keep',reason="cyanide process and refining; authored-style metallurgy lesson")
put(B,9,6,'keep',reason="extraction of Al, Zn and Fe; core metallurgical-register content")
put(B,9,7,'keep',reason="extraction of Au, Ag and Cu; core metallurgical-register content")
put(B,9,[10,20],reason="covered by ch9 'The Conversion Registers'")
put(B,9,[11],reason="covered by ch9 'The Refining Census'")
put(B,9,[24,25],reason="thermodynamic processes; covered by physical-chemistry ch1")
put(B,9,[26],reason="covered by ch9 'The Metallurgical Principles'")
put(B,9,27,'move','industrial-chemistry',2,'', "Leblanc soda process; belongs in industrial-chemistry ch2 'The Acid-and-Alkali Industries'")
put(B,9,[28],reason="covered by ch9 'The Conversion Registers'")
put(B,9,[29],reason=J1)
put(B,9,30,'move','industrial-chemistry',3,'', "cyanamide nitrogen-fixation process; belongs in industrial-chemistry ch3 'The Fertilizer Industries'")

# ================= ANALYTICAL-CHEMISTRY =================
B='analytical-chemistry'
put(B,1,[4],reason="covered by physical-chemistry ch8 'The Abnormal Register' (dissociation/association)")
put(B,1,[6],reason=J1)
put(B,2,4,'keep',reason="ozone estimation; classical quantitative craft in ch2")
put(B,3,9,'keep',reason="end point vs equivalence point; core titrimetric content in ch3")
put(B,5,3,'keep',reason="conductance; authored-style electroanalytical lesson in ch5")
put(B,8,1,'keep',reason="NMR preview; authored-style analytical-doorway lesson in ch8")

# ---------------- emit misplaced ----------------
missing = [e for e in mis if (e['book'], e['chapter'], e['idx']) not in D]
if missing:
    print("MISSING misAdjudicate decisions:", len(missing))
    for e in missing[:80]:
        print(' ', e['book'], e['chapter'], e['idx'], repr(e['title'][:70]))
    sys.exit(1)

misplaced = []
for e in mis:
    act, tb, tc, nt, rs = D[(e['book'], e['chapter'], e['idx'])]
    misplaced.append({"book": e['book'], "chapter": e['chapter'], "title": e['title'],
                      "action": act, "targetBook": tb, "targetChapter": tc if act=='move' else 0,
                      "newTitle": nt, "reason": rs})

# ---------------- autoReview ----------------
def V(book, ch, title, verdict, action, tb='', tc=0, nt='', reason=''):
    return {"book":book,"chapter":ch,"title":title,"verdict":verdict,"action":action,
            "targetBook":tb,"targetChapter":tc,"newTitle":nt,"reason":reason}
autoReview = []
FC='foundation-chemistry'; PC='physical-chemistry'; OC='organic-chemistry'; IC='inorganic-chemistry'; AC='analytical-chemistry'
autoReview += [
 V(FC,1,"The Classification","veto","keep",reason="authored skeleton lesson of ch1 (matter classified); removal is a clear error"),
 V(FC,1,"The Particulate Nature of Matter","veto","keep",reason="authored skeleton lesson (particle picture of matter)"),
 V(IC,2,"From Bonding Models to Materials","veto","keep",reason="authored-style inorganic bonding-to-materials lesson; correct book+chapter"),
 V(IC,3,"Ortho- and Para-hydrogen (Spin Isomers)","veto","keep",reason="real hydrogen-chemistry lesson; inorganic-chemistry ch3 is the correct home (the foundation-chemistry duplicate is removed instead)"),
 V(IC,2,"The Molecular-Structure Register","veto","keep",reason="authored-style molecular-structure lesson of ch2; molecular-biology is a nonsense target"),
 V(IC,2,"The Bonding Models: Ionic, Covalent and Metallic","veto","keep",reason="authored-style lesson; bonding models at inorganic depth belong in ch2 (foundation ch5 keeps first-pass 'Metallic Bonding')"),
 V(IC,1,"Zn, Cd and Hg Not Regarded as Transition Elements","veto","keep",reason="periodicity/classification lesson; correct home is inorganic-chemistry ch1"),
 V(IC,4,"The Main-Group Element Census","veto","keep",reason="authored-style p-block census; correct chapter"),
 V(IC,3,"Water, Heavy Water and Hydrogen Peroxide","veto","keep",reason="hydrogen's compounds; inorganic-chemistry ch3 is the correct home, not foundation-biology"),
 V(IC,10,"Basic principles of inorganic qualitative analysis for ions specified in factual knowledge, flame tests; identification of Ag+, Ba2+, Fe3+, Cu2+, Cl-, CO32-, SO42","veto","keep",reason="qualitative analysis is inorganic-chemistry ch10's core (The Systematic Scheme); physical-chemistry ch3 is a wrong target"),
 V(IC,10,"Analysis of Group I (Ag+, Pb2+, Hg2^2+)","veto","keep",reason="cation-group analysis; ch10 'The Cation Groups and the Anion Tests'"),
 V(PC,9,"Real Gases Again","veto","keep",reason="authored core lesson of ch9 'The Gaseous and Surface Registers'; thermodynamics ch6 is a wrong target"),
 V(PC,9,"The Kinetic Theory and the Molecular Speeds","veto","keep",reason="gas kinetic theory belongs in physical-chemistry ch9 with the gas register"),
 V(PC,9,"Maxwell's Distribution of Speeds","veto","keep",reason="Maxwell-Boltzmann speed distribution belongs with gas kinetics (physical-chemistry ch9), not EM waves"),
 V(PC,11,"The Two Laws","veto","keep",reason="the two laws of photochemistry; authored lesson of ch11 (move to ch8 solutions is a token artifact)"),
 V(OC,11,"Chemistry in Everyday Life: The Drug and Sweetener Registers","veto","keep",reason="authored skeleton lesson (NCERT Chemistry in Everyday Life); foundation-biology is a wrong target"),
 V(OC,11,"Experimental Techniques in Organic Chemistry","veto","keep",reason="fits ch11 'The Advanced Practical Crafts: Synthesis to Characterisation'; archaeology is a nonsense target"),
 V(AC,3,"Redox titrations (permanganometric and iodometric); iodometry (reaction of thiosulfate and iodine)","veto","keep",reason="redox titrimetry is analytical-chemistry ch3 'The Redox Registers' core; physical-chemistry ch1 is a wrong target"),
 V(AC,8,"The Solid Characterisation","veto","keep",reason="solid characterisation fits ch8 'The Analytical Doorway'; solid-state-physics is a wrong target"),
]
autoReview += [
 V(FC,1,"Some Basic Concepts in Chemistry","amend","move",FC,2,"","NCERT-style basic-concepts/mole lesson; home is foundation-chemistry ch2 'The Measurement Craft and the Mole', not foundation-physics"),
 V(FC,1,"Interdisciplinary topics","amend","remove",reason="vague module header; moving it to contemporary-dance is a token-score artifact"),
 V(FC,1,"Medicinal chemistry","amend","remove",reason="drug registers are covered by organic-chemistry ch11 'The Therapeutic Classes'; economic-botany is a wrong target"),
 V(FC,1,"Limitations of Bronsted Concept","amend","move",FC,6,"","acid-base concept; home is foundation-chemistry ch6 'Acids, Bases and Salts'"),
 V(FC,1,"Concept of Hybridisation","amend","move",FC,5,"","hybridisation at first pass; home is foundation-chemistry ch5 'Chemical Bonding at First Pass'"),
 V(FC,1,"Comparison Between AO’s and MO’s","amend","remove",reason="covered by inorganic-chemistry ch2 'The MO Taster'; film-studies is a nonsense target"),
 V(FC,1,"Comparison Between σ and π MO’s","amend","remove",reason="covered by inorganic-chemistry ch2 'The MO Taster'; film-studies is a nonsense target"),
 V(FC,1,"General Introduction","amend","remove",reason="vague header; microeconomics is a nonsense target"),
 V(FC,1,"General Characteristics","amend","remove",reason="vague fragment; physical-chemistry ch1 is not a home"),
 V(FC,1,"Lead","amend","move",IC,4,"","the metal lead; home is inorganic-chemistry ch4 'The p-Block: First Families' (group 14), not control-systems"),
 V(FC,1,"Neurotransmitters","amend","remove",reason="no chemistry home in the registry; neuroactive drugs are covered by organic-chemistry ch11; plant-physiology is a wrong target"),
 V(FC,1,"Antibiotics","amend","remove",reason="covered by organic-chemistry ch11 'The Therapeutic Classes: Antacids to Antimicrobials'; evolution is a nonsense target"),
 V(FC,1,"Salient Features","amend","remove",reason="vague fragment; sociology is a nonsense target"),
 V(FC,1,"Examples","amend","remove",reason="vague fragment; machine-design is a nonsense target"),
 V(FC,1,"Classification Based on Source","amend","remove",reason="polymer-classification fragment; covered by organic-chemistry ch11 polymer families; environmental-engineering is a wrong target"),
 V(FC,1,"Vision","amend","move",PC,11,"","vision is the classic photochemistry example; home is physical-chemistry ch11 'Photochemistry and the Photophysical Register', not computer-vision"),
 V(FC,1,"An Introduction","amend","remove",reason="vague header; microeconomics is a nonsense target"),
 V(FC,1,"Studies","amend","remove",reason="vague fragment; ethics is a nonsense target"),
 V(FC,1,"A1.2 Logarithms A4","amend","remove",reason="maths appendix code; ear-training is a nonsense target"),
 V(FC,1,"TO THE STUDENT","amend","remove",reason="front-matter; film-studies is a nonsense target"),
 V(FC,1,"Resource section","amend","remove",reason="back-matter; water-resources-engineering is a nonsense target"),
 V(FC,1,"PART ONE THEORETICAL CONCEPTS AND HYDROGEN","amend","remove",reason="TOC header; foundation-physics is a nonsense target"),
 V(FC,1,"F centres","amend","move",PC,7,"","colour-centre defects; home is physical-chemistry ch7 'The Defect Census', not strength-of-materials"),
 V(FC,1,"Π donors","amend","remove",reason="pi-donor ligands; covered by inorganic-chemistry ch7 'The Ligand Field'; environmental-studies is a wrong target"),
 V(FC,1,"Conclusion.29","amend","remove",reason="OCR fragment; law-and-legal-studies is a nonsense target"),
 V(FC,1,"Conclusion.81","amend","remove",reason="OCR fragment; law-and-legal-studies is a nonsense target"),
 V(FC,1,"Conclusion","amend","remove",reason="OCR fragment; law-and-legal-studies is a nonsense target"),
 V(FC,2,"Balancing equations, empirical formulae, mole concept and Avogadro constant, stoichiometric calculations, density, calculations with different concentration units","amend","remove",reason="concatenated TOC summary; covered by foundation-chemistry ch2 skeleton; political-science is a nonsense target"),
 V(FC,2,"Energy, heat and work, enthalpy and energy, heat capacity, Hess's law, Born-Haber cycle, standard formation enthalpies, solution, solvation and bond enthalpies","amend","remove",reason="concatenated TOC summary; covered by physical-chemistry ch1; foundation-physics ch6 is a wrong target"),
 V(FC,2,"Numerical Value Type","amend","remove",reason="exam-type junk; circuit-theory is a nonsense target"),
 V(FC,2,"Stereoselective or Regioselective Reactions","amend","remove",reason="organic concept covered by organic-chemistry ch3/ch5; physical-chemistry ch1 is a wrong target"),
 V(FC,2,"Number-Average, Weight-Average","amend","remove",reason="polymer MW fragment; covered by organic-chemistry ch11 polymer families; art-history is a nonsense target"),
 V(FC,2,"Calculation of the Density of a Metal by Using Unit Cell Dimensions","amend","remove",reason="covered by physical-chemistry ch7 'The Cubic Arithmetic'; foundation-biology is a nonsense target"),
 V(FC,2,"Applications of n-Type and p-Type Semiconductors","amend","remove",reason="covered by physical-chemistry ch7 'The Doping Preview'; structural-engineering is a nonsense target"),
 V(FC,2,"Important Features of Enthalpy","amend","remove",reason="covered by physical-chemistry ch1 'The Enthalpy Ledger'; geography is a nonsense target"),
 V(FC,2,"It can do less work than before. That is, its energy is decreased","amend","remove",reason="OCR fragment; foundation-physics is a nonsense target"),
 V(FC,2,"Figure 2A.1 (a) An open system can exchange matter and energy","amend","remove",reason="OCR fragment; microbiology is a nonsense target"),
 V(FC,2,"With its surroundings, but it cannot exchange matter. (c) An system does work has more energy than before the expansion","amend","remove",reason="OCR fragment; microbiology is a nonsense target"),
 V(FC,3,"The Nuclear Atom and Electronic Configurations","amend","remove",reason="covered by foundation-chemistry ch3 'The Electron's Address'; power-systems is a nonsense target"),
 V(FC,3,"Nucleons, isotopes, radioactive decay and nuclear reactions (alpha, beta, gamma)","amend","remove",reason="covered by inorganic-chemistry ch10 'The Nuclear Register'; waves-and-oscillations is a wrong target"),
 V(FC,5,"The Lewis theory","amend","remove",reason="covered by foundation-chemistry ch5 'The Covalent Ledger'; machine-design is a nonsense target"),
 V(FC,7,"Combined State","amend","remove",reason="vague fragment; plant-physiology is a nonsense target"),
 V(FC,8,"Effect of Temperature on ΔrG° of the Overall Reduction Process","amend","remove",reason="covered by inorganic-chemistry ch9 'The Ellingham Honesty'; foundation-physics ch7 is a wrong target"),
 V(FC,8,"Applications of Penetration Effect","amend","remove",reason="niche shielding fragment; covered by foundation-chemistry ch3; electronic-devices is a wrong target"),
 V(FC,8,"Global Warming and Greenhouse Effect","amend","remove",reason="covered by environmental-chemistry ch3 'The Greenhouse and Climate Chemistry'; heat-and-thermodynamics is a wrong target"),
 V(FC,8,"Explosion Temperature","amend","remove",reason="vague fragment; plant-pathology is a nonsense target"),
 V(PC,1,"Measuring Enthalpy: Calorimetry and Energy Cycles","amend","remove",reason="duplicate of physical-chemistry ch1 skeleton (Hess's Craft/Enthalpy Ledger); foundation-chemistry ch1 is a wrong target"),
 V(PC,1,"Variations of Radial Wave Function R","amend","move","quantum-chemistry",4,"","hydrogen-orbital radial functions; home is quantum-chemistry ch4 'The Hydrogen Atom's Orbitals', not foundation-physics"),
 V(PC,1,"Plots of Angular Wave Function 'ΘΦ'","amend","move","quantum-chemistry",4,"","hydrogen-orbital angular functions; home is quantum-chemistry ch4 'The Hydrogen Atom's Orbitals'"),
 V(PC,1,"A1.3 Graphing Functions A6","amend","remove",reason="maths appendix code; business-mathematics is a wrong target"),
 V(PC,1,"The twelfth edition of Atkins’ Physical Chemistry has been","amend","remove",reason="preface fragment; foundation-chemistry is a wrong target"),
 V(PC,2,"Values of the physical quantities mentioned in the text. (a) (b) (c)","amend","remove",reason="OCR fragment; foundation-physics is a wrong target"),
 V(PC,5,"Electrical Conductivity in Aqueous Solution","amend","remove",reason="covered by physical-chemistry ch5 'Kohlrausch and Faraday'; heat-transfer is a nonsense target"),
 V(PC,5,"Chad Stewart/Getty Images Chapter 18 | Electrochemistry","amend","remove",reason="photo-credit junk; industrial-chemistry is a wrong target"),
 V(PC,5,"Tising scientists, video tutorials that help to bring key equations ‘Impact on’ sections show how physical chemistry is applied in A link to comprehensive group theory tables can be found at","amend","remove",reason="preface fragment; foundation-chemistry is a wrong target"),
 V(PC,6,"Analysis of Zero Group (NH4+)","amend","remove",reason="qualitative analysis; covered by inorganic-chemistry ch10 'The Systematic Scheme'; advanced-mathematical-foundations is a nonsense target"),
 V(PC,6,"Baeyer's Strain Theory","amend","remove",reason="cycloalkane strain; covered by organic-chemistry ch2 'The Conformation Register'; strength-of-materials is a nonsense target"),
 V(PC,6,"Uses of Ethers","amend","move",OC,6,"","ether uses; home is organic-chemistry ch6 'Alcohols, Phenols and Ethers', not foundation-chemistry ch1"),
 V(PC,6,"You will find that the e-book offers a rich, dynamic learn- ‘A deeper look’ sections physical, and chemical concepts that you need to understand in","amend","remove",reason="e-book blurb; mechanics is a nonsense target"),
 V(PC,6,"FOCUS 19 Processes at solid surfaces","amend","remove",reason="covered by physical-chemistry ch9 'Adsorption Crafts'; environmental-engineering is a wrong target"),
 V(PC,6,"Micro miniaturized semiconductor devices – integrated circuits","amend","remove",reason="solid-state/electronics fragment; foundation-physics ch10 is a wrong target"),
 V(PC,7,"Nanoscience and the Nanostructured Solids","amend","move",PC,7,"","nanostructured solids; correct home is physical-chemistry ch7 'The Solid State', not foundation-chemistry ch1"),
 V(PC,7,"Conduction of Electricity in Semiconductors","amend","remove",reason="covered by physical-chemistry ch7 'The Doping Preview'; foundation-physics ch10 is a wrong target"),
 V(PC,8,"Calculation of pH and Concentration of [H+] or [OH–] (When Equal Volumes of Two or Three Solutions of Known pH are Mixed)","amend","remove",reason="covered by physical-chemistry ch4 'The pH Families'; foundation-chemistry ch8 is a wrong target"),
 V(PC,9,"Gases (Topic 1A), particularly the perfect gas law. It builds","amend","remove",reason="OCR fragment; foundation-physics is a wrong target"),
 V(PC,10,"Basic concepts of light and color, wavelength, frequency, wave numbers, photon energies, Lambert-Beer law","amend","remove",reason="covered by physical-chemistry ch10 'The EM Register Read' + 'Beer-Lambert Computed'; foundation-physics is a wrong target"),
 V(PC,10,"Wave Nature of Electromagnetic Radiations","amend","remove",reason="covered by physical-chemistry ch10 'The EM Register Read'; electromagnetic-theory is a wrong target"),
 V(OC,1,"Structure-Reactivity Correlations","amend","remove",reason="covered by organic-chemistry ch1 'The Effect Census' + 'Nucleophilicity and Electrophilicity: The Reactivity Map'; microbiology is a nonsense target"),
 V(OC,1,"Organic structure-reactivity relations (polarity, electrophilicity, nucleophilicity, inductive effects, relative stability), structure-property relations (boiling point, acidity, basicity); common electrophiles and nucleophiles","amend","remove",reason="concatenated TOC summary; covered by organic-chemistry ch1 skeleton; foundation-chemistry ch3 is a wrong target"),
 V(OC,1,"Stereochemistry (E/Z, cis/trans isomers, chirality, optical activity, Cahn-Ingold-Prelog system, Fischer projections, D/L); cyclohexane conformations","amend","remove",reason="concatenated TOC summary; covered by organic-chemistry ch1 skeleton; foundation-chemistry ch1 is a wrong target"),
 V(OC,1,"Conditions of Resonating Structures","amend","remove",reason="covered by organic-chemistry ch1 resonance/effects; foundation-chemistry ch3 is a wrong target"),
 V(OC,1,"Exceptional Case of Hybridisation in Trisilyl Amine N(SiH₃)₃ and Diborane (B₂H₆)","amend","remove",reason="inorganic hybridisation examples; covered by inorganic-chemistry ch2/ch4; physical-chemistry ch1 is a wrong target"),
 V(OC,1,"Structures of MnO4⊖ and MnO42−","amend","remove",reason="inorganic bonding examples; covered by inorganic-chemistry ch2 'The Hybridisation Engine'; foundation-chemistry ch3 is a wrong target"),
 V(OC,1,"Normal Spinel Structures","amend","remove",reason="solid-state structures; covered by physical-chemistry ch7 'The Unit Cell Grammar'; foundation-chemistry ch3 is a wrong target"),
 V(OC,1,"Hydrocarbon frameworks 22 Drawing your own mechanisms with curly arrows","amend","remove",reason="Clayden TOC fragment; foundation-chemistry ch9 is a wrong target"),
 V(OC,1,"Calcium fluoride (fluorite) structure","amend","remove",reason="crystal structure; covered by physical-chemistry ch7 'The Unit Cell Grammar'; foundation-chemistry ch3 is a wrong target"),
 V(OC,1,"Β cristobalite (silica) structure","amend","remove",reason="crystal structure; covered by physical-chemistry ch7; foundation-chemistry ch3 is a wrong target"),
 V(OC,1,"Layer structures (CdI2, CdCl2, [NiAs])","amend","remove",reason="crystal structures; covered by physical-chemistry ch7; foundation-chemistry ch3 is a wrong target"),
 V(OC,1,"Nickel arsenide structure","amend","remove",reason="crystal structure; covered by physical-chemistry ch7; foundation-chemistry ch3 is a wrong target"),
 V(OC,1,"Summary of multi-centre π bonded structures","amend","remove",reason="covered by inorganic-chemistry ch2 'The MO Taster'; foundation-chemistry ch3 is a wrong target"),
 V(OC,1,"Syntheses and Structure Determination","amend","remove",reason="vague header; foundation-chemistry ch3 is a wrong target"),
 V(OC,1,"The Structure of Ethene (Ethylene): sp2 Ka and pKa","amend","remove",reason="covered by organic-chemistry ch1 'Sigma and Pi Bonds: The Carbon Framework'; foundation-chemistry ch3 is a wrong target"),
 V(OC,3,"Isolation of Metals","amend","remove",reason="metallurgy; covered by inorganic-chemistry ch9; foundation-chemistry ch1 is a wrong target"),
 V(OC,3,"Linear Polymerisation of Ethyne","amend","remove",reason="covered by organic-chemistry ch3 'The Polymerisation Preview'; foundation-chemistry ch1 is a wrong target"),
 V(OC,4,"Benzene (Phene), C6H6 Or [6] Annulene","amend","remove",reason="covered by organic-chemistry ch4 'The Aromatic Test'; foundation-chemistry ch1 is a wrong target"),
 V(OC,5,"Neighbouring Group Participation and Non-Classical Ions","amend","remove",reason="covered by organic-chemistry ch5 'The SN Pair'; foundation-chemistry ch6 is a wrong target"),
 V(OC,5,"Elimination: E1 and E2 reactions at sp3 carbon centers, stereochemistry, acid-base catalysis, common leaving groups","amend","remove",reason="concatenated TOC summary; covered by organic-chemistry ch5 'The Elimination Register'; foundation-chemistry ch6 is a wrong target"),
 V(OC,5,"IUPAC Rules for Chain Terminating Functional Groups (—CHO, —COOH, —CONH2, —COCl, —C≡N)","amend","remove",reason="covered by organic-chemistry ch1 'The IUPAC Discipline'; foundation-chemistry ch4 is a wrong target"),
 V(OC,5,"Leaving Group or Fugacity Order","amend","remove",reason="covered by organic-chemistry ch5 'The SN Pair'; foundation-chemistry ch4 is a wrong target"),
 V(OC,6,"Highly Sterically Hindered 3° Alcohols Cannot Be Prepared by G.R., But Can Be Prepared by RLi","amend","remove",reason="Grignard detail; covered by organic-chemistry ch5 'The Grignard Power'; foundation-chemistry ch1 is a wrong target"),
 V(OC,6,"Naming of Polyethers and Cyclic Ethers","amend","remove",reason="covered by organic-chemistry ch1 'The IUPAC Discipline' + ch6 ethers; foundation-chemistry ch1 is a wrong target"),
 V(OC,6,"Treating Haloalkene with Moist Ag2O or (AgCl + H2O) to give Alcohol","amend","remove",reason="covered by organic-chemistry ch6 'The Alcohol Census'; foundation-chemistry ch1 is a wrong target"),
 V(OC,6,"Trihydric Alcohols: Glycerol or Glycerine 1,2,3-Propanetriol","amend","remove",reason="covered by organic-chemistry ch6 'The Alcohol Census'; foundation-chemistry ch1 is a wrong target"),
 V(OC,6,"Comparison of Acidic Character of Thiols and Alcohols","amend","remove",reason="covered by organic-chemistry ch6; foundation-chemistry ch1 is a wrong target"),
 V(OC,10,"Carbohydrates: open chain and cyclic forms; structures of glucose and fructose","amend","remove",reason="concatenated TOC summary; covered by organic-chemistry ch10 'The Carbohydrate Register'; foundation-chemistry ch3 is a wrong target"),
 V(OC,11,"How should you name compounds? 40 carbonyl group","amend","remove",reason="OCR fragment; foundation-chemistry ch4 is a wrong target"),
 V(IC,1,"The Classification of Elements and the Periodic Law","amend","remove",reason="covered by foundation-chemistry ch4 'The Map's History' + inorganic-chemistry ch1; abstract-algebra is a nonsense target"),
 V(IC,1,"Ocean as Source of Elements","amend","remove",reason="covered by inorganic-chemistry ch1 occurrence summary; circuit-theory is a nonsense target"),
 V(IC,2,"Ionic Solids, Ionic Radii and the Born-Haber Cycle","amend","move",PC,7,"","ionic solids/radii; home is physical-chemistry ch7 'The Solid State' (Born-Haber cross-covered by ch1), not foundation-chemistry ch1"),
 V(IC,3,"Sodium Hydrogen Carbonate (NaHCO3)","amend","remove",reason="covered by inorganic-chemistry ch3 'The Sodium and Calcium Compound Industries'; foundation-chemistry ch3 (atomic structure!) is a wrong target"),
 V(IC,3,"Ethers Can also Be Prepared by Heating RX with Dry Silver Oxide","amend","remove",reason="organic ether synthesis; covered by organic-chemistry ch6 'The Williamson Synthesis'; foundation-chemistry ch1 is a wrong target"),
 V(IC,4,"When All the Three Like Groups are not Directly Linked to the Unbranched Carbon Chain","amend","remove",reason="organic nomenclature fragment; covered by organic-chemistry ch1; foundation-chemistry ch4 is a wrong target"),
 V(IC,4,"Main Characteristics","amend","remove",reason="vague fragment; anthropology is a nonsense target"),
 V(IC,7,"Complexation reactions, definition of coordination number, complex formation constants","amend","remove",reason="covered by inorganic-chemistry ch7 'Werner to Nomenclature' + 'The Stability Ledger'; differential-equations is a nonsense target"),
 V(IC,8,"Transport Phenomena.73","amend","remove",reason="OCR fragment; geography is a nonsense target"),
 V(AC,8,"Laboratory skills expected to be known by all participants (heating and reflux, mass and volume measurement, preparation and dilution of solutions, titrations, pH measurement, filtration, drying of precipitates, instrument operation, graphing and analysis of experimental data)","amend","remove",reason="concatenated IChO syllabus line; covered by foundation-chemistry ch10 'The Laboratory Register'; better removed than parked there"),
 V(FC,2,"Colour of the Solution","amend","remove",reason="vague fragment; token-score chapter shuffle (ch2->ch8) is pointless; remove"),
 V(FC,2,"Concentration Cells","amend","remove",reason="electrochemistry; covered by physical-chemistry ch5; better removed than shuffled to ch8"),
 V(FC,2,"Thermochemical Equations","amend","remove",reason="thermochemistry; covered by physical-chemistry ch1; better removed than shuffled to ch7"),
 V(FC,2,"Buffered Solutions","amend","remove",reason="buffers; covered by physical-chemistry ch4 'Buffers and Henderson'; better removed than shuffled to ch8"),
 V(FC,2,"In aqueous solution","amend","remove",reason="OCR fragment; better removed than shuffled"),
 V(FC,2,"Nonideal Solution","amend","remove",reason="covered by physical-chemistry ch8 'Raoult's Ledger'; better removed than shuffled to ch8"),
]

# ---------------- dupes ----------------
def DU(title, action, winner, reason):
    return {"title":title,"action":action,"winner":winner,"reason":reason}
dupes = [
 DU("Subgroups and Cyclic Groups (rearrangement-reaction cluster)","consolidate","organic-chemistry","Named rearrangements (Beckmann, Claisen, Fries, Curtius, Lossen, benzidine, Claisen-Schmidt, Hofmann-Martius, Lobry de Bruyn) were scattered as duplicates across foundation/inorganic/physical; organic-chemistry ch7 'The Named-Reaction Ledger' is the specialist owner — all scattered members removed"),
 DU("Polyprotic Acid Titrations 632 For Review 699 | Key Terms 699 | Questions and Exercises","consolidate","analytical-chemistry","Cengage sidebar/page-run junk cluster; the surviving analytical ch3 titration lessons own the content; all junk members removed"),
 DU("General Principles and Processes of Isolation of Elements — 1.1–1.52","consolidate","inorganic-chemistry","Occurrence/extraction lines were scattered across foundation, inorganic, organic and physical; inorganic-chemistry ch1 occurrence summary + ch9 'The Metallurgical Register' own the topic — duplicates removed"),
 DU("He2 molecule (homonuclear diatomic MO-bonding cluster)","consolidate","inorganic-chemistry","Homonuclear/heteronuclear diatomic MO bonding was scattered through foundation ch1/ch6 and inorganic ch2; inorganic-chemistry ch2 'The MO Taster' is the owner — scattered duplicates removed"),
 DU("CFSE in Both Octahedral and Tetrahedral Complexes","consolidate","inorganic-chemistry","Octahedral/tetrahedral geometry, distortion and CFSE lines were scattered across foundation ch1/ch2/ch6/ch8 and physical ch3; inorganic-chemistry ch7 (geometry, CFT craft) owns them — duplicates removed"),
 DU("Deviation from Ideal Gas Behaviour","consolidate","physical-chemistry","foundation ch7's two deviation items duplicate physical-chemistry ch9 'Real Gases Again' — foundation copies removed, physical keeps the topic at depth"),
 DU("Nitrate (NO3–), Bromide (Br–) and Iodide (I–)","consolidate","inorganic-chemistry","Anion-register fragments scattered across foundation ch1/ch6, inorganic ch4 and organic ch7; inorganic-chemistry ch10 'The Cation Groups and the Anion Tests' owns anion identification — fragments removed"),
 DU("Some Examples of Intramolecular H-Bonding","consolidate","foundation-chemistry","H-bonding examples (intra/intermolecular, conditions) scattered across foundation ch1/ch2/ch5 and organic/physical; foundation-chemistry ch5 'Hydrogen's Weak Glue' is the owner — scattered fragments removed"),
 DU("Titration of Mixture of Compounds with Acid/Base or Oxidising/Reducing Agent","consolidate","foundation-chemistry","Oxidant/reductant equivalent-weight fragments scattered across foundation ch1, inorganic ch5, organic ch2 and analytical ch3; foundation-chemistry ch2 (The Mole Ledger + The Reaction Census) owns redox equivalences; analytical ch3 keeps the mixed-titration craft"),
 DU("Laboratory skills expected to be known by all participants (IChO line)","consolidate","foundation-chemistry","General lab-skills line duplicates foundation-chemistry ch10 'The Laboratory Register' (purification practicals, titration, safety) — the IChO line removed"),
 DU("The Research Doorway","keep-both","","organic-chemistry ch11 and physical-chemistry ch12 each keep their own authored research-doorway closer (genuinely per-book treatments, not duplicates)"),
 DU("Salient Features (of the Animal Phyla)","consolidate","organic-chemistry","cluster mixes junk 'Salient Features' fragments from foundation ch1 and organic ch1 with other books' authored lessons; my books' members are vague fragments and are removed"),
 DU("Quantitative Techniques (fluorite/antifluorite)","consolidate","physical-chemistry","foundation ch2's fluorite/antifluorite structure items duplicate physical-chemistry ch7 'The Unit Cell Grammar' — foundation copies removed"),
 DU("Shot noise in current sources and emitter followers (token artifact)","consolidate","analytical-chemistry","token-similarity artifact; the only real members in my books are analytical ch3 'Acid-Base Curves' (authored, kept) — junk members removed"),
 DU("Summary 1208 of the Atom (token artifact)","consolidate","foundation-chemistry","junk cluster; foundation ch2's one member is an OCR fragment removed"),
 DU("Types of Intermolecular Forces and their Characteristics","consolidate","physical-chemistry","physical-chemistry ch9 'Intermolecular Forces and the Liquid State' (kept) is the chemistry owner; computational-chemistry/properties-of-matter members are other books' to keep"),
 DU("The Pressure-and-Temperature Craft","consolidate","foundation-chemistry","Gay-Lussac pressure-temperature law belongs to foundation-chemistry ch7 gas laws; physical ch1's gaseous-volumes duplicate removed"),
 DU("Some Important Compounds of Potassium (K)","consolidate","inorganic-chemistry","s-block/p-block 'Important Compounds of X' registers scattered across foundation ch1, inorganic ch2/3/4 and organic ch6; inorganic-chemistry ch3/4 family registers own them — scattered copies removed"),
 DU("Comparison Between Silicon and Tin","consolidate","inorganic-chemistry","carbon/silicon comparison lines scattered across foundation ch1 and organic ch1; inorganic-chemistry ch4 'The Carbon Family' owns group-14 comparisons — duplicates removed"),
 DU("Nature of Electromagnetic Radiations","consolidate","physical-chemistry","EM-radiation nature/wave-nature lines scattered across foundation ch1 and physical ch10; physical-chemistry ch10 'The EM Register Read' is the chemistry owner — foundation copies removed/moved to physics"),
 DU("Further reading 851 The pinacol rearrangement (token artifact)","consolidate","organic-chemistry","junk cluster; pinacol/sigmatropic members in foundation ch1 removed as covered by organic-chemistry ch7/ch4"),
 DU("Molecularity of Reaction","consolidate","physical-chemistry","molecularity/pseudo-order lines scattered across foundation ch2 and physical ch6; physical-chemistry ch6 'The Rate-Law Census' owns them"),
 DU("Passing H₂S(g) in an Aqueous Solution","consolidate","inorganic-chemistry","H2S precipitation fragments belong to inorganic-chemistry ch10 cation-group scheme; foundation copies removed"),
 DU("The Acid-Rain Register","consolidate","environmental-chemistry","acid-rain chemistry is owned by environmental-chemistry ch2; my only member (foundation ch8 'Harmful Effects of Emulsions') is a misfiled fragment removed under physical-chemistry ch9"),
 DU("Enzymes as Drug Targets","consolidate","organic-chemistry","drug-target lines scattered across organic ch1/ch11; organic-chemistry ch11 'Chemistry in Everyday Life' registers own the school-level treatment (biochemistry ch4 owns enzyme mechanisms at depth)"),
 DU("Relationship Between Formula of a Compound and Number of Voids Filled","consolidate","physical-chemistry","void-filling stoichiometry belongs to physical-chemistry ch7 solid state; inorganic ch1 and organic ch9 copies removed"),
 DU("Chemical Coordination and Integration (token artifact)","consolidate","physical-chemistry","junk cluster; physical ch12's member is an OCR fragment removed"),
 DU("Binary Trees and Their Properties (token artifact)","consolidate","inorganic-chemistry","token artifact; inorganic ch3's member (binary hydrides line) removed as covered by 'The Hydride Register'"),
 DU("A simple SAR example (token artifact)","consolidate","foundation-chemistry","junk cluster; foundation ch2's member is an OCR fragment removed"),
 DU("Some examples using the VSEPR theory (token artifact)","consolidate","inorganic-chemistry","foundation ch1's 'Some Examples' fragment removed; inorganic-chemistry ch2 'The VSEPR Census' owns VSEPR examples"),
 DU("Put the verb into the correct form (token artifact)","consolidate","physical-chemistry","junk cluster; physical ch2's member removed as covered by physical-chemistry ch5 'The EMF Ledger'"),
 DU("Reactivity 2.1 How much? The amount of chemical change","consolidate","foundation-chemistry","Cengage 'Reactivity' module lines scattered across foundation ch2 and organic ch1; foundation-chemistry ch2 skeleton owns amount/rate/extent — module lines removed"),
 DU("Formation of Alcohols","consolidate","organic-chemistry","alcohol/ester formation lines scattered across foundation ch2, organic ch3 and organic ch6; organic-chemistry ch6 'The Alcohol Census' owns them"),
 DU("Diels–Alder Reaction","consolidate","organic-chemistry","Diels-Alder lines scattered across foundation ch2 and organic ch1/ch4; organic-chemistry ch4 'The Pericyclic Reactions and Organic Photochemistry' owns cycloadditions — foundation copy removed"),
 DU("Ortho and para hydrogen","consolidate","inorganic-chemistry","spin-isomer duplicate: keep inorganic-chemistry ch3 'Ortho- and Para-hydrogen (Spin Isomers)'; remove the foundation-chemistry ch3 copy"),
 DU("Factors Affecting the Magnitude of Crystal Field Splitting Energy","consolidate","inorganic-chemistry","periodic-trend magnitude factors scattered across foundation ch8, physical ch1/ch8; inorganic-chemistry ch1 'The Trend Census' owns them (one factor lesson moved to foundation ch3 as shielding)"),
 DU("Anomalous Behaviour of Fluorine","consolidate","inorganic-chemistry","anomalous-behaviour lines (F, Li, Be, head elements) scattered across foundation ch8 and inorganic ch4; inorganic-chemistry ch1 'The Anomaly Registers' owns them"),
 DU("IUPAC Rules for Chain Terminating Functional Groups","consolidate","organic-chemistry","naming-rule fragments in organic ch5/ch11 removed; organic-chemistry ch1 'The IUPAC Discipline' owns nomenclature"),
 DU("Biological importance","consolidate","inorganic-chemistry","biological-importance lines (Mg/Ca, Na/K) scattered across inorganic ch3 and organic ch6; inorganic-chemistry ch8 'The Ion-Transport Register' owns bioinorganic ion roles"),
 DU("Addition and subtraction of sinusoidal (token artifact)","consolidate","organic-chemistry","junk cluster; organic ch3's 'Addition and Subtraction' fragment removed"),
 DU("Mass, Weight and g","consolidate","foundation-chemistry","physical ch8's 'Mass and Weight' removed; foundation-chemistry ch2 'The Unit Discipline' owns mass/weight at first pass"),
 DU("Conductors, Insulators, and Induced Charges","consolidate","physical-chemistry","physical ch7's 'Conductors, insulators and semiconductors' removed as covered by 'The Doping Preview'"),
 DU("Everyday Registers","keep-both","","foundation-chemistry ch6 'Everyday Registers' is an authored lesson (acids/bases/salts in everyday life); the cluster only token-matches other books' authored closers — keep each book's own"),
 DU("Irreversible Reactions","consolidate","physical-chemistry","foundation ch2's 'Irreversible Reactions' removed as covered by physical-chemistry ch3 'Chemical Equilibrium'; organic ch4's SE-reversibility fragment removed as covered by 'The EAS Census'"),
 DU("Effects of Radiation","consolidate","inorganic-chemistry","foundation ch8's vague 'Effects of Radiation' removed; radiation chemistry is owned by inorganic-chemistry ch10 'The Nuclear Register'"),
 DU("Conduction in Metals","consolidate","physical-chemistry","organic ch3 and physical ch7 copies removed; metallic conduction covered by inorganic ch2 bonding models + physical ch7 doping preview"),
 DU("The Earth’s Elements","consolidate","inorganic-chemistry","crustal-abundance/occurrence duplicates: keep inorganic-chemistry ch1 'Abundance of Elements in the Earth's Crust'; remove inorganic ch3's 'Occurrence in the earth's crust'"),
 DU("Optical Activity","consolidate","organic-chemistry","organic ch1's concatenated stereochemistry line removed; 'Stereoisomers: Enantiomers, Diastereomers and Meso' owns optical activity"),
 DU("Force? 672 19.1 Nuclear Stability and Radioactive Decay","consolidate","inorganic-chemistry","foundation ch3's nucleons/decay line removed; inorganic-chemistry ch10 'The Nuclear Register' owns nuclear stability"),
 DU("S, p and d Block Elements","consolidate","foundation-chemistry","foundation-chemistry ch4 'Groups and Periods' owns block classification at first pass; inorganic ch4's prediction fragment removed"),
 DU("The Classification","keep-both","","foundation-chemistry ch1 'The Classification' is authored (kept); the cluster only token-matches other books' authored lessons — keep each book's own"),
 DU("The Doorway Map","keep-both","","inorganic-chemistry ch10 'The Doorway Map' is authored (kept); token-matches other books' authored closers — keep each book's own"),
 DU("Similarities Between Lithium and Magnesium","consolidate","inorganic-chemistry","diagonal-relationship duplicates: keep inorganic-chemistry ch1 'The Diagonal Relation'; remove foundation ch1's 'Similarities Between Lithium and Magnesium' and inorganic ch1's duplicate lines"),
 DU("Comparison of Tin with Lead","consolidate","inorganic-chemistry","group-14 comparisons in foundation ch1 removed; inorganic-chemistry ch4 'The Carbon Family' owns them"),
 DU("Brief Contents (units and chapters, printed order)","consolidate","foundation-chemistry","junk cluster; foundation ch1's 'Vi BRIEF CONTENTS' removed"),
 DU("Looking forward (token artifact)","consolidate","organic-chemistry","junk cluster; my books' members are OCR fragments removed"),
 DU("Selenium, tellurium and polonium","consolidate","inorganic-chemistry","group-16 members: keep inorganic-chemistry ch5 'The Oxygen Family' register; remove foundation ch1 and physical ch6 copies"),
 DU("Stereoselective or Regioselective Reactions","consolidate","organic-chemistry","regio/stereoselectivity owned by organic-chemistry ch3/ch5 reaction registers; foundation copy removed"),
 DU("Hydroboration Reaction","consolidate","organic-chemistry","hydroboration/oxymercuration lines scattered across foundation ch2 and organic ch6; organic-chemistry ch3 'The Addition Census' + ch6 own them"),
 DU("Concentration Cells","consolidate","physical-chemistry","concentration cells owned by physical-chemistry ch5 'Electrochemistry (the fold)'; foundation copies removed"),
 DU("Carbonate (CO3^2–) and Oxalate (C2O4^2–)","consolidate","inorganic-chemistry","anion-test fragments in foundation ch6 removed; inorganic-chemistry ch10 'The Cation Groups and the Anion Tests' owns anion identification"),
 DU("What do you need to know already? (token artifact)","consolidate","inorganic-chemistry","junk cluster; inorganic ch2's resource-section fragment removed"),
 DU("Elevation and Depression","keep-both","","physical-chemistry ch8 'Elevation and Depression' is the authored colligative lesson (kept); the cluster only token-matches trigonometry's elevation/depression angles — keep each book's own"),
 DU("Arrhenius and Activation Energy","keep-both","","physical-chemistry ch6 'Arrhenius's Activation' is authored (kept); materials-science's treatment is a genuinely different materials view"),
 DU("Corrosion Forms and Prevention","consolidate","physical-chemistry","corrosion owned by physical-chemistry ch5 'Batteries, Fuel Cells and Corrosion' (kept); the granular 'Prevention of Corrosion' fragment removed as covered"),
 DU("Graphical Representation for Motion","consolidate","physical-chemistry","physical ch1's graphical-processes fragment removed; ch1's thermodynamic-process registers own it"),
 DU("Appendix D/E (mathematics appendix cluster)","consolidate","foundation-chemistry","junk cluster; foundation's appendix-code members removed"),
 DU("Typical Elements","consolidate","inorganic-chemistry","inorganic ch1's 'Typical Elements' removed as covered by 'The Trend Census'; cluster is a token artifact"),
 DU("A Survey of the Representative Elements (token artifact)","consolidate","inorganic-chemistry","junk cluster; my member is an OCR page-run removed"),
 DU("The Family Census","keep-both","","foundation-chemistry ch4 'The Family Census' is authored (kept); token-matches antennas' own authored lesson — keep each book's own"),
 DU("Ferromagnetism","consolidate","physical-chemistry","magnetic behaviours of solids owned by physical-chemistry ch7 solid-state registers; foundation ch1's fragment removed"),
 DU("Photoelectric Effect","keep-both","","foundation-chemistry ch3 keeps the first-pass photoelectric-effect context for the quantum atomic story; foundation-physics owns the full physics treatment — genuinely different treatments"),
 DU("Gravity and Weight (token artifact)","consolidate","inorganic-chemistry","junk cluster; inorganic ch7's work-definition fragment removed"),
 DU("The Color of Light and Spectra","consolidate","physical-chemistry","physical ch10's concatenated light/color line removed; ch10 'The EM Register Read' + 'Beer-Lambert Computed' own it"),
 DU("Text: differentiation and integration (token artifact)","consolidate","foundation-chemistry","junk cluster; foundation ch4's member removed"),
 DU("Effect of Temperature on ΔrG° of the Overall Reduction Process","consolidate","inorganic-chemistry","Ellingham thermodynamics owned by inorganic-chemistry ch9 'The Ellingham Honesty'; foundation ch8's copy removed"),
 DU("Maxwell’s Distribution","keep-both","","physical-chemistry ch9 keeps the gas-kinetics speed distribution (part of 'The Kinetic Theory and the Molecular Speeds'); heat-and-thermodynamics keeps its own physics treatment"),
 DU("Adiabatic Process / Isothermal Process","consolidate","physical-chemistry","inorganic ch9's isothermal/adiabatic fragments removed; physical-chemistry ch1 owns thermodynamic processes"),
 DU("The Particulate Nature of Matter","keep-both","","foundation-chemistry ch1's authored lesson (kept) and modern-physics' Theme B are per-book treatments — keep both"),
 DU("Scientific Notation","consolidate","foundation-mathematics","maths skill; foundation ch1's copy removed (authored foundation-mathematics owns notation)"),
 DU("Magnetic Resonance Craft (token artifact)","consolidate","analytical-chemistry","junk cluster; foundation ch2's FOCUS-line removed; NMR owned by analytical ch8 'The NMR Preview'"),
 DU("Nuclear Stability and the Ratio of Neutrons and Protons","consolidate","inorganic-chemistry","foundation ch2's copy removed; inorganic-chemistry ch10 'The Nuclear Register' owns nuclear stability"),
 DU("Partial Pressures","keep-both","","foundation-chemistry ch7 'Partial Pressures' is authored first-pass content; statistical-mechanics keeps its own derivation-level treatment"),
 DU("The Detection Craft","keep-both","","organic-chemistry ch11 'The Detection Craft' is authored (kept); token-matches astrophysics' own lesson — keep each book's own"),
 DU("The Error Census","keep-both","","analytical-chemistry ch1 'The Error Census' is authored (kept); token-matches econometrics' own lesson — keep each book's own"),
 DU("Gerade (g) and Ungerade (u) MO’s","consolidate","quantum-chemistry","foundation ch1's g/u fragment removed; quantum-chemistry ch4 owns gerade/ungerade orbitals (inorganic-chemistry ch2 'The MO Taster' covers the chemistry use)"),
 DU("Phosphorous Pentachloride (PCl5)","consolidate","inorganic-chemistry","PCl5 owned by inorganic-chemistry ch4 'The Phosphorus Register: Allotropes and Halides'; foundation ch1 and inorganic ch4 granular copies removed"),
 DU("Raney Nickel","consolidate","organic-chemistry","reducing-agent register owned by organic-chemistry ch7 reductions; foundation ch1 and physical ch4 copies removed"),
 DU("Epoxides (Oxiranes)","consolidate","organic-chemistry","epoxides owned by organic-chemistry ch6 'Alcohols, Phenols and Ethers'; foundation ch1 and organic ch6 Grignard-detail copies removed"),
 DU("Mixed Benzoin Condensation","consolidate","organic-chemistry","benzoin condensation owned by organic-chemistry ch7 'The Named-Reaction Ledger'; foundation ch1 and organic ch11 copies removed"),
 DU("Mixed Claisen Condensation when One Ester Has α-H Atom and Another Ester Lacks α-H Atom","consolidate","organic-chemistry","Claisen/Dieckmann condensations owned by organic-chemistry ch8 'The Acids and Their Derivatives'; foundation ch1 copy removed"),
 DU("Looking back 852 The Favorskii rearrangement (token artifact)","consolidate","organic-chemistry","junk cluster; analytical ch3's member removed; Favorskii owned by organic-chemistry ch7"),
 DU("Advantage of Reductive Amination","consolidate","organic-chemistry","reductive amination owned by organic-chemistry ch7 'The Carbonyl Register'; foundation ch1 and organic ch7 granular copies removed"),
 DU("The Genetic Code Preview","consolidate","foundation-biology","foundation ch1's 'Heredity: the Genetic Code' removed (auto-approved); biology books own genetics"),
 DU("Direct or Indirect Estimation of Reactants","consolidate","foundation-chemistry","vague estimation fragments in foundation ch1 and physical ch4 removed; foundation-chemistry ch2 'First Stoichiometry' owns estimation"),
 DU("ImpossiAble/Getty Images (token artifact)","consolidate","foundation-chemistry","junk cluster; photo-credit members removed"),
 DU("Tem and its energy is increased (token artifact)","consolidate","physical-chemistry","junk cluster; OCR fragments removed"),
 DU("Alkylation of enolates","consolidate","organic-chemistry","enolate alkylation owned by organic-chemistry ch7 carbonyl register; foundation ch1 and physical ch6 copies removed"),
 DU("Formation of H₂ Molecule","consolidate","foundation-chemistry","H2 covalent bonding owned by foundation-chemistry ch5 'The Covalent Ledger'; foundation ch2 copy and inorganic ch2 page-run removed"),
 DU("Reactions Involving (—COOH) Group","consolidate","organic-chemistry","acid-derivative reactions owned by organic-chemistry ch8; foundation ch2 copy removed"),
 DU("Displacement Reactions","consolidate","foundation-chemistry","reaction types owned by foundation-chemistry ch2 'The Reaction Census: Types and Balancing'; foundation ch2's fragment and organic ch4's nitrogen-displacement fragment removed"),
 DU("Enthalpy of Hydration (ΔhydH°)","consolidate","physical-chemistry","hydration enthalpy owned by physical-chemistry ch1 'The Enthalpy Ledger'; foundation ch2 and inorganic ch1 copies removed"),
 DU("Passing H₂S(g) in an Acidic Solution","consolidate","inorganic-chemistry","H2S scheme owned by inorganic-chemistry ch10; foundation ch2 copy removed"),
 DU("Gram Atomic Mass","consolidate","foundation-chemistry","molar masses owned by foundation-chemistry ch2 'The Mole Ledger'; foundation ch3 and physical ch8 copies removed"),
 DU("MnF_4 and Mn_2O_7 Exist but MnF_7 Does Not (token artifact)","consolidate","foundation-chemistry","foundation ch5's 'Why Electron does not exist in Nucleus' is a misfiled atomic-structure fragment removed (covered by foundation ch3)"),
 DU("Salt-like carbides","consolidate","inorganic-chemistry","carbides/hydrides registers owned by inorganic-chemistry ch3/ch4; foundation ch6 and inorganic ch3 granular copies removed"),
 DU("Stephen's Reduction (Partial Reduction)","consolidate","organic-chemistry","named reduction owned by organic-chemistry ch7 'The Reduction Register'/named-reaction ledger; foundation ch7 copy removed"),
 DU("Saturated heterocycles and cycloadditions","consolidate","organic-chemistry","heterocycles and cycloadditions owned by organic-chemistry ch4 'The Heterocyclic Register'/'The Pericyclic Reactions'; foundation ch9 and physical ch11 copies removed"),
 DU("Thermal decomposition methods","consolidate","industrial-chemistry","cracking/decomposition owned by industrial-chemistry ch4 'Petroleum and the Petrochemicals'; foundation ch10 and inorganic ch3 copies removed"),
 DU("List of Deeper Looks (token artifact)","consolidate","physical-chemistry","junk cluster; physical ch6's e-book blurb removed"),
 DU("Isomerism (constitutional, configuration, conformation, tautomerism)","consolidate","organic-chemistry","organic ch1's concatenated line removed; 'Isomerism Introduced' + 'Stereoisomers' own it"),
 DU("Further reading 788 Thermal [2 + 2] cycloadditions (token artifact)","consolidate","organic-chemistry","junk cluster; my books' members removed (cycloadditions owned by organic-chemistry ch4)"),
 DU("Sodium Hydrogen Carbonate (NaHCO3)","consolidate","inorganic-chemistry","sodium compounds owned by inorganic-chemistry ch3 'The Sodium and Calcium Compound Industries'; inorganic ch3 granular line and organic ch6's sodium-salt copies removed"),
 DU("The Multi-Step Register","keep-both","","organic-chemistry ch11 'The Multi-Step Register' is authored (kept); token-matches pathology's multi-step clonal lesson — different topics, keep both"),
 DU("The Oxygen Craft","keep-both","","genuinely different treatments: biochemistry ch3 treats oxygen transport as protein function (haemoglobin curves), inorganic-chemistry ch8 treats it as the bioinorganic coordination craft — keep both"),
 DU("Identiﬁcation possible 72 7 Delocalization and conjugation (token artifact)","consolidate","quantum-chemistry","junk cluster; inorganic ch10's member removed; delocalization owned by organic-chemistry ch1 effects register and quantum-chemistry ch3"),
]

# ---------------- extras (junkSuspects + free scan) ----------------
E = {}
def exput(book, ch, idxs, action='remove', tb='', tc=0, nt='', reason=VG):
    if isinstance(idxs, int): idxs=[idxs]
    for i in idxs:
        E[(book, ch, i)] = (action, tb, tc, nt, reason)

FC='foundation-chemistry'; PC='physical-chemistry'; OC='organic-chemistry'; IC='inorganic-chemistry'; AC='analytical-chemistry'
J1S = "junk: OCR/publisher fragment with no lesson content"
J2S = "junk: page-number/section-code/photo-credit furniture"
J3S = "junk: front/back-matter or scanned-page note"
VGS = "vague fragment; no standalone lesson content"
def CRS(t): return t
exput(FC,1,[7],reason=CRS("stereochemistry detail; covered by organic-chemistry ch1 'Stereoisomers'"))
exput(FC,1,[8],reason=CRS("covered by organic-chemistry ch4 'The Aromatic Test'"))
exput(FC,1,[13,14,15,16],reason=CRS("metallurgy furnace/refining detail; covered by inorganic-chemistry ch9 'The Refining Census'/'The Conversion Registers'"))
exput(FC,1,[26],reason=CRS("covered by inorganic-chemistry ch4/5 oxoacid registers"))
exput(FC,1,[29,30],reason=VGS)
exput(FC,1,[34,35],reason=CRS("covered by foundation-chemistry ch5 'Hydrogen's Weak Glue'"))
exput(FC,1,[36,37,40,41],reason=CRS("MO-bonding detail; covered by inorganic-chemistry ch2 'The MO Taster'"))
exput(FC,1,[45,47,48],reason=CRS("p-block compounds; covered by inorganic-chemistry ch4 family registers"))
exput(FC,1,[49,50],reason=CRS("dihydrogen; covered by inorganic-chemistry ch3 'Hydrogen and the s-Block'"))
exput(FC,1,[57,58,59,60,61,62],reason=CRS("p-block halides/oxides; covered by inorganic-chemistry ch4/ch5"))
exput(FC,1,[63],reason=CRS("covered by inorganic-chemistry ch5 'The Oxygen Family'"))
exput(FC,1,[66,68,69,70,71,72],reason=CRS("halogen compounds; covered by inorganic-chemistry ch5 'The Halogen Register'"))
exput(FC,1,[75,77],reason=CRS("covered by inorganic-chemistry ch4 'The Carbon Family'"))
exput(FC,1,[79,80,82],reason=CRS("potassium compounds; covered by inorganic-chemistry ch3"))
exput(FC,1,[88],reason=CRS("covered by inorganic-chemistry ch3 'Some Important Compounds of Magnesium and Calcium'"))
exput(FC,1,[92,93],reason=CRS("qualitative-analysis salts; covered by inorganic-chemistry ch10"))
exput(FC,1,[95,96],reason=CRS("covered by inorganic-chemistry ch4 boron/silicate compounds"))
exput(FC,1,[98],reason=CRS("covered by inorganic-chemistry ch7"))
exput(FC,1,[101],reason=CRS("CFSE; covered by inorganic-chemistry ch7 'The CFT Craft'"))
exput(FC,1,[105,107,108,109,110,111,113,114,115,116,117],reason=CRS("group-14 compounds; covered by inorganic-chemistry ch4 'The Carbon Family'"))
exput(FC,1,[118,119,120],reason=CRS("anion-test fragments; covered by inorganic-chemistry ch10"))
exput(FC,1,[127,128,129,130,131],reason=CRS("drug classes; covered by organic-chemistry ch11 'The Therapeutic Classes'"))
exput(FC,1,[138],reason=CRS("waste recycling; covered by environmental-chemistry ch6 'The Waste and Treatment Crafts'"))
exput(FC,1,[139],reason=CRS("industrial bleaching; covered by industrial-chemistry registers"))
exput(FC,1,[141],reason=CRS("covered by organic-chemistry ch7 reductions"))
exput(FC,1,[143,144,145],reason=CRS("organic reaction detail; covered by organic-chemistry reaction registers"))
exput(FC,1,[146,147,148,149],reason=CRS("polyhalogen compounds; covered by organic-chemistry ch5 'Haloalkanes and Haloarenes'"))
exput(FC,1,[152,155,157],reason=CRS("stereochemistry detail; covered by organic-chemistry ch1 'Stereoisomers'"))
exput(FC,1,[167],reason=CRS("covered by organic-chemistry ch6"))
exput(FC,1,[170,171,172,173],reason=CRS("covered by organic-chemistry ch1 'Reactive Intermediates'"))
exput(FC,1,[177],reason=CRS("nucleophilic addition; covered by organic-chemistry ch7 'The Addition Grammar'"))
exput(FC,1,[186,187,188],reason=CRS("aromatic substitution; covered by organic-chemistry ch4 'The EAS Census'"))
exput(FC,1,[189],reason=CRS("fuel knocking; covered by industrial-chemistry ch7 'The Fuels-and-Energy Register'"))
exput(FC,1,[191],reason=CRS("covered by organic-chemistry ch2 'The Alkanes'"))
exput(FC,1,[193],reason=CRS("covered by organic-chemistry ch2/ch8"))
exput(FC,1,[194],reason=CRS("covered by organic-chemistry ch8"))
exput(FC,1,[198,199,200,201,202,203,204,205,206,207,208],reason=CRS("organic reaction fragments; covered by organic-chemistry registers"))
exput(FC,1,[210],reason=CRS("covered by organic-chemistry ch9 'The Amines and the Nitrogen Register'"))
exput(FC,1,[212,213],reason=CRS("methanol synthesis; covered by industrial-chemistry ch4 petrochemicals + organic ch11"))
exput(FC,1,[225,226,227,229],reason=CRS("polymer classification; covered by organic-chemistry ch11 'The Addition and Condensation Polymer Families'"))
exput(FC,1,[231],reason=CRS("covered by organic-chemistry ch11 polymer families"))
exput(FC,1,[232,234],reason=CRS("benzene chemistry; covered by organic-chemistry ch4"))
exput(FC,1,[238,239,240,243],reason=CRS("carbohydrate stereochemistry; covered by organic-chemistry ch10 'The Carbohydrate Register'"))
exput(FC,1,[250,252],reason=CRS("solid-state detail; covered by physical-chemistry ch7"))
exput(FC,1,[259,260,261,262],reason=CRS("magnetic behaviours; covered by physical-chemistry ch7 solid-state registers"))
exput(FC,1,[266],reason=CRS("covered by foundation-chemistry ch2 'The Reaction Census'"))
exput(FC,1,[268],reason=CRS("azeotropic mixtures; covered by physical-chemistry ch8 solutions"))
exput(FC,1,[272],reason=CRS("equivalent weights; covered by foundation-chemistry ch2 'The Mole Ledger'"))
exput(FC,1,[279],reason=CRS("covered by foundation-chemistry ch3 'The Model Ladder'"))
exput(FC,1,[287],reason=CRS("covered by physical-chemistry ch11 photochemistry"))
exput(FC,1,[297],reason=CRS("covered by physical-chemistry ch3 'Le Chatelier Priced'"))
exput(FC,1,[299,300,303,305,307,309,314,315,317,318,320,321,323,324,326,327,330,333,336,337,340,350],reason=J2S)
exput(FC,1,[356,358],reason=CRS("enolate/diastereoselectivity detail; covered by organic-chemistry ch7"))
exput(FC,1,[368],reason=CRS("interhalogen; covered by inorganic-chemistry ch5 'The Halogen Compounds and the Interhalogens'"))
exput(FC,1,[369],reason=CRS("metallic lustre; covered by inorganic-chemistry ch2 bonding models"))
exput(FC,1,[371,372,373],reason=CRS("electronegativity scales; covered by inorganic-chemistry ch1 'The Trend Census'"))
exput(FC,1,[380,382,383],reason=CRS("alkali-metal solution chemistry; covered by inorganic-chemistry ch3"))
exput(FC,1,[386,387,388,389,390,391,392,393],reason=CRS("boron-family compounds; covered by inorganic-chemistry ch4 'The Boron Compounds'"))
exput(FC,1,[396,397,398],reason=CRS("silicate detail; covered by inorganic-chemistry ch4"))
exput(FC,1,[400,401,402,403,404,405,406,407,408,409,410,411],reason=CRS("p-block compound register; covered by inorganic-chemistry ch4/ch5 family registers"))
exput(FC,1,[413,414,415],reason=CRS("chalcogen compounds; covered by inorganic-chemistry ch5"))
exput(FC,1,[418,419,421,422,424,425,427,428,429,432],reason=J1S)
exput(FC,2,[7],reason=CRS("covered by foundation-chemistry ch4"))
exput(FC,2,[12],reason=CRS("covered by physical-chemistry ch1"))
exput(FC,2,[21,22],reason=CRS("covered by inorganic-chemistry ch1 'The Effective Engine'"))
exput(FC,2,[24],reason=VGS)
exput(FC,2,[34],reason=CRS("covered by inorganic-chemistry ch3 'Water, Heavy Water and Hydrogen Peroxide'"))
exput(FC,2,[37,38],reason=CRS("s-block reactivity; covered by inorganic-chemistry ch3"))
exput(FC,2,[46],reason=CRS("EAN rule; covered by inorganic-chemistry ch7"))
exput(FC,2,[53],reason=CRS("covered by organic-chemistry ch11 drug registers"))
exput(FC,2,[58,59,60,61],reason=CRS("organic reagents/named reactions; covered by organic-chemistry registers"))
exput(FC,2,[64],reason=CRS("covered by organic-chemistry ch5 'The SN Pair'"))
exput(FC,2,[66,67],reason=CRS("covered by organic-chemistry registers"))
exput(FC,2,[71,72,73,74],reason=CRS("named rearrangements; covered by organic-chemistry ch7 'The Named-Reaction Ledger'"))
exput(FC,2,[78,80],reason=CRS("covered by organic-chemistry ch7"))
exput(FC,2,[84,89,90],reason=CRS("covered by organic-chemistry ch7/ch8"))
exput(FC,2,[94],reason=CRS("covered by organic-chemistry ch3"))
exput(FC,2,[100,101],reason=CRS("fuel ratings; covered by industrial-chemistry ch7"))
exput(FC,2,[105,106,107,108,109],reason=CRS("named reactions; covered by organic-chemistry ch7"))
exput(FC,2,[111],reason=CRS("covered by organic-chemistry ch3"))
exput(FC,2,[117],reason=CRS("covered by organic-chemistry ch5"))
exput(FC,2,[120],reason=CRS("covered by organic-chemistry ch7"))
exput(FC,2,[123],reason=CRS("covered by organic-chemistry ch11"))
exput(FC,2,[136],reason=VGS)
exput(FC,2,[147],reason=CRS("covered by foundation-chemistry ch3"))
exput(FC,2,[157],reason=CRS("covered by foundation-chemistry ch2 'The Reaction Census'"))
exput(FC,2,[159],reason=CRS("covered by physical-chemistry ch1"))
exput(FC,2,[168],reason=CRS("covered by analytical-chemistry ch3"))
exput(FC,2,[170,171],reason=CRS("covered by inorganic-chemistry ch10 cation groups"))
exput(FC,2,[174,175,193,213,220],reason=J1S)
exput(FC,2,[222,223,224],reason=CRS("ionic structures; covered by physical-chemistry ch7 'The Unit Cell Grammar'"))
exput(FC,2,[232,233],reason=VGS)
exput(FC,3,[8,9],reason=CRS("nascent/occluded hydrogen; covered by inorganic-chemistry ch3"))
exput(FC,3,[10],reason=J1S)
exput(FC,3,[14,15,16],reason=CRS("organic carbonyl detail; covered by organic-chemistry ch7"))
exput(FC,3,[17,18],reason=CRS("solid-state impurities; covered by physical-chemistry ch7 'The Defect Census'"))
exput(FC,3,[19],reason=CRS("covered by ch3 'The Model Ladder'"))
exput(FC,3,[24],reason=CRS("covered by ch3 'Isotopes Counted'"))
exput(FC,3,[37],reason=VGS)
exput(FC,3,[38],reason=CRS("covered by inorganic-chemistry ch3 hydrogen register"))
exput(FC,3,[39],reason=CRS("ortho/para hydrogen owned by inorganic-chemistry ch3; foundation copy removed"))
exput(FC,3,[40],reason=CRS("covered by inorganic-chemistry ch4"))
exput(FC,3,[41],reason=J1S)
exput(FC,4,[4],reason=CRS("micelles/bilayers; covered by physical-chemistry ch9 'Emulsions, Surfactants and Micelles'"))
exput(FC,4,[7],reason=CRS("covered by inorganic-chemistry ch4 'The Phosphorus Register'"))
exput(FC,4,[9],reason=CRS("covered by organic-chemistry ch7"))
exput(FC,4,[10],reason=CRS("covered by analytical-chemistry registers"))
exput(FC,4,[23],reason=CRS("covered by organic-chemistry ch1 stereochemistry"))
exput(FC,5,[21],reason=CRS("covered by inorganic-chemistry ch4"))
exput(FC,5,22,'retitle',FC,5,'Metallic Bonding',"authored-style first-pass bonding topic; title was OCR-truncated ('Metallic Bondin')")
exput(FC,6,[4],reason=CRS("covered by organic-chemistry ch9 'The Diazonium Craft'"))
exput(FC,6,[6],reason=CRS("covered by inorganic-chemistry ch5"))
exput(FC,6,[7,8],reason=CRS("covered by foundation-chemistry ch6 'The Salt Census'/inorganic-chemistry ch10"))
exput(FC,6,[10,11,12,13,14,15,16,17,18],reason=CRS("anion tests; covered by inorganic-chemistry ch10 'The Cation Groups and the Anion Tests'"))
exput(FC,6,[19],reason=CRS("covered by physical-chemistry ch5"))
exput(FC,6,[20],reason=CRS("covered by analytical-chemistry ch3"))
exput(FC,6,[21],reason=CRS("covered by ch6 'The pH Idea'"))
exput(FC,6,[22],reason=CRS("covered by physical-chemistry ch4 'Solubility Product'"))
exput(FC,6,[25],reason=J1S)
exput(FC,6,[26,27,28,30,31,32],reason=CRS("inorganic ion fragments; covered by inorganic-chemistry ch2/ch4"))
exput(FC,6,[33,34],reason=CRS("acid-base definitions; covered by ch6 'The Definitions'"))
exput(FC,6,[36,37,38],reason=CRS("covered by ch6 'The Salt Census'"))
exput(FC,7,[6],reason=VGS)
exput(FC,7,[8],reason=CRS("covered by ch7 'Diffusion Craft'"))
exput(FC,7,[9,10],reason=CRS("covered by physical-chemistry ch9 'Real Gases Again'"))
exput(FC,7,[13],reason=CRS("covered by ch7 'Diffusion Craft'"))
exput(FC,7,[14],reason=J1S)
exput(FC,8,[12,13,14,15,16,17],reason=CRS("organic electronic effects; covered by organic-chemistry ch1 'The Effect Census'/ch4"))
exput(FC,8,[21,24],reason=CRS("covered by physical-chemistry ch6 'Catalysis Register'"))
exput(FC,8,[22],reason=VGS)
exput(FC,8,[25],reason=CRS("covered by foundation-chemistry ch6"))
exput(FC,8,[43],reason=VGS)
exput(FC,8,[44],reason=CRS("covered by ch8 'Solubility First Pass'"))
exput(FC,9,[4,5],reason=CRS("heterocycle/pericyclic detail; covered by organic-chemistry ch4"))
exput(FC,9,[6],reason=CRS("covered by inorganic-chemistry ch4"))
exput(FC,10,[4],reason=CRS("covered by ch10 'The Flame Census'"))
exput(FC,10,[7,8,9,10],reason=CRS("identification methods; covered by inorganic-chemistry ch10/ch7"))
exput(FC,10,[14],reason=CRS("covered by analytical-chemistry ch3"))
exput(FC,10,[18],reason=J1S)
exput(FC,10,[20],reason=CRS("covered by inorganic-chemistry ch7"))
exput(PC,1,[10],reason=CRS("metallurgy; covered by inorganic-chemistry ch9"))
exput(PC,1,[11],reason=CRS("covered by inorganic-chemistry ch1"))
exput(PC,1,[12,13],reason=VGS)
exput(PC,1,[16],reason=CRS("covered by organic-chemistry ch1 'Reactive Intermediates'"))
exput(PC,1,[17],reason=CRS("covered by organic-chemistry ch7"))
exput(PC,1,[18],reason=CRS("covered by foundation-chemistry ch7 gas laws"))
exput(PC,1,[24,25,26],reason=CRS("covered by physical-chemistry ch1 'Entropy's Direction'"))
exput(PC,1,[33,34,37,49],reason=J1S)
exput(PC,2,[4],reason=CRS("covered by inorganic-chemistry ch10"))
exput(PC,2,[8],reason=CRS("covered by physical-chemistry ch1"))
exput(PC,2,[12],reason=J1S)
exput(PC,3,[5],reason=CRS("covered by organic-chemistry ch10"))
exput(PC,3,[6],reason=CRS("covered by physical-chemistry ch1"))
exput(PC,3,[8],reason=J1S)
exput(PC,4,[4],reason=CRS("covered by inorganic-chemistry ch4"))
exput(PC,4,[5],reason=CRS("covered by organic-chemistry ch7"))
exput(PC,4,[6],reason=CRS("zwitterions; covered by biochemistry ch2 'Amino Acids and Protein Structure'"))
exput(PC,4,[8],reason=CRS("covered by organic-chemistry ch8"))
exput(PC,4,[9],reason=CRS("covered by physical-chemistry ch3"))
exput(PC,4,[16],reason=CRS("covered by physical-chemistry ch2 activity coefficients"))
exput(PC,5,[6],reason=CRS("Kolbe electrolysis; covered by organic-chemistry ch2/ch3"))
exput(PC,5,[9],reason=CRS("covered by physical-chemistry ch5 'The Cell Architecture'"))
exput(PC,5,[14],reason=CRS("covered by physical-chemistry ch5 'Batteries, Fuel Cells and Corrosion'"))
exput(PC,5,[16],reason=CRS("covered by physical-chemistry ch5 'Kohlrausch and Faraday'"))
exput(PC,5,[23],reason=CRS("chlor-alkali cell; covered by industrial-chemistry ch2 'The Acid-and-Alkali Industries'"))
exput(PC,5,[24],reason=J1S)
exput(PC,6,[24],reason=CRS("covered by foundation-chemistry ch6 'The Salt Census'"))
exput(PC,6,[30],reason=CRS("covered by organic-chemistry ch2 'The Conformation Register'"))
exput(PC,6,[33],reason=CRS("covered by organic-chemistry ch7"))
exput(PC,6,[37],reason=CRS("covered by physical-chemistry ch7"))
exput(PC,6,[38],reason=CRS("covered by physical-chemistry ch6 'Integrated Equations'"))
exput(PC,6,[43],reason=CRS("covered by physical-chemistry ch6 'Catalysis Register'"))
exput(PC,6,[55],reason=CRS("covered by inorganic-chemistry ch2 'The VSEPR Census'"))
exput(PC,6,[56],reason=CRS("covered by foundation-chemistry ch6 'The Definitions'"))
exput(PC,7,[7],reason=CRS("covered by inorganic-chemistry ch4"))
exput(PC,7,[8],reason=CRS("covered by biochemistry registers"))
exput(PC,7,[9],reason=CRS("covered by physical-chemistry ch7 'The Unit Cell Grammar'"))
exput(PC,7,[15],reason=CRS("covered by physical-chemistry ch7 'The Defect Census'"))
exput(PC,8,[4],reason=CRS("covered by inorganic-chemistry ch1"))
exput(PC,8,[11],reason=CRS("covered by foundation-chemistry ch2"))
exput(PC,8,[12],reason=CRS("covered by physical-chemistry ch8 'Raoult's Ledger'"))
exput(PC,9,[17,18],reason=CRS("covered by physical-chemistry ch9 'The Colloid Census'"))
exput(PC,12,[7],reason=J1S)
exput(PC,12,[10],reason=CRS("retrosynthesis; covered by organic-chemistry ch11 'The Multi-Step Register'"))
exput(OC,1,[12],reason=CRS("covered by ch1 'Isomerism Introduced'"))
exput(OC,1,[15],reason=CRS("covered by ch1 'The Effect Census'"))
exput(OC,1,[17],reason=CRS("covered by ch1 'Sigma and Pi Bonds'"))
exput(OC,1,[25],reason=CRS("covered by inorganic-chemistry ch10"))
exput(OC,1,[26],reason=CRS("covered by ch1 'The IUPAC Discipline'"))
exput(OC,1,[27],reason=CRS("covered by organic-chemistry ch11 drug registers"))
exput(OC,1,[29],reason=CRS("covered by organic-chemistry ch5"))
exput(OC,1,[32,33,34],reason=CRS("covered by ch1 'Stereoisomers'"))
exput(OC,1,[36,37,38],reason=CRS("conformations; covered by ch2 'The Conformation Register'"))
exput(OC,1,[39,43,44,45,46,48,49,50,51,52],reason=CRS("covered by ch1 registers"))
exput(OC,1,[69,70,76],reason=CRS("covered by ch1 registers"))
exput(OC,2,[8],reason=CRS("covered by organic-chemistry ch5"))
exput(OC,2,[9],reason=CRS("covered by organic-chemistry ch6"))
exput(OC,2,[11,12],reason=CRS("covered by ch2 'The Preparation Registers'"))
exput(OC,2,[13,14],reason=CRS("covered by organic-chemistry ch8"))
exput(OC,2,[15,16,17,18],reason=CRS("covered by ch3 registers"))
exput(OC,2,[20],reason=CRS("covered by organic-chemistry ch4/ch11"))
exput(OC,2,[21],reason=CRS("lyotropic series; covered by physical-chemistry ch9 colloids"))
exput(OC,3,[7],reason=CRS("covered by inorganic-chemistry ch6/7"))
exput(OC,3,[10],reason=CRS("covered by inorganic-chemistry ch1"))
exput(OC,3,[11,12],reason=CRS("covered by inorganic-chemistry ch3/ch6"))
exput(OC,3,[15,16,17,18,19,20,21],reason=CRS("oxidation reactions; covered by ch3 'The Oxidation Ledger'"))
exput(OC,3,[24,27,28],reason=CRS("covered by ch3 registers"))
exput(OC,3,[25],reason=CRS("anti-knock agents; covered by industrial-chemistry ch4"))
exput(OC,3,[37],reason=CRS("covered by ch3 'Ozonolysis and the KMnO4 Oxidations'"))
exput(OC,3,[40,41],reason=CRS("covered by inorganic-chemistry registers"))
exput(OC,4,[10,12],reason=CRS("covered by ch4 'The EAS Census'"))
exput(OC,4,[13],reason=CRS("covered by organic-chemistry ch8"))
exput(OC,4,[14,16],reason=CRS("covered by ch9 amine preparations"))
exput(OC,4,[15],reason=CRS("covered by ch3/ch5"))
exput(OC,4,[17],reason=VGS)
exput(OC,4,[20],reason=CRS("covered by ch4 'The EAS Census'"))
exput(OC,4,[21,22,26],reason=J1S)
exput(OC,5,[9,10,11,12],reason=CRS("inorganic halogen content; covered by inorganic-chemistry ch4/ch5"))
exput(OC,5,[14],reason=CRS("niche ester detail"))
exput(OC,5,[16],reason=CRS("covered by organic-chemistry ch6"))
exput(OC,5,[17,18],reason=CRS("covered by ch5 'The Grignard Power'"))
exput(OC,5,[19],reason=CRS("covered by organic-chemistry ch6"))
exput(OC,5,[20],reason=CRS("covered by ch4 'The EAS Census'"))
exput(OC,5,[26],reason=CRS("covered by ch9 'The Diazonium Crafts'"))
exput(OC,5,[30],reason=J1S)
exput(OC,5,[36,37,38],reason=CRS("inorganic halide detail; covered by inorganic-chemistry ch2/ch5"))
exput(OC,6,[6,7,9],reason=CRS("covered by inorganic-chemistry ch3"))
exput(OC,6,[14],reason=CRS("covered by ch6 'The Phenol Craft'"))
exput(OC,6,[19,22,23,24,25],reason=CRS("covered by ch6 registers"))
exput(OC,7,[8,10,11,12,13,14,15,16,17,18],reason=CRS("metal-chloride register; covered by inorganic-chemistry ch3/ch6"))
exput(OC,7,[19],reason=CRS("covered by inorganic-chemistry ch10"))
exput(OC,7,[20,22,23,25,26,29,30],reason=CRS("named reductions; covered by ch7 registers"))
exput(OC,7,[27,28],reason=CRS("covered by ch5 nucleophilic aromatic substitution"))
exput(OC,7,[33],reason=J1S)
exput(OC,7,[34,35],reason=CRS("covered by ch7 aldol registers"))
exput(OC,7,[39,40,41,42,44,46,49],reason=CRS("covered by ch7 registers"))
exput(OC,7,[48],reason=J1S)
exput(OC,8,[4,6],reason=CRS("covered by ch8 registers"))
exput(OC,9,[7,8],reason=VGS)
exput(OC,9,[10],reason=CRS("covered by inorganic-chemistry ch7"))
exput(OC,9,[11,12],reason=CRS("covered by inorganic-chemistry ch6"))
exput(OC,9,[15,16,17,18],reason=CRS("organometallics; covered by ch5 'The Grignard Power'"))
exput(OC,9,[24,25,26],reason=VGS)
exput(OC,9,[35],reason=J1S)
exput(OC,9,[36,37,38,39],reason=CRS("p-block nitrogen/phosphorus compounds; covered by inorganic-chemistry ch4"))
exput(OC,10,[7],reason=CRS("covered by ch10 registers"))
exput(OC,10,[9],reason=CRS("covered by inorganic-chemistry ch4"))
exput(OC,11,[13],reason=CRS("covered by ch11 'The Multi-Step Register'"))
exput(OC,11,[14],reason=CRS("niche polyfunctional detail; covered by ch11 registers"))
exput(IC,1,[10],reason=CRS("covered by ch1 'The Trend Census'"))
exput(IC,1,[13,18],reason=CRS("covered by ch1 'The Diagonal Relation'"))
exput(IC,1,[15],reason=CRS("covered by foundation-chemistry ch5 / ch2 VSEPR"))
exput(IC,2,[12],reason=CRS("covered by ch2 'The Hybridisation Engine'"))
exput(IC,2,[31],reason=CRS("covered by ch2 'The VSEPR Census'"))
exput(IC,2,[32],reason=CRS("covered by inorganic-chemistry ch4"))
exput(IC,2,[33],reason=CRS("covered by ch2 'The VSEPR Census'"))
exput(IC,3,[13,14,15,16],reason=CRS("halogen oxides; covered by inorganic-chemistry ch5 'The Halogen Compounds and the Interhalogens'"))
exput(IC,3,[26,27,28,29,30,31],reason=CRS("d-block oxides; covered by inorganic-chemistry ch6 'The Transition Register'"))
exput(IC,3,[34],reason=CRS("cracking; covered by industrial-chemistry ch4"))
exput(IC,3,[35],reason=CRS("covered by organic-chemistry ch4"))
exput(IC,3,[43,44,45,46,47],reason=CRS("oxide classification; covered by inorganic-chemistry ch3/ch4 registers"))
exput(IC,4,[12],reason=CRS("covered by ch4 'The Nitrogen Compounds' lesson"))
exput(IC,4,[13],reason=CRS("covered by 'The Phosphorus Register'"))
exput(IC,4,[14,15,16,17],reason=CRS("chlorine oxides/oxoacids; covered by inorganic-chemistry ch5 'The Halogen Register'"))
exput(IC,4,[19],reason=CRS("covered by inorganic-chemistry ch6"))
exput(IC,4,[20,21,22,23],reason=CRS("boron compounds; covered by ch4 'The Boron Compounds: Borax, Boric Acid and Diborane'"))
exput(IC,4,[25,26],reason=CRS("covered by ch4 'The Carbon Compounds' lesson"))
exput(IC,4,[27,28],reason=CRS("covered by inorganic-chemistry ch10 anion tests"))
exput(IC,4,[35],reason=CRS("covered by 'The Phosphorus Register'"))
exput(IC,4,[38],reason=CRS("covered by 'The Boron Compounds'"))
exput(IC,4,[39],reason=CRS("covered by ch4 'The First-Member Honesty'"))
exput(IC,4,[41],reason=VGS)
exput(IC,5,[13],reason=CRS("covered by foundation-chemistry ch2 'The Reaction Census'"))
exput(IC,5,[15,16,17],reason=CRS("sulphur halides/oxides; covered by ch5 'The Oxygen and Sulphur Compounds'"))
exput(IC,6,[9],reason=VGS)
exput(IC,6,[10],reason=CRS("niche oxidation-state fragment"))
exput(IC,6,[12,13],reason=J1S)
exput(IC,7,[16],reason=CRS("covered by ch10 'The Confirmatory Craft'"))
exput(IC,7,[17],reason=CRS("covered by organic-chemistry ch9"))
exput(IC,7,[18],reason=CRS("covered by organic-chemistry ch7"))
exput(IC,9,[21,22,23],reason=CRS("carbohydrate chemistry; covered by organic-chemistry ch10"))
exput(IC,9,[31],reason=CRS("Haber-Bosch (OCR-mangled); covered by industrial-chemistry ch3 'The Fertilizer Industries'"))
exput(IC,9,[32],reason=J1S)
exput(IC,10,[7],reason=CRS("covered by foundation-chemistry ch2"))
exput(IC,10,[8],reason=J1S)
exput(AC,3,[7],reason=CRS("dichromate; covered by ch3 'The Redox Registers' + inorganic-chemistry ch6"))
exput(AC,3,[12],reason=CRS("covered by inorganic-chemistry ch5 interhalogens"))

# junkSuspects not covered by auto/mis lists -> fold into E
JS = {
 ('foundation-chemistry',1):{11:"TOC header with numeric run; topic owned by inorganic-chemistry ch9",32:"covered by inorganic-chemistry ch2/ch5",38:"covered by inorganic-chemistry ch2 'The MO Taster'",136:J1S,156:"allene stereochemistry; covered by organic-chemistry ch1",174:J1S,196:"covered by organic-chemistry ch7/ch8",273:"covered by foundation-chemistry ch2",292:J1S,332:J1S,334:J1S,346:J1S,347:J1S,354:J1S,374:"covered by inorganic-chemistry ch9"},
 ('foundation-chemistry',2):{30:"covered by inorganic-chemistry ch2",51:"Grignard detail; covered by organic-chemistry ch5",83:"covered by organic-chemistry ch11",85:"covered by organic-chemistry ch7",137:"covered by foundation-chemistry ch2",143:"covered by foundation-chemistry ch2",144:"covered by physical-chemistry ch8",173:J1S,192:J1S,196:J1S,197:J1S,206:J1S,210:J1S},
 ('foundation-chemistry',3):{13:"covered by organic-chemistry ch7",29:J1S},
 ('foundation-chemistry',4):{17:J1S,18:J1S,20:J1S,24:"covered by inorganic-chemistry ch5 'The Oxygen Family'"},
 ('foundation-chemistry',5):{14:"CIP priority rules; covered by organic-chemistry ch1"},
 ('foundation-chemistry',6):{9:"covered by inorganic-chemistry ch7 'The CFT Craft'"},
 ('foundation-chemistry',8):{10:"Jahn-Teller; covered by inorganic-chemistry ch7 'The CFT Craft'",18:"niche titration arithmetic; covered by analytical-chemistry ch2"},
 ('physical-chemistry',1):{14:"Grignard detail; covered by organic-chemistry ch5",15:J3S,32:J1S,39:J1S,46:"pericyclic summary; covered by organic-chemistry ch4"},
 ('physical-chemistry',2):{9:J1S},
 ('physical-chemistry',4):{14:"buffer/electrochem illustration; covered by physical-chemistry ch4/ch5"},
 ('physical-chemistry',5):{17:"covered by physical-chemistry ch5 'Kohlrausch and Faraday'",21:J1S},
 ('physical-chemistry',6):{6:"kinetics summary line; covered by ch6 'The Rate-Law Census'",7:J1S,39:"pseudo-order kinetics; covered by ch6 'The Rate-Law Census'",40:"pseudo-order kinetics; covered by ch6",41:"pseudo-order kinetics; covered by ch6",42:"pseudo-order kinetics; covered by ch6",49:J1S,52:J1S},
 ('physical-chemistry',8):{7:"covered by organic-chemistry ch1 'The IUPAC Discipline'",8:"covered by organic-chemistry ch1"},
 ('physical-chemistry',9):{24:J1S},
 ('physical-chemistry',12):{9:J1S},
 ('organic-chemistry',1):{11:"covered by ch1 'The Effect Census'",13:"covered by ch1 'Stereoisomers'",18:"inorganic hybridisation example; covered by inorganic-chemistry ch2/ch4",21:"covered by inorganic-chemistry ch4 'The Boron Family'",28:"covered by ch3 alkyne reductions",35:"covered by ch1 'Stereoisomers'",53:J2S,58:J1S,59:J1S,74:J1S},
 ('organic-chemistry',2):{19:J2S,22:J1S},
 ('organic-chemistry',3):{14:"covered by ch7 carbonyl additions",26:J1S,30:"covered by ch3 'Ozonolysis and the KMnO4 Oxidations'"},
 ('organic-chemistry',4):{6:"covered by ch4 'The EAS Census'",9:"covered by ch1 'The IUPAC Discipline'",25:J1S},
 ('organic-chemistry',5):{8:"covered by ch5 'The Elimination Register'",13:"covered by ch1 'The IUPAC Discipline'",15:"covered by ch8",21:"covered by ch7/ch8",23:"covered by ch7 'The Named-Reaction Ledger'",33:"covered by ch5 registers"},
 ('organic-chemistry',6):{10:"covered by ch5 'The Grignard Power'",11:"covered by ch5 'The Grignard Power'",12:"iodoform; covered by ch7 'Aldol, Cannizzaro and the Haloform Crafts'",13:"covered by ch6 'The Alcohol Census'",17:"covered by ch3 'The Addition Census'",18:"covered by ch6 'The Alcohol Census'"},
 ('organic-chemistry',7):{6:"covered by ch7 'The Addition Grammar'",32:"covered by ch7 registers",36:"covered by ch7 aldol registers",37:"niche isotope-exchange detail",38:"covered by ch7 'Aldol, Cannizzaro and the Haloform Crafts'",45:J1S,47:J1S},
 ('organic-chemistry',8):{5:"LDA/enolate detail; covered by ch7 carbonyl register"},
 ('organic-chemistry',9):{23:"mustard-oil reaction; covered by ch9 'The Amine Tests'"},
 ('organic-chemistry',10):{5:"covered by ch10 'The Carbohydrate Register'"},
 ('organic-chemistry',11):{12:"covered by ch11 registers",24:"covered by industrial-chemistry ch4 + organic ch11",27:"covered by ch4 'The EAS Census'"},
 ('inorganic-chemistry',1):{5:"covered by ch1 'The Trend Census'",20:"covered by physical-chemistry ch7"},
 ('inorganic-chemistry',2):{11:"spectroscopic characterisation; covered by analytical-chemistry ch4 + physical-chemistry ch10",19:"covered by ch2 'The Hybridisation Engine'",21:"covered by ch7 'Werner to Nomenclature'"},
 ('inorganic-chemistry',3):{10:"covered by ch3 'The Hydride Register'",32:"covered by organic-chemistry ch6 'The Williamson Synthesis'"},
 ('inorganic-chemistry',4):{9:"covered by ch4 family registers",29:"covered by inorganic-chemistry ch10",30:"covered by organic-chemistry ch1 'The IUPAC Discipline'",32:"covered by organic-chemistry ch7"},
 ('inorganic-chemistry',5):{14:"covered by foundation-chemistry ch2"},
 ('inorganic-chemistry',7):{9:"covered by ch7 'Werner to Nomenclature' + 'The Stability Ledger'"},
 ('inorganic-chemistry',10):{9:J1S},
 ('analytical-chemistry',3):{4:"covered by ch3 'Acid-Base Curves'"},
}
special = {
 ('foundation-chemistry',5,8):('retitle',FC,5,'The Coordinate (Dative) Bond',"real first-pass bonding lesson in the correct book+chapter; title cleaned of synonym pile-up"),
 ('inorganic-chemistry',4,6):('keep',IC,4,'',"real p-block family-compound lesson; long title honestly enumerates the register — not junk"),
}
handled_js = 0
for e in chem['junkSuspect']:
    if e.get('book') not in MINE: continue
    bk, ch, idx, title = e['book'], e['chapter'], e['idx'], e['title']
    if (bk, ch, title) in mis_titles: continue
    if (bk, ch, title) in auto_titles: continue
    if (bk, ch, idx) in E: continue
    if (bk, ch, idx) in special:
        act, tb, tc, nt, rs = special[(bk, ch, idx)]
    else:
        m = JS.get((bk, ch), {}).get(idx)
        if m is None:
            print("UNHANDLED junkSuspect:", bk, ch, idx, repr(title[:80])); sys.exit(1)
        act, tb, tc, nt, rs = 'remove','','','',m
    E[(bk, ch, idx)] = (act, tb, tc, nt, rs)
    handled_js += 1

extra = []
skipped = []
for (bk, ch, idx), (act, tb, tc, nt, rs) in sorted(E.items()):
    if (bk, ch, idx) in mis_idx:
        skipped.append((bk, ch, idx)); continue
    try:
        title = planned[(bk, ch)][idx]
    except Exception:
        print("BAD IDX:", bk, ch, idx); sys.exit(1)
    if (bk, ch, title) in auto_titles:
        continue
    extra.append({"book":bk,"chapter":ch,"title":title,"action":act,"targetBook":tb,
                  "targetChapter":tc if act=='move' else 0,"newTitle":nt,"reason":rs})
if skipped:
    print("NOTE: skipped extra idx already in misAdjudicate:", skipped[:10])

out = {
 "agent":"chemistry-a",
 "autoReview": autoReview,
 "misplaced": misplaced,
 "dupes": dupes,
 "thin": [],
 "order": [],
 "extra": extra,
 "notes": ("Adjudicated all 561 misAdjudicate items of my 5 books (foundation-chemistry was the heaviest sink: ~2,000 Cengage chem/phys module TOC lines had landed in ch1/ch2). "
  "Core rulings: organic named reactions/rearrangements scattered through foundation+inorganic+physical are REMOVED as covered by organic-chemistry ch7 'The Named-Reaction Ledger' and the reaction registers (no duplicate topics); "
  "p-block/s-block compound registers scattered through foundation ch1 belong to inorganic-chemistry ch3/ch4/ch5 (covered, removed); solid-state/crystallography to physical-chemistry ch7; thermodynamics fragments to physical-chemistry ch1. "
  "Authored skeleton lessons kept (The Classification, Pure against Mixed, The Reaction Census, The Model Ladder, Hardness Treated, Batteries/Fuel Cells/Corrosion, Real Gases Again, the ch9 liquid/surface lessons, The Diagonal Relation, The Phosphorus Register, the ch9 extraction keeps, the analytical keeps). "
  "Real moves with concrete legend targets: Particulate Pollutants->environmental-chemistry ch2; Coal->industrial-chemistry ch7; Leblanc process->industrial-chemistry ch2; Cyanamide process->industrial-chemistry ch3; cathode-rays/neutron/Heisenberg/photoelectric-effect/screening->foundation-chemistry ch3; "
  "radial/angular wavefunction plots->quantum-chemistry ch4 (auto-move vetoed). ~100 autoAction vetoes/amends: token-score moves to law/dance/film-studies/microeconomics targets vetoed to remove-as-covered or corrected target; authored lessons wrongly auto-removed (The Classification, The Particulate Nature of Matter, From Bonding Models to Materials, Real Gases Again, Chemistry in Everyday Life, the inorganic ch10 qualitative lessons, Redox titrations) vetoed to keep. "
  "No dupAdjudicate cluster required consolidation INTO my books; 116 clusters adjudicated (101 consolidate to the specialist chemistry winner, keep-both only for genuinely different treatments: The Oxygen Craft, The Research Doorway, authored per-book closers). No thin chapters; chapter ORDER of all five books is pedagogically sound (no reorder). "
  "Free-scan added ~300 extra verdicts: every remaining unmarked Cengage fragment in foundation ch1/ch2 (element registers, drug classes, polymers, photo credits, OCR cut-offs) adjudicated remove-as-covered.")
}
import os
with open(BASE+'verdicts/chemistry-a.json','w') as f:
    json.dump(out, f, ensure_ascii=False, indent=1)
print("misplaced:", len(misplaced), "autoReview:", len(autoReview), "dupes:", len(dupes), "extra:", len(extra), "junkSuspect handled:", handled_js)
from collections import Counter
print("misplaced actions:", Counter(m['action'] for m in misplaced))
print("extra actions:", Counter(m['action'] for m in extra))
print("autoReview verdicts:", Counter(a['verdict'] for a in autoReview))

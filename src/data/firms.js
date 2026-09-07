import { RANKS } from "./ranks.js";

export const FIRM_ID = "carl-capital";

// La hiérarchie change à chaque promotion : votre supérieur direct devient quelqu'un
// de plus senior à chaque rang, comme dans une vraie PE (un Partner ne supervise pas un Analyste).
export const CARL_STAFF = [
  { superior: "Abdou Ndiaye", superiorTitle: "Associé senior", rival: "Koku Mensah", offset: -12 },
  { superior: "Sophie Nguyen", superiorTitle: "Vice-Présidente", rival: "Marc-Antoine Delisle", offset: 25 },
  { superior: "Julien Castex", superiorTitle: "Principal", rival: "Amara Osei", offset: 10 },
  { superior: "Claire Vasseur", superiorTitle: "Partner", rival: "Diego Ferreira", offset: 20 },
  { superior: "Marcel Trudeau-Simard", superiorTitle: "Fondateur & CEO", rival: "Odile Marchand", offset: 0 },
];

const NAME_FIRSTS = ["Renata", "Marcus", "Inès", "Grant", "Priya", "Whitfield", "Elena", "Théo", "Harold", "Amara", "Diego", "Odile", "Petra", "Silas", "Yvonne", "Fatima", "Owen", "Desmond", "Nadia", "Colin"];
const NAME_LASTS = ["Ndiaye", "Mensah", "Nguyen", "Castex", "Vasseur", "Delisle", "Osei", "Ferreira", "Marchand", "Cho", "Okafor", "Silva", "Lachance", "Webb", "Boucher", "Marsh", "Anand", "Belzile", "Rahal", "Vantage"];

export function genName(seed) {
  return `${NAME_FIRSTS[seed % NAME_FIRSTS.length]} ${NAME_LASTS[(seed * 7 + 3) % NAME_LASTS.length]}`;
}

export const JOB_MARKET_FIRM_IDS = ["halberd", "northgate", "solstice", "ledger-vance"];

export function getStaff(firmId, rankIdx, firmsList) {
  if (firmId === "carl-capital") return CARL_STAFF[rankIdx];
  const firmIndex = firmsList.findIndex((f) => f.id === firmId);
  const base = firmIndex >= 0 ? firmIndex : 0;
  return {
    superior: genName(base * 13 + rankIdx * 3 + 1),
    superiorTitle: rankIdx < 4 ? RANKS[rankIdx + 1].name : "Fondateur & CEO",
    rival: genName(base * 13 + rankIdx * 3 + 5),
    offset: [-12, 25, 10, 20, 0][rankIdx],
  };
}

export const CEO_NAMES = {
  "carl-capital": "Marcel Trudeau-Simard", northgate: "Diane Whitfield", solstice: "Hugo Belzile",
  meridian: "Fatima Rahal", "vantage-cole": "Owen Vantage", halberd: "Desmond Halberd",
  brightwell: "Nadia Brightwell", ashcombe: "Colin Ashcombe", ferrowood: "Simone Ferro",
  talisman: "Adrian Talisman", greystone: "Yvonne Greystone", kestrel: "Marcus Kestrel",
  "orin-bay": "Lucie Orin", "ledger-vance": "Harold Vance", ironclad: "Petra Ironclad",
  silverpeak: "Silas Peak", aurelian: "Aurelia Cross", brontide: "Dmitri Brontide",
  "cascade-point": "Vivian Cascade", meadowfield: "Grégoire Meadow",
};

export const FIRMS_INITIAL = [
  { id: "carl-capital", name: "Carl Capital", score: 68, employees: 18, public: false },
  { id: "northgate", name: "Northgate Partners", score: 74, employees: 210, public: true, stockPrice: 42.1 },
  { id: "solstice", name: "Solstice Capital", score: 61, employees: 150, public: false },
  { id: "meridian", name: "Meridian Equity", score: 58, employees: 130, public: false },
  { id: "vantage-cole", name: "Vantage & Cole", score: 52, employees: 95, public: false },
  { id: "halberd", name: "Halberd Capital", score: 45, employees: 80, public: false },
  { id: "brightwell", name: "Brightwell Partners", score: 66, employees: 120, public: false },
  { id: "ashcombe", name: "Ashcombe Capital", score: 39, employees: 60, public: false },
  { id: "ferrowood", name: "Ferrowood Equity", score: 71, employees: 175, public: false },
  { id: "talisman", name: "Talisman Partners", score: 55, employees: 88, public: false },
  { id: "greystone", name: "Greystone Ventures", score: 33, employees: 40, public: false },
  { id: "kestrel", name: "Kestrel Capital", score: 63, employees: 100, public: false },
  { id: "orin-bay", name: "Orin Bay Partners", score: 48, employees: 70, public: false },
  { id: "ledger-vance", name: "Ledger & Vance", score: 79, employees: 240, public: true, stockPrice: 57.3 },
  { id: "ironclad", name: "Ironclad Equity", score: 69, employees: 190, public: true, stockPrice: 31.85 },
  { id: "silverpeak", name: "Silverpeak Partners", score: 57, employees: 110, public: true, stockPrice: 24.6 },
  { id: "aurelian", name: "Aurelian Partners", score: 36, employees: 45, public: false },
  { id: "brontide", name: "Brontide Capital", score: 44, employees: 65, public: false },
  { id: "cascade-point", name: "Cascade Point Equity", score: 82, employees: 260, public: true, stockPrice: 63.9 },
  { id: "meadowfield", name: "Meadowfield Partners", score: 29, employees: 35, public: false },
];

export const NEW_FIRM_NAMES = ["Amberlynn Capital", "Thistlewood Partners", "Corvid Capital Partners", "Havenrock Equity", "Pemberton & Vale"];

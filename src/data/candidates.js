import { genName } from "./firms.js";
import { clamp } from "../lib/utils.js";

// Recrutement dans sa propre firme : un pool de candidats généré de façon déterministe à partir
// du trimestre et de l'identifiant de la firme (pas de random.js déconnecté des décisions), pour
// que le pool se renouvelle chaque trimestre sans jamais être identique d'une firme à l'autre.
export const TRAITS = [
  { label: "Analytique", description: "Excelle en modélisation financière et en due diligence." },
  { label: "Réseauteur", description: "Apporte un carnet d'adresses utile au sourcing de deals." },
  { label: "Opérationnel", description: "Doué pour le suivi post-acquisition des participations." },
  { label: "Négociateur", description: "Solide en structuration et en négociation avec les banques." },
  { label: "Stratège", description: "Pense thèse d'investissement et allocation de capital à long terme." },
];

export const POSTURE_MULTIPLIERS = {
  prudente: 0.8,
  alignee: 1.0,
  agressive: 1.25,
};

function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

export function generateCandidatePool(quarter, firmId, count = 3) {
  const baseSeed = hashSeed(`${firmId}-${quarter}`);
  return Array.from({ length: count }, (_, i) => {
    const seed = baseSeed + i * 97;
    const quality = 40 + (seed % 50); // 40-89
    const trait = TRAITS[seed % TRAITS.length];
    const signingCost = +(0.4 + quality / 40).toFixed(2); // M$
    return {
      id: `${firmId}-${quarter}-${i}`,
      name: genName(seed),
      trait,
      quality,
      signingCost,
      currentEmployer: ["un fonds concurrent", "une banque d'affaires", "un cabinet de conseil", "une autre PE"][seed % 4],
    };
  });
}

// L'issue de l'embauche est un compromis coût/certitude, pas un tirage au sort : une offre
// prudente est bon marché mais risque un refus, une offre agressive coûte plus cher mais
// garantit l'embauche — jamais l'inverse.
export function computeHireOutcome({ candidate, posture }) {
  const mult = POSTURE_MULTIPLIERS[posture] ?? 1;
  const offer = +(candidate.signingCost * mult).toFixed(2);
  const acceptThreshold = 0.75 + candidate.quality / 500; // 0.83 - 0.93
  const accepted = mult >= acceptThreshold;
  return { offer, accepted };
}

// Un poste d'acquisition supplémentaire tous les 2 recrutements réussis, plafonné à la taille
// du pool de cibles — donne à l'embauche un effet concret au-delà du simple compteur d'employés.
export function acquisitionSlotBonus(recruitsCount, poolSize) {
  return clamp(Math.floor(recruitsCount / 2), 0, poolSize - 3);
}

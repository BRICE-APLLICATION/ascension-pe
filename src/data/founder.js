import { clamp } from "../lib/utils.js";

// Fonder sa propre PE (section 4-7 de l'extension carrière) : le joueur quitte le parcours
// employé pour construire sa firme, financée d'abord sur capital personnel, puis par dette
// bancaire (réutilise src/data/banks.js) et enfin par des levées de fonds auprès de LPs.
export const FOUNDER_SEED_CAPITAL = 2; // M$, capital personnel investi à la fondation
export const FOUNDER_COMP = { salary: 0, bonus: 0 }; // le fondateur se rémunère par la valeur de sa firme, pas un salaire fixe

const FUND_LABELS = ["Capital personnel", "Fund I", "Fund II", "Fund III", "Fund IV", "Fund V"];

export function fundLabel(fundsRaised) {
  return FUND_LABELS[Math.min(fundsRaised, FUND_LABELS.length - 1)];
}

// La capacité à lever un fonds dépend du track record du joueur (réputation LPs, jugement
// d'investissement, performance de la firme) — jamais d'un tirage déconnecté du jeu.
export function attemptFundraise({ firm, reputation, careerProfile }) {
  const pitchStrength = clamp((reputation.lps * 0.5 + careerProfile.investmentJudgment * 0.3 + firm.score * 0.2) / 100, 0.1, 0.9);
  if (Math.random() >= pitchStrength) return { success: false };
  const baseSize = 20 + firm.fundsRaised * 40;
  const raised = Math.round(baseSize * (0.6 + pitchStrength * 0.8));
  return { success: true, raised };
}

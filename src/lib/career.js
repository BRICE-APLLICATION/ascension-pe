import { clamp } from "./utils.js";

// Dimensions de carrière dérivées de la couche fine (compétences) et de la réputation par audience.
// Jamais montrées en brut au joueur — elles alimentent des déclencheurs narratifs (offres CEO,
// capacité de fundraising) calculés en arrière-plan, conformément à la section 12 de l'extension carrière.
export function computeCareerProfile({ skills, reputation, xp, dealsReviewed, portfolio, relationshipWithSuperior }) {
  const investmentJudgment = avg([skills.modeling, skills.valuation, skills.dueDiligence]);
  // La relation avec le supérieur direct actuel pèse dans le jugement de leadership : un mentor qui
  // vous apprécie plaide en votre faveur, un mentor qui se méfie de vous freine votre progression.
  const leadership = avg([skills.leadership, reputation.entrepreneurs, relationshipWithSuperior ?? 50]);
  const networking = avg([skills.networking, reputation.lps, reputation.rivals]);
  const riskManagement = computeRiskManagement(portfolio, skills.dueDiligence);
  const financialPerformance = clamp(Math.round(xp / 8), 0, 100);
  const careerScore = Math.round(
    investmentJudgment * 0.3 + leadership * 0.2 + networking * 0.15 + riskManagement * 0.2 + financialPerformance * 0.15
  );

  return { investmentJudgment, leadership, networking, riskManagement, financialPerformance, careerScore, dealsReviewed };
}

function avg(values) {
  return clamp(Math.round(values.reduce((s, v) => s + v, 0) / values.length), 0, 100);
}

function computeRiskManagement(portfolio, dueDiligenceSkill) {
  const resolved = portfolio.filter((p) => p.resolvedRisk);
  if (resolved.length === 0) return dueDiligenceSkill;
  const clean = portfolio.filter((p) => p.pendingRisk && !p.resolvedRisk).length + (portfolio.length - resolved.length);
  const ratio = clean / portfolio.length;
  return clamp(Math.round(dueDiligenceSkill * 0.5 + ratio * 100 * 0.5), 0, 100);
}

// Section 9 de l'extension carrière : un simple descripteur narratif de la trajectoire suivie,
// jamais un écran de fin — le jeu reste une simulation ouverte, la question est "que fait-on
// maintenant", pas "la partie est terminée".
export function computeEndgamePath({ rankIndex, ceoFirmId, ownFirmId, careerHistory }) {
  if (ownFirmId) {
    const founderEntryIndex = careerHistory.findIndex((h) => h.role === "Fondateur");
    const precededByCarlOrOther = founderEntryIndex > 0;
    return precededByCarlOrOther
      ? { key: "hybride", label: "Hybride — carrière employée puis fondateur de sa propre firme" }
      : { key: "entrepreneur", label: "Entrepreneur — a bâti sa propre firme dès le départ" };
  }
  if (ceoFirmId) {
    const ceoIndex = careerHistory.findIndex((h) => h.role === "CEO");
    const priorFirm = ceoIndex > 0 ? careerHistory[ceoIndex - 1].firmName : null;
    const ceoFirmName = ceoIndex >= 0 ? careerHistory[ceoIndex].firmName : null;
    const external = priorFirm && ceoFirmName && priorFirm !== ceoFirmName;
    return external
      ? { key: "externe", label: "Externe — recruté(e) confidentiellement comme CEO d'un autre fonds" }
      : { key: "traditionnel", label: "Traditionnel — promu(e) CEO au sein de sa propre firme" };
  }
  if (rankIndex === 4) {
    return { key: "partner", label: "Partner — la suite de votre carrière reste à écrire" };
  }
  return null;
}

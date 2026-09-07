import { clamp } from "./utils.js";

// Dimensions de carrière dérivées de la couche fine (compétences) et de la réputation par audience.
// Jamais montrées en brut au joueur — elles alimentent des déclencheurs narratifs (offres CEO,
// capacité de fundraising) calculés en arrière-plan, conformément à la section 12 de l'extension carrière.
export function computeCareerProfile({ skills, reputation, xp, dealsReviewed, portfolio }) {
  const investmentJudgment = avg([skills.modeling, skills.valuation, skills.dueDiligence]);
  const leadership = avg([skills.leadership, reputation.entrepreneurs]);
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

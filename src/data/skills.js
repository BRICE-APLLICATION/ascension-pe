// Couche fine (invisible au joueur, alimente les dimensions de carrière calculées en arrière-plan
// pour les offres CEO et la capacité de fundraising — voir src/lib/career.js).
export const SKILL_KEYS = ["modeling", "valuation", "dueDiligence", "negotiation", "sourcing", "leadership", "networking"];

export const SKILL_BASELINE = 20;

export function defaultSkills() {
  return Object.fromEntries(SKILL_KEYS.map((k) => [k, SKILL_BASELINE]));
}

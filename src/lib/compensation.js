import { RANKS } from "../data/ranks.js";
import { CEO_COMP } from "../data/ceo.js";
import { FOUNDER_COMP } from "../data/founder.js";

export function getCompForRole(roleName) {
  if (roleName === "CEO") return CEO_COMP;
  if (roleName === "Fondateur") return FOUNDER_COMP;
  return RANKS.find((r) => r.name === roleName) || RANKS[0];
}

// Une entrée d'historique issue d'une négociation porte ses propres montants (salaire fixe,
// bonus négocié, valeur d'actions le cas échéant) plutôt que la grille par défaut du rang.
export function getGrossForEntry(h) {
  if (h.negotiatedSalary !== undefined) return h.negotiatedSalary + h.negotiatedBonusCash + (h.equityValue || 0);
  const r = getCompForRole(h.role);
  return Math.round((r.salary + r.bonus) * (h.salaryMultiplier ?? 1));
}

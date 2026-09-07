import { RANKS } from "../data/ranks.js";
import { CEO_COMP } from "../data/ceo.js";
import { FOUNDER_COMP } from "../data/founder.js";

export function getCompForRole(roleName) {
  if (roleName === "CEO") return CEO_COMP;
  if (roleName === "Fondateur") return FOUNDER_COMP;
  return RANKS.find((r) => r.name === roleName) || RANKS[0];
}

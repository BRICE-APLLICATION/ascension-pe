import { CARL_STAFF } from "./firms.js";

// Deuxième idée complémentaire du brief initial : une relation par supérieur nommé de Carl Capital,
// qui évolue avec les décisions prises sous sa supervision et influence ensuite les opportunités
// offertes (jugement de leadership pour une éventuelle offre CEO, mails de mentorat).
export const RELATIONSHIP_BASELINE = 50;

export function defaultRelationships() {
  return Object.fromEntries(CARL_STAFF.map((s) => [s.superior, RELATIONSHIP_BASELINE]));
}

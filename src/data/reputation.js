// Réputation séparée par audience (recoupe la Priorité 3 de la roadmap initiale et la section 3 de
// l'extension carrière) : les banques, les LPs, les entrepreneurs/cibles et les fonds concurrents ne
// jugent pas le joueur sur les mêmes décisions.
export const AUDIENCES = [
  { key: "banks", label: "Banques" },
  { key: "lps", label: "LPs" },
  { key: "entrepreneurs", label: "Entrepreneurs & cibles" },
  { key: "rivals", label: "Fonds concurrents" },
];

export const REPUTATION_BASELINE = 50;

export function defaultReputation() {
  return Object.fromEntries(AUDIENCES.map((a) => [a.key, REPUTATION_BASELINE]));
}

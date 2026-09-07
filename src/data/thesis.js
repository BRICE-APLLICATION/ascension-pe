// Idée complémentaire du brief initial : une thèse d'investissement formulée avant de structurer
// le deal, vérifiée automatiquement au moment où le risque caché (Priorité 1) se résout — jamais
// affichée comme un score, seulement comme un jugement validé ou non sur la lecture du deal.
export const THESES = [
  { key: "clean", label: "Deal propre", description: "Aucun risque significatif ne devrait se matérialiser sur cette cible." },
  { key: "mild", label: "Risque maîtrisé", description: "Un risque existe, mais la structure retenue devrait en limiter l'impact." },
  { key: "severe", label: "Pari à haut risque, haut rendement", description: "Cette cible peut mal tourner sérieusement — le rendement visé justifie le pari." },
];

const SEVERE_THRESHOLD = -0.2;

// L'issue réelle n'est jamais un tirage indépendant de la thèse : elle découle du même risque cach
// (ou de son absence) déjà déterminé par rollHiddenRisk au moment de l'investissement.
export function outcomeFromRisk(pendingRisk, impactFraction) {
  if (!pendingRisk) return "clean";
  return impactFraction <= SEVERE_THRESHOLD ? "severe" : "mild";
}

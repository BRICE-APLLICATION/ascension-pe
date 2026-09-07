// Priorité 4 de la roadmap : due diligence à budget limité. Investir dans la bonne catégorie donne
// une chance de révéler la description du risque cachée avant d'investir — jamais une certitude,
// et ça n'élimine ni ne réduit la probabilité que le risque se matérialise : ça informe la décision,
// ça ne la sécurise pas.
export const DD_CATEGORIES = [
  { key: "financiere", label: "Financière" },
  { key: "commerciale", label: "Commerciale" },
  { key: "legale", label: "Légale" },
  { key: "fiscale", label: "Fiscale" },
  { key: "operationnelle", label: "Opérationnelle" },
  { key: "environnementale", label: "Environnementale" },
];

export const DD_BUDGET = 2;
const REVEAL_CHANCE = 0.8;

export function investigateCategory(company, categoryKey) {
  const risk = company.hiddenRisk;
  if (!risk || risk.category !== categoryKey) return { found: false };
  if (Math.random() >= REVEAL_CHANCE) return { found: false };
  return { found: true, risk };
}

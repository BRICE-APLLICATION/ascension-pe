// maxLeverage est exprimé comme la fraction du prix d'acquisition que la banque accepte de financer
// par dette — la même échelle que `leverage` sur les propositions d'ACQUISITION_POOL, pour rester
// directement comparables au moment de la décision de financement.
export const BANKS = [
  {
    id: "bca", name: "Banque Continentale des Affaires (BCA)", profile: "Commerciale prudente",
    maxLeverage: 0.5, rate: 0.062,
    description: "Taux avantageux, mais plafond de levier bas : refuse toute structure jugée trop agressive.",
  },
  {
    id: "falconbridge", name: "Falconbridge Capital Finance", profile: "Prêteur spécialisé LBO",
    maxLeverage: 0.75, rate: 0.089,
    description: "Accepte un levier plus élevé, contre un taux plus élevé et des covenants plus stricts.",
  },
  {
    id: "meridian-mezz", name: "Meridian Mezzanine Partners", profile: "Dette subordonnée (mezzanine)",
    maxLeverage: 0.95, rate: 0.135,
    description: "Accessible même à levier déjà élevé — coûteux, réservé aux montages les plus tendus.",
  },
];

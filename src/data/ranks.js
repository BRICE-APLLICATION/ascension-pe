export const RANKS = [
  { name: "Analyste", threshold: 0, domain: "Analyse & due diligence", salary: 85000, bonus: 12000 },
  { name: "Associé", threshold: 120, domain: "Recommandation d'investissement", salary: 130000, bonus: 35000 },
  { name: "Vice-Président", threshold: 280, domain: "Décision d'investissement", salary: 210000, bonus: 85000 },
  { name: "Principal", threshold: 480, domain: "Cession d'entreprise", salary: 300000, bonus: 160000 },
  { name: "Partner", threshold: 720, domain: "Stratégie, embauche & M&A", salary: 420000, bonus: 320000 },
];

// Rang à partir duquel le joueur passe de "proposer" à "investir réellement" (VP+).
export const DIRECTORIAL_RANK = 2;

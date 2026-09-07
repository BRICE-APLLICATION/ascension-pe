// Chaque risque caché n'est jamais visible dans la fiche financière initiale — c'est le principe
// de la Priorité 1 de la roadmap : une analyse rigoureuse peut quand même mal tourner, et une
// structure agressive ne fait qu'augmenter la probabilité que le risque se matérialise (jamais 100%).
export const ACQUISITION_POOL = [
  { id: "nova", name: "NovaFleet Logistics", sector: "Transport", revenue: 45, ebitda: 8, margin: 18, growth: 9, debtExisting: 2, concentration: 25, compRange: "6x–7x",
    hiddenRisk: {
      id: "nova-client-exit", label: "Concentration client non déclarée", category: "commerciale",
      description: "Deux clients non repris dans le taux de concentration affiché, représentant 30% du chiffre d'affaires réel, résilient leur contrat suite au rachat d'un concurrent par un rival.",
      baseProbability: 0.3, revealDelayRange: [2, 4], valueImpactRange: [-0.3, -0.15], scoreImpact: -5,
    },
    proposals: [
      { id: "a", label: "Multiple 5,0x, levier 30% (trop prudent)", correct: false, xp: 15, multiple: 5, leverage: 0.3, feedback: "Prix bas, mais Carl Capital risque de perdre le deal sans réel avantage de risque réduit." },
      { id: "b", label: "Multiple 6,5x, levier 55%", correct: true, xp: 55, multiple: 6.5, leverage: 0.55, feedback: "Aligné avec les comparables et une capacité de remboursement confortable." },
      { id: "c", label: "Multiple 8,0x, levier 70%", correct: false, xp: 10, multiple: 8, leverage: 0.7, feedback: "Trop élevé pour un secteur à croissance modérée (9%)." },
    ] },
  { id: "ferro", name: "Ferro Data Systems", sector: "Logiciel B2B", revenue: 22, ebitda: 5, margin: 23, growth: 24, debtExisting: 0.5, concentration: 15, compRange: "9x–11x",
    note: "Profil similaire au dossier RH analysé dans vos cas de due diligence.",
    hiddenRisk: {
      id: "ferro-key-person", label: "Départ du fondateur-CTO", category: "operationnelle",
      description: "Le fondateur-CTO, seul détenteur du savoir-faire technique critique de la plateforme, quitte l'entreprise six mois après le closing pour rejoindre un concurrent.",
      baseProbability: 0.3, revealDelayRange: [2, 3], valueImpactRange: [-0.35, -0.2], scoreImpact: -6,
    },
    proposals: [
      { id: "a", label: "Multiple 9,5x, levier 35%", correct: true, xp: 55, multiple: 9.5, leverage: 0.35, feedback: "Le levier modéré laisse de la marge pour financer la croissance rapide (24%)." },
      { id: "b", label: "Multiple 7,0x, levier 30%", correct: false, xp: 15, multiple: 7, leverage: 0.3, feedback: "Sous-évalué par rapport aux comparables (9x–11x) : risque de perdre le deal." },
      { id: "c", label: "Multiple 9,5x, levier 65%", correct: false, xp: 10, multiple: 9.5, leverage: 0.65, feedback: "Levier élevé limite la capacité de réinvestir dans la croissance." },
    ] },
  { id: "cascade", name: "Cascade Outdoor Retail", sector: "Retail", revenue: 20, ebitda: 3, margin: 15, growth: 4, debtExisting: 1, concentration: 10, compRange: "4x–5x",
    hiddenRisk: {
      id: "cascade-supplier", label: "Dépendance fournisseur non couverte", category: "financiere",
      description: "Le principal fournisseur, non identifié comme risque en data room, augmente ses prix de 12% après le closing, sans clause de plafonnement au contrat.",
      baseProbability: 0.28, revealDelayRange: [1, 3], valueImpactRange: [-0.25, -0.1], scoreImpact: -4,
    },
    proposals: [
      { id: "a", label: "Multiple 4,5x, levier 40%", correct: true, xp: 50, multiple: 4.5, leverage: 0.4, feedback: "Structure prudente adaptée à une croissance faible et une marge mince." },
      { id: "b", label: "Multiple 6,0x, levier 60%", correct: false, xp: 10, multiple: 6, leverage: 0.6, feedback: "Le secteur ne justifie pas une prime ni un levier élevé." },
      { id: "c", label: "Multiple 4,5x, levier 75%", correct: false, xp: 15, multiple: 4.5, leverage: 0.75, feedback: "Levier risqué vu la marge mince : service de la dette fragile." },
    ] },
  { id: "northline", name: "Northline Foods", sector: "Agroalimentaire", revenue: 38, ebitda: 6, margin: 16, growth: 7, debtExisting: 1.5, concentration: 60, compRange: "5x–6x",
    note: "Profil proche du cas de concentration client que vous traiterez au rang Vice-Président.",
    hiddenRisk: {
      id: "northline-margin", label: "Marge temporairement gonflée", category: "fiscale",
      description: "La marge EBITDA affichée intégrait un crédit fiscal ponctuel non reconductible, non signalé en data room : la marge normalisée retombe sous les attentes du modèle.",
      baseProbability: 0.32, revealDelayRange: [2, 4], valueImpactRange: [-0.28, -0.12], scoreImpact: -5,
    },
    proposals: [
      { id: "a", label: "Multiple 5,5x sans condition particulière", correct: false, xp: 15, multiple: 5.5, leverage: 0.45, feedback: "Vous ignorez la concentration client de 60% : risque non traité." },
      { id: "b", label: "Multiple 5,0x avec garantie de revenu client", correct: true, xp: 60, multiple: 5, leverage: 0.45, feedback: "La garantie protège Carl Capital contre le risque de concentration identifié." },
      { id: "c", label: "Multiple 7,0x pour emporter le deal rapidement", correct: false, xp: 10, multiple: 7, leverage: 0.5, feedback: "Payer une prime sans traiter le risque est la pire des options." },
    ] },
  { id: "argent", name: "Argent Health Clinics", sector: "Santé", revenue: 55, ebitda: 10, margin: 18, growth: 20, debtExisting: 0.8, concentration: 12, compRange: "9x–10x",
    hiddenRisk: {
      id: "argent-regulatory", label: "Changement réglementaire à l'étude", category: "legale",
      description: "Un projet de plafonnement des tarifs facturés aux patients, à l'étude au moment du closing mais non public, est adopté et comprime durablement les marges.",
      baseProbability: 0.25, revealDelayRange: [3, 5], valueImpactRange: [-0.22, -0.1], scoreImpact: -4,
    },
    proposals: [
      { id: "a", label: "Multiple 9,5x, levier 50%", correct: true, xp: 55, multiple: 9.5, leverage: 0.5, feedback: "Aligné avec la forte croissance et la stabilité réglementaire du secteur." },
      { id: "b", label: "Multiple 7,0x, levier 30%", correct: false, xp: 15, multiple: 7, leverage: 0.3, feedback: "Trop bas par rapport aux comparables : offre non compétitive." },
      { id: "c", label: "Multiple 9,5x, levier 75%", correct: false, xp: 10, multiple: 9.5, leverage: 0.75, feedback: "Trop agressif pour un secteur sensible aux changements réglementaires." },
    ] },
  { id: "boreal", name: "Boreal Materials", sector: "Industriel", revenue: 30, ebitda: 4, margin: 13, growth: 3, debtExisting: 2.5, concentration: 30, compRange: "5,5x–6,5x",
    hiddenRisk: {
      id: "boreal-environmental", label: "Litige environnemental non provisionné", category: "environnementale",
      description: "Une contamination de sol sur un site industriel, non provisionnée dans les états financiers, déclenche une mise en demeure environnementale après le closing.",
      baseProbability: 0.27, revealDelayRange: [2, 5], valueImpactRange: [-0.3, -0.12], scoreImpact: -5,
    },
    proposals: [
      { id: "a", label: "Multiple 6,0x, levier 25%", correct: true, xp: 50, multiple: 6, leverage: 0.25, feedback: "Levier prudent justifié par l'endettement déjà élevé de la cible." },
      { id: "b", label: "Multiple 6,0x, levier 55%", correct: false, xp: 15, multiple: 6, leverage: 0.55, feedback: "Ajouter un levier important à une cible déjà endettée (2,5x) est risqué." },
      { id: "c", label: "Multiple 4,5x, levier 25%", correct: false, xp: 20, multiple: 4.5, leverage: 0.25, feedback: "Sous-évalue la cible par rapport aux comparables : risque de perdre le deal." },
    ] },
  { id: "meridian-labs", name: "Meridian Diagnostic Labs", sector: "Santé", revenue: 41, ebitda: 7, margin: 17, growth: 11, debtExisting: 1.2, concentration: 20, compRange: "7x–8x",
    hiddenRisk: {
      id: "meridian-billing", label: "Pratiques de facturation contestables", category: "legale",
      description: "Un audit interne non partagé en data room révèle des pratiques de facturation à l'assurance publique jugées agressives, exposant la cible à un redressement après le closing.",
      baseProbability: 0.26, revealDelayRange: [2, 4], valueImpactRange: [-0.25, -0.1], scoreImpact: -4,
    },
    proposals: [
      { id: "a", label: "Multiple 7,5x, levier 40%", correct: true, xp: 55, multiple: 7.5, leverage: 0.4, feedback: "Cohérent avec les comparables et un levier laissant de la marge en cas de redressement." },
      { id: "b", label: "Multiple 6,0x, levier 30%", correct: false, xp: 15, multiple: 6, leverage: 0.3, feedback: "Sous-évalué par rapport aux comparables (7x–8x) : offre peu compétitive." },
      { id: "c", label: "Multiple 7,5x, levier 65%", correct: false, xp: 10, multiple: 7.5, leverage: 0.65, feedback: "Levier trop élevé si un redressement fiscal ou légal survient après le closing." },
    ] },
  { id: "vantage-freight", name: "Vantage Freight Solutions", sector: "Transport", revenue: 33, ebitda: 5, margin: 15, growth: 6, debtExisting: 1.8, concentration: 18, compRange: "5x–6x",
    hiddenRisk: {
      id: "vantage-fleet", label: "Flotte vieillissante sous-provisionnée", category: "operationnelle",
      description: "Une part significative de la flotte de camions approche la fin de vie utile sans budget de renouvellement provisionné, forçant un capex imprévu peu après l'acquisition.",
      baseProbability: 0.3, revealDelayRange: [1, 3], valueImpactRange: [-0.2, -0.1], scoreImpact: -4,
    },
    proposals: [
      { id: "a", label: "Multiple 5,5x, levier 35%", correct: true, xp: 50, multiple: 5.5, leverage: 0.35, feedback: "Levier prudent qui laisse de la capacité pour un capex de renouvellement imprévu." },
      { id: "b", label: "Multiple 5,5x, levier 60%", correct: false, xp: 15, multiple: 5.5, leverage: 0.6, feedback: "Un levier élevé combiné à un capex de flotte imprévu fragilise le service de la dette." },
      { id: "c", label: "Multiple 7,0x, levier 35%", correct: false, xp: 10, multiple: 7, leverage: 0.35, feedback: "Prime injustifiée pour un secteur à croissance modérée (6%)." },
    ] },
  { id: "brightline-media", name: "Brightline Media Group", sector: "Médias", revenue: 18, ebitda: 4, margin: 22, growth: 15, debtExisting: 0.4, concentration: 22, compRange: "8x–9,5x",
    hiddenRisk: {
      id: "brightline-contract", label: "Clause de résiliation méconnue", category: "commerciale",
      description: "Le contrat-cadre avec son plus gros diffuseur partenaire contient une clause de résiliation anticipée en cas de changement de contrôle, non signalée en data room.",
      baseProbability: 0.29, revealDelayRange: [2, 3], valueImpactRange: [-0.3, -0.15], scoreImpact: -5,
    },
    proposals: [
      { id: "a", label: "Multiple 8,5x, levier 35%", correct: true, xp: 55, multiple: 8.5, leverage: 0.35, feedback: "Prix dans la fourchette des comparables, levier modéré vu le risque de résiliation." },
      { id: "b", label: "Multiple 7,0x, levier 30%", correct: false, xp: 15, multiple: 7, leverage: 0.3, feedback: "Sous-évalué par rapport aux comparables (8x–9,5x) : risque de perdre le deal." },
      { id: "c", label: "Multiple 9,5x, levier 60%", correct: false, xp: 10, multiple: 9.5, leverage: 0.6, feedback: "Trop agressif vu le risque de perte d'un partenaire majeur après un changement de contrôle." },
    ] },
  { id: "solaris-parts", name: "Solaris Auto Parts", sector: "Industriel", revenue: 27, ebitda: 4.5, margin: 16, growth: 5, debtExisting: 1.6, concentration: 35, compRange: "5x–6x",
    hiddenRisk: {
      id: "solaris-inventory", label: "Stock obsolète surévalué", category: "financiere",
      description: "Une part importante du stock inscrit au bilan correspond à des pièces obsolètes invendables, gonflant artificiellement l'actif net présenté en data room.",
      baseProbability: 0.28, revealDelayRange: [1, 3], valueImpactRange: [-0.22, -0.1], scoreImpact: -4,
    },
    proposals: [
      { id: "a", label: "Multiple 5,5x, levier 30%", correct: true, xp: 50, multiple: 5.5, leverage: 0.3, feedback: "Structure prudente qui absorbe une éventuelle dépréciation de stock sans fragiliser la dette." },
      { id: "b", label: "Multiple 6,5x, levier 55%", correct: false, xp: 10, multiple: 6.5, leverage: 0.55, feedback: "Prime et levier élevés alors que l'actif net réel est probablement surévalué." },
      { id: "c", label: "Multiple 4,0x, levier 30%", correct: false, xp: 15, multiple: 4, leverage: 0.3, feedback: "Sous-évalue la cible par rapport aux comparables : risque de perdre le deal." },
    ] },
  { id: "harborview-hospitality", name: "Harborview Hospitality", sector: "Hôtellerie", revenue: 36, ebitda: 6, margin: 17, growth: 8, debtExisting: 2, concentration: 15, compRange: "6x–7x",
    hiddenRisk: {
      id: "harborview-tax", label: "Redressement fiscal municipal en cours", category: "fiscale",
      description: "Une réévaluation de la taxe foncière municipale, en cours d'appel au moment du closing mais non mentionnée en data room, se solde par un redressement rétroactif.",
      baseProbability: 0.3, revealDelayRange: [2, 4], valueImpactRange: [-0.25, -0.12], scoreImpact: -4,
    },
    proposals: [
      { id: "a", label: "Multiple 6,5x, levier 35%", correct: true, xp: 50, multiple: 6.5, leverage: 0.35, feedback: "Levier modéré qui laisse une marge de sécurité face à un redressement fiscal potentiel." },
      { id: "b", label: "Multiple 6,5x, levier 60%", correct: false, xp: 15, multiple: 6.5, leverage: 0.6, feedback: "Levier trop élevé si un redressement fiscal rétroactif survient après le closing." },
      { id: "c", label: "Multiple 8,0x, levier 35%", correct: false, xp: 10, multiple: 8, leverage: 0.35, feedback: "Prime injustifiée par rapport aux comparables (6x–7x)." },
    ] },
  { id: "greenfield-agri", name: "Greenfield AgriTech", sector: "Agroalimentaire", revenue: 24, ebitda: 4, margin: 17, growth: 13, debtExisting: 0.9, concentration: 28, compRange: "7x–8,5x",
    hiddenRisk: {
      id: "greenfield-permit", label: "Permis d'exploitation contesté", category: "environnementale",
      description: "Un recours citoyen contre le permis d'utilisation d'eau de l'un des sites de production, déposé avant le closing mais tenu confidentiel, aboutit à une suspension temporaire d'activité.",
      baseProbability: 0.25, revealDelayRange: [3, 5], valueImpactRange: [-0.28, -0.12], scoreImpact: -5,
    },
    proposals: [
      { id: "a", label: "Multiple 7,5x, levier 35%", correct: true, xp: 55, multiple: 7.5, leverage: 0.35, feedback: "Cohérent avec la forte croissance (13%) tout en gardant une marge de sécurité sur le levier." },
      { id: "b", label: "Multiple 6,0x, levier 30%", correct: false, xp: 15, multiple: 6, leverage: 0.3, feedback: "Sous-évalué par rapport aux comparables (7x–8,5x) : offre peu compétitive." },
      { id: "c", label: "Multiple 8,5x, levier 65%", correct: false, xp: 10, multiple: 8.5, leverage: 0.65, feedback: "Levier trop élevé si une suspension d'activité réduit temporairement les flux de trésorerie." },
    ] },
];

// Événements macro : contrairement aux risques cachés propres à chaque cible d'acquisition, ces
// événements touchent tout le marché à la fois — occasionnels et temporaires, jamais permanents,
// pour rester marquants sans devenir le bruit de fond de chaque trimestre.
export const MACRO_EVENT_CHANCE = 0.15; // par trimestre, seulement si aucun événement n'est déjà actif
export const MACRO_EVENT_DURATION = [2, 4]; // trimestres, bornes incluses

export const MACRO_EVENTS = {
  recession: {
    label: "Récession",
    startNews: (q) => `T${q} — Récession : les indicateurs macroéconomiques se dégradent, le marché du PE ralentit.`,
    endNews: (q) => `T${q} — La récession se résorbe : le marché retrouve un rythme normal.`,
    scoreDrift: -3,
    feeMultiplier: 0.85,
    leverageDelta: 0,
    rateDelta: 0,
  },
  boom: {
    label: "Boom sectoriel",
    startNews: (q) => `T${q} — Boom sectoriel : l'activité s'accélère, les opportunités de deals se multiplient.`,
    endNews: (q) => `T${q} — Le boom sectoriel s'essouffle : le marché revient à un rythme de croisière.`,
    scoreDrift: 3,
    feeMultiplier: 1.15,
    leverageDelta: 0,
    rateDelta: 0,
  },
  rateHike: {
    label: "Hausse des taux",
    startNews: (q) => `T${q} — Hausse des taux directeurs : les banques resserrent leurs conditions de financement.`,
    endNews: (q) => `T${q} — Les taux se stabilisent : les conditions de financement redeviennent normales.`,
    scoreDrift: 0,
    feeMultiplier: 1,
    leverageDelta: -0.15,
    rateDelta: 0.02,
  },
};

export const MACRO_EVENT_KEYS = Object.keys(MACRO_EVENTS);

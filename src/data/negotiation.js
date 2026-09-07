import { clamp } from "../lib/utils.js";

// Négociation salariale sans appel externe : entièrement pilotée par des formules sur des données
// déjà présentes dans le jeu (XP, deals, score des firmes, dimensions de carrière). Remplace la
// version "IA" initialement envisagée — voir l'addendum de révision pour le contexte.
export const POSTURES = {
  prudente: { label: "Prudente", pct: 0.06, description: "Un ajustement modeste au-dessus de l'offre affichée." },
  alignee: { label: "Alignée sur le marché", pct: 0.14, description: "Un ajustement moyen, dans la fourchette du marché." },
  agressive: { label: "Agressive", pct: 0.28, description: "Un ajustement important — quitte à risquer un blocage." },
};

export const MAX_ROUNDS = 3;
const IMPATIENCE_PENALTY_PER_ROUND = 15;

export function computePlayerLeverage({ progressPct, dealsReviewed, currentFirmScore, careerScore }) {
  return clamp(
    progressPct * 0.25 + clamp(dealsReviewed * 1.5, 0, 30) + currentFirmScore * 0.25 + careerScore * 0.2,
    0, 100
  );
}

export function computeFirmFlexibility({ targetFirm }) {
  const cashNorm = clamp(((targetFirm.cash || 0) / 20) * 100, 0, 100);
  const lpNorm = clamp(((targetFirm.lpCommitted || 0) / 300) * 100, 0, 100);
  return clamp(targetFirm.score * 0.5 + cashNorm * 0.2 + lpNorm * 0.3, 0, 100);
}

// bump_obtenu = f(playerLeverage, firmFlexibility, ampleur de la demande) — jamais un tirage au sort
// déconnecté : une demande prudente passe presque toujours, une demande agressive n'aboutit que si
// le rapport de force la soutient réellement.
export function computeNegotiationRound({ playerLeverage, firmFlexibility, round, requestedBumpPct }) {
  const effectiveFlexibility = clamp(firmFlexibility - IMPATIENCE_PENALTY_PER_ROUND * (round - 1), 0, 100);
  const leverageProduct = (playerLeverage / 100) * (effectiveFlexibility / 100);
  const realisticCeilingPct = leverageProduct * 0.4;
  const requestRatio = requestedBumpPct / Math.max(0.01, realisticCeilingPct);

  let band, grantedFraction;
  if (requestRatio <= 1.0) { band = "genereuse"; grantedFraction = 0.95; }
  else if (requestRatio <= 1.8) { band = "compromis"; grantedFraction = 0.55; }
  else if (requestRatio <= 3.0) { band = "minimale"; grantedFraction = 0.2; }
  else { band = "blocage"; grantedFraction = 0; }

  return { band, grantedBumpPct: +(requestedBumpPct * grantedFraction).toFixed(3) };
}

export const BAND_TEXTS = {
  genereuse: [
    "accepte votre demande avec enthousiasme : votre profil a manifestement fait forte impression.",
    "valide votre proposition sans discussion — signe que votre dossier a parlé de lui-même.",
    "vous surprend en acceptant l'essentiel de votre demande : ils ne voulaient visiblement pas risquer de vous voir décliner.",
  ],
  compromis: [
    "ne peut pas aller jusqu'à votre demande initiale, mais revient avec une contre-proposition sérieuse.",
    "propose, après discussion interne, un compromis raisonnable — ni tout à fait ce que vous vouliez, ni un refus.",
    "rencontre votre demande à mi-chemin, en invoquant des contraintes budgétaires du trimestre.",
  ],
  minimale: [
    "concède un ajustement symbolique, en rappelant que le poste reste attractif tel quel.",
    "dispose d'une marge de manœuvre limitée cette année — l'offre bouge à peine.",
    "accepte un geste minime, plus pour clore la discussion que par conviction.",
  ],
  blocage: [
    "campe fermement sur son offre initiale : votre demande est jugée déconnectée du poste proposé.",
    "referme la discussion : l'écart est trop important pour être comblé cette fois-ci.",
    "ne bouge pas d'un centime — à ce niveau de demande, ils préfèrent risquer de vous perdre.",
  ],
};

// Le poste de CEO n'apparaît jamais dans le marché de l'emploi : les critères d'éligibilité sont
// calculés en arrière-plan (voir computeCareerProfile) et jamais montrés au joueur — seule
// l'opportunité, rare et non garantie, se matérialise sous forme d'email confidentiel.
export const CEO_COMP = { salary: 650000, bonus: 900000 };

const COOLDOWN_QUARTERS = 3;

export function maybeGenerateCeoOffer({ rankIndex, careerProfile, hasPendingOffer, quarter, lastOfferQuarter, ceoFirmId, currentFirmId, firms }) {
  if (rankIndex < 4) return null;
  if (ceoFirmId) return null;
  if (hasPendingOffer) return null;
  if (quarter - lastOfferQuarter < COOLDOWN_QUARTERS) return null;

  const internalEligible = careerProfile.careerScore >= 78 && careerProfile.riskManagement >= 60;
  const externalEligible = careerProfile.careerScore >= 85 && careerProfile.networking >= 65;
  if (!internalEligible && !externalEligible) return null;

  let mode;
  if (internalEligible && externalEligible) {
    mode = Math.random() < 0.7 ? "internal" : "external";
  } else {
    mode = internalEligible ? "internal" : "external";
  }

  const chance = mode === "internal" ? 0.35 : 0.25;
  if (Math.random() >= chance) return null;

  if (mode === "internal") {
    return { mode, firmId: currentFirmId };
  }
  const candidates = firms.filter((f) => f.id !== currentFirmId);
  if (candidates.length === 0) return null;
  const target = candidates[Math.floor(Math.random() * candidates.length)];
  return { mode, firmId: target.id };
}

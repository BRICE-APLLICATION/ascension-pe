import { PALETTE } from "../../data/palette.js";
import { JOB_MARKET_FIRM_IDS, CEO_NAMES, getStaff } from "../../data/firms.js";
import { firmCompMultiplier } from "../../data/ranks.js";
import { fmtMoney } from "../../lib/utils.js";

export default function JobsTab({
  currentFirmId, firms, rankIndex, currentRank, applicationResult, setApplicationResult,
  viewingOfferId, setViewingOfferId, confirmApplication,
}) {
  return (
    <div className="max-w-2xl flex flex-col gap-3">
      {applicationResult && (
        <div className="p-4 rounded flex flex-col gap-2" style={{ backgroundColor: applicationResult.success ? "rgba(91,140,136,0.15)" : "rgba(166,68,76,0.15)", border: `1px solid ${applicationResult.success ? PALETTE.teal : PALETTE.crimson}` }}>
          <p className="text-sm">{applicationResult.message}</p>
          <button onClick={() => setApplicationResult(null)} className="text-xs self-start" style={{ color: PALETTE.textMuted }}>Fermer</button>
        </div>
      )}
      <p className="text-xs mb-1" style={{ color: PALETTE.textMuted }}>Postes ouverts dans d'autres fonds, équivalents à votre rang actuel.</p>
      {JOB_MARKET_FIRM_IDS.filter((id) => id !== currentFirmId).map((id) => {
        const firm = firms.find((f) => f.id === id);
        if (!firm) return null;
        const s = getStaff(id, rankIndex, firms);
        const viewing = viewingOfferId === id;
        return (
          <div key={id} className="p-4 rounded" style={{ backgroundColor: PALETTE.panel, border: `1px solid ${PALETTE.line}` }}>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div><p className="text-sm" style={{ fontWeight: 600 }}>{firm.name}</p><p className="text-xs" style={{ color: PALETTE.textMuted }}>PDG {CEO_NAMES[id]} · Supérieur direct {s.superior} ({s.superiorTitle}) · Rival au poste {s.rival}</p></div>
              {!viewing && <button onClick={() => setViewingOfferId(id)} className="px-3 py-1.5 rounded text-xs" style={{ backgroundColor: PALETTE.panelAlt, color: PALETTE.gold }}>Voir le poste</button>}
            </div>
            {viewing && (
              <div className="mt-3 p-3 rounded text-xs" style={{ backgroundColor: PALETTE.panelAlt }}>
                <p style={{ fontWeight: 600, color: PALETTE.textPrimary }}>{currentRank.name} — {currentRank.domain}</p>
                <p className="mt-1" style={{ color: PALETTE.textMuted }}>{firm.name} recherche un(e) {currentRank.name} pour renforcer son équipe « {currentRank.domain} », sous la supervision de {s.superior} ({s.superiorTitle}).</p>
                <p className="mt-1" style={{ color: PALETTE.textMuted, fontFamily: "'IBM Plex Mono', monospace" }}>~{fmtMoney((currentRank.salary + currentRank.bonus) * firmCompMultiplier(firm.score) * 1.05)} $ CAD/an</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => confirmApplication(id)} className="px-3 py-1.5 rounded" style={{ backgroundColor: PALETTE.gold, color: PALETTE.bg }}>Confirmer ma candidature</button>
                  <button onClick={() => setViewingOfferId(null)} className="px-3 py-1.5 rounded" style={{ backgroundColor: PALETTE.panel, color: PALETTE.textMuted }}>Annuler</button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

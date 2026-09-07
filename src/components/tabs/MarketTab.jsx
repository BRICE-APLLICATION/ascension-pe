import { Building2 } from "lucide-react";
import { PALETTE } from "../../data/palette.js";
import { CEO_NAMES } from "../../data/firms.js";

export default function MarketTab({ marketSorted, currentFirm, currentFirmId, rankIndex, goPublic, launchTakeover, ceoFirmId, ownFirmId, playerName }) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs mb-4" style={{ color: PALETTE.textMuted }}>{marketSorted.length} fonds actifs sur le marché canadien du PE.</p>
      {currentFirm.score >= 75 && !currentFirm.public && <button onClick={goPublic} className="mb-4 px-4 py-2 rounded text-sm" style={{ backgroundColor: PALETTE.gold, color: PALETTE.bg }}>Introduire {currentFirm.name} en bourse</button>}
      <div className="flex flex-col gap-3">
        {marketSorted.map((f, i) => (
          <div key={f.id} className="p-4 rounded" style={{ backgroundColor: f.id === currentFirmId ? PALETTE.panelAlt : PALETTE.panel, border: `1px solid ${f.id === currentFirmId ? PALETTE.gold : PALETTE.line}` }}>
            <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
              <div className="flex items-center gap-2"><span className="text-xs w-5" style={{ color: PALETTE.textMuted, fontFamily: "'IBM Plex Mono', monospace" }}>{i + 1}.</span><Building2 size={14} color={f.id === currentFirmId ? PALETTE.gold : PALETTE.textMuted} /><span style={{ fontWeight: f.id === currentFirmId ? 600 : 400 }}>{f.name}</span>{f.public && <span className="text-xs" style={{ color: PALETTE.teal }}>· coté {f.stockPrice} $</span>}</div>
              <span className="text-xs" style={{ color: PALETTE.textMuted }}>{f.employees} employés · score {f.score}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs mb-2" style={{ color: PALETTE.textMuted }}>PDG : {(f.id === ceoFirmId || f.id === ownFirmId) ? playerName : (CEO_NAMES[f.id] || "—")}</p>
              {rankIndex === 4 && f.id !== currentFirmId && (
                <button onClick={() => launchTakeover(f.id)} className="text-xs px-2 py-1 rounded mb-2" style={{ backgroundColor: PALETTE.panelAlt, color: PALETTE.crimson, border: `1px solid ${PALETTE.crimson}` }}>Lancer une OPA (~{Math.max(5, Math.round(f.score * 0.6))} M$)</button>
              )}
            </div>
            <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: PALETTE.line }}><div className="h-full" style={{ width: `${f.score}%`, backgroundColor: f.id === currentFirmId ? PALETTE.gold : PALETTE.teal }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

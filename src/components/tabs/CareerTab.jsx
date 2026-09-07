import { PALETTE } from "../../data/palette.js";
import { fmtMoney } from "../../lib/utils.js";
import { getCompForRole } from "../../lib/compensation.js";

export default function CareerTab({ playerName, year, careerHistory, grossTotal, netTotal, endgamePath }) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs mb-4" style={{ color: PALETTE.textMuted }}>Parcours de {playerName} — Année {year}</p>
      {endgamePath && (
        <div className="mb-4 p-3 rounded text-xs" style={{ backgroundColor: PALETTE.panelAlt, border: `1px solid ${PALETTE.gold}`, color: PALETTE.gold }}>{endgamePath.label}</div>
      )}
      <div className="flex flex-col gap-2 mb-6">
        {careerHistory.map((h, i) => { const r = getCompForRole(h.role); const gross = r.salary + r.bonus, net = Math.round(gross * 0.62); return (
          <div key={i} className="p-3 rounded flex items-center justify-between flex-wrap gap-2" style={{ backgroundColor: PALETTE.panel }}>
            <div><p className="text-sm">{h.role} — {h.firmName}</p><p className="text-xs" style={{ color: PALETTE.textMuted }}>Année {h.year}</p></div>
            <div className="text-xs text-right" style={{ fontFamily: "'IBM Plex Mono', monospace" }}><p>Brut : {fmtMoney(gross)} $</p><p style={{ color: PALETTE.textMuted }}>Net (est.) : {fmtMoney(net)} $</p></div>
          </div>
        ); })}
      </div>
      <div className="p-4 rounded" style={{ backgroundColor: PALETTE.panelAlt, border: `1px solid ${PALETTE.gold}` }}>
        <p className="text-xs mb-1" style={{ color: PALETTE.textMuted }}>Revenus cumulés sur la carrière</p>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace" }}>Brut total : {fmtMoney(grossTotal)} $ CAD</p>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", color: PALETTE.textMuted }}>Net total (estimé) : {fmtMoney(netTotal)} $ CAD</p>
      </div>
    </div>
  );
}

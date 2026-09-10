import { PALETTE } from "../../data/palette.js";
import { fmtMoney } from "../../lib/utils.js";
import { getGrossForEntry } from "../../lib/compensation.js";
import CareerSummaryCard from "../CareerSummaryCard.jsx";

export default function CareerTab({ playerName, year, quarter, careerHistory, grossTotal, netTotal, endgamePath, currentRoleLabel, currentFirmName, portfolio, reputation }) {
  const equityTotal = careerHistory.reduce((sum, h) => sum + (h.equityFirmId ? (h.equityValue || 0) : 0), 0);
  const cashTotal = grossTotal - equityTotal;

  const byFirm = {};
  for (const h of careerHistory) {
    byFirm[h.firmName] = (byFirm[h.firmName] || 0) + getGrossForEntry(h);
  }
  const byYear = {};
  for (const h of careerHistory) {
    byYear[h.year] = (byYear[h.year] || 0) + getGrossForEntry(h);
  }
  const notableDeals = [...(portfolio || [])].sort((a, b) => (b.value - b.invested) - (a.value - a.invested)).slice(0, 3);

  return (
    <div className="max-w-2xl">
      <p className="text-xs mb-4" style={{ color: PALETTE.textMuted }}>Parcours de {playerName} — Année {year}</p>
      <CareerSummaryCard
        cardData={{
          playerName, year, quarter, currentRoleLabel, currentFirmName, endgamePath, careerHistory,
          grossTotal, netTotal, cashTotal, equityTotal, notableDeals, reputation,
        }}
      />
      {endgamePath && (
        <div className="mb-4 p-3 rounded text-xs" style={{ backgroundColor: PALETTE.panelAlt, border: `1px solid ${PALETTE.gold}`, color: PALETTE.gold }}>{endgamePath.label}</div>
      )}
      <div className="flex flex-col gap-2 mb-6">
        {careerHistory.map((h, i) => { const gross = getGrossForEntry(h), net = Math.round(gross * 0.62); const equityDelta = h.equityFirmId ? h.equityValue - (h.equityInitialValue ?? h.equityValue) : 0; return (
          <div key={i} className="p-3 rounded" style={{ backgroundColor: PALETTE.panel }}>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div><p className="text-sm">{h.role} — {h.firmName}{h.equityFirmId && <span style={{ color: PALETTE.gold }}> · partie en actions</span>}</p><p className="text-xs" style={{ color: PALETTE.textMuted }}>Année {h.year}</p></div>
              <div className="text-xs text-right" style={{ fontFamily: "'IBM Plex Mono', monospace" }}><p>Brut : {fmtMoney(gross)} $</p><p style={{ color: PALETTE.textMuted }}>Net (est.) : {fmtMoney(net)} $</p></div>
            </div>
            {h.equityFirmId && (
              <p className="text-xs mt-2 pt-2" style={{ borderTop: `1px solid ${PALETTE.line}`, color: equityDelta >= 0 ? PALETTE.teal : PALETTE.crimson }}>
                Actions {h.firmName} : {fmtMoney(h.equityValue)} $ actuellement (grant initial {fmtMoney(h.equityInitialValue ?? h.equityValue)} $, {equityDelta >= 0 ? "+" : ""}{fmtMoney(equityDelta)} $)
              </p>
            )}
          </div>
        ); })}
      </div>
      <div className="p-4 rounded mb-4" style={{ backgroundColor: PALETTE.panelAlt, border: `1px solid ${PALETTE.gold}` }}>
        <p className="text-xs mb-1" style={{ color: PALETTE.textMuted }}>Revenus cumulés sur la carrière</p>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace" }}>Brut total : {fmtMoney(grossTotal)} $ CAD</p>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", color: PALETTE.textMuted }}>Net total (estimé) : {fmtMoney(netTotal)} $ CAD</p>
        {equityTotal > 0 && (
          <p className="text-xs mt-2 pt-2" style={{ borderTop: `1px solid ${PALETTE.line}`, color: PALETTE.textMuted, fontFamily: "'IBM Plex Mono', monospace" }}>
            Dont cash : {fmtMoney(cashTotal)} $ · actions : {fmtMoney(equityTotal)} $
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3 rounded" style={{ backgroundColor: PALETTE.panel }}>
          <p className="text-xs mb-2" style={{ color: PALETTE.textMuted }}>Par firme</p>
          {Object.entries(byFirm).map(([name, total]) => (
            <div key={name} className="flex items-center justify-between text-xs py-0.5">
              <span>{name}</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{fmtMoney(total)} $</span>
            </div>
          ))}
        </div>
        <div className="p-3 rounded" style={{ backgroundColor: PALETTE.panel }}>
          <p className="text-xs mb-2" style={{ color: PALETTE.textMuted }}>Par année</p>
          {Object.entries(byYear).map(([yr, total]) => (
            <div key={yr} className="flex items-center justify-between text-xs py-0.5">
              <span>Année {yr}</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{fmtMoney(total)} $</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

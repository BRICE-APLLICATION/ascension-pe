import { TrendingUp, Award, BarChart3, RefreshCw } from "lucide-react";
import { PALETTE } from "../data/palette.js";

export default function Header({ playerName, currentFirm, staff, currentRank, isCeo, playerPosition, firmsCount, quarter, advanceQuarter }) {
  return (
    <header className="w-full px-6 py-5 flex items-center justify-between flex-wrap gap-3" style={{ borderBottom: `1px solid ${PALETTE.line}` }}>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 flex items-center justify-center rounded-full" style={{ backgroundColor: PALETTE.goldDim }}><TrendingUp size={18} color={PALETTE.bg} /></div>
        <div>
          <h1 className="text-lg leading-none" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>Ascension</h1>
          <p className="text-xs mt-1" style={{ color: PALETTE.textMuted }}>{playerName} chez {currentFirm.name} · {isCeo ? "Reporte au Conseil d'administration" : `Sup. ${staff.superior} · Rival ${staff.rival}`}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2"><Award size={16} color={PALETTE.gold} /><span style={{ color: PALETTE.gold }}>{isCeo ? "CEO" : currentRank.name}</span></div>
        <div className="flex items-center gap-2"><BarChart3 size={16} color={PALETTE.teal} /><span style={{ color: PALETTE.teal }}>{playerPosition}ᵉ/{firmsCount}</span></div>
        <button onClick={advanceQuarter} className="flex items-center gap-1 px-3 py-1.5 rounded text-xs" style={{ backgroundColor: PALETTE.panel, border: `1px solid ${PALETTE.line}` }}><RefreshCw size={12} /> Avancer d'un trimestre (T{quarter})</button>
      </div>
    </header>
  );
}

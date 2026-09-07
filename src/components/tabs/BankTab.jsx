import { Landmark, Lock } from "lucide-react";
import { PALETTE } from "../../data/palette.js";

export default function BankTab({ dryPowder, isDirectorial, loanLog }) {
  return (
    <div className="max-w-2xl">
      <div className="p-4 rounded mb-4" style={{ backgroundColor: PALETTE.panel }}>
        <div className="flex items-center gap-2 mb-2"><Landmark size={16} color={PALETTE.gold} /><p className="text-sm" style={{ fontWeight: 600 }}>Banque Continentale des Affaires (BCA)</p></div>
        <p className="text-sm">Capital disponible (dry powder) : <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: PALETTE.gold }}>{dryPowder} M$</span></p>
        <p className="text-xs mt-1" style={{ color: PALETTE.textMuted }}>Ratio de levier maximal accordé par la BCA : jusqu'à 6,0x EBITDA selon le profil de risque.</p>
      </div>
      {!isDirectorial && (
        <div className="p-3 rounded flex items-center gap-2 mb-4 text-xs" style={{ backgroundColor: PALETTE.panelAlt, color: PALETTE.textMuted }}><Lock size={14} /> Vous pourrez solliciter des prêts et structurer des investissements à effet de levier à partir du poste de Vice-Président.</div>
      )}
      <p className="text-xs mb-2" style={{ color: PALETTE.textMuted }}>Historique des prêts</p>
      {loanLog.length === 0 ? <p className="text-sm" style={{ color: PALETTE.textMuted }}>Aucun prêt sollicité pour l'instant.</p> : (
        <div className="flex flex-col gap-2">{loanLog.map((l, i) => (<div key={i} className="p-3 rounded text-xs" style={{ backgroundColor: PALETTE.panel, color: PALETTE.textMuted }}>{l}</div>))}</div>
      )}
    </div>
  );
}

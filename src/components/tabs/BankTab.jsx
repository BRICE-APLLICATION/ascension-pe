import { Landmark, Lock } from "lucide-react";
import { PALETTE } from "../../data/palette.js";
import { BANKS } from "../../data/banks.js";

export default function BankTab({ dryPowder, isDirectorial, loanLog, corporateDebt }) {
  return (
    <div className="max-w-2xl">
      <div className="p-4 rounded mb-4" style={{ backgroundColor: PALETTE.panel }}>
        <p className="text-sm">Capital disponible (dry powder) : <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: PALETTE.gold }}>{dryPowder} M$</span></p>
        <p className="text-sm mt-1">Dette corporate cumulée : <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: PALETTE.crimson }}>{corporateDebt} M$</span></p>
      </div>

      <p className="text-xs mb-2" style={{ color: PALETTE.textMuted }}>Prêteurs disponibles</p>
      <div className="flex flex-col gap-2 mb-4">
        {BANKS.map((bank) => (
          <div key={bank.id} className="p-3 rounded" style={{ backgroundColor: PALETTE.panel, border: `1px solid ${PALETTE.line}` }}>
            <div className="flex items-center gap-2 mb-1"><Landmark size={14} color={PALETTE.gold} /><span className="text-sm" style={{ fontWeight: 600 }}>{bank.name}</span></div>
            <p className="text-xs" style={{ color: PALETTE.textMuted }}>{bank.profile} · levier max {Math.round(bank.maxLeverage * 100)}% du prix d'acquisition · taux {(bank.rate * 100).toFixed(1)}%</p>
            <p className="text-xs mt-1" style={{ color: PALETTE.textMuted }}>{bank.description}</p>
          </div>
        ))}
      </div>

      {!isDirectorial && (
        <div className="p-3 rounded flex items-center gap-2 mb-4 text-xs" style={{ backgroundColor: PALETTE.panelAlt, color: PALETTE.textMuted }}><Lock size={14} /> Vous pourrez solliciter des prêts et structurer des investissements à effet de levier à partir du poste de Vice-Président.</div>
      )}
      <p className="text-xs mb-2" style={{ color: PALETTE.textMuted }}>Historique des prêts</p>
      {loanLog.length === 0 ? <p className="text-sm" style={{ color: PALETTE.textMuted }}>Aucun prêt sollicité pour l'instant.</p> : (
        <div className="flex flex-col gap-2">{loanLog.map((l) => (
          <div key={l.id} className="p-3 rounded text-xs" style={{ backgroundColor: PALETTE.panel, color: l.rejected ? PALETTE.crimson : PALETTE.textMuted }}>
            {l.rejected
              ? `T${l.quarter} — ${l.bankName} refuse le financement pour ${l.purpose} : ${l.reason}.`
              : `T${l.quarter} — ${l.bankName} accorde ${l.amount} M$ pour ${l.purpose} (taux ${(l.rate * 100).toFixed(1)}%).`}
          </div>
        ))}</div>
      )}
    </div>
  );
}

import { ArrowUpRight, ArrowDownRight, Clock, AlertTriangle } from "lucide-react";
import { PALETTE } from "../../data/palette.js";
import { ACQUISITION_POOL } from "../../data/acquisitions.js";

export default function AcquisitionsTab({
  isDirectorial, staff, acquisitionSlots, expandedCompanyId, setExpandedCompanyId,
  proposalChoices, chooseProposal, passOn, portfolio, quarter,
}) {
  return (
    <div>
      <p className="text-xs mb-4" style={{ color: PALETTE.textMuted }}>
        {isDirectorial ? "Le marché des acquisitions — structurez et déployez le capital de Carl Capital." : `Le marché où les 20 PE investissent. Avant un poste directionnel, proposez une structure à ${staff.superior} pour gagner de l'XP — sans risque, sans engager de capital.`}
      </p>
      <div className="grid sm:grid-cols-3 gap-4">
        {acquisitionSlots.map((idx) => {
          const c = ACQUISITION_POOL[idx];
          const expanded = expandedCompanyId === c.id;
          const chosen = proposalChoices[c.id];
          return (
            <div key={c.id} className="p-4 rounded" style={{ backgroundColor: PALETTE.panel, border: `1px solid ${PALETTE.line}` }}>
              <p className="text-sm mb-1" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>{c.name}</p>
              <p className="text-xs mb-2" style={{ color: PALETTE.textMuted }}>{c.sector}</p>
              <p className="text-xs" style={{ color: PALETTE.textMuted }}>EBITDA {c.ebitda} M$ · Croissance {c.growth}%</p>
              <button onClick={() => setExpandedCompanyId(expanded ? null : c.id)} className="text-xs mt-2 mb-2" style={{ color: PALETTE.gold }}>{expanded ? "Masquer les données" : "Voir les données"}</button>
              {expanded && (
                <div className="mb-3 p-3 rounded text-xs" style={{ backgroundColor: PALETTE.panelAlt }}>
                  <p style={{ color: PALETTE.textMuted }}>Chiffre d'affaires : {c.revenue} M$</p>
                  <p style={{ color: PALETTE.textMuted }}>Marge EBITDA : {c.margin}%</p>
                  <p style={{ color: PALETTE.textMuted }}>Dette existante : {c.debtExisting}x EBITDA</p>
                  <p style={{ color: PALETTE.textMuted }}>Concentration client : {c.concentration}%</p>
                  <p style={{ color: PALETTE.textMuted }}>Comparables sectoriels : {c.compRange}</p>
                  {c.note && <p className="mt-1" style={{ color: PALETTE.gold }}>{c.note}</p>}
                  <div className="mt-3 flex flex-col gap-2">
                    <p style={{ color: PALETTE.textMuted }}>{isDirectorial ? "Structurer l'investissement :" : `Proposer à ${staff.superior} :`}</p>
                    {c.proposals.map((opt) => {
                      const isSel = chosen === opt.id;
                      return (
                        <button key={opt.id} onClick={() => chooseProposal(idx, opt)} disabled={!!chosen} className="text-left p-2 rounded" style={{ backgroundColor: isSel ? (opt.correct ? "rgba(91,140,136,0.15)" : "rgba(166,68,76,0.15)") : PALETTE.panel, border: `1px solid ${isSel ? (opt.correct ? PALETTE.teal : PALETTE.crimson) : PALETTE.line}`, opacity: chosen && !isSel ? 0.5 : 1 }}>
                          <span>{opt.label}</span>
                          {isSel && <p className="mt-1" style={{ color: PALETTE.textMuted }}>{opt.feedback} <span style={{ color: PALETTE.gold }}>+{opt.xp} XP</span></p>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              <button onClick={() => passOn(idx)} className="w-full px-3 py-1.5 rounded text-xs" style={{ backgroundColor: PALETTE.panelAlt, color: PALETTE.textMuted }}>Ignorer / cible suivante</button>
            </div>
          );
        })}
      </div>
      <p className="text-xs mt-8 mb-3" style={{ color: PALETTE.textMuted }}>Votre portefeuille</p>
      {portfolio.length === 0 ? <p className="text-sm" style={{ color: PALETTE.textMuted }}>Aucune participation pour l'instant.</p> : (
        <div className="flex flex-col gap-2">{portfolio.map((p, i) => {
          const delta = p.value - p.invested;
          const pending = p.pendingRisk && !p.resolvedRisk;
          const quartersLeft = pending ? Math.max(0, p.pendingRisk.revealQuarter - quarter) : 0;
          return (
            <div key={i} className="p-3 rounded" style={{ backgroundColor: PALETTE.panel }}>
              <div className="flex items-center justify-between">
                <span className="text-sm">{p.name}</span>
                <span className="text-xs flex items-center gap-1" style={{ color: delta >= 0 ? PALETTE.teal : PALETTE.crimson, fontFamily: "'IBM Plex Mono', monospace" }}>{delta >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />} {p.value} M$</span>
              </div>
              <div className="mt-1.5">
                {pending && (
                  <span className="text-xs flex items-center gap-1" style={{ color: PALETTE.textMuted }}>
                    <Clock size={11} /> En observation post-acquisition — résultat dans {quartersLeft} trimestre{quartersLeft > 1 ? "s" : ""}
                  </span>
                )}
                {p.resolvedRisk && (
                  <span className="text-xs flex items-start gap-1" style={{ color: PALETTE.crimson }}>
                    <AlertTriangle size={11} className="mt-0.5 shrink-0" /> Risque révélé : {p.resolvedRisk.description}
                  </span>
                )}
                {!pending && !p.resolvedRisk && (
                  <span className="text-xs" style={{ color: PALETTE.textMuted }}>Aucun risque caché détecté à ce jour.</span>
                )}
              </div>
            </div>
          );
        })}</div>
      )}
    </div>
  );
}

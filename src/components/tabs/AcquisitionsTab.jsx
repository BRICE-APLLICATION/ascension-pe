import { ArrowUpRight, ArrowDownRight, Clock, AlertTriangle, Search } from "lucide-react";
import { PALETTE } from "../../data/palette.js";
import { ACQUISITION_POOL } from "../../data/acquisitions.js";
import { BANKS } from "../../data/banks.js";
import { DD_CATEGORIES, DD_BUDGET } from "../../data/duediligence.js";
import { THESES } from "../../data/thesis.js";

const MAX_ADD_ONS = 2;

export default function AcquisitionsTab({
  isDirectorial, staff, acquisitionSlots, expandedCompanyId, setExpandedCompanyId,
  proposalChoices, pickProposal, passOn, selectedProposal, bankRejections, requestFinancing,
  portfolio, quarter, dryPowder, addBoltOn, ddResults, investigateDD, selectedThesis, chooseThesis,
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
          const selectedOptionId = isDirectorial ? selectedProposal[c.id] : null;
          const rejections = bankRejections[c.id] || [];
          const investedEntry = chosen ? portfolio.find((p) => p.id === c.id) : null;
          const chosenThesis = selectedThesis[c.id];
          const awaitingThesis = isDirectorial && selectedOptionId && !chosenThesis && !chosen;
          const awaitingBank = isDirectorial && selectedOptionId && chosenThesis && !chosen;
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
                  {isDirectorial && !chosen && (() => {
                    const results = ddResults[c.id] || {};
                    const used = Object.keys(results).length;
                    const foundCategory = Object.entries(results).find(([, v]) => v === "found");
                    return (
                      <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${PALETTE.line}` }}>
                        <p style={{ color: PALETTE.textMuted }}>Due diligence — {used}/{DD_BUDGET} investigations utilisées</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {DD_CATEGORIES.map((cat) => {
                            const result = results[cat.key];
                            const disabled = !!result || used >= DD_BUDGET;
                            return (
                              <button key={cat.key} onClick={() => investigateDD(idx, cat.key)} disabled={disabled} className="px-2 py-1 rounded" style={{ backgroundColor: result === "found" ? "rgba(166,68,76,0.15)" : PALETTE.panel, border: `1px solid ${result === "found" ? PALETTE.crimson : PALETTE.line}`, color: result ? PALETTE.textMuted : PALETTE.textPrimary, opacity: disabled && !result ? 0.5 : 1 }}>
                                {cat.label}{result === "clean" && " ✓"}{result === "found" && " ⚠"}
                              </button>
                            );
                          })}
                        </div>
                        {foundCategory && (
                          <p className="mt-2 flex items-start gap-1" style={{ color: PALETTE.crimson }}>
                            <Search size={12} className="mt-0.5 shrink-0" /> {ACQUISITION_POOL[idx].hiddenRisk.description}
                          </p>
                        )}
                      </div>
                    );
                  })()}
                  <div className="mt-3 flex flex-col gap-2">
                    <p style={{ color: PALETTE.textMuted }}>{isDirectorial ? "Structurer l'investissement :" : `Proposer à ${staff.superior} :`}</p>
                    {c.proposals.map((opt) => {
                      const isSel = isDirectorial ? selectedOptionId === opt.id : chosen === opt.id;
                      const showFeedback = isDirectorial ? (chosen === opt.id) : isSel;
                      return (
                        <button key={opt.id} onClick={() => pickProposal(idx, opt)} disabled={!!chosen} className="text-left p-2 rounded" style={{ backgroundColor: isSel ? (opt.correct ? "rgba(91,140,136,0.15)" : "rgba(166,68,76,0.15)") : PALETTE.panel, border: `1px solid ${isSel ? (opt.correct ? PALETTE.teal : PALETTE.crimson) : PALETTE.line}`, opacity: chosen && !isSel ? 0.5 : 1 }}>
                          <span>{opt.label}</span>
                          {showFeedback && <p className="mt-1" style={{ color: PALETTE.textMuted }}>{opt.feedback} <span style={{ color: PALETTE.gold }}>+{opt.xp} XP</span></p>}
                        </button>
                      );
                    })}
                  </div>
                  {awaitingThesis && (
                    <div className="mt-3 pt-3 flex flex-col gap-2" style={{ borderTop: `1px solid ${PALETTE.line}` }}>
                      <p style={{ color: PALETTE.textMuted }}>Formuler votre thèse d'investissement :</p>
                      {THESES.map((t) => (
                        <button key={t.key} onClick={() => chooseThesis(idx, t.key)} className="text-left p-2 rounded" style={{ backgroundColor: PALETTE.panel, border: `1px solid ${PALETTE.line}` }}>
                          <p style={{ fontWeight: 600 }}>{t.label}</p>
                          <p className="mt-0.5" style={{ color: PALETTE.textMuted }}>{t.description}</p>
                        </button>
                      ))}
                    </div>
                  )}
                  {awaitingBank && (
                    <div className="mt-3 pt-3 flex flex-col gap-2" style={{ borderTop: `1px solid ${PALETTE.line}` }}>
                      <p style={{ color: PALETTE.gold }}>Thèse retenue : {THESES.find((t) => t.key === chosenThesis)?.label}</p>
                      <p style={{ color: PALETTE.textMuted }}>Solliciter une banque pour financer la dette :</p>
                      {BANKS.map((bank) => {
                        const wasRejected = rejections.includes(bank.id);
                        return (
                          <button key={bank.id} onClick={() => requestFinancing(idx, bank.id)} disabled={wasRejected} className="text-left p-2 rounded" style={{ backgroundColor: PALETTE.panel, border: `1px solid ${wasRejected ? PALETTE.crimson : PALETTE.line}`, opacity: wasRejected ? 0.5 : 1 }}>
                            <div className="flex items-center justify-between">
                              <span>{bank.name}</span>
                              <span style={{ color: PALETTE.textMuted, fontFamily: "'IBM Plex Mono', monospace" }}>{(bank.rate * 100).toFixed(1)}%</span>
                            </div>
                            <p className="mt-0.5" style={{ color: PALETTE.textMuted }}>{bank.profile} · levier max {Math.round(bank.maxLeverage * 100)}%</p>
                            {wasRejected && <p className="mt-0.5" style={{ color: PALETTE.crimson }}>Refusé : levier demandé trop élevé pour cette banque.</p>}
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {investedEntry && (
                    <p className="mt-2 pt-2" style={{ color: PALETTE.teal, borderTop: `1px solid ${PALETTE.line}` }}>Financé via {investedEntry.bankName}.</p>
                  )}
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
              {p.bankName && <p className="text-xs mt-0.5" style={{ color: PALETTE.textMuted }}>Financé via {p.bankName}</p>}
              {p.thesis && (
                <p className="text-xs mt-0.5" style={{ color: p.thesisOutcome === "correct" ? PALETTE.teal : p.thesisOutcome === "incorrect" ? PALETTE.crimson : PALETTE.textMuted }}>
                  Thèse : {THESES.find((t) => t.key === p.thesis)?.label}
                  {p.thesisOutcome === "correct" && " — validée"}
                  {p.thesisOutcome === "incorrect" && " — invalidée"}
                  {!p.thesisOutcome && " — en attente"}
                </p>
              )}
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
              {isDirectorial && (() => {
                const addOnsCount = p.addOnsCount || 0;
                const cost = +(p.value * 0.25).toFixed(1);
                const maxedOut = addOnsCount >= MAX_ADD_ONS;
                const disabled = pending || maxedOut || cost > dryPowder;
                return (
                  <button onClick={() => addBoltOn(i)} disabled={disabled} className="mt-2 px-2 py-1 rounded text-xs" style={{ backgroundColor: PALETTE.panelAlt, color: disabled ? PALETTE.textMuted : PALETTE.gold, opacity: disabled ? 0.6 : 1 }}>
                    {maxedOut ? "Buy-and-build complet" : `Acquisition complémentaire (bolt-on) — ${cost} M$`}
                  </button>
                );
              })()}
            </div>
          );
        })}</div>
      )}
    </div>
  );
}

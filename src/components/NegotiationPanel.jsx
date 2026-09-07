import { PALETTE } from "../data/palette.js";
import { POSTURES, MAX_ROUNDS } from "../data/negotiation.js";
import { fmtMoney } from "../lib/utils.js";

export default function NegotiationPanel({ negotiation, firmName, submitPosture, pushAgain, acceptNegotiatedOffer, declineOffer, finalizeHire }) {
  const { phase, round, baseBonus, band, grantedBumpPct } = negotiation;

  if (phase === "posture") {
    return (
      <div className="max-w-2xl p-5 rounded" style={{ backgroundColor: PALETTE.panel, border: `1px solid ${PALETTE.line}` }}>
        <p className="text-xs mb-1" style={{ color: PALETTE.gold }}>Négociation — {firmName} · tour {round}/{MAX_ROUNDS}</p>
        <h2 className="text-lg mb-4" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>Quelle posture d'ouverture adoptez-vous ?</h2>
        <div className="flex flex-col gap-3">
          {Object.entries(POSTURES).map(([key, p]) => (
            <button key={key} onClick={() => submitPosture(key)} className="text-left p-3 rounded" style={{ backgroundColor: PALETTE.panelAlt, border: `1px solid ${PALETTE.line}` }}>
              <p className="text-sm" style={{ fontWeight: 600 }}>{p.label}</p>
              <p className="text-xs mt-1" style={{ color: PALETTE.textMuted }}>{p.description}</p>
              <p className="text-xs mt-1" style={{ color: PALETTE.gold, fontFamily: "'IBM Plex Mono', monospace" }}>Bonus visé : {fmtMoney(baseBonus * (1 + p.pct))} $ CAD</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (phase === "response") {
    const finalBonus = Math.round(baseBonus * (1 + grantedBumpPct));
    const isBlocked = band === "blocage";
    const canPushAgain = !isBlocked && round < MAX_ROUNDS;
    return (
      <div className="max-w-2xl p-5 rounded" style={{ backgroundColor: PALETTE.panel, border: `1px solid ${PALETTE.line}` }}>
        <p className="text-xs mb-3" style={{ color: PALETTE.gold }}>Négociation — {firmName} · tour {round}/{MAX_ROUNDS}</p>
        <p className="text-sm mb-4">{firmName} {negotiation.responseText}</p>
        <p className="text-sm mb-4">Bonus proposé : <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: PALETTE.gold }}>{fmtMoney(finalBonus)} $ CAD</span></p>
        <div className="flex gap-2 flex-wrap">
          <button onClick={acceptNegotiatedOffer} className="px-4 py-2 rounded text-sm" style={{ backgroundColor: PALETTE.gold, color: PALETTE.bg }}>Accepter</button>
          {canPushAgain && <button onClick={pushAgain} className="px-4 py-2 rounded text-sm" style={{ backgroundColor: PALETTE.panelAlt, color: PALETTE.textMuted }}>Pousser encore</button>}
          {isBlocked && <button onClick={declineOffer} className="px-4 py-2 rounded text-sm" style={{ backgroundColor: PALETTE.panelAlt, color: PALETTE.crimson }}>Refuser le poste</button>}
        </div>
      </div>
    );
  }

  if (phase === "compform") {
    return (
      <div className="max-w-2xl p-5 rounded" style={{ backgroundColor: PALETTE.panel, border: `1px solid ${PALETTE.line}` }}>
        <h2 className="text-lg mb-2" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>Comment souhaitez-vous être rémunéré(e) ?</h2>
        <p className="text-xs mb-4" style={{ color: PALETTE.textMuted }}>Une partie du bonus peut être convertie en actions de {firmName} — sa valeur suivra ensuite la performance de la firme, pour le meilleur ou pour le pire.</p>
        <div className="flex flex-col gap-3">
          <button onClick={() => finalizeHire(false)} className="text-left p-3 rounded" style={{ backgroundColor: PALETTE.panelAlt, border: `1px solid ${PALETTE.line}` }}>
            <p className="text-sm" style={{ fontWeight: 600 }}>100% cash</p>
            <p className="text-xs mt-1" style={{ color: PALETTE.textMuted }}>Salaire et bonus classiques, sans exposition à la performance de la firme.</p>
          </button>
          <button onClick={() => finalizeHire(true)} className="text-left p-3 rounded" style={{ backgroundColor: PALETTE.panelAlt, border: `1px solid ${PALETTE.line}` }}>
            <p className="text-sm" style={{ fontWeight: 600 }}>Partie en actions (30% du bonus)</p>
            <p className="text-xs mt-1" style={{ color: PALETTE.textMuted }}>Ce revenu variera ensuite selon le score de {firmName} (et son cours de bourse si elle est cotée).</p>
          </button>
        </div>
      </div>
    );
  }

  return null;
}

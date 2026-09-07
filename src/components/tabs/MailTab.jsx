import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { PALETTE } from "../../data/palette.js";

export default function MailTab({ mail, setTab, respondCeoOffer, firms, currentFirmId, isDirectorial, sendPartnershipProposal, canSendPartnership }) {
  const [targetId, setTargetId] = useState("");
  const otherFirms = (firms || []).filter((f) => f.id !== currentFirmId);

  return (
    <div className="max-w-2xl flex flex-col gap-3">
      {isDirectorial && (
        <div className="p-4 rounded" style={{ backgroundColor: PALETTE.panel, border: `1px solid ${PALETTE.line}` }}>
          <p className="text-xs mb-2" style={{ color: PALETTE.gold }}>Proposer un partenariat</p>
          <p className="text-xs mb-3" style={{ color: PALETTE.textMuted }}>Envoyez une proposition de co-investissement à un autre fonds — l'issue dépend de l'écart de score et de votre capital disponible, jamais du hasard seul.</p>
          <div className="flex gap-2 flex-wrap">
            <select value={targetId} onChange={(e) => setTargetId(e.target.value)} className="px-3 py-1.5 rounded text-xs" style={{ backgroundColor: PALETTE.panelAlt, border: `1px solid ${PALETTE.line}`, color: PALETTE.textPrimary }}>
              <option value="">Choisir un fonds</option>
              {otherFirms.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
            <button
              onClick={() => targetId && sendPartnershipProposal(targetId)}
              disabled={!targetId || !canSendPartnership}
              className="px-3 py-1.5 rounded text-xs"
              style={{ backgroundColor: targetId && canSendPartnership ? PALETTE.gold : PALETTE.panelAlt, color: targetId && canSendPartnership ? PALETTE.bg : PALETTE.textMuted }}
            >Envoyer la proposition</button>
          </div>
          {!canSendPartnership && <p className="text-xs mt-2" style={{ color: PALETTE.textMuted }}>Une proposition par trimestre au maximum.</p>}
        </div>
      )}
      {mail.map((m) => (
        <div key={m.id} className="p-4 rounded" style={{ backgroundColor: PALETTE.panel, border: `1px solid ${m.type === "ceo-offer" ? PALETTE.gold : PALETTE.line}` }}>
          <div className="flex items-center gap-2 mb-1">
            {m.type === "ceo-offer" ? <Lock size={14} color={PALETTE.gold} /> : <Mail size={14} color={m.type === "offer" || m.type === "partnership" ? PALETTE.gold : PALETTE.textMuted} />}
            <span className="text-xs" style={{ color: PALETTE.textMuted }}>{m.from}</span>
          </div>
          <p className="text-sm mb-1" style={{ fontWeight: 600 }}>{m.subject}</p>
          <p className="text-xs mb-2" style={{ color: PALETTE.textMuted }}>{m.body}</p>
          {m.type === "offer" && <button onClick={() => setTab("emploi")} className="text-xs" style={{ color: PALETTE.gold }}>Voir l'offre →</button>}
          {m.type === "ceo-offer" && m.status === "pending" && (
            <div className="flex gap-2 mt-2">
              <button onClick={() => respondCeoOffer(m.id, true)} className="px-3 py-1.5 rounded text-xs" style={{ backgroundColor: PALETTE.gold, color: PALETTE.bg }}>Accepter</button>
              <button onClick={() => respondCeoOffer(m.id, false)} className="px-3 py-1.5 rounded text-xs" style={{ backgroundColor: PALETTE.panelAlt, color: PALETTE.textMuted }}>Refuser</button>
            </div>
          )}
          {m.type === "ceo-offer" && m.status === "accepted" && <p className="text-xs" style={{ color: PALETTE.teal }}>Offre acceptée.</p>}
          {m.type === "ceo-offer" && m.status === "declined" && <p className="text-xs" style={{ color: PALETTE.textMuted }}>Offre refusée.</p>}
        </div>
      ))}
    </div>
  );
}

import { Mail, Lock } from "lucide-react";
import { PALETTE } from "../../data/palette.js";

export default function MailTab({ mail, setTab, respondCeoOffer }) {
  return (
    <div className="max-w-2xl flex flex-col gap-3">
      {mail.map((m) => (
        <div key={m.id} className="p-4 rounded" style={{ backgroundColor: PALETTE.panel, border: `1px solid ${m.type === "ceo-offer" ? PALETTE.gold : PALETTE.line}` }}>
          <div className="flex items-center gap-2 mb-1">
            {m.type === "ceo-offer" ? <Lock size={14} color={PALETTE.gold} /> : <Mail size={14} color={m.type === "offer" ? PALETTE.gold : PALETTE.textMuted} />}
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

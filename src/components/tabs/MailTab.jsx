import { Mail } from "lucide-react";
import { PALETTE } from "../../data/palette.js";

export default function MailTab({ mail, setTab }) {
  return (
    <div className="max-w-2xl flex flex-col gap-3">
      {mail.map((m) => (
        <div key={m.id} className="p-4 rounded" style={{ backgroundColor: PALETTE.panel, border: `1px solid ${PALETTE.line}` }}>
          <div className="flex items-center gap-2 mb-1"><Mail size={14} color={m.type === "offer" ? PALETTE.gold : PALETTE.textMuted} /><span className="text-xs" style={{ color: PALETTE.textMuted }}>{m.from}</span></div>
          <p className="text-sm mb-1" style={{ fontWeight: 600 }}>{m.subject}</p>
          <p className="text-xs mb-2" style={{ color: PALETTE.textMuted }}>{m.body}</p>
          {m.type === "offer" && <button onClick={() => setTab("emploi")} className="text-xs" style={{ color: PALETTE.gold }}>Voir l'offre →</button>}
        </div>
      ))}
    </div>
  );
}

import { PALETTE } from "../data/palette.js";

const BASE_TABS = [
  { id: "apercu", label: "Aperçu" }, { id: "cas", label: "Cas pratique" }, { id: "acquisitions", label: "Acquisitions" },
  { id: "banque", label: "Banque" }, { id: "founder", label: "Ma PE" },
];
const DIRECTORIAL_TABS = [{ id: "finances", label: "Finances" }];
const OWN_FIRM_TABS = [{ id: "recrutement", label: "Recrutement" }];
const REST_TABS = [
  { id: "carriere", label: "Ma carrière" }, { id: "marche", label: "Marché" },
  { id: "emploi", label: "Emploi" }, { id: "mails", label: "Mails" }, { id: "actualites", label: "Actualités" }, { id: "revision", label: "Révision" },
];

export default function NavTabs({ tab, onSelect, isDirectorial, showRecruitment, unreadMailCount = 0 }) {
  const tabs = [...BASE_TABS, ...(isDirectorial ? DIRECTORIAL_TABS : []), ...(showRecruitment ? OWN_FIRM_TABS : []), ...REST_TABS];
  return (
    <nav className="w-full px-6 flex gap-5 overflow-x-auto" style={{ borderBottom: `1px solid ${PALETTE.line}` }}>
      {tabs.map((t) => (
        <button key={t.id} onClick={() => onSelect(t.id)} className="py-3 text-sm whitespace-nowrap flex items-center gap-1.5" style={{ color: tab === t.id ? PALETTE.textPrimary : PALETTE.textMuted, borderBottom: tab === t.id ? `2px solid ${PALETTE.gold}` : "2px solid transparent", fontWeight: tab === t.id ? 600 : 400 }}>
          {t.label}
          {t.id === "mails" && unreadMailCount > 0 && (
            <span className="text-xs rounded-full px-1.5" style={{ backgroundColor: PALETTE.gold, color: PALETTE.bg, fontWeight: 700, lineHeight: "1.4" }}>{unreadMailCount}</span>
          )}
        </button>
      ))}
    </nav>
  );
}

import { RefreshCw } from "lucide-react";
import { PALETTE } from "../../data/palette.js";
import { FORMULAS } from "../../data/formulas.js";
import RevisionCard from "../RevisionCard.jsx";

export default function RevisionTab({ revisionCards, reshuffleCards }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs" style={{ color: PALETTE.textMuted }}>Cliquez une fiche pour révéler la formule</p>
        <button onClick={reshuffleCards} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded" style={{ backgroundColor: PALETTE.panel, color: PALETTE.textMuted }}><RefreshCw size={12} /> Nouvelles fiches</button>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">{revisionCards.map((idx) => <RevisionCard key={idx} f={FORMULAS[idx]} />)}</div>
    </div>
  );
}

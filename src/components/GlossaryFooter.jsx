import { BookOpen, ChevronDown, RotateCcw } from "lucide-react";
import { PALETTE } from "../data/palette.js";
import { GLOSSARY } from "../data/glossary.js";

export default function GlossaryFooter({ open, setOpen, restartGame }) {
  return (
    <footer className="w-full px-6 py-4 flex items-center justify-between flex-wrap gap-3" style={{ borderTop: `1px solid ${PALETTE.line}` }}>
      <div>
        <button onClick={() => setOpen((v) => !v)} className="flex items-center gap-2 text-xs" style={{ color: PALETTE.textMuted }}><BookOpen size={14} color={PALETTE.goldDim} /> Glossaire des termes<ChevronDown size={14} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} /></button>
        {open && (<div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mt-4">{Object.entries(GLOSSARY).map(([term, def]) => (<div key={term}><span className="text-xs" style={{ color: PALETTE.gold, fontFamily: "'IBM Plex Mono', monospace" }}>{term}</span><p className="text-xs mt-0.5" style={{ color: PALETTE.textMuted }}>{def}</p></div>))}</div>)}
      </div>
      <button onClick={restartGame} className="flex items-center gap-2 text-xs shrink-0" style={{ color: PALETTE.textMuted }}><RotateCcw size={14} color={PALETTE.crimson} /> Recommencer une partie</button>
    </footer>
  );
}

import { useState } from "react";
import { PALETTE } from "../data/palette.js";

export default function RevisionCard({ f }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button onClick={() => setFlipped((v) => !v)} className="p-5 rounded text-left h-40 flex flex-col justify-between" style={{ backgroundColor: flipped ? PALETTE.panelAlt : PALETTE.panel, border: `1px solid ${PALETTE.line}` }}>
      <p className="text-sm" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>{f.name}</p>
      {flipped ? (<div><p className="text-sm mb-2" style={{ fontFamily: "'IBM Plex Mono', monospace", color: PALETTE.gold }}>{f.formula}</p><p className="text-xs" style={{ color: PALETTE.textMuted }}>{f.note}</p></div>) : (<p className="text-xs" style={{ color: PALETTE.textMuted }}>Voir la formule</p>)}
    </button>
  );
}

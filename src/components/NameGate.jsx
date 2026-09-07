import { useState } from "react";
import { PALETTE } from "../data/palette.js";

export default function NameGate({ onStart }) {
  const [nameInput, setNameInput] = useState("");
  return (
    <div className="w-full min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: PALETTE.bg, color: PALETTE.textPrimary, fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <div className="max-w-sm w-full p-6 rounded" style={{ backgroundColor: PALETTE.panel, border: `1px solid ${PALETTE.line}` }}>
        <h1 className="text-xl mb-2" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>Ascension</h1>
        <p className="text-sm mb-4" style={{ color: PALETTE.textMuted }}>Simulateur de carrière en Private Equity. Comment vous appelez-vous ?</p>
        <input value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder="Votre nom" className="w-full px-3 py-2 rounded text-sm mb-4" style={{ backgroundColor: PALETTE.panelAlt, border: `1px solid ${PALETTE.line}`, color: PALETTE.textPrimary }} />
        <button onClick={() => nameInput.trim() && onStart(nameInput.trim())} className="w-full px-4 py-2 rounded text-sm" style={{ backgroundColor: PALETTE.gold, color: PALETTE.bg }}>Commencer chez Carl Capital</button>
      </div>
    </div>
  );
}

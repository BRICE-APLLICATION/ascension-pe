import { useState } from "react";
import { PALETTE } from "../data/palette.js";

export default function NameGate({ onStart }) {
  const [nameInput, setNameInput] = useState("");
  const [mode, setMode] = useState(null); // null | "carl" | "founder"
  const [firmNameInput, setFirmNameInput] = useState("");

  const name = nameInput.trim();

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: PALETTE.bg, color: PALETTE.textPrimary, fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <div className="max-w-sm w-full p-6 rounded" style={{ backgroundColor: PALETTE.panel, border: `1px solid ${PALETTE.line}` }}>
        <h1 className="text-xl mb-2" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>Ascension</h1>
        <p className="text-sm mb-4" style={{ color: PALETTE.textMuted }}>Simulateur de carrière en Private Equity. Comment vous appelez-vous ?</p>
        <input value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder="Votre nom" className="w-full px-3 py-2 rounded text-sm mb-4" style={{ backgroundColor: PALETTE.panelAlt, border: `1px solid ${PALETTE.line}`, color: PALETTE.textPrimary }} />

        {mode !== "founder" && (
          <div className="flex flex-col gap-2">
            <button onClick={() => name && onStart({ playerName: name, mode: "carl" })} disabled={!name} className="w-full px-4 py-2 rounded text-sm" style={{ backgroundColor: PALETTE.gold, color: PALETTE.bg, opacity: name ? 1 : 0.5 }}>Rejoindre Carl Capital comme Analyste</button>
            <button onClick={() => name && setMode("founder")} disabled={!name} className="w-full px-4 py-2 rounded text-sm" style={{ backgroundColor: PALETTE.panelAlt, color: PALETTE.textPrimary, opacity: name ? 1 : 0.5 }}>Fonder ma propre PE</button>
          </div>
        )}

        {mode === "founder" && (
          <div className="flex flex-col gap-2">
            <input value={firmNameInput} onChange={(e) => setFirmNameInput(e.target.value)} placeholder={`${name || "Votre"} Capital`} className="w-full px-3 py-2 rounded text-sm" style={{ backgroundColor: PALETTE.panelAlt, border: `1px solid ${PALETTE.line}`, color: PALETTE.textPrimary }} />
            <p className="text-xs" style={{ color: PALETTE.textMuted }}>Ressources de départ très limitées (2 M$ de capital personnel) — vous construisez tout depuis le début.</p>
            <button onClick={() => onStart({ playerName: name, mode: "founder", firmName: firmNameInput.trim() || `${name} Capital` })} className="w-full px-4 py-2 rounded text-sm" style={{ backgroundColor: PALETTE.gold, color: PALETTE.bg }}>Fonder ma firme</button>
            <button onClick={() => setMode(null)} className="w-full px-3 py-1.5 rounded text-xs" style={{ color: PALETTE.textMuted }}>← Retour</button>
          </div>
        )}
      </div>
    </div>
  );
}

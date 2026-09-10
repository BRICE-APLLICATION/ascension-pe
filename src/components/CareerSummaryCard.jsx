import { useRef, useState } from "react";
import { Download, Copy } from "lucide-react";
import { PALETTE } from "../data/palette.js";
import { drawCareerCard, buildCareerSummaryText } from "../lib/careerCard.js";

export default function CareerSummaryCard({ cardData }) {
  const canvasRef = useRef(null);
  const [copied, setCopied] = useState(false);

  function download() {
    const canvas = canvasRef.current;
    drawCareerCard(canvas, cardData);
    const link = document.createElement("a");
    link.download = `ascension-${cardData.playerName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  async function copyText() {
    try {
      await navigator.clipboard.writeText(buildCareerSummaryText(cardData));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // presse-papiers indisponible (permissions navigateur) : on ignore silencieusement
    }
  }

  return (
    <div className="p-4 rounded mb-4" style={{ backgroundColor: PALETTE.panel, border: `1px solid ${PALETTE.line}` }}>
      <p className="text-xs mb-3" style={{ color: PALETTE.gold }}>Carte de résumé de carrière</p>
      <div className="flex gap-2 flex-wrap">
        <button onClick={download} className="flex items-center gap-2 px-3 py-1.5 rounded text-xs" style={{ backgroundColor: PALETTE.gold, color: PALETTE.bg }}>
          <Download size={12} /> Télécharger l'image
        </button>
        <button onClick={copyText} className="flex items-center gap-2 px-3 py-1.5 rounded text-xs" style={{ backgroundColor: PALETTE.panelAlt, color: PALETTE.textPrimary }}>
          <Copy size={12} /> {copied ? "Copié !" : "Copier en texte"}
        </button>
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}

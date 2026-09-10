import { PALETTE } from "../data/palette.js";

const W = 600, H = 160, PAD_X = 28, PAD_Y = 18;

export default function ScoreChart({ history, firmName }) {
  if (!history || history.length < 2) {
    return <p className="text-xs mb-4" style={{ color: PALETTE.textMuted }}>Pas encore assez de données pour un graphique — revenez dans quelques trimestres.</p>;
  }
  const minQ = history[0].quarter;
  const maxQ = history[history.length - 1].quarter;
  const xScale = (q) => PAD_X + (maxQ === minQ ? 0 : (q - minQ) / (maxQ - minQ)) * (W - PAD_X * 2);
  const yScale = (s) => H - PAD_Y - (s / 100) * (H - PAD_Y * 2);
  const points = history.map((h) => `${xScale(h.quarter)},${yScale(h.score)}`).join(" ");

  return (
    <div className="mb-4">
      <p className="text-xs mb-2" style={{ color: PALETTE.textMuted }}>Évolution du score — {firmName}</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 180 }}>
        {[0, 25, 50, 75, 100].map((v) => (
          <g key={v}>
            <line x1={PAD_X} x2={W - PAD_X} y1={yScale(v)} y2={yScale(v)} stroke={PALETTE.line} strokeWidth={1} />
            <text x={2} y={yScale(v) + 3} fontSize={9} fill={PALETTE.textMuted}>{v}</text>
          </g>
        ))}
        <polyline points={points} fill="none" stroke={PALETTE.gold} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        {history.map((h, i) => (
          <circle key={i} cx={xScale(h.quarter)} cy={yScale(h.score)} r={4} fill={PALETTE.gold}>
            <title>{`T${h.quarter} — score ${h.score}`}</title>
          </circle>
        ))}
        <text x={PAD_X} y={H - 2} fontSize={9} fill={PALETTE.textMuted}>T{minQ}</text>
        <text x={W - PAD_X} y={H - 2} fontSize={9} fill={PALETTE.textMuted} textAnchor="end">T{maxQ}</text>
      </svg>
    </div>
  );
}

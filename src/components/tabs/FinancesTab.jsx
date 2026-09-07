import { PALETTE } from "../../data/palette.js";

function Line({ label, value, muted }) {
  return (
    <div className="flex items-center justify-between py-2" style={{ borderBottom: `1px solid ${PALETTE.line}` }}>
      <span className="text-sm" style={{ color: muted ? PALETTE.textMuted : PALETTE.textPrimary }}>{label}</span>
      <span className="text-sm" style={{ fontFamily: "'IBM Plex Mono', monospace", color: muted ? PALETTE.textMuted : PALETTE.textPrimary }}>{value}</span>
    </div>
  );
}

export default function FinancesTab({ currentFirm, dryPowder, portfolio, quarter }) {
  const portfolioValue = portfolio.reduce((sum, p) => sum + p.value, 0);
  const lpCommitted = currentFirm.lpCommitted || 0;
  const quarterlyFeeRevenue = +(lpCommitted * 0.02 / 4).toFixed(1);

  return (
    <div className="max-w-2xl">
      <p className="text-xs mb-4" style={{ color: PALETTE.textMuted }}>Portrait financier de {currentFirm.name} — T{quarter}.</p>

      <div className="p-4 rounded mb-4" style={{ backgroundColor: PALETTE.panel }}>
        <p className="text-xs mb-2" style={{ color: PALETTE.gold }}>Capital</p>
        <Line label="Actifs sous gestion (AUM)" value={`${lpCommitted} M$`} />
        <Line label="Capital disponible (dry powder)" value={`${dryPowder} M$`} />
        <Line label="Capital appelé / déployé" value={`${Math.max(0, lpCommitted - dryPowder)} M$`} muted />
      </div>

      <div className="p-4 rounded mb-4" style={{ backgroundColor: PALETTE.panel }}>
        <p className="text-xs mb-2" style={{ color: PALETTE.gold }}>Trésorerie & dette</p>
        <Line label="Trésorerie opérationnelle" value={`${currentFirm.cash || 0} M$`} />
        <Line label="Dette corporate" value={`${currentFirm.corporateDebt || 0} M$`} />
      </div>

      <div className="p-4 rounded mb-4" style={{ backgroundColor: PALETTE.panel }}>
        <p className="text-xs mb-2" style={{ color: PALETTE.gold }}>Portefeuille</p>
        <Line label="Valeur totale des participations" value={`${portfolioValue} M$`} />
        <Line label="Nombre de participations" value={portfolio.length} muted />
      </div>

      <div className="p-4 rounded" style={{ backgroundColor: PALETTE.panel }}>
        <p className="text-xs mb-2" style={{ color: PALETTE.gold }}>Revenus de la firme</p>
        <Line label="Frais de gestion (ce trimestre)" value={`${quarterlyFeeRevenue} M$`} />
        <Line label="Carried interest réalisé" value="0 M$" muted />
        <p className="text-xs mt-2" style={{ color: PALETTE.textMuted }}>Le carried interest se réalise à la cession d'une participation — cette mécanique n'existe pas encore dans le jeu.</p>
      </div>
    </div>
  );
}

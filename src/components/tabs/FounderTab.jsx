import { PALETTE } from "../../data/palette.js";
import { FOUNDER_SEED_CAPITAL, fundLabel } from "../../data/founder.js";

function Line({ label, value, muted }) {
  return (
    <div className="flex items-center justify-between py-2" style={{ borderBottom: `1px solid ${PALETTE.line}` }}>
      <span className="text-sm" style={{ color: muted ? PALETTE.textMuted : PALETTE.textPrimary }}>{label}</span>
      <span className="text-sm" style={{ fontFamily: "'IBM Plex Mono', monospace", color: muted ? PALETTE.textMuted : PALETTE.textPrimary }}>{value}</span>
    </div>
  );
}

export default function FounderTab({
  playerName, ownFirmId, ownFirm, currentFirmId, dryPowder, portfolio, quarter,
  foundOwnFirm, attemptFundraise, fundraiseResult, lastFundraiseQuarter,
}) {
  if (!ownFirmId) {
    return (
      <div className="max-w-2xl">
        <div className="p-5 rounded" style={{ backgroundColor: PALETTE.panel }}>
          <h2 className="text-xl mb-2" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>Fonder votre propre Private Equity</h2>
          <p className="text-sm mb-4" style={{ color: PALETTE.textMuted }}>
            Vous quittez le parcours employé pour construire votre propre firme, financée d'abord sur capital personnel
            ({FOUNDER_SEED_CAPITAL} M$), puis par dette bancaire, et enfin par des levées de fonds auprès de LPs à mesure
            que votre réputation grandit.
          </p>
          <button onClick={foundOwnFirm} className="px-4 py-2 rounded text-sm" style={{ backgroundColor: PALETTE.gold, color: PALETTE.bg }}>Fonder {playerName} Capital</button>
        </div>
      </div>
    );
  }

  const portfolioValue = portfolio.reduce((sum, p) => sum + p.value, 0);
  const runningIt = currentFirmId === ownFirmId;
  const canFundraise = runningIt && quarter > lastFundraiseQuarter;

  return (
    <div className="max-w-2xl">
      <p className="text-xs mb-4" style={{ color: PALETTE.textMuted }}>{ownFirm.name} — {fundLabel(ownFirm.fundsRaised)}</p>
      {!runningIt && <p className="text-xs mb-4" style={{ color: PALETTE.crimson }}>Vous travaillez actuellement ailleurs — {ownFirm.name} continue d'exister mais vous ne pouvez pas y lever de fonds tant que vous n'y êtes pas revenu(e).</p>}

      <div className="p-4 rounded mb-4" style={{ backgroundColor: PALETTE.panel }}>
        <p className="text-xs mb-2" style={{ color: PALETTE.gold }}>Capital</p>
        <Line label="Capital levé auprès des LPs (cumulé)" value={`${ownFirm.lpCommitted} M$`} />
        {runningIt && <Line label="Capital disponible (dry powder)" value={`${dryPowder} M$`} />}
        <Line label="Dette corporate" value={`${ownFirm.corporateDebt || 0} M$`} muted />
      </div>

      <div className="p-4 rounded mb-4" style={{ backgroundColor: PALETTE.panel }}>
        <p className="text-xs mb-2" style={{ color: PALETTE.gold }}>Firme</p>
        <Line label="Score" value={ownFirm.score} muted />
        <Line label="Employés" value={ownFirm.employees} muted />
        <Line label="Valeur du portefeuille" value={runningIt ? `${portfolioValue} M$` : "—"} muted />
      </div>

      {runningIt && (
        <div className="p-4 rounded" style={{ backgroundColor: PALETTE.panel }}>
          <p className="text-xs mb-2" style={{ color: PALETTE.gold }}>Levée de fonds</p>
          <p className="text-xs mb-3" style={{ color: PALETTE.textMuted }}>Votre capacité à lever dépend de votre réputation auprès des LPs et de votre track record — jamais d'un tirage au sort déconnecté de vos décisions.</p>
          <button onClick={attemptFundraise} disabled={!canFundraise} className="px-4 py-2 rounded text-sm" style={{ backgroundColor: canFundraise ? PALETTE.gold : PALETTE.panelAlt, color: canFundraise ? PALETTE.bg : PALETTE.textMuted }}>Lever un nouveau fonds</button>
          {!canFundraise && <p className="text-xs mt-2" style={{ color: PALETTE.textMuted }}>Une tentative par trimestre au maximum.</p>}
          {fundraiseResult && (
            <p className="text-xs mt-3" style={{ color: fundraiseResult.success ? PALETTE.teal : PALETTE.crimson }}>{fundraiseResult.message}</p>
          )}
        </div>
      )}
    </div>
  );
}

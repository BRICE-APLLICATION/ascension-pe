import { Briefcase, Target, BarChart3, ChevronRight, Users } from "lucide-react";
import { PALETTE } from "../../data/palette.js";
import { RANKS } from "../../data/ranks.js";
import { AUDIENCES } from "../../data/reputation.js";
import { CEO_COMP } from "../../data/ceo.js";
import { clamp } from "../../lib/utils.js";

export default function OverviewTab({
  currentFirm, rankIndex, currentRank, nextRank, progressPct, xp, dealsReviewed,
  completedCount, visibleScenarios, staff, setTab, setXp, playerName, reputation, isCeo,
}) {
  const comp = isCeo ? CEO_COMP : currentRank;
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/3">
        {currentFirm.score < 35 && <div className="mb-4 p-3 rounded text-xs" style={{ backgroundColor: "rgba(166,68,76,0.15)", border: `1px solid ${PALETTE.crimson}`, color: PALETTE.crimson }}>⚠️ {currentFirm.name} sous-performe : risque d'OPA hostile.</div>}
        <h2 className="text-sm mb-4" style={{ color: PALETTE.textMuted }}>Progression de carrière</h2>
        <div className="flex flex-col-reverse gap-0 relative pl-6">
          <div className="absolute left-2 top-1 bottom-1 w-px" style={{ backgroundColor: PALETTE.line }} />
          {RANKS.map((r, i) => {
            const reached = i <= rankIndex, isCurrent = i === rankIndex;
            return (
              <div key={r.name} className="relative flex flex-col gap-0.5 py-3">
                <div className="absolute -left-6 w-3 h-3 rounded-full" style={{ backgroundColor: reached ? PALETTE.gold : PALETTE.line, boxShadow: isCurrent ? `0 0 0 4px ${PALETTE.panelAlt}` : "none" }} />
                <span style={{ color: reached ? PALETTE.textPrimary : PALETTE.textMuted, fontWeight: isCurrent ? 600 : 400 }}>{r.name}</span>
                <span className="text-xs" style={{ color: PALETTE.textMuted }}>{r.domain}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-6 p-4 rounded" style={{ backgroundColor: PALETTE.panel }}>
          <div className="flex justify-between text-xs mb-2"><span style={{ color: PALETTE.textMuted }}>{currentRank.name}</span><span style={{ color: PALETTE.textMuted }}>{nextRank ? nextRank.name : "Sommet atteint"}</span></div>
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: PALETTE.line }}><div className="h-full" style={{ width: `${progressPct}%`, backgroundColor: PALETTE.gold }} /></div>
          <p className="text-xs mt-2" style={{ color: PALETTE.textMuted, fontFamily: "'IBM Plex Mono', monospace" }}>{xp} XP</p>
        </div>
        <div className="mt-6 p-4 rounded" style={{ backgroundColor: PALETTE.panel }}>
          <div className="flex items-center gap-2 mb-3"><Users size={14} color={PALETTE.textMuted} /><p className="text-xs" style={{ color: PALETTE.textMuted }}>Rémunération annuelle</p></div>
          <p className="text-sm">Salaire : <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{comp.salary.toLocaleString("fr-CA")} $ CAD</span></p>
          <p className="text-sm">Bonus visé : <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{comp.bonus.toLocaleString("fr-CA")} $ CAD</span></p>
        </div>
        {rankIndex < 4 && (
          <div className="mt-6 p-4 rounded" style={{ backgroundColor: PALETTE.panel }}>
            <div className="flex items-center gap-2 mb-3"><Users size={14} color={PALETTE.textMuted} /><p className="text-xs" style={{ color: PALETTE.textMuted }}>Compétition interne — pour la promotion suivante</p></div>
            <div className="flex flex-col gap-3">
              <div><div className="flex justify-between text-xs mb-1"><span>{playerName}</span><span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{progressPct}%</span></div><div className="w-full h-1 rounded-full overflow-hidden" style={{ backgroundColor: PALETTE.line }}><div className="h-full" style={{ width: `${progressPct}%`, backgroundColor: PALETTE.gold }} /></div></div>
              {(() => { const cPct = clamp(progressPct + staff.offset, 0, 100); return (
                <div key={staff.rival}><div className="flex justify-between text-xs mb-1"><span style={{ color: PALETTE.textMuted }}>{staff.rival}</span><span style={{ color: PALETTE.textMuted, fontFamily: "'IBM Plex Mono', monospace" }}>{cPct}%</span></div><div className="w-full h-1 rounded-full overflow-hidden" style={{ backgroundColor: PALETTE.line }}><div className="h-full" style={{ width: `${cPct}%`, backgroundColor: PALETTE.teal }} /></div></div>
              ); })()}
            </div>
          </div>
        )}
        <div className="mt-6 p-4 rounded" style={{ backgroundColor: PALETTE.panelAlt, border: `1px solid ${PALETTE.line}` }}>
          <p className="text-xs mb-2" style={{ color: PALETTE.textMuted }}>Tester un rang (raccourci de démo)</p>
          <div className="flex flex-wrap gap-2">
            {RANKS.map((r, i) => (
              <button key={r.name} onClick={() => setXp(r.threshold + 10)} className="px-2 py-1 rounded text-xs" style={{ backgroundColor: i === rankIndex ? PALETTE.gold : PALETTE.panel, color: i === rankIndex ? PALETTE.bg : PALETTE.textMuted }}>{r.name}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="md:w-2/3 flex flex-col gap-4">
        <div className="p-5 rounded" style={{ backgroundColor: PALETTE.panel }}>
          <h2 className="text-xl mb-2" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>Gravir les échelons, un deal à la fois</h2>
          <p className="text-sm" style={{ color: PALETTE.textMuted }}>Chaque cas pratique reproduit une décision réelle chez {currentFirm.name}. Vos choix construisent votre réputation, font progresser {currentFirm.name} sur le marché, et débloquent des responsabilités plus lourdes au rang suivant.</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded flex items-center gap-3" style={{ backgroundColor: PALETTE.panel }}><Briefcase size={18} color={PALETTE.teal} /><div><p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "1.1rem" }}>{dealsReviewed}</p><p className="text-xs" style={{ color: PALETTE.textMuted }}>Deals analysés</p></div></div>
          <div className="p-4 rounded flex items-center gap-3" style={{ backgroundColor: PALETTE.panel }}><Target size={18} color={PALETTE.gold} /><div><p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "1.1rem" }}>{completedCount}/{visibleScenarios.length}</p><p className="text-xs" style={{ color: PALETTE.textMuted }}>Cas complétés ce rang</p></div></div>
          <div className="p-4 rounded flex items-center gap-3" style={{ backgroundColor: PALETTE.panel }}><BarChart3 size={18} color={PALETTE.crimson} /><div><p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "1.1rem" }}>{currentFirm.score}</p><p className="text-xs" style={{ color: PALETTE.textMuted }}>Score {currentFirm.name}</p></div></div>
        </div>
        <button onClick={() => setTab("cas")} className="mt-2 self-start px-4 py-2 rounded text-sm flex items-center gap-2" style={{ backgroundColor: PALETTE.gold, color: PALETTE.bg }}>Lancer le prochain cas <ChevronRight size={16} /></button>

        <div className="p-4 rounded" style={{ backgroundColor: PALETTE.panel }}>
          <p className="text-xs mb-3" style={{ color: PALETTE.textMuted }}>Votre réputation, par audience</p>
          <div className="flex flex-col gap-3">
            {AUDIENCES.map((a) => (
              <div key={a.key}>
                <div className="flex justify-between text-xs mb-1"><span>{a.label}</span><span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{reputation[a.key]}</span></div>
                <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: PALETTE.line }}><div className="h-full" style={{ width: `${reputation[a.key]}%`, backgroundColor: PALETTE.teal }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

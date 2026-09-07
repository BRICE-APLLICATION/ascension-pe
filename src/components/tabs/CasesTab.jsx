import { CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import { PALETTE } from "../../data/palette.js";
import { GLOSSARY } from "../../data/glossary.js";

export default function CasesTab({
  visibleScenarios, completedCount, currentRank, scenarioChoices, selectedScenario,
  chosenOptionId, setSelectedScenarioId, handleChoose, currentFirm,
}) {
  if (!selectedScenario) {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-xs mb-1" style={{ color: PALETTE.textMuted }}>Cas disponibles à votre rang actuel ({currentRank.name}) — {completedCount}/{visibleScenarios.length} complétés</p>
        {visibleScenarios.map((s) => {
          const answered = scenarioChoices[s.id];
          const answeredOption = answered ? s.options.find((o) => o.id === answered) : null;
          return (
            <button key={s.id} onClick={() => setSelectedScenarioId(s.id)} className="text-left p-4 rounded flex items-center justify-between gap-4" style={{ backgroundColor: PALETTE.panel, border: `1px solid ${PALETTE.line}` }}>
              <div><p className="text-xs mb-1" style={{ color: PALETTE.gold }}>{s.type}</p><p className="text-sm">{s.context}</p></div>
              {answeredOption ? (answeredOption.correct ? <CheckCircle2 size={18} color={PALETTE.teal} className="shrink-0" /> : <XCircle size={18} color={PALETTE.crimson} className="shrink-0" />) : <ChevronRight size={18} color={PALETTE.textMuted} className="shrink-0" />}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <button onClick={() => setSelectedScenarioId(null)} className="text-xs mb-4" style={{ color: PALETTE.textMuted }}>← Retour aux cas</button>
      <p className="text-xs mb-2" style={{ color: PALETTE.gold }}>{selectedScenario.type} — {currentRank.name}</p>
      <h2 className="text-xl mb-4" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>{selectedScenario.context}</h2>
      <div className="flex gap-3 mb-4 flex-wrap">{selectedScenario.numbers.map((n) => (<div key={n.label} className="px-3 py-2 rounded" style={{ backgroundColor: PALETTE.panel }}><p className="text-xs" style={{ color: PALETTE.textMuted }}>{n.label}</p><p style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{n.value}</p></div>))}</div>
      {(selectedScenario.keyTerms.length > 0 || selectedScenario.contextNote) && (
        <div className="mb-5 p-3 rounded text-xs" style={{ backgroundColor: PALETTE.panelAlt, border: `1px solid ${PALETTE.line}` }}>
          <p className="mb-1" style={{ color: PALETTE.gold }}>Termes clés de ce cas</p>
          {selectedScenario.keyTerms.map((t) => (<p key={t} style={{ color: PALETTE.textMuted }}><span style={{ color: PALETTE.textPrimary, fontFamily: "'IBM Plex Mono', monospace" }}>{t}</span> — {GLOSSARY[t]}</p>))}
          {selectedScenario.contextNote && <p style={{ color: PALETTE.textMuted }}>{selectedScenario.contextNote}</p>}
        </div>
      )}
      <p className="text-sm mb-4">{selectedScenario.question}</p>
      <div className="flex flex-col gap-3">
        {selectedScenario.options.map((opt) => {
          const isSelected = chosenOptionId === opt.id, showResult = !!chosenOptionId;
          return (
            <button key={opt.id} onClick={() => handleChoose(selectedScenario, opt)} disabled={showResult} className="text-left p-4 rounded" style={{ backgroundColor: isSelected ? (opt.correct ? "rgba(91,140,136,0.15)" : "rgba(166,68,76,0.15)") : PALETTE.panel, border: `1px solid ${isSelected ? (opt.correct ? PALETTE.teal : PALETTE.crimson) : PALETTE.line}`, cursor: showResult ? "default" : "pointer", opacity: showResult && !isSelected ? 0.5 : 1 }}>
              <div className="flex items-start justify-between gap-3"><span className="text-sm">{opt.label}</span>{isSelected && (opt.correct ? <CheckCircle2 size={18} color={PALETTE.teal} className="shrink-0" /> : <XCircle size={18} color={PALETTE.crimson} className="shrink-0" />)}</div>
              {isSelected && (<div className="mt-3 flex flex-col gap-2"><p className="text-xs" style={{ color: PALETTE.textMuted }}>{opt.outcome} <span style={{ color: PALETTE.gold }}>+{opt.xp} XP</span></p>{!opt.correct && <p className="text-xs pt-2" style={{ color: PALETTE.textMuted, borderTop: `1px solid ${PALETTE.line}` }}><span style={{ color: PALETTE.crimson }}>Ce qu'il fallait faire : </span>{selectedScenario.correctExplanation}</p>}<p className="text-xs" style={{ color: opt.impact >= 0 ? PALETTE.teal : PALETTE.crimson }}>Impact sur {currentFirm.name} : {opt.impact >= 0 ? "+" : ""}{opt.impact} pts</p></div>)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

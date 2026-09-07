import { useState } from "react";
import { PALETTE } from "../../data/palette.js";
import { POSTURES } from "../../data/negotiation.js";
import { computeHireOutcome } from "../../data/candidates.js";

export default function RecruitmentTab({ ownFirm, dryPowder, candidatePool, recruitsCount, hiredIds, hireCandidate }) {
  const [expandedId, setExpandedId] = useState(null);
  const [postureId, setPostureId] = useState(null);
  const [result, setResult] = useState(null);

  if (!ownFirm) {
    return <div className="max-w-2xl"><p className="text-sm" style={{ color: PALETTE.textMuted }}>Le recrutement n'est disponible que pour votre propre firme.</p></div>;
  }

  function submit(candidate) {
    const raw = computeHireOutcome({ candidate, posture: postureId });
    const affordable = raw.offer <= dryPowder;
    const outcome = { offer: raw.offer, accepted: raw.accepted && affordable };
    if (raw.accepted && !affordable) {
      setResult({ candidateId: candidate.id, offer: raw.offer, accepted: false, reason: "capital" });
    } else {
      hireCandidate(candidate, outcome);
      setResult({ candidateId: candidate.id, ...outcome });
    }
    setPostureId(null);
  }

  return (
    <div className="max-w-2xl flex flex-col gap-3">
      <p className="text-xs mb-1" style={{ color: PALETTE.textMuted }}>
        Candidats disponibles ce trimestre pour {ownFirm.name} — chaque recrutement pèse sur la trésorerie via la masse
        salariale, et un poste d'acquisition supplémentaire s'ouvre tous les 2 recrutements réussis.
      </p>
      <p className="text-xs mb-2" style={{ fontFamily: "'IBM Plex Mono', monospace", color: PALETTE.gold }}>Recrutements réussis : {recruitsCount}</p>

      {candidatePool.map((c) => {
        const already = hiredIds.includes(c.id);
        const expanded = expandedId === c.id;
        const lastResult = result?.candidateId === c.id ? result : null;
        return (
          <div key={c.id} className="p-4 rounded" style={{ backgroundColor: PALETTE.panel, border: `1px solid ${PALETTE.line}`, opacity: already ? 0.55 : 1 }}>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-sm" style={{ fontWeight: 600 }}>{c.name}</p>
                <p className="text-xs" style={{ color: PALETTE.textMuted }}>Actuellement chez {c.currentEmployer} · {c.trait.label}</p>
              </div>
              {!already && !expanded && <button onClick={() => { setExpandedId(c.id); setPostureId(null); setResult(null); }} className="px-3 py-1.5 rounded text-xs" style={{ backgroundColor: PALETTE.panelAlt, color: PALETTE.gold }}>Voir le profil</button>}
              {already && <span className="text-xs" style={{ color: PALETTE.teal }}>Recruté(e)</span>}
            </div>

            {expanded && !already && (
              <div className="mt-3 p-3 rounded text-xs" style={{ backgroundColor: PALETTE.panelAlt }}>
                <p style={{ color: PALETTE.textMuted }}>{c.trait.description}</p>
                <p className="mt-1" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>Prétention à l'embauche : ~{c.signingCost} M$</p>

                {!lastResult && (
                  <>
                    <p className="mt-3 mb-1" style={{ color: PALETTE.textMuted }}>Posture d'offre :</p>
                    <div className="flex flex-col gap-1 mb-3">
                      {Object.entries(POSTURES).map(([key, p]) => (
                        <button key={key} onClick={() => setPostureId(key)} className="text-left px-3 py-1.5 rounded" style={{ backgroundColor: postureId === key ? PALETTE.gold : PALETTE.panel, color: postureId === key ? PALETTE.bg : PALETTE.textPrimary }}>
                          {p.label} <span style={{ color: postureId === key ? PALETTE.bg : PALETTE.textMuted }}>— {p.description}</span>
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button disabled={!postureId} onClick={() => submit(c)} className="px-3 py-1.5 rounded" style={{ backgroundColor: postureId ? PALETTE.gold : PALETTE.panel, color: postureId ? PALETTE.bg : PALETTE.textMuted }}>Faire une offre</button>
                      <button onClick={() => setExpandedId(null)} className="px-3 py-1.5 rounded" style={{ backgroundColor: PALETTE.panel, color: PALETTE.textMuted }}>Annuler</button>
                    </div>
                  </>
                )}

                {lastResult && (
                  <p className="mt-3" style={{ color: lastResult.accepted ? PALETTE.teal : PALETTE.crimson }}>
                    {lastResult.accepted
                      ? `Offre de ${lastResult.offer} M$ acceptée — ${c.name} rejoint ${ownFirm.name}.`
                      : lastResult.reason === "capital"
                        ? `Capital disponible insuffisant pour financer cette offre de ${lastResult.offer} M$.`
                        : `Offre de ${lastResult.offer} M$ refusée : ${c.name} juge la proposition insuffisante pour ce niveau de poste.`}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

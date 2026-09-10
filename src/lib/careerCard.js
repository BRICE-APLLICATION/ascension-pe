import { AUDIENCES } from "../data/reputation.js";
import { getGrossForEntry } from "./compensation.js";
import { fmtMoney } from "./utils.js";

const W = 800, H = 1000;
const BG = "#0E1620", PANEL = "#17212C", LINE = "#2B3846", GOLD = "#C9A66B", TEAL = "#5B8C88", MUTED = "#8A93A0", TEXT = "#EDEAE0";

// Résumé de carrière exportable : un rendu Canvas 2D dessiné à la main plutôt qu'une dépendance
// externe (html2canvas, etc.) pour garder le bundle léger sur un jeu qui n'en a jamais eu besoin.
export function drawCareerCard(canvas, data) {
  const { playerName, year, quarter, currentRoleLabel, currentFirmName, endgamePath, careerHistory, grossTotal, netTotal, cashTotal, equityTotal, notableDeals, reputation } = data;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = GOLD;
  ctx.font = "600 30px Georgia, serif";
  ctx.fillText("Ascension", 40, 60);
  ctx.fillStyle = MUTED;
  ctx.font = "14px Arial";
  ctx.fillText("Résumé de carrière en Private Equity", 40, 84);

  ctx.fillStyle = TEXT;
  ctx.font = "600 24px Arial";
  ctx.fillText(playerName, 40, 130);
  ctx.fillStyle = MUTED;
  ctx.font = "15px Arial";
  ctx.fillText(`${currentRoleLabel} chez ${currentFirmName} — Année ${year}, T${quarter}`, 40, 154);

  let y = 190;
  if (endgamePath) {
    ctx.fillStyle = PANEL;
    ctx.fillRect(40, y, W - 80, 40);
    ctx.strokeStyle = GOLD;
    ctx.strokeRect(40, y, W - 80, 40);
    ctx.fillStyle = GOLD;
    ctx.font = "14px Arial";
    ctx.fillText(endgamePath.label, 56, y + 25);
    y += 60;
  }

  // Parcours
  ctx.fillStyle = MUTED;
  ctx.font = "13px Arial";
  ctx.fillText("PARCOURS", 40, y);
  y += 14;
  const recentHistory = careerHistory.slice(-6);
  for (const h of recentHistory) {
    ctx.fillStyle = PANEL;
    ctx.fillRect(40, y, W - 80, 34);
    ctx.fillStyle = TEXT;
    ctx.font = "14px Arial";
    ctx.fillText(`${h.role} — ${h.firmName}`, 52, y + 22);
    ctx.fillStyle = MUTED;
    ctx.font = "12px Arial";
    ctx.textAlign = "right";
    ctx.fillText(`Année ${h.year} · ${fmtMoney(getGrossForEntry(h))} $`, W - 52, y + 22);
    ctx.textAlign = "left";
    y += 38;
  }
  y += 18;

  // Revenus cumulés
  ctx.fillStyle = MUTED;
  ctx.font = "13px Arial";
  ctx.fillText("REVENUS CUMULÉS", 40, y);
  y += 20;
  ctx.fillStyle = PANEL;
  ctx.fillRect(40, y, W - 80, equityTotal > 0 ? 84 : 60);
  ctx.strokeStyle = GOLD;
  ctx.strokeRect(40, y, W - 80, equityTotal > 0 ? 84 : 60);
  ctx.fillStyle = TEXT;
  ctx.font = "18px Arial";
  ctx.fillText(`Brut total : ${fmtMoney(grossTotal)} $ CAD`, 56, y + 26);
  ctx.fillStyle = MUTED;
  ctx.font = "14px Arial";
  ctx.fillText(`Net (estimé) : ${fmtMoney(netTotal)} $ CAD`, 56, y + 48);
  if (equityTotal > 0) {
    ctx.fillText(`Dont cash : ${fmtMoney(cashTotal)} $ · actions : ${fmtMoney(equityTotal)} $`, 56, y + 70);
  }
  y += (equityTotal > 0 ? 84 : 60) + 30;

  // Deals notables
  ctx.fillStyle = MUTED;
  ctx.font = "13px Arial";
  ctx.fillText("PARTICIPATIONS NOTABLES", 40, y);
  y += 20;
  if (notableDeals.length === 0) {
    ctx.fillStyle = MUTED;
    ctx.font = "14px Arial";
    ctx.fillText("Aucune participation active actuellement.", 40, y + 16);
    y += 40;
  } else {
    for (const d of notableDeals) {
      ctx.fillStyle = PANEL;
      ctx.fillRect(40, y, W - 80, 34);
      ctx.fillStyle = TEXT;
      ctx.font = "14px Arial";
      ctx.fillText(d.name, 52, y + 22);
      const delta = d.value - d.invested;
      ctx.fillStyle = delta >= 0 ? TEAL : "#A6444C";
      ctx.font = "13px Arial";
      ctx.textAlign = "right";
      ctx.fillText(`${d.value} M$ (${delta >= 0 ? "+" : ""}${delta} M$)`, W - 52, y + 22);
      ctx.textAlign = "left";
      y += 38;
    }
    y += 12;
  }

  // Réputation
  if (reputation) {
    ctx.fillStyle = MUTED;
    ctx.font = "13px Arial";
    ctx.fillText("RÉPUTATION PAR AUDIENCE", 40, y);
    y += 22;
    for (const a of AUDIENCES) {
      const v = reputation[a.key] ?? 50;
      ctx.fillStyle = TEXT;
      ctx.font = "13px Arial";
      ctx.fillText(a.label, 40, y + 10);
      ctx.fillStyle = LINE;
      ctx.fillRect(220, y, W - 260, 10);
      ctx.fillStyle = GOLD;
      ctx.fillRect(220, y, (W - 260) * (v / 100), 10);
      ctx.fillStyle = MUTED;
      ctx.font = "11px Arial";
      ctx.textAlign = "right";
      ctx.fillText(String(v), W - 40, y + 10);
      ctx.textAlign = "left";
      y += 26;
    }
  }
}

export function buildCareerSummaryText(data) {
  const { playerName, year, quarter, currentRoleLabel, currentFirmName, endgamePath, careerHistory, grossTotal, netTotal, cashTotal, equityTotal, notableDeals, reputation } = data;
  const lines = [];
  lines.push(`Ascension — Résumé de carrière`);
  lines.push(`${playerName} — ${currentRoleLabel} chez ${currentFirmName} (Année ${year}, T${quarter})`);
  if (endgamePath) lines.push(endgamePath.label);
  lines.push("");
  lines.push("Parcours :");
  for (const h of careerHistory) lines.push(`- ${h.role} — ${h.firmName} (Année ${h.year}, ${fmtMoney(getGrossForEntry(h))} $)`);
  lines.push("");
  lines.push(`Revenus cumulés : brut ${fmtMoney(grossTotal)} $ CAD, net (estimé) ${fmtMoney(netTotal)} $ CAD`);
  if (equityTotal > 0) lines.push(`Dont cash : ${fmtMoney(cashTotal)} $ · actions : ${fmtMoney(equityTotal)} $`);
  lines.push("");
  lines.push("Participations notables :");
  if (notableDeals.length === 0) lines.push("Aucune participation active actuellement.");
  else for (const d of notableDeals) lines.push(`- ${d.name} : ${d.value} M$ (${d.value - d.invested >= 0 ? "+" : ""}${d.value - d.invested} M$)`);
  if (reputation) {
    lines.push("");
    lines.push("Réputation par audience :");
    for (const a of AUDIENCES) lines.push(`- ${a.label} : ${reputation[a.key] ?? 50}/100`);
  }
  return lines.join("\n");
}

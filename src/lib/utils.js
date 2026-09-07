import { RANKS } from "../data/ranks.js";

export function getRankIndex(xp) {
  let idx = 0;
  RANKS.forEach((r, i) => { if (xp >= r.threshold) idx = i; });
  return idx;
}

export function clamp(n, min, max) { return Math.min(max, Math.max(min, n)); }
export function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
export function fmtMoney(n) { return Math.round(n).toLocaleString("fr-CA"); }

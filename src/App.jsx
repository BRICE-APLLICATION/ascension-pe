import { useState, useEffect } from "react";
import { PALETTE } from "./data/palette.js";
import { RANKS, DIRECTORIAL_RANK } from "./data/ranks.js";
import { FIRM_ID, FIRMS_INITIAL, CEO_NAMES, NEW_FIRM_NAMES, getStaff } from "./data/firms.js";
import { SCENARIOS } from "./data/scenarios.js";
import { ACQUISITION_POOL } from "./data/acquisitions.js";
import { BANKS } from "./data/banks.js";
import { FORMULAS } from "./data/formulas.js";
import { SEED_MAIL } from "./data/mail.js";
import { defaultSkills } from "./data/skills.js";
import { defaultReputation } from "./data/reputation.js";
import { maybeGenerateCeoOffer } from "./data/ceo.js";
import { FOUNDER_SEED_CAPITAL, attemptFundraise as attemptFundraiseRoll } from "./data/founder.js";
import { POSTURES, computePlayerLeverage, computeFirmFlexibility, computeNegotiationRound, BAND_TEXTS } from "./data/negotiation.js";
import { DD_BUDGET, investigateCategory } from "./data/duediligence.js";
import { outcomeFromRisk } from "./data/thesis.js";
import { getRankIndex, clamp, randInt } from "./lib/utils.js";
import { loadSave, persistSave } from "./lib/storage.js";
import { computeCareerProfile, computeEndgamePath } from "./lib/career.js";
import { getGrossForEntry } from "./lib/compensation.js";

import NameGate from "./components/NameGate.jsx";
import Header from "./components/Header.jsx";
import NavTabs from "./components/NavTabs.jsx";
import GlossaryFooter from "./components/GlossaryFooter.jsx";
import OverviewTab from "./components/tabs/OverviewTab.jsx";
import CasesTab from "./components/tabs/CasesTab.jsx";
import AcquisitionsTab from "./components/tabs/AcquisitionsTab.jsx";
import BankTab from "./components/tabs/BankTab.jsx";
import FinancesTab from "./components/tabs/FinancesTab.jsx";
import FounderTab from "./components/tabs/FounderTab.jsx";
import CareerTab from "./components/tabs/CareerTab.jsx";
import MarketTab from "./components/tabs/MarketTab.jsx";
import JobsTab from "./components/tabs/JobsTab.jsx";
import NegotiationPanel from "./components/NegotiationPanel.jsx";
import MailTab from "./components/tabs/MailTab.jsx";
import NewsTab from "./components/tabs/NewsTab.jsx";
import RevisionTab from "./components/tabs/RevisionTab.jsx";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [playerName, setPlayerName] = useState(null);

  const [tab, setTab] = useState("apercu");
  const [xp, setXp] = useState(60);
  const [dealsReviewed, setDealsReviewed] = useState(3);
  const [selectedScenarioId, setSelectedScenarioId] = useState(null);
  const [scenarioChoices, setScenarioChoices] = useState({});
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [revisionCards, setRevisionCards] = useState([0, 1, 2]);
  const [skills, setSkills] = useState(defaultSkills());
  const [reputation, setReputation] = useState(defaultReputation());
  const [ceoFirmId, setCeoFirmId] = useState(null);
  const [lastCeoOfferQuarter, setLastCeoOfferQuarter] = useState(-99);
  const [ownFirmId, setOwnFirmId] = useState(null);
  const [lastFundraiseQuarter, setLastFundraiseQuarter] = useState(-99);
  const [fundraiseResult, setFundraiseResult] = useState(null);
  const [negotiation, setNegotiation] = useState(null);

  const [firms, setFirms] = useState(FIRMS_INITIAL);
  const [currentFirmId, setCurrentFirmId] = useState(FIRM_ID);
  const [year, setYear] = useState(1);
  const [quarter, setQuarter] = useState(0);
  const [careerHistory, setCareerHistory] = useState([{ firmName: "Carl Capital", role: "Analyste", year: 1 }]);
  const [loggedRankIndex, setLoggedRankIndex] = useState(0);
  const [news, setNews] = useState(["T0 — Carl Capital entre en activité sur le marché du PE canadien avec 18 employés."]);
  const [opaWarned, setOpaWarned] = useState(false);
  const [mail, setMail] = useState(SEED_MAIL);

  const [acquisitionSlots, setAcquisitionSlots] = useState([0, 1, 2]);
  const [investedIds, setInvestedIds] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [expandedCompanyId, setExpandedCompanyId] = useState(null);
  const [proposalChoices, setProposalChoices] = useState({});
  const [selectedProposal, setSelectedProposal] = useState({});
  const [bankRejections, setBankRejections] = useState({});
  const [ddResults, setDdResults] = useState({});
  const [selectedThesis, setSelectedThesis] = useState({});

  const [dryPowder, setDryPowder] = useState(40);
  const [loanLog, setLoanLog] = useState([]);

  const [viewingOfferId, setViewingOfferId] = useState(null);
  const [applicationResult, setApplicationResult] = useState(null);

  useEffect(() => {
    const s = loadSave();
    if (s) {
      if (s.playerName) setPlayerName(s.playerName);
      if (s.xp !== undefined) setXp(s.xp);
      if (s.dealsReviewed !== undefined) setDealsReviewed(s.dealsReviewed);
      if (s.firms) setFirms(s.firms);
      if (s.currentFirmId) setCurrentFirmId(s.currentFirmId);
      if (s.year) setYear(s.year);
      if (s.quarter !== undefined) setQuarter(s.quarter);
      if (s.careerHistory) setCareerHistory(s.careerHistory);
      if (s.loggedRankIndex !== undefined) setLoggedRankIndex(s.loggedRankIndex);
      if (s.news) setNews(s.news);
      if (s.opaWarned !== undefined) setOpaWarned(s.opaWarned);
      if (s.mail) setMail(s.mail);
      if (s.acquisitionSlots) setAcquisitionSlots(s.acquisitionSlots);
      if (s.investedIds) setInvestedIds(s.investedIds);
      if (s.portfolio) setPortfolio(s.portfolio);
      if (s.dryPowder !== undefined) setDryPowder(s.dryPowder);
      if (s.loanLog) setLoanLog(s.loanLog);
      if (s.scenarioChoices) setScenarioChoices(s.scenarioChoices);
      if (s.proposalChoices) setProposalChoices(s.proposalChoices);
      if (s.ddResults) setDdResults(s.ddResults);
      if (s.skills) setSkills(s.skills);
      if (s.reputation) setReputation(s.reputation);
      if (s.ceoFirmId !== undefined) setCeoFirmId(s.ceoFirmId);
      if (s.lastCeoOfferQuarter !== undefined) setLastCeoOfferQuarter(s.lastCeoOfferQuarter);
      if (s.ownFirmId !== undefined) setOwnFirmId(s.ownFirmId);
      if (s.lastFundraiseQuarter !== undefined) setLastFundraiseQuarter(s.lastFundraiseQuarter);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded || !playerName) return;
    persistSave({ playerName, xp, dealsReviewed, firms, currentFirmId, year, quarter, careerHistory, loggedRankIndex, news, opaWarned, mail, acquisitionSlots, investedIds, portfolio, dryPowder, loanLog, scenarioChoices, proposalChoices, skills, reputation, ceoFirmId, lastCeoOfferQuarter, ownFirmId, lastFundraiseQuarter, ddResults });
  }, [loaded, playerName, xp, dealsReviewed, firms, currentFirmId, year, quarter, careerHistory, loggedRankIndex, news, opaWarned, mail, acquisitionSlots, investedIds, portfolio, dryPowder, loanLog, scenarioChoices, proposalChoices, skills, reputation, ceoFirmId, lastCeoOfferQuarter, ownFirmId, lastFundraiseQuarter, ddResults]);

  const rankIndex = getRankIndex(xp);
  const currentRank = RANKS[rankIndex];
  const nextRank = RANKS[rankIndex + 1];
  const progressPct = nextRank ? clamp(Math.round(((xp - currentRank.threshold) / (nextRank.threshold - currentRank.threshold)) * 100), 0, 100) : 100;
  const isDirectorial = rankIndex >= DIRECTORIAL_RANK;

  const currentFirm = firms.find((f) => f.id === currentFirmId) || firms[0];
  const staff = getStaff(currentFirmId, rankIndex, firms);
  const isCeo = ceoFirmId === currentFirmId;
  const isPartner = rankIndex === 4;
  const ownFirm = ownFirmId ? firms.find((f) => f.id === ownFirmId) : null;
  const careerProfile = computeCareerProfile({ skills, reputation, xp, dealsReviewed, portfolio });
  const endgamePath = computeEndgamePath({ rankIndex, ceoFirmId, ownFirmId, careerHistory });

  const selectedScenario = SCENARIOS.find((s) => s.id === selectedScenarioId);
  const chosenOptionId = selectedScenarioId ? scenarioChoices[selectedScenarioId] : null;
  const visibleScenarios = SCENARIOS.filter((s) => s.rankRequired === rankIndex);
  const completedCount = visibleScenarios.filter((s) => scenarioChoices[s.id]).length;

  function handleChoose(scenario, option) {
    const already = !!scenarioChoices[scenario.id];
    setScenarioChoices((s) => ({ ...s, [scenario.id]: option.id }));
    if (!already) {
      setXp((v) => v + option.xp);
      setDealsReviewed((v) => v + 1);
      setFirms((prev) => prev.map((f) => (f.id === currentFirmId ? { ...f, score: clamp(f.score + option.impact, 5, 98) } : f)));
      if (scenario.skill) {
        const gain = option.correct ? 4 : 1;
        setSkills((s) => ({ ...s, [scenario.skill]: clamp(s[scenario.skill] + gain, 0, 100) }));
      }
      if (scenario.reputationAudience) {
        const delta = Math.round(option.impact / 2);
        setReputation((r) => ({ ...r, [scenario.reputationAudience]: clamp(r[scenario.reputationAudience] + delta, 0, 100) }));
      }
    }
  }

  function cycleSlot(usedIdx) {
    const usedCompanyId = ACQUISITION_POOL[usedIdx].id;
    const used = new Set([...investedIds, usedCompanyId]);
    const available = ACQUISITION_POOL.map((_, i) => i).filter((i) => !used.has(ACQUISITION_POOL[i].id));
    setAcquisitionSlots((slots) => slots.map((s) => (s !== usedIdx ? s : (available.length ? available[randInt(0, available.length - 1)] : s))));
    setExpandedCompanyId(null);
    setSelectedProposal((p) => { const n = { ...p }; delete n[usedCompanyId]; return n; });
    setBankRejections((r) => { const n = { ...r }; delete n[usedCompanyId]; return n; });
    setDdResults((d) => { const n = { ...d }; delete n[usedCompanyId]; return n; });
    setSelectedThesis((t) => { const n = { ...t }; delete n[usedCompanyId]; return n; });
  }
  function passOn(poolIdx) { cycleSlot(poolIdx); }

  function chooseThesis(poolIdx, thesisKey) {
    const company = ACQUISITION_POOL[poolIdx];
    if (proposalChoices[company.id] || !selectedProposal[company.id]) return;
    setSelectedThesis((t) => ({ ...t, [company.id]: thesisKey }));
  }

  // Priorité 4 — due diligence à budget limité : investiguer la bonne catégorie donne une chance
  // de voir la description du risque cible avant d'investir, sans jamais garantir sa présence ni
  // réduire la probabilité qu'il se matérialise — l'information seule, pas une sécurité.
  function investigateDD(poolIdx, categoryKey) {
    const company = ACQUISITION_POOL[poolIdx];
    if (!isDirectorial || proposalChoices[company.id]) return;
    const already = ddResults[company.id] || {};
    if (already[categoryKey] || Object.keys(already).length >= DD_BUDGET) return;
    const result = investigateCategory(company, categoryKey);
    setDdResults((d) => ({ ...d, [company.id]: { ...already, [categoryKey]: result.found ? "found" : "clean" } }));
  }

  const MAX_ADD_ONS = 2;

  // Section 8 de l'extension carrière — buy-and-build : une participation stabilisée (son risque
  // caché, s'il y en avait un, est déjà résolu) peut acquérir une cible complémentaire plus petite,
  // créant de la valeur par synergies plutôt que par un nouveau risque de même nature.
  function addBoltOn(portfolioIndex) {
    const pos = portfolio[portfolioIndex];
    if (!pos) return;
    const stillPending = pos.pendingRisk && !pos.resolvedRisk;
    if (stillPending || (pos.addOnsCount || 0) >= MAX_ADD_ONS) return;
    const cost = +(pos.value * 0.25).toFixed(1);
    if (cost > dryPowder) return;
    setDryPowder((d) => +(d - cost).toFixed(1));
    const uplift = 0.15 + Math.random() * 0.15;
    setPortfolio((p) => p.map((x, i) => (i === portfolioIndex ? { ...x, value: Math.max(1, Math.round(x.value * (1 + uplift))), addOnsCount: (x.addOnsCount || 0) + 1 } : x)));
    setFirms((prev) => prev.map((f) => (f.id === currentFirmId ? { ...f, score: clamp(f.score + 2, 5, 98) } : f)));
    setNews((n) => [`T${quarter} — ${pos.name} réalise une acquisition complémentaire (bolt-on) pour ${cost} M$, renforçant sa création de valeur.`, ...n]);
  }

  // Priorité 1 — risques cachés post-acquisition : une bonne proposition réduit la probabilité
  // qu'un risque caché se matérialise, mais ne l'annule jamais ; une structure agressive l'augmente.
  function rollHiddenRisk(company, option) {
    const risk = company.hiddenRisk;
    if (!risk) return null;
    const modifier = option.correct ? 0.55 : 1.5;
    const probability = clamp(risk.baseProbability * modifier, 0.05, 0.9);
    if (Math.random() >= probability) return null;
    const [minDelay, maxDelay] = risk.revealDelayRange;
    const [minImpact, maxImpact] = risk.valueImpactRange;
    return {
      description: risk.description,
      revealQuarter: quarter + randInt(minDelay, maxDelay),
      impactFraction: minImpact + Math.random() * (maxImpact - minImpact),
      scoreImpact: risk.scoreImpact,
    };
  }

  // Étape A (multi-banques) : au rang VP+, choisir une structure ne finance plus le deal
  // directement — il faut ensuite trouver une banque dont la politique de levier l'accepte.
  // Le joueur peut retenter une autre banque si la première refuse.
  function pickProposal(poolIdx, option) {
    const company = ACQUISITION_POOL[poolIdx];
    if (proposalChoices[company.id]) return;
    if (!isDirectorial) {
      setProposalChoices((p) => ({ ...p, [company.id]: option.id }));
      setXp((v) => v + option.xp);
      return;
    }
    setSelectedProposal((p) => ({ ...p, [company.id]: option.id }));
    setBankRejections((r) => ({ ...r, [company.id]: [] }));
  }

  function requestFinancing(poolIdx, bankId) {
    const company = ACQUISITION_POOL[poolIdx];
    if (proposalChoices[company.id]) return;
    const optionId = selectedProposal[company.id];
    const option = company.proposals.find((o) => o.id === optionId);
    const bank = BANKS.find((b) => b.id === bankId);
    const thesis = selectedThesis[company.id];
    if (!option || !bank || !thesis) return;

    // La réputation Banques et le track record de la firme (son score) desserrent ou resserrent
    // légèrement le plafond de levier officiel de chaque prêteur — une PE tout juste fondée, sans
    // historique, se voit donc naturellement plus scrutée qu'un fonds établi.
    const effectiveMaxLeverage = clamp(bank.maxLeverage + (reputation.banks - 50) / 500 + (currentFirm.score - 50) / 500, 0.1, 0.98);
    if (option.leverage > effectiveMaxLeverage) {
      setBankRejections((r) => ({ ...r, [company.id]: [...(r[company.id] || []), bankId] }));
      return;
    }

    const price = company.ebitda * option.multiple;
    const equity = +(price * (1 - option.leverage)).toFixed(1);
    const debt = +(price * option.leverage).toFixed(1);
    if (equity > dryPowder) {
      setLoanLog((l) => [{ id: `loan-${Date.now()}`, quarter, bankId: bank.id, bankName: bank.name, rate: bank.rate, amount: debt, purpose: company.name, rejected: true, reason: "capital disponible insuffisant" }, ...l]);
      setSelectedProposal((p) => { const n = { ...p }; delete n[company.id]; return n; });
      setBankRejections((r) => { const n = { ...r }; delete n[company.id]; return n; });
      return;
    }

    setProposalChoices((p) => ({ ...p, [company.id]: option.id }));
    setDryPowder((d) => +(d - equity).toFixed(1));
    setFirms((prev) => prev.map((f) => {
      if (f.id !== currentFirmId) return f;
      const oldDebt = f.corporateDebt || 0;
      const oldRate = f.debtWeightedRate || 0;
      const newDebt = +(oldDebt + debt).toFixed(1);
      const newRate = newDebt > 0 ? (oldDebt * oldRate + debt * bank.rate) / newDebt : 0;
      return { ...f, corporateDebt: newDebt, debtWeightedRate: newRate, score: clamp(f.score + (option.correct ? 4 : -3), 5, 98) };
    }));
    const pendingRisk = rollHiddenRisk(company, option);
    // Une thèse "deal propre" se vérifie immédiatement quand aucun risque n'a été tiré — il n'y a
    // rien à attendre. Les deux autres thèses restent en suspens jusqu'à la résolution du risque.
    const immediateOutcome = pendingRisk ? null : outcomeFromRisk(null, 0);
    const thesisOutcome = immediateOutcome ? (thesis === immediateOutcome ? "correct" : "incorrect") : null;
    if (thesisOutcome === "correct") setSkills((s) => ({ ...s, dueDiligence: clamp(s.dueDiligence + 3, 0, 100) }));
    setPortfolio((p) => [...p, { id: company.id, name: company.name, invested: price, value: price, ebitda: company.ebitda, quarterAcquired: quarter, pendingRisk, resolvedRisk: null, bankName: bank.name, thesis, thesisOutcome }]);
    setInvestedIds((ids) => [...ids, company.id]);
    setDealsReviewed((v) => v + 1);
    setLoanLog((l) => [{ id: `loan-${Date.now()}`, quarter, bankId: bank.id, bankName: bank.name, rate: bank.rate, amount: debt, purpose: company.name, rejected: false }, ...l]);
    setReputation((r) => ({
      ...r,
      banks: clamp(r.banks + (option.correct ? 2 : 1), 0, 100),
      entrepreneurs: clamp(r.entrepreneurs + (option.correct ? 2 : -1), 0, 100),
    }));
  }

  // Priorité 5 — remboursement volontaire : réduit la dette corporate (et donc le risque de bris
  // de covenant) au prix d'une partie du capital disponible pour de nouveaux deals.
  function repayDebt(amount) {
    const debt = currentFirm.corporateDebt || 0;
    const repay = +Math.min(amount, dryPowder, debt).toFixed(1);
    if (repay <= 0) return;
    setDryPowder((d) => +(d - repay).toFixed(1));
    setFirms((prev) => prev.map((f) => (f.id === currentFirmId ? { ...f, corporateDebt: +((f.corporateDebt || 0) - repay).toFixed(1) } : f)));
    setNews((n) => [`T${quarter} — ${currentFirm.name} rembourse ${repay} M$ de dette corporate par anticipation.`, ...n]);
  }

  function launchTakeover(targetId) {
    const target = firms.find((f) => f.id === targetId);
    const cost = Math.max(5, Math.round(target.score * 0.6));
    if (cost > dryPowder) { setNews((n) => [`T${quarter} — OPA sur ${target.name} impossible : capital insuffisant (${cost} M$ requis).`, ...n]); return; }
    const chance = clamp(1 - (target.score - currentFirm.score) / 100, 0.2, 0.95);
    const success = Math.random() < chance;
    if (success) {
      const pickedName = NEW_FIRM_NAMES[randInt(0, NEW_FIRM_NAMES.length - 1)];
      const newEntrant = { id: pickedName.toLowerCase().replace(/[^a-z]+/g, "-") + "-" + quarter, name: pickedName, score: randInt(25, 40), employees: randInt(5, 15), public: false, corporateDebt: 0, debtWeightedRate: 0, lpCommitted: randInt(80, 150), cash: randInt(5, 15) };
      setFirms((prev) => prev.filter((f) => f.id !== targetId).map((f) => (f.id === currentFirmId ? { ...f, score: clamp(f.score + Math.round(target.score / 4), 5, 98), employees: f.employees + target.employees } : f)).concat(newEntrant));
      setDryPowder((d) => +(d - cost).toFixed(1));
      setXp((v) => v + 40);
      setNews((n) => [`T${quarter} — OPA réussie : ${currentFirm.name} absorbe ${target.name}. ${newEntrant.name} fait son entrée sur le marché pour maintenir ${firms.length} fonds actifs.`, ...n]);
      setReputation((r) => ({ ...r, rivals: clamp(r.rivals - 3, 0, 100) }));
    } else {
      setDryPowder((d) => +(d - cost / 2).toFixed(1));
      setNews((n) => [`T${quarter} — OPA rejetée : le conseil d'administration de ${target.name} repousse l'offre de ${currentFirm.name}.`, ...n]);
      setReputation((r) => ({ ...r, rivals: clamp(r.rivals - 1, 0, 100) }));
    }
  }

  function goPublic() {
    setFirms((prev) => prev.map((f) => (f.id === currentFirmId ? { ...f, public: true, stockPrice: 8 + f.score / 4 } : f)));
    setNews((n) => [`T${quarter} — ${currentFirm.name} entre en bourse !`, ...n]);
  }

  function addRandomMail() {
    if (Math.random() < 0.5) {
      const others = firms.filter((f) => f.id !== currentFirmId);
      const target = others[randInt(0, others.length - 1)];
      setMail((m) => [{ id: `mail-${Date.now()}`, from: `${CEO_NAMES[target.id] || "Recrutement"} — ${target.name}`, subject: `Une opportunité chez ${target.name}`, body: "Nous suivons votre parcours avec intérêt et aurions un poste à vous proposer.", type: "offer", firmId: target.id }, ...m]);
    } else {
      const templates = [{ subject: "Bon trimestre", body: "Continuez sur cette lancée." }, { subject: "Question rapide", body: "Peux-tu regarder le dossier en cours cet après-midi ?" }];
      const t = templates[randInt(0, templates.length - 1)];
      const fromRival = Math.random() < 0.5;
      setMail((m) => [{ id: `mail-${Date.now()}-2`, from: fromRival ? `${staff.rival} — ${currentFirm.name}` : `${staff.superior} — ${currentFirm.name}`, subject: t.subject, body: t.body, type: "internal" }, ...m]);
    }
  }

  function advanceQuarter() {
    const q = quarter + 1;
    setQuarter(q);
    let covenantBreach = null;
    let working = firms.map((f) => {
      if (f.id === currentFirmId) {
        const updated = { ...f };
        if (f.public) updated.stockPrice = Math.max(1, +(f.stockPrice * (1 + randInt(-6, 6) / 100)).toFixed(2));
        // AUM et trésorerie évoluent avec la performance : une firme qui score bien lève plus
        // facilement, une firme qui score mal voit son AUM s'éroder (rachats/non-réengagements).
        const lpCommitted = f.lpCommitted || 0;
        updated.lpCommitted = Math.max(50, Math.round(lpCommitted * (1 + (f.score - 50) / 2000)));
        const feeRevenue = +(lpCommitted * 0.02 / 4).toFixed(1);
        const opex = +(f.employees * 0.05).toFixed(1);
        const debt = f.corporateDebt || 0;
        const interestExpense = +(debt * (f.debtWeightedRate || 0) / 4).toFixed(1);
        updated.cash = Math.max(0, +((f.cash || 0) + feeRevenue - opex - interestExpense).toFixed(1));
        updated.corporateDebt = debt;

        // Priorité 5 — covenant : au-delà de 6,0x dette nette/EBITDA du portefeuille, la banque
        // impose un cash sweep forcé (une partie de la trésorerie rembourse la dette d'office)
        // plutôt que d'attendre une négociation.
        const portfolioEbitda = portfolio.reduce((s, p) => s + (p.ebitda || 0), 0);
        if (portfolioEbitda > 0 && debt / portfolioEbitda > 6) {
          const sweep = +(updated.cash * 0.5).toFixed(1);
          updated.corporateDebt = Math.max(0, +(debt - sweep).toFixed(1));
          updated.cash = +(updated.cash - sweep).toFixed(1);
          covenantBreach = { sweep, ratio: +(debt / portfolioEbitda).toFixed(1) };
        }
        return updated;
      }
      const updated = { ...f, score: clamp(f.score + randInt(-4, 4), 8, 96), employees: f.employees + randInt(0, 2) };
      if (f.public) updated.stockPrice = Math.max(1, +(f.stockPrice * (1 + randInt(-8, 8) / 100)).toFixed(2));
      return updated;
    });
    const newsItems = [];
    const rivals = working.filter((f) => f.id !== currentFirmId);
    const sorted = [...rivals].sort((a, b) => a.score - b.score);
    if (q % 2 === 0 && sorted.length >= 2) {
      const target = sorted[0], acquirer = sorted[1];
      const pickedName = NEW_FIRM_NAMES[randInt(0, NEW_FIRM_NAMES.length - 1)];
      const newEntrant = { id: pickedName.toLowerCase().replace(/[^a-z]+/g, "-"), name: pickedName, score: randInt(25, 40), employees: randInt(5, 15), public: false, corporateDebt: 0, debtWeightedRate: 0, lpCommitted: randInt(80, 150), cash: randInt(5, 15) };
      const merged = { ...acquirer, score: clamp(Math.round((acquirer.score + target.score) / 2) + 5, 10, 96), employees: acquirer.employees + target.employees };
      working = working.filter((f) => f.id !== target.id && f.id !== acquirer.id);
      working.push(merged, newEntrant);
      newsItems.push(`T${q} — Fusion : ${acquirer.name} absorbe ${target.name}. ${newEntrant.name} fait son entrée pour maintenir 20 fonds actifs.`);
    } else {
      const byDelta = rivals.slice().sort((a, b) => b.score - a.score);
      if (byDelta.length) newsItems.push(`T${q} — ${byDelta[0].name} mène le marché ce trimestre avec un score de ${byDelta[0].score}.`);
    }
    setFirms(working);

    // Une partie de rémunération négociée en actions (voir la négociation salariale) suit ensuite
    // la performance réelle de la firme concernée — cours de bourse si elle est cotée, score sinon.
    setCareerHistory((prev) => prev.map((h) => {
      if (!h.equityFirmId) return h;
      const before = firms.find((f) => f.id === h.equityFirmId);
      const after = working.find((f) => f.id === h.equityFirmId);
      if (!before || !after) return h;
      const growth = before.public && after.public
        ? (after.stockPrice - before.stockPrice) / before.stockPrice
        : (after.score - before.score) / 100;
      return { ...h, equityValue: Math.max(0, +((h.equityValue || 0) * (1 + growth)).toFixed(2)) };
    }));

    // Priorité 1 : les participations continuent leur dérive habituelle, mais chaque position
    // portant un risque caché planifié est vérifiée — le résultat s'impose au moment prévu,
    // indépendamment de la qualité de l'analyse initiale.
    let firmScoreDelta = 0;
    let thesisSkillBump = 0;
    setPortfolio((prev) => prev.map((pos) => {
      let updated = { ...pos, value: Math.max(1, Math.round(pos.value * (1 + randInt(-15, 15) / 100))) };
      if (pos.pendingRisk && !pos.resolvedRisk && q >= pos.pendingRisk.revealQuarter) {
        const impactedValue = Math.max(1, Math.round(updated.value * (1 + pos.pendingRisk.impactFraction)));
        newsItems.push(`T${q} — Risque caché révélé chez ${pos.name} : ${pos.pendingRisk.description}`);
        firmScoreDelta += pos.pendingRisk.scoreImpact;
        updated = { ...updated, value: impactedValue, resolvedRisk: { description: pos.pendingRisk.description } };
        if (pos.thesis) {
          const outcome = outcomeFromRisk(pos.pendingRisk, pos.pendingRisk.impactFraction);
          const thesisOutcome = pos.thesis === outcome ? "correct" : "incorrect";
          if (thesisOutcome === "correct") thesisSkillBump += 3;
          updated.thesisOutcome = thesisOutcome;
        }
      }
      return updated;
    }));
    if (thesisSkillBump !== 0) {
      setSkills((s) => ({ ...s, dueDiligence: clamp(s.dueDiligence + thesisSkillBump, 0, 100) }));
    }
    if (firmScoreDelta !== 0) {
      setFirms((prev) => prev.map((f) => (f.id === currentFirmId ? { ...f, score: clamp(f.score + firmScoreDelta, 5, 98) } : f)));
    }

    setDryPowder((d) => +(d + Math.max(1, Math.round(currentFirm.score / 12))).toFixed(1));
    const myScore = working.find((f) => f.id === currentFirmId).score;
    if (myScore < 35 && !opaWarned) { newsItems.push(`T${q} — ⚠️ ${currentFirm.name} affiche des performances faibles : une OPA hostile devient possible.`); setOpaWarned(true); }
    if (myScore >= 40) setOpaWarned(false);
    if (covenantBreach) {
      newsItems.push(`T${q} — ⚠️ Bris de covenant chez ${currentFirm.name} (dette nette/EBITDA à ${covenantBreach.ratio}x) : la banque impose un remboursement forcé de ${covenantBreach.sweep} M$.`);
      setReputation((r) => ({ ...r, banks: clamp(r.banks - 5, 0, 100) }));
    }
    setNews((n) => [...newsItems, ...n]);
    addRandomMail();

    // Chemin CEO : opportunité confidentielle, jamais dans le marché de l'emploi, déclenchée
    // silencieusement selon le profil de carrière — voir src/data/ceo.js.
    const hasPendingCeoOffer = mail.some((m) => m.type === "ceo-offer" && m.status === "pending");
    const ceoOffer = maybeGenerateCeoOffer({ rankIndex, careerProfile, hasPendingOffer: hasPendingCeoOffer, quarter: q, lastOfferQuarter: lastCeoOfferQuarter, ceoFirmId, currentFirmId, firms: working });
    if (ceoOffer) {
      setLastCeoOfferQuarter(q);
      const targetFirm = working.find((f) => f.id === ceoOffer.firmId);
      const isInternal = ceoOffer.mode === "internal";
      setMail((m) => [{
        id: `ceo-offer-${Date.now()}`,
        from: `Conseil d'administration — ${targetFirm.name}`,
        subject: isInternal ? "CONFIDENTIEL — Décision du Board" : "CONFIDENTIEL — Opportunité exécutive",
        body: isInternal
          ? `Le conseil d'administration a évalué votre performance, votre leadership et votre historique d'investissement. Le Board souhaite vous proposer le poste de Chief Executive Officer de ${targetFirm.name}.`
          : `The Board of ${targetFirm.name} would like to discuss a confidential executive opportunity with you. Position: Chief Executive Officer. This position is not publicly advertised.`,
        type: "ceo-offer", mode: ceoOffer.mode, firmId: ceoOffer.firmId, status: "pending",
      }, ...m]);
    }
  }

  function reshuffleCards() { setRevisionCards(FORMULAS.map((_, i) => i).sort(() => Math.random() - 0.5).slice(0, 3)); }

  function confirmApplication(firmId) {
    const firm = firms.find((f) => f.id === firmId);
    const gap = firm.score - currentFirm.score;
    const rejected = Math.random() < (gap > 25 ? 0.4 : 0.05);
    if (rejected) {
      setApplicationResult({ success: false, message: `Le comité de recrutement de ${firm.name} juge votre profil pas encore prêt pour un fonds de ce calibre. Réessayez plus tard.` });
      setViewingOfferId(null);
      return;
    }
    // À partir de VP+, l'offre affichée n'est qu'un point de départ : place à la négociation
    // plutôt qu'à une embauche instantanée (voir src/data/negotiation.js).
    if (isDirectorial) {
      const playerLeverage = computePlayerLeverage({ progressPct, dealsReviewed, currentFirmScore: currentFirm.score, careerScore: careerProfile.careerScore });
      const firmFlexibility = computeFirmFlexibility({ targetFirm: firm });
      setNegotiation({ firmId, round: 1, playerLeverage, firmFlexibility, baseSalary: currentRank.salary, baseBonus: currentRank.bonus, phase: "posture", band: null, grantedBumpPct: 0, responseText: "" });
      setViewingOfferId(null);
      return;
    }
    // Rejoindre un poste classique via le marché de l'emploi équivaut à quitter la fonction
    // de CEO, s'il y en avait une — le poste de CEO n'est jamais l'un de ces postes affichés.
    if (isCeo) setCeoFirmId(null);
    setCurrentFirmId(firmId);
    setYear((y) => y + 1);
    setCareerHistory((h) => [...h, { firmName: firm.name, role: currentRank.name, year: year + 1 }]);
    setNews((n) => [`T${quarter} — ${playerName} rejoint ${firm.name} au poste de ${currentRank.name}.`, ...n]);
    const newStaff = getStaff(firmId, rankIndex, firms);
    setApplicationResult({ success: true, message: `Vous êtes embauché(e) comme ${currentRank.name} chez ${firm.name}, sous la supervision de ${newStaff.superior} (${newStaff.superiorTitle}).` });
    setViewingOfferId(null);
  }

  function submitNegotiationPosture(postureKey) {
    setNegotiation((neg) => {
      if (!neg) return neg;
      const posture = POSTURES[postureKey];
      const { band, grantedBumpPct } = computeNegotiationRound({ playerLeverage: neg.playerLeverage, firmFlexibility: neg.firmFlexibility, round: neg.round, requestedBumpPct: posture.pct });
      const pool = BAND_TEXTS[band];
      const responseText = pool[randInt(0, pool.length - 1)];
      return { ...neg, phase: "response", band, grantedBumpPct, responseText };
    });
  }

  function pushNegotiationAgain() {
    setNegotiation((neg) => (neg && neg.round < 3 ? { ...neg, round: neg.round + 1, phase: "posture" } : neg));
  }

  function acceptNegotiatedOffer() {
    setNegotiation((neg) => (neg ? { ...neg, phase: "compform" } : neg));
  }

  function declineNegotiation() {
    setNegotiation(null);
  }

  function finalizeNegotiatedHire(useEquity) {
    if (!negotiation) return;
    const firm = firms.find((f) => f.id === negotiation.firmId);
    if (isCeo) setCeoFirmId(null);
    const totalBonus = Math.round(negotiation.baseBonus * (1 + negotiation.grantedBumpPct));
    const bonusCash = useEquity ? Math.round(totalBonus * 0.7) : totalBonus;
    const equityValue = useEquity ? Math.round(totalBonus * 0.3) : 0;
    setCurrentFirmId(negotiation.firmId);
    setYear((y) => y + 1);
    setCareerHistory((h) => [...h, { firmName: firm.name, role: currentRank.name, year: year + 1, negotiatedSalary: negotiation.baseSalary, negotiatedBonusCash: bonusCash, equityValue, equityFirmId: useEquity ? negotiation.firmId : null }]);
    setNews((n) => [`T${quarter} — ${playerName} rejoint ${firm.name} au poste de ${currentRank.name}, après négociation.`, ...n]);
    setApplicationResult({ success: true, message: `Poste confirmé chez ${firm.name}, aux conditions négociées.` });
    setNegotiation(null);
  }

  function respondCeoOffer(mailId, accept) {
    const offer = mail.find((m) => m.id === mailId);
    if (!offer || offer.type !== "ceo-offer" || offer.status !== "pending") return;
    setMail((m) => m.map((item) => (item.id === mailId ? { ...item, status: accept ? "accepted" : "declined" } : item)));
    if (!accept) return;

    const targetFirm = firms.find((f) => f.id === offer.firmId);
    setCeoFirmId(offer.firmId);
    if (offer.mode === "external") {
      setCurrentFirmId(offer.firmId);
      setYear((y) => y + 1);
      setCareerHistory((h) => [...h, { firmName: targetFirm.name, role: "CEO", year: year + 1 }]);
      setNews((n) => [`T${quarter} — ${playerName} devient CEO de ${targetFirm.name}, recruté(e) confidentiellement par son Board.`, ...n]);
    } else {
      setCareerHistory((h) => [...h, { firmName: targetFirm.name, role: "CEO", year }]);
      setNews((n) => [`T${quarter} — ${playerName} est promu(e) CEO de ${targetFirm.name} par décision du Board.`, ...n]);
    }
  }

  // Étape 3 — chemin Fondateur : quitter le parcours employé pour construire sa propre firme,
  // financée d'abord sur capital personnel (voir FOUNDER_SEED_CAPITAL), puis par dette bancaire
  // (le système multi-banques existant) et enfin par des levées de fonds auprès de LPs.
  function foundOwnFirm() {
    if (rankIndex !== 4 || ownFirmId) return;
    if (isCeo) setCeoFirmId(null);
    const id = `${playerName.toLowerCase().replace(/[^a-z]+/g, "-")}-capital`;
    const name = `${playerName} Capital`;
    const newFirm = { id, name, score: 40, employees: 3, public: false, corporateDebt: 0, debtWeightedRate: 0, lpCommitted: 0, cash: 1, fundsRaised: 0 };
    setFirms((prev) => [...prev, newFirm]);
    setCurrentFirmId(id);
    setOwnFirmId(id);
    setDryPowder(FOUNDER_SEED_CAPITAL);
    setYear((y) => y + 1);
    setCareerHistory((h) => [...h, { firmName: name, role: "Fondateur", year: year + 1 }]);
    setNews((n) => [`T${quarter} — ${playerName} quitte pour fonder ${name}, financée sur capital personnel (${FOUNDER_SEED_CAPITAL} M$).`, ...n]);
  }

  function attemptFundraise() {
    if (!ownFirm || currentFirmId !== ownFirmId || quarter <= lastFundraiseQuarter) return;
    setLastFundraiseQuarter(quarter);
    const result = attemptFundraiseRoll({ firm: ownFirm, reputation, careerProfile });
    if (result.success) {
      setFirms((prev) => prev.map((f) => (f.id === ownFirmId ? { ...f, lpCommitted: f.lpCommitted + result.raised, fundsRaised: f.fundsRaised + 1 } : f)));
      setDryPowder((d) => +(d + result.raised).toFixed(1));
      setNews((n) => [`T${quarter} — ${ownFirm.name} lève ${result.raised} M$ auprès de nouveaux LPs.`, ...n]);
      setFundraiseResult({ success: true, message: `Levée réussie : ${result.raised} M$ engagés.` });
    } else {
      setFundraiseResult({ success: false, message: "Les LPs sollicités ne sont pas convaincus cette fois-ci — retentez votre chance dans quelques trimestres." });
    }
  }

  const marketSorted = [...firms].sort((a, b) => b.score - a.score);
  const playerPosition = marketSorted.findIndex((f) => f.id === currentFirmId) + 1;
  const grossTotal = careerHistory.reduce((sum, h) => sum + getGrossForEntry(h), 0);
  const netTotal = Math.round(grossTotal * 0.62);

  if (!loaded) {
    return <div className="w-full min-h-screen flex items-center justify-center" style={{ backgroundColor: PALETTE.bg, color: PALETTE.textMuted }}>Chargement...</div>;
  }

  if (!playerName) {
    return <NameGate onStart={setPlayerName} />;
  }

  function selectTab(id) {
    setTab(id);
    setSelectedScenarioId(null);
    setApplicationResult(null);
    setViewingOfferId(null);
    setFundraiseResult(null);
  }

  return (
    <div className="w-full min-h-screen flex flex-col" style={{ backgroundColor: PALETTE.bg, color: PALETTE.textPrimary, fontFamily: "'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif" }}>
      <Header playerName={playerName} currentFirm={currentFirm} staff={staff} currentRank={currentRank} isCeo={isCeo} isFounder={currentFirmId === ownFirmId} playerPosition={playerPosition} firmsCount={firms.length} quarter={quarter} advanceQuarter={advanceQuarter} />
      <NavTabs tab={tab} onSelect={selectTab} isDirectorial={isDirectorial} isPartner={isPartner} />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-8">
        {tab === "apercu" && (
          <OverviewTab
            currentFirm={currentFirm} rankIndex={rankIndex} currentRank={currentRank} nextRank={nextRank}
            progressPct={progressPct} xp={xp} dealsReviewed={dealsReviewed} completedCount={completedCount}
            visibleScenarios={visibleScenarios} staff={staff} setTab={setTab} setXp={setXp} playerName={playerName} reputation={reputation} isCeo={isCeo}
          />
        )}

        {tab === "cas" && (
          <CasesTab
            visibleScenarios={visibleScenarios} completedCount={completedCount} currentRank={currentRank}
            scenarioChoices={scenarioChoices} selectedScenario={selectedScenario} chosenOptionId={chosenOptionId}
            setSelectedScenarioId={setSelectedScenarioId} handleChoose={handleChoose} currentFirm={currentFirm}
          />
        )}

        {tab === "acquisitions" && (
          <AcquisitionsTab
            isDirectorial={isDirectorial} staff={staff} acquisitionSlots={acquisitionSlots}
            expandedCompanyId={expandedCompanyId} setExpandedCompanyId={setExpandedCompanyId}
            proposalChoices={proposalChoices} pickProposal={pickProposal} passOn={passOn}
            selectedProposal={selectedProposal} bankRejections={bankRejections} requestFinancing={requestFinancing}
            portfolio={portfolio} quarter={quarter} dryPowder={dryPowder} addBoltOn={addBoltOn}
            ddResults={ddResults} investigateDD={investigateDD}
            selectedThesis={selectedThesis} chooseThesis={chooseThesis}
          />
        )}

        {tab === "banque" && (
          <BankTab
            dryPowder={dryPowder} isDirectorial={isDirectorial} loanLog={loanLog}
            corporateDebt={currentFirm.corporateDebt || 0} debtWeightedRate={currentFirm.debtWeightedRate || 0}
            portfolioEbitda={portfolio.reduce((s, p) => s + (p.ebitda || 0), 0)} repayDebt={repayDebt}
          />
        )}

        {tab === "finances" && isDirectorial && (
          <FinancesTab currentFirm={currentFirm} dryPowder={dryPowder} portfolio={portfolio} quarter={quarter} />
        )}

        {tab === "founder" && isPartner && (
          <FounderTab
            playerName={playerName} ownFirmId={ownFirmId} ownFirm={ownFirm} currentFirmId={currentFirmId}
            dryPowder={dryPowder} portfolio={portfolio} quarter={quarter} foundOwnFirm={foundOwnFirm}
            attemptFundraise={attemptFundraise} fundraiseResult={fundraiseResult} lastFundraiseQuarter={lastFundraiseQuarter}
          />
        )}

        {tab === "carriere" && <CareerTab playerName={playerName} year={year} careerHistory={careerHistory} grossTotal={grossTotal} netTotal={netTotal} endgamePath={endgamePath} />}

        {tab === "marche" && (
          <MarketTab marketSorted={marketSorted} currentFirm={currentFirm} currentFirmId={currentFirmId} rankIndex={rankIndex} goPublic={goPublic} launchTakeover={launchTakeover} ceoFirmId={ceoFirmId} ownFirmId={ownFirmId} playerName={playerName} />
        )}

        {tab === "emploi" && negotiation && (
          <NegotiationPanel
            negotiation={negotiation} firmName={firms.find((f) => f.id === negotiation.firmId)?.name || ""}
            submitPosture={submitNegotiationPosture} pushAgain={pushNegotiationAgain}
            acceptNegotiatedOffer={acceptNegotiatedOffer} declineOffer={declineNegotiation} finalizeHire={finalizeNegotiatedHire}
          />
        )}

        {tab === "emploi" && !negotiation && (
          <JobsTab
            currentFirmId={currentFirmId} firms={firms} rankIndex={rankIndex} currentRank={currentRank}
            applicationResult={applicationResult} setApplicationResult={setApplicationResult}
            viewingOfferId={viewingOfferId} setViewingOfferId={setViewingOfferId} confirmApplication={confirmApplication}
          />
        )}

        {tab === "mails" && <MailTab mail={mail} setTab={setTab} respondCeoOffer={respondCeoOffer} />}

        {tab === "actualites" && <NewsTab news={news} />}

        {tab === "revision" && <RevisionTab revisionCards={revisionCards} reshuffleCards={reshuffleCards} />}
      </main>

      <GlossaryFooter open={glossaryOpen} setOpen={setGlossaryOpen} />
    </div>
  );
}

import { PromiseAuditRow, PromiseRow, Verdict, AnnualRow, QuarterRow } from "@/types";
import { FINANCIALS } from "@/data/financials";
import { CONCALLS } from "@/data/concalls";
import { findQuarter } from "@/lib/metrics";

// Deterministic narrative audit: no LLM in the loop. Promises with structured
// targets are evaluated against the (synthetic) reported financials; custom
// promises carry pre-extracted actuals (the "extraction cache").

const LATEST_QUARTER = "Q2FY27";
const LATEST_FY = 27;

function actualFor(
  row: PromiseRow,
  annual: AnnualRow[],
  quarterly: QuarterRow[]
): { display: string; num: number | null } | null {
  if (row.actualOverride) {
    return { display: row.actualOverride.display, num: row.actualOverride.num ?? null };
  }
  if (row.targetLo === undefined && row.targetHi === undefined) return null;

  if (row.metricKey === "ebitda_margin_pct") {
    if (/^FY\d+$/.test(row.horizon)) {
      const cur = annual.find((a) => a.fy === row.horizon);
      if (!cur) return null;
      const m = (cur.ebitda / cur.revenue) * 100;
      return { display: `${m.toFixed(1)}%`, num: m };
    }
    const qr = findQuarter(quarterly, row.horizon);
    if (!qr) return null;
    const m = (qr.ebitda / qr.revenue) * 100;
    return { display: `${m.toFixed(1)}%`, num: m };
  }

  if (row.metricKey === "revenue_growth_yoy" || row.metricKey === "pat_growth_yoy") {
    const field = row.metricKey === "revenue_growth_yoy" ? "revenue" : "pat";
    if (/^FY\d+$/.test(row.horizon)) {
      const cur = annual.find((a) => a.fy === row.horizon);
      const prev = annual.find((a) => a.fy === `FY${Number(row.horizon.slice(2)) - 1}`);
      if (!cur || !prev) return null;
      const g = ((cur[field] - prev[field]) / prev[field]) * 100;
      return { display: `${g.toFixed(1)}% YoY`, num: g };
    }
    if (/^Q\dFY\d+$/.test(row.horizon)) {
      const qr = findQuarter(quarterly, row.horizon);
      const prev = findQuarter(
        quarterly,
        row.horizon.replace(/^Q(\d)FY(\d+)$/, (_m, q, fy) => `Q${q}FY${Number(fy) - 1}`)
      );
      if (!qr || !prev) return null;
      const g = ((qr[field] - prev[field]) / prev[field]) * 100;
      return { display: `${g.toFixed(1)}% YoY`, num: g };
    }
  }
  return null;
}

function judge(row: PromiseRow, actualNum: number | null): Verdict {
  if (row.actualOverride?.verdict) return row.actualOverride.verdict;
  if (actualNum === null || (row.targetLo === undefined && row.targetHi === undefined)) return "pending";
  const lo = row.targetLo ?? row.targetHi ?? 0;
  const hi = row.targetHi ?? row.targetLo ?? 0;
  const mid = (lo + hi) / 2;
  const tol = (row.tolerancePct ?? 5) / 100;
  const band = Math.abs(mid) * tol;
  if (actualNum >= mid - band && actualNum <= mid + band) return "delivered";
  if (
    row.targetLo !== undefined &&
    row.targetHi !== undefined &&
    actualNum >= row.targetLo * (1 - tol) &&
    actualNum <= row.targetHi * (1 + tol)
  )
    return "partial";
  const gap = Math.abs(actualNum - mid) / Math.abs(mid || 1);
  if (gap > 0.15) return "missed";
  return "partial";
}

const isPendingHorizon = (horizon: string): boolean =>
  horizon === `FY${LATEST_FY}` ||
  horizon.startsWith(`H${LATEST_FY}`) ||
  horizon.startsWith(`H2FY${LATEST_FY}`) ||
  horizon === LATEST_QUARTER;

export function auditPromises(ticker: string): PromiseAuditRow[] {
  const file = FINANCIALS[ticker];
  const concall = CONCALLS[ticker];
  if (!file || !concall) return [];
  const { annual, quarterly } = file;

  return concall.promises.map((row) => {
    if (row.actualOverride?.verdict) {
      return {
        ...row,
        actual: row.actualOverride.display,
        verdict: row.actualOverride.verdict,
        gap:
          row.actualOverride.num !== undefined
            ? `Delivered ${row.actualOverride.display} vs guided ${row.target}`
            : row.actualOverride.display,
      };
    }
    if (isPendingHorizon(row.horizon)) {
      return { ...row, actual: null, verdict: "pending" as Verdict, gap: "Period not yet reported — tracking." };
    }
    const actual = actualFor(row, annual, quarterly);
    if (!actual) {
      return { ...row, actual: null, verdict: "pending" as Verdict, gap: "Awaiting reported data." };
    }
    const verdict = judge(row, actual.num);
    const gap =
      verdict === "delivered"
        ? `Delivered ${actual.display} vs guided ${row.target}`
        : verdict === "partial"
          ? `Close: ${actual.display} vs guided ${row.target}`
          : `Delivered ${actual.display} vs guided ${row.target}`;
    return { ...row, actual: actual.display, verdict, gap };
  });
}

export function scorecard(
  audits: PromiseAuditRow[]
): { delivered: number; partial: number; missed: number; pending: number; note: string } {
  const c = { delivered: 0, partial: 0, missed: 0, pending: 0 };
  for (const a of audits) c[a.verdict]++;
  const judged = c.delivered + c.partial + c.missed;
  const note =
    judged === 0
      ? "No judged promises yet."
      : c.missed === 0
        ? `${c.delivered}/${judged} delivered, none missed — management has kept its word so far.`
        : `${c.missed} missed of ${judged} judged — treat forward guidance with a haircut.`;
  return { ...c, note };
}

// ── Bull vs Bear — deterministic, computed from primary financials only ──────

export interface BullBear {
  bull: string[];
  bear: string[];
}

export function buildBullBear(
  ticker: string,
  nextGuidance: PromiseRow[] = []
): BullBear {
  const file = FINANCIALS[ticker];
  const bull: string[] = [];
  const bear: string[] = [];
  if (!file) return { bull, bear };
  const { quarterly, annual } = file;
  const n = quarterly.length;
  const last = quarterly[n - 1];

  // Margin trend (YoY)
  const mNow = (last.ebitda / last.revenue) * 100;
  if (n >= 5) {
    const yoyBps = (mNow - (quarterly[n - 5].ebitda / quarterly[n - 5].revenue) * 100) * 100;
    if (yoyBps > 0) bull.push(`EBITDA margin +${Math.round(yoyBps)}bps YoY to ${mNow.toFixed(1)}% (${last.q}).`);
    else bear.push(`EBITDA margin ${Math.round(yoyBps)}bps YoY to ${mNow.toFixed(1)}% — compression at the operating line.`);
  }

  // Revenue acceleration vs prior quarter's growth
  if (n >= 9) {
    const yoyLatest = ((quarterly[n - 1].revenue - quarterly[n - 5].revenue) / quarterly[n - 5].revenue) * 100;
    const yoyPrev = ((quarterly[n - 2].revenue - quarterly[n - 6].revenue) / quarterly[n - 6].revenue) * 100;
    if (yoyLatest > yoyPrev) bull.push(`Revenue growth accelerating: ${yoyLatest.toFixed(1)}% YoY in ${last.q} vs ${yoyPrev.toFixed(1)}% in ${quarterly[n - 2].q}.`);
    else bear.push(`Revenue growth decelerating: ${yoyLatest.toFixed(1)}% YoY in ${last.q} vs ${yoyPrev.toFixed(1)}% the prior quarter.`);
  } else if (n >= 5) {
    const yoyLatest = ((quarterly[n - 1].revenue - quarterly[n - 5].revenue) / quarterly[n - 5].revenue) * 100;
    bull.push(`Revenue ${yoyLatest >= 0 ? "+" : ""}${yoyLatest.toFixed(1)}% YoY in ${last.q}.`);
  }

  // Cash conversion
  const a = annual[annual.length - 1];
  if (a.cfo !== 0 || a.capex !== 0) {
    const ratio = a.cfo / a.pat;
    if (ratio >= 1) bull.push(`CFO/PAT at ${ratio.toFixed(2)}× (${a.fy}) — accounting profit is converting to real cash.`);
    else bear.push(`CFO/PAT at only ${ratio.toFixed(2)}× (${a.fy}: CFO ₹${(a.cfo / 1000).toFixed(1)}K Cr vs PAT ₹${(a.pat / 1000).toFixed(1)}K Cr) — watch receivables and working capital.`);
    const fcf = a.cfo - a.capex;
    if (fcf < 0) bear.push(`FCF negative (${fmtCrInr(fcf)}) in ${a.fy} — expansion is capex-funded; equity dilution or debt would follow.`);
    else if (fcf / a.pat >= 0.6) bull.push(`FCF conversion ${Math.round((fcf / a.pat) * 100)}% of PAT (${a.fy}).`);
  }

  // Leverage
  const prevA = annual[annual.length - 2];
  if (a.debt / a.equity > 1.5) bear.push(`Leverage: D/E ${(a.debt / a.equity).toFixed(2)}× (${a.fy}) — funding structure carries refinancing risk.`);
  else if (prevA && a.debt / a.equity < prevA.debt / prevA.equity - 0.1) bull.push(`Deleveraging: D/E ${(prevA.debt / prevA.equity).toFixed(2)}× → ${(a.debt / a.equity).toFixed(2)}× over the last year.`);

  // Management integrity (from the audit above)
  const sc = scorecard(auditPromises(ticker));
  const judged = sc.delivered + sc.partial + sc.missed;
  if (judged > 0) {
    if (sc.missed === 0 && sc.delivered > 0) bull.push(`Management has delivered on ${sc.delivered}/${judged} audited concall promises — guidance is credible.`);
    if (sc.missed > 0) bear.push(`Missed ${sc.missed} of ${judged} audited concall promises — discount forward guidance accordingly.`);
  }

  for (const g of nextGuidance.slice(0, 2)) bull.push(`Management now guides ${g.metricLabel.toLowerCase()} at ${g.target} (${g.madeIn} call) — audited when reported.`);
  void a; void prevA; void last; void n;
  return { bull: bull.slice(0, 4), bear: bear.slice(0, 4) };
}

const fmtCrInr = (v: number): string => (Math.abs(v) >= 1000 ? `₹${(v / 1000).toFixed(1)}K Cr` : `₹${v.toFixed(0)} Cr`);

import { QuarterRow, AnnualRow, ResultsFirstCut, MetricDelta } from "@/types";

export const pct = (a: number, b: number): number => ((a - b) / b) * 100;

export const fmtCr = (v: number): string => {
  if (Math.abs(v) >= 100000) return `₹${(v / 100000).toFixed(2)}L Cr`;
  if (Math.abs(v) >= 1000) return `₹${(v / 1000).toFixed(v >= 10000 ? 1 : 2)}K Cr`;
  return `₹${v.toFixed(0)} Cr`;
};

export const fmtPct = (v: number | null | undefined, digits = 1): string =>
  v === null || v === undefined ? "—" : `${v > 0 ? "+" : ""}${v.toFixed(digits)}%`;

export const fmtBps = (v: number | null | undefined): string =>
  v === null || v === undefined ? "—" : `${v > 0 ? "+" : ""}${Math.round(v)}bps`;

export const marginOf = (row: QuarterRow): number => (row.ebitda / row.revenue) * 100;

const delta = (arr: QuarterRow[], i: number, key: keyof QuarterRow, lag: number): number | null => {
  const j = i - lag;
  if (j < 0) return null;
  const cur = arr[i][key] as number;
  const prev = arr[j][key] as number;
  return pct(cur, prev);
};

export function computeFirstCut(quarterly: QuarterRow[]): ResultsFirstCut {
  const n = quarterly.length;
  if (n === 0) throw new Error("no quarterly data");
  const last = quarterly[n - 1];
  const m = (i: number) => marginOf(quarterly[i]);
  const dq = (key: keyof QuarterRow): number | null => delta(quarterly, n - 1, key, 1);
  const dy = (key: keyof QuarterRow): number | null => delta(quarterly, n - 1, key, 4);
  const metric = (key: keyof QuarterRow): MetricDelta => ({
    value: last[key] as number,
    qoq: dq(key),
    yoy: dy(key),
  });
  const marginBps = (lag: number): number | null => {
    const j = n - 1 - lag;
    return j < 0 ? null : (m(n - 1) - m(j)) * 100;
  };
  return {
    quarter: last.q,
    revenue: metric("revenue"),
    ebitda: metric("ebitda"),
    ebitdaMargin: { value: m(n - 1), qoqBps: marginBps(1), yoyBps: marginBps(4) },
    pbt: metric("pbt"),
    pat: metric("pat"),
  };
}

export interface CashQuality {
  fy: string;
  cfo: number;
  capex: number;
  fcf: number;
  cfoPatRatio: number | null;
  fcfConversion: number | null; // FCF / PAT %
  series: { fy: string; cfo: number; pat: number }[];
  applicable: boolean; // false for banks/NBFC
}

export function cashQuality(annual: AnnualRow[]): CashQuality | null {
  if (annual.length === 0) return null;
  const last = annual[annual.length - 1];
  const applicable = last.cfo !== 0 || last.capex !== 0;
  const fcf = last.cfo - last.capex;
  return {
    fy: last.fy,
    cfo: last.cfo,
    capex: last.capex,
    fcf,
    cfoPatRatio: applicable && last.pat !== 0 ? last.cfo / last.pat : null,
    fcfConversion: applicable && last.pat !== 0 ? (fcf / last.pat) * 100 : null,
    series: annual.map((a) => ({ fy: a.fy, cfo: a.cfo, pat: a.pat })),
    applicable,
  };
}

export interface BalanceSheetTrend {
  fy: string;
  debt: number;
  equity: number;
  deRatio: number;
  trend: { fy: string; ratio: number }[];
}

export function balanceSheet(annual: AnnualRow[]): BalanceSheetTrend | null {
  if (annual.length === 0) return null;
  const last = annual[annual.length - 1];
  return {
    fy: last.fy,
    debt: last.debt,
    equity: last.equity,
    deRatio: last.debt / last.equity,
    trend: annual.map((a) => ({ fy: a.fy, ratio: a.debt / a.equity })),
  };
}

// quarter helpers for narrative audit
const Q_ORDER = ["Q1", "Q2", "Q3", "Q4"];
const parseQ = (q: string): { n: number; fy: number } => {
  const m = q.match(/^Q([1-4])FY(\d+)$/);
  if (!m) throw new Error(`bad quarter ${q}`);
  return { n: Number(m[1]), fy: Number(m[2]) };
};
export const quarterKey = (n: number, fy: number) => `Q${n}FY${fy}`;
export const prevQuarter = (q: string): string => {
  const { n, fy } = parseQ(q);
  return n === 1 ? quarterKey(4, fy - 1) : quarterKey(n - 1, fy);
};
export const sameQuarterPrevYear = (q: string): string => quarterKey(parseQ(q).n, parseQ(q).fy - 1);
export const findQuarter = (quarterly: QuarterRow[], q: string): QuarterRow | undefined =>
  quarterly.find((r) => r.q === q);
export const fyOf = (quarter: string): number => parseQ(quarter).fy;

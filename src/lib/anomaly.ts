import { EodBar, Anomaly } from "@/types";

export interface AnomalyThresholds {
  volumeX: number; // e.g. 2.0 → vol > 2× 20d avg
  pricePct: number; // e.g. 3.0 → |day move| > 3%
}

export const DEFAULT_THRESHOLDS: AnomalyThresholds = { volumeX: 2.0, pricePct: 3.0 };

export function avgVolume(bars: EodBar[], lookback: number, excludeLast = true): number {
  const pool = excludeLast ? bars.slice(0, -1) : bars;
  const window = pool.slice(-lookback);
  if (window.length === 0) return 0;
  return window.reduce((s, b) => s + b.volume, 0) / window.length;
}

export function detectAnomalies(
  bars: EodBar[],
  ticker: string,
  thresholds: AnomalyThresholds = DEFAULT_THRESHOLDS
): Anomaly[] {
  if (bars.length < 5) return [];
  const last = bars[bars.length - 1];
  const prev = bars[bars.length - 2];
  const out: Anomaly[] = [];

  const vAvg = avgVolume(bars, 20);
  const volX = vAvg > 0 ? last.volume / vAvg : 0;
  if (volX >= thresholds.volumeX) {
    out.push({
      ticker,
      kind: "volume_spike",
      volX: Math.round(volX * 10) / 10,
      detail: `Volume ${volX.toFixed(1)}× its 20-day average (${fmtVol(last.volume)} vs ${fmtVol(vAvg)} avg)`,
    });
  }

  const dayPct = ((last.close - prev.close) / prev.close) * 100;
  if (Math.abs(dayPct) >= thresholds.pricePct) {
    out.push({
      ticker,
      kind: "price_breakout",
      dayPct: Math.round(dayPct * 10) / 10,
      detail: `Price moved ${dayPct > 0 ? "+" : ""}${dayPct.toFixed(1)}% in the session (threshold ±${thresholds.pricePct}%)`,
    });
  }
  return out;
}

const fmtVol = (v: number): string =>
  v >= 1e7 ? `${(v / 1e7).toFixed(1)}Cr` : v >= 1e5 ? `${(v / 1e5).toFixed(1)}L` : `${Math.round(v / 1e3)}K`;

export function allAnomalies(
  quotes: Record<string, EodBar[]>,
  thresholds: AnomalyThresholds = DEFAULT_THRESHOLDS
): Anomaly[] {
  const out: Anomaly[] = [];
  for (const [ticker, bars] of Object.entries(quotes)) {
    out.push(...detectAnomalies(bars, ticker, thresholds));
  }
  return out;
}

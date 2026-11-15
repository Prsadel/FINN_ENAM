import { QuoteData } from "./yahoo";
import { ResultsFirstCut, FeedItem, FeedResponse, Anomaly } from "@/types";
import { ANNOUNCEMENTS, DEMO_NOW } from "@/data/announcements";
import { COMPANIES, companyByTicker } from "@/data/companies";
import { FINANCIALS } from "@/data/financials";
import { QUOTES, QUOTE_META } from "@/data/quotes";
import { computeFirstCut } from "@/lib/metrics";
import { detectAnomalies, AnomalyThresholds } from "@/lib/anomaly";
import { matchCompany, matchIncomingPerson } from "@/lib/graph";
import { priorityOf } from "@/lib/classifier";

export const companies = COMPANIES;
export const now = () => new Date(DEMO_NOW);

export function quoteFor(ticker: string) {
  const bars = QUOTES[ticker];
  if (!bars) return null;
  const last = bars[bars.length - 1];
  const prev = bars[bars.length - 2];
  const vAvg = bars.slice(0, -1).slice(-20).reduce((s, b) => s + b.volume, 0) / Math.min(20, bars.length - 1);
  const meta = QUOTE_META[ticker] ?? { high52w: Math.max(...bars.map((b) => b.close)), low52w: Math.min(...bars.map((b) => b.close)) };
  return {
    close: last.close,
    prevClose: prev.close,
    changePct: ((last.close - prev.close) / prev.close) * 100,
    volume: last.volume,
    avgVolume20d: vAvg,
    high52w: meta.high52w,
    low52w: meta.low52w,
    spark: bars.slice(-22),
  };
}

export interface WindowedFeedInput {
  windowHours: number;
  thresholds?: AnomalyThresholds;
  liveQuote?: QuoteData | null; // for unknown tickers when we enrich feed
}

export function buildFeed(windowHours: number, thresholds: AnomalyThresholds = { volumeX: 2.0, pricePct: 3.0 }): FeedResponse {
  const nowMs = now().getTime();
  const cutoff = nowMs - windowHours * 3600_000;
  const recent = ANNOUNCEMENTS.filter((a) => new Date(a.date).getTime() >= cutoff);

  const anomalies: Anomaly[] = [];
  for (const [ticker, bars] of Object.entries(QUOTES)) {
    anomalies.push(...detectAnomalies(bars, ticker, thresholds));
  }

  const material: FeedItem[] = [];
  const routine: FeedItem[] = [];

  for (const a of recent) {
    const company = companyByTicker(a.ticker);
    const item: FeedItem = {
      announcement: a,
      companyName: company?.name ?? a.ticker,
      networkMatches: [],
    };

    if (a.category === "results" && FINANCIALS[a.ticker]) {
      try {
        item.firstCut = computeFirstCut(FINANCIALS[a.ticker].quarterly);
      } catch {
        /* no first-cut available */
      }
    }

    // Network interception
    if (a.category === "management_change" && a.managementChange?.incoming) {
      item.networkMatches = matchIncomingPerson({
        name: a.managementChange.incoming.name,
        careerArc: a.managementChange.incoming.careerArc,
        education: a.managementChange.incoming.education,
      });
    } else if (a.isMaterial) {
      item.networkMatches = matchCompany(a.ticker);
    }

    // attach matching anomaly to the same-day material card
    const annDay = a.date.slice(0, 10);
    const anom = anomalies.find(
      (x) => x.ticker === a.ticker && QUOTES[a.ticker]?.[QUOTES[a.ticker].length - 1]?.date === annDay
    );
    if (anom) item.anomaly = anom;

    (a.isMaterial ? material : routine).push(item);
  }

  material.sort(
    (x, y) =>
      priorityOf(y.announcement.category, y.announcement.isMaterial) -
        priorityOf(x.announcement.category, x.announcement.isMaterial) ||
      (y.announcement.date < x.announcement.date ? -1 : 1)
  );
  routine.sort((x, y) => (y.announcement.date < x.announcement.date ? -1 : 1));

  return {
    generatedAt: DEMO_NOW,
    windowHours,
    material,
    routine,
    anomalies: anomalies.sort((a, b) => (a.kind === b.kind ? 0 : a.kind === "price_breakout" ? -1 : 1)),
    counts: { total: recent.length, material: material.length, routine: routine.length, anomalies: anomalies.length },
  };
}

export function recentMaterialAnnouncements(hours = 168) {
  const cutoff = now().getTime() - hours * 3600_000;
  return ANNOUNCEMENTS.filter((a) => a.isMaterial && new Date(a.date).getTime() >= cutoff);
}

export function firstCutFor(ticker: string): ResultsFirstCut | null {
  const f = FINANCIALS[ticker];
  if (!f) return null;
  try {
    return computeFirstCut(f.quarterly);
  } catch {
    return null;
  }
}

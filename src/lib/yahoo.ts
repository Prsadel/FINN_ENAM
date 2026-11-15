// Live generalizer for any NSE ticker: Yahoo Finance public chart endpoint,
// called server-side from Next.js route handlers. Graceful degradation:
//   Tier 1: chart endpoint (price/volume/52w) — highly reliable, no auth
//   Tier 2: quoteSummary (name, sector, key stats) — sometimes 401s
//   Tier 3: minimal shell with just market data
// Everything cached in-memory for the serverless instance lifetime.

export interface QuoteData {
  ticker: string; // normalized, no .NS
  yahooSymbol: string;
  name: string;
  close: number;
  prevClose: number;
  changePct: number;
  volume: number;
  avgVolume20d: number;
  high52w: number | null;
  low52w: number | null;
  spark: { date: string; close: number; volume: number }[];
  currency: string;
}

const chartCache = new Map<string, { at: number; data: QuoteData | null }>();
const TTL = 10 * 60_000;

const YF_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
  Accept: "application/json",
};

export function toYahooSymbol(ticker: string): string {
  const t = ticker.toUpperCase();
  if (t.endsWith(".NS") || t.endsWith(".BO")) return t;
  return `${t}.NS`;
}

export function normalizeTicker(ticker: string): string {
  return ticker.toUpperCase().replace(/\.(NS|BO)$/, "");
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* eslint-disable @typescript-eslint/no-explicit-any */
async function fetchChart(symbol: string): Promise<any> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=3mo&interval=1d`;
  let lastErr: unknown;
  // retry once with backoff — Yahoo rate-limits (429) bursty callers
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(url, { headers: YF_HEADERS, signal: AbortSignal.timeout(8000) });
      if (!res.ok) throw new Error(`chart ${res.status}`);
      return await res.json();
    } catch (e) {
      lastErr = e;
      if (attempt === 0) await sleep(800);
    }
  }
  throw lastErr;
}

export async function fetchLiveQuote(rawTicker: string): Promise<QuoteData | null> {
  const ticker = normalizeTicker(rawTicker);
  const key = ticker;
  const cached = chartCache.get(key);
  if (cached && Date.now() - cached.at < TTL) return cached.data;

  const symbol = toYahooSymbol(ticker);
  try {
    const json = await fetchChart(symbol);
    const result = json?.chart?.result?.[0];
    if (!result) throw new Error("empty chart");

    const meta = result.meta ?? {};
    const ts: number[] = result.timestamp ?? [];
    const quote = result.indicators?.quote?.[0] ?? {};
    const closes: (number | null)[] = quote.close ?? [];
    const volumes: (number | null)[] = quote.volume ?? [];

    const bars = ts
      .map((t, i) => ({
        date: new Date(t * 1000).toISOString().slice(0, 10),
        close: closes[i] ?? NaN,
        volume: volumes[i] ?? 0,
      }))
      .filter((b) => Number.isFinite(b.close) && b.close > 0);
    if (bars.length < 2) throw new Error("insufficient bars");

    const last = bars[bars.length - 1];
    const prev = bars[bars.length - 2];
    const volPool = bars.slice(0, -1).slice(-20).map((b) => b.volume).filter((v) => v > 0);
    const avgVolume20d = volPool.length ? volPool.reduce((s, v) => s + v, 0) / volPool.length : last.volume;

    const data: QuoteData = {
      ticker,
      yahooSymbol: symbol,
      name: meta.longName ?? meta.shortName ?? meta.symbol ?? ticker,
      close: last.close,
      prevClose: prev.close,
      changePct: ((last.close - prev.close) / prev.close) * 100,
      volume: last.volume,
      avgVolume20d,
      high52w: meta.fiftyTwoWeekHigh ?? null,
      low52w: meta.fiftyTwoWeekLow ?? null,
      spark: bars.slice(-22),
      currency: meta.currency ?? "INR",
    };
    chartCache.set(key, { at: Date.now(), data });
    return data;
  } catch {
    chartCache.set(key, { at: Date.now(), data: null });
    return null;
  }
}

// Optional enrichment for unknown tickers (may 401 — non-fatal)
export interface LiveProfile {
  sector?: string;
  industry?: string;
  marketCapCr?: number;
  description?: string;
  deRatio?: number;
  roce?: number;
  roe?: number;
}

const profileCache = new Map<string, { at: number; data: LiveProfile | null }>();

export async function fetchLiveProfile(rawTicker: string): Promise<LiveProfile | null> {
  const ticker = normalizeTicker(rawTicker);
  const cached = profileCache.get(ticker);
  if (cached && Date.now() - cached.at < TTL) return cached.data;
  const symbol = toYahooSymbol(ticker);
  try {
    const url = `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(symbol)}?modules=assetProfile,summaryDetail,defaultKeyStatistics,financialData`;
    const res = await fetch(url, { headers: YF_HEADERS, signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`summary ${res.status}`);
    const json = await res.json();
    const r = json?.quoteSummary?.result?.[0];
    if (!r) throw new Error("empty profile");
    const data: LiveProfile = {
      sector: r.assetProfile?.sector ?? undefined,
      industry: r.assetProfile?.industry ?? undefined,
      description: r.assetProfile?.longBusinessSummary?.slice(0, 400) ?? undefined,
      marketCapCr: r.summaryDetail?.marketCap?.raw ? r.summaryDetail.marketCap.raw / 1e7 : undefined, // INR → Cr
      deRatio: r.financialData?.debtToEquity?.raw ? r.financialData.debtToEquity.raw / 100 : undefined,
      roe: r.financialData?.returnOnEquity?.raw ? r.financialData.returnOnEquity.raw * 100 : undefined,
    };
    profileCache.set(ticker, { at: Date.now(), data });
    return data;
  } catch {
    profileCache.set(ticker, { at: Date.now(), data: null });
    return null;
  }
}

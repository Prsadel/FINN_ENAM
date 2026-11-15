import { CompanyPayload } from "@/types";
import { companyByTicker } from "@/data/companies";
import { FINANCIALS, normalizeTicker } from "@/data/financials";
import { computeFirstCut, cashQuality, balanceSheet } from "@/lib/metrics";
import { matchCompany } from "@/lib/graph";
import { auditPromises, scorecard, buildBullBear } from "@/lib/narrative";
import { quoteFor } from "@/lib/data";
import { CONCALLS } from "@/data/concalls";
import { fetchLiveQuote, fetchLiveProfile } from "@/lib/yahoo";

export async function buildCompanyPayload(rawTicker: string): Promise<CompanyPayload | null> {
  const ticker = normalizeTicker(rawTicker);

  const company = companyByTicker(ticker);
  const fin = FINANCIALS[ticker];
  if (company && fin) {
    const q = quoteFor(ticker);
    if (!q) return null;
    const firstCut = computeFirstCut(fin.quarterly);
    const cq = cashQuality(fin.annual)!;
    const bal = balanceSheet(fin.annual)!;
    const audits = auditPromises(ticker);
    return {
      company,
      quote: q,
      firstCut,
      quarterly: fin.quarterly,
      annual: fin.annual,
      cashQuality: cq
        ? {
            fy: cq.fy,
            cfo: cq.cfo,
            capex: cq.capex,
            fcf: cq.fcf,
            cfoPatRatio: cq.cfoPatRatio,
            fcfConversion: cq.fcfConversion,
            series: cq.series,
            applicable: cq.applicable,
          }
        : null,
      balance: bal
        ? { fy: bal.fy, debt: bal.debt, equity: bal.equity, deRatio: bal.deRatio, deTrend: bal.trend }
        : null,
      audits,
      guidance: CONCALLS[ticker]?.nextGuidance ?? [],
    narrative: { scorecard: scorecard(audits), note: CONCALLS[ticker]?.sourceNote ?? "" },
    bullBear: buildBullBear(ticker, CONCALLS[ticker]?.nextGuidance ?? []),
    networkMatches: matchCompany(ticker),
      isKnownUniverse: true,
    };
  }

  // Generalizer path — unknown ticker, live Yahoo fetch
  const live = await fetchLiveQuote(ticker);
  if (!live) return null;
  const profile = await fetchLiveProfile(ticker);
  const bars = live.spark;
  const volPool = bars.slice(0, -1).slice(-20).map((b) => b.volume).filter((v) => v > 0);
  const vAvg = volPool.length ? volPool.reduce((s, v) => s + v, 0) / volPool.length : live.volume;
  return {
    company: {
      ticker: live.ticker,
      name: live.name,
      sector: profile?.sector ?? "—",
      industry: profile?.industry ?? "—",
      marketCapCr: profile?.marketCapCr ?? 0,
      inPortfolio: false,
      competitors: [],
      suppliers: [],
      customers: [],
      description:
        profile?.description ??
        "Live-fetched ticker outside the curated universe. Market data below is live from Yahoo Finance; primary-source research (annual reports, concall transcripts) indexes from filing portals in production.",
      segments: [],
      domainTags: [],
    },
    quote: {
      close: live.close,
      prevClose: live.prevClose,
      changePct: live.changePct,
      volume: live.volume,
      avgVolume20d: vAvg,
      high52w: live.high52w ?? live.close,
      low52w: live.low52w ?? live.close,
      spark: live.spark,
    },
    firstCut: null,
    quarterly: [],
    annual: [],
    cashQuality: null,
    balance: null,
    audits: [],
    guidance: [],
    narrative: null,
    bullBear: null,
    networkMatches: matchCompany(live.ticker, {
      sector: profile?.sector,
      industry: profile?.industry,
    }),
    isKnownUniverse: false,
  };
}

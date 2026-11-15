import { NextRequest, NextResponse } from "next/server";
import { COMPANIES, companyByTicker } from "@/data/companies";
import { FINANCIALS, normalizeTicker, TICKER_ALIASES } from "@/data/financials";
import { fetchLiveQuote } from "@/lib/yahoo";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").trim();
  if (!q) return NextResponse.json({ results: [] });
  const nq = normalizeTicker(q);
  const alias = TICKER_ALIASES[nq.toUpperCase()];

  const results = COMPANIES.filter(
    (c) =>
      c.ticker === nq ||
      c.ticker === alias ||
      c.ticker.includes(nq) ||
      c.name.toLowerCase().includes(q.toLowerCase())
  ).map((c) => ({
    ticker: c.ticker,
    name: c.name,
    sector: c.sector,
    inPortfolio: c.inPortfolio,
    inUniverse: true,
  }));

  if (results.length === 0) {
    // Unknown ticker — verify it exists live before offering it
    const exists = await fetchLiveQuote(nq);
    if (exists) {
      return NextResponse.json({
        results: [
          {
            ticker: exists.ticker,
            name: exists.name,
            sector: "Live fetch",
            inPortfolio: false,
            inUniverse: false,
          },
        ],
      });
    }
  }
  void companyByTicker;
  void FINANCIALS;
  return NextResponse.json({ results });
}

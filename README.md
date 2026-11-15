# FINN — Financial Investment Network Navigator

An AI-powered intelligence layer for high-conviction, public-markets investing.
Built for the **ENAM Holdings Founding AI Engineer Build Challenge**.

## What FINN does

- **PUSH** — Proactively surfaces what changed across a portfolio: a windowed digest of exchange filings classified into 17 categories, routine noise collapsed, material events amplified, with **configurable** EOD anomaly alerts (volume ≥ N× its 20-day average, price beyond ±N% in a session — the investor sets the thresholds).
- **PULL** — On-demand company research grounded strictly in primary sources (annual reports + concall transcripts): financial reality tables, annual cash-quality checks (CFO vs PAT, FCF conversion), balance-sheet leverage, the **Narrative vs. Numbers** promise audit, and a deterministic **Bull vs. Bear** synthesis.
- **NETWORK** — The investor's contact graph as an active intelligence layer, woven into every push and pull: who worked there, who knows whom, who to call — surfaced at the moment it matters, with "Prep me for X" meeting dossiers and warm-reconnect nudges.
- **GENERALIZER** — Any NSE ticker works: known-universe companies get the full deep-dive; unknown symbols fetch live EOD data server-side from Yahoo Finance (with 429-aware retry), and network matching falls back to sector/industry expertise so there is never an empty state.

## Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js 14 (App Router), Tailwind CSS — mobile-first (`max-w-md`), no chat UI |
| Backend | Next.js API routes (serverless on Vercel) |
| Data | Hybrid: build-time curated dataset (provenance-tagged synthetic fixtures scaled from public filings) for the demo universe + live Yahoo Finance fetch for arbitrary tickers |
| Intelligence | TS engines: 17-category classifier, anomaly engine, in-memory graph (BFS ≤3°, expertise match, diligence parser), deterministic financial math — LLM never does arithmetic |
| LLM | Pluggable, cache-first provider hook (Tier-1 extraction / Tier-2 synthesis routing); all analysis paths work keyless via pre-extracted caches |

## Data honesty

The 18-company portfolio, financials, filings, transcripts and the 35-person network are **synthetic demonstration fixtures** — realistic in magnitude, internally consistent (annual rows reconcile with quarterly sums), and clearly labelled in-app. They stand in for what the build-time pipelines would scrape (Screener.in quarterly tables, NSE/BSE filings, concall transcripts, public profiles). Unknown tickers served by the generalizer use **real live market data** from Yahoo Finance. See `architecture.md` for the full pipeline/provenance design.

## Run

```bash
npm install
npm run build   # production build
npm start       # serve
# or: npm run dev
```

Environment: none required (LLM layer is optional + cached).

## Repository map

```
src/app/            # Push feed · company deep-dive · research · network explorer · API routes
src/components/     # Feed cards, hero cards, drawer, tabs, sparkline
src/lib/            # classifier · anomaly engine · graph (BFS/expertise/prep) · metrics · narrative audit · yahoo generalizer
src/data/           # companies · financials · announcements · concalls · network · generated EOD quotes
scripts/            # build-time generators (quotes) — Python pipeline is build-time only by design
ai_logs/            # curated AI build history (submission deliverable)
```

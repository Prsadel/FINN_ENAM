# FINN — Financial Investment Network Navigator

An AI-powered intelligence layer for high-conviction, public-markets investing.
Built for the **ENAM Holdings Founding AI Engineer Build Challenge**.

## What FINN does

- **PUSH** — Proactively surfaces what changed across a portfolio: a windowed digest of exchange filings classified into 17 categories, routine noise collapsed, material events amplified, with EOD anomaly alerts (volume > 2× its 20-day average, price beyond ±X% in a session).
- **PULL** — On-demand company research grounded strictly in primary sources (annual reports + concall transcripts): financial reality tables, cash-quality checks, and a **Narrative vs. Numbers** audit of management's promises against actual delivery.
- **NETWORK** — The investor's contact graph as an active intelligence layer, woven into every push and pull: who worked there, who knows whom, who to call — surfaced at the moment it matters.

## Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js 14+ (App Router), Tailwind CSS — mobile-first |
| Backend | Next.js API routes (serverless on Vercel) |
| Data | Build-time Python pipeline (yfinance, Screener.in) → committed JSON |
| Intelligence | TS: 17-category classifier, anomaly engine, in-memory graph (BFS, expertise match) |
| LLM | Pluggable provider (GLM / Gemini-compatible), cache-first, strict JSON-schema outputs |

## Status

🚧 **Placeholder deploy** — validating the GitHub → Vercel → mobile pipeline.
The full application will replace this page at the same URL.

## Repository map (incoming)

```
src/app/       # Push feed · company deep-dive · network explorer · API routes
src/lib/       # classifier · anomaly engine · graph · deterministic analysis · LLM router
src/data/      # curated + generated datasets (provenance-tagged)
scripts/       # build-time Python data engine (EOD, fundamentals, fallbacks)
```

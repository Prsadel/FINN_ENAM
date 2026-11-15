# FINN — Architecture

**Financial Investment Network Navigator** · ENAM Holdings Founding AI Engineer Build Challenge

FINN is a mobile-first intelligence layer for public-markets investors built around three
woven layers: **PUSH** (proactive feed of what changed and why it matters), **PULL**
(on-demand, primary-source-grounded research), and **NETWORK** (the investor's contact graph
as an active intelligence layer — surfaced inside Push and Pull at the moment it matters,
never as a bolted-on contact book).

Design law: *thin-but-working beats broad-but-broken*, and no AI slop — dense, analytical,
grounded, with zero conversational filler.

---

## 1. System Overview

```
                        ┌──────────────────────────────────────┐
   Phone / browser  ───▶│  VERCEL                              │
                        │                                      │
   HTML/CSS/JS  ◀───────│  CDN · static + Next.js assets       │
                        │                                      │
   /api/* JSON  ◀───────│  Serverless Functions (TS)           │
                        │   ├─ feed / announcements            │
                        │   ├─ analysis (per-ticker pipeline)  │
                        │   ├─ network graph (in-memory)       │
                        │   └─ LLM router (cache-first)        │
                        └──────────┬──────────────┬────────────┘
                                   │              │
                    Yahoo public JSON endpoints   GLM API
                    (any .NS ticker, keyless)     (key in env vars,
                                   │               never in client)
                        ┌──────────┴──────────────┬───┘
                        │  BUILD-TIME (local)     │
                        │  Python data engine:    │
                        │  yfinance EOD · Screener│
                        │  scraping · fallbacks   │
                        │  → committed JSON       │
                        └─────────────────────────┘
```

Two compute worlds, on purpose:

- **Build-time (Python, local):** curates and generates the dataset for the 22 known tickers
  (18 portfolio + 4 ad-hoc). Outputs are committed JSON with provenance tags
  (`screener | yfinance | curated`). Scrapers never run in production — nothing fragile
  can break during evaluation.
- **Runtime (TypeScript, Vercel serverless):** serves the feed, runs deterministic analysis,
  resolves *any* NSE ticker against Yahoo's public JSON endpoints, and calls the LLM only
  where reasoning is required. Stateless request/response — the in-memory graph rebuilds
  from JSON on cold start (35 people ≈ milliseconds).

**Data honesty (read this before the tables below).** The demo universe is shipped as
**synthetic, provenance-tagged fixtures**: magnitudes are scaled from publicly known
company financials, annual rows reconcile exactly with quarterly sums, filings mirror
real exchange-announcement structure, and the 35-person network is plainly labelled
synthetic (as the brief permits: *"realistic synthetic profiles — say clearly which you
used"*). They stand in for what the build-time pipelines would scrape at scale
(Screener.in quarterly tables, NSE/BSE filings, concall transcripts, public profiles).
Unknown tickers served by the generalizer use **real live market data** from Yahoo
Finance — so the "works on any ticker" claim is demonstrated with real data, not
hard-coded answers.

---

## 2. Data Pipelines

### Sources
| Data | Source | When | Notes |
|---|---|---|---|
| EOD price/volume | Yahoo Finance (`.NS`) | build-time + runtime | last close, day Δ%, volume, 20d vol average, 52w range |
| Corporate announcements | Curated realistic filings seeded as raw text | build-time | classified live at runtime by the pipeline below |
| Quarterly financials | Screener.in scrape → yfinance fallback → curated fallback | build-time | Revenue, EBITDA, PBT, PAT (8 quarters) |
| Cash flow (CFO, FCF) | Screener.in / curated | build-time | **annual** — quarterly CFO is not reliably available |
| Concall guidance | Curated transcript excerpts (quotes + dates) | build-time | primary-source quotes only |
| Network profiles | Realistic synthetic personas (clearly labeled) | build-time | roles, employers, education, tenure — production path: consented OAuth ingestion |

### Classification pipeline (17 categories)
```
raw filing text ──▶ Tier 3: deterministic keyword/regex rules ──▶ category + confidence
                        │ (no match / low confidence)
                        ▼
                   Tier 1: LLM fallback (strict JSON: {category, confidence, isMaterial})
```
Binary materiality flag separates price-sensitive events (results, M&A, management change,
litigation, capex, fund raise, insider trading, credit rating) from routine compliance
paperwork — routine items collapse into a single accordion line in the feed.

### Graceful degradation (everywhere)
```
cache/seed JSON ──▶ live API (Yahoo/Screener) ──▶ curated fallback ──▶ honest empty state
```
Every feature has a defined failure mode. The evaluator never sees a crash — worst case is a
clearly labeled data gap.

---

## 3. The Four Analysis Pillars (Pull)

1. **Financial Reality & Cash Quality** — dense quarterly tables (Revenue, EBITDA, margin,
   PBT, PAT) with deterministic QoQ/YoY deltas and sparklines; annual cash-quality check
   (CFO vs PAT, FCF conversion) as the accounting-profit red flag. **Zero LLM text.**
2. **Narrative Audit & Forward Guidance** — the signature feature: management's numeric
   promises from Q1–Q3 concall quotes, juxtaposed against delivered actuals, with a 4-state
   verdict (`delivered | partial | missed | pending`) and an explicit-gap statement. Latest
   concall guidance renders as a verifiable, *pending* forward-catalyst tracker.
3. **Multi-Hop Network Intelligence** — BFS over the contact graph: direct overlaps,
   competitor/supplier/customer mapping, alumni paths (max 2 degrees), expertise-tag semantic
   fallback (never an empty state), warm-reconnect nudges tied to live events.
4. **Bull vs. Bear** *(stretch)* — Bull side grounded in concall optimism; Bear side from
   **computed** red flags (margin compression, CFO<PAT divergence, rising D/E, pledging) —
   deliberately avoiding fragile annual-report PDF parsing.

---

## 4. LLMs & Agent Design

### Smart model routing — never send to an LLM what code can do
| Tier | Engine | Used for | Cost |
|---|---|---|---|
| 3 — Deterministic | Pure TypeScript | QoQ/YoY deltas, margin math, anomaly thresholds (vol > 2× 20d avg, ±X% price), BFS pathfinding, category keywords | zero, sub-ms |
| 1 — Extraction | GLM flash-class | announcement classification fallback, guidance-sentence extraction from transcripts | ~$0.001/call |
| 2 — Reasoning | GLM flagship-class | Narrative vs. Numbers synthesis, cross-document verdicts | cached aggressively |

### Anti-slop constraints
- Every LLM output is constrained to a **strict JSON schema** (e.g.,
  `{metric, promised, delivered, status}`) — conversational generation is physically excluded.
- Every claim cites its primary source (filing date / concall quarter).
- If guidance wasn't stated, FINN outputs *"Management did not provide explicit forward
  guidance on this metric"* — never an inference.
- **Cache-first:** LLM results keyed by `(ticker, kind, content-hash)` in committed JSON —
  the demo runs fully keyless; a live key upgrades ad-hoc behavior.

---

## 5. Data Security & Privacy

- **Hard boundary:** public data (prices, filings, annual reports, transcripts) vs. private
  data (the investor's network graph, portfolio, thresholds). Private data lives server-side
  in the data layer only — never shipped to the client bundle.
- **Zero training:** contact data is never used for model training/tuning; LLM inference is
  stateless and API-only; where feasible, entities are anonymized ("Person A") before
  inference.
- **Network matching runs as deterministic code** — a person's name never needs to reach an
  LLM to produce a network insight.
- **Secrets:** provider keys live in environment variables (`.env` locally, Vercel encrypted
  env in production), `.gitignore`-enforced from the first commit.
- **Production posture** (documented, deliberately deferred in the prototype): per-analyst
  RBAC, AES-256 at rest, audit logging, consent-based network ingestion, data-retention
  policy.
- Network profiles in this prototype are **synthetic** — stated clearly per the brief's
  disclosure requirement.

---

## 6. Cloud & Infrastructure

| Concern | Choice | Why |
|---|---|---|
| Hosting | Vercel (CDN + serverless functions) | native Next.js; zero-config deploys from GitHub on every push |
| Persistence | Committed JSON datasets | prototype scale (22 tickers, 35 people); no DB server to operate; graph rebuilds in ms on cold start |
| Runtime dependencies | None beyond Yahoo endpoints + optional LLM | keyless Yahoo = arbitrary-ticker support with zero credentials |
| Cost | ₹0 run-rate | free tiers across Vercel + LLM; efficiency is a design constraint, not an afterthought |
| Scaling path | JSON → SQLite/Postgres via Drizzle; add cron for refresh | documented, not built — thin-but-working |

---

## 7. Deliberate Omissions

| Omitted | Why |
|---|---|
| Real-time streaming / WebSockets | EOD cadence is the right granularity for conviction investing; intraday noise adds fragility, not signal |
| Chat interface | A proactive, dense feed beats an empty prompt box for daily investor workflow |
| Runtime annual-report PDF parsing | Fragile and heavy; structured Screener/curated data covers the same ground reliably |
| Broker notes / news | Excluded by design — primary sources only is the discipline |
| Multi-user RBAC, encryption-at-rest | Documented for production; single-investor prototype |

## 8. Next Horizons

1. Cron-driven refresh pipelines with a real database
2. Multi-year (8-quarter) promise tracking
3. Consented LinkedIn OAuth network ingestion
4. WhatsApp/Telegram push delivery of the digest
5. Collaborative team graphs with permissioned cross-querying

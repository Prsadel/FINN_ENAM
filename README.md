# FINN — the intelligence layer for a public-markets investor

**Push** what changed · **Pull** the primary-source truth · **Network** — who you know who can tell you more.

Built for the ENAM Holdings Founding AI Engineer Build Challenge. Mobile-first, dark, dense —
a tool an investor reaches for through the day, not another dashboard.

---

## Try it in six moves

Open the app and tap **✦ Take the 60-second tour** — or just do this:

**1 · Read the digest, not 45 filings.**
The feed opens on a Saturday-morning digest: a week of exchange filings triaged into
**5 material events** (with context) and **12 routine filings** (collapsed). Widen the
window to 48h/7d and watch the results wave arrive — classified, prioritised, never raw.

**2 · Tap the Tata Motors card.**
CFO change. You get the incoming CFO's career arc *and* the interception:
**"⌬ Alok Verma (2°) — worked with Rohan at Tata Motors 2016–19, both IIM Calcutta."**
Tap the chip → a dossier with the exact path, why he matters, and a drafted outreach
message. That is the Network layer doing its job inside Push, unasked.

**3 · Read the Titan results card.**
Revenue / EBITDA / PBT / PAT with **QoQ and YoY deltas and margin change in bps** —
computed by deterministic code from the filing. No model touches arithmetic here, ever.

**4 · Make the anomaly strip yours.**
Dixon just traded 2.4× its 20-day volume; Tata Motors fell 3.9%. Drag the threshold
sliders (volume ≥ N×, price ≥ ±N%) and watch the alerts re-fire — *you* decide what
"unusual" means.

**5 · Research any ticker — then audit the management.**
Tap **Research**, type `TRENT`, `DIXON` — or something unlisted like `SBIN` or `HAL`
(live Yahoo fetch, graceful degradation). On any company page:
- **Narrative vs. Numbers** — what management promised on concall vs. what they delivered,
  4-state verdicts (delivered / partial / missed / pending), a credibility scorecard.
- **Cash quality** — CFO vs. PAT, FCF conversion; **leverage trend**; quarterly reality in one table.
- **Bull vs. Bear** — both sides computed from primary data. No broker notes, no model invention.

**6 · Open the Network tab.**
*"123 days since you spoke to Ananya Roy — Reliance just announced ₹12,400 Cr of capex,
and her company supplies that build-out."* Then type **"Prep me for Vikram Malhotra"** —
a meeting dossier with angles that land. The graph knows who worked where, who studied
with whom, and who is one introduction away.

---

## The three layers

| Layer | What it does | The judgment inside |
|---|---|---|
| **PUSH** | Windowed digest, 17-category triage, hero enrichments, configurable anomaly alerts | Surface the 5 things that matter; bury 40 that don't — and tell you *who* can help on each |
| **PULL** | Any-NSE-ticker deep dive from primary sources (annual reports + concall transcripts) | Analyse management rather than summarise them — promises vs. delivery, cash vs. profit |
| **NETWORK** | 35-person graph woven into every card and page | Potential energy → kinetic: alumni + employer + supplier overlaps, 2° paths, warm nudges |

## What is real and what is synthetic

- **Real:** the generalizer — unknown tickers fetch **live market data** from Yahoo Finance
  server-side (429-aware retry, in-memory cache). The deterministic engines (classification,
  anomaly math, graph BFS, promise audit, bull/bear synthesis) run on real code paths.
- **Synthetic, by disclosed design:** the demo portfolio's financials, filings, transcripts and
  the 35-person network are curated fixtures — realistic in magnitude (scaled from public
  filings), internally consistent (annual rows reconcile with quarterly sums), and labelled
  in-app. The brief explicitly permits realistic synthetic profiles/networks with disclosure.
  The build-time pipelines that would produce these from Screener.in / NSE / IR pages are
  specified in [`architecture.md`](./architecture.md).

## Design laws

1. **Thin-but-working beats broad-but-broken** — every visible workflow actually runs.
2. **No AI slop** — no chat bubbles, no filler prose. Dense cards, tables, verdict badges.
3. **The LLM never does arithmetic** — QoQ/YoY, margins, anomalies, graph paths: all deterministic.
4. **Primary sources only** on the Pull side; push-side enrichment is people-context, which is fine.
5. **The network is woven in**, not bolted on — chips on cards, drawers on tap, nudges on staleness.

## Architecture in one line

> Vercel CDN + serverless (TS) · curated JSON fixtures for the demo universe · live Yahoo
> fetch for unknown tickers · in-memory graph rebuilt on cold start · pluggable, cache-first
> LLM hook that the demo never depends on.

Full pipelines, model routing, privacy boundaries and deliberate omissions:
**[`architecture.md`](./architecture.md)** · curated AI build history: **[`ai_logs/`](./ai_logs/)**

## Run locally

```bash
npm install
npm run dev      # or: npm run build && npm start
```

No environment variables required — the LLM layer is optional and cache-first.

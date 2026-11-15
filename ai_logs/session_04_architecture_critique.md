# Session 04 — Architecture Critique & the "Upgrade Path" Pivot

**Date:** 2026-11-15 (session ~21:00–22:00 IST)
**Objective:** Human-led critique of the plan: move from design breadth to implementable depth.

## Human-identified risks (the valuable part)
1. **Fragility:** live-scraping arbitrary tickers (NSE/Screener) will fail under evaluation
   conditions — 403s, CAPTCHAs, layout changes.
2. **Bloat:** the 8-view Pull layer risks broad-but-broken.
3. **Empty states:** ad-hoc tickers (e.g., Zomato) may have zero network overlap → dead ends.
4. **AI slop risk:** any chat-bubble interface is banned; output must be dense data surfaces.

## The pivot (agreed with agent)
- **Graceful Degradation Pipeline:** live scrape → stable API fallback → cached JSON fallback.
  The evaluator never sees a crash.
- **Pruned Pull layer:** 8 views → the "Killer Three": Financial Reality (pure tables),
  Narrative vs. Numbers (the ENAM benchmark), Network Overlap.
- **Semantic graph matching:** domain/industry tags guarantee non-empty, relevant network
  results even for unmapped tickers.
- **Bloomberg-lite UI law:** dense cards, sparklines, strict JSON-schema LLM constraints.
  No conversational output anywhere.
- **Deployment simplification:** drop any native-app idea; Next.js web app constrained to a
  mobile viewport (`max-w-md`), deployed on Vercel — zero install for evaluators.

## Course-corrections logged
- The agent's original design had all Pull views; the human forced the prune. The 8 views
  remain in the LLD as future roadmap, not build scope.
- Session ended with an open build-order question (backend pipelines first vs. seed data
  first) — resolved in session 05 as **seed-first**.

## Artifacts
- Updated `progress.md` (Session 4 entry), expanded pillar definitions.

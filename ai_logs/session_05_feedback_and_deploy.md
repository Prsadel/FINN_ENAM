# Session 05 — Pillar Review, Decisions Locked, Deploy Bootstrapped

**Date:** 2026-11-15 (session ~22:00 IST)
**Objective:** Agent feedback on the expanded four-pillar plan; resolve LLM key strategy;
bootstrap the deployment pipeline.

## Agent review verdicts (all accepted by human)
| Pillar | Verdict | Key change |
|---|---|---|
| 1 — Financial Reality & Cash Quality | ADOPT with change | CFO/FCF computed **annually (3 FYs)** — quarterly CFO is unavailable on Screener, spotty on yfinance |
| 2 — Narrative Audit + Forward Guidance | ADOPT | Verdict taxonomy locked back to **4-state** (delivered / partial / missed / pending) — 3-state would fake verdicts on untestable recent guidance |
| 3 — Bull vs. Bear | **DEFER to stretch** | AR risk-factor parsing = new fragile ingestion class; fallback version derives Bear from computed red flags (margin compression, CFO<PAT gap, D/E, pledging) |
| 4 — Multi-Hop Network | ADOPT | "Prep me for X" via 3-intent regex parser, not an LLM agent; dossier questions = templated slots from data |

## Architecture consistency fixes
- Anomaly detection runs in **TypeScript at runtime** — there is no Python on Vercel.
  Python = build-time dataset curation only.
- Runtime generalization for unknown tickers: Yahoo public JSON endpoints called from
  Next.js server routes (keyless, reliable) — not runtime Screener scraping.
- Persona fix: Vikram Malhotra locked as PE partner (Consumer/Retail) per approved blueprint.

## LLM key — the leak avoided
The human asked whether the agent could hand over "its" API key. The agent identified that
its harness credential existed in local config but refused to echo it into chat for a concrete
reason: **AI session exports are a submission deliverable** — the key would leak into the very
logs being submitted. Resolution: build the LLM tier **pluggable + cache-first** (demo works
keyless), human provisions a GLM open-platform key into `.env` for live behavior.

## Build order locked (deadline = same day)
1. Seed data + scaffold + Push feed spine → 2. any-ticker generalizer → 3. Pillar 1 tables →
4. Pillar 2 scorecard → 5. Pillar 4 graph + drawer → 6. Pillar 3 (stretch) → 7. polish/deploy.
**Seed-first** — every downstream component compiles against real-shaped data.

## Deployment bootstrap (with two course-corrections)
- Repo verified public + empty: `github.com/Prsadel/FINN_ENAM`. Repo root = `finn/` subfolder —
  planning docs and PDFs stay out of the public submission repo.
- Placeholder committed (branded `index.html`, `.gitignore` with day-one secret safety,
  `README.md`).
- **Course-correction 1:** first push failed with 403 (PAT lacked write scope). Agent proposed
  SSH key generation; **human rejected the tool call and resolved auth independently**, then
  pushed and deployed to Vercel successfully.
- **Course-correction 2:** human earlier deferred local Node.js install; agent confirmed the
  placeholder path works without it (Vercel builds server-side) — local Node only needed
  before Stage 2 scaffold.
- Git identity: `Prsadel` + GitHub noreply email (privacy-safe default).

## Artifacts
- `finn/` repo (commit `14387cb`), `ai_logs/` (this folder), `architecture.md`, Session 5 entry
  in `progress.md`.

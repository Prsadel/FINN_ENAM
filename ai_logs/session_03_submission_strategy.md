# Session 03 — Submission-First Strategy

**Date:** 2026-11-15 (session ~20:48 IST)
**Objective:** Human directive — get the complete submission email package ready before
writing application code, so the deliverable shape is fixed early.

## What the agent produced
`SUBMISSION_EMAIL.md` containing:
- Required metadata: to `assessment@enam.com`, subject `"IIT Delhi – Founding AI Engineer - 2027"`.
- Link placeholders: live prototype, GitHub repo, AI build history.
- Covering writeup structured around the brief's four evaluation pillars:
  1. Data pipelines (EOD via yfinance, 17-category classification pipeline, Screener.in
     fundamentals + concall ingestion).
  2. Data security & privacy (network Rolodex isolated, zero model training on private data,
     stateless API-only inference, anonymization where possible).
  3. LLM & agent design (3-tier routing, deterministic-first, strict JSON constraints).
  4. Cloud (what runs where and why).
- Key differentiators, deliberate omissions (no WebSockets, no broker notes, no chatbot
  blank-slate), future roadmap.

## Decisions & accept/rewrite
- **Accepted:** email-first strategy — the covering note doubles as the architecture narrative,
  so writing it early forced crispness about what will and won't be built.
- **Agent note recorded:** link placeholders deliberately bracketed to prevent accidental
  submission with dead links.

## Artifacts
- `SUBMISSION_EMAIL.md`.

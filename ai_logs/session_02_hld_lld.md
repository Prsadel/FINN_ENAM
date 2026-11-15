# Session 02 — Expectations Mapping + HLD/LLD

**Date:** 2026-11-15 (session ~20:40 IST)
**Objective:** Convert the challenge into concrete, opinionated product decisions before any code.

## What the agent produced

### 1. Expectations vs. ideas mapping
Mapped every ENAM evaluation signal to a concrete build decision (e.g., "no AI slop" →
dense data cards + strict JSON-schema LLM outputs; "network woven in" → contextual chips on
every card, not a separate contacts page).

### 2. High-Level Design (HLD)
- System architecture: mobile client → Next.js API routes → intelligence engines → data layer.
- Push data flow: fetch EOD + filings → classify (17 categories) → enrich material events
  (management bio, results extraction, network match) → priority-sorted feed.
- Pull data flow: orchestrator with cache check → parallel fetch → tiered analysis →
  tabbed deep-dive.

### 3. Low-Level Design (LLD)
- TypeScript schemas: `Company`, `Announcement`, `QuarterlyFinancials`, `ConcallGuidance`,
  `PromiseAudit`, `Person`, `NetworkConnection`.
- Full REST API contract (`/api/market`, `/api/announcements`, `/api/analysis`,
  `/api/network/*`, `/api/search`).
- Frontend component tree (App Router, bottom nav, feed, deep-dive tabs, network drawer).
- Graph algorithms in pseudocode: company-overlap ranking, BFS pathfinding (max 2 degrees),
  expertise matching, warm-nudge generation, management-change interception.
- 17-category announcement classifier: deterministic keyword tier → cheap-LLM fallback tier,
  plus binary materiality flag.
- 3-tier smart model routing: Tier 3 deterministic code (math, graph) → Tier 1 fast extraction
  → Tier 2 reasoning synthesis. Principle: *never send to an LLM what code can do.*

## Decisions & accept/rewrite
- **Human review verdict: both artifacts approved as-is.** Notable: the human accepted the
  4-state verdict taxonomy (`delivered | partial | missed | pending`) for promise audits —
  this survived a later attempt to simplify it to 3 states (session 05 restored it).
- **Human override on scope:** the 8-view Pull menu from the brief was designed in full, but
  the human flagged bloat risk early — fully resolved in session 04.

## Artifacts
- `expectations_vs_ideas.md`, `finn_hld_lld.md` (approved).

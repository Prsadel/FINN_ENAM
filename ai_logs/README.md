# AI Build History

This folder is the **AI build history** required by the challenge submission: a curated,
session-by-session record of how FINN was built with an AI coding agent.

## Format

- One file per working session (`session_0N_*.md`).
- Prompts are **paraphrased intents**, not verbatim dumps, unless marked otherwise.
- Every session records: objective → what the agent produced → what was accepted, rejected,
  or rewritten, and why → artifacts created.
- Course-corrections (the interesting part — where the human overrode the agent) are called
  out explicitly.

## Why curated digests and not raw dumps?

Raw transcripts contain environment noise, secrets-adjacent context, and thousands of lines
of tool output. The signal — how problems were decomposed, where the model went wrong, what
was accepted vs. rewritten — fits in a readable digest. Full agent session exports are
retained separately and available on request.

## Sessions

| # | File | Theme |
|---|------|-------|
| 1 | `session_01_challenge_analysis.md` | Challenge brief ingestion, blueprint review |
| 2 | `session_02_hld_lld.md` | Expectations mapping, HLD/LLD design |
| 3 | `session_03_submission_strategy.md` | Submission-email-first strategy |
| 4 | `session_04_architecture_critique.md` | Bloat removal, graceful degradation pivot |
| 5 | `session_05_feedback_and_deploy.md` | Pillar review, decisions locked, deploy pipeline |

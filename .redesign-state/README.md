# Run-State

Ephemeral per-project state shared across pipeline phases and terminals. Committed to the repo so `/redesign` can resume across sessions and review loops running in separate terminals can deliver findings back to the orchestrator.

## Files

| File | Writer | Reader | Purpose |
|------|--------|--------|---------|
| `decisions.md` | `/redesign` orchestrator | Humans + orchestrator on resume | Append-only log of orchestrator choices (which strategy selected at 5.1, which revisions applied after Phase 0, which review findings accepted/deferred, which `[NEEDS:]` drafted vs. escalated). Each entry is one timestamped line. |
| `review-findings.md` | `/review-architect`, `/review-customer`, `/review-a11y` | `/redesign` orchestrator between phases | Append-only queue of review findings. Each entry carries: reviewer, severity, blocking?, page/file, one-line quote, suggested fix. Orchestrator drains and clears this between phases. |
| `compliance-log.md` | `web-designer` agent (Phase 3 self-check) | `/redesign` orchestrator after each page build | Structured pass/fail results for each page against its direction brief. Unjustified FAILs block the page from being marked done. |
| `url-inventory.md` | `brand-intelligence` agent (Step 1) | `redirect-mapping` skill (Step 4) | Complete URL list discovered during the old-site crawl. Feeds Step 4 so it doesn't have to re-crawl. |

## Conventions

- **Append-only by default.** Readers may mark entries as "handled" by appending a status line below the entry, but do not delete historical content.
- **Dated entries.** Every new entry begins with an ISO date line (`### 2026-04-22T13:15 — [topic]`).
- **Machine-readable where feasible.** Review findings and compliance results should follow the schema documented in each file's header so the orchestrator can parse without re-prompting.
- **Safe to delete between projects.** When starting a fresh redesign in the same repo, this directory can be cleared. Nothing here is load-bearing across projects.

## Why this exists

Before `.redesign-state/` existed, pipeline state lived in three unreliable places:

1. **Terminal stdout** — review findings from `/loop` terminals printed to the reviewer's own terminal and never reached the builder.
2. **Mutated skill files** — per-project state got written into reference skills, confusing the instruction-vs-state boundary.
3. **The orchestrator's context window** — which is wiped on restart and can't be read by parallel processes.

This directory fixes all three by making state a first-class, file-backed artifact.

---
description: Run an architect review of overall site coherence and quality (designed for use with /loop)
---

Run an architect review cycle on the website's current state. This command is designed to be run periodically via `/loop` during the build process, but can also be triggered manually.

## Steps

1. **Assess current build state.** Quickly determine what exists:

```bash
find src/app/\[locale\] -name "page.tsx" -o -name "layout.tsx" 2>/dev/null
ls src/components/*.tsx 2>/dev/null
```

If fewer than 2 page files exist, report "Not enough pages built yet for a meaningful review" and stop.

2. **Check for recent changes.** Identify what changed since the last review:

```bash
git log --oneline -5 -- 'src/' 'messages/' 2>/dev/null
git diff --name-only HEAD~3 -- 'src/' 'messages/' 2>/dev/null || git diff --name-only $(git rev-list --max-parents=0 HEAD) -- 'src/' 'messages/'
git diff --name-only -- 'src/' 'messages/'
```

If nothing has changed since the last review, report "No new changes to review" and stop.

3. **Run the architect agent** to review the current state, focusing on:
   - **Design distinctiveness** — does the built output execute `design-direction.md` (selected strategies, attribute→visual translation, Avoid list, identity test, "What we're moving away from" list), or has it drifted to generic AI defaults? Violations here are Critical and blocking.
   - Consistency of recently changed files with the existing pages
   - Site plan adherence (are we still on track?)
   - Architectural cross-cutting concerns (navigation coherence, breadcrumbs, SEO, forms submit, translations complete, error boundaries, security headers, legal page localization)
   - Technical quality
   - Multilingual coherence

   The architect review is for architectural concerns. It does NOT check WCAG specifics (contrast, ARIA, keyboard, focus indicators) — those belong to `/review-a11y`. It does not auto-fix mechanical hygiene. All findings route to the web-designer for rework via the run-state queue.

4. **Append findings to the run-state queue.** For every finding the agent surfaces, append an entry to `.redesign-state/review-findings.md` per the schema documented in that file. Each entry must carry:

   - Reviewer: `architect`
   - Severity: `critical` / `warning` / `note`
   - Blocking: `yes` for any distinctiveness violation or any Critical severity; `no` otherwise
   - Where, what, why (citing the specific brief quote for distinctiveness findings), suggested fix, status `pending`

   The orchestrator drains this file between build phases.

5. **Append a run-log entry.** Before returning, read the current plugin version from `.claude-plugin/plugin.json` (the `"version"` field). Append ONE line to the `## Run log` section of `.redesign-state/review-findings.md`:

   ```
   YYYY-MM-DDThh:mm — reviewer=architect — plugin=<version> — scope=<all|changed-files> — verdict=<N critical, M warning, K note>
   ```

   This is what the `/redesign` resumption check uses to detect whether this lane is stale on a later run. Omitting it means the lane is considered never-run and will be re-invoked. Append, don't replace — the run log is append-only and preserves history.

6. **Summarize findings.** Output a brief summary to terminal:
   - Current build phase and progress
   - Consistency score (1-5 across: distinctiveness, consistency, plan adherence, technical quality, architectural cross-cutting, multilingual, architectural production readiness). Do NOT rate a11y — that's not in scope.
   - **Blocking:** any distinctiveness finding tagged Critical, OR distinctiveness score < 4. Flag the build to pause for rework.
   - **Needs designer:** critical + warning issues that should be addressed before the next page is built.
   - Count of entries appended to `.redesign-state/review-findings.md`.
   - Run-log line written (confirms stale-lane detection will see this pass).

Keep the summary concise — this runs on a loop and shouldn't produce a wall of text each cycle.

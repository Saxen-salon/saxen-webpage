---
description: Run a customer-perspective review on recently changed pages (designed for use with /loop)
---

Run a customer-perspective review cycle on the website's current state. This command is designed to be run periodically via `/loop` during the build process, but can also be triggered manually.

## Steps

1. **Identify what to review.** Check which pages have been modified recently:

```bash
git diff --name-only HEAD~3 -- 'src/app/[locale]/' 'src/components/' 'messages/' 2>/dev/null || git diff --name-only $(git rev-list --max-parents=0 HEAD) -- 'src/app/[locale]/' 'src/components/' 'messages/'
git diff --name-only -- 'src/app/[locale]/' 'src/components/' 'messages/'
```

If nothing has changed since the last review, report "No new changes to review" and stop.

2. **Determine which pages changed.** Map the changed files to page routes (e.g., `src/app/[locale]/services/page.tsx` → Services hub). Focus on the pages with the most significant content changes — skip minor CSS tweaks or config-only changes.

3. **Run the customer-perspective agent** on the most significantly changed page. Provide it with the specific page to review.

4. **Append findings to the run-state queue.** For every priority fix the agent surfaces, append an entry to `.redesign-state/review-findings.md` per the schema in that file:

   - Reviewer: `customer-perspective`
   - Severity: `critical` (deal-breaker — would make a buyer leave) / `warning` (would hesitate to reach out) / `note` (nice-to-have)
   - Blocking: `yes` for deal-breakers affecting core conversion pages (homepage, services, contact); `no` otherwise
   - Where, what (buyer reaction in one line), why (which persona reacted and why), suggested fix, status `pending`

5. **Append a run-log entry.** Before returning, read the current plugin version from `.claude-plugin/plugin.json`. Append ONE line to the `## Run log` section of `.redesign-state/review-findings.md`:

   ```
   YYYY-MM-DDThh:mm — reviewer=customer — plugin=<version> — scope=<pages reviewed> — verdict=<N critical, M warning, K note>
   ```

   The `/redesign` resumption check uses this to detect stale lanes. Append, don't replace.

6. **Summarize findings** to terminal:
   - Which page was reviewed
   - Quick verdict (would a buyer get in touch?)
   - Top 3 priority fixes (for the web-designer)
   - Count of entries appended to `.redesign-state/review-findings.md`
   - Whether any fixes are urgent enough to address before continuing the build

Keep the summary concise — this runs on a loop and shouldn't overwhelm the user with repeated lengthy output.

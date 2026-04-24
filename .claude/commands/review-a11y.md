---
description: Run an accessibility audit on recently changed pages (designed for use with /loop)
---

Run an accessibility audit cycle on the website's current state. This command is designed to be run periodically via `/loop` during the build process, but can also be triggered manually.

## Steps

1. **Assess current build state.** Quickly determine what exists:

```bash
find src/app/\[locale\] -name "page.tsx" -o -name "layout.tsx" 2>/dev/null
ls src/components/*.tsx 2>/dev/null
```

If fewer than 2 component or page files exist, report "Not enough built yet for an accessibility review" and stop.

2. **Check for recent changes.** Identify what changed since the last review:

```bash
git diff --name-only HEAD~3 -- 'src/' 'messages/' 2>/dev/null || git diff --name-only $(git rev-list --max-parents=0 HEAD) -- 'src/' 'messages/'
git diff --name-only -- 'src/' 'messages/'
```

If nothing has changed since the last review, report "No new changes to review" and stop.

3. **Run the accessibility-auditor agent** to review the current state, focusing on:
   - Semantic HTML in recently changed files
   - Keyboard navigation on interactive components (menus, dropdowns, forms)
   - ARIA usage correctness
   - Color contrast against the design system tokens
   - Form accessibility (labels, error states, required fields)
   - Focus management (custom focus-visible styles)

   Instruct the agent to tag every finding with one of:
   - **`[AUTO-FIX]`** — mechanical, single-file change with an unambiguous correct answer (see list below)
   - **`[NEEDS DESIGNER]`** — requires judgment, design decisions, or cross-file changes

4. **Apply auto-fixable findings immediately.** For findings tagged `[AUTO-FIX]`, apply the change inline using Edit. Do **not** delegate these to the web-designer. Auto-fixable categories:
   - Missing `alt=""` on decorative `next/image` components (add empty alt)
   - Missing descriptive alt text where the image is content (use filename/context to draft alt, or leave a `[NEEDS:]` marker)
   - Missing `type="button"` on non-submit `<button>` elements
   - Missing `lang` attribute on `<html>` or locale-changing elements
   - Missing `aria-label` on icon-only buttons (use button's evident purpose)
   - Missing `<h1>` where the page has a clear title string already
   - Missing `meta` description where translations already have a string that fits
   - Redundant `role` attributes on native semantic elements (remove)
   - Form inputs missing `<label>` association (add `htmlFor`/`id` pairing)

   Anything requiring contrast adjustments, color/token changes, layout restructuring, new translations, or keyboard handler logic is **not** auto-fixable — tag as `[NEEDS DESIGNER]`.

5. **Append [NEEDS DESIGNER] findings to the run-state queue.** For every `[NEEDS DESIGNER]` finding, append an entry to `.redesign-state/review-findings.md` per the schema in that file:

   - Reviewer: `accessibility-auditor`
   - Severity: `critical` (WCAG AA failure) / `warning` (WCAG AA borderline or AAA issue) / `note`
   - Blocking: `yes` for any WCAG AA failure affecting interactive elements, forms, or contrast; `no` otherwise
   - Where, what, why (cite the WCAG criterion number), suggested fix, status `pending`

   `[AUTO-FIX]` findings are handled inline and do NOT go to the queue.

6. **Append a run-log entry.** Before returning, read the current plugin version from `.claude-plugin/plugin.json`. Append ONE line to the `## Run log` section of `.redesign-state/review-findings.md`:

   ```
   YYYY-MM-DDThh:mm — reviewer=a11y — plugin=<version> — scope=<files reviewed> — verdict=<N critical, M warning, K note, +auto-fixed count>
   ```

   The `/redesign` resumption check uses this to detect stale lanes. Append, don't replace.

7. **Summarize findings** to terminal:
   - Which files were reviewed
   - Accessibility score across key dimensions
   - **Auto-fixed inline:** [count, one-line list]
   - **Queued for designer:** [count, appended to run-state]
   - Whether the build should pause for designer fixes or can continue

Keep the summary concise — this runs on a loop and shouldn't produce a wall of text each cycle.

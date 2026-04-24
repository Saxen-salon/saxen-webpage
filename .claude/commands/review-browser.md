---
description: Run a browser-based QA pass on the built site — rendered behavior, fidelity to design direction, visual gaps. Phase-gated; do NOT use with /loop.
---

Run a browser QA cycle using Chrome MCP against the running dev server. This command is **phase-gated** — invoke it after Phase 0 shell is in place, after each completed Phase 1 core page, at the end of each build phase, and during the Step 7 final review. Do NOT wrap this with `/loop` — browser QA attaches to stable artifacts, not wall-clock ticks.

## Steps

1. **Verify the dev server is running.**

   ```bash
   curl -sI http://localhost:3000 --max-time 5 | head -1
   ```

   If the response is not `HTTP/1.1 200` (or `HTTP/2 200`), report:

   > Dev server not responding at localhost:3000. Start it in another terminal with `npm run dev`, then re-run `/review-browser`.

   …and stop. Do NOT attempt to start the server from this command — it's a long-running process and starting it here leaves no clean way to stop it later.

2. **Record the current commit.**

   ```bash
   git rev-parse --short HEAD
   ```

   This short SHA goes into every screenshot filename and every finding produced this run.

3. **Determine scope** using the blast-radius table in `.claude-plugin/agents/browser-qa.md`. First, find the SHA of the previous run by scanning existing screenshots:

   ```bash
   ls .redesign-state/screenshots/ 2>/dev/null | grep -oE '[0-9a-f]{7,}\.png$' | sed 's/\.png$//' | sort -u | tail -1
   ```

   Diff files changed since that SHA (or since the first commit if no prior run exists):

   ```bash
   git diff --name-only <prior-sha>..HEAD -- src/ messages/ public/images/ design-direction.md .claude-plugin/skills/design-system/ next.config.ts src/i18n/ src/proxy.ts 2>/dev/null
   ```

   Decide scope:
   - **Global trigger** — any change in `src/app/layout.tsx`, `globals.css`, shared components in `src/components/`, `messages/*.json`, `src/i18n/routing.ts`, `src/proxy.ts`, `next.config.ts`, `design-direction.md`, design-system skill, image catalog, or image manifest → full sampled route set.
   - **Component trigger** — a shared component changed → routes importing that component (use `grep -rln "<ComponentName>" src/app`).
   - **Page trigger** — a single `src/app/[locale]/<route>/page.tsx` changed → that route + homepage smoke.
   - **First run** or no prior SHA found → full sampled route set.

   The sampled route set is defined in `.claude-plugin/agents/browser-qa.md`.

4. **Check for uncommitted/in-progress work.** Run `git diff --name-only`. If files are currently dirty, note this in the summary ("scope includes uncommitted changes on top of <SHA>"). This is not a blocker — browser QA is allowed to review in-progress work, but the run is tagged as non-authoritative if it sees uncommitted code.

5. **Run the browser-qa agent.** Spawn the agent with this input:

   - Scope (list of routes, viewports, locales determined in step 3)
   - Current commit short SHA
   - Prior run SHA (if any, for gap-image disposition continuity)

   The agent will:
   - Run the readiness protocol per page
   - Capture screenshots to `.redesign-state/screenshots/` with the naming convention `<yyyy-mm-dd-hhmm>-<route-slug>-<locale>-<viewport>-<short-sha>.png`
   - Append findings to `.redesign-state/review-findings.md` per the schema in `browser-qa.md`
   - Honor existing `gap-image` findings with disposition `rejected` or `converted` — not re-file them

6. **Route findings.** browser-qa is read-only. All findings route to the web-designer for rework. There is NO auto-fix lane for browser-qa findings — rendered issues are subtle and applying fixes without designer judgment would damage the pipeline.

   Exceptions that go to other lanes:
   - Findings categorized `dev-server-error`, `stuck-loading`, `console-error`, `network-error` — these are environment/infrastructure issues. Surface them to the user immediately (not just in the findings file) because they may indicate the dev server is misconfigured.
   - Findings the agent marked `duplicate-of` an architect finding — the architect finding is authoritative; the browser-qa entry adds screenshot evidence.

7. **Write decisions log.** Append one entry to `.redesign-state/decisions.md`:

   ```
   YYYY-MM-DDThh:mm — browser-qa run — commit <sha> — scope: <route-count> routes × <viewport-count> viewports × <locale-count> locales — findings: <N critical> / <N warning> / <N note> / <N incomplete>
   ```

8. **Append a run-log entry to review-findings.md.** Read the current plugin version from `.claude-plugin/plugin.json`. Append ONE line to the `## Run log` section of `.redesign-state/review-findings.md`:

   ```
   YYYY-MM-DDThh:mm — reviewer=browser-qa — plugin=<version> — scope=<route slugs covered> — verdict=<N critical, M warning, K note, L incomplete>
   ```

   The `/redesign` resumption check uses this to detect stale lanes. If the dev server wasn't running and browser-qa aborted, write the line with `scope=skipped` and `verdict=dev-server-not-running` — the orchestrator interprets this as YELLOW on the gate but not fully stale.

9. **Summarize to terminal.** Use the Output Format block from `.claude-plugin/agents/browser-qa.md` verbatim. Keep it concise — full detail lives in the findings file.

## What to do if the run is incomplete

Browser QA can fail silently in ways that matter:
- Chrome MCP disconnects mid-run
- Dev server crashes mid-run
- A page gets stuck in a compile-error overlay for the entire retry window

When the agent reports `incomplete` for some routes, include them in the summary under "Readiness failures" and recommend: "re-run `/review-browser` after resolving the dev-server state." Do NOT mark the run as successful if any sampled route is `incomplete` — the purpose of this pass is coverage, and partial coverage is misleading.

## What this command does NOT do

- Does not start or stop the dev server.
- Does not modify source.
- Does not run on a `/loop` schedule. If you catch yourself reaching for `/loop 15m /review-browser`, stop — the agent's design assumes phase-gated invocation and will produce noise under time-based triggers.
- Does not run WCAG checks. That's `/review-a11y`'s job. Forms submitting is browser-qa's lane; forms being keyboard-reachable is a11y's.
- Does not author manifest rows. That's the web-designer's job during rework; browser-qa's `gap-image` findings are proposals, not writes.

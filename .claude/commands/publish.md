---
description: Build, commit, and push all changes to deploy the website
---

Save all changes and publish them to the live website. **This command reads `.redesign-state/publish-gate.md` as a hard gate before touching git or the build.** If the gate is missing, stale, or FAIL, publish refuses and reports exactly what needs to be resolved.

Outside the full `/redesign` flow, users can still run this command directly — but the gate protects against shipping a site with unresolved blockers from any review lane. If someone needs to ship despite a failing gate, the answer is to mark the finding(s) with an auditable disposition in `review-findings.md` (e.g., `status: deferred` + `publish-allowed: yes` + substantive `reason:`), not to bypass the gate.

## Steps

1. **Read the publish gate.** Check that `.redesign-state/publish-gate.md` exists and is fresh:

   ```bash
   GATE=.redesign-state/publish-gate.md
   [ -f "$GATE" ] || { echo "gate missing"; exit 1; }
   HEAD_MTIME=$(git log -1 --format=%ct)
   GATE_MTIME=$(stat -c %Y "$GATE")
   FINDINGS_MTIME=$(stat -c %Y .redesign-state/review-findings.md 2>/dev/null || echo 0)
   SLOTS_MTIME=$(stat -c %Y IMAGE_SLOTS.md 2>/dev/null || echo 0)
   ```

   The gate is **stale** if its mtime is older than any of `HEAD_MTIME`, `FINDINGS_MTIME`, `SLOTS_MTIME`. Stale = refuse.

2. **Parse the gate's Overall verdict.** Look for `**Overall:** PASS` or `**Overall:** FAIL` in the gate file.

3. **If gate is missing, stale, or FAIL:** refuse to publish. Report to the user in this shape:

   > ⛔ Publish blocked — the pipeline integrity gate is not green.
   >
   > **Gate status:** <missing | stale | FAIL>
   > **Reason:** <specific — e.g., "gate.md is older than the latest commit", or "3 checks FAIL in publish-gate.md">
   >
   > **To unblock, do one of:**
   > - Run `/redesign` — it will re-enter Step 10 and write a fresh gate.
   > - Read `.redesign-state/publish-gate.md` "Blockers to resolve" section and address each one directly.
   > - If a blocker is judgment call (e.g., warning you accept), edit the corresponding finding in `review-findings.md` to `status: deferred` + `publish-allowed: yes` + `reason: <your justification>`, then re-run Step 10.
   >
   > Publish is not an override channel. If you believe the gate is wrong, fix the gate, not the bypass.

   Stop here. Do NOT build. Do NOT commit. Do NOT push.

4. **If gate is PASS and fresh:** proceed with publish.

   a. Run `npm run build` to verify compilation. If build fails — the gate was green but something changed since — stop and report.

   b. Run `git status` and `git diff --stat` to see what changed.

   c. Write a short, honest commit message describing the change — no ceremony. If nothing has changed since the last commit and the gate is re-affirming the current HEAD, tell the user there's nothing to publish and exit cleanly (no empty commit).

   d. Stage relevant files (prefer named files over `git add -A` to avoid sweeping in unintended changes).

   e. Commit using the project's commit style.

   f. Run `git push`.

   g. Confirm Vercel auto-deploy: `vercel inspect 2>/dev/null`. If Vercel auto-deploys are connected (recent deploy triggered by git), tell the user the site will update in 1–2 minutes. If not, run `vercel --prod`.

5. **Report to the user:**
   - What was published (one-line summary of the commit)
   - Gate verdict at time of publish (PASS — shown for auditability)
   - Site live in 1–2 minutes

## Interaction with `/redesign`

- `/redesign` invokes `/publish` as its Step 11. Before invoking, it has already run Step 10 which writes the gate file. `/publish` re-reads the gate as a second layer — this is intentional redundancy, because users can also run `/publish` directly outside `/redesign`.
- `/redesign` is responsible for writing a green gate; `/publish` is responsible for refusing a non-green one. Neither can be trusted to do the other's job.

## What this command does NOT do

- Does NOT override the gate. There is no `--force`. Force-publishing is explicitly out of scope — it short-circuits the rigor the gate exists to enforce. If the gate is wrong, fix the gate by marking findings with auditable dispositions.
- Does NOT re-run reviews. That's `/redesign` Step 7's job. If reviews are stale, the gate will be stale (because Step 10 writes fresh gate only after reviews pass) — which triggers the refusal here.
- Does NOT auto-start the dev server or run browser-qa. If browser-qa is stale because the dev server wasn't running during `/redesign`, the gate records `YELLOW` on check 2 but does NOT block by itself. You'll see browser-qa is skipped in the gate; run `/review-browser` manually in a session with `npm run dev` running if full browser verification matters for this publish.

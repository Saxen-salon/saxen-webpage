---
description: Reconcile [NEEDS:image ...] markers with IMAGE_REQUESTS.md and verify convergence of manifest rows, markers, and installed files
---

Scan the built site for image markers, reconcile them against the manifest, and verify that rows, markers, and installed files are in sync. This is a cleanup / repair command — it does not block the pipeline. The web-designer is the primary writer of manifest rows during Step 6; this command catches drift after the fact.

## When to run

- After a Step 6 phase completes (optional sanity pass).
- Before Step 8 content audit (mandatory — the content audit summary depends on a clean manifest).
- Whenever `design-direction.md` is edited mid-build (prompts may need refreshing against revised P-strategies).
- Whenever a human notices drift between code markers and the manifest.

## Prerequisites

Read these before acting:
- `.claude-plugin/skills/media-prompting/SKILL.md` — row schema, P-strategy → prompt language mapping, negative-prompt patterns. Load the examples as well.
- `design-direction.md` — the committed P-strategy quotes that every prompt must cite.
- `.claude-plugin/skills/company-brand/SKILL.md` — brand context for the prompt body.
- `public/images/IMAGE_CATALOG.md` — reusable existing images (a missing image may not need a new request if an old-site asset fits).
- `public/images/IMAGE_REQUESTS.md` — current manifest state.

If `IMAGE_REQUESTS.md` doesn't exist yet, create it using the header from the manifest template (see `.claude-plugin/skills/media-prompting/SKILL.md` for the row schema and write the file seeded with the standard header + empty Requests section).

## Steps

1. **Scan for image markers.** Run:

   ```bash
   grep -rn '\[NEEDS:image' src/ 2>/dev/null | sed 's/.*NEEDS:image \([^]]*\)\].*/\1 \0/' | sort -u
   ```

   Collect the list of `IMG-...` IDs referenced in code, with their file:line.

2. **Parse the manifest.** Read every `## IMG-...` header in `public/images/IMAGE_REQUESTS.md` and collect:
   - IDs
   - Status (pending | generated | installed | rejected)
   - Target slot path
   - Installed path (when present)

3. **Classify findings into four buckets:**

   **(a) Orphan markers** — an `[NEEDS:image IMG-X]` marker in code with no matching manifest row. For each, read the surrounding component to infer: route, section, role, alt intent. Draft a new manifest row using the media-prompting skill's patterns. Do NOT guess the P-strategy — read it from `design-direction.md` and cite the quote verbatim. Append the new row to `IMAGE_REQUESTS.md` under the appropriate route grouping.

   **(b) Orphan rows** — a manifest row (status not `rejected`) with no marker in code referencing it. Either (1) the row is stale from a removed page, or (2) the web-designer forgot to insert the marker. Report both possibilities; do not auto-delete. List them for human review in the summary.

   **(c) Broken installed rows** — status `installed` but the file does not exist at the Installed path (or a sibling with the same basename and a different extension). Report as a convergence failure; the web-designer or human must restore the file or downgrade the row to `pending`.

   **(d) Missing `next/image` references** — status `installed`, file exists, but no `next/image` component in `src/` references the installed path (search with `grep -rn "<installed-filename>" src/`). Means an image was installed but the marker was never swapped for a real reference. Report as a convergence failure for the web-designer to resolve.

4. **Refresh drift** (optional — only run if user requested or if `design-direction.md` has changed since the manifest was last edited). For each row with status `pending`, reread its P-strategy against the current `design-direction.md`:
   - If the strategy quote in the row no longer matches the committed strategy, rewrite the Prompt + Negative prompt body per the current strategy's grammar.
   - Preserve the row ID and all non-prompt fields (Source, Role, Dimensions, Focal point, etc.).
   - Git history captures the reason for the rewrite — no extra metadata needed on the row.

5. **Report.** Produce a summary in this exact structure (one per category; skip empty categories):

   ```markdown
   ## Image request reconciliation — <YYYY-MM-DD HH:MM>

   **Orphan markers resolved** — N new manifest rows written:
   - `IMG-home-hero-001` at src/app/[locale]/page.tsx:42
   - …

   **Orphan rows** — N manifest rows with no matching marker (human decision):
   - `IMG-services-legacy-card-003` — target `public/images/services/legacy-card` — no reference found in src/. Possible stale row from a removed page. Leave / reject / delete?

   **Broken installed rows** — N rows claim installed but file missing:
   - `IMG-about-team-002` — status `installed`, file `public/images/team/founder-portrait.jpg` does not exist.

   **Missing next/image references** — N installed assets not referenced:
   - `IMG-contact-map-bg-001` — installed at `public/images/hero/contact-map-bg.webp`, no `next/image` in src/ references it.

   **Refreshed prompts** — N rows rewritten against current direction brief:
   - `IMG-home-hero-001` — P-strategy updated from P3 Process Documentary to P2 Environmental Portrait.
   ```

6. **Log the run.** Append a one-line entry to `.redesign-state/decisions.md` recording the run timestamp and counts per category, so Step 8 can trust the manifest state.

## What this command does NOT do

- Does not generate images. The human runs the prompts through their chosen tool.
- Does not install images. Installing is the human step of dropping a file at the target slot and updating the row's Status + Installed path.
- Does not delete orphan rows. Only the human decides whether a row is stale or whether the marker was accidentally removed.
- Does not block the pipeline. It's a reconciliation pass, not a gate.

## Failure modes

- **Manifest doesn't exist:** create it using the standard header (see media-prompting skill). Report this in the summary so the user knows the file was just bootstrapped.
- **`design-direction.md` doesn't exist yet:** abort with message "Step 5.1 not complete — direction brief required before drafting prompts." This command cannot author rows without a committed P-strategy.
- **`grep` returns no markers and manifest is empty:** report "Nothing to reconcile — no image markers in source and manifest is empty." No action.
- **A marker references an ID that conflicts with an existing but different manifest row** (e.g., same ID, different target slot): surface as a collision for human decision. Do not auto-resolve.

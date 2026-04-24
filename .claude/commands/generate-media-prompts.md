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
- `IMAGE_SLOTS.md` at project root — the authoritative list of required slots. **This is the new primary input.** The manifest and markers are resolved against the slot inventory, not just against each other.
- `public/images/IMAGE_CATALOG.md` — reusable existing images (a missing image may not need a new request if an old-site asset fits).
- `public/images/IMAGE_REQUESTS.md` — current manifest state.

If `IMAGE_REQUESTS.md` doesn't exist yet, create it using the header from the manifest template (see `.claude-plugin/skills/media-prompting/SKILL.md`).

If `IMAGE_SLOTS.md` doesn't exist yet but `design-direction.md` does, derive the slot inventory as the first step — this is a migration that should have happened at Step 0 resumption but can also happen here. Log the derivation in `.redesign-state/decisions.md`. If `design-direction.md` is also missing, abort — the pipeline is too early for media prompts.

## Steps

1. **Parse the slot inventory.** Read every `### SLOT-...` header in `IMAGE_SLOTS.md` and collect: slot ID, route, section, role, P-strategy quote, Resolution state (pending / catalog-reuse / manifest-row / image-present / justified-none), and any path references in the Resolution.

2. **Scan for image markers.** Run:

   ```bash
   grep -rn '\[NEEDS:image' src/ 2>/dev/null | sed 's/.*NEEDS:image \([^]]*\)\].*/\1 \0/' | sort -u
   ```

   Collect the list of `IMG-...` IDs referenced in code, with their file:line.

3. **Parse the manifest.** Read every `## IMG-...` header in `public/images/IMAGE_REQUESTS.md` and collect:
   - IDs
   - Status (pending | generated | installed | rejected)
   - Target slot path
   - Installed path (when present)

4. **Classify findings into six buckets** (4-way reconciliation across slots ↔ markers ↔ manifest ↔ files):

   **(a) Unresolved slots** — a slot in `IMAGE_SLOTS.md` with `Resolution: pending`, OR resolved to `manifest-row: IMG-X` where IMG-X has no matching row in the manifest. These are the failures the saxen run missed — brief-mandated imagery that never made it into the manifest. For each, draft a manifest row using the media-prompting skill's patterns based on the slot's P-strategy + role + route. Append to `IMAGE_REQUESTS.md` and update the slot's Resolution to `manifest-row: IMG-...`. If a `[NEEDS:image IMG-...]` marker is also missing from the component, flag that for the web-designer — this command does not modify source code.

   **(b) Orphan markers** — an `[NEEDS:image IMG-X]` marker in code with no matching manifest row. For each, read the surrounding component to infer: route, section, role, alt intent. Check if the slot exists in `IMAGE_SLOTS.md`; if yes, use that slot's P-strategy quote and role. If no, create both the manifest row AND a new slot in `IMAGE_SLOTS.md` (the component introduced imagery the brief derivation didn't anticipate — the inventory needs to grow). Do NOT guess the P-strategy — read it from `design-direction.md` and cite verbatim.

   **(c) Orphan rows** — a manifest row (status not `rejected`) with no marker in code AND no slot in the inventory referencing it. Either (1) the row is stale from a removed page, or (2) both the marker and slot were forgotten. Report both possibilities; do not auto-delete. List for human review.

   **(d) Orphan slots** — a slot in `IMAGE_SLOTS.md` with `Resolution: catalog-reuse: <path>` where the path doesn't exist in `IMAGE_CATALOG.md`, or with `Resolution: image-present: <path>` where the file doesn't exist. Report as a broken resolution; web-designer must fix.

   **(e) Broken installed rows** — status `installed` but the file does not exist at the Installed path (or a sibling with the same basename and a different extension). Report as a convergence failure; the web-designer or human must restore the file or downgrade the row to `pending`.

   **(f) Missing `next/image` references** — status `installed`, file exists, but no `next/image` component in `src/` references the installed path (search with `grep -rn "<installed-filename>" src/`). Means an image was installed but the marker was never swapped for a real reference. Report as a convergence failure for the web-designer to resolve.

4. **Refresh drift** (optional — only run if user requested or if `design-direction.md` has changed since the manifest was last edited). For each row with status `pending`, reread its P-strategy against the current `design-direction.md`:
   - If the strategy quote in the row no longer matches the committed strategy, rewrite the Prompt + Negative prompt body per the current strategy's grammar.
   - Preserve the row ID and all non-prompt fields (Source, Role, Dimensions, Focal point, etc.).
   - Git history captures the reason for the rewrite — no extra metadata needed on the row.

6. **Report.** Produce a summary in this exact structure (one per category; skip empty categories):

   ```markdown
   ## Image request reconciliation — <YYYY-MM-DD HH:MM>

   **Unresolved slots resolved** — N slots moved from pending to manifest-row:
   - `SLOT-home-hero-001` → created `IMG-home-hero-001` (P2 Environmental Portrait)
   - `SLOT-home-team-teaser-001` → created `IMG-home-team-teaser-001` (P2)

   **Orphan markers resolved** — N new manifest rows written:
   - `IMG-services-cnc-card-001` at src/app/[locale]/services/cnc/page.tsx:18

   **Orphan rows** — N manifest rows with neither marker nor slot (human decision):
   - `IMG-services-legacy-card-003` — target `public/images/services/legacy-card` — no marker, no slot. Possible stale row from a removed page. Leave / reject / delete?

   **Orphan slots** — N slots with broken resolution paths:
   - `SLOT-about-facility-001` — resolution claims catalog-reuse at `public/images/facility/workshop.jpg` but file doesn't exist.

   **Broken installed rows** — N rows claim installed but file missing:
   - `IMG-about-team-002` — status `installed`, file `public/images/team/founder-portrait.jpg` does not exist.

   **Missing next/image references** — N installed assets not referenced in source.

   **Refreshed prompts** — N rows rewritten against current direction brief.
   ```

7. **Log the run.** Append a one-line entry to `.redesign-state/decisions.md` recording the run timestamp and counts per category, so Step 8 can trust the manifest state.

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

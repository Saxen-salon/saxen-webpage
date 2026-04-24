# Image Requests

Authoritative manifest of every image the site needs. One row per image. Written by the `web-designer` during Step 6 page builds and reconciled by `/generate-media-prompts`.

**This file is the source of truth for image generation.** Code markers of the form `[NEEDS:image IMG-<id>]` are pointers — they reference a row here by ID but do NOT duplicate the prompt. A marker without a matching row is a pipeline error; `/generate-media-prompts` resolves this by drafting the missing row.

**How this file is used:**

1. The web-designer adds a row whenever a page section needs an image that isn't already in `public/images/IMAGE_CATALOG.md`.
2. The human picks the generator (Midjourney / DALL-E / Firefly / Reve / ...), pastes the **Prompt** + **Negative prompt**, generates the image, and installs it at the **Target slot** path.
3. On install, update **Status** to `installed` and fill **Installed path**.
4. The web-designer references the installed image through a standard `next/image` — no change to the marker in code (markers with status `installed` in the manifest are benign).
5. The `/generate-media-prompts` command verifies convergence: every `installed` row has a `next/image` reference in source; every `[NEEDS:image …]` marker has a manifest row.

**Row schema:** see [`.claude-plugin/skills/media-prompting/SKILL.md`](../../.claude-plugin/skills/media-prompting/SKILL.md) for the full schema, P-strategy → prompt language mapping, aspect conventions, and negative-prompt patterns. Every row must follow that schema exactly.

**Status lifecycle:** `pending` (row written, no asset yet) → `generated` (image exists locally but not installed into the repo) → `installed` (asset at target path, referenced by code) → `rejected` (retired; ID stays retired for archaeology, don't reuse).

**ID convention:** `IMG-<route-slug>-<section>-<nnn>`. Route slugs: `home`, `about`, `contact`, `services-<service>`, `cases-<case>`, `jobs`, `news`, `legal-privacy`, `legal-cookies`. Section labels are free-form but consistent within a route (`hero`, `team-portrait`, `process-step-1`, `testimonial-background`, …).

**Summary at Step 8:** the content-audit step includes an `IMAGE_REQUESTS.md` summary — counts by status, any rows with `Rights / privacy notes` flagged for client decision, any orphan markers reconciliation surfaced.

---

## Requests

*(No image requests yet. The web-designer writes rows here during Step 6 page builds. To seed manually, copy the schema from `.claude-plugin/skills/media-prompting/SKILL.md`.)*

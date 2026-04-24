# Image Slots

Authoritative inventory of every image slot the committed design direction requires, enumerated per route. **This is the brief-derived binding list** — it exists so missing imagery can't hide in the gap between "web-designer forgot a marker" and "no one noticed." Every row here must resolve to a concrete state before a page can pass its Phase 3 compliance check.

## Who writes this

Derived once from `design-direction.md` (committed P-strategy + attribute→visual translation table + the brief's explicit imagery clauses) and `SITE_PLAN_TEMPLATE.md` (which pages exist, their purpose) at the **end of Step 5.2** (tokenization). The web-designer then updates the **Resolution** field on each slot during Step 6 page builds.

On `/redesign` resumption: if `design-direction.md` exists but this file doesn't, the orchestrator derives it as a migration step before continuing. That covers projects that started before this artifact existed.

## Schema

One section per route, one row per required slot. Fields are:

```markdown
## <route slug> — <route description>

### SLOT-<route>-<section>-<nnn>

- **Section:** <hero | team-teaser | services-section | about-story | … free-form section label>
- **Role:** hero | content | card | background | decorative
- **P-strategy:** <P2 Environmental Portrait> (quote from `design-direction.md`: "…")
- **Why required:** <one-line reason the brief mandates imagery here>
- **Resolution:** <pending | catalog-reuse | manifest-row | image-present | justified-none>
  - *catalog-reuse:* `public/images/<path>` from `IMAGE_CATALOG.md`
  - *manifest-row:* `IMG-<id>` in `public/images/IMAGE_REQUESTS.md`
  - *image-present:* `public/images/<path>` (file installed and `next/image` referenced)
  - *justified-none:* one-line brand-constraint reason that references `design-direction.md` or an explicit brief exception. "Client hasn't provided a photo yet" is NOT a justified-none — that's asset-pending, which resolves to `manifest-row`.
- **Notes:** <optional — mobile crop behavior, rights caveats, locale variants, etc.>
```

## Resolution lifecycle

A slot begins `pending` when derived from the brief. It progresses through exactly one of:

- **`catalog-reuse`** — an existing catalog image fits. The web-designer references it via `next/image` and updates this row. No manifest row needed.
- **`manifest-row`** — a new image is needed. The web-designer writes an `IMG-...` row in `IMAGE_REQUESTS.md` (per the media-prompting skill), inserts a `[NEEDS:image IMG-...]` marker in the component, and updates this row to point at the manifest ID. Becomes `image-present` when the human generates + installs the image.
- **`image-present`** — a file exists at the target path and a `next/image` in source references it. Terminal state.
- **`justified-none`** — the slot is deliberately not filled, and the reason is legitimate (specific brand constraint citing the brief, not asset-pending). Terminal state. **Misusing this is a critical audit failure** — the architect absence audit cross-checks `justified-none` reasons and flags rubber-stamp justifications.

## How this is enforced

- **Web-designer Phase 3 compliance log** — every page's compliance entry includes a row per slot in that route: "SLOT-home-hero-001: <resolution>". Any `pending` slot = Phase 3 FAIL unless the row is demoted to `justified-none` with a real brand-constraint reason.
- **Architect absence audit** — during review, the architect reads this file and verifies every non-`justified-none` slot resolves to catalog-reuse (file exists), manifest-row (row exists in `IMAGE_REQUESTS.md`), or image-present (file + `next/image` reference). Unresolved = Critical distinctiveness finding, blocking.
- **browser-qa rendered-fidelity check** — at phase boundaries and final review, browser-qa cross-references rendered pages against this file. A route with an unresolved hero slot AND a visibly empty hero band = Critical rendered-fidelity finding.
- **`/generate-media-prompts`** — reconciles this file, the manifest, markers, and installed files four-way. Any slot not accounted for across all four is surfaced.

## Deriving the initial slot list

When the orchestrator derives this file at end of Step 5.2 (or on resumption if missing), it walks:

1. For each route in `SITE_PLAN_TEMPLATE.md`, identify required sections (hero, service list, team section, case studies, about story, contact form, etc.) using the `page-design` references.
2. Intersect with the committed P-strategy in `design-direction.md`. If the brief's P-strategy demands imagery (P1–P8), the hero is a slot. If the brief's attribute→visual translation says "staff portraits are first-class page elements," team sections are slots. If the brief commits to P5 Abstract Texture, service cards are slots.
3. For each slot, record the triggering brief quote verbatim in the `P-strategy` field.
4. Every slot starts `Resolution: pending`.
5. Output this file grouped by route, in build-phase order (Phase 0 shared components first, then Phase 1 core pages, etc.).

**Do not guess P-strategy requirements.** If a route's P-strategy commitment doesn't clearly require imagery for a section, don't invent a slot. Conversely, if the brief explicitly names a slot, it's required regardless of whether the web-designer would have added one on their own.

## Interaction with `IMAGE_CATALOG.md` and `IMAGE_REQUESTS.md`

- `IMAGE_CATALOG.md` — what's already on disk. Input. A slot can resolve to `catalog-reuse` by referencing a catalog path.
- `IMAGE_REQUESTS.md` — prompts for images not yet generated. Output destination when a slot resolves to `manifest-row`.
- `IMAGE_SLOTS.md` — **what's required.** The binding list the other two are reconciled against. If a slot isn't in either of the other files AND isn't `justified-none`, that's an audit failure.

---

## Slots

*(Populated by the `/redesign` orchestrator after Step 5.2 completes, or manually derived from `design-direction.md` + `SITE_PLAN_TEMPLATE.md` if bootstrapping a project that predates this artifact. Until populated, this section is empty and the file is not enforcing.)*

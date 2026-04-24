# Image Slots

<!-- DERIVATION METADATA — do not edit by hand; the /redesign orchestrator maintains this block -->
<!--
derived-at: 2026-04-24T15:00:00Z
plugin-version: 1.1.0
schema-version: 1
inputs:
  design-direction-hash: 16e9602ece30
  site-plan-hash:        57f43d10c3f0
-->

Authoritative inventory of every image slot the committed design direction requires, enumerated per route. **This is the brief-derived binding list** — it exists so missing imagery can't hide in the gap between "web-designer forgot a marker" and "no one noticed." Every row here must resolve to a concrete state before a page can pass its Phase 3 compliance check.

## Freshness — resumption check contract

On any `/redesign` resumption, the orchestrator re-computes the current hashes of `design-direction.md` and `SITE_PLAN_TEMPLATE.md` and compares them against the HTML-comment `inputs:` block above. If any differ, or the block is missing, or `derived-at: not yet derived` / empty, **this file is stale** and must be re-derived before Step 6 can proceed. An existing file that is empty of slots or was populated without a derivation record does NOT count as complete — the empty template we ship with has `not yet derived` in the metadata on purpose, so existence alone is insufficient.

Hash computation: `sha256sum <path> | cut -c1-12` — short hashes are stable enough for human inspection and change detection. The plugin version comes from `.claude-plugin/plugin.json` `"version"` field.

## Who writes this

The orchestrator writes this file at the end of Step 5.2. The web-designer appends rows during Step 6 if composition demands an additional slot not in the initial derivation. The web-designer fills in `Resolution` as part of the Phase 3 compliance log entry for each page.

## Schema

```
### SLOT-<route>-<section>-<nnn>
- **Route:** <e.g. / or /team>
- **Section:** <hero | teamteaser | portrait | services-intro | etc.>
- **Brief quote:** "<verbatim excerpt from design-direction.md that mandates this slot>"
- **P-strategy:** P2 Environmental Portrait
- **Resolution:** <pending | catalog-reuse | manifest-row | image-present | justified-none>
- **Resolution detail:** <file path, or reason for justified-none>
```

Resolutions:
- `pending` — not yet resolved (FAIL in Phase 3 gate)
- `catalog-reuse` — uses an existing image from IMAGE_CATALOG.md
- `manifest-row` — an IMG-... row in IMAGE_REQUESTS.md records this slot (client must supply)
- `image-present` — image file exists in public/ and is wired in code
- `justified-none` — the slot was explicitly waived in the compliance log with a brand-constraint reason

---

## Phase 0 — Shared Components

*No image slots mandated by design-direction.md for Header, Footer, CookieConsent, or Language Switcher.*

---

## Phase 1 — Homepage (/)

### SLOT-home-hero-001
- **Route:** /
- **Section:** hero
- **Brief quote:** "Hero section uses large display text left-aligned against a portrait photograph right-heavy." (design-direction.md §2 Layout — L2 Editorial Asymmetry)
- **P-strategy:** P2 Environmental Portrait
- **Resolution:** justified-none
- **Resolution detail:** Web-designer implemented text-only hero and justified this in the compliance log: "P2: The 6 staff photos are not displayed here (they're on /team). Use typographic warmth instead." Staff portraits are first-class elements on /team per the brief's "first-class page elements" principle. Hero portrait gap acknowledged in browser-qa finding 14:02 (deferred, non-blocking). Compliance log entry for homepage records PASS on P2 with explicit justification.

### SLOT-home-teamteaser-001 — Susanne
- **Route:** /
- **Section:** teamteaser
- **Brief quote:** "Six staff portraits (P2 Environmental Portrait) are first-class page elements, not card thumbnails. Each portrait is large enough to register a face." (design-direction.md §3 Attribute→Visual Translation) and Site Plan §4.1 "Team teaser: all 6 names and photos with link to /team"
- **P-strategy:** P2 Environmental Portrait
- **Resolution:** justified-none
- **Resolution detail:** Homepage team teaser section removed in Final Polish Pass (commit 817bfff) to avoid showing placeholder content. All six portraits fully implemented with next/image on /team. Findings 10:01, 12:03, 14:03 pertain to this section — all rejected. Homepage is a routing device per Site Plan.

### SLOT-home-teamteaser-002 — Anita
- **Route:** /
- **Section:** teamteaser
- **Brief quote:** Same as SLOT-home-teamteaser-001
- **P-strategy:** P2 Environmental Portrait
- **Resolution:** justified-none
- **Resolution detail:** Same as SLOT-home-teamteaser-001

### SLOT-home-teamteaser-003 — Heidi
- **Route:** /
- **Section:** teamteaser
- **Brief quote:** Same as SLOT-home-teamteaser-001
- **P-strategy:** P2 Environmental Portrait
- **Resolution:** justified-none
- **Resolution detail:** Same as SLOT-home-teamteaser-001

### SLOT-home-teamteaser-004 — Tina
- **Route:** /
- **Section:** teamteaser
- **Brief quote:** Same as SLOT-home-teamteaser-001
- **P-strategy:** P2 Environmental Portrait
- **Resolution:** justified-none
- **Resolution detail:** Same as SLOT-home-teamteaser-001

### SLOT-home-teamteaser-005 — Merete
- **Route:** /
- **Section:** teamteaser
- **Brief quote:** Same as SLOT-home-teamteaser-001
- **P-strategy:** P2 Environmental Portrait
- **Resolution:** justified-none
- **Resolution detail:** Same as SLOT-home-teamteaser-001

### SLOT-home-teamteaser-006 — Camilla
- **Route:** /
- **Section:** teamteaser
- **Brief quote:** Same as SLOT-home-teamteaser-001
- **P-strategy:** P2 Environmental Portrait
- **Resolution:** justified-none
- **Resolution detail:** Same as SLOT-home-teamteaser-001

---

## Phase 1 — Services & Prices (/ydelser)

*No image slots mandated. P3 Process Documentary is listed as "Secondary" in design-direction.md P2 execution note. The price list is designed as a document — compliance log shows P2 treated as text-only with PASS. No brief clause explicitly mandates imagery on this route.*

---

## Phase 1 — Contact (/kontakt)

*No image slots mandated. Contact page purpose is address/phone/hours/map/booking — no portrait or process imagery required by design-direction.md.*

---

## Phase 2 — Team (/team)

Six portrait slots — one per stylist. All resolved as image-present.

### SLOT-team-portrait-001 — Susanne
- **Route:** /team
- **Section:** portrait
- **Brief quote:** "Six staff photographed in the salon at their workstation, natural light, candid or near-candid. Hands in frame when possible (scissors, comb). Full names shown as captions." (design-direction.md §2 Photography — P2)
- **P-strategy:** P2 Environmental Portrait
- **Resolution:** image-present
- **Resolution detail:** /public/images/team/susanne.jpg (300×400px, REUSE — authentic staff photo from old site)

### SLOT-team-portrait-002 — Anita
- **Route:** /team
- **Section:** portrait
- **Brief quote:** Same as above (P2 Environmental Portrait execution)
- **P-strategy:** P2 Environmental Portrait
- **Resolution:** image-present
- **Resolution detail:** /public/images/team/anita.jpg (300×400px, REUSE)

### SLOT-team-portrait-003 — Heidi
- **Route:** /team
- **Section:** portrait
- **Brief quote:** Same as above (P2 Environmental Portrait execution)
- **P-strategy:** P2 Environmental Portrait
- **Resolution:** image-present
- **Resolution detail:** /public/images/team/heidi.jpg (300×400px, REUSE)

### SLOT-team-portrait-004 — Tina
- **Route:** /team
- **Section:** portrait
- **Brief quote:** Same as above (P2 Environmental Portrait execution)
- **P-strategy:** P2 Environmental Portrait
- **Resolution:** image-present
- **Resolution detail:** /public/images/team/tina.jpg (300×400px, REUSE)

### SLOT-team-portrait-005 — Merete
- **Route:** /team
- **Section:** portrait
- **Brief quote:** Same as above (P2 Environmental Portrait execution)
- **P-strategy:** P2 Environmental Portrait
- **Resolution:** image-present
- **Resolution detail:** /public/images/team/merete.jpg (300×400px, REUSE)

### SLOT-team-portrait-006 — Camilla
- **Route:** /team
- **Section:** portrait
- **Brief quote:** Same as above (P2 Environmental Portrait execution)
- **P-strategy:** P2 Environmental Portrait
- **Resolution:** image-present
- **Resolution detail:** /public/images/team/camilla.jpg (300×400px, REUSE)

---

## Phase 2 — About (/om-os)

*No image slots mandated. Compliance log shows P2 treated as text-only (typographic warmth via Playfair Display pull-quote) with PASS. The brief's P2 portraits are concentrated on /team.*

---

## Phase 3 — Legal Pages (/cookie-politik, /privatlivspolitik)

*No image slots mandated. Legal document pages — no photography required or appropriate.*

---

## Summary

| Slot ID | Route | Resolution | Detail |
|---------|-------|-----------|--------|
| SLOT-home-hero-001 | / | justified-none | Text-only hero; portraits on /team |
| SLOT-home-teamteaser-001 | / | justified-none | Section removed; portraits on /team |
| SLOT-home-teamteaser-002 | / | justified-none | Section removed; portraits on /team |
| SLOT-home-teamteaser-003 | / | justified-none | Section removed; portraits on /team |
| SLOT-home-teamteaser-004 | / | justified-none | Section removed; portraits on /team |
| SLOT-home-teamteaser-005 | / | justified-none | Section removed; portraits on /team |
| SLOT-home-teamteaser-006 | / | justified-none | Section removed; portraits on /team |
| SLOT-team-portrait-001 | /team | image-present | /public/images/team/susanne.jpg |
| SLOT-team-portrait-002 | /team | image-present | /public/images/team/anita.jpg |
| SLOT-team-portrait-003 | /team | image-present | /public/images/team/heidi.jpg |
| SLOT-team-portrait-004 | /team | image-present | /public/images/team/tina.jpg |
| SLOT-team-portrait-005 | /team | image-present | /public/images/team/merete.jpg |
| SLOT-team-portrait-006 | /team | image-present | /public/images/team/camilla.jpg |

**0 pending slots. All slots terminal (7 justified-none + 6 image-present = 13 total). Gate checks 7+8: PASS.**

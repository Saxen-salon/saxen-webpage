# Existing Site — Image Catalog

Images extracted from the old website (https://www.saxen.dk/) for potential reuse in the redesign.
Crawled: 2026-04-22

## Assessment Key

- **REUSE** — Good quality, relevant, use as-is
- **REUSE-IF** — Usable but needs context (e.g., only if we build a specific section)
- **REPLACE** — Keep as placeholder, but flag for a better version
- **SKIP** — Not worth carrying forward

---

## Hero / Banner

| File | Original URL | Dimensions | Assessment | Notes |
|------|-------------|------------|------------|-------|
| `hero/slider1.jpg` | `/websites/SAXENHJOERRING/images/slider1.jpg` | 1200×450px | REPLACE | Likely the main homepage hero image — 1200px wide is usable but 450px height is quite short for a modern hero. Likely stock or generic salon interior. Confirm with client if this is an authentic photo of their salon; if so upgrade to REUSE. |

---

## Team

Six staff photos extracted from the `/employees` page. All are 300×400px JPEG portrait format — authentic, consistent, usable.

| File | Staff Member | Dimensions | Assessment | Notes |
|------|-------------|------------|------------|-------|
| `team/susanne.jpg` | Susanne | 300×400px | REUSE | Authentic staff photo. Small but adequate for card layout. Could benefit from higher-res reshoots for redesign. |
| `team/anita.jpg` | Anita | 300×400px | REUSE | Authentic staff photo. Same notes as Susanne. |
| `team/camilla.jpg` | Camilla | 300×400px | REUSE | Authentic staff photo. Same notes as Susanne. |
| `team/heidi.jpg` | Heidi | 300×400px | REUSE | Authentic staff photo. Same notes as Susanne. |
| `team/merete.jpg` | Merete | 300×400px | REUSE | Authentic staff photo. Same notes as Susanne. |
| `team/tina.jpg` | Tina | 300×400px | REUSE | Authentic staff photo. Same notes as Susanne. |

**Note on team photos:** All six are authentic, which is their main value. At 300×400px they are borderline for modern displays — acceptable for grid/card components at 1–2 columns but will appear soft on large screens or retina displays. Client should be asked to provide higher-resolution versions or plan a photo shoot.

---

## Facility

| File | Original URL | Dimensions | Assessment | Notes |
|------|-------------|------------|------------|-------|
| `facility/googlemap.png` | `/websites/SAXENHJOERRING/images/googlemap.png` | 300×300px | SKIP | Static Google Maps screenshot of the salon location. Replace with an embedded Google Maps component or a proper map integration in the redesign. |

---

## Services

No service-specific images were found on the old site. The treatments/price-list page contains no imagery.

**Content gap:** Client should be asked to provide photos illustrating key services (e.g., coloring in progress, bridal styling, before/after shots).

---

## Cases

No case study or portfolio images found. The old site has no cases or gallery section.

---

## Brand

No dedicated logo file was found in the site's image assets. The logo/brand name "Saxen" appears as plain text in the navbar (`<a class="navbar-brand">Saxen</a>`). The `og:image` referenced (`/websites/SAXENHJOERRING/images/welcome.jpg`) returned a 404-equivalent redirect.

**Content gap:** Client must provide a logo file (SVG preferred). If no logo file exists, a wordmark design should be created as part of the redesign.

---

## Old-Site Screenshots (Reference Only — Not For Reuse)

Full-page HTML captures of key old-site pages for design-system and review agents to reference. These are **not** published to the new site. Browser automation was not available in this environment, so raw HTML files are saved instead of rendered screenshots — downstream agents can render these locally if needed.

| File | Page captured | Captured on | Notes |
|------|--------------|-------------|-------|
| `old-site-screenshots/homepage.html` | https://www.saxen.dk/ | 2026-04-22 | Full page HTML — 7,278 bytes. Bootstrap 4 dark navbar, three-column layout (welcome text, opening hours + booking CTA, contact/map). Single hero carousel image. |
| `old-site-screenshots/treatments.html` | https://www.saxen.dk/treatments | 2026-04-22 | Full page HTML — 11,996 bytes. Text-only price list in 5 categories (Klipninger, Klip og Farve, Opsætninger, Bryn og Vipper, Herrer). No images. |
| `old-site-screenshots/staff.html` | https://www.saxen.dk/employees | 2026-04-22 | Full page HTML — 7,669 bytes. Six staff cards with name + photo only; no bios or roles. |

### Visual direction notes for design-system agent

The old site uses:
- Bootstrap 4 dark navbar (dark background, light text)
- `bg-secondary` body class — likely a grey or secondary Bootstrap color
- Droid Serif font (Google Fonts) for headings
- Three-column Bootstrap grid on homepage
- Plain price list with no visual hierarchy beyond `<h5>` category headers
- No imagery on treatments page
- Minimal styling overall — functional but visually underdeveloped

**Move away from:** Dense text-only layouts, low visual hierarchy, no service imagery, generic Bootstrap styling, dark navbar with no brand identity. The redesign should feel like a modern, warm, personal salon — not a Bootstrap template.

# Design Direction Brief — Saxen Frisør
**Step 5.1 — Design Direction**
Produced: 2026-04-22

---

## 1. One-Sentence Direction

The site reads like a well-lit neighbourhood salon: warm cream ground, editorial serif headlines at confident scale, six real faces leading every people moment, and a price list presented as the main event rather than an afterthought.

---

## 2. Strategy Selections

### Typography — T5 — Contrast Pair

**Selected strategy:** T5 — Contrast Pair
**Display:** Elegant serif (Playfair Display or Cormorant Garamond)
**Body:** Geometric sans (Work Sans or Manrope)
**Weight usage:** Display Regular or Light (the serif carries the warmth through form, not weight); Body Regular + Medium

**Rationale:** Saxen's single strongest differentiator is the full public price list — a document that requires readable, trustworthy tabular text at small sizes (Work Sans handles this cleanly) while the brand needs display warmth and approachability that a plain grotesque alone cannot carry. The serif-plus-sans tension communicates: "we have history and we have clarity" — which is exactly what a stable 6-person Hjørring salon with transparent pricing should feel like. Not luxury, not tech — considered and human.

---

### Color — C3 — Ink + Cream

**Selected strategy:** C3 — Ink + Cream
**Palette structure:** Deep ink (#0F0E0C or similar) on warm cream (#FAF7F2 or similar). Subtle warmth throughout. One muted accent — a dusty rose or warm terracotta — used sparingly on CTAs and active states only.

**Rationale:** The old site runs `bg-secondary` grey with a dark Bootstrap navbar — a cold, institutional palette that signals "CMS template" rather than "local salon." Cream grounds communicate warmth, approachability, and the analog feel of a real neighbourhood business without crossing into luxury. The dusty rose / terracotta accent earns its place: hair salons work with colour — one warm chromatic accent signals that identity without competing with the staff photography. Danish salons that position at the mid-market warm-personal end use earth-adjacent palettes, not blue-and-grey corporate defaults.

---

### Layout — L2 — Editorial Asymmetry

**Selected strategy:** L2 — Editorial Asymmetry
**Structure:** Broken grid with intentional column-width variation. Hero section uses large display text left-aligned against a portrait photograph right-heavy. Price sections use a clean two-column split (label left, price right) with generous line spacing. Staff section uses irregular portrait sizing — not equal Bootstrap cards.

**Rationale:** Saxen's price transparency pillar demands that the price list page be a designed object, not an HTML table. Editorial Asymmetry gives the price list room to breathe with pull-out callouts for key prices (baby cut 180 kr, bridal 960 kr) and creates directional reading flow. On the homepage, asymmetry lets staff portraiture dominate half the viewport rather than being scaled down into equal three-column card grids — the humans-as-product insight demands this. A centred symmetric layout would signal "template"; asymmetry signals intention.

---

### Photography — P2 — Environmental Portrait

**Selected strategy:** P2 — Environmental Portrait
**Execution:** Six staff photographed in the salon at their workstation, natural light, candid or near-candid. Hands in frame when possible (scissors, comb). Full names shown as captions. Secondary: P3 Process Documentary for services sections — hands on hair, treatment in progress — to fill the current complete absence of service imagery.

**Rationale:** "Hos Saxen er vi 6 ansatte" — the six named stylists are the product. The existing 300×400px portrait photos are authentic, which is their entire value. Environmental portraits in the actual salon communicate the same authenticity at higher quality and add spatial context (the real Hjørring location) that builds familiarity before a customer walks in. P9 Stock is explicitly excluded. Process documentary fills the services gap; the old treatments page has zero imagery, which makes it a wall of text with no emotional anchor.

---

### Shape / Form Language — S4 — Architectural Line

**Selected strategy:** S4 — Architectural Line
**Border radius:** 0px. Primary structural language is 1px hairline dividers between sections and list items. Borders rarely close shapes — they draw structure. Price list rows use hairline separators, not bordered boxes or cards.

**Rationale:** The price list is the structural heart of the site. A list of 35+ price items is better served by 1px hairline separators than by card borders, background fills, or rounded boxes — the latter reads as a UI component, the former reads as a designed document. Architectural Line pairs naturally with Ink+Cream (C3) and Editorial Asymmetry (L2). S3 Soft Pill would domesticate the design into SaaS territory, which is wrong for a physical trade service.

---

### Density / Whitespace — D2 — Editorial

**Selected strategy:** D2 — Editorial
**Hero type:** 72–88px on desktop
**Section spacing:** 140–180px vertical between sections
**Content density:** Medium — the price list is the exception (D4-density within its section); all surrounding sections breathe at editorial pace.

**Rationale:** Saxen has limited imagery (six portraits, one hero shot) — padding density with whitespace is not a luxury, it is a necessity. D2 Editorial spacing communicates that each section matters and has been considered, rather than content cramming the screen to compensate for thin visual assets. The price list section can compress to D4 Information-Dense within its own container without conflicting — it is genuinely information-dense content and should look like it.

---

### Interaction / Motion — M1 — Architectural Stillness

**Selected strategy:** M1 — Architectural Stillness
**Transitions:** 150–200ms ease-out. Hover states: colour shift on links and buttons only. Focus rings for keyboard navigation. No scroll-linked animation beyond a single entry fade on first viewport.
**Scroll:** No parallax. No section-entry animations cascading down the page.

**Rationale:** The old site's Bootstrap carousel with a single image creates motion-for-motion's-sake, which adds no brand value. Saxen's tone is warm and direct — the content should be the event, not the interaction. M3 Editorial Fade was considered, but the available imagery (six 300×400px portraits, one short hero) does not warrant scroll-parallax — it would expose the shallow image inventory rather than hide it. Architectural Stillness also respects the significant proportion of mobile users (local customers searching on phones) for whom heavy motion creates battery and performance concerns.

---

## 3. Attribute → Visual Translation Table

| Brand Attribute | Visual Expression |
|----------------|-------------------|
| **Personal** | Six staff portraits (P2 Environmental Portrait) are first-class page elements, not card thumbnails. Each portrait is large enough to register a face. First names appear in serif display type directly beneath. No generic "our team" headings — just the names. |
| **Experienced** | Serif display type (Playfair Display) carries inherited authority without claiming it explicitly. The full price list — 35+ line items, all prices published — implies an operation confident enough to stand behind every service with a named price. No hedging phrases in copy. |
| **Transparent** | The price list is treated as a designed feature, not a support page. It appears in primary navigation, uses the same generous section spacing as the hero, and is visually distinct through hairline separators and clear typographic hierarchy (category headers in serif, line items in sans). Prices are right-aligned, always visible. No "from" pricing without also showing the full range. |
| **Local and genuine** | Ink+Cream palette reads warm and analogue — not a digital-native blue-on-white. "Hjørring" appears in display copy on the homepage, not buried in footer text. The salon address is on every page (footer). No stock imagery anywhere — the only faces are the six real stylists. |
| **Accessible** | D2 Editorial spacing and Work Sans body text (16px minimum, generous line-height) serve older local customers on mobile. Hairline separators provide visual structure without colour dependence. WCAG 2.1 AA contrast ratios enforced across Ink+Cream + accent combinations. Online booking CTA and phone number are persistent in the header on mobile — never requires scrolling to find. |

---

## 4. Avoid List (Site-Specific)

Derived from the old-site HTML at `public/images/old-site-screenshots/`:

- **Three equal Bootstrap columns on the homepage** — the old site splits Welcome / Åbningstider / Kontakt into `col-sm-4` — equal weight on three unequal ideas. The new site should not equalise all homepage sections through column grid.
- **Dark Bootstrap navbar (`.navbar-dark.bg-dark`)** — the entire old site uses a black top-bar with white text, logo left, hamburger/collapse right. This is the signature of an Admind-hosted Bootstrap template. The new site must have a distinct navigation treatment.
- **Bootstrap carousel with a single image** — the old homepage has a `.carousel` with exactly one slide and a carousel indicator beneath it, which defeats the purpose of a carousel while adding its visual noise. The new site uses a static, intentional hero composition.
- **Droid Serif for headings with no system body** — the old site loads Droid Serif from Google Fonts for `h1/h3/h6` only, falling back to Bootstrap default sans for body. The pairing is accidental and visually incoherent. The new site has an intentional, named type pair.
- **Text-only treatments page with no imagery, no hierarchy beyond `<h5>` category headers** — the price list is a wall of `.menu-list-item` `<li>` elements separated by uppercase `<h5>` labels. No visual rhythm, no pull-quotes, no price spotlighting. The new treatments page is a designed document.
- **Staff page as thumbnail-name pairs with zero content** — the old `/employees` page shows a 4-column-3 photo + first name, empty `<p>` below each. There is no bio, no role, no specialism. The new team page makes the emptiness structurally impossible — the layout only works when each person has at least one sentence.
- **Static Google Maps PNG as the contact image** — the old site embeds a 300×300px screenshot from Google Maps as a linked `<img>`. Replace with an embedded map component or a styled address block.
- **`bg-secondary` body colour** — the entire old site sits on Bootstrap's `bg-secondary` grey body. The new site uses Cream (#FAF7F2) as the page base, which is a deliberate choice, not a CSS class default.
- **Footer that only credits the booking vendor** — the old footer's primary link is "Admind A/S" with a copyright notice. The salon's own brand does not appear in the footer. The new footer is Saxen-first: address, phone, hours, social links (if available), then legal.

---

## 5. Identity Test

If you removed the Saxen wordmark, would this page be identifiable as a six-person neighbourhood salon in Hjørring with published prices — or could it be any Danish service business?

---

## 6. What We're Moving Away From

1. **Bootstrap-default visual language** — the entire old site is structurally a Bootstrap 4 template with minimal customisation. Every layout decision (navbar, container, column grid, card, button style) follows Bootstrap defaults. The new site has no visible Bootstrap influence.

2. **Three-column homepage that treats contact information as a content column** — Welcome / Opening Hours / Map is a three-column grid where a static map image occupies one third of the homepage. Contact is a footer concern; homepage real estate goes to people and trust signals.

3. **Navigation that links to the external booking system as its first item** — the old nav leads with "Online booking" pointing to a third-party domain (saxenhjoerring.bestilling.nu). This abandons the user immediately. The new nav keeps the booking CTA visible but routes through the site first.

4. **Absence of any visual hierarchy on the price list** — every price item is the same `<li>` element. There is no visual distinction between a 180 kr baby cut and a 1,590 kr full color-and-highlights service. The new site uses hierarchy: category headers, standout prices for anchoring items, and clear grouping.

5. **Staff page that communicates nothing about the people** — six empty bios (`<p></p>`) with a thumbnail and a first name. Structurally, the page says "we have six employees" with no additional claim. The redesign makes the team page a trust-building destination.

6. **No photography on any interior page** — the treatments page and staff page (beyond thumbnail headshots) have zero service-context imagery. A salon without images of the work it does cannot differentiate on quality signals. The new services pages include process/environmental photography as a structural requirement.

7. **Cold colour temperature throughout** — dark navbar, `bg-secondary` grey body, white Bootstrap card backgrounds. No warmth anywhere. The salon's actual brand voice ("Vi glæder os til at se dig her i salonen") is warmer than anything the colour palette communicates.

8. **Text that reads like a booking-system CMS prompt** — the welcome paragraph is honest but structurally generic, written to fill a text block. "Vi sætter fokus på kunden og tager udgangspunkt i dine personlige ønsker" is a real positioning statement buried in a paragraph that sounds like a form field. The new site's copy leads with the differentiators, not with the generic.

9. **Footer that credits the platform, not the salon** — "© 2026 Admind A/S" as the footer's only prominent element. The salon owns the relationship with its customers; the booking platform provider should not dominate the last thing a visitor sees.

10. **No mobile-optimised price list** — the old `float-sm-left / float-sm-right` pattern for service name / price breaks on narrow viewports. The new price list is designed mobile-first, with a flex/grid layout that keeps service and price on the same visual row at all breakpoints.

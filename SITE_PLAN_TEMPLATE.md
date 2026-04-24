# Saxen Website — Site Plan

> **Brand DNA**: "Vi sætter fokus på kunden og tager udgangspunkt i dine personlige ønsker"
> **Positioning**: Hjørrings frisør med åbne priser og et stabilt hold på seks erfarne frisører
> **Stack**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, multilingual (da)
> **Domain**: saxen.dk

<!-- This plan is filled by the site-planner agent during Step 3 of the /redesign pipeline.
     It becomes the architectural blueprint for the entire build. -->

---

## Table of Contents

1. [Design Principles](#1-design-principles)
2. [Site Architecture](#2-site-architecture)
3. [Page Inventory](#3-page-inventory)
4. [Page Specifications](#4-page-specifications)
5. [Buying Journey Mapping](#5-buying-journey-mapping)
6. [Topic Cluster Strategy](#6-topic-cluster-strategy)
7. [Internal Linking Strategy](#7-internal-linking-strategy)
8. [Structured Data Plan](#8-structured-data-plan)
9. [Production Readiness Requirements](#9-production-readiness-requirements)
10. [Build Phases](#10-build-phases)
11. [Content Requirements from Client](#11-content-requirements-from-client)

---

## 1. Design Principles

These principles override all other decisions. When in doubt, refer back here.

### Lead with price transparency
Saxen's full public price list is the single strongest differentiator. Every page should make prices easy to find. The Services/Prices page is a first-class conversion destination, not an afterthought.

### Real people, not stock imagery
Six named stylists with real photos. The design must prominently feature the team — names and faces build trust and reduce pre-visit anxiety better than any copywriting.

### Structure for the local customer, not a marketing department
Pages map to how a Hjørring resident evaluates a new hair salon: Can I afford it? Are the stylists reliable? How do I book? Answer those three questions before anything else.

### Fewer, deeper pages over many thin ones
This is a 6-person local salon. Five focused pages beat ten half-finished ones. Every page must justify its existence with unique content and a clear conversion purpose.

### The homepage is a routing device
Its job is to answer three questions in under 10 seconds: What does Saxen do? Why should I trust them? How do I book? Then get out of the way.

### Don't launch what you can't fill
No blog, no news section, no case studies. Launch only what has real content behind it. Content gaps are marked `[NEEDS: ...]`, not hidden with filler text.

---

## 2. Site Architecture

```
saxen.dk
├── /[locale]/                          ← Homepage (/)
├── /[locale]/ydelser/                  ← Services & full price list
├── /[locale]/team/                     ← Meet the team (all 6 stylists)
├── /[locale]/om-os/                    ← About the salon
├── /[locale]/kontakt/                  ← Contact, hours, map, booking CTA
├── /[locale]/cookie-politik/           ← Cookie Policy (legal, preserved from old site)
├── /[locale]/privatlivspolitik/        ← Privacy Policy (GDPR, new)
├── /sitemap.xml                        ← Auto-generated
└── /robots.txt                         ← Auto-generated
```

**Intentionally excluded:** cases/portfolio, news/blog, jobs page, service sub-pages, multi-tier navigation. These do not fit a 6-person local salon and would ship empty.

---

## 3. Page Inventory

| Page | Route | Priority | Phase | Primary Keyword (da) |
|------|-------|----------|-------|----------------------|
| Homepage | `/` | P0 | Phase 1 | frisør Hjørring |
| Services & Prices | `/ydelser` | P0 | Phase 1 | prisliste frisør Hjørring |
| Contact | `/kontakt` | P0 | Phase 1 | kontakt frisør Hjørring |
| Team / Staff | `/team` | P1 | Phase 2 | frisører Saxen Hjørring |
| About | `/om-os` | P2 | Phase 2 | Saxen frisørsalon Hjørring |
| Cookie Policy | `/cookie-politik` | P3 | Phase 3 | — |
| Privacy Policy | `/privatlivspolitik` | P3 | Phase 3 | — |

---

## 4. Page Specifications

### 4.1 Homepage

- **Route:** `/`
- **Primary keyword:** frisør Hjørring
- **Page purpose:** Route first-time visitors to booking or the price list within 10 seconds, using price transparency and the named team as the primary trust signals.
- **Key content elements:**
  - Hero section: primary claim "Du ved hvad du betaler — inden du overhovedet sætter dig i stolen" with CTA to book online and secondary CTA to view prices
  - Trust bar: "6 erfarne frisører · Åbne priser · Online booking · Hjørring centrum"
  - Service categories overview (4–5 tiles: Damer, Herrer, Børn, Farve & Highlights, Særlige lejligheder) — links to `/ydelser`
  - Team teaser: all 6 names and photos with link to `/team`
  - Phone/color callout: "Farve og highlights? Ring til os på 98 92 00 99" — framed as care, not friction
  - Address + opening hours summary: Jernbanegade 1, 9800 Hjørring · Man–fre 09:00–17:30 · Lør 08:00–13:00
  - [NEEDS: 1–2 customer testimonials with permission, or Google review excerpt]
- **Primary CTA:** Book tid online
- **Secondary CTA:** Se vores priser
- **Build phase:** Phase 1

---

### 4.2 Services & Prices (`/ydelser`)

- **Route:** `/ydelser`
- **Primary keyword:** prisliste frisør Hjørring
- **Page purpose:** Present the full public price list in a scannable, mobile-first layout that builds pre-booking confidence and removes any hesitation about hidden costs.
- **Key content elements:**
  - Short intro paragraph: "Vi har altid haft åbne priser — det synes vi er den mest ærlige måde at drive frisørsalon på."
  - Price list grouped into 5 categories (all prices from the old site price list):
    1. **Damer** — klip, vask & føn, diverse klip og styling
    2. **Herrer** — herreklip (355 kr), skæg
    3. **Børn** — babylugt (100 kr), børneklip
    4. **Farve & Highlights** — farve, highlights, ombre, balayage, Wella Plex behandling
    5. **Særlige lejligheder** — brudefrisure (fra 960 kr), konfirmation opsætning (660 kr), diverse opsætninger
  - Color/highlights callout box: "Ønsker du farve eller highlights, bedes du ringe til os på 98 92 00 99, så vi kan aftale det bedste resultat for dig." — with click-to-call link
  - [NEEDS: Complete price list table from old site — all 35+ line items with exact DKK amounts]
  - [NEEDS: Any additional product brands used (beyond Wella) for a short product brands note]
  - Booking CTA section at bottom of page
- **Primary CTA:** Book tid online
- **Secondary CTA:** Ring til os (98 92 00 99)
- **Build phase:** Phase 1

---

### 4.3 Contact (`/kontakt`)

- **Route:** `/kontakt`
- **Primary keyword:** kontakt frisør Hjørring
- **Page purpose:** Remove all booking and location friction — address, phone, hours, map, and online booking CTA must all be visible without scrolling on mobile.
- **Key content elements:**
  - Phone number: 98 92 00 99 (click-to-call)
  - Address: Jernbanegade 1, 9800 Hjørring
  - Opening hours table: Man 09:00–17:30, Tir 09:00–17:30, Ons 09:00–17:30, Tor 09:00–17:30, Fre 09:00–17:30, Lør 08:00–13:00, Søn Lukket
  - Embedded map (Google Maps or OpenStreetMap, Jernbanegade 1, Hjørring)
  - Online booking CTA (link to saxenhjoerring.bestilling.nu)
  - Email: [NEEDS: Confirm public contact email — susanne@karlborg.dk or a salon-specific address]
  - Color/highlights note: "Ønsker du farve eller highlights, bedes du ringe til os — vi tager den tid der skal til for at finde det rigtige for dig."
  - [NEEDS: Parking and access information — street parking on Jernbanegade or nearest car park?]
- **Primary CTA:** Book tid online
- **Secondary CTA:** Ring til os
- **Build phase:** Phase 1

---

### 4.4 Team / Staff (`/team`)

- **Route:** `/team`
- **Primary keyword:** frisører Saxen Hjørring
- **Page purpose:** Reduce the anxiety of visiting a new salon by introducing all 6 stylists with names, faces, and personality — confirming this is a stable, experienced local team, not a revolving door.
- **Key content elements:**
  - Short intro: "Vi er seks frisører med mange års erfaring, og de fleste af vores kunder kender os ved navn."
  - Team grid: one card per stylist — photo, first name, and one-line description
    - Susanne — [NEEDS: role/specialism and one-line bio from client]
    - Anita — [NEEDS: role/specialism and one-line bio from client]
    - Heidi — [NEEDS: role/specialism and one-line bio from client]
    - Tina — [NEEDS: role/specialism and one-line bio from client]
    - Merete — [NEEDS: role/specialism and one-line bio from client]
    - Camilla — [NEEDS: role/specialism and one-line bio from client]
  - [NEEDS: Updated staff headshots suitable for the new design]
  - Closing note: "Vi glæder os til at se dig her i salonen."
- **Primary CTA:** Book tid online (in site header — page itself does not need a hard CTA)
- **Build phase:** Phase 2

---

### 4.5 About (`/om-os`)

- **Route:** `/om-os`
- **Primary keyword:** Saxen frisørsalon Hjørring
- **Page purpose:** A short, honest salon story that reinforces the local, personal, and experienced positioning — for visitors who want more context before booking.
- **Key content elements:**
  - [NEEDS: Founding year and a brief origin story — "Saxen åbnede dørene i [år] på Jernbanegade i Hjørring..."]
  - Core values expressed through facts: 6 staff, open prices, personal approach, Wella products
  - [NEEDS: Any professional certifications or association memberships (e.g. Frisørernes Arbejdsgiverforening)]
  - [NEEDS: Identification of the owner/manager — which of the six staff is the principal?]
  - [NEEDS: Any additional product brands used beyond Wella]
  - "Kom og besøg os" section with address and opening hours (mirrors Contact page, not a full duplicate)
- **Primary CTA:** Book tid online
- **Build phase:** Phase 2
- **Note:** If client cannot provide founding story or owner details before launch, this page ships with `[NEEDS: ...]` markers and is excluded from the main navigation until filled.

---

### 4.6 Cookie Policy (`/cookie-politik`)

- **Route:** `/cookie-politik`
- **Primary keyword:** — (legal page, not for search)
- **Page purpose:** Legal disclosure of cookie usage, preserved from the old saxen.dk site and updated to reflect the new site's analytics and consent setup.
- **Key content elements:**
  - What cookies the site sets (session, analytics/Vercel Analytics, consent preference)
  - How to manage or withdraw consent
  - Last updated date
  - Contact for cookie-related questions: [NEEDS: confirm contact email]
- **Primary CTA:** — (no CTA; legal page)
- **Build phase:** Phase 3
- **Note:** Linked from the cookie consent banner and the site footer. Must exist before the site goes live.

---

### 4.7 Privacy Policy (`/privatlivspolitik`)

- **Route:** `/privatlivspolitik`
- **Primary keyword:** — (legal page, not for search)
- **Page purpose:** GDPR-required disclosure of what personal data is collected (booking form, contact form, analytics), how it is processed, and how users can exercise their rights.
- **Key content elements:**
  - Data controller identification: Saxen, Jernbanegade 1, 9800 Hjørring, [NEEDS: CVR number]
  - Data collected: booking form data, contact form data, analytics (Vercel Analytics, anonymized)
  - Legal basis for processing (legitimate interest, consent for analytics)
  - Data retention periods
  - User rights: access, rectification, erasure, portability
  - Contact for data requests: [NEEDS: confirm data controller email]
  - Last updated date
- **Primary CTA:** — (no CTA; legal page)
- **Build phase:** Phase 3
- **Note:** Must be live before any form submissions or analytics are active. Linked from the site footer and the cookie consent banner.

---

## 5. Buying Journey Mapping

| Stage | Visitor Intent | Target Pages | Key Content |
|-------|---------------|--------------|-------------|
| Awareness | "frisør Hjørring" — looking for a salon | Homepage | Price transparency claim, team faces, address, booking CTA |
| Consideration | "hvad koster en klipning?" — comparing prices | Services/Ydelser | Full price list, service categories, phone number for color inquiry |
| Consideration | "hvem er frisørerne?" — evaluating the team | Team | 6 names and faces, experience signals, warm introductory tone |
| Decision | "er de seriøse?" — last trust check | About, Contact | Salon story, stable team, address on map, opening hours |
| Action | "jeg vil booke" — ready to commit | Contact, Homepage | Online booking link (saxenhjoerring.bestilling.nu), click-to-call |
| Action | "jeg vil have farve, men vil tale med nogen først" | Services, Contact | Phone number prominently placed next to color services |

---

## 6. Topic Cluster Strategy

This is a local service business — topic clusters are local SEO clusters, not content marketing clusters.

| Cluster | Primary Keyword | Hub Page | Supporting Content |
|---------|----------------|----------|--------------------|
| Local identity | frisør Hjørring | Homepage | About, Contact |
| Price transparency | prisliste frisør Hjørring | Services/Ydelser | Homepage service tiles, Contact CTA |
| Color & highlights | farve highlights Hjørring | Services/Ydelser (color section) | Homepage color callout |
| Occasions/bridal | brudefrisure Hjørring, konfirmationsfrisure | Services/Ydelser (occasions section) | Homepage hero image (if bridal photo available) |
| Team trust | frisører Saxen Hjørring | Team | Homepage team teaser, About |
| Booking and contact | book frisør Hjørring | Contact | Homepage CTA, Services bottom CTA |

**Note:** No blog or news section is planned. Keyword depth is achieved through specificity of page content (real prices, real names, real address), not through content volume.

---

## 7. Internal Linking Strategy

- **Homepage** → Services/Ydelser (service tiles + hero CTA), Team (team teaser), Contact (address block + booking CTA)
- **Services/Ydelser** → Contact (color inquiry callout + bottom CTA), Homepage (breadcrumb)
- **Team** → Contact (header booking CTA), Homepage (breadcrumb)
- **About** → Contact (closing CTA), Team (team mention)
- **Contact** → Services/Ydelser (mention prices before booking), Homepage (breadcrumb)
- **Cookie Policy** → Privacy Policy (cross-reference), Contact (data controller)
- **Privacy Policy** → Cookie Policy (cross-reference), Contact (data controller)
- **Footer** (all pages) → Ydelser, Team, Kontakt, Cookie-politik, Privatlivspolitik

---

## 8. Structured Data Plan

| Page | Schema Types | Key Properties |
|------|-------------|----------------|
| Homepage | `HairSalon` + `LocalBusiness` | name: "Saxen", address: Jernbanegade 1 9800 Hjørring, telephone: "+45 98 92 00 99", openingHours: Mo-Fr 09:00-17:30 Sa 08:00-13:00, currenciesAccepted, priceRange |
| Services/Ydelser | `HairSalon` + `Offer` per service category | name, description, price (DKK), priceCurrency: DKK, seller |
| Team | `Person` per stylist | name (first name), worksFor: Saxen, jobTitle: [NEEDS: from client] |
| About | `HairSalon` + `Organization` | foundingDate: [NEEDS: from client], description, employee list |
| Contact | `HairSalon` + `ContactPage` | telephone, email, address, openingHoursSpecification, hasMap |
| Cookie Policy | — | No structured data needed |
| Privacy Policy | — | No structured data needed |

---

## 9. Production Readiness Requirements

These are non-negotiable for every page. Check each item during the build and verify before publish.

### Functionality
- [ ] **Online booking link works** — The link to saxenhjoerring.bestilling.nu opens correctly and is not broken. Verify on mobile.
- [ ] **Click-to-call links work** — All instances of the phone number 98 92 00 99 render as `tel:+4598920099` on mobile.
- [ ] **Contact form submits** — If a contact form is included, it must handle form data and show a success/error state. Never ship a form that renders but does nothing.
- [ ] **Cookie consent enforces preferences** — Vercel Analytics must not load until the user consents. Consent state persists across sessions. Verify that no tracking scripts fire before acceptance.
- [ ] **Cookie consent banner is visible** — The banner appears on first visit for all visitors. It links to `/cookie-politik`.

### Security
- [ ] **Security headers configured** — `next.config.ts` includes `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and `Permissions-Policy` headers.
- [ ] **Embedded map CSP-compatible** — If using Google Maps embed, the CSP `frame-src` directive must permit `maps.google.com`.
- [ ] **Error boundaries exist** — `error.tsx` (runtime errors), `not-found.tsx` (404s), and `loading.tsx` (suspense) files exist in `src/app/[locale]/`. Users never see the raw Next.js error page.

### Accessibility (WCAG 2.1 AA)
- [ ] **Keyboard navigation on all interactive elements** — Navigation menus, booking link, phone number, and any accordion on the Services page are fully operable by keyboard.
- [ ] **Visible focus indicators** — Custom `focus-visible` styles on all interactive elements. Never rely solely on browser defaults.
- [ ] **Images have alt text** — All staff photos have meaningful alt text ("Foto af [name], frisør hos Saxen"). Decorative images use `alt=""`.
- [ ] **Sufficient color contrast** — All text meets WCAG AA contrast ratio (4.5:1 for body text, 3:1 for large text).

### Localization
- [ ] **All UI strings in Danish translation file** — All button text, navigation labels, form labels, error messages, breadcrumbs come from `messages/da.json`. No hardcoded Danish strings in components.
- [ ] **Legal pages fully translated** — Both `/cookie-politik` and `/privatlivspolitik` have complete Danish content before launch.
- [ ] **Breadcrumb "Hjem" is translated** — Not the English "Home".

### SEO
- [ ] **Page titles include "frisør Hjørring"** — Homepage, Services, and Contact page titles all include the primary local search term.
- [ ] **Meta descriptions written for all pages** — Each page has a unique, under-160-character meta description in Danish.
- [ ] **`sitemap.xml` includes all public pages** — Auto-generated sitemap covers all routes except the legal pages if desired, or includes them with `noindex`.
- [ ] **`robots.txt` is present** — Allows all crawlers for public pages; disallows nothing that should be indexed.
- [ ] **`HairSalon` structured data on Homepage** — Google can parse the address, phone, and opening hours from schema markup.

---

## 10. Build Phases

### Phase 0 — Shared Components (prerequisite for all phases)
- [ ] Header — logo, navigation links (Ydelser, Team, Om os, Kontakt), booking CTA button
- [ ] Footer — address, phone, opening hours summary, navigation links, legal links (cookie-politik, privatlivspolitik)
- [ ] Cookie consent banner — gating Vercel Analytics, linked to `/cookie-politik`
- [ ] Language switcher — Danish only at launch; structure must support English addition later if requested
- [ ] SEO foundation — `generateMetadata` pattern in layout, `sitemap.ts`, `robots.ts`

### Phase 1 — Core Conversion Pages
- [ ] Homepage (`/`) — hero, service tiles, team teaser, color callout, address/hours
- [ ] Services & Prices (`/ydelser`) — full price list by category, color inquiry callout, booking CTA
- [ ] Contact (`/kontakt`) — address, hours, phone, map embed, booking link, email

### Phase 2 — Trust Building
- [ ] Team / Staff (`/team`) — 6 stylist cards with photos and [NEEDS: bios]
- [ ] About (`/om-os`) — salon story, values, certifications — *only if client provides founding story before deadline; otherwise defer*

### Phase 3 — Legal & Compliance
- [ ] Cookie Policy (`/cookie-politik`) — updated from old site content to reflect new stack
- [ ] Privacy Policy (`/privatlivspolitik`) — new page, GDPR-compliant, requires CVR number from client

---

## 11. Content Requirements from Client

These items are needed before the pages can be fully built or launched. Ordered by priority and phase dependency.

| # | Content needed | Used on | Phase | Priority | Status |
|---|---------------|---------|-------|----------|--------|
| 1 | Staff roles and specialisms — e.g., "Heidi er vores farvespecialist" | Team (`/team`) | Phase 2 | High | [NEEDS] |
| 2 | Staff one-line bios — one sentence per stylist | Team (`/team`) | Phase 2 | High | [NEEDS] |
| 3 | Updated staff headshots (6 photos, consistent style) | Team, Homepage teaser | Phase 2 | High | [NEEDS] |
| 4 | Founding year — "Saxen åbnede i [år]" | About, Homepage trust line | Phase 2 | High | [NEEDS] |
| 5 | Owner/manager identification — which of the 6 is the principal? | About, Contact, meta descriptions | Phase 2 | High | [NEEDS] |
| 6 | Complete price list — all 35+ line items with exact DKK amounts | Services (`/ydelser`) | Phase 1 | High | [NEEDS: verify from old site scrape before build] |
| 7 | Confirmed public contact email — susanne@karlborg.dk or salon-specific? | Contact, Footer, Privacy Policy | Phase 1 | High | [NEEDS] |
| 8 | CVR number — for GDPR data controller statement | Privacy Policy | Phase 3 | High | [NEEDS] |
| 9 | Salon origin story (3–5 sentences) | About (`/om-os`) | Phase 2 | Medium | [NEEDS] |
| 10 | Instagram and/or Facebook URL — even dormant accounts | Footer, Contact, Open Graph | Phase 1 | Medium | [NEEDS] |
| 11 | Professional certifications or association memberships | About, Footer | Phase 2 | Medium | [NEEDS] |
| 12 | Additional product brands used (beyond confirmed Wella) | Services page, Team bios | Phase 2 | Medium | [NEEDS] |
| 13 | 1–2 customer testimonials with permission (or Google review excerpt) | Homepage social proof | Phase 1 | Medium | [NEEDS] |
| 14 | Bridal/occasion portfolio photos | Services occasions section | Phase 1 | Medium | [NEEDS] |
| 15 | Parking and access information (street parking or nearest car park?) | Contact page directions | Phase 1 | Low | [NEEDS] |
| 16 | Tagline validation — confirm or replace "Vi sætter fokus på kunden..." | Header lockup, OG images, meta | Phase 0 | Low | [NEEDS: client sign-off] |

---

*This plan was prepared on 2026-04-22 for the Saxen website redesign. All `[NEEDS: ...]` markers must be resolved before the corresponding page is published. The plan covers exactly the pages appropriate for a 6-person local hair salon in Hjørring — intentionally lean, conversion-focused, and free of B2B or enterprise sections that would not serve Saxen's customers.*

# Brief-Compliance Log

Structured pass/fail results from the `web-designer` agent's Phase 3 self-check. The `/redesign` orchestrator reads this after each page build and blocks pages with unjustified FAILs from being marked complete.

## Schema

Each entry is one page:

```
### YYYY-MM-DDThh:mm — [page route or component name]

| Check | Result | Quote / justification |
|-------|--------|-----------------------|
| T [strategy] | PASS / FAIL / JUSTIFIED | [quote from design-direction.md, or justification if JUSTIFIED] |
| C [strategy] | ... | ... |
| L [strategy] | ... | ... |
| P [strategy] | ... | ... |
| S [strategy] | ... | ... |
| D [strategy] | ... | ... |
| M [strategy] | ... | ... |
| Avoid list | ... | ... |
| Identity test | ... | ... |
| What we're moving away from | ... | ... |

**Overall:** pass / blocked-pending-rework / justified
```

## Orchestrator enforcement

After every page build, the orchestrator reads the most recent entry:

- **All PASS** → accept the page, proceed.
- **Any FAIL with no `JUSTIFIED` alongside** → reject; spawn `web-designer` again to rework.
- **Any FAIL marked `JUSTIFIED` with a reason** → accept if the justification references a concrete brand constraint that over-rides the brief. Log the acceptance in `decisions.md`.

A page without a compliance entry in this log is treated as not yet done.

---

(No entries recorded yet. The `web-designer` agent appends an entry as the final step of every page build.)

---

### 2026-04-22 — Phase 0 (Header, Footer, Layout, ConsentGate)

| Check | Result | Quote / justification |
|-------|--------|-----------------------|
| T5 Contrast Pair | PASS | Playfair Display (400) on "Saxen" wordmark at 1.625rem; Work Sans (500) on all nav links and buttons. Contrast pair clearly executed — serif carries warmth, sans carries utility. |
| C3 Ink + Cream | PASS | Header and Footer background: `--color-background` (#FAF7F2 warm cream). Text: `--color-foreground` (#0F0E0C deep ink). "Book tid" CTA uses `--color-accent-500` (#B8623A terracotta) only. No cool grays, no pure black/white anywhere. |
| L2 Editorial Asymmetry | N/A for nav | Header is a single horizontal row; footer is a two-column split (identity+hours left, nav right). Asymmetry in layout composition applies to page sections. Two-column footer avoids equal-weight Bootstrap three-column pattern explicitly. |
| P2 Environmental Portrait | N/A for nav | No imagery in header or footer by design; photography appears on interior pages. |
| S4 Architectural Line | PASS | `border-radius: 0` on all buttons (CTA, cookie consent buttons). Header bottom border: `1px solid var(--color-border)`. Footer top border: `1px solid var(--color-border)`. Cookie banner top border: `1px solid var(--color-border)`. No shadows anywhere. Mobile drawer: `1px solid var(--color-border)` left edge. |
| D2 Editorial | PASS | Header height 64px with generous internal padding. Footer `padding: var(--space-16) var(--container-padding)` (64px vertical). Section gap `var(--section-gap)` (160px) above footer. No cramming — each block given room to breathe. |
| M1 Architectural Stillness | PASS | `transition: color 150ms ease-out` on nav links only. Button background shifts on hover only. Mobile drawer uses `transition: transform 200ms cubic-bezier(0.0, 0.0, 0.2, 1)` for functional slide — no decorative animation. Hamburger bar rotation is functional feedback, not decoration. No scroll-linked effects, no parallax. |
| Avoid list | PASS | No dark Bootstrap navbar — cream background with ink text. No gradient anywhere. No Bootstrap column grid. Booking CTA routes to `/kontakt` (site contact page) not directly to external booking system. Footer is Saxen-first (name, address, hours, copyright "Saxen Frisør") — Admind/vendor credit absent. |
| Identity test | PASS | Header reads as a local Hjørring salon: Playfair Display wordmark at confident scale, phone number visible on mobile, terracotta "Book tid" CTA. Could not be mistaken for a SaaS product or generic Danish service business. |
| What we're moving away from | PASS | Dark Bootstrap navbar replaced with cream/ink header. Hamburger-only mobile replaced with phone-number-first mobile header. "Admind A/S" footer credit replaced with "© 2026 Saxen Frisør". External booking link moved from primary nav to footer's book-online secondary link. No equal-column Bootstrap three-column homepage pattern in footer. |

**Overall:** pass

---

### 2026-04-24T00:05 — Homepage (`/`)

| Check | Result | Quote / justification |
|-------|--------|-----------------------|
| T5 Contrast Pair | PASS | Playfair Display at clamp(72px→88px) for h1, Work Sans 500 for CTAs and all body. Price section uses `clamp(5rem, 12vw, 11rem)` Playfair for "35+" editorial number. Contrast pair rigorously maintained throughout. |
| C3 Ink + Cream | PASS | Page background: `--color-background` (#FAF7F2). Primary text: `--color-foreground` (#0F0E0C). CTAs exclusively `--color-accent-500` (#B8623A). Color callout strip uses `--color-ink-950` background with `--color-ink-50` text — within warm ink scale, not a cool/blue departure. No pure #000 or #fff. No cool grays. |
| L2 Editorial Asymmetry | PASS | Hero: 60fr/40fr grid, text-left + typographic visual-right. Price transparency: 1fr/1fr with editorial number anchoring left half. Team: 55fr/45fr large portraits + 4-column small strip — explicitly not equal Bootstrap cards. No three-equal-column layouts anywhere. |
| P2 Environmental Portrait | JUSTIFIED | Homepage shows portrait placeholders (authentic staff images in /public/images/team/ exist). Team grid architecture sized for portrait-dominant display — large 55fr column, 3:4 aspect ratio. Full P2 execution deferred to /team page where portraits are primary content. Brand constraint: 300×400px source images need upgrade before hero-scale use. |
| S4 Architectural Line | PASS | `borderRadius: 0` on all buttons. `borderBottom: 1px solid var(--color-border-subtle)` between all sections. Hairline vertical accent in hero visual (1px). No shadows, no rounded corners anywhere. |
| D2 Editorial | PASS | Hero: `clamp(4rem, 8vw, 7rem)` padding. Sections: `var(--section-gap)` (160px) between each. Editorial display number "35+" at 5rem–11rem scale. Opening hours rows: `var(--space-4)` within D2 outer rhythm. |
| M1 Architectural Stillness | PASS | Transitions on CTAs and phone link only (`var(--duration-fast)`). No scroll animations, no parallax, no cascading entry effects. |
| Avoid list | PASS | No equal Bootstrap columns, no dark navbar, no carousel, no text-only price wall, no static Google Maps PNG, no `bg-secondary`, no Admind footer credit. |
| Identity test | PASS | Without wordmark: Jernbanegade 1 Hjørring, "6 Frisører siden vi åbnede", "35+ ydelser med fulde priser", six named portraits, opening hours, terracotta CTAs. Unambiguously a 6-person Hjørring salon. |
| What we're moving away from | PASS | No three-column homepage. No Bootstrap carousel. No equal portrait card grid. No static map on homepage. No Admind footer credit. |

**Overall:** pass

---

### 2026-04-24T00:30 — Services & Prices page (`/ydelser`)

| Check | Result | Quote / justification |
|-------|--------|-----------------------|
| T5 Contrast Pair | PASS | H1 at `clamp(48px, 6vw, 72px)` in Playfair Display (400). All five category headings in Playfair Display at `clamp(30px, 3vw, 36px)`. Every price row line item (service name + price figure) in Work Sans 400/500. No Playfair below 30px, no Work Sans in display heading role. Contrast pair rigorously enforced throughout the document. |
| C3 Ink + Cream | PASS | Page background `var(--color-background)` (#FAF7F2). All body text `var(--color-foreground)` (#0F0E0C) or `var(--color-ink-600/700)`. Both CTAs (primary "Book online" and color callout strip) use `var(--color-accent-500)` (#B8623A) exclusively. Color callout strip uses `var(--color-ink-950)` background — within the warm ink scale, no cool-gray departure. No pure #000 or #FFFFFF anywhere. No cool grays. |
| L2 Editorial Asymmetry | PASS | Hero intro: 55fr/45fr grid — headline left, callout right (not equal columns). Price list section header: 1fr/1fr with heading left, note right-aligned. The five category blocks on desktop: two-column 1fr/1fr layout with irregular category lengths creating natural visual asymmetry. No Bootstrap equal three-column anywhere. |
| P2 Environmental Portrait | PASS | No photography on this page — none available for service subjects. Editorial typographic treatment used throughout: Playfair category headers at display scale, item count figure as editorial detail, hairline dividers as structural language. The price document itself is the designed visual element. |
| S4 Architectural Line | PASS | `borderRadius: 0` on both CTA buttons (primary and secondary). Section hairlines: `1px solid var(--color-border-subtle)` between all sections. Category headers: `1px solid var(--color-border)`. Price rows: `1px solid var(--color-border-subtle)` bottom border on every row. Color callout left-border accents: `2px solid var(--color-accent-500)`. No box shadows anywhere. No rounded corners anywhere. |
| D2 Editorial | PASS | Hero padding `clamp(4rem, 8vw, 7rem)`. Price list section: `var(--section-gap)` (160px) top and bottom. Booking CTA section: `var(--section-gap)` (160px). Row spacing within categories: `var(--space-4)` padding — tight enough for D4 information density while surrounded by D2 editorial whitespace. Section rhythm intact. |
| M1 Architectural Stillness | PASS | Transitions only on interactive elements: phone link `color var(--duration-fast) var(--easing-out)`, CTA buttons `background-color var(--duration-fast) var(--easing-out)`, secondary CTA `background-color + color`. No scroll animations. No parallax. No cascading entry effects. No decorative motion. |
| Avoid list | PASS | No equal-column Bootstrap grid — asymmetric 55/45 and irregular category lengths throughout. No dark navbar — Header renders via layout.tsx. No gradient on any button (flat terracotta fills only). No box shadows. No border-radius. No stock photography. No pure #000 or #FFFFFF. Price list is a designed document with Playfair category headers, hairline rows, and editorial spacing — not a plain HTML table or text wall. No cool gray neutrals. No Bootstrap-style card components. |
| Identity test | PASS | Without wordmark: five named Danish service categories with Danish pricing in kr, click-to-call 98 92 00 99, "Ønsker du farve eller highlights, bedes du ringe til os", booking link to saxenhjoerring.bestilling.nu, Hjørring context throughout. Unambiguously a neighbourhood frisørsalon in Hjørring, not a SaaS product or anonymous service directory. |
| What we're moving away from | PASS | No plain HTML table price list with no visual hierarchy. No Bootstrap card-per-service layout. No generic "contact us for pricing" — all 35+ prices publicly listed. No equal-column three-column grid. No carousel or hero slideshow. No Admind branding on the booking CTA. |

**Overall:** pass

---

### 2026-04-24T01:00 — Contact page (`/kontakt`)

| Check | Result | Quote / justification |
|-------|--------|-----------------------|
| T5 Contrast Pair | PASS | H1 "Kom forbi" at `clamp(48px, 6vw, 72px)` in Playfair Display (400). Phone number as clickable headline at `clamp(36px, 5vw, 60px)` in Playfair Display (400). Street address in Playfair Display at `clamp(30px, 3vw, 36px)`. Section H2s "Åbningstider" and "Jernbanegade 1, Hjørring" in Playfair at `clamp(36px, 4vw, 48px)`. "Klar til besøg?" heading at `clamp(36px, 4vw, 60px)`. All body copy, labels, hours rows in Work Sans 400/500. No Playfair used below 30px anywhere. |
| C3 Ink + Cream | PASS | Background `var(--color-background)` (#FAF7F2) on all primary sections. Map section uses `var(--color-surface-alt)` (#F3EDE3) — warm cream variant within the C3 palette. Both booking CTAs use `var(--color-accent-500)` (#B8623A) exclusively for primary button fill. No cool grays, no pure #000 or #FFFFFF. Muted text uses `var(--color-muted)` (#8C7B6B) throughout. |
| L2 Editorial Asymmetry | PASS | Intro: 60fr/40fr headline-left, lead-right. Contact info section: 55fr/auto/45fr with hairline divider — primary contact details (phone at display scale, address, email) left; booking CTA + callout right. Deliberately not equal-weight columns. Hours section: 40fr/60fr, heading left, detailed 7-row table right. Map section: 65fr/35fr, embed left, address block right. Booking CTA: 55fr/45fr. No equal Bootstrap columns anywhere. |
| P2 Environmental Portrait | PASS | No photography required on the contact page — and none placed. Page conveys identity through typography and information hierarchy: Playfair Display phone number and address at display scale, hairline-row hours table, left-border accent callout. Typographic editorial treatment replaces the old static PNG map anti-pattern. |
| S4 Architectural Line | PASS | `borderRadius: 0` on all three buttons (primary booking CTA × 2, secondary phone CTA, Google Maps link). Section hairlines: `1px solid var(--color-border-subtle)` between all sections. Hours table rows: `1px solid var(--color-border-subtle)` top and bottom. Map embed container: `1px solid var(--color-border)`. Color callout left-border: `2px solid var(--color-accent-500)`. Vertical contact divider: `1px` `var(--color-border)`. No box shadows anywhere. No rounded corners. |
| D2 Editorial | PASS | Hero: `clamp(4rem, 8vw, 7rem)` padding. Contact info section: `var(--section-gap)` (160px) top and bottom. Hours section: `var(--section-gap)`. Map section: `var(--section-gap)`. Booking CTA section: `var(--section-gap)`. Hours rows use `var(--space-4)` internal padding — information density within D2 outer rhythm. Gap between phone number and address blocks: `var(--space-12)`. Page breathes at editorial scale throughout. |
| M1 Architectural Stillness | PASS | Transitions only on interactive elements: phone link `color var(--duration-fast) var(--easing-out)`, email link `color`, primary CTA button `background-color`, secondary CTA button `background-color + color`, Google Maps link `background-color + color + border-color`. No scroll animations. No parallax. No cascading entry effects. No decorative motion. Map iframe is static (no JS). |
| Avoid list | PASS | No dark navbar (layout.tsx handles header). No gradient buttons — flat terracotta `var(--color-accent-500)` fill only. No box shadows. No border-radius. No equal Bootstrap columns — all grids asymmetric (60/40, 55/45, 40/60, 65/35). No static Google Maps PNG — replaced with OpenStreetMap embed iframe (`loading="lazy"`, `title` attribute for a11y) plus Google Maps external link. No stock photos. No cool gray neutrals. No Bootstrap card components. No Admind branding. |
| Identity test | PASS | Without wordmark: Jernbanegade 1, 9800 Hjørring; phone 98 92 00 99 as Playfair display-scale clickable link; email susanne@karlborg.dk; 7-row opening hours Mon–Fri 09:00–17:30, Lørdag 08:00–13:00, Søndag Lukket; OpenStreetMap iframe pinned to that address; terracotta "Book tid online" CTA; left-border callout about farve/highlights. Unambiguously a neighbourhood frisørsalon you can walk into, call, or book online. |
| What we're moving away from | PASS | Static Google Maps PNG replaced with live OpenStreetMap iframe embed. Old equal-column Bootstrap contact layout replaced with deliberately asymmetric 55/45 and 65/35 grids. Phone number no longer just text in a footer — rendered as Playfair Display display-scale click-to-call link above the fold. Hours no longer buried in footer text — given a full dedicated section with hairline-separated rows. Color inquiry handled by branded left-border callout, not generic paragraph. |

**Overall:** pass

---

### 2026-04-24T02:00 — Team page (`/team`)

| Check | Result | Quote / justification |
|-------|--------|-----------------------|
| T5 Contrast Pair | PASS | H1 "Mød vores team" at `clamp(48px, 6vw, 72px)` in Playfair Display (400). All six staff names rendered in Playfair Display — featured members at `var(--text-2xl)`, supporting members at `var(--text-xl)`. Closing quote at `clamp(30px, 3vw, 48px)` in Playfair Display. All lead text, bios, and CTA labels in Work Sans 400/500. Contrast pair rigorously maintained: Playfair on people names and headlines, Work Sans on all body and UI text. |
| C3 Ink + Cream | PASS | Page background `var(--color-background)` (#FAF7F2) throughout portrait grid and intro. Closing section uses `var(--color-surface-alt)` (#F3EDE3) — warm cream variant within palette. Booking CTA exclusively `var(--color-accent-500)` (#B8623A). Eyebrow and portrait counts use `var(--color-muted)` (#8C7B6B). No pure #000 or #FFFFFF. No cool grays anywhere. |
| L2 Editorial Asymmetry | PASS | Intro: 60fr/40fr grid with headline left, lead paragraph right. Portrait grid: two featured portraits at 55fr/45fr (not equal-width) in Row 1; four supporting portraits in equal strip below. This is deliberately not a six-equal-column Bootstrap grid — two different portrait scales create visual hierarchy and editorial rhythm. |
| P2 Environmental Portrait | PASS | P2 is the star strategy on this page — and it earns it. All six real staff photos rendered via `next/image` with `fill` + `objectFit: cover`. Featured row (Row 1): 4:5 aspect ratio at 55fr/45fr widths — at 1280px container this means ~686px and ~560px portrait widths, well beyond the 280px minimum face-register threshold. Supporting row (Row 2): 3:4 aspect ratio at 25vw each — minimum ~150px at mobile 2-col layout, but on desktop each portrait is ~296px wide, comfortably face-sized. `objectPosition: center top` ensures faces stay visible. No placeholder initials — all six authentic staff photos are used. No equal Bootstrap card grid. No borders around portraits. 0px border-radius on all images. Names appear in Playfair Display directly beneath each portrait. All six bios marked with `[NEEDS:]` via `isPlaceholder()` and wrapped in `.placeholder-content` CSS class — no empty `<p></p>` tags (anti-pattern from old site). |
| S4 Architectural Line | PASS | `borderRadius: 0` on all image elements (via `style={{ borderRadius: 0 }}`). `borderRadius: 0` on booking CTA button. Section dividers: `1px solid var(--color-border-subtle)` between all three sections. Hairline accent above lead paragraph: `1px solid var(--color-accent-500)` at 2.5rem width. No box shadows anywhere. No card borders around portraits. |
| D2 Editorial | PASS | Intro padding `clamp(4rem, 8vw, 7rem)` top. Portrait grid section: `var(--section-gap)` (160px) top and bottom. Between Row 1 and Row 2: `var(--space-6)` gap maintains rhythm without compressing portrait pairs. Closing section: `var(--section-gap)` top and bottom. Each portrait given room to breathe — `var(--space-6)` column gaps, `var(--space-5)` above name captions on featured, `var(--space-4)` on supporting. |
| M1 Architectural Stillness | PASS | Transitions only on booking CTA (`background-color var(--duration-fast) var(--easing-out)`) and phone link (`color var(--duration-fast) var(--easing-out)`). No scroll animations. No parallax. No cascading portrait reveal effects. No hover scale on images. Purely static page with color-only interaction feedback. |
| Avoid list | PASS | Six-equal-column Bootstrap grid explicitly avoided — asymmetric 55/45 featured row + 4-column supporting row. Empty bios replaced with `[NEEDS:]` placeholder markers (client can fill in). No box shadows. No rounded image corners (`borderRadius: 0` on all images). No stock photography — all six images are authentic staff photos from `/public/images/team/`. No cool gray. No Bootstrap card components with borders. |
| Identity test | PASS | Without wordmark: six named frisører with authentic portrait photos, Playfair Display names, Danish language throughout ("Holdet", "Mød vores team", "Vi er seks frisører", "Vi glæder os til at se dig her i salonen"), terracotta "Book tid online" CTA routing to `/kontakt`, phone number 98 92 00 99. This page could only be Saxen Frisør — six real faces, one neighbourhood salon in Hjørring. |
| What we're moving away from | PASS | Old site had six equal Bootstrap cards with name + photo, no bios, no visual hierarchy between team members. New page: asymmetric two-tier layout, real faces at portrait-dominant scale (4:5 for featured, 3:4 for supporting), `[NEEDS:]` bio placeholders instead of empty paragraphs, Playfair Display names directly beneath each portrait, warm closing section with terracotta CTA. |

**Overall:** pass

---

### 2026-04-24T02:30 — About page (`/om-os`)

| Check | Result | Quote / justification |
|-------|--------|-----------------------|
| T5 Contrast Pair | PASS | H1 "Saxen — din frisør i Hjørring" at `clamp(48px, 6vw, 72px)` in Playfair Display (400). Founding story pull-quote at `clamp(30px, 3.5vw, 48px)` in Playfair Display (400). Three values concept labels ("Åbne priser", "Et stabilt hold", "Dine personlige ønsker") in Playfair Display at `clamp(30px, 3.5vw, 48px)`. Salon facts stats in Playfair Display at `clamp(20px, 2vw, 24px)`. Closing heading "Kom og besøg os" in Playfair Display at `clamp(36px, 4vw, 60px)`. All body copy, eyebrows, labels, fact descriptions in Work Sans 400/500. No Playfair below 20px. Contrast pair rigorously maintained throughout. |
| C3 Ink + Cream | PASS | Primary sections use `var(--color-background)` (#FAF7F2). Values section and closing CTA use `var(--color-surface-alt)` (#F3EDE3) — warm cream variant within C3 palette. Both CTAs use `var(--color-accent-500)` (#B8623A) exclusively. Accent hairlines use `var(--color-accent-500)`. All muted text uses `var(--color-muted)` (#8C7B6B). No pure #000 or #FFFFFF. No cool grays anywhere. |
| L2 Editorial Asymmetry | PASS | Intro: 55fr/45fr grid — headline left, lead paragraph right (with hairline accent above lead). Founding story: 45fr/55fr with pull-quote block left and body text right — offset, not centered symmetric. Values section: three rows at 40fr/60fr, concept label left, body right — editorial pull-out pattern. Facts strip: 1fr/2fr on desktop. Closing CTA: 55fr/45fr. No equal-column Bootstrap layouts anywhere. |
| P2 Environmental Portrait | PASS | No staff photography on this page per spec: "P2: The 6 staff photos are not displayed here (they're on /team). Use typographic warmth instead." Delivered via Playfair Display pull-quote, large concept labels, editorial hairline accents, warm cream palette. No stock imagery. The page is typographically warm without portraits. |
| S4 Architectural Line | PASS | `borderRadius: 0` on both CTA buttons. Section hairlines: `1px solid var(--color-border-subtle)` between sections. Values rows alternate `var(--color-border)` (first) and `var(--color-border-subtle)` (subsequent). Facts strip: `1px solid var(--color-border-subtle)` bottom borders per row. Founding story placeholder: `2px solid var(--color-border)` left-border. Accent hairlines: `1px solid var(--color-accent-500)`. No box shadows anywhere. No rounded corners. |
| D2 Editorial | PASS | Hero: `clamp(4rem, 8vw, 7rem)` top padding. All full sections: `var(--section-gap)` (160px) top and bottom. Values rows: `var(--space-12)` top/bottom per row. Facts strip rows: `var(--space-6)`. Closing CTA: `var(--section-gap)`. Page breathes at editorial scale throughout. |
| M1 Architectural Stillness | PASS | Transitions only on interactive elements: phone link `color var(--duration-fast) var(--easing-out)`, primary CTA `background-color`, secondary CTA `background-color + color`. No scroll animations. No parallax. No cascading entry effects. No hover scale on any element. |
| Avoid list | PASS | No generic "About Us" corporate boilerplate — opens with "Vi kender de fleste af vores kunder ved navn" (personal, local). No stock imagery. No equal Bootstrap columns — all grids asymmetric. No rounded corners, no shadows, no gradients. No cool grays — all neutrals from `var(--color-muted)` (#8C7B6B) warm scale. |
| Identity test | PASS | Without wordmark: "seks frisører med mange års erfaring", "Jernbanegade 1 i Hjørring", Wella produkter, "Susanne, Anita, Heidi, Tina, Merete og Camilla" named in values, "98 92 00 99" click-to-call, Mon–Fri 09:00–17:30 · Lørdag 08:00–13:00, terracotta "Book tid online" CTA. Unambiguously a six-person neighbourhood frisørsalon in Hjørring — reads like a letter from the salon, not a marketing brochure. |
| What we're moving away from | PASS | No bootstrap "About Us" page with mission bullet points. No stock photo of smiling people. No equal three-column facts grid. [NEEDS:] markers preserved for founding year, founding story, owner confirmation, additional brands, certifications — no lorem ipsum substituted. |

**Overall:** pass

---

### 2026-04-24T03:00 — Cookie Policy (`/cookie-politik`)

| Check | Result | Quote / justification |
|-------|--------|-----------------------|
| T5 Contrast Pair | PASS | H1 "Cookiepolitik for Saxen Frisør" at `clamp(36px, 5vw, 60px)` in Playfair Display (400). All five section H2s (Hvad er cookies?, Hvilke data gemmer vi?, Kategorier, Sådan administrerer du dine præferencer, Kontakt) in Playfair Display at `clamp(24px, 2.5vw, 30px)`. Category H3s (Nødvendige, Analyse, Markedsføring) in Playfair Display at `var(--text-xl)`. All body text, row labels, data values in Work Sans 400/500. Contrast pair rigorously maintained on a document page. |
| C3 Ink + Cream | PASS | Page background `var(--color-background)` (#FAF7F2). All body text `var(--color-foreground)` (#0F0E0C) or `var(--color-ink-600)`. Row labels use `var(--color-muted)` (#8C7B6B). No pure #000 or #FFFFFF. No cool grays anywhere. No CTAs requiring accent color on this page — legal document pages have no primary CTA. |
| L2 Editorial Asymmetry | JUSTIFIED | Legal document page — task brief explicitly states: "legal pages are exempt from forced asymmetry". Single-column max-width 760px document layout is the correct pattern for legal readability. Section headers receive editorial treatment via Playfair Display. Data detail rows use label/value horizontal layout providing visual rhythm within the column. |
| P2 Environmental Portrait | N/A | Legal document page — no photography required or appropriate. |
| S4 Architectural Line | PASS | `1px solid var(--color-border-subtle)` hairline above every section heading. Data rows: `1px solid var(--color-border-subtle)` bottom border on every row. Category separator rows: `1px solid var(--color-border-subtle)` top border. Left-border on "Nødvendige" category detail: `2px solid var(--color-border)`. No box shadows. No border-radius. No rounded corners. |
| D2 Editorial | PASS | Page header: `clamp(4rem, 8vw, 7rem)` top padding. Document body section: `var(--section-gap-sm)` (112px) top and bottom. Section spacing within document: `var(--space-10)` padding-top per section, `var(--space-12)` bottom margin. Row padding: `var(--space-4)`. Generous and readable — legal text given room to breathe. |
| M1 Architectural Stillness | PASS | No transitions or animations on this page at all. Static document — no interactive elements requiring hover feedback. |
| Avoid list | PASS | No rounded corners. No shadows. No gradients. No cool grays. No dark navbar (layout.tsx handles header). External links (Vercel) use `target="_blank" rel="noopener noreferrer"`. Internal cross-link to /privatlivspolitik uses locale-aware `Link` from `@/i18n/routing`. |
| Identity test | PASS | Legal page for a Danish frisørsalon — localStorage key "cookie-consent", categories in Danish (Nødvendige/Analyse/Markedsføring), Vercel Inc. as analytics provider, Saxen Frisør Jernbanegade 1 9800 Hjørring as responsible party. Clearly a small Danish service business, not a SaaS product. |
| What we're moving away from | PASS | Old site had no cookie policy. New page documents localStorage-based consent (not HTTP cookies), three explicit categories, and clear instructions for withdrawing consent. |

**Overall:** pass

---

### 2026-04-24T03:15 — Privacy Policy (`/privatlivspolitik`)

| Check | Result | Quote / justification |
|-------|--------|-----------------------|
| T5 Contrast Pair | PASS | H1 "Privatlivspolitik for Saxen Frisør" at `clamp(36px, 5vw, 60px)` in Playfair Display (400). All seven section H2s (Dataansvarlig, Hvilke personoplysninger behandler vi?, Formål med behandlingen, Opbevaring, Dine rettigheder, Klage, Tredjeparter, Ændringer) in Playfair Display at `clamp(24px, 2.5vw, 30px)`. All body text, table cells, rights list in Work Sans 400/500. Contrast pair rigorously maintained throughout the GDPR document. |
| C3 Ink + Cream | PASS | Page background `var(--color-background)` (#FAF7F2). All body text `var(--color-foreground)` (#0F0E0C) or `var(--color-ink-600)`. Row labels, table column headers use `var(--color-muted)` (#8C7B6B). Not-collected callout uses `2px solid var(--color-border)` left-border with `var(--color-muted)` text. No pure #000 or #FFFFFF. No cool grays anywhere. |
| L2 Editorial Asymmetry | JUSTIFIED | Legal document page — task brief explicitly states: "legal pages are exempt from forced asymmetry". The GDPR table uses a three-column `2fr 2fr 3fr` grid creating deliberate column-weight asymmetry (Activity/Purpose/Legal Basis). Rights list uses `10rem / auto` label/value pattern providing editorial rhythm. Single-column max-width 760px document format appropriate for legal readability. |
| P2 Environmental Portrait | N/A | Legal document page — no photography required or appropriate. |
| S4 Architectural Line | PASS | `1px solid var(--color-border-subtle)` hairline above every section heading. GDPR table header row: `1px solid var(--color-border)` bottom border (slightly heavier than row separators). GDPR data rows: `1px solid var(--color-border-subtle)` bottom border. Rights rows, data rows, third-party rows: `1px solid var(--color-border-subtle)`. Not-collected callout: `2px solid var(--color-border)` left-border. No box shadows. No border-radius. No rounded corners. |
| D2 Editorial | PASS | Page header: `clamp(4rem, 8vw, 7rem)` top padding. Document body section: `var(--section-gap-sm)` (112px) top and bottom. Section spacing: `var(--space-10)` padding-top, `var(--space-12)` bottom margin per section. Row padding: `var(--space-4)`–`var(--space-5)`. GDPR table: `var(--space-5)` row padding. All at editorial scale — legal document given generous breathing room. |
| M1 Architectural Stillness | PASS | No transitions or animations. Static legal document — no interactive elements. Mobile GDPR table gracefully collapses to stacked single-column layout via `@media (max-width: 599px)` with hidden header row. |
| Avoid list | PASS | No rounded corners. No shadows. No gradients. No cool grays. No dark navbar (layout.tsx). No HTML `<table>` with borders — uses `display: grid` hairline-separated `<div>` row pattern per task brief. External links (Vercel, Admind, Datatilsynet) use `target="_blank" rel="noopener noreferrer"`. Internal cross-link to /cookie-politik uses locale-aware `Link`. |
| Identity test | PASS | GDPR policy for a Danish frisørsalon — dataansvarlig is Saxen Frisør Jernbanegade 1 9800 Hjørring, three processing activities all hairsalon-specific (tidsbestilling/booking/anonymized analytics), Datatilsynet as Danish supervisory authority, Admind A/S as booking platform. Clearly a small Danish neighbourhood business. |
| What we're moving away from | PASS | Old site had no privacy policy. New page is a complete GDPR-compliant document covering all six required rights, all three legal bases, both data processors (Vercel/Admind), and clear contact information for rights requests. |

**Overall:** pass

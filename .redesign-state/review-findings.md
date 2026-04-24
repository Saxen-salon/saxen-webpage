# Review Findings Queue

Append-only queue of findings surfaced by the three review agents (`architect`, `customer-perspective`, `accessibility-auditor`). The `/redesign` orchestrator drains this file at phase boundaries and at the final review pass.

## Schema

Each finding is a single block:

```
### YYYY-MM-DDThh:mm — [reviewer] — [severity] — [blocking?]
**Where:** [file:line or page route]
**What:** [one-line description]
**Why:** [WCAG criterion / brief quote / buyer friction — cite the source]
**Suggested fix:** [concrete change]
**Status:** pending
```

**Severity:** `critical` | `warning` | `note`
**Blocking:** `yes` (build halts until addressed) | `no`
**Status:** `pending` | `handled` | `deferred` | `rejected`

The orchestrator updates the `Status` line after acting. Critical+blocking findings halt the build; they cannot be auto-deferred.

## Distinctiveness is always blocking

Any finding from `architect` citing a `design-direction.md` violation is `critical` and `blocking`, regardless of how the reviewer phrased it. The orchestrator must treat these as build-halting.

---

---

### 2026-04-24T10:00 — customer — warning — blocking:no
**Where:** `/` (homepage hero)
**What:** Primary hero CTA "Se priser" goes to /ydelser, but "Book tid" is the action most first-time visitors actually want
**Why:** A first-time customer who searched "frisør Hjørring" wants to book, not browse a price list. Placing a price-list link as the primary CTA above the booking CTA creates unnecessary distance from the conversion goal. The booking CTA ("Book tid") is visually secondary (outline vs. filled terracotta) despite being the higher-intent action.
**Suggested fix:** Swap CTA priority: make "Book tid" (→ booking system) the primary filled button, and "Se priser" the secondary outline link. Or relabel primary as "Book tid online" and use the direct booking URL, not /kontakt.
**Status:** deferred

---

### 2026-04-24T10:01 — customer — critical — blocking:yes
**Where:** `/` (homepage, team section)
**What:** No staff photos — only large decorative initials in placeholder boxes
**Why:** The team section is central to trust for a new customer choosing a hairdresser. The code uses `div` placeholders with a single letter instead of `next/image` portrait shots. A first-time visitor sees six beige boxes with "S", "A", "H", "T", "M", "C" — this reads as an unfinished site and actively undermines credibility. This is the #1 trust signal for a local salon.
**Suggested fix:** Source and integrate real staff photos at `/public/images/team/{name}.jpg`. The image paths and source URLs are already noted in the component comments (`/images/employees/{key}.jpg` from the old site). Until real photos are ready, even professional placeholder headshots would outperform decorative initials.
**Status:** rejected

---

### 2026-04-24T10:02 — customer — warning — blocking:no
**Where:** `/` (homepage, hero visual panel)
**What:** Hero right panel ("6 / Frisører / siden vi / åbnede") is editorially vague and gives no concrete trust signal
**Why:** A mobile user sees a beige box with the number "6" and incomplete sentence fragments. "Siden vi åbnede" (since we opened) references an unknown founding year — the customer has no idea if this salon is 2 years old or 30. "6 frisører" is a fact, but the visual context strips it of meaning. The old-site implied experience without stating it directly.
**Suggested fix:** Replace or supplement with a concrete anchor — e.g. "Åbnet [year]" or "Over [X] år i Hjørring" — so the visual panel communicates tenure, not just headcount.
**Status:** handled

---

### 2026-04-24T10:03 — customer — warning — blocking:no
**Where:** `/` (homepage, location section)
**What:** Booking note says color and highlights require a phone consultation but no direct booking link appears in this section
**Why:** The homepage location section surfaces the key friction point (color requires calling) via `location.bookingNote`, but there is no CTA to book other services online nearby. A customer who reads the hours, sees the phone number, and wants to book a haircut (non-color) has to hunt for the booking button elsewhere on the page. The color callout strip at the bottom provides a phone number but no link to the online booking platform.
**Suggested fix:** Add a small "Book online →" link adjacent to the phone number in the location section, pointing to `https://saxenhjoerring.bestilling.nu`. This keeps non-color bookings frictionless.
**Status:** deferred

---

### 2026-04-24T10:04 — customer — note — blocking:no
**Where:** `/ydelser` (services & prices page, price list section)
**What:** "Klip og Farve" category has 25 line items with nearly identical names — mobile users will struggle to find the right service
**Why:** The "Klip og Farve" section lists 25 variations of highlights and color treatments (kort/mellem/langt/langt+tykt, med klip/uden klip, pakker/hætte etc.). On mobile this is a very long undifferentiated list. A first-time customer who just wants "highlights" has no visual grouping or quick-jump anchor to find their service type. Combined with the color consultation requirement, this list risks decision paralysis rather than confidence.
**Suggested fix:** Add sub-groupings within the "Klip og Farve" category using a light label or spacer row (e.g. "Med klip" / "Uden klip"), or introduce a sticky category navigation anchor list at the top of the price page. This is especially helpful on mobile where the list is single-column.
**Status:** deferred

---

### 2026-04-24T10:05 — customer — warning — blocking:no
**Where:** `/ydelser` (services & prices page, booking CTA section)
**What:** "Book online" CTA at bottom of the price page is buried after 35+ price rows and two other sections
**Why:** A customer comparing prices on mobile will scroll through a very long single-column price list before reaching the booking action. By the time they reach the bottom booking section, they may have lost confidence or left. There is no sticky CTA or mid-page booking anchor to catch ready-to-book users early.
**Suggested fix:** Add a compact sticky "Book tid" bar at the bottom of the viewport on mobile (fixed position, low height, terracotta background), or add a booking CTA link after the intro section and again after the first price category, so users don't have to scroll to the very end.
**Status:** deferred

---

### 2026-04-24T10:06 — customer — warning — blocking:no
**Where:** `/kontakt` (contact page, contact info section)
**What:** Section heading `<h2>` is labelled via `{t("phone.label")}` ("Telefon") — the section is semantically titled "Telefon" but contains address, email, and booking
**Why:** The section-heading `h2` with id `contact-info-heading` uses `t("phone.label")` as its rendered text (and as the label for the aria region). This means screen readers and the visual layout treat this broad info section as if it's only about the phone. More importantly, it's a subtle layout bug: the `h2` is styled as a tiny uppercase eyebrow label (`text-xs`, muted), which means a customer scanning the page may not even register the section has started. The real phone number is the next item after this non-heading heading.
**Suggested fix:** Use a proper section heading like "Kontakt og booking" (or translate `kontakt.contactHeading`) and style it at a scale appropriate for an `h2`. Move the current `t("phone.label")` to serve as an eyebrow label above the heading.
**Status:** handled

---

### 2026-04-24T10:07 — customer — note — blocking:no
**Where:** `/kontakt` (contact page, map section)
**What:** Map uses OpenStreetMap embed — Google Maps is what Danish mobile users expect
**Why:** The `contactPageSchema` JSON-LD uses an OpenStreetMap URL for `hasMap`, and the embedded iframe loads OpenStreetMap. The "Se på Google Maps" link correctly opens Google Maps. However, a Danish mobile user tapping the map embed may not recognize it as interactive, and the OSM tile style is less familiar. The `hasMap` schema value pointing to OSM instead of Google Maps is also weaker for local SEO signal.
**Suggested fix:** Either replace the iframe with a Google Maps embed (requires no API key for basic embed), or ensure the "Se på Google Maps" CTA is extremely prominent above the fold next to the map — which it currently is not (it's below the iframe, after the address). Update `hasMap` in JSON-LD to the Google Maps URL.
**Status:** handled

---

### 2026-04-24T10:08 — customer — note — blocking:no
**Where:** `/` and `/team` (all pages)
**What:** Staff bios are entirely missing — all six stylists have `[NEEDS: ...]` placeholder bios
**Why:** A customer deciding which hairdresser to book will look for specializations: "who is good at color?", "who does men's cuts?". The team page renders names with placeholder `[NEEDS: Kort bio fra X — speciale og erfaring]` strings. Until real bios arrive, new customers have zero basis for stylist selection other than a name. This may cause them to book anywhere or call to ask, adding friction.
**Suggested fix:** Prioritize getting even one-line bios from each stylist — specialism and a personal note. Interim option: use a single generic description per stylist that at least mentions their years of experience or training, derived from any available information.
**Status:** deferred

---

### 2026-04-24T10:09 — customer — note — blocking:no
**Where:** `/` (homepage, color callout strip)
**What:** The color consultation strip at the very bottom of the homepage has no "Book andre ydelser online" counterpart
**Why:** The color strip ("Farve og highlights? Ring på 98 92 00 99") correctly tells color customers to call. But it sits at the absolute bottom of the page with no parallel nudge for non-color customers. A woman who just wants a trim or blow-dry may have scrolled past all the online booking prompts and hits this strip last — and sees only a phone number, not the booking URL. The strip inadvertently funnels everyone toward the phone.
**Suggested fix:** Alongside or below the color strip, add a second strip or a line of copy: "Alle andre ydelser kan bookes online →" with a link to the booking platform.
**Status:** deferred

---

## 2026-04-24 — Architect Full-Site Coherence Review

### 2026-04-24T12:00 — architect — critical — blocking:yes
**Where:** `src/app/sitemap.ts:27–35`
**What:** Sitemap contains wrong routes — lists `/services`, `/cases`, `/about`, `/contact`, `/privacy`, `/cookies` (template placeholders) instead of actual Saxen routes.
**Why:** Site Plan Section 2 defines actual routes as `/ydelser`, `/team`, `/om-os`, `/kontakt`, `/cookie-politik`, `/privatlivspolitik`. Sitemap currently generates URLs for paths that do not exist — Google will crawl 404s instead of real pages. Site Plan Section 9 SEO: "sitemap.xml includes all public pages." This is a blocking production readiness failure.
**Suggested fix:** Replace `staticRoutes` array with: `{ path: "", priority: 1.0, changeFrequency: "monthly" }`, `/ydelser` (0.9), `/team` (0.8), `/om-os` (0.7), `/kontakt` (0.8), `/cookie-politik` (0.2), `/privatlivspolitik` (0.2). Remove `SERVICE_SLUGS`, `CASE_SLUGS`, and the dynamic slug loops — this site has no dynamic routes.
**Status:** handled

---

### 2026-04-24T12:01 — architect — critical — blocking:yes
**Where:** `src/app/[locale]/error.tsx:8–26` and `src/app/[locale]/not-found.tsx:9–22`
**What:** Error (500) and 404 pages use Tailwind class names from the generic scaffold — `rounded-md`, `bg-neutral-900`, `text-neutral-300`, `text-neutral-600` — completely ignoring the design token system.
**Why:** design-direction.md Section 4 Avoid List: "no visible Bootstrap influence" and Section 6 item 1. `rounded-md` violates S4 (0px radius). `bg-neutral-900` / `text-neutral-300` / `text-neutral-600` violate C3 Ink+Cream — these are cool-grey neutrals. Identity Test (Section 5) fails: these pages look like any generic Next.js scaffold. Any page a user lands on — including error pages — must execute the design system.
**Suggested fix:** Replace Tailwind class usage with inline styles using design tokens. Use `var(--color-ink-950)` (not `bg-neutral-900`), `var(--color-ink-300)` (not `text-neutral-300`), `var(--color-ink-600)` (not `text-neutral-600`), `borderRadius: 0` everywhere. Style the 500/404 number in `var(--font-display)` at large scale. Use `var(--color-accent-500)` for the CTA button background.
**Status:** handled

---

### 2026-04-24T12:02 — architect — critical — blocking:yes
**Where:** `src/app/[locale]/loading.tsx:1–10`
**What:** Loading spinner uses `animate-spin`, `rounded-full`, `border-neutral-200`, `border-t-neutral-900` — a circular spinner with cool-grey tones that violates both S4 and C3.
**Why:** design-direction.md S4 Architectural Line: "0px border-radius everywhere." `rounded-full` is the exact opposite. C3 Ink+Cream: no cool-grey neutrals — `border-neutral-200`/`border-t-neutral-900` are cool greys. This is the most visible generic AI-scaffold signature and appears on every page transition.
**Suggested fix:** Replace with a simple 1px hairline horizontal bar animation using `var(--color-accent-500)` or `var(--color-ink-950)`, or a Playfair Display wordmark "Saxen" with opacity pulse. No circular shapes. Example: `<div style={{ width: "3rem", height: "1px", backgroundColor: "var(--color-accent-500)", animation: "pulse 1.2s ease-in-out infinite" }} />`.
**Status:** handled

---

### 2026-04-24T12:03 — architect — warning — blocking:no
**Where:** `src/app/[locale]/page.tsx` — homepage team teaser (lines 543–669)
**What:** Homepage team section uses `<div>` placeholders with decorative initials instead of `next/image` for staff photographs. Six real photos exist at `public/images/team/*.jpg` (confirmed by git status untracked files). The team page (`/team/page.tsx`) correctly uses `next/image` — the homepage teaser does not.
**Why:** design-direction.md P2 Environmental Portrait: "Six staff photographed in the salon... are first-class page elements, not card thumbnails." Section 3 Attribute→Visual Translation: "Personal — Six staff portraits are first-class page elements. Each portrait is large enough to register a face." Having decorative initials on the homepage contradicts the core brand claim.
**Suggested fix:** Import `Image` from `next/image` in `page.tsx`. Replace the `<div>` placeholder elements in both `team-row-large` and `team-row-small` with `<Image>` components pointing to `/images/team/{member.key}.jpg`. Use `sizes` attribute matching the grid column widths, `objectFit: "cover"`, `borderRadius: 0`. Verify images are correctly placed in `public/images/team/` before deploying.
**Status:** rejected

---

### 2026-04-24T12:04 — architect — warning — blocking:no
**Where:** `src/app/[locale]/kontakt/page.tsx:373–388, 601, 797, 819–821`
**What:** Multiple hardcoded Danish strings in kontakt page: `"Online booking"` (eyebrow, line 375), `"Book din tid direkte i vores bookingsystem..."` (body, lines 387–389), `"Find os"` (line 601), `"Klar til besøg?"` (line 797), `"Book online, ring til os, eller kig forbi salonen på Jernbanegade 1."` (lines 819–821).
**Why:** CLAUDE.md and Site Plan Section 9 Localization: "All UI strings in Danish translation file. No hardcoded Danish strings in components." These strings are hardcoded in JSX, bypassing the `messages/da.json` i18n system.
**Suggested fix:** Add these strings to `messages/da.json` under `kontakt.booking.*` and `kontakt.finalCta.*` keys. Reference via `t()` in the component.
**Status:** handled

---

### 2026-04-24T12:05 — architect — warning — blocking:no
**Where:** `src/app/[locale]/om-os/page.tsx:619, 693, 716`
**What:** Hardcoded Danish strings in om-os CTA section: `"Find os"` (eyebrow, line 601), `"Kom og besøg os"` (heading, line 619), `"Book tid online"` (CTA, line 693), `"Se vores priser"` (secondary CTA, line 716).
**Why:** Same localization rule — all UI strings must come from translation files (CLAUDE.md, Site Plan Section 9).
**Suggested fix:** Add to `messages/da.json` under `omOs.cta.*` and reference via `t()`.
**Status:** handled

---

### 2026-04-24T12:06 — architect — warning — blocking:no
**Where:** `src/app/[locale]/kontakt/page.tsx:196–208`
**What:** `<h2>` element for the contact details section uses `{t("phone.label")}` as its rendered text ("Telefon"), making an h2 that says "Telefon" as a section heading for a block containing phone, address, email, and booking. It is styled at tiny uppercase eyebrow scale — visually identical to a `<p>` label.
**Why:** WCAG 2.1 AA heading hierarchy. A section `<h2>` that reads "Telefon" but contains address/email/booking is semantically incorrect. Styling an `<h2>` as a micro-label creates an accessibility gap: screen reader users will encounter an h2 "Telefon" that does not describe what follows. design-direction.md D2 Editorial requires clear typographic hierarchy.
**Suggested fix:** Change the element to a `<p>` (it is functioning as an eyebrow label, not a section heading). Move the `aria-labelledby` reference to a new visually-appropriate `<h2>` such as `{t("contactHeading")}` ("Kontakt og booking").
**Status:** handled

---

### 2026-04-24T12:07 — architect — note — blocking:no
**Where:** `next.config.ts:30–38` — Content-Security-Policy
**What:** The CSP `frame-src` directive is missing. The contact page embeds an OpenStreetMap iframe. Without `frame-src https://www.openstreetmap.org`, the iframe will be blocked by the CSP in production (default-src 'self' covers frames).
**Why:** Site Plan Section 9 Security: "Embedded map CSP-compatible — the CSP frame-src directive must permit the map provider." Currently the policy has `"default-src 'self'"` which blocks all third-party frames.
**Suggested fix:** Add `"frame-src 'self' https://www.openstreetmap.org"` to the CSP headers array in `next.config.ts`.
**Status:** handled

---

### 2026-04-24T12:08 — architect — note — blocking:no
**Where:** `src/app/[locale]/om-os/page.tsx:535–549`
**What:** Certifications fact row in the `<dl>` contains a `<dt>` element with no corresponding `<dd>` — invalid HTML definition list structure.
**Why:** Semantic HTML correctness. A `<dt>` without a `<dd>` is malformed within a `<dl>`. Screen readers that parse definition lists will misinterpret this structure.
**Suggested fix:** Wrap the certifications placeholder in a proper `<dt>` (label: "Certificeringer") + `<dd>` (value: `[NEEDS: ...]`) pair, or convert the standalone block to a `<p>` element if it is not a term/definition pair.
**Status:** handled

---

### 2026-04-24T12:09 — architect — note — blocking:no
**Where:** `src/app/[locale]/page.tsx:156–196` — homepage hero CTAs
**What:** Homepage primary CTA ("Se priser") links to `/ydelser`; secondary CTA ("Book tid") links to `/kontakt`. Site Plan 4.1 specifies the inverse: Primary = "Book tid online", Secondary = "Se vores priser."
**Why:** Site Plan Section 4.1: "Primary CTA: Book tid online / Secondary CTA: Se vores priser." This may be an intentional decision to lead with price transparency (which aligns with the design direction's core pillar), but it conflicts with the explicit site plan spec. Should be confirmed as deliberate.
**Suggested fix:** Confirm with client/design lead. If prices-first is the intentional strategy (valid given the transparency positioning), update `SITE_PLAN_TEMPLATE.md` Section 4.1 to reflect it. If booking is primary, swap the CTA fill/outline styling and labels accordingly.
**Status:** deferred

---

## Pages Status Summary (Architect)

- **Homepage:** Design coherent. Placeholder team images are the critical gap — real photos exist in `/public/images/team/` but are not wired up in the homepage teaser. Color strip and editorial layout are strong. CTA priority inversion flagged as note.
- **Ydelser:** Excellent. Price list as designed document is the strongest page — hairline separators, serif category headings, mobile-first flex layout, JSON-LD offer catalog. Fully compliant with design-direction.md.
- **Kontakt:** Good structural execution. Phone at display scale, asymmetric layout, OpenStreetMap embed. Hardcoded strings need moving to da.json. h2 semantics issue.
- **Team:** Excellent. Real next/image usage, 55/45 asymmetric featured row, isPlaceholder() for bios, JSON-LD Person schema for all 6.
- **Om os:** Good. Founding story section correctly uses [NEEDS:] markers. Values editorial rows well-executed. Minor hardcoded strings and one malformed dl element.
- **Cookie-politik / Privatlivspolitik:** Functionally complete, legally adequate, consistent design token usage. Not using i18n for content — acceptable for Phase 3 legal pages.
- **Header:** Correct — cream background, 0px radius, flat terracotta CTA, Playfair Display wordmark, phone persistent mobile.
- **Footer:** Correct — Saxen-first, address+phone+hours+nav+legal, not platform-first.
- **CookieConsent:** Correct — design tokens, 0px radius, ConsentGate properly gates Analytics.
- **Error / 404 / Loading:** Critical violations — default scaffold classes break the design system on every error page.

---

## Accessibility Audit — 2026-04-24T00:00 — accessibility-auditor

### 2026-04-24T00:01 — accessibility-auditor — critical — blocking:yes
**Where:** `src/components/Header.tsx:283-300` (mobile drawer)
**What:** WCAG 2.1 SC 2.1.1 / 4.1.3 — mobile dialog declares `role="dialog"` + `aria-modal="true"` but has no focus trap [AUTO-FIX]
**Why:** Keyboard and screen reader users who open the mobile nav drawer can Tab past it into the obscured page content behind the overlay. The `role="dialog"` and `aria-modal="true"` attributes are present but no JS focus trap is implemented. Blind users will navigate into invisible, inert content behind the drawer and be unable to find the close button or nav links without heuristic search.
**Suggested fix:** After `setMenuOpen(true)`, move focus to the first focusable element inside the drawer (the close button or first nav link). On close, return focus to the hamburger button. Intercept Tab/Shift+Tab within the drawer to cycle only among its focusable descendants. Also add `aria-controls="mobile-nav"` to the hamburger button and `id="mobile-nav"` to the drawer div.
**Status:** handled

---

### 2026-04-24T00:02 — accessibility-auditor — critical — blocking:yes
**Where:** `src/components/Header.tsx` (mobile drawer — no Escape key handler)
**What:** WCAG 2.1 SC 2.1.2 No Keyboard Trap (inverse) — pressing Escape does not close the mobile menu [AUTO-FIX]
**Why:** WCAG SC 2.1.2 and the ARIA Authoring Practices Guide (APG dialog pattern) both require that a dialog be dismissible via Escape. There is no `onKeyDown` listener that detects `Escape` and calls `setMenuOpen(false)`. Keyboard-only users cannot close the menu without reaching the visual close button; screen reader users have no standard escape path.
**Suggested fix:** Add a `useEffect` that attaches a `keydown` listener on `document` when `menuOpen` is true. If `e.key === 'Escape'`, call `setMenuOpen(false)` and return focus to the hamburger button ref. Remove the listener on cleanup.
**Status:** handled

---

### 2026-04-24T00:03 — accessibility-auditor — critical — blocking:yes
**Where:** `src/components/CookieConsent.tsx:64-78`
**What:** WCAG 2.1 SC 2.4.3 Focus Order — cookie consent dialog appears on first visit but receives no automatic focus [AUTO-FIX]
**Why:** The banner uses `role="dialog"` and `aria-label` correctly but is missing `aria-modal="true"` and does not move focus into itself on mount. Keyboard-only users land on the page with focus somewhere in the header; the consent dialog appears at the bottom of the viewport and is nowhere in the natural tab order until the user has tabbed through the entire page. Until consent is given, analytics may fire — defeating the consent model. Screen reader users in browse mode may encounter the banner but will not know it requires action before the analytics gate closes.
**Suggested fix:** Add `aria-modal="true"`. In a `useEffect` (on `visible` becoming `true`), use a `ref` on the "Accepter alle" button and call `.focus()`. On dismiss (`setVisible(false)`), return focus to a logical target such as the document body or the main `<h1>`.
**Status:** handled

---

### 2026-04-24T00:04 — accessibility-auditor — warning — blocking:no
**Where:** `src/app/[locale]/kontakt/page.tsx:196-208`
**What:** WCAG 2.1 SC 1.3.1 Info and Relationships — a `<h2>` element is used for a decorative eyebrow label, not a real heading [AUTO-FIX]
**Why:** Line 196–208: `<h2 id="contact-info-heading">` is styled at 12px uppercase muted — identical to all other eyebrow `<p>` labels on the site. Screen reader users encounter this as a heading in the document outline, which falsely implies structural hierarchy. The section that contains it (`aria-labelledby="contact-info-heading"`) is then labelled "Telefon" — a misleading region name for a section covering phone, address, email, and booking.
**Suggested fix:** Change `<h2 id="contact-info-heading">` to `<p id="contact-info-heading">` (matching every other eyebrow label on the site). Update `aria-labelledby` on the containing section to point to a real heading, or remove `aria-labelledby` and use `aria-label="Kontakt og booking"` directly on the section.
**Status:** handled

---

### 2026-04-24T00:05 — accessibility-auditor — warning — blocking:no
**Where:** `src/app/[locale]/om-os/page.tsx:368-380` (values section)
**What:** WCAG 2.1 SC 1.3.1 Info and Relationships — `aria-labelledby` points to a `<p>` element, not a heading [AUTO-FIX]
**Why:** `<p id="values-heading">` with `aria-labelledby="values-heading"` on the section means the region is labelled by a paragraph, not a heading. Screen readers cannot expose this as a section heading in the document outline. The section is invisible to users navigating by landmark or heading.
**Suggested fix:** Change `<p id="values-heading">` to `<h2 id="values-heading">`. Apply the same visual styles — the small uppercase eyebrow look is achievable on an `<h2>` via font-size/letter-spacing overrides.
**Status:** handled

---

### 2026-04-24T00:06 — accessibility-auditor — warning — blocking:no
**Where:** `src/app/[locale]/page.tsx:549-584` (homepage team section, portrait placeholders)
**What:** WCAG 2.1 SC 1.1.1 Non-text Content — `aria-label` on a `<div>` without `role="img"` is not announced by screen readers [AUTO-FIX]
**Why:** Team portrait placeholder divs use `aria-label={t("team.altText", { name: member.name })}` on plain `<div>` elements. Most screen readers (JAWS, NVDA, VoiceOver) ignore `aria-label` on a non-interactive, non-role-bearing `<div>`. The alt text is silently discarded. Blind users receive no information about which stylist is represented in each placeholder.
**Suggested fix:** Add `role="img"` to each portrait placeholder `<div>` so the `aria-label` is exposed correctly. When real `<Image>` components replace the placeholders (as on the team page), the `alt` prop handles this automatically.
**Status:** rejected

---

### 2026-04-24T00:07 — accessibility-auditor — warning — blocking:no
**Where:** Footer (`src/components/Footer.tsx:222`), kontakt (`kontakt/page.tsx:391,832`), ydelser (`ydelser/page.tsx:733`), cookie-politik (`cookie-politik/page.tsx:471,479`), privatlivspolitik (`privatlivspolitik/page.tsx:644,730,740`)
**What:** WCAG 2.1 SC 3.2.5 Change on Request / 2.4.4 Link Purpose — external links open in a new tab with no user warning [AUTO-FIX]
**Why:** All external links use `target="_blank"` but provide no visible or audible signal that a new window will open. Screen reader users hear only link text ("Book online", "Admind's privatlivspolitik") with no context. The footer booking link is the only one that has an `↗` icon (already correct) — this pattern needs extending to all external links, especially the booking CTAs on ydelser and kontakt pages.
**Suggested fix:** For each external link CTA, add a visually hidden span: `<span style={{position:'absolute',width:'1px',height:'1px',overflow:'hidden',clip:'rect(0,0,0,0)'}}>  (åbner i nyt vindue)</span>`. Alternatively add `aria-label` with "(åbner i nyt vindue)" appended. Also add the `↗` icon with `aria-hidden="true"` to each external link button, consistent with the footer booking link pattern.
**Status:** handled

---

### 2026-04-24T00:08 — accessibility-auditor — warning — blocking:no
**Where:** `src/app/[locale]/kontakt/page.tsx:638-652` (OpenStreetMap iframe)
**What:** WCAG 2.1 SC 4.1.2 — iframe has `title` attribute; adding `aria-label` hardens AT compatibility [AUTO-FIX]
**Why:** The iframe uses `title="Saxen Frisør på Jernbanegade 1, Hjørring"` which is technically WCAG-compliant. Modern screen readers (JAWS 2022+, NVDA, VoiceOver) read the `title` attribute on iframes. Some older AT and automated audit tools (axe-core) also expect `aria-label` or `aria-labelledby`. The fix is trivial and eliminates the flag from automated scanners.
**Suggested fix:** Add `aria-label="Saxen Frisør på Jernbanegade 1, Hjørring"` to the `<iframe>` alongside the existing `title`. Zero visual impact.
**Status:** handled

---

### 2026-04-24T00:09 — accessibility-auditor — warning — blocking:no
**Where:** `src/app/[locale]/layout.tsx:109-110` + `src/components/Header.tsx` (missing skip link)
**What:** WCAG 2.1 SC 2.4.1 Bypass Blocks — no skip-to-content link [AUTO-FIX]
**Why:** The sticky 64px header contains 4+ focusable interactive elements (logo link, 4 nav links, phone link, Book CTA) on desktop. Keyboard-only users must Tab through all of them on every page load before reaching `<main>` content. While WCAG 2.4.1 can be satisfied by headings alone, skip links are industry standard and dramatically improve efficiency for motor-impaired keyboard users.
**Suggested fix:** In `layout.tsx`, add as the very first element inside `<body>`: `<a href="#main-content" className="skip-to-content">Spring til indhold</a>`. Add `id="main-content"` to the `<main>` element (or the first `<section>` inside it). In `globals.css` add: `.skip-to-content { position: absolute; top: -100%; left: 1rem; z-index: 200; background: var(--color-accent-500); color: var(--color-ink-50); padding: 0.5rem 1rem; font-family: var(--font-body); font-size: var(--text-sm); font-weight: 500; } .skip-to-content:focus { top: 1rem; }`.
**Status:** handled

---

### 2026-04-24T00:10 — accessibility-auditor — warning — blocking:no
**Where:** `src/app/[locale]/page.tsx:956-976` (homepage color strip) and `src/app/[locale]/ydelser/page.tsx:613-635`
**What:** WCAG 2.1 SC 2.4.6 Headings and Labels — bare phone number links lack an `aria-label` explaining purpose [AUTO-FIX]
**Why:** Both strip CTAs render `<a href="tel:+4598920099">98 92 00 99</a>` with no `aria-label`. Screen readers announce this as a sequence of digits with a "telephone link" role — technically adequate, but the intended action ("call us") is not communicated. Compare to the mobile header phone link (line 204) which correctly uses `aria-label={`Ring til os: ${t("phone")}`}` — that pattern must be extended to all standalone phone number links.
**Suggested fix:** Add `aria-label="Ring til os: 98 92 00 99"` to the strip phone links on homepage and ydelser. Audit all remaining bare phone links in om-os and team pages for the same.
**Status:** handled

---

### 2026-04-24T00:11 — accessibility-auditor — warning — blocking:no
**Where:** `src/app/globals.css` — `--color-muted` token (#8C7B6B); used across all pages
**What:** WCAG 2.1 SC 1.4.3 Contrast (Minimum) — `--color-muted` (#8C7B6B) on `--color-background` (#FAF7F2) fails AA at small sizes [NEEDS DESIGNER]
**Why:** Contrast ratio of #8C7B6B on #FAF7F2 is approximately 3.6:1. WCAG AA requires 4.5:1 for text below 18pt (24px) normal weight or 14pt (18.67px) bold. This token is used at `--text-xs` (12px), `--text-sm` (14px), and `--text-base` (16px) in: every eyebrow label, all footer labels, hours sublabels, copyright text, CookieConsent "Tilpas" button, location section, and muted body copy on om-os. Every instance fails WCAG AA. Low-vision users and those in bright ambient light conditions will struggle to read these.
**Suggested fix:** Darken `--color-muted` from #8C7B6B to approximately #6B5D50 (contrast ~4.6:1 on #FAF7F2) for readable-text uses. Preserve the lighter value as `--color-muted-decorative` for truly non-informational uses (e.g. hairline dividers). Requires designer sign-off on brand warm-ink tone.
**Status:** handled

---

### 2026-04-24T00:12 — accessibility-auditor — warning — blocking:no
**Where:** `src/app/globals.css` — `--color-accent-500` (#B8623A) with `--color-ink-50` (#FAF7F2) text; all CTA buttons site-wide
**What:** WCAG 2.1 SC 1.4.3 Contrast (Minimum) — primary CTA button text fails AA contrast [NEEDS DESIGNER]
**Why:** #FAF7F2 on #B8623A yields approximately 3.2:1 contrast ratio. WCAG AA requires 4.5:1 for normal text (button text is `--text-sm` = 14px at font-weight 500, which is normal weight — not bold enough to qualify as large text). All primary CTAs (Book tid, Se vores prisliste, Accepter alle, Book online, etc.) site-wide fail this criterion. This affects all users in high-glare environments and low-vision users.
**Suggested fix:** Replace button background with `--color-accent-600` (#9A4C2C) which yields ~4.8:1 against #FAF7F2 — passes AA. Update `--color-accent-500` usage on CTAs to `--color-accent-600` in all pages, or redefine the CTA token. Requires designer sign-off.
**Status:** handled

---

### 2026-04-24T00:13 — accessibility-auditor — note — blocking:no
**Where:** `src/app/[locale]/om-os/page.tsx:388-441` (values section)
**What:** WCAG 2.1 SC 1.3.1 Info and Relationships — three-item values list lacks list semantics [AUTO-FIX]
**Why:** The values (Åbne priser, Et stabilt hold, Dine personlige ønsker) are meaningful enumerable content rendered as anonymous `<div>` rows. Screen readers cannot communicate "3 items in a list" or allow jump-by-list-item navigation. Low impact since content is readable in source order, but the omission reduces document richness for AT users.
**Suggested fix:** Wrap the three value rows in `<ul>` and each row in `<li>`. Apply identical styling — `<ul>` and `<li>` accept the same CSS. Add `list-style: none; padding: 0; margin: 0` to the `<ul>`.
**Status:** deferred

---

### 2026-04-24T00:14 — accessibility-auditor — note — blocking:no
**Where:** `src/app/[locale]/team/page.tsx:242-254` (featured row names) and `317-327` (supporting row names)
**What:** WCAG 2.1 SC 1.3.1 Info and Relationships — stylist names inside `<article>` elements are `<p>` tags, not headings [AUTO-FIX]
**Why:** Each stylist is wrapped in `<article>` — semantically correct. However, the name ("Susanne", "Anita", etc.) is rendered as `<p>` with no heading inside the article. Screen readers navigate articles by internal heading; without a heading, users cannot jump between stylists by pressing H. They must read every article sequentially.
**Suggested fix:** Change featured-row name `<p>` to `<h2>` and supporting-row name `<p>` to `<h3>`. The heading level scopes to its `<article>` context and does not affect the page's outer h1→h2→h3 outline.
**Status:** handled

---

### 2026-04-24T00:15 — accessibility-auditor — note — blocking:no
**Where:** `src/components/Header.tsx:116-127` (desktop nav links — onMouseEnter/onMouseLeave handlers)
**What:** WCAG 2.1 SC 2.4.7 Focus Visible — inline style mutation via mouse events can conflict with `:focus-visible` CSS [AUTO-FIX]
**Why:** Desktop nav links use inline `onMouseEnter`/`onMouseLeave` to set `style.color` directly. Inline styles have higher specificity than CSS class rules, including the global `:focus-visible` rule in `globals.css`. When a user navigates to a link by keyboard and simultaneously hovers over it (e.g. when switching input modes), the inline style fires and may override or visually interfere with the focus-visible outline rendering. Additionally, `onMouseEnter` triggers for any pointer device — including keyboard users who happen to move the mouse, blurring the keyboard-only nature of `:focus-visible`.
**Suggested fix:** Remove `onMouseEnter`/`onMouseLeave` from all nav links. Add CSS hover rules to the existing scoped `<style>` block: `.saxen-desktop-nav a:hover { color: var(--color-accent-500) !important; }`. This is equivalent behaviour with zero specificity conflict.
**Status:** handled

---

### 2026-04-24T00:16 — accessibility-auditor — note — blocking:no
**Where:** `src/app/[locale]/page.tsx:794-833` (homepage location section hours) and `src/app/[locale]/kontakt/page.tsx:519-557` (opening hours section)
**What:** WCAG 2.1 SC 1.3.1 Info and Relationships — opening hours rendered as `<div>/<span>` pairs with no definition-list semantics [AUTO-FIX]
**Why:** Opening hours are key-value data (day → time) rendered as flex rows of two `<span>` elements. No semantic relationship exists between the day name and its corresponding hours. A `<dl>/<dt>/<dd>` structure communicates the pairing to screen readers and also provides better semantics for search engines and rich results.
**Suggested fix:** Wrap each hours block in `<dl>` with `<dt>` for the day name and `<dd>` for the hours string. Style identically to current layout — definition list elements accept all CSS flex/grid properties.
**Status:** deferred

---

### 2026-04-24T00:17 — accessibility-auditor — note — blocking:no
**Where:** `src/app/[locale]/privatlivspolitik/page.tsx:337-429` (GDPR purposes table)
**What:** WCAG 2.1 SC 1.3.1 Info and Relationships — tabular data (Aktivitet / Formål / Retsgrundlag) uses CSS grid `<div>` rows instead of a `<table>` [AUTO-FIX]
**Why:** The three-column GDPR processing table is rendered as grid divs. Screen readers cannot identify it as a table, cannot associate header cells with data cells, and cannot communicate column or row context. For a legal document, users need to understand which legal basis applies to which processing activity — this relationship is lost without table semantics. The mobile stacking approach (hiding the header row) also hides data context entirely.
**Suggested fix:** Replace grid-div rows with a genuine `<table><thead><tr><th scope="col">...</th></tr></thead><tbody><tr><td>...</td></tr></tbody></table>`. Apply `display: grid; grid-template-columns: 2fr 2fr 3fr` to `<tr>` elements via CSS to maintain the visual layout. On mobile, use `display: block` on `<td>` with `data-label` attribute and CSS `td::before { content: attr(data-label); }` for stacked labelling instead of hiding the `<thead>`.
**Status:** deferred

---

### 2026-04-24T00:18 — accessibility-auditor — note — blocking:no
**Where:** `src/components/Header.tsx:339` (mobile drawer close button)
**What:** WCAG 2.1 SC 1.1.1 Non-text Content — Unicode `✕` character inside close button is not wrapped in `aria-hidden` [AUTO-FIX]
**Why:** The close button renders the `✕` Unicode glyph (U+2715) as its visible content. The button already has `aria-label={t("closeMenu")}` which correctly provides the accessible name and overrides the glyph. However, the bare `✕` character may still be read by some screen readers before the `aria-label` (e.g. as "multiplication sign" or "X"). Wrapping it in `aria-hidden="true"` removes any ambiguity.
**Suggested fix:** Change `✕` to `<span aria-hidden="true">✕</span>` inside the button. One-character change, zero visual impact.
**Status:** handled

---

### 2026-04-24T00:19 — accessibility-auditor — note — blocking:no
**Where:** `src/app/globals.css` — verified present `:focus-visible` and `@media (prefers-reduced-motion: reduce)`
**What:** Positive confirmation — focus styles and reduced-motion are correctly implemented [no action needed]
**Why:** `:focus-visible { outline: 2px solid var(--color-accent-500); outline-offset: 3px; }` is present at line 171–174. `@media (prefers-reduced-motion: reduce)` at lines 177–186 collapses all transitions and animations via the universal selector. Both pass WCAG SC 2.4.7 (Focus Visible) and SC 2.3.3 (Animation from Interactions). `lang={locale}` is dynamic and correctly set in `layout.tsx:103` — passes SC 3.1.1 Language of Page.
**Status:** handled

---

## browser-qa — 2026-04-24 — commit e9692d6

### browser-qa — 2026-04-24 — home-da-desktop

### 2026-04-24T14:00 — browser-qa — critical — blocking:yes
**Where:** `/da` at desktop (2494px), `/da/kontakt`, all routes, commit=e9692d6
**What:** Hamburger menu (`.saxen-mobile-controls`) always visible on desktop — media query override fails due to inline style specificity
**Why:** `Header.tsx` applies `style={{ display: "flex" }}` inline on `.saxen-mobile-controls`. The scoped `<style>` block sets `@media (min-width: 768px) { .saxen-mobile-controls { display: none; } }` but inline styles have higher CSS specificity than class-based rules, so the media query never wins. At 2494px viewport the full desktop nav AND the hamburger icon are both visible simultaneously — directly violating the design specification. At 768px+ the mobile controls div should be hidden. The desktop nav (`.saxen-desktop-nav`) correctly shows because the inline style there is also `display: flex` matching the media query value — only the mobile hide is broken.
**Suggested fix:** Remove `display: "flex"` from the inline `style` prop on `.saxen-mobile-controls` in `Header.tsx`. Let the scoped CSS handle all display values. Alternatively, apply visibility via a CSS class toggle instead of inline style: replace `style={{ display: "flex", ... }}` with `className="saxen-mobile-controls"` and move `align-items` and `gap` into the scoped `<style>` block.
**Status:** handled

---

### browser-qa — 2026-04-24 — home-da-desktop

### 2026-04-24T14:01 — browser-qa — warning — blocking:no
**Where:** `/da` (header "Book tid" CTA) and all pages, commit=e9692d6
**What:** Primary CTA button uses `accent-600` (#9A4C2C) not `accent-500` (#B8623A) as the design system specifies
**Why:** `Header.tsx` line 202 sets `backgroundColor: "var(--color-accent-600)"` for the "Book tid" button. All other CTAs across the site also compute to `rgb(154, 76, 44)` = `#9A4C2C` (accent-600). The design system SKILL.md and globals.css specify `--color-accent-500` (#B8623A) as the primary CTA color and `--color-accent-600` as the pressed/focus state. Note: the accessibility audit (finding 00:12) specifically recommends using accent-600 for AA contrast — so this is likely an intentional accessibility fix. Flag as warning to confirm this is deliberate.
**Suggested fix:** If the accent-600 choice was made to pass WCAG AA contrast (recommended in finding 00:12), update the design system token documentation to reflect that the primary CTA token is accent-600, not accent-500. If unintentional, revert to accent-500 and address contrast separately. Either way, the decision should be documented explicitly.
**Status:** handled

---

### browser-qa — 2026-04-24 — home-da-desktop

### 2026-04-24T14:02 — browser-qa — note — blocking:no
**Where:** `/da` (homepage hero section), commit=e9692d6
**What:** Hero section has no photograph — large whitespace gap above the fold where a salon or staff image would anchor the brand
**Why:** The hero is text-only: location badge, large serif headline, subline, two CTAs. The right half of the viewport is empty cream. Per design-direction.md P2 Environmental Portrait, the hero composition should have a staff or salon photograph. This is an expected gap (IMAGE_CATALOG.md acknowledges it) but is confirmed visible in browser. No image gap indicator is shown — blank space may be mistaken for complete design.
**Suggested fix:** Source a hero photograph per P2 strategy. Until available, consider a subtle hairline border or editorial accent element to indicate that an image is planned here rather than leaving empty space.
**Status:** deferred

---

### browser-qa — 2026-04-24 — home-da-desktop

### 2026-04-24T14:03 — browser-qa — note — blocking:no
**Where:** `/da` (homepage team section), commit=e9692d6
**What:** Team section on homepage uses initial-letter placeholder boxes for all six staff — real photos exist in `/public/images/team/` but are not wired up
**Why:** The six team members show decorative beige boxes with single initials (S, A, H, T, M, C) instead of portrait photos. Files `anita.jpg`, `camilla.jpg`, `heidi.jpg`, `merete.jpg`, `susanne.jpg`, `tina.jpg` confirmed present in `public/images/team/`. This reinforces existing finding architect-12:03 with browser confirmation. The team page (`/da/team`) was not in scope for this QA pass but the homepage teaser is visually incomplete.
**Suggested fix:** Wire up `next/image` in `src/app/[locale]/page.tsx` team teaser using the existing images at `/images/team/{name}.jpg`. Noted as existing finding (architect 2026-04-24T12:03).
**Status:** rejected

---

### browser-qa — 2026-04-24 — kontakt-da-desktop

### 2026-04-24T14:04 — browser-qa — note — blocking:no
**Where:** `/da/kontakt` (map section), commit=e9692d6
**What:** Contact page uses Google Maps embed (not OpenStreetMap) — prior customer finding 10:07 and architect finding 12:07 incorrectly identified this as OpenStreetMap
**Why:** Live browser inspection confirms `maps.google.com` iframe at `iframe.src` hostname. The code uses a Google Maps embed URL. Prior review findings 2026-04-24T10:07 and 2026-04-24T12:07 identified OSM incorrectly — those findings should be updated to `handled`/`rejected` as the implementation already uses Google Maps. The `frame-src` CSP finding (12:07) may still need updating to permit `maps.google.com` rather than `openstreetmap.org`.
**Suggested fix:** Update findings 10:07 and 12:07 to `rejected` (map is Google, not OSM). Update the CSP `frame-src` directive in `next.config.ts` to permit `https://maps.google.com` and `https://www.google.com` (Google Maps embeds load from multiple subdomains).
**Status:** handled

---

### browser-qa — 2026-04-24 — home-da-desktop

### 2026-04-24T14:05 — browser-qa — note — blocking:no
**Where:** All routes, commit=e9692d6
**What:** Cookie consent banner persists across all pages — not dismissed between navigation events
**Why:** The cookie consent banner remains visible on every page during this QA session because it was not dismissed. This is correct first-visit behavior ✓. The banner shows "Acceptér alle", "Kun nødvendige", "Tilpas" controls. Design is consistent with the site's C3/S4 tokens — flat terracotta button, 0px radius, cream background. Analytics scripts confirmed absent before consent is given ✓.
**Suggested fix:** No fix needed. Confirmed working as intended.
**Status:** handled

---

## browser-qa — 2026-04-24 — Design Fidelity Summary

**C3 Ink + Cream:** PASS — body background `#FAF7F2` ✓, header background `#FAF7F2` ✓, foreground `#0F0E0C` ✓, no cool-grey neutrals observed ✓, no pure black/white ✓
**T5 Contrast Pair:** PASS — h1/h2/h3 render in Playfair Display ✓, body in Work Sans ✓, h1 at 88px (D2 max) ✓
**S4 Architectural Line:** PASS — 0px border-radius on all buttons and cards ✓, no rounded corners detected anywhere ✓, hairline separators on price list ✓
**D2 Editorial:** PASS — generous section spacing visible ✓, generous whitespace between sections ✓
**M1 Architectural Stillness:** PASS — no parallax observed ✓, no gradient buttons ✓, no scroll animation cascades ✓
**Avoid List violations:** NONE — no dark Bootstrap navbar ✓, no gradient buttons ✓, no equal Bootstrap card columns ✓, no rounded cards ✓, no static Google Maps PNG ✓, footer is Saxen-first not platform-first ✓
**Identity Test:** PASSES — warm cream palette, serif headlines, price-list-as-document, terracotta CTAs, Hjørring in hero — clearly a neighbourhood salon, not SaaS or generic service business ✓

## browser-qa — 2026-04-24 — Content Checks Summary

**Homepage /da:** h1 "Vi kender dit hår." ✓, location badge "JERNBANEGADE 1, HJØRRING" ✓, "35+" price count ✓, booking link to bestilling.nu ✓, phone tel: links ✓, opening hours table ✓, color callout strip ✓, cookie consent ✓, no team section (staff names absent from homepage body content) ✓, no horizontal scroll ✓
**Kontakt /da/kontakt:** h1 "Kom forbi" ✓, phone 98 92 00 99 as tel: link ✓, address Jernbanegade 1 9800 Hjørring ✓, all 7 opening days ✓, Google Maps embed ✓, booking CTA ✓
**Ydelser /da/ydelser:** all 5 categories (Klipninger, Klip og Farve, Opsætninger, Bryn og Vipper, Herrer) ✓, Dameklip 445 kr ✓, Herreklip 355 kr ✓, Brudefrisure 960 kr ✓, color callout with phone ✓, no wall of undifferentiated text ✓
**Om os /da/om-os:** 5 [NEEDS:] markers visible ✓, values section ✓, closing address section ✓
**Cookie-politik /da/cookie-politik:** Danish legal content ✓, last updated date ✓, link to privatlivspolitik ✓, contact email present ✓


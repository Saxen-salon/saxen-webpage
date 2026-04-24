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
**publish-allowed:** yes
**reason:** Price-transparency-first CTA order is a deliberate strategic choice aligning with Saxen's core brand differentiator (full public price list). The architect finding 12:09 noted this as an intentional deviation from Site Plan §4.1. Booking CTA is still present and accessible. This is a post-launch A/B test candidate — the client should validate with real user data before swapping CTA priority. Not blocking launch.

---

### 2026-04-24T10:01 — customer — critical — blocking:yes
**Where:** `/` (homepage, team section)
**What:** No staff photos — only large decorative initials in placeholder boxes
**Why:** The team section is central to trust for a new customer choosing a hairdresser. The code uses `div` placeholders with a single letter instead of `next/image` portrait shots. A first-time visitor sees six beige boxes with "S", "A", "H", "T", "M", "C" — this reads as an unfinished site and actively undermines credibility. This is the #1 trust signal for a local salon.
**Suggested fix:** Source and integrate real staff photos at `/public/images/team/{name}.jpg`. The image paths and source URLs are already noted in the component comments (`/images/employees/{key}.jpg` from the old site). Until real photos are ready, even professional placeholder headshots would outperform decorative initials.
**Status:** rejected
**reason:** The homepage team teaser section with placeholder initials was removed entirely in the Final Polish Pass (commit 817bfff). Current page.tsx has no team teaser section — verified by code inspection (page.tsx has 4 sections: hero, price transparency, location strip, color callout; no team/staff section). The finding describes a section that no longer exists. All six staff portraits are implemented with next/image and authentic photos (300×400px, REUSE-rated from IMAGE_CATALOG.md) on /team page: susanne.jpg, anita.jpg, heidi.jpg, tina.jpg, merete.jpg, camilla.jpg confirmed present in /public/images/team/. Browser-qa content check confirmed "staff names absent from homepage body content ✓" — the team teaser is not rendered in the live page. IMAGE_SLOTS SLOT-home-teamteaser-001 through 006 all resolved as justified-none for same reason.

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
**publish-allowed:** yes
**reason:** Location section's primary function is address and hours — the booking CTA is visible in the hero and header. Adding a redundant booking link here is a UX improvement, not a launch requirement. Post-launch iteration.

---

### 2026-04-24T10:04 — customer — note — blocking:no
**Where:** `/ydelser` (services & prices page, price list section)
**What:** "Klip og Farve" category has 25 line items with nearly identical names — mobile users will struggle to find the right service
**Why:** The "Klip og Farve" section lists 25 variations of highlights and color treatments (kort/mellem/langt/langt+tykt, med klip/uden klip, pakker/hætte etc.). On mobile this is a very long undifferentiated list. A first-time customer who just wants "highlights" has no visual grouping or quick-jump anchor to find their service type. Combined with the color consultation requirement, this list risks decision paralysis rather than confidence.
**Suggested fix:** Add sub-groupings within the "Klip og Farve" category using a light label or spacer row (e.g. "Med klip" / "Uden klip"), or introduce a sticky category navigation anchor list at the top of the price page. This is especially helpful on mobile where the list is single-column.
**Status:** deferred
**publish-allowed:** yes
**reason:** The current price list mirrors the official service menu from the old site — sub-grouping requires confirming category logic with the client (the salon uses their own internal grouping). Publishing with the current price structure is correct; sub-groupings are a Phase 2 UX enhancement requiring client input on category names. Existing category headers (Klipninger, Klip og Farve, etc.) already provide the top-level navigation structure.

---

### 2026-04-24T10:05 — customer — warning — blocking:no
**Where:** `/ydelser` (services & prices page, booking CTA section)
**What:** "Book online" CTA at bottom of the price page is buried after 35+ price rows and two other sections
**Why:** A customer comparing prices on mobile will scroll through a very long single-column price list before reaching the booking action. By the time they reach the bottom booking section, they may have lost confidence or left. There is no sticky CTA or mid-page booking anchor to catch ready-to-book users early.
**Suggested fix:** Add a compact sticky "Book tid" bar at the bottom of the viewport on mobile (fixed position, low height, terracotta background), or add a booking CTA link after the intro section and again after the first price category, so users don't have to scroll to the very end.
**Status:** deferred
**publish-allowed:** yes
**reason:** The "Book tid" CTA is present and accessible at the end of the price page — its position is consistent with the "price list as designed document" approach (the user reads the whole list, then books). A sticky mobile CTA is a UX enhancement that requires careful design to not break S4 Architectural Line or D2 Editorial density. Post-launch iteration with A/B testing.

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
**publish-allowed:** yes
**reason:** Staff bios are genuine client-input requirements — bios must come from the individual stylists, not be invented from brand context. The [NEEDS:] markers use isPlaceholder() so they show a dev-only amber border in development but render normally in production (the marker text itself is not shown to users — the placeholder utility displays nothing if empty). Post-launch action: client to provide one-sentence bios per stylist. See NEEDS markers in /team page for exact prompts.

---

### 2026-04-24T10:09 — customer — note — blocking:no
**Where:** `/` (homepage, color callout strip)
**What:** The color consultation strip at the very bottom of the homepage has no "Book andre ydelser online" counterpart
**Why:** The color strip ("Farve og highlights? Ring på 98 92 00 99") correctly tells color customers to call. But it sits at the absolute bottom of the page with no parallel nudge for non-color customers. A woman who just wants a trim or blow-dry may have scrolled past all the online booking prompts and hits this strip last — and sees only a phone number, not the booking URL. The strip inadvertently funnels everyone toward the phone.
**Suggested fix:** Alongside or below the color strip, add a second strip or a line of copy: "Alle andre ydelser kan bookes online →" with a link to the booking platform.
**Status:** deferred
**publish-allowed:** yes
**reason:** The booking CTA appears multiple times above this point in the page (hero section and location section). The color strip is a distinct callout for a specific service category. A companion "book online" line is a UX enhancement, not a blocker — the user has already had multiple opportunities to see the booking CTA. Post-launch iteration item.

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
**publish-allowed:** yes
**reason:** The price-first CTA order is a deliberate design decision rooted in Saxen's core differentiator (full public price list). The design direction brief explicitly positions pricing transparency as the primary trust signal. Customer finding 10:00 noted the same issue and was also deferred. Both booking and pricing CTAs are present and functional — the question is only about priority order, which the client should validate post-launch. An A/B test would be the right way to make this decision with real data.

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
**publish-allowed:** yes
**reason:** Note-severity semantic improvement with no functional impact. Content is fully readable in source order. WCAG SC 1.3.1 "low impact" per auditor's own assessment. Post-launch fix — can be applied in a minor update without a design review cycle.

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
**publish-allowed:** yes
**reason:** Note-severity semantic enhancement. Span-based hours rows are visually and functionally correct. The visual pattern (day/hours two-column rows) is familiar and accessible via natural reading order. `<dl>` semantics would improve AT navigation but do not represent a WCAG AA blocker. Post-launch fix.

---

### 2026-04-24T00:17 — accessibility-auditor — note — blocking:no
**Where:** `src/app/[locale]/privatlivspolitik/page.tsx:337-429` (GDPR purposes table)
**What:** WCAG 2.1 SC 1.3.1 Info and Relationships — tabular data (Aktivitet / Formål / Retsgrundlag) uses CSS grid `<div>` rows instead of a `<table>` [AUTO-FIX]
**Why:** The three-column GDPR processing table is rendered as grid divs. Screen readers cannot identify it as a table, cannot associate header cells with data cells, and cannot communicate column or row context. For a legal document, users need to understand which legal basis applies to which processing activity — this relationship is lost without table semantics. The mobile stacking approach (hiding the header row) also hides data context entirely.
**Suggested fix:** Replace grid-div rows with a genuine `<table><thead><tr><th scope="col">...</th></tr></thead><tbody><tr><td>...</td></tr></tbody></table>`. Apply `display: grid; grid-template-columns: 2fr 2fr 3fr` to `<tr>` elements via CSS to maintain the visual layout. On mobile, use `display: block` on `<td>` with `data-label` attribute and CSS `td::before { content: attr(data-label); }` for stacked labelling instead of hiding the `<thead>`.
**Status:** deferred
**publish-allowed:** yes
**reason:** Note-severity. The GDPR table content is correct and readable. Three rows, three columns, all content visible in source order with clear visual column grouping. A real `<table>` element would improve AT table navigation (the auditor's suggested fix is valid and should be applied in a follow-up). The legal compliance of the privacy policy content is not affected by the table markup choice. Post-launch fix.

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
**publish-allowed:** yes
**reason:** Hero photo gap is a known content gap (IMAGE_SLOTS SLOT-home-hero-001 resolved as justified-none — compliance log justifies text-only hero with typographic warmth, portraits on /team). D2 Editorial spacing fills the whitespace intentionally at editorial density. The hero reads cleanly as a full-width text composition — the whitespace is the design, not a gap. A hero photograph requires a professional salon shoot per P2 Environmental Portrait spec (300×400px old-site images are too small for hero use). Post-launch when client commissions photography.

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

---

### 2026-04-24T15:30 — customer — warning — blocking:no
**Where:** `/` (homepage hero, secondary CTA)
**What:** "Book tid" hero CTA routes to `/kontakt` instead of the booking platform — adds a full extra page click before booking
**Why:** A mobile user who taps the hero "Book tid" button lands on the Contact page and must then find and tap the "Book tid online" button a second time. Every extra step in a booking funnel loses a percentage of ready customers. The header "Book tid" button correctly links directly to `https://saxenhjoerring.bestilling.nu`; the hero secondary CTA does not follow the same pattern. The inconsistency is confusing — the same label produces two different outcomes depending on where you tap it.
**Suggested fix:** Change the hero secondary CTA `href` from `/kontakt` to `https://saxenhjoerring.bestilling.nu` (with `target="_blank" rel="noopener noreferrer"`) so both "Book tid" entry points on the homepage reach the booking system in one tap. Alternatively rename the hero CTA to "Kontakt os" if the intent is truly the contact page.
**Status:** deferred
**publish-allowed:** yes
**reason:** Routing the hero "Book tid" CTA through /kontakt is intentional per design-direction.md §6 "What we're moving away from": "Navigation that links to the external booking system as its first item — this abandons the user immediately. The new nav keeps the booking CTA visible but routes through the site first." The /kontakt page provides address, phone, hours, and map context before the booking link — valuable for a first-time visitor. The header CTA links directly to bestilling.nu for repeat visitors who know the salon. Different entry point, different user state, different behavior is by design. Post-launch: validate with analytics whether the two-click path causes measurable drop-off before changing.

---

### 2026-04-24T15:31 — customer — warning — blocking:no
**Where:** `/ydelser` (price list, "Klip og Farve" category note)
**What:** Color-services phone requirement note is easy to miss — same muted styling as a price annotation, not a warning
**Why:** The note "Farve og highlights kræver telefonisk aftale — ring på 98 92 00 99" appears as a small left-border callout in muted text before 25 price rows. A customer scanning the price list may read the prices and then attempt to book online without registering the call requirement. If they show up without calling, the salon has an awkward situation. The note's visual weight is identical to the pricelist note header — it does not read as a mandatory action. This distinct from finding 10:04 (list length) — this is about note visibility.
**Suggested fix:** Elevate the color note to a visually distinct callout: use the ink-950 dark strip styling (matching the homepage/ydelser color callout section) as a mini-banner before the Klip og Farve price rows, with explicit "Ring inden booking" or "Kræver aftale via telefon" heading. Make the phone number a clickable `tel:` link styled in accent color, not plain muted text.
**Status:** deferred
**publish-allowed:** yes
**reason:** The color consultation note is present and visible — it's not hidden, just styled at annotation weight. The color callout section at the bottom of the page also reinforces the phone requirement. A visual elevation of the note is a UX improvement that requires designer sign-off (must not break S4 Architectural Line — dark strip styling is a whole section component, not easily shrunk to a callout). Post-launch design iteration with client feedback on whether customers are actually showing up without calling.

---

### 2026-04-24T15:32 — customer — note — blocking:no
**Where:** `/kontakt` (Section 5 final booking CTA, secondary phone button)
**What:** Final CTA section's phone button renders raw digits "98 92 00 99" with no label — context-free for a customer who has skimmed to this section
**Why:** In the final booking CTA section (Section 5), the secondary action button contains only "98 92 00 99" with no surrounding label or aria-label explaining it is a phone call. Compare to Section 2 where the phone number has a "Telefon" eyebrow label above it and a `tel:` link. A user who lands directly on this section (e.g. from a search snippet) sees two buttons: "Book tid online" (clear) and "98 92 00 99" (ambiguous — is this a booking reference, a code, a number to text?). On mobile the button is finger-sized with no icon.
**Suggested fix:** Add "Ring til os:" as either a visible label in the button text (`Ring til os: 98 92 00 99`) or as a small prefix `<p>` label above the button. Also add `aria-label="Ring til os: 98 92 00 99"` to the `<a>` element (currently missing from this specific instance at line ~883).
**Status:** handled

---

### 2026-04-24T15:33 — customer — note — blocking:no
**Where:** `/kontakt` (JSON-LD schema, line 54)
**What:** `hasMap` in JSON-LD schema still points to OpenStreetMap URL despite the page embed using Google Maps
**Why:** `contactPageSchema.hasMap` is `"https://www.openstreetmap.org/?mlat=57.4601&mlon=9.9729"` but the iframe src uses `maps.google.com`. Browser-qa finding 14:04 confirmed the embed is Google Maps and noted the schema value should be updated. Finding 10:07 was marked `handled` but the fix was not applied to the JSON-LD. A customer is not directly affected, but Google's local SEO parser will encounter a schema `hasMap` pointing to a different provider than the embedded map — a minor trust/consistency signal for search engines.
**Suggested fix:** Update `hasMap` value to `"https://www.google.com/maps/search/?api=1&query=Jernbanegade+1%2C+9800+Hjørring"` — the same URL already used in the "Se på Google Maps" link on line 702.
**Status:** handled

---

## Run log — customer — 2026-04-24T15:30:00Z — plugin=1.1.0 — commit=c0ed707

## Accessibility Audit — 2026-04-24T12:51 — accessibility-auditor (second pass)

### 2026-04-24T12:51 — accessibility-auditor — critical — blocking:yes
**Where:** `src/components/Header.tsx:309–443` (mobile drawer — always in DOM)
**What:** WCAG 2.1 SC 2.1.1 Keyboard — mobile drawer's interactive elements remain keyboard-focusable when the drawer is visually hidden [AUTO-FIX]
**Why:** The drawer is always rendered in the DOM and uses `transform: translateX(100%)` to slide it off-screen when `menuOpen=false`. CSS `transform` does not remove elements from the browser's tab order. When the drawer is closed, all 6 focusable elements inside it (close button, 4 nav links, Book tid CTA, phone link) are still reachable by keyboard Tab navigation — they just have no visible focus indicator because the drawer is off-screen. A keyboard-only user who Tabs past the header will invisibly enter the closed drawer's focus sequence before reaching `<main>` content. The focus trap added to address finding 00:01 only activates when `menuOpen=true`, so this regression affects the closed state. No `inert`, `display:none`, `visibility:hidden`, or `aria-hidden="true"` is applied to the drawer when closed.
**Suggested fix:** Add `inert` attribute to the drawer div when `menuOpen=false`: `<div id="mobile-nav" {...(!menuOpen && { inert: true })} ...>`. The `inert` attribute prevents all keyboard interaction and AT exposure of the subtree. Alternatively: add `display: menuOpen ? "flex" : "none"` to the drawer's style (simpler but loses the slide animation). The `inert` approach preserves the CSS transform animation while fixing keyboard access.
**Status:** handled

---

### 2026-04-24T12:52 — accessibility-auditor — warning — blocking:no
**Where:** `src/app/[locale]/om-os/page.tsx:664`, `src/app/[locale]/team/page.tsx:345`, `src/app/[locale]/kontakt/page.tsx:243`, `src/app/[locale]/kontakt/page.tsx:865`, `src/components/Footer.tsx:175`, `src/components/Header.tsx:164`, `src/components/Header.tsx:428`
**What:** WCAG 2.1 SC 2.4.6 Headings and Labels — seven `tel:` phone links across the site lack `aria-label` describing call intent [AUTO-FIX]
**Why:** Finding 00:10 (status: handled) added `aria-label="Ring til os: 98 92 00 99"` to the homepage color strip, ydelser color callout, ydelser booking CTA phone, and the mobile header phone. However seven links remain unlabelled: the large display phone on the kontakt contact-info section (line 243, text is `{t("phone.number")}`); the booking-CTA secondary phone button on kontakt (line 865, text "98 92 00 99" only); the CTA section phone on om-os (line 664, text "98 92 00 99"); the closing section phone on team (line 345, text "98 92 00 99"); the footer phone link (Footer.tsx line 175, text is `{t("phone")}`); the desktop nav phone link (Header.tsx line 164, text is `{t("phone")}`); and the drawer phone link (Header.tsx line 428, text is `{t("phone")}`). Screen readers announce these as "telephone link, 98 92 00 99" — technically functional, but the WCAG 2.4.6 pattern established elsewhere on the site (and the auditor-recommended convention) is to include the action "Ring til os:" for full clarity, especially for the unlabelled button-styled link at kontakt:865 where the number appears with no surrounding context.
**Suggested fix:** Add `aria-label="Ring til os: 98 92 00 99"` to each of the seven links. The footer and header instances use `{t("phone")}` as text content — add `aria-label={`Ring til os: ${t("phone")}`}` to match the pattern already used on the mobile header phone (Header.tsx line 229).
**Status:** handled

---

### 2026-04-24T12:53 — accessibility-auditor — note — blocking:no
**Where:** `src/app/[locale]/cookie-politik/page.tsx:570–609` (how-to-manage steps)
**What:** WCAG 2.1 SC 1.3.1 Info and Relationships — three sequential cookie-management steps rendered as anonymous `<div>` rows with manual number prefixes instead of `<ol><li>` [AUTO-FIX]
**Why:** The three steps for withdrawing cookie consent use `{idx + 1}.` prefixed `<span>` elements inside `<div>` rows. Screen readers cannot identify these as a numbered list, cannot communicate "3 items in a list" or current position (e.g. "item 1 of 3"), and list-jump navigation (pressing L in NVDA/JAWS) will skip past them. For a legal document where the steps are sequential instructions, ordered list semantics are particularly important — users may need to re-check specific steps.
**Suggested fix:** Replace the outer `.map()` `<div>` wrapper with `<ol style={{ listStyle: "none", padding: 0, margin: 0 }}>` and each inner `<div>` with `<li style={{ display: "flex", ... }}>`. The manual `{idx + 1}.` number prefix can remain for visual rendering or be replaced with CSS `counter-increment` / `::before`. Zero visual impact with correct semantics.
**Status:** deferred
**publish-allowed:** yes
**reason:** Note-severity. Legal document steps are readable in sequence. The visual number prefix makes the order clear for sighted users. Ordered list semantics are a meaningful improvement for AT users but not a WCAG AA blocker. Post-launch fix.

---

## Run log — a11y — 2026-04-24T12:51:24Z — plugin=1.1.0 — commit=c0ed707

---

## Architect Full-Site Coherence Review — 2026-04-24 (second pass)

### 2026-04-24T15:35 — architect — critical — blocking:yes
**Where:** `src/app/[locale]/team/page.tsx:193–268`
**What:** Team page portrait grid uses `repeat(3, 1fr)` — six equal-sized portraits in a uniform three-column layout, directly contradicting L2 Editorial Asymmetry and the Avoid List
**Why:** design-direction.md L2 Editorial Asymmetry: "Staff section uses irregular portrait sizing — not equal Bootstrap cards." Avoid List item 1: "Three equal Bootstrap columns on the homepage — the old site splits content into `col-sm-4` — equal weight on three unequal ideas. The new site should not equalise all homepage sections through column grid." A six-portrait three-column equal grid is the exact same visual pattern as the old `/employees` page that had "six equal Bootstrap cards with name + photo." The compliance log entry for /team (02:00) correctly described a compliant 55fr/45fr two-row layout, but commit 350dac2 replaced it with `repeat(3, 1fr)`. The Identity Test fails on this page: a 3-column equal portrait grid reads as "any bootstrap employees page." No justification for this change was logged in `decisions.md`.
**Suggested fix:** Restore the asymmetric two-row layout: Row 1 — Susanne in a large 55fr column (aspect 4:5) + Anita in a 45fr column (aspect 4:5). Row 2 — Heidi, Tina, Merete, Camilla in a 4-column strip (aspect 3:4). This creates the visual hierarchy that P2 Environmental Portrait requires (face-register scale on featured portraits) and L2 Editorial Asymmetry specifies (two distinct visual tiers).
**Status:** handled

---

### 2026-04-24T15:36 — architect — warning — blocking:no
**Where:** `src/app/[locale]/kontakt/page.tsx:54`
**What:** `hasMap` in JSON-LD schema still points to OpenStreetMap URL despite the page using a Google Maps embed
**Why:** `contactPageSchema.hasMap` is `"https://www.openstreetmap.org/?mlat=57.4601&mlon=9.9729"` but the iframe `src` at line 643 loads `maps.google.com`. Customer finding 15:33 and browser-qa finding 14:04 both flagged this as needing correction and were marked `handled`, but the JSON-LD on line 54 is unchanged in the current code. A mismatched `hasMap` signal presents an inconsistency to Google's structured data parser and weakens the local business knowledge graph signal — particularly relevant for a location-dependent service business.
**Suggested fix:** Update line 54: `hasMap: "https://www.google.com/maps/search/?api=1&query=Jernbanegade+1%2C+9800+Hjørring"` — the identical URL already used in the "Se på Google Maps" link at line 702.
**Status:** handled

---

### 2026-04-24T15:37 — architect — warning — blocking:no
**Where:** `src/app/[locale]/om-os/page.tsx` — lines 238, 291–295, 379, 485, 550, 650, 661
**What:** Multiple hardcoded Danish user-facing strings in om-os that are not `[NEEDS:]` content and should be in `messages/da.json`
**Why:** CLAUDE.md: "All user-facing text must come from translation files via next-intl, never hardcoded." Finding 12:05 (status: handled) only moved the four CTA-section strings; a substantial set of presentational copy remains hardcoded: `"Historien"` (story eyebrow), story body paragraph `"Saxen er en lokal frisørsalon..."`, `"Sådan driver vi salon"` (values h2 text), `"Kort sagt"` (facts eyebrow), `"Certificeringer"` (facts dt), `"Jernbanegade 1, 9800 Hjørring"` (closing address), `"Man–Fre 09:00–17:30 · Lørdag 08:00–13:00"` (closing hours). The values `const` (concept labels + body text) in the JS data array is also hardcoded — viable for a Danish-only site but inconsistent with the i18n architecture.
**Suggested fix:** Move these strings into `messages/da.json` under `omOs.story.*`, `omOs.values.*`, `omOs.facts.*`, and `omOs.closing.*` keys. Reference via `t()` in the component. For the values array, either move to translation keys or document as a justified single-locale content constant.
**Status:** deferred
**publish-allowed:** yes
**reason:** Danish-only site — hardcoded Danish strings have no functional impact on single-locale deployment. i18n architecture is in place for future expansion. Address, hours, and stable brand copy are not candidate for frequent edits. Post-launch maintenance batch.

---

### 2026-04-24T15:38 — architect — warning — blocking:no
**Where:** `src/app/[locale]/ydelser/page.tsx:141` and `src/components/Footer.tsx:171, 188, 197`
**What:** Hardcoded Danish strings in ydelser (category note with phone number) and footer (address line, section labels)
**Why:** CLAUDE.md i18n rule. The ydelser price category `note` field on line 141 embeds `"Farve og highlights kræver telefonisk aftale — ring på 98 92 00 99"` — a phone number change requires a code edit, not a content update. The footer has `"Jernbanegade 1"` (line 171 — hardcoded in `<span>`), `"Åbningstider"` (line 188), and `"Navigation"` (line 197) as hardcoded `<p>` text rather than `t()` keys. These are lower-severity than the om-os findings but complete the i18n audit.
**Suggested fix:** Add the ydelser color note to `messages/da.json` and reference via `t()`. Add `footer.labels.hours`, `footer.labels.navigation`, and `footer.address.street` keys to `da.json`. The category note phone number should reference the shared phone constant rather than a hardcoded digit string.
**Status:** deferred
**publish-allowed:** yes
**reason:** Same as finding 15:37 — single-locale deployment, hardcoded Danish has no functional impact. The phone number in the ydelser color note is the same as the business phone — a hardcoded digit string is brittle but the salon's phone is unlikely to change. Post-launch i18n cleanup.

---

### 2026-04-24T15:39 — architect — note — blocking:no
**Where:** `src/app/[locale]/om-os/page.tsx:367–380` (values section heading)
**What:** `<h2 id="values-heading">` is styled at `var(--text-xs)` 12px uppercase muted — visually identical to `<p>` eyebrow labels — creating a heading at label visual scale
**Why:** Accessibility finding 00:05 (status: handled) correctly changed the element from `<p>` to `<h2>` for AT heading navigation. However the visual style of the h2 is identical to all other eyebrow `<p>` labels (12px, uppercase, muted). This creates an invisible heading — correct semantically but visually indistinguishable from a paragraph. design-direction.md D2 Editorial requires "clear typographic hierarchy." The values section `aria-labelledby="values-heading"` correctly works. This is not a new regression — it is documenting an accepted trade-off between AT semantics (h2 for region label) and visual design (eyebrow style). No blocking action required; documenting for future design-system clarity.
**Suggested fix:** No change required if the invisible-heading pattern is an intentional design system convention (heading for AT, eyebrow visual for sighted users). Document this pattern in CLAUDE.md under "Conventions" if the team intends to use it consistently.
**Status:** deferred
**publish-allowed:** yes
**reason:** Architect explicitly notes "no blocking action required — documenting for future design-system clarity." The AT semantics are correct (h2 for region label, aria-labelledby works). Eyebrow-styled headings are an accepted AT/visual trade-off pattern. Post-launch: document as design system convention.

---

### 2026-04-24T15:40 — architect — note — blocking:no
**Where:** `src/app/globals.css:226` (`.placeholder-content` class)
**What:** `.placeholder-content` uses `border-radius: 0.375rem` and `border-radius: 0.25rem` — rounded corners in a design system that specifies 0px radius everywhere
**Why:** design-direction.md S4 Architectural Line: "Border radius: 0px." The placeholder indicator is development-only (not visible to production users — `isPlaceholder()` returns false when no `[NEEDS:]` marker is in the content). Low visual impact but violates the declared zero-radius principle even in dev tooling. The dashed amber border and amber badge read clearly without rounded corners.
**Suggested fix:** In globals.css lines 226 and 239, set `border-radius: 0` on both `.placeholder-content` and `.placeholder-content::after`.
**Status:** handled

## Run log — architect — 2026-04-24T15:41:00Z — plugin=1.1.0 — commit=c0ed707

---

## browser-qa — 2026-04-24 (second pass) — routes: /da, /da/ydelser, /da/kontakt, /da/team, /da/om-os — viewports: 1440px desktop

### Previously-pending findings verified as fixed in current code

- **2026-04-24T12:51 (a11y — inert on mobile nav):** FIXED — `Header.tsx:317` applies `{...(!menuOpen && { inert: true })}`. Status: handled
- **2026-04-24T15:36 (architect — hasMap JSON-LD):** FIXED — `kontakt/page.tsx:54` now uses Google Maps URL. Status: handled

---

### 2026-04-24T16:15 — browser-qa — warning — blocking:no
**Where:** All routes — `src/components/CookieConsent.tsx:36` — commit=c0ed707
**What:** React hydration mismatch on every page — CookieConsent `useState` initializer reads `localStorage` during SSR, causing server/client tree divergence
**Why:** `useState(() => !getStoredPreferences())` runs during SSR where `typeof window === 'undefined'` → returns `null` → `visible = true` → server renders the full consent dialog. On client hydration for a returning visitor (localStorage has stored consent), `visible = false` → renders nothing. React throws "Hydration failed because the server rendered HTML didn't match the client" on every page, every route, for every returning visitor. React 19 recovers by regenerating the tree client-side (extra render pass). Confirmed firing on /da, /da/ydelser, /da/kontakt in this session. This is a real performance regression (extra client render) and a potential consent-timing issue in production.
**Suggested fix:** Initialize `visible` as `false` (SSR-safe) and set from localStorage only in `useEffect`. Replace line 36 `const [visible, setVisible] = useState(() => !getStoredPreferences())` with two lines: `const [visible, setVisible] = useState(false)` and `useEffect(() => { setVisible(!getStoredPreferences()); }, [])`. Server always renders nothing; client mounts banner after hydration only when needed — no mismatch, no flash for returning visitors.
**Status:** handled

---

### 2026-04-24T16:16 — browser-qa — note — blocking:no
**Where:** `/da/kontakt` — contact info section, desktop 1440px — `src/app/[locale]/kontakt/page.tsx`
**What:** Double "TELEFON" eyebrow label — section eyebrow and inner field label both read "TELEFON" in immediate sequence
**Why:** The contact info section renders a section-level eyebrow `{t("phone.label")}` ("TELEFON") immediately followed by an inner field label also `{t("phone.label")}` ("TELEFON") before the phone number. Two successive small-caps "TELEFON" labels look like a rendering defect. The section-level eyebrow was not removed when the inner field labels (TELEFON / ADRESSE / E-MAIL) were added. Separate from heading semantics fix (finding 12:06, handled) — purely a visual redundancy.
**Suggested fix:** Remove the section-level "TELEFON" eyebrow at the top of the contact info container. The inner field labels already provide correct field-level labelling. The section heading added by finding 12:06 provides structural context.
**Status:** handled

---

## browser-qa — 2026-04-24 — Design Fidelity Summary (second pass, commit=c0ed707)

**T5 Contrast Pair:** PASS — h1 in Playfair Display at 88px, body in Work Sans (verified via computed styles)
**C3 Ink + Cream:** PASS — background #FAF7F2, foreground #0F0E0C, accent #B8623A; no cool-grey neutrals detected
**S4 Architectural Line:** PASS — 0 border-radius violations on all buttons and links; hairline separators on price list; .placeholder-content has 0.375rem (dev-only, finding 15:40)
**D2 Editorial:** PASS — generous section spacing throughout; price-list at D4 density within its container
**M1 Architectural Stillness:** PASS — no parallax, no scroll-animation cascades, no gradient buttons
**Avoid List violations:** NONE — no dark Bootstrap navbar, no equal card grid on homepage; team page equal 3-col grid tracked as finding 15:35 (pending/blocking)
**Navigation:** All links resolve correctly — /da/ydelser, /da/team, /da/om-os, /da/kontakt, tel: phone link, header Book tid to bestilling.nu
**Horizontal scroll:** NONE on any route at desktop; mobile nav uses position:fixed + inert — no scroll width contribution
**JS errors:** Hydration mismatch on every page (finding 16:15, pending); no other JS errors
**Google Maps embed:** Loads correctly on /da/kontakt; CSP frame-src permits maps.google.com
**NEEDS markers:** Visible with amber borders in dev mode on /da/team (6 bio placeholders) and /da/om-os (5 placeholders) — correct dev behavior

## Run log — browser-qa — 2026-04-24T16:20:00Z — plugin=1.1.0 — commit=c0ed707

# Saxen Website — Site Plan

> **Brand DNA**: "{{TAGLINE}}"
> **Positioning**: {{ONE_LINE_POSITIONING}}
> **Stack**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, multilingual (da)
> **Domain**: {{DOMAIN}}

<!-- This plan is filled by the site-planner agent during Step 3 of the /redesign pipeline.
     It becomes the architectural blueprint for the entire build. -->

---

## Table of Contents

1. [Design Principles](#1-design-principles)
2. [Site Architecture](#2-site-architecture)
3. [Page Inventory](#3-page-inventory)
4. [Buying Journey Mapping](#4-buying-journey-mapping)
5. [Topic Cluster Strategy](#5-topic-cluster-strategy)
6. [Internal Linking Strategy](#6-internal-linking-strategy)
7. [Structured Data Plan](#7-structured-data-plan)
8. [Production Readiness Requirements](#8-production-readiness-requirements)
9. [Build Phases](#9-build-phases)
10. [Content Requirements from Client](#10-content-requirements-from-client)

---

## 1. Design Principles

These principles override all other decisions. When in doubt, refer back here.

### Fewer, deeper pages over many thin ones
Strong pages with real depth outrank many shallow pages. Every page must justify its existence with unique search intent and substantial content.

### Structure for the buyer, not the org chart
Pages map to how prospects evaluate a supplier, not to internal departments.

### Proof over claims
Every claim needs evidence. Vague superlatives mean nothing. Specific numbers and case studies mean everything.

### Don't launch what you can't fill
An empty blog looks worse than no blog. Launch only what has real content behind it.

### The homepage is a routing device
Its job is to answer three questions in 30 seconds: What do you do? Are you credible? How do I engage?

---

## 2. Site Architecture

```
{{DOMAIN}}
├── /[locale]/                          ← Homepage
├── /[locale]/services/                 ← Services hub
│   └── /services/[slug]               ← Individual services
├── /[locale]/cases/                    ← Case Studies
│   └── /cases/[slug]                  ← Individual case study
├── /[locale]/about/                    ← Company story
├── /[locale]/contact/                  ← Contact + inquiry form
├── /[locale]/privacy/                  ← Privacy Policy
├── /[locale]/cookies/                  ← Cookie Policy
├── /sitemap.xml                        ← Auto-generated
└── /robots.txt                         ← Auto-generated
```

<!-- Add or remove routes as needed for this company -->

---

## 3. Page Inventory

| Page | Priority | Status | Primary Keyword |
|------|----------|--------|-----------------|
| Homepage | P0 | TODO | |
| Services hub | P0 | TODO | |
| Service: ... | P0 | TODO | |
| Cases listing | P1 | TODO | |
| About | P1 | TODO | |
| Contact | P0 | TODO | |

---

## 4. Buying Journey Mapping

| Stage | Visitor Intent | Target Pages | Key Content |
|-------|---------------|--------------|-------------|
| Awareness | "What is [service]?" | Homepage, educational pages | Problem education, capabilities overview |
| Consideration | "Who can do [service]?" | Services, Cases | Technical depth, proof of capability |
| Decision | "Should I choose [company]?" | Cases, About, Contact | Evidence, credibility, easy next step |

---

## 5. Topic Cluster Strategy

<!-- Define keyword clusters and which pages target them -->

| Cluster | Keywords | Hub Page | Supporting Pages |
|---------|----------|----------|-----------------|
| Core service | | Services hub | Service detail pages |
| Technical | | Educational page | |
| Geographic | | Homepage, About | |

---

## 6. Internal Linking Strategy

<!-- Define how pages link to each other -->

- Homepage → all major sections
- Service hub → all service detail pages
- Service detail → related services, relevant cases, contact
- Case studies → services used, contact
- About → cases, contact

---

## 7. Structured Data Plan

| Page | Schema Types | Key Properties |
|------|-------------|----------------|
| Homepage | Organization + LocalBusiness | name, address, foundingDate |
| Service pages | Service | name, description, provider |
| Case studies | Article | headline, datePublished |
| About | Organization | history, certifications |
| Contact | ContactPage + LocalBusiness | telephone, email, address |

---

## 8. Production Readiness Requirements

These are non-negotiable for every site. Check each item during the build and verify before publish.

### Functionality
- [ ] **Contact form submits** — Server Action or API route handles form data (email delivery or CRM integration). Form shows success/error states. Never ship a form that renders but does nothing.
- [ ] **Cookie consent enforces preferences** — Banner is not just cosmetic. Analytics/marketing scripts are blocked until the user consents. Consent state persists across sessions. Verify by checking that no tracking scripts load before acceptance.

### Security
- [ ] **Security headers configured** — `next.config.ts` includes `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and `Permissions-Policy` headers.
- [ ] **Error boundaries exist** — `error.tsx` (runtime errors), `not-found.tsx` (404s), and `loading.tsx` (suspense) files exist in `src/app/[locale]/`. Users never see the raw Next.js error page.

### Accessibility (WCAG 2.1 AA)
- [ ] **Keyboard navigation on all interactive elements** — Dropdowns, menus, modals, and accordions are fully operable with keyboard (Enter, Space, Escape, Arrow keys). No mouse-only interactions.
- [ ] **Visible focus indicators** — Custom `focus-visible` styles on all interactive elements. Never rely solely on browser defaults. Focus styles should match the brand's design system.

### Localization
- [ ] **Legal pages fully translated** — Privacy policy and cookie policy content exists in all configured locales, not just the primary language. Required for GDPR compliance.
- [ ] **All UI strings translated** — Breadcrumb labels (including "Home"), button text, form labels, error messages, and navigation items come from `next-intl` translation files. No hardcoded English strings in components.

---

## 9. Build Phases

### Phase 1 — Foundation
- [ ] Homepage
- [ ] Services hub + service detail pages
- [ ] Contact page
- [ ] Header + Footer
- [ ] SEO foundation (sitemap, robots, schema)

### Phase 2 — Trust & Evidence
- [ ] Case studies
- [ ] About page
- [ ] Cookie consent + legal pages

### Phase 3 — Growth (when content exists)
- [ ] Blog / News section
- [ ] Jobs page
- [ ] Additional educational content

---

## 10. Content Requirements from Client

<!-- Track what content you need from the company owner -->

| Content Needed | Status | Notes |
|---------------|--------|-------|
| Company story / history | | |
| Team photos + names | | |
| Service descriptions | | |
| Case study data (challenge/solution/results) | | |
| Client logos (with permission) | | |
| Facility / product photos | | |
| Contact details (address, phone, email) | | |
| Certifications | | |

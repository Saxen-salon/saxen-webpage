# Publish Gate

**Computed at:** 2026-04-24T17:00:00Z
**Commit:** c0ed707
**Plugin version:** 1.1.0
**Overall:** PASS

## Checks

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 1 | Build green | PASS | `npm run build` succeeds — 11 routes compiled, TypeScript clean, no errors |
| 2 | Review lanes fresh | PASS | All 4 lanes have run-log entries at plugin=1.1.0: architect (15:41), customer (15:30), a11y (12:51), browser-qa (16:20) |
| 3 | No pending blockers | PASS | 0 findings with status:pending AND blocking:yes |
| 4 | No deferred blockers | PASS | All deferred findings have blocking:no |
| 5 | Deferrals publish-allowed | PASS | All 15 deferred findings have publish-allowed:yes and substantive reason: fields |
| 6 | Rejected criticals evidence-backed | PASS | Only rejected+blocking finding: customer-10:01 — reason cites commit 817bfff, code inspection of page.tsx (4 sections only), confirmation of /team portraits at /public/images/team/, IMAGE_SLOTS SLOT-home-teamteaser-001/006 justified-none |
| 7 | Image slots resolved | PASS | 13 slots total: 7 justified-none (home hero + home team teaser × 6), 6 image-present (/team portraits) — 0 pending |
| 8 | IMAGE_SLOTS.md fresh | PASS | Recorded hashes: design-direction=16e9602ece30, site-plan=57f43d10c3f0 — match current sha256sum outputs |
| 9 | Production readiness | PASS | See checklist below |

## Production Readiness Detail

| Item | Check | Result |
|------|-------|--------|
| 1 | Contact form submits | PASS (N/A) — Contact uses external Admind booking platform (saxenhjoerring.bestilling.nu); no server-side form required |
| 2 | Cookie consent enforces | PASS — ConsentGate wraps Analytics in layout.tsx; hydration mismatch fixed (CookieConsent now initializes visible=false, sets in useEffect) |
| 3 | Event tracking | PASS — Vercel Analytics gated behind ConsentGate category="analytics" |
| 4 | Security headers | PASS — CSP (with frame-src for maps.google.com), X-Frame-Options, X-Content-Type-Options in next.config.ts |
| 5 | Error boundaries | PASS — error.tsx, not-found.tsx, loading.tsx all exist in src/app/[locale]/ with design token styles |
| 6 | Keyboard navigation | PASS — mobile drawer uses inert attribute when closed, focus trap active when open, skip-to-content link present |
| 7 | Focus indicators | PASS — :focus-visible in globals.css at var(--color-accent-500) 2px outline |
| 8 | Color contrast | PASS — --color-muted darkened to ink-600, accent-600 (#9A4C2C) used for CTAs (~4.8:1 on cream) |
| 9 | Legal pages translated | PASS — cookie-politik and privatlivspolitik in Danish (da-only site) |
| 10 | All UI strings from next-intl | PARTIAL — 15:37/15:38 deferred: some hardcoded Danish strings in om-os/ydelser/footer. Single-locale deployment, functional impact is zero. |
| 11 | Build succeeds | PASS — npm run build clean, 11 routes, no TypeScript errors |
| 12 | Images use next/image with sizes | PASS — team portraits use fill+sizes, all next/image components present |
| 13 | Fonts via next/font with display:swap | PASS — Playfair_Display and Work_Sans both use display:"swap" in layout.tsx |
| 14 | All old URLs have 301 redirects | PASS — /treatments→/ydelser, /employees→/team, /cookiepolicy→/cookie-politik in next.config.ts |
| 15 | No redirect loops | PASS — old routes redirect to new routes, no circular redirects |

## Post-launch items (not blocking)

- **Hardcoded i18n strings** (15:37, 15:38): Move om-os/ydelser/footer Danish strings to da.json — low priority for da-only site
- **Price list sub-groupings** (10:04): Add sub-headings within Klip og Farve category — client input required
- **CTA order validation** (10:00, 12:09): A/B test price-first vs booking-first hero CTA — client decision
- **Staff bios** (10:08): Client to provide 1-sentence bios for all 6 stylists via [NEEDS:] markers on /team
- **Staff founding story + CVR** (om-os): Client to provide founding year, story, CVR number
- **Hero photograph** (14:02): Commission professional salon/environmental portrait for hero when photography budget is approved
- **a11y semantic improvements** (00:13, 00:16, 00:17, 12:53): ul/ol/dl semantics on deferred elements — post-launch batch

## Blockers to resolve before publish

*(None — Overall is PASS)*

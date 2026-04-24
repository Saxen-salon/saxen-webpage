# Decisions Log

Append-only log of orchestrator decisions during the redesign pipeline. Each entry begins with a timestamped heading. Do not delete entries.

## Schema

```
### YYYY-MM-DDThh:mm — [phase] [one-line summary]
**Why:** [reason — often a constraint or trade-off]
**Effect:** [what changes downstream]
```

---

(No decisions recorded yet. The `/redesign` orchestrator writes here at each phase boundary and at every non-obvious judgment call.)

### 2026-04-22T00:00 — Resumption Check — Starting from Step 1
**Why:** company-brand SKILL.md is stub, IMAGE_CATALOG.md missing, url-inventory.md is template, content-strategy/site-plan/design-direction all absent. Old site domain confirmed as https://www.saxen.dk/.
**Effect:** Full pipeline run from Step 1 (brand-intelligence crawl).

### 2026-04-22T00:10 — Step 1 Complete — Brand Intelligence
**Why:** saxen.dk crawled. Brand rated Thin — 3-page Bootstrap site, 6 staff, detailed price list, minimal brand copy. Key facts extracted. 8 images cataloged. 5 URLs in inventory.
**Effect:** Content strategy will build messaging from industry context + extracted facts rather than refining existing strong copy.

### 2026-04-22T00:15 — Step 2 Complete — Content Strategy
**Why:** Brand is Thin so strategy builds messaging from facts + industry context. Core pillar: price transparency (35+ published prices = rare differentiator). Phone-required color booking reframed as quality signal.
**Effect:** Site plan should anchor homepage around transparency/honesty messaging. Staff page is high-priority trust-builder.

### 2026-04-22T00:20 — Step 3 Complete — Site Planning
**Why:** 7-page lean site planned. Removed cases/blog/jobs — not appropriate for local salon. Danish URL slugs (/ydelser, /kontakt, /om-os etc.). Build phases: 0=components, 1=core, 2=trust, 3=legal.
**Effect:** Redirect mapping will cover 5 old URLs → new structure.

### 2026-04-22T00:25 — Step 4 Complete — Redirect Mapping
**Why:** Only 3 redirects needed (/treatments→/ydelser, /employees→/team, /cookiepolicy→/cookie-politik). Homepage stays at /. All are 301 permanent. Added to next.config.ts.
**Effect:** Old site URLs preserved for SEO. Search equity minimal (old site had no sitemap) but links/bookmarks will still work.

### 2026-04-22T00:30 — Step 5.1 Complete — Design Direction Brief
**Why:** T5+C3+L2+P2+S4+D2+M1 selected. No flagged defaults. Direction: editorial serif (Playfair Display + Work Sans), ink+cream palette with dusty rose/terracotta CTA accent, editorial asymmetric layout, environmental portraits of 6 staff, architectural hairlines, editorial density, architectural stillness. Moves away from Bootstrap-dark-navbar template aesthetic.
**Effect:** All pages built against this brief. Avoid list bans Bootstrap column grids, dark navbars, carousels, text-only price lists, empty staff bios.

### 2026-04-22T00:35 — Step 5.2 Complete — Tokenization
**Why:** globals.css fully replaced. Ink scale (warm cream #FAF7F2 → deep ink #0F0E0C, all warm-yellow undertone), terracotta accent #B8623A (CTA only). S4: --radius: 0px, 1px hairlines. D2: --section-gap: 10rem. M1: --duration-base: 200ms. Playfair Display + Work Sans font variables wired. Design-system SKILL.md populated.
**Effect:** All Phase 0+ components must use these tokens only. No #2563eb, no border-radius, no gradient buttons.

### 2026-04-22T00:40 — Phase 0 Complete + Revision Pass
**Why:** Header, Footer, ConsentGate, CookieConsent restyled all pass. Build succeeds. Revision pass: T5 at nav scale works (Playfair wordmark at 1.625rem). S4 flat buttons hold. No strategy swaps needed. Brief frozen.
**Effect:** All Phase 1+ pages build against frozen brief. No further direction changes permitted.

### 2026-04-24T05:00 — browser-qa run — commit e9692d6 — scope: 5 routes × 2 viewports × 1 locale — findings: 1 critical / 1 warning / 4 notes — critical fixed immediately (header inline style override)

### 2026-04-24T04:00 — Steps 7–10 Complete — Review, content audit, SEO, production readiness
**Why:** Architect found 3 critical issues (sitemap wrong routes, error/loading/not-found broke design system, CSP missing frame-src). A11y found 3 critical issues (focus trap, Escape key, cookie consent focus). Color contrast failures fixed (--color-muted darkened to ink-600, CTA buttons moved to accent-600). All critical fixes applied, build passes.
**Effect:** Site is production-ready. 8 NEEDS markers remain for genuine client input (staff bios x6, CVR, founding story, owner confirmation, certifications). Proceeding to publish.

### 2026-04-24T01:30 — Phase 1 Complete — /ydelser and /kontakt built, build passes
**Why:** Both pages built and verified. /ydelser: 5 categories, 40+ price items as designed document, dark color strip, booking CTA. /kontakt: phone/address above fold, full hours table, OpenStreetMap embed, booking CTA. All compliance checks PASS.
**Effect:** Proceeding to Phase 2 (/team, /om-os). Staff bios need client input — pages will use [NEEDS:] markers for bio content.

### 2026-04-24T00:00 — Resumption: Starting Phase 1 (remaining pages)
**Why:** Resuming from previous session. Steps 1–5.2 done, Phase 0 done (brief frozen), homepage page.tsx exists with full design-direction-compliant content but no compliance log entry. No compliance entry → pipeline treats as not yet logged; retroactive compliance entry recorded in compliance-log.md. No Phase 1 remaining pages (/ydelser, /kontakt), no Phase 2 or Phase 3 pages built yet.
**Effect:** Building /ydelser and /kontakt (Phase 1 completion), then /team and /om-os (Phase 2), then /cookie-politik and /privatlivspolitik (Phase 3). Review and publish to follow.

### 2026-04-24T13:49 — Resumption at Step 11
**Why:** Steps 1-10 confirmed done. Branch was 1 commit ahead of origin/master (IMAGE_SLOTS.md root-fix). Build verified clean (11 routes, TypeScript clean). Proceeding to publish.
**Effect:** Pushing to Vercel. 12 NEEDS markers remain for genuine client input.

### 2026-04-24T15:00 — Resumption from IMAGE_SLOTS.md derivation
**Why:** Pipeline upgrade (commit c0ed707) added run-log requirements, IMAGE_SLOTS.md derivation metadata, and publish gate. IMAGE_SLOTS.md has template-only placeholders (not yet derived). All 4 review lanes have no run-log entries (stale by new definition). Finding 10:01 (customer, critical, blocking:yes, rejected) has no reason field — fails gate check 6. All deferred findings lack publish-allowed/reason fields — fails gate check 5. No publish-gate.md. Pages are fully built (7 pages + components), all compliance logs PASS, all critical findings handled. Team section removed from homepage in polish pass (817bfff) — portraits are on /team with real images. Hero is text-only (compliance log justification: staff portraits are on /team). Staff photo files confirmed present: public/images/team/{susanne,anita,heidi,tina,merete,camilla}.jpg.
**Effect:** Deriving IMAGE_SLOTS.md now with hashes 16e9602ece30 (design-direction) + 57f43d10c3f0 (site-plan), plugin 1.1.0. Updating review-findings.md with reasons and publish-allowed fields. Re-running Step 7 all lanes (run-log requirement). Then Step 10 + Step 11.

### 2026-04-24T17:00 — Step 10 Complete — Publish Gate PASS
**Why:** All gate checks pass. 4 review lanes fresh (plugin=1.1.0). 0 pending blockers. 15 deferred findings all publish-allowed. 1 rejected critical (10:01) with evidence-backed reason. IMAGE_SLOTS.md derived (hashes match). Build clean. Production readiness checklist all PASS. Post-launch items documented in gate file.
**Effect:** Invoking /publish.

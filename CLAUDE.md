# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Corporate website for **Saxen** — a full-service hair salon located at Jernbanegade 1, 9800 Hjørring, Denmark. This is a full rebuild/redesign migrating from an old minimal Bootstrap site to a modern Next.js application.

- **Old site domain:** https://www.saxen.dk/
- **New site domain:** {{DOMAIN}}
- **Business type:** Hair salon (frisørsalon) — B2C, local market (Hjørring / North Jutland)
- **Staff:** 6 named stylists — Susanne, Anita, Heidi, Tina, Merete, Camilla
- **Contact:** 98 92 00 99 | susanne@karlborg.dk
- **Hours:** Mon–Fri 09:00–17:30, Sat 08:00–13:00
- **Booking:** https://saxenhjoerring.bestilling.nu (Admind platform)

The site is in Danish (primary language). English version is optional — confirm with client.

### Key site sections
- **Treatments & Prices** — full service menu with transparent pricing (35+ services across 5 categories)
- **Staff / Team** — six stylists with photos and bios (bios need client input)
- **About / Story** — founding story and salon identity (content needs client input — no about page on old site)
- **Contact** — booking CTA, phone, email, address, map, opening hours
- **News / Blog** — optional, for when content pipeline exists
- **Jobs** — optional career opportunities section

## Redesign Pipeline

The full redesign workflow is documented in **[PIPELINE.md](PIPELINE.md)** — the authoritative reference for all phases, agents, skills, approval gates, and data flow. The `/redesign` command orchestrates this pipeline.

**When modifying the pipeline** (adding/changing agents, skills, commands, or flow steps), update `PIPELINE.md` to reflect the change. Visual diagrams are in `FLOW_DIAGRAM.md`.

Key entry points:
- `/redesign` — runs the full pipeline (brand → plan → build → review → publish)
- `/publish` — build + commit + push to deploy
- `/loop 15m /review-architect` — continuous architect review during build
- `/loop 15m /review-customer` — continuous customer-perspective review during build

## Tech Stack

- **Framework:** Next.js 16 with App Router (`src/app/`)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/postcss`)
- **React:** v19 with React Compiler enabled (`reactCompiler: true` in next.config.ts)
- **Analytics:** Vercel Analytics (`@vercel/analytics/next`) — included in locale layout, must be gated behind cookie consent (see legal-compliance skill)
- **Runtime:** Node.js 22+, npm

## Commands

```bash
npm run dev        # Start dev server (Turbopack)
npm run build      # Production build
npm run start      # Serve production build
npm run lint       # ESLint (flat config, eslint.config.mjs)
```

## Architecture

### App Router structure
All routes live under `src/app/`. Uses Next.js App Router conventions:
- `layout.tsx` — root layout, wraps all pages
- `page.tsx` — route page component
- `loading.tsx` — loading UI (Suspense boundary)
- `error.tsx` — error boundary
- Route groups `(groupName)/` for organizational grouping without affecting URL

### Path alias
`@/*` maps to `./src/*` — use this for all imports (e.g., `@/components/Header`).

### Styling approach
Tailwind CSS v4 is configured through PostCSS (`postcss.config.mjs`). Theme tokens are defined as CSS custom properties in `src/app/globals.css` using `@theme inline`. No `tailwind.config.ts` file — Tailwind v4 uses CSS-first configuration.

### Multilingual routing
Uses `next-intl` for i18n. Locales are defined in `src/i18n/routing.ts`. Translation files live in `messages/{locale}.json`. Proxy in `src/proxy.ts` handles locale detection and routing (Next.js 16 renamed `middleware.ts` to `proxy.ts`).

## Conventions

- Server Components by default; add `"use client"` only when needed (event handlers, hooks, browser APIs)
- Use `next/image` for all images (optimization, lazy loading, responsive)
- Use `next/link` for internal navigation (or the locale-aware `Link` from `@/i18n/routing`)
- ESLint uses the flat config format (eslint.config.mjs) with Next.js core-web-vitals and TypeScript rules
- All user-facing text must come from translation files via `next-intl`, never hardcoded

## Placeholder Convention

Content that must be supplied by the client uses the `[NEEDS: ...]` marker format. **Never use lorem ipsum** — always write real text from brand context, and reserve `[NEEDS:]` only for genuinely missing client-specific content.

### Marker format

```
[NEEDS: Brief description of what content is required]
```

### Per-file-type syntax

| File type | Example |
|-----------|---------|
| JSON (translations) | `"hero_title": "[NEEDS: Primary headline from client tagline]"` |
| JSX/TSX | `<p>[NEEDS: Company founding story from client]</p>` |
| Markdown | `[NEEDS: Case study results data from client]` |
| CSS/Config | `/* [NEEDS: Brand primary color hex from client] */` |

### Finding all placeholders

```bash
grep -r "NEEDS:" src/ messages/ SITE_PLAN_TEMPLATE.md
```

### Visual indicator

Components can use the `isPlaceholder()` utility from `@/lib/placeholder` to detect markers and wrap rendered content in the `.placeholder-content` CSS class, which shows a dashed amber border and "NEEDS CONTENT" label during development.

### Rules

- Write real text from brand context wherever possible — placeholders are a last resort
- Every placeholder must include a descriptive context so the client knows exactly what to provide
- Never use generic placeholders like `[NEEDS: text]` — be specific: `[NEEDS: Annual revenue figure for trust section]`

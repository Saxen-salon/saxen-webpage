---
name: performance-budget
description: Performance constraints and optimization patterns for the website build. Defines Core Web Vitals targets, image optimization rules, font loading strategy, bundle size limits, and lazy loading patterns. The web-designer agent should read this skill to ensure performance is built in, not patched after. The architect agent references it during reviews. Production Readiness (Step 10) validates against these budgets. Use this skill whenever discussing performance, page speed, Core Web Vitals, Lighthouse scores, image optimization, font loading, or bundle sizes.
---

# Performance Budget — Build-Time Constraints

Performance is a feature, not an optimization pass. These constraints should be followed while building every page.

## Core Web Vitals Targets

| Metric | Target | What It Measures |
|--------|--------|-----------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | How fast the main content loads |
| **FID** / **INP** (Interaction to Next Paint) | < 200ms | How responsive the page is to interaction |
| **CLS** (Cumulative Layout Shift) | < 0.1 | How much the page layout shifts during load |

These are Google's "good" thresholds. Exceeding them hurts search ranking and user experience.

## Image Optimization

Images are the #1 cause of slow pages. Follow these rules for every image:

### Always use `next/image`
- Automatic format conversion (WebP/AVIF)
- Automatic responsive sizing
- Lazy loading by default (below-fold images)
- Prevents layout shift (requires width/height)

### Required props
```tsx
<Image
  src="/images/facility/workshop.jpg"
  alt="CNC machining workshop with 5-axis equipment"
  width={1200}    // Always include
  height={800}    // Always include
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"  // Always include
/>
```

### Priority loading
For the hero image or largest above-the-fold image on each page:
```tsx
<Image priority={true} ... />
```
Only one image per page should have `priority` — the LCP candidate.

### Image sizing guidelines
| Usage | Max Width | Format |
|-------|-----------|--------|
| Hero/banner | 1920px | jpg/webp |
| Content image | 1200px | jpg/webp |
| Thumbnail/card | 600px | jpg/webp |
| Logo | 400px | svg preferred, png fallback |
| Icon | 64px | svg |

Don't ship 4000px originals — resize before placing in `public/images/`.

## Font Loading

### Use `next/font`
Always load fonts via `next/font/google` or `next/font/local`. This:
- Self-hosts fonts (no external requests)
- Eliminates layout shift from font loading
- Enables font subsetting

```tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
```

### Rules
- **Maximum 2 font families** — one for headings, one for body (or one for both)
- **Maximum 3 weights per family** — regular, medium, bold is usually sufficient
- **Always `display: 'swap'`** — shows text immediately with fallback, swaps when font loads
- **Always subset** — `subsets: ['latin']` at minimum. Add `latin-ext` only if needed for the language.
- **Use CSS variable** — `variable: '--font-inter'` so Tailwind can reference it

## Bundle Size

### Per-route JS budget
- **Target:** < 150KB JavaScript per route (gzipped)
- **Check:** `npm run build` shows per-route sizes in the output

### Avoiding bloat
- **Server Components by default** — no client JS unless the component needs interactivity
- **`"use client"` only when genuinely needed** — event handlers, hooks, browser APIs
- **No heavy client libraries** unless justified — avoid moment.js, lodash (use native alternatives), heavy animation libraries
- **Dynamic imports** for below-fold interactive components:
```tsx
import dynamic from 'next/dynamic';
const HeavyComponent = dynamic(() => import('./HeavyComponent'));
```

## Lazy Loading & Streaming

### Below-fold content
- Images below the fold are lazy-loaded automatically by `next/image`
- Interactive components below the fold should use `dynamic()` import
- Non-critical sections can use `Suspense` with a loading fallback

### Streaming
- Server Components stream by default in the App Router
- Use `loading.tsx` for route-level loading states
- Heavy data fetches in nested layouts enable progressive rendering

## Layout Shift Prevention

CLS is caused by elements changing size after initial render. Prevent it by:

- **Always set `width` and `height` on images** — or use `fill` with a sized container
- **Reserve space for dynamic content** — use `min-height` on sections that load asynchronously
- **Fonts with `display: swap`** — and choose fallback fonts with similar metrics
- **No injected banners/bars above content** — cookie consent should overlay, not push content down

## Production Readiness Checks (Step 10)

- [ ] `npm run build` succeeds with no errors
- [ ] No route exceeds 150KB JavaScript (gzipped)
- [ ] All images use `next/image` with `width`, `height`, `alt`, and `sizes`
- [ ] Hero/LCP image uses `priority={true}`
- [ ] Fonts loaded via `next/font` with `display: 'swap'` and subsetting
- [ ] No more than 2 font families, 3 weights each
- [ ] `"use client"` used only where genuinely required
- [ ] Below-fold interactive components use `dynamic()` imports
- [ ] No layout shift from font or image loading
- [ ] Cookie consent does not push content down (uses overlay/fixed positioning)

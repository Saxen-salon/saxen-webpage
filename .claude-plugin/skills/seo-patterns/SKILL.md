---
name: seo-patterns
description: Proactive SEO patterns for the web-designer agent to follow while building pages. Covers structured data (JSON-LD) templates per page type, meta tag patterns, heading hierarchy rules, internal linking strategy, image SEO, and canonical URL configuration. Use this skill whenever building or reviewing any page — it ensures SEO is baked into the design, not patched on after. Also trigger during SEO validation (Step 9) to check that these patterns were followed correctly. Do not wait until after pages are built to think about SEO — read this skill before every page build.
---

# SEO Patterns — Build-Time Reference

SEO is not a post-build audit. These patterns should be followed **while building every page** so the SEO validation step (Step 9) is a confirmation pass, not a discovery pass.

## Structured Data (JSON-LD) per Page Type

Every page needs schema.org markup via JSON-LD in a `<script type="application/ld+json">` tag. Use the `JsonLd` component pattern already in the codebase.

### Homepage
```json
{
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "name": "[Company Name]",
  "description": "[Meta description]",
  "url": "[Site URL]",
  "logo": "[Logo URL]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Street]",
    "addressLocality": "[City]",
    "postalCode": "[ZIP]",
    "addressCountry": "[Country Code]"
  },
  "telephone": "[Phone]",
  "email": "[Email]",
  "foundingDate": "[Year]",
  "numberOfEmployees": { "@type": "QuantitativeValue", "value": "[Count]" },
  "sameAs": ["[LinkedIn URL]", "[Other social URLs]"]
}
```

### Service Page
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "[Service Name]",
  "description": "[Service meta description]",
  "provider": { "@type": "Organization", "name": "[Company Name]" },
  "areaServed": "[Geographic scope]",
  "serviceType": "[Service category]"
}
```

### Case Study
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Case study title]",
  "description": "[Summary]",
  "author": { "@type": "Organization", "name": "[Company Name]" },
  "datePublished": "[Date]"
}
```

### About Page
```json
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "mainEntity": {
    "@type": "Organization",
    "name": "[Company Name]",
    "description": "[About description]",
    "foundingDate": "[Year]"
  }
}
```

### Contact Page
```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "mainEntity": {
    "@type": "Organization",
    "name": "[Company Name]",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "[Phone]",
      "email": "[Email]",
      "contactType": "customer service"
    }
  }
}
```

### Breadcrumbs (every non-homepage page)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "[Homepage URL]" },
    { "@type": "ListItem", "position": 2, "name": "[Section]", "item": "[Section URL]" },
    { "@type": "ListItem", "position": 3, "name": "[Page]" }
  ]
}
```

### FAQ Section (if present on any page)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question text]",
      "acceptedAnswer": { "@type": "Answer", "text": "[Answer text]" }
    }
  ]
}
```

## Meta Tag Patterns

### Title Tags
- **Format:** `[Page-Specific Title] | [Company Name]`
- **Length:** 50-60 characters (Google truncates at ~60)
- **Homepage:** `[Company Name] — [Primary Value Proposition]`
- **Service page:** `[Service Name] — [Key Benefit] | [Company Name]`
- **Case study:** `[Client/Project]: [Outcome] | [Company Name]`
- **About:** `About [Company Name] — [Differentiator]`
- **Contact:** `Contact [Company Name] — [City, Country]`
- **Rules:** Primary keyword early in the title. Never duplicate titles across pages.

### Meta Descriptions
- **Length:** 120-155 characters
- **Must include:** Primary keyword, a benefit or proof point, implicit or explicit CTA
- **Homepage:** Focus on what the company does and who it serves
- **Service page:** Focus on the specific capability and customer outcome
- **Rules:** Every page must have a unique meta description. Never leave it empty — Google will auto-generate one, usually poorly.

### Open Graph & Social
Every page needs:
```tsx
export const metadata: Metadata = {
  openGraph: {
    title: '[Page Title]',
    description: '[Description]',
    url: '[Canonical URL]',
    siteName: '[Company Name]',
    locale: '[locale code]',
    type: 'website', // or 'article' for case studies/blog
  },
  twitter: {
    card: 'summary_large_image',
    title: '[Page Title]',
    description: '[Description]',
  },
};
```

## Heading Hierarchy

Every page must have a clean, semantic heading structure:

- **Exactly one `<h1>` per page** — the primary topic/keyword of the page
- **`<h2>`** for major sections — these should reflect the page's content outline
- **`<h3>`** for subsections within an `<h2>` — never skip from h2 to h4
- **`<h4>`-`<h6>`** for deeper nesting — rare, only if content warrants it

**Common mistakes to avoid:**
- Using headings for visual styling instead of semantic structure (use CSS for visual size)
- Multiple h1 tags on a page
- Skipping heading levels (h2 → h4)
- Putting the company name in h1 on every page (only on homepage)

## Internal Linking Strategy

Pages should cross-link based on content relationships:

| From | Link To | Purpose |
|------|---------|---------|
| Homepage service blocks | Individual service pages | Route visitors to relevant depth |
| Service pages | Related service pages | Show breadth of capabilities |
| Service pages | Relevant case studies | Prove capability with evidence |
| Case studies | Related service pages | Connect evidence back to capabilities |
| About page | Services hub | "See what we do" |
| All pages | Contact page | Conversion path (via CTA sections) |
| All non-homepage pages | Homepage | Via breadcrumbs and logo link |

**Rules:**
- Use descriptive anchor text, not "click here" or "read more"
- Every page should have at least 2-3 internal links to other pages
- The contact page should be reachable from every page (header CTA + footer + inline CTAs)

## Image SEO

- **All images via `next/image`** — required for optimization, lazy loading, responsive sizing
- **Alt text is mandatory** — describe what the image shows, include relevant keywords naturally. Not "image1.jpg" or "photo". For decorative images, use `alt=""`.
- **File names should be descriptive** — `workshop-cnc-machine.jpg` not `IMG_3847.jpg`
- **Include width and height** — prevents layout shift (CLS)
- **Use the `sizes` prop** — tells the browser which image size to load at each viewport width
- **Hero images** — prioritize with `priority={true}` for above-the-fold images to improve LCP

## Canonical URLs

- Every page must have a canonical URL pointing to itself
- For multilingual pages, each locale version is its own canonical
- Use `hreflang` alternate links to connect locale versions:
```tsx
export const metadata: Metadata = {
  alternates: {
    canonical: '/da/services/welding',
    languages: {
      'da': '/da/services/welding',
      'en': '/en/services/welding',
    },
  },
};
```

## Sitemap & Robots

- **`src/app/sitemap.ts`** must include every built page with all locale alternates
- **`src/app/robots.ts`** must allow crawling of all public pages, disallow `/api` and `/_next`
- After adding new pages, verify they appear in the sitemap output

## Validation Checklist (for Step 9)

When validating SEO after build:
- [ ] Every page has a unique title tag (no duplicates)
- [ ] Every page has a unique meta description
- [ ] Every page has exactly one h1
- [ ] Heading hierarchy has no skipped levels
- [ ] Every page has appropriate JSON-LD structured data
- [ ] Every page has Open Graph tags
- [ ] Every non-homepage page has breadcrumb markup
- [ ] All images use `next/image` with descriptive alt text
- [ ] All pages appear in sitemap.ts with hreflang alternates
- [ ] Internal links use descriptive anchor text
- [ ] Every page has at least 2 internal links to other pages
- [ ] Contact page is reachable from every page
- [ ] Canonical URLs are set correctly
- [ ] No duplicate content across locale versions (each has unique canonical)

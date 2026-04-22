---
name: redirect-mapping
description: This skill handles mapping old website URLs to new website URLs during a site redesign, preserving SEO equity and preventing broken links. Use this skill when the user mentions "redirects", "URL mapping", "301 redirects", "old site URLs", "SEO migration", "preserve search ranking", or during Step 4 of the redesign pipeline after the site plan has been established. Also trigger when the user is concerned about losing Google rankings during a site migration, or when checking production readiness for redirect coverage.
---

# Redirect Mapping — SEO Migration

Map every old URL to its new destination. This is the difference between launching a redesigned site and destroying years of accumulated search ranking.

## Why This Matters

Every URL on the old site that has search ranking, inbound links, or bookmarks represents accumulated SEO equity. Without proper 301 redirects, that equity evaporates at launch:
- Google drops pages from the index within days
- Inbound links from partners, directories, and press become dead ends
- Bookmarked pages show 404 errors
- Search ranking can take months to recover — if it recovers at all

## When to Run

This skill runs in **Step 4** of the pipeline, after the site plan (Step 3) has defined the new URL structure. It requires:
1. An old site URL inventory (collected during Step 1's crawl)
2. The populated `SITE_PLAN_TEMPLATE.md` with the new site architecture

## Process

### 1. Collect the Old URL Inventory

If the analyze-existing-site skill (Step 1) already collected internal links, start from that list. Then supplement:

**Sitemap check:**
- Fetch `{old-domain}/sitemap.xml` — this is the most complete URL list the old site publishes
- If no sitemap exists, fall back to the links discovered during Step 1's crawl
- Also try `{old-domain}/sitemap_index.xml` for multi-sitemap sites

**Robots.txt check:**
- Fetch `{old-domain}/robots.txt` — look for `Sitemap:` directives and `Disallow:` rules
- Disallowed paths may still need redirects if they have inbound links

**Search Console (if accessible):**
- If the user has Google Search Console access, the "Pages" report shows which URLs Google has indexed
- The "Links" report shows which pages have the most inbound links — these are the highest-priority redirects

### 2. Categorize Old URLs

For each discovered URL, categorize:

| Category | Examples | Redirect Strategy |
|----------|---------|------------------|
| **Page** | `/about`, `/services/welding`, `/da/kontakt` | Map to equivalent new page |
| **Localized page** | `/en/about`, `/da/om-os` | Map to new locale-prefixed equivalent |
| **Asset** | `/images/logo.png`, `/docs/brochure.pdf` | Keep at same path in `public/` or redirect if moved |
| **Dynamic/query** | `/page?id=123`, `/products?cat=5` | Map to nearest new equivalent or homepage |
| **Dead/broken** | Already 404 on old site | No redirect needed |
| **Admin/system** | `/wp-admin`, `/wp-login.php`, `/?preview=true` | No redirect needed |
| **Pagination** | `/news/page/2`, `/blog?page=3` | Redirect to section root unless new site has pagination |

### 3. Map Old → New

For each page-type URL, find the best new destination:

**Mapping rules:**
- Old homepage → New homepage (exact locale match)
- Old service page → New service page (by content match, not URL match)
- Old about/team/history → New about page
- Old contact → New contact
- Old case study → New case study (if migrated) or cases listing
- Old blog post → Blog post (if blog exists) or homepage
- Old legal pages → New legal pages
- Any URL with no clear match → Flag for human decision

**Locale handling:**
- Old `/en/about` → New `/en/about`
- Old `/da/om-os` → New `/da/about` (URL structure may change; redirect preserves access)
- If old site had no locale prefix but new site does → Redirect `/about` → `/da/about` (default locale)

### 4. Generate Redirect Configuration

Write redirects into `next.config.ts` using the `redirects()` function:

```typescript
// In next.config.ts
async redirects() {
  return [
    // Service pages
    {
      source: '/old-service-path',
      destination: '/da/services/new-service-slug',
      permanent: true, // 301
    },
    // Locale migration (old site had no locale prefix)
    {
      source: '/about',
      destination: '/da/about',
      permanent: true,
    },
    // Catch-all for old blog (if blog not migrated)
    {
      source: '/blog/:slug*',
      destination: '/da',
      permanent: true,
    },
  ];
}
```

**Rules for the config:**
- Use `permanent: true` for all redirects (301) — this is a permanent site restructure
- Order specific rules before catch-all patterns
- Use `:slug*` for wildcard matching of old path segments
- Test that no redirect creates a loop (A → B → A)
- Test that no redirect points to a page that doesn't exist yet

### 5. Document in redirects.md

Write a human-readable mapping document at project root:

```markdown
# Redirect Mapping — [Company Name]

Generated during site redesign. Maps old site URLs to new URLs.

## Summary
- **Total old URLs discovered:** [N]
- **Mapped to new pages:** [N]
- **Redirected to section roots:** [N]
- **No redirect needed (dead/admin):** [N]
- **Needs human decision:** [N]

## Mapping Table

| Old URL | New URL | Type | Notes |
|---------|---------|------|-------|
| `/` | `/da` | Homepage | Default locale |
| `/about` | `/da/about` | Page | Direct equivalent |
| `/services/welding` | `/da/services/welding` | Service | Slug preserved |
| `/blog/some-post` | `/da` | Catch-all | Blog not migrated |
| `/partner-page` | **???** | Needs decision | Has 12 inbound links |

## Needs Human Decision
These old URLs have inbound links or search ranking but no clear new destination:

- [ ] `/partner-page` — 12 inbound links. Suggest: redirect to about or create a partners section?
- [ ] `/old-product-line` — Ranked #3 for "widget manufacturing". Product discontinued?
```

### 6. Validate

Before considering redirects complete:
- [ ] Every old page URL has a destination or explicit "no redirect needed" reason
- [ ] No redirect loops exist
- [ ] High-value pages (most inbound links, highest ranking) have exact-match redirects, not catch-alls
- [ ] Locale handling is consistent
- [ ] The `redirects()` config in `next.config.ts` is syntactically valid
- [ ] Redirects to new pages reference URLs that will actually exist when the site launches

## Edge Cases

**Old site had no locale prefix, new site does:**
Redirect every old path to the default locale equivalent. Example: `/about` → `/da/about`.

**Old site used query parameters:**
`/products?id=123` can't be matched by Next.js path redirects. Use middleware rewrites or document as a known limitation.

**Old site had hundreds of blog posts:**
If the blog is not being migrated, redirect the blog listing and all posts to the homepage or a relevant section. Don't create individual redirects for each post unless specific posts have significant ranking.

**Old site was on a subdomain:**
Subdomain redirects (e.g., `blog.example.com` → `example.com/blog`) require DNS configuration, not just Next.js redirects. Flag these for the user.

**Multiple old domains:**
If the company has multiple domains pointing to the old site, all need redirect handling. Flag for the user during the approval gate.

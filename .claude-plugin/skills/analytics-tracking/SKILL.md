---
name: analytics-tracking
description: Event tracking patterns, analytics setup, cookie consent integration, and Search Console continuity for website redesigns. Use this skill when implementing forms with submission tracking, CTAs with click tracking, or configuring analytics to respect cookie consent. Also use during production readiness checks to verify analytics are working correctly. Trigger when the user mentions "analytics", "tracking", "events", "Search Console", "Google Analytics", or when checking that forms and CTAs are properly tracked.
---

# Analytics & Tracking — Implementation Patterns

Track what matters without compromising privacy. Analytics should measure site effectiveness while respecting cookie consent.

## Analytics Stack

The template uses **Vercel Analytics** (`@vercel/analytics/next`). This provides:
- Page views and visitor counts
- Core Web Vitals monitoring
- No cookie requirement for basic analytics (privacy-friendly)

For companies wanting deeper tracking, **Google Analytics 4 (GA4)** can be added alongside — but must be gated behind cookie consent.

## Cookie Consent Integration

**Critical rule:** Only strictly necessary cookies may be set without consent. Analytics and marketing scripts must be blocked until the user consents.

### Implementation Pattern
```tsx
// In the locale layout or analytics wrapper
import { Analytics } from '@vercel/analytics/next';

function AnalyticsWrapper() {
  // Vercel Analytics is privacy-friendly (no cookies by default)
  // but should still respect user preferences
  const consent = getCookieConsent(); // from cookie consent component

  return (
    <>
      {/* Vercel Analytics — always load (cookieless) */}
      <Analytics />

      {/* GA4 or marketing scripts — only with consent */}
      {consent === 'accepted' && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
```

## Event Tracking

### Form Submissions
Every form submission should fire a tracking event:

```tsx
// In the form's Server Action or onSubmit handler
async function submitContactForm(formData: FormData) {
  'use server';

  // Process the form...

  // Track the event (server-side)
  // Vercel Analytics tracks page views automatically
  // For custom events, use the client-side track function
}

// Client-side tracking after successful submission
import { track } from '@vercel/analytics';

function onSubmitSuccess() {
  track('form_submission', {
    form_type: 'contact',      // or 'quote_request', 'job_application'
    page: '/contact',
  });
}
```

### CTA Clicks
Track primary CTA clicks to measure conversion paths:

```tsx
import { track } from '@vercel/analytics';

function CTAButton({ label, href, page }: CTAProps) {
  return (
    <Link
      href={href}
      onClick={() => track('cta_click', { label, page })}
    >
      {label}
    </Link>
  );
}
```

### Key Events to Track

| Event | When | Properties |
|-------|------|-----------|
| `form_submission` | Contact/quote form submitted | `form_type`, `page` |
| `cta_click` | Primary CTA clicked | `label`, `page`, `destination` |
| `phone_click` | Phone number link clicked | `page` |
| `email_click` | Email link clicked | `page` |
| `language_switch` | Language changed | `from_locale`, `to_locale` |
| `download` | Document/brochure downloaded | `file_name`, `page` |

## Search Console Continuity

When migrating from an old site:

1. **Verify the new site** in Google Search Console before launch
2. **Submit the new sitemap** (`/sitemap.xml`) after launch
3. **Monitor the "Pages" report** for 2-4 weeks after launch — watch for indexing drops
4. **Check redirect coverage** — Search Console will show "Page with redirect" for properly redirected old URLs
5. **If the domain changes:** use the "Change of Address" tool in Search Console

## Production Readiness Checks

- [ ] Vercel Analytics component is present in the locale layout
- [ ] Analytics respects cookie consent (marketing/tracking scripts gated)
- [ ] Contact form fires `form_submission` event on success
- [ ] Primary CTAs fire `cta_click` events
- [ ] Phone and email links fire click events
- [ ] Google Search Console verified for the domain (if applicable)
- [ ] Sitemap submitted to Search Console
- [ ] No tracking scripts load before cookie consent is given (except cookieless analytics)

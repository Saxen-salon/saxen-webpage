# Redirect Map — saxen.dk Redesign

Generated: 2026-04-22 (Step 4 of /redesign pipeline)
Old domain: https://www.saxen.dk/
New URL structure: Next.js App Router with next-intl (primary locale: da)

## Redirect Table

| Old URL | New URL | Type | Priority | Notes |
|---------|---------|------|----------|-------|
| `/treatments` | `/ydelser` | 301 | High | Services/prices page relocated to Danish slug |
| `/employees` | `/team` | 301 | High | Staff page relocated to English slug |
| `/cookiepolicy` | `/cookie-politik` | 301 | Low | Legal page renamed to Danish slug |

## URLs with no redirect needed

| URL | Reason |
|-----|--------|
| `/` | Same path — homepage stays at root |
| External booking URL (saxenhjoerring.bestilling.nu) | External domain — not our redirect |
| `/wp-admin`, `/?page_id=*` | Not present on old site |

## Implementation

Add to `next.config.ts` under the `redirects` async function:

```ts
async redirects() {
  return [
    { source: '/treatments', destination: '/ydelser', permanent: true },
    { source: '/employees', destination: '/team', permanent: true },
    { source: '/cookiepolicy', destination: '/cookie-politik', permanent: true },
  ];
},
```

## SEO Notes

- Old site had no XML sitemap, so search equity is limited
- `/treatments` and `/employees` are the pages most likely to have any search indexing
- All redirects are 301 (permanent) — do not use 302

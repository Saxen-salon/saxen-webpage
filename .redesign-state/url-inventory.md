# URL Inventory

Complete list of URLs discovered during the Step 1 old-site crawl. Consumed by the `redirect-mapping` skill in Step 4 so it doesn't have to re-crawl.

## Schema

```
### Old site: https://oldsite.example/

**Crawled:** YYYY-MM-DDThh:mm
**Source:** homepage nav + sitemap.xml + internal link discovery

## URLs

| URL | Category | Notes |
|-----|----------|-------|
| https://oldsite.example/ | Homepage | Primary entry point |
| https://oldsite.example/about | About | |
| https://oldsite.example/services/welding | Service detail | Flagship service |
| ... | ... | ... |
```

**Category values:** `Homepage`, `About`, `Services hub`, `Service detail`, `Cases listing`, `Case detail`, `Contact`, `Legal`, `Blog`, `Job`, `Asset`, `Dynamic/query`, `Admin/system` (no redirect), `Dead/broken` (no redirect).

---

### Old site: https://www.saxen.dk/

**Crawled:** 2026-04-22T21:08
**Source:** Homepage nav + internal link discovery + HTML inspection

## URLs

| URL | Page type | Priority | Notes |
|-----|-----------|----------|-------|
| https://www.saxen.dk/ | Homepage | High | Three-column layout: welcome text, opening hours + booking CTA, contact/map. Only meaningful brand copy on the site. |
| https://www.saxen.dk/treatments | Services hub | High | Full price list for 35+ services across 5 categories. Text-only, no images. Title: "Behandlinger & priser hos Saxen" |
| https://www.saxen.dk/employees | Staff directory | High | Six staff members listed with first name + portrait photo. No bios, roles, or specialisms. Title: "Personale | Mød vores dygtige medarbejdere her" |
| https://www.saxen.dk/cookiepolicy | Legal | Low | Cookie consent policy. Standard Admind template text. No unique company content. |
| https://saxenhjoerring.bestilling.nu | External — Booking | High | Third-party Admind booking system. Login-gated — no service/pricing content visible without account. Must be linked from new site. |

## URLs NOT found (confirmed absent)

| Expected URL | Status | Notes |
|-------------|--------|-------|
| /about or /om-os | 404 | No about/company page exists on old site |
| /contact or /kontakt | 404 | Contact info is inline on homepage, no dedicated page |
| /cases or /referencer | 404 | No portfolio or case studies exist |
| /jobs or /karriere | 404 | No careers page |
| /news or /nyheder | 404 | No blog or news section |
| /sitemap.xml | 404 | No XML sitemap |
| Facebook / Instagram | Not linked | No social media links from the site (may exist independently — ask client) |

## Summary

The old site has **5 pages total** (3 content pages + 1 legal + 1 external booking). It is an extremely minimal site — essentially a digital business card with a price list. There are no sections to carry forward beyond the core content (services, staff, contact/hours). The redesign will be building significant new structure.

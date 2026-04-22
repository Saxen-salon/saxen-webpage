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

(No inventory recorded yet. The `brand-intelligence` agent writes here during Step 1.)

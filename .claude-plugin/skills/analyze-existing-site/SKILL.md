---
name: analyze-existing-site
description: Runbook for extracting company identity from an existing website — crawl strategy, image cataloging, screenshot capture, extraction fields, brand-strength rubric. This is a **procedure reference** read by the `brand-intelligence` agent (not by the orchestrator inline). If the user mentions "analyze the existing site", "extract company info", "crawl the old site", or similar, the orchestrator spawns `brand-intelligence`; the agent then reads this file for the detailed how-to. Do not execute this procedure inline — the whole point of having a dedicated agent is to keep crawl state out of the orchestrator's context.
---

# Analyze Existing Website — Runbook for the brand-intelligence Agent

Procedure reference: how to extract company identity from an existing website. Read by the `brand-intelligence` agent as its detailed runbook. The agent's own frontmatter in `.claude-plugin/agents/brand-intelligence.md` defines what it produces; this document defines how.

> **Who reads this:** the `brand-intelligence` agent. Not the orchestrator, not the web-designer. If you're the orchestrator reading this, you have spawned the wrong thing — go back and spawn the agent.

Extract company identity, services, and positioning from an existing website to establish the foundation for a complete redesign. The goal is to understand **who this company is and what they offer** — not to replicate their current design.

## Why This Matters

The existing website — even if it's ugly, outdated, or poorly organized — contains valuable intelligence about the company: what they do, who they serve, how they talk about themselves, and what they consider important enough to put on the web. This skill extracts that intelligence and structures it so the web-designer agent can build something far better while staying true to who the company actually is.

Many websites you'll encounter will be poorly made — a 2010-era WordPress template, stock photos, "Welcome to our website" heroes, and service lists that say "We offer high quality solutions." That's fine. Your job is to extract what's real underneath the bad presentation, and to honestly assess how much usable brand material actually exists.

## Before You Start

1. **Get the domain.** Check `CLAUDE.md` for the **Old site domain** field (labeled `OLD_SITE_DOMAIN` in the template). If it contains a real URL (not a placeholder), use that — do NOT ask the user for it again. Only ask if the field is missing or still has a placeholder value.
2. **Read the extraction template.** Open `.claude-plugin/skills/company-brand/references/extraction-template.md` to see exactly which fields need populating and the output format to use — that's your extraction target.

## Crawl Strategy

Use a **discover-then-fetch** approach. Every website has its own URL structure — guessing paths wastes fetches on 404s. Instead, let the site tell you where its content lives.

### Step 1 — Discover the site map

Fetch the **homepage** (`/`). This single page is the most information-dense starting point because it contains:
- The **navigation menu** — the company's own table of contents for their site
- The **footer** — often links to contact info, certifications, legal, and secondary pages not in the main nav
- **Hero and body content** — tagline, primary services, trust signals, value propositions
- **Language switcher** (if present) — reveals supported languages and URL structure (`/en/`, `/da/`, subdomain patterns)

From the homepage HTML, extract every internal link. Group them by likely purpose:

| Category | How to identify | What you'll extract |
|----------|----------------|---------------------|
| **About / Company** | Nav items with words like "about", "company", "team", "history", "who we are" (in any language) | History, mission, values, team, founding year |
| **Services / Products** | Nav sections with "services", "products", "solutions", "what we do", or a dropdown of service names | Service catalog, capabilities, specializations |
| **Cases / Portfolio** | Links mentioning "cases", "projects", "portfolio", "references", "work" | Industries served, client types, project scale |
| **Contact** | Links with "contact", "get in touch", or footer contact blocks | Address, phone, email, locations |
| **Certifications / Quality** | Links to "quality", "certifications", "ISO", or footer badge links | Standards, accreditations |
| **Careers** | Links with "jobs", "careers", "join us" | Culture signals, team size hints |
| **News / Blog** | Links to "news", "blog", "updates", "articles" | Recent activity, thought leadership topics |

Don't try to match exact URL paths — match on link text and context. A Danish site might have `/om-os` for "about" and `/ydelser` for "services", and that's fine — you'll discover the actual URLs from the nav.

### Step 2 — Fetch by priority

With the site map in hand, fetch pages in priority order. After each wave, assess whether you have enough to fill the extraction template fields — stop early if you do.

**Priority 1 — Identity & services** (fetch in parallel):
- The **About/Company** page — the richest source of company facts
- The **Services hub** page — the full service catalog
- The **Contact** page — location, address, direct details

**Priority 2 — Depth** (only if gaps remain after Priority 1):
- **1-2 individual service pages** — pick the most prominent ones from the nav for technical depth
- **Cases/Portfolio** page — for industry and client intelligence

**Priority 3 — Supporting signals** (only if specific extraction template sections are still empty):
- Certifications/Quality page
- Careers page (team size, culture)
- News/Blog (recent activity, tone samples)

### Crawl tips
- Use `WebFetch` for each page.
- The homepage navigation is your primary source of truth for URL discovery — trust it over guessing.
- If the footer contains contact details inline (address, phone, email), you may not need to fetch the contact page separately.
- If the site uses JavaScript-heavy rendering and WebFetch returns minimal content, extract what you can from meta tags, `<noscript>` content, and structured data (`<script type="application/ld+json">`).

## Image Extraction & Cataloging

While crawling, collect images that could be reused in the redesign. The existing site's photos are valuable — they're authentic to the company and give the owners a sense of familiarity with the new site.

### What to collect

For each page you fetch, identify images worth keeping:

| Category | What to look for | Where to save |
|----------|-----------------|---------------|
| **Logo** | Site logo, favicon, logo variants (light/dark) | `public/images/brand/` |
| **Team** | Staff photos, leadership headshots, group photos | `public/images/team/` |
| **Facility** | Building exterior, workshop, office, equipment | `public/images/facility/` |
| **Products/Services** | Product photos, service illustrations, process shots | `public/images/services/` |
| **Cases** | Project photos, client work, before/after shots | `public/images/cases/` |
| **Hero/Banner** | Large header images, background photos | `public/images/hero/` |

### How to collect

1. **Download each image** using `WebFetch` or `curl` to the appropriate `public/images/` subdirectory
2. **Rename descriptively** — `team-workshop-group.jpg` not `IMG_3847.jpg`
3. **Skip** generic stock photos, tiny icons/UI sprites, and decorative borders — these have no reuse value

### Build the image catalog

After downloading, create `public/images/IMAGE_CATALOG.md`:

```markdown
# Existing Site — Image Catalog

Images extracted from the old website for potential reuse.

## Assessment Key
- **REUSE** — Good quality, relevant, use as-is
- **REUSE-IF** — Usable but needs context (e.g., only if we build a cases page)
- **REPLACE** — Keep as placeholder, but flag for a better version
- **SKIP** — Not worth carrying forward

## Images

### Brand
| File | Original context | Assessment | Notes |
|------|-----------------|------------|-------|
| `brand/logo-main.svg` | Site header | REUSE | Vector, clean |

### Team
| File | Original context | Assessment | Notes |
|------|-----------------|------------|-------|
| `team/workshop-group.jpg` | About page | REUSE | Authentic, good quality |

### Facility
...

### Services
...

### Cases
...
```

### Evaluation criteria

When assessing each image, consider:

- **Resolution** — Is it large enough for modern displays? (min ~800px wide for content images, ~1600px for heroes)
- **Relevance** — Does it match the page structure we'll likely build?
- **Authenticity** — Real company photos are almost always better than stock photos, even if slightly lower quality. They're *theirs*.
- **Brand fit** — Does the image feel consistent with the brand attributes in the brand skill?
- **Technical quality** — Is it blurry, badly cropped, or watermarked?

**Default to keeping images.** The bar for "REPLACE" should be high — a slightly imperfect real photo of their workshop beats a perfect stock photo every time. Only flag REPLACE when the image is genuinely unusable (too small, watermarked, or completely irrelevant to the new site structure).

---

## Screenshot Capture (Visual Reference — Not for Reuse)

Separately from the reusable images above, capture rendered **screenshots** of key old-site pages. These exist so downstream agents (design-system, web-designer, customer-perspective reviewer) can see what the old site actually looked like — its visual conventions, layout density, and failure modes — even when the source HTML is scraped-clean of its styling.

### Why screenshots are worth capturing

- **Design system step** can see the old site's visual starting point to make an informed "move away from this" decision (colors, spacing density, imagery style)
- **Customer-perspective reviewer** can compare old-vs-new when evaluating whether the redesign is actually an improvement
- **Web-designer** can reference what sections/content the old site emphasized visually, independent of what the extracted text captured

Screenshots are **not for reuse** in the new site. They are reference material only. The redesign discards the old visual direction entirely.

### What to capture

Capture full-page screenshots (not just viewport) of:
1. **Homepage** — always
2. **About / Company page** — the page most likely to reveal brand voice and visual identity
3. **Services hub page** — how services are currently grouped/presented
4. One **individual service page** — the deepest level of content depth available
5. **Contact page** — how they currently frame conversion

If a page from the priority list isn't present on the old site, skip it rather than forcing a substitute.

### How to capture

Use browser automation when available (e.g., `mcp__claude-in-chrome__computer` for full-page screenshots). If browser automation isn't available in the environment, skip screenshot capture and note it in the Content Gaps summary — downstream agents can still function without screenshots; they just lose a reference signal.

Save to `public/images/old-site-screenshots/` with descriptive filenames:
- `homepage.png`
- `about.png`
- `services-hub.png`
- `service-<name>.png`
- `contact.png`

### Catalog screenshots separately

In `IMAGE_CATALOG.md`, add a distinct **Old-Site Screenshots** section at the end:

```markdown
## Old-Site Screenshots (Reference Only — Not For Reuse)

Full-page renders of key old-site pages for design-system and review agents to reference. These are **not** published to the new site.

| File | Page captured | Captured on | Notes |
|------|--------------|-------------|-------|
| `old-site-screenshots/homepage.png` | https://oldsite.com/ | 2026-04-22 | Full page, 1440px viewport |
| `old-site-screenshots/about.png` | https://oldsite.com/about | 2026-04-22 | |
```

This keeps screenshots clearly separated from the reusable-image catalog so the web-designer never confuses a reference render with a publishable image.

---

## What to Extract

For each page you fetch, look for these specific data points. Not every site will have all of them — extract what's available and note what's missing.

### Company Facts
| Field | Where to Look |
|-------|--------------|
| Company name | Page title, logo alt text, footer, about page header |
| Founded year | About page, footer ("since 19XX"), company history section |
| Location(s) | Contact page, footer, about page, Google Maps embed |
| Employee count | About page ("team of XX"), careers page, footer |
| Primary specialty | Homepage hero, meta description, h1 tags |
| Certifications | Footer badges, dedicated quality page, about page |
| Markets served | Service pages, case studies (client industries), about page |
| Languages | Language switcher, hreflang tags, URL structure (`/en/`, `/da/`, `/de/`) |

### Brand Positioning
| Field | Where to Look |
|-------|--------------|
| Tagline / motto | Homepage hero, logo area, footer, meta title |
| Value proposition | Homepage hero copy, about page opening paragraph |
| Competitive advantages | Homepage sections below hero, about page, service page intros |
| What makes them different | "Why us" sections, about page, USP callouts |

### Services & Capabilities
| Field | Where to Look |
|-------|--------------|
| Service categories | Services hub page, homepage service blocks, main navigation |
| Service details | Individual service pages, capability descriptions |
| Process / methodology | Service pages, about page, dedicated process sections |
| Technical specifications | Service detail pages, product data sheets |
| Industries served | Case studies, service pages ("for [industry]"), client logos |

### Audience Signals
| Field | Where to Look |
|-------|--------------|
| Primary audience types | Homepage messaging tone, service page language, CTA text |
| B2B vs B2C indicators | Contact forms (company name field?), pricing model, language formality |
| Decision-maker signals | Content depth, technical detail level, ROI language |
| Geographic focus | Contact locations, service area mentions, language selection |

### Tone of Voice
| Field | Where to Look |
|-------|--------------|
| Formality level | Pronoun use (we/our vs the company), sentence structure |
| Technical depth | Jargon usage, specification detail, assumed knowledge |
| Emotional register | Warm/corporate/clinical/energetic — how does the copy feel? |
| Per-language variation | Compare tone across language versions if available |

## Brand Strength Assessment

After crawling, before writing the brand skill, assess the overall strength of what you found. This determines how much the downstream pipeline can rely on the extracted data vs. needing to generate brand identity from scratch.

### Rating Scale

| Rating | Meaning | What the old site has | What to do |
|--------|---------|----------------------|------------|
| **Strong** | Rich, extractable brand identity | Clear positioning, real differentiators, specific services with depth, case studies or proof points, authentic tone | Extract and synthesize confidently. The brand skill will be well-populated. |
| **Moderate** | Useful facts but weak messaging | Real services listed, contact info, some company history — but generic copy, vague claims ("high quality", "customer-focused"), no clear positioning | Extract the facts (services, location, certifications). For positioning, tone, and competitive advantages: **infer from what the company actually does** rather than copying their weak messaging. Flag inferred sections clearly. |
| **Thin** | Minimal useful content | Template-like site with stock photos, near-empty pages, "Welcome to our website" energy, no about page or a one-paragraph one, services listed as bullet points with no detail | Extract whatever hard facts exist (company name, location, service names). For everything else: mark as "Needs development — not extractable from current site." **Trigger supplementary research** (see below). |

### Supplementary Research (for Moderate and Thin brands)

When the old site doesn't provide enough to populate the brand skill meaningfully, look beyond the website:

1. **Google the company name** — look for:
   - Google Business Profile (reviews, photos, hours, description)
   - Industry directory listings (may have better descriptions than the company's own site)
   - LinkedIn company page (often has a better "About" than the website)
   - News articles or press mentions
   - Trade association memberships

2. **Check competitors** — search for similar companies in the same industry and region:
   - What services do they highlight? (Helps identify services the target company likely offers but didn't articulate well)
   - What positioning do they use? (Helps identify what this company should differentiate against)
   - What certifications are standard in this industry? (Helps identify what to ask the client about)

3. **Infer from the domain** — the company's industry, location, and service type often tell you more about their audience and positioning than their weak website copy does. A Danish manufacturing company with ISO certifications serves different buyers than a creative agency — use that domain knowledge.

**Important:** Clearly distinguish between extracted facts, inferred conclusions, and supplementary research in the brand skill. Use markers:
- Direct facts: no marker needed
- Inferred: "*(inferred from [source/reasoning])*"
- From supplementary research: "*(from [Google Business Profile / LinkedIn / industry context])*"
- Unknown: "Unknown — ask client"

### Include the Assessment in Output

Add a **Brand Strength Assessment** section at the top of the populated brand skill, before Company Facts:

```markdown
## Brand Strength Assessment

**Rating:** [Strong / Moderate / Thin]
**Sources used:** [Old website, Google Business Profile, LinkedIn, competitor analysis, industry knowledge]
**Confidence level:** [High — most fields directly extracted / Medium — mix of extraction and inference / Low — significant inference and client input needed]

**What was strong:** [e.g., "Clear service catalog, real case study photos, specific certifications"]
**What was weak or missing:** [e.g., "No positioning statement, generic 'About Us' with no story, no competitive differentiation, stock photography only"]
**Key questions for client:** [The 3-5 most important things to verify or fill in]
```

This assessment tells downstream agents (content-strategist, site-planner, web-designer) how much they can trust the brand data and where they need to exercise more creative judgment.

---

## Output — Populate the Brand Skill

After crawling, write the results into `.claude-plugin/skills/company-brand/SKILL.md`, replacing the stub body with a clean populated document. **Preserve the YAML frontmatter** (the `---` block with name and description) — only replace the markdown body below it.

Use the **Output Format** section in `.claude-plugin/skills/company-brand/references/extraction-template.md` for the exact structure. The populated skill should contain only real data and "Unknown — ask client" markers — no placeholder values, no HTML comments, no template scaffolding.

### Key synthesis guidelines

| Section | How to Fill It |
|----------------------|----------------|
| **Company Facts** | Direct extraction — name, year, location, etc. Use "Unknown — ask client" for anything not found |
| **Brand Positioning** | Synthesize from homepage hero + about page. The positioning statement should capture what makes them the right choice, not just what they do |
| **Competitive Advantages** | Look for "why us" signals, homepage feature blocks, about page highlights. Typically 3-5 advantages |
| **Messaging Rules** | Infer from what the site emphasizes (lead with) vs. buries (don't lead with). What kind of customer does the content target? |
| **Brand Attributes** | Synthesize 4-5 qualities the site tries to communicate (e.g., precision, reliability, innovation). Base these on recurring themes across pages |
| **Audience Table** | Infer 3-4 audience segments from CTA types, content depth, language formality, and service descriptions |
| **Tone of Voice** | Analyze the actual writing style across pages. Note formality, technical depth, emotional register. Compare across languages if multilingual |
| **Industry-specific facts** | If the company has technical capabilities (machinery, capacity, tolerances, materials), add these below Company Facts |

## Handling Missing Information

Not everything will be on the website. For any field you can't confidently extract:

1. **Mark it clearly** with "Unknown — ask client" so nothing gets silently skipped
2. **Make reasonable inferences** where the evidence supports it (e.g., if the site has 50 team photos, you can say "~50 employees" even if no number is stated)
3. **Never fabricate** — if the site doesn't mention certifications, don't invent them

After writing the brand skill, produce a brief **Content Gaps** summary listing what still needs client input:

```
## Content Gaps — Needs Client Input
- [ ] Exact founding year (about page says "decades of experience" but no year)
- [ ] Employee count
- [ ] Specific certifications (ISO, industry-specific)
- [ ] ...
```

## Critical Reminders

- **You are extracting identity, not design.** Ignore colors, fonts, layouts, animations. The existing site's visual design is being thrown away entirely. Focus only on the *content* and *messaging*.
- **Read between the lines of bad copy.** A poorly-written "About Us" page still contains real facts about the company. Extract the facts even when the presentation is terrible. A company that writes "We provide high quality solutions for our customers" probably has real capabilities — they just can't articulate them. Look at their service pages, case photos, and certifications for the substance behind the fluff.
- **Don't copy bad messaging — improve it.** If the site says "Welcome to [Company]! We are a leading provider of..." — that's not a positioning statement worth extracting. Instead, infer what they actually do well from the evidence (services offered, certifications held, years in business, client types served) and write a positioning statement that reflects reality.
- **Synthesis over copy-paste.** Don't just dump raw text from the site. Synthesize, structure, and improve — while staying faithful to what the company actually is.
- **Be honest about what you don't know.** A thin brand skill with honest "Unknown — ask client" markers is far more useful than one padded with fabricated positioning statements. The content strategist and web-designer can work with gaps — they can't work with fiction.
- **The extraction template is your checklist.** Every field in `.claude-plugin/skills/company-brand/references/extraction-template.md` should have a value or an explicit "ask client" note in the populated SKILL.md when you're done.
- **Also update CLAUDE.md.** After populating the brand skill, update the `CLAUDE.md` placeholders with the extracted company name, description, and languages.

## After Analysis

Once the brand skill is populated and images are cataloged, suggest these next steps to the user:
1. Review the extracted company profile for accuracy
2. Review the image catalog at `public/images/IMAGE_CATALOG.md` — flag any images to replace or remove
3. Fill in any "Unknown — ask client" gaps
4. Create the site plan using `SITE_PLAN_TEMPLATE.md`
5. Start building pages with the web-designer agent

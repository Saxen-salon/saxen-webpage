# Website Redesign Kit — Pipeline Flow

> **Purpose:** This is the authoritative reference for the full redesign pipeline. It maps every phase, agent, skill, artifact, run-state file, and data flow. The `/redesign` command orchestrates this pipeline autonomously — see "Execution Mode" for what can block it.
>
> **Keep this updated.** When adding or modifying agents, skills, or pipeline steps, update this document to reflect the change.
>
> **Visual diagrams:** See [FLOW_DIAGRAM.md](FLOW_DIAGRAM.md) for mermaid diagrams of the full pipeline, review loops, data flow, and brand strength adaptation.

---

## Taxonomy

The pipeline's file types fall into six distinct concepts. Calling all non-code content "skills" (the old naming) hid real differences and created contract drift — the new taxonomy is deliberately precise.

| Term | What it is | Example |
|------|-----------|---------|
| **Reference Skill** | Passive markdown document providing knowledge/patterns. Read by whoever needs it; never mutates at runtime. | `company-brand/SKILL.md` (once populated), `page-content/SKILL.md`, `seo-patterns/SKILL.md` |
| **Procedure** | Executable workflow document the orchestrator or an agent follows like a runbook to produce an artifact. The document itself is static; the outputs live elsewhere. | `analyze-existing-site/SKILL.md`, `redirect-mapping/SKILL.md`, `design-system/SKILL.md` (Step 5.1/5.2 process) |
| **Artifact** | Generated, committed output. Authoritative once written. These are the real deliverables of the pipeline. | `design-direction.md`, `content-strategy.md`, populated `SITE_PLAN_TEMPLATE.md`, `redirects.md` |
| **Run-State** | Ephemeral per-project state shared across phases and terminals. Committed for resumption but safe to clear between projects. Lives under `.redesign-state/`. | `.redesign-state/decisions.md`, `.redesign-state/review-findings.md`, `.redesign-state/compliance-log.md`, `.redesign-state/url-inventory.md` |
| **Agent** | Subagent spawned via the `Agent` tool with its own isolated context window and specific tools. Returns results to the orchestrator. | `web-designer`, `architect`, `brand-intelligence` |
| **Command** | User-facing slash command (`.claude/commands/*.md`) that injects a prompt into the current Claude session. | `/redesign`, `/publish`, `/review-architect` |

The **Orchestrator** is the `/redesign` command's run — Claude following those instructions to read state, spawn agents, drain run-state queues, and manage the pipeline. Not a separate process.

Agent **colors** (green, cyan, magenta, etc.) appear in the Claude Code terminal UI to help distinguish which agent produced which output.

### Why this split matters

- **Reference skills are read-only.** If a skill ever writes to itself at runtime, it's a procedure (or a procedure + artifact), not a reference. The populated `company-brand/SKILL.md` is the edge case — it starts as a stub (reference), gets populated by the `brand-intelligence` agent (so the populated file is effectively an artifact that *pretends* to be a reference). Treat it as an artifact for write-authority purposes; treat it as a reference everywhere else.
- **Procedures don't hold state.** The procedure document is static instructions. Outputs go to artifacts or run-state. This is what prevents the old "skill file gets mutated during a run" footgun.
- **Run-state is how parallel terminals talk.** Review loops write findings to `.redesign-state/review-findings.md`; the orchestrator drains it. Without this, the multi-terminal review architecture has no transport.

---

## Pipeline Overview

```
  ┌─────────────────────────────────────────────────────────────────────┐
  │                        /redesign (orchestrator)                     │
  │  Reads state → determines current step → executes from there       │
  │  Resumable: can stop and restart at any point                      │
  └────────────────────────────────┬────────────────────────────────────┘
                                   │
     ┌─────────────────────────────┼─────────────────────────────────┐
     │                             │                                 │
     ▼                             ▼                                 ▼
  DISCOVER & PLAN              DESIGN & BUILD                   VALIDATE
  (Steps 1-4)                (Steps 5-6)                      (Steps 7-10)
  Brand, content strategy,   Design system,                   Reviews, SEO,
  site plan, redirects       components, pages                prod readiness
```

---

## Phase Map

| Step | Name | Type | Status | Key Output |
|------|------|------|--------|------------|
| 0 | Resumption Check | Orchestrator | **Exists** | Determines starting step |
| 1 | Brand Intelligence | Agent (`brand-intelligence`) | **Exists** | Populated `company-brand/SKILL.md` + `IMAGE_CATALOG.md` + `.redesign-state/url-inventory.md` |
| 2 | Content Strategy | Agent (`content-strategist`) | **Exists** | Messaging hierarchy, enriched page-design references |
| 3 | Site Planning | Agent (`site-planner`) | **Exists** | Populated `SITE_PLAN_TEMPLATE.md` |
| 4 | Redirect Mapping | Procedure (orchestrator runs `redirect-mapping/SKILL.md`) | **Exists** | `redirects.md` + `next.config.ts` redirects |
| 5 | Design Direction + Design System | Procedure in two sub-steps, executed by `web-designer` agent | **Exists** | `design-direction.md` artifact (5.1) + `globals.css` tokens + populated `design-system/SKILL.md` (5.2) |
| 6 | Build Pages | Agent (`web-designer`, one spawn per page) | **Exists** | Pages in `src/app/[locale]/`, translations in `messages/`, compliance log in `.redesign-state/compliance-log.md` |
| 7 | Review Cycles | Agents (looped, in separate terminals, + final pass) | **Exists** | Findings in `.redesign-state/review-findings.md`, fixes applied |
| 8 | Content Audit | Orchestrator + `web-designer` for drafting | **Exists** | `[NEEDS:]` summary |
| 9 | SEO Validation | Orchestrator (reads `seo-patterns/SKILL.md`) | **Exists** | Fixed meta, schema, links, sitemap |
| 10 | Production Readiness | Orchestrator | **Exists** | All checks pass |
| 11 | Publish | Command (`/publish`) | **Exists** | Live site on Vercel |

**Step ordering rationale:** Content Strategy (2) runs before Site Planning (3) because messaging gaps inform which pages are justified. Redirect Mapping (4) runs after Site Planning (3) because you need the new URL structure before you can map old URLs to it.

---

## Detailed Flow

### Step 0 — Resumption Check

**What:** Read state files to determine where the pipeline left off.
**Who:** `/redesign` orchestrator (inline logic, no agent).

| Check | File / Location | "Done" means |
|-------|----------------|--------------|
| Brand populated? | `.claude-plugin/skills/company-brand/SKILL.md` | Not the "Not Yet Populated" stub |
| Images extracted? | `public/images/IMAGE_CATALOG.md` | File exists |
| URL inventory captured? | `.redesign-state/url-inventory.md` | Has a real inventory (not just the stub header) |
| Content strategy done? | `content-strategy.md` | File exists with messaging hierarchy |
| Site plan filled? | `SITE_PLAN_TEMPLATE.md` | Has concrete pages, keywords, phases |
| Redirects mapped? | `redirects.md` | File exists |
| Direction brief done? | `design-direction.md` at project root | File exists with selections for all seven strategy categories, Avoid list, identity test, and "What we're moving away from" list |
| Tokenization done? | `.claude-plugin/skills/design-system/SKILL.md` | Skill populated with real tokens (not the stub) |
| Pages built? | `src/app/[locale]/` directories (escape `[locale]` in shell commands) | Which routes exist |
| Review queue empty? | `.redesign-state/review-findings.md` | No entries with `status: pending` |
| Compliance unblocked? | `.redesign-state/compliance-log.md` | Latest per-page entry has no unjustified FAILs |
| Remaining placeholders? | `grep -rn "NEEDS:" src/ messages/` | Count of remaining markers |

Reports: "Steps 1-N are done. Starting from step N+1." Appends a one-line entry to `.redesign-state/decisions.md` recording the resume point, then proceeds.

#### On Failure and Recovery
If a step fails (e.g., build error, agent timeout), the orchestrator should:
1. Report what failed and why
2. Attempt to fix if the issue is clear (e.g., a type error in a newly created file)
3. If unfixable, pause and ask the user for guidance
4. On retry, re-run the resumption check — it will pick up from the failed step

If the user interrupts mid-run with a correction, the orchestrator should ask what needs to change, apply the edits, log the change to `.redesign-state/decisions.md`, and resume — not re-run the entire step from scratch.

---

### Step 1 — Brand Intelligence & Image Extraction

**What:** Crawl the old website to extract company identity, services, positioning, audience, tone. Assess brand strength. Download reusable images. For weak/thin brands, supplement with external research.
**Who:** `brand-intelligence` agent. Reads `analyze-existing-site/SKILL.md` as its runbook. The orchestrator never executes this procedure inline — isolation keeps crawl state (fetched HTML, intermediate parsing) out of the orchestrator's context.
**Tools needed:** WebFetch, WebSearch, Read, Write, Edit, Bash.

#### Inputs
- Old site domain from `CLAUDE.md` field `OLD_SITE_DOMAIN` (or user input if still a placeholder)
- Extraction template: `.claude-plugin/skills/company-brand/references/extraction-template.md`

#### Process
1. Fetch homepage → discover site map from navigation
2. Fetch priority pages (about, services hub, contact)
3. Extract company facts, brand positioning, audience, tone
4. **Assess brand strength** — rate as Strong, Moderate, or Thin based on content quality and completeness
5. **If Moderate or Thin:** run supplementary research — Google Business Profile, LinkedIn, industry directories, competitor sites — to fill gaps the old site can't answer
6. Download reusable images → `public/images/{category}/`
7. Write populated brand skill → `.claude-plugin/skills/company-brand/SKILL.md` (includes Brand Strength Assessment section)
8. Write image catalog → `public/images/IMAGE_CATALOG.md`
9. Update `CLAUDE.md` with extracted company name, description, and languages

#### Brand Strength Scenarios
Many old sites are poorly made — generic templates, stock photos, vague copy. The skill adapts:

| Old Site Quality | Extraction Approach | Brand Skill Quality |
|-----------------|--------------------|--------------------|
| **Strong** — clear positioning, real content, case studies | Direct extraction + synthesis | Well-populated, high confidence |
| **Moderate** — real services but generic messaging | Extract facts, infer positioning from what they *do* not what they *say* | Mix of extracted facts and inferred positioning (marked) |
| **Thin** — template site, near-empty pages, stock everything | Extract hard facts only, heavy supplementary research, mark most sections as needing client input | Skeleton with key questions for client, clear about what's inferred vs. confirmed |

#### Outputs
- Populated `company-brand/SKILL.md` — includes Brand Strength Assessment rating, source attribution for inferred data, and key questions for client
- `public/images/IMAGE_CATALOG.md` with assessment ratings (may be sparse for thin-brand sites) + a separate **Old-Site Screenshots** section for reference-only renders
- `public/images/old-site-screenshots/` — full-page screenshots of homepage, about, services hub, one service page, contact (reference material for downstream agents, not for reuse)
- `.redesign-state/url-inventory.md` — complete URL list discovered during the crawl, consumed by the `redirect-mapping` procedure in Step 4
- Content Gaps summary listing what needs client input

#### Status Update
Briefly report the Brand Strength Assessment rating and key facts extracted, then proceed to Step 2.

---

### Step 2 — Content Strategy

**What:** Analyze extracted brand data and identify messaging gaps, missing proof points, and content that needs writing from scratch vs. adapting from the old site.
**Who:** `content-strategist` agent (new, read-only analysis + writes enriched references).
**Tools needed:** Read, Write, Edit, Grep, Glob.

#### Inputs
- Populated `company-brand/SKILL.md`
- `IMAGE_CATALOG.md`
- `page-design` skill references (current content requirements)
- `page-content` skill (drafting patterns)

#### Process
1. Analyze brand skill for: messaging gaps, buried value propositions, jargon overuse, missing proof points
2. Define the 3-5 key messages the site must communicate (messaging hierarchy)
3. For each planned page type, assess: what content exists, what needs writing, what needs client input
4. Enrich page-design references with content-specific requirements
5. Identify tone inconsistencies between what the old site says and what the brand should say

#### Outputs
- `content-strategy.md` — messaging hierarchy, content gap analysis, page-by-page content readiness
- Enriched page-design reference files with content requirements
- List of content that requires client input vs. content that can be drafted

#### Adapts to Brand Strength
The content strategist reads the Brand Strength Assessment from Step 1 and adjusts its approach:

| Brand Strength | Content Strategist Focus |
|---------------|-------------------------|
| **Strong** | Refine existing messaging — tighten, prioritize, identify gaps in proof points |
| **Moderate** | Rewrite messaging from scratch using extracted facts — the old site's words are unreliable but the underlying business is real |
| **Thin** | Build a messaging framework almost from zero — use industry knowledge, competitor positioning, and the few hard facts available to craft a compelling narrative. This is where the most creative work happens. |

#### Why This Matters
The old site often has terrible content — jargon, buried value propositions, missing proof points. Going straight from "extract what exists" to "build pages" risks migrating bad content into a new design. The content strategist asks: "What *should* the site say?" not just "What *does* it say?"

For **thin brands**, this step is not supplementary — it's essential. It's the difference between building a generic site and building one that actually represents the company.

> **Note:** Site Planning (Step 3) can run without this step — if content strategy is skipped, the site-planner works from the brand skill alone. But when available (especially for moderate/thin brands), content strategy output significantly improves scope decisions and content quality.

---

### Step 3 — Site Planning

**What:** Evaluate company scope and decide which pages to build, in what order, with what keywords.
**Who:** `site-planner` agent.
**Tools needed:** Read, Write, Edit, Grep, Glob.

#### Inputs
- Populated `company-brand/SKILL.md`
- `IMAGE_CATALOG.md`
- `content-strategy.md` (when available, informs scope decisions)
- `page-design/SKILL.md` + references
- `page-content/SKILL.md` (drafting patterns, helps assess content feasibility)
- `src/i18n/routing.ts` (configured locales)

#### Process
1. Read brand skill — assess: service count, language count, content evidence
2. **Decide site scope first** — one-page vs. multi-page. One-page is only correct for Thin brands with a single audience and no case study / team / news evidence; default to multi-page otherwise.
3. Apply per-page decision rules (multi-page path) or collapse to the one-page structure
4. Fill `SITE_PLAN_TEMPLATE.md` with: concrete pages, keywords, build phases, SEO clusters, structured data plan

#### Outputs
- Populated `SITE_PLAN_TEMPLATE.md`

#### Status Update
Briefly report the planned pages and build order, then proceed to Step 4.

---

### Step 4 — Redirect Mapping

**What:** Map old site URLs to new site URLs. Preserve SEO equity and prevent broken links.
**Who:** `redirect-mapping` skill (executed by orchestrator).
**Tools needed:** WebFetch, Read, Write, Edit.

#### Inputs
- Old site URL inventory (collected during Step 1 crawl — internal links + sitemap.xml)
- Populated `SITE_PLAN_TEMPLATE.md` (from Step 3 — provides the new URL structure)

#### Process
1. Extract complete URL inventory from old site (crawl sitemap.xml + internal links discovered in Step 1)
2. Categorize old URLs by type (page, image, document, dead link)
3. Map old page URLs → new URLs based on the site plan's URL architecture
4. Generate redirect configuration for `next.config.ts`
5. Flag unmapped URLs for human decision
6. Check for existing inbound links (Search Console data if available)

#### Outputs
- `redirects.md` — full mapping table (old → new, status, notes)
- Redirect entries added to `next.config.ts` `redirects()` function
- List of unmapped URLs requiring human decision

For unmapped URLs, make the best judgment call — redirect to the most relevant new page, or to the homepage as a fallback. Note decisions in `redirects.md`.

---

### Step 5 — Design Direction + Design System

**What:** Establish the visual foundation before any pages are built, in two sub-steps. 5.1 commits to a visual language. 5.2 executes that language into tokens. Splitting these is load-bearing — see "Why Two Sub-Steps" below.
**Who:** `design-system` skill (executed by web-designer agent or dedicated sub-step).
**Tools needed:** Read, Write, Edit.

#### Why Two Sub-Steps

Going straight from brand attributes to tokens is what every AI-built corporate site does, and it's why they all look the same. Token selection in isolation has no vocabulary to argue with, so it defaults to the safest possible combination: mid-blue, gray scale, Inter, micro-radius, three-up feature grids, stock-style photography. The Design Direction sub-step forces explicit commitment to a visual language *before* any token is chosen — and the vocabulary library (`references/visual-vocabulary.md`) prevents the direction brief from collapsing into adjectives. Without both, tokens drift to defaults even when the brand warrants something distinctive.

---

#### Step 5.1 — Design Direction Brief

**Artifact:** `design-direction.md` at the project root.

**Inputs:**
- Populated `company-brand/SKILL.md` (Brand Attributes, Competitive Advantages, Messaging Rules)
- `content-strategy.md` (messaging hierarchy, tone)
- `IMAGE_CATALOG.md` (existing imagery)
- `public/images/old-site-screenshots/` (what to move *away* from)
- **`.claude-plugin/skills/design-system/references/visual-vocabulary.md`** — the strategy library this sub-step selects from

**Process:**
1. Read the visual vocabulary reference fully (seven strategy categories — Typography, Color, Layout, Photography, Shape, Density, Motion — plus a binding Avoid list)
2. Select exactly ONE strategy per category, with a one-sentence brand-story rationale for each
3. Apply the tie-breaker rule: when rationale for a default and non-default is roughly equal, the non-default wins
4. Apply the hard-stop rule: if every selection is a flagged default, re-pick at least two categories
5. Check the combination against the vocabulary's "Conflicting combinations" table
6. Write the full attribute → visual translation table (every brand attribute → concrete visual expression)
7. Build the site-specific Avoid list (vocabulary's binding list + direction-specific prohibitions)
8. Write the one-line identity test

**Output:** `design-direction.md` with selected strategies, rationale, translation table, Avoid list, identity test.

---

#### Step 5.2 — Tokenization

**Artifact:** `src/app/globals.css` design tokens + populated `design-system/SKILL.md`.

**Inputs:**
- `design-direction.md` (binding — this is what tokens execute)
- `references/visual-vocabulary.md` (strategy-specific implementation notes)

**Process:**
1. Derive color tokens from the Color selection (primary/secondary/neutral/accent/semantic scales — hex values constrained by WCAG AA)
2. Execute typography tokens per Typography + Density selections (choose from the direction brief's font candidates)
3. Execute spacing scale per Density selection
4. Execute component pattern tokens per Shape selection
5. Execute interaction tokens per Motion selection
6. Write all tokens to `globals.css` under `@theme inline`
7. Populate `design-system/SKILL.md` body documenting the execution with traceability back to direction brief selections

**Every decision in 5.2 must trace back to a direction brief selection.** If it doesn't, stop and add it to the brief in 5.1 first.

---

#### Outputs
- `design-direction.md` — the committed visual language (from 5.1)
- Updated `src/app/globals.css` with full design token system under `@theme inline` (from 5.2)
- Populated `.claude-plugin/skills/design-system/SKILL.md` — token documentation + direction brief reference (from 5.2)
- Font configuration via `next/font` in layout

#### Status Update
Briefly report the direction in one sentence (copied from the brief), the selected strategies (e.g., "T1 + C1 + L1 + P1 + S1 + D3 + M2"), and primary token choices. Then proceed to Step 6.

#### Adapts to Brand Strength
- **Strong brand:** Existing brand colors/fonts constrain the direction brief — it selects strategies that complement the brand's existing identity. Token execution codifies and extends what exists.
- **Moderate brand:** Some signals exist (logo colors, industry aesthetic). Direction brief uses these as anchors but has wider latitude for Typography, Layout, Motion. Token execution extends rather than overrides.
- **Thin brand:** Maximum latitude. This is where the direction brief is most load-bearing — without an existing identity, a vague brief lets the system drift to defaults. Thin-brand direction briefs must be *more* specific, not less, and should aggressively apply the non-default tie-breaker.

#### Why a Separate Phase (overall Step 5)
Without this step, the web-designer agent invents visual choices page-by-page. Colors drift, typography drifts, spacing drifts — and the drift always lands on the same bland AI default. The direction brief + tokens together mean the web-designer *executes* a committed visual language rather than *inventing* one, and the architect's Design Distinctiveness review (Step 7) catches any drift back to defaults.

---

### Step 6 — Build Pages

**What:** Design and code every page in the site plan, phase by phase.
**Who:** `web-designer` agent (spawned per page or component group).
**Tools needed:** Read, Write, Edit, Grep, Glob, Bash, WebSearch, WebFetch.

#### Inputs (read by web-designer before each page)
- **`.claude-plugin/GUIDELINES.md`** — sparse global dos/don'ts applied to every page (e.g., "use Google Maps, not OSM"). Read first, kept in mind across every choice below.
- **`public/images/IMAGE_REQUESTS.md`** — open manifest rows for this route (avoid duplicates) and reference IDs for any existing slot
- **`.claude-plugin/skills/media-prompting/SKILL.md`** — read when drafting a new image-request row; defines the schema and P-strategy → prompt-language mapping
- `company-brand/SKILL.md` — who this company is
- **`design-direction.md`** — the committed visual language (binding)
- `design-system/SKILL.md` — tokens executing the direction
- `design-system/references/visual-vocabulary.md` — full character of selected strategies
- `page-design/SKILL.md` + relevant reference file — what content this page needs
- `page-content/SKILL.md` — how to draft text
- `seo-patterns/SKILL.md` — SEO requirements per page type
- `conversion-optimization/SKILL.md` — CTA and conversion patterns
- `IMAGE_CATALOG.md` — available images from old site (filtered by the direction brief's art-direction strategy)
- `SITE_PLAN_TEMPLATE.md` — keywords, priorities
- `messages/{locale}.json` — existing translations
- `/frontend-design` skill — distinctive UI generation (external skill)

#### Context Budget
The web-designer loads many documents. To avoid overwhelming its context window, load **selectively per page type**:
- For a **service page**: load `service-pages-content.md` reference, not all page-design references
- For the **homepage**: load `homepage-content.md` reference, not case-study or supporting-pages references
- Always load: `company-brand`, `design-system`, `page-content`, `SITE_PLAN_TEMPLATE.md` (for keywords)
- Load on demand: `seo-patterns`, `conversion-optimization`, `performance-budget` (smaller reference skills)

#### Build Order

**Phase 0 — Design System & Shared Components**
- Design tokens in `globals.css` (if not done in Step 5)
- Header + navigation (desktop + mobile)
- Footer
- Language switcher
- Breadcrumbs
- CTA section component
- Common section layouts (hero, feature grid, stats, testimonials)

**After Phase 0: one-time direction-brief revision pass** (orchestrator runs this before Phase 1). Shared components are the first contact with real UI — if a committed strategy doesn't survive at nav/footer scale, the orchestrator may swap to a near-neighbor strategy in the same category or adjust token values within selected strategies, and must log a one-line changelog entry in `design-direction.md`. Re-picking unrelated categories is not permitted; after this pass, the brief is frozen.

**Phase 1 — Core Pages**
- Homepage
- Services hub
- Individual service pages
- Contact page (with working form + Server Action)

**Phase 2 — Trust & Evidence**
- Case studies (listing + individual)
- About page (company story, team, certifications)

**Phase 3 — Legal & Compliance**
- Privacy policy
- Cookie policy
- Cookie consent component (must enforce, not just display)

#### Process Per Page
1. **Research** — Web-designer reads inputs (brand, `design-direction.md`, design-system, page-design reference for this page type, page-content, seo-patterns, conversion-optimization)
2. **Design** — Plans page structure (sections, content, components, CTA placement) constrained by the direction brief's selected strategies and Avoid list
3. **Build** — Uses the `/frontend-design` skill for UI implementation, passing it the **direction brief** (selected strategies + attribute→visual table + Avoid list + identity test), design tokens, content requirements, and the subset of available images the brief permits. This is the primary code generation tool — it produces distinctive components *when fed the brief*, generic ones when fed only brand attributes.
4. **Integrate** — Reviews `/frontend-design` output to ensure it follows design-system tokens, seo-patterns, and conversion guidance. Adds JSON-LD schema, metadata, translations.
5. Writes translations for ALL configured locales
6. Uses `[NEEDS:]` markers only for genuinely missing client content. **For images specifically**, uses the pointer form `[NEEDS:image <IMG-ID>]` and writes a matching row in `public/images/IMAGE_REQUESTS.md` — the manifest is the single source of truth, the marker is a pointer.
7. **Pre-finish brief-compliance self-check** — before marking the page done, state pass/fail against each selected strategy (T/C/L/P/S/D/M), the direction brief's Avoid list, the one-line identity test, AND every `[NEEDS:image …]` marker having a matching manifest row. On any fail, quote the violated brief item and either rework or explicitly justify the deviation. This catches drift at the cheapest moment to fix.

#### Outputs
- Page files in `src/app/[locale]/`
- Shared components in `src/components/`
- Translation entries in `messages/{locale}.json`

#### Build Verification
Run `npm run build` (or at minimum a type-check) **after each phase** — not just at the end. Catching a broken import after Phase 0 is trivial; catching it after 15 pages are built means debugging across dozens of files.

#### Status Update Between Phases
After each phase completes, the orchestrator tells the user what was built (one line) and continues immediately. This is a status update, not an approval gate — the user can interrupt at any time, but the orchestrator never waits.

---

### Step 7 — Review Cycles

**What:** Quality assurance that runs in two modes: continuous during build, and a final pass after build.
**Who:** Multiple review agents.

> **Note:** Step 7 is not a single sequential step. The "During Build" reviews run **in parallel** with Step 6 in separate terminals. The "After Build" final pass runs sequentially after all pages are complete. The Phase Map shows Step 7 after Step 6 because the final pass is sequential, but the loop reviews overlap with the build.

#### During Build (via `/loop` in separate terminals) — Recommended

| Agent | Loop Command | Focus | Tools |
|-------|-------------|-------|-------|
| `architect` (magenta) | `/loop 15m /review-architect` | **Design distinctiveness (blocking)**, design consistency, plan adherence, technical quality, component reuse, multilingual coherence, production readiness, guideline compliance (`.claude-plugin/GUIDELINES.md`), image-request audit | Read, Grep, Glob |
| `customer-perspective` (yellow) | `/loop 15m /review-customer` | 3 buyer personas evaluate content, messaging, conversion friction | Read, Grep, Glob, WebFetch, WebSearch |
| `accessibility-auditor` | `/loop 15m /review-a11y` | Semantic HTML, contrast, keyboard nav, ARIA, focus management, motion | Read, Grep, Glob |

**Phase-gated (NOT looped):**

| Agent | Command | Focus | Tools |
|-------|---------|-------|-------|
| `browser-qa` (red) | `/review-browser` | Rendered behavior in a real browser (nav, forms, language switcher, responsive), rendered fidelity to `design-direction.md` (fonts actually loaded, accent color as accent vs field, committed P-strategy visible), visual-gap identification with disposition continuity | Read, Grep, Glob, Bash, Chrome MCP |

`browser-qa` is **phase-gated**, not time-looped. Invoke it after Phase 0 shell completion, after each completed Phase 1 core page, at the end of each build phase, and during the final review pass. Running it on a `/loop` cadence would catch half-built UI and HMR churn — noise that damages the signal. It requires a running local dev server (`npm run dev` on `localhost:3000`); if the server is not up, the command reports and exits.

**Design Distinctiveness is blocking.** The architect's first review dimension checks whether built pages execute `design-direction.md` (selected strategies, attribute→visual translation, Avoid list, identity test) or have drifted toward generic AI defaults. Violations are Critical severity, not Warning — "looks generic" blocks progress on this pipeline. This rubric exists because consistency alone doesn't catch blandness (a site can be consistently generic); distinctiveness catches that specific failure mode.

**Multi-terminal is recommended but not required.** If running in a single terminal, the orchestrator runs reviews sequentially between build phases instead (after each phase pause). The tradeoff is slower feedback — issues found between phases rather than mid-phase.

**Review agents check for uncommitted/in-progress work** via `git diff --name-only` and skip files that are actively being modified. This reduces noise from reviewing half-built pages. The existing `/review-architect` and `/review-customer` commands already check for recent changes and report "No new changes to review" when nothing has changed since the last cycle.

**Auto-fix lane (a11y only):** `/review-a11y` instructs the accessibility-auditor to tag findings `[AUTO-FIX]` (mechanical, single-file, unambiguous — missing alt, missing `type="button"`, raw `<img>` in place of `next/image`, etc.) or `[NEEDS DESIGNER]`. The command applies `[AUTO-FIX]` findings inline using Edit and surfaces the rest for the web-designer. The review agent itself stays read-only; the *command* performs fix application. Architect and customer-perspective reviews deliberately do NOT have an auto-fix lane — architect findings are architectural concerns (distinctiveness, consistency, plan adherence) not mechanical hygiene, and customer-perspective findings are content judgment. Both route entirely to the web-designer.

#### After Build (Final Review Pass)

The orchestrator runs all review agents one final time on the completed site:
1. Architect: full-site coherence review
2. Customer-perspective: buyer evaluation of major pages (Homepage, Services, Contact)
3. Accessibility auditor: comprehensive a11y pass
4. Browser-qa: rendered behavior + rendered fidelity + visual-gap pass (only if `localhost:3000` is up; otherwise the orchestrator logs "browser-qa skipped — dev server not running" to `.redesign-state/decisions.md` and tells the user to run `/review-browser` manually before `/publish`).

Apply critical fixes surfaced by reviewers.

**Phase-boundary browser-qa** also runs earlier — the orchestrator invokes it after each build phase completes (same dev-server check), so rendered issues are caught while the designer's context is still loaded. Findings drain through the same `.redesign-state/review-findings.md` queue as every other reviewer.

---

### Step 8 — Content Audit

**What:** Find all `[NEEDS:]` placeholder markers. Draft what can be drafted, report what needs client input.
**Who:** Orchestrator finds markers; `web-designer` agent drafts replacements (content drafting requires the same brand knowledge and writing skill as page building — this is not simple orchestrator inline logic).

#### Process
1. `grep -rn "NEEDS:" src/ messages/ SITE_PLAN_TEMPLATE.md`
2. Categorize markers: draftable from brand context vs. genuinely needs client input
3. For draftable markers: spawn web-designer agent to draft replacement text using brand skill and page-content skill
4. Compile remaining markers into a categorized list for the user

#### Output
- Reduced `[NEEDS:]` count
- Client content request list, categorized by page and urgency

---

### Step 9 — SEO Validation

**What:** Validate that SEO best practices were followed during build. Fix gaps.
**Who:** Orchestrator logic + `seo-patterns` skill as validation checklist.

#### Checks
1. Every page has a meta description (layout.tsx + translation keys)
2. Every page has JSON-LD schema markup matching the structured data plan
3. Pages cross-link to related content per the internal linking strategy
4. Heading hierarchy is clean (one h1 per page, logical h2/h3 nesting)
5. All images use `next/image` with descriptive alt text
6. `src/app/sitemap.ts` includes all built pages with hreflang alternates
7. `src/app/robots.ts` allows indexing (except /api, /_next)
8. Redirect configuration validates (all old URLs mapped)
9. Canonical URLs set correctly across locale versions
10. No duplicate title tags across pages

#### Output
- Fixed SEO issues (applied inline, not just reported)
- SEO audit summary

---

### Step 10 — Production Readiness

**What:** Verify every non-negotiable before going live.
**Who:** Orchestrator (inline checks).

#### Functionality
- [ ] Contact form submits (has Server Action or API route, success/error states)
- [ ] Cookie consent enforces preferences (analytics blocked until consent)
- [ ] All forms fire submission tracking events

#### Security
- [ ] Security headers in `next.config.ts` (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- [ ] Error boundaries exist and are styled (`error.tsx`, `not-found.tsx`, `loading.tsx`)

#### Accessibility
- [ ] Keyboard navigation works on all interactive elements
- [ ] Custom `focus-visible` styles in `globals.css`
- [ ] Color contrast meets WCAG AA
- [ ] Landmark regions and heading hierarchy correct

#### Localization
- [ ] Legal pages translated in all configured locales
- [ ] All UI strings from `next-intl` (zero hardcoded English)
- [ ] Language switcher works and preserves current route

#### Performance
- [ ] `npm run build` succeeds with no errors
- [ ] Bundle sizes within budget (JS < 150KB per route)
- [ ] Images use `next/image` with proper `sizes` attribute
- [ ] Fonts loaded via `next/font` with `display: swap`
- [ ] No layout shift on page load (CLS < 0.1)

#### Redirects
- [ ] All old URLs have 301 redirects configured
- [ ] Redirect config tested (no redirect loops, no 404s for mapped URLs)
- [ ] Google Search Console verification preserved

#### Analytics
- [ ] Vercel Analytics loaded (respecting cookie consent)
- [ ] Form submission events tracked
- [ ] Primary CTA clicks tracked

Once all checks pass (fixing issues as they're found), proceed directly to Step 11.

---

### Step 11 — Publish

**What:** Build, commit, push. Vercel deploys automatically.
**Who:** `/publish` command.

#### Process
1. `npm run build` — verify compilation
2. `git add` relevant files
3. `git commit` with descriptive message
4. `git push` — triggers Vercel deployment
5. Report: what was published, site will be live in 1-2 minutes

---

## Skills Inventory

### Existing Skills

| Skill | Purpose | Read By | Written By |
|-------|---------|---------|------------|
| `company-brand` | Company identity, positioning, audience, tone (reference after population) | All agents | `brand-intelligence` agent or manual |
| `analyze-existing-site` | Procedure runbook — crawl strategy + extraction patterns. Not executed inline; read by the `brand-intelligence` agent. | `brand-intelligence` agent | N/A (static runbook) |
| `page-design` | Content requirements per page type (what each page needs) | `web-designer`, `site-planner` | Manual refinement |
| `page-content` | Text drafting patterns, translation workflow, placeholder conventions | `web-designer`, `content-strategist` | Manual refinement |

| `redirect-mapping` | Maps old URLs → new URLs, generates redirect config | Orchestrator (Step 4) | N/A (it's the writer) |
| `design-system` | Two-stage: (5.1) direction brief selection from the visual-vocabulary library → `design-direction.md`; (5.2) tokenization → `globals.css` + skill body. The vocabulary reference (`references/visual-vocabulary.md`) holds the library of named strategies (T1–T7, C1–C8, L1–L7, P1–P9, S1–S6, D1–D4, M1–M5) that the direction brief selects from. | `web-designer`, `architect` | Step 5 |
| `seo-patterns` | Proactive SEO: schema templates, meta patterns, linking rules, heading hierarchy | `web-designer`, SEO validation (Step 9) | Step 6 (during build) + Step 9 (validation) |
| `conversion-optimization` | CTA placement, form strategy, trust signal positioning, micro-conversions | `web-designer`, `customer-perspective` | Step 6 (during build) |
| `performance-budget` | Core Web Vitals targets, image rules, font loading, bundle size limits | `web-designer`, Production Readiness (Step 10) | Step 6 (during build) + Step 10 (validation) |
| `analytics-tracking` | Event tracking patterns, cookie consent integration, Search Console continuity | `web-designer`, Production Readiness (Step 10) | Step 6 (during build) + Step 10 (validation) |
| `legal-compliance` | Cookie consent implementation, GDPR form handling, privacy policy requirements, accessibility statements | `web-designer` | Step 6 Phase 3 (legal pages) |
| `media-prompting` | Image-generation prompt patterns — row schema for `IMAGE_REQUESTS.md`, P-strategy → prompt language mapping (P1–P8), aspect/focal conventions per role, negative-prompt patterns to suppress AI stock-photo sheen | `web-designer`, `/generate-media-prompts` | Step 6 (during build) |

**Imagery artifacts overview (not skills, but work together):**
- **`IMAGE_SLOTS.md`** at project root — **authoritative inventory of every required image slot**, derived from the committed direction brief + site plan at end of Step 5.2. Each slot has a Resolution (pending / catalog-reuse / manifest-row / image-present / justified-none). This is the binding list the architect, web-designer Phase 3 self-check, and `/generate-media-prompts` all audit against. Closes the "missing image with no marker, no row" failure mode that the first saxen run hit.
- `public/images/IMAGE_CATALOG.md` — existing images on disk (from Step 1 extraction or manual additions). Input. Slots resolve to `catalog-reuse` by referencing a catalog path.
- `public/images/IMAGE_REQUESTS.md` — generation prompts for slots that need new images. Output destination for slots resolved to `manifest-row`.

---

## Agents Inventory

### Existing Agents

| Agent | Color | Role | Tools | Step |
|-------|-------|------|-------|------|
| `brand-intelligence` | blue | Crawls old site; extracts identity, images, screenshots, URL inventory | Read, Write, Edit, Grep, Glob, Bash, WebFetch, WebSearch | 1 |
| `content-strategist` | blue | Analyzes brand data for messaging gaps, defines content hierarchy, enriches page requirements | Read, Write, Edit, Grep, Glob | 2 |
| `site-planner` | green | Evaluates scope, decides what to build, fills site plan | Read, Write, Grep, Glob | 3 |
| `web-designer` | cyan | Designs and codes pages, components, translations | Read, Write, Edit, Grep, Glob, Bash, WebSearch, WebFetch | 6, 8 |
| `architect` | magenta | Reviews distinctiveness, consistency, plan adherence, architectural cross-cutting (read-only) | Read, Grep, Glob | 7 |
| `customer-perspective` | yellow | Evaluates from buyer personas (read-only) | Read, Grep, Glob | 7 |
| `accessibility-auditor` | orange | Deep a11y review: WCAG 2.1 AA — semantic HTML, contrast, keyboard nav, ARIA, focus, motion | Read, Grep, Glob | 7 (loop + final) |
| `browser-qa` | red | Rendered QA in a real Chromium via Chrome MCP — rendered behavior, rendered fidelity to `design-direction.md`, visual-gap identification. Phase-gated (Phase 0 complete, each Phase 1 core page, phase boundaries, final review). Requires `npm run dev` running locally. | Read, Grep, Glob, Bash, Chrome MCP | 7 (phase-gated, NOT /loop) |

---

## Commands Inventory

| Command | Purpose | Status |
|---------|---------|--------|
| `/redesign` | Full pipeline orchestrator | **Exists** |
| `/publish` | Build + commit + push to deploy | **Exists** |
| `/review-architect` | Run architect review (designed for `/loop`) | **Exists** |
| `/review-customer` | Run customer-perspective review (designed for `/loop`) | **Exists** |
| `/review-a11y` | Run accessibility audit (designed for `/loop`) | **Exists** |
| `/review-browser` | Run browser QA against the running local dev server (phase-gated; do NOT use with `/loop`) | **Exists** |
| `/generate-media-prompts` | Reconcile `[NEEDS:image …]` markers with `IMAGE_REQUESTS.md`; verify convergence | **Exists** |
| `/add-dos-and-donts` | Append a new rule to `.claude-plugin/GUIDELINES.md` | **Exists** |

---

## Execution Mode

The pipeline runs **fully autonomously** — no manual approval gates anywhere in the flow. The model makes judgment calls at each stage and proceeds without waiting for user confirmation. Brief status updates are provided at step transitions, but the pipeline does not pause.

**The only blocks are automated, not approval-based:**
- Unjustified `FAIL` in the brief-compliance log halts the page being marked done (handled by the orchestrator reading `.redesign-state/compliance-log.md`).
- A missing `/frontend-design` skill halts the pipeline at Step 5.2 with an explicit message to install it.
- Architect findings flagged `blocking: yes` in `.redesign-state/review-findings.md` halt the next phase until handled.

The user can interrupt at any time by typing in the terminal, but the orchestrator never *asks* for approval. Every non-obvious decision is logged to `.redesign-state/decisions.md` so the user can audit after the fact rather than block during the run.

**Status updates (non-blocking):**

| After Step | What the user sees |
|-----------|-------------------|
| 1 (Brand Intelligence) | Brand Strength Assessment rating, key facts extracted |
| 3 (Site Planning) | Pages planned and build order |
| 5 (Design System) | Design direction summary (colors, fonts, feel) |
| Each build phase | What was built, build verification result |
| 11 (Publish) | Final summary: page count, remaining [NEEDS:] markers, deploy status |

The only time the pipeline asks the user a question is Step 1, when no old site domain is configured — it needs a URL to crawl.

---

## Data Flow

This shows how information flows between components. Arrows indicate reads (→) and writes (←→).

```
                    ┌──────────────────────────┐
                    │     Old Website           │
                    │     (crawled once)         │
                    └────────────┬───────────────┘
                                 │
                    ┌────────────▼───────────────┐
                    │  analyze-existing-site      │
                    │  skill (Step 1)             │
                    └──┬─────────┬───────────────┘
                       │         │
              ┌────────▼──┐  ┌──▼─────────┐
              │ company-   │  │ IMAGE_     │
              │ brand      │  │ CATALOG.md │
              │ SKILL.md   │  │            │
              └─────┬──────┘  └──────┬─────┘
                    │                │
        ┌───────────┼────────────────┤
        │           │                │
  ┌─────▼──────┐ ┌──▼──────────┐    │
  │ content-   │ │ site-       │    │
  │ strategist │ │ planner     │    │
  │ (Step 2)   │ │ (Step 3)    │    │
  └─────┬──────┘ └──────┬──────┘    │
        │                │           │
        ▼                ▼           │
  content-         SITE_PLAN_        │
  strategy.md      TEMPLATE.md      │
                         │           │
                    ┌────▼───────────▼──┐
                    │ redirect-mapping  │
                    │ (Step 4)          │
                    └────┬──────────────┘
                         │
                         ▼
                    redirects.md
                    next.config.ts

              ┌──────────────────────────┐
              │ brand + site plan +      │
              │ images + content strategy │
              └────────────┬─────────────┘
                           │
                    ┌──────▼──────┐       ┌───────────────┐
                    │ design-     │       │ web-designer  │
                    │ system      │──────▶│ agent         │
                    │ (Step 5)    │       │ (Step 6)      │
                    └──────┬──────┘       └───┬───────────┘
                           │                  │
                           ▼                  ▼
                      globals.css        src/app/[locale]/
                      design tokens      src/components/
                                         messages/{locale}.json
                                               │
                                 ┌─────────────┼─────────────┐
                                 │             │             │
                           ┌─────▼──────┐ ┌───▼────────┐ ┌──▼──────────┐
                           │ architect   │ │ customer-  │ │ a11y-       │
                           │ review      │ │ perspective│ │ auditor     │
                           │ (Step 7)    │ │ (Step 7)   │ │ (Step 7)    │
                           └─────────────┘ └────────────┘ └─────────────┘
```

### Skill Read Matrix

Which agents read which skills (✓ = reads, **W** = writes to):

| | brand | page-design | page-content | design-system | seo | conversion | performance | analytics | legal | redirect |
|---|---|---|---|---|---|---|---|---|---|---|
| **analyze-existing-site** | **W** | | | | | | | | | |
| **content-strategist** | ✓ | ✓ **W** | ✓ | | | | | | | |
| **site-planner** | ✓ | ✓ | ✓ | | | | | | | |
| **web-designer** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | |
| **architect** | ✓ | | | ✓ | ✓ | | ✓ | | | |
| **customer-perspective** | ✓ | | | | | ✓ | | | | |
| **accessibility-auditor** | | | | ✓ | | | | | ✓ | |

---

## Component Risk Matrix

What each component protects against — all components are now built:

| Component | Risk It Prevents | Pipeline Step |
|-----------|-----------------|---------------|
| Design Direction brief (5.1) + Visual Vocabulary library | Bland, generic, cheap-looking output — the "every AI-built site looks the same" failure mode | Step 5.1 |
| Design System tokens (5.2) | Visual inconsistency across all pages | Step 5.2 |
| Architect Design Distinctiveness rubric (blocking) | Drift back to AI defaults after build starts | Step 7 |
| Web-designer brief-compliance self-check + orchestrator enforcement (`.redesign-state/compliance-log.md`) | Drift within a single page, before review catches it | Step 6 |
| `/frontend-design` as required dependency (verified at Step 5.2) | Pipeline silently falls back to generic output if the UI executor is missing | Step 5.2 |
| Redirect Mapping procedure | SEO equity destruction at launch | Step 4 |
| SEO Patterns skill | Post-build SEO fixes are band-aids | Step 6 + Step 9 |
| Content Strategist agent | Migrating bad content into new design | Step 2 |
| Conversion Optimization skill | Site looks nice but generates zero leads | Step 6 |
| Accessibility Auditor agent + `/review-a11y` | Legal liability, excluded users | Step 7 |
| Performance Budget skill | Slow site, poor Core Web Vitals | Step 6 + Step 10 |
| Analytics & Tracking skill | No measurement of site effectiveness | Step 6 + Step 10 |
| Legal Compliance skill | GDPR implementation gaps | Step 6 Phase 3 |
| `IMAGE_REQUESTS.md` manifest + `media-prompting` skill + orphan-marker block in Phase 3 compliance log | Generic AI-generated imagery, missing prompts for images the site needs, dual-source-of-truth drift between code markers and prompt text | Step 6 |
| **`IMAGE_SLOTS.md` brief-derived inventory + architect absence audit (Dim 1.5) + web-designer slot-coverage Phase 3 row** | **Brief-mandated imagery missing with no marker and no manifest row** — the saxen failure mode: when a designer forgets to write both, no downstream check catches it, since every audit today is marker-driven. Slot inventory makes absence visible. | **Step 5.2 (derive) + Step 6 (resolve) + Step 7 (audit)** |
| `browser-qa` agent + `/review-browser` (phase-gated) | Rendered failures invisible to source review — font fallback rendering, accent-as-field, text wrap collisions, form that renders but does nothing, visual gaps where imagery would prove a claim | Step 7 (phase boundaries + final review) |

---

## Review Loop Architecture

The review system runs as a parallel quality assurance layer during the build:

```
Terminal 1 (main):          Terminal 2:              Terminal 3:              Terminal 4:
/redesign                   /loop 15m                /loop 15m                /loop 15m
  │                         /review-architect        /review-customer         /review-a11y
  │ (building pages)              │                        │                        │
  │                         ┌─────▼──────┐          ┌─────▼──────┐          ┌─────▼──────┐
  │                         │ architect  │          │ customer-  │          │ a11y-      │
  │                         │ agent      │          │ perspective│          │ auditor    │
  │                         │ (read-only)│          │ (read-only)│          │ (read-only)│
  │                         └────────────┘          └────────────┘          └────────────┘
  │                               │                       │                       │
  │◄──── issues surface ──────────┴───────────────────────┴───────────────────────┘
  │
  ▼ (fixes applied by orchestrator or web-designer)
```

Review agents are **read-only by design** — they identify issues but don't modify code. The orchestrator or web-designer applies fixes. This prevents conflicting edits.

**`browser-qa` runs in a separate invocation model** — phase-gated, not `/loop`-based. The orchestrator (or user) invokes `/review-browser` at stable artifact boundaries: after Phase 0, after each completed Phase 1 core page, at each phase end, and as part of the final review pass. It requires a running local dev server (`npm run dev` on `localhost:3000`). Time-based triggers would catch HMR churn and half-built UI — the phase-gated model attaches review to committed work, not wall-clock ticks.

---

## File System Map

Where everything lives in the project:

```
project-root/
├── CLAUDE.md                          ← Project instructions (references this file)
├── PIPELINE.md                        ← THIS FILE — authoritative flow reference
├── SITE_PLAN_TEMPLATE.md              ← Populated by site-planner agent
├── content-strategy.md                ← Written by content-strategist agent (Step 2)
├── redirects.md                       ← Old→new URL mapping (Step 4)
├── design-direction.md                ← Written by design-system skill (Step 5.1) — the committed visual language
├── IMAGE_SLOTS.md                     ← Brief-derived inventory of required image slots (end of Step 5.2)
│
├── .claude/commands/
│   ├── redesign.md                    ← Pipeline orchestrator
│   ├── publish.md                     ← Build + commit + push
│   ├── review-architect.md            ← Architect review (for /loop)
│   ├── review-customer.md             ← Customer review (for /loop)
│   ├── review-a11y.md                 ← A11y review (for /loop)
│   ├── review-browser.md              ← Browser QA (phase-gated, NOT /loop)
│   ├── generate-media-prompts.md      ← Reconcile image markers ↔ manifest
│   └── add-dos-and-donts.md           ← Append to GUIDELINES.md
│
├── .claude-plugin/
│   ├── plugin.json
│   ├── GUIDELINES.md                 ← Sparse global dos/don'ts; read by web-designer + architect
│   ├── agents/
│   │   ├── architect.md
│   │   ├── customer-perspective.md
│   │   ├── site-planner.md
│   │   ├── web-designer.md
│   │   ├── content-strategist.md
│   │   ├── accessibility-auditor.md
│   │   └── browser-qa.md
│   │
│   └── skills/
│       ├── company-brand/
│       │   ├── SKILL.md               ← Populated brand context (stub until Step 1)
│       │   └── references/
│       │       └── extraction-template.md
│       ├── analyze-existing-site/
│       │   └── SKILL.md
│       ├── page-design/
│       │   ├── SKILL.md
│       │   └── references/
│       │       ├── homepage-content.md
│       │       ├── service-pages-content.md
│       │       ├── case-study-content.md
│       │       ├── supporting-pages-content.md
│       │       └── navigation-content.md
│       ├── page-content/
│       │   └── SKILL.md
│       ├── redirect-mapping/
│       │   └── SKILL.md
│       ├── design-system/
│       │   ├── SKILL.md
│       │   └── references/
│       │       └── visual-vocabulary.md  ← library of named strategies (T/C/L/P/S/D/M)
│       ├── seo-patterns/
│       │   └── SKILL.md
│       ├── conversion-optimization/
│       │   └── SKILL.md
│       ├── performance-budget/
│       │   └── SKILL.md
│       ├── analytics-tracking/
│       │   └── SKILL.md
│       ├── legal-compliance/
│       │   └── SKILL.md
│       └── media-prompting/
│           └── SKILL.md               ← Image-generation prompt patterns
│
├── public/images/
│   ├── IMAGE_CATALOG.md               ← Written by Step 1 (reusable existing images)
│   ├── IMAGE_REQUESTS.md              ← Authoritative image-request manifest (written by web-designer during Step 6)
│   ├── brand/
│   ├── team/
│   ├── facility/
│   ├── services/
│   ├── cases/
│   └── hero/
│
├── .redesign-state/
│   ├── decisions.md
│   ├── review-findings.md
│   ├── compliance-log.md
│   ├── url-inventory.md
│   └── screenshots/                   ← browser-qa output (gitignored)
│
├── src/app/[locale]/                  ← Built pages
├── src/components/                    ← Shared components
└── messages/{locale}.json             ← Translations
```

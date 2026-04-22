# Website Redesign Kit — Flow Diagram

## Full Pipeline

```mermaid
flowchart TD
    Start(["/redesign"]) --> R0["Step 0: Resumption Check<br/>Read state files → determine starting step"]

    R0 --> S1

    subgraph DISCOVER["DISCOVER & PLAN"]
        S1["Step 1: Brand Intelligence<br/><b>brand-intelligence agent</b><br/>(reads analyze-existing-site runbook)<br/>Crawl old site → extract identity<br/>Assess brand strength<br/>Download images + capture screenshots<br/>Write URL inventory to .redesign-state/"]
        S1 --> S2

        S2["Step 2: Content Strategy<br/><b>content-strategist agent</b><br/>Messaging hierarchy<br/>Content gap analysis<br/>Tone calibration"]
        S2 --> S3

        S3["Step 3: Site Planning<br/><b>site-planner agent</b><br/>Evaluate scope → decide pages<br/>Keywords, phases, SEO clusters"]
        S3 --> S4

        S4["Step 4: Redirect Mapping<br/><b>redirect-mapping skill</b><br/>Old URLs → new URLs<br/>Generate next.config.ts redirects"]
    end

    S4 --> S5a

    subgraph BUILD["DESIGN & BUILD"]
        S5a["Step 5.1: Design Direction Brief<br/><b>design-system skill</b><br/>Selects strategies from visual-vocabulary.md<br/>(T/C/L/P/S/D/M + Avoid list)<br/>→ design-direction.md"]
        S5a --> S5b
        S5b["Step 5.2: Tokenization<br/><b>design-system skill</b><br/>Execute the direction into tokens<br/>→ globals.css + design-system skill body"]
        S5b --> S6

        S6["Step 6: Build Pages<br/><b>web-designer agent</b> (per page)<br/>Uses /frontend-design for UI"]

        S6 --> P0["Phase 0: Shared Components<br/>Header, Footer, Nav, Breadcrumbs, CTA"]
        P0 --> BV0["npm run build ✓"]
        BV0 --> P1["Phase 1: Core Pages<br/>Homepage, Services, Contact"]
        P1 --> BV1["npm run build ✓"]
        BV1 --> P2["Phase 2: Trust & Evidence<br/>Case Studies, About"]
        P2 --> BV2["npm run build ✓"]
        BV2 --> P3["Phase 3: Legal<br/>Privacy, Cookies, Consent"]
        P3 --> BV3["npm run build ✓"]
    end

    BV3 --> S7

    subgraph VALIDATE["VALIDATE"]
        S7["Step 7: Final Review<br/><b>architect</b> + <b>customer-perspective</b><br/>+ <b>accessibility-auditor</b><br/>Apply critical fixes"]
        S7 --> S8

        S8["Step 8: Content Audit<br/>Grep [NEEDS:] markers<br/><b>web-designer</b> drafts replacements<br/>Report remaining gaps"]
        S8 --> S9

        S9["Step 9: SEO Validation<br/><b>seo-patterns skill</b> as checklist<br/>Meta, schema, headings, links<br/>Sitemap, redirects, canonicals"]
        S9 --> S10

        S10["Step 10: Production Readiness<br/>Forms, consent, security, a11y<br/>Performance, analytics, legal<br/>Redirects verified"]
    end

    S10 --> S11["Step 11: Publish<br/><b>/publish command</b><br/>npm run build → commit → push<br/>Vercel deploys automatically"]

    S11 --> Done(["Live"])
```

## Review Loop Architecture (parallel with Build)

```mermaid
flowchart LR
    subgraph T1["Terminal 1 (main)"]
        R["/redesign<br/>Building pages..."]
    end

    subgraph T2["Terminal 2"]
        A["/loop 15m /review-architect<br/><b>architect agent</b><br/><b>Design distinctiveness (blocking)</b><br/>Design consistency<br/>Plan adherence<br/>Technical quality"]
    end

    subgraph T3["Terminal 3"]
        C["/loop 15m /review-customer<br/><b>customer-perspective agent</b><br/>Buyer personas<br/>Messaging quality<br/>Conversion friction"]
    end

    subgraph T4["Terminal 4"]
        X["/loop 15m /review-a11y<br/><b>accessibility-auditor agent</b><br/>WCAG 2.1 AA<br/>Keyboard nav<br/>Contrast, ARIA"]
    end

    A -.->|issues| R
    C -.->|issues| R
    X -.->|issues| R
```

## Skill & Agent Read Map

A graph doesn't work here — too many connections. Use this matrix instead:

| Skill ↓ / Agent → | content-strategist | site-planner | web-designer | architect | customer-perspective | a11y-auditor |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| **company-brand** | ✓ | ✓ | ✓ | ✓ | ✓ | |
| **page-design** | ✓ **W** | ✓ | ✓ | | | |
| **page-content** | ✓ | ✓ | ✓ | | | |
| **design-system** | | | ✓ | ✓ | | ✓ |
| **seo-patterns** | | | ✓ | ✓ | | |
| **conversion-opt** | | | ✓ | | ✓ | |
| **performance** | | | ✓ | ✓ | | |
| **analytics** | | | ✓ | | | |
| **legal** | | | ✓ | | | ✓ |
| **redirect** | | | | | | |

✓ = reads / **W** = writes to / `redirect-mapping` is executed directly by the orchestrator

## Brand Strength Adaptation

```mermaid
flowchart TD
    Crawl["Crawl old site"] --> Assess{"Brand Strength?"}

    Assess -->|Strong| Strong["Rich content found<br/>Clear positioning<br/>Real differentiators"]
    Assess -->|Moderate| Moderate["Real services but<br/>generic messaging<br/>Vague claims"]
    Assess -->|Thin| Thin["Template site<br/>Stock photos<br/>Near-empty pages"]

    Strong --> SE["Extract & synthesize"]
    Moderate --> ME["Extract facts<br/>Infer positioning<br/>Supplementary research"]
    Thin --> TE["Extract bare facts<br/>Heavy external research<br/>Mark gaps for client"]

    SE --> Brand["Populated Brand Skill"]
    ME --> Brand
    TE --> Brand

    Brand --> CS{"Content Strategy"}

    CS -->|Strong| CSR["Refine & prioritize<br/>existing messaging"]
    CS -->|Moderate| CSM["Rewrite messaging<br/>from facts"]
    CS -->|Thin| CST["Build messaging<br/>from zero"]

    CSR --> DS{"Design System"}
    CSM --> DS
    CST --> DS

    DS -->|Strong| DSR["Respect existing<br/>brand identity"]
    DS -->|Moderate| DSM["Anchor on logo/colors<br/>Build around them"]
    DS -->|Thin| DST["Maximum creative<br/>latitude — create<br/>visual identity"]

    DSR --> Build["Build Pages"]
    DSM --> Build
    DST --> Build
```

## Data Flow

```mermaid
flowchart TD
    OldSite["Old Website"] -->|crawl| BI["brand-intelligence agent"]

    BI -->|writes| Brand["company-brand/SKILL.md"]
    BI -->|writes| Images["IMAGE_CATALOG.md"]
    BI -->|writes| URLs[".redesign-state/url-inventory.md"]

    Brand --> CS["content-strategist"]
    Brand --> SP["site-planner"]
    Brand --> DirBrief["Design Direction Brief (5.1)"]
    DirBrief -->|writes| DirDoc["design-direction.md"]
    DirDoc --> DS["Tokenization (5.2)"]

    CS -->|writes| ContentStrat["content-strategy.md"]
    ContentStrat --> SP
    ContentStrat --> DirBrief

    SP -->|writes| SitePlan["SITE_PLAN_TEMPLATE.md"]

    URLs --> RM["redirect-mapping"]
    SitePlan --> RM
    RM -->|writes| Redirects["redirects.md"]
    RM -->|writes| NextConfig["next.config.ts redirects"]

    Brand --> WD["web-designer"]
    DirDoc --> WD
    DS -->|writes| Globals["globals.css tokens"]
    DS -->|writes| DSSkill["design-system/SKILL.md"]
    DSSkill --> WD
    SitePlan --> WD
    Images --> WD

    WD -->|writes| Pages["src/app/locale/"]
    WD -->|writes| Components["src/components/"]
    WD -->|writes| Translations["messages/locale.json"]

    Pages --> Arch["architect review"]
    Pages --> Cust["customer-perspective review"]
    Pages --> A11y["accessibility-auditor review"]

    Arch -.->|issues| WD
    Cust -.->|issues| WD
    A11y -.->|issues| WD
```

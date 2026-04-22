# Brand Extraction Template

This template defines every field that should be populated in the company-brand skill (`SKILL.md`). Use it as a checklist during brand extraction — either automated (via the analyze-existing-site skill) or manual.

After extracting data, write the results into the parent `SKILL.md`, replacing its stub body with a clean document containing only real data. Don't copy this template verbatim — synthesize what you find into the output format at the bottom.

---

## Fields to Extract

### Company Facts

| Field | Where to Look | Example |
|-------|--------------|---------|
| **Name** | Page title, logo alt text, footer | Acme Industries |
| **Founded** | About page, footer ("since 19XX") | 1987 |
| **Location** | Contact page, footer, maps embed | Aarhus, Denmark |
| **Specialty** | Homepage hero, meta description | Precision zinc die-casting |
| **Employees** | About page, careers page | ~50 |
| **Certifications** | Footer badges, quality page | ISO 9001, IATF 16949 |
| **Markets** | Service pages, case studies | Automotive, electronics, medical |
| **Languages** | Language switcher, hreflang tags | Danish (primary), English |

#### Industry-specific facts

If the company has technical capabilities, also capture:
- Machinery / equipment (type, count, capacity range)
- Production volume or throughput
- Tolerances or precision standards
- Materials or specializations

---

### Brand Positioning

| Field | Where to Look |
|-------|--------------|
| **Positioning statement** | Synthesize from homepage hero + about page. What makes them the RIGHT choice, not just what they do |
| **Tagline / motto** | Homepage hero, logo area, footer, meta title |
| **Competitive advantages** (3-5) | "Why us" sections, about page, homepage feature blocks |
| **Messaging rules** | Infer from what the site emphasizes (lead with) vs. buries (don't lead with) |

---

### Brand Attributes

Synthesize 4-5 qualities the website tries to communicate. Base these on recurring themes across pages.

Examples:
- **Precision** — Every detail matters, from +/-0.05mm tolerances to packaging quality
- **Reliability** — 35+ years, ISO-certified, consistent delivery track record
- **Partnership** — Collaborative approach, long-term customer relationships
- **Innovation** — Investment in modern equipment, process improvement
- **Authenticity** — Real people, real facility, no corporate veneer

---

### Audience

Identify 3-4 audience segments from CTA types, content depth, language formality, and service descriptions.

| Audience | What They Care About | How They Arrive |
|----------|---------------------|-----------------|
| e.g., Technical evaluator at OEM | Tolerances, materials, certifications | Google search for "[service] + [material]" |
| e.g., Procurement lead | Capacity, delivery reliability, price competitiveness | Referral or industry directory |
| e.g., Engineering manager | Design support, prototyping speed, DFM expertise | LinkedIn, trade shows |
| e.g., Potential employee | Culture, growth, working conditions | Job boards, company website |

---

### Tone of Voice

Analyze the actual writing style across pages and capture:

| Dimension | What to Assess |
|-----------|---------------|
| **Formality** | Pronoun use (we/our vs the company), sentence structure |
| **Technical depth** | Jargon usage, specification detail, assumed knowledge |
| **Emotional register** | Warm / corporate / clinical / energetic |
| **Per-language variation** | Compare tone across language versions if available |

Distill into 3-5 tone principles. Examples:
- Technical authority without arrogance
- Concrete numbers over vague claims
- Active voice, lead with key information
- Respect the audience's intelligence

Also note per-language guidance (e.g., "Danish: professional but warmer, use 'vi' freely" / "English: slightly more formal, industry-standard terminology").

---

## Design Constraints (always include these)

These are non-negotiable for every project — carry them into the populated SKILL.md as-is:
- **Accessibility:** WCAG 2.1 AA compliance
- **Performance:** Server Components by default, optimized images, fast LCP
- **Multilingual:** All content in configured languages. Layouts must accommodate text length variation
- **Mobile-responsive:** Design for both desktop and mobile/tablet visitors
- **Authentic feel:** This is a real company — design should feel genuine, not generic corporate

---

## What the Skill Does NOT Prescribe

The following are creative decisions for the designer/agent to make — do not include prescriptive guidance for these in the populated skill:
- Color palette
- Font choices
- Layout patterns
- Visual style and aesthetic direction
- Animation and interaction patterns
- Specific component designs

These should emerge from the design process, informed by the brand attributes and company context.

---

## Confidence Markers

Every specific claim in the populated skill must carry a clear confidence signal so downstream agents (content-strategist, site-planner, web-designer) can calibrate how much to trust each piece. Use these markers consistently:

| Marker | When to use |
|--------|-------------|
| **No marker** | A direct fact extracted from the old site, official pages, or documentation. The client would agree this is true on first read. |
| **`*(inferred)*`** or **`*(inferred from [reasoning])*`** | A reasonable conclusion drawn from evidence but not explicitly stated. Example: "~50 employees *(inferred from 47 team photos on About page)*" |
| **`*(from [source])*`** | Supplementary research from outside the old site. Example: "Founded 1987 *(from Google Business Profile)*" or "Serves automotive OEMs *(from LinkedIn company page)*" |
| **`Unknown — ask client`** | Not extractable and not worth guessing. Downstream agents must treat these as `[NEEDS:]` when drafting copy. |

**Rule of thumb:** If you cannot point to a specific source (a page, a screenshot, a directory listing, or a clearly articulated inference chain), it belongs in `Unknown — ask client`. Plausible-sounding invented facts are the most damaging failure mode of the brand extraction — they silently propagate into page copy and embarrass the client at launch.

### Binding rule for downstream agents

This rule applies to `content-strategist`, `web-designer`, and any other agent drafting content. It is the canonical source of truth on fabrication — agent files should reference it, not restate it:

> **Never upgrade a confidence marker into a confident claim.** Anything marked `*(inferred)*`, `*(from [source])*`, or `Unknown — ask client` must stay at that confidence level when drafted into page copy. Never state inferred figures, certifications, named clients, testimonials, team details, dates, or locations as facts. When a specific claim is needed and no FACT-level entry backs it, either (a) reframe the copy to speak to capability rather than specifics, (b) escalate it to the `Needs Client Input` list, or (c) leave a `[NEEDS:]` marker with a descriptive context.

This rule is deliberately short because it is the load-bearing one. Drifting lists of "never invent X" invite omission — the rule is: **marker level on the way in = confidence level on the way out**.

---

## Output Format

When writing the populated `SKILL.md`, preserve the existing YAML frontmatter (the `---` block with name and description) and replace the body with this structure. Note how the confidence markers apply to individual fields, not just sections:

```markdown
# [Company Name] — Brand Context

Essential facts and constraints for designing the website. This skill provides the **what** and **why** — the designer decides the **how**.

## Brand Strength Assessment

**Rating:** [Strong / Moderate / Thin]
**Sources used:** [Old website, Google Business Profile, LinkedIn, competitor analysis, industry knowledge]
**Confidence level:** [High / Medium / Low]

**What was strong:** [what the old site actually communicated well]
**What was weak or missing:** [what had to be inferred or is still unknown]
**Key questions for client:** [the 3-5 most important things to verify]

## Company Facts

- **Name:** [value]
- **Founded:** [value, or `[value] *(inferred from X)*`, or `Unknown — ask client`]
- **Location:** [value]
- **Specialty:** [value]
- **Employees:** [value with marker if inferred, e.g. `~50 *(inferred from team photo count)*`]
- **Certifications:** [value, or `Unknown — ask client` — never invent these]
- **Markets:** [value]
- **Languages:** [value]

[Industry-specific facts if applicable — apply the same markers to each claim]

## Brand Positioning

[Company] positions as [positioning statement].

**Company DNA:** "[tagline or motto]"

**Competitive advantages:**
- **[Advantage 1]** — [why it matters]
- **[Advantage 2]** — [why it matters]
- ...

**Messaging rules:**
- Never lead with [what not to lead with]
- Always lead with [what to lead with]
- Attract customers who [ideal customer description]

## Brand Attributes

The website should communicate these qualities:

- **[Attribute 1]** — [description]
- **[Attribute 2]** — [description]
- ...

## Audience

| Audience | What They Care About | How They Arrive |
|----------|---------------------|-----------------|
| [Segment 1] | [concerns] | [channels] |
| ...

## Design Constraints

- **Accessibility:** WCAG 2.1 AA compliance
- **Performance:** Server Components by default, optimized images, fast LCP
- **Multilingual:** All content in [languages]. Layouts must accommodate text length variation
- **Mobile-responsive:** Design for both desktop and mobile/tablet visitors
- **Authentic feel:** This is a real company — design should feel genuine, not generic corporate

## Tone of Voice — Principles

- [Principle 1]
- [Principle 2]
- ...

**Per language:**
- **[Language 1]:** [tone guidance]
- **[Language 2]:** [tone guidance]

## What This Skill Does NOT Prescribe

The following are creative decisions for the designer/agent to make:
- Color palette, font choices, layout patterns
- Visual style and aesthetic direction
- Animation and interaction patterns
- Specific component designs

These should emerge from the design process, informed by the brand attributes and company context above.
```

Every field should have a real value or "Unknown — ask client". No placeholder markers in the output. Every inferred or supplementary claim must carry its confidence marker — downstream agents rely on these to decide whether to use a fact directly, frame it cautiously, or leave a `[NEEDS:]` marker in page copy.

---
name: page-content
description: This skill should be used when writing or drafting text content for any website page. It provides the text drafting philosophy, per-section copy patterns, translation workflow, and placeholder conventions. Use this skill whenever content needs to be written for a page — hero text, service descriptions, about sections, case studies, CTAs, trust indicators, or any user-facing copy. Also trigger when the user asks about "placeholder text", "content drafting", "copy for the site", or "translation workflow".
---

# Page Content — Text Drafting & Translation Guide

How to write real, compelling content for every page — and what to do when client-specific information is missing.

## Core Philosophy

**Write real text, not placeholder text.** Every page should read like a finished website from the moment it's built. Use the company-brand skill to extract facts, positioning, and tone — then write copy that sounds like this specific company, not a generic template.

**Lorem ipsum is never acceptable.** If you can write it from brand context, write it. If you genuinely cannot (e.g., a specific revenue figure, a named client testimonial, team member bios), use the `[NEEDS:]` marker with a descriptive explanation.

## Per-Section Copy Patterns

### Hero Section
- **Lead with the customer's outcome**, not the company's capability
- One sentence that answers: "What will working with this company do for me?"
- Supporting line with a concrete proof point (years, certifications, volume)
- Primary CTA that matches the buyer's intent (not just "Contact Us" — try "Get a Quote", "Discuss Your Project", etc.)

**Pattern:**
```
[Outcome-focused headline]
[Proof point + supporting detail]
[CTA aligned to buyer intent]
```

### Service Description
- Open with the customer's problem or need, not the company's process
- Explain the capability in terms of what it enables for the customer
- Include at least one specific metric, tolerance, or specification
- Cross-link to related services and relevant case studies

### About / Company Story
- Lead with founding motivation, not founding date
- Weave in proof points (certifications, capacity, track record) naturally
- Show progression: where they started → what they've built → where they're going
- Include human elements: the people, the craft, the standards they hold themselves to

### Case Study
- Follow the **Challenge → Solution → Results** framework
- Challenge: describe the customer's situation before — what was at stake?
- Solution: what did the company do specifically? (process, approach, collaboration)
- Results: quantifiable outcomes wherever possible. If exact numbers aren't available, describe the qualitative impact.

### Trust Indicators
- Certifications with context (what it means for the customer, not just the badge)
- Specific numbers over vague claims: "12M+ parts/year" beats "high-volume production"
- Named client logos (with permission) or industry references
- Years of experience as a secondary signal, not the headline

### Contact Introduction
- Acknowledge what the visitor is trying to do (get a quote, ask a question, start a project)
- Set expectations: who will respond, how quickly, what happens next
- Reduce friction: offer multiple contact methods, keep forms short
- Include physical address and direct contact for trust (B2B buyers want to know you're real)

### CTA Sections
- Match CTA text to the page context (don't use generic "Contact Us" everywhere)
- Service page → "Request a Quote for [Service]"
- Case study → "Discuss a Similar Project"
- About → "Get to Know Us — Schedule a Call"
- Include a secondary low-commitment option: "Or email us at..."

## Translation Workflow

### Process

1. **Write the primary language first** — craft the best version of the content
2. **Translate idiomatically** — not word-for-word. The translated version should read like it was originally written in that language
3. **Accommodate text expansion** — German is typically ~30% longer than English. Layouts must handle this gracefully
4. **Maintain tone per language** — refer to the company-brand skill's per-language tone guidance

### Translation file structure

All translations live in `messages/{locale}.json`. Structure content hierarchically by page and section:

```json
{
  "homepage": {
    "hero": {
      "title": "...",
      "subtitle": "...",
      "cta": "..."
    },
    "services": {
      "heading": "...",
      "description": "..."
    }
  }
}
```

### Rules

- All user-facing text must go through `next-intl` — never hardcode strings in components
- Translate all locales when creating content, not just the primary language
- Use ICU message format for plurals, numbers, and dates
- Keys should be descriptive: `homepage.hero.title` not `h1` or `text1`

## Placeholder Convention

**See the canonical "Placeholder Convention" section in `CLAUDE.md` at the project root** — format, per-file-type syntax, how to find all placeholders, and the visual indicator pattern are defined there. That's the single source of truth; this file does not duplicate it.

Quick reference for content drafting:

- Company facts from the brand skill → write them directly, no placeholder.
- Specific client names, exact figures, team bios, quantified outcomes → `[NEEDS: specific description]`.
- Never use generic `[NEEDS: text]` — be specific enough that the client knows exactly what to provide.

## Content Completion Checklist

Before considering a page "done", verify:

- [ ] All text is real copy from brand context (not generic filler)
- [ ] `[NEEDS:]` markers are specific and descriptive
- [ ] All locales have translations (not just the primary language)
- [ ] Heading hierarchy is semantic (h1 → h2 → h3, no skips)
- [ ] CTAs match the page context and buyer intent
- [ ] Trust indicators include specific proof points, not vague claims
- [ ] Meta description is written (compelling, keyword-rich, under 160 chars)
- [ ] Schema markup matches the page type
- [ ] Internal links connect to related content (services ↔ cases ↔ contact)

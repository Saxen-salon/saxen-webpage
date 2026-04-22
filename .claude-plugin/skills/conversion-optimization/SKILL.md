---
name: conversion-optimization
description: Conversion patterns for B2B corporate websites — CTA placement, form strategy, trust signal positioning, and micro-conversions. Use this skill when building any page that should drive a visitor toward action (contact, quote request, inquiry). The web-designer agent should read this skill alongside page-design when building pages, and the customer-perspective agent should reference it when evaluating whether pages drive action. Trigger whenever the user mentions "conversion", "CTA", "lead generation", "contact form strategy", "call to action", or "why isn't anyone reaching out".
---

# Conversion Optimization — B2B Patterns

A beautiful site that generates zero leads is a failed site. These patterns ensure every page has a clear path to action.

## Core Principle

B2B conversion is not e-commerce conversion. Visitors don't impulse-buy. They research, compare, shortlist, and then reach out. The site's job is to:
1. **Prove capability** — convince them you can do what they need
2. **Build trust** — convince them you're reliable and real
3. **Reduce friction** — make the next step obvious and easy

## CTA Strategy

### Primary CTA (one per page)
Every page should have one primary call-to-action that matches the visitor's likely intent:

| Page | Primary CTA | Why |
|------|------------|-----|
| Homepage | "Get a Quote" or "Discuss Your Project" | Visitors with clear intent arrive here |
| Service page | "Request a Quote for [Service]" | Specific service interest = specific CTA |
| Case study | "Discuss a Similar Project" | They've seen proof; now they want to talk |
| About | "Get to Know Us — Schedule a Call" | Relationship-building stage |
| Contact | "Send Your Inquiry" (the form itself) | Already committed to reaching out |

**Rules:**
- CTA text should describe the outcome, not the action: "Get a Quote" > "Submit" > "Click Here"
- Primary CTA should appear above the fold and again after major proof sections
- Use the accent color from the design system for primary CTAs — they must visually stand out

### Secondary CTA (low-commitment fallback)
Always provide an alternative for visitors not ready for the primary action:
- "Or email us directly at [email]"
- "Download our capabilities brochure"
- "View our case studies"

### CTA Placement Pattern
```
┌─── Hero Section ──────────────────────┐
│  Value proposition                     │
│  [Primary CTA]   [Secondary CTA]      │
└────────────────────────────────────────┘

┌─── Proof Section (services/cases) ────┐
│  Evidence of capability                │
└────────────────────────────────────────┘

┌─── Mid-Page CTA ─────────────────────┐
│  "Ready to discuss your project?"      │
│  [Primary CTA]                         │
└────────────────────────────────────────┘

┌─── More Proof (testimonials/certs) ───┐
│  Trust signals                         │
└────────────────────────────────────────┘

┌─── Final CTA Section ────────────────┐
│  Compelling closing statement          │
│  [Primary CTA]   [Secondary CTA]      │
│  Contact details for direct reach      │
└────────────────────────────────────────┘
```

## Form Strategy

### Contact/Inquiry Form
- **Keep it short** — company name, contact name, email, message. That's it. Every additional field reduces submission rate.
- **Don't ask for phone number as required** — B2B buyers often prefer email first
- **Include a subject/purpose dropdown** if the company serves multiple needs (quote, support, general inquiry)
- **Set expectations** — "We typically respond within 1 business day"
- **Success state** — clear confirmation message, not just a flash notification. "Thank you, [Name]. We'll respond to [email] within 1 business day."
- **Error state** — specific validation messages, not generic "form error"

### Form must actually work
The form needs a Server Action (`'use server'`) or API route. A form that renders but does nothing is the #1 most common defect in redesigned sites. At minimum, it should send an email notification to the company.

### Quote Request Form (for service businesses)
If the company offers custom/configured products or services:
- Include service type selector
- Optional: file upload for specifications/drawings
- Optional: quantity/timeline fields
- Keep it to one page — multi-step forms are for e-commerce, not B2B inquiries

## Trust Signal Placement

Trust signals are most effective when placed **near decision points** (CTAs and forms):

| Signal Type | Where to Place | Example |
|-------------|---------------|---------|
| Certifications | Near primary CTA, footer | ISO 9001 badge next to "Get a Quote" |
| Client logos | Between proof and CTA sections | "Trusted by [logos]" before the mid-page CTA |
| Years in business | Hero section or about block | "Serving [industry] since [year]" |
| Testimonials | After case study content or before CTA | Client quote with name and company |
| Team photos | About section, contact page | Real people = real company |
| Location/facility | Footer, about page, contact page | Address and building photo = they exist |

**Rules:**
- Real photos > stock photos for trust. Always prefer images from the IMAGE_CATALOG.
- Specific numbers > vague claims: "12M+ parts/year" > "high-volume production"
- Named references > anonymous: "Per Jensen, Procurement Lead at Vestas" > "Satisfied customer"

## Micro-Conversions

Not every visitor is ready to submit an inquiry. Provide lower-commitment actions:

- **Phone number visible on every page** — in the header and footer. B2B buyers often just call.
- **Email address visible** — some prefer to write their own message rather than fill a form.
- **Physical address** — proves you're a real company at a real location.
- **LinkedIn link** — B2B buyers check LinkedIn. Make it easy.

## Mobile Conversion

- Phone number should be a `tel:` link (tap-to-call on mobile)
- Email should be a `mailto:` link
- Primary CTA should be thumb-reachable (not at the very top of a long page)
- Contact information should be accessible without scrolling on mobile
- Forms must be usable on mobile — proper input types, large tap targets, no tiny dropdowns

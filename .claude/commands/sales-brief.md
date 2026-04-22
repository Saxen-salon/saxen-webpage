---
description: Generate a concise, per-company sales pitch brief to bootstrap outreach (gitignored)
---

Produce a one-page sales brief at `SALES_BRIEF.md` (project root, gitignored) that a salesperson can use to open a conversation with this company about the redesign. The goal: maximize the chance they agree to the project.

This is a synthesis task. Do not spawn an agent — do it inline. All the raw material has already been extracted by the pipeline; you are compressing it into outreach-ready talking points.

## Prerequisites

Before producing the brief, verify these files exist and are populated. If any are missing, stop and tell the user which pipeline step they need to run first.

| Required | File | Produced by |
|----------|------|-------------|
| Yes | `.claude-plugin/skills/company-brand/SKILL.md` (populated, not stub) | Step 1 |
| Strongly recommended | `content-strategy.md` | Step 2 |
| Strongly recommended | `design-direction.md` | Step 5.1 |
| Helpful | `public/images/IMAGE_CATALOG.md` (Old-Site Screenshots section) | Step 1 |

If only the brand skill exists, the brief is still worth producing but flag in it that the direction and messaging sections are inferred rather than committed.

## Inputs to read

1. `company-brand/SKILL.md` — **Brand Strength Assessment**, competitive advantages, audience segments, tone of voice, messaging rules. The Brand Strength rating drives urgency framing (Thin = most urgent).
2. `content-strategy.md` — messaging hierarchy, "this not that" examples, content gaps. Pull the top 1–2 buried proof points here — those become conversation-starters.
3. `design-direction.md` — the one-sentence direction, selected strategies, "What we're moving away from" list (this list is gold for naming specific structural failures of the old site), identity test.
4. `IMAGE_CATALOG.md` — the Old-Site Screenshots section. If screenshots were captured, the salesperson can reference specific pages.
5. The populated brand skill's "Key questions for client" section — these are explicit vulnerabilities.

## Output format — stick to this structure, keep each section terse

Write to `SALES_BRIEF.md` at the project root. Target length: one screen (roughly 350–500 words).

```markdown
# Sales Brief — [Company Name]

> Generated from pipeline extraction on [YYYY-MM-DD]. Private — gitignored.

## The pitch in one sentence
[One sentence naming their single biggest gap + what the redesign delivers. Must be specific to this company, not a template. Example: "Your current site hides $2M-per-year precision engineering behind generic stock imagery and 'solutions for you' copy — we rebuild it to show the actual capability your procurement buyers need before they shortlist you."]

## Why now — what's costing them today
[3 bullets. Each cites specific old-site evidence. Use concrete patterns from the 'What we're moving away from' list, from the brand skill's "what was weak or missing" section, and from the Old-Site Screenshots if captured. No generic "you need a modern website" language — that's useless.]
- [Specific broken thing → specific commercial cost]
- [...]
- [...]

## What they'd get (in one line, from the committed direction)
[Copy the one-sentence direction from `design-direction.md`. If design-direction.md doesn't exist yet, skip this section and flag at top that it's not yet committed.]

## Conversation angles per stakeholder
Adapt these to who the salesperson is actually meeting. Pull actual buyer types from the brand skill's Audience table rather than defaulting to generic B2B personas.

- **[Stakeholder 1, e.g., Technical Director]:** [What they're frustrated about on the current site + the specific capability of the new direction that solves it. One sentence.]
- **[Stakeholder 2, e.g., Procurement Lead]:** [Same shape.]
- **[Stakeholder 3, e.g., CEO / Owner]:** [Same shape.]

## Proof points to bring
[1–3 concrete items: an SEO gap you can demonstrate in 30 seconds, a competitor comparison the salesperson can screenshot, a specific case-study archetype that'd resonate. Only include items you can actually back up from what's in the brand skill and direction brief.]

## Don't lead with
[1–2 items. Things in the brand skill or old site that this company clearly takes pride in — don't open by saying we'd rip them out. Example: "Don't lead with 'the logo needs refreshing' — founder designed it personally and it's a visible on every piece of equipment they ship."]

## Vulnerabilities to probe gently
[Pull the top 2–3 items from the brand skill's "Key questions for client" section. These are places the salesperson can ask and look insightful — the company often doesn't realize these are gaps until asked.]
```

## Rules

- **No fabrication.** Follow the standard binding rule: marker level in = confidence level out. If the brand skill marks something `*(inferred)*`, your brief cannot upgrade it to a confident claim. If something is `Unknown — ask client`, it belongs under Vulnerabilities, not Proof points.
- **No generic sales language.** "Modern, responsive, mobile-first" means nothing. Every claim in the brief must be specific to this company and citable to the extraction.
- **Brand strength drives tone.** Thin brand = more urgent framing (they're invisible to buyers). Strong brand = refinement framing (they're leaving easy wins on the table). Don't flip these.
- **Don't include pricing, timelines, or deliverables list.** The salesperson handles that separately. This brief is about why the company should want the conversation.
- **Keep it to one screen.** If it's over ~500 words, it's too long.

## After writing

Tell the user: "Sales brief written to `SALES_BRIEF.md` (gitignored). Read and tailor before sending." Do not commit the file.

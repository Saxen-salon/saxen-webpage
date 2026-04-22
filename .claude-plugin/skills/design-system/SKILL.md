---
name: design-system
description: This skill defines the visual foundation for the website in two stages — first a Design Direction Brief that commits to a visual language derived from the brand story, then tokenization of that direction into CSS custom properties. It runs as Step 5 of the redesign pipeline, before any pages are built. Use this skill whenever the user mentions "design system", "design direction", "design tokens", "colors", "typography", "fonts", "spacing", "visual direction", or when building any page or component that needs to reference the established visual language. Also trigger when the architect agent checks for design consistency. The web-designer agent reads this skill AND the design-direction.md file before building every page.
---

# Design System — Not Yet Populated

This skill has not been populated yet. It will be filled during Step 5 of the redesign pipeline, after the site plan is established.

## Two-Stage Process

Step 5 has two sub-steps with distinct artifacts. **Do not skip 5.1.** Jumping straight to tokens produces the bland-generic output this pipeline exists to avoid — the direction brief is the upstream artifact that prevents that failure mode.

### Step 5.1 — Design Direction Brief

**Artifact:** `design-direction.md` at the project root (like `content-strategy.md`).

**Purpose:** Translate brand attributes into a committed visual language before any tokens are chosen. This is the missing handoff in most AI-built pipelines — without it, token selection defaults to safe and every output looks the same.

**Inputs:**
- `.claude-plugin/skills/company-brand/SKILL.md` — the populated brand skill (including Brand Strength Assessment)
- `content-strategy.md` — messaging hierarchy and tone direction
- `public/images/IMAGE_CATALOG.md` — existing images that survive the redesign
- `public/images/old-site-screenshots/` — visual reference of what to move *away* from
- **`.claude-plugin/skills/design-system/references/visual-vocabulary.md`** — **the library this step selects from**

**Process:**
1. Read the visual vocabulary reference fully. It contains seven strategy categories (Typography, Color, Layout, Photography, Shape, Density, Motion) plus a binding Avoid list.
2. Read the brand skill's Brand Attributes, Competitive Advantages, and Messaging Rules. These are the inputs the direction answers to.
3. For each of the seven categories, select exactly **one** strategy. Write a one-sentence brand-story rationale for each selection tying it back to a specific brand attribute or competitive advantage.
4. Apply the tie-breaker rule from the vocabulary library: when rationale for a default and a non-default is roughly equal, the non-default wins. The pipeline has gravity toward defaults; the brief's job is to push against that.
5. Apply the hard-stop rule: if every selection is a flagged default, the direction has failed — re-pick at least two categories with non-default rationale.
6. Check the selected combination against the vocabulary's "Conflicting combinations" table. Revise if conflicting.
7. Write the complete attribute → visual translation table (every brand attribute from the brand skill gets at least one visual expression).
8. Build the site-specific "Avoid" list — the vocabulary's binding list plus any direction-specific prohibitions (e.g., "this brand's direction is C3 Ink+Cream, so no pure-white backgrounds anywhere").
9. Write the one-line identity test — "if this site did X, it would be a different site" — that defines drift.
10. **Write the "What we're moving away from" list.** Open the old-site screenshots in `public/images/old-site-screenshots/` and examine them directly. For each screenshot, name 1–3 specific visual patterns the new site explicitly rejects — structural patterns (hero with generic handshake photo, three-up gradient feature cards, floating testimonial carousel), not just token choices. This turns the screenshots from passive reference files into an enforced artifact. The architect's distinctiveness review checks every page against this list.

**Output — `design-direction.md` structure:**

```markdown
# Design Direction — [Company Name]

## The direction in one sentence
[Compressed statement. E.g., "Technical precision expressed as monochrome editorial — sharp, quiet, and unapologetically engineering-first." One sentence, testable.]

## Brand-story rationale
[2–3 sentences tying this direction to the brand skill's core attributes and competitive advantages. Specifically: why THIS direction and not a different one. Reference specific attributes by name.]

## Selections

### Typography — [e.g., T1 Technical Mono]
- **Display font candidates:** [2–3 specific fonts, e.g., JetBrains Mono, IBM Plex Mono, Berkeley Mono — Step 5.2 picks one]
- **Body font candidates:** [2–3 specific humanist sans, e.g., Inter, Söhne, Basis Grotesque]
- **Weight usage:** [which weights where]
- **Rationale:** [one sentence tying this to brand attributes]

### Color — [e.g., C1 Monochrome + One Accent]
- **Neutral character:** [e.g., "near-black #0F0E0C range on cream #FAF7F2 range — avoid pure black/white"]
- **Accent direction:** [e.g., "one saturated color in the vermilion / electric-blue / acid-yellow range, used <10% of any surface"]
- **Rationale:** [one sentence]

### Layout — [e.g., L1 Engineered Grid]
- **Grid:** [e.g., "strict 12-col, 1440px container, hard edges"]
- **Rhythm:** [e.g., "no floating elements, everything aligns, dense-to-medium density"]
- **Rationale:** [one sentence]

### Photography / Art Direction — [e.g., P1 Technical Close-Up]
- **Primary treatment:** [detailed description]
- **Which IMAGE_CATALOG.md images fit:** [list specific files that match this direction]
- **Which don't:** [flag images that must not be reused because they violate the direction]
- **Rationale:** [one sentence]

### Shape / Form Language — [e.g., S1 Sharp Right-Angle]
- **Border radius:** [specific pixel value]
- **Border weight:** [specific pixel value]
- **Rationale:** [one sentence]

### Density — [e.g., D3 Standard Web]
- **Hero type scale:** [pixel range]
- **Section spacing:** [pixel range]
- **Rationale:** [one sentence]

### Motion — [e.g., M2 Precise Micro]
- **Transition duration / easing:** [specific values]
- **Scroll behavior:** [e.g., "no scroll-linked animation"]
- **Rationale:** [one sentence]

## Attribute → Visual Translation Table

Every brand attribute from the brand skill should appear here with a concrete visual expression.

| Brand attribute | Visual expression |
|-----------------|-------------------|
| [e.g., Precision] | [e.g., "S1 right-angle forms + L1 engineered grid + M2 mechanical 120ms transitions — no softness anywhere"] |
| [attribute 2] | [expression 2] |
| [attribute 3] | [expression 3] |
| [...] | [...] |

## What we're moving away from

Derived from `public/images/old-site-screenshots/`. For each old-site page we captured, name the concrete visual patterns the new site explicitly rejects. Structural patterns, not just tokens — "three-up feature cards with emoji icons" reads stronger than "blue buttons."

- [e.g., "Old homepage hero uses a smiling stock-photo team around a table — P1 Technical Close-Up explicitly rejects this"]
- [e.g., "Old services page lays out six services as uniform outline-bordered cards in a 3-col grid with emoji icons — new site composes services as a typographic list with generous vertical rhythm, no icons"]
- [e.g., "Old site's CTA buttons are pastel-gradient with drop shadows — new site's buttons are flat, single-color, zero-radius"]
- [e.g., "Old footer has a long link-list in five columns with a newsletter form — new footer commits to two columns, no newsletter (not a content-pipeline brand)"]
- [one entry per captured old-site screenshot, minimum]

## Avoid List

The vocabulary's binding list applies always. These additions are direction-specific — patterns that would betray *this particular* direction:

- [e.g., "No pure #000000 or #FFFFFF anywhere — we've committed to warmed neutrals"]
- [e.g., "No border-radius on any component ever — S1 is binding"]
- [e.g., "No photography of people on service pages — P1 is technical close-up only"]
- [8–12 items total, each specific enough to check against in review]

## One-line identity test

"If this site [did X], it would be a different site."
[E.g., "If this site used a pastel gradient anywhere, it would be a different site." Something sharp enough to catch drift immediately.]
```

---

### Step 5.2 — Tokenization

**Artifact:** `src/app/globals.css` design tokens + the populated body of this SKILL.md.

**Inputs:** `design-direction.md` (binding — 5.2 executes it, nothing more) and `references/visual-vocabulary.md` (for per-strategy implementation detail).

**Binding constraint:** every token decision must trace back to a selection from the direction brief. If a token doesn't — stop and add it to the brief first. This constraint applies to all six sub-steps below; it is not restated per-step.

#### 1. Color tokens
Derive hex values from the direction's Color selection. Build scales 50–950 for primary, secondary (if the strategy has one), neutral, and accent. Add quiet semantic colors that don't compete. Ensure WCAG AA on all text/background pairings — adjust lightness to hit AA after picking the direction-committed hue.

```css
@theme inline {
  --color-primary-50: ...;
  --color-primary-500: ...;
  --color-primary-950: ...;
  /* full scales: primary, secondary, neutral, accent, semantic */
}
```

#### 2. Typography tokens
Pick one font from the Typography selection's candidates (loaded via `next/font` in the locale layout). Size scale sized to the Density selection (D1 display ~120px, D4 ~48px). 2–3 weights total. Tight line height for display (1.0–1.15), comfortable for body (1.45–1.6). Tracking per strategy (tight for T1 Mono, default otherwise).

#### 3. Spacing scale
Base unit 4px, scale `--space-1` through `--space-32`. Section spacing matches Density: D1 `--space-48`–`--space-64`, D2 `--space-24`–`--space-32`, D3 `--space-16`–`--space-24`, D4 `--space-12`–`--space-16`.

#### 4. Component pattern tokens
Shape selection drives radius and border tokens. S1=0, S2=2–4px, S3=8–16px, S5=0+1px hairline as structural element, S6=0+2–4px heavy border. Shadows: most strategies use minimal elevation; C4 Saturated-on-Off-Black can use subtle inner glows instead of drop shadows. Button, card, input treatments fall out of Shape+Color.

#### 5. Interaction tokens
Motion selection drives durations and easing. M2 Precise Micro = 100–150ms, M1 Architectural Stillness = 150–200ms, M3 Editorial Fade = 400–600ms on reveals. `ease-out` reveals, `ease-in-out` hovers, `linear` for mechanical feel. Scroll behavior per brief. Focus styles always custom, always using the accent color. `prefers-reduced-motion` always respected — animations degrade to opacity-only.

#### 6. Write back to this SKILL.md
Replace everything below the frontmatter with the Output Format structure below.

---

## Adapting to Brand Strength

Read the Brand Strength Assessment in the company-brand skill:

- **Strong brand** — Respect existing brand colors and fonts. The direction brief selects strategies that *complement* what exists rather than overriding it. If the company has a signature orange from their logo, the Color selection must accommodate it (e.g., C2 Two-Temperature with their orange as the warm side).
- **Moderate brand** — Some signals exist (a logo with colors, an industry aesthetic). The direction brief uses these as anchors but has wider latitude for Typography, Layout, Motion. Token execution extends rather than overrides.
- **Thin brand** — Maximum latitude. This is where the direction brief is most load-bearing — without an existing visual identity, a vague brief lets the system drift to defaults. A Thin-brand direction brief must be *more* specific, not less, and should aggressively apply the non-default tie-breaker.

---

## One-Time Revision After Phase 0

After the Phase 0 shared components (header, footer, navigation, language switcher, CTA block) are built but before Phase 1 pages begin, the orchestrator runs **one bounded revision pass** on `design-direction.md`.

**Why:** Selected strategies look good on paper. Header/footer/nav are the first contact with real UI and real content. If a committed strategy doesn't survive — e.g., T6 Brutalist Display is unreadable at nav scale, or M2 Precise Micro feels wrong when applied to a language switcher — it's far cheaper to revise the brief now than to execute 15 pages on a broken direction and discover it at review time.

**Scope of the revision:**
- Swapping between near-neighbor strategies in the same category *is* permitted if the Phase 0 shell proves the selection doesn't survive contact with real UI (e.g., T6 → T3, M4 → M2).
- Adjusting token values (font weight, accent saturation, radius value) within the same selected strategies *is* permitted.
- Re-picking unrelated categories is **not** permitted. This revision is a targeted fix, not a redo.
- The revision must update `design-direction.md` with a one-line changelog entry noting what changed and why.

**After Phase 0, the brief is frozen.** All subsequent changes require the full orchestrator gate — the architect review does not accept "we revised the brief" as a justification for distinctiveness drift.

---

## Output Format

When this skill is populated (Step 5.2), replace everything below the frontmatter with:

```markdown
# [Company Name] — Design System

Visual foundation for the website. Every page and component must execute the direction brief at `design-direction.md` and use these tokens.

## Direction Brief Reference
See `design-direction.md` for the committed visual language. This skill documents the *execution* of that direction into tokens.

**Direction in one sentence:** [copied from direction brief]
**Selected strategies:** T[X] / C[X] / L[X] / P[X] / S[X] / D[X] / M[X]

## Color Palette
[Named color scales with hex values and CSS custom property names]
[Usage notes: which colors for which purposes, tying back to direction brief selections]

## Typography
[Font families chosen from direction brief candidates + rationale]
[Size scale, weight usage, line height rules]
[next/font configuration details]

## Spacing
[Scale with values, section spacing aligned to Density selection]

## Component Patterns
[Button styles, card treatments, border radius, border weights — all tied to Shape selection]
[Container and layout conventions — aligned to Layout selection]

## Interaction Patterns
[Focus, hover, transition timings, reduced-motion rules — all tied to Motion selection]

## CSS Custom Properties Reference
[Complete list of all tokens defined in globals.css]

## Drift Checks
- **Identity test from direction brief:** [copied one-line test]
- **Avoid list reference:** See `design-direction.md` for the direction-specific Avoid list — architect review treats violations as Critical.
```

---

## Why Two Stages

The alternative — going straight from brand attributes to tokens — is what every AI-built corporate site does, and it's why they all look the same. Token selection in isolation has no vocabulary to argue with, so it defaults to the safest possible combination: mid-blue, gray scale, Inter, micro-radius, 120px section spacing. That's the generic-B2B-corporate default, visible in thousands of sites.

The direction brief forces explicit commitment to a visual language *before* any token is chosen. Once the direction says "T1 Technical Mono + C1 Monochrome + S1 Sharp", the tokens can't drift to mid-blue and Inter — they have to execute T1, C1, S1. That's the mechanism.

The visual vocabulary library prevents the direction brief from collapsing into adjectives. Without it, the brief says "industrial and precise" and then tokens still drift to defaults because "industrial" doesn't commit to anything visually. With it, the brief selects T1, C1, L1, S1 — which are concrete enough that their execution is constrained.

---

## Additional Resources

- **`references/visual-vocabulary.md`** — the strategy library Step 5.1 selects from. Required reading for the direction brief.

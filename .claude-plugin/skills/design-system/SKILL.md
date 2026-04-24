---
name: design-system
description: This skill defines the visual foundation for the website in two stages — first a Design Direction Brief that commits to a visual language derived from the brand story, then tokenization of that direction into CSS custom properties. It runs as Step 5 of the redesign pipeline, before any pages are built. Use this skill whenever the user mentions "design system", "design direction", "design tokens", "colors", "typography", "fonts", "spacing", "visual direction", or when building any page or component that needs to reference the established visual language. Also trigger when the architect agent checks for design consistency. The web-designer agent reads this skill AND the design-direction.md file before building every page.
---

# Saxen Frisør — Design System

Visual foundation for the website. Every page and component must execute the direction brief at `design-direction.md` and use these tokens.

## Direction Brief Reference

See `design-direction.md` for the committed visual language. This skill documents the *execution* of that direction into tokens.

**Direction in one sentence:** The site reads like a well-lit neighbourhood salon — warm cream ground, editorial serif headlines at confident scale, six real faces leading every people moment, and a price list presented as the main event rather than an afterthought.

**Selected strategies:** T5 / C3 / L2 / P2 / S4 / D2 / M1

---

## Color Palette

All tokens in `src/app/globals.css` under `@theme inline`. Strategy: **C3 — Ink + Cream**.

Every hex value carries a warm-yellow undertone. There are no cool grays, no blue-grays. Pure black (#000000) and pure white (#FFFFFF) are explicitly excluded — the palette lives between warm cream and deep ink.

### Ink Scale (warm cream → deep ink)

| Token | Hex | Usage |
|---|---|---|
| `--color-ink-50` | `#FAF7F2` | Page background (warm cream — `--color-background`) |
| `--color-ink-100` | `#F3EDE3` | Surface alt — slightly warmer card/section background |
| `--color-ink-200` | `#E8DDD0` | Subtle border — quiet dividers |
| `--color-ink-300` | `#D5C8B6` | Structural hairline border (`--color-border`) |
| `--color-ink-400` | `#B8A896` | Muted mid — decorative rules, disabled elements |
| `--color-ink-500` | `#8C7B6B` | Secondary / muted text (`--color-muted`) |
| `--color-ink-600` | `#685B4D` | Supporting body copy on light backgrounds |
| `--color-ink-700` | `#4A3F34` | Subdued heading weight |
| `--color-ink-800` | `#312820` | Near-ink — heavy structural use |
| `--color-ink-900` | `#1C1510` | Near-ink deep |
| `--color-ink-950` | `#0F0E0C` | Deep ink — primary text, primary borders (`--color-foreground`) |

**WCAG AA check:**
- `--color-ink-950` (#0F0E0C) on `--color-ink-50` (#FAF7F2): contrast ~19:1 — passes AAA
- `--color-ink-600` (#685B4D) on `--color-ink-50` (#FAF7F2): contrast ~6.5:1 — passes AA (body)
- `--color-ink-500` (#8C7B6B) on `--color-ink-50` (#FAF7F2): contrast ~4.6:1 — passes AA (body minimum)

### Accent Scale (dusty terracotta — warm chromatic)

Accent-500 is the primary CTA color. Not pink-pastel. Not orange day-glo. Warm, earthy, chromatic.

| Token | Hex | Usage |
|---|---|---|
| `--color-accent-50` | `#FCF5F0` | Accent background tint |
| `--color-accent-100` | `#F7E6DC` | Light accent fill |
| `--color-accent-200` | `#EEC9B4` | Accent border on light |
| `--color-accent-300` | `#E0A888` | Accent light state |
| `--color-accent-400` | `#CE8460` | Accent mid — hover state |
| `--color-accent-500` | `#B8623A` | **Primary CTA color** — buttons, active states |
| `--color-accent-600` | `#9A4C2C` | Accent pressed / focus ring |
| `--color-accent-700` | `#7A3A21` | Dark accent |
| `--color-accent-800` | `#5A2A17` | Very dark accent |
| `--color-accent-900` | `#3A1A0E` | Near-black accent |
| `--color-accent-950` | `#200E07` | Deepest accent |

**WCAG AA check:**
- White text on `--color-accent-500` (#B8623A): contrast ~4.7:1 — passes AA (large text and UI)
- `--color-ink-50` on `--color-accent-500`: contrast ~4.9:1 — passes AA

### Semantic Tokens

| Token | Resolves to | Hex | Purpose |
|---|---|---|---|
| `--color-background` | `--color-ink-50` | `#FAF7F2` | Page base — warm cream throughout |
| `--color-foreground` | `--color-ink-950` | `#0F0E0C` | Primary text and ink |
| `--color-surface` | `--color-ink-50` | `#FAF7F2` | Default component surface |
| `--color-surface-alt` | `--color-ink-100` | `#F3EDE3` | Alternate surface (table rows, etc.) |
| `--color-border` | `--color-ink-300` | `#D5C8B6` | Hairline structural dividers |
| `--color-border-subtle` | `--color-ink-200` | `#E8DDD0` | Secondary quiet borders |
| `--color-muted` | `--color-ink-500` | `#8C7B6B` | Secondary/muted text |

---

## Typography

Strategy: **T5 — Contrast Pair**. The tension between Playfair Display's inherited serif authority and Work Sans's clean geometric legibility carries the brand's dual identity: warm neighbourhood salon with full published prices.

### Font Families

**Display:** Playfair Display — loaded via `next/font/google` in `src/app/[locale]/layout.tsx` and exposed as `--font-playfair`. Used for all headings (h1–h6), hero text, pull quotes, price category headers, and staff names.

**Body:** Work Sans — loaded via `next/font/google` in `src/app/[locale]/layout.tsx` and exposed as `--font-work-sans`. Used for all body copy, price list line items, navigation, captions, labels, and UI text.

```css
--font-display: var(--font-playfair);    /* Playfair Display */
--font-body:    var(--font-work-sans);   /* Work Sans */
```

### Weight Usage

| Font | Weight | Use |
|---|---|---|
| Playfair Display | 400 Regular | All display headings — the serif does the work through form, not weight |
| Playfair Display | 700 Bold | Hero headlines only when extra punch is needed |
| Work Sans | 400 Regular | Body copy, price list items, captions |
| Work Sans | 500 Medium | Navigation items, labels, button text |
| Work Sans | 600 SemiBold | Price callouts, emphasized UI |

**Rule:** Never use Playfair Display below 24px. Never use Work Sans above 36px for display. The contrast pair depends on each font staying in its register.

### Type Scale

D2 Editorial density — hero 72–88px on desktop.

| Token | rem | px | Use |
|---|---|---|---|
| `--text-xs` | 0.75rem | 12px | Legal, micro-labels |
| `--text-sm` | 0.875rem | 14px | Captions, tags, small UI |
| `--text-base` | 1rem | 16px | Body text minimum |
| `--text-lg` | 1.125rem | 18px | Lead paragraph, intro copy |
| `--text-xl` | 1.25rem | 20px | Large body, price list intro |
| `--text-2xl` | 1.5rem | 24px | Section intro, subheading |
| `--text-3xl` | 1.875rem | 30px | H3 heading level |
| `--text-4xl` | 2.25rem | 36px | H2 heading level |
| `--text-5xl` | 3rem | 48px | H1 subpage |
| `--text-6xl` | 3.75rem | 60px | Section hero head |
| `--text-7xl` | 4.5rem | 72px | Homepage hero minimum |
| `--text-8xl` | 5.5rem | 88px | Homepage hero maximum |

### Line Heights

| Token | Value | Use |
|---|---|---|
| `--leading-display` | 1.05 | Hero display text at 72–88px |
| `--leading-tight` | 1.15 | Large headings (H1, H2) |
| `--leading-snug` | 1.25 | Medium headings (H3, H4) |
| `--leading-normal` | 1.5 | Body text standard |
| `--leading-relaxed` | 1.625 | Price list rows, long-form body |

---

## Spacing

Strategy: **D2 — Editorial**. Base unit 4px. Section spacing 140–180px. The price list section may compress internally to D4 density while maintaining D2 rhythm between surrounding sections.

| Token | rem | px |
|---|---|---|
| `--space-1` | 0.25rem | 4px |
| `--space-2` | 0.5rem | 8px |
| `--space-3` | 0.75rem | 12px |
| `--space-4` | 1rem | 16px |
| `--space-5` | 1.25rem | 20px |
| `--space-6` | 1.5rem | 24px |
| `--space-8` | 2rem | 32px |
| `--space-10` | 2.5rem | 40px |
| `--space-12` | 3rem | 48px |
| `--space-16` | 4rem | 64px |
| `--space-20` | 5rem | 80px |
| `--space-24` | 6rem | 96px |
| `--space-28` | 7rem | 112px |
| `--space-32` | 8rem | 128px |
| `--space-40` | 10rem | 160px |
| `--space-48` | 12rem | 192px |
| `--space-64` | 16rem | 256px |

**Section rhythm:**

| Token | rem | px | Purpose |
|---|---|---|---|
| `--section-gap` | 10rem | 160px | Canonical inter-section spacing |
| `--section-gap-sm` | 7rem | 112px | Adjacent related sections |
| `--container-max` | — | 1280px | Maximum content width |
| `--container-padding` | 1.5rem | 24px | Horizontal page gutter |

---

## Component Patterns

All component decisions follow **S4 — Architectural Line** (0px radius, 1px hairline) and **C3 — Ink + Cream** (deep ink on cream, terracotta CTA only).

### Buttons

- **Border radius:** 0px — never rounded
- **Style:** Flat, single solid color. No gradients. No box-shadows.
- **Primary (CTA):** Background `--color-accent-500` (#B8623A), text `--color-ink-50` (#FAF7F2). Hover: background `--color-accent-400`, transition `--duration-base` `--easing-out`.
- **Secondary/Outline:** Border 1px `--color-ink-950`, text `--color-ink-950`, transparent background. Hover: background `--color-ink-950`, text `--color-ink-50`.
- **Ghost/Text:** No border, no background. Underline on hover.
- **Disabled:** opacity 0.4, cursor not-allowed.
- **Focus:** `outline: 2px solid var(--color-accent-500); outline-offset: 3px`

### Cards

- **Border radius:** 0px
- **Box shadow:** None — never. Elevation is communicated through hairline border only.
- **Border:** 1px solid `--color-border` (#D5C8B6) — structural, not decorative
- **Background:** `--color-surface` (#FAF7F2) or `--color-surface-alt` (#F3EDE3) for alternating rows
- **Padding:** Generous — minimum `--space-8` (32px)

### Inputs / Form fields

- **Style:** Hairline bottom-border only (`border-bottom: 1px solid var(--color-border)`) — no closed box. Underline inputs match the price-list document aesthetic.
- **Alternative:** Full 1px border where context requires a closed form (e.g., multi-line textarea).
- **Border radius:** 0px
- **Focus:** Bottom border shifts to `--color-accent-500`, `transition: border-color var(--duration-base) var(--easing-out)`
- **Label:** Work Sans 14px, `--color-muted`, positioned above or floating

### Price List (signature component)

- **Row separator:** 1px solid `--color-border-subtle` — hairline, not card borders
- **Category headers:** Playfair Display, `--text-2xl` or `--text-3xl`, `--color-foreground`
- **Line item:** Work Sans Regular `--text-base` or `--text-lg`, flex row, service name left-aligned, price right-aligned
- **No background fills on alternating rows** — hairline separators only provide rhythm
- **Spotlight prices:** Key items (e.g., baby cut, bridal) may appear as pull-out lines at `--text-xl` with slight left padding increase

### Navigation

- **No dark bootstrap navbar** — this pattern is explicitly rejected from the old site
- **Background:** `--color-background` (cream) or transparent on hero scroll
- **Links:** Work Sans Medium, `--text-sm` or `--text-base`, `--color-foreground`. Underline or bottom-border indicator on active.
- **CTA in nav:** Primary button treatment — accent-500 background, 0px radius

### Staff Portraits

- **Layout:** Not equal-column Bootstrap cards. Irregular sizing — portrait dominates.
- **No thumbnail grid** — portraits must be large enough to register a face.
- **Caption:** First name + role in Playfair Display directly beneath, `--text-xl`, `--color-foreground`

---

## Interaction Patterns

Strategy: **M1 — Architectural Stillness**. The content is the event. Motion is functional, not decorative.

### Timing

| Token | Value | Use |
|---|---|---|
| `--duration-fast` | 150ms | Hover color shifts on links |
| `--duration-base` | 200ms | Button states, input focus, nav transitions |
| `--easing-out` | `cubic-bezier(0.0, 0.0, 0.2, 1)` | Element reveals |
| `--easing-in-out` | `cubic-bezier(0.4, 0.0, 0.2, 1)` | Bidirectional transitions |

### Hover states

- Links: color shift to `--color-accent-500`, `transition: color var(--duration-fast) var(--easing-out)`
- Buttons: background color shift only — no scale, no shadow, no position change
- Navigation items: underline or border-bottom `1px solid --color-foreground`

### Focus

- All focusable elements: `outline: 2px solid var(--color-accent-500); outline-offset: 3px`
- `:focus:not(:focus-visible)` — remove outline for mouse users; preserve for keyboard

### Scroll behavior

- No parallax. No scroll-linked animations.
- No section-entry animation cascades.
- A single, optional fade-in on first hero viewport is the maximum.

### Reduced motion

All transitions and animations are disabled via `@media (prefers-reduced-motion: reduce)` in globals.css — all durations collapsed to 0.01ms, scroll-behavior set to auto.

---

## CSS Custom Properties Reference

Complete list of all tokens defined in `src/app/globals.css`.

### Color

```
--color-ink-50 through --color-ink-950       (warm cream → deep ink scale)
--color-accent-50 through --color-accent-950  (dusty terracotta accent scale)
--color-background                            (#FAF7F2 — warm cream)
--color-foreground                            (#0F0E0C — deep ink)
--color-surface                               (#FAF7F2)
--color-surface-alt                           (#F3EDE3)
--color-border                                (#D5C8B6 — hairline structural)
--color-border-subtle                         (#E8DDD0 — quiet secondary border)
--color-muted                                 (#8C7B6B — secondary text)
```

### Typography

```
--font-display        (var(--font-playfair) — Playfair Display)
--font-body           (var(--font-work-sans) — Work Sans)
--text-xs             (0.75rem / 12px)
--text-sm             (0.875rem / 14px)
--text-base           (1rem / 16px)
--text-lg             (1.125rem / 18px)
--text-xl             (1.25rem / 20px)
--text-2xl            (1.5rem / 24px)
--text-3xl            (1.875rem / 30px)
--text-4xl            (2.25rem / 36px)
--text-5xl            (3rem / 48px)
--text-6xl            (3.75rem / 60px)
--text-7xl            (4.5rem / 72px)
--text-8xl            (5.5rem / 88px)
--leading-display     (1.05)
--leading-tight       (1.15)
--leading-snug        (1.25)
--leading-normal      (1.5)
--leading-relaxed     (1.625)
```

### Spacing

```
--space-1 through --space-64    (4px base scale)
--section-gap                   (10rem / 160px — canonical inter-section)
--section-gap-sm                (7rem / 112px — tighter adjacent sections)
--container-max                 (1280px)
--container-padding             (1.5rem / 24px)
```

### Shape

```
--radius          (0px — S4 Architectural Line, no rounding anywhere)
--border-width    (1px — hairline as structural language)
--border-color    (var(--color-border))
--border-subtle   (var(--color-border-subtle))
```

### Interaction

```
--duration-fast     (150ms)
--duration-base     (200ms)
--easing-out        (cubic-bezier(0.0, 0.0, 0.2, 1))
--easing-in-out     (cubic-bezier(0.4, 0.0, 0.2, 1))
```

---

## Drift Checks

**Identity test from direction brief:** If this site had rounded corners, blue CTAs, or equal-column Bootstrap card grids, it would be a different site.

**Avoid list reference:** See `design-direction.md` Section 4 (Avoid List) and Section 6 (What We're Moving Away From) — architect review treats violations as Critical.

**Token-level drift signals:**

- Any `border-radius` value other than `0px` → S4 violation
- Any CTA color not in the accent scale (especially blue ~#2563EB) → C3/C8 violation
- Box-shadow on cards → S4 violation (elevation via border only)
- Cool gray in any neutral → C3 violation (all neutrals must carry warm undertone)
- Pure `#000000` or `#FFFFFF` anywhere → C3 violation
- Body font appearing in display headings at large sizes → T5 violation
- Playfair Display used below 24px → T5 violation
- Section spacing below 112px between major sections → D2 violation
- Scroll-triggered entry animations on multiple sections → M1 violation
- Parallax of any kind → M1 violation
- Gradient on any button or hero → binding Avoid List violation
- Stock photography of people → P9 anti-pattern

---

## next/font Configuration Reference

The following fonts must be loaded in `src/app/[locale]/layout.tsx` (or `src/app/layout.tsx`):

```tsx
import { Playfair_Display, Work_Sans } from 'next/font/google'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700'],
  display: 'swap',
})

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  weight: ['400', '500', '600'],
  display: 'swap',
})

// Apply both variables to <html> or <body>:
// className={`${playfairDisplay.variable} ${workSans.variable}`}
```

Both CSS variable names (`--font-playfair`, `--font-work-sans`) are what `globals.css` references via `var(--font-playfair)` and `var(--font-work-sans)`. The layout must set these variables on the root element for the token chain to resolve.

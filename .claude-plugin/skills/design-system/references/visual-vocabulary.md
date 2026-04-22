# Visual Vocabulary — Library of Design Strategies

This reference supplies concrete, named visual strategies that the Design Direction Brief (Step 5.1) pulls from. It exists because adjective-only briefs ("make it premium", "make it industrial") collapse into the same safe middle. Named strategies with real specificity force the direction to commit to visible, executable decisions.

**How to use this library:**

- The Design Direction agent reads this file and the company-brand skill, then selects exactly one strategy from each category below. The selected combination *is* the direction.
- The web-designer agent reads both this file and the resulting `design-direction.md` when building — the strategies provide the concrete vocabulary; the direction brief records the chosen combination and brand-story rationale.
- The architect agent reads this file during review to check whether the built output actually executes the chosen strategies or has drifted back toward defaults.

**The "safe default" strategies are flagged explicitly.** If the brief lands on every safe-default option across every category, that's a smell — a real brand direction has texture, and texture means some categories land on non-default strategies. Treat unanimous safe-default selection as a prompt to reconsider, not a valid outcome.

---

## 1. Typographic Strategy

Typography does more heavy lifting than color in establishing brand personality. Pick one strategy — resist the urge to combine.

Exemplars below are **open-source / Google Fonts**, chosen for zero-licensing execution. "Or equivalent" means: any font that fits the strategy's structural character (weight, contrast, x-height feel) works — don't feel bound to the named exemplars.

### T1 — Technical Mono
- **Display:** Mono family at display sizes (JetBrains Mono, IBM Plex Mono, or equivalent)
- **Body:** Humanist sans (Inter, IBM Plex Sans, or equivalent)
- **Weight usage:** Mono display mostly Regular, Body Regular + Medium, tight tracking on mono
- **Feel:** Engineering, software-adjacency, precision tools, "made by people who ship"
- **Fits:** Deep-tech, engineering firms, developer tools, industrial/technical B2B, precision manufacturing
- **Avoid when:** Hospitality, lifestyle, wellness, consumer food, anything that should feel warm or emotional

### T2 — Editorial Serif
- **Display:** Transitional or humanist serif at display sizes (Source Serif, Spectral, EB Garamond, or equivalent)
- **Body:** Quiet humanist sans or a body-weight serif
- **Weight usage:** Display Light or Regular (not Bold — restraint is the point), Body Regular + Medium
- **Feel:** Considered, literary, long-form, premium, architectural
- **Fits:** Consulting, publishing, law, architecture, luxury services, cultural institutions, premium B2B advisory
- **Avoid when:** Speed-of-execution brands, consumer tools, playful products

### T3 — Bold Grotesque
- **Display:** Modern grotesque used loud and heavy (Inter Bold at 96px+, Space Grotesk, Manrope, or equivalent)
- **Body:** Same family, Regular
- **Weight usage:** Display Bold/Black at large sizes is the signature; Body stays quiet Regular
- **Feel:** Confident, modern, declarative, "we know what we are"
- **Fits:** Product-led SaaS, creative agencies, direct-to-buyer brands, modern-industrial, design studios
- **Avoid when:** Institutions that should feel inherited or considered; anything needing editorial subtlety

### T4 — Archival Slab
- **Display:** Slab serif (Roboto Slab, Zilla Slab, Bitter, or equivalent)
- **Body:** Serif or humanist sans
- **Weight usage:** Display Medium or Bold for weight, Body Regular
- **Feel:** Industrial heritage, trust through age, mechanical era, trade press
- **Fits:** Manufacturing with long history, engineering firms, trade services, print-era institutions
- **Avoid when:** Forward-looking tech brands, minimalist design directions

### T5 — Contrast Pair
- **Display:** Elegant serif (Playfair Display, Cormorant Garamond, or equivalent)
- **Body:** Geometric sans (Work Sans, Manrope, or equivalent)
- **Weight usage:** Display Regular or Light (serif does the work through form), Body Regular + Medium
- **Feel:** Sophistication through tension between old and new
- **Fits:** Architecture practices, design consultancies, luxury B2B, premium professional services
- **Avoid when:** Direct-to-buyer consumer, speed-focused products, brands that should feel unified rather than tensioned

### T6 — Brutalist Display
- **Display:** Unusual display family — condensed, stretched, reverse-contrast, or idiosyncratic (Archivo Black, Bebas Neue, PP Editorial Old, or equivalent; commercial families like Druk or Monument Extended are typical references if the budget allows licensing)
- **Body:** Quiet neutral sans
- **Weight usage:** Display very Bold / Black, Body very Regular — maximum contrast between voices
- **Feel:** Unapologetic, editorial-with-attitude, magazine, indie-product
- **Fits:** Creative studios, fashion-adjacent B2B, publishing, music, cultural products, bold-personality companies
- **Avoid when:** Conservative industries, institutional trust-first brands, anything risk-averse

### T7 — Humanist Warmth  *(safe default — flag)*
- **Display:** Humanist sans (e.g., Inter, DM Sans, IBM Plex Sans)
- **Body:** Same family
- **Weight usage:** Display Semibold, Body Regular + Medium
- **Feel:** Approachable, safe, modern-corporate
- **Fits:** Use only when the brand genuinely demands it (healthcare, financial services for conservative audiences, government)
- **Flag:** This is the default every AI-built site lands on. Select it only when the brand-story rationale explicitly argues for warmth-over-distinctiveness. Otherwise pick one of T1–T6.

---

## 2. Color Strategy

Color strategy describes *how colors relate*, not specific hex values. Hex values are derived in Step 5.2. Pick one strategy.

### C1 — Monochrome + One Accent
- **Palette structure:** Full neutral scale (near-black through off-white) + exactly one saturated accent
- **Accent usage:** <10% of any screen — reserved for CTAs, key emphasis, active states. Never decorative.
- **Candidate accents:** Vermilion, electric blue (#0047FF-ish), acid yellow, safety orange, emerald, oxblood
- **Feel:** Editorial confidence, restraint, focus
- **Fits:** Technical brands (pairs with T1), editorial brands (pairs with T2, T6), premium services
- **Avoid when:** Brand requires warmth, multiple distinct products/categories need color coding

### C2 — Two-Temperature Split
- **Palette structure:** One warm color (~40% of surface when active), one cool color (~40%), neutral backgrounds between
- **Example pairings:** Rust + teal, ochre + ink blue, terracotta + graphite, mustard + forest
- **Feel:** Energy, duality, B2B-with-personality
- **Fits:** Creative agencies, modern-industrial, design-led companies, dual-audience brands
- **Avoid when:** Minimalist directions, single-product focus

### C3 — Ink + Cream
- **Palette structure:** Deep ink (not pure black — #0F0E0C or similar) on warm cream (not pure white — #FAF7F2 or similar). Subtle warmth throughout. Optional single muted accent.
- **Feel:** Editorial, literary, considered, avoids the cheap stark-white-with-blue
- **Fits:** Publishing, consulting, architecture, cultural institutions, premium editorial
- **Avoid when:** Tech/software brands (feels anachronistic), high-energy directions

### C4 — Saturated on Off-Black
- **Palette structure:** Near-black canvas (#0A0A0A to #101010) + one or two loud saturated colors (electric green, hot magenta, cyan, acid yellow)
- **Feel:** Premium tech, nightclub confidence, late-night software
- **Fits:** AI tooling, developer platforms, creative-tech, music/media SaaS, modern dark-mode-first products
- **Avoid when:** Daylight-use brands (construction, hospitality, education), anything institutional or conservative

### C5 — Earth Palette + Sharp Accent
- **Palette structure:** Stone, clay, graphite, olive, bone — plus one high-saturation accent (orange, electric blue, yellow)
- **Feel:** Grounded, craft, industrial heritage, material-honest
- **Fits:** Manufacturing, craft services, architecture, outdoor/industrial brands, heritage companies
- **Avoid when:** Tech-forward brands, anything that should feel digital-native

### C6 — Graphite + Chroma
- **Palette structure:** Full scale of cool grays, all with a single hue bias (everything slightly green-gray, or slightly blue-gray, or slightly warm-gray). No pure neutrals. One saturated accent from the same hue family.
- **Feel:** Technical, quiet confidence, instrument-design, precision hardware
- **Fits:** Engineering, scientific instruments, precision manufacturing, specialized B2B tools
- **Avoid when:** Warm/approachable brands, consumer-facing

### C7 — Dual Saturated (No Pastel)
- **Palette structure:** Two bold saturated colors (electric blue + safety orange, cyan + red, yellow + navy). No pastel anywhere — saturation is the signature.
- **Feel:** Industrial-tough, B2B trade, unafraid
- **Fits:** Heavy industry, safety-critical, trade services, logistics, anything that earns the word "rugged"
- **Avoid when:** Premium or editorial directions

### C8 — Corporate Safe Default  *(anti-pattern — flag)*
- **Palette structure:** One mid-blue (~#2563EB) + gray scale + white
- **Flag:** Every AI-built B2B corporate site lands here. If the brief selects this, challenge it — the brand-story rationale must explicitly argue that this specific blue-and-gray is what this brand should look like (not just "it's safe"). Otherwise re-pick.

---

## 3. Layout Strategy

How content is composed. Pick one.

### L1 — Engineered Grid
- **Structure:** Strict 12-column grid. Hard left/right edges. Every element aligns to grid lines. No floating or rotated elements. Dense-to-medium content per screen.
- **Feel:** Precision, technical, catalog-adjacent
- **Fits:** T1 Technical Mono, engineering/manufacturing brands, data-heavy products
- **Avoid when:** Editorial or brutalist directions

### L2 — Editorial Asymmetry
- **Structure:** Broken grid with columns of varying widths. Pull quotes, captions, sidebars. Intentional imbalance. Generous but not symmetric whitespace.
- **Feel:** Magazine, considered, premium
- **Fits:** T2 Editorial Serif, T5 Contrast Pair, consulting/architecture/cultural brands
- **Avoid when:** Dense-info products, instrument-style brands

### L3 — Brutalist Single Column
- **Structure:** One column, huge type, heavy declarative statements, minimal navigation, content-as-monument
- **Feel:** Personality, confidence, indie-product, "opinionated"
- **Fits:** T3 Bold Grotesque, T6 Brutalist Display, design studios, indie products
- **Avoid when:** Information-heavy sites, institutional brands

### L4 — Architectural Whitespace
- **Structure:** Vast whitespace. Content islands separated by 200–400px of air. Hero often occupies full viewport with minimal content.
- **Feel:** Luxury, architecture, restraint, "nothing to prove"
- **Fits:** Premium services, architecture practices, luxury B2B
- **Avoid when:** Content-rich sites, catalog products

### L5 — Information Dense
- **Structure:** High content-per-screen. Small type. Tables, lists, sidebars as first-class structures. Scrolling as navigation rather than pages.
- **Feel:** Technical trade, engineering catalog, reference material
- **Fits:** Engineering specs, technical B2B, trade services with deep inventories
- **Avoid when:** Premium or editorial directions — feels cheap in those contexts

### L6 — Horizontal Rhythm
- **Structure:** Content moves horizontally. Side-scrolls, carousels-as-structure, left-to-right reading of sections
- **Feel:** Kinetic, product-demo, modern-web
- **Fits:** Product-led SaaS, interactive demos, case-study heavy brands
- **Avoid when:** Content-first or reading-heavy brands — horizontal scroll fights long-form

### L7 — Standard Web Default  *(safe — flag)*
- **Structure:** Centered 1280px container, hero-then-sections, card grids of three features
- **Flag:** Default shape of every AI-built corporate site. If the brief selects this, the rationale must explain why this specific shape is what this brand should be — not "it's standard."

---

## 4. Photography / Art Direction

How imagery is produced and selected. Pick one primary strategy. A second may appear secondarily if the brand has distinct contexts (e.g., environmental portraits on About page, technical close-ups on Services).

### P1 — Technical Close-Up
- Macro detail of tools, parts, surfaces, tolerances, textures
- No people, no environments, no wider context
- Natural or hard directional lighting
- Feels: precision, craft, intimate-with-the-work
- Fits: Manufacturing, engineering, scientific instruments, craft services

### P2 — Environmental Portrait
- Team photographed in their actual work context
- Natural light, candid framing, hands-on-work
- Real faces, not stock
- Feels: authenticity, trust, human
- Fits: Services where the humans are the product (consulting, architecture, specialized trades)

### P3 — Process Documentary
- Work in progress — hands on objects, tools mid-action, partial builds, before/after
- Feels: craft, expertise, "we do the work"
- Fits: Construction, manufacturing, restoration, trades, creative production

### P4 — Product Studio
- Clean backdrop (usually single-color or gradient-free neutral), dramatic directional lighting, product-as-hero
- Feels: product-design polish, e-commerce-grade
- Fits: Physical products, hardware, consumer-adjacent B2B

### P5 — Abstract Texture
- Close-ups of textures, surfaces, materials as imagery — not the literal product/service, but *the material world* the brand inhabits (wood grain, brushed metal, cast concrete, industrial oil-on-steel)
- Feels: premium, architectural, material-honest
- Fits: Architecture, luxury B2B, heritage brands, high-end services

### P6 — Architectural Interior
- Building/facility/workshop shots as hero imagery. Wide shots, natural light, rarely cropped tight
- Feels: scale, institution, "we have a place"
- Fits: Manufacturing facilities, professional services with signature offices, institutional brands

### P7 — Illustrated Editorial
- Commissioned illustrations — not stock, not 3D-isometric-SaaS illustrations. Editorial illustration style: hand-drawn, painterly, or graphic-designed for the brand
- Feels: editorial personality, premium publication
- Fits: Consulting, publishing, cultural brands, service brands with complex ideas

### P8 — Diagrammatic / Technical Drawing
- Isometric diagrams, blueprints, schematics, technical illustrations (hand-drawn or vector)
- Feels: engineering, clarity, "shows the work"
- Fits: Engineering firms, systems-design products, architecture, technical consultancies

### P9 — Stock Photography  *(anti-pattern — flag)*
- Generic stock: handshakes, people pointing at laptops, diverse smiling teams around a conference table, aerial cityscapes
- **Flag:** This is the signature of the bland, cheap-looking site. Never select this strategy. If no real photography exists and commissioning isn't feasible, prefer P5 Abstract Texture, P8 Diagrammatic, or no imagery at all (typography-led composition) over stock.

---

## 5. Shape / Form Language

The geometry of the interface.

### S1 — Sharp Right-Angle
- **Border radius:** 0px on all surfaces, including buttons and inputs. Inputs may have a 1px underline instead of a bordered box.
- **Feel:** Technical, industrial, engineering
- **Fits:** T1 Technical Mono, C1 Monochrome+Accent, L1 Engineered Grid

### S2 — Micro-Radius  *(neutral default)*
- **Border radius:** 2–4px everywhere. Present but barely visible.
- **Feel:** Modern-corporate, neutral
- **Fits:** Most warmth directions; default if no strong shape language is chosen

### S3 — Soft Pill
- **Border radius:** 8–16px on cards, 8px on buttons
- **Feel:** Friendly, SaaS-consumer, approachable
- **Fits:** Consumer-adjacent B2B, healthcare, education
- **Avoid when:** Technical/industrial directions — signals soft where brand is hard

### S4 — Architectural Line
- **Border radius:** 0px. Primary structural language is 1px hairline dividers between sections and between elements. Borders rarely close shapes — they draw structure.
- **Feel:** Editorial, considered, print-adjacent
- **Fits:** T2 Editorial Serif, L2 Editorial Asymmetry, C3 Ink+Cream

### S5 — Heavy Border
- **Border radius:** 0px or micro. Borders are thick — 2–4px, usually near-black.
- **Feel:** Brutalist, indie-product, unafraid
- **Fits:** T6 Brutalist Display, L3 Brutalist Single Column
- **Avoid when:** Premium or delicate directions — reads aggressive

---

## 6. Density / Whitespace

How much content fits per screen, and at what scale.

### D1 — Luxurious
- **Hero type:** 80–120px+
- **Section spacing:** 200–400px vertical between sections
- **Content density:** Low — one idea per viewport
- **Feel:** Premium, unhurried, confident
- **Fits:** L4 Architectural Whitespace, T2 Editorial Serif, high-end services

### D2 — Editorial
- **Hero type:** 64–96px
- **Section spacing:** 120–200px
- **Content density:** Medium — considered pacing
- **Feel:** Magazine, reading-forward
- **Fits:** L2 Editorial Asymmetry, most editorial directions

### D3 — Standard Web
- **Hero type:** 48–72px
- **Section spacing:** 80–120px
- **Content density:** Medium — default web rhythm
- **Fits:** Most directions; the neutral default

### D4 — Information-Dense
- **Hero type:** 32–48px
- **Section spacing:** 48–80px
- **Content density:** High — multiple ideas per viewport, tables/lists first-class
- **Fits:** L5 Information Dense, technical-catalog brands

---

## 7. Interaction / Motion Personality

How the interface behaves over time.

### M1 — Architectural Stillness
- **Transitions:** 150–200ms ease-out. Only essential (hover feedback, focus rings, page transitions).
- **Scroll:** No parallax, no scroll-linked animation beyond a single entry fade if any
- **Feel:** Confident, considered, "the content is the event"
- **Fits:** L4 Architectural Whitespace, editorial directions, premium services

### M2 — Precise Micro
- **Transitions:** 100–150ms ease-in-out, crisp, mechanical. No overshoot.
- **Scroll:** None linked to scroll
- **Feel:** Tool-like, instrument-grade, technical
- **Fits:** T1 Technical Mono, engineering-instrument brands

### M3 — Editorial Fade
- **Transitions:** 400–600ms ease-out on section reveals. Gentle scroll-linked parallax for hero imagery (subtle — max 20% of image height).
- **Feel:** Magazine, premium, unhurried
- **Fits:** L2 Editorial Asymmetry, D1 Luxurious

### M4 — Kinetic Expressive
- **Transitions:** Varied — some sharp, some long, scale/rotation on interactions, deliberate motion as personality
- **Feel:** Creative studio, design-agency, product-demo
- **Fits:** T3 Bold Grotesque, T6 Brutalist Display, design services
- **Caution:** Easy to make amateurish. If selected, the execution bar is higher — every motion must feel intentional.

### M5 — Minimal Static  *(safe default — flag)*
- **Transitions:** Basic hover states only. No scroll animation. No page transitions.
- **Flag:** Not wrong, but safe. If selected, ensure it's because the direction calls for stillness (M1 Architectural Stillness is the more intentional version), not because motion wasn't considered.

---

## 8. The Binding "Avoid" List

These patterns appear in almost every AI-built corporate site. Treat them as off-limits unless the direction brief explicitly argues for one (with brand-story rationale — "it's what B2B sites do" is not a rationale). The architect agent checks the built output against this list.

### Color
- Pastel-gradient hero (blue-to-purple fade, orange-to-pink fade, any sunset-style gradient background)
- Safe mid-blue + gray + white as a default without rationale
- Gradient buttons (solid color or outline only — gradients require brief-level rationale)
- Bright accent used on >15% of any screen (accents are accents; when they become fields, they stop drawing attention)

### Typography
- Single sans family used everywhere without display/body contrast
- Emoji in headings
- All-caps body copy (labels and eyebrows only)
- Letter-spaced body text ("expanded" tracking on long-form is a print-era mistake)
- Display type smaller than 48px on desktop hero (below that, it's not a display — commit to D4 Information-Dense deliberately instead)

### Imagery
- Stock photography of people — handshakes, teams-pointing-at-laptops, diverse-smiling-around-conference-table, confident-person-on-phone-looking-at-window
- Floating 3D isometric illustrations of abstract concepts (cloud, cube, pipeline, rocket)
- Literal icon sets from Heroicons/Feather used as section decorations without custom treatment
- Hero images that are clearly company-agnostic (generic skyline, handshake, lightbulb)

### Layout
- Three-up card grid of features with emoji or generic icon + bold heading + 2 lines of body
- "Trusted by" logo strip as the only trust signal, without context
- Stat blocks with no source ("98% customer satisfaction" with no link, year, or methodology)
- Hero → features → testimonials → CTA — the default SaaS landing page structure, when the brand is not a SaaS product

### Copy (visible from design review)
- "Leverage", "empower", "unlock", "streamline", "synergy", "seamless"
- "Welcome to [Company]. We are a leading provider of..."
- Sentence-case marketing speak that could belong to any company in the category

### Motion
- Gratuitous parallax (hero image moves at a different speed than foreground for no reason)
- Scroll-triggered number counters ("5,000+ clients" counting up) unless the direction is Kinetic Expressive
- Section entry animations on every section — reads amateurish
- Button hover that does more than two things at once (color + scale + shadow + position)

---

## 9. Conflicting Combinations — flag these

- T2 Editorial Serif + M4 Kinetic — editorial calls for stillness; kinetic editorials usually fail
- T6 Brutalist Display + C8 Corporate Safe Default — defeats the point of brutalist; either commit or don't
- L5 Information Dense + D1 Luxurious — contradictory density signals
- Any strategy + P9 Stock Photography — P9 is the failure mode, never the answer

If the direction brief lands on a conflicting combination, the Design Direction agent should reconsider rather than execute the conflict. (A coherent-combinations table is not provided here — the Design Direction agent is expected to compose coherent combinations from the strategy descriptions above; a prescriptive table encourages copy-paste.)

---

## 10. Selection Rule

The Design Direction agent selects **one strategy per category** (1 through 7) based on the brand-story argument. The selection is recorded in `design-direction.md` with one-sentence rationale per choice.

**Tie-breaker when unsure:** Pick the strategy that is *further from default*. The default (T7 / C8 / L7 / P9 / S2 / D3 / M5) is where AI-built sites land by gravity. If the brand-story rationale is roughly equal for a default and a non-default, the non-default wins — the pipeline has existing pressure toward defaults, so the direction brief's job is to push against that gravity.

**Hard stop:** If every selection is a flagged default or safe choice, the direction has failed its job. Re-pick at least two categories with brand-story rationale that justifies the non-default choice.

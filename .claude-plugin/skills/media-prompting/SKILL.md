---
name: media-prompting
description: Patterns for translating a site's committed design direction (from `design-direction.md`) into detailed image-generation prompts the human can paste into Midjourney / DALL-E / Firefly / etc. Use this skill whenever the web-designer or the `/generate-media-prompts` command needs to author or revise a row in `public/images/IMAGE_REQUESTS.md`. Covers P-strategy → prompt language mapping, aspect/focal conventions per role, and negative-prompt patterns that suppress AI stock-photo sheen.
---

# Media Prompting

The generation prompt for every image the site needs lives in `public/images/IMAGE_REQUESTS.md` (the manifest). This skill covers *how* to write those prompts — what goes in, what stays out, and how the committed P-strategy from `design-direction.md` constrains the language used.

The manifest is the source of truth for image requests. Code markers like `[NEEDS:image IMG-home-hero-001]` are pointers that reference a manifest row by ID — they do not duplicate the prompt.

## When to use

- During Step 6 page build: every time the web-designer decides a page section needs an image that doesn't already exist in `public/images/IMAGE_CATALOG.md`, it adds a manifest row using these patterns.
- During `/generate-media-prompts`: reconciling orphan `[NEEDS:image …]` markers into manifest rows, or refreshing rows after a `design-direction.md` revision.

## Manifest row schema

Every row in `IMAGE_REQUESTS.md` follows this exact shape. Fields are listed in order — keep them in order so rows are scannable.

```markdown
## IMG-<route-slug>-<section>-<nnn>

- **Route / component:** <route> — <ComponentName or section label>
- **Source:** <src/app/.../page.tsx:LINE — section anchor>
- **Role:** hero | content | card | background | decorative
- **Target slot:** public/images/<category>/<filename> (extension chosen on install: .jpg / .webp / .avif)
- **Dimensions / aspect:** <px>×<px>, <w>:<h>
- **Focal point:** <center / lower-right third / top band / etc.>; <mobile crop note>
- **Alt intent:** <one-line semantic description to seed the final alt text>
- **Locale behavior:** shared asset | locale-specific (one row per locale if text is baked in — avoid by default)
- **P-strategy:** <P2 Environmental Portrait> (quote from design-direction.md: "...")
- **Prompt:**
  ```
  <ready-to-paste generation prompt — see "Prompt body" below>
  ```
- **Negative prompt:** <comma-separated list — see "Negative prompt patterns" below>
- **Rights / privacy notes:** <model release, trademark, facility-access caveats>
- **Status:** pending
- **Installed path:** *(filled when status → installed)*
```

**ID convention:** `IMG-<route-slug>-<section>-<nnn>`. Example: `IMG-home-hero-001`, `IMG-about-team-portrait-003`. The numeric suffix disambiguates multiple images in the same section. IDs are never reused — a rejected image's ID stays retired in the manifest with status `rejected` so archaeology is possible later.

**Why no prompt-version fields:** the manifest is committed markdown. `git log -p public/images/IMAGE_REQUESTS.md` answers "why was this prompt rewritten?" Don't duplicate git history in the schema.

## Prompt body — what to include

A ready-to-paste prompt is one or two paragraphs that specify, in this order:

1. **Subject** — concrete, observable. "A machinist hand-fitting a bronze bearing into a steel housing" beats "a worker in a factory."
2. **Setting** — where it is. Specific: "on a machined aluminum workbench in a dimly lit toolroom" beats "in an industrial environment."
3. **Composition** — shot type + framing + focal-point placement. "Medium close-up, subject in lower-right third, workbench extends into frame left, shallow depth of field."
4. **Light** — source + quality + direction. "Single-source overhead fluorescent with warm fill from a desk lamp, cool highlights on metal, no flash."
5. **Surface / texture language** — tied to the committed P-strategy. P1 Technical Close-Up demands machined-surface vocabulary; P5 Abstract Texture demands material-grain vocabulary; P2 Environmental Portrait demands fabric/skin/tool-worn vocabulary.
6. **Style keywords** — keep to 3–6. Include the P-strategy's implicit aesthetic (e.g., "documentary, unstaged, 35mm film grain" for P3 Process Documentary). Do NOT include "professional, high-quality, award-winning" — those are default-drift flags.
7. **Palette constraint** — cite one or two hex values from `globals.css` tokens so the generation matches the site's color system.

The prompt MUST NOT include: generator-specific syntax (`--ar`, `--style raw`, `/imagine`). The manifest is generator-agnostic — the human picks the tool and adds the flags when pasting.

## P-strategy → prompt language mapping

Each committed photography strategy carries a distinct visual grammar. The prompt body must speak that grammar. Read the committed strategy in `design-direction.md` first, then pick vocabulary from the matching block below.

### P1 — Technical Close-Up
- **Subject grammar:** part, joint, surface, fitting, edge, tolerance.
- **Setting grammar:** toolroom, inspection bay, CNC stage, assembly fixture.
- **Composition grammar:** macro, shallow depth of field, subject fills frame.
- **Light grammar:** directional, raking, single-source, specular highlights on machined surfaces.
- **Style grammar:** "documentary macro," "catalog-reference lighting," "no bokeh beads."
- **Avoid:** hands holding the part in hero shot (reads as staged), glove close-ups (cliché).

### P2 — Environmental Portrait
- **Subject grammar:** named role engaged in the work (welder mid-tack, operator at control panel, designer at drafting board).
- **Setting grammar:** working environment with visible tools of trade in supporting frame.
- **Composition grammar:** medium shot, subject off-center per rule-of-thirds, workspace extends.
- **Light grammar:** natural + one practical; avoid studio lighting.
- **Style grammar:** "unstaged documentary portrait," "35mm," "Leica-style candid."
- **Avoid:** direct camera smile, arms crossed against white wall, safety-vest product-shot pose.

### P3 — Process Documentary
- **Subject grammar:** the work happening — sparks, hand motion, transfer of parts, measurement being taken.
- **Setting grammar:** real production floor, time-of-day evidence (shift lights, dust, wear).
- **Composition grammar:** wider frame, motion implied, multiple focal layers.
- **Light grammar:** mixed-temperature, practical sources visible, cooler shadows.
- **Style grammar:** "reportage," "observational," "long-form magazine photography."
- **Avoid:** posed tableaux, clean-floor studio recreations.

### P4 — Product Studio
- **Subject grammar:** the thing alone, on seamless.
- **Setting grammar:** minimal or seamless, no prop clutter.
- **Composition grammar:** three-quarter hero angle, grounded.
- **Light grammar:** soft-box + rim light; clean gradient falloff.
- **Style grammar:** "studio product photography," "catalog reference," "clean seamless."
- **Avoid:** floating products with shadow pasted below, confetti/lifestyle props.

### P5 — Abstract Texture
- **Subject grammar:** the material itself — brushed metal, anodized aluminum, cast iron, woven composite.
- **Setting grammar:** NO setting — fill the frame with the material surface.
- **Composition grammar:** flat or near-flat perspective, grain parallel to frame axis.
- **Light grammar:** raking side-light, 20–30° angle, reveals texture.
- **Style grammar:** "material catalog," "surface study," "topographic macro."
- **Avoid:** any human element, any object, any context.

### P6 — Architectural Interior
- **Subject grammar:** the space — workshop, reception, corridor, warehouse.
- **Setting grammar:** the space IS the subject.
- **Composition grammar:** symmetrical or one-point perspective, leading lines.
- **Light grammar:** ambient + practical, wide dynamic range, windows not blown out.
- **Style grammar:** "architectural interior photography," "tripod-stabilized," "long exposure permitted."
- **Avoid:** fisheye distortion, wide-angle people-in-foreground, lifestyle staging.

### P7 — Illustrated Editorial
- **Subject grammar:** concept or metaphor — not literal photography.
- **Setting grammar:** illustrated context, flat or limited-depth.
- **Composition grammar:** editorial — single focal point, deliberate negative space.
- **Style grammar:** "editorial illustration," "flat vector with limited gradient," "print-magazine aesthetic."
- **Avoid:** photorealism, 3D rendering, stock illustration cliché (lightbulbs, chess pieces, puzzle pieces).

### P8 — Diagrammatic / Technical Drawing
- **Subject grammar:** the mechanism, system, or process as a drawing.
- **Composition grammar:** orthographic, exploded, or isometric.
- **Style grammar:** "technical illustration," "ISO line-weight conventions," "blueprint aesthetic."
- **Avoid:** photographic rendering, soft shadows, perspective ambiguity.

### P9 — Stock Photography *(anti-pattern — never generate)*
If the committed strategy is P9, stop. P9 is in the vocabulary as an anti-pattern — no site should commit to it. Check the direction brief for a real P-strategy and prompt that error to the web-designer.

## Role → dimensions table

Use these defaults unless the page design demands otherwise. Aspect ratio matters more than exact pixels — the installed asset will be resized per viewport.

| Role | Aspect | Target px (desktop) | Focal-point convention |
|------|--------|---------------------|------------------------|
| hero | 16:9 | 1920×1080 | Subject in lower-right third; mobile crops to center, subject MUST survive. |
| content | 4:3 | 1200×900 | Subject centered, 15% safe margin all sides. |
| card | 1:1 | 800×800 | Tight crop, subject dominates 70%+. |
| background | 16:9 or 21:9 | 2400×1350 / 2400×1029 | No focal — even texture across frame, avoid hot spots. |
| decorative | varies | 600×800 or 800×1200 | Off-center accents; can tolerate creative crop. |

Always include the aspect + target px + focal-point convention in the manifest row. The aspect is binding; the px is a target.

## Negative prompt patterns

Negative prompts exist to suppress the AI defaults that make generated imagery look like every other generated site. Start from this base list and add direction-specific items.

### Always exclude
- stock-photo sheen
- plastic skin, flawless skin, beauty retouching
- overly saturated, oversharpened, HDR crush
- fake smiles, staged handshakes, perfect posture
- generic open-plan office with ceiling lights
- glass skyscraper lobby, glass conference room
- product in hand in a boardroom
- text, logo, watermark, caption, signature
- three-quarter-turned diverse team in matching blazers

### Add when humans are in frame
- model release pose, catalog pose
- pointing at a laptop
- looking over shoulder at the camera
- arms crossed, hip-out stance

### Add when industrial / product work is in frame
- spotless floor, zero wear, showroom polish
- unrealistic LED accent lighting on machinery
- color-graded teal-and-orange

### Add per committed strategy
- **P1/P5:** human elements, props, context distractions
- **P2:** studio lighting, white seamless, over-posed
- **P3:** staged recreations, perfect floor, no wear
- **P4:** lifestyle props, people in frame
- **P6:** fisheye, wide-angle distortion
- **P7:** photorealism, 3D, stock-illustration cliché (lightbulb/gears/puzzle)

## Rights, privacy, and integrity

Some categories of imagery carry obligations the manifest must track:

- **Team portraits (P2):** every recognizable person needs a model release. If the image is generated, that person cannot be an existing employee rendered without consent — either generate composite likenesses clearly marked as such, or flag `Rights: requires real team photo, generation not permitted`.
- **Facility shots (P3, P6):** permissions from the facility owner. If the facility is a client's, the manifest row must say `Rights: client facility — permission required before publication`.
- **Client logos or trademarked products:** never generate — reference existing marks via the client's brand assets.
- **Generated likenesses of real events:** don't pretend they're documentary. Flag `Rights: synthetic composite — not to be presented as documentary evidence`.

When in doubt, leave a note in the row's **Rights / privacy notes** field and surface it in the manifest summary at Step 8.

## Examples

### Example 1 — Homepage hero, P2 Environmental Portrait

```
## IMG-home-hero-001

- **Route / component:** / (homepage) — HeroSection
- **Source:** src/app/[locale]/page.tsx:42 — hero
- **Role:** hero
- **Target slot:** public/images/hero/homepage-hero
- **Dimensions / aspect:** 1920×1080, 16:9
- **Focal point:** subject in lower-right third, workbench extends into frame left; mobile crop keeps subject visible
- **Alt intent:** Machinist inspecting a precision bearing at a workbench
- **Locale behavior:** shared asset
- **P-strategy:** P2 Environmental Portrait (quote: "Environmental portraits in working context — subject shown doing the work, not posed for the camera.")
- **Prompt:**
  ```
  A machinist in a worn denim apron examining a precision bronze bearing under
  a magnifier at a machined aluminum workbench. Medium close-up, subject in
  lower-right third, workbench and tool drawers extend into frame left.
  Single-source cool overhead fluorescent with warm fill from a desk lamp;
  specular highlights on the bearing; shallow depth of field. Documentary
  portrait, 35mm film grain, unstaged. Palette biased toward graphite and
  warm brass, accent drawn from #0B3D2E (site accent).
  ```
- **Negative prompt:** stock-photo sheen, fake smile, posed handshake, safety-vest catalog pose, plastic skin, perfect floor, oversharpened, HDR, text, watermark, arms crossed, hip-out stance
- **Rights / privacy notes:** real company machinist OR composite — if composite, mark on page as stylized; no recognizable likeness without model release
- **Status:** pending
- **Installed path:**
```

### Example 2 — Service card, P5 Abstract Texture

```
## IMG-services-cnc-card-001

- **Route / component:** /services/cnc — ServiceCard
- **Source:** src/app/[locale]/services/cnc/page.tsx:18 — card
- **Role:** card
- **Target slot:** public/images/services/cnc-card
- **Dimensions / aspect:** 800×800, 1:1
- **Focal point:** flat material fills frame; no singular focal point
- **Alt intent:** Brushed aluminum surface with visible tool-mark grain
- **Locale behavior:** shared asset
- **P-strategy:** P5 Abstract Texture (quote: "Surface-first material photography — the material is the subject.")
- **Prompt:**
  ```
  Extreme macro of brushed aluminum surface with visible tool-mark grain,
  grain parallel to frame axis. Raking side-light at 25° reveals ridge
  topology. Flat perspective, no depth. Palette: graphite to light steel,
  cool white highlights. Material catalog aesthetic, surface study, no
  subject beyond the material itself.
  ```
- **Negative prompt:** human elements, tools in frame, any object, warm tones, vignette, text, watermark, HDR, oversharpened
- **Rights / privacy notes:** none
- **Status:** pending
- **Installed path:**
```

## Writing checklist

Before adding a row to `IMAGE_REQUESTS.md`, verify:

- [ ] ID follows `IMG-<route-slug>-<section>-<nnn>` pattern
- [ ] Source cites a specific file and line
- [ ] P-strategy matches a real selection in `design-direction.md` and the quote is verbatim
- [ ] Prompt body uses the P-strategy's subject/setting/composition/light grammar
- [ ] No generator-specific syntax (`--ar`, `/imagine`) in the prompt
- [ ] Negative prompt includes the "always exclude" base + per-strategy additions
- [ ] Role + aspect + dimensions + focal-point are all filled
- [ ] Rights/privacy note is present (even if the note says "none")
- [ ] Status is `pending`

## Outputs — where this skill's output lands

- `public/images/IMAGE_REQUESTS.md` — the single authoritative manifest. One row per needed image, grouped by route where convenient.
- `[NEEDS:image <ID>]` markers in code — pointers to manifest rows. Do NOT duplicate prompt text in markers.

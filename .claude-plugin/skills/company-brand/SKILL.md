---
name: company-brand
description: This skill should be used when designing, styling, or writing content for the website. It provides company facts, brand attributes, and design constraints — without prescribing specific colors, fonts, or layouts. The designer/agent makes those creative decisions. Use this skill whenever the user mentions "brand", "style", "design direction", or when building any page or component that needs company context. Also trigger when writing copy or establishing tone for the site.
---

# Saxen — Brand Context

Essential facts and constraints for designing the website. This skill provides the **what** and **why** — the designer decides the **how**.

## Brand Strength Assessment

**Rating:** Thin

**Sources used:** Old website (saxen.dk — 3 pages crawled: homepage, treatments/prices, staff directory), cookie policy page, booking system login page (saxenhjoerring.bestilling.nu).

**Confidence level:** Medium — core facts (name, location, services, staff count, prices) are directly extracted. Positioning, tone, and competitive advantages are inferred from the service offering and Danish hair salon industry context, since the site contains almost no brand copy beyond a single welcome paragraph.

**What was strong:**
- Complete, detailed price list covering 35+ distinct services — unusually transparent for a hair salon
- Real staff photos for all 6 team members (names confirmed)
- Clear address, phone, and opening hours
- Schema.org markup confirms the business type as `HairSalon`
- Structured online booking system (Admind) already in place

**What was weak or missing:**
- No brand story, no founding year, no "About Us" page
- Single welcome paragraph as the only brand copy — generic and minimal
- No certifications, associations, or professional accreditations listed
- No social media presence linked from the site (no Instagram, Facebook, etc.)
- No testimonials, reviews, or case studies
- No tagline or positioning statement
- No mention of product brands used (e.g., Wella is implied by "Wella Plex" service but not featured)
- No CVR number or company registration details on site
- Staff listed by first name only — no roles, specialisms, or bios

**Key questions for client:**
1. What year was Saxen founded, and is there a founding story worth telling?
2. Are you members of any hairdresser associations (e.g., Frisørernes Arbejdsgiverforening)?
3. What product brands do you use in the salon (Wella confirmed — others?)
4. Do you have a Facebook or Instagram presence even if not linked from the site?
5. Which stylist is the owner/manager, and should that be highlighted?

---

## Company Facts

- **Name:** Saxen
- **Founded:** Unknown — ask client
- **Location:** Jernbanegade 1, 9800 Hjørring, Denmark
- **Specialty:** Full-service hair salon — women's and men's cuts, coloring, highlights, styling, perms, eyebrow and lash treatments
- **Employees:** 6 *(directly stated: "Hos Saxen er vi 6 ansatte")*
- **Certifications:** Unknown — ask client *(Wella Plex service implies Wella product partnership; no certifications listed on site)*
- **Markets:** Local consumers in Hjørring and the North Jutland region; B2C only
- **Languages:** Danish (primary); no language switcher or English version present

### Industry-specific facts

- **Product brands used:** Wella *(inferred from "Wella Plex behandling plus hjemmeprodukt" in price list)*; additional brands unknown — ask client
- **Booking system:** Admind A/S online booking platform (saxenhjoerring.bestilling.nu); not all services bookable online — color/highlight services require a phone call
- **Opening hours:** Mon–Fri 09:00–17:30, Sat 08:00–13:00
- **Contact email:** susanne@karlborg.dk *(likely the owner's personal/business email — Susanne is the first-listed staff member)*
- **Contact phone:** 98 92 00 99

### Named staff (first names only)
Susanne, Anita, Heidi, Tina, Merete, Camilla *(roles and seniority unknown)*

---

## Brand Positioning

Saxen positions as a friendly, experienced local hair salon in Hjørring that prioritizes the individual customer — listening to personal wishes and guiding product choices — over a transactional or factory-floor approach.

**Company DNA:** "Vi sætter fokus på kunden og tager udgangspunkt i dine personlige ønsker" *(We focus on the customer and start from your personal wishes)* — the closest thing to a positioning statement on the current site.

**Competitive advantages:**
- **Experienced, stable team** — 6 staff "med flere års erfaring" (several years of experience); a stable local team signals consistency and low stylist turnover, which matters in the salon industry
- **Full service range** — comprehensive offering from baby cuts to bridal styling, men's services, perms, color correction, and brow/lash treatments; customers can bring the whole family
- **Transparent pricing** — unusually detailed public price list covering 35+ line items; builds trust compared to salons that require a consultation before quoting
- **Personal consultation approach** — explicitly guides product choices alongside services, suggesting a more advisory than purely transactional relationship
- **Convenient booking** — online booking system available; color/highlight bookings handled by phone, positioning the team as hands-on for more complex services

**Messaging rules:**
- Never lead with generic claims ("high quality", "professional service") — the site already overuses these and they carry no weight
- Lead with the personal, human, local angle — real people, real Hjørring salon, specific staff names
- Attract customers who want a stylist who listens, not just a price-per-cut transaction
- The detailed price list is a differentiator — it says "we respect your time and your budget, no surprises"
- Frame the phone-booking requirement for color services as a positive: "We take the time to get your color right before you come in"

---

## Brand Attributes

The website should communicate these qualities:

- **Personal** — Six real people with names and faces, not a branded chain. Every visit is tailored to the individual customer's wishes. The salon name (Saxen — scissors in Danish, informal) feels approachable, not corporate.
- **Experienced** — Multiple years of collective experience, a stable team, and a complete service menu that covers everything from baby cuts to bridal styles signals a well-run, proven salon.
- **Transparent** — Full public price list with no hidden costs. Customers know exactly what they're paying before they walk in. This is an unusual and trust-building differentiator in Danish hair salons.
- **Local and genuine** — A Hjørring institution, not a franchise. Contact via one team member's personal email reinforces the small-business, personal-touch feel.
- **Accessible** — Online booking, clear hours, easy-to-find address. Welcoming to all: women, men, children (baby cuts through bridal), confirming a broad community salon identity.

---

## Audience

| Audience | What They Care About | How They Arrive |
|----------|---------------------|-----------------|
| Local women (primary) | Consistent results, stylist who knows them, full color/styling range | Word of mouth, repeat visits, Google search "frisør Hjørring" |
| Local men | Quick, no-fuss cuts; beard trim add-on; competitive price (355 kr men's cut) | Google, walked by the salon, wife/partner recommendation |
| Families with children | Baby/children's cuts, friendly atmosphere, price predictability | Local reputation, parent networks, existing customer loyalty |
| Special occasion clients | Bridal styling (960 kr), confirmation updos (660 kr), formal styling | Google "brudefrisure Hjørring", peer referral, seasonal demand |

---

## Design Constraints

- **Accessibility:** WCAG 2.1 AA compliance
- **Performance:** Server Components by default, optimized images, fast LCP
- **Multilingual:** Danish (primary). No English version currently — confirm with client if English is desired for the redesign. Layouts must accommodate text length variation if added later.
- **Mobile-responsive:** Design for both desktop and mobile/tablet visitors — local customers will search on phones
- **Authentic feel:** This is a real local salon with real staff — design should feel genuine and personal, not like a national chain or stock-photo template

---

## Tone of Voice — Principles

- **Warm and direct** — Danish informal register ("vi", "dig", "du"). Not stiff or corporate. The current "Vi glæder os til at se dig her i salonen" (We look forward to seeing you here in the salon) is the right tone — keep that warmth.
- **Simple and clear** — Short sentences, no jargon. Customers range from teenagers to elderly locals. Never assume prior knowledge of hair terminology.
- **Personal, not promotional** — Avoid "world-class" or "best in class" language. Speak as a friendly expert neighbor, not a marketing department.
- **Honest about specifics** — The price list ethos extends to copy: state what you do, who does it, where you are, when you're open. No vague promises.
- **Inviting, not pressuring** — CTAs should feel like an open invitation ("Book a time" / "Call us"), not a sales push.

**Per language:**
- **Danish:** Professional but warm. Use "vi" and "du" freely. Mirror the friendly, local tone of the existing welcome text — amplified and more specific. Avoid formal "De" pronoun.
- **English (if added):** Slightly more formal but still friendly. Target tourists or new residents in Hjørring. Standard hair salon terminology.

---

## What This Skill Does NOT Prescribe

The following are creative decisions for the designer/agent to make:
- Color palette, font choices, layout patterns
- Visual style and aesthetic direction
- Animation and interaction patterns
- Specific component designs

These should emerge from the design process, informed by the brand attributes and company context above.

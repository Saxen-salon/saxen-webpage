# Supporting Pages — Content Requirements

Content requirements for About, Contact, News/Blog, Jobs, and legal pages.

---

## About Page

### Page Goal
Build trust through history, people, facility, and certifications. Often the deciding factor for buyers choosing between shortlisted suppliers.

### Required Content Elements

| Element | Priority | Content Needed |
|---------|----------|---------------|
| Company story | Required | Founding narrative, growth, current position, vision. 2-3 paragraphs. |
| Key facts | Required | Founded year, employee count, facility details, production capacity |
| History milestones | Recommended | Key dates with milestone descriptions (timeline format) |
| Facility showcase | Recommended | Photos showing modern equipment, work environment, scale |
| Certifications | Required | Quality certifications with years obtained |
| Team/leadership | Optional | Key people with name, title, and photo |
| Values/approach | Recommended | 3-4 concrete values tied to customer benefit |
| Location | Recommended | Where the company is located, accessibility for visitors |

### SEO: Organization schema

---

## Contact Page

### Page Goal
Convert inquiries with zero friction. Make every contact method immediately visible.

### Required Content Elements

| Element | Priority | Content Needed |
|---------|----------|---------------|
| Contact methods | Required | Phone, email, address — all visible without scrolling |
| Inquiry form | Required | Fields appropriate to the business (name, company, email, project description) |
| Response promise | Required | "We respond within 24 hours" or similar commitment |
| Business hours | Required | Operating hours with timezone |
| Map/location | Recommended | Visual location, directions |
| Department contacts | Optional | If different contact points exist for different needs |

### Form Design Requirements
- Clear validation and error messages (both client-side and server-side)
- Success state confirming submission and expected response time
- **Server-side submission is mandatory** — use a Server Action (`'use server'`) or API route. The form must actually process data (send email, write to CRM, or store submission). A form that renders but does nothing is a critical defect — it's the primary lead generation tool.
- Loading/disabled state on submit button to prevent double submission
- Consider file upload if relevant (technical drawings, specifications, RFPs)
- Honeypot field or similar anti-spam measure (no CAPTCHAs — they hurt conversion)

### SEO: ContactPage + LocalBusiness schema

---

## News / Blog

### Page Goal
Fresh content for SEO. Demonstrate ongoing activity. Thought leadership.

### Important: Don't launch what you can't fill
An empty or barely-populated blog signals neglect, not activity. Only build this section when the company can commit to regular publishing (1-2 articles/month minimum).

### Required Content Elements

**Listing page:**
| Element | Priority |
|---------|----------|
| Post collection with date, title, excerpt | Required |
| Category/tag filtering | Recommended |
| Pagination | Required (if >10 posts) |

**Individual post:**
| Element | Priority |
|---------|----------|
| Title, date, author | Required |
| Body content | Required |
| Featured image | Recommended |
| Related posts | Recommended |

### SEO: Blog + BlogPosting schema

---

## Jobs Page

### Page Goal
Attract talent. Show what it's like to work at this company.

### Important: Match scope to reality
A 20-person company with 0-1 openings doesn't need a full careers section. A "We're hiring" section on the About page with a contact email is sufficient until there are 3+ open positions.

### Required Content Elements

| Element | Priority |
|---------|----------|
| Open positions list | Required |
| Company culture / benefits | Recommended |
| Team/facility photos | Recommended |
| Application method | Required |

### SEO: JobPosting schema per position

---

## Legal Pages (Privacy, Cookies)

### Page Goal
Legal compliance. Should exist and be accurate but don't need to be a design focus.

### Required Content Elements
- Privacy policy compliant with GDPR / relevant regulations
- Cookie policy listing categories (necessary, analytics, marketing)
- Cookie consent banner with preference toggles
- Last updated date

### Localization Requirement
**Legal pages must be fully translated into all configured locales.** These pages sit under the `[locale]` route and users will see them in their language context. English-only legal content on a Danish-language site is a GDPR compliance risk — consent must be informed, which requires the user's language.

### Cookie Consent Enforcement
The cookie consent banner must **actually enforce preferences**, not just collect them:
- Analytics scripts (Vercel Analytics, Google Analytics, etc.) must be blocked until the user consents to analytics cookies
- Marketing scripts must be blocked until the user consents to marketing cookies
- Only strictly necessary cookies may be set without consent
- Consent state must persist across sessions (stored in a cookie itself, which is categorized as "necessary")
- Implement by conditionally rendering script components based on consent state, not by loading scripts and hoping the banner blocks them

### SEO: Minimal — noindex is acceptable for legal pages

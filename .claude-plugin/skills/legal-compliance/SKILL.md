---
name: legal-compliance
description: Legal and regulatory compliance patterns for corporate websites, focusing on EU/GDPR requirements. Covers cookie consent implementation, privacy policy requirements, form data handling, and accessibility compliance statements. Use this skill when building legal pages (privacy policy, cookie policy), implementing cookie consent, handling form data, or during production readiness checks for compliance. Trigger when the user mentions "GDPR", "cookie consent", "privacy policy", "legal pages", "compliance", "data protection", or "accessibility statement".
---

# Legal Compliance — EU/GDPR Patterns

Legal compliance is non-negotiable. Getting it wrong exposes the company to fines and liability. Getting it right is straightforward if you follow these patterns.

## Cookie Consent

### Requirements (EU ePrivacy Directive + GDPR)
- **No cookies before consent** — except strictly necessary cookies (session, language preference, consent state itself)
- **Consent must be freely given** — "Accept All" and "Reject All" must be equally prominent. No dark patterns.
- **Consent must be specific** — users should be able to accept analytics but reject marketing
- **Consent must be revokable** — users must be able to change their preferences later
- **Consent state persists** — store the consent decision in a "strictly necessary" cookie

### Cookie Categories

| Category | Examples | Consent Required? |
|----------|---------|------------------|
| **Strictly necessary** | Session ID, language preference, consent state, CSRF tokens | No — always allowed |
| **Analytics** | Vercel Analytics (if using cookies), Google Analytics | Yes |
| **Marketing** | Google Ads, Facebook Pixel, retargeting | Yes |
| **Functional** | Chat widgets, video embeds, map embeds | Depends — yes if they set tracking cookies |

### Implementation Pattern

The cookie consent component must:
1. **Block all non-necessary scripts** until consent is given
2. **Show on first visit** with clear accept/reject options
3. **Remember the choice** via a `cookie-consent` cookie (necessary category)
4. **Be dismissable** — if the user closes without choosing, treat as "rejected"
5. **Be re-accessible** — link in the footer to "Cookie Settings" to change preferences
6. **Not push content down** — use a fixed/overlay position, not an element that shifts the page layout (CLS impact)

```tsx
// Consent state shape
type ConsentState = {
  necessary: true;       // Always true
  analytics: boolean;    // User's choice
  marketing: boolean;    // User's choice
  timestamp: string;     // When consent was given/updated
};
```

### What to conditionally render
```tsx
// In layout or analytics wrapper
{consent.analytics && <Analytics />}
{consent.analytics && <GoogleAnalytics />}
{consent.marketing && <FacebookPixel />}
{consent.marketing && <GoogleAds />}
```

## Privacy Policy

### Required Content (GDPR Article 13)
Every privacy policy must cover:

1. **Identity of the data controller** — company name, address, contact details
2. **What data is collected** — form submissions, analytics, cookies
3. **Why data is collected** — legal basis for each type (consent, legitimate interest, contract)
4. **How long data is retained** — retention periods per data type
5. **Who data is shared with** — third parties, processors (hosting, analytics, email services)
6. **User rights** — access, rectification, erasure, portability, objection, complaint to authority
7. **Contact for data requests** — email or form for exercising rights
8. **Cookie policy reference** — link to cookie policy or include inline

### Implementation Notes
- Must be available in **all configured locales** — a Danish company needs a Danish privacy policy, not just English
- Must be **reachable from every page** — typically via footer link
- Should use **plain language** — legal jargon is discouraged by GDPR
- Update date should be visible

## Cookie Policy

### Required Content
1. **What cookies are used** — table of all cookies with name, purpose, duration, category
2. **How to manage cookies** — link to browser settings, reference to consent tool
3. **Third-party cookies** — which external services set cookies and why

### Cookie Inventory Format
```markdown
| Cookie | Provider | Purpose | Duration | Category |
|--------|----------|---------|----------|----------|
| `cookie-consent` | This site | Stores consent preferences | 1 year | Necessary |
| `NEXT_LOCALE` | This site | Language preference | Session | Necessary |
| `_vercel_insights` | Vercel | Analytics | Session | Analytics |
```

## Form Data Handling

### GDPR Requirements for Forms
- **Minimize data collection** — only ask for fields you actually need
- **State the purpose** — small text near the form explaining what the data is used for
- **Don't require consent for the inquiry itself** — processing a contact form is "legitimate interest" or "contract performance", not consent-based. Don't add a "I agree to privacy policy" checkbox for basic contact forms.
- **Do require consent for marketing** — if you plan to add the person to a mailing list, that needs a separate opt-in checkbox
- **Secure transmission** — HTTPS is mandatory (handled by Vercel by default)
- **Server-side processing** — form data should be processed via Server Actions, not sent to third-party services without disclosure

### Form Privacy Text Pattern
```
By submitting this form, your inquiry will be processed by [Company Name].
We'll respond to your message and may retain your contact information to 
follow up. See our [Privacy Policy](/privacy) for details.
```

## Accessibility Compliance

### European Accessibility Act (EAA)
Starting June 2025, the EAA requires websites of companies operating in the EU to meet accessibility standards. While enforcement varies by country, building to WCAG 2.1 AA is the safe baseline.

### Accessibility Statement
Consider adding an accessibility statement page (or section on the about/legal pages) that:
- States the accessibility standard the site targets (WCAG 2.1 AA)
- Describes any known limitations
- Provides a contact method for accessibility issues
- States the date of the last accessibility review

## Production Readiness Checks

- [ ] Cookie consent banner appears on first visit
- [ ] "Accept All" and "Reject All" are equally prominent
- [ ] Analytics scripts only load after consent is given
- [ ] Consent preference persists across page loads
- [ ] Cookie settings are re-accessible from the footer
- [ ] Privacy policy exists in all configured locales
- [ ] Privacy policy is linked from the footer on every page
- [ ] Cookie policy lists all cookies with purposes and durations
- [ ] Contact form has privacy text explaining data usage
- [ ] No marketing opt-in is pre-checked
- [ ] Cookie consent banner doesn't cause layout shift (fixed/overlay positioning)

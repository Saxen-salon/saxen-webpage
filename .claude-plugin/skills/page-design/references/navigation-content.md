# Navigation — Content & Structure Requirements

## Primary Navigation Items

| Nav Item | Links To | Notes |
|----------|----------|-------|
| Services | Services hub | Dropdown with service categories |
| Cases | Case studies listing | |
| About | About page | |
| Contact | Contact page | |

**Also present in header:**
- Logo (links to homepage in current locale)
- Language switcher
- Primary CTA button ("Get in Touch" / locale equivalent)

### Keyboard Accessibility Requirements (WCAG 2.1 AA)
All navigation elements must be fully keyboard-operable:
- **Dropdown menus** must open on Enter/Space and close on Escape — not just `onMouseEnter`/`onMouseLeave`. Use `onFocus`/`onBlur` alongside mouse events, or better yet, use a proper disclosure pattern with `aria-expanded`.
- **Arrow keys** should navigate within dropdown menus (Up/Down between items, Left/Right between top-level nav items)
- **Tab** moves focus between top-level navigation items, not into closed dropdowns
- All interactive elements must have visible **focus indicators** — custom `focus-visible` styles that match the brand, not browser defaults

## Footer Link Structure

**Column 1 — Brand:**
- Logo
- 1-2 sentence company description
- Social media links

**Column 2 — Services:**
- Links to service pages

**Column 3 — Company:**
- About, Cases, News, Jobs

**Column 4 — Contact:**
- Physical address
- Phone number
- Email address

**Sub-footer:**
- Copyright notice
- Privacy Policy link
- Cookie Policy link

## Breadcrumb Hierarchy

Present breadcrumbs on all pages except the homepage.

**All breadcrumb labels must be translated via `next-intl`** — including "Home". Never hardcode English strings like `Home` or `Services` directly in the component. Use translation keys (e.g., `t('breadcrumbs.home')`, `t('breadcrumbs.services')`) so breadcrumbs display correctly in all locales.

```
Homepage
├── Services
│   └── [Individual Service]
├── Cases
│   └── [Individual Case Study]
├── About
├── Contact
├── News
│   └── [Individual Post]
├── Jobs
├── Privacy
└── Cookies
```

## Language Switcher Requirements

- Must preserve the current page when switching languages
- Display format: language codes for compact header; full names for mobile menu
- Current language should be visually distinct
- Implementation: next-intl handles locale routing

## Mobile Navigation Requirements

- Hamburger/menu icon triggers full navigation
- Services section expandable (accordion within menu)
- CTA button prominent within mobile menu
- Language options accessible within mobile menu
- **Focus trap** when menu is open — Tab cycles within the menu, not behind it
- Close on **Escape key**, outside click, or X button
- Menu trigger button has `aria-expanded` and `aria-controls` attributes
- All interactive items in mobile menu have visible **focus-visible** styles

## Active State Logic

- Current page's nav item is visually marked as active
- When on a service detail page, "Services" parent nav shows as active
- When on a case study detail page, "Cases" parent nav shows as active

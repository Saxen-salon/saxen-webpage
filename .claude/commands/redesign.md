---
description: Run the full website redesign pipeline — from brand analysis through to publish
---

You are orchestrating a full website redesign. Execute the steps below **autonomously from start to finish**. Do NOT pause to ask for approval, confirmation, or feedback. Do NOT just describe what you would do — actually do it. Use agents, read files, write files, and make progress continuously.

Brief the user on what you're doing at each major step transition, but do not wait for a response — keep moving. Write every non-obvious decision to `.redesign-state/decisions.md` with an ISO timestamp so resumption and audit are possible.

**Reference:** The full pipeline is documented in `PIPELINE.md`. This command implements that flow. If this file and `PIPELINE.md` disagree, `PIPELINE.md` wins — fix this file.

**Prerequisite:** The `/frontend-design` skill from Anthropic's agent-skills marketplace must be installed. Step 5.2 verifies this and halts if absent. Do not paper over a missing dependency — the pipeline's distinctiveness stack has no UI executor without it.

Start by running the resumption check to figure out where you are, then execute from the first incomplete step.

---

## Resumption Check (run this FIRST)

Read these files and determine the current state:

1. Read `.claude-plugin/skills/company-brand/SKILL.md` — real company data, or "Not Yet Populated" stub?
2. Check if `public/images/IMAGE_CATALOG.md` exists — images extracted?
3. Check if `.redesign-state/url-inventory.md` has a real inventory — crawl complete?
4. Check if `content-strategy.md` exists — content strategy done?
5. Read `SITE_PLAN_TEMPLATE.md` — concrete pages with keywords, or still generic?
6. Check if `redirects.md` exists — redirects mapped?
7. Check if `design-direction.md` exists at the project root — Step 5.1 done?
8. Read `.claude-plugin/skills/design-system/SKILL.md` — populated with real tokens (Step 5.2 done), or still stub?
9. List `src/app/[locale]/` (escape the brackets in shell commands — `src/app/\[locale\]/` in zsh) — which page directories exist?
10. Read `.redesign-state/review-findings.md` — any unhandled review findings to drain before continuing?
11. Read `.redesign-state/compliance-log.md` — is the most recently built page blocked on an unjustified FAIL?
12. Search for `[NEEDS:]` markers: `grep -rn "NEEDS:" src/ messages/`

Then report: "Steps 1-N are done. Starting from step N+1." Append a one-line entry to `.redesign-state/decisions.md` recording what you resumed from and why, then proceed immediately.

---

## Step 1 — Brand Intelligence & Image Extraction

Read `.claude-plugin/skills/company-brand/SKILL.md`.

**If it still contains the "Not Yet Populated" stub:** Check `CLAUDE.md` for the **Old site domain** field.

- If CLAUDE.md has a real old site domain (not a placeholder) → Launch the **brand-intelligence agent** (Agent tool): "Crawl the old site at [domain]. Read `.claude-plugin/skills/analyze-existing-site/SKILL.md` as your runbook. Produce: populated `company-brand/SKILL.md`, `IMAGE_CATALOG.md`, old-site screenshots, and `.redesign-state/url-inventory.md`. Report back the Brand Strength Assessment, key extracted facts, image counts, and content gaps."
- If CLAUDE.md still has a placeholder for the old site domain → ask the user ONE question only: "I need an existing website URL to analyze. What's the current website address?" Then write it into CLAUDE.md and proceed with the agent spawn.
- If the user says there is no existing site → walk through the brand skill manually using `references/extraction-template.md`, filling in what you can from the company name and description in CLAUDE.md, and marking the rest as "Unknown — ask client." Do **not** spawn the brand-intelligence agent for this path — there's nothing to crawl.

**If it has real data but `public/images/IMAGE_CATALOG.md` doesn't exist:** Still spawn the brand-intelligence agent — it produces both, and partial state is how resumption bugs start.

**If both exist:** Move to Step 2.

After the agent returns, briefly relay the Brand Strength Assessment rating to the user and move on.

---

## Step 2 — Content Strategy

Check if `content-strategy.md` exists.

**If it doesn't exist:** Read the Brand Strength Assessment from the brand skill.

- If brand is **Moderate or Thin** → Launch the **content-strategist agent** (Agent tool): "Analyze the brand skill and develop a messaging strategy. The brand assessment is [rating] — focus on building messaging from the available facts and industry context."
- If brand is **Strong** → Still run the content strategist, but with a lighter prompt: "Refine and prioritize the existing messaging from the brand skill. The brand is strong — focus on hierarchy and gap identification."

**If it exists:** Move to Step 3.

---

## Step 3 — Site Planning

Read `SITE_PLAN_TEMPLATE.md`.

**If it's still generic:** Launch the **site-planner agent** (Agent tool): "Evaluate the company scope from the brand skill and content strategy (if available), and fill in SITE_PLAN_TEMPLATE.md with concrete pages, keywords, priorities, and build phases."

Briefly tell the user what pages are planned, then proceed immediately.

**If it has concrete pages:** Move to Step 4.

---

## Step 4 — Redirect Mapping

Check if `redirects.md` exists.

**If it doesn't exist and there's an old site domain in CLAUDE.md:** Read `.claude-plugin/skills/redirect-mapping/SKILL.md` (procedure runbook) and `.redesign-state/url-inventory.md` (URL list produced by brand-intelligence in Step 1). Follow the runbook to map old URLs to the new site plan's URL structure. For any unmapped URLs, make the best judgment call — redirect to the most relevant new page, or to the homepage as a fallback. Log the judgment calls to `.redesign-state/decisions.md`.

**If it doesn't exist and there's no old domain:** Skip this step.

**If it exists:** Move to Step 5.

---

## Step 5 — Design Direction + Design System (TWO sub-steps, do NOT skip 5.1)

This is the load-bearing anti-blandness phase. It has two sub-steps for a specific reason: going straight from brand attributes to tokens is what every AI-built corporate site does, and it's why they all look the same. Step 5.1 commits to a visual language *before* any token is chosen; Step 5.2 executes that language into tokens.

**If `design-direction.md` does NOT exist at the project root:** do Step 5.1.
**If it exists but `.claude-plugin/skills/design-system/SKILL.md` is still a stub:** do Step 5.2.
**If both are populated:** Move to Step 6.

### Step 5.1 — Design Direction Brief

Launch the **web-designer agent** (Agent tool): "Produce `design-direction.md` at the project root per the process in `.claude-plugin/skills/design-system/SKILL.md` Step 5.1. Read the brand skill (note the Brand Strength Assessment), `content-strategy.md`, `IMAGE_CATALOG.md`, `public/images/old-site-screenshots/`, and `.claude-plugin/skills/design-system/references/visual-vocabulary.md` (this is the library you select from — required reading, not optional). Select exactly ONE strategy per category (T/C/L/P/S/D/M). Apply the tie-breaker (non-default wins on ties) and hard-stop (re-pick if every selection is a flagged default) rules. Write the attribute→visual translation table, the site-specific Avoid list, the one-line identity test, and the 'What we're moving away from' list (derived from the old-site screenshots — structural patterns, not just token choices)."

After the agent returns, read `design-direction.md` and verify it contains: one-sentence direction, selections for all seven categories, attribute→visual translation table, Avoid list, identity test, and "What we're moving away from" list. If any are missing, spawn the agent again to fill the gap. Do NOT proceed to 5.2 with a partial brief.

Briefly relay the direction in one sentence (from the brief) and the selected strategies (e.g., "T1 + C1 + L1 + P1 + S1 + D3 + M2") to the user.

Append an entry to `.redesign-state/decisions.md` recording the direction summary.

### Step 5.2 — Tokenization

**First: verify the `frontend-design` skill is installed.** Check Claude's available-skills list for this session for an entry whose name ends in `frontend-design` (it may appear as `frontend-design` or namespaced like `frontend-design:frontend-design` depending on install source). If no such entry exists, halt the pipeline and tell the user: "The `frontend-design` skill from Anthropic's agent-skills marketplace is required for Step 6 but isn't installed. Install it, then re-run `/redesign`." Do not attempt Step 5.2 or Step 6 without it — you'd produce generic output and waste the commitment the brief just made. Log the halt in `.redesign-state/decisions.md`.

If `/frontend-design` is present, launch the **web-designer agent** (Agent tool): "Execute the Tokenization sub-step in `.claude-plugin/skills/design-system/SKILL.md`. Read `design-direction.md` (binding) and `references/visual-vocabulary.md`. Derive color, typography, spacing, component, and interaction tokens that execute each selected strategy. Write all tokens to `src/app/globals.css` under `@theme inline`. Populate the body of `design-system/SKILL.md` with the token documentation, the direction-in-one-sentence copy, and the selected strategy string. Every token decision must trace to a direction brief selection — if it doesn't, add it to the brief first."

After the agent returns, read `globals.css` and the populated `design-system/SKILL.md` — check that the direction brief's one-line identity test and Avoid list are referenced in the skill body.

---

## Step 6 — Build Pages

Read `SITE_PLAN_TEMPLATE.md` to get the build phases. Check which pages already exist in `src/app/\[locale\]/` (escape the brackets when invoking shell commands).

Tell the user:
> "Building pages now. You can optionally run review loops in separate terminals — they write findings to `.redesign-state/review-findings.md` which I drain between phases:
> `/loop 15m /review-architect`, `/loop 15m /review-customer`, `/loop 15m /review-a11y`
>
> If you have `npm run dev` running on localhost:3000, I'll also run browser-qa at each phase boundary and in the final review — it's phase-gated, not `/loop`-based, because it attaches to completed work, not wall-clock ticks."

Build pages phase by phase. For EACH page or component, launch the **web-designer agent** (Agent tool) with a prompt that passes the **full direction brief context** — not just brand attributes. The prompt must include:

- Page to build and its site-plan primary keyword
- Pointer to `design-direction.md` (binding — the whole brief, including the selected strategy string, attribute→visual table, Avoid list, identity test, and "What we're moving away from" list)
- Pointer to `design-system/SKILL.md` for tokens
- Pointer to the relevant `page-design` reference file (homepage-content.md for homepage, service-pages-content.md for service pages, etc. — selective loading, do not load all references)
- Instruction: "Use `/frontend-design` for UI implementation, feeding it the direction brief (strategies + translation table + Avoid list + identity test), design tokens, and content requirements. After the page is built, append a compliance-log entry to `.redesign-state/compliance-log.md` per the schema in that file. Every strategy must get a PASS / FAIL / JUSTIFIED verdict with a quote."

**Build order (per `SITE_PLAN_TEMPLATE.md` phases):**

1. **Phase 0** — Shared components: Header, Footer, Language Switcher, Breadcrumbs, CTA section.
2. **Phase 0 Revision Pass** (run once, after Phase 0, before Phase 1): Re-read `design-direction.md` and the built Phase 0 components side by side. If a committed strategy didn't survive contact with real UI (e.g., T6 Brutalist Display is unreadable at nav scale, M4 feels wrong on a language switcher), swap to a near-neighbor strategy in the *same* category or adjust token values within the selected strategies. Re-picking unrelated categories is **not** permitted. Append a one-line changelog entry to `design-direction.md` and to `.redesign-state/decisions.md`. After this pass, the brief is frozen.
3. **Phase 1** — Core pages: Homepage, Services (hub + details), Contact (must have a working Server Action or API route).
4. **Phase 2** — Trust & evidence: Case Studies, About.
5. **Phase 3** — Legal: Privacy, Cookies, Cookie Consent (must enforce preferences, not just display).

**After each page the web-designer returns:** Read the latest entry in `.redesign-state/compliance-log.md`.

- All `PASS` → accept the page, continue.
- Any `FAIL` with a `JUSTIFIED` row that references a concrete brand constraint over-riding the brief → accept, and log the acceptance in `.redesign-state/decisions.md`.
- Any unjustified `FAIL` → spawn the web-designer again with the specific quote: "Rework [page]: your compliance check failed on [strategy] with reason [quote]. Re-read `design-direction.md` section [X] and rebuild." Do not proceed to the next page until compliance passes.

**After each phase:**

1. Run `npm run build` to verify compilation. If it fails, fix it before continuing.

2. **Phase-gated browser QA.** Check if a local dev server is up: `curl -sI http://localhost:3000 --max-time 5 | head -1`. If it returns `HTTP/... 200`, launch the **browser-qa agent** (Agent tool) with instructions: "Do a phase-boundary browser QA pass. Apply the readiness protocol per `.claude-plugin/agents/browser-qa.md`. Scope: full sampled route set at mobile 375 + desktop 1440, all configured locales for `/` and `/contact`. Verify rendered behavior, rendered fidelity to `design-direction.md`, and identify visual gaps (including hero sections with no image). Append findings to `.redesign-state/review-findings.md` with reviewer `browser-qa`; save screenshots to `.redesign-state/screenshots/` per the naming schema. Honor existing `gap-image` dispositions (don't re-raise `rejected` or `converted`)." If the dev server is NOT up, append one line to `.redesign-state/decisions.md`: "browser-qa skipped at <phase> boundary — dev server not running on localhost:3000" and continue. Do not stop to ask the user — they can run `/review-browser` manually later if they want that coverage.

3. **Drain** `.redesign-state/review-findings.md`:
   - For each unhandled finding (architect, customer-perspective, a11y, browser-qa), decide: apply now (critical+blocking), defer (note in the finding's status line), or reject (log reasoning in `.redesign-state/decisions.md`).
   - All `blocking: yes` findings must be handled before the next phase starts.
   - Any architect finding citing a `design-direction.md` violation is blocking, regardless of how the reviewer phrased it.
   - Any browser-qa finding with severity `critical` and category `rendered-behavior` or `rendered-fidelity` is blocking; `gap-image` and `console-error`/`network-error` are not blocking by default but require explicit disposition (route `gap-image` findings to web-designer — the designer either adds an `IMG-...` row to `IMAGE_REQUESTS.md` and marks disposition `converted`, or marks `rejected` with reason).
   - For mechanical fixes, apply inline. For judgment calls or multi-file changes, spawn the web-designer with the specific finding(s) and wait for compliance-log entry.

Briefly tell the user what was built and proceed to the next phase without waiting.

---

## Step 7 — Final Review

Drain any remaining findings in `.redesign-state/review-findings.md` first, then run the full final review pass.

1. Launch the **architect agent** (Agent tool): "Do a full-site coherence review. Design Distinctiveness is the first and blocking dimension — for every built page, verify it executes `design-direction.md` (selected strategies, attribute→visual translation, Avoid list, identity test, and 'What we're moving away from' list). Report any drift back to AI defaults as Critical. Also check design consistency, plan adherence, technical quality, multilingual coherence, and architectural cross-cutting concerns (forms submit, translations complete, error boundaries present, security headers, legal pages localized). Do NOT check WCAG details — that's the accessibility-auditor's lane."

2. Launch the **customer-perspective agent** (Agent tool): "Review the Homepage, Services hub, and Contact page from a buyer's perspective. Be brutally honest about what would make someone reach out or leave."

3. Launch the **accessibility-auditor agent** (Agent tool): "Run a comprehensive WCAG 2.1 AA accessibility audit across all built pages. Check semantic HTML, contrast, keyboard navigation, ARIA, forms, focus management, motion preferences. Tag each finding as [AUTO-FIX] (mechanical, single-file) or [NEEDS DESIGNER]."

4. If `curl -sI http://localhost:3000 --max-time 5 | head -1` returns `HTTP/... 200`, launch the **browser-qa agent** (Agent tool): "Final browser QA pass across the full sampled route set. Mobile + desktop, all configured locales for `/` and `/contact`. Apply the readiness protocol per `.claude-plugin/agents/browser-qa.md`. Verify rendered behavior, rendered fidelity to `design-direction.md` (fonts actually loaded at display weights, accent color behaves as accent not field, committed P-strategy visible in the rendered output), and identify any remaining visual gaps. Append findings to `.redesign-state/review-findings.md`." If the dev server is not running, append one line to `.redesign-state/decisions.md`: "browser-qa skipped in final review — dev server not running on localhost:3000; recommend the user runs `/review-browser` manually before `/publish`." Include this gap in the status summary to the user.

Apply critical fixes the agents surface. Distinctiveness violations from the architect are Critical and blocking — spawn web-designer to rework. Apply `[AUTO-FIX]` findings from the a11y-auditor inline. Route `[NEEDS DESIGNER]` findings to web-designer. Route browser-qa findings per the severity rules in the phase-drain section above — critical rendered-behavior/rendered-fidelity are blocking; `gap-image` findings go to web-designer for disposition.

---

## Step 8 — Content Audit

Search for all `[NEEDS:]` markers:
```bash
grep -rn "NEEDS:" src/ messages/ SITE_PLAN_TEMPLATE.md
```

For markers that can be drafted from brand context, launch the **web-designer agent** to draft replacement text. For markers that genuinely need client input, keep them.

Briefly report how many placeholders remain and what kind of content the client needs to provide.

---

## Step 9 — SEO Validation

Read `.claude-plugin/skills/seo-patterns/SKILL.md` for the validation checklist, then audit and fix:
1. Every page has a unique title tag and meta description
2. Every page has JSON-LD schema markup per the seo-patterns skill templates
3. Pages cross-link to related content
4. Heading hierarchy is clean (one h1 per page, logical h2/h3)
5. All images use `next/image` with descriptive alt text
6. `src/app/sitemap.ts` includes all built pages with hreflang alternates
7. `src/app/robots.ts` allows indexing
8. Redirects in `next.config.ts` are valid (if redirect mapping was done)
9. Canonical URLs set correctly across locale versions
10. No duplicate title tags

Fix issues as you find them — don't just report them.

---

## Step 10 — Production Readiness Check

Verify every item systematically. Read these skill files for reference:
- `.claude-plugin/skills/performance-budget/SKILL.md`
- `.claude-plugin/skills/analytics-tracking/SKILL.md`
- `.claude-plugin/skills/legal-compliance/SKILL.md`

### Functionality
1. **Contact form submits** — has Server Action, success/error states
2. **Cookie consent enforces** — analytics blocked until consent given
3. **Event tracking** — form submissions and CTA clicks fire tracking events

### Security
4. **Security headers** in `next.config.ts` (CSP, X-Frame-Options, etc.)
5. **Error boundaries** styled and present (`error.tsx`, `not-found.tsx`, `loading.tsx`)

### Accessibility
6. **Keyboard navigation** — all interactive elements keyboard-operable
7. **Focus indicators** — custom `focus-visible` styles in globals.css
8. **Color contrast** — meets WCAG AA

### Localization
9. **Legal pages translated** in all configured locales
10. **All UI strings** from `next-intl` (zero hardcoded English)

### Performance
11. **`npm run build` succeeds** with no errors
12. **Images** use `next/image` with proper `sizes`
13. **Fonts** via `next/font` with `display: swap`

### Redirects (if applicable)
14. **All old URLs** have 301 redirects configured
15. **No redirect loops**

Fix issues as you find them.

---

## Step 11 — Publish

1. Run `npm run build` to verify compilation one final time
2. Use `/publish` to commit and push

Report to the user:
- What was built (page count, component count)
- Remaining `[NEEDS:]` placeholders that require client input
- The site will be live within 1-2 minutes

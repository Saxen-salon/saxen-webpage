---
description: Add a new do or don't to .claude-plugin/GUIDELINES.md
argument-hint: [free-form rule, e.g., "don't use OpenStreetMap, use Google Maps"]
---

Add a new guideline to `.claude-plugin/GUIDELINES.md`. The user's rule is:

$ARGUMENTS

Follow these steps:

1. **If `$ARGUMENTS` is empty**, ask the user: "What rule should I add to the guidelines?" Wait for their answer, then continue with that as the rule.

2. **Read `.claude-plugin/GUIDELINES.md`** to see the current contents and format (do/don't sections, category tags like `[tech]`, `[content]`, `[ux]`).

3. **Classify the rule:**
   - Is this a **do** (a preferred choice the framework should make) or a **don't** (a pattern or library to avoid)? If the rule contains "don't", "avoid", "never", or similar, it's a don't. If it contains "use", "prefer", "always", it's a do. Otherwise infer from intent.
   - Pick a **category tag** that matches existing tags where possible: `[tech]` for technology/library choices, `[content]` for copy/messaging rules, `[ux]` for interaction patterns, `[a11y]` for accessibility rules, or invent a new one if none fit.

4. **Rewrite the rule for the file** if needed:
   - Strip redundant lead-ins ("don't use X" → just state the rule).
   - Keep it to one or two sentences.
   - Match the tone of existing entries (declarative, with a brief *why* when it clarifies).

5. **Append the rule** under the correct section (`## Dos` or `## Don'ts`), formatted as:

   ```markdown
   - [category-tag] Rule text here.
   ```

   Use `Edit` with the existing last bullet in that section as `old_string` to append cleanly. If the section is empty, add the rule directly under the heading.

6. **Confirm to the user**: show the line that was added and which section it went into. One sentence, no ceremony.

7. **Sanity check for duplicates or conflicts**: if the new rule looks like it duplicates or contradicts an existing entry, flag that inline ("this looks similar to the existing `[tech] Use Google Maps...` rule — keep both, replace, or cancel?") and wait for direction before writing.

## Notes

- Don't offer to update agents, PIPELINE.md, or anything else — the web-designer and architect already read `GUIDELINES.md` on every run, so the new rule takes effect immediately.
- Keep the file short. If it grows past ~20 rules, suggest to the user that some rules may belong in a more specific home (brand skill, site plan, CLAUDE.md).
- If the user invoked the command without arguments and then gave you a vague request ("add something about maps"), ask a clarifying question instead of guessing.

# Review Findings Queue

Append-only queue of findings surfaced by the three review agents (`architect`, `customer-perspective`, `accessibility-auditor`). The `/redesign` orchestrator drains this file at phase boundaries and at the final review pass.

## Schema

Each finding is a single block:

```
### YYYY-MM-DDThh:mm — [reviewer] — [severity] — [blocking?]
**Where:** [file:line or page route]
**What:** [one-line description]
**Why:** [WCAG criterion / brief quote / buyer friction — cite the source]
**Suggested fix:** [concrete change]
**Status:** pending
```

**Severity:** `critical` | `warning` | `note`
**Blocking:** `yes` (build halts until addressed) | `no`
**Status:** `pending` | `handled` | `deferred` | `rejected`

The orchestrator updates the `Status` line after acting. Critical+blocking findings halt the build; they cannot be auto-deferred.

## Distinctiveness is always blocking

Any finding from `architect` citing a `design-direction.md` violation is `critical` and `blocking`, regardless of how the reviewer phrased it. The orchestrator must treat these as build-halting.

---

(No findings recorded yet. Review commands write here between their `/loop` cycles.)

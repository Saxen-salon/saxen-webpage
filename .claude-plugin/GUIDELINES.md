# Framework Guidelines

Sparse global dos and don'ts applied to every redesign in this kit.

These rules exist so the framework doesn't repeatedly make the same wrong
default choice (e.g., picking the free-but-ugly option when a paid-and-polished
one is the actual preference). They are consulted by the `web-designer` agent
before each page build and by the `architect` agent during every review.

**Keep this list short.** Add a rule only if it's worth enforcing on every
project. Per-client preferences belong in the brand skill or site plan — not
here.

**Editing:** use `/add-dos-and-donts "<your rule>"` to append a new rule in the
correct format, or edit this file directly. Category tags (`[tech]`,
`[content]`, `[ux]`, ...) are informational only — agents treat every line as
active regardless of tag.

## Dos

- [tech] Use Google Maps for embedded maps — not OpenStreetMap, Leaflet, or
  Mapbox unless the client explicitly requires an open-source alternative.

## Don'ts

- [tech] Don't pull in component libraries like MUI, Chakra, Bootstrap, or
  Ant Design — this kit is Tailwind + shadcn patterns only. If a primitive is
  needed, install it from shadcn/ui, not a monolithic library.

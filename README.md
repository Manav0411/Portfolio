# manavgoel.dev

Personal portfolio. One page, statically rendered, no CMS.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build
pnpm lint
```

## Where things live

| Path | What |
|---|---|
| `src/content/profile.ts` | **All copy and data.** Edit here, not in components. |
| `src/app/globals.css` | Design tokens — palette, type roles, reveal animation. |
| `src/components/RouteDiagram.tsx` | The hero's routing diagram. |
| `src/components/Section.tsx` | Shared section shell, `Metric`, `Chips`. |
| `public/Manav_Goel_Resume.pdf` | The résumé the hero links to. |
| `resumes/` | Source résumés, not published. |

## Design notes

**The two accent colours are a legend, not decoration.** `--color-cold` (teal) marks a
deterministic path — typed SQL, no model call. `--color-warm` (ochre) marks a path where a
model ran, and therefore cost time and money. They mean the same thing everywhere they appear,
including in the hero diagram and on every metric.

**Three typefaces, three jobs.** Bricolage Grotesque for display, Newsreader for prose,
JetBrains Mono for every number, label and route. Data never renders in the prose face.

The font variables are set on `<html>`, not `<body>` — Tailwind's `@theme` resolves
`--font-display`/`--font-body`/`--font-mono` at `:root`, so the faces they point at must be
defined there or every family silently falls back to system sans.

**Every number on this page is real** and traceable to a repo's eval harness. If a figure
changes, change it in `profile.ts` and nowhere else.

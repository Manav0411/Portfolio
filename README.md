# manavgoel.dev

Personal portfolio. One page, statically rendered, no CMS, no backend.

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
| `src/app/globals.css` | Design tokens — palette, type, buttons, pills, reveals. |
| `src/components/Splash.tsx` | The landing gate. |
| `src/components/SplineKeycaps.tsx` | Hero object: Spline scene if configured, SVG otherwise. |
| `src/components/Keycaps.tsx` | The SVG fallback keycaps — pressable, ~2 KB. |
| `src/components/Timeline.tsx` | Shared alternating timeline for Experience and Projects. |
| `public/Manav_Goel_Resume.pdf` | The résumé the Contact section links to. |
| `resumes/` | Source résumés, not published. |

## Notes

**The contact form has no backend.** Submitting opens the visitor's mail client
with the message composed. To make it post somewhere instead, replace the
`onSubmit` handler in `src/components/Contact.tsx`.

**Font variables go on `<html>`, not `<body>`.** Tailwind's `@theme` resolves
`--font-sans` / `--font-display` / `--font-script` at `:root`, so the faces they
point at must be defined there or every family silently falls back to system sans.

## The hero keycaps

There are TWO implementations and the page picks one at runtime:

1. **Spline 3D** — used when `NEXT_PUBLIC_SPLINE_SCENE` is set to a published
   `.splinecode` URL. Real lighting, shadows and depth; each cap presses on
   mouse-down via a `MousePress` -> Transition state built in the Spline file.
   Costs ~2 MB of runtime, loaded client-side only via `next/dynamic`.
2. **Inline SVG** (`Keycaps.tsx`) — the fallback. Used when the env var is
   unset OR the Spline scene fails to load. ~2 KB, also pressable.

The fallback is deliberate: the hero must never be empty because a
third-party runtime didn't load.

### Editing the Spline scene

Changes only reach the site after **Export -> Public URL -> Update Public URL**
in Spline. The URL stays the same, so `.env.local` never changes; hard-refresh
to beat the cache.

Two things cost a lot of round trips to work out, so don't relearn them:

- **The published viewer renders through the PLAY camera, not the editor
  viewport.** Without one set, Spline picks its own framing and no amount of
  moving the editor camera changes the published result. The scene has a
  `Hero Camera` wired up with `setPlayCamera`.
- **The editor is not a 1:1 preview of the embed.** The published viewer fits
  the play camera to the viewport differently — the subject renders roughly
  0.62x the size it reads at in the editor. Frame tighter than looks right. Copy `.env.local.example` to `.env.local`
and paste the URL to switch to 3D.

**The SVG keycaps are interactive.** A cap presses on click, on Enter/Space when
focused, and when the matching letter is typed on a real keyboard (both A caps
answer to the A key). The handler ignores keystrokes aimed at form fields so it
can't fight the contact form. Each cap has an invisible full-size hit polygon —
without it, only the drawn faces would be clickable.

**The splash shows on every load of the bare URL**, and is skipped only for deep
links. It's decided by a pre-paint script rather than React state, so it never
flashes and the server and client HTML stay identical; `<html>` carries
`suppressHydrationWarning` because that script stamps `data-splash` on it.

**Signature face is Zeyada** (`--font-signature`), the closest Google Fonts match
to the reference's marker signature. Swap it in `src/app/layout.tsx`.

**Pills must contrast with their card.** `Timeline` takes `cardClass` and
`pillClass` separately — white pills on white cards disappear.

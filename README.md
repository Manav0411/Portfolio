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
| `photos/` | Original photo the About portrait was cropped from. |
| `public/manav-portrait.jpg` | The About portrait — greyscale, 1000x1250, 4:5. |

## Notes

**The contact form has no backend.** Submitting opens the visitor's mail client
with the message composed. To make it post somewhere instead, replace the
`onSubmit` handler in `src/components/Contact.tsx`.

**Font variables go on `<html>`, not `<body>`.** Tailwind's `@theme` resolves
`--font-sans` / `--font-display` / `--font-script` at `:root`, so the faces they
point at must be defined there or every family silently falls back to system sans.

## The hero keycaps

**The SVG keycaps are the hero.** Typing M, A, N or V presses the matching cap
(both A caps answer to A), as does clicking one or hitting Enter/Space while
it's focused. Keystrokes aimed at form fields are ignored.

The Spline 3D scene is built and looks good, but its interaction could not be
made to work and it is switched off in `.env.local`. Setting
`NEXT_PUBLIC_SPLINE_SCENE` turns it back on — it renders, but no key presses.
Why it was abandoned is at the bottom of this file.


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


## Why the Spline scene is switched off

The scene renders correctly, and the Spline file itself is right: five
`KeyDown` events bound to M/A/N/V plus five `MouseDown` events, all confirmed
present in the published build via `getSplineEvents()`.

What does not work is making a cap actually move:

- **Spline's own `KeyDown` events never fire** through `@splinetool/react-spline`.
  The page receives the keystroke (verified with a window listener); the scene
  ignores it.
- **Driving the cap from code fails too.** The handler runs (verified by
  logging), `findObjectByName` resolves the cap, and a direct
  `cap.position.y = n` write moves it — but any write is reverted, because the
  scene's own state machine re-applies the base state every frame to objects
  that carry states.

Removing the states would stop the revert, but they are what the press is built
from. Three further traps cost a lot of time and are worth knowing:

- **Object proxies snapshot.** A proxy captured earlier keeps returning its old
  value after the object has moved, so measurements read stale numbers. Always
  re-resolve immediately before reading.
- **Look objects up at call time.** Right after `onLoad` the runtime has not
  finished registering the scene graph, so anything resolved there is undefined.
- **Three separate snapshots.** The editor, the Public URL viewer, and the code
  export are independent. "Update Public URL" does not refresh the
  `.splinecode`; that needs Export -> Code -> Generate Draft -> Promote.

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
| `src/components/Keycaps.tsx` | The hero's isometric MANAV keycaps — pressable. |
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

**The keycaps are interactive.** A cap presses on click, on Enter/Space when
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

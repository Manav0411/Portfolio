import { profile } from "@/content/profile";
import { Reveal } from "./Reveal";

export function Contact() {
  const lines = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { label: "GitHub", value: profile.githubHandle, href: profile.github },
    { label: "LinkedIn", value: profile.linkedinHandle, href: profile.linkedin },
    { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  ];

  return (
    <footer id="contact" className="bg-ink text-paper" style={{ scrollMarginTop: "5rem" }}>
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 md:py-32">
        <Reveal>
          <div className="grid gap-4 border-b border-white/15 pb-8 md:grid-cols-[8rem_1fr] md:gap-10">
            <div className="mono flex items-baseline gap-3 text-xs text-white/40 md:flex-col md:gap-1">
              <span>05</span>
              <span className="eyebrow !text-white/40">Contact</span>
            </div>
            <h2 className="display text-[clamp(2.25rem,6vw,4rem)]">
              Looking for a 2027 new-grad role
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-12 pt-12 md:grid-cols-[8rem_1fr] md:gap-10">
          <div />
          <div className="min-w-0">
            <Reveal>
              <p className="max-w-xl text-[1.0625rem] leading-relaxed text-white/75">
                Backend, AI engineering, or anything in between. If you want the full
                trace on any number on this page, the harness and the raw runs are in
                the repos — ask me about either.
              </p>
            </Reveal>

            <Reveal delay={90}>
              <ul className="mt-12 flex max-w-2xl flex-col">
                {lines.map((l) => (
                  <li key={l.label} className="border-t border-white/15">
                    <a
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="group flex items-baseline justify-between gap-6 py-4 transition-colors hover:text-white"
                    >
                      <span className="mono text-[0.6875rem] tracking-[0.14em] text-white/40 uppercase">
                        {l.label}
                      </span>
                      <span className="mono text-[0.875rem] text-white/85 transition-transform group-hover:-translate-x-1 sm:text-[1rem]">
                        {l.value}
                        <span aria-hidden className="ml-3 text-white/30">
                          ↗
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={150}>
              <p className="mono mt-16 text-[0.6875rem] text-white/30">
                {profile.mark} · {profile.location} · Built with Next.js. No template.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </footer>
  );
}

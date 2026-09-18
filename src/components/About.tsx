import Image from "next/image";
import { about, achievements, education, technologies, profile } from "@/content/profile";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="bg-alt px-6 py-24 sm:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="section-title">About Me</h2>
        </Reveal>

        {/* Portrait beside the prose, stats across the full width below — the
            stat row is too wide to sit next to a photo without crowding both. */}
        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-16">
          <Reveal>
            <Image
              src="/manav-avatar.jpg"
              alt={`${profile.name}, ${profile.title}`}
              width={800}
              height={800}
              sizes="(min-width: 1024px) 15rem, 12rem"
              priority={false}
              className="aspect-square w-48 rounded-full object-cover lg:w-full"
            />
          </Reveal>

          <Reveal delay={100}>
            <div>
              <p className="text-[clamp(1.25rem,2.4vw,1.5rem)] leading-snug font-light text-ink-2">
                {about.lead}
              </p>
              {about.paragraphs.map((p) => (
                <p key={p} className="mt-5 text-ink-3">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
            {about.stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center rounded-lg bg-page px-4 py-10"
              >
                <div
                  className="text-[2.5rem] leading-none font-bold text-ink"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.value}
                </div>
                <div className="mt-2 text-center text-[0.9375rem] text-ink-3">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Education and achievements live inside About — context, not sections. */}
        <div className="mt-16 grid gap-12 border-t border-line pt-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <h3 className="text-[0.8125rem] tracking-[0.14em] text-ink-4 uppercase">
                Education
              </h3>
              <p className="mt-4 text-[1.25rem] leading-snug font-light text-ink-2">
                {education.degree}
              </p>
              <p className="mt-1 text-[0.9375rem] text-ink-3">{education.school}</p>
              <p className="mt-1 text-[0.9375rem] text-ink-4">
                {education.period} · {education.detail}
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div>
              <h3 className="text-[0.8125rem] tracking-[0.14em] text-ink-4 uppercase">
                Achievements & Leadership
              </h3>
              <ul className="mt-4 flex flex-col gap-4">
                {achievements.map((a) => (
                  <li key={a.title}>
                    <p className="text-[1.0625rem] leading-snug text-ink-2">
                      {a.title}
                    </p>
                    <p className="mt-0.5 text-[0.9375rem] text-ink-3">
                      {a.detail}
                      {a.href ? (
                        <>
                          {" "}
                          <a
                            href={a.href}
                            target="_blank"
                            rel="noreferrer"
                            className="border-b border-ink-4 pb-px text-ink-2 transition-colors hover:border-ink-2"
                          >
                            Profile ↗
                          </a>
                        </>
                      ) : null}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-14">
            <h3 className="text-[0.8125rem] tracking-[0.14em] text-ink-4 uppercase">
              Technologies
            </h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {technologies.map((t) => (
                <li key={t} className="pill bg-page">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

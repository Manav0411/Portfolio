import { projects } from "@/content/profile";
import { Reveal } from "./Reveal";
import { Section, Metric, Chips } from "./Section";

export function Projects() {
  return (
    <Section
      id="projects"
      index="03"
      eyebrow="Selected projects"
      title="Built, measured, deployed"
    >
      <ol className="flex flex-col">
        {projects.map((p, i) => (
          <Reveal key={p.name} as="li" delay={i * 60}>
            <article className="grid gap-8 border-b border-rule py-14 first:pt-0 md:grid-cols-[8rem_1fr] md:gap-10">
              {/* rail */}
              <div className="mono flex flex-row flex-wrap items-baseline gap-x-4 text-[0.6875rem] text-ink-3 md:flex-col md:gap-y-2">
                <span className="text-ink">{String(i + 1).padStart(2, "0")}</span>
                <span>{p.year}</span>
                <span className="flex gap-3 md:mt-1 md:flex-col md:gap-1.5">
                  <a href={p.repo} target="_blank" rel="noreferrer" className="link-quiet">
                    Code ↗
                  </a>
                  {p.live ? (
                    <a href={p.live} target="_blank" rel="noreferrer" className="link-quiet">
                      Live ↗
                    </a>
                  ) : null}
                </span>
              </div>

              <div className="min-w-0">
                <h3 className="display text-[2rem] sm:text-[2.5rem]">{p.name}</h3>
                <p className="mt-2 max-w-2xl text-[1.0625rem] text-ink italic">
                  {p.tagline}
                </p>

                <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-ink">
                  {p.blurb}
                </p>

                <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
                  {p.metrics.map((m, mi) => (
                    <Metric
                      key={m.label}
                      value={m.value}
                      label={m.label}
                      tone={mi === 0 ? "cold" : "ink"}
                    />
                  ))}
                </div>

                <ul className="mt-9 flex flex-col gap-3.5">
                  {p.detail.map((d) => (
                    <li key={d} className="grid grid-cols-[1.25rem_1fr] text-[0.9375rem] leading-relaxed text-ink-2">
                      <span aria-hidden className="mono pt-[0.35em] text-[0.625rem] text-ink-3">
                        —
                      </span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Chips items={p.stack} />
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

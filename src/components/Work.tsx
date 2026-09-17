import { work } from "@/content/profile";
import { Reveal } from "./Reveal";
import { Section, Metric, Chips } from "./Section";

export function Work() {
  return (
    <Section id="work" index="02" eyebrow="Experience" title="Where I've shipped" band>
      <ol className="flex flex-col">
        {work.map((job, i) => (
          <Reveal key={job.company} as="li" delay={i * 80}>
            <article className="grid gap-8 border-b border-rule py-12 first:pt-0 md:grid-cols-[8rem_1fr] md:gap-10">
              {/* rail */}
              <div className="mono flex flex-row flex-wrap gap-x-4 text-[0.6875rem] text-ink-3 md:flex-col md:gap-y-2">
                <span className="text-ink">{job.period}</span>
                <span>{job.where}</span>
              </div>

              <div className="min-w-0">
                <h3 className="display text-[1.75rem] sm:text-[2.125rem]">
                  {job.company}
                </h3>
                <p className="mono mt-1.5 text-[0.75rem] text-ink-2">{job.title}</p>

                <p className="mt-5 max-w-2xl text-ink">{job.summary}</p>

                <div className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-3">
                  {job.metrics.map((m) => (
                    <Metric key={m.label} value={m.value} label={m.label} tone="warm" />
                  ))}
                </div>

                <ul className="mt-8 flex flex-col gap-3.5">
                  {job.points.map((p) => (
                    <li key={p} className="grid grid-cols-[1.25rem_1fr] text-[0.9375rem] leading-relaxed text-ink-2">
                      <span aria-hidden className="mono pt-[0.35em] text-[0.625rem] text-ink-3">
                        —
                      </span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <Chips items={job.stack} />
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

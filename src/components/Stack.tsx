import { stack, education, ledger } from "@/content/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Stack() {
  return (
    <Section id="stack" index="04" eyebrow="Stack & record" title="What I work with" band>
      <div className="flex flex-col gap-7">
        {stack.map((g, i) => (
          <Reveal key={g.group} delay={i * 50}>
            <div className="grid gap-3 border-t border-rule pt-5 md:grid-cols-[11rem_1fr] md:gap-10">
              <h3 className="mono text-[0.75rem] text-ink">{g.group}</h3>
              <p className="mono text-[0.8125rem] leading-relaxed text-ink-2">
                {g.items.join("  ·  ")}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-20 grid gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div>
            <h3 className="eyebrow mb-5">Education</h3>
            <div className="border-t border-rule pt-5">
              <p className="display text-[1.375rem] leading-tight">{education.degree}</p>
              <p className="mt-2 text-[0.9375rem] text-ink-2">{education.school}</p>
              <p className="mono mt-3 text-[0.6875rem] text-ink-3">
                {education.period} · {education.where} · {education.detail}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <div>
            <h3 className="eyebrow mb-5">Achievements & leadership</h3>
            <ul className="flex flex-col gap-5">
              {ledger.map((l) => (
                <li key={l.title} className="border-t border-rule pt-5">
                  <p className="mono text-[0.625rem] tracking-[0.14em] text-ink-3 uppercase">
                    {l.kind}
                  </p>
                  <p className="mt-2 text-[1rem] leading-snug text-ink">{l.title}</p>
                  <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-2">
                    {l.detail}
                    {l.href ? (
                      <>
                        {" "}
                        <a href={l.href} target="_blank" rel="noreferrer" className="mono link-quiet text-[0.6875rem]">
                          {l.hrefLabel} ↗
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
    </Section>
  );
}

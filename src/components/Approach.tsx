import { profile } from "@/content/profile";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

/** Three claims, each with the receipt that makes it checkable. */
const principles = [
  {
    claim: "Measure it, or don't claim it.",
    body:
      "Every number I publish comes out of a harness I can re-run. Retrieval gets recall@k and MRR, graders get an accuracy figure against a labelled set, and latency gets measured before and after — on the machine it actually runs on.",
    receipt: "recall@8 0.807 · MRR 0.941 · grader 0.950",
  },
  {
    claim: "Don't call a model to answer a question SQL already knows.",
    body:
      "Routing every question through embeddings doesn't make a system more general, it makes it confidently wrong. Exact questions get a typed query and return in milliseconds; open-ended ones earn the retrieval pipeline and the cost that comes with it.",
    receipt: "21 ms exact path · zero model calls",
  },
  {
    claim: "A pipeline that can't fail safely isn't deployed.",
    body:
      "Bounded retries, self-repair on failed generations, task state that reconciles after a restart instead of hanging the UI, syncs that never advance a cursor on failure. The interesting part of an agent is what it does when a step goes wrong.",
    receipt: "340+ tests gating release",
  },
];

export function Approach() {
  return (
    <Section id="approach" index="01" eyebrow="Approach" title="Evidence over assertion">
      <div className="grid gap-12 md:grid-cols-[8rem_1fr] md:gap-10">
        <div />
        <div className="min-w-0">
          <Reveal>
            <p className="max-w-2xl text-[1.125rem] leading-relaxed text-ink">
              {profile.intro}
            </p>
          </Reveal>

          <ol className="mt-14 flex flex-col gap-10">
            {principles.map((p, i) => (
              <Reveal key={p.claim} as="li" delay={i * 90}>
                <div className="border-t border-rule pt-6">
                  <h3 className="display max-w-xl text-[1.375rem] leading-tight sm:text-[1.625rem]">
                    {p.claim}
                  </h3>
                  <p className="mt-3.5 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-2">
                    {p.body}
                  </p>
                  <p className="mono mt-4 text-[0.6875rem] text-cold">{p.receipt}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}

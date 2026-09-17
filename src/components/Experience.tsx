import { experience } from "@/content/profile";
import { Reveal } from "./Reveal";
import { Timeline, type TimelineItem } from "./Timeline";

export function Experience() {
  const items: TimelineItem[] = experience.map((e) => ({
    key: e.company,
    title: `${e.role} — ${e.company}`,
    meta: `${e.period} · ${e.where}`,
    body: e.description,
    tags: e.tags,
  }));

  return (
    <section id="experience" className="bg-page px-6 py-24 sm:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="section-title">Experience</h2>
        </Reveal>
        <Timeline items={items} cardClass="bg-alt" pillClass="bg-page" />
      </div>
    </section>
  );
}

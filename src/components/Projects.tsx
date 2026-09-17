import { projects } from "@/content/profile";
import { Reveal } from "./Reveal";
import { Timeline, type TimelineItem } from "./Timeline";

export function Projects() {
  const items: TimelineItem[] = projects.map((p) => ({
    key: p.name,
    title: p.name,
    body: p.description,
    tags: p.tags,
    repo: p.repo,
    live: p.live,
  }));

  return (
    <section id="projects" className="bg-alt px-6 py-24 sm:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="section-title">Projects</h2>
        </Reveal>
        <Timeline items={items} cardClass="bg-page" pillClass="bg-alt" />
      </div>
    </section>
  );
}

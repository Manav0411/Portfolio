import { profile } from "@/content/profile";
import { RouteDiagram } from "./RouteDiagram";

export function Hero() {
  return (
    <section id="top" className="border-b border-rule">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:px-10 md:pt-24 md:pb-28">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Left: the claim */}
          <div className="flex flex-col justify-center">
            <p className="eyebrow mb-7">
              {profile.location} · Available 2027
            </p>

            <h1 className="display text-[clamp(3rem,10vw,6.25rem)]">
              Manav
              <br />
              Goel
            </h1>

            <p className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-ink sm:text-[1.1875rem]">
              {profile.thesis}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href="#projects"
                className="mono bg-ink px-4 py-2.5 text-[0.75rem] text-paper transition-opacity hover:opacity-85"
              >
                See the work
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="mono link-quiet text-[0.75rem]">
                GitHub ↗
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="mono link-quiet text-[0.75rem]">
                LinkedIn ↗
              </a>
              <a href="/Manav_Goel_Resume.pdf" className="mono link-quiet text-[0.75rem]">
                Résumé (PDF) ↓
              </a>
            </div>
          </div>

          {/* Right: the evidence for the claim, running */}
          <div className="flex items-center border-t border-rule pt-10 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16">
            <RouteDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}

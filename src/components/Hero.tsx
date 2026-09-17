import { profile } from "@/content/profile";
import { SplineKeycaps } from "./SplineKeycaps";

export function Hero() {
  return (
    <section className="px-6 pt-10 pb-16 sm:px-10 md:pt-16 md:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-8">
        <div>
          <h1
            className="text-[clamp(3rem,9vw,6rem)] leading-[1.02] font-bold tracking-tight text-ink"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="block">{profile.firstName}</span>
            <span className="block">{profile.lastName}</span>
          </h1>

          <p className="mt-4 text-[clamp(1.375rem,3.4vw,2rem)] leading-tight font-light text-ink-2">
            {profile.title}
          </p>

          <p className="mt-6 max-w-md text-[1rem] text-ink-3">{profile.tagline}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#projects" className="btn btn-solid">
              View Projects
            </a>
            <a href="#contact" className="btn btn-outline">
              Get in Touch
            </a>
          </div>
        </div>

        <div className="order-first lg:order-last">
          <SplineKeycaps className="mx-auto aspect-[4/3] w-full max-w-[26rem] lg:max-w-none" />
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center gap-1 md:mt-16">
        <span className="text-[0.8125rem] text-ink-3">Scroll to explore</span>
        <svg
          width="22"
          height="13"
          viewBox="0 0 22 13"
          fill="none"
          aria-hidden
          style={{ animation: "bob 2.2s ease-in-out infinite" }}
        >
          <path
            d="M1 1L11 11L21 1"
            stroke="#666"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}

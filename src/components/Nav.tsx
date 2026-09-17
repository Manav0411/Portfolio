"use client";

import { useEffect, useState } from "react";
import { nav, profile } from "@/content/profile";

export function Nav() {
  const [stuck, setStuck] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        stuck ? "border-b border-rule bg-paper/92 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <a href="#top" className="mono text-sm font-medium tracking-tight">
          {profile.mark}
        </a>

        <nav aria-label="Sections" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={active === n.id ? "true" : undefined}
                  className={`mono text-[0.75rem] tracking-wide transition-colors ${
                    active === n.id ? "text-ink" : "text-ink-3 hover:text-ink"
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={`mailto:${profile.email}`}
          className="mono border border-ink px-3 py-1.5 text-[0.75rem] transition-colors hover:bg-ink hover:text-paper"
        >
          Get in touch
        </a>
      </div>

      {/* Below md the centred nav is hidden, so the sections get their own rail.
          Horizontally scrollable rather than a hamburger — five links don't earn a menu. */}
      <nav
        aria-label="Sections"
        className={`md:hidden ${stuck ? "border-t border-rule-soft" : ""}`}
      >
        <ul className="flex gap-6 overflow-x-auto px-6 pb-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {nav.map((n) => (
            <li key={n.id} className="shrink-0">
              <a
                href={`#${n.id}`}
                aria-current={active === n.id ? "true" : undefined}
                className={`mono text-[0.75rem] tracking-wide transition-colors ${
                  active === n.id ? "text-ink" : "text-ink-3"
                }`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

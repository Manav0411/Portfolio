"use client";

import { useEffect, useState } from "react";
import { nav } from "@/content/profile";

export function Nav() {
  const [stuck, setStuck] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 20);
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
        if (visible[0]) {
          setActive(visible[0].target.id);
        } else if (window.scrollY < (sections[0]?.offsetTop ?? 0)) {
          setActive("");
        }
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        stuck ? "border-b border-line bg-page/90 backdrop-blur-md" : ""
      }`}
    >
      <nav aria-label="Sections">
        <ul className="flex items-center justify-center gap-6 overflow-x-auto px-5 py-5 sm:gap-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {nav.map((n) => (
            <li key={n.id} className="shrink-0">
              <a
                href={`#${n.id}`}
                aria-current={active === n.id ? "true" : undefined}
                className={`block border-b-2 pb-0.5 text-[0.9375rem] transition-colors ${
                  active === n.id
                    ? "border-ink-2 text-ink-2"
                    : "border-transparent text-ink-3 hover:text-ink-2"
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

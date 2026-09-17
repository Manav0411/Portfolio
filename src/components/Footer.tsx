import { nav, profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="bg-dark px-6 py-10 text-white sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center md:flex-row md:items-start md:justify-between md:text-left">
        <div>
          <p className="text-[1.0625rem]">{profile.name}</p>
          <p className="mt-1 text-[0.875rem] text-white/60">{profile.title}</p>
        </div>

        <div className="md:pt-1">
          <ul className="flex flex-wrap items-center justify-center gap-5">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className="text-[0.9375rem] text-white/75 transition-colors hover:text-white"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-center text-[0.8125rem] text-white/40">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>

        <a
          href="#top"
          className="text-[0.9375rem] text-white/75 transition-colors hover:text-white md:pt-1"
        >
          ↑ Back to Top
        </a>
      </div>
    </footer>
  );
}

import { Reveal } from "./Reveal";

/**
 * Every section shares one skeleton: a narrow monospace rail on the left carrying
 * the section's index and label, prose and evidence on the right. The rail is the
 * structural claim of the page — nothing appears on the right without a marker.
 */
export function Section({
  id,
  index,
  eyebrow,
  title,
  band = false,
  children,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  band?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={band ? "bg-band" : "bg-paper"}
      style={{ scrollMarginTop: "5rem" }}
    >
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 md:py-32">
        <Reveal>
          <header className="mb-14 grid gap-4 border-b border-rule pb-8 md:mb-20 md:grid-cols-[8rem_1fr] md:gap-10">
            <div className="mono flex items-baseline gap-3 text-xs text-ink-3 md:flex-col md:gap-1">
              <span>{index}</span>
              <span className="eyebrow">{eyebrow}</span>
            </div>
            <h2 className="display text-[clamp(2.25rem,6vw,4rem)]">{title}</h2>
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/** A measured value with its label. The value is always monospace; it is data. */
export function Metric({
  value,
  label,
  tone = "ink",
}: {
  value: string;
  label: string;
  tone?: "ink" | "warm" | "cold";
}) {
  const color =
    tone === "warm" ? "text-warm" : tone === "cold" ? "text-cold" : "text-ink";
  return (
    <div className="border-t border-rule-soft pt-3">
      <div className={`mono text-[0.95rem] leading-tight font-medium ${color}`}>
        {value}
      </div>
      <div className="mono mt-1 text-[0.6875rem] leading-snug text-ink-3">
        {label}
      </div>
    </div>
  );
}

/** Small monospace chips for a tech stack. Deliberately unstyled beyond a hairline. */
export function Chips({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-2 gap-y-2">
      {items.map((t) => (
        <li
          key={t}
          className="mono border border-rule px-2 py-[3px] text-[0.6875rem] text-ink-2"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

import { Reveal } from "./Reveal";

export type TimelineItem = {
  key: string;
  title: string;
  meta?: string;
  body: string;
  tags: readonly string[];
  repo?: string | null;
  live?: string | null;
};

/**
 * Alternating timeline: a spine down the middle with a node per entry, cards
 * on alternating sides. Below lg it collapses to a single left-aligned column —
 * a zigzag at phone width is just a ragged list.
 */
export function Timeline({
  items,
  cardClass,
  pillClass,
}: {
  items: TimelineItem[];
  cardClass: string;
  /** Must contrast with cardClass — otherwise the pills disappear into the card. */
  pillClass: string;
}) {
  return (
    <div className="relative mt-12 md:mt-16">
      {/* spine */}
      <span
        aria-hidden
        className="absolute top-0 bottom-0 left-[7px] w-px bg-line lg:left-1/2 lg:-translate-x-1/2"
      />

      <ol className="flex flex-col gap-10 lg:gap-4">
        {items.map((item, i) => {
          const right = i % 2 === 1;
          return (
            <Reveal key={item.key} as="li" delay={40}>
              <div
                className={`relative grid lg:grid-cols-2 lg:items-center lg:gap-16 ${
                  right ? "" : ""
                }`}
              >
                {/* node */}
                <span
                  aria-hidden
                  className="absolute top-[0.6rem] left-0 h-[15px] w-[15px] rounded-full bg-ink-2 lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
                />

                <div
                  className={`pl-9 lg:pl-0 ${
                    right ? "lg:col-start-2" : "lg:col-start-1 lg:row-start-1"
                  }`}
                >
                  <article className={`rounded-lg p-7 ${cardClass}`}>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-[1.25rem] leading-snug font-normal text-ink-2">
                        {item.title}
                      </h3>
                      {item.repo ? (
                        <a
                          href={item.repo}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${item.title} on GitHub`}
                          className="shrink-0 text-ink-2 transition-opacity hover:opacity-60"
                        >
                          <GitHubMark />
                        </a>
                      ) : null}
                    </div>

                    {item.meta ? (
                      <p className="mt-1 text-[0.9375rem] text-ink-4">{item.meta}</p>
                    ) : null}

                    <p className="mt-4 text-[0.9375rem] text-ink-3">{item.body}</p>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((t) => (
                        <li key={t} className={`pill ${pillClass}`}>
                          {t}
                        </li>
                      ))}
                    </ul>

                    {item.live ? (
                      <a
                        href={item.live}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-block border-b border-ink-4 pb-px text-[0.875rem] text-ink-2 transition-colors hover:border-ink-2"
                      >
                        Live site ↗
                      </a>
                    ) : null}
                  </article>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </div>
  );
}

function GitHubMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

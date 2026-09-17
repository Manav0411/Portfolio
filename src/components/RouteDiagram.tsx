"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { routeDemo } from "@/content/profile";

/**
 * The signature.
 *
 * One question enters. The router sends it down one of two paths, and the two
 * paths cost wildly different amounts. This is the decision at the center of
 * Groundwork, and it is also the legend for the whole page: cold = deterministic,
 * no model call; warm = a model ran.
 *
 * The animation carries the information — the cold line draws almost instantly,
 * the warm line takes its time. (Indicative, not to scale; the true ratio is ~86x.)
 */
export function RouteDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full">
      <div className="eyebrow mb-5 flex items-center gap-2">
        <span>Router</span>
        <span className="h-px flex-1 bg-rule" aria-hidden />
        <span>Groundwork</span>
      </div>

      {/* The question */}
      <p className="mono text-[0.75rem] text-ink sm:text-[0.8125rem]">
        <span className="text-ink-3">?&nbsp;</span>
        <span className="italic">{routeDemo.question}</span>
        <span
          aria-hidden
          className="ml-1 inline-block h-[1em] w-[0.5ch] translate-y-[0.15em] bg-ink"
          style={{ animation: "rd-caret 1.1s steps(1) infinite" }}
        />
      </p>

      {/* The two routes, hanging off one spine */}
      <div className="relative mt-5 pl-5 sm:pl-7">
        <span
          aria-hidden
          className="absolute top-0 bottom-[1.6rem] left-0 w-px origin-top bg-rule"
          style={{
            transform: run ? "scaleY(1)" : "scaleY(0)",
            transition: "transform .5s cubic-bezier(.22,1,.36,1)",
          }}
        />
        <ul className="flex flex-col gap-5 sm:gap-6">
          {routeDemo.branches.map((b) => (
            <Branch key={b.id} branch={b} run={run} />
          ))}
        </ul>
      </div>

      <p className="mt-7 max-w-lg border-t border-rule-soft pt-4 text-[0.875rem] leading-relaxed text-ink-2 italic">
        {routeDemo.footnote}
      </p>

      <style>{`
        @keyframes rd-caret { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @media (prefers-reduced-motion: reduce) {
          [data-rd-line] { transform: scaleX(1) !important; }
        }
      `}</style>
    </div>
  );
}

function Branch({
  branch,
  run,
}: {
  branch: (typeof routeDemo.branches)[number];
  run: boolean;
}) {
  const cold = branch.kind === "cold";
  const accent = cold ? "var(--color-cold)" : "var(--color-warm)";
  const drawMs = cold ? 420 : 1400;

  return (
    <li className="relative">
      {/* the stub connecting spine to content — it draws at the route's pace */}
      <span
        aria-hidden
        data-rd-line
        className="absolute top-[0.65rem] -left-5 h-px w-5 origin-left sm:-left-7 sm:w-7"
        style={{
          backgroundColor: accent,
          transform: run ? "scaleX(1)" : "scaleX(0)",
          transition: `transform ${drawMs}ms cubic-bezier(.22,1,.36,1) 320ms`,
        }}
      />

      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <span
            className="mono text-[0.6875rem] font-medium tracking-[0.12em] uppercase"
            style={{ color: accent }}
          >
            {branch.label}
          </span>
          <p className="mono mt-1 text-[0.75rem] leading-snug text-ink-2">
            {branch.path}
          </p>
        </div>

        <div className="shrink-0 sm:text-right">
          <Readout
            value={branch.value}
            unit={branch.unit}
            color={accent}
            run={run}
            durationMs={drawMs}
          />
          <div className="mono text-[0.6875rem] text-ink-3">{branch.note}</div>
        </div>
      </div>
    </li>
  );
}

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(REDUCED_QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false, // server: assume motion is fine, the effect corrects on mount
  );
}

/** Counts the measurement up as its route resolves. */
function Readout({
  value,
  unit,
  color,
  run,
  durationMs,
}: {
  value: number;
  unit: string;
  color: string;
  run: boolean;
  durationMs: number;
}) {
  const [n, setN] = useState(0);
  const reduced = usePrefersReducedMotion();
  const decimals = Number.isInteger(value) ? 0 : 1;

  // With motion reduced there is no count-up at all — the measurement is simply stated.
  const shown = reduced ? value : n;

  useEffect(() => {
    if (!run || reduced) return;
    const start = performance.now() + 320;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / durationMs));
      const eased = 1 - Math.pow(1 - t, 4);
      setN(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setN(value);
    };
    raf = requestAnimationFrame(tick);

    // A throttled or backgrounded tab pauses rAF, which would leave the readout
    // frozen at 0 — a wrong number, not just a missing animation. Land it anyway.
    const guard = window.setTimeout(() => setN(value), 320 + durationMs + 600);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(guard);
    };
  }, [run, reduced, value, durationMs]);

  return (
    <div className="mono text-[1.5rem] leading-none font-medium tracking-tight tabular-nums sm:text-[1.75rem]">
      <span style={{ color }}>{shown.toFixed(decimals)}</span>
      <span className="ml-1 text-[0.8125rem] text-ink-3">{unit}</span>
    </div>
  );
}

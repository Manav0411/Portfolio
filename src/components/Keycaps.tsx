"use client";

import { useCallback, useEffect, useState } from "react";

const LETTERS = ["M", "A", "N", "A", "V"];

// Isometric basis. A runs down-right (the direction the row descends),
// KEY spans one cap's top face; every face is built from these two vectors.
const A = { x: 62, y: 34 };
const KEY = { x: 56, y: 30 };
const H = 32; // cube height
const ORIGIN = { x: 30, y: 74 };
const TRAVEL = 7; // how far a cap sinks when pressed

/**
 * The hero object: five keycaps spelling MANAV, sitting on a rail.
 * Flat isometric SVG rather than a 3D scene — nothing to load, renders
 * identically everywhere, and the caps actually press.
 *
 * A cap goes down on click, on Enter/Space when focused, and when the matching
 * letter is typed on a real keyboard. Both A caps answer to the A key.
 */
export function Keycaps({ className = "" }: { className?: string }) {
  const [pressed, setPressed] = useState<number[]>([]);

  const press = useCallback((indices: number[]) => {
    if (!indices.length) return;
    setPressed((p) => [...new Set([...p, ...indices])]);
    window.setTimeout(
      () => setPressed((p) => p.filter((i) => !indices.includes(i))),
      150,
    );
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
      const target = e.target as HTMLElement | null;
      // Don't hijack the contact form.
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;

      const key = e.key.toUpperCase();
      const hits = LETTERS.flatMap((l, i) => (l === key ? [i] : []));
      press(hits);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [press]);

  return (
    <svg
      viewBox="0 0 420 300"
      className={className}
      role="img"
      aria-label="Isometric keycaps spelling MANAV. Each cap can be pressed."
    >
      {/* rail */}
      <polygon points="16,100 346,280 406,247 76,67" fill="#dcdcdc" />
      <polygon points="16,100 346,280 346,294 16,114" fill="#bfbfbf" />
      <polygon points="346,280 406,247 406,261 346,294" fill="#cccccc" />

      {LETTERS.map((letter, i) => {
        const o = { x: ORIGIN.x + i * A.x, y: ORIGIN.y + i * A.y };
        const down = pressed.includes(i);

        const top = [
          `${o.x},${o.y}`,
          `${o.x + KEY.x},${o.y + KEY.y}`,
          `${o.x + KEY.x * 2},${o.y}`,
          `${o.x + KEY.x},${o.y - KEY.y}`,
        ].join(" ");
        // The side faces shorten as the cap sinks, so it reads as travel into
        // the rail rather than the whole cube sliding down the screen.
        const h = down ? H - TRAVEL : H;
        const left = [
          `${o.x},${o.y}`,
          `${o.x + KEY.x},${o.y + KEY.y}`,
          `${o.x + KEY.x},${o.y + KEY.y + h}`,
          `${o.x},${o.y + h}`,
        ].join(" ");
        const right = [
          `${o.x + KEY.x},${o.y + KEY.y}`,
          `${o.x + KEY.x * 2},${o.y}`,
          `${o.x + KEY.x * 2},${o.y + h}`,
          `${o.x + KEY.x},${o.y + KEY.y + h}`,
        ].join(" ");

        return (
          <g
            key={i}
            role="button"
            tabIndex={0}
            aria-label={`Key ${letter}`}
            className="cursor-pointer outline-none"
            onClick={() => press([i])}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                press([i]);
              }
            }}
            style={{
              transform: `translateY(${down ? TRAVEL : 0}px)`,
              transition: "transform 110ms cubic-bezier(.22,1,.36,1)",
            }}
          >
            {/* a generous invisible hit area over the whole cap */}
            <polygon
              points={`${o.x},${o.y - KEY.y} ${o.x + KEY.x * 2},${o.y - KEY.y} ${o.x + KEY.x * 2},${o.y + KEY.y + H} ${o.x},${o.y + KEY.y + H}`}
              fill="transparent"
            />
            <polygon points={left} fill={down ? "#232323" : "#2b2b2b"} />
            <polygon points={right} fill={down ? "#161616" : "#1d1d1d"} />
            <polygon points={top} fill={down ? "#3a3a3a" : "#464646"} />
            <text
              transform={`matrix(0.881 -0.472 0.881 0.472 ${o.x + KEY.x} ${o.y})`}
              fill="#f2f2f2"
              fontSize="24"
              fontWeight="600"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ fontFamily: "var(--font-display)", pointerEvents: "none" }}
            >
              {letter}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

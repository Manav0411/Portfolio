"use client";

import { useCallback, useEffect, useState } from "react";

const LETTERS = ["M", "A", "N", "A", "V"];

// Isometric construction. The top face is a rhombus with half-diagonals
// (HX, HY); each cap is a tapered prism of height H, and the row steps along
// STEP so it descends left-to-right.
const HX = 56;
const HY = 30;
const H = 54;          // cap height — tall enough that the front faces carry the form
const TAPER = 0.76;    // top face relative to the base, the real keycap profile
const STEP = { x: 58, y: 32 };
const ORIGIN = { x: 96, y: 96 };
const TRAVEL = 9;

type Pt = { x: number; y: number };
const pts = (...p: Pt[]) => p.map((q) => `${q.x},${q.y}`).join(" ");

/** The four corners of a rhombus of the given scale around a centre. */
function rhombus(c: Pt, s: number) {
  return {
    left: { x: c.x - HX * s, y: c.y },
    front: { x: c.x, y: c.y + HY * s },
    right: { x: c.x + HX * s, y: c.y },
    back: { x: c.x, y: c.y - HY * s },
  };
}

/**
 * The hero object: five tapered keycaps spelling MANAV on a rail.
 *
 * Flat isometric SVG — a couple of KB, renders instantly, and needs no runtime.
 * A cap presses when its letter is typed, when it's clicked, and on Enter or
 * Space while focused.
 */
export function Keycaps({ className = "" }: { className?: string }) {
  const [down, setDown] = useState<number[]>([]);

  const press = useCallback((indices: number[]) => {
    if (!indices.length) return;
    setDown((d) => [...new Set([...d, ...indices])]);
  }, []);

  const lift = useCallback((indices: number[]) => {
    setDown((d) => d.filter((i) => !indices.includes(i)));
  }, []);

  const matching = (key: string) =>
    LETTERS.flatMap((l, i) => (l === key.toUpperCase() ? [i] : []));

  useEffect(() => {
    function onDown(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
      const t = e.target as HTMLElement | null;
      if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      press(matching(e.key));
    }
    function onUp(e: KeyboardEvent) {
      lift(matching(e.key));
    }
    const clear = () => setDown([]);
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    window.addEventListener("blur", clear);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      window.removeEventListener("blur", clear);
    };
  }, [press, lift]);

  // Rail: a slab whose long axis follows the row and whose cross-section runs
  // along the cap base's other diagonal, so the caps sit squarely on it.
  const railA: Pt = { x: ORIGIN.x - 0.9 * STEP.x, y: ORIGIN.y - 0.9 * STEP.y };
  const railB: Pt = { x: ORIGIN.x + 4.9 * STEP.x, y: ORIGIN.y + 4.9 * STEP.y };
  const cross: Pt = { x: HX * 0.55, y: -HY * 0.55 };
  const railT = 12;
  const near = (p: Pt): Pt => ({ x: p.x - cross.x, y: p.y - cross.y });
  const far = (p: Pt): Pt => ({ x: p.x + cross.x, y: p.y + cross.y });
  const drop = (p: Pt): Pt => ({ x: p.x, y: p.y + railT });

  return (
    <svg
      viewBox="0 0 424 296"
      className={className}
      role="img"
      aria-label="Isometric keycaps spelling MANAV. Type M, A, N or V to press them."
    >
      {/* rail: top face, then the near edge for thickness */}
      <polygon
        points={pts(near(railA), near(railB), far(railB), far(railA))}
        fill="#e8eaec"
      />
      <polygon
        points={pts(
          near(railA),
          near(railB),
          drop(near(railB)),
          drop(near(railA)),
        )}
        fill="#c9cdd0"
      />

      {LETTERS.map((letter, i) => {
        const isDown = down.includes(i);
        const sink = isDown ? TRAVEL : 0;
        const base: Pt = {
          x: ORIGIN.x + i * STEP.x,
          y: ORIGIN.y + i * STEP.y,
        };
        const b = rhombus(base, 1);
        const topC: Pt = { x: base.x, y: base.y - H + sink };
        const t = rhombus(topC, TAPER);

        return (
          <g
            key={i}
            role="button"
            tabIndex={0}
            aria-label={`Key ${letter}`}
            aria-pressed={isDown}
            className="cursor-pointer outline-none"
            onPointerDown={() => press([i])}
            onPointerUp={() => lift([i])}
            onPointerLeave={() => lift([i])}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                press([i]);
              }
            }}
            onKeyUp={() => lift([i])}
            style={{ transition: "none" }}
          >
            {/* left face */}
            <polygon
              points={pts(b.left, b.front, t.front, t.left)}
              fill={isDown ? "#2a2a2a" : "#313131"}
            />
            {/* right face */}
            <polygon
              points={pts(b.front, b.right, t.right, t.front)}
              fill={isDown ? "#1e1e1e" : "#232323"}
            />
            {/* top face */}
            <polygon
              points={pts(t.left, t.front, t.right, t.back)}
              fill={isDown ? "#3d3d3d" : "#454545"}
            />
            <text
              transform={`matrix(0.881 -0.472 0.881 0.472 ${topC.x} ${topC.y})`}
              fill="#f4f4f4"
              fontSize="23"
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

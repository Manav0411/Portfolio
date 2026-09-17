const LETTERS = ["M", "A", "N", "A", "V"];

// Isometric basis. a runs down-right (the direction the row descends),
// b runs up-right; every face is built from these two vectors.
const A = { x: 62, y: 34 };
const KEY = { x: 56, y: 30 };
const H = 32; // cube height
const ORIGIN = { x: 30, y: 74 };

/**
 * The hero object: five keycaps spelling MANAV, sitting on a rail.
 * Drawn as flat isometric SVG rather than a 3D scene — it costs nothing to
 * load and renders identically everywhere.
 */
export function Keycaps({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 300"
      className={className}
      role="img"
      aria-label="Isometric keycaps spelling MANAV"
    >
      {/* rail */}
      <polygon points="16,100 346,280 406,247 76,67" fill="#dcdcdc" />
      <polygon points="16,100 346,280 346,294 16,114" fill="#bfbfbf" />
      <polygon points="346,280 406,247 406,261 346,294" fill="#cccccc" />

      {LETTERS.map((letter, i) => {
        const o = { x: ORIGIN.x + i * A.x, y: ORIGIN.y + i * A.y };
        const top = [
          `${o.x},${o.y}`,
          `${o.x + KEY.x},${o.y + KEY.y}`,
          `${o.x + KEY.x * 2},${o.y}`,
          `${o.x + KEY.x},${o.y - KEY.y}`,
        ].join(" ");
        const left = [
          `${o.x},${o.y}`,
          `${o.x + KEY.x},${o.y + KEY.y}`,
          `${o.x + KEY.x},${o.y + KEY.y + H}`,
          `${o.x},${o.y + H}`,
        ].join(" ");
        const right = [
          `${o.x + KEY.x},${o.y + KEY.y}`,
          `${o.x + KEY.x * 2},${o.y}`,
          `${o.x + KEY.x * 2},${o.y + H}`,
          `${o.x + KEY.x},${o.y + KEY.y + H}`,
        ].join(" ");

        return (
          <g key={i}>
            <polygon points={left} fill="#2b2b2b" />
            <polygon points={right} fill="#1d1d1d" />
            <polygon points={top} fill="#464646" />
            <text
              transform={`matrix(0.881 -0.472 0.881 0.472 ${o.x + KEY.x} ${o.y})`}
              fill="#f2f2f2"
              fontSize="24"
              fontWeight="600"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {letter}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
